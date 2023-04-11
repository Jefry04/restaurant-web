import { Routes, Route } from 'react-router';
import Orders from './pages/Orders';
import Menu from './pages/Menu';
import NewOrder from './pages/NewOrder';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <Sidebar>
      <Routes>
        <Route path="/" element={<Orders />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/new-order" element={<NewOrder />} />
      </Routes>
    </Sidebar>
  );
}

export default App;
