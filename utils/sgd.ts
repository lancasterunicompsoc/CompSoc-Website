const SAFE_DOMAINS = [
  "compsoc.io",
  "forms.gle",
  "gdsc.community.dev",
  "lancasteruni.eu.qualtrics.com",
];

const DICTIONARY = {
  terms: [
    "CompSoc",
    "DurHack",
    "eduroam",
    "Furby",
    "Hogarths",
    "iface",
    "LanHack",
    "LUCompSoc",
    "LUHack",
    "Nerf",
    "Pac-Man",
    "Pygame",
    "pygame",
    "VLANs",
  ],
  words: ["derp", "punny", "spooktacular"],
};

const LT_CONFIG = {
  errors: [
    "AI_HYDRA_LEO_MISSING_COMMA",
    "ALLOW_TO_DO",
    "BON_APPETITE",
    "BY_BUY",
    "COMMA_PARENTHESIS_WHITESPACE",
    "IT_IS_2",
    "MISSING_HYPHEN",
  ],
  warnings: [
    "COMMA_COMPOUND_SENTENCE",
    "ELLIPSIS",
    "EN_COMPOUNDS_MICRO_CONTROLLER",
    "EN_QUOTES",
    "EN_UPPER_CASE_NGRAM",
    "I_LOWERCASE",
    "IN_A_X_MANNER",
  ],
  ignored: ["OXFORD_SPELLING_Z_NOT_S"],
};

type Domain = {
  name: string;
  index: number;
};

type SPGError = (
  | {
      type: "spelling";
      index: number;
      word: string;
      suggestions: string[];
    }
  | { type: "grammar"; index: number }
  | {
      type: "link";
      index: number;
      domain: string;
    }
  | {
      type: "general";
      index: number;
      message: string;
    }
) & { acceptable?: boolean };

export async function validate(text: string): Promise<SPGError[]> {
  const ltErrors = await spellcheck(text);
  return [...ltErrors, ...validateDomains(text)];
}

function validateDomains(text: string): SPGError[] {
  const domains = getDomains(text);
  if (!domains) {
    return [];
  }
  return domains
    .filter(({ name }) => !SAFE_DOMAINS.includes(name))
    .map(({ index, name }) => ({ type: "link", index, domain: name }));
}

function getDomains(text: string): Domain[] {
  const urlRegex =
    /(?:http[sx]?|ftp):\/\/[\w-]+(?:\.[\w-]+)+[\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-]/g;
  const urls = text.matchAll(urlRegex);
  if (!urls) {
    return [];
  }
  const domains: Domain[] = [];
  for (const match of urls) {
    let url = match[0];
    if (url.includes("//")) {
      url = url.split("//")[1] ?? "";
    }
    const domain = url.split("/")[0] ?? "";
    domains.push({ name: domain, index: match.index ?? 0 });
  }
  return domains;
}

async function spellcheck(text: string): Promise<SPGError[]> {
  const data = JSON.stringify({ text });
  const body = `data=${encodeURIComponent(
    data,
  )}&enableHiddenRules=true&level=picky&language=auto&noopLanguages=en&preferredVariants=en-GB&abtest=deggec&preferredLanguages=en&disabledRules=WHITESPACE_RULE&useragent=standalone&mode=allButTextLevelOnly&allowIncompleteResults=true`;
  const result = await fetch(
    "https://api.languagetool.org/v2/check?c=1&v=standalone",
    {
      method: "POST",
      body,
    },
  ).then(res => res.json());
  const matches: any[] = result.matches ?? [];
  if (!matches) {
    return [];
  }
  return matches.flatMap(error => {
    if (LT_CONFIG.ignored.includes(error.rule.id)) {
      return [];
    }
    if (LT_CONFIG.errors.includes(error.rule.id)) {
      return [
        {
          type: "general",
          message: error.message,
          index: error.offset,
        },
      ];
    }
    if (LT_CONFIG.warnings.includes(error.rule.id)) {
      return [
        {
          type: "general",
          message: error.message,
          index: error.offset,
          acceptable: true,
        },
      ];
    }
    switch (error.rule.id) {
      case "MORFOLOGIK_RULE_EN_GB": {
        const word = text.slice(error.offset, error.offset + error.length);
        const suggestions: string[] = error.replacements.map(
          ({ value }: { value: string }) => value,
        );
        for (const d of DICTIONARY.terms) {
          if (word === d) {
            return [];
          }
        }
        for (const d of DICTIONARY.words) {
          if (word.toLowerCase() === d) {
            return [];
          }
        }
        return [
          {
            type: "spelling",
            index: error.offset,
            word,
            suggestions,
          },
        ];
      }
      default:
        console.warn("Unhandled error", error.rule.id);
        return [
          {
            type: "general",
            message: error.message,
            index: error.offset,
            acceptable: true,
          },
        ];
    }
  });
}
