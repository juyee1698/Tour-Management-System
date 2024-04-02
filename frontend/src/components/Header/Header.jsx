import React from 'react';
import {Container, Row, Button} from 'reactstrap';
import { NavLink, Link, useNavigate} from 'react-router-dom';

import logo from '../../assets/images/logo2.png';
import './header.css';
const nav__links = [
    {
        path:'/home',
        display:'Home'
    },
    {
        path:'/about',
        display:'About'
    },
]

const Header = () => {

    const authToken = localStorage.getItem('token');
    // const userId = localStorage.getItem('userId');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        // localStorage.removeItem('userId');
        setTimeout(() => {
            navigate('/');
        }, 1000);
    };


    return (<header className="header">
        <Container>
            <Row>
                <div className="nav__wrapper d-flex align-items-center justify-content-between">
                    {/* ============= logo start ============= */}
                    
                    <div className="logo">
                        <img src={logo} alt=""/>
                    </div>
                    {/* ============= logo end ============= */}

                    {/* ============= menu start ============= */}
                    <div className="navigation">
                        <ul className="menu d-flex align-items-center gap-5">
                            {
                                nav__links.map((item,index)=> (
                                    <li className='nav__item' key={index}>
                                        <NavLink to={item.path} className={navClass => navClass.isActive ? 'active__link' : ""}>{item.display}</NavLink>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    {/* ============= menu end ============= */}

                    <div className="nav__right d-flex align-items-center gap-4">
                    {authToken ? (
                                <div className="user__info d-flex align-items-center gap-2">
                                    {<span>Hi {localStorage.getItem('userId')} !!   </span> }
                                    <Button onClick={handleLogout} className='btn primary__btn'>Logout</Button>
                                </div>
                            ) : (
                                <div className="nav__buttons d-flex align-items-center gap-4">
                                    <Button className='btn secondary__btn'>
                                        <Link to='/login'>Login</Link>
                                    </Button>
                                    <Button className='btn primary__btn'>
                                        <Link to='/register'>Register</Link>
                                    </Button>
                                </div>
                            )} 

                        <span className="mobile__menu">
                            <i class="ri-menu-line"></i>
                        </span> 
                    </div>
                </div>
            </Row>
        </Container>
    </header>)
}

export default Header;