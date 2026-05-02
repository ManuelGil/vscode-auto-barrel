/**
 * @fileoverview Converts absolute URIs into workspace-relative paths.
 * Used by controllers when a user right-clicks a file or folder in the
 * explorer so the extension can determine the target directory for
 * file generation.
 */

import { relative } from 'path';
import { Uri, workspace } from 'vscode';

import { ExtensionConfig } from '../configs';
import { asDirectoryUri } from './resolve.helper';
import { getWorkspaceRoot } from './workspace-root.helper';

/**
 * Converts a URI to a workspace-relative directory path.
 *
 * If the URI points to a file, it automatically resolves to the parent
 * directory so callers always receive a folder path.
 *
 * Supports two resolution modes controlled by `isRootContext`:
 * - **Root context** (`true`): computes a POSIX-style relative path from
 *   `config.workspaceSelection` using Node's `path.relative`. Used when the
 *   extension needs paths relative to the user-selected workspace root
 *   (e.g., for file generation commands).
 * - **Standard** (`false`): delegates to VS Code's `workspace.asRelativePath`,
 *   which resolves relative to the nearest workspace folder. Used for
 *   display purposes and multi-root workspace scenarios.
 *
 * @param targetUri - The URI to convert. When `undefined`, returns an empty string.
 * @param isRootContext - Selects the resolution mode (see above).
 * @param config - The extension configuration instance.
 * @returns The workspace-relative directory path, or an empty string when no path is provided.
 */
export const relativePath = async (
  targetUri: Uri | undefined,
  isRootContext: boolean,
  config: ExtensionConfig,
): Promise<string> => {
  const resolvedUri = targetUri ? await asDirectoryUri(targetUri) : undefined;

  let resultingFolderPath = '';

  if (isRootContext) {
    const activeWorkspaceRoot = getWorkspaceRoot(config, resolvedUri);
    if (activeWorkspaceRoot && resolvedUri) {
      resultingFolderPath = relative(activeWorkspaceRoot, resolvedUri.fsPath);
    }
  } else {
    resultingFolderPath = resolvedUri
      ? workspace.asRelativePath(resolvedUri.fsPath, false)
      : '';
  }

  return resultingFolderPath;
};
