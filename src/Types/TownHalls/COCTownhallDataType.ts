export type otherBuildingsDataType = {
  armyCamp: number;
  barracks: number;
  darkBarracks: number;
  laboratory: number;
  spellFactory: number;
  darkSpellFactory: number;
  blacksmith: number;
  workshop: number;
  petHouse: number;
  heroHall: number;
  helperHut: number;
  boBsHut: number;
};

export type defensiveBuildingsDataType = {
  cannon: number;
  archerTower: number;
  builderHut: number;
  walls: number;
  mortar: number;
  airDefense: number;
  wizardTower: number;
  airSweeper: number;
  hiddenTesla: number;
  bombTower: number;
  xBow: number;
  infernoTower: number;
  eagleArtillery: number;
  scattershot: number;
  spellTower: number;
  monolith: number;
  multiArcherTower: number;
  ricochetCannon: number;
  firespitter: number;
};

export type trapBuildingsDataTypes = {
  bomb: number;
  springTrap: number;
  airBomb: number;
  giantBomb: number;
  seekingAirMine: number;
  skeletonTrap: number;
  tornadoTrap: number;
};

export type heroesDataType = {
  barbarianKing: number;
  archerQueen: number;
  grandWarden: number;
  royalChampion: number;
  minionPrince: number;
};

export type resourceBuildingsDataType = {
  goldMine: number;
  elixirCollector: number;
  goldStorage: number;
  elixirStorage: number;
  darkElixirDrill: number;
  darkElixirStorage: number;
  clanCastle: number;
};

export type COCTownhallDataType = {
  id?: string;
  level: number;
  picture: string;
  data: {
    armyBuildings: otherBuildingsDataType;
    defensiveBuildings: defensiveBuildingsDataType;
    trapBuildings: trapBuildingsDataTypes;
    heroes: heroesDataType;
    resourceBuildings: resourceBuildingsDataType;
    laboratoryUpgrades: {
      elixirUpgrades: {
        barbarian: number;
        archer: number;
        giant: number;
        goblin: number;
        wallBreaker: number;
        balloon: number;
        wizard: number;
        healer: number;
        dragon: number;
        pekka: number;
        babyDragon: number;
        miner: number;
        electroDragon: number;
        yeti: number;
        dragonRider: number;
        electroTitan: number;
        rootRider: number;
        thrower: number;
        lightningSpell: number;
        healingSpell: number;
        rageSpell: number;
        jumpSpell: number;
        freezeSpell: number;
        cloneSpell: number;
        invisibilitySpell: number;
        recallSpell: number;
        reviveSpell: number;
      };
      darkElixirUpgrades: {
        minion: number;
        hogRider: number;
        valkyrie: number;
        golem: number;
        witch: number;
        lavaHound: number;
        bowler: number;
        iceGolem: number;
        headhunter: number;
        apprenticeWarden: number;
        druid: number;
        poisonSpell: number;
        earthquakeSpell: number;
        hasteSpell: number;
        skeletonSpell: number;
        batSpell: number;
        overgrowthSpell: number;
      };
      siegeMachineUpgrades: {
        wallWrecker: number;
        battleBlimp: number;
        stoneSlammer: number;
        siegeBarracks: number;
        logLauncher: number;
        flameFlinger: number;
        battleDrill: number;
      };
    };
  };
};
