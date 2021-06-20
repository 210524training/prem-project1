import React, { ChangeEvent, useState } from 'react';

const TuitionFormPage: React.FC<unknown> = (props) => {

	const [username, setUsername] = useState<string>();
	const [name, setName] = useState<string>();
	const [email, setEmail] = useState<string>();
	const [eventDate, setEventDate] = useState<string>();
	const [time, setTime] = useState<string>();
	const [location, setLocation] = useState<string>();
	const [description, setDescription] = useState<string>();
	const [cost, setCost] = useState<string>();
	const [gradingFormat, setGradeFormat] = useState<string>();
	const [finalGrade, setFinalGrade] = useState<string>();
	const [gradeCutoff, setGradeCutoff] = useState<string>();
	const [eventType, setEventType] = useState<string>();
	const [attached, setAttached] = useState<{}>();

	const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
		setUsername(e.target.value);
	}

	const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	}

	const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	}

	const handleEventDateChange = (e: ChangeEvent<HTMLInputElement>) => {
		setEventDate(e.target.value);
	}

	const handleTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
		setTime(e.target.value);
	}

	const handleLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
		setLocation(e.target.value);
	}

	const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
		setDescription(e.target.value);
	}

	const handleCostChange = (e: ChangeEvent<HTMLInputElement>) => {
		setCost(e.target.value);
	}

	const handleGradeFormatChange = (e: ChangeEvent<HTMLInputElement>) => {
		setGradeFormat(e.target.value);
	}

	const handleFinalGrapeChange = (e: ChangeEvent<HTMLInputElement>) => {
		setFinalGrade(e.target.value);
	}

	const handleGradeCutoffChange = (e: ChangeEvent<HTMLInputElement>) => {
		setGradeCutoff(e.target.value);
	}

	const handleEventTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
		setEventType(e.target.value);
	}

	const handleAttachedChange = (e: ChangeEvent<HTMLInputElement>) => {
		setAttached(e.target.value);
	}

	return (
		<>

		</>
	);
}

export default TuitionFormPage;
