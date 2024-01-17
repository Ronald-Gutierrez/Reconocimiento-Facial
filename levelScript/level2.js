let level = 2;
let mapLevel2 = [
  ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
  ["X", "P", "X", "X", "X", "X", "X", "X", "X", "X"],
  ["X", "", "X", "X", "X", "X", "X", "X", "X", "X"],
  ["X", "", "X", "X", "X", "X", "X", "X", "X", "X"],
  ["X", "", "X", "X", "X", "X", "X", "X", "X", "X"],
  ["X", "", "X", "X", "X", "X", "X", "X", "X", "X"],
  ["X", "", "X", "X", "X", "X", "X", "X", "X", "X"],
  ["X", "", "", "", "", "", "", "", "M", "X"],
  ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
];

document.addEventListener("DOMContentLoaded", game(mapLevel2, 2, 25));

let btn2 = document.getElementById('goToLevel3')
btn2.addEventListener('click' ,()=>{
  window.location.href = 'calibration3.html';
})