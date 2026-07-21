---
url: "https://developers.amadeus.com/api-library/soap/functional-doc/605/doc-read/5331?serviceVersion=15.1"
download_url: "https://developers.amadeus.com/PAS-EAS/api/download/comp/4d4ad2cb456c02633f463a055ab70584/5331/upload_2321427988749325534.html"
title: "HTML_UG_WBS_Ticket_ReissuePricingWithoutPNR_TRPNRQ_15.1_080"
source: "amadeus"
service_id: "605"
service_name: "Ticket_ReissuePricingWithoutPNR"
version: "15.1"
document_id: "5331"
doc_version: "15.1"
doc_type: "User guide"
file_format: "HTML"
scraped_at: "2026-07-15T10:49:07.213Z"
---
# Function: Ticket\_ReissuePricingWithoutPNR

* * *

## 1 Overview

Context:

This transaction has been created in order to provide Amadeus Customers with an automated solution for the re-issuance of airline tickets after voluntary changes in a standalone context (this way, Amadeus non system users can access the ATC functionality).

The ReissuePricingWithoutPNR function re-prices up to nine passengers according to passenger, ticket, itinerary information and options sent in the query.

It automatically recalculates voluntary reissues/exchanges in accordance with IATA guidelines. The class of service is selected in the query.

E-Ticket and paper tickets can be repriced.

The function does not store nor create the corresponding TST records. This is the responsibility of the customer.

## 1.1 Supported Operations

The ReissuePricingWithoutPNR function returns the fare corresponding to the itinerary, documents to exchange and passenger information provided in the request.

The pricing rules used by the function ReissuePricingWithoutPNR apply here.

The supported operations are:

-   Passenger selection
-   Segment selection
-   Unifares
-   Unifares and public request
-   Corporate unifares
-   Corporate unifares plus public unifares
-   Best pricing
-   Unifares, corporate unifares and public unifares
-   Point of sale override
-   Point of sale override and ticketing override
-   Passenger type code (PTC) or discount
-   Cumulative PTC or discounts
-   Override PTC
-   Pricing by Fare Basis
-   Default currency override
-   Waiver
-   No split
-   Award Option
-   Upgrade Option
-   Expanded parameter rules and fare types
-   Tax manipulation
-   Pricing per bound
-   Waive penalty
-   Reprice non-exchangeable ticket

## 1.2 Limitations

Ticket\_ReissuePricingWithoutPNR has the following limitations:

-   Group PNR are excluded.
-   Up to nine passengers are supported.
-   Only 6 different PTC are supported in the same query.
-   Retrieval of TSR data is limited to 6 months (185 days) after the issuance. As such Paper ticket reissue can only be performed in this limitation.
-   Combine Infant Tickets (CIT) are not supported (if the adult is re-priced, data will be lost for infant and conversely).
-   Open segments are not supported in ATC.
-   Only one ticket per passenger can be repriced in one query

## 1.3 Unsupported Operations

Only the voluntary repricing option is supported.

## 1.4 Prerequisites

The end user must be authorised to perform an Amadeus Ticket Changer transaction. The office profile is checked in order to authorise the Amadeus Ticket Changer process and/or redirect the end user to the current manual process.

-   For e-Ticket, ETS data must be accessed in order to retrieve all the necessary data pertaining to original documents. Sale data is also retrieved when available.
-   For paper ticket, sale must be accessed to proceed with the re-pricing
-   Once the retrieval has been done, the recalculation can be performed comparing old/new information.

The ReissuePricingWithoutPNR function requires the following information:

-   Passenger information (PTC compulsory)
-   New route information
-   Ticket information: Ticket numbers and in case of paper tickets, the range of coupons and tickets to be reissued.

## 2 Building A Query

ReissuePricingWithoutPNR is composed of 5 different groups:

-   **<originatorRequestDetails>** (N/A for non-internal Amadeus users)
-   **<passengersGroup>**: Used to give details regarding passengers to price. Different types of PTC allowed and up to 99 passengers to be repriced by PTC.
-   **<segmentGroup>**: Use to give details regarding itinerary. Can be repeated up to 99 times (1 per segment to price).
-   **<exchangeInformationGroup>:** ticket information of document to be exchanged
-   **<pricingOptionGroup>**: used to give detail about pricing options to apply. Can be repeated up to 999 times.

The following diagram shows the structure:

![](images/Structure1.jpg)

M:Mandatory

C: Conditional

## 2.1 Sub Structure: ExchangeinformationGroup

## 2.1.1 Description

The <**exchangeInformationGroup>** includes all the tickets to be exchanged.

The following diagram shows the structure:

![](images/TARIPQstructure2.png)

M: Mandatory

C:Conditional

transactionIdentifier:  
  
It is used to list the group of exchanges. The identifier is stored in an <itemNumberDetails>.

  
documentInfoGroup:  
  
<paperticketDetailsLastCoupon> :  
  
    <documentDetails\>:  
        <number>: the ticket number  
        <type>: the document type: 702 for Electronic Ticket and 701 for paper ticket  
    <couponReferences>: N/Afor voluntary exchange  
    <firstPricingInformationKey>: Reference code of first pricing transaction (conditional)

## 2.1.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<message agency="1A" release="1" type="TRPNRQ" version="15"> <exchangeInformationGroup> <transactionIdentifier> <itemNumberDetails> <number>1</number> </itemNumberDetails> </transactionIdentifier> <documentInfoGroup> <paperticketDetailsLastCoupon> <documentDetails> <number>0001234567891</number> <type>702</type> </documentDetails> </paperticketDetailsLastCoupon> <firstPricingInformationKey> <dataLength>30</dataLength> <binaryData>I20140402-12943089071843541838</binaryData> </firstPricingInformationKey> </documentInfoGroup> </exchangeInformationGroup> <exchangeInformationGroup> <transactionIdentifier> <itemNumberDetails> <number>2</number> </itemNumberDetails> </transactionIdentifier> <documentInfoGroup> <paperticketDetailsLastCoupon> <documentDetails> <number>0001234567892</number> <type>ET</type> </documentDetails> </paperticketDetailsLastCoupon> </documentInfoGroup> </exchangeInformationGroup> <exchangeInformationGroup> <transactionIdentifier> <itemNumberDetails> <number>3</number> </itemNumberDetails> </transactionIdentifier> <documentInfoGroup> <paperticketDetailsLastCoupon> <documentDetails> <number>0001234567893</number> <type>ET</type> </documentDetails> </paperticketDetailsLastCoupon> </documentInfoGroup> </exchangeInformationGroup> <exchangeInformationGroup> <transactionIdentifier> <itemNumberDetails> <number>4</number> </itemNumberDetails> </transactionIdentifier> <documentInfoGroup> <paperticketDetailsLastCoupon> <documentDetails> <number>0001234567894</number> <type>ET</type> </documentDetails> </paperticketDetailsLastCoupon> </documentInfoGroup> </exchangeInformationGroup> </message>

## 2.2 Sub Structure: passengersGroup

## 2.2.1 Description

This group comprises 3 elements:

-   **<segmentRepetitionControl>:** Comprises:       
    -   <quantity>: The ID of the group of passengers
    -   <numberOfUnits>:  The number of passengers
-   **<travellersID>**: Contains the identifier of the passengers (measurementValue). 
-   **<discountPtc>**: Contains the passenger PTC (valueQualifier) 

The following diagram shows the structure:

![](images/segmentGroup.png)

M: Mandatory

C:Conditional  
  

The example below shows the XML structure for two adults, one child and one infant.  
The first  group shows two passengers - <discountPTC>: ADT

The first  group shows one children - <discountPTC>: CHD

The first  group shows one infant - <discountPTC>: INF

## 2.2.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<message agency="1A" release="1" type="TRPNRQ" version="15"> <passengersGroup> <segmentRepetitionControl> <segmentControlDetails> <quantity>1</quantity> <numberOfUnits>1</numberOfUnits> </segmentControlDetails> </segmentRepetitionControl> <travellersID> <travellerDetails> <measurementValue>1</measurementValue> <surname>BOND</surname> <firstName>ONE</firstName> </travellerDetails> </travellersID> <discountPtc> <valueQualifier>ADT</valueQualifier> </discountPtc> </passengersGroup> <passengersGroup> <segmentRepetitionControl> <segmentControlDetails> <quantity>2</quantity> <numberOfUnits>1</numberOfUnits> </segmentControlDetails> </segmentRepetitionControl> <travellersID> <travellerDetails> <measurementValue>1</measurementValue> <surname>BOND</surname> <firstName>BABYONE</firstName> </travellerDetails> </travellersID> <discountPtc> <valueQualifier>INF</valueQualifier> </discountPtc> </passengersGroup> <passengersGroup> <segmentRepetitionControl> <segmentControlDetails> <quantity>3</quantity> <numberOfUnits>1</numberOfUnits> </segmentControlDetails> </segmentRepetitionControl> <travellersID> <travellerDetails> <measurementValue>2</measurementValue> <surname>BOND</surname> <firstName>TWO</firstName> </travellerDetails> </travellersID> <discountPtc> <valueQualifier>CHD</valueQualifier> </discountPtc> </passengersGroup> </message>

## 2.3 Sub Structure: pricingOptionGroup - Add Tax

## 2.3.1 Description

This option is used to add tax per iso tax code.

The following diagram shows the structure:![](images/POPT-AD.png)

M: Mandatory  
C:Conditional

<pricingOption> Includes:

-   **<pricingOptionKey>**\= AT (Add Tax)
-   **<taxInformation>**: tax detail:
    -   <taxQualifier>: 7 (tax)
    -   <isoCountry>: Iso tax code (M)
    -   <taxNature>: nature code
    -   <taxRate>: amount or percentage to add
    -   <taxValueQualifier>: 'A' for amount, 'P' for percentage

Note: Addition of several taxes can be done by repeating <taxInformation\> as many times as necessary.

<taxInformation> has the following features:

-   It allows you to add a fixed amount of taxes to a re-pricing entry
-   You can override the amount of tax returned by an SSP: if a tax is already included in SSP reply to re-pricing query, Add Taxes option overrides the amount of this tax by the one entered by the user
-   You can have up to 4 taxes per passenger
-   Currency is always the currency of the point of sale
-   The TST is treated as manual

The example below show:

-   addition of tax ZVGO with an amount of 50 (currency of reissue)
-   addition of tax FR with an amount of 10 percent of the base fare

## 2.3.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>AT</pricingOptionKey> </pricingOptionKey> <taxInformation> <taxQualifier>7</taxQualifier> <taxType> <isoCountry>ZV</isoCountry> </taxType> <taxNature>GO</taxNature> <taxData> <taxRate>50</taxRate> <taxValueQualifier>A</taxValueQualifier> </taxData> </taxInformation> <taxInformation> <taxQualifier>7</taxQualifier> <taxType> <isoCountry>FR</isoCountry> </taxType> <taxData> <taxRate>10</taxRate> <taxValueQualifier>p</taxValueQualifier> </taxData> </taxInformation> </pricingOptionGroup>

## 2.4 Sub Structure: pricingOptionGroup - Award Pricing

## 2.4.1 Description

This option is used to price an itinerary applying an award program for a given carrier.

The award option must be combined with the corporate option. You must therefore repeat <pricingOptionGroup> twice, once with <pricingOptionKey> containing "AWD" indicating award, and again with <pricingOptionKey> containing "RW" indicating a corporate reward. You can enter up to 6 corporate codes in <criteriaDetails\>.

-   **<pricingOptionKey1>**\= AWD (Award)
-   **<carrierInformation\>**: Publishing Carrier
-   **<FrequentFlyerInformation>**: can be used (conditional) for tier level override.
-   **<pricingOptionKey2>:** RW (Corporate Unifare)
-   **<optionDetail\>**: The Corporate Code(s)

The following diagram shows the structure:  
![](images/POPT-AWD.png)

  
The example below shows an award program of carrier "6X" with codes 012345 and 456789, overriding tierlevel with "GOLD".

## 2.4.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<message agency="1A" release="1" type="TRPNRQ" version="15"> <pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>AWD</pricingOptionKey> </pricingOptionKey> <carrierInformation> <companyIdentification> <otherCompany>6X</otherCompany> </companyIdentification> </carrierInformation> <frequentFlyerInformation> <frequentTravellerDetails> <tierLevel>GOLD</tierLevel> </frequentTravellerDetails> </frequentFlyerInformation> </pricingOptionGroup> <pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>RW</pricingOptionKey> </pricingOptionKey> <optionDetail> <criteriaDetails> <attributeType>012345</attributeType> </criteriaDetails> <criteriaDetails> <attributeType>456789</attributeType> </criteriaDetails> </optionDetail> </pricingOptionGroup> </message>

## 2.5 Sub Structure: pricingOptionGroup - Best Pricing

## 2.5.1 Description

This option is used to display the lowest available fare for a given itinerary.

-   **<pricingOptionKey>** = BST (Best pricing)

The following diagram shows the structure:  
![](images/POPT-BST.png)

## 2.5.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>BST</pricingOptionKey> </pricingOptionKey> </pricingOptionGroup>

## 2.6 Sub Structure: pricingOptionGroup - Bound input

## 2.6.1 Description

This option allows the user or the calling application to provide bound definitions as part of your pricing query. These allow to show segments of an itinerary within a list of bounds. Each bound must be assigned a numeric identifier. You can include segment references within each bound.

Structure:

-   **<pricingOptionKey>** = BND
-   **<optionDetail>**: to indicate bound numeric identifier in the attributeType field
-   **<paxSegTstReference>**: to select the segments to be included in the bound

## 2.6.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>BND</pricingOptionKey> </pricingOptionKey> <optionDetail> <criteriaDetails> <attributeType>1</attributeType> </criteriaDetails> </optionDetail> <paxSegTstReference> <referenceDetails> <type>S</type> <value>1</value> </referenceDetails> <referenceDetails> <type>S</type> <value>2</value> </referenceDetails> </paxSegTstReference> </pricingOptionGroup> <pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>BND</pricingOptionKey> </pricingOptionKey> <optionDetail> <criteriaDetails> <attributeType>2</attributeType> </criteriaDetails> </optionDetail> <paxSegTstReference> <referenceDetails> <type>S</type> <value>3</value> </referenceDetails> </paxSegTstReference> </pricingOptionGroup> </pricingOptionGroup>

## 2.7 Sub Structure: pricingOptionGroup - Checked-in coupon selection

## 2.7.1 Description

This enables the agent to check repricing result before cheking out the coupons.

When using an informative repricing entry TARIPQ/BQ, the agent has the possibility to pass the first coupon from which the cheched-in coupons C, must be considered as Open for calculation.

The system will then consider Open, the selected coupon but also all the following C coupons of the ticket and/or the conjunctive one and turn them to Open in the call to SSP.

Equivalent cryptic entry is FXF/CK1

![](images/POPT-CK1.png)

-   **<pricingOptionKey>** = CK (Checked-in)
-   **<couponInformation>**\= n (to indicate from which coupon number the option will be considered)

The example below shows an override of the coupon status from first coupon in ticket (1).

## 2.7.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>CK</pricingOptionKey> </pricingOptionKey> <couponInformation> <couponDetails> <cpnNumber>1</cpnNumber> </couponDetails> <otherCouponDetails> <cpnNumber>1</cpnNumber> </otherCouponDetails> </couponInformation> </pricingOptionGroup>

## 2.8 Sub Structure: pricingOptionGroup - Corporate Unifare

## 2.8.1 Description

This option is used to price with a corporate unifare (private fare fare but more level of security, only accessible with corporate code)

The following diagram shows the structure:  
![](images/POPT-RW.png)

-   **<pricingOptionKey**\>: RW
-   **<optionDetail**\>: the corporate code(s) or number(s)

  
The example below shows the use of private fares only accessible via the use of corporate unifare number "012345" or code "AMADEUS"

## 2.8.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>RW</pricingOptionKey> </pricingOptionKey> <optionDetail> <criteriaDetails> <attributeType>012345</attributeType> </criteriaDetails> <criteriaDetails> <attributeType>AMADEUS</attributeType> </criteriaDetails> </optionDetail> </pricingOptionGroup>

## 2.9 Sub Structure: pricingOptionGroup - Corporation Number

## 2.9.1 Description

This option is used to specify the corporation number of the company the passenger belongs to.

This option allow also to apply Corporate name.

The following diagram shows the structure:  
![](images/POPT-CRP.png)

-   **<pricingOptionKey**\>: CRP (Corporation Number)
-   **<optionDetail>**: The Corporation Number

  
The example below shows the use of the corporation number "48906348860"

## 2.9.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>CRP</pricingOptionKey> </pricingOptionKey> <optionDetail> <criteriaDetails> <attributeType>48906348860</attributeType> </criteriaDetails> </optionDetail> </pricingOptionGroup>

## 2.10 Sub Structure: pricingOptionGroup - Discard Lower Total

## 2.10.1 Description

Description:

Option DLT is used to make all the taxes Non-Refundable . The fare search option is combinable with other options.

-   **pricingOptionKey** = DLT (Make taxes Non Refundable)

## 2.10.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>DLT</pricingOptionKey> </pricingOptionKey> </pricingOptionGroup>

## 2.11 Sub Structure: pricingOptionGroup - Downgrade

## 2.11.1 Description

ATC Downgrade aims at reversing an upgraded ticket to its original commercial class.

This option is available for IRU (loyalty system) customers. Thus, some specific IRU checks and process apply. For more details, please refer to IRU specifications.

Equivalent cryptic entry is FXF/DNG

The following diagram shows the structure:

![](images/POPT-DNG.png)

-   **<pricingOptionKey>:** DNG (Downgrade)

The example below shows a downgrade use case.

## 2.11.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>DNG</pricingOptionKey> </pricingOptionKey> </pricingOptionGroup>

## 2.12 Sub Structure: pricingOptionGroup - Exempt from Taxes

## 2.12.1 Description

This option is used to exempt the passenger from one or several or all taxes.

The following diagram shows the structure:  
![](images/POPT-ET.png)

-   **<pricingOptionKey**\>: ET (Exempt tax)
-   **<taxInformation>**: detail of tax to exempt (Conditional)
    -   <taxQualifier>: 7
    -   <isoCountry>: Iso tax code (Mandatory)
    -   <taxNature>: nature code (Conditional)

Note: if <taxInformation> is omitted, all taxes are exempted

  
The example below shows an exemption of tax ZVGO:

## 2.12.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>ET</pricingOptionKey> </pricingOptionKey> <taxInformation> <taxQualifier>7</taxQualifier> <taxType> <isoCountry>ZV</isoCountry> </taxType> <taxNature>GO</taxNature> </taxInformation> </pricingOptionGroup>

## 2.13 Sub Structure: pricingOptionGroup - Fare Currency Override

## 2.13.1 Description

This option is used to choose a specific currency at pricing time.

  
The following diagram shows the structure:  
![](images/POPT-FCO.png)

-   **<pricingOptionKey**\>: FCO (Fare Currency Override)
-   **<currency>** (Mandatory)
    -   <currencyQualifier>: "FCO"
    -   <currencyIsoCode\>: the 3 letter code of the requested currency

## 2.13.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>FCO</pricingOptionKey> </pricingOptionKey> <currency> <firstCurrencyDetails> <currencyQualifier>FCO</currencyQualifier> <currencyIsoCode>USD</currencyIsoCode> </firstCurrencyDetails> </currency> </pricingOptionGroup>

## 2.14 Sub Structure: pricingOptionGroup - Frequent Flyer Information

## 2.14.1 Description

The purpose of this option is to override or price with a frequent flyer number.

The following diagram shows the structure:

![](images/POPT-FTI.png)

-   **<pricingOptionKey>** = SEL (Selection)
-   **<frequentFlyerInformation>**: to give the Frequent Flyer Information: 
    -   <Carrier>
    -   <Number>
    -   <Tier Level>
    -   <Priority Code>
-   **<paxSegTstReference>**: to associate the option to given passengers

  
The example below shows a frequent flyer override.

## 2.14.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOption> <pricingOptionKey> <pricingOptionKey>FTI</pricingOptionKey> </pricingOptionKey> <frequentFlyerInformation> <frequentTravellerDetails> <carrier>6X</carrier> <number>12345678</number> <tierLevel>GOLD</tierLevel> <priorityCode>1</priorityCode> </frequentTravellerDetails> </frequentFlyerInformation> </pricingOption>

## 2.15 Sub Structure: pricingOptionGroup - Get Pricing Options

## 2.15.1 Description

Description:  
  
The option "Get Pricing Options" allows re-pricing a ticket by applying options previously used to price or re-price the original ticket.  
  
  
For functional reasons, not all the original pricing options can be automatically re-applied. The detailed list of the options that are re-applied automatically are described in the specifications.  
  
Structure:  
  
![](images/uml-PricingOptionKey.png)  
**  
<pricingOptionKey> = GPO (Get Pricing Options)**

## 2.15.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>GPO</pricingOptionKey> </pricingOptionKey> </pricingOptionGroup>

## 2.16 Sub Structure: pricingOptionGroup - Hold for future use

## 2.16.1 Description

This option at  allows to force the residual value amount to be refunded on an airline virtual bank account (RTF)

The client can choose to be refunded on an RTF instead of being re-credited. The form of payment of the residual value will be flag as RTF.

The following diagram shows the structure:  
![](images/POPT-RTF.png)

-   **<pricingOptionKey**\>: RTF

## 2.16.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>RTF</pricingOptionKey> </pricingOptionKey> </pricingOptionGroup>

## 2.17 Sub Structure: pricingOptionGroup - Ignore corporate in BLB

## 2.17.1 Description

This option will avoid to reuse the corporate stored during the ticket pricing on pricing engine side.

The following diagram shows the structure:  
![](images/POPT-IGC.png)

-   **<pricingOptionKey**\>: IGC

## 2.17.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>IGC</pricingOptionKey> </pricingOptionKey> </pricingOptionGroup>

## 2.18 Sub Structure: pricingOptionGroup - Mileage Accrual

## 2.18.1 Description

  
This option is used to request the mileage accrual to be returned.

The following diagram shows the structure:  
![](images/POPT-MA.png)

-   **<pricingOptionKey**\>: MA(Mileage accrual)

## 2.18.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>MA</pricingOptionKey> </pricingOptionKey> </pricingOptionGroup>

## 2.19 Sub Structure: pricingOptionGroup - Miles and Cash

## 2.19.1 Description

This option is used for miles and cash pricing.

The following diagram shows the structure:  
![](images/POPT-MC.png)

-   **<pricingOptionKey**\>: MC (Miles and cash)
-   **<monetaryInformation>**: optionally, it is possible to use an "instant pricing" option named "Manual Update in points"
    -   <typeQualifier> = "MUP" (manual update in points)
    -   <amoun>t : the amount

## 2.19.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>MC</pricingOptionKey> </pricingOptionKey> <monetaryInformation> <monetaryDetails> <typeQualifier>MUP</typeQualifier> <amount>10000</amount> </monetaryDetails> </monetaryInformation> </pricingOptionGroup>

## 2.20 Sub Structure: pricingOptionGroup - Negotiated fare

## 2.20.1 Description

This option is used to price with negotiated fares. Negotiated fares are unifares filed in the CAT35. 

The following diagram shows the structure:  
![](images/POPT-RN.png)

-   **<pricingOptionKey**\>: RN

## 2.20.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>RN</pricingOptionKey> </pricingOptionKey> </pricingOptionGroup>

## 2.21 Sub Structure: pricingOptionGroup - New Ticket Higher

## 2.21.1 Description

Description:

The system will return only recommendations with equal or higher fare amount + surcharges than issue amount when option NTH is used in the input. The fare search option is combinable with other options. 

-   **pricingOptionKey** = NTH (New Ticket Higher)

## 2.21.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>NTH</pricingOptionKey> </pricingOptionKey> </pricingOptionGroup>

## 2.22 Sub Structure: pricingOptionGroup - No Option

## 2.22.1 Description

his option is used when no specific pricing option is requested.

The following diagram shows the structure:  
![](images/POPT-NOP.png)

-   **<pricingOptionKey**\>: NOP (No option)

## 2.22.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>NOP</pricingOptionKey> </pricingOptionKey> </pricingOptionGroup>

## 2.23 Sub Structure: pricingOptionGroup - Non-eXchangeable Repricing

## 2.23.1 Description

Description:  
The option is used to waive the penalties for exchangeable and non-exchangeable tickets.  
The option applies to all passengers in the same transaction.

  
Structure:  
• pricingOptionKey = NXR (Non-eXchangeable Repricing)

## 2.23.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOption> <pricingOptionKey> <pricingOptionKey>NXR</pricingOptionKey> </pricingOptionKey> </pricingOption>

## 2.24 Sub Structure: pricingOptionGroup - Override Controlling Carrier

## 2.24.1 Description

This option is used to override the controlling carrier. The controlling carrier override option might be used in specific scenarios where one marketing carrier wants to override the fares of the operating carrier.

The following diagram shows the structure:  
![](images/POPT-OCC.png)

-   **<pricingOptionKey**\>: OCC (Controlling carrier)
-   **<carrierInformation>**: the controlling carrier code

  
The example below shows an override of fares by the use of marginal fares of carrier 6X:

## 2.24.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>OCC</pricingOptionKey> </pricingOptionKey> <carrierInformation> <companyIdentification> <otherCompany>6X</otherCompany> </companyIdentification> </carrierInformation> </pricingOptionGroup>

## 2.25 Sub Structure: pricingOptionGroup - Passenger PTC/Discount

## 2.25.1 Description

  
This option is used to specify passenger type code (PTC) or discount code.

The following diagram shows the structure:  
![](images/POPT-PAX.png)

-   **<pricingOptionKey**\>: PAX
-   **<penDisInformation>** : used to specify the PTC/Discount code to be used. In case of cumulative discounts, discountPenaltyDetails) must be repeated once per PTC/Discount
    -   discountPenaltyQualifier: 701
    -   rate: the PTC/Discount code
-   **<paxSegTstReference>**: Conditional. Specifies a particular passenger and or segment for which the PTC or discount applies

  
The example below shows the use of cumulative discount codes YTH (youth), AD20 (adult older than 20 years) and MIL (military) for passenger 1 on segment 4:

## 2.25.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>PAX</pricingOptionKey> </pricingOptionKey> <penDisInformation> <discountPenaltyQualifier>701</discountPenaltyQualifier> <discountPenaltyDetails> <rate>YTH</rate> </discountPenaltyDetails> <discountPenaltyDetails> <rate>AD20</rate> </discountPenaltyDetails> <discountPenaltyDetails> <rate>MIL</rate> </discountPenaltyDetails> </penDisInformation> <paxSegTstReference> <referenceDetails> <type>P</type> <value>1</value> </referenceDetails> <referenceDetails> <type>S</type> <value>4</value> </referenceDetails> </paxSegTstReference> </pricingOptionGroup>

## 2.26 Sub Structure: pricingOptionGroup - Passenger/Segment/TST selection

## 2.26.1 Description

This option is used to price only part of a PNR.

The following diagram shows the structure:  
![](images/POPT-SEL.png)

-   **<pricingOptionKey**\>: SEL (Selection)
-   **<paxSegTstReference>**: the part of the PNR to price
    -   referenceDetails/type can have below values:

-    
    -    
        -   "E" to refer to an exchange
        -   "S" to refer to a segment
        -   "PI" to refer to an infant passenger
        -   "PA" to refer to a non-infant passenger
        -   "P" to refer to a passenger (both infant and non infant)

Note that "SEL" can only be one of the following types:  
  

-   Document: to reprice a document in an exchange group. This is done using value"E" as referenceDetails/type.

-   Combination of passengers and/or segments.. This is done using values "P", "PA", "PI" and "S" as referenceDetails/type.

Note: You cannot mix the separate types but must use as detailed above.

  
The example below shows a request to reprice the ticket 1, segement 1 passenger 1.

## 2.26.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>SEL</pricingOptionKey> </pricingOptionKey> <paxSegTstReference> <referenceDetails> <type>E</type> <value>1</value> </referenceDetails> <referenceDetails> <type>S</type> <value>1</value> </referenceDetails> </paxSegTstReference> <referenceDetails> <type>P</type> <value>1</value> </referenceDetails> </pricingOptionGroup>

## 2.27 Sub Structure: pricingOptionGroup - Past Date Pricing

## 2.27.1 Description

This option is used to target the fare the were applicable on a given date.

The following diagram shows the structure:  
![](images/POPT-DAT.png)

-   **<pricingOptionKey**\>: DAT (Date Override)
-   **<dateInformation>**: Date

  
The example below shows pricing using fare that were applicable on 27JUN12

## 2.27.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>DAT</pricingOptionKey> </pricingOptionKey> <dateInformation> <businessSemantic>DAT</businessSemantic> <dateTime> <year>2012</year> <month>6</month> <day>27</day> </dateTime> </dateInformation> </pricingOptionGroup>

## 2.28 Sub Structure: pricingOptionGroup - Point Of Sell override

## 2.28.1 Description

This option is used to override the point of sale used by default from the office profile.

The following diagram shows the structure:  
![](images/POPT-POS.png)

-   **<pricingOptionKey**\>: POS (Point Of Sale)
-   **<locationInformation>**:
    -   <locationType\>: "POS"
    -   <code>: the city code

  
The example below shows the override of the office point of sell by new city London ("LON")

## 2.28.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>POS</pricingOptionKey> </pricingOptionKey> <locationInformation> <locationType>POS</locationType> <firstLocationDetails> <code>LON</code> </firstLocationDetails> </locationInformation> </pricingOptionGroup>

## 2.29 Sub Structure: pricingOptionGroup - Point Of Ticketing override

## 2.29.1 Description

This option is used to chose the point of ticketing to use.

The following diagram shows the structure:  
![](images/POPT-POS.png)

-   **<pricingOptionKey**\>: POT (Point of ticketing)
-   **<locationInformation>** :
    -   <locationTyp>e = "POT"
    -   <code> = the city code

  
The example below shows how to define city London ("LON" ) as point of ticketing:

## 2.29.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>POT</pricingOptionKey> </pricingOptionKey> <locationInformation> <locationType>POT</locationType> <firstLocationDetails> <code>LON</code> </firstLocationDetails> </locationInformation> </pricingOptionGroup>

## 2.30 Sub Structure: pricingOptionGroup - Pricing by Fare Family

## 2.30.1 Description

This option is used to chose the fare family requested by passenger. This means only fares belonging to this fare family are considered.

The following diagram shows the structure:  
![](images/POPT-PFF.png)

-   **<pricingOptionKey**\>: PFF (Pricing by fare family)
-   **<optionDetail>**:
    -   <attributeType\>: "FF" (fare family)
    -   <attributeDescription\>: the fare family name
-   **paxSegTstReference**: can be used (Conditional) to specify the segment(s) on which this fare family is expected.

In case no <attributeDescription> is filled, the systems tries to re-apply the one requested in the prcedent pricing.  
The example below shows the choose of fare family "ECOFLEX" for segments 2 and 3

## 2.30.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>PFF</pricingOptionKey> </pricingOptionKey> <optionDetail> <criteriaDetails> <attributeType>FF</attributeType> <attributeDescription>ECOFLEX</attributeDescription> </criteriaDetails> </optionDetail> <paxSegTstReference> <referenceDetails> <type>S</type> <value>2</value> </referenceDetails> <referenceDetails> <type>S</type> <value>3</value> </referenceDetails> </paxSegTstReference> </pricingOptionGroup>

## 2.31 Sub Structure: pricingOptionGroup - PTC only

## 2.31.1 Description

This option is used at pricing time to prevent the system from defaulting to default PTC (ADT or INF) in case there is no fare for requested PTC/discount code.

The following diagram shows the structure:  
![](images/POPT-PTC.png)

-   **<pricingOptionKey**\>: PTC

## 2.31.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>PTC</pricingOptionKey> </pricingOptionKey> </pricingOptionGroup>

## 2.32 Sub Structure: pricingOptionGroup - Published fare

## 2.32.1 Description

This option is used to price with published fares (public to all pricing systems. However, there might be a fares restriction to avoid the of a fare in a given market)

  
Structure  
![](images/POPT-RP.png)

-   **pricingOptionKey** = RP

  
Example:

## 2.32.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>RP</pricingOptionKey> </pricingOptionKey> </pricingOptionGroup>

## 2.33 Sub Structure: pricingOptionGroup - Residual value in FO line

## 2.33.1 Description

A Residual Value may result from a re-issue transaction. In cryptic, when the /RVDoption is used in the confirmed re-pricing entry and a refundable residual value amount exists, no residual value document is generated and the residual value amount is populated in the /\*RV field of the original exchange document of associated passengers (FO line). This option applies to all re-priced passengers.

Option is entered in the informative query and process is applied when the confirmed query is sent. This option is available for British Airways, Qantas and hosted carriers.

The following diagram shows the structure:  
![](images/POPT-RVD.png)

-   **<pricingOptionKey**\>: RVD

Equivalent cryptic entry is FXF/RVD

## 2.33.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>RVD</pricingOptionKey> </pricingOptionKey> </pricingOptionGroup>

## 2.34 Sub Structure: pricingOptionGroup - Tier level

## 2.34.1 Description

The following diagram shows the structure:![](images/POPT-LVL.png)

-   **<pricingOptionKe>:** LVL (Tier leveL)
-   **<frequentFlyerInformation>**: to give the tier level value
-   **<paxSegTstReference>**: to associate the option to a given passenger

**Note** This example shows how to force the tier level (gold) for the calculation of award fares.

This option is available for IRU customers. Thus, some specific IRU checks and process apply. For more details, please refer to IRU specifications.

## 2.34.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOption> <pricingOptionKey> <pricingOptionKey>LVL</pricingOptionKey> </pricingOptionKey> <frequentFlyerInformation> <frequentTravellerDetails> <tierLevel>GOLD</tierLevel> </frequentTravellerDetails> </frequentFlyerInformation> </pricingOption>

## 2.35 Sub Structure: pricingOptionGroup - Transitional Certificate

## 2.35.1 Description

This option is used to trigger the redemption process using transitional certificates.

  
Structure  
![](images/POPT-TRS.png)

-   **<pricingOptionKey**\>: TRS (Transitional certificate)

## 2.35.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>TRS</pricingOptionKey> </pricingOptionKey> </pricingOptionGroup>

## 2.36 Sub Structure: pricingOptionGroup - Unifares

## 2.36.1 Description

This option is used to price with unifares (private fare, restricted to agents that can see this kind of fares)

The following diagram shows the structure:  
![](images/POPT-RU.png)

-   **<pricingOptionKey**\>: RU

## 2.36.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>RU</pricingOptionKey> </pricingOptionKey> </pricingOptionGroup>

## 2.37 Sub Structure: pricingOptionGroup - Upgrade

## 2.37.1 Description

Upgrade option is used to reprice in miles a commercial ticket, which has been rebooked a in better booking class. This option is currently only available for IRU customers. Thus, some specific IRU checks and process apply. For more details, please refer to IRU specifications.

Equivalent cryptic entry is FXF/UPG

![](images/POPT-UPG.png)

-   **<pricingOptionKey**\>: UPG (Upgrade)

## 2.37.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>UPG</pricingOptionKey> </pricingOptionKey> </pricingOptionGroup>

## 2.38 Sub Structure: pricingOptionGroup - Validating Carrier override

## 2.38.1 Description

This option is used to override the default validating carrier at repricing time.

The following diagram shows the structure:  
![](images/POPT-VC.png)

-   **<pricingOptionKey**\>: VC
-   **<carrierInformation>**: contains the validating carrier code

  
The example below shows the use "6X" as validating carrier:

## 2.38.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>VC</pricingOptionKey> </pricingOptionKey> <carrierInformation> <companyIdentification> <otherCompany>6X</otherCompany> </companyIdentification> </carrierInformation> </pricingOptionGroup>

## 2.39 Sub Structure: pricingOptionGroup - Waive Penalty

## 2.39.1 Description

Description:

This option is used to waive the penalty fee.  
  
The option applies to all passengers in the same transaction.

Structure:  
  
 • **pricingOptionKey** = WP (Wave Penalty)

## 2.39.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>WP</pricingOptionKey> </pricingOptionKey> </pricingOptionGroup>

## 2.40 Sub Structure: pricingOptionGroup - Withhold Country Tax

## 2.40.1 Description

This option is used to withhold taxes per country code.

The following diagram shows the structure:  
![](images/POPT-WC.png)

-   **<pricingOptionKey**\>: WC (Withhold country)
-   **<carrierInformation>**: tax detail:
    -   <taxQualifier>: 7 (tax)
    -   <isoCountry>: country code

The example below shows the withhold of taxes of country FR

## 2.40.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>WC</pricingOptionKey> </pricingOptionKey> <taxInformation> <taxQualifier>7</taxQualifier> <taxType> <isoCountry>FR</isoCountry> </taxType> </taxInformation> </pricingOptionGroup>

## 2.41 Sub Structure: pricingOptionGroup - Withhold q surcharges

## 2.41.1 Description

This option is used to withhold the Q surcharges

The following diagram shows the structure:  
![](images/POPT-WQ.png)

-   **<pricingOptionKe>y** = WQ (Withhold Q Surcharge)

## 2.41.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>WQ</pricingOptionKey> </pricingOptionKey> </pricingOptionGroup>

## 2.42 Sub Structure: pricingOptionGroup - Withhold Taxes

## 2.42.1 Description

This option is used to withhold one or several taxes.

The following diagram shows the structure::

![](images/POPT-WT.png)

-   **<pricingOptionKey**\>: WT (Withhold tax)
-   **<taxInformation>**: detail of tax to withhold.
    -   <taxQualifier>: 7
    -   <isoCountry>: Iso tax code (Mandatory)
    -   <taxNature>: nature code (Conditional)

Note: if no tax detail is provided (no "taxInformation"), this means all tax are withhold.

If the tax to be withheld is the airport tax XF, you can specify for which airports as follows using:

-   **<locationInformation>**: Enter the name of the airport in <firstLocationDetails/code>
-   **<paxSegTstReference>**: enter the segment for which the tax should be withheld here

You cannot specify <locationInformation> and <paxSegTstReference>together, you must use one or the other.  
  

  
The example below shows withhold tax ZVGO:

## 2.42.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>WT</pricingOptionKey> </pricingOptionKey> <taxInformation> <taxQualifier>7</taxQualifier> <taxType> <isoCountry>ZV</isoCountry> </taxType> <taxNature>GO</taxNature> </taxInformation> </pricingOptionGroup>

## 2.43 Sub Structure: pricingOptionGroup - ZappOff

## 2.43.1 Description

This function is used to manually apply a discount to either to specified segments or the whole itinerary.

The following diagram shows the structure:  
![](images/POPT-ZAP.png)

-   **<pricingOptionKey**\>: ZAP
-   **<penDisInformation>**: detail of the zap-off to apply
    -   <discountPenaltyQualifier>: "ZAP"
    -   <function>: "700" for base fare or "701" for total fare (only for amount zap-Off, not allowed for percentage zap-off)
    -   <amountType\>: "707" for Amount or "708" for percentage
    -   <amount>: amount or percentage of the zap-Off
    -   <rate>: Ticket Designator
-   **<paxSegTstReference>**: to select the segments for which zap-off is applied

The Zap-Add option is actually a combination of the Zap-Off option with the <corporatename> 'ZAPADD'.

The example below showsa use case where apply a zap-off of 75% on the base fare and apply ticket designator "CH50" for segments 1 and 2

## 2.43.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>ZAP</pricingOptionKey> </pricingOptionKey> <penDisInformation> <discountPenaltyQualifier>ZAP</discountPenaltyQualifier> <discountPenaltyDetails> <function>700</function> <amountType>708</amountType> <amount>75</amount> <rate>CH50</rate> </discountPenaltyDetails> </penDisInformation> <paxSegTstReference> <referenceDetails> <type>S</type> <value>1</value> </referenceDetails> <referenceDetails> <type>S</type> <value>2</value> </referenceDetails> </paxSegTstReference> </pricingOptionGroup>

## 2.44 Sub Structure: pricingOptionGroup -Fare Basis Simple override

## 2.44.1 Description

This option is used to request a specific fare basis. Note that if the requested fare basis is not applicable, pricing request is rejected.

This example shows a 'pricing by fare basis' option applied on a repricing. This request is subsequent to a ATC Shopper request where several recommendations have been selected.

The Fare Basis can apply to a single segment or an association of segments. In this case the Fare Basis information is followed by the references to the associated segments.

The segment reference is the segment identifier.

The ARUNK (arrival unknown, pronounced 'arunk'; segment is one in which the traveler arrives at destination, or airport, A but departs out of destination, or airport B) will not be taken into account and are placed at the end. If ARUNK segment is selected the reject is:CHECK SEGMENT NUMBER.

The rule is to specify only one fare basis by fare component.

The following diagram shows the structure:  
![](images/POPT-FBA.png)

-   **<pricingOptionKey**\>: FBA (Fare Basis simple override)
-   **<optionDetail>**: Fare basis code (Mandatory)
-   **<paxSegTstReference**\>: the passenger and/or segment association (Conditional)

  
The example below shows fare basis "LDLXNSSA" applied to passenger 1 for the itinerary formed by segments with tatoos 3 and 4

## 2.44.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>FBA</pricingOptionKey> </pricingOptionKey> <optionDetail> <criteriaDetails> <attributeType>LDLXNSSA</attributeType> </criteriaDetails> </optionDetail> <paxSegTstReference> <referenceDetails> <type>P</type> <value>1</value> </referenceDetails> <referenceDetails> <type>S</type> <value>3</value> </referenceDetails> <referenceDetails> <type>S</type> <value>4</value> </referenceDetails> </paxSegTstReference> </pricingOptionGroup>

## 2.45 Sub Structure: pricingOptionGroup -Force Breakpoint

## 2.45.1 Description

This option is used to force a breakpoint after a given segment.

repricing

It corresponds to the cryptic entry: FXQ/UPG/BS{segment number}

The following diagram shows the structure:  
![](images/POPT-FFB.png)

-   **<pricingOptionKey>:** FFB (Force BreakPoint)
-   **<paxSegTstReference**\>: reference of the segment after which breakpoint is expected

The example below shows a breakpoint forced after segments 2 and 4:

## 2.45.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>FFB</pricingOptionKey> </pricingOptionKey> <paxSegTstReference> <referenceDetails> <type>S</type> <value>2</value> </referenceDetails> <referenceDetails> <type>S</type> <value>4</value> </referenceDetails> </paxSegTstReference> </pricingOptionGroup>

## 2.46 Sub Structure: pricingOptionGroup -No Journey Turnaround

## 2.46.1 Description

This option is currently only available for IRU customers. Thus, some specific IRU checks and process apply. For more details, please refer to IRU specifications.

Equivalent cryptic entry is FXQ/UPG/NJTP

The following diagram shows the structure:

![](images/POPT-NJT.png)

-   **<pricingOptionKey**\>: NJT (No journey turnaround)

## 2.46.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOption> <pricingOptionKey> <pricingOptionKey>NJT</pricingOptionKey> </pricingOptionKey> </pricingOption>

## 2.47 Sub Structure: pricingOptionGroup-Principle

## 2.47.1 Description

<pricingOptionGroup> comprises several elements, commonly:

-   A name
-   First option name plus any attributes
-   Second option name plus any attributes
-   Third Option name plus any attributes, etc.

You must repeat <pricingOptionGroup> for each applicable pricing option.

The following diagram shows the structure:

![](images/POPTgroup.png)

-   **<pricingOptionKey>**: The smart name of the option (mandatory)
-   **<optionDetail>**: In case the option value takes a free text
-   **<carrierInformation>**: In case the option value takes a carrier code
-   **<penDisInformation>**: In case the option value takes a penalty information
-   **<dateInformation>**: In case the option value takes a date
-   **<frequentFlyerInformation>**: In case the option deals with frequent flyer
-   **<formOfPaymentInformation>**: In case the option deals with form of payment
-   **<locationInformatio>n**: In case the option value takes a location data
-   **<couponInformation>**: In case a coupon reference is required
-   **<paxSegTstReference>**: To associate the option to a passenger a segment or an exchange (in case of repricing)

The same option may not be repeated with the same association.  
  
For example, to add two taxes with the <pricingOptionKey> "AT" you must not repeat <pricingOptionGroup> with the same information. Instead, you use one <pricingOptionGroup> but repeat <taxInformation> twice.  
If you do repeat the same option, the query is rejected and returns and error message: "INVALID REPETITION OF OPTION {xxx}", where {xxx} is the <pricingOptionKey> of the option that is wrongly repeated.

The example below shows an example of the correct usage.  

 If a repetition of the pricing option group as an invalid attribute (for example: a mandatory data that is missing, or a non applicable attribute that is present), query will be rejected with error message "INVALID ATTRIBUTE FOR OPTION {xxx}", where {xxx} is the pricingOptionKey of the option for which there is an invalid attribute.

Some option can not be combined. For example, it is not possible to use options"Pricing by Fare Basis" and "Pricing by Fare Family" in the same pricing request. In case a pricing request contains 2 invalid pricing options, query is rejected with errormessage "CAN NOT COMBINE OPTIONS {xxx} and {yyy}", where {xxx} and {yyy} are the pricingOptionKeyof the non-combinable options.

  
Note that the passenger/segment association are based on the passenger and segment "identifier" that are defined:

-   in passengersGroup/travellersID/travellerDetails/measurementValue for the passenger tattoo
-   in segmentGroup/segmentInformation/itemNumber for the segment tattoo

Example: For pricing by fare basis, the attribute is the Fare Basis, and both passengerand segment association are supported

-   Name = FBA (Fare Basis simple override)
-   Attribute: the Fare Basis
-   Association: the segment/passenger the fare basis should apply to.

## 2.47.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>AT</pricingOptionKey> </pricingOptionKey> <taxInformation> <taxQualifier>7</taxQualifier> <taxType> <isoCountry>ZV</isoCountry> </taxType> <taxNature>GO</taxNature> <taxData> <taxRate>50</taxRate> <taxValueQualifier>A</taxValueQualifier> </taxData> </taxInformation> <taxInformation> <taxQualifier>7</taxQualifier> <taxType> <isoCountry>FR</isoCountry> </taxType> <taxNature>GO</taxNature> <taxData> <taxRate>50</taxRate> <taxValueQualifier>A</taxValueQualifier> </taxData> </taxInformation> </pricingOptionGroup>

## 2.48 Sub Structure: segmentGroup

## 2.48.1 Description

This group comprises two elements:

-   **<boardOff>: O**rigin and destination of a connected group of flights. This allows the customer to identify groups of connected flight segments. One <boardOff> is used for each segment. See the example in 2.2.2 Xml structure.
-   **<segmentInformation>**: Contains the flight details  
    -   <itemNumber> Corresponds to the segment identifier and must be unique. The identifier defines passenger associations in the <pricingOptionGroup>. If two segments have the same <itemNumber>, pricing is rejected and an error message occurs (DUPLICATE SEGMENT TATTOO).

Layout as follows:

-   <segmentInformation>: contains flight details in the following elements:
    -   <flightDate>: This includes:
        -   <departureDate>: Mandatory. Format is DDMMYY
        -   <departureTime: Optional
        -   <arrivalDate>:  Optional 
    -   <boardPointDetails>: Mandatory. Format is a..3
    -   <offpointDetails>: Mandatory. Format is a..3
    -   <companyDetails>  
        -   <marketingCompany>: Optional
        -   <operatingCompany>: Optional
    -   <flightIdentification>  
        -   <flightNumber>: Optional
        -   <bookingClass> : Mandatory. Format is a3
    -   <itemNumber>: Mandatory. Format n..x

If one or more of the optional itinerary data is not present, the process ignores the optional data present and takes the flight details from the availability server.  
If all the optional data is present, the availablility server is not checked and pricing takes place from the infromation provided.

The following diagram shows the structure:  
  

![](images/segmentGroup.jpg)

M: Mandatory

C:Conditional

The example shows two <boardOff> groups with the following information:

_1st <boardOff> group_

-   **<segmentInformation>:** journey NCE/NYC on flights 6X424 (identifier "1") and 6X856 (identifier "2"). Both flights are connected.

_2nd <boardOff> group_

-   **<segmentInformation>:** return NYC/NCE on flight 6X906 (identifier "3").

Where <itemNumber> (segment identifier) is used afterwards to identify segment in pricing options

## 2.48.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<message agency="1A" release="1" type="TRPNRQ" version="15"> <segmentGroup> <boardoff> <origin>NCE</origin> <destination>NYC</destination> </boardoff> <segmentInformation> <flightDate> <departureDate>140914</departureDate> <departureTime>1055</departureTime> <arrivalDate>140914</arrivalDate> <arrivalTime>1200</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>NCE</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>PAR</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> <operatingCompany>6X</operatingCompany> </companyDetails> <flightIdentification> <flightNumber>424</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> <itemNumber>1</itemNumber> </segmentInformation> <segmentInformation> <flightDate> <departureDate>140914</departureDate> <departureTime>1305</departureTime> <arrivalDate>140914</arrivalDate> <arrivalTime>2000</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>PAR</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>NYC</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> <operatingCompany>6X</operatingCompany> </companyDetails> <flightIdentification> <flightNumber>856</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> <itemNumber>2</itemNumber> </segmentInformation> </segmentGroup> <segmentGroup> <boardoff> <origin>NYC</origin> <destination>NCE</destination> </boardoff> <segmentInformation> <flightDate> <departureDate>200914</departureDate> <departureTime>1055</departureTime> <arrivalDate>200914</arrivalDate> <arrivalTime>1200</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>NYC</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>NCE</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> <operatingCompany>6X</operatingCompany> </companyDetails> <flightIdentification> <flightNumber>906</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> <itemNumber>3</itemNumber> </segmentInformation> </segmentGroup> </message>

## 3 Receiving A Reply

Neither the PNR nor data within it is modified by this function.

The reply is the same as in RepricePNRWithBookingClass, (ATC with PNR data)

## 3.1 Sub Structure: RAN(Reissue Amount Without Biasing)

## 3.1.1 Description

RAN(Reissue Amount Without Biasing)codeset is used to display the total reissue amount before the discount application to help customer see the value of upselling. This codeset is displayed in the reply message when activated for an Office ID.

## 3.1.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<automaticReissueInfo> <ticketInfo> <documentDetails> <number>1572118421259</number> <type>ET</type> </documentDetails> </ticketInfo> <couponInfo> <couponDetails> <cpnNumber>1</cpnNumber> </couponDetails> </couponInfo> <baseFareInfo> <monetaryDetails> <typeQualifier>IBA</typeQualifier> <amount>677.00</amount> <currency>GBP</currency> </monetaryDetails> </baseFareInfo> <firstDpiGroup> <reIssuePenalty> <penDisData> <penaltyAmount>0.00</penaltyAmount> <penaltyCurrency>GBP</penaltyCurrency> </penDisData> </reIssuePenalty> <reissueInfo> <monetaryDetails> <typeQualifier>RES</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>RAN</typeQualifier> <amount>1000.72</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>RTO</typeQualifier> <amount>925.72</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TSC</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TST</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>RTA</typeQualifier> <amount>248.72</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TAC</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </otherMonetaryDetails> </reissueInfo> <oldTaxInfo> <monetaryDetails> <typeQualifier>ITA</typeQualifier> <amount>248.72</amount> <currency>GBP</currency> </monetaryDetails> </oldTaxInfo> <reissueBalanceInfo> <monetaryDetails> <typeQualifier>BEQ</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>BGT</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BTA</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BTO</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </otherMonetaryDetails> </reissueBalanceInfo> </firstDpiGroup> <secondDpiGroup> <penalty> <penDisData> <penaltyAmount>0.00</penaltyAmount> <penaltyCurrency>GBP</penaltyCurrency> </penDisData> </penalty> <residualValueInfo> <monetaryDetails> <typeQualifier>RES</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>RTA</typeQualifier> <amount>248.72</amount> <currency>GBP</currency> </otherMonetaryDetails> </residualValueInfo> <oldTaxInfo> <monetaryDetails> <typeQualifier>ITA</typeQualifier> <amount>248.72</amount> <currency>GBP</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>ITO</typeQualifier> <amount>925.72</amount> <currency>GBP</currency> </otherMonetaryDetails> </oldTaxInfo> <issueBalanceInfo> <monetaryDetails> <typeQualifier>BTA</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>BEQ</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BGT</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BTO</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </otherMonetaryDetails> </issueBalanceInfo> </secondDpiGroup> <reissueAttributes> <attributeDetails> <attributeType>NET</attributeType> <attributeDescription>1</attributeDescription> </attributeDetails> </reissueAttributes> </automaticReissueInfo>

* * *

## 3.2 Sub Structure: automaticReissueInfor

## 3.2.1 Description

AutomaticReissueInfo group is composed of:

-   **<ticketInfo>**: ticket number repriced in fareList group
-   **<couponInfo>**: coupon numbers repriced in fareList group

-   **<paperCouponRange>**: group to indicate, in case of multi ticket exchange, the other impacted tickets

-   **<baseFareInfo>**: base fare

Code

Comment

IBA

Old Base Fare / ICOO

-   **<firstDpiGroup>**: ATC calculation information (fares calculation). The information present in the firstDpiGroup is in the reissue currency.

Note:

Code

Comment

ICOO

Issue Currency of Origin

RCOS

Reissue Currency of Selling

RCOO

Reissue Currency of Origin

-   **<SecondDpiGroup>**: ATC calculation information (fares calculation). The information present in the secondDpiGroup is in issue currency.
-   **<thirdGroup>**: ATC calculation information impacting miles data (not filled on ATC revenue use cases)

Note: use miles only for the <thirdGroup>

In the following tables are described all the amounts that can be returned in the firs, second and thirs DpiGroup:

### <firstDpiGroup>

MON - reissueInfo - RES

Residual Value/ RCOS

MON - reissueInfo - REF

Refundable amount/ RCOS

MON - reissueInfo - REU

Reusable amount/ RCOS

MON - reissueInfo - RTA

New Tax/ RCOS

MON - reissueInfo - RTO

Total Price of the Reissue/ RCOS

MON - reissueInfo - TAC

Total Additional Collection/ RCOS

MON - reissueInfo - TSC

TST Additional Collection/ RCOS

MON - reissueInfo - TST

TST Amount/ RCOS

MON - reissueInfo - UPC

Upgrade Cost in Cash/ RCOS

MON - reissueInfo - OCA  

Original total in cash before a discount is applied (base fare + taxes) / RCOS

MON - oldTaxInfo - ITA

Old Tax/ RCOS

MON - oldTaxInfo - ITO

Total price of the issue/ RCOS

MON - oldTaxInfo - NTA

Non Refundable Tax Amount/ RCOS

MON - oldTaxInfo - OTX  

Original tax amount before a discount is applied / RCOS

MON - reissueBalanceInfo - BEQ

Fare Balance / RCOS

MON - reissueBalanceInfo - BGT

Grand Total / RCOS

MON - reissueBalanceInfo - BTA

Tax Balance / RCOS

MON - reissueBalanceInfo - BTO

Ticket Difference / RCOS

'**miles and cash info'**

MON - reissueInfo - RBP

Reissue base fare in points

MON - reissueInfo - RRA

Reissue remaining amount in cash

MON - reissueInfo - RRC

Reissue remaining cash without taxes

MON - reissueInfo - RTT

Reissue total taxes in cash

MON - reissueInfo - ACP

TST Additional Collection of the amount converted in points

MON - reissueInfo - TAR

Total Additional Collection of the remaining amount in cash

MON - reissueInfo - RER

Residual value of the remaining amount in cash

MON - reissueInfo - TAP

Total Additional Collection in points

MON - reissueInfo - REP

Residual value in points

MON - reissueInfo - RUR

Reusable amount of residual value of the remaining amount in cash

MON - reissueInfo - RFR

Refundable amount of residual value of the remaining amountin cash

MON - reissueInfo - OPA  

Original base fare in points before a discount is applied

MON - oldTaxInfo - IBP

Issue base fare in points

MON - oldTaxInfo - ICC

Issue amount of cash converted

MON - oldTaxInfo - IRA

Issue remaining amount in cash

MON - oldTaxInfo - IRC

Issue remaining cash without taxes

MON - oldTaxInfo - ITT

Issue total taxes in cash

MON - reissueBalanceInfo - BBP

Balance base fare in points

MON - reissueBalanceInfo - BCC

Balance amount of cash converted

MON - reissueBalanceInfo - BRA

Balance remaining amount in cash

MON - reissueBalanceInfo - BRC

Balance remaining cash without taxes

MON - reissueBalanceInfo - BTT

Balance total taxes in cash

MON - reissueBalanceInfo - TDP

Ticket difference of the amount in points

MON - reissueBalanceInfo - TDR

Ticket Difference of the remaining amount in cash

### <secondDpiGroup>

MON - residualValueInfo - RES

Residual Value/ ICOS

MON - residualValueInfo - REF

Refundable amount/ ICOS

MON - residualValueInfo - REU

Reusable amount/ ICOS

MON - residualValueInfo - RTA

New Tax/ ICOS

MON - residualValueInfo - RTO

Total price of Reissue/ ICOS

MON - residualValueInfo - UPC

Upgrade Cost in Cash/ ICOS

MON - residualValueInfo - OCA  

Original total in cash before a discount is applied (base fare + taxes) / ICOS

MON - oldTaxInfo - ITA

Old Tax / ICOS

MON - oldTaxInfo – NTA

Non Refundable Tax Amount / ICOS (if any)

MON - oldTaxInfo - ITO

Total Price of Issue / ICOS

MON - oldTaxInfo - OTX  

Original tax amount before a discount is applied / ICOS

MON - issueBalanceInfo - BTA

Tax Balance / ICOS

MON - issueBalanceInfo - BTO

Ticket Difference / ICOS

MON - issueBalanceInfo - NEQ

Non Refundable Amount / ICOS (if any)

**miles and cash info**

MON - residualValueInfo - RBP

Reissue base fare in points

MON - residualValueInfo - RRA

Reissue remaining amount in cash

MON - residualValueInfo - RRC

Reissue remaining cash without taxes

MON - residualValueInfo - RTT

Reissue total taxes in cash

MON - residualValueInfo - ACP

TST Additional Collection of the amount converted in points

MON - residualValueInfo - TAR

Total Additional Collection of the remaining amount in cash

MON - residualValueInfo - RER

Residual value of the remaining amount in cash

MON - residualValueInfo - TAP

Total Additional Collection in points

MON - residualValueInfo - REP

Residual value in points

MON - residualValueInfo - RUR

Reusable amount of residual value of the remaining amount in cash

MON - residualValueInfo - RFR

Refundable amount of residual value of the remaining amountin cash

MON - residualValueInfo - OPA  

Original base fare in points before a discount is applied

MON - oldTaxInfo - IBP

Issue base fare in points

MON - oldTaxInfo - ICC

Issue amount of cash converted

MON - oldTaxInfo - IRA

Issue remaining amount in cash

MON - oldTaxInfo - IRC

Issue remaining cash without taxes

MON - oldTaxInfo - ITT

Issue total taxes in cash

MON - issueBalanceInfo - BBP

Balance base fare in points

MON - issueBalanceInfo - BCC

Balance amount of cash converted

MON - issueBalanceInfo - BRA

Balance remaining amount in cash

MON - issueBalanceInfo - BRC

Balance remaining cash without taxes

MON - issueBalanceInfo - BTT

Balance total taxes in cash

MON - issueBalanceInfo - TDP

Ticket difference of the amount in points

MON - issueBalanceInfo - TDR

Ticket Difference of the remaining amount in cash

### <thirdGroup>

MON - reissueMilesInfo - BNE

Miles Balance

MON - reissueMilesInfo - MIL

Miles Penalty

MON - reissueMilesInfo - UPM

Upgrade in Miles

MON - originalMilesValues - INE

Original Miles Fare.

MON - originalMilesValues - MGT

Total of Miles  
  

-   **<firstPricingInformationKey>:** BLB, key reference to identify pricing conditions on 1A pricing engine side:
    -   dataLength: to indicate the lenght of the key- dataType: always to be set as B (binary)- binaryData: BLB key number
-   **<formOfPaymentInformation>**: old (code:2) (and new (code:3) if any) form of payment. No new form of payment in involuntary use cases

-   **<reissueAttributes>**: this segment conveys specific reissue attributes such as the revalidation flag (for voluntary scenarios). It includes:
    -   **1** may be returned in NET indicator, if netting has applied
    -   **REVAL indicator** is sent in case a revalidation is returned by SSP
    -   **PCI indicator** may be returned with the following values:
        -   **C31:** if Cat 31 has been processed for all Fare Components
        -   **C16:** if at least one coded Cat 16 (and optionally some Cat31) has been processed
        -   **FSG:** otherwise (that is if at least one default fictitious Cat31 was processed)
        -   If no PCI indicator is returned, it means that Cat 31 has been used.
    -   **PCT indicator** may be returned with the following values:
        -   **TOTAL:** Penalty has been collected in the total amount of the TST
        -   **Q:** Penalty has been collected in a Q surcharge in the TST
        -   **BSP:** Penalty should be collected by BSP link
        -   **NODOC:** No document (MCO/EMD) generation supported, but penalty collection not identified
        -   **other values (eg. CP):** Penalty has been collected in a tax with this code (eg. CP) in the TST
        -   If no PCT indicator is returned, it means that penalty has been collected in an EMD/MCO
        -   **RVA** indicator may be returned with N value, in case Residual Value has been waived. Otherwise, RVA indicator is not returned
        -   **PNS** indicator is returned if a No Show penality is applied
        -   **NTF** indicator is returned if the fare is a Non Ticketable Fare
        -   **NET** indicator is returned in case of Netting

-   **<foLine>**: document in exchange fromIt includes:
    -   **<layout>**: with the following information:
        -   <citycode>: city of exchanged ticket issuance
        -   <dateOfIssuance>: of the exchanged ticket
        -   <iataNumber>: of the office where this exchanged ticket was issued
    -   <**ptc>**: passenger type code - 
    -   <**orgAndExchange>**: 
        -   <number >: number of ticket)
        -   <dataIndicator> ORG: original ticket; 3: ticket in exchange

## 3.2.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

* * *

## 3.3 Sub Structure: fareList

## 3.3.1 Description

This group conveys all the information required to create a TST:

-   **<pricingInformation>**: includes:
    -   tstIndicator: automatic/manual calculation indicator (M: manual or involuntary exchanged; I: IATA fare)
    -   salesIndicator: domestic(D)/international(I)
    -   fcmi: FCMI indicator (0: automatically priced; 1: manually priced or involuntary)
-   **<fareReference>**: reference to the TST in the PNR (not relevant in standalone mode)

-   **<lastTktDate>**: last date to ticket the fare

-   **<validatingCarrier>:** calculated by pricing engine

-   **<paxSegReference>:** reference to the query passenger indicator (measurementValue)

-   **<fareDataInformation>**:
    -   R: reissue indicator
    -   B: base fare
    -   712: total Amount / RCOS (reissue currency of selling)
    -   MAC: mileage accrual/points (if applicable)
    -   NTC: new Ticket cheaper / RCOS (if applicable)
    -   PND: non discounted fare = fare amount of base fare on which discounted fare is calculated / RCOS (if applicable)
    -   OBA: Original base fare in cash before a discount is applied

-   **<taxInformation>**: tax breakdown
-   **<bankerRates>:** currency conversion rates

-   **<passengerInformation>**: passenger information (passenger type code, name, surname, etc.)
    -   penDisInformation: penalty/discount details specified in the request - travellerInfo: traveller details (name, surname, etc.) - passengerReference: PA (adult), PI (infant)
-   **<originDestination>**: origin and destination of the fare
-   **<segmentInformation>**: itinerary information

-   **<otherPricingInfo>**: other pricing information such as:
    -   Endorsement (Ex: FE USD507.00 NONREF - CHGS RESTRICTED/NO REFUND)
    -   Fare calculation (Ex: FCA NCE 6X PAR225.006X NCE225.00EUR450.00END)
    -   Mileage breakdown (ex: MIL POINTS BWI DFW54126TOTAL54126)
-   **<warningInformation>**: warnings messages activated during the repricing process:
    -   For example, the warning if no the fare is non refundabe: NON-REFUNDABLE
-   **<automaticReissueInfo>**: breakdown of amounts from the transaction at ticket exchange level

-   **<fareComponentDetailsGroup>**: breakdown of amounts at fare component level

The following diagram shows the structure:  
![](images/fareList.jpg)

## 3.3.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

* * *

## 3.4 Sub Structure: passengerInformation

## 3.4.1 Description

PassengerInformation group is composed of:

-   **<penDisInformation>:** penalty/discount details specified in the request 

-   **<travellerInfo>**: traveller details (type code, name, surname, etc.)

-   **<passengerReference>:**  N/A

## 3.4.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

* * *

## 3.5 Sub Structure: segmentInformation

## 3.5.1 Description

<SegmentInformation> group is composed of:

-   **<connexInformation>**: connection information
-   **<segDetails>**: itinerary information (date, time, city of departure/arrival, booking code, flightnumber, etc.)
-   **<fareQualifier>**: fare basis code and type
-   **<validityInformation>**: no valid after (A) and no valid before (B) information
-   **<bagAllowanceInformation>**: baggage allowance associated to the air segment
-   **<segmentReference>**: identification of segment with query or PNR
-   **<sequenceInformation>**: ordinal number of the repriced segments

## 3.5.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

* * *

## 3.6 Sub Structure: Structure

## 3.6.1 Description

-   **<ticketGroup>**: includes all repricing information associated with the exchange of tickets
-   **<groupEmd>**: includes all repricing information associated with the exchange of EMDs (N/A for ATC Voluntary standalone)

## 3.6.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

* * *

## 3.7 Sub Structure: taxInformation

## 3.7.1 Description

Following codesets are used in TAX segment (<taxIdentifier>):

**Codeset in taxIdentifier**

**Tax type in TST**

**Description**

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

Non Refundable tax  
  

## 3.7.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

* * *

## 3.8 Sub Structure: ticketgroup

## 3.8.1 Description

The <ticketgroup> gathers the following information:

-   **<pnrLocatorData>**: in case of ReissuePricingWithoutPNR, is always filled by 0 as PNR number is unknown
-   **<errorMessage>**: includes the error message activated during the process. This message helps the agent understand the reason why the transaction has been interrupted. The list of errors and a grammar example can be found in the Chapter 4 Error section of this user guide (in version 14 the error message was returned in errorMessage at transaction level)
-   **<fareList>**: this group conveys all repricing information per passenger required to create the new e-ticket

The following diagram shows the structure:

![](images/ticketGroup.jpg)

## 3.8.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

* * *

## 4 Error Messages

**Number**

**Error message**

**Description**

21600

AMADEUS TICKET CHANGER NOT AUTHORIZED

ATC office Profile Indicator “ATR”.

21598

PROVIDE TICKET NUMBER TO EXCHANGE

If there is no or several tickets, for a passenger of the PNR, the following error is returned.

23803

MIXED TICKET TYPES NOT ALLOWED

Passenger or ticket selection refers to both paper and electronic tickets.

23155

DOCUMENT NUMBER NOT ELIGIBLE FOR AMADEUS TICKET UPDATE

 Paper ticket in version 1.0.

21793

PLEASE SELECT COUPON TO EXCHANGE

Coupon selection is missing in case of paper ticket exchange.

23158

ARC INFORMATIVE ONLY – ORIGINAL DOCUMENT NOT REPORTED TO ARC

In case of US market re-pricing, if the line selection refers to a ticket number issued or reissued in an office not reporting to.

21607

DOCUMENT NUMBER NOT PRIMARY

In case of conjunctive ticket re-issue, the primary ticket must be systematically selected.

21599

DOCUMENT NUMBER NOT ELIGIBLE FOR AMADEUS TICKET CHANGER

In case of conjunctive paper ticket re-issue, the primary ticket must be systematically selected.

7450

PARTIAL SELECTION OF PASSENGERS NOT ALLOWED

User attempts to re-price in best pricer only a subset of the passengers that are in the PNR.

5

CHECK SEGMENT NUMBER

The segment selected does not correspond to a flight segment in the query.

31707

MAXIMUM NUMBER OF SEGMENTS EXCEEDED

More than 16 segments are selected in the PNR.

3024

INVALID - PAST DATE SEGMENT

The segment selected is flown or past dated.

13245

PROVIDE SEGMENTS TO EXCHANGE

No segment is found in the query.

477

INVALID FORMAT

Part of the layout is not respected.

23244

INVALID: MULTIPLE REFERENCE TO A TICKET/SEGMENT

A ticket or a passenger is referred twice in the same pricing entry.

1112

INVALID ITINERARY

The user tries to re-price an open segment (without date).

7597

PRICING REQUEST REJECTED DUE TO MARRIED SEGMENT CONTROL

The user tries to re-price only a part of married segments using the standard re-pricing entries.

25938

UNABLE TO PROCESS AVAILABILITY

A time out appears on availability.

21601

ACCESS TO DOCUMENT DENIED

Amadeus is not allowed to retrieve the e-ticket record.

21599

DOCUMENT NUMBER NOT ELIGIBLE FOR AMADEUS TICKET CHANGER

The e-ticket cannot be retrieved.

25679

INVALID COUPON STATUS FOR ATC TRANSACTION

One of the coupons of the ticket is not eligible to exchange.

21706

FARE CALCULATION NOT VALID FOR ATC TRANSACTION

Fare calculation extracted from the e-ticket Records or from the TSR database cannot be fully interpreted and used for re-pricing purposes

24614

NO DATA IN SERVICE TABLE FOR SERVICES

If service codes are not defined and penalty, residual value or non-refundable amount results from ATC calculation.

12705

ATC NOT AUTHORIZED – MCO ELEMENT CANNOT BE CREATED

If MCO tables not correctly set.

21608

INVALID REASON FOR ISSUANCE/CHARGE CODE

If RFIC table not correctly set.

21734

   UNABLE TO RE-PRICE /UNABLE TO FARE - PRICE MANUALLY  - UNABLE TO RE-PRICE / ,                      

21734

   UNABLE TO RE-PRICE /\*NO FARES/RBD/CARRIER/PASSENGER TYPEUNABLE TO RE-PRICE /,                     

21734

   UNABLE TO RE-PRICE /MANUAL TARIFICATIONUNABLE TO RE-PRICE /,                                      

21734

   UNABLE TO RE-PRICE /NO CURRENT FARE IN SYSTEMUNABLE TO RE-PRICE /,                              

21734

   UNABLE TO RE-PRICE /CALCULATE MILEAGEUNABLE TO RE-PRICE /,                                         

21734

   UNABLE TO RE-PRICE /AIRPORT FARES MAY APPLY AT:UNABLE TO RE-PRICE /,                  

21734

   UNABLE TO RE-PRICE /ROUTING OR CONNECTION NOT FOUND UNABLE TO RE-PRICE /,                       

21734

   UNABLE TO RE-PRICE /NO TPM FOR ROUTEUNABLE TO RE-PRICE /,                                 

21734

   UNABLE TO RE-PRICE /NO PRODUCTUNABLE TO RE-PRICE /,                              

21734

   UNABLE TO RE-PRICE /TAX ROUNDING UNIT MISSINGUNABLE TO RE-PRICE /,                    

21734

   UNABLE TO RE-PRICE /\*ATTN - ISSUE SEPARATE TICKETSUNABLE TO RE-PRICE /,               

21734

   UNABLE TO RE-PRICE /TOO MANY PRODUCTS \* SELECT CARRIERUNABLE TO RE-PRICE /,            

21734

   UNABLE TO RE-PRICE /ROUTEUNABLE TO RE-PRICE /,                                              

21734

   UNABLE TO RE-PRICE /VARIABLE DATEUNABLE TO RE-PRICE /,                            

21734

   UNABLE TO RE-PRICE /\*ONE WAY PLUS SURFACEUNABLE TO RE-PRICE /,                         

21734

   UNABLE TO RE-PRICE /MISSING BANKERS RATEUNABLE TO RE-PRICE /,                              

21734

   UNABLE TO RE-PRICE /DIFFERENT CLASS TRIPUNABLE TO RE-PRICE /,                           

21734

   UNABLE TO RE-PRICE /UNABLE TO FARE - TOO MANY SAME CITY SEGMENTSUNABLE TO RE-PRICE /,    

21734

   UNABLE TO RE-PRICE /ORIGINAL FARE CONDITIONS NOT FOUNDUNABLE TO RE-PRICE /,              

21734

   UNABLE TO RE-PRICE /NO FARES FOR . CLASSUNABLE TO RE-PRICE /,                              

21734

   UNABLE TO RE-PRICE /\*ISSUE SEPARATE TICKETS   BRKUNABLE TO RE-PRICE /,                    

21734

   UNABLE TO RE-PRICE /RJT  MISSING TPM FOR TAX CALCUNABLE TO RE-PRICE /,                      

21734

   UNABLE TO RE-PRICE /RJT  FLIGHT/PROD OVERFLOWUNABLE TO RE-PRICE /,                          

21734

   UNABLE TO RE-PRICE /NO FARES POINT OF ORIGINUNABLE TO RE-PRICE /,                 

21734

   UNABLE TO RE-PRICE /NO FARES FOR HIGHEST DIRECT FARE CHECKUNABLE TO RE-PRICE /,           

21734

   UNABLE TO RE-PRICE /NO FARES FOR SPECIFIED CARRIERUNABLE TO RE-PRICE /,                        

21734

   UNABLE TO RE-PRICE /SALE NOT PERMITTED IN BRAZILUNABLE TO RE-PRICE /,                         

21734

   UNABLE TO RE-PRICE /\*NOTES NEEDS DAY/MON VALUE/DI\*UNABLE TO RE-PRICE /,                   

21734

   UNABLE TO RE-PRICE /\*PARAM NEEDS C/R/CN/Z\*UNABLE TO RE-PRICE /,                          

21734

   UNABLE TO RE-PRICE /\*ATTN LOCAL CURRENCY CALCULATION MAY APPLYUNABLE TO RE-PRICE /,             

21734

   UNABLE TO RE-PRICE /FOLLOWING PARAMETER AND CONDITION NOT VALIDUNABLE TO RE-PRICE /,       

21734

   UNABLE TO RE-PRICE /\*SPECIFY MANDATORY BREAK POINTUNABLE TO RE-PRICE /,                 

21734

   UNABLE TO RE-PRICE /TOO MANY SEGMENTS IN TRIPUNABLE TO RE-PRICE /,                           

21734

   UNABLE TO RE-PRICE /\*DISCOUNT MAY APPLY   CHECK TARIFFUNABLE TO RE-PRICE /,                 

21734

   UNABLE TO RE-PRICE /ROE NOT AVAILABLE FOR CURRENCYUNABLE TO RE-PRICE /,                        

21734

   UNABLE TO RE-PRICE /\*ADJACENTS CITIES AT ORIGIN OR DESTINATIONUNABLE TO RE-PRICE /,            

21734

   UNABLE TO RE-PRICE /AT LEAST ONE CATEGORY 31/VOLUNTARY CHANGES NOT FILED BY CARRIERUNABLE TO RE-PRICE /,  

21734

   UNABLE TO RE-PRICE /REISSUE NOT ALLOWEDUNABLE TO RE-PRICE /,                               

21734

   UNABLE TO RE-PRICE /TEMPORARY RESTRICTION PRICE MANUALLYUNABLE TO RE-PRICE /,               

21734

   UNABLE TO RE-PRICE /XXX NOT ALLOWED - VERIFY CURRENCY OF SALEUNABLE TO RE-PRICE /,                

21734

   UNABLE TO RE-PRICE /DISCOUNT COMBINATION NOT ALLOWEDUNABLE TO RE-PRICE /,             

21734

   UNABLE TO RE-PRICE /REJECT DISCOUNTUNABLE TO RE-PRICE /,                                      

21734

   UNABLE TO RE-PRICE /NO FARES FOR PASSENGER TYPE REQUESTEDUNABLE TO RE-PRICE /,          

21734

   UNABLE TO RE-PRICE /CURRENCY OVERFLOWUNABLE TO RE-PRICE /,                           

21734

   UNABLE TO RE-PRICE /NO CURRENT FARE IN SYSTEMUNABLE TO RE-PRICE /,               

21734

   UNABLE TO RE-PRICE /MANUAL MANIPULATION OF BANK SELLING RATE NOT ALLOWEDUNABLE TO RE-PRICE /,   

21734

   UNABLE TO RE-PRICE /CURRENCY FARE RESTRICTED FOR ORIGIN CITYUNABLE TO RE-PRICE /,       

21734

   UNABLE TO RE-PRICE /NO FARE FOR BOOKING CODE-TRY OTHER PRICING OPTIONSUNABLE TO RE-PRICE /,        

21734

   UNABLE TO RE-PRICE /NO FARES FOR FARE TYPE REQUESTEDUNABLE TO RE-PRICE /,             

21734

   UNABLE TO RE-PRICE /ROUTING DATA UNAVAILABLE-CHECK WITH CARRIERUNABLE TO RE-PRICE /,       

21734

   UNABLE TO RE-PRICE /FARES NOT COMBINABLE FOR PASSENGER TYPE REQUESTEDUNABLE TO RE-PRICE /,  

21734

   UNABLE TO RE-PRICE /NO VALID FARE/RULE COMBINATIONS FOR PRICINGUNABLE TO RE-PRICE /,      

21734

   UNABLE TO RE-PRICE /HIP MAY APPLY/UNABLE TO VERIFYUNABLE TO RE-PRICE /,                  

21734

   UNABLE TO RE-PRICE /CHECK SEGMENT/FARE BASIS CODEUNABLE TO RE-PRICE /,                 

21734

   UNABLE TO RE-PRICE /ISSUE SEPARATE TICKETS-MULTIPLE CURRENCIES APPLYUNABLE TO RE-PRICE /,   

21734

   UNABLE TO RE-PRICE /OPEN SEGMENTS NOT ALLOWEDUNABLE TO RE-PRICE /,                

21734

   UNABLE TO RE-PRICE /CURRENCY VALUE GREATER THAN BASE FAREUNABLE TO RE-PRICE /,     

21734

   UNABLE TO RE-PRICE /AMOUNT PROCESS INVALID - RESIDUAL TAXESUNABLE TO RE-PRICE /,            

21734

   UNABLE TO RE-PRICE /UNABLE TO PROCESS / INTERLINE OR MULTI TAXUNABLE TO RE-PRICE /,

21734

   UNABLE TO RE-PRICE /DECIMAL PLACE INCORRECT FOR CURRENCYUNABLE TO RE-PRICE /,         

21734

   UNABLE TO RE-PRICE /CHECK TRAP FORMAT:INVALID MARKET REQUESTEDUNABLE TO RE-PRICE /,    

21734

   UNABLE TO RE-PRICE /COMPANION FARES EXIST - ODD NUMBER PSGRS - DIVIDE PNRUNABLE TO RE-PRICE /,      

21734

   UNABLE TO RE-PRICE /TOTAL AMOUNT TOO BIG TO DISPLAYUNABLE TO RE-PRICE /,          

21734

   UNABLE TO RE-PRICE /CARRIER RESTRICTED ACCESS TO CAT 31/VOLUNTARY CHANGESUNABLE TO RE-PRICE /,  

21734

   UNABLE TO RE-PRICE /ATTN\* CHANGE TO NO STOPOVER MAY VARY FAREUNABLE TO RE-PRICE /,  

21734

   UNABLE TO RE-PRICE /VERIFY CURRENCY OPTIONUNABLE TO RE-PRICE /,              

21734

   UNABLE TO RE-PRICE /RESIDUAL TAXES MAY APPLY - CHK TAXESUNABLE TO RE-PRICE /,        

21734

   UNABLE TO RE-PRICE /CHECK FORMATUNABLE TO RE-PRICE /,                   

21734

   UNABLE TO RE-PRICE /REJT ACTION CODEUNABLE TO RE-PRICE /,     

21734

   UNABLE TO RE-PRICE /REJT CARRIERUNABLE TO RE-PRICE /,                       

21734

   UNABLE TO RE-PRICE /REJT FLIGHT NUMBERUNABLE TO RE-PRICE /,                       

21734

   UNABLE TO RE-PRICE /REJT CLASSUNABLE TO RE-PRICE /,                        

21734

   UNABLE TO RE-PRICE /REJT DATEUNABLE TO RE-PRICE /,                             

21734

   UNABLE TO RE-PRICE /REJT DEPARTURE CITYUNABLE TO RE-PRICE /,                  

21734

   UNABLE TO RE-PRICE /REJT HOURUNABLE TO RE-PRICE /,                        

21734

   UNABLE TO RE-PRICE /REJT DATE CHANGE INDICATORUNABLE TO RE-PRICE /,        

21734

   UNABLE TO RE-PRICE /REJT ARRIVAL CITYUNABLE TO RE-PRICE /,                                  

21734

   UNABLE TO RE-PRICE /REJT NUMBER OF INTERMEDIATE STOPSUNABLE TO RE-PRICE /,                 

21734

   UNABLE TO RE-PRICE /REJT STOPOVER CODEUNABLE TO RE-PRICE /,                               

21734

   UNABLE TO RE-PRICE /REJT ROUTE CODEUNABLE TO RE-PRICE /,                       

21734

   UNABLE TO RE-PRICE /REJT EQUIPMENT TYPEUNABLE TO RE-PRICE /,                   

21734

   UNABLE TO RE-PRICE /REJT FARE BASIS CODEUNABLE TO RE-PRICE /,                                

21734

   UNABLE TO RE-PRICE /CONFLICTING OPTIONS USEDUNABLE TO RE-PRICE /,                       

21734

   UNABLE TO RE-PRICE /COMPANION PROCESSING PLEASE SPECIFY CLASSUNABLE TO RE-PRICE /,     

21734

   UNABLE TO RE-PRICE /ENTRY REQUIRES PREVIOUS PRICING/FARE DISPLAY REQUESTUNABLE TO RE-PRICE /, 

21734

   UNABLE TO RE-PRICE /RJT CHRONOLOGICAL ORDERUNABLE TO RE-PRICE /,                            

21734

   UNABLE TO RE-PRICE /AIRPORT/CITY CODE NOT IN SYSTEMUNABLE TO RE-PRICE /,               

21734

   UNABLE TO RE-PRICE /MANUAL TARIFICATIONUNABLE TO RE-PRICE /,                         

21734

   UNABLE TO RE-PRICE /UNKNOWN CRT CITY UNABLE TO RE-PRICE /,                        

21734

   UNABLE TO RE-PRICE /REJT IDENTICAL CITY SEGMENTSUNABLE TO RE-PRICE /,                 

21734

   UNABLE TO RE-PRICE /RJT TOO MANY SURFACE SEGMENTSUNABLE TO RE-PRICE /,                   

21734

   UNABLE TO RE-PRICE /FUTURE DATE TKTNG NOT PERMITTEDUNABLE TO RE-PRICE /,                   

21734

   UNABLE TO RE-PRICE /PAST DATE TKTNG NOT PERMITTED - CHK DATESUNABLE TO RE-PRICE /,      

21734

   UNABLE TO RE-PRICE /BK OPTION NOT ALLOWED IN OPEN CLASSUNABLE TO RE-PRICE /,            

21734

   UNABLE TO RE-PRICE /UNABLE TO PROCESS/INTERLINE OR MULTI-TAXUNABLE TO RE-PRICE /,      

21734

   UNABLE TO RE-PRICE /EQUIPMENT CODE NOT FOUNDUNABLE TO RE-PRICE /,                     

21734

   UNABLE TO RE-PRICE /DOJ NOT ALLOWED IN NEGOTIATED PRICINGUNABLE TO RE-PRICE /,              

21734

   UNABLE TO RE-PRICE /CHECK TRAP FORMAT:ITINERARY OVER SEGMNTSUNABLE TO RE-PRICE /,           

21734

   UNABLE TO RE-PRICE /CHECK TRAP FORMAT:NO PARAMETERS INPUTUNABLE TO RE-PRICE /,          

21734

   UNABLE TO RE-PRICE /ATTN INDICATE STOPOVER UNABLE TO RE-PRICE /,                           

21734

   UNABLE TO RE-PRICE /CHECK TRAP FORMAT:INVALID FARE REQUESTUNABLE TO RE-PRICE /,             

21734

   UNABLE TO RE-PRICE /CHECK TRAP FORMAT:INVALID MARKET REQUESTUNABLE TO RE-PRICE /,          

21734

   UNABLE TO RE-PRICE /CHECK TRAP FORMAT:INVALID CARRIER REQUESTUNABLE TO RE-PRICE /,          

21734

   UNABLE TO RE-PRICE /CHECK TRAP FORMAT:NO BOOKING CODE INPUTUNABLE TO RE-PRICE /,        

21734

   UNABLE TO RE-PRICE /CHECK TRAP FORMATUNABLE TO RE-PRICE /,                        

21734

   UNABLE TO RE-PRICE /PRICING BY FARE BASIS OPTION NOT ALLOWEDUNABLE TO RE-PRICE /,         

21734

   UNABLE TO RE-PRICE /INVALID TRAP REQUESTUNABLE TO RE-PRICE /,                              

21734

   UNABLE TO RE-PRICE /UNABLE TO FARE - CHECK BOOKING CODEUNABLE TO RE-PRICE /,              

21734

   UNABLE TO RE-PRICE /MANDATORY BOOKING CLASS ON SEGMENTSUNABLE TO RE-PRICE /,        

21734

   UNABLE TO RE-PRICE /RJT RESERVATION DATEUNABLE TO RE-PRICE /,                          

21734

   UNABLE TO RE-PRICE /RJT AVAILABILITYUNABLE TO RE-PRICE /,                          

21734

   UNABLE TO RE-PRICE /CARRIERS WITH DIFFERENT PRICING LOGICS CANNOT BE MIXEDUNABLE TO RE-PRICE /, 

21734

   UNABLE TO RE-PRICE /INVALID REQUEST TYPEUNABLE TO RE-PRICE /,                

21734

   UNABLE TO RE-PRICE /INVALID PASSENGER TYPE CODE UNABLE TO RE-PRICE /,                     

21734

   UNABLE TO RE-PRICE /INVALID DISCOUNTUNABLE TO RE-PRICE /,                         

21734

   UNABLE TO RE-PRICE /PAX TYPE RESTRICTED USE VALID PAX TYPEUNABLE TO RE-PRICE /,     

21734

   UNABLE TO RE-PRICE /INVLD PSGR COMBINATIONUNABLE TO RE-PRICE /,                            

21734

   UNABLE TO RE-PRICE /CATEGORYUNABLE TO RE-PRICE /,                                        

21734

   UNABLE TO RE-PRICE /EXCEEDS MAXIMUM FARE DISCOUNT CODESUNABLE TO RE-PRICE /,           

21734

   UNABLE TO RE-PRICE /INVALID PARTNERUNABLE TO RE-PRICE /,                             

21734

   UNABLE TO RE-PRICE /BAD FORMAT IN /RUNABLE TO RE-PRICE /,                      

21734

   UNABLE TO RE-PRICE /REJT DISCOUNT NOT ALLOWEDUNABLE TO RE-PRICE /,               

21734

   UNABLE TO RE-PRICE /REJT TOO MUCH ADDITIVE DISCOUNTSUNABLE TO RE-PRICE /,               

21734

   UNABLE TO RE-PRICE /REJT BAD DATEUNABLE TO RE-PRICE /,                               

21734

   UNABLE TO RE-PRICE /DATE OVERRIDE OPTION NOT ALLOWEDUNABLE TO RE-PRICE /,             

21734

   UNABLE TO RE-PRICE /REJT FARE RULE IN /RUNABLE TO RE-PRICE /,                

21734

   UNABLE TO RE-PRICE /VERIFY RULE OPTION - UNABLE TO RE-PRICE /,                       

21734

   UNABLE TO RE-PRICE /REJT CORPORATE NUMBERUNABLE TO RE-PRICE /,                    

21734

   UNABLE TO RE-PRICE /REJT NEGO OPTIONS NOT ALLOWEDUNABLE TO RE-PRICE /,       

21734

   UNABLE TO RE-PRICE /REJT CURRENCY CODEUNABLE TO RE-PRICE /,                       

21734

   UNABLE TO RE-PRICE /REJT VALIDATING CARRIERUNABLE TO RE-PRICE /,             

21734

   UNABLE TO RE-PRICE /REJT PAYMENT OPTIONUNABLE TO RE-PRICE /,                          

21734

   UNABLE TO RE-PRICE /REJT WITHHOLD-EXEMPT TAXESUNABLE TO RE-PRICE /,              

21734

   UNABLE TO RE-PRICE /REJT ALTERNATE BOOKING CODEUNABLE TO RE-PRICE /,                   

21734

   UNABLE TO RE-PRICE /MAXIMUM OF 3 REQUEST TYPES ALLOWEDUNABLE TO RE-PRICE /,             

21734

   UNABLE TO RE-PRICE /CONFLICTING RULE OPTIONS NOT ALLOWEDUNABLE TO RE-PRICE /,          

21734

   UNABLE TO RE-PRICE /MAXIMUM OF 5 RULE OPTIONS ALLOWEDUNABLE TO RE-PRICE /,          

21734

   UNABLE TO RE-PRICE /CK FORMAT - REFER TO HELP FOR THIS TRANSACTIONUNABLE TO RE-PRICE /,      

21734

   UNABLE TO RE-PRICE /CK FORMAT RULE PARAMETER MISSINGUNABLE TO RE-PRICE /,           

21734

   UNABLE TO RE-PRICE /CK FORMAT - SEPARATE MULTIPLE REQUESTUNABLE TO RE-PRICE /,  

21734

   UNABLE TO RE-PRICE /CK FORMAT - ZO- ENTRYUNABLE TO RE-PRICE /,    

21734

   UNABLE TO RE-PRICE /TRANSACTION NOT VALID FOR USERUNABLE TO RE-PRICE /,        

21734

   UNABLE TO RE-PRICE /PERCENT VALUE MUST BE 0-100 WITHOUT DECIMALUNABLE TO RE-PRICE /,     

21734

   UNABLE TO RE-PRICE /B OR T OR NUMERIC MUST FOLLOW ZOUNABLE TO RE-PRICE /,         

21734

   UNABLE TO RE-PRICE /CURRENCY AMOUNT EXCEEDS 11 DIGIT MAX LENGTHUNABLE TO RE-PRICE /,   

21734

   UNABLE TO RE-PRICE /DECIMAL PLACE INCORRECT FOR CURRENCYUNABLE TO RE-PRICE /,         

21734

   UNABLE TO RE-PRICE /TICKET DESIGNATOR TOO LONG TO PROCESSUNABLE TO RE-PRICE /,    

21734

   UNABLE TO RE-PRICE /CK FORMAT - BASE/TOTAL ONLY WITH AMOUNT DISCUNABLE TO RE-PRICE /,     

21734

   UNABLE TO RE-PRICE /ENTRY CONTAINS DUPLICATE SEGMENTSUNABLE TO RE-PRICE /,               

21734

   UNABLE TO RE-PRICE /CHECK SEGMENT NUMBERUNABLE TO RE-PRICE /,                 

21734

   UNABLE TO RE-PRICE /CK FORMAT - AT- ENTRYUNABLE TO RE-PRICE /,                      

21734

   UNABLE TO RE-PRICE /AT- ENTRY FORMAT NOT ALLOWEDUNABLE TO RE-PRICE /,             

21734

   UNABLE TO RE-PRICE /MAXIMUM 8 WITHHOLD/ADD TAXES ENTRIESUNABLE TO RE-PRICE /,        

21734

   UNABLE TO RE-PRICE /INVALID ARC NUMBERUNABLE TO RE-PRICE /,                  

21734

   UNABLE TO RE-PRICE /INVALID PF NUMBERUNABLE TO RE-PRICE /,                               

21734

   UNABLE TO RE-PRICE /MANUAL MANIPULATION OF TAXES NOT ALLOWEDUNABLE TO RE-PRICE /,    

21734

   UNABLE TO RE-PRICE /DISCOUNT PRICING OPTION NOT ALLOWEDUNABLE TO RE-PRICE /,   

21734

   UNABLE TO RE-PRICE /CK FORMAT - AC- ENTRYUNABLE TO RE-PRICE /,                     

21734

   UNABLE TO RE-PRICE /CK FORMAT - WC- ENTRYUNABLE TO RE-PRICE /,                         

21734

   UNABLE TO RE-PRICE /CORPORATE NAME NOT FOUNDUNABLE TO RE-PRICE /,              

21734

   UNABLE TO RE-PRICE /FORMAT NEEDS CORPORATE CODEUNABLE TO RE-PRICE /,                        

21734

   UNABLE TO RE-PRICE /NO RECOMMENDATION FOUND WITH LOWER OR EQUAL PRICEUNABLE TO RE-PRICE /,    

21734

   UNABLE TO RE-PRICE /UNABLE TO PRICE CURRENT PNR - NO ALTERNATE ITINERARY FOUNDUNABLE TO RE-PRICE /

21734

   UNABLE TO RE-PRICE /UNABLE TO PRICE CURRENT PNRUNABLE TO RE-PRICE /,            

21734

   UNABLE TO RE-PRICE /NO FARE FOUND FOR REQUESTED ITINERARYUNABLE TO RE-PRICE /,            

21734

   UNABLE TO RE-PRICE /BEST BUY HANDLER DOWNUNABLE TO RE-PRICE /,                

21734

   UNABLE TO RE-PRICE /CHECK ACT CODEUNABLE TO RE-PRICE /,                   

21734

   UNABLE TO RE-PRICE /CHECK CURRENCYUNABLE TO RE-PRICE /,                                  

21734

   UNABLE TO RE-PRICE /CKECK FORMATUNABLE TO RE-PRICE /,                                         

21734

   UNABLE TO RE-PRICE /INVALID CARRIER CODEUNABLE TO RE-PRICE /,                                 

21734

   UNABLE TO RE-PRICE /VERIFY DATE -UNABLE TO RE-PRICE /,                                     

21734

   UNABLE TO RE-PRICE /VERIFY DATE - RETURN DATE IS PRIOR TO ORIGINATION DATEUNABLE TO RE-PRICE /,    

21734

   UNABLE TO RE-PRICE /UNKNOWN CITY/AIRPORTUNABLE TO RE-PRICE /,                                  

21734

   UNABLE TO RE-PRICE /INVALID GLOBAL DIRECTIONUNABLE TO RE-PRICE /,                  

21734

   UNABLE TO RE-PRICE /ENTRY REQUIRES PREVIOUS FARE DISPLAY REQUESTUNABLE TO RE-PRICE /,       

21734

   UNABLE TO RE-PRICE /MAXIMUM OF 3 AIRLINE CODES ALLOWEDUNABLE TO RE-PRICE /,                    

21734

   UNABLE TO RE-PRICE /NYY NOT VALID FOR YY REQUESTUNABLE TO RE-PRICE /,                   

21734

   UNABLE TO RE-PRICE /MAXIMUM OF 1 GLOBAL DIRECTION ALLOWEDUNABLE TO RE-PRICE /,                

21734

   UNABLE TO RE-PRICE /ONLY NUC FOR DISP OPTIONUNABLE TO RE-PRICE /,                                

21734

   UNABLE TO RE-PRICE /CK FORMAT INVALID CITY PAIRUNABLE TO RE-PRICE /,                        

21734

   UNABLE TO RE-PRICE /CK FORMAT - INVALID WALMART REQUEST :UNABLE TO RE-PRICE /,        

21734

   UNABLE TO RE-PRICE /CONFLICTING OPTIONS USEDUNABLE TO RE-PRICE /,                

21734

   UNABLE TO RE-PRICE /ACCESS DENIEDUNABLE TO RE-PRICE /,                                    

21734

   UNABLE TO RE-PRICE /CHECK DIAG FORMATUNABLE TO RE-PRICE /,               

21734

   UNABLE TO RE-PRICE /OPTION NOT ALLOWED IN /DUNABLE TO RE-PRICE /,         

21734

   UNABLE TO RE-PRICE /INVALID ENTRYUNABLE TO RE-PRICE /,                              

21734

   UNABLE TO RE-PRICE /VERIFY ITINERARYUNABLE TO RE-PRICE /,                             

21734

   UNABLE TO RE-PRICE /MULTIPLE PASSENGER TYPE CODE NOT ALLOWED WITH DIAG OPTIONUNABLE TO RE-PRICE /,

21734

   UNABLE TO RE-PRICE /INVALID FORMATUNABLE TO RE-PRICE /,                                   

21734

   UNABLE TO RE-PRICE /DIAG PROCESS UNAVAILABLE FOR THIS FAREUNABLE TO RE-PRICE /,                

21734

   UNABLE TO RE-PRICE /ENTER DIAG SEGMENT SELECTION OR BRKPUNABLE TO RE-PRICE /,                  

21734

   UNABLE TO RE-PRICE /BOOKING CODE OVERRIDE NOT ALLOWED IN OPEN CLASSUNABLE TO RE-PRICE /,        

21734

   UNABLE TO RE-PRICE /REQUESTED CABIN NOT OFFEREDUNABLE TO RE-PRICE /,               

21734

   UNABLE TO RE-PRICE /REQUESTED CABIN NOT AVAILABLEUNABLE TO RE-PRICE /,        

21734

   UNABLE TO RE-PRICE /INVALID STOPOVERUNABLE TO RE-PRICE /,                         

21734

   UNABLE TO RE-PRICE //H INCOMPATIBLE WITH /P, /S OR /IUNABLE TO RE-PRICE /,    

21734

   UNABLE TO RE-PRICE /INVALID CLASSUNABLE TO RE-PRICE /,                    

21734

   UNABLE TO RE-PRICE /TRAPS TOOL IS DECOMMISSIONED - USE FARES DIAGNOSTIC PRODUCTUNABLE TO RE-PRICE /,

21734

   UNABLE TO RE-PRICE /NO FLIGHT FOUND FOR REQUESTED ITINERARYUNABLE TO RE-PRICE /,         

21734

   UNABLE TO RE-PRICE /NO JOURNEY FOUND FOR REQUESTED ITINERARYUNABLE TO RE-PRICE /,     

21734

   UNABLE TO RE-PRICE /INVALID COMMERCIAL FARE FAMILYUNABLE TO RE-PRICE /,          

21734

   UNABLE TO RE-PRICE /NO FARE FAMILY FOUND FOR REQUESTED COMMERCIAL FARE FAMILYUNABLE TO RE-PRICE /, 

21734

   UNABLE TO RE-PRICE /NO FARE FOUND FOR REQUESTED FARE FAMILYUNABLE TO RE-PRICE /,      

21734

   UNABLE TO RE-PRICE /SPECIFY TIMES OF ARRIVAL/DEPARTURE TO AVOID OVERLAPPINGUNABLE TO RE-PRICE /,   

21734

   UNABLE TO RE-PRICE /ONE WAY RE-PRICING NOT ALLOWEDUNABLE TO RE-PRICE /,              

21734

   UNABLE TO RE-PRICE /INVALID POINT OF JOURNEY ORIGINUNABLE TO RE-PRICE /,         

21734

   UNABLE TO RE-PRICE /CHECK SEQUENCE NUMBERUNABLE TO RE-PRICE /,            

21734

   UNABLE TO RE-PRICE /CHECK PASSENGER NUMBERUNABLE TO RE-PRICE /,         

21734

   UNABLE TO RE-PRICE /CHECK PASSENGER INFORMATIONUNABLE TO RE-PRICE /,     

21734

   UNABLE TO RE-PRICE /CHECK PASSENGER ASSOCIATIONUNABLE TO RE-PRICE /,                       

21734

   UNABLE TO RE-PRICE /FEE CALCULATION FAILURE - CHECK CURRENCYUNABLE TO RE-PRICE /,             

21734

   UNABLE TO RE-PRICE /INVALID PSR - PLEASE USE VALID PSR OR PRICE WITH /NF OPTIONUNABLE TO RE-PRICE /,  

21734

   UNABLE TO RE-PRICE /INVALID SFM SECURITY/OFP SETTINGS - CONTACT ADMINUNABLE TO RE-PRICE /,     

21734

   UNABLE TO RE-PRICE /INVALID PSR - PLEASE USE VALID PSRUNABLE TO RE-PRICE /,                  

21734

   UNABLE TO RE-PRICE /SFM - TRANSACTION FEE USAGE RESTRICTEDUNABLE TO RE-PRICE /,             

21734

   UNABLE TO RE-PRICE /\* RW - SPECIFIC PROCESS : VERIFY INPUT \*UNABLE TO RE-PRICE /,           

21734

   UNABLE TO RE-PRICE /\* CT - SPECIFIC PROCESS : VERIFY INPUT \*UNABLE TO RE-PRICE /,             

21734

   UNABLE TO RE-PRICE /ORIGINAL OFFICE ID NOT FOUNDUNABLE TO RE-PRICE /,                        

21734

   UNABLE TO RE-PRICE /CHANGE OF PTC BETWEEN ISSUE AND REISSUE IS FORBIDDENUNABLE TO RE-PRICE /,  

21734

   UNABLE TO RE-PRICE /ISSUE FARE WAS UNIFARE, PLEASE REQUEST AT LEAST UNIFAREUNABLE TO RE-PRICE /,

21734

   UNABLE TO RE-PRICE /ISSUE FARE WAS PUBLIC, PLEASE REQUEST AT LEAST PUBLIC FARESUNABLE TO RE-PRICE /,

21734

   UNABLE TO RE-PRICE /PLEASE REQUEST SAME CORPORATE CONTRACT AS FOR ISSUEUNABLE TO RE-PRICE /,     

21734

   UNABLE TO RE-PRICE /ORIGINAL FARE CALC MANUALLY MODIFIED - REISSUE MANUALLYUNABLE TO RE-PRICE /,   

21734

   UNABLE TO RE-PRICE /REQUESTED CLASS NOT AVAILABLEUNABLE TO RE-PRICE /,             

21734

   UNABLE TO RE-PRICE /REQUESTED CLASS NOT OFFEREDUNABLE TO RE-PRICE /,                   

21734

   UNABLE TO RE-PRICE /RJT xxx CODE ONLY VALID AFTER PRICING/BEST BUYUNABLE TO RE-PRICE /,       

21734

   UNABLE TO RE-PRICE /NO RECOMMENDATION FOUND WITH HIGHER OR EQUAL PRICEUNABLE TO RE-PRICE /,    

21734

   UNABLE TO RE-PRICE /TKTS WITH SAME PTC BUT DIFFERENT PRICINGS - TRY SEPARATELYUNABLE TO RE-PRICE /,

21734

   UNABLE TO RE-PRICE /ITINERARY DISCREPANCY BETWEEN TKTS - TRY SEPARATELYUNABLE TO RE-PRICE /,   

21734

   UNABLE TO RE-PRICE /TKTS NOT PRICED IN THE SAME PLACE - TRY SEPARATELYUNABLE TO RE-PRICE /,   

21734

   UNABLE TO RE-PRICE /TKTS NOT PRICED AT THE SAME DATE/TIME - TRY SEPARATELYUNABLE TO RE-PRICE /,  

21734

   UNABLE TO RE-PRICE /TKTS NOT PRICED WITH SAME POS.POT OPTION - TRY SEPARATELYUNABLE TO RE-PRICE /,

21734

   UNABLE TO RE-PRICE /TKTS WITH DIFFERENT PRICINGS - TRY SEPARATELYUNABLE TO RE-PRICE /,      

21734

   UNABLE TO RE-PRICE /ENTRY NOT AUTHORISEDUNABLE TO RE-PRICE /,             

21734

   UNABLE TO RE-PRICE /FARE AUDITOR INVALID REQUESTUNABLE TO RE-PRICE /,  

21734

   UNABLE TO RE-PRICE /PAF-ONLY ONE PASSENGER TYPE IS ALLOWEDUNABLE TO RE-PRICE /,      

21734

   UNABLE TO RE-PRICE /DOCUMENT NOT ELIGIBLE FOR SUBSEQUENT REISSUEUNABLE TO RE-PRICE /,  

21734

   UNABLE TO RE-PRICE /SUBSEQUENT REISSUE - ORIGINAL FARE CONDITIONS NOT FOUNDUNABLE TO RE-PRICE /, 

21734

   UNABLE TO RE-PRICE /ORIGINAL FARE CONSTRUCTION IDENTIFICATION FAILEDUNABLE TO RE-PRICE /,     

21734

   UNABLE TO RE-PRICE /ORIGINAL FARE CLASS IDENTIFICATION FAILEDUNABLE TO RE-PRICE /,   

21734

   UNABLE TO RE-PRICE /TICKET ALREADY REISSUED - FURTHER REISSUE NOT ALLOWED BY CARRIERUNABLE TO RE-PRICE /, 

21734

   UNABLE TO RE-PRICE /MAXIMUM NUMBER OF PASSENGERS EXCEEDEDUNABLE TO RE-PRICE /,       

21734

   UNABLE TO RE-PRICE /INVALID DATEUNABLE TO RE-PRICE /,                        

21734

   UNABLE TO RE-PRICE /BAD DATE TYPE INDICATORUNABLE TO RE-PRICE /,      

21734

   UNABLE TO RE-PRICE /UNKNOWN FARE QUALIFIERUNABLE TO RE-PRICE /,        

21734

   UNABLE TO RE-PRICE /UNKNOWN CONVERSATION RATE TYPEUNABLE TO RE-PRICE /,    

21734

   UNABLE TO RE-PRICE /UNKNOWN UNIFARE INDICATORUNABLE TO RE-PRICE /,           

21734

   UNABLE TO RE-PRICE /UNKNOWN CABIN BOOKING QUALIFIERUNABLE TO RE-PRICE /,          

21734

   UNABLE TO RE-PRICE /NO TICKETABLE VALIDATING CARRIERUNABLE TO RE-PRICE /,               

21734

   UNABLE TO RE-PRICE /NOT\_A\_SPLITTABLE\_TRANSACTIONUNABLE TO RE-PRICE /,       

21734

   UNABLE TO RE-PRICE /BETTER\_TO\_NOT\_SPLITUNABLE TO RE-PRICE /,                         

21734

   UNABLE TO RE-PRICE /REFUND PROVISIONS NOT FOUND/CHECK PRICING OPTIONSUNABLE TO RE-PRICE /,     

21734

   UNABLE TO RE-PRICE /CHANGE OF PTC BETWEEN ISSUE AND REFUND IS FORBIDDENUNABLE TO RE-PRICE /,   

21734

   UNABLE TO RE-PRICE /ORIGINAL FARE CALC MANUALLY MODIFIED  REFUND FORBIDDENUNABLE TO RE-PRICE /,   

21734

   UNABLE TO RE-PRICE /CHANGE OF POS.POT BETWEEN ISSUE AND REFUND IS FORBIDDENUNABLE TO RE-PRICE /,  

21734

   UNABLE TO RE-PRICE /TRANSACTION NOT ALLOWED ON REISSUED TICKETS- REFUND MANUALLYUNABLE TO RE-PRICE /,   

21734

   UNABLE TO RE-PRICE /TRANSACTION NOT ALLOWED/REFUND MANUALLYUNABLE TO RE-PRICE /,             

21734

   UNABLE TO RE-PRICE /AWARD FARES CAN BE REISSUED TO AWARD FARES ONLYUNABLE TO RE-PRICE /,      

21734

   UNABLE TO RE-PRICE /NON AWARD FARES CANNOT BE REISSUED TO AWARD FARESUNABLE TO RE-PRICE /,    

21734

   UNABLE TO RE-PRICE /NO DATA FOUND IN SYSTEMUNABLE TO RE-PRICE /,                        

21734

   UNABLE TO RE-PRICE /CK LINE NUMBERUNABLE TO RE-PRICE /,                                    

21734

   UNABLE TO RE-PRICE /NO PREVIOUS TRX FOUNDUNABLE TO RE-PRICE /,                         

21734

   UNABLE TO RE-PRICE /CHECK FORMAT OF SERVICE REQUESTUNABLE TO RE-PRICE /,             

21734

   UNABLE TO RE-PRICE /INTERLINE TICKETS UPGRADE NOT SUPPORTED BY ATCUNABLE TO RE-PRICE /,   

21734

   UNABLE TO RE-PRICE /NO VALID PRICING SOLUTION FOUNDUNABLE TO RE-PRICE /,          

21734

   UNABLE TO RE-PRICE /MISSING BANKER SELLING/IATA CLEARING HOUSE RATESUNABLE TO RE-PRICE /,    

21734

   UNABLE TO RE-PRICE /SERVICE NOT PROPOSEDUNABLE TO RE-PRICE /,               

21734

   UNABLE TO RE-PRICE /NO PRICING POLICY FOR SERVICE (no S7)UNABLE TO RE-PRICE /,         

21734

   UNABLE TO RE-PRICE /PLEASE SPECIFY AGE FOR PASSENGERSUNABLE TO RE-PRICE /,              

21734

   UNABLE TO RE-PRICE /AMOUNT OVERRIDE NOT SUPPORTED FOR THIS AIRLINEUNABLE TO RE-PRICE /,     

21734

   UNABLE TO RE-PRICE /OPTION NOT ALLOWEDUNABLE TO RE-PRICE /,                  

21734

   UNABLE TO RE-PRICE /MILES AND CASH CONVERSION NOT AUTHORISEDUNABLE TO RE-PRICE /,          

21734

   UNABLE TO RE-PRICE /UNKNOWN CURRENCYUNABLE TO RE-PRICE /,                    

21734

   UNABLE TO RE-PRICE /UNKNOWN CURRENCY CONVERSION RATEUNABLE TO RE-PRICE /,      

21734

   UNABLE TO RE-PRICE /MISSING AMOUNT IN POINTS IN INPUTUNABLE TO RE-PRICE /,     

21734

   UNABLE TO RE-PRICE /NO VALID CONVERSION RULEUNABLE TO RE-PRICE /,                       

21734

   UNABLE TO RE-PRICE /TRANSACTION NOT ALLOWED ON AWARD TICKETS/REFUND MANUALLYUNABLE TO RE-PRICE /,  

21734

   UNABLE TO RE-PRICE /NO FARE FOUND FOR REQ ITINERARY - CUBA EMBARGO RESTRICTS MAY APPLYUNABLE TO RE-PRICE /, 

21734

   UNABLE TO RE-PRICE /NO JOURNEY FOUND FOR REQ ITINERARY - CUBA EMBARGO MAY APPLYUNABLE TO RE-PRICE /,    

21734

   UNABLE TO RE-PRICE /INVALID SERVICE CLASSIFICATION FOR SERVICE REQUESTUNABLE TO RE-PRICE /,     

21734

   UNABLE TO RE-PRICE /CHECK GROUP/SUB-GROUP/ATTRIBUTES FOR SERVICE REQUESTUNABLE TO RE-PRICE /,  

21734

   UNABLE TO RE-PRICE /CURRENCY OVERRIDE MISSINGUNABLE TO RE-PRICE /,          

21734

   UNABLE TO RE-PRICE /FIRST ISSUANCE ONLYUNABLE TO RE-PRICE /,                                

21734

   UNABLE TO RE-PRICE /INVALID CONTEXT - PLEASE REPRICEUNABLE TO RE-PRICE /,            

21734

   UNABLE TO RE-PRICE /AIRLINE FEES NOT ACTIVATEDUNABLE TO RE-PRICE /,                           

21734

   UNABLE TO RE-PRICE /WL NOT COMBINABLE WITH THROUGH FARE PRECEDENCEUNABLE TO RE-PRICE /,     

21734

   UNABLE TO RE-PRICE /YY FARE NOT ELIGIBLE TO AUTOMATIC REISSUEUNABLE TO RE-PRICE /,    

21734

   UNABLE TO RE-PRICE /YY FARES USED - REFUND MANUALLYUNABLE TO RE-PRICE /,         

21734

   UNABLE TO RE-PRICE /REFUNDING ONLY THE TAXES IS PROHIBITED IN YOUR MARKETUNABLE TO RE-PRICE /,    

21734

   UNABLE TO RE-PRICE /ONLY ONE RE-ISSUE ALLOWED FOR PARTIALLY USED TKTSUNABLE TO RE-PRICE /,         

21734

   UNABLE TO RE-PRICE /TKT NOT ELIGIBLE TO MULTIPLE REISSUE AFT DEP WITH ATCUNABLE TO RE-PRICE /,  

21734

   UNABLE TO RE-PRICE /TICKET ALREADY REISSUED - FURTHER REISSUE NOT ALLOWED BY CARRIERUNABLE TO RE-PRICE /,     

21734

   UNABLE TO RE-PRICE /OPTION NOT PERMITTEDUNABLE TO RE-PRICE /,                                   

21734

   UNABLE TO RE-PRICE /FREQUENT FLYER PROGRAM OWNER MISSINGUNABLE TO RE-PRICE /,                   

21734

   UNABLE TO RE-PRICE /REISSUE NOT ALLOWED - CHECK NVA DATEUNABLE TO RE-PRICE /,                 

21734

   UNABLE TO RE-PRICE /REISSUE AFTER EXPIRATION DATE IS NOT ALLOWEDUNABLE TO RE-PRICE /,            

21734

   UNABLE TO RE-PRICE /ONE FREQUENT FLYER PROGRAM MUST BE REQUESTEDUNABLE TO RE-PRICE /,          

21734

   UNABLE TO RE-PRICE /REISSUE MILES AND CASH NOT ALLOWEDUNABLE TO RE-PRICE /,         

21734

   UNABLE TO RE-PRICE /MISSING MANDATORY INFORMATIONUNABLE TO RE-PRICE /,                  

21734

   UNABLE TO RE-PRICE /BAD INPUT FORMATUNABLE TO RE-PRICE /,                                       

21734

   UNABLE TO RE-PRICE /ONE CARRIER AUTHORIZEDUNABLE TO RE-PRICE /,                             

21734

   UNABLE TO RE-PRICE /PRICE FARE FAMILY CARRIER SEPARATELYUNABLE TO RE-PRICE /,                   

21734

   UNABLE TO RE-PRICE /FARE FAMILY OPTION NOT AUTHORIZEDUNABLE TO RE-PRICE /,                    

21734

   UNABLE TO RE-PRICE /REQUESTED CHANGE NOT ALLOWED BY CARRIERUNABLE TO RE-PRICE /,                  

21734

   UNABLE TO RE-PRICE /SOME VOLUNTARY CHANGES CRITERIA NOT AUTOMATED - REISSUE MANUALLYUNABLE TO RE-PRICE /,   

21734

   UNABLE TO RE-PRICE /REQUESTED CHANGE NOT ALLOWED BY AA CARRIERUNABLE TO RE-PRICE /,                      

21734

   UNABLE TO RE-PRICE /ORIGINAL FARE CONDITIONS NOT FOUND - TRY ORIGINAL PRICING OPTIONSUNABLE TO RE-PRICE /,

21734

   UNABLE TO RE-PRICE /ORIGINAL TICKET TAXES NOT AS EXPECTED - REISSUE MANUALLYUNABLE TO RE-PRICE /,       

21734

   UNABLE TO RE-PRICE /NET AND SELLING AMOUNTS NOT EQUAL - REISSUE MANUALLYUNABLE TO RE-PRICE /,     

21734

   UNABLE TO RE-PRICE /NET AND SELLING AMOUNTS NOT EQUAL - REFUND MANUALLYUNABLE TO RE-PRICE /,              

21734

   UNABLE TO RE-PRICE /INVALID TOUR CODEUNABLE TO RE-PRICE /,                                       

21734

   UNABLE TO RE-PRICE /UNKNOWN TIER LEVEL NAMEUNABLE TO RE-PRICE /,                               

21734

   UNABLE TO RE-PRICE /NO DATA FOR CARRIERUNABLE TO RE-PRICE /,                                      

21734

   UNABLE TO RE-PRICE /EMBARGO APPLIESUNABLE TO RE-PRICE /,                                         

21734

   UNABLE TO RE-PRICE /CARRIER IN INPUT MUST TRANSPORT ON ONE INTERNATIONAL SEGMENTUNABLE TO RE-PRICE /,     

21734

   UNABLE TO RE-PRICE /UNABLE TO RE-PRICE /,                                                      

21734

   UNABLE TO RE-PRICE /PARTIALLY FLOWN TICKET MANUALLY REISSUED NOT AUDITABLEUNABLE TO RE-PRICE /,

21734

   UNABLE TO RE-PRICE /TKT not eligible to reissue after ATUUNABLE TO RE-PRICE /,                 

21734

   UNABLE TO RE-PRICE /UPGRADE NOT ALLOWEDUNABLE TO RE-PRICE /,                                     

21734

   UNABLE TO RE-PRICE /DOWNGRADE NOT ALLOWEDUNABLE TO RE-PRICE /,                                  

21734

   UNABLE TO RE-PRICE /NO CURRENT FARE IN SYSTEM - EMBARGO APPLIEDUNABLE TO RE-PRICE /,          

21734

   UNABLE TO RE-PRICE /TOO MANY EMD/REQUEST IN INPUTUNABLE TO RE-PRICE /               

## 4.1 Error Reply

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_ReissuePricingWithoutPNRReply xmlns="http://xml.amadeus.com/TRPNRR\_15\_1\_1A"> <ticketGroup> <pnrLocatorData> <reservationInformation> <controlNumber>0</controlNumber> </reservationInformation> </pnrLocatorData> <errorMessage> <errorOrWarningCodeDetails> <errorDetails> <errorCode>23803</errorCode> <errorCategory>EC</errorCategory> <errorCodeOwner>1A</errorCodeOwner> </errorDetails> </errorOrWarningCodeDetails> <errorWarningDescription> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>MIXED TICKET TYPES NOT ALLOWED</freeText> </errorWarningDescription> </errorMessage> </ticketGroup> <docSeparator></docSeparator> </Ticket\_ReissuePricingWithoutPNRReply>

  

* * *

## 5 Operations

## 5.1 Operation: 1 passenger reprice add tax

This example shows the exchange of a ticket with the addition of one tax (ZV GO) with an amount of 50 (currency of selling). Note the manual status of the exchange and the warning: MANUAL MANIPULATION OF TAXES.

## 5.1.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_ReissuePricingWithoutPNR xmlns="http://xml.amadeus.com/TRPNRQ\_15\_1\_1A"> <passengersGroup> <segmentRepetitionControl> <segmentControlDetails> <quantity>1</quantity> <numberOfUnits>1</numberOfUnits> </segmentControlDetails> </segmentRepetitionControl> <travellersID> <travellerDetails> <measurementValue>1</measurementValue> <surname>FRANCOIS</surname> <firstName>PIERRE</firstName> </travellerDetails> </travellersID> <discountPtc> <valueQualifier>ADT</valueQualifier> </discountPtc> </passengersGroup> <segmentGroup> <boardoff> <origin>NCE</origin> <destination>PAR</destination> </boardoff> <segmentInformation> <flightDate> <departureDate>231014</departureDate> <departureTime>0600</departureTime> <arrivalDate>231014</arrivalDate> <arrivalTime>0725</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>NCE</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>ORY</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>6249</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> <flightTypeDetails> <flightIndicator>1</flightIndicator> </flightTypeDetails> <itemNumber>1</itemNumber> </segmentInformation> </segmentGroup> <segmentGroup> <boardoff> <origin>PAR</origin> <destination>NCE</destination> </boardoff> <segmentInformation> <flightDate> <departureDate>281014</departureDate> <departureTime>0635</departureTime> <arrivalDate>281014</arrivalDate> <arrivalTime>0755</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>ORY</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>NCE</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>6240</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> <flightTypeDetails> <flightIndicator>1</flightIndicator> </flightTypeDetails> <itemNumber>2</itemNumber> </segmentInformation> </segmentGroup> <exchangeInformationGroup> <transactionIdentifier> <itemNumberDetails> <number>1</number> </itemNumberDetails> </transactionIdentifier> <documentInfoGroup> <paperticketDetailsLastCoupon> <documentDetails> <number>9991234567890</number> <type>ET</type> </documentDetails> </paperticketDetailsLastCoupon> </documentInfoGroup> </exchangeInformationGroup> <pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>SEL</pricingOptionKey> </pricingOptionKey> <paxSegTstReference> <referenceDetails> <type>PA</type> <value>1</value> </referenceDetails> <referenceDetails> <type>E</type> <value>1</value> </referenceDetails> </paxSegTstReference> </pricingOptionGroup> <pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>AT</pricingOptionKey> </pricingOptionKey> <taxInformation> <taxQualifier>7</taxQualifier> <taxType> <isoCountry>ZV</isoCountry> </taxType> <taxNature>GO</taxNature> <taxData> <taxRate>50</taxRate> <taxValueQualifier>A</taxValueQualifier> </taxData> </taxInformation> </pricingOptionGroup> </Ticket\_ReissuePricingWithoutPNR>

## 5.1.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_ReissuePricingWithoutPNRReply xmlns="http://xml.amadeus.com/TRPNRR\_15\_1\_1A"> <ticketGroup> <pnrLocatorData> <reservationInformation> <controlNumber>0</controlNumber> </reservationInformation> </pnrLocatorData> <fareList> <pricingInformation> <tstInformation> <tstIndicator>M</tstIndicator> </tstInformation> <fcmi>4</fcmi> </pricingInformation> <fareReference> <referenceType>TST</referenceType> <uniqueReference>1</uniqueReference> </fareReference> <lastTktDate> <businessSemantic>LT</businessSemantic> <dateTime> <year>2014</year> <month>10</month> <day>13</day> </dateTime> </lastTktDate> <validatingCarrier> <carrierInformation> <carrierCode>6X</carrierCode> </carrierInformation> </validatingCarrier> <paxSegReference> <refDetails> <refQualifier>PA</refQualifier> <refNumber>1</refNumber> </refDetails> </paxSegReference> <fareDataInformation> <fareDataMainInformation> <fareDataQualifier>R</fareDataQualifier> </fareDataMainInformation> <fareDataSupInformation> <fareDataQualifier>712</fareDataQualifier> <fareAmount>50.00</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataSupInformation> <fareDataSupInformation> <fareDataQualifier>B</fareDataQualifier> <fareAmount>444.00</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataSupInformation> </fareDataInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>FR</isoCountry> </taxType> <taxNature>SE</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>8.72</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>FR</isoCountry> </taxType> <taxNature>TI</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>23.00</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>IZ</isoCountry> </taxType> <taxNature>EB</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>2.26</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>QW</isoCountry> </taxType> <taxNature>LO</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>19.66</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>UI</isoCountry> </taxType> <taxNature>VZ</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>5.37</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>X</taxIdentifier> </taxIdentification> <taxType> <isoCountry>ZV</isoCountry> </taxType> <taxNature>GO</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>50.00</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <passengerInformation> <penDisInformation></penDisInformation> <travellerInfo> <travellerNameInfo> <type>ADT</type> </travellerNameInfo> <otherPaxNamesDetails> <surname>FRANCOIS</surname> <givenName>PIERRE</givenName> </otherPaxNamesDetails> </travellerInfo> <passengerReference> <refDetails> <refQualifier>PA</refQualifier> <refNumber>1</refNumber> </refDetails> </passengerReference> </passengerInformation> <originDestination> <cityCode>NCE</cityCode> <cityCode>NCE</cityCode> </originDestination> <segmentInformation> <connexInformation> <connecDetails> <connexType>O</connexType> </connecDetails> </connexInformation> <segDetails> <flightDate> <departureDate>231014</departureDate> <departureTime>600</departureTime> <arrivalDate>231014</arrivalDate> <arrivalTime>725</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>NCE</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>ORY</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>6249</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> </segDetails> <fareQualifier> <fareBasisDetails> <primaryCode>YWK</primaryCode> <fareBasisCode>FR</fareBasisCode> <discTktDesignator>ADT</discTktDesignator> </fareBasisDetails> </fareQualifier> <validityInformation> <businessSemantic>A</businessSemantic> <dateTime> <year>2014</year> <month>10</month> <day>23</day> </dateTime> </validityInformation> <validityInformation> <businessSemantic>B</businessSemantic> <dateTime> <year>2014</year> <month>10</month> <day>23</day> </dateTime> </validityInformation> <bagAllowanceInformation> <bagAllowanceDetails> <baggageQuantity>1</baggageQuantity> <baggageType>N</baggageType> </bagAllowanceDetails> </bagAllowanceInformation> <segmentReference> <refDetails> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </refDetails> </segmentReference> <sequenceInformation> <sequenceSection> <sequenceNumber>1</sequenceNumber> </sequenceSection> </sequenceInformation> </segmentInformation> <segmentInformation> <connexInformation> <connecDetails> <connexType>O</connexType> </connecDetails> </connexInformation> <segDetails> <flightDate> <departureDate>281014</departureDate> <departureTime>635</departureTime> <arrivalDate>281014</arrivalDate> <arrivalTime>755</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>ORY</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>NCE</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>6240</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> </segDetails> <fareQualifier> <fareBasisDetails> <primaryCode>YWK</primaryCode> <fareBasisCode>FR</fareBasisCode> <discTktDesignator>ADT</discTktDesignator> </fareBasisDetails> </fareQualifier> <validityInformation> <businessSemantic>A</businessSemantic> <dateTime> <year>2014</year> <month>10</month> <day>28</day> </dateTime> </validityInformation> <validityInformation> <businessSemantic>B</businessSemantic> <dateTime> <year>2014</year> <month>10</month> <day>28</day> </dateTime> </validityInformation> <bagAllowanceInformation> <bagAllowanceDetails> <baggageQuantity>1</baggageQuantity> <baggageType>N</baggageType> </bagAllowanceDetails> </bagAllowanceInformation> <segmentReference> <refDetails> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </refDetails> </segmentReference> <sequenceInformation> <sequenceSection> <sequenceNumber>2</sequenceNumber> </sequenceSection> </sequenceInformation> </segmentInformation> <otherPricingInfo> <attributeDetails> <attributeType>END</attributeType> <attributeDescription>EUR444.00 NONREF - EVASION WEEKCHGS RESTRICTED/NO REFUND</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>FCA</attributeType> <attributeDescription>NCE 6X PAR222.006X NCE222.00EUR444.00END</attributeDescription> </attributeDetails> </otherPricingInfo> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText>NON-REFUNDABLE</errorFreeText> </warningText> </warningInformation> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText> - SEE ADV PURCHASE</errorFreeText> </warningText> </warningInformation> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText>MANUAL MANIPULATION OF TAXES 4</errorFreeText> </warningText> </warningInformation> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText>BG CXR</errorFreeText> </warningText> </warningInformation> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText>PRICED WITH VALIDATING CARRIER 6X - REPRICE IF DIFFERENT VC</errorFreeText> </warningText> </warningInformation> <automaticReissueInfo> <ticketInfo> <documentDetails> <number>9991234567890</number> <type>ET</type> </documentDetails> </ticketInfo> <couponInfo> <couponDetails> <cpnNumber>1</cpnNumber> </couponDetails> </couponInfo> <baseFareInfo> <monetaryDetails> <typeQualifier>IBA</typeQualifier> <amount>444.00</amount> <currency>EUR</currency> </monetaryDetails> </baseFareInfo> <firstDpiGroup> <reIssuePenalty> <penDisData> <penaltyAmount>70</penaltyAmount> <penaltyCurrency>EUR</penaltyCurrency> </penDisData> </reIssuePenalty> <reissueInfo> <monetaryDetails> <typeQualifier>RES</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>RTO</typeQualifier> <amount>553.01</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TSC</typeQualifier> <amount>50.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TST</typeQualifier> <amount>50.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>RTA</typeQualifier> <amount>109.01</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TAC</typeQualifier> <amount>120.00</amount> <currency>EUR</currency> </otherMonetaryDetails> </reissueInfo> <oldTaxInfo> <monetaryDetails> <typeQualifier>ITA</typeQualifier> <amount>59.01</amount> <currency>EUR</currency> </monetaryDetails> </oldTaxInfo> <reissueBalanceInfo> <monetaryDetails> <typeQualifier>BEQ</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>BGT</typeQualifier> <amount>120.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BTA</typeQualifier> <amount>50.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BTO</typeQualifier> <amount>50.00</amount> <currency>EUR</currency> </otherMonetaryDetails> </reissueBalanceInfo> </firstDpiGroup> <secondDpiGroup> <penalty> <penDisData> <penaltyAmount>70</penaltyAmount> <penaltyCurrency>EUR</penaltyCurrency> </penDisData> </penalty> <residualValueInfo> <monetaryDetails> <typeQualifier>RES</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>RTA</typeQualifier> <amount>109.01</amount> <currency>EUR</currency> </otherMonetaryDetails> </residualValueInfo> <oldTaxInfo> <monetaryDetails> <typeQualifier>ITA</typeQualifier> <amount>59.01</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>ITO</typeQualifier> <amount>503.01</amount> <currency>EUR</currency> </otherMonetaryDetails> </oldTaxInfo> <issueBalanceInfo> <monetaryDetails> <typeQualifier>BTA</typeQualifier> <amount>50.00</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>BEQ</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BGT</typeQualifier> <amount>120.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BTO</typeQualifier> <amount>50.00</amount> <currency>EUR</currency> </otherMonetaryDetails> </issueBalanceInfo> </secondDpiGroup> <firstPricingInformationKey> <dataLength>28</dataLength> <dataType>B</dataType> <binaryData>STIwMTUwMzIwLTQ3MzQ2MzMwNDY0MDM1NjAwMA==</binaryData> </firstPricingInformationKey> <formOfPaymentInformation> <formOfPayment> <type>CA</type> <indicator>2</indicator> </formOfPayment> </formOfPaymentInformation> <reissueAttributes> <attributeDetails> <attributeType>NET</attributeType> <attributeDescription>1</attributeDescription> </attributeDetails> </reissueAttributes> <foLine> <layout> <issue> <cityCode>YYZ</cityCode> <dateOfIssue>200415</dateOfIssue> <iataNumber>69090243</iataNumber> </issue> </layout> <orgAnd4Exchange> <tkt> <documentDetails> <number>9991234567890</number> <dataIndicator>ORG</dataIndicator> </documentDetails> </tkt> </orgAnd4Exchange> <orgAnd4Exchange> <tkt> <documentDetails> <number>9991234567890</number> <dataIndicator>3</dataIndicator> </documentDetails> </tkt> <rng> <rangeQualifier>F</rangeQualifier> <rangeDetails> <min>1</min> <max>1</max> </rangeDetails> </rng> </orgAnd4Exchange> </foLine> </automaticReissueInfo> <fareComponentDetailsGroup> <fareComponentID> <itemNumberDetails> <number>1</number> </itemNumberDetails> </fareComponentID> <couponDetailsGroup> <productId> <referenceDetails> <type>ST</type> <value>1</value> </referenceDetails> </productId> </couponDetailsGroup> </fareComponentDetailsGroup> <fareComponentDetailsGroup> <fareComponentID> <itemNumberDetails> <number>2</number> </itemNumberDetails> </fareComponentID> <couponDetailsGroup> <productId> <referenceDetails> <type>ST</type> <value>2</value> </referenceDetails> </productId> </couponDetailsGroup> </fareComponentDetailsGroup> <markerFares></markerFares> </fareList> </ticketGroup> <docSeparator></docSeparator> </Ticket\_ReissuePricingWithoutPNRReply>

## 5.1.3 Possible Errors

See "Error Messages" section.

* * *

## 5.2 Operation: 1 passenger reprice exempt 1 tax

This example shows the reprice of one ticket with the exempltion of one tax (FR SE). See EXEMPT amount in <taxInformation\>, <fareDataMainInformation\>.

## 5.2.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_ReissuePricingWithoutPNR xmlns="http://xml.amadeus.com/TRPNRQ\_15\_1\_1A"> <passengersGroup> <segmentRepetitionControl> <segmentControlDetails> <quantity>1</quantity> <numberOfUnits>1</numberOfUnits> </segmentControlDetails> </segmentRepetitionControl> <travellersID> <travellerDetails> <measurementValue>1</measurementValue> <surname>FRANCOIS</surname> <firstName>PIERRE</firstName> </travellerDetails> </travellersID> <discountPtc> <valueQualifier>ADT</valueQualifier> </discountPtc> </passengersGroup> <segmentGroup> <boardoff> <origin>NCE</origin> <destination>PAR</destination> </boardoff> <segmentInformation> <flightDate> <departureDate>231014</departureDate> <departureTime>0600</departureTime> <arrivalDate>231014</arrivalDate> <arrivalTime>0725</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>NCE</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>ORY</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>6249</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> <flightTypeDetails> <flightIndicator>1</flightIndicator> </flightTypeDetails> <itemNumber>1</itemNumber> </segmentInformation> </segmentGroup> <segmentGroup> <boardoff> <origin>PAR</origin> <destination>NCE</destination> </boardoff> <segmentInformation> <flightDate> <departureDate>281014</departureDate> <departureTime>0635</departureTime> <arrivalDate>281014</arrivalDate> <arrivalTime>0755</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>ORY</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>NCE</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>6240</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> <flightTypeDetails> <flightIndicator>1</flightIndicator> </flightTypeDetails> <itemNumber>2</itemNumber> </segmentInformation> </segmentGroup> <exchangeInformationGroup> <transactionIdentifier> <itemNumberDetails> <number>1</number> </itemNumberDetails> </transactionIdentifier> <documentInfoGroup> <paperticketDetailsLastCoupon> <documentDetails> <number>9991234567890</number> <type>ET</type> </documentDetails> </paperticketDetailsLastCoupon> </documentInfoGroup> </exchangeInformationGroup> <pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>SEL</pricingOptionKey> </pricingOptionKey> <paxSegTstReference> <referenceDetails> <type>PA</type> <value>1</value> </referenceDetails> <referenceDetails> <type>E</type> <value>1</value> </referenceDetails> </paxSegTstReference> </pricingOptionGroup> <pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>ET</pricingOptionKey> </pricingOptionKey> <taxInformation> <taxQualifier>7</taxQualifier> <taxType> <isoCountry>FR</isoCountry> </taxType> <taxNature>SE</taxNature> </taxInformation> </pricingOptionGroup> </Ticket\_ReissuePricingWithoutPNR>

## 5.2.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_ReissuePricingWithoutPNRReply xmlns="http://xml.amadeus.com/TRPNRR\_15\_1\_1A"> <ticketGroup> <pnrLocatorData> <reservationInformation> <controlNumber>0</controlNumber> </reservationInformation> </pnrLocatorData> <fareList> <pricingInformation> <tstInformation> <tstIndicator>I</tstIndicator> </tstInformation> <fcmi>0</fcmi> </pricingInformation> <fareReference> <referenceType>TST</referenceType> <uniqueReference>1</uniqueReference> </fareReference> <lastTktDate> <businessSemantic>LT</businessSemantic> <dateTime> <year>2014</year> <month>10</month> <day>10</day> </dateTime> </lastTktDate> <validatingCarrier> <carrierInformation> <carrierCode>6X</carrierCode> </carrierInformation> </validatingCarrier> <paxSegReference> <refDetails> <refQualifier>PA</refQualifier> <refNumber>1</refNumber> </refDetails> </paxSegReference> <fareDataInformation> <fareDataMainInformation> <fareDataQualifier>R</fareDataQualifier> </fareDataMainInformation> <fareDataSupInformation> <fareDataQualifier>712</fareDataQualifier> <fareAmount>0.00</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataSupInformation> <fareDataSupInformation> <fareDataQualifier>B</fareDataQualifier> <fareAmount>444.00</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataSupInformation> </fareDataInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>FR</isoCountry> </taxType> <taxNature>TI</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>23.00</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>IZ</isoCountry> </taxType> <taxNature>EB</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>2.26</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>QW</isoCountry> </taxType> <taxNature>LO</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>19.66</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>UI</isoCountry> </taxType> <taxNature>VZ</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>4.50</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>RFD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>FR</isoCountry> </taxType> <taxNature>SE</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>8.72</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>RFD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>UI</isoCountry> </taxType> <taxNature>VZ</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>0.87</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>X</taxIdentifier> </taxIdentification> <taxType> <isoCountry>FR</isoCountry> </taxType> <taxNature>SE</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>EXEMPT</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <passengerInformation> <penDisInformation></penDisInformation> <travellerInfo> <travellerNameInfo> <type>ADT</type> </travellerNameInfo> <otherPaxNamesDetails> <surname>FRANCOIS</surname> <givenName>PIERRE</givenName> </otherPaxNamesDetails> </travellerInfo> <passengerReference> <refDetails> <refQualifier>PA</refQualifier> <refNumber>1</refNumber> </refDetails> </passengerReference> </passengerInformation> <originDestination> <cityCode>NCE</cityCode> <cityCode>NCE</cityCode> </originDestination> <segmentInformation> <connexInformation> <connecDetails> <connexType>O</connexType> </connecDetails> </connexInformation> <segDetails> <flightDate> <departureDate>231014</departureDate> <departureTime>0600</departureTime> <arrivalDate>231014</arrivalDate> <arrivalTime>0725</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>NCE</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>ORY</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>6249</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> </segDetails> <fareQualifier> <fareBasisDetails> <primaryCode>YWK</primaryCode> <fareBasisCode>FR</fareBasisCode> <discTktDesignator>ADT</discTktDesignator> </fareBasisDetails> </fareQualifier> <validityInformation> <businessSemantic>A</businessSemantic> <dateTime> <year>2014</year> <month>10</month> <day>23</day> </dateTime> </validityInformation> <validityInformation> <businessSemantic>B</businessSemantic> <dateTime> <year>2014</year> <month>10</month> <day>23</day> </dateTime> </validityInformation> <bagAllowanceInformation> <bagAllowanceDetails> <baggageQuantity>1</baggageQuantity> <baggageType>N</baggageType> </bagAllowanceDetails> </bagAllowanceInformation> <segmentReference> <refDetails> <refQualifier>S</refQualifier> </refDetails> </segmentReference> <sequenceInformation> <sequenceSection> <sequenceNumber>1</sequenceNumber> </sequenceSection> </sequenceInformation> </segmentInformation> <segmentInformation> <connexInformation> <connecDetails> <connexType>O</connexType> </connecDetails> </connexInformation> <segDetails> <flightDate> <departureDate>281014</departureDate> <departureTime>0635</departureTime> <arrivalDate>281014</arrivalDate> <arrivalTime>0755</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>ORY</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>NCE</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>6240</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> </segDetails> <fareQualifier> <fareBasisDetails> <primaryCode>YWK</primaryCode> <fareBasisCode>FR</fareBasisCode> <discTktDesignator>ADT</discTktDesignator> </fareBasisDetails> </fareQualifier> <validityInformation> <businessSemantic>A</businessSemantic> <dateTime> <year>2014</year> <month>10</month> <day>28</day> </dateTime> </validityInformation> <validityInformation> <businessSemantic>B</businessSemantic> <dateTime> <year>2014</year> <month>10</month> <day>28</day> </dateTime> </validityInformation> <bagAllowanceInformation> <bagAllowanceDetails> <baggageQuantity>1</baggageQuantity> <baggageType>N</baggageType> </bagAllowanceDetails> </bagAllowanceInformation> <segmentReference> <refDetails> <refQualifier>S</refQualifier> </refDetails> </segmentReference> <sequenceInformation> <sequenceSection> <sequenceNumber>2</sequenceNumber> </sequenceSection> </sequenceInformation> </segmentInformation> <otherPricingInfo> <attributeDetails> <attributeType>END</attributeType> <attributeDescription>EUR444.00 NONREF - EVASION WEEKCHGS RESTRICTED/NO REFUND</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>FCA</attributeType> <attributeDescription>NCE 6X PAR222.006X NCE222.00EUR444.00END</attributeDescription> </attributeDetails> </otherPricingInfo> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText>NON-REFUNDABLE</errorFreeText> </warningText> </warningInformation> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText> - SEE ADV PURCHASE</errorFreeText> </warningText> </warningInformation> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText>BG CXR</errorFreeText> </warningText> </warningInformation> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText>PRICED WITH VALIDATING CARRIER 6X - REPRICE IF DIFFERENT VC</errorFreeText> </warningText> </warningInformation> <automaticReissueInfo> <ticketInfo> <documentDetails> <number>9991234567890</number> <type>ET</type> </documentDetails> </ticketInfo> <couponInfo> <couponDetails> <cpnNumber>1</cpnNumber> </couponDetails> </couponInfo> <baseFareInfo> <monetaryDetails> <typeQualifier>IBA</typeQualifier> <amount>444.00</amount> <currency>EUR</currency> </monetaryDetails> </baseFareInfo> <firstDpiGroup> <reIssuePenalty> <penDisData> <penaltyAmount>0.00</penaltyAmount> <penaltyCurrency>EUR</penaltyCurrency> </penDisData> </reIssuePenalty> <reissueInfo> <monetaryDetails> <typeQualifier>RES</typeQualifier> <amount>9.59</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>RTO</typeQualifier> <amount>493.42</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TSC</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TST</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>RTA</typeQualifier> <amount>49.42</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TAC</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </otherMonetaryDetails> </reissueInfo> <oldTaxInfo> <monetaryDetails> <typeQualifier>ITA</typeQualifier> <amount>59.01</amount> <currency>EUR</currency> </monetaryDetails> </oldTaxInfo> <reissueBalanceInfo> <monetaryDetails> <typeQualifier>BEQ</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>BGT</typeQualifier> <amount>-9.59</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BTA</typeQualifier> <amount>-9.59</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BTO</typeQualifier> <amount>-9.59</amount> <currency>EUR</currency> </otherMonetaryDetails> </reissueBalanceInfo> </firstDpiGroup> <secondDpiGroup> <penalty> <penDisData> <penaltyAmount>0.00</penaltyAmount> <penaltyCurrency>EUR</penaltyCurrency> </penDisData> </penalty> <residualValueInfo> <monetaryDetails> <typeQualifier>RES</typeQualifier> <amount>9.59</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>RTA</typeQualifier> <amount>49.42</amount> <currency>EUR</currency> </otherMonetaryDetails> </residualValueInfo> <oldTaxInfo> <monetaryDetails> <typeQualifier>ITA</typeQualifier> <amount>59.01</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>ITO</typeQualifier> <amount>503.01</amount> <currency>EUR</currency> </otherMonetaryDetails> </oldTaxInfo> <issueBalanceInfo> <monetaryDetails> <typeQualifier>BTA</typeQualifier> <amount>-9.59</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>BEQ</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BGT</typeQualifier> <amount>-9.59</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BTO</typeQualifier> <amount>-9.59</amount> <currency>EUR</currency> </otherMonetaryDetails> </issueBalanceInfo> </secondDpiGroup> <firstPricingInformationKey> <dataLength>28</dataLength> <dataType>B</dataType> <binaryData>STIwMTUwMzIwLTQ3MzQ2MzMwNDY0MDM1NjAwMA==</binaryData> </firstPricingInformationKey> <formOfPaymentInformation> <formOfPayment> <type>CA</type> <indicator>2</indicator> </formOfPayment> </formOfPaymentInformation> <reissueAttributes> <attributeDetails> <attributeType>NET</attributeType> <attributeDescription>1</attributeDescription> </attributeDetails> </reissueAttributes> <foLine> <layout> <issue> <cityCode>YYZ</cityCode> <dateOfIssue>200415</dateOfIssue> <iataNumber>69090243</iataNumber> </issue> </layout> <orgAnd4Exchange> <tkt> <documentDetails> <number>9991234567890</number> <dataIndicator>ORG</dataIndicator> </documentDetails> </tkt> </orgAnd4Exchange> <orgAnd4Exchange> <tkt> <documentDetails> <number>9991234567890</number> <dataIndicator>3</dataIndicator> </documentDetails> </tkt> <rng> <rangeQualifier>F</rangeQualifier> <rangeDetails> <min>1</min> <max>1</max> </rangeDetails> </rng> </orgAnd4Exchange> </foLine> </automaticReissueInfo> <fareComponentDetailsGroup> <fareComponentID> <itemNumberDetails> <number>1</number> </itemNumberDetails> </fareComponentID> <couponDetailsGroup> <productId> <referenceDetails> <type>ST</type> <value>1</value> </referenceDetails> </productId> </couponDetailsGroup> </fareComponentDetailsGroup> <fareComponentDetailsGroup> <fareComponentID> <itemNumberDetails> <number>2</number> </itemNumberDetails> </fareComponentID> <couponDetailsGroup> <productId> <referenceDetails> <type>ST</type> <value>2</value> </referenceDetails> </productId> </couponDetailsGroup> </fareComponentDetailsGroup> <markerFares></markerFares> </fareList> </ticketGroup> <docSeparator></docSeparator> </Ticket\_ReissuePricingWithoutPNRReply>

## 5.2.3 Possible Errors

See "Error Messages" section.

* * *

## 5.3 Operation: 1 passenger reprice exempt all taxes

This example shows the reprice of one ticket with the exempltion of all tax. See EXEMPT amount in <taxInformation\>, <fareDataMainInformation\>.

## 5.3.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_ReissuePricingWithoutPNR xmlns="http://xml.amadeus.com/TRPNRQ\_15\_1\_1A"> <passengersGroup> <segmentRepetitionControl> <segmentControlDetails> <quantity>1</quantity> <numberOfUnits>1</numberOfUnits> </segmentControlDetails> </segmentRepetitionControl> <travellersID> <travellerDetails> <measurementValue>1</measurementValue> <surname>FRANCOIS</surname> <firstName>PIERRE</firstName> </travellerDetails> </travellersID> <discountPtc> <valueQualifier>ADT</valueQualifier> </discountPtc> </passengersGroup> <segmentGroup> <boardoff> <origin>NCE</origin> <destination>PAR</destination> </boardoff> <segmentInformation> <flightDate> <departureDate>231014</departureDate> <departureTime>0600</departureTime> <arrivalDate>231014</arrivalDate> <arrivalTime>0725</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>NCE</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>ORY</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>6249</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> <flightTypeDetails> <flightIndicator>1</flightIndicator> </flightTypeDetails> <itemNumber>1</itemNumber> </segmentInformation> </segmentGroup> <segmentGroup> <boardoff> <origin>PAR</origin> <destination>NCE</destination> </boardoff> <segmentInformation> <flightDate> <departureDate>281014</departureDate> <departureTime>0635</departureTime> <arrivalDate>281014</arrivalDate> <arrivalTime>0755</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>ORY</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>NCE</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>6240</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> <flightTypeDetails> <flightIndicator>1</flightIndicator> </flightTypeDetails> <itemNumber>2</itemNumber> </segmentInformation> </segmentGroup> <exchangeInformationGroup> <transactionIdentifier> <itemNumberDetails> <number>1</number> </itemNumberDetails> </transactionIdentifier> <documentInfoGroup> <paperticketDetailsLastCoupon> <documentDetails> <number>9991234567890</number> <type>ET</type> </documentDetails> </paperticketDetailsLastCoupon> </documentInfoGroup> </exchangeInformationGroup> <pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>SEL</pricingOptionKey> </pricingOptionKey> <paxSegTstReference> <referenceDetails> <type>PA</type> <value>1</value> </referenceDetails> <referenceDetails> <type>E</type> <value>1</value> </referenceDetails> </paxSegTstReference> </pricingOptionGroup> <pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>ET</pricingOptionKey> </pricingOptionKey> </pricingOptionGroup> </Ticket\_ReissuePricingWithoutPNR>

## 5.3.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_ReissuePricingWithoutPNRReply xmlns="http://xml.amadeus.com/TRPNRR\_15\_1\_1A"> <ticketGroup> <pnrLocatorData> <reservationInformation> <controlNumber>0</controlNumber> </reservationInformation> </pnrLocatorData> <fareList> <pricingInformation> <tstInformation> <tstIndicator>I</tstIndicator> </tstInformation> <fcmi>0</fcmi> </pricingInformation> <fareReference> <referenceType>TST</referenceType> <uniqueReference>1</uniqueReference> </fareReference> <lastTktDate> <businessSemantic>LT</businessSemantic> <dateTime> <year>2014</year> <month>10</month> <day>10</day> </dateTime> </lastTktDate> <validatingCarrier> <carrierInformation> <carrierCode>6X</carrierCode> </carrierInformation> </validatingCarrier> <paxSegReference> <refDetails> <refQualifier>PA</refQualifier> <refNumber>1</refNumber> </refDetails> </paxSegReference> <fareDataInformation> <fareDataMainInformation> <fareDataQualifier>R</fareDataQualifier> </fareDataMainInformation> <fareDataSupInformation> <fareDataQualifier>712</fareDataQualifier> <fareAmount>0.00</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataSupInformation> <fareDataSupInformation> <fareDataQualifier>B</fareDataQualifier> <fareAmount>444.00</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataSupInformation> </fareDataInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>RFD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>FR</isoCountry> </taxType> <taxNature>SE</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>8.72</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>RFD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>FR</isoCountry> </taxType> <taxNature>TI</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>23.00</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>RFD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>IZ</isoCountry> </taxType> <taxNature>EB</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>2.26</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>RFD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>QW</isoCountry> </taxType> <taxNature>LO</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>19.66</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>RFD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>UI</isoCountry> </taxType> <taxNature>VZ</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>5.37</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>X</taxIdentifier> </taxIdentification> <taxType> <isoCountry>FR</isoCountry> </taxType> <taxNature>SE</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>EXEMPT</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>X</taxIdentifier> </taxIdentification> <taxType> <isoCountry>FR</isoCountry> </taxType> <taxNature>TI</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>EXEMPT</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>X</taxIdentifier> </taxIdentification> <taxType> <isoCountry>IZ</isoCountry> </taxType> <taxNature>EB</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>EXEMPT</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>X</taxIdentifier> </taxIdentification> <taxType> <isoCountry>QW</isoCountry> </taxType> <taxNature>LO</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>EXEMPT</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>X</taxIdentifier> </taxIdentification> <taxType> <isoCountry>UI</isoCountry> </taxType> <taxNature>VZ</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>EXEMPT</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <passengerInformation> <penDisInformation></penDisInformation> <travellerInfo> <travellerNameInfo> <type>ADT</type> </travellerNameInfo> <otherPaxNamesDetails> <surname>FRANCOIS</surname> <givenName>PIERRE</givenName> </otherPaxNamesDetails> </travellerInfo> <passengerReference> <refDetails> <refQualifier>PA</refQualifier> <refNumber>1</refNumber> </refDetails> </passengerReference> </passengerInformation> <originDestination> <cityCode>NCE</cityCode> <cityCode>NCE</cityCode> </originDestination> <segmentInformation> <connexInformation> <connecDetails> <connexType>O</connexType> </connecDetails> </connexInformation> <segDetails> <flightDate> <departureDate>231014</departureDate> <departureTime>600</departureTime> <arrivalDate>231014</arrivalDate> <arrivalTime>725</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>NCE</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>ORY</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>6249</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> </segDetails> <fareQualifier> <fareBasisDetails> <primaryCode>YWK</primaryCode> <fareBasisCode>FR</fareBasisCode> <discTktDesignator>ADT</discTktDesignator> </fareBasisDetails> </fareQualifier> <validityInformation> <businessSemantic>A</businessSemantic> <dateTime> <year>2014</year> <month>10</month> <day>23</day> </dateTime> </validityInformation> <validityInformation> <businessSemantic>B</businessSemantic> <dateTime> <year>2014</year> <month>10</month> <day>23</day> </dateTime> </validityInformation> <bagAllowanceInformation> <bagAllowanceDetails> <baggageQuantity>1</baggageQuantity> <baggageType>N</baggageType> </bagAllowanceDetails> </bagAllowanceInformation> <segmentReference> <refDetails> <refQualifier>S</refQualifier> </refDetails> </segmentReference> <sequenceInformation> <sequenceSection> <sequenceNumber>1</sequenceNumber> </sequenceSection> </sequenceInformation> </segmentInformation> <segmentInformation> <connexInformation> <connecDetails> <connexType>O</connexType> </connecDetails> </connexInformation> <segDetails> <flightDate> <departureDate>281014</departureDate> <departureTime>635</departureTime> <arrivalDate>281014</arrivalDate> <arrivalTime>755</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>ORY</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>NCE</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>6240</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> </segDetails> <fareQualifier> <fareBasisDetails> <primaryCode>YWK</primaryCode> <fareBasisCode>FR</fareBasisCode> <discTktDesignator>ADT</discTktDesignator> </fareBasisDetails> </fareQualifier> <validityInformation> <businessSemantic>A</businessSemantic> <dateTime> <year>2014</year> <month>10</month> <day>28</day> </dateTime> </validityInformation> <validityInformation> <businessSemantic>B</businessSemantic> <dateTime> <year>2014</year> <month>10</month> <day>28</day> </dateTime> </validityInformation> <bagAllowanceInformation> <bagAllowanceDetails> <baggageQuantity>1</baggageQuantity> <baggageType>N</baggageType> </bagAllowanceDetails> </bagAllowanceInformation> <segmentReference> <refDetails> <refQualifier>S</refQualifier> </refDetails> </segmentReference> <sequenceInformation> <sequenceSection> <sequenceNumber>2</sequenceNumber> </sequenceSection> </sequenceInformation> </segmentInformation> <otherPricingInfo> <attributeDetails> <attributeType>END</attributeType> <attributeDescription>EUR444.00 NONREF - EVASION WEEKCHGS RESTRICTED/NO REFUND</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>FCA</attributeType> <attributeDescription>NCE 6X PAR222.006X NCE222.00EUR444.00END</attributeDescription> </attributeDetails> </otherPricingInfo> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText>NON-REFUNDABLE</errorFreeText> </warningText> </warningInformation> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText> - SEE ADV PURCHASE</errorFreeText> </warningText> </warningInformation> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText>BG CXR</errorFreeText> </warningText> </warningInformation> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText>PRICED WITH VALIDATING CARRIER 6X - REPRICE IF DIFFERENT VC</errorFreeText> </warningText> </warningInformation> <automaticReissueInfo> <ticketInfo> <documentDetails> <number>9991234567890</number> <type>ET</type> </documentDetails> </ticketInfo> <couponInfo> <couponDetails> <cpnNumber>1</cpnNumber> </couponDetails> </couponInfo> <baseFareInfo> <monetaryDetails> <typeQualifier>IBA</typeQualifier> <amount>444.00</amount> <currency>EUR</currency> </monetaryDetails> </baseFareInfo> <firstDpiGroup> <reIssuePenalty> <penDisData> <penaltyAmount>0.00</penaltyAmount> <penaltyCurrency>EUR</penaltyCurrency> </penDisData> </reIssuePenalty> <reissueInfo> <monetaryDetails> <typeQualifier>RES</typeQualifier> <amount>59.01</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>RTO</typeQualifier> <amount>444.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TSC</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TST</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>RTA</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TAC</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </otherMonetaryDetails> </reissueInfo> <oldTaxInfo> <monetaryDetails> <typeQualifier>ITA</typeQualifier> <amount>59.01</amount> <currency>EUR</currency> </monetaryDetails> </oldTaxInfo> <reissueBalanceInfo> <monetaryDetails> <typeQualifier>BEQ</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>BGT</typeQualifier> <amount>-59.01</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BTA</typeQualifier> <amount>-59.01</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BTO</typeQualifier> <amount>-59.01</amount> <currency>EUR</currency> </otherMonetaryDetails> </reissueBalanceInfo> </firstDpiGroup> <secondDpiGroup> <penalty> <penDisData> <penaltyAmount>0.00</penaltyAmount> <penaltyCurrency>EUR</penaltyCurrency> </penDisData> </penalty> <residualValueInfo> <monetaryDetails> <typeQualifier>RES</typeQualifier> <amount>59.01</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>RTA</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </otherMonetaryDetails> </residualValueInfo> <oldTaxInfo> <monetaryDetails> <typeQualifier>ITA</typeQualifier> <amount>59.01</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>ITO</typeQualifier> <amount>503.01</amount> <currency>EUR</currency> </otherMonetaryDetails> </oldTaxInfo> <issueBalanceInfo> <monetaryDetails> <typeQualifier>BTA</typeQualifier> <amount>-59.01</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>BEQ</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BGT</typeQualifier> <amount>-59.01</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BTO</typeQualifier> <amount>-59.01</amount> <currency>EUR</currency> </otherMonetaryDetails> </issueBalanceInfo> </secondDpiGroup> <firstPricingInformationKey> <dataLength>28</dataLength> <dataType>B</dataType> <binaryData>STIwMTUwMzIwLTQ3MzQ2MzMwNDY0MDM1NjAwMA==</binaryData> </firstPricingInformationKey> <formOfPaymentInformation> <formOfPayment> <type>CA</type> <indicator>2</indicator> </formOfPayment> </formOfPaymentInformation> <reissueAttributes> <attributeDetails> <attributeType>NET</attributeType> <attributeDescription>1</attributeDescription> </attributeDetails> </reissueAttributes> <foLine> <layout> <issue> <cityCode>YYZ</cityCode> <dateOfIssue>200415</dateOfIssue> <iataNumber>69090243</iataNumber> </issue> </layout> <orgAnd4Exchange> <tkt> <documentDetails> <number>9991234567890</number> <dataIndicator>ORG</dataIndicator> </documentDetails> </tkt> </orgAnd4Exchange> <orgAnd4Exchange> <tkt> <documentDetails> <number>9991234567890</number> <dataIndicator>3</dataIndicator> </documentDetails> </tkt> <rng> <rangeQualifier>F</rangeQualifier> <rangeDetails> <min>1</min> <max>1</max> </rangeDetails> </rng> </orgAnd4Exchange> </foLine> </automaticReissueInfo> <fareComponentDetailsGroup> <fareComponentID> <itemNumberDetails> <number>1</number> </itemNumberDetails> </fareComponentID> <couponDetailsGroup> <productId> <referenceDetails> <type>ST</type> <value>1</value> </referenceDetails> </productId> </couponDetailsGroup> </fareComponentDetailsGroup> <fareComponentDetailsGroup> <fareComponentID> <itemNumberDetails> <number>2</number> </itemNumberDetails> </fareComponentID> <couponDetailsGroup> <productId> <referenceDetails> <type>ST</type> <value>2</value> </referenceDetails> </productId> </couponDetailsGroup> </fareComponentDetailsGroup> <markerFares></markerFares> </fareList> </ticketGroup> <docSeparator></docSeparator> </Ticket\_ReissuePricingWithoutPNRReply>

## 5.3.3 Possible Errors

See "Error Messages" section.

* * *

## 5.4 Operation: 1 passenger reprice leads to revalidation

This message shows the reprice of a ticket which leads to a revalidation proposal as it is shown in: <reissueAttributes\> REVAL.

## 5.4.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_ReissuePricingWithoutPNR xmlns="http://xml.amadeus.com/TRPNRQ\_15\_1\_1A"> <passengersGroup> <segmentRepetitionControl> <segmentControlDetails> <quantity>1</quantity> <numberOfUnits>1</numberOfUnits> </segmentControlDetails> </segmentRepetitionControl> <travellersID> <travellerDetails> <measurementValue>1</measurementValue> <surname>FRANCOIS</surname> <firstName>PIERRE</firstName> </travellerDetails> </travellersID> <discountPtc> <valueQualifier>ADT</valueQualifier> </discountPtc> </passengersGroup> <segmentGroup> <boardoff> <origin>NCE</origin> <destination>PAR</destination> </boardoff> <segmentInformation> <flightDate> <departureDate>231014</departureDate> <departureTime>0600</departureTime> <arrivalDate>231014</arrivalDate> <arrivalTime>0725</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>NCE</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>ORY</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>6249</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> <flightTypeDetails> <flightIndicator>1</flightIndicator> </flightTypeDetails> <itemNumber>1</itemNumber> </segmentInformation> </segmentGroup> <segmentGroup> <boardoff> <origin>PAR</origin> <destination>NCE</destination> </boardoff> <segmentInformation> <flightDate> <departureDate>281014</departureDate> <departureTime>0635</departureTime> <arrivalDate>281014</arrivalDate> <arrivalTime>0755</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>ORY</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>NCE</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>6240</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> <flightTypeDetails> <flightIndicator>1</flightIndicator> </flightTypeDetails> <itemNumber>2</itemNumber> </segmentInformation> </segmentGroup> <exchangeInformationGroup> <transactionIdentifier> <itemNumberDetails> <number>1</number> </itemNumberDetails> </transactionIdentifier> <documentInfoGroup> <paperticketDetailsLastCoupon> <documentDetails> <number>9991234567890</number> <type>ET</type> </documentDetails> </paperticketDetailsLastCoupon> </documentInfoGroup> </exchangeInformationGroup> <pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>SEL</pricingOptionKey> </pricingOptionKey> <paxSegTstReference> <referenceDetails> <type>PA</type> <value>1</value> </referenceDetails> <referenceDetails> <type>E</type> <value>1</value> </referenceDetails> </paxSegTstReference> </pricingOptionGroup> </Ticket\_ReissuePricingWithoutPNR>

## 5.4.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_ReissuePricingWithoutPNRReply xmlns="http://xml.amadeus.com/TRPNRR\_15\_1\_1A"> <ticketGroup> <pnrLocatorData> <reservationInformation> <controlNumber>0</controlNumber> </reservationInformation> </pnrLocatorData> <fareList> <pricingInformation> <tstInformation> <tstIndicator>M</tstIndicator> </tstInformation> <fcmi>4</fcmi> </pricingInformation> <fareReference> <referenceType>TST</referenceType> <uniqueReference>1</uniqueReference> </fareReference> <lastTktDate> <businessSemantic>LT</businessSemantic> <dateTime> <year>2014</year> <month>10</month> <day>13</day> </dateTime> </lastTktDate> <validatingCarrier> <carrierInformation> <carrierCode>6X</carrierCode> </carrierInformation> </validatingCarrier> <paxSegReference> <refDetails> <refQualifier>PA</refQualifier> <refNumber>1</refNumber> </refDetails> </paxSegReference> <fareDataInformation> <fareDataMainInformation> <fareDataQualifier>R</fareDataQualifier> </fareDataMainInformation> <fareDataSupInformation> <fareDataQualifier>712</fareDataQualifier> <fareAmount>50.00</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataSupInformation> <fareDataSupInformation> <fareDataQualifier>B</fareDataQualifier> <fareAmount>444.00</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataSupInformation> </fareDataInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>FR</isoCountry> </taxType> <taxNature>SE</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>8.72</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>FR</isoCountry> </taxType> <taxNature>TI</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>23.00</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>IZ</isoCountry> </taxType> <taxNature>EB</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>2.26</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>QW</isoCountry> </taxType> <taxNature>LO</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>19.66</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>UI</isoCountry> </taxType> <taxNature>VZ</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>5.37</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>X</taxIdentifier> </taxIdentification> <taxType> <isoCountry>ZV</isoCountry> </taxType> <taxNature>GO</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>50.00</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <passengerInformation> <penDisInformation></penDisInformation> <travellerInfo> <travellerNameInfo> <type>ADT</type> </travellerNameInfo> <otherPaxNamesDetails> <surname>FRANCOIS</surname> <givenName>PIERRE</givenName> </otherPaxNamesDetails> </travellerInfo> <passengerReference> <refDetails> <refQualifier>PA</refQualifier> <refNumber>1</refNumber> </refDetails> </passengerReference> </passengerInformation> <originDestination> <cityCode>NCE</cityCode> <cityCode>NCE</cityCode> </originDestination> <segmentInformation> <connexInformation> <connecDetails> <connexType>O</connexType> </connecDetails> </connexInformation> <segDetails> <flightDate> <departureDate>231014</departureDate> <departureTime>600</departureTime> <arrivalDate>231014</arrivalDate> <arrivalTime>725</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>NCE</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>ORY</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>6249</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> </segDetails> <fareQualifier> <fareBasisDetails> <primaryCode>YWK</primaryCode> <fareBasisCode>FR</fareBasisCode> <discTktDesignator>ADT</discTktDesignator> </fareBasisDetails> </fareQualifier> <validityInformation> <businessSemantic>A</businessSemantic> <dateTime> <year>2014</year> <month>10</month> <day>23</day> </dateTime> </validityInformation> <validityInformation> <businessSemantic>B</businessSemantic> <dateTime> <year>2014</year> <month>10</month> <day>23</day> </dateTime> </validityInformation> <bagAllowanceInformation> <bagAllowanceDetails> <baggageQuantity>1</baggageQuantity> <baggageType>N</baggageType> </bagAllowanceDetails> </bagAllowanceInformation> <segmentReference> <refDetails> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </refDetails> </segmentReference> <sequenceInformation> <sequenceSection> <sequenceNumber>1</sequenceNumber> </sequenceSection> </sequenceInformation> </segmentInformation> <segmentInformation> <connexInformation> <connecDetails> <connexType>O</connexType> </connecDetails> </connexInformation> <segDetails> <flightDate> <departureDate>281014</departureDate> <departureTime>635</departureTime> <arrivalDate>281014</arrivalDate> <arrivalTime>755</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>ORY</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>NCE</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>6240</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> </segDetails> <fareQualifier> <fareBasisDetails> <primaryCode>YWK</primaryCode> <fareBasisCode>FR</fareBasisCode> <discTktDesignator>ADT</discTktDesignator> </fareBasisDetails> </fareQualifier> <validityInformation> <businessSemantic>A</businessSemantic> <dateTime> <year>2014</year> <month>10</month> <day>28</day> </dateTime> </validityInformation> <validityInformation> <businessSemantic>B</businessSemantic> <dateTime> <year>2014</year> <month>10</month> <day>28</day> </dateTime> </validityInformation> <bagAllowanceInformation> <bagAllowanceDetails> <baggageQuantity>1</baggageQuantity> <baggageType>N</baggageType> </bagAllowanceDetails> </bagAllowanceInformation> <segmentReference> <refDetails> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </refDetails> </segmentReference> <sequenceInformation> <sequenceSection> <sequenceNumber>2</sequenceNumber> </sequenceSection> </sequenceInformation> </segmentInformation> <otherPricingInfo> <attributeDetails> <attributeType>END</attributeType> <attributeDescription>EUR444.00 NONREF - EVASION WEEKCHGS RESTRICTED/NO REFUND</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>FCA</attributeType> <attributeDescription>NCE 6X PAR222.006X NCE222.00EUR444.00END</attributeDescription> </attributeDetails> </otherPricingInfo> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText>NON-REFUNDABLE</errorFreeText> </warningText> </warningInformation> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText> - SEE ADV PURCHASE</errorFreeText> </warningText> </warningInformation> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText>MANUAL MANIPULATION OF TAXES 4</errorFreeText> </warningText> </warningInformation> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText>BG CXR</errorFreeText> </warningText> </warningInformation> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText>PRICED WITH VALIDATING CARRIER 6X - REPRICE IF DIFFERENT VC</errorFreeText> </warningText> </warningInformation> <automaticReissueInfo> <ticketInfo> <documentDetails> <number>9991234567890</number> <type>ET</type> </documentDetails> </ticketInfo> <couponInfo> <couponDetails> <cpnNumber>1</cpnNumber> </couponDetails> </couponInfo> <baseFareInfo> <monetaryDetails> <typeQualifier>IBA</typeQualifier> <amount>444.00</amount> <currency>EUR</currency> </monetaryDetails> </baseFareInfo> <firstDpiGroup> <reIssuePenalty> <penDisData> <penaltyAmount>70</penaltyAmount> <penaltyCurrency>EUR</penaltyCurrency> </penDisData> </reIssuePenalty> <reissueInfo> <monetaryDetails> <typeQualifier>RES</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>RTO</typeQualifier> <amount>553.01</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TSC</typeQualifier> <amount>50.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TST</typeQualifier> <amount>50.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>RTA</typeQualifier> <amount>109.01</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TAC</typeQualifier> <amount>120.00</amount> <currency>EUR</currency> </otherMonetaryDetails> </reissueInfo> <oldTaxInfo> <monetaryDetails> <typeQualifier>ITA</typeQualifier> <amount>59.01</amount> <currency>EUR</currency> </monetaryDetails> </oldTaxInfo> <reissueBalanceInfo> <monetaryDetails> <typeQualifier>BEQ</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>BGT</typeQualifier> <amount>120.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BTA</typeQualifier> <amount>50.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BTO</typeQualifier> <amount>50.00</amount> <currency>EUR</currency> </otherMonetaryDetails> </reissueBalanceInfo> </firstDpiGroup> <secondDpiGroup> <penalty> <penDisData> <penaltyAmount>70</penaltyAmount> <penaltyCurrency>EUR</penaltyCurrency> </penDisData> </penalty> <residualValueInfo> <monetaryDetails> <typeQualifier>RES</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>RTA</typeQualifier> <amount>109.01</amount> <currency>EUR</currency> </otherMonetaryDetails> </residualValueInfo> <oldTaxInfo> <monetaryDetails> <typeQualifier>ITA</typeQualifier> <amount>59.01</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>ITO</typeQualifier> <amount>503.01</amount> <currency>EUR</currency> </otherMonetaryDetails> </oldTaxInfo> <issueBalanceInfo> <monetaryDetails> <typeQualifier>BTA</typeQualifier> <amount>50.00</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>BEQ</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BGT</typeQualifier> <amount>120.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BTO</typeQualifier> <amount>50.00</amount> <currency>EUR</currency> </otherMonetaryDetails> </issueBalanceInfo> </secondDpiGroup> <firstPricingInformationKey> <dataLength>28</dataLength> <dataType>B</dataType> <binaryData>STIwMTUwMzIwLTQ3MzQ2MzMwNDY0MDM1NjAwMA==</binaryData> </firstPricingInformationKey> <formOfPaymentInformation> <formOfPayment> <type>CA</type> <indicator>2</indicator> </formOfPayment> </formOfPaymentInformation> <reissueAttributes> <attributeDetails> <attributeType>REVAL</attributeType> <attributeDescription>1</attributeDescription> </attributeDetails> </reissueAttributes> <foLine> <layout> <issue> <cityCode>YYZ</cityCode> <dateOfIssue>200415</dateOfIssue> <iataNumber>69090243</iataNumber> </issue> </layout> <orgAnd4Exchange> <tkt> <documentDetails> <number>9991234567890</number> <dataIndicator>ORG</dataIndicator> </documentDetails> </tkt> </orgAnd4Exchange> <orgAnd4Exchange> <tkt> <documentDetails> <number>9991234567890</number> <dataIndicator>3</dataIndicator> </documentDetails> </tkt> <rng> <rangeQualifier>F</rangeQualifier> <rangeDetails> <min>1</min> <max>1</max> </rangeDetails> </rng> </orgAnd4Exchange> </foLine> </automaticReissueInfo> <fareComponentDetailsGroup> <fareComponentID> <itemNumberDetails> <number>1</number> </itemNumberDetails> </fareComponentID> <couponDetailsGroup> <productId> <referenceDetails> <type>ST</type> <value>1</value> </referenceDetails> </productId> </couponDetailsGroup> </fareComponentDetailsGroup> <fareComponentDetailsGroup> <fareComponentID> <itemNumberDetails> <number>2</number> </itemNumberDetails> </fareComponentID> <couponDetailsGroup> <productId> <referenceDetails> <type>ST</type> <value>2</value> </referenceDetails> </productId> </couponDetailsGroup> </fareComponentDetailsGroup> <markerFares></markerFares> </fareList> </ticketGroup> <docSeparator></docSeparator> </Ticket\_ReissuePricingWithoutPNRReply>

## 5.4.3 Possible Errors

See "Error Messages" section.

* * *

## 5.5 Operation: 1 passenger reprice override currency

This example shows the reprice of a ticket in an european office so default currency EUR where the agent overrides the currency and selects USD.

## 5.5.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_ReissuePricingWithoutPNR xmlns="http://xml.amadeus.com/TRPNRQ\_15\_1\_1A"> <passengersGroup> <segmentRepetitionControl> <segmentControlDetails> <quantity>1</quantity> <numberOfUnits>1</numberOfUnits> </segmentControlDetails> </segmentRepetitionControl> <travellersID> <travellerDetails> <measurementValue>1</measurementValue> <surname>FRANCOIS</surname> <firstName>PIERRE</firstName> </travellerDetails> </travellersID> <discountPtc> <valueQualifier>ADT</valueQualifier> </discountPtc> </passengersGroup> <segmentGroup> <boardoff> <origin>NCE</origin> <destination>PAR</destination> </boardoff> <segmentInformation> <flightDate> <departureDate>231014</departureDate> <departureTime>0600</departureTime> <arrivalDate>231014</arrivalDate> <arrivalTime>0725</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>NCE</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>ORY</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>6249</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> <flightTypeDetails> <flightIndicator>1</flightIndicator> </flightTypeDetails> <itemNumber>1</itemNumber> </segmentInformation> </segmentGroup> <segmentGroup> <boardoff> <origin>PAR</origin> <destination>NCE</destination> </boardoff> <segmentInformation> <flightDate> <departureDate>281014</departureDate> <departureTime>0635</departureTime> <arrivalDate>281014</arrivalDate> <arrivalTime>0755</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>ORY</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>NCE</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>6240</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> <flightTypeDetails> <flightIndicator>1</flightIndicator> </flightTypeDetails> <itemNumber>2</itemNumber> </segmentInformation> </segmentGroup> <exchangeInformationGroup> <transactionIdentifier> <itemNumberDetails> <number>1</number> </itemNumberDetails> </transactionIdentifier> <documentInfoGroup> <paperticketDetailsLastCoupon> <documentDetails> <number>9991234567890</number> <type>ET</type> </documentDetails> </paperticketDetailsLastCoupon> </documentInfoGroup> </exchangeInformationGroup> <pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>SEL</pricingOptionKey> </pricingOptionKey> <paxSegTstReference> <referenceDetails> <type>PA</type> <value>1</value> </referenceDetails> <referenceDetails> <type>E</type> <value>1</value> </referenceDetails> </paxSegTstReference> </pricingOptionGroup> <pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>FCO</pricingOptionKey> </pricingOptionKey> <currency> <firstCurrencyDetails> <currencyQualifier>FCO</currencyQualifier> <currencyIsoCode>USD</currencyIsoCode> </firstCurrencyDetails> </currency> </pricingOptionGroup> </Ticket\_ReissuePricingWithoutPNR>

## 5.5.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_ReissuePricingWithoutPNRReply xmlns="http://xml.amadeus.com/TRPNRR\_15\_1\_1A"> <ticketGroup> <pnrLocatorData> <reservationInformation> <controlNumber>0</controlNumber> </reservationInformation> </pnrLocatorData> <fareList> <pricingInformation> <tstInformation> <tstIndicator>I</tstIndicator> </tstInformation> <fcmi>0</fcmi> </pricingInformation> <fareReference> <referenceType>TST</referenceType> <uniqueReference>1</uniqueReference> </fareReference> <lastTktDate> <businessSemantic>LT</businessSemantic> <dateTime> <year>2015</year> <month>10</month> <day>22</day> </dateTime> </lastTktDate> <validatingCarrier> <carrierInformation> <carrierCode>6X</carrierCode> </carrierInformation> </validatingCarrier> <paxSegReference> <refDetails> <refQualifier>PA</refQualifier> <refNumber>1</refNumber> </refDetails> </paxSegReference> <fareDataInformation> <fareDataMainInformation> <fareDataQualifier>R</fareDataQualifier> </fareDataMainInformation> <fareDataSupInformation> <fareDataQualifier>712</fareDataQualifier> <fareAmount>0.00</fareAmount> <fareCurrency>USD</fareCurrency> </fareDataSupInformation> <fareDataSupInformation> <fareDataQualifier>B</fareDataQualifier> <fareAmount>450.00</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataSupInformation> </fareDataInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>FR</isoCountry> </taxType> <taxNature>SE</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>4.40</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>FR</isoCountry> </taxType> <taxNature>TI</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>12.75</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>IZ</isoCountry> </taxType> <taxNature>EB</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>1.13</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>RFD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>UB</isoCountry> </taxType> <taxNature>AS</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>31.70</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>RFD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>YR</isoCountry> </taxType> <taxNature>VB</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>84.32</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>U</taxIdentifier> </taxIdentification> <taxType> <isoCountry>GB</isoCountry> </taxType> <taxNature>AD</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>17.68</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>U</taxIdentifier> </taxIdentification> <taxType> <isoCountry>QX</isoCountry> </taxType> <taxNature>AP</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>13.68</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>U</taxIdentifier> </taxIdentification> <taxType> <isoCountry>UB</isoCountry> </taxType> <taxNature>AS</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>9.25</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>GST</taxIdentifier> </taxIdentification> <taxType> <isoCountry>FR</isoCountry> </taxType> <taxNature>SE</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>4.40</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>GST</taxIdentifier> </taxIdentification> <taxType> <isoCountry>FR</isoCountry> </taxType> <taxNature>TI</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>9.77</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>GST</taxIdentifier> </taxIdentification> <taxType> <isoCountry>IZ</isoCountry> </taxType> <taxNature>EB</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>1.13</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>GST</taxIdentifier> </taxIdentification> <taxType> <isoCountry>QW</isoCountry> </taxType> <taxNature>LO</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>19.95</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>GST</taxIdentifier> </taxIdentification> <taxType> <isoCountry>UI</isoCountry> </taxType> <taxNature>VZ</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>5.36</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <passengerInformation> <penDisInformation></penDisInformation> <travellerInfo> <travellerNameInfo> <type>ADT</type> </travellerNameInfo> <otherPaxNamesDetails> <surname>FRANCOIS</surname> <givenName>PIERRE</givenName> </otherPaxNamesDetails> </travellerInfo> <passengerReference> <refDetails> <refQualifier>PA</refQualifier> <refNumber>1</refNumber> </refDetails> </passengerReference> </passengerInformation> <originDestination> <cityCode>NCE</cityCode> <cityCode>NCE</cityCode> </originDestination> <segmentInformation> <connexInformation> <connecDetails> <connexType>O</connexType> </connecDetails> </connexInformation> <segDetails> <flightDate> <departureDate>231215</departureDate> <departureTime>0600</departureTime> <arrivalDate>231215</arrivalDate> <arrivalTime>0725</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>NCE</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>ORY</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>AF</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>6249</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> </segDetails> <fareQualifier> <fareBasisDetails> <primaryCode>YWK</primaryCode> <fareBasisCode>FR</fareBasisCode> <discTktDesignator>ADT</discTktDesignator> </fareBasisDetails> </fareQualifier> <validityInformation> <businessSemantic>A</businessSemantic> <dateTime> <year>2015</year> <month>12</month> <day>23</day> </dateTime> </validityInformation> <validityInformation> <businessSemantic>B</businessSemantic> <dateTime> <year>2015</year> <month>12</month> <day>23</day> </dateTime> </validityInformation> <bagAllowanceInformation> <bagAllowanceDetails> <baggageQuantity>1</baggageQuantity> <baggageType>N</baggageType> </bagAllowanceDetails> </bagAllowanceInformation> <segmentReference> <refDetails> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </refDetails> </segmentReference> <sequenceInformation> <sequenceSection> <sequenceNumber>1</sequenceNumber> </sequenceSection> </sequenceInformation> </segmentInformation> <segmentInformation> <connexInformation> <connecDetails> <connexType>O</connexType> </connecDetails> </connexInformation> <segDetails> <flightDate> <departureDate>281215</departureDate> <departureTime>0635</departureTime> <arrivalDate>281215</arrivalDate> <arrivalTime>0755</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>ORY</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>NCE</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>AF</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>6240</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> </segDetails> <fareQualifier> <fareBasisDetails> <primaryCode>YWK</primaryCode> <fareBasisCode>FR</fareBasisCode> <discTktDesignator>ADT</discTktDesignator> </fareBasisDetails> </fareQualifier> <validityInformation> <businessSemantic>A</businessSemantic> <dateTime> <year>2015</year> <month>12</month> <day>28</day> </dateTime> </validityInformation> <validityInformation> <businessSemantic>B</businessSemantic> <dateTime> <year>2015</year> <month>12</month> <day>28</day> </dateTime> </validityInformation> <bagAllowanceInformation> <bagAllowanceDetails> <baggageQuantity>1</baggageQuantity> <baggageType>N</baggageType> </bagAllowanceDetails> </bagAllowanceInformation> <segmentReference> <refDetails> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </refDetails> </segmentReference> <sequenceInformation> <sequenceSection> <sequenceNumber>2</sequenceNumber> </sequenceSection> </sequenceInformation> </segmentInformation> <otherPricingInfo> <attributeDetails> <attributeType>END</attributeType> <attributeDescription>USD507.00 NONREF - CHGS RESTRICTED/NO REFUND</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>FCA</attributeType> <attributeDescription>NCE AF PAR225.00AF NCE225.00EUR450.00END</attributeDescription> </attributeDetails> </otherPricingInfo> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText>NON-REFUNDABLE</errorFreeText> </warningText> </warningInformation> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText> - SEE ADV PURCHASE</errorFreeText> </warningText> </warningInformation> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText>BG CXR</errorFreeText> </warningText> </warningInformation> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText>PRICED WITH VALIDATING CARRIER AF - REPRICE IF DIFFERENT VC</errorFreeText> </warningText> </warningInformation> <automaticReissueInfo> <ticketInfo> <documentDetails> <number>9991234567890</number> <type>ET</type> </documentDetails> </ticketInfo> <couponInfo> <couponDetails> <cpnNumber>1</cpnNumber> </couponDetails> </couponInfo> <baseFareInfo> <monetaryDetails> <typeQualifier>IBA</typeQualifier> <amount>482.00</amount> <currency>GBP</currency> </monetaryDetails> </baseFareInfo> <firstDpiGroup> <reIssuePenalty> <penDisData> <penaltyAmount>0.00</penaltyAmount> <penaltyCurrency>USD</penaltyCurrency> </penDisData> </reIssuePenalty> <reissueInfo> <monetaryDetails> <typeQualifier>RES</typeQualifier> <amount>362.71</amount> <currency>USD</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>RTO</typeQualifier> <amount>573.38</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TSC</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TST</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>RTA</typeQualifier> <amount>66.38</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TAC</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> </reissueInfo> <oldTaxInfo> <monetaryDetails> <typeQualifier>ITA</typeQualifier> <amount>197.09</amount> <currency>USD</currency> </monetaryDetails> </oldTaxInfo> <reissueBalanceInfo> <monetaryDetails> <typeQualifier>BEQ</typeQualifier> <amount>-232.00</amount> <currency>USD</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>BGT</typeQualifier> <amount>-362.71</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BTA</typeQualifier> <amount>-130.71</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BTO</typeQualifier> <amount>-362.71</amount> <currency>USD</currency> </otherMonetaryDetails> </reissueBalanceInfo> </firstDpiGroup> <secondDpiGroup> <penalty> <penDisData> <penaltyAmount>0.00</penaltyAmount> <penaltyCurrency>EUR</penaltyCurrency> </penDisData> </penalty> <residualValueInfo> <monetaryDetails> <typeQualifier>RES</typeQualifier> <amount>322.02</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>RTA</typeQualifier> <amount>58.89</amount> <currency>EUR</currency> </otherMonetaryDetails> </residualValueInfo> <oldTaxInfo> <monetaryDetails> <typeQualifier>ITA</typeQualifier> <amount>174.91</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>ITO</typeQualifier> <amount>830.91</amount> <currency>EUR</currency> </otherMonetaryDetails> </oldTaxInfo> <issueBalanceInfo> <monetaryDetails> <typeQualifier>BTA</typeQualifier> <amount>-116.02</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>BEQ</typeQualifier> <amount>-206.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BGT</typeQualifier> <amount>-322.02</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BTO</typeQualifier> <amount>-322.02</amount> <currency>EUR</currency> </otherMonetaryDetails> </issueBalanceInfo> </secondDpiGroup> <formOfPaymentInformation> <formOfPayment> <type>CA</type> <indicator>2</indicator> </formOfPayment> </formOfPaymentInformation> <reissueAttributes> <attributeDetails> <attributeType>NET</attributeType> <attributeDescription>1</attributeDescription> </attributeDetails> </reissueAttributes> <foLine> <layout> <issue> <cityCode>YYZ</cityCode> <dateOfIssue>200415</dateOfIssue> <iataNumber>69090243</iataNumber> </issue> </layout> <orgAnd4Exchange> <tkt> <documentDetails> <number>9991234567890</number> <dataIndicator>ORG</dataIndicator> </documentDetails> </tkt> </orgAnd4Exchange> <orgAnd4Exchange> <tkt> <documentDetails> <number>9991234567890</number> <dataIndicator>3</dataIndicator> </documentDetails> </tkt> <rng> <rangeQualifier>F</rangeQualifier> <rangeDetails> <min>1</min> <max>1</max> </rangeDetails> </rng> </orgAnd4Exchange> </foLine> </automaticReissueInfo> <fareComponentDetailsGroup> <fareComponentID> <itemNumberDetails> <number>1</number> </itemNumberDetails> </fareComponentID> <couponDetailsGroup> <productId> <referenceDetails> <type>ST</type> <value>1</value> </referenceDetails> </productId> </couponDetailsGroup> </fareComponentDetailsGroup> <fareComponentDetailsGroup> <fareComponentID> <itemNumberDetails> <number>2</number> </itemNumberDetails> </fareComponentID> <couponDetailsGroup> <productId> <referenceDetails> <type>ST</type> <value>2</value> </referenceDetails> </productId> </couponDetailsGroup> </fareComponentDetailsGroup> <markerFares></markerFares> </fareList> </ticketGroup> <docSeparator></docSeparator> </Ticket\_ReissuePricingWithoutPNRReply>

## 5.5.3 Possible Errors

See "Error Messages" section.

* * *

## 5.6 Operation: 1 passenger reprice override selling point

This example shows a reprice of a ticket in an european office with an override of point of selling in New York so USD as a currency of selling. 

## 5.6.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_ReissuePricingWithoutPNR xmlns="http://xml.amadeus.com/TRPNRQ\_15\_1\_1A"> <passengersGroup> <segmentRepetitionControl> <segmentControlDetails> <quantity>1</quantity> <numberOfUnits>1</numberOfUnits> </segmentControlDetails> </segmentRepetitionControl> <travellersID> <travellerDetails> <measurementValue>1</measurementValue> <surname>FRANCOIS</surname> <firstName>PIERRE</firstName> </travellerDetails> </travellersID> <discountPtc> <valueQualifier>ADT</valueQualifier> </discountPtc> </passengersGroup> <segmentGroup> <boardoff> <origin>NCE</origin> <destination>PAR</destination> </boardoff> <segmentInformation> <flightDate> <departureDate>231014</departureDate> <departureTime>0600</departureTime> <arrivalDate>231014</arrivalDate> <arrivalTime>0725</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>NCE</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>ORY</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>6249</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> <flightTypeDetails> <flightIndicator>1</flightIndicator> </flightTypeDetails> <itemNumber>1</itemNumber> </segmentInformation> </segmentGroup> <segmentGroup> <boardoff> <origin>PAR</origin> <destination>NCE</destination> </boardoff> <segmentInformation> <flightDate> <departureDate>281014</departureDate> <departureTime>0635</departureTime> <arrivalDate>281014</arrivalDate> <arrivalTime>0755</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>ORY</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>NCE</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>6240</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> <flightTypeDetails> <flightIndicator>1</flightIndicator> </flightTypeDetails> <itemNumber>2</itemNumber> </segmentInformation> </segmentGroup> <exchangeInformationGroup> <transactionIdentifier> <itemNumberDetails> <number>1</number> </itemNumberDetails> </transactionIdentifier> <documentInfoGroup> <paperticketDetailsLastCoupon> <documentDetails> <number>9991234567890</number> <type>ET</type> </documentDetails> </paperticketDetailsLastCoupon> </documentInfoGroup> </exchangeInformationGroup> <pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>SEL</pricingOptionKey> </pricingOptionKey> <paxSegTstReference> <referenceDetails> <type>PA</type> <value>1</value> </referenceDetails> <referenceDetails> <type>E</type> <value>1</value> </referenceDetails> </paxSegTstReference> </pricingOptionGroup> <pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>POS</pricingOptionKey> </pricingOptionKey> <locationInformation> <locationType>POS</locationType> <firstLocationDetails> <code>NYC</code> </firstLocationDetails> </locationInformation> </pricingOptionGroup> </Ticket\_ReissuePricingWithoutPNR>

## 5.6.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_ReissuePricingWithoutPNRReply xmlns="http://xml.amadeus.com/TRPNRR\_15\_1\_1A"> <ticketGroup> <pnrLocatorData> <reservationInformation> <controlNumber>0</controlNumber> </reservationInformation> </pnrLocatorData> <fareList> <pricingInformation> <tstInformation> <tstIndicator>I</tstIndicator> </tstInformation> <fcmi>0</fcmi> </pricingInformation> <fareReference> <referenceType>TST</referenceType> <uniqueReference>1</uniqueReference> </fareReference> <lastTktDate> <businessSemantic>LT</businessSemantic> <dateTime> <year>2015</year> <month>10</month> <day>22</day> </dateTime> </lastTktDate> <validatingCarrier> <carrierInformation> <carrierCode>6X</carrierCode> </carrierInformation> </validatingCarrier> <paxSegReference> <refDetails> <refQualifier>PA</refQualifier> <refNumber>1</refNumber> </refDetails> </paxSegReference> <fareDataInformation> <fareDataMainInformation> <fareDataQualifier>R</fareDataQualifier> </fareDataMainInformation> <fareDataSupInformation> <fareDataQualifier>712</fareDataQualifier> <fareAmount>0.00</fareAmount> <fareCurrency>USD</fareCurrency> </fareDataSupInformation> <fareDataSupInformation> <fareDataQualifier>B</fareDataQualifier> <fareAmount>450.00</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataSupInformation> </fareDataInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>FR</isoCountry> </taxType> <taxNature>SE</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>4.40</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>FR</isoCountry> </taxType> <taxNature>TI</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>12.75</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>IZ</isoCountry> </taxType> <taxNature>EB</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>1.13</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>RFD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>UB</isoCountry> </taxType> <taxNature>AS</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>31.70</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>RFD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>YR</isoCountry> </taxType> <taxNature>VB</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>84.32</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>U</taxIdentifier> </taxIdentification> <taxType> <isoCountry>GB</isoCountry> </taxType> <taxNature>AD</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>17.68</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>U</taxIdentifier> </taxIdentification> <taxType> <isoCountry>QX</isoCountry> </taxType> <taxNature>AP</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>13.68</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>U</taxIdentifier> </taxIdentification> <taxType> <isoCountry>UB</isoCountry> </taxType> <taxNature>AS</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>9.25</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>GST</taxIdentifier> </taxIdentification> <taxType> <isoCountry>FR</isoCountry> </taxType> <taxNature>SE</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>4.40</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>GST</taxIdentifier> </taxIdentification> <taxType> <isoCountry>FR</isoCountry> </taxType> <taxNature>TI</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>9.77</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>GST</taxIdentifier> </taxIdentification> <taxType> <isoCountry>IZ</isoCountry> </taxType> <taxNature>EB</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>1.13</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>GST</taxIdentifier> </taxIdentification> <taxType> <isoCountry>QW</isoCountry> </taxType> <taxNature>LO</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>19.95</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>GST</taxIdentifier> </taxIdentification> <taxType> <isoCountry>UI</isoCountry> </taxType> <taxNature>VZ</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>5.36</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <passengerInformation> <penDisInformation></penDisInformation> <travellerInfo> <travellerNameInfo> <type>ADT</type> </travellerNameInfo> <otherPaxNamesDetails> <surname>FRANCOIS</surname> <givenName>PIERRE</givenName> </otherPaxNamesDetails> </travellerInfo> <passengerReference> <refDetails> <refQualifier>PA</refQualifier> <refNumber>1</refNumber> </refDetails> </passengerReference> </passengerInformation> <originDestination> <cityCode>NCE</cityCode> <cityCode>NCE</cityCode> </originDestination> <segmentInformation> <connexInformation> <connecDetails> <connexType>O</connexType> </connecDetails> </connexInformation> <segDetails> <flightDate> <departureDate>231215</departureDate> <departureTime>600</departureTime> <arrivalDate>231215</arrivalDate> <arrivalTime>725</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>NCE</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>ORY</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>6249</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> </segDetails> <fareQualifier> <fareBasisDetails> <primaryCode>YWK</primaryCode> <fareBasisCode>FR</fareBasisCode> <discTktDesignator>ADT</discTktDesignator> </fareBasisDetails> </fareQualifier> <validityInformation> <businessSemantic>A</businessSemantic> <dateTime> <year>2015</year> <month>12</month> <day>23</day> </dateTime> </validityInformation> <validityInformation> <businessSemantic>B</businessSemantic> <dateTime> <year>2015</year> <month>12</month> <day>23</day> </dateTime> </validityInformation> <bagAllowanceInformation> <bagAllowanceDetails> <baggageQuantity>1</baggageQuantity> <baggageType>N</baggageType> </bagAllowanceDetails> </bagAllowanceInformation> <segmentReference> <refDetails> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </refDetails> </segmentReference> <sequenceInformation> <sequenceSection> <sequenceNumber>1</sequenceNumber> </sequenceSection> </sequenceInformation> </segmentInformation> <segmentInformation> <connexInformation> <connecDetails> <connexType>O</connexType> </connecDetails> </connexInformation> <segDetails> <flightDate> <departureDate>281215</departureDate> <departureTime>635</departureTime> <arrivalDate>281215</arrivalDate> <arrivalTime>755</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>ORY</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>NCE</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>6240</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> </segDetails> <fareQualifier> <fareBasisDetails> <primaryCode>YWK</primaryCode> <fareBasisCode>FR</fareBasisCode> <discTktDesignator>ADT</discTktDesignator> </fareBasisDetails> </fareQualifier> <validityInformation> <businessSemantic>A</businessSemantic> <dateTime> <year>2015</year> <month>12</month> <day>28</day> </dateTime> </validityInformation> <validityInformation> <businessSemantic>B</businessSemantic> <dateTime> <year>2015</year> <month>12</month> <day>28</day> </dateTime> </validityInformation> <bagAllowanceInformation> <bagAllowanceDetails> <baggageQuantity>1</baggageQuantity> <baggageType>N</baggageType> </bagAllowanceDetails> </bagAllowanceInformation> <segmentReference> <refDetails> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </refDetails> </segmentReference> <sequenceInformation> <sequenceSection> <sequenceNumber>2</sequenceNumber> </sequenceSection> </sequenceInformation> </segmentInformation> <otherPricingInfo> <attributeDetails> <attributeType>END</attributeType> <attributeDescription>USD507.00 NONREF - CHGS RESTRICTED/NO REFUND</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>FCA</attributeType> <attributeDescription>NCE 6X PAR225.006X NCE225.00EUR450.00END</attributeDescription> </attributeDetails> </otherPricingInfo> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText>NON-REFUNDABLE</errorFreeText> </warningText> </warningInformation> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText> - SEE ADV PURCHASE</errorFreeText> </warningText> </warningInformation> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText>BG CXR</errorFreeText> </warningText> </warningInformation> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText>PRICED WITH VALIDATING CARRIER 6X - REPRICE IF DIFFERENT VC</errorFreeText> </warningText> </warningInformation> <automaticReissueInfo> <ticketInfo> <documentDetails> <number>9991234567890</number> <type>ET</type> </documentDetails> </ticketInfo> <couponInfo> <couponDetails> <cpnNumber>1</cpnNumber> </couponDetails> </couponInfo> <baseFareInfo> <monetaryDetails> <typeQualifier>IBA</typeQualifier> <amount>482.00</amount> <currency>GBP</currency> </monetaryDetails> </baseFareInfo> <firstDpiGroup> <reIssuePenalty> <penDisData> <penaltyAmount>0</penaltyAmount> <penaltyCurrency>USD</penaltyCurrency> </penDisData> </reIssuePenalty> <reissueInfo> <monetaryDetails> <typeQualifier>RES</typeQualifier> <amount>362.71</amount> <currency>USD</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>RTO</typeQualifier> <amount>573.38</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TSC</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TST</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>RTA</typeQualifier> <amount>66.38</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TAC</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> </reissueInfo> <oldTaxInfo> <monetaryDetails> <typeQualifier>ITA</typeQualifier> <amount>197.09</amount> <currency>USD</currency> </monetaryDetails> </oldTaxInfo> <reissueBalanceInfo> <monetaryDetails> <typeQualifier>BEQ</typeQualifier> <amount>-232.00</amount> <currency>USD</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>BGT</typeQualifier> <amount>-362.71</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BTA</typeQualifier> <amount>-130.71</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BTO</typeQualifier> <amount>-362.71</amount> <currency>USD</currency> </otherMonetaryDetails> </reissueBalanceInfo> </firstDpiGroup> <secondDpiGroup> <penalty> <penDisData> <penaltyAmount>0</penaltyAmount> <penaltyCurrency>EUR</penaltyCurrency> </penDisData> </penalty> <residualValueInfo> <monetaryDetails> <typeQualifier>RES</typeQualifier> <amount>322.02</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>RTA</typeQualifier> <amount>58.89</amount> <currency>EUR</currency> </otherMonetaryDetails> </residualValueInfo> <oldTaxInfo> <monetaryDetails> <typeQualifier>ITA</typeQualifier> <amount>174.91</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>ITO</typeQualifier> <amount>830.91</amount> <currency>EUR</currency> </otherMonetaryDetails> </oldTaxInfo> <issueBalanceInfo> <monetaryDetails> <typeQualifier>BTA</typeQualifier> <amount>-116.02</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>BEQ</typeQualifier> <amount>-206.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BGT</typeQualifier> <amount>-322.02</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BTO</typeQualifier> <amount>-322.02</amount> <currency>EUR</currency> </otherMonetaryDetails> </issueBalanceInfo> </secondDpiGroup> <formOfPaymentInformation> <formOfPayment> <type>CA</type> <indicator>2</indicator> </formOfPayment> </formOfPaymentInformation> <reissueAttributes> <attributeDetails> <attributeType>NET</attributeType> <attributeDescription>1</attributeDescription> </attributeDetails> </reissueAttributes> <foLine> <layout> <issue> <cityCode>YYZ</cityCode> <dateOfIssue>200415</dateOfIssue> <iataNumber>69090243</iataNumber> </issue> </layout> <orgAnd4Exchange> <tkt> <documentDetails> <number>9991234567890</number> <dataIndicator>ORG</dataIndicator> </documentDetails> </tkt> </orgAnd4Exchange> <orgAnd4Exchange> <tkt> <documentDetails> <number>9991234567890</number> <dataIndicator>3</dataIndicator> </documentDetails> </tkt> <rng> <rangeQualifier>F</rangeQualifier> <rangeDetails> <min>1</min> <max>1</max> </rangeDetails> </rng> </orgAnd4Exchange> </foLine> </automaticReissueInfo> <fareComponentDetailsGroup> <fareComponentID> <itemNumberDetails> <number>1</number> </itemNumberDetails> </fareComponentID> <couponDetailsGroup> <productId> <referenceDetails> <type>ST</type> <value>1</value> </referenceDetails> </productId> </couponDetailsGroup> </fareComponentDetailsGroup> <fareComponentDetailsGroup> <fareComponentID> <itemNumberDetails> <number>2</number> </itemNumberDetails> </fareComponentID> <couponDetailsGroup> <productId> <referenceDetails> <type>ST</type> <value>2</value> </referenceDetails> </productId> </couponDetailsGroup> </fareComponentDetailsGroup> <markerFares></markerFares> </fareList> </ticketGroup> <docSeparator></docSeparator> </Ticket\_ReissuePricingWithoutPNRReply>

## 5.6.3 Possible Errors

See "Error Messages" section.

* * *

## 5.7 Operation: 1 passenger reprice override ticketing point

This example shows a reprice of a ticket in an european office with an override of point of ticketing in New York so USD as a currency of ticketing.

## 5.7.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_ReissuePricingWithoutPNR xmlns="http://xml.amadeus.com/TRPNRQ\_15\_1\_1A"> <passengersGroup> <segmentRepetitionControl> <segmentControlDetails> <quantity>1</quantity> <numberOfUnits>1</numberOfUnits> </segmentControlDetails> </segmentRepetitionControl> <travellersID> <travellerDetails> <measurementValue>1</measurementValue> <surname>FRANCOIS</surname> <firstName>PIERRE</firstName> </travellerDetails> </travellersID> <discountPtc> <valueQualifier>ADT</valueQualifier> </discountPtc> </passengersGroup> <segmentGroup> <boardoff> <origin>NCE</origin> <destination>PAR</destination> </boardoff> <segmentInformation> <flightDate> <departureDate>231014</departureDate> <departureTime>600</departureTime> <arrivalDate>231014</arrivalDate> <arrivalTime>725</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>NCE</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>ORY</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>6249</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> <flightTypeDetails> <flightIndicator>1</flightIndicator> </flightTypeDetails> <itemNumber>1</itemNumber> </segmentInformation> </segmentGroup> <segmentGroup> <boardoff> <origin>PAR</origin> <destination>NCE</destination> </boardoff> <segmentInformation> <flightDate> <departureDate>281014</departureDate> <departureTime>635</departureTime> <arrivalDate>281014</arrivalDate> <arrivalTime>755</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>ORY</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>NCE</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>6240</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> <flightTypeDetails> <flightIndicator>1</flightIndicator> </flightTypeDetails> <itemNumber>2</itemNumber> </segmentInformation> </segmentGroup> <exchangeInformationGroup> <transactionIdentifier> <itemNumberDetails> <number>1</number> </itemNumberDetails> </transactionIdentifier> <documentInfoGroup> <paperticketDetailsLastCoupon> <documentDetails> <number>9991234567890</number> <type>ET</type> </documentDetails> </paperticketDetailsLastCoupon> </documentInfoGroup> </exchangeInformationGroup> <pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>SEL</pricingOptionKey> </pricingOptionKey> <paxSegTstReference> <referenceDetails> <type>PA</type> <value>1</value> </referenceDetails> <referenceDetails> <type>E</type> <value>1</value> </referenceDetails> </paxSegTstReference> </pricingOptionGroup> <pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>POT</pricingOptionKey> </pricingOptionKey> <locationInformation> <locationType>POT</locationType> <firstLocationDetails> <code>NYC</code> </firstLocationDetails> </locationInformation> </pricingOptionGroup> </Ticket\_ReissuePricingWithoutPNR>

## 5.7.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_ReissuePricingWithoutPNRReply xmlns="http://xml.amadeus.com/TRPNRR\_15\_1\_1A"> <ticketGroup> <pnrLocatorData> <reservationInformation> <controlNumber>0</controlNumber> </reservationInformation> </pnrLocatorData> <fareList> <pricingInformation> <tstInformation> <tstIndicator>I</tstIndicator> </tstInformation> <fcmi>0</fcmi> </pricingInformation> <fareReference> <referenceType>TST</referenceType> <uniqueReference>1</uniqueReference> </fareReference> <lastTktDate> <businessSemantic>LT</businessSemantic> <dateTime> <year>2015</year> <month>10</month> <day>29</day> </dateTime> </lastTktDate> <validatingCarrier> <carrierInformation> <carrierCode>6X</carrierCode> </carrierInformation> </validatingCarrier> <paxSegReference> <refDetails> <refQualifier>PA</refQualifier> <refNumber>1</refNumber> </refDetails> </paxSegReference> <fareDataInformation> <fareDataMainInformation> <fareDataQualifier>R</fareDataQualifier> </fareDataMainInformation> <fareDataSupInformation> <fareDataQualifier>712</fareDataQualifier> <fareAmount>0.00</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataSupInformation> <fareDataSupInformation> <fareDataQualifier>B</fareDataQualifier> <fareAmount>450.00</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataSupInformation> </fareDataInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>FR</isoCountry> </taxType> <taxNature>SE</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>4.40</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>FR</isoCountry> </taxType> <taxNature>TI</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>12.75</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>IZ</isoCountry> </taxType> <taxNature>EB</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>1.13</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>RFD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>UB</isoCountry> </taxType> <taxNature>AS</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>31.70</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>RFD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>YR</isoCountry> </taxType> <taxNature>VB</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>84.32</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>U</taxIdentifier> </taxIdentification> <taxType> <isoCountry>GB</isoCountry> </taxType> <taxNature>AD</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>17.68</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>U</taxIdentifier> </taxIdentification> <taxType> <isoCountry>QX</isoCountry> </taxType> <taxNature>AP</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>13.68</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>U</taxIdentifier> </taxIdentification> <taxType> <isoCountry>UB</isoCountry> </taxType> <taxNature>AS</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>9.25</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>GST</taxIdentifier> </taxIdentification> <taxType> <isoCountry>FR</isoCountry> </taxType> <taxNature>SE</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>4.40</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>GST</taxIdentifier> </taxIdentification> <taxType> <isoCountry>FR</isoCountry> </taxType> <taxNature>TI</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>9.77</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>GST</taxIdentifier> </taxIdentification> <taxType> <isoCountry>IZ</isoCountry> </taxType> <taxNature>EB</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>1.13</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>GST</taxIdentifier> </taxIdentification> <taxType> <isoCountry>QW</isoCountry> </taxType> <taxNature>LO</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>19.95</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>GST</taxIdentifier> </taxIdentification> <taxType> <isoCountry>UI</isoCountry> </taxType> <taxNature>VZ</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>5.36</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <passengerInformation> <penDisInformation></penDisInformation> <travellerInfo> <travellerNameInfo> <type>ADT</type> </travellerNameInfo> <otherPaxNamesDetails> <surname>FRANCOIS</surname> <givenName>PIERRE</givenName> </otherPaxNamesDetails> </travellerInfo> <passengerReference> <refDetails> <refQualifier>PA</refQualifier> <refNumber>1</refNumber> </refDetails> </passengerReference> </passengerInformation> <originDestination> <cityCode>NCE</cityCode> <cityCode>NCE</cityCode> </originDestination> <segmentInformation> <connexInformation> <connecDetails> <connexType>O</connexType> </connecDetails> </connexInformation> <segDetails> <flightDate> <departureDate>281215</departureDate> <departureTime>635</departureTime> <arrivalDate>281215</arrivalDate> <arrivalTime>755</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>ORY</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>NCE</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>6240</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> </segDetails> <fareQualifier> <fareBasisDetails> <primaryCode>YWK</primaryCode> <fareBasisCode>FR</fareBasisCode> <discTktDesignator>ADT</discTktDesignator> </fareBasisDetails> </fareQualifier> <validityInformation> <businessSemantic>A</businessSemantic> <dateTime> <year>2015</year> <month>12</month> <day>23</day> </dateTime> </validityInformation> <validityInformation> <businessSemantic>B</businessSemantic> <dateTime> <year>2015</year> <month>12</month> <day>23</day> </dateTime> </validityInformation> <bagAllowanceInformation> <bagAllowanceDetails> <baggageQuantity>1</baggageQuantity> <baggageType>N</baggageType> </bagAllowanceDetails> </bagAllowanceInformation> <segmentReference> <refDetails> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </refDetails> </segmentReference> <sequenceInformation> <sequenceSection> <sequenceNumber>1</sequenceNumber> </sequenceSection> </sequenceInformation> </segmentInformation> <segmentInformation> <connexInformation> <connecDetails> <connexType>O</connexType> </connecDetails> </connexInformation> <segDetails> <flightDate> <departureDate>281215</departureDate> <departureTime>635</departureTime> <arrivalDate>281215</arrivalDate> <arrivalTime>755</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>ORY</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>NCE</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>6240</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> </segDetails> <fareQualifier> <fareBasisDetails> <primaryCode>YWK</primaryCode> <fareBasisCode>FR</fareBasisCode> <discTktDesignator>ADT</discTktDesignator> </fareBasisDetails> </fareQualifier> <validityInformation> <businessSemantic>A</businessSemantic> <dateTime> <year>2015</year> <month>12</month> <day>28</day> </dateTime> </validityInformation> <validityInformation> <businessSemantic>B</businessSemantic> <dateTime> <year>2015</year> <month>12</month> <day>28</day> </dateTime> </validityInformation> <bagAllowanceInformation> <bagAllowanceDetails> <baggageQuantity>1</baggageQuantity> <baggageType>N</baggageType> </bagAllowanceDetails> </bagAllowanceInformation> <segmentReference> <refDetails> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </refDetails> </segmentReference> <sequenceInformation> <sequenceSection> <sequenceNumber>2</sequenceNumber> </sequenceSection> </sequenceInformation> </segmentInformation> <otherPricingInfo> <attributeDetails> <attributeType>END</attributeType> <attributeDescription>EUR450.00 NONREF - CHGS RESTRICTED/NO REFUND</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>FCA</attributeType> <attributeDescription>NCE 6X PAR225.006X NCE225.00EUR450.00END</attributeDescription> </attributeDetails> </otherPricingInfo> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText>NON-REFUNDABLE</errorFreeText> </warningText> </warningInformation> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText> - SEE ADV PURCHASE</errorFreeText> </warningText> </warningInformation> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText>BG CXR</errorFreeText> </warningText> </warningInformation> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText>PRICED WITH VALIDATING CARRIER 6X - REPRICE IF DIFFERENT VC</errorFreeText> </warningText> </warningInformation> <automaticReissueInfo> <ticketInfo> <documentDetails> <number>0572367116680</number> <type>ET</type> </documentDetails> </ticketInfo> <couponInfo> <couponDetails> <cpnNumber>1</cpnNumber> </couponDetails> </couponInfo> <baseFareInfo> <monetaryDetails> <typeQualifier>IBA</typeQualifier> <amount>482.00</amount> <currency>GBP</currency> </monetaryDetails> </baseFareInfo> <firstDpiGroup> <reIssuePenalty> <penDisData> <penaltyAmount>0.00</penaltyAmount> <penaltyCurrency>EUR</penaltyCurrency> </penDisData> </reIssuePenalty> <reissueInfo> <monetaryDetails> <typeQualifier>RES</typeQualifier> <amount>317.02</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>RTO</typeQualifier> <amount>505.89</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TSC</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TST</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>RTA</typeQualifier> <amount>58.89</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TAC</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </otherMonetaryDetails> </reissueInfo> <oldTaxInfo> <monetaryDetails> <typeQualifier>ITA</typeQualifier> <amount>174.91</amount> <currency>EUR</currency> </monetaryDetails> </oldTaxInfo> <reissueBalanceInfo> <monetaryDetails> <typeQualifier>BEQ</typeQualifier> <amount>-201.00</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>BGT</typeQualifier> <amount>-317.02</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BTA</typeQualifier> <amount>-116.02</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BTO</typeQualifier> <amount>-317.02</amount> <currency>EUR</currency> </otherMonetaryDetails> </reissueBalanceInfo> </firstDpiGroup> <secondDpiGroup> <penalty> <penDisData> <penaltyAmount>0.00</penaltyAmount> <penaltyCurrency>EUR</penaltyCurrency> </penDisData> </penalty> <residualValueInfo> <monetaryDetails> <typeQualifier>RES</typeQualifier> <amount>317.02</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>RTA</typeQualifier> <amount>58.89</amount> <currency>EUR</currency> </otherMonetaryDetails> </residualValueInfo> <oldTaxInfo> <monetaryDetails> <typeQualifier>ITA</typeQualifier> <amount>174.91</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>ITO</typeQualifier> <amount>822.91</amount> <currency>EUR</currency> </otherMonetaryDetails> </oldTaxInfo> <issueBalanceInfo> <monetaryDetails> <typeQualifier>BTA</typeQualifier> <amount>-116.02</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>BEQ</typeQualifier> <amount>-201.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BGT</typeQualifier> <amount>-317.02</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BTO</typeQualifier> <amount>-317.02</amount> <currency>EUR</currency> </otherMonetaryDetails> </issueBalanceInfo> </secondDpiGroup> <formOfPaymentInformation> <formOfPayment> <type>CA</type> <indicator>2</indicator> </formOfPayment> </formOfPaymentInformation> <reissueAttributes> <attributeDetails> <attributeType>NET</attributeType> <attributeDescription>1</attributeDescription> </attributeDetails> </reissueAttributes> <foLine> <layout> <issue> <cityCode>YYZ</cityCode> <dateOfIssue>200415</dateOfIssue> <iataNumber>69090243</iataNumber> </issue> </layout> <orgAnd4Exchange> <tkt> <documentDetails> <number>9991234567890</number> <dataIndicator>ORG</dataIndicator> </documentDetails> </tkt> </orgAnd4Exchange> <orgAnd4Exchange> <tkt> <documentDetails> <number>9991234567890</number> <dataIndicator>3</dataIndicator> </documentDetails> </tkt> <rng> <rangeQualifier>F</rangeQualifier> <rangeDetails> <min>1</min> <max>1</max> </rangeDetails> </rng> </orgAnd4Exchange> </foLine> </automaticReissueInfo> <fareComponentDetailsGroup> <fareComponentID> <itemNumberDetails> <number>1</number> </itemNumberDetails> </fareComponentID> <couponDetailsGroup> <productId> <referenceDetails> <type>ST</type> <value>1</value> </referenceDetails> </productId> </couponDetailsGroup> </fareComponentDetailsGroup> <fareComponentDetailsGroup> <fareComponentID> <itemNumberDetails> <number>2</number> </itemNumberDetails> </fareComponentID> <couponDetailsGroup> <productId> <referenceDetails> <type>ST</type> <value>2</value> </referenceDetails> </productId> </couponDetailsGroup> </fareComponentDetailsGroup> <markerFares></markerFares> </fareList> </ticketGroup> <docSeparator></docSeparator> </Ticket\_ReissuePricingWithoutPNRReply>

## 5.7.3 Possible Errors

See "Error Messages" section.

* * *

## 5.8 Operation: 1 passenger reprice with best price option

Find below a complete example where 1 passenger is repriced with the use of best pricing option. It is possible to see the warning message: REBOOK NEEDED

## 5.8.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_ReissuePricingWithoutPNR xmlns="http://xml.amadeus.com/TRPNRQ\_15\_1\_1A"> <passengersGroup> <segmentRepetitionControl> <segmentControlDetails> <quantity>1</quantity> <numberOfUnits>1</numberOfUnits> </segmentControlDetails> </segmentRepetitionControl> <travellersID> <travellerDetails> <measurementValue>1</measurementValue> <surname>FRANCOIS</surname> <firstName>PIERRE</firstName> </travellerDetails> </travellersID> <discountPtc> <valueQualifier>ADT</valueQualifier> </discountPtc> </passengersGroup> <segmentGroup> <boardoff> <origin>BWI</origin> <destination>DEN</destination> </boardoff> <segmentInformation> <flightDate> <departureDate>051014</departureDate> <departureTime>1005</departureTime> <arrivalDate>051014</arrivalDate> <arrivalTime>1215</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>BWI</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>DEN</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>2151</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> <flightTypeDetails> <flightIndicator>1</flightIndicator> </flightTypeDetails> <itemNumber>1</itemNumber> </segmentInformation> </segmentGroup> <segmentGroup> <boardoff> <origin>DEN</origin> <destination>BWI</destination> </boardoff> <segmentInformation> <flightDate> <departureDate>101014</departureDate> <departureTime>615</departureTime> <arrivalDate>101014</arrivalDate> <arrivalTime>1140</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>DEN</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>BWI</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>590</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> <flightTypeDetails> <flightIndicator>1</flightIndicator> </flightTypeDetails> <itemNumber>2</itemNumber> </segmentInformation> </segmentGroup> <exchangeInformationGroup> <transactionIdentifier> <itemNumberDetails> <number>1</number> </itemNumberDetails> </transactionIdentifier> <documentInfoGroup> <paperticketDetailsLastCoupon> <documentDetails> <number>9991234567890</number> <type>ET</type> </documentDetails> </paperticketDetailsLastCoupon> </documentInfoGroup> </exchangeInformationGroup> <pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>SEL</pricingOptionKey> </pricingOptionKey> <paxSegTstReference> <referenceDetails> <type>PA</type> <value>1</value> </referenceDetails> <referenceDetails> <type>E</type> <value>1</value> </referenceDetails> </paxSegTstReference> </pricingOptionGroup> <pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>BST</pricingOptionKey> </pricingOptionKey> </pricingOptionGroup> </Ticket\_ReissuePricingWithoutPNR>

## 5.8.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_ReissuePricingWithoutPNRReply xmlns="http://xml.amadeus.com/TRPNRR\_15\_1\_1A"> <ticketGroup> <pnrLocatorData> <reservationInformation> <controlNumber>0</controlNumber> </reservationInformation> </pnrLocatorData> <fareList> <pricingInformation> <tstInformation> <tstIndicator>M</tstIndicator> </tstInformation> <fcmi>4</fcmi> </pricingInformation> <fareReference> <referenceType>TST</referenceType> <uniqueReference>1</uniqueReference> </fareReference> <lastTktDate> <businessSemantic>LT</businessSemantic> <dateTime> <year>2014</year> <month>10</month> <day>13</day> </dateTime> </lastTktDate> <validatingCarrier> <carrierInformation> <carrierCode>6X</carrierCode> </carrierInformation> </validatingCarrier> <paxSegReference> <refDetails> <refQualifier>PA</refQualifier> <refNumber>1</refNumber> </refDetails> </paxSegReference> <fareDataInformation> <fareDataMainInformation> <fareDataQualifier>R</fareDataQualifier> </fareDataMainInformation> <fareDataSupInformation> <fareDataQualifier>712</fareDataQualifier> <fareAmount>50.00</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataSupInformation> <fareDataSupInformation> <fareDataQualifier>B</fareDataQualifier> <fareAmount>444.00</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataSupInformation> </fareDataInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>FR</isoCountry> </taxType> <taxNature>SE</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>8.72</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>FR</isoCountry> </taxType> <taxNature>TI</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>23.00</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>IZ</isoCountry> </taxType> <taxNature>EB</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>2.26</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>QW</isoCountry> </taxType> <taxNature>LO</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>19.66</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>UI</isoCountry> </taxType> <taxNature>VZ</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>5.37</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>X</taxIdentifier> </taxIdentification> <taxType> <isoCountry>ZV</isoCountry> </taxType> <taxNature>GO</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>50.00</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <passengerInformation> <penDisInformation></penDisInformation> <travellerInfo> <travellerNameInfo> <type>ADT</type> </travellerNameInfo> <otherPaxNamesDetails> <surname>FRANCOIS</surname> <givenName>PIERRE</givenName> </otherPaxNamesDetails> </travellerInfo> <passengerReference> <refDetails> <refQualifier>PA</refQualifier> <refNumber>1</refNumber> </refDetails> </passengerReference> </passengerInformation> <originDestination> <cityCode>NCE</cityCode> <cityCode>NCE</cityCode> </originDestination> <segmentInformation> <connexInformation> <connecDetails> <connexType>O</connexType> </connecDetails> </connexInformation> <segDetails> <flightDate> <departureDate>231014</departureDate> <departureTime>600</departureTime> <arrivalDate>231014</arrivalDate> <arrivalTime>725</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>NCE</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>ORY</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>6249</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> </segDetails> <fareQualifier> <fareBasisDetails> <primaryCode>YWK</primaryCode> <fareBasisCode>FR</fareBasisCode> <discTktDesignator>ADT</discTktDesignator> </fareBasisDetails> </fareQualifier> <validityInformation> <businessSemantic>A</businessSemantic> <dateTime> <year>2014</year> <month>10</month> <day>23</day> </dateTime> </validityInformation> <validityInformation> <businessSemantic>B</businessSemantic> <dateTime> <year>2014</year> <month>10</month> <day>23</day> </dateTime> </validityInformation> <bagAllowanceInformation> <bagAllowanceDetails> <baggageQuantity>1</baggageQuantity> <baggageType>N</baggageType> </bagAllowanceDetails> </bagAllowanceInformation> <segmentReference> <refDetails> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </refDetails> </segmentReference> <sequenceInformation> <sequenceSection> <sequenceNumber>1</sequenceNumber> </sequenceSection> </sequenceInformation> </segmentInformation> <segmentInformation> <connexInformation> <connecDetails> <connexType>O</connexType> </connecDetails> </connexInformation> <segDetails> <flightDate> <departureDate>281014</departureDate> <departureTime>635</departureTime> <arrivalDate>281014</arrivalDate> <arrivalTime>755</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>ORY</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>NCE</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>6240</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> </segDetails> <fareQualifier> <fareBasisDetails> <primaryCode>YWK</primaryCode> <fareBasisCode>FR</fareBasisCode> <discTktDesignator>ADT</discTktDesignator> </fareBasisDetails> </fareQualifier> <validityInformation> <businessSemantic>A</businessSemantic> <dateTime> <year>2014</year> <month>10</month> <day>28</day> </dateTime> </validityInformation> <validityInformation> <businessSemantic>B</businessSemantic> <dateTime> <year>2014</year> <month>10</month> <day>28</day> </dateTime> </validityInformation> <bagAllowanceInformation> <bagAllowanceDetails> <baggageQuantity>1</baggageQuantity> <baggageType>N</baggageType> </bagAllowanceDetails> </bagAllowanceInformation> <segmentReference> <refDetails> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </refDetails> </segmentReference> <sequenceInformation> <sequenceSection> <sequenceNumber>2</sequenceNumber> </sequenceSection> </sequenceInformation> </segmentInformation> <otherPricingInfo> <attributeDetails> <attributeType>END</attributeType> <attributeDescription>EUR444.00 NONREF - EVASION WEEKCHGS RESTRICTED/NO REFUND</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>FCA</attributeType> <attributeDescription>NCE 6X PAR222.006X NCE222.00EUR444.00END</attributeDescription> </attributeDetails> </otherPricingInfo> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText>NON-REFUNDABLE</errorFreeText> </warningText> </warningInformation> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText> - SEE ADV PURCHASE</errorFreeText> </warningText> </warningInformation> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText>MANUAL MANIPULATION OF TAXES 4</errorFreeText> </warningText> </warningInformation> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText>BG CXR</errorFreeText> </warningText> </warningInformation> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText>PRICED WITH VALIDATING CARRIER 6X - REPRICE IF DIFFERENT VC</errorFreeText> </warningText> </warningInformation> <automaticReissueInfo> <ticketInfo> <documentDetails> <number>9991234567890</number> <type>ET</type> </documentDetails> </ticketInfo> <couponInfo> <couponDetails> <cpnNumber>1</cpnNumber> </couponDetails> </couponInfo> <baseFareInfo> <monetaryDetails> <typeQualifier>IBA</typeQualifier> <amount>444.00</amount> <currency>EUR</currency> </monetaryDetails> </baseFareInfo> <firstDpiGroup> <reIssuePenalty> <penDisData> <penaltyAmount>70</penaltyAmount> <penaltyCurrency>EUR</penaltyCurrency> </penDisData> </reIssuePenalty> <reissueInfo> <monetaryDetails> <typeQualifier>RES</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>RTO</typeQualifier> <amount>553.01</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TSC</typeQualifier> <amount>50.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TST</typeQualifier> <amount>50.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>RTA</typeQualifier> <amount>109.01</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TAC</typeQualifier> <amount>120.00</amount> <currency>EUR</currency> </otherMonetaryDetails> </reissueInfo> <oldTaxInfo> <monetaryDetails> <typeQualifier>ITA</typeQualifier> <amount>59.01</amount> <currency>EUR</currency> </monetaryDetails> </oldTaxInfo> <reissueBalanceInfo> <monetaryDetails> <typeQualifier>BEQ</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>BGT</typeQualifier> <amount>120.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BTA</typeQualifier> <amount>50.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BTO</typeQualifier> <amount>50.00</amount> <currency>EUR</currency> </otherMonetaryDetails> </reissueBalanceInfo> </firstDpiGroup> <secondDpiGroup> <penalty> <penDisData> <penaltyAmount>70</penaltyAmount> <penaltyCurrency>EUR</penaltyCurrency> </penDisData> </penalty> <residualValueInfo> <monetaryDetails> <typeQualifier>RES</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>RTA</typeQualifier> <amount>109.01</amount> <currency>EUR</currency> </otherMonetaryDetails> </residualValueInfo> <oldTaxInfo> <monetaryDetails> <typeQualifier>ITA</typeQualifier> <amount>59.01</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>ITO</typeQualifier> <amount>503.01</amount> <currency>EUR</currency> </otherMonetaryDetails> </oldTaxInfo> <issueBalanceInfo> <monetaryDetails> <typeQualifier>BTA</typeQualifier> <amount>50.00</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>BEQ</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BGT</typeQualifier> <amount>120.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BTO</typeQualifier> <amount>50.00</amount> <currency>EUR</currency> </otherMonetaryDetails> </issueBalanceInfo> </secondDpiGroup> <firstPricingInformationKey> <dataLength>28</dataLength> <dataType>B</dataType> <binaryData>STIwMTUwMzIwLTQ3MzQ2MzMwNDY0MDM1NjAwMA==</binaryData> </firstPricingInformationKey> <formOfPaymentInformation> <formOfPayment> <type>CA</type> <indicator>2</indicator> </formOfPayment> </formOfPaymentInformation> <reissueAttributes> <attributeDetails> <attributeType>NET</attributeType> <attributeDescription>1</attributeDescription> </attributeDetails> </reissueAttributes> <foLine> <layout> <issue> <cityCode>YYZ</cityCode> <dateOfIssue>200415</dateOfIssue> <iataNumber>69090243</iataNumber> </issue> </layout> <orgAnd4Exchange> <tkt> <documentDetails> <number>9991234567890</number> <dataIndicator>ORG</dataIndicator> </documentDetails> </tkt> </orgAnd4Exchange> <orgAnd4Exchange> <tkt> <documentDetails> <number>9991234567890</number> <dataIndicator>3</dataIndicator> </documentDetails> </tkt> <rng> <rangeQualifier>F</rangeQualifier> <rangeDetails> <min>1</min> <max>1</max> </rangeDetails> </rng> </orgAnd4Exchange> </foLine> </automaticReissueInfo> <fareComponentDetailsGroup> <fareComponentID> <itemNumberDetails> <number>1</number> </itemNumberDetails> </fareComponentID> <couponDetailsGroup> <productId> <referenceDetails> <type>ST</type> <value>1</value> </referenceDetails> </productId> </couponDetailsGroup> </fareComponentDetailsGroup> <fareComponentDetailsGroup> <fareComponentID> <itemNumberDetails> <number>2</number> </itemNumberDetails> </fareComponentID> <couponDetailsGroup> <productId> <referenceDetails> <type>ST</type> <value>2</value> </referenceDetails> </productId> </couponDetailsGroup> </fareComponentDetailsGroup> <markerFares></markerFares> </fareList> </ticketGroup> <docSeparator></docSeparator> </Ticket\_ReissuePricingWithoutPNRReply>

## 5.8.3 Possible Errors

See "Error Messages" section.

* * *

## 5.9 Operation: 1 passenger reprice with bound information

This example shows the reprice of 1 ticket with the definition of bound itinerary in input.

## 5.9.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_ReissuePricingWithoutPNR xmlns="http://xml.amadeus.com/TRPNRQ\_15\_1\_1A"> <passengersGroup> <segmentRepetitionControl> <segmentControlDetails> <quantity>1</quantity> <numberOfUnits>1</numberOfUnits> </segmentControlDetails> </segmentRepetitionControl> <travellersID> <travellerDetails> <measurementValue>1</measurementValue> <surname>FRANCOIS</surname> <firstName>PIERRE</firstName> </travellerDetails> </travellersID> <discountPtc> <valueQualifier>ADT</valueQualifier> </discountPtc> </passengersGroup> <segmentGroup> <boardoff> <origin>BWI</origin> <destination>DEN</destination> </boardoff> <segmentInformation> <flightDate> <departureDate>090915</departureDate> <departureTime>835</departureTime> <arrivalDate>090915</arrivalDate> <arrivalTime>1040</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>BWI</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>DEN</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>366</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> <flightTypeDetails> <flightIndicator>1</flightIndicator> </flightTypeDetails> <itemNumber>5</itemNumber> </segmentInformation> <segmentInformation> <flightDate> <departureDate>140915</departureDate> <departureTime>615</departureTime> <arrivalDate>140915</arrivalDate> <arrivalTime>1140</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>DEN</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>BWI</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>852</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> <flightTypeDetails> <flightIndicator>1</flightIndicator> </flightTypeDetails> <itemNumber>2</itemNumber> </segmentInformation> </segmentGroup> <segmentGroup> <boardoff> <origin>BWI</origin> <destination>DEN</destination> </boardoff> <segmentInformation> <flightDate> <departureDate>091015</departureDate> <departureTime>835</departureTime> <arrivalDate>090915</arrivalDate> <arrivalTime>1040</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>BWI</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>DEN</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>366</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> <flightTypeDetails> <flightIndicator>1</flightIndicator> </flightTypeDetails> <itemNumber>6</itemNumber> </segmentInformation> <segmentInformation> <flightDate> <departureDate>141015</departureDate> <departureTime>615</departureTime> <arrivalDate>140915</arrivalDate> <arrivalTime>1140</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>DEN</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>BWI</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>852</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> <flightTypeDetails> <flightIndicator>1</flightIndicator> </flightTypeDetails> <itemNumber>4</itemNumber> </segmentInformation> </segmentGroup> <exchangeInformationGroup> <transactionIdentifier> <itemNumberDetails> <number>1</number> </itemNumberDetails> </transactionIdentifier> <documentInfoGroup> <paperticketDetailsLastCoupon> <documentDetails> <number>9991234567890</number> <type>ET</type> </documentDetails> </paperticketDetailsLastCoupon> </documentInfoGroup> </exchangeInformationGroup> <pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>SEL</pricingOptionKey> </pricingOptionKey> <paxSegTstReference> <referenceDetails> <type>PA</type> <value>1</value> </referenceDetails> <referenceDetails> <type>E</type> <value>1</value> </referenceDetails> </paxSegTstReference> </pricingOptionGroup> <pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>BND</pricingOptionKey> </pricingOptionKey> <optionDetail> <criteriaDetails> <attributeType>1</attributeType> </criteriaDetails> </optionDetail> <paxSegTstReference> <referenceDetails> <type>S</type> <value>5</value> </referenceDetails> <referenceDetails> <type>S</type> <value>2</value> </referenceDetails> </paxSegTstReference> </pricingOptionGroup> <pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>BND</pricingOptionKey> </pricingOptionKey> <optionDetail> <criteriaDetails> <attributeType>2</attributeType> </criteriaDetails> </optionDetail> <paxSegTstReference> <referenceDetails> <type>S</type> <value>6</value> </referenceDetails> <referenceDetails> <type>S</type> <value>4</value> </referenceDetails> </paxSegTstReference> </pricingOptionGroup> </Ticket\_ReissuePricingWithoutPNR>

## 5.9.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_ReissuePricingWithoutPNRReply xmlns="http://xml.amadeus.com/TRPNRR\_15\_1\_1A"> <ticketGroup> <pnrLocatorData> <reservationInformation> <controlNumber>0</controlNumber> </reservationInformation> </pnrLocatorData> <fareList> <pricingInformation> <tstInformation> <tstIndicator>M</tstIndicator> </tstInformation> <fcmi>4</fcmi> </pricingInformation> <fareReference> <referenceType>TST</referenceType> <uniqueReference>1</uniqueReference> </fareReference> <lastTktDate> <businessSemantic>LT</businessSemantic> <dateTime> <year>2014</year> <month>10</month> <day>13</day> </dateTime> </lastTktDate> <validatingCarrier> <carrierInformation> <carrierCode>6X</carrierCode> </carrierInformation> </validatingCarrier> <paxSegReference> <refDetails> <refQualifier>PA</refQualifier> <refNumber>1</refNumber> </refDetails> </paxSegReference> <fareDataInformation> <fareDataMainInformation> <fareDataQualifier>R</fareDataQualifier> </fareDataMainInformation> <fareDataSupInformation> <fareDataQualifier>712</fareDataQualifier> <fareAmount>50.00</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataSupInformation> <fareDataSupInformation> <fareDataQualifier>B</fareDataQualifier> <fareAmount>444.00</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataSupInformation> </fareDataInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>FR</isoCountry> </taxType> <taxNature>SE</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>8.72</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>FR</isoCountry> </taxType> <taxNature>TI</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>23.00</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>IZ</isoCountry> </taxType> <taxNature>EB</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>2.26</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>QW</isoCountry> </taxType> <taxNature>LO</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>19.66</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>UI</isoCountry> </taxType> <taxNature>VZ</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>5.37</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>X</taxIdentifier> </taxIdentification> <taxType> <isoCountry>ZV</isoCountry> </taxType> <taxNature>GO</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>50.00</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <passengerInformation> <penDisInformation></penDisInformation> <travellerInfo> <travellerNameInfo> <type>ADT</type> </travellerNameInfo> <otherPaxNamesDetails> <surname>FRANCOIS</surname> <givenName>PIERRE</givenName> </otherPaxNamesDetails> </travellerInfo> <passengerReference> <refDetails> <refQualifier>PA</refQualifier> <refNumber>1</refNumber> </refDetails> </passengerReference> </passengerInformation> <originDestination> <cityCode>NCE</cityCode> <cityCode>NCE</cityCode> </originDestination> <segmentInformation> <connexInformation> <connecDetails> <connexType>O</connexType> </connecDetails> </connexInformation> <segDetails> <flightDate> <departureDate>231014</departureDate> <departureTime>600</departureTime> <arrivalDate>231014</arrivalDate> <arrivalTime>725</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>NCE</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>ORY</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>6249</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> </segDetails> <fareQualifier> <fareBasisDetails> <primaryCode>YWK</primaryCode> <fareBasisCode>FR</fareBasisCode> <discTktDesignator>ADT</discTktDesignator> </fareBasisDetails> </fareQualifier> <validityInformation> <businessSemantic>A</businessSemantic> <dateTime> <year>2014</year> <month>10</month> <day>23</day> </dateTime> </validityInformation> <validityInformation> <businessSemantic>B</businessSemantic> <dateTime> <year>2014</year> <month>10</month> <day>23</day> </dateTime> </validityInformation> <bagAllowanceInformation> <bagAllowanceDetails> <baggageQuantity>1</baggageQuantity> <baggageType>N</baggageType> </bagAllowanceDetails> </bagAllowanceInformation> <segmentReference> <refDetails> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </refDetails> </segmentReference> <sequenceInformation> <sequenceSection> <sequenceNumber>1</sequenceNumber> </sequenceSection> </sequenceInformation> </segmentInformation> <segmentInformation> <connexInformation> <connecDetails> <connexType>O</connexType> </connecDetails> </connexInformation> <segDetails> <flightDate> <departureDate>281014</departureDate> <departureTime>635</departureTime> <arrivalDate>281014</arrivalDate> <arrivalTime>755</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>ORY</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>NCE</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>6240</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> </segDetails> <fareQualifier> <fareBasisDetails> <primaryCode>YWK</primaryCode> <fareBasisCode>FR</fareBasisCode> <discTktDesignator>ADT</discTktDesignator> </fareBasisDetails> </fareQualifier> <validityInformation> <businessSemantic>A</businessSemantic> <dateTime> <year>2014</year> <month>10</month> <day>28</day> </dateTime> </validityInformation> <validityInformation> <businessSemantic>B</businessSemantic> <dateTime> <year>2014</year> <month>10</month> <day>28</day> </dateTime> </validityInformation> <bagAllowanceInformation> <bagAllowanceDetails> <baggageQuantity>1</baggageQuantity> <baggageType>N</baggageType> </bagAllowanceDetails> </bagAllowanceInformation> <segmentReference> <refDetails> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </refDetails> </segmentReference> <sequenceInformation> <sequenceSection> <sequenceNumber>2</sequenceNumber> </sequenceSection> </sequenceInformation> </segmentInformation> <otherPricingInfo> <attributeDetails> <attributeType>END</attributeType> <attributeDescription>EUR444.00 NONREF - EVASION WEEKCHGS RESTRICTED/NO REFUND</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>FCA</attributeType> <attributeDescription>NCE 6X PAR222.006X NCE222.00EUR444.00END</attributeDescription> </attributeDetails> </otherPricingInfo> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText>NON-REFUNDABLE</errorFreeText> </warningText> </warningInformation> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText> - SEE ADV PURCHASE</errorFreeText> </warningText> </warningInformation> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText>MANUAL MANIPULATION OF TAXES 4</errorFreeText> </warningText> </warningInformation> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText>BG CXR</errorFreeText> </warningText> </warningInformation> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText>PRICED WITH VALIDATING CARRIER 6X - REPRICE IF DIFFERENT VC</errorFreeText> </warningText> </warningInformation> <automaticReissueInfo> <ticketInfo> <documentDetails> <number>9991234567890</number> <type>ET</type> </documentDetails> </ticketInfo> <couponInfo> <couponDetails> <cpnNumber>1</cpnNumber> </couponDetails> </couponInfo> <baseFareInfo> <monetaryDetails> <typeQualifier>IBA</typeQualifier> <amount>444.00</amount> <currency>EUR</currency> </monetaryDetails> </baseFareInfo> <firstDpiGroup> <reIssuePenalty> <penDisData> <penaltyAmount>70</penaltyAmount> <penaltyCurrency>EUR</penaltyCurrency> </penDisData> </reIssuePenalty> <reissueInfo> <monetaryDetails> <typeQualifier>RES</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>RTO</typeQualifier> <amount>553.01</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TSC</typeQualifier> <amount>50.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TST</typeQualifier> <amount>50.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>RTA</typeQualifier> <amount>109.01</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TAC</typeQualifier> <amount>120.00</amount> <currency>EUR</currency> </otherMonetaryDetails> </reissueInfo> <oldTaxInfo> <monetaryDetails> <typeQualifier>ITA</typeQualifier> <amount>59.01</amount> <currency>EUR</currency> </monetaryDetails> </oldTaxInfo> <reissueBalanceInfo> <monetaryDetails> <typeQualifier>BEQ</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>BGT</typeQualifier> <amount>120.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BTA</typeQualifier> <amount>50.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BTO</typeQualifier> <amount>50.00</amount> <currency>EUR</currency> </otherMonetaryDetails> </reissueBalanceInfo> </firstDpiGroup> <secondDpiGroup> <penalty> <penDisData> <penaltyAmount>70</penaltyAmount> <penaltyCurrency>EUR</penaltyCurrency> </penDisData> </penalty> <residualValueInfo> <monetaryDetails> <typeQualifier>RES</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>RTA</typeQualifier> <amount>109.01</amount> <currency>EUR</currency> </otherMonetaryDetails> </residualValueInfo> <oldTaxInfo> <monetaryDetails> <typeQualifier>ITA</typeQualifier> <amount>59.01</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>ITO</typeQualifier> <amount>503.01</amount> <currency>EUR</currency> </otherMonetaryDetails> </oldTaxInfo> <issueBalanceInfo> <monetaryDetails> <typeQualifier>BTA</typeQualifier> <amount>50.00</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>BEQ</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BGT</typeQualifier> <amount>120.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BTO</typeQualifier> <amount>50.00</amount> <currency>EUR</currency> </otherMonetaryDetails> </issueBalanceInfo> </secondDpiGroup> <firstPricingInformationKey> <dataLength>28</dataLength> <dataType>B</dataType> <binaryData>STIwMTUwMzIwLTQ3MzQ2MzMwNDY0MDM1NjAwMA==</binaryData> </firstPricingInformationKey> <formOfPaymentInformation> <formOfPayment> <type>CA</type> <indicator>2</indicator> </formOfPayment> </formOfPaymentInformation> <reissueAttributes> <attributeDetails> <attributeType>NET</attributeType> <attributeDescription>1</attributeDescription> </attributeDetails> </reissueAttributes> <foLine> <layout> <issue> <cityCode>YYZ</cityCode> <dateOfIssue>200415</dateOfIssue> <iataNumber>69090243</iataNumber> </issue> </layout> <orgAnd4Exchange> <tkt> <documentDetails> <number>9991234567890</number> <dataIndicator>ORG</dataIndicator> </documentDetails> </tkt> </orgAnd4Exchange> <orgAnd4Exchange> <tkt> <documentDetails> <number>9991234567890</number> <dataIndicator>3</dataIndicator> </documentDetails> </tkt> <rng> <rangeQualifier>F</rangeQualifier> <rangeDetails> <min>1</min> <max>1</max> </rangeDetails> </rng> </orgAnd4Exchange> </foLine> </automaticReissueInfo> <fareComponentDetailsGroup> <fareComponentID> <itemNumberDetails> <number>1</number> </itemNumberDetails> </fareComponentID> <couponDetailsGroup> <productId> <referenceDetails> <type>ST</type> <value>1</value> </referenceDetails> </productId> </couponDetailsGroup> </fareComponentDetailsGroup> <fareComponentDetailsGroup> <fareComponentID> <itemNumberDetails> <number>2</number> </itemNumberDetails> </fareComponentID> <couponDetailsGroup> <productId> <referenceDetails> <type>ST</type> <value>2</value> </referenceDetails> </productId> </couponDetailsGroup> </fareComponentDetailsGroup> <fareComponentDetailsGroup> <fareComponentID> <itemNumberDetails> <number>1</number> <type>BND</type> </itemNumberDetails> </fareComponentID> <monetaryInformation> <monetaryDetails> <typeQualifier>TNF</typeQualifier> <amount>884.20</amount> <currency>USD</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>TNT</typeQualifier> <amount>91.64</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TOF</typeQualifier> <amount>868.20</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TOT</typeQualifier> <amount>90.52</amount> <currency>USD</currency> </otherMonetaryDetails> </monetaryInformation> <couponDetailsGroup> <productId> <referenceDetails> <type>ST</type> <value>5</value> </referenceDetails> </productId> </couponDetailsGroup> <couponDetailsGroup> <productId> <referenceDetails> <type>ST</type> <value>2</value> </referenceDetails> </productId> </couponDetailsGroup> </fareComponentDetailsGroup> <fareComponentDetailsGroup> <fareComponentID> <itemNumberDetails> <number>2</number> <type>BND</type> </itemNumberDetails> </fareComponentID> <monetaryInformation> <monetaryDetails> <typeQualifier>TNF</typeQualifier> <amount>969.00</amount> <currency>USD</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>TNT</typeQualifier> <amount>83.42</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TOF</typeQualifier> <amount>947.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TOT</typeQualifier> <amount>81.89</amount> <currency>USD</currency> </otherMonetaryDetails> </monetaryInformation> <couponDetailsGroup> <productId> <referenceDetails> <type>ST</type> <value>6</value> </referenceDetails> </productId> </couponDetailsGroup> <couponDetailsGroup> <productId> <referenceDetails> <type>ST</type> <value>4</value> </referenceDetails> </productId> </couponDetailsGroup> </fareComponentDetailsGroup> <markerFares></markerFares> </fareList> </ticketGroup> <docSeparator></docSeparator> </Ticket\_ReissuePricingWithoutPNRReply>

## 5.9.3 Possible Errors

See "Error Messages" section.

* * *

## 5.10 Operation: 4 passenger: 2 adult, 1 child and 1 infant reprice

In this example the tickets from 4 passengers are repriced without any pricing option. The reprcing of the two segments leads to a revalidation proposal for all 4 passengers: infant, children and 2 adults.

## 5.10.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_ReissuePricingWithoutPNR xmlns="http://xml.amadeus.com/TRPNRQ\_15\_1\_1A"> <passengersGroup> <segmentRepetitionControl> <segmentControlDetails> <quantity>1</quantity> <numberOfUnits>2</numberOfUnits> </segmentControlDetails> </segmentRepetitionControl> <travellersID> <travellerDetails> <measurementValue>1</measurementValue> <surname>FRANCOIS</surname> <firstName>PIERRE</firstName> </travellerDetails> </travellersID> <travellersID> <travellerDetails> <measurementValue>2</measurementValue> <surname>FRANCOIS</surname> <firstName>MARIE</firstName> </travellerDetails> </travellersID> <discountPtc> <valueQualifier>ADT</valueQualifier> </discountPtc> </passengersGroup> <passengersGroup> <segmentRepetitionControl> <segmentControlDetails> <quantity>2</quantity> <numberOfUnits>1</numberOfUnits> </segmentControlDetails> </segmentRepetitionControl> <travellersID> <travellerDetails> <measurementValue>3</measurementValue> <surname>FRANCOIS</surname> <firstName>LOUIS</firstName> </travellerDetails> </travellersID> <discountPtc> <valueQualifier>CHD</valueQualifier> </discountPtc> </passengersGroup> <passengersGroup> <segmentRepetitionControl> <segmentControlDetails> <quantity>3</quantity> <numberOfUnits>1</numberOfUnits> </segmentControlDetails> </segmentRepetitionControl> <travellersID> <travellerDetails> <measurementValue>1</measurementValue> <surname>FRANCOIS</surname> <firstName>PIERRE JR</firstName> </travellerDetails> </travellersID> <discountPtc> <valueQualifier>INF</valueQualifier> </discountPtc> </passengersGroup> <segmentGroup> <boardoff> <origin>BWI</origin> <destination>DEN</destination> </boardoff> <segmentInformation> <flightDate> <departureDate>090915</departureDate> <departureTime>0835</departureTime> <arrivalDate>090915</arrivalDate> <arrivalTime>1040</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>BWI</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>DEN</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>WN</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>366</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> <flightTypeDetails> <flightIndicator>1</flightIndicator> </flightTypeDetails> <itemNumber>1</itemNumber> </segmentInformation> </segmentGroup> <segmentGroup> <boardoff> <origin>DEN</origin> <destination>BWI</destination> </boardoff> <segmentInformation> <flightDate> <departureDate>140915</departureDate> <departureTime>0615</departureTime> <arrivalDate>140915</arrivalDate> <arrivalTime>1140</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>DEN</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>BWI</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>WN</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>852</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> <flightTypeDetails> <flightIndicator>1</flightIndicator> </flightTypeDetails> <itemNumber>2</itemNumber> </segmentInformation> </segmentGroup> <exchangeInformationGroup> <transactionIdentifier> <itemNumberDetails> <number>1</number> </itemNumberDetails> </transactionIdentifier> <documentInfoGroup> <paperticketDetailsLastCoupon> <documentDetails> <number>9991234567890</number> <type>ET</type> </documentDetails> </paperticketDetailsLastCoupon> </documentInfoGroup> </exchangeInformationGroup> <exchangeInformationGroup> <transactionIdentifier> <itemNumberDetails> <number>2</number> </itemNumberDetails> </transactionIdentifier> <documentInfoGroup> <paperticketDetailsLastCoupon> <documentDetails> <number>9991234567891</number> <type>ET</type> </documentDetails> </paperticketDetailsLastCoupon> </documentInfoGroup> </exchangeInformationGroup> <exchangeInformationGroup> <transactionIdentifier> <itemNumberDetails> <number>3</number> </itemNumberDetails> </transactionIdentifier> <documentInfoGroup> <paperticketDetailsLastCoupon> <documentDetails> <number>9991234567892</number> <type>ET</type> </documentDetails> </paperticketDetailsLastCoupon> </documentInfoGroup> </exchangeInformationGroup> <exchangeInformationGroup> <transactionIdentifier> <itemNumberDetails> <number>4</number> </itemNumberDetails> </transactionIdentifier> <documentInfoGroup> <paperticketDetailsLastCoupon> <documentDetails> <number>9991234567893</number> <type>ET</type> </documentDetails> </paperticketDetailsLastCoupon> </documentInfoGroup> </exchangeInformationGroup> <pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>SEL</pricingOptionKey> </pricingOptionKey> <paxSegTstReference> <referenceDetails> <type>S</type> <value>1</value> </referenceDetails> <referenceDetails> <type>S</type> <value>2</value> </referenceDetails> </paxSegTstReference> </pricingOptionGroup> <pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>SEL</pricingOptionKey> </pricingOptionKey> <paxSegTstReference> <referenceDetails> <type>PA</type> <value>1</value> </referenceDetails> <referenceDetails> <type>E</type> <value>1</value> </referenceDetails> </paxSegTstReference> </pricingOptionGroup> <pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>SEL</pricingOptionKey> </pricingOptionKey> <paxSegTstReference> <referenceDetails> <type>PA</type> <value>2</value> </referenceDetails> <referenceDetails> <type>E</type> <value>2</value> </referenceDetails> </paxSegTstReference> </pricingOptionGroup> <pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>SEL</pricingOptionKey> </pricingOptionKey> <paxSegTstReference> <referenceDetails> <type>PA</type> <value>3</value> </referenceDetails> <referenceDetails> <type>E</type> <value>3</value> </referenceDetails> </paxSegTstReference> </pricingOptionGroup> <pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>SEL</pricingOptionKey> </pricingOptionKey> <paxSegTstReference> <referenceDetails> <type>PI</type> <value>1</value> </referenceDetails> <referenceDetails> <type>E</type> <value>4</value> </referenceDetails> </paxSegTstReference> </pricingOptionGroup> </Ticket\_ReissuePricingWithoutPNR>

## 5.10.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_ReissuePricingWithoutPNRReply xmlns="http://xml.amadeus.com/TRPNRR\_15\_1\_1A"> <ticketGroup> <pnrLocatorData> <reservationInformation> <controlNumber>0</controlNumber> </reservationInformation> </pnrLocatorData> <fareList> <pricingInformation> <tstInformation> <tstIndicator>I</tstIndicator> </tstInformation> <fcmi>0</fcmi> </pricingInformation> <fareReference> <referenceType>TST</referenceType> <uniqueReference>1</uniqueReference> </fareReference> <lastTktDate> <businessSemantic>LT</businessSemantic> <dateTime> <year>2015</year> <month>8</month> <day>22</day> </dateTime> </lastTktDate> <validatingCarrier> <carrierInformation> <carrierCode>6X</carrierCode> </carrierInformation> </validatingCarrier> <paxSegReference> <refDetails> <refQualifier>PA</refQualifier> <refNumber>1</refNumber> </refDetails> </paxSegReference> <fareDataInformation> <fareDataMainInformation> <fareDataQualifier>R</fareDataQualifier> </fareDataMainInformation> <fareDataSupInformation> <fareDataQualifier>712</fareDataQualifier> <fareAmount>0.00</fareAmount> <fareCurrency>USD</fareCurrency> </fareDataSupInformation> <fareDataSupInformation> <fareDataQualifier>B</fareDataQualifier> <fareAmount>915.34</fareAmount> <fareCurrency>USD</fareCurrency> </fareDataSupInformation> <fareDataSupInformation> <fareDataQualifier>MAC</fareDataQualifier> <fareAmount>9153</fareAmount> </fareDataSupInformation> </fareDataInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>AY</isoCountry> </taxType> <taxNature>SE</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>11.20</fareAmount> <fareCurrency>USD</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>US</isoCountry> </taxType> <taxNature>LO</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>68.66</fareAmount> <fareCurrency>USD</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>XF</isoCountry> </taxType> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>9.00</fareAmount> <fareCurrency>USD</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>ZP</isoCountry> </taxType> <taxNature>VO</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>8.00</fareAmount> <fareCurrency>USD</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <passengerInformation> <penDisInformation></penDisInformation> <travellerInfo> <travellerNameInfo> <type>ADT</type> </travellerNameInfo> <otherPaxNamesDetails> <surname>FRANCOIS</surname> <givenName>PIERRE</givenName> </otherPaxNamesDetails> </travellerInfo> <passengerReference> <refDetails> <refQualifier>PA</refQualifier> <refNumber>1</refNumber> </refDetails> </passengerReference> </passengerInformation> <originDestination> <cityCode>BWI</cityCode> <cityCode>BWI</cityCode> </originDestination> <segmentInformation> <connexInformation> <connecDetails> <connexType>O</connexType> </connecDetails> </connexInformation> <segDetails> <flightDate> <departureDate>090915</departureDate> <departureTime>835</departureTime> <arrivalDate>090915</arrivalDate> <arrivalTime>1040</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>BWI</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>DEN</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>366</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> </segDetails> <fareQualifier> <fareBasisDetails> <primaryCode>YL</primaryCode> <discTktDesignator>ADT</discTktDesignator> </fareBasisDetails> </fareQualifier> <validityInformation> <businessSemantic>A</businessSemantic> <dateTime> <year>2016</year> <month>9</month> <day>9</day> </dateTime> </validityInformation> <bagAllowanceInformation> <bagAllowanceDetails> <baggageQuantity>2</baggageQuantity> <baggageType>N</baggageType> </bagAllowanceDetails> </bagAllowanceInformation> <segmentReference> <refDetails> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </refDetails> </segmentReference> <sequenceInformation> <sequenceSection> <sequenceNumber>1</sequenceNumber> </sequenceSection> </sequenceInformation> </segmentInformation> <segmentInformation> <connexInformation> <connecDetails> <connexType>O</connexType> </connecDetails> </connexInformation> <segDetails> <flightDate> <departureDate>140915</departureDate> <departureTime>615</departureTime> <arrivalDate>140915</arrivalDate> <arrivalTime>1140</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>DEN</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>BWI</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>852</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> </segDetails> <fareQualifier> <fareBasisDetails> <primaryCode>YL</primaryCode> <discTktDesignator>ADT</discTktDesignator> </fareBasisDetails> </fareQualifier> <validityInformation> <businessSemantic>A</businessSemantic> <dateTime> <year>2016</year> <month>9</month> <day>9</day> </dateTime> </validityInformation> <bagAllowanceInformation> <bagAllowanceDetails> <baggageQuantity>2</baggageQuantity> <baggageType>N</baggageType> </bagAllowanceDetails> </bagAllowanceInformation> <segmentReference> <refDetails> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </refDetails> </segmentReference> <sequenceInformation> <sequenceSection> <sequenceNumber>2</sequenceNumber> </sequenceSection> </sequenceInformation> </segmentInformation> <otherPricingInfo> <attributeDetails> <attributeType>END</attributeType> <attributeDescription>NONTRANSFERABLE -BG</attributeDescription> </attributeDetails> </otherPricingInfo> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText> - SEE ADV PURCHASE</errorFreeText> </warningText> </warningInformation> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText>BG CXR</errorFreeText> </warningText> </warningInformation> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText>PRICED WITH VALIDATING CARRIER 6X - REPRICE IF DIFFERENT VC</errorFreeText> </warningText> </warningInformation> <automaticReissueInfo> <ticketInfo> <documentDetails> <number>9991234567890</number> <type>ET</type> </documentDetails> </ticketInfo> <couponInfo> <couponDetails> <cpnNumber>1</cpnNumber> </couponDetails> </couponInfo> <baseFareInfo> <monetaryDetails> <typeQualifier>IBA</typeQualifier> <amount>915.34</amount> <currency>USD</currency> </monetaryDetails> </baseFareInfo> <firstDpiGroup> <reIssuePenalty> <penDisData> <penaltyAmount>0</penaltyAmount> <penaltyCurrency>USD</penaltyCurrency> </penDisData> </reIssuePenalty> <reissueInfo> <monetaryDetails> <typeQualifier>RES</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>RTO</typeQualifier> <amount>1012.20</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TSC</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TST</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>REF</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>REU</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>RFR</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>RTA</typeQualifier> <amount>96.86</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>RUR</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TAC</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> </reissueInfo> <oldTaxInfo> <monetaryDetails> <typeQualifier>ITA</typeQualifier> <amount>96.86</amount> <currency>USD</currency> </monetaryDetails> </oldTaxInfo> <reissueBalanceInfo> <monetaryDetails> <typeQualifier>BEQ</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>BGT</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BTA</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BTO</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> </reissueBalanceInfo> </firstDpiGroup> <secondDpiGroup> <penalty> <penDisData> <penaltyAmount>0</penaltyAmount> <penaltyCurrency>USD</penaltyCurrency> </penDisData> </penalty> <residualValueInfo> <monetaryDetails> <typeQualifier>RES</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>REF</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>REU</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>RFR</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>RTA</typeQualifier> <amount>96.86</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>RUR</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> </residualValueInfo> <oldTaxInfo> <monetaryDetails> <typeQualifier>ITA</typeQualifier> <amount>96.86</amount> <currency>USD</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>ITO</typeQualifier> <amount>1012.20</amount> <currency>USD</currency> </otherMonetaryDetails> </oldTaxInfo> <issueBalanceInfo> <monetaryDetails> <typeQualifier>BTA</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>BEQ</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BGT</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BTO</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> </issueBalanceInfo> </secondDpiGroup> <firstPricingInformationKey> <dataLength>28</dataLength> <dataType>B</dataType> <binaryData>STIwMTUwMzIwLTQ3MzQ2MzMwNDY0MDM1NjAwMA==</binaryData> </firstPricingInformationKey> <formOfPaymentInformation> <formOfPayment> <type>CA</type> <indicator>2</indicator> </formOfPayment> </formOfPaymentInformation> <reissueAttributes> <attributeDetails> <attributeType>REVAL</attributeType> <attributeDescription>1</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>NET</attributeType> <attributeDescription>1</attributeDescription> </attributeDetails> </reissueAttributes> <foLine> <layout> <issue> <cityCode>YYZ</cityCode> <dateOfIssue>200415</dateOfIssue> <iataNumber>69090243</iataNumber> </issue> </layout> <orgAnd4Exchange> <tkt> <documentDetails> <number>9991234567890</number> <dataIndicator>ORG</dataIndicator> </documentDetails> </tkt> </orgAnd4Exchange> <orgAnd4Exchange> <tkt> <documentDetails> <number>9991234567890</number> <dataIndicator>3</dataIndicator> </documentDetails> </tkt> <rng> <rangeQualifier>F</rangeQualifier> <rangeDetails> <min>1</min> <max>1</max> </rangeDetails> </rng> </orgAnd4Exchange> </foLine> </automaticReissueInfo> <fareComponentDetailsGroup> <fareComponentID> <itemNumberDetails> <number>1</number> </itemNumberDetails> </fareComponentID> <marketFareComponent> <boardPointDetails> <trueLocationId>BWI</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>DEN</trueLocationId> </offpointDetails> </marketFareComponent> <monetaryInformation> <monetaryDetails> <typeQualifier>TFC</typeQualifier> <amount>457.67</amount> <currency>USD</currency> </monetaryDetails> </monetaryInformation> <componentClassInfo> <fareBasisDetails> <rateTariffClass>YL</rateTariffClass> </fareBasisDetails> </componentClassInfo> <fareQualifiersDetail> <discountDetails> <fareQualifier>BOR</fareQualifier> </discountDetails> </fareQualifiersDetail> <fareFamilyDetails> <fareFamilyname>ANY</fareFamilyname> </fareFamilyDetails> <couponDetailsGroup> <productId> <referenceDetails> <type>ST</type> <value>1</value> </referenceDetails> </productId> </couponDetailsGroup> </fareComponentDetailsGroup> <fareComponentDetailsGroup> <fareComponentID> <itemNumberDetails> <number>2</number> </itemNumberDetails> </fareComponentID> <marketFareComponent> <boardPointDetails> <trueLocationId>DEN</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>BWI</trueLocationId> </offpointDetails> </marketFareComponent> <monetaryInformation> <monetaryDetails> <typeQualifier>TFC</typeQualifier> <amount>457.67</amount> <currency>USD</currency> </monetaryDetails> </monetaryInformation> <componentClassInfo> <fareBasisDetails> <rateTariffClass>YL</rateTariffClass> </fareBasisDetails> </componentClassInfo> <fareQualifiersDetail> <discountDetails> <fareQualifier>BOR</fareQualifier> </discountDetails> </fareQualifiersDetail> <fareFamilyDetails> <fareFamilyname>ANY</fareFamilyname> </fareFamilyDetails> <couponDetailsGroup> <productId> <referenceDetails> <type>ST</type> <value>2</value> </referenceDetails> </productId> </couponDetailsGroup> </fareComponentDetailsGroup> <markerFares></markerFares> </fareList> <fareList> <pricingInformation> <tstInformation> <tstIndicator>I</tstIndicator> </tstInformation> <fcmi>0</fcmi> </pricingInformation> <fareReference> <referenceType>TST</referenceType> <uniqueReference>2</uniqueReference> </fareReference> <lastTktDate> <businessSemantic>LT</businessSemantic> <dateTime> <year>2015</year> <month>8</month> <day>22</day> </dateTime> </lastTktDate> <validatingCarrier> <carrierInformation> <carrierCode>6X</carrierCode> </carrierInformation> </validatingCarrier> <paxSegReference> <refDetails> <refQualifier>PA</refQualifier> <refNumber>2</refNumber> </refDetails> </paxSegReference> <fareDataInformation> <fareDataMainInformation> <fareDataQualifier>R</fareDataQualifier> </fareDataMainInformation> <fareDataSupInformation> <fareDataQualifier>712</fareDataQualifier> <fareAmount>0.00</fareAmount> <fareCurrency>USD</fareCurrency> </fareDataSupInformation> <fareDataSupInformation> <fareDataQualifier>B</fareDataQualifier> <fareAmount>915.34</fareAmount> <fareCurrency>USD</fareCurrency> </fareDataSupInformation> <fareDataSupInformation> <fareDataQualifier>MAC</fareDataQualifier> <fareAmount>9153</fareAmount> </fareDataSupInformation> </fareDataInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>AY</isoCountry> </taxType> <taxNature>SE</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>11.20</fareAmount> <fareCurrency>USD</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>US</isoCountry> </taxType> <taxNature>LO</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>68.66</fareAmount> <fareCurrency>USD</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>XF</isoCountry> </taxType> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>9.00</fareAmount> <fareCurrency>USD</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>ZP</isoCountry> </taxType> <taxNature>VO</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>8.00</fareAmount> <fareCurrency>USD</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <passengerInformation> <penDisInformation></penDisInformation> <travellerInfo> <travellerNameInfo> <type>ADT</type> </travellerNameInfo> <otherPaxNamesDetails> <surname>FRANCOIS</surname> <givenName>MARIE</givenName> </otherPaxNamesDetails> </travellerInfo> <passengerReference> <refDetails> <refQualifier>PA</refQualifier> <refNumber>2</refNumber> </refDetails> </passengerReference> </passengerInformation> <originDestination> <cityCode>BWI</cityCode> <cityCode>BWI</cityCode> </originDestination> <segmentInformation> <connexInformation> <connecDetails> <connexType>O</connexType> </connecDetails> </connexInformation> <segDetails> <flightDate> <departureDate>090915</departureDate> <departureTime>835</departureTime> <arrivalDate>090915</arrivalDate> <arrivalTime>1040</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>BWI</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>DEN</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>366</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> </segDetails> <fareQualifier> <fareBasisDetails> <primaryCode>YL</primaryCode> <discTktDesignator>ADT</discTktDesignator> </fareBasisDetails> </fareQualifier> <validityInformation> <businessSemantic>A</businessSemantic> <dateTime> <year>2016</year> <month>9</month> <day>9</day> </dateTime> </validityInformation> <bagAllowanceInformation> <bagAllowanceDetails> <baggageQuantity>2</baggageQuantity> <baggageType>N</baggageType> </bagAllowanceDetails> </bagAllowanceInformation> <segmentReference> <refDetails> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </refDetails> </segmentReference> <sequenceInformation> <sequenceSection> <sequenceNumber>1</sequenceNumber> </sequenceSection> </sequenceInformation> </segmentInformation> <segmentInformation> <connexInformation> <connecDetails> <connexType>O</connexType> </connecDetails> </connexInformation> <segDetails> <flightDate> <departureDate>140915</departureDate> <departureTime>615</departureTime> <arrivalDate>140915</arrivalDate> <arrivalTime>1140</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>DEN</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>BWI</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>852</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> </segDetails> <fareQualifier> <fareBasisDetails> <primaryCode>YL</primaryCode> <discTktDesignator>ADT</discTktDesignator> </fareBasisDetails> </fareQualifier> <validityInformation> <businessSemantic>A</businessSemantic> <dateTime> <year>2016</year> <month>9</month> <day>9</day> </dateTime> </validityInformation> <bagAllowanceInformation> <bagAllowanceDetails> <baggageQuantity>2</baggageQuantity> <baggageType>N</baggageType> </bagAllowanceDetails> </bagAllowanceInformation> <segmentReference> <refDetails> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </refDetails> </segmentReference> <sequenceInformation> <sequenceSection> <sequenceNumber>2</sequenceNumber> </sequenceSection> </sequenceInformation> </segmentInformation> <otherPricingInfo> <attributeDetails> <attributeType>FCA</attributeType> <attributeDescription>BWI 6X DEN457.676X BWI457.67USD915.34END PD XF BWI4.5DEN4.5 ZP BWI4.00DEN4.00</attributeDescription> </attributeDetails> </otherPricingInfo> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText> - SEE ADV PURCHASE</errorFreeText> </warningText> </warningInformation> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText>BG CXR</errorFreeText> </warningText> </warningInformation> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText>PRICED WITH VALIDATING CARRIER 6X - REPRICE IF DIFFERENT VC</errorFreeText> </warningText> </warningInformation> <automaticReissueInfo> <ticketInfo> <documentDetails> <number>9991234567891</number> <type>ET</type> </documentDetails> </ticketInfo> <couponInfo> <couponDetails> <cpnNumber>1</cpnNumber> </couponDetails> </couponInfo> <baseFareInfo> <monetaryDetails> <typeQualifier>IBA</typeQualifier> <amount>915.34</amount> <currency>USD</currency> </monetaryDetails> </baseFareInfo> <firstDpiGroup> <reIssuePenalty> <penDisData> <penaltyAmount>0</penaltyAmount> <penaltyCurrency>USD</penaltyCurrency> </penDisData> </reIssuePenalty> <reissueInfo> <monetaryDetails> <typeQualifier>RES</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>RTO</typeQualifier> <amount>1012.20</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TSC</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TST</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>REF</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>REU</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>RFR</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>RTA</typeQualifier> <amount>96.86</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>RUR</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TAC</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> </reissueInfo> <oldTaxInfo> <monetaryDetails> <typeQualifier>ITA</typeQualifier> <amount>96.86</amount> <currency>USD</currency> </monetaryDetails> </oldTaxInfo> <reissueBalanceInfo> <monetaryDetails> <typeQualifier>BEQ</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>BGT</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BTA</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BTO</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> </reissueBalanceInfo> </firstDpiGroup> <secondDpiGroup> <penalty> <penDisData> <penaltyAmount>0</penaltyAmount> <penaltyCurrency>USD</penaltyCurrency> </penDisData> </penalty> <residualValueInfo> <monetaryDetails> <typeQualifier>RES</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>REF</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>REU</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>RFR</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>RTA</typeQualifier> <amount>96.86</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>RUR</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> </residualValueInfo> <oldTaxInfo> <monetaryDetails> <typeQualifier>ITA</typeQualifier> <amount>96.86</amount> <currency>USD</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>ITO</typeQualifier> <amount>1012.20</amount> <currency>USD</currency> </otherMonetaryDetails> </oldTaxInfo> <issueBalanceInfo> <monetaryDetails> <typeQualifier>BTA</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>BEQ</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BGT</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BTO</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> </issueBalanceInfo> </secondDpiGroup> <firstPricingInformationKey> <dataLength>28</dataLength> <dataType>B</dataType> <binaryData>STIwMTUwMzIwLTQ3MzQ2MzMwNDY0MDM1NjAwMA==</binaryData> </firstPricingInformationKey> <formOfPaymentInformation> <formOfPayment> <type>CA</type> <indicator>2</indicator> </formOfPayment> </formOfPaymentInformation> <reissueAttributes> <attributeDetails> <attributeType>REVAL</attributeType> <attributeDescription>1</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>NET</attributeType> <attributeDescription>1</attributeDescription> </attributeDetails> </reissueAttributes> <foLine> <layout> <issue> <cityCode>YYZ</cityCode> <dateOfIssue>200415</dateOfIssue> <iataNumber>69090243</iataNumber> </issue> </layout> <orgAnd4Exchange> <tkt> <documentDetails> <number>9991234567891</number> <dataIndicator>ORG</dataIndicator> </documentDetails> </tkt> </orgAnd4Exchange> <orgAnd4Exchange> <tkt> <documentDetails> <number>9991234567891</number> <dataIndicator>3</dataIndicator> </documentDetails> </tkt> <rng> <rangeQualifier>F</rangeQualifier> <rangeDetails> <min>1</min> <max>1</max> </rangeDetails> </rng> </orgAnd4Exchange> </foLine> </automaticReissueInfo> <fareComponentDetailsGroup> <fareComponentID> <itemNumberDetails> <number>1</number> </itemNumberDetails> </fareComponentID> <marketFareComponent> <boardPointDetails> <trueLocationId>BWI</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>DEN</trueLocationId> </offpointDetails> </marketFareComponent> <monetaryInformation> <monetaryDetails> <typeQualifier>TFC</typeQualifier> <amount>457.67</amount> <currency>USD</currency> </monetaryDetails> </monetaryInformation> <componentClassInfo> <fareBasisDetails> <rateTariffClass>YL</rateTariffClass> </fareBasisDetails> </componentClassInfo> <fareQualifiersDetail> <discountDetails> <fareQualifier>BOR</fareQualifier> </discountDetails> </fareQualifiersDetail> <fareFamilyDetails> <fareFamilyname>ANY</fareFamilyname> </fareFamilyDetails> <couponDetailsGroup> <productId> <referenceDetails> <type>ST</type> <value>1</value> </referenceDetails> </productId> </couponDetailsGroup> </fareComponentDetailsGroup> <fareComponentDetailsGroup> <fareComponentID> <itemNumberDetails> <number>2</number> </itemNumberDetails> </fareComponentID> <marketFareComponent> <boardPointDetails> <trueLocationId>DEN</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>BWI</trueLocationId> </offpointDetails> </marketFareComponent> <monetaryInformation> <monetaryDetails> <typeQualifier>TFC</typeQualifier> <amount>457.67</amount> <currency>USD</currency> </monetaryDetails> </monetaryInformation> <componentClassInfo> <fareBasisDetails> <rateTariffClass>YL</rateTariffClass> </fareBasisDetails> </componentClassInfo> <fareQualifiersDetail> <discountDetails> <fareQualifier>BOR</fareQualifier> </discountDetails> </fareQualifiersDetail> <fareFamilyDetails> <fareFamilyname>ANY</fareFamilyname> </fareFamilyDetails> <couponDetailsGroup> <productId> <referenceDetails> <type>ST</type> <value>2</value> </referenceDetails> </productId> </couponDetailsGroup> </fareComponentDetailsGroup> <markerFares></markerFares> </fareList> <fareList> <pricingInformation> <tstInformation> <tstIndicator>I</tstIndicator> </tstInformation> <fcmi>0</fcmi> </pricingInformation> <fareReference> <referenceType>TST</referenceType> <uniqueReference>3</uniqueReference> </fareReference> <lastTktDate> <businessSemantic>LT</businessSemantic> <dateTime> <year>2015</year> <month>8</month> <day>22</day> </dateTime> </lastTktDate> <validatingCarrier> <carrierInformation> <carrierCode>6X</carrierCode> </carrierInformation> </validatingCarrier> <paxSegReference> <refDetails> <refQualifier>PA</refQualifier> <refNumber>3</refNumber> </refDetails> </paxSegReference> <fareDataInformation> <fareDataMainInformation> <fareDataQualifier>R</fareDataQualifier> </fareDataMainInformation> <fareDataSupInformation> <fareDataQualifier>712</fareDataQualifier> <fareAmount>0.00</fareAmount> <fareCurrency>USD</fareCurrency> </fareDataSupInformation> <fareDataSupInformation> <fareDataQualifier>B</fareDataQualifier> <fareAmount>872.56</fareAmount> <fareCurrency>USD</fareCurrency> </fareDataSupInformation> <fareDataSupInformation> <fareDataQualifier>MAC</fareDataQualifier> <fareAmount>8726</fareAmount> </fareDataSupInformation> </fareDataInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>AY</isoCountry> </taxType> <taxNature>SE</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>11.20</fareAmount> <fareCurrency>USD</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>US</isoCountry> </taxType> <taxNature>LO</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>65.44</fareAmount> <fareCurrency>USD</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>XF</isoCountry> </taxType> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>9.00</fareAmount> <fareCurrency>USD</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>PD</taxIdentifier> </taxIdentification> <taxType> <isoCountry>ZP</isoCountry> </taxType> <taxNature>VO</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>8.00</fareAmount> <fareCurrency>USD</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <passengerInformation> <penDisInformation></penDisInformation> <travellerInfo> <travellerNameInfo> <type>ADT</type> </travellerNameInfo> <otherPaxNamesDetails> <surname>FRANCOIS</surname> <givenName>LOUIS</givenName> </otherPaxNamesDetails> </travellerInfo> <passengerReference> <refDetails> <refQualifier>PA</refQualifier> <refNumber>3</refNumber> </refDetails> </passengerReference> </passengerInformation> <originDestination> <cityCode>BWI</cityCode> <cityCode>BWI</cityCode> </originDestination> <segmentInformation> <connexInformation> <connecDetails> <connexType>O</connexType> </connecDetails> </connexInformation> <segDetails> <flightDate> <departureDate>090915</departureDate> <departureTime>835</departureTime> <arrivalDate>090915</arrivalDate> <arrivalTime>1040</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>BWI</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>DEN</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>366</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> </segDetails> <fareQualifier> <fareBasisDetails> <primaryCode>YCH</primaryCode> <discTktDesignator>CH</discTktDesignator> </fareBasisDetails> </fareQualifier> <validityInformation> <businessSemantic>A</businessSemantic> <dateTime> <year>2016</year> <month>9</month> <day>9</day> </dateTime> </validityInformation> <bagAllowanceInformation> <bagAllowanceDetails> <baggageQuantity>2</baggageQuantity> <baggageType>N</baggageType> </bagAllowanceDetails> </bagAllowanceInformation> <segmentReference> <refDetails> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </refDetails> </segmentReference> <sequenceInformation> <sequenceSection> <sequenceNumber>1</sequenceNumber> </sequenceSection> </sequenceInformation> </segmentInformation> <segmentInformation> <connexInformation> <connecDetails> <connexType>O</connexType> </connecDetails> </connexInformation> <segDetails> <flightDate> <departureDate>140915</departureDate> <departureTime>615</departureTime> <arrivalDate>140915</arrivalDate> <arrivalTime>1140</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>DEN</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>BWI</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>852</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> </segDetails> <fareQualifier> <fareBasisDetails> <primaryCode>YCH</primaryCode> <discTktDesignator>CH</discTktDesignator> </fareBasisDetails> </fareQualifier> <validityInformation> <businessSemantic>A</businessSemantic> <dateTime> <year>2016</year> <month>9</month> <day>9</day> </dateTime> </validityInformation> <bagAllowanceInformation> <bagAllowanceDetails> <baggageQuantity>2</baggageQuantity> <baggageType>N</baggageType> </bagAllowanceDetails> </bagAllowanceInformation> <segmentReference> <refDetails> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </refDetails> </segmentReference> <sequenceInformation> <sequenceSection> <sequenceNumber>2</sequenceNumber> </sequenceSection> </sequenceInformation> </segmentInformation> <otherPricingInfo> <attributeDetails> <attributeType>END</attributeType> <attributeDescription>NONTRANSFERABLE -BG</attributeDescription> </attributeDetails> </otherPricingInfo> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText> - SEE ADV PURCHASE</errorFreeText> </warningText> </warningInformation> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText>BG CXR</errorFreeText> </warningText> </warningInformation> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText>PRICED WITH VALIDATING CARRIER 6X - REPRICE IF DIFFERENT VC</errorFreeText> </warningText> </warningInformation> <automaticReissueInfo> <ticketInfo> <documentDetails> <number>9991234567892</number> <type>ET</type> </documentDetails> </ticketInfo> <couponInfo> <couponDetails> <cpnNumber>1</cpnNumber> </couponDetails> </couponInfo> <baseFareInfo> <monetaryDetails> <typeQualifier>IBA</typeQualifier> <amount>872.56</amount> <currency>USD</currency> </monetaryDetails> </baseFareInfo> <firstDpiGroup> <reIssuePenalty> <penDisData> <penaltyAmount>0</penaltyAmount> <penaltyCurrency>USD</penaltyCurrency> </penDisData> </reIssuePenalty> <reissueInfo> <monetaryDetails> <typeQualifier>RES</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>RTO</typeQualifier> <amount>966.20</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TSC</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TST</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>REF</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>REU</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>RFR</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>RTA</typeQualifier> <amount>93.64</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>RUR</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TAC</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> </reissueInfo> <oldTaxInfo> <monetaryDetails> <typeQualifier>ITA</typeQualifier> <amount>93.64</amount> <currency>USD</currency> </monetaryDetails> </oldTaxInfo> <reissueBalanceInfo> <monetaryDetails> <typeQualifier>BEQ</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>BGT</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BTA</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BTO</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> </reissueBalanceInfo> </firstDpiGroup> <secondDpiGroup> <penalty> <penDisData> <penaltyAmount>0</penaltyAmount> <penaltyCurrency>USD</penaltyCurrency> </penDisData> </penalty> <residualValueInfo> <monetaryDetails> <typeQualifier>RES</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>REF</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>REU</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>RFR</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>RTA</typeQualifier> <amount>93.64</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>RUR</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> </residualValueInfo> <oldTaxInfo> <monetaryDetails> <typeQualifier>ITA</typeQualifier> <amount>93.64</amount> <currency>USD</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>ITO</typeQualifier> <amount>966.20</amount> <currency>USD</currency> </otherMonetaryDetails> </oldTaxInfo> <issueBalanceInfo> <monetaryDetails> <typeQualifier>BTA</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>BEQ</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BGT</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BTO</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> </issueBalanceInfo> </secondDpiGroup> <firstPricingInformationKey> <dataLength>28</dataLength> <dataType>B</dataType> <binaryData>STIwMTUwMzIwLTQ3MzQ2MzMwNDY0MDM1NjAwMQ==</binaryData> </firstPricingInformationKey> <formOfPaymentInformation> <formOfPayment> <type>CA</type> <indicator>2</indicator> </formOfPayment> </formOfPaymentInformation> <reissueAttributes> <attributeDetails> <attributeType>REVAL</attributeType> <attributeDescription>1</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>NET</attributeType> <attributeDescription>1</attributeDescription> </attributeDetails> </reissueAttributes> <foLine> <layout> <issue> <cityCode>YYZ</cityCode> <dateOfIssue>200415</dateOfIssue> <iataNumber>69090243</iataNumber> </issue> </layout> <orgAnd4Exchange> <tkt> <documentDetails> <number>9991234567892</number> <dataIndicator>ORG</dataIndicator> </documentDetails> </tkt> </orgAnd4Exchange> <orgAnd4Exchange> <tkt> <documentDetails> <number>9991234567892</number> <dataIndicator>3</dataIndicator> </documentDetails> </tkt> <rng> <rangeQualifier>F</rangeQualifier> <rangeDetails> <min>1</min> <max>1</max> </rangeDetails> </rng> </orgAnd4Exchange> </foLine> </automaticReissueInfo> <fareComponentDetailsGroup> <fareComponentID> <itemNumberDetails> <number>1</number> </itemNumberDetails> </fareComponentID> <marketFareComponent> <boardPointDetails> <trueLocationId>BWI</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>DEN</trueLocationId> </offpointDetails> </marketFareComponent> <monetaryInformation> <monetaryDetails> <typeQualifier>TFC</typeQualifier> <amount>436.28</amount> <currency>USD</currency> </monetaryDetails> </monetaryInformation> <componentClassInfo> <fareBasisDetails> <rateTariffClass>YCH</rateTariffClass> </fareBasisDetails> </componentClassInfo> <fareQualifiersDetail> <discountDetails> <fareQualifier>BOR</fareQualifier> </discountDetails> </fareQualifiersDetail> <fareFamilyDetails> <fareFamilyname>ANY</fareFamilyname> </fareFamilyDetails> <couponDetailsGroup> <productId> <referenceDetails> <type>ST</type> <value>1</value> </referenceDetails> </productId> </couponDetailsGroup> </fareComponentDetailsGroup> <fareComponentDetailsGroup> <fareComponentID> <itemNumberDetails> <number>2</number> </itemNumberDetails> </fareComponentID> <marketFareComponent> <boardPointDetails> <trueLocationId>DEN</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>BWI</trueLocationId> </offpointDetails> </marketFareComponent> <monetaryInformation> <monetaryDetails> <typeQualifier>TFC</typeQualifier> <amount>436.28</amount> <currency>USD</currency> </monetaryDetails> </monetaryInformation> <componentClassInfo> <fareBasisDetails> <rateTariffClass>YCH</rateTariffClass> </fareBasisDetails> </componentClassInfo> <fareQualifiersDetail> <discountDetails> <fareQualifier>BOR</fareQualifier> </discountDetails> </fareQualifiersDetail> <fareFamilyDetails> <fareFamilyname>ANY</fareFamilyname> </fareFamilyDetails> <couponDetailsGroup> <productId> <referenceDetails> <type>ST</type> <value>2</value> </referenceDetails> </productId> </couponDetailsGroup> </fareComponentDetailsGroup> <markerFares></markerFares> </fareList> <fareList> <pricingInformation> <tstInformation> <tstIndicator>I</tstIndicator> </tstInformation> <fcmi>0</fcmi> </pricingInformation> <fareReference> <referenceType>TST</referenceType> <uniqueReference>4</uniqueReference> </fareReference> <lastTktDate> <businessSemantic>LT</businessSemantic> <dateTime> <year>2015</year> <month>8</month> <day>22</day> </dateTime> </lastTktDate> <validatingCarrier> <carrierInformation> <carrierCode>6X</carrierCode> </carrierInformation> </validatingCarrier> <paxSegReference> <refDetails> <refQualifier>PI</refQualifier> <refNumber>1</refNumber> </refDetails> </paxSegReference> <fareDataInformation> <fareDataMainInformation> <fareDataQualifier>R</fareDataQualifier> </fareDataMainInformation> <fareDataSupInformation> <fareDataQualifier>712</fareDataQualifier> <fareAmount>0.00</fareAmount> <fareCurrency>USD</fareCurrency> </fareDataSupInformation> <fareDataSupInformation> <fareDataQualifier>B</fareDataQualifier> <fareAmount>0.00</fareAmount> <fareCurrency>USD</fareCurrency> </fareDataSupInformation> <fareDataSupInformation> <fareDataQualifier>MAC</fareDataQualifier> <fareAmount>0</fareAmount> </fareDataSupInformation> </fareDataInformation> <passengerInformation> <penDisInformation></penDisInformation> <travellerInfo> <travellerNameInfo> <type>ADT</type> </travellerNameInfo> <otherPaxNamesDetails> <surname>FRANCOIS</surname> <givenName>PIERRE JR</givenName> </otherPaxNamesDetails> </travellerInfo> <passengerReference> <refDetails> <refQualifier>PA</refQualifier> <refNumber>1</refNumber> </refDetails> </passengerReference> </passengerInformation> <originDestination> <cityCode>BWI</cityCode> <cityCode>BWI</cityCode> </originDestination> <segmentInformation> <connexInformation> <connecDetails> <connexType>O</connexType> </connecDetails> </connexInformation> <segDetails> <flightIdentification> <flightNumber>AIR</flightNumber> <operationalSuffix>Y</operationalSuffix> </flightIdentification> <specialSegment>OK</specialSegment> </segDetails> <fareQualifier> <fareBasisDetails> <primaryCode>YL</primaryCode> <ticketDesignator>IN</ticketDesignator> <discTktDesignator>IN</discTktDesignator> </fareBasisDetails> </fareQualifier> <validityInformation> <businessSemantic>A</businessSemantic> <dateTime> <year>2016</year> <month>9</month> <day>9</day> </dateTime> </validityInformation> <bagAllowanceInformation> <bagAllowanceDetails> <baggageQuantity>0</baggageQuantity> <baggageType>N</baggageType> </bagAllowanceDetails> </bagAllowanceInformation> <segmentReference> <refDetails> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </refDetails> </segmentReference> <sequenceInformation> <sequenceSection> <sequenceNumber>1</sequenceNumber> </sequenceSection> </sequenceInformation> </segmentInformation> <segmentInformation> <connexInformation> <connecDetails> <connexType>O</connexType> </connecDetails> </connexInformation> <segDetails> <flightIdentification> <flightNumber>AIR</flightNumber> <operationalSuffix>Y</operationalSuffix> </flightIdentification> <specialSegment>OK</specialSegment> </segDetails> <fareQualifier> <fareBasisDetails> <primaryCode>YL</primaryCode> <ticketDesignator>IN</ticketDesignator> <discTktDesignator>IN</discTktDesignator> </fareBasisDetails> </fareQualifier> <validityInformation> <businessSemantic>A</businessSemantic> <dateTime> <year>2016</year> <month>9</month> <day>9</day> </dateTime> </validityInformation> <bagAllowanceInformation> <bagAllowanceDetails> <baggageQuantity>0</baggageQuantity> <baggageType>N</baggageType> </bagAllowanceDetails> </bagAllowanceInformation> <segmentReference> <refDetails> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </refDetails> </segmentReference> <sequenceInformation> <sequenceSection> <sequenceNumber>2</sequenceNumber> </sequenceSection> </sequenceInformation> </segmentInformation> <otherPricingInfo> <attributeDetails> <attributeType>END</attributeType> <attributeDescription>NONTRANSFERABLE -BG</attributeDescription> </attributeDetails> </otherPricingInfo> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText> - SEE ADV PURCHASE</errorFreeText> </warningText> </warningInformation> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText>BG CXR</errorFreeText> </warningText> </warningInformation> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>ZZZ</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText>PRICED WITH VALIDATING CARRIER 6X - REPRICE IF DIFFERENT VC</errorFreeText> </warningText> </warningInformation> <automaticReissueInfo> <ticketInfo> <documentDetails> <number>9991234567893</number> <type>ET</type> </documentDetails> </ticketInfo> <couponInfo> <couponDetails> <cpnNumber>1</cpnNumber> </couponDetails> </couponInfo> <baseFareInfo> <monetaryDetails> <typeQualifier>IBA</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </monetaryDetails> </baseFareInfo> <firstDpiGroup> <reIssuePenalty> <penDisData> <penaltyAmount>0</penaltyAmount> <penaltyCurrency>USD</penaltyCurrency> </penDisData> </reIssuePenalty> <reissueInfo> <monetaryDetails> <typeQualifier>RES</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>RTO</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TSC</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TST</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>REF</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>REU</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>RFR</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>RTA</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>RUR</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TAC</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> </reissueInfo> <oldTaxInfo> <monetaryDetails> <typeQualifier>ITA</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </monetaryDetails> </oldTaxInfo> <reissueBalanceInfo> <monetaryDetails> <typeQualifier>BEQ</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>BGT</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BTA</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BTO</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> </reissueBalanceInfo> </firstDpiGroup> <secondDpiGroup> <penalty> <penDisData> <penaltyAmount>0</penaltyAmount> <penaltyCurrency>USD</penaltyCurrency> </penDisData> </penalty> <residualValueInfo> <monetaryDetails> <typeQualifier>RES</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>REF</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>REU</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>RFR</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>RTA</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>RUR</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> </residualValueInfo> <oldTaxInfo> <monetaryDetails> <typeQualifier>ITA</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>ITO</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> </oldTaxInfo> <issueBalanceInfo> <monetaryDetails> <typeQualifier>BTA</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>BEQ</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BGT</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BTO</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> </issueBalanceInfo> </secondDpiGroup> <firstPricingInformationKey> <dataLength>28</dataLength> <dataType>B</dataType> <binaryData>STIwMTUwMzIwLTQ3MzQ2MzMwNDY0MDM1NjAwMg==</binaryData> </firstPricingInformationKey> <formOfPaymentInformation> <formOfPayment> <type>CA</type> <indicator>2</indicator> </formOfPayment> </formOfPaymentInformation> <reissueAttributes> <attributeDetails> <attributeType>REVAL</attributeType> <attributeDescription>1</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>NET</attributeType> <attributeDescription>1</attributeDescription> </attributeDetails> </reissueAttributes> <foLine> <layout> <issue> <cityCode>YYZ</cityCode> <dateOfIssue>200415</dateOfIssue> <iataNumber>69090243</iataNumber> </issue> </layout> <orgAnd4Exchange> <tkt> <documentDetails> <number>9991234567893</number> <dataIndicator>ORG</dataIndicator> </documentDetails> </tkt> </orgAnd4Exchange> <orgAnd4Exchange> <tkt> <documentDetails> <number>9991234567893</number> <dataIndicator>3</dataIndicator> </documentDetails> </tkt> <rng> <rangeQualifier>F</rangeQualifier> <rangeDetails> <min>1</min> <max>1</max> </rangeDetails> </rng> </orgAnd4Exchange> </foLine> </automaticReissueInfo> <fareComponentDetailsGroup> <fareComponentID> <itemNumberDetails> <number>1</number> </itemNumberDetails> </fareComponentID> <marketFareComponent> <boardPointDetails> <trueLocationId>BWI</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>DEN</trueLocationId> </offpointDetails> </marketFareComponent> <monetaryInformation> <monetaryDetails> <typeQualifier>TFC</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </monetaryDetails> </monetaryInformation> <componentClassInfo> <fareBasisDetails> <rateTariffClass>YL</rateTariffClass> <otherRateTariffClass>IN</otherRateTariffClass> </fareBasisDetails> </componentClassInfo> <fareQualifiersDetail> <discountDetails> <fareQualifier>BOR</fareQualifier> </discountDetails> </fareQualifiersDetail> <fareFamilyDetails> <fareFamilyname>ANY</fareFamilyname> </fareFamilyDetails> <couponDetailsGroup> <productId> <referenceDetails> <type>ST</type> <value>1</value> </referenceDetails> </productId> </couponDetailsGroup> </fareComponentDetailsGroup> <fareComponentDetailsGroup> <fareComponentID> <itemNumberDetails> <number>2</number> </itemNumberDetails> </fareComponentID> <marketFareComponent> <boardPointDetails> <trueLocationId>DEN</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>BWI</trueLocationId> </offpointDetails> </marketFareComponent> <monetaryInformation> <monetaryDetails> <typeQualifier>TFC</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </monetaryDetails> </monetaryInformation> <componentClassInfo> <fareBasisDetails> <rateTariffClass>YL</rateTariffClass> <otherRateTariffClass>IN</otherRateTariffClass> </fareBasisDetails> </componentClassInfo> <fareQualifiersDetail> <discountDetails> <fareQualifier>BOR</fareQualifier> </discountDetails> </fareQualifiersDetail> <fareFamilyDetails> <fareFamilyname>ANY</fareFamilyname> </fareFamilyDetails> <couponDetailsGroup> <productId> <referenceDetails> <type>ST</type> <value>2</value> </referenceDetails> </productId> </couponDetailsGroup> </fareComponentDetailsGroup> <markerFares></markerFares> </fareList> </ticketGroup> <docSeparator></docSeparator> </Ticket\_ReissuePricingWithoutPNRReply>

## 5.10.3 Possible Errors

See "Error Messages" section.

* * *