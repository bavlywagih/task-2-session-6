const timerDisplay = document.getElementById("timer");
const progressCircle = document.getElementById("progress");
const statusText = document.getElementById("statusText");
const customPomodoroInput = document.getElementById("customPomodoro");

const durations = {
  pomodoro: 25 * 60,
  short: 5 * 60,
  long: 15 * 60
};

let currentMode = "pomodoro";
let timeLeft = durations[currentMode];
let totalTime = durations[currentMode];
let timer = null;
let isRunning = false;

function updateDisplay() {
  const min = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const sec = (timeLeft % 60).toString().padStart(2, '0');
  timerDisplay.textContent = `${min}:${sec}`;
  const progress = (timeLeft / totalTime) * 565.48;
  progressCircle.style.strokeDashoffset = 565.48 - progress;
}

function setMode(mode) {
  pauseTimer();
  currentMode = mode;
  totalTime = durations[mode];
  timeLeft = durations[mode];
  updateDisplay();
  statusText.textContent = "Paused";
}

function toggleTimer() {
  if (isRunning) {
    pauseTimer();
  } else {
    startTimer();
  }
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;
  statusText.textContent = "Running";
  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateDisplay();
    } else {
      clearInterval(timer);
      isRunning = false;
      statusText.textContent = "Paused";
      alert("Time's up!");
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
  statusText.textContent = "Paused";
}

// Toggle input for Pomodoro
function togglePomodoroInput() {
  if (customPomodoroInput.style.display === "none" || customPomodoroInput.style.display === "") {
    customPomodoroInput.style.display = "block";
    customPomodoroInput.focus();
  } else {
    customPomodoroInput.style.display = "none";
  }
}

function handleCustomPomodoroInput() {
  const minutes = parseInt(customPomodoroInput.value);
  if (!isNaN(minutes) && minutes > 0) {
    durations.pomodoro = minutes * 60;
    setMode("pomodoro");
  }
  customPomodoroInput.style.display = "none";
  customPomodoroInput.value = "";
}

customPomodoroInput.addEventListener("blur", handleCustomPomodoroInput);

customPomodoroInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    handleCustomPomodoroInput();
  }
});

// Initialize
updateDisplay();
