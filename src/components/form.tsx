import * as React from "react";
import { Button } from "./button";
import styles from "../assets/styles/modules/form.module.css";

type IFormProps = {
  onSubmit: (payload: { title: string; description: string; price: string }) => void;
}

export const Form: React.FC<IFormProps> = ({ onSubmit }) => {
  let formRef = React.useRef<HTMLFormElement>(null);
  let titleRef = React.useRef<HTMLInputElement>(null);
  let priceRef = React.useRef<HTMLInputElement>(null);
  let descriptionRef = React.useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!titleRef.current?.value) {
      alert("Your product needs a title");

      return;
    }

    if (!descriptionRef.current?.value || !priceRef.current?.value) {
      alert("Your product needs some content");

      return;
    }

    onSubmit({
      title: titleRef.current && titleRef.current.value,
      description: descriptionRef.current && descriptionRef.current.value,
      price: priceRef.current && priceRef.current.value,
    });

    formRef.current?.reset();
  };

  return (
    <form className={styles.form} onSubmit={(event) => handleSubmit(event)} ref={formRef}>
        <label htmlFor="product-title" className={styles.label}>Product title: *</label>

        <input
            type="text"
            id="product-title"
            ref={titleRef}
            placeholder="Title..."
            defaultValue=""
            className={styles.input}
        />

        <label htmlFor="product-price" className={styles.label}>Product details: *</label>

        <input
            type="number"
            id="product-price"
            ref={priceRef}
            placeholder="Price..."
            defaultValue=""
            className={styles.input}
        />

        <label htmlFor="product-descriptions" className={styles.label}>Product descriptions:</label>
        <textarea
            ref={descriptionRef}
            id="product-descriptions"
            placeholder="Start typing product description here..."
            defaultValue=""
            className={styles.textarea}
        />

      <Button>Add a product</Button>
    </form>
  );
};
