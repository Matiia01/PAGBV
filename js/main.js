//CURSOS DISPONIBLES EN ARRAYS DE OBJETOS
const cursosDisponibles = [
  { id: 1, nombre: "RCP-DEA", precio: 1500 },
  { id: 2, nombre: "Primeros Auxilios", precio: 2500 },
  { id: 3, nombre: "Maniobras de Hemblich", precio: 1000 },
  { id: 4, nombre: "Incendios de Cocina", precio: 2000 },
  { id: 5, nombre: "Monoxido de Carbono", precio: 2000 },
]

const carrito = []
let total = 0


//FUNCION PARA CARGAR EL NOMBRE DEL COMPRADOR
function cargarNombre() {
  let nombreInput = document.createElement("input")
  nombreInput.placeholder = "Ingresa tu nombre"

  let guardarBoton = document.createElement("button")
  guardarBoton.textContent = "Guardar Carrito"
  guardarBoton.onclick = function () {
    let nombre = nombreInput.value
    localStorage.setItem(nombre, JSON.stringify(carrito))
  }

  document.body.appendChild(nombreInput)
  document.body.appendChild(guardarBoton)
}


//FUNCION PARA AGREGAR CURSOS AL CARRITO
function agregarCursoAlCarrito(cursoId) {
  const cursoEncontrado = cursosDisponibles.find(curso => curso.id === cursoId)
  if (cursoEncontrado) {
    carrito.push(cursoEncontrado)
    total += cursoEncontrado.precio
    actualizarCarrito()
  }
}

//FUNCION PARA QUITAR UN CURSO DEL CARRITO
function quitarDelCarrito(id) {
  const index = carrito.findIndex(curso => curso.id === id)

  if (index !== -1) {
    total -= carrito[index].precio
    carrito.splice(index, 1)
    actualizarCarrito()
  }
}

//FUNCION QUE ACUALIZA EL CARRITO
function actualizarCarrito() {
  const carritoElement = document.getElementById("carrito")
  carritoElement.innerHTML = ""
  carrito.forEach(curso => {
    const li = document.createElement("li")
    li.textContent = `ID: ${curso.id} - Curso: ${curso.nombre} - Precio: $${curso.precio}.`
    
    const botonQuitar = document.createElement("button")
    botonQuitar.textContent = 'Quitar del Carrito'
    botonQuitar.addEventListener('click', () => quitarDelCarrito(curso.id))

    li.appendChild(botonQuitar)
    carritoElement.appendChild(li)
  })
  const totalElement = document.getElementById("total");
  totalElement.textContent = total
}

//FUNCION PRINCIPAL
function main() {
  cargarNombre()
  const cursosDisponiblesElement = document.getElementById("cursosDisponibles")
  cursosDisponibles.forEach(curso => {
    const li = document.createElement("li")
    li.textContent = `ID: ${curso.id} - Curso: ${curso.nombre} - Precio: $${curso.precio}.`
    const botonAgregar = document.createElement("button")
    botonAgregar.textContent = "Agregar al carrito"
    botonAgregar.addEventListener("click", () => agregarCursoAlCarrito(curso.id))
    li.appendChild(botonAgregar)
    cursosDisponiblesElement.appendChild(li)
  })
}


//EJECUCION FUNCION PRINCIPAL
main();