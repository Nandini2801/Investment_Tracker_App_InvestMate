import React from "react";
import { Text } from "@chakra-ui/react";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import Animation from "../../assets/animations/68592-error-404-creature.json";
import styles from "./Page404.module.css";

export default function Page404() {
  return (
    <div className={styles.container}>
      <Text className={styles.heading}>Oops....</Text>
      <Text className={styles.para}>This page could not be found</Text>

      <div className={styles.animation_container}>
        <Lottie animationData={Animation} />
      </div>
      <Link to="/" className={styles.link}>
        Go Back To Home
      </Link>
    </div>
  );
}
