export default (() => {
    let squares = document.querySelectorAll('.map .square');
    let template = [
        1,1,1,0,0,0,0,
        1,1,1,1,0,0,0,
        1,1,1,0,0,0,0,
        1,1,1,1,1,1,1,
        0,1,1,1,1,1,0,
        0,1,1,1,1,1,0,
        1,1,1,1,0,1,1,
    ];
    for (let i = 0; i < template.length; i++) {
        if (template[i] == 1) {
            squares[i].classList.add('active');
        }
    }
  })();