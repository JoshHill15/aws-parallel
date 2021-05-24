import React from "react"
import "../styles/InstructorHeader.css"
import { AmplifySignOut } from '@aws-amplify/ui-react'

function InstructorHeader() {

    return (
        <div className="main-div">
            <p>Home</p>
            <p>Submissions</p>
            <p><AmplifySignOut /></p>
        </div>
    )
}

export default InstructorHeader