import { parseRequest, success, error } from '../helpers/general.js';

export const handler = async evt => {
    let req = parseRequest(evt);

    // check password
    if (req.pass !== process.env.PASS) {
        return error('Incorrect password.', 401);
    }

    return success({ input: req });
};