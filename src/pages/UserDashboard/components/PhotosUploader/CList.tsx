import React from 'react'
import {AdvancedImage} from '@cloudinary/react';
import {Cloudinary} from "@cloudinary/url-gen";

import {sepia} from "@cloudinary/url-gen/actions/effect";

export const CList = () => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.REACT_APP_CLOUDINARY_API_KEY,
      apiSecret: process.env.REACT_APP_CLOUDINARY_API_SECRET,
    }
  }); 

  // Use the image with public ID, 'front_face'.
  const myImage = cld.image('front_face');

  // Apply the transformation.
  myImage
  .effect(sepia());  // Apply a sepia effect.

  // Render the transformed image in a React component.
  return (
    <div>
      <AdvancedImage cldImg={myImage} />
    </div>
  )
};