import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Form, Formik } from "formik";
import useCOCProvider from "../../hooks/useCOCProvider";
import { BuildingTypes } from "../../Types/enums/BuildingTypes";
import { ResourceBuildingsDataTest } from "../../tests/ResourceBuildingsDataTest";
import { ResourceBuildingsModel } from "../../Types/ResourceModels/ResourceBuildingsModel";
import { ResourceType } from "../../Types/enums/ResourceType";
import { ResourceBuildingValidation } from "../../Validations/ResourceBuildingValidation";
import { FieldGroup } from "../../components/AutoFillEditOrAdd/AutoFillEditOrAdd";
import Spinner from "../../components/Spinner";
import { dialogs } from "../../dialogs/dialogs";
import OverlaySelectTime from "../../components/OverlaySelectTime";

function ResourceBuildingEditOrAdd({ mode }: { mode: `add` | `edit` }) {
  const { id } = useParams<{ id: string }>();
  const isEditMode = mode === "edit";
  const { fetchSingleBuilding, updateBuilding, createBuilding } =
    useCOCProvider();

  const [formValues, setFormValues] = useState<ResourceBuildingsModel>(
    ResourceBuildingsDataTest
  );
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const toggleOverlay = () => {
    setIsOverlayOpen(!isOverlayOpen);
  };

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      if (isEditMode && id) {
        try {
          const responseRaw = await fetchSingleBuilding(
            BuildingTypes.ResourceBuildings,
            id
          ); // Fetch from server
          const response = responseRaw as ResourceBuildingsModel;

          console.log(response);
          if (response) {
            setFormValues(response);
          } else {
            console.error(`Building with id ${id} not found.`);
          }
        } catch (error) {
          console.error("Error fetching Building:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setFormValues(ResourceBuildingsDataTest); // Default values for add mode
        setLoading(false);
      }
    };
    fetchData();
  }, [isEditMode, id]);

  const onSubmit = async (values: ResourceBuildingsModel) => {
    if (isEditMode) {
      try {
        await updateBuilding(BuildingTypes.ResourceBuildings, values);
      } catch (error) {
        dialogs.error("Error updating Building");
        console.error("Error updating Building:", error);
      }
    } else {
      try {
        await createBuilding(BuildingTypes.ResourceBuildings, values);
      } catch (error) {
        dialogs.error("Error adding Building");
        console.error("Error adding Building: ", error);
      }
    }
  };

  return (
    <div className="overlay-container max-w-screen-lg mx-auto p-6">
      <h1 className="overlay-title">
        {isEditMode ? "Edit Resource Building" : "Add Resource Building"}
      </h1>
      {loading && <Spinner />}
      <Formik
        initialValues={formValues}
        validationSchema={ResourceBuildingValidation}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ setFieldValue }) => (
          <Form className="overlay-content flex flex-col items-center">
            <FieldGroup
              label="Level"
              name="level"
              type="number"
              setFieldValue={setFieldValue}
              parseValue={(value) => parseInt(value, 10) || 0}
            />
            <FieldGroup
              label="Name"
              name="name"
              type="text"
              setFieldValue={setFieldValue}
            />
            <FieldGroup
              label="Picture"
              name="picture"
              type="text"
              setFieldValue={setFieldValue}
            />
            <FieldGroup
              label="Building Type"
              name="buildingType"
              as="select"
              options={Object.values(BuildingTypes)}
              setFieldValue={setFieldValue}
            />
            <FieldGroup
              label="Resource Type"
              name="upgradeCost.resourceType"
              as="select"
              options={Object.values(ResourceType)}
              setFieldValue={setFieldValue}
            />
            <FieldGroup
              label="Upgrade Cost"
              name="upgradeCost.cost"
              type="number"
              setFieldValue={setFieldValue}
              parseValue={(value) => parseInt(value, 10) || 0}
            />
            <FieldGroup
              label="HP"
              name="hp"
              type="number"
              setFieldValue={setFieldValue}
              parseValue={(value) => parseInt(value, 10) || 0}
            />
            <FieldGroup
              label="Experience"
              name="experience"
              type="number"
              setFieldValue={setFieldValue}
              parseValue={(value) => parseInt(value, 10) || 0}
            />
            <FieldGroup
              label="Town Hall Level"
              name="townHallLevel"
              type="number"
              setFieldValue={setFieldValue}
              parseValue={(value) => parseInt(value, 10) || 0}
            />
            <div className="grid grid-cols-3 gap-4 items-center">
              <button
                type="button"
                className="btn btn-primary mt-2"
                onClick={() => toggleOverlay()}
              >
                Calculate Time
              </button>
              <div className="col-span-2">
                <FieldGroup
                  label="Upgrade Time (Seconds)"
                  name="upgradeTimeSeconds"
                  type="number"
                  setFieldValue={setFieldValue}
                  parseValue={(value) => parseInt(value, 10) || 0}
                />
              </div>
            </div>
            <FieldGroup
              label="Production Rate"
              name="productionRate"
              type="number"
              setFieldValue={setFieldValue}
              parseValue={(value) => parseFloat(value) || 0}
            />

            <FieldGroup
              label="Storage Capacity Gold"
              name="storageCapacityGold"
              type="number"
              setFieldValue={setFieldValue}
              parseValue={(value) => parseFloat(value) || 0}
            />
            <FieldGroup
              label="Storage Capacity Elixir"
              name="storageCapacityElixir"
              type="number"
              setFieldValue={setFieldValue}
              parseValue={(value) => parseFloat(value) || 0}
            />
            <FieldGroup
              label="Storage Capacity DarkElixir"
              name="storageCapacityDarkElixir"
              type="number"
              setFieldValue={setFieldValue}
              parseValue={(value) => parseFloat(value) || 0}
            />

            {/* Submit Button */}
            <div className="mt-4">
              <button type="submit" className="btn btn-primary">
                {isEditMode ? "Update Building" : "Add Building"}
              </button>
            </div>
            <OverlaySelectTime
              isOverlayOpen={isOverlayOpen}
              onClose={() => toggleOverlay()}
              onTimeCalculated={(seconds) => {
                setFieldValue("upgradeTimeSeconds", seconds);
              }}
              timeInSeconds={formValues.upgradeTimeSeconds}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default ResourceBuildingEditOrAdd;
