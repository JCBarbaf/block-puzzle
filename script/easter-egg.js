export default (() => {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiCodeIndex = 0;
    document.addEventListener('keydown', (event) => {
        if (event.key == konamiCode[konamiCodeIndex]) {
            konamiCodeIndex++;
        } else {
            konamiCodeIndex = 0;
        }
        if (konamiCodeIndex >= konamiCode.length) {
            alert("30 lives added.");
        }
    });
})();