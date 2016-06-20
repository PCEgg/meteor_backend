import React, { Component, PropTypes } from 'react';

function goDetail(text){
  const goto = text._id;
  FlowRouter.go('/posts/' + goto);
}

const PostList = ({posts}) => (
  <div>
    This is the post list
    <ul>
      {posts.map(({_id, title}) => (
        <li key={_id}>
          <div>{_id}</div>
          <div onClick={()=>{goDetail({_id})}}>{title}</div>
        </li>
      ))}
    </ul>
  </div>
);

export default PostList;
