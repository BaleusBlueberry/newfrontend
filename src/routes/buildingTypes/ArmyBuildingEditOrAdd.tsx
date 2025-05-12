import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Form, Formik } from "formik";
import useCOCProvider from "../../hooks/useCOCProvider";
import { BuildingTypes } from "../../Types/enums/BuildingTypes";
import { ResourceType } from "../../Types/enums/ResourceType";
import { ArmyBuildingsModel } from "../../Types/ArmyModels/ArmyBuildingsModel";
import { ArmyBuildingsDataTest } from "../../tests/ArmyBuildingData";
import { ArmyBuildingsValidation } from "../../Validations/ArmyBuildingValidation";
import Spinner from "../../components/Spinner";
import { dialogs } from "../../dialogs/dialogs";
import {
  ArrayFieldGroup,
  FieldGroup,
} from "../../components/AutoFillEditOrAdd/AutoFillEditOrAdd";
import OverlaySelectTime from "../../components/OverlaySelectTime";

function ArmyBuildingEditOrAdd({ mode }: { mode: `add` | `edit` }) {
  const { id } = useParams<{ id: string }>();
  const isEditMode = mode === "edit";
  const { fetchSingleBuilding, updateBuilding, createBuilding } =
    useCOCProvider();

  const [formValues, setFormValues] = useState<ArmyBuildingsModel>(
    ArmyBuildingsDataTest
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
            BuildingTypes.ArmyBuildings,
            id
          ); // Fetch from server
          const response = responseRaw as ArmyBuildingsModel;
          if (response) {
            setFormValues(response); // Set transformed data
          } else {
            console.error(`Building with id ${id} not found.`);
          }
        } catch (error) {
          console.error("Error fetching Building:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setFormValues(ArmyBuildingsDataTest); // Default values for add mode
        setLoading(false);
      }
    };
    fetchData();
  }, [isEditMode, id]);

  const onSubmit = async (values: ArmyBuildingsModel) => {
    if (isEditMode) {
      try {
        await updateBuilding(BuildingTypes.ArmyBuildings, values);
      } catch (error) {
        dialogs.error("Error updating Building");
        console.error("Error updating Building:", error);
      }
    } else {
      try {
        await createBuilding(BuildingTypes.ArmyBuildings, values);
      } catch (error) {
        dialogs.error("Error adding Building");
        console.error("Error adding Building:", error);
      }
    }
  };

  return (
    <div className="overlay-container max-w-screen-lg mx-auto p-6">
      <h1 className="overlay-title">
        {isEditMode ? "Edit Resource Building" : "Add Resource Building"}
      </h1>
      {loading && <Spinner></Spinner>}
      <Formik
        initialValues={formValues}
        validationSchema={ArmyBuildingsValidation}
        onSubmit={onSubmit}
        enableReinitialize
      >
        {({ setFieldValue }) => (
          <Form className="overlay-content flex flex-col items-center">
            {/* Level Input */}

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
              label="Capacity"
              name="capacity"
              type="number"
              setFieldValue={setFieldValue}
              parseValue={(value) => parseInt(value, 10) || 0}
            />
            <FieldGroup
              label="Hero Slots"
              name="heroSlots"
              type="number"
              setFieldValue={setFieldValue}
              parseValue={(value) => parseInt(value, 10) || 0}
            />
            <ArrayFieldGroup label="Unlocks" name="unlocks" />
            {/* Add hero upgrade fields */}
            {[
              "barbarianKing",
              "archerQueen",
              "grandWarden",
              "royalChampion",
              "minionPrince",
            ].map((hero) => (
              <FieldGroup
                key={hero}
                label={hero.replace(/([A-Z])/g, " $1")}
                name={`heroUpgrades.${hero}`}
                type="number"
                setFieldValue={setFieldValue}
                parseValue={(value) => parseInt(value, 10) || 0}
              />
            ))}

            {/* Submit Button */}
            <div className="mt-4">
              <button type="submit" className="btn btn-primary">
                {isEditMode ? "Update Building" : "Add Building"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <OverlaySelectTime
        isOverlayOpen={isOverlayOpen}
        onClose={() => toggleOverlay()}
        onTimeCalculated={(seconds) => {
          setFormValues((prev) => ({
            ...prev,
            upgradeTimeSeconds: seconds,
          }));
        }}
        timeInSeconds={formValues.upgradeTimeSeconds}
      />
    </div>
  );
}

export default ArmyBuildingEditOrAdd;
