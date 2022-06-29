import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button,Row, Col,Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation ,useNavigate,Link } from 'react-router-dom';
import NavigationBar from './doctorNavbar';
import { BiSearchAlt2 } from "react-icons/bi";
import Form from 'react-bootstrap/Form';

function PatientHistory() {

  const [posts, setposts] = useState([]);
  const [singlerecords, setrecords] = useState();
  const [dobyear, setDOB] = useState();
  const [requestError, setRequestError] = useState();
  const location = useLocation();
  const [search,setSearch] =useState('');
  const [error, setError] = useState(null);
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

  useEffect(() => {
    axios.get(`http://localhost:5000/get_patient/${location.state.phone_no}`)
    .then((res) => {
        console.log(res);
        setposts(res.data.patient);
        const date=res.data.patient[0].dob.substring(0,10);
        var dateparts=date.split("-");
        var thisyear= new Date().getFullYear();
        var years= thisyear-dateparts[0]; 
        setDOB(years)

        console.log(res.data.patient[0].dob)        
    })
    .catch((err) => {
        console.log(err);
        setRequestError(err);
    });
  },[]);

 const sendMessage = (_id) => {
    axios.get(`http://localhost:5000/get_record/${_id}`)
    .then((resp) => {
        console.log(resp);
        setrecords(resp.data.record);
        console.log(resp.data)
    })
    .catch((err) => {
        console.log(err);
        setRequestError(err);
    });
  }
  
  const Search = (search) =>{
    axios.get(`http://localhost:5000/get_patient/${search}`)
    .then(response=>{
        navigater(`/patient_history/${search}`,{state:{phone_no:search}})
        window.location.reload();
    })
    .catch(error=>{
        setError("something is wrong");
    })
  }

  return (
    <div>
      <NavigationBar/><br />
      <Row>
        <Col>
          <h3 style={{ textAlign: 'left', marginLeft: '30%', marginTop: '1%' }}>Patient History </h3>
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
        <div> {posts.map(post=>(<>    
          <div className="card" style={{ width: '77%', marginTop: '1%', marginLeft: '14%',marginRight: '1%', backgroundColor: '#E5E4E2' }}>
            <div className="card-body">
              <h4 style={{ textAlign: 'left', marginLeft: '5%', marginTop: '1%' }}>
                {post.first_name} {post.last_name} &nbsp; | &nbsp; {dobyear } &nbsp; | &nbsp; {post.phone_no} &nbsp; | &nbsp; {post.gender}   
              </h4>{' '}
              <div>
                <Row>
                  <Col sm={3} >{post.records.map(record => 
                    <li>
                      <a href="#" onClick={()=>sendMessage(record._id)}> 
                        {record.updatedAt}<br/> 
                      </a>
                    </li>)}
                  </Col>
                  <Col  sm={8}> 
                    <Row>
                      <div classname="card" 
                          style={{ width: '100%', marginTop: '1%', marginLeft: '0%',marginRight: '10%', backgroundColor: '#white' }}>
                        <h5 style={{ textAlign: 'left', marginLeft: '5%', marginTop: '1%' }}>
                          <b>Medical Record</b>
                        </h5>
                        <h6 style={{ textAlign: 'left', marginLeft: '9%', marginTop: '1%' }}>
                          {singlerecords && singlerecords.complaint}
                        </h6>
                        <Col>
                          <Row>
                            <h6 style={{ textAlign: 'left', marginLeft: '9%', marginTop: '1%' }}>
                              <b>Blood Pressure</b>&nbsp;&nbsp;: {singlerecords && singlerecords.blood_pressure} mmHg
                            </h6>
                          </Row>
                          <Row>
                            <h6 style={{ textAlign: 'left', marginLeft: '9%', marginTop: '1%' }}>
                              <b>Weight</b>&nbsp;&nbsp;: {singlerecords && singlerecords.weight} Kg
                            </h6>
                          </Row>
                          <Row>
                            <h6 style={{ textAlign: 'left', marginLeft: '9%', marginTop: '1%' }}>
                              <b>Pulse</b>&nbsp;&nbsp;: {singlerecords && singlerecords.pulse} Beats
                            </h6>
                          </Row>
                          <Row>
                            <h6 style={{ textAlign: 'left', marginLeft: '9%', marginTop: '1%' }}>
                              <b>Illness</b>&nbsp;&nbsp;:  
                              {singlerecords && singlerecords.illness.map((element, index) => (
                                <Badge className="mx-1" pill bg="primary" key={index}>
                                  {element}           
                                </Badge>
                              ))} 
                            </h6>
                          </Row>
                          <Row>
                            <h6 style={{ textAlign: 'left', marginLeft: '9%', marginTop: '1%' }}>
                              <b>Treatment</b>&nbsp;&nbsp;:  
                              {singlerecords && singlerecords.treatment.map((element, index) => (
                                <Badge className="mx-1" pill bg="info" key={index}>
                                  {element}           
                                </Badge>
                              ))} 
                            </h6>
                          </Row>
                        </Col>
                      </div>
                    </Row>
                  </Col>
                  <Col  sm={1}></Col>
                </Row><br />
                <Row style={{ width: '75%', marginLeft: '15%', marginRight: '15%', backgroundColor: '#white' }}>
                </Row>
              </div>
            </div><br/>
          </div><br/> 
            <Col md={{  offset: 8 }}>
              <Button  
                  variant="outline-dark" 
                  onClick={()=> navigater(`/patient_historyr`)} >
                    Close
              </Button>
            </Col> 
          </>))} 
          </div> 
        <div>
      </div> 
    </div> 
  )
}
export default PatientHistory;
