/**
 * @fileoverview Resolves the effective workspace root path for all file operations
 * in the extension. Acts as the single source of truth for determining where
 * generated files should be placed.
 */

import { workspace } from 'vscode';

import { ExtensionConfig } from '../configs';

/**
 * Returns the workspace root path used as the base for all file operations.
 *
 * Resolution order:
 * 1. `config.workspaceSelection` — set from the workspace folder the user selected
 *    via the sidebar (persisted in global state).
 * 2. First VS Code workspace folder — fallback for single-folder workspaces
 *    or when no explicit selection has been made.
 * 3. `undefined` — when no workspace is open.
 *
 * @param config - The active extension configuration instance.
 * @returns Absolute filesystem path to the workspace root,
 *   or `undefined` if no workspace is available.
 */
export const getWorkspaceRoot = (
  config: ExtensionConfig,
): string | undefined => {
  return (
    config.workspaceSelection ?? workspace.workspaceFolders?.[0]?.uri.fsPath
  );
};
