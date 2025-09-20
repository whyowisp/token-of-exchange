## Token of Exchange — an Iterative Method

This simulation explores how an isolated village of residents might implement an economic system using a common token as a medium of exchange. Each iteration models production, trade, and token circulation, allowing observation of how wealth concentrates, how productivity and technological advances affect the economy, and how token supply influences purchasing power. The experiment abstracts complex dynamics of money, debt, and consumption to reveal fundamental mechanisms behind economic flows in a simple, iterative framework.

## Base assumptions

A virtual isolated village with 10 residents, the Elder, and a Bank.

- All exchanges must be made using the Token.
- Each individual *must not* consume their own product
- Only one type of product exists, covering every possible need (simplifying consumption decisions).
- Only one type of company output this single product.
- Product prices are calculated per unit:

> P<sub>unit</sub> = M1<sub>total</sub> / Q 
>
>M1<sub>total</sub> = Total token supply  
Q = Total number of products

- Technological advancements can increase production output (not included in the alpha model).
- Centralizing capital and labor within a company structure enhances output. *(Simulation rule, not a real-world assumption)*
- Consumption is 1 product/resident/round

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


