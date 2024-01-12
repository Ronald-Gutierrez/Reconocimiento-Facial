let level = 1;
let mapLevel1 = [
    ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
    ["X", "P", "X", "X", "X", "X", "X", "X", "X", "X"],
    ["X", "", "X", "X", "X", "X", "X", "X", "X", "X"],
    ["X", "", "X", "X", "X", "X", "X", "X", "X", "X"],
    ["X", "", "X", "X", "X", "X", "X", "X", "X", "X"],
    ["X", "", "X", "X", "X", "X", "X", "X", "X", "X"],
    ["X", "", "X", "X", "X", "X", "X", "X", "X", "X"],
    ["X", "", "X", "X", "X", "X", "X", "X", "X", "X"],
    ["X", "M", "X", "X", "X", "X", "X", "X", "X", "X"],
  ];

document.addEventListener("DOMContentLoaded", game(mapLevel1, 1));

let btn1 = document.getElementById('reStartLevel1')
btn1.addEventListener('click' ,()=>{
    window.location.href = 'level1.html';
})
let btn2 = document.getElementById('goToLevel2')
btn2.addEventListener('click' ,()=>{
    console.log("Entre hice click")
    window.location.href = 'calibration2.html';
})
