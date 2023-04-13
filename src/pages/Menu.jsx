import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FirebaseContext } from '../firebase';
import Dishes from '../components/Dishes';

const Menu = () => {
  const { firebase } = useContext(FirebaseContext);
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    const getDishes = () => {
      firebase.db.collection('productos').onSnapshot(handleSnapshot);
    };
    getDishes();
  }, []);

  //snapshot es consulta en tiempo real de base de dato de firebase
  const handleSnapshot = (snapshot) => {
    const results = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    setDishes(results);
  };

  return (
    <>
      <h1 className="text-3xl font-light mb-4">Menu</h1>
      <Link
        to="/new-dish"
        className="bg-blue-800 hover:bg-blue-700 inline-block mb-5 p-2 text-white uppercase font-bold "
      >
        {' '}
        Agregar Comida
      </Link>
      {dishes.map((dish) => (
        <Dishes key={dish.id} dish={dish} />
      ))}
    </>
  );
};

export default Menu;
