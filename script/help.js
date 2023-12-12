export default (() => {
    let helpMenu = document.querySelector('.help-menu');
    helpMenu?.addEventListener('click', (event) => {
        if (event.target.closest('.help-icon')) {
            helpMenu.classList.add('active');
        }
        if (event.target.closest('.close-icon')) {
            helpMenu.classList.remove('active');
        }
    });
})();