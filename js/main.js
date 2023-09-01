document.addEventListener("DOMContentLoaded", function () {
  const cursosCarrito = []
  const cursosConteiner = document.getElementById('cardCursos')
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

  function agregarAlCarrito(curso) {
    cursosCarrito.push(curso)
    actualizarCarrito()
  }

  function quitarDelCarrito(curso) {
    const index = cursosCarrito.indexOf(curso)
    if (index > -1) {
      cursosCarrito.splice(index, 1)
      actualizarCarrito()
    }
  }

  function finalizarCompra() {
    if (cursosCarrito.length > 0) {
      swal("¡Compra Finalizada!", "Gracias por tu compra.", "success")
      cursosCarrito.length = 0
      actualizarCarrito()
    } else {
      swal("Carrito Vacío", "Agrega cursos al carrito antes de finalizar la compra.", "warning")
    }
  }

  fetch("../JSON/cursos.json")
    .then(response => response.json())
    .then(data => {
      data.forEach(curso => {
        const card = document.createElement("div")
        card.className = "card"
        card.style.width = "18rem"

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

  const finalizarButton = document.getElementById("finalizarButton")
  finalizarButton.addEventListener("click", finalizarCompra)
})
