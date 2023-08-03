import { put, scan } from '../services/dynamodb.js';
import { parseRequest, success, error } from '../helpers/general.js';

export const handler = async evt => {
    let req = parseRequest(evt);

    // check password
    if (req.pass !== process.env.PASS) {
        return error('Incorrect password.', 401);
    }

    // input validation
    if (req.username.length < 3) { return error('username must be at least 3 characters.', 400); }

    if (req.password.length < 5) { return error('password must be at least 5 characters.', 400); }

    if (req.firstName.length === 0) { return error('please include a firstName.', 400); }

    if (req.lastName.length === 0) { return error('please include a lastName.', 400); }

    try {
        await put({
            username: req.username,
            password: req.password,
            firstName: req.firstName,
            lastName: req.lastName,
            income: 0,
            transactions: [],
        });
    } catch (err) {
        console.error(`ERROR while creating user: ${err.name}: ${err.message}`);
        return error('createUser failed.');
    }

    let users;
    try {
        users = await scan();
    } catch (err) {
        console.error(`ERROR while scanning database: ${err.name}: ${err.message}`);
        return error('scan failed.');
    }

    return success({ users });
};