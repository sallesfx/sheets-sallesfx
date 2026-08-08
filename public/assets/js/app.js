/**
 * Sheets - sallesfx | Core Rendering Engine
 */

document.addEventListener('DOMContentLoaded', () => {
    // Elementos do DOM
    const categorySelect = document.getElementById('category');
    const subcategorySelect = document.getElementById('subcategory');
    const themeSelect = document.getElementById('theme');
    const previewContainer = document.getElementById('wallpaper-preview');

    /**
     * Carrega o arquivo HTML do template e injeta no preview
     */
    async function loadTemplate(category, subcategory) {
        const templatePath = `templates/${category}/${subcategory}.html`;

        try {
            const response = await fetch(templatePath);
            if (!response.ok) throw new Error('Template não encontrado');

            const htmlContent = await response.text();
            previewContainer.innerHTML = htmlContent;
        } catch (error) {
            console.error('Erro ao carregar template:', error);
            previewContainer.innerHTML = `
        <div style="color: #ef4444; padding: 2rem; text-align: center;">
          Erro ao carregar o template: ${templatePath}
        </div>
      `;
        }
    }

    /**
     * Atualiza o tema visual do preview
     */
    function updateTheme(theme) {
        previewContainer.setAttribute('data-theme', theme);
    }

    // Event Listeners
    themeSelect.addEventListener('change', (e) => {
        updateTheme(e.target.value);
    });

    categorySelect.addEventListener('change', () => {
        loadTemplate(categorySelect.value, subcategorySelect.value);
    });

    subcategorySelect.addEventListener('change', () => {
        loadTemplate(categorySelect.value, subcategorySelect.value);
    });

    // Inicialização
    loadTemplate(categorySelect.value, subcategorySelect.value);
    updateTheme(themeSelect.value);
});