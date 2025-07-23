import { client, UpdateCommand } from '../aws-config.js'

export const addMessageToConversation = async ({ conversationId, message }) => {
  if (!message.content || !message.sender_id || !message.type) {
    throw new Error('Missing required message fields: content, sender_id, or type')
  }

  const timestamp = message.timestamp || new Date().toISOString()

  const newMessage = {
    content: message.content,
    sender_id: message.sender_id,
    timestamp,
    type: message.type
  }

  const params = {
    TableName: 'conversation',
    Key: { id: conversationId },
    UpdateExpression: 'SET messages = list_append(if_not_exists(messages, :empty), :newMessage)',
    ExpressionAttributeValues: {
      ':newMessage': [newMessage],
      ':empty': []
    },
    ReturnValues: 'UPDATED_NEW'
  }

  const result = await client.send(new UpdateCommand(params))
  return result.Attributes
}
