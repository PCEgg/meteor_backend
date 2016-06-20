import {FlowRouter} from 'meteor/kadira:flow-router'
import React from 'react'
import {mount} from 'react-mounter'

//Layouts and Pages
import AppContainer from '../../ui/containers/app_container'
import { Homepage } from '../../ui/pages/homepage'
import { PostDetailContainer } from '../../ui/posts/posts_detail_ui_wrapper'

FlowRouter.route('/', {
  name: 'homepage',
  action() {
    mount(AppContainer, {
      content: (props) => <Homepage {...props} />
    })
  }
})

FlowRouter.route('/posts', {
  name: 'homepage',
  action() {
    mount(AppContainer, {
      content: (props) => <Homepage {...props} />
    })
  }
})

FlowRouter.route('/posts/:id', {
  name: 'postdetail',
  action() {
    mount(PostDetailContainer, {
      content: () => <PostDetailContainer />
    })
  }
})
