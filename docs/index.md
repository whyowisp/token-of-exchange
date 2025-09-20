## The Iterative Method

This simulation explores how an isolated village of residents might implement an economic system using a common token as a medium of exchange. Each iteration models production, trade, and token circulation, allowing observation of how wealth and tokens distributes, how productivity and technological advances affect the economy, and how token supply influences purchasing power. The experiment abstracts complex dynamics of money, debt, and consumption to reveal fundamental mechanisms behind economic flows in a simple, iterative framework.

This page explains how to manually implement and follow the system flow and provides a template. Please check the examples (menu above) of how the template have been used and the findings I have made.

**Please note that this page is *not* the requirements of the application! For interested they are found [here](https://github.com/whyowisp/token-of-exchange/blob/main/docs/ToE-requirements.md).**

## Base Assumptions

A virtual isolated village with 10 residents, the Elder, and a Bank.

- All exchanges must be made using the Token.
- Each individual *must not* consume their own product
- Only one type of product exists, covering every possible need (simplifying consumption decisions).
- Only one type of companies output this single product.
- Product prices are calculated per unit:

> P<sub>unit</sub> = M1<sub>total</sub> / Q 
>
>M1<sub>total</sub> = Total token supply  
Q = Total number of products

- Technological advancements can increase production output (not included in the alpha model).
- Centralizing capital and labor within a company structure enhances output. *(Simulation rule, not a real-world assumption)*
- Base consumption is 1 product/resident/round

## Variables

- Bank type: private or public
- Monetary system:  
  1. Fiat money (public debt)  
  2. Gold standard (fixed supply)  
  3. Private debt (e.g., Eurozone system)  
- Entrepreneurship: one or multiple residents can become entrepreneurs
- Tax rates

## Rules

Each iteration consists of four phases, executed in order:

1. **Currency creation, payments and production**
2. **Price evaluation & trade**
3. **Taxes and consumption**
4. **Opportunity evaluation and resident status changes**  
   *(evaluating potential entrepreneurship, employment changes, and possible deaths)*

Values are tracked in simple tables, updated round by round and phase by phase.

### Resident status codes

- **R** = Resident (no status)
- **U** = Unemployed
- **E** = Entrepreneur  
- **W** = Employed (worker)  
- **X** = Deceased

## Template (copy this to your text editor)

### Status codes

> **R** = Resident (no status)  
> **U** = Unemployed  
> **E** = Entrepreneur  
> **W** = Employed (worker)  
> **X** = Deceased

## Variables

> Banking type: (private/public)  
> Monetary system: (Fiat, Gold, Private)  
> Entrepreneurial allowance: (state, private companies etc.)  
> Initial tax rate: 0.1  
> Other options: ____________________________________________


### Initial state

|       | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 | R10 |
|-------|----|----|----|----|----|----|----|----|----|-----|
| Output | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Tokens | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Products | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |

---
---
**Copy the template below iteratively i.e. Round 1, Round 2, Round N... and fill the tables phase by phase following the rules and laws you have created**
---
---

## Round 1

#### Phase 1 — Currency creation, payments and production

|       | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 | R10 |
|-------|----|----|----|----|----|----|----|----|----|-----|
| Output | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Tokens | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Products | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |

#### Phase 2 — Price evaluation & trade

 > P<sub>unit</sub> = M/Q<sub>available</sub> = 100/10 = ___

|       | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 | R10 |
|-------|----|----|----|----|----|----|----|----|----|-----|
| Output | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Tokens | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Products | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |

#### Phase 3 — Taxes and consumption

|       | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 | R10 |
|-------|----|----|----|----|----|----|----|----|----|-----|
| Output | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Tokens | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Products | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |

#### Final phase — Opportunity evaluation and resident status changes

|       | R1 | R2 | R3 | R4 | R5 | R6 | R7 | R8 | R9 | R10 |
|-------|----|----|----|----|----|----|----|----|----|-----|
| Output | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Tokens | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Products | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
