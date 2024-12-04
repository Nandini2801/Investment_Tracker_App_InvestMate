import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./BasicDataForm.module.css";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Input,
  Select,
  VStack,
} from "@chakra-ui/react";

function BasicDataForm({ data, onNext, onBack }) {
  const formik = useFormik({
    initialValues: {
      ...data,
    },
    validationSchema: Yup.object().shape({
      fname: Yup.string().required("First Name is required"),
      lname: Yup.string().required("Last Name is required"),
      dob: Yup.date()
        .max(new Date(), "Date of Birth must be less than today")
        .required("Date of Birth is required"),
      phone: Yup.string()
        .min(10, "Number must be at least 10 digits")
        .required("Mobile Number is required"),
      gender: Yup.string().required("Gender is required"),
    }),
    onSubmit: (values) => {
      onNext(values);
    },
  });

  return (
    <form className={styles.form_container} onSubmit={formik.handleSubmit}>
      <VStack spacing={3}>
        <Input
          name="fname"
          placeholder="First Name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.fname}
          data-testid="fname-input"
        />
        {formik.touched.fname && formik.errors.fname ? (
          <Alert borderRadius={5} status="error">
            <AlertIcon />
            {formik.errors.fname}
          </Alert>
        ) : null}

        <Input
          name="lname"
          placeholder="Last Name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.lname}
          data-testid="lname-input"
        />
        {formik.touched.lname && formik.errors.lname ? (
          <Alert borderRadius={5} status="error">
            <AlertIcon />
            {formik.errors.lname}
          </Alert>
        ) : null}

        <Input
          name="address"
          placeholder="Address"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.address}
          data-testid="address-input"
        />
        {formik.touched.address && formik.errors.address ? (
          <Alert borderRadius={5} status="error">
            <AlertIcon />
            {formik.errors.address}
          </Alert>
        ) : null}

        <Input
          name="dob"
          placeholder="Date of Birth"
          type="date"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.dob}
          data-testid="dob-input"
        />
        {formik.touched.dob && formik.errors.dob ? (
          <Alert borderRadius={5} status="error">
            <AlertIcon />
            {formik.errors.dob}
          </Alert>
        ) : null}

        <Input
          name="phone"
          placeholder="Phone Number"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.phone}
          data-testid="phone-input"
        />
        {formik.touched.phone && formik.errors.phone ? (
          <Alert borderRadius={5} status="error">
            <AlertIcon />
            {formik.errors.phone}
          </Alert>
        ) : null}

        <Select
          value={formik.values.gender}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name="gender"
          placeholder="Gender"
          data-testid="gender-select"
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </Select>

        <Box width={"100%"} display={"flex"} gap={20}>
          <Button
            width="100%"
            type="submit"
            isLoading={formik.isSubmitting}
            onClick={() => onBack(formik.values)}
            data-testid="back-button"
          >
            Back
          </Button>
          <Button
            width="100%"
            isDisabled={!formik.isValid || formik.isSubmitting}
            type="submit"
            isLoading={formik.isSubmitting}
            data-testid="next-button"
          >
            Next
          </Button>
        </Box>
      </VStack>
    </form>
  );
}

export default BasicDataForm;
