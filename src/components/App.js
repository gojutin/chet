import React, { Component } from 'react';
import '../index.css';
import 'bootstrap/dist/css/bootstrap.css';
import { StyleSheet, css } from 'aphrodite';

// components
import AgreementModal from './AgreementModal';
import Header from './Header';
import Form from './Form';
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
          if (profile) {
            this.props.fetchData(profile.babyChetPhrasesId)
            .then(phrases => {
              this.props.getInitialStats(phrases);
            })  
          } else {
            this.props.fetchData()
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
    const { response, profile, nightMode, offline, currentChat } = this.props;
    const { showChat, delayChat, showAgreementModal } = this.state;

    const styles = StyleSheet.create({
      wrapper: {
        width: 100 + "%",
        height: 100 + "%", 
        minHeight: "100vh", 
        margin: 0,
        textAlign: "center",
      },
      offline: {
        display: !offline ? "none" : "block", 
        position: "fixed", 
        top: 15, 
        right: 15
      },
      container: {
        marginBottom: showChat ? 75 + "px" : 0 + "px",
        height: 100 + "%",
        minHeight: 100 + "%",
        marginLeft: 5 + "%",
        marginRight: 5 + "%",
        textAlign: "center",
      },
    });

    return (

      <div 
        className={`
          ${nightMode ? "bg-black" : "bg-white"}
          ${css(styles.wrapper)}
        `}
      >

        <img 
          src="offline-icon.png" 
          alt="offline icon" 
          className={css(styles.offline)}
        />

        <Header profile={profile} />

        <div className={css(styles.container)}>

          <Form 
            {...this.props} 
            showChat={showChat}
          />

          <Chat
            currentChat={currentChat}
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
          
        </div>

        <Footer
          {...this.props}
          toggleChat={this.toggleChat}
          showChat={showChat}
        />
      </div>
    );
  }
}
