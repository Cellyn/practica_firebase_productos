import React from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Home from '../components/Home'
import ListProducts from '../components/ListProducts'
import RegisterProduct from '../components/RegisterProduct'
import EditForm from '../components/EditForm'

export default function Menu() {
    /**
     * BrowserRouter => Es el contenedor principal para la navegacion para que pueda trabajar con las rutas
     * 
     * Routes => contenedor que envuelve las rutas
     */
    return (
        <BrowserRouter>
            <header>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/productos">Productos</Link>
                        </li>
                        <li>
                            <Link to="/registro">Registro</Link>
                        </li>
                    </ul>
                </nav>
            </header>

            <Routes>
                {/**
                 * asignamos el nombre de la ruta y su componente
                 */}
                <Route path='/' element={<Home />}/>
                <Route path='/productos' element={<ListProducts />}/>
                <Route path='/registro' element={<RegisterProduct />}/>
                <Route path='/prueba' element={<RegisterProduct />}/>
                {/** creando una ruta con parametro */}
                <Route path='/editar/:id' element={<EditForm />} />
            </Routes>
        </BrowserRouter>
        
    )
}
