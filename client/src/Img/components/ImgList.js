import React from 'react';
import PropTypes from 'prop-types';

// Import Components
import ImgListItem from './ImgListItem';
import { makeStyles } from '@material-ui/core/styles';

// Import Style
const useStyles = makeStyles(theme => ({
    root: {
        '&': {
            gap: '20px',
            flexWrap: 'wrap'
        }
    },
}));

function ImgList({ imgs, onRemove }) {
  const classes = useStyles();

  return (
    <div className={`${classes.root} d-flex w-100 mt-4`}>
      { imgs.map(img => <ImgListItem img={img} key={img.name} onRemove={onRemove}/>) }
    </div>
  );
}

ImgList.propTypes = {
  imgs: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired
  })).isRequired,
  onRemove: PropTypes.func
};

export default ImgList;
