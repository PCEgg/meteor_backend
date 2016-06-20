import React from 'react'

function formSubmit(){}

export const Homepage = (props) => {

  const signedInMsg = props.signedIn? "You are signed in" : "You are not signed in"

  return (
    <div>
      <div onClick={formSubmit()}>email</div>
      {signedInMsg}
    </div>
  )
}
