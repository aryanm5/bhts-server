import { get, update } from '../services/dynamodb.js';
import { parseRequest, success, error } from '../helpers/general.js';

export const handler = async evt => {
    let req = parseRequest(evt);

    // check API password
    if (req.pass !== process.env.PASS) {
        return error('Incorrect API password.', 401);
    }

    // input validation
    if (req.user.firstName === undefined || req.user.firstName.length === 0) { return error('please include a firstName.', 400); }
    if (req.user.lastName === undefined || req.user.lastName.length === 0) { return error('please include a lastName.', 400); }

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

    // update name in database
    let newUser;
    try {
        newUser = await update(req.user.username, {
            firstName: req.user.firstName,
            lastName: req.user.lastName,
        });
    } catch (err) {
        console.error(`ERROR while updating user: ${err.name}: ${err.message}`);
        return error('Update name failed.');
    }

    return success({ user: newUser });
};