export default (() => {
  let piece = document.querySelector('.piece');
  let mouseFollower = document.querySelector('.mouse-follower')
  let pieceClone;
  let map = document.querySelector('.map');
  piece.addEventListener('click',() => {
    // console.log(piece);
    //Clone the piece
    pieceClone = piece.cloneNode(true);
    pieceClone.classList.add('clone');
    mouseFollower.appendChild(pieceClone);
    // On right click rotate the piece 90deg
    pieceClone.addEventListener('contextmenu', (event) => {
      event.preventDefault();
      // degrees += 90;
      pieceClone.classList.toggle('rotated')
      // if (isrotated) {
      //   pieceClone.style.transform= 'rotate(0deg)';
      //   isrotated = false;
      // } else {
      //   pieceClone.style.transform= 'rotate(90deg)';
      //   isrotated = true;
      // }
    });
    // On regular click place the piece
    pieceClone.addEventListener('click', () => {
      pieceClone.classList.add('placed');
      map.appendChild(pieceClone);
      pieceClone = null;
      document.dispatchEvent(new CustomEvent('placePiece'));
    });
  })
  //Move the piece with the mouse
  document.addEventListener('mousemove',(event) => {
    // console.log(piece.style);
    mouseFollower.style.top = (event.clientY-(mouseFollower.offsetHeight*0.5)) + "px";
    mouseFollower.style.left = (event.clientX-(mouseFollower.offsetWidth*0.25)) + "px";
    // pieceClone.style.top = (event.clientY-(pieceClone.offsetHeight*1)) + "px";
    // pieceClone.style.left = (event.clientX-(pieceClone.offsetWidth*1)) + "px";
});
})();