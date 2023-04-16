import "./App.css";
import Button from "@mui/material/Button/Button";
import Box from "@mui/material/Box/Box";
import ImageDrop from "./component/ImageDrop";
import { useState, useCallback, useEffect } from "react";

function App() {
  const [file, setFile] = useState<File>();

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageFiles = event.target.files;

    if (!imageFiles) return;

    setFile(imageFiles[0]);
  };

  useEffect(() => {
    console.log(file);
  }, []);
  return (
    <div className="App">
      <h2 className="text-center">Upload your image</h2>
      <p className="annotation text-center">File should be Jpeg, Png,...</p>
      <ImageDrop setFile={setFile} />
      <p className="describe text-center">Or</p>
      <Box textAlign={"center"}>
        <Button variant="contained" component="label">
          Choose a file
          <input
            hidden
            accept="image/*"
            multiple
            type="file"
            onChange={handleFileInput}
          />
        </Button>
      </Box>
    </div>
  );
}

export default App;
