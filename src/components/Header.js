import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { 
  wobble, bounceInDown, bounceOutUp, tada, rotateInDownRight, 
  hinge, rubberBand, flip, rotateIn, bounce, jello, swing, zoomInDown, zoomOutUp,
} from 'react-animations';
import { StyleSheet, css } from 'aphrodite';

const styles = StyleSheet.create({
  rotateInDownRight: {
    animationName: rotateInDownRight,
    animationDuration: '1s'
  },
  bounceInDown: {
    animationName: bounceInDown,
    animationDuration: '2s'
  },
  wobble: {
    animationName: wobble,
    animationDuration: '1s'
  },
  tada: {
    animationName: tada,
    animationDuration: '1s'
  },
  rubberBand: {
    animationName: rubberBand,
    animationDuration: '1s'
  },
  flip: {
    animationName: flip,
    animationDuration: '1s'
  },
  zoomInDown: {
    animationName: zoomInDown,
    animationDuration: '1s'
  },
  zoomOutUp: {
    animationName: zoomOutUp,
    animationDuration: '1s'
  },
  hinge: {
    animationName: hinge,
    animationDuration: '1s'
  },
  rotateIn: {
    animationName: rotateIn,
    animationDuration: '1s'
  },
  bounce: {
    animationName: bounce,
    animationDuration: '1s'
  },
  jello: {
    animationName: jello,
    animationDuration: '1s'
  },
  swing: {
    animationName: swing,
    animationDuration: '1s'
  },
  bounceOutUp: {
    animationName: bounceOutUp,
    animationDuration: '1s'
  },
})

export default class Header extends Component {

  state = {
    animateBabyChet: true,
    randomAnimation: "",
  }

  handleAnimateBabyChet = () => {
    const animations = ["wobble", "tada", "flip","bounce", "zoomOutUp", "swing", "zoomInDown", "bounceOutUp", "jello","rotateIn", "hinge", "rubberBand"];
    const randomNumber = Math.floor(Math.random() * animations.length);
    const randomAnimation = animations[randomNumber];
    this.setState(prevState => ({
      animateBabyChet: !prevState.animateBabyChet,
    }), () => {
      this.setState(prevState => ({
        animateBabyChet: !prevState.animateBabyChet,
        randomAnimation: randomAnimation,
      }))
    })
  }
  render () {

    const { profile } = this.props;
    const { animateBabyChet, randomAnimation } = this.state;
    return (
      <Row style={{ maxWidth: "100vw", margin: 0 }}>
        <Col xs={12}>
          { profile.babyChetMode &&
            <div className={css(styles.flip)}>
              { animateBabyChet &&
              <i
                className={`fa fa-child fa-5x ${animateBabyChet && css(styles[randomAnimation])}`}
                onClick = {this.handleAnimateBabyChet}
                style={{
                  marginTop: 4 + "%",
                  fontSize: 72 + "px",
                  color: profile.babyChetColor ? profile.babyChetColor : "gray",
                }}
              />
              }
            </div>
          }

          { profile.babyChetMode &&
            <h2 style={{ color: "gray", paddingTop: 5 + "px" }}>{profile.babyChetName}</h2>
          }

          { !profile.babyChetMode &&
            <img
              src="chet_logo-min.png"
              alt="Chet Logo"
              height={120}
              style={{ marginTop: 4 + "%" }}
              className={`visible ${css(styles["tada"])}`}
            />
          }
        </Col>
      </Row>
    )
  }
}