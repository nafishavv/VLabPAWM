const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const energyCanvas = document.getElementById("energyCanvas");
const energyCtx = energyCanvas.getContext("2d");

const ball = {
  x: 250,
  radius: 10,
  speed: 2,
  direction: 1,
};

const mass = 8;
const gravitationalAcceleration = 9.81;
const maxHeight = canvas.height - 50;
let a;
let animationId;
let isAnimating = false;

// Hitung nilai a untuk parabola
function calculateA() {
  const h = 400;
  const k = maxHeight;
  const x1 = 250;
  const y1 = 222;
  a = (y1 - k) / Math.pow(x1 - h, 2);
}

function drawParabola() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.moveTo(0, canvas.height - 50);

  for (let x = 0; x <= canvas.width; x++) {
    const y = a * Math.pow(x - 400, 2) + maxHeight;
    ctx.lineTo(x, y);
  }

  ctx.strokeStyle = "lightblue";
  ctx.stroke();
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, getBallY(ball.x), ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "coral";
  ctx.fill();
  ctx.closePath();
}

function getBallY(x) {
  return a * Math.pow(x - 400, 2) + maxHeight;
}

function calculatePotentialEnergy() {
  const height = getBallY(ball.x);
  return mass * gravitationalAcceleration * (maxHeight - height);
}

function calculateMechanicalEnergy() {
  const heightAt250 = getBallY(250);
  return mass * gravitationalAcceleration * (maxHeight - heightAt250);
}

function calculateKineticEnergy() {
  const potentialEnergy = calculatePotentialEnergy();
  const mechanicalEnergy = calculateMechanicalEnergy();
  return mechanicalEnergy - potentialEnergy;
}

function updateBallPosition() {
  ball.x += ball.speed * ball.direction;

  if (ball.x >= 550 || ball.x <= 250) {
    ball.direction *= -1;
  }
}

function drawEnergyGraph() {
  energyCtx.clearRect(0, 0, energyCanvas.width, energyCanvas.height);

  const potentialEnergy = calculatePotentialEnergy();
  const kineticEnergy = calculateKineticEnergy();
  const mechanicalEnergy = calculateMechanicalEnergy();
  const barWidth = 20;
  const maxEnergy = mechanicalEnergy;

  energyCtx.fillStyle = "lightgreen";
  energyCtx.fillRect(
    0,
    energyCanvas.height -
      (potentialEnergy / maxEnergy) * energyCanvas.height * 0.9,
    barWidth,
    (potentialEnergy / maxEnergy) * energyCanvas.height * 0.9
  );
  energyCtx.fillText(
    "EP",
    0,
    energyCanvas.height -
      (potentialEnergy / maxEnergy) * energyCanvas.height * 0.9 -
      5
  );

  energyCtx.fillStyle = "salmon";
  energyCtx.fillRect(
    barWidth + 5,
    energyCanvas.height -
      (kineticEnergy / maxEnergy) * energyCanvas.height * 0.9,
    barWidth,
    (kineticEnergy / maxEnergy) * energyCanvas.height * 0.9
  );
  energyCtx.fillText(
    "EK",
    barWidth + 5,
    energyCanvas.height -
      (kineticEnergy / maxEnergy) * energyCanvas.height * 0.9 -
      5
  );

  energyCtx.fillStyle = "lightblue";
  energyCtx.fillRect(
    2 * (barWidth + 5),
    energyCanvas.height -
      (mechanicalEnergy / maxEnergy) * energyCanvas.height * 0.9,
    barWidth,
    (mechanicalEnergy / maxEnergy) * energyCanvas.height * 0.9
  );
  energyCtx.fillText(
    "EM",
    2 * (barWidth + 5),
    energyCanvas.height -
      (mechanicalEnergy / maxEnergy) * energyCanvas.height * 0.9 -
      5
  );
}

function animate() {
  drawParabola();
  updateBallPosition();
  drawBall();
  drawEnergyGraph();

  animationId = requestAnimationFrame(animate);
}

// Event listener untuk tombol Start/Stop
document.getElementById("toggleButton").addEventListener("click", () => {
  if (!isAnimating) {
    isAnimating = true;
    animate();
    document.getElementById("toggleButton").innerText = "Stop";
  } else {
    isAnimating = false;
    cancelAnimationFrame(animationId);
    document.getElementById("toggleButton").innerText = "Start";
  }
});

// Event listener untuk slider kecepatan
document.getElementById("speedSlider").addEventListener("input", (event) => {
  ball.speed = parseFloat(event.target.value);
  document.getElementById("speedValue").innerText = `${ball.speed} m/s`;
});

function goBack() {
    window.history.back();
  }
  
// Hitung nilai a untuk parabola
calculateA();

// Gambar keadaan awal
drawParabola();
drawBall();
drawEnergyGraph();
