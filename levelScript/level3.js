let level = 3;
let mapLevel3 = [
  ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
  ["X", "P", "X", "X", "X", "X", "X", "X", "M", "X"],
  ["X", "", "X", "X", "X", "X", "X", "X", "", "X"],
  ["X", "", "X", "X", "X", "X", "X", "X", "", "X"],
  ["X", "", "X", "X", "X", "X", "X", "X", "", "X"],
  ["X", "", "X", "X", "X", "X", "X", "X", "", "X"],
  ["X", "", "X", "X", "X", "X", "X", "X", "", "X"],
  ["X", "", "", "", "", "", "", "", "", "X"],
  ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
];
  
  document.addEventListener("DOMContentLoaded", game(mapLevel3, 3));
  
  let btn1 = document.getElementById('reStartLevel3')
  btn1.addEventListener('click' ,()=>{
    window.location.href = 'level3.html';
  })
  let btn2 = document.getElementById('goToLevel4')
  btn2.addEventListener('click' ,()=>{
    console.log("Entre hice click")
    window.location.href = 'calibration4.html';
  })