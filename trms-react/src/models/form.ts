// export type EventType = 'Course' | 'Seminar' | 'Certification Prep' | 'Certification' | 'Tech Training' | 'Other';
// export type FormStatus = 'Employee' | 'Super' | 'Head' | 'Coordinator' | 'Approved';
// export type Approval = 'Pending' | 'Super' | 'Head' | 'Coordinator' | 'Rejected';

export default interface Form {
    formId: string,
    username: string,
    name: string,
    email: string,
    submissionDate: string,
    eventDate: string,
    time: string,
    location: string,
    description: string,
    cost: number,
    gradingFormat: string,
    finalGrade: string | '',
    gradeCutoff: string,
    gradeSatisfaction: string | '',
    urgency: boolean,
    eventType: string,
    attached: File | null,
    formStatus: string,
    approvedBy: string,
    comment: string,
}