const cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

/**
 * Delete an image
 * @param req
 * @param res
 * @returns Promise
 */
deleteImage = async (img) => {
    return cloudinary.v2.uploader.destroy(img.name);
};

module.exports = {
  deleteImage
};
