export type EventType = 'Course' | 'Seminar' | 'Certification Prep' | 'Certification' | 'Tech Training' | 'Other';
export type FormStatus = 'To Employee' | 'To Super' | 'To Head' | 'To Coordinator' | 'Approved';
export type Approval = 'Pending' | 'Super' | 'Head' | 'Coordinator' | 'Rejected';

export default interface Form {
    formId: string,
    username: string,
    name: string,
    email: string,
    submissionDate: Date,
    eventDate: Date,
    time: Date,
    location: string,
    description: string,
    cost: number,
    gradingFormat: 'Score' | 'Presentation',
    finalGrade: string | undefined,
    gradeCutoff: string,
    gradeSatisfaction: boolean | undefined,
    urgency: boolean,
    eventType: EventType,
    attached: File | undefined,
    formStatus: FormStatus,
    approvedBy: Approval,
}