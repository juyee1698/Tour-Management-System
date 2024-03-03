import React, {useState} from 'react';
import {Container, Row, Col, Form, FormGroup, Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import {Link, useNavigate} from 'react-router-dom'; 
import '../styles/login.css';

import registerImg from '../assets/images/register.png';
import userIcon from '../assets/images/user.png';
import { registerUser } from './apiService';

const Register = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [modal, setModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const navigate = useNavigate(); 

    const toggleModal = () => setModal(!modal);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setUserData({...userData, [id]: value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (userData.password !== userData.confirmPassword) {
            setModalMessage('Passwords do not match.');
            toggleModal();
            return;
        }
        try {
            const response = await registerUser({
                name: userData.name,
                email: userData.email,
                password: userData.password,
                confirmPassword: userData.confirmPassword
            });
            if (response.flag === true) {
                setModalMessage('Registration complete. Account created successfully.');
                toggleModal();
                setTimeout(() => {
                    navigate('/login');
                }, 3000); 
                console.log(response)// Redirects to login after 3 seconds
            } else {
                console.log(response)
                setModalMessage(`Registration failed: ${response.data[0].msg}`);
                toggleModal();
            }
        } catch (error) {
            setModalMessage(`Registration error: ${error}`);
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
                                <img src={registerImg} alt=""/>
                            </div>

                            <div className="login__form">
                                <div className="user">
                                    <img src={userIcon} alt="" />
                                </div>
                                <h2>Register</h2>

                                <Form onSubmit={handleSubmit}>
                                    <FormGroup>
                                        <input type="text" 
                                            placeholder='Name' 
                                            required id='name' 
                                            onChange={handleChange}/>
                                    </FormGroup>
                                    <FormGroup>
                                        <input type="email" 
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
                                    <FormGroup>
                                        <input 
                                            type="password" 
                                            placeholder='Confirm Password' 
                                            required id='confirmPassword' 
                                            onChange={handleChange} />
                                    </FormGroup>
                                    <Button className='btn secondary__btn auth__btn' type='submit'>Register</Button>
                                </Form>
                                <p>Already have an account? <Link to='/login' >Login</Link></p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Modal isOpen={modal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Registration Status</ModalHeader>
                <ModalBody>
                    {modalMessage}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggleModal}>Close</Button>
                </ModalFooter>
            </Modal>
        </section>
    )
}

export default Register;
