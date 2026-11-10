# Estado — Compasso

## Decisão
Roteiro de facilitação com recuperação explícita de atrasos no início, respeitando mínimos e blocos protegidos. Produto local, individual, sem APIs. Pesquisa em docs/DECISAO.md; hipótese comercial ainda não validada.

## Concluído
- Interface responsiva em português, edição/reordenação/exclusão/desfazer, exemplo identificado.
- Motor de distribuição proporcional com arredondamento determinístico e bloqueio quando inviável.
- Persistência local, backup/importação JSON validada e CSS de impressão.
- Cronômetro real por bloco, pausa/retomada, avanço e retomada após recarga.
- 11 testes de regras; 15 verificações no Chromium. npm ci e build passaram.
- Capturas reais desktop, celular e condução em evidence/; revisão independente e correções de falha de armazenamento/overflow.
- Documentação de uso, pesquisa, testes e demonstração; pacote ZIP sem dependências/caches.

## Executar
`npm ci` → `npm run dev`. Para checks: `npm test`, `npm run build`, `npm run test:e2e` (Chromium instalado; veja README).

## Limitações verificadas e pendências
Um roteiro por origem do navegador; usar uma aba por vez. Histórico de desfazer não persiste. Recuperação bloqueada durante condução. Sem contas ou colaboração. Windows/macOS, Safari/Firefox, leitores de tela e impressão física não testados. Nenhuma configuração externa pendente; nenhum deploy feito.

## Próximo passo
Experimento com cinco facilitadores: comparar o método atual com uma recuperação de dez minutos e observar entendimento dos cortes e preferência por uso real. Só ampliar produto após testar utilidade.
