import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

import { withCookies } from 'react-cookie';

// components
import Form from './components/Form';
import Response from './components/Response';
import Conversation from './components/Conversation';
import AgreementModal from './components/AgreementModal';

class App extends Component {

  state = {
    showConversation: false,
    delayConversation: false,
    modal: false,
    checkBox: false,
    nightMode: false,
    animatedClass: "",
  }

  toggleNightMode = () => {
    this.setState(prevState => ({
      nightMode: !prevState.nightMode
    }), () => {
      if (this.state.nightMode) {
        this.setState({
          animatedClass: "animatedBackgroundBlack"
        })
      } else {
        this.setState({
          animatedClass: "animatedBackgroundWhite"
        })
      }
    })
  }

  toggleConversation = () => {
    this.setState(prevState => ({
      showConversation: !prevState.showConversation,
    }))
    if (this.state.delayConversation === false) {
      this.setState(prevState => ({
        delayConversation: !prevState.delayConversation,
      }))
    } else {
      setTimeout(() => {
        this.setState(prevState => ({
          delayConversation: !prevState.delayConversation,
        }))
      }, 500)
    }
  }

  componentWillMount() {
    // Switch between night and day mode depending on time of day
    const rightNow = new Date().getHours();
    if (rightNow >= 19 || rightNow <= 6) {
      this.toggleNightMode();
    }
  }

  componentDidMount() {
    this.props.fetchData();
    this.props.startConversation().then(() => {
      this.props.clearEmptyConversations(this.props.conversations, this.props.conversationId);
      // this.props.sayHi();
    })
    
  }

  render() {
    const { thisConversation, response, delay, cookies } = this.props;
    const { showConversation, delayConversation, nightMode, animatedClass } = this.state;
    const headerStyle = {
      fontFamily: 'Righteous, Cutive Mono, monospace',
      margin: 0,
      fontSize: 3 + "em",
    };

    return (

      <div
        className={`text-center ${animatedClass}`}
        style={{
          width: 100 + "%",
          height: 100 + "%",
          minHeight: "100vh",
          margin: 0,        
        }}
      >

        <div
          style={{
            color: nightMode ? "#2a96c7" : "#2a96c7",
          }}
        >
          <Row style={{ maxWidth: "100vw", margin: 0 }}>
            <Col xs={{ size: 6, offset: 3 }}>
              {/*<i 
              className="fa fa-comments-o fa-4x" 
              style={{ marginTop: 15 + "px" }} 
            />*/}
              <img
                src="chet_icon.png"
                alt="Chet Logo"
                height={75}
                style={{ marginTop: 15 + "%" }}
              />
            </Col>


          </Row>

          <h1 style={headerStyle} >
            chet
          </h1>
        </div>
        <Container style={{ paddingBottom: 30 + "px", height: 100 + "%", minHeight: 100 + "%"}}>

          <Form
            {...this.props}
          />
      
            <Col xs={12} md={{size:8, offset:2}}>
          <Response
            {...this.props}
            showConversation={showConversation}
          />
            </Col>
        

          <Conversation
            thisConversation={thisConversation}
            delayConversation={delayConversation}
            responseId={response.id}
            delay={delay}
          />
          <br />

          <AgreementModal
            cookies={cookies}
          />

          {
            /* THIS IS A FULL LIST OF THE VALUES
            this.props.values && 
            this.props.values.map(value => 
              <p key={value.id}>{value.term}</p>) 
            */
          }

        </Container>

        {/*FOOTER*/}

        <div 
          style={{ 
            position: "fixed", 
            bottom: 0, 
            height: 50 + "px", 
            width: 100 + "%", 
            padding: 5 + "px",
          }}
          className={animatedClass}
        >
          <div style={{ paddingTop: 4 + "px" }}>

            { thisConversation &&
              thisConversation.exchanges &&
              thisConversation.exchanges.length > 0 &&

              <i
                onClick={this.toggleConversation}
                className="fa fa-tasks fa-2x"
                style={{
                  cursor: "pointer",
                  color: showConversation ? "#ffbb33" : "gray",
                  marginRight: 40 + "px",
                }}
              />
            }

            <i
              className={`fa fa-moon-o fa-2x ${nightMode ? "text-warning" : ""}`}
              onClick={this.toggleNightMode}
              style={{ color: "gray", cursor: "pointer" }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default withCookies(App);
