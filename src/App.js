import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Cursos from './components/Cursos/cursos';
import Admin from './components/Admin/admin.jsx';
import Login from './components/Registro/Login';
import Register from './components/Registro/Register';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="cursos" element={<Cursos />} />
        <Route path="admin" element={<Admin />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
      
      </BrowserRouter>

    </div>
  );
}

export default App;
