const AWS = require('aws-sdk');
const stepFunctions = new AWS.StepFunctions();

exports.handler = async (event) => {
  try {
    const order = JSON.parse(event.body);  // Parsing incoming order data

    const params = {
      stateMachineArn: process.env.STATE_MACHINE_ARN,  // Step Function ARN from environment variables
      input: JSON.stringify(order)  // Input the order details into Step Functions
    };

    const result = await stepFunctions.startExecution(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Order processing started', executionArn: result.executionArn })
    };
  } catch (error) {
    console.error("Error starting Step Function execution", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to start order processing', error: error.message })
    };
  }
};
