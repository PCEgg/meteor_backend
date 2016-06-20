import React from 'react'
import AccountsUIWrapper from '../accounts/accounts_ui_wrapper'
import PostsUIWrapper from '../posts/posts_ui_wrapper'

export const AppLayout = (props) => {
  return (
	<div>
    <PostsUIWrapper />
	  <AccountsUIWrapper />
    	  <div>{props.content(props)}</div>
	</div>
  )
}
