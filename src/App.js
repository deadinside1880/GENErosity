import CustomAppBar from "./Components/CustomAppBar";
import "./App.css";
import UploadPage from "./Pages/UploadPage";
import LandingPage from "./Pages/LandingPage";
import SearchPage from "./Pages/SearchPage";
import About from "./Pages/About";
import { useState } from "react";

function App() {
  const [page, setPage] = useState(1);

  function RenderPage() {
    if (page === 1) {
      return <LandingPage />;
    }
    if (page === 2) {
      return <SearchPage />;
    }
    if (page === 3) {
      return <About />;
    }
    if (page === 4) {
      return <UploadPage />;
    }

    console.log(page);
  }

  return (
    <div class="bg-background text-white h-screen w-screen overflow-x-clip">
      <CustomAppBar setPage={setPage}> </CustomAppBar>
      <RenderPage />
    </div>
  );
}

export default App;
