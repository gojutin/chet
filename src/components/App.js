import React, { Component } from 'react';
import { Container, Col } from 'reactstrap';

// components
import AgreementModal from './AgreementModal';
import Header from './Header';
import Form from './Form';
import Response from './Response';
import Chat from './Chat';
import Footer from './footer/Footer';

export default class App extends Component {

  state = {
    showChat: false,
    showAgreementModal: false,
    delayChat: false,
  }

  componentDidMount() {
    this.props.handleNightMode();

    if (localStorage.chet !== "true") {
			this.toggleAgreementModal();
		}

    this.props.authWatch()
      .then(userId => {
        this.props.handleBabyChet(userId).then((profile) => {
          if (profile && profile.allowChet === false && profile.babyChetMode === false) {
            this.props.fetchPhrases(profile.babyChetPhrasesId, profile.babyChetChatId);
            this.props.toggleBabyChetMode(profile.babyChetMode, profile.babyChetPhrasesId );
          } else {
            this.props.fetchPhrases("values");
          }
        })
      })
  }

  toggleChat = () => {
    this.setState(prevState => ({
      showChat: !prevState.showChat,
    }))
    if (this.state.delayChat === false) {
      this.setState(prevState => ({
        delayChat: !prevState.delayChat,
      }))
    } else {
      setTimeout(() => {
        this.setState(prevState => ({
          delayChat: !prevState.delayChat,
        }))
      }, 500)
    }
  }

	toggleAgreementModal = () => {
		this.setState(prevState => ({
			showAgreementModal: !prevState.showAgreementModal
		}))
	}

  render() {
    const { thisChat, response, profile, nightMode } = this.props;
    const { showChat, delayChat, showAgreementModal } = this.state;

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
              showChat={showChat}
              response={response}
              profile={profile}
            />
          </Col>

            <Chat
              thisChat={thisChat}
              delayChat={delayChat}
              response={response}
              name={profile.babyChetMode ? profile.babyChetName : "Chet"}
            />
            
          { showAgreementModal && 
          <AgreementModal
            toggleAgreementModal={this.toggleAgreementModal}
            showAgreementModal={showAgreementModal}
          />
          }

        </Container>

        <Footer
          {...this.props}
          toggleChat={this.toggleChat}
          showChat={showChat}
        />
      </div>
    );
  }
}
