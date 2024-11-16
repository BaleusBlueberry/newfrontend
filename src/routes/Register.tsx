import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import Spinner from "../components/Spinner";
import { dialogs } from "../dialogs/dialogs";
import auth from "../services/auth-service";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  const navigate = useNavigate();

  const validationSchema = Yup.object({
    Email: Yup.string().email("Bad Email!").required("The Email is required"),
    Username: Yup.string().required().min(2).max(20),
    Password: Yup.string()
      .required()
      .min(8)
      .max(20)
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_-]).{8,30}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
      ),
    PasswordConfirm: Yup.string()
      .required()
      .oneOf([Yup.ref("Password")], "Passwords must match"),
  });

  const initialValues = {
    Email: "",
    Username: "",
    Password: "",
    PasswordConfirm: "",
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(o) => {
        setIsLoading(true);
        auth
          .register(o.Email, o.Username, o.Password, o.PasswordConfirm)
          .then(() => {
            dialogs.success("Registered successfully!!!!");
            navigate("/login");
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
          <label htmlFor="Username">User Name</label>
          <Field
            name="Username"
            type="text"
            id="Username"
            className="rounded-md hover:border-2 border-2 px-2 py-2"
          />
          <div className="h-0">
            <ErrorMessage
              name="Username"
              component="div"
              className="text-red-500"
            />
          </div>
        </div>

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

        <div className="font-extralight form-group flex flex-col gap-2 w-1/2 mx-auto text-lg my-4">
          <label htmlFor="PasswordConfirm">Confirm Password</label>
          <Field
            name="PasswordConfirm"
            type="Password"
            id="PasswordConfirm"
            className="rounded-md hover:border-2 border-2 px-2 py-2"
          />
          <div className="h-1">
            <ErrorMessage
              name="PasswordConfirm"
              component="div"
              className="text-red-500"
            />
          </div>
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className="bg-blue-500 disabled:bg-blue-500/50 w-1/2   block text-left hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-4"
        >
          Register
        </button>
      </Form>
    </Formik>
  );
};

export default Register;
