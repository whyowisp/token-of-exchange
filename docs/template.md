## Template

[go back](https://whyowisp.github.io/token-of-exchange/)  

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
> Initial tax rate: 0%  
> Other options: _____________________________________.

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
> Tax rate: 0%**

#### Administration

> **Ledger note:**  
> In this model, the three ledger columns track the core monetary flows:  
> 1. **Elder’s account** — government-held tokens, used for public spending and taxes.  
> 2. **Ledger (total supply)** — the total amount of currency in circulation. Positive in commodity-based systems (e.g., gold standard), negative in debt-based systems.  
> 3. **Government debt** — obligations owed by the government to the banking system. Remains zero in a pure gold standard; fluctuates in debt-based systems.  
>
> Always ensure the following:  
> - Token sum in the community = | ledger (total supply) | 
> - In gold standard: Government debt = 0  
> - In debt-based system: Ledger total = Elder’s balance + Government debt


|         | Elder's account | Ledger (total supply) | Government debt |
|---------|-----------------|-----------------------|-----------------|
| Balance |         0       |            0          |        0        |

#### Community

Update statuses (R→U/E/W/D).

|          | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 | R10 |  Total   |
|----------|----|----|----|----|----|----|----|----|----|-----|----------|
| Tokens   |  0 |  0 |  0 |  0 |  0 |  0 |  0 |  0 |  0 |  0  |    0     |
| Products |  0 |  0 |  0 |  0 |  0 |  0 |  0 |  0 |  0 |  0  |    -     |

#### Economic Output Table

Update employment hierarchies, salaries, work quality factors and output (string/number)!

|               | XN | XN | XN |    | XN | XN | XN |
|---------------|----|----|----|----|----|----|----|
| Salary        |    |    |    |    |    |    |    |
| Output/round  |    |    |    |    |    |    |    |
| Quality       |    |    |    |    |    |    |    |
| Stocks total  |    |    |    |    |    |    |    |
| Unit price    |    |    |    |    |    |    |    |
| Market Share  |    |    |    |    |    |    |    |

### Phase 1 — Production, payments

#### Overall economic factors

> **Infrastructure efficiency factor (IE): 1.0   
> Technology progress factor (TP): 1.0  
> Resource volatility scale (RV): 1.0  
> Gross margin factor (GM): 1.0  
> Tax rate: 0%**

#### Administration

Update administrative bank accounts!

|         | Elder's account | Ledger (total supply) | Government debt |
|---------|-----------------|-----------------------|-----------------|
| Balance |         0       |            0          |        0        |

#### Community

Update incomes (from benefits or salary). **Ensure token sum conserved and total is equal to absolute value of elder's account!**

|          | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 | R10 |  Total   |
|----------|----|----|----|----|----|----|----|----|----|-----|----------|
| Tokens   |  0 |  0 |  0 |  0 |  0 |  0 |  0 |  0 |  0 |  0  |    0     |
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
---
*Your Calculations:*

---

|               | XN | XN | XN |    | XN | XN | XN |
|---------------|----|----|----|----|----|----|----|
| Salary        |    |    |    |    |    |    |    |
| Output/round  |    |    |    |    |    |    |    |
| Quality       |    |    |    |    |    |    |    |
| Stocks total  |    |    |    |    |    |    |    |
| Unit price    |    |    |    |    |    |    |    |
| Market Share  |    |    |    |    |    |    |    |

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
---
*Your Calculations:*

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

---
*Your Calculations:*

---

|               | XN | XN | XN |    | XN | XN | XN |
|---------------|----|----|----|----|----|----|----|
| Salary        |    |    |    |    |    |    |    |
| Output/round  |    |    |    |    |    |    |    |
| Quality       |    |    |    |    |    |    |    |
| Stocks total  |    |    |    |    |    |    |    |
| Unit price    |    |    |    |    |    |    |    |
| Market Share  |    |    |    |    |    |    |    |

#### Residents

---
*Your Calculations:*

---

|          | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 | R10 |  Total   |
|----------|----|----|----|----|----|----|----|----|----|-----|----------|
| Tokens   |  0 |  0 |  0 |  0 |  0 |  0 |  0 |  0 |  0 |  0  |    0     |
| Products |  0 |  0 |  0 |  0 |  0 |  0 |  0 |  0 |  0 |  0  |    -     |

#### Economic Output Table

...and remove from stocks accordingly!

|               | XN | XN | XN |    | XN | XN | XN |
|---------------|----|----|----|----|----|----|----|
| Salary        |    |    |    |    |    |    |    |
| Output/round  |    |    |    |    |    |    |    |
| Quality       |    |    |    |    |    |    |    |
| Stocks total  |    |    |    |    |    |    |    |
| Unit price    |    |    |    |    |    |    |    |
| Market Share  |    |    |    |    |    |    |    |

#### Community

Calculate revenues for Entrepreneurs. **Ensure token sum conserved and total is equal to absolute value of elder's account!**

---
*Your Calculations:*

---

|          | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 | R10 |  Total   |
|----------|----|----|----|----|----|----|----|----|----|-----|----------|
| Tokens   |  0 |  0 |  0 |  0 |  0 |  0 |  0 |  0 |  0 |  0  |    0     |
| Products |  0 |  0 |  0 |  0 |  0 |  0 |  0 |  0 |  0 |  0  |    -     |

### Phase 3 — Taxes and consumption

#### Overall economic factors

> **Infrastructure efficiency factor (IE): 1.0   
> Technology progress factor (TP): 1.0  
> Resource volatility scale (RV): 1.0  
> Gross margin factor (GM): 1.0  
> Tax rate: 0%**

#### Community

Tax out tokens (round nearest) and consume products. **Ensure token sum conserved and total is equal to absolute value of elder's account!**

|          | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 | R10 |  Total   |
|----------|----|----|----|----|----|----|----|----|----|-----|----------|
| Tokens   |  0 |  0 |  0 |  0 |  0 |  0 |  0 |  0 |  0 |  0  |    0     |
| Products |  0 |  0 |  0 |  0 |  0 |  0 |  0 |  0 |  0 |  0  |    -     |

#### Administration

|         | Elder's account | Ledger (total supply) | Government debt |
|---------|-----------------|-----------------------|-----------------|
| Balance |         0       |            0          |        0        |
