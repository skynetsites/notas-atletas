# Projeto de certificação 2 - Pontuação dos Atletas

## Descrição
Este projeto faz parte do teste do curso **Jornada DEVStar CE do SENAI/SC - Trilha 1: Lógica de Programação** da Fase 8. Projetos avançados > 45. Projetos de certificação > Projeto de certificação 2 - Pontuação dos atletas.

É uma aplicação para competições de ginástica artística, onde é possível cadastrar atletas, registrar notas de cinco jurados, calcular a **média válida** (desconsiderando a maior e menor nota) e visualizar os resultados em tabela e gráfico junto com o calculo do **IMC**.

## Funcionalidades implementadas
- Cálculo da **média válida** e do **IMC** automaticamente.
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

## Como executar (Versão 1.0.1)

Esta é a **branch 1.0.1** do projeto **Notas Atletas**, contendo a nova versão do site.

### 1. Clonando diretamente esta versão
Para baixar **somente esta branch**, use:

```bash
git clone --branch 1.0.1 https://github.com/skynetsites/notas-atletas.git
cd notas-atletas
```

> 💡 Se você já tiver o repositório clonado, basta trocar de branch:
> ```bash
> git fetch
> git checkout 1.0.1
> ```

### 2. Executando o projeto localmente
Como este site é estático (HTML, CSS, JS), não requer compilação.

Você pode abrir o arquivo `index.html` diretamente no navegador  
ou rodar um servidor local com:

```bash
npx serve
```

> Caso não tenha o **serve**, instale com:
> ```bash
> npm install -g serve
> ```

Depois acesse:
```
http://localhost:3000
```

### 3. Versão publicada
A versão 1.0.1 também está disponível online em:

👉 [https://skynetsites.github.io/notas-atletas/1.0.1/](https://skynetsites.github.io/notas-atletas/1.0.1/)


### 4. Outras versões disponíveis
- **main** → versão principal do projeto:  
  [https://skynetsites.github.io/notas-atletas/](https://skynetsites.github.io/notas-atletas/)

- **1.0.1** → esta versão atual (branch de atualização e melhorias)

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
