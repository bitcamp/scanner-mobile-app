import * as yup from "yup";

/**
 * The schema for the login data
 */
const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Not a valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

export default LoginSchema;
