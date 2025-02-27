const logosIntervalInMinutes = 3;
var hours = 22;
var minutes = 00;
var seconds = 00;
let initialHours = 22;
let initialMinutes = 00;
let initialSeconds = 00;
var interval;
var started = false;
var type = "coding";
let settingsActive = false;

var logosContainer = document.getElementById("logos");
var logos = logosContainer.querySelectorAll("div");
var logosInterval;
var clock = document.getElementById("clock");
var hoursField = clock.querySelector(".hours");
var minutesField = clock.querySelector(".minutes");
var secondsField = clock.querySelector(".seconds");

var tools = document.getElementById("tools");
var startButton = document.getElementById("start");
var restartButton = document.getElementById("restart");
const settingsButton = document.getElementById("settings");
var codingOption = tools.querySelector("#type .option.coding");
var presentationOption = tools.querySelector("#type .option.presentation");
var questionsOption = tools.querySelector("#type .option.questions");

var bg_logo = document.getElementById("background-logo");
var bg = document.getElementById("background");


function reloadTimer() {
  hoursField.querySelector(".first").textContent =
    hours < 10 ? 0 : Math.floor(hours / 10);
  hoursField.querySelector(".second").textContent =
    hours - Math.floor(hours / 10) * 10;

  minutesField.querySelector(".first").textContent =
    minutes < 10 ? 0 : Math.floor(minutes / 10);
  minutesField.querySelector(".second").textContent =
    minutes - Math.floor(minutes / 10) * 10;

  secondsField.querySelector(".first").textContent =
    seconds < 10 ? 0 : Math.floor(seconds / 10);
  secondsField.querySelector(".second").textContent =
    seconds - Math.floor(seconds / 10) * 10;
}

function recountTime() {
  if (hours === 0 && minutes === 0 && seconds === 0) clearInterval(interval);
  else if (seconds === 0) {
    seconds = 59;
    if (minutes > 0) minutes--;
    else if (hours > 0) {
      minutes = 59;
      hours--;
    }
  } else seconds--;

  reloadTimer();
}

function startTimer() {
  startButton.classList.add("started");
  started = true;
  recountTime();
  interval = setInterval(recountTime, 1000);
  if (type === "coding")
    logosInterval = setInterval(showLogos, logosIntervalInMinutes * 60 * 1000);
  bg.classList.add("animate");
  bg_logo.classList.add("animate");
}

function pauseTimer() {
  startButton.classList.remove("started");
  started = false;
  clearInterval(interval);
  clearInterval(logosInterval);
  bg.classList.remove("animate");
}

startButton.onclick = function () {
  if (settingsActive) {
    const hoursInput = document
      .getElementById("hoursInput")
      .value.padStart(2, "0");
    const minutesInput = document
      .getElementById("minutesInput")
      .value.padStart(2, "0");
    const secondsInput = document
      .getElementById("secondsInput")
      .value.padStart(2, "0");
    hours = +hoursInput;
    minutes = +minutesInput;
    seconds = +secondsInput;
    initialHours = hours;
    initialMinutes = minutes;
    initialSeconds = seconds;
    clock.innerHTML = `<span class="hours"
          ><span class="first digit">${hoursInput[0]}</span
          ><span class="second digit">${hoursInput[1]}</span></span
        >:<span class="minutes"
          ><span class="first digit">${minutesInput[0]}</span
          ><span class="second digit">${minutesInput[1]}</span></span
        >:<span class="seconds"
          ><span class="first digit">${secondsInput[0]}</span
          ><span class="second digit">${secondsInput[1]}</span></span
        >`;
    hoursField = clock.querySelector(".hours");
    minutesField = clock.querySelector(".minutes");
    secondsField = clock.querySelector(".seconds");
    settingsActive = false;
  }
  if (started) {
    pauseTimer();
  } else {
    startTimer();
  }
};

restartButton.onclick = function () {
  pauseTimer();
  switch (type) {
    case "coding":
      hours = initialHours;
      minutes = initialMinutes;
      seconds = initialSeconds;
      break;
    case "presentation":
      hours = 0;
      minutes = 7;
      seconds = 0;
      break;
    case "qustions":
      hours = 0;
      minutes = 3;
      seconds = 0;
      break;
  }
  reloadTimer();
};

codingOption.onclick = function () {
  pauseTimer();
  codingOption.classList.add("active");
  presentationOption.classList.remove("active");
  questionsOption.classList.remove("active");
  type = "coding";
  hours = 22;
  minutes = 0;
  seconds = 0;
  reloadTimer();
};

presentationOption.onclick = function () {
  pauseTimer();
  presentationOption.classList.add("active");
  codingOption.classList.remove("active");
  questionsOption.classList.remove("active");
  type = "presentation";
  hours = 0;
  minutes = 7;
  seconds = 0;
  reloadTimer();
};

settingsButton.onclick = function () {
  pauseTimer();
  settingsActive = true;
  hoursField.classList.add(".hidden");
  minutesField.classList.add(".hidden");
  secondsField.classList.add(".hidden");
  clock.innerHTML = `
            <input id="hoursInput" autocomplete="off">
            :<input id="minutesInput" autocomplete="off">
            :<input id="secondsInput" autocomplete="off">`;
};

questionsOption.onclick = function () {
  pauseTimer();
  questionsOption.classList.add("active");
  codingOption.classList.remove("active");
  presentationOption.classList.remove("active");
  type = "qustions";
  hours = 0;
  minutes = 3;
  seconds = 0;
  reloadTimer();
};

document.onmousemove = function () {
  if (tools.classList.contains("hidden")) {
    tools.classList.remove("hidden");
    setTimeout(function () {
      tools.classList.add("hidden");
    }, 3000);
  }
  logosContainer.classList.add("hidden");
  timer.classList.remove("hidden");
};

function showLogos() {
  logosContainer.classList.remove("hidden");
  timer.classList.add("hidden");

  logos.forEach(logo => logo.classList.remove("active"));

  logos.forEach((logo, i) => {
    setTimeout(() => {
      logos.forEach(l => l.classList.remove("active"));
      logo.classList.add("active");
    }, 3000 * i);
  });

  setTimeout(() => {
    logosContainer.classList.add("hidden");
    timer.classList.remove("hidden");
  }, logos.length * 3000);
}
