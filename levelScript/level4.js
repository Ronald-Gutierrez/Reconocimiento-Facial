let level = 4;
let mapLevel4 = [
  ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
  ["X", "P", "X", "M", "", "", "", "", "", "X"],
  ["X", "", "X", "X", "X", "X", "X", "X", "", "X"],
  ["X", "", "X", "X", "X", "X", "X", "X", "", "X"],
  ["X", "", "X", "X", "X", "X", "X", "X", "", "X"],
  ["X", "", "X", "X", "X", "X", "X", "X", "", "X"],
  ["X", "", "X", "X", "X", "X", "X", "X", "", "X"],
  ["X", "", "", "", "", "", "", "", "", "X"],
  ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
];
  
  document.addEventListener("DOMContentLoaded", game(mapLevel4, 4));
  
  let btn1 = document.getElementById('reStartLevel4')
  btn1.addEventListener('click' ,()=>{
    window.location.href = 'level4.html';
  })
  let btn2 = document.getElementById('goToLevel5')
  btn2.addEventListener('click' ,()=>{
    window.location.href = 'level5.html';
  })