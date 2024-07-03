import {
  createDocument as createFirestoreDocument,
  readDocument as readFirestoreDocument,
  Document as FirestoreDocument,
} from "./database/firestore";
import {
  createDocument as createDynamoDBDocument,
  readDocument as readDynamoDBDocument,
  Document as DynamoDBDocument,
} from "./database/dynamodb";
import { signInWithGoogle } from "./auth/googleAuth";
import { signInWithCognito } from "./auth/cognitoAuth";

type Document = FirestoreDocument | DynamoDBDocument;
const backend = process.env.BACKEND || "firestore"; // Default to Firestore

const createDocument = (collectionName: string, data: any) => {
  if (backend === "firestore") {
    return createFirestoreDocument(collectionName, data);
  } else if (backend === "dynamodb") {
    return createDynamoDBDocument(collectionName, data);
  } else {
    throw new Error("Unsupported backend");
  }
};

const readDocument = (collectionName: string, id: string) => {
  if (backend === "firestore") {
    return readFirestoreDocument(collectionName, id);
  } else if (backend === "dynamodb") {
    return readDynamoDBDocument(collectionName, id);
  } else {
    throw new Error("Unsupported backend");
  }
};

export { createDocument, readDocument, signInWithGoogle, signInWithCognito };
