import { ErrorMessage, Field, Formik, Form } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { dialogs } from "../dialogs/dialogs";
import auth from "../services/auth-service";
import Spinner from "../components/Spinner";
import useAuth from "../hooks/useAuth";

export const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  const navigate = useNavigate();
  const { login } = useAuth();

  const validationSchema = Yup.object({
    Email: Yup.string().email("Bad Email!").required("The Email is required"),
    Password: Yup.string()
      .required()
      .min(8)
      .max(20)
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_-]).{8,30}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
      ),
  });

  const initialValues = {
    Email: "",
    Password: "",
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(o) => {
        setIsLoading(true);
        setError(null);
        auth
          .login(o.Email, o.Password)
          .then((response) => {
            dialogs.success("Login successful");
            login(response.data.token);
            navigate("/");
          })
          .catch((error) => {
            setError(error.message);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }}
    >
      <Form className="flex flex-col items-center">
        {isLoading && <Spinner />}
        {error && <p className="text-red-500">{error}</p>}

        <div className="font-extralight form-group flex flex-col gap-2 w-1/2 mx-auto text-lg my-4">
          <label htmlFor="Email">Email Address</label>
          <Field
            name="Email"
            type="Email"
            id="Email"
            className="rounded-md hover:border-2 border-2 px-2 py-2"
          />
          <div className="h-0">
            <ErrorMessage
              name="Email"
              component="div"
              className="text-red-500"
            />
          </div>
        </div>

        <div className="font-extralight form-group flex flex-col gap-2 w-1/2 mx-auto text-lg my-4">
          <label htmlFor="Password">Password</label>
          <Field
            name="Password"
            type="Password"
            id="Password"
            className="rounded-md hover:border-2 border-2 px-2 py-2"
          />
          <div className="h-0">
            <ErrorMessage
              name="Password"
              component="div"
              className="text-red-500"
            />
          </div>
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className=" disabled:bg-blue-500/50 w-1/2 block text-left font-bold py-2 px-4 rounded my-4"
        >
          Login
        </button>
      </Form>
    </Formik>
  );
};

export default Login;
