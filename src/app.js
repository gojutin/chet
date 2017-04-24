import React, { Component } from 'react';
import { Container } from 'reactstrap';
import Form from './components/Form';
import Response from './components/Response';

class App extends Component {
  componentDidMount() {
    this.props.fetchData();
  }

  render() {

    const headerStyle = {
      fontFamily: 'Cutive Mono, monospace', 
      fontSize: 5 + "em",
      margin: 0,
    }
    return (
      <Container className="text-center">
        <i className="fa fa-comments-o fa-5x" style={{marginTop: 80 + "px"}}/>
        <h1 style={headerStyle} >
          chet
        </h1>



        <Form
          {...this.props}
        />
        <Response
          {...this.props}
        />
      </Container>
    );
  }
}

export default App;
