# Decisão de produto

Data da consulta: 10/11/2026. Decisão provisória, sem entrevistas ou validação de pagamento.

## Escolha

Uma mesa de condução de workshops para facilitadores independentes: planejar uma sessão, conduzi-la com cronômetro e recuperar atrasos sem cortar silenciosamente atividades essenciais. O núcleo é transformar uma restrição de horário em uma proposta de cortes explícita, respeitando a duração mínima de cada bloco e permitindo ao facilitador aceitar ou recusar a proposta.

Usuário: facilitador solo de workshops, treinamento e dinâmicas de equipe. Quem poderia pagar: o profissional que repete sessões e a pequena consultoria que administra seus roteiros. Situação: o encontro começa atrasado e o facilitador precisa adaptar a sequência antes de iniciar. Atrasos durante atividades são uma extensão futura, não implementada nesta versão. Consequência hipotética: correr no fechamento ou ultrapassar a janela contratada.

Entrada: agenda com duração, mínimo, ordem e blocos protegidos; horário da sessão. Ação central: replanejar o início atrasado, revisar os cortes e então iniciar a condução. Resultado útil: uma agenda executável, com cortes identificáveis e aviso quando os mínimos tornam impossível recuperar todo o atraso. Motivo para retornar: reutilizar o roteiro e conduzir a próxima sessão, mantendo cópias exportáveis.

## Comparação de três oportunidades

| Oportunidade | Evidência e alternativa | Valor possível | Risco decisivo |
| --- | --- | --- | --- |
| Recuperar atrasos em workshops | O README oficial do Ontime descreve agenda, operação e atrasos em tempo real; há categoria e alternativa madura. | Decisão explícita de cortes por duração mínima, linguagem de facilitação, instalação simples, uso individual. | Agenda e cronômetro já existem gratuitamente. O recorte precisa economizar esforço durante uma sessão real. |
| Revisar legendas SRT | O README oficial do Subtitle Edit confirma edição, conversão, vídeo e backup local, com núcleo offline e aberto. | Checagem rápida de tempos, sobreposição e limites configuráveis para revisores ocasionais. | Substituto gratuito muito completo; regras automáticas não garantem qualidade linguística nem acessibilidade. |
| Revisar mudanças de escopo para freelancers | Páginas comerciais tentadas estavam bloqueadas; pesquisa desta opção ficou incompleta. Planilha e documento são substitutos presumidos, não observação desta sessão. | Comparar escopo inicial com pedido novo e gerar registro de mudança. | Interpretação semântica e contratual difícil de verificar sem dados reais; risco de virar um formulário para IA. |

Não atribuímos notas artificiais. Agenda venceu pela demonstração local independente de credenciais, regras determinísticas testáveis e possibilidade de um fluxo pequeno completo. A frequência e intensidade da dor são hipóteses, não medidas nesta sessão.

## Fontes efetivamente consultadas

1. **Ontime, README oficial** — https://raw.githubusercontent.com/cpvalente/ontime/master/README.md — resposta HTTP bem-sucedida. O documento descreve gestão de event rundowns, scheduling e cueing; atualizações de atrasos; APIs OSC/HTTP/WebSocket; versões locais gratuitas e serviço cloud. É evidência de capacidade declarada pelo fornecedor, não teste do concorrente. Nenhum preço do cloud foi verificado.
2. **Subtitle Edit, README oficial** — https://raw.githubusercontent.com/SubtitleEdit/subtitleedit/main/README.md — resposta HTTP bem-sucedida. Declara núcleo offline, edição/conversão, reprodução, backup local e integrações online opcionais. Não executamos o software.

As URLs acima apontam branches mutáveis; estas observações correspondem ao conteúdo servido na consulta. Não copiamos código ou recursos desses projetos.

### Limites da pesquisa

As seguintes tentativas retornaram bloqueio de proxy `403 Forbidden`, antes da leitura do conteúdo:

- https://www.sessionlab.com/features/
- https://www.sessionlab.com/pricing/
- https://www.sessionlab.com/blog/workshop-agenda/
- https://www.nikse.dk/subtitleedit
- https://partnerhelp.netflixstudios.com/hc/en-us/articles/215758617-Timed-Text-Style-Guide-General-Requirements
- https://www.bonsai.com/features/proposals

Algumas tentativas de encontrar repositórios públicos de modelos de contrato retornaram 404; não foram usadas como evidência. Não houve acesso a reviews, reclamações, preços atuais ou entrevistas. Não inferimos ausência de concorrentes ou de uma função específica a partir de um README. A investigação dá base técnica à escolha, mas é insuficiente para estabelecer demanda.

## Diferenciação proposta e argumento contra

A diferença proposta é a recuperação de atraso respeitando limites explícitos de duração e mostrando o custo de cada ajuste, em uma interface em português para quem facilita e opera sozinho. Não afirmamos que concorrentes não tenham algo equivalente.

O argumento mais forte contra: profissionais podem já resolver o problema com um cronômetro e experiência; adicionar uma interface durante a sessão pode aumentar a carga mental. Também podem preferir a amplitude e gratuidade do Ontime. O produto precisa provar que reduz decisões sob pressão, não apenas que faz contas corretamente.

Hipótese que pode invalidar a escolha: mínimos por atividade são difíceis de definir e quase nunca usados na prática, ou facilitadores preferem remover atividades inteiras conforme a conversa, tornando compressão de minutos pouco útil.

## Receita e primeiros usuários — hipóteses

Uma versão local pode servir de entrada. Receita futura poderia vir de biblioteca compartilhada de roteiros, versões, múltiplas sessões e colaboração de consultorias, cobradas por equipe. São funcionalidades e modelo futuros; não estão implícitos na entrega local. Não definimos preço sem conversar com compradores.

Canal inicial: demonstração curta para grupos públicos de facilitadores e instrutores, conteúdo que ensine a recuperar atrasos e parcerias com cursos de facilitação. Nenhum contato ou mensagem foi enviado nesta sessão.

## Próximo experimento

Recrutar cinco facilitadores que tenham conduzido uma sessão no último mês. Pedir que tragam uma agenda anonimizada e reproduzam um atraso de dez minutos, primeiro com seu método habitual e depois com o produto. Observar onde hesitam, se compreendem os cortes, se preservam o objetivo do fechamento e se conseguem retomar a condução sem ajuda. Perguntar sobre a última ocorrência real, não apenas intenção de uso. Depois oferecer participação num piloto de sessões reais; pagamento só deve ser testado com uma proposta explícita, sem tratar elogio ou cadastro como disposição a pagar.

Critério inicial de continuidade: a maioria completa a recuperação sem ajuda e prefere utilizar o produto numa próxima sessão real. Se não ocorrer, investigar a tarefa e abandonar ou reformular o mecanismo antes de ampliar funcionalidades. Não há resultados desse experimento ainda.
