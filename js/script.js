document.addEventListener("DOMContentLoaded", function () {
  const cursosEnCarrito = []
  const carritoList = document.getElementById("carrito")
  const totalSpan = document.getElementById("total")

  function actualizarCarrito() {
    carritoList.innerHTML = ""
    let total = 0
    cursosEnCarrito.forEach((curso) => {
      const listItem = document.createElement("li")
      listItem.textContent = `${curso.title} - $${curso.price}`

      const removeButton = document.createElement("button")
      removeButton.textContent = "Quitar"
      removeButton.addEventListener("click", () => {
        quitarDelCarrito(curso)
      })

      listItem.appendChild(removeButton)
      carritoList.appendChild(listItem)
      total += curso.price
    })
    totalSpan.textContent = total
  }

  function agregarAlCarrito(curso) {
    cursosEnCarrito.push(curso)
    actualizarCarrito()
  }

  function quitarDelCarrito(curso) {
    const index = cursosEnCarrito.indexOf(curso)
    if (index > -1) {
      cursosEnCarrito.splice(index, 1)
      actualizarCarrito()
    }
  }

  function finalizarCompra() {
    if (cursosEnCarrito.length > 0) {
      swal("¡Compra Finalizada!", "Gracias por tu compra.", "success")
      cursosEnCarrito.length = 0
      actualizarCarrito()
    } else {
      swal("Carrito Vacío", "Agrega cursos al carrito antes de finalizar la compra.", "warning")
    }
  }

  // Cargar cursos desde el JSON utilizando fetch
  fetch("../JSON/courses.json")
    .then(response => response.json())
    .then(data => {
      data.forEach(curso => {
        const card = document.createElement("div")
        card.className = "card"
        card.style.width = "18rem"

        const image = document.createElement("img")
        image.src = curso.image;
        image.className = "card-img-top"
        image.alt = curso.title
        card.appendChild(image)

        const cardBody = document.createElement("div")
        cardBody.className = "card-body"

        const cardTitle = document.createElement("h5")
        cardTitle.className = "card-title"
        cardTitle.textContent = curso.title
        cardBody.appendChild(cardTitle)

        const cardText = document.createElement("p")
        cardText.className = "card-text"
        cardText.textContent = `$${curso.price}`
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
        document.body.appendChild(card) // Agregar al cuerpo del documento
      })
    })
    .catch(error => {
      console.error("Error al cargar los cursos:", error)
    })

  const finalizarButton = document.getElementById("finalizarButton")
  finalizarButton.addEventListener("click", finalizarCompra)
})
