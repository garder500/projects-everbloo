---
url: "https://developers.amadeus.com/api-library/soap/functional-doc/132/doc-read/106416?serviceVersion=12.2"
download_url: "https://developers.amadeus.com/PAS-EAS/api/download/comp/4d4ad2cb456c02633f463a055ab70584/106416/upload_12492739371746017168.html"
title: "UG_WBS_Ticket_RepricePNRWithLowestFare_TARIBQ_12.2_044"
source: "amadeus"
service_id: "132"
service_name: "Ticket_RepricePNRWithLowestFare"
version: "12.2"
document_id: "106416"
doc_version: "12.2"
doc_type: "User guide"
file_format: "HTML"
scraped_at: "2026-07-15T10:49:45.621Z"
---
# Function: Ticket\_RepricePNRWithLowestFare

* * *

## 1 Overview

The RepricePNRWithLowestFare function re-prices up to nine passengers for the entire flight itinerary or for as elected flight itinerary in a newly created or retrieved PNR

The system re-prices passengers with the lowest possible fare. Indeed, it automatically recalculates voluntary reissues/exchanges in accordance with IATA guidelines.

E-Ticket and Paper tickets can be repriced.

This function does not store and does not create the corresponding TST records which would include all the re-issue data. For the TSTs creation the confirmed re-pricing transaction (ReissueConfirmedPricing is required after the RepricePNRWithLowestFare transaction. The confirmation will generate the Re-issued TST(s), FO line with the new routing, the new fare and additional collection and if any MCOs with the residual value and the Penalty fee. If a Rebooking is needed (the lowest possible fare returned needs a rebooking of the PNR), the confirmation transaction has to be performed after the rebooking done on the PNR.

For multipax reissue, all the passengers must have the same bookings after best pricing entry. If not an error message will ask for a split before re-entering the entry. The No Split option, in this case, ensures that the results returned by FQ will have all the passengers of the PNR, (that must be all reprice) with the same booking.

**Displaying the Fare**

The system displays a ticket image of the Fare that is returned by a Re-pricing.

**Passenger Select**

For a given passenger, it is possible to select a passenger Type (infant or Adult).

**Passenger Type Codes (PTC)**

The Fare is associated with the specific passenger type codes that are used.

**Price Adults Only**

On occasions you need to include the qualifiers PAX to indicate that it is a non-infant passenger.

**Segment Select**

It is possible to choose which parts of a segment are to be included in the itinerary pricing. However it is not possible to split married segments (connecting flights) and price the segments individually.

## 1.1 Supported Operations

RepricePNRWithLowestFare function allows for the following supported operation(s):

-   Passenger selection
-   Passenger selection adult
-   Segment selection
-   Unifares
-   Unifares and public Request
-   Corporate Unifares
-   Corporate Unifares + public
-   Unifares + Corporate Unifares + Public
-   Point of Sale Override
-   Point of Sale Override and Ticketing Override
-   PTC or Discount
-   Cumulative PTC or Discounts
-   Cabin Option
-   Override PTC
-   Paper/Electronic surcharge (for future use)
-   Default currency override
-   Waiver
-   No Split
-   Residual Value Option
-   Award Option
-   ...

## 1.2 Limitations

-   Market and/or airline specific processes, such as US market, QF, are subject to another release.
-   Group PNR are excluded.
-   Unlimited number of re-issues is allowed, under Fare Quote constraints
-   **Best buy functionality for Infant is not supported, unless the associated adult is also re-priced in the same transaction.**
-   All passengers of the PNR must be re-priced. When more than one passenger is to be repriced, it is called MultiPax.
-   Multipax ATC only handles cases where the original tickets share the same flight segments with the same flight status booked with same options. These tickets must have been priced together with the same overrides and priced/issued at the same place. Otherwise Multipax ATC fails.
-   Passengers that were priced with different PTCs or PTCs cumulating- e.g. FXP/P1/RYTH//P2/RADT//P3/RADT-CH - may have different original pricing. But passengers that were priced with the same PTC - FXP/P1,2/RYTH - must share the same original pricing. Otherwise Multipax ATC fails.
-   Only 6 different PTC are supported in the same query.
-   A ticket can be referred to only once (no Combine Infant Ticket allowed).
-   Note that in these failing cases tickets can be re-priced one by one.
-   Up to nine passengers are supported.
-   In case of best pricer, all passengers must be repriced, or PNR must be split. However, it is possible to Best Price using No Split option. In this case, reboking will ensure that all passengers have the same booking class.
-   Open segments are not supported in ATC.

## 1.3 Unsupported Operations

Only the voluntary re-pricing option is supported.

## 1.4 Prerequisites

The End-User must be authorized to perform an Amadeus Ticket Changer transaction. The office profile is checked in order to authorize the Amadeus Ticket Changer process and/or redirect the End-User to the current manual process.

Data availability:

E-Tickets must be accessed in order to retrieve all the necessary data pertaining to the Original document.  
Once the retrieval has been done, the recalculation can be performed comparing old/new information.

The RepricePNRWithLowestFare function needs the following elements:

-   Ticket numbers: one per passenger.
-   In case of paper tickets, the range of coupons and tickets to be reissued are mandatory.
-   The Type of re-pricing : Voluntary (Unvoluntary re pricing not yet supported)

If the PNR contains only one passenger (with no infant), the Passenger selection is not mandatory. If no passenger selection is specified, all passengers of the PNR will be repriced.

Concerning the Passenger or the segment selection, the tattoo numbers need to be specified.

## 2 Building A Query

It is important to note that the examples in each chapter are only illustrations and are meant to provide the basis for a better understanding on which fields are mandatory for basic operation utilization. It is not a full explanation of every field that can be utilized for the operation, but rather a guideline to its use.

The ticket number to exchange is mandatory

The Passenger tatoo have to be provided

### DPI-REF Rules

"Local REF" - REF segment from the group "discountInformation"  
"Local REF" - REF segment from the group "ticketInfo"  
"Global Ref" - REF segment from " segSelection"

Without any Segment reference, all the segments present in the PNR are part of the exchange

### ATC Rules (ATC=overrideInformation)

-   If there is no special override option to be specified in /overrideInformation/ attributeDetails/ attributeType the **"NOP"** value must be selected.
-   overrideInformation is mandatory if any re-pricing option is done.

            CAB         Cabin class in best Buy

          CK           Check in option

          DNG         Downgrade

          EP           Electronic paper ticket

          ETK          Electronic ticket

          FBA          Farebasis Override

          IGC          Ignore corporate code in the BLB

          M             Award Option

          MAC         Mileage accrual

          MC           Miles and Cash

          NOP          No option

          NS            No Split in Best buy

          PAT          Paper ticket

          PRM         Extended parameters

          PRO          Promotional Certificate

          RC           Coporate number

          REV          Revalidation Override

          RP           Published fares

          RU           Unifares

          RVD         Residual Value in FO

          RW          Coporate unifares

          TL           Tier Level

          TRS         Transactional Certificat

          UPG         Upgrade

### PAX Level ATC Rules (ATC=overrideInformation)

           RTF         Force RTF

## 2.1 Sub Structure:

## 2.1.1 Description

## 2.1.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<message agency="1A" release="2" type="TARIBQ" version="12"> <ticketInfo> <paperticketDetailsFirstCoupon> <documentDetails> <number>0572330010863</number> <type>ET</type> </documentDetails> </paperticketDetailsFirstCoupon> <passengerSelection> <referenceDetails> <type>PA</type> <value>1</value> </referenceDetails> </passengerSelection> </ticketInfo> <originalPricingOptionsGroup> <overrideInformation> <attributeDetails> <attributeType>NOP</attributeType> </attributeDetails> </overrideInformation> </originalPricingOptionsGroup> </message>

## 3 Receiving A Reply

Neither the PNR nor data within is modified whatsoever by this function.

Reply Structure

The reply contains up to nine fare information (up to nine Ticket Images) with an additional group for the reissue information.

Here is the panel of data of reissuance:

ICOS = Issue Currency of Selling / RCOS = Reissue Currency of Selling

ICOO = Issue Currency of Origin / RCOO = Reissue Currency of Origin

Please note that:

-   the information present in the firstDpiGroup is in the reissue currency
-   the information present in the secondDpiGroup is in issue currency.
-   the information present in the thirdGroup is in miles.

**fareDataInformation:**

B = Base Fare / RCOO

712 = Total Amount / RCOS

MAC = Mileage accrual /points

NTC = New Ticket cheaper / RCOS

PND = Non discounted fare = fare amount of base fare on which discounted fare is calculated folowing a PTC discount/ RCOS

BFA = Non discounted fare = fare amount of base fare on which discounted fare is calculated following a web discount/ RCOS

**baseFareInfo:**

IBA = Old Base Fare / ICOO

**firstDpiGroup:**

DPI - reIssuePenalty = Penalty Amount / RCOS

MON - reissueInfo - RES  = Residual Value/ RCOS

 MON - reissueInfo - REF  = Refundable amount/ RCOS

 MON - reissueInfo - REU  = Reusable amount/ RCOS

 MON - reissueInfo - RTA  = New Tax/ RCOS

 MON - reissueInfo - RTA  = NEW TAX/ RCOS

 MON - reissueInfo - RTO = TOTAL PRICE OF THE REISSUE/ RCOS

 MON - reissueInfo - TAC = TOTAL ADDITIONAL COLLECTION/ RCOS

 MON - reissueInfo - TSC  = TST Additional Collection/ RCOS

MON - reissueInfo - TST  = TST Amount/ RCOS

MON - reissueInfo - UPC = Upgrade Cost in Cash/ RCOS

MON - oldTaxInfo - ITA   = OLD TAX/ RCOS

MON - oldTaxInfo - ITO   = TOTAL PRICE OF THE ISSUE/ RCOS

MON - oldTaxInfo - NTA  = Non Refundable Tax Amount/ RCOS

MON - reissueBalanceInfo - BEQ    = Fare Balance / RCOS

MON - reissueBalanceInfo - BGT     = Grand Total / RCOS

MON - reissueBalanceInfo - BTA     = Tax Balance / RCOS

MON - reissueBalanceInfo - BTO    = Ticket Difference / RCOS

_miles and cash info_

MON - reissueInfo - RCC = Reissue amount of cash converted

MON - reissueInfo - RBP = Reissue base fare in points

MON - reissueInfo - RRA = Reissue remaining amount in cash

MON - reissueInfo - RRC = Reissue remaining cash without taxes

MON - reissueInfo - RTT = Reissue total taxes in cash

MON - reissueInfo - ACP = TST Additional Collection of the amount converted in points

MON - reissueInfo - TAR = Total Additional Collection of the remaining amount in cash

MON - reissueInfo - RER = Residual value of the remaining amount in cash

MON - reissueInfo - TAP = Total Additional Collection in points

MON - reissueInfo - REP = Residual value in points

MON - reissueInfo - RUR = Reusable amount of residual value of the remaining amount in cash

MON - reissueInfo - RFR = Refundable amount of residual value of the remaining amount in cash

MON - oldTaxInfo  - IBP = Issue base fare in points

MON - oldTaxInfo  - ICC = Issue amount of cash converted 

MON - oldTaxInfo  - IRA = Issue remaining amount in cash

MON -  oldTaxInfo  -  IRC = Issue remaining cash without taxes

MON - oldTaxInfo  -  ITT = Issue total taxes in cash

MON - reissueBalanceInfo - BBP = Balance base fare in points

MON - reissueBalanceInfo -  BCC = Balance amount of cash converted

MON - reissueBalanceInfo - BRA = Balance remaining amount in cash

MON - reissueBalanceInfo - BRC = Balance remaining cash without taxes

MON - reissueBalanceInfo - BTT = Balance total taxes in cash

MON - reissueBalanceInfo - TDP = Ticket difference of the amount in points

MON - reissueBalanceInfo - TDR = Ticket Difference of the remaining amount in cash

**secondDpiGroup:** 

DPI - penalty = Penalty Amount / ICOS

MON - residualValueInfo - RES       = Residual Value/ ICOS

 MON - reissueInfo - REF  = Refundable amount/ ICOS

 MON - reissueInfo - REU  = Refusable amount/ ICOS

MON - residualValueInfo - RTA       = New Tax/ ICOS

MON - residualValueInfo - RTO       = Total price of Reissue/ ICOS

MON - residualValueInfo - UPC       = Upgrade Cost in Cash/ ICOS

MON - oldTaxInfo - ITA   = Old Tax / ICOS

MON - oldTaxInfo – NTA  = Non Refundable Tax Amount / ICOS (if any)

MON - oldTaxInfo - ITO   = Total Price of Issue / ICOS

MON - issueBalanceInfo - BTA        = Tax Balance / ICOS

MON - issueBalanceInfo - BTO       = Ticket Difference / ICOS

MON - issueBalanceInfo - NEQ       = Non Refundable Amount / ICOS (if any)

MON - issueBalanceInfo - BGT        = Grand Total / ICOS

MON - issueBalanceInfo - BEQ       = Fare Balance/ ICOS

MON - issueBalanceInfo - BGT        = Grand Total/ ICOS

MON - issueBalanceInfo - BTA        = TAX BALANCE / ICOS

MON - issueBalanceInfo - BTO       = TICKET DIFFERENCE / ICOS

MON - issueBalanceInfo - NEQ       = Non Refundable Amount/ ICOS

_miles and cash info_

MON - residualValueInfo - RCC = Reissue amount of cash converted

MON - residualValueInfo - RBP = Reissue base fare in points

MON - residualValueInfo - RRA = Reissue remaining amount in cash

MON - residualValueInfo - RRC = Reissue remaining cash without taxes

MON - residualValueInfo - RTT = Reissue total taxes in cash

MON - residualValueInfo - ACP = TST Additional Collection of the amount converted in points

MON - residualValueInfo - TAR = Total Additional Collection of the remaining amount in cash

MON - residualValueInfo - RER = Residual value of the remaining amount in cash

MON - residualValueInfo - TAP = Total Additional Collection in points

MON - residualValueInfo - REP = Residual value in points

MON - residualValueInfo - RUR = Reusable amount of residual value of the remaining amount in cash

MON - residualValueInfo - RFR = Refundable amount of residual value of the remaining amount in cash

MON - oldTaxInfo  - IBP = Issue base fare in points

MON - oldTaxInfo  - ICC = Issue amount of cash converted 

MON - oldTaxInfo  - IRA = Issue remaining amount in cash

MON -  oldTaxInfo  -  IRC = Issue remaining cash without taxes

MON - oldTaxInfo  -  ITT = Issue total taxes in cash

MON - issueBalanceInfo - BBP = Balance base fare in points

MON - issueBalanceInfo -  BCC = Balance amount of cash converted

MON - issueBalanceInfo - BRA = Balance remaining amount in cash

MON - issueBalanceInfo - BRC = Balance remaining cash without taxes

MON - issueBalanceInfo - BTT = Balance total taxes in cash

MON - issueBalanceInfo - TDP = Ticket difference of the amount in points

MON - issueBalanceInfo - TDR = Ticket Difference of the remaining amount in cash

**thirdGroup:**

MON - reissueMilesInfo - RNE         = New Miles Fare.

MON - reissueMilesInfo - BNE         = Miles Balance

MON - reissueMilesInfo - MIL         = Miles Penalty

MON - reissueMilesInfo - UPM        = Upgrade in Miles

MON - originalMilesValues - INE     = Original Miles Fare.

MON - originalMilesValues - MGT    = Total of Miles

**taxInformation:**

Following codesets are used in TAX segment (taxIdentifier):

Codeset in taxIdentifier

tax type in TST

description

X

X

New tax

PD

O

Paid tax

GST

G

New paid tax

U

U

Compensated tax

RFD

Q

Refundable tax

NRF

O

Non refundable tax

**reissueAttributes:**

1 may be returned in **NET** indicator, if netting has applied.

**REVAL** indicator is sent in case a revalidation is returned by PSP.

**PCI** indicator may be returned with the following values:

-   **C31**: if Cat 31 has been processed for all Fare Components
-   **C16**: if at least one coded Cat 16 (and optionally some Cat31) has been processed
-   **FSG**: otherwise (that is if at least one default fictitious Cat31 was processed)

If no PCI indicator is returned, it means that Cat 31 has been used.

**PCT** indicator may be returned with the following values:

-   **TOTAL**: Penalty has been collected in the total amount of the TST
-   **Q**: Penalty has been collected in a Q surcharge in the TST
-   **BSP**: Penalty should be collected by BSP link
-   **NODOC**: No document (MCO/EMD) generation supported, but penalty collection not identified
-   **other values (eg. CP)**: Penalty has been collected in a tax with this code (eg. CP) in the TST

If no PCT indicator is returned, it means that penalty has been collected in an EMD/MCO.

**RVA** indicator may be returned with N value, in case Residual Value has been waived. Otherwise, RVA indicator is not returned.

**PNS** indicator is returned if a No Show penality is applied.

**NTF** indicator is returned if the fare is a Non Ticketable Fare.

**NET** indicator is returned in case of Netting

## 3.1 Sub Structure:

## 3.1.1 Description

## 3.1.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<message agency="1A" release="2" type="TARIBR" version="12"> <fareList> <pricingInformation> <tstInformation> <tstIndicator>I</tstIndicator> </tstInformation> <fcmi>0</fcmi> </pricingInformation> <fareReference> <referenceType>TST</referenceType> <uniqueReference>1</uniqueReference> </fareReference> <lastTktDate> <businessSemantic>LT</businessSemantic> <dateTime> <year>2013</year> <month>3</month> <day>22</day> </dateTime> </lastTktDate> <paxSegReference> <refDetails> <refQualifier>PA</refQualifier> <refNumber>1</refNumber> </refDetails> </paxSegReference> <fareDataInformation> <fareDataMainInformation> <fareDataQualifier>R</fareDataQualifier> </fareDataMainInformation> <fareDataSupInformation> <fareDataQualifier>712</fareDataQualifier> <fareAmount>0.00</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataSupInformation> <fareDataSupInformation> <fareDataQualifier>B</fareDataQualifier> <fareAmount>462.00</fareAmount> <fareCurrency>GBP</fareCurrency> </fareDataSupInformation> </fareDataInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>FR</isoCountry> </taxType> <taxNature>SE</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>4.24</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>X</taxIdentifier> </taxIdentification> <taxType> <isoCountry>FR</isoCountry> </taxType> <taxNature>TI</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>12.75</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>GST</taxIdentifier> </taxIdentification> <taxType> <isoCountry>GB</isoCountry> </taxType> <taxNature>AD</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>32.53</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>U</taxIdentifier> </taxIdentification> <taxType> <isoCountry>IZ</isoCountry> </taxType> <taxNature>EB</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>10.00</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>RFD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>QX</isoCountry> </taxType> <taxNature>AP</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>12.55</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>NRF</taxIdentifier> </taxIdentification> <taxType> <isoCountry>UB</isoCountry> </taxType> <taxNature>AS</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>31.25</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <bankerRates> <firstRateDetail> <amount>1.25098</amount> </firstRateDetail> </bankerRates> <originDestination> <cityCode>LON</cityCode> <cityCode>LON</cityCode> </originDestination> <segmentInformation> <connexInformation> <connecDetails> <connexType>O</connexType> </connecDetails> </connexInformation> <segDetails> <segmentDetail> <identification>AIR</identification> <classOfService>C</classOfService> </segmentDetail> <ticketingStatus>OK</ticketingStatus> </segDetails> <fareQualifier> <fareBasisDetails> <primaryCode>CFF</primaryCode> <fareBasisCode>GB</fareBasisCode> </fareBasisDetails> </fareQualifier> <validityInformation> <businessSemantic>A</businessSemantic> <dateTime> <year>2013</year> <month>3</month> <day>22</day> </dateTime> </validityInformation> <bagAllowanceInformation> <bagAllowanceDetails> <baggageQuantity>2</baggageQuantity> <baggageType>N</baggageType> </bagAllowanceDetails> </bagAllowanceInformation> <segmentReference> <refDetails> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </refDetails> </segmentReference> <sequenceInformation> <sequenceSection> <sequenceNumber>1</sequenceNumber> </sequenceSection> </sequenceInformation> </segmentInformation> <segmentInformation> <connexInformation> <connecDetails> <connexType>O</connexType> </connecDetails> </connexInformation> <segDetails> <segmentDetail> <identification>AIR</identification> <classOfService>Z</classOfService> </segmentDetail> <ticketingStatus>OK</ticketingStatus> </segDetails> <fareQualifier> <fareBasisDetails> <primaryCode>ZFF</primaryCode> <fareBasisCode>GB</fareBasisCode> </fareBasisDetails> </fareQualifier> <validityInformation> <businessSemantic>A</businessSemantic> <dateTime> <year>2013</year> <month>3</month> <day>22</day> </dateTime> </validityInformation> <bagAllowanceInformation> <bagAllowanceDetails> <baggageQuantity>2</baggageQuantity> <baggageType>N</baggageType> </bagAllowanceDetails> </bagAllowanceInformation> <segmentReference> <refDetails> <refQualifier>S</refQualifier> <refNumber>3</refNumber> </refDetails> </segmentReference> <sequenceInformation> <sequenceSection> <sequenceNumber>2</sequenceNumber> </sequenceSection> </sequenceInformation> </segmentInformation> <otherPricingInfo> <attributeDetails> <attributeType>FCA</attributeType> <attributeDescription>LON AF PAR406.46AF LON322.80NUC729.26END ROE0.633508</attributeDescription> </attributeDetails> </otherPricingInfo> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText>DATE OF ORIGIN</errorFreeText> </warningText> </warningInformation> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText>TICKET STOCK RESTRICTION</errorFreeText> </warningText> </warningInformation> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText>BG CXR\\</errorFreeText> </warningText> </warningInformation> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText>PRICED WITH VALIDATING CARRIER AF REPRICE IF DIFFERENT VC</errorFreeText> </warningText> </warningInformation> <automaticReissueInfo> <ticketInfo> <documentDetails> <number>0572330010863</number> <type>ET</type> </documentDetails> </ticketInfo> <couponInfo> <couponDetails> <cpnNumber>1</cpnNumber> </couponDetails> </couponInfo> <baseFareInfo> <monetaryDetails> <typeQualifier>IBA</typeQualifier> <amount>462.00</amount> <currency>GBP</currency> </monetaryDetails> </baseFareInfo> <firstDpiGroup> <reIssuePenalty> <penDisData> <penaltyAmount>0</penaltyAmount> <penaltyCurrency>EUR</penaltyCurrency> </penDisData> </reIssuePenalty> <reissueInfo> <monetaryDetails> <typeQualifier>RES</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>RTO</typeQualifier> <amount>758.88</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TSC</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TST</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>RTA</typeQualifier> <amount>180.88</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TAC</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </otherMonetaryDetails> </reissueInfo> <oldTaxInfo> <monetaryDetails> <typeQualifier>ITA</typeQualifier> <amount>180.88</amount> <currency>EUR</currency> </monetaryDetails> </oldTaxInfo> <reissueBalanceInfo> <monetaryDetails> <typeQualifier>BEQ</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>BGT</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BTA</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BTO</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </otherMonetaryDetails> </reissueBalanceInfo> </firstDpiGroup> <secondDpiGroup> <penalty> <penDisData> <penaltyAmount>0</penaltyAmount> <penaltyCurrency>EUR</penaltyCurrency> </penDisData> </penalty> <residualValueInfo> <monetaryDetails> <typeQualifier>RES</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>RTA</typeQualifier> <amount>180.88</amount> <currency>EUR</currency> </otherMonetaryDetails> </residualValueInfo> <oldTaxInfo> <monetaryDetails> <typeQualifier>ITA</typeQualifier> <amount>180.88</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>ITO</typeQualifier> <amount>758.88</amount> <currency>EUR</currency> </otherMonetaryDetails> </oldTaxInfo> <issueBalanceInfo> <monetaryDetails> <typeQualifier>BTA</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>BEQ</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BGT</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BTO</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </otherMonetaryDetails> </issueBalanceInfo> </secondDpiGroup> <reissueAttributes> <attributeDetails> <attributeType>NET</attributeType> <attributeDescription>1</attributeDescription> </attributeDetails> </reissueAttributes> </automaticReissueInfo> </fareList> </message>

* * *

## 3.2 Sub Structure:

## 3.2.1 Description

## 3.2.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

* * *

## 4 Error Messages

Message Description

**CM00005** - Check segment number: a segment with the TATTOO number specified in the REF (/pasSegmentSelection) segment is not present in the PNR

**CM00011** - Unable to process Process error: normally it shouldn't be related with data from the request

**CM00258** - Function not supported: request a functionality not yet implemented

**CM00477** - Invalid format: data specified in the request is not valid, although is OK from the message definition

Examples: Corporate number length is not 6 digits or is not digit (ATC segment /originalPricingOptionsGroup /overrideInformation). Point of sale/ticketing not a city code (3letters) (POS segment /originalPricingOptionsGroup /cityOverride). DPI/REF for discounts not following DPI-REF rules.

**CM01908** - Check passenger number: a segment with the TATTOO number specified in the REF segment (/ticketInfo /passengerSelection) is not present in the PNR

**CM01959** - Need PNR A request has been made without a retrieved/newly created PNR.

**CM02032** - Invalid corporate code: the number of corporate codes specified in the ATC (/originalPricingOptionsGroup /overrideInformation) is greater than allowed (1corp code).

**CM02230** - Single selection code only: different passenger types specified in the same REF segment (/ticketInfo /passengerSelection).

**CM03504** - Combination not allowed: a not valid reference qualifier entered in the REF segment (/originalPricingOptionsGroup /discountInformation /referenceQualifier).

**CM04701** - Exceeds maximum fare disc codes: more than three cumulative discount codes specified.

**CM04725** - Invalid passenger association: passenger selected in REF (/originalPricingOptionsGroup /discountInformation /referenceQualifier) from the DPI-REF group are not selected in the global REF (/pasSegmentSelection). See DPI-REF rules.

**CM04070** - Unable to process+ seg name : Process error - normally it shouldn't be related with data from the request - the name of the program where error occurred is appended at the end of the message.

**CM06392** - Invalid repetitive option: the same option has been specified twice (or more) for options that are allowed only once.

**CM13301** - Invalid point of sale: the city qualifier in the POS segment (/originalPricingOptionsGroup /cityOverride) does not correspond to a point of sale/point of tkt codeset ( normally this error should not occur).

**CM07450** \- partial selection of passengers not allowed. If the user tries to re-price a subset of the passengers of the PNR, with best pricing.

**CM23244** - Invalid: multiple reference to a ticket/segment:  A ticket/passenger must be referred to only once

For more functionnal error, please referred to A02ATC 007 specification

## 4.1 Error Reply

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_RepricePNRWithLowestFareReply xmlns="http://xml.amadeus.com/TARIBR\_12\_2\_1A"> <fareList> <pricingInformation> <tstInformation> <tstIndicator>M</tstIndicator> </tstInformation> <fcmi>4</fcmi> </pricingInformation> <fareReference> <referenceType>TST</referenceType> <uniqueReference>1</uniqueReference> </fareReference> <lastTktDate> <businessSemantic>LT</businessSemantic> <dateTime> <year>2008</year> <month>9</month> <day>21</day> </dateTime> </lastTktDate> <paxSegReference> <refDetails> <refQualifier>PA</refQualifier> <refNumber>1</refNumber> </refDetails> </paxSegReference> <fareDataInformation> <fareDataMainInformation> <fareDataQualifier>R</fareDataQualifier> </fareDataMainInformation> <fareDataSupInformation> <fareDataQualifier>B</fareDataQualifier> <fareAmount>40.00</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataSupInformation> <fareDataSupInformation> <fareDataQualifier>712</fareDataQualifier> <fareAmount>0.00</fareAmount> <fareCurrency>GBP</fareCurrency> </fareDataSupInformation> </fareDataInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>YQ</isoCountry> </taxType> <taxNature>AC</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>32.00</fareAmount> <fareCurrency>GBP</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>YQ</isoCountry> </taxType> <taxNature>AD</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>5.00</fareAmount> <fareCurrency>GBP</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>GB</isoCountry> </taxType> <taxNature>AD</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>10.00</fareAmount> <fareCurrency>GBP</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>UB</isoCountry> </taxType> <taxNature>AS</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>19.70</fareAmount> <fareCurrency>GBP</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>QX</isoCountry> </taxType> <taxNature>AP</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>8.30</fareAmount> <fareCurrency>GBP</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>IZ</isoCountry> </taxType> <taxNature>EB</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>0.80</fareAmount> <fareCurrency>GBP</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>FR</isoCountry> </taxType> <taxNature>SE</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>3.10</fareAmount> <fareCurrency>GBP</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>FR</isoCountry> </taxType> <taxNature>TI</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>7.60</fareAmount> <fareCurrency>GBP</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>DU</isoCountry> </taxType> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>40.00</fareAmount> <fareCurrency>GBP</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>RFD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>YQ</isoCountry> </taxType> <taxNature>AC</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>8.00</fareAmount> <fareCurrency>GBP</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>RFD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>GB</isoCountry> </taxType> <taxNature>AD</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>10.00</fareAmount> <fareCurrency>GBP</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>RFD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>IZ</isoCountry> </taxType> <taxNature>EB</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>7.10</fareAmount> <fareCurrency>GBP</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <bankerRates> <firstRateDetail> <amount>.793777</amount> </firstRateDetail> </bankerRates> <originDestination> <cityCode>PAR</cityCode> <cityCode>PAR</cityCode> </originDestination> <segmentInformation> <connexInformation> <connecDetails> <connexType>O</connexType> </connecDetails> </connexInformation> <segDetails> <segmentDetail> <identification>AIR</identification> <classOfService>O</classOfService> </segmentDetail> <ticketingStatus>OK</ticketingStatus> </segDetails> <fareQualifier> <fareBasisDetails> <primaryCode>ONC</primaryCode> <fareBasisCode>EUR</fareBasisCode> </fareBasisDetails> </fareQualifier> <validityInformation> <businessSemantic>A</businessSemantic> <dateTime> <year>2009</year> <month>1</month> <day>12</day> </dateTime> </validityInformation> <bagAllowanceInformation> <bagAllowanceDetails> <baggageQuantity>1</baggageQuantity> <baggageType>N</baggageType> </bagAllowanceDetails> </bagAllowanceInformation> <segmentReference> <refDetails> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </refDetails> </segmentReference> <sequenceInformation> <sequenceSection> <sequenceNumber>1</sequenceNumber> </sequenceSection> </sequenceInformation> </segmentInformation> <segmentInformation> <connexInformation> <connecDetails> <connexType>O</connexType> </connecDetails> </connexInformation> <segDetails> <segmentDetail> <identification>AIR</identification> <classOfService>O</classOfService> </segmentDetail> <ticketingStatus>OK</ticketingStatus> </segDetails> <fareQualifier> <fareBasisDetails> <primaryCode>ONC</primaryCode> <fareBasisCode>EUR</fareBasisCode> </fareBasisDetails> </fareQualifier> <validityInformation> <businessSemantic>A</businessSemantic> <dateTime> <year>2009</year> <month>1</month> <day>12</day> </dateTime> </validityInformation> <bagAllowanceInformation> <bagAllowanceDetails> <baggageQuantity>1</baggageQuantity> <baggageType>N</baggageType> </bagAllowanceDetails> </bagAllowanceInformation> <segmentReference> <refDetails> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </refDetails> </segmentReference> <sequenceInformation> <sequenceSection> <sequenceNumber>2</sequenceNumber> </sequenceSection> </sequenceInformation> </segmentInformation> <otherPricingInfo> <attributeDetails> <attributeType>FCA</attributeType> <attributeDescription>PAR BA LON31.11BA PAR31.11NUC62.22END ROE0.642811</attributeDescription> </attributeDetails> </otherPricingInfo> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText>REBOOK NEEDED</errorFreeText> </warningText> </warningInformation> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText>ORIGINAL TICKET NOT GUARANTEED</errorFreeText> </warningText> </warningInformation> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText> - SEE ADV PURCHASE</errorFreeText> </warningText> </warningInformation> <automaticReissueInfo> <ticketInfo> <documentDetails> <number>1252404754371</number> <type>ET</type> </documentDetails> </ticketInfo> <couponInfo> <couponDetails> <cpnNumber>1</cpnNumber> </couponDetails> </couponInfo> <baseFareInfo> <monetaryDetails> <typeQualifier>IBA</typeQualifier> <amount>673.00</amount> <currency>EUR</currency> </monetaryDetails> </baseFareInfo> <firstDpiGroup> <reIssuePenalty> <penDisData> <penaltyAmount>0</penaltyAmount> <penaltyCurrency>GBP</penaltyCurrency> </penDisData> </reIssuePenalty> <reissueInfo> <monetaryDetails> <typeQualifier>TAC</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>RTA</typeQualifier> <amount>86.50</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TST</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TSC</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>RTO</typeQualifier> <amount>118.50</amount> <currency>GBP</currency> </otherMonetaryDetails> </reissueInfo> <oldTaxInfo> <monetaryDetails> <typeQualifier>ITA</typeQualifier> <amount>151.60</amount> <currency>GBP</currency> </monetaryDetails> </oldTaxInfo> <reissueBalanceInfo> <monetaryDetails> <typeQualifier>BEQ</typeQualifier> <amount>-501.00</amount> <currency>GBP</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>BTO</typeQualifier> <amount>-526.10</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BTA</typeQualifier> <amount>-25.10</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BGT</typeQualifier> <amount>-526.10</amount> <currency>GBP</currency> </otherMonetaryDetails> </reissueBalanceInfo> </firstDpiGroup> <secondDpiGroup> <penalty></penalty> <residualValueInfo> <monetaryDetails> <typeQualifier>RES</typeQualifier> <amount>526.10</amount> <currency>GBP</currency> </monetaryDetails> </residualValueInfo> <oldTaxInfo> <monetaryDetails> <typeQualifier>ITA</typeQualifier> <amount>151.60</amount> <currency>GBP</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>NTA</typeQualifier> <amount>40.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>ITO</typeQualifier> <amount>684.60</amount> <currency>GBP</currency> </otherMonetaryDetails> </oldTaxInfo> <issueBalanceInfo> <monetaryDetails> <typeQualifier>BTA</typeQualifier> <amount>-25.10</amount> <currency>GBP</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>BTO</typeQualifier> <amount>-526.10</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>NEQ</typeQualifier> <amount>2.00</amount> <currency>GBP</currency> </otherMonetaryDetails> </issueBalanceInfo> </secondDpiGroup> </automaticReissueInfo> </fareList> </Ticket\_RepricePNRWithLowestFareReply>

  

* * *

## 5 Operations

## 5.1 Operation: Add Taxes (amount)

It enables the user to add a fixed amount taxes to a re-pricing entry. It can also be used to override the amount of a tax returned by PSP : if a tax is already included in PSP reply to re-pricing query, Add Taxes option overrides the amount of this tax by the one entered by the user.

The Add Tax feature allows up to 4 taxes per passenger type (PSP limitation). Taxes to be added should be separated by a dash (-).

Currency cannot be specified: it is always the currency of point of sale.

The TST is created as Manual

## 5.1.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_RepricePNRWithLowestFare xmlns="http://xml.amadeus.com/TARIBQ\_12\_2\_1A"> <ticketInfo> <paperticketDetailsFirstCoupon> <documentDetails> <number>12312356789</number> <type>ET</type> </documentDetails> </paperticketDetailsFirstCoupon> <passengerSelection> <referenceDetails> <type>PA</type> <value>1</value> </referenceDetails> </passengerSelection> </ticketInfo> <originalPricingOptionsGroup> <overrideInformation> <attributeDetails> <attributeType>NOP</attributeType> </attributeDetails> </overrideInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>ADT</taxIdentifier> </taxIdentification> <taxType> <isoCountry>GB</isoCountry> </taxType> <taxNature>SE</taxNature> <taxData> <taxRate>10</taxRate> <taxValueQualifier>A</taxValueQualifier> </taxData> </taxDetails> </originalPricingOptionsGroup> </Ticket\_RepricePNRWithLowestFare>

## 5.1.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.1.3 Possible Errors

See "Error Messages" section.

* * *

## 5.2 Operation: Add Taxes (percentage)

It enables the user to add a percentage of taxes to a re-pricing entry. It can also be used to override the amount of a tax returned by PSP : if a tax is already included in PSP reply to re-pricing query, Add Taxes option overrides the amount of this tax by the one entered by the user.

The Add Tax feature allows up to 4 taxes per passenger type (PSP limitation). Taxes to be added should be separated by a dash (-).

Currency cannot be specified: it is always the currency of point of sale.

The TST is created as Manual

## 5.2.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_RepricePNRWithLowestFare xmlns="http://xml.amadeus.com/TARIBQ\_12\_2\_1A"> <ticketInfo> <paperticketDetailsFirstCoupon> <documentDetails> <number>12312356789</number> <type>ET</type> </documentDetails> </paperticketDetailsFirstCoupon> <passengerSelection> <referenceDetails> <type>PA</type> <value>1</value> </referenceDetails> </passengerSelection> </ticketInfo> <originalPricingOptionsGroup> <overrideInformation> <attributeDetails> <attributeType>NOP</attributeType> </attributeDetails> </overrideInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>ADT</taxIdentifier> </taxIdentification> <taxType> <isoCountry>GB</isoCountry> </taxType> <taxNature>SE</taxNature> <taxData> <taxRate>10</taxRate> <taxValueQualifier>P</taxValueQualifier> </taxData> </taxDetails> </originalPricingOptionsGroup> </Ticket\_RepricePNRWithLowestFare>

## 5.2.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.2.3 Possible Errors

See "Error Messages" section.

* * *

## 5.3 Operation: Alert if new ticket is cheaper (reply)

ATC checks repricing and new pricing at same time and alerts end user of existing better deals while re booking.

The NTC amount return by how much the ticket would be cheaper in the reissue currency.

## 5.3.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_RepricePNRWithLowestFare xmlns="http://xml.amadeus.com/TARIBQ\_12\_2\_1A"> <ticketInfo> <paperticketDetailsFirstCoupon> <documentDetails> <number>12312356789</number> <type>ET</type> </documentDetails> </paperticketDetailsFirstCoupon> <passengerSelection> <referenceDetails> <type>PA</type> <value>1</value> </referenceDetails> </passengerSelection> </ticketInfo> <pasSegmentSelection> <referenceDetails> <type>S</type> <value>1</value> </referenceDetails> <referenceDetails> <type>S</type> <value>2</value> </referenceDetails> </pasSegmentSelection> <originalPricingOptionsGroup> <overrideInformation> <attributeDetails> <attributeType>NOP</attributeType> </attributeDetails> </overrideInformation> </originalPricingOptionsGroup> </Ticket\_RepricePNRWithLowestFare>

## 5.3.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_RepricePNRWithLowestFareReply xmlns="http://xml.amadeus.com/TARIBR\_12\_2\_1A"> <fareList> <pricingInformation> <tstInformation> <tstIndicator>I</tstIndicator> </tstInformation> <fcmi>0</fcmi> </pricingInformation> <fareReference> <referenceType>TST</referenceType> <uniqueReference>1</uniqueReference> </fareReference> <paxSegReference> <refDetails> <refQualifier>PA</refQualifier> <refNumber>2</refNumber> </refDetails> </paxSegReference> <fareDataInformation> <fareDataMainInformation> <fareDataQualifier>R</fareDataQualifier> </fareDataMainInformation> <fareDataSupInformation> <fareDataQualifier>712</fareDataQualifier> <fareAmount>230.00</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataSupInformation> <fareDataSupInformation> <fareDataQualifier>B</fareDataQualifier> <fareAmount>3140.00</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataSupInformation> <fareDataSupInformation> <fareDataQualifier>NTC</fareDataQualifier> <fareAmount>300.00</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataSupInformation> </fareDataInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>AE</isoCountry> </taxType> <taxNature>AD</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>75.00</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>TP</isoCountry> </taxType> <taxNature>SE</taxNature> </taxDetails> </taxInformation> <bankerRates> <firstRateDetail> <amount>.808604</amount> </firstRateDetail> </bankerRates> <originDestination> <cityCode>PAR</cityCode> <cityCode>LON</cityCode> </originDestination> <segmentInformation> <connexInformation> <connecDetails> <connexType>O</connexType> </connecDetails> </connexInformation> <segDetails> <segmentDetail> <identification>AIR</identification> <classOfService>Y</classOfService> </segmentDetail> <ticketingStatus>OK</ticketingStatus> </segDetails> <fareQualifier> <fareBasisDetails> <primaryCode>Y2F</primaryCode> <fareBasisCode>LBAOW</fareBasisCode> </fareBasisDetails> </fareQualifier> <validityInformation> <businessSemantic>A</businessSemantic> <dateTime> <year>2013</year> <month>5</month> <day>9</day> </dateTime> </validityInformation> <bagAllowanceInformation> <bagAllowanceDetails> <baggageQuantity>1</baggageQuantity> <baggageType>N</baggageType> </bagAllowanceDetails> </bagAllowanceInformation> <segmentReference> <refDetails> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </refDetails> </segmentReference> <sequenceInformation> <sequenceSection> <sequenceNumber>1</sequenceNumber> </sequenceSection> </sequenceInformation> </segmentInformation> <otherPricingInfo> <attributeDetails> <attributeType>END</attributeType> <attributeDescription>BA ONLY</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>FCA</attributeType> <attributeDescription>PAR BA LON461.45NUC461.45END ROE0.758475</attributeDescription> </attributeDetails> </otherPricingInfo> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText> - DATE OF ORIGIN</errorFreeText> </warningText> </warningInformation> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText>BG CXR</errorFreeText> </warningText> </warningInformation> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText>PRICED WITH VALIDATING CARRIER BA - REPRICE IF DIFFERENT VC</errorFreeText> </warningText> </warningInformation> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText>14JUN12 PER GAF REQUIREMENTS FARE NOT VALID UNTIL TICKETED</errorFreeText> </warningText> </warningInformation> <automaticReissueInfo> <ticketInfo> <documentDetails> <number>12312356789</number> <type>ET</type> </documentDetails> </ticketInfo> <couponInfo> <couponDetails> <cpnNumber>1</cpnNumber> </couponDetails> </couponInfo> <baseFareInfo> <monetaryDetails> <typeQualifier>IBA</typeQualifier> <amount>119.00</amount> <currency>EUR</currency> </monetaryDetails> </baseFareInfo> <firstDpiGroup> <reIssuePenalty> <penDisData> <penaltyAmount>0</penaltyAmount> <penaltyCurrency>EUR</penaltyCurrency> </penDisData> </reIssuePenalty> <reissueInfo> <monetaryDetails> <typeQualifier>RES</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>RTO</typeQualifier> <amount>502.50</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TSC</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TST</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>RTA</typeQualifier> <amount>383.50</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TAC</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>MON</typeQualifier> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>ITA</typeQualifier> <amount>383.50</amount> <currency>EUR</currency> </otherMonetaryDetails> </reissueInfo> <oldTaxInfo> <monetaryDetails> <typeQualifier>BEQ</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>BGT</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BTA</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BTO</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </otherMonetaryDetails> </oldTaxInfo> <reissueBalanceInfo> <monetaryDetails> <typeQualifier>700</typeQualifier> </monetaryDetails> </reissueBalanceInfo> </firstDpiGroup> <secondDpiGroup> <penalty> <penDisData> <penaltyQualifier>707</penaltyQualifier> </penDisData> </penalty> <residualValueInfo> <monetaryDetails> <typeQualifier>700</typeQualifier> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>701</typeQualifier> </otherMonetaryDetails> </residualValueInfo> <oldTaxInfo> <monetaryDetails> <typeQualifier>700</typeQualifier> </monetaryDetails> </oldTaxInfo> <issueBalanceInfo> <monetaryDetails> <typeQualifier>703</typeQualifier> </monetaryDetails> </issueBalanceInfo> </secondDpiGroup> <reissueAttributes> <attributeDetails> <attributeType>NET</attributeType> <attributeDescription>1</attributeDescription> </attributeDetails> </reissueAttributes> </automaticReissueInfo> </fareList> </Ticket\_RepricePNRWithLowestFareReply>

## 5.3.3 Possible Errors

See "Error Messages" section.

* * *

## 5.4 Operation: Award

This example shows an Award option applied on a repricing. Award option is used to reprice an award ticket with award fares, that is, in miles. In the query, both airline code and corporate code (numeric or not) are mandatory.

In case specified carrier is IRU customer, some specific checks and process apply. For more details, please refer to IRU specifications.

## 5.4.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_RepricePNRWithLowestFare xmlns="http://xml.amadeus.com/TARIBQ\_12\_2\_1A"> <ticketInfo> <paperticketDetailsFirstCoupon> <documentDetails> <number>0572191800680</number> <type>ET</type> </documentDetails> </paperticketDetailsFirstCoupon> <passengerSelection> <referenceDetails> <type>PA</type> <value>1</value> </referenceDetails> </passengerSelection> </ticketInfo> <originalPricingOptionsGroup> <overrideInformation> <attributeDetails> <attributeType>M</attributeType> <attributeDescription>AF</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>RU</attributeType> </attributeDetails> <attributeDetails> <attributeType>RW</attributeType> <attributeDescription>000024</attributeDescription> </attributeDetails> </overrideInformation> </originalPricingOptionsGroup> </Ticket\_RepricePNRWithLowestFare>

## 5.4.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_RepricePNRWithLowestFareReply xmlns="http://xml.amadeus.com/TARIBR\_12\_2\_1A"> <fareList> <pricingInformation> <tstInformation> <tstIndicator>F</tstIndicator> </tstInformation> <fcmi>N</fcmi> </pricingInformation> <fareReference> <referenceType>TST</referenceType> <uniqueReference>1</uniqueReference> </fareReference> <paxSegReference> <refDetails> <refQualifier>PA</refQualifier> <refNumber>1</refNumber> </refDetails> </paxSegReference> <fareDataInformation> <fareDataMainInformation> <fareDataQualifier>Y</fareDataQualifier> </fareDataMainInformation> <fareDataSupInformation> <fareDataQualifier>B</fareDataQualifier> <fareAmount>1631.00</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataSupInformation> <fareDataSupInformation> <fareDataQualifier>712</fareDataQualifier> <fareAmount>0.00</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataSupInformation> <fareDataSupInformation> <fareDataQualifier>H</fareDataQualifier> <fareAmount>1631.00</fareAmount> </fareDataSupInformation> </fareDataInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>YQ</isoCountry> </taxType> <taxNature>AC</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>180.00</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>QX</isoCountry> </taxType> <taxNature>AP</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>21.47</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>IZ</isoCountry> </taxType> <taxNature>EB</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>4.00</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>FR</isoCountry> </taxType> <taxNature>SE</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>7.04</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>FR</isoCountry> </taxType> <taxNature>TI</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>10.38</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>YC</isoCountry> </taxType> <taxNature>AE</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>4.10</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>US</isoCountry> </taxType> <taxNature>AP</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>12.01</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>US</isoCountry> </taxType> <taxNature>AS</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>12.01</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>XA</isoCountry> </taxType> <taxNature>CO</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>3.73</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>XY</isoCountry> </taxType> <taxNature>CR</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>5.22</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>AY</isoCountry> </taxType> <taxNature>SE</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>1.87</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>XF</isoCountry> </taxType> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>3.36</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <originDestination> <cityCode>PAR</cityCode> <cityCode>PAR</cityCode> </originDestination> <segmentInformation> <connexInformation> <connecDetails> <connexType>O</connexType> </connecDetails> </connexInformation> <segDetails> <segmentDetail> <identification>AIR</identification> <classOfService>B</classOfService> </segmentDetail> <ticketingStatus>OK</ticketingStatus> </segDetails> <fareQualifier> <fareBasisDetails> <primaryCode>BDI</primaryCode> <fareBasisCode>STRIB</fareBasisCode> </fareBasisDetails> </fareQualifier> <validityInformation> <businessSemantic>A</businessSemantic> <dateTime> <year>2009</year> <month>5</month> <day>10</day> </dateTime> </validityInformation> <bagAllowanceInformation> <bagAllowanceDetails> <baggageQuantity>2</baggageQuantity> <baggageType>N</baggageType> </bagAllowanceDetails> </bagAllowanceInformation> <segmentReference> <refDetails> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </refDetails> </segmentReference> <sequenceInformation> <sequenceSection> <sequenceNumber>1</sequenceNumber> </sequenceSection> </sequenceInformation> </segmentInformation> <segmentInformation> <connexInformation> <connecDetails> <connexType>O</connexType> </connecDetails> </connexInformation> <segDetails> <segmentDetail> <identification>AIR</identification> <classOfService>B</classOfService> </segmentDetail> <ticketingStatus>OK</ticketingStatus> </segDetails> <fareQualifier> <fareBasisDetails> <primaryCode>BDI</primaryCode> <fareBasisCode>STRIB</fareBasisCode> </fareBasisDetails> </fareQualifier> <validityInformation> <businessSemantic>B</businessSemantic> <dateTime> <year>2009</year> <month>11</month> <day>12</day> </dateTime> </validityInformation> <validityInformation> <businessSemantic>A</businessSemantic> <dateTime> <year>2009</year> <month>5</month> <day>10</day> </dateTime> </validityInformation> <bagAllowanceInformation> <bagAllowanceDetails> <baggageQuantity>2</baggageQuantity> <baggageType>N</baggageType> </bagAllowanceDetails> </bagAllowanceInformation> <segmentReference> <refDetails> <refQualifier>S</refQualifier> <refNumber>3</refNumber> </refDetails> </segmentReference> <sequenceInformation> <sequenceSection> <sequenceNumber>2</sequenceNumber> </sequenceSection> </sequenceInformation> </segmentInformation> <otherPricingInfo> <attributeDetails> <attributeType>PAY</attributeType> <attributeDescription>IT4AFKL/TM</attributeDescription> </attributeDetails> </otherPricingInfo> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText>CAT35NEGOTIATED</errorFreeText> </warningText> </warningInformation> <automaticReissueInfo> <ticketInfo> <documentDetails> <number>0572191800680</number> <type>ET</type> </documentDetails> </ticketInfo> <couponInfo> <couponDetails> <cpnNumber>1</cpnNumber> </couponDetails> </couponInfo> <baseFareInfo> <monetaryDetails> <typeQualifier>IBA</typeQualifier> <amount>1631.00</amount> <currency>EUR</currency> </monetaryDetails> </baseFareInfo> <firstDpiGroup> <reIssuePenalty> <penDisData> <penaltyAmount>0.00</penaltyAmount> <penaltyCurrency>EUR</penaltyCurrency> </penDisData> </reIssuePenalty> <reissueInfo> <monetaryDetails> <typeQualifier>TAC</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>RTA</typeQualifier> <amount>265.19</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TST</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TSC</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>RTO</typeQualifier> <amount>1896.19</amount> <currency>EUR</currency> </otherMonetaryDetails> </reissueInfo> <oldTaxInfo> <monetaryDetails> <typeQualifier>ITA</typeQualifier> <amount>265.19</amount> <currency>EUR</currency> </monetaryDetails> </oldTaxInfo> <reissueBalanceInfo> <monetaryDetails> <typeQualifier>BEQ</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>BTO</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BTA</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BGT</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </otherMonetaryDetails> </reissueBalanceInfo> </firstDpiGroup> <secondDpiGroup> <penalty></penalty> <residualValueInfo> <monetaryDetails> <typeQualifier>RES</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> </residualValueInfo> <oldTaxInfo> <monetaryDetails> <typeQualifier>ITA</typeQualifier> <amount>265.19</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>ITO</typeQualifier> <amount>1896.19</amount> <currency>EUR</currency> </otherMonetaryDetails> </oldTaxInfo> <issueBalanceInfo> <monetaryDetails> <typeQualifier>BTA</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>BTO</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </otherMonetaryDetails> </issueBalanceInfo> </secondDpiGroup> </automaticReissueInfo> </fareList> </Ticket\_RepricePNRWithLowestFareReply>

## 5.4.3 Possible Errors

See "Error Messages" section.

* * *

## 5.5 Operation: Award Fare Per Tier Level

This example shows how to force the tier level for the calculation of award fares.

This option is only available for IRU customers. Thus, some specific IRU checks and process apply. For more details, please refer to IRU specifications.

Edifact is _ATC++RTL:MMC'_

Equivalent cryptic entry is _FXE/R,U\*000001,TL-MMC_

## 5.5.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_RepricePNRWithLowestFare xmlns="http://xml.amadeus.com/TARIBQ\_12\_2\_1A"> <ticketInfo> <paperticketDetailsFirstCoupon> <documentDetails> <number>1722191800680</number> <type>ET</type> </documentDetails> </paperticketDetailsFirstCoupon> <passengerSelection> <referenceDetails> <type>PA</type> <value>1</value> </referenceDetails> </passengerSelection> </ticketInfo> <originalPricingOptionsGroup> <overrideInformation> <attributeDetails> <attributeType>M</attributeType> <attributeDescription>6X</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>RW</attributeType> <attributeDescription>000001</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>RTL</attributeType> <attributeDescription>MMC</attributeDescription> </attributeDetails> </overrideInformation> </originalPricingOptionsGroup> </Ticket\_RepricePNRWithLowestFare>

## 5.5.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.5.3 Possible Errors

See "Error Messages" section.

* * *

## 5.6 Operation: Cabin Option

This example a re-pricing with a cabin option.

In Edifact: _ATC++CAB:F'_

Equivalent in cryptic: _FXE/KF_

## 5.6.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_RepricePNRWithLowestFare xmlns="http://xml.amadeus.com/TARIBQ\_12\_2\_1A"> <ticketInfo> <paperticketDetailsFirstCoupon> <documentDetails> <number>0572146640300</number> <type>ET</type> </documentDetails> </paperticketDetailsFirstCoupon> <passengerSelection> <referenceDetails> <type>P</type> <value>1</value> </referenceDetails> </passengerSelection> </ticketInfo> <originalPricingOptionsGroup> <overrideInformation> <attributeDetails> <attributeType>CAB</attributeType> <attributeDescription>F</attributeDescription> </attributeDetails> </overrideInformation> </originalPricingOptionsGroup> </Ticket\_RepricePNRWithLowestFare>

## 5.6.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.6.3 Possible Errors

See "Error Messages" section.

* * *

## 5.7 Operation: Checked-in coupon selection

The aim of introducing this option is to enable the agent to check repricing result before Cheking out the coupons.  
  
When using an informative repricing entry TARIPQ/BQ, the agent has the possibility to pass the first coupon from which the cheched-in coupons C, must be considered as Open for calculation.  
  
The system will then consider Open, the selected coupon but also all the following C coupons of the ticket and/or the conjunctive one and  turn them to Open in the call to PSP.  
  
Equivalent cryptic entry is FXE/CK1  
  
In Edifact: ATC++CK:1

## 5.7.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_RepricePNRWithLowestFare xmlns="http://xml.amadeus.com/TARIBQ\_12\_2\_1A"> <ticketInfo> <paperticketDetailsFirstCoupon> <documentDetails> <number>0572191800680</number> <type>ET</type> </documentDetails> </paperticketDetailsFirstCoupon> <passengerSelection> <referenceDetails> <type>PA</type> <value>1</value> </referenceDetails> </passengerSelection> </ticketInfo> <originalPricingOptionsGroup> <overrideInformation> <attributeDetails> <attributeType>CK</attributeType> <attributeDescription>1</attributeDescription> </attributeDetails> </overrideInformation> </originalPricingOptionsGroup> </Ticket\_RepricePNRWithLowestFare>

## 5.7.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.7.3 Possible Errors

See "Error Messages" section.

* * *

## 5.8 Operation: Controlling carrier Override

This example shows a Controlling carrier override option at repricing input.

This option enables the agent to specify the controlling carrier while performing the repricing entry so that PSP can take this value into account for their calculations.

This option is not available in cryptic mode.

In Edifact: _ATC++CC:AF'_

## 5.8.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_RepricePNRWithLowestFare xmlns="http://xml.amadeus.com/TARIBQ\_12\_2\_1A"> <ticketInfo> <paperticketDetailsFirstCoupon> <documentDetails> <number>0572191800680</number> <type>ET</type> </documentDetails> </paperticketDetailsFirstCoupon> <passengerSelection> <referenceDetails> <type>PA</type> <value>1</value> </referenceDetails> </passengerSelection> </ticketInfo> <originalPricingOptionsGroup> <overrideInformation> <attributeDetails> <attributeType>CC</attributeType> <attributeDescription>AF</attributeDescription> </attributeDetails> </overrideInformation> </originalPricingOptionsGroup> </Ticket\_RepricePNRWithLowestFare>

## 5.8.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.8.3 Possible Errors

See "Error Messages" section.

* * *

## 5.9 Operation: Corporate Fare

This example shows re-pricing with a corporate Fare option.

In Edifact: _ATC++RW:123456'_

In Cryptic: _FXE**/**R,U123456_

Up to Six Corporate codes or names or a mix of them can be included in a Single Re-Pricing request.

## 5.9.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_RepricePNRWithLowestFare xmlns="http://xml.amadeus.com/TARIBQ\_12\_2\_1A"> <ticketInfo> <paperticketDetailsFirstCoupon> <documentDetails> <number>0572146640300</number> <type>ET</type> </documentDetails> </paperticketDetailsFirstCoupon> <passengerSelection> <referenceDetails> <type>P</type> <value>1</value> </referenceDetails> </passengerSelection> </ticketInfo> <originalPricingOptionsGroup> <overrideInformation> <attributeDetails> <attributeType>RW</attributeType> <attributeDescription>123456</attributeDescription> </attributeDetails> </overrideInformation> </originalPricingOptionsGroup> </Ticket\_RepricePNRWithLowestFare>

## 5.9.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.9.3 Possible Errors

See "Error Messages" section.

* * *

## 5.10 Operation: Cumulative PTC or Discount

This example shows the cumulative PTC override or discount option applied on a repricing.

To apply CH and UNN discounts/PTC to passenger one:

_DPI+701+:::CH\*:::UNN'  
REF+PA:1'_

The equivalent cryptic entry is _FXE/RCH-UNN/P1_

## 5.10.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_RepricePNRWithLowestFare xmlns="http://xml.amadeus.com/TARIBQ\_12\_2\_1A"> <ticketInfo> <paperticketDetailsFirstCoupon> <documentDetails> <number>0572146640300</number> <type>ET</type> </documentDetails> </paperticketDetailsFirstCoupon> <passengerSelection> <referenceDetails> <type>PA</type> <value>1</value> </referenceDetails> </passengerSelection> </ticketInfo> <originalPricingOptionsGroup> <overrideInformation> <attributeDetails> <attributeType>NOP</attributeType> </attributeDetails> </overrideInformation> <discountInformation> <penDisInformation> <infoQualifier>701</infoQualifier> <penDisData> <discountCode>ZZ</discountCode> </penDisData> <penDisData> <discountCode>DL</discountCode> </penDisData> </penDisInformation> <referenceQualifier> <refDetails> <refQualifier>PA</refQualifier> <refNumber>1</refNumber> </refDetails> </referenceQualifier> </discountInformation> </originalPricingOptionsGroup> </Ticket\_RepricePNRWithLowestFare>

## 5.10.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.10.3 Possible Errors

See "Error Messages" section.

* * *

## 5.11 Operation: Date Override

It is possible to override pricing date.

equivalent cryptic: fxe/R,05DEC11

## 5.11.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_RepricePNRWithLowestFare xmlns="http://xml.amadeus.com/TARIBQ\_12\_2\_1A"> <ticketInfo> <paperticketDetailsFirstCoupon> <documentDetails> <number>123123456789</number> <type>ET</type> </documentDetails> </paperticketDetailsFirstCoupon> <passengerSelection> <referenceDetails> <type>PA</type> <value>1</value> </referenceDetails> </passengerSelection> </ticketInfo> <pasSegmentSelection> <referenceDetails> <type>S</type> <value>1</value> </referenceDetails> <referenceDetails> <type>S</type> <value>2</value> </referenceDetails> </pasSegmentSelection> <originalPricingOptionsGroup> <overrideInformation> <attributeDetails> <attributeType>NOP</attributeType> </attributeDetails> </overrideInformation> <dateOverride> <businessSemantic>DAT</businessSemantic> <dateTime> <year>2011</year> <month>12</month> <day>05</day> </dateTime> </dateOverride> </originalPricingOptionsGroup> </Ticket\_RepricePNRWithLowestFare>

## 5.11.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.11.3 Possible Errors

See "Error Messages" section.

* * *

## 5.12 Operation: Default Currency Override

This example shows a default currency override option applied on a repricing. The currency provided in the request will override the default currency of selling of the office performing the repricing.

Codeset _706_ has to be provided in _typeQualifier_. If another codeset is provided, no currency override will be performed and no error message will be returned.

In Edifact: _MON+706::EUR'_

In Cryptic: _FXE/R,FC-EUR_

## 5.12.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_RepricePNRWithLowestFare xmlns="http://xml.amadeus.com/TARIBQ\_12\_2\_1A"> <ticketInfo> <paperticketDetailsFirstCoupon> <documentDetails> <number>0572146640092</number> <type>ET</type> </documentDetails> </paperticketDetailsFirstCoupon> <passengerSelection> <referenceDetails> <type>PA</type> <value>1</value> </referenceDetails> </passengerSelection> </ticketInfo> <originalPricingOptionsGroup> <overrideInformation> <attributeDetails> <attributeType>NOP</attributeType> </attributeDetails> </overrideInformation> <overrideCurrency> <monetaryDetails> <typeQualifier>706</typeQualifier> <currency>EUR</currency> </monetaryDetails> </overrideCurrency> </originalPricingOptionsGroup> </Ticket\_RepricePNRWithLowestFare>

## 5.12.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.12.3 Possible Errors

See "Error Messages" section.

* * *

## 5.13 Operation: Exempt Taxes

Option allows to exempt somes taxes

In the field _taxIdenfier_ you are supposed to choose the code-set EXM, i.e exempt tax.

You can specify a tax. If you don’t specify it, all taxes will be exempted.

We can exempt :

\* all the taxes: _TAX+7+EXM_

\* Display Code: _TAX+7+EXM+YQ_

\* Display Code + Nature Code: _TAX+7+EXM+FR+SE  
_

The TST is created as Automatic and "EXEMPT" is stored instead of the amount

## 5.13.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_RepricePNRWithLowestFare xmlns="http://xml.amadeus.com/TARIBQ\_12\_2\_1A"> <ticketInfo> <paperticketDetailsFirstCoupon> <documentDetails> <number>12312356789</number> <type>ET</type> </documentDetails> </paperticketDetailsFirstCoupon> <passengerSelection> <referenceDetails> <type>PA</type> <value>1</value> </referenceDetails> </passengerSelection> </ticketInfo> <originalPricingOptionsGroup> <overrideInformation> <attributeDetails> <attributeType>NOP</attributeType> </attributeDetails> </overrideInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>EXM</taxIdentifier> </taxIdentification> <taxType> <isoCountry>FR</isoCountry> </taxType> <taxNature>SE</taxNature> </taxDetails> </originalPricingOptionsGroup> </Ticket\_RepricePNRWithLowestFare>

## 5.13.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.13.3 Possible Errors

See "Error Messages" section.

* * *

## 5.14 Operation: Expanded Parameter (EU)

Please refer to chapter "Expanded Parameter rule and fare-type" for more information

EU: Economy Unrestricted fares

In Edifact: _ATC++PRM:EU'_

The equivalent cryptic entry is:  
FXE/R,\*EU  
Or  
FXE/R,XP-EU

## 5.14.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_RepricePNRWithLowestFare xmlns="http://xml.amadeus.com/TARIBQ\_12\_2\_1A"> <ticketInfo> <paperticketDetailsFirstCoupon> <documentDetails> <number>1250123456789</number> <type>ET</type> </documentDetails> </paperticketDetailsFirstCoupon> <passengerSelection> <referenceDetails> <type>PA</type> <value>1</value> </referenceDetails> </passengerSelection> </ticketInfo> <originalPricingOptionsGroup> <overrideInformation> <attributeDetails> <attributeType>PRM</attributeType> <attributeDescription>EU</attributeDescription> </attributeDetails> </overrideInformation> </originalPricingOptionsGroup> </Ticket\_RepricePNRWithLowestFare>

## 5.14.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.14.3 Possible Errors

See "Error Messages" section.

* * *

## 5.15 Operation: Expanded Parameter (NAP)

Please refer to chapter "Expanded Parameter rule and fare-type" for more information

NAP: No Advance Purchase Requirements

In Edifact: _ATC++PRM:NAP'_

The equivalent cryptic entry is:  
FXE/R,\*NAP  
Or  
FXE/R,XP-NAP

## 5.15.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_RepricePNRWithLowestFare xmlns="http://xml.amadeus.com/TARIBQ\_12\_2\_1A"> <ticketInfo> <paperticketDetailsFirstCoupon> <documentDetails> <number>1250123456789</number> <type>ET</type> </documentDetails> </paperticketDetailsFirstCoupon> <passengerSelection> <referenceDetails> <type>PA</type> <value>1</value> </referenceDetails> </passengerSelection> </ticketInfo> <originalPricingOptionsGroup> <overrideInformation> <attributeDetails> <attributeType>PRM</attributeType> <attributeDescription>NAP</attributeDescription> </attributeDetails> </overrideInformation> </originalPricingOptionsGroup> </Ticket\_RepricePNRWithLowestFare>

## 5.15.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.15.3 Possible Errors

See "Error Messages" section.

* * *

## 5.16 Operation: Expanded Parameter (NDA)

Please refer to chapter "Expanded Parameter rule and fare-type" for more information

NDA: NO Day and Time Restrictions

In Edifact: _ATC++PRM:NDA'_

The equivalent cryptic entry is:  
FXE/R,\*NDA  
Or  
FXE/R,XP-NDA

## 5.16.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_RepricePNRWithLowestFare xmlns="http://xml.amadeus.com/TARIBQ\_12\_2\_1A"> <ticketInfo> <paperticketDetailsFirstCoupon> <documentDetails> <number>1250123456789</number> <type>ET</type> </documentDetails> </paperticketDetailsFirstCoupon> <passengerSelection> <referenceDetails> <type>PA</type> <value>1</value> </referenceDetails> </passengerSelection> </ticketInfo> <originalPricingOptionsGroup> <overrideInformation> <attributeDetails> <attributeType>PRM</attributeType> <attributeDescription>NDA</attributeDescription> </attributeDetails> </overrideInformation> </originalPricingOptionsGroup> </Ticket\_RepricePNRWithLowestFare>

## 5.16.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.16.3 Possible Errors

See "Error Messages" section.

* * *

## 5.17 Operation: Expanded Parameter (NMM)

Please refer to chapter "Expanded Parameter rule and fare-type" for more information

NMM: No Minimum and No Maximum Stay Requirements

In Edifact: _ATC++PRM:NMM'_

The equivalent cryptic entry is:

FXE/R,\*NMM  
Or  
FXE/R,XP-NMM

## 5.17.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_RepricePNRWithLowestFare xmlns="http://xml.amadeus.com/TARIBQ\_12\_2\_1A"> <ticketInfo> <paperticketDetailsFirstCoupon> <documentDetails> <number>1250123456789</number> <type>ET</type> </documentDetails> </paperticketDetailsFirstCoupon> <passengerSelection> <referenceDetails> <type>PA</type> <value>1</value> </referenceDetails> </passengerSelection> </ticketInfo> <originalPricingOptionsGroup> <overrideInformation> <attributeDetails> <attributeType>PRM</attributeType> <attributeDescription>NMM</attributeDescription> </attributeDetails> </overrideInformation> </originalPricingOptionsGroup> </Ticket\_RepricePNRWithLowestFare>

## 5.17.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.17.3 Possible Errors

See "Error Messages" section.

* * *

## 5.18 Operation: Expanded Parameter (NMN)

Please refer to chapter "Expanded Parameter rule and fare-type" for more information

NMN: No Minimum Stay Requirement

In Edifact: _ATC++PRM:NMN'_

The equivalent cryptic entry is:  
FXE/R,\*NMN  
Or  
FXE/R,XP-NMN

## 5.18.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_RepricePNRWithLowestFare xmlns="http://xml.amadeus.com/TARIBQ\_12\_2\_1A"> <ticketInfo> <paperticketDetailsFirstCoupon> <documentDetails> <number>1250123456789</number> <type>ET</type> </documentDetails> </paperticketDetailsFirstCoupon> <passengerSelection> <referenceDetails> <type>PA</type> <value>1</value> </referenceDetails> </passengerSelection> </ticketInfo> <originalPricingOptionsGroup> <overrideInformation> <attributeDetails> <attributeType>PRM</attributeType> <attributeDescription>NMN</attributeDescription> </attributeDetails> </overrideInformation> </originalPricingOptionsGroup> </Ticket\_RepricePNRWithLowestFare>

## 5.18.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.18.3 Possible Errors

See "Error Messages" section.

* * *

## 5.19 Operation: Expanded Parameter (NMX)

Please refer to chapter "Expanded Parameter rule and fare-type" for more information

NMX: No Maximum Stay Requirement

In Edifact: _ATC++PRM:NMX'_

The equivalent cryptic entry is:  
FXE/R,\*NMX  
Or  
FXE/R,XP-NMX

## 5.19.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_RepricePNRWithLowestFare xmlns="http://xml.amadeus.com/TARIBQ\_12\_2\_1A"> <ticketInfo> <paperticketDetailsFirstCoupon> <documentDetails> <number>1250123456789</number> <type>ET</type> </documentDetails> </paperticketDetailsFirstCoupon> <passengerSelection> <referenceDetails> <type>PA</type> <value>1</value> </referenceDetails> </passengerSelection> </ticketInfo> <originalPricingOptionsGroup> <overrideInformation> <attributeDetails> <attributeType>PRM</attributeType> <attributeDescription>NMX</attributeDescription> </attributeDetails> </overrideInformation> </originalPricingOptionsGroup> </Ticket\_RepricePNRWithLowestFare>

## 5.19.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.19.3 Possible Errors

See "Error Messages" section.

* * *

## 5.20 Operation: Expanded Parameter (NPE)

Please refer to chapter "Expanded Parameter rule and fare-type" for more information

NPE: No Penalty Restrictions

In Edifact: _ATC++PRM:NPE'_

The equivalent cryptic entry is:  
FXE/R,\*NPE  
Or  
FXE/R,XP-NPE

## 5.20.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_RepricePNRWithLowestFare xmlns="http://xml.amadeus.com/TARIBQ\_12\_2\_1A"> <ticketInfo> <paperticketDetailsFirstCoupon> <documentDetails> <number>1250123456789</number> <type>ET</type> </documentDetails> </paperticketDetailsFirstCoupon> <passengerSelection> <referenceDetails> <type>PA</type> <value>1</value> </referenceDetails> </passengerSelection> </ticketInfo> <originalPricingOptionsGroup> <overrideInformation> <attributeDetails> <attributeType>PRM</attributeType> <attributeDescription>NPE</attributeDescription> </attributeDetails> </overrideInformation> </originalPricingOptionsGroup> </Ticket\_RepricePNRWithLowestFare>

## 5.20.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.20.3 Possible Errors

See "Error Messages" section.

* * *

## 5.21 Operation: Expanded Parameter (NR)

Please refer to chapter "Expanded Parameter rule and fare-type" for more information

NR Fares with No Restriction

In Edifact: _ATC++PRM:NR'_

The equivalent cryptic entry is:  
FXE/R,\*NR  
Or  
FXE/R,XP-NR

## 5.21.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_RepricePNRWithLowestFare xmlns="http://xml.amadeus.com/TARIBQ\_12\_2\_1A"> <ticketInfo> <paperticketDetailsFirstCoupon> <documentDetails> <number>1250123456789</number> <type>ET</type> </documentDetails> </paperticketDetailsFirstCoupon> <passengerSelection> <referenceDetails> <type>PA</type> <value>1</value> </referenceDetails> </passengerSelection> </ticketInfo> <originalPricingOptionsGroup> <overrideInformation> <attributeDetails> <attributeType>PRM</attributeType> <attributeDescription>NR</attributeDescription> </attributeDetails> </overrideInformation> </originalPricingOptionsGroup> </Ticket\_RepricePNRWithLowestFare>

## 5.21.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.21.3 Possible Errors

See "Error Messages" section.

* * *

## 5.22 Operation: Expanded Parameter (NRF)

Please refer to chapter "Expanded Parameter rule and fare-type" for more information

NRF: Non-Refundable

In Edifact: _ATC++PRM:NRF'_

The equivalent cryptic entry is:  
FXE/R,\*NRF  
Or  
FXE/R,XP-NRF

## 5.22.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_RepricePNRWithLowestFare xmlns="http://xml.amadeus.com/TARIBQ\_12\_2\_1A"> <ticketInfo> <paperticketDetailsFirstCoupon> <documentDetails> <number>1250123456789</number> <type>ET</type> </documentDetails> </paperticketDetailsFirstCoupon> <passengerSelection> <referenceDetails> <type>PA</type> <value>1</value> </referenceDetails> </passengerSelection> </ticketInfo> <originalPricingOptionsGroup> <overrideInformation> <attributeDetails> <attributeType>PRM</attributeType> <attributeDescription> NRF</attributeDescription> </attributeDetails> </overrideInformation> </originalPricingOptionsGroup> </Ticket\_RepricePNRWithLowestFare>

## 5.22.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.22.3 Possible Errors

See "Error Messages" section.

* * *

## 5.23 Operation: Expanded Parameter (PE Amount)

Please refer to chapter "Expanded Parameter rule and fare-type" for more information

PE: Penalty Restrictions

Penalty limited to "nn" Amount

In Edifact:  
_ATC++PRM:PE'  
DPI+700+704:707:25'_

The equivalent cryptic entry is:  
FXE/R,\*PE25A  
Or  
FXE/R,XP-PE25A

## 5.23.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_RepricePNRWithLowestFare xmlns="http://xml.amadeus.com/TARIBQ\_12\_2\_1A"> <ticketInfo> <paperticketDetailsFirstCoupon> <documentDetails> <number>1250123456789</number> <type>ET</type> </documentDetails> </paperticketDetailsFirstCoupon> <passengerSelection> <referenceDetails> <type>PA</type> <value>1</value> </referenceDetails> </passengerSelection> </ticketInfo> <originalPricingOptionsGroup> <overrideInformation> <attributeDetails> <attributeType>PRM</attributeType> <attributeDescription>PE</attributeDescription> </attributeDetails> </overrideInformation> <discountInformation> <penDisInformation> <infoQualifier>700</infoQualifier> <penDisData> <penaltyType>704</penaltyType> <penaltyQualifier>707</penaltyQualifier> <penaltyAmount>25</penaltyAmount> </penDisData> </penDisInformation> </discountInformation> </originalPricingOptionsGroup> </Ticket\_RepricePNRWithLowestFare>

## 5.23.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.23.3 Possible Errors

See "Error Messages" section.

* * *

## 5.24 Operation: Expanded Parameter (PE Percent)

Please refer to chapter "Expanded Parameter rule and fare-type" for more information

PE: Penalty Restrictions

Penalty limited to "nn" Percent

In Edifact:  
_ATC++PRM:PE'  
DPI+700+704:708:25'  
_

The equivalent cryptic entry is:  
FXE/R,\*PE25P  
Or  
FXE/R,XP-PE25P

## 5.24.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_RepricePNRWithLowestFare xmlns="http://xml.amadeus.com/TARIBQ\_12\_2\_1A"> <ticketInfo> <paperticketDetailsFirstCoupon> <documentDetails> <number>1250123456789</number> <type>ET</type> </documentDetails> </paperticketDetailsFirstCoupon> <passengerSelection> <referenceDetails> <type>PA</type> <value>1</value> </referenceDetails> </passengerSelection> </ticketInfo> <originalPricingOptionsGroup> <overrideInformation> <attributeDetails> <attributeType>PRM</attributeType> <attributeDescription>PE</attributeDescription> </attributeDetails> </overrideInformation> <discountInformation> <penDisInformation> <infoQualifier>700</infoQualifier> <penDisData> <penaltyType>704</penaltyType> <penaltyQualifier>708</penaltyQualifier> <penaltyAmount>25</penaltyAmount> </penDisData> </penDisInformation> </discountInformation> </originalPricingOptionsGroup> </Ticket\_RepricePNRWithLowestFare>

## 5.24.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.24.3 Possible Errors

See "Error Messages" section.

* * *

## 5.25 Operation: Expanded parameter (PTC)

This example shows a repricing with Forced PTC expanded parameter.

-   When Forced PTC is used alone, original PTC are forced in re-pricing.
-   When Forced PTC is used together with a PTC override, the PTC override is forced.

If no fare is found with the PTC that is forced, the re-pricing is rejected by PSP.

The equivalent cryptic entry is:

-   _FXE/R,\*PTC_ or _FXE/R,XP-PTC  
    _
-   _FXE/RCH,\*PTC_ or _FXE/RCH,XP-PTC_ (if used together with a PTC override)

In Edifact, if used alone:

_ATC++PRM:PTC'  
_

If used together with a PTC override:

_ATC++PRM:PTC'__  
DPI+701+:::CH'  
REF+PA:1'_

## 5.25.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_RepricePNRWithLowestFare xmlns="http://xml.amadeus.com/TARIBQ\_12\_2\_1A"> <ticketInfo> <paperticketDetailsFirstCoupon> <documentDetails> <number>0572146640092</number> <type>ET</type> </documentDetails> </paperticketDetailsFirstCoupon> <passengerSelection> <referenceDetails> <type>P</type> <value>1</value> </referenceDetails> </passengerSelection> </ticketInfo> <pasSegmentSelection> <referenceDetails> <type>S</type> <value>1</value> </referenceDetails> <referenceDetails> <type>S</type> <value>2</value> </referenceDetails> </pasSegmentSelection> <originalPricingOptionsGroup> <overrideInformation> <attributeDetails> <attributeType>PRM</attributeType> <attributeDescription>PTC</attributeDescription> </attributeDetails> </overrideInformation> </originalPricingOptionsGroup> </Ticket\_RepricePNRWithLowestFare>

## 5.25.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.25.3 Possible Errors

See "Error Messages" section.

* * *

## 5.26 Operation: Expanded Parameter (RF)

Please refer to chapter "Expanded Parameter rule and fare-type" for more information

RF: Refundable

In Edifact: _ATC++PRM:RF'_

The equivalent cryptic entry is:  
FXE/R,\*RF  
Or  
FXE/R,XP-RF

## 5.26.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_RepricePNRWithLowestFare xmlns="http://xml.amadeus.com/TARIBQ\_12\_2\_1A"> <ticketInfo> <paperticketDetailsFirstCoupon> <documentDetails> <number>1250123456789</number> <type>ET</type> </documentDetails> </paperticketDetailsFirstCoupon> <passengerSelection> <referenceDetails> <type>PA</type> <value>1</value> </referenceDetails> </passengerSelection> </ticketInfo> <originalPricingOptionsGroup> <overrideInformation> <attributeDetails> <attributeType>PRM</attributeType> <attributeDescription>RF</attributeDescription> </attributeDetails> </overrideInformation> </originalPricingOptionsGroup> </Ticket\_RepricePNRWithLowestFare>

## 5.26.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.26.3 Possible Errors

See "Error Messages" section.

* * *

## 5.27 Operation: Expanded Parameter rule and fare-type

Expanded Parameters refer to the use of expanded rule and fare-type option(s) in a Re-pricing request in order to narrow the range of fares to be considered to just those with the values specified in the Re-pricing entry.

Here the parameters:

-   NAP: No Advance Purchase Requirements
-   NMN: No Minimum Stay Requirement
-   NMX: No Maximum Stay Requirement
-   NMM: No Minimum and No Maximum Stay Requirements
-   NDA: NO Day and Time Restrictions
-   PE: Penalty Restrictions (Penalty limited to "nn" Percent or "nn" Amount)
-   NPE: No Penalty Restrictions
-   RF: Refundable
-   NRF: Non-Refundable
-   NR Fares with No Restriction
-   EU: Economy Unrestricted fares

Most of the Parameters are compatible: Nevertheless some options will NOT be allowed within the same entry. For example, an entry can NOT contain PE (Penalty restrictions) and NPE (NO Penalty Restrictions) which are the same rule element stated as a positive and a negative.

The following matrix shows the combinations that are NOT allowed. The asterisk preceding the two/three letter code designates a fare type option, while the absence of an asterisk indicates that such Expanded Pricing option is a Rule category related option. The X indicates disallowed combinations.

  

NAP

NMM

NMN

NMX

NR

NDA

PE

NPE

RF

NRF

EU

NAP

X

  

  

  

X

  

  

  

  

  

  

NMM

  

X

X

X

X

  

  

  

  

  

  

NMN

  

X

X

  

X

  

  

  

  

  

  

NMX

  

X

  

X

X

  

  

  

  

  

  

NR

X

X

X

X

X

X

X

X

X

X

  

NDA

  

  

  

  

X

X

  

  

  

  

  

PE

  

  

  

  

X

  

X

X

  

  

  

NPE

  

  

  

  

X

  

X

X

  

X

  

RF

  

  

  

  

X

  

  

  

X

X

  

NRF

  

  

  

  

X

  

  

X

X

X

  

EU

  

  

  

  

  

  

  

  

  

  

X

This example shows requirements No Advance Purchase, No Minimum Stay and penalty limited to 5%. The corresponding cryptic of the example:

FXE/R,\*NAP,\*NMN,\*PE05P

## 5.27.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_RepricePNRWithLowestFare xmlns="http://xml.amadeus.com/TARIBQ\_12\_2\_1A"> <ticketInfo> <paperticketDetailsFirstCoupon> <documentDetails> <number>1250123456789</number> <type>ET</type> </documentDetails> </paperticketDetailsFirstCoupon> <passengerSelection> <referenceDetails> <type>PA</type> <value>1</value> </referenceDetails> </passengerSelection> </ticketInfo> <originalPricingOptionsGroup> <overrideInformation> <attributeDetails> <attributeType>PRM</attributeType> <attributeDescription>NAP</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>PRM</attributeType> <attributeDescription>NMN</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>PRM</attributeType> <attributeDescription>PE</attributeDescription> </attributeDetails> </overrideInformation> <discountInformation> <penDisInformation> <infoQualifier>700</infoQualifier> <penDisData> <penaltyType>704</penaltyType> <penaltyQualifier>708</penaltyQualifier> <penaltyAmount>05</penaltyAmount> </penDisData> </penDisInformation> </discountInformation> </originalPricingOptionsGroup> </Ticket\_RepricePNRWithLowestFare>

## 5.27.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.27.3 Possible Errors

See "Error Messages" section.

* * *

## 5.28 Operation: Hold for future use

This option at PAX level allows to force the Residual value to be refunded on a RTF account

The client can choose to be refunded on an RTF instead of being re-credited. The FOP of the residual value will be flag as RTF

## 5.28.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_RepricePNRWithLowestFare xmlns="http://xml.amadeus.com/TARIBQ\_12\_2\_1A"> <ticketInfo> <paperticketDetailsFirstCoupon> <documentDetails> <number>12312356789</number> <type>ET</type> </documentDetails> </paperticketDetailsFirstCoupon> <overridePaxInformation> <attributeDetails> <attributeType>RTF</attributeType> </attributeDetails> </overridePaxInformation> <passengerSelection> <referenceDetails> <type>PA</type> <value>1</value> </referenceDetails> </passengerSelection> </ticketInfo> <ticketInfo> <paperticketDetailsFirstCoupon> <documentDetails> <number>12312356788</number> <type>ET</type> </documentDetails> </paperticketDetailsFirstCoupon> <overridePaxInformation> <attributeDetails> <attributeType>RTF</attributeType> </attributeDetails> </overridePaxInformation> <passengerSelection> <referenceDetails> <type>PA</type> <value>2</value> </referenceDetails> </passengerSelection> </ticketInfo> <originalPricingOptionsGroup> <overrideInformation> <attributeDetails> <attributeType>NOP</attributeType> </attributeDetails> </overrideInformation> </originalPricingOptionsGroup> </Ticket\_RepricePNRWithLowestFare>

## 5.28.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.28.3 Possible Errors

See "Error Messages" section.

* * *

## 5.29 Operation: Ignore Corporate in BLB

This option will avoid to reuse the corporate store in the BLB on PSP side.

## 5.29.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_RepricePNRWithLowestFare xmlns="http://xml.amadeus.com/TARIBQ\_12\_2\_1A"> <ticketInfo> <paperticketDetailsFirstCoupon> <documentDetails> <number>12312356789</number> <type>ET</type> </documentDetails> </paperticketDetailsFirstCoupon> <passengerSelection> <referenceDetails> <type>PA</type> <value>1</value> </referenceDetails> </passengerSelection> </ticketInfo> <pasSegmentSelection> <referenceDetails> <type>S</type> <value>1</value> </referenceDetails> <referenceDetails> <type>S</type> <value>2</value> </referenceDetails> </pasSegmentSelection> <originalPricingOptionsGroup> <overrideInformation> <attributeDetails> <attributeType>IGC</attributeType> </attributeDetails> </overrideInformation> </originalPricingOptionsGroup> </Ticket\_RepricePNRWithLowestFare>

## 5.29.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.29.3 Possible Errors

See "Error Messages" section.

* * *

## 5.30 Operation: Mileage Accrual

In revenue flow ATC will return the points corresponding to the new fare that are returned. (In case of partially flown ticket , the Mileage accrual amount is computed also with the flown part)

 _Frequent Flyer Airline program is expected with this option_

## 5.30.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_RepricePNRWithLowestFare xmlns="http://xml.amadeus.com/TARIBQ\_12\_2\_1A"> <ticketInfo> <paperticketDetailsFirstCoupon> <documentDetails> <number>12312356789</number> <type>ET</type> </documentDetails> </paperticketDetailsFirstCoupon> <passengerSelection> <referenceDetails> <type>PA</type> <value>1</value> </referenceDetails> </passengerSelection> </ticketInfo> <pasSegmentSelection> <referenceDetails> <type>S</type> <value>1</value> </referenceDetails> <referenceDetails> <type>S</type> <value>2</value> </referenceDetails> </pasSegmentSelection> <originalPricingOptionsGroup> <overrideInformation> <attributeDetails> <attributeType>MAC</attributeType> </attributeDetails> </overrideInformation> </originalPricingOptionsGroup> </Ticket\_RepricePNRWithLowestFare>

## 5.30.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_RepricePNRWithLowestFareReply xmlns="http://xml.amadeus.com/TARIBR\_12\_2\_1A"> <fareList> <pricingInformation> <tstInformation> <tstIndicator>I</tstIndicator> </tstInformation> <fcmi>0</fcmi> </pricingInformation> <fareReference> <referenceType>TST</referenceType> <uniqueReference>1</uniqueReference> </fareReference> <paxSegReference> <refDetails> <refQualifier>PA</refQualifier> <refNumber>2</refNumber> </refDetails> </paxSegReference> <fareDataInformation> <fareDataMainInformation> <fareDataQualifier>R</fareDataQualifier> </fareDataMainInformation> <fareDataSupInformation> <fareDataQualifier>712</fareDataQualifier> <fareAmount>130.00</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataSupInformation> <fareDataSupInformation> <fareDataQualifier>B</fareDataQualifier> <fareAmount>3140.00</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataSupInformation> <fareDataSupInformation> <fareDataQualifier>MAC</fareDataQualifier> <fareAmount>30000</fareAmount> </fareDataSupInformation> </fareDataInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>AE</isoCountry> </taxType> <taxNature>AD</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>75.00</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>TP</isoCountry> </taxType> <taxNature>SE</taxNature> </taxDetails> </taxInformation> <bankerRates> <firstRateDetail> <amount>.808604</amount> </firstRateDetail> </bankerRates> <originDestination> <cityCode>PAR</cityCode> <cityCode>LON</cityCode> </originDestination> <segmentInformation> <connexInformation> <connecDetails> <connexType>O</connexType> </connecDetails> </connexInformation> <segDetails> <segmentDetail> <identification>AIR</identification> <classOfService>Y</classOfService> </segmentDetail> <ticketingStatus>OK</ticketingStatus> </segDetails> <fareQualifier> <fareBasisDetails> <primaryCode>Y2F</primaryCode> <fareBasisCode>LBAOW</fareBasisCode> </fareBasisDetails> </fareQualifier> <validityInformation> <businessSemantic>A</businessSemantic> <dateTime> <year>2013</year> <month>5</month> <day>9</day> </dateTime> </validityInformation> <bagAllowanceInformation> <bagAllowanceDetails> <baggageQuantity>1</baggageQuantity> <baggageType>N</baggageType> </bagAllowanceDetails> </bagAllowanceInformation> <segmentReference> <refDetails> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </refDetails> </segmentReference> <sequenceInformation> <sequenceSection> <sequenceNumber>1</sequenceNumber> </sequenceSection> </sequenceInformation> </segmentInformation> <otherPricingInfo> <attributeDetails> <attributeType>END</attributeType> <attributeDescription>BA ONLY</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>FCA</attributeType> <attributeDescription>PAR BA LON461.45NUC461.45END ROE0.758475</attributeDescription> </attributeDetails> </otherPricingInfo> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText> - DATE OF ORIGIN</errorFreeText> </warningText> </warningInformation> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText>BG CXR</errorFreeText> </warningText> </warningInformation> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText>PRICED WITH VALIDATING CARRIER BA - REPRICE IF DIFFERENT VC</errorFreeText> </warningText> </warningInformation> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText>14JUN12 PER GAF REQUIREMENTS FARE NOT VALID UNTIL TICKETED</errorFreeText> </warningText> </warningInformation> <automaticReissueInfo> <ticketInfo> <documentDetails> <number>12312356789</number> <type>ET</type> </documentDetails> </ticketInfo> <couponInfo> <couponDetails> <cpnNumber>1</cpnNumber> </couponDetails> </couponInfo> <baseFareInfo> <monetaryDetails> <typeQualifier>IBA</typeQualifier> <amount>119.00</amount> <currency>EUR</currency> </monetaryDetails> </baseFareInfo> <firstDpiGroup> <reIssuePenalty> <penDisData> <penaltyAmount>0</penaltyAmount> <penaltyCurrency>EUR</penaltyCurrency> </penDisData> </reIssuePenalty> <reissueInfo> <monetaryDetails> <typeQualifier>RES</typeQualifier> <amount>250.00</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>RTA</typeQualifier> <amount>383.50</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>REU</typeQualifier> <amount>100.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>REF</typeQualifier> <amount>150.00</amount> <currency>EUR</currency> </otherMonetaryDetails> </reissueInfo> <oldTaxInfo> <monetaryDetails> <typeQualifier>ITA</typeQualifier> <amount>383.50</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>ITO</typeQualifier> <amount>502.50</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>NTA</typeQualifier> <amount>30.00</amount> <currency>EUR</currency> </otherMonetaryDetails> </oldTaxInfo> <reissueBalanceInfo> <monetaryDetails> <typeQualifier>BTA</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>BEQ</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BGT</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BTO</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </otherMonetaryDetails> </reissueBalanceInfo> </firstDpiGroup> <secondDpiGroup> <penalty> <penDisData> <penaltyAmount>0</penaltyAmount> <penaltyCurrency>EUR</penaltyCurrency> </penDisData> </penalty> <residualValueInfo> <monetaryDetails> <typeQualifier>RES</typeQualifier> <amount>250.00</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>RTA</typeQualifier> <amount>383.50</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>REU</typeQualifier> <amount>100.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>REF</typeQualifier> <amount>150.00</amount> <currency>EUR</currency> </otherMonetaryDetails> </residualValueInfo> <oldTaxInfo> <monetaryDetails> <typeQualifier>ITA</typeQualifier> <amount>383.50</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>ITO</typeQualifier> <amount>502.50</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>NTA</typeQualifier> <amount>30.00</amount> <currency>EUR</currency> </otherMonetaryDetails> </oldTaxInfo> <issueBalanceInfo> <monetaryDetails> <typeQualifier>BTA</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>BEQ</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BGT</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BTO</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </otherMonetaryDetails> </issueBalanceInfo> </secondDpiGroup> <reissueAttributes> <attributeDetails> <attributeType>NET</attributeType> <attributeDescription>1</attributeDescription> </attributeDetails> </reissueAttributes> </automaticReissueInfo> </fareList> </Ticket\_RepricePNRWithLowestFareReply>

## 5.30.3 Possible Errors

See "Error Messages" section.

* * *

## 5.31 Operation: Miles and Cash

Automated exchange process of redemption tickets paid for in points.

The Mile and cash option (MC)

Frequent Flyer Airline information is retrieved from FQTR in the PNR

## 5.31.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_RepricePNRWithLowestFare xmlns="http://xml.amadeus.com/TARIBQ\_12\_2\_1A"> <ticketInfo> <paperticketDetailsFirstCoupon> <documentDetails> <number>12312356789</number> <type>ET</type> </documentDetails> </paperticketDetailsFirstCoupon> <passengerSelection> <referenceDetails> <type>PA</type> <value>1</value> </referenceDetails> </passengerSelection> </ticketInfo> <pasSegmentSelection> <referenceDetails> <type>S</type> <value>1</value> </referenceDetails> <referenceDetails> <type>S</type> <value>2</value> </referenceDetails> </pasSegmentSelection> <originalPricingOptionsGroup> <overrideInformation> <attributeDetails> <attributeType>MC</attributeType> </attributeDetails> </overrideInformation> </originalPricingOptionsGroup> <frequentFlyerInformationGroup> <flequentFlyerdetails> <frequentTravellerDetails> <carrier>WN</carrier> <tierLevel>GOLD</tierLevel> </frequentTravellerDetails> </flequentFlyerdetails> </frequentFlyerInformationGroup> </Ticket\_RepricePNRWithLowestFare>

## 5.31.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.31.3 Possible Errors

See "Error Messages" section.

* * *

## 5.32 Operation: Netting (Reply)

In case of netting display panel returned by FareQuote, the element NET is set in the ATC segment. Returned value depends on the type of netting:

  

Type of netting

G tax returned

U tax returned

1

Fare + tax

No

No

2

Fare + tax + penalty

No

No

3

Fare + tax + penalty

Yes

Yes

## 5.32.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_RepricePNRWithLowestFare xmlns="http://xml.amadeus.com/TARIBQ\_12\_2\_1A"> <ticketInfo> <paperticketDetailsFirstCoupon> <documentDetails> <number>0812499420160</number> <type>ET</type> </documentDetails> </paperticketDetailsFirstCoupon> <passengerSelection> <referenceDetails> <type>PA</type> <value>1</value> </referenceDetails> </passengerSelection> </ticketInfo> <originalPricingOptionsGroup> <overrideInformation> <attributeDetails> <attributeType>NOP</attributeType> </attributeDetails> </overrideInformation> </originalPricingOptionsGroup> </Ticket\_RepricePNRWithLowestFare>

## 5.32.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_RepricePNRWithLowestFareReply xmlns="http://xml.amadeus.com/TARIBR\_12\_2\_1A"> <fareList> <pricingInformation> <tstInformation> <tstIndicator>F</tstIndicator> </tstInformation> <fcmi>N</fcmi> </pricingInformation> <fareReference> <referenceType>TST</referenceType> <uniqueReference>1</uniqueReference> </fareReference> <paxSegReference> <refDetails> <refQualifier>PA</refQualifier> <refNumber>1</refNumber> </refDetails> </paxSegReference> <fareDataInformation> <fareDataMainInformation> <fareDataQualifier>Y</fareDataQualifier> </fareDataMainInformation> <fareDataSupInformation> <fareDataQualifier>B</fareDataQualifier> <fareAmount>1631.00</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataSupInformation> <fareDataSupInformation> <fareDataQualifier>712</fareDataQualifier> <fareAmount>0.00</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataSupInformation> <fareDataSupInformation> <fareDataQualifier>H</fareDataQualifier> <fareAmount>1631.00</fareAmount> </fareDataSupInformation> </fareDataInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>YQ</isoCountry> </taxType> <taxNature>AC</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>180.00</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>QX</isoCountry> </taxType> <taxNature>AP</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>21.47</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>IZ</isoCountry> </taxType> <taxNature>EB</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>4.00</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>FR</isoCountry> </taxType> <taxNature>SE</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>7.04</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>FR</isoCountry> </taxType> <taxNature>TI</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>10.38</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>YC</isoCountry> </taxType> <taxNature>AE</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>4.10</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>US</isoCountry> </taxType> <taxNature>AP</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>12.01</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>US</isoCountry> </taxType> <taxNature>AS</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>12.01</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>XA</isoCountry> </taxType> <taxNature>CO</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>3.73</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>XY</isoCountry> </taxType> <taxNature>CR</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>5.22</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>AY</isoCountry> </taxType> <taxNature>SE</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>1.87</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>XF</isoCountry> </taxType> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>3.36</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <originDestination> <cityCode>PAR</cityCode> <cityCode>PAR</cityCode> </originDestination> <segmentInformation> <connexInformation> <connecDetails> <connexType>O</connexType> </connecDetails> </connexInformation> <segDetails> <segmentDetail> <identification>AIR</identification> <classOfService>B</classOfService> </segmentDetail> <ticketingStatus>OK</ticketingStatus> </segDetails> <fareQualifier> <fareBasisDetails> <primaryCode>BDI</primaryCode> <fareBasisCode>STRIB</fareBasisCode> </fareBasisDetails> </fareQualifier> <validityInformation> <businessSemantic>A</businessSemantic> <dateTime> <year>2009</year> <month>5</month> <day>10</day> </dateTime> </validityInformation> <bagAllowanceInformation> <bagAllowanceDetails> <baggageQuantity>2</baggageQuantity> <baggageType>N</baggageType> </bagAllowanceDetails> </bagAllowanceInformation> <segmentReference> <refDetails> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </refDetails> </segmentReference> <sequenceInformation> <sequenceSection> <sequenceNumber>1</sequenceNumber> </sequenceSection> </sequenceInformation> </segmentInformation> <segmentInformation> <connexInformation> <connecDetails> <connexType>O</connexType> </connecDetails> </connexInformation> <segDetails> <segmentDetail> <identification>AIR</identification> <classOfService>B</classOfService> </segmentDetail> <ticketingStatus>OK</ticketingStatus> </segDetails> <fareQualifier> <fareBasisDetails> <primaryCode>BDI</primaryCode> <fareBasisCode>STRIB</fareBasisCode> </fareBasisDetails> </fareQualifier> <validityInformation> <businessSemantic>B</businessSemantic> <dateTime> <year>2009</year> <month>11</month> <day>12</day> </dateTime> </validityInformation> <validityInformation> <businessSemantic>A</businessSemantic> <dateTime> <year>2009</year> <month>5</month> <day>10</day> </dateTime> </validityInformation> <bagAllowanceInformation> <bagAllowanceDetails> <baggageQuantity>2</baggageQuantity> <baggageType>N</baggageType> </bagAllowanceDetails> </bagAllowanceInformation> <segmentReference> <refDetails> <refQualifier>S</refQualifier> <refNumber>3</refNumber> </refDetails> </segmentReference> <sequenceInformation> <sequenceSection> <sequenceNumber>2</sequenceNumber> </sequenceSection> </sequenceInformation> </segmentInformation> <otherPricingInfo> <attributeDetails> <attributeType>PAY</attributeType> <attributeDescription>IT4AFKL/TM</attributeDescription> </attributeDetails> </otherPricingInfo> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText>CAT35NEGOTIATED</errorFreeText> </warningText> </warningInformation> <automaticReissueInfo> <ticketInfo> <documentDetails> <number>0812499420160</number> <type>ET</type> </documentDetails> </ticketInfo> <couponInfo> <couponDetails> <cpnNumber>1</cpnNumber> </couponDetails> </couponInfo> <baseFareInfo> <monetaryDetails> <typeQualifier>IBA</typeQualifier> <amount>568.10</amount> <currency>AUD</currency> </monetaryDetails> </baseFareInfo> <firstDpiGroup> <reIssuePenalty> <penDisData> <penaltyAmount>0.00</penaltyAmount> <penaltyCurrency>USD</penaltyCurrency> </penDisData> </reIssuePenalty> <reissueInfo> <monetaryDetails> <typeQualifier>RES</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>TAC</typeQualifier> <amount>286.53</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>RTA</typeQualifier> <amount>87.52</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TST</typeQualifier> <amount>286.53</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TSC</typeQualifier> <amount>286.53</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>RTO</typeQualifier> <amount>7760.5</amount> <currency>USD</currency> </otherMonetaryDetails> </reissueInfo> <oldTaxInfo> <monetaryDetails> <typeQualifier>ITA</typeQualifier> <amount>58.91</amount> <currency>USD</currency> </monetaryDetails> </oldTaxInfo> <reissueBalanceInfo> <monetaryDetails> <typeQualifier>BEQ</typeQualifier> <amount>252.00</amount> <currency>USD</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>BTO</typeQualifier> <amount>286.53</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BTA</typeQualifier> <amount>34.53</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BGT</typeQualifier> <amount>286.53</amount> <currency>USD</currency> </otherMonetaryDetails> </reissueBalanceInfo> </firstDpiGroup> <secondDpiGroup> <penalty> <penDisData> <penaltyAmount>0.00</penaltyAmount> <penaltyCurrency>AUD</penaltyCurrency> </penDisData> </penalty> <residualValueInfo> <monetaryDetails> <typeQualifier>RES</typeQualifier> <amount>0.00</amount> <currency>AUD</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>RTA</typeQualifier> <amount>113.80</amount> <currency>AUD</currency> </otherMonetaryDetails> </residualValueInfo> <oldTaxInfo> <monetaryDetails> <typeQualifier>ITA</typeQualifier> <amount>76.60</amount> <currency>AUD</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>NTA</typeQualifier> <amount>7.70</amount> <currency>AUD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>ITO</typeQualifier> <amount>644.70</amount> <currency>AUD</currency> </otherMonetaryDetails> </oldTaxInfo> <issueBalanceInfo> <monetaryDetails> <typeQualifier>BTA</typeQualifier> <amount>44.90</amount> <currency>AUD</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>BTO</typeQualifier> <amount>373.00</amount> <currency>AUD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BEQ</typeQualifier> <amount>328.10</amount> <currency>AUD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BGT</typeQualifier> <amount>373.00</amount> <currency>AUD</currency> </otherMonetaryDetails> </issueBalanceInfo> </secondDpiGroup> <reissueAttributes> <attributeDetails> <attributeType>NET</attributeType> <attributeDescription>1</attributeDescription> </attributeDetails> </reissueAttributes> </automaticReissueInfo> </fareList> </Ticket\_RepricePNRWithLowestFareReply>

## 5.32.3 Possible Errors

See "Error Messages" section.

* * *

## 5.33 Operation: No Show Penalty (reply)

  
The following example shows a reply containing a No Show penalty, in case this penalty is managed as a tax code.

Edifact reply contains _ATC++PNS:NS'_

In the example, NS is the tax code corresponding to the No Show penalty.  
The amount of the No show penalty is 50 AUD.

## 5.33.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_RepricePNRWithLowestFare xmlns="http://xml.amadeus.com/TARIBQ\_12\_2\_1A"> <ticketInfo> <paperticketDetailsFirstCoupon> <documentDetails> <number>12312356789</number> <type>ET</type> </documentDetails> </paperticketDetailsFirstCoupon> <passengerSelection> <referenceDetails> <type>PA</type> <value>1</value> </referenceDetails> </passengerSelection> </ticketInfo> <pasSegmentSelection> <referenceDetails> <type>S</type> <value>1</value> </referenceDetails> <referenceDetails> <type>S</type> <value>2</value> </referenceDetails> </pasSegmentSelection> <originalPricingOptionsGroup> <overrideInformation> <attributeDetails> <attributeType>NOP</attributeType> </attributeDetails> </overrideInformation> </originalPricingOptionsGroup> </Ticket\_RepricePNRWithLowestFare>

## 5.33.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_RepricePNRWithLowestFareReply xmlns="http://xml.amadeus.com/TARIBR\_12\_2\_1A"> <fareList> <pricingInformation> <tstInformation> <tstIndicator>I</tstIndicator> </tstInformation> <fcmi>0</fcmi> </pricingInformation> <fareReference> <referenceType>TST</referenceType> <uniqueReference>1</uniqueReference> </fareReference> <lastTktDate> <businessSemantic>LT</businessSemantic> <dateTime> <year>2009</year> <month>7</month> <day>26</day> </dateTime> </lastTktDate> <paxSegReference> <refDetails> <refQualifier>PA</refQualifier> <refNumber>1</refNumber> </refDetails> </paxSegReference> <fareDataInformation> <fareDataMainInformation> <fareDataQualifier>R</fareDataQualifier> </fareDataMainInformation> <fareDataSupInformation> <fareDataQualifier>B</fareDataQualifier> <fareAmount>5686.00</fareAmount> <fareCurrency>AUD</fareCurrency> </fareDataSupInformation> <fareDataSupInformation> <fareDataQualifier>712</fareDataQualifier> <fareAmount>2493.00</fareAmount> <fareCurrency>GBP</fareCurrency> </fareDataSupInformation> </fareDataInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>GST</taxIdentifier> </taxIdentification> <taxType> <isoCountry>WY</isoCountry> </taxType> <taxNature>DE</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>19.21</fareAmount> <fareCurrency>AUD</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>X</taxIdentifier> </taxIdentification> <taxType> <isoCountry>AU</isoCountry> </taxType> <taxNature>DP</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>22.60</fareAmount> <fareCurrency>GBP</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>X</taxIdentifier> </taxIdentification> <taxType> <isoCountry>WY</isoCountry> </taxType> <taxNature>DE</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>2.40</fareAmount> <fareCurrency>GBP</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>GST</taxIdentifier> </taxIdentification> <taxType> <isoCountry>YQ</isoCountry> </taxType> <taxNature>AC</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>38.70</fareAmount> <fareCurrency>AUD</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>YR</isoCountry> </taxType> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>7.00</fareAmount> <fareCurrency>AUD</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>QR</isoCountry> </taxType> <taxNature>CO</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>3.46</fareAmount> <fareCurrency>AUD</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>QR</isoCountry> </taxType> <taxNature>EB</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>4.53</fareAmount> <fareCurrency>AUD</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>WG</isoCountry> </taxType> <taxNature>SE</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>3.00</fareAmount> <fareCurrency>AUD</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>UO</isoCountry> </taxType> <taxNature>VZ</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>0.70</fareAmount> <fareCurrency>AUD</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>X</taxIdentifier> </taxIdentification> <taxType> <isoCountry>NS</isoCountry> </taxType> <taxNature>XX</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>50.00</fareAmount> <fareCurrency>AUD</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <originDestination> <cityCode>MEL</cityCode> <cityCode>HKG</cityCode> </originDestination> <segmentInformation> <connexInformation> <connecDetails> <connexType>O</connexType> </connecDetails> </connexInformation> <segDetails> <segmentDetail> <identification>AIR</identification> <classOfService>J</classOfService> </segmentDetail> <ticketingStatus>OK</ticketingStatus> </segDetails> <fareQualifier> <fareBasisDetails> <primaryCode>JOW</primaryCode> </fareBasisDetails> </fareQualifier> <validityInformation> <businessSemantic>A</businessSemantic> <dateTime> <year>2009</year> <month>7</month> <day>26</day> </dateTime> </validityInformation> <bagAllowanceInformation> <bagAllowanceDetails> <baggageWeight>30</baggageWeight> <baggageType>W</baggageType> <measureUnit>K</measureUnit> </bagAllowanceDetails> </bagAllowanceInformation> <segmentReference> <refDetails> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </refDetails> </segmentReference> <sequenceInformation> <sequenceSection> <sequenceNumber>1</sequenceNumber> </sequenceSection> </sequenceInformation> </segmentInformation> <segmentInformation> <connexInformation> <connecDetails> <connexType>O</connexType> </connecDetails> </connexInformation> <segDetails> <segmentDetail> <identification>AIR</identification> <classOfService>C</classOfService> </segmentDetail> <ticketingStatus>OK</ticketingStatus> </segDetails> <fareQualifier> <fareBasisDetails> <primaryCode>JOW</primaryCode> </fareBasisDetails> </fareQualifier> <validityInformation> <businessSemantic>A</businessSemantic> <dateTime> <year>2009</year> <month>7</month> <day>26</day> </dateTime> </validityInformation> <bagAllowanceInformation> <bagAllowanceDetails> <baggageWeight>30</baggageWeight> <baggageType>W</baggageType> <measureUnit>K</measureUnit> </bagAllowanceDetails> </bagAllowanceInformation> <segmentReference> <refDetails> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </refDetails> </segmentReference> <sequenceInformation> <sequenceSection> <sequenceNumber>2</sequenceNumber> </sequenceSection> </sequenceInformation> </segmentInformation> <otherPricingInfo> <attributeDetails> <attributeType>FCA</attributeType> <attributeDescription>MEL QF SYD QF HKG M4537.00NUC4537.00END ROE1.253249</attributeDescription> </attributeDetails> </otherPricingInfo> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText>PRICED WITH VALIDATING CARRIER QF - REPRICE IF DIFFERENT VC</errorFreeText> </warningText> </warningInformation> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText> - DATE OF ORIGIN</errorFreeText> </warningText> </warningInformation> <automaticReissueInfo> <ticketInfo> <documentDetails> <number>0812499384665</number> <type>ET</type> </documentDetails> </ticketInfo> <couponInfo> <couponDetails> <cpnNumber>1</cpnNumber> </couponDetails> </couponInfo> <baseFareInfo> <monetaryDetails> <typeQualifier>IBA</typeQualifier> <amount>568.10</amount> <currency>AUD</currency> </monetaryDetails> </baseFareInfo> <firstDpiGroup> <reIssuePenalty> <penDisData> <penaltyAmount>0.00</penaltyAmount> <penaltyCurrency>GBP</penaltyCurrency> </penDisData> </reIssuePenalty> <reissueInfo> <monetaryDetails> <typeQualifier>TAC</typeQualifier> <amount>2493.00</amount> <currency>GBP</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>RTA</typeQualifier> <amount>58.20</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TST</typeQualifier> <amount>2493.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TSC</typeQualifier> <amount>2493.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>RTO</typeQualifier> <amount>2800.20</amount> <currency>GBP</currency> </otherMonetaryDetails> </reissueInfo> <oldTaxInfo> <monetaryDetails> <typeQualifier>ITA</typeQualifier> <amount>36.90</amount> <currency>GBP</currency> </monetaryDetails> </oldTaxInfo> <reissueBalanceInfo> <monetaryDetails> <typeQualifier>BEQ</typeQualifier> <amount>2468.00</amount> <currency>GBP</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>BTO</typeQualifier> <amount>2493.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BTA</typeQualifier> <amount>25.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BGT</typeQualifier> <amount>2493.00</amount> <currency>GBP</currency> </otherMonetaryDetails> </reissueBalanceInfo> </firstDpiGroup> <secondDpiGroup> <penalty></penalty> <residualValueInfo> <monetaryDetails> <typeQualifier>RES</typeQualifier> <amount>0.00</amount> <currency>AUD</currency> </monetaryDetails> </residualValueInfo> <oldTaxInfo> <monetaryDetails> <typeQualifier>ITA</typeQualifier> <amount>76.60</amount> <currency>AUD</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>NTA</typeQualifier> <amount>7.70</amount> <currency>AUD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>ITO</typeQualifier> <amount>644.70</amount> <currency>AUD</currency> </otherMonetaryDetails> </oldTaxInfo> <issueBalanceInfo> <monetaryDetails> <typeQualifier>BTA</typeQualifier> <amount>51.94</amount> <currency>AUD</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>BTO</typeQualifier> <amount>5169.84</amount> <currency>AUD</currency> </otherMonetaryDetails> </issueBalanceInfo> </secondDpiGroup> <reissueAttributes> <attributeDetails> <attributeType>PNS</attributeType> <attributeDescription>NS</attributeDescription> </attributeDetails> </reissueAttributes> </automaticReissueInfo> </fareList> </Ticket\_RepricePNRWithLowestFareReply>

## 5.33.3 Possible Errors

See "Error Messages" section.

* * *

## 5.34 Operation: No Split Option

This example shows a no split option applied on a repricing. The proposed booking will be the same for all repriced passengers.

In Edifact: _ATC++NS'_

In cryptic: _FXE/NS_

## 5.34.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_RepricePNRWithLowestFare xmlns="http://xml.amadeus.com/TARIBQ\_12\_2\_1A"> <ticketInfo> <paperticketDetailsFirstCoupon> <documentDetails> <number>0572146640092</number> <type>ET</type> </documentDetails> </paperticketDetailsFirstCoupon> <passengerSelection> <referenceDetails> <type>P</type> <value>1</value> </referenceDetails> </passengerSelection> </ticketInfo> <pasSegmentSelection> <referenceDetails> <type>S</type> <value>1</value> </referenceDetails> <referenceDetails> <type>S</type> <value>2</value> </referenceDetails> </pasSegmentSelection> <originalPricingOptionsGroup> <overrideInformation> <attributeDetails> <attributeType>NS</attributeType> </attributeDetails> </overrideInformation> </originalPricingOptionsGroup> </Ticket\_RepricePNRWithLowestFare>

## 5.34.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.34.3 Possible Errors

See "Error Messages" section.

* * *

## 5.35 Operation: Non Ticketable fare (Reply)

The folllowing example shows a reply containing a Non Ticketable Fare indicator. In this case, the fare returned is only informative, meaning that no ticket can be issued.

In this case a NTF indicator appears in the PTS segment:

PTS++:I::NTF+++0'

## 5.35.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_RepricePNRWithLowestFare xmlns="http://xml.amadeus.com/TARIBQ\_12\_2\_1A"> <ticketInfo> <paperticketDetailsFirstCoupon> <documentDetails> <number>1724536042920</number> <type>ET</type> </documentDetails> </paperticketDetailsFirstCoupon> <passengerSelection> <referenceDetails> <type>PA</type> <value>1</value> </referenceDetails> </passengerSelection> </ticketInfo> <originalPricingOptionsGroup> <overrideInformation> <attributeDetails> <attributeType>NOP</attributeType> </attributeDetails> </overrideInformation> </originalPricingOptionsGroup> </Ticket\_RepricePNRWithLowestFare>

## 5.35.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_RepricePNRWithLowestFareReply xmlns="http://xml.amadeus.com/TARIBR\_12\_2\_1A"> <fareList> <pricingInformation> <tstInformation> <tstIndicator>I</tstIndicator> <otherRateTariffIndicator>NTF</otherRateTariffIndicator> </tstInformation> <fcmi>0</fcmi> </pricingInformation> <fareReference> <referenceType>TST</referenceType> <uniqueReference>1</uniqueReference> </fareReference> <lastTktDate> <businessSemantic>LT</businessSemantic> <dateTime> <year>2009</year> <month>7</month> <day>26</day> </dateTime> </lastTktDate> <paxSegReference> <refDetails> <refQualifier>PA</refQualifier> <refNumber>1</refNumber> </refDetails> </paxSegReference> <fareDataInformation> <fareDataMainInformation> <fareDataQualifier>R</fareDataQualifier> </fareDataMainInformation> <fareDataSupInformation> <fareDataQualifier>B</fareDataQualifier> <fareAmount>5686.00</fareAmount> <fareCurrency>AUD</fareCurrency> </fareDataSupInformation> <fareDataSupInformation> <fareDataQualifier>712</fareDataQualifier> <fareAmount>2493.00</fareAmount> <fareCurrency>GBP</fareCurrency> </fareDataSupInformation> </fareDataInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>GST</taxIdentifier> </taxIdentification> <taxType> <isoCountry>WY</isoCountry> </taxType> <taxNature>DE</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>19.21</fareAmount> <fareCurrency>AUD</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>X</taxIdentifier> </taxIdentification> <taxType> <isoCountry>AU</isoCountry> </taxType> <taxNature>DP</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>22.60</fareAmount> <fareCurrency>GBP</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>X</taxIdentifier> </taxIdentification> <taxType> <isoCountry>WY</isoCountry> </taxType> <taxNature>DE</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>2.40</fareAmount> <fareCurrency>GBP</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>GST</taxIdentifier> </taxIdentification> <taxType> <isoCountry>YQ</isoCountry> </taxType> <taxNature>AC</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>38.70</fareAmount> <fareCurrency>AUD</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>YR</isoCountry> </taxType> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>7.00</fareAmount> <fareCurrency>AUD</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>QR</isoCountry> </taxType> <taxNature>CO</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>3.46</fareAmount> <fareCurrency>AUD</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>QR</isoCountry> </taxType> <taxNature>EB</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>4.53</fareAmount> <fareCurrency>AUD</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>WG</isoCountry> </taxType> <taxNature>SE</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>3.00</fareAmount> <fareCurrency>AUD</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>UO</isoCountry> </taxType> <taxNature>VZ</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>0.70</fareAmount> <fareCurrency>AUD</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>X</taxIdentifier> </taxIdentification> <taxType> <isoCountry>NS</isoCountry> </taxType> <taxNature>XX</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>50.00</fareAmount> <fareCurrency>AUD</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <originDestination> <cityCode>MEL</cityCode> <cityCode>HKG</cityCode> </originDestination> <segmentInformation> <connexInformation> <connecDetails> <connexType>O</connexType> </connecDetails> </connexInformation> <segDetails> <segmentDetail> <identification>AIR</identification> <classOfService>J</classOfService> </segmentDetail> <ticketingStatus>OK</ticketingStatus> </segDetails> <fareQualifier> <fareBasisDetails> <primaryCode>JOW</primaryCode> </fareBasisDetails> </fareQualifier> <validityInformation> <businessSemantic>A</businessSemantic> <dateTime> <year>2009</year> <month>7</month> <day>26</day> </dateTime> </validityInformation> <bagAllowanceInformation> <bagAllowanceDetails> <baggageWeight>30</baggageWeight> <baggageType>W</baggageType> <measureUnit>K</measureUnit> </bagAllowanceDetails> </bagAllowanceInformation> <segmentReference> <refDetails> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </refDetails> </segmentReference> <sequenceInformation> <sequenceSection> <sequenceNumber>1</sequenceNumber> </sequenceSection> </sequenceInformation> </segmentInformation> <segmentInformation> <connexInformation> <connecDetails> <connexType>O</connexType> </connecDetails> </connexInformation> <segDetails> <segmentDetail> <identification>AIR</identification> <classOfService>C</classOfService> </segmentDetail> <ticketingStatus>OK</ticketingStatus> </segDetails> <fareQualifier> <fareBasisDetails> <primaryCode>JOW</primaryCode> </fareBasisDetails> </fareQualifier> <validityInformation> <businessSemantic>A</businessSemantic> <dateTime> <year>2009</year> <month>7</month> <day>26</day> </dateTime> </validityInformation> <bagAllowanceInformation> <bagAllowanceDetails> <baggageWeight>30</baggageWeight> <baggageType>W</baggageType> <measureUnit>K</measureUnit> </bagAllowanceDetails> </bagAllowanceInformation> <segmentReference> <refDetails> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </refDetails> </segmentReference> <sequenceInformation> <sequenceSection> <sequenceNumber>2</sequenceNumber> </sequenceSection> </sequenceInformation> </segmentInformation> <otherPricingInfo> <attributeDetails> <attributeType>FCA</attributeType> <attributeDescription>MEL QF SYD QF HKG M4537.00NUC4537.00END ROE1.253249</attributeDescription> </attributeDetails> </otherPricingInfo> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText>PRICED WITH VALIDATING CARRIER QF - REPRICE IF DIFFERENT VC</errorFreeText> </warningText> </warningInformation> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText> - DATE OF ORIGIN</errorFreeText> </warningText> </warningInformation> <automaticReissueInfo> <ticketInfo> <documentDetails> <number>0812499384665</number> <type>ET</type> </documentDetails> </ticketInfo> <couponInfo> <couponDetails> <cpnNumber>1</cpnNumber> </couponDetails> </couponInfo> <baseFareInfo> <monetaryDetails> <typeQualifier>IBA</typeQualifier> <amount>568.10</amount> <currency>AUD</currency> </monetaryDetails> </baseFareInfo> <firstDpiGroup> <reIssuePenalty> <penDisData> <penaltyAmount>0.00</penaltyAmount> <penaltyCurrency>GBP</penaltyCurrency> </penDisData> </reIssuePenalty> <reissueInfo> <monetaryDetails> <typeQualifier>TAC</typeQualifier> <amount>2493.00</amount> <currency>GBP</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>RTA</typeQualifier> <amount>58.20</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TST</typeQualifier> <amount>2493.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TSC</typeQualifier> <amount>2493.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>RTO</typeQualifier> <amount>2800.20</amount> <currency>GBP</currency> </otherMonetaryDetails> </reissueInfo> <oldTaxInfo> <monetaryDetails> <typeQualifier>ITA</typeQualifier> <amount>36.90</amount> <currency>GBP</currency> </monetaryDetails> </oldTaxInfo> <reissueBalanceInfo> <monetaryDetails> <typeQualifier>BEQ</typeQualifier> <amount>2468.00</amount> <currency>GBP</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>BTO</typeQualifier> <amount>2493.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BTA</typeQualifier> <amount>25.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BGT</typeQualifier> <amount>2493.00</amount> <currency>GBP</currency> </otherMonetaryDetails> </reissueBalanceInfo> </firstDpiGroup> <secondDpiGroup> <penalty></penalty> <residualValueInfo> <monetaryDetails> <typeQualifier>RES</typeQualifier> <amount>0.00</amount> <currency>AUD</currency> </monetaryDetails> </residualValueInfo> <oldTaxInfo> <monetaryDetails> <typeQualifier>ITA</typeQualifier> <amount>76.60</amount> <currency>AUD</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>NTA</typeQualifier> <amount>7.70</amount> <currency>AUD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>ITO</typeQualifier> <amount>644.70</amount> <currency>AUD</currency> </otherMonetaryDetails> </oldTaxInfo> <issueBalanceInfo> <monetaryDetails> <typeQualifier>BTA</typeQualifier> <amount>51.94</amount> <currency>AUD</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>BTO</typeQualifier> <amount>5169.84</amount> <currency>AUD</currency> </otherMonetaryDetails> </issueBalanceInfo> </secondDpiGroup> </automaticReissueInfo> </fareList> </Ticket\_RepricePNRWithLowestFareReply>

## 5.35.3 Possible Errors

See "Error Messages" section.

* * *

## 5.36 Operation: Paper/Electronic surcharge (for future use)

This example shows a repricing with Paper surcharge.

## 5.36.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_RepricePNRWithLowestFare xmlns="http://xml.amadeus.com/TARIBQ\_12\_2\_1A"> <ticketInfo> <paperticketDetailsFirstCoupon> <documentDetails> <number>0570123456789</number> <type>ET</type> </documentDetails> </paperticketDetailsFirstCoupon> <passengerSelection> <referenceDetails> <type>P</type> <value>1</value> </referenceDetails> </passengerSelection> </ticketInfo> <pasSegmentSelection> <referenceDetails> <type>S</type> <value>1</value> </referenceDetails> <referenceDetails> <type>S</type> <value>2</value> </referenceDetails> </pasSegmentSelection> <originalPricingOptionsGroup> <overrideInformation> <attributeDetails> <attributeType>PAT</attributeType> </attributeDetails> </overrideInformation> </originalPricingOptionsGroup> </Ticket\_RepricePNRWithLowestFare>

## 5.36.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.36.3 Possible Errors

See "Error Messages" section.

* * *

## 5.37 Operation: Passenger Type Code

This example shows a PTC override or Discount code option applied on a repricing. If no fare is found with this PTC or discount, default PTC/discount will be applied, except if expanded parameter PTC is used.

To apply CH PTC / Discount to passenger one:

_DPI+701+:::CH'  
REF+PA:1'_

The equivalent cryptic entry is _FXE/RCH/P1_

In case of multipax re-pricing, discounts / PTC override have to be applied seperately:

_DPI+701+:::CH'__  
REF+PA:1'__  
DPI+701+:::CH'  
REF+PA:2'_

The equivalent cryptic entry is: _FXE/P1/RCH//P2/RCH_

It is also possible to specify the PTC per segment :

_DPI+701+:::CH'  
REF+PA:1\*S:2'_

This option, PTC per segment, is not available in cryptic mode.

## 5.37.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_RepricePNRWithLowestFare xmlns="http://xml.amadeus.com/TARIBQ\_12\_2\_1A"> <ticketInfo> <paperticketDetailsFirstCoupon> <documentDetails> <number>0572146640300</number> <type>ET</type> </documentDetails> </paperticketDetailsFirstCoupon> <passengerSelection> <referenceDetails> <type>PA</type> <value>1</value> </referenceDetails> </passengerSelection> </ticketInfo> <originalPricingOptionsGroup> <overrideInformation> <attributeDetails> <attributeType>NOP</attributeType> </attributeDetails> </overrideInformation> <discountInformation> <penDisInformation> <infoQualifier>701</infoQualifier> <penDisData> <discountCode>ZZ</discountCode> </penDisData> </penDisInformation> <referenceQualifier> <refDetails> <refQualifier>PA</refQualifier> <refNumber>1</refNumber> </refDetails> <refDetails> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </refDetails> </referenceQualifier> </discountInformation> </originalPricingOptionsGroup> </Ticket\_RepricePNRWithLowestFare>

## 5.37.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.37.3 Possible Errors

See "Error Messages" section.

* * *

## 5.38 Operation: Promotional Certificate

This option allow to exchange a Promotional Cerificate Ticket

## 5.38.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_RepricePNRWithLowestFare xmlns="http://xml.amadeus.com/TARIBQ\_12\_2\_1A"> <ticketInfo> <paperticketDetailsFirstCoupon> <documentDetails> <number>12312356789</number> <type>ET</type> </documentDetails> </paperticketDetailsFirstCoupon> <passengerSelection> <referenceDetails> <type>PA</type> <value>1</value> </referenceDetails> </passengerSelection> </ticketInfo> <pasSegmentSelection> <referenceDetails> <type>S</type> <value>1</value> </referenceDetails> <referenceDetails> <type>S</type> <value>2</value> </referenceDetails> </pasSegmentSelection> <originalPricingOptionsGroup> <overrideInformation> <attributeDetails> <attributeType>PRO</attributeType> </attributeDetails> </overrideInformation> </originalPricingOptionsGroup> </Ticket\_RepricePNRWithLowestFare>

## 5.38.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.38.3 Possible Errors

See "Error Messages" section.

* * *

## 5.39 Operation: Public Fares

This example a re-pricing with a public Fare option. If the repricing is done without Unifares option, the system will by default reissue Public Fares.

In Edifact: _ATC++RP'_

In cryptic, the equivalent command is _FXE/R,P_

## 5.39.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_RepricePNRWithLowestFare xmlns="http://xml.amadeus.com/TARIBQ\_12\_2\_1A"> <ticketInfo> <paperticketDetailsFirstCoupon> <documentDetails> <number>0572146640300</number> <type>ET</type> </documentDetails> </paperticketDetailsFirstCoupon> <passengerSelection> <referenceDetails> <type>P</type> <value>1</value> </referenceDetails> </passengerSelection> </ticketInfo> <originalPricingOptionsGroup> <overrideInformation> <attributeDetails> <attributeType>RP</attributeType> </attributeDetails> </overrideInformation> </originalPricingOptionsGroup> </Ticket\_RepricePNRWithLowestFare>

## 5.39.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.39.3 Possible Errors

See "Error Messages" section.

* * *

## 5.40 Operation: RAN(Reissue Amount Without Biasing)

RAN(Reissue Amount Without Biasing) codeset is used to display the total reissue amount before the discount application to help customer see the value of upselling. This codeset is displayed in the reply message when activated for an Office ID.

## 5.40.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.40.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<automaticReissueInfo> <ticketInfo> <documentDetails> <number>1572122268663</number> <type>ET</type> </documentDetails> </ticketInfo> <couponInfo> <couponDetails> <cpnNumber>1</cpnNumber> </couponDetails> </couponInfo> <baseFareInfo> <monetaryDetails> <typeQualifier>IBA</typeQualifier> <amount>2780.00</amount> <currency>GBP</currency> </monetaryDetails> </baseFareInfo> <firstDpiGroup> <reIssuePenalty> <penDisData> <penaltyAmount>0.00</penaltyAmount> <penaltyCurrency>GBP</penaltyCurrency> </penDisData> </reIssuePenalty> <reissueInfo> <monetaryDetails> <typeQualifier>RES</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>RAN</typeQualifier> <amount>3069.72</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>RTO</typeQualifier> <amount>3030.72</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TSC</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TST</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>RTA</typeQualifier> <amount>250.72</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TAC</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </otherMonetaryDetails> </reissueInfo> <oldTaxInfo> <monetaryDetails> <typeQualifier>ITA</typeQualifier> <amount>250.72</amount> <currency>GBP</currency> </monetaryDetails> </oldTaxInfo> <reissueBalanceInfo> <monetaryDetails> <typeQualifier>BEQ</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>BGT</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BTA</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BTO</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </otherMonetaryDetails> </reissueBalanceInfo> </firstDpiGroup> <secondDpiGroup> <penalty> <penDisData> <penaltyAmount>0.00</penaltyAmount> <penaltyCurrency>GBP</penaltyCurrency> </penDisData> </penalty> <residualValueInfo> <monetaryDetails> <typeQualifier>RES</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>RTA</typeQualifier> <amount>250.72</amount> <currency>GBP</currency> </otherMonetaryDetails> </residualValueInfo> <oldTaxInfo> <monetaryDetails> <typeQualifier>ITA</typeQualifier> <amount>250.72</amount> <currency>GBP</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>ITO</typeQualifier> <amount>3030.72</amount> <currency>GBP</currency> </otherMonetaryDetails> </oldTaxInfo> <issueBalanceInfo> <monetaryDetails> <typeQualifier>BTA</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>BEQ</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BGT</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BTO</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </otherMonetaryDetails> </issueBalanceInfo> </secondDpiGroup> <reissueAttributes> <attributeDetails> <attributeType>NET</attributeType> <attributeDescription>1</attributeDescription> </attributeDetails> </reissueAttributes> </automaticReissueInfo>

## 5.40.3 Possible Errors

See "Error Messages" section.

* * *

## 5.41 Operation: Re-Price Point of Sale Override and Ticketing Override

This example shows a request for Fare information which corresponds to the current booking class of the PNR itinerary with the Point of Sale Override and Ticketing Override option. The ticket is Electronic.

Codeset _162_ in cityQualifier is for Point of Sale and _91_ is for Point of Ticketing.

In Edifact:

_POS++NCE:::162\*NCE:::91'_

The equivalent entry in cryptic is:

-   _FXE/R,NCE_: override of point of sale
-   _FXE/R,.NCE_: override of point of ticketing
-   _FXE/R,NCE.NCE_, override of both point of sale and ticketing

## 5.41.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_RepricePNRWithLowestFare xmlns="http://xml.amadeus.com/TARIBQ\_12\_2\_1A"> <ticketInfo> <paperticketDetailsFirstCoupon> <documentDetails> <number>0572146640300</number> <type>ET</type> </documentDetails> </paperticketDetailsFirstCoupon> <passengerSelection> <referenceDetails> <type>P</type> <value>1</value> </referenceDetails> </passengerSelection> </ticketInfo> <originalPricingOptionsGroup> <overrideInformation> <attributeDetails> <attributeType>NOP</attributeType> </attributeDetails> </overrideInformation> <cityOverride> <cityDetail> <cityCode>NCE</cityCode> <cityQualifier>NCE</cityQualifier> </cityDetail> </cityOverride> </originalPricingOptionsGroup> </Ticket\_RepricePNRWithLowestFare>

## 5.41.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.41.3 Possible Errors

CM13301 - Invalid point of sale

See "Error Messages" section.

* * *

## 5.42 Operation: Re-pricing on a paper ticket

This example shows a repricing on a paper ticket.

Information for first coupon, last coupon, first ticket and last ticket has to be entered, even in case ticket is not a conjunctive one. Type _PT_ has to be used. In Edifact:

_TKT+1251234567890:PT'  
CPN+1'  
TKT+1251234567890:PT'  
CPN+1'  
TKT+1251234567890:PT'  
TKT+1251234567890:PT'_

Nota: the same should be done in confirmation query.

In cryptic, the equivalent command is:

-   _FXE/TKT125-1234567890\*90C1_ when there is no conjunctive ticket
-   _FXE/TKT125-1234567890\*90C1234-91C12_ when there is a conjunctive ticket

## 5.42.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_RepricePNRWithLowestFare xmlns="http://xml.amadeus.com/TARIBQ\_12\_2\_1A"> <ticketInfo> <paperticketDetailsFirstCoupon> <documentDetails> <number>0572146640389</number> <type>PT</type> </documentDetails> </paperticketDetailsFirstCoupon> <couponInfoFirst> <couponDetails> <cpnNumber>1</cpnNumber> </couponDetails> </couponInfoFirst> <paperInformation> <paperticketDetailsLastCoupon> <documentDetails> <number>0572146640390</number> <type>PT</type> </documentDetails> </paperticketDetailsLastCoupon> <papercouponInfoLast> <couponDetails> <cpnNumber>3</cpnNumber> </couponDetails> </papercouponInfoLast> <ticketRange> <paperticketDetailsfirst> <documentDetails> <number>0572146640388</number> <type>PT</type> </documentDetails> </paperticketDetailsfirst> <paperticketDetailsLast> <documentDetails> <number>0572146640390</number> <type>PT</type> </documentDetails> </paperticketDetailsLast> </ticketRange> </paperInformation> <passengerSelection> <referenceDetails> <type>PA</type> <value>1</value> </referenceDetails> </passengerSelection> </ticketInfo> </Ticket\_RepricePNRWithLowestFare>

## 5.42.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.42.3 Possible Errors

See "Error Messages" section.

* * *

## 5.43 Operation: Residual Value Option

A Residual Value may result from a Re-issue Transaction.

In cryptic, when the _/RVD_ option is used in the Confirmed Re-pricing entry and a refundable Residual Value amount exists, no Residual Value Document is generated and the Residual Value amount is populated in the /\*RV field of the Original Exchange Document of associated passengers (FO line). This option applies to all re-priced passengers.

In Edifact, option is entered in the informative query (_ATC++RVD'_) and process is applied when the confirmed query is sent.

Note: Option available for British Airways, Qantas and hosted carriers.

## 5.43.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_RepricePNRWithLowestFare xmlns="http://xml.amadeus.com/TARIBQ\_12\_2\_1A"> <ticketInfo> <paperticketDetailsFirstCoupon> <documentDetails> <number>0572146640300</number> <type>ET</type> </documentDetails> </paperticketDetailsFirstCoupon> <passengerSelection> <referenceDetails> <type>P</type> <value>1</value> </referenceDetails> </passengerSelection> </ticketInfo> <originalPricingOptionsGroup> <overrideInformation> <attributeDetails> <attributeType>RVD</attributeType> </attributeDetails> </overrideInformation> </originalPricingOptionsGroup> </Ticket\_RepricePNRWithLowestFare>

## 5.43.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.43.3 Possible Errors

See "Error Messages" section.

* * *

## 5.44 Operation: Reusable/Refundable (reply)

In case of residual value the breakdown of "refundable" or "reusable" amount is returned. The computation of the “re-usable” and “refundable” amounts is performed at the fare component level. All the applicable taxes will follow the rules of the fare component they are related to.

## 5.44.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_RepricePNRWithLowestFare xmlns="http://xml.amadeus.com/TARIBQ\_12\_2\_1A"> <ticketInfo> <paperticketDetailsFirstCoupon> <documentDetails> <number>12312356789</number> <type>ET</type> </documentDetails> </paperticketDetailsFirstCoupon> <passengerSelection> <referenceDetails> <type>PA</type> <value>1</value> </referenceDetails> </passengerSelection> </ticketInfo> <pasSegmentSelection> <referenceDetails> <type>S</type> <value>1</value> </referenceDetails> <referenceDetails> <type>S</type> <value>2</value> </referenceDetails> </pasSegmentSelection> <originalPricingOptionsGroup> <overrideInformation> <attributeDetails> <attributeType>NOP</attributeType> </attributeDetails> </overrideInformation> </originalPricingOptionsGroup> </Ticket\_RepricePNRWithLowestFare>

## 5.44.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_RepricePNRWithLowestFareReply xmlns="http://xml.amadeus.com/TARIBR\_12\_2\_1A"> <fareList> <pricingInformation> <tstInformation> <tstIndicator>I</tstIndicator> </tstInformation> <fcmi>0</fcmi> </pricingInformation> <fareReference> <referenceType>TST</referenceType> <uniqueReference>1</uniqueReference> </fareReference> <paxSegReference> <refDetails> <refQualifier>PA</refQualifier> <refNumber>2</refNumber> </refDetails> </paxSegReference> <fareDataInformation> <fareDataMainInformation> <fareDataQualifier>R</fareDataQualifier> </fareDataMainInformation> <fareDataSupInformation> <fareDataQualifier>712</fareDataQualifier> <fareAmount>130.00</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataSupInformation> <fareDataSupInformation> <fareDataQualifier>B</fareDataQualifier> <fareAmount>3140.00</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataSupInformation> </fareDataInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>AE</isoCountry> </taxType> <taxNature>AD</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>75.00</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>TP</isoCountry> </taxType> <taxNature>SE</taxNature> </taxDetails> </taxInformation> <bankerRates> <firstRateDetail> <amount>.808604</amount> </firstRateDetail> </bankerRates> <originDestination> <cityCode>PAR</cityCode> <cityCode>LON</cityCode> </originDestination> <segmentInformation> <connexInformation> <connecDetails> <connexType>O</connexType> </connecDetails> </connexInformation> <segDetails> <segmentDetail> <identification>AIR</identification> <classOfService>Y</classOfService> </segmentDetail> <ticketingStatus>OK</ticketingStatus> </segDetails> <fareQualifier> <fareBasisDetails> <primaryCode>Y2F</primaryCode> <fareBasisCode>LBAOW</fareBasisCode> </fareBasisDetails> </fareQualifier> <validityInformation> <businessSemantic>A</businessSemantic> <dateTime> <year>2013</year> <month>5</month> <day>9</day> </dateTime> </validityInformation> <bagAllowanceInformation> <bagAllowanceDetails> <baggageQuantity>1</baggageQuantity> <baggageType>N</baggageType> </bagAllowanceDetails> </bagAllowanceInformation> <segmentReference> <refDetails> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </refDetails> </segmentReference> <sequenceInformation> <sequenceSection> <sequenceNumber>1</sequenceNumber> </sequenceSection> </sequenceInformation> </segmentInformation> <otherPricingInfo> <attributeDetails> <attributeType>END</attributeType> <attributeDescription>BA ONLY</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>FCA</attributeType> <attributeDescription>PAR BA LON461.45NUC461.45END ROE0.758475</attributeDescription> </attributeDetails> </otherPricingInfo> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText> - DATE OF ORIGIN</errorFreeText> </warningText> </warningInformation> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText>BG CXR</errorFreeText> </warningText> </warningInformation> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText>PRICED WITH VALIDATING CARRIER BA - REPRICE IF DIFFERENT VC</errorFreeText> </warningText> </warningInformation> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText>14JUN12 PER GAF REQUIREMENTS FARE NOT VALID UNTIL TICKETED</errorFreeText> </warningText> </warningInformation> <automaticReissueInfo> <ticketInfo> <documentDetails> <number>12312356789</number> <type>ET</type> </documentDetails> </ticketInfo> <couponInfo> <couponDetails> <cpnNumber>1</cpnNumber> </couponDetails> </couponInfo> <baseFareInfo> <monetaryDetails> <typeQualifier>IBA</typeQualifier> <amount>119.00</amount> <currency>EUR</currency> </monetaryDetails> </baseFareInfo> <firstDpiGroup> <reIssuePenalty> <penDisData> <penaltyAmount>0</penaltyAmount> <penaltyCurrency>EUR</penaltyCurrency> </penDisData> </reIssuePenalty> <reissueInfo> <monetaryDetails> <typeQualifier>RES</typeQualifier> <amount>250.00</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>RTA</typeQualifier> <amount>383.50</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>REU</typeQualifier> <amount>100.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>REF</typeQualifier> <amount>150.00</amount> <currency>EUR</currency> </otherMonetaryDetails> </reissueInfo> <oldTaxInfo> <monetaryDetails> <typeQualifier>ITA</typeQualifier> <amount>383.50</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>ITO</typeQualifier> <amount>502.50</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>NTA</typeQualifier> <amount>30.00</amount> <currency>EUR</currency> </otherMonetaryDetails> </oldTaxInfo> <reissueBalanceInfo> <monetaryDetails> <typeQualifier>BTA</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>BEQ</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BGT</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BTO</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </otherMonetaryDetails> </reissueBalanceInfo> </firstDpiGroup> <secondDpiGroup> <penalty> <penDisData> <penaltyAmount>0</penaltyAmount> <penaltyCurrency>EUR</penaltyCurrency> </penDisData> </penalty> <residualValueInfo> <monetaryDetails> <typeQualifier>RES</typeQualifier> <amount>250.00</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>RTA</typeQualifier> <amount>383.50</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>REU</typeQualifier> <amount>100.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>REF</typeQualifier> <amount>150.00</amount> <currency>EUR</currency> </otherMonetaryDetails> </residualValueInfo> <oldTaxInfo> <monetaryDetails> <typeQualifier>ITA</typeQualifier> <amount>383.50</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>ITO</typeQualifier> <amount>502.50</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>NTA</typeQualifier> <amount>30.00</amount> <currency>EUR</currency> </otherMonetaryDetails> </oldTaxInfo> <issueBalanceInfo> <monetaryDetails> <typeQualifier>BTA</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>BEQ</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BGT</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BTO</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </otherMonetaryDetails> </issueBalanceInfo> </secondDpiGroup> <reissueAttributes> <attributeDetails> <attributeType>NET</attributeType> <attributeDescription>1</attributeDescription> </attributeDetails> </reissueAttributes> </automaticReissueInfo> </fareList> </Ticket\_RepricePNRWithLowestFareReply>

## 5.44.3 Possible Errors

See "Error Messages" section.

* * *

## 5.45 Operation: Revalidation (Reply)

This example shows a revalidation transaction reply. The reply has a REVAL codeset at the end.

## 5.45.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_RepricePNRWithLowestFare xmlns="http://xml.amadeus.com/TARIBQ\_12\_2\_1A"> <ticketInfo> <paperticketDetailsFirstCoupon> <documentDetails> <number>0572146640092</number> <type>ET</type> </documentDetails> </paperticketDetailsFirstCoupon> <passengerSelection> <referenceDetails> <type>PA</type> <value>1</value> </referenceDetails> </passengerSelection> </ticketInfo> <originalPricingOptionsGroup> <overrideInformation> <attributeDetails> <attributeType>NOP</attributeType> </attributeDetails> </overrideInformation> </originalPricingOptionsGroup> </Ticket\_RepricePNRWithLowestFare>

## 5.45.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_RepricePNRWithLowestFareReply xmlns="http://xml.amadeus.com/TARIBR\_12\_2\_1A"> <fareList> <pricingInformation> <tstInformation> <tstIndicator>I</tstIndicator> </tstInformation> <fcmi>0</fcmi> </pricingInformation> <fareReference> <referenceType>TST</referenceType> <uniqueReference>1</uniqueReference> </fareReference> <paxSegReference> <refDetails> <refQualifier>PA</refQualifier> <refNumber>2</refNumber> </refDetails> </paxSegReference> <fareDataInformation> <fareDataMainInformation> <fareDataQualifier>F</fareDataQualifier> </fareDataMainInformation> <fareDataSupInformation> <fareDataQualifier>B</fareDataQualifier> <fareAmount>1121.00</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataSupInformation> <fareDataSupInformation> <fareDataQualifier>712</fareDataQualifier> <fareAmount>84.00</fareAmount> <fareCurrency>GBP</fareCurrency> </fareDataSupInformation> </fareDataInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>QX</isoCountry> </taxType> <taxNature>AP</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>6.29</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>YQ</isoCountry> </taxType> <taxNature>AC</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>24.00</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>FR</isoCountry> </taxType> <taxNature>SE</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>4.48</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>FR</isoCountry> </taxType> <taxNature>TI</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>7.95</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>RS</isoCountry> </taxType> <taxNature>AE</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>4.07</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>QV</isoCountry> </taxType> <taxNature>DP</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>1.37</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <originDestination> <cityCode>PAR</cityCode> <cityCode>PAR</cityCode> </originDestination> <segmentInformation> <connexInformation> <connecDetails> <connexType>O</connexType> </connecDetails> </connexInformation> <segDetails> <segmentDetail> <identification>AIR</identification> </segmentDetail> <ticketingStatus>OK</ticketingStatus> </segDetails> <fareQualifier> <fareBasisDetails> <primaryCode>CRT</primaryCode> <fareBasisCode>1</fareBasisCode> </fareBasisDetails> </fareQualifier> <validityInformation> <businessSemantic>A</businessSemantic> <dateTime> <year>2006</year> <month>3</month> <day>12</day> </dateTime> </validityInformation> <bagAllowanceInformation> <bagAllowanceDetails> <baggageWeight>30</baggageWeight> <baggageType>W</baggageType> <measureUnit>K</measureUnit> </bagAllowanceDetails> </bagAllowanceInformation> <segmentReference> <refDetails> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </refDetails> </segmentReference> <sequenceInformation> <sequenceSection> <sequenceNumber>1</sequenceNumber> </sequenceSection> </sequenceInformation> </segmentInformation> <segmentInformation> <connexInformation> <connecDetails> <routingInformation>ARNK</routingInformation> <connexType>O</connexType> </connecDetails> </connexInformation> <sequenceInformation> <sequenceSection> <sequenceNumber>2</sequenceNumber> </sequenceSection> </sequenceInformation> </segmentInformation> <segmentInformation> <connexInformation> <connecDetails> <connexType>O</connexType> </connecDetails> </connexInformation> <segDetails> <segmentDetail> <identification>AIR</identification> </segmentDetail> <ticketingStatus>OK</ticketingStatus> </segDetails> <fareQualifier> <fareBasisDetails> <primaryCode>CRT</primaryCode> <fareBasisCode>1</fareBasisCode> </fareBasisDetails> </fareQualifier> <validityInformation> <businessSemantic>A</businessSemantic> <dateTime> <year>2006</year> <month>3</month> <day>12</day> </dateTime> </validityInformation> <bagAllowanceInformation> <bagAllowanceDetails> <baggageWeight>30</baggageWeight> <baggageType>W</baggageType> <measureUnit>K</measureUnit> </bagAllowanceDetails> </bagAllowanceInformation> <segmentReference> <refDetails> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </refDetails> </segmentReference> <sequenceInformation> <sequenceSection> <sequenceNumber>3</sequenceNumber> </sequenceSection> </sequenceInformation> </segmentInformation> <otherPricingInfo> <attributeDetails> <attributeType>FCA</attributeType> <attributeDescription>PAR AF MAD824.58/-BCN AF PAR662.71NUC1487.29END ROE0.753717</attributeDescription> </attributeDetails> </otherPricingInfo> <automaticReissueInfo> <ticketInfo> <documentDetails> <number>0572146640092</number> <type>ET</type> </documentDetails> </ticketInfo> <couponInfo> <couponDetails> <cpnNumber>1</cpnNumber> </couponDetails> </couponInfo> <baseFareInfo> <monetaryDetails> <typeQualifier>IBA</typeQualifier> <amount>999.00</amount> <currency>EUR</currency> </monetaryDetails> </baseFareInfo> <firstDpiGroup> <reIssuePenalty> <penDisData> <penaltyAmount>206.00</penaltyAmount> <penaltyCurrency>GBP</penaltyCurrency> </penDisData> </reIssuePenalty> <reissueInfo> <monetaryDetails> <typeQualifier>TAC</typeQualifier> <amount>290.00</amount> <currency>GBP</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>RTA</typeQualifier> <amount>33.11</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TST</typeQualifier> <amount>84.00</amount> <currency>GBP</currency> </otherMonetaryDetails> </reissueInfo> <oldTaxInfo> <monetaryDetails> <typeQualifier>ITA</typeQualifier> <amount>33.11</amount> <currency>GBP</currency> </monetaryDetails> </oldTaxInfo> <reissueBalanceInfo> <monetaryDetails> <typeQualifier>BEQ</typeQualifier> <amount>84.00</amount> <currency>GBP</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>BTO</typeQualifier> <amount>84.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BTA</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BGT</typeQualifier> <amount>290.00</amount> <currency>GBP</currency> </otherMonetaryDetails> </reissueBalanceInfo> </firstDpiGroup> <secondDpiGroup> <penalty></penalty> <residualValueInfo> <monetaryDetails> <typeQualifier>RES</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> </residualValueInfo> <oldTaxInfo> <monetaryDetails> <typeQualifier>ITA</typeQualifier> <amount>48.16</amount> <currency>EUR</currency> </monetaryDetails> </oldTaxInfo> <issueBalanceInfo> <monetaryDetails> <typeQualifier>BTO</typeQualifier> <amount>122.00</amount> <currency>EUR</currency> </monetaryDetails> </issueBalanceInfo> </secondDpiGroup> <reissueAttributes> <attributeDetails> <attributeType>REVAL</attributeType> <attributeDescription>1</attributeDescription> </attributeDetails> </reissueAttributes> </automaticReissueInfo> </fareList> </Ticket\_RepricePNRWithLowestFareReply>

## 5.45.3 Possible Errors

See "Error Messages" section.

* * *

## 5.46 Operation: Stopover override

This example shows a re-pricing with Stopover override. _V_ indicator has to be used in _TII_ segment and tattoo number of the segment in the _REF_ Segment.

In Edifact:

_TII++++++V'  
REF+S:1'_

Note: This option is only available for Cathay Pacific_.  
_

## 5.46.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_RepricePNRWithLowestFare xmlns="http://xml.amadeus.com/TARIBQ\_12\_2\_1A"> <ticketInfo> <paperticketDetailsFirstCoupon> <documentDetails> <number>1252406815328</number> <type>ET</type> </documentDetails> </paperticketDetailsFirstCoupon> <passengerSelection> <referenceDetails> <type>PA</type> <value>1</value> </referenceDetails> </passengerSelection> </ticketInfo> <originalPricingOptionsGroup> <overrideInformation> <attributeDetails> <attributeType>NOP</attributeType> </attributeDetails> </overrideInformation> </originalPricingOptionsGroup> <flightInformation> <itineraryOptions> <flightDetails> <flightType>V</flightType> </flightDetails> </itineraryOptions> <itinerarySegReference> <refDetails> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </refDetails> </itinerarySegReference> </flightInformation> </Ticket\_RepricePNRWithLowestFare>

## 5.46.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.46.3 Possible Errors

See "Error Messages" section.

* * *

## 5.47 Operation: Tax Manipulation (Add Tax)

This example shows a re-pricing with the addition of a tax.

In the field _taxIdentifier_ codeset _ADT_ has to be chosen, i.e Add tax.

In the field _taxValueQualifier_ two codesets are available: _A_ (Amount) and _P_ (Percentage).

Equivalent cryptic command is _FXE/R,AT-ZVGO12A_

In Edifact, to add ZVGO tax of amount 12:

_TAX+7+ADT+ZV+GO+:::12:A'_

Tax codes (ISO tax code and nature tax code) should be 2-letter codes. If it is not the case, following rejects are displayed:

**INVALID ISO TAX CODE** if ISO tax code is not 2-letter long

**INVALID NATURE CODE** if nature tax code is not 2-letter long

## 5.47.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_RepricePNRWithLowestFare xmlns="http://xml.amadeus.com/TARIBQ\_12\_2\_1A"> <ticketInfo> <paperticketDetailsFirstCoupon> <documentDetails> <number>9579523674126</number> <type>ET</type> </documentDetails> </paperticketDetailsFirstCoupon> <passengerSelection> <referenceDetails> <type>PA</type> <value>1</value> </referenceDetails> </passengerSelection> </ticketInfo> <originalPricingOptionsGroup> <overrideInformation> <attributeDetails> <attributeType>NOP</attributeType> </attributeDetails> </overrideInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>ADT</taxIdentifier> </taxIdentification> <taxType> <isoCountry>ZV</isoCountry> </taxType> <taxNature>GO</taxNature> <taxData> <taxRate>12</taxRate> <taxValueQualifier>A</taxValueQualifier> </taxData> </taxDetails> </originalPricingOptionsGroup> </Ticket\_RepricePNRWithLowestFare>

## 5.47.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.47.3 Possible Errors

See "Error Messages" section.

* * *

## 5.48 Operation: Transitional Certificate

This option allow to exchange a Transitional Cerificate Ticket

## 5.48.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_RepricePNRWithLowestFare xmlns="http://xml.amadeus.com/TARIBQ\_12\_2\_1A"> <ticketInfo> <paperticketDetailsFirstCoupon> <documentDetails> <number>12312356789</number> <type>ET</type> </documentDetails> </paperticketDetailsFirstCoupon> <passengerSelection> <referenceDetails> <type>PA</type> <value>1</value> </referenceDetails> </passengerSelection> </ticketInfo> <pasSegmentSelection> <referenceDetails> <type>S</type> <value>1</value> </referenceDetails> <referenceDetails> <type>S</type> <value>2</value> </referenceDetails> </pasSegmentSelection> <originalPricingOptionsGroup> <overrideInformation> <attributeDetails> <attributeType>TRS</attributeType> </attributeDetails> </overrideInformation> </originalPricingOptionsGroup> </Ticket\_RepricePNRWithLowestFare>

## 5.48.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.48.3 Possible Errors

See "Error Messages" section.

* * *

## 5.49 Operation: Unifare

This example shows a re-pricing with a Unifare option, Multipax re-pricing.

In Edifact: _ATC++RU'_

In cryptic, the equivalent command is _FXE/R,U_

## 5.49.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_RepricePNRWithLowestFare xmlns="http://xml.amadeus.com/TARIBQ\_12\_2\_1A"> <ticketInfo> <paperticketDetailsFirstCoupon> <documentDetails> <number>0572146640300</number> <type>ET</type> </documentDetails> </paperticketDetailsFirstCoupon> <passengerSelection> <referenceDetails> <type>P</type> <value>1</value> </referenceDetails> </passengerSelection> </ticketInfo> <originalPricingOptionsGroup> <overrideInformation> <attributeDetails> <attributeType>RU</attributeType> </attributeDetails> </overrideInformation> </originalPricingOptionsGroup> </Ticket\_RepricePNRWithLowestFare>

## 5.49.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.49.3 Possible Errors

See "Error Messages" section.

* * *

## 5.50 Operation: Waiver

This example shows a waiver option applied on a repricing.

In Edifact: _PTK++++++++MI'_

## 5.50.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_RepricePNRWithLowestFare xmlns="http://xml.amadeus.com/TARIBQ\_12\_2\_1A"> <ticketInfo> <paperticketDetailsFirstCoupon> <documentDetails> <number>0572146640092</number> <type>ET</type> </documentDetails> </paperticketDetailsFirstCoupon> <passengerSelection> <referenceDetails> <type>PA</type> <value>1</value> </referenceDetails> </passengerSelection> </ticketInfo> <originalPricingOptionsGroup> <overrideInformation> <attributeDetails> <attributeType>NOP</attributeType> </attributeDetails> </overrideInformation> <pricingOption> <waiverCode>MI</waiverCode> </pricingOption> </originalPricingOptionsGroup> </Ticket\_RepricePNRWithLowestFare>

## 5.50.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.50.3 Possible Errors

See "Error Messages" section.

* * *

## 5.51 Operation: Withhold Taxes

Option allows to withhold somes taxes

In the field _taxIdenfier_ you have to choose the code-set WHT, i.e Withhold tax.

We can exempt withhold:

\* all the taxes: _TAX+7+WHT_

\* Display Code: _TAX__+7+WHT+YQ_

\* Display Code + Nature Code: _TAX__+7+WHT+FR+SE  
_

The TST is created as Manual

## 5.51.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_RepricePNRWithLowestFare xmlns="http://xml.amadeus.com/TARIBQ\_12\_2\_1A"> <ticketInfo> <paperticketDetailsFirstCoupon> <documentDetails> <number>123123456789</number> <type>ET</type> </documentDetails> </paperticketDetailsFirstCoupon> <passengerSelection> <referenceDetails> <type>PA</type> <value>1</value> </referenceDetails> </passengerSelection> </ticketInfo> <originalPricingOptionsGroup> <overrideInformation> <attributeDetails> <attributeType>NOP</attributeType> </attributeDetails> </overrideInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>WHT</taxIdentifier> </taxIdentification> <taxType> <isoCountry>FR</isoCountry> </taxType> <taxNature>SE</taxNature> </taxDetails> </originalPricingOptionsGroup> </Ticket\_RepricePNRWithLowestFare>

## 5.51.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.51.3 Possible Errors

See "Error Messages" section.

* * *

## 5.52 Operation: Zap add

The Zap-Add Re-pricing option permits the user to add an amount or percentage to the base fare. The Zap-Add option is actually a combination of the Zap-Off option with the corporate name 'ZAPADD'.

## 5.52.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_RepricePNRWithLowestFare xmlns="http://xml.amadeus.com/TARIBQ\_12\_2\_1A"> <ticketInfo> <paperticketDetailsFirstCoupon> <documentDetails> <number>123123456789</number> <type>ET</type> </documentDetails> </paperticketDetailsFirstCoupon> <passengerSelection> <referenceDetails> <type>PA</type> <value>1</value> </referenceDetails> </passengerSelection> </ticketInfo> <pasSegmentSelection> <referenceDetails> <type>S</type> <value>1</value> </referenceDetails> <referenceDetails> <type>S</type> <value>2</value> </referenceDetails> </pasSegmentSelection> <originalPricingOptionsGroup> <overrideInformation> <attributeDetails> <attributeType>RW</attributeType> <attributeDescription>ZAPADD</attributeDescription> </attributeDetails> </overrideInformation> <discountInformation> <penDisInformation> <infoQualifier>ZAP</infoQualifier> <penDisData> <penaltyQualifier>707</penaltyQualifier> <penaltyAmount>50</penaltyAmount> </penDisData> </penDisInformation> </discountInformation> </originalPricingOptionsGroup> </Ticket\_RepricePNRWithLowestFare>

## 5.52.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.52.3 Possible Errors

See "Error Messages" section.

* * *

## 5.53 Operation: Zap off

This function allows the user to manually apply a discount to either specified segments or to the while itinerary, in one entry.

This example shows the zapp off option. In the field _infoQualifier_ you have to specify ZAP, i.e ZappOFF discount information.

The Zap-Off re-pricing entry can mix requests to manually discount certain segments by a percentage (708 codeset) and others by a fixed amount (707 codeset).

Amount Zap-Off re-pricing also allows the user to manually apply a discount to either the base fare or the total fare of an itinerary. Percent Zap-Off re-pricing can only apply a discount off the base.

## 5.53.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_RepricePNRWithLowestFare xmlns="http://xml.amadeus.com/TARIBQ\_12\_2\_1A"> <ticketInfo> <paperticketDetailsFirstCoupon> <documentDetails> <number>12312356789</number> <type>ET</type> </documentDetails> </paperticketDetailsFirstCoupon> <passengerSelection> <referenceDetails> <type>PA</type> <value>1</value> </referenceDetails> </passengerSelection> </ticketInfo> <pasSegmentSelection> <referenceDetails> <type>S</type> <value>1</value> </referenceDetails> <referenceDetails> <type>S</type> <value>2</value> </referenceDetails> </pasSegmentSelection> <originalPricingOptionsGroup> <overrideInformation> <attributeDetails> <attributeType>NOP</attributeType> </attributeDetails> </overrideInformation> <discountInformation> <penDisInformation> <infoQualifier>ZAP</infoQualifier> <penDisData> <penaltyQualifier>707</penaltyQualifier> <penaltyAmount>50</penaltyAmount> </penDisData> </penDisInformation> <referenceQualifier> <refDetails> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </refDetails> </referenceQualifier> </discountInformation> <discountInformation> <penDisInformation> <infoQualifier>ZAP</infoQualifier> <penDisData> <penaltyQualifier>708</penaltyQualifier> <penaltyAmount>75</penaltyAmount> </penDisData> </penDisInformation> <referenceQualifier> <refDetails> <refQualifier>S</refQualifier> <refNumber>3</refNumber> </refDetails> <refDetails> <refQualifier>S</refQualifier> <refNumber>4</refNumber> </refDetails> </referenceQualifier> </discountInformation> </originalPricingOptionsGroup> </Ticket\_RepricePNRWithLowestFare>

## 5.53.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.53.3 Possible Errors

See "Error Messages" section.

* * *