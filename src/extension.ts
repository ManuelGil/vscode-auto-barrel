// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// Import the Configs, Controllers, and Providers
import { EXTENSION_ID, ExtensionConfig } from './app/configs';
import { FeedbackController, ListFilesController } from './app/controllers';
import { FeedbackProvider, ListFilesProvider } from './app/providers';

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
  // Register ListFilesController
  // -----------------------------------------------------------------

  // Create a new ListFilesController
  const listFilesController = new ListFilesController(config);

  const disposableOpenFile = vscode.commands.registerCommand(
    `${EXTENSION_ID}.listFiles.openFile`,
    (uri) => listFilesController.openFile(uri),
  );

  context.subscriptions.push(disposableOpenFile);

  // -----------------------------------------------------------------
  // Register ListFilesProvider and list commands
  // -----------------------------------------------------------------

  // Create a new ListFilesProvider
  const listFilesProvider = new ListFilesProvider(listFilesController);

  // Register the list provider
  const listFilesTreeView = vscode.window.createTreeView(
    `${EXTENSION_ID}.listFilesView`,
    {
      treeDataProvider: listFilesProvider,
      showCollapseAll: true,
    },
  );

  const disposableRefreshList = vscode.commands.registerCommand(
    `${EXTENSION_ID}.listFiles.refreshList`,
    () => listFilesProvider.refresh(),
  );

  context.subscriptions.push(listFilesTreeView, disposableRefreshList);

  // -----------------------------------------------------------------
  // Register ListFilesProvider and ListMethodsProvider events
  // -----------------------------------------------------------------

  vscode.workspace.onDidChangeTextDocument(() => {
    listFilesProvider.refresh();
  });
  vscode.workspace.onDidCreateFiles(() => {
    listFilesProvider.refresh();
  });
  vscode.workspace.onDidDeleteFiles(() => {
    listFilesProvider.refresh();
  });
  vscode.workspace.onDidRenameFiles(() => {
    listFilesProvider.refresh();
  });
  vscode.workspace.onDidSaveTextDocument(() => {
    listFilesProvider.refresh();
  });

  // -----------------------------------------------------------------
  // Register FeedbackProvider and Feedback commands
  // -----------------------------------------------------------------

  // Create a new FeedbackProvider
  const feedbackProvider = new FeedbackProvider(new FeedbackController());

  // Register the feedback provider
  const feedbackTreeView = vscode.window.createTreeView(
    `${EXTENSION_ID}.feedbackView`,
    {
      treeDataProvider: feedbackProvider,
    },
  );

  // Register the commands
  const disposableAboutUs = vscode.commands.registerCommand(
    `${EXTENSION_ID}.feedback.aboutUs`,
    () => feedbackProvider.controller.aboutUs(),
  );
  const disposableDocumentation = vscode.commands.registerCommand(
    `${EXTENSION_ID}.feedback.documentation`,
    () => feedbackProvider.controller.documentation(),
  );
  const disposableReportIssues = vscode.commands.registerCommand(
    `${EXTENSION_ID}.feedback.reportIssues`,
    () => feedbackProvider.controller.reportIssues(),
  );
  const disposableRateUs = vscode.commands.registerCommand(
    `${EXTENSION_ID}.feedback.rateUs`,
    () => feedbackProvider.controller.rateUs(),
  );
  const disposableFollowUs = vscode.commands.registerCommand(
    `${EXTENSION_ID}.feedback.followUs`,
    () => feedbackProvider.controller.followUs(),
  );
  const disposableSupportUs = vscode.commands.registerCommand(
    `${EXTENSION_ID}.feedback.supportUs`,
    () => feedbackProvider.controller.supportUs(),
  );

  context.subscriptions.push(
    feedbackTreeView,
    disposableAboutUs,
    disposableDocumentation,
    disposableReportIssues,
    disposableRateUs,
    disposableFollowUs,
    disposableSupportUs,
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
