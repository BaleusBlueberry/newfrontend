import { ErrorMessage, Field, Form, Formik } from "formik";
import { RegisterValidation } from "../../Validations/RegisterValidation";
import useLogin from "../../hooks/useLogin";
import Spinner from "../../components/Spinner";

const Register = () => {
  const { register, error, isLoading } = useLogin();

  const initialValues = {
    Email: "",
    Username: "",
    Password: "",
    PasswordConfirm: "",
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={RegisterValidation}
      onSubmit={(o) => {
        register(o);
      }}
    >
      <Form className="flex flex-col items-center">
        {isLoading && <Spinner />}
        {error && <p className="text-red-500">{error}</p>}{" "}
        <h1 className="overlay-title pt-2">Register</h1>
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
              className="error-message"
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
              className="error-message"
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
              className="error-message"
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
              className="error-message"
            />
          </div>
        </div>
        <button
          disabled={isLoading}
          type="submit"
          className="bg-blue-500 disabled:bg-blue-500/50 w-1/2   block text-lef font-bold py-2 px-4 rounded my-4"
        >
          Register
        </button>
      </Form>
    </Formik>
  );
};

export default Register;
