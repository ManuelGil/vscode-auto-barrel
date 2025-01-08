// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// Import the Configs, Controllers, and Providers
import {
  EXTENSION_DISPLAY_NAME,
  EXTENSION_ID,
  EXTENSION_NAME,
  ExtensionConfig,
  USER_PUBLISHER,
} from './app/configs';
import { FilesController } from './app/controllers';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
  // The code you place here will be executed every time your command is executed
  let resource: vscode.WorkspaceFolder | undefined;

  // Check if there are workspace folders
  if (
    !vscode.workspace.workspaceFolders ||
    vscode.workspace.workspaceFolders.length === 0
  ) {
    const message = vscode.l10n.t(
      'No workspace folders are open. Please open a workspace folder to use this extension',
    );
    vscode.window.showErrorMessage(message);
    return;
  }

  // Optionally, prompt the user to select a workspace folder if multiple are available
  if (vscode.workspace.workspaceFolders.length === 1) {
    resource = vscode.workspace.workspaceFolders[0];
  } else {
    const placeHolder = vscode.l10n.t(
      'Select a workspace folder to use. This folder will be used to load workspace-specific configuration for the extension',
    );
    const selectedFolder = await vscode.window.showWorkspaceFolderPick({
      placeHolder,
    });

    resource = selectedFolder;
  }

  // -----------------------------------------------------------------
  // Initialize the extension
  // -----------------------------------------------------------------

  // Get the configuration for the extension
  const config = new ExtensionConfig(
    vscode.workspace.getConfiguration(EXTENSION_ID, resource?.uri),
  );

  // Watch for changes in the configuration
  vscode.workspace.onDidChangeConfiguration((event) => {
    const workspaceConfig = vscode.workspace.getConfiguration(
      EXTENSION_ID,
      resource?.uri,
    );

    if (event.affectsConfiguration(`${EXTENSION_ID}.enable`, resource?.uri)) {
      const isEnabled = workspaceConfig.get<boolean>('enable');

      config.update(workspaceConfig);

      if (isEnabled) {
        const message = vscode.l10n.t('{0} is now enabled and ready to use', [
          EXTENSION_DISPLAY_NAME,
        ]);
        vscode.window.showInformationMessage(message);
      } else {
        const message = vscode.l10n.t('{0} is now disabled', [
          EXTENSION_DISPLAY_NAME,
        ]);
        vscode.window.showInformationMessage(message);
      }
    }

    if (event.affectsConfiguration(EXTENSION_ID, resource?.uri)) {
      config.update(workspaceConfig);
    }
  });

  // -----------------------------------------------------------------
  // Get version of the extension
  // -----------------------------------------------------------------

  // Get the previous version of the extension
  const previousVersion = context.globalState.get('version');
  // Get the current version of the extension
  const currentVersion = context.extension.packageJSON.version;

  // Check if the extension is running for the first time
  if (!previousVersion) {
    const message = vscode.l10n.t(
      'Welcome to {0} version {1}! The extension is now active',
      [EXTENSION_DISPLAY_NAME, currentVersion],
    );
    vscode.window.showInformationMessage(message);

    // Update the version in the global state
    context.globalState.update('version', currentVersion);
  }

  if (previousVersion && previousVersion !== currentVersion) {
    // Check if the extension has been updated
    const actions: vscode.MessageItem[] = [
      {
        title: vscode.l10n.t('Release Notes'),
      },
      {
        title: vscode.l10n.t('Close'),
      },
    ];

    const message = vscode.l10n.t(
      'New version of {0} is available. Check out the release notes for version {1}',
      [EXTENSION_DISPLAY_NAME, currentVersion],
    );
    vscode.window.showInformationMessage(message, ...actions).then((option) => {
      if (!option) {
        return;
      }

      // Handle the actions
      switch (option?.title) {
        case actions[0].title:
          vscode.env.openExternal(
            vscode.Uri.parse(
              `https://marketplace.visualstudio.com/items/${USER_PUBLISHER}.${EXTENSION_NAME}/changelog`,
            ),
          );
          break;

        default:
          break;
      }
    });

    // Update the version in the global state
    context.globalState.update('version', currentVersion);
  }

  // -----------------------------------------------------------------
  // Register FilesController
  // -----------------------------------------------------------------

  // Create a new FilesController
  const filesController = new FilesController(config);

  const disposableCreateBarrel = vscode.commands.registerCommand(
    `${EXTENSION_ID}.createBarrel`,
    (args) => {
      // Check if the extension is enabled
      if (!config.enable) {
        const message = vscode.l10n.t(
          '{0} is disabled in settings. Enable it to use its features',
          [EXTENSION_DISPLAY_NAME],
        );
        vscode.window.showErrorMessage(message);
        return;
      }

      filesController.createBarrel(args);
    },
  );

  const disposableUpdateBarrelInFolder = vscode.commands.registerCommand(
    `${EXTENSION_ID}.updateBarrelInFolder`,
    (args) => {
      // Check if the extension is enabled
      if (!config.enable) {
        const message = vscode.l10n.t(
          '{0} is disabled in settings. Enable it to use its features',
          [EXTENSION_DISPLAY_NAME],
        );
        vscode.window.showErrorMessage(message);
        return;
      }

      filesController.updateBarrelInFolder(args);
    },
  );

  const disposableUpdateBarrel = vscode.commands.registerCommand(
    `${EXTENSION_ID}.updateBarrel`,
    (args) => {
      // Check if the extension is enabled
      if (!config.enable) {
        const message = vscode.l10n.t(
          '{0} is disabled in settings. Enable it to use its features',
          [EXTENSION_DISPLAY_NAME],
        );
        vscode.window.showErrorMessage(message);
        return;
      }

      filesController.updateBarrel(args);
    },
  );

  context.subscriptions.push(
    disposableCreateBarrel,
    disposableUpdateBarrelInFolder,
    disposableUpdateBarrel,
  );

  // -----------------------------------------------------------------
  // Register On Did Delete Files event listener
  // -----------------------------------------------------------------

  vscode.workspace.onDidDeleteFiles(() => {
    const message = vscode.l10n.t('Remember to update the barrel file');
    vscode.window.showInformationMessage(message);
  });
}

// this method is called when your extension is deactivated
export function deactivate() {}
