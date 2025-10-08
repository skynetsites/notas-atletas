class Atleta {
  constructor(nome, idade, peso, altura, notas) {
    this.nome = nome;
    this.idade = idade;
    this.peso = peso;
    this.altura = altura;
    this.notas = notas;
  }

  calculaCategoria() {
    if (this.idade >= 9 && this.idade <= 11) return "Infantil";
    if (this.idade >= 12 && this.idade <= 13) return "Juvenil";
    if (this.idade >= 14 && this.idade <= 15) return "Intermediário";
    if (this.idade >= 16 && this.idade <= 30) return "Adulto";
    return "Sem categoria";
  }

  calculaIMC() {
    return +(this.peso / this.altura ** 2).toFixed(2);
  }

  calculaMediaValida() {
    let notasOrdenadas = this.notas.slice().sort((a, b) => a - b);
    let notasParaMedia =
      notasOrdenadas.length >= 3 ? notasOrdenadas.slice(1, -1) : notasOrdenadas;
    return +(
      notasParaMedia.reduce((a, b) => a + b, 0) / notasParaMedia.length
    ).toFixed(2);
  }

  obtemNomeAtleta() {
    return this.nome;
  }
  obtemIdadeAtleta() {
    return this.idade;
  }
  obtemPesoAtleta() {
    return this.peso;
  }
  obtemAlturaAtleta() {
    return this.altura;
  }
  obtemNotasAtleta() {
    return this.notas;
  }
  obtemCategoria() {
    return this.calculaCategoria();
  }
  obtemIMC() {
    return this.calculaIMC();
  }
  obtemMediaValida() {
    return this.calculaMediaValida();
  }
}

let atletas = JSON.parse(localStorage.getItem("atletas"))?.map(
  (a) => new Atleta(a.nome, a.idade, a.peso, a.altura, a.notas)
) || [
  new Atleta("Cesar Abascal", 30, 80, 1.7, [10, 9.34, 8.42, 10, 7.88]),
  new Atleta("Fernando Puntel", 25, 75, 1.8, [8, 10, 10, 7, 9.33]),
  new Atleta("Daiane Jelinsky", 20, 60, 1.65, [7, 10, 9.5, 9.5, 8]),
  new Atleta("Bruno Castro", 28, 85, 1.75, [10, 10, 10, 9, 9.5]),
];

function salvarLocalStorage() {
  //if (atletas.length === 0) {
  //localStorage.removeItem("atletas");
  //} else {
  localStorage.setItem("atletas", JSON.stringify(atletas));
  //}
}

let indiceEditando = null;

function ordenarAtletas() {
  atletas.sort((a, b) => {
    let mediaDiff = b.obtemMediaValida() - a.obtemMediaValida();
    if (mediaDiff !== 0) return mediaDiff;
    return a.obtemNomeAtleta().localeCompare(b.obtemNomeAtleta());
  });
}

function exibirAtletaSelecionado(atleta) {
  console.log("=== Atleta Selecionado ===");
  console.log(`Nome: ${atleta.obtemNomeAtleta()}`);
  console.log(`Idade: ${atleta.obtemIdadeAtleta()}`);
  console.log(`Peso: ${atleta.obtemPesoAtleta()}`);
  console.log(`Altura: ${atleta.obtemAlturaAtleta()}`);
  console.log(`Notas: ${atleta.obtemNotasAtleta().join(", ")}`);
  console.log(`Categoria: ${atleta.obtemCategoria()}`);
  console.log(`IMC: ${atleta.obtemIMC()}`);
  console.log(`Média Válida: ${atleta.obtemMediaValida()}`);
}

function exibirTabela() {
  ordenarAtletas();

  let tbody = document.querySelector("#tabela-atletas tbody");
  tbody.innerHTML = "";

  if (atletas.length === 0) {
    let tr = document.createElement("tr");
    tr.innerHTML = `<td colspan="9" style="text-align:center; font-style:italic;">Nenhum atleta cadastrado ainda.</td>`;
    tbody.appendChild(tr);
    return;
  }

  let maiorMedia = Math.max(...atletas.map((a) => a.obtemMediaValida()));
  let menorMedia = Math.min(...atletas.map((a) => a.obtemMediaValida()));

  console.log("=== Lista de Atletas ===");

  atletas.forEach((atleta, idx) => {
    let tr = document.createElement("tr");

    if (atleta.obtemMediaValida() === maiorMedia)
      tr.style.backgroundColor = "#c8e6c9";
    if (atleta.obtemMediaValida() === menorMedia)
      tr.style.backgroundColor = "#ffcdd2";

    tr.innerHTML = `
      <td>${atleta.obtemNomeAtleta()}</td>
      <td>${atleta.obtemIdadeAtleta()}</td>
      <td>${atleta.obtemPesoAtleta()}</td>
      <td>${atleta.obtemAlturaAtleta()}</td>
      <td>${atleta.obtemNotasAtleta().join(", ")}</td>
      <td>${atleta.obtemMediaValida()}</td>
      <td>${atleta.obtemIMC()}</td>
      <td>${atleta.obtemCategoria()}</td>
      <td>
        <div class="actions-btn">
          <button class="edit-btn" data-index="${idx}"><i class="fas fa-pen"></i></button>
          <button class="remove-btn" data-index="${idx}"><i class="fas fa-trash"></i></button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);

    console.log(`Nome: ${atleta.obtemNomeAtleta()}`);
    console.log(`Idade: ${atleta.obtemIdadeAtleta()}`);
    console.log(`Peso: ${atleta.obtemPesoAtleta()}`);
    console.log(`Altura: ${atleta.obtemAlturaAtleta()}`);
    console.log(`Notas: ${atleta.obtemNotasAtleta().join(", ")}`);
    console.log(`Categoria: ${atleta.obtemCategoria()}`);
    console.log(`IMC: ${atleta.obtemIMC()}`);
    console.log(`Média Válida: ${atleta.obtemMediaValida()}`);
    console.log("---------------------------");
  });

  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.onclick = () => {
      let idx = parseInt(btn.dataset.index);
      atletas.splice(idx, 1);
      salvarLocalStorage();
      exibirTabela();
      atualizarGrafico();
    };
  });

  document.querySelectorAll(".edit-btn").forEach((btn) => {
    btn.onclick = () => {
      let idx = parseInt(btn.dataset.index);
      let atleta = atletas[idx];
      document.querySelector("#nome").value = atleta.obtemNomeAtleta();
      document.querySelector("#idade").value = atleta.obtemIdadeAtleta();
      document.querySelector("#peso").value = atleta.obtemPesoAtleta();
      document.querySelector("#altura").value = atleta.obtemAlturaAtleta();
      atleta
        .obtemNotasAtleta()
        .forEach((n, i) => (document.querySelector(`#nota${i + 1}`).value = n));

      indiceEditando = idx;

      const campos = document.querySelectorAll("#form-atleta input");
      campos.forEach((c) => c.classList.add("campo-editando"));
      campos[0].focus();

      setTimeout(() => {
        campos.forEach((c) => c.classList.remove("campo-editando"));
      }, 2000);

      atualizarGraficoAtleta(atleta);
      exibirAtletaSelecionado(atleta[0]);
    };
  });
}

function criarGrafico(canvasId, type, labels, datasets, title) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  if (window[canvasId] instanceof Chart) window[canvasId].destroy();

  const limitedDatasets = datasets.slice(0, 4);

  window[canvasId] = new Chart(ctx, {
    type: type,
    data: { labels, datasets: limitedDatasets },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          suggestedMax: 4,
          //min: 1,
          //max: 4,
          //ticks: { stepSize: 1 }
        },
      },
      plugins: {
        legend: {
          display: true,
          position: "top",
          labels: {
            padding: 10,
            boxWidth: 30,
            boxHeight: 15,
          },
        },
        title: {
          display: true,
          text: title,
        },
      },
    },
  });
}

function atualizarGrafico() {
  ordenarAtletas();

  const type = "bar";

  const semDados = atletas.length === 0;
  const labels = semDados ? ["Sem média"] : ["Média"];

  const datasets = semDados
    ? [
        {
          label: "Nenhum média disponível",
          data: [0],
          backgroundColor: ["rgba(12,84,190,0.2)"],
          borderColor: ["rgba(12,84,190,0.4)"],
          borderWidth: 1,
        },
      ]
    : atletas.map((atleta, i) => {
        const cores = [
          "rgba(12,84,190,0.7)",
          "rgba(76,175,80,0.7)",
          "rgba(244,67,54,0.7)",
          "rgba(244, 231, 54, 0.7)",
        ];
        const bordas = [
          "rgba(12,84,190,1)",
          "rgba(76,175,80,1)",
          "rgba(244,67,54,1)",
          "rgba(244, 231, 54, 1)",
        ];
        return {
          label:
            atleta.obtemNomeAtleta().split(" ")[0] +
            `: ${atleta.obtemMediaValida()}`,
          data: [atleta.obtemMediaValida()],
          backgroundColor: cores[i % cores.length],
          borderColor: bordas[i % bordas.length],
          borderWidth: 1,
        };
      });

  criarGrafico(
    "graficoMedias",
    type,
    labels,
    datasets,
    semDados ? "Gráfico sem dados" : "Médias dos atletas"
  );
}

function atualizarGraficoAtleta(atleta) {
  const type = "bar";

  const semDados = atletas.length === 0;
  const labels = semDados ? ["Sem desempenho"] : ["Desempenho"];

  const datasets = semDados
    ? [
        {
          label: "Nenhum desempenho disponível",
          data: [0, 0],
          backgroundColor: ["rgba(12,84,190,0.2)", "rgba(76,175,80,0.2)"],
          borderColor: ["rgba(12,84,190,0.4)", "rgba(76,175,80,0.4)"],
          borderWidth: 1,
        },
      ]
    : [
        {
          label: `IMC: ${atleta.obtemIMC()}`,
          data: [atleta.obtemIMC()],
          backgroundColor: "rgba(12,84,190,0.7)",
          borderColor: "rgba(12,84,190,1)",
          borderWidth: 1,
        },
        {
          label: `Média Válida: ${atleta.obtemMediaValida()}`,
          data: [atleta.obtemMediaValida()],
          backgroundColor: "rgba(76,175,80,0.7)",
          borderColor: "rgba(76,175,80,1)",
          borderWidth: 1,
        },
      ];

  criarGrafico(
    "graficoAtleta",
    type,
    labels,
    datasets,
    semDados ? "Gráfico sem dados" : `Desempenho de ${atleta.obtemNomeAtleta()}`
  );
}

const form = document.querySelector("#form-atleta");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const nome = document.querySelector("#nome").value;
  const idade = parseInt(document.querySelector("#idade").value);
  const peso = parseFloat(document.querySelector("#peso").value);
  const altura = parseFloat(document.querySelector("#altura").value);
  const notas = [1, 2, 3, 4, 5].map((i) =>
    parseFloat(document.querySelector(`#nota${i}`).value)
  );

  let atletaNovo = new Atleta(nome, idade, peso, altura, notas);

  if (indiceEditando !== null) {
    atletas[indiceEditando] = atletaNovo;
    indiceEditando = null;
  } else {
    atletas.push(atletaNovo);
  }

  salvarLocalStorage();
  form.reset();
  exibirTabela();
  atualizarGrafico();
  atualizarGraficoAtleta(atletaNovo);
});

exibirTabela();
atualizarGrafico();
atualizarGraficoAtleta(atletas[0]);

if (atletas.length > 0) {
  exibirAtletaSelecionado(atletas[0]);
}
