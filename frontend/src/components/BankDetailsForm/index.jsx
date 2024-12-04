import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./BankDetailsForm.module.css";
import { Alert, AlertIcon, Box, Button, Input, VStack } from "@chakra-ui/react";

function BankDetailsForm({ data, onSubmit, onBack }) {
  const formik = useFormik({
    initialValues: {
      ...data,
    },
    validationSchema: Yup.object().shape({
      bankname: Yup.string().required("Bank Name is required"),
      branchname: Yup.string().required("Branch Name is required"),
      ifsc: Yup.string().required("IFSC Number is required"),
      accNo: Yup.string().required("Account Number is required"),
    }),
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await formik.handleSubmit();
  };

  return (
    <form className={styles.form_container} onSubmit={handleFormSubmit}>
      <VStack spacing={3}>
        <Input
          name="bankname"
          placeholder="Bank Name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.bankname}
          data-testid="bankname-input"
        />
        {formik.touched.bankname && formik.errors.bankname ? (
          <Alert borderRadius={5} status="error">
            <AlertIcon />
            {formik.errors.bankname}
          </Alert>
        ) : null}

        <Input
          name="branchname"
          placeholder="Branch Name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.branchname}
          data-testid="branchname-input"
        />
        {formik.touched.branchname && formik.errors.branchname ? (
          <Alert borderRadius={5} status="error">
            <AlertIcon />
            {formik.errors.branchname}
          </Alert>
        ) : null}

        <Input
          name="accNo"
          placeholder="Account Number"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.accNo}
          data-testid="accNo-input"
        />
        {formik.touched.accNo && formik.errors.accNo ? (
          <Alert borderRadius={5} status="error">
            <AlertIcon />
            {formik.errors.accNo}
          </Alert>
        ) : null}

        <Input
          name="ifsc"
          placeholder="IFSC Number"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.ifsc}
          data-testid="ifsc-input"
        />
        {formik.touched.ifsc && formik.errors.ifsc ? (
          <Alert borderRadius={5} status="error">
            <AlertIcon />
            {formik.errors.ifsc}
          </Alert>
        ) : null}

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
            data-testid="submit-button"
          >
            Submit
          </Button>
        </Box>
      </VStack>
    </form>
  );
}

export default BankDetailsForm;
