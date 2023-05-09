import "./App.css";
import Button from "@mui/material/Button/Button";
import Box from "@mui/material/Box/Box";
import ImageDrop from "./component/ImageDrop";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "./main";
import {
  InputBase,
  LinearProgress,
  LinearProgressProps,
  Paper,
  Typography,
} from "@mui/material";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 6,
  borderRadius: 8,
}));

function LinearProgressWithLabel(
  props: LinearProgressProps & { value: Number }
) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <BorderLinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

function App() {
  const [file, setFile] = useState<File>();
  const [fileUrl, setFileUrl] = useState<String>();
  const [progress, setProgress] = useState(0);

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageFiles = event.target.files;

    if (!imageFiles) return;

    setFile(imageFiles[0]);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(fileUrl as string);
  };

  useEffect(() => {
    if (file && !fileUrl) {
      // const timer = setInterval(() => {
      //   setProgress((prevProgress) =>
      //     prevProgress >= 100 ? 10 : prevProgress + 10
      //   );
      //   setFileUrl("testing");
      // }, 200);
      // return () => {
      //   clearInterval(timer);
      // };

      const storageRef = ref(storage, `files/${file?.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file as Blob);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setProgress(
            Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
          );
        },
        (error) => {
          alert(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            setFileUrl(downloadUrl);
          });
        }
      );
    }
  }, [file]);

  useEffect(() => {
    if (fileUrl) {
      // Thumbnail image
      const fr = new FileReader();
      fr.onload = () => {
        const img = document.getElementById(
          "image-thumbnail"
        ) as HTMLImageElement;

        img.src = fr.result as string;
      };

      fr.readAsDataURL(file as Blob);
    }
  }, [fileUrl]);
  return (
    <div className="App">
      {!file ? (
        <>
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
        </>
      ) : !fileUrl ? (
        <>
          <h2>Uploading...</h2>
          <Box marginTop={5}>
            <LinearProgressWithLabel value={progress} />
          </Box>
        </>
      ) : (
        <>
          <CheckCircleRoundedIcon
            color="success"
            sx={{ fontSize: 35, display: "block", marginX: "auto" }}
          />
          <h2 className="text-center">Uploaded Successfully!</h2>
          <img alt="Uploaded image" className="image" id="image-thumbnail" />
          <Paper
            elevation={0}
            sx={{
              backgroundColor: "#F6F8FB",
              border: "1px solid #E0E0E0",
              p: "10px 6px",
              display: "flex",
              alignItems: "center",
              width: "100%",
              borderRadius: "8px",
            }}
          >
            <InputBase
              fullWidth
              disabled
              sx={{ flex: 1 }}
              type="text"
              value={fileUrl}
            />
            <Button variant="contained" onClick={handleCopy}>
              Copy Link
            </Button>
          </Paper>
        </>
      )}
    </div>
  );
}

export default App;
