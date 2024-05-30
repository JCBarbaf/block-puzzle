function changeVolume(volumeType, newVolume) {
  localStorage.setItem(volumeType, newVolume);
  document.querySelector(`audio[data-volume-type="${volumeType}"]`).volume = newVolume;
  console.log(volumeType + ": " + newVolume)
}

function playSound(sound) {
  const audio = document.querySelector(`audio[data-volume-type="sfxVolume"]`)
  audio.src = `sound/sfx/${sound}.mp3`;
  audio.volume = localStorage.getItem("musicVolume") || 0.5;
  audio.play();
}

export { changeVolume, playSound };

export default (() => {
  document.addEventListener("DOMContentLoaded", event => {
    document.querySelectorAll('[data-sfx]').forEach(element => {
      element.addEventListener('click', (event) => {
        if (event.target.closest('a')) {
          event.preventDefault();
          playSound(element.dataset.sfx);
          window.location.href = element.href;
        }
        playSound(element.dataset.sfx);
      })
    })
    document.querySelectorAll('audio').forEach(audio => {
      audio.muted = true;
      audio.volume = localStorage.getItem("musicVolume") || 0.5;
      audio.play().then(() => {
        audio.muted = false;
      });
    })

  });
})();