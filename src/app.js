import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';


// components
import Form from './components/Form';
import Response from './components/Response';
import Conversation from './components/Conversation';
import AgreementModal from './components/AgreementModal';
import Footer from './components/footer/Footer';

export default class App extends Component {

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
    const { valuesId, convoId } = this.props.db;
    this.props.fetchData(valuesId);
    this.props.authWatch();
    this.props.startConversation(convoId).then(() => {
      this.props.clearEmptyConversations(this.props.conversations, this.props.conversationId, convoId);
      // this.props.sayHi();
    })
  }

  handleBabyChet = () => {
    // const { valuesId, convoId } = this.props.db
    this.props.babyChet(this.props.userInfo.uid, this.props.babyChetMode)
      .then(db => {

        const { valuesId, convoId } = db;
        this.props.fetchData(valuesId);
        this.props.startConversation(convoId).then(() => {
          this.props.clearEmptyConversations(this.props.conversations, this.props.conversationId, convoId);
      // this.props.sayHi();
        });
      })
  }

  handleWipeBabyChetsMind = () => {
    const { valuesId, convoId, id } = this.props.db;
    this.props.wipeBabyChetsMind(valuesId, convoId, id)
  }

  handleSaveSettings = (name, color) => {
    const { db } = this.props;
    this.props.saveDetails(db, name, color);
  }

  render() {
    const { thisConversation, response, delay, db, babyChetMode, loading, typing, slices } = this.props;
    const { showConversation, delayConversation, nightMode, animatedClass, } = this.state;
    const { name } = db;

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
      {/*<img src="whitenoise.gif" width={200} />*/}
        <div
          style={{
            color: nightMode ? "#2a96c7" : "#2a96c7",
          }}
        >
          <Row style={{ maxWidth: "100vw", margin: 0 }}>
            <Col xs={12}>
              {babyChetMode
                ? <div>
                  <i
                    className="fa fa-child fa-5x"
                    style={{
                      marginTop: 4.65 + "%",
                      fontSize: 69 + "px",
                      color: db.color ? db.color : "gray",
                    }}
                  />
                  {name &&
                    <h1 style={{ color: db.color ? db.color : "gray", paddingTop: 5 + "px" }}>{name ? name: "my chatbot"}</h1>
                  }
                  </div>
                : 
                <img
                  src="chet_logo.png"
                  alt="Chet Logo"
                  height={120}
                  style={{ marginTop: 5 + "%" }}
                  className="visible"
                />
              }
            </Col>
          </Row>
        </div>
        <Container
          style={{
            paddingBottom: 30 + "px",
            height: 100 + "%",
            minHeight: 100 + "%"
          }}
        >

          <Form {...this.props} dbId={db.valuesId} dbConvoId={db.convoId} />

          <Col xs={12} md={{ size: 8, offset: 2 }}>
            <Response
              {...this.props}
              showConversation={showConversation}
              term={response.term}
              loading={loading}
              typing={typing}
            />
          </Col>
          <Conversation
            thisConversation={thisConversation}
            delayConversation={delayConversation}
            responseId={response.id}
            slices={slices}
            delay={delay}
            name={name}
          />
          <br />

          <AgreementModal />

        </Container>

        <Footer
          {...this.props}
          toggleNightMode={this.toggleNightMode}
          handleBabyChet={this.handleBabyChet}
          handleSaveSettings={this.handleSaveSettings}
          toggleConversation={this.toggleConversation}
          animatedClass={animatedClass}
          nightMode={nightMode}
          handleWipeBabyChetsMind={this.handleWipeBabyChetsMind}
        />
      </div>
    );
  }
}
