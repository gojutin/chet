import React, { Component } from 'react';
import GitHubForkRibbon from 'react-github-fork-ribbon';
import { Container } from 'reactstrap';

// components
import Form from './components/Form';
import Response from './components/Response';


class App extends Component {

  componentDidMount() {
    this.props.fetchData();
    this.props.sayHi();
  }

  render() {

    const headerStyle = {
      fontFamily: 'Cutive Mono, monospace',
      margin: 0,
      fontSize: 3 + "em"
    }
    
    return (
      <div>
        <GitHubForkRibbon 
          href="https://github.com/gojutin/chet"
          target="_blank"
          position="right-bottom"
          color="black"
        >
          Fork me on GitHub
        </GitHubForkRibbon>
        <Container className="text-center">


          <i className="fa fa-comments-o fa-5x" style={{ marginTop: 30 + "px" }} />
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
      </div>
    );
  }
}

export default App;
