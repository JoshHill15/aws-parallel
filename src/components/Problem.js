import React from "react"
import StudentProblemPage from './StudentProblemPage';
import InstructorProblemPage from './InstructorProblemPage';

function Problem({ userGroup, email, setUserSubmission }) {

    return (
        <div className="container">
            {userGroup === 'Students' ? <StudentProblemPage email={email} setUserSubmission={setUserSubmission}/> : <InstructorProblemPage />}
        </div>
    )
}

export default Problem