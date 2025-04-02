<!--
    Individuelles Chat-Widget entwickelt von Fabian
    Basierend auf n8n Chat-Integrationen
-->

(function() {
    if (window.FabianChatWidgetLoaded) return;
    window.FabianChatWidgetLoaded = true;

    const fontElement = document.createElement('link');
    fontElement.rel = 'stylesheet';
    fontElement.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap';
    document.head.appendChild(fontElement);

    const widgetStyles = document.createElement('style');
    widgetStyles.textContent = `
        .fabian-chat-widget {
            --fabian-primary: #2563eb;
            --fabian-secondary: #1d4ed8;
            --fabian-surface: #ffffff;
            --fabian-text: #111827;
            --fabian-text-light: #6b7280;
            --fabian-border: #e5e7eb;
            font-family: 'Inter', sans-serif;
        }

        .fabian-chat-widget .chat-window {
            position: fixed;
            bottom: 80px;
            right: 20px;
            width: 360px;
            height: 560px;
            background: var(--fabian-surface);
            border-radius: 14px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            border: 1px solid var(--fabian-border);
            display: none;
            flex-direction: column;
        }

        .fabian-chat-widget .chat-header {
            background: linear-gradient(90deg, var(--fabian-primary), var(--fabian-secondary));
            color: #fff;
            padding: 16px;
            font-weight: 700;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .fabian-chat-widget .chat-body {
            flex: 1;
            overflow-y: auto;
            padding: 20px;
        }

        .fabian-chat-widget .chat-footer {
            display: flex;
            border-top: 1px solid var(--fabian-border);
            padding: 12px;
        }

        .fabian-chat-widget .chat-input {
            flex: 1;
            padding: 10px;
            border: 1px solid var(--fabian-border);
            border-radius: 8px;
            font-size: 14px;
        }

        .fabian-chat-widget .chat-send {
            margin-left: 8px;
            background: var(--fabian-primary);
            border: none;
            color: #fff;
            padding: 0 16px;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
        }

        .fabian-chat-widget .chat-message {
            margin-bottom: 12px;
            font-size: 14px;
        }

        .fabian-chat-widget .chat-message.bot {
            color: var(--fabian-text);
        }

        .fabian-chat-widget .chat-message.user {
            color: var(--fabian-secondary);
            text-align: right;
        }

        .fabian-chat-widget .chat-launcher {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--fabian-primary);
            color: #fff;
            padding: 12px 20px;
            border-radius: 9999px;
            cursor: pointer;
            font-weight: 600;
            box-shadow: 0 2px 10px rgba(0,0,0,0.15);
        }
    `;
    document.head.appendChild(widgetStyles);

    const widgetRoot = document.createElement('div');
    widgetRoot.className = 'fabian-chat-widget';

    const chatWindow = document.createElement('div');
    chatWindow.className = 'chat-window';
    chatWindow.innerHTML = `
        <div class="chat-header">
            Fabian Assistent
            <button onclick="this.closest('.chat-window').style.display='none'">×</button>
        </div>
        <div class="chat-body" id="fabianChatBody">
            <div class="chat-message bot">Hallo! Wie kann ich dir helfen?</div>
        </div>
        <div class="chat-footer">
            <input type="text" class="chat-input" id="fabianChatInput" placeholder="Schreibe eine Nachricht...">
            <button class="chat-send" id="fabianChatSend">Senden</button>
        </div>
    `;

    const launcher = document.createElement('div');
    launcher.className = 'chat-launcher';
    launcher.textContent = 'Brauchst du Hilfe?';

    launcher.addEventListener('click', () => {
        chatWindow.style.display = 'flex';
    });

    widgetRoot.appendChild(chatWindow);
    widgetRoot.appendChild(launcher);
    document.body.appendChild(widgetRoot);

    const sendButton = chatWindow.querySelector('#fabianChatSend');
    const inputField = chatWindow.querySelector('#fabianChatInput');
    const chatBody = chatWindow.querySelector('#fabianChatBody');

    sendButton.addEventListener('click', () => {
        const text = inputField.value.trim();
        if (!text) return;

        const userMsg = document.createElement('div');
        userMsg.className = 'chat-message user';
        userMsg.textContent = text;
        chatBody.appendChild(userMsg);

        const botMsg = document.createElement('div');
        botMsg.className = 'chat-message bot';
        botMsg.textContent = 'Danke für deine Nachricht! Ich melde mich gleich zurück.';
        chatBody.appendChild(botMsg);

        inputField.value = '';
        chatBody.scrollTop = chatBody.scrollHeight;
    });
})();

