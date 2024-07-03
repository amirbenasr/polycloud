import AWS from "aws-sdk";

AWS.config.update({
  region: "YOUR_AWS_REGION",
  accessKeyId: "YOUR_ACCESS_KEY_ID",
  secretAccessKey: "YOUR_SECRET_ACCESS_KEY",
});

const dynamodb = new AWS.DynamoDB.DocumentClient();

export interface Document {
  id?: string;
  [key: string]: any;
}

const createDocument = async (
  tableName: string,
  data: Document
): Promise<Document> => {
  const params = {
    TableName: tableName,
    Item: data,
  };
  await dynamodb.put(params).promise();
  return data;
};

const readDocument = async (
  tableName: string,
  id: string
): Promise<Document> => {
  const params = {
    TableName: tableName,
    Key: { id },
  };
  const result = await dynamodb.get(params).promise();
  if (result.Item) {
    return result.Item;
  } else {
    throw new Error("Item not found");
  }
};

export { createDocument, readDocument };
