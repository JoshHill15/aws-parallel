import React from "react"
import { Form } from 'react-bootstrap';
import "../styles/createProblem.css"



function MyAccount() {

    return (
        // <form align="center">
        //     <label>
        //         My Account Information:
        //     </label><br />
        //     <lable for="fname">First Name:</lable><br />
        //     <input type="text" id="fname" name="fname" /><br /><br />
        //     <lable for="fname">Last Name:</lable><br />
        //     <input type="text" id="lname" name="lname" /><br /><br />
        //     <lable for="fname">Email:</lable><br />
        //     <input type="email" id="email" name="email" />
        //     <input type="submit" value="Submit"></input>
        // </form>
        <div className="container">
            <Form >
                <Form.Group controlId="basicForm">
                    <Form.Label>My Account Information</Form.Label>
                    {/* <Form.Label>Problem Name</Form.Label>
                <Form.Control size='lg' value={problemName} onChange={e => setProblemName(e.target.value)} placeholder="Enter problem name" /> */}
                </Form.Group>
                <Form.Group>
                    <Form.Label>First Name:</Form.Label>
                    <Form.Control type="text" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Last Name:</Form.Label>
                    <Form.Control type="text" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" />
                </Form.Group>
                <Form.Group>
                    <button className="submit">
                        Submit
                </button>
                </Form.Group>
            </Form>
        </div>
    )
}

export default MyAccount