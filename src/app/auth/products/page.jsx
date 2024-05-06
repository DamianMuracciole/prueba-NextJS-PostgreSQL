"use client";
import { useState, useEffect } from "react";
import { config } from "dotenv";
import Link from "next/link";
import styles from "@/app/auth/products/styles.module.css";
import Image from "next/image";

config();

export default function UserRegister(props) {
  const [products, setProducts] = useState([]);
  let url = process.env.NEXT_PUBLIC_URL + "/api/products";

  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then((response) => response.json())
      .then((products) => setProducts(products.data));
  }, []);

  return (
    <article className={styles.fondo}>
      <h1 className={styles.title}>Todos los productos</h1>

      <section className={styles.productsContainer}>
        {products.length > 0 &&
          products.map((el) => (
            <Link
              href={`/auth/products/${el.id}`}
              key={el.id}
              className={styles.card}
            >
              <h2 className={styles.productTitle}>{el.name}</h2>
              <Image
                src={el.urlImage}
                width={180}
                height={180}
                alt="Imagen del producto"
                className={styles.imageProduct}
              />
              {!el.hiddenprice && (
                <p className={styles.descriptionTitle}>{el.description}</p>
              )}
              {!el.hiddendescription && (
                <p className={styles.priceTitle}>$ {el.price}</p>
              )}
            </Link>
          ))}
        {products.length == 0 && products.length == 0 && <h3>Cargando ...</h3>}
      </section>

      <Link href="/auth/products/new">
        <button className={styles.submitbutton}>Nuevo Producto</button>
      </Link>
    </article>
  );
}
