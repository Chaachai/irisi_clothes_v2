import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Header from './Header'
import Slider from './Slider'
import SideMenu from './SideMenu'
import ProductsList from './ProductsList'
import Footer from './Footer'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap-css-only/css/bootstrap.min.css'


function App() {
    return (
        <BrowserRouter>
            <div>

                <div>
                    <Header />
                </div>
                <div style={{ paddingTop: 66, }}>
                    <Row>
                        <Col style={{ paddingLeft: 57, }} sm={2}><SideMenu /></Col>
                        <Col sm={10}><Slider /></Col>
                    </Row>
                </div>


                {/* <Container style={{ paddingTop: 66, }}>
                    <Row>
                        <Col sm={2}><SideMenu /></Col>
                        <Col sm={10}><Slider /></Col>
                    </Row>
                </Container> */}

                <Container style={{ paddingTop: 66, }}>
                    <Row>
                        <Col sm={12}><ProductsList /></Col>
                    </Row>
                </Container>


                <div>
                    <Footer />
                </div>

            </div>
        </BrowserRouter>
    );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
