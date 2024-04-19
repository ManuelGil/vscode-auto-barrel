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

  const disposableUpdateBarrel = vscode.commands.registerCommand(
    `${EXTENSION_ID}.updateBarrel`,
    (args) => filesController.updateBarrel(args),
  );

  context.subscriptions.push(disposableCreateBarrel, disposableUpdateBarrel);
}

// this method is called when your extension is deactivated
export function deactivate() {}
