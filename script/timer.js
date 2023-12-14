export default (() => {
    const timerOutput = document.querySelector('.timer');
    let minutes = 0;
    let formatedMinutes;
    let seconds = 0;
    let timer = setInterval(() => {
        seconds++;
        if (seconds >= 60) {
            minutes++;
            seconds = 0;
        }
        if (minutes < 10) {
            formatedMinutes = "0" + minutes;
        } else {
            formatedMinutes = minutes;
        }
        timerOutput.innerHTML = `${formatedMinutes}:${("0" + seconds).slice(-2)}`
    }, 1000);
    document.addEventListener('win', () => {
        clearInterval(timer);
    });
})();