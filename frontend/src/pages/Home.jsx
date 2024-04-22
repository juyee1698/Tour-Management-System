import React, {useState} from 'react';
import '../styles/home.css';

import { Container, Row, Col} from 'reactstrap';
import heroImg from '../assets/images/hero-img01.jpg';
import heroImg02 from '../assets/images/hero-img02.jpg';
import heroVideo from '../assets/images/hero-video.mp4';
import worldImg from '../assets/images/world.png';
import Subtitle from '../shared/Subtitle.jsx';
import SearchBar from '../shared/SearchBar.jsx';
import ServiceList from '../services/ServiceList.jsx';
import FeaturedTourList from '../components/Featured-tours/FeaturedTourList.jsx';
import Sightseeing from './Sightseeing.jsx';
import SightSeeingRecommendation from './SightseeingRecommendation.jsx'

const Home = () => {

    const [activeTab, setActiveTab] = useState('flights');

    return <>
        <section>
            <Container>
                <Row>
                    <Col lg='6'>
                    <div className="hero__content">
                        <div className="hero__subtitle d-flex aligns-items-center">
                            <Subtitle subtitle={"Crafting Your Perfect Escape"}/>
                            <img src={worldImg} alt=""/>
                        </div>
                        <h1>Why wait for a yayyyy, when you can <span className='highlight'>
                            Vacayy</span></h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                             Quod accusantium rerum aliquam nesciunt accusamus quos, praesentium error,
                              odio eaque possimus, id nulla fuga deleniti illum voluptatem. 
                              Laudantium dolor iste est.</p>
                    </div>
                    </Col>
                    <Col lg='2'>
                        <div className="hero__img-box">
                            <img src={heroImg} alt=""/>
                        </div>
                    </Col>
                    <Col>
                        <div className="hero__img-box mt-4">
                            <video src={heroVideo} alt="" controls/>
                        </div>
                    </Col>
                    <Col>
                        <div className="hero__img-box mt-5">
                            <img src={heroImg02} alt=""/>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>

        <section>
            <Container>
                <Row>
                    
                        {/* Sub-navigation */}
                        <Col lg="12" className="mb-3">
                            <div className="sub-navigation">
                                <button onClick={() => setActiveTab('flights')} className={`btn ${activeTab === 'flights' ? 'btn-primary' : 'btn-outline-primary'}`}>Flights</button>
                                <button onClick={() => setActiveTab('sightseeing')} className={`btn ml-2 ${activeTab === 'sightseeing' ? 'btn-primary' : 'btn-outline-primary'}`}>Sightseeing</button>
                            </div>
                        </Col>

                        {activeTab === 'flights' && (
                            <Col lg="12">
                                <SearchBar/>
                            </Col>
                        )}

                        {activeTab === 'sightseeing' && (
                            <Col lg="12">
                                <Sightseeing/>
                                <SightSeeingRecommendation/>
                            </Col>
                        )}
                </Row>
            </Container>
        </section>
        <section>
            <Container>
                <Row>
                    <Col lg='3'>
                        <h5 className="services__subtitle">What we serve</h5>
                        <h2 className="services__title">We are the best in our world</h2>
                    </Col>
                    <ServiceList/>
                </Row>
            </Container>
        </section>
        <section>
            <Container>
                <Row>
                    <Col lg='12' className='mb-5'>
                        <Subtitle subtitle={"Explore"} />
                        <h2 className="featured__tour-title">Where my other buddies at?</h2>
                    </Col>
                    <FeaturedTourList/>
                </Row>
            </Container>
        </section>
    </>    
}

export default Home;