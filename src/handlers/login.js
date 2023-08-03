import { get, scan } from '../services/dynamodb.js';
import { parseRequest, success, error } from '../helpers/general.js';

export const handler = async evt => {
    let req = parseRequest(evt);

    // check API password
    if (req.pass !== process.env.PASS) {
        return error('Incorrect API password.', 401);
    }

    // input validation
    if (req.user.username.length === 0) { return error('Please enter a username to login.', 400); }
    if (req.user.password.length === 0) { return error('Please enter a password to login.', 400); }

    // get user data from username
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