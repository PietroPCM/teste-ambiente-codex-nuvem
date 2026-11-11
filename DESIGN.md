# Design e UX — Compasso

Redesign orientado por frontend-design (Anthropic) e web-design-guidelines (Vercel). Fontes em docs/REDESIGN.md. Configuração anterior do Impeccable removida.

## Fluxos
Preparar: mapa proporcional editável por teclado; edição explícita; orientações expansíveis; proteção de tempo na linha; proposta de cortes ao lado da atividade. Ajustar atraso leva foco ao campo. Atraso inicial zero.

Conduzir: tela dedicada com cronômetro, orientações, pausa, próxima atividade e sequência. Navegar não inicia o relógio; iniciar é explícito. Roteiro consultável durante a condução, com alterações bloqueadas. URL identifica modo; recarga retoma sessão ativa.

## Identidade
Manrope local em títulos e corpo; Sora 600 no logotipo, junto ao símbolo próprio (docs/MARCA.md). Títulos 24–34px, sem serifas; cronômetro 60–115px. Alinhamento à esquerda e numerais tabulares.

| Papel | Cor |
| --- | --- |
| Fundo | #f5f6f8 |
| Superfície | #ffffff |
| Tinta e navegação | #242b3d |
| Texto secundário | #616b7e |
| Ação principal | #3454d1 |
| Seleção e proposta | #edf1ff |
| Proteção | #fcf0de |
| Divisória | #e6e9f0 |
| Foco | #3454d1 |

Navegação horizontal segmentada. Conteúdo central com largura máxima de 1320px e agenda + painel de 332px, empilhados em 640px. Mapas extensos têm rolagem interna. Superfícies com raio de 22px, diálogos de 24px, controles de 11–17px. Campo de atraso tem foco externo integrado; nenhum retângulo de foco no input interno. Refinamento documentado em docs/ACABAMENTO.md.

Foco de 2px nos controles e tratamento de foco no contorno dos campos compostos; ícones com nomes acessíveis; diálogos nomeados com Escape; erros recebem foco. Feedback de edição preserva posição. Transições de cor respeitam movimento reduzido. Testes axe e fluxos registrados em docs/TESTES.md.
