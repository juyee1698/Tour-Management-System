import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css';
import { loginUser } from '../apiService.js';
import { GoogleLogin } from 'react-google-login';

import loginImg from '../assets/images/login.png';
import userIcon from '../assets/images/user.png';

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await loginUser(credentials);
            if (data.token) {
                console.log('Login successful:', data);
                localStorage.setItem('token',data.token)
                localStorage.setItem('userId',data.userId)
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

    const handleLoginSuccess = (response) => {
        console.log('Login Success:', response);
        localStorage.setItem('token',response.token)
        localStorage.setItem('userId',response.userId)
        setTimeout(() => {
            navigate('/home');
        }, 2000);
      };
      
      const handleLoginFailure = (response) => {
        console.error('Login Failed:', response);
        setModalMessage('Google Login failed. Please try again.');
        toggleModal();
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
                                </Form>
                                <GoogleLogin
                                    clientId=""
                                    buttonText="Login with Google"
                                    onSuccess={handleLoginSuccess}
                                    onFailure={handleLoginFailure}
                                    cookiePolicy={'single_host_origin'}
                                    className="google__btn auth__btn"
                                />

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
