import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'


const myStyle = {
  position: 'fixed',
  width: '100%',
  zIndex: '1000',
};


const Header = () => (
  <>

<Navbar bg="light" variant="light" style={myStyle}>
    <Navbar.Brand href="#home">
    <img
        src="images/logo.png"
        width="120"
        height="40"
        className="d-inline-block align-top"
        alt="React Bootstrap logo"
      />
    </Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#features">Cart</Nav.Link>
      <Nav.Link href="#pricing">Wish list</Nav.Link>
    </Nav>
    <Form inline>
    <FormControl type="text" placeholder="Search" className=" mr-sm-2" />
    <Button type="submit">Submit</Button>
  </Form>
  <Nav >
     
    </Nav>
    <Nav>
      <Nav.Link href="#deets">Login</Nav.Link>
      <Nav.Link eventKey={2} href="#memes">
        Register
      </Nav.Link>
    </Nav>
  </Navbar>
  
    
  </>
)

export default Header;