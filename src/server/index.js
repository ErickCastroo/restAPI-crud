const express = require("express");
const morgan = require("morgan");
let productos = require("../data/index.js");

const app = express();
app.use(express.json());
app.use(morgan("dev"));

//aqui estamos haciendo una peticion get a la ruta /productos
app.get("/productos", (req, res) => {
  res.json(productos);
});

//lo que hacemos aqui es que cuando se haga un post a la ruta /productos
//aqui nomas estamos comiando el body de la peticion y le agregamos un id que es el tamaño del arreglo + 1
app.post("/productos", (req, res) => {
  const nuevoProducto = { ...req.body, id: productos.length + 1 };
  productos.push(nuevoProducto);
  res.send(nuevoProducto);
});

//aqui estamos haciendo una peticion get a la ruta /productos/:id y estamos buscando el producto que tenga el id que se paso por parametro
app.get("/productos/:id", (req, res) => {
  const productoEncontrado = productos.find(
    (producto) => producto.id === parseInt(req.params.id)
  );
  //si no se encuentra el producto se manda un status 404
  if (!productoEncontrado) {
    return res.status(404).send("Producto no encontrado");
  }

  res.json(productoEncontrado);
});






//aqui estamos haciendo una peticion delete a la ruta /productos/:id y estamos buscando el producto que tenga el id que se paso por parametro
app.delete("/productos/:id", (req, res) => {
  const productoEncontrado = productos.find(
    (producto) => producto.id === parseInt(req.params.id)
  );
  //si no se encuentra el producto se manda un status 404
  if (!productoEncontrado) {
    return res.status(404).send("Producto no encontrado");
  }

  //aqui estamos filtrando el arreglo de productos y estamos regresando todos los productos que no tengan el id que se paso por parametro
  //el filter sirve para recorrer un arreglo y regresar los elementos que cumplan con la condicion
  productos = productos.filter(
    (producto) => producto.id !== parseInt(req.params.id)
  );
  res.status(204).send();
});





app.put("/productos/:id", (req, res) => {
  const newData = req.body;
  const productoEncontrado = productos.find(
    (producto) => producto.id === parseInt(req.params.id)
  );
  //si no se encuentra el producto se manda un status 404
  if (!productoEncontrado) {
    return res.status(404).send("Producto no encontrado");
  }
  //aquí estamos mapeando el arreglo de productos y si el id del producto es igual al id que se paso por parametro se actualiza el producto con los nuevos datos
  //el map sive para recorrer un arreglo y modificar los elementos que cumplan con la condicion
  productos = productos.map((producto) => producto.id === parseInt(req.params.id) ? { ...producto, ...newData }: producto
  );
  res.json('producto actualizado');
});

app.listen(3000, () => {
  console.log("El servidor esta corriendo en el puerto 3000");
});
