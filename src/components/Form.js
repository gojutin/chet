import React from 'react';
import { Row, Col } from 'reactstrap';

const inputStyle = {
  fontSize: 2 + "em",
  border: "1px solid black",
  borderRadius: 5 + "px",
  width: 100 + "%",
  maxWidth: 100 + "%",
  marginTop: 20 + "px",
  marginBottom: 20 + "px",
  fontFamily: 'Cutive Mono, monospace'
};

export default ({ goChet, inputValue, values, response, onInputChange }) => {

  const handleSubmit = e => {
    e.preventDefault();
    if (!inputValue) {
      return;
    }
    goChet(inputValue, values, response.id)
    console.log("# of values: ", values.length)
  }

  const handleChange = (e) => {
    onInputChange(e.target.value);
  }

  return (
    <Row>
      <Col xs={12} sm={{size:6, offset:3}}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            style={inputStyle}
          />
        </form>
      </Col>
    </Row>
  )
}