import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import * as Yup from "yup";
import { useFormik } from "formik";
import AuthService from "../services/authService";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function CreateUser() {
  const [checkRole, setCheckRole] = useState("");
  const [message, setMessage] = useState(null);
  const [openSnackBar, setOpenSnackBar] = useState(false);

  const checkTheRole = (event) => {
    setCheckRole(...event);
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      roles: [""],
      branch: null,
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
      AuthService.register(
        event.username,
        event.password,
        event.roles,
        event.branch
      ).then(
        () => {
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
      setTimeout(()=>{ window.location.reload()},1600)
    },
  });

  return (
    <div align="center">
      <h3>Create User</h3>
      <Box
        component="form"
        noValidate
        onSubmit={formik.handleSubmit}
        sx={{ width: "40%" }}
      >
        <TextField
          margin="normal"
          error={Boolean(formik.touched.username && formik.errors.username)}
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
          error={Boolean(formik.touched.password && formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <InputLabel id="role-select">
          Role (Won't show selected value)
        </InputLabel>
        <Select
          labelId="role-select"
          value={formik.values.roles}
          label="Role"
          sx={{ width: "80%" }}
          onChange={(event) =>
            formik.setFieldValue("roles", event.target.value) &&
            checkTheRole(event.target.value)
          }
        >
          <MenuItem value={["user"]}>User</MenuItem>
          <MenuItem value={["admin"]}>Admin</MenuItem>
        </Select>
        <InputLabel id="branch-select">
          Branch (Won't show if admin role is selected)
        </InputLabel>
        {checkRole === "user" && (
          <Select
            labelId="branch-select"
            value={formik.values.branch}
            label="Role"
            sx={{ width: "80%" }}
            onChange={(event) =>
              formik.setFieldValue("branch", event.target.value)
            }
          >
            <MenuItem value={"userone"}>One</MenuItem>
            <MenuItem value={"usertwo"}>Two</MenuItem>
            <MenuItem value={"userthree"}>Three</MenuItem>
            <MenuItem value={"userfour"}>Four</MenuItem>
            <MenuItem value={"userfive"}>Five</MenuItem>
            <MenuItem value={"usersix"}>Six</MenuItem>
            <MenuItem value={"userseven"}>Seven</MenuItem>
            <MenuItem value={"usereight"}>Eight</MenuItem>
            <MenuItem value={"usernine"}>Nine</MenuItem>
            <MenuItem value={"userten"}>Ten</MenuItem>
          </Select>
        )}

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, width: "40%" }}
          style={{ backgroundColor: "yellow", color: "black" }}
        >
          Submit
        </Button>
     
        <Snackbar
          open={openSnackBar}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          autoHideDuration={1500}
          onClose={() => setOpenSnackBar(false)}
        >
          <Alert severity="warning" onClose={() => setOpenSnackBar(false)}>
            {message}
          </Alert>
        </Snackbar>
      </Box>
    </div>
  );
}

export default CreateUser;
