import { Routes, Route } from 'react-router-dom';
import Landing from './views/landing/Landing';
import Home from './views/home/Home';
import NotFound from './utils/notFound/NotFound';
import './App.css'

function App() {
  

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Landing/>}/>
        <Route path="/home" element={<Home/>}/>

        {/* Ruta para manejar rutas no definidas */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
