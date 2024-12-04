import React from "react";
import Lottie from "lottie-react";
import LoadingAnimation from "../../assets/animations/98770-assistagro-loading-bars.json";
import styles from "./PageLoader.module.css";

export default function PageLoader() {
  return (
    <div className={styles.container}>
      <Lottie className={styles.animation} animationData={LoadingAnimation} />
    </div>
  );
}
