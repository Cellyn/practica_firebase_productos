import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {

    return (
        <div>
            <h1>Bienvenido a Firebase</h1>
            <Link to="/prueba">Dale Click</Link>
        </div>
    )
}
