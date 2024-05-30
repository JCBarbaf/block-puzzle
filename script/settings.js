import { changeVolume } from './audio.js';
export default (() => {
    let settingsButton = document.querySelector('.settings-trigger');
    let settingsModal = document.querySelector('.modal-container.settings');
    document.querySelectorAll('.audio-slider').forEach(element => {
      element.value = localStorage.getItem(element.dataset.volumeType)
    })
    settingsButton?.addEventListener('click', () => {
        settingsModal?.classList.add('active');
    });
    settingsModal?.addEventListener('click', (event) => {
        if (event.target.closest('.close-icon')) {
            settingsModal.classList.remove('active');
        }
        if (event.target.closest('.sound-button')) {
          const soundButton = event.target.closest('.sound-button')
          soundButton.parentNode.querySelectorAll('.sound-button').forEach(element => {
            element.classList.toggle("active")
          })
          console.log(soundButton.dataset.mute)
        }
    });
    document.querySelectorAll('.audio-slider').forEach(slider => {
      slider.addEventListener('input', (event) => {
        changeVolume(slider.dataset.volumeType, slider.value/100);
      });
    });
})();