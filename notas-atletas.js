function calcularMedia(atleta) {
  let notasOrdenadas = atleta.notas.slice().sort((a, b) => a - b);
  let notasParaMedia = notasOrdenadas.slice(1, 4);
  let soma = notasParaMedia.reduce((acum, nota) => acum + nota, 0);
  return soma / notasParaMedia.length;
}

let atletas = JSON.parse(localStorage.getItem("atletas")) || [
  { nome: "Cesar Abascal", notas: [10, 9.34, 8.42, 10, 7.88] },
  { nome: "Fernando Puntel", notas: [8, 10, 10, 7, 9.33] },
  { nome: "Daiane Jelinsky", notas: [7, 10, 9.5, 9.5, 8] },
  { nome: "Bruno Castro", notas: [10, 10, 10, 9, 9.5] },
];

function salvarLocalStorage() {
  localStorage.setItem("atletas", JSON.stringify(atletas));
}

let indiceEditando = null;

function exibirTabela() {
  let tbody = document.querySelector("#tabela-atletas tbody");
  tbody.innerHTML = "";

  if (atletas.length === 0) {
    let tr = document.createElement("tr");
    tr.innerHTML = `<td colspan="4" style="text-align:center; font-style:italic;">Nenhum atleta cadastrado ainda.</td>`;
    tbody.appendChild(tr);
    return;
  }

  let atletasComMedia = atletas.map((a, idx) => ({
    ...a,
    media: calcularMedia(a),
    idxOriginal: idx,
  }));

  atletasComMedia.sort((a, b) => {
    if (b.media !== a.media) return b.media - a.media;
    return a.nome.localeCompare(b.nome);
  });

  let medias = atletasComMedia.map((a) => a.media);
  let maiorMedia = Math.max(...medias);
  let menorMedia = Math.min(...medias);

  atletasComMedia.forEach((atleta, index) => {
    let tr = document.createElement("tr");

    if (atleta.media === maiorMedia) tr.style.backgroundColor = "#c8e6c9";
    if (atleta.media === menorMedia) tr.style.backgroundColor = "#ffcdd2";

    tr.innerHTML = `
      <td>${atleta.nome}</td>
      <td>${atleta.notas.join(", ")}</td>
      <td>${atleta.media.toFixed(2)}</td>
      <td>
        <div class="actions-btn">
            <button class="edit-btn" data-index="${
              atleta.idxOriginal
            }"><i class="fas fa-pen"></i></button>
            <button class="remove-btn" data-index="${
              atleta.idxOriginal
            }"><i class="fas fa-trash"></i></button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);

    console.log(`Atleta: ${atleta.nome}`);
    console.log(`Notas Obtidas: ${atleta.notas.join(", ")}`);
    console.log(`Média Válida: ${atleta.media.toFixed(2)}`);
    console.log("-------------------------");
  });

  document.querySelectorAll(".remove-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      let idx = parseInt(this.dataset.index);
      atletas.splice(idx, 1);
      salvarLocalStorage();
      exibirTabela();
      atualizarGrafico();
    });
  });

  document.querySelectorAll(".edit-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      let idx = parseInt(this.dataset.index);
      let atleta = atletas[idx];
      document.querySelector("#nome").value = atleta.nome;
      document.querySelector("#nota1").value = atleta.notas[0];
      document.querySelector("#nota2").value = atleta.notas[1];
      document.querySelector("#nota3").value = atleta.notas[2];
      document.querySelector("#nota4").value = atleta.notas[3];
      document.querySelector("#nota5").value = atleta.notas[4];
      indiceEditando = idx;
    });
  });
}

function atualizarGrafico() {
  let ctx = document.getElementById("graficoMedias").getContext("2d");

  let atletasComMedia = atletas.map((a) => ({ ...a, media: calcularMedia(a) }));
  atletasComMedia.sort((a, b) => {
    if (b.media !== a.media) return b.media - a.media;
    return a.nome.localeCompare(b.nome);
  });

  //let primeiroNome = atletasComMedia.map(a => a.nome.trim().split(" ")[0]);
  let primeiroNome = atletasComMedia.map((a) => {
    let partes = a.nome.trim().split(" ");
    return partes.slice(0, 2).join(" ");
  });

  let medias = atletasComMedia.map((a) => a.media);

  let maiorMedia = Math.max(...medias);
  let menorMedia = Math.min(...medias);

  let cores = medias.map((m) => {
    if (m === maiorMedia) return "rgba(76,175,80,0.7)";
    if (m === menorMedia) return "rgba(244,67,54,0.7)";
    return "rgba(12,84,190,0.7)";
  });
  let bordas = cores.map((c) => c.replace("0.7", "1"));

  if (window.grafico instanceof Chart) window.grafico.destroy();

  window.grafico = new Chart(ctx, {
    type: "bar",
    data: {
      labels: primeiroNome,
      datasets: [
        {
          label: "Média Válida",
          data: medias,
          backgroundColor: cores,
          borderColor: bordas,
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        tooltip: {
          callbacks: {
            label: function (context) {
              let i = context.dataIndex;
              return `Notas: ${atletasComMedia[i].notas.join(
                ", "
              )} | Média: ${medias[i].toFixed(2)}`;
            },
          },
        },
      },
      scales: {
        y: { beginAtZero: true, max: 10 },
        x: {
          ticks: {
            font: {
              size: 10,
            },
          },
        },
      },
    },
  });
}

const inputNome = document.querySelector("#nome");
const form = document.querySelector("#form-atleta");

inputNome.addEventListener("input", () => {
  const valor = inputNome.value.trim();
  if (valor.split(" ").filter((p) => p !== "").length < 2) {
    inputNome.setCustomValidity("Informe pelo menos nome e sobrenome");
  } else {
    inputNome.setCustomValidity("");
  }
  inputNome.reportValidity();
});

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const nome = inputNome.value.trim();
  const notas = [
    parseFloat(document.querySelector("#nota1").value),
    parseFloat(document.querySelector("#nota2").value),
    parseFloat(document.querySelector("#nota3").value),
    parseFloat(document.querySelector("#nota4").value),
    parseFloat(document.querySelector("#nota5").value),
  ];

  if (nome.split(" ").filter((p) => p !== "").length < 2) {
    inputNome.setCustomValidity("Informe pelo menos nome e sobrenome");
    inputNome.reportValidity();
    return;
  } else {
    inputNome.setCustomValidity("");
  }

  if (indiceEditando !== null) {
    atletas[indiceEditando] = { nome, notas };
    indiceEditando = null;
  } else {
    atletas.push({ nome, notas });
  }

  salvarLocalStorage();
  this.reset();
  exibirTabela();
  atualizarGrafico();
});

exibirTabela();
atualizarGrafico();
