'use client'
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import Link from 'next/link';
import Image from 'next/image';
import Swal from 'sweetalert2'
import styles from '@/app/auth/products/[id]/styles.module.css';


export default function UserRegister({ params }) {
  const [product, setProduct] = useState({});
  const id = params.id;
  const urlHost = location.origin
  let url = urlHost + "/api/products/";


  useEffect(() => {
    fetch(`${url} ${id}`)
      .then(response => response.json())
      .then(product => setProduct(product))
  }, [id])

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Querés eliminar este producto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: "No"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`http://localhost:3000/api/products/${id}`, {
            method: "DELETE",
            headers: {
              "Content-type": "application/json",
            },
          });

          if (!res.ok) {
            throw new Error("Failed to update topic");
          }

          router.refresh();
          router.push("/auth/products");
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  return (
    <article className={styles.fondo} >

      <h1 className={styles.title} >Producto</h1>

      <section>

        {Object.keys(product).length === 0 && <h3>Cargando ...</h3>}

        {Object.keys(product).length !== 0 &&
          <div className={styles.card}>

            <h2 className={styles.productTitle}>{product.name}</h2>
            <p className={styles.priceTitle}>$ {product.price}</p>
            <h4 className={styles.descriptionTitle}>{product.description}</h4>
            <Image
              src={product.urlImage.toString().trim()}
              width={180}
              height={180}
              alt='Imagen del producto'
              className={styles.imageProduct}
            />
            <article className={styles.buttonsContainer}>
              <form onSubmit={handleSubmit} >
                <button className={styles.submitbutton} >Eliminar</button>
              </form>
              <Link href={`/auth/products/edit/${product.id}`}   >
                <button className={styles.submitbutton} >Editar</button>
              </Link>
            </article>
          </div>
        }
      </section>

      <Link href='/auth/products' >
        <button className={styles.submitbutton}>Todos los productos</button>
      </Link>

    </article>
  )
}