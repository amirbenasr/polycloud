import AWS from "aws-sdk";
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "YOUR_USER_POOL_ID",
  ClientId: "YOUR_CLIENT_ID",
};

const userPool = new CognitoUserPool(poolData);

const signInWithCognito = async (
  username: string,
  password: string
): Promise<any> => {
  const authenticationDetails = new AuthenticationDetails({
    Username: username,
    Password: password,
  });

  const userData = {
    Username: username,
    Pool: userPool,
  };

  const cognitoUser = new CognitoUser(userData);

  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        resolve(result);
      },
      onFailure: (err) => {
        reject(new Error("Cognito sign-in failed: " + err.message));
      },
    });
  });
};

export { signInWithCognito };
