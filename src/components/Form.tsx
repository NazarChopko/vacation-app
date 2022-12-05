import React from "react";
import ReactDOM from "react-dom";
import { useFormik, FormikProps } from "formik";
import * as yup from "yup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import { useAuth } from "../hooks/useAuth";

interface MyValues {
  email: string;
  password: string;
  remember: boolean | any;
}

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const UserForm = () => {
  const { login } = useAuth();

  const formik: FormikProps<MyValues> = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      login(values);
      resetForm();
    },
  });

  return (
    <Box
      sx={{
        width: "500px",
        height: "350px",
        margin: "0 auto",
        border: "2px solid black",
        borderRadius: "6px",
        padding: "20px",
        marginTop: "200px",
      }}
    >
      <Typography
        sx={{ textAlign: "center", paddingBottom: "30px" }}
        variant="h4"
      >
        Login
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <Box height={12} />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <FormControlLabel
          control={
            <Checkbox
              name="remember"
              onChange={formik.handleChange}
              value={formik.values.remember}
              checked={formik.values.remember}
            />
          }
          label="Remember me!"
        />
        <Box height={20} />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Login
        </Button>
      </form>
    </Box>
  );
};

export default UserForm;
