function changeVolume(volumeType, newVolume) {
  localStorage.setItem("musicVolume", newVolume);
  document.querySelector(`audio[data-volume-type="${volumeType}"]`).volume = newVolume;
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
          event.preventDefault()
          alert('hola')
          playSound(element.dataset.sfx)
          window.location.href = element.href
        }
        playSound(element.dataset.sfx);
      })
    })
    const audio = document.querySelector('.music');
    audio.muted = true;
    audio.volume = localStorage.getItem("musicVolume") || 0.5;
    audio.play().then(() => {
      audio.muted = false;
    });
  });
})();