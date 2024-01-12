
document.addEventListener('DOMContentLoaded', function() {
    // Obtener elementos del DOM
    const headText = document.getElementById('head-text')
    let con = 0;
    setInterval(()=>{
        if(con === 0){
            headText.innerText = "Acerca tu rostro a las guias blancas";
            con += 1;
        }else if(con === 1){
            headText.innerText = "Debes 😠 fruncir el ceño del enojo";
            con += 1;
        }else if(con === 2){
            headText.innerText = "Enojate 😠 y baja la mirada";
            con += 1;
        }else{
            headText.innerText = "Enójate 😡 por 3 segundos para empezar el juego ";
            con = 0;
        }
    }, 4000)
});


const video = document.getElementById('video')
let contador = 0
Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(startVideo)

function startVideo() {
    navigator.getUserMedia(
        { video: {} },
        stream => video.srcObject = stream,
        err => console.error(err)
    )
}

video.addEventListener('play', () => {
    const canvas = faceapi.createCanvasFromMedia(video);
    const canvas2 = document.createElement('canvas');
    canvas2.width = video.width; 
    canvas2.height = video.height;
    document.getElementById('video-container').append(canvas);
    const displaySize = { width: video.width, height: video.height };
    const counter = document.getElementById('counter');
    faceapi.matchDimensions(canvas, displaySize);

    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
        
        // Dibujamos el punto rojo en el centro del lienzo
        drawPointAngry(canvas2);
        video.parentNode.insertBefore(canvas2, video);

        let generalEmotion = detections[0]?.expressions;

        if (generalEmotion) {
            const [maxEmotion, maxScore] = Object.entries(generalEmotion)
                .reduce((acc, [emotion, score]) => (score > acc[1] ? [emotion, score] : acc), ['', -1]);

            if (maxEmotion === "angry") {
                contador += 1
                counter.innerText = (contador/10).toFixed(0);
                if(contador === 20){
                    contador = 0;
                    window.location.href = 'level4.html';
                }
            }
            // else{
            //     contador = 0;
            //     counter.innerText = contador;
            // }
        }

    }, 100);
})

function drawPointHappy(canvas) {
    const ctx = canvas.getContext('2d');
    // Limpiamos el lienzo antes de dibujar
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'red';
    ctx.fillStyle = "white";
    // Dibujamos el punto
    //ojos
    //ojo derecho
    ctx.beginPath();
    ctx.arc(335 + 88, 290 + 10, 3, 0, 2 * Math.PI);
    ctx.arc(350 + 88, 290 + 10, 3, 0, 2 * Math.PI);
    ctx.arc(360 + 88, 298 + 10, 3, 0, 2 * Math.PI);
    ctx.arc(350 + 88, 305 + 10, 3, 0, 2 * Math.PI);
    ctx.arc(340 + 88, 305 + 10, 3, 0, 2 * Math.PI);
    ctx.arc(330 + 88, 298 + 10, 3, 0, 2 * Math.PI);
    ctx.arc(335 + 88, 290 + 10, 3, 0, 2 * Math.PI);
    ctx.fill()
    ctx.stroke();
    ctx.closePath();
    //ojo izquierdo
    ctx.beginPath();
    ctx.arc(335, 290 + 10, 3, 0, 2 * Math.PI);
    ctx.arc(350, 290 + 10, 3, 0, 2 * Math.PI);
    ctx.arc(360, 298 + 10, 3, 0, 2 * Math.PI);
    ctx.arc(350, 305 + 10, 3, 0, 2 * Math.PI);
    ctx.arc(340, 305 + 10, 3, 0, 2 * Math.PI);
    ctx.arc(330, 298 + 10, 3, 0, 2 * Math.PI);
    ctx.arc(335, 290 + 10, 3, 0, 2 * Math.PI);
    ctx.fill()
    ctx.stroke();
    ctx.closePath();
    //sonrisa
    ctx.beginPath();
    ctx.arc(350, 405, 3, 0, 2 * Math.PI);
    ctx.arc(370, 400, 3, 0, 2 * Math.PI);
    ctx.arc(390, 400, 3, 0, 2 * Math.PI);
    ctx.arc(410, 400, 3, 0, 2 * Math.PI);
    ctx.arc(430, 405, 3, 0, 2 * Math.PI);
    ctx.arc(420, 420, 3, 0, 2 * Math.PI);
    ctx.arc(410, 430, 3, 0, 2 * Math.PI);
    ctx.arc(390, 440, 3, 0, 2 * Math.PI);
    ctx.arc(370, 430, 3, 0, 2 * Math.PI);
    ctx.arc(360, 420, 3, 0, 2 * Math.PI);
    ctx.arc(350, 405, 3, 0, 2 * Math.PI);
    ctx.fill()
    ctx.stroke();
}

function drawPointSad(canvas) {
    const ctx = canvas.getContext('2d');
    // Limpiamos el lienzo antes de dibujar
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'red';
    ctx.fillStyle = "white";
    // Dibujamos el punto
    //ojos
    //ojo derecho
    ctx.beginPath();
    ctx.arc(340 + 88, 290, 3, 0, 2 * Math.PI);
    ctx.arc(350 + 88, 290, 3, 0, 2 * Math.PI);
    ctx.arc(360 + 88, 295, 3, 0, 2 * Math.PI);
    ctx.arc(350 + 88, 300, 3, 0, 2 * Math.PI);
    ctx.arc(340 + 88, 300, 3, 0, 2 * Math.PI);
    ctx.arc(330 + 88, 295, 3, 0, 2 * Math.PI);
    ctx.arc(340 + 88, 290, 3, 0, 2 * Math.PI);
    ctx.fill()
    ctx.stroke();
    ctx.closePath();
    //ojo izquierdo
    ctx.beginPath();
    ctx.arc(340, 290, 3, 0, 2 * Math.PI);
    ctx.arc(350, 290, 3, 0, 2 * Math.PI);
    ctx.arc(360, 295, 3, 0, 2 * Math.PI);
    ctx.arc(350, 300, 3, 0, 2 * Math.PI);
    ctx.arc(340, 300, 3, 0, 2 * Math.PI);
    ctx.arc(330, 295, 3, 0, 2 * Math.PI);
    ctx.arc(340, 290, 3, 0, 2 * Math.PI);
    ctx.fill()
    ctx.stroke();
    ctx.closePath();
    //sonrisa
    ctx.beginPath();
    ctx.arc(355, 410, 3, 0, 2 * Math.PI);
    ctx.arc(370, 400, 3, 0, 2 * Math.PI);
    ctx.arc(390, 400, 3, 0, 2 * Math.PI);
    ctx.arc(410, 400, 3, 0, 2 * Math.PI);
    ctx.arc(425, 410, 3, 0, 2 * Math.PI);
    ctx.arc(420, 420, 3, 0, 2 * Math.PI);
    ctx.arc(410, 425, 3, 0, 2 * Math.PI);
    ctx.arc(390, 425, 3, 0, 2 * Math.PI);
    ctx.arc(370, 425, 3, 0, 2 * Math.PI);
    ctx.arc(360, 420, 3, 0, 2 * Math.PI);
    ctx.arc(355, 410, 3, 0, 2 * Math.PI);
    ctx.fill()
    ctx.stroke();
    ctx.closePath();
}

function drawPointSurprised(canvas) {
    const ctx = canvas.getContext('2d');
    // Limpiamos el lienzo antes de dibujar
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'red';
    ctx.fillStyle = "white";
    // Dibujamos el punto
    //ojos
    //ojo derecho
    ctx.beginPath();
    ctx.arc(335 + 88, 290 + 10, 3, 0, 2 * Math.PI);
    ctx.arc(350 + 88, 290 + 10, 3, 0, 2 * Math.PI);
    ctx.arc(360 + 88, 298 + 10, 3, 0, 2 * Math.PI);
    ctx.arc(350 + 88, 305 + 10, 3, 0, 2 * Math.PI);
    ctx.arc(340 + 88, 305 + 10, 3, 0, 2 * Math.PI);
    ctx.arc(330 + 88, 298 + 10, 3, 0, 2 * Math.PI);
    ctx.arc(335 + 88, 290 + 10, 3, 0, 2 * Math.PI);
    ctx.fill()
    ctx.stroke();
    ctx.closePath();
    //ojo izquierdo
    ctx.beginPath();
    ctx.arc(335, 290 + 10, 3, 0, 2 * Math.PI);
    ctx.arc(350, 290 + 10, 3, 0, 2 * Math.PI);
    ctx.arc(360, 298 + 10, 3, 0, 2 * Math.PI);
    ctx.arc(350, 305 + 10, 3, 0, 2 * Math.PI);
    ctx.arc(340, 305 + 10, 3, 0, 2 * Math.PI);
    ctx.arc(330, 298 + 10, 3, 0, 2 * Math.PI);
    ctx.arc(335, 290 + 10, 3, 0, 2 * Math.PI);
    ctx.fill()
    ctx.stroke();
    ctx.closePath();
    //boca
    ctx.beginPath();
    ctx.arc(360, 425, 3, 0, 2 * Math.PI);
    ctx.arc(367, 412, 3, 0, 2 * Math.PI);
    ctx.arc(390, 400, 3, 0, 2 * Math.PI);
    ctx.arc(413, 412, 3, 0, 2 * Math.PI);
    ctx.arc(420, 425, 3, 0, 2 * Math.PI);
    ctx.arc(420, 440, 3, 0, 2 * Math.PI);
    ctx.arc(410, 450, 3, 0, 2 * Math.PI);
    ctx.arc(390, 460, 3, 0, 2 * Math.PI);
    ctx.arc(370, 450, 3, 0, 2 * Math.PI);
    ctx.arc(360, 440, 3, 0, 2 * Math.PI);
    ctx.arc(360, 425, 3, 0, 2 * Math.PI);
    ctx.fill()
    ctx.stroke();
}

function drawPointAngry(canvas) {
    const ctx = canvas.getContext('2d');
    // Limpiamos el lienzo antes de dibujar
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'red';
    ctx.fillStyle = "white";
    // Dibujamos el punto
    //ojos
    //ojo derecho
    ctx.beginPath();
    ctx.arc(335 + 88, 290 + 10, 3, 0, 2 * Math.PI);
    ctx.arc(350 + 88, 290 + 10, 3, 0, 2 * Math.PI);
    ctx.arc(360 + 88, 298 + 10, 3, 0, 2 * Math.PI);
    ctx.arc(350 + 88, 305 + 10, 3, 0, 2 * Math.PI);
    ctx.arc(340 + 88, 305 + 10, 3, 0, 2 * Math.PI);
    ctx.arc(330 + 88, 298 + 10, 3, 0, 2 * Math.PI);
    ctx.arc(335 + 88, 290 + 10, 3, 0, 2 * Math.PI);
    ctx.fill()
    ctx.stroke();
    ctx.closePath();
    //ojo izquierdo
    ctx.beginPath();
    ctx.arc(335, 290 + 10, 3, 0, 2 * Math.PI);
    ctx.arc(350, 290 + 10, 3, 0, 2 * Math.PI);
    ctx.arc(360, 298 + 10, 3, 0, 2 * Math.PI);
    ctx.arc(350, 305 + 10, 3, 0, 2 * Math.PI);
    ctx.arc(340, 305 + 10, 3, 0, 2 * Math.PI);
    ctx.arc(330, 298 + 10, 3, 0, 2 * Math.PI);
    ctx.arc(335, 290 + 10, 3, 0, 2 * Math.PI);
    ctx.fill()
    ctx.stroke();
    ctx.closePath();
    //sonrisa
    ctx.beginPath();
    ctx.arc(355, 410, 3, 0, 2 * Math.PI);
    ctx.arc(370, 400, 3, 0, 2 * Math.PI);
    ctx.arc(390, 400, 3, 0, 2 * Math.PI);
    ctx.arc(410, 400, 3, 0, 2 * Math.PI);
    ctx.arc(425, 410, 3, 0, 2 * Math.PI);
    ctx.arc(420, 420, 3, 0, 2 * Math.PI);
    ctx.arc(410, 425, 3, 0, 2 * Math.PI);
    ctx.arc(390, 425, 3, 0, 2 * Math.PI);
    ctx.arc(370, 425, 3, 0, 2 * Math.PI);
    ctx.arc(360, 420, 3, 0, 2 * Math.PI);
    ctx.arc(355, 410, 3, 0, 2 * Math.PI);
    ctx.fill()
    ctx.stroke();
    ctx.closePath();
    //ceño como el medio de las cejas
    ctx.beginPath();
    ctx.arc(385, 260, 3, 0, 2 * Math.PI);
    ctx.arc(385, 270, 3, 0, 2 * Math.PI);
    ctx.arc(385, 280, 3, 0, 2 * Math.PI);
    ctx.arc(375, 277, 3, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(405, 260, 3, 0, 2 * Math.PI);
    ctx.arc(405, 270, 3, 0, 2 * Math.PI);
    ctx.arc(405, 280, 3, 0, 2 * Math.PI);
    ctx.arc(415, 277, 3, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();
}