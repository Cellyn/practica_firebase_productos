import React from 'react'
import styles from '../styles/Login.module.css'
import { useForm } from 'react-hook-form'
//importando la funcion para iniciar sesion
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth_user, providerGoogle } from '../firebase/appConfig'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm()

    //metodo para iniciar sesion
    const loginForm = (data) => {

        signInWithEmailAndPassword(auth_user, data.email, data.password)
            .then((userCredentiales) => {
                //si el usuario existe extraemos solo su informacion (.user)
                const user = userCredentiales.user
                console.log(user);

                //guardando la informacion del usuario en el localstorage
                saveLocalStorage("user_firebase", JSON.stringify(user))
            }).catch((error) => {
                console.error(error.message)
                Swal.fire({
                    title: "Credenciales Inválidas",
                    text: "Revisa tu información",
                    icon: "error"
                });
            })
    }

    //metodo para iniciar sesion con google
    const loginGoogle = async () => {
        //metodo que permite autenticar a travez de un proveedor externo
        try {
            const result = await signInWithPopup(auth_user, providerGoogle);
            console.log(result.user);
            //almacenamos la info del usuario al storage
            saveLocalStorage("user_firebase", JSON.stringify(result.user))
        } catch (error) {
            console.error(error.message)
            Swal.fire({
                title: "Error al autenticarse con Google",
                text: "Revisa tu información",
                icon: "error"
            });
        }
    }

    //metodo que nos va guardar el usuario en el localstorage
    const saveLocalStorage = (key, data) => {
        //localStorage (setItem, getItem)
        localStorage.setItem(key, data);
    }

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit(loginForm)} className={styles.login_form}>
                <h1>Inicio de sesion</h1>
                <div>
                    <button onClick={loginGoogle}>Ingresar con Google</button>
                </div>
                <hr />
                <h2 className={styles.login_title}>Iniciar</h2>
                <div className={styles.form_group}>
                    <label htmlFor="email">Correo Electrónico</label>
                    <input type="email" placeholder="Ingrese el correo electrónico" {...register('email', { required: true })} />
                    {errors.email && <span style={{ color: "red" }}>*Campo Obligatorio</span>}
                </div>
                <div className={styles.form_group}>
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" id="password" placeholder="Ingrese la constraseña" {...register('password', { required: true })} />
                    {errors.password && <span style={{ color: "red" }}>*Campo Obligatorio</span>}
                </div>
                <button type="submit" className={styles.login_button}>Iniciar Sesión</button>
                <section>
                    <p>Si no tienes cuenta <Link to="/registrar_usuario">Regístrate Aquí!</Link></p>
                </section>
            </form>

        </div>
    )
}
