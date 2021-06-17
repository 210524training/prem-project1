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
export type FormStatus = 'To Employee' | 'To Super' | 'To Head' | 'To Coordinator' | 'Approved';
export type Approval = 'Pending' | 'Super' | 'Head' | 'Coordinator';

export default class Reimbursement {
  constructor(
		public formId = Math.floor(Math.random() * 900000) + 100000,
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
		public gradeSatisfaction: boolean | undefined,
		public urgency: boolean,
		public eventType: EventType,
		public attached: {} | undefined,
		public formStatus: FormStatus,
		public approvedBy: Approval,
  ) {}
}