{
  fixup-yarn-lock,
  lib,
  makeWrapper,
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
    makeWrapper
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
    NUXT_TELEMETRY_DISABLED = 1;
  };

  buildPhase = ''
    runHook preBuild
    yarn build --offline
    runHook postBuild
  '';

  installPhase = ''
    runHook preInstall
    mv .output $out
    mkdir -p $out/bin
    makeWrapper ${lib.getExe nodejs_22} $out/bin/server --append-flags \
      $out/server/index.mjs --set PRISMA_QUERY_ENGINE_LIBRARY \
      "$PRISMA_QUERY_ENGINE_LIBRARY"
    runHook postInstall
  '';
})
