## Test 1 — Productivity crash

*Fiat currency. Start from nothing. No taxes. The system starts **agrarian** i.e. everyone can self sustain*

### Status codes

> **R** = Resident (no status)  
> **U** = Unemployed  
> **E** = Entrepreneur  
> **W** = Employed (worker)  
> **X** = Deceased

## Variables

> Banking type: public  
> Monetary system: fiat  
> Entrepreneurial allowance: private competing firms  
> Initial tax rate: 0.0
>
> Other options: Every resident produces in their max capacity. Elder asks bank to create 100 tokens and distribute them to each.

## Round 1

*Every resident produces in their max capacity. Elder asks bank to create 100 tokens and distribute them to each.*

#### Phase 1 — Currency creation, payments and production

|       | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 | R10 |
|-------|----|----|----|----|----|----|----|----|----|-----|
| Output | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |
| Tokens | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 |
| Products | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |

#### Phase 2 — Price evaluation & trade

 > P<sub>unit</sub> = M/Q<sub>available</sub> = 100/10 = 10

 *Each residents will trade evenly with everyone else*

|       | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 | R10 |
|-------|----|----|----|----|----|----|----|----|----|-----|
| Output | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Tokens | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 |
| Products | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |

#### Phase 3 — Taxes and consumption

*Elder implements 0.1 tax rate but returns tokens back evenly -> no net change in token distribution. All will consume their single product.*

|       | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 | R10 |
|-------|----|----|----|----|----|----|----|----|----|-----|
| Output | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Tokens | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 |
| Products | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |

> Comment: Interestingly token value if calculated at this point would be 100/0. Hinting that the token value is bound to output value. Not considering real estate or future expectation value.

#### Final phase — Opportunity evaluation and resident status changes

*At this point the Elder enforces the law that prohibits self-employment and all work must be done via company structure (this would represent the state of modern citizen change of creating income, not agrarian system). At this stage one of the residents starts a company, where some are employed. His company production output will be 2 units/worker. 3 of the residents are employed by 5 tokens/round, rest will move in U status.*

|       | E1 | W2 | W3 | W4 | U5 | U6 | U7 | U8 | U9 | U10 |
|-------|----|----|----|----|----|----|----|----|----|-----|
| Output | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Tokens | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 |
| Products | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |


## Round 2

#### Phase 1 — Currency creation, payments and production

*Updated production output. No new currency is created. The only entrepreneur has no money to pay, so we must ad hoc introduce an external private bank, which can lend against the collateral (future production capacity) of the firm or individual.*

|       | E1 | W2 | W3 | W4 | U5 | U6 | U7 | U8 | U9 | U10 |
|-------|----|----|----|----|----|----|----|----|----|-----|
| Output | 2 | 2 | 2 | 2 | 0 | 0 | 0 | 0 | 0 | 0 |
| Tokens | -5 | 15 | 15 | 15 | 10 | 10 | 10 | 10 | 10 | 10 |
| Products | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |

> Private banks create money out of "nothing" as in modern economy they do Current total balance of the system is 105 tokens.

#### Phase 2 — Price evaluation & trade

 > P<sub>unit</sub> = M/Q<sub>available</sub> = 105/8 = 13.125 ~ 13

 *Since production halts, the inflation jumps to 130%. Only 3 workers can afford to buy product from their employer. Rest of the batch is moved to the firms storage.*

|       | E1 | W2 | W3 | W4 | U5 | U6 | U7 | U8 | U9 | U10 |
|-------|----|----|----|----|----|----|----|----|----|-----|
| Output | 3 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Tokens | -5 | 2 | 2 | 2 | 10 | 10 | 10 | 10 | 10 | 10 |
| Products | 0 | 1 | 1 | 1 | 0 | 0 | 0 | 0 | 0 | 0 |

#### Phase 3 — Taxes and consumption

*The tax rate was 0.1, and it will be distributed to keep the economy's only business alive and the entepreneur benefits to pay his private debt. Though the economy collapses anyway, since seven out of ten dies in hunger. Or even more likely the people will rise against the elder, decapitate him and put his head on the stick front of the village.*

|       | X1 | W2 | W3 | X4 | X5 | X6 | X7 | X8 | X9 | X10 |
|-------|----|----|----|----|----|----|----|----|----|-----|
| Output | 3 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Tokens | 0 | 2 | 2 | 2 | 9 | 9 | 9 | 9 | 9 | 9 |
| Products |-1 | 0 | 0 | 0 |-1 |-1 |-1 |-1 |-1 |-1 |