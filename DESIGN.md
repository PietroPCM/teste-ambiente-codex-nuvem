# Direção visual

Compasso é uma ferramenta local para facilitadores ajustarem e conduzirem workshops. Modo Operate: agenda em linhas, régua de horários e comparação dos cortes antes de aplicá-los. Papel claro, tinta verde profunda e coral para foco e intervenção. O painel de recuperação fica ao lado da agenda no desktop e abaixo dela no celular. Fontes empacotadas localmente; sem imagens externas.

## Valores implementados

Fonte de verdade: `src/style.css`. O inventário legível por máquina está em `.impeccable/design.json`. Apenas tinta, verde, texto secundário, linha e coral são variáveis CSS; os demais valores são literais, sem uma escala global de espaçamento.

| Papel | Valor |
| --- | --- |
| Fundo | `#f7f6f0` |
| Tinta / texto principal | `#243c35` (`--ink`) |
| Ação principal | `#214b3d` (`--green`) |
| Texto secundário | `#52665e` (`--muted`) |
| Divisórias | `#d9ded4` (`--line`) |
| Foco / intervenção | `#b8462d` (`--coral`) |
| Painel de recuperação | `#e9eddf` |
| Bloco em condução | `#edf1e5` |
| Erro / déficit | `#9d341f` |

DM Sans é a família padrão; Newsreader, com fallback Georgia, aparece em `h1` e `h2`. Título principal: `clamp(36px, 4vw, 54px)`, peso 400, entrelinha 1,1; no celular, 40px. Título de seção: 31px, peso 400, entrelinha 1,12, com ajustes locais. Texto corrido tem entrelinha 1,6. Horários, durações e cronômetro usam numerais tabulares.

O conteúdo tem largura máxima de 1380px. A grade principal reserva 320px para a lateral, com intervalo de 42px; linhas da agenda usam 24px de espaço vertical. O painel recebe 26px de preenchimento. Botões e campos usam raio de 5px; o diálogo, 12px. Esses valores têm ajustes responsivos.

## Adaptação e estados

- Até 1000px: lateral de 290px, intervalo de 24px e painel com preenchimento de 22px.
- Até 760px: agenda e lateral se empilham, intervalo de 32px, margens horizontais de 6% e painel com preenchimento de 27px. Atalhos para recuperação e condução ficam visíveis.
- A partir de 1400px: conteúdo com preenchimento horizontal de 48px; cabeçalho alinha ao conteúdo com cálculo próprio.
- Foco visível: contorno coral de 3px, afastado 3px. Botões têm altura mínima padrão de 42px, mas existem exceções: títulos de bloco com 25px e ações de linha com 32px no desktop; no celular, ações de linha têm 40px de altura e 27px de largura. Não há garantia global de alvos de 40 × 40px.
- Hover muda a cor de fundo em 150ms. `prefers-reduced-motion: reduce` remove transições e animações. Impressão oculta controles e painel lateral, preservando a agenda.
