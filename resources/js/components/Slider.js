import React from 'react'
import Carousel from 'react-bootstrap/Carousel'

const Slider = () => (
    <>

        <Carousel >
        <Carousel.Item >
                <img
                    className="d-block w-100"
                    src="/images/Slider6.png"
                    alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item >
                <img
                    className="d-block w-100"
                    src="/images/Slider7.png"
                    alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item >
                <img
                    className="d-block w-100"
                    src="/images/Slider5.png"
                    alt="First slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="/images/Slider3.png"
                    alt="Third slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="/images/Slider2.png"
                    alt="Third slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="/images/Slider1.png"
                    alt="Third slide"
                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="/images/Slider4.png"
                    alt="Third slide"
                />
            </Carousel.Item>

        </Carousel>
    </>
)

export default Slider;