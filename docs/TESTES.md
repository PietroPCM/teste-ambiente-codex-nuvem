# Verificação executada

Ambiente: Linux, Node 24.22.1, npm 11.9.0. Data: 10/11/2026. Evidência do navegador em `evidence/browser-results.json` inclui versão exata do Chromium e instante da execução.

## Resultados

- `npm install`: dependências instaladas e lockfile criado; `npm ci` revalida instalação reproduzível na entrega.
- `npm test`: **11 testes passaram**, sem ignorados. Cobrem validação e sanitização, limites de duração/tamanho, cronograma, imutabilidade, proporção, arredondamento, proteção de blocos, déficit e recuperação repetida. Um teste percorre 121 cenários para verificar conservação e mínimos, sem apresentá-los como testes separados.
- `npm run dev -- --port 5173 --strictPort`: servidor iniciado e resposta HTTP 200 verificada.
- `npm run build`: compilação estática aprovada. Saída registrada em `evidence/build.log`.
- `npm run test:e2e`: **15 verificações de fluxo passaram** em Chromium real. Testa exemplo, aplicação com fim preservado, proteção de pausa, persistência após recarga, atraso inviável e inválido, edição com mínimo inválido, exclusão/desfazer, exportação real, estado vazio, importação inválida e restauração, pausa/retomada/avanço, reinício real do servidor, tela móvel e fechamento por Escape, falha de armazenamento simulada, escape de HTML importado, títulos/notas máximos sem espaços e ausência de erros JS/requisições com falha.

O teste abre a versão compilada, inicia e encerra o próprio servidor. O reinício preserva o contexto do navegador; não simula restauração de perfil após encerramento do sistema operacional. A pausa é verificada por comparação do relógio antes/depois de uma espera real.

## Inspeção visual

Capturas reais em `evidence/desktop.png` (1440 px), `evidence/mobile.png` (390 px) e `evidence/conducao.png`. Desktop e celular foram abertos para inspeção. O celular não tem overflow horizontal. O screenshot móvel representa o roteiro já editado pelo teste, não a tela inicial. Adicionados atalhos no celular para alcançar recuperação/condução sem percorrer toda a agenda.

Revisão independente de código encontrou aviso de falha de armazenamento encoberto pela mensagem de sucesso. Também identificou overflow em texto sem espaços, corrigido com quebra de palavras e limites flexíveis. Corrigido: falhas de persistência têm prioridade; um teste provoca `QuotaExceededError` e verifica o aviso.

## Não verificado / limites

- Windows, macOS, Safari, Firefox, celulares físicos e leitores de tela não foram executados. Documentação desses sistemas usa comandos portáveis; não equivale a testes nesses sistemas.
- Impressão tem CSS próprio; geração de PDF e resultado em impressora física não foram validados automaticamente.
- Não há integrações, credenciais ou backend a testar. O uso offline após instalação é arquiteturalmente viável com o servidor local, mas queda de rede durante instalação não foi simulada.
- Não há sincronização entre abas; use uma aba por vez. Não há contas nem isolamento multiusuário.
- Nenhuma entrevista, teste com facilitadores reais ou hipótese comercial foi validada.
- Revisão visual e testes não constituem auditoria completa de acessibilidade ou segurança.
