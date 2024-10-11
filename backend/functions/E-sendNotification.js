const AWS = require('aws-sdk');
const sqs = new AWS.SQS();

exports.handler = async (event) => {
  try {
    const { orderId, email } = event;

    const messageBody = {
      orderId,
      email,
      message: 'Your order has been successfully processed!'
    };

    const params = {
      MessageBody: JSON.stringify(messageBody),
      QueueUrl: process.env.SQS_QUEUE_URL
    };

    await sqs.sendMessage(params).promise();

    return { status: 'NOTIFICATION_SENT', orderId, email };
  } catch (error) {
    console.error("Error sending notification", error);
    throw new Error('Notification failed');
  }
};
