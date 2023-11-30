export default (() => {
    let squares = document.querySelectorAll('.map .square');
    let snapPoints = document.querySelectorAll('.map .square .snap-point');
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
            let position = snapPoints[i].getBoundingClientRect();
            positions[i] = {'x': position.top, 'y': position.left};      
        }
    }
    // console.log(positions);
    document.addEventListener('placePiece', (event => {
        let piece = document.querySelector('.snap-point .piece.clone');
        piece.classList.remove('clone');
        // console.log(`X = ${positions[1]['x']} , Y = ${positions[1]['y']}`);
        // piece.style.top = positions[0]['x'] + "px";
        // piece.style.left = positions[0]['y'] + "px";
        // console.log(piece);

        snapPoints[0].appendChild(piece);
        // findClosestPosition(event);
        var closestPosition = positions.reduce(function (closest, current) {
            var distanceToCurrent = calculateDistance({ x: mouseX, y: mouseY }, current);
            var distanceToClosest = calculateDistance({ x: mouseX, y: mouseY }, closest);
            return distanceToCurrent < distanceToClosest ? current : closest;
        }, positions[0]); // Start with the first position as the initial closest
        console.log(closestPosition)
    }));
    function calculateDistance(point1, point2) {
        var dx = point1.x - point2.x;
        var dy = point1.y - point2.y;
        return Math.sqrt(dx * dx + dy * dy);
    };
  
    // Function to find the closest position and perform an action
    // function findClosestPosition(event) {
    //     var mouseX = event.clientX;
    //     var mouseY = event.clientY;
  
        // Find the closest position
        // var closestPosition = positions.reduce(function (closest, current) {
        //   var distanceToCurrent = calculateDistance({ x: mouseX, y: mouseY }, current);
        //   var distanceToClosest = calculateDistance({ x: mouseX, y: mouseY }, closest);
        //   return distanceToCurrent < distanceToClosest ? current : closest;
        // }, positions[0]); // Start with the first position as the initial closest
  
        // Log the closest position
        // for (let i = 0; i < positions.length; i++) {
        //     if (positions[i]) {
        //         console.log(`Positions de index: X=${positions[i]['x']} Y=${positions[i]['y']} | closest position: X=${closestPosition['x']} Y=${closestPosition['y']} `)
        //     }
            
        // }
    //}
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