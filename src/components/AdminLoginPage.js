import React, { useState } from "react";

import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import WashmeBackground from "../assets/WashmeBackground.jpg";
import WashmeLogo from "../assets/WashmeLogo.jpg";
import * as Yup from "yup";
import { useFormik } from "formik";
import AuthService from "../services/authService";
import { useHistory } from "react-router-dom";
const theme = createTheme();

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AdminLoginPage() {
  const [message, setMessage] = useState(null);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const history = useHistory();

  const formik = useFormik({
    initialValues: {
      username: "",

      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(20, "Too Long")
        .required("Username is required"),
      password: Yup.string()
        .max(20, "Too Long")
        .required("Password is required"),
    }),
    onSubmit: (event) => {
      AuthService.login(event.username, event.password).then(
        () => {
          history.push("/admindashboard");
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setOpenSnackBar(true);
        }
      );

      formik.resetForm();
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${WashmeBackground})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              style={{ margin: 10, width: "10rem" }}
              src={WashmeLogo}
              alt="WashmeLogo"
            />

            <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
              Admin Sign In
            </Typography>

            <Box
              component="form"
              noValidate
              onSubmit={formik.handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                error={Boolean(
                  formik.touched.username && formik.errors.username
                )}
                helperText={formik.touched.username && formik.errors.username}
                fullWidth
                onChange={formik.handleChange}
                value={formik.values.username}
                label="User Name"
                name="username"
                autoFocus
              />
              <TextField
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                error={Boolean(
                  formik.touched.password && formik.errors.password
                )}
                helperText={formik.touched.password && formik.errors.password}
                onChange={formik.handleChange}
                value={formik.values.password}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                // disabled={formik.isSubmitting}
                sx={{ mt: 3, mb: 2 }}
                style={{ backgroundColor: "yellow", color: "black" }}
              >
                Sign In
              </Button>

              <Grid container>
                <Grid item>
                  <Link href="/" variant="body2" underline="none">
                    {"Back to Home"}
                  </Link>
                </Grid>
              </Grid>
              <Snackbar
                open={openSnackBar}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                autoHideDuration={1500}
                onClose={() => setOpenSnackBar(false)}
              >
                <Alert
                  severity="warning"
                  onClose={() => setOpenSnackBar(false)}
                >
                  {message}
                </Alert>
              </Snackbar>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
