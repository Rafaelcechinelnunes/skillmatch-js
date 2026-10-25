
const candidato = {
  nome: "Rafael Cechinel Nunes", 
  areaInteresse: "Desenvolvimento Front-End", 
  tempoExperienciaMeses: 2, 
  disponivelImediato: true, 
  habilidades: [
    "HTML5",
    "CSS3",
    "JavaScript",
    "Lógica de Programação",
    "Git",
    "GitHub"
  ] 
};


class Vaga {
  constructor(empresa, cargo, requisitos, modalidade) {
    this.empresa = empresa;
    this.cargo = cargo;
    this.requisitos = requisitos;
    this.modalidade = modalidade;
  }

  
  exibirResumo() {
    return `Empresa: ${this.empresa} | Cargo: ${this.cargo} (${this.modalidade})`;
  }
}


class VagaFrontEnd extends Vaga {
  constructor(empresa, cargo, requisitos, modalidade, frameworkPrincipal) {
    super(empresa, cargo, requisitos, modalidade);
    this.frameworkPrincipal = frameworkPrincipal;
  }

  exibirResumo() {
    return `${super.exibirResumo()} | Framework Foco: ${this.frameworkPrincipal} | Requisitos: ${this.requisitos.join(", ")}`;
  }
}


const bancoDeVagas = [
  new VagaFrontEnd(
    "TechSul Solutions",
    "Desenvolvedor(a) Front-End Júnior I",
    ["HTML5", "CSS3", "JavaScript", "Git", "React"], 
    "Remoto",
    "React"
  ),
  new VagaFrontEnd(
    "InovaWeb SC",
    "Dev Front-End Júnior (Interfaces)",
    ["HTML5", "CSS3", "JavaScript", "React", "TypeScript"], 
    "Híbrido",
    "React"
  ),
  new VagaFrontEnd(
    "NextGen Sistemas",
    "Programador(a) Front-End Júnior",
    ["JavaScript", "Git", "React", "TypeScript", "Tailwind CSS"], 
    "Remoto",
    "React + Tailwind"
  )
];


function buscarVagasNoServidor() {
  return new Promise((resolve, reject) => {
    console.log("⏳ Conectando ao servidor de RH... Buscando vagas disponíveis...");

    
    setTimeout(() => {
      const servidorOnline = true; 

      if (servidorOnline && bancoDeVagas.length > 0) {
        resolve(bancoDeVagas); 
      } else {
        reject("Erro 500: Não foi possível carregar as vagas do servidor.");
      }
    }, 1500);
  });
}


async function iniciarSistema() {
  console.log("==================================================");
  console.log("   SKILLMATCH JS - MOTOR DE ANÁLISE DE CURRÍCULOS ");
  console.log("==================================================");

  console.log(`Candidato(a): ${candidato.nome}`);
  console.log(`Área: ${candidato.areaInteresse} (${candidato.tempoExperienciaMeses} meses de experiência)`);
  console.log(`Habilidades atuais: ${candidato.habilidades.join(", ")}`);

  try {
    
    const vagasCarregadas = await buscarVagasNoServidor();
    console.log(`✅ Sucesso! ${vagasCarregadas.length} vagas carregadas do servidor:`);


    for (const vaga of vagasCarregadas) {
      console.log(`- ${vaga.exibirResumo()}`);
    }
  } catch (erro) {
    console.error(`❌ Falha na execução: ${erro}`);
  }
}

iniciarSistema();