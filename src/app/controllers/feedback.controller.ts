import { MessageItem, Uri, env, window } from 'vscode';

import {
  EXTENSION_DISPLAY_NAME,
  MARKETPLACE_URL,
  REPOSITORY_URL,
  USER_NAME,
} from '../configs';

/**
 * The FeedbackController class.
 *
 * @class
 * @classdesc The class that represents the feedback controller.
 * @export
 * @public
 * @example
 * const controller = new FeedbackController();
 */
export class FeedbackController {
  // -----------------------------------------------------------------
  // Constructor
  // -----------------------------------------------------------------

  /**
   * Constructor for the FeedbackController class.
   *
   * @constructor
   * @public
   * @memberof FeedbackController
   */
  constructor() {}

  // -----------------------------------------------------------------
  // Methods
  // -----------------------------------------------------------------

  // Public methods
  /**
   * The aboutUs method.
   *
   * @function aboutUs
   * @public
   * @memberof FeedbackController
   *
   * @returns {void} - No return value
   */
  aboutUs(): void {
    env.openExternal(Uri.parse(`${REPOSITORY_URL}#readme`));
  }

  /**
   * The documentation method.
   *
   * @function documentation
   * @public
   * @memberof FeedbackController
   *
   * @returns {void} - No return value
   */
  documentation(): void {
    env.openExternal(Uri.parse(`${REPOSITORY_URL}/wiki`));
  }

  /**
   * The reportIssues method.
   *
   * @function reportIssues
   * @public
   * @memberof FeedbackController
   *
   * @returns {void} - No return value
   */
  reportIssues(): void {
    env.openExternal(Uri.parse(`${REPOSITORY_URL}/issues`));
  }

  /**
   * The rateUs method.
   *
   * @function rateUs
   * @public
   * @memberof FeedbackController
   *
   * @returns {void} - No return value
   */
  rateUs(): void {
    env.openExternal(Uri.parse(`${MARKETPLACE_URL}&ssr=false#review-details`));
  }

  /**
   * The followUs method.
   *
   * @function followUs
   * @public
   * @memberof FeedbackController
   *
   * @returns {void} - No return value
   */
  followUs(): void {
    env.openExternal(Uri.parse('https://twitter.com/ManuelGil'));
  }

  /**
   * The supportUs method.
   *
   * @function supportUs
   * @public
   * @async
   * @memberof FeedbackController
   *
   * @returns {Promise<void>} - The promise that resolves with no value
   */
  async supportUs(): Promise<void> {
    // Create the actions
    const actions: MessageItem[] = [
      { title: 'Become a Sponsor' },
      { title: 'Donate via PayPal' },
    ];

    // Show the message
    const option = await window.showInformationMessage(
      `Although ${EXTENSION_DISPLAY_NAME} is offered at no cost, your support is
        deeply appreciated if you find it beneficial. Thank you for considering!`,
      ...actions,
    );

    // Handle the actions
    switch (option?.title) {
      case actions[0].title:
        env.openExternal(Uri.parse(`https://github.com/sponsors/${USER_NAME}`));
        break;

      case actions[1].title:
        env.openExternal(Uri.parse(`https://patreon.com/${USER_NAME}`));
        break;
    }
  }
}
