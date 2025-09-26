## The Iterative Method

This simulation explores how an isolated village of residents might implement an economic system using a common token as a medium of exchange. Each iteration models production, trade, and token circulation, allowing observation of how wealth and tokens distributes, how productivity and technological advances affect the economy, and how token supply influences purchasing power. The experiment abstracts complex dynamics of money, debt, and consumption to reveal fundamental mechanisms behind economic flows in a simple, iterative framework.

This page explains how to manually implement and follow the system flow and provides a template. Please check the examples (menu above) of how the template have been used and the findings I have made.

**Please note that this page is *not* the requirements of the application! For interested they are found [here](https://github.com/whyowisp/token-of-exchange/blob/main/docs/ToE-requirements.md).**

## Base Assumptions

A virtual isolated village with 10 residents, the Elder, and a Bank.

- All exchanges must be made using the Token.
- Each individual *must not* consume their own product
- Only one type of product exists, covering every possible need, but the product quality can be enhanced.
- Only one type of companies output this single product.
- Product prices are calculated per unit using formula of weighted average cost. The prices are modulated by gross margin and resource volatility scale (=resource prices):

> **Weighted average cost**
>
> P = ∑i (C<sub>i</sub> · Q<sub>i</sub>) / ∑i Q<sub>i</sub>
>
> Where:  
> - C<sub>i</sub> = unit labor cost (per unit) 
> - Q<sub>i</sub> = quantity of input i
>
> Final unit price:  
> P<sub>unit</sub> = C<sub>unit</sub> × GM × RV
> 
> Where:  
> - GM = gross margin factor  
> - RV = resource volatility scale

- Technological advancements can increase production output thus increasing productivity.
- Centralizing labor within a company structure enhances output. *(Simulation rule, not a real-world assumption)*
- Base consumption is 10 product/resident/round

## Variables

- Bank type: private or public
- Monetary system:  
  1. Fiat money (public debt)  
  2. Gold standard (fixed supply)  
  3. Private debt (e.g., Eurozone system)  
- Entrepreneurship: one or multiple residents can become entrepreneurs
- Tax rates

## Rules

Each iteration consists of five phases, executed in order:

- **Meta Phase — Currency creation. Opportunity evaluation, resident status changes, economic factors changes**
- **Phase 1 — Production and payments**
- **Phase 2 — Price evaluation & trade**
- **Phase 3 — Taxes and consumption**
   *(evaluating potential entrepreneurship, employment changes, and possible deaths)*

Values are tracked in tables, updated round by round and phase by phase.

### Resident status codes

- **R** = Resident (no status)
- **U** = Unemployed
- **E** = Entrepreneur  
- **W** = Employed (worker)  
- **D** = Deceased

## Template (start by copying all belove this to your text editor)

### Status codes

> **R** = Resident (no status)  
> **U** = Unemployed  
> **E** = Entrepreneur  
> **W** = Employed (worker)  
> **D** = Deceased

## Variables

> Banking type: (private/public)  
> Monetary system: (Fiat, Gold, Debt)  
> Entrepreneurial allowance: (state, private companies etc.)  
> Initial tax factor: 1.0  
> Other options: ____________________________________________

---
---
**Copy rounds below iteratively i.e. Round 1, Round 2, Round N... and fill the tables phase by phase following the rules and laws you have created**
---
---

## Round N

#### Meta Phase — Currency creation, opportunity evaluation, resident status changes, economic factors changes.

Update economic factors!

**Overall economic factors**

> Infrastructure efficiency factor (IE): 1.0   
> Technology progress factor (TP): 1.0  
> Resource volatility scale (RV): 1.0  
> Gross margin factor (GM): 1.0
> Tax factor: 1.0

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


|         | Elder's account | Ledger (total supply) | Government debt |
|---------|-----------------|-----------------------|-----------------|
| Balance |         0       |            0          |        0        |

**Community**

Update statuses (R→U/E/W/D). Ensure token sum conserved and total is equal to absolute value ledger total!

|          | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 | R10 |  total   |
|----------|----|----|----|----|----|----|----|----|----|-----|----------|
| Tokens   |  0 |  0 |  0 |  0 |  0 |  0 |  0 |  0 |  0 |  0  |    0     |
| Products |  0 |  0 |  0 |  0 |  0 |  0 |  0 |  0 |  0 |  0  |    -     |

**Economic Output Matrix**

Update employment hierarchies, salaries, work quality factors and output (string/number)!

|               | XN | XN | XN |    | XN | XN | XN |
|---------------|----|----|----|----|----|----|----|
| Salary        |    |    |    |    |    |    |    |
| Output/round  |    |    |    |    |    |    |    |
| Quality       |    |    |    |    |    |    |    |
| Stocks total  |    |    |    |    |    |    |    |


#### Phase 1 — Production, payments

**Overall economic factors**

> Infrastructure efficiency factor (IE): 1.0   
> Technology progress factor (TP): 1.0  
> Resource volatility scale (RV): 1.0  
> Gross margin factor (GM): 1.0
> Tax factor: 1.0

**Administration**

Update administrative bank accounts!

|         | Elder| Mint |
|---------|------|------|
| Balance |   0  |   0  |

**Community**

Update incomes (from benefits or salary). Ensure token sum conserved and total is equal to absolute value of elder's account!

|          | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 | R10 |  total   |
|----------|----|----|----|----|----|----|----|----|----|-----|----------|
| Tokens   |  0 |  0 |  0 |  0 |  0 |  0 |  0 |  0 |  0 |  0  |    0     |
| Products |  0 |  0 |  0 |  0 |  0 |  0 |  0 |  0 |  0 |  0  |    -     |

**Economic Output Matrix**

Update stocks!

> Stocks per XN = Output x IE x TP x RV  
> Stocks accretion = Stocks + ∑XN
> 
> Quality: education factor x technology factor (???)

|               | XN | XN | XN |    | XN | XN | XN |
|---------------|----|----|----|----|----|----|----|
| Salary        |    |    |    |    |    |    |    |
| Output/round  |    |    |    |    |    |    |    |
| Quality       |    |    |    |    |    |    |    |
| Stocks total  |    |    |    |    |    |    |    |


#### Phase 2 — Price evaluation & trade

> **Price formation**
>
> P = ∑i (C<sub>i</sub> · Q<sub>i</sub>) / ∑i Q<sub>i</sub>
>
> Where:  
> - C<sub>i</sub> = unit labor cost (per unit)
> - Q<sub>i</sub> = quantity of input i
>
> Final unit price:  
> P<sub>unit</sub> = C<sub>unit</sub> × GM × RV
> 
> Where:  
> - GM = gross margin factor  
> - RV = resource volatility scale

Calculate final unit price!

> Here

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
