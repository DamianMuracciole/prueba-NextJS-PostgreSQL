'use client'
import { useForm } from "react-hook-form";
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import Swal from 'sweetalert2'
import { useState } from "react";
import Link from "next/link";
import styles from '@/app/auth/products/edit/styles.module.css';


export default function UserRegister() {
  const router = useRouter();
  const params = useParams();
  const [file, setFile] = useState();
  const [product, setProduct] = useState({});
  const id = params.id;

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: async () => {
      const response = await fetch(`http://localhost:3000/api/products/${id}`);
      const productSelected = await response.json();
      setProduct(productSelected)
      return productSelected;
    }
  });


  const onSubmit = handleSubmit(async data => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("hiddendescription", data.hiddendescription);
    formData.append("price", data.price);
    formData.append("hiddenprice", data.hiddenprice);
    formData.append("hiddenproduct", data.hiddenproduct);
    if (file) formData.append("urlImage", file)
    else formData.append("urlImage", data.urlImage)

    const res = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      body: formData
    })
    //const resJSON = await res.json();
    //console.log(resJSON)

    if (res.ok) {
      router.push('/auth/products')
    }
    Swal.fire({
      title: 'Has modificado un producto',
      icon: 'success'
    })
  });

  return (
    <article className={styles.fondo} >

      <h1 className={styles.title} >Editar Producto</h1>

      {Object.keys(product).length === 0 && <h3>Cargando ...</h3>}

      {Object.keys(product).length !== 0 &&
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
            placeholder='1000'
            onWheel={(e) => e.target.blur()}
          />
          {errors.price && <p>{errors.price.message}</p>}

          <div>
            <input type="checkbox" {...register("hiddenprice")} />
            <label htmlFor='hiddenprice'> Ocultar precio </label>
          </div>

          <label htmlFor='urlImage' className={styles.contentImageProduct}>
            <p>Imagen del producto</p>
            <Image
              src={file ? URL.createObjectURL(file) : product.urlImage}
              width={180}
              height={180}
              alt='producto'
              className={styles.imageProduct}
            />
          </label>
          <input
            type="file"
            name='urlImage'
            id='urlImage'
            {...register('urlImage',
              {
                validate: (value) => {
                  if (Array.isArray(value)) {
                    const nombre = value[0].name.split('.');
                    const extension = nombre[nombre.length - 1]
                    if (extension === 'jpg') return true;
                    if (extension === 'jpeg') return true;
                    if (extension === 'bmp') return true;
                    if (extension === 'png') return true;
                    if (extension === 'tif') return true
                    else return 'La extension debe ser .jpg .jpeg .png .bmp .tif'
                  }
                }
              }
            )}
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
            className={styles.inputFile}
          />
          {errors.urlImage && <p>{errors.urlImage.message}</p>}

          <div>
            <input type="checkbox" {...register("hiddenproduct")} />
            <label htmlFor='hiddenproduct'> Ocultar producto </label>
          </div>

          <div className={styles.buttonsContainer}>
            <button className={styles.submitbutton}>Guardar</button>
            <Link
              href={'/auth/products'}
              className={styles.submitbutton}
            > Volver </Link>
          </div>

        </form>
      }
    </article>
  )
}