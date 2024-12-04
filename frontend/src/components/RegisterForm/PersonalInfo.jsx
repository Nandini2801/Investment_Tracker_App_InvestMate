import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css"; 

import "./RegisterForm.css";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  dateOfBirth: Yup.date().nullable().required('Date of Birth is required'),
  mobileNumber: Yup.string().min(10, 'Number must be at least 10 digits').required('Mobile Number is required'),
  gender: Yup.string().required('Gender is required'),
});

function PersonalInfo({ formData, setFormData }) {
  const initialValues = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    username: formData.username,
    dateOfBirth: formData.dateOfBirth,
    mobileNumber: formData.mobileNumber,
    gender: formData.gender,
  };

  const handleSubmit = (values) => {
    setFormData({ ...formData, ...values });
  };

  return (
    <div className="personal-info-container">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="form-group">
            <Field
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First Name..."
            />
            <ErrorMessage name="firstName" component="div" className="error" />
          </div>

          <div className="form-group">
            <Field
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last Name..."
            />
            <ErrorMessage name="lastName" component="div" className="error" />
          </div>

          <div className="form-group">
          <DatePicker
            id="dateOfBirth"
            name="dateOfBirth"
            placeholderText="Date Of Birth..."
            selected={formData.dateOfBirth}
            onChange={(date) => setFormData({ ...formData, dateOfBirth: date })}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            dateFormat="dd/MM/yyyy" 
            className="input-field"
          />
            <ErrorMessage name="dateOfBirth" component="div" className="error" />
          </div>

          <div className="form-group">
            <Field
              type="text"
              id="mobileNumber"
              name="mobileNumber"
              placeholder="Mobile Number..."
            />
            <ErrorMessage name="mobileNumber" component="div" className="error" />
          </div>

          <div className="form-group">
          <select
            name="gender"
            value={formData.gender}
            onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
            className="input-field"
          >
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            
          </select>
            <ErrorMessage name="gender" component="div" className="error" />
          </div>

          <br></br>
          <button type="submit" className="save-button">Save</button>         </Form>
      </Formik>
    </div>
  );
}

export default PersonalInfo;
