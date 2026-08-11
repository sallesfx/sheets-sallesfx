/**
 * Sheets - sallesfx | Data-Driven Engine & High-Res PNG Exporter
 */

const APP_VERSION = "v2.0.1";
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

    // Catálogo de Cheat Sheets (Baseado nos JSONs da pasta /data/)
    const CATALOG = {
        linux: {
            name: 'Linux Terminal',
            subcategories: [
                { id: 'navegacao', name: 'Navegação e Arquivos' },
                { id: 'fhs', name: 'Hierarquia de Arquivos (FHS)' }
            ]
        },
        git: {
            name: 'Git & GitHub',
            subcategories: [
                { id: 'basico', name: 'Fluxo de Trabalho Essencial' }
            ]
        },
        docker: {
            name: 'Docker & Containers',
            subcategories: [
                { id: 'basico', name: 'Comandos Fundamentais' }
            ]
        }
    };

    /**
     * Popula as opções do select de categorias
     */
    function initCategorySelect() {
        categorySelect.innerHTML = '';
        Object.keys(CATALOG).forEach(catKey => {
            const opt = document.createElement('option');
            opt.value = catKey;
            opt.textContent = CATALOG[catKey].name;
            categorySelect.appendChild(opt);
        });
    }

    /**
     * Atualiza as opções do select de subcategoria baseado na categoria selecionada
     */
    function updateSubcategoryOptions(categoryKey) {
        const category = CATALOG[categoryKey];
        subcategorySelect.innerHTML = '';

        if (!category || !category.subcategories || category.subcategories.length === 0) {
            const opt = document.createElement('option');
            opt.value = '';
            opt.textContent = 'Nenhum conteúdo disponível';
            opt.disabled = true;
            subcategorySelect.appendChild(opt);
            return;
        }

        category.subcategories.forEach(sub => {
            const opt = document.createElement('option');
            opt.value = sub.id;
            opt.textContent = sub.name;
            subcategorySelect.appendChild(opt);
        });
    }

    /**
     * Componente do Renderizador: converte objeto JSON em estrutura HTML do wallpaper
     */
    function renderSheet(data) {
        const cardsHtml = data.cards.map(card => `
            <div class="sheet-card">
                <div class="card-header">${card.header}</div>
                ${card.items.map(item => `
                    <div class="cmd-group">
                        <code class="cmd-line">${item.cmd}</code>
                        <span class="cmd-desc">${item.desc}</span>
                    </div>
                `).join('')}
            </div>
        `).join('');

        return `
            <div class="sheet-container">
                <div class="sheet-header">
                    <h1 class="sheet-title">${data.title}</h1>
                    <p class="sheet-subtitle">${data.subtitle}</p>
                </div>
                <div class="sheet-grid">
                    ${cardsHtml}
                </div>
                <div class="sheet-footer">
                    ${data.footer}
                </div>
            </div>
        `;
    }

    /**
     * Carrega os dados JSON do cheat sheet e injeta no container do preview
     */
    async function loadSheetData(category, subcategory) {
        if (!category || !subcategory) return;

        const dataPath = `data/${category}/${subcategory}.json`;

        try {
            const response = await fetch(dataPath);
            if (!response.ok) {
                return await loadLegacyTemplate(category, subcategory);
            }

            const sheetData = await response.json();
            previewContainer.innerHTML = renderSheet(sheetData);
        } catch (error) {
            console.error('Erro ao carregar dados do cheat sheet:', error);
            previewContainer.innerHTML = `
                <div style="color: #ef4444; padding: 2rem; text-align: center; font-family: monospace;">
                  Erro ao carregar os dados: ${dataPath}
                </div>
            `;
        }
    }

    /**
     * Fallback de compatibilidade para templates HTML antigos
     */
    async function loadLegacyTemplate(category, subcategory) {
        const templatePath = `templates/${category}/${subcategory}.html`;
        try {
            const response = await fetch(templatePath);
            if (!response.ok) throw new Error('Template não encontrado');
            const htmlContent = await response.text();
            previewContainer.innerHTML = htmlContent;
        } catch (err) {
            previewContainer.innerHTML = `
                <div style="color: #ef4444; padding: 2rem; text-align: center; font-family: monospace;">
                  Cheat sheet não encontrado.
                </div>
            `;
        }
    }

    /**
     * Atualiza o tema visual no atributo data-theme
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
        const category = categorySelect.value;
        const subcategory = subcategorySelect.value;

        // Feedback visual no botão durante o processamento
        const originalBtnText = btnExport.innerText;
        btnExport.innerText = 'Gerando Imagem...';
        btnExport.disabled = true;

        try {
            // 1. Clona o elemento mantendo os dados de tema e dimensões
            const exportContainer = previewContainer.cloneNode(true);

            // Importante: Posiciona no canto superior (0,0) atrás da interface (z-index negativo)
            // se usar -9999px, a renderização do SVG no html-to-image resulta em imagem em branco!
            exportContainer.style.position = 'fixed';
            exportContainer.style.top = '0px';
            exportContainer.style.left = '0px';
            exportContainer.style.width = `${targetDim.width}px`;
            exportContainer.style.height = `${targetDim.height}px`;
            exportContainer.style.zIndex = '-99999';
            exportContainer.style.transform = 'none';
            exportContainer.style.maxHeight = 'none';
            exportContainer.style.maxWidth = 'none';
            exportContainer.style.margin = '0';
            exportContainer.style.padding = '0';

            document.body.appendChild(exportContainer);

            let imageURL;

            // Tenta usar htmlToImage ou html2canvas com suporte a CORS e dimensões exatas
            if (window.htmlToImage) {
                try {
                    imageURL = await htmlToImage.toPng(exportContainer, {
                        width: targetDim.width,
                        height: targetDim.height,
                        pixelRatio: 1,
                        cacheBust: true,
                        style: {
                            position: 'relative',
                            top: '0',
                            left: '0',
                            margin: '0',
                            transform: 'none'
                        }
                    });
                } catch (e) {
                    console.warn('htmlToImage falhou, utilizando fallback html2canvas:', e);
                }
            }

            // Fallback robusto se htmlToImage falhar ou não gerar URL
            if (!imageURL && window.html2canvas) {
                const canvas = await html2canvas(exportContainer, {
                    width: targetDim.width,
                    height: targetDim.height,
                    scale: 1,
                    useCORS: true,
                    backgroundColor: null,
                    logging: false
                });
                imageURL = canvas.toDataURL('image/png');
            }

            // Remove o container temporário do DOM
            document.body.removeChild(exportContainer);

            if (!imageURL) {
                throw new Error('Não foi possível gerar a URL da imagem.');
            }

            // Dispara o download
            const downloadLink = document.createElement('a');
            downloadLink.download = `cheatsheet-${category}-${subcategory}-${currentTheme}-${selectedRes}.png`;
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
        loadSheetData(categorySelect.value, subcategorySelect.value);
    });

    subcategorySelect.addEventListener('change', () => {
        loadSheetData(categorySelect.value, subcategorySelect.value);
    });

    btnExport.addEventListener('click', exportWallpaper);

    // Inicialização do App
    initCategorySelect();
    updateSubcategoryOptions(categorySelect.value);
    loadSheetData(categorySelect.value, subcategorySelect.value);
    updateTheme(themeSelect.value);
});