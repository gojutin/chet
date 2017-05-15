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
			}}
      className={animatedClass}
    >
			<div style={{ paddingTop: 8 + "px" }}>
				<Row className="text-center">


					<Col xs={{ size: 2 }} md={{ size: 1, offset: 3 }} id="moon">
						<FooterIcon
							type="moon-o"
							condition={nightMode}
							onClick={toggleNightMode}
						/>
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
						{userInfo &&
							<i
								className={`fa fa-child fa-2x`}
								onClick={() => handleBabyChet()}
								style={{ color: babyChetMode ? color : "gray", cursor: "pointer" }}
							/>
						}
					</Col>
					<Col xs={2} md={1}>
						{ babyChetMode &&
							<SettingsModal 
								handleSubmit={handleSaveSettings} 
								dbColor={color} 
								dbName={name} 
								values={values}
								conversations={conversations}
								handleWipeBabyChetsMind={handleWipeBabyChetsMind}
							/>
						}
					</Col>
					<Col xs={2} md={1}>
						{ thisConversation &&
							thisConversation.exchanges &&
							thisConversation.exchanges.length > 0 &&

							<FooterIcon
								type="tasks"
								condition={showConversation}
								onClick={toggleConversation}
							/>
						}
					</Col>
					<Col xs={2} md={1}>
						<HelpModal />
					</Col>
				</Row>
			</div>

		</div>
	)
}