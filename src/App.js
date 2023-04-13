import { Routes, Route } from 'react-router';
import Orders from './pages/Orders';
import Menu from './pages/Menu';
import NewDishes from './pages/NewDishes';
import Sidebar from './components/Sidebar';
import firebase, { FirebaseContext } from './firebase';

function App() {
  return (
    <FirebaseContext.Provider value={{ firebase }}>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Orders />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/new-dish" element={<NewDishes />} />
        </Routes>
      </Sidebar>
    </FirebaseContext.Provider>
  );
}

export default App;
