---
name: mise-github-backend
description:
  Defines GitHub Release artifact requirements for installation through mise's
  GitHub backend. Use when preparing a project to publish mise-compatible
  releases. Covers canonical archive naming, platform token selection,
  asset-selection constraints, and SHA256SUMS files.
---

# Mise's Github Backend

Follow these requirements when you publish GitHub Release artifacts that mise's
`github` backend must select automatically.

## Canonical release assets

Publish exactly one canonical, extractable archive for each supported target.
Name each archive like this:

```text
<tool>-<version>-<os>-<arch>[-<libc>].<archive>
```

Use these platform tokens and formats:

```text
<tool>-<version>-linux-x86_64-gnu.tar.gz
<tool>-<version>-linux-arm64-musl.tar.gz
<tool>-<version>-macos-x86_64.tar.gz
<tool>-<version>-macos-arm64.tar.gz
<tool>-<version>-windows-x64-msvc.zip
<tool>-<version>-windows-arm64-msvc.zip
```

Use only `x64`, `x86_64`, `arm64`, or `x86` as architecture tokens. Use one
spelling consistently. Use `macos` consistently for macOS releases. The libc
suffix is optional. Add `gnu` or `musl` for Linux, and `msvc` for Windows, only
when you publish distinct builds for those variants.

Put the tool name at the start of every canonical filename. The name must match
the primary executable or tool name that mise derives from the backend. After
the tool name, put only a version token and platform tokens, separated by `-`,
`_`, or `.`.

## Asset selection

Never put conflicting OS, architecture, or libc tokens in one asset name. mise
excludes an asset when its architecture token does not match. When two
otherwise-equal assets tie, mise chooses the shorter name, then the name that is
earlier in alphabetical order. For this reason, do not publish similarly named
alternate binaries for the same target.

Publish archives in one of these formats: `.tar.gz`, `.tar.xz`, `.tar.zst`, or
`.zip`. Use `.zip` for Windows. Do not rely on automatic selection for
installers or packages such as `.deb`, `.rpm`, `.dmg`, `.pkg`, `.msi`, or
`.appx`. mise excludes these formats.

Do not append `debug`, `test`, `release-info`, or `changelog` to a canonical
filename. Keep signatures, provenance files, SBOMs, and other metadata separate
from the installable archive.

## Checksums

Publish one global `SHA256SUMS` release asset. Include one conventional line for
every canonical archive. Use each archive's exact release-asset filename:

```text
<sha256>  <tool>-<version>-linux-x86_64-gnu.tar.gz
```

Do not publish per-asset checksum files. mise recognizes `SHA256SUMS`, finds the
line for its selected archive, and reads that archive's SHA-256 hash from that
line.
