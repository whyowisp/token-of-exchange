import type { MarketOffer, SellerType, ActivityLogEntry } from "../types/types"
import { Resident } from "../models/Resident"

export function findMarketOffer(
  buyer: Resident,
  sellers: Resident[],
  tick: number
): MarketOffer | null {
  const offers: MarketOffer[] = sellers
    .map((seller, index) => ({
      sellerId: seller.id,
      sellerIndex: index,
      sellerType: 'resident' as SellerType,
      product: 'sustenance',
      available: seller.sustenance,
      price: 1, // later: dynamic pricing logic
      createdTick: tick
    }))
    .filter(offer =>
      offer.sellerId !== buyer.id &&
      offer.available > 0
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
  if (Math.floor(tick * 10) % residents.length * 2 !== 0) {
    console.log(`Trade resolution skipped for tick ${tick} - only allow trades on certain ticks`)
    return null // Only allow trades on certain ticks (e.g., weekly) HACK. REmove
  }
  if (!Array.isArray(residents) || !buyer || !marketOffer) {
    console.warn('Invalid input for trade resolution')
    return null
  }

  if (buyer.status === 'deceased' || marketOffer.available <= 1) {
    console.warn('Trade skipped - buyer dead or market empty')
    return null
  }

  const seller = residents.find(r => r.id === marketOffer.sellerId)
  if (!seller) {
    console.warn('Seller not found')
    return null
  }

  const totalCost = marketOffer.price
  const amountToBuy = 1 // For now assume 1 unit per trade

  if (buyer.tokens < totalCost || seller.sustenance < amountToBuy) {
    console.warn('Trade failed - insufficient funds or product')
    return null
  }

  // Clone residents array
  const newResidents = [...residents]
  const buyerClone = newResidents.find(r => r.id === buyer.id)!
  const sellerClone = newResidents.find(r => r.id === seller.id)!

  // Validate buyer's ability to buy sustenance
  const tradeResult = buyerClone.evaluatePurchaseOffer(marketOffer)
  if (!tradeResult) {
    console.warn('Trade failed - buyer unable to buy sustenance')
    return null
  }

  // Perform the trade
  buyerClone.removeTokens(tradeResult.totalCost)
  buyerClone.addConsumables(tradeResult.tradeAmount)

  sellerClone.addTokens(tradeResult.totalCost)
  sellerClone.removeSustenance(tradeResult.tradeAmount)

  // Create activity logs
  const buyerLog: ActivityLogEntry = {
    tick,
    sourceId: buyerClone.id,
    sourceType: 'resident',
    action: 'buy',
    targetId: sellerClone.id,
    targetType: 'resident',
    metadata: {
      product: 'sustenance',
      price: marketOffer.price
    },
    changes: {
      tokens: -tradeResult.totalCost,
      consumables: tradeResult.tradeAmount,
      sustenance: 0
    }
  }
  addActivityLogEntry(buyerLog)

  const sellerLog: ActivityLogEntry = {
    tick,
    sourceId: sellerClone.id,
    sourceType: 'resident',
    action: 'sell',
    targetId: buyerClone.id,
    targetType: 'resident',
    metadata: {
      product: 'sustenance',
      price: marketOffer.price
    },
    changes: {
      tokens: tradeResult.totalCost,
      consumables: 0,
      sustenance: -tradeResult.tradeAmount,
    }
  }
  addActivityLogEntry(sellerLog)

  return newResidents
}
