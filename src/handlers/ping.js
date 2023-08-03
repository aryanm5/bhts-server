import { parseRequest, success } from '../helpers/general.js';

export const handler = async evt => {
    let req = parseRequest(evt);

    return success({ input: req });
};