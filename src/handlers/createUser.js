import { put, scan } from '../services/dynamodb.js';
import { parseRequest, success, error } from '../helpers/general.js';

export const handler = async evt => {
    let req = parseRequest(evt);

    // check API password
    if (req.pass !== process.env.PASS) {
        return error('Incorrect API password.', 401);
    }

    // input validation
    if (req.user.username === undefined || req.user.username.length < 3) { return error('username must be at least 3 characters.', 400); }

    if (req.user.password === undefined || req.user.password.length < 5) { return error('password must be at least 5 characters.', 400); }

    if (req.user.firstName === undefined || req.user.firstName.length === 0) { return error('please include a firstName.', 400); }

    if (req.user.lastName === undefined || req.user.lastName.length === 0) { return error('please include a lastName.', 400); }

    // Create user row in database
    try {
        await put({
            username: req.user.username,
            password: req.user.password,
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            budget: 0,
            transactions: [],
        });
    } catch (err) {
        console.error(`ERROR while creating user: ${err.name}: ${err.message}`);

        if (err.name === 'ConditionalCheckFailedException') {
            return error('That username is already in use.');
        }

        return error('createUser failed.');
    }

    // scan all user data
    let users;
    try {
        users = await scan(req.user.username);
    } catch (err) {
        console.error(`ERROR while scanning database: ${err.name}: ${err.message}`);
        return error('scan failed.');
    }

    return success({ users });
};