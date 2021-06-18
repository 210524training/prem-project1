import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import log from '../log';
import Form from '../models/form';
import docClient from '../connection/dataConnection';

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

  async getFormsByStatus(formStatus: string): Promise<Form[]> {
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
    const result = await this.dynamo.scan(params).promise();
    if(result.Items) {
      return result.Items as Form[];
    }
    return [];
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
        form,
      },
      ConditionExpression: 'id = :id',
      ExpressionAttributeValues: {
        ':id': form.formId,
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

  async delete(id: string): Promise<boolean> {
    const params: DocumentClient.DeleteItemInput = {
      TableName: 'formTable',
      Key: {
        id,
      },
    };
    try {
      await this.dynamo.delete(params).promise();
      return true;
    } catch(error) {
      console.log('Something went wrong deleting the form');
      return false;
    }
  }
}

export default new ReimbDAO();
