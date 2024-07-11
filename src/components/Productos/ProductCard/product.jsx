"use Client";
import Image from "next/image";
import { useEffect, useState } from "react";

import { addItem, clearItem } from "./functions";

import { BsCheck2Circle } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.css";
import styles from "./product.module.css";

import ModalProduct from "./modalProduct";

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
      <div>
        <ModalProduct data1={product}>
          <div className={styles.imageContainer}>
            <Image
              src={product.image}
              width={296}
              height={296}
              alt={product.title}
              className={styles.imageProduct}
            />
            {selected && <BsCheck2Circle className={styles.checkedIcon} />}
            {product.discount > 0 && (
              <div className={styles.discountTxt}>
                {/* <p> {product.discount * 100}%</p> */}
                <p>En Oferta</p>
              </div>
            )}
          </div>
        </ModalProduct>

        <p className={styles.title}>{product.title}</p>
        <h3 className={styles.subtitle}>{product.description}</h3>
      </div>
      <div>
        <div className={styles.buyContent}>
          {product.discount > 0 && (
            <div className={styles.discountPrice}>
              <span className={styles.priceRow }> $ {product.price}</span>
              <span className={styles.finalPrice }> ${product.price * (1-product.discount)}</span>
            </div>
          )}
          {product.discount == 0 &&
          <p className={styles.price}> $ {product.price}</p>
          }
          {/* <p className={styles.price} style={{ color: "tomato" }}>
            {" "}
            -{product.discount * 100}%
          </p> */}
        </div>
        <div>
          {!selected && (
            <button onClick={() => add(product)} className={styles.btn}>
              Agregar al carro
            </button>
          )}
          {selected && (
            <button onClick={() => borrar(product)} className={styles.btn}>
              Quitar del carro
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
