import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { auth_user, db } from '../firebase/appConfig';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Login from '../session/Login';
import { onAuthStateChanged } from 'firebase/auth';

export default function RegisterProduct() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    /**
     * register = hace referencia a lo que capturo en la entrada de dato
     * watch = permite observar alguna entrada de dato (valor)
     * handleSubmit = es la accion de lo que voy hacer con la informacion
     */

    //creando una constante para redirigir a una ruta
    const navigate = useNavigate()

    //estado donde vamos a verificar si el usuario esta autenticado
    const [user, setUser] = useState(null)

    //verificamos si el usuario esta en firebase
    //userFirebase = devuelve un objeto si la persona existe
    onAuthStateChanged(auth_user, (userFirebase) => {
        if (userFirebase) { //objeto
            //si el usuario existe
            console.log(userFirebase);
            setUser(userFirebase)
        } else {
            setUser(null)
        }
    })

    console.log(watch('name'));
    //metodo para guardar un producto
    const saveProduct = async (data) => {
        console.log("Se ha guardado");
        console.log(data); //{ name: cebolla, description: cebollas moradas }

        //conectarnos a la bd y guardamos un documento
        try {
            await addDoc(collection(db, "products"), {
                name: data.name, //cebolla
                description: data.description //cebollas moradas
            })
        } catch (error) {
            console.error("Error al registrar el producto", error)
        }
        //redireccionamos a lista de productos
        navigate("/productos")
    }

    return (
        <div>
            {user ?
                <>
                    <Header />
                    <main>
                        <form action="" onSubmit={handleSubmit(saveProduct)}>
                            <h2>Registro de Productos</h2>
                            <div className='form_group'>
                                <label htmlFor="">Nombre del Producto</label>
                                <input type="text" placeholder='Ingrese el nombre del producto' {...register('name', { required: true })} />
                                {errors.name && <span>*Campo Obligatorio</span>}
                            </div>

                            <div className='form_group'>
                                <label htmlFor="">Descripción</label>
                                <input type="text" placeholder='Ingrese una descripción' {...register('description', { required: true })} />
                                {errors.description && <span>*Campo Obligatorio</span>}
                            </div>
                            <div>
                                <button type='submit' className='button'>Guardar Producto</button>
                            </div>
                        </form>
                    </main>
                </>
                : <Login />
            }
        </div>
    )
}
