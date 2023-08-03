import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { PutCommand, BatchGetCommand, UpdateCommand, GetCommand, DeleteCommand, ScanCommand, DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import sliceIntoChunks from '../helpers/sliceIntoChunks.js';

const docClient = DynamoDBDocumentClient.from(new DynamoDBClient({}));

const table = process.env.STAGE === 'prod' ? 'bhts-users' : 'bhts-dev-users';

const put = async info => {
    const command = new PutCommand({
        TableName: table,
        Item: info,
        ConditionExpression: 'attribute_not_exists(username)',
    });

    await docClient.send(command);
    return info;
};

const update = async (username, info) => {
    let expressionAttributeNames = {};
    let expressionAttributeValues = { ':username': username };
    let updateExpression = 'set ';
    Object.keys(info).forEach(key => {
        if (info[key] !== undefined) {
            expressionAttributeNames['#' + key] = key;
            updateExpression += `#${key} = :${key}, `;
            expressionAttributeValues[':' + key] = info[key];
        }
    });
    updateExpression = updateExpression.slice(0, -2);

    const command = new UpdateCommand({
        TableName: table,
        Key: {
            username,
        },
        ConditionExpression: 'username = :username',
        ExpressionAttributeNames: expressionAttributeNames,
        UpdateExpression: updateExpression,
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: 'ALL_NEW',
    });

    return (await docClient.send(command)).Attributes;
};

const get = async username => {
    const command = new GetCommand({
        TableName: table,
        Key: {
            username,
        }
    });

    return (await docClient.send(command)).Item;
};

const batchGet = async usernames => {
    if (usernames.length === 0) { //batchGet throws error for empty array
        return [];
    }

    const chunked = sliceIntoChunks(usernames, 100);
    const queries = [];

    for (let i = 0; i < chunked.length; ++i) {
        const command = new BatchGetCommand({
            RequestItems: {
                [table]: {
                    Keys: chunked[i].map(username => ({ username }))
                }
            }
        });

        queries.push(docClient.send(command));
    }

    const results = (await Promise.all(queries)).map(query => query.Responses[table]).flat();

    return results;
};

const deleteItem = async username => {
    const command = new DeleteCommand({
        TableName: table,
        Key: {
            username,
        }
    });

    await docClient.send(command);
};

const scan = async username => {
    const command = new ScanCommand({
        TableName: table,
    });

    const scanData = (await docClient.send(command)).Items;

    return scanData.map(item => {
        if (item.username !== username) {
            delete item.password;
        }
        
        return item;
    });
};

export { put, update, get, batchGet, deleteItem, scan };