
let mapLevel5 = [
  ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
  ["X", "P", "", "", "X", "", "", "", "", "X"],
  ["X", "", "X", "", "", "", "X", "X", "", "X"],
  ["X", "", "", "", "X", "", "", "X", "", "X"],
  ["X", "", "", "", "", "X", "", "", "", "X"],
  ["X", "X", "X", "", "", "", "", "X", "", "X"],
  ["X", "", "", "", "X", "", "", "", "", "X"],
  ["X", "", "", "", "", "", "X", "", "M", "X"],
  ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
];
  
  document.addEventListener("DOMContentLoaded", game(mapLevel5));
  
  let btn1 = document.getElementById('reStartLevel5')
  btn1.addEventListener('click' ,()=>{
    window.location.href = 'level5.html';
  })
  let btn2 = document.getElementById('goToLevel6')
  btn2.addEventListener('click' ,()=>{
    window.location.href = '../game.html';
  })