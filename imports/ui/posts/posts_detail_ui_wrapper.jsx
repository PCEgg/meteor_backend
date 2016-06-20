import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import PostDetail from '../components/post_detail';

export const PostDetailContainer = createContainer(() => {
  //var _id = FlowRouter.current().route._params.keys.id;
  var _id = FlowRouter.getParam("id");
  var handle = Meteor.subscribe('post.detail', _id);
  return {
    currentUser: Meteor.user(),
    listLoading: ! handle.ready(),
    postDetailData: Posts.find({_id: _id}).fetch(),
  };
}, PostDetail);
