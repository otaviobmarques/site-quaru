# Site do Quaru

Site de apresentação do **Quaru**, o parceiro de treino do dia a dia.
App sob domínio da **Domma Tecnologia**. Site desenvolvido pela **Agência REDBOX**.

- Site: https://otaviobmarques.github.io/site-quaru/
- App: https://otaviobmarques.github.io/quaru/
- Área do treinador: https://otaviobmarques.github.io/quaru/treinador/

## Como é feito
Site estático, sem dependências: `index.html`, `css/site.css` e `js/site.js` (animações com IntersectionObserver,
sem bibliotecas; tudo respeita a preferência "reduzir movimento" do sistema).

- `img/telas/`: telas reais do app e da área do treinador, com dados de demonstração (nenhum dado real de pessoa).
- `img/marca/`: logos oficiais do Quaru e da Domma Tecnologia e o mascote (mesmo desenho do app).
- `fontes/`: Bricolage Grotesque ExtraBold (SIL Open Font License 1.1, ver `BricolageGrotesque_OFL.txt`).
- `img/og-quaru.png`: imagem da pré-visualização do link (WhatsApp, Instagram, etc.).

### Logo da REDBOX
Coloque o logo em `img/marca/redbox-branco.png` (versão para fundo escuro: "RED" vermelho e "BOX" branco).
O site troca o texto pelo logo sozinho quando o arquivo existe.

## Publicação
A cada push na `main`, o GitHub Actions publica no GitHub Pages (`.github/workflows/publicar.yml`).
Na primeira vez, ative em **Settings → Pages → Build and deployment → Source: GitHub Actions**.

## Ver no computador
```bash
python3 -m http.server 8080
```
e abra http://localhost:8080.
