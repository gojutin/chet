import React, { Component } from 'react';
 
import { Input, Button, Modal, ModalBody, Col, Row, TabContent, TabPane, Nav } from 'reactstrap';
import ColorIcon from './ColorIcon';
import generateName from 'sillyname';

// components
import SettingsTab from './SettingsTab';
import Milestones from './Milestones';
import UserSettings from './UserSettings';

export default class SettingsModal extends Component {

	state = {
		babyChetName: "",
		activeTab: "1",
		sleepMode: false,
		progress: 0,
		progressDone: false,
	}

	componentDidMount() {
		this.setState({
			babyChetName: this.props.profile.babyChetName
		})
	}

	sillyname = () => {
		const babyChetName = generateName();
		this.setState({
			babyChetName,
		}, () => {
			this.handleUpdateSettings();
		})
	}

	componentWillUnMount() {
		if (this.props.profile.uid) {
			this.props.updateSettings(this.props.profile.uid, {enteredPin: false});
		}
		this.setState({
			activeTab: "1",
		})
	}

	handleChange = (e) => {
		this.setState({
			babyChetName: e.target.value,
		}, () => {
			this.handleUpdateSettings();
		})
	}


	handleBabyChetMode = () => {
		const { profile } = this.props;
		const  { babyChetMode, babyChetPhrasesId } = profile;
		return new Promise ((resolve, reject) => {
			this.props.toggleBabyChetMode( babyChetMode, babyChetPhrasesId )
			this.props.toggleSettingsModal();
			resolve();
		})
	}

	// 1 second delay after typing before it saves to the database
	handleUpdateSettings = (color) => {
		const { profile, updateSettings } = this.props;
		let timeoutId;
		clearTimeout(timeoutId);
		const { babyChetName } = this.state;
		if (color) {
			updateSettings(profile.uid, {babyChetName, babyChetColor: color});
		} else {
			let babyChetColor = color ? color : profile.babyChetColor;
			updateSettings(profile.uid, {babyChetName, babyChetColor});
		}		
	}

	toggle = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
		if (this.state.activeTab === "2") {
			this.props.updateSettings(this.props.profile.uid, {enteredPin: false})
		} 
		if (tab === "3") {
			this.setState({
				progress: 0,
				progressDone: false,
			}, () => {

				for (let i = 0; i < this.props.profile.growthPercentage; i++ ) {
					setTimeout(() => {
						this.setState(prevState => ({
							progress: i,
						}), () => {
							if ((this.state.progress + 2) > this.props.profile.growthPercentage ) {
								setTimeout(() => {
									this.setState({
										progressDone: true,
									})
								}, 200)
							}
						})
					}, 100)
				}
			})
		}
  }

	handleLogout = () => {
		this.props.logout();
		this.props.toggleSettingsModal();
	}

	render() {
		const { babyChetName, activeTab } = this.state;
		const { babyChetPhrases, offline, deleteUserAccount, show, toggleSettingsModal, profile } = this.props;
// 		const colors = [
//     '#5D5A5A',
//     '#706D97',
//     '#BD8FDB',
//     '#C1E787',
//     '#DADE63',
//     '#E7A163',
// ];
// const colors2 = [
//     '#F2B701',
//     '#DC0030',
//     '#7C378A',
//     '#3465AA',
//     '#09A275',
// ];
// const colors3 = [
//     '#0C2949',
//     '#42235C',
//     '#B7B748',
//     '#962F72',
//     '#63705E',
// ];
		const colors = [
			"#FF5722","#9C27B0", "#3F51B5", "#4CAF50", "#FFC107"	 
		];
		const colors2 = [
			"#E91E63","#03A9F4","#009688", "#CDDC39", "#FFEB3B",  "#FF9800"
		]

		const colors3 = [
		"#00BCD4", "#795548", "#9E9E9E", "#607D8B", "#8BC34A",
		]

		const colorChoice = () => {
			switch(profile.phase.level) {
				case 1:
					return colors;
				case 2:
					return [...colors,...colors2];
				case 3:
					return [...colors,...colors2, ...colors3];
				default:
					return [...colors,...colors2, ...colors3];
			}
		}


		const colorIcons = colorChoice().map(color => 
			<ColorIcon 
				key={color}
				color={color}
				dbColor={profile.babyChetColor}
				handleUpdateSettings={() => this.handleUpdateSettings(color)}
			/>
		)

		return (
			<div style={{display: "inline"}}>
				{ profile.uid && 
				<Modal 
					isOpen={show} 
					className="text-center modal-shadow" 
					toggle={toggleSettingsModal} 
				>
					<ModalBody 
						style={{
							fontFamily: "Comfortaa, monospace", 
							maxHeight: 80 + "vh"
						}}
						className="scroll"
					>
						<i 
							className={`fa pull-right fa-times text-danger`}
							style={{
								cursor: "pointer",
								fontSize: 1.3 + "em"
							}}
							onClick={toggleSettingsModal}
						/>

						  <Nav tabs style={{ cursor: "pointer"}}>
	
                <SettingsTab 
                  toggleTab={this.toggle}
                  tabNumber="1"
                  activeTab={activeTab}
                >
                  <i className="fa fa-cog fa-2x" />
                </SettingsTab>
								
								<SettingsTab
									toggleTab={this.toggle}
                  tabNumber="2"
                  activeTab={activeTab}
								>
								<div>
								{ offline 
									? <img
										src={profile.photo}
										alt="Profile pic"
										height={34}
										style={{
											borderRadius: 50 + "%",
											margin: 0,
										}}
									/>
									: <i className="fa fa-user-circle-o fa-2x" />
								}
								</div>
								</SettingsTab>	
								{ profile.phase &&
									<SettingsTab 
										toggleTab={this.toggle}
										tabNumber="3"
										activeTab={activeTab}
									>
										<i className="fa fa-info-circle fa-2x" />
									</SettingsTab>
								} 
            </Nav>
						
						
						<TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
					<div>
						<p style={{marginTop: 15 + "px"}}>My chatbot's name
							{ profile.allowEditProfile &&
									<i 											
										className="fa fa-random text-warning" 
										style={{cursor: "pointer", paddingLeft: 10 + "px"}} 
										onClick={this.sillyname}
									/> 
							}

						</p>
							{ !profile.allowEditProfile && 
									<h4 style={{color: profile.babyChetColor}}> {babyChetName} </h4>
							}

							{ profile.allowEditProfile && 
									<div>
										<Row>

											<label style={{display: "none"}}>Your chatbots name</label>

											<Input 
												type="text" 
												value={babyChetName} 
												onChange={this.handleChange} 
												style={{ 
													fontSize: 1.5 + "em", 
													color: profile.babyChetColor, 
													margin: "0px 20px",
												}} 
											/>

										</Row>
										<br />
										<p>My chatbot's color</p>
										<Col xs={12} md={{size: 10, offset: 1}} >
											{colorIcons}
										</Col>
									</div>
							}
							<hr />
						
							<Row>
								
							 {  profile.allowChet && 
								<Col xs={{size: 10, offset: 1}} >
								<div style={{cursor: "pointer"}}>
								<Button
									block
									size="lg"
									style={{
										cursor: "pointer", 
										fontSize: 1.2 + "em", 
										fontFamily: "Comfortaa, sans-serif",
										borderRadius: 30 + "px",
										border: "1px solid gray",
										color: "gray"
									}}
									onClick={this.handleBabyChetMode}
								
								>
									Switch to { !profile.babyChetMode ? "my chatbot" : "Chet"}
								</Button>
									</div>									
								</Col>
								}
							</Row>
						</div>
						
						</TabPane>
					</TabContent>
					<TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="2">
								<UserSettings
									updateSettings={this.props.updateSettings}
									profile={profile}
									phrases={babyChetPhrases}
									handleLogout={this.handleLogout}
									deleteUserAccount={deleteUserAccount}
									wipeBabyChetsMind={this.props.wipeBabyChetsMind}
									toggleBabyChetMode={this.props.toggleBabyChetMode}
									activeTab={this.state.activeTab}
								/>								
						</TabPane>
					</TabContent>
					<TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="3">
							{ profile.phase &&
								<Milestones
									profile={profile}
									progress={this.state.progress}
									done={this.state.progressDone}
								/>
							}

							</TabPane>
					</TabContent>
				</ModalBody>
			</Modal>
			}
		</div>
		)
	}
}