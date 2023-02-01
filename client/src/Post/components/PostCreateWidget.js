import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import ImgList from '../../Img/components/ImgList';
import ImgUploader from '../../Img/components/ImgUploader';
import { deleteImage } from '../../util/cloudinary';
// Import Style

const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const PostCreateWidget = ({ addPost }) => {
    const [state, setState] = useState({});
    const classes = useStyles();

  const submit = () => {
    if (state.name && state.title && state.content) {
      addPost(state);
    }
  };

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
        ...state,
        [evt.target.name]: value
    });
  };

  const handleOnUpload = (newImgs) => {
    setState({
      ...state,
      'imgs': [...(state.imgs || []), ...newImgs]
    });
  }

  const handlerOnImgRemove = (name) => {
    deleteImage(name)
      .then(() => {
        setState({
          ...state,
          'imgs': state.imgs.filter(img => img.name !== name)
        }); 
      });
  }

  return (
    <div className={`${classes.root} d-flex flex-column my-4 w-100`}>
        <h3>Create new post</h3>
        <TextField variant="filled" label="Author name" name="name" onChange={handleChange} />
        <TextField variant="filled" label="Post title" name="title" onChange={handleChange} />
        <TextField variant="filled" multiline rows="4" label="Post content" name="content" onChange={handleChange} />

        <ImgList imgs={state.imgs} onRemove={handlerOnImgRemove}/>
        <ImgUploader onUpload={handleOnUpload}/>

        <Button className="mt-4" variant="contained" color="primary" onClick={() => submit()} disabled={!state.name || !state.title || !state.content}>
            Submit
        </Button>
    </div>
  );
};

PostCreateWidget.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default PostCreateWidget;
