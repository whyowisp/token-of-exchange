### Status codes

> **R** = Resident (no status)  
> **U** = Unemployed  
> **E** = Entrepreneur  
> **W** = Employed (worker)  
> **X** = Deceased

## Variables

> Banking type: public
> Monetary system: Fiat 
> Entrepreneurial allowance: private companies etc. 
> Initial tax factor: 0.1  
> Other options: 100 Tokens distributed evenly, Production without a firm is prohibited (modern economy). Consuming from personal batch is prohibited to enforce trade (as in simulation rules).


### Initial state

|       | Elder | Mint |
|-------|----|----|
| Balance | 0 | -100 |

|       | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 | R10 |
|-------|----|----|----|----|----|----|----|----|----|-----|
| Output | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Tokens | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 |
| Products | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |

---
---
**Copy the template below iteratively i.e. Round 1, Round 2, Round N... and fill the tables phase by phase following the rules and laws you have created**
---
---

## Round 1

#### Phase 1 — Opportunity evaluation and resident status changes

*Two of the residents find a way to increase production and start firms each. They both hire 2 residents. Production without firm is prohibited (modern economy) so this creates 4 unemployed. Consuming from personal batch is prohibited to enforce trade (as in simulation rules)*

|       | E1 | W2/E1 | W3/E1 | E4 | W5/E4 | W6/E4 | U7 | U8 | U9 | U10 |
|-------|----|----|----|----|----|----|----|----|----|-----|
| Output | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Tokens | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 | 10 |
| Products | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |

#### Phase 2 — Currency creation, payments and production

*E1 firm pays 4 tokens, E4 pays 3.*

|       | E1 | W2/E1 | W3/E1 | E4 | W5/E4 | W6/E4 | U7 | U8 | U9 | U10 |
|-------|----|----|----|----|----|----|----|----|----|-----|
| Output | 2 | 2 | 2 | 2 | 2 | 2 | 0 | 0 | 0 | 0 |
| Tokens | 2 | 14 | 14 | 4 | 13 | 13 | 10 | 10 | 10 | 10 |
| Products | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |

#### Phase 3 — Price evaluation & trade

> P = ​∑i​(Ci​⋅Qi​)​/∑i​Qi = ((2*4)+(2*3))/(4+3) = (8+6)/7 = 2
> (I calculated this one wrong but result is okay. In the next round its corrected)

|       | E1 | W2/E1 | W3/E1 | E4 | W5/E4 | W6/E4 | U7 | U8 | U9 | U10 |
|-------|----|----|----|----|----|----|----|----|----|-----|
| Output | 0 | 0 | 0 | 2 | 0 | 0 | 0 | 0 | 0 | 0 |
| Tokens | 10 | 12 | 12 | 8 | 11 | 11 | 8 | 8 | 8 | 8 |
| Products | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 |

*Both companies sell with fair price. E1 sell all 6 with 12 tokens. E4 only get 4 sold with 8 tokens. E4 will have some products left in his stocks.*

#### Final phase — Taxes and consumption

*Elder created tokens are pure money, not debt, so he can either save or distribute tokens. He decides to save them for next round.*

|       | Elder | Mint |
|-------|----|----|
| Balance | 100 | -1000 |

|       | E1 | W2/E1 | W3/E1 | E4 | W5/E4 | W6/E4 | U7 | U8 | U9 | U10 |
|-------|----|----|----|----|----|----|----|----|----|-----|
| Output | 0 | 0 | 0 | 2 | 0 | 0 | 0 | 0 | 0 | 0 |
| Tokens | 10 | 12 | 12 | 8 | 11 | 11 | 8 | 8 | 8 | 8 |
| Products | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |

---
---
## Round 2

**For the sake of accuracy and simplicity all tokens and product values are now ten folded. Also the base consuption rate is now 10**

#### Phase 1 — Opportunity evaluation and resident status changes

*Elder decides to put the tokens back to economy by hiring two resident to enhance the infrastructure of the village. He pays lower price (30 tokens) than the firms to not steal workforce from private sector. The economic output of the village increases to 1.1. The value of labor could be also calculated as marginal production by formula MP = Q<sub>total</sub> x Q<sub>output increase</sub> / n<sub>workers</sub> = 120 x 0.1 / 2 = 6*

*Entrepreneur 1 might think he is paying too much for labor and he lays off W3 and hires U9 for lower wage of 30. E4 instead thinks he has too many workers and lays off W6.*

> Infrastructure factor: 1.1  
> Science/tech factor: 1.0  

**Government**

|       | Elder | Mint |
|-------|----|----|
| Balance | 100 | -1000 |

**Residents**

|       | E1 | W2| U3 | E4 | W5 | U6 | W7 | W8 | W9 | U10 |
|-------|----|----|----|----|----|----|----|----|----|----|
| Tokens | 100 | 120 | 120 | 80 | 110 | 110 | 80 | 80 | 80 | 80 |
| Products | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |

**Economic Output Matrix**

|      | E1 | w2 | w9 |   | E4 | w5 |   | w7 | w8 |
|------|----|----|----|---|----|----|---|----|----|
| Salary | -  | 40  | 30  |   | -  | 30  |   | 30  | 30  |
| Output | 20  | 20  | 20  |   | 20  | 2  |   | infra  | infra  |
| Quality | 1  | 1  | 1  |   | 1  | 1  |   | 1  | 1  |
| Stocks | 0  | -  | -  |   | 20  | -  |   | -  | -  |


#### Phase 2 — Currency creation, payments and production

> Infrastructure factor: 1.1  
> Science/tech factor: 1.0  
> All Gross Margins: 1.2

**Economic Output Matrix**

|      | E1 | w2 | w9 |   | E4 | w5 |   | w7 | w8 |
|------|----|----|----|---|----|----|---|----|----|
| Salary | -  | 40  | 30  |   | -  | 30  |   | 30  | 30  |
| Output | 22  | 22  | 22  |   | 22  | 22  |   | infra  | infra  |
| Quality | 1  | 1  | 1  |   | 1  | 1  |   | 1  | 1  |
| Stocks | 0  | -  | -  |   | 20  | -  |   | -  | -  |

**Residents**

|        | E1 | W2  | U3  | E4  | W5  | U6 | W7 | W8 | W9 | U10 |
|--------|----|-----|-----|----|-----|-----|----|----|----|-----|
| Tokens | 50 | 160 | 120 | 50 | 140 | 110 | 110 | 110 | 110 | 80 |
| Products | 0  | 0  | 0  | 0  | 0  | 0  | 0  | 0  | 0  | 0  |

#### Phase 3 — Price evaluation & trade

> **Weighted average cost**
>
> P = ​∑i​(Ci​⋅Qi​)​/∑i​Qi 
> 
> Unit labor costs:  
> Ca = 40/11 = 3.636  
> Cb = 30/33 = 0.909 
>  
> P = ((3.636 x 11) + (0.909*33)) / (11+33)  
> = (40 + 30)/44  
> = 1.59 ~ **1.6**
> 
> Unit price = P x Gm = 1.6 x 1.2 = 1.9

**Economic Output Matrix**

> Update stocks!

|      | E1 | w2 | w9 |   | E4 | w5 |   | w7 | w8 |
|------|----|----|----|---|----|----|---|----|----|
| Salary | -  | 40  | 30  |   | -  | 30  |   | 30  | 30  |
| Output | 0  | 0  | 0  |   | 0  | 0  |   | infra  | infra  |
| Quality | 1  | 1  | 1  |   | 1  | 1  |   | 1  | 1  |
| Stocks | 66  | -  | -  |   | 64  | -  |   | -  | -  |

**Residents**

> Residents trade

|        | E1 | W2  | U3  | E4  | W5  | U6 | W7 | W8 | W9 | U10 |
|--------|----|-----|-----|----|-----|-----|----|----|----|-----|
| Tokens | 31 | 141 | 101 | 31 | 121 | 91 | 91 | 91 | 91 | 61 |
| Products | 10  | 10  | 10  | 10  | 10  | 10  | 10  | 10  | 10  | 10  |

> Update stocks!

|      | E1 | w2 | w9 |   | E4 | w5 |   | w7 | w8 |
|------|----|----|----|---|----|----|---|----|----|
| Salary | -  | 40  | 30  |   | -  | 30  |   | 30  | 30  |
| Output | 0  | 0  | 0  |   | 0  | 0  |   | infra  | infra  |
| Quality | 1  | 1  | 1  |   | 1  | 1  |   | 1  | 1  |
| Stocks | 16  | -  | -  |   | 14  | -  |   | -  | -  |

> Revenues for Entrepreneurs

*Both E1 and E2 sold 50 units each with revenue of 95 tokens for both. Residents won't purchase more than they consume at this point.*

|        | E1 | W2  | U3  | E4  | W5  | U6 | W7 | W8 | W9 | U10 |
|--------|----|-----|-----|----|-----|-----|----|----|----|-----|
| Tokens | 126 | 141 | 101 | 126 | 121 | 91 | 91 | 91 | 91 | 61 |
| Products | 10  | 10  | 10  | 10  | 10  | 10  | 10  | 10  | 10  | 10  |

Both entrepreneurs are finally starting to earn a living from their revenue.


#### Final phase — Taxes and consumption

*The problem of unemployed residents having no income is becoming apparent. In the next round, the Elder must address it.*

|        | E1 | W2  | U3  | E4  | W5  | U6 | W7 | W8 | W9 | U10 |
|--------|----|-----|-----|----|-----|-----|----|----|----|-----|
| Tokens | 113 | 127 | 91 | 113 | 109 | 82 | 82 | 82 | 82 | 55 |
| Products | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |