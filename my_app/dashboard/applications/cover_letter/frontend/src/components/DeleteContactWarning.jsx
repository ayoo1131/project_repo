//DeleteContactWarning.jsx
import { React } from 'react';
import { deleteContact } from './utils/personal_info/DeleteContact.js';

const DeleteContactWarning = ({
	setShowContactDeleteWarningCallback,
	setUserContactCallback, 
	setContactMessageCallback, 
	setDownloadMessageCallback}) =>{
	
	const handleCancel = () => {
		setShowContactDeleteWarningCallback(false);
	};

	const handleConfirmDelete = async (e) => {
                e.preventDefault();
                deleteContact();
                setUserContactCallback({name:'', email:'', phone:'', social:'', extra:''});
                setContactMessageCallback('Contact Deleted');
                setDownloadMessageCallback(null);
		setShowContactDeleteWarningCallback(false);
        };

	return(
		<div className='inactivity-warning-overlay'>
			<div className='inactivity-warning-content'>
				<h3 className='inactivity-warning-text'>Are you sure you want to delete your contact info?</h3>
				<button onClick={handleCancel}>Cancel</button>
				<button onClick={handleConfirmDelete} className="inactivity-warning-button">Delete</button>
			</div>
		</div>	
	);
};

export default DeleteContactWarning;
