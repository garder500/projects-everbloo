import { readJsonFile } from "../utils/fileReader";
import type { Root, Offer, TotalFare } from "../types/SABRE";
import { createLookupMaps, buildDirections } from "../utils/sabreUtils";
import { displayOfferDetails } from "./sabreOfferDetails";

export async function handleSabreShopping(filename: string, options: { flightFilter?: string; brandFilter?: string; offerId?: string } = {}) {
  try {
    const content = await readJsonFile<Root>(filename);

    if (!content.groupedItineraryResponse) {
      console.error("Invalid JSON format: missing groupedItineraryResponse");
      return;
    }

    const { groupedItineraryResponse } = content;
    
    // Use helper to create maps
    const maps = createLookupMaps(groupedItineraryResponse);
    const { scheduleMap, legMap, fareComponentMap, baggageChargeMap } = maps;

    if (options.offerId) {
        // Delegate to specific handler
        displayOfferDetails(options.offerId, groupedItineraryResponse.itineraryGroups, maps);
        return;
    }

    // --- LIST MODE ---
    console.log("--- Available Offers ---");

    const offers: any[] = [];
    const filterCode = options.flightFilter ? options.flightFilter.toUpperCase() : null;
    const brandFilter = options.brandFilter ? options.brandFilter.toLowerCase() : null;

    for (const group of groupedItineraryResponse.itineraryGroups || []) {
      const itineraries = group.itineraries || [];
      
      for (const itinerary of itineraries) {
        
        // Use helper to build directions
        const { directions, itineraryFlights } = buildDirections(itinerary, group.groupDescription, legMap, scheduleMap);

        // Apply Flight Filter
        if (filterCode && !itineraryFlights.has(filterCode)) {
            continue;
        }

        const pricingInfos = itinerary.pricingInformation || [];
        for (let i = 0; i < pricingInfos.length; i++) {
          const info = pricingInfos[i];
          if (info.fare) {
            const offer = info.offer;
            const fare = info.fare;
            const offerId = offer?.offerId || `GDS-ITIN-${itinerary.id}-P${i}`;
            const price = fare.totalFare ? `${fare.totalFare.totalPrice} ${fare.totalFare.currency}` : "N/A";
            const company = fare.validatingCarrierCode;

            // Extract Fare Basis and Brand
            const fareBasisCodes = new Set<string>();
            const brandNames = new Set<string>();
            
            const passengerInfos = fare.passengerInfoList || [];
            for (const paxInfo of passengerInfos) {
                const fareComponents = paxInfo.passengerInfo?.fareComponents || [];
                for (const fc of fareComponents) {
                    const desc = fareComponentMap.get(fc.ref);
                    if (desc) {
                        fareBasisCodes.add(desc.fareBasisCode);
                        if (desc.brand && desc.brand.brandName) {
                            brandNames.add(desc.brand.brandName);
                        }
                    }
                }
            }

            const fareBasis = Array.from(fareBasisCodes).join(", ");
            const brand = Array.from(brandNames).join(", ");

            // Apply Brand Filter
            if (brandFilter && !brand.toLowerCase().includes(brandFilter)) {
                continue;
            }

            console.log(`Offer ID: ${offerId}`);
            console.log(`  Price:      ${price}`);
            console.log(`  Company:    ${company}`);
            console.log(`  Fare Basis: ${fareBasis}`);
            console.log(`  Brand:      ${brand}`);
            console.log(`  Route:`);
            for (const dir of directions) {
                console.log(`    [ ${dir.label} ]`);
                for (const seg of dir.segments) {
                    console.log(`      - ${seg}`);
                }
            }
            console.log("---------------------------------------------------");
            
            offers.push({ ...offer, offerId, price: fare.totalFare });
          }
        }
      }
    }

    console.log(`
Total Offers Found: ${offers.length}`);

  } catch (error) {
    console.error("Error processing file:", error);
  }
}