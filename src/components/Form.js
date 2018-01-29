import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

export default class Form extends Component {

  state = {
    inputValue: "",
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

  handleSubmit = (e) => {
    e.preventDefault();
    const { inputValue } = this.state;
    this.props.handleSubmit(inputValue);
    this.setState({
      inputValue: "",
    })
  }

  render() {

    let textInput = null;
    const { loading } = this.props.response;
    const { inputValue, errorMessage } = this.state;

    const inputStyle = {
      fontSize: 1.2 + "em",
      color: "black",
      lineHeight: 1.9 + "em",
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
      </Row>
    );
  }
}

  