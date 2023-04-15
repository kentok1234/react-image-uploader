import { Box } from "@mui/material";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";

function ImageDrop() {
  return (
    <Box
      sx={{
        background: "#F6F8FB",
        border: "1px dashed #97BEF4",
        borderRadius: 12,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2em",
      }}
      onDragOver={() => console.log("huuh")}
    >
      <InsertPhotoIcon sx={{ fontSize: 150, color: "#828282" }} />
      <p className="describe">Drag & Drop your image here</p>
    </Box>
  );
}

export default ImageDrop;
