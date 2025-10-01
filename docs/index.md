## The Iterative Method

This simulation explores how an isolated village of residents might implement an economic system using a common token as a medium of exchange. Each iteration models production, trade, and token circulation, allowing observation of how wealth and tokens distributes, how productivity and technological advances affect the economy, and how token supply influences purchasing power. The experiment abstracts complex dynamics of money, debt, and consumption to reveal fundamental mechanisms behind economic flows in a simple, iterative framework.

This page explains how to manually implement and follow the system flow and provides a template. Please check the examples (menu above) of how the template have been used and the findings I have made.

**Please note that this page is *not* the requirements of the application** (though very much related)**! For interested they are found [here](https://github.com/whyowisp/token-of-exchange/blob/main/docs/ToE-requirements.md).**

## Base Assumptions

A virtual isolated village with 10 residents, the Elder, and a Bank.

- All exchanges must be made using the Token.
- All production must be produced trough abstraction called company. No self-sustaining.
- Only one type of product exists, covering every possible need, but the product quality varies.
- Only one type of companies output this single product.
- Technological advancements can increase production output thus increasing productivity.
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

## Notes

### 📌 Resource Volatility Scale (RV) — User Guide

**What it is:**  
RV is a coefficient that describes variations in the *availability* of resources in the economy.  
It captures how external conditions alter how much can be produced.

**What RV measures:**  
- Physical availability of resources (e.g. harvest yield, mine output)  
- External shocks that limit or expand supply (e.g. environmental crises, weather conditions, supply chain disruptions)  

**Why it matters:**  
RV directly affects **production levels**, which in turn influence costs and market prices indirectly:  
- **Production:**  
  P = output_base * w * ln(1 + e * (IE * TP* RV))  
- **Costs and Prices:**  
  Higher output reduces unit cost, lower output raises it. Prices follow from unit cost + margin.

**Important notes:**  
- RV can be greater or less than 1.0, adjusting production up or down.  
- RV does not enter the pricing formula directly. **Its effect on prices is already reflected through the change in unit costs.**  
- This avoids double-counting and keeps the model consistent.

**Example:**  
- RV = 2.0 → resources are abundant → production increases → unit costs fall → price tends to decrease.  
- RV = 0.5 → resources scarce → production decreases → unit costs rise → price tends to increase.
