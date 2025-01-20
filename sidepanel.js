document.addEventListener('DOMContentLoaded', function () {
    // Sélection des éditeurs et boutons
    const htmlEditor = document.getElementById('htmlInput');
    const cssEditor = document.getElementById('cssInput');
    const previewFrame = document.getElementById('previewFrame');

    const htmlButton = document.getElementById('btn-html');
    const cssButton = document.getElementById('btn-css');
    const generateButton = document.getElementById('btn-gen');

    const toggleHtmlEditor = document.getElementById('toggleEditorhtml');
    const toggleCssEditor = document.getElementById('toggleEditorcss');

    let htmlContent = htmlEditor ? htmlEditor.textContent : '';
    let cssContent = cssEditor ? cssEditor.textContent : '';
    let combinedContent = `<style>${cssContent}</style>${htmlContent}`;

    // Copier le contenu HTML depuis le presse-papiers
    if (htmlButton) {
        htmlButton.addEventListener('click', async () => {
            try {
                const text = await navigator.clipboard.readText();
                htmlEditor.textContent = text;
                Prism.highlightElement(htmlEditor);
            } catch (err) {
                console.error('Erreur lors de la lecture du presse-papiers :', err);
            }
        });
    } else {
        console.error("Le bouton HTML n'a pas été trouvé.");
    }

    // Copier le contenu CSS depuis le presse-papiers
    if (cssButton) {
        cssButton.addEventListener('click', async () => {
            try {
                const text = await navigator.clipboard.readText();
                cssEditor.textContent = text;
                Prism.highlightElement(cssEditor);
            } catch (err) {
                console.error('Erreur lors de la lecture du presse-papiers :', err);
            }
        });
    } else {
        console.error("Le bouton CSS n'a pas été trouvé.");
    }

    // Fonction pour mettre à jour l'aperçu
    function updatePreview() {
        htmlContent = htmlEditor.textContent;
        cssContent = cssEditor.textContent;
        combinedContent = `<style>${cssContent}</style>${htmlContent}`;

        previewFrame.contentDocument.body.innerHTML = combinedContent;
        Prism.highlightElement(htmlEditor);
        Prism.highlightElement(cssEditor);
    }

    if (generateButton) {
        generateButton.addEventListener('click', updatePreview);
    }

    toggleHtmlEditor.addEventListener('click', function () {
        htmlEditor.parentElement.style.display =
            htmlEditor.parentElement.style.display === 'none' ? 'block' : 'none';
    });

    toggleCssEditor.addEventListener('click', function () {
        cssEditor.parentElement.style.display =
            cssEditor.parentElement.style.display === 'none' ? 'block' : 'none';
    });
});
