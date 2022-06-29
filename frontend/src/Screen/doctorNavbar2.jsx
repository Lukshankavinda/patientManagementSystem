import React, { useEffect, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Container, Nav } from 'react-bootstrap';
import { Link ,NavLink } from 'react-router-dom';
import { MdNotifications } from 'react-icons/md';
import { BsPersonCircle, BsHourglassSplit, BsFillCalendar3Fill, BsPeople } from 'react-icons/bs';
import axios from 'axios';
import PatientDetails from './pationDetailsScreen';

function NavigationBar2() {
    
    const userToken = localStorage.getItem('userJWT');

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

    const logout = async () => {
        try {
            localStorage.removeItem('ujsonwebtoken');
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
                        <Nav>
                            &nbsp;&nbsp;
                            <NavLink style={NavLinkStyles} to="/detaills">
                                <BsPeople /><br/> Patient 
                            </NavLink>
                            &nbsp;&nbsp;
                            <NavLink style={NavLinkStyles} to="/historyR">
                                
                                <BsHourglassSplit /><br/> History
                            </NavLink>
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        <Nav>
                            <Link className="btn btn-outline-secondary rounded " to="/" style={{ marginTop: '30px' }} onClick={() => logout()}>
                                <BsPersonCircle />
                            </Link>
                            <br />
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default NavigationBar2;
