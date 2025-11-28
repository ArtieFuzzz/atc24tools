{
  pkgs,
  lib,
  config,
  inputs,
  ...
}: {
  languages.javascript = {
    enable = true;
    corepack.enable = true;
  };
  languages.typescript.enable = true;
}
