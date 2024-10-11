const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  try {
    const { productId, quantity, orderId } = event;

    const params = {
      TableName: process.env.INVENTORY_TABLE,
      Key: { productId },
      UpdateExpression: 'set stock = stock - :q',
      ExpressionAttributeValues: {
        ':q': quantity
      }
    };

    await dynamoDB.update(params).promise();

    return { status: 'INVENTORY_UPDATED', orderId, productId, quantity };
  } catch (error) {
    console.error("Error updating inventory", error);
    throw new Error('Inventory update failed');
  }
};
