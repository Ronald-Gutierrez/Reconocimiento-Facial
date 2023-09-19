CY.loader()
  .licenseKey("4efce2041fb8db76165ffb122b3515a0cb60e8740dfd")
  .addModule(CY.modules().FACE_AGE.name)
  .addModule(CY.modules().FACE_GENDER.name)
  .addModule(CY.modules().FACE_EMOTION.name)
  .load()
  .then(({ start, stop }) => start());

const emocionesEnEspanol = {
  Anger: 'Enojo',
  Disgust: 'Disgusto',
  Fear: 'Miedo',
  Happy: 'Felicidad',
  Neutral: 'Neutro',
  Sad: 'Tristeza',
  Surprise: 'Sorpresa',
  undefined: 'Indefinido',

};
const generosEnEspanol = {
  Male: 'Masculino',
  Female: 'Femenino',
  Other: 'Otro',
  undefined: 'Indefinido',
};

CY.loader()
  .licenseKey("4efce2041fb8db76165ffb122b3515a0cb60e8740dfd")
  .addModule(CY.modules().FACE_AGE.name)
  .addModule(CY.modules().FACE_GENDER.name)
  .addModule(CY.modules().FACE_EMOTION.name)
  .load()
  .then(({ start, stop }) => start());

const age_div = document.querySelector("#age");
const gen_div = document.querySelector("#gender");
const emo_div = document.querySelector("#emotion");

window.addEventListener(CY.modules().FACE_AGE.eventName, (evt) => {
  age_div.textContent = 'Edad: ' + evt.detail.output.numericAge;
});

window.addEventListener(CY.modules().FACE_GENDER.eventName, (evt) => {
  // Obtiene el género en inglés
  const generoEnIngles = evt.detail.output.mostConfident;

  // Traduce el género a español usando el mapeo
  const generoEnEspanol = generosEnEspanol[generoEnIngles];

  gen_div.textContent = 'Género: ' + generoEnEspanol;
});
window.addEventListener(CY.modules().FACE_EMOTION.eventName, (evt) => {

  const emocionEnIngles = evt.detail.output.dominantEmotion;
  const emocionEnEspanol = emocionesEnEspanol[emocionEnIngles];
  emo_div.textContent = 'Emoción: ' + emocionEnEspanol;
});


const initialEmotionData = {
  Enojo: 0,
  Disgusto: 0,
  Miedo: 0,
  Felicidad: 0,
  Neutro: 0,
  Triste: 0,
  Sopresa: 0,
};

const options = {
  chart: {
    type: 'bar',
    height: 350,
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '70%',
      endingShape: 'rounded',
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['black'],
  },
  xaxis: {
    categories: Object.keys(initialEmotionData),
  },

  fill: {
    opacity: 1,
    
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return val + '%';
      },
    },
  },
};


const emotionChart = new ApexCharts(document.querySelector('#emotion-histogram'), {
  ...options,
  series: [{
    name: 'Emociones',
    data: Object.values(initialEmotionData),
  }],
});
emotionChart.render();


window.addEventListener(CY.modules().FACE_EMOTION.eventName, (evt) => {
  const emotions = evt.detail.output.emotion;


  const normalizedEmotions = Object.keys(emotions).reduce((normalized, emotion) => {
    normalized[emotion] = (emotions[emotion] * 100).toFixed(2);
    return normalized;
  }, {});


  emotionChart.updateSeries([{
    data: Object.values(normalizedEmotions),
  }]);
});
const videoElement = document.getElementById('camera');
navigator.mediaDevices.getUserMedia({ video: true })
  .then((stream) => {
    videoElement.srcObject = stream;
  })
  .catch((error) => {
    console.error('Error accessing camera:', error);
  });