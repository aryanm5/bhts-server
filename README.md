# CapitalOne Black & Hispanic Tech Summit

Aryan Mittal and Kelechukwu Nwaiwu

## API Structure

Endpoints:
| Endpoint | Type | Description | Requires
| --- | --- | --- | --- |
| ```ping``` | ```POST``` | Returns the input. |
| ```createUser``` | ```POST``` | Create a user. Returns all users' data. | ```username```<br />```password```<br />```firstName```<br />```lastName``` |
| ```login``` | ```POST``` | Login as a user. Also works to refresh user data. Returns all users' data. | ```username```<br />```password``` |
| ```updateBudget``` | ```POST``` | Update a user's total budget. | ```username```<br />```password```<br />```budget``` |
| ```updateName``` | ```POST``` | Update a user's first and last name. | ```username```<br />```password```<br />```firstName```<br />```lastName``` |
| ```addTransaction``` | ```POST``` | Add a user's purchase. | ```username```<br />```password```<br />```transaction``` |

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