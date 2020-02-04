const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayButton");
const volumeBtn = document.getElementById("jsVolumeButton");
const screenBtn = document.getElementById("jsFullScreen");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");

let timer;

function handlePlayClick() {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    videoPlayer.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
}

function handleVolumeClick() {
  if (videoPlayer.muted) {
    videoPlayer.muted = false;
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else {
    videoPlayer.muted = true;
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
}

function exitFullScreen() {
  screenBtn.innerHTML = '<i class="fas fa-expand"></i>';
  screenBtn.addEventListener("click", goFullScreen);
  const agent = navigator.userAgent.toLowerCase();
  if (agent.indexOf("msie") !== -1) {
    //익스플로러인지 체크
    document.msExitFullscreen();
  } else if (agent.indexOf("chrome") !== -1) {
    document.webkitExitFullscreen();
  } else if (agent.indexOf("safari") !== -1) {
    document.webkitExitFullscreen();
  } else if (agent.indexOf("firefox") !== -1) {
    document.exitFullscreen();
  }
}

function goFullScreen() {
  const agent = navigator.userAgent.toLowerCase();
  if (agent.indexOf("msie") !== -1) {
    videoContainer.msRequestFullscreen();
  } else if (agent.indexOf("chrome") !== -1) {
    videoContainer.webkitRequestFullscreen();
  } else if (agent.indexOf("safari") !== -1) {
    videoContainer.webkitRequestFullscreen();
  } else if (agent.indexOf("firefox") !== -1) {
    videoContainer.requestFullscreen();
  }
  screenBtn.innerHTML = '<i class="fas fa-compress"></i>';
  screenBtn.removeEventListener("click", goFullScreen);
  screenBtn.addEventListener("click", exitFullScreen);
}

const formatDate = seconds => {
  const secondsNumber = parseInt(seconds, 10);
  let hours = Math.floor(secondsNumber / 3600);
  let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
  let totalSeconds = secondsNumber - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (totalSeconds < 10) {
    totalSeconds = `0${totalSeconds}`;
  }
  return `${hours}:${minutes}:${totalSeconds}`;
};

function getCurrentTime() {
  currentTime.innerHTML = formatDate(videoPlayer.currentTime);
  if (currentTime.innerHTML === totalTime.innerHTML) {
    clearInterval(timer);
  }
}

function setTotalTime() {
  const totalTimeString = formatDate(videoPlayer.duration);
  totalTime.innerHTML = totalTimeString;
  timer = setInterval(getCurrentTime, 1000);
}

function init() {
  playBtn.addEventListener("click", handlePlayClick);
  volumeBtn.addEventListener("click", handleVolumeClick);
  screenBtn.addEventListener("click", goFullScreen);
  videoPlayer.addEventListener("loadedmetadata", setTotalTime);
}

if (videoContainer) {
  init();
}
