import { ErrorMessage, Field, Form, Formik } from "formik";
import { TownHallValidation } from "../../Validations/TownHallValidation";
import { TownHallDataTest } from "../../tests/TownHallDataTest";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiTownHall from "../../services/COC-service-townhall";
import { COCTownhallDataType } from "../../Types/TownHalls/COCTownhallDataType";
import Spinner from "../../components/Spinner";

function TownhallEditOrAdd({ mode }: { mode: `add` | `edit` }) {
  const { level } = useParams<{ level: string }>();
  const levelNumber = Number(level);
  const isEditMode = mode === "edit";

  const [formValues, setFormValues] =
    useState<COCTownhallDataType>(TownHallDataTest);
  const [visibleSections, setVisibleSections] = useState<{
    [key: string]: boolean;
  }>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      if (isEditMode && levelNumber) {
        try {
          const responseserver = await apiTownHall.getSingle(levelNumber); // Fetch from server

          const response = responseserver.data;
          console.log(response);
          if (response) {
            const transformedData: COCTownhallDataType = {
              level: response.level,
              picture: response.picture,
              data: {
                armyBuildings: {
                  armyCamp: response.data.armyBuildings.armyCamp || 0,
                  barracks: response.data.armyBuildings.barracks || 0,
                  darkBarracks: response.data.armyBuildings.darkBarracks || 0,
                  laboratory: response.data.armyBuildings.laboratory || 0,
                  spellFactory: response.data.armyBuildings.spellFactory || 0,
                  darkSpellFactory:
                    response.data.armyBuildings.darkSpellFactory || 0,
                  blacksmith: response.data.armyBuildings.blacksmith || 0,
                  workshop: response.data.armyBuildings.workshop || 0,
                  petHouse: response.data.armyBuildings.petHouse || 0,
                  heroHall: response.data.armyBuildings.heroHall || 0,
                  helperHut: response.data.armyBuildings.helperHut || 0,
                  boBsHut: response.data.armyBuildings.bOBsHut || 0,
                },
                defensiveBuildings: {
                  cannon: response.data.defensiveBuildings.cannon || 0,
                  archerTower:
                    response.data.defensiveBuildings.archerTower || 0,
                  builderHut: response.data.defensiveBuildings.builderHut || 0,
                  walls: response.data.defensiveBuildings.walls || 0,
                  mortar: response.data.defensiveBuildings.mortar || 0,
                  airDefense: response.data.defensiveBuildings.airDefense || 0,
                  wizardTower:
                    response.data.defensiveBuildings.wizardTower || 0,
                  airSweeper: response.data.defensiveBuildings.airSweeper || 0,
                  hiddenTesla:
                    response.data.defensiveBuildings.hiddenTesla || 0,
                  bombTower: response.data.defensiveBuildings.bombTower || 0,
                  xBow: response.data.defensiveBuildings.xBow || 0,
                  infernoTower:
                    response.data.defensiveBuildings.infernoTower || 0,
                  eagleArtillery:
                    response.data.defensiveBuildings.eagleArtillery || 0,
                  scattershot:
                    response.data.defensiveBuildings.scattershot || 0,
                  spellTower: response.data.defensiveBuildings.spellTower || 0,
                  monolith: response.data.defensiveBuildings.monolith || 0,
                  multiArcherTower:
                    response.data.defensiveBuildings.multiArcherTower || 0,
                  ricochetCannon:
                    response.data.defensiveBuildings.ricochetCannon || 0,
                  firespitter:
                    response.data.defensiveBuildings.firespitter || 0,
                },
                trapBuildings: {
                  bomb: response.data.trapBuildings.bomb || 0,
                  springTrap: response.data.trapBuildings.springTrap || 0,
                  airBomb: response.data.trapBuildings.airBomb || 0,
                  giantBomb: response.data.trapBuildings.giantBomb || 0,
                  seekingAirMine:
                    response.data.trapBuildings.seekingAirMine || 0,
                  skeletonTrap: response.data.trapBuildings.skeletonTrap || 0,
                  tornadoTrap: response.data.trapBuildings.tornadoTrap || 0,
                },
                heroes: {
                  barbarianKing: response.data.heroes.barbarianKing || 0,
                  archerQueen: response.data.heroes.archerQueen || 0,
                  grandWarden: response.data.heroes.grandWarden || 0,
                  royalChampion: response.data.heroes.royalChampion || 0,
                  minionPrince: response.data.heroes.minionPrince || 0,
                },
                resourceBuildings: {
                  goldMine: response.data.resourceBuildings.goldMine || 0,
                  elixirCollector:
                    response.data.resourceBuildings.elixirCollector || 0,
                  goldStorage: response.data.resourceBuildings.goldStorage || 0,
                  elixirStorage:
                    response.data.resourceBuildings.elixirStorage || 0,
                  darkElixirDrill:
                    response.data.resourceBuildings.darkElixirDrill || 0,
                  darkElixirStorage:
                    response.data.resourceBuildings.darkElixirStorage || 0,
                  clanCastle: response.data.resourceBuildings.clanCastle || 0,
                },
                laboratoryUpgrades: {
                  elixirUpgrades: {
                    barbarian:
                      response.data.laboratoryUpgrades.elixirUpgrades
                        .barbarian || 0,
                    archer:
                      response.data.laboratoryUpgrades.elixirUpgrades.archer ||
                      0,
                    giant:
                      response.data.laboratoryUpgrades.elixirUpgrades.giant ||
                      0,
                    goblin:
                      response.data.laboratoryUpgrades.elixirUpgrades.goblin ||
                      0,
                    wallBreaker:
                      response.data.laboratoryUpgrades.elixirUpgrades
                        .wallBreaker || 0,
                    balloon:
                      response.data.laboratoryUpgrades.elixirUpgrades.balloon ||
                      0,
                    wizard:
                      response.data.laboratoryUpgrades.elixirUpgrades.wizard ||
                      0,
                    healer:
                      response.data.laboratoryUpgrades.elixirUpgrades.healer ||
                      0,
                    dragon:
                      response.data.laboratoryUpgrades.elixirUpgrades.dragon ||
                      0,
                    pekka:
                      response.data.laboratoryUpgrades.elixirUpgrades.pekka ||
                      0,
                    babyDragon:
                      response.data.laboratoryUpgrades.elixirUpgrades
                        .babyDragon || 0,
                    miner:
                      response.data.laboratoryUpgrades.elixirUpgrades.miner ||
                      0,
                    electroDragon:
                      response.data.laboratoryUpgrades.elixirUpgrades
                        .electroDragon || 0,
                    yeti:
                      response.data.laboratoryUpgrades.elixirUpgrades.yeti || 0,
                    dragonRider:
                      response.data.laboratoryUpgrades.elixirUpgrades
                        .dragonRider || 0,
                    electroTitan:
                      response.data.laboratoryUpgrades.elixirUpgrades
                        .electroTitan || 0,
                    rootRider:
                      response.data.laboratoryUpgrades.elixirUpgrades
                        .rootRider || 0,
                    thrower:
                      response.data.laboratoryUpgrades.elixirUpgrades.thrower ||
                      0,
                    lightningSpell:
                      response.data.laboratoryUpgrades.elixirUpgrades
                        .lightningSpell || 0,
                    healingSpell:
                      response.data.laboratoryUpgrades.elixirUpgrades
                        .healingSpell || 0,
                    rageSpell:
                      response.data.laboratoryUpgrades.elixirUpgrades
                        .rageSpell || 0,
                    jumpSpell:
                      response.data.laboratoryUpgrades.elixirUpgrades
                        .jumpSpell || 0,
                    freezeSpell:
                      response.data.laboratoryUpgrades.elixirUpgrades
                        .freezeSpell || 0,
                    cloneSpell:
                      response.data.laboratoryUpgrades.elixirUpgrades
                        .cloneSpell || 0,
                    invisibilitySpell:
                      response.data.laboratoryUpgrades.elixirUpgrades
                        .invisibilitySpell || 0,
                    recallSpell:
                      response.data.laboratoryUpgrades.elixirUpgrades
                        .recallSpell || 0,
                    reviveSpell:
                      response.data.laboratoryUpgrades.elixirUpgrades
                        .reviveSpell || 0,
                  },
                  darkElixirUpgrades: {
                    minion:
                      response.data.laboratoryUpgrades.darkElixirUpgrades
                        .minion || 0,
                    hogRider:
                      response.data.laboratoryUpgrades.darkElixirUpgrades
                        .hogRider || 0,
                    valkyrie:
                      response.data.laboratoryUpgrades.darkElixirUpgrades
                        .valkyrie || 0,
                    golem:
                      response.data.laboratoryUpgrades.darkElixirUpgrades
                        .golem || 0,
                    witch:
                      response.data.laboratoryUpgrades.darkElixirUpgrades
                        .witch || 0,
                    lavaHound:
                      response.data.laboratoryUpgrades.darkElixirUpgrades
                        .lavaHound || 0,
                    bowler:
                      response.data.laboratoryUpgrades.darkElixirUpgrades
                        .bowler || 0,
                    iceGolem:
                      response.data.laboratoryUpgrades.darkElixirUpgrades
                        .iceGolem || 0,
                    headhunter:
                      response.data.laboratoryUpgrades.darkElixirUpgrades
                        .headhunter || 0,
                    apprenticeWarden:
                      response.data.laboratoryUpgrades.darkElixirUpgrades
                        .apprenticeWarden || 0,
                    druid:
                      response.data.laboratoryUpgrades.darkElixirUpgrades
                        .druid || 0,
                    poisonSpell:
                      response.data.laboratoryUpgrades.darkElixirUpgrades
                        .poisonSpell || 0,
                    earthquakeSpell:
                      response.data.laboratoryUpgrades.darkElixirUpgrades
                        .earthquakeSpell || 0,
                    hasteSpell:
                      response.data.laboratoryUpgrades.darkElixirUpgrades
                        .hasteSpell || 0,
                    skeletonSpell:
                      response.data.laboratoryUpgrades.darkElixirUpgrades
                        .skeletonSpell || 0,
                    batSpell:
                      response.data.laboratoryUpgrades.darkElixirUpgrades
                        .batSpell || 0,
                    overgrowthSpell:
                      response.data.laboratoryUpgrades.darkElixirUpgrades
                        .overgrowthSpell || 0,
                  },
                  siegeMachineUpgrades: {
                    wallWrecker:
                      response.data.laboratoryUpgrades.siegeMachineUpgrades
                        .wallWrecker || 0,
                    battleBlimp:
                      response.data.laboratoryUpgrades.siegeMachineUpgrades
                        .battleBlimp || 0,
                    stoneSlammer:
                      response.data.laboratoryUpgrades.siegeMachineUpgrades
                        .stoneSlammer || 0,
                    siegeBarracks:
                      response.data.laboratoryUpgrades.siegeMachineUpgrades
                        .siegeBarracks || 0,
                    logLauncher:
                      response.data.laboratoryUpgrades.siegeMachineUpgrades
                        .logLauncher || 0,
                    flameFlinger:
                      response.data.laboratoryUpgrades.siegeMachineUpgrades
                        .flameFlinger || 0,
                    battleDrill:
                      response.data.laboratoryUpgrades.siegeMachineUpgrades
                        .battleDrill || 0,
                  },
                },
              },
            };

            setFormValues(transformedData); // Set transformed data
          } else {
            console.error(`Townhall with level ${levelNumber} not found.`);
          }
        } catch (error) {
          console.error("Error fetching townhall:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setFormValues(TownHallDataTest); // Default values for add mode
        setLoading(false);
      }
    };
    fetchData();
  }, [isEditMode, levelNumber]);

  const onSubmit = async (values: COCTownhallDataType) => {
    if (isEditMode) {
      try {
        await apiTownHall.update(values);
        console.log("Townhall updated successfully:", values);
      } catch (error) {
        console.error("Error updating townhall:", error);
      }
    } else {
      try {
        await apiTownHall.create(values);
        console.log("New townhall added successfully:", values);
      } catch (error) {
        console.error("Error adding townhall:", error);
      }
    }
  };

  const handleFieldChange = (name: string, value: unknown) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const toggleSectionVisibility = (section: string) => {
    setVisibleSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  if (loading) {
    return <Spinner></Spinner>;
  }

  if (!formValues) {
    return (
      <div>
        <h1 className="overlay-title">No data found for this townhall.</h1>
      </div>
    );
  }
  return (
    <div className="overlay-container max-w-screen-lg mx-auto p-6">
      <h1 className="overlay-title">
        {isEditMode ? "Edit Town Hall" : "Add Town Hall"}
      </h1>
      <Formik
        initialValues={formValues}
        validationSchema={TownHallValidation}
        onSubmit={onSubmit}
        enableReinitialize // Ensures form reinitializes when `formValues` change
      >
        {({ values, setFieldValue }) => (
          <Form className="overlay-content flex flex-col items-center">
            {/* Level Input */}
            <div className="mb-4 flex items-center w-full">
              <label
                htmlFor="level"
                className="block font-semibold mb-2 mr-4 w-32 flex-shrink-0"
              >
                Level:
              </label>
              <Field
                type="number"
                name="level"
                className="input w-full rounded-lg p-2"
                value={values.level}
                onChange={(e) => handleFieldChange("level", e.target.value)} // Manual state update
              />
              <ErrorMessage
                name="level"
                component="div"
                className="error-message mt-1"
              />
            </div>

            {/* Picture Input */}
            <div className="mb-4 flex items-center w-full">
              <label
                htmlFor="picture"
                className="block font-semibold mb-2 mr-4 w-32 flex-shrink-0"
              >
                Picture:
              </label>
              <Field
                type="text"
                name="picture"
                className="input w-full rounded-lg p-2"
                value={values.picture}
                onChange={(e) => handleFieldChange("picture", e.target.value)} // Manual state update
              />
              <ErrorMessage
                name="picture"
                component="div"
                className="error-message mt-1"
              />
            </div>

            {/* Nested Sections */}
            {Object.keys(values.data).map((sectionKey) => {
              // Skip rendering for the 'laboratoryUpgrades' section
              if (sectionKey === "laboratoryUpgrades") {
                return null;
              }

              return (
                <div key={sectionKey} className="mb-6">
                  <div className="flex items-center justify-center min-w-[100%]">
                    <button
                      type="button"
                      onClick={() => toggleSectionVisibility(sectionKey)}
                      className="font-bold py-2 px-4 rounded my-4 transition-all flex"
                    >
                      {visibleSections[sectionKey] ? "Hide" : "Show"}{" "}
                      {sectionKey.replace(/([A-Z])/g, " $1")} Section
                    </button>
                  </div>
                  {visibleSections[sectionKey] && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                      {Object.keys(
                        values.data[sectionKey as keyof typeof values.data]
                      ).map((fieldKey) => {
                        const fieldValue =
                          values.data[sectionKey as keyof typeof values.data][
                            fieldKey
                          ];

                        return (
                          <div
                            key={fieldKey}
                            className="mb-4 flex items-center"
                          >
                            <label
                              htmlFor={`data.${sectionKey}.${fieldKey}`}
                              className="block font-semibold mb-2 mr-4 w-32 capitalize"
                            >
                              {fieldKey.replace(/([A-Z])/g, " $1")}:
                            </label>
                            <Field
                              type="number"
                              id={`data.${sectionKey}.${fieldKey}`}
                              name={`data.${sectionKey}.${fieldKey}`}
                              className="input w-full rounded-lg p-2"
                              value={fieldValue || ""}
                              onChange={(e) =>
                                setFieldValue(
                                  `data.${sectionKey}.${fieldKey}`,
                                  e.target.value || 0
                                )
                              } // Default to 0 for empty values
                            />
                            <ErrorMessage
                              name={`data.${sectionKey}.${fieldKey}`}
                              component="div"
                              className="error-message mt-1"
                            />
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            {Object.entries(values.data.laboratoryUpgrades).map(
              ([upgradeCategoryKey, upgrades]) => (
                <div key={upgradeCategoryKey} className="mb-6">
                  {/* Section Toggle Button */}
                  <div className="flex items-center justify-center min-w-[100%]">
                    <button
                      type="button"
                      onClick={() =>
                        toggleSectionVisibility(upgradeCategoryKey)
                      }
                      className="font-bold py-2 px-4 rounded my-4 transition-all flex"
                    >
                      {visibleSections[upgradeCategoryKey] ? "Hide" : "Show"}{" "}
                      {upgradeCategoryKey.replace(/([A-Z])/g, " $1")} Section
                    </button>
                  </div>

                  {visibleSections[upgradeCategoryKey] && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                      {Object.entries(upgrades).map(
                        ([fieldKey, fieldValue]) => (
                          <div
                            key={fieldKey}
                            className="mb-4 flex items-center"
                          >
                            <label
                              htmlFor={`data.laboratoryUpgrades.${upgradeCategoryKey}.${fieldKey}`}
                              className="block font-semibold mb-2 mr-4 w-32 capitalize"
                            >
                              {fieldKey.replace(/([A-Z])/g, " $1")}:
                            </label>
                            <Field
                              type="number"
                              id={`data.laboratoryUpgrades.${upgradeCategoryKey}.${fieldKey}`}
                              name={`data.laboratoryUpgrades.${upgradeCategoryKey}.${fieldKey}`}
                              className="input w-full rounded-lg p-2"
                              value={fieldValue || ""}
                              onChange={(e) =>
                                setFieldValue(
                                  `data.laboratoryUpgrades.${upgradeCategoryKey}.${fieldKey}`,
                                  parseInt(e.target.value) || 0
                                )
                              }
                            />
                            <ErrorMessage
                              name={`data.laboratoryUpgrades.${upgradeCategoryKey}.${fieldKey}`}
                              component="div"
                              className="error-message mt-1"
                            />
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
              )
            )}
            {/* Submit Button */}
            <div className="w-full flex justify-center">
              <button
                type="submit"
                className="admin-btn w-full max-w-xs p-3 font-semibold rounded-lg hover:shadow-lg mx-auto block transition-all duration-300"
              >
                Save
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default TownhallEditOrAdd;
