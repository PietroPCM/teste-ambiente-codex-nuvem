# Redesign de design e UX

Pedido: substituir direção Impeccable, incluindo experiência de uso. Não usar suas skills, comandos ou padrões como autoridade.

## Skills escolhidas
- Anthropic frontend-design: https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md — lida da fonte oficial. Melhor ajuste para construir interface com direção própria, composição, tipografia e revisão visual.
- Vercel web-design-guidelines: https://github.com/vercel-labs/agent-skills/blob/main/skills/web-design-guidelines/SKILL.md — revisão de formulários, estados, teclado, foco e responsividade. Regras consultadas em https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md.
- Creative Production foi avaliada e descartada como fluxo principal: orientada a peças visuais e boards, não à implementação de UX de aplicação. Não houve instalação global.

## Decisão antes da implementação
Cena de uso: facilitador alterna preparação concentrada com condução sob pressão. O problema da interface anterior era misturar essas duas tarefas, dispersar ações e esconder edição nos títulos. A direção nova é uma mesa de operação, clara e compacta, com roteiro visual e modo de condução dedicado.

Paleta: branco #ffffff, superfície fria #f0f3f9, tinta #17223b, azul #2849dc, lavanda funcional #e8edff, amarelo de atenção #ffe6a4. Fonte Manrope, títulos e corpo na mesma família; sem serifas editoriais. Alinhamento à esquerda; números tabulares. A régua de blocos é o elemento expressivo: mostra a estrutura real do encontro.

Estrutura: navegação lateral → cabeçalho com ações → linha do tempo → roteiro compacto + painel de ajuste. Em condução: atividade atual, cronômetro grande, próxima atividade e fila. No celular a navegação vira barra horizontal e as ações ficam ao alcance sem depender de hover.

Revisão do plano: evitar apenas trocar o verde por azul. Mudanças estruturais necessárias: separar modos, reduzir a altura das linhas, mostrar controles de edição/proteção, tornar orientações expansíveis, colocar iniciar no cabeçalho e preservar a posição/foco após ações.
