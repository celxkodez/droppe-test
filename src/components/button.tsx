import * as React from "react";
import styles from "../assets/styles/modules/button.module.css";

interface props {
  children: React.ReactChildren | HTMLElement | string;
  onClick?: () => void;
}

export const Button: React.FC<props> = ({ children, onClick }) => (
  <button className={styles.button} onClick={onClick}>
    {children}
  </button>
);
