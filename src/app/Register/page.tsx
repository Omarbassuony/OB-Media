// "use client"
// import { useState } from "react";
// import { useFormik } from "formik";
// import * as yup from "yup";
// import { useDispatch, useSelector } from "react-redux";
// import { handleSubmit } from "../../lib/registerSlice";
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// export default function Register() {
//   const dispatch = useDispatch();
//   const { isLoading, isError } = useSelector((state: any) => state.register);
//   const router = useRouter();
//   const registerSchema = yup.object({
//     name: yup.string().required("Name is required").min(2, "Name must be at least 2 characters").max(25, "Name must be less than 25 characters"),
//     email: yup.string().email("Invalid email address").required("Email is required"),
//     password: yup.string().required("Password is required").matches(
//       /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 
//       "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."),
//     rePassword: yup.string().required("Repassword is required").oneOf([yup.ref("password")], "Passwords must match"),
//     dateOfBirth: yup.date().required("Date of birth is required"),
//     gender: yup.string().required("Gender is required"),
//   });

//   const formik = useFormik({
//     initialValues: {
//       name: "",
//       email: "",
//       password: "",
//       rePassword: "",
//       dateOfBirth: "",
//       gender: "",
//     },
//     validationSchema: registerSchema,
//     onSubmit: (values) => {
//       dispatch(handleSubmit(values))
//         .then((apiResponse) => {
//           console.log(apiResponse);
//           if (apiResponse.payload.message === "success") {
//           localStorage.setItem("userToken", apiResponse.token);
//           formik.resetForm();
//           router.push('/Login');
//           }
//         })
//         .catch(() => {});
//     },
//   });
    
//       return (
//           <div className="w-full mx-auto container flex flex-col items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
//           {isError ? (
//            <div className="p-2 w-full md:w-[800px] my-2 text-sm text-red-800 rounded-lg bg-red-100">
//             {isError}
//            </div>
//             ) : null}
//           <h1 className="font-bold text-xl text-blue-600 mb-2">Register Now</h1>
//           <form className="flex flex-col gap-3 w-full md:w-[800px]" onSubmit={formik.handleSubmit}>
//             <label htmlFor="name">Name</label>
//             <input
//               id="name"
//               type="text"
//               placeholder="Name"
//               className="md:w-[800px] rounded-md bg-gray-50 outline-none border border-gray-400 border-opacity-50 px-3 py-1 focus:outline-none focus:ring-0 focus:border-blue-600 focus:drop-shadow-md"
//               autoComplete="off"
//               name="name"
//               value={formik.values.name}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//             />
//             {formik.errors.name && formik.touched.name ? (
//               <div className="p-2  text-sm text-red-800 rounded-lg bg-red-100">
//                 {formik.errors.name}
//               </div>
//             ) : null}
    
//             <label htmlFor="email">Email</label>
//             <input
//               id="email"
//               type="email"
//               placeholder="Email"
//               className="md:w-[800px] rounded-md bg-gray-50 outline-none border border-gray-400 border-opacity-50 px-3 py-1 focus:outline-none focus:ring-0 focus:border-blue-600 focus:drop-shadow-md"
//               autoComplete="off"
//               name="email"
//               value={formik.values.email}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//             />
//             {formik.errors.email && formik.touched.email ? (
//               <div className="p-2 text-sm text-red-800 rounded-lg bg-red-100">
//                 {formik.errors.email}
//               </div>
//             ) : null}
    
//             <label htmlFor="password">Password</label>
//             <input
//               id="password"
//               type="password"
//               placeholder="Password"
//               className="md:w-[800px] rounded-md bg-gray-50 outline-none border border-gray-400 border-opacity-50 px-3 py-1 focus:outline-none focus:ring-0 focus:border-blue-600 focus:drop-shadow-md"
//               autoComplete="off"
//               name="password"
//               value={formik.values.password}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//             />
//             {formik.errors.password && formik.touched.password ? (
//               <div className="p-2 text-sm text-red-800 rounded-lg bg-red-100">
//                 {formik.errors.password}
//               </div>
//             ) : null}
    
//             <label htmlFor="rePassword">Repassword</label>
//             <input
//               id="rePassword"
//               type="password"
//               placeholder="Repassword"
//               className="md:w-[800px] rounded-md bg-gray-50 outline-none border border-gray-400 border-opacity-50 px-3 py-1 focus:outline-none focus:ring-0 focus:border-blue-600 focus:drop-shadow-md"
//               autoComplete="off"
//               name="rePassword"
//               value={formik.values.rePassword}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//             />
//             {formik.errors.rePassword && formik.touched.rePassword ? (
//               <div className="p-2 text-sm text-red-800 rounded-lg bg-red-100">
//                 {formik.errors.rePassword}
//               </div>
//             ) : null}
    
//             <label htmlFor="dateOfBirth">Date of Birth</label>
//             <input
//               id="dateOfBirth"
//               type="date"
//               placeholder="Date of Birth"
//               className="md:w-[800px] rounded-md bg-gray-50 outline-none border border-gray-400 border-opacity-50 px-3 py-1 focus:outline-none focus:ring-0 focus:border-blue-600 focus:drop-shadow-md"
//               autoComplete="off"
//               name="dateOfBirth"
//               value={formik.values.dateOfBirth}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//             />
//             {formik.errors.dateOfBirth && formik.touched.dateOfBirth ? (
//               <div className="p-2 text-sm text-red-800 rounded-lg bg-red-100">
//                 {formik.errors.dateOfBirth}
//               </div>
//             ) : null}
    
//             <label htmlFor="gender">Gender</label>
//             <select
//               id="gender"
//               name="gender"
//               className="md:w-[800px] rounded-md bg-gray-50 outline-none border border-gray-400 border-opacity-50 px-3 py-1 focus:outline-none focus:ring-0 focus:border-blue-600 focus:drop-shadow-md"
//               value={formik.values.gender}
//               onChange={formik.handleChange}
//               onBlur={formik.handleBlur}
//             >
//               <option value="" label="Select gender" disabled/>
//               <option value="male" label="Male" />
//               <option value="female" label="Female" />
//             </select>
//             {formik.errors.gender && formik.touched.gender ? (
//               <div className="p-2 text-sm text-red-800 rounded-lg bg-red-100">
//                 {formik.errors.gender}
//               </div>
//             ) : null}
    
//             <div className="flex items-end flex-col">
//               <button type="submit" className="rounded-md px-4 py-1 bg-blue-600 text-white hover:bg-blue-800">
//                 {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : "Register"}
//               </button>
//               <Link href="/Login" className="text-sm mt-1 block hover:text-blue-600">I already have an account!</Link>
//             </div>
//           </form>
//         </div>
//       );
//     }
"use client";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  CircularProgress,
  Container,
  MenuItem,
  Paper,
  TextField,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import { signUp } from "@/app/redux/slices/signupSlice";
import { useRouter } from "next/navigation";


export default function SignUp() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.signupSlice);

  const { push } = useRouter();
  const currencies = [
    {
      value: "male",
      label: "Male",
    },
    {
      value: "female",
      label: "Female",
    },
  ];

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/^[A-Za-z ]{3,}$/)
      .required("Please enter you name"),
    email: Yup.string()
      .email("Enter Valid E-mail")
      .required("Please enter your email"),
    password: Yup.string()
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Ex:(Ahmed@123)"
      )
      .required("Please enter your password"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Please rePassword")
      .required("Please rePassword"),
    dateOfBirth: Yup.string().required("Please enter your dateOfBirth"),
    gender: Yup.string().required("Please enter your gender"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    validationSchema,
    onSubmit: async (data) => {
      const result = await dispatch(signUp(data));
      if (result.payload == "success") {
        push("/signin");
      }
    },
  });

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      push("/");
      setIsClient(false);
    } else {
      setIsClient(true);
    }
  }, [push]);

  return (
    <>
      {isClient && (
        <Container className="mt-8" maxWidth={"sm"}>
          <Paper className="p-8" elevation={2}>
            <h2 className="text-3xl font-semibold mb-4">SignUp</h2>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                className="w-full mb-4"
                id="name"
                label="Your Name"
                type="text"
                autoComplete="current-name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.name && formik.touched.name && (
                <Alert className="mb-4" variant="filled" severity="error">
                  {formik.errors.name}
                </Alert>
              )}

              <TextField
                className="w-full mb-4"
                id="email"
                label="E-mail"
                type="email"
                autoComplete="current-email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.email && formik.touched.email && (
                <Alert className="mb-4" variant="filled" severity="error">
                  {formik.errors.email}
                </Alert>
              )}

              <TextField
                className="w-full  mb-4"
                id="password"
                label="Password"
                type="password"
                autoComplete="current-password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.password && formik.touched.password && (
                <Alert className="mb-4" variant="filled" severity="error">
                  {formik.errors.password}
                </Alert>
              )}

              <TextField
                className="w-full  mb-4"
                id="rePassword"
                label="rePassword"
                type="password"
                autoComplete="current-rePassword"
                value={formik.values.rePassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.rePassword && formik.touched.rePassword && (
                <Alert className="mb-4" variant="filled" severity="error">
                  {formik.errors.rePassword}
                </Alert>
              )}

              <TextField
                id="gender"
                name="gender"
                select
                label="Select Your Gender"
                className="w-full mb-4"
                value={formik.values.gender}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              {formik.errors.gender && formik.touched.gender && (
                <Alert className="mb-4" variant="filled" severity="error">
                  {formik.errors.gender}
                </Alert>
              )}

              <div className="flex justify-between border p-3 rounded-md border-gray-300 mb-4">
                <label
                  className="flex-grow cursor-pointer text-gray-600"
                  htmlFor="dateOfBirth"
                >
                  dateOfBirth
                </label>
                <input
                  className="cursor-pointer"
                  type="date"
                  name="dateOfBirth"
                  id="dateOfBirth"
                  value={formik.values.dateOfBirth}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.errors.dateOfBirth && formik.touched.dateOfBirth && (
                <Alert className="mb-4" variant="filled" severity="error">
                  {formik.errors.dateOfBirth}
                </Alert>
              )}
              <div className="flex justify-between items-center">
                {loading ? (
                  <Button type="button" variant="contained">
                    <CircularProgress color="inherit" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="contained"
                    endIcon={<LoginIcon />}
                  >
                    SignUp
                  </Button>
                )}
              </div>
            </form>
          </Paper>
          
        </Container>
      )}
    </>
  );
}
