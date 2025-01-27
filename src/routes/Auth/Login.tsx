import { ErrorMessage, Field, Formik, Form } from "formik";
import { LoginValidation } from "../../Validations/LoginValidation";
import Spinner from "../../components/Spinner";
import useLogin from "../../hooks/useLogin";

export const Login = () => {
  const { isLoading, login, error } = useLogin();

  const initialValues = {
    Email: "",
    Password: "",
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={LoginValidation}
      onSubmit={async (o) => {
        login(o.Email, o.Password);
      }}
    >
      <Form className="flex flex-col items-center">
        {isLoading && <Spinner />}
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <h1 className="overlay-title pt-3">Login Page</h1>

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
