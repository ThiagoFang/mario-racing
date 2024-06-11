const player1 = {
  name: "Mario",
  speed: 4,
  agility: 3,
  power: 3,
  score: 0,
};

const player2 = {
  name: "Bowser",
  speed: 4,
  agility: 3,
  power: 5,
  score: 0,
};

async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
  let random = Math.random();
  let result;

  switch (true) {
    case random < 0.33:
      result = "RETA";
      break;
    case random < 0.66:
      result = "CURVA";
      break;
    default:
      result = "CONFRONTO";
  }

  return result;
}

async function logRollResult(player, block, diceResult, attribute) {
  console.log(
    `${
      player.name
    } 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${
      diceResult + attribute
    }`
  );
}

async function declareWinner(character1, character2) {
  console.log("\nResultado final:");
  console.log(`${character1.name}: ${character1.score} ponto(s)`);
  console.log(`${character2.name}: ${character2.score} ponto(s)`);

  if (character1.score > character2.score) {
    console.log(`\n${character1.name} venceu a corrida! Parabéns 🏆`);
  }
  if (character2.score > character1.score) {
    console.log(`\n${character2.name} venceu a corrida! Parabéns 🏆`);
  }
  if (character1.score === character2.score) {
    console.log(`\nO jogo foi empate!`);
  }
}

async function playRaceEngine(character1, character2) {
  for (let round = 1; round <= 5; round++) {
    // Sort a block
    let block = await getRandomBlock();
    console.log(`🏁 Rodada ${round} - ${block} \n`);

    // Roll the dice
    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    // abilities check
    let totalTestSkill1 = 0;
    let totalTestSkill2 = 0;

    if (block === "RETA") {
      totalTestSkill1 = diceResult1 + character1.speed;
      totalTestSkill2 = diceResult2 + character2.speed;

      await logRollResult(character1, "velocidade", diceResult1, player1.speed);
      await logRollResult(character2, "velocidade", diceResult2, player2.speed);
    }
    if (block === "CURVA") {
      totalTestSkill1 = diceResult1 + character1.agility;
      totalTestSkill2 = diceResult2 + character2.agility;

      await logRollResult(
        character1,
        "manobrabilidade",
        diceResult1,
        player2.agility
      );
      await logRollResult(
        character2,
        "manobrabilidade",
        diceResult2,
        player2.agility
      );
    }
    if (block === "CONFRONTO") {
      let powerResult1 = diceResult1 + character1.power;
      let powerResult2 = diceResult2 + character2.power;

      console.log(`${character1.name} confrontou com ${character2.name}! 🥊`);

      await logRollResult(character1, "poder", diceResult1, player2.power);
      await logRollResult(character2, "poder", diceResult2, player2.power);

      if (powerResult1 > powerResult2 && character2.score > 0) {
        console.log(
          `${character1.name} venceu o confronto! ${character2.name} perdeu um ponto 🐢`
        );
        character2.score--;
      }

      if (powerResult2 > powerResult1 && character1.score > 0) {
        console.log(
          `${character2.name} venceu o confronto! ${character1.name} perdeu um ponto 🐢`
        );
        character1.score--;
      }

      console.log(
        powerResult1 === powerResult2 ? "EMPATE - Nenhum ponto foi perdido" : ""
      );
    }

    if (totalTestSkill1 > totalTestSkill2) {
      console.log(`🏁 ${character1.name} marcou um ponto!`);
      character1.score++;
    } else if (totalTestSkill2 > totalTestSkill1) {
      console.log(`🏁 ${character2.name} marcou um ponto!`);
      character2.score++;
    }

    console.log("-----------------------------------------------------------");
  }
}

(async function main() {
  console.log(`Corrida entre ${player1.name} e ${player2.name} começando...\n`);

  await playRaceEngine(player1, player2);
  await declareWinner(player1, player2);
})();
