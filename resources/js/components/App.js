import React from 'react'
import ReactDOM from 'react-dom'
import Header from './Header'
import Slider from './Slider'
import Footer from './Footer'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import'bootstrap-css-only/css/bootstrap.min.css'


function App() {
    return (
        <div>
            <Header />
            
            <Container style={{paddingTop: 66,}}>
                <Row>
                    <Col sm={12}><Slider /></Col>
                </Row>
            </Container>
            <br/>
            <br/>
            <div className="container">

                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Example Component Hamza</div>

                            <div className="card-body">I'm an example component!</div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Footer />
            </div>
            
        </div>
    );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
