import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import db from '../firebase/appConfig'
import { useForm } from 'react-hook-form'

export default function EditForm() {
    const { register, handleSubmit, setValue, formState: {errors} } = useForm()

    //useParams captura los parametros que mandamos en las rutas
    const { id } = useParams();

    const navigate = useNavigate()

    //montando el producto seleccionado
    useEffect(() => {
        
        const getProductById = async () => {
            const productDoc = await getDoc(doc(db, "products", id));
            console.log(productDoc);

            //validamos si el documento existe
            if(productDoc.exists()){
                const productData = productDoc.data()
                console.log(productData);
                
                //mandar la informacion del producto al formulario
                setValue('name', productData.name)
                setValue('description', productData.description)
            }else{
                console.log("No existe el producto");
            }
        }

        getProductById()
    }, [])
    
    const editProduct = async (data) => {
        try{
            //actualizamos el producto, seleccionamos el documento por su id
            updateDoc(doc(db, "products", id), {
                name: data.name,
                description: data.description
            });
            //redireccionamos a la lista de productos
            navigate("/productos")
        }catch(error){
            console.error('Error al actualizar el producto', error)
        }
    }

    return (
        <div>
            <h2>Editar Producto</h2>
            <form action="" onSubmit={handleSubmit(editProduct)}>
                <div>
                    <label htmlFor="">Ingresar Producto</label>
                    <input type="text" {...register('name')} />
                </div>

                <div>
                    <label htmlFor="">Descripcion</label>
                    <input type="text" {...register('description')}/>
                </div>
                <div>
                    <button type='submit'>Guardar Producto</button>
                </div>
            </form>
        </div>
    )
}
