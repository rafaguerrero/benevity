import React from 'react';
import PropTypes from 'prop-types';
import {AdvancedImage} from '@cloudinary/react';
import {CloudinaryImage} from '@cloudinary/url-gen';
import { makeStyles } from '@material-ui/core/styles';

// Import Style
const useStyles = makeStyles(theme => ({
    root: {
        '&': {
            position: 'fixed',
            height: '100%',
            width: '100%',
            top: 0,
            left: 0,
            backgroundColor: 'rgba(0,0,0,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: '10'
        },
        '& > img': {
          maxWidth: '100%',
          maxHeight: '100%'
        }
    }
}));

function ImgZoom({ img, onClose }) {
  const classes = useStyles();

  const cldImg = new CloudinaryImage(img.name, { cloudName: process.env.REACT_APP_CLOUDINARY_NAME });

  return <div className={classes.root} onClick={onClose}>
    <AdvancedImage cldImg={cldImg}/>
  </div>;
}

ImgZoom.propTypes = {
  img: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,
  onClose: PropTypes.func
};

export default ImgZoom;
