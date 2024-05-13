import React from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import CustomCard from "../Components/CustomCard";
import { Button } from "@mui/material";
import { getData, retractData } from "../functions";
import { useState } from "react";
import { useEffect } from "react";
import { getProvider } from "../functions";

function SearchPage() {
  const [data, setData] = useState([]);
  const [ascendingPrice, setAscendingPrice] = useState(true);
  const [search, setSearch] = useState("");
  const [displayData, setDisplayData] = useState([]);

  const sortData = (ascending) => {
    setDisplayData((data) => {
      const temp = data.sort((a, b) => (ascending ? a[3] - b[3] : b[3] - a[3]));
      return [...temp];
    });
  };

  const searchData = () => {
    if (search === "") {
      setDisplayData([...data]);
      return;
    }
    setDisplayData((data) => {
      const temp = data.filter((element) => {
        return element[2].includes(search);
      });
      return [...temp];
    });
  };

  const getPurchasedData = async () => {
    const provider = await getProvider();
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    setDisplayData((data) => {
      const temp = data.filter((element) => {
        return element[1].includes(address);
      });
      return [...temp];
    });
  };

  const loadData = async function () {
    const items = await getData();
    setData([...items]);
    setDisplayData([...items]);
  };

  useEffect(() => {
    loadData();
  }, []);

  const { innerHeight, innerWidth } = window;
  return (
    <div
      class="flex"
      style={{ overflow: "clip", minHeight: innerHeight * 0.83 }}
    >
      <div class="flex flex-grow">
        <div
          class="flex-col bg-purple p-2"
          style={{ justifyContent: "center" }}
        >
          <div class="text-3xl font-medium mt-6">Search for gene data</div>
          <div class="mt-2">Find data based on filters</div>
          <div class="mt-4 mb-4 bg-grey p-2" style={{ borderRadius: 20 }}>
            <div class="m-4 mt-4">
              <div class="text-xl">Filters</div>
              <div class="">
                <button
                  class="mt-4 mr-10 flex"
                  onClick={() => setAscendingPrice(!ascendingPrice)}
                >
                  Price
                  <div>
                    {!ascendingPrice ? (
                      <ArrowDownwardIcon />
                    ) : (
                      <ArrowUpwardIcon />
                    )}
                  </div>
                </button>
                <div class="mt-4 mb-5">
                  <input
                    placeholder={"Search"}
                    class="bg-grey border-white"
                    value={search}
                    onInput={(e) => setSearch(e.target.value)}
                  ></input>
                </div>
                <div class="justify-start w-full flex">
                  <Button
                    class="bg-purple w-full px-5 py-1 rounded-md mt-5"
                    onClick={() => {
                      searchData();
                      sortData(ascendingPrice);
                    }}
                  >
                    Apply
                  </Button>
                </div>
                <div class="justify-start w-full flex mt-10">
                  <Button
                    class="bg-purple w-full px-5 py-1 rounded-md"
                    onClick={() => retractData()}
                  >
                    Retract Data
                  </Button>
                </div>
                <div class="justify-start w-full flex mt-10">
                  <Button
                    class="bg-purple w-full px-5 py-1 rounded-md"
                    onClick={() => getPurchasedData()}
                  >
                    View Purchased Data
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="bg-grey flex flex-1 flex-wrap"
          style={{ justifyContent: "space-around" }}
        >
          {displayData.map((geneData) => {
            return <CustomCard class="h-12" data={geneData} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
