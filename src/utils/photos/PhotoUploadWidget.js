import React from "react";
import { useState } from "react";
import cuid from "cuid";
import { Button, Grid, Header } from "semantic-ui-react";
import PhotoWidgetCropper from "./PhotoWidgetCropper";
import { PhotoWidgetDropzone } from "./PhotoWidgetDropzone";
import getFileExtension from "../getFileExtension";
import { uploadToFirebaseStorage } from "../../firestore/firebaseService";
import { toast } from "react-toastify";
import { updateUserProfilePhoto } from "../../firestore/firestoreService";

export default function PhotoUploadWidget({ setEditMode }) {
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleUploadImage() {
    setLoading(true);
    const filename = cuid() + "." + getFileExtension(files[0].name);
    const uploadTask = uploadToFirebaseStorage(image, filename);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`upload is ${progress} % done`);
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          updateUserProfilePhoto(downloadURL, filename)
            .then(() => {
              setLoading(false);
              handleCancelCrop();
              setEditMode(false);
            })
            .catch((error) => {
              toast.error(error.message);
              setLoading(false);
            });
        });
      }
    );
  }

  function handleCancelCrop() {
    setFiles([]);
    setImage(null);
  }
  return (
    <Grid>
      <Grid.Column width={4}>
        <Header color="teal" sub content="Step 1 - add photo" />
        <PhotoWidgetDropzone setFiles={setFiles} />
      </Grid.Column>
      <Grid.Column width={1} />

      <Grid.Column width={4}>
        <Header color="teal" sub content="Step 2 - resize photo" />
        {files.length > 0 && (
          <PhotoWidgetCropper
            setImage={setImage}
            imagePreview={files[0].preview}
          />
        )}
      </Grid.Column>
      <Grid.Column width={1} />

      <Grid.Column width={4}>
        <Header color="teal" sub content="Step 3 - preview & upload" />
        {files.length > 0 && (
          <React.Fragment>
            <div
              className="img-preview"
              style={{ minHeight: 200, minWidth: 200, overflow: "hidden" }}
            ></div>
            <Button.Group>
              <Button
                loading={loading}
                onClick={handleUploadImage}
                style={{ width: 100 }}
                positive
                icon="check"
              />
              <Button
                loading={loading}
                onClick={handleCancelCrop}
                style={{ width: 100 }}
                icon="close"
              />
            </Button.Group>
          </React.Fragment>
        )}
      </Grid.Column>
      <Grid.Column width={1} />
    </Grid>
  );
}
