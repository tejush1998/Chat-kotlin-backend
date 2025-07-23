import { client, PutCommand } from '../aws-config.js'

export const createUser = async ({ id, email, username }) => {
  const params = {
    TableName: 'user',
    Item: {
      id,
      email,
      username,
      conversations: []
    }
  }

  await client.send(new PutCommand(params))
  return { message: 'User created', id }
}
