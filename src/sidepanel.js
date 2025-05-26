document.addEventListener('DOMContentLoaded', function () {
    // Sélecteurs constants
    const SELECTORS = {
        htmlEditor: '#htmlInput',
        cssEditor: '#cssInput',
        previewFrame: '#previewFrame',
        htmlButton: '#btn-html',
        cssButton: '#btn-css',
        generateButton: '#btn-gen',
        toggleHtmlEditor: '#toggleEditorhtml',
        toggleCssEditor: '#toggleEditorcss',
        fullscreenButton: '#btn-fullscreen',
        supportButton: '#btn-support'
    };

    // Éléments DOM
    const elements = {
        htmlEditor: document.querySelector(SELECTORS.htmlEditor),
        cssEditor: document.querySelector(SELECTORS.cssEditor),
        previewFrame: document.querySelector(SELECTORS.previewFrame),
        htmlButton: document.querySelector(SELECTORS.htmlButton),
        cssButton: document.querySelector(SELECTORS.cssButton),
        generateButton: document.querySelector(SELECTORS.generateButton),
        toggleHtmlEditor: document.querySelector(SELECTORS.toggleHtmlEditor),
        toggleCssEditor: document.querySelector(SELECTORS.toggleCssEditor),
        fullscreenButton: document.querySelector(SELECTORS.fullscreenButton),
        supportButton: document.querySelector(SELECTORS.supportButton)
    };

    // Fonctions utilitaires
    const updatePreview = () => {
        const htmlContent = elements.htmlEditor.textContent;
        const cssContent = elements.cssEditor.textContent;

        const previewDoc = elements.previewFrame.contentDocument;
        previewDoc.open();
        previewDoc.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <style>${cssContent}</style>
            </head>
            <body>
                ${htmlContent}
            </body>
            </html>
        `);
        previewDoc.close();

        Prism.highlightElement(elements.htmlEditor);
        Prism.highlightElement(elements.cssEditor);
    };

    const handleClipboardPaste = async (editor) => {
        try {
            const text = await navigator.clipboard.readText();
            editor.textContent = text;
            Prism.highlightElement(editor);
        } catch (err) {
            console.error('Erreur lors de la lecture du presse-papiers :', err);
        }
    };

    const toggleEditor = (editor) => {
        editor.parentElement.style.display =
            editor.parentElement.style.display === 'none' ? 'block' : 'none';
    };

    // Gestionnaires d'événements
    if (elements.htmlButton) {
        elements.htmlButton.addEventListener('click', () => handleClipboardPaste(elements.htmlEditor));
    }

    if (elements.cssButton) {
        elements.cssButton.addEventListener('click', () => handleClipboardPaste(elements.cssEditor));
    }

    if (elements.generateButton) {
        elements.generateButton.addEventListener('click', updatePreview);
    }

    if (elements.toggleHtmlEditor) {
        elements.toggleHtmlEditor.addEventListener('click', () => toggleEditor(elements.htmlEditor));
    }

    if (elements.toggleCssEditor) {
        elements.toggleCssEditor.addEventListener('click', () => toggleEditor(elements.cssEditor));
    }

    if (elements.fullscreenButton) {
        elements.fullscreenButton.addEventListener('click', () => {
            const previewDoc = elements.previewFrame.contentDocument;
            const previewContent = previewDoc.documentElement.outerHTML;
            const blob = new Blob([previewContent], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            window.open(url, '_blank');
        });
    }

    if (elements.supportButton) {
        elements.supportButton.addEventListener('click', () => {
            const width = 600;
            const height = 700;
            const left = (window.screen.width - width) / 2;
            const top = (window.screen.height - height) / 2;

            window.open(
                'https://buy.stripe.com/fZu14o5DS9S6fpa9qQ2kw00',
                'Support',
                `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes,status=yes`
            );
        });
    }
});
