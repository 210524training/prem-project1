import React, { ChangeEvent, FormEvent, useState } from "react";
import { useHistory } from "react-router-dom";
import Form from "../../../../models/form";
import User from "../../../../models/user";
import { deleteForm, getUserByUsername, updateForm, updateUser } from "../../../../remote/trms.api";

type Props = {
  currentForm: Form | undefined;
  currentUser: User | undefined;
}

const FormEdits: React.FC<Props> = ({currentForm, currentUser}) => {

	// let user = {username: '', password: '', email: '', role: 'Employee', forms: [], availableAmount: 1000, pendingAmount: 0};
	// if(currentForm){
	// 	user = getUserByUsername(currentForm.username);
	// }
	// console.log(user);

  const [finalGrade, setFinalGrade] = useState<string>(currentForm?.finalGrade || '');
  const [gradeSatisfaction, setGradeSatisfaction] = useState<string>('');
  const [formStatus, setFormStatus] = useState<string>(currentForm?.formStatus || '');
  const [approvedBy, setApprovedBy] = useState<string>(currentForm?.approvedBy || '');
	const [comment, setComment] = useState<string>(currentForm?.comment || '');
	const [pendingAmount, setPendingAmount] = useState<number>(currentUser?.pendingAmount || 0);
	const [availableAmount, setAvailableAmount] = useState<number>(currentUser?.availableAmount || 0);
	const [cost, setCost] = useState<number>(currentForm?.cost || 0);

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

	const handleCostChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newCost = Number(e.target.value);
		if(newCost < cost) {
			setPendingAmount(pendingAmount - (cost - newCost));
			setAvailableAmount(availableAmount + (cost - newCost));
		} else if(newCost > Number(cost)) {
			setPendingAmount(pendingAmount + (newCost - cost));
			setAvailableAmount(availableAmount - (newCost - cost));
		}
		setCost(newCost);
	}

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
					if(finalGrade ===""){
						setFormStatus("Co");
						setApprovedBy("Awaiting Grade");
					} else {
						setApprovedBy("Approved");
						setFormStatus("Approved");
				}
			}
		} else {
			setPendingAmount(pendingAmount - cost);
			setAvailableAmount(availableAmount + cost);
			setApprovedBy("Rejected");
			setFormStatus("Rejected");
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
		return awardTotal;
	}

	const calculateAmount = (max: number): number => {
		let currentFunds;
		if(currentUser) {
			currentFunds = currentUser?.availableAmount - max;
			if(currentFunds < max) {
				return currentUser?.availableAmount;
			}
		}
		return max;
	}

	const handleDeleteForm = async (form: Form | undefined) => {
		let userUpdate;
		let pend;
		let available;
		if(currentUser) {
			pend = Number(currentUser.pendingAmount) - cost;
			available = Number(currentUser.availableAmount) + cost;
			console.log(currentUser);
			userUpdate = {
			username: currentUser?.username,
			password: currentUser?.password,
			role: currentUser?.role,
			email: currentUser?.email,
			forms: currentUser?.forms,
			availableAmount: available,
			pendingAmount: pend,
		}
	}

		await updateUser(userUpdate);

		await deleteForm(form);
		history.push('/user/forms');
	}

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
			cost,
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

		let userUpdate = {
			username: currentUser?.username,
			password: currentUser?.password,
			role: currentUser?.role,
			email: currentUser?.email,
			forms: currentUser?.forms,
			availableAmount,
			pendingAmount,
		}
		console.log(availableAmount, pendingAmount);

    await updateForm(updated);
		await updateUser(userUpdate);
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
										<label htmlFor="cost">Pending Amount</label>
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
								<div className="col-md-12">
									<br></br>
									<button type="button" className="btn btn-danger btn-send pt-2 btn-block container" value="Delete Form"
										onClick={() => handleDeleteForm(currentForm)}>Delete Request</button>
								</div>
							</>
						) : currentUser?.role ==='Supervisor' || 'Head' || 'Co' ? (
							<>
								<label htmlFor="final-grade">Change Amount If Needed</label>
								<input type="number" className="form-control" placeholder="Change Cost" onChange={handleCostChange} />
								<br></br>
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