import React from "react";
import ServiceCard from "./ServiceCard";
import { Col } from "reactstrap";

import weatherImg from '../assets/images/weather.png';
import guideImg from '../assets/images/guide.png';
import customizationImg from '../assets/images/customization.png';

const servicesData = [
    {
        imgUrl: weatherImg,
        title: "Calculate Weather",
        desc: "Stay prepared with our real-time weather updates. Our accurate forecasts help you plan your day, ensuring you never get caught in the rain."
    },
    {
        imgUrl: guideImg,
        title: "Trained Local Tour Guides",
        desc: "Discover the secrets of your destination with our expert guides. Each one brings a wealth of knowledge and a personal touch to your adventure."
    },
    {
        imgUrl: customizationImg,
        title: "Your journey, your way",
        desc: "Tailor your trip to fit your dreams. With customizable itineraries and flexible scheduling, we put the power of planning in your hands."
    }
]

const ServiceList = () => {
    return <>
    {
        servicesData.map((item,index) =>
        <Col lg='3' key={index}><ServiceCard item={item}/></Col>
        )
    }
    </>
}

export default ServiceList;