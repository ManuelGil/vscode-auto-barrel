# Change Log

All notable changes to the "Extension Starter Kit for VSCode" extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.7.0] - 2024-03-31

### Added

- Add `ColorProvider` to display the color view in the extension
- Add `assets/color` folder to handle the color view
- Add `reset.css` and `vscode.css` files to style the color view
- Add `codicons` of the `vscode` module to use the icons in the extension

### Changed

- Change the `EXTENSION_ID` to improve the development experience
- Move the assets of the chat view to the `assets/chat` folder
- Upgrade dependencies to the latest versions available

### Fixed

- Fix the loading of the `showPath` setting in the configurations file
- Fix the file path when listing the files in the `ListFilesController` class

## [1.6.0] - 2024-03-12

### Added

- Add Show Path In File Name setting to show the path in the file name

### Changed

- Update the `ListFileController` class to use the `showPath` setting

### Fixed

- Fix the regex pattern to match the folder name to generate the file

## [1.5.0] - 2024-02-21

### Added

- Add `convertToTS` method to `example.controller.ts` file to convert a JSON Schema to TypeScript
- Add Convert to TypeScript command to convert a JSON Schema to TypeScript

### Changed

- Update `package.json` to include the Convert to TypeScript command in the contributes section

### Fixed

- Fix `getListFiles` method in `list-files.provider.ts` file to show a message when there are no files

## [1.4.0] - 2024-02-18

### Added

- Add `list-files.controller.ts` file to handle the list of files view
- Add `ListFilesProvider` to display the list of files view
- Add `setChildren` method to `NodeModel` class to set the children of the node

### Changed

- Move `assets` folder to the root of the project for improved the development experience
- Rename `constants.ts` file to `constants.config.ts` to define the extension constants
- Rename `config.ts` file to `extension.config.ts` to define the extension configuration
- Rename `config` folder to `configs` to define the extension settings
- Update `getFilesInFolder` method in `ExampleController` to use save content to a json file
- Update `ChatProvider` to use the `assets` folder to handle the chat view
- Update `FeedbackProvider` to use the `EXTENSION_ID` constant to handle the feedback view
- Update `package.json` to include the list of files view in the contributes section
- Update `extension.ts` to include the list of files view in the extension
- Update the formatting files to improve the development experience
- Improve the documentation of the extension

## [1.3.0] - 2024-02-10

### Added

- Add `OpenAI` settings to generate the chat messages
- Add `OpenAIService` to generate the chat messages
- Add `ChatProvider` to display the chat view
- Add `OpenAIService` instance to `ChatProvider` to generate the chat messages
- Add `src/assets/main.js` to handle the chat view
- Add `src/assets/main.css` to style the chat view
- Add `getNonce` method to `security.helper.ts` file
- Add `getRealpath`, `exists` and `isDirectory` methods to `filesystem.helper.ts` file

### Changed

- Rename `writeFile` method to `saveFile` in `filesystem.helper.ts` file
- Improve the documentation of the extension
- Set the `getInstance` method as static in `OpenAIService` class

### Fixed

- Fix file creation issue when creating a new file

## [1.2.0] - 2024-02-07

### Added

- Add compodoc to generate the documentation
- Add `FeedbackProvider` to display the feedback view
- Add `FeedbackController` to handle the feedback view
- Add `NodeModel` to display the items in the feedback view

### Changed

- Update `README.md` to include the features of the extension
- Update `package.json` to include the feedback view in the contributes section

### [1.1.0] - 2024-02-06

### Added

- Add new constants file to define the documentation URL, repository URL and issues URL
- Add `update` and `toString` methods to `Configuration` class

### Changed

- Update `tsconfig.json` to use `include` and `exclude` properties

### Fixed

- Fix JSON schema for settings validation in `package.json` and `settings.schema.json`
- Fix patterns for folders and files in `filesytem.helper.ts` and `example.controller.ts`
- Fix parameter types in `getFilesInFolder` method in `ExampleController`

## [1.0.0] - 2024-02-05

### Added

- Add `eslint` and `prettier` for code linting and formatting
- Add `husky`, `lint-staged` and `commitlint` for commit linting and formatting
- Add new section to `package.json` for `contributes.configuration` to define extension settings
- Add new section to `package.json` for `contributes.menus` to define extension menus
- Add new section to `package.json` for `contributes.jsonValidation` to define JSON schema for settings
- Add new JSON schema file for settings validation in `schemas/settings.schema.json` and reference it in `package.json`
- Add `CONTRIBUTING.md` file to define how to contribute to the project
- Add `CODE_OF_CONDUCT.md` file to define the code of conduct for the project
- Add command helper to execute commands in the terminal
- Add date helper to format dates
- Add dialog helper to show information, warning and error messages
- Add filesytem helper to read and write files
- Add inflector helper to convert strings to different cases
- Add number helper to format numbers
- Add security helper to escape HTML and JavaScript
- Add text helper to format strings
- Add `@types/minimatch` to `devDependencies` to fix TypeScript error
- Add definition of constants for the extension
- Add class configuration to define the extension settings
- Add JSON schema for settings validation in `package.json` and `settings.schema.json`
- Add an `ExampleController` to handle commands and menus

### Changed

- Update dependencies to latest versions and fix security vulnerabilities
- Update test cases to use lastest version of `glob` and `mocha`
- Update `package.json` to use `eslint` and `prettier` for code linting and formatting
- Improve folder structure and file naming for better organization and readability
- Implement `ExampleController` to handle commands and menus in `extension.ts`

### Fixed

- Fix file creation issue when creating a new file

[unreleased]: https://github.com/ManuelGil/vscode-auto-barrel/compare/v1.7.0...HEAD
[1.7.0]: https://github.com/ManuelGil/vscode-auto-barrel/compare/v1.6.0...v1.7.0
[1.6.0]: https://github.com/ManuelGil/vscode-auto-barrel/compare/v1.5.0...v1.6.0
[1.5.0]: https://github.com/ManuelGil/vscode-auto-barrel/compare/v1.4.0...v1.5.0
[1.4.0]: https://github.com/ManuelGil/vscode-auto-barrel/compare/v1.3.0...v1.4.0
[1.3.0]: https://github.com/ManuelGil/vscode-auto-barrel/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/ManuelGil/vscode-auto-barrel/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/ManuelGil/vscode-auto-barrel/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/ManuelGil/vscode-auto-barrel/releases/tag/v1.0.0
