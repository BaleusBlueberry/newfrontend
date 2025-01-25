import { ErrorMessage, Field, Form, Formik } from "formik";
import { UpdateUserValidation } from "../../Validations/UpdateUserValidation";
import { editprofileModel } from "../../services/@types";
import auth from "../../services/auth-service";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { UserDataEditModel } from "../../Types/userDataModels/UserDataModel";
import Spinner from "../../components/Spinner";
import { transformUserData } from "../../Types/userDataModels/UserDataForUpdateToModel";

const EditProfile = () => {
  const { getSingleUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const initialValues = {
    UserId: "",
    ElectronicLocation: "",
    UseByName: "",
    OldPas: "",
    NewPas: "",
  };
  const [formValues, setFormValues] =
    useState<UserDataEditModel>(initialValues);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const responseRaw = await getSingleUser();
        if (responseRaw) {
          const response = {
            UserId: responseRaw.userId || "",
            ElectronicLocation: responseRaw.email || "",
            UseByName: responseRaw.userName || "",
            OldPas: "",
            NewPas: "",
          };
          setFormValues(response);
          setLoading(false);
        } else {
          console.error(`Building with id was not found.`);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const onSubmitfunction = async (values: UserDataEditModel) => {
    try {
      const response = await auth.edit(transformUserData(values));
      if (response.status == 204) {
        console.log("user updated successfully:", values);
      }
    } catch (error) {
      console.error("Error updating Building:", error);
    }
  };

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <Formik
          initialValues={formValues}
          validationSchema={UpdateUserValidation}
          onSubmit={(o) => {
            onSubmitfunction(o);
          }}
          enableReinitialize
        >
          <Form className="flex flex-col items-center">
            <h1 className="overlay-title">
              Edit Profile{" "}
              <span className="text-gray-500 italic">
                (current user: {formValues.UseByName})
              </span>
            </h1>
            <div className=" hidden">
              <Field type="hidden" name="UserId" value={formValues.UserId} />
            </div>
            <div className="font-extralight form-group flex flex-col gap-2 w-1/2 mx-auto text-lg my-4">
              <label htmlFor="UseByName">User Name</label>
              <Field
                autoComplete="off"
                name="UseByName"
                type="text"
                id="UseByName"
                className="rounded-md hover:border-2 border-2 px-2 py-2"
              />
              <div className="h-0">
                <ErrorMessage
                  name="UseByName"
                  component="div"
                  className="error-message"
                />
              </div>
            </div>

            <div className="font-extralight form-group flex flex-col gap-2 w-1/2 mx-auto text-lg my-4">
              <label htmlFor="ElectronicLocation">Email Address</label>
              <Field
                autoComplete="off"
                name="ElectronicLocation"
                type="Email"
                id="ElectronicLocation"
                className="rounded-md hover:border-2 border-2 px-2 py-2"
              />
              <div className="h-0">
                <ErrorMessage
                  name="ElectronicLocation"
                  component="div"
                  className="error-message"
                />
              </div>
            </div>

            <div className="font-extralight form-group flex flex-col gap-2 w-1/2 mx-auto text-lg my-4">
              <label htmlFor="Password">Old Password</label>
              <Field
                autoComplete="off"
                name="OldPas"
                type="text"
                id="OldPas"
                className="rounded-md hover:border-2 border-2 px-2 py-2"
              />
              <div className="h-0">
                <ErrorMessage
                  name="OldPas"
                  component="div"
                  className="error-message"
                />
              </div>
            </div>

            <div className="font-extralight form-group flex flex-col gap-2 w-1/2 mx-auto text-lg my-4">
              <label htmlFor="NewPas">Confirm Password</label>
              <Field
                autoComplete="off"
                name="NewPas"
                type="text"
                id="NewPas"
                className="rounded-md hover:border-2 border-2 px-2 py-2"
              />
              <div className="h-1">
                <ErrorMessage
                  name="NewPas"
                  component="div"
                  className="error-message"
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-blue-500 disabled:bg-blue-500/50 w-1/2   block text-lef font-bold py-2 px-4 rounded my-4"
            >
              Register
            </button>
          </Form>
        </Formik>
      )}
    </div>
  );
};

export default EditProfile;
