export default (() => {
  let piece = document.querySelector('.piece');
  piece.addEventListener('click',() => {
    console.log(piece);
    let pieceClone = piece.cloneNode(true);
    pieceClone.classList.add('clone')
    document.body.appendChild(pieceClone)
  })
  document.addEventListener()
})();