import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import Response from './Response';

export default class Form extends Component {

  state = {
    inputValue: "",
    showResponse: true,
  };

  handleChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length > 50) {
      this.setState({
        errorMessage: "Oops..you ran out of space :( "
      })
    }
    this.setState({
      inputValue: e.target.value,
    })
  }

  handleFocus = (textInput) => {
    setTimeout(() => {
      if (textInput) {
        return textInput.focus()
      }
    }, 100)
  }

  // I am here
  handleSubmit = e => {
    e.preventDefault();
    const { inputValue } = this.state;
    if (!inputValue) { return; }
    this.setState({
      showResponse: false,
    })
    const { goChet, handleLastResponse, generateResponse, profile, currentPhrasesId, responseId, currentPhrases } = this.props;
    goChet( inputValue, currentPhrases, profile.babyChetMode )
      .then(newPhrasesObject => {
        if (responseId) {
          handleLastResponse(newPhrasesObject, inputValue, responseId, currentPhrasesId);
        }
        generateResponse(newPhrasesObject, inputValue, currentPhrasesId);
        this.setState({
          inputValue: "",
          showResponse: true,
        });
      })
  }


  render() {

    let textInput = null;
    const { showChat, response, profile } = this.props;
    const { loading } = response;
    const { inputValue, errorMessage, showResponse } = this.state;

    const inputStyle = {
      fontSize: 1.2 + "em",
      color: "black",
      lineHeight: 1.8 + "em",
      border: "1px solid black",
      borderRadius: 5 + "px",
      width: 100 + "%",
      maxWidth: 100 + "%",
      marginTop: 5 + "px",
      marginBottom: 0 + "px",
      paddingLeft: 20 + "px",
      paddingRight: 20 + "px",
      fontFamily:  "Comfortaa, sans-serif"
    };

    return (
      <Row style={{
            paddingBottom: 5 + "px",
            height: 100 + "%",
            minHeight: 100 + "%"
          }}>
        <Col xs={12} md={{size:8, offset:2}}>
          <form onSubmit={this.handleSubmit}>
            <label style={{ width: 100 + "%", color: "transparent" }}> Talk to Chet
            <input
              type="text"
              value={inputValue}
              onChange={this.handleChange}
              onKeyDown={() => this.handleFocus(textInput)}
              style={inputStyle}
              disabled={loading}
              ref={(input) => { textInput = input; }}
            />
            </label>
            
            
            { errorMessage &&
              <p className="text-warning">
                {errorMessage}
              </p>
            }
          </form>
        </Col>
          <Col xs={12} md={{ size: 8, offset: 2 }}>
            <Response
              showChat={showChat}
              response={response}
              showResponse={showResponse}
              profile={profile}
            />

          </Col>
      </Row>
    );
  }
}

  