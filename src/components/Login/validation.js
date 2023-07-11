import * as Yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[ -\/:-@\[-\`{-~]).{8,}$/;
const emailRules = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const userLoginValidations = Yup.object({
    email: 
        Yup.string().required('Email is a required field')
        .matches(emailRules,"Email must be a valid email")
        .email("Email must be a valid email"),
    password: 
        Yup.string().required('Password is a required field')
        .min(8,'Password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special character')
        .matches(passwordRules, { message: "Password must have at least one of each: uppercase, lowercase, number and special character" }),
  });