---
url: "https://developers.amadeus.com/api-library/soap/functional-doc/669/doc-read/103627?serviceVersion=10.1"
download_url: "https://developers.amadeus.com/PAS-EAS/api/download/comp/4d4ad2cb456c02633f463a055ab70584/103627/UG_WBS_Fare_QuoteItinerary_FITQPQ_10.1_019/UG_WBS_Fare_QuoteItinerary_FITQPQ_10.1_019.html"
title: "UG_WBS_Fare_QuoteItinerary_FITQPQ_10.1_019"
source: "amadeus"
service_id: "669"
service_name: "Fare_QuoteItinerary"
version: "12.2"
document_id: "103627"
doc_version: "10.1"
doc_type: "User guide"
scraped_at: "2026-07-15T10:14:43.997Z"
---
# Function: Fare\_QuoteItinerary

* * *

## 1 Overview

The QuoteItinary transaction (FQP) quotes fares for passenger types without existing reservations (PNR). Pricing is executed according to the principles of IATA resolutions as well as according to specific user requirements, if industry conform or individual.

The QuoteItinary transaction prices itineraries with specified or open variable data such as dates and reservation booking designators.

## 1.1 Supported Operations

-   Booking source information details.

The following options can be used:

-   Past travel and validation date.
-   Expanded Parameters.
-   Point-of-sale override.
-   Ticketing override.
-   IATA rules source override.
-   Price in a foreign currency.
-   Select fares in a foreign currency.
-   Manual BSR processing.
-   Tax and Surcharge options.
-   Unifare option and corporate
-   Validating Carrier.
-   Alternate Booking Code option.
-   Override Booking Data option.
-   Frequent Flyer process.
-   Paper and E-Ticket option.
-   OB Fee input option.
-   Zap off.
-   Diagnostic Tool (the diagnostic panel is not returned, the option only allow to price a specific result).

Possibility for pricing requests of

-   Passenger discount or passenger type code specified and companion fares only to price
-   Cummulative and additive discounts

Possibility to specify flight details

-   segment identification
-   carrier code
-   flight number
-   booking code
-   departure date
-   departure city
-   departure time
-   arrival time
-   arrival city
-   transfer / stopover / unknown indicator
-   breakpoint - Fare break point at the next city
-   turnaround point - Turnaround point at the next city
-   no breakpoint - Inhibit fare break point at the next city
-   route code - Global routing via the specified route-code
-   operating carrier code
-   equipment type

Not included

-   Pricing by Fare Basis (not existing for FQP cryptic parser)
-   Technical stops

-   At least two cities (inbound and outbound cities) must be given in input. If only one city is provided, the system will reject the request.
-   For each passenger a number must be provided (**_specificTravellerDetails_**) to allow association of priced fare combination with passenger in reponse
-   At least one passenger type code must be provided per request (one **_fareInfo_** with the first data element filled), and the first data element of each other provided **_fareInfo_** must also be filled (with "ADT" by default).
-   At least the Departure date for the first flight segment must be provided.

## 1.2 Limitations

The number of segments in the itinerary the system can price is limited:

-   For a round or circle trip, 16 flight segments, or 15 flight segments and 1 surface segment, or 14 flight segments and 2 surface segments.
-   For a one-way trip, 14 flight segments with a maximum of 2 surface segments.

## 1.3 Unsupported Operations

-   The diagnostic tool option only allows to price a specific result. The diagnostic panel is not returned.

-   The Lowest Fare option (/L) doesn't return the fare calculation data. The subsequent DisplayFareCalculation service should be used to get the fare calculation data.
-   The D2 Commercial display parameter switch (USE CRT CARRIER AS DEFAULT) is not supported.

## 1.4 Prerequisites

Office profile security

Data availability

## 2 Building A Query

All cryptic options of the FQP transaction can be requested with the query of the 1A PSP service informative pricing. The number of different passengers can be up to 6 (similar to cryptic FQP).

By specifying the lowest fare finder option in the query only the cheapest fare construction per passenger is returned.

Functional data in the query:

**FUNCTIONAL DATA**

**Format**

**REP**

**XML element**

**MESSAGE FUNCTION**

741 : Itinerary pricing

3an

  

messageActionDetails/

messageFunctionDetails/

messageFunction

**A. PASSENGER INFORMATION**

  

**1-9**

**passengerInfoGroup**

1.Number of passengers

1-2n

  

segmentRepetitionControl/

segmentControlDetails/

numberOfPAx

2.Passengers reference

  

1-99

specificTravellerDetails/

travellerDetails

2.1 Reference

1-2 n

  

referenceNumber

3\. Passenger type code

1-3 an

1

passengerTypeGroup/

fareInfo/

valueQualifier

4\. Passenger discounts

1-6 an

1-3

passengerTypeGroup/

fareInfo/

fareTypeGrouping/

discountCode

5\. Form of Payment Information

  

1-9

formOfPayment/

formOfPaymentDetails

a. Form of payment

1-3 an

  

type

b. Identification code (credit card number, …)

1-20 an

  

creditCardNumber

c. Amount to charge on this FOP in currency of sale

1-12 n

  

chargedAmount

6\. Forced companion fares only (WFC)

3an

  

discountAndPenaltyInfo/

discountPenaltyQualifier

  

  

  

  

**B. OPTIONS**

  

**1**

**pricingTktOptionGroup**

**1\. Past travel and validation date**

6 n

1

pricingTicketingDetails/

productDateTimeDetails/

departureDate

**2\. Expanded parameters**

  

**1-9**

fareQualifierDetails/

discountDetails

a. Expanded parameter

(NAP, NDA, NMM, NMN, NMX, NPE, NRF, PTC, AP, DA, MM, MN, MX, PE, RF, NR, EU)

1-3 an

  

fareQualifier

b. Expanded parameter flat amount

1-12an

  

amount

c. Expanded parameter percentage amount

1-12an

  

percentage

**3\. Point-of-sale override**

3-5 an

**1**

pricingTicketingDetails/

locationDetails/

pointOfSaleOverrideCity

**4\. Ticketing City override**

3-5 an

1

pricingTicketingDetails/

otherLocationDetails/

pointOfTicketingOverrideCity

**5\. IATA rules source override** (IAT)

1-3 an

1

pricingTicketingDetails/

priceTicketDetails/

indicators

**6\. Non corporate Unifare Details**

(RP : Public, RU : Unifares)

1-3 an

1-2

pricingTicketingDetails/

priceTicketDetails/

indicators

**7\. Validating carrier option**

  

**1**

  

1.Validation carrier Qualifier (VC)

1-3 an

1

pricingTicketingDetails/

priceTicketDetails/

indicators

2.Validation carrier

2-3 an

1

pricingTicketingDetails/

companyDetails/

marketingCompany

**8\. Override booking data option (OBD)**

1-3 an

**1**

pricingTicketingDetails/

priceTicketDetails/

indicators

**9\. Frequent Flyer process**

  

**1**

  

1.Frequent Flyer process qualifier (MFF)

1-3 an

1

pricingTicketingDetails/

priceTicketDetails/

indicators

2.Frequent Flyer process carrier

2-3 an

1

pricingTicketingDetails/

companyDetails/

marketingCompany

**10\. Paper and E-Ticket option**

E-Ticket only : ET or E

Paper Ticket only : PT or P

Paper and E-Ticket : EP

2-3 an

1

pricingTicketingDetails/

priceTicketDetails/

indicators

**11\. Price and detail Lowest Fare option (LF)**

1-3 an

**1**

pricingTicketingDetails/

priceTicketDetails/

indicators

  **12\. ZZ Tax**

  

1

optionInfoGroup/

optionInfo/

selectionDetails

   12.1. Qualifier (TCH)

3an

  

  option

   12.2. Value (1)

1n

  

  optionInformation

  

  

  

  

**C. CONVERSION AND CURRENCY OPTIONS**

  

**1**

**conversionRate/**

**1\. Price in a foreign currency**

  

**1**

conversionRateDetails

a. Price in foreign currency qualifier (FC)

1-3 an

  

conversionType

b. Price in foreign currency code

3 an

  

currency

  

  

  

  

**2\. Select fares in a foreign currency**

  

**1**

conversionRateDetails

a.Select fares in a foreign currency qualifier (FS)

1-3 an

  

conversionType

b.Select fares in a foreign currency code

3 an

  

currency

  

  

  

  

**3\. Manual BSR processing**

  

**1**

conversionRateDetails

a.Manual rate input qualifier (BR)

1-3 an

1

conversionType

b.Manual rate type

USR : User specified rate

BSR : Bankers seller rate

1-3 an

1

rateType

c.Manual rate value

1-18 n

1

pricingAmount

  

  

  

  

**D.TAX AND SURCHARGE OPTIONS**

  

**20**

**taxOptionsInfoGroup**

1.Tax option qualifier

E : Tax exemption

700 : Add taxes

AC : Add all taxes for specified country

WC : Withhold all taxes for specified country

W : Withhold all taxes

WQ : Withhold Q-Surcharge

1-3 an

1

taxProcessingInfo/

taxCategory

2.Tax details

  

1-9

taxProcessingInfo/

taxDetails

a. Tax amount or percentage to add

1-6 an

  

rate

b. Tax country code

1-3 an

  

countryCode

c. Tax type code

1-3 an

  

taxTypeCode

d. Tax amount or percentage qualifier

1-3 an

  

taxAmountOrPercentageQual

  

  

  

  

**E. Corporate Unifare Details**

  

**1**

**corporateFareInfo/**

**corporateFareIdentifiers**

1\. Unifare Qualifier (Unifares : RU)

1-3 an

  

fareQualifier

2\. Corporate Number/Name

1-12 an

1-6

identifyNumber

  

  

  

  

**F. Alternate-Booking Code option**

  

**1**

bookingClassInfoGroup/

productInfo

1.Alternate booking code qualifier (ABC)

1-3 an

  

productDetailsQualifier

2.Alternate booking code value

1-2 an

**1**

bookingClassDetails/

designator

  

  

  

  

**G. Fees Information options**

  

**1-9**

feeOptionsEncapInfo/

feeOptionInfoGroup

 1.General fee type (OA,OB,OC)

OA : Booking fees

OB : Ticketing fees

OC :  Service fees

1-2an

  

feeTypeInfo/

carrierFeeDetails/

type

 2.Option

IN : Include fees

EX : Exclude all automated fees

1-3an

  

feeTypeInfo/

carrierFeeDetails/

optionInformation

3.VAT percentage to apply to such fees

  

1

rateTaxInfo/

monetaryDetails

a. Percentage

1-12an

  

amount

b. Qualifier (VAT)

1-3an

  

typeQualifier

4.Fee details

  

1-99

  

a. Subtype

1-3an

  

feeDetailsInfoGroup/

feeInfo/

dataTypeInformation/

type

b. Option (Include/exclude specific fee)

(FEX, FIN)

1-3an

  

feeProcessingInfo/

carrierFeeDetails/

type

c. Amount to be charged on this FOP subcode

  

1

associatedAmountsInfo/

monetaryDetails

Qualifier (C)

1-3an

  

typeQualifier

value

1-12an

  

amount

Currency (default selling currency)

1-3an

  

currency

  

  

  

  

**H. General flight segment information**

  

**16**

requestedSegmentInfoGroup

1.Flight details

  

1

flightSegmentInfoGroup/

travelProductInfo

a. Carrier code

2-3an

  

companyDetails/

marketingCompany

b. Flight number

1-5an

  

flightIdentification

flightNumber

c. Reservation booking class

1-2an

  

flightIdentification/

bookingClass

b. Departure date

6n

  

flightDate/

departureDate

d. Departure city

3an

  

boardPointDetails/

departureCity

e. Departure time

4n

  

flightDate/

departureTime

f. Arrival date

6n

  

flightDate/

arrivalDate

g. Arrival time

4n

  

flightDate/

arrivalTime

h. Arrival city

3an

  

offpointDetails/

arrivalCity

i. Arrival change date indicator

1n

  

flightDate/

dateVariation

k. Operating carrier code

2-3an

  

companyDetails/

operatingCompany

l. Equipment type

1-3an

  

additionalProductDetails/

legDetails/

equipment

j. Special flight segment indicators

  

1

flightTypeDetails

1.Forced transfer (T) / stopover (V) / unknown (U) indicator

1-6an

  

connectionIndicator

2\. Breakpoint / no breakpoint

BM : Fare break point at the next city

BN : Inhibit fare break point at the next city

1-6an

  

breakpointIndicator

3\. Turnaround point

PT : Turnaround point at the next city

1-6an

  

turnaroundIndicator

4\. FlightIndicator / Breakpoint after segment for  
     - Zap Off (ZBP)  
     - Pricing By Fare Basis (PBP)  
     - Diagnostic Tool (DBP)

1-6an

6

flightIndicator

2\. Route code  
    Global routing via the specified route-code

1-3an

1

fareQualifierDetails/

movementType

3\. Booking code informative pricing

1-2an

1

bookingClassInfoGroup/

productInfo/

bookingClassDetails/

designator

4\. Segment identification

WL : Waitlist

B : Flown

SB : Stand-by

OK : Confirmed

OPE : Opened

1-3an

1

relatedProductInfo/

statusCode

5\. Segment number

1-3n

1

segmentPricingInfoGroup/

travelItineraryInfo/

itemNumber

  

  

  

  

**I. Zap off option per flight segment**

  

**1**

fareQualifierDetails/

discountDetails

a. Zap off based or total amount qualifier

720 or B : Based

721 or T : Total

1-3an

  

fareQualifier

b. Zap off TicketDesignator

1-15an

  

rateCategory

c. Zap off amount

1-8an

  

amount

d. Zap off percentage amount

1-8an

  

percentage

  

  

  

  

**J. Diagnostic Tool options per flight segment**

  

**1**

fareQualifierDetails/

a. Diagnostic Tool fare basis (DFB) or fare family (DFF) qualifier

1-3an

1

discountDetails\[0\]/

fareQualifier

b. Diagnostic Tool fare basis or fare family

1-15an

1

discountDetails\[0\]/

rateCategory

c. Diagnostic Tool Booking Code details

1-2an

1

discountDetails\[1\]/

rateCategory

  

  

  

**H. Form of Payment Information**

  

**9**

**formOfPaymentInfo/**

**formOfPaymentDetails**

1\. Form of payment

1-3 an

  

type

2.Identification code (credit card number, …)

1-20 an

  

creditCardNumber

3\. Amount to charge on this FOP in currency of sale

1-12 n

  

chargedAmount

## 2.1 Sub Structure: Example of query

## 2.1.1 Description

Date : 01AUG12

Origin : FRA

Destination : LON

Passenger type : ADT

## 2.1.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItinerary xmlns="http://xml.amadeus.com/FITQPQ\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <passengerInfoGroup> <segmentRepetitionControl> <segmentControlDetails> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </segmentRepetitionControl> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeGroup> <fareInfo> <valueQualifier>ADT</valueQualifier> </fareInfo> </passengerTypeGroup> </passengerInfoGroup> <requestedSegmentInfoGroup> <originAndDestinationDetails> </originAndDestinationDetails> <flightSegmentInfoGroup> <travelProductInfo> <flightDate> <departureDate>010812</departureDate> </flightDate> <boardPointDetails> <departureCity>FRA</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>LON</arrivalCity> </offpointDetails> </travelProductInfo> </flightSegmentInfoGroup> </requestedSegmentInfoGroup> </Fare\_QuoteItinerary>

## 3 Receiving A Reply

The informative pricing returns a list of fare construction which is limited to 60 fare constructions in total. Depending on the chosen booking codes for the flight segment the fare constructions are well or badly booked. A booking status is returned per fare construction.

The reply message can become very long for very open requests. Therefore it is recommended to specify in the query per flight segment the booking class, the departure date, connection indicator between flight segments and to limit the informative pricing results by options.

Functional data in the reply:

**FUNCTIONAL DATA**

**MaxRep**

**Type**

**Xml elements**

**I- Message function**

741 : Itinerary pricing

  

3an

messageActionDetails/

messageFunctionDetails/

messageFunction

  

  

  

  

**Quote itinerary reply**

1

  

**allFaresInfoGroup**

**II - Currency conversion information**

3

  

**involvedCurrenciesInfo/**

**conversionRateDetails**

II.1 - Qualifier

\- selling currency : 707

\- origin currency : 705

  

3an

conversionType

II.2 - Currency

  

3an

currency

**III - Flight information**

16

  

**flightInfoGroup**

III.1 - Departure point

  

3an

involvedFlightInfo/

boardPointDetails/

trueLocationId

III.2 - Arrival point

  

3an

involvedFlightInfo/

offpointDetails/

trueLocationId

III.3 - Marketing carrier

  

2an

involvedFlightInfo/

companyDetails/

marketingCompany

III.4 - Segment number

  

1-3n

itineraryInfoGroup/

travelItineraryInfo/

segmentItemNumber

**IV - Product information**

99

  

**fareProductInfoGroup**

**IV.1 - General information**

1

  

generalAndIdInfo/

segmentControlDetails

\-Product reference

  

1-2n

productReference

\-Number of passengers

  

1-2n

numberOfPAx

**IV.2 - Passengers information**

1

  

specificTravellerDetails

  

99

  

travellerDetails

\-Passenger reference

  

1-2n

referenceNumber

\-PTC and Discounts

5

1-6an

passengerTypeInfoGroup/

fareInfo/

fareTypeGrouping/

aggregatePTCDiscount

\-Infant indicator

IN : Infant

  

2an

passengerTypeInfoGroup/

fareInfo/

fareDetails/

passengerTypeQualifier

**IV.3 - Pricing/Ticketing information**

1

  

passengerTypeInfoGroup/

pricingticketingDetails

\-Type of fare indictor

RA: ATPCO nego fares - CAT35

RB: ATPCO nego corporate fares

RC: Amadeus Nego Corporate Fares

RD: Dynamic Discounted Fares

RN: Amadeus Nego Fares

RP: Published fares

RV: ATPCO private fares - CAT15

RX: Corporate ATPCO private fares - CAT15

RZ: Corporate Dynamic Discounted Fares

\-Issue separate ticket indicators

IST: Issue separate tickets

\-Restriction indicators

RBR: Reservation booking designator restrictions

RER: Reservations conditions

ROR: Booking Designator Override

SRR: Sale Restrictions

FLR: Flight number restrictions

FQR: Frequency restrictions

\-OB fees indicators

OBI: Ticketing fees have been included

OBV: Any change of pricing context impacts OB fees

VR: Vendor restriction

\-Electronic ticket indicator

718: e-ticket not allowed

717: e-ticket requested

\-Tax indicators

TNI: taxes not included

TEX: taxes exempted

20

2-3an

priceTicketDetails/

indicators

**IV.4 - Corporate information**

1

  

passengerTypeInfoGroup/

corporateFareInfo/

corporateFareIdentifiers

\-Corporate name

1

1-35an

identifyNumber

**IV.5 - Currency conversion information**

1

  

passengerTypeInfoGroup/

conversionRate/

conversionRateDetails

\-Type of conversion

700 : Fare

  

3an

conversionType

\-Currency code

  

3an

currency

\-Amount

  

1-18n

pricingAmount

\-Conversion rate

ROE : Rate of Exchange (rate used to convert currency of fare calculation into currency of Origin)

  

3an

rateType

**IV.6 - Monetary information**

60

  

passengerTypeInfoGroup/

monetaryInfo/

monetaryDetails

\-Qualifier

B : Base fare amount

T : Total fare amount

E : Equivalent fare amount

TX : Total taxes amount

OA : Total OA fees amount

OB : Total OB fees amount

XOB : Total amount without OB fees

FFA : Award total amount in miles

  

1-3an

typeQualifier

\-Amount

  

1-12n

amount

**IV.7 - Interactive Free text**

99

  

passengerTypeInfoGroup/

interactiveFreeText/

freeTextQualification

\-Message qualifier

4 : Literal text

  

1an

textSubjectQualifier

\-Message function

  

2-3an

informationType

\-Free Text

99

70an

freeText

**IV.8 - Taxes information**

99

  

passengerTypeInfoGroup/

taxDetailsInfoGroup/

taxDetailsListInfo/

taxDetails

\-Amount

  

1-12n

rate

\-Country code

  

2an

countryCode

\-Type

  

2an

type

\-indicator

E:Tax exempted

1

1an

indicator

**IV.9 - ZP and PFC Taxes information**

2

  

passengerTypeInfoGroup/

taxDetailsInfoGroup/

elementaryTaxSubDetails

ZP or PFC Taxes details

20

  

monetaryDetails

\-Amount

  

1-12n

amount

\-Location

  

3an

location

\-Type

ZP : ZP taxes

XF : PFC taxes

  

2an

typeQualifier

**IV.10 - Segment information**

16

  

  

IV.10.a - General info

1

  

passengerTypeInfoGroup/

fareSegmentInfo/

segmentDescriptionInfo

\-Segment number

  

1-3n

segmentItemNumber

\-Indicator

X : Connection at destination

ST : Segment within side trip

  

1-2an

productTypeDetails/

flightIndicator

IV.10.b - Fare information

1

  

passengerTypeInfoGroup/

fareSegmentInfo/

fareQualifierDetails/

additionalFareDetails

\-Fare basis or ticket code

  

1-35an

fareBasis

\-Ticket designator

  

1-18an

ticketDesignator

IV.10.c - Booking information

1

  

passengerTypeInfoGroup/

bookingClassInfoGroup/

productInfo

bookingClassDetails

\-Booking code

  

1an

designator

\-Class of service (transporting)

  

1an

specialService

\-Modifier

  

1an

option

## 3.1 Sub Structure: Example of reply

## 3.1.1 Description

2 fares returned:

YIF

CIF

## 3.1.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItineraryReply xmlns="http://xml.amadeus.com/FITQPR\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <allFaresInfoGroup> <markerAllFares> </markerAllFares> <involvedCurrenciesInfo> <conversionRateDetails> <conversionType>707</conversionType> <currency>EUR</currency> </conversionRateDetails> <conversionRateDetails> <conversionType>705</conversionType> <currency>EUR</currency> </conversionRateDetails> </involvedCurrenciesInfo> <flightInfoGroup> <involvedFlightInfo> <boardPointDetails> <trueLocationId>FRA</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>LON</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>YY</marketingCompany> </companyDetails> </involvedFlightInfo> <itineraryInfoGroup> <travelItineraryInfo> <segmentItemNumber>1</segmentItemNumber> </travelItineraryInfo> </itineraryInfoGroup> </flightInfoGroup> <fareProductInfoGroup> <generalAndIdInfo> <segmentControlDetails> <productReference>1</productReference> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </generalAndIdInfo> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeInfoGroup> <fareInfo> <fareTypeGrouping> <aggregatePTCDiscount>ADT</aggregatePTCDiscount> </fareTypeGrouping> </fareInfo> <pricingticketingDetails> <priceTicketDetails> <indicators>RBR</indicators> </priceTicketDetails> </pricingticketingDetails> <conversionRate> <conversionRateDetails> <conversionType>700</conversionType> <currency>NUC</currency> <rateType>ROE</rateType> <pricingAmount>1193.18</pricingAmount> <conversionRate>0.758475</conversionRate> </conversionRateDetails> </conversionRate> <monetaryInfo> <monetaryDetails> <typeQualifier>B</typeQualifier> <amount>905.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>T</typeQualifier> <amount>943.01</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>TX</typeQualifier> <amount>38.01</amount> </monetaryDetails> </monetaryInfo> <taxDetailsInfoGroup> <taxDetailsListInfo> <taxDetails> <rate>7.50</rate> <countryCode>OY</countryCode> <type>CB</type> </taxDetails> <taxDetails> <rate>24.13</rate> <countryCode>RA</countryCode> <type>EB</type> </taxDetails> <taxDetails> <rate>6.38</rate> <countryCode>DE</countryCode> <type>SE</type> </taxDetails> </taxDetailsListInfo> </taxDetailsInfoGroup> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>1</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>YIF</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>Y</designator> <specialService>Y</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> </passengerTypeInfoGroup> </fareProductInfoGroup> <fareProductInfoGroup> <generalAndIdInfo> <segmentControlDetails> <productReference>2</productReference> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </generalAndIdInfo> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeInfoGroup> <fareInfo> <fareTypeGrouping> <aggregatePTCDiscount>ADT</aggregatePTCDiscount> </fareTypeGrouping> </fareInfo> <pricingticketingDetails> <priceTicketDetails> <indicators>RBR</indicators> </priceTicketDetails> </pricingticketingDetails> <conversionRate> <conversionRateDetails> <conversionType>700</conversionType> <currency>NUC</currency> <rateType>ROE</rateType> <pricingAmount>1193.18</pricingAmount> <conversionRate>0.758475</conversionRate> </conversionRateDetails> </conversionRate> <monetaryInfo> <monetaryDetails> <typeQualifier>B</typeQualifier> <amount>905.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>T</typeQualifier> <amount>943.01</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>TX</typeQualifier> <amount>38.01</amount> </monetaryDetails> </monetaryInfo> <taxDetailsInfoGroup> <taxDetailsListInfo> <taxDetails> <rate>7.50</rate> <countryCode>OY</countryCode> <type>CB</type> </taxDetails> <taxDetails> <rate>24.13</rate> <countryCode>RA</countryCode> <type>EB</type> </taxDetails> <taxDetails> <rate>6.38</rate> <countryCode>DE</countryCode> <type>SE</type> </taxDetails> </taxDetailsListInfo> </taxDetailsInfoGroup> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>1</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>CIF</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>C</designator> <specialService>C</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> </passengerTypeInfoGroup> </fareProductInfoGroup> </allFaresInfoGroup> </Fare\_QuoteItineraryReply>

* * *

## 4 Error Messages

Error details :

-   Error code is displayed in the errorInfoGroup/rejectErrorCode
-   Error message is displayed in the errorInfoGroup/errorFreeText

## 4.1 Error Reply

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItineraryReply> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <errorInfoGroup> <rejectErrorCode> <errorDetails> <errorCode>0</errorCode> </errorDetails> </rejectErrorCode> <errorFreeText> <freeText>NO CURRENT FARE IN SYSTEM</freeText> </errorFreeText> </errorInfoGroup> </Fare\_QuoteItineraryReply>

  

* * *

## 5 Operations

## 5.1 Operation: 011 Origin and Destination City

Open class informative pricing FRA LON with LH, one passenger adult

Only lowest fare option activated (pricingTktOptionGroup /pricingTicketingDetails/ priceTicketDetails/ indicators indicator to LF (Low fare finder - rebooking recommended)

Cryptic : FQP FRA /D25AUG /ALH LON/L

## 5.1.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItinerary xmlns="http://xml.amadeus.com/FITQPQ\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <passengerInfoGroup> <segmentRepetitionControl> <segmentControlDetails> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </segmentRepetitionControl> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeGroup> <fareInfo> <valueQualifier>ADT</valueQualifier> </fareInfo> </passengerTypeGroup> </passengerInfoGroup> <pricingTktOptionGroup> <pricingTicketingDetails> <priceTicketDetails> <indicators>LF</indicators> </priceTicketDetails> </pricingTicketingDetails> </pricingTktOptionGroup> <requestedSegmentInfoGroup> <originAndDestinationDetails></originAndDestinationDetails> <flightSegmentInfoGroup> <travelProductInfo> <flightDate> <departureDate>250810</departureDate> </flightDate> <boardPointDetails> <departureCity>FRA</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>LON</arrivalCity> </offpointDetails> <companyDetails> <marketingCompany>LH</marketingCompany> </companyDetails> </travelProductInfo> </flightSegmentInfoGroup> </requestedSegmentInfoGroup> </Fare\_QuoteItinerary>

## 5.1.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItineraryReply xmlns="http://xml.amadeus.com/FITQPR\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <allFaresInfoGroup> <markerAllFares></markerAllFares> <involvedCurrenciesInfo> <conversionRateDetails> <conversionType>707</conversionType> <currency>EUR</currency> </conversionRateDetails> <conversionRateDetails> <conversionType>705</conversionType> <currency>EUR</currency> </conversionRateDetails> </involvedCurrenciesInfo> <flightInfoGroup> <involvedFlightInfo> <boardPointDetails> <trueLocationId>FRA</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>LON</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>LH</marketingCompany> </companyDetails> </involvedFlightInfo> <itineraryInfoGroup> <travelItineraryInfo> <segmentItemNumber>1</segmentItemNumber> </travelItineraryInfo> </itineraryInfoGroup> </flightInfoGroup> <fareProductInfoGroup> <generalAndIdInfo> <segmentControlDetails> <productReference>1</productReference> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </generalAndIdInfo> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeInfoGroup> <fareInfo> <fareTypeGrouping> <aggregatePTCDiscount>ADT</aggregatePTCDiscount> </fareTypeGrouping> </fareInfo> <pricingticketingDetails> <priceTicketDetails> <indicators>RBR</indicators> </priceTicketDetails> </pricingticketingDetails> <conversionRate> <conversionRateDetails> <conversionType>700</conversionType> <currency>NUC</currency> <rateType>ROE</rateType> <pricingAmount>45.09</pricingAmount> <conversionRate>0.753963</conversionRate> </conversionRateDetails> </conversionRate> <monetaryInfo> <monetaryDetails> <typeQualifier>B</typeQualifier> <amount>34.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>T</typeQualifier> <amount>74.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>TX</typeQualifier> <amount>40.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>XOB</typeQualifier> <amount>74.00</amount> </monetaryDetails> </monetaryInfo> <taxDetailsInfoGroup> <taxDetailsListInfo> <taxDetails> <rate>3.00</rate> <countryCode>YQ</countryCode> <type>AC</type> </taxDetails> <taxDetails> <rate>8.00</rate> <countryCode>OY</countryCode> <type>CB</type> </taxDetails> <taxDetails> <rate>22.46</rate> <countryCode>RA</countryCode> <type>EB</type> </taxDetails> <taxDetails> <rate>6.54</rate> <countryCode>DE</countryCode> <type>SE</type> </taxDetails> </taxDetailsListInfo> </taxDetailsInfoGroup> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>1</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>ENN7OW</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>E</designator> <specialService>E</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> </passengerTypeInfoGroup> </fareProductInfoGroup> </allFaresInfoGroup> </Fare\_QuoteItineraryReply>

## 5.1.3 Possible Errors

See "Error Messages" section.

* * *

## 5.2 Operation: 012 Origin and Destination City

Informative pricing mirror trip DUS to NYC via FRA with LH, three passenger adult, child and infant, booking class in request V, specified dates for outbound and inbound.

Cryptic : FQP DUS/CV/D25AUG FRA/CV NYC /D02SEP/CV FRA/CV DUS/OLH/RADT\*CH\*INF

## 5.2.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItinerary xmlns="http://xml.amadeus.com/FITQPQ\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <passengerInfoGroup> <segmentRepetitionControl> <segmentControlDetails> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </segmentRepetitionControl> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeGroup> <fareInfo> <valueQualifier>ADT</valueQualifier> </fareInfo> </passengerTypeGroup> </passengerInfoGroup> <passengerInfoGroup> <segmentRepetitionControl> <segmentControlDetails> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </segmentRepetitionControl> <specificTravellerDetails> <travellerDetails> <referenceNumber>2</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeGroup> <fareInfo> <valueQualifier>CH</valueQualifier> </fareInfo> </passengerTypeGroup> </passengerInfoGroup> <passengerInfoGroup> <segmentRepetitionControl> <segmentControlDetails> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </segmentRepetitionControl> <specificTravellerDetails> <travellerDetails> <referenceNumber>3</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeGroup> <fareInfo> <valueQualifier>INF</valueQualifier> </fareInfo> </passengerTypeGroup> </passengerInfoGroup> <requestedSegmentInfoGroup> <originAndDestinationDetails></originAndDestinationDetails> <flightSegmentInfoGroup> <travelProductInfo> <flightDate> <departureDate>250810</departureDate> </flightDate> <boardPointDetails> <departureCity>DUS</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>FRA</arrivalCity> </offpointDetails> <companyDetails> <marketingCompany>LH</marketingCompany> </companyDetails> </travelProductInfo> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>V</designator> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </flightSegmentInfoGroup> <flightSegmentInfoGroup> <travelProductInfo> <boardPointDetails> <departureCity>FRA</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>NYC</arrivalCity> </offpointDetails> <companyDetails> <marketingCompany>LH</marketingCompany> </companyDetails> </travelProductInfo> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>V</designator> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </flightSegmentInfoGroup> <flightSegmentInfoGroup> <travelProductInfo> <flightDate> <departureDate>020910</departureDate> </flightDate> <boardPointDetails> <departureCity>NYC</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>FRA</arrivalCity> </offpointDetails> <companyDetails> <marketingCompany>LH</marketingCompany> </companyDetails> </travelProductInfo> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>V</designator> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </flightSegmentInfoGroup> <flightSegmentInfoGroup> <travelProductInfo> <boardPointDetails> <departureCity>FRA</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>DUS</arrivalCity> </offpointDetails> <companyDetails> <marketingCompany>LH</marketingCompany> </companyDetails> </travelProductInfo> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>V</designator> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </flightSegmentInfoGroup> </requestedSegmentInfoGroup> </Fare\_QuoteItinerary>

## 5.2.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItineraryReply xmlns="http://xml.amadeus.com/FITQPR\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <allFaresInfoGroup> <markerAllFares></markerAllFares> <involvedCurrenciesInfo> <conversionRateDetails> <conversionType>707</conversionType> <currency>EUR</currency> </conversionRateDetails> <conversionRateDetails> <conversionType>705</conversionType> <currency>EUR</currency> </conversionRateDetails> </involvedCurrenciesInfo> <flightInfoGroup> <involvedFlightInfo> <boardPointDetails> <trueLocationId>DUS</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>FRA</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>LH</marketingCompany> </companyDetails> </involvedFlightInfo> <itineraryInfoGroup> <travelItineraryInfo> <segmentItemNumber>1</segmentItemNumber> </travelItineraryInfo> </itineraryInfoGroup> </flightInfoGroup> <flightInfoGroup> <involvedFlightInfo> <boardPointDetails> <trueLocationId>FRA</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>NYC</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>LH</marketingCompany> </companyDetails> </involvedFlightInfo> <itineraryInfoGroup> <travelItineraryInfo> <segmentItemNumber>2</segmentItemNumber> </travelItineraryInfo> </itineraryInfoGroup> </flightInfoGroup> <flightInfoGroup> <involvedFlightInfo> <boardPointDetails> <trueLocationId>NYC</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>FRA</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>LH</marketingCompany> </companyDetails> </involvedFlightInfo> <itineraryInfoGroup> <travelItineraryInfo> <segmentItemNumber>3</segmentItemNumber> </travelItineraryInfo> </itineraryInfoGroup> </flightInfoGroup> <flightInfoGroup> <involvedFlightInfo> <boardPointDetails> <trueLocationId>FRA</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>DUS</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>LH</marketingCompany> </companyDetails> </involvedFlightInfo> <itineraryInfoGroup> <travelItineraryInfo> <segmentItemNumber>4</segmentItemNumber> </travelItineraryInfo> </itineraryInfoGroup> </flightInfoGroup> <fareProductInfoGroup> <generalAndIdInfo> <segmentControlDetails> <productReference>1</productReference> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </generalAndIdInfo> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeInfoGroup> <fareInfo> <fareTypeGrouping> <aggregatePTCDiscount>ADT</aggregatePTCDiscount> </fareTypeGrouping> </fareInfo> <pricingticketingDetails> <priceTicketDetails> <indicators>RBR</indicators> </priceTicketDetails> </pricingticketingDetails> <conversionRate> <conversionRateDetails> <conversionType>700</conversionType> <currency>NUC</currency> <rateType>ROE</rateType> <pricingAmount>4299.94</pricingAmount> <conversionRate>0.753963</conversionRate> </conversionRateDetails> </conversionRate> <monetaryInfo> <monetaryDetails> <typeQualifier>B</typeQualifier> <amount>3242.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>T</typeQualifier> <amount>3654.48</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>TX</typeQualifier> <amount>412.48</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>XOB</typeQualifier> <amount>3654.48</amount> </monetaryDetails> </monetaryInfo> <taxDetailsInfoGroup> <taxDetailsListInfo> <taxDetails> <rate>254.00</rate> <countryCode>YQ</countryCode> <type>AC</type> </taxDetails> <taxDetails> <rate>61.00</rate> <countryCode>OY</countryCode> <type>CB</type> </taxDetails> <taxDetails> <rate>37.73</rate> <countryCode>RD</countryCode> <type>DP</type> </taxDetails> <taxDetails> <rate>27.48</rate> <countryCode>RA</countryCode> <type>EB</type> </taxDetails> <taxDetails> <rate>16.83</rate> <countryCode>DE</countryCode> <type>SE</type> </taxDetails> <taxDetails> <rate>4.25</rate> <countryCode>YC</countryCode> <type>AE</type> </taxDetails> <taxDetails> <rate>3.86</rate> <countryCode>XA</countryCode> <type>CO</type> </taxDetails> <taxDetails> <rate>5.40</rate> <countryCode>XY</countryCode> <type>CR</type> </taxDetails> <taxDetails> <rate>1.93</rate> <countryCode>AY</countryCode> <type>SE</type> </taxDetails> </taxDetailsListInfo> </taxDetailsInfoGroup> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>1</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>Y77RT</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>Y</designator> <specialService>Y</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>2</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>Y77RT</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>Y</designator> <specialService>Y</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>3</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>Y77RT</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>Y</designator> <specialService>Y</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>4</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>Y77RT</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>Y</designator> <specialService>Y</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> </passengerTypeInfoGroup> </fareProductInfoGroup> <fareProductInfoGroup> <generalAndIdInfo> <segmentControlDetails> <productReference>2</productReference> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </generalAndIdInfo> <specificTravellerDetails> <travellerDetails> <referenceNumber>2</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeInfoGroup> <fareInfo> <fareTypeGrouping> <aggregatePTCDiscount>CH</aggregatePTCDiscount> </fareTypeGrouping> </fareInfo> <pricingticketingDetails> <priceTicketDetails> <indicators>RBR</indicators> </priceTicketDetails> </pricingticketingDetails> <conversionRate> <conversionRateDetails> <conversionType>700</conversionType> <currency>NUC</currency> <rateType>ROE</rateType> <pricingAmount>3224.94</pricingAmount> <conversionRate>0.753963</conversionRate> </conversionRateDetails> </conversionRate> <monetaryInfo> <monetaryDetails> <typeQualifier>B</typeQualifier> <amount>2432.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>T</typeQualifier> <amount>2844.48</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>TX</typeQualifier> <amount>412.48</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>XOB</typeQualifier> <amount>2844.48</amount> </monetaryDetails> </monetaryInfo> <taxDetailsInfoGroup> <taxDetailsListInfo> <taxDetails> <rate>254.00</rate> <countryCode>YQ</countryCode> <type>AC</type> </taxDetails> <taxDetails> <rate>61.00</rate> <countryCode>OY</countryCode> <type>CB</type> </taxDetails> <taxDetails> <rate>37.73</rate> <countryCode>RD</countryCode> <type>DP</type> </taxDetails> <taxDetails> <rate>27.48</rate> <countryCode>RA</countryCode> <type>EB</type> </taxDetails> <taxDetails> <rate>16.83</rate> <countryCode>DE</countryCode> <type>SE</type> </taxDetails> <taxDetails> <rate>4.25</rate> <countryCode>YC</countryCode> <type>AE</type> </taxDetails> <taxDetails> <rate>3.86</rate> <countryCode>XA</countryCode> <type>CO</type> </taxDetails> <taxDetails> <rate>5.40</rate> <countryCode>XY</countryCode> <type>CR</type> </taxDetails> <taxDetails> <rate>1.93</rate> <countryCode>AY</countryCode> <type>SE</type> </taxDetails> </taxDetailsListInfo> </taxDetailsInfoGroup> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>1</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>Y77RT</fareBasis> <ticketDesignator>CH25</ticketDesignator> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>CH</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>Y</designator> <specialService>Y</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>2</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>Y77RT</fareBasis> <ticketDesignator>CH25</ticketDesignator> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>CH</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>Y</designator> <specialService>Y</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>3</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>Y77RT</fareBasis> <ticketDesignator>CH25</ticketDesignator> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>CH</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>Y</designator> <specialService>Y</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>4</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>Y77RT</fareBasis> <ticketDesignator>CH25</ticketDesignator> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>CH</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>Y</designator> <specialService>Y</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> </passengerTypeInfoGroup> </fareProductInfoGroup> <fareProductInfoGroup> <generalAndIdInfo> <segmentControlDetails> <productReference>3</productReference> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </generalAndIdInfo> <specificTravellerDetails> <travellerDetails> <referenceNumber>3</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeInfoGroup> <fareInfo> <fareDetails> <passengerTypeQualifier>IN</passengerTypeQualifier> </fareDetails> <fareTypeGrouping> <aggregatePTCDiscount>IN</aggregatePTCDiscount> </fareTypeGrouping> </fareInfo> <pricingticketingDetails> <priceTicketDetails> <indicators>RBR</indicators> </priceTicketDetails> </pricingticketingDetails> <conversionRate> <conversionRateDetails> <conversionType>700</conversionType> <currency>NUC</currency> <rateType>ROE</rateType> <pricingAmount>429.98</pricingAmount> <conversionRate>0.753963</conversionRate> </conversionRateDetails> </conversionRate> <monetaryInfo> <monetaryDetails> <typeQualifier>B</typeQualifier> <amount>325.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>T</typeQualifier> <amount>340.44</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>TX</typeQualifier> <amount>15.44</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>XOB</typeQualifier> <amount>340.44</amount> </monetaryDetails> </monetaryInfo> <taxDetailsInfoGroup> <taxDetailsListInfo> <taxDetails> <rate>4.25</rate> <countryCode>YC</countryCode> <type>AE</type> </taxDetails> <taxDetails> <rate>3.86</rate> <countryCode>XA</countryCode> <type>CO</type> </taxDetails> <taxDetails> <rate>5.40</rate> <countryCode>XY</countryCode> <type>CR</type> </taxDetails> <taxDetails> <rate>1.93</rate> <countryCode>AY</countryCode> <type>SE</type> </taxDetails> </taxDetailsListInfo> </taxDetailsInfoGroup> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>1</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>Y77RT</fareBasis> <ticketDesignator>IN90</ticketDesignator> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>IN</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>Y</designator> <specialService>Y</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>2</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>Y77RT</fareBasis> <ticketDesignator>IN90</ticketDesignator> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>IN</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>Y</designator> <specialService>Y</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>3</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>Y77RT</fareBasis> <ticketDesignator>IN90</ticketDesignator> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>IN</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>Y</designator> <specialService>Y</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>4</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>Y77RT</fareBasis> <ticketDesignator>IN90</ticketDesignator> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>IN</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>Y</designator> <specialService>Y</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> </passengerTypeInfoGroup> </fareProductInfoGroup> </allFaresInfoGroup> </Fare\_QuoteItineraryReply>

## 5.2.3 Possible Errors

See "Error Messages" section.

* * *

## 5.3 Operation: 013 Origin and Destination City

List of Fares all fares of the FQP fare selection panel are to find in the structured response.

Query with one passenger, two flight segments DUS - FRA - DUS with carrier LH.

Cryptic : FQP DUS/D25AUG FRA /D02SEP DUS/OLH/RADT

In the response, the order of the fare construction is displayed from the cheapest to the most expensive amount and can differ to the order of the cryptic fare selection panel.

## 5.3.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItinerary xmlns="http://xml.amadeus.com/FITQPQ\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <passengerInfoGroup> <segmentRepetitionControl> <segmentControlDetails> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </segmentRepetitionControl> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeGroup> <fareInfo> <valueQualifier>ADT</valueQualifier> </fareInfo> </passengerTypeGroup> </passengerInfoGroup> <requestedSegmentInfoGroup> <originAndDestinationDetails></originAndDestinationDetails> <flightSegmentInfoGroup> <travelProductInfo> <flightDate> <departureDate>250808</departureDate> </flightDate> <boardPointDetails> <departureCity>DUS</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>FRA</arrivalCity> </offpointDetails> <companyDetails> <marketingCompany>LH</marketingCompany> </companyDetails> </travelProductInfo> </flightSegmentInfoGroup> <flightSegmentInfoGroup> <travelProductInfo> <flightDate> <departureDate>020908</departureDate> </flightDate> <boardPointDetails> <departureCity>FRA</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>DUS</arrivalCity> </offpointDetails> <companyDetails> <marketingCompany>LH</marketingCompany> </companyDetails> </travelProductInfo> </flightSegmentInfoGroup> </requestedSegmentInfoGroup> </Fare\_QuoteItinerary>

## 5.3.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItineraryReply xmlns="http://xml.amadeus.com/FITQPR\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <allFaresInfoGroup> <markerAllFares></markerAllFares> <involvedCurrenciesInfo> <conversionRateDetails> <conversionType>707</conversionType> <currency>EUR</currency> </conversionRateDetails> <conversionRateDetails> <conversionType>705</conversionType> <currency>EUR</currency> </conversionRateDetails> </involvedCurrenciesInfo> <flightInfoGroup> <involvedFlightInfo> <boardPointDetails> <trueLocationId>DUS</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>FRA</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>LH</marketingCompany> </companyDetails> </involvedFlightInfo> <itineraryInfoGroup> <travelItineraryInfo> <segmentItemNumber>1</segmentItemNumber> </travelItineraryInfo> </itineraryInfoGroup> </flightInfoGroup> <flightInfoGroup> <involvedFlightInfo> <boardPointDetails> <trueLocationId>FRA</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>DUS</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>LH</marketingCompany> </companyDetails> </involvedFlightInfo> <itineraryInfoGroup> <travelItineraryInfo> <segmentItemNumber>2</segmentItemNumber> </travelItineraryInfo> </itineraryInfoGroup> </flightInfoGroup> <fareProductInfoGroup> <generalAndIdInfo> <segmentControlDetails> <productReference>1</productReference> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </generalAndIdInfo> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeInfoGroup> <fareInfo> <fareTypeGrouping> <aggregatePTCDiscount>ADT</aggregatePTCDiscount> </fareTypeGrouping> </fareInfo> <pricingticketingDetails> <priceTicketDetails> <indicators>RBR</indicators> </priceTicketDetails> </pricingticketingDetails> <conversionRate> <conversionRateDetails> <conversionType>700</conversionType> <currency>EUR</currency> <rateType>ROE</rateType> <pricingAmount>36.00</pricingAmount> </conversionRateDetails> </conversionRate> <monetaryInfo> <monetaryDetails> <typeQualifier>B</typeQualifier> <amount>36.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>T</typeQualifier> <amount>118.18</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>TX</typeQualifier> <amount>82.18</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>XOB</typeQualifier> <amount>118.18</amount> </monetaryDetails> </monetaryInfo> <taxDetailsInfoGroup> <taxDetailsListInfo> <taxDetails> <rate>6.00</rate> <countryCode>YQ</countryCode> <type>AC</type> </taxDetails> <taxDetails> <rate>19.04</rate> <countryCode>OY</countryCode> <type>CB</type> </taxDetails> <taxDetails> <rate>44.90</rate> <countryCode>RD</countryCode> <type>DP</type> </taxDetails> <taxDetails> <rate>12.24</rate> <countryCode>DE</countryCode> <type>SE</type> </taxDetails> </taxDetailsListInfo> </taxDetailsInfoGroup> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>1</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>ENN31D1B</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>E</designator> <specialService>E</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>2</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>ENN31D1B</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>E</designator> <specialService>E</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> </passengerTypeInfoGroup> </fareProductInfoGroup> <fareProductInfoGroup> <generalAndIdInfo> <segmentControlDetails> <productReference>2</productReference> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </generalAndIdInfo> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeInfoGroup> <fareInfo> <fareTypeGrouping> <aggregatePTCDiscount>ADT</aggregatePTCDiscount> </fareTypeGrouping> </fareInfo> <pricingticketingDetails> <priceTicketDetails> <indicators>RBR</indicators> </priceTicketDetails> </pricingticketingDetails> <conversionRate> <conversionRateDetails> <conversionType>700</conversionType> <currency>EUR</currency> <rateType>ROE</rateType> <pricingAmount>56.00</pricingAmount> </conversionRateDetails> </conversionRate> <monetaryInfo> <monetaryDetails> <typeQualifier>B</typeQualifier> <amount>56.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>T</typeQualifier> <amount>176.18</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>TX</typeQualifier> <amount>120.18</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>XOB</typeQualifier> <amount>176.18</amount> </monetaryDetails> </monetaryInfo> <taxDetailsInfoGroup> <taxDetailsListInfo> <taxDetails> <rate>44.00</rate> <countryCode>YQ</countryCode> <type>AC</type> </taxDetails> <taxDetails> <rate>19.04</rate> <countryCode>OY</countryCode> <type>CB</type> </taxDetails> <taxDetails> <rate>44.90</rate> <countryCode>RD</countryCode> <type>DP</type> </taxDetails> <taxDetails> <rate>12.24</rate> <countryCode>DE</countryCode> <type>SE</type> </taxDetails> </taxDetailsListInfo> </taxDetailsInfoGroup> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>1</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>TNN31D1</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>T</designator> <specialService>T</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>2</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>TNN31D1</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>T</designator> <specialService>T</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> </passengerTypeInfoGroup> </fareProductInfoGroup> <fareProductInfoGroup> <generalAndIdInfo> <segmentControlDetails> <productReference>3</productReference> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </generalAndIdInfo> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeInfoGroup> <fareInfo> <fareTypeGrouping> <aggregatePTCDiscount>ADT</aggregatePTCDiscount> </fareTypeGrouping> </fareInfo> <pricingticketingDetails> <priceTicketDetails> <indicators>RBR</indicators> </priceTicketDetails> </pricingticketingDetails> <conversionRate> <conversionRateDetails> <conversionType>700</conversionType> <currency>EUR</currency> <rateType>ROE</rateType> <pricingAmount>74.00</pricingAmount> </conversionRateDetails> </conversionRate> <monetaryInfo> <monetaryDetails> <typeQualifier>B</typeQualifier> <amount>74.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>T</typeQualifier> <amount>214.18</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>TX</typeQualifier> <amount>140.18</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>XOB</typeQualifier> <amount>214.18</amount> </monetaryDetails> </monetaryInfo> <taxDetailsInfoGroup> <taxDetailsListInfo> <taxDetails> <rate>64.00</rate> <countryCode>YQ</countryCode> <type>AC</type> </taxDetails> <taxDetails> <rate>19.04</rate> <countryCode>OY</countryCode> <type>CB</type> </taxDetails> <taxDetails> <rate>44.90</rate> <countryCode>RD</countryCode> <type>DP</type> </taxDetails> <taxDetails> <rate>12.24</rate> <countryCode>DE</countryCode> <type>SE</type> </taxDetails> </taxDetailsListInfo> </taxDetailsInfoGroup> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>1</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>LNC31D0</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>L</designator> <specialService>L</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>2</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>LNC31D0</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>L</designator> <specialService>L</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> </passengerTypeInfoGroup> </fareProductInfoGroup> <fareProductInfoGroup> <generalAndIdInfo> <segmentControlDetails> <productReference>4</productReference> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </generalAndIdInfo> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeInfoGroup> <fareInfo> <fareTypeGrouping> <aggregatePTCDiscount>ADT</aggregatePTCDiscount> </fareTypeGrouping> </fareInfo> <pricingticketingDetails> <priceTicketDetails> <indicators>RBR</indicators> </priceTicketDetails> </pricingticketingDetails> <conversionRate> <conversionRateDetails> <conversionType>700</conversionType> <currency>EUR</currency> <rateType>ROE</rateType> <pricingAmount>157.00</pricingAmount> </conversionRateDetails> </conversionRate> <monetaryInfo> <monetaryDetails> <typeQualifier>B</typeQualifier> <amount>157.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>T</typeQualifier> <amount>297.18</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>TX</typeQualifier> <amount>140.18</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>XOB</typeQualifier> <amount>297.18</amount> </monetaryDetails> </monetaryInfo> <taxDetailsInfoGroup> <taxDetailsListInfo> <taxDetails> <rate>64.00</rate> <countryCode>YQ</countryCode> <type>AC</type> </taxDetails> <taxDetails> <rate>19.04</rate> <countryCode>OY</countryCode> <type>CB</type> </taxDetails> <taxDetails> <rate>44.90</rate> <countryCode>RD</countryCode> <type>DP</type> </taxDetails> <taxDetails> <rate>12.24</rate> <countryCode>DE</countryCode> <type>SE</type> </taxDetails> </taxDetailsListInfo> </taxDetailsInfoGroup> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>1</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>QNC31S</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>Q</designator> <specialService>Q</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>2</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>QNC31S</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>Q</designator> <specialService>Q</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> </passengerTypeInfoGroup> </fareProductInfoGroup> <fareProductInfoGroup> <generalAndIdInfo> <segmentControlDetails> <productReference>5</productReference> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </generalAndIdInfo> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeInfoGroup> <fareInfo> <fareTypeGrouping> <aggregatePTCDiscount>ADT</aggregatePTCDiscount> </fareTypeGrouping> </fareInfo> <pricingticketingDetails> <priceTicketDetails> <indicators>RBR</indicators> </priceTicketDetails> </pricingticketingDetails> <conversionRate> <conversionRateDetails> <conversionType>700</conversionType> <currency>EUR</currency> <rateType>ROE</rateType> <pricingAmount>213.00</pricingAmount> </conversionRateDetails> </conversionRate> <monetaryInfo> <monetaryDetails> <typeQualifier>B</typeQualifier> <amount>213.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>T</typeQualifier> <amount>353.18</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>TX</typeQualifier> <amount>140.18</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>XOB</typeQualifier> <amount>353.18</amount> </monetaryDetails> </monetaryInfo> <taxDetailsInfoGroup> <taxDetailsListInfo> <taxDetails> <rate>64.00</rate> <countryCode>YQ</countryCode> <type>AC</type> </taxDetails> <taxDetails> <rate>19.04</rate> <countryCode>OY</countryCode> <type>CB</type> </taxDetails> <taxDetails> <rate>44.90</rate> <countryCode>RD</countryCode> <type>DP</type> </taxDetails> <taxDetails> <rate>12.24</rate> <countryCode>DE</countryCode> <type>SE</type> </taxDetails> </taxDetailsListInfo> </taxDetailsInfoGroup> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>1</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>HNC31S</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>H</designator> <specialService>H</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>2</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>HNC31S</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>H</designator> <specialService>H</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> </passengerTypeInfoGroup> </fareProductInfoGroup> <fareProductInfoGroup> <generalAndIdInfo> <segmentControlDetails> <productReference>6</productReference> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </generalAndIdInfo> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeInfoGroup> <fareInfo> <fareTypeGrouping> <aggregatePTCDiscount>ADT</aggregatePTCDiscount> </fareTypeGrouping> </fareInfo> <pricingticketingDetails> <priceTicketDetails> <indicators>RBR</indicators> </priceTicketDetails> </pricingticketingDetails> <conversionRate> <conversionRateDetails> <conversionType>700</conversionType> <currency>EUR</currency> <rateType>ROE</rateType> <pricingAmount>252.00</pricingAmount> </conversionRateDetails> </conversionRate> <monetaryInfo> <monetaryDetails> <typeQualifier>B</typeQualifier> <amount>252.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>T</typeQualifier> <amount>392.18</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>TX</typeQualifier> <amount>140.18</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>XOB</typeQualifier> <amount>392.18</amount> </monetaryDetails> </monetaryInfo> <taxDetailsInfoGroup> <taxDetailsListInfo> <taxDetails> <rate>64.00</rate> <countryCode>YQ</countryCode> <type>AC</type> </taxDetails> <taxDetails> <rate>19.04</rate> <countryCode>OY</countryCode> <type>CB</type> </taxDetails> <taxDetails> <rate>44.90</rate> <countryCode>RD</countryCode> <type>DP</type> </taxDetails> <taxDetails> <rate>12.24</rate> <countryCode>DE</countryCode> <type>SE</type> </taxDetails> </taxDetailsListInfo> </taxDetailsInfoGroup> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>1</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>GNC31D0</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>G</designator> <specialService>G</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>2</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>GNC31D0</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>G</designator> <specialService>G</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> </passengerTypeInfoGroup> </fareProductInfoGroup> <fareProductInfoGroup> <generalAndIdInfo> <segmentControlDetails> <productReference>7</productReference> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </generalAndIdInfo> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeInfoGroup> <fareInfo> <fareTypeGrouping> <aggregatePTCDiscount>ADT</aggregatePTCDiscount> </fareTypeGrouping> </fareInfo> <pricingticketingDetails> <priceTicketDetails> <indicators>RBR</indicators> </priceTicketDetails> </pricingticketingDetails> <conversionRate> <conversionRateDetails> <conversionType>700</conversionType> <currency>EUR</currency> <rateType>ROE</rateType> <pricingAmount>312.00</pricingAmount> </conversionRateDetails> </conversionRate> <monetaryInfo> <monetaryDetails> <typeQualifier>B</typeQualifier> <amount>312.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>T</typeQualifier> <amount>452.18</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>TX</typeQualifier> <amount>140.18</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>XOB</typeQualifier> <amount>452.18</amount> </monetaryDetails> </monetaryInfo> <taxDetailsInfoGroup> <taxDetailsListInfo> <taxDetails> <rate>64.00</rate> <countryCode>YQ</countryCode> <type>AC</type> </taxDetails> <taxDetails> <rate>19.04</rate> <countryCode>OY</countryCode> <type>CB</type> </taxDetails> <taxDetails> <rate>44.90</rate> <countryCode>RD</countryCode> <type>DP</type> </taxDetails> <taxDetails> <rate>12.24</rate> <countryCode>DE</countryCode> <type>SE</type> </taxDetails> </taxDetailsListInfo> </taxDetailsInfoGroup> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>1</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>MFF31D1</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>M</designator> <specialService>M</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>2</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>MFF31D1</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>M</designator> <specialService>M</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> </passengerTypeInfoGroup> </fareProductInfoGroup> <fareProductInfoGroup> <generalAndIdInfo> <segmentControlDetails> <productReference>8</productReference> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </generalAndIdInfo> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeInfoGroup> <fareInfo> <fareTypeGrouping> <aggregatePTCDiscount>ADT</aggregatePTCDiscount> </fareTypeGrouping> </fareInfo> <pricingticketingDetails> <priceTicketDetails> <indicators>RBR</indicators> </priceTicketDetails> </pricingticketingDetails> <conversionRate> <conversionRateDetails> <conversionType>700</conversionType> <currency>EUR</currency> <rateType>ROE</rateType> <pricingAmount>489.00</pricingAmount> </conversionRateDetails> </conversionRate> <monetaryInfo> <monetaryDetails> <typeQualifier>B</typeQualifier> <amount>489.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>T</typeQualifier> <amount>629.18</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>TX</typeQualifier> <amount>140.18</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>XOB</typeQualifier> <amount>629.18</amount> </monetaryDetails> </monetaryInfo> <taxDetailsInfoGroup> <taxDetailsListInfo> <taxDetails> <rate>64.00</rate> <countryCode>YQ</countryCode> <type>AC</type> </taxDetails> <taxDetails> <rate>19.04</rate> <countryCode>OY</countryCode> <type>CB</type> </taxDetails> <taxDetails> <rate>44.90</rate> <countryCode>RD</countryCode> <type>DP</type> </taxDetails> <taxDetails> <rate>12.24</rate> <countryCode>DE</countryCode> <type>SE</type> </taxDetails> </taxDetailsListInfo> </taxDetailsInfoGroup> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>1</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>CRT1</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>C</designator> <specialService>C</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>2</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>CRT1</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>C</designator> <specialService>C</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> </passengerTypeInfoGroup> </fareProductInfoGroup> </allFaresInfoGroup> </Fare\_QuoteItineraryReply>

## 5.3.3 Possible Errors

See "Error Messages" section.

* * *

## 5.4 Operation: 021 Expanded parameters

Expanded parameter : Penalty information with flat Amount.

Cryptic : FQP NCE /D25FEB PAR/OAF/R,\*PE100A

## 5.4.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItinerary xmlns="http://xml.amadeus.com/FITQPQ\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <passengerInfoGroup> <segmentRepetitionControl> <segmentControlDetails> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </segmentRepetitionControl> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeGroup> <fareInfo> <valueQualifier>ADT</valueQualifier> </fareInfo> </passengerTypeGroup> </passengerInfoGroup> <pricingTktOptionGroup> <pricingTicketingDetails></pricingTicketingDetails> <fareQualifierDetails> <discountDetails> <fareQualifier>PE</fareQualifier> <amount>100</amount> </discountDetails> </fareQualifierDetails> </pricingTktOptionGroup> <requestedSegmentInfoGroup> <originAndDestinationDetails></originAndDestinationDetails> <flightSegmentInfoGroup> <travelProductInfo> <flightDate> <departureDate>250208</departureDate> </flightDate> <boardPointDetails> <departureCity>NCE</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>PAR</arrivalCity> </offpointDetails> <companyDetails> <marketingCompany>AF</marketingCompany> </companyDetails> </travelProductInfo> </flightSegmentInfoGroup> </requestedSegmentInfoGroup> </Fare\_QuoteItinerary>

## 5.4.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.4.3 Possible Errors

See "Error Messages" section.

* * *

## 5.5 Operation: 022 Expanded parameters

Expanded parameters :

-   Penalty information with percentage amount.
-   No Restriction
-   No Maximum Stay information

Cryptic : FQP NCE /D27MAY PAR/OAF/R,\*PE50P,\*NR,\*NMX

## 5.5.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItinerary xmlns="http://xml.amadeus.com/FITQPQ\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <passengerInfoGroup> <segmentRepetitionControl> <segmentControlDetails> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </segmentRepetitionControl> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeGroup> <fareInfo> <valueQualifier>ADT</valueQualifier> </fareInfo> </passengerTypeGroup> </passengerInfoGroup> <pricingTktOptionGroup> <pricingTicketingDetails></pricingTicketingDetails> <fareQualifierDetails> <discountDetails> <fareQualifier>PE</fareQualifier> <percentage>50</percentage> </discountDetails> <discountDetails> <fareQualifier>NR</fareQualifier> </discountDetails> <discountDetails> <fareQualifier>NMX</fareQualifier> </discountDetails> </fareQualifierDetails> </pricingTktOptionGroup> <requestedSegmentInfoGroup> <originAndDestinationDetails></originAndDestinationDetails> <flightSegmentInfoGroup> <travelProductInfo> <flightDate> <departureDate>270508</departureDate> </flightDate> <boardPointDetails> <departureCity>NCE</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>PAR</arrivalCity> </offpointDetails> <companyDetails> <marketingCompany>AF</marketingCompany> </companyDetails> </travelProductInfo> </flightSegmentInfoGroup> </requestedSegmentInfoGroup> </Fare\_QuoteItinerary>

## 5.5.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.5.3 Possible Errors

See "Error Messages" section.

* * *

## 5.6 Operation: 031 Past travel and validating date and Point of sale override

The past travel date should be for a maximum of 12 months

Past Travel date : 10/11/10

Point of sale override : NYC

Cryptic : FQPCHI/D21JUN/AUAMAD/R,NYC,01NOV10

## 5.6.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItinerary xmlns="http://xml.amadeus.com/FITQPQ\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <passengerInfoGroup> <segmentRepetitionControl> <segmentControlDetails> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </segmentRepetitionControl> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeGroup> <fareInfo> <valueQualifier>ADT</valueQualifier> </fareInfo> </passengerTypeGroup> </passengerInfoGroup> <pricingTktOptionGroup> <pricingTicketingDetails> <productDateTimeDetails> <departureDate>011110</departureDate> </productDateTimeDetails> <locationDetails> <pointOfSaleOverrideCity>NYC</pointOfSaleOverrideCity> </locationDetails> </pricingTicketingDetails> </pricingTktOptionGroup> <requestedSegmentInfoGroup> <originAndDestinationDetails></originAndDestinationDetails> <flightSegmentInfoGroup> <travelProductInfo> <flightDate> <departureDate>210611</departureDate> </flightDate> <boardPointDetails> <departureCity>CHI</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>MAD</arrivalCity> </offpointDetails> <companyDetails> <marketingCompany>UA</marketingCompany> </companyDetails> </travelProductInfo> </flightSegmentInfoGroup> </requestedSegmentInfoGroup> </Fare\_QuoteItinerary>

## 5.6.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.6.3 Possible Errors

See "Error Messages" section.

* * *

## 5.7 Operation: 041 Ticketing point override and IATA rules source override

Ticketing point override : NYC

IATA rules source override : IAT

Cryptic : FQP CHI /D13APR/AUA MAD/R,.NYC,IATA

## 5.7.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItinerary xmlns="http://xml.amadeus.com/FITQPQ\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <passengerInfoGroup> <segmentRepetitionControl> <segmentControlDetails> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </segmentRepetitionControl> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeGroup> <fareInfo> <valueQualifier>ADT</valueQualifier> </fareInfo> </passengerTypeGroup> </passengerInfoGroup> <pricingTktOptionGroup> <pricingTicketingDetails> <priceTicketDetails> <indicators>IAT</indicators> </priceTicketDetails> <otherLocationDetails> <pointOfTicketingOverrideCity>NYC</pointOfTicketingOverrideCity> </otherLocationDetails> </pricingTicketingDetails> </pricingTktOptionGroup> <requestedSegmentInfoGroup> <originAndDestinationDetails></originAndDestinationDetails> <flightSegmentInfoGroup> <travelProductInfo> <flightDate> <departureDate>130408</departureDate> </flightDate> <boardPointDetails> <departureCity>CHI</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>MAD</arrivalCity> </offpointDetails> <companyDetails> <marketingCompany>UA</marketingCompany> </companyDetails> </travelProductInfo> </flightSegmentInfoGroup> </requestedSegmentInfoGroup> </Fare\_QuoteItinerary>

## 5.7.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItineraryReply xmlns="http://xml.amadeus.com/FITQPR\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <allFaresInfoGroup> <markerAllFares></markerAllFares> <involvedCurrenciesInfo> <conversionRateDetails> <conversionType>707</conversionType> <currency>EUR</currency> </conversionRateDetails> <conversionRateDetails> <conversionType>705</conversionType> <currency>USD</currency> </conversionRateDetails> </involvedCurrenciesInfo> <flightInfoGroup> <involvedFlightInfo> <boardPointDetails> <trueLocationId>CHI</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>MAD</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>UA</marketingCompany> </companyDetails> </involvedFlightInfo> <itineraryInfoGroup> <travelItineraryInfo> <segmentItemNumber>1</segmentItemNumber> </travelItineraryInfo> </itineraryInfoGroup> </flightInfoGroup> <fareProductInfoGroup> <generalAndIdInfo> <segmentControlDetails> <productReference>1</productReference> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </generalAndIdInfo> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeInfoGroup> <fareInfo></fareInfo> <pricingticketingDetails> <priceTicketDetails> <indicators>RBR</indicators> </priceTicketDetails> </pricingticketingDetails> <conversionRate> <conversionRateDetails> <conversionType>700</conversionType> <currency>NUC</currency> <rateType>ROE</rateType> <pricingAmount>1796.00</pricingAmount> <conversionRate>1.000000</conversionRate> </conversionRateDetails> </conversionRate> <monetaryInfo> <monetaryDetails> <typeQualifier>B</typeQualifier> <amount>1796.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>E</typeQualifier> <amount>1221.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>T</typeQualifier> <amount>1304.49</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>TX</typeQualifier> <amount>83.49</amount> </monetaryDetails> </monetaryInfo> <taxDetailsInfoGroup> <taxDetailsListInfo> <taxDetails> <rate>71.33</rate> <countryCode>YQ</countryCode> <type>AC</type> </taxDetails> <taxDetails> <rate>10.46</rate> <countryCode>US</countryCode> <type>AP</type> </taxDetails> <taxDetails> <rate>1.70</rate> <countryCode>AY</countryCode> <type>SE</type> </taxDetails> </taxDetailsListInfo> </taxDetailsInfoGroup> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>1</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>Y</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>Y</designator> <specialService>Y</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> </passengerTypeInfoGroup> </fareProductInfoGroup> </allFaresInfoGroup> </Fare\_QuoteItineraryReply>

## 5.7.3 Possible Errors

See "Error Messages" section.

* * *

## 5.8 Operation: 051 Price in a foreign Currency

Price in a foreign currency:

-   option : FC
-   currency : USD

Cryptic : FQP RIO /D13AUG /AIB MAD BCN /R,FC-USD

## 5.8.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItinerary xmlns="http://xml.amadeus.com/FITQPQ\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <conversionRate> <conversionRateDetails> <conversionType>FC</conversionType> <currency>USD</currency> </conversionRateDetails> </conversionRate> <passengerInfoGroup> <segmentRepetitionControl> <segmentControlDetails> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </segmentRepetitionControl> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeGroup> <fareInfo> <valueQualifier>ADT</valueQualifier> </fareInfo> </passengerTypeGroup> </passengerInfoGroup> <requestedSegmentInfoGroup> <originAndDestinationDetails></originAndDestinationDetails> <flightSegmentInfoGroup> <travelProductInfo> <flightDate> <departureDate>130808</departureDate> </flightDate> <boardPointDetails> <departureCity>RIO</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>MAD</arrivalCity> </offpointDetails> <companyDetails> <marketingCompany>IB</marketingCompany> </companyDetails> </travelProductInfo> </flightSegmentInfoGroup> <flightSegmentInfoGroup> <travelProductInfo> <boardPointDetails> <departureCity>MAD</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>BCN</arrivalCity> </offpointDetails> <companyDetails> <marketingCompany>IB</marketingCompany> </companyDetails> </travelProductInfo> </flightSegmentInfoGroup> </requestedSegmentInfoGroup> </Fare\_QuoteItinerary>

## 5.8.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItineraryReply xmlns="http://xml.amadeus.com/FITQPR\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <allFaresInfoGroup> <markerAllFares></markerAllFares> <involvedCurrenciesInfo> <conversionRateDetails> <conversionType>707</conversionType> <currency>USD</currency> </conversionRateDetails> <conversionRateDetails> <conversionType>705</conversionType> <currency>USD</currency> </conversionRateDetails> </involvedCurrenciesInfo> <flightInfoGroup> <involvedFlightInfo> <boardPointDetails> <trueLocationId>RIO</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>MAD</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>IB</marketingCompany> </companyDetails> </involvedFlightInfo> <itineraryInfoGroup> <travelItineraryInfo> <segmentItemNumber>1</segmentItemNumber> </travelItineraryInfo> </itineraryInfoGroup> </flightInfoGroup> <flightInfoGroup> <involvedFlightInfo> <boardPointDetails> <trueLocationId>MAD</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>BCN</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>IB</marketingCompany> </companyDetails> </involvedFlightInfo> <itineraryInfoGroup> <travelItineraryInfo> <segmentItemNumber>2</segmentItemNumber> </travelItineraryInfo> </itineraryInfoGroup> </flightInfoGroup> <fareProductInfoGroup> <generalAndIdInfo> <segmentControlDetails> <productReference>1</productReference> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </generalAndIdInfo> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeInfoGroup> <fareInfo> <fareTypeGrouping> <aggregatePTCDiscount>ADT</aggregatePTCDiscount> </fareTypeGrouping> </fareInfo> <pricingticketingDetails> <priceTicketDetails> <indicators>RBR</indicators> </priceTicketDetails> </pricingticketingDetails> <conversionRate> <conversionRateDetails> <conversionType>700</conversionType> <currency>NUC</currency> <rateType>ROE</rateType> <pricingAmount>1820.00</pricingAmount> <conversionRate>1.000000</conversionRate> </conversionRateDetails> </conversionRate> <monetaryInfo> <monetaryDetails> <typeQualifier>B</typeQualifier> <amount>1820.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>T</typeQualifier> <amount>1869.87</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>TX</typeQualifier> <amount>49.87</amount> </monetaryDetails> </monetaryInfo> <taxDetailsInfoGroup> <taxDetailsListInfo> <taxDetails> <rate>36.00</rate> <countryCode>BR</countryCode> <type>EB</type> </taxDetails> <taxDetails> <rate>10.49</rate> <countryCode>JD</countryCode> <type>AE</type> </taxDetails> <taxDetails> <rate>3.38</rate> <countryCode>QV</countryCode> <type>DP</type> </taxDetails> </taxDetailsListInfo> </taxDetailsInfoGroup> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>1</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>YOW2</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>Y</designator> <specialService>Y</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>2</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>YOW2</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>Y</designator> <specialService>Y</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> </passengerTypeInfoGroup> </fareProductInfoGroup> <fareProductInfoGroup> <generalAndIdInfo> <segmentControlDetails> <productReference>2</productReference> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </generalAndIdInfo> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeInfoGroup> <fareInfo> <fareTypeGrouping> <aggregatePTCDiscount>ADT</aggregatePTCDiscount> </fareTypeGrouping> </fareInfo> <pricingticketingDetails> <priceTicketDetails> <indicators>RBR</indicators> </priceTicketDetails> </pricingticketingDetails> <conversionRate> <conversionRateDetails> <conversionType>700</conversionType> <currency>NUC</currency> <rateType>ROE</rateType> <pricingAmount>2065.00</pricingAmount> <conversionRate>1.000000</conversionRate> </conversionRateDetails> </conversionRate> <monetaryInfo> <monetaryDetails> <typeQualifier>B</typeQualifier> <amount>2065.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>T</typeQualifier> <amount>2114.87</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>TX</typeQualifier> <amount>49.87</amount> </monetaryDetails> </monetaryInfo> <taxDetailsInfoGroup> <taxDetailsListInfo> <taxDetails> <rate>36.00</rate> <countryCode>BR</countryCode> <type>EB</type> </taxDetails> <taxDetails> <rate>10.49</rate> <countryCode>JD</countryCode> <type>AE</type> </taxDetails> <taxDetails> <rate>3.38</rate> <countryCode>QV</countryCode> <type>DP</type> </taxDetails> </taxDetailsListInfo> </taxDetailsInfoGroup> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>1</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>DOWBR</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>D</designator> <specialService>D</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>2</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>DOWBR</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>D</designator> <specialService>D</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> </passengerTypeInfoGroup> </fareProductInfoGroup> <fareProductInfoGroup> <generalAndIdInfo> <segmentControlDetails> <productReference>3</productReference> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </generalAndIdInfo> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeInfoGroup> <fareInfo> <fareTypeGrouping> <aggregatePTCDiscount>ADT</aggregatePTCDiscount> </fareTypeGrouping> </fareInfo> <pricingticketingDetails> <priceTicketDetails> <indicators>RBR</indicators> </priceTicketDetails> </pricingticketingDetails> <conversionRate> <conversionRateDetails> <conversionType>700</conversionType> <currency>NUC</currency> <rateType>ROE</rateType> <pricingAmount>2532.00</pricingAmount> <conversionRate>1.000000</conversionRate> </conversionRateDetails> </conversionRate> <monetaryInfo> <monetaryDetails> <typeQualifier>B</typeQualifier> <amount>2532.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>T</typeQualifier> <amount>2581.87</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>TX</typeQualifier> <amount>49.87</amount> </monetaryDetails> </monetaryInfo> <taxDetailsInfoGroup> <taxDetailsListInfo> <taxDetails> <rate>36.00</rate> <countryCode>BR</countryCode> <type>EB</type> </taxDetails> <taxDetails> <rate>10.49</rate> <countryCode>JD</countryCode> <type>AE</type> </taxDetails> <taxDetails> <rate>3.38</rate> <countryCode>QV</countryCode> <type>DP</type> </taxDetails> </taxDetailsListInfo> </taxDetailsInfoGroup> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>1</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>JOW2</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>J</designator> <specialService>J</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>2</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>JOW2</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>J</designator> <specialService>J</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> </passengerTypeInfoGroup> </fareProductInfoGroup> <fareProductInfoGroup> <generalAndIdInfo> <segmentControlDetails> <productReference>4</productReference> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </generalAndIdInfo> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeInfoGroup> <fareInfo> <fareTypeGrouping> <aggregatePTCDiscount>ADT</aggregatePTCDiscount> </fareTypeGrouping> </fareInfo> <pricingticketingDetails> <priceTicketDetails> <indicators>RBR</indicators> </priceTicketDetails> </pricingticketingDetails> <conversionRate> <conversionRateDetails> <conversionType>700</conversionType> <currency>NUC</currency> <rateType>ROE</rateType> <pricingAmount>6416.00</pricingAmount> <conversionRate>1.000000</conversionRate> </conversionRateDetails> </conversionRate> <monetaryInfo> <monetaryDetails> <typeQualifier>B</typeQualifier> <amount>6416.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>T</typeQualifier> <amount>6465.87</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>TX</typeQualifier> <amount>49.87</amount> </monetaryDetails> </monetaryInfo> <taxDetailsInfoGroup> <taxDetailsListInfo> <taxDetails> <rate>36.00</rate> <countryCode>BR</countryCode> <type>EB</type> </taxDetails> <taxDetails> <rate>10.49</rate> <countryCode>JD</countryCode> <type>AE</type> </taxDetails> <taxDetails> <rate>3.38</rate> <countryCode>QV</countryCode> <type>DP</type> </taxDetails> </taxDetailsListInfo> </taxDetailsInfoGroup> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>1</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>FIF</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>J</designator> <specialService>J</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>2</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>FIF</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>J</designator> <specialService>J</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> </passengerTypeInfoGroup> </fareProductInfoGroup> </allFaresInfoGroup> </Fare\_QuoteItineraryReply>

## 5.8.3 Possible Errors

See "Error Messages" section.

* * *

## 5.9 Operation: 061 Select fares in a foreign Currency

Select fares in a foreign currency:

-   option : FS
-   currency : USD

Cryptic : FQP RIO /D14SEP /AIB MAD BCN /R,FS-USD

## 5.9.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItinerary xmlns="http://xml.amadeus.com/FITQPQ\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <conversionRate> <conversionRateDetails> <conversionType>FS</conversionType> <currency>USD</currency> </conversionRateDetails> </conversionRate> <passengerInfoGroup> <segmentRepetitionControl> <segmentControlDetails> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </segmentRepetitionControl> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeGroup> <fareInfo> <valueQualifier>ADT</valueQualifier> </fareInfo> </passengerTypeGroup> </passengerInfoGroup> <requestedSegmentInfoGroup> <originAndDestinationDetails></originAndDestinationDetails> <flightSegmentInfoGroup> <travelProductInfo> <flightDate> <departureDate>140908</departureDate> </flightDate> <boardPointDetails> <departureCity>RIO</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>MAD</arrivalCity> </offpointDetails> <companyDetails> <marketingCompany>IB</marketingCompany> </companyDetails> </travelProductInfo> </flightSegmentInfoGroup> <flightSegmentInfoGroup> <travelProductInfo> <boardPointDetails> <departureCity>MAD</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>BCN</arrivalCity> </offpointDetails> <companyDetails> <marketingCompany>IB</marketingCompany> </companyDetails> </travelProductInfo> </flightSegmentInfoGroup> </requestedSegmentInfoGroup> </Fare\_QuoteItinerary>

## 5.9.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItineraryReply xmlns="http://xml.amadeus.com/FITQPR\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <errorInfoGroup> <rejectErrorCode> <errorDetails> <errorCode>0</errorCode> </errorDetails> </rejectErrorCode> <errorFreeText> <freeText>VERIFY CURRENCY OPTION</freeText> </errorFreeText> </errorInfoGroup> </Fare\_QuoteItineraryReply>

## 5.9.3 Possible Errors

See "Error Messages" section.

* * *

## 5.10 Operation: 070 Manual BSR processing

Manual BSR processing

Cryptic : FQP LON /D14SEP NYC /R,BR-1.23456789

## 5.10.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItinerary xmlns="http://xml.amadeus.com/FITQPQ\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <conversionRate> <conversionRateDetails> <conversionType>BR</conversionType> <pricingAmount>1.23456789</pricingAmount> </conversionRateDetails> </conversionRate> <passengerInfoGroup> <segmentRepetitionControl> <segmentControlDetails> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </segmentRepetitionControl> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeGroup> <fareInfo> <valueQualifier>ADT</valueQualifier> </fareInfo> </passengerTypeGroup> </passengerInfoGroup> <requestedSegmentInfoGroup> <originAndDestinationDetails></originAndDestinationDetails> <flightSegmentInfoGroup> <travelProductInfo> <flightDate> <departureDate>140908</departureDate> </flightDate> <boardPointDetails> <departureCity>LON</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>NYC</arrivalCity> </offpointDetails> </travelProductInfo> </flightSegmentInfoGroup> </requestedSegmentInfoGroup> </Fare\_QuoteItinerary>

## 5.10.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItineraryReply xmlns="http://xml.amadeus.com/FITQPR\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <errorInfoGroup> <rejectErrorCode> <errorDetails> <errorCode>0</errorCode> </errorDetails> </rejectErrorCode> <errorFreeText> <freeText>MANUAL MANIPULATION OF BANK SELLING RATE NOT ALLOWED</freeText> </errorFreeText> </errorInfoGroup> </Fare\_QuoteItineraryReply>

## 5.10.3 Possible Errors

See "Error Messages" section.

* * *

## 5.11 Operation: 081 Tax and Surcharge options

Tax exemption, all Taxes : E

Cryptic : FQP LON /D17AUG NYC /R,ET/L

## 5.11.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItinerary xmlns="http://xml.amadeus.com/FITQPQ\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <taxOptionsInfoGroup> <taxProcessingInfo> <taxCategory>E</taxCategory> </taxProcessingInfo> </taxOptionsInfoGroup> <passengerInfoGroup> <segmentRepetitionControl> <segmentControlDetails> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </segmentRepetitionControl> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeGroup> <fareInfo> <valueQualifier>ADT</valueQualifier> </fareInfo> </passengerTypeGroup> </passengerInfoGroup> <pricingTktOptionGroup> <pricingTicketingDetails> <priceTicketDetails> <indicators>LF</indicators> </priceTicketDetails> </pricingTicketingDetails> </pricingTktOptionGroup> <requestedSegmentInfoGroup> <originAndDestinationDetails></originAndDestinationDetails> <flightSegmentInfoGroup> <travelProductInfo> <flightDate> <departureDate>170808</departureDate> </flightDate> <boardPointDetails> <departureCity>LON</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>NYC</arrivalCity> </offpointDetails> </travelProductInfo> </flightSegmentInfoGroup> </requestedSegmentInfoGroup> </Fare\_QuoteItinerary>

## 5.11.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItineraryReply xmlns="http://xml.amadeus.com/FITQPR\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <allFaresInfoGroup> <markerAllFares></markerAllFares> <involvedCurrenciesInfo> <conversionRateDetails> <conversionType>707</conversionType> <currency>EUR</currency> </conversionRateDetails> <conversionRateDetails> <conversionType>705</conversionType> <currency>GBP</currency> </conversionRateDetails> </involvedCurrenciesInfo> <flightInfoGroup> <involvedFlightInfo> <boardPointDetails> <trueLocationId>LON</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>NYC</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>YY</marketingCompany> </companyDetails> </involvedFlightInfo> <itineraryInfoGroup> <travelItineraryInfo> <segmentItemNumber>1</segmentItemNumber> </travelItineraryInfo> </itineraryInfoGroup> </flightInfoGroup> <fareProductInfoGroup> <generalAndIdInfo> <segmentControlDetails> <productReference>1</productReference> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </generalAndIdInfo> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeInfoGroup> <fareInfo> <fareTypeGrouping> <aggregatePTCDiscount>ADT</aggregatePTCDiscount> </fareTypeGrouping> </fareInfo> <pricingticketingDetails> <priceTicketDetails> <indicators>RBR</indicators> <indicators>TEX</indicators> </priceTicketDetails> </pricingticketingDetails> <conversionRate> <conversionRateDetails> <conversionType>700</conversionType> <currency>NUC</currency> <rateType>ROE</rateType> <pricingAmount>2837.33</pricingAmount> <conversionRate>0.634398</conversionRate> </conversionRateDetails> </conversionRate> <monetaryInfo> <monetaryDetails> <typeQualifier>B</typeQualifier> <amount>1800.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>E</typeQualifier> <amount>2161.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>T</typeQualifier> <amount>2161.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>TX</typeQualifier> <amount>0.00</amount> </monetaryDetails> </monetaryInfo> <taxDetailsInfoGroup> <taxDetailsListInfo> <taxDetails> <countryCode>GB</countryCode> <type>AD</type> <indicator>E</indicator> </taxDetails> <taxDetails> <countryCode>YC</countryCode> <type>AE</type> <indicator>E</indicator> </taxDetails> <taxDetails> <countryCode>US</countryCode> <type>AS</type> <indicator>E</indicator> </taxDetails> <taxDetails> <countryCode>XA</countryCode> <type>CO</type> <indicator>E</indicator> </taxDetails> <taxDetails> <countryCode>XY</countryCode> <type>CR</type> <indicator>E</indicator> </taxDetails> </taxDetailsListInfo> </taxDetailsInfoGroup> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>1</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>YIF</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>Y</designator> <specialService>Y</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> </passengerTypeInfoGroup> </fareProductInfoGroup> </allFaresInfoGroup> </Fare\_QuoteItineraryReply>

## 5.11.3 Possible Errors

See "Error Messages" section.

* * *

## 5.12 Operation: 082 Tax and Surcharge options

Tax Exemption, specific taxes.

Cryptic : FQP LON /D17AUG NYC /R,ET-USAS-XT-YC/L

## 5.12.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItinerary xmlns="http://xml.amadeus.com/FITQPQ\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <taxOptionsInfoGroup> <taxProcessingInfo> <taxCategory>E</taxCategory> <taxDetails> <countryCode>US</countryCode> <taxTypeCode>AS</taxTypeCode> </taxDetails> <taxDetails> <countryCode>XT</countryCode> </taxDetails> <taxDetails> <countryCode>YC</countryCode> </taxDetails> </taxProcessingInfo> </taxOptionsInfoGroup> <passengerInfoGroup> <segmentRepetitionControl> <segmentControlDetails> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </segmentRepetitionControl> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeGroup> <fareInfo> <valueQualifier>ADT</valueQualifier> </fareInfo> </passengerTypeGroup> </passengerInfoGroup> <pricingTktOptionGroup> <pricingTicketingDetails> <priceTicketDetails> <indicators>LF</indicators> </priceTicketDetails> </pricingTicketingDetails> </pricingTktOptionGroup> <requestedSegmentInfoGroup> <originAndDestinationDetails></originAndDestinationDetails> <flightSegmentInfoGroup> <travelProductInfo> <flightDate> <departureDate>170808</departureDate> </flightDate> <boardPointDetails> <departureCity>LON</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>NYC</arrivalCity> </offpointDetails> </travelProductInfo> </flightSegmentInfoGroup> </requestedSegmentInfoGroup> </Fare\_QuoteItinerary>

## 5.12.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItineraryReply xmlns="http://xml.amadeus.com/FITQPR\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <allFaresInfoGroup> <markerAllFares></markerAllFares> <involvedCurrenciesInfo> <conversionRateDetails> <conversionType>707</conversionType> <currency>EUR</currency> </conversionRateDetails> <conversionRateDetails> <conversionType>705</conversionType> <currency>GBP</currency> </conversionRateDetails> </involvedCurrenciesInfo> <flightInfoGroup> <involvedFlightInfo> <boardPointDetails> <trueLocationId>LON</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>NYC</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>YY</marketingCompany> </companyDetails> </involvedFlightInfo> <itineraryInfoGroup> <travelItineraryInfo> <segmentItemNumber>1</segmentItemNumber> </travelItineraryInfo> </itineraryInfoGroup> </flightInfoGroup> <fareProductInfoGroup> <generalAndIdInfo> <segmentControlDetails> <productReference>1</productReference> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </generalAndIdInfo> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeInfoGroup> <fareInfo> <fareTypeGrouping> <aggregatePTCDiscount>ADT</aggregatePTCDiscount> </fareTypeGrouping> </fareInfo> <pricingticketingDetails> <priceTicketDetails> <indicators>RBR</indicators> </priceTicketDetails> </pricingticketingDetails> <conversionRate> <conversionRateDetails> <conversionType>700</conversionType> <currency>NUC</currency> <rateType>ROE</rateType> <pricingAmount>2837.33</pricingAmount> <conversionRate>0.634398</conversionRate> </conversionRateDetails> </conversionRate> <monetaryInfo> <monetaryDetails> <typeQualifier>B</typeQualifier> <amount>1800.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>E</typeQualifier> <amount>2161.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>T</typeQualifier> <amount>2242.29</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>TX</typeQualifier> <amount>81.29</amount> </monetaryDetails> </monetaryInfo> <taxDetailsInfoGroup> <taxDetailsListInfo> <taxDetails> <rate>72.03</rate> <countryCode>GB</countryCode> <type>AD</type> </taxDetails> <taxDetails> <countryCode>YC</countryCode> <type>AE</type> <indicator>E</indicator> </taxDetails> <taxDetails> <countryCode>US</countryCode> <type>AS</type> <indicator>E</indicator> </taxDetails> <taxDetails> <rate>3.86</rate> <countryCode>XA</countryCode> <type>CO</type> </taxDetails> <taxDetails> <rate>5.40</rate> <countryCode>XY</countryCode> <type>CR</type> </taxDetails> </taxDetailsListInfo> </taxDetailsInfoGroup> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>1</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>YIF</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>Y</designator> <specialService>Y</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> </passengerTypeInfoGroup> </fareProductInfoGroup> </allFaresInfoGroup> </Fare\_QuoteItineraryReply>

## 5.12.3 Possible Errors

See "Error Messages" section.

* * *

## 5.13 Operation: 083 Tax and Surcharge options

Add Specified Tax US with a decimal and Percentage amount

The amount specified with the option Add Specified Tax should not be more than 6 digits, or 5 digits + the . (for a decimal amount).

Cryptic : FQP LON /D01SEP NYC /R,AT-US123.45A/L

## 5.13.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItinerary xmlns="http://xml.amadeus.com/FITQPQ\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <taxOptionsInfoGroup> <taxProcessingInfo> <taxCategory>700</taxCategory> <taxDetails> <rate>123.45</rate> <countryCode>US</countryCode> <taxAmountOrPercentageQual>A</taxAmountOrPercentageQual> </taxDetails> </taxProcessingInfo> </taxOptionsInfoGroup> <passengerInfoGroup> <segmentRepetitionControl> <segmentControlDetails> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </segmentRepetitionControl> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeGroup> <fareInfo> <valueQualifier>ADT</valueQualifier> </fareInfo> </passengerTypeGroup> </passengerInfoGroup> <pricingTktOptionGroup> <pricingTicketingDetails> <priceTicketDetails> <indicators>LF</indicators> </priceTicketDetails> </pricingTicketingDetails> </pricingTktOptionGroup> <requestedSegmentInfoGroup> <originAndDestinationDetails></originAndDestinationDetails> <flightSegmentInfoGroup> <travelProductInfo> <flightDate> <departureDate>010908</departureDate> </flightDate> <boardPointDetails> <departureCity>LON</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>NYC</arrivalCity> </offpointDetails> </travelProductInfo> </flightSegmentInfoGroup> </requestedSegmentInfoGroup> </Fare\_QuoteItinerary>

## 5.13.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItineraryReply xmlns="http://xml.amadeus.com/FITQPR\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <allFaresInfoGroup> <markerAllFares></markerAllFares> <involvedCurrenciesInfo> <conversionRateDetails> <conversionType>707</conversionType> <currency>EUR</currency> </conversionRateDetails> <conversionRateDetails> <conversionType>705</conversionType> <currency>GBP</currency> </conversionRateDetails> </involvedCurrenciesInfo> <flightInfoGroup> <involvedFlightInfo> <boardPointDetails> <trueLocationId>LON</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>NYC</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>YY</marketingCompany> </companyDetails> </involvedFlightInfo> <itineraryInfoGroup> <travelItineraryInfo> <segmentItemNumber>1</segmentItemNumber> </travelItineraryInfo> </itineraryInfoGroup> </flightInfoGroup> <fareProductInfoGroup> <generalAndIdInfo> <segmentControlDetails> <productReference>1</productReference> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </generalAndIdInfo> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeInfoGroup> <fareInfo> <fareTypeGrouping> <aggregatePTCDiscount>ADT</aggregatePTCDiscount> </fareTypeGrouping> </fareInfo> <pricingticketingDetails> <priceTicketDetails> <indicators>RBR</indicators> </priceTicketDetails> </pricingticketingDetails> <conversionRate> <conversionRateDetails> <conversionType>700</conversionType> <currency>NUC</currency> <rateType>ROE</rateType> <pricingAmount>2837.33</pricingAmount> <conversionRate>0.634398</conversionRate> </conversionRateDetails> </conversionRate> <monetaryInfo> <monetaryDetails> <typeQualifier>B</typeQualifier> <amount>1800.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>E</typeQualifier> <amount>2161.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>T</typeQualifier> <amount>2369.99</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>TX</typeQualifier> <amount>208.99</amount> </monetaryDetails> </monetaryInfo> <taxDetailsInfoGroup> <taxDetailsListInfo> <taxDetails> <rate>72.03</rate> <countryCode>GB</countryCode> <type>AD</type> </taxDetails> <taxDetails> <rate>4.25</rate> <countryCode>YC</countryCode> <type>AE</type> </taxDetails> <taxDetails> <rate>123.45</rate> <countryCode>US</countryCode> <type>AS</type> </taxDetails> <taxDetails> <rate>3.86</rate> <countryCode>XA</countryCode> <type>CO</type> </taxDetails> <taxDetails> <rate>5.40</rate> <countryCode>XY</countryCode> <type>CR</type> </taxDetails> </taxDetailsListInfo> </taxDetailsInfoGroup> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>1</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>YIF</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>Y</designator> <specialService>Y</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> </passengerTypeInfoGroup> </fareProductInfoGroup> </allFaresInfoGroup> </Fare\_QuoteItineraryReply>

## 5.13.3 Possible Errors

See "Error Messages" section.

* * *

## 5.14 Operation: 084 Tax and Surcharge options

Add Specified Tax with tax nature and percentage amount

The amount specified with the option Add Specified Tax should not be more than 6 digits, or 5 digits + the . (for a decimal amount).

Cryptic : FQP LON /D01SEP NYC /R,AT-USAS10P/L

## 5.14.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItinerary xmlns="http://xml.amadeus.com/FITQPQ\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <taxOptionsInfoGroup> <taxProcessingInfo> <taxCategory>700</taxCategory> <taxDetails> <rate>10</rate> <countryCode>US</countryCode> <taxTypeCode>AS</taxTypeCode> <taxAmountOrPercentageQual>P</taxAmountOrPercentageQual> </taxDetails> </taxProcessingInfo> </taxOptionsInfoGroup> <passengerInfoGroup> <segmentRepetitionControl> <segmentControlDetails> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </segmentRepetitionControl> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeGroup> <fareInfo> <valueQualifier>ADT</valueQualifier> </fareInfo> </passengerTypeGroup> </passengerInfoGroup> <pricingTktOptionGroup> <pricingTicketingDetails> <priceTicketDetails> <indicators>LF</indicators> </priceTicketDetails> </pricingTicketingDetails> </pricingTktOptionGroup> <requestedSegmentInfoGroup> <originAndDestinationDetails></originAndDestinationDetails> <flightSegmentInfoGroup> <travelProductInfo> <flightDate> <departureDate>010908</departureDate> </flightDate> <boardPointDetails> <departureCity>LON</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>NYC</arrivalCity> </offpointDetails> </travelProductInfo> </flightSegmentInfoGroup> </requestedSegmentInfoGroup> </Fare\_QuoteItinerary>

## 5.14.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItineraryReply xmlns="http://xml.amadeus.com/FITQPR\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <allFaresInfoGroup> <markerAllFares></markerAllFares> <involvedCurrenciesInfo> <conversionRateDetails> <conversionType>707</conversionType> <currency>EUR</currency> </conversionRateDetails> <conversionRateDetails> <conversionType>705</conversionType> <currency>GBP</currency> </conversionRateDetails> </involvedCurrenciesInfo> <flightInfoGroup> <involvedFlightInfo> <boardPointDetails> <trueLocationId>LON</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>NYC</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>YY</marketingCompany> </companyDetails> </involvedFlightInfo> <itineraryInfoGroup> <travelItineraryInfo> <segmentItemNumber>1</segmentItemNumber> </travelItineraryInfo> </itineraryInfoGroup> </flightInfoGroup> <fareProductInfoGroup> <generalAndIdInfo> <segmentControlDetails> <productReference>1</productReference> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </generalAndIdInfo> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeInfoGroup> <fareInfo> <fareTypeGrouping> <aggregatePTCDiscount>ADT</aggregatePTCDiscount> </fareTypeGrouping> </fareInfo> <pricingticketingDetails> <priceTicketDetails> <indicators>RBR</indicators> </priceTicketDetails> </pricingticketingDetails> <conversionRate> <conversionRateDetails> <conversionType>700</conversionType> <currency>NUC</currency> <rateType>ROE</rateType> <pricingAmount>2837.33</pricingAmount> <conversionRate>0.634398</conversionRate> </conversionRateDetails> </conversionRate> <monetaryInfo> <monetaryDetails> <typeQualifier>B</typeQualifier> <amount>1800.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>E</typeQualifier> <amount>2161.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>T</typeQualifier> <amount>2462.64</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>TX</typeQualifier> <amount>301.64</amount> </monetaryDetails> </monetaryInfo> <taxDetailsInfoGroup> <taxDetailsListInfo> <taxDetails> <rate>72.03</rate> <countryCode>GB</countryCode> <type>AD</type> </taxDetails> <taxDetails> <rate>4.25</rate> <countryCode>YC</countryCode> <type>AE</type> </taxDetails> <taxDetails> <rate>216.10</rate> <countryCode>US</countryCode> <type>AS</type> </taxDetails> <taxDetails> <rate>3.86</rate> <countryCode>XA</countryCode> <type>CO</type> </taxDetails> <taxDetails> <rate>5.40</rate> <countryCode>XY</countryCode> <type>CR</type> </taxDetails> </taxDetailsListInfo> </taxDetailsInfoGroup> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>1</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>YIF</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>Y</designator> <specialService>Y</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> </passengerTypeInfoGroup> </fareProductInfoGroup> </allFaresInfoGroup> </Fare\_QuoteItineraryReply>

## 5.14.3 Possible Errors

See "Error Messages" section.

* * *

## 5.15 Operation: 085 Tax and Surcharge options

Add several Taxes.

Cryptic : FQPLON/D19AUGNYC/R,AT-USLO123456A-DE100A/L

## 5.15.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItinerary xmlns="http://xml.amadeus.com/FITQPQ\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <taxOptionsInfoGroup> <taxProcessingInfo> <taxCategory>700</taxCategory> <taxDetails> <rate>123456</rate> <countryCode>US</countryCode> <taxTypeCode>LO</taxTypeCode> <taxAmountOrPercentageQual>A</taxAmountOrPercentageQual> </taxDetails> <taxDetails> <rate>100</rate> <countryCode>DE</countryCode> <taxAmountOrPercentageQual>A</taxAmountOrPercentageQual> </taxDetails> </taxProcessingInfo> </taxOptionsInfoGroup> <passengerInfoGroup> <segmentRepetitionControl> <segmentControlDetails> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </segmentRepetitionControl> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeGroup> <fareInfo> <valueQualifier>ADT</valueQualifier> </fareInfo> </passengerTypeGroup> </passengerInfoGroup> <pricingTktOptionGroup> <pricingTicketingDetails> <priceTicketDetails> <indicators>LF</indicators> </priceTicketDetails> </pricingTicketingDetails> </pricingTktOptionGroup> <requestedSegmentInfoGroup> <originAndDestinationDetails></originAndDestinationDetails> <flightSegmentInfoGroup> <travelProductInfo> <flightDate> <departureDate>190808</departureDate> </flightDate> <boardPointDetails> <departureCity>LON</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>NYC</arrivalCity> </offpointDetails> </travelProductInfo> </flightSegmentInfoGroup> </requestedSegmentInfoGroup> </Fare\_QuoteItinerary>

## 5.15.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItineraryReply xmlns="http://xml.amadeus.com/FITQPR\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <allFaresInfoGroup> <markerAllFares></markerAllFares> <involvedCurrenciesInfo> <conversionRateDetails> <conversionType>707</conversionType> <currency>EUR</currency> </conversionRateDetails> <conversionRateDetails> <conversionType>705</conversionType> <currency>GBP</currency> </conversionRateDetails> </involvedCurrenciesInfo> <flightInfoGroup> <involvedFlightInfo> <boardPointDetails> <trueLocationId>LON</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>NYC</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>YY</marketingCompany> </companyDetails> </involvedFlightInfo> <itineraryInfoGroup> <travelItineraryInfo> <segmentItemNumber>1</segmentItemNumber> </travelItineraryInfo> </itineraryInfoGroup> </flightInfoGroup> <fareProductInfoGroup> <generalAndIdInfo> <segmentControlDetails> <productReference>1</productReference> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </generalAndIdInfo> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeInfoGroup> <fareInfo> <fareTypeGrouping> <aggregatePTCDiscount>ADT</aggregatePTCDiscount> </fareTypeGrouping> </fareInfo> <pricingticketingDetails> <priceTicketDetails> <indicators>RBR</indicators> </priceTicketDetails> </pricingticketingDetails> <conversionRate> <conversionRateDetails> <conversionType>700</conversionType> <currency>NUC</currency> <rateType>ROE</rateType> <pricingAmount>2837.33</pricingAmount> <conversionRate>0.634398</conversionRate> </conversionRateDetails> </conversionRate> <monetaryInfo> <monetaryDetails> <typeQualifier>B</typeQualifier> <amount>1800.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>E</typeQualifier> <amount>2161.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>T</typeQualifier> <amount>125815.12</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>TX</typeQualifier> <amount>123654.12</amount> </monetaryDetails> </monetaryInfo> <taxDetailsInfoGroup> <taxDetailsListInfo> <taxDetails> <rate>72.03</rate> <countryCode>GB</countryCode> <type>AD</type> </taxDetails> <taxDetails> <rate>4.25</rate> <countryCode>YC</countryCode> <type>AE</type> </taxDetails> <taxDetails> <rate>12.58</rate> <countryCode>US</countryCode> <type>AS</type> </taxDetails> <taxDetails> <rate>3.86</rate> <countryCode>XA</countryCode> <type>CO</type> </taxDetails> <taxDetails> <rate>5.40</rate> <countryCode>XY</countryCode> <type>CR</type> </taxDetails> <taxDetails> <rate>123456.00</rate> <countryCode>US</countryCode> <type>LO</type> </taxDetails> <taxDetails> <rate>100.00</rate> <countryCode>DE</countryCode> </taxDetails> </taxDetailsListInfo> </taxDetailsInfoGroup> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>1</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>YIF</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>Y</designator> <specialService>Y</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> </passengerTypeInfoGroup> </fareProductInfoGroup> </allFaresInfoGroup> </Fare\_QuoteItineraryReply>

## 5.15.3 Possible Errors

See "Error Messages" section.

* * *

## 5.16 Operation: 086 Tax and Surcharge options

Add one Tax and exempt two others

The amount specified with the option Add Specified Tax should not be more than 6 digits, or 5 digits + the . (for a decimal amount).

Cryptic : FQP LON /D19AUG NYC /L /R,AT-USLO,ET-BG-USAS

## 5.16.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItinerary xmlns="http://xml.amadeus.com/FITQPQ\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <taxOptionsInfoGroup> <taxProcessingInfo> <taxCategory>700</taxCategory> <taxDetails> <rate>100</rate> <countryCode>US</countryCode> <taxTypeCode>LO</taxTypeCode> <taxAmountOrPercentageQual>A</taxAmountOrPercentageQual> </taxDetails> <taxDetails> <rate>10</rate> <countryCode>RK</countryCode> <taxAmountOrPercentageQual>P</taxAmountOrPercentageQual> </taxDetails> </taxProcessingInfo> </taxOptionsInfoGroup> <taxOptionsInfoGroup> <taxProcessingInfo> <taxCategory>E</taxCategory> <taxDetails> <countryCode>BG</countryCode> </taxDetails> <taxDetails> <countryCode>US</countryCode> <taxTypeCode>AS</taxTypeCode> </taxDetails> </taxProcessingInfo> </taxOptionsInfoGroup> <passengerInfoGroup> <segmentRepetitionControl> <segmentControlDetails> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </segmentRepetitionControl> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeGroup> <fareInfo> <valueQualifier>ADT</valueQualifier> </fareInfo> </passengerTypeGroup> </passengerInfoGroup> <pricingTktOptionGroup> <pricingTicketingDetails> <priceTicketDetails> <indicators>LF</indicators> </priceTicketDetails> </pricingTicketingDetails> </pricingTktOptionGroup> <requestedSegmentInfoGroup> <originAndDestinationDetails></originAndDestinationDetails> <flightSegmentInfoGroup> <travelProductInfo> <flightDate> <departureDate>190808</departureDate> </flightDate> <boardPointDetails> <departureCity>LON</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>NYC</arrivalCity> </offpointDetails> </travelProductInfo> </flightSegmentInfoGroup> </requestedSegmentInfoGroup> </Fare\_QuoteItinerary>

## 5.16.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItineraryReply xmlns="http://xml.amadeus.com/FITQPR\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <allFaresInfoGroup> <markerAllFares></markerAllFares> <involvedCurrenciesInfo> <conversionRateDetails> <conversionType>707</conversionType> <currency>EUR</currency> </conversionRateDetails> <conversionRateDetails> <conversionType>705</conversionType> <currency>GBP</currency> </conversionRateDetails> </involvedCurrenciesInfo> <flightInfoGroup> <involvedFlightInfo> <boardPointDetails> <trueLocationId>LON</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>NYC</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>YY</marketingCompany> </companyDetails> </involvedFlightInfo> <itineraryInfoGroup> <travelItineraryInfo> <segmentItemNumber>1</segmentItemNumber> </travelItineraryInfo> </itineraryInfoGroup> </flightInfoGroup> <fareProductInfoGroup> <generalAndIdInfo> <segmentControlDetails> <productReference>1</productReference> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </generalAndIdInfo> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeInfoGroup> <fareInfo> <fareTypeGrouping> <aggregatePTCDiscount>ADT</aggregatePTCDiscount> </fareTypeGrouping> </fareInfo> <pricingticketingDetails> <priceTicketDetails> <indicators>RBR</indicators> </priceTicketDetails> </pricingticketingDetails> <conversionRate> <conversionRateDetails> <conversionType>700</conversionType> <currency>NUC</currency> <rateType>ROE</rateType> <pricingAmount>2837.33</pricingAmount> <conversionRate>0.634398</conversionRate> </conversionRateDetails> </conversionRate> <monetaryInfo> <monetaryDetails> <typeQualifier>B</typeQualifier> <amount>1800.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>E</typeQualifier> <amount>2161.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>T</typeQualifier> <amount>2562.64</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>TX</typeQualifier> <amount>401.64</amount> </monetaryDetails> </monetaryInfo> <taxDetailsInfoGroup> <taxDetailsListInfo> <taxDetails> <rate>72.03</rate> <countryCode>GB</countryCode> <type>AD</type> </taxDetails> <taxDetails> <rate>4.25</rate> <countryCode>YC</countryCode> <type>AE</type> </taxDetails> <taxDetails> <countryCode>US</countryCode> <type>AS</type> <indicator>E</indicator> </taxDetails> <taxDetails> <rate>3.86</rate> <countryCode>XA</countryCode> <type>CO</type> </taxDetails> <taxDetails> <rate>5.40</rate> <countryCode>XY</countryCode> <type>CR</type> </taxDetails> <taxDetails> <rate>100.00</rate> <countryCode>US</countryCode> <type>LO</type> </taxDetails> <taxDetails> <rate>216.10</rate> <countryCode>RK</countryCode> </taxDetails> </taxDetailsListInfo> </taxDetailsInfoGroup> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>1</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>YIF</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>Y</designator> <specialService>Y</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> </passengerTypeInfoGroup> </fareProductInfoGroup> </allFaresInfoGroup> </Fare\_QuoteItineraryReply>

## 5.16.3 Possible Errors

See "Error Messages" section.

* * *

## 5.17 Operation: 087 Tax and Surcharge options

Add (AC) / Withhold (WC) all Country Taxes (for specified countries)

Warning: if 2 countries are requested after AC , only the first one is mapped.

Cryptic : FQP PAR /D14JUL LON NYC /R,AC-GB\*WC-US/L

## 5.17.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItinerary xmlns="http://xml.amadeus.com/FITQPQ\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <taxOptionsInfoGroup> <taxProcessingInfo> <taxCategory>AC</taxCategory> <taxDetails> <countryCode>GB</countryCode> </taxDetails> </taxProcessingInfo> </taxOptionsInfoGroup> <taxOptionsInfoGroup> <taxProcessingInfo> <taxCategory>WC</taxCategory> <taxDetails> <countryCode>US</countryCode> </taxDetails> </taxProcessingInfo> </taxOptionsInfoGroup> <passengerInfoGroup> <segmentRepetitionControl> <segmentControlDetails> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </segmentRepetitionControl> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeGroup> <fareInfo> <valueQualifier>ADT</valueQualifier> </fareInfo> </passengerTypeGroup> </passengerInfoGroup> <pricingTktOptionGroup> <pricingTicketingDetails> <priceTicketDetails> <indicators>LF</indicators> </priceTicketDetails> </pricingTicketingDetails> </pricingTktOptionGroup> <requestedSegmentInfoGroup> <originAndDestinationDetails></originAndDestinationDetails> <flightSegmentInfoGroup> <travelProductInfo> <flightDate> <departureDate>140708</departureDate> </flightDate> <boardPointDetails> <departureCity>PAR</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>LON</arrivalCity> </offpointDetails> </travelProductInfo> </flightSegmentInfoGroup> <flightSegmentInfoGroup> <travelProductInfo> <boardPointDetails> <departureCity>LON</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>NYC</arrivalCity> </offpointDetails> </travelProductInfo> </flightSegmentInfoGroup> </requestedSegmentInfoGroup> </Fare\_QuoteItinerary>

## 5.17.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItineraryReply xmlns="http://xml.amadeus.com/FITQPR\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <allFaresInfoGroup> <markerAllFares></markerAllFares> <involvedCurrenciesInfo> <conversionRateDetails> <conversionType>707</conversionType> <currency>EUR</currency> </conversionRateDetails> <conversionRateDetails> <conversionType>705</conversionType> <currency>EUR</currency> </conversionRateDetails> </involvedCurrenciesInfo> <flightInfoGroup> <involvedFlightInfo> <boardPointDetails> <trueLocationId>PAR</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>LON</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>YY</marketingCompany> </companyDetails> </involvedFlightInfo> <itineraryInfoGroup> <travelItineraryInfo> <segmentItemNumber>1</segmentItemNumber> </travelItineraryInfo> </itineraryInfoGroup> </flightInfoGroup> <flightInfoGroup> <involvedFlightInfo> <boardPointDetails> <trueLocationId>LON</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>NYC</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>YY</marketingCompany> </companyDetails> </involvedFlightInfo> <itineraryInfoGroup> <travelItineraryInfo> <segmentItemNumber>2</segmentItemNumber> </travelItineraryInfo> </itineraryInfoGroup> </flightInfoGroup> <fareProductInfoGroup> <generalAndIdInfo> <segmentControlDetails> <productReference>1</productReference> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </generalAndIdInfo> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeInfoGroup> <fareInfo> <fareTypeGrouping> <aggregatePTCDiscount>ADT</aggregatePTCDiscount> </fareTypeGrouping> </fareInfo> <pricingticketingDetails> <priceTicketDetails> <indicators>RBR</indicators> </priceTicketDetails> </pricingticketingDetails> <conversionRate> <conversionRateDetails> <conversionType>700</conversionType> <currency>NUC</currency> <rateType>ROE</rateType> <pricingAmount>3250.82</pricingAmount> <conversionRate>0.753963</conversionRate> </conversionRateDetails> </conversionRate> <monetaryInfo> <monetaryDetails> <typeQualifier>B</typeQualifier> <amount>2451.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>T</typeQualifier> <amount>2540.95</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>TX</typeQualifier> <amount>89.95</amount> </monetaryDetails> </monetaryInfo> <taxDetailsInfoGroup> <taxDetailsListInfo> <taxDetails> <rate>1.00</rate> <countryCode>IZ</countryCode> <type>EB</type> </taxDetails> <taxDetails> <rate>4.17</rate> <countryCode>FR</countryCode> <type>SE</type> </taxDetails> <taxDetails> <rate>12.75</rate> <countryCode>FR</countryCode> <type>TI</type> </taxDetails> <taxDetails> <rate>72.03</rate> <countryCode>GB</countryCode> <type>AD</type> </taxDetails> </taxDetailsListInfo> </taxDetailsInfoGroup> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>1</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>YIF</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>Y</designator> <specialService>Y</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>2</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>YIF</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>Y</designator> <specialService>Y</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> </passengerTypeInfoGroup> </fareProductInfoGroup> </allFaresInfoGroup> </Fare\_QuoteItineraryReply>

## 5.17.3 Possible Errors

See "Error Messages" section.

* * *

## 5.18 Operation: 088 Tax and Surcharge options

Withhold all Taxes.

Cryptic : FQP LON /D14JUL NYC /R,WT/L

## 5.18.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItinerary xmlns="http://xml.amadeus.com/FITQPQ\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <taxOptionsInfoGroup> <taxProcessingInfo> <taxCategory>W</taxCategory> </taxProcessingInfo> </taxOptionsInfoGroup> <passengerInfoGroup> <segmentRepetitionControl> <segmentControlDetails> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </segmentRepetitionControl> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeGroup> <fareInfo> <valueQualifier>ADT</valueQualifier> </fareInfo> </passengerTypeGroup> </passengerInfoGroup> <pricingTktOptionGroup> <pricingTicketingDetails> <priceTicketDetails> <indicators>LF</indicators> </priceTicketDetails> </pricingTicketingDetails> </pricingTktOptionGroup> <requestedSegmentInfoGroup> <originAndDestinationDetails></originAndDestinationDetails> <flightSegmentInfoGroup> <travelProductInfo> <flightDate> <departureDate>140708</departureDate> </flightDate> <boardPointDetails> <departureCity>LON</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>NYC</arrivalCity> </offpointDetails> </travelProductInfo> </flightSegmentInfoGroup> </requestedSegmentInfoGroup> </Fare\_QuoteItinerary>

## 5.18.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItineraryReply xmlns="http://xml.amadeus.com/FITQPR\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <allFaresInfoGroup> <markerAllFares></markerAllFares> <involvedCurrenciesInfo> <conversionRateDetails> <conversionType>707</conversionType> <currency>EUR</currency> </conversionRateDetails> <conversionRateDetails> <conversionType>705</conversionType> <currency>GBP</currency> </conversionRateDetails> </involvedCurrenciesInfo> <flightInfoGroup> <involvedFlightInfo> <boardPointDetails> <trueLocationId>LON</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>NYC</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>YY</marketingCompany> </companyDetails> </involvedFlightInfo> <itineraryInfoGroup> <travelItineraryInfo> <segmentItemNumber>1</segmentItemNumber> </travelItineraryInfo> </itineraryInfoGroup> </flightInfoGroup> <fareProductInfoGroup> <generalAndIdInfo> <segmentControlDetails> <productReference>1</productReference> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </generalAndIdInfo> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeInfoGroup> <fareInfo> <fareTypeGrouping> <aggregatePTCDiscount>ADT</aggregatePTCDiscount> </fareTypeGrouping> </fareInfo> <pricingticketingDetails> <priceTicketDetails> <indicators>RBR</indicators> </priceTicketDetails> </pricingticketingDetails> <conversionRate> <conversionRateDetails> <conversionType>700</conversionType> <currency>NUC</currency> <rateType>ROE</rateType> <pricingAmount>2837.33</pricingAmount> <conversionRate>0.634398</conversionRate> </conversionRateDetails> </conversionRate> <monetaryInfo> <monetaryDetails> <typeQualifier>B</typeQualifier> <amount>1800.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>E</typeQualifier> <amount>2161.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>T</typeQualifier> <amount>2161.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>TX</typeQualifier> <amount>0.00</amount> </monetaryDetails> </monetaryInfo> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>1</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>YIF</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>Y</designator> <specialService>Y</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> </passengerTypeInfoGroup> </fareProductInfoGroup> </allFaresInfoGroup> </Fare\_QuoteItineraryReply>

## 5.18.3 Possible Errors

See "Error Messages" section.

* * *

## 5.19 Operation: 089 Tax and Surcharge options

Withhold all Taxes with tax display code and tax nature.

Cryptic : FQP PAR /D15NOV LON NYC /R,WT-USAS-GB/L

## 5.19.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItinerary xmlns="http://xml.amadeus.com/FITQPQ\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <taxOptionsInfoGroup> <taxProcessingInfo> <taxCategory>W</taxCategory> <taxDetails> <countryCode>US</countryCode> <taxTypeCode>AS</taxTypeCode> </taxDetails> <taxDetails> <countryCode>GB</countryCode> </taxDetails> </taxProcessingInfo> </taxOptionsInfoGroup> <passengerInfoGroup> <segmentRepetitionControl> <segmentControlDetails> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </segmentRepetitionControl> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeGroup> <fareInfo> <valueQualifier>ADT</valueQualifier> </fareInfo> </passengerTypeGroup> </passengerInfoGroup> <pricingTktOptionGroup> <pricingTicketingDetails> <priceTicketDetails> <indicators>LF</indicators> </priceTicketDetails> </pricingTicketingDetails> </pricingTktOptionGroup> <requestedSegmentInfoGroup> <originAndDestinationDetails></originAndDestinationDetails> <flightSegmentInfoGroup> <travelProductInfo> <flightDate> <departureDate>151108</departureDate> </flightDate> <boardPointDetails> <departureCity>PAR</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>LON</arrivalCity> </offpointDetails> </travelProductInfo> </flightSegmentInfoGroup> <flightSegmentInfoGroup> <travelProductInfo> <boardPointDetails> <departureCity>LON</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>NYC</arrivalCity> </offpointDetails> </travelProductInfo> </flightSegmentInfoGroup> </requestedSegmentInfoGroup> </Fare\_QuoteItinerary>

## 5.19.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.19.3 Possible Errors

See "Error Messages" section.

* * *

## 5.20 Operation: 090 Tax and Surcharge options

Withhold all Surcharges : WQ

Cryptic : FQP PAR /D15NOV /AAF LON/ABA NYC/ABALON/AAFPAR /L /R,WQ

## 5.20.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItinerary xmlns="http://xml.amadeus.com/FITQPQ\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <taxOptionsInfoGroup> <taxProcessingInfo> <taxCategory>WQ</taxCategory> </taxProcessingInfo> </taxOptionsInfoGroup> <passengerInfoGroup> <segmentRepetitionControl> <segmentControlDetails> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </segmentRepetitionControl> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeGroup> <fareInfo> <valueQualifier>ADT</valueQualifier> </fareInfo> </passengerTypeGroup> </passengerInfoGroup> <pricingTktOptionGroup> <pricingTicketingDetails> <priceTicketDetails> <indicators>LF</indicators> </priceTicketDetails> </pricingTicketingDetails> </pricingTktOptionGroup> <requestedSegmentInfoGroup> <originAndDestinationDetails></originAndDestinationDetails> <flightSegmentInfoGroup> <travelProductInfo> <flightDate> <departureDate>151108</departureDate> </flightDate> <boardPointDetails> <departureCity>PAR</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>LON</arrivalCity> </offpointDetails> <companyDetails> <marketingCompany>AF</marketingCompany> </companyDetails> </travelProductInfo> </flightSegmentInfoGroup> <flightSegmentInfoGroup> <travelProductInfo> <boardPointDetails> <departureCity>LON</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>NYC</arrivalCity> </offpointDetails> <companyDetails> <marketingCompany>BA</marketingCompany> </companyDetails> </travelProductInfo> </flightSegmentInfoGroup> <flightSegmentInfoGroup> <travelProductInfo> <boardPointDetails> <departureCity>NYC</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>LON</arrivalCity> </offpointDetails> <companyDetails> <marketingCompany>BA</marketingCompany> </companyDetails> </travelProductInfo> </flightSegmentInfoGroup> <flightSegmentInfoGroup> <travelProductInfo> <boardPointDetails> <departureCity>LON</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>PAR</arrivalCity> </offpointDetails> <companyDetails> <marketingCompany>AF</marketingCompany> </companyDetails> </travelProductInfo> </flightSegmentInfoGroup> </requestedSegmentInfoGroup> </Fare\_QuoteItinerary>

## 5.20.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItineraryReply xmlns="http://xml.amadeus.com/FITQPR\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <allFaresInfoGroup> <markerAllFares></markerAllFares> <involvedCurrenciesInfo> <conversionRateDetails> <conversionType>707</conversionType> <currency>EUR</currency> </conversionRateDetails> <conversionRateDetails> <conversionType>705</conversionType> <currency>EUR</currency> </conversionRateDetails> </involvedCurrenciesInfo> <flightInfoGroup> <involvedFlightInfo> <boardPointDetails> <trueLocationId>PAR</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>LON</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>AF</marketingCompany> </companyDetails> </involvedFlightInfo> <itineraryInfoGroup> <travelItineraryInfo> <segmentItemNumber>1</segmentItemNumber> </travelItineraryInfo> </itineraryInfoGroup> </flightInfoGroup> <flightInfoGroup> <involvedFlightInfo> <boardPointDetails> <trueLocationId>LON</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>NYC</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>BA</marketingCompany> </companyDetails> </involvedFlightInfo> <itineraryInfoGroup> <travelItineraryInfo> <segmentItemNumber>2</segmentItemNumber> </travelItineraryInfo> </itineraryInfoGroup> </flightInfoGroup> <flightInfoGroup> <involvedFlightInfo> <boardPointDetails> <trueLocationId>NYC</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>LON</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>BA</marketingCompany> </companyDetails> </involvedFlightInfo> <itineraryInfoGroup> <travelItineraryInfo> <segmentItemNumber>3</segmentItemNumber> </travelItineraryInfo> </itineraryInfoGroup> </flightInfoGroup> <flightInfoGroup> <involvedFlightInfo> <boardPointDetails> <trueLocationId>LON</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>PAR</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>AF</marketingCompany> </companyDetails> </involvedFlightInfo> <itineraryInfoGroup> <travelItineraryInfo> <segmentItemNumber>4</segmentItemNumber> </travelItineraryInfo> </itineraryInfoGroup> </flightInfoGroup> <fareProductInfoGroup> <generalAndIdInfo> <segmentControlDetails> <productReference>1</productReference> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </generalAndIdInfo> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeInfoGroup> <fareInfo></fareInfo> <pricingticketingDetails> <priceTicketDetails> <indicators>RBR</indicators> </priceTicketDetails> </pricingticketingDetails> <conversionRate> <conversionRateDetails> <conversionType>700</conversionType> <currency>NUC</currency> <rateType>ROE</rateType> <pricingAmount>2495.78</pricingAmount> <conversionRate>0.681549</conversionRate> </conversionRateDetails> </conversionRate> <monetaryInfo> <monetaryDetails> <typeQualifier>B</typeQualifier> <amount>1701.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>T</typeQualifier> <amount>1999.13</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>TX</typeQualifier> <amount>298.13</amount> </monetaryDetails> </monetaryInfo> <taxDetailsInfoGroup> <taxDetailsListInfo> <taxDetails> <rate>165.00</rate> <countryCode>YQ</countryCode> <type>AC</type> </taxDetails> <taxDetails> <rate>6.00</rate> <countryCode>YQ</countryCode> <type>AD</type> </taxDetails> <taxDetails> <rate>10.90</rate> <countryCode>QX</countryCode> <type>AP</type> </taxDetails> <taxDetails> <rate>1.00</rate> <countryCode>IZ</countryCode> <type>EB</type> </taxDetails> <taxDetails> <rate>3.92</rate> <countryCode>FR</countryCode> <type>SE</type> </taxDetails> <taxDetails> <rate>9.63</rate> <countryCode>FR</countryCode> <type>TI</type> </taxDetails> <taxDetails> <rate>67.16</rate> <countryCode>GB</countryCode> <type>AD</type> </taxDetails> <taxDetails> <rate>3.74</rate> <countryCode>YC</countryCode> <type>AE</type> </taxDetails> <taxDetails> <rate>10.46</rate> <countryCode>US</countryCode> <type>AP</type> </taxDetails> <taxDetails> <rate>10.46</rate> <countryCode>US</countryCode> <type>AS</type> </taxDetails> <taxDetails> <rate>3.40</rate> <countryCode>XA</countryCode> <type>CO</type> </taxDetails> <taxDetails> <rate>4.76</rate> <countryCode>XY</countryCode> <type>CR</type> </taxDetails> <taxDetails> <rate>1.70</rate> <countryCode>AY</countryCode> <type>SE</type> </taxDetails> </taxDetailsListInfo> </taxDetailsInfoGroup> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>1</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>YEE</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>N</designator> <specialService>N</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>2</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>YEE</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>B</designator> <specialService>B</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>3</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>YEE</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>B</designator> <specialService>B</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>4</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>YEE</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>N</designator> <specialService>N</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> </passengerTypeInfoGroup> </fareProductInfoGroup> </allFaresInfoGroup> </Fare\_QuoteItineraryReply>

## 5.20.3 Possible Errors

See "Error Messages" section.

* * *

## 5.21 Operation: 091 Unifares options

Unifares + Public fares request

Cryptic : FQP PAR /D26OCT /AAF LON /R,U

## 5.21.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItinerary xmlns="http://xml.amadeus.com/FITQPQ\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <passengerInfoGroup> <segmentRepetitionControl> <segmentControlDetails> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </segmentRepetitionControl> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeGroup> <fareInfo> <valueQualifier>ADT</valueQualifier> </fareInfo> </passengerTypeGroup> </passengerInfoGroup> <pricingTktOptionGroup> <pricingTicketingDetails> <priceTicketDetails> <indicators>RU</indicators> </priceTicketDetails> </pricingTicketingDetails> </pricingTktOptionGroup> <requestedSegmentInfoGroup> <originAndDestinationDetails></originAndDestinationDetails> <flightSegmentInfoGroup> <travelProductInfo> <flightDate> <departureDate>261008</departureDate> </flightDate> <boardPointDetails> <departureCity>PAR</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>LON</arrivalCity> </offpointDetails> <companyDetails> <marketingCompany>AF</marketingCompany> </companyDetails> </travelProductInfo> </flightSegmentInfoGroup> </requestedSegmentInfoGroup> </Fare\_QuoteItinerary>

## 5.21.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItineraryReply xmlns="http://xml.amadeus.com/FITQPR\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <allFaresInfoGroup> <markerAllFares></markerAllFares> <involvedCurrenciesInfo> <conversionRateDetails> <conversionType>707</conversionType> <currency>EUR</currency> </conversionRateDetails> <conversionRateDetails> <conversionType>705</conversionType> <currency>EUR</currency> </conversionRateDetails> </involvedCurrenciesInfo> <flightInfoGroup> <involvedFlightInfo> <boardPointDetails> <trueLocationId>PAR</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>LON</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>AF</marketingCompany> </companyDetails> </involvedFlightInfo> <itineraryInfoGroup> <travelItineraryInfo> <segmentItemNumber>1</segmentItemNumber> </travelItineraryInfo> </itineraryInfoGroup> </flightInfoGroup> <fareProductInfoGroup> <generalAndIdInfo> <segmentControlDetails> <productReference>1</productReference> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </generalAndIdInfo> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeInfoGroup> <fareInfo> <fareTypeGrouping> <aggregatePTCDiscount>ADT</aggregatePTCDiscount> </fareTypeGrouping> </fareInfo> <pricingticketingDetails> <priceTicketDetails> <indicators>RBR</indicators> </priceTicketDetails> </pricingticketingDetails> <conversionRate> <conversionRateDetails> <conversionType>700</conversionType> <currency>NUC</currency> <rateType>ROE</rateType> <pricingAmount>14.31</pricingAmount> <conversionRate>0.753963</conversionRate> </conversionRateDetails> </conversionRate> <monetaryInfo> <monetaryDetails> <typeQualifier>B</typeQualifier> <amount>11.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>T</typeQualifier> <amount>58.92</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>TX</typeQualifier> <amount>47.92</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>XOB</typeQualifier> <amount>58.92</amount> </monetaryDetails> </monetaryInfo> <taxDetailsInfoGroup> <taxDetailsListInfo> <taxDetails> <rate>30.00</rate> <countryCode>YQ</countryCode> <type>AC</type> </taxDetails> <taxDetails> <rate>1.00</rate> <countryCode>IZ</countryCode> <type>EB</type> </taxDetails> <taxDetails> <rate>4.17</rate> <countryCode>FR</countryCode> <type>SE</type> </taxDetails> <taxDetails> <rate>12.75</rate> <countryCode>FR</countryCode> <type>TI</type> </taxDetails> </taxDetailsListInfo> </taxDetailsInfoGroup> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>1</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>NV30FR1</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>N</designator> <specialService>N</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> </passengerTypeInfoGroup> </fareProductInfoGroup> <fareProductInfoGroup> <generalAndIdInfo> <segmentControlDetails> <productReference>2</productReference> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </generalAndIdInfo> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeInfoGroup> <fareInfo> <fareTypeGrouping> <aggregatePTCDiscount>ADT</aggregatePTCDiscount> </fareTypeGrouping> </fareInfo> <pricingticketingDetails> <priceTicketDetails> <indicators>RBR</indicators> </priceTicketDetails> </pricingticketingDetails> <conversionRate> <conversionRateDetails> <conversionType>700</conversionType> <currency>NUC</currency> <rateType>ROE</rateType> <pricingAmount>226.14</pricingAmount> <conversionRate>0.753963</conversionRate> </conversionRateDetails> </conversionRate> <monetaryInfo> <monetaryDetails> <typeQualifier>B</typeQualifier> <amount>171.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>T</typeQualifier> <amount>218.92</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>TX</typeQualifier> <amount>47.92</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>XOB</typeQualifier> <amount>218.92</amount> </monetaryDetails> </monetaryInfo> <taxDetailsInfoGroup> <taxDetailsListInfo> <taxDetails> <rate>30.00</rate> <countryCode>YQ</countryCode> <type>AC</type> </taxDetails> <taxDetails> <rate>1.00</rate> <countryCode>IZ</countryCode> <type>EB</type> </taxDetails> <taxDetails> <rate>4.17</rate> <countryCode>FR</countryCode> <type>SE</type> </taxDetails> <taxDetails> <rate>12.75</rate> <countryCode>FR</countryCode> <type>TI</type> </taxDetails> </taxDetailsListInfo> </taxDetailsInfoGroup> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>1</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>TCODE</fareBasis> <ticketDesignator>TDESIGN</ticketDesignator> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>Y</designator> <specialService>Y</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> </passengerTypeInfoGroup> </fareProductInfoGroup> </allFaresInfoGroup> </Fare\_QuoteItineraryReply>

## 5.21.3 Possible Errors

See "Error Messages" section.

* * *

## 5.22 Operation: 092 Unifares options and Corporate number

Unifares + Corporate Number

Cryptic : FQP PAR /AAF LON /R,P,U000001

## 5.22.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItinerary xmlns="http://xml.amadeus.com/FITQPQ\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <corporateFareInfo> <corporateFareIdentifiers> <fareQualifier>RU</fareQualifier> <identifyNumber>000001</identifyNumber> </corporateFareIdentifiers> </corporateFareInfo> <passengerInfoGroup> <segmentRepetitionControl> <segmentControlDetails> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </segmentRepetitionControl> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeGroup> <fareInfo> <valueQualifier>ADT</valueQualifier> </fareInfo> </passengerTypeGroup> </passengerInfoGroup> <pricingTktOptionGroup> <pricingTicketingDetails> <priceTicketDetails> <indicators>RP</indicators> </priceTicketDetails> </pricingTicketingDetails> </pricingTktOptionGroup> <requestedSegmentInfoGroup> <originAndDestinationDetails></originAndDestinationDetails> <flightSegmentInfoGroup> <travelProductInfo> <flightDate> <departureDate>210808</departureDate> </flightDate> <boardPointDetails> <departureCity>PAR</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>LON</arrivalCity> </offpointDetails> <companyDetails> <marketingCompany>AF</marketingCompany> </companyDetails> </travelProductInfo> </flightSegmentInfoGroup> </requestedSegmentInfoGroup> </Fare\_QuoteItinerary>

## 5.22.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItineraryReply xmlns="http://xml.amadeus.com/FITQPR\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <allFaresInfoGroup> <markerAllFares></markerAllFares> <involvedCurrenciesInfo> <conversionRateDetails> <conversionType>707</conversionType> <currency>EUR</currency> </conversionRateDetails> <conversionRateDetails> <conversionType>705</conversionType> <currency>EUR</currency> </conversionRateDetails> </involvedCurrenciesInfo> <flightInfoGroup> <involvedFlightInfo> <boardPointDetails> <trueLocationId>PAR</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>LON</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>AF</marketingCompany> </companyDetails> </involvedFlightInfo> <itineraryInfoGroup> <travelItineraryInfo> <segmentItemNumber>1</segmentItemNumber> </travelItineraryInfo> </itineraryInfoGroup> </flightInfoGroup> <fareProductInfoGroup> <generalAndIdInfo> <segmentControlDetails> <productReference>1</productReference> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </generalAndIdInfo> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeInfoGroup> <fareInfo> <fareTypeGrouping> <aggregatePTCDiscount>ADT</aggregatePTCDiscount> </fareTypeGrouping> </fareInfo> <pricingticketingDetails> <priceTicketDetails> <indicators>RBR</indicators> </priceTicketDetails> </pricingticketingDetails> <conversionRate> <conversionRateDetails> <conversionType>700</conversionType> <currency>NUC</currency> <rateType>ROE</rateType> <pricingAmount>15.91</pricingAmount> <conversionRate>0.753963</conversionRate> </conversionRateDetails> </conversionRate> <monetaryInfo> <monetaryDetails> <typeQualifier>B</typeQualifier> <amount>12.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>T</typeQualifier> <amount>59.92</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>TX</typeQualifier> <amount>47.92</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>XOB</typeQualifier> <amount>59.92</amount> </monetaryDetails> </monetaryInfo> <taxDetailsInfoGroup> <taxDetailsListInfo> <taxDetails> <rate>30.00</rate> <countryCode>YQ</countryCode> <type>AC</type> </taxDetails> <taxDetails> <rate>1.00</rate> <countryCode>IZ</countryCode> <type>EB</type> </taxDetails> <taxDetails> <rate>4.17</rate> <countryCode>FR</countryCode> <type>SE</type> </taxDetails> <taxDetails> <rate>12.75</rate> <countryCode>FR</countryCode> <type>TI</type> </taxDetails> </taxDetailsListInfo> </taxDetailsInfoGroup> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>1</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>NV30FR1</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>N</designator> <specialService>N</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> </passengerTypeInfoGroup> </fareProductInfoGroup> <fareProductInfoGroup> <generalAndIdInfo> <segmentControlDetails> <productReference>2</productReference> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </generalAndIdInfo> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeInfoGroup> <fareInfo> <fareTypeGrouping> <aggregatePTCDiscount>ADT</aggregatePTCDiscount> </fareTypeGrouping> </fareInfo> <pricingticketingDetails> <priceTicketDetails> <indicators>RBR</indicators> </priceTicketDetails> </pricingticketingDetails> <conversionRate> <conversionRateDetails> <conversionType>700</conversionType> <currency>NUC</currency> <rateType>ROE</rateType> <pricingAmount>683.05</pricingAmount> <conversionRate>0.753963</conversionRate> </conversionRateDetails> </conversionRate> <monetaryInfo> <monetaryDetails> <typeQualifier>B</typeQualifier> <amount>515.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>T</typeQualifier> <amount>562.92</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>TX</typeQualifier> <amount>47.92</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>XOB</typeQualifier> <amount>562.92</amount> </monetaryDetails> </monetaryInfo> <taxDetailsInfoGroup> <taxDetailsListInfo> <taxDetails> <rate>30.00</rate> <countryCode>YQ</countryCode> <type>AC</type> </taxDetails> <taxDetails> <rate>1.00</rate> <countryCode>IZ</countryCode> <type>EB</type> </taxDetails> <taxDetails> <rate>4.17</rate> <countryCode>FR</countryCode> <type>SE</type> </taxDetails> <taxDetails> <rate>12.75</rate> <countryCode>FR</countryCode> <type>TI</type> </taxDetails> </taxDetailsListInfo> </taxDetailsInfoGroup> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>1</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>YIF</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>K</designator> <specialService>K</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> </passengerTypeInfoGroup> </fareProductInfoGroup> <fareProductInfoGroup> <generalAndIdInfo> <segmentControlDetails> <productReference>3</productReference> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </generalAndIdInfo> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeInfoGroup> <fareInfo> <fareTypeGrouping> <aggregatePTCDiscount>ADT</aggregatePTCDiscount> </fareTypeGrouping> </fareInfo> <pricingticketingDetails> <priceTicketDetails> <indicators>RBR</indicators> </priceTicketDetails> </pricingticketingDetails> <conversionRate> <conversionRateDetails> <conversionType>700</conversionType> <currency>NUC</currency> <rateType>ROE</rateType> <pricingAmount>683.05</pricingAmount> <conversionRate>0.753963</conversionRate> </conversionRateDetails> </conversionRate> <monetaryInfo> <monetaryDetails> <typeQualifier>B</typeQualifier> <amount>515.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>T</typeQualifier> <amount>571.92</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>TX</typeQualifier> <amount>56.92</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>XOB</typeQualifier> <amount>571.92</amount> </monetaryDetails> </monetaryInfo> <taxDetailsInfoGroup> <taxDetailsListInfo> <taxDetails> <rate>30.00</rate> <countryCode>YQ</countryCode> <type>AC</type> </taxDetails> <taxDetails> <rate>10.00</rate> <countryCode>IZ</countryCode> <type>EB</type> </taxDetails> <taxDetails> <rate>4.17</rate> <countryCode>FR</countryCode> <type>SE</type> </taxDetails> <taxDetails> <rate>12.75</rate> <countryCode>FR</countryCode> <type>TI</type> </taxDetails> </taxDetailsListInfo> </taxDetailsInfoGroup> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>1</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>CIF</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>Z</designator> <specialService>Z</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> </passengerTypeInfoGroup> </fareProductInfoGroup> </allFaresInfoGroup> </Fare\_QuoteItineraryReply>

## 5.22.3 Possible Errors

See "Error Messages" section.

* * *

## 5.23 Operation: 093 Unifares options and Corporate numbers

Unifares + Unifares Corporate number request

Cryptic : FQP PAR /D23OCT /ABALON /R,U\*000002-000003

## 5.23.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItinerary xmlns="http://xml.amadeus.com/FITQPQ\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <corporateFareInfo> <corporateFareIdentifiers> <fareQualifier>RU</fareQualifier> <identifyNumber>000002</identifyNumber> <identifyNumber>000003</identifyNumber> </corporateFareIdentifiers> </corporateFareInfo> <passengerInfoGroup> <segmentRepetitionControl> <segmentControlDetails> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </segmentRepetitionControl> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeGroup> <fareInfo> <valueQualifier>ADT</valueQualifier> </fareInfo> </passengerTypeGroup> </passengerInfoGroup> <requestedSegmentInfoGroup> <originAndDestinationDetails></originAndDestinationDetails> <flightSegmentInfoGroup> <travelProductInfo> <flightDate> <departureDate>231011</departureDate> </flightDate> <boardPointDetails> <departureCity>PAR</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>LON</arrivalCity> </offpointDetails> <companyDetails> <marketingCompany>BA</marketingCompany> </companyDetails> </travelProductInfo> </flightSegmentInfoGroup> </requestedSegmentInfoGroup> </Fare\_QuoteItinerary>

## 5.23.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItineraryReply xmlns="http://xml.amadeus.com/FITQPR\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <allFaresInfoGroup> <markerAllFares></markerAllFares> <involvedCurrenciesInfo> <conversionRateDetails> <conversionType>707</conversionType> <currency>EUR</currency> </conversionRateDetails> <conversionRateDetails> <conversionType>705</conversionType> <currency>EUR</currency> </conversionRateDetails> </involvedCurrenciesInfo> <flightInfoGroup> <involvedFlightInfo> <boardPointDetails> <trueLocationId>PAR</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>LON</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>BA</marketingCompany> </companyDetails> </involvedFlightInfo> <itineraryInfoGroup> <travelItineraryInfo> <segmentItemNumber>1</segmentItemNumber> </travelItineraryInfo> </itineraryInfoGroup> </flightInfoGroup> <fareProductInfoGroup> <generalAndIdInfo> <segmentControlDetails> <productReference>1</productReference> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </generalAndIdInfo> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeInfoGroup> <fareInfo> <fareTypeGrouping> <aggregatePTCDiscount>ADT</aggregatePTCDiscount> </fareTypeGrouping> </fareInfo> <pricingticketingDetails> <priceTicketDetails> <indicators>RBR</indicators> </priceTicketDetails> </pricingticketingDetails> <conversionRate> <conversionRateDetails> <conversionType>700</conversionType> <currency>NUC</currency> <rateType>ROE</rateType> <pricingAmount>478.13</pricingAmount> <conversionRate>0.753963</conversionRate> </conversionRateDetails> </conversionRate> <monetaryInfo> <monetaryDetails> <typeQualifier>B</typeQualifier> <amount>361.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>T</typeQualifier> <amount>413.92</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>TX</typeQualifier> <amount>52.92</amount> </monetaryDetails> </monetaryInfo> <taxDetailsInfoGroup> <taxDetailsListInfo> <taxDetails> <rate>23.00</rate> <countryCode>YQ</countryCode> <type>AC</type> </taxDetails> <taxDetails> <rate>3.00</rate> <countryCode>YQ</countryCode> <type>AD</type> </taxDetails> <taxDetails> <rate>10.00</rate> <countryCode>IZ</countryCode> <type>EB</type> </taxDetails> <taxDetails> <rate>4.17</rate> <countryCode>FR</countryCode> <type>SE</type> </taxDetails> <taxDetails> <rate>12.75</rate> <countryCode>FR</countryCode> <type>TI</type> </taxDetails> </taxDetailsListInfo> </taxDetailsInfoGroup> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>1</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>LOCAG12</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>C</designator> <specialService>C</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> <corporateFareInfo> <corporateFareIdentifiers> <identifyNumber>000002</identifyNumber> </corporateFareIdentifiers> </corporateFareInfo> </passengerTypeInfoGroup> </fareProductInfoGroup> <fareProductInfoGroup> <generalAndIdInfo> <segmentControlDetails> <productReference>2</productReference> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </generalAndIdInfo> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeInfoGroup> <fareInfo> <fareTypeGrouping> <aggregatePTCDiscount>ADT</aggregatePTCDiscount> </fareTypeGrouping> </fareInfo> <pricingticketingDetails> <priceTicketDetails> <indicators>RBR</indicators> </priceTicketDetails> </pricingticketingDetails> <conversionRate> <conversionRateDetails> <conversionType>700</conversionType> <currency>NUC</currency> <rateType>ROE</rateType> <pricingAmount>729.48</pricingAmount> <conversionRate>0.753963</conversionRate> </conversionRateDetails> </conversionRate> <monetaryInfo> <monetaryDetails> <typeQualifier>B</typeQualifier> <amount>550.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>T</typeQualifier> <amount>598.92</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>TX</typeQualifier> <amount>48.92</amount> </monetaryDetails> </monetaryInfo> <taxDetailsInfoGroup> <taxDetailsListInfo> <taxDetails> <rate>19.00</rate> <countryCode>YQ</countryCode> <type>AC</type> </taxDetails> <taxDetails> <rate>3.00</rate> <countryCode>YQ</countryCode> <type>AD</type> </taxDetails> <taxDetails> <rate>10.00</rate> <countryCode>IZ</countryCode> <type>EB</type> </taxDetails> <taxDetails> <rate>4.17</rate> <countryCode>FR</countryCode> <type>SE</type> </taxDetails> <taxDetails> <rate>12.75</rate> <countryCode>FR</countryCode> <type>TI</type> </taxDetails> </taxDetailsListInfo> </taxDetailsInfoGroup> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>1</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>TESTCOM</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>B</designator> <specialService>B</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> <corporateFareInfo> <corporateFareIdentifiers> <identifyNumber>000003</identifyNumber> </corporateFareIdentifiers> </corporateFareInfo> </passengerTypeInfoGroup> </fareProductInfoGroup> </allFaresInfoGroup> </Fare\_QuoteItineraryReply>

## 5.23.3 Possible Errors

See "Error Messages" section.

* * *

## 5.24 Operation: 094 Unifares options Unifares Corporate Name

Unifares Corporate Name request

Cryptic : FQP PAR /D28FEB /AAFLON/R,U\*AMADEUS

## 5.24.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItinerary xmlns="http://xml.amadeus.com/FITQPQ\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <corporateFareInfo> <corporateFareIdentifiers> <fareQualifier>RU</fareQualifier> <identifyNumber>AMADEUS</identifyNumber> </corporateFareIdentifiers> </corporateFareInfo> <passengerInfoGroup> <segmentRepetitionControl> <segmentControlDetails> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </segmentRepetitionControl> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeGroup> <fareInfo> <valueQualifier>ADT</valueQualifier> </fareInfo> </passengerTypeGroup> </passengerInfoGroup> <requestedSegmentInfoGroup> <originAndDestinationDetails></originAndDestinationDetails> <flightSegmentInfoGroup> <travelProductInfo> <flightDate> <departureDate>280211</departureDate> </flightDate> <boardPointDetails> <departureCity>PAR</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>LON</arrivalCity> </offpointDetails> <companyDetails> <marketingCompany>BA</marketingCompany> </companyDetails> </travelProductInfo> </flightSegmentInfoGroup> </requestedSegmentInfoGroup> </Fare\_QuoteItinerary>

## 5.24.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItineraryReply xmlns="http://xml.amadeus.com/FITQPR\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <allFaresInfoGroup> <markerAllFares></markerAllFares> <involvedCurrenciesInfo> <conversionRateDetails> <conversionType>707</conversionType> <currency>EUR</currency> </conversionRateDetails> <conversionRateDetails> <conversionType>705</conversionType> <currency>EUR</currency> </conversionRateDetails> </involvedCurrenciesInfo> <flightInfoGroup> <involvedFlightInfo> <boardPointDetails> <trueLocationId>PAR</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>LON</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>BA</marketingCompany> </companyDetails> </involvedFlightInfo> <itineraryInfoGroup> <travelItineraryInfo> <segmentItemNumber>1</segmentItemNumber> </travelItineraryInfo> </itineraryInfoGroup> </flightInfoGroup> <fareProductInfoGroup> <generalAndIdInfo> <segmentControlDetails> <productReference>1</productReference> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </generalAndIdInfo> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeInfoGroup> <fareInfo> <fareTypeGrouping> <aggregatePTCDiscount>ADT</aggregatePTCDiscount> </fareTypeGrouping> </fareInfo> <pricingticketingDetails> <priceTicketDetails> <indicators>RBR</indicators> </priceTicketDetails> </pricingticketingDetails> <conversionRate> <conversionRateDetails> <conversionType>700</conversionType> <currency>NUC</currency> <rateType>ROE</rateType> <pricingAmount>481.05</pricingAmount> <conversionRate>0.753963</conversionRate> </conversionRateDetails> </conversionRate> <monetaryInfo> <monetaryDetails> <typeQualifier>B</typeQualifier> <amount>363.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>T</typeQualifier> <amount>402.92</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>TX</typeQualifier> <amount>39.92</amount> </monetaryDetails> </monetaryInfo> <taxDetailsInfoGroup> <taxDetailsListInfo> <taxDetails> <rate>19.00</rate> <countryCode>YQ</countryCode> <type>AC</type> </taxDetails> <taxDetails> <rate>3.00</rate> <countryCode>YQ</countryCode> <type>AD</type> </taxDetails> <taxDetails> <rate>1.00</rate> <countryCode>IZ</countryCode> <type>EB</type> </taxDetails> <taxDetails> <rate>4.17</rate> <countryCode>FR</countryCode> <type>SE</type> </taxDetails> <taxDetails> <rate>12.75</rate> <countryCode>FR</countryCode> <type>TI</type> </taxDetails> </taxDetailsListInfo> </taxDetailsInfoGroup> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>1</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>Y2FLBAOW</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>Y</designator> <specialService>Y</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> <corporateFareInfo> <corporateFareIdentifiers> <identifyNumber>000001</identifyNumber> </corporateFareIdentifiers> </corporateFareInfo> </passengerTypeInfoGroup> </fareProductInfoGroup> <fareProductInfoGroup> <generalAndIdInfo> <segmentControlDetails> <productReference>2</productReference> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </generalAndIdInfo> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeInfoGroup> <fareInfo> <fareTypeGrouping> <aggregatePTCDiscount>ADT</aggregatePTCDiscount> </fareTypeGrouping> </fareInfo> <pricingticketingDetails> <priceTicketDetails> <indicators>RBR</indicators> <indicators>SRR</indicators> </priceTicketDetails> </pricingticketingDetails> <conversionRate> <conversionRateDetails> <conversionType>700</conversionType> <currency>NUC</currency> <rateType>ROE</rateType> <pricingAmount>525.22</pricingAmount> <conversionRate>0.753963</conversionRate> </conversionRateDetails> </conversionRate> <monetaryInfo> <monetaryDetails> <typeQualifier>B</typeQualifier> <amount>396.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>T</typeQualifier> <amount>448.92</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>TX</typeQualifier> <amount>52.92</amount> </monetaryDetails> </monetaryInfo> <taxDetailsInfoGroup> <taxDetailsListInfo> <taxDetails> <rate>23.00</rate> <countryCode>YQ</countryCode> <type>AC</type> </taxDetails> <taxDetails> <rate>3.00</rate> <countryCode>YQ</countryCode> <type>AD</type> </taxDetails> <taxDetails> <rate>10.00</rate> <countryCode>IZ</countryCode> <type>EB</type> </taxDetails> <taxDetails> <rate>4.17</rate> <countryCode>FR</countryCode> <type>SE</type> </taxDetails> <taxDetails> <rate>12.75</rate> <countryCode>FR</countryCode> <type>TI</type> </taxDetails> </taxDetailsListInfo> </taxDetailsInfoGroup> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>1</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>C2FLBAOW</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>C</designator> <specialService>C</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> <corporateFareInfo> <corporateFareIdentifiers> <identifyNumber>000001</identifyNumber> </corporateFareIdentifiers> </corporateFareInfo> </passengerTypeInfoGroup> </fareProductInfoGroup> </allFaresInfoGroup> </Fare\_QuoteItineraryReply>

## 5.24.3 Possible Errors

See "Error Messages" section.

* * *

## 5.25 Operation: 100 Alternate Booking code option

The Alternate Booking code option (/R,BK-xx) is not allowed in open class. A booking class should be precised (/Cx)

Remark:

If the flight Number is unknown (case of the example), the booking class can be precised with productInfo of Group bookingClassInfoGroup

Cryptic : FQP LON /D28FEB /CY NYC /R,BK-VN/L

## 5.25.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItinerary xmlns="http://xml.amadeus.com/FITQPQ\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <passengerInfoGroup> <segmentRepetitionControl> <segmentControlDetails> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </segmentRepetitionControl> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeGroup> <fareInfo> <valueQualifier>ADT</valueQualifier> </fareInfo> </passengerTypeGroup> </passengerInfoGroup> <bookingClassInfoGroup> <productInfo> <productDetailsQualifier>ABC</productDetailsQualifier> <bookingClassDetails> <designator>VN</designator> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> <pricingTktOptionGroup> <pricingTicketingDetails> <priceTicketDetails> <indicators>LF</indicators> </priceTicketDetails> </pricingTicketingDetails> </pricingTktOptionGroup> <requestedSegmentInfoGroup> <originAndDestinationDetails></originAndDestinationDetails> <flightSegmentInfoGroup> <travelProductInfo> <flightDate> <departureDate>280209</departureDate> </flightDate> <boardPointDetails> <departureCity>LON</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>NYC</arrivalCity> </offpointDetails> </travelProductInfo> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>Y</designator> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </flightSegmentInfoGroup> </requestedSegmentInfoGroup> </Fare\_QuoteItinerary>

## 5.25.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItineraryReply xmlns="http://xml.amadeus.com/FITQPR\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <allFaresInfoGroup> <markerAllFares></markerAllFares> <involvedCurrenciesInfo> <conversionRateDetails> <conversionType>707</conversionType> <currency>EUR</currency> </conversionRateDetails> <conversionRateDetails> <conversionType>705</conversionType> <currency>GBP</currency> </conversionRateDetails> </involvedCurrenciesInfo> <flightInfoGroup> <involvedFlightInfo> <boardPointDetails> <trueLocationId>LON</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>NYC</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>YY</marketingCompany> </companyDetails> </involvedFlightInfo> <itineraryInfoGroup> <travelItineraryInfo> <segmentItemNumber>1</segmentItemNumber> </travelItineraryInfo> </itineraryInfoGroup> </flightInfoGroup> <fareProductInfoGroup> <generalAndIdInfo> <segmentControlDetails> <productReference>1</productReference> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </generalAndIdInfo> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeInfoGroup> <fareInfo> <fareTypeGrouping> <aggregatePTCDiscount>ADT</aggregatePTCDiscount> </fareTypeGrouping> </fareInfo> <pricingticketingDetails> <priceTicketDetails> <indicators>RBR</indicators> </priceTicketDetails> </pricingticketingDetails> <conversionRate> <conversionRateDetails> <conversionType>700</conversionType> <currency>NUC</currency> <rateType>ROE</rateType> <pricingAmount>2837.33</pricingAmount> <conversionRate>0.634398</conversionRate> </conversionRateDetails> </conversionRate> <monetaryInfo> <monetaryDetails> <typeQualifier>B</typeQualifier> <amount>1800.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>E</typeQualifier> <amount>2161.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>T</typeQualifier> <amount>2259.12</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>TX</typeQualifier> <amount>98.12</amount> </monetaryDetails> </monetaryInfo> <taxDetailsInfoGroup> <taxDetailsListInfo> <taxDetails> <rate>72.03</rate> <countryCode>GB</countryCode> <type>AD</type> </taxDetails> <taxDetails> <rate>4.25</rate> <countryCode>YC</countryCode> <type>AE</type> </taxDetails> <taxDetails> <rate>12.58</rate> <countryCode>US</countryCode> <type>AS</type> </taxDetails> <taxDetails> <rate>3.86</rate> <countryCode>XA</countryCode> <type>CO</type> </taxDetails> <taxDetails> <rate>5.40</rate> <countryCode>XY</countryCode> <type>CR</type> </taxDetails> </taxDetailsListInfo> </taxDetailsInfoGroup> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>1</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>YIF</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>Y</designator> <specialService>Y</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> </passengerTypeInfoGroup> </fareProductInfoGroup> </allFaresInfoGroup> </Fare\_QuoteItineraryReply>

## 5.25.3 Possible Errors

See "Error Messages" section.

* * *

## 5.26 Operation: 110 Validating Carrier and Override booking data option and Lowest Fare option

Validating carrier : AF

Override booking : OBD

Lowest Fare : LF

Cryptic : FQP LON /D17NOV NYC /R,VC-AF,DO-OBD/L

## 5.26.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItinerary xmlns="http://xml.amadeus.com/FITQPQ\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <passengerInfoGroup> <segmentRepetitionControl> <segmentControlDetails> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </segmentRepetitionControl> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeGroup> <fareInfo> <valueQualifier>ADT</valueQualifier> </fareInfo> </passengerTypeGroup> </passengerInfoGroup> <pricingTktOptionGroup> <pricingTicketingDetails> <priceTicketDetails> <indicators>VC</indicators> </priceTicketDetails> <companyDetails> <marketingCompany>AF</marketingCompany> </companyDetails> </pricingTicketingDetails> </pricingTktOptionGroup> <pricingTktOptionGroup> <pricingTicketingDetails> <priceTicketDetails> <indicators>OBD</indicators> </priceTicketDetails> </pricingTicketingDetails> </pricingTktOptionGroup> <pricingTktOptionGroup> <pricingTicketingDetails> <priceTicketDetails> <indicators>LF</indicators> </priceTicketDetails> </pricingTicketingDetails> </pricingTktOptionGroup> <requestedSegmentInfoGroup> <originAndDestinationDetails></originAndDestinationDetails> <flightSegmentInfoGroup> <travelProductInfo> <flightDate> <departureDate>171108</departureDate> </flightDate> <boardPointDetails> <departureCity>LON</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>NYC</arrivalCity> </offpointDetails> </travelProductInfo> </flightSegmentInfoGroup> </requestedSegmentInfoGroup> </Fare\_QuoteItinerary>

## 5.26.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItineraryReply xmlns="http://xml.amadeus.com/FITQPR\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <allFaresInfoGroup> <markerAllFares></markerAllFares> <involvedCurrenciesInfo> <conversionRateDetails> <conversionType>707</conversionType> <currency>EUR</currency> </conversionRateDetails> <conversionRateDetails> <conversionType>705</conversionType> <currency>GBP</currency> </conversionRateDetails> </involvedCurrenciesInfo> <flightInfoGroup> <involvedFlightInfo> <boardPointDetails> <trueLocationId>LON</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>NYC</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>YY</marketingCompany> </companyDetails> </involvedFlightInfo> <itineraryInfoGroup> <travelItineraryInfo> <segmentItemNumber>1</segmentItemNumber> </travelItineraryInfo> </itineraryInfoGroup> </flightInfoGroup> <fareProductInfoGroup> <generalAndIdInfo> <segmentControlDetails> <productReference>1</productReference> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </generalAndIdInfo> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeInfoGroup> <fareInfo> <fareTypeGrouping> <aggregatePTCDiscount>ADT</aggregatePTCDiscount> </fareTypeGrouping> </fareInfo> <pricingticketingDetails> <priceTicketDetails> <indicators>RBR</indicators> </priceTicketDetails> </pricingticketingDetails> <conversionRate> <conversionRateDetails> <conversionType>700</conversionType> <currency>NUC</currency> <rateType>ROE</rateType> <pricingAmount>2837.33</pricingAmount> <conversionRate>0.634398</conversionRate> </conversionRateDetails> </conversionRate> <monetaryInfo> <monetaryDetails> <typeQualifier>B</typeQualifier> <amount>1800.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>E</typeQualifier> <amount>2161.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>T</typeQualifier> <amount>2259.12</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>TX</typeQualifier> <amount>98.12</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>XOB</typeQualifier> <amount>2259.12</amount> </monetaryDetails> </monetaryInfo> <taxDetailsInfoGroup> <taxDetailsListInfo> <taxDetails> <rate>72.03</rate> <countryCode>GB</countryCode> <type>AD</type> </taxDetails> <taxDetails> <rate>4.25</rate> <countryCode>YC</countryCode> <type>AE</type> </taxDetails> <taxDetails> <rate>12.58</rate> <countryCode>US</countryCode> <type>AS</type> </taxDetails> <taxDetails> <rate>3.86</rate> <countryCode>XA</countryCode> <type>CO</type> </taxDetails> <taxDetails> <rate>5.40</rate> <countryCode>XY</countryCode> <type>CR</type> </taxDetails> </taxDetailsListInfo> </taxDetailsInfoGroup> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>1</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>YIF</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>Y</designator> <specialService>Y</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> </passengerTypeInfoGroup> </fareProductInfoGroup> </allFaresInfoGroup> </Fare\_QuoteItineraryReply>

## 5.26.3 Possible Errors

See "Error Messages" section.

* * *

## 5.27 Operation: 120 Electronic and Paper Ticket

Electronic and Paper Ticket : EP

E-Ticket only : ET or E

Paper-Ticket only : PT or P

Cryptic : FQP LON/D11MAY PAR /EP

## 5.27.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItinerary xmlns="http://xml.amadeus.com/FITQPQ\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <passengerInfoGroup> <segmentRepetitionControl> <segmentControlDetails> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </segmentRepetitionControl> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeGroup> <fareInfo> <valueQualifier>ADT</valueQualifier> </fareInfo> </passengerTypeGroup> </passengerInfoGroup> <pricingTktOptionGroup> <pricingTicketingDetails> <priceTicketDetails> <indicators>EP</indicators> </priceTicketDetails> </pricingTicketingDetails> </pricingTktOptionGroup> <requestedSegmentInfoGroup> <originAndDestinationDetails></originAndDestinationDetails> <flightSegmentInfoGroup> <travelProductInfo> <flightDate> <departureDate>110510</departureDate> </flightDate> <boardPointDetails> <departureCity>LON</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>PAR</arrivalCity> </offpointDetails> </travelProductInfo> </flightSegmentInfoGroup> </requestedSegmentInfoGroup> </Fare\_QuoteItinerary>

## 5.27.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItineraryReply xmlns="http://xml.amadeus.com/FITQPR\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <allFaresInfoGroup> <markerAllFares></markerAllFares> <involvedCurrenciesInfo> <conversionRateDetails> <conversionType>707</conversionType> <currency>EUR</currency> </conversionRateDetails> <conversionRateDetails> <conversionType>705</conversionType> <currency>GBP</currency> </conversionRateDetails> </involvedCurrenciesInfo> <flightInfoGroup> <involvedFlightInfo> <boardPointDetails> <trueLocationId>LON</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>PAR</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>YY</marketingCompany> </companyDetails> </involvedFlightInfo> <itineraryInfoGroup> <travelItineraryInfo> <segmentItemNumber>1</segmentItemNumber> </travelItineraryInfo> </itineraryInfoGroup> </flightInfoGroup> <fareProductInfoGroup> <generalAndIdInfo> <segmentControlDetails> <productReference>1</productReference> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </generalAndIdInfo> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeInfoGroup> <fareInfo> <fareTypeGrouping> <aggregatePTCDiscount>ADT</aggregatePTCDiscount> </fareTypeGrouping> </fareInfo> <pricingticketingDetails> <priceTicketDetails> <indicators>RBR</indicators> </priceTicketDetails> </pricingticketingDetails> <conversionRate> <conversionRateDetails> <conversionType>700</conversionType> <currency>NUC</currency> <rateType>ROE</rateType> <pricingAmount>720.81</pricingAmount> <conversionRate>0.610424</conversionRate> </conversionRateDetails> </conversionRate> <monetaryInfo> <monetaryDetails> <typeQualifier>B</typeQualifier> <amount>440.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>E</typeQualifier> <amount>504.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>T</typeQualifier> <amount>516.59</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>TX</typeQualifier> <amount>12.59</amount> </monetaryDetails> </monetaryInfo> <taxDetailsInfoGroup> <taxDetailsListInfo> <taxDetails> <rate>12.59</rate> <countryCode>GB</countryCode> <type>AD</type> </taxDetails> </taxDetailsListInfo> </taxDetailsInfoGroup> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>1</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>YIF</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>Y</designator> <specialService>Y</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> </passengerTypeInfoGroup> </fareProductInfoGroup> <fareProductInfoGroup> <generalAndIdInfo> <segmentControlDetails> <productReference>2</productReference> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </generalAndIdInfo> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeInfoGroup> <fareInfo> <fareTypeGrouping> <aggregatePTCDiscount>ADT</aggregatePTCDiscount> </fareTypeGrouping> </fareInfo> <pricingticketingDetails> <priceTicketDetails> <indicators>RBR</indicators> </priceTicketDetails> </pricingticketingDetails> <conversionRate> <conversionRateDetails> <conversionType>700</conversionType> <currency>NUC</currency> <rateType>ROE</rateType> <pricingAmount>720.81</pricingAmount> <conversionRate>0.610424</conversionRate> </conversionRateDetails> </conversionRate> <monetaryInfo> <monetaryDetails> <typeQualifier>B</typeQualifier> <amount>440.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>E</typeQualifier> <amount>504.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>T</typeQualifier> <amount>529.18</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>TX</typeQualifier> <amount>25.18</amount> </monetaryDetails> </monetaryInfo> <taxDetailsInfoGroup> <taxDetailsListInfo> <taxDetails> <rate>25.18</rate> <countryCode>GB</countryCode> <type>AD</type> </taxDetails> </taxDetailsListInfo> </taxDetailsInfoGroup> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>1</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>CIF</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>C</designator> <specialService>C</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> </passengerTypeInfoGroup> </fareProductInfoGroup> </allFaresInfoGroup> </Fare\_QuoteItineraryReply>

## 5.27.3 Possible Errors

See "Error Messages" section.

* * *

## 5.28 Operation: 121 Frequent Flyer process and E-Ticket only

Frequent flyer indicator : MFF

Program code : BA

E-Ticket only : ET or E (PT or P for Paper-Ticket only and EP for Paper and Electronic Ticket)

Cryptic : FQP LON /D17NOV PAR /ET /MBA

## 5.28.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItinerary xmlns="http://xml.amadeus.com/FITQPQ\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <passengerInfoGroup> <segmentRepetitionControl> <segmentControlDetails> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </segmentRepetitionControl> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeGroup> <fareInfo> <valueQualifier>ADT</valueQualifier> </fareInfo> </passengerTypeGroup> </passengerInfoGroup> <pricingTktOptionGroup> <pricingTicketingDetails> <priceTicketDetails> <indicators>MFF</indicators> </priceTicketDetails> <companyDetails> <marketingCompany>BA</marketingCompany> </companyDetails> </pricingTicketingDetails> </pricingTktOptionGroup> <pricingTktOptionGroup> <pricingTicketingDetails> <priceTicketDetails> <indicators>ET</indicators> </priceTicketDetails> </pricingTicketingDetails> </pricingTktOptionGroup> <requestedSegmentInfoGroup> <originAndDestinationDetails></originAndDestinationDetails> <flightSegmentInfoGroup> <travelProductInfo> <flightDate> <departureDate>171108</departureDate> </flightDate> <boardPointDetails> <departureCity>LON</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>PAR</arrivalCity> </offpointDetails> </travelProductInfo> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>Y</designator> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </flightSegmentInfoGroup> </requestedSegmentInfoGroup> </Fare\_QuoteItinerary>

## 5.28.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItineraryReply xmlns="http://xml.amadeus.com/FITQPR\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <errorInfoGroup> <rejectErrorCode> <errorDetails> <errorCode>0</errorCode> </errorDetails> </rejectErrorCode> <errorFreeText> <freeText>FORMAT NEEDS CORPORATE CODE</freeText> </errorFreeText> </errorInfoGroup> </Fare\_QuoteItineraryReply>

## 5.28.3 Possible Errors

See "Error Messages" section.

* * *

## 5.29 Operation: 131 OB Fee input option

OB fees global option

Fee type : OB (Ticketing Fees)

2 possible options: EX (Exempt all fees) or IN (Include all fees).

Cryptic : FQP LON /D24NOV PAR /R,FA

## 5.29.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItinerary xmlns="http://xml.amadeus.com/FITQPQ\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <passengerInfoGroup> <segmentRepetitionControl> <segmentControlDetails> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </segmentRepetitionControl> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeGroup> <fareInfo> <valueQualifier>ADT</valueQualifier> </fareInfo> </passengerTypeGroup> </passengerInfoGroup> <feeOptionsEncapInfo> <markerFeeOptions></markerFeeOptions> <feeOptionInfoGroup> <feeTypeInfo> <carrierFeeDetails> <type>OB</type> <optionInformation>IN</optionInformation> </carrierFeeDetails> </feeTypeInfo> </feeOptionInfoGroup> </feeOptionsEncapInfo> <requestedSegmentInfoGroup> <originAndDestinationDetails></originAndDestinationDetails> <flightSegmentInfoGroup> <travelProductInfo> <flightDate> <departureDate>241108</departureDate> </flightDate> <boardPointDetails> <departureCity>LON</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>PAR</arrivalCity> </offpointDetails> </travelProductInfo> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>Y</designator> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </flightSegmentInfoGroup> </requestedSegmentInfoGroup> </Fare\_QuoteItinerary>

## 5.29.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItineraryReply xmlns="http://xml.amadeus.com/FITQPR\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <allFaresInfoGroup> <markerAllFares></markerAllFares> <involvedCurrenciesInfo> <conversionRateDetails> <conversionType>707</conversionType> <currency>EUR</currency> </conversionRateDetails> <conversionRateDetails> <conversionType>705</conversionType> <currency>GBP</currency> </conversionRateDetails> </involvedCurrenciesInfo> <flightInfoGroup> <involvedFlightInfo> <boardPointDetails> <trueLocationId>LON</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>PAR</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>YY</marketingCompany> </companyDetails> </involvedFlightInfo> <itineraryInfoGroup> <travelItineraryInfo> <segmentItemNumber>1</segmentItemNumber> </travelItineraryInfo> </itineraryInfoGroup> </flightInfoGroup> <fareProductInfoGroup> <generalAndIdInfo> <segmentControlDetails> <productReference>1</productReference> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </generalAndIdInfo> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeInfoGroup> <fareInfo> <fareTypeGrouping> <aggregatePTCDiscount>ADT</aggregatePTCDiscount> </fareTypeGrouping> </fareInfo> <conversionRate> <conversionRateDetails> <conversionType>700</conversionType> <currency>NUC</currency> <rateType>ROE</rateType> <pricingAmount>720.81</pricingAmount> <conversionRate>0.610424</conversionRate> </conversionRateDetails> </conversionRate> <monetaryInfo> <monetaryDetails> <typeQualifier>B</typeQualifier> <amount>440.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>E</typeQualifier> <amount>504.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>T</typeQualifier> <amount>517.73</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>TX</typeQualifier> <amount>13.73</amount> </monetaryDetails> </monetaryInfo> <taxDetailsInfoGroup> <taxDetailsListInfo> <taxDetails> <rate>13.73</rate> <countryCode>GB</countryCode> <type>AD</type> </taxDetails> </taxDetailsListInfo> </taxDetailsInfoGroup> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>1</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>YIF</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>Y</designator> <specialService>Y</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> </passengerTypeInfoGroup> </fareProductInfoGroup> </allFaresInfoGroup> </Fare\_QuoteItineraryReply>

## 5.29.3 Possible Errors

See "Error Messages" section.

* * *

## 5.30 Operation: 132 OB Fee input option

OB fees detailed option

2 possible options: FEX (Exempt fee) or FIN (Include fee).

Include fee option used with a form of payment fee subtype can be completed with the amount to be charged on this form of payment.

Cryptic : FQP LON /D26MAY PAR /R,FA-OBFC2,FX-OBFC4

## 5.30.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItinerary xmlns="http://xml.amadeus.com/FITQPQ\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <passengerInfoGroup> <segmentRepetitionControl> <segmentControlDetails> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </segmentRepetitionControl> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeGroup> <fareInfo> <valueQualifier>ADT</valueQualifier> </fareInfo> </passengerTypeGroup> </passengerInfoGroup> <feeOptionsEncapInfo> <markerFeeOptions></markerFeeOptions> <feeOptionInfoGroup> <feeTypeInfo> <carrierFeeDetails> <type>OB</type> </carrierFeeDetails> </feeTypeInfo> <feeDetailsInfoGroup> <feeInfo> <dataTypeInformation> <type>FC2</type> </dataTypeInformation> </feeInfo> <feeProcessingInfo> <carrierFeeDetails> <type>FIN</type> </carrierFeeDetails> </feeProcessingInfo> </feeDetailsInfoGroup> <feeDetailsInfoGroup> <feeInfo> <dataTypeInformation> <type>FC4</type> </dataTypeInformation> </feeInfo> <feeProcessingInfo> <carrierFeeDetails> <type>FEX</type> </carrierFeeDetails> </feeProcessingInfo> </feeDetailsInfoGroup> </feeOptionInfoGroup> </feeOptionsEncapInfo> <requestedSegmentInfoGroup> <originAndDestinationDetails></originAndDestinationDetails> <flightSegmentInfoGroup> <travelProductInfo> <flightDate> <departureDate>260510</departureDate> </flightDate> <boardPointDetails> <departureCity>LON</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>PAR</arrivalCity> </offpointDetails> </travelProductInfo> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>Y</designator> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </flightSegmentInfoGroup> </requestedSegmentInfoGroup> </Fare\_QuoteItinerary>

## 5.30.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItineraryReply xmlns="http://xml.amadeus.com/FITQPR\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <allFaresInfoGroup> <markerAllFares></markerAllFares> <involvedCurrenciesInfo> <conversionRateDetails> <conversionType>707</conversionType> <currency>CAD</currency> </conversionRateDetails> <conversionRateDetails> <conversionType>705</conversionType> <currency>CAD</currency> </conversionRateDetails> </involvedCurrenciesInfo> <flightInfoGroup> <involvedFlightInfo> <boardPointDetails> <trueLocationId>YVR</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>HKG</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>YY</marketingCompany> </companyDetails> </involvedFlightInfo> <itineraryInfoGroup> <travelItineraryInfo> <segmentItemNumber>1</segmentItemNumber> </travelItineraryInfo> </itineraryInfoGroup> </flightInfoGroup> <fareProductInfoGroup> <generalAndIdInfo> <segmentControlDetails> <productReference>1</productReference> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </generalAndIdInfo> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeInfoGroup> <fareInfo> <fareTypeGrouping> <aggregatePTCDiscount>ADT</aggregatePTCDiscount> </fareTypeGrouping> </fareInfo> <pricingticketingDetails> <priceTicketDetails> <indicators>RBR</indicators> </priceTicketDetails> </pricingticketingDetails> <conversionRate> <conversionRateDetails> <conversionType>700</conversionType> <currency>NUC</currency> <rateType>ROE</rateType> <pricingAmount>1697.79</pricingAmount> <conversionRate>1.054310</conversionRate> </conversionRateDetails> </conversionRate> <monetaryInfo> <monetaryDetails> <typeQualifier>B</typeQualifier> <amount>1790.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>T</typeQualifier> <amount>1893.75</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>TX</typeQualifier> <amount>62.75</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>OB</typeQualifier> <amount>41.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>XOB</typeQualifier> <amount>1852.75</amount> </monetaryDetails> </monetaryInfo> <taxDetailsInfoGroup> <taxDetailsListInfo> <taxDetails> <rate>17.00</rate> <countryCode>CA</countryCode> <type>AE</type> </taxDetails> <taxDetails> <rate>0.75</rate> <countryCode>XG</countryCode> <type>EB</type> </taxDetails> <taxDetails> <rate>30.00</rate> <countryCode>RC</countryCode> <type>CB</type> </taxDetails> <taxDetails> <rate>15.00</rate> <countryCode>SQ</countryCode> <type>AD</type> </taxDetails> </taxDetailsListInfo> </taxDetailsInfoGroup> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>1</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>YKXOX</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>Y</designator> <specialService>Y</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> </passengerTypeInfoGroup> </fareProductInfoGroup> <fareProductInfoGroup> <generalAndIdInfo> <segmentControlDetails> <productReference>2</productReference> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </generalAndIdInfo> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeInfoGroup> <fareInfo> <fareTypeGrouping> <aggregatePTCDiscount>ADT</aggregatePTCDiscount> </fareTypeGrouping> </fareInfo> <pricingticketingDetails> <priceTicketDetails> <indicators>RBR</indicators> </priceTicketDetails> </pricingticketingDetails> <conversionRate> <conversionRateDetails> <conversionType>700</conversionType> <currency>NUC</currency> <rateType>ROE</rateType> <pricingAmount>3407.91</pricingAmount> <conversionRate>1.054310</conversionRate> </conversionRateDetails> </conversionRate> <monetaryInfo> <monetaryDetails> <typeQualifier>B</typeQualifier> <amount>3593.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>T</typeQualifier> <amount>3696.75</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>TX</typeQualifier> <amount>62.75</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>OB</typeQualifier> <amount>41.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>XOB</typeQualifier> <amount>3655.75</amount> </monetaryDetails> </monetaryInfo> <taxDetailsInfoGroup> <taxDetailsListInfo> <taxDetails> <rate>17.00</rate> <countryCode>CA</countryCode> <type>AE</type> </taxDetails> <taxDetails> <rate>0.75</rate> <countryCode>XG</countryCode> <type>EB</type> </taxDetails> <taxDetails> <rate>30.00</rate> <countryCode>RC</countryCode> <type>CB</type> </taxDetails> <taxDetails> <rate>15.00</rate> <countryCode>SQ</countryCode> <type>AD</type> </taxDetails> </taxDetailsListInfo> </taxDetailsInfoGroup> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>1</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>Y</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>Y</designator> <specialService>Y</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> </passengerTypeInfoGroup> </fareProductInfoGroup> <fareProductInfoGroup> <generalAndIdInfo> <segmentControlDetails> <productReference>3</productReference> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </generalAndIdInfo> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeInfoGroup> <fareInfo> <fareTypeGrouping> <aggregatePTCDiscount>ADT</aggregatePTCDiscount> </fareTypeGrouping> </fareInfo> <pricingticketingDetails> <priceTicketDetails> <indicators>RBR</indicators> </priceTicketDetails> </pricingticketingDetails> <conversionRate> <conversionRateDetails> <conversionType>700</conversionType> <currency>NUC</currency> <rateType>ROE</rateType> <pricingAmount>5594.18</pricingAmount> <conversionRate>1.054310</conversionRate> </conversionRateDetails> </conversionRate> <monetaryInfo> <monetaryDetails> <typeQualifier>B</typeQualifier> <amount>5898.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>T</typeQualifier> <amount>6001.75</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>TX</typeQualifier> <amount>62.75</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>OB</typeQualifier> <amount>41.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>XOB</typeQualifier> <amount>5960.75</amount> </monetaryDetails> </monetaryInfo> <taxDetailsInfoGroup> <taxDetailsListInfo> <taxDetails> <rate>17.00</rate> <countryCode>CA</countryCode> <type>AE</type> </taxDetails> <taxDetails> <rate>0.75</rate> <countryCode>XG</countryCode> <type>EB</type> </taxDetails> <taxDetails> <rate>30.00</rate> <countryCode>RC</countryCode> <type>CB</type> </taxDetails> <taxDetails> <rate>15.00</rate> <countryCode>SQ</countryCode> <type>AD</type> </taxDetails> </taxDetailsListInfo> </taxDetailsInfoGroup> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>1</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>C</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>C</designator> <specialService>C</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> </passengerTypeInfoGroup> </fareProductInfoGroup> <fareProductInfoGroup> <generalAndIdInfo> <segmentControlDetails> <productReference>4</productReference> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </generalAndIdInfo> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeInfoGroup> <fareInfo> <fareTypeGrouping> <aggregatePTCDiscount>ADT</aggregatePTCDiscount> </fareTypeGrouping> </fareInfo> <pricingticketingDetails> <priceTicketDetails> <indicators>RBR</indicators> </priceTicketDetails> </pricingticketingDetails> <conversionRate> <conversionRateDetails> <conversionType>700</conversionType> <currency>NUC</currency> <rateType>ROE</rateType> <pricingAmount>8822.83</pricingAmount> <conversionRate>1.054310</conversionRate> </conversionRateDetails> </conversionRate> <monetaryInfo> <monetaryDetails> <typeQualifier>B</typeQualifier> <amount>9302.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>T</typeQualifier> <amount>9405.75</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>TX</typeQualifier> <amount>62.75</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>OB</typeQualifier> <amount>41.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>XOB</typeQualifier> <amount>9364.75</amount> </monetaryDetails> </monetaryInfo> <taxDetailsInfoGroup> <taxDetailsListInfo> <taxDetails> <rate>17.00</rate> <countryCode>CA</countryCode> <type>AE</type> </taxDetails> <taxDetails> <rate>0.75</rate> <countryCode>XG</countryCode> <type>EB</type> </taxDetails> <taxDetails> <rate>30.00</rate> <countryCode>RC</countryCode> <type>CB</type> </taxDetails> <taxDetails> <rate>15.00</rate> <countryCode>SQ</countryCode> <type>AD</type> </taxDetails> </taxDetailsListInfo> </taxDetailsInfoGroup> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>1</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>F</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>F</designator> <specialService>F</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> </passengerTypeInfoGroup> </fareProductInfoGroup> </allFaresInfoGroup> </Fare\_QuoteItineraryReply>

## 5.30.3 Possible Errors

See "Error Messages" section.

* * *

## 5.31 Operation: 141 Flight Details

Carrier Code + Operating Carrier Code + Flight Number + Reservation Booking Class

If the flight Number is known (case of the example), the booking class should be precised with the same travelProductInfo group.

## 5.31.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItinerary xmlns="http://xml.amadeus.com/FITQPQ\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <passengerInfoGroup> <segmentRepetitionControl> <segmentControlDetails> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </segmentRepetitionControl> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeGroup> <fareInfo> <valueQualifier>ADT</valueQualifier> </fareInfo> </passengerTypeGroup> </passengerInfoGroup> <requestedSegmentInfoGroup> <originAndDestinationDetails></originAndDestinationDetails> <flightSegmentInfoGroup> <travelProductInfo> <flightDate> <departureDate>241108</departureDate> </flightDate> <boardPointDetails> <departureCity>NYC</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>PAR</arrivalCity> </offpointDetails> <companyDetails> <marketingCompany>UA</marketingCompany> <operatingCompany>AF</operatingCompany> </companyDetails> <flightIdentification> <flightNumber>0010</flightNumber> <bookingClass>C</bookingClass> </flightIdentification> </travelProductInfo> </flightSegmentInfoGroup> </requestedSegmentInfoGroup> </Fare\_QuoteItinerary>

## 5.31.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItineraryReply xmlns="http://xml.amadeus.com/FITQPR\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <allFaresInfoGroup> <markerAllFares></markerAllFares> <involvedCurrenciesInfo> <conversionRateDetails> <conversionType>707</conversionType> <currency>EUR</currency> </conversionRateDetails> <conversionRateDetails> <conversionType>705</conversionType> <currency>USD</currency> </conversionRateDetails> </involvedCurrenciesInfo> <flightInfoGroup> <involvedFlightInfo> <boardPointDetails> <trueLocationId>NYC</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>PAR</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>UA</marketingCompany> </companyDetails> </involvedFlightInfo> <itineraryInfoGroup> <travelItineraryInfo> <segmentItemNumber>1</segmentItemNumber> </travelItineraryInfo> </itineraryInfoGroup> </flightInfoGroup> <fareProductInfoGroup> <generalAndIdInfo> <segmentControlDetails> <productReference>1</productReference> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </generalAndIdInfo> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeInfoGroup> <fareInfo> <fareTypeGrouping> <aggregatePTCDiscount>ADT</aggregatePTCDiscount> </fareTypeGrouping> </fareInfo> <pricingticketingDetails> <priceTicketDetails> <indicators>RBR</indicators> </priceTicketDetails> </pricingticketingDetails> <conversionRate> <conversionRateDetails> <conversionType>700</conversionType> <currency>NUC</currency> <rateType>ROE</rateType> <pricingAmount>6405.00</pricingAmount> <conversionRate>1.000000</conversionRate> </conversionRateDetails> </conversionRate> <monetaryInfo> <monetaryDetails> <typeQualifier>B</typeQualifier> <amount>6405.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>E</typeQualifier> <amount>4941.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>T</typeQualifier> <amount>5125.20</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>TX</typeQualifier> <amount>184.20</amount> </monetaryDetails> </monetaryInfo> <taxDetailsInfoGroup> <taxDetailsListInfo> <taxDetails> <rate>169.69</rate> <countryCode>YQ</countryCode> <type>AC</type> </taxDetails> <taxDetails> <rate>12.58</rate> <countryCode>US</countryCode> <type>AP</type> </taxDetails> <taxDetails> <rate>1.93</rate> <countryCode>AY</countryCode> <type>SE</type> </taxDetails> </taxDetailsListInfo> </taxDetailsInfoGroup> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>1</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>J1</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>J</designator> <specialService>J</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> </passengerTypeInfoGroup> </fareProductInfoGroup> </allFaresInfoGroup> </Fare\_QuoteItineraryReply>

## 5.31.3 Possible Errors

See "Error Messages" section.

* * *

## 5.32 Operation: 142 Flight Details

Departure date: 25/02/09

Departure time: 19h00

Origin: NYC

Destination: PAR

By default, the destination Date is equal to the origin Date

## 5.32.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItinerary xmlns="http://xml.amadeus.com/FITQPQ\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <passengerInfoGroup> <segmentRepetitionControl> <segmentControlDetails> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </segmentRepetitionControl> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeGroup> <fareInfo> <valueQualifier>ADT</valueQualifier> </fareInfo> </passengerTypeGroup> </passengerInfoGroup> <requestedSegmentInfoGroup> <originAndDestinationDetails></originAndDestinationDetails> <flightSegmentInfoGroup> <travelProductInfo> <flightDate> <departureDate>250209</departureDate> <departureTime>1900</departureTime> </flightDate> <boardPointDetails> <departureCity>NYC</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>PAR</arrivalCity> </offpointDetails> </travelProductInfo> </flightSegmentInfoGroup> </requestedSegmentInfoGroup> </Fare\_QuoteItinerary>

## 5.32.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.32.3 Possible Errors

See "Error Messages" section.

* * *

## 5.33 Operation: 143 Flight Details

Equipment Type: DH8

Booking Class : Y

If the flight Number is unknown (case of the example), the booking class should be precised with _productInfo_ of Group _bookingClassInfoGroup_

## 5.33.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItinerary xmlns="http://xml.amadeus.com/FITQPQ\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <passengerInfoGroup> <segmentRepetitionControl> <segmentControlDetails> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </segmentRepetitionControl> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeGroup> <fareInfo> <valueQualifier>ADT</valueQualifier> </fareInfo> </passengerTypeGroup> </passengerInfoGroup> <requestedSegmentInfoGroup> <originAndDestinationDetails></originAndDestinationDetails> <flightSegmentInfoGroup> <travelProductInfo> <flightDate> <departureDate>060808</departureDate> </flightDate> <boardPointDetails> <departureCity>NYC</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>PAR</arrivalCity> </offpointDetails> </travelProductInfo> <additionalProductDetails> <legDetails> <equipment>DH8</equipment> </legDetails> </additionalProductDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>Y</designator> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </flightSegmentInfoGroup> <flightSegmentInfoGroup> <travelProductInfo> <boardPointDetails> <departureCity>PAR</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>NCE</arrivalCity> </offpointDetails> <companyDetails> <marketingCompany>AF</marketingCompany> </companyDetails> </travelProductInfo> </flightSegmentInfoGroup> </requestedSegmentInfoGroup> </Fare\_QuoteItinerary>

## 5.33.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.33.3 Possible Errors

See "Error Messages" section.

* * *

## 5.34 Operation: 144 Flight Details

Fare Breakpoint at the next city / Inhibit Fare Breakpoint at the next city

## 5.34.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItinerary xmlns="http://xml.amadeus.com/FITQPQ\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <passengerInfoGroup> <segmentRepetitionControl> <segmentControlDetails> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </segmentRepetitionControl> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeGroup> <fareInfo> <valueQualifier>ADT</valueQualifier> </fareInfo> </passengerTypeGroup> </passengerInfoGroup> <requestedSegmentInfoGroup> <originAndDestinationDetails></originAndDestinationDetails> <flightSegmentInfoGroup> <travelProductInfo> <flightDate> <departureDate>060808</departureDate> </flightDate> <boardPointDetails> <departureCity>LON</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>MAN</arrivalCity> </offpointDetails> <companyDetails> <marketingCompany>BA</marketingCompany> </companyDetails> </travelProductInfo> </flightSegmentInfoGroup> <flightSegmentInfoGroup> <travelProductInfo> <boardPointDetails> <departureCity>MAN</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>NYC</arrivalCity> </offpointDetails> <companyDetails> <marketingCompany>BA</marketingCompany> </companyDetails> <flightTypeDetails> <connectionIndicator>U</connectionIndicator> <breakpointIndicator>BM</breakpointIndicator> </flightTypeDetails> </travelProductInfo> </flightSegmentInfoGroup> <flightSegmentInfoGroup> <travelProductInfo> <boardPointDetails> <departureCity>NYC</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>BOS</arrivalCity> </offpointDetails> <companyDetails> <marketingCompany>AA</marketingCompany> </companyDetails> <flightTypeDetails> <connectionIndicator>U</connectionIndicator> <breakpointIndicator>BN</breakpointIndicator> </flightTypeDetails> </travelProductInfo> </flightSegmentInfoGroup> </requestedSegmentInfoGroup> </Fare\_QuoteItinerary>

## 5.34.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.34.3 Possible Errors

See "Error Messages" section.

* * *

## 5.35 Operation: 145 Flight Details

Turnaround point at the next city: PT

Global Routing via a specified route-code : 7AT

## 5.35.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItinerary xmlns="http://xml.amadeus.com/FITQPQ\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <passengerInfoGroup> <segmentRepetitionControl> <segmentControlDetails> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </segmentRepetitionControl> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeGroup> <fareInfo> <valueQualifier>ADT</valueQualifier> </fareInfo> </passengerTypeGroup> </passengerInfoGroup> <requestedSegmentInfoGroup> <originAndDestinationDetails></originAndDestinationDetails> <flightSegmentInfoGroup> <travelProductInfo> <flightDate> <departureDate>270908</departureDate> </flightDate> <boardPointDetails> <departureCity>LON</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>MAN</arrivalCity> </offpointDetails> <companyDetails> <marketingCompany>BA</marketingCompany> </companyDetails> <flightTypeDetails> <connectionIndicator>U</connectionIndicator> <turnaroundIndicator>PT</turnaroundIndicator> </flightTypeDetails> </travelProductInfo> </flightSegmentInfoGroup> <flightSegmentInfoGroup> <travelProductInfo> <boardPointDetails> <departureCity>MAN</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>NYC</arrivalCity> </offpointDetails> <companyDetails> <marketingCompany>BA</marketingCompany> </companyDetails> </travelProductInfo> <fareQualifierDetails> <movementType>7AT</movementType> </fareQualifierDetails> </flightSegmentInfoGroup> <flightSegmentInfoGroup> <travelProductInfo> <boardPointDetails> <departureCity>NYC</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>BOS</arrivalCity> </offpointDetails> <companyDetails> <marketingCompany>AA</marketingCompany> </companyDetails> </travelProductInfo> </flightSegmentInfoGroup> </requestedSegmentInfoGroup> </Fare\_QuoteItinerary>

## 5.35.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.35.3 Possible Errors

See "Error Messages" section.

* * *

## 5.36 Operation: 146 Flight Details

Surface (non flight segment)

Cryptic: FQP PAR /D27SEP /ABALON--MAN/ABANYC/AAABOS/R,ET

## 5.36.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItinerary xmlns="http://xml.amadeus.com/FITQPQ\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <passengerInfoGroup> <segmentRepetitionControl> <segmentControlDetails> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </segmentRepetitionControl> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeGroup> <fareInfo> <valueQualifier>ADT</valueQualifier> </fareInfo> </passengerTypeGroup> </passengerInfoGroup> <pricingTktOptionGroup> <pricingTicketingDetails> <priceTicketDetails> <indicators>ET</indicators> </priceTicketDetails> </pricingTicketingDetails> </pricingTktOptionGroup> <requestedSegmentInfoGroup> <originAndDestinationDetails></originAndDestinationDetails> <flightSegmentInfoGroup> <travelProductInfo> <flightDate> <departureDate>270908</departureDate> </flightDate> <boardPointDetails> <departureCity>PAR</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>LON</arrivalCity> </offpointDetails> <companyDetails> <marketingCompany>BA</marketingCompany> </companyDetails> </travelProductInfo> </flightSegmentInfoGroup> <flightSegmentInfoGroup> <travelProductInfo> <boardPointDetails> <departureCity>MAN</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>NYC</arrivalCity> </offpointDetails> <companyDetails> <marketingCompany>BA</marketingCompany> </companyDetails> </travelProductInfo> </flightSegmentInfoGroup> <flightSegmentInfoGroup> <travelProductInfo> <boardPointDetails> <departureCity>NYC</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>BOS</arrivalCity> </offpointDetails> <companyDetails> <marketingCompany>AA</marketingCompany> </companyDetails> </travelProductInfo> </flightSegmentInfoGroup> </requestedSegmentInfoGroup> </Fare\_QuoteItinerary>

## 5.36.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.36.3 Possible Errors

See "Error Messages" section.

* * *

## 5.37 Operation: 147 Flight Details

Stopover (V) after a flight segment

Cryptic : FQP PAR /D27AUG /ABALON MAN/ABA - NYC/AAA BOS/R,ET

## 5.37.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItinerary xmlns="http://xml.amadeus.com/FITQPQ\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <passengerInfoGroup> <segmentRepetitionControl> <segmentControlDetails> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </segmentRepetitionControl> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeGroup> <fareInfo> <valueQualifier>ADT</valueQualifier> </fareInfo> </passengerTypeGroup> </passengerInfoGroup> <pricingTktOptionGroup> <pricingTicketingDetails> <priceTicketDetails> <indicators>ET</indicators> </priceTicketDetails> </pricingTicketingDetails> </pricingTktOptionGroup> <requestedSegmentInfoGroup> <originAndDestinationDetails></originAndDestinationDetails> <flightSegmentInfoGroup> <travelProductInfo> <flightDate> <departureDate>270808</departureDate> </flightDate> <boardPointDetails> <departureCity>PAR</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>LON</arrivalCity> </offpointDetails> <companyDetails> <marketingCompany>BA</marketingCompany> </companyDetails> </travelProductInfo> </flightSegmentInfoGroup> <flightSegmentInfoGroup> <travelProductInfo> <boardPointDetails> <departureCity>LON</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>MAN</arrivalCity> </offpointDetails> <flightTypeDetails> <connectionIndicator>V</connectionIndicator> </flightTypeDetails> </travelProductInfo> </flightSegmentInfoGroup> <flightSegmentInfoGroup> <travelProductInfo> <boardPointDetails> <departureCity>MAN</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>NYC</arrivalCity> </offpointDetails> <companyDetails> <marketingCompany>BA</marketingCompany> </companyDetails> </travelProductInfo> </flightSegmentInfoGroup> <flightSegmentInfoGroup> <travelProductInfo> <boardPointDetails> <departureCity>NYC</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>BOS</arrivalCity> </offpointDetails> <companyDetails> <marketingCompany>AA</marketingCompany> </companyDetails> </travelProductInfo> </flightSegmentInfoGroup> </requestedSegmentInfoGroup> </Fare\_QuoteItinerary>

## 5.37.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.37.3 Possible Errors

See "Error Messages" section.

* * *

## 5.38 Operation: 148 Flight Details

Stopover after a Surface segment

Cryptic : FQP PAR /D27AUG /ABALON--MAN/ABA - NYC/AAABOS/R,ET

## 5.38.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItinerary xmlns="http://xml.amadeus.com/FITQPQ\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <passengerInfoGroup> <segmentRepetitionControl> <segmentControlDetails> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </segmentRepetitionControl> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeGroup> <fareInfo> <valueQualifier>ADT</valueQualifier> </fareInfo> </passengerTypeGroup> </passengerInfoGroup> <pricingTktOptionGroup> <pricingTicketingDetails> <priceTicketDetails> <indicators>ET</indicators> </priceTicketDetails> </pricingTicketingDetails> </pricingTktOptionGroup> <requestedSegmentInfoGroup> <originAndDestinationDetails></originAndDestinationDetails> <flightSegmentInfoGroup> <travelProductInfo> <flightDate> <departureDate>270808</departureDate> </flightDate> <boardPointDetails> <departureCity>PAR</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>LON</arrivalCity> </offpointDetails> <companyDetails> <marketingCompany>BA</marketingCompany> </companyDetails> <flightTypeDetails> <connectionIndicator>T</connectionIndicator> </flightTypeDetails> </travelProductInfo> </flightSegmentInfoGroup> <flightSegmentInfoGroup> <travelProductInfo> <boardPointDetails> <departureCity>MAN</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>NYC</arrivalCity> </offpointDetails> <companyDetails> <marketingCompany>BA</marketingCompany> </companyDetails> <flightTypeDetails> <connectionIndicator>T</connectionIndicator> </flightTypeDetails> </travelProductInfo> </flightSegmentInfoGroup> <flightSegmentInfoGroup> <travelProductInfo> <boardPointDetails> <departureCity>NYC</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>BOS</arrivalCity> </offpointDetails> <companyDetails> <marketingCompany>AA</marketingCompany> </companyDetails> <flightTypeDetails> <connectionIndicator>T</connectionIndicator> </flightTypeDetails> </travelProductInfo> </flightSegmentInfoGroup> </requestedSegmentInfoGroup> </Fare\_QuoteItinerary>

## 5.38.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.38.3 Possible Errors

See "Error Messages" section.

* * *

## 5.39 Operation: 151 Passenger discount or passenger type code specified

Passenger Discount code specified + Cumulative Passenger discounts

Case of Cumulative Passenger discounts

By default, the passenger type code is "ADT" (for Adult).

If "ADT" is specified in the **_valueQualifier_** of the **_fareInfo_** : At max. 3 discounts can be specified in the **_discountCode_** of the **_fareInfo._**

If another passenger type code (different of "ADT") is specified in the **_valueQualifier_** of the **_fareInfo_** : At max. 2 discounts can be specified in the **_discountCode_** of the **_fareInfo_** , and this 2 discounts + the new passenger type code are considered.

Cryptic : FQP LON /D15JUL NYC/RRC-BP-ID90N2

## 5.39.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItinerary xmlns="http://xml.amadeus.com/FITQPQ\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <passengerInfoGroup> <segmentRepetitionControl> <segmentControlDetails> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </segmentRepetitionControl> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeGroup> <fareInfo> <valueQualifier>ADT</valueQualifier> <fareTypeGrouping> <discountCode>RC</discountCode> <discountCode>BP</discountCode> <discountCode>ID90N2</discountCode> </fareTypeGrouping> </fareInfo> </passengerTypeGroup> </passengerInfoGroup> <requestedSegmentInfoGroup> <originAndDestinationDetails></originAndDestinationDetails> <flightSegmentInfoGroup> <travelProductInfo> <flightDate> <departureDate>150708</departureDate> </flightDate> <boardPointDetails> <departureCity>LON</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>NYC</arrivalCity> </offpointDetails> </travelProductInfo> </flightSegmentInfoGroup> </requestedSegmentInfoGroup> </Fare\_QuoteItinerary>

## 5.39.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.39.3 Possible Errors

See "Error Messages" section.

* * *

## 5.40 Operation: 152 Passenger discount or passenger type code specified

Equivalent request as previous (by default Passenger Discount code is ADT )

Case of Cumulative Passenger discounts

By default, the passenger type code is "ADT" (for Adult).

If "ADT" is specified in the **_valueQualifier_** of the **_fareInfo_** : At max. 3 discounts can be specified in the **_discountCode_** of the **_fareInfo._**

If another passenger type code (different of "ADT") is specified in the **_valueQualifier_** of the **_fareInfo_** : At max. 2 discounts can be specified in the **_discountCode_** of the **_fareInfo_** , and this 2 discounts + the new passenger type code are considered.

Cryptic : FQP LON /D15JUL NYC/RRC-BP-ID90N2

## 5.40.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItinerary xmlns="http://xml.amadeus.com/FITQPQ\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <passengerInfoGroup> <segmentRepetitionControl> <segmentControlDetails> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </segmentRepetitionControl> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeGroup> <fareInfo> <valueQualifier>RC</valueQualifier> <fareTypeGrouping> <discountCode>BP</discountCode> <discountCode>ID90N2</discountCode> </fareTypeGrouping> </fareInfo> </passengerTypeGroup> </passengerInfoGroup> <requestedSegmentInfoGroup> <originAndDestinationDetails></originAndDestinationDetails> <flightSegmentInfoGroup> <travelProductInfo> <flightDate> <departureDate>150708</departureDate> </flightDate> <boardPointDetails> <departureCity>LON</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>NYC</arrivalCity> </offpointDetails> </travelProductInfo> </flightSegmentInfoGroup> </requestedSegmentInfoGroup> </Fare\_QuoteItinerary>

## 5.40.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.40.3 Possible Errors

See "Error Messages" section.

* * *

## 5.41 Operation: 153 Passenger discount or passenger type code specified

Passenger Discount code specified + Multiple Passenger discounts + Companion Fare only

A booking class should be precised (/Cx) for The Companion Fare Only process.

If the flight Number is unknown (case of the example), the booking class can be precised with _productInfo_ of Group _bookingClassInfoGroup_

Cryptic : FQP LON /D15AUG /CY NYC /RADT\*ADT\*ZZ,W

## 5.41.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItinerary xmlns="http://xml.amadeus.com/FITQPQ\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <discountAndPenaltyInfo> <discountPenaltyQualifier>WFC</discountPenaltyQualifier> </discountAndPenaltyInfo> <passengerInfoGroup> <segmentRepetitionControl> <segmentControlDetails> <numberOfPAx>2</numberOfPAx> </segmentControlDetails> </segmentRepetitionControl> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> <travellerDetails> <referenceNumber>2</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeGroup> <fareInfo> <valueQualifier>ADT</valueQualifier> </fareInfo> </passengerTypeGroup> </passengerInfoGroup> <passengerInfoGroup> <segmentRepetitionControl> <segmentControlDetails> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </segmentRepetitionControl> <specificTravellerDetails> <travellerDetails> <referenceNumber>3</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeGroup> <fareInfo> <valueQualifier>ZZ</valueQualifier> </fareInfo> </passengerTypeGroup> </passengerInfoGroup> <requestedSegmentInfoGroup> <originAndDestinationDetails></originAndDestinationDetails> <flightSegmentInfoGroup> <travelProductInfo> <flightDate> <departureDate>150808</departureDate> </flightDate> <boardPointDetails> <departureCity>LON</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>NYC</arrivalCity> </offpointDetails> </travelProductInfo> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>Y</designator> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </flightSegmentInfoGroup> </requestedSegmentInfoGroup> </Fare\_QuoteItinerary>

## 5.41.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItineraryReply xmlns="http://xml.amadeus.com/FITQPR\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <allFaresInfoGroup> <markerAllFares></markerAllFares> <involvedCurrenciesInfo> <conversionRateDetails> <conversionType>707</conversionType> <currency>EUR</currency> </conversionRateDetails> <conversionRateDetails> <conversionType>705</conversionType> <currency>GBP</currency> </conversionRateDetails> </involvedCurrenciesInfo> <flightInfoGroup> <involvedFlightInfo> <boardPointDetails> <trueLocationId>LON</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>NYC</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>YY</marketingCompany> </companyDetails> </involvedFlightInfo> <itineraryInfoGroup> <travelItineraryInfo> <segmentItemNumber>1</segmentItemNumber> </travelItineraryInfo> </itineraryInfoGroup> </flightInfoGroup> <fareProductInfoGroup> <generalAndIdInfo> <segmentControlDetails> <productReference>1</productReference> <numberOfPAx>2</numberOfPAx> </segmentControlDetails> </generalAndIdInfo> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> <travellerDetails> <referenceNumber>2</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeInfoGroup> <fareInfo> <fareTypeGrouping> <aggregatePTCDiscount>ADT</aggregatePTCDiscount> </fareTypeGrouping> </fareInfo> <conversionRate> <conversionRateDetails> <conversionType>700</conversionType> <currency>NUC</currency> <rateType>ROE</rateType> <pricingAmount>2837.33</pricingAmount> <conversionRate>0.634398</conversionRate> </conversionRateDetails> </conversionRate> <monetaryInfo> <monetaryDetails> <typeQualifier>B</typeQualifier> <amount>1800.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>E</typeQualifier> <amount>2161.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>T</typeQualifier> <amount>2259.12</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>TX</typeQualifier> <amount>98.12</amount> </monetaryDetails> </monetaryInfo> <taxDetailsInfoGroup> <taxDetailsListInfo> <taxDetails> <rate>72.03</rate> <countryCode>GB</countryCode> <type>AD</type> </taxDetails> <taxDetails> <rate>4.25</rate> <countryCode>YC</countryCode> <type>AE</type> </taxDetails> <taxDetails> <rate>12.58</rate> <countryCode>US</countryCode> <type>AS</type> </taxDetails> <taxDetails> <rate>3.86</rate> <countryCode>XA</countryCode> <type>CO</type> </taxDetails> <taxDetails> <rate>5.40</rate> <countryCode>XY</countryCode> <type>CR</type> </taxDetails> </taxDetailsListInfo> </taxDetailsInfoGroup> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>1</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>YIF</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>Y</designator> <specialService>Y</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> </passengerTypeInfoGroup> </fareProductInfoGroup> <fareProductInfoGroup> <generalAndIdInfo> <segmentControlDetails> <productReference>2</productReference> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </generalAndIdInfo> <specificTravellerDetails> <travellerDetails> <referenceNumber>3</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeInfoGroup> <fareInfo> <fareTypeGrouping> <aggregatePTCDiscount>ADT</aggregatePTCDiscount> </fareTypeGrouping> </fareInfo> <conversionRate> <conversionRateDetails> <conversionType>700</conversionType> <currency>NUC</currency> <rateType>ROE</rateType> <pricingAmount>2837.33</pricingAmount> <conversionRate>0.634398</conversionRate> </conversionRateDetails> </conversionRate> <monetaryInfo> <monetaryDetails> <typeQualifier>B</typeQualifier> <amount>1800.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>E</typeQualifier> <amount>2161.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>T</typeQualifier> <amount>2259.12</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>TX</typeQualifier> <amount>98.12</amount> </monetaryDetails> </monetaryInfo> <taxDetailsInfoGroup> <taxDetailsListInfo> <taxDetails> <rate>72.03</rate> <countryCode>GB</countryCode> <type>AD</type> </taxDetails> <taxDetails> <rate>4.25</rate> <countryCode>YC</countryCode> <type>AE</type> </taxDetails> <taxDetails> <rate>12.58</rate> <countryCode>US</countryCode> <type>AS</type> </taxDetails> <taxDetails> <rate>3.86</rate> <countryCode>XA</countryCode> <type>CO</type> </taxDetails> <taxDetails> <rate>5.40</rate> <countryCode>XY</countryCode> <type>CR</type> </taxDetails> </taxDetailsListInfo> </taxDetailsInfoGroup> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>1</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>YIF</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>Y</designator> <specialService>Y</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> </passengerTypeInfoGroup> </fareProductInfoGroup> </allFaresInfoGroup> </Fare\_QuoteItineraryReply>

## 5.41.3 Possible Errors

See "Error Messages" section.

* * *

## 5.42 Operation: 154 Passenger discount or passenger type code specified

Passenger Discount code specified

Multiple and Cumulative Passenger discounts

Cryptic : FQP PAR /D15AUG /AAFLON /ABAMAN /ABALON /RADT\*MIL\*CH-MIL\*ZZ

## 5.42.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItinerary xmlns="http://xml.amadeus.com/FITQPQ\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <passengerInfoGroup> <segmentRepetitionControl> <segmentControlDetails> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </segmentRepetitionControl> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeGroup> <fareInfo> <valueQualifier>ADT</valueQualifier> </fareInfo> </passengerTypeGroup> </passengerInfoGroup> <passengerInfoGroup> <segmentRepetitionControl> <segmentControlDetails> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </segmentRepetitionControl> <specificTravellerDetails> <travellerDetails> <referenceNumber>2</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeGroup> <fareInfo> <valueQualifier>MIL</valueQualifier> </fareInfo> </passengerTypeGroup> </passengerInfoGroup> <passengerInfoGroup> <segmentRepetitionControl> <segmentControlDetails> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </segmentRepetitionControl> <specificTravellerDetails> <travellerDetails> <referenceNumber>3</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeGroup> <fareInfo> <valueQualifier>CH</valueQualifier> <fareTypeGrouping> <discountCode>MIL</discountCode> </fareTypeGrouping> </fareInfo> </passengerTypeGroup> </passengerInfoGroup> <passengerInfoGroup> <segmentRepetitionControl> <segmentControlDetails> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </segmentRepetitionControl> <specificTravellerDetails> <travellerDetails> <referenceNumber>4</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeGroup> <fareInfo> <valueQualifier>ZZ</valueQualifier> </fareInfo> </passengerTypeGroup> </passengerInfoGroup> <requestedSegmentInfoGroup> <originAndDestinationDetails></originAndDestinationDetails> <flightSegmentInfoGroup> <travelProductInfo> <flightDate> <departureDate>150808</departureDate> </flightDate> <boardPointDetails> <departureCity>PAR</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>LON</arrivalCity> </offpointDetails> <companyDetails> <marketingCompany>AF</marketingCompany> </companyDetails> </travelProductInfo> </flightSegmentInfoGroup> <flightSegmentInfoGroup> <travelProductInfo> <boardPointDetails> <departureCity>LON</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>MAN</arrivalCity> </offpointDetails> <companyDetails> <marketingCompany>BA</marketingCompany> </companyDetails> </travelProductInfo> </flightSegmentInfoGroup> <flightSegmentInfoGroup> <travelProductInfo> <boardPointDetails> <departureCity>MAN</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>LON</arrivalCity> </offpointDetails> <companyDetails> <marketingCompany>BA</marketingCompany> </companyDetails> </travelProductInfo> </flightSegmentInfoGroup> </requestedSegmentInfoGroup> </Fare\_QuoteItinerary>

## 5.42.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.42.3 Possible Errors

See "Error Messages" section.

* * *

## 5.43 Operation: 161 Zap Off

Zap Off

Cryptic : FQP PAR /D27MAY LON NYC /M /R,ZO-T25A\*AD25.1, ZO-T10P.2-4

## 5.43.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItinerary xmlns="http://xml.amadeus.com/FITQPQ\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <passengerInfoGroup> <segmentRepetitionControl> <segmentControlDetails> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </segmentRepetitionControl> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeGroup> <fareInfo> <valueQualifier>ADT</valueQualifier> </fareInfo> </passengerTypeGroup> </passengerInfoGroup> <requestedSegmentInfoGroup> <originAndDestinationDetails></originAndDestinationDetails> <flightSegmentInfoGroup> <travelProductInfo> <flightDate> <departureDate>270508</departureDate> </flightDate> <boardPointDetails> <departureCity>PAR</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>LON</arrivalCity> </offpointDetails> <flightTypeDetails> <connectionIndicator>U</connectionIndicator> <flightIndicator>ZBP</flightIndicator> </flightTypeDetails> </travelProductInfo> <fareQualifierDetails> <discountDetails> <fareQualifier>T</fareQualifier> <rateCategory>AD25</rateCategory> <amount>25</amount> </discountDetails> </fareQualifierDetails> </flightSegmentInfoGroup> <flightSegmentInfoGroup> <travelProductInfo> <boardPointDetails> <departureCity>LON</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>NYC</arrivalCity> </offpointDetails> </travelProductInfo> <fareQualifierDetails> <discountDetails> <fareQualifier>T</fareQualifier> <percentage>10</percentage> </discountDetails> </fareQualifierDetails> </flightSegmentInfoGroup> <flightSegmentInfoGroup> <travelProductInfo> <boardPointDetails> <departureCity>NYC</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>LON</arrivalCity> </offpointDetails> </travelProductInfo> <fareQualifierDetails> <discountDetails> <fareQualifier>T</fareQualifier> <percentage>10</percentage> </discountDetails> </fareQualifierDetails> </flightSegmentInfoGroup> <flightSegmentInfoGroup> <travelProductInfo> <boardPointDetails> <departureCity>LON</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>PAR</arrivalCity> </offpointDetails> <flightTypeDetails> <connectionIndicator>U</connectionIndicator> <flightIndicator>ZBP</flightIndicator> </flightTypeDetails> </travelProductInfo> <fareQualifierDetails> <discountDetails> <fareQualifier>T</fareQualifier> <percentage>10</percentage> </discountDetails> </fareQualifierDetails> </flightSegmentInfoGroup> </requestedSegmentInfoGroup> </Fare\_QuoteItinerary>

## 5.43.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.43.3 Possible Errors

See "Error Messages" section.

* * *

## 5.44 Operation: 171 Diagnostic tool with stop over and surface sector

Diagnostic tool with **stop over** and **surface sector**

In this example, there are 4 segemnts and 1 surface:

LGA-DEN, DEN-MTJ, SURFACE, GUC-DEN, DEN-LGA

We request the fare information corresponding to:

\- fare basis HUAUP applied on segment 1-2 (Fare component : LGA-UA-DEN-UA-MTJ)

\- fare basis UA0FY applied on segment 4-5 (Fare component : GUC-UA-DEN-UA-LGA)

Cryptic : FQP LGA /AUA /D17AUG /H0813 /CA DEN /AUA /D17AUG /H1115 /CY MTJ --- GUC /AUA /D21AUG /H1026 /CU DEN /AUA /D21AUG /H1339 /CU LGA /R,NYC.NYC,24MAY10 /D S1-2 F-HUAUP, S4-5 F-UA0FY

## 5.44.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItinerary xmlns="http://xml.amadeus.com/FITQPQ\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <conversionRate> <conversionRateDetails> <conversionType>FC</conversionType> <currency>USD</currency> </conversionRateDetails> </conversionRate> <passengerInfoGroup> <segmentRepetitionControl> <segmentControlDetails> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </segmentRepetitionControl> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeGroup> <fareInfo> <valueQualifier>ADT</valueQualifier> </fareInfo> </passengerTypeGroup> </passengerInfoGroup> <pricingTktOptionGroup> <pricingTicketingDetails> <productDateTimeDetails> <departureDate>240510</departureDate> </productDateTimeDetails> <companyDetails> <marketingCompany>UA</marketingCompany> </companyDetails> <locationDetails> <pointOfSaleOverrideCity>NYC</pointOfSaleOverrideCity> </locationDetails> <otherLocationDetails> <pointOfTicketingOverrideCity>NYC</pointOfTicketingOverrideCity> </otherLocationDetails> </pricingTicketingDetails> </pricingTktOptionGroup> <requestedSegmentInfoGroup> <originAndDestinationDetails></originAndDestinationDetails> <flightSegmentInfoGroup> <travelProductInfo> <flightDate> <departureDate>170810</departureDate> <departureTime>0813</departureTime> </flightDate> <boardPointDetails> <departureCity>LGA</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>DEN</arrivalCity> </offpointDetails> <companyDetails> <marketingCompany>UA</marketingCompany> </companyDetails> </travelProductInfo> <fareQualifierDetails> <discountDetails> <fareQualifier>DFB</fareQualifier> <rateCategory>HUAUP</rateCategory> </discountDetails> </fareQualifierDetails> <segmentPricingInfoGroup> <travelItineraryInfo> <itemNumber>1</itemNumber> </travelItineraryInfo> </segmentPricingInfoGroup> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>A</designator> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </flightSegmentInfoGroup> <flightSegmentInfoGroup> <travelProductInfo> <flightDate> <departureDate>170810</departureDate> <departureTime>1115</departureTime> </flightDate> <boardPointDetails> <departureCity>DEN</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>MTJ</arrivalCity> </offpointDetails> <companyDetails> <marketingCompany>UA</marketingCompany> </companyDetails> <flightTypeDetails> <connectionIndicator>V</connectionIndicator> <flightIndicator>DBP</flightIndicator> </flightTypeDetails> </travelProductInfo> <fareQualifierDetails> <discountDetails> <fareQualifier>DFB</fareQualifier> <rateCategory>HUAUP</rateCategory> </discountDetails> </fareQualifierDetails> <segmentPricingInfoGroup> <travelItineraryInfo> <itemNumber>2</itemNumber> </travelItineraryInfo> </segmentPricingInfoGroup> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>Y</designator> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </flightSegmentInfoGroup> <flightSegmentInfoGroup> <travelProductInfo> <flightDate> <departureDate>210810</departureDate> <departureTime>1026</departureTime> </flightDate> <boardPointDetails> <departureCity>GUC</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>DEN</arrivalCity> </offpointDetails> <companyDetails> <marketingCompany>UA</marketingCompany> </companyDetails> </travelProductInfo> <fareQualifierDetails> <discountDetails> <fareQualifier>DFB</fareQualifier> <rateCategory>UA0FY</rateCategory> </discountDetails> </fareQualifierDetails> <segmentPricingInfoGroup> <travelItineraryInfo> <itemNumber>4</itemNumber> </travelItineraryInfo> </segmentPricingInfoGroup> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>U</designator> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </flightSegmentInfoGroup> <flightSegmentInfoGroup> <travelProductInfo> <flightDate> <departureDate>210810</departureDate> <departureTime>1339</departureTime> </flightDate> <boardPointDetails> <departureCity>DEN</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>LGA</arrivalCity> </offpointDetails> <companyDetails> <marketingCompany>UA</marketingCompany> </companyDetails> <flightTypeDetails> <connectionIndicator>V</connectionIndicator> <flightIndicator>DBP</flightIndicator> </flightTypeDetails> </travelProductInfo> <fareQualifierDetails> <discountDetails> <fareQualifier>DFB</fareQualifier> <rateCategory>UA0FY</rateCategory> </discountDetails> </fareQualifierDetails> <segmentPricingInfoGroup> <travelItineraryInfo> <itemNumber>5</itemNumber> </travelItineraryInfo> </segmentPricingInfoGroup> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>U</designator> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </flightSegmentInfoGroup> </requestedSegmentInfoGroup> </Fare\_QuoteItinerary>

## 5.44.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.44.3 Possible Errors

See "Error Messages" section.

* * *

## 5.45 Operation: 180 ZZ tax

Add ZZ tax for Russian market : TCH

## 5.45.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_QuoteItinerary xmlns="http://xml.amadeus.com/FITQPQ\_10\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>741</messageFunction> </messageFunctionDetails> </messageActionDetails> <passengerInfoGroup> <segmentRepetitionControl> <segmentControlDetails> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </segmentRepetitionControl> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </specificTravellerDetails> <passengerTypeGroup> <fareInfo> <valueQualifier>ADT</valueQualifier> </fareInfo> </passengerTypeGroup> </passengerInfoGroup> <optionInfoGroup> <optionInfo> <selectionDetails> <option>TCH</option> <optionInformation>1</optionInformation> </selectionDetails> </optionInfo> </optionInfoGroup> <requestedSegmentInfoGroup> <originAndDestinationDetails></originAndDestinationDetails> <flightSegmentInfoGroup> <travelProductInfo> <flightDate> <departureDate>211210</departureDate> </flightDate> <boardPointDetails> <departureCity>PAR</departureCity> </boardPointDetails> <offpointDetails> <arrivalCity>LON</arrivalCity> </offpointDetails> </travelProductInfo> </flightSegmentInfoGroup> </requestedSegmentInfoGroup> </Fare\_QuoteItinerary>

## 5.45.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.45.3 Possible Errors

See "Error Messages" section.

* * *