import React, { useEffect, useState } from "react";
import { PhotoCard } from "./PhotoCard";
// import { deletePhoto, getAllPhotos } from "./actions/cloudinaryActions";
import { UserCloudinaryImage } from "./UserCloudinaryImage";
import { PhotosList } from "./PhotosList";
import { CList } from "./CList";

export const PhotosPage = () => {
  const [photos, setPhotos] = useState<Array<any>>([]);
  // useEffect(() => {
  //   const getData = async () => {
  //     const photos = await getAllPhotos();
  //     if (photos) setPhotos(photos);
  //   };
  //   getData();
  // });
  return (
    <>
      <UserCloudinaryImage />
      <PhotosList photos={photos} />
      <br />
      CList
      <br />
      <CList/>
    </>
  );
};
