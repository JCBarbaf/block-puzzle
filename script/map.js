export default (() => {
    let squares = document.querySelectorAll('.map .square');
    let mouseFollower = document.querySelector('.mouse-follower');
    let snapPoints = document.querySelectorAll('.map .square .snap-point');
    let templates = [
        [1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,],
        [1,0,0,0,0,0,1,
        1,1,1,0,1,1,1,
        1,1,1,0,1,1,1,
        0,1,1,1,1,1,0,
        0,1,1,1,1,1,0,
        1,1,1,0,1,1,1,
        1,1,0,0,0,1,1,],
        [1,1,1,0,0,0,0,
        1,1,1,1,0,0,0,
        1,1,1,0,0,0,0,
        1,1,1,1,1,1,1,
        0,1,1,1,1,1,0,
        1,1,1,1,1,1,0,
        1,1,1,1,0,1,1,]
    ];
    let positions = [{}];
    let randomIndex = Math.floor(Math.random() * templates.length);
    randomIndex = 1;
    for (let i = 0; i < templates[randomIndex].length; i++) {
        if (templates[randomIndex][i] == 1) {
            squares[i].classList.add('active');
        }
    }
    for (let i = 0; i < squares.length; i++) {
        if (squares[i].classList.contains('active')) {
            let position = snapPoints[i].getBoundingClientRect();
            positions[i] = {'x': position.x, 'y': position.y};      
        }
    }
    document.addEventListener('placePiece', (event => {
        let piece = document.querySelector('.snap-point .piece.clone');
        piece.classList.remove('clone');
        // todo rellenar las posiciones vacias con ""
        // todo que solo se ponga en una posicion si esta a menos de X pixeles de distancia 
        let mouseRect = mouseFollower.getBoundingClientRect();
        let smallestDistance = calculateDistance(positions[0],{ x: mouseRect.x, y: mouseRect.y });
        let smallestDistanceIndex = 0;
        positions.forEach((snapPoint,i) => {
            let distance = calculateDistance(snapPoint,{ x: mouseRect.x, y: mouseRect.y });
            if (distance < smallestDistance) {
                smallestDistance = distance;
                smallestDistanceIndex = i;
            };
        });
        snapPoints[smallestDistanceIndex].appendChild(piece);
        //------------------------------------------------
        // console.log(positions[smallestDistanceIndex]);
        // positions.splice(smallestDistanceIndex,1);
        // console.log(positions[smallestDistanceIndex]);
        //------------------------------------------------
    }));
    function calculateDistance(point1, point2) {
        var dx = point1.x - point2.x;
        var dy = point1.y - point2.y;
        return Math.sqrt(dx * dx + dy * dy);
    };
  })();