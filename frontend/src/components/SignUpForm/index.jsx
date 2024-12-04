import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./SignUpForm.module.css";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link } from "react-router-dom";

function SignUpForm({ data, onNext }) {
  const [showPassword, setShowPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      ...data,
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: (values) => {
      onNext(values);
    },
  });

  const handleIconClick = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form className={styles.form_container} onSubmit={formik.handleSubmit}>
      <VStack spacing={3}>
        <Input
          name="email"
          placeholder="Email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <Alert borderRadius={5} status="error">
            <AlertIcon />
            {formik.errors.email}
          </Alert>
        ) : null}

        <InputGroup>
          <Input
            name="password"
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          <InputRightElement>
            <Button onClick={handleIconClick}>
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </Button>
          </InputRightElement>
        </InputGroup>
        {formik.touched.password && formik.errors.password ? (
          <Alert borderRadius={5} status="error">
            <AlertIcon />
            {formik.errors.password}
          </Alert>
        ) : null}

        <InputGroup>
          <Input
            name="confirmPassword"
            placeholder="Confirm Password"
            type={showPassword ? "text" : "password"}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
          <InputRightElement>
            <Button onClick={handleIconClick}>
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </Button>
          </InputRightElement>
        </InputGroup>
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <Alert borderRadius={5} status="error">
            <AlertIcon />
            {formik.errors.confirmPassword}
          </Alert>
        ) : null}

        <Box className={styles.link_container}>
          <Text>Already Registered ?</Text>
          <Link className={styles.link} to="/login">
            Login Here
          </Link>
        </Box>

        <Button
          width="100%"
          isDisabled={!formik.isValid || formik.isSubmitting}
          type="submit"
          isLoading={formik.isSubmitting}
        >
          Next
        </Button>
      </VStack>
    </form>
  );
}

export default SignUpForm;
