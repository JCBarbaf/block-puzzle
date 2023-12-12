export default (() => {
    let settingsButton = document.querySelector('.settings-button');
    let settingsModal = document.querySelector('.modal-container.settings');
    settingsButton?.addEventListener('click', () => {
        settingsModal?.classList.add('active');
    });
    settingsModal?.addEventListener('click', (event) => {
        if (event.target.closest('.close-icon')) {
            settingsModal.classList.remove('active');
        }
    });
})();