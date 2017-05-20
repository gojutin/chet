import React, { Component } from 'react';
 
import { Input, Button, Modal, ModalBody, Col, Row, Progress, TabContent, TabPane, Nav } from 'reactstrap';
import ColorIcon from './ColorIcon';
import generateName from 'sillyname';

// components
import SettingsTab from './SettingsTab';

export default class SettingsModal extends Component {

	state = {
		showModal: false,
		name: "",
		color: "",
		showConfirmWipe: false,
		showValues: false,
		stats:{},
		activeTab: "1",
		sleepMode: false,
	}

	componentDidMount() {
		const { dbName, dbColor } = this.props;
		this.handleSleepMode()
		.then(() => {
			this.setState(prevState => ({
				name: dbName ? dbName : "",
				color: dbColor ? dbColor : "",
			}))
		})
	}

	sillyname = () => {
		const name = generateName();
		this.setState({
			name,
		}, () => {
			this.handleSubmit();
		})
	}

	toggleConfirmWipe = () => {
		this.setState(prevState => ({
      	showConfirmWipe: !prevState.showConfirmWipe
    	}))
	}

	handleWipe = () => {
		this.setState(prevState => ({
      	showConfirmWipe: !prevState.showConfirmWipe,
				name: this.props.dbName,
				color: this.props.dbColor,
    }));
		this.props.handleWipeBabyChetsMind();
	}

	toggleModal = () => {
		const { dbColor, dbName, babyChetMode } = this.props;
		if (babyChetMode) {
			this.setState(prevState => ({
				showModal: !prevState.showModal,
				name: dbName ? dbName : "",
				color: dbColor ? dbColor : "",
			}))
		} else if (!this.state.sleepMode && !babyChetMode) {
			this.setState(prevState => ({
				showModal: !prevState.showModal
			}))	
			this.handleSleepMode();
		} else {
			this.setState(prevState => ({
				showModal: !prevState.showModal
			}))	
		}  
  }

	handleChange = (e) => {
		this.setState({
			name: e.target.value,
		}, () => {
			this.handleSubmit();
		})
	}

	handleSleepMode = () => {
		return new Promise ((resolve, reject) => {
				if (this.props.babyChetMode) {
					this.setState({
							showModal: false,
					});
				}
				this.props.handleBabyChet();

				resolve();
		})
		
	}

	handleColor = (color) => {
		this.setState({
			color,
		}, () => {
			this.handleSubmit();
		})
	}

	// 1 second delay after typing before it saves to the database
	handleSubmit = () => {
		let timeoutId;
		const { name, color } = this.state;
		clearTimeout(timeoutId);
    timeoutId = setTimeout(() => { 
      this.props.handleSubmit(name, color);
			console.log("saved")
    }, 1000);
		
	}

	  toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

	removeDuplicates = arr => {
		let i,
				len=arr.length,
				out=[],
				obj={};

		for (i=0;i<len;i++) {
			obj[arr[i]]=0;
		}
		for (i in obj) {
			out.push(i);
		}
		return out;
}

	render() {

		const { showModal, name, showConfirmWipe, color, activeTab } = this.state;
		const { dbName, values, conversations, babyChetMode } = this.props;
		const colors = [
			"#f44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5", "#2196F3", "#03A9F4", "#00BCD4", 
			"#009688", "#4CAF50", "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800", "#FF5722", 
			"#795548", "#9E9E9E", "#424242", "#607D8B",
		];


		const colorIcons = colors.map(color => 
			<ColorIcon 
				key={color}
				color={color}
				selectedColor={this.state.color}
				dbColor={this.props.dbColor}
				onClick={this.handleColor}
			/>
		)

		// WORD AND STATS LOGIC... MOVE THIS SOMEWHERE ELSE??

		let wordsArr = [];
		let wordCount;
		values.map(value => wordsArr.push(value.term));
		const splitWords = wordsArr.join(" ").split(" ");
		const dupsRemoved = this.removeDuplicates(splitWords);

		if (dupsRemoved.length < 2 && dupsRemoved[0] === "") {
			wordCount = 0;
		} else {
			wordCount = dupsRemoved.length;
		}

		const percentage = ((wordCount / 20000)*100).toFixed(1)

		const phase = () => {
			if ( wordCount < 500 ) {
				return {
					phase: "baby",
					progress: 5,
					size: "",
				}
			} else if (wordCount < 2000) {
				return {
					phase: "toddler",
					size: "fa-2x",
				}
			} else if (wordCount < 3000) {
				return {
					phase: "kid",
					size: "fa-3x",
				}
			} else if (wordCount < 20000) {
				return {
					phase: "teenager",
					size: "fa-4x",
				}
			} else {
				return {
					phase: "all grown up",
					size: "fa-5x",
				}
			}
		}

		return (
			<div style={{display: "inline"}}>
				<i className={`fa fa-2x ${babyChetMode || showModal ? "text-warning fa-child": "fa-bed"}`} onClick={this.toggleModal} style={{ color: "gray", cursor: "pointer" }} />
				<Modal isOpen={showModal} className="text-center modal-shadow" toggle={this.toggleModal} >
					<ModalBody style={{fontFamily: "Comfortaa, monospace"}}>
						<i 
							className="fa fa-times text-danger pull-right" 
							style={{cursor: "pointer"}} 
							onClick={this.toggleModal}
						/>

								
						  <Nav tabs style={{ cursor: "pointer"}}>
	
                <SettingsTab 
                  toggleTab={this.toggle}
                  tabNumber="1"
                  activeTab={activeTab}
                >
                  <i className="fa fa-cog fa-2x" />
                </SettingsTab>
								{ babyChetMode &&
                <SettingsTab 
                  toggleTab={this.toggle}
                  tabNumber="2"
                  activeTab={activeTab}
                >
                  <i className="fa fa-info-circle fa-2x" />
                </SettingsTab>
								}					
            </Nav>
						
						
						<TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
									<br />
									
						{ babyChetMode &&
										<div>
						<h4 style={{marginTop: 15 + "px"}}>My chatbot's name:</h4>

								<Input 
									type="text" 
									value={name} 
									onChange={this.handleChange} 
									style={{ fontSize: 1.5 + "em", color,}} 
								/>

								<i 
									className="fa fa-random text-warning" 
									style={{cursor: "pointer", margin: 15 + "px"}} 
									onClick={this.sillyname}
								/>

						<br />
						<h4>My chatbot's color:</h4>
						<Col xs={12} md={{size: 10, offset: 1}} >
							{colorIcons}
						</Col>

						{ values.length > 0 &&
							<p 
								style={{
									marginTop: 15 + "px", 
									textDecoration: "underline",
									cursor: "pointer",
									padding: 5 + "px"
								}}
								className={`${!showConfirmWipe ? "text-danger" : ""}`}
								onClick={this.toggleConfirmWipe}
							>
								{!showConfirmWipe ? `Wipe my chatbot's mind` : `Nevermind` }
							</p>
						}
						
					
					<div style={{marginTop: 10 + "px"}}>
						{ showConfirmWipe &&
							<div>
								<p> Are you sure you want to wipe {dbName}'s mind? This action cannot be undone.</p>
								<Button 
									color="danger"
									onClick={this.handleWipe}
									style={{cursor: "pointer", marginBottom: 10 + "px"}}
								>
									Wipe my chatbot's mind
								</Button>
							</div>
						}
						</div>


						<Button
								size="lg"
								onClick={this.handleSleepMode}
								style={{ cursor: "pointer", width: 200 + "px", marginTop: 15 + "px"}}
								className="text-center"
							>
								Switch to Chet
						</Button>
							
							{/*<Button
								color="success"
								onClick={this.handleSubmit}
								style={{ cursor: "pointer", width: 150 + "px"}}
							>
								Save
						</Button>*/}	
						</div>
						}
						</TabPane>
					</TabContent>
					<TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="2">

							{ !!values.length &&
								<div >
									<br />
									<div style={{color}}>
											<i 
												className={`fa fa-child ${phase().size}`}
											/>
											<p>{phase().phase}</p>
									</div>
									<Row>
										<Col xs={2}>
											<p className="pull-right">baby</p>
										</Col>
										<Col xs={8}>
											<Progress 
												animated 
												color="success" 
												value={percentage} 
												style={{marginTop: 5 + "px"}}
											/>
										</Col>
										<Col xs={2}>
											<p className="pull-left">adult</p>
										</Col>
									</Row>
								</div>
							}
						<br />
						<Row>
							<Col xs={4} style={{borderRight: "1px solid lightgray"}}>
								<p>Words</p>
								<h4 className="text-primary">{wordCount}</h4>
							</Col>
							<Col xs={4} style={{borderRight: "1px solid lightgray"}}>
								<p>Phrases</p>
								<h4 className="text-primary">{values.length}</h4>
							</Col>
							<Col xs={4}>
								<p>Chats</p>
								<h4 className="text-primary">{conversations.length < 2 ? 0 : conversations.length - 1}</h4>
							</Col>
							</Row>
							<div>	
								<br />
										{/*<h4> Milestones:</h4>
										<Row style={{color: "lightgray", marginTop: 20 + "px"}}>
											<Col xs={6} className="pull-right">
											<div>
											<i className="fa fa-trophy fa-2x text-warning" />
											</div>
											<p>baby</p>
										</Col>
										<Col xs={6} style={{color: phase().phase === "toddler" ? "#ffbb33" : "lightgray"}} >
											<div>
												<i 
													className="fa fa-trophy fa-2x"
												/>
											</div>
											<p>toddler</p>
										</Col>
										</Row>
										<Row style={{color: "lightgray", marginTop: 20 + "px"}}>
										
										<Col xs={{size: 2, offset: 3}}>
											<div>
												<i className="fa fa-trophy fa-2x" />
											</div>
											<p>kiddo</p>
										</Col>
										<Col xs={2}>
											<div>
												<i className="fa fa-trophy fa-2x" />
											</div>
											<p>teen</p>
										</Col>
										<Col xs={2}>
											<div>
												<i className="fa fa-trophy fa-2x" />
											</div>
											<p>wadult</p>
										</Col>
									</Row>*/}
								</div>

							</TabPane>
					</TabContent>
						{/*{ values.map(({term}) => 
							<p>{term}</p>
							)
						}*/}

					</ModalBody>
				</Modal>
		</div>
		)
	}
}