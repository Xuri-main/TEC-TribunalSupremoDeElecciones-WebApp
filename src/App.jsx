import { BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Inicio from './pages/Inicio';
import Consultas from './pages/Consultas';

function App() {
  return (
      <BrowserRouter>
        {/* Constante */}
        <nav>
          <Link to = "/">Inicio</Link>
          <Link to = "/consultas">Consultas Civiles</Link>
        </nav>
        {/* Dinamico */}
        <div>
          <Routes>
            <Route path = "/" element = {<Inicio />} />
            <Route path = "/consultas" element = {<Consultas />} />
          </Routes>
        </div>
      </BrowserRouter>
  );
}

export default App;