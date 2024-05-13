import { Button, colors } from "@mui/material";
import geneImage from "../Assets/geneImage.webp";
import React from "react";
import CustomButton from "../Components/CustomButton";
import { buttonColor } from "../Constants";

function LandingPage() {
  const { innerHeight, innerWidth } = window;
  return (
    <div class="">
      <div style={{ height: innerHeight * 0.01 }}></div>
      <div>
        <div class="flex m-10">
          <div class="flex-col">
            <div class="text-[50px] font-bold">Earn by Helping Research</div>
            <div class="mb-10">
              Groundbreaking Research requires your assistance!
            </div>
            <CustomButton
              text="Explore Now!"
              color={buttonColor}
            ></CustomButton>
          </div>
          <div class="flex-1"></div>
          <div class="w-1/3  bg-purple" style={{ borderRadius: 30 }}>
            <div>
              <img
                class="w-100% translate-y-8 -translate-x-8"
                src={geneImage}
                style={{ borderRadius: 30 }}
              />
            </div>
          </div>
        </div>
      </div>
      <div style={{ height: innerHeight * 0.01 }}></div>
      <div
        class=" bg-purple content-center grid justify-items-center"
        style={{ height: innerHeight * 0.15 }}
      >
        <div class="text-4xl">
          Guaranteed safety and security throughout the entire process
        </div>
      </div>
      <div class="mt-6 ml-8 text-sm">
        <div class="text-base">GENErosity</div>
        <div class="mt-4">
          The best way to earn money while making a difference
        </div>
        <div>GENErosity @2024</div>
      </div>
    </div>
  );
}

export default LandingPage;
