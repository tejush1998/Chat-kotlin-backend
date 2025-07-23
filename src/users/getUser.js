import { client, GetCommand } from '../aws-config.js'

export const getUser = async (id) => {
  const params = {
    TableName: 'user',
    Key: { id }
  }

  const { Item } = await client.send(new GetCommand(params))
  return Item
}
