const systemInfo = {
  os: { name: "CompSocOS", edition: "Terminal Edition" },
  shell: { name: "holy-sea", version: "0.0.2" },
  resolution: "80x25",
  theme: "matrix-red",
  terminal: "megantereon",
  processor: "unknown",
};
export default systemInfo;

export const MOTD = `The programs included with ${systemInfo.os.name} are free software.
${systemInfo.os.name} comes with ABSOLUTELY NO WARRANTY, to the extent permitted by applicable law.

To get started, type \`help\` to list available commands. ${systemInfo.os.name} is a best-faith implementation of Posix, but may not be entirely Posix-compliant.`;
