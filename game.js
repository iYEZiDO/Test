const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const comradesEl = document.getElementById("comrades");
const rankEl = document.getElementById("rank");
const weaponEl = document.getElementById("weapon");
const killsEl = document.getElementById("kills");
const baseHealthEl = document.getElementById("base-health");
const fireButton = document.getElementById("fireButton");
const statusEl = document.getElementById("status");
const logList = document.getElementById("log");

const columnCount = 7;
const columnWidth = canvas.width / columnCount;

const soldier = {
  x: canvas.width / 2,
  y: canvas.height - 80,
  width: 70,
  height: 70,
};

const bullets = [];
const zombies = [];

let comrades = 12;
let baseIntegrity = 100;
let kills = 0;
let elapsed = 0;
let spawnTimer = 1.4;
let gameOver = false;
let lastShotAt = 0;
let draggingPointerId = null;

const weaponUnlocks = [
  { name: "Pistole", threshold: 0, cooldown: 450, power: 1, color: "#4ecdc4" },
  { name: "Sturmgewehr", threshold: 20, cooldown: 320, power: 1, color: "#f0f4f8" },
  { name: "Schrotflinte", threshold: 40, cooldown: 260, power: 2, color: "#fddb3a" },
  { name: "Raketenwerfer", threshold: 60, cooldown: 200, power: 3, color: "#ff6b6b" },
];

const rankUnlocks = [
  { name: "Rekrut", threshold: 0 },
  { name: "Unteroffizier", threshold: 15 },
  { name: "Offizier", threshold: 35 },
  { name: "Kommandant", threshold: 60 },
  { name: "General", threshold: 80 },
];

let currentWeaponIndex = 0;
let currentRankIndex = 0;

function setStatus(message = "", type = "info") {
  statusEl.textContent = message;
  statusEl.style.color = type === "alert" ? "var(--danger)" : "var(--accent)";
}

function addLog(message, type = "positive") {
  const entry = document.createElement("li");
  entry.textContent = message;
  if (type === "negative") {
    entry.classList.add("negative");
  }

  logList.insertBefore(entry, logList.firstChild);
  while (logList.children.length > 7) {
    logList.removeChild(logList.lastChild);
  }
}

function getCurrentWeaponIndex() {
  let index = 0;
  for (let i = 0; i < weaponUnlocks.length; i += 1) {
    if (comrades >= weaponUnlocks[i].threshold) {
      index = i;
    }
  }
  return index;
}

function getCurrentRankIndex() {
  let index = 0;
  for (let i = 0; i < rankUnlocks.length; i += 1) {
    if (comrades >= rankUnlocks[i].threshold) {
      index = i;
    }
  }
  return index;
}

function refreshHud() {
  const previousWeapon = currentWeaponIndex;
  const previousRank = currentRankIndex;
  currentWeaponIndex = getCurrentWeaponIndex();
  currentRankIndex = getCurrentRankIndex();

  if (currentWeaponIndex !== previousWeapon) {
    const weapon = weaponUnlocks[currentWeaponIndex];
    addLog(`Neue Waffe freigeschaltet: ${weapon.name}!`);
  }

  if (currentRankIndex !== previousRank) {
    const rank = rankUnlocks[currentRankIndex];
    addLog(`Beförderung erhalten: ${rank.name}!`);
  }

  comradesEl.textContent = comrades.toString();
  killsEl.textContent = kills.toString();
  baseHealthEl.textContent = `${baseIntegrity}%`;
  rankEl.textContent = rankUnlocks[currentRankIndex].name;
  weaponEl.textContent = weaponUnlocks[currentWeaponIndex].name;
}

function randomFieldValue() {
  if (Math.random() < 0.33) {
    return -(5 + Math.floor(Math.random() * 16));
  }
  return 5 + Math.floor(Math.random() * 76);
}

function spawnZombie() {
  const column = Math.floor(Math.random() * columnCount);
  const value = randomFieldValue();
  const baseSpeed = 45 + Math.random() * 20;
  const scaling = Math.min(90, elapsed * 4);

  zombies.push({
    x: column * columnWidth + columnWidth / 2,
    y: -45,
    width: columnWidth * 0.6,
    height: 64,
    speed: baseSpeed + scaling,
    value,
  });
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function drawRoundedRectPath(context, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  context.beginPath();
  context.moveTo(x + r, y);
  context.lineTo(x + width - r, y);
  context.quadraticCurveTo(x + width, y, x + width, y + r);
  context.lineTo(x + width, y + height - r);
  context.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  context.lineTo(x + r, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - r);
  context.lineTo(x, y + r);
  context.quadraticCurveTo(x, y, x + r, y);
  context.closePath();
}

function moveSoldier(pointerX) {
  soldier.x = clamp(
    pointerX,
    soldier.width / 2 + 16,
    canvas.width - soldier.width / 2 - 16,
  );
}

function getPointerPosition(event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: ((event.clientX - rect.left) / rect.width) * canvas.width,
    y: ((event.clientY - rect.top) / rect.height) * canvas.height,
  };
}

canvas.addEventListener("pointerdown", (event) => {
  if (gameOver) {
    return;
  }
  const { x, y } = getPointerPosition(event);
  const withinSoldier =
    x >= soldier.x - soldier.width / 2 &&
    x <= soldier.x + soldier.width / 2 &&
    y >= soldier.y - soldier.height / 2 &&
    y <= soldier.y + soldier.height / 2;

  if (withinSoldier) {
    draggingPointerId = event.pointerId;
    canvas.setPointerCapture(event.pointerId);
    moveSoldier(x);
  }
});

canvas.addEventListener("pointermove", (event) => {
  if (draggingPointerId !== event.pointerId || gameOver) {
    return;
  }
  const { x } = getPointerPosition(event);
  moveSoldier(x);
});

function onPointerRelease(event) {
  if (draggingPointerId !== event.pointerId) {
    return;
  }
  canvas.releasePointerCapture(event.pointerId);
  draggingPointerId = null;
  handleShoot();
}

canvas.addEventListener("pointerup", onPointerRelease);
canvas.addEventListener("pointercancel", onPointerRelease);

fireButton.addEventListener("click", () => {
  if (gameOver) {
    resetGame();
    return;
  }
  handleShoot(true);
});

window.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    event.preventDefault();
    if (gameOver) {
      resetGame();
    } else {
      handleShoot(true);
    }
  }
});

function handleShoot(force = false) {
  if (gameOver) {
    return;
  }

  const weapon = weaponUnlocks[currentWeaponIndex];
  const now = performance.now();
  if (!force && now - lastShotAt < weapon.cooldown) {
    return;
  }

  lastShotAt = now;
  bullets.push({
    x: soldier.x,
    y: soldier.y - soldier.height / 2 - 12,
    speed: 600,
    radius: 7,
    power: weapon.power,
    color: weapon.color,
  });
}

function applyFieldValue(value) {
  const initial = comrades;
  comrades = Math.max(0, comrades + value);
  if (value >= 0) {
    addLog(`+${value} Kameraden gerettet!`);
  } else {
    addLog(`${value} Kameraden verloren!`, "negative");
  }
  refreshHud();

  if (initial > 0 && comrades === 0) {
    endGame("Du hast alle Kameraden verloren!");
  }
}

function endGame(message) {
  gameOver = true;
  setStatus(`${message} Tippe auf \"Neu starten\" für einen weiteren Versuch.`, "alert");
  fireButton.textContent = "Neu starten";
  addLog(`Mission gescheitert: ${message}`, "negative");
}

function resetGame() {
  comrades = 12;
  baseIntegrity = 100;
  kills = 0;
  elapsed = 0;
  spawnTimer = 1.4;
  gameOver = false;
  lastShotAt = 0;
  zombies.length = 0;
  bullets.length = 0;
  logList.innerHTML = "";
  fireButton.textContent = "Feuer!";
  setStatus("Halte die Linie, Soldat!");
  addLog("Mission gestartet! Rekrutiere Kameraden und stoppe die Zombies.");
  refreshHud();
}

function update(dt) {
  if (gameOver) {
    return;
  }

  elapsed += dt;
  spawnTimer -= dt;

  if (spawnTimer <= 0) {
    spawnZombie();
    const interval = Math.max(0.55, 1.45 - elapsed / 50);
    spawnTimer = interval;
  }

  for (let i = zombies.length - 1; i >= 0; i -= 1) {
    const zombie = zombies[i];
    zombie.y += zombie.speed * dt;

    if (zombie.y >= canvas.height - 110) {
      zombies.splice(i, 1);
      baseIntegrity = Math.max(0, baseIntegrity - 20);
      addLog("Die Zombies treffen die Basis! -20 % Integrität.", "negative");
      refreshHud();
      if (baseIntegrity === 0) {
        endGame("Die Basis wurde überrannt!");
      }
    }
  }

  for (let i = bullets.length - 1; i >= 0; i -= 1) {
    const bullet = bullets[i];
    bullet.y -= bullet.speed * dt;

    if (bullet.y < -30) {
      bullets.splice(i, 1);
      continue;
    }

    for (let j = zombies.length - 1; j >= 0 && bullet.power > 0; j -= 1) {
      const zombie = zombies[j];
      if (
        Math.abs(bullet.x - zombie.x) < zombie.width / 2 &&
        bullet.y <= zombie.y + zombie.height / 2 &&
        bullet.y >= zombie.y - zombie.height / 2
      ) {
        zombies.splice(j, 1);
        bullet.power -= 1;
        kills += 1;
        applyFieldValue(zombie.value);
      }
    }

    if (bullet.power <= 0) {
      bullets.splice(i, 1);
    }
  }
}

function drawBackground() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, "#0b1220");
  gradient.addColorStop(1, "#05070f");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
  ctx.lineWidth = 1;
  for (let i = 1; i < columnCount; i += 1) {
    const x = i * columnWidth;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }

  ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
  ctx.fillRect(0, canvas.height - 120, canvas.width, 4);
}

function drawSoldier() {
  ctx.save();
  const { x, y, width, height } = soldier;

  const bodyGradient = ctx.createLinearGradient(x - width / 2, y - height / 2, x + width / 2, y + height / 2);
  bodyGradient.addColorStop(0, "#1f8ea3");
  bodyGradient.addColorStop(1, "#0d4258");

  ctx.fillStyle = bodyGradient;
  drawRoundedRectPath(ctx, x - width / 2, y - height / 2, width, height, 14);
  ctx.fill();

  ctx.fillStyle = "#0b1220";
  ctx.fillRect(x - width / 2, y + height / 2 - 16, width, 12);

  ctx.fillStyle = "#ffe0b2";
  ctx.beginPath();
  ctx.arc(x, y - height / 2 - 18, 18, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#162236";
  ctx.fillRect(x - width / 2, y - height / 2 - 30, width, 14);
  ctx.restore();
}

function drawBullets() {
  for (const bullet of bullets) {
    ctx.save();
    ctx.fillStyle = bullet.color;
    ctx.shadowColor = bullet.color;
    ctx.shadowBlur = 10;
    drawRoundedRectPath(ctx, bullet.x - 4, bullet.y - 12, 8, 18, 4);
    ctx.fill();
    ctx.restore();
  }
}

function drawZombies() {
  ctx.font = "600 24px 'Segoe UI', sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  zombies.forEach((zombie) => {
    const isPositive = zombie.value >= 0;
    ctx.save();
    ctx.translate(zombie.x, zombie.y);

    ctx.fillStyle = isPositive ? "rgba(90, 247, 142, 0.85)" : "rgba(255, 107, 107, 0.85)";
    drawRoundedRectPath(
      ctx,
      -zombie.width / 2,
      -zombie.height / 2,
      zombie.width,
      zombie.height,
      12,
    );
    ctx.fill();

    ctx.fillStyle = "rgba(7, 12, 20, 0.85)";
    ctx.beginPath();
    ctx.arc(-zombie.width / 4, -zombie.height / 4, 6, 0, Math.PI * 2);
    ctx.arc(zombie.width / 4, -zombie.height / 4, 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = isPositive ? "#032b16" : "#2a0404";
    ctx.fillText(`${isPositive ? "+" : ""}${zombie.value}`, 0, zombie.height * 0.05);

    ctx.restore();
  });
}

function drawBaseStatus() {
  ctx.save();
  ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
  ctx.fillRect(40, canvas.height - 90, canvas.width - 80, 40);
  ctx.fillStyle = "#4ecdc4";
  const width = ((canvas.width - 80) * baseIntegrity) / 100;
  ctx.fillRect(40, canvas.height - 90, width, 40);
  ctx.font = "600 18px 'Segoe UI', sans-serif";
  ctx.fillStyle = "#0b1220";
  ctx.textAlign = "center";
  ctx.fillText("Basisverteidigung", canvas.width / 2, canvas.height - 70);
  ctx.restore();
}

function drawGameOverOverlay() {
  if (!gameOver) {
    return;
  }
  ctx.save();
  ctx.fillStyle = "rgba(5, 8, 16, 0.72)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#f0f4f8";
  ctx.font = "700 42px 'Segoe UI', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("Mission gescheitert", canvas.width / 2, canvas.height / 2 - 10);
  ctx.font = "400 22px 'Segoe UI', sans-serif";
  ctx.fillText("Tippe auf 'Neu starten' oder die Leertaste, um es erneut zu versuchen.", canvas.width / 2, canvas.height / 2 + 32);
  ctx.restore();
}

function draw() {
  drawBackground();
  drawZombies();
  drawBullets();
  drawSoldier();
  drawBaseStatus();
  drawGameOverOverlay();
}

let lastTimestamp = 0;
function loop(timestamp) {
  const dt = Math.min(0.05, (timestamp - lastTimestamp) / 1000 || 0);
  lastTimestamp = timestamp;

  update(dt);
  draw();

  requestAnimationFrame(loop);
}

resetGame();
requestAnimationFrame(loop);
