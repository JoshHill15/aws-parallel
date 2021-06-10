import React, { useEffect, useState } from "react"
import { DataGrid } from '@material-ui/data-grid';
import { API } from "aws-amplify"
import "../styles/InstructorStudents.css"

const x = {
    "AWSTemplateFormatVersion": "2010-09-09",
    "Metadata": {
        "AWS::CloudFormation::Designer": {
            "c4a1fe87-fa7d-47e5-a95c-84b06e71a1df": {
                "size": {
                    "width": 670,
                    "height": 380
                },
                "position": {
                    "x": 50,
                    "y": 60
                },
                "z": 0,
                "embeds": [
                    "6f5aecdc-17ae-4509-9ace-338b05a32379",
                    "33354988-a9e7-4cf7-a1ac-2ff75de5b0d9"
                ]
            },
            "33354988-a9e7-4cf7-a1ac-2ff75de5b0d9": {
                "size": {
                    "width": 260,
                    "height": 300
                },
                "position": {
                    "x": 120,
                    "y": 106
                },
                "z": 1,
                "parent": "c4a1fe87-fa7d-47e5-a95c-84b06e71a1df",
                "embeds": [
                    "84681a0e-16c2-4bbc-8afe-10c5730244b0",
                    "201c39b0-3505-471d-b92e-aaa460bd3e8a",
                    "4b6dd5a2-c77e-43dc-8017-13ffb8ced061"
                ],
                "iscontainedinside": [
                    "c4a1fe87-fa7d-47e5-a95c-84b06e71a1df",
                    "c4a1fe87-fa7d-47e5-a95c-84b06e71a1df",
                    "c4a1fe87-fa7d-47e5-a95c-84b06e71a1df",
                    "c4a1fe87-fa7d-47e5-a95c-84b06e71a1df",
                    "c4a1fe87-fa7d-47e5-a95c-84b06e71a1df",
                    "c4a1fe87-fa7d-47e5-a95c-84b06e71a1df",
                    "c4a1fe87-fa7d-47e5-a95c-84b06e71a1df",
                    "c4a1fe87-fa7d-47e5-a95c-84b06e71a1df"
                ]
            },
            "4b6dd5a2-c77e-43dc-8017-13ffb8ced061": {
                "size": {
                    "width": 60,
                    "height": 60
                },
                "position": {
                    "x": 220,
                    "y": 150
                },
                "z": 2,
                "parent": "33354988-a9e7-4cf7-a1ac-2ff75de5b0d9",
                "embeds": [],
                "iscontainedinside": [
                    "33354988-a9e7-4cf7-a1ac-2ff75de5b0d9",
                    "33354988-a9e7-4cf7-a1ac-2ff75de5b0d9",
                    "33354988-a9e7-4cf7-a1ac-2ff75de5b0d9",
                    "33354988-a9e7-4cf7-a1ac-2ff75de5b0d9",
                    "33354988-a9e7-4cf7-a1ac-2ff75de5b0d9",
                    "33354988-a9e7-4cf7-a1ac-2ff75de5b0d9",
                    "33354988-a9e7-4cf7-a1ac-2ff75de5b0d9"
                ]
            },
            "6f5aecdc-17ae-4509-9ace-338b05a32379": {
                "size": {
                    "width": 260,
                    "height": 300
                },
                "position": {
                    "x": 420,
                    "y": 110
                },
                "z": 1,
                "parent": "c4a1fe87-fa7d-47e5-a95c-84b06e71a1df",
                "embeds": [
                    "336413da-c737-497d-8f20-734966b9ed11",
                    "766143b0-c818-4b39-a768-1a7651ce6009",
                    "43b5c7b9-3bf8-4e3b-911a-af4cf54388b0"
                ],
                "iscontainedinside": [
                    "c4a1fe87-fa7d-47e5-a95c-84b06e71a1df",
                    "c4a1fe87-fa7d-47e5-a95c-84b06e71a1df",
                    "c4a1fe87-fa7d-47e5-a95c-84b06e71a1df",
                    "c4a1fe87-fa7d-47e5-a95c-84b06e71a1df",
                    "c4a1fe87-fa7d-47e5-a95c-84b06e71a1df",
                    "c4a1fe87-fa7d-47e5-a95c-84b06e71a1df",
                    "c4a1fe87-fa7d-47e5-a95c-84b06e71a1df",
                    "c4a1fe87-fa7d-47e5-a95c-84b06e71a1df"
                ]
            },
            "b2683417-50f0-4ee5-a707-fe34d4cdef2a": {
                "source": {
                    "id": "4b6dd5a2-c77e-43dc-8017-13ffb8ced061",
                    "selector": "g:nth-child(1) g:nth-child(4) g:nth-child(10) circle:nth-child(1)     ",
                    "port": "AWS::ContainedInsideLink-AWS::EC2::Subnet-SubnetId"
                },
                "target": {
                    "id": "33354988-a9e7-4cf7-a1ac-2ff75de5b0d9"
                },
                "z": 4
            },
            "969f19d8-4b2b-45b1-8880-20e4a760e57b": {
                "source": {
                    "id": "4b6dd5a2-c77e-43dc-8017-13ffb8ced061",
                    "selector": "g:nth-child(1) g:nth-child(4) g:nth-child(10) circle:nth-child(1)     ",
                    "port": "AWS::ContainedInsideLink-AWS::EC2::Subnet-SubnetId"
                },
                "target": {
                    "id": "33354988-a9e7-4cf7-a1ac-2ff75de5b0d9"
                },
                "z": 4
            },
            "072741c5-9ce5-4b7e-ab77-c1501202619c": {
                "source": {
                    "id": "33354988-a9e7-4cf7-a1ac-2ff75de5b0d9",
                    "selector": "g:nth-child(1) g:nth-child(5) g:nth-child(3) circle:nth-child(1)     ",
                    "port": "AWS::ContainedInsideLink-AWS::EC2::VPC-VpcId"
                },
                "target": {
                    "id": "c4a1fe87-fa7d-47e5-a95c-84b06e71a1df"
                },
                "z": 4
            },
            "47b44b75-0d25-4edf-abef-8f90b52a6ce2": {
                "source": {
                    "id": "33354988-a9e7-4cf7-a1ac-2ff75de5b0d9",
                    "selector": "g:nth-child(1) g:nth-child(5) g:nth-child(3) circle:nth-child(1)     ",
                    "port": "AWS::ContainedInsideLink-AWS::EC2::VPC-VpcId"
                },
                "target": {
                    "id": "c4a1fe87-fa7d-47e5-a95c-84b06e71a1df"
                },
                "z": 4
            },
            "e3b9a95c-c9f7-42eb-9e82-ecf149260d27": {
                "source": {
                    "id": "6f5aecdc-17ae-4509-9ace-338b05a32379",
                    "selector": "g:nth-child(1) g:nth-child(5) g:nth-child(3) circle:nth-child(1)     ",
                    "port": "AWS::ContainedInsideLink-AWS::EC2::VPC-VpcId"
                },
                "target": {
                    "id": "c4a1fe87-fa7d-47e5-a95c-84b06e71a1df"
                },
                "z": 4
            },
            "b96ad120-e765-4ba2-bb87-eac449876c7e": {
                "source": {
                    "id": "6f5aecdc-17ae-4509-9ace-338b05a32379",
                    "selector": "g:nth-child(1) g:nth-child(5) g:nth-child(3) circle:nth-child(1)     ",
                    "port": "AWS::ContainedInsideLink-AWS::EC2::VPC-VpcId"
                },
                "target": {
                    "id": "c4a1fe87-fa7d-47e5-a95c-84b06e71a1df"
                },
                "z": 4
            },
            "6385d0f4-cf9d-4d0e-87cd-8ab05264c865": {
                "source": {
                    "id": "33354988-a9e7-4cf7-a1ac-2ff75de5b0d9",
                    "selector": "g:nth-child(1) g:nth-child(5) g:nth-child(3) circle:nth-child(1)     ",
                    "port": "AWS::ContainedInsideLink-AWS::EC2::VPC-VpcId"
                },
                "target": {
                    "id": "c4a1fe87-fa7d-47e5-a95c-84b06e71a1df"
                },
                "z": 4
            },
            "618408f5-3439-46e3-8ef1-88ae2d7020f1": {
                "source": {
                    "id": "4b6dd5a2-c77e-43dc-8017-13ffb8ced061"
                },
                "target": {
                    "id": "33354988-a9e7-4cf7-a1ac-2ff75de5b0d9"
                },
                "z": 4
            },
            "b6fcade8-6e20-4e0a-a13b-67b4c76150b9": {
                "source": {
                    "id": "4b6dd5a2-c77e-43dc-8017-13ffb8ced061",
                    "selector": "g:nth-child(1) g:nth-child(4) g:nth-child(2) circle:nth-child(1)     ",
                    "port": "AWS::RefLink-AWS::EC2::NetworkInterface/AWS::EC2::Subnet-NetworkInterfaces"
                },
                "target": {
                    "id": "33354988-a9e7-4cf7-a1ac-2ff75de5b0d9"
                },
                "z": 4
            },
            "e847a7a3-ed91-465d-8a3a-ab5cece3c82a": {
                "source": {
                    "id": "4b6dd5a2-c77e-43dc-8017-13ffb8ced061",
                    "selector": "g:nth-child(1) g:nth-child(4) g:nth-child(2) circle:nth-child(1)     ",
                    "port": "AWS::RefLink-AWS::EC2::NetworkInterface/AWS::EC2::Subnet-NetworkInterfaces"
                },
                "target": {
                    "id": "33354988-a9e7-4cf7-a1ac-2ff75de5b0d9"
                },
                "z": 4
            },
            "190eb376-b4e2-468e-92b8-df6ae3a47eb7": {
                "source": {
                    "id": "4b6dd5a2-c77e-43dc-8017-13ffb8ced061",
                    "selector": "g:nth-child(1) g:nth-child(4) g:nth-child(2) circle:nth-child(1)     ",
                    "port": "AWS::RefLink-AWS::EC2::NetworkInterface/AWS::EC2::Subnet-NetworkInterfaces"
                },
                "target": {
                    "id": "33354988-a9e7-4cf7-a1ac-2ff75de5b0d9"
                },
                "z": 4
            },
            "f74f8958-c5da-4e6b-95f1-89e1e9961665": {
                "source": {
                    "id": "4b6dd5a2-c77e-43dc-8017-13ffb8ced061",
                    "selector": "g:nth-child(1) g:nth-child(4) g:nth-child(2) circle:nth-child(1)     ",
                    "port": "AWS::RefLink-AWS::EC2::NetworkInterface/AWS::EC2::Subnet-NetworkInterfaces"
                },
                "target": {
                    "id": "33354988-a9e7-4cf7-a1ac-2ff75de5b0d9"
                },
                "z": 4
            },
            "f2a8e55b-1d09-434a-a083-007744f501fc": {
                "source": {
                    "id": "4b6dd5a2-c77e-43dc-8017-13ffb8ced061",
                    "selector": "g:nth-child(1) g:nth-child(4) g:nth-child(2) circle:nth-child(1)     ",
                    "port": "AWS::RefLink-AWS::EC2::NetworkInterface/AWS::EC2::Subnet-NetworkInterfaces"
                },
                "target": {
                    "id": "33354988-a9e7-4cf7-a1ac-2ff75de5b0d9"
                },
                "z": 4
            },
            "806e14ac-3c5f-4f8c-b2bc-4cf4325e45f0": {
                "source": {
                    "id": "4b6dd5a2-c77e-43dc-8017-13ffb8ced061",
                    "selector": "g:nth-child(1) g:nth-child(4) g:nth-child(2) circle:nth-child(1)     ",
                    "port": "AWS::RefLink-AWS::EC2::NetworkInterface/AWS::EC2::Subnet-NetworkInterfaces"
                },
                "target": {
                    "id": "33354988-a9e7-4cf7-a1ac-2ff75de5b0d9"
                },
                "z": 4
            },
            "2e998d04-3c04-4d8c-85b4-14729d545f45": {
                "source": {
                    "id": "4b6dd5a2-c77e-43dc-8017-13ffb8ced061",
                    "selector": "g:nth-child(1) g:nth-child(4) g:nth-child(2) circle:nth-child(1)     ",
                    "port": "AWS::RefLink-AWS::EC2::NetworkInterface/AWS::EC2::Subnet-NetworkInterfaces"
                },
                "target": {
                    "id": "33354988-a9e7-4cf7-a1ac-2ff75de5b0d9"
                },
                "z": 4
            },
            "201c39b0-3505-471d-b92e-aaa460bd3e8a": {
                "size": {
                    "width": 60,
                    "height": 60
                },
                "position": {
                    "x": 220,
                    "y": 230
                },
                "z": 2,
                "parent": "33354988-a9e7-4cf7-a1ac-2ff75de5b0d9",
                "embeds": [],
                "iscontainedinside": [
                    "33354988-a9e7-4cf7-a1ac-2ff75de5b0d9",
                    "33354988-a9e7-4cf7-a1ac-2ff75de5b0d9",
                    "33354988-a9e7-4cf7-a1ac-2ff75de5b0d9",
                    "33354988-a9e7-4cf7-a1ac-2ff75de5b0d9",
                    "33354988-a9e7-4cf7-a1ac-2ff75de5b0d9",
                    "33354988-a9e7-4cf7-a1ac-2ff75de5b0d9",
                    "33354988-a9e7-4cf7-a1ac-2ff75de5b0d9"
                ]
            },
            "84681a0e-16c2-4bbc-8afe-10c5730244b0": {
                "size": {
                    "width": 60,
                    "height": 60
                },
                "position": {
                    "x": 220,
                    "y": 320
                },
                "z": 2,
                "parent": "33354988-a9e7-4cf7-a1ac-2ff75de5b0d9",
                "embeds": [],
                "iscontainedinside": [
                    "33354988-a9e7-4cf7-a1ac-2ff75de5b0d9",
                    "33354988-a9e7-4cf7-a1ac-2ff75de5b0d9",
                    "33354988-a9e7-4cf7-a1ac-2ff75de5b0d9",
                    "33354988-a9e7-4cf7-a1ac-2ff75de5b0d9",
                    "33354988-a9e7-4cf7-a1ac-2ff75de5b0d9",
                    "33354988-a9e7-4cf7-a1ac-2ff75de5b0d9",
                    "33354988-a9e7-4cf7-a1ac-2ff75de5b0d9"
                ]
            },
            "43b5c7b9-3bf8-4e3b-911a-af4cf54388b0": {
                "size": {
                    "width": 60,
                    "height": 60
                },
                "position": {
                    "x": 520,
                    "y": 140
                },
                "z": 2,
                "parent": "6f5aecdc-17ae-4509-9ace-338b05a32379",
                "embeds": [],
                "iscontainedinside": [
                    "6f5aecdc-17ae-4509-9ace-338b05a32379",
                    "6f5aecdc-17ae-4509-9ace-338b05a32379",
                    "6f5aecdc-17ae-4509-9ace-338b05a32379"
                ]
            },
            "766143b0-c818-4b39-a768-1a7651ce6009": {
                "size": {
                    "width": 60,
                    "height": 60
                },
                "position": {
                    "x": 520,
                    "y": 220
                },
                "z": 2,
                "parent": "6f5aecdc-17ae-4509-9ace-338b05a32379",
                "embeds": [],
                "iscontainedinside": [
                    "6f5aecdc-17ae-4509-9ace-338b05a32379",
                    "6f5aecdc-17ae-4509-9ace-338b05a32379",
                    "6f5aecdc-17ae-4509-9ace-338b05a32379"
                ]
            },
            "336413da-c737-497d-8f20-734966b9ed11": {
                "size": {
                    "width": 60,
                    "height": 60
                },
                "position": {
                    "x": 520,
                    "y": 300
                },
                "z": 2,
                "parent": "6f5aecdc-17ae-4509-9ace-338b05a32379",
                "embeds": [],
                "iscontainedinside": [
                    "6f5aecdc-17ae-4509-9ace-338b05a32379",
                    "6f5aecdc-17ae-4509-9ace-338b05a32379",
                    "6f5aecdc-17ae-4509-9ace-338b05a32379"
                ]
            }
        }
    },
    "Resources": {
        "EC2VPC4QP2T": {
            "Type": "AWS::EC2::VPC",
            "Properties": {},
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "c4a1fe87-fa7d-47e5-a95c-84b06e71a1df"
                }
            }
        },
        "EC2S3QB8B": {
            "Type": "AWS::EC2::Subnet",
            "Properties": {
                "VpcId": {
                    "Ref": "EC2VPC4QP2T"
                }
            },
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "33354988-a9e7-4cf7-a1ac-2ff75de5b0d9"
                }
            }
        },
        "EC2I106U8": {
            "Type": "AWS::EC2::Instance",
            "Properties": {
                "NetworkInterfaces": [
                    {
                        "SubnetId": {
                            "Ref": "EC2S3QB8B"
                        }
                    }
                ]
            },
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "4b6dd5a2-c77e-43dc-8017-13ffb8ced061"
                }
            }
        },
        "EC2S4ZZX1": {
            "Type": "AWS::EC2::Subnet",
            "Properties": {
                "VpcId": {
                    "Ref": "EC2VPC4QP2T"
                }
            },
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "6f5aecdc-17ae-4509-9ace-338b05a32379"
                }
            }
        },
        "EC2I2R9VW": {
            "Type": "AWS::EC2::Instance",
            "Properties": {
                "NetworkInterfaces": [
                    {
                        "SubnetId": {
                            "Ref": "EC2S3QB8B"
                        }
                    }
                ]
            },
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "201c39b0-3505-471d-b92e-aaa460bd3e8a"
                }
            }
        },
        "EC2I1JHSB": {
            "Type": "AWS::EC2::Instance",
            "Properties": {
                "NetworkInterfaces": [
                    {
                        "SubnetId": {
                            "Ref": "EC2S3QB8B"
                        }
                    },
                    {
                        "SubnetId": {
                            "Ref": "EC2S3QB8B"
                        }
                    }
                ]
            },
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "84681a0e-16c2-4bbc-8afe-10c5730244b0"
                }
            }
        },
        "EC2I1F181": {
            "Type": "AWS::EC2::Instance",
            "Properties": {
                "NetworkInterfaces": [
                    {
                        "SubnetId": {
                            "Ref": "EC2S4ZZX1"
                        }
                    }
                ]
            },
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "43b5c7b9-3bf8-4e3b-911a-af4cf54388b0"
                }
            }
        },
        "EC2I3T1LE": {
            "Type": "AWS::EC2::Instance",
            "Properties": {
                "NetworkInterfaces": [
                    {
                        "SubnetId": {
                            "Ref": "EC2S4ZZX1"
                        }
                    }
                ]
            },
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "766143b0-c818-4b39-a768-1a7651ce6009"
                }
            }
        },
        "EC2I3T4UQ": {
            "Type": "AWS::EC2::Instance",
            "Properties": {
                "NetworkInterfaces": [
                    {
                        "SubnetId": {
                            "Ref": "EC2S4ZZX1"
                        }
                    },
                    {
                        "SubnetId": {
                            "Ref": "EC2S4ZZX1"
                        }
                    }
                ]
            },
            "Metadata": {
                "AWS::CloudFormation::Designer": {
                    "id": "336413da-c737-497d-8f20-734966b9ed11"
                }
            }
        }
    }
}
function InstructorsStudents({ email }){
    const [rows, setRows] = useState([])

    async function getStudentProblems() {
        const myInit = {
            queryStringParameters: {
                instructor_email: email
            }
        }
        try {
            let count = 1
            let res = await API.get("studentProblems", "/studentProblems/:instructor_email", myInit)
            res = res.map(cv => {
                cv.submission = x
                cv.id = count++
                return cv
            })
            setRows(res)
        } catch (e) {
            console.log("errrr", e)
        }

    }

    const downloadFile = async (myData) => {
        const fileName = "CFFILE";
        const json = JSON.stringify(myData);
        const blob = new Blob([json],{type:'application/json'});
        const href = await URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        link.download = fileName + ".json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'studentsName', headerName: 'Students Name', width: 250 },
        { field: 'problemName', headerName: 'Problem Name', width: 250 },
        { field: 'grade', headerName: 'Grade', width: 250 },
        { field: 'instructorReview', headerName: 'Review', width: 200 },
        { field: 'submission', headerName: 'Submission', width: 300, renderCell: params => (
            <button className="download-button" onClick={e => downloadFile(params.value)}>Download File</button>
       )},
      ];

    useEffect(() => {
        if (email !== "") getStudentProblems()
    }, [email])

    return (
        <div>
            <div style={{ height: 550, width: '90%', marginLeft: "5%", marginTop: "3%"}}>
                <DataGrid rows={rows} columns={columns} pageSize={8} checkboxSelection={false} />
            </div>  
        </div>
    )
}
export default InstructorsStudents