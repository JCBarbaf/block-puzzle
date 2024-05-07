import templates from "./db.js";
export default (async () => {
    const saveButton = document.querySelector('.save')
    const squares = document.querySelectorAll('.map .square');
    const mouseFollower = document.querySelector('.mouse-follower');
    const snapPoints = document.querySelectorAll('.map .square .snap-point');
    const piece = document.querySelector('.piece');
    const pieceRectangle = piece.getBoundingClientRect();
    const piecePosition = { 'x': pieceRectangle.x, 'y': pieceRectangle.y };
    const counterDisplay = document.querySelector('.piece-counter');
    const winModal = document.querySelector('.modal-container.win');
    const reach = 40;
    let pieceClone;
    let positions = [{}];
    let index = new URLSearchParams(document.location.search).get("level");
    document.querySelector('.level-counter').innerHTML = `Level ${index}`;
    let counter = templates[index]['piecesUsed'];
    counterHandler();
    // Generate map using the template
    for (let i = 0; i < templates[index]['template'].length; i++) {
        if (templates[index]['template'][i] == 1) {
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
    const findSnap = () => {
        pieceClone.classList.remove('clone');
        let mouseRect = mouseFollower.getBoundingClientRect();
        // Remove the piece if its close to the container
        let pieceDistance = calculateDistance(piecePosition,{ x: mouseRect.x, y: mouseRect.y });
        if (pieceDistance < 100) {
            pieceClone.remove();
        }
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
        if (closestDistance < reach) {
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
            win();
        }
    }
    function win() {
        winModal.classList.add('active');
        document.dispatchEvent(new CustomEvent('win'));
    }
})();