import React from "react"
import "../styles/StudentHeader.css"
import { AmplifySignOut } from '@aws-amplify/ui-react'
import { Link } from "react-router-dom";


function StudentHeader() {

    return (
        <div className="main-div">
            <Link className="links" to="/">Home</Link>
            <Link className="links" to="/studentProblems">Problems</Link>
            <AmplifySignOut />
        </div>
    )
}

export default StudentHeader