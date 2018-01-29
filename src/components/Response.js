import React, { Component } from 'react';
import 'react-typist/dist/Typist.css';
import Typist from 'react-typist';
import {Collapse} from 'react-collapse';
import { Col } from 'reactstrap';
import { StyleSheet, css } from 'aphrodite';

export default class Response extends Component {
  
  state = {
    showTyping: true,
  };

  toggleTyping = () => {
    this.setState(prevState => ({
      showTyping: !prevState.showTyping,
    }));
  }

  render () {
    const { response, showChat, showResponse, profile } = this.props;
    const styles = StyleSheet.create({
      chetColor: {
        color: "green",
      },
      babyChetColor: {
        color: profile.babyChetColor,
      },
    });
    return (
      <Col xs={12} md={{ size: 8, offset: 2 }}>
        <Collapse isOpened={!showChat} style={{overflow: "hidden"}} >
          <div style={{minHeight: "50vh"}}>
            <div className={showChat ? "convoMessageEnter": "convoMessageLeave"}>
              {  response.term && showResponse &&
                <Typist 
                  avgTypingSpeed={100}
                  stdTypingDelay={100}
                  startDelay={1050}
                  className={`
                    typist-class 
                    ${showChat ? "convoMessageLeave": ""} 
                    ${profile.babyChetMode ? css(styles.babyChetColor): css(styles.chetColor)}` } 
                >
                  {response.term}
                </Typist>
              } 
            </div>
          </div>
        </Collapse>
      </Col>
    );
  }
}




