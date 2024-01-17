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
  
  document.addEventListener("DOMContentLoaded", game(mapLevel3, 3, 30));
  
  let btn2 = document.getElementById('goToLevel4')
  btn2.addEventListener('click' ,()=>{
    window.location.href = 'calibration4.html';
  })