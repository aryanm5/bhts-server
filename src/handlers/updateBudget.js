import { get, update } from '../services/dynamodb.js';
import { parseRequest, success, error } from '../helpers/general.js';

export const handler = async evt => {
    let req = parseRequest(evt);

    // check API password
    if (req.pass !== process.env.PASS) {
        return error('Incorrect API password.', 401);
    }

    // input validation
    if (req.user.budget === undefined) { return error('Please include an budget.', 400); }
    if (typeof req.user.budget !== 'number') { return error('Please make sure the budget is a number.', 400); }

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

    // update budget in database
    let newUser;
    try {
        newUser = await update(req.user.username, {
            budget: req.user.budget,
        });
    } catch (err) {
        console.error(`ERROR while updating user: ${err.name}: ${err.message}`);
        return error('Update budget failed.');
    }

    return success({ user: newUser });
};