import React from "react"
import StudentProblemPage from './StudentProblemPage';
import InstructorProblemPage from './InstructorProblemPage';

function Problem({ userGroup, email }) {

    return (
        <div className="container">
            {userGroup === 'Students' ? <StudentProblemPage email={email} /> : <InstructorProblemPage />}
        </div>
    )
}

export default Problem