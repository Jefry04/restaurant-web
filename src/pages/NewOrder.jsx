import { useFormik } from 'formik';
import React from 'react';

const NewOrder = () => {
  const formik = useFormik({
    initialValues: {
      nombre: '',
      precio: '',
      categoria: '',
      imagen: '',
      descripcion: '',
    },
    onSubmit: (datos) => {
      console.log(datos);
    },
  });
  return (
    <>
      <h1 className="text-3xl font-light mb-4">Agregar orden</h1>
      <div className="flex justify-center mt-10">
        <div className="w-full max-w-3xl">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="nombre"
              >
                Nombre
              </label>
              <input
                id="nombre"
                placeholder="Nombre del plato"
                type="text"
                value={formik.values.nombre}
                onChange={formik.handleChange}
                className="mb-5 shadow apparance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="precio"
              >
                precio
              </label>
              <input
                id="precio"
                placeholder="precio del plato"
                type="number"
                min="0"
                value={formik.values.precio}
                onChange={formik.handleChange}
                className="mb-5 shadow apparance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />

              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="Categoria"
              >
                Categoria
              </label>
              <select
                className="mb-5 shadow apparance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="categoria"
                name="categoria"
                value={formik.values.categoria}
                onChange={formik.handleChange}
              >
                <option value="">Seleccione</option>
                <option value="desayuno">desayuno</option>
                <option value="almuerzo">Almuerzo</option>
                <option value="cena">Cena</option>
                <option value="Bebidas">Bebidas</option>
                <option value="postre">Postre</option>
                <option value="ensalada">Ensalada</option>
              </select>
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="imagen"
              >
                Imagen
              </label>
              <input
                id="imagen"
                type="file"
                value={formik.values.imagen}
                onChange={formik.handleChange}
                className="mb-5 shadow apparance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="descripcion"
              >
                Descripcion
              </label>
              <textarea
                id="descripcion"
                placeholder="Descripcion del plato"
                type="text"
                value={formik.values.descripcion}
                onChange={formik.handleChange}
                className="h-40 mb-5 shadow apparance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <input
                type="submit"
                id="descripcion"
                value="Agregar plato"
                className="bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default NewOrder;
