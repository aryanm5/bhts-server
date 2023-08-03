# CapitalOne Black & Hispanic Tech Summit

Aryan Mittal and Kelechukwu Nwaiwu

## API Structure

Endpoints:
| Endpoint | Type | Description | Requires |
| --- | --- | --- | --- |
| ```ping``` | ```POST``` | Returns the input given. |
| ```createUser``` | ```POST``` | Creates a user. Returns all users' data. | ```username```<br />```password```<br />```firstName```<br />```lastName``` |
| ```login``` | ```POST``` | Login as a user. Also works to refresh user data. Returns all users' data. | ```username```<br />```password``` |
| ```updateBudget``` | ```POST``` | Update a user's total budget. Returns updated user. | ```username```<br />```password```<br />```budget``` |
| ```updateName``` | ```POST``` | Update a user's first and last name. Returns updated user. | ```username```<br />```password```<br />```firstName```<br />```lastName``` |
| ```addTransaction``` | ```POST``` | Add a user's purchase. Returns updated user. | ```username```<br />```password```<br />```transaction``` |
~~| ```deleteTransaction``` | ```POST``` | Delete a user's purchase. | ```username```<br />```password```<br />```transactionId``` |~~

## Sample Requests

createUser:
```
{
    "pass": "*API PASS*",
    "user": {
        "username": "*...*",
        "password": "*...*",
        "firstName": "*...*",
        "lastName": "*...*"
    }
}
```

## Database Structure

User row:
```
{
    username: S,
    password: S,
    firstName: S,
    lastName: S,
    budget: N,
    transactions: [Transaction]
}
```

Transaction:
```
{
    id: S,
    timestamp: S,
    amount: N,
    purchase: S
}
```