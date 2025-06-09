import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Form, Formik } from "formik";
import useCOCProvider from "../../hooks/useCOCProvider";
import { BuildingTypes } from "../../Types/enums/BuildingTypes";
import { ResourceType } from "../../Types/enums/ResourceType";
import { DefensiveBuildingsModel } from "../../Types/DefensiveModels/DefensiveBuildingsModel";
import { DefensiveBuildingsDataTest } from "../../tests/DefensiveBuildingData";
import { DefensiveBuildingsValidation } from "../../Validations/DefensiveBuildingValidation";
import { FieldGroup } from "../../components/AutoFillEditOrAdd/AutoFillEditOrAdd";
import Spinner from "../../components/Spinner";
import { DamageType } from "../../Types/enums/DamageType";
import { dialogs } from "../../dialogs/dialogs";
import OverlaySelectTime from "../../components/OverlaySelectTime";

function DefensiveBuildingEditOrAdd({ mode }: { mode: `add` | `edit` }) {
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

  const [formValues, setFormValues] = useState<DefensiveBuildingsModel>(
    DefensiveBuildingsDataTest
  );

  const [loading, setLoading] = useState<boolean>(true);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const toggleOverlay = () => {
    setIsOverlayOpen(!isOverlayOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        // EDIT MODE
        if (isEditMode && id) {
          const responseRaw = await fetchSingleBuilding(
            BuildingTypes.DefensiveBuildings,
            id
          );
          const response = responseRaw as DefensiveBuildingsModel;
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
            BuildingTypes.DefensiveBuildings,
            buildingName
          );
          const highestBuildingLevel = response as DefensiveBuildingsModel;
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
          setFormValues(DefensiveBuildingsDataTest);
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

  const onSubmit = async (values: DefensiveBuildingsModel) => {
    const capitalValues: DefensiveBuildingsModel = {
      ...values,
      name: values.name.charAt(0).toUpperCase() + String(values.name).slice(1),
    };

    if (isEditMode) {
      try {
        await updateBuilding(BuildingTypes.DefensiveBuildings, capitalValues);
      } catch (error) {
        console.error("Error updating Building:", error);
      }
    } else {
      try {
        await createBuilding(BuildingTypes.DefensiveBuildings, capitalValues);
      } catch (error) {
        console.error("Error adding Building:", error);
      }
    }
  };

  return (
    <div className="overlay-container max-w-screen-lg mx-auto p-6">
      <h1 className="overlay-title">
        {isEditMode ? "Edit Defensive Building" : "Add Defensive Building"}
      </h1>
      {loading && <Spinner></Spinner>}
      <Formik
        initialValues={formValues}
        validationSchema={DefensiveBuildingsValidation}
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
              label="Max Range"
              name="buildingRange.maxRange"
              type="number"
              setFieldValue={setFieldValue}
              parseValue={(value) => parseFloat(value) || 0}
            />
            <FieldGroup
              label="Min Range"
              name="buildingRange.minRange"
              type="number"
              setFieldValue={setFieldValue}
              parseValue={(value) => parseFloat(value) || 0}
            />
            <FieldGroup
              label="Damage Per Hit"
              name="damageInfo.damagePerHit"
              type="number"
              setFieldValue={setFieldValue}
              parseValue={(value) => parseFloat(value) || 0}
            />
            <FieldGroup
              label="Damage Per Second"
              name="damageInfo.damagePerSecond"
              type="number"
              setFieldValue={setFieldValue}
              parseValue={(value) => parseInt(value, 10) || 0}
            />
            <FieldGroup
              label="Shockwave Damage"
              name="damageInfo.shockwaveDamage"
              type="number"
              setFieldValue={setFieldValue}
              parseValue={(value) => parseInt(value, 10) || 0}
            />
            <FieldGroup
              label="push Strength"
              name="damageInfo.pushStrength"
              type="number"
              setFieldValue={setFieldValue}
              parseValue={(value) => parseFloat(value) || 0}
            />
            <FieldGroup
              label="Damage Type"
              name="damageInfo.damageType"
              as="select"
              options={Object.values(DamageType)}
              setFieldValue={setFieldValue}
            />
            <FieldGroup
              label="Ground Targets"
              name="targets.ground"
              type="checkbox"
              as="checkbox"
              setFieldValue={setFieldValue}
            />
            <FieldGroup
              label="Air Targets"
              name="targets.air"
              type="checkbox"
              as="checkbox"
              setFieldValue={setFieldValue}
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

export default DefensiveBuildingEditOrAdd;
