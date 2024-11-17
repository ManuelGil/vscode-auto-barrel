# Auto Barrel

[![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/imgildev.vscode-auto-barrel?style=for-the-badge&label=VS%20Marketplace&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-auto-barrel)
[![Visual Studio Marketplace Installs](https://img.shields.io/visual-studio-marketplace/i/imgildev.vscode-auto-barrel?style=for-the-badge&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-auto-barrel)
[![Visual Studio Marketplace Downloads](https://img.shields.io/visual-studio-marketplace/d/imgildev.vscode-auto-barrel?style=for-the-badge&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-auto-barrel)
[![Visual Studio Marketplace Rating](https://img.shields.io/visual-studio-marketplace/r/imgildev.vscode-auto-barrel?style=for-the-badge&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-auto-barrel&ssr=false#review-details)
[![GitHub Repo stars](https://img.shields.io/github/stars/ManuelGil/vscode-auto-barrel?style=for-the-badge&logo=github)](https://github.com/ManuelGil/vscode-auto-barrel)
[![GitHub license](https://img.shields.io/github/license/ManuelGil/vscode-auto-barrel?style=for-the-badge&logo=github)](https://github.com/ManuelGil/vscode-auto-barrel/blob/main/LICENSE)

Auto Barrel is a Visual Studio Code extension that helps you to create and maintain barrel files in your project.

![demo](https://raw.githubusercontent.com/ManuelGil/vscode-auto-barrel/main/docs/images/demo.gif)

A barrel file is a file that re-exports all the modules in a directory. This way, you can import the directory instead of the individual modules.

For example, if you have the following directory structure:

```md
src/
  components/
    Button/
      index.ts
      Button.tsx
    Input/
      index.ts
      Input.tsx
```

You can create a barrel file in the `components` directory that re-exports the `Button` and `Input` modules:

```typescript
// src/components/index.ts
export * from './Button';
export * from './Input';
```

Then, you can import the `Button` and `Input` modules from the `components` directory:

```typescript
import { Button } from './components';
import { Input } from './components';
```

Auto Barrel helps you to create and maintain these barrel files by automatically updating them when you add, remove, or rename modules in a directory.

This extension is inspired by the [auto-barrel](https://github.com/mike-hanson/auto-barrel) extension by [Mike Hanson](https://github.com/mike-hanson).

## Table of Contents

- [Auto Barrel](#auto-barrel)
  - [Table of Contents](#table-of-contents)
  - [Requirements](#requirements)
  - [Features](#features)
  - [Project Settings](#project-settings)
  - [Settings Options](#settings-options)
  - [Follow Me](#follow-me)
  - [VSXpert Template](#vsxpert-template)
  - [Other Extensions](#other-extensions)
  - [Contributing](#contributing)
  - [Code of Conduct](#code-of-conduct)
  - [Changelog](#changelog)
  - [Authors](#authors)
  - [License](#license)

## Requirements

- VSCode 1.76.0 or later

## Features

- **Automatic Barrel File Generation**: Quickly generate barrel files for your project with a single command, saving you time and effort.
- **Customizable File Patterns**: Customize the file patterns to include or exclude specific files or directories from the barrel file generation process.
- **Intelligent Module Exporting**: Auto Barrel intelligently exports modules based on the directory structure, making it easy to import modules from the generated barrel files.
- **Open Source**: Auto Barrel is open-source and available on GitHub, allowing you to contribute, report issues, or suggest new features to help improve the extension.

## Project Settings

Configure your project by creating or updating a settings.json file at the project's root. If you already have a `.vscode/settings.json` file, skip the first two steps.

1. Open the command palette in VSCode:

   - `CTRL + SHIFT + P` (Windows)
   - `CMD + SHIFT + P` (Mac OS)

2. Type `Preferences: Open Workspace Settings (JSON)`.

3. In the `.vscode/settings.json` file, copy and paste the following settings:

    ```json
    {
      "autoBarrel.language.defaultLanguage": "TypeScript",
      "autoBarrel.files.disableRecursiveBarrelling": false,
      "autoBarrel.files.includeExtensionOnExport": ["ts", "tsx", "vue"],
      "autoBarrel.files.ignoreFilePathPatternOnExport": ["**/*.spec.*", "**/*.test.*"],
      "autoBarrel.files.keepExtensionOnExport": false,
      "autoBarrel.files.detectExportsInFiles": false,
      "autoBarrel.files.exportDefaultFilename": "filename",
      "autoBarrel.formatting.excludeSemiColonAtEndOfLine": false,
      "autoBarrel.formatting.useSingleQuotes": true,
      "autoBarrel.formatting.endOfLine": "lf",
      "autoBarrel.formatting.insertFinalNewline": true,
    }
    ```

4. **Restart VS Code**

Your project is now set up to automatically format code upon saving.

## Settings Options

Configure Auto Barrel settings in your `.vscode/settings.json` file to tailor the behavior of the barrel file generation process according to your project's needs.

- `autoBarrel.language.defaultLanguage`: The default language for the barrel file. Supported languages are `TypeScript` and `JavaScript`. Default is `TypeScript`.
- `autoBarrel.files.disableRecursiveBarrelling`: Whether to disable recursive barrelling for subdirectories. Default is `false`.
- `autoBarrel.files.includeExtensionOnExport`: An array of file extensions to include when exporting modules. Default is `["ts", "tsx", "vue"]`.
- `autoBarrel.files.ignoreFilePathPatternOnExport`: An array of file path patterns to ignore when exporting modules. Default is `["**/*.spec.*", "**/*.test.*"]`.
- `autoBarrel.files.keepExtensionOnExport`: Whether to keep the file extension when exporting modules. Default is `false`.
- `autoBarrel.files.detectExportsInFiles`: Whether to detect exports in files when exporting modules. Default is `false`.
- `autoBarrel.files.exportDefaultFilename`: The filename to use when exporting a default module. Default is `filename`.
- `autoBarrel.formatting.excludeSemiColonAtEndOfLine`: Whether to exclude a semicolon at the end of each line in the barrel file. Default is `false`.
- `autoBarrel.formatting.useSingleQuotes`: Whether to use single quotes for string literals in the barrel file. Default is `true`.
- `autoBarrel.formatting.endOfLine`: The end-of-line character to use in the barrel file. Supported values are `lf` (line feed) and `crlf` (carriage return line feed). Default is `lf`.
- `autoBarrel.formatting.insertFinalNewline`: Whether to insert a final newline at the end of the barrel file. Default is `true`.

These settings are customizable to match your project's specific requirements. For instance, you can adjust the default language to `javascript` or expand the list of file extensions to include when exporting modules, for example: `["js", "jsx", "ts", "tsx", "vue", "astro"]`.

JavaScript example settings:

```json
{
  "autoBarrel.language.defaultLanguage": "JavaScript",
  "autoBarrel.files.disableRecursiveBarrelling": false,
  "autoBarrel.files.includeExtensionOnExport": ["js", "jsx"],
  "autoBarrel.files.ignoreFilePathPatternOnExport": ["**/*.spec.*", "**/*.test.*"],
  "autoBarrel.files.keepExtensionOnExport": false,
  "autoBarrel.files.detectExportsInFiles": false,
  "autoBarrel.files.exportDefaultFilename": "filename",
  "autoBarrel.formatting.excludeSemiColonAtEndOfLine": true,
  "autoBarrel.formatting.useSingleQuotes": true,
  "autoBarrel.formatting.endOfLine": "crlf",
  "autoBarrel.formatting.insertFinalNewline": false,
}
```

For more information on configuring Auto Barrel settings, refer to the [Project Settings](#project-settings) section.

## Follow Me

If you enjoy using Auto Barrel, consider following me for updates on this and future projects:

[![GitHub followers](https://img.shields.io/github/followers/ManuelGil?style=for-the-badge&logo=github)](https://github.com/ManuelGil)
[![X (formerly Twitter) Follow](https://img.shields.io/twitter/follow/imgildev?style=for-the-badge&logo=x)](https://twitter.com/imgildev)

## VSXpert Template

This extension was created using [VSXpert](https://vsxpert.com), a template that helps you create Visual Studio Code extensions with ease. VSXpert provides a simple and easy-to-use structure to get you started quickly.

## Other Extensions

- [Angular File Generator](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-angular-generator)
- [NestJS File Generator](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-nestjs-generator)
- [T3 Stack / NextJS / ReactJS File Generator](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-nextjs-generator)
- [Auto Barrel](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-auto-barrel)
- [CodeIgniter 4 Spark](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-codeigniter4-spark)

## Contributing

Auto Barrel is open-source software, and we welcome contributions from the community. If you'd like to contribute, please fork the [GitHub repository](https://github.com/ManuelGil/vscode-auto-barrel) and submit a pull request with your changes.

Before contributing, please read our [Contribution Guidelines](./CONTRIBUTING.md) for instructions on coding standards, testing, and more.

## Code of Conduct

We are committed to providing a friendly, safe, and welcoming environment for all, regardless of gender, sexual orientation, disability, ethnicity, religion, or similar personal characteristic. Please review our [Code of Conduct](./CODE_OF_CONDUCT.md) before participating in our community.

## Changelog

For a complete list of changes, see the [CHANGELOG.md](./CHANGELOG.md)

## Authors

- **Manuel Gil** - _Owner_ - [ManuelGil](https://github.com/ManuelGil)

See also the list of [contributors](https://github.com/ManuelGil/vscode-auto-barrel/contributors) who participated in this project.

## License

This extension is licensed under the MIT License. See the [MIT License](https://opensource.org/licenses/MIT) for details.
