import {
  GetCommand,
  PutCommand,
  BatchGetCommand,
  ScanCommand,
  UpdateCommand,
  BatchWriteCommand,
  QueryCommand,
  DeleteCommand
} from '@aws-sdk/lib-dynamodb'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'

const client = new DynamoDBClient({ region: 'ap-south-1' })

export {
  client,
  PutCommand,
  BatchGetCommand,
  ScanCommand,
  BatchWriteCommand,
  GetCommand,
  QueryCommand,
  UpdateCommand,
  DeleteCommand
}
