import React, { Component } from 'react';
import { Container, Col } from 'reactstrap';

// components
import Form from './Form';
import Response from './Response';
import Conversation from './Conversation';
import AgreementModal from './AgreementModal';
import Header from './Header'
import Footer from './footer/Footer';

export default class App extends Component {

  state = {
    showConversation: false,
    delayConversation: false,
  }

  componentDidMount() {
    this.props.handleNightMode();
    this.props.authWatch()
    .then(userId => {
      console.log("UID", userId)
      this.props.handleBabyChet(userId).then((profile) => {
        console.log("pro",profile)
        if (profile && profile.allowChet === false && profile.babyChetMode === false) {
          this.props.fetchPhrases(profile.babyChetPhrasesId);
          this.props.toggleBabyChetMode(profile.babyChetMode, profile.babyChetPhrasesId );
        } else {
          console.log("time to fetch values")
          this.props.fetchPhrases("values");
        }
      })
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

  render() {
    const { thisConversation, response, profile, slices, nightMode } = this.props;
    const { showConversation, delayConversation } = this.state;

    return (

      <div
        className={`text-center ${nightMode ? "bg-black" : "bg-white"}`}
        style={{ width: 100 + "%",height: 100 + "%", minHeight: "100vh", margin: 0,}}
      >
        <div style={{color: "#2a96c7"}}>
          <Header profile={profile} />
        </div>

        <Container
          style={{
            paddingBottom: 30 + "px",
            marginBottom: 20 + "px",
            height: 100 + "%",
            minHeight: 100 + "%"
          }}
        >

          <Form 
            {...this.props} 
          />

          <Col xs={12} md={{ size: 8, offset: 2 }}>
            <Response
              showConversation={showConversation}
              response={response}
              profile={profile}
            />
          </Col>

          
          <Conversation
            thisConversation={thisConversation}
            delayConversation={delayConversation}
            response={response}
            slices={slices}
            name={profile.babyChetMode ? profile.babyChetName : "Chet"}
          />

          <AgreementModal />

        </Container>

        <Footer
          {...this.props}
          toggleConversation={this.toggleConversation}
          showConversation={showConversation}
        />
      </div>
    );
  }
}
