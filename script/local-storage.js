import templates from "./db.js";

export default (() => {
  let completedLevels = localStorage.getItem("completedLevels");
  !completedLevels ? completedLevels = Array(templates.length).fill(0) : completedLevels.split(',');
  localStorage.setItem("completedLevels", completedLevels)
  localStorage.setItem("firstLevel", 1);
})();