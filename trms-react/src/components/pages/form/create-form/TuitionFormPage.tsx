import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { useHistory } from 'react-router-dom';
import User from '../../../../models/user';
import { sendNewForm } from '../../../../remote/trms.api';
import './TuitionFormPage.css';

type Props = {
	currentUser: User | undefined,
	setCurrentUser: Dispatch<SetStateAction<User | undefined>>
}

const TuitionFormPage: React.FC<Props> = ({currentUser, setCurrentUser}) => {

	const [username, setUsername] = useState<string>('');
	const [name, setName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [submissionDate, setSubmissionDate] = useState<string>('');
	const [eventDate, setEventDate] = useState<string>('');
	const [time, setTime] = useState<string>('');
	const [location, setLocation] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [cost, setCost] = useState<string>('');
	const [gradingFormat, setGradeFormat] = useState<string>('');
	const [gradeCutoff, setGradeCutoff] = useState<string>('');
	const [eventType, setEventType] = useState<string>('');
	const [attached, setAttached] = useState<File | string | null>(null);
	const [total, setTotal] = useState<number>(0);

	const history = useHistory();

	const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
		setUsername(e.target.value);
	};

	const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};

	const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	const handleSubmissionDateChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSubmissionDate(e.target.value);
	};

	const handleEventDateChange = (e: ChangeEvent<HTMLInputElement>) => {
		setEventDate(e.target.value);
	};

	const handleTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
		setTime(e.target.value);
	};

	const handleLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
		setLocation(e.target.value);
	};

	const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
		setDescription(e.target.value);
	};

	const handleCostChange = (e: ChangeEvent<HTMLInputElement>) => {
		setCost(e.target.value);
	};

	const handleGradeFormatChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setGradeFormat(e.target.value);
	};

	const handleGradeCutoffChange = (e: ChangeEvent<HTMLInputElement>) => {
		setGradeCutoff(e.target.value);
	};

	const handleEventTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setEventType(e.target.value);
	};

	const handleAttachedChange = (e: ChangeEvent<HTMLInputElement>) => {
		if(e.target.files){
			setAttached(e.target.files[0].name);
		}
	};

	const refundAmount = (cost: number, eventType: string): number => {
		let total = 0;
		switch(eventType) {
			case 'Course':
				total = cost * 0.8;
				break;
			case 'Seminar':
				total = cost * 0.6;
				break;
			case 'Certification Prep':
				total = cost * 0.75;
				break;
			case 'Certification':
				total = cost;
				break;
			case 'Tech Training':
				total = cost * 0.9;
				break;
			case 'Other':
				total = cost * 0.3;
				break;
		}
		const awardTotal = calculateAmount(total);
		setTotal(awardTotal);
		return awardTotal;
	}

	const calculateAmount = (max: number): number => {
		const tempCost = Number(cost);
		let currentFunds
		if(currentUser) {
			currentFunds = 1000 - tempCost;
			if(currentFunds < max) {
				return 1000;
			}
		}
		return max;
	}

	const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		await sendNewForm(
			null, username, name, email, submissionDate, eventDate, time, location, description,
			cost, gradingFormat, null, gradeCutoff, null, null, eventType,
			attached, null, null,
		);
		history.push('/');
	}

	return (
		<div className="container">
			<div className=" text-center mt-5">
				{/* <p>Reimbursement: {(() => refundAmount(Number(cost), eventType))()}</p> */}
				<br></br>
				<br></br>
				<h1>New Tuition Reimbursement Form</h1>
			</div>
			<div className="row col-lg-7 mx-auto card mt-2 mx-auto p-4 bg-light card-body container">
				<form id="contact-form" onSubmit={handleFormSubmit}>
					<div className="controls">
						<div className="row">
							<div className="col-md-6">
								<div className="form-group">
									<label htmlFor="form_username">Username *</label>
									<input id="username" type="text" name="username" className="form-control" placeholder="Please enter your username"
										required data-error="Username is required." onChange={handleUsernameChange} />
								</div>
							</div>
							<div className="col-md-6">
								<div className="form-group">
									<label htmlFor="name">Full Name *</label>
									<input id="name" type="text" name="fullname" className="form-control" placeholder="Please enter your full name"
										required data-error="Full Name is required." onChange={handleNameChange} />
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-md-6">
								<div className="form-group">
									<label htmlFor="email">Email *</label>
									<input id="email" type="email" name="email" className="form-control" placeholder="Please enter your email"
										required data-error="Valid email is required." onChange={handleEmailChange} />
								</div>
							</div>
							<div className="col-md-6">
								<div className="form-group">
									<label htmlFor="current-date">Current Date *</label>
									<input id="current-date" type="date" name="fullname" className="form-control" placeholder="Current Date"
										required data-error="Current is required." onChange={handleSubmissionDateChange} />
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-md-6">
								<div className="form-group">
									<label htmlFor="start-date">Start Date *</label>
									<input id="start-date" type="date" name="start-date" className="form-control" placeholder="Start Date"
										required data-error="Start Date is required." onChange={handleEventDateChange} />
								</div>
							</div>
							<div className="col-md-6">
								<div className="form-group">
									<label htmlFor="time">Time *</label>
									<input id="time" type="time" name="time" className="form-control" placeholder="Event Time"
										required data-error="Time is required." onChange={handleTimeChange} />
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-md-6">
								<div className="form-group">
									<label htmlFor="location">Location *</label>
									<input id="location" type="text" name="location" className="form-control" placeholder="Event Location"
										required data-error="Location is required." onChange={handleLocationChange} />
								</div>
							</div>
							<div className="col-md-6">
								<div className="form-group">
									<label htmlFor="cost">Cost *</label>
									<input id="cost" type="text" name="cost" className="form-control" placeholder="Cost"
										required data-error="Cost is required." onChange={handleCostChange} />
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-md-6">
								<div className="form-group">
									<label htmlFor="grade-format">Grade Format *</label>
									<select id="form_need" name="need" className="form-control" data-error="Please specify your need." onChange={handleGradeFormatChange}>
										<option value="" selected disabled>--Select Format--</option>
										<option value="Score">Score</option>
										<option value="Presentation">Presentation</option>
									</select>
								</div>
							</div>
							<div className="col-md-6">
								<div className="form-group">
									<label htmlFor="grade-cutoff">Grade Needed to Pass *</label>
									<input id="grade-cutoff" type="text" name="grade-cutoff" className="form-control" placeholder="Required Grade to Pass"
										required data-error="Valid grade is required." onChange={handleGradeCutoffChange} />
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-md-6">
								<div className="form-group"> <label htmlFor="form_need">Please specify the event type *</label>
									<select id="form_need" name="need" className="form-control" data-error="Please specify your need." onChange={handleEventTypeChange}>
										<option value="" selected disabled>--Event Type--</option>
										<option value="Course">Course</option>
										<option value="Seminar">Seminar</option>
										<option value="Certification Prep">Certification Prep</option>
										<option value="Certification">Certification</option>
										<option value="Tech Training">Tech Training</option>
										<option value="Other">Other</option>
									</select>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-md-12">
								<div className="form-group">
									<label htmlFor="form_message">Event Description *</label>
									<input type="text" id="form_message" name="message" className="form-control" placeholder="Write brief description."
										data-error="Please, leave us a message." onChange={handleDescriptionChange} />
								</div>
							</div>
							<div className="input-group">
  							<div className="input-group-prepend container">
									<br></br>
    							<label htmlFor="file-upload" className="p-3">Upload Files</label>
									<input type="file" className="custom-file-input" id="inputGroupFile01"
      							aria-describedby="inputGroupFileAddon01" multiple onChange={handleAttachedChange} />
  							</div>
							</div>
							<div className="col-md-12">
								<br></br>
								<input type="submit" className="btn btn-success btn-send pt-2 btn-block container" value="Send Form" />
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}

export default TuitionFormPage;
