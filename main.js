class Producto {
  constructor(fruta, precio, calidad) {
    this.fruta = fruta;
    this.precio = precio;
    this.calidad = calidad;
  }
}

let frutas = [
  new Producto("Manzana", 2500, "Excelente"),
  new Producto("Frutilla", 2000, "Buena"),
  new Producto("Pera", 500, "Regular"),
];


const formFruta = document.getElementById('form-fruta');
const inputFruta = document.getElementById('fruta');
const inputPrecio = document.getElementById('precio');
const inputCalidad = document.getElementById('calidad');
const inputBuscar = document.getElementById('input-buscar');
const contenedorFrutas = document.getElementById('contenedor-frutas');
const feedback = document.getElementById('feedback');

const lblTotalVariedades = document.getElementById('total-variedades');
const lblValorTotal = document.getElementById('valor-total');


function mostrarFeedback(mensaje, esError = false) {
  feedback.textContent = mensaje;
  feedback.classList.remove('hidden', 'error');
  
  if (esError) {
    feedback.classList.add('error');
  }

  setTimeout(() => {
    feedback.classList.add('hidden');
  }, 3000);
}


function renderizarFrutas(listaAMostrar) {
  contenedorFrutas.innerHTML = '';

  if (listaAMostrar.length === 0) {
    contenedorFrutas.innerHTML = `<p style="text-align:center; color:#64748b;">No se encontraron frutas.</p>`;
    actualizarResumenGlobal();
    return;
  }

  listaAMostrar.forEach((item) => {
    const card = document.createElement('div');
    card.classList.add('card-fruta');
    
    card.innerHTML = `
      <div class="fruta-detalle">
        <h3>${item.fruta} </h3>
        <p>Calidad: ${item.calidad}</p>
        <p>Precio: $${item.precio}</p>
      </div>
      <button class="btn-vender" data-fruta="${item.fruta}">Vendido</button>
    `;

    contenedorFrutas.appendChild(card);
  });

  const botonesVender = document.querySelectorAll('.btn-vender');
  botonesVender.forEach(boton => {
    boton.addEventListener('click', (e) => {
      const nombreFruta = e.target.getAttribute('data-fruta');
      ejecutarVenta(nombreFruta);
    });
  });

  actualizarResumenGlobal();
}

function actualizarResumenGlobal() {
  lblTotalVariedades.textContent = frutas.length;

  const totalCalculado = frutas.reduce((acc, p) => acc + p.precio, 0);
  lblValorTotal.textContent = `$${totalCalculado.toLocaleString('es-CL')}`;
}

function ejecutarVenta(nombreFruta) {
  const productoEncontrado = frutas.find(p => p.fruta.toLowerCase() === nombreFruta.toLowerCase());

  if (productoEncontrado) {
    frutas = frutas.filter(p => p.fruta.toLowerCase() !== nombreFruta.toLowerCase());
    
    renderizarFrutas(frutas);
    mostrarFeedback(`"${productoEncontrado.fruta}" fue removida del catálogo.`);
  }
}

formFruta.addEventListener('submit', (e) => {
  e.preventDefault();

  const nuevaFruta = inputFruta.value.trim();
  const nuevoPrecio = Number(inputPrecio.value);
  const nuevaCalidad = inputCalidad.value;

  if (nuevoPrecio <= 0) {
    mostrarFeedback('Por favor ingresa un precio válido.', true);
    return;
  }

  const nuevaInstancia = new Producto(nuevaFruta, nuevoPrecio, nuevaCalidad);
  
  frutas.push(nuevaInstancia);
  formFruta.reset(); 
  
  renderizarFrutas(frutas); 
  mostrarFeedback(`"${nuevaFruta}" añadida al inventario.`);
});

inputBuscar.addEventListener('keyup', (e) => {
  const termino = e.target.value.toLowerCase().trim();
  const frutasFiltradas = frutas.filter(p => p.fruta.toLowerCase().includes(termino));
  
  renderizarFrutas(frutasFiltradas);
});

document.addEventListener('DOMContentLoaded', () => {
  renderizarFrutas(frutas);
});