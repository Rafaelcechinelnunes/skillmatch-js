const candidato = {
  nome: "Rafael Cechinel Nunes",
  areaInteresse: "Desenvolvimento Front-End",
  tempoExperienciaMeses: 2,
  disponivelImediato: true,
  habilidades: [
    "HTML5",
    "CSS3",
    "Javascript",
    "Lógica de Programação",
    "Git",
    "GitHub",
  ],
};

class Vaga {
  constructor(empresa, cargo, requisitos, modalidade) {
    this.empresa = empresa;
    this.cargo = cargo;
    this.requisitos = requisitos;
    this.modalidade = modalidade;
  }
  exibirResumo() {
    return `Empresa: ${this.empresa} | Cargo: ${this.cargo}  (${this.modalidade})`;
  }
}

class VagaFrontEnd extends Vaga {
  constructor(empresa, cargo, requisitos, modalidade, framework) {
    super(empresa, cargo, requisitos, modalidade);
    this.framework = framework;
  }

  exibirResumo() {
    return `${super.exibirResumo()} | Framework Foco: ${this.framework} | Requisitos: ${this.requisitos.join(", ")}`;
  }
}

console.log("=== PERFIL DO CANDIDATO ===");
console.log(`Nome: ${candidato.nome}`);
console.log(`Área de Interesse: ${candidato.areaInteresse}`);
console.log(`Tempo de Experiência: ${candidato.tempoExperienciaMeses} meses`);
console.log(
  `Disponível Imediatamente: ${candidato.disponivelImediato ? "Sim" : "Não"}`,
);
console.log(`Habilidades: ${candidato.habilidades.join(", ")}`);

const vagaTeste = new VagaFrontEnd(
  "TechSul Sutions",
  "Desenvolvedor Front-End Júnior",
  ["HTML5", "CSS3", "JavaScript", "Git", "GitHub"],
  "Remoto",
  "React",
);

console.log("=== TESTE DE CLASSE E HERANÇA ===");
console.log(vagaTeste.exibirResumo());
