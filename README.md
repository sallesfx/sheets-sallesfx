# 📑 Sheets — sallesfx (`sheets.sallesfx.com.br`)

> Gerador open-source de wallpapers e cheatsheets de alta resolução para desenvolvedores, sysadmins e entusiastas de tecnologia.

O **Sheets** é um projeto paralelo e ferramenta utilitária desenvolvida para criar papéis de parede iterativos com guias de consulta rápida (cheatsheets) de comandos de terminal, conceitos de desenvolvimento, containers e atalhos. O objetivo é promover o aprendizado passivo por imersão no desktop.

---

## 🎯 Funcionalidades Principais (MVP)

- 🎨 **Temas Customizáveis:** Suporte a paletas como *Catppuccin*, *Nord* e *Dracula*.
- 📐 **Múltiplas Resoluções:** Exportação nativa em PNG para Full HD (1920x1080), 2K e Ultrawide.
- 👁️ **Preview em Tempo Real:** Visualização dinâmica dos seletores diretamente no navegador.
- 🌐 **Internacionalização (i18n):** Estrutura preparada para múltiplos idiomas (Português, Inglês, etc.).
- ⚡ **100% Client-Side:** Todo o processamento de imagem é executado localmente no navegador do usuário.

---

## 🛠️ Estrutura do Projeto

```text
sheets-sallesfx/
├── public/
│   └── assets/
│       ├── css/        # Estilos globais e temas (design system)
│       ├── js/         # Motor de renderização e exportação de imagens
│       └── images/     # Assets estáticos e ícones
├── templates/          # Estruturas HTML/CSS dos papéis de parede
│   ├── linux/          # Cheatsheets de Linux (Navegação, Redes, etc.)
│   ├── git/            # Cheatsheets de Git e GitHub
│   └── docker/         # Cheatsheets de Containers
├── locales/            # Arquivos de tradução em JSON (i18n)
│   ├── pt-BR.json
│   └── en-US.json
├── index.html          # Interface principal da aplicação web
└── README.md           # Documentação do repositório
```

---

## 👥 Como Contribuir (Guia para o Time)

Se você faz parte da equipe ou quer adicionar novos templates e idiomas ao projeto, siga o fluxo de contribuição via Git:

### 1. Criando uma nova funcionalidade / template
Nunca envie alterações diretamente na branch `main`. Sempre crie uma branch de funcionalidade (*feature branch*):

```bash
# Atualize seu repositório local
git checkout main
git pull origin main

# Crie sua branch temática
git checkout -b feature/nome-da-sua-cheatsheet
```

### 2. Adicionando um novo template
1. Adicione a estrutura do seu template em HTML na pasta correspondente dentro de `templates/` (ex: `templates/linux/redes.html`).
2. Utilize as variáveis CSS globais de cores definidas em `public/assets/css/theme.css`.
3. Mantenha os textos genéricos apontando para as chaves do dicionário em `locales/` para garantir o suporte a i18n.

### 3. Enviando para Revisão (Pull Request)
Após testar seu template localmente:

```bash
git add .
git commit -m "feat(templates): adiciona cheatsheet de gerenciamento de redes"
git push origin feature/nome-da-sua-cheatsheet
```
Abra um **Pull Request (PR)** apontando para a branch `main` (ou `develop`) e descreva as alterações realizadas para revisão.

---

## 🌐 Módulo de Internacionalização (i18n)

Para adicionar a tradução do seu template para outro idioma:
1. Abra os arquivos correspondentes na pasta `locales/` (`pt-BR.json`, `en-US.json`).
2. Insira a chave com as traduções equivalentes mantendo o mesmo padrão de nomenclatura.

---

## 🔗 Integração com o Arsenal

Este projeto é parte do ecossistema de ferramentas do [sallesfx.com.br](https://sallesfx.com.br) e fica disponível em [sheets.sallesfx.com.br](https://sheets.sallesfx.com.br) e na seção [/arsenal](https://sallesfx.com.br/arsenal/).

Desenvolvido por **Marcelo Salles**