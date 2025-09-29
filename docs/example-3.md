## Exampe 3

### Status codes

> **R** = Resident (no status)  
> **U** = Unemployed  
> **E** = Entrepreneur  
> **W** = Employed (worker)   
> **D** = Deceased

## Variables

> Banking type: public  
> Monetary system: gold  
> Entrepreneurial allowance: private companies 
> Initial tax factor: 0.8  
> Other options: 1000 tokens initially. Benevolent elder. Two private companies in start.

---
---
**Copy rounds below iteratively i.e. Round 1, Round 2, Round N... and fill the tables phase by phase following the rules and laws you have created**
---
---

## Round 1

#### Meta Phase — Currency creation, opportunity evaluation, resident status changes, economic factors changes.

Update economic factors!

**Overall economic factors**

> Infrastructure efficiency factor (IE): 1.0   
> Technology progress factor (TP): 1.0  
> Resource volatility scale (RV): 1.0  
> Gross margin factor (GM): 1.0
> Tax factor: 0.8

**Administration**

> **Ledger note:**  
> In this model, the three ledger columns track the core monetary flows:  
> 1. **Elder’s account** — government-held tokens, used for public spending and taxes.  
> 2. **Ledger (total supply)** — the total amount of currency in circulation. Positive in commodity-based systems (e.g., gold standard), negative in debt-based systems.  
> 3. **Government debt** — obligations owed by the government to the banking system. Remains zero in a pure gold standard; fluctuates in debt-based systems.  
>
> Always ensure the following:  
> - Token sum in the community = |Ledger (total supply)|  
> - In gold standard: Government debt = 0  
> - In debt-based system: Ledger total = Elder’s balance + Government debt

*The Elder immediately shares all the tokens so his balance will start in 0.

|         | Elder's account | Ledger (total supply) | Government debt |
|---------|-----------------|-----------------------|-----------------|
| Balance |         0       |            1000       |        0        |

**Community**

*E1 and E5 have started businesses, with different strategy. E1 tries to produce bulk, E5 tries for quality. They employ some workers, but 4 out of 10 are left unemployed.

Update statuses (R→U/E/W/D). Ensure token sum conserved and total is equal to absolute value ledger total!

|          | E1 | W2 | W3 | W4 | E5 | W6 | U7 | U8 | U9 | U10 |  total   |
|----------|----|----|----|----|----|----|----|----|----|-----|----------|
| Tokens   | 100| 100| 100| 100| 100| 100| 100| 100| 100| 100 |   1000   |
| Products |  0 |  0 |  0 |  0 |  0 |  0 |  0 |  0 |  0 |  0  |    -     |

**Economic Output Matrix**

Update employment hierarchies, salaries, work quality factors and output (string/number)!

|               | E1 | W2 | W3 | W4 |    | E5 | W6 | W7 |
|---------------|----|----|----|----|----|----|----|----|
| Salary        |  - | 10 | 10 | 10 |    |  - | 20 | 20 |
| Output/round  |    | 10 | 10 | 10 |    |    | 5  |  5 |
| Quality       |    | q1 | q1 | q1 |    |    | q2 | q2 |
| Stocks total  |30q1|    |    |    |    |10q2|    |    |


#### Phase 1 — Production, payments

**Overall economic factors**

> Infrastructure efficiency factor (IE): 1.0   
> Technology progress factor (TP): 1.0  
> Resource volatility scale (RV): 1.0  
> Gross margin factor (GM): 1.0
> Tax factor: 0.8

**Administration**

Update administrative bank accounts!

|         | Elder's account | Ledger (total supply) | Government debt |
|---------|-----------------|-----------------------|-----------------|
| Balance |         0       |            1000       |        0        |

**Community**

Update incomes (from benefits or salary). Ensure token sum conserved and total is equal to absolute value of elder's account!

|          | E1 | W2 | W3 | W4 | E5 | W6 | W7 | U8 | U9 | U10 |  total   |
|----------|----|----|----|----|----|----|----|----|----|-----|----------|
| Tokens   | 70 | 110| 110| 110| 80 | 110| 100| 100| 100| 100 |   1000   |
| Products |  0 |  0 |  0 |  0 |  0 |  0 |  0 |  0 |  0 |  0  |    -     |

**Economic Output Matrix**

Update stocks!

> Stocks per XN = Output * IE * TP * RV  
> Stocks accretion = Stocks + ∑XN
> 
> Quality: education factor * technology factor (???)

|               | E1 | W2 | W3 | W4 |    | E5 | W6 | W7 |
|---------------|----|----|----|----|----|----|----|----|
| Salary        |  - | 10 | 10 | 10 |    |  - | 20 | 20 |
| Output/round  |    | 10 | 10 | 10 |    |    | 5  |  5 |
| Quality       |    | q1 | q1 | q1 |    |    | q2 | q2 |
| Stocks total  |30q1|    |    |    |    |10q2|    |    |


#### Phase 2 — Price evaluation & trade

> **Price formation**
>
> P = ∑i (C<sub>i</sub> * Q<sub>i</sub>) / ∑i Q<sub>i</sub>
>
> Where:  
> - C<sub>i</sub> = unit labor cost (per unit)
> - Q<sub>i</sub> = quantity of input i
>
> Final unit price:  
> P<sub>unit</sub> = C<sub>unit</sub> * GM * RV
> 
> Where:  
> - GM = gross margin factor  
> - RV = resource volatility scale

Calculate final unit price!

> **Calculating market share**
>
> Market share of product *i* (softmax with temperature):
> 
> sᵢ = e^(uᵢ / τ) / Σⱼ e^(uⱼ / τ)
>
> **Utility of product *i***  
> uᵢ = qw · qᵢ − pw · pᵢ  
>
> **Parameters:**  
> • qw = quality weight (0–1)  
> • pw = price weight (0–1)  
> • qᵢ = product quality (1 = worst, 10 = best)  
> • pᵢ = product price (1 = most expensive, 10 = cheapest)
>
> **Temperature (τ):**  
> • τ > 1 → smoother output (shares more equal)  
> • τ < 1 → sharper output (winner-takes-all) 

**Market share for E1 q1-level and E5 q2-level products:**

*The times have been hard before and the new economic system is worrying residents so they value availability and low price in expense of quality.*

qw = 0.2  
pw = 0.8

τ = 5

Utility E1:

q<sub>E1</sub> = 1  
p<sub>E1</sub> = 10
  
u<sub>E1</sub> = qw * q<sub>E1</sub> - pw * p<sub>E1</sub>  
 = 0.8 * 10 - 0.2 * 1  
 = **7.8**

Utility E5:

q<sub>E5</sub> = 10  
p<sub>E5</sub> = 1
  
u<sub>E5</sub> = qw * q<sub>E5</sub> - pw * p<sub>E5</sub>  
= 0.2 * 10 - 0.8 * 1  
= **1.2**

Market share for E1 product:  

sᵢ = e^(uᵢ / τ) / Σⱼ e^(uⱼ / τ) 

s<sub>E1</sub> e^(7.8/5) / (e^(7.8/5) + e^(1.2/5))  
= 4.76 / (4.76 + 1.27)  
= **0.79**

...for E2:

s<sub>E2</sub> = 1 - s<sub>E1</sub>  
= **0.11**


**Economic Output Matrix**

> Update stocks!

|               | XN | XN | XN |    | XN | XN | XN |
|---------------|----|----|----|----|----|----|----|
| Salary        |    |    |    |    |    |    |    |
| Output/round  |    |    |    |    |    |    |    |
| Quality       |    |    |    |    |    |    |    |
| Stocks total  |    |    |    |    |    |    |    |

**Residents**

Add products!

|          | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 | R10 |  total   |
|----------|----|----|----|----|----|----|----|----|----|-----|----------|
| Tokens   |  0 |  0 |  0 |  0 |  0 |  0 |  0 |  0 |  0 |  0  |    0     |
| Products |  0 |  0 |  0 |  0 |  0 |  0 |  0 |  0 |  0 |  0  |    -     |

And remove from stocks accordingly!

|               | XN | XN | XN |    | XN | XN | XN |
|---------------|----|----|----|----|----|----|----|
| Salary        |    |    |    |    |    |    |    |
| Output/round  |    |    |    |    |    |    |    |
| Quality       |    |    |    |    |    |    |    |
| Stocks total  |    |    |    |    |    |    |    |

Calculate revenues for Entrepreneurs. Ensure token sum conserved and total is equal to absolute value of elder's account!

|          | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 | R10 |  total   |
|----------|----|----|----|----|----|----|----|----|----|-----|----------|
| Tokens   |  0 |  0 |  0 |  0 |  0 |  0 |  0 |  0 |  0 |  0  |    0     |
| Products |  0 |  0 |  0 |  0 |  0 |  0 |  0 |  0 |  0 |  0  |    -     |

#### Final phase — Taxes and consumption

**Overall economic factors**

> Infrastructure efficiency factor (IE): 1.0   
> Technology progress factor (TP): 1.0  
> Resource volatility scale (RV): 1.0  
> Gross margin factor (GM): 1.0
> Tax factor: 1.0

**Administration**

|         | Elder| Mint |
|---------|------|------|
| Balance |   0  |   0  |

**Community**

Tax out tokens and consume products. Ensure token sum conserved and total is equal to absolute value of elder's account!

|          | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 | R10 |  total   |
|----------|----|----|----|----|----|----|----|----|----|-----|----------|
| Tokens   |  0 |  0 |  0 |  0 |  0 |  0 |  0 |  0 |  0 |  0  |    0     |
| Products |  0 |  0 |  0 |  0 |  0 |  0 |  0 |  0 |  0 |  0  |    -     |

**Economic Output Matrix**

|               | XN | XN | XN |    | XN | XN | XN |
|---------------|----|----|----|----|----|----|----|
| Salary        |    |    |    |    |    |    |    |
| Output/round  |    |    |    |    |    |    |    |
| Quality       |    |    |    |    |    |    |    |
| Stocks total  |    |    |    |    |    |    |    |
