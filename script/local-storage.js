import templates from "./db.js";

export default (() => {
  let completedLevels = localStorage.getItem("completedLevels").split(',');
  !completedLevels ? completedLevels = Array(templates.length).fill(0) : null;
  localStorage.setItem("completedLevels", completedLevels)
  localStorage.setItem("firstLevel", 1);
})();