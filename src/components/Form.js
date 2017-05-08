import React from 'react';
import { Row, Col } from 'reactstrap';


export default ({ goChet, inputValue, values, response, onInputChange, conversationId, loading, showConversation }) => {

  let textInput = null;

  function focus() {
    setTimeout(() => {
      return textInput ? textInput.focus() : ""
    }, 1000)
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (!inputValue) { return; }
    goChet(inputValue, values, response.id, conversationId );
    focus();
  }

  const handleChange = (e) => {
    onInputChange(e.target.value);
  };

  const inputStyle = {
    fontSize: 1.8 + "em",
    border: "1px solid black",
    borderRadius: 5 + "px",
    width: 100 + "%",
    maxWidth: 100 + "%",
    marginTop: 20 + "px",
    marginBottom: 20 + "px",
    paddingLeft: 20 + "px",
    paddingRight: 20 + "px",
    fontFamily:  "Cutive Mono, monospace"
  };
  
  return (
    <Row>
      <Col xs={12} md={{size:8, offset:2}}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            style={inputStyle}
            disabled={loading}
            ref={(input) => { textInput = input; }}
          />
        </form>
      </Col>
    </Row>
  )
}