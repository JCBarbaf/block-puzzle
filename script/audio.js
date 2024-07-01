function changeVolume(volumeType, newVolume) {
  console.log(volumeType + ": " + newVolume)
  localStorage.setItem(volumeType, newVolume);
  document.querySelector(`audio[data-volume-type="${volumeType}"]`).volume = newVolume;
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
            console.log(element.dataset.sfx)
          }, 300)
        } else {
          playSound(element.dataset.sfx);
        }
      })
    })
    document.querySelectorAll('audio').forEach(audio => {
      console.log(localStorage.getItem('musicVolume'))
      let defaultVolume = audio.dataset.volumeType == "musicVolume" ? 0 : 0.5;
      audio.volume = localStorage.getItem(audio.dataset.volumeType) || defaultVolume;
      audio.play()
      console.log(audio.volume)
    })

  });
})();