# 📑 Sheets — sallesfx (`sheets.sallesfx.com.br`)

> Gerador open-source de wallpapers e cheatsheets de alta resolução (1080p, 2K, 4K) para desenvolvedores, sysadmins e entusiastas de tecnologia.

O **Sheets** é um projeto utilitário desenvolvido para criar papéis de parede elegantes com guias de consulta rápida (cheatsheets) de comandos de terminal, conceitos de desenvolvimento, containers e atalhos. O objetivo é promover o aprendizado passivo por imersão no desktop.

---

## 🎯 Funcionalidades Principais

- 🚀 **Arquitetura Orientada a Dados (JSON):** Separação total entre conteúdo (JSON) e apresentação. Adicionar novas cheatsheets é extremamente simples.
- 🎨 **Temas Customizáveis:** Suporte a paletas de cores consagradas como *Catppuccin Macchiato*, *Nord* e *Dracula*.
- 📐 **Múltiplas Resoluções (1080p, 2K, 4K):** Exportação nativa em PNG de altíssima nitidez via `html-to-image` (vetores SVG).
- 👁️ **Preview em Tempo Real:** Visualização responsiva instantânea das alterações de tema, categoria e resolução.
- ⚡ **100% Client-Side:** Todo o processamento e geração de imagem é executado localmente no navegador do usuário.

---

## 🛠️ Estrutura do Projeto

```text
sheets-sallesfx/
├── data/               # Arquivos de dados dos cheatsheets em formato JSON
│   ├── linux/          # Cheatsheets de Linux (Navegação, FHS, etc.)
│   ├── git/            # Cheatsheets de Git e GitHub
│   └── docker/         # Cheatsheets de Docker e Containers
├── public/
│   └── assets/
│       ├── css/        # Estilos globais, temas e regras de exportação (theme.css)
│       ├── js/         # Motor de renderização dinâmica (JSON -> HTML) e exportação (app.js)
│       └── images/     # Assets estáticos e favicons
├── templates/          # Templates legados (mantidos para compatibilidade)
├── index.html          # Interface principal da aplicação web
└── README.md           # Documentação do repositório
```

---

## 👥 Como Contribuir (Adicionando Novas Cheatsheets)

Graças à nova arquitetura orientada a dados, **você não precisa escrever HTML ou CSS** para adicionar novas cheatsheets!

### 1. Criar uma branch de trabalho
```bash
git checkout develop
git pull origin develop
git checkout -b feature/minha-nova-cheatsheet
```

### 2. Adicionar o arquivo JSON em `data/`
Crie um novo arquivo `.json` dentro da pasta da categoria correspondente (ex: `data/linux/redes.json` ou `data/python/basico.json`):

```json
{
  "id": "redes",
  "category": "linux",
  "title": "LINUX NETWORK CHEAT SHEET",
  "subtitle": "Comandos Essenciais de Diagnóstico e Redes • <span class=\"sheet-domain\">sallesfx.com.br</span>",
  "cards": [
    {
      "header": "🌐 1. Diagnóstico de Conexão",
      "items": [
        { "cmd": "ping <span class=\"cmd-flag\">8.8.8.8</span>", "desc": "Testa conectividade com um IP ou domínio." },
        { "cmd": "curl <span class=\"cmd-flag\">-I url</span>", "desc": "Exibe o cabeçalho HTTP de uma resposta." }
      ]
    }
  ],
  "footer": "Desenvolvido para aprendizado contínuo • <strong>sallesfx.com.br</strong>"
}
```

### 3. Registrar a nova opção no catálogo em `public/assets/js/app.js`
Adicione o identificador e nome da nova cheatsheet no objeto `CATALOG` dentro do `app.js`:

```javascript
const CATALOG = {
    linux: {
        name: 'Linux Terminal',
        subcategories: [
            { id: 'navegacao', name: 'Navegação e Arquivos' },
            { id: 'fhs', name: 'Hierarquia de Arquivos (FHS)' },
            { id: 'redes', name: 'Administração de Redes' } // <-- Adicionado!
        ]
    }
};
```

### 4. Enviar Pull Request
```bash
git add .
git commit -m "feat(cheatsheet): adiciona cheatsheet de redes linux em JSON"
git push origin feature/minha-nova-cheatsheet
```
Abra um **Pull Request (PR)** para a branch `develop`.

---

## 🤝 Contribuidores

Agradecemos a todos que ajudam a melhorar o **Sheets**:

- [@RawNuke](https://github.com/RawNuke) — Implementação da arquitetura i18n e traduções (PT, EN, ES, DE, FR).

---

## 🔗 Integração com o Ecossistema

Este projeto faz parte do ecossistema de ferramentas do [sallesfx.com.br](https://sallesfx.com.br) e pode ser acessado na seção [/arsenal](https://sallesfx.com.br/arsenal/).

Desenvolvido por **Marcelo Salles**