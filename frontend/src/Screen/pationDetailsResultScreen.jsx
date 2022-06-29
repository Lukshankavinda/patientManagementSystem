import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { Button,  Row, Col, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate ,Link,useLocation} from 'react-router-dom';
import NavigationBar2 from './doctorNavbar2'
import { BiSearchAlt2 } from "react-icons/bi";

function PatientDetailsResult() {
    const [phone_no, setPN] = useState('');
    const [complaint, setComplaint] = useState('');
    const [illness, setIllness] = useState([]);
    const [blood_pressure, setBloodPressure] = useState('');
    const [weight, setWeight] = useState('');
    const [treatment, setTreatment] = useState([]);
    const [pulse, setPulse] = useState('');
    const [search,setSearch] =useState('');
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [requestError, setRequestError] = useState();
    const navigater = useNavigate();
    const location = useLocation();
    const [selectillness, setIll] = useState();
    const [selecttretment, setTreat] = useState();

    const userToken = localStorage.getItem('userJWT');
    console.log('userToken', userToken);

    axios.interceptors.request.use(
        (config) => {
            config.headers.authorization = `Bearer ${userToken}`;
            console.log(config);
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
    useEffect(() => {
        axios.get(`http://localhost:5000/get_patient/${location.state.phone_no}`)
        .then((res) => {
            console.log(res);
            setPosts(res.data.patient);
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err);
            setRequestError(err);
        });
    }, []);
    const handleAddIssues = () => {
        setError(null);
        setLoading(true);

        axios.post(`http://localhost:5000/update_patient/${posts.map(post=>post._id)}`, {
            complaint:complaint,
            illness:illness,
            blood_pressure:blood_pressure,
            weight:weight,
            treatment:treatment,
            pulse:pulse,
            headers: { Authorization: `Bearer ${userToken}` }
        })
        .then((response1) => {
            console.log(response1);
            navigater(`/history/${posts.map(post=>post.phone_no)}`,{state:{phone_no:posts.map(post=>post.phone_no)}});
        })
        .catch((error) => {
            setLoading(false);
            if (error.response1.status === 400 || error.response1.status === 401 || error.response1.status === 409) {
                setError(error.response1.data);
                setError('Fill all the details');
            } else {
                setError('Invalid input');
            }
        });
    };
    const Search = (search) =>{
        axios.get(`http://localhost:5000/get_patient/${search}`)
        .then(response=>{
            navigater(`/detaillsR/${search}`,{state:{phone_no:search}})
            window.location.reload();
        }).catch(error=>{
            setError("something is wrong");
        })
    }

    const addIllness = (illl) => {
        setIllness((illness) => [...illness, illl]);
        console.log(illness);
    };
    
    const addTreatment = (treat) => {
        setTreatment((treatment) => [...treatment, treat]);
        console.log(treatment);
    };

    return (
        <div>
            <NavigationBar2  phone_no= {phone_no}/><br />
            <Row>
                <Col>
                    <h3 style={{ textAlign: 'left', marginLeft: '30%', marginTop: '1%' }}>Patient Details </h3>
                </Col>
                <Col>
                    <h3 style={{ textAlign: 'left', marginLeft: '50%',marginRight: '20%', marginTop: '1%' }}>
                    <Row>
                        <Col>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control 
                                        type="email" 
                                        placeholder="Search Patient"
                                        value={search}
                                        onChange={e=>setSearch(e.target.value)} />
                                    <Button 
                                        onClick={()=>{Search(search)}}  >
                                            <BiSearchAlt2/>
                                    </Button>
                                </Form.Group>
                            </Form>
                        </Col> 
                    </Row></h3>
                </Col>
            </Row>
            <div class="card" style={{ width: '77%', marginTop: '1%', marginLeft: '14%',marginRight: '1%', backgroundColor: '#E5E4E2' }}>
                <div class="card-body">
                    <h4 style={{ textAlign: 'left', marginLeft: '5%', marginTop: '1%' }}>Personal Details </h4>{' '}
                    <div><br />
                        {error && (
                            <div className="error" style={{ marginTop: '-10px', color: 'red' }}>
                                {error}
                            </div>
                        )}
                        <Row style={{ width: '75%', marginLeft: '15%', marginRight: '15%', backgroundColor: '#white' }}>
                            <div>{posts.map(post=>(<>   
                                <Row >  
                                    <Col>
                                        <Form.Group className="mb-3" controlId="formBasicName">
                                            <Form.Control type="number" value={post.phone_no} disabled/>
                                        </Form.Group>
                                    </Col><Col></Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="formBasicPhoneNo">
                                            <Form.Control type="text" value={post.first_name} disabled/>
                                        </Form.Group>
                                    </Col>
                                    <Col> 
                                        <Form.Group className="mb-" controlId="formBasicPhoneNo">
                                            <Form.Control type="text" value={post.last_name} disabled/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="formBasicIssue">
                                            <Form.Control type="text" value={post.dob} disabled/>
                                        </Form.Group>
                                    </Col>
                                    <Col style={{ width: '75%', marginLeft: '0%', backgroundColor: '#white' }}>{post.gender}
                                    </Col>
                                </Row> </>))}  
                            </div>
                        </Row>
                    </div>
                </div>
            </div> ____________________________________________________________________________________________________      
            <Form> 
                <div>
                    <div>
                        <div> 
                            <div className="card" 
                                 style={{ width: '77%', marginTop: '0%', marginLeft: '14%',marginRight: '1%', backgroundColor: '#E5E4E2' }}>
                                <div className="card-body">
                                    <h4 style={{ textAlign: 'left', marginLeft: '5%', marginTop: '1%' }}>Medical Record </h4>
                                    <Row style={{ width: '75%', marginLeft: '15%', marginRight: '15%', backgroundColor: '#white' }}>
                                        <Row>
                                            <Col> 
                                                <Form.Group className="mb-3" controlId="formBasicName">
                                                    <Form.Control  style={{ height: '95px' }} 
                                                                   type="textarea" 
                                                                   placeholder="Complaint"
                                                                    value={complaint} 
                                                                    onChange={(e) => setComplaint(e.target.value)} />
                                                </Form.Group>
                                            </Col>
                                            <Col>
                                                <Row>
                                                    <Col>
                                                        <Form.Group className="mb-3" controlId="formBasicIssue">
                                                            <Form.Control type="number" 
                                                                        placeholder="Blood Pressure" 
                                                                        value={blood_pressure} 
                                                                        onChange={(e) => setBloodPressure(e.target.value)} />
                                                        </Form.Group>
                                                        <Form.Group className="mb-" controlId="formBasicPhoneNo">
                                                            <Form.Control type="number" 
                                                                        placeholder="Weight" 
                                                                        value={weight} onChange={(e) => setWeight(e.target.value)} />
                                                        </Form.Group>
                                                    </Col> 
                                                    <Col> 
                                                        <Form.Group className="mb-" controlId="formBasicPhoneNo">
                                                            <Form.Control type="number" placeholder="Pulse" value={pulse} onChange={(e) => setPulse(e.target.value)} />
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                        <Row >
                                            <Col >  
                                                <Form.Group className="mb-3" controlId="formBasicPhoneNo">
                                                    <Form.Label ><b >Illness</b></Form.Label><br></br>
                                                        <select
                                                            value={selectillness}
                                                            onChange={(e) => addIllness(e.target.value)}>
                                                                <option>Fever</option>
                                                                <option>Shorteness of breath</option>
                                                                <option>weekness of fatigue</option>
                                                        </select>
                                                </Form.Group>
                                                {illness.map((element, index) => (
                                                    <Badge mb="3" className="mt-3 mx-1" pill bg="primary" key={index}>
                                                        {element}
                                                    </Badge>
                                                ))}
                                            </Col><Col></Col>
                                            <Col >
                                                <Form.Group className="mb-" controlId="formBasicPhoneNo">
                                                    <Form.Label><b>Treatment</b></Form.Label><br></br>
                                                    <select
                                                        value={selecttretment}
                                                        onChange={(e) => addTreatment(e.target.value)}>
                                                            <option>Electrofiagram</option>
                                                            <option>Holter monitering</option>
                                                            <option>Ecocardiogram</option>
                                                    </select>
                                                </Form.Group>
                                                {treatment.map((element, index) => (
                                                    <Badge mb="3" className="mt-3 mx-1" pill bg="info" key={index}>
                                                        {element}
                                                    </Badge>
                                                ))}
                                            </Col><Col></Col>
                                        </Row>
                                    </Row>
                                </div> 
                            </div>
                        </div>
                    </div><br/>
                    <Form.Group className="mb-3">
                        <Col sm={{ span: 50, offset: 9 }}>
                            <Link to="/patient_details">
                                <Button variant="light">Close</Button>
                            </Link>&nbsp;&nbsp;
                            <Button className="button" 
                                    type="submit" 
                                    value={loading ? 'Loading...' : 'Sumbit'} 
                                    disabled={loading} 
                                    onClick={handleAddIssues}>
                                Save
                             </Button>
                        </Col>
                    </Form.Group>
                </div>
            </Form>
        </div>
    );
}
export default PatientDetailsResult;
