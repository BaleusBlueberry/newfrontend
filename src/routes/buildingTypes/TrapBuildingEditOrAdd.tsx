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
import OverlaySelectTime from "../../components/OverlaySelectTime";

function TrapBuildingEditOrAdd({ mode }: { mode: `add` | `edit` }) {
  const { id } = useParams<{ id: string }>();
  const { buildingName } = useParams<{ buildingName: string }>();
  const isEditMode = mode === "edit";
  const isAddMode = mode === "add";
  const {
    fetchSingleBuilding,
    updateBuilding,
    createBuilding,
    fetchHighestLevelBuilding,
  } = useCOCProvider();

  const [formValues, setFormValues] = useState<TrapBuildingsModel>(
    TrapBuildingsDataTest
  );

  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const toggleOverlay = () => {
    setIsOverlayOpen(!isOverlayOpen);
  };
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        // EDIT MODE
        if (isEditMode && id) {
          const responseRaw = await fetchSingleBuilding(
            BuildingTypes.TrapBuildings,
            id
          );
          const response = responseRaw as TrapBuildingsModel;
          if (response) {
            setFormValues(response);
          } else {
            console.error(`Building with id ${id} not found.`);
            dialogs.error(`Building with id ${id} not found.`);
          }
          // ADD MODE
        } else if (
          isAddMode &&
          buildingName.length !== 0 &&
          buildingName !== "newbuilding"
        ) {
          const response = await fetchHighestLevelBuilding(
            BuildingTypes.TrapBuildings,
            buildingName
          );
          const highestBuildingLevel = response as TrapBuildingsModel;
          if (highestBuildingLevel) {
            setFormValues({
              ...highestBuildingLevel,
              level: highestBuildingLevel.level + 1,
              name: buildingName,
            });
          } else {
            console.error(`highest Building Level was not found.`);
            dialogs.error(`highest Building Level was not found.`);
          }
        } else {
          // fallback/default
          setFormValues(TrapBuildingsDataTest);
        }
      } catch (error) {
        console.error("Error fetching Building:", error);
        dialogs.error(`Error fetching Building:, ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isEditMode, id, buildingName]);

  const onSubmit = async (values: TrapBuildingsModel) => {
    const capitalValues: TrapBuildingsModel = {
      ...values,
      name: values.name.charAt(0).toUpperCase() + String(values.name).slice(1),
    };
    if (isEditMode) {
      try {
        await updateBuilding(BuildingTypes.TrapBuildings, capitalValues);
      } catch (error) {
        dialogs.error("Error updating Building");
        console.error("Error updating Trap Building:", error);
      }
    } else {
      try {
        await createBuilding(BuildingTypes.TrapBuildings, capitalValues);
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

export default TrapBuildingEditOrAdd;
