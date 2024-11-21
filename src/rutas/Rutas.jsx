import React from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Home from '../components/Home'
import ListProducts from '../components/ListProducts'
import RegisterProduct from '../components/RegisterProduct'
import EditForm from '../components/EditForm'
import SignUp from '../session/SignUp'
import Login from '../session/Login'

export default function Menu() {
    /**
     * BrowserRouter => Es el contenedor principal para la navegacion para que pueda trabajar con las rutas
     * 
     * Routes => contenedor que envuelve las rutas
     */
    return (
        <BrowserRouter>
            <Routes>
                {/**
                 * asignamos el nombre de la ruta y su componente
                 */}
                <Route path='/' element={<Home />} />
                <Route path='/productos' element={<ListProducts />} />
                <Route path='/registro' element={<RegisterProduct />} />
                <Route path='/login' element={<Login />} />
                <Route path='/registrar_usuario' element={<SignUp />} />
                {/** creando una ruta con parametro */}
                <Route path='/editar/:id' element={<EditForm />} />
            </Routes>
        </BrowserRouter>

    )
}
