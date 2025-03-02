import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Form, Formik } from "formik";
import useCOCProvider from "../../hooks/useCOCProvider";
import { BuildingTypes } from "../../Types/enums/BuildingTypes";
import { ResourceType } from "../../Types/enums/ResourceType";
import { DamageType } from "../../Types/enums/DamageType";
import { TrapBuildingsModel } from "../../Types/TrapModels/TrapBuildingsModel";
import { TrapBuildingsDataTest } from "../../tests/TrapBuildingData";
import { TrapBuildingsValidation } from "../../Validations/TrapBuildingValidation";
import { FieldGroup } from "../../components/AutoFillEditOrAdd/AutoFillEditOrAdd";
import Spinner from "../../components/Spinner";
import { dialogs } from "../../dialogs/dialogs";

function TrapBuildingEditOrAdd({ mode }: { mode: `add` | `edit` }) {
  const { id } = useParams<{ id: string }>();
  const isEditMode = mode === "edit";
  const { fetchSingleBuilding, updateBuilding, createBuilding } =
    useCOCProvider();

  const [formValues, setFormValues] = useState<TrapBuildingsModel>(
    TrapBuildingsDataTest
  );

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      if (isEditMode && id) {
        try {
          const responseRaw = await fetchSingleBuilding(
            BuildingTypes.TrapBuildings,
            id
          ); // Fetch from server
          const response = responseRaw as TrapBuildingsModel;
          if (response) {
            setFormValues(response); // Set transformed data
          } else {
            console.error(`Trap Building with id ${id} not found.`);
          }
        } catch (error) {
          console.error("Error fetching Trap Building:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setFormValues(TrapBuildingsDataTest); // Default values for add mode
        setLoading(false);
      }
    };
    fetchData();
  }, [isEditMode, id]);

  const onSubmit = async (values: TrapBuildingsModel) => {
    if (isEditMode) {
      try {
        await updateBuilding(BuildingTypes.TrapBuildings, values);
      } catch (error) {
        dialogs.error("Error updating Building");
        console.error("Error updating Trap Building:", error);
      }
    } else {
      try {
        await createBuilding(BuildingTypes.TrapBuildings, values);
      } catch (error) {
        dialogs.error("Error adding Building");
        console.error("Error adding Trap Building:", error);
      }
    }
  };

  return (
    <div className="overlay-container max-w-screen-lg mx-auto p-6">
      <h1 className="overlay-title">
        {isEditMode ? "Edit Trap Building" : "Add Trap Building"}
      </h1>
      {loading && <Spinner></Spinner>}
      <Formik
        initialValues={formValues}
        validationSchema={TrapBuildingsValidation}
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
              label="Picture"
              name="picture"
              setFieldValue={setFieldValue}
            />
            <FieldGroup
              label="Name"
              name="name"
              setFieldValue={setFieldValue}
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
            <FieldGroup
              label="Upgrade Time (Seconds)"
              name="upgradeTimeSeconds"
              type="number"
              setFieldValue={setFieldValue}
              parseValue={(value) => parseInt(value, 10) || 0}
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
              label="Damage Type"
              name="damageType.damageType"
              as="select"
              options={Object.values(DamageType)}
              setFieldValue={setFieldValue}
            />
            <FieldGroup
              label="Damage Radius"
              name="damageType.damageRadius"
              type="number"
              setFieldValue={setFieldValue}
              parseValue={(value) => parseFloat(value) || 0}
            />
            <FieldGroup
              label="Damage"
              name="damageType.damage"
              type="number"
              setFieldValue={setFieldValue}
              parseValue={(value) => parseInt(value, 10) || 0}
            />
            <FieldGroup
              label="Trigger Radius"
              name="triggerRadius"
              type="number"
              setFieldValue={setFieldValue}
              parseValue={(value) => parseFloat(value) || 0}
            />
            <FieldGroup
              label="Spawned Units"
              name="spawnedUnits"
              type="number"
              setFieldValue={setFieldValue}
              parseValue={(value) => parseInt(value, 10) || 0}
            />
            <div className="mt-4">
              <button type="submit" className="btn btn-primary">
                {isEditMode ? "Update Trap Building" : "Add Trap Building"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default TrapBuildingEditOrAdd;
