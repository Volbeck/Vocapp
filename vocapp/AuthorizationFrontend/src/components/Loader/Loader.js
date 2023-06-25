import React from "react";
import styles from "./style.module.css";

export default function Loading(){
  return(
    <div className={styles.overlay}>
      <div className={styles.loader}></div>
    </div>
  )
}