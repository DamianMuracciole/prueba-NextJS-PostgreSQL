"use Client";
import Image from "next/image";
import { useEffect, useState } from "react";

import { addItem, clearItem } from "./functions";

import { BsCheck2Circle } from "react-icons/bs";
import 'bootstrap/dist/css/bootstrap.css';
import styles from "./product.module.css";

import Lienzo from './modalProduct';


export default function Product({ product, list, setList }) {
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    list.find((item) => item.id == product.id)
      ? setSelected(true)
      : setSelected(false);
  }, [list, product.id]);

  // Agrego un producto al carro
  const add = (product) => {
    setSelected(true);
    setList(addItem(product, list));
  };

  //Borro un item de la lista
  const borrar = (product) => {
    setSelected(false);
    setList(clearItem(product, list));
  };

  return (
    <div className={styles.productContainer}>
      <Lienzo data1={product}>
        <div className={styles.imageContainer}>
          <Image
            src={product.image}
            width={300}
            height={300}
            alt={product.title}
            className={styles.imageProduct}
          />
          {selected && <BsCheck2Circle className={styles.checkedIcon} />}
        </div>
      </Lienzo>

      <p className={styles.title}>{product.title}</p>
      <h3>{product.description}</h3>

      <div className={styles.buyContent}>
        <p className={styles.price}> $ {product.price}</p>

        {!selected && (
          <button onClick={() => add(product)} className={styles.btn}>
            Agregar
          </button>
        )}
        {selected && (
          <button onClick={() => borrar(product)} className={styles.btn}>
            Quitar
          </button>
        )}
      </div>
    </div>
  );
}
