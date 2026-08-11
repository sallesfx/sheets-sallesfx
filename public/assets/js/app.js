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
    const langSelect = document.getElementById('lang-select');
    const previewContainer = document.getElementById('wallpaper-preview');

    const uiTitle = document.getElementById('ui-title');
    const uiSubtitle = document.getElementById('ui-subtitle');
    const uiCategoryLabel = document.getElementById('ui-category-label');
    const uiContentLabel = document.getElementById('ui-content-label');
    const uiThemeLabel = document.getElementById('ui-theme-label');
    const uiResolutionLabel = document.getElementById('ui-resolution-label');
    const uiExportLabel = document.getElementById('ui-export-label');
    const uiPreviewStatus = document.getElementById('ui-preview-status');
    const uiGithub = document.getElementById('ui-github');

    const LOCALES = ["pt-BR", "en-US", "es-ES", "de-DE", "fr-FR"];
    const LOCALE_STORAGE_KEY = 'sheet-locale';

    const UI = {
        "pt-BR": {
            "title": "sallesfx / sheets - Configurar Wallpaper",
            "configTitle": "Configuração",
            "configSubtitle": "Personalize seu wallpaper técnico",
            "categoryLabel": "1. CATEGORIA",
            "contentLabel": "2. CONTEÚDO",
            "themeLabel": "3. TEMA VISUAL",
            "resolutionLabel": "4. RESOLUÇÃO DE SAÍDA",
            "exportButton": "Baixar PNG em Alta Resolução",
            "previewStatus": "Pré-visualização",
            "viewOnGithub": "Ver no GitHub",
            "noContent": "Nenhum conteúdo disponível",
            "loadError": "Erro ao carregar os dados: ",
            "sheetNotFound": "Cheat sheet não encontrado.",
            "generating": "Gerando Imagem...",
            "exportError": "Ocorreu um erro ao gerar a imagem. Tente novamente.",
            "catalog": {
                "linux": "Linux Terminal",
                "linux.navegacao": "Navegação e Arquivos",
                "linux.fhs": "Hierarquia de Arquivos (FHS)",
                "git": "Git & GitHub",
                "git.basico": "Fluxo de Trabalho Essencial",
                "docker": "Docker & Containers",
                "docker.basico": "Comandos Fundamentais"
            }
        },
        "en-US": {
            "title": "sallesfx / sheets - Configure Wallpaper",
            "configTitle": "Settings",
            "configSubtitle": "Customize your technical wallpaper",
            "categoryLabel": "1. CATEGORY",
            "contentLabel": "2. CONTENT",
            "themeLabel": "3. VISUAL THEME",
            "resolutionLabel": "4. OUTPUT RESOLUTION",
            "exportButton": "Download High-Res PNG",
            "previewStatus": "Preview",
            "viewOnGithub": "View on GitHub",
            "noContent": "No content available",
            "loadError": "Error loading data: ",
            "sheetNotFound": "Cheat sheet not found.",
            "generating": "Generating Image...",
            "exportError": "An error occurred while generating the image. Try again.",
            "catalog": {
                "linux": "Linux Terminal",
                "linux.navegacao": "Navigation and Files",
                "linux.fhs": "File Hierarchy (FHS)",
                "git": "Git & GitHub",
                "git.basico": "Essential Workflow",
                "docker": "Docker & Containers",
                "docker.basico": "Essential Commands"
            }
        },
        "es-ES": {
            "title": "sallesfx / sheets - Configura el fondo de pantalla",
            "configTitle": "Configuración",
            "configSubtitle": "Personaliza tu fondo de pantalla técnico",
            "categoryLabel": "1. CATEGORÍA",
            "contentLabel": "2. CONTENIDO",
            "themeLabel": "3. TEMA VISUAL",
            "resolutionLabel": "4. RESOLUCIÓN DE SALIDA",
            "exportButton": "Descargar PNG en alta resolución",
            "previewStatus": "Vista previa",
            "viewOnGithub": "Ver en GitHub",
            "noContent": "No hay contenido disponible",
            "loadError": "Error al cargar los datos: ",
            "sheetNotFound": "Hoja de referencia no encontrada.",
            "generating": "Generando imagen...",
            "exportError": "Se produjo un error al generar la imagen. Inténtalo de nuevo.",
            "catalog": {
                "linux": "Terminal Linux",
                "linux.navegacao": "Navegación y Archivos",
                "linux.fhs": "Jerarquía de Archivos (FHS)",
                "git": "Git y GitHub",
                "git.basico": "Flujo de trabajo esencial",
                "docker": "Docker y contenedores",
                "docker.basico": "Comandos fundamentales"
            }
        },
        "de-DE": {
            "title": "sallesfx / sheets - Wallpaper konfigurieren",
            "configTitle": "Einstellungen",
            "configSubtitle": "Passen Sie Ihr technisches Wallpaper an",
            "categoryLabel": "1. KATEGORIE",
            "contentLabel": "2. INHALT",
            "themeLabel": "3. VISUELLES THEMA",
            "resolutionLabel": "4. AUSGABEAUFLÖSUNG",
            "exportButton": "PNG in hoher Auflösung herunterladen",
            "previewStatus": "Vorschau",
            "viewOnGithub": "Auf GitHub ansehen",
            "noContent": "Kein Inhalt verfügbar",
            "loadError": "Fehler beim Laden der Daten: ",
            "sheetNotFound": "Cheat Sheet nicht gefunden.",
            "generating": "Bild wird generiert...",
            "exportError": "Beim Generieren des Bildes ist ein Fehler aufgetreten. Versuchen Sie es erneut.",
            "catalog": {
                "linux": "Linux-Terminal",
                "linux.navegacao": "Navigation und Dateien",
                "linux.fhs": "Dateihierarchie (FHS)",
                "git": "Git & GitHub",
                "git.basico": "Wesentlicher Arbeitsablauf",
                "docker": "Docker & Container",
                "docker.basico": "Grundlegende Befehle"
            }
        },
        "fr-FR": {
            "title": "sallesfx / sheets - Configurer le fond d'écran",
            "configTitle": "Configuration",
            "configSubtitle": "Personnalisez votre fond d'écran technique",
            "categoryLabel": "1. CATÉGORIE",
            "contentLabel": "2. CONTENU",
            "themeLabel": "3. THÈME VISUEL",
            "resolutionLabel": "4. RÉSOLUTION DE SORTIE",
            "exportButton": "Télécharger le PNG en haute résolution",
            "previewStatus": "Aperçu",
            "viewOnGithub": "Voir sur GitHub",
            "noContent": "Aucun contenu disponible",
            "loadError": "Erreur lors du chargement des données : ",
            "sheetNotFound": "Aide-mémoire introuvable.",
            "generating": "Génération de l'image...",
            "exportError": "Une erreur est survenue lors de la génération de l'image. Réessayez.",
            "catalog": {
                "linux": "Terminal Linux",
                "linux.navegacao": "Navigation et fichiers",
                "linux.fhs": "Hiérarchie des fichiers (FHS)",
                "git": "Git & GitHub",
                "git.basico": "Flux de travail essentiel",
                "docker": "Docker et conteneurs",
                "docker.basico": "Commandes fondamentales"
            }
        }
    };

    let currentLocale = 'pt-BR';

    // Mapeamento de dimensões para exportação em pixels reais
    const RESOLUTIONS = {
        '1080p': { width: 1920, height: 1080 },
        '2k': { width: 2560, height: 1440 },
        '4k': { width: 3840, height: 2160 }
    };

    // Catálogo de Cheat Sheets (Baseado nos JSONs da pasta /data/)
    const CATALOG = {
        linux: {
            subcategories: [
                { id: 'navegacao' },
                { id: 'fhs' }
            ]
        },
        git: {
            subcategories: [
                { id: 'basico' }
            ]
        },
        docker: {
            subcategories: [
                { id: 'basico' }
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
            opt.textContent = UI[currentLocale].catalog[catKey];
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
            opt.textContent = UI[currentLocale].noContent;
            opt.disabled = true;
            subcategorySelect.appendChild(opt);
            return;
        }

        category.subcategories.forEach(sub => {
            const opt = document.createElement('option');
            opt.value = sub.id;
            opt.textContent = UI[currentLocale].catalog[`${categoryKey}.${sub.id}`];
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
    async function loadSheetData(category, subcategory, locale) {
        if (!category || !subcategory) return;

        const dataPath = `data/${locale}/${category}/${subcategory}.json`;

        let sheetData = null;
        try {
            const response = await fetch(dataPath);
            if (response.ok) {
                sheetData = await response.json();
            }
        } catch (error) {
            sheetData = null;
        }

        if (!sheetData) {
            if (locale === 'pt-BR') {
                return await loadLegacyTemplate(category, subcategory);
            }
            const fallbackPath = `data/pt-BR/${category}/${subcategory}.json`;
            try {
                const response = await fetch(fallbackPath);
                if (response.ok) {
                    sheetData = await response.json();
                }
            } catch (error) {
                sheetData = null;
            }
            if (!sheetData) {
                return await loadLegacyTemplate(category, subcategory);
            }
        }

        try {
            previewContainer.innerHTML = renderSheet(sheetData);
        } catch (error) {
            console.error('Erro ao carregar dados do cheat sheet:', error);
            previewContainer.innerHTML = `
                <div style="color: #ef4444; padding: 2rem; text-align: center; font-family: monospace;">
                  ${UI[locale].loadError} ${dataPath}
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
                  ${UI[currentLocale].sheetNotFound}
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
        const originalBtnText = uiExportLabel.textContent;
        uiExportLabel.textContent = UI[currentLocale].generating;
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
            alert(UI[currentLocale].exportError);
        } finally {
            // Restaura o botão
            uiExportLabel.textContent = originalBtnText;
            btnExport.disabled = false;
        }
    }

    /**
     * Aplica o locale ativo na interface e recarrega os dados
     */
    function applyLocale(locale) {
        const active = LOCALES.includes(locale) ? locale : 'pt-BR';
        const dict = UI[active];
        currentLocale = active;

        document.documentElement.lang = active;
        document.title = dict.title;
        uiTitle.textContent = dict.configTitle;
        uiSubtitle.textContent = dict.configSubtitle;
        uiCategoryLabel.textContent = dict.categoryLabel;
        uiContentLabel.textContent = dict.contentLabel;
        uiThemeLabel.textContent = dict.themeLabel;
        uiResolutionLabel.textContent = dict.resolutionLabel;
        uiExportLabel.textContent = dict.exportButton;
        uiPreviewStatus.textContent = dict.previewStatus;
        uiGithub.textContent = dict.viewOnGithub;
        langSelect.value = active;
        localStorage.setItem(LOCALE_STORAGE_KEY, active);

        const selectedCategory = categorySelect.value;
        initCategorySelect();
        categorySelect.value = selectedCategory;
        updateSubcategoryOptions(categorySelect.value);
        loadSheetData(categorySelect.value, subcategorySelect.value, active);
    }

    // Event Listeners
    themeSelect.addEventListener('change', (e) => updateTheme(e.target.value));

    langSelect.addEventListener('change', (e) => applyLocale(e.target.value));

    categorySelect.addEventListener('change', () => {
        updateSubcategoryOptions(categorySelect.value);
        loadSheetData(categorySelect.value, subcategorySelect.value, currentLocale);
    });

    subcategorySelect.addEventListener('change', () => {
        loadSheetData(categorySelect.value, subcategorySelect.value, currentLocale);
    });

    btnExport.addEventListener('click', exportWallpaper);

    // Inicialização do App
    const storedLocale = localStorage.getItem(LOCALE_STORAGE_KEY);
    const initialLocale = LOCALES.includes(storedLocale) ? storedLocale : 'pt-BR';
    applyLocale(initialLocale);
    updateTheme(themeSelect.value);
});