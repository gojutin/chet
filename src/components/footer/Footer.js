import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import FooterIcon from './FooterIcon';
import SettingsModal from './settings/SettingsModal';
import HelpModal from './help/HelpModal';
import LoginButton from './LoginButton';

export default class Footer extends Component {

	state = {
		showHelpModal: false,
		showSettingsModal: false,
		activeHelpTab: "1",
		dropDownOpen: false,
	}


	toggleDropDown = () => {
		this.setState(prevState => ({
			dropDownOpen: !prevState.dropDownOpen
		}));
	}

	toggleHelpModal = () => {
		this.setState(prevState => ({
			showHelpModal: !prevState.showHelpModal
		}), () => {
			if (!this.state.showModal) {
				this.setState({
					activeHelpTab: "1",
				})
			}
		})
	}

	toggleSettingsModal = () => {
		this.setState(prevState => ({
			showSettingsModal: !prevState.showSettingsModal
		}));
		if (this.props.profile.id) {
			this.props.updateSettings(this.props.profile.id, {enteredPin: false})
		}
		
	}

	toggleHelpTabs = (tab) => {
		if (this.state.activeTab !== tab) {
			this.setState({
				activeHelpTab: tab
			});
		}
	}


	render() {
		const {
			handleNightMode, nightMode,
			login, logout, deleteUserAccount,
			toggleChat, showChat, online, getInitialStats,
			handleBabyChet, toggleBabyChetMode,
			babyChetPhrases, profile, fetchData,
		} = this.props;

		const { showHelpModal, activeHelpTab } = this.state;

		return (
			<div
				style={{
					position: "fixed",
					bottom: 0,
					height: 55 + "px",
					width: 100 + "%",
					padding: 10 + "px",
					color: nightMode ? "black" : "white",
				}}
				className={nightMode ? "bg-black" : "bg-white"}
			>
				<div style={{ paddingTop: 8 + "px" }}>
					<Row className="text-center">

						<Col
							xs={{ size: 3, offset: 0 }}
							md={{ size: 1, offset: 4 }}
						>
							{!profile.uid &&
								<LoginButton
									online={online}
									profile={profile}
									login={login}
									fetchData={fetchData}
									handleBabyChet={handleBabyChet}
									toggleBabyChetMode={toggleBabyChetMode}
									loggingIn={profile.loggingIn}
									babyChetPhrases={babyChetPhrases}
									getInitialStats={getInitialStats}
								/>
							}
							{ profile.uid &&
							<i className={`fa fa-2x fa-cog ${this.state.showSettingsModal ? "text-warning" : ""}`}
								onClick={this.toggleSettingsModal} style={{ cursor: "pointer", color: "gray" }} />
							}
							
							
							{ this.state.showSettingsModal &&

								<SettingsModal
									profile={profile}
									online={online}
									babyChetPhrases={babyChetPhrases}
									toggleBabyChetMode={this.props.toggleBabyChetMode}
									wipeBabyChetsMind={this.props.wipeBabyChetsMind}
									show={this.state.showSettingsModal}
									toggleSettingsModal={this.toggleSettingsModal}
									logout={logout}
									deleteUserAccount={deleteUserAccount}
									updateSettings={this.props.updateSettings}
								/>
							}
						</Col>
						<Col xs={3} md={1}>
							<FooterIcon
								type="tasks"
								condition={showChat}
								onClick={toggleChat}
							/>
						</Col>

						<Col xs={3} md={1} id="google">
							<FooterIcon
								type="moon-o"
								condition={nightMode}
								onClick={() => handleNightMode(nightMode)}
							/>
						</Col>

						<Col xs={3} md={1}>
							<FooterIcon
								type="question-circle-o"
								condition={showHelpModal}
								onClick={this.toggleHelpModal}
							/>
						
							{ showHelpModal &&
								<HelpModal
									showHelpModal={showHelpModal}
									toggleHelpModal={this.toggleHelpModal}
									activeHelpTab={activeHelpTab}
									toggleHelpTabs={this.toggleHelpTabs}
								/>
							}

						</Col>
					</Row>
				</div>
			</div>
		);
	}
}

