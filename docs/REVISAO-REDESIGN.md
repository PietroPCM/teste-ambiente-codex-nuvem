# Revisão do redesign

Revisão estática de `src/main.js` e `src/style.css`, com inspeção de `evidence/desktop.png`, `mobile.png`, `conducao.png` e `ajuste.png`. Referência: decisões de `docs/REDESIGN.md`. Sem uso de Impeccable. Não foram executados testes de navegador nesta revisão.

## Achados e revisão das correções

1. **P2 — Foco perdido nas ações de condução e ajuste.** Em `src/main.js:58`, iniciar, pausar/retomar e avançar recriam o aplicativo sem reposicionar o foco. O botão acionado deixa de existir; a próxima navegação por Tab volta à estrutura anterior ao conteúdo. Em `src/main.js:49`, aplicar ajuste chega a focar o aviso por `change()`, mas o segundo `render()` remove esse foco imediatamente. Desfazer e encerrar também precisam de destino explícito. Restaurar Pausar/Retomar após alternância; ao iniciar/avançar, focar a atividade atual ou o controle apropriado; após aplicar/desfazer/encerrar, focar o aviso. Validar pela sequência de teclado, inclusive em viewport móvel.

2. **P3 — Modo e URL divergem ao iniciar/encerrar.** `setView()` sincroniza `?view`, mas os caminhos de início e encerramento em `src/main.js:58` alteram apenas a variável `view`. Reprodução: abrir `?view=live`, iniciar, encerrar, recarregar. A tela retorna à pré-condução, embora o encerramento tenha exibido Preparação. Centralizar atualização do modo e URL sem perder o foco escolhido para cada ação.

Releitura das correções em `src/main.js`:

- **P2 resolvido por leitura:** `render()` captura o controle ativo por atributos `data-*` ou pelo ID de um elemento dentro de `#app`, e restaura um controle habilitado e visível. Iniciar recebe fallback no título da atividade; pausar/retomar e avançar preservam seus controles; desfazer recebe fallback no aviso. `applyRecovery()` agora usa um único `change()` e preserva o foco no aviso. O ajuste final captura também `#confirm`: após Encerrar/Concluir, o botão deixa de existir e a restauração usa `#notice`, resolvendo a pendência encontrada na primeira releitura.
- **P3 resolvido por leitura:** `render()` sincroniza o parâmetro `view` com o estado corrente, cobrindo início e encerramento.

## Evidência positiva

- As capturas mostram separação clara entre preparar e conduzir, sem sobreposição visível de controles nas dimensões fornecidas.
- Proteção inline tem nome acessível, `aria-pressed`, estado visual e restauração explícita de foco após alteração. Durante sessão, os controles que alterariam o roteiro ficam desabilitados.
- O ajuste apresenta os cortes antes de aplicar e sinaliza cada proposta na atividade correspondente. A aplicação é bloqueada quando a recuperação é insuficiente.
- Navegação entre modos usa `aria-current`, remove o painel inativo da interação com `hidden` e move o foco ao conteúdo. Modais têm título acessível; erros de validação recebem foco.

As correções foram verificadas somente por leitura, sem pendências nos dois achados. A execução de testes de navegador pertence ao fluxo principal; esta revisão não afirma resultados dessa execução.
