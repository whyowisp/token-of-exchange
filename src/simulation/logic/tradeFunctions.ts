import type {
  MarketOffer,
  SellerType,
  ActivityLogEntry,
  Resident,
} from "../types/types"

import {
  addConsumables,
  addTokens,
  evaluatePurchaseOffer,
  removeSustenance,
  removeTokens,
} from "./residentOrchestrator"

export function findMarketOffer(
  buyer: Resident,
  sellers: Resident[],
  tick: number
): MarketOffer | null {
  const offers: MarketOffer[] = sellers
    .map((seller, index) => ({
      sellerId: seller.id,
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

  if (offers.length === 0) return null

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
  //if (Math.floor(tick * 10) % (residents.length * 2) !== 0) return null
  //if (!Array.isArray(residents) || !buyer || !marketOffer) return null
  if (buyer.status === "deceased" || marketOffer.available <= 1) return null

  const seller = residents.find(r => r.id === marketOffer.sellerId)
  if (!seller) return null

  const tradeResult = evaluatePurchaseOffer(buyer, marketOffer)
  if (!tradeResult) return null

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
    removeTokens(currentBuyer, tradeResult.totalCost),
    tradeResult.tradeAmount
  )

  const updatedSeller = removeSustenance(
    addTokens(currentSeller, tradeResult.totalCost),
    tradeResult.tradeAmount
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
      tokens: -tradeResult.totalCost,
      consumables: tradeResult.tradeAmount,
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
      tokens: tradeResult.totalCost,
      consumables: 0,
      sustenance: -tradeResult.tradeAmount,
    },
  })

  return newResidents
}


