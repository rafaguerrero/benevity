import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { uploadImage } from '../../util/cloudinary';

// Import Style
const useStyles = makeStyles(theme => ({
    root: {
        '&': {
            gap: '10px',
            flexWrap: 'wrap'
        },
        '&.loading': {
          opacity: '0.2',
          pointerEvents: 'none'
      }
    },
    input: {
      '&': {
        display: 'none'
      }
    },
    label: {
      '&': {
        width: '100px',
        height: '100px',
        backgroundColor: 'rgba(0, 0, 0, 0.09)',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '30px',
        borderTopLeftRadius: '4px',
        borderTopRightRadius: '4px',
        borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
        cursor: 'pointer'
      }
    }
}));

function ImgUploader({ onUpload }) {
  const [isLoading, setIsLoading] = useState(false);
  const classes = useStyles();

  const onFileChange = (e) => {
    const files = e.target.files;
    
    if(files.length > 0) {  
      setIsLoading(true);

      uploadImage(files[0])
        .then((data) => {
          onUpload([{ name: data.public_id }]);
          setIsLoading(false);
        });
    }
  }

  return (
    <div className={`${classes.root} ${isLoading ? 'loading' : ''}`}>
      <label className={`${classes.label} d-flex flex-column`} htmlFor="ImgUploaderInput">
        +
      </label>
      <input className={classes.input}
                  type="file"
                  id="ImgUploaderInput"
                  accept=".png,.jpg,.jpeg"
                  onChange={onFileChange} />
    </div>
  );
}

ImgUploader.propTypes = {
  onUpload: PropTypes.func.isRequired,
};

export default ImgUploader;