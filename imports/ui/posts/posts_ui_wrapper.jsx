import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import PostsList from '../components/posts'

export default PostsListContainer = createContainer(() => {
  // Do all your reactive data access in this method.
  // Note that this subscription will get cleaned up when your component is unmounted
  var handle = Meteor.subscribe('posts', 'Nelsong Ng');
  // var handle = Meteor.subscribe('posts');
  return {
    currentUser: Meteor.user(),
    listLoading: ! handle.ready(),
    posts: Posts.find().fetch(),
  };
}, PostsList);
