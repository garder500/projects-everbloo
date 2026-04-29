# Global Introspection - API-AERIAL

Ce document résume les fonctionnalités disponibles par fournisseur.

## Matrice des Features (Standard)

| FEATURE | AF | SABRE | AMADEUS | GOKYTE | IB | TURKISHA | EK | ACCELYA | TRANSAVIA | BA |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| Shopping | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| OfferPrice | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Reprice | ❌ | ✅ | ✅ | ❌ | ✅ | ❌ | ✅ | ❌ | ❌ | ✅ |
| Booking/OrderCreate | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Retrieve/OrderView | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Cancel/OrderCancel | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Reshop/Exchange | ✅ | ✅ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Seats/SeatMap | ✅ | ✅ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Ancillaries/ServiceList | ✅ | ✅ | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

## Matrice des Features (GDS ONLY)

| FEATURE | SABRE | AMADEUS |
| :--- | :---: | :---: |
| Cryptic | ✅ | ❌ |
| Queue | ✅ | ✅ |
| Profile | ✅ | ✅ |
| PassiveSegment | ✅ | ✅ |
| MiniRules | ❌ | ✅ |
| Upsell | ✅ | ✅ |

## Preuves d'Implémentation (Refs)

<details>
<summary><b>AF</b> (9 features)</summary>

- **Ancillaries/ServiceList** : `utils\AFKL\offer.utils.js` (Ligne 161)
- **Booking/OrderCreate** : `utils\AFKL\order\orderCreate.utils.js` (Ligne 1)
- **Cancel/OrderCancel** : `utils\AFKL\order\orderCancel.utils.js` (Ligne 1)
- **OfferPrice** : `utils\AFKL\offer.utils.js` (Ligne 1)
- **Reshop/Exchange** : `utils\AFKL\order\orderReshop.utils.js` (Ligne 1)
- **Retrieve/OrderView** : `utils\AFKL\order\orderRetrieve.utils.js` (Ligne 1)
- **Seats/SeatMap** : `utils\AFKL\seat.utils.js` (Ligne 226)
- **Shopping** : `utils\AFKL\shopping.utils.js` (Ligne 1)
- **Upsell** : `utils\AFKL\offer.utils.js` (Ligne 184)

</details>

<details>
<summary><b>SABRE</b> (14 features)</summary>

- **Ancillaries/ServiceList** : `utils\SABRE\serviceList.utils.js` (Ligne 1)
- **Booking/OrderCreate** : `utils\SABRE\orderCreation.utils.js` (Ligne 1)
- **Cancel/OrderCancel** : `utils\SABRE\orderCancel.utils.js` (Ligne 1)
- **OfferPrice** : `utils\SABRE\offer.utils.js` (Ligne 1)
- **Reprice** : `utils\SABRE\types\repriceOrder.ts` (Ligne 1)
- **Reshop/Exchange** : `utils\SABRE\types\OrderReshopRS.ts` (Ligne 1)
- **Retrieve/OrderView** : `utils\SABRE\orderRetrieve.utils.js` (Ligne 1)
- **Seats/SeatMap** : `utils\SABRE\seatMap.utils.js` (Ligne 1)
- **Shopping** : `utils\SABRE\shopping.utils.js` (Ligne 1)
- **Cryptic** : `controllers\SABRE\cryptic.controller.js` (Ligne 1)
- **PassiveSegment** : `utils\SABRE\export.utils.js` (Ligne 14)
- **Profile** : `utils\SABRE\import.utils.js` (Ligne 271)
- **Queue** : `utils\SABRE\order\change.gds.js` (Ligne 386)
- **Upsell** : `utils\SABRE\types\BFMSchemaFull.ts` (Ligne 3209)

</details>

<details>
<summary><b>AMADEUS</b> (11 features)</summary>

- **Booking/OrderCreate** : `utils\AMADEUS\order.utils.js` (Ligne 1408)
- **Cancel/OrderCancel** : `utils\AMADEUS\cancel.utils.js` (Ligne 1)
- **OfferPrice** : `utils\AMADEUS\offer.utils.js` (Ligne 1)
- **Reprice** : `utils\AMADEUS\reprice.utils.js` (Ligne 1)
- **Retrieve/OrderView** : `controllers\AMADEUS\order.controller.js` (Ligne 388)
- **Shopping** : `utils\AMADEUS\shopping.utils.js` (Ligne 1)
- **MiniRules** : `utils\AMADEUS\miniRules.utils.js` (Ligne 1)
- **PassiveSegment** : `utils\AMADEUS\passifSegment.utils.js` (Ligne 30)
- **Profile** : `utils\AMADEUS\profile.utils.js` (Ligne 1)
- **Queue** : `utils\AMADEUS\queuePnr.utils.js` (Ligne 1)
- **Upsell** : `utils\AMADEUS\upsell.utils.js` (Ligne 1)

</details>

<details>
<summary><b>GOKYTE</b> (8 features)</summary>

- **Ancillaries/ServiceList** : `utils\GOKYTE\arcillaries.utils.js` (Ligne 7)
- **Booking/OrderCreate** : `utils\GOKYTE\order\orderCreate.utils.js` (Ligne 1)
- **Cancel/OrderCancel** : `utils\GOKYTE\cancel.utils.js` (Ligne 1)
- **OfferPrice** : `utils\GOKYTE\offer.utils.js` (Ligne 1)
- **Reshop/Exchange** : `utils\GOKYTE\order.utils.js` (Ligne 1616)
- **Retrieve/OrderView** : `services\GOKYTE\global.service.js` (Ligne 285)
- **Seats/SeatMap** : `utils\GOKYTE\seats.utils.js` (Ligne 2)
- **Shopping** : `utils\GOKYTE\shopping.utils.js` (Ligne 1)

</details>

<details>
<summary><b>IB</b> (10 features)</summary>

- **Ancillaries/ServiceList** : `utils\IBERIA\service.utils.js` (Ligne 3)
- **Booking/OrderCreate** : `utils\IBERIA\order\orderCreate.utils.js` (Ligne 1)
- **Cancel/OrderCancel** : `utils\IBERIA\order\orderCancel.utils.js` (Ligne 1)
- **OfferPrice** : `utils\IBERIA\offer.utils.js` (Ligne 1)
- **Reprice** : `utils\IBERIA\order\orderReshop.utils.js` (Ligne 31)
- **Reshop/Exchange** : `utils\IBERIA\order\orderReshop.utils.js` (Ligne 1)
- **Retrieve/OrderView** : `utils\IBERIA\order\orderRetrieve.utils.js` (Ligne 1)
- **Seats/SeatMap** : `utils\IBERIA\seat.utils.js` (Ligne 148)
- **Shopping** : `utils\IBERIA\shopping.utils.js` (Ligne 1)
- **Upsell** : `utils\IBERIA\offer.utils.js` (Ligne 47)

</details>

<details>
<summary><b>TURKISHA</b> (9 features)</summary>

- **Ancillaries/ServiceList** : `utils\TURKISHA\ocn.utils.js` (Ligne 641)
- **Booking/OrderCreate** : `utils\TURKISHA\order\orderCreate.utils.js` (Ligne 1)
- **Cancel/OrderCancel** : `utils\TURKISHA\order\cancelDossier.utils.js` (Ligne 3)
- **OfferPrice** : `utils\TURKISHA\Offer\Offer.utils.js` (Ligne 1)
- **Reshop/Exchange** : `utils\TURKISHA\order\orderReshop.utils.js` (Ligne 1)
- **Retrieve/OrderView** : `utils\TURKISHA\order\orderRetrieve.utils.js` (Ligne 1)
- **Seats/SeatMap** : `utils\TURKISHA\seat.utils.js` (Ligne 189)
- **Shopping** : `utils\TURKISHA\order\orderRebook.utils.js` (Ligne 5)
- **Upsell** : `utils\TURKISHA\constants\base_url.js` (Ligne 164)

</details>

<details>
<summary><b>EK</b> (9 features)</summary>

- **Ancillaries/ServiceList** : `utils\EK\orderCreation.utils.js` (Ligne 211)
- **Booking/OrderCreate** : `utils\EK\orderCreation.utils.js` (Ligne 1)
- **Cancel/OrderCancel** : `utils\EK\orderCancel.utils.js` (Ligne 1)
- **OfferPrice** : `utils\EK\offerPrice.utils.js` (Ligne 1)
- **Reprice** : `utils\EK\orderReshopReprice.utils.js` (Ligne 1)
- **Reshop/Exchange** : `utils\EK\orderReshop.utils.js` (Ligne 1)
- **Retrieve/OrderView** : `utils\EK\orderRetrieve.utils.js` (Ligne 1)
- **Seats/SeatMap** : `utils\EK\seat.utils.js` (Ligne 249)
- **Shopping** : `utils\EK\shopping.utils.js` (Ligne 1)

</details>

<details>
<summary><b>ACCELYA</b> (8 features)</summary>

- **Ancillaries/ServiceList** : `utils\ACCELYA\orderCreation.utils.js` (Ligne 196)
- **Booking/OrderCreate** : `utils\ACCELYA\orderCreation.utils.js` (Ligne 1)
- **Cancel/OrderCancel** : `utils\ACCELYA\orderCancel.utils.js` (Ligne 1)
- **OfferPrice** : `utils\ACCELYA\offerPrice.utils.js` (Ligne 1)
- **Reshop/Exchange** : `utils\ACCELYA\orderReshop.utils.js` (Ligne 1)
- **Retrieve/OrderView** : `utils\ACCELYA\orderRetrieve.utils.js` (Ligne 1)
- **Seats/SeatMap** : `utils\ACCELYA\seat.utils.js` (Ligne 273)
- **Shopping** : `utils\ACCELYA\shopping.utils.js` (Ligne 1)

</details>

<details>
<summary><b>TRANSAVIA</b> (8 features)</summary>

- **Ancillaries/ServiceList** : `utils\TRANSAVIA\order\createDossier.utils.js` (Ligne 946)
- **Booking/OrderCreate** : `utils\TRANSAVIA\order\createDossier.utils.js` (Ligne 19)
- **Cancel/OrderCancel** : `utils\TRANSAVIA\order\cancelDossier.utils.js` (Ligne 5)
- **OfferPrice** : `controllers\TRANSAVIA\offer.controller.js` (Ligne 11)
- **Reshop/Exchange** : `controllers\TRANSAVIA\order.controller.js` (Ligne 334)
- **Retrieve/OrderView** : `utils\TRANSAVIA\order\orderRetrieve.utils.js` (Ligne 1)
- **Seats/SeatMap** : `utils\TRANSAVIA\Seat\seat.service.js` (Ligne 195)
- **Shopping** : `utils\TRANSAVIA\airshopping\shopping.utils.js` (Ligne 1)

</details>

<details>
<summary><b>BA</b> (10 features)</summary>

- **Ancillaries/ServiceList** : `utils\BA\serviceListService.js` (Ligne 1)
- **Booking/OrderCreate** : `utils\BA\orderCreateService.js` (Ligne 1)
- **Cancel/OrderCancel** : `utils\BA\orderCancelService.js` (Ligne 1)
- **OfferPrice** : `utils\BA\offerPriceService.js` (Ligne 1)
- **Reprice** : `utils\BA\orderReshop\reprice.js` (Ligne 1)
- **Reshop/Exchange** : `utils\BA\orderReshopService.js` (Ligne 1)
- **Retrieve/OrderView** : `utils\BA\orderRetrieveService.js` (Ligne 1)
- **Seats/SeatMap** : `utils\BA\seatAvailabilityService.js` (Ligne 1)
- **Shopping** : `utils\BA\shoppingService.js` (Ligne 1)
- **Upsell** : `utils\BA\offerPriceService.js` (Ligne 48)

</details>

## Définition des Fournisseurs

- **AF** : Gère les compagnies **AF, KL**
- **SABRE** : Gère les compagnies **LH, UA, SN, LX, OS, QF, SQ, F1, AV, BR, HA, LO, NH, RJ, SK, GDS**
- **AMADEUS** : Gère les compagnies **GDS**
- **GOKYTE** : Gère les compagnies **U2, FR, 6E, V7, W6, LS, AC, AY, QR, AA**
- **IB** : Gère les compagnies **IB**
- **TURKISHA** : Gère les compagnies **TK**
- **EK** : Gère les compagnies **EK**
- **ACCELYA** : Gère les compagnies **A3, OA**
- **TRANSAVIA** : Gère les compagnies **TO, HV**
- **BA** : Gère les compagnies **BA**
