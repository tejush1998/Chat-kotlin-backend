import { client, GetCommand } from '../aws-config.js'

export const getConversation = async (id) => {
  const params = {
    TableName: 'conversation',
    Key: { id }
  }

  const { Item } = await client.send(new GetCommand(params))
  return Item
}
