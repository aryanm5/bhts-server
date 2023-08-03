import { get, update } from '../services/dynamodb.js';
import { parseRequest, success, error } from '../helpers/general.js';
import uuid from 'short-uuid';

export const handler = async evt => {
    let req = parseRequest(evt);

    // check API password
    if (req.pass !== process.env.PASS) {
        return error('Incorrect API password.', 401);
    }

    // input validation
    if (req.transaction === undefined) { return error('Please include a transaction.', 400); }

    // get user to check password
    let user;
    try {
        user = await get(req.user.username);
    } catch (err) {
        console.error(`ERROR while getting user: ${err.name}: ${err.message}`);
        return error('Login failed.');
    }

    // check if username exists
    if (user === undefined) {
        return error('That username does not exist.', 400);
    }

    // check if passwords match
    if (req.user.password !== user.password) {
        return error('Incorrect password.', 401);
    }

    // generade unique transaction ID
    const transactionId = uuid.generate();

    // generate transaction timestamp
    const timestamp = (new Date()).toISOString();

    // add transaction to array
    user.transactions.push({
        id: transactionId,
        timestamp,
        amount: req.transaction.amount,
        purchase: req.transaction.purchase,
    });

    // update transactions in database
    let newUser;
    try {
        newUser = await update(req.user.username, {
            transactions: user.transactions,
        });
    } catch (err) {
        console.error(`ERROR while updating user: ${err.name}: ${err.message}`);
        return error('Update transactions failed.');
    }

    return success({ user: newUser });
};