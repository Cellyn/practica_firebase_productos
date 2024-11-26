import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { auth_user, db } from '../firebase/appConfig'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import Header from './Header'
import Login from '../session/Login'
import { onAuthStateChanged } from 'firebase/auth'
import styles from '../styles/ListProducts.module.css'

export default function ListProducts() {
    //declaramos un estado para la lista de productos
    const [products, setProducts] = useState([])

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

    //montando la informacion de los productos que hay en firebase
    useEffect(() => {
        //Funcion que nos permite visualizar la info de la bd en tiempo real
        onSnapshot(
            //obtenemos la conexion de la base de datos y el nombre de la coleccion
            collection(db, "products"),
            (snapshot) => {
                //objeto de firebase
                //console.log(snapshot);
                //testeando el primer documento de la coleccion
                console.log(snapshot.docs[0].data());

                /** mapeando / iterando los documentos de la coleccion */
                const array_products = snapshot.docs.map((doc) => {
                    //copiamos la data de cada documento de la coleccion productos y la mandamos al array_products
                    return { ...doc.data(), id: doc.id }
                })
                //testear 
                console.log(array_products);

                //actualizamos el estado con el arreglo de productos
                setProducts(array_products)
            }
        )
    }, [])

    //funcion para eliminar un producto
    const deleteProduct = (id) => {
        console.log(id);
        try {
            Swal.fire({
                title: "Estás seguro de eliminar?",
                text: "No podrás revertir los cambios!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si, Eliminar!",
                cancelButtonText: "Cancelar",
            }).then((result) => {
                if (result.isConfirmed) {
                    //eliminar el documento
                    deleteDoc(doc(db, "products", id));
                    Swal.fire({
                        title: "Eliminado!",
                        text: "Has eliminado el producto.",
                        icon: "success"
                    });
                }
            });
        } catch (error) {
            console.error("Error al eliminar un producto", error)
        }

    }

    return (
        <div>
            {user ?
                <>
                    <Header />
                    <section className={styles.products_section}>
                        <h2>Lista de Productos</h2>
                        <div className={styles.products_grid}>
                            {
                                products.length > 0 ?
                                    products.map((product) => {
                                        return (
                                            <div key={product.id} className={styles.product_card}>
                                                <h3>{product.name}</h3>
                                                <p>{product.description}</p>
                                                <div className={styles.product_actions}>
                                                    <Link to={`/editar/${product.id}`} className={styles.edit_product}>Editar</Link>
                                                    <button onClick={() => deleteProduct(product.id)} className={styles.delete_button}>Eliminar</button>
                                                </div>
                                            </div>
                                        )
                                    })
                                    : <p className={styles.products_message}>No hay productos por el momento</p>
                            }
                        </div>
                    </section>
                </>
                : <Login />
            }

        </div>
    )
}
