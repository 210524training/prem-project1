import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import Form from '../models/form';
import docClient from '../connection/dataConnection';
import log from '../log';

export class ReimbDAO {
  constructor(
        private dynamo = docClient,
  ) {}

  async addForm(item: Form): Promise<boolean> {
    const params: DocumentClient.PutItemInput = {
      TableName: 'formTable',
      Item: item,
      ReturnConsumedCapacity: 'TOTAL',
      ConditionExpression: 'formId <> :formId',
      ExpressionAttributeValues: {
        ':formId': item.formId,
      },
    };
    try {
      await this.dynamo.put(params).promise();
      return true;
    } catch(error) {
      log.debug(error);
      console.log('Failed to add form');
      return false;
    }
  }

  async getById(formId: string): Promise<Form | undefined> {
    const params: DocumentClient.GetItemInput = {
      TableName: 'formTable',
      Key: {
        formId,
      },
    };
    const result = await this.dynamo.get(params).promise();
    return result.Item as Form;
  }

  async getByUsername(username: string): Promise<Form[]> {
    const params: DocumentClient.ScanInput = {
      TableName: 'formTable',
      FilterExpression: 'username = :u',
      ExpressionAttributeValues: {
        ':u': username,
      },
    };
    try {
      const result = await this.dynamo.scan(params).promise();
      return result.Items as Form[];
    } catch(error) {
      log.debug(error);
      return [];
    }
  }

  async getFormsByStatus(formStatus: string): Promise<Form[]> {
    console.log(formStatus);
    const params: DocumentClient.ScanInput = {
      TableName: 'formTable',
      FilterExpression: '#s = :s',
      ExpressionAttributeNames: {
        '#s': 'formStatus',
      },
      ExpressionAttributeValues: {
        ':s': formStatus,
      },
    };
    try {
      const result = await this.dynamo.scan(params).promise();
      return result.Items as Form[];
    } catch(error) {
      log.debug(error);
      return [];
    }
  }

  async getAll(): Promise<Form[]> {
    const params: DocumentClient.ScanInput = {
      TableName: 'formTable',
      ProjectionExpression: 'formId',
    };
    const result = await this.dynamo.scan(params).promise();
    if(result.Items) {
      return result.Items as Form[];
    }
    return [];
  }

  async update(form: Form): Promise<boolean> {
    const params: DocumentClient.PutItemInput = {
      TableName: 'formTable',
      Item: {
        formId: form.formId,
        username: form.username,
        name: form.name,
        email: form.email,
        submissionDate: form.submissionDate,
        eventDate: form.eventDate,
        time: form.time,
        location: form.location,
        description: form.description,
        cost: form.cost,
        gradingFormat: form.gradingFormat,
        finalGrade: form.finalGrade,
        gradeCutoff: form.gradeCutoff,
        gradeSatisfaction: form.gradeSatisfaction,
        urgency: form.urgency,
        eventType: form.eventType,
        attached: form.attached,
        formStatus: form.formStatus,
        approvedBy: form.approvedBy,
        comment: form.comment,
      },
    };
    try {
      await this.dynamo.put(params).promise();
      return true;
    } catch(error) {
      console.log('Something went wrong updating the form');
      return false;
    }
  }

  async delete(formId: string): Promise<void> {
    const params: DocumentClient.DeleteItemInput = {
      TableName: 'formTable',
      Key: {
        formId,
      },
    };
    try {
      await this.dynamo.delete(params).promise();
    } catch(error) {
      log.debug(error);
      console.log('Something went wrong deleting the form');
    }
  }
}

export default new ReimbDAO();
