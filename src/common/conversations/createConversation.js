import { client, PutCommand, UpdateCommand } from '../aws-config.js'
import { v4 as uuidv4 } from 'uuid'

export const createConversation = async ({ messages, participants }) => {
  const conversationId = uuidv4()
  const timestamp = new Date().toISOString()

  const formattedMessages = messages.map((msg) => ({
    ...msg,
    timestamp: msg.timestamp || timestamp
  }))

  const params = {
    TableName: 'conversation',
    Item: {
      id: conversationId,
      messages: formattedMessages,
      participants
    }
  }

  await client.send(new PutCommand(params))

  for (const userId of participants) {
    const updateParams = {
      TableName: 'user',
      Key: { id: userId },
      UpdateExpression:
        'SET conversations = list_append(if_not_exists(conversations, :empty_list), :newConv)',
      ExpressionAttributeValues: {
        ':newConv': [conversationId],
        ':empty_list': []
      }
    }

    await client.send(new UpdateCommand(updateParams))
  }

  return { id: conversationId }
}
