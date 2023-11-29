export default (() => {
    let squares = document.querySelectorAll('.map div');
    let template = [
        1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,
    ];
    for (let i = 0; i < template.length; i++) {
        squares[i].classList.add('active');
    }
  })();