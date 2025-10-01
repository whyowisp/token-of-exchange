## Example

This example file shows how to use the template

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

### Meta Phase — Currency creation, opportunity evaluation, resident status changes, economic factors changes.

#### Overall economic factors

Update economic factors!

> **Infrastructure efficiency factor (IE): 1.0   
> Technology progress factor (TP): 1.0  
> Resource volatility scale (RV): 1.0  
> Gross margin factor (GM): 1.0
> Tax rate: 20 % (0.8)*

#### Administration

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

*The Elder immediately shares all the tokens so his balance will start in 0.*

|         | Elder's account | Ledger (total supply) | Government debt |
|---------|-----------------|-----------------------|-----------------|
| Balance |         0       |            1000       |        0        |

#### Community

*E1 and E5 have started businesses, with different strategy. E1 tries to produce bulk, E5 tries for quality. They employ some workers, but 3 out of 10 are left unemployed.*

Update statuses (R→U/E/W/D).

|          | E1 | W2 | W3 | W4 | E5 | W6 | U7 | U8 | U9 | U10 |  total   |
|----------|----|----|----|----|----|----|----|----|----|-----|----------|
| Tokens   | 100| 100| 100| 100| 100| 100| 100| 100| 100| 100 |   1000   |
| Products |  0 |  0 |  0 |  0 |  0 |  0 |  0 |  0 |  0 |  0  |    -     |

#### Economic Output Table

Update employment hierarchies, salaries, work quality factors and output (string/number)!

|               | E1 | W2 | W3 | W4 |    | E5 | W6 | W7 |
|---------------|----|----|----|----|----|----|----|----|
| Salary        |  - | 10 | 10 | 10 |    |  - | 20 | 20 |
| Output/round  |    | -  | -  | -  |    |    | -  | -  |
| Quality       |    | q1 | q1 | q1 |    |    | q2 | q2 |
| Stocks total  |30q1|    |    |    |    |10q2|    |    |


### Phase 1 — Production, payments

#### Overall economic factors

> **Infrastructure efficiency factor (IE): 1.0   
> Technology progress factor (TP): 1.0  
> Resource volatility scale (RV): 1.0  
> Gross margin factor (GM): 1.0  
> Tax rate: 20 % (0.8)*

#### Administration

Update administrative bank accounts!

|         | Elder's account | Ledger (total supply) | Government debt |
|---------|-----------------|-----------------------|-----------------|
| Balance |         0       |            1000       |        0        |

#### Community

Update incomes (from benefits or salary). **Ensure token sum conserved and total is equal to absolute value of elder's account!**

|          | E1 | W2 | W3 | W4 | E5 | W6 | W7 | U8 | U9 | U10 |  total   |
|----------|----|----|----|----|----|----|----|----|----|-----|----------|
| Tokens   | 70 | 110| 110| 110| 60 | 120| 120| 100| 100| 100 |   1000   |
| Products |  0 |  0 |  0 |  0 |  0 |  0 |  0 |  0 |  0 |  0  |    -     |

#### Economic Output Table

Calculate production amounts and quality, and add products to stocks!

> **Company Total Output**
>
> **P<sub>company</sub> = ∑<sub>N </sub>P<sub>XN</sub>**
>
> **Production per Producer X<sub>N</sub>**
>
> **P<sub>XN</sub> = output_base * w<sub>P</sub> * ln(1 + e<sub>P</sub> * (IE<sub>N</sub> * EL<sub>N</sub> * TP<sub>N</sub> * RV<sub>N</sub>))**
>
> Where:
> 
> - **output_base** = Production base quantity (10)
> - **w<sub>P</sub>** = Weight for production scaling (around ~ 1)
> - **IE** = Infrastructure Efficiency Factor (≥ 0)
> - **EL** = Education Level (≥ 0, choose highest among the company’s employees)  
> - **TP** = Technology Progress factor (≥ 0)  
> - **RV** = Resource Volatility scale (≥ 0)
>
> **Stocks accretion**
>
> **Stocks total = Stocks + P<sub>company</sub>**
>
> ---
> **End Product Quality value**
>
> **Q = w<sub>Q</sub> * ln(1 + e<sub>Q</sub> * (EL * TP))**  
>
> Where:
>
> - **w<sub>Q</sub>** = Weight for quality scaling (5 proven to be good)
> - **EL** = Education Level (≥ 0)  
> - **TP** = Technology Progress factor (≥ 0)
>
> Note: The education levels (EL) are each for each individual!

*The company **E1** has 3 workers each producing base value of 10 and their base education level is 1.0. Infrastructure, technology and resources are all at 1.0.*

output_base = 10  
wP = 1  
IE = 1.0  
EL = 1.0  
TP = 1.0  
RV = 1.0  

For each worker their output is P_XN = output_base * w_P * ln(1 + e_P * (IE_N * EL_N * TP_N * RV_N))

P_W2 = 10 * 1 * ln(1 + e *(1.0 * 1.0 * 1.0 * 1.0)) = 13.133... ~ **13**
P_W3 = **13**
P_W4 = **13**

Whole company output is thus

P_company = ∑_N P_XN = 13 + 13 + 13 = **39**

The quality of the products are Q = w_Q * ln(1 + e_Q * (EL * TP)), where EL is 1.0 for each worker.

EL = 1.0  
w_Q = 5.0

Q = 5.0 * ln(1 + e * (1.0 * 1.0)) = 6.567... ~ **7**

---

*The company **E5** has 2 workers each producing base value of 10 and their base education level is 2.0. Infrastructure, technology and resources are all at 1.0.*

output_base = 10  
wP = 1  
IE = 1.0  
EL = 2.0  
TP = 1.0  
RV = 1.0  

For each worker their output is P_XN = output_base * w_P * ln(1 + e_P * (IE_N * EL_N * EL_N * TP_N * RV_N))

P_W6 = 10 * 1 * ln(1 + e *(1.0 * 2.0 * 1.0 * 1.0)) = 18.620... ~ **19**
P_W7 = **19**

Whole company output is thus

P_company = ∑_N P_XN = 19 + 19 = **38**

The quality of the products are Q = w_Q * ln(1 + e_Q * (EL * TP)), where EL is 2.0 for each worker.

EL = 2.0  
w_Q = 5.0

Q = 5.0 * ln(1 + e * (2.0 * 1.0)) = 9.31... ~ **9**

|               | E1 | W2 | W3 | W4 |    | E5 | W6 | W7 |
|---------------|----|----|----|----|----|----|----|----|
| Salary        |  - | 10 | 10 | 10 |    |  - | 20 | 20 |
| Output/round  |    | 13 | 13 | 13 |    |    | 19 | 19 |
| Quality       |    | q1 | q1 | q1 |    |    | q2 | q2 |
| Stocks total  |39q7|    |    |    |    |38q9|    |    |
| Unit price    |    |    |    |    |    |    |    |    |


### Phase 2 — Price evaluation & trade

#### Economic Output Table

Calculate unit price!

> **Calculating Product Price**
>
> Price of product ***i***:
> 
> **P<sub>i</sub> = C<sub>i</sub> × (1 + GM)**
>
> Where:
> 
>  - **C<sub>i</sub>** = Salaries paid ÷ Output quantity
> - **GM** = Gross Margin factor (e.g. 0.2 = 20%)
>
> Example:
>
> If total salaries = 300 tokens, output = 50 units, GM = 0.2, RV = 2:
>
> C<sub>i</sub> = 300 ÷ 50 = 6  
> P<sub>i</sub> = 6 × (1 + 0.2) = 7.2 tokens per unit

Product price for product **E1**

C_i = (10 + 10 + 10) / 39 = 0.769... ~ 0.8  
GM = 0.2 

P_i = C_i × (1 + GM) = 0.8 * (1 + 0.2) = 0.96 ~ **1.0**

---

*Both entrepreneurs have same profit margin 0.2*

Product price for product **E5**

C_i = (20 + 20) / 38 = 1.05... ~ 1.1  
GM = 0.2 

P_i = C_i × (1 + GM) = 1.1 * (1 + 0.2) = 1.32 ~ **1.3**

---

Calculate market share for each company product!

> **Calculating Market Share**
>
> Market share of product *i* (softmax with temperature):
> 
> **sᵢ = e^(uᵢ / τ) / Σⱼ e^(uⱼ / τ)**
>
> **Utility of product *i***  
> **uᵢ = qw · qᵢ − pw · pᵢ**  
>
> Where:  
> • **qw** = quality weight (0–1)  
> • **pw** = price weight (0–1)  
> • **qᵢ** = product quality (1 = worst, 10 = best)  
> • **pᵢ** = product price (1 = most expensive, 10 = cheapest)
>
> **Temperature (τ):**  
> • **τ** > 1 → smoother output (shares more equal)  
> • **τ** < 1 → sharper output (winner-takes-all) 

**Market share for E1 q1 level and E5 q2 level products:**

*The times have been hard before and the new economic system is worrying residents so they value availability and low price in expense of quality.*

**qw** = 0.2  
**pw** = 0.8

**τ** = 5

Utility E1:

*Residents don't know of better so the quality of product of E1 is evaluated as 5. For price they think it's also ok-ish.*

q_E1 = 5  
p_E1 = 5
  
u_E1 = qw * q_E1 - pw * p_E1  
 = 0.2 * 5 - 0.8 * 5  
 = **-3.0**

Utility E5:

*Residents think the E5 product is very good quality of 8 but the price is bit too much. They give 3 points for price*

q_E5 = 8  
p_E5 = 3
  
u_E5 = qw * q_E5 - pw * p_E5  
= 0.2 * 8 - 0.8 * 3  
= **-0.8**

Market share for E1 product:  

sᵢ = e^(uᵢ / τ) / Σⱼ e^(uⱼ / τ) 

s_E1 = e^(-3.0/5) / (e^(-3.0/5) + e^(-0.8/5))    
= **0.39**

...for E2:

s_E2 = 1 - s_E1  
= **0.61**

|               | E1 | W2 | W3 | W4 |    | E5 | W6 | W7 |
|---------------|----|----|----|----|----|----|----|----|
| Salary        |    | 10 | 10 | 10 |    |    | 20 | 20 |
| Output/round  |    | 13 | 13 | 13 |    |    | 19 | 19 |
| Quality       |    | q1 | q1 | q1 |    |    | q2 | q2 |
| Stocks total  |39q7|    |    |    |    |38q9|    |    |
| Unit price    |1.0 |    |    |    |    |1.3 |    |    |
| Market Share  |0.39|    |    |    |    |0.61|    |    |

#### Residents

*Each resident normally requires 10 units to progress to the next round, but total output is only 77 units. The Elder enacts a temporary emergency law capping distribution at 5 units per resident, so everyone will face scarcity.*

Market share for E1 is 0.39 and 0.61 for E5. The total of products in the pot is 50. Fractional results round to nearest.

Q_E1 = 50 * 0.39 = 20  
Q_E5 = 50 * 0.61 = 30

Add products to residents matrix. Remove tokens from each resident account, Start from best quality and in order R1 -> R10. Product quality can be ignored.

cost_E1 = 5 * 1.0 tokens = 5 tokens  
cost_E5 = 5 * 1.3 tokens ~ 7 tokens (round nearest)  

First 6 residents (E1 -> W6) all buy with cost_E5 (ironically the competitors product), and rest of residents buy with cost_E1.

|          | E1 | W2 | W3 | W4 | E5 | W6 | W7 | U8 | U9 | U10 |  total   |
|----------|----|----|----|----|----|----|----|----|----|-----|----------|
| Tokens   | 63 | 103| 103| 103| 53 | 113| 115| 95 | 95 | 95  |   938    |
| Products |  5 |  5 |  5 |  5 |  5 |  5 |  5 |  5 |  5 |  5  |    -     |

#### Economic Output Table

...and remove from stocks accordingly!

|               | E1 | W2 | W3 | W4 |    | E5 | W6 | W7 |
|---------------|----|----|----|----|----|----|----|----|
| Salary        |  - | 10 | 10 | 10 |    |  - | 20 | 20 |
| Output/round  |    | 13 | 13 | 13 |    |    | 19 | 19 |
| Quality       |    | q1 | q1 | q1 |    |    | q2 | q2 |
| Stocks total  |19q7|    |    |    |    |8q9 |    |    |
| Unit price    |1.0 |    |    |    |    |1.3 |    |    |
| Market Share  |0.39|    |    |    |    |0.61|    |    |

#### Community

Calculate revenues for Entrepreneurs. **Ensure token sum conserved and total is equal to absolute value of elder's account!**

revenue_E1 = 20 * 1.0 = 20 tokens  
revenue_E5 = 30 * 1.3 = 39 tokens

(Because of rounding earlier the total would be 997, but we add 3 to the account of the winner of this round — for E5.)


|          | E1 | W2 | W3 | W4 | E5 | W6 | W7 | U8 | U9 | U10 |  total   |
|----------|----|----|----|----|----|----|----|----|----|-----|----------|
| Tokens   | 83 | 103| 103| 103| 95 | 113| 115| 95 | 95 | 95  |   1000   |
| Products |  5 |  5 |  5 |  5 |  5 |  5 |  5 |  5 |  5 |  5  |    -     |

*Entrepreneurs aren't super happy of their revenues. If they could have just sold all their stocks... Nevertheless the situation is acceptable considering economic system change and that they are just starting their businesses, In the end they have lots of optimism.*

### Phase 3 — Taxes and consumption

#### Overall economic factors

> **Infrastructure efficiency factor (IE): 1.0   
> Technology progress factor (TP): 1.0  
> Resource volatility scale (RV): 1.0  
> Gross margin factor (GM): 1.0  
> Tax rate: 20 % (0.8)*

#### Community

Tax out tokens (round nearest) and consume products. **Ensure token sum conserved and total is equal to absolute value of elder's account!**

*The every inch of residents products are consumed and people are starving. They surely cannot stand another round. The Elder promises that next round will be better, but they just need to hang on. Elder keeps the system going and taxes 20% from everyone, not that government needs the money, but neither do the residents -- it's a policy.*

|          | E1 | W2 | W3 | W4 | E5 | W6 | W7 | U8 | U9 | U10 |  total   |
|----------|----|----|----|----|----|----|----|----|----|-----|----------|
| Tokens   | 66 | 82 | 82 | 82 | 76 | 90 | 92 | 76 | 76 | 76  |   798    |
| Products |  0 |  0 |  0 |  0 |  0 |  0 |  0 |  0 |  0 |  0  |    -     |

#### Administration

|         | Elder's account | Ledger (total supply) | Government debt |
|---------|-----------------|-----------------------|-----------------|
| Balance |         202     |            1000       |        0        |
