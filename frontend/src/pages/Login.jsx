import React, {useState} from 'react';
import {Container, Row, Col, Form, FormGroup, Button} from 'reactstrap';
import {Link} from 'react-router-dom';
import '../styles/login.css';
import { loginUser } from './apiService';

import loginImg from '../assets/images/login.png';
import userIcon from '../assets/images/user.png';



const Login = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setCredentials({...credentials, [id]: value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await loginUser(credentials);
            if (data.success) {
                console.log('Login successful:', data);
            } else {
                console.error('Login failed:', data.message);
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (<section>
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
                            <p>Don't have an account? <Link to='/register' >Create Account</Link></p>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    </section>)
}

export default Login;