import React, { useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

export default function PhotoWidgetCropper({ setImage, imagePreview }) {
  const cropperRef = useRef(null);

  function cropImage() {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    if (typeof cropper.getCroppedCanvas() === "undefined") {
      return;
    }
    cropper.getCroppedCanvas().toBlob((blob) => {
      setImage(blob);
    }, "image/jpeg");
  }

  return (
    <Cropper
      ref={cropperRef}
      src={imagePreview}
      style={{ height: 200, width: "100%" }}
      // Cropper.js options
      initialAspectRatio={1}
      preview=".img-preview"
      guides={false}
      viewMode={1}
      dragMode="move"
      scalable={true}
      cropBoxMovable={true}
      cropBoxResizable={true}
      crop={cropImage}
    />
  );
}

// const PhotoWidgetCropper = ({ setImage, imagePreview }) => {
//   let cropper;

//   const onCropperInit = (component) => {
//     cropper = component;
//   };

//   const cropImage = () => {
//     // cropper.getCroppedCanvas().toDataURL()
//     if (cropper && typeof cropper.getCroppedCanvas() === "undefined") {
//       return;
//     }
//     cropper.getCroppedCanvas().toBlob((blob) => {
//       setImage(blob);
//     }, "image/jpeg");
//   };

//   return (
//     <Cropper
//       ref={cropper}
//       src={imagePreview}
//       style={{ height: 200, width: "100%" }}
//       // Cropper.js options
//       initialAspectRatio={1}
//       preview=".img-preview"
//       guides={false}
//       viewMode={1}
//       dragMode="move"
//       scalable={true}
//       cropBoxMovable={true}
//       cropBoxResizable={true}
//       crop={cropImage}
//     />
//   );
// };

// export default PhotoWidgetCropper;
