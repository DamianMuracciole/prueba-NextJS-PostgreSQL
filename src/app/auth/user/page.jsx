'use client'
import { useForm } from "react-hook-form";
import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import Swal from 'sweetalert2';
import styles from '@/app/auth/user/styles.module.css';

export default function UserRegister() {
  const [user, setUser] = useState({});
  const [editUser, setEditUser] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  const [file, setFile] = useState();
  const [errorsPasswordStatus, setErrorsPasswordStatus] = useState(false)
  const errorsPasswordmessage = "Contraseña no válida";

  let urlHost ;
  (window && window.location) ? urlHost= window.location.origin :urlHost = "http://localhost:3000";
  let url = urlHost + '/api/auth/user';

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: async () => {
      const response = await fetch(url)
      const usersSelected = await response.json();
      setUser(usersSelected)
      return usersSelected;
    }
  });


  const router = useRouter();

  const onSubmit = handleSubmit(async data => {
    if (data.newPassword == !data.reNewPassword) return alert('Las contraseñas no coinciden');
    const formData = new FormData();
    formData.append("id", data.id);
    formData.append("firstname", data.firstname);
    formData.append("lastname", data.lastname);
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("company", data.company);
    formData.append("newsletter", data.newsletter);
    if ((data.newPassword == data.reNewPassword) && editPassword) {
      formData.append("password", data.password);
      formData.append("newPassword", data.newPassword);
    }
    if (file) formData.append("avatar", file)
    else formData.append("avatar", data.avatar)

    Swal.fire({
      title: "Querés modificar tu usuario!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "No"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          Swal.fire({
            title: "Guardando cambios",
            icon: "info",
            showConfirmButton: false
          })

          const res = await fetch(url , {
            method: 'PUT',
            body: formData
          });
          Swal.close()
          if (!res.ok) {
            throw new Error("Failed to update topic");
          }
          console.log(res)

          if (res.ok) {
            setErrorsPasswordStatus(false)
            setEditPassword(false);
            setEditUser(false);
            Swal.fire({
              title: 'Has modificado tus datos',
              icon: 'success'
            })
            signOut();
            router.push('/')
          }

        } catch (error) {
          console.log(error);
          setErrorsPasswordStatus(true);
          Swal.fire({
            title: 'Error de password',
            icon: "warning",
            timer: 1500,
            showConfirmButton: false
          })
        }
      }
    });
  });

  return (
    <article className={styles.fondo} >


      <section>

        {Object.keys(user).length === 0 && <h3>Cargando usuario...</h3>}

        {Object.keys(user).length !== 0 &&
          <>
            <h1 className={styles.title}> Hola {user.username}</h1>

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
                disabled={!editUser}
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
                disabled={!editUser}
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
                disabled={!editUser}
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
                disabled={true}
              />
              {errors.email && <p>{errors.email.message}</p>}

              <label htmlFor='company'>Organización</label>
              <input type="text"
                {...register("company")}
                placeholder='company'
                disabled={!editUser}
              />
              {editUser && !editPassword &&
                <button className={styles.submitbutton} onClick={() => setEditPassword(true)}>Cambiar password</button>
              }
              {editUser && editPassword &&
                <>
                  <label htmlFor='password'>Contraseña Actual</label>
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
                  {errorsPasswordStatus && <p>{errorsPasswordmessage}</p>}


                  <label htmlFor='newPassword'>Nueva Contraseña</label>
                  <input type="password"
                    {...register("newPassword",
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
                  {errors.newPassword && <p>{errors.newPassword.message}</p>}


                  <label htmlFor='reNewPassword'>Confirmar contraseña</label>
                  <input type="password"
                    {...register("reNewPassword",
                      {
                        required: {
                          value: true,
                          message: 'Se requiere este campo'
                        },
                        validate: (value) => {
                          if (value === watch('newPassword')) return true
                          else return 'Contraseña distinta'
                        }
                      }
                    )}
                    placeholder='*****'
                  />
                  {errors.reNewPassword && <p>{errors.reNewPassword.message}</p>}
                </>
              }


              <label htmlFor='avatar' >Avatar</label>
              <Image
                src={file ? URL.createObjectURL(file) : user.avatar}
                width={180}
                height={180}
                alt='avatar'
                className={styles.imageProduct}
              />
              {editUser &&
                <>
                  <input
                    type="file"
                    {...register('avatar',
                      {
                        validate: (value) => {
                          if (value.length > 0 && value[0].name) {
                            const nombre = value[0].name.split('.');
                            const extension = nombre[nombre.length - 1].toLowerCase();
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
                </>
              }

              {editUser &&
                <div>
                  <input type="checkbox" {...register("newsletter")} />
                  <label
                    htmlFor='newsletter'
                  // checked={user.newsletter}
                  > Desea suscribirse a nuestros Newsletters</label>
                </div>
              }

              {!editUser &&
                <>
                  {user.newsletter && <p> Ud. está suscrito a nuestro Newsletter </p>}
                  {!user.newsletter && <p> Ud. No está suscrito a nuestro Newsletter </p>}
                </>
              }

              <article className={styles.buttonsContainer}>
                {!editUser &&
                  <div>
                    <Link
                      href={'/'}
                      className={styles.submitbutton}
                    > Volver </Link>
                    <button
                      className={styles.submitbutton}
                      onClick={(e) => setEditUser(true)}
                    >Editar</button>
                  </div>
                }
                {editUser &&
                  <div>
                    <button className={styles.submitbutton} >Guardar</button>
                    <button
                      className={styles.submitbutton}
                      onClick={(e) => {
                        setEditUser(false);
                        setEditPassword(false)
                      }
                      }
                    >Salir</button>
                  </div>
                }
              </article>


            </form>
          </>
        }
      </section>

    </article>
  )
}