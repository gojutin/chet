import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import 'react-toggle/style.css';
import { headShake, slideInUp, slideInDown, pulse } from 'react-animations';
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
  },
  pulse: {
    animationName: pulse,
    animationDuration: '2s'
  }
})

export default class Pin extends Component {

  state = {
    pin: "", 
    box1: "", box2: "", box3: "", box4: "", 
    error: "", 
    attempts: 0, 
    pinMessage: false,
    activeBox: 1,
  }

  clearPin = () => {
    this.setState({
      box1: "", box2: "", box3: "", box4: "", error: "", pin: "", attempts: 0,
    }, () => {
      this[`box1`].focus();
    })
  }

  componentDidMount = () => {
    this[`box1`].focus();
  }

  handleUnlock = () => {
    const { profile, updateSettings } = this.props;
    const { pin } = this.state;
    if (!profile.pin) {
      this.setState({
        pinMessage: true,
      })
      updateSettings(
        profile.id, 
        { pin, 
          enteredPin: false, 
        }
    )
  } else if (pin !== profile.pin) {
      this.setState(prevState => ({
        attempts: prevState.attempts + 1,
        pinMessage: false,
      }), () => {
        let errorMsg;
        switch(true) {
          case (this.state.attempts < 3):
            errorMsg = "Sorry, wrong pin."
            break;
          case (this.state.attempts < 7):
            errorMsg = "Still wrong..."
            break;
          case (this.state.attempts < 13):
            errorMsg = "Still at it? Really?"
            break;
          case (this.state.attempts < 20):
            errorMsg = "This is getting old..."
            break;
          default:
            break;
        }
        this.setState({
          error: errorMsg
        })
        this[`box1`].focus();
      })

    } else if (pin === profile.pin) {
      updateSettings(profile.id, {enteredPin: true})
    }
  }

  handleFocus = (e, num) => {
    this.setState({
      error: "",
    });
    const inputValue = e.target.value;
    const box = `box${num}`;

    if ( inputValue.length !== 1 || inputValue === "e") {
      return false;
    }
    if ( !+inputValue && inputValue !== "*" ) {
      return false;
    }
    this.setState(prevState => ({
      pin: prevState.pin + inputValue.toString()
    }))

    this.setState(prevState => ({
      [`${box}`]: this.props.profile.pin && (this.state.activeBox === num) ? "*" : inputValue ,
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
    const { error, pinMessage, box1, box2, box3, box4 } = this.state;
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
                color: "gray",
                padding: 5 + "px", 
                margin: 5 + "px",
                fontSize: 1.8 + "em", 
                textAlign: "center",
                width: 50 + "px",
                height: 50 + "px",
                borderRadius: 5 + "px",
                border: "1px solid lightgray",
                backgroundColor: profile.pin ? "white" : "#fff09b"
              }}
              type="tel"
              onFocus={() => this.setState({activeBox: num})}
              onChange={(e) => this.handleFocus(e, num)}
              ref={(input) => { this[`box${num}`] = input; }} 
            />
          )}
          { !error &&
            <p className="text-warning" 
                style={{cursor: "pointer", marginBottom: 0, height: 30 + "px"}} 
                onClick={this.clearPin}
            >
              {(box1 || box2 || box3 || box4) &&  "clear" }
            </p> 
          }
          { error &&
            <p className="text-center text-danger" style={{marginBottom: 0, height: 35 + "px"}}>{error}</p>
          } 
          
        </Col>
        { pinMessage && profile.pin &&
          <Col xs={12} className="text-center text-warning">
            <p className={`text-center text-warning ${css(styles.pulse)}`}>Your new pin is <span className="text-primary">{profile.pin}</span></p>
          </Col>
        } 
        
      </Row>
    );
  }
}