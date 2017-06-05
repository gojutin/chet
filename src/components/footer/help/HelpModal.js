import React from 'react';

import { Modal, ModalBody, NavItem, TabContent, TabPane, Nav } from 'reactstrap';

// components
import About from './About';
import FAQ from './FAQ';
import Privacy from './Privacy';

const helpTabs = [
  {tabId: "1", name: "App", component: <About />},
  {tabId: "2", name: "FAQ", component: <FAQ />},
  {tabId: "3", name: "Privacy", component: <Privacy />},
]

const HelpTab = ( {toggleTab, tabNumber, activeTab, children} ) => (
	<div className="nav-link">
		<NavItem
			className={tabNumber === activeTab && "active"}
			onClick={() => { toggleTab(tabNumber) }}
		>
			{children}
		</NavItem>
  </div>  
);

const HelpTabPane = ({tabId, children}) => (
  <TabPane tabId={tabId}>
      <div style={{ padding: 20 + "px" }} >
        { children }
      </div>
  </TabPane>
)

export default ({showHelpModal, toggleHelpModal, activeHelpTab, toggleHelpTabs }) => 
  <Modal 
    isOpen={showHelpModal} 
    className="text-center modal-shadow" 
    toggle={toggleHelpModal} 
  >
    <ModalBody
      style={{
        fontFamily: "Comfortaa, sans-serif",
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
          { 
            helpTabs.map(({tabId, name}) => (
              <HelpTab 
                key={tabId}
                toggleTab={toggleHelpTabs}
                tabNumber={tabId}
                activeTab={activeHelpTab}
              >
                {name}
              </HelpTab>
            ))
          }
        </Nav>
        <TabContent activeTab={activeHelpTab}>
          {
            helpTabs.map(({tabId, component}) => (
              <HelpTabPane key={tabId} tabId={tabId}>
                { component }
              </HelpTabPane>
            ))
          }  
        </TabContent>
      </div>
    </ModalBody>
  </Modal>