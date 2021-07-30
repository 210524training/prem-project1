# Tuition Reimbursement Management System
## TRMS Description
***Tuition Reimbursement Management System*** is a tuition reimbursement application that allows employees to request reimbursement for a veriety of educational events. These reimbursements are reviewed by each member of management to determine if the request is viable based on the employee's information, description of the event and previous awared reibursement amount (limit of $1000).

## Technologies Used

* [AWS DynamoDB](https://aws.amazon.com/dynamodb/?trk=ps_a134p000004f2afAAA&trkCampaign=acq_paid_search_brand&sc_channel=PS&sc_campaign=acquisition_US&sc_publisher=Google&sc_category=Database&sc_country=US&sc_geo=NAMER&sc_outcome=acq&sc_detail=aws%20dynamodb&sc_content=DynamoDB_e&sc_matchtype=e&sc_segment=488982705294&sc_medium=ACQ-P|PS-GO|Brand|Desktop|SU|Database|DynamoDB|US|EN|Text&s_kwcid=AL!4422!3!488982705294!e!!g!!aws%20dynamodb&ef_id=CjwKCAjwxo6IBhBKEiwAXSYBs1BQuE_vDFpw28nosGMsVWQBZw0OwMd5YsfkH3Hc-BuugNYsBfc79xoCWy0QAvD_BwE:G:s&s_kwcid=AL!4422!3!488982705294!e!!g!!aws%20dynamodb)
* [React](https://reactjs.org/)
* [Express](https://expressjs.com/)
* [Axios](https://axios-http.com/)
* [Bootstrap](https://getbootstrap.com/)
* [Typescript](https://www.typescriptlang.org/)

## Features

### Current Features
- User can login with access based on given role
- Employee can create/delete a reimbursement
- Direct Supervisor, Department Head, and Benefits Coordinator can view/approve/reject request
- Any manager can send requests down to any individual
- If someone approved the request and it is sent back dow, it should skip to the account that sent it back
- Once approved, if final grade was not entered, request will still be pending
- Reimbursement is calculated based on previous requests from that account every time a new request is made.

### Future features
- Managers can edit the requested reimbursement amount
- If the requested amount is changed, the employee is notified
- The employee can edit their request
- The system can update a user's pending/available reimbursement amount when a manager rejects the request
- Available reimbursement amout resets every year

## Getting Started

> Start off by cloning the repository to your local computer. Create a file you want to store the repository in and in Git Bash navigate to that directory. Then enter the below command:
  - `git clone https://github.com/210524training/prem-project1.git`

> Once you have cloned the repository, use the cd {directory} command to move into the src folder for the front-end of the application:
  - `cd {your-folder}/prem-project1/trms-react/src` (replace *'{your-folder}'* with the folder you saved the project in)

> From there, use the below command to install all the application's dependencies:
  - `npm install`

> Open another terminal and using the below command, move into the src folder in the back-end of the application:
  - `cd {your-folder}/prem-project1/express/trms/src`

> Once again, type `npm install` to install all dependencies for the application back-end.

## Usage

> Run the below command in the back-end terminal to start the back-end of the application:
  - `npm start`
 
> Run the below command in the front-end terminal to start the front-end of the application:
  - `npm start`

> Once the application is fully loaded, you will be greeting by the home page.

<img src="https://user-images.githubusercontent.com/84411139/127708962-f1c728b6-3759-4279-973c-9453b2d21de3.PNG" width="650" height="300" />

> On the top left, you can click on register to create an account, or click on login to access an existing account.

> To create a reimbursement, click on the *Create a New Form* tab to be directed to the reimbursement request form.

<img src="https://user-images.githubusercontent.com/84411139/127709173-91e7eee4-f70a-4ee4-9478-9400af0cbc01.PNG" width="650" height="300" />

> You can view all previous forms by clicking on the *My Forms* tab.

<img src="https://user-images.githubusercontent.com/84411139/127709216-b9c09b8f-a88a-4705-8492-19649f6a968c.PNG" width="650" height="300" />

## License

Distributed under the [MIT](./LICENSE) License. Click MIT for more information.
