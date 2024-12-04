import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Input,
  VStack,
  Button,
  Alert,
  AlertIcon,
  InputGroup,
  InputRightElement,
  Box,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { loginApi } from "../../utils/apis";

function LoginForm() {
  const navigate = useNavigate();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const res = await loginApi.post("", values);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.userId);
        navigate("/dashboard");
      } catch (err) {
        console.log(err);
        toast({
          title: "Login Failed....",
          description: err.response.data.token,
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
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
          />
          <InputRightElement>
            <Button onClick={handleIconClick}>
              {/* {showPassword ? <ViewIcon /> : <ViewOffIcon />} */}
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

        <Box className={styles.link_container}>
          <Text>Not Registered ?</Text>
          <Link className={styles.link} to="/register">
            Register Here
          </Link>
        </Box>

        <Button
          width="100%"
          isDisabled={!formik.isValid || formik.isSubmitting}
          type="submit"
          isLoading={formik.isSubmitting}
          loadingText="Logging In...."
        >
          Login
        </Button>
      </VStack>
    </form>
  );
}

export default LoginForm;
