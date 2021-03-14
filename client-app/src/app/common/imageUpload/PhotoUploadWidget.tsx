import { fi } from "date-fns/locale";
import React, { useEffect, useState } from "react";
import { Button, Grid, Header } from "semantic-ui-react";
import PhotoWidgetCropper from "./PhotoWidgetCropper";
import PhotoWidgetDropzone from "./PhotoWidgetDropzone";

interface Props {
    loading : boolean;
    uploadPhoto : (file : Blob) => void;
}

export default function PhotoUploadWidget({loading, uploadPhoto} : Props) {
  const [files, setFiles] = useState<any>([]);

  const [cropper, setCropper] = useState<Cropper>();

  function onCrop() {
    if (cropper) {
      cropper.getCroppedCanvas().toBlob((blob) => uploadPhoto(blob!));
    }
  }

  //this will clean file urls
  useEffect(() => {
    return () => {
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={16}>
          <Header color="teal" content="Step 1 = Add Photo" />
          <PhotoWidgetDropzone setFiles={setFiles} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Column width={8}>
        <Grid.Column>
          <Header color="teal" content="Step 2 = Resize image" />
          {files && files.length > 0 && (
            <PhotoWidgetCropper
              setCropper={setCropper}
              imagePreview={files[0].preview}
            />
          )}
        </Grid.Column>
      </Grid.Column>
      <Grid.Column width={8}>
        <Grid.Column>
          <Header color="teal" content="Step 3 = Preview & Upload" />
          {files && files.length > 0 && (
            <>
              <div
                className="img-preview"
                style={{ minHeight: 400, width: "100%", overflow: "hidden" }}
              />
              <Button.Group widths={2} style={{marginTop:'5px'}}>
                <Button loading={loading} onClick={onCrop} positive icon="check" />
                <Button disabled={loading} onClick={() => setFiles([])} negative icon="close" />
              </Button.Group>
            </>
          )}
        </Grid.Column>
      </Grid.Column>
    </Grid>
  );
}
