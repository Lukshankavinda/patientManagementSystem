import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { Button, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate ,Link} from 'react-router-dom';
import { BiSearchAlt2 } from "react-icons/bi";
import DoctorNavbar from './doctorNavbar'

export default function PationDetailsScreen() {
  
  const [phone_no, setPN] = useState('');
  const [first_name, setFName] = useState('');
  const [last_name, setLName] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDOB] = useState('');
  const [complaint, setComplaint] = useState('');
  const [illness, setIllness] = useState('');
  const [blood_pressure, setBloodPressure] = useState('');
  const [weight, setWeight] = useState('');
  const [treatment, setTreatment] = useState('');
  const [pulse, setPulse] = useState('');
  const [search,setSearch] =useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigater = useNavigate();

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

  const handleAddIssues = () => {
    setError(null);
    setLoading(true);

    axios.post(`http://localhost:5000/patientdetails`, {
      phone_no: phone_no,
      first_name:first_name,
      last_name:last_name,
      gender: gender,
      dob:dob,
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
      navigater(`/history/${phone_no}`,{state:{phone_no:phone_no}});
        
    })
    .catch((error) => {
      setLoading(false);
      if (error.response1.status === 400 || error.response1.status === 401 || error.response1.status === 409) {
        setError(error.response1.data);
        setError('Fill all the details');
      } 
      else {
        setError('Invalid input');
      }
    });
  };

  const Search = (search) =>{
    axios.get(`http://localhost:5000/get_patient/${search}`)
      .then(response=>{
          navigater(`/detaillsR/${search}`,{state:{phone_no:search}})

      }).catch(error=>{
          setError("something is wrong");
      })
  }


  return (
    <div>
      <DoctorNavbar/>
      <br />
      <Row>
        <Col>
          <h3 style={{ textAlign: 'left', marginLeft: '30%', marginTop: '1%' }}>Patient Details </h3>
        </Col>

        <Col>
          <h3 style={{ textAlign: 'left', marginLeft: '50%',marginRight: '20%', marginTop: '1%' }}>
            <div class="input-group rounded">
             
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
            </div>
          </h3>
        </Col>
      </Row>

      <Form>
        <div 
            class="card" 
            style={{ width: '77%', marginTop: '1%', marginLeft: '14%',marginRight: '1%', backgroundColor: '#E5E4E2' }}>
          <div class="card-body">
            <h4 style={{ textAlign: 'left', marginLeft: '5%', marginTop: '1%' }}>Personal Details </h4>{' '}
            <div><br />
              {error && (
                <div className="error" style={{ marginTop: '-10px', color: 'red' }}>
                  {error}
                </div>)
              }
              <Row style={{ width: '75%', marginLeft: '15%', marginRight: '15%', backgroundColor: '#white' }}>
                <Row >
                  <Col>
                    <Form.Group className="mb-3" controlId="formBasicName">
                      <Form.Control 
                          type="number" 
                          placeholder="Phone Number" 
                          value={phone_no} 
                          onChange={(e) => setPN(e.target.value)} />

                    </Form.Group>
                  </Col><Col></Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group className="mb-3" controlId="formBasicPhoneNo">
                      <Form.Control 
                          type="text" 
                          placeholder="First Name" 
                          value={first_name} 
                          onChange={(e) => setFName(e.target.value)} />
                      </Form.Group>
                  </Col>
                  <Col> 
                    <Form.Group className="mb-" controlId="formBasicPhoneNo">
                      <Form.Control 
                          type="text" 
                          placeholder="Last Name" 
                          value={last_name} 
                          onChange={(e) => setLName(e.target.value)} />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group className="mb-3" controlId="formBasicIssue">
                      <Form.Control 
                          type="date" 
                          onChange={(e) => setDOB(e.target.value)} />
                    </Form.Group>
                  </Col>
                  <Col style={{ width: '75%', marginLeft: '0%', backgroundColor: '#white' }}>
                    <Form.Group className="mb-" controlId="formBasicPhoneNo">
                      <Form.Check inline type={"radio"} 
                                  id={"Male"} label={"Male"}    
                                  name="group1"  value="Male" 
                                  onChange={(e) => setGender(e.target.value)} />
                      <Form.Check inline type={"radio"} 
                                  id={"Female"} 
                                  label={"Female"}   
                                  name="group1" 
                                  value="Female" 
                                  onChange={(e) => setGender(e.target.value)} />
                      <Form.Check inline type={"radio"} 
                                  id={"Other"} label={"Other"}    
                                  name="group1" value="Other"  
                                  onChange={(e) => setGender(e.target.value)} />
                    </Form.Group>
                  </Col>
                </Row>
              </Row>
            </div>
            <br />
           ________________________________________________________________________________________
            <br />
            <h4 style={{ textAlign: 'left', marginLeft: '5%', marginTop: '1%' }}>Medical Record </h4>
            <Row style={{ width: '75%', marginLeft: '15%', marginRight: '15%', backgroundColor: '#white' }}>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Control  
                        style={{ height: '95px' }} 
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
                        <Form.Control 
                            type="number" 
                            placeholder="Blood Pressure" 
                            value={blood_pressure} 
                            onChange={(e) => setBloodPressure(e.target.value)} />
                      </Form.Group>
                      <Form.Group className="mb-" controlId="formBasicPhoneNo">
                        <Form.Control 
                            type="number" 
                            placeholder="Weight" 
                            value={weight} 
                            onChange={(e) => setWeight(e.target.value)} />
                      </Form.Group>
                    </Col> 
                    <Col> 
                      <Form.Group className="mb-" controlId="formBasicPhoneNo">
                        <Form.Control 
                            type="number" 
                            placeholder="Pulse" 
                            value={pulse} 
                            onChange={(e) => setPulse(e.target.value)} />
                      </Form.Group>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row >
                <Col >
                  <Form.Group className="mb-3" controlId="formBasicPhoneNo">
                    <Form.Control 
                        type="textarea" 
                        placeholder="Illness" 
                        value={illness} 
                        onChange={(e) => setIllness(e.target.value)} />
                  </Form.Group>
                </Col><Col></Col>
                <Col >
                  <Form.Group className="mb-" controlId="formBasicPhoneNo">
                    <Form.Control 
                        type="textarea" 
                        placeholder="Treatment" 
                        value={treatment} 
                        onChange={(e) => setTreatment(e.target.value)} />
                  </Form.Group>
                </Col><Col></Col>
              </Row>
            </Row>
          </div>
        </div>
        <br/>
          <Form.Group className="mb-3">
            <Col sm={{ span: 50, offset: 9 }}>
              <Link to="/patient_details">
                <Button variant="light">Close</Button>
              </Link>&nbsp;&nbsp;
              <Button 
                  className="button" 
                  type="submit" 
                  value={loading ? 'Loading...' : 'Sumbit'} 
                  disabled={loading} onClick={handleAddIssues}>
                Save
              </Button>
            </Col>
        </Form.Group>
      </Form>
    </div>
  )
}
