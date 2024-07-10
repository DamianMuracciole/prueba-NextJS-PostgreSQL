"use client";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Image from "next/image";
import styles from "./product.module.css";

function ModalProduct({ data1, children }) {
  const data = data1;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);

  return (
    <div>
      <button onClick={handleOpen} style={{ border: "none" }}>
        {children}
      </button>

      <Modal show={show} onHide={handleClose} backdrop="true" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>{data.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body
          className={styles.modalWindow}
          style={{ overflow: "hidden" }}
        >
          <div style={{display:'flex'}}>
            <Image
              src={data.image}
              alt={data.title}
              width={100}
              height={100}
              sizes="xlarge"
              className={styles.modalWindow1}
            ></Image>
            <p style={{paddingLeft:'10px', fontWeight:'bolder'}}>{data.description}</p>
          </div>
          <p>{data.adittionalDescription}</p>
          <p>${data.price}</p>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ModalProduct;
