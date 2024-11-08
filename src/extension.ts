// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// Import the Configs, Controllers, and Providers
import { EXTENSION_ID, ExtensionConfig } from './app/configs';
import { FilesController } from './app/controllers';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // The code you place here will be executed every time your command is executed
  let resource:
    | vscode.Uri
    | vscode.TextDocument
    | vscode.WorkspaceFolder
    | undefined;

  // Get the resource for the workspace
  if (vscode.workspace.workspaceFolders) {
    resource = vscode.workspace.workspaceFolders[0];
  }

  // -----------------------------------------------------------------
  // Initialize the extension
  // -----------------------------------------------------------------

  // Get the configuration for the extension
  const config = new ExtensionConfig(
    vscode.workspace.getConfiguration(EXTENSION_ID, resource),
  );

  // -----------------------------------------------------------------
  // Register FilesController
  // -----------------------------------------------------------------

  // Create a new FilesController
  const filesController = new FilesController(config);

  const disposableCreateBarrel = vscode.commands.registerCommand(
    `${EXTENSION_ID}.createBarrel`,
    (args) => filesController.createBarrel(args),
  );

  const disposableUpdateBarrelInFolder = vscode.commands.registerCommand(
    `${EXTENSION_ID}.updateBarrelInFolder`,
    (args) => filesController.updateBarrelInFolder(args),
  );

  const disposableUpdateBarrel = vscode.commands.registerCommand(
    `${EXTENSION_ID}.updateBarrel`,
    (args) => filesController.updateBarrel(args),
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
