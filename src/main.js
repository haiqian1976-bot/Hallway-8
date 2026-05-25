let progress = 0;
let mistakes = 0;
let hasAnomaly = false;
let currentAnomaly = "";

const anomalies = [
  "poster",
  "clock",
  "locker",
  "exit",
  "light"
];

function resetVisuals() {
  document.getElementById("poster").textContent = "GO COUGARS";
  document.getElementById("clock").textContent = "10:08 PM";
  document.getElementById("locker").textContent = "LOCKER";
  document.getElementById("exit-sign").textContent = "EXIT";
  document.getElementById("ceiling-light").style.background = "#ddd";
  document.getElementById("ceiling-light").style.boxShadow = "0 0 40px white";
}

function generateHallway() {
  resetVisuals();

  hasAnomaly = Math.random() < 0.5;
  currentAnomaly = "";

  if (hasAnomaly) {
    currentAnomaly = anomalies[Math.floor(Math.random() * anomalies.length)];

    if (currentAnomaly === "poster") {
      document.getElementById("poster").textContent = "DO NOT LEAVE";
    }

    if (currentAnomaly === "clock") {
      document.getElementById("clock").textContent = "80:01 PM";
    }

    if (currentAnomaly === "locker") {
      document.getElementById("locker").textContent = "OPEN";
      document.getElementById("locker").style.background = "#111";
    }

    if (currentAnomaly === "exit") {
      document.getElementById("exit-sign").textContent = "ENTER";
      document.getElementById("exit-sign").style.color = "red";
    }

    if (currentAnomaly === "light") {
      document.getElementById("ceiling-light").style.background = "red";
      document.getElementById("ceiling-light").style.boxShadow = "0 0 60px red";
    }
  }

  updateText();
}

function updateText() {
  document.getElementById("message").textContent = `Hallway ${progress} / 8`;
}

function goForward() {
  if (hasAnomaly) {
    mistake();
  } else {
    correct();
  }
}

function turnBack() {
  if (hasAnomaly) {
    correct();
  } else {
    mistake();
  }
}

function correct() {
  progress++;
  document.getElementById("log").textContent = "Correct choice.";

  if (progress >= 8) {
    winGame();
  } else {
    generateHallway();
  }
}

function mistake() {
  mistakes++;
  progress = 0;

  document.getElementById("log").textContent =
    `Wrong choice. The Hall Monitor is closer. Mistakes: ${mistakes}/3`;

  if (mistakes >= 3) {
    loseGame();
  } else {
    generateHallway();
  }
}

function winGame() {
  document.getElementById("hallway").innerHTML = `
    <h1 style="padding-top:150px;">You reached Hallway 8.</h1>
    <h2>You escaped.</h2>
  `;
  document.getElementById("controls").style.display = "none";
}

function loseGame() {
  document.getElementById("hallway").innerHTML = `
    <h1 style="padding-top:150px;color:red;">The Hall Monitor found you.</h1>
    <h2>Game Over</h2>
  `;
  document.getElementById("controls").style.display = "none";
}

generateHallway();
