import * as tf from '@tensorflow/tfjs';
const subirImagen = document.querySelector('#subirImagen');
const previsualizarImagen = document.querySelector('#previsualizarImagen');
const convertirImagenTensor = document.querySelector('#convertirImagenTensor');
const contenerdorImagenInversa = document.querySelector(
  '#contenerdorImagenInversa'
);
const memoriaUsada = document.querySelector('#memoriaUsada');

// previsualizar la imagen
document.addEventListener('DOMContentLoaded', function () {
  subirImagen.addEventListener('change', async function (e) {
    // obtengo el archivo
    const imagenSubida = e.target.files[0];

    // verifico que este creado el elemento img sino lo creo
    const img = document.getElementById('imagen')
      ? document.getElementById('imagen')
      : document.createElement('img');

    // le aplico sus atributos y agrego la url de la imagen
    img.setAttribute('crossorigin', 'anonymous');
    img.setAttribute('id', 'imagen');
    img.width = 300;
    img.height = 300;
    img.src = URL.createObjectURL(imagenSubida);

    // agrego la imagen al contenedor
    previsualizarImagen.appendChild(img);
    // habilito el boton
    convertirImagenTensor.disabled = false;
    // limpio el contenedor de los datos de tensores
    memoriaUsada.innerHTML = '';
  });
});
convertirImagenTensor.addEventListener('click', async function () {
  // convierto la imagen a tensor

  const imagenPixeles = tf.browser.fromPixels(
    document.getElementById('imagen'),
    3
  );
  // doy vuelta la imagen
  const imagenInversa = imagenPixeles.reverse(1);

  // muestro la imagen en el contenedor
  tf.browser.toPixels(imagenInversa, contenerdorImagenInversa);

  // obtengo la memoria usada y la cantidad de tensores
  memoriaUsada.innerHTML += `
  <p class="text-danger">
    Memoria usada antes de aplicar dispose: ${
      tf.memory().numBytes
    } bytes, numero de tensores en memoria: ${tf.memory().numTensors}
  </p>
  `;

  // aplico dispose
  imagenPixeles.dispose();
  imagenInversa.dispose();

  // obtengo la memoria usada y la cantidad de tensores nuevamente
  memoriaUsada.innerHTML += `
  <p class="text-success">
  Memoria usada despues de aplicar dispose: ${
    tf.memory().numBytes
  } bytes, numero de tensores en memoria: ${tf.memory().numTensors}......
  </p>
    `;
});
