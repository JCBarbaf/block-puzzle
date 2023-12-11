export default (() => {
    const squares = document.querySelectorAll('.map .square');
    const mouseFollower = document.querySelector('.mouse-follower');
    const snapPoints = document.querySelectorAll('.map .square .snap-point');
    const piece = document.querySelector('.piece');
    const counterDisplay = document.querySelector('.piece-counter');
    const winModal = document.querySelector('.modal-container.win');
    let pieceClone;
    let templates = [
        {
            piecesUsed: 200,
            template:
                [1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1,
                1, 1, 1, 1, 1, 1, 1,]},
        {
            piecesUsed: 4,
            template:
                [1, 1, 0, 0, 0, 0, 0,
                0, 1, 1, 1, 1, 0, 0,
                1, 1, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0,]},
        {
            piecesUsed: 17,
            template:
                [1, 0, 0, 0, 0, 0, 1,
                1, 1, 1, 0, 1, 1, 1,
                1, 1, 1, 0, 1, 1, 1,
                0, 1, 1, 1, 1, 1, 0,
                0, 1, 1, 1, 1, 1, 0,
                1, 1, 1, 0, 1, 1, 1,
                1, 1, 0, 0, 0, 1, 1,]},
        {
            piecesUsed: 17,
            template:
                [1, 1, 1, 0, 0, 0, 0,
                1, 1, 1, 1, 0, 0, 0,
                1, 1, 1, 0, 0, 0, 0,
                1, 1, 1, 1, 1, 1, 1,
                0, 1, 1, 1, 1, 1, 0,
                1, 1, 1, 1, 1, 1, 0,
                1, 1, 1, 1, 0, 1, 1,]},
        {
            piecesUsed: 16,
            template:
                [1, 1, 1, 0, 1, 1, 1,
                0, 1, 1, 1, 1, 1, 0,
                0, 1, 0, 1, 0, 1, 0,
                1, 1, 0, 0, 0, 1, 1,
                0, 1, 0, 1, 0, 1, 0,
                0, 1, 1, 1, 1, 1, 0,
                1, 1, 1, 0, 1, 1, 1,]},
        {
            piecesUsed: 12,
            template:
                [1, 1, 0, 0, 0, 1, 1,
                1, 0, 0, 1, 0, 0, 1,
                1, 0, 0, 1, 0, 0, 1,
                0, 1, 1, 0, 1, 1, 0,
                1, 0, 0, 1, 0, 0, 1,
                1, 0, 0, 1, 0, 0, 1,
                1, 1, 0, 0, 0, 1, 1,]},
    ];
    let positions = [{}];
    // let randomIndex = Math.floor(Math.random() * templates.length);
    let randomIndex = Math.floor(Math.random() * ((templates.length-1) - 2 + 1) + 2);
    // randomIndex = 0;
    let counter = templates[randomIndex]['piecesUsed'];
    counterHandler();
    // Generate map using the template
    for (let i = 0; i < templates[randomIndex]['template'].length; i++) {
        if (templates[randomIndex]['template'][i] == 1) {
            squares[i].classList.add('active');
        }
    }
    // Save the positions of the sanp-points
    for (let i = 0; i < squares.length; i++) {
        if (squares[i].classList.contains('active')) {
            let position = snapPoints[i].getBoundingClientRect();
            positions[i] = { 'x': position.x, 'y': position.y };
        } else {
            positions[i] = null;
        }
    }
    // rotate piece on right click
    const rotatePiece = (event) => {
        event.preventDefault();
        pieceClone.classList.toggle('rotated');
    };
    //todo cancel piece following
    const findSnap = () => {
        pieceClone.classList.remove('clone');
        let mouseRect = mouseFollower.getBoundingClientRect();
        // Calculate the closest distance available
        let closestDistance = null;
        let closestDistanceIndex = null;
        positions.forEach((snapPoint, i) => {
            if (snapPoint) {
                let distance = calculateDistance(snapPoint, { x: mouseRect.x, y: mouseRect.y });
                if (closestDistance) {
                    if (distance < closestDistance) {
                        closestDistance = distance;
                        closestDistanceIndex = i;
                    };
                } else {
                    closestDistance = distance;
                    closestDistanceIndex = i;
                }
            }
        });
        // Check if the closest distance is in reach
        if (closestDistance < 40) {
            // Check if the piece fits
            if (pieceClone.classList.contains('rotated')) {
                if (positions[closestDistanceIndex + 7]) {
                    placePiece(closestDistanceIndex, true);
                }
            } else {
                if (positions[closestDistanceIndex + 1]) {
                    placePiece(closestDistanceIndex, false);
                }
            }
        }

    };

    piece.addEventListener('click', () => {
        if (counter == 1) {
            piece.classList.add('hidden');
        }
        //Clone the piece
        pieceClone = piece.cloneNode(true);
        pieceClone.classList.remove('original');
        pieceClone.classList.add('clone');
        mouseFollower.appendChild(pieceClone);
        // On right click rotate the piece 90deg
        pieceClone.addEventListener('contextmenu', rotatePiece)
        // On regular click place the piece
        pieceClone.addEventListener('click', findSnap);
    })
    //Move the piece with the mouse
    document.addEventListener('mousemove', (event) => {
        mouseFollower.style.top = (event.clientY - (mouseFollower.offsetHeight * 0.5)) + "px";
        mouseFollower.style.left = (event.clientX - (mouseFollower.offsetWidth * 0.25)) + "px";
    });
    // Calculate distance
    function calculateDistance(point1, point2) {
        var dx = point1.x - point2.x;
        var dy = point1.y - point2.y;
        return Math.sqrt(dx * dx + dy * dy);
    };
    function placePiece(pieceIndex, isrotated) {
        //Place piece
        pieceClone.classList.add('placed');
        // Remove previous events
        pieceClone.removeEventListener('contextmenu', rotatePiece);
        pieceClone.removeEventListener('click', findSnap);
        // Remove the piece on right click
        pieceClone.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            // Restore snap-points into positions array
            let piece = event.target.closest('.piece');
            let snap = piece.closest('.snap-point');
            let snapPointsArray = Array.from(snapPoints);
            const isSnap = (element) => element == snap;
            // let snapIndex = snapPointsArray.findIndex(div => div.isEqualNode(snap));
            let snapIndex = snapPointsArray.findIndex(isSnap);
            let position = snapPoints[snapIndex].getBoundingClientRect();
            positions[snapIndex] = { 'x': position.x, 'y': position.y };
            if (piece.classList.contains('rotated')) {
                position = snapPoints[snapIndex+7].getBoundingClientRect();
                positions[snapIndex+7] = { 'x': position.x, 'y': position.y };
            } else {
                position = snapPoints[snapIndex+1].getBoundingClientRect();
                positions[snapIndex+1] = { 'x': position.x, 'y': position.y };
            }
            // Delete piece
            deletePiece(piece);
        });
        snapPoints[pieceIndex].appendChild(pieceClone);
        //Delete the snap-points in use
        positions[pieceIndex] = null;
        if (isrotated) {
            positions[pieceIndex + 7] = null;
        } else {
            positions[pieceIndex + 1] = null;
        }
        pieceClone = null;
        counter--;
        counterHandler();
    }
    function deletePiece(piece) {
        piece.remove();
        counter++;
        counterHandler();
    }
    function counterHandler() {
        counterDisplay.innerHTML = `${counter} pieces`;
        if (counter == 0) {
            console.log('hola');
            winModal.classList.add('active');
        }
    }
})();