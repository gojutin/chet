import React from 'react';
import { Row, Col } from 'reactstrap';
import FooterIcon from './FooterIcon';
import SettingsModal from './SettingsModal';
import HelpModal from './HelpModal';
import LoginButton from './LoginButton';


export default (props) => {

	const {
		animatedClass, 
		nightMode, toggleNightMode, 
		userInfo, login, logout, 
		toggleConversation, showConversation, thisConversation, 
		handleSaveSettings, 
		babyChetMode, handleBabyChet, handleWipeBabyChetsMind,
		values, conversations,
	} = props;

	const { name, color } = props.db;

	return (
		<div
			style={{
				position: "fixed",
				bottom: 0,
				height: 55 + "px",
				width: 100 + "%",
				padding: 5 + "px",
				color: animatedClass ? animatedClass : "white",
			}}
      className={animatedClass}
    >
			<div style={{ paddingTop: 8 + "px" }}>
				<Row className="text-center">

					<Col 
						xs={{ size: 2 }} 
						md={{ size: 1, offset: 4 }} 
						id="moon"
					>
						<FooterIcon
							type="moon-o"
							condition={nightMode}
							onClick={toggleNightMode}
						/>
					</Col>
					<Col xs={2} md={1}>
						<HelpModal />
					</Col>

				<Col xs={2} md={1} id="google">
					<LoginButton 
						userInfo={userInfo} 
						login={login}
						logout={logout}
						babyChetMode={babyChetMode}
						handleBabyChet={handleBabyChet}
					/>
				</Col>

					<Col xs={2} md={1}>
						{ userInfo &&
							<SettingsModal 
								handleSubmit={handleSaveSettings} 
								dbColor={color} 
								dbName={name} 
								values={values}
								conversations={conversations}
								babyChetMode={babyChetMode}
								handleBabyChet={handleBabyChet}
								handleWipeBabyChetsMind={handleWipeBabyChetsMind}
							/>
						}
					</Col>
					{/*<Col xs={2} md={1}>
						{ thisConversation &&
							thisConversation.exchanges &&
							thisConversation.exchanges.length > 0 &&

							<FooterIcon
								type="tasks"
								condition={showConversation}
								onClick={toggleConversation}
							/>
						}
					</Col>*/}
					
				</Row>
			</div>

		</div>
	)
}