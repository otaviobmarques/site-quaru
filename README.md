# Site do Quaru

Site de apresentação do **Quaru**, o parceiro de treino do dia a dia.
App sob domínio da **Domma Tecnologia**. Site desenvolvido pela **Agência REDBOX**.

- Site: https://quaru.com.br
- App: https://app.quaru.com.br/
- Área do treinador: https://app.quaru.com.br/treinador/

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
Hospedado na **Vercel** (time REDBOX, projeto `site-quaru`), ligado a este repositório: cada push na `main`
publica em https://quaru.com.br, e cada PR ganha um link de prévia. `vercel.json` define os cabeçalhos de
segurança (CSP restrita, HSTS, nosniff), o cache das imagens e URLs sem `.html`. Sem etapa de build.

## Ver no computador
```bash
python3 -m http.server 8080
```
e abra http://localhost:8080.
