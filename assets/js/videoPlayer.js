const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayButton");
const volumeBtn = document.getElementById("jsVolumeButton");
const screenBtn = document.getElementById("jsFullScreen");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("jsVolume");
//const setPlayTime = document.getElementById("jsSetPlayTime");
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
    volumeRange.value = videoPlayer.volume;
    if (volumeRange.value === 0) {
      volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    } else if (volumeRange.value >= 0.6) {
      volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    } else if (volumeRange.value >= 0.2 && volumeRange.value < 0.6) {
      volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
    } else {
      volumeBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
    }
  } else {
    videoPlayer.muted = true;
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    volumeRange.value = 0;
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

const formatDate = (seconds) => {
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
  currentTime.innerHTML = formatDate(Math.floor(videoPlayer.currentTime));
  if (currentTime.innerHTML === totalTime.innerHTML) {
    clearInterval(timer);
  }
}

function setTotalTime() {
  const totalTimeString = formatDate(videoPlayer.duration);
  totalTime.innerHTML = totalTimeString;
  timer = setInterval(getCurrentTime, 1000);
}

function handleEnded() {
  videoPlayer.currentTime = 0;
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
}

function handleDrag(event) {
  const {
    target: { value },
  } = event;
  videoPlayer.volume = value;
  if (value === 0) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  } else if (value >= 0.6) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else if (value >= 0.2 && value < 0.6) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
  } else {
    volumeBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
  }
}

/*function forInitializeTime() {
  setPlayTime.value = currentTime / videoPlayer.duration;
}*/
/*
let seeking = false;
let seekto;
function seek(e) {
  if (seeking) {
    setPlayTime.value = e.clientX - 367;
    console.log(setPlayTime.value);
    console.log(`down${e.clientX}`);
    seekto = videoPlayer.duration * (setPlayTime.value / 177);
    videoPlayer.currentTime = seekto;
    console.log(seekto);
  }
}
function onMouseDown(e) {
  seeking = true;
  seek(e);
}
function onMouseMove(e) {
  seek(e);
}
function onMouseUp(e) {
  seeking = false;
}
*/
function init() {
  videoPlayer.volume = 0.5;
  volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
  // setInterval(handleTime, 1000);

  //setPlayTime.addEventListener("mousedown", onMouseDown);
  //setPlayTime.addEventListener("mousemove", onMouseMove);
  //setPlayTime.addEventListener("mouseup", onMouseUp);

  playBtn.addEventListener("click", handlePlayClick);
  volumeBtn.addEventListener("click", handleVolumeClick);
  screenBtn.addEventListener("click", goFullScreen);
  videoPlayer.addEventListener("loadedmetadata", setTotalTime);
  videoPlayer.addEventListener("ended", handleEnded);
  volumeRange.addEventListener("input", handleDrag);
}

if (videoContainer) {
  init();
}
