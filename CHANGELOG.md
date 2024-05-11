# Change Log

All notable changes to the "Auto Barrel" extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.3.0] - 2024-05-10

### Added

- Add `detectExportsInFiles` setting to control the detection of exports in files.
- Add `insertFinalNewline` setting to control the insertion of a final newline in the generated barrel file.

### Changed

- Update the `FileController` to use the `detectExportsInFiles` setting to detect exports in files.

## [1.2.0] - 2024-05-09

### Added

- Add `disableRecursiveBarrelling` setting to disable the recursive generation of barrel files.

## [1.1.0] - 2024-04-21

### Added

- Add `updateBarrelInFolder` command to update the barrel file manually.
- Add `endOfLine` setting to control the line endings in the generated barrel file.

## [1.0.0] - 2024-04-20

### Added

- Initial release of Auto Barrel.
- Add basic functionality for generating barrel files.
- Add support for TypeScript and JavaScript projects.

[Unreleased]: https://github.com/ManuelGil/vscode-nextjs-generator/compare/v1.2.0...HEAD
[1.2.0]: https://github.com/ManuelGil/vscode-nextjs-generator/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/ManuelGil/vscode-nextjs-generator/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/ManuelGil/vscode-nextjs-generator/releases/tag/v1.0.0
