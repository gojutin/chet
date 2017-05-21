import React from 'react';
import { Row, Col } from 'reactstrap';


export default ({ goChet, input, values, response, onInputChange, db, }) => {

  const { valuesId, convoId } = db;
  const { id, loading } = response;

  let textInput = null;

  const handleFocus = () => {
    setTimeout(() => {
      if (textInput) {
        return textInput.focus()
      }
    }, 100)
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (!input.value ) { return; }
    goChet(input.value, values, id, valuesId, convoId );
  }

  const handleChange = (e) => {
    onInputChange(e.target.value);
  };

  const inputStyle = {
    fontSize: 1.3 + "em",
    lineHeight: 1.8 + "em",
    border: "1px solid black",
    borderRadius: 5 + "px",
    width: 100 + "%",
    maxWidth: 100 + "%",
    marginTop: 20 + "px",
    marginBottom: 20 + "px",
    paddingLeft: 20 + "px",
    paddingRight: 20 + "px",
    fontFamily:  "Comfortaa, sans-serif"
  };
  
  return (
    <Row>
      <Col xs={12} md={{size:8, offset:2}}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={input.value}
            onChange={handleChange}
            onKeyDown={() => handleFocus()}
            style={inputStyle}
            disabled={loading}
            ref={(input) => { textInput = input; }}
          />
          { input.error &&
            <p className="text-warning">
              {input.error}
            </p>
          }
        </form>
      </Col>
    </Row>
  )
}