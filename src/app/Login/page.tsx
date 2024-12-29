// "use client";

// import { useEffect, useState } from "react";
// import { useFormik } from "formik";
// import * as yup from "yup";
// import { useDispatch, useSelector } from "react-redux";
// import { handleSubmit } from "../../lib/loginSlice";
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';

// export default function Login() {
//   const dispatch = useDispatch();
//   const { isLoading, isError } = useSelector((state: any) => state.login);
//   const router = useRouter();

//   const loginSchema = yup.object({
//     email: yup.string().email("Invalid email address").required("Email is required"),
//     password: yup.string().required("Password is required"),
//   });

//   const formik = useFormik({
//     initialValues: {
//       email: "",
//       password: "",
//     },
//     validationSchema: loginSchema,
//     onSubmit: async (values) => {
//       try {
//         const apiResponse = await dispatch(handleSubmit(values));
//         console.log(apiResponse);
//         if (apiResponse.payload && apiResponse.payload.message === "success") {
//           localStorage.setItem("userToken", apiResponse.payload.token);
//           formik.resetForm();
//           router.push('/');
//         }
//       } catch (error) {
//         console.error("Login submission error:", error);
//       }
//     },
//   });



//   return (
//     <div className="w-full mx-auto container flex flex-col items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
//       {isError && (
//         <div className="p-2 w-full md:w-[800px] my-2 text-sm text-red-800 rounded-lg bg-red-100">
//           {isError}
//         </div>
//       )}
//       <h1 className="font-bold text-xl text-blue-600 mb-2">Login Now</h1>
//       <form className="flex flex-col gap-3 w-full md:w-[800px]" onSubmit={formik.handleSubmit}>
//         <label htmlFor="email">Email</label>
//         <input
//           id="email"
//           type="email"
//           placeholder="Email"
//           className="md:w-[800px] rounded-md bg-gray-50 outline-none border border-gray-400 border-opacity-50 px-3 py-1 focus:outline-none focus:ring-0 focus:border-blue-600 focus:drop-shadow-md"
//           autoComplete="off"
//           name="email"
//           value={formik.values.email}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//         />
//         {formik.errors.email && formik.touched.email && (
//           <div className="p-2 text-sm text-red-800 rounded-lg bg-red-100">
//             {formik.errors.email}
//           </div>
//         )}

//         <label htmlFor="password">Password</label>
//         <input
//           id="password"
//           type="password"
//           placeholder="Password"
//           className="md:w-[800px] rounded-md bg-gray-50 outline-none border border-gray-400 border-opacity-50 px-3 py-1 focus:outline-none focus:ring-0 focus:border-blue-600 focus:drop-shadow-md"
//           autoComplete="off"
//           name="password"
//           value={formik.values.password}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//         />
//         {formik.errors.password && formik.touched.password && (
//           <div className="p-2 text-sm text-red-800 rounded-lg bg-red-100">
//             {formik.errors.password}
//           </div>
//         )}
//         <div className="flex items-end flex-col">
//           <button type="submit" className="rounded-md px-4 py-1 bg-blue-600 text-white hover:bg-blue-800">
//             {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : "Login"}
//           </button>
//           <Link href="/Register" className="text-sm mt-1 block hover:text-blue-600">I don't have an account!</Link>
//         </div>
//       </form>
//     </div>
//   );
// }
"use client";
import {
  Alert,
  Button,
  CircularProgress,
  Container,
  Paper,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import LoginIcon from "@mui/icons-material/Login";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/redux/store";
import { signIn } from "@/app/redux/slices/loginSlice";
import { useRouter } from "next/navigation";

export default function SignIN() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading } = useSelector((state: RootState) => state.loginSlice);
  const { push } = useRouter();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Enter Valid E-mail")
      .required("Please enter your email"),
    password: Yup.string()
      .matches(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Ex:(Ahmed@123)"
      )
      .required("Please enter your password"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (data) => {
      await dispatch(signIn(data));
      if (localStorage.getItem("token")) {
        push("/");
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
            <h2 className="text-3xl font-semibold mb-4">SignIn</h2>
            <form onSubmit={formik.handleSubmit}>
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
                className="w-full relative mb-4"
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
                  SignIn
                </Button>
              )}
            </form>
          </Paper>
          
        </Container>
      )}
    </>
  );
}
