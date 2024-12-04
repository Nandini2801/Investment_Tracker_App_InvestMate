import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import "./RegisterForm.css";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

function SignUpInfo({ formData, setFormData }) {
  const initialValues = {
    email: formData.email,
    password: formData.password,
    confirmPassword: formData.confirmPassword,
  };

  const handleSubmit = (values) => {
    setFormData({ ...formData, ...values });
  };

  return (
    <div className="sign-up-container">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="form-group">
            <Field type="text" id="email" name="email" placeholder="Email..." />
            <ErrorMessage name="email" component="div" className="error" />
          </div>
          <div className="form-group">
            <Field
              type="password"
              id="password"
              name="password"
              placeholder="Password..."
            />
            <ErrorMessage name="password" component="div" className="error" />
          </div>
          <div className="form-group">
            <Field
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password..."
            />
            <ErrorMessage
              name="confirmPassword"
              component="div"
              className="error"
            />
          </div>
          <br></br>
          <button type="submit" className="save-button">
            Save
          </button>{" "}
        </Form>
      </Formik>
    </div>
  );
}

export default SignUpInfo;
