import React from "react";
import Lottie from "lottie-react";
import { Text, Button } from "@chakra-ui/react";
import Animation from "../../assets/animations/119048-login-verification.json";
import styles from "./Login.module.css";
import { LoginForm } from "../../components";

function Login() {
  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <Text className={styles.heading}>Hi There,</Text>
        <Text className={styles.heading}>Welcome Back</Text>
        <Lottie animationData={Animation} />
      </div>
      <div className={styles.content}>
        <Text className={styles.sub_heading}>Hi There,</Text>
        <Text className={styles.sub_heading}>Welcome Back</Text>
        <div className={styles.form_container}>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default Login;
