{
  fixup-yarn-lock,
  lib,
  nix-gitignore,
  nodejs_22,
  node-gyp,
  openssl,
  pkg-config,
  prisma,
  prisma-engines,
  python3,
  stdenv,
  vips,
  yarn-berry_4,
  yarnBuildHook,
}:

let
  yarn-berry = yarn-berry_4;
in

stdenv.mkDerivation (finalAttrs: {
  name = "CompSoc-Website";

  src = builtins.path {
    path = ./.;
    name = "source";
    filter = nix-gitignore.gitignoreFilterPure (_: _: true) [
      "*.nix"
      "flake.lock"
    ] ./.;
  };

  missingHashes = ./missing-hashes.json;
  offlineCache = yarn-berry.fetchYarnBerryDeps {
    yarnLock = ./yarn.lock;
    hash = "sha256-/p25e8P1gb2vJ9VXhRiJ17ljywEGqmOFOQTWFW2rMbU=";
    inherit (finalAttrs) missingHashes;
  };

  nativeBuildInputs = [
    nodejs_22
    yarn-berry.yarnBerryConfigHook
    yarn-berry
    node-gyp
    pkg-config
    prisma
    python3
  ];

  buildInputs = [
    openssl
    vips
  ];

  env = {
    PRISMA_QUERY_ENGINE_LIBRARY = "${prisma-engines}/lib/libquery_engine.node";
    PRISMA_SCHEMA_ENGINE_BINARY = lib.getExe' prisma-engines "schema-engine";
  };

  buildPhase = ''
    export NUXT_TELEMETRY_DISABLED=1
    yarn build --offline --development
  '';

  installPhase = ''
    mv .output $out
  '';
})
