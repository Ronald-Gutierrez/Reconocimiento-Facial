
let mapLevel2 = [
  ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
  ["X", "", "X", "X", "X", "X", "X", "X", "X", "X"],
  ["X", "", "X", "X", "X", "X", "X", "X", "X", "X"],
  ["X", "", "X", "X", "X", "X", "X", "X", "X", "X"],
  ["X", "", "X", "X", "X", "X", "X", "X", "X", "X"],
  ["X", "", "X", "X", "X", "X", "X", "X", "X", "X"],
  ["X", "", "X", "X", "X", "X", "X", "X", "X", "X"],
  ["X", "", "", "", "", "", "", "", "M", "X"],
  ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
];

document.addEventListener("DOMContentLoaded", game(mapLevel2));

let btn1 = document.getElementById('reStartLevel2')
btn1.addEventListener('click' ,()=>{
  window.location.href = 'level2.html';
})
let btn2 = document.getElementById('goToLevel3')
btn2.addEventListener('click' ,()=>{
  console.log("Entre hice click")
  window.location.href = 'level3.html';
})