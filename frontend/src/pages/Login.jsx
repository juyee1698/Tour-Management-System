import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css';
import { loginUser } from '../apiService.js';
import loginImg from '../assets/images/login.png';
import userIcon from '../assets/images/user.png';

import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const Login = () => {
    const navigate = useNavigate(); 
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });
    const [modal, setModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const handleChange = (e) => {
        const { id, value } = e.target;
        setCredentials({...credentials, [id]: value});
    };

    const toggleModal = () => setModal(!modal);
    const responseGoogle = async (response) => {
        console.log("sUCCESS")
        console.log(response.credential)
        // console.log(response.tokenId)
        try {
            const res = await fetch('https://vacay-backend-134621f1e5ec.herokuapp.com/o2auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ access_token: response.credential }),
            });

            if (!res.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await res.json();
            console.log('Login successful:', data);
            if (data.token) {
                console.log('Login successful:', data);
                localStorage.setItem('token',data.token)
                localStorage.setItem('userId',data.userId)
                localStorage.setItem('name', data.name)
                setTimeout(() => {
                    navigate('/home');
                }, 2000); 
            } else {
                console.error('Login failed:', data.message);
                setModalMessage(data.message || 'Login failed for unknown reasons.'); 
                toggleModal(); 
            }            
      // Log the response from the backend

        } catch (error) {
            console.error('Error:', error);
            setModalMessage(`Login error: ${error.message || 'Unknown error occurred.'}`); 
            toggleModal(); 
        }
    }
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await loginUser(credentials);
            if (data.token) {
                console.log('Login successful:', data);
                localStorage.setItem('token',data.token)
                localStorage.setItem('userId',data.userId)
                localStorage.setItem('name', data.name)
                setTimeout(() => {
                    navigate('/home');
                }, 2000); 
            } else {
                console.error('Login failed:', data.message);
                setModalMessage(data.message || 'Login failed for unknown reasons.'); 
                toggleModal(); 
            }
        } catch (error) {
            console.error('Login error:', error);
            setModalMessage(`Login error: ${error.message || 'Unknown error occurred.'}`); 
            toggleModal(); 
        }
    };

    return (
        <section>
            <Container>
                <Row>
                    <Col lg='8' className="m-auto">
                        <div className="login__container d-flex justify-content-between">
                            <div className="login__img">
                                <img src={loginImg} alt=""/>
                            </div>

                            <div className="login__form">
                                <div className="user">
                                    <img src={userIcon} alt="" />
                                </div>
                                <h2>Login</h2>

                                <Form onSubmit={handleSubmit}>
                                    <FormGroup>
                                        <input type="text" 
                                            placeholder='Email' 
                                            required id='email' 
                                            onChange={handleChange}/>
                                    </FormGroup>
                                    <FormGroup>
                                        <input 
                                            type="password" 
                                            placeholder='Password' 
                                            required id='password' 
                                            onChange={handleChange} />
                                    </FormGroup>
                                    <Button className='btn secondary__btn auth__btn' type='submit' >Login</Button>
                                    <GoogleOAuthProvider clientId="243962731858-rb04b0dbelevp5blhc339io995opuhqu.apps.googleusercontent.com">
                                    <GoogleLogin
                                        onSuccess={responseGoogle}
                                          onError={() => {
                                            console.log('Login Failed');
                                          }}/>  
                                    </GoogleOAuthProvider>
                                    </Form>

                                <p>Don't have an account? <Link to='/register' >Create Account</Link></p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Modal isOpen={modal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Login Status</ModalHeader>
                <ModalBody>
                    {modalMessage}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggleModal}>Close</Button>
                </ModalFooter>
            </Modal>
        </section>
    );
}

export default Login;
