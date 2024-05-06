'use client'
import { useForm } from "react-hook-form";
import { useState } from "react";
import Image from 'next/image';
import Link from "next/link";
import Swal from 'sweetalert2'
import styles from '@/app/auth/products/new/styles.module.css';


export default function UserRegister() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const [file, setFile] = useState();


  const onSubmit = handleSubmit(async data => {

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("hiddendescription", data.hiddendescription);
    formData.append("price", data.price);
    formData.append("hiddenprice", data.hiddenprice);
    formData.append("hiddenproduct", data.hiddenproduct);
    formData.append("urlImage", file)

    const urlHost = location.origin
    let url = urlHost + "/api/products";
  

    const res = await fetch('/api/products', {
      method: 'POST',
      body: formData
    })
    const resJSON = await res.json();
    console.log('resJSON products: ',resJSON)

    Swal.fire({
      title: 'Has ingresado un nuevo producto',
      icon: 'success'
    });
    reset();
  });

  return (
    <article className={styles.fondo} >

      <h1 className={styles.title} >Nuevo Producto</h1>

      <form onSubmit={onSubmit} className={styles.formulario}>

        <label htmlFor='name' >Nombre del producto</label>
        <input
          type="text"
          {...register("name", {
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
          placeholder='Nombre del producto'
        />
        {errors.name && <p>{errors.name.message}</p>}

        <label htmlFor='description'>Descripcion</label>
        <input
          type="text"
          {...register("description",
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
                value: 250,
                message: 'El valor máximo de caracteres es 250'
              },
            }
          )}
          placeholder='Descripcion'
        />
        {errors.description && <p>{errors.description.message}</p>}

        <div>
          <input type="checkbox" {...register("hiddendescription")} />
          <label htmlFor='hiddendescription'> Ocultar descripción</label>
        </div>
        

        <label htmlFor='price'>Precio</label>
        <input
          type="number"
          step="0.01"
          min={0}
          {...register("price",
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
                value: 10,
                message: 'El valor máximo de caracteres es 10'
              },
            }
          )}
          placeholder='$1000'
          onWheel={(e) => e.target.blur()}
        />
        {errors.price && <p>{errors.price.message}</p>}

        <div>
          <input type="checkbox" {...register("hiddenprice")} />
          <label htmlFor='hiddenprice'> Ocultar precio </label>
        </div>

        <label htmlFor='urlImage' >Imagen del producto</label>
        <Image
          src={file ? URL.createObjectURL(file) : '/images/defaultImage.png'}
          width={180}
          height={180}
          alt='producto'
          className={styles.imageProduct}
        />
        <input
          type="file"
          {...register('urlImage',
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
        {errors.urlImage && <p>{errors.urlImage.message}</p>}

        <div>
          <input type="checkbox" {...register("hiddenproduct")} />
          <label htmlFor='hiddenproduct'> Ocultar producto </label>
        </div>


        <button className={styles.submitbutton}>Guardar</button>
        <Link
          href={'/auth/products'}
          className={styles.submitbutton}
        >
          Volver
        </Link>


      </form>
    </article>
  )
}