import React from 'react';
import { Row, Col } from 'reactstrap';


export default ({ dispatch, goChet, handleLastResponse, generateResponse, input, babyChetPhrases, chetPhrases, response, onInputChange, startChat, profile, currentPhrasesId, phrases }) => {

  const { loading } = response;
  const responseId = response.id;
  const { babyChetMode } = profile;
  

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
    let phrases = babyChetMode ? babyChetPhrases : chetPhrases
    goChet( input.value, phrases, babyChetMode )
      .then(newPhrasesObject => {
        if (responseId) {
          handleLastResponse(newPhrasesObject, input.value, responseId, currentPhrasesId);
        }
        generateResponse(newPhrasesObject, input.value, currentPhrasesId);
      })
  }

  const handleChange = (e) => {
    onInputChange(e.target.value);
  };

  const inputStyle = {
    fontSize: 1.2 + "em",
    color: "black",
    lineHeight: 1.8 + "em",
    border: "1px solid black",
    borderRadius: 5 + "px",
    width: 100 + "%",
    maxWidth: 100 + "%",
    marginTop: 5 + "px",
    marginBottom: 20 + "px",
    paddingLeft: 20 + "px",
    paddingRight: 20 + "px",
    fontFamily:  "Comfortaa, sans-serif"
  };
  
  return (
    <Row>
      <Col xs={12} md={{size:8, offset:2}}>
        <form onSubmit={handleSubmit}>
          <label style={{ width: 100 + "%", color: "transparent" }}> Talk to Chet
          <input
            type="text"
            value={input.value}
            onChange={handleChange}
            onKeyDown={() => handleFocus()}
            style={inputStyle}
            disabled={loading}
            ref={(input) => { textInput = input; }}
          />
          </label>
          
          
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