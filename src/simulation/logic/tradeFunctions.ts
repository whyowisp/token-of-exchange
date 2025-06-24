import { makeStyles } from "@mui/material"
import type {
  MarketOffer,
  SellerType,
  ActivityLogEntry,
  Resident,
} from "../types/types"

import {
  addConsumables,
  addTokens,
  removeSustenance,
  removeTokens,
} from "./residentFunctions"


export function findMarketOffer(
  buyer: Resident,
  sellers: Resident[],
  tick: number
): MarketOffer {
  const offers: MarketOffer[] = sellers
    .map((seller, index) => ({
      sellerId: seller.id,
      sellerName: seller.name,
      sellerIndex: index,
      sellerType: "resident" as SellerType,
      product: "sustenance",
      available: seller.sustenance,
      price: 1, // later: dynamic pricing logic
      createdTick: tick,
    }))
    .filter(
      (offer) => offer.sellerId !== buyer.id && offer.available > 0
    )

  //if (offers.length === 0) return null

  // Choose randomly from available offers
  const selected = offers[Math.floor(Math.random() * offers.length)]
  return selected
}

export const resolveSingleTrade = (
  residents: Resident[],
  buyer: Resident,
  marketOffer: MarketOffer,
  tick: number,
  addActivityLogEntry: (entry: ActivityLogEntry) => void
): Resident[] | null => {
  if (!Array.isArray(residents) || !buyer) {
    console.warn('residents not existing or buyer not existing')
    return null
  }
  if (buyer.status === "deceased") {
    addActivityLogEntry({
      tick,
      sourceId: buyer.id,
      sourceType: 'resident',
      action: 'death',
      message: `Buyer ${buyer.name} cannot make the purchase.`
    })
    return null
  }

  if (!marketOffer) {
    console.info('Market offer does not exist')
    addActivityLogEntry({
      tick,
      sourceId: -1,
      sourceType: "market",
      action: 'trade',
      message: `Market is empty, no sellers found.`
    })
    return null
  }

  if (marketOffer.available < 1) {
    console.info('Market offer amount insufficient -> no trade.')
    addActivityLogEntry({
      tick,
      sourceId: marketOffer.sellerId,
      sourceType: "market",
      action: 'trade',
      metadata: { product: "sustenance", price: marketOffer.price, available: marketOffer.available },
      message: `Market offer failed. Produce available: ${marketOffer.available} for ${marketOffer.price}/each`
    })
    return null
  }

  const evaluationResult = evaluatePurchaseOffer(buyer, marketOffer)
  addActivityLogEntry({
    tick,
    sourceId: buyer.id,
    sourceType: "resident",
    action: "evaluate",
    targetId: marketOffer.sellerId,
    targetType: "resident",
    metadata: { product: "sustenance", price: marketOffer.price },
    message: evaluationResult.message,
  })

  // No trade this time
  if (evaluationResult.totalCost < 0 || evaluationResult.tradeAmount < 0) return null

  const newResidents = residents.map(r => ({ ...r }))

  const buyerIndex = newResidents.findIndex((r) => r.id === buyer.id)
  const sellerIndex = newResidents.findIndex((r) => r.id === marketOffer.sellerId)

  if (buyerIndex === -1 || sellerIndex === -1) {
    console.warn('Buyer or seller not found in newResidents')
    return null
  }

  const currentBuyer = newResidents[buyerIndex]
  const currentSeller = newResidents[sellerIndex]

  const updatedBuyer = addConsumables(
    removeTokens(currentBuyer, evaluationResult.totalCost),
    evaluationResult.tradeAmount
  )

  const updatedSeller = removeSustenance(
    addTokens(currentSeller, evaluationResult.totalCost),
    evaluationResult.tradeAmount
  )

  newResidents[buyerIndex] = updatedBuyer
  newResidents[sellerIndex] = updatedSeller

  addActivityLogEntry({
    tick,
    sourceId: updatedBuyer.id,
    sourceType: "resident",
    action: "buy",
    targetId: updatedSeller.id,
    targetType: "resident",
    metadata: { product: "sustenance", price: marketOffer.price },
    changes: {
      tokens: -evaluationResult.totalCost,
      consumables: evaluationResult.tradeAmount,
      sustenance: 0,
    },
  })

  addActivityLogEntry({
    tick,
    sourceId: updatedSeller.id,
    sourceType: "resident",
    action: "sell",
    targetId: updatedBuyer.id,
    targetType: "resident",
    metadata: { product: "sustenance", price: marketOffer.price },
    changes: {
      tokens: evaluationResult.totalCost,
      consumables: 0,
      sustenance: -evaluationResult.tradeAmount,
    },
  })

  return newResidents
}

const evaluatePurchaseOffer = (
  resident: Resident,
  marketOffer: MarketOffer
): { totalCost: number; tradeAmount: number, message: string } => {
  if (marketOffer.available <= 0) {
    return { totalCost: -1, tradeAmount: -1, message: `Market offer for sustenance is not available` }
  }

  // Calculate how much the resident can afford
  const maxAffordable = Math.floor(resident.tokens / marketOffer.price)
  if (maxAffordable <= 0) {
    return {
      totalCost: -1, tradeAmount: -1, message: `Resident ${resident.name} cannot afford any sustenance at price ${marketOffer.price}`
    }
  }

  // Optional: calculate how much the resident "needs"
  const missing = Math.max(0, 14 - (resident.consumables ?? 0)) // aiming for 14 units
  const desiredAmount = Math.min(missing, maxAffordable, marketOffer.available)

  if (desiredAmount <= 0) {
    return {
      totalCost: -1, tradeAmount: -1, message: `Resident ${resident.name} does not need any sustenance at this time`
    }
  }

  const totalCost = desiredAmount * marketOffer.price

  return {
    totalCost,
    tradeAmount: desiredAmount,
    message: `Resident ${resident.name} evaluated market offer and decided to buy ${desiredAmount} 
    units of sustenance for a total cost of ${totalCost} 
    tokens from ${marketOffer.sellerName || 'unknown seller'}.`
  }
}
