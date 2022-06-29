import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { Button,  Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate ,Link} from 'react-router-dom';
import NavigationBar from './doctorNavbar'
import { BiSearchAlt2 } from "react-icons/bi";

export default function PationHistoryScreenResult() {
  const [phone_no, setPN] = useState('');
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


  const Search = (search) =>{
    axios.get(`http://localhost:5000/get_patient/${search}`)
    .then(response=>{
        navigater(`/history/${search}`,{state:{phone_no:search}})
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
                      onClick={()=>{Search(search)}}  ><BiSearchAlt2/>
                  </Button>
                </Form.Group>
              </Form>
            </Col> 
          </Row></h3>
        </Col>
      </Row>
      <div class="card" style={{ width: '77%', marginTop: '1%', marginLeft: '14%',marginRight: '1%', backgroundColor: '#E5E4E2' }}>
        <div class="card-body">
        <h4 style={{ textAlign: 'left', marginLeft: '5%', marginTop: '1%' }}>    </h4>{' '}
          <div>
            <Row>
              <Col sm={4} ></Col>
              <Col  sm={8}> 
                <div className="card" style={{ width: '100%', marginTop: '1%', marginLeft: '0%',marginRight: '1%', backgroundColor: '#white' }}>
                </div>
              </Col>
            </Row><br />
            <Row style={{ width: '75%', marginLeft: '15%', marginRight: '15%', backgroundColor: '#white' }}>
            </Row>
          </div>
        </div><br/>
      </div>
    </div>
  );
}
