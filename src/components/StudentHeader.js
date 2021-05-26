import React from "react"
import "../styles/StudentHeader.css"
import { AmplifySignOut } from '@aws-amplify/ui-react'

function StudentHeader() {

    return (
        <div className="main-div">
            <p>Home</p>
            <p>Problems </p>
            <p><AmplifySignOut /></p>
        </div>
    )
}

export default StudentHeader