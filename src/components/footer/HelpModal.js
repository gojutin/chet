import React, { Component } from 'react';

import { Modal, ModalBody, TabContent, TabPane, Nav, Row, Col } from 'reactstrap';

// components
import Terms from '../Terms';
import HelpTab from './HelpTab';

export default class HelpModal extends Component {

  state = {
    showModal: false,
    activeTab: "1"
  }

  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal
    }), () => {
      if (!this.state.showModal) {
        this.setState({
          activeTab: "1",
        })
      }
    })
  }

  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }


  render() {
    const { showModal, activeTab } = this.state;

    const FAQS = [
      {
        q: "Do I have to sign in to use Chet?",
        a: "Nope. Chet is available for anyone and everyone. However, logging in is required to create and train your own chatbot. You can login with Google, Facebook, Twitter or Github.",
      },
      {
        q: "What is the difference between Chet and my chatbot?",
        a: "Under the hood, they both process information and generate responses in exactly the same way. And they both start their existense with no concept of language. The difference is that Chet is available to the public and has been learning for a while now, while your chatbot is brand new with no concept of language. Chet and your chatbot do not share any information.",
      },
       {
        q: "Is my chatbot's memory saved?",
        a: "Yup. Every conversation is saved so your chatbot continues to learn from each exchange that you have over time. You can always wipe your chatbot's mind and start over.",
      },
      {
        q: "What programming language is Chet written in?",
        a: "Chet is written entirely in JavaScript using React and Redux to manage the view and Firebase to store the persisted data.",
      },
    ]

    return (
      <div style={{ display: "inline" }}>
        <i className="fa fa-question-circle fa-2x" onClick={this.toggleModal} style={{ color: "gray", cursor: "pointer" }} />
        <Modal isOpen={showModal} className="text-center scroll modal-shadow" style={{ maxHeight: "90vh" }} toggle={this.toggleModal} >
          <ModalBody
            style={{
              fontFamily: "Comfortaa, Righteous, sans-serif",
              border: "2px solid lightgray"
            }}
          >
            <i
              className="fa fa-times text-danger pull-right"
              onClick={this.toggleModal}
              style={{ cursor: "pointer" }}
            />
            <div>
              
              <Nav tabs style={{ cursor: "pointer"}}>
                <HelpTab 
                  toggleTab={this.toggle}
                  tabNumber="1"
                  activeTab={activeTab}
                >
                  App
                </HelpTab>
                <HelpTab 
                  toggleTab={this.toggle}
                  tabNumber="2"
                  activeTab={activeTab}
                >
                  Chet
                </HelpTab>
                <HelpTab 
                  toggleTab={this.toggle}
                  tabNumber="3"
                  activeTab={activeTab}
                >
                  FAQ
                </HelpTab>
                <HelpTab 
                  toggleTab={this.toggle}
                  tabNumber="4"
                  activeTab={activeTab}
                >
                  Terms
                </HelpTab>
              </Nav>

              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                  <Row>
                    
                    <Col sm="12" style={{ padding: 10 + "px" }} >
                      <i className="fa fa-moon-o fa-2x text-warning" />
                      <h5 className="text-primary">Light or dark theme</h5>
                      <p>Toggle between a light or dark themed background. Dark theme is the default from 7:00PM to 7:00AM.</p>
                      <hr />
                      <i className="fa fa-user-circle-o fa-2x text-warning" />
                      <h5 className="text-primary">Login</h5>
                      <p>Create and train your own chatbot.</p>
                      <hr />
                      <i className="fa fa-child fa-2x text-warning" />
                      <h5 className="text-primary">Talk to your chatbot</h5>
                      <p>( requires login )</p>
                      <p>Toggle between Chet and your chatbot at any time.</p>
                      <hr />
                      <i className="fa fa-cog fa-2x text-warning" />
                      <h5 className="text-primary">Chatbot settings</h5>
                      <p>( requires login )</p>
                      <p>Give your chatbot a name or a color. See it's stats or wipe its mind and start over.</p>
                      <hr />
                      <i className="fa fa-tasks fa-2x text-warning" />
                      <h5 className="text-primary">Conversation view</h5>
                      <p>Toggle between a single response view or a full conversation view.</p>
                      <hr />
                      <i className="fa fa-info-circle fa-2x text-warning" />
                      <h5 className="text-primary">Stats </h5>  
                      <p>( in conversation view )</p>
                      <p>View a detailed description of how the latest input was processed and response was generated.</p>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="2">
                  <Row>
                    <Col sm="12" style={{ padding: 20 + "px" }}>
                      <h5 className="text-primary">
                        Chet is a chatbot that learns from you.
								</h5>
                      <p>
                        Chet has no pre-conceived knowledge of language and learns everything by analyzing the input values received during conversations with people like you.
								</p>
                  <p>
                        Chet has no pre-conceived knowledge of language and learns everything by analyzing the input values received during conversations with people like you.
								</p>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="3">
                  <Row>
                    <Col sm="12" style={{ padding: 20 + "px" }}>
                      {FAQS.map(({ q, a }) =>
                        <div key={q}>
                          <h5 className="text-primary">{q}</h5>
                          <p>{a}</p>
                          <hr />
                        </div>
                      )
                      }
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="4">
                  <Row>
                    <Col sm="12" style={{ padding: 20 + "px" }}>
                      <Terms />
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </div>


          </ModalBody>


        </Modal>
      </div>
    )
  }
}