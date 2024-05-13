import React from "react";
import CustomButton from "./CustomButton";
import { backgroundColor } from "../Constants";
import { getProvider } from "../functions";

function CustomAppBar({ setPage }) {
  const check = async (pageNumber) => {
    const provider = await getProvider();
    setPage(pageNumber);
  };
  return (
    <div class="flex">
      <div class="font-bold text-lg m-10">GENErosity</div>
      <div class="flex-1"></div>

      <div class="mt-10 mr-10">
        <button onClick={() => check(2)}>MARKET</button>
      </div>
      <div class="mt-10 mr-10">
        <button onClick={() => check(4)}>UPLOAD</button>
      </div>
      <div class="mt-10">
        <button onClick={() => setPage(3)}>ABOUT</button>
      </div>
      <div class="m-10">
        <CustomButton setPage={setPage} color="white" text="Explore Now">
          a
        </CustomButton>
      </div>
    </div>
  );
}

export default CustomAppBar;
