const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  try {
    const { productId, quantity } = event;  // Getting product details from Step Functions input

    const params = {
      TableName: process.env.INVENTORY_TABLE,
      Key: { productId }
    };

    const result = await dynamoDB.get(params).promise();

    if (result.Item && result.Item.stock >= quantity) {
      return { status: 'VALID', productId, quantity };  // Proceed with order processing
    } else {
      throw new Error('Out of stock');
    }
  } catch (error) {
    console.error("Error validating order", error);
    throw new Error('Order validation failed');
  }
};
