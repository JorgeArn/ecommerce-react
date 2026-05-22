import './App.css'
import { Layout } from './componentes/layout/Layout'
import { ItemListContainer } from './componentes/itemListContainer/ItemListContainer'
import FormContainer from './componentes/formContainer/FormContainer'
import Inicio from './componentes/inicio/Inicio'
import { Routes, Route } from 'react-router-dom'


function App() {

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/productos" element={<ItemListContainer Mensaje={"Nuestros Productos"} />} />
        <Route path="/alta" element={<FormContainer Mensaje={"Agregar Nuevo Producto"} />} />
      </Route>
    </Routes>
  );
}

export default App
