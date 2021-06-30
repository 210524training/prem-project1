import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import User from '../models/user';
import docClient from '../connection/dataConnection';
import { UserNotFoundError } from '../error/errors';

export class UserDAO {
  constructor(
    private dynamo = docClient,
  ) {}

  async addUser(item: User): Promise<boolean> {
    const params: DocumentClient.PutItemInput = {
      TableName: 'userTable',
      Item: item,
    };
    try {
      await this.dynamo.put(params).promise();
      return true;
    } catch(err) {
      console.log('Failed to add user');
      return false;
    }
  }

  async findByUsername(username: string): Promise<User> {
    const params: DocumentClient.GetItemInput = {
      TableName: 'userTable',
      Key: {
        username,
      },
      ProjectionExpression: '#user, #pass, #r, #em, #f, #av, #pend',
      ExpressionAttributeNames: {
        '#user': 'username',
        '#pass': 'password',
        '#r': 'role',
        '#em': 'email',
        '#f': 'formId',
        '#av': 'availableAmount',
        '#pend': 'pendingAmount',
      },
    };
    const data = await this.dynamo.get(params).promise();
    if(!data) {
      throw new UserNotFoundError();
    }
    return data.Item as User;
  }

  async update(user: User): Promise<boolean> {
    const params: DocumentClient.UpdateItemInput = {
      TableName: 'userTable',
      Key: {
        username: user.username,
      },
      UpdateExpression: 'SET availableAmount = :av, pendingAmount = :pend',
      ExpressionAttributeValues: {
        ':av': user.availableAmount,
        ':pend': user.pendingAmount,
      },
    };
    try {
      await this.dynamo.update(params).promise();
      return true;
    } catch(error) {
      console.log('Something went wrong when updating your account');
      return false;
    }
  }

  async delete(user: string): Promise<boolean> {
    const params: DocumentClient.DeleteItemInput = {
      TableName: 'userTable',
      Key: {
        user,
      },
    };
    try {
      await this.dynamo.delete(params).promise();
      return true;
    } catch(error) {
      console.log('Something went wrong when deleting your account');
      return false;
    }
  }
}

export default new UserDAO();
