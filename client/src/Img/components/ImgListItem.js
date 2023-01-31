import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {AdvancedImage} from '@cloudinary/react';
import {fill} from "@cloudinary/url-gen/actions/resize";
import {CloudinaryImage} from '@cloudinary/url-gen';
import {byRadius} from "@cloudinary/url-gen/actions/roundCorners";
import { makeStyles } from '@material-ui/core/styles';
import ImgZoom from './ImgZoom';

// Import Style
const useStyles = makeStyles(theme => ({
    root: {
        '&': {
            position: 'relative',
        }
    },
    cross: {
      '&': {
        backgroundColor: 'red',
        color: 'white',
        position: 'absolute',
        right: '-15px',
        top: '-15px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        height: '30px',
        width: '30px',
        fontWeight: 'bold',
        border: '1px solid white',
        lineHeight: '15px'
      }
    }
}));

function ImgListItem({ img, onRemove }) {
  const [isZoomed, setIsZoomed] = useState(false);
  const classes = useStyles();

  const cldImg = new CloudinaryImage(img.name, { cloudName: process.env.REACT_APP_CLOUDINARY_NAME })
              .resize(fill().width(100).height(100))
              .roundCorners(byRadius(5));

  return <div className={classes.root}>
    { onRemove && <div className={classes.cross} onClick={() => onRemove(img.name)}>x</div>}
    <AdvancedImage cldImg={cldImg} onClick={() => setIsZoomed(true)}/>

    { isZoomed && <ImgZoom img={img} onClose={() => setIsZoomed(false)}/> }
  </div>;
}

ImgListItem.propTypes = {
  img: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired,
  onRemove: PropTypes.func
};

export default ImgListItem;
