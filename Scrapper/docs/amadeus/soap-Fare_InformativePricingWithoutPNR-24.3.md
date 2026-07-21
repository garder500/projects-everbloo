---
url: "https://developers.amadeus.com/api-library/soap/functional-doc/624/doc-read/141336?serviceVersion=24.3"
download_url: "https://developers.amadeus.com/PAS-EAS/api/download/comp/4d4ad2cb456c02633f463a055ab70584/141336/UG_WBS_Fare_InformativePricingWithoutPNR_TIPNRQ_24.3_001.html"
title: "HTML_UG_WBS_Fare_InformativePricingWithoutPNR_TIPNRQ_24.3_001"
source: "amadeus"
service_id: "624"
service_name: "Fare_InformativePricingWithoutPNR"
version: "24.3"
document_id: "141336"
doc_version: "24.3"
doc_type: "User guide"
scraped_at: "2026-07-15T10:13:29.403Z"
---
# Function: Fare\_InformativePricingWithoutPNR

* * *

## 1 Overview

The InformativePricingWithoutPNR function provided in the Fare interface is used to price informatively an itinerary without any PNR.  
Since there is no PNR, all the information about the passengers and the itinerary is provided in the query.

Note that, if a PNR exists, it is neither taken into account nor updated. No pricing record (TST) can be created to store the results.

## 1.1 Supported Operations

The InformativePricingWithoutPNR function returns the fare corresponding to the itinerary and passengers provided in the request.  
The rules applicable for a standard pricing operation based on a PNR (Fare\_PricePNRWithBookingClass) are also applicable here.

## 1.2 Limitations

Since service is not based on the PNR, it is the user's responsibility to provide accurate data in the query. If incorrect data are provided, this can lead to invalid fare data returned in the response, and Amadeus cannot be held responsible for this.  
It is not possible to book itinerary nor to create TST automatically as follow up of this service.

## 1.3 Unsupported Operations

None

## 1.4 Prerequisites

None

## 2 Building A Query

The InformativePricingWithoutPNR query is made of 3 groups:

-   **passengersGroup**: used to give details regarding passengers to price.
-   **segmentGroup**: used to give details regarding itinerary.
-   **pricingOptionGroup**: used to give detaild about pricing options to apply. Can be repeated up to 999 times.

## 2.1 Sub Structure: passengersGroup

## 2.1.1 Description

This group is made of 3 elements:

-   segmentRepetitionControl: contains the ID of this group of passengers (quantity) and the number of passengers (numberOfUnits)
-   travellersID: contains the tattoos of the passengers (measurementValue)
-   discountPtc: contains the passenger PTC (valueQualifier) and the "infant" indicator (value "766" as qualifier)

  
Example:

-   2 adults (group 1) with tattoos 1 and 2
-   1 infant (group 2) with tattoo 1 (occupying same seat as adult number 1)
-   1 child (group 3) with tattoo 3

## 2.1.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<passengersGroup> <segmentRepetitionControl> <segmentControlDetails> <quantity>1</quantity> <numberOfUnits>2</numberOfUnits> </segmentControlDetails> </segmentRepetitionControl> <travellersID> <travellerDetails> <measurementValue>1</measurementValue> </travellerDetails> <travellerDetails> <measurementValue>2</measurementValue> </travellerDetails> </travellersID> </passengersGroup> <passengersGroup> <segmentRepetitionControl> <segmentControlDetails> <quantity>2</quantity> <numberOfUnits>1</numberOfUnits> </segmentControlDetails> </segmentRepetitionControl> <travellersID> <travellerDetails> <measurementValue>1</measurementValue> </travellerDetails> </travellersID> <discountPtc> <valueQualifier>INF</valueQualifier> <fareDetails> <qualifier>766</qualifier> </fareDetails> </discountPtc> </passengersGroup> <passengersGroup> <segmentRepetitionControl> <segmentControlDetails> <quantity>3</quantity> <numberOfUnits>1</numberOfUnits> </segmentControlDetails> </segmentRepetitionControl> <travellersID> <travellerDetails> <measurementValue>3</measurementValue> </travellerDetails> </travellersID> <discountPtc> <valueQualifier>CH</valueQualifier> </discountPtc> </passengersGroup>

## 2.2 Sub Structure: pricingOptionGroup

## 2.2.1 Description

**Principle of the "pricingOptionGroup":**  
  
A pricing option is made of several elements:

-   mandatory: a name
-   optional: 1 or more attribute(s)
-   optional: 1 or more association(s) (passenger, segement, and so on)

  
Example: to specify the PTC to apply for the passenger, the attribute is the PTC, and both passenger and segment association are supported

-   Name = PAX (Passenger attribute)
-   Attribute: the PTC
-   Association: the segment/passenger the PTC should apply to.

The structure of the pricing Option Group is designed to reflect this. It allows to enter, for each option, the name of the option, the optional attributes (in dedicated segments) and association.  
The group is to be repeated once per applicable pricing option.

Structure:

  
![](images/POPT%20group%20structure.png)

**Usage of the "pricingOptionGroup" in the Fare\_****InformativePricingWithoutPNR**  **function:** The option group is repeated once per option to use with rules below:

-   A same option cannot be repeated twice with the same association.  
    For example, to add 2 taxes, it is not allowed to repeat twice the pricingOptionGroup with the pricingOptionKey "AT" (for "add taxes"), once with each tax to add. Instead, use 1 pricingOptionGroup with pricingOptionKey set to "AT" and repeat twice the taxInformation.  
    In case of repetition of the same option, query will be rejected with error message "INVALID REPETITION OF OPTION {xxx}", where {xxx} is the pricingOptionKey of the option that is wrongly repeated.

Correct Query:  
  <pricingOptionGroup>  
    <pricingOptionKey>  
      <pricingOptionKey>AT</pricingOptionKey>  
    </pricingOptionKey>  
    <taxInformation\>  
      <taxQualifier\>7</taxQualifier\>  
      <taxType\>  
        <isoCountry\>ZV</isoCountry\>  
      </taxType\>  
      <taxNature\>GO</taxNature\>  
      <taxData\>  
        <taxRate\>50</taxRate\>  
        <taxValueQualifier\>A</taxValueQualifier\>  
      </taxData\>  
    </taxInformation\>  
    <taxInformation\>  
      <taxQualifier\>7</taxQualifier\>  
      <taxType\>  
        <isoCountry\>FR</isoCountry\>  
      </taxType\>  
      <taxNature\>GO</taxNature\>  
      <taxData\>  
        <taxRate\>50</taxRate\>  
        <taxValueQualifier\>A</taxValueQualifier\>  
      </taxData\>  
    </taxInformation\>  
  </pricingOptionGroup>  
Incorrect Query:  
  <pricingOptionGroup>  
    <pricingOptionKey>  
      <pricingOptionKey>AT</pricingOptionKey>  
    </pricingOptionKey>  
    <taxInformation\>  
      <taxQualifier\>7</taxQualifier\>  
      <taxType\>  
        <isoCountry\>ZV</isoCountry\>  
      </taxType\>  
      <taxNature\>GO</taxNature\>  
      <taxData\>  
        <taxRate\>50</taxRate\>  
        <taxValueQualifier\>A</taxValueQualifier\>  
      </taxData\>  
    </taxInformation\>  
  </pricingOptionGroup>  
  <pricingOptionGroup>  
    <pricingOptionKey>  
      <pricingOptionKey>AT</pricingOptionKey>  
    </pricingOptionKey>  
    <taxInformation\>  
      <taxQualifier\>7</taxQualifier\>  
      <taxType\>  
        <isoCountry\>FR</isoCountry\>  
      </taxType\>  
      <taxNature\>GO</taxNature\>  
      <taxData\>  
        <taxRate\>50</taxRate\>  
        <taxValueQualifier\>A</taxValueQualifier\>  
      </taxData\>  
    </taxInformation\>  
  </pricingOptionGroup>

-   If a repetition of the pricing option group has an invalid attribute (for example: mandatory data that is missing, or non-applicable attribute that is present), query will be rejected with error message "INVALID ATTRIBUTE FOR OPTION {xxx}", where {xxx} is the pricingOptionKey of the option for which there is an invalid attribute.
-   Some option cannot be combined. For example, it is not possible to use options "Pricing by Fare Basis" and "Pricing by Fare Family" in the same pricing request. In case a pricing request contains 2 invalid pricing options, query is rejected with error message "CAN NOT COMBINE OPTIONS {xxx} and {yyy}", where {xxx} and {yyy} are the pricingOptionKeyof the non-combinable options.

Note, that the passenger/segment association are not based on the numbers as they are displayed on the PNR, but on the passenger and segment "tattoo".

## 2.2.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 2.3 Sub Structure: pricingOptionGroup - Add Country Tax

## 2.3.1 Description

Description:  
This option is used to add tax per country code.

  
Structure:

![](images/Add%20Country%20Tax%20without%20reason%20code.png)

-   **pricingOptionKey** = AC (Add Country)
-   **taxInformation**: tax detail
    -   taxQualifier: 7 (tax)
    -   isoCountry: country code

  
Example: add taxes of country FR.

## 2.3.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>AC</pricingOptionKey> </pricingOptionKey> <taxInformation> <taxQualifier>7</taxQualifier> <taxType> <isoCountry>FR</isoCountry> </taxType> <taxData> </taxData> </taxInformation> </pricingOptionGroup>

## 2.4 Sub Structure: pricingOptionGroup - Add Tax

## 2.4.1 Description

Description:  
This option is used to add tax per ISO tax code.

  
Structure:

![](images/Add%20Tax%20without%20reason%20code.png)

-   **pricingOptionKey** = AT (Add Tax)
-   **taxInformation**: tax detail
    -   taxQualifier: 7 (tax)
    -   isoCountry: ISO tax code (M)
    -   taxNature: nature code
    -   taxRate: amount or percentage to add
    -   taxValueQualifier: A for Amount or P for Percentage

Note: addition of several taxes can be done by repeating the "taxInformation" as many time as necessary.

  
Example:

-   addition of tax ZVGO with an amount of 50
-   addition of tax FR with an amount of 10 percent of the base fare

## 2.4.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>AT</pricingOptionKey> </pricingOptionKey> <taxInformation> <taxQualifier>7</taxQualifier> <taxType> <isoCountry>ZV</isoCountry> </taxType> <taxNature>GO</taxNature> <taxData> <taxRate>50</taxRate> <taxValueQualifier>A</taxValueQualifier> </taxData> </taxInformation> <taxInformation> <taxQualifier>7</taxQualifier> <taxType> <isoCountry>FR</isoCountry> </taxType> <taxData> <taxRate>10</taxRate> <taxValueQualifier>P</taxValueQualifier> </taxData> </taxInformation> </pricingOptionGroup>

## 2.5 Sub Structure: pricingOptionGroup - Award Pricing

## 2.5.1 Description

Description:  
This option is used to price an itinerary applying an award program for a given carrier.

Note: The award option must be combined with the corporate option.  
As a result, it is to be entered as 2 repetitions of the Pricing Option Group (one for "AWD" option with publishing carrier + one for "RW" option with up to 6 corporate codes).

  
Structure:

![](images/Award%20pricing.png)

-   **pricingOptionKey1** = AWD (Award)
-   **carrierInformation**: Publishing Carrier
-   **frequentFlyerInformation**: can be used (conditional) for tier level override.
-   **pricingOptionKey2** = RW (Corporate Unifare)
-   **optionDetail**: The Corporate Code(s)

  
Example: award program of carrier "6X" with codes 012345 and 456789, overriding tier level with "GOLD".

## 2.5.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<message agency="1A" release="1" type="TIPNRQ" version="15"> <pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>AWD</pricingOptionKey> </pricingOptionKey> <carrierInformation> <companyIdentification> <otherCompany>6X</otherCompany> </companyIdentification> </carrierInformation> <frequentFlyerInformation> <frequentTravellerDetails> <tierLevel>GOLD</tierLevel> </frequentTravellerDetails> </frequentFlyerInformation> </pricingOptionGroup> <pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>RW</pricingOptionKey> </pricingOptionKey> <optionDetail> <criteriaDetails> <attributeType>012345</attributeType> </criteriaDetails> <criteriaDetails> <attributeType>456789</attributeType> </criteriaDetails> </optionDetail> </pricingOptionGroup> </message>

## 2.6 Sub Structure: pricingOptionGroup - Booking date Override

## 2.6.1 Description

Description:  
This option is used to override the booking date with a given date or the pricing date.

  
Structure:

![](images/Booking%20date%20override.png)

-   **pricingOptionKey** = DO (Booking Date Override)
-   **dateInformation**: Booking date (optional)

  
Example: of booking date override with date 27JUN13.

## 2.6.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>DO</pricingOptionKey> </pricingOptionKey> <dateInformation> <businessSemantic>DO</businessSemantic> <dateTime> <year>2013</year> <month>6</month> <day>27</day> </dateTime> </dateInformation> </pricingOptionGroup>

## 2.7 Sub Structure: pricingOptionGroup - Bound Input

## 2.7.1 Description

Disclaimer

The ''bound input'' functionality is not yet deployed in production environment. Please refer to further notice for production deployment.

Description

This option allows the user or the calling application to provide bound definition in input of the pricing query, in order to dispatch segments composing the itinerary among a list of bounds. Each bound can be assigned a numeric identifier. Reference of the segments included in each bound must be indicated in input as well. Up to a maximum of 2 bounds can be defined in input. Price at bound level is then returned in the response, only if bound break point coincides with fare break point.

Structure:

-   **pricingOptionKey** = BND
-   **optionDetail**: to indicate bound numeric identifier in the attributeType field
-   **paxSegTstReference**: to select the segments to be included in the bound
-   **monetaryInformation** : used in case of Flight pass to convey coupon values for Limited Flight Pass under BAO type qualifier.

Example: include segment 1 and segment 2 in the first bound and segment 3 in the second bound

## 2.7.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<message agency="1A" release="1" type="TIPNRQ" version="19"> <pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>BND</pricingOptionKey> </pricingOptionKey> <optionDetail> <criteriaDetails> <attributeType>1</attributeType> </criteriaDetails> </optionDetail> <monetaryInformation> <monetaryDetails> <typeQualifier>BAO</typeQualifier> <amount>500</amount> <currency>CAD</currency> </monetaryDetails> </monetaryInformation> <paxSegTstReference> <referenceDetails> <type>S</type> <value>1</value> </referenceDetails> <referenceDetails> <type>S</type> <value>2</value> </referenceDetails> </paxSegTstReference> </pricingOptionGroup> <pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>BND</pricingOptionKey> </pricingOptionKey> <optionDetail> <criteriaDetails> <attributeType>2</attributeType> </criteriaDetails> </optionDetail> <monetaryInformation> <monetaryDetails> <typeQualifier>BAO</typeQualifier> <amount>500</amount> <currency>CAD</currency> </monetaryDetails> </monetaryInformation> <paxSegTstReference> <referenceDetails> <type>S</type> <value>3</value> </referenceDetails> </paxSegTstReference> </pricingOptionGroup> </message>

## 2.8 Sub Structure: pricingOptionGroup - Breakpoint Prohibited

## 2.8.1 Description

Description:  
This option is used to prohibit breakpoint after a given segment.

  
Structure:

![](images/Breakpoint%20prohibited.png)

-   **pricingOptionKey** = NBP (No BreakPoint)
-   **paxSegTstReference** \= reference of the segment after which no breakpoint is expected

  
Example: prohibit breakpoint after segments 2 and 4.

## 2.8.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>NBP</pricingOptionKey> </pricingOptionKey> <paxSegTstReference> <referenceDetails> <type>S</type> <value>2</value> </referenceDetails> <referenceDetails> <type>S</type> <value>4</value> </referenceDetails> </paxSegTstReference> </pricingOptionGroup>

## 2.9 Sub Structure: pricingOptionGroup - Certificate Promotion

## 2.9.1 Description

Description:  
This option is used to trigger the Redemption process using Promotional Certificates.

  
Structure:

![](images/Certificate%20promotion.png)

-   **pricingOptionKey** = PRO (Certificate Promotion)

## 2.9.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>PRO</pricingOptionKey> </pricingOptionKey> </pricingOptionGroup>

## 2.10 Sub Structure: pricingOptionGroup - Companion

## 2.10.1 Description

Description:  
This option is used to specify that a "companion" program is used.

  
Structure:

![](images/Companion.png)

-   **pricingOptionKey** = CMP (Companion)

## 2.10.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>CMP</pricingOptionKey> </pricingOptionKey> </pricingOptionGroup>

## 2.11 Sub Structure: pricingOptionGroup - Connection Flight Indicator

## 2.11.1 Description

Description:  
This option is used to specify that there is a connection between a segment and the next one of the itinerary.

  
Structure:

![](images/Connection%20flight%20indicator.png)

-   **pricingOptionKey** = CON (Connection Flight Indicator)
-   **paxSegTstReference** = reference of the segment(s) for which this option should apply

  
Example: consider segment 4 as being a Connection point.

## 2.11.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>CON</pricingOptionKey> </pricingOptionKey> <paxSegTstReference> <referenceDetails> <type>S</type> <value>4</value> </referenceDetails> </paxSegTstReference> </pricingOptionGroup>

## 2.12 Sub Structure: pricingOptionGroup - Corporate Negotiated fare

## 2.12.1 Description

Description:  
This option is used to price with a corporate negotiated fare.

  
Structure:

![](images/Corporate%20negotiated%20fares.png)

-   **pricingOptionKey** = RC
-   **optionDetail**: the corporate code

  
Example: use corporate negotiated code "012345".

## 2.12.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>RC</pricingOptionKey> </pricingOptionKey> <optionDetail> <criteriaDetails> <attributeType>012345</attributeType> </criteriaDetails> </optionDetail> </pricingOptionGroup>

## 2.13 Sub Structure: pricingOptionGroup - Corporate Recognition Trusted Mode

## 2.13.1 Description

This option is used to provide the "CLID" (Corporate Recognition) number(s) corresponding to the SSR CLID that agent plan to add in the PNR.

This option is dedicated to "CLID" which do not require CSX validation

## 2.13.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>CTM</pricingOptionKey> </pricingOptionKey> <frequentFlyerInformation> <frequentTravellerDetails> <carrier>6X</carrier> <number>123456</number> </frequentTravellerDetails> </frequentFlyerInformation> </pricingOptionGroup>

## 2.14 Sub Structure: pricingOptionGroup - Corporate Unifare

## 2.14.1 Description

Description:  
This option is used to price with a corporate Unifare.

  
Structure:

![](images/Corporate%20unifare.png)

-   **pricingOptionKey** = RW
-   **optionDetail**: the corporate code(s) or number(s)

  
Example: use corporate Unifare number "012345" or code "AMADEUS".

## 2.14.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>RW</pricingOptionKey> </pricingOptionKey> <optionDetail> <criteriaDetails> <attributeType>012345</attributeType> </criteriaDetails> <criteriaDetails> <attributeType>AMADEUS</attributeType> </criteriaDetails> </optionDetail> </pricingOptionGroup>

## 2.15 Sub Structure: pricingOptionGroup - Diagnostic Tool option

## 2.15.1 Description

Description:  
This option is used to request a pricing with diagnostic override option.

  
Structure:

![](images/Diagnostic.png)

-   **pricingOptionKey** = DIA (Diagnostic)
-   **optionDetail**: diagnostic text

## 2.15.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>DIA</pricingOptionKey> </pricingOptionKey> <optionDetail> <criteriaDetails> <attributeType>F-IAPLON</attributeType> </criteriaDetails> </optionDetail> </pricingOptionGroup>

## 2.16 Sub Structure: pricingOptionGroup - Exempt from Taxes

## 2.16.1 Description

Description:  
This option is used to exempt the passenger from one, several or all taxes.

  
Structure:

![](images/Exempt%20from%20taxes%20without%20reason%20code.png)

-   **pricingOptionKey** = ET (Exempt tax)
-   **taxInformation**: detail of tax to exempt (conditional)
    -   taxQualifier: 7
    -   isoCountry: ISO tax code (mandatory)
    -   taxNature: nature code (conditional)

Note: if no tax detail is provided (no "taxInformation"), this means all taxes are exempted.

  
Example: of exemption of tax ZVGO.

## 2.16.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>ET</pricingOptionKey> </pricingOptionKey> <taxInformation> <taxQualifier>7</taxQualifier> <taxType> <isoCountry>ZV</isoCountry> </taxType> <taxNature>GO</taxNature> <taxData> </taxData> </taxInformation> </pricingOptionGroup>

## 2.17 Sub Structure: pricingOptionGroup - Expanded parameters

## 2.17.1 Description

Description:  
This option is used to add additional parameters in a pricing request.

  
Structure:

![](images/Expanded%20parameters.png)

-   **pricingOptionKey** = PRM (expanded PaRaMeters)
-   **optionDetail**: Contains the expanded parameter code(s) (mandatory) in "attributeType"
    
    -   NAP: No Advance Purchase Requirement
    -   NMN: No Minimum Stay Requirement
    -   NMX: No Maximum Stay Requirement
    -   NMM: No Minimum and No Maximum Stay Requirements
    -   NDA: No Day and Time Restrictions
    -   PE: Penalty Restrictions (Penalty limited to "nn" Percent or "nn" Amount)
    -   NPE: No Penalty Restrictions
    -   RF: Refundable
    -   NRF: Non Refundable
    -   EU: ECONOMY UNRESTRICTED ONLY
    -   NR: NO RESTRICTION
    
    -   UBD: Unbundled
    -   BD: Bundled
-   **penDisInformation**: is used only in case parameter "PE" is used. In this case, penDisInformation contains the penalty details:
    -   discountPenaltyQualifier: "700"
    -   function: "704"
    -   amountType: "707" for amount or "708" for percentage
    -   amount: the amount or %

Example: use expanded parameters.

-   refundable (RF)
-   penalty (PE) with an amount of 50

## 2.17.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>PRM</pricingOptionKey> </pricingOptionKey> <optionDetail> <criteriaDetails> <attributeType>PE</attributeType> </criteriaDetails> <criteriaDetails> <attributeType>RF</attributeType> </criteriaDetails> </optionDetail> <penDisInformation> <discountPenaltyQualifier>700</discountPenaltyQualifier> <discountPenaltyDetails> <function>704</function> <amountType>707</amountType> <amount>50</amount> </discountPenaltyDetails> </penDisInformation> </pricingOptionGroup>

## 2.18 Sub Structure: pricingOptionGroup - Fare Basis Force override

## 2.18.1 Description

Description:  
This option is used to force the use of a given fare basis (even if this fare basis is not applicable).  
Note: any TST created following to a pricing request with this option will be flagged as manual.

  
Structure:

![](images/Fare%20basis%20force%20override.png)

-   **pricingOptionKey** = FBL (Fare Basis simple override)
-   **optionDetail**: Fare Basis (mandatory)
-   **paxSegTstReference** = the passenger and/or segment association (conditional)

  
Example: with fare basis "LDLXNSSA" applied to passenger 1 for the itinerary formed by segments 3 and 4.

## 2.18.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>FBL</pricingOptionKey> </pricingOptionKey> <optionDetail> <criteriaDetails> <attributeType>LDLXNSSA</attributeType> </criteriaDetails> </optionDetail> <paxSegTstReference> <referenceDetails> <type>P</type> <value>1</value> </referenceDetails> <referenceDetails> <type>S</type> <value>3</value> </referenceDetails> <referenceDetails> <type>S</type> <value>4</value> </referenceDetails> </paxSegTstReference> </pricingOptionGroup>

## 2.19 Sub Structure: pricingOptionGroup - Fare Basis Simple override

## 2.19.1 Description

Description:  
This option is used to request a specific fare basis. Note, that if the requested fare basis is not applicable, pricing request will be rejected.

  
Structure:

![](images/Fare%20basis%20override%20without%20reason%20codes.png)

-   **pricingOptionKey** = FBA (Fare Basis simple override)
-   **optionDetail**: Fare Basis (mandatory)
-   **paxSegTstReference** = the passenger and/or segment association (conditional)

  
Example: with fare basis "LDLXNSSA" applied to passenger 1 for the itinerary formed by segments 3 and 4.

## 2.19.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>FBA</pricingOptionKey> </pricingOptionKey> <optionDetail> <criteriaDetails> <attributeType>LDLXNSSA</attributeType> </criteriaDetails> </optionDetail> <paxSegTstReference> <referenceDetails> <type>P</type> <value>1</value> </referenceDetails> <referenceDetails> <type>S</type> <value>3</value> </referenceDetails> <referenceDetails> <type>S</type> <value>4</value> </referenceDetails> </paxSegTstReference> </pricingOptionGroup>

## 2.20 Sub Structure: pricingOptionGroup - Fare Currency Override

## 2.20.1 Description

Description:  
This option is used to choose a specific currency at pricing time.

  
Structure:

![](images/Fare%20currency%20override.png)

-   **pricingOptionKey** = FCO (Fare Currency Override)
-   **currency** (mandatory)
    -   currencyQualifier = "FCO"
    -   currencyIsoCode = the 3-letter code of the requested currency

## 2.20.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>FCO</pricingOptionKey> </pricingOptionKey> <currency> <firstCurrencyDetails> <currencyQualifier>FCO</currencyQualifier> <currencyIsoCode>USD</currencyIsoCode> </firstCurrencyDetails> </currency> </pricingOptionGroup>

## 2.21 Sub Structure: pricingOptionGroup - Fare Currency Selection

## 2.21.1 Description

Description:  
This option is used to exclusively target fares that are filled in a specific currency.

  
Structure:

![](images/Fare%20currency%20selection.png)

-   **pricingOptionKey** = FCS (Fare Currency Selection)
-   **currency** (mandatory)
    -   currencyQualifier = "FCS"
    -   currencyIsoCode = the 3-letter code of the requested currency

## 2.21.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>FCS</pricingOptionKey> </pricingOptionKey> <currency> <firstCurrencyDetails> <currencyQualifier>FCS</currencyQualifier> <currencyIsoCode>USD</currencyIsoCode> </firstCurrencyDetails> </currency> </pricingOptionGroup>

## 2.22 Sub Structure: pricingOptionGroup - Flight Pass

## 2.22.1 Description

Flight Passes are a prepaid package of electronic one-way flight credits used for travel within a selected geographic zone during a specific period.

A Flight Pass is comprised of a fixed or unlimited number of flight credits which can be managed online.

Flight pass type:

pricingOptionKey = FLP

attributeDescription = TYPE

attributeDescription = LFP for Limited Flight Pass, UFP for Unlimited Flight Pass or BP for Bonus Pass.

Flight Pass option must be combined with the following options: bound input (BND) and corporate code (RW).

Coupons' values are passed for each bound in case of Limited Flight Pass via bound input option.

## 2.22.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>FLP</pricingOptionKey> </pricingOptionKey> <optionDetail> <criteriaDetails> <attributeType>TYPE</attributeType> <attributeDescription>LFP</attributeDescription> </criteriaDetails> </optionDetail> </pricingOptionGroup>

## 2.23 Sub Structure: pricingOptionGroup - Force Breakpoint

## 2.23.1 Description

Description:  
This option is used to force a breakpoint after a given segment.

  
Structure:

![](images/Force%20breakpoint.png)

-   **pricingOptionKey** = FBP (Force BreakPoint)
-   **paxSegTstReference** \= reference of the segment after which breakpoint is expected

Example: breakpoint forced after segments 2 and 4.

## 2.23.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>FBP</pricingOptionKey> </pricingOptionKey> <paxSegTstReference> <referenceDetails> <type>S</type> <value>2</value> </referenceDetails> <referenceDetails> <type>S</type> <value>4</value> </referenceDetails> </paxSegTstReference> </pricingOptionGroup>

## 2.24 Sub Structure: pricingOptionGroup - Form of payment override

## 2.24.1 Description

Description:  
This option is used to specify the form of payment information to use.

  
Structure:

![](images/Form%20of%20payment%20override.png)

-   **pricingOptionKey** = FOP (Form Of Payment)
-   **formOfPaymentInformation**: Can contain up to 3 forms of payment. For each FOP:
    -   "type" is mandatory. It contains the FOP type (example: CA, CC, and so on).
    -   "amount" is conditional. It contains the amount to be paid with this FOP.  
        Note: if 1 FOP is sent, amount is conditional. If 2 are sent, amount must be provided for 1 or 2 of them. If 3 are sent, amount must be provided for exactly 2 of them.
    -   "creditCardNumber" is mandatory if type "CC", not applicable otherwise. It contains the bin range of the credit card to use.

Example: use a form of payment CC with bin range 400000 for an amount of 10 and the remaining on a FOP CA.

## 2.24.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>FOP</pricingOptionKey> </pricingOptionKey> <formOfPaymentInformation> <formOfPayment> <type>CC</type> <amount>10</amount> <creditCardNumber>400000</creditCardNumber> </formOfPayment> <otherFormOfPayment> <type>CA</type> </otherFormOfPayment> </formOfPaymentInformation> </pricingOptionGroup>

## 2.25 Sub Structure: pricingOptionGroup - Global Route Indicator

## 2.25.1 Description

Description:  
This option is used to give additional information on an itinerary to price.

  
Structure:

![](images/Global%20route%20indicator.png)

-   **pricingOptionKey** = GRI (Global Route Indicator)
-   **optionDetail**: "attributeType" contains a global indicator

  
Example: case of a "round the world" trip.

## 2.25.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>GRI</pricingOptionKey> </pricingOptionKey> <optionDetail> <criteriaDetails> <attributeType>RW</attributeType> </criteriaDetails> </optionDetail> </pricingOptionGroup>

## 2.26 Sub Structure: pricingOptionGroup - Instant Pricing

## 2.26.1 Description

Description:  
This option is used to enter the amount desired to pay for the itinerary.

  
Structure:

![](images/Instant%20pricing.png)

-   **pricingOptionKey** = IP (Instant Pricing)
-   **monetaryInformation**:
    -   typeQualifier = "IPA" (Instant Pricing Amount) or "IPP" (instant pricing percentage)
    -   amount = the amount requested
    -   currency = currency of the amount

  
Example: pricing with an amount of 120.00 USD.

## 2.26.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>IP</pricingOptionKey> </pricingOptionKey> <monetaryInformation> <monetaryDetails> <typeQualifier>IPA</typeQualifier> <amount>120.00</amount> <currency>USD</currency> </monetaryDetails> </monetaryInformation> </pricingOptionGroup>

## 2.27 Sub Structure: pricingOptionGroup - List booking class

## 2.27.1 Description

Description:  
This option is used to search prices in a specific list of booking classes.

  
Structure:

![](images/List%20booking%20class.png)

-   **pricingOptionKey** = LBC (List Booking Class)
-   **optionDetail**: "attributeType" contains the list of classes
-   **paxSegTstReference**: can contain one or several segment tattoos (conditional)

Example: consider only classes A, B, C and D for segments 2, 4 and 5.

## 2.27.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>LBC</pricingOptionKey> </pricingOptionKey> <optionDetail> <criteriaDetails> <attributeType>A</attributeType> </criteriaDetails> <criteriaDetails> <attributeType>B</attributeType> </criteriaDetails> <criteriaDetails> <attributeType>C</attributeType> </criteriaDetails> <criteriaDetails> <attributeType>D</attributeType> </criteriaDetails> </optionDetail> <paxSegTstReference> <referenceDetails> <type>S</type> <value>2</value> </referenceDetails> <referenceDetails> <type>S</type> <value>4</value> </referenceDetails> <referenceDetails> <type>S</type> <value>5</value> </referenceDetails> </paxSegTstReference> </pricingOptionGroup>

## 2.28 Sub Structure: pricingOptionGroup - List of Fare

## 2.28.1 Description

Description:  
This option is used to request a list of available fares.

  
Structure:

![](images/List%20of%20fare.png)

-   **pricingOptionKey** = RLI (Return LIst)

## 2.28.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>RLI</pricingOptionKey> </pricingOptionKey> </pricingOptionGroup>

## 2.29 Sub Structure: pricingOptionGroup - Lowest Applicable Fare

## 2.29.1 Description

Description:  
This option is used to request both the lowest possible fare and the lowest available fare.

  
Structure:

![](images/Lowest%20applicable%20fare.png)

-   **pricingOptionKey** = RLO (Return LOwest)

## 2.29.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>RLO</pricingOptionKey> </pricingOptionKey> </pricingOptionGroup>

## 2.30 Sub Structure: pricingOptionGroup - M/BT fare amount override

## 2.30.1 Description

Description:  
This option is used to request pricing by Bulk (M/BT).

  
Structure:

![](images/M%20BT%20Fare%20amount%20override.png)

-   **pricingOptionKey** = MBT

## 2.30.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>MBT</pricingOptionKey> </pricingOptionKey> </pricingOptionGroup>

## 2.31 Sub Structure: pricingOptionGroup - M/IT fare amount override

## 2.31.1 Description

Description:  
This option is used to request pricing by Inclusive Tour (M/IT).

  
Structure:

![](images/M%20IT%20Fare%20amount%20override.png)

-   **pricingOptionKey** = MIT

## 2.31.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>MIT</pricingOptionKey> </pricingOptionKey> </pricingOptionGroup>

## 2.32 Sub Structure: pricingOptionGroup - Mileage Accrual

## 2.32.1 Description

Description:  
This option is used to request the mileage accrual to be returned.

  
Structure:

![](images/Mileage%20accrual.png)

-   **pricingOptionKey** = MA (Mileage Accrual)

## 2.32.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>MA</pricingOptionKey> </pricingOptionKey> </pricingOptionGroup>

## 2.33 Sub Structure: pricingOptionGroup - Miles and Cash

## 2.33.1 Description

Description:  
This option is used for Miles and Cash pricing.

  
Structure:

![](images/Miles%20and%20Cash%20without%20reason%20code.png)

-   **pricingOptionKey** = MC (Miles and Cash)
-   **monetaryInformation**: optionally, it is possible to use an "instant pricing" option named "Manual Update in points"
    -   typeQualifier = "MUP" (manual update in points)
    -   amount: the amount

Example: with Manual Update of 10000 points.

## 2.33.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>MC</pricingOptionKey> </pricingOptionKey> <monetaryInformation> <monetaryDetails> <typeQualifier>MUP</typeQualifier> <amount>10000</amount> </monetaryDetails> </monetaryInformation> </pricingOptionGroup>

## 2.34 Sub Structure: pricingOptionGroup - Negotiated fare

## 2.34.1 Description

Description:  
This option is used to price with negotiated fares.

  
Structure:

![](images/Negotiated%20fares.png)

-   **pricingOptionKey** = RN

  
Example: use negotiated fares.

## 2.34.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>RN</pricingOptionKey> </pricingOptionKey> </pricingOptionGroup>

## 2.35 Sub Structure: pricingOptionGroup - No Fee

## 2.35.1 Description

Description:  
This option is used to exclude the ticketing fee.

  
Structure:

![](images/No%20Fee.png)

-   **pricingOptionKey** = NF (No Fee)

## 2.35.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>NF</pricingOptionKey> </pricingOptionKey> </pricingOptionGroup>

## 2.36 Sub Structure: pricingOptionGroup - OB Fee

## 2.36.1 Description

Description:  
This option is used to add up to 3 OBFees and/or to exempt up to 3 OBFees.

  
Structure:

![](images/OB%20fees%20without%20reason%20code.png)

-   **pricingOptionKey** = OBF (OBFee)
-   **penDisInformation**: 1 repetition of "discountPenaltyDetails" per fee to add or exempt. For each "discountPenaltyDetails":
    -   discountPenaltyQualifier (M): "OBF"
    -   function (M): "INF" for "Include Fee" or "EXF" for "Exclude Fee"
    -   amountType: "707" (whole amount)
    -   amount: the fee amount
    -   rate: the Fee rate (FCA, T01, …)
    -   currency: the currency of the amount
-   **paxSegTstReference**: can be used to specify a passenger association

  
Example: for passenger 1, include fee "FC1" with an amount of 10 USD and exempt from fee "T01".

## 2.36.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>OBF</pricingOptionKey> </pricingOptionKey> <penDisInformation> <discountPenaltyQualifier>OBF</discountPenaltyQualifier> <discountPenaltyDetails> <function>INF</function> <amountType>707</amountType> <amount>10</amount> <rate>FC1</rate> <currency>USD</currency> </discountPenaltyDetails> <discountPenaltyDetails> <function>EXF</function> <rate>T01</rate> </discountPenaltyDetails> </penDisInformation> <paxSegTstReference> <referenceDetails> <type>P</type> <value>1</value> </referenceDetails> </paxSegTstReference> </pricingOptionGroup>

## 2.37 Sub Structure: pricingOptionGroup - Override Controlling Carrier

## 2.37.1 Description

Description:  
This option allows to override the controlling carrier at pricing time. It is possible to specify only one controlling carrier per pricing entry.

Structure  
![](http://ncegcwiki/wikidoc/wikidoc/images/uml-faaa0bb67259dc59f596f25b6137b9b1-2800f415298c9662463decf6b2ebe565.png)

-   **pricingOptionKey** = OCC
-   **carrierInformation**: contains the controlling carrier code

  
Example: use "6X" as controlling carrier

## 2.37.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>OCC</pricingOptionKey> </pricingOptionKey> <carrierInformation> <companyIdentification> <otherCompany>6X</otherCompany> </companyIdentification> </carrierInformation> </pricingOptionGroup>

## 2.38 Sub Structure: pricingOptionGroup - Passenger PTC/Discount

## 2.38.1 Description

Description:  
This option is used to specify passenger PTC or discount code.

  
Structure:

![](images/Passenger%20PTC%20discount.png)

-   **pricingOptionKey** = PAX
-   **penDisInformation**: used to specify the PTC/Discount code to be used. In case of cumulative discount, discountPenaltyDetails) must be repeated once per PTC/Discount
    -   discountPenaltyQualifier: 701
    -   rate: the PTC/Discount code
-   **paxSegTstReference**: can be used (optional) to specify a passenger and/or segment for which PTC/discount should be applied

  
Example: use cumulative discount codes YTH, AD20 and MIL for passenger 1 on segment 4.

## 2.38.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>PAX</pricingOptionKey> </pricingOptionKey> <penDisInformation> <discountPenaltyQualifier>701</discountPenaltyQualifier> <discountPenaltyDetails> <rate>YTH</rate> </discountPenaltyDetails> <discountPenaltyDetails> <rate>AD20</rate> </discountPenaltyDetails> <discountPenaltyDetails> <rate>MIL</rate> </discountPenaltyDetails> </penDisInformation> <paxSegTstReference> <referenceDetails> <type>P</type> <value>1</value> </referenceDetails> <referenceDetails> <type>S</type> <value>4</value> </referenceDetails> </paxSegTstReference> </pricingOptionGroup>

## 2.39 Sub Structure: pricingOptionGroup - Past Date Pricing

## 2.39.1 Description

Description:  
This option is used to target fares that were applicable on a given date.

  
Structure:

![](images/Past%20Date%20Pricing%20without%20reason%20code.png)

-   **pricingOptionKey** = DAT (Date Override)
-   **dateInformation**: Date

  
Example: pricing using fare that was applicable on 27JUN12.

## 2.39.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>DAT</pricingOptionKey> </pricingOptionKey> <dateInformation> <businessSemantic>DAT</businessSemantic> <dateTime> <year>2012</year> <month>6</month> <day>27</day> </dateTime> </dateInformation> </pricingOptionGroup>

## 2.40 Sub Structure: pricingOptionGroup - Point Of Commencement override

## 2.40.1 Description

Description:  
This option is used to chose the point of Commencement of the Itinerary.

  
Structure  
![](http://rndwww.nce.amadeus.net/wiki/wikidoc/PlantUMLimages/uml-9ddd55b98ac1f133b8f396568711b3a0-1401ca1b9c9e6ae161f837a554f6e329.png)

-   **pricingOptionKey** = POC (Point Of Commencement)
-   **dateInformation**: Date

Note: if the date is not provided, a default date is determined by the system.

-   **locationInformation** :
    -   locationType = "POC"
    -   code = the city code

  
Example: define city "LON" as point of sale

## 2.40.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>POC</pricingOptionKey> </pricingOptionKey> <dateInformation> <businessSemantic>DAT</businessSemantic> <dateTime> <year>2015</year> <month>10</month> <day>01</day> </dateTime> </dateInformation> <locationInformation> <locationType>POC</locationType> <firstLocationDetails> <code>LON</code> </firstLocationDetails> </locationInformation> </pricingOptionGroup>

## 2.41 Sub Structure: pricingOptionGroup - Point Of Sale Override

## 2.41.1 Description

Description:  
This option is used to choose the point of sale to utilise.

  
Structure:

![](images/Point%20of%20sale%20override.png)

-   **pricingOptionKey** = POS (Point Of Sale)
-   **locationInformation** :
    -   locationType = "POS"
    -   code = the city code

  
Example: define city "LON" as point of sale.

## 2.41.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>POS</pricingOptionKey> </pricingOptionKey> <locationInformation> <locationType>POS</locationType> <firstLocationDetails> <code>LON</code> </firstLocationDetails> </locationInformation> </pricingOptionGroup>

## 2.42 Sub Structure: pricingOptionGroup - Point Of Ticketing override

## 2.42.1 Description

Description:  
This option is used to choose the point of sale to use.

  
Structure:

![](images/Point%20of%20ticketing%20override.png)

-   **pricingOptionKey** = POT (Point Of Ticketing)
-   **locationInformation**:
    -   locationType = "POT"
    -   code = the city code

  
Example: define city "LON" as point of ticketing.

## 2.42.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>POT</pricingOptionKey> </pricingOptionKey> <locationInformation> <locationType>POT</locationType> <firstLocationDetails> <code>LON</code> </firstLocationDetails> </locationInformation> </pricingOptionGroup>

## 2.43 Sub Structure: pricingOptionGroup - Point Of Turnaround Flight Indicator

## 2.43.1 Description

Description:  
This option is used to specify that the arrival point of a segment is a Turnaround point in an itinerary.

  
Structure:

![](images/Point%20of%20turnaround%20indicator.png)

-   **pricingOptionKey** = PTA (Point of Turnaround Flight Indicator)
-   **paxSegTstReference**\= reference of the segment(s) for which this option should apply

  
Example: consider segment 4 as being a point of Turnaround.

## 2.43.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>PTA</pricingOptionKey> </pricingOptionKey> <paxSegTstReference> <referenceDetails> <type>S</type> <value>4</value> </referenceDetails> </paxSegTstReference> </pricingOptionGroup>

## 2.44 Sub Structure: pricingOptionGroup - Pricing by Fare Family

## 2.44.1 Description

Description:  
This option is used to choose the fare family requested by passenger. This means only fares belonging to this fare family will be considered.

  
Structure:

![](images/Pricing%20by%20Fare%20Family.png)

-   **pricingOptionKey** = PFF (Pricing by Fare Family)
-   **optionDetail**:
    -   "attributeType" = "FF (fare family)
    -   "attributeDescription": the Fare Family name
-   **paxSegTstReference**: can be used (optional) to specify the segment(s) on which this fare family is expected.

  
Example: choose fare family "ECOFLEX" for segments 2 and 3.

## 2.44.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>PFF</pricingOptionKey> </pricingOptionKey> <optionDetail> <criteriaDetails> <attributeType>FF</attributeType> <attributeDescription>ECOFLEX</attributeDescription> </criteriaDetails> </optionDetail> <paxSegTstReference> <referenceDetails> <type>S</type> <value>2</value> </referenceDetails> <referenceDetails> <type>S</type> <value>3</value> </referenceDetails> </paxSegTstReference> </pricingOptionGroup>

## 2.45 Sub Structure: pricingOptionGroup - Pricing Logic

## 2.45.1 Description

Description:  
This option is used to choose what pricing logic to apply.

  
Structure:

![](images/Pricing%20logic.png)

-   **pricingOptionKey** = PL (Pricing Logic)
-   **optionDetail**: "attributeType": name of the pricing logic to apply ("IATA" or "ATAF")

  
Example: use pricing logic "IATA".

## 2.45.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>PL</pricingOptionKey> </pricingOptionKey> <optionDetail> <criteriaDetails> <attributeType>IATA</attributeType> </criteriaDetails> </optionDetail> </pricingOptionGroup>

## 2.46 Sub Structure: pricingOptionGroup - PSR Override

## 2.46.1 Description

Description:  
This option is used to override the PSR (Price Scheme Reference).

  
Structure:

![](images/PSR%20override.png)

-   **pricingOptionKey** = PSR (PSR override)
-   **optionDetail**: "attributeType": the Price Scheme Reference

  
Example: use PSR 30008.

## 2.46.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>PSR</pricingOptionKey> </pricingOptionKey> <optionDetail> <criteriaDetails> <attributeType>30008</attributeType> </criteriaDetails> </optionDetail> </pricingOptionGroup>

## 2.47 Sub Structure: pricingOptionGroup - PTC only

## 2.47.1 Description

Description:  
This option is used at pricing time to prevent the system from defaulting to default PTC (ADT or INF) in case there is no fare for requested PTC/discount code.

  
Structure:

![](images/PTC%20only.png)

-   **pricingOptionKey** = PTC

## 2.47.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>PTC</pricingOptionKey> </pricingOptionKey> </pricingOptionGroup>

## 2.48 Sub Structure: pricingOptionGroup - Published fare

## 2.48.1 Description

Description:  
This option is used to price with published fares.

  
Structure:

![](images/Published%20fares.png)

-   **pricingOptionKey** = RP

## 2.48.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>RP</pricingOptionKey> </pricingOptionKey> </pricingOptionGroup>

## 2.49 Sub Structure: pricingOptionGroup - Settlement via TCH

## 2.49.1 Description

Description:  
The option indicates that sale will be reported and settled via TCH (Transport Clearing House).

  
Structure:

![](images/Settlement%20via%20TCH.png)

-   **pricingOptionKey** = TCH

## 2.49.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>TCH</pricingOptionKey> </pricingOptionKey> </pricingOptionGroup>

## 2.50 Sub Structure: pricingOptionGroup - Show Baggage Fares

## 2.50.1 Description

Description:  
This function is used to request fares which include a free baggage allowance of at least 1 piece. This option applies at global transaction level.

OptionDetail allows to select the minimum pieces of baggage allowance. Only value 1 is supported.  

 If nothing is specified, the default value is 1. 

Structure

-   **pricingOptionKey** = SBF (Show Baggage Fares)
-   **optionDetail**:
    -    **attributeType** = the minimum number of required baggage items in allowance (only 1 piece is supported)

  
Exemple: request fares that include at least 1 piece of free baggage in allowance.

## 2.50.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>SBF</pricingOptionKey> </pricingOptionKey> <optionDetail> <criteriaDetails> <attributeType>1</attributeType> </criteriaDetails> </optionDetail> </pricingOptionGroup>

## 2.51 Sub Structure: pricingOptionGroup - Stopover Flight Indicator

## 2.51.1 Description

Description:  
This option is used to specify that there is a Stopover between a segment and the next one of the itinerary.

  
Structure:

![](images/Stopover%20indicator.png)

-   **pricingOptionKey** = STO (Stopover Flight Indicator)
-   **paxSegTstReference**\= reference of the segment(s) for which this option should apply

  
Example: consider segment 4 as being a Stopover point.

## 2.51.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>STO</pricingOptionKey> </pricingOptionKey> <paxSegTstReference> <referenceDetails> <type>S</type> <value>4</value> </referenceDetails> </paxSegTstReference> </pricingOptionGroup>

## 2.52 Sub Structure: pricingOptionGroup - Ticket Type

## 2.52.1 Description

Description:  
This option is used to select the type of ticket fare: paper, electronic or both.

  
Structure:

![](images/Ticket%20type.png)

-   **pricingOptionKey** = TKT
-   **optionDetail**/attributeType =
    -   ET for electronic
    -   PT for paper
    -   EP for both

  
Example: with paper fare.

## 2.52.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>TKT</pricingOptionKey> </pricingOptionKey> <optionDetail> <criteriaDetails> <attributeType>PT</attributeType> </criteriaDetails> </optionDetail> </pricingOptionGroup>

## 2.53 Sub Structure: pricingOptionGroup - Transitional Certificate

## 2.53.1 Description

Description:  
This option is used to trigger the Redemption process using Transitional Certificates.

  
Structure:

![](images/Transitional%20certificate.png)

-   **pricingOptionKey** = TRS

## 2.53.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>TRS</pricingOptionKey> </pricingOptionKey> </pricingOptionGroup>

## 2.54 Sub Structure: pricingOptionGroup - Unifares

## 2.54.1 Description

Description:  
This option is used to price with Unifares.

  
Structure:

![](images/Unifares.png)

-   **pricingOptionKey** = RU

## 2.54.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>RU</pricingOptionKey> </pricingOptionKey> </pricingOptionGroup>

## 2.55 Sub Structure: pricingOptionGroup - Validating Carrier override

## 2.55.1 Description

Description:  
This option is used to choose the validating carrier at pricing time.

  
Structure:

![](images/Validating%20carrier%20override.png)

-   **pricingOptionKey** = VC
-   **carrierInformation**: contains the validating carrier

  
Example: use "6X" as validating carrier.

## 2.55.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>VC</pricingOptionKey> </pricingOptionKey> <carrierInformation> <companyIdentification> <otherCompany>6X</otherCompany> </companyIdentification> </carrierInformation> </pricingOptionGroup>

## 2.56 Sub Structure: pricingOptionGroup - Withhold Country Tax

## 2.56.1 Description

Description:  
This option is used to withhold taxes per country code.

  
Structure:

![](images/Add%20Country%20Tax%20without%20reason%20code.png)

-   **pricingOptionKey** = WC (Withhold Country)
-   **taxInformation**: tax detail
    -   taxQualifier: 7 (tax)
    -   isoCountry: country code

  
Example: withhold taxes of coutry FR.

## 2.56.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>WC</pricingOptionKey> </pricingOptionKey> <taxInformation> <taxQualifier>7</taxQualifier> <taxType> <isoCountry>FR</isoCountry> </taxType> </taxInformation> </pricingOptionGroup>

## 2.57 Sub Structure: pricingOptionGroup - Withhold q surcharges

## 2.57.1 Description

Description:  
This option is used to withhold the q surcharges.

  
Structure:

![](images/Withhold%20Q%20surcharge%20without%20reason%20code.png)

-   **pricingOptionKey** = WQ (Withhold Q Surcharge)

## 2.57.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>WQ</pricingOptionKey> </pricingOptionKey> </pricingOptionGroup>

## 2.58 Sub Structure: pricingOptionGroup - Withhold Taxes

## 2.58.1 Description

Description:  
This option is used to withhold one or several taxes.

  
Structure:

![](images/Withhold%20taxes%20without%20reason%20code.png)

-   **pricingOptionKey** = WT (Withhold tax)
-   **taxInformation**: detail of tax to withhold
    -   taxQualifier: 7
    -   isoCountry: ISO tax code (Mandatory)
    -   taxNature: nature code (Conditional)

Note: if no tax detail is provided (no "taxInformation"), this means all taxes are withheld.

If (and only if) the withheld tax is XF airport taxes, it is possible to specify for which airport(s) the tax should be withheld. This can be done 2 ways:

-   **locationInformation**: the airport code for which tax should be withheld can be entered as firstLocationDetails/code
-   **paxSegTstReference**: the segments for which XF tax should be withheld are entered here

Note: it is not possible to specify both a city code (in locationInformation) and a segment (paxSegTstReference) at the same time. User has to choose 1 of the 2 solutions (city or segment selection).

Example: withhold tax XF for the departing airport of segment 4.

## 2.58.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>WT</pricingOptionKey> </pricingOptionKey> <taxInformation> <taxQualifier>7</taxQualifier> <taxType> <isoCountry>XF</isoCountry> </taxType> </taxInformation> <paxSegTstReference> <referenceDetails> <type>S</type> <value>4</value> </referenceDetails> </paxSegTstReference> </pricingOptionGroup>

## 2.59 Sub Structure: pricingOptionGroup - Zap-Off

## 2.59.1 Description

Description:  
This function is used to manually apply a discount to either specified segments or to the whole itinerary.

  
Structure:

![](images/ZappOff%20pricing.png)

-   **pricingOptionKey** = ZAP
-   **penDisInformation**: detail of the Zap-Off to apply
    -   discountPenaltyQualifier: "ZAP"
    -   "function": "700" for Base Fare or "701" for Total Fare (only for Amount Zap-Off, not allowed for percentage Zap-Off)
    -   "amountType": "707" for Amount or "708" for Percentage
    -   "amount": amount or percentage of the Zap-Off
    -   "rate" Ticket Designator
-   **paxSegTstReference**: to select the segments for which Zap-Off is applied

  
Example: apply a Zap-Off of 75% on the base fare and apply ticket designator "CH50" for segments 1 and 2.

## 2.59.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>ZAP</pricingOptionKey> </pricingOptionKey> <penDisInformation> <discountPenaltyQualifier>ZAP</discountPenaltyQualifier> <discountPenaltyDetails> <function>700</function> <amountType>708</amountType> <amount>75</amount> <rate>CH50</rate> </discountPenaltyDetails> </penDisInformation> <paxSegTstReference> <referenceDetails> <type>S</type> <value>1</value> </referenceDetails> <referenceDetails> <type>S</type> <value>2</value> </referenceDetails> </paxSegTstReference> </pricingOptionGroup>

## 2.60 Sub Structure: segmentGroup

## 2.60.1 Description

This group is made of 3 elements, where only segmentInformation is mandatory:

-   segmentInformation: contains the flight details. The mandatory elements there are: Marketing carrier, Flight number, Class of service, Origin and destination airports, date of departure and operational suffix (if any applies to the flight) as well as connection information, when applicable. Note: in the company details must be used the IATA code that identifies the airline.
-   Not providing the operation suffix when one applies to a flight to price would lead to price wrongly.  
    Connection information must be provided, using segment indicators: 
    -   the "flightTypeDetails/flightIndicator" is a group ID.  
        Two flights having the same flightIndicator will be considered as being connected.
    -   the "itemNumber" corresponds to the tattoo of the segment. It must be unique in the message. It is this tattoo number that will be used in the pricingOptionGroup to define segment associations.  
        Note that, if 2 (or more) segments are provided with the same "itemNumber", pricing is rejected with error "DUPLICATE SEGMENT TATTOO".

The other fields of the segmentInformation are optional and should only be used when the need is to override what the system would determine.

-   additionalSegmentDetails: This is an optional segment which should only be used when the need is to override what the system would determine.  
    It contains the equipment code (equipment) of max 3 characters and the number of stops (numberOfStops).
-   inventory: This is an optional segment which should only be used when the need is to override what the system would determine.  
    It contains the availability per class.

When the need is to override what the system would determine, and only in this specific case:

-   If at least one of the optional itinerary data is not present in the request: the process automatically calls the availability server to retrieve all flight details, ignoring all optional information present in the query.
-   Case of Technical stops:
    -   In case the field “numberOfStops” in "additionalSegmentDetails" section is filled with the number "n", that means that the segmentInformation, just before this section, describes the first leg of the trip, and the "n" segmentInformation sections, just after it, represent the next legs.
    -   All the segmentInformation sections representing the different legs, must be filled with all the information needed to prevent Inventory checks (flight departure/arrival dates/times, board and off points, airline code, class of service), otherwise the message will be rejected.
    -   No additionalSegmentDetails should follow the other legs of the trip. Otherwise, it will be considered as a change of gauge, and the Equipment code transported will then be taken into account as new equipment.
    -   The posting levels in "inventory" structure must be provided only for the first leg. If the posting levels are provided for any leg but the first one, the message will be rejected.
-   If all optional data is present in the pricing request, no check is performed on this information (the availability server is not called). Pricing will occur taking into account the provided information. The consistency and integrity of that data falls under the customer's responsibility.

Example:

-   journey SYD/LHR on flights 6X340 (tattoo "1") and 6X341 (tattoo "2"). The 2 flgihts are connected (group ID = "1")
-   return LHR/SYD on 2-leg flight 6X342 (with technical stop at BKK)

## 2.60.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<segmentGroup> <segmentInformation> <flightDate> <departureDate>180309</departureDate> <departureTime>925</departureTime> <arrivalDate>180309</arrivalDate> <arrivalTime>1230</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>SYD</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>BKK</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> <operatingCompany>6X</operatingCompany> </companyDetails> <flightIdentification> <flightNumber>340</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> <flightTypeDetails> <flightIndicator>1</flightIndicator> </flightTypeDetails> <itemNumber>1</itemNumber> </segmentInformation> <additionnalSegmentDetails> <legDetails> <equipment>757</equipment> </legDetails> </additionnalSegmentDetails> <inventory> <bookingClassDetails> <designator>J</designator> <availabilityStatus>9</availabilityStatus> </bookingClassDetails> <bookingClassDetails> <designator>C</designator> <availabilityStatus>9</availabilityStatus> </bookingClassDetails> <bookingClassDetails> <designator>D</designator> <availabilityStatus>9</availabilityStatus> </bookingClassDetails> <bookingClassDetails> <designator>R</designator> <availabilityStatus>9</availabilityStatus> </bookingClassDetails> <bookingClassDetails> <designator>I</designator> <availabilityStatus>9</availabilityStatus> </bookingClassDetails> <bookingClassDetails> <designator>Y</designator> <availabilityStatus>9</availabilityStatus> </bookingClassDetails> <bookingClassDetails> <designator>B</designator> <availabilityStatus>9</availabilityStatus> </bookingClassDetails> <bookingClassDetails> <designator>H</designator> <availabilityStatus>9</availabilityStatus> </bookingClassDetails> <bookingClassDetails> <designator>K</designator> <availabilityStatus>9</availabilityStatus> </bookingClassDetails> <bookingClassDetails> <designator>M</designator> <availabilityStatus>9</availabilityStatus> </bookingClassDetails> <bookingClassDetails> <designator>L</designator> <availabilityStatus>9</availabilityStatus> </bookingClassDetails> <bookingClassDetails> <designator>V</designator> <availabilityStatus>9</availabilityStatus> </bookingClassDetails> <bookingClassDetails> <designator>N</designator> <availabilityStatus>9</availabilityStatus> </bookingClassDetails> <bookingClassDetails> <designator>Q</designator> <availabilityStatus>9</availabilityStatus> </bookingClassDetails> <bookingClassDetails> <designator>O</designator> <availabilityStatus>9</availabilityStatus> </bookingClassDetails> <bookingClassDetails> <designator>S</designator> <availabilityStatus>9</availabilityStatus> </bookingClassDetails> <bookingClassDetails> <designator>G</designator> <availabilityStatus>9</availabilityStatus> </bookingClassDetails> </inventory> </segmentGroup> <segmentGroup> <segmentInformation> <flightDate> <departureDate>180309</departureDate> <departureTime>925</departureTime> <arrivalDate>180309</arrivalDate> <arrivalTime>1230</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>BKK</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>LHR</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> <operatingCompany>6X</operatingCompany> </companyDetails> <flightIdentification> <flightNumber>341</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> <flightTypeDetails> <flightIndicator>1</flightIndicator> </flightTypeDetails> <itemNumber>2</itemNumber> </segmentInformation> <additionnalSegmentDetails> <legDetails> <equipment>757</equipment> </legDetails> </additionnalSegmentDetails> <inventory> <bookingClassDetails> <designator>J</designator> <availabilityStatus>9</availabilityStatus> </bookingClassDetails> <bookingClassDetails> <designator>C</designator> <availabilityStatus>9</availabilityStatus> </bookingClassDetails> <bookingClassDetails> <designator>D</designator> <availabilityStatus>9</availabilityStatus> </bookingClassDetails> <bookingClassDetails> <designator>R</designator> <availabilityStatus>9</availabilityStatus> </bookingClassDetails> <bookingClassDetails> <designator>I</designator> <availabilityStatus>9</availabilityStatus> </bookingClassDetails> <bookingClassDetails> <designator>Y</designator> <availabilityStatus>9</availabilityStatus> </bookingClassDetails> <bookingClassDetails> <designator>B</designator> <availabilityStatus>9</availabilityStatus> </bookingClassDetails> <bookingClassDetails> <designator>H</designator> <availabilityStatus>9</availabilityStatus> </bookingClassDetails> <bookingClassDetails> <designator>K</designator> <availabilityStatus>9</availabilityStatus> </bookingClassDetails> <bookingClassDetails> <designator>M</designator> <availabilityStatus>9</availabilityStatus> </bookingClassDetails> <bookingClassDetails> <designator>L</designator> <availabilityStatus>9</availabilityStatus> </bookingClassDetails> <bookingClassDetails> <designator>V</designator> <availabilityStatus>9</availabilityStatus> </bookingClassDetails> <bookingClassDetails> <designator>N</designator> <availabilityStatus>9</availabilityStatus> </bookingClassDetails> <bookingClassDetails> <designator>Q</designator> <availabilityStatus>9</availabilityStatus> </bookingClassDetails> <bookingClassDetails> <designator>O</designator> <availabilityStatus>9</availabilityStatus> </bookingClassDetails> <bookingClassDetails> <designator>S</designator> <availabilityStatus>9</availabilityStatus> </bookingClassDetails> <bookingClassDetails> <designator>G</designator> <availabilityStatus>9</availabilityStatus> </bookingClassDetails> </inventory> </segmentGroup> <segmentGroup> <segmentInformation> <flightDate> <departureDate>280309</departureDate> <departureTime>925</departureTime> <arrivalDate>280309</arrivalDate> <arrivalTime>1230</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>LHR</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>BKK</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> <operatingCompany>6X</operatingCompany> </companyDetails> <flightIdentification> <flightNumber>342</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> <flightTypeDetails> <flightIndicator>2</flightIndicator> </flightTypeDetails> <itemNumber>3</itemNumber> </segmentInformation> <additionnalSegmentDetails> <legDetails> <equipment>757</equipment> <numberOfStops>1</numberOfStops> </legDetails> </additionnalSegmentDetails> <inventory> <bookingClassDetails> <designator>J</designator> <availabilityStatus>9</availabilityStatus> </bookingClassDetails> <bookingClassDetails> <designator>C</designator> <availabilityStatus>9</availabilityStatus> </bookingClassDetails> <bookingClassDetails> <designator>D</designator> <availabilityStatus>9</availabilityStatus> </bookingClassDetails> <bookingClassDetails> <designator>R</designator> <availabilityStatus>9</availabilityStatus> </bookingClassDetails> <bookingClassDetails> <designator>I</designator> <availabilityStatus>9</availabilityStatus> </bookingClassDetails> <bookingClassDetails> <designator>Y</designator> <availabilityStatus>9</availabilityStatus> </bookingClassDetails> <bookingClassDetails> <designator>B</designator> <availabilityStatus>9</availabilityStatus> </bookingClassDetails> <bookingClassDetails> <designator>H</designator> <availabilityStatus>9</availabilityStatus> </bookingClassDetails> <bookingClassDetails> <designator>K</designator> <availabilityStatus>9</availabilityStatus> </bookingClassDetails> <bookingClassDetails> <designator>M</designator> <availabilityStatus>9</availabilityStatus> </bookingClassDetails> <bookingClassDetails> <designator>L</designator> <availabilityStatus>9</availabilityStatus> </bookingClassDetails> <bookingClassDetails> <designator>V</designator> <availabilityStatus>9</availabilityStatus> </bookingClassDetails> <bookingClassDetails> <designator>N</designator> <availabilityStatus>9</availabilityStatus> </bookingClassDetails> <bookingClassDetails> <designator>Q</designator> <availabilityStatus>9</availabilityStatus> </bookingClassDetails> <bookingClassDetails> <designator>O</designator> <availabilityStatus>9</availabilityStatus> </bookingClassDetails> <bookingClassDetails> <designator>S</designator> <availabilityStatus>9</availabilityStatus> </bookingClassDetails> <bookingClassDetails> <designator>G</designator> <availabilityStatus>9</availabilityStatus> </bookingClassDetails> </inventory> </segmentGroup> <segmentGroup> <segmentInformation> <flightDate> <departureDate>280309</departureDate> <departureTime>1735</departureTime> <arrivalDate>290309</arrivalDate> <arrivalTime>845</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>BKK</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>SYD</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> <operatingCompany>6X</operatingCompany> </companyDetails> <flightIdentification> <flightNumber>342</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> <flightTypeDetails> <flightIndicator>2</flightIndicator> </flightTypeDetails> <itemNumber>4</itemNumber> </segmentInformation> </segmentGroup>

## 3 Receiving A Reply

The Fare\_InformativePricingWithoutPNRReply is mainly formed of a "pricingGroupLevelGroup" repeated up to 99 times.  
Each repetition of the pricingGroupLevelGroup corresponds to a pricing recommendation.

## 3.1 Sub Structure: Binary Structure

## 3.1.1 Description

This structure contains the type of binary information on binaryDescription and the binary on binaryData

## 3.1.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Group> <binaryDescription> <structureType>JSON</structureType> </binaryDescription> <binaryData> <dataLength>192</dataLength> <dataType>B</dataType> <binaryData>eF7zMuFijoyMEmL28QiSYrYws9BicnS2YjM0NTQwtHBiMbA0NPCC8oJYjAwNDKKYzS0svYC6gBqEQFpBuiwhuoxguiyMgbogvCAWQ0NDkC7z8CR2LmZHlxABBhiDEcTw9HMTYMji42AUApohxWZoZGxiatbECBSQ4gIKshlaGpgZWoAEmNAFmJEFAE5FIUM=</binaryData> </binaryData> </Group>

* * *

## 3.2 Sub Structure: Error Group

## 3.2.1 Description

It conveys global errors.

## 3.2.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

* * *

## 3.3 Sub Structure: Fare Component Details Group

## 3.3.1 Description

This structure contains all data returned at fare component level or at bound level. Price at bound level is returned if bound input option has been used in the pricing query and if bound break point coincides with fare break point.

-   fareComponentID: number of the fare component or of the bound
-   marketFareComponent: market associated to the fare component (origin and destination of the fare component)
-   monetaryInformation: monetary information for the fare component or for the bound
-   componentClassInfo: fare basis and ticket designator 
-   fareQualifiersDetail: one-way (756) or round trip (763) or both (BOR).
-   fareFamilyDetails: fare family name
-   fareFamilyOwner: carrier owner of the fare family
-   couponDetailsGroup: the segments of the PNR that the fare component covers or segments included in the bound
-   couponTaxDetailsGroup: the taxes associated to each coupon of each fare component.
    -   taxTriggerInfo: indicator of tax related information (default value is 9)
    -   taxDetails: codes identifying the tax (category, country, types)
    -   monetaryInfo: monetary information for this tax
    -   locationInfo:  type and code of the location for this tax

## 3.3.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<fareComponentDetailsGroup> <fareComponentID> <itemNumberDetails> <number>1</number> <type>FC</type> </itemNumberDetails> </fareComponentID> <marketFareComponent> <boardPointDetails> <trueLocationId>BWI</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>SFO</trueLocationId> </offpointDetails> </marketFareComponent> <monetaryInformation> <monetaryDetails> <typeQualifier>TFC</typeQualifier> <amount>445.58</amount> <currency>USD</currency> </monetaryDetails> </monetaryInformation> <componentClassInfo> <fareBasisDetails> <rateTariffClass>YL</rateTariffClass> </fareBasisDetails> </componentClassInfo> <fareQualifiersDetail> <discountDetails> <fareQualifier>BOR</fareQualifier> </discountDetails> </fareQualifiersDetail> <fareFamilyDetails> <fareFamilyname>ANY</fareFamilyname> </fareFamilyDetails> <fareFamilyOwner> <companyIdentification> <otherCompany>6X</otherCompany> </companyIdentification> </fareFamilyOwner> <couponDetailsGroup> <productId> <referenceDetails> <type>ST</type> <value>1</value> </referenceDetails> </productId> </couponDetailsGroup> <couponDetailsGroup> <productId> <referenceDetails> <type>ST</type> <value>2</value> </referenceDetails> </productId> </couponDetailsGroup> </fareComponentDetailsGroup> <fareComponentDetailsGroup> <fareComponentID> <itemNumberDetails> <number>2</number> <type>FC</type> </itemNumberDetails> </fareComponentID> <marketFareComponent> <boardPointDetails> <trueLocationId>SFO</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>BWI</trueLocationId> </offpointDetails> </marketFareComponent> <monetaryInformation> <monetaryDetails> <typeQualifier>TFC</typeQualifier> <amount>445.58</amount> <currency>USD</currency> </monetaryDetails> </monetaryInformation> <componentClassInfo> <fareBasisDetails> <rateTariffClass>YL</rateTariffClass> </fareBasisDetails> </componentClassInfo> <fareQualifiersDetail> <discountDetails> <fareQualifier>BOR</fareQualifier> </discountDetails> </fareQualifiersDetail> <fareFamilyDetails> <fareFamilyname>ANY</fareFamilyname> </fareFamilyDetails> <fareFamilyOwner> <companyIdentification> <otherCompany>6X</otherCompany> </companyIdentification> </fareFamilyOwner> <couponDetailsGroup> <productId> <referenceDetails> <type>ST</type> <value>3</value> </referenceDetails> </productId> </couponDetailsGroup> <couponDetailsGroup> <productId> <referenceDetails> <type>ST</type> <value>4</value> </referenceDetails> </productId> </couponDetailsGroup> </fareComponentDetailsGroup> <fareComponentDetailsGroup> <fareComponentID> <itemNumberDetails> <number>1</number> <type>BND</type> </itemNumberDetails> </fareComponentID> <monetaryInformation> <monetaryDetails> <typeQualifier>712</typeQualifier> <amount>501.60</amount> <currency>USD</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>TX</typeQualifier> <amount>56.02</amount> <currency>USD</currency> </otherMonetaryDetails> </monetaryInformation> <couponDetailsGroup> <productId> <referenceDetails> <type>ST</type> <value>1</value> </referenceDetails> </productId> </couponDetailsGroup> <couponDetailsGroup> <productId> <referenceDetails> <type>ST</type> <value>2</value> </referenceDetails> </productId> </couponDetailsGroup> </fareComponentDetailsGroup> <fareComponentDetailsGroup> <fareComponentID> <itemNumberDetails> <number>2</number> <type>BND</type> </itemNumberDetails> </fareComponentID> <monetaryInformation> <monetaryDetails> <typeQualifier>712</typeQualifier> <amount>501.60</amount> <currency>USD</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>TX</typeQualifier> <amount>56.02</amount> <currency>USD</currency> </otherMonetaryDetails> </monetaryInformation> <couponDetailsGroup> <productId> <referenceDetails> <type>ST</type> <value>3</value> </referenceDetails> </productId> </couponDetailsGroup> <couponDetailsGroup> <productId> <referenceDetails> <type>ST</type> <value>4</value> </referenceDetails> </productId> <couponTaxDetailsGroup> <taxTriggerInfo> <taxQualifier>9</taxQualifier> </taxTriggerInfo> <taxDetails> <taxCategory>CO</taxCategory> <countryCode>US</countryCode> <type>OL</type> <type>LO</type> </taxDetails> <monetaryInfo> <monetaryDetails> <typeQualifier>POS</typeQualifier> <amount>290</amount> <currency>USD</currency> </monetaryDetails> </monetaryInfo> <locationInfo> <locationType>A</locationType> <locationDescription> <code>BWI</code> </locationDescription> </locationInfo> </couponTaxDetailsGroup> </couponDetailsGroup> </fareComponentDetailsGroup>

* * *

## 3.4 Sub Structure: Fare Info Group

## 3.4.1 Description

## 3.4.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

* * *

## 3.5 Sub Structure: Message Details

## 3.5.1 Description

It conveys use case information. For example:

Use case: 741 “_Itinerary pricing for non-booked segments_”.

Additional function for Best Pricing: 170 “_Lowest fare across classes criteria_”.

## 3.5.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

* * *

## 3.6 Sub Structure: Nego Fare Group

## 3.6.1 Description

-   extNegoFareIndicators
-   negoFareAmount: Amount of the negotiated fares. Value corresponds to the amount of a Fare By Rule (FBR). The type is set to GFE.

## 3.6.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<extNegoFareIndicators> <additionalFareDetails> <pricingGroup>RUHC200</pricingGroup> </additionalFareDetails> <discountDetails> <fareQualifier>749</fareQualifier> <rateCategory>BS</rateCategory> <amount>900.00</amount> </discountDetails> </extNegoFareIndicators> <negoFareAmount> <discountPenaltyDetails> <amountType>GFE</amountType> <amount>978.00</amount> <currency>SAR</currency> </discountPenaltyDetails> </negoFareAmount>

* * *

## 3.7 Sub Structure: offerReferences

## 3.7.1 Description

The offerReferences group contains all the information regarding the offer id.

-   offerId: contains the information regarding the offer Id
-   references\*: contains the information to link the offer ID to a specific passenger(code set P for integrated and PT for standalone), segment (code set S for integrated and ST for standalone) or fare component (FC)

\*At the moment the substructure "references" should not be used.

## 3.7.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<offerReferences> <offerId> <uniqueOfferReference>SULP-15665803935048184713-1-1</uniqueOfferReference> </offerId> </offerReferences>

* * *

## 3.8 Sub Structure: Pricing Group Level

## 3.8.1 Description

Each repetition of this group corresponds to a pricing recommendation.

## 3.8.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingGroupLevelGroup> <numberOfPax> <segmentControlDetails> <quantity>1</quantity> <numberOfUnits>1</numberOfUnits> </segmentControlDetails> </numberOfPax> <passengersID> <travellerDetails> <measurementValue>1</measurementValue> </travellerDetails> </passengersID> <fareInfoGroup> <emptySegment> </emptySegment> <pricingIndicators> <priceTariffType>N</priceTariffType> <productDateTimeDetails> <departureDate>140713</departureDate> </productDateTimeDetails> </pricingIndicators> <fareAmount> <monetaryDetails> <typeQualifier>B</typeQualifier> <amount>25.00</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>E</typeQualifier> <amount>32.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>712</typeQualifier> <amount>232.12</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>OB</typeQualifier> <amount>38.61</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>XOB</typeQualifier> <amount>193.51</amount> <currency>USD</currency> </otherMonetaryDetails> </fareAmount> <textData> <freeTextQualification> <textSubjectQualifier>4</textSubjectQualifier> <informationType>15</informationType> </freeTextQualification> <freeText>01DEC13PAR 6X LON M/IT 6X PAR M/IT END</freeText> </textData> <textData> <freeTextQualification> <textSubjectQualifier>1</textSubjectQualifier> <informationType>1P1</informationType> </freeTextQualification> <freeText>NON-REFUNDABLE</freeText> </textData> <textData> <freeTextQualification> <textSubjectQualifier>1</textSubjectQualifier> <informationType>10</informationType> </freeTextQualification> <freeText>NONREF / NO CHANGE</freeText> </textData> <textData> <freeTextQualification> <textSubjectQualifier>1</textSubjectQualifier> <informationType>36</informationType> </freeTextQualification> <freeText>NONREF /NO CHANGE</freeText> </textData> <textData> <freeTextQualification> <textSubjectQualifier>1</textSubjectQualifier> <informationType>1A49</informationType> </freeTextQualification> <freeText> - SEE ADV PURCHASE</freeText> </textData> <textData> <freeTextQualification> <textSubjectQualifier>1</textSubjectQualifier> <informationType>1A0</informationType> </freeTextQualification> <freeText>AIRLINE FEES INCLUDED</freeText> </textData> <textData> <freeTextQualification> <textSubjectQualifier>1</textSubjectQualifier> <informationType>1A0</informationType> </freeTextQualification> <freeText>CAT35 NEGOTIATED FARES</freeText> </textData> <textData> <freeTextQualification> <textSubjectQualifier>1</textSubjectQualifier> <informationType>1A0</informationType> </freeTextQualification> <freeText>TICKET STOCK RESTRICTION</freeText> </textData> <textData> <freeTextQualification> <textSubjectQualifier>1</textSubjectQualifier> <informationType>1A0</informationType> </freeTextQualification> <freeText>BG CXR: 6X/6X</freeText> </textData> <textData> <freeTextQualification> <textSubjectQualifier>1</textSubjectQualifier> <informationType>1A0</informationType> </freeTextQualification> <freeText>PRICED WITH VALIDATING CARRIER 6X - REPRICE IF DIFFERENT VC</freeText> </textData> <surchargesGroup> <taxesAmount> <taxDetails> <rate>59.21</rate> <countryCode>YR</countryCode> <type>VB</type> </taxDetails> <taxDetails> <rate>16.65</rate> <countryCode>QX</countryCode> <type>AP</type> </taxDetails> <taxDetails> <rate>1.29</rate> <countryCode>IZ</countryCode> <type>EB</type> </taxDetails> <taxDetails> <rate>5.55</rate> <countryCode>FR</countryCode> <type>SE</type> </taxDetails> <taxDetails> <rate>16.41</rate> <countryCode>FR</countryCode> <type>TI</type> </taxDetails> <taxDetails> <rate>19.43</rate> <countryCode>GB</countryCode> <type>AD</type> </taxDetails> <taxDetails> <rate>42.97</rate> <countryCode>UB</countryCode> <type>AS</type> </taxDetails> </taxesAmount> </surchargesGroup> <negoFareGroup> <negoFareIndicators> <itemNumber>6X</itemNumber> <specialCondition>A</specialCondition> <taxCategory>N</taxCategory> </negoFareIndicators> <extNegoFareIndicators> <additionalFareDetails> <pricingGroup>/TM0000</pricingGroup> </additionalFareDetails> <discountDetails> <fareQualifier>749</fareQualifier> <rateCategory>BS</rateCategory> <amount>25</amount> </discountDetails> <discountDetails> <fareQualifier>749</fareQualifier> <rateCategory>ES</rateCategory> <amount>32</amount> </discountDetails> </extNegoFareIndicators> <negoFareText> <freeTextQualification> <textSubjectQualifier>1</textSubjectQualifier> <informationType>701</informationType> </freeTextQualification> <freeText>IT</freeText> </negoFareText> </negoFareGroup> <segmentLevelGroup> <segmentInformation> <flightDate> <departureDate>011213</departureDate> </flightDate> <boardPointDetails> <trueLocationId>CDG</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>LHR</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>1680</flightNumber> <bookingClass>T</bookingClass> <operationalSuffix>X</operationalSuffix> </flightIdentification> <itemNumber>1</itemNumber> </segmentInformation> <additionalInformation> <productDateTimeDetails> <departureDate>011213</departureDate> <arrivalDate>011213</arrivalDate> </productDateTimeDetails> </additionalInformation> <fareBasis> <additionalFareDetails> <rateClass>TWKFR</rateClass> <secondRateClass>T</secondRateClass> </additionalFareDetails> </fareBasis> <cabinGroup> <cabinSegment> <bookingClassDetails> <designator>T</designator> <option>M</option> </bookingClassDetails> </cabinSegment> </cabinGroup> <baggageAllowance> <baggageDetails> <freeAllowance>1</freeAllowance> <quantityCode>N</quantityCode> </baggageDetails> </baggageAllowance> <ptcSegment> <quantityDetails> <numberOfUnit>1</numberOfUnit> <unitQualifier>ADT</unitQualifier> </quantityDetails> </ptcSegment> </segmentLevelGroup> <segmentLevelGroup> <segmentInformation> <flightDate> <departureDate>101213</departureDate> </flightDate> <boardPointDetails> <trueLocationId>LHR</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>CDG</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>1381</flightNumber> <bookingClass>V</bookingClass> <operationalSuffix>X</operationalSuffix> </flightIdentification> <itemNumber>2</itemNumber> </segmentInformation> <additionalInformation> <productDateTimeDetails> <departureDate>101213</departureDate> <arrivalDate>101213</arrivalDate> </productDateTimeDetails> </additionalInformation> <fareBasis> <additionalFareDetails> <rateClass>VRD10FR9</rateClass> <secondRateClass>V</secondRateClass> </additionalFareDetails> </fareBasis> <cabinGroup> <cabinSegment> <bookingClassDetails> <designator>V</designator> <option>M</option> </bookingClassDetails> </cabinSegment> </cabinGroup> <baggageAllowance> <baggageDetails> <freeAllowance>0</freeAllowance> <quantityCode>N</quantityCode> </baggageDetails> </baggageAllowance> <ptcSegment> <quantityDetails> <numberOfUnit>1</numberOfUnit> <unitQualifier>ADT</unitQualifier> </quantityDetails> </ptcSegment> </segmentLevelGroup> <carrierFeeGroup> <feeType> <selectionDetails> <option>OB</option> </selectionDetails> </feeType> <feeDetails> <feeInfo> <dataTypeInformation> <type>T01</type> </dataTypeInformation> </feeInfo> <feeAmounts> <monetaryDetails> <typeQualifier>TIN</typeQualifier> <amount>38.61</amount> <currency>USD</currency> </monetaryDetails> </feeAmounts> <feeDescription> <freeTextQualification> <textSubjectQualifier>COM</textSubjectQualifier> </freeTextQualification> <freeText>TKT FEE</freeText> </feeDescription> </feeDetails> </carrierFeeGroup> <fareComponentDetailsGroup> <fareComponentID> <itemNumberDetails> <number>1</number> </itemNumberDetails> </fareComponentID> <couponDetailsGroup> <productId> <referenceDetails> <type>ST</type> <value>1</value> </referenceDetails> </productId> </couponDetailsGroup> </fareComponentDetailsGroup> <fareComponentDetailsGroup> <fareComponentID> <itemNumberDetails> <number>2</number> </itemNumberDetails> </fareComponentID> <couponDetailsGroup> <productId> <referenceDetails> <type>ST</type> <value>2</value> </referenceDetails> </productId> </couponDetailsGroup> </fareComponentDetailsGroup> </fareInfoGroup> </pricingGroupLevelGroup>

* * *

## 3.9 Sub Structure: Segment Level Group

## 3.9.1 Description

Flight information are conveyed in this group.

-   segment information: it contains departure and arrival dates and times, arrival and destination, carrier, flight number and booking class
-   fare basis: it contains fare basis associated to the flight
-   cabin group: it contains the association between booking class and cabin code
-   baggage allowance: it contains baggage allowance information returned with the fare
-   ptc segment: it contains passenger associationa and passenger type code
-   booking class and trigger class (aka ticketed class), when pricing a Dual Inventory fare, along with their availability and corresponding cabin.

## 3.9.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<segmentLevelGroup> <segmentInformation> <flightDate> <departureDate>011213</departureDate> </flightDate> <boardPointDetails> <trueLocationId>CDG</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>LHR</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>1680</flightNumber> <bookingClass>T</bookingClass> <operationalSuffix>X</operationalSuffix> </flightIdentification> <itemNumber>1</itemNumber> </segmentInformation> <additionalInformation> <productDateTimeDetails> <departureDate>011213</departureDate> <arrivalDate>011213</arrivalDate> </productDateTimeDetails> <idNumber>CH25</idNumber> </additionalInformation> <fareBasis> <additionalFareDetails> <rateClass>TWKFR</rateClass> <secondRateClass>T</secondRateClass> </additionalFareDetails> </fareBasis> <cabinGroup> <cabinSegment> <productDetailsQualifier>ECO</productDetailsQualifier> <bookingClassDetails> <designator>T</designator> <option>M</option> </bookingClassDetails> </cabinSegment> </cabinGroup> <baggageAllowance> <baggageDetails> <freeAllowance>1</freeAllowance> <quantityCode>N</quantityCode> </baggageDetails> <carryOnBaggageDetails> <freeAllowance>1</freeAllowance> <quantityCode>N</quantityCode> </carryOnBaggageDetails> </baggageAllowance> <ptcSegment> <quantityDetails> <numberOfUnit>1</numberOfUnit> <unitQualifier>CH</unitQualifier> </quantityDetails> </ptcSegment> <flightProductInformationType> <cabinProduct> <rbd>B</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <cabinProduct> <rbd>A</rbd> <bookingModifier>T</bookingModifier> <cabin>M</cabin> <avlStatus>3</avlStatus> </cabinProduct> </flightProductInformationType> </segmentLevelGroup>

* * *

## 3.10 Sub Structure: Surcharges Group

## 3.10.1 Description

This structure contains the tax details. It is repeated once per tax.

## 3.10.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>X</taxIdentifier> </taxIdentification> <taxType> <isoCountry>YQ</isoCountry> </taxType> <taxNature>AC</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>109600</fareAmount> <fareCurrency>KRW</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>X</taxIdentifier> </taxIdentification> <taxType> <isoCountry>YQ</isoCountry> </taxType> <taxNature>AD</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>11600</fareAmount> <fareCurrency>KRW</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>X</taxIdentifier> </taxIdentification> <taxType> <isoCountry>BP</isoCountry> </taxType> <taxNature>DP</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>28000</fareAmount> <fareCurrency>KRW</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>X</taxIdentifier> </taxIdentification> <taxType> <isoCountry>TS</isoCountry> </taxType> <taxNature>LA</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>26000</fareAmount> <fareCurrency>KRW</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation>

* * *

## 4 Error Messages

Here are the main error message that can be returned.  
All error messages corresponding to the rejection of the pricing engine (Amadeus Fare Quote) have the number 00911.

**Message**

**Error Number**

**Description**

UNABLE TO PROCESS

00011

Internal process error.

INVALID FORMAT

00477

The data specified in the request is not valid, although the message is correctly defined. Example: Corporate number length is not six digits.

DUPLICATE SEGMENT TATTOO

33395

Same tattoo is given to 2 or more different segments.

NO FARE FOR BOOKING CODE - TRY OTHER PRICING OPTIONS

00911

If the itinerary includes multiple segments AND there are too many rules for system processing OR there is an incorrect booking code.

UNABLE TO FARE - TECHNICAL PROBLEM \*nnnn\*

00911

There is a technical problem on pricing engine side.  
The number indicates the nature of the technical problem.

NO CURRENT FARE IN SYSTEM

00911

There are no valid fares for the itinerary dates requested, based on effective and/or discontinued dates on the fare item.

ISSUE SEPARATE TICKETS - MULTIPLE CURRENCIES APPLY

00911

Returned when the entry includes multiple passenger types AND the fares applicable for each passenger type are filed in different currencies, AND a single currency pricing display (like NON NUC) is valid for the user.  
For example: Travel from Germany to the US with ADT and MIL passengers, when the MIL is in USD and the ADT fare is in DEM.

NO VALID FARE/RULE COMBINATIONS FOR PRICING

00911

All rule categories passed except for Combinability and no other fare is applicable.

NO TICKETABLE VALIDATING CARRIER

00911

There is no ticketable validating carrier.

INVALID REPETITION OF OPTION {xxx}

32634

Option xxx is applied twice.

INVALID ATTRIBUTE FOR OPTION {xxx}

32694

A mandatory attribute is missing or a non-applicable attribute is present for option xxx.

CAN NOT COMBINE OPTIONS {xxx} and {yyy}

32695

Options xxx and yyy are requested, but they cannot be combined in a same pricing.

NO FARES/RBD/CARRIER/PASSENGER TYPE

00911

Different PTC being priced with fares within different fare families and when upsell process is activated in Pricing

## 4.1 Error Reply

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_InformativePricingWithoutPNRReply xmlns="http://xml.amadeus.com/TIPNRR\_19\_3\_1A"> <messageDetails> <messageFunctionDetails> <businessFunction>1</businessFunction> </messageFunctionDetails> </messageDetails> <errorGroup> <errorOrWarningCodeDetails> <errorDetails> <errorCode>00477</errorCode> <errorCategory>EC</errorCategory> <errorCodeOwner>1A</errorCodeOwner> </errorDetails> </errorOrWarningCodeDetails> <errorWarningDescription> <freeTextDetails> <textSubjectQualifier>TXT</textSubjectQualifier> <source>F</source> <encoding>2</encoding> </freeTextDetails> <freeText>INVALID FORMAT</freeText> </errorWarningDescription> </errorGroup> </Fare\_InformativePricingWithoutPNRReply>

  

* * *

## 5 Operations

## 5.1 Operation: InformativePricingWithoutPNR

Here is a complete pricing example of a CDG-LHR-CDG trip for 2 passengers, with options below:

-   take into account published fares (RP)
-   take into account Unifares (RU)
-   use PTC "CH" for passenger 2 (PAX)
-   convert fare into USD (FCO)

## 5.1.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_InformativePricingWithoutPNR xmlns="http://xml.amadeus.com/TIPNRQ\_24\_1\_1A"> <stakeholder> <stakeholderDetails> <role>AGGREGATOR</role> </stakeholderDetails> <companyIdentification> <code>1A</code> </companyIdentification> </stakeholder> <stakeholder> <stakeholderDetails> <role>SELLER</role> </stakeholderDetails> <office> <id>SELKI360F</id> <officeType>T</officeType> </office> </stakeholder> <passengersGroup> <segmentRepetitionControl> <segmentControlDetails> <quantity>1</quantity> <numberOfUnits>2</numberOfUnits> </segmentControlDetails> </segmentRepetitionControl> <travellersID> <travellerDetails> <measurementValue>1</measurementValue> </travellerDetails> <travellerDetails> <measurementValue>2</measurementValue> </travellerDetails> </travellersID> <discountPtc> <valueQualifier>ADT</valueQualifier> </discountPtc> </passengersGroup> <segmentGroup> <segmentInformation> <flightDate> <departureDate>150415</departureDate> <departureTime>0630</departureTime> <arrivalDate>150415</arrivalDate> <arrivalTime>0735</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>CDG</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>ITM</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> <operatingCompany>6X</operatingCompany> </companyDetails> <flightIdentification> <flightNumber>744</flightNumber> <bookingClass>G</bookingClass> </flightIdentification> <flightTypeDetails> <flightIndicator>1</flightIndicator> </flightTypeDetails> <itemNumber>1</itemNumber> </segmentInformation> </segmentGroup> <segmentGroup> <segmentInformation> <flightDate> <departureDate>180415</departureDate> <departureTime>0630</departureTime> <arrivalDate>180415</arrivalDate> <arrivalTime>0740</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>KIX</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>CDG</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> <operatingCompany>6X</operatingCompany> </companyDetails> <flightIdentification> <flightNumber>745</flightNumber> <bookingClass>G</bookingClass> </flightIdentification> <flightTypeDetails> <flightIndicator>1</flightIndicator> </flightTypeDetails> <itemNumber>2</itemNumber> </segmentInformation> </segmentGroup> </Fare\_InformativePricingWithoutPNR>

## 5.1.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_InformativePricingWithoutPNRReply xmlns="http://xml.amadeus.com/TIPNRR\_21\_1\_1A"> <messageDetails> <messageFunctionDetails> <businessFunction>1</businessFunction> <messageFunction>741</messageFunction> <responsibleAgency>1A</responsibleAgency> </messageFunctionDetails> <responseType>A</responseType> </messageDetails> <mainGroup> <dummySegment></dummySegment> <convertionRate> <conversionRateDetails> <rateType>USR</rateType> <dutyTaxFeeType>FR</dutyTaxFeeType> </conversionRateDetails> </convertionRate> <generalIndicatorsGroup> <generalIndicators> <priceTicketDetails> <indicators>I</indicators> </priceTicketDetails> </generalIndicators> </generalIndicatorsGroup> <pricingGroupLevelGroup> <numberOfPax> <segmentControlDetails> <quantity>1</quantity> <numberOfUnits>2</numberOfUnits> </segmentControlDetails> </numberOfPax> <passengersID> <travellerDetails> <measurementValue>1</measurementValue> </travellerDetails> <travellerDetails> <measurementValue>2</measurementValue> </travellerDetails> </passengersID> <fareInfoGroup> <emptySegment></emptySegment> <pricingIndicators> <priceTariffType>I</priceTariffType> <productDateTimeDetails> <departureDate>150415</departureDate> </productDateTimeDetails> <companyDetails> <otherCompany>6X</otherCompany> </companyDetails> </pricingIndicators> <fareAmount> <monetaryDetails> <typeQualifier>B</typeQualifier> <amount>46668</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>712</typeQualifier> <amount>50981</amount> <currency>EUR</currency> </otherMonetaryDetails> </fareAmount> <textData> <freeTextQualification> <textSubjectQualifier>4</textSubjectQualifier> <informationType>15</informationType> </freeTextQualification> <freeText>15APR15CDG 6X OSA233346X CDG23334FRY46668END</freeText> </textData> <textData> <freeTextQualification> <textSubjectQualifier>1</textSubjectQualifier> <informationType>1A0</informationType> </freeTextQualification> <freeText>BG CXR 6X/6X</freeText> </textData> <textData> <freeTextQualification> <textSubjectQualifier>1</textSubjectQualifier> <informationType>1A0</informationType> </freeTextQualification> <freeText>PRICED WITH VALIDATING CARRIER 6X - REPRICE IF DIFFERENT VC</freeText> </textData> <surchargesGroup> <taxesAmount> <taxDetails> <rate>3733</rate> <countryCode>FR</countryCode> <type>AD</type> </taxDetails> <taxDetails> <rate>290</rate> <countryCode>HJ</countryCode> <type>DE</type> </taxDetails> <taxDetails> <rate>290</rate> <countryCode>HJ</countryCode> <type>LO</type> </taxDetails> </taxesAmount> </surchargesGroup> <segmentLevelGroup> <segmentInformation> <flightDate> <departureDate>150415</departureDate> </flightDate> <boardPointDetails> <trueLocationId>CDG</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>ITM</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>744</flightNumber> <bookingClass>G</bookingClass> <operationalSuffix>X</operationalSuffix> </flightIdentification> <itemNumber>1</itemNumber> </segmentInformation> <fareBasis> <additionalFareDetails> <rateClass>YK6X</rateClass> <secondRateClass>G</secondRateClass> </additionalFareDetails> </fareBasis> <cabinGroup> <cabinSegment> <bookingClassDetails> <designator>G</designator> <option>M</option> </bookingClassDetails> </cabinSegment> </cabinGroup> <baggageAllowance> <baggageDetails> <freeAllowance>2</freeAllowance> <quantityCode>N</quantityCode> </baggageDetails> </baggageAllowance> <ptcSegment> <quantityDetails> <numberOfUnit>1</numberOfUnit> <unitQualifier>ADT</unitQualifier> </quantityDetails> </ptcSegment> <flightProductInformationType> <cabinProduct> <rbd>Y</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <cabinProduct> <rbd>V</rbd> <bookingModifier>T</bookingModifier> <cabin>M</cabin> <avlStatus>3</avlStatus> </cabinProduct> </flightProductInformationType> </segmentLevelGroup> <segmentLevelGroup> <segmentInformation> <flightDate> <departureDate>180415</departureDate> </flightDate> <boardPointDetails> <trueLocationId>KIX</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>CDG</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>745</flightNumber> <bookingClass>G</bookingClass> <operationalSuffix>X</operationalSuffix> </flightIdentification> <itemNumber>2</itemNumber> </segmentInformation> <fareBasis> <additionalFareDetails> <rateClass>YK6X</rateClass> <secondRateClass>G</secondRateClass> </additionalFareDetails> </fareBasis> <cabinGroup> <cabinSegment> <bookingClassDetails> <designator>G</designator> <option>M</option> </bookingClassDetails> </cabinSegment> </cabinGroup> <baggageAllowance> <baggageDetails> <freeAllowance>2</freeAllowance> <quantityCode>N</quantityCode> </baggageDetails> </baggageAllowance> <ptcSegment> <quantityDetails> <numberOfUnit>1</numberOfUnit> <unitQualifier>ADT</unitQualifier> </quantityDetails> </ptcSegment> <flightProductInformationType> <cabinProduct> <rbd>Y</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <cabinProduct> <rbd>V</rbd> <bookingModifier>T</bookingModifier> <cabin>M</cabin> <avlStatus>3</avlStatus> </cabinProduct> </flightProductInformationType> </segmentLevelGroup> <fareComponentDetailsGroup> <fareComponentID> <itemNumberDetails> <number>1</number> </itemNumberDetails> </fareComponentID> <marketFareComponent> <boardPointDetails> <trueLocationId>CDG</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>OSA</trueLocationId> </offpointDetails> </marketFareComponent> <monetaryInformation> <monetaryDetails> <typeQualifier>TFC</typeQualifier> <amount>23334</amount> <currency>EUR</currency> </monetaryDetails> </monetaryInformation> <componentClassInfo> <fareBasisDetails> <rateTariffClass>YK6X</rateTariffClass> </fareBasisDetails> </componentClassInfo> <fareQualifiersDetail> <discountDetails> <fareQualifier>BOR</fareQualifier> </discountDetails> </fareQualifiersDetail> <couponDetailsGroup> <productId> <referenceDetails> <type>ST</type> <value>1</value> </referenceDetails> </productId> <couponTaxDetailsGroup> <taxTriggerInfo> <taxQualifier>9</taxQualifier> </taxTriggerInfo> <taxDetails> <taxCategory>CO</taxCategory> <taxDetails> <countryCode>FR</countryCode> <type>FR</type> <type>AD</type> </taxDetails> </taxDetails> <monetaryInfo> <monetaryDetails> <typeQualifier>POS</typeQualifier> <amount>3733</amount> <currency>EUR</currency> </monetaryDetails> </monetaryInfo> <locationInfo> <locationType>J</locationType> </locationInfo> </couponTaxDetailsGroup> <couponTaxDetailsGroup> <taxTriggerInfo> <taxQualifier>9</taxQualifier> </taxTriggerInfo> <taxDetails> <taxCategory>CO</taxCategory> <taxDetails> <countryCode>FR</countryCode> <type>HJ</type> <type>DE</type> </taxDetails> </taxDetails> <monetaryInfo> <monetaryDetails> <typeQualifier>POS</typeQualifier> <amount>290</amount> <currency>EUR</currency> </monetaryDetails> </monetaryInfo> <locationInfo> <locationType>D</locationType> <locationDescription> <code>CDG</code> </locationDescription> </locationInfo> </couponTaxDetailsGroup> </couponDetailsGroup> </fareComponentDetailsGroup> <fareComponentDetailsGroup> <fareComponentID> <itemNumberDetails> <number>2</number> </itemNumberDetails> </fareComponentID> <marketFareComponent> <boardPointDetails> <trueLocationId>OSA</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>CDG</trueLocationId> </offpointDetails> </marketFareComponent> <monetaryInformation> <monetaryDetails> <typeQualifier>TFC</typeQualifier> <amount>23334</amount> <currency>EUR</currency> </monetaryDetails> </monetaryInformation> <componentClassInfo> <fareBasisDetails> <rateTariffClass>YK6X</rateTariffClass> </fareBasisDetails> </componentClassInfo> <fareQualifiersDetail> <discountDetails> <fareQualifier>BOR</fareQualifier> </discountDetails> </fareQualifiersDetail> <couponDetailsGroup> <productId> <referenceDetails> <type>ST</type> <value>2</value> </referenceDetails> </productId> <couponTaxDetailsGroup> <taxTriggerInfo> <taxQualifier>9</taxQualifier> </taxTriggerInfo> <taxDetails> <taxCategory>CO</taxCategory> <taxDetails> <countryCode>FR</countryCode> <type>HJ</type> <type>LO</type> </taxDetails> </taxDetails> <monetaryInfo> <monetaryDetails> <typeQualifier>POS</typeQualifier> <amount>290</amount> <currency>EUR</currency> </monetaryDetails> </monetaryInfo> <locationInfo> <locationType>A</locationType> <locationDescription> <code>CDG</code> </locationDescription> </locationInfo> </couponTaxDetailsGroup> </couponDetailsGroup> </fareComponentDetailsGroup> </fareInfoGroup> </pricingGroupLevelGroup> </mainGroup> </Fare\_InformativePricingWithoutPNRReply>

## 5.1.3 Possible Errors

See "Error Messages" section.

* * *

## 5.2 Operation: Private Leisure and Corporate fare distribution in NDC

Private fares, for example leisure and corporate, are exclusive to certain organization taking part in the transaction, or stakeholder. Stakeholder can be:

_/stakeholder/stakeholderDetails/role_

AGGREGATOR

Entity, platform, or intermediary that collects, organizes, and distributes products, services, or information from multiple sources to consumers, businesses, or other entities

SELLER

Entity that sells the product directly to the end-user and often provides additional services such as customer support

The aggregator is a company identified by a code:

_/stakeholder/companyIdentification/code_

For example 1A for Amadeus.

The seller is identified by its office:

_stakeholder/office_

_stakeholder/office/id_

Pseudo City Code, e.g. NYC6X38AA

_stakeholder/office/iataNumber_

The IATA number of the seller, e.g. 1234567

_stakeholder/office/a__gentType_

The type of agent, A for Airline, T for travel Agent

## 5.2.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_InformativePricingWithoutPNR xmlns="http://xml.amadeus.com/TIPNRQ\_24\_2\_1A"> <stakeholder> <stakeholderDetails> <role>AGGREGATOR</role> </stakeholderDetails> <companyIdentification> <code>1A</code> </companyIdentification> </stakeholder> <stakeholder> <stakeholderDetails> <role>SELLER</role> </stakeholderDetails> <office> <id>SELKI360F</id> <agentType>T</agentType> </office> </stakeholder> <passengersGroup> <segmentRepetitionControl> <segmentControlDetails> <quantity>1</quantity> <numberOfUnits>2</numberOfUnits> </segmentControlDetails> </segmentRepetitionControl> <travellersID> <travellerDetails> <measurementValue>1</measurementValue> </travellerDetails> <travellerDetails> <measurementValue>2</measurementValue> </travellerDetails> </travellersID> <discountPtc> <valueQualifier>ADT</valueQualifier> </discountPtc> </passengersGroup> <segmentGroup> <segmentInformation> <flightDate> <departureDate>150415</departureDate> <departureTime>0630</departureTime> <arrivalDate>150415</arrivalDate> <arrivalTime>0735</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>CDG</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>ITM</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> <operatingCompany>6X</operatingCompany> </companyDetails> <flightIdentification> <flightNumber>744</flightNumber> <bookingClass>G</bookingClass> </flightIdentification> <flightTypeDetails> <flightIndicator>1</flightIndicator> </flightTypeDetails> <itemNumber>1</itemNumber> </segmentInformation> </segmentGroup> <segmentGroup> <segmentInformation> <flightDate> <departureDate>180415</departureDate> <departureTime>0630</departureTime> <arrivalDate>180415</arrivalDate> <arrivalTime>0740</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>KIX</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>CDG</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> <operatingCompany>6X</operatingCompany> </companyDetails> <flightIdentification> <flightNumber>745</flightNumber> <bookingClass>G</bookingClass> </flightIdentification> <flightTypeDetails> <flightIndicator>1</flightIndicator> </flightTypeDetails> <itemNumber>2</itemNumber> </segmentInformation> </segmentGroup> </Fare\_InformativePricingWithoutPNR>

## 5.2.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_InformativePricingWithoutPNRReply xmlns="http://xml.amadeus.com/TIPNRR\_24\_2\_1A"> <messageDetails> <messageFunctionDetails> <businessFunction>1</businessFunction> <messageFunction>741</messageFunction> <responsibleAgency>1A</responsibleAgency> </messageFunctionDetails> <responseType>A</responseType> </messageDetails> <mainGroup> <dummySegment></dummySegment> <convertionRate> <conversionRateDetails> <rateType>USR</rateType> <dutyTaxFeeType>FR</dutyTaxFeeType> </conversionRateDetails> </convertionRate> <generalIndicatorsGroup> <generalIndicators> <priceTicketDetails> <indicators>I</indicators> </priceTicketDetails> </generalIndicators> </generalIndicatorsGroup> <pricingGroupLevelGroup> <numberOfPax> <segmentControlDetails> <quantity>1</quantity> <numberOfUnits>2</numberOfUnits> </segmentControlDetails> </numberOfPax> <passengersID> <travellerDetails> <measurementValue>1</measurementValue> </travellerDetails> <travellerDetails> <measurementValue>2</measurementValue> </travellerDetails> </passengersID> <fareInfoGroup> <emptySegment></emptySegment> <pricingIndicators> <priceTariffType>I</priceTariffType> <productDateTimeDetails> <departureDate>150415</departureDate> </productDateTimeDetails> <companyDetails> <otherCompany>6X</otherCompany> </companyDetails> </pricingIndicators> <fareAmount> <monetaryDetails> <typeQualifier>B</typeQualifier> <amount>46668</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>712</typeQualifier> <amount>50981</amount> <currency>EUR</currency> </otherMonetaryDetails> </fareAmount> <textData> <freeTextQualification> <textSubjectQualifier>4</textSubjectQualifier> <informationType>15</informationType> </freeTextQualification> <freeText>15APR15CDG 6X OSA233346X CDG23334FRY46668END</freeText> </textData> <textData> <freeTextQualification> <textSubjectQualifier>1</textSubjectQualifier> <informationType>1A0</informationType> </freeTextQualification> <freeText>BG CXR 6X/6X</freeText> </textData> <textData> <freeTextQualification> <textSubjectQualifier>1</textSubjectQualifier> <informationType>1A0</informationType> </freeTextQualification> <freeText>PRICED WITH VALIDATING CARRIER 6X - REPRICE IF DIFFERENT VC</freeText> </textData> <surchargesGroup> <taxesAmount> <taxDetails> <rate>3733</rate> <countryCode>FR</countryCode> <type>AD</type> </taxDetails> <taxDetails> <rate>290</rate> <countryCode>HJ</countryCode> <type>DE</type> </taxDetails> <taxDetails> <rate>290</rate> <countryCode>HJ</countryCode> <type>LO</type> </taxDetails> </taxesAmount> </surchargesGroup> <segmentLevelGroup> <segmentInformation> <flightDate> <departureDate>150415</departureDate> </flightDate> <boardPointDetails> <trueLocationId>CDG</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>ITM</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>744</flightNumber> <bookingClass>G</bookingClass> <operationalSuffix>X</operationalSuffix> </flightIdentification> <itemNumber>1</itemNumber> </segmentInformation> <fareBasis> <additionalFareDetails> <rateClass>YK6X</rateClass> <secondRateClass>G</secondRateClass> </additionalFareDetails> </fareBasis> <cabinGroup> <cabinSegment> <bookingClassDetails> <designator>G</designator> <option>M</option> </bookingClassDetails> </cabinSegment> </cabinGroup> <baggageAllowance> <baggageDetails> <freeAllowance>2</freeAllowance> <quantityCode>N</quantityCode> </baggageDetails> </baggageAllowance> <ptcSegment> <quantityDetails> <numberOfUnit>1</numberOfUnit> <unitQualifier>ADT</unitQualifier> </quantityDetails> </ptcSegment> <flightProductInformationType> <cabinProduct> <rbd>Y</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <cabinProduct> <rbd>V</rbd> <bookingModifier>T</bookingModifier> <cabin>M</cabin> <avlStatus>3</avlStatus> </cabinProduct> </flightProductInformationType> </segmentLevelGroup> <segmentLevelGroup> <segmentInformation> <flightDate> <departureDate>180415</departureDate> </flightDate> <boardPointDetails> <trueLocationId>KIX</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>CDG</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>745</flightNumber> <bookingClass>G</bookingClass> <operationalSuffix>X</operationalSuffix> </flightIdentification> <itemNumber>2</itemNumber> </segmentInformation> <fareBasis> <additionalFareDetails> <rateClass>YK6X</rateClass> <secondRateClass>G</secondRateClass> </additionalFareDetails> </fareBasis> <cabinGroup> <cabinSegment> <bookingClassDetails> <designator>G</designator> <option>M</option> </bookingClassDetails> </cabinSegment> </cabinGroup> <baggageAllowance> <baggageDetails> <freeAllowance>2</freeAllowance> <quantityCode>N</quantityCode> </baggageDetails> </baggageAllowance> <ptcSegment> <quantityDetails> <numberOfUnit>1</numberOfUnit> <unitQualifier>ADT</unitQualifier> </quantityDetails> </ptcSegment> <flightProductInformationType> <cabinProduct> <rbd>Y</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <cabinProduct> <rbd>V</rbd> <bookingModifier>T</bookingModifier> <cabin>M</cabin> <avlStatus>3</avlStatus> </cabinProduct> </flightProductInformationType> </segmentLevelGroup> <fareComponentDetailsGroup> <fareComponentID> <itemNumberDetails> <number>1</number> </itemNumberDetails> </fareComponentID> <marketFareComponent> <boardPointDetails> <trueLocationId>CDG</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>OSA</trueLocationId> </offpointDetails> </marketFareComponent> <monetaryInformation> <monetaryDetails> <typeQualifier>TFC</typeQualifier> <amount>23334</amount> <currency>EUR</currency> </monetaryDetails> </monetaryInformation> <componentClassInfo> <fareBasisDetails> <rateTariffClass>YK6X</rateTariffClass> </fareBasisDetails> </componentClassInfo> <fareQualifiersDetail> <discountDetails> <fareQualifier>BOR</fareQualifier> </discountDetails> </fareQualifiersDetail> <couponDetailsGroup> <productId> <referenceDetails> <type>ST</type> <value>1</value> </referenceDetails> </productId> <couponTaxDetailsGroup> <taxTriggerInfo> <taxQualifier>9</taxQualifier> </taxTriggerInfo> <taxDetails> <taxCategory>CO</taxCategory> <taxDetails> <countryCode>FR</countryCode> <type>FR</type> <type>AD</type> </taxDetails> </taxDetails> <monetaryInfo> <monetaryDetails> <typeQualifier>POS</typeQualifier> <amount>3733</amount> <currency>EUR</currency> </monetaryDetails> </monetaryInfo> <locationInfo> <locationType>J</locationType> </locationInfo> </couponTaxDetailsGroup> <couponTaxDetailsGroup> <taxTriggerInfo> <taxQualifier>9</taxQualifier> </taxTriggerInfo> <taxDetails> <taxCategory>CO</taxCategory> <taxDetails> <countryCode>FR</countryCode> <type>HJ</type> <type>DE</type> </taxDetails> </taxDetails> <monetaryInfo> <monetaryDetails> <typeQualifier>POS</typeQualifier> <amount>290</amount> <currency>EUR</currency> </monetaryDetails> </monetaryInfo> <locationInfo> <locationType>D</locationType> <locationDescription> <code>CDG</code> </locationDescription> </locationInfo> </couponTaxDetailsGroup> </couponDetailsGroup> </fareComponentDetailsGroup> <fareComponentDetailsGroup> <fareComponentID> <itemNumberDetails> <number>2</number> </itemNumberDetails> </fareComponentID> <marketFareComponent> <boardPointDetails> <trueLocationId>OSA</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>CDG</trueLocationId> </offpointDetails> </marketFareComponent> <monetaryInformation> <monetaryDetails> <typeQualifier>TFC</typeQualifier> <amount>23334</amount> <currency>EUR</currency> </monetaryDetails> </monetaryInformation> <componentClassInfo> <fareBasisDetails> <rateTariffClass>YK6X</rateTariffClass> </fareBasisDetails> </componentClassInfo> <fareQualifiersDetail> <discountDetails> <fareQualifier>BOR</fareQualifier> </discountDetails> </fareQualifiersDetail> <couponDetailsGroup> <productId> <referenceDetails> <type>ST</type> <value>2</value> </referenceDetails> </productId> <couponTaxDetailsGroup> <taxTriggerInfo> <taxQualifier>9</taxQualifier> </taxTriggerInfo> <taxDetails> <taxCategory>CO</taxCategory> <taxDetails> <countryCode>FR</countryCode> <type>HJ</type> <type>LO</type> </taxDetails> </taxDetails> <monetaryInfo> <monetaryDetails> <typeQualifier>POS</typeQualifier> <amount>290</amount> <currency>EUR</currency> </monetaryDetails> </monetaryInfo> <locationInfo> <locationType>A</locationType> <locationDescription> <code>CDG</code> </locationDescription> </locationInfo> </couponTaxDetailsGroup> </couponDetailsGroup> </fareComponentDetailsGroup> </fareInfoGroup> </pricingGroupLevelGroup> </mainGroup> </Fare\_InformativePricingWithoutPNRReply>

## 5.2.3 Possible Errors

See "Error Messages" section.

* * *