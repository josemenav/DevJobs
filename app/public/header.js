// Hace una petición al archivo header.html
console.log('llegue al header')
fetch("../views/index.html")
  .then(response => {
    // Verifica si la respuesta de la petición es exitosa
    if (response.ok) {
      return response.text();
    }
    throw new Error("No se pudo cargar el encabezado");
  })
  .then(data => {
    // Inserta el contenido del encabezado en el elemento con id "header"
    document.getElementById("header").innerHTML = data;
  })
  .catch(error => {
    console.error(error);
  });
