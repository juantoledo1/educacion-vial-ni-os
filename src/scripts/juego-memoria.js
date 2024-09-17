document.addEventListener('DOMContentLoaded', () => {
  const juegoMemoria = document.getElementById('juego-memoria');
  const iniciarJuegoBtn = document.getElementById('iniciar-juego');
  const toastContainer = document.getElementById('toast-container');

  const senales = [
    { id: 1, imagen: '/images/senales/senal1.png' },
    { id: 2, imagen: '/images/senales/senal2.png' },
    { id: 3, imagen: '/images/senales/senal3.png' },
    { id: 4, imagen: '/images/senales/senal4.png' },
  ];

  let intentos = 0;
  let puntuacion = 100;

  function mostrarToast(mensaje, tipo = 'success') {
    const toast = document.createElement('div');
    toast.classList.add('toast', 'fade', 'show', `bg-${tipo}`);
    toast.innerHTML = `
      <div class="toast-body">
        ${mensaje}
      </div>
    `;
    toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }

  function crearTablero() {
    intentos = 0;
    puntuacion = 100;
    mostrarToast('¡Empieza el juego!', 'primary');

    const paresDeCartas = [...senales, ...senales];
    paresDeCartas.sort(() => Math.random() - 0.5);

    juegoMemoria.innerHTML = '';
    paresDeCartas.forEach((senal, index) => {
      const carta = document.createElement('div');
      carta.classList.add('carta', 'bg-light', 'border', 'm-1', 'p-2');
      carta.dataset.id = senal.id;
      carta.innerHTML = `
        <img src="${senal.imagen}" alt="Señal de tránsito" class="img-fluid d-none">
        <div class="carta-reverso">?</div>
      `;
      carta.addEventListener('click', voltearCarta);
      juegoMemoria.appendChild(carta);
    });
  }

  let cartasVolteadas = [];
  let paresEncontrados = 0;

  function voltearCarta() {
    if (cartasVolteadas.length < 2 && !this.classList.contains('encontrada')) {
      this.querySelector('img').classList.remove('d-none');
      this.querySelector('.carta-reverso').classList.add('d-none');
      cartasVolteadas.push(this);

      if (cartasVolteadas.length === 2) {
        setTimeout(verificarPareja, 1000);
        intentos++;
      }
    }
  }

  function verificarPareja() {
    const [carta1, carta2] = cartasVolteadas;
    if (carta1.dataset.id === carta2.dataset.id) {
      carta1.classList.add('encontrada');
      carta2.classList.add('encontrada');
      paresEncontrados++;
      mostrarToast('¡Pareja encontrada!', 'success');

      if (paresEncontrados === senales.length) {
        puntuacion -= intentos;
        mostrarToast(`¡Felicidades! Puntaje final: ${puntuacion}`, 'info');
      }
    } else {
      carta1.querySelector('img').classList.add('d-none');
      carta1.querySelector('.carta-reverso').classList.remove('d-none');
      carta2.querySelector('img').classList.add('d-none');
      carta2.querySelector('.carta-reverso').classList.remove('d-none');
      mostrarToast('Intenta de nuevo', 'danger');
    }
    cartasVolteadas = [];
  }

  iniciarJuegoBtn.addEventListener('click', crearTablero);
});
