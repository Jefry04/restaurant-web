import React, { useContext, useRef } from 'react';
import { FirebaseContext } from '../firebase';

const Dishes = ({ dish }) => {
  const {
    id,
    name,
    image,
    existencia: stock,
    category,
    price,
    description,
  } = dish;

  const stockRef = useRef(stock);
  const { firebase } = useContext(FirebaseContext);

  const handleStock = () => {
    const stock = stockRef.current.value === 'true';
    try {
      firebase.db.collection('productos').doc(id).update({ existencia: stock });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full px-3 mb-4">
      <div className="p-5 shadow-md bg-white">
        <div className="lg:flex">
          <div className="lg:w-5/12 xl:w-3/12">
            <img src={image} alt="imagen plato" />
            <div className="sm:flex sm:-mx-2 pl-2">
              <label className="block mt-5 sm:w-2/4">
                <span className="block text-gray-800 mb-2"> Existencia</span>
                <select
                  className="bg-white shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                  value={stock}
                  ref={stockRef}
                  onChange={() => handleStock()}
                >
                  <option value="true">Disponible</option>
                  <option value="false">No Disponible</option>
                </select>
              </label>
            </div>
          </div>
          <div className="lg:w-7/12 xl:w-9/12 pl-5">
            <p className="font-bold text-2xl text-yellow-600 mb-4">{name}</p>
            <p className="text-gray-600 mb-4">
              Categoria:{' '}
              <span className="text-gray-700 font-bold">
                {category.toUpperCase()}
              </span>
            </p>
            <p className="text-gray-600 mb-4">{description}</p>
            <p className="text-gray-600 mb-4">
              Precio: <span className="text-gray-700 font-bold">$ {price}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dishes;
