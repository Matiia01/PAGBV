document.addEventListener("DOMContentLoaded", function () {
  let cursosCarrito = []
  const carritoList = document.getElementById("carrito")
  const totalSpan = document.getElementById("total")

  //FUNCION PARA ACTUALIZAR EL CARRITO EN LA PAGINA
  function actualizarCarrito() {
    carritoList.innerHTML = ""
    let total = 0
    cursosCarrito.forEach((curso) => {
      const listItem = document.createElement("li")
      listItem.textContent = `${curso.titulo} - $${curso.precio}`

      const quitCurso = document.createElement("button")
      quitCurso.textContent = "Quitar"
      quitCurso.addEventListener("click", () => {
        quitarDelCarrito(curso)
      })

      listItem.appendChild(quitCurso)
      carritoList.appendChild(listItem)
      total += curso.precio
    })
    totalSpan.textContent = total
  }

  //FUNCION PARA AGREGAR CURSOS AL CARRITO
  function agregarAlCarrito(curso) {
    cursosCarrito.push(curso)
    actualizarCarrito()
  }

  //FUNCION PARA QUITAR CURSOS DEL CARRITO
  function quitarDelCarrito(curso) {
    const index = cursosCarrito.indexOf(curso)
    if (index > -1) {
      cursosCarrito.splice(index, 1)
      actualizarCarrito()
    }
  }

  //FUNCION PARA FINALIZAR LA COMPRA
  function finalizarCompra() {
    if (cursosCarrito.length > 0) {
      swal("¡Compra Finalizada!", "Gracias por tu compra.", "success")
      cursosCarrito.length = 0
      actualizarCarrito()
      guardarCarritoEnLocalStorage()
    } else {
      swal("Carrito Vacío", "Agrega cursos al carrito antes de finalizar la compra.", "warning")
    }
  }

  //FUNCION PARA GUARDAR EL CARRITO EN LOCALSTORAGE
  function guardarCarritoEnLocalStorage() {
    if (cursosCarrito.length > 0) {
      const carritoJSON = JSON.stringify(cursosCarrito)
      localStorage.setItem("carrito", carritoJSON)
    } else {
      localStorage.removeItem("carrito")
    }
  }

  //FUNCION PARA CARGAR EL CARRITO DESDE LOCALSTORAGE
  function cargarCarritoDesdeLocalStorage() {
    const carritoJSON = localStorage.getItem("carrito")
    if (carritoJSON) {
      cursosCarrito = JSON.parse(carritoJSON) || []
      actualizarCarrito()
    }
  }

  //CARGA DE CURSOS DESDE EL JSON UTILIZANDO FETCH
  fetch("../JSON/cursos.json")
    .then(response => response.json())
    .then(data => {
      data.forEach(curso => {
        const card = document.createElement("div")
        card.className = "card"
        card.style.width = "15rem"

        const image = document.createElement("img")
        image.src = curso.imagen;
        image.className = "card-img-top"
        image.alt = curso.titulo
        card.appendChild(image)

        const cardBody = document.createElement("div")
        cardBody.className = "card-body"

        const cardTitle = document.createElement("h5")
        cardTitle.className = "card-title"
        cardTitle.textContent = curso.titulo
        cardBody.appendChild(cardTitle)

        const cardText = document.createElement("p")
        cardText.className = "card-text"
        cardText.textContent = `$${curso.precio}`
        cardBody.appendChild(cardText)

        const agregarButton = document.createElement("button")
        agregarButton.className = "btn btn-primary"
        agregarButton.textContent = "Agregar al Carrito"
        agregarButton.addEventListener("click", () => {
          agregarAlCarrito(curso)
          swal("¡Curso Agregado!", "El curso ha sido añadido al carrito.", "success")
        })
        cardBody.appendChild(agregarButton)

        card.appendChild(cardBody)
        cardCursos.appendChild(card)
      })
    })
    .catch(error => {
      console.error("Error al cargar los cursos:", error)
    })

    //EVENTO PARA EL BOTON FINALIZAR COMPRA
  const finalizarButton = document.getElementById("finalizarButton")
  finalizarButton.addEventListener("click", finalizarCompra)
})
