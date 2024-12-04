import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import "./RegisterForm.css";

const validationSchema = Yup.object().shape({
  accountType: Yup.string().required('Account Type is required'),
  startingBalance: Yup.number().min(0, 'Starting Balance must be greater than or equal to 0').required('Starting Balance is required'),
});


function OtherInfo({ formData, setFormData }) {
  const initialValues = {
    accountType: formData.accountType,
    startingBalance: formData.startingBalance,
  };

  const handleSubmit = (values) => {
    setFormData({ ...formData, ...values });
  };

  return (
    <div className="other-info-container">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="form-group">
          <select
            name="gender"
            value={formData.gender}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            className="input-field"
          >
            <option value="">Account Type</option>
            <option value="savings">Savings</option>
            <option value="current">Current</option>
            <option value="dmat">DMAT</option>
          </select>
            <ErrorMessage name="accountType" component="div" className="error" />
          </div>

          <div className="form-group">
            <Field
              type="text"
              id="startingBalance"
              name="startingBalance"
              placeholder="Starting Balance"
              className="input-field"
            />
            <ErrorMessage name="startingBalance" component="div" className="error" />
          </div>
          <br></br>
          <button type="submit" className="save-button">Save</button> 
        </Form>
      </Formik>
    </div>
  );
}

export default OtherInfo;
