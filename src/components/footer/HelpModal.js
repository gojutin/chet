import React from 'react';

import { Modal, ModalBody, TabContent, TabPane, Nav, Row, Col } from 'reactstrap';

// components
import Terms from '../Terms';
import HelpTab from './HelpTab';
import FAQ from './FAQ';

const helpTabs = [
  {num: "1", name: "App"},
  {num: "2", name: "FAQ"},
  {num: "3", name: "Privacy Policy"},
]

export default ({showHelpModal, toggleHelpModal, activeHelpTab, toggleHelpTabs }) => 
  <Modal 
    isOpen={showHelpModal} 
    className="text-center scroll modal-shadow" 
    style={{ maxHeight: 80 + "%", overflow: "auto" }} 
    toggle={toggleHelpModal} 
  >
    <ModalBody
      style={{
        fontFamily: "Comfortaa, Righteous, sans-serif",
        border: "2px solid lightgray"
      }}
      className="scroll"
    >
      <i
        className="fa fa-times text-danger pull-right"
        onClick={toggleHelpModal}
        style={{ cursor: "pointer", fontSize: 1.3 + "em" }}
      />
      <div>
        <Nav tabs style={{ cursor: "pointer"}}>
          { helpTabs.map(item => (
              <HelpTab 
                key={item.num}
                toggleTab={toggleHelpTabs}
                tabNumber={item.num}
                activeTab={activeHelpTab}
              >
                {item.name}
              </HelpTab>
            ))
          }
        </Nav>
        <TabContent activeTab={activeHelpTab}>
          <TabPane tabId="1">
            <Row>   
              <Col sm="12" style={{ padding: 10 + "px" }} >
                <i className="fa fa-moon-o fa-2x text-warning" />
                <h5 className="text-primary">Light or dark theme</h5>
                <p>Toggle between a light or dark themed background. Dark theme is the default from 7:00PM to 7:00AM.</p>
                <hr />
                <i className="fa fa-user-o fa-2x text-warning" />
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
                <p>Give your chatbot a name or a color. See it's stats or wipe it's mind and start over.</p>
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
                <FAQ />
                <h5 className="text-primary">
                  What programming language is Chet written in?
                </h5>
                <p>
                  Chet is written in JavaScript using
                    <a href="https://facebook.github.io/react/" target="_blank" rel="noopener noreferrer" > React </a>
                    and 
                    <a href="http://redux.js.org/" target="_blank" rel="noopener noreferrer" > Redux</a>
                    . The data is stored in 
                  <a href="https://firebase.google.com/" target="_blank" rel="noopener noreferrer" > Firebase</a>.
                </p>
                <hr />
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="3">
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