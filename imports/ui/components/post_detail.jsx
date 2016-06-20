import React, { Component, PropTypes } from 'react';

function goPostsList(){
  FlowRouter.go('/posts');
}

const PostDetail = ({postDetailData}) => (
  <div>
    This is the post detail
    <ul>
      {postDetailData.map(({_id, title}) => (
        <div key={_id}>
          <div>{title}</div>
        </div>
      ))}
    </ul>
  </div>
);

export default PostDetail;
