import React, { Component } from 'react';
import { Container, Col } from 'reactstrap';

// components
import Form from './components/Form';
import Response from './components/Response';
import Conversation from './components/Conversation';
import AgreementModal from './components/AgreementModal';
import Header from './components/Header'
import Footer from './components/footer/Footer';


export default class App extends Component {

  state = {
    showConversation: false,
    delayConversation: false,
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
    this.props.handleDisplayMode();
  }

  componentDidMount() {
    const { valuesId, convoId, conversationId} = this.props.db;
    const { bgClass, displayMode } = this.props.displayMode;
    this.props.fetchPhrases(valuesId).then(() => {
      this.props.startConversation(convoId).then(({dbConvoId, convoArray, chatKey}) => {
        // this.props.clearEmptyConversations(convoId, convoArray, conversationId)
      })
    })
    this.props.authWatch();
    
  }

  handleBabyChet = () => {
    const { db, babyChetMode } = this.props;
    this.props.babyChet(db.uid, babyChetMode)
      .then(db => {
        const { valuesId, convoId } = db;
        this.props.fetchPhrases(valuesId).then(() => {
          this.props.startConversation(convoId).then(({dbConvoId, convoArray, chatKey}) => {
            // this.props.clearEmptyConversations(dbConvoId, convoArray, chatKey)
          })
        });
        
      })
  }

  handleWipeBabyChetsMind = () => {
    const { valuesId, convoId, id } = this.props.db;
    this.props.wipeBabyChetsMind(valuesId, convoId, id)
  }

  handleSaveSettings = (name, color) => {
    const { db } = this.props;
    this.props.saveDetails(db, name, color)
  }

  render() {
    const { thisConversation, response, db, babyChetMode, slices } = this.props;
    const { showConversation, delayConversation } = this.state;
    const { name } = db;
    const { bgClass } = this.props.displayMode;

    return (

      <div
        className={`text-center ${bgClass}`}
        style={{
          width: 100 + "%",
          height: 100 + "%",
          minHeight: "100vh",
          margin: 0,
        }}
      >
        <div style={{color: bgClass === "day" ? "#2a96c7" : "#2a96c7",}}>
          <Header db={db} babyChetMode={babyChetMode} />
        </div>

        <Container
          style={{
            paddingBottom: 30 + "px",
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
              db={db}
            />
          </Col>

          
          <Conversation
            thisConversation={thisConversation}
            delayConversation={delayConversation}
            response={response}
            slices={slices}
            name={name}
          />

          <br />
          <br />

          <AgreementModal />

        </Container>

        <Footer
          {...this.props}
          handleBabyChet={this.handleBabyChet}
          handleSaveSettings={this.handleSaveSettings}
          toggleConversation={this.toggleConversation}
          showConversation={showConversation}
          handleWipeBabyChetsMind={this.handleWipeBabyChetsMind}
        />
      </div>
    );
  }
}
