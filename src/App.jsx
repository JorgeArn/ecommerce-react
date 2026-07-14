import './App.css'
import { Layout } from './componentes/layout/Layout'
import { ItemListContainer } from './componentes/itemListContainer/ItemListContainer'
import Inicio from './componentes/inicio/Inicio'
import { Routes, Route } from 'react-router-dom'
import DetalleProducto from './componentes/detalleProducto/DetalleProducto'
import Carrito from './componentes/carrito/Carrito'
import ProductosDB from './componentes/productosDB/ProductosDB'
import GestionProductos from './componentes/gestionProductos/GestionProductos'
import GestionCupones from './componentes/gestionCupones/GestionCupones'
import Login from './componentes/login/Login'
import Registro from './componentes/registro/Registro'
import ProtectedRoute from './componentes/protectedRoute/ProtectedRoute'



function App() {

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/productos" element={<ItemListContainer Mensaje={"Nuestros Productos"} />} />
        <Route
          path="/gestion"
          element={
            <ProtectedRoute rolesPermitidos={['admin']}>
              <GestionProductos />
            </ProtectedRoute>
          } />
        <Route
          path="/admin/cupones"
          element={
            <ProtectedRoute rolesPermitidos={['admin']}>
              <GestionCupones />
            </ProtectedRoute>
          }
        />
        <Route path="/producto/:id" element={<DetalleProducto />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
      </Route>
    </Routes>
  );
}

export default App
