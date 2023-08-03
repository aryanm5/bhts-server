# CapitalOne Black & Hispanic Tech Summit

Aryan Mittal and Kelechukwu Nwaiwu

## API Structure

Endpoints:
| Endpoint | Type | Description | Requires
| --- | --- | --- | --- |
| ```ping``` | ```POST``` | Returns the input. |
| ```createUser``` | ```POST``` | Create a user. Returns all users' data. | ```username```, ```password```, ```firstName```, ```lastName``` |
| ```login``` | ```POST``` | Login as a user. Also works to refresh user data. Returns all users' data. | ```username```, ```password``` |
| ```updateIncome``` | ```POST``` | Update a user's total income. | ```username```, ```password```, ```income``` |
| ```updateName``` | ```POST``` | Update a user's first and last name. | ```username```, ```password```, ```firstName```, ```lastName``` |
| ```addTransaction``` | ```POST``` | Add a user's purchase. | ```username```, ```password```, ```transaction``` |

## Database Structure

User row:
```
{
    username: S,
    password: S,
    firstName: S,
    lastName: S,
    income: N,
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