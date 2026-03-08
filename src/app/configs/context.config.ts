/**
 * Keys used to store and retrieve data from the extension's global state.
 */
export enum ContextKeys {
  /** The URI string of the user's previously selected workspace folder. */
  SelectedWorkspaceFolder = 'selectedWorkspaceFolder',

  /** The last recorded version of the extension to detect updates. */
  Version = 'version',
}
