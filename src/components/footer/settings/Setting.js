import React, { Component } from 'react';
import { Label, Button } from 'reactstrap';
import { 
  wobble, tada, rubberBand, rotateIn, bounce, jello, swing, fadeIn
} from 'react-animations';
import { StyleSheet, css } from 'aphrodite';


const styles = StyleSheet.create({
  wobble: {
    animationName: wobble,
    animationDuration: '0.25s'
  },
  tada: {
    animationName: tada,
    animationDuration: '0.25s'
  },
  rubberBand: {
    animationName: rubberBand,
    animationDuration: '0.25s'
  },
  rotateIn: {
    animationName: rotateIn,
    animationDuration: '0.25s'
  },
  bounce: {
    animationName: bounce,
    animationDuration: '0.25s'
  },
  jello: {
    animationName: jello,
    animationDuration: '0.25s'
  },
  swing: {
    animationName: swing,
    animationDuration: '0.25s'
  },
  fadeIn: {
    animationName: fadeIn,
    animationDuration: '1s'
  },
});


export default class Setting extends Component {

  state = {
    showConfirmForm: false,
    emailAddress: "",
    error: "",
    wiping: false,
    zapping: false,
  }
    
  handleEmailAddress = (e) => {
    const emailAddress = e.target.value;
    this.setState({
      emailAddress,
      error: "",
    })
  }

  handleSubmit = () => {
    if (this.props.userEmail.toLowerCase() !== this.state.emailAddress.toLowerCase()) {
      this.setState({
        error: "Wrong email address. Please try again."
      })
    } else {
      this.props.onClick();
      this.setState({
        showConfirmForm: false,
        emailAddress: "",
        error: ""
    }, () => {
      if (this.props.title === "Wipe my chatbot's mind") {
        this.setState({
          wiping: true,
        }, () => {
          this.handleZap();
          setTimeout(() => {
            this.setState({
              wiping: false
            })
          }, 5000)
        })
      }
    })
    }
  }

  handleChange = () => {
    this.setState(prevState => ({
      showConfirmForm: !prevState.showConfirmForm,
      emailAddress: "",
    }), () => {
      if (this.state.showConfirmForm) {
        this.emailInput.focus();
      }   
    })  
  }

  handleZap = () => {
    const animations = ["wobble", "tada","bounce", "swing", "jello", "rotateIn", "rubberBand"];
    const zap = () => {
      const randomNumber = Math.floor(Math.random() * animations.length);
      const randomAnimation = animations[randomNumber];
      this.setState(prevState => ({
        zapping: !prevState.zapping,
        randomAnimation: randomAnimation,
      }))
      if (this.state.wiping){
        window.setTimeout(() => {
          zap();
        }, 100)
        
      } else { return }
    }
    zap();
  }

  render() {
    const { showConfirmForm, error, wiping, zapping, randomAnimation } = this.state; 
    const {condition, title, babyChetColor } = this.props;

    return (
       <div>
          { condition &&
              <p 
                className={`${showConfirmForm ? "" : "text-warning"}`}
                style={{textDecoration: "underline", cursor: "pointer"}}
                onClick={this.handleChange}
              >
                {showConfirmForm ? "Nevermind": title}
              </p>
          }

          { wiping &&
            <div 
              className={`text-center`}
              style={{
                backgroundImage: 'url("zap.gif")',
                width: 256 + "px", 
                height: 135 + "px",
                paddingTop: 30 + "px",
                margin: "0 auto"
              }}
            >
            <i className={`fa fa-child fa-4x text-center ${zapping && css(styles[randomAnimation])}`} style={{color: babyChetColor}} />
            </div>
          }
          { showConfirmForm && 
            <div className={showConfirmForm &&  css(styles.fadeIn)}>
              <Label>Please enter the email address associated with your account.</Label>
              <input 
                value={this.state.emailAddress}
                className="btn text-left"
                style={{
                  width: 100 + "%", 
                  outline: "none", 
                  border: "1px solid lightgray",
                  borderRadius: 5 + "px",
                  marginBottom: 15 + "px",
                }}
                onChange={this.handleEmailAddress}
                ref={(input) => { this.emailInput = input; }} 
              />
              { error && 
                <p className="text-warning">{error}</p>
              }
              <br />
              <Button
                color="danger"
                onClick={this.handleSubmit}
                style={{cursor: "pointer"}}
                aria-label="Confirm submit"
              >
                {title}
              </Button>
              <hr />
            </div>
          }
       </div>
    );
  }
}