import React, { useEffect, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Container, Nav } from 'react-bootstrap';
import { Link ,NavLink } from 'react-router-dom';
import { BsPersonCircle, BsHourglassSplit, BsPeople, BsClockHistory} from 'react-icons/bs';
import axios from 'axios';


function DoctorNavbar() {
    const userToken = localStorage.getItem('userJWT');

    const [posts, setposts] = useState([]);
    const [requestError, setRequestError] = useState();

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
        axios.get('http://localhost:5000/getName', {})
        .then((res) => {
            console.log(res);
            setposts(res.data.doctorName);
            console.log(res.data.doctorName);
        })
        .catch((err) => {
            console.log(err);
            setRequestError(err);
        });
    },[]);


    const logout = async () => {
        try {
            localStorage.removeItem('userJWT');
        } catch (error) {
            console.log(error);
        }
    };

    const NavLinkStyles = ({isActive}) => {
        return{
            fontWeight: isActive? 'bold' : 'normal' ,
            textDecoration: isActive? 'none' : 'undrline',
            color: isActive ? '#fff' : '#545e6f',
            background: isActive ? '#7600dc' : '#f0f0f0',
        }
    }

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="light">
                <Container>
                    <Navbar.Collapse>
                        <Nav>&nbsp;&nbsp;
                            <NavLink style={NavLinkStyles} to="/detaills">
                                <BsPeople/><br/> Patient 
                            </NavLink> &nbsp;&nbsp;
                            <NavLink style={NavLinkStyles} to="/historyR">
                                <BsClockHistory/><br/> History
                            </NavLink>
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <Nav>
                            <Link 
                                className="btn btn-outline-secondary rounded-pill " 
                                to="/"
                                style={{ marginTop: '5px' }} 
                                onClick={() => logout()}>    
                                    {posts.map(post=>post.name)} <BsPersonCircle/>
                            </Link>&nbsp;&nbsp;
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default DoctorNavbar;
