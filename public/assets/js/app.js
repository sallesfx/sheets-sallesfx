/**
 * Sheets - sallesfx | Core Engine & High-Res PNG Exporter
 */

const APP_VERSION = "v1.1.0";
document.getElementById("app-version").textContent = APP_VERSION;

document.addEventListener('DOMContentLoaded', () => {
    // Elementos do DOM
    const categorySelect = document.getElementById('category');
    const subcategorySelect = document.getElementById('subcategory');
    const themeSelect = document.getElementById('theme');
    const resolutionSelect = document.getElementById('resolution');
    const btnExport = document.getElementById('btn-export');
    const previewContainer = document.getElementById('wallpaper-preview');

    // Mapeamento de dimensões para exportação em pixels reais
    const RESOLUTIONS = {
        '1080p': { width: 1920, height: 1080 },
        '2k': { width: 2560, height: 1440 },
        '4k': { width: 3840, height: 2160 }
    };

    // Mapeamento de templates disponíveis por categoria
    const TEMPLATE_MAP = {
        linux: [
            { id: 'navegacao', name: 'Navegação e Arquivos', disabled: false },
            { id: 'fhs', name: 'Hierarquia de Arquivos (FHS)', disabled: false },
            { id: 'redes', name: 'Administração de Redes (Em breve)', disabled: true },
            { id: 'processos', name: 'Gerenciamento do Sistema (Em breve)', disabled: true }
        ],
        git: [],
        docker: []
    };

    /**
     * Atualiza as opções do select de subcategoria baseado na categoria selecionada
     */
    function updateSubcategoryOptions(category) {
        const items = TEMPLATE_MAP[category] || [];
        if (items.length === 0) return;

        subcategorySelect.innerHTML = '';
        items.forEach(item => {
            const opt = document.createElement('option');
            opt.value = item.id;
            opt.textContent = item.name;
            if (item.disabled) opt.disabled = true;
            subcategorySelect.appendChild(opt);
        });
    }

    /**
     * Carrega o template HTML e injeta no container do preview
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
     * Atualiza o tema visual
     */
    function updateTheme(theme) {
        previewContainer.setAttribute('data-theme', theme);
    }

    /**
     * Gera e dispara o download do PNG em alta resolução
     */
    async function exportWallpaper() {
        const selectedRes = resolutionSelect.value;
        const targetDim = RESOLUTIONS[selectedRes] || RESOLUTIONS['1080p'];
        const currentTheme = themeSelect.value;
        const subcategory = subcategorySelect.value;

        // Feedback visual no botão durante o processamento
        const originalBtnText = btnExport.innerText;
        btnExport.innerText = 'Processando Imagem...';
        btnExport.disabled = true;

        try {
            // 1. Clona o elemento para um container invisível mantendo as dimensões reais de alta resolução
            const exportContainer = previewContainer.cloneNode(true);

            // Define tamanho fixo nativo em pixels (ex: 3840x2160 para 4K)
            exportContainer.style.width = `${targetDim.width}px`;
            exportContainer.style.height = `${targetDim.height}px`;
            exportContainer.style.position = 'fixed';
            exportContainer.style.top = '-9999px';
            exportContainer.style.left = '-9999px';
            exportContainer.style.transform = 'none';
            exportContainer.style.maxHeight = 'none';
            exportContainer.style.maxWidth = 'none';

            document.body.appendChild(exportContainer);

            // 2. Renderiza o Canvas usando html2canvas
            const canvas = await html2canvas(exportContainer, {
                width: targetDim.width,
                height: targetDim.height,
                scale: 1, // Mantém escala 1:1 com os pixels definidos
                useCORS: true,
                backgroundColor: null,
                logging: false
            });

            // 3. Remove o elemento temporário do DOM
            document.body.removeChild(exportContainer);

            // 4. Cria o link de download e dispara o clique automático
            const imageURL = canvas.toDataURL('image/png');
            const downloadLink = document.createElement('a');
            downloadLink.download = `cheatsheet-${subcategory}-${currentTheme}-${selectedRes}.png`;
            downloadLink.href = imageURL;
            downloadLink.click();

        } catch (error) {
            console.error('Erro ao exportar wallpaper:', error);
            alert('Ocorreu um erro ao gerar a imagem. Tente novamente.');
        } finally {
            // Restaura o botão
            btnExport.innerText = originalBtnText;
            btnExport.disabled = false;
        }
    }

    // Event Listeners
    themeSelect.addEventListener('change', (e) => updateTheme(e.target.value));
    categorySelect.addEventListener('change', () => {
        updateSubcategoryOptions(categorySelect.value);
        loadTemplate(categorySelect.value, subcategorySelect.value);
    });
    subcategorySelect.addEventListener('change', () => loadTemplate(categorySelect.value, subcategorySelect.value));

    // Evento de Clique para Download
    btnExport.addEventListener('click', exportWallpaper);

    // Inicialização
    updateSubcategoryOptions(categorySelect.value);
    loadTemplate(categorySelect.value, subcategorySelect.value);
    updateTheme(themeSelect.value);
});