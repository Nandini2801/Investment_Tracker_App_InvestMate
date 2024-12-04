import React from "react";
import Lottie from "lottie-react";
import { Heading, Text } from "@chakra-ui/react";
import Animation from "../../assets/animations/animation_ln91euaa.json";
import styles from "./Register.module.css";
import {
  BankDetailsForm,
  BasicDataForm,
  ProgressBar,
  SignUpForm,
} from "../../components";
import { useState } from "react";
import { bankDetailsApi, userApi } from "../../utils/apis";
import { useNavigate } from "react-router";

function RegisterPage() {
  const navigate = useNavigate();

  const [value, setValue] = useState(0);
  const [step, setStep] = useState(0);
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [basicData, setBasicData] = useState({
    fname: "",
    lname: "",
    dob: "",
    phone: "",
    gender: "",
    address: "",
  });

  const handleSignUpNext = (values) => {
    setStep((prevStep) => prevStep + 1);
    setValue((prevValue) => prevValue + 100 / 3);
    setSignUpData(values);
  };

  const handleBasicNext = (values) => {
    setStep((prevStep) => prevStep + 1);
    setValue((prevValue) => prevValue + 100 / 3);
    setBasicData(values);
  };

  const handleBasicBack = (values) => {
    setStep((prevStep) => prevStep - 1);
    setValue((prevValue) => prevValue - 100 / 3);
    setBasicData({ ...values });
  };

  const handleSubmit = async (values) => {
    try {
      const res = await userApi.post("/", { ...basicData, ...signUpData });
      await bankDetailsApi.post(`/${res.data.id}`, values);

      setTimeout(() => {
        2000, navigate("/dashboard");
      });
    } catch (err) {
      console.log(err);
      return;
    }
    // console.log({ ...values, ...basicData, ...signUpData });
  };

  const getFormContent = (currStep) => {
    switch (currStep) {
      case 0:
        return (
          <SignUpForm
            data={signUpData}
            onNext={(values) => handleSignUpNext(values)}
          />
        );
      case 1:
        return (
          <BasicDataForm
            data={basicData}
            onNext={(values) => handleBasicNext(values)}
            onBack={(values) => handleBasicBack(values)}
          />
        );
      case 2:
        return <BankDetailsForm onSubmit={handleSubmit} />;

      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <Text className={styles.heading}>Fill your Details Here</Text>
        <Lottie animationData={Animation} />
      </div>
      <div className={styles.content}>
        <Heading as="h2" size="xl" textAlign="center" mb={4}>
          Register for Investment App
        </Heading>
        <br />
        <ProgressBar completed={value} step={step} />
        <br />
        {getFormContent(step)}
      </div>
    </div>
  );
}

export default RegisterPage;
