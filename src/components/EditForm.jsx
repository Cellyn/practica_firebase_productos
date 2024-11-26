import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { auth_user, db } from '../firebase/appConfig'
import { useForm } from 'react-hook-form'
import Header from './Header'
import Login from '../session/Login'
import { onAuthStateChanged } from 'firebase/auth'

export default function EditForm() {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm()

    //estado donde vamos a verificar si el usuario esta autenticado
    const [user, setUser] = useState(null)

    //useParams captura los parametros que mandamos en las rutas
    const { id } = useParams();

    const navigate = useNavigate()

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

    //montando el producto seleccionado
    useEffect(() => {

        const getProductById = async () => {
            const productDoc = await getDoc(doc(db, "products", id));
            console.log(productDoc);

            //validamos si el documento existe
            if (productDoc.exists()) {
                const productData = productDoc.data()
                console.log(productData);

                //mandar la informacion del producto al formulario
                setValue('name', productData.name)
                setValue('description', productData.description)
            } else {
                console.log("No existe el producto");
            }
        }

        getProductById()
    }, [])

    const editProduct = async (data) => {
        try {
            //actualizamos el producto, seleccionamos el documento por su id
            updateDoc(doc(db, "products", id), {
                name: data.name,
                description: data.description
            });
            //redireccionamos a la lista de productos
            navigate("/productos")
        } catch (error) {
            console.error('Error al actualizar el producto', error)
        }
    }

    return (
        <div>
            {user ?
                <>
                    <Header />
                    <main>
                        <form action="" onSubmit={handleSubmit(editProduct)}>
                            <h2>Editar Producto</h2>
                            <div className='form_group'>
                                <label htmlFor="">Ingresar Producto</label>
                                <input type="text" {...register('name', { required: true })} />
                                {errors.name && <span>*Campo Obligatorio</span>}
                            </div>

                            <div className='form_group'>
                                <label htmlFor="">Descripcion</label>
                                <input type="text" {...register('description', { required: true })} />
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
