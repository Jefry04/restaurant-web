import {Routes, Route} from 'react-router'
import Orders from './pages/Orders';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Orders/>}/>
      </Routes>
    </div>
  );
}

export default App;
