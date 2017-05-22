import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import 'react-toggle/style.css';

export default class Pin extends Component {

  state = {
    pin: "", box1: "", box2: "", box3: "", box4: "", error: "", type: "number"
  }

  handleUnlock = () => {
    const { db } = this.props;
    const { box1, box2, box3, box4 } = this.state;
    const providedPin = box1 + box2 + box3 + box4;
    if (!db.pin) {
      this.props.saveSettings(
        db.id, 
        { pin: providedPin, 
          enteredPin: false,
          allowChet: true,
          allowWipe: true,
          allowLogout: true  
        }
    )
    } else if (providedPin !== db.pin) {
      this.setState({
        error: "Nope, that's not it"
      })
      this[`box1`].focus();
    } else if (providedPin === db.pin) {
      this.props.saveSettings(db.id, {enteredPin: true})
    }
  }

  handleFocus = (e, num) => {
    this.setState({
      error: "",
    })
    const inputValue = e.target.value;
    const box = `box${num}`;

    if (!inputValue || inputValue.length > 1 || !+inputValue) {
      return false;
    }

    this.setState(prevState => ({
      [`${box}`]: inputValue,
    }), () => {
      if (num === 4) {
        this[`box${num}`].blur();
        this.handleUnlock()
        this.setState({
          box1: "",
          box2: "",
          box3: "",
          box4: "",
        })
      } else {
        this[`box${num+1}`].focus();
      } 
    });

 
  }

  generateBoxes = () => {
    let boxes = []
    for(let i = 1; i < 5; i++) {
      boxes.push({
        num: i
      })
    }
    return boxes;
  }

  getValue = num => {
    console.log("NUM", num)
    const { box1, box2, box3, box4 } = this.state;
    switch(num) {
      case 1:
        return box1;
      case 2:
        return box2;
      case 3:
        return box3;
      case 4:
        return box4;
      default: 
        return box1;
    }
  }
  render () {
    const { error } = this.state;
    const boxes = this.generateBoxes();

    return (
      <Row>
        <Col xs={{size: 10, offset: 1}}>
        { boxes.map(({num}) => 
            <input
              key={num}
              value={this.getValue(num)}
              style={{
                padding: 5 + "px", 
                margin: 5 + "px",
                fontSize: 1.8 + "em", 
                textAlign: "center",
                width: 50 + "px",
                height: 50 + "px",
                borderRadius: 5 + "px",
                border: "1px solid gray"
              }}
              type={this.state.type}
              onChange={(e) => this.handleFocus(e, num)}
              ref={(input) => { this[`box${num}`] = input; }} 
            />
        )}
      </Col>
      { error &&
        <Col xs={12} className="text-center text-warning">
          <p>{error}</p>
        </Col>
      }
      {/*<i className="fa fa-check fa-3x text-success" />*/}
        
      </Row>
    );
  }
}