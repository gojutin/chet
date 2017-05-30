import React from 'react';

import { Modal, ModalBody, TabContent, TabPane, Nav, Row, Col } from 'reactstrap';

// components
import Terms from '../../Terms';
import HelpTab from './HelpTab';
import FAQ from './FAQ';
import About from './About';

const helpTabs = [
  {num: "1", name: "App"},
  {num: "2", name: "FAQ"},
  {num: "3", name: "Privacy Policy"},
]

export default ({showHelpModal, toggleHelpModal, activeHelpTab, toggleHelpTabs }) => 
  <Modal 
    isOpen={showHelpModal} 
    className="text-center modal-shadow" 
    toggle={toggleHelpModal} 
  >
    <ModalBody
      style={{
        fontFamily: "Comfortaa, Righteous, sans-serif",
        border: "2px solid lightgray",
        maxHeight: 80 + "vh"
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
              <Col sm="12" style={{ padding: 15 + "px" }} >
                <About />
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
                    <a href="https://facebook.github.io/react/" rel="noopener noreferrer" target="_blank" > React </a>
                    and 
                    <a href="http://redux.js.org/" rel="noopener noreferrer"  target="_blank"> Redux</a>
                    . The data is stored in 
                  <a href="https://firebase.google.com/" rel="noopener noreferrer" target="_blank" > Firebase</a>.
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