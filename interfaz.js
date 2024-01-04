document.addEventListener("DOMContentLoaded", function() {
    // Obtén todos los botones
    var buttons = document.querySelectorAll('.playButton');
  
    // Agrega un evento de clic a cada botón
    buttons.forEach(function(button) {
      button.addEventListener('click', function() {
        // Redirige al usuario a index.html
        window.location.href = 'calibration_down.html';
      });
    });
  });
  