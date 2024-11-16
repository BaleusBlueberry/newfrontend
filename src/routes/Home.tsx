import React from "react";
import { Card } from "../components/Card";
import { VscAccount } from "react-icons/vsc";

export const Home = () => {
  return (
    <div>
      <Card title="Home page">
        <VscAccount />
      </Card>
    </div>
  );
};

export default Home;
