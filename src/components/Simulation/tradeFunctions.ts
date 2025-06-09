import type { MarketOffer, Trade } from "../../types/types"
import { Resident } from "../../models/Resident"

export function findMarketOffer(
  buyer: Resident,
  sellers: Resident[]
): MarketOffer | null {
  const offers: MarketOffer[] = sellers
    .map((seller, index) => ({
      sellerId: seller.id,
      sellerIndex: index,
      available: seller.sustenance,
      price: 1 // later: dynamic pricing logic
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

export const resolveSingleTrade =
  (residents: Resident[], resident: Resident, marketOffer: MarketOffer, tick: number): { residents: Resident[], tradeData: Trade } | null => {
    if (!residents || !resident || !marketOffer) {
      console.warn('Missing data for trade'); return null
    }
    const buyer = resident
    let tradeData: Trade = {
      timestamp: tick,
      buyerId: resident.id,
      sellerId: marketOffer.sellerId,
      sellerType: 'resident',
      product: 'sustenance',
      price: marketOffer.price,
      tokenAmount: 0,
      productAmount: 0
    }
    // No trade possible, return unchanged
    if (buyer.status === 'deceased' || marketOffer.available <= 1) {
      console.warn('Trade skipped - buyer dead or market empty')
      return { residents, tradeData }
    }

    /* Start trades */

    const newResidents = [...residents] // Don't mutate original

    // Attempt trade
    const newTradeData = buyer.tryBuyConsumables(marketOffer, tradeData)
    if (!newTradeData) {
      console.warn('Trade failed: tryBuyConsumables returned null')
      return null
    }


    // Find and validate seller
    const seller = newResidents.find(r => r.id === marketOffer.sellerId)
    if (!seller) return null

    // Complete trade
    seller.removeSustenance(newTradeData.productAmount)

    return {
      residents: newResidents,
      tradeData: newTradeData
    }
  }

/* 
//Refactor this to handle whole residents at once
export function resolveTrades(residents: Resident[]): Resident[] {
  return residents.map((buyer) => {
    if (buyer.status === 'deceased' || buyer.consumable >= 7) return buyer

    const result = buyer.tryBuyConsumables(7, residents)
    if (result) {
      const seller = residents[result.sellerIndex]
      seller.removeSustenance(result.consumableAmount)
    }
    return buyer
  })
}*/