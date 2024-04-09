# VS Code Extension - Starter Kit

[![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/imgildev.vscode-auto-barrel?style=for-the-badge&label=VS%20Marketplace&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-auto-barrel)
[![Visual Studio Marketplace Installs](https://img.shields.io/visual-studio-marketplace/i/imgildev.vscode-auto-barrel?style=for-the-badge&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-auto-barrel)
[![Visual Studio Marketplace Downloads](https://img.shields.io/visual-studio-marketplace/d/imgildev.vscode-auto-barrel?style=for-the-badge&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-auto-barrel)
[![Visual Studio Marketplace Rating](https://img.shields.io/visual-studio-marketplace/r/imgildev.vscode-auto-barrel?style=for-the-badge&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-auto-barrel&ssr=false#review-details)
[![GitHub Repo stars](https://img.shields.io/github/stars/ManuelGil/vscode-auto-barrel?style=for-the-badge&logo=github)](https://github.com/ManuelGil/vscode-auto-barrel)
[![GitHub license](https://img.shields.io/github/license/ManuelGil/vscode-auto-barrel?style=for-the-badge&logo=github)](https://github.com/ManuelGil/vscode-auto-barrel/blob/main/LICENSE)

This is a starter kit for creating a new extension for Visual Studio Code. It includes a basic structure and configuration to start developing a new extension.

## Table of Contents

- [VS Code Extension - Starter Kit](#vs-code-extension---starter-kit)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Prerequisites](#prerequisites)
  - [Getting Started](#getting-started)
  - [Running the documentation](#running-the-documentation)
  - [Building the extension](#building-the-extension)
  - [Publishing the extension](#publishing-the-extension)
  - [Contributing](#contributing)
  - [Code of Conduct](#code-of-conduct)
  - [Changelog](#changelog)
  - [Authors](#authors)
  - [License](#license)

## Features

- Basic configuration for the development environment
  - `.editorconfig` - Editor configuration
  - `.eslintignore` - ESLint ignore file
  - `.eslintrc.json` - ESLint configuration file
  - `.linstagedrc` - Lint-staged configuration file
  - `.nvmrc` - Node version manager configuration file
  - `.prettierrc` - Prettier configuration file
  - `commitlint.config.js` - Commit lint configuration file
  - `package.json` - Package configuration to manage dependencies
  - `tsconfig.json` - TypeScript configuration to compile the source code
- Basic structure for a new extension
  - `app` - Source code to develop the extension
    - `configs` - Configuration files and constants
    - `controllers` - Controllers to listen to commands
    - `helpers` - Helper functions with common tasks
    - `models` - Models to represent data
    - `providers` - Providers to provide data
    - `services` - Services to provide functionality
  - `test` - Test files to test the extension
- JSON Schema validations for workspace settings
  - `settings.schema.json` - JSON schema for the workspace settings
- Helper functions to get started with the extension
  - `command.helper.ts` - Helper functions to create a new command
  - `data.helper.ts` - Helper functions to create a new data provider
  - `dialog.helper.ts` - Helper functions to create a new dialog
  - `filesystem.helper.ts` - Helper functions to create a new file system provider
  - `inflection.helper.ts` - Helper functions to create a new inflection provider
  - `number.helper.ts` - Helper functions to create a new number provider
  - `security.helper.ts` - Helper functions to create a new security provider
  - `text.helper.ts` - Helper functions to create a new text provider
- Basic commands to get started with the extension
  - `extension.ts` - Main file to run the extension
  - `example.controller.ts` - Example controller with basic commands
- Basic views to get started with the extension
  - `providers` - Providers for the extension views
    - `feedback.provider.ts` - Provides feedback to the user
    - `listFiles.provider.ts` - Provides a list of files from the workspace
    - `color.provider.ts` - Provides a color picker to the user
- Basic `OpenAI` integration to get started with the extension
  - `openai` - OpenAI integration and chat provider
    - `openai.service.ts` - OpenAI service to interact with the API
    - `chat.provider.ts` - Provides chat functionality to the user

## Prerequisites

You need to have [node](https://nodejs.org/en/) and [npm](https://nodejs.org/en/) installed on your system to run the examples. It is recommended to use the node version used for VS Code development itself which is documented [here](https://github.com/Microsoft/vscode/wiki/How-to-Contribute#prerequisites)

## Getting Started

To get started with the extension, follow these steps:

1. Clone the repository

    ```bash
    git clone
    cd vscode-auto-barrel
    npm install
    code .
    ```

2. Press `F5` to open a new instance of Visual Studio Code with the extension running in debug mode
3. Open the command palette and run the `Auto Barrel: Hello World` command
4. The extension will display a message in the output window

For more information, see the [official documentation](https://code.visualstudio.com/api/get-started/your-first-extension)

## Running the documentation

To run the documentation, execute the following command in the terminal:

```bash
npm run compodoc
```

This will generate the documentation in the `compodoc` folder.

For more information, see the [official documentation](https://compodoc.app/guides/getting-started.html)

## Building the extension

To build the extension, execute the following command in the terminal:

```bash
vsce package
```

This will create a `.vsix` file in the root of the project.

For more information, see the [official documentation](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)

## Publishing the extension

To publish the extension, execute the following command in the terminal:

```bash
vsce publish
```

This will open a new instance of Visual Studio Code with the extension running in debug mode.

For more information, see the [official documentation](https://code.visualstudio.com/api/get-started/your-first-extension)

## Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Code of Conduct

Please read [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) for details on our code of conduct.

## Changelog

See [CHANGELOG.md](./CHANGELOG.md)

## Authors

- **Manuel Gil** - _Owner_ - [ManuelGil](https://github.com/ManuelGil)

See also the list of [contributors](https://github.com/ManuelGil/vscode-auto-barrel/contributors) who participated in this project.

## License

Extension Starter Kit for VSCode is licensed under the MIT License - see the [MIT License](https://opensource.org/licenses/MIT) for details.
