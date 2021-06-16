import React from "react"
import { Form } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { Row, Col, Container } from 'react-bootstrap';
import { useLocation } from "react-router-dom";

function InstructorProblemPage() {
    const { state } = useLocation();

    return (
        <div className="container">
            <Form >
                <Form.Group controlId="formBasicEmail">
                    {/* <Form.Label>Problem Name</Form.Label>
                    <Form.Control size='lg' value={problemName} onChange={e => setProblemName(e.target.value)} placeholder="Enter problem name" /> */}
                </Form.Group>
                <Form.Group>
                    <Form.Label>Scenario: </Form.Label>
                    <Form.Control plaintext readOnly defaultValue={state.value.problemName}></Form.Control>
                    <Form.Control plaintext readOnly defaultValue={state.value.textBoxData} ></Form.Control>
                    <Container>
                        <Row>
                            <Col xs={6} md={8}>
                                <Image src={state.value.diagram} fluid rounded alt="image" />
                            </Col>
                        </Row>
                    </Container>
                </Form.Group>
                
            </Form>
        </div>
    )
}
export default InstructorProblemPage