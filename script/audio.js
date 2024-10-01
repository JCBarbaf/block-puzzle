function changeVolume(volumeType, newVolume) {
  localStorage.setItem(volumeType, newVolume);
  document.querySelector(`audio[data-volume-type="${volumeType}"]`).volume = newVolume;
  let slider = document.querySelector(`.audio-slider[data-volume-type="${volumeType}"]`)
  if(slider) {
    slider.value = newVolume*100;
  }
}

function playSound(sound) {
  const audio = document.querySelector(`audio[data-volume-type="sfxVolume"]`)
  audio.src = `sound/sfx/${sound}.mp3`;
  audio.volume = localStorage.getItem("sfxVolume") || 0.5;
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
          setTimeout(() => {
            window.location.href = element.href;
          }, 300)
        } else {
          playSound(element.dataset.sfx);
        }
      })
    })
    document.querySelectorAll('audio').forEach(audio => {
      let defaultVolume = audio.dataset.volumeType == "musicVolume" ? 0 : 0.5;
      let volume = localStorage.getItem(audio.dataset.volumeType) || defaultVolume;
      changeVolume(audio.dataset.volumeType, volume);
      audio.play()
    })

  });
})();