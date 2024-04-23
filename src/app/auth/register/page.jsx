'use client'
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from '@/app/auth/register/styles.module.css';


export default function UserRegister() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();
  const router = useRouter();

  const [file, setFile] = useState();

  const onSubmit = handleSubmit(async data => {

    if (data.password ==! data.repassword ) return alert('Las contraseñas no coinciden');
    // if (Object.keys(data.avatar).length === 0) data.avatar = '/images/avatar.jpg'; else data.avatar = '/images/avatar.jpg';

    const formData = new FormData();
    formData.append("firstname", data.firstname);
    formData.append("lastname", data.lastname);
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("company", data.company);
    formData.append("password", data.password);
    formData.append("avatar", file);
    formData.append("newsletter", data.newsletter);
    //console.log(formData)

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      body: formData
    })


    if (res.ok){
      router.push('/auth/login')
    }

  
    const resJSON = await res.json();
    console.log('resJSON del register: ',resJSON)

  });

  return (
    <article className={styles.fondo} >

      <h1 className={styles.title} >Formulario de registro</h1>

      <form onSubmit={onSubmit} className={styles.formulario}>

        <label htmlFor='firstname' >Nombre</label>
        <input
          type="text"
          {...register("firstname", {
            required: {
              value: true,
              message: 'Se requiere este campo'
            },
            minLength: {
              value: 2,
              message: 'El valor mínimo de caracteres es 2'
            },
            maxLength: {
              value: 100,
              message: 'El valor máximo de caracteres es 100'
            },
          })}
          placeholder='userFirstName'
        />
        {errors.firstname && <p>{errors.firstname.message}</p>}

        <label htmlFor='lastname'>Apellido</label>
        <input
          type="text"
          {...register("lastname",
            {
              required: {
                value: true,
                message: 'Se requiere este campo'
              },
              minLength: {
                value: 2,
                message: 'El valor mínimo de caracteres es 2'
              },
              maxLength: {
                value: 100,
                message: 'El valor máximo de caracteres es 100'
              },
            }
          )}
          placeholder='userlastname'
        />
        {errors.lastname && <p>{errors.lastname.message}</p>}

        <label htmlFor='username'>Nombre de usuario</label>
        <input
          type="text"
          {...register("username",
            {
              required: {
                value: true,
                message: 'Se requiere este campo'
              },
              minLength: {
                value: 2,
                message: 'El valor mínimo de caracteres es 2'
              },
              maxLength: {
                value: 100,
                message: 'El valor máximo de caracteres es 100'
              },
            }
          )}
          placeholder='username'
        />
        {errors.username && <p>{errors.username.message}</p>}

        <label htmlFor='email'>Correo electrónico</label>
        <input type="email"
          {...register("email",
            {
              required: {
                value: true,
                message: 'Se requiere este campo'
              },
              pattern: {
                value: /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Es necesario un correo válido'
              }
            }
          )}
          placeholder='user@mail.com'
        />
        {errors.email && <p>{errors.email.message}</p>}

        <label htmlFor='company'>Organización</label>
        <input type="text"
          {...register("company")}
          placeholder='company'
        />

        <label htmlFor='password'>Contraseña</label>
        <input type="password"
          {...register("password",
            {
              required: {
                value: true,
                message: 'Se requiere este campo'
              },
              pattern: {
                value: /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,20}$/,
                message: 'La contraseña debe tener en 8 y 20 digitos, contener minúsculas, maúsculas y números. No admite simbolos.'
              }
            }
          )}
          placeholder='*****'
        />
        {errors.password && <p>{errors.password.message}</p>}


        <label htmlFor='repassword'>Confirmar contraseña</label>
        <input type="password"
          {...register("repassword",
            {
              required: {
                value: true,
                message: 'Se requiere este campo'
              },
              validate: (value) => {
                if (value === watch('password')) return true
                else return 'Contraseña distinta'
              }
            }
          )}
          placeholder='*****'
        />
        {errors.repassword && <p>{errors.repassword.message}</p>}

        {/* <Image
          src='/images/avatar.jpg'
          width={100}
          height={100}
          alt='avatar'
          className={styles.avatar} />
        <label htmlFor='avatar' >Tu avatar</label>
        <input type="file" {...register('avatar')} /> */}

        <label htmlFor='urlImage' >Avatar</label>
        <Image
          src={file ? URL.createObjectURL(file) : '/images/avatar.jpg'}
          width={180}
          height={180}
          alt='avatar'
          className={styles.avatar}
        />
        <input
          type="file"
          {...register('avatar',
            {
              validate: (value) => {
                if (value.length > 0) {
                  const nombre = value[0].name.split('.');
                  const extension = nombre[nombre.length - 1]
                  if (extension === 'jpg') return true;
                  if (extension === 'jpeg') return true;
                  if (extension === 'bmp') return true;
                  if (extension === 'png') return true;
                  if (extension === 'tif') return true
                  else return 'La extension debe ser .jpg .jpeg .png .bmp .tif'
                } else {
                return true
                }
              }
            })
            }

          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />
        {errors.avatar && <p>{errors.avatar.message}</p>}

        <div>
          <input type="checkbox" {...register("newsletter")} />
          <label htmlFor='newsletter'> Desea suscribirse a nuestros Newsletters</label>
        </div>


        <button className={styles.submitbutton}>Enviar</button>

        {/* <pre>
          {JSON.stringify(watch(), null, 2)}
        </pre> */}

      </form>
    </article>
  )
}