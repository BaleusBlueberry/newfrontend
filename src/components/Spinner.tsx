import React from "react";
import { ThreeDots } from "react-loader-spinner";

export const Spinner = () => {
  return (
    <ThreeDots
      wrapperClass="flex justify-center items-center"
      color="#603389"
      ariaLabel="three-dots-loading"
    />
  );
};
export default Spinner;
