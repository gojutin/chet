import React, { Component } from 'react';

import { Modal, ModalBody, Progress } from 'reactstrap';

export default class StatsModal extends Component {
	 state = {
    showInfoModal: false,
    showSlices: false,
  }

	  toggleInfoModal = () => {
    this.setState(prevState => ({
      showInfoModal: !prevState.showInfoModal,
      showSlices: false,
    }));
  }

  toggleShowSlices = () => {
    this.setState(prevState => ({
      showSlices: !prevState.showSlices
    }));
  }

	render() {
		const { showInfoModal, showSlices } = this.state;
    const { response, name } = this.props;
		return (
			<div>
				<i 
					className="fa fa-info-circle pull-right" 
					style={{
            marginTop: 18 + "px", 
            color: showInfoModal ? "#ffbb33" : "lightgray", 
            cursor: "pointer"
          }}
					onClick={this.toggleInfoModal}
        />
			 <Modal 
            isOpen={showInfoModal} 
            toggle={this.toggleInfoModal} 
            className="text-center modal-shadow"
            style={{maxHeight: "90vh"}}
          >
            <ModalBody 
              className="text-center" 
              style={{fontFamily: "Comfortaa, sans-serif"}}
            >
              <h4>
                What just happened?
                <i 
                  className="fa fa-times text-danger pull-right"
                  onClick={this.toggleInfoModal}
                  style={{cursor: "pointer"}}
                />
              </h4>
              
              <hr/>
              <div className="text-center" >
                 <p>
                 You typed "<span className="text-primary">{response.userValue}</span>".
                </p>
                <i className="fa fa-arrow-down text-primary" />

                { !response.phrasesCount &&
                  <p>Congratulations, {name ? name: "Chet"} just learned their first thing ever!</p>
                }
              
                { !response.matchedTo &&
                  <p>
                    {name ? name: "Chet"} scanned "
                      <span className="text-primary">{response.userValue}</span>
                    " against {response.phrasesCount} known phrases and found an exact match.
                  </p>
                }
                
                { response.matchedTo && !!response.phrasesCount &&
                <div>
                  <p>
                  {name ? name: "Chet"} has never seen this phrase before so it was sliced into {response.slices.length} different variations and each one scanned against {response.phrasesCount} uknown phrases to find the closest match of "
                  <span className="text-primary">{response.matched}</span>
                  "
                  { !response.matchedTo &&
                  <span>.</span> }
                  { response.matchedTo &&
                  <span>
                    <span> </span>in "<span className="text-primary">{response.matchedTo}</span>".
                  </span>
                }
                </p>
                </div>
                }
                
                  <i className="fa fa-arrow-down text-primary" />
                  <p>
                    {name ? name: "Chet"} responded with "<span className="text-primary">{response.term}</span>" out of {response.responseChoiceCount} possible response
                    {response.responseChoiceCount !== 1 && <span>s</span>}.
                  </p>

                </div>
                
                <hr />
                  <div> Match Strength: <span>{response.strength}%</span>
                 <Progress animated color={response.strength === 100 ? "success" : "primary"} value={response.strength} />
                  
                  </div>
                
                <br/>

                { response.slices.length > 0 && 
                  <div 
                    style={{color: "gray", cursor: "pointer"}} 
                    className={showSlices ? "text-warning" : ""}
                    onClick={this.toggleShowSlices}
                  >
                    <div>
                      <i
                        className={`fa fa-pie-chart fa-2x ${showSlices && "text-warning"}`}
                      />
                    </div>
                  
                  {showSlices ? "hide" : "show"} slices
                
                  </div>
                }

                
                {showSlices && 

                  <div className="slices">
                    <hr />
                    { response.slices && response.slices.map(slice => { 
                        if (response.matched === slice) {
                          return (
                            <h5 className="text-success">{slice}<i className="fa fa-check " style={{paddingLeft: 10 + "px"}}/></h5>
                          )
                        } else {
                          return (
                            <p>{slice}</p>
                          )
                        }
                      }) 
                    } 
                  </div>
                }
            </ModalBody>
        </Modal>
			</div>
		)
	}
}
