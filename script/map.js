export default (() => {
    let squares = document.querySelectorAll('.map .square');
    let template = [
        1,1,1,0,0,0,0,
        1,1,1,1,0,0,0,
        1,1,1,0,0,0,0,
        1,1,1,1,1,1,1,
        0,1,1,1,1,1,0,
        1,1,1,1,1,1,0,
        1,1,1,1,0,1,1,
    ];
    let positions = [{}];
    for (let i = 0; i < template.length; i++) {
        if (template[i] == 1) {
            squares[i].classList.add('active');
        }
    }
    for (let i = 0; i < squares.length; i++) {
        if (squares[i].classList.contains('active')) {
            let position = squares[i].getBoundingClientRect();
            positions[i] = {'x': position.top, 'y': position.left};            
        }
    }
    console.log(positions[1]['x']);
    document.addEventListener('placePiece', (event => {
        let piece = document.querySelector('.map .piece.clone');
        piece.classList.remove('clone');
        // console.log(`X = ${positions[1]['x']} , Y = ${positions[1]['y']}`);
        piece.style.top = positions[0]['x'] + "px";
        piece.style.left = positions[0]['y'] + "px";
        console.log(piece);
    }));
    // console.log(pos)
    // console.log('Top:', pos.top);
    // console.log('Left:', pos.left);
    // console.log('Bottom:', pos.bottom);
    // console.log('Right:', pos.right);
    // let test = document.createElement('div');
    // test.classList.add('test');
    // test.style.top = pos.top + "px";
    // test.style.left = pos.left + "px";
    // document.body.appendChild(test)

  })();