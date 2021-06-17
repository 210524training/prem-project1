import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import log from '../log';
import User from '../models/user';
import docClient from '../connection/dataConnection';

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

  async findByUsername(username: string): Promise<User | undefined> {
    const params: DocumentClient.GetItemInput = {
      TableName: 'userTable',
      Key: {
        username,
      },
      ProjectionExpression: '#user, #pass, #r, #em, #f',
      ExpressionAttributeNames: {
        '#user': 'username',
        '#pass': 'password',
        '#r': 'role',
        '#em': 'email',
        '#f': 'formId',
      },
    };
    const data = await this.dynamo.get(params).promise();
    const newUser = new User(
      data.Item?.username, data.Item?.password, data.Item?.role,
      data.Item?.email, data.Item?.formId,
    );
    return newUser;
  }

  async update(user: User): Promise<boolean> {
    const params: DocumentClient.PutItemInput = {
      TableName: 'userTable',
      Item: {
        user,
      },
      ConditionExpression: 'username = :u',
      ExpressionAttributeValues: {
        ':u': user.username,
      },
    };
    try {
      await this.dynamo.put(params).promise();
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
