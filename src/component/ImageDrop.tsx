import { Box } from "@mui/material";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { useState } from "react";

const styles = {
  boxImageIdle: {
    background: "#F6F8FB",
    border: "1px dashed #97BEF4",
    borderRadius: 12,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "2em",
  },
  boxImageOnDrag: {
    background: "#F6F8FB",
    border: "1px dashed #1976d2",
    borderRadius: 12,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "2em",
  },
};

type StateFile = {
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>;
};

function ImageDrop({ setFile }: StateFile) {
  const [drag, setDrag] = useState(false);

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDrag(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    setDrag(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const imageFiles = event.dataTransfer.files;

    if (imageFiles[0].type.includes("image")) setFile(imageFiles[0]);
    setDrag(false);
  };

  return (
    <Box
      id="imageDnD"
      sx={!drag ? styles.boxImageIdle : styles.boxImageOnDrag}
      draggable={true}
      onDragOver={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <InsertPhotoIcon sx={{ fontSize: 150, color: "#828282" }} />
      <p className="describe">Drag & Drop your image here</p>
    </Box>
  );
}

export default ImageDrop;
