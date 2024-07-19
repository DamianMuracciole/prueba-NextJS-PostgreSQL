"use Client";
import Image from "next/image";
import { useEffect, useState, useContext } from "react";
import { contexto } from "@/app/(contx_grp)/productos/layout";

import { addItem, clearItem, roundedPrice } from "./functions";

import { BsCheck2Circle } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.css";
import styles from "./product.module.css";

import Swal from "sweetalert2";

import ModalProduct from "./modalProduct";

export default function Product({ product, list, setList }) {
  const { onCheckout } = useContext(contexto);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    list.find((item) => item.id == product.id)
      ? setSelected(true)
      : setSelected(false);
  }, [list, product.id]);

  // Agrego un producto al carro
  const add = (product) => {
    if (!onCheckout) {
      setSelected(true);
      setList(addItem(product, list));
    } else {
      Swal.fire({
        title: "Primero debés cancelar la orden",
        icon: "warning",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  //Borro un item de la lista
  const borrar = (product) => {
    if (!onCheckout) {
      setSelected(false);
      setList(clearItem(product, list));
    } else {
      Swal.fire({
        title: "Primero debés cancelar la orden",
        icon: "warning",
        timer: 1500,
        showConfirmButton: false,
      });
    }
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
              className={
                product.stock
                  ? styles.imageProduct
                  : styles.imagewidthoutProduct
              }
            />
            {selected && <BsCheck2Circle className={styles.checkedIcon} />}
            {product.discount > 0 && product.stock > 0 && (
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
          {product.discount > 0 && product.stock > 0 && (
            <div className={styles.discountPrice}>
              <span className={styles.priceRow}> $ {product.price}</span>
              <span className={styles.finalPrice}>
                {" "}
                ${roundedPrice(product.price * (1 - product.discount))}
              </span>
              <span style={{fontSize:'10px', textAlign:'end'}}>+ Impuestos</span>
            </div>
          )}
          {product.discount == 0 && product.stock > 0 && (
            <div className={styles.discountPrice}>
              <span className={styles.price}> $ {product.price}</span>
              <span style={{fontSize:'10px', textAlign:'end'}}>+ Impuestos</span>
            </div>
          )}

          {/* <p className={styles.price} style={{ color: "tomato" }}>
            {" "}
            -{product.discount * 100}%
          </p> */}
        </div>
        <div>
          {!selected && product.stock !== 0 && (
            <button
              onClick={() => add(product)}
              className={onCheckout ? styles.btnWithoutStock : styles.btn}
            >
              Agregar al carro
            </button>
          )}
          {selected && product.stock !== 0 && (
            <button
              onClick={() => borrar(product)}
              className={onCheckout ? styles.btnWithoutStock : styles.btn}
            >
              Quitar del carro
            </button>
          )}
          {product.stock === 0 && (
            <button className={styles.btnWithoutStock}>Sin Stock</button>
          )}
        </div>
      </div>
    </div>
  );
}
