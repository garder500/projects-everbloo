---
url: "https://developers.amadeus.com/api-library/soap/functional-doc/663/doc-read/99946?serviceVersion=8.2"
download_url: "https://developers.amadeus.com/PAS-EAS/api/download/comp/4d4ad2cb456c02633f463a055ab70584/99946/UG_WBS_Fare_DisplayTicketImage_FITQQQ_08.2_009/UG_WBS_Fare_DisplayTicketImage_FITQQQ_08.2_009.html"
title: "UG_WBS_Fare_DisplayTicketImage_FITQQQ_08.2_009"
source: "amadeus"
service_id: "663"
service_name: "Fare_DisplayTicketImage"
version: "8.2"
document_id: "99946"
doc_version: "8.2"
doc_type: "User guide"
file_format: "HTML"
scraped_at: "2026-07-15T10:22:15.233Z"
---
# Function: Fare\_DisplayTicketImage

* * *

## 1 Overview

The DisplayTicket Image provides structured information from pricing results. The DisplayTicket Image must follow a fare pricing / fare best pricing.  
  
Providedinformation corresponds to what is displayed by the cryptic transaction FQQ.

## 1.1 Supported Operations

Fareproduct number

## 1.2 Limitations

Not applicable

## 1.3 Unsupported Operations

Not applicable

## 1.4 Prerequisites

Not applicable

## 2 Building A Query

The query must refer the reference fare product number to the list of fare products (farecombinations) of the previous pricing result. (**_pricingTicketingSubsequent/itemNumber =the fare product reference number)_**

**Functional data in the request**

**MaxRep**

**Type**

**Xml elements**

1-Message function

749 : Itinerary pricing - Ticketing information display

3an

messageActionDetails/

messageFunctionDetails/

messageFunction

2-Product reference

1

1-3an

pricingTicketingSubsequent/

itemNumber

## 3 Receiving A Reply

The reply sends detailed informationof the chosen fare product as

-   Repeated full priced itinerary
-   Currencydetails (currencies and used conversion rates between NUC, currency of originand currency of sale)
-   Passenger information as the priced discount
-   Tax and PFC details
-   The fare calculation line in informative text (same as in cryptic FQQ)
-   Baggage allowance
-   Priced fare basis and ticket designator per segment
-   Transporting and booking class per segment
-   Appended, penalty and informative text messages
-   Corporate and Unifare information for priced fare product

**Functional data in the reply**

**MaxRep**

**Type**

**Xml elements**

**Message function**

749 : Itinerary pricing - Ticket information display

3an

messageActionDetails/

messageFunctionDetails/

messageFunction

**Display Ticket Image reply**

1

**allFaresInfoGroup**

**I - Currency conversion information**

3

**involvedCurrenciesInfo/**

**conversionRateDetails**

I.1 - Qualifier

\- selling currency : 707

\- soft currency : 706

\- origin currency : 705

3an

conversionType

I.2 - Currency

3an

currency

I.3 - Rate type

\- BSR : rate used to convert currency of Origin into the currency of sale

3an

rateType

I.4 - Conversion rate

1-18n

conversionRate

**II - General pricing/ticketing information**

1

**ticketingInfoGroup/**

**pricingTicketingDetails**

II.1 - International trip indicator

International itinerary : I

1an

priceTicketDetails/

indicators

II.2 - Selling city

3an

ticketingLocationDetails/

city

II.3 - Selling country

2an

ticketingLocationDetails/

country

**III - Flight information**

16

**flightInfoGroup**

III.1 - Departure point

3an

involvedFlightInfo/

boardPointDetails/

trueLocationId

III.2 -Arrival point

3an

involvedFlightInfo/

offpointDetails/

trueLocationId

III.3 - Marketing carrier

2an

involvedFlightInfo/

companyDetails/

marketingCompany

III.4 - Flight number

1-4n

involvedFlightInfo/

flightIdentification/

flightNumber

III.5 - Departure date (DDMMYY)

6n

involvedFlightInfo/

flightDate/

departureDate

III.6 - Departure time (HHMM)

4n

involvedFlightInfo/

flightDate/

departureTime

III.7 - TPM

1

additionalFlightInfo/

mileageTimeDetails

\-Qualifier (M: Miles)

1an

flightLegMileage

\-Value

1-18n

unitQualifier

III.8 - Segment number

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

\-Passenger first reference

1-2n

referenceNumber

\-Passenger number

1-2n

measurementValue

\-PTC & Discounts

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

RA:ATPCO nego fares - CAT35

RB:ATPCO nego corporate fares

RC:Amadeus Nego Corporate Fares

RD:Dynamic Discounted Fares

RN:Amadeus Nego Fares

RP:Published fares

RV:ATPCO private fares - CAT15

RX:Corporate ATPCO private fares - CAT15

RZ:Corporate Dynamic Discounted Fares

\-Restrictions indicators

RBR:Reservation booking designator restrictions

RER:Reservations conditions

ROR:Booking Designator Override

SRR:Sale Restrictions

FLR:Flight number restrictions

FQR:Frequency restrictions

\-OB fees indicators

OBI:Ticketing fees have been included

OBV:Any change of pricing context impacts OB fees

VR:Vendor restriction

\-Electronic ticket indicator

e-ticket not allowed: 718

e-ticket requested: 717

\-last date to ticket info

40: LAST TKT DTE - SEE ADV PURCHASE

41: LAST TKT DTE - DATE OF ORIGIN

42: NO TKT RSTNS THRU - SEE ADV PURCHASE

43: LAST TKT DTE - FARE DISC THIS DATE

44: LAST TKT DTE - SEE SALES RSTNS

45: LAST TKT DTE

46: CHECK RULE FOR LAST TKT DATE

20

2-3an

priceTicketDetails/

indicators

\-last date to ticket info (DDMMYY)

6n

productDateAndTimeDetails/

departureDate

\-reservation time (HHMM)

4n

productDateAndTimeDetails/

departureTime

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

**IV.7 - Penalty information**

1

passengerTypeInfoGroup/

penaltyInfo/

discountPenaltyDetails

\-Penalty status

702 TICKETS ARE NON-REFUNDABLE

703 TICKETS ARE NON REFUNDABLE AFTER DEPARTURE

704 PENALTY APPLIES with penalty amount

Or PERCENT PENALTY APPLIES with penalty percentage

Or PENALTY APPLIES - CHECK RULES without any amount or percentage specified

705 SUBJ TO CANCELLATION/CHANGE PENALTY

706 TICKETS ARE NON REFUNDABLE BEFORE DEPARTURE

742 ADDL PENALTY INFO EXISTS - SEE INDIVIDUAL FARES/RULES DPLY

3an

function

\-Penalty amount/percentage

1-18n

amount

\-Penalty amount or percentage indicator

707 : amount

708 : percentage

3an

amountType

\-Penalty currency

3an

currency

**IV.8 - Interactive Free text**

99

passengerTypeInfoGroup/

interactiveFreeText/

freeTextQualification

\-Message qualifier

4 : Literal text

1an

textSubjectQualifier

\-Message function

Appended message : 13

Endorsement message : 10

Payment message : 36

Pricing/tkt warning message : 33

Attention message : 701

Fare calculation message : 15

2-3an

informationType

\-Free Text

99

70an

freeText

**IV.9 - Taxes information**

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

**IV.10 - ZP & PFC Taxes information**

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

**IV.11 - Segment information**

16

IV.11.a - General info

1

passengerTypeInfoGroup/

fareSegmentInfo/

segmentDescriptionInfo

\-Segment number

No segment number in case of  surface not included

1-3n

segmentItemNumber

\-Indicator

X: Connection at destination

ST : Segment within side trip

BP : Fare breakpoint at destination

SI: Included surface segment

SN : Not included surface segment

1-2an

productTypeDetails/

flightIndicator

IV.11.b - Fare information

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

IV.11.c - Booking information

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

IV.11.d - Excess baggage details

1

passengerTypeInfoGroup/

excessBaggageInfo/

baggageDetails

\-Quantity

1-5n

freeAllowance

\-Unit qualifier

N: pieces

700: Kilos

1-3an

quantityCode

IV.11.e - Validity dates

2

passengerTypeInfoGroup/

dateAndTimeInfo/

dateAndTimeDetails

\-Date qualifier

B : Not valid before

A : Not valid after

1a

qualifier

\-Date (DDMMAA)

6n

date

IV.11.f - Ratio information (for national fares)

1

passengerTypeInfoGroup/

fareCalcSegmentInfo/

monetaryInfo

\-fare coupon value

1-12n

monetaryDetails/

amount

\-fare coupon value qualifier

FCR : Fare calculation ratio

3an

monetaryDetails/

typeQualifier

IV.11.g - Fare calculation information

9

passengerTypeInfoGroup/

fareCalcSegmentInfo

\-Qualifier

741 : stopover charge

742 : q-surcharge

3an

fareCalculationCodeDetails/

chargeCategory

\-Amount

1-11n

fareCalculationCodeDetails/

amount

IV.11.h - Mileage exception qualifier

9

passengerTypeInfoGroup/

fareCalcSegmentInfo

\-Qualifier

718 Extra Mileage (E)

737 Reduced Mileage (L)

743 Mileage Ticketing Point (T)

3an

fareCalculationCodeDetails/

chargeCategory

**IV.12 - Fee breakdown**

5

passengerTypeInfoGroup/

feeBreakdownGroup

IV.12.a - General fee type

OA : Booking fees

OB : Ticketing fees

OC : Service fees

2an

feeTypeInfo/

carrierFeeDetails/

type

IV.12.b - Indicator

EX:All fee exempted indicator

2an

feeTypeInfo/

carrierFeeDetails/

status

IV.12.c - Fee details

99

feeDetailsInfoGroup/

feeInfo

\-Subtype

1-3an

feeInfo/

dataTypeInformation/

subType

\-Status

IN manually included

EX manually exempted

2an

feeInfo/

dataTypeInformation/

status

\-Fee indicators

NRF not refundable

NRI not re-issuable

RWR re-issuable with restrictions

NCM not commissionable

NIS no interline settlement allowed

(default is refundable, re-issuable, commissionable and interline settlement allowed)

9

3an

feeInfo/

dataTypeInformation/

dataInformation/

indicator

IV.12.d - Amounts

9

amountsInfo/

monetaryDetails

\-Amount

1-12n

amount

\-Qualifier (with/without VAT/Total tax)

3an

typeQualifier

\-Currency

3an

currency

IV.12.e - Form of payment

1

2-3an

formOfPaymentInfo/

formOfPayment/

type

IV.12.f - Tax details

1

taxesDetailsInfo/

taxDetails

Nature code

2an

type

Amount (in selling currency by default)

1-12n

rate

IV.12.g - Commercial description & IATA indicators

1

descriptionInfo/

\- Qualifier = 3

1an

freeTextQualification/

textSubjectQualifier

\- Information type = COM

3an

freeTextQualification/

informationType

\- Description

1-70an

freeText

**IV.13 - Ticketing Negotiated information**

1

ticketingAddInfoGroup/

\-Net reporting indicator : “R”

1an

pricingTicketingSubsequent/

priceType

\-Tour code

1-35an

tourCodeInformation/

tourInformationDetails

tourCode

\-Value code/ CAR code information

1

carValueCodeInformation/

referenceDetails

Qualifier

CVC : Car/Value Code

3an

type

Value code/ CAR code

1-35an

value

**IV.14 - Possible validating carriers**

1

ticketingAddInfoGroup

a. Possible validating carrier indicator

PVC : Possible validating carriers

3an

pricingTicketingSubsequent/

priceType

b. Possible validating carriers

9

validatingCxr

       Carrier code

2an

companyIdentification/

marketingCompany

## 4 Error Messages

Example of reject with invalid line number

## 4.1 Error Reply

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_DisplayTicketImageReply xmlns="http://xml.amadeus.com/FITQQR\_08\_2\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>749</messageFunction> </messageFunctionDetails> </messageActionDetails> <errorInfoGroup> <rejectErrorCode> <errorDetails> <errorCode>0</errorCode> </errorDetails> </rejectErrorCode> <errorFreeText> <freeText>CHECK SEQUENCE NUMBER</freeText> </errorFreeText> </errorInfoGroup> </Fare\_DisplayTicketImageReply>

  

* * *

## 5 Operations

## 5.1 Operation: 01 An Example Use of Interface

View the display ticket image for the fare on line 4.

## 5.1.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_DisplayTicketImage xmlns="http://xml.amadeus.com/FITQQQ\_08\_2\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>749</messageFunction> </messageFunctionDetails> </messageActionDetails> <pricingTicketingSubsequent> <itemNumber>4</itemNumber> </pricingTicketingSubsequent> </Fare\_DisplayTicketImage>

## 5.1.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.1.3 Possible Errors

* * *

## 5.2 Operation: 02 Origin and Destination City

Currencyconversion information : selling currency EUR, origin currency EUR  
Generalpricing/ticketing information : international itinerary, selling country FR  
Flight information: 1 segment, departure date 210608, from PAR to LON with YY airline  
  
Productinformation :  
General information : product reference 1,  
Passengers' information : 1 passenger,  
Pricing/Ticketing information : Published fares (RP),Reservation booking designatorrestrictions (RBR)  
Corporate information (N/A)  
Currency information : conversion type 700, currency NUC, amount716.01, rate 0.681549  
Monetary information : base fares 488.00, total taxes 34.45,ticket document amount 522.45  
Penalty information (N/A)  
Free text information : 1 coded and literal text  
"21JUN08PAR YYLON716.01NUC716.01END ROE0.681549 "  
Taxes information : 4 taxes  
Tax amount 10.90, code QX, type AP  
Tax amount 10.00, code IZ, type EB  
Tax amount 3.92, code FR, type SE  
Tax amount 9.63, code FR, type TI  
Segment information : one segment  
Segment number 1, fare basis YIF, excessbaggage 30 Kilos (700),  
booking code C, class of services C.  
Fee breakdown (N/A)  
Ticketing negotiated information (N/A)

## 5.2.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.2.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_DisplayTicketImageReply xmlns="http://xml.amadeus.com/FITQQR\_08\_2\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>749</messageFunction> </messageFunctionDetails> </messageActionDetails> <allFaresInfoGroup> <markerAllFares> </markerAllFares> <involvedCurrenciesInfo> <conversionRateDetails> <conversionType>707</conversionType> <currency>EUR</currency> </conversionRateDetails> <conversionRateDetails> <conversionType>705</conversionType> <currency>EUR</currency> </conversionRateDetails> </involvedCurrenciesInfo> <ticketingInfoGroup> <pricingTicketingDetails> <priceTicketDetails> <indicators>I</indicators> </priceTicketDetails> <ticketingLocationDetails> <country>FR</country> </ticketingLocationDetails> </pricingTicketingDetails> </ticketingInfoGroup> <flightInfoGroup> <involvedFlightInfo> <flightDate> <departureDate>210608</departureDate> </flightDate> <boardPointDetails> <trueLocationId>PAR</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>LON</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>YY</marketingCompany> </companyDetails> </involvedFlightInfo> <itineraryInfoGroup> <travelItineraryInfo> <segmentItemNumber>1</segmentItemNumber> </travelItineraryInfo> </itineraryInfoGroup> </flightInfoGroup> <fareProductInfoGroup> <generalAndIdInfo> <segmentControlDetails> <productReference>1</productReference> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </generalAndIdInfo> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> <measurementValue>1</measurementValue> </travellerDetails> </specificTravellerDetails> <passengerTypeInfoGroup> <fareInfo> <fareTypeGrouping> <aggregatePTCDiscount>ADT</aggregatePTCDiscount> </fareTypeGrouping> </fareInfo> <pricingticketingDetails> <priceTicketDetails> <indicators>RP</indicators> <indicators>RBR</indicators> </priceTicketDetails> </pricingticketingDetails> <conversionRate> <conversionRateDetails> <conversionType>700</conversionType> <currency>NUC</currency> <rateType>ROE</rateType> <pricingAmount>716.01</pricingAmount> <conversionRate>0.681549</conversionRate> </conversionRateDetails> </conversionRate> <monetaryInfo> <monetaryDetails> <typeQualifier>B</typeQualifier> <amount>488.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>T</typeQualifier> <amount>522.45</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>TX</typeQualifier> <amount>34.45</amount> </monetaryDetails> </monetaryInfo> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> <informationType>15</informationType> </freeTextQualification> <freeText>21JUN08PAR YY LON716.01NUC716.01END ROE0.681549</freeText> </interactiveFreeText> <taxDetailsInfoGroup> <taxDetailsListInfo> <taxDetails> <rate>10.90</rate> <countryCode>QX</countryCode> <type>AP</type> </taxDetails> <taxDetails> <rate>10.00</rate> <countryCode>IZ</countryCode> <type>EB</type> </taxDetails> <taxDetails> <rate>3.92</rate> <countryCode>FR</countryCode> <type>SE</type> </taxDetails> <taxDetails> <rate>9.63</rate> <countryCode>FR</countryCode> <type>TI</type> </taxDetails> </taxDetailsListInfo> </taxDetailsInfoGroup> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>1</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>C</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <excessBaggageInfo> <baggageDetails> <freeAllowance>30</freeAllowance> <quantityCode>700</quantityCode> </baggageDetails> </excessBaggageInfo> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>C</designator> <specialService>C</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> </passengerTypeInfoGroup> </fareProductInfoGroup> </allFaresInfoGroup> </Fare\_DisplayTicketImageReply>

## 5.2.3 Possible Errors

* * *

## 5.3 Operation: 03 Past travel and validating date / Point of sale override

FQQ1 after FQPCHI/D21JUN/AUAMAD/R,NYC,01MAR08

## 5.3.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.3.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_DisplayTicketImageReply xmlns="http://xml.amadeus.com/FITQQR\_08\_2\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>749</messageFunction> </messageFunctionDetails> </messageActionDetails> <allFaresInfoGroup> <markerAllFares> </markerAllFares> <involvedCurrenciesInfo> <conversionRateDetails> <conversionType>707</conversionType> <currency>USD</currency> </conversionRateDetails> <conversionRateDetails> <conversionType>705</conversionType> <currency>USD</currency> </conversionRateDetails> </involvedCurrenciesInfo> <ticketingInfoGroup> <pricingTicketingDetails> <priceTicketDetails> <indicators>I</indicators> </priceTicketDetails> <ticketingLocationDetails> <country>US</country> </ticketingLocationDetails> </pricingTicketingDetails> </ticketingInfoGroup> <flightInfoGroup> <involvedFlightInfo> <flightDate> <departureDate>210608</departureDate> </flightDate> <boardPointDetails> <trueLocationId>CHI</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>MAD</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>UA</marketingCompany> </companyDetails> </involvedFlightInfo> <itineraryInfoGroup> <travelItineraryInfo> <segmentItemNumber>1</segmentItemNumber> </travelItineraryInfo> </itineraryInfoGroup> </flightInfoGroup> <fareProductInfoGroup> <generalAndIdInfo> <segmentControlDetails> <productReference>1</productReference> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </generalAndIdInfo> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> <measurementValue>1</measurementValue> </travellerDetails> </specificTravellerDetails> <passengerTypeInfoGroup> <fareInfo> <fareTypeGrouping> <aggregatePTCDiscount>ADT</aggregatePTCDiscount> </fareTypeGrouping> </fareInfo> <pricingticketingDetails> <priceTicketDetails> <indicators>RP</indicators> <indicators>RBR</indicators> </priceTicketDetails> </pricingticketingDetails> <conversionRate> <conversionRateDetails> <conversionType>700</conversionType> <currency>NUC</currency> <rateType>ROE</rateType> <pricingAmount>6952.00</pricingAmount> <conversionRate>1.000000</conversionRate> </conversionRateDetails> </conversionRate> <monetaryInfo> <monetaryDetails> <typeQualifier>B</typeQualifier> <amount>6952.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>T</typeQualifier> <amount>7074.90</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>TX</typeQualifier> <amount>122.90</amount> </monetaryDetails> </monetaryInfo> <discountAndPenaltyInfo> <discountPenaltyDetails> <function>705</function> </discountPenaltyDetails> </discountAndPenaltyInfo> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>4</textSubjectQualifier> <informationType>13</informationType> </freeTextQualification> <freeText>PRICING OVERRIDE USED V</freeText> </interactiveFreeText> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>4</textSubjectQualifier> <informationType>13</informationType> </freeTextQualification> <freeText>PRICED WITH VALIDATING CARRIER UA - REPRICE IF DIFFERENT VC</freeText> </interactiveFreeText> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> <informationType>15</informationType> </freeTextQualification> <freeText>21JUN08CHI UA MAD6952.00NUC6952.00END ROE1.000000</freeText> </interactiveFreeText> <taxDetailsInfoGroup> <taxDetailsListInfo> <taxDetails> <rate>105.00</rate> <countryCode>YQ</countryCode> <type>AC</type> </taxDetails> <taxDetails> <rate>15.40</rate> <countryCode>US</countryCode> <type>AP</type> </taxDetails> <taxDetails> <rate>2.50</rate> <countryCode>AY</countryCode> <type>SE</type> </taxDetails> </taxDetailsListInfo> </taxDetailsInfoGroup> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>1</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>F</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <excessBaggageInfo> <baggageDetails> <freeAllowance>1</freeAllowance> <quantityCode>N</quantityCode> </baggageDetails> </excessBaggageInfo> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>F</designator> <specialService>F</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> <ticketingAddInfoGroup> <pricingTicketingSubsequent> <priceType>PVC</priceType> </pricingTicketingSubsequent> <validatingCxr> <companyIdentification> <marketingCompany>UA</marketingCompany> </companyIdentification> </validatingCxr> </ticketingAddInfoGroup> </passengerTypeInfoGroup> </fareProductInfoGroup> </allFaresInfoGroup> </Fare\_DisplayTicketImageReply>

## 5.3.3 Possible Errors

* * *

## 5.4 Operation: 04 Price in a foreign Currency

FQQ2 after FQPRIO/D21JUN/AIBMADBCN/R,FC-USD

## 5.4.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.4.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_DisplayTicketImageReply xmlns="http://xml.amadeus.com/FITQQR\_08\_2\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>749</messageFunction> </messageFunctionDetails> </messageActionDetails> <allFaresInfoGroup> <markerAllFares> </markerAllFares> <involvedCurrenciesInfo> <conversionRateDetails> <conversionType>707</conversionType> <currency>USD</currency> </conversionRateDetails> <conversionRateDetails> <conversionType>705</conversionType> <currency>USD</currency> </conversionRateDetails> </involvedCurrenciesInfo> <ticketingInfoGroup> <pricingTicketingDetails> <priceTicketDetails> <indicators>I</indicators> </priceTicketDetails> <ticketingLocationDetails> <country>FR</country> </ticketingLocationDetails> </pricingTicketingDetails> </ticketingInfoGroup> <flightInfoGroup> <involvedFlightInfo> <flightDate> <departureDate>210608</departureDate> </flightDate> <boardPointDetails> <trueLocationId>RIO</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>MAD</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>IB</marketingCompany> </companyDetails> </involvedFlightInfo> <itineraryInfoGroup> <travelItineraryInfo> <segmentItemNumber>1</segmentItemNumber> </travelItineraryInfo> </itineraryInfoGroup> </flightInfoGroup> <flightInfoGroup> <involvedFlightInfo> <boardPointDetails> <trueLocationId>MAD</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>BCN</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>IB</marketingCompany> </companyDetails> </involvedFlightInfo> <itineraryInfoGroup> <travelItineraryInfo> <segmentItemNumber>2</segmentItemNumber> </travelItineraryInfo> </itineraryInfoGroup> </flightInfoGroup> <fareProductInfoGroup> <generalAndIdInfo> <segmentControlDetails> <productReference>2</productReference> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </generalAndIdInfo> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> <measurementValue>1</measurementValue> </travellerDetails> </specificTravellerDetails> <passengerTypeInfoGroup> <fareInfo> <fareTypeGrouping> <aggregatePTCDiscount>ADT</aggregatePTCDiscount> </fareTypeGrouping> </fareInfo> <pricingticketingDetails> <priceTicketDetails> <indicators>RP</indicators> <indicators>RBR</indicators> </priceTicketDetails> </pricingticketingDetails> <conversionRate> <conversionRateDetails> <conversionType>700</conversionType> <currency>NUC</currency> <rateType>ROE</rateType> <pricingAmount>2452.00</pricingAmount> <conversionRate>1.000000</conversionRate> </conversionRateDetails> </conversionRate> <monetaryInfo> <monetaryDetails> <typeQualifier>B</typeQualifier> <amount>2452.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>T</typeQualifier> <amount>2535.37</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>TX</typeQualifier> <amount>83.37</amount> </monetaryDetails> </monetaryInfo> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>4</textSubjectQualifier> <informationType>13</informationType> </freeTextQualification> <freeText>PRICED WITH VALIDATING CARRIER IB - REPRICE IF DIFFERENT VC</freeText> </interactiveFreeText> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> <informationType>15</informationType> </freeTextQualification> <freeText>21JUN08RIO IB MAD IB BCN M2452.00NUC2452.00END ROE1.000000</freeText> </interactiveFreeText> <taxDetailsInfoGroup> <taxDetailsListInfo> <taxDetails> <rate>38.00</rate> <countryCode>YQ</countryCode> <type>AC</type> </taxDetails> <taxDetails> <rate>36.00</rate> <countryCode>BR</countryCode> <type>EB</type> </taxDetails> <taxDetails> <rate>7.00</rate> <countryCode>JD</countryCode> <type>AE</type> </taxDetails> <taxDetails> <rate>2.37</rate> <countryCode>QV</countryCode> <type>DP</type> </taxDetails> </taxDetailsListInfo> </taxDetailsInfoGroup> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>1</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>JOW2</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <excessBaggageInfo> <baggageDetails> <freeAllowance>1</freeAllowance> <quantityCode>N</quantityCode> </baggageDetails> </excessBaggageInfo> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>J</designator> <specialService>J</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>2</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>JOW2</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <excessBaggageInfo> <baggageDetails> <freeAllowance>1</freeAllowance> <quantityCode>N</quantityCode> </baggageDetails> </excessBaggageInfo> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>C</designator> <specialService>C</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> <ticketingAddInfoGroup> <pricingTicketingSubsequent> <priceType>PVC</priceType> </pricingTicketingSubsequent> <validatingCxr> <companyIdentification> <marketingCompany>IB</marketingCompany> </companyIdentification> </validatingCxr> </ticketingAddInfoGroup> </passengerTypeInfoGroup> </fareProductInfoGroup> </allFaresInfoGroup> </Fare\_DisplayTicketImageReply>

## 5.4.3 Possible Errors

* * *

## 5.5 Operation: 05 Tax and Surcharge options - Tax exemption option: All Taxes

FQQ1 after FQP LON /D17AUG NYC /R,ET

## 5.5.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.5.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_DisplayTicketImageReply xmlns="http://xml.amadeus.com/FITQQR\_08\_2\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>749</messageFunction> </messageFunctionDetails> </messageActionDetails> <allFaresInfoGroup> <markerAllFares> </markerAllFares> <involvedCurrenciesInfo> <conversionRateDetails> <conversionType>707</conversionType> <currency>EUR</currency> </conversionRateDetails> <conversionRateDetails> <rateType>BSR</rateType> <conversionRate>1.343183</conversionRate> </conversionRateDetails> <conversionRateDetails> <conversionType>705</conversionType> <currency>GBP</currency> </conversionRateDetails> </involvedCurrenciesInfo> <ticketingInfoGroup> <pricingTicketingDetails> <priceTicketDetails> <indicators>I</indicators> </priceTicketDetails> <ticketingLocationDetails> <country>FR</country> </ticketingLocationDetails> </pricingTicketingDetails> </ticketingInfoGroup> <flightInfoGroup> <involvedFlightInfo> <flightDate> <departureDate>170808</departureDate> </flightDate> <boardPointDetails> <trueLocationId>LON</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>NYC</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>YY</marketingCompany> </companyDetails> </involvedFlightInfo> <itineraryInfoGroup> <travelItineraryInfo> <segmentItemNumber>1</segmentItemNumber> </travelItineraryInfo> </itineraryInfoGroup> </flightInfoGroup> <fareProductInfoGroup> <generalAndIdInfo> <segmentControlDetails> <productReference>1</productReference> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </generalAndIdInfo> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> <measurementValue>1</measurementValue> </travellerDetails> </specificTravellerDetails> <passengerTypeInfoGroup> <fareInfo> <fareTypeGrouping> <aggregatePTCDiscount>ADT</aggregatePTCDiscount> </fareTypeGrouping> </fareInfo> <pricingticketingDetails> <priceTicketDetails> <indicators>RP</indicators> <indicators>RBR</indicators> <indicators>TEX</indicators> </priceTicketDetails> </pricingticketingDetails> <conversionRate> <conversionRateDetails> <conversionType>700</conversionType> <currency>NUC</currency> <rateType>ROE</rateType> <pricingAmount>9871.74</pricingAmount> <conversionRate>0.490187</conversionRate> </conversionRateDetails> </conversionRate> <monetaryInfo> <monetaryDetails> <typeQualifier>B</typeQualifier> <amount>4839.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>E</typeQualifier> <amount>6500.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>T</typeQualifier> <amount>6500.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>TX</typeQualifier> <amount>0.00</amount> </monetaryDetails> </monetaryInfo> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> <informationType>15</informationType> </freeTextQualification> <freeText>17AUG08LON YY NYC9871.74NUC9871.74END ROE0.490187</freeText> </interactiveFreeText> <taxDetailsInfoGroup> <taxDetailsListInfo> <taxDetails> <countryCode>GB</countryCode> <type>AD</type> <indicator>E</indicator> </taxDetails> <taxDetails> <countryCode>YC</countryCode> <type>AE</type> <indicator>E</indicator> </taxDetails> <taxDetails> <countryCode>US</countryCode> <type>AS</type> <indicator>E</indicator> </taxDetails> <taxDetails> <countryCode>XA</countryCode> <type>CO</type> <indicator>E</indicator> </taxDetails> <taxDetails> <countryCode>XY</countryCode> <type>CR</type> <indicator>E</indicator> </taxDetails> </taxDetailsListInfo> </taxDetailsInfoGroup> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>1</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>F</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <excessBaggageInfo> <baggageDetails> <freeAllowance>1</freeAllowance> <quantityCode>N</quantityCode> </baggageDetails> </excessBaggageInfo> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>F</designator> <specialService>F</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> </passengerTypeInfoGroup> </fareProductInfoGroup> </allFaresInfoGroup> </Fare\_DisplayTicketImageReply>

## 5.5.3 Possible Errors

* * *

## 5.6 Operation: 06 Tax and Surcharge options - Add one Tax and Remove two others

FQQ1 after FQP LON /D19AUG NYC /R,AT-USLO,ET-BG-USAS

## 5.6.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.6.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_DisplayTicketImageReply xmlns="http://xml.amadeus.com/FITQQR\_08\_2\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>749</messageFunction> </messageFunctionDetails> </messageActionDetails> <allFaresInfoGroup> <markerAllFares> </markerAllFares> <involvedCurrenciesInfo> <conversionRateDetails> <conversionType>707</conversionType> <currency>EUR</currency> </conversionRateDetails> <conversionRateDetails> <rateType>BSR</rateType> <conversionRate>1.343183</conversionRate> </conversionRateDetails> <conversionRateDetails> <conversionType>705</conversionType> <currency>GBP</currency> </conversionRateDetails> </involvedCurrenciesInfo> <ticketingInfoGroup> <pricingTicketingDetails> <priceTicketDetails> <indicators>I</indicators> </priceTicketDetails> <ticketingLocationDetails> <country>FR</country> </ticketingLocationDetails> </pricingTicketingDetails> </ticketingInfoGroup> <flightInfoGroup> <involvedFlightInfo> <flightDate> <departureDate>190808</departureDate> </flightDate> <boardPointDetails> <trueLocationId>LON</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>NYC</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>YY</marketingCompany> </companyDetails> </involvedFlightInfo> <itineraryInfoGroup> <travelItineraryInfo> <segmentItemNumber>1</segmentItemNumber> </travelItineraryInfo> </itineraryInfoGroup> </flightInfoGroup> <fareProductInfoGroup> <generalAndIdInfo> <segmentControlDetails> <productReference>1</productReference> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </generalAndIdInfo> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> <measurementValue>1</measurementValue> </travellerDetails> </specificTravellerDetails> <passengerTypeInfoGroup> <fareInfo> <fareTypeGrouping> <aggregatePTCDiscount>ADT</aggregatePTCDiscount> </fareTypeGrouping> </fareInfo> <pricingticketingDetails> <priceTicketDetails> <indicators>RP</indicators> <indicators>RBR</indicators> </priceTicketDetails> </pricingticketingDetails> <conversionRate> <conversionRateDetails> <conversionType>700</conversionType> <currency>NUC</currency> <rateType>ROE</rateType> <pricingAmount>9871.74</pricingAmount> <conversionRate>0.490187</conversionRate> </conversionRateDetails> </conversionRate> <monetaryInfo> <monetaryDetails> <typeQualifier>B</typeQualifier> <amount>4839.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>E</typeQualifier> <amount>6500.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>T</typeQualifier> <amount>6619.35</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>TX</typeQualifier> <amount>119.35</amount> </monetaryDetails> </monetaryInfo> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>4</textSubjectQualifier> <informationType>13</informationType> </freeTextQualification> <freeText>MANUAL MANIPULATION OF TAXES \*4\*</freeText> </interactiveFreeText> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> <informationType>15</informationType> </freeTextQualification> <freeText>19AUG08LON YY NYC9871.74NUC9871.74END ROE0.490187</freeText> </interactiveFreeText> <taxDetailsInfoGroup> <taxDetailsListInfo> <taxDetails> <rate>107.45</rate> <countryCode>GB</countryCode> <type>AD</type> </taxDetails> <taxDetails> <rate>3.74</rate> <countryCode>YC</countryCode> <type>AE</type> </taxDetails> <taxDetails> <countryCode>US</countryCode> <type>AS</type> <indicator>E</indicator> </taxDetails> <taxDetails> <rate>3.40</rate> <countryCode>XA</countryCode> <type>CO</type> </taxDetails> <taxDetails> <rate>4.76</rate> <countryCode>XY</countryCode> <type>CR</type> </taxDetails> </taxDetailsListInfo> </taxDetailsInfoGroup> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>1</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>F</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <excessBaggageInfo> <baggageDetails> <freeAllowance>1</freeAllowance> <quantityCode>N</quantityCode> </baggageDetails> </excessBaggageInfo> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>F</designator> <specialService>F</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> </passengerTypeInfoGroup> </fareProductInfoGroup> </allFaresInfoGroup> </Fare\_DisplayTicketImageReply>

## 5.6.3 Possible Errors

* * *

## 5.7 Operation: 07 Nego and Unifares options - Unifares Public fares request

FQQ3 after FQP PAR /D26OCT /AAF LON /R,UP

## 5.7.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.7.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_DisplayTicketImageReply xmlns="http://xml.amadeus.com/FITQQR\_08\_2\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>749</messageFunction> </messageFunctionDetails> </messageActionDetails> <allFaresInfoGroup> <markerAllFares> </markerAllFares> <involvedCurrenciesInfo> <conversionRateDetails> <conversionType>707</conversionType> <currency>EUR</currency> </conversionRateDetails> <conversionRateDetails> <conversionType>705</conversionType> <currency>EUR</currency> </conversionRateDetails> </involvedCurrenciesInfo> <ticketingInfoGroup> <pricingTicketingDetails> <priceTicketDetails> <indicators>I</indicators> </priceTicketDetails> <ticketingLocationDetails> <country>FR</country> </ticketingLocationDetails> </pricingTicketingDetails> </ticketingInfoGroup> <flightInfoGroup> <involvedFlightInfo> <flightDate> <departureDate>261008</departureDate> </flightDate> <boardPointDetails> <trueLocationId>PAR</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>LON</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>AF</marketingCompany> </companyDetails> </involvedFlightInfo> <itineraryInfoGroup> <travelItineraryInfo> <segmentItemNumber>1</segmentItemNumber> </travelItineraryInfo> </itineraryInfoGroup> </flightInfoGroup> <fareProductInfoGroup> <generalAndIdInfo> <segmentControlDetails> <productReference>1</productReference> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </generalAndIdInfo> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> <measurementValue>1</measurementValue> </travellerDetails> </specificTravellerDetails> <passengerTypeInfoGroup> <fareInfo> <fareTypeGrouping> <aggregatePTCDiscount>ADT</aggregatePTCDiscount> </fareTypeGrouping> </fareInfo> <pricingticketingDetails> <priceTicketDetails> <indicators>RA</indicators> <indicators>RBR</indicators> </priceTicketDetails> </pricingticketingDetails> <conversionRate> <conversionRateDetails> <conversionType>700</conversionType> <currency>NUC</currency> <rateType>ROE</rateType> <pricingAmount>1467.24</pricingAmount> <conversionRate>0.681549</conversionRate> </conversionRateDetails> </conversionRate> <monetaryInfo> <monetaryDetails> <typeQualifier>B</typeQualifier> <amount>1000.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>T</typeQualifier> <amount>1047.45</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>TX</typeQualifier> <amount>47.45</amount> </monetaryDetails> </monetaryInfo> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>4</textSubjectQualifier> <informationType>13</informationType> </freeTextQualification> <freeText>AIRLINE NEGOTIATED V2 FARES USED \*Y\*</freeText> </interactiveFreeText> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>4</textSubjectQualifier> <informationType>13</informationType> </freeTextQualification> <freeText>PRICED WITH VALIDATING CARRIER AF - REPRICE IF DIFFERENT VC</freeText> </interactiveFreeText> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> <informationType>15</informationType> </freeTextQualification> <freeText>26OCT08PAR AF LON1467.24NUC1467.24END ROE0.681549</freeText> </interactiveFreeText> <taxDetailsInfoGroup> <taxDetailsListInfo> <taxDetails> <rate>22.00</rate> <countryCode>YQ</countryCode> <type>AC</type> </taxDetails> <taxDetails> <rate>10.90</rate> <countryCode>QX</countryCode> <type>AP</type> </taxDetails> <taxDetails> <rate>1.00</rate> <countryCode>IZ</countryCode> <type>EB</type> </taxDetails> <taxDetails> <rate>3.92</rate> <countryCode>FR</countryCode> <type>SE</type> </taxDetails> <taxDetails> <rate>9.63</rate> <countryCode>FR</countryCode> <type>TI</type> </taxDetails> </taxDetailsListInfo> </taxDetailsInfoGroup> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>1</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>TESTLCC</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <excessBaggageInfo> <baggageDetails> <freeAllowance>20</freeAllowance> <quantityCode>700</quantityCode> </baggageDetails> </excessBaggageInfo> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>T</designator> <specialService>T</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> <ticketingAddInfoGroup> <pricingTicketingSubsequent> <priceType>R</priceType> </pricingTicketingSubsequent> <carValueCodeInformation> <referenceDetails> <type>CVC</type> </referenceDetails> </carValueCodeInformation> </ticketingAddInfoGroup> </passengerTypeInfoGroup> </fareProductInfoGroup> </allFaresInfoGroup> </Fare\_DisplayTicketImageReply>

## 5.7.3 Possible Errors

* * *

## 5.8 Operation: 08 Nego and Unifares options - Amadeus Nego Corporate Public fares request

FQQ1 after FQPPAR/D10JUN/AAFLON/R,U\*AMADEUS

## 5.8.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.8.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_DisplayTicketImageReply xmlns="http://xml.amadeus.com/FITQQR\_08\_2\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>749</messageFunction> </messageFunctionDetails> </messageActionDetails> <allFaresInfoGroup> <markerAllFares> </markerAllFares> <involvedCurrenciesInfo> <conversionRateDetails> <conversionType>707</conversionType> <currency>EUR</currency> </conversionRateDetails> <conversionRateDetails> <conversionType>705</conversionType> <currency>EUR</currency> </conversionRateDetails> </involvedCurrenciesInfo> <ticketingInfoGroup> <pricingTicketingDetails> <priceTicketDetails> <indicators>I</indicators> </priceTicketDetails> <ticketingLocationDetails> <country>FR</country> </ticketingLocationDetails> </pricingTicketingDetails> </ticketingInfoGroup> <flightInfoGroup> <involvedFlightInfo> <flightDate> <departureDate>100609</departureDate> </flightDate> <boardPointDetails> <trueLocationId>PAR</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>LON</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>AF</marketingCompany> </companyDetails> </involvedFlightInfo> <itineraryInfoGroup> <travelItineraryInfo> <segmentItemNumber>1</segmentItemNumber> </travelItineraryInfo> </itineraryInfoGroup> </flightInfoGroup> <fareProductInfoGroup> <generalAndIdInfo> <segmentControlDetails> <productReference>1</productReference> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </generalAndIdInfo> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> <measurementValue>1</measurementValue> </travellerDetails> </specificTravellerDetails> <passengerTypeInfoGroup> <fareInfo> <fareTypeGrouping> <aggregatePTCDiscount>ADT</aggregatePTCDiscount> </fareTypeGrouping> </fareInfo> <pricingticketingDetails> <priceTicketDetails> <indicators>RZ</indicators> <indicators>RBR</indicators> <indicators>717</indicators> </priceTicketDetails> </pricingticketingDetails> <conversionRate> <conversionRateDetails> <conversionType>700</conversionType> <currency>NUC</currency> <rateType>ROE</rateType> <pricingAmount>600.83</pricingAmount> <conversionRate>0.681549</conversionRate> </conversionRateDetails> </conversionRate> <monetaryInfo> <monetaryDetails> <typeQualifier>B</typeQualifier> <amount>410.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>T</typeQualifier> <amount>466.45</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>TX</typeQualifier> <amount>56.45</amount> </monetaryDetails> </monetaryInfo> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>4</textSubjectQualifier> <informationType>13</informationType> </freeTextQualification> <freeText>FARE VALID FOR E TICKET ONLY</freeText> </interactiveFreeText> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>4</textSubjectQualifier> <informationType>13</informationType> </freeTextQualification> <freeText>DYNAMIC DISCOUNTED FARE CORPORATE AI UPDATER \*0\*</freeText> </interactiveFreeText> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>4</textSubjectQualifier> <informationType>13</informationType> </freeTextQualification> <freeText>PRICED WITH VALIDATING CARRIER AF - REPRICE IF DIFFERENT VC</freeText> </interactiveFreeText> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>4</textSubjectQualifier> <informationType>10</informationType> </freeTextQualification> <freeText>THIS IS A TEST FARE</freeText> </interactiveFreeText> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> <informationType>15</informationType> </freeTextQualification> <freeText>10JUN09PAR AF LON600.83NUC600.83END ROE0.681549</freeText> </interactiveFreeText> <taxDetailsInfoGroup> <taxDetailsListInfo> <taxDetails> <rate>22.00</rate> <countryCode>YQ</countryCode> <type>AC</type> </taxDetails> <taxDetails> <rate>10.90</rate> <countryCode>QX</countryCode> <type>AP</type> </taxDetails> <taxDetails> <rate>10.00</rate> <countryCode>IZ</countryCode> <type>EB</type> </taxDetails> <taxDetails> <rate>3.92</rate> <countryCode>FR</countryCode> <type>SE</type> </taxDetails> <taxDetails> <rate>9.63</rate> <countryCode>FR</countryCode> <type>TI</type> </taxDetails> </taxDetailsListInfo> </taxDetailsInfoGroup> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>1</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>COW1</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <excessBaggageInfo> <baggageDetails> <freeAllowance>30</freeAllowance> <quantityCode>700</quantityCode> </baggageDetails> </excessBaggageInfo> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>C</designator> <specialService>C</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> <ticketingAddInfoGroup> <pricingTicketingSubsequent> <priceType>R</priceType> </pricingTicketingSubsequent> <tourCodeInformation> <tourInformationDetails> <tourCode>AF</tourCode> </tourInformationDetails> </tourCodeInformation> <carValueCodeInformation> <referenceDetails> <type>CVC</type> </referenceDetails> </carValueCodeInformation> </ticketingAddInfoGroup> <corporateFareInfo> <corporateFareIdentifiers> <identifyNumber>000001</identifyNumber> </corporateFareIdentifiers> </corporateFareInfo> </passengerTypeInfoGroup> </fareProductInfoGroup> </allFaresInfoGroup> </Fare\_DisplayTicketImageReply>

## 5.8.3 Possible Errors

* * *

## 5.9 Operation: 09 OB Fee input option

FQQ2 after FQP LON /D24NOV PAR /R,FA-OB-T01

## 5.9.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.9.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_DisplayTicketImageReply xmlns="http://xml.amadeus.com/FITQQR\_08\_2\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>749</messageFunction> </messageFunctionDetails> </messageActionDetails> <allFaresInfoGroup> <markerAllFares> </markerAllFares> <involvedCurrenciesInfo> <conversionRateDetails> <conversionType>707</conversionType> <currency>EUR</currency> </conversionRateDetails> <conversionRateDetails> <rateType>BSR</rateType> <conversionRate>1.343183</conversionRate> </conversionRateDetails> <conversionRateDetails> <conversionType>705</conversionType> <currency>GBP</currency> </conversionRateDetails> </involvedCurrenciesInfo> <ticketingInfoGroup> <pricingTicketingDetails> <priceTicketDetails> <indicators>I</indicators> </priceTicketDetails> <ticketingLocationDetails> <country>DE</country> </ticketingLocationDetails> </pricingTicketingDetails> </ticketingInfoGroup> <flightInfoGroup> <involvedFlightInfo> <flightDate> <departureDate>241108</departureDate> </flightDate> <boardPointDetails> <trueLocationId>LON</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>PAR</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>LH</marketingCompany> </companyDetails> </involvedFlightInfo> <itineraryInfoGroup> <travelItineraryInfo> <segmentItemNumber>1</segmentItemNumber> </travelItineraryInfo> </itineraryInfoGroup> </flightInfoGroup> <fareProductInfoGroup> <generalAndIdInfo> <segmentControlDetails> <productReference>1</productReference> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </generalAndIdInfo> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> <measurementValue>1</measurementValue> </travellerDetails> </specificTravellerDetails> <passengerTypeInfoGroup> <fareInfo> <fareTypeGrouping> <aggregatePTCDiscount>ADT</aggregatePTCDiscount> </fareTypeGrouping> </fareInfo> <pricingticketingDetails> <priceTicketDetails> <indicators>RP</indicators> <indicators>RBR</indicators> <indicators>OBI</indicators> <indicators>OBV</indicators> </priceTicketDetails> </pricingticketingDetails> <conversionRate> <conversionRateDetails> <conversionType>700</conversionType> <currency>NUC</currency> <rateType>ROE</rateType> <pricingAmount>667.09</pricingAmount> <conversionRate>0.490187</conversionRate> </conversionRateDetails> </conversionRate> <monetaryInfo> <monetaryDetails> <typeQualifier>B</typeQualifier> <amount>327.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>E</typeQualifier> <amount>440.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>T</typeQualifier> <amount>518.86</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>TX</typeQualifier> <amount>48.86</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>OB</typeQualifier> <amount>30.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>XOB</typeQualifier> <amount>488.86</amount> </monetaryDetails> </monetaryInfo> <discountAndPenaltyInfo> <discountPenaltyDetails> <function>705</function> </discountPenaltyDetails> </discountAndPenaltyInfo> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>4</textSubjectQualifier> <informationType>13</informationType> </freeTextQualification> <freeText>MANUAL MANIPULATION OF FEES-SEE HELP PAGES FOR AUTO TST \*4\*</freeText> </interactiveFreeText> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>4</textSubjectQualifier> <informationType>13</informationType> </freeTextQualification> <freeText>FORM OF PAYMENT FEES MAY APPLY</freeText> </interactiveFreeText> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>4</textSubjectQualifier> <informationType>13</informationType> </freeTextQualification> <freeText>AIRLINE FEES INCLUDED</freeText> </interactiveFreeText> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>4</textSubjectQualifier> <informationType>13</informationType> </freeTextQualification> <freeText>SERV EUR 30.00 FEE TO BE COLLECTED</freeText> </interactiveFreeText> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>4</textSubjectQualifier> <informationType>13</informationType> </freeTextQualification> <freeText>CCS EUR 4.00 FEE TO BE COLLECTED</freeText> </interactiveFreeText> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>4</textSubjectQualifier> <informationType>13</informationType> </freeTextQualification> <freeText>PRICED WITH VALIDATING CARRIER LH - REPRICE IF DIFFERENT VC</freeText> </interactiveFreeText> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> <informationType>15</informationType> </freeTextQualification> <freeText>24NOV08LON LH PAR667.09NUC667.09END ROE0.490187</freeText> </interactiveFreeText> <taxDetailsInfoGroup> <taxDetailsListInfo> <taxDetails> <rate>22.00</rate> <countryCode>YQ</countryCode> <type>AC</type> </taxDetails> <taxDetails> <rate>26.86</rate> <countryCode>GB</countryCode> <type>AD</type> </taxDetails> </taxDetailsListInfo> </taxDetailsInfoGroup> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>1</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>COW</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <excessBaggageInfo> <baggageDetails> <freeAllowance>30</freeAllowance> <quantityCode>700</quantityCode> </baggageDetails> </excessBaggageInfo> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>C</designator> <specialService>C</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> <feeBreakdownGroup> <feeTypeInfo> <carrierFeeDetails> <type>OB</type> </carrierFeeDetails> </feeTypeInfo> </feeBreakdownGroup> </passengerTypeInfoGroup> </fareProductInfoGroup> </allFaresInfoGroup> </Fare\_DisplayTicketImageReply>

## 5.9.3 Possible Errors

* * *

## 5.10 Operation: 10 General Flight segment information: Flight Details - Surface (non flight segment)

FQQ1 after FQP PAR /D27SEP /ABALON--MAN/ABANYC/AAABOS/R,ET

## 5.10.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.10.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_DisplayTicketImageReply xmlns="http://xml.amadeus.com/FITQQR\_08\_2\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>749</messageFunction> </messageFunctionDetails> </messageActionDetails> <allFaresInfoGroup> <markerAllFares> </markerAllFares> <involvedCurrenciesInfo> <conversionRateDetails> <conversionType>707</conversionType> <currency>EUR</currency> </conversionRateDetails> <conversionRateDetails> <conversionType>705</conversionType> <currency>EUR</currency> </conversionRateDetails> </involvedCurrenciesInfo> <ticketingInfoGroup> <pricingTicketingDetails> <priceTicketDetails> <indicators>I</indicators> </priceTicketDetails> <ticketingLocationDetails> <country>FR</country> </ticketingLocationDetails> </pricingTicketingDetails> </ticketingInfoGroup> <flightInfoGroup> <involvedFlightInfo> <flightDate> <departureDate>270908</departureDate> </flightDate> <boardPointDetails> <trueLocationId>PAR</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>LON</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>BA</marketingCompany> </companyDetails> </involvedFlightInfo> <itineraryInfoGroup> <travelItineraryInfo> <segmentItemNumber>1</segmentItemNumber> </travelItineraryInfo> </itineraryInfoGroup> </flightInfoGroup> <flightInfoGroup> <involvedFlightInfo> <boardPointDetails> <trueLocationId>MAN</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>NYC</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>BA</marketingCompany> </companyDetails> </involvedFlightInfo> <itineraryInfoGroup> <travelItineraryInfo> <segmentItemNumber>3</segmentItemNumber> </travelItineraryInfo> </itineraryInfoGroup> </flightInfoGroup> <flightInfoGroup> <involvedFlightInfo> <boardPointDetails> <trueLocationId>NYC</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>BOS</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>AA</marketingCompany> </companyDetails> </involvedFlightInfo> <itineraryInfoGroup> <travelItineraryInfo> <segmentItemNumber>4</segmentItemNumber> </travelItineraryInfo> </itineraryInfoGroup> </flightInfoGroup> <fareProductInfoGroup> <generalAndIdInfo> <segmentControlDetails> <productReference>1</productReference> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </generalAndIdInfo> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> <measurementValue>1</measurementValue> </travellerDetails> </specificTravellerDetails> <passengerTypeInfoGroup> <fareInfo> <fareTypeGrouping> <aggregatePTCDiscount>ADT</aggregatePTCDiscount> </fareTypeGrouping> </fareInfo> <pricingticketingDetails> <priceTicketDetails> <indicators>RP</indicators> <indicators>RBR</indicators> <indicators>TEX</indicators> </priceTicketDetails> </pricingticketingDetails> <conversionRate> <conversionRateDetails> <conversionType>700</conversionType> <currency>NUC</currency> <rateType>ROE</rateType> <pricingAmount>9427.43</pricingAmount> <conversionRate>0.681549</conversionRate> </conversionRateDetails> </conversionRate> <monetaryInfo> <monetaryDetails> <typeQualifier>B</typeQualifier> <amount>6426.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>T</typeQualifier> <amount>6426.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>TX</typeQualifier> <amount>0.00</amount> </monetaryDetails> </monetaryInfo> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>4</textSubjectQualifier> <informationType>13</informationType> </freeTextQualification> <freeText>PRICED WITH VALIDATING CARRIER BA - REPRICE IF DIFFERENT VC</freeText> </interactiveFreeText> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>4</textSubjectQualifier> <informationType>701</informationType> </freeTextQualification> <freeText>ATTN\* CHANGE TO NO STOPOVER MAY VARY FARE</freeText> </interactiveFreeText> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> <informationType>15</informationType> </freeTextQualification> <freeText>27SEP08PAR BA LON//MAN BA NYC M MANNYC8533.47AA BOS Q23.26 870.70NUC94</freeText> <freeText>27.43END ROE0.681549</freeText> </interactiveFreeText> <taxDetailsInfoGroup> <taxDetailsListInfo> <taxDetails> <countryCode>YQ</countryCode> <type>AC</type> <indicator>E</indicator> </taxDetails> <taxDetails> <countryCode>YQ</countryCode> <type>AD</type> <indicator>E</indicator> </taxDetails> <taxDetails> <countryCode>QX</countryCode> <type>AP</type> <indicator>E</indicator> </taxDetails> <taxDetails> <countryCode>IZ</countryCode> <type>EB</type> <indicator>E</indicator> </taxDetails> <taxDetails> <countryCode>FR</countryCode> <type>SE</type> <indicator>E</indicator> </taxDetails> <taxDetails> <countryCode>FR</countryCode> <type>TI</type> <indicator>E</indicator> </taxDetails> <taxDetails> <countryCode>GB</countryCode> <type>AD</type> <indicator>E</indicator> </taxDetails> <taxDetails> <countryCode>UB</countryCode> <type>AS</type> <indicator>E</indicator> </taxDetails> <taxDetails> <countryCode>YC</countryCode> <type>AE</type> <indicator>E</indicator> </taxDetails> <taxDetails> <countryCode>US</countryCode> <type>AS</type> <indicator>E</indicator> </taxDetails> <taxDetails> <countryCode>XA</countryCode> <type>CO</type> <indicator>E</indicator> </taxDetails> <taxDetails> <countryCode>XY</countryCode> <type>CR</type> <indicator>E</indicator> </taxDetails> <taxDetails> <countryCode>AY</countryCode> <type>SE</type> <indicator>E</indicator> </taxDetails> </taxDetailsListInfo> </taxDetailsInfoGroup> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>1</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>F</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <excessBaggageInfo> <baggageDetails> <freeAllowance>1</freeAllowance> <quantityCode>N</quantityCode> </baggageDetails> </excessBaggageInfo> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>F</designator> <specialService>F</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>2</segmentItemNumber> <productTypeDetails> <flightIndicator>SI</flightIndicator> </productTypeDetails> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>F</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <excessBaggageInfo> <baggageDetails> <quantityCode>N</quantityCode> </baggageDetails> </excessBaggageInfo> </fareSegmentInfo> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>3</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>F</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <excessBaggageInfo> <baggageDetails> <freeAllowance>1</freeAllowance> <quantityCode>N</quantityCode> </baggageDetails> </excessBaggageInfo> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>F</designator> <specialService>F</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>4</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>F</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <excessBaggageInfo> <baggageDetails> <freeAllowance>1</freeAllowance> <quantityCode>N</quantityCode> </baggageDetails> </excessBaggageInfo> <fareCalcSegmentInfo> <fareCalculationCodeDetails> <chargeCategory>742</chargeCategory> <amount>23.26</amount> </fareCalculationCodeDetails> </fareCalcSegmentInfo> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>Y</designator> <specialService>Y</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> </passengerTypeInfoGroup> </fareProductInfoGroup> </allFaresInfoGroup> </Fare\_DisplayTicketImageReply>

## 5.10.3 Possible Errors

* * *

## 5.11 Operation: 11 General Flight segment information: Flight Details - Stopover after a flight segment

FQQ1 after FQP PAR /D27AUG /ABALON MAN/ABA **\-** NYC/AAA BOS/R,ET

## 5.11.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.11.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_DisplayTicketImageReply xmlns="http://xml.amadeus.com/FITQQR\_08\_2\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>749</messageFunction> </messageFunctionDetails> </messageActionDetails> <allFaresInfoGroup> <markerAllFares> </markerAllFares> <involvedCurrenciesInfo> <conversionRateDetails> <conversionType>707</conversionType> <currency>EUR</currency> </conversionRateDetails> <conversionRateDetails> <conversionType>705</conversionType> <currency>EUR</currency> </conversionRateDetails> </involvedCurrenciesInfo> <ticketingInfoGroup> <pricingTicketingDetails> <priceTicketDetails> <indicators>I</indicators> </priceTicketDetails> <ticketingLocationDetails> <country>FR</country> </ticketingLocationDetails> </pricingTicketingDetails> </ticketingInfoGroup> <flightInfoGroup> <involvedFlightInfo> <flightDate> <departureDate>270808</departureDate> </flightDate> <boardPointDetails> <trueLocationId>PAR</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>LON</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>BA</marketingCompany> </companyDetails> </involvedFlightInfo> <itineraryInfoGroup> <travelItineraryInfo> <segmentItemNumber>1</segmentItemNumber> </travelItineraryInfo> </itineraryInfoGroup> </flightInfoGroup> <flightInfoGroup> <involvedFlightInfo> <boardPointDetails> <trueLocationId>LON</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>MAN</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>BA</marketingCompany> </companyDetails> </involvedFlightInfo> <itineraryInfoGroup> <travelItineraryInfo> <segmentItemNumber>2</segmentItemNumber> </travelItineraryInfo> </itineraryInfoGroup> </flightInfoGroup> <flightInfoGroup> <involvedFlightInfo> <boardPointDetails> <trueLocationId>MAN</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>NYC</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>BA</marketingCompany> </companyDetails> </involvedFlightInfo> <itineraryInfoGroup> <travelItineraryInfo> <segmentItemNumber>3</segmentItemNumber> </travelItineraryInfo> </itineraryInfoGroup> </flightInfoGroup> <flightInfoGroup> <involvedFlightInfo> <boardPointDetails> <trueLocationId>NYC</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>BOS</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>AA</marketingCompany> </companyDetails> </involvedFlightInfo> <itineraryInfoGroup> <travelItineraryInfo> <segmentItemNumber>4</segmentItemNumber> </travelItineraryInfo> </itineraryInfoGroup> </flightInfoGroup> <fareProductInfoGroup> <generalAndIdInfo> <segmentControlDetails> <productReference>1</productReference> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </generalAndIdInfo> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> <measurementValue>1</measurementValue> </travellerDetails> </specificTravellerDetails> <passengerTypeInfoGroup> <fareInfo> <fareTypeGrouping> <aggregatePTCDiscount>ADT</aggregatePTCDiscount> </fareTypeGrouping> </fareInfo> <pricingticketingDetails> <priceTicketDetails> <indicators>RP</indicators> <indicators>RBR</indicators> <indicators>TEX</indicators> </priceTicketDetails> </pricingticketingDetails> <conversionRate> <conversionRateDetails> <conversionType>700</conversionType> <currency>NUC</currency> <rateType>ROE</rateType> <pricingAmount>9427.43</pricingAmount> <conversionRate>0.681549</conversionRate> </conversionRateDetails> </conversionRate> <monetaryInfo> <monetaryDetails> <typeQualifier>B</typeQualifier> <amount>6426.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>T</typeQualifier> <amount>6426.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>TX</typeQualifier> <amount>0.00</amount> </monetaryDetails> </monetaryInfo> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>4</textSubjectQualifier> <informationType>13</informationType> </freeTextQualification> <freeText>PRICED WITH VALIDATING CARRIER BA - REPRICE IF DIFFERENT VC</freeText> </interactiveFreeText> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> <informationType>15</informationType> </freeTextQualification> <freeText>27AUG08PAR BA X/LON BA MAN BA NYC M MANNYC8533.47AA BOS Q23.26 870.70N</freeText> <freeText>UC9427.43END ROE0.681549</freeText> </interactiveFreeText> <taxDetailsInfoGroup> <taxDetailsListInfo> <taxDetails> <countryCode>YQ</countryCode> <type>AC</type> <indicator>E</indicator> </taxDetails> <taxDetails> <countryCode>YQ</countryCode> <type>AD</type> <indicator>E</indicator> </taxDetails> <taxDetails> <countryCode>QX</countryCode> <type>AP</type> <indicator>E</indicator> </taxDetails> <taxDetails> <countryCode>IZ</countryCode> <type>EB</type> <indicator>E</indicator> </taxDetails> <taxDetails> <countryCode>FR</countryCode> <type>SE</type> <indicator>E</indicator> </taxDetails> <taxDetails> <countryCode>FR</countryCode> <type>TI</type> <indicator>E</indicator> </taxDetails> <taxDetails> <countryCode>GB</countryCode> <type>AD</type> <indicator>E</indicator> </taxDetails> <taxDetails> <countryCode>UB</countryCode> <type>AS</type> <indicator>E</indicator> </taxDetails> <taxDetails> <countryCode>YC</countryCode> <type>AE</type> <indicator>E</indicator> </taxDetails> <taxDetails> <countryCode>US</countryCode> <type>AS</type> <indicator>E</indicator> </taxDetails> <taxDetails> <countryCode>XA</countryCode> <type>CO</type> <indicator>E</indicator> </taxDetails> <taxDetails> <countryCode>XY</countryCode> <type>CR</type> <indicator>E</indicator> </taxDetails> <taxDetails> <countryCode>AY</countryCode> <type>SE</type> <indicator>E</indicator> </taxDetails> </taxDetailsListInfo> </taxDetailsInfoGroup> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>1</segmentItemNumber> <productTypeDetails> <flightIndicator>X</flightIndicator> </productTypeDetails> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>F</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <excessBaggageInfo> <baggageDetails> <freeAllowance>1</freeAllowance> <quantityCode>N</quantityCode> </baggageDetails> </excessBaggageInfo> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>F</designator> <specialService>F</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>2</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>F</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <excessBaggageInfo> <baggageDetails> <freeAllowance>1</freeAllowance> <quantityCode>N</quantityCode> </baggageDetails> </excessBaggageInfo> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>F</designator> <specialService>F</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>3</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>F</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <excessBaggageInfo> <baggageDetails> <freeAllowance>1</freeAllowance> <quantityCode>N</quantityCode> </baggageDetails> </excessBaggageInfo> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>F</designator> <specialService>F</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>4</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>F</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <excessBaggageInfo> <baggageDetails> <freeAllowance>1</freeAllowance> <quantityCode>N</quantityCode> </baggageDetails> </excessBaggageInfo> <fareCalcSegmentInfo> <fareCalculationCodeDetails> <chargeCategory>742</chargeCategory> <amount>23.26</amount> </fareCalculationCodeDetails> </fareCalcSegmentInfo> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>Y</designator> <specialService>Y</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> </passengerTypeInfoGroup> </fareProductInfoGroup> </allFaresInfoGroup> </Fare\_DisplayTicketImageReply>

## 5.11.3 Possible Errors

* * *

## 5.12 Operation: 12 Passenger discount

FQQ1 after FQP LON /D15JUL NYC/RRC-BP-ID90N2

## 5.12.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.12.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_DisplayTicketImageReply xmlns="http://xml.amadeus.com/FITQQR\_08\_2\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>749</messageFunction> </messageFunctionDetails> </messageActionDetails> <allFaresInfoGroup> <markerAllFares> </markerAllFares> <involvedCurrenciesInfo> <conversionRateDetails> <conversionType>707</conversionType> <currency>EUR</currency> </conversionRateDetails> <conversionRateDetails> <rateType>BSR</rateType> <conversionRate>1.343183</conversionRate> </conversionRateDetails> <conversionRateDetails> <conversionType>705</conversionType> <currency>GBP</currency> </conversionRateDetails> </involvedCurrenciesInfo> <ticketingInfoGroup> <pricingTicketingDetails> <priceTicketDetails> <indicators>I</indicators> </priceTicketDetails> <ticketingLocationDetails> <country>FR</country> </ticketingLocationDetails> </pricingTicketingDetails> </ticketingInfoGroup> <flightInfoGroup> <involvedFlightInfo> <flightDate> <departureDate>150708</departureDate> </flightDate> <boardPointDetails> <trueLocationId>LON</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>NYC</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>YY</marketingCompany> </companyDetails> </involvedFlightInfo> <itineraryInfoGroup> <travelItineraryInfo> <segmentItemNumber>1</segmentItemNumber> </travelItineraryInfo> </itineraryInfoGroup> </flightInfoGroup> <fareProductInfoGroup> <generalAndIdInfo> <segmentControlDetails> <productReference>1</productReference> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </generalAndIdInfo> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> <measurementValue>1</measurementValue> </travellerDetails> </specificTravellerDetails> <passengerTypeInfoGroup> <fareInfo> <fareTypeGrouping> <aggregatePTCDiscount>ID90N2</aggregatePTCDiscount> </fareTypeGrouping> </fareInfo> <pricingticketingDetails> <priceTicketDetails> <indicators>RP</indicators> <indicators>RBR</indicators> </priceTicketDetails> </pricingticketingDetails> <conversionRate> <conversionRateDetails> <conversionType>700</conversionType> <currency>NUC</currency> <rateType>ROE</rateType> <pricingAmount>987.17</pricingAmount> <conversionRate>0.490187</conversionRate> </conversionRateDetails> </conversionRate> <monetaryInfo> <monetaryDetails> <typeQualifier>B</typeQualifier> <amount>484.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>E</typeQualifier> <amount>651.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>T</typeQualifier> <amount>780.81</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>TX</typeQualifier> <amount>129.81</amount> </monetaryDetails> </monetaryInfo> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>4</textSubjectQualifier> <informationType>13</informationType> </freeTextQualification> <freeText>NOT FARED AT PASSENGER TYPE REQUESTED \*5\*</freeText> </interactiveFreeText> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> <informationType>15</informationType> </freeTextQualification> <freeText>15JUL08LON YY NYC987.17NUC987.17END ROE0.490187</freeText> </interactiveFreeText> <taxDetailsInfoGroup> <taxDetailsListInfo> <taxDetails> <rate>107.45</rate> <countryCode>GB</countryCode> <type>AD</type> </taxDetails> <taxDetails> <rate>3.74</rate> <countryCode>YC</countryCode> <type>AE</type> </taxDetails> <taxDetails> <rate>10.46</rate> <countryCode>US</countryCode> <type>AS</type> </taxDetails> <taxDetails> <rate>3.40</rate> <countryCode>XA</countryCode> <type>CO</type> </taxDetails> <taxDetails> <rate>4.76</rate> <countryCode>XY</countryCode> <type>CR</type> </taxDetails> </taxDetailsListInfo> </taxDetailsInfoGroup> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>1</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>F</fareBasis> <ticketDesignator>ID90N2</ticketDesignator> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ID90N2</rateCategory> </discountDetails> </fareQualifierDetails> <excessBaggageInfo> <baggageDetails> <freeAllowance>1</freeAllowance> <quantityCode>N</quantityCode> </baggageDetails> </excessBaggageInfo> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>F</designator> <specialService>F</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> </passengerTypeInfoGroup> </fareProductInfoGroup> </allFaresInfoGroup> </Fare\_DisplayTicketImageReply>

## 5.12.3 Possible Errors

* * *

## 5.13 Operation: 13 Example of Display Ticket Image with passenger ranges

ADT : Passenger 1 to 5 and 11 to 15

CH : Passenger 6 to 10

## 5.13.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_DisplayTicketImage xmlns="http://xml.amadeus.com/FITQQQ\_08\_2\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>749</messageFunction> </messageFunctionDetails> </messageActionDetails> <pricingTicketingSubsequent> <itemNumber>2</itemNumber> </pricingTicketingSubsequent> </Fare\_DisplayTicketImage>

## 5.13.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_DisplayTicketImageReply xmlns="http://xml.amadeus.com/FITQQR\_08\_2\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>749</messageFunction> </messageFunctionDetails> </messageActionDetails> <allFaresInfoGroup> <markerAllFares> </markerAllFares> <involvedCurrenciesInfo> <conversionRateDetails> <conversionType>707</conversionType> <currency>BRL</currency> </conversionRateDetails> <conversionRateDetails> <rateType>BSR</rateType> <conversionRate>1.7536</conversionRate> </conversionRateDetails> <conversionRateDetails> <conversionType>705</conversionType> <currency>USD</currency> </conversionRateDetails> </involvedCurrenciesInfo> <ticketingInfoGroup> <pricingTicketingDetails> <priceTicketDetails> <indicators>I</indicators> </priceTicketDetails> <ticketingLocationDetails> <country>BR</country> </ticketingLocationDetails> </pricingTicketingDetails> </ticketingInfoGroup> <flightInfoGroup> <involvedFlightInfo> <flightDate> <departureDate>040109</departureDate> <departureTime>0700</departureTime> </flightDate> <boardPointDetails> <trueLocationId>SAO</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>MAD</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>IB</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>6240</flightNumber> </flightIdentification> </involvedFlightInfo> <itineraryInfoGroup> <travelItineraryInfo> <segmentItemNumber>1</segmentItemNumber> </travelItineraryInfo> </itineraryInfoGroup> </flightInfoGroup> <flightInfoGroup> <involvedFlightInfo> <flightDate> <departureDate>050109</departureDate> <departureTime>1210</departureTime> </flightDate> <boardPointDetails> <trueLocationId>MAD</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>SAO</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>IB</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>7975</flightNumber> </flightIdentification> </involvedFlightInfo> <itineraryInfoGroup> <travelItineraryInfo> <segmentItemNumber>2</segmentItemNumber> </travelItineraryInfo> </itineraryInfoGroup> </flightInfoGroup> <fareProductInfoGroup> <generalAndIdInfo> <segmentControlDetails> <productReference>2</productReference> <numberOfPAx>5</numberOfPAx> </segmentControlDetails> </generalAndIdInfo> <specificTravellerDetails> <travellerDetails> <referenceNumber>6</referenceNumber> <measurementValue>5</measurementValue> </travellerDetails> </specificTravellerDetails> <passengerTypeInfoGroup> <fareInfo> <fareTypeGrouping> <aggregatePTCDiscount>CH</aggregatePTCDiscount> </fareTypeGrouping> </fareInfo> <pricingticketingDetails> <priceTicketDetails> <indicators>RB</indicators> <indicators>41</indicators> </priceTicketDetails> <productDateTimeDetails> <departureDate>040109</departureDate> </productDateTimeDetails> </pricingticketingDetails> <conversionRate> <conversionRateDetails> <conversionType>700</conversionType> <currency>NUC</currency> <rateType>ROE</rateType> <pricingAmount>1981.98</pricingAmount> <conversionRate>1.000000</conversionRate> </conversionRateDetails> </conversionRate> <monetaryInfo> <monetaryDetails> <typeQualifier>B</typeQualifier> <amount>1982.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>E</typeQualifier> <amount>3475.63</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>T</typeQualifier> <amount>3699.87</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>TX</typeQualifier> <amount>224.24</amount> </monetaryDetails> </monetaryInfo> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>4</textSubjectQualifier> <informationType>13</informationType> </freeTextQualification> <freeText>CAT35 NEGOTIATED FARES</freeText> </interactiveFreeText> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>4</textSubjectQualifier> <informationType>13</informationType> </freeTextQualification> <freeText>PRICED WITH VALIDATING CARRIER IB - REPRICE IF DIFFERENT VC</freeText> </interactiveFreeText> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> <informationType>15</informationType> </freeTextQualification> <freeText>04JAN09SAO IB MAD990.99IB SAO990.99NUC1981.98END ROE1.000000</freeText> </interactiveFreeText> <taxDetailsInfoGroup> <taxDetailsListInfo> <taxDetails> <rate>133.26</rate> <countryCode>YQ</countryCode> <type>AC</type> </taxDetails> <taxDetails> <rate>67.00</rate> <countryCode>BR</countryCode> <type>EB</type> </taxDetails> <taxDetails> <rate>19.84</rate> <countryCode>JD</countryCode> <type>AE</type> </taxDetails> <taxDetails> <rate>4.14</rate> <countryCode>QV</countryCode> <type>DP</type> </taxDetails> </taxDetailsListInfo> </taxDetailsInfoGroup> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>1</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>Y1E9CRXRCH</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>CH</rateCategory> </discountDetails> </fareQualifierDetails> <excessBaggageInfo> <baggageDetails> <freeAllowance>1</freeAllowance> <quantityCode>N</quantityCode> </baggageDetails> </excessBaggageInfo> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>Y</designator> <specialService>Y</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>2</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>Y1E9CRXRCH</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>CH</rateCategory> </discountDetails> </fareQualifierDetails> <excessBaggageInfo> <baggageDetails> <freeAllowance>1</freeAllowance> <quantityCode>N</quantityCode> </baggageDetails> </excessBaggageInfo> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>Y</designator> <specialService>Y</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> <ticketingAddInfoGroup> <pricingTicketingSubsequent> <priceType>R</priceType> </pricingTicketingSubsequent> <tourCodeInformation> <tourInformationDetails> <tourCode>NC67083004</tourCode> </tourInformationDetails> </tourCodeInformation> <carValueCodeInformation> <referenceDetails> <type>CVC</type> </referenceDetails> </carValueCodeInformation> </ticketingAddInfoGroup> <corporateFareInfo> <corporateFareIdentifiers> <identifyNumber>029182</identifyNumber> </corporateFareIdentifiers> </corporateFareInfo> </passengerTypeInfoGroup> </fareProductInfoGroup> </allFaresInfoGroup> </Fare\_DisplayTicketImageReply>

## 5.13.3 Possible Errors

* * *

## 5.14 Operation: 14 OB fees: exclude airlinetiketing fees

FQQ1 after FQPNCEPAR/M/OAF/R,FX-OBT01

## 5.14.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.14.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_DisplayTicketImageReply xmlns="http://xml.amadeus.com/FITQQR\_08\_2\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>749</messageFunction> </messageFunctionDetails> </messageActionDetails> <allFaresInfoGroup> <markerAllFares> </markerAllFares> <involvedCurrenciesInfo> <conversionRateDetails> <conversionType>707</conversionType> <currency>EUR</currency> </conversionRateDetails> <conversionRateDetails> <conversionType>705</conversionType> <currency>EUR</currency> </conversionRateDetails> </involvedCurrenciesInfo> <flightInfoGroup> <involvedFlightInfo> <flightDate> <departureDate>210608</departureDate> </flightDate> <boardPointDetails> <trueLocationId>NCE</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>PAR</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>AF</marketingCompany> </companyDetails> </involvedFlightInfo> <itineraryInfoGroup> <travelItineraryInfo> <segmentItemNumber>1</segmentItemNumber> </travelItineraryInfo> </itineraryInfoGroup> </flightInfoGroup> <flightInfoGroup> <involvedFlightInfo> <boardPointDetails> <trueLocationId>PAR</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>NCE</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>AF</marketingCompany> </companyDetails> </involvedFlightInfo> <itineraryInfoGroup> <travelItineraryInfo> <segmentItemNumber>2</segmentItemNumber> </travelItineraryInfo> </itineraryInfoGroup> </flightInfoGroup> <fareProductInfoGroup> <generalAndIdInfo> <segmentControlDetails> <productReference>1</productReference> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </generalAndIdInfo> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> <measurementValue>1</measurementValue> </travellerDetails> </specificTravellerDetails> <passengerTypeInfoGroup> <fareInfo> <fareTypeGrouping> <aggregatePTCDiscount>ADT</aggregatePTCDiscount> </fareTypeGrouping> </fareInfo> <pricingticketingDetails> <priceTicketDetails> <indicators>RP</indicators> <indicators>RBR</indicators> <indicators>OBI</indicators> <indicators>OBV</indicators> <indicators>717</indicators> </priceTicketDetails> </pricingticketingDetails> <conversionRate> <conversionRateDetails> <conversionType>700</conversionType> <currency>EUR</currency> <rateType>ROE</rateType> <pricingAmount>628.00</pricingAmount> </conversionRateDetails> </conversionRate> <monetaryInfo> <monetaryDetails> <typeQualifier>B</typeQualifier> <amount>628.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>T</typeQualifier> <amount>702.31</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>TX</typeQualifier> <amount>74.31</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>XOB</typeQualifier> <amount>702.31</amount> </monetaryDetails> </monetaryInfo> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>4</textSubjectQualifier> <informationType>13</informationType> </freeTextQualification> <freeText>FARE VALID FOR E TICKET ONLY</freeText> </interactiveFreeText> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>4</textSubjectQualifier> <informationType>13</informationType> </freeTextQualification> <freeText>FORM OF PAYMENT FEES MAY APPLY</freeText> </interactiveFreeText> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>4</textSubjectQualifier> <informationType>13</informationType> </freeTextQualification> <freeText>SERV EUR 30.00 FEE TO BE COLLECTED</freeText> </interactiveFreeText> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>4</textSubjectQualifier> <informationType>13</informationType> </freeTextQualification> <freeText>CCS EUR 4.00 FEE TO BE COLLECTED</freeText> </interactiveFreeText> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>4</textSubjectQualifier> <informationType>13</informationType> </freeTextQualification> <freeText>PRICED WITH VALIDATING CARRIER LH - REPRICE IF DIFFERENT VC</freeText> </interactiveFreeText> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> <informationType>15</informationType> </freeTextQualification> <freeText>21JUN08NCE AF PAR314.00AF NCE314.00EUR628.00END</freeText> </interactiveFreeText> <taxDetailsInfoGroup> <taxDetailsListInfo> <taxDetails> <rate>34.00</rate> <countryCode>YQ</countryCode> <type>AC</type> </taxDetails> <taxDetails> <rate>2.00</rate> <countryCode>IZ</countryCode> <type>EB</type> </taxDetails> <taxDetails> <rate>8.83</rate> <countryCode>QW</countryCode> <type>LO</type> </taxDetails> <taxDetails> <rate>7.84</rate> <countryCode>FR</countryCode> <type>SE</type> </taxDetails> <taxDetails> <rate>17.77</rate> <countryCode>FR</countryCode> <type>TI</type> </taxDetails> <taxDetails> <rate>3.87</rate> <countryCode>UI</countryCode> <type>VZ</type> </taxDetails> </taxDetailsListInfo> </taxDetailsInfoGroup> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>1</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>Y</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <excessBaggageInfo> <baggageDetails> <freeAllowance>30</freeAllowance> <quantityCode>700</quantityCode> </baggageDetails> </excessBaggageInfo> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>Y</designator> <specialService>Y</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>2</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>Y</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <excessBaggageInfo> <baggageDetails> <freeAllowance>30</freeAllowance> <quantityCode>700</quantityCode> </baggageDetails> </excessBaggageInfo> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>Y</designator> <specialService>Y</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> <feeBreakdownGroup> <feeTypeInfo> <carrierFeeDetails> <type>OB</type> <status>EX</status> </carrierFeeDetails> </feeTypeInfo> <feeDetailsInfoGroup> <feeInfo> <dataTypeInformation> <subType>T01</subType> <status>EX</status> </dataTypeInformation> <dataInformation> <indicator>NRF</indicator> </dataInformation> <dataInformation> <indicator>NRI</indicator> </dataInformation> <dataInformation> <indicator>NCM</indicator> </dataInformation> <dataInformation> <indicator>NIS</indicator> </dataInformation> </feeInfo> <descriptionInfo> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> <informationType>COM</informationType> </freeTextQualification> <freeText>TSC ET</freeText> </descriptionInfo> </feeDetailsInfoGroup> </feeBreakdownGroup> </passengerTypeInfoGroup> </fareProductInfoGroup> </allFaresInfoGroup> </Fare\_DisplayTicketImageReply>

## 5.14.3 Possible Errors

* * *

## 5.15 Operation: 15 OB fees: add airline tiketing fees

FQQ3 after FQPFRALHR/OLH/M/R,FA-OBT01

## 5.15.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.15.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_DisplayTicketImageReply xmlns="http://xml.amadeus.com/FITQQR\_08\_2\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>749</messageFunction> </messageFunctionDetails> </messageActionDetails> <allFaresInfoGroup> <markerAllFares> </markerAllFares> <involvedCurrenciesInfo> <conversionRateDetails> <conversionType>707</conversionType> <currency>EUR</currency> </conversionRateDetails> <conversionRateDetails> <conversionType>705</conversionType> <currency>EUR</currency> </conversionRateDetails> </involvedCurrenciesInfo> <ticketingInfoGroup> <pricingTicketingDetails> <priceTicketDetails> <indicators>I</indicators> </priceTicketDetails> <ticketingLocationDetails> <country>DE</country> </ticketingLocationDetails> </pricingTicketingDetails> </ticketingInfoGroup> <flightInfoGroup> <involvedFlightInfo> <flightDate> <departureDate>210608</departureDate> </flightDate> <boardPointDetails> <trueLocationId>FRA</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>LON</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>LH</marketingCompany> </companyDetails> </involvedFlightInfo> <itineraryInfoGroup> <travelItineraryInfo> <segmentItemNumber>1</segmentItemNumber> </travelItineraryInfo> </itineraryInfoGroup> </flightInfoGroup> <flightInfoGroup> <involvedFlightInfo> <boardPointDetails> <trueLocationId>LON</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>FRA</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>LH</marketingCompany> </companyDetails> </involvedFlightInfo> <itineraryInfoGroup> <travelItineraryInfo> <segmentItemNumber>2</segmentItemNumber> </travelItineraryInfo> </itineraryInfoGroup> </flightInfoGroup> <fareProductInfoGroup> <generalAndIdInfo> <segmentControlDetails> <productReference>10</productReference> <numberOfPAx>1</numberOfPAx> </segmentControlDetails> </generalAndIdInfo> <specificTravellerDetails> <travellerDetails> <referenceNumber>1</referenceNumber> <measurementValue>1</measurementValue> </travellerDetails> </specificTravellerDetails> <passengerTypeInfoGroup> <fareInfo> <fareTypeGrouping> <aggregatePTCDiscount>ADT</aggregatePTCDiscount> </fareTypeGrouping> </fareInfo> <pricingticketingDetails> <priceTicketDetails> <indicators>RP</indicators> <indicators>RBR</indicators> <indicators>OBI</indicators> <indicators>OBV</indicators> </priceTicketDetails> </pricingticketingDetails> <conversionRate> <conversionRateDetails> <conversionType>700</conversionType> <currency>NUC</currency> <rateType>ROE</rateType> <pricingAmount>17.60</pricingAmount> <conversionRate>0.681549</conversionRate> </conversionRateDetails> </conversionRate> <monetaryInfo> <monetaryDetails> <typeQualifier>B</typeQualifier> <amount>12.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>T</typeQualifier> <amount>122.75</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>TX</typeQualifier> <amount>80.75</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>OB</typeQualifier> <amount>30.00</amount> </monetaryDetails> <monetaryDetails> <typeQualifier>XOB</typeQualifier> <amount>92.75</amount> </monetaryDetails> </monetaryInfo> <discountAndPenaltyInfo> <discountPenaltyDetails> <function>702</function> </discountPenaltyDetails> </discountAndPenaltyInfo> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>4</textSubjectQualifier> <informationType>13</informationType> </freeTextQualification> <freeText>MANUAL MANIPULATION OF FEES-SEE HELP PAGES FOR AUTO TST \*4\*</freeText> </interactiveFreeText> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>4</textSubjectQualifier> <informationType>13</informationType> </freeTextQualification> <freeText>FORM OF PAYMENT FEES MAY APPLY</freeText> </interactiveFreeText> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>4</textSubjectQualifier> <informationType>13</informationType> </freeTextQualification> <freeText>AIRLINE FEES INCLUDED</freeText> </interactiveFreeText> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>4</textSubjectQualifier> <informationType>13</informationType> </freeTextQualification> <freeText>SERV EUR 30.00 FEE TO BE COLLECTED</freeText> </interactiveFreeText> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>4</textSubjectQualifier> <informationType>13</informationType> </freeTextQualification> <freeText>CCS EUR 4.00 FEE TO BE COLLECTED</freeText> </interactiveFreeText> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>4</textSubjectQualifier> <informationType>13</informationType> </freeTextQualification> <freeText>PRICED WITH VALIDATING CARRIER LH - REPRICE IF DIFFERENT VC</freeText> </interactiveFreeText> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>4</textSubjectQualifier> <informationType>10</informationType> </freeTextQualification> <freeText>CHANGES OF RES RESTRICTED VALID LH ONLY NONREFUNDABLE</freeText> </interactiveFreeText> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>4</textSubjectQualifier> <informationType>36</informationType> </freeTextQualification> <freeText>NONREF/SPEX</freeText> </interactiveFreeText> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> <informationType>15</informationType> </freeTextQualification> <freeText>21JUN08FRA LH LON8.80LH FRA8.80NUC17.60END ROE0.681549</freeText> </interactiveFreeText> <taxDetailsInfoGroup> <taxDetailsListInfo> <taxDetails> <rate>20.00</rate> <countryCode>YQ</countryCode> <type>AC</type> </taxDetails> <taxDetails> <rate>17.13</rate> <countryCode>RA</countryCode> <type>EB</type> </taxDetails> <taxDetails> <rate>6.55</rate> <countryCode>DE</countryCode> <type>SE</type> </taxDetails> <taxDetails> <rate>13.43</rate> <countryCode>GB</countryCode> <type>AD</type> </taxDetails> <taxDetails> <rate>23.64</rate> <countryCode>UB</countryCode> <type>AS</type> </taxDetails> </taxDetailsListInfo> </taxDetailsInfoGroup> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>1</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>E99B</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <excessBaggageInfo> <baggageDetails> <freeAllowance>20</freeAllowance> <quantityCode>700</quantityCode> </baggageDetails> </excessBaggageInfo> <dateAndTimeInfo> <dateAndTimeDetails> <date>210608</date> <otherQualifier>B</otherQualifier> </dateAndTimeDetails> <dateAndTimeDetails> <date>210608</date> <otherQualifier>A</otherQualifier> </dateAndTimeDetails> </dateAndTimeInfo> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>E</designator> <specialService>E</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> <fareSegmentInfo> <segmentDescriptionInfo> <segmentItemNumber>2</segmentItemNumber> </segmentDescriptionInfo> <fareQualifierDetails> <additionalFareDetails> <fareBasis>E99B</fareBasis> </additionalFareDetails> <discountDetails> <fareQualifier>720</fareQualifier> <rateCategory>ADT</rateCategory> </discountDetails> </fareQualifierDetails> <excessBaggageInfo> <baggageDetails> <freeAllowance>20</freeAllowance> <quantityCode>700</quantityCode> </baggageDetails> </excessBaggageInfo> <dateAndTimeInfo> <dateAndTimeDetails> <date>210608</date> <otherQualifier>B</otherQualifier> </dateAndTimeDetails> <dateAndTimeDetails> <date>210608</date> <otherQualifier>A</otherQualifier> </dateAndTimeDetails> </dateAndTimeInfo> <bookingClassInfoGroup> <productInfo> <bookingClassDetails> <designator>E</designator> <specialService>E</specialService> </bookingClassDetails> </productInfo> </bookingClassInfoGroup> </fareSegmentInfo> <feeBreakdownGroup> <feeTypeInfo> <carrierFeeDetails> <type>OB</type> </carrierFeeDetails> </feeTypeInfo> <feeDetailsInfoGroup> <feeInfo> <dataTypeInformation> <subType>T01</subType> </dataTypeInformation> <dataInformation> <indicator>NRF</indicator> </dataInformation> <dataInformation> <indicator>NRI</indicator> </dataInformation> <dataInformation> <indicator>NCM</indicator> </dataInformation> <dataInformation> <indicator>NIS</indicator> </dataInformation> </feeInfo> <descriptionInfo> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> <informationType>COM</informationType> </freeTextQualification> <freeText>TSC ET</freeText> </descriptionInfo> <amountsInfo> <monetaryDetails> <typeQualifier>TIN</typeQualifier> <amount>30.00</amount> </monetaryDetails> </amountsInfo> </feeDetailsInfoGroup> </feeBreakdownGroup> </passengerTypeInfoGroup> </fareProductInfoGroup> </allFaresInfoGroup> </Fare\_DisplayTicketImageReply>

## 5.15.3 Possible Errors

* * *