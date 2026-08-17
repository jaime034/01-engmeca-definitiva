# ENGMECA

Portal educacional de Engenharia Mecânica desenvolvido como Projeto Integrador do curso Técnico em Informática.

## Objetivo

Organizar cursos, referências técnicas, bibliotecas CAD e ferramentas úteis para estudantes e profissionais, aplicando conhecimentos de desenvolvimento web, experiência do usuário e organização da informação.

## Páginas

- `index.html`: apresentação e acesso às áreas do portal.
- `recursos.html`: biblioteca com pesquisa e filtros por categoria.
- `cursos.html`: trilhas de aprendizagem e método de estudo.
- `ferramentas.html`: conversor de unidades e atalhos técnicos.
- `sobre.html`: objetivos, tecnologias e etapas do Projeto Integrador.
- `contato.html`: formulário validado que prepara uma mensagem de e-mail.

## Organização dos arquivos

```text
engmeca/
├── index.html
├── recursos.html
├── cursos.html
├── ferramentas.html
├── sobre.html
├── contato.html
├── css/
│   ├── base.css
│   ├── layout.css
│   ├── components.css
│   ├── responsive.css
│   ├── pages.css
│   ├── style.css
├── js/
│   ├── theme-init.js
│   ├── include.js
│   ├── script.js
│   ├── search.js
│   ├── converter.js
│   └── contact.js
├── partials/
│   ├── header.html
│   └── footer.html
└── image/
```

## Tecnologias e recursos

- HTML5 semântico
- CSS3 responsivo com temas claro e escuro
- JavaScript sem frameworks
- Pesquisa e filtros de recursos
- Conversor de comprimento, massa e pressão
- Validação de formulário
- Navegação por teclado e atributos ARIA

## Como executar

O projeto utiliza componentes HTML compartilhados carregados por `fetch`. Por segurança, navegadores bloqueiam esse carregamento quando o arquivo é aberto diretamente pelo protocolo `file://`.

Execute o projeto em um servidor local. No Visual Studio Code:

1. Instale a extensão Live Server.
2. Clique com o botão direito em `index.html`.
3. Selecione **Open with Live Server**.

O projeto não exige instalação de dependências ou processo de compilação.

## Separação de responsabilidades

- `partials/`: HTML compartilhado do cabeçalho e rodapé.
- `base.css`: variáveis, reset, tipografia e elementos fundamentais.
- `layout.css`: cabeçalho, navegação e rodapé.
- `components.css`: botões, cards, busca, hero e componentes reutilizáveis.
- `responsive.css`: adaptações gerais para tablets e celulares.
- `pages.css`: estilos exclusivos das páginas internas.
- `include.js`: carregamento dos componentes HTML.
- Demais arquivos JavaScript: uma funcionalidade principal por módulo.
