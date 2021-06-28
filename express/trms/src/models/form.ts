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

// eslint-disable-next-line max-len
// export type EventType = 'Course' | 'Seminar' | 'Certification Prep' | 'Certification' | 'Tech Training' | 'Other';
// export type FormStatus = 'Employee' | 'Supervisor' | 'Head' | 'Coordinator' | 'Approved';
// export type Approval = 'Pending' | 'Super' | 'Head' | 'Coordinator' | 'Rejected';

export default class Reimbursement {
  constructor(
		public formId: string,
		public username: string,
		public name: string,
		public email: string,
		public submissionDate: string,
		public eventDate: string,
		public time: string,
		public location: string,
		public description: string,
		public cost: number,
		public gradingFormat: string,
		public finalGrade: string | '',
		public gradeCutoff: string,
		public gradeSatisfaction: string | '',
		public urgency: boolean,
		public eventType: string,
		public attached: File | null,
		public formStatus: string,
		public approvedBy: string,
		public comment: string,
  ) {}
}
