import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import 'react-toggle/style.css';
import { headShake, slideInUp, slideInDown } from 'react-animations';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  headShake: {
    animationName: headShake,
    animationDuration: '1s'
  },
  slideInUp: {
    animationName: slideInUp,
    animationDuration: '1s'
  },
  slideInDown: {
    animationName: slideInDown,
    animationDuration: '1s'
  }
})

export default class Pin extends Component {

  state = {
    pin: "", box1: "", box2: "", box3: "", box4: "", error: "", attempts: 0,
  }

  clearPin = () => {
    this.setState({
      box1: "", box2: "", box3: "", box4: "", pin: ""
    })
  }

  handleUnlock = () => {
    const { profile, updateSettings } = this.props;
    const { box1, box2, box3, box4 } = this.state;
    const providedPin = box1 + box2 + box3 + box4;
    if (!profile.pin) {
      updateSettings(
        profile.id, 
        { pin: providedPin, 
          enteredPin: false, 
        }
    )
  } else if (providedPin !== profile.pin) {
      this.setState(prevState => ({
        attempts: prevState.attempts + 1,
      }), () => {
        let errorMsg;
        switch(true) {
          case (this.state.attempts < 5):
            errorMsg = "Sorry, wrong pin."
            break;
          case (this.state.attempts < 10):
            errorMsg = "Still wrong..."
            break;
          case (this.state.attempts < 15):
            errorMsg = "I'm beginning to think you don't belong here."
            break;
          default:
            break;
        }
        this.setState({
          error: errorMsg
        })
        this[`box1`].focus();
      })

    } else if (providedPin === profile.pin) {
      updateSettings(profile.id, {enteredPin: true})
    }
  }

  handleFocus = (e, num) => {
    this.setState({
      error: "",
    })
    const inputValue = e.target.value;
    const box = `box${num}`;

    if ( inputValue.length > 1 || !+inputValue) {
      return false;
    }

    this.setState(prevState => ({
      [`${box}`]: inputValue,
    }), () => {
      if (num === 4) {
        this[`box${num}`].blur();
        this.handleUnlock()
        this.clearPin();
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
    const { profile } = this.props;
    const boxes = this.generateBoxes();

    return (
      <Row>
        <Col xs={{size: 10, offset: 1}} className={error && css(styles.headShake)}>
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
              type={profile.pin ? "password" : "number"}
              onChange={(e) => this.handleFocus(e, num)}
              ref={(input) => { this[`box${num}`] = input; }} 
            />
          )}
        </Col>
        { error &&
          <Col xs={12} className="text-center text-danger">
            <p>{error}</p>
          </Col>
        } 
      </Row>
    );
  }
}