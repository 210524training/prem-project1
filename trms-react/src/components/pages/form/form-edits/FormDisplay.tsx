import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Form from "../../../../models/form";
import User from "../../../../models/user";
import { getByUsername, getFormsByStatus } from "../../../../remote/trms.api";

type Props = {
  currentUser: User | undefined,
  setCurrentForm : Dispatch<SetStateAction<Form | undefined>>,
}

const FormDisplay: React.FC<Props> = ({currentUser, setCurrentForm}) => {

  const [formData, setFormData] = useState<Form[]>([])

  const history = useHistory();

  useEffect(() => {
    (async function addToTable(): Promise<void> {
      if(currentUser?.role === 'Employee'){
        const getForms = await getByUsername(currentUser.username);
        console.log(getForms);
        setFormData(getForms);
      } else {
        const getForms = await getFormsByStatus(currentUser?.role);
        console.log(getForms);
        setFormData(getForms);
      }
    })();
  },[]);

  const handleOnClick = (form: any): void => {
    setCurrentForm(form);
    history.push(`/current-form/${form.formId}`);
  }

  const table = formData.map((item: Form, index) => {
    return (
      <tr key={index} onClick={() => handleOnClick(item)}>
        <td>{item.urgency ? 'Yes' : 'No'}</td>
        <td>{item.formId}</td>
        <td>{item.submissionDate}</td>
        <td>{item.eventDate}</td>
        <td>{item.time}</td>
        <td>{item.location}</td>
        <td>{item.gradingFormat}</td>
        <td>{item.gradeCutoff}</td>
        <td>{item.finalGrade}</td>
        <td>{item.gradeSatisfaction}</td>
        <td>{item.eventType}</td>
        <td>{item.cost}</td>
        <td>{item.description}</td>
        <td>{item.approvedBy}</td>
      </tr>
    )
  })

  return (
    <div className="mt-5">
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Urgent</th>
            <th scope="col">Form ID</th>
            <th scope="col">Submission Date</th>
            <th scope="col">Event Date</th>
            <th scope="col">Time</th>
            <th scope="col">Location</th>
            <th scope="col">Grading Format</th>
            <th scope="col">Grade Cutoff</th>
            <th scope="col">Final Grade</th>
            <th scope="col">Grade Satisfaction</th>
            <th scope="col">Event Type</th>
            <th scope="col">Cost</th>
            <th scope="col">Description</th>
            <th scope="col">Approval Status</th>
          </tr>
        </thead>
        <tbody>
          {table}
        </tbody>
      </table>
    </div>
  );
}

export default FormDisplay;