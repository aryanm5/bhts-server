# CapitalOne Black & Hispanic Tech Summit

**Competitive Savings App Backend**

Aryan Mittal and Kelechukwu Nwaiwu

## API Structure
API is hosted at ```https://api.mittaldev.com/bhts-dev/*endpoint*```

An API passcode is required for all endpoints.

Endpoints:
| Endpoint | Type | Description | Requires |
| --- | --- | --- | --- |
| ```ping``` | ```POST``` | Returns the input given. | - |
| ```createUser``` | ```POST``` | Creates a user. Returns all users' data. | ```username```<br />```password```<br />```firstName```<br />```lastName``` |
| ```login``` | ```POST``` | Login as a user. Also works to refresh user data. Returns all users' data. | ```username```<br />```password``` |
| ```updateBudget``` | ```POST``` | Updates a user's total budget. Returns updated user. | ```username```<br />```password```<br />```budget``` |
| ```updateName``` | ```POST``` | Updates a user's first and last name. Returns updated user. | ```username```<br />```password```<br />```firstName```<br />```lastName``` |
| ```addTransaction``` | ```POST``` | Adds a user's purchase. Returns updated user. | ```username```<br />```password```<br />```transaction``` |
| ~~```deleteTransaction```~~ | ```POST``` | Delete a user's purchase. | ```username```<br />```password```<br />```transactionId``` |

## Sample API Requests

createUser:
```
{
    "pass": "*API PASS*",
    "user": {
        "username": "...",
        "password": "...",
        "firstName": "...",
        "lastName": "..."
    }
}
```

addTransaction:
```
{
    "pass": "*API PASS*",
    "user": {
        "username": "...",
        "password": "..."
    },
    "transaction": {
        "amount": 5.35, // Numeric
        "purchase": "..."
    }
}
```

## Database Structure

User:
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