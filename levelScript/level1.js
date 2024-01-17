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

document.addEventListener("DOMContentLoaded",()=>{
    game(mapLevel1, 1, 20);
});


let btn2 = document.getElementById('goToLevel2')
btn2.addEventListener('click' ,()=>{
    window.location.href = 'calibration2.html';
})
