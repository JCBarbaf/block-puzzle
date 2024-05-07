import templates from "./db.js";
export default (() => {
    const levelsContainer = document.querySelector('.levels');
    let firstLevel = 1;
    let lastLevel = 10;
    loadLevels();
    const pagination = document.querySelector('.pagination');
    if (templates.length <= 10) {
      pagination.classList.add('hidden')
    } else {
      pagination.classList.contains('hidden') ? pagination.classList.remove('hidden') : null;
      let firstIndex = 1;
      const arrowLeft = document.createElement('button');
      const arrowRight = document.createElement('button');
      arrowLeft.classList.add('arrow', 'left');
      arrowRight.classList.add('arrow', 'right');
      arrowLeft.innerHTML = '<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M83.8343 41.3589C90.7219 45.1052 90.7219 54.8949 83.8343 58.6411L24.7723 90.7658C18.1285 94.3795 10 89.6247 10 82.1247L10 17.8753C10 10.3753 18.1285 5.6205 24.7723 9.23419L83.8343 41.3589Z" fill="black"/></svg>'
      arrowRight.innerHTML = '<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M83.8343 41.3589C90.7219 45.1052 90.7219 54.8949 83.8343 58.6411L24.7723 90.7658C18.1285 94.3795 10 89.6247 10 82.1247L10 17.8753C10 10.3753 18.1285 5.6205 24.7723 9.23419L83.8343 41.3589Z" fill="black"/></svg>'
      pagination.appendChild(arrowLeft);
      for (let i = 0; i < templates.length/10; i++) {
        const pageButton = document.createElement('button');
        pageButton.dataset.firstIndex = firstIndex;
        firstIndex += 10;
        i == 0 ? pageButton.classList.add('active'): null;
        pageButton.classList.add('page');
        pagination.appendChild(pageButton);
      }
      pagination.appendChild(arrowRight);
    }
    pagination.addEventListener('click', (event) => {
      if (event.target.closest('.arrow.left') && firstLevel > 10) {
        firstLevel -= 10;
        lastLevel = firstLevel + 9;
        pagination.querySelector('.active').classList.remove('active')
        pagination.querySelector(`[data-first-index="${firstLevel}"]`).classList.add('active')
        loadLevels();
      }
      if (event.target.closest('.arrow.right') && lastLevel <= templates.length-1) {
        firstLevel += 10;
        lastLevel = firstLevel + 9;
        pagination.querySelector('.active').classList.remove('active')
        pagination.querySelector(`[data-first-index="${firstLevel}"]`).classList.add('active')
        loadLevels();
      }
      if (event.target.closest('.page') && !event.target.closest('.page.active')) {
        event.target.parentNode.querySelector('.active').classList.remove('active');
        event.target.closest('.page').classList.add('active');
        firstLevel = parseInt(event.target.closest('.page').dataset.firstIndex);
        lastLevel = firstLevel + 9;
        console.log(`desde ${firstLevel} hasta ${lastLevel}`)
        loadLevels();
      }
    })
    function loadLevels() {
      levelsContainer.innerHTML = "";
      for (let i = firstLevel; i < lastLevel+1; i++) {
        if (templates[i]) {
          const level = document.createElement('a');
          const levelHeader = document.createElement('header');
          const levelTitle = document.createElement('h3');
          const levelMain = document.createElement('main');
          const miniature = document.createElement('div');
          level.href = `level.html?level=${i}`;
          level.classList.add('level-box');
          levelTitle.innerHTML = `Level ${i}`
          miniature.classList.add('miniature')
          for (let j = 0; j < templates[i]['template'].length; j++) {
            const square = document.createElement('div')
            square.classList.add('square')
            templates[i]['template'][j] == 1 ? square.classList.add('active'): null;
            miniature.appendChild(square)
          }
          levelHeader.appendChild(levelTitle)
          level.appendChild(levelHeader)
          levelMain.appendChild(miniature)
          level.appendChild(levelMain)
          levelsContainer.appendChild(level);
        }
      };
    }
})();