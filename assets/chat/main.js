// This script will be run within the webview itself
// It cannot access the main VS Code APIs directly.
(function () {
  const vscode = acquireVsCodeApi();

  // Variables
  const messages = document.querySelector('.message-list');
  const btn = document.querySelector('.btn');
  const input = document.querySelector('input');

  // Event Listeners
  /**
   * Handle the message from the extension
   * @param {Object} event The event object
   * @param {Object} event.data The json data that the extension sent
   * @param {String} event.data.type The type of the message
   * @param {String} event.data.value The value of the message
   * @returns {void}
   */
  window.addEventListener('message', (event) => {
    const message = event.data; // The json data that the extension sent
    switch (message.type) {
      case 'receiveMessage': {
        receiveMessage(message.value);
        break;
      }
    }
  });

  /**
   * Handle the button click event
   * @returns {void}
   * @listens btn#click
   * @emits sendMessage
   * @emits onBtnClicked
   */
  btn.addEventListener('click', () => {
    if (!input.value) return;
    onBtnClicked(input.value);
    sendMessage(input.value);
  });

  // Functions
  /**
   * Handle the button click event
   * @param {String} text The text to send
   * @returns {void}
   * @emits vscode.postMessage
   */
  function onBtnClicked(text) {
    vscode.postMessage({ type: 'sendMessage', value: text });
  }

  /**
   * Send a message to the chat
   * @param {String} text The text to send
   * @returns {void}
   */
  function sendMessage(text) {
    const message = document.createElement('li');
    message.classList.add('message-item', 'item-secondary');
    message.innerHTML = `<strong>You:</strong> ${text}`;
    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
    input.value = '';
  }

  /**
   * Receive a message from the chat
   * @param {String} text The text to receive
   * @returns {void}
   */
  function receiveMessage(text) {
    const message = document.createElement('li');
    message.classList.add('message-item', 'item-primary');
    message.innerHTML = `<strong>Bot:</strong> ${text}`;
    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
  }
})();
