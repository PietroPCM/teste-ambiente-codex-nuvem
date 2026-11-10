# Design e UX — Compasso

Redesign orientado por frontend-design (Anthropic) e web-design-guidelines (Vercel). Fontes em docs/REDESIGN.md. Configuração anterior do Impeccable removida.

## Fluxos
Preparar: mapa proporcional editável por teclado; edição explícita; orientações expansíveis; proteção de tempo na linha; proposta de cortes ao lado da atividade. Ajustar atraso leva foco ao campo. Atraso inicial zero.

Conduzir: tela dedicada com cronômetro, orientações, pausa, próxima atividade e sequência. Navegar não inicia o relógio; iniciar é explícito. Roteiro consultável durante a condução, com alterações bloqueadas. URL identifica modo; recarga retoma sessão ativa.

## Identidade
Manrope local em títulos e corpo. Títulos 24–34px, sem serifas; cronômetro 60–115px. Alinhamento à esquerda e numerais tabulares.

| Papel | Cor |
| --- | --- |
| Fundo | #f0f3f9 |
| Superfície | #ffffff |
| Tinta e navegação | #17223b |
| Texto secundário | #5d6880 |
| Ação principal | #2849dc |
| Seleção e proposta | #e8edff |
| Proteção | #ffe6a4 |
| Divisória | #e0e5ef |
| Foco | #e29200 |

Navegação lateral de 220px vira barra horizontal em 980px. Agenda + painel de 300px; empilhados em 700px. Mapas extensos têm rolagem interna. Raio: superfícies 14px, diálogos 18px e controles 8px.

Foco de 3px; ícones com nomes acessíveis; diálogos nomeados com Escape; erros recebem foco. Feedback de edição preserva posição. Transições de cor respeitam movimento reduzido. Testes axe e fluxos registrados em docs/TESTES.md.
