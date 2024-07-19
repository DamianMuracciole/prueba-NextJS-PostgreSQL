"use client";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Image from "next/image";
import styles from "./product.module.css";
import { roundedPrice } from "./functions";

function ModalProduct({ data1, children }) {
  const data = data1;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);

  return (
    <div>
      <button
        onClick={handleOpen}
        style={{ border: "none", borderRadius: "10px" }}
      >
        {children}
      </button>

      <Modal show={show} onHide={handleClose} backdrop="true" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>{data.title}</Modal.Title>
          {data.stock === 0 && (
            <div className={styles.withoutTxt}>
              <p>Sin Stock</p>
            </div>
          )}
        </Modal.Header>
        <Modal.Body
          className={styles.modalWindow}
          style={{ overflow: "hidden" }}
        >
          <div style={{ display: "flex" }}>
            <Image
              src={data.image}
              alt={data.title}
              width={350}
              height={350}
              sizes="xlarge"
              priority={true}
            ></Image>
            <div
              style={{
                display: "flex",
                flexFlow: "column nowrap",
                justifyContent: "space-between",
                padding: "2% 5% 0%",
              }}
            >
              <div style={{ textAlign: "center" }}>
                <p
                  style={{
                    color: "#000 ",
                    fontWeight: "lighter",
                    fontSize: ".9rem",
                    padding: "0",
                    margin: "0",
                  }}
                >
                  Precio
                </p>
                <p
                  style={{
                    color: "#333 ",
                    fontWeight: "normal",
                    fontSize: "1.2rem",
                  }}
                >
                  ${data.price}
                </p>
              </div>
              <div style={{ textAlign: "center" }}>
                <p
                  style={{
                    color: "#000 ",
                    fontWeight: "lighter",
                    fontSize: ".9rem",
                    padding: "0",
                    margin: "0",
                  }}
                >
                  Descuento
                </p>
                <p
                  style={{
                    color: "green",
                    fontWeight: "bolder",
                    fontSize: "1.2rem",
                  }}
                >
                  {data.discount * 100}%
                </p>
              </div>
              <div style={{ textAlign: "center" }}>
                <p
                  style={{
                    color: "#000 ",
                    fontWeight: "lighter",
                    fontSize: ".9rem",
                    padding: "0",
                    margin: "0",
                  }}
                >
                  Impuestos
                </p>
                <p
                  style={{
                    color: "red",
                    fontWeight: "bolder",
                    fontSize: "1.2rem",
                  }}
                >
                  {data.taxes * 100}%
                </p>
              </div>
              <div style={{ textAlign: "center" }}>
                <p
                  style={{
                    color: "#000 ",
                    fontWeight: "lighter",
                    fontSize: ".9rem",
                    padding: "0",
                    margin: "0",
                  }}
                >
                  Precio Final
                </p>
                <p
                  style={{
                    color: "#333 ",
                    fontWeight: "bolder",
                    fontSize: "1.2rem",
                  }}
                >
                  ${roundedPrice(data.price*(1-data.discount)*(1+data.taxes))}
                </p>
              </div>
            </div>
          </div>
          <p
            style={{
              fontSize: "1.2rem",
              fontWeight: "bolder",
              padding: "1rem 0rem",
              margin: "0",
            }}
          >
            {data.description}
          </p>
          <p style={{ fontSize: ".9rem", fontWeight: "normal", margin: "0" }}>
            {data.adittionalDescription}
          </p>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ModalProduct;
