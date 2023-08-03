const parseRequest = event =>
    event.body === undefined ? {} : JSON.parse(event.body);

const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT',
    'Access-Control-Allow-Headers': 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
};

const success = body => ({
    statusCode: 200,
    headers,
    body: JSON.stringify(body),
});

const error = (message, statusCode = 500) => ({
    statusCode,
    headers,
    body: JSON.stringify({ message }),
});

export { parseRequest, success, error };