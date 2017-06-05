import React from 'react';
import { Modal, ModalBody } from 'reactstrap';
import SocialCircle from './SocialCircle';

const networks = ["google", "facebook", "twitter", "github"];

export default ({toggleLoginModal, showLoginModal, offline, handleLogin}) => 
	<div>
		<Modal 
			isOpen={showLoginModal} 
			toggle={toggleLoginModal}
		>
			<ModalBody style={{marginBottom: 30 + "px"}}>
				<i 
					className="fa fa-times text-danger pull-right"
					onClick={toggleLoginModal}
					style={{cursor: "pointer"}}
				/>
				{ offline && 
				<div style={{padding: 5 + "px"}} className="text-center">
					<br />
					<p>Sorry, but you cannot log in while you are offline.</p>
				</div>	
				}
				
				{ !offline && 
					<div className="text-center">
						<br />
						<h4>Sign in with</h4>
						{networks.map(network => (
							<SocialCircle network={network} click={handleLogin} />
						))}
					</div>
				}
			</ModalBody>
    </Modal>
  </div>
