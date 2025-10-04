# Projeto Notas de Atletas

## Descrição
Este projeto faz parte do teste do curso **Jornada DEVStar CE do SENAI/SC - Trilha 1: Lógica de Programação** da Fase 8. Projetos avançados > 45. Projetos de certificação > Projeto de certificação 1 - Pontuação dos atletas.

É uma aplicação para competições de ginástica artística, onde é possível cadastrar atletas, registrar notas de cinco jurados, calcular a **média válida** (desconsiderando a maior e menor nota) e visualizar os resultados em tabela e gráfico.

## Funcionalidades implementadas
- Cálculo da **média válida** automaticamente.
- **Tabela de atletas** exibindo notas e média.
- **Gráfico de médias** usando Chart.js.
- **Atletas padrão** já carregados ao iniciar.
- **Adicionar novos atletas** com notas.
- **Editar atletas** diretamente na tabela.
- **Remover atletas** diretamente na tabela.
- Atualização automática de **tabela, gráfico e console.log()** ao editar ou remover atletas.
- Diferenciação visual da maior e menor média (verde para maior, vermelho para menor).

## Tecnologias
- HTML5
- CSS3
- JavaScript (ES6)
- Chart.js (gráficos de barras)

## Estrutura do projeto
notas-atletas/
├── index.html         # Interface do projeto
├── notas-atletas.js   # Código JavaScript principal
├── style.css          # (Opcional) estilos separados
└── README.md          # Documentação

## Como executar

### 1. Clonando o repositório
Para ter uma cópia local do projeto, use o comando abaixo no terminal:

```bash
git clone https://github.com//skynetsites/notas-atletas.git
cd notas-atletas
```

### 2. Abra o arquivo index.html em qualquer navegador moderno (Chrome, Firefox, Edge, etc.).
Você verá a interface para adicionar, editar e remover atletas.

## Observações
- A média válida é calculada considerando apenas as 3 notas do meio.
- A tabela e o gráfico são atualizados automaticamente a cada modificação.
- Os resultados também são exibidos no console usando `console.log()`.

## 👨‍💻 Autor
**Isaias Oliveira**

📧 **E-mail:** [isaiaswebnet@gmail.com](mailto:isaiaswebnet@gmail.com)  
💼 **LinkedIn:** [Meu LinkedIn](https://www.linkedin.com/in/skynetsites/)

## ✨ Créditos
Desenvolvido como entrega do Projeto de certificação 1 - Pontuação dos atletas do curso **Jornada DEVStar CE do SENAI/SC**