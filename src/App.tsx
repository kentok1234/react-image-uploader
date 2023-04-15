import "./App.css";
import Button from "@mui/material/Button/Button";
import Box from "@mui/material/Box/Box";
import ImageDrop from "./component/ImageDrop";

function App() {
  return (
    <div className="App">
      <h2 className="text-center">Upload your image</h2>
      <p className="annotation text-center">File should be Jpeg, Png,...</p>
      <ImageDrop />
      <p className="describe text-center">Or</p>
      <Box textAlign={"center"}>
        <Button variant="contained" component="label">
          Choose a file
          <input hidden accept="image/*" multiple type="file" />
        </Button>
      </Box>
    </div>
  );
}

export default App;
