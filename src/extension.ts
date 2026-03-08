/**
 * @fileoverview Main entry point for the VS Code extension.
 * Handles activation and initialization of the ExtensionRuntime.
 */

import * as vscode from 'vscode';

import { ExtensionRuntime } from './extension.runtime';

/**
 * Called by VS Code when the extension is activated.
 * The extension is activated the very first time the command is executed.
 * Initializes the runtime environment and starts the extension logic.
 *
 * @param context - The extension context provided by VS Code.
 * @returns A promise that resolves when activation completes.
 */
export async function activate(
  context: vscode.ExtensionContext,
): Promise<void> {
  try {
    const runtime = new ExtensionRuntime(context);

    // Initialize the runtime environment
    const isInitialized = await runtime.initialize();

    if (!isInitialized) {
      return;
    }

    // Start the extension logic
    runtime.start();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('Extension activation failed:', error);
    vscode.window.showErrorMessage(
      `Extension activation failed: ${errorMessage}`,
    );
  }
}

/**
 * Called by VS Code when the extension is deactivated.
 * Cleans up resources if necessary.
 */
export function deactivate(): void {}
