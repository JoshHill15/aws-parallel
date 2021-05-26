import React from "react"
import { AmplifyAuthenticator, AmplifySignUp, AmplifySignIn } from '@aws-amplify/ui-react';

function Login() {
    return (
        <AmplifyAuthenticator usernameAlias="email">
         <AmplifySignUp
          slot="sign-up"
          usernameAlias="email"
          formFields={[
            {
              type: "email",
              label: "Enter Email",
              placeholder: "Enter Email",
              required: true,
            },
            {
              type: "password",
              label: "Enter Password",
              placeholder: "Enter Password",
              required: true,
            },
            {
              type: "custom:Instructors",
              label: "Instructor or Student",
              placeholder: "Instructor/Student",
              required: true,
              displayOrder: 5
            },
          ]} 


        />
        <AmplifySignIn slot="sign-in" usernameAlias="email" />
      </AmplifyAuthenticator>

      
    )
}

export default Login