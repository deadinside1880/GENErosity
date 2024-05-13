import { TextField } from "@mui/material";
import React from "react";
import { Button } from "@mui/material";
import { uploadData } from "../functions";
import { buttonColor } from "../Constants";
import { useState } from "react";
import { Flag } from "@mui/icons-material";

function UploadPage() {
  const [typeOfData, setTypeOfData] = useState("");
  const [price, setPrice] = useState("0");
  const [data, setData] = useState("0");
  const [error, setError] = useState("");
  const [consent, setConsent] = useState(false);

  function checkValidity() {
    if (typeOfData.length < 3) {
      setError("Please set a Proper Gene Type");
      return false;
    }
    if (price < 1 || price > 100) {
      setError("Please set a value between 1 and 100");
      return false;
    }
    if (data.length < 15) {
      setError("The length of Data is too short");
      return false;
    }
    if (!consent) {
      setError("The length of Data is too short");
      return false;
    }
    return true;
  }
  return (
    <div class="flex justify-around">
      <div class="bg-grey/20 flex shadow-xl py-10 px-20 mt-10 rounded-3xl">
        <div class="flex-col">
          <div class="text-2xl mb-4 font-bold"> Input Data</div>
          <div class="text-lg mb-2">Data Type</div>
          <div>
            <input
              placeholder={"Which genome type"}
              class="bg-grey border-white mb-4"
              value={typeOfData}
              onInput={(e) => setTypeOfData(e.target.value)}
            ></input>
          </div>
          <div class="text-lg mb-2">Price</div>
          <div>
            <input
              placeholder={"Price to charge"}
              class="bg-grey border-white mb-4"
              value={price}
              onInput={(e) => setPrice(e.target.value)}
            ></input>
          </div>
          <div class="text-lg mb-2">Data</div>
          <div>
            <input
              placeholder={"Enter the Data"}
              class="bg-grey border-white mb-10"
              value={data}
              onInput={(e) => setData(e.target.value)}
            ></input>
          </div>
          <div>
            <Button
              variant="contained"
              sx={{
                bgcolor: buttonColor,
                borderRadius: 100,
                paddingX: 5,
              }}
              onClick={() => {
                if (checkValidity) {
                  uploadData(data, typeOfData, price);
                }
              }}
            >
              Upload
            </Button>
          </div>
          <div class="text-red">{error}</div>
        </div>
      </div>
    </div>
  );
}

export default UploadPage;
