import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Import Style
import { makeStyles } from '@material-ui/core/styles';
// Import Components
import PostList from '../../components/PostList';
import PostCreateWidget from '../../components/PostCreateWidget';
import UserManagement from '../../../User/components/UserManagement';
// Import Actions
import { addPostRequest, deletePostRequest, fetchPosts } from '../../PostActions';
import Logo from '../../../logo.svg';

const useStyles = makeStyles(theme => ({
    inputContainer: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const PostListPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const posts = useSelector(state => state.posts.data);
  const authToken = useSelector(state => state.users.token);

  useEffect(() => {
    dispatch(fetchPosts());
  },[dispatch]);

  const handleDeletePost = post => {
    if (confirm('Do you want to delete this post')) { // eslint-disable-line
      dispatch(deletePostRequest(post, authToken));
    }
  };

  const handleAddPost = (post) => dispatch(addPostRequest(post, authToken));

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 d-flex align-items-center">
          <img className="mx-3" src={Logo} alt="Logo" style={{ height: '72px'}}/>
          <h1 className="mt-4">
             Alaya Blog
          </h1>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-6">
          { authToken ? 
            <PostCreateWidget className={classes.inputContainer} addPost={handleAddPost} /> :
            <UserManagement className={classes.inputContainer}/> }
        </div>
        <div className="col-6">
          <PostList handleDeletePost={handleDeletePost} posts={posts} />
        </div>
      </div>
    </div>
  );
};

export default PostListPage;
