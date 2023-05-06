// Hace una petición al archivo header.html
fetch("../views/footer.html")
  .then(response => {
    // Verifica si la respuesta de la petición es exitosa
    if (response.ok) {
      return response.text();
    }
    throw new Error("No se pudo cargar el footer");
  })
  .then(data => {
    // Inserta el contenido del encabezado en el elemento con id "header"
    document.getElementById("footer").innerHTML = data;
  })
  .catch(error => {
    console.error(error);
  });
