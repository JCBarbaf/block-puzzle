import { changeVolume } from './audio.js';
export default (() => {
    let settingsButton = document.querySelector('.settings-trigger');
    let settingsModal = document.querySelector('.modal-container.settings');
    settingsButton?.addEventListener('click', () => {
        settingsModal?.classList.add('active');
    });
    settingsModal?.addEventListener('click', (event) => {
        if (event.target.closest('.close-icon')) {
            settingsModal.classList.remove('active');
        }
    });
    document.querySelectorAll('.audio-slider').forEach(slider => {
      slider.addEventListener('input', (event) => {
        changeVolume(slider.dataset.volumeType, slider.value/100);
      });
    });
})();