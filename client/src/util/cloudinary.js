import fetch from 'isomorphic-fetch';
import cloudinary from "cloudinary/lib/cloudinary";
 
cloudinary.config({
  cloud_name: process.env.REACT_APP_CLOUDINARY_NAME,
  api_key: process.env.REACT_APP_CLOUDINARY_KEY,
  api_secret: process.env.REACT_APP_CLOUDINARY_SECRET
});

export async function uploadImage(file) {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", "ljm8ptfg");

  return fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_NAME}/image/upload`, {
    method: "POST",
    body: formData
  })
  .then((response) => response.json())
  .catch(_err=> console.log("Something went wrong, please try again later."));
}

export async function deleteImage(name) {
  return cloudinary.v2.uploader.destroy(name)
    .catch(_err=> console.log("Something went wrong, please try again later."));
}