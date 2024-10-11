const AWS = require('aws-sdk');
const s3 = new AWS.S3();

exports.handler = async (event) => {
  try {
    const { orderId, email, productId, quantity } = event;

    // Create a simple receipt as a JSON object
    const receipt = {
      orderId,
      email,
      productId,
      quantity,
      date: new Date().toISOString()
    };

    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: `receipts/${orderId}.json`,
      Body: JSON.stringify(receipt),
      ContentType: 'application/json'
    };

    await s3.putObject(params).promise();

    return { status: 'RECEIPT_GENERATED', orderId, receiptUrl: `s3://${process.env.S3_BUCKET_NAME}/receipts/${orderId}.json` };
  } catch (error) {
    console.error("Error generating receipt", error);
    throw new Error('Receipt generation failed');
  }
};
