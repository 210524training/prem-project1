import React from 'react';
import './Footer.css';

const Footer: React.FC<unknown> = (props) => {
	return (
	<footer className="bg-secondary text-center text-lg-start m-2">
  	<div className="text-center p-3 footer">
			© 2020 Copyright:
			<div className="text-dark">Tuition Reimbursement Management Systems</div>
  	</div>
	</footer>
	);
}

export default Footer;