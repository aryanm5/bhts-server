# CapitalOne Black & Hispanic Tech Summit

Aryan Mittal and Kelechukwu Nwaiwu

## API Structure

Endpoints:
| Endpoint | Type | Description |
| --- | --- | --- |
| ```ping``` | ```POST``` | Returns the input |
| ```createUser``` | ```POST``` | Create a user. Requires ```username```, ```password```, ```firstName```, ```lastName``` |
| ```login``` | ```POST``` | Login as a user. Requires ```username```, ```password```. Returns all users' data. |
| ```updateIncome``` | ```POST``` | Update a user's total income. Requires ```username```, ```password```, ```income``` |
| ```updateName``` | ```POST``` | Update a user's first and last name. Requires ```username```, ```password```, ```firstName```, ```lastName``` |
| ```addTransaction``` | ```POST``` | Add a user's purchase. Requires ```username```, ```password```, ```transaction``` |

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