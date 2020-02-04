const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayButton");
const volumeBtn = document.getElementById("jsVolumeButton");
const screenBtn = document.getElementById("jsFullScreen");

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

function init() {
  playBtn.addEventListener("click", handlePlayClick);
  volumeBtn.addEventListener("click", handleVolumeClick);
  screenBtn.addEventListener("click", goFullScreen);
}

if (videoContainer) {
  init();
}
