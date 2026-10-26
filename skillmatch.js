

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
    ["HTML5", "CSS3", "JavaScript", "Git", "React"], // 4 de 5 (80% - Alta)
    "Remoto",
    "React"
  ),
  new VagaFrontEnd(
    "InovaWeb SC",
    "Dev Front-End Júnior (Interfaces)",
    ["HTML5", "CSS3", "JavaScript", "React", "TypeScript"], // 3 de 5 (60% - Média)
    "Híbrido",
    "React"
  ),
  new VagaFrontEnd(
    "NextGen Sistemas",
    "Programador(a) Front-End Júnior",
    ["JavaScript", "Git", "React", "TypeScript", "Tailwind CSS"], // 2 de 5 (40% - Baixa)
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




function classificarCompatibilidade(percentual) {
  if (percentual >= 80 && percentual <= 100) {
    return "Alta compatibilidade";
  } else if (percentual >= 50 && percentual <= 79) {
    return "Média compatibilidade";
  } else {
    return "Baixa compatibilidade";
  }
}


function analisarVaga(perfilCandidato, vaga, registrarAnalise) {
  
  const habilidadesAtendidas = vaga.requisitos.filter((requisito) =>
    perfilCandidato.habilidades.includes(requisito)
  );

  
  const habilidadesFaltantes = vaga.requisitos.filter(
    (requisito) => !perfilCandidato.habilidades.includes(requisito)
  );

  
  const atendeTodosRequisitos = vaga.requisitos.every((requisito) =>
    perfilCandidato.habilidades.includes(requisito)
  );

  
  const percentual = Math.round(
    (habilidadesAtendidas.length / vaga.requisitos.length) * 100
  );

  
  const classificacao = classificarCompatibilidade(percentual);

  
  const numeroDaAnalise = registrarAnalise();

  return {
    ordemAnalise: numeroDaAnalise,
    vaga: vaga,
    percentual: percentual,
    classificacao: classificacao,
    habilidadesAtendidas: habilidadesAtendidas,
    habilidadesFaltantes: habilidadesFaltantes,
    atendeTodosRequisitos: atendeTodosRequisitos
  };
}


function encontrarMelhorVaga(relatorioAnalises) {
  return relatorioAnalises.reduce((melhorAtual, analiseAtual) => {
    return analiseAtual.percentual > melhorAtual.percentual
      ? analiseAtual
      : melhorAtual;
  });
}


function criarContadorDeAnalises() {
  let totalVagasAnalisadas = 0; 

  return function () {
    totalVagasAnalisadas += 1;
    return totalVagasAnalisadas;
  };
}


function processarRecomendacoesDeEstudo(relatorioAnalises, callbackExibicao) {
  const contagemFaltantes = {};

  
  for (const item of relatorioAnalises) {
    for (const habilidade of item.habilidadesFaltantes) {
      if (contagemFaltantes[habilidade]) {
        contagemFaltantes[habilidade] += 1;
      } else {
        contagemFaltantes[habilidade] = 1;
      }
    }
  }

  
  const listaPriorizada = Object.keys(contagemFaltantes)
    .map((habilidade) => {
      const quantidadeVagas = contagemFaltantes[habilidade];
      let nivelPrioridade = "";

      if (quantidadeVagas >= 3) {
        nivelPrioridade = "Prioridade ALTA (Exigida em todas as vagas)";
      } else if (quantidadeVagas === 2) {
        nivelPrioridade = "Prioridade MÉDIA (Muito requisitada no mercado)";
      } else {
        nivelPrioridade = "Prioridade COMPLEMENTAR (Diferencial para vagas específicas)";
      }

      return {
        habilidade: habilidade,
        vagasQueExigem: quantidadeVagas,
        prioridade: nivelPrioridade
      };
    })
    .sort((a, b) => b.vagasQueExigem - a.vagasQueExigem);

  
  callbackExibicao(listaPriorizada);
}


function exibirPlanoDeEstudos(recomendacoes) {
  console.log("\n==================================================");
  console.log("📚 RECOMENDAÇÃO DE ESTUDOS (ORDEM DE PRIORIDADE):");
  console.log("==================================================");

  if (recomendacoes.length === 0) {
    console.log("Parabéns! Você já domina todas as habilidades exigidas pelas vagas!");
    return;
  }

  for (let i = 0; i < recomendacoes.length; i++) {
    const item = recomendacoes[i];
    console.log(
      `${i + 1}º Estudar [${item.habilidade}] -> Faltou em ${item.vagasQueExigem} vaga(s) | ${item.prioridade}`
    );
  }
}


async function iniciarSistema() {
  console.log("==================================================");
  console.log("   SKILLMATCH JS - MOTOR DE ANÁLISE DE CURRÍCULOS ");
  console.log("==================================================");

  console.log(`Candidato(a): ${candidato.nome}`);
  console.log(`Área: ${candidato.areaInteresse} (${candidato.tempoExperienciaMeses} meses de experiência)`);
  console.log(`Disponibilidade Imediata: ${candidato.disponivelImediato ? "Sim" : "Não"}`);
  console.log(`Habilidades atuais: ${candidato.habilidades.join(", ")}`);

  try {
    const vagasCarregadas = await buscarVagasNoServidor();
    console.log(`✅ Sucesso! ${vagasCarregadas.length} vagas carregadas do servidor.`);

    
    const contabilizarAnalise = criarContadorDeAnalises();

    
    const relatorioDeCompatibilidade = vagasCarregadas.map((vaga) =>
      analisarVaga(candidato, vaga, contabilizarAnalise)
    );

    console.log("=== RELATÓRIO DE COMPATIBILIDADE POR VAGA ===");
    for (const item of relatorioDeCompatibilidade) {
      console.log(`\n📌 [Análise #${item.ordemAnalise}] ${item.vaga.exibirResumo()}`);
      console.log(`   - Compatibilidade: ${item.percentual}% (${item.classificacao})`);
      console.log(`   - Habilidades em comum: ${item.habilidadesAtendidas.join(", ")}`);
      console.log(
        `   - Habilidades faltantes: ${
          item.habilidadesFaltantes.length > 0
            ? item.habilidadesFaltantes.join(", ")
            : "Nenhuma! Gabaritou a vaga!"
        }`
      );
    }

    
    const melhorOpcao = encontrarMelhorVaga(relatorioDeCompatibilidade);
    console.log("\n==================================================");
    console.log("🏆 VAGA COM MAIOR COMPATIBILIDADE (MELHOR MATCH):");
    console.log(`   ${melhorOpcao.vaga.cargo} na ${melhorOpcao.vaga.empresa}`);
    console.log(`   Aderência: ${melhorOpcao.percentual}% (${melhorOpcao.classificacao})`);
    console.log("==================================================");

    
    processarRecomendacoesDeEstudo(relatorioDeCompatibilidade, exibirPlanoDeEstudos);

  } catch (erro) {
    console.error(`❌ Falha na execução: ${erro}`);
  }
}


iniciarSistema();