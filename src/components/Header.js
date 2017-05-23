import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { rollIn, wobble, bounceInDown, tada, rotateInDownRight } from 'react-animations';
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
})

export default class Header extends Component {

  state = {
    animateBabyChet: true,
  }

  handleAnimateBabyChet = () => {
    this.setState(prevState => ({
      animateBabyChet: !prevState.animateBabyChet,
    }), () => {
      this.setState(prevState => ({
        animateBabyChet: !prevState.animateBabyChet,
      }))
    })
  }
  render () {

    const { db, babyChetMode } = this.props;
    const { animateBabyChet } = this.state;
    return (
      <Row style={{ maxWidth: "100vw", margin: 0 }}>
        <Col xs={12}>
          { babyChetMode &&
            <div className={css(styles.rotateInDownRight)}>
              { animateBabyChet &&
              <i
                className={`fa fa-child fa-5x ${animateBabyChet && css(styles.wobble)}`}
                onClick = {this.handleAnimateBabyChet}
                style={{
                  marginTop: 4.65 + "%",
                  fontSize: 69 + "px",
                  color: db.color ? db.color : "gray",
                }}
              />
              }
              </div>
          }

          { babyChetMode && db.name &&
            <h2 style={{ color: "gray", paddingTop: 5 + "px" }}>{db.name ? db.name: "my chatbot"}</h2>
          }

          { !babyChetMode &&
            <img
              src="chet_logo.png"
              alt="Chet Logo"
              height={120}
              style={{ marginTop: 5 + "%" }}
              className={`visible ${css(styles.tada)}`}
            />
          }
        </Col>
      </Row>
    )
  }
}