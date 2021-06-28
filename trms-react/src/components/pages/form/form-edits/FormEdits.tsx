import React, { ChangeEvent, FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import Form from "../../../../models/form";
import User from "../../../../models/user";
import { updateForm } from "../../../../remote/trms.api";

type Props = {
  currentForm: Form | undefined;
  currentUser: User | undefined;
}

const FormEdits: React.FC<Props> = ({currentForm, currentUser}) => {

  const [finalGrade, setFinalGrade] = useState<string>(currentForm?.finalGrade || '');
  const [gradeSatisfaction, setGradeSatisfaction] = useState<string>('');
  const [formStatus, setFormStatus] = useState<string>(currentForm?.formStatus || '');
  const [approvedBy, setApprovedBy] = useState<string>(currentForm?.approvedBy || '');
	const [comment, setComment] = useState<string>(currentForm?.comment || '');
	// const [eventDate, setEventDate] = useState<string>(currentForm?.eventDate || '');
	// const [time, setTime] = useState<string>(currentForm?.time || '');
	// const [location, setLocation] = useState<string>(currentForm?.location || '');
	// const [description, setDescription] = useState<string>(currentForm?.description || '');
	// const [cost, setCost] = useState<number>(currentForm?.cost || 0);
	// const [gradingFormat, setGradeFormat] = useState<string>(currentForm?.gradingFormat || '');
	// const [gradeCutoff, setGradeCutoff] = useState<string>(currentForm?.gradeCutoff || '');
	// const [eventType, setEventType] = useState<string>(currentForm?.eventType || '');

  const history = useHistory();

  if(!currentForm?.formId){
    return <h1>No Form Found</h1>
  }

  const hanldeFinalGradeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFinalGrade(e.target.value);
  };

  const handleGradeSatisfaction = (e: ChangeEvent<HTMLSelectElement>) => {
    setGradeSatisfaction(e.target.value);
  };

  const handleFormStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFormStatus(e.target.value);
  };

	const handleCommentChange = (e: ChangeEvent<HTMLInputElement>) => {
		setComment(e.target.value);
	};

  const handleApprovalChange = (role: string | undefined, status: string) => {
		if(status === 'Approved') {
			switch (role) {
				case "Employee":
					if(approvedBy === "Pending"){
						setFormStatus("Supervisor");
					} else if(approvedBy === "Supervisor"){
						setFormStatus("Head");
					} else if(approvedBy === "Head"){
						setFormStatus("Co");
					}
					break;
				case "Supervisor":
					if(approvedBy === "Head"){
						setFormStatus("Co");
					} else {
						setApprovedBy(role);
						setFormStatus("Head");
					}
					break;
				case "Head":
					setApprovedBy(role);
					setFormStatus("Co");
					break;
				case "Co":
					setApprovedBy("Approved");
					setFormStatus("Approved");
			}
		} else {
			setApprovedBy("Rejected");
			setFormStatus("Rejected");
		}
  };

  const handleFormUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

		console.log(approvedBy);
		console.log(formStatus);

		let updated = {
			formId: currentForm?.formId,
			username: currentForm?.username,
			name: currentForm?.name,
			email: currentForm?.email,
			submissionDate: currentForm?.submissionDate,
			eventDate: currentForm?.eventDate,
			time: currentForm?.time,
			location: currentForm?.location,
			description: currentForm?.description,
			cost: currentForm?.cost,
			gradingFormat: currentForm?.gradingFormat,
			finalGrade,
			gradeCutoff: currentForm?.gradeCutoff,
			gradeSatisfaction,
			urgency: currentForm?.urgency,
			eventType: currentForm?.eventType,
			attached: currentForm?.attached,
			formStatus,
			approvedBy,
			comment,
		}

    await updateForm(updated);
    history.push('/user/forms');
  }

  return (
    <>
      <div className="container">
				<div className=" text-center mt-5">
					<br></br>
					<br></br>
					<div className="container"><h1>New Tuition Reimbursement Form</h1></div>
				</div>
				<div className="row col-lg-7 mx-auto card mt-2 mx-auto p-4 bg-light card-body container">
					<form id="contact-form">
						<div className="controls">
							<div className="row">
								<div className="col-md-6">
									<div className="form-group">
										<label htmlFor="form_username">Username</label>
										<input id="username" type="text" name="username" className="form-control" value={currentForm.username} />
									</div>
								</div>
								<div className="col-md-6">
									<div className="form-group">
										<label htmlFor="name">Full Name</label>
										<input id="name" type="text" name="fullname" className="form-control" value={currentForm.name} />
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-md-6">
									<div className="form-group">
										<label htmlFor="email">Email</label>
										<input id="email" type="email" name="email" className="form-control" value={currentForm.email} />
									</div>
								</div>
								<div className="col-md-6">
									<div className="form-group">
										<label htmlFor="current-date">Current Date</label>
										<input id="current-date" type="date" name="fullname" className="form-control" value={currentForm.submissionDate} />
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-md-6">
									<div className="form-group">
										<label htmlFor="start-date">Start Date *</label>
										<input id="start-date" type="date" name="start-date" className="form-control" value={currentForm.eventDate} />
									</div>
								</div>
								<div className="col-md-6">
									<div className="form-group">
										<label htmlFor="time">Time</label>
										<input id="time" type="time" name="time" className="form-control" value={currentForm.time}/>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-md-6">
									<div className="form-group">
										<label htmlFor="location">Location</label>
										<input id="location" type="text" name="location" className="form-control" value={currentForm.location} />
									</div>
								</div>
								<div className="col-md-6">
									<div className="form-group">
										<label htmlFor="cost">Cost</label>
										<input id="cost" type="text" name="cost" className="form-control" value={currentForm.cost} />
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-md-6">
									<div className="form-group">
										<label htmlFor="grade-format">Grade Format</label>
										<input type="text" id="form_need" name="need" className="form-control" value={currentForm.gradingFormat} />
									</div>
								</div>
								<div className="col-md-6">
									<div className="form-group">
										<label htmlFor="grade-cutoff">Grade Needed to Pass</label>
										<input id="grade-cutoff" type="text" name="grade-cutoff" className="form-control" value={currentForm.gradeCutoff} />
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-md-6">
									<div className="form-group"> <label htmlFor="form_need">Event Eype</label>
										<input type="text" id="form_need" name="need" className="form-control" value={currentForm.eventType} />
									</div>
								</div>
								<div className="col-md-6">
									<div className="form-group">
										<label htmlFor="grade-format">Final Grade</label>
										<input type="text" id="form_need" name="need" className="form-control" value={currentForm.finalGrade} />
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col-md-12">
									<div className="form-group">
										<label htmlFor="form_message">Event Description</label>
										<input type="text" id="form_message" name="message" className="form-control" value={currentForm.description} />
									</div>
								</div>
								<div className="input-group">
									<div className="input-group-prepend container">
										<br></br>
									</div>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
			<div className="row col-lg-7 mx-auto card mt-2 mx-auto p-4 bg-light card-body container">
				<form onSubmit={handleFormUpdate}>
					<div className="container text-center"><h3>Select an Action</h3></div>
					{
						currentUser?.role ==='Employee' ? (
							<>
								<label htmlFor="final-grade">Final Grade *</label>
								<input type="text" className="form-control" placeholder="Final Grade" onChange={hanldeFinalGradeChange} />
								<div className="col-md-12">
									<br></br>
									<button type="button" className="btn btn-success btn-send pt-2 btn-block container" value="Approve Changes"
										onClick={() => handleApprovalChange(currentUser?.role, 'Approved')}>Approve Changes</button>
								</div>
							</>
						) : currentUser?.role ==='Supervisor' || 'Head' || 'Co' ? (
							<>
								<div className="form-group"> <label htmlFor="form_need">Select who to send to</label>
									<select id="form_need" name="need" className="form-control" onChange={handleFormStatusChange}>
										<option value="" selected disabled>--Send To--</option>
										<option value="Employee">Employee</option>
										<option value="Supervisor">Supervisor</option>
										<option value="Head">Department Head</option>
										<option value="Co">Benefits Coordinator</option>
									</select>
								</div>
								<div className="col-md-12">
									<br></br>
									<button type="button" className="btn btn-success btn-send pt-2 btn-block container" value="Approved" onClick={() => handleApprovalChange(currentUser?.role, 'Approved')}>Approve</button>
								</div>
								<div className="col-md-12">
									<br></br>
									<button type="button" className="btn btn-success btn-send pt-2 btn-block container" value="Reject" onClick={() => handleApprovalChange(currentUser?.role, 'Rejected')}>Reject</button>
								</div>
								<div className="form-group">
									<label htmlFor="form_comment">Comments</label>
									<input type="text" id="form_comment" name="comment" className="form-control" placeholder="comments"
										required data-error="Please enter a comment" onChange={handleCommentChange}/>
								</div>
							</>
						): ('')
					}
					<div className="col-md-12">
						<br></br>
						<input type="submit" className="btn btn-success btn-send pt-2 btn-block container" value="Update Form" />
					</div>
				</form>
			</div>
    </>
  );
}

export default FormEdits;