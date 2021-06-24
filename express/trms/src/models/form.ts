/* eslint-disable no-tabs */
// form id
// name
// email
// date
// time
// location
// description
// cost
// grading format
// event type

export type EventType = 'Course' | 'Seminar' | 'Certification Prep' | 'Certification' | 'Tech Training' | 'Other';
export type FormStatus = 'Employee' | 'Super' | 'Head' | 'Coordinator' | 'Approved';
export type Approval = 'Pending' | 'Super' | 'Head' | 'Coordinator' | 'Rejected';

export default class Reimbursement {
  constructor(
		public formId: string,
		public username: string,
		public name: string,
		public email: string,
		public submissionDate: Date,
		public eventDate: Date,
		public time: Date,
		public location: string,
		public description: string,
		public cost: number,
		public gradingFormat: 'Score' | 'Presentation',
		public finalGrade: string | undefined,
		public gradeCutoff: string,
		public gradeSatisfaction: boolean | undefined,
		public urgency: boolean,
		public eventType: EventType,
		public attached: File | undefined,
		public formStatus: FormStatus,
		public approvedBy: Approval,
  ) {}
}
