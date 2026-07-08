---
titulo: "Par ou Ímpar com Scratch e Makey Makey"
resumo: "Tutorial maker para criar um jogo físico em Scratch com Makey Makey, trabalhando modos de jogo, variáveis, contagem e equipes."
publicadoEm: 2026-07-08
autor:
  nome: "UDESC Maker"
dificuldade: "iniciante"
idadeMinima: 10
duracaoMinutos: 90
categorias: ["educacao", "eletronica", "brinquedos"]
tags: ["scratch", "makey makey", "jogo", "programacao", "educacao maker", "interatividade"]
destaque: false
capa:
  src: "./capa.png"
  alt: "Imagem de capa com Scratch e Makey Makey"
galeria:
  - src: "./interface_scratch_jogo.png"
    alt: "Interface do jogo Par ou Impar no Scratch com modos, vidas, tempo e apertos"
  - src: "./codigo_botao_2x2_scratch.png"
    alt: "Blocos do Scratch usados para configurar o modo de jogo 2x2"
  - src: "./codigo_botao_iniciar_rodada_scratch_1.png"
    alt: "Primeira parte do codigo do botao Iniciar Rodada no Scratch"
  - src: "./codigo_botao_iniciar_rodada_scratch_2.png"
    alt: "Segunda parte do codigo do botao Iniciar Rodada no Scratch"
  - src: "./codigo_cenario_scratch.png"
    alt: "Blocos do cenario no Scratch que contam os apertos dos jogadores"
materiais:
  - "Computador com acesso ao Scratch"
  - "Placa Makey Makey"
  - "Cabos jacaré"
  - "Fios ou materiais condutores"
  - "Botões físicos ou superfícies condutivas"
  - "Papel alumínio, massinha condutiva ou outro material condutor seguro"
  - "Cabo USB"
ferramentas:
  - "Scratch"
  - "Makey Makey"
  - "Navegador de internet"
  - "Fita adesiva ou suporte para fixar os botões"
passos:
  - titulo: "Conhecer a proposta do jogo"
    corpo: "Apresente a brincadeira de par ou ímpar em equipes e explique que os jogadores terão 3 segundos para apertar botões físicos conectados ao Makey Makey."
  - titulo: "Abrir o projeto no Scratch"
    corpo: "Abra o jogo no Scratch ou recrie a tela principal com botões de modo, botão Iniciar Rodada, placar de vidas, tempo, total de apertos e mensagem."
    imagem: "./interface_scratch_jogo.png"
  - titulo: "Entender a interface do jogo"
    corpo: "Observe os botões 2x2, 3x3 e 4x4, as vidas das equipes Par e Ímpar, o contador de tempo, a variável de apertos e a área de mensagens."
    imagem: "./interface_scratch_jogo.png"
  - titulo: "Configurar os modos de jogo"
    corpo: "Programe cada botão de modo para definir quantos jogadores participarão, reiniciar vidas e variáveis e avisar que o jogo está pronto para iniciar."
    imagem: "./codigo_botao_2x2_scratch.png"
  - titulo: "Programar o botão Iniciar Rodada"
    corpo: "No botão Iniciar Rodada, zere os apertos e as marcações J1 até J8, defina o tempo em 3 segundos, ative a rodada e mostre a mensagem para os jogadores apertarem."
    imagem: "./codigo_botao_iniciar_rodada_scratch_1.png"
  - titulo: "Controlar a contagem da rodada"
    corpo: "Use uma repetição para esperar 1 segundo por vez e reduzir o tempo até chegar a zero. Quando a contagem terminar, desative a rodada para parar de aceitar novos apertos."
    imagem: "./codigo_botao_iniciar_rodada_scratch_1.png"
  - titulo: "Controlar os apertos dos jogadores"
    corpo: "No cenário, programe as teclas dos jogadores para somar 1 em Apertos apenas se a rodada estiver ativa, se aquele jogador ainda não tiver apertado e se o modo escolhido permitir sua participação."
    imagem: "./codigo_cenario_scratch.png"
  - titulo: "Verificar se deu par ou ímpar"
    corpo: "Depois da rodada, verifique se Apertos é maior que zero e use o resto da divisão por 2 para decidir se o total foi par ou ímpar. Desconte uma vida da equipe correspondente."
    imagem: "./codigo_botao_iniciar_rodada_scratch_2.png"
  - titulo: "Conectar o Makey Makey"
    corpo: "Conecte a placa ao computador via USB e relacione os botões físicos às entradas que enviam as teclas usadas pelo Scratch, como 1, 2, 3, 4, 5, 6, 7 e 8."
  - titulo: "Montar os botões físicos"
    corpo: "Monte um botão para cada jogador usando materiais condutivos. Cada botão precisa fechar o circuito com o Makey Makey para que o computador receba a tecla correta."
  - titulo: "Testar os comandos e jogar"
    corpo: "Teste cada tecla antes da partida, escolha o modo de jogo, clique em Iniciar Rodada e peça que os jogadores apertem seus botões durante os 3 segundos."
    imagem: "./interface_scratch_jogo.png"
  - titulo: "Pensar em melhorias"
    corpo: "Depois de jogar, discuta o que pode melhorar: sons, animações, ranking, novos modos, placar mais visual, botões mais resistentes ou uma interface mais clara."
dicas:
  - tom: "info"
    texto: "Antes de usar o Makey Makey, teste as teclas 1 a 8 diretamente no teclado para confirmar se a lógica do Scratch está funcionando."
  - tom: "info"
    texto: "Os jogadores podem usar papel alumínio, massinha condutiva, botões físicos ou superfícies condutivas, desde que estejam conectados corretamente ao Makey Makey."
  - tom: "warning"
    texto: "Evite contar o mesmo jogador mais de uma vez na mesma rodada. Use variáveis como J1, J2, J3 e assim por diante para marcar quem já apertou."
  - tom: "success"
    texto: "Depois que a lógica estiver funcionando, incentive a turma a personalizar a tela, os sons e o formato dos controles físicos."
baixaveis: []
arquivos: []
relacionados: []
---

Este tutorial mostra como transformar uma brincadeira simples de par ou ímpar em um jogo maker com Scratch e Makey Makey. A ideia é que cada jogador tenha um botão físico. Quando a rodada começa, todos têm 3 segundos para apertar. O Scratch conta quantos jogadores participaram, verifica se o total é par ou ímpar e desconta vida da equipe correspondente.

Além de ser divertido, o projeto ajuda a trabalhar lógica de programação, variáveis, eventos de teclado, contagem de tempo, tomada de decisão e prototipagem com materiais condutivos.

## Interface do jogo

A interface do Scratch organiza tudo que o grupo precisa acompanhar durante a partida. Na tela aparecem os botões de modo 2x2, 3x3 e 4x4, o botão Iniciar Rodada, as vidas das equipes Par e Ímpar, o tempo restante, o total de apertos e uma mensagem de orientação.

Antes de programar os detalhes, vale testar se a tela comunica bem o estado do jogo. Os jogadores precisam entender quando devem escolher o modo, quando a rodada está ativa, quanto tempo resta e qual equipe perdeu vida.

## Modos 2x2, 3x3 e 4x4

Os modos definem quantos jogadores participam. No modo 2x2, o jogo considera quatro jogadores. No modo 3x3, considera seis. No modo 4x4, considera oito. As teclas de 1 a 8 representam esses jogadores.

O botão 2x2 mostra o padrão que pode ser repetido nos outros modos: ele define a variável Modo de jogo, reinicia Vida Par e Vida Ímpar para 5, zera Apertos e Tempo, desativa Rodada ativa e coloca J1 até J8 em 0. Essa limpeza é importante porque cada partida deve começar sem restos da partida anterior.

Nos botões 3x3 e 4x4, a lógica é a mesma, mudando principalmente o valor do modo escolhido. Assim, o Scratch sabe quais jogadores pode aceitar em cada rodada.

## Botão Iniciar Rodada

O botão Iniciar Rodada é o coração do fluxo da partida. Primeiro, ele confere se algum modo foi escolhido. Se não houver modo selecionado, a mensagem pede que o grupo escolha 2x2, 3x3 ou 4x4.

Quando o modo já foi definido, o botão zera Apertos, coloca Tempo em 3 e reinicia J1 até J8. Depois, muda Rodada ativa para sim e mostra a mensagem de que os jogadores devem apertar agora. A partir desse momento, os comandos de teclado passam a valer.

A contagem usa uma repetição de 3 vezes: espera 1 segundo e diminui 1 no Tempo. Quando a contagem termina, Rodada ativa volta para não. Isso impede que apertos atrasados sejam contados depois do fim da rodada.

## Lógica do cenário

O cenário, ou palco, controla os eventos de teclado. Cada tecla representa um jogador. Quando a tecla 1 é pressionada, por exemplo, o Scratch só soma em Apertos se três condições forem verdadeiras: a rodada está ativa, J1 ainda vale 0 e o modo de jogo permite que aquele jogador participe.

Depois de contar o jogador, o código muda J1 para 1. Essa marcação impede que o mesmo jogador seja contado duas vezes na mesma rodada. A mesma ideia deve ser repetida para J2, J3, J4, J5, J6, J7 e J8, ajustando a tecla e a variável de cada jogador.

Essa organização deixa a lógica mais justa: apertar várias vezes o mesmo botão não aumenta a pontuação. O que importa é quantos jogadores diferentes participaram dentro dos 3 segundos.

## Resultado da rodada

Ao final da contagem, o jogo verifica a variável Apertos. Se ninguém apertou, a mensagem informa que ninguém perdeu vida. Se houve pelo menos um aperto, o Scratch calcula o resto da divisão de Apertos por 2.

Quando o resto é 0, o total é par e a equipe Par vence a rodada; por isso, a equipe Ímpar perde 1 vida. Quando o resto não é 0, o total é ímpar e a equipe Ímpar vence a rodada; por isso, a equipe Par perde 1 vida.

Depois do desconto, o jogo confere se alguma equipe ficou com menos de 1 vida. Se a Vida Par acabar, o time Ímpar vence. Se a Vida Ímpar acabar, o time Par vence. Nesse momento, a rodada fica desativada e a mensagem final aparece na tela.

## Montagem com Makey Makey

O Makey Makey entra como ponte entre o corpo dos jogadores e o Scratch. Para o Scratch, cada botão físico aparece como uma tecla do teclado. Por isso, a montagem precisa fazer com que o botão do jogador 1 envie a tecla 1, o botão do jogador 2 envie a tecla 2, e assim por diante até a tecla 8.

Conecte o Makey Makey ao computador pelo cabo USB. Depois, conecte cada botão ou superfície condutiva à entrada correspondente. Se estiver usando papel alumínio, massinha condutiva ou outro material condutor, fixe bem os contatos para que o circuito feche quando o jogador tocar ou pressionar.

Também é importante que cada jogador saiba qual botão é o seu. Em uma oficina, etiquetas com J1, J2, J3 e J4 ajudam bastante no modo 2x2. Para os modos 3x3 e 4x4, acrescente J5, J6, J7 e J8.

## Testes antes da partida

Antes de jogar com a turma toda, faça um teste por etapas. Primeiro, pressione as teclas 1 a 8 no teclado normal e veja se o Scratch conta corretamente. Depois, teste cada botão físico conectado ao Makey Makey.

Se algum botão não funcionar, verifique três pontos: se o cabo está bem preso, se o material usado conduz eletricidade e se o Scratch está esperando a tecla correta. Também confira se a rodada está ativa; fora dos 3 segundos, o jogo não deve contar apertos.

## Apresentação e melhorias

Na hora de apresentar, explique o desafio para a turma antes de mostrar o código: as equipes precisam tentar influenciar se o total final será par ou ímpar, mas só têm 3 segundos. Depois, mostre como o Scratch controla as regras e como o Makey Makey transforma a montagem física em entrada de teclado.

Como melhoria, o grupo pode adicionar sons de contagem regressiva, animações quando uma equipe perde vida, ranking de partidas, novos modos de jogo, uma tela de vitória mais chamativa ou botões físicos mais resistentes. Outra possibilidade é pedir que os estudantes redesenhem a interface para deixar as informações mais fáceis de acompanhar durante a rodada.
