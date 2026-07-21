---
url: "https://developers.amadeus.com/api-library/soap/functional-doc/79/doc-read/139970?serviceVersion=23.2"
download_url: "https://developers.amadeus.com/PAS-EAS/api/download/comp/4d4ad2cb456c02633f463a055ab70584/139970/upload_8079047864482188476.html"
title: "HTML_UG_WBS_Fare_PricePNRWithLowestFare_TPLPRQ_23.2_002"
source: "amadeus"
service_id: "79"
service_name: "Fare_PricePNRWithLowestFare"
version: "23.2"
document_id: "139970"
doc_version: "23.2"
doc_type: "User guide"
scraped_at: "2026-07-15T10:14:10.065Z"
---
# Function: Fare\_PricePNRWithLowestFare

* * *

## 1 Overview

The function Fare\_PricePNRWithLowestFares is used to display the lowest possible fare for a given itinerary.  
"Lowest possible" means that availability of the different booking classes have not been taken into account when searching for the lowest price. As a result, it might not be possible to rebook the passengers of the PNR in this booking class due to insufficient availability.

## 1.1 Supported Operations

Return the absolute lowest fare, even if this fare is not possible due to lack of availability.

## 1.2 Limitations

-   The Fare\_PricePNRWithLowestFares function cannot process a non-homogeneous PNR. For instance, a PNR where the number of passengers in the PNR is different from the number of seats booked in the flight segment of the itinerary cannot be priced with this function.
-   Married segments cannot be priced separately.
-   A round or circle trip cannot contain more than 12 segments and a maximum of  
    -   11 fare break points without surface segments
    -   10 fare break points with 1 surface segment
    -   9 fare break points with 2 surface segments
-   A one-way trip cannot contain more than 11 segments and a maximum of  
    -   10 fare break points without surface segments
    -   9 fare break points with 1 surface segment
    -   8 fare break points with 2 surface segments

## 1.3 Unsupported Operations

None

## 1.4 Prerequisites

A PNR must be retrieved prior to performing the pricing transaction.

## 2 Building A Query

The Fare\_PricePNRWithLowestFares query is made of one group "pricingOptionGroup", that is repeated 1 to 999 times.

## 2.1 Sub Structure: pricingOptionGroup

## 2.1.1 Description

**Principle of the "pricingOptionGroup":**  
A pricing option is made of several elements:

-   mandatory: a name
-   optional: 1 or more attribute(s)
-   optional: 1 or more association(s) (passenger, segement, and so on.)

Example: For pricing by fare basis, the attribute is the Fare Basis, and both passenger and segment associations are supported.

-   Name = FBA (Fare Basis simple override)
-   Attribute: the Fare Basis
-   Association: the segment/passenger the fare basis should apply to.

The structure of the pricing Option Group is designed to reflect this. It allows to enter, for each option, the name of the option, the applicable attributes (in dedicated segments) and association.  
The group is to be repeated once per applicable pricing option.

Structure:

![](images/POPT%20group%20structure.png)

**Usage of the "pricingOptionGroup" in this function:**  
The option group is repeated once per option to use with the rules below:

-   A same Pricing Option Key cannot be used twice with the same association. Such an attempt is rejected with error message "INVALID REPETITION OF OPTION {xxx}", where {xxx} is the pricingOptionKey of the option that is wrongly repeated.  
    For example, to add 2 taxes, it is not allowed to repeat twice the pricingOptionGroup with the pricingOptionKey "AT" (for "add taxes"), once with each tax to add. Instead, use 1 pricingOptionGroup with pricingOptionKey set to "AT" and repeat twice the taxInformation.
-   If a repetition of the pricing option group has an invalid attribute (example: mandatory data that is missing, or non-applicable attribute that is present), query will be rejected with error message "INVALID ATTRIBUTE FOR OPTION {xxx}", where {xxx} is the pricingOptionKey of the option for which there is an invalid attribute.
-   Some options cannot be combined. For example, it is not possible to use options "Pricing by Fare Basis" and "Pricing by Fare Family" in the same pricing request. In case a pricing request contains 2 invalid pricing options, query is rejected with error message "CAN NOT COMBINE OPTIONS {xxx} and {yyy}", where {xxx} and {yyy} are the pricingOptionKey of the non-combinable options.
-   If there is a duplicate passenger and/or segment selection, the query will be rejected with "DUPLICATE PASSENGER/SEGMENT SELECTION".
-   If there is a duplicate TST selection, the query will be rejected with "DUPLICATE TST SELECTION".

  
Note, that the passenger/segment association are not based on the numbers as they are displayed on the PNR, but on the passenger and segment "tattoo".

## 2.1.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 2.2 Sub Structure: pricingOptionGroup - Add Country Tax

## 2.2.1 Description

Description:  
This option is used to add tax per country code.

  
Structure:

![](images/Add%20Country%20Tax%20without%20reason%20code.png)

-   **pricingOptionKey** = AC (Add Country)
-   **taxInformation**: tax detail:
    -   taxQualifier: 7 (tax)
    -   isoCountry: country code

  
Example: add taxes of country FR.

## 2.2.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>AC</pricingOptionKey> </pricingOptionKey> <taxInformation> <taxQualifier>7</taxQualifier> <taxType> <isoCountry>FR</isoCountry> </taxType> <taxData> </taxData> </taxInformation> </pricingOptionGroup>

## 2.3 Sub Structure: pricingOptionGroup - Add Tax

## 2.3.1 Description

Description:  
This option is used to add tax per ISO tax code.

  
Structure:

![](images/Add%20Tax%20without%20reason%20code.png)

-   **pricingOptionKey** = AT (Add Tax)
-   **taxInformation**: tax detail:
    -   taxQualifier: 7 (tax)
    -   isoCountry: ISO tax code (M)
    -   taxNature: nature code
    -   taxRate: amount or percentage to add
    -   taxValueQualifier: A for Amount or P for Percentage

Note: addition of several taxes can be done by repeating the "taxInformation" as many times as necessary.

  
Example:

-   addition of tax ZVGO with an amount of 50
-   addition of tax FR with an amount of 10 percent of the base fare

## 2.3.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>AT</pricingOptionKey> </pricingOptionKey> <taxInformation> <taxQualifier>7</taxQualifier> <taxType> <isoCountry>ZV</isoCountry> </taxType> <taxNature>GO</taxNature> <taxData> <taxRate>50</taxRate> <taxValueQualifier>A</taxValueQualifier> </taxData> </taxInformation> <taxInformation> <taxQualifier>7</taxQualifier> <taxType> <isoCountry>FR</isoCountry> </taxType> <taxData> <taxRate>10</taxRate> <taxValueQualifier>P</taxValueQualifier> </taxData> </taxInformation> </pricingOptionGroup>

## 2.4 Sub Structure: pricingOptionGroup - Award Pricing

## 2.4.1 Description

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

## 2.4.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>AWD</pricingOptionKey> </pricingOptionKey> <carrierInformation> <companyIdentification> <otherCompany>6X</otherCompany> </companyIdentification> </carrierInformation> <frequentFlyerInformation> <frequentTravellerDetails> <tierLevel>GOLD</tierLevel> </frequentTravellerDetails> </frequentFlyerInformation> </pricingOptionGroup> <pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>RW</pricingOptionKey> </pricingOptionKey> <optionDetail> <criteriaDetails> <attributeType>012345</attributeType> </criteriaDetails> <criteriaDetails> <attributeType>456789</attributeType> </criteriaDetails> </optionDetail> </pricingOptionGroup>

## 2.5 Sub Structure: pricingOptionGroup - Booking date Override

## 2.5.1 Description

Description:  
This option is used to override the booking date with a given date or the pricing date.

  
Structure:

![](images/Booking%20date%20override.png)

-   **pricingOptionKey** = DO (Booking Date Override)
-   **dateInformation**: Booking date (optional)

  
Example: booking date override with date 27JUN13.

## 2.5.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>DO</pricingOptionKey> </pricingOptionKey> <dateInformation> <businessSemantic>DO</businessSemantic> <dateTime> <year>2013</year> <month>6</month> <day>27</day> </dateTime> </dateInformation> </pricingOptionGroup>

## 2.6 Sub Structure: pricingOptionGroup - Bound Input

## 2.6.1 Description

Disclaimer

The ''bound input'' functionality is not yet deployed in production environment. Please refer to further notice for production deployment.

Description  
  
This option allows the user or the calling application to provide bound definition in input of the pricing query, in order to dispatch segments composing the itinerary among a list of bounds. Each bound can be assigned a numeric identifier. Reference of the segments included in each bound must be indicated in input as well. Up to a maximum of 2 bounds can be defined in input. Price at bound level is then returned in the response, only if bound break point coincides with fare break point.

Structure:

![](images/Bound%20Input.png)

-   **pricingOptionKey** = BND
-   **optionDetai**l: to indicate bound numeric identifier in the attributeType field
-   **paxSegTstReference**: to select the segments to be included in the bound

Example: include segment 1 and segment 2 in the first bound and segment 3 in the second bound.

  

## 2.6.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>BND</pricingOptionKey> </pricingOptionKey> <optionDetail> <criteriaDetails> <attributeType>1</attributeType> </criteriaDetails> </optionDetail> <paxSegTstReference> <referenceDetails> <type>S</type> <value>1</value> </referenceDetails> <referenceDetails> <type>S</type> <value>2</value> </referenceDetails> </paxSegTstReference> </pricingOptionGroup> <pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>BND</pricingOptionKey> </pricingOptionKey> <optionDetail> <criteriaDetails> <attributeType>2</attributeType> </criteriaDetails> </optionDetail> <paxSegTstReference> <referenceDetails> <type>S</type> <value>3</value> </referenceDetails> </paxSegTstReference> </pricingOptionGroup>

## 2.7 Sub Structure: pricingOptionGroup - Breakpoint Prohibited

## 2.7.1 Description

Description:  
This option is used to prohibit breakpoint after a given segment.

  
Structure:

![](images/Breakpoint%20prohibited.png)

-   **pricingOptionKey** = NBP (No BreakPoint)
-   **paxSegTstReference**\= reference of the segment after which no breakpoint is expected

  
Example: prohibit breakpoint after segments 2 and 4.

## 2.7.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>NBP</pricingOptionKey> </pricingOptionKey> <paxSegTstReference> <referenceDetails> <type>S</type> <value>2</value> </referenceDetails> <referenceDetails> <type>S</type> <value>4</value> </referenceDetails> </paxSegTstReference> </pricingOptionGroup>

## 2.8 Sub Structure: pricingOptionGroup - Cabin Options

## 2.8.1 Description

Description:  
These options are used to choose the cabin(s) in which a price search is done.

  
Structure:

![](images/Cabin%20option.png)

-   **pricingOptionKey** = CAB (Cabin)
-   **optionDetail**: detail of cabin(s) to use

  
**Original Cabin Option**

Functional meaning: Search only in the original cabin (the one from the segment)

  
Structure: of the optionDetail/criteriaDetails:

-   attributeType\= K (default)

  
**First cabin**

  
Functional meaning: Search only in the cabin(s) provided as "first cabin".

  
Structure: of the optionDetail/criteriaDetails:

-   attributeType\= FC (First Cabin)
-   attributeDescription = list of the cabin code(s).

  
**Second cabin**

  
Functional meaning: Search first in the cabin(s) provided as "first cabin", then in the cabin(s) provided as "second cabin"  
Note: must be used together with the "first cabin".

  
Structure: of the optionDetail/criteriaDetails:

-   attributeType\= SC (Second Cabin)
-   attributeDescription = list of the cabin code(s)

**Third cabin**

Functional meaning: Search first in the cabin(s) provided as "first cabin", then in the cabin(s) provided as "second cabin", and finally, in the cabin(s) provided as "third cabin".  
Note: must be used together with the "first cabin" and "second cabin".

  
Structure: of the optionDetail/criteriaDetails:

-   attributeType\= TC (Third Cabin)
-   attributeDescription = list of the cabin code(s)

**Default cabin**

  
Functional meaning: In case no fare is found in the cabin(s) provided with above option, defaults to any cabin.

  
Structure: of the optionDetail/criteriaDetails:

-   attributeType\= P (Plus)

  
Example: search in cabin F first, then in cabin C and finally in any cabin.

## 2.8.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>CAB</pricingOptionKey> </pricingOptionKey> <optionDetail> <criteriaDetails> <attributeType>FC</attributeType> <attributeDescription>F</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>SC</attributeType> <attributeDescription>C</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>P</attributeType> </criteriaDetails> </optionDetail> </pricingOptionGroup>

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
This option is used to specify there is a connection between a segment and the next one of the itinerary.

  
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

## 2.13 Sub Structure: pricingOptionGroup - Corporate Unifare

## 2.13.1 Description

Description:  
This option is used to price with a corporate Unifare.

  
Structure:

![](images/Corporate%20unifare.png)

-   **pricingOptionKey** = RW
-   **optionDetail**: the corporate code(s) or number(s)

  
Example: use corporate Unifare number "012345" or code "AMADEUS".

## 2.13.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>RW</pricingOptionKey> </pricingOptionKey> <optionDetail> <criteriaDetails> <attributeType>012345</attributeType> </criteriaDetails> <criteriaDetails> <attributeType>AMADEUS</attributeType> </criteriaDetails> </optionDetail> </pricingOptionGroup>

## 2.14 Sub Structure: pricingOptionGroup - Corporation Number

## 2.14.1 Description

Description:  
This option is used to specify the corporation number of the company the passenger belongs to.

  
Structure:

![](images/Corporation%20number.png)

-   **pricingOptionKey** = CRP (Corporation Number)
-   **optionDetail**: The Corporation Number

  
Example: use the corporation number "48906348860".

## 2.14.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>CRP</pricingOptionKey> </pricingOptionKey> <optionDetail> <criteriaDetails> <attributeType>48906348860</attributeType> </criteriaDetails> </optionDetail> </pricingOptionGroup>

## 2.15 Sub Structure: pricingOptionGroup - Exempt from Taxes

## 2.15.1 Description

Description:  
This option is used to exempt the passenger from one, several or all taxes.

  
Structure:

![](images/Exempt%20from%20taxes%20without%20reason%20code.png)

-   **pricingOptionKey** = ET (Exempt Tax)
-   **taxInformation**: detail of tax to exempt (conditional)
    -   taxQualifier: 7
    -   isoCountry: ISO tax code (mandatory)
    -   taxNature: nature code (conditional)

Note: if no tax detail is provided (no "taxInformation"), this means all tax are exempt.

  
Example: ZVGO tax exemption.

## 2.15.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>ET</pricingOptionKey> </pricingOptionKey> <taxInformation> <taxQualifier>7</taxQualifier> <taxType> <isoCountry>ZV</isoCountry> </taxType> <taxNature>GO</taxNature> <taxData> </taxData> </taxInformation> </pricingOptionGroup>

## 2.16 Sub Structure: pricingOptionGroup - Expanded parameters

## 2.16.1 Description

Description:  
This option is used to add additional parameters in a pricing request.

  
Structure:

![](images/Expanded%20parameters.png)

-   **pricingOptionKey** = PRM (expanded PaRaMeters)
-   **optionDetail**: Contains the expanded parameter code(s) (mandatory) in "attributeType"
    
    -   NAP: No Advance Purchase Requirements
    -   NMN: No Minimum Stay Requirement
    -   NMX: No Maximum Stay Requirement
    -   NMM: No Minimum and No Maximum Stay Requirements
    -   NDA: NO Day and Time Restrictions
    -   PE: Penalty Restrictions (Penalty limited to "nn" Percent or "nn" Amount)
    -   NPE: No Penalty Restrictions
    -   RF: Refundable
    -   NRF: Non-Refundable
    -   EU: ECONOMY UNRESTRICTED ONLY
    -   NR: NO RESTRICTION
    
    -   UBD: Unbundled
    -   BD: Bundled
-   **penDisInformation**: is used only in case parameter "PE" is used. In this case, penDisInformation contains the penalty details:
    -   discountPenaltyQualifier: "700"
    -   function: "704"
    -   amountType: "707" for amount or "708" for percentage
    -   amount: the amount or %

Example: use expanded parameters

-   refundable (RF)
-   penalty (PE) with an amount of 50

## 2.16.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>PRM</pricingOptionKey> </pricingOptionKey> <optionDetail> <criteriaDetails> <attributeType>PE</attributeType> </criteriaDetails> <criteriaDetails> <attributeType>RF</attributeType> </criteriaDetails> </optionDetail> <penDisInformation> <discountPenaltyQualifier>700</discountPenaltyQualifier> <discountPenaltyDetails> <function>704</function> <amountType>707</amountType> <amount>50</amount> </discountPenaltyDetails> </penDisInformation> </pricingOptionGroup>

## 2.17 Sub Structure: pricingOptionGroup - Fare Currency Override

## 2.17.1 Description

Description:  
This option is used to choose a specific currency at pricing time.

  
Structure:

![](images/Fare%20currency%20override.png)

-   **pricingOptionKey** = FCO (Fare Currency Override)
-   **currency** (mandatory)
    -   currencyQualifier = "FCO"
    -   currencyIsoCode = the 3-letter code of the requested currency

## 2.17.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>FCO</pricingOptionKey> </pricingOptionKey> <currency> <firstCurrencyDetails> <currencyQualifier>FCO</currencyQualifier> <currencyIsoCode>USD</currencyIsoCode> </firstCurrencyDetails> </currency> </pricingOptionGroup>

## 2.18 Sub Structure: pricingOptionGroup - Fare Currency Selection

## 2.18.1 Description

Description:  
This option is used to target exclusively fares that are filled in a specific currency.

  
Structure:

![](images/Fare%20currency%20selection.png)

-   **pricingOptionKey** = FCS (Fare Currency Selection)
-   **currency** (mandatory)
    -   currencyQualifier = "FCS"
    -   currencyIsoCode = the 3-letter code of the requested currency

## 2.18.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>FCS</pricingOptionKey> </pricingOptionKey> <currency> <firstCurrencyDetails> <currencyQualifier>FCS</currencyQualifier> <currencyIsoCode>USD</currencyIsoCode> </firstCurrencyDetails> </currency> </pricingOptionGroup>

## 2.19 Sub Structure: pricingOptionGroup - Force Breakpoint

## 2.19.1 Description

Description:  
This option is used to force a breakpoint after a given segment.

  
Structure:

![](images/Force%20breakpoint.png)

-   **pricingOptionKey** = FBP (Force BreakPoint)
-   **paxSegTstReference** = reference of the segment after which breakpoint is expected

Example: breakpoint forced after segments 2 and 4.

## 2.19.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>FBP</pricingOptionKey> </pricingOptionKey> <paxSegTstReference> <referenceDetails> <type>S</type> <value>2</value> </referenceDetails> <referenceDetails> <type>S</type> <value>4</value> </referenceDetails> </paxSegTstReference> </pricingOptionGroup>

## 2.20 Sub Structure: pricingOptionGroup - Form of payment override

## 2.20.1 Description

Description:  
This option is used to specify the form of payment information to utilise.

  
Structure:

![](images/Form%20of%20payment%20override.png)

-   **pricingOptionKey** = FOP (Form Of Payment)
-   **formOfPaymentInformation**: Can contain up to 3 form of payment. For each FOP:
    -   "type" is mandatory. It contains the FOP type (example: CA, CC, and so on).
    -   "amount" is conditional. It contains the amount to be paid with this FOP.  
        Note: if 1 FOP is sent, amount is conditional. If 2 are sent, amount must be provided for 1 or 2 of them. If 3 are sent, amount must be provided for exactly 2 of them.
    -   "creditCardNumber" is mandatory if type "CC", not applicable otherwise. It contains the bin range of the credit card to use.

Example: use a form of payment CC with bin range 400000 for an amount of 10 and the remaining on a FOP CA.

## 2.20.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>FOP</pricingOptionKey> </pricingOptionKey> <formOfPaymentInformation> <formOfPayment> <type>CC</type> <amount>10</amount> <creditCardNumber>400000</creditCardNumber> </formOfPayment> <otherFormOfPayment> <type>CA</type> </otherFormOfPayment> </formOfPaymentInformation> </pricingOptionGroup>

## 2.21 Sub Structure: pricingOptionGroup - Global Route Indicator

## 2.21.1 Description

Description:  
This option is used to give additional information on an itinerary to price.

  
Structure:

![](images/Global%20route%20indicator.png)

-   **pricingOptionKey** = GRI (Global Route Indicator)
-   **optionDetail**: "attributeType" contains a global indicator

  
Example: case of a "round the world" trip.

## 2.21.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>GRI</pricingOptionKey> </pricingOptionKey> <optionDetail> <criteriaDetails> <attributeType>RW</attributeType> </criteriaDetails> </optionDetail> </pricingOptionGroup>

## 2.22 Sub Structure: pricingOptionGroup - Instant Pricing

## 2.22.1 Description

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

## 2.22.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>IP</pricingOptionKey> </pricingOptionKey> <monetaryInformation> <monetaryDetails> <typeQualifier>IPA</typeQualifier> <amount>120.00</amount> <currency>USD</currency> </monetaryDetails> </monetaryInformation> </pricingOptionGroup>

## 2.23 Sub Structure: pricingOptionGroup - List booking class

## 2.23.1 Description

Description:  
This option is used to search prices in a specific list of booking classes.

  
Structure:

![](images/List%20booking%20class.png)

-   **pricingOptionKey** = LBC (List Booking Class)
-   **optionDetail**: "attributeType" contains the list of classes
-   **paxSegTstReference**: can contain one or several segment tattoos (conditional)

Example: consider only classes A, B, C and D for segments 2, 4 and 5.

## 2.23.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>LBC</pricingOptionKey> </pricingOptionKey> <optionDetail> <criteriaDetails> <attributeType>A</attributeType> </criteriaDetails> <criteriaDetails> <attributeType>B</attributeType> </criteriaDetails> <criteriaDetails> <attributeType>C</attributeType> </criteriaDetails> <criteriaDetails> <attributeType>D</attributeType> </criteriaDetails> </optionDetail> <paxSegTstReference> <referenceDetails> <type>S</type> <value>2</value> </referenceDetails> <referenceDetails> <type>S</type> <value>4</value> </referenceDetails> <referenceDetails> <type>S</type> <value>5</value> </referenceDetails> </paxSegTstReference> </pricingOptionGroup>

## 2.24 Sub Structure: pricingOptionGroup - M/BT fare amount override

## 2.24.1 Description

Description:  
This option is used to request pricing by Bulk (M/BT).

  
Structure:

![](images/M%20BT%20Fare%20amount%20override.png)

-   **pricingOptionKey** = MBT

## 2.24.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>MBT</pricingOptionKey> </pricingOptionKey> </pricingOptionGroup>

## 2.25 Sub Structure: pricingOptionGroup - M/IT fare amount override

## 2.25.1 Description

Description:  
This option is used to request pricing by Inclusive Tour (M/IT).

  
Structure:

![](images/M%20IT%20Fare%20amount%20override.png)

-   **pricingOptionKey** = MIT

## 2.25.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>MIT</pricingOptionKey> </pricingOptionKey> </pricingOptionGroup>

## 2.26 Sub Structure: pricingOptionGroup - Mileage Accrual

## 2.26.1 Description

Description:  
This option is used to request the mileage accrual to be returned.

  
Structure:

![](images/Mileage%20accrual.png)

-   **pricingOptionKey** = MA (Mileage Accrual)

## 2.26.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>MA</pricingOptionKey> </pricingOptionKey> </pricingOptionGroup>

## 2.27 Sub Structure: pricingOptionGroup - Miles and Cash

## 2.27.1 Description

Description:  
This option is used for Miles and Cash pricing.

  
Structure:

![](images/Miles%20and%20Cash%20without%20reason%20code.png)

-   **pricingOptionKey** = MC (Miles and Cash)

-   **monetaryInformation**: optionally, it is possible to use an "instant pricing" option named "Manual Update in Points"
    
    -   typeQualifier = "MUP" (Manual Update in Points)
    
    -   amount: the amount

Example: with Manual Update of 10000 Points.

## 2.27.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>MC</pricingOptionKey> </pricingOptionKey> <monetaryInformation> <monetaryDetails> <typeQualifier>MUP</typeQualifier> <amount>10000</amount> </monetaryDetails> </monetaryInformation> </pricingOptionGroup>

## 2.28 Sub Structure: pricingOptionGroup - Negotiated fare

## 2.28.1 Description

Description:  
This option is used to price with negotiated fares.

  
Structure:

![](images/Negotiated%20fares.png)

-   **pricingOptionKey** = RN

  
Example: use negotiated fares.

## 2.28.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>RN</pricingOptionKey> </pricingOptionKey> </pricingOptionGroup>

## 2.29 Sub Structure: pricingOptionGroup - No Fee

## 2.29.1 Description

Description:  
This option is used to exclude the ticketing fee.

  
Structure:

![](images/No%20Fee.png)

-   **pricingOptionKey** = NF (No Fee)

## 2.29.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>NF</pricingOptionKey> </pricingOptionKey> </pricingOptionGroup>

## 2.30 Sub Structure: pricingOptionGroup - No Option

## 2.30.1 Description

Description:  
This option is used when no specific pricing option is requested.

  
Structure:

![](images/No%20option.png)

-   **pricingOptionKey** = NOP (No OPtion)

## 2.30.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>NOP</pricingOptionKey> </pricingOptionKey> </pricingOptionGroup>

## 2.31 Sub Structure: pricingOptionGroup - No Slice and Dice

## 2.31.1 Description

Description:  
This option is used to inhibit the Slice and Dice process.

  
Structure:

![](images/No%20slice%20and%20dice.png)

-   **pricingOptionKey** = NSD (No Slice & Dice)

## 2.31.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>NSD</pricingOptionKey> </pricingOptionKey> </pricingOptionGroup>

## 2.32 Sub Structure: pricingOptionGroup - No Split

## 2.32.1 Description

Description:  
When best pricing is done on several passengers with different PTCs, the lowest class might not be the same for all passengers. The "No split" option is used to request the system to return only the lowest class for the whole set of passengers is considered.

  
Example: trip with one MIL passenger and one YTH passenger with prices below

PTC

Price in class A

Price in class B

YTH

100

80

MIL

40

100

-   If "No split" option is not used, lowest price returned is 120, but the 2 passengers must be booked in different classes (B for YTH and A for MIL). So it will be necessary to split the PNR.
-   If "No split" option is used, lowest price returned is 140, with both passengers booked in class A.

  
Structure:

![](images/No%20split.png)

-   **pricingOptionKey** = NS (No Split)

## 2.32.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>NS</pricingOptionKey> </pricingOptionKey> </pricingOptionGroup>

## 2.33 Sub Structure: pricingOptionGroup - OBFee

## 2.33.1 Description

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

## 2.33.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>OBF</pricingOptionKey> </pricingOptionKey> <penDisInformation> <discountPenaltyQualifier>OBF</discountPenaltyQualifier> <discountPenaltyDetails> <function>INF</function> <amountType>707</amountType> <amount>10</amount> <rate>FC1</rate> <currency>USD</currency> </discountPenaltyDetails> <discountPenaltyDetails> <function>EXF</function> <rate>T01</rate> </discountPenaltyDetails> </penDisInformation> <paxSegTstReference> <referenceDetails> <type>P</type> <value>1</value> </referenceDetails> </paxSegTstReference> </pricingOptionGroup>

## 2.34 Sub Structure: pricingOptionGroup - Override Controlling Carrier

## 2.34.1 Description

Description:  
This option allows to override the controlling carrier at pricing time. It is possible to specify only one controlling carrier per pricing entry.

Structure  
![](http://ncegcwiki/wikidoc/wikidoc/images/uml-faaa0bb67259dc59f596f25b6137b9b1-2800f415298c9662463decf6b2ebe565.png)

-   **pricingOptionKey** = OCC
-   **carrierInformation**: contains the controlling carrier code

  
Example: use "6X" as controlling carrier

## 2.34.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>OCC</pricingOptionKey> </pricingOptionKey> <carrierInformation> <companyIdentification> <otherCompany>6X</otherCompany> </companyIdentification> </carrierInformation> </pricingOptionGroup>

## 2.35 Sub Structure: pricingOptionGroup - Passenger PTC/Discount

## 2.35.1 Description

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

## 2.35.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>PAX</pricingOptionKey> </pricingOptionKey> <penDisInformation> <discountPenaltyQualifier>701</discountPenaltyQualifier> <discountPenaltyDetails> <rate>YTH</rate> </discountPenaltyDetails> <discountPenaltyDetails> <rate>AD20</rate> </discountPenaltyDetails> <discountPenaltyDetails> <rate>MIL</rate> </discountPenaltyDetails> </penDisInformation> <paxSegTstReference> <referenceDetails> <type>P</type> <value>1</value> </referenceDetails> <referenceDetails> <type>S</type> <value>4</value> </referenceDetails> </paxSegTstReference> </pricingOptionGroup>

## 2.36 Sub Structure: pricingOptionGroup - Passenger/Segment/TST selection

## 2.36.1 Description

Description:  
This option is used to price only part of a PNR.

  
Structure:

![](images/Passenger%20PTC%20discount.png)

-   **pricingOptionKey** = SEL (Selection)
-   **paxSegTstReference**: the part of the PNR to price
    -   referenceDetails/type can have below values:
        -   "T" to refer to a TST
        -   "S" to refer to a segment
        -   "PI" to refer to an infant passenger
        -   "PA" to refer to a non-infant passenger
        -   "P" to refer to a passenger (both infant and non infant)

  
Note:  
Selection can be 1 of the 2 below types:

-   TST: to reprice the passenger/segment present in 1 TST. This is done using value "T" as referenceDetails/type.
-   Combination of Passenger(s) and/or segment(s). This is done using values "P", "PA", "PI" and "S" as referenceDetails/type.

Both types cannot be mixed (impossible to select TST+Passenger, or TST+Segment).

Example: price infant number 1, non-infant number 2 and passenger 3 for segment 1.

## 2.36.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>SEL</pricingOptionKey> </pricingOptionKey> <paxSegTstReference> <referenceDetails> <type>PI</type> <value>1</value> </referenceDetails> <referenceDetails> <type>PA</type> <value>2</value> </referenceDetails> <referenceDetails> <type>P</type> <value>3</value> </referenceDetails> <referenceDetails> <type>S</type> <value>1</value> </referenceDetails> </paxSegTstReference> </pricingOptionGroup>

## 2.37 Sub Structure: pricingOptionGroup - Past Date Pricing

## 2.37.1 Description

Description:  
This option is used to target fares that were applicable on a given date.

  
Structure:

![](images/Past%20Date%20Pricing%20without%20reason%20code.png)

-   **pricingOptionKey** = DAT (Date Override)
-   **dateInformation**: Date

  
Example: pricing using fare that was applicable on 27JUN12.

## 2.37.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>DAT</pricingOptionKey> </pricingOptionKey> <dateInformation> <businessSemantic>DAT</businessSemantic> <dateTime> <year>2012</year> <month>6</month> <day>27</day> </dateTime> </dateInformation> </pricingOptionGroup>

## 2.38 Sub Structure: pricingOptionGroup - Point Of Sale Override

## 2.38.1 Description

Description:  
This option is used to choose the point of sale to utilise.

  
Structure:

![](images/Point%20of%20sale%20override.png)

-   **pricingOptionKey** = POS (Point Of Sale)
-   **locationInformation**:
    -   locationType = "POS"
    -   code = the city code

  
Example: define city "LON" as point of sale.

## 2.38.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>POS</pricingOptionKey> </pricingOptionKey> <locationInformation> <locationType>POS</locationType> <firstLocationDetails> <code>LON</code> </firstLocationDetails> </locationInformation> </pricingOptionGroup>

## 2.39 Sub Structure: pricingOptionGroup - Point Of Ticketing override

## 2.39.1 Description

Description:  
This option is used to choose the point of sale to utilise.

  
Structure:

![](images/Point%20of%20ticketing%20override.png)

-   **pricingOptionKey** = POT (Point Of Ticketing)
-   **locationInformation**:
    -   locationType = "POT"
    -   code = the city code

  
Example: define city "LON" as point of ticketing.

## 2.39.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>POT</pricingOptionKey> </pricingOptionKey> <locationInformation> <locationType>POT</locationType> <firstLocationDetails> <code>LON</code> </firstLocationDetails> </locationInformation> </pricingOptionGroup>

## 2.40 Sub Structure: pricingOptionGroup - Point Of Turnaround Flight Indicator

## 2.40.1 Description

Description:  
This option is used to specify that the arrival point of a segment is a Turnaround point in an itinerary.

  
Structure:

![](images/Point%20of%20turnaround%20indicator.png)

-   **pricingOptionKey** = PTA (Point of Turnaround Flight Indicator)
-   **paxSegTstReference**\= reference of the segment(s) for which this option should apply

  
Example: consider segment 4 as being a point of turnaround.

## 2.40.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>PTA</pricingOptionKey> </pricingOptionKey> <paxSegTstReference> <referenceDetails> <type>S</type> <value>4</value> </referenceDetails> </paxSegTstReference> </pricingOptionGroup>

## 2.41 Sub Structure: pricingOptionGroup - Pricing by Fare Family

## 2.41.1 Description

Description:  
This option is used to choose the fare family requested by passenger. This means only fares belonging to this fare family will be considered.

  
Structure:

![](images/Pricing%20by%20Fare%20Family.png)

-   **pricingOptionKey** = PFF (Pricing by Fare Family)
-   **optionDetail**:
    -   "attributeType" = FF (fare family)
    -   "attributeDescription": the Fare Family name
-   **paxSegTstReference**: can be used (optional) to specify the segment(s) on which this fare family is expected.

  
Example: choose fare family "ECOFLEX" for segments 2 and 3.

## 2.41.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>PFF</pricingOptionKey> </pricingOptionKey> <optionDetail> <criteriaDetails> <attributeType>FF</attributeType> <attributeDescription>ECOFLEX</attributeDescription> </criteriaDetails> </optionDetail> <paxSegTstReference> <referenceDetails> <type>S</type> <value>2</value> </referenceDetails> <referenceDetails> <type>S</type> <value>3</value> </referenceDetails> </paxSegTstReference> </pricingOptionGroup>

## 2.42 Sub Structure: pricingOptionGroup - Pricing Logic

## 2.42.1 Description

Description:  
This option is used to choose what pricing logic to apply.

  
Structure:

![](images/Pricing%20logic.png)

-   **pricingOptionKey** = PL (Pricing Logic)
-   **optionDetail**: "attributeType": name of the pricing logic to apply ("IATA" or "ATAF")

  
Example: use pricing logic "IATA".

## 2.42.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>PL</pricingOptionKey> </pricingOptionKey> <optionDetail> <criteriaDetails> <attributeType>IATA</attributeType> </criteriaDetails> </optionDetail> </pricingOptionGroup>

## 2.43 Sub Structure: pricingOptionGroup - PTC only

## 2.43.1 Description

Description:  
This option is used at pricing time to prevent the system from defaulting to default PTC (ADT or INF) in case there is no fare for requested PTC/discount code.

  
Structure:

![](images/PTC%20only.png)

-   **pricingOptionKey** = PTC

## 2.43.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>PTC</pricingOptionKey> </pricingOptionKey> </pricingOptionGroup>

## 2.44 Sub Structure: pricingOptionGroup - Published fare

## 2.44.1 Description

Description:  
This option is used to price with published fares.

  
Structure:

![](images/Published%20fares.png)

-   **pricingOptionKey** = RP

## 2.44.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>RP</pricingOptionKey> </pricingOptionKey> </pricingOptionGroup>

## 2.45 Sub Structure: pricingOptionGroup - Settlement via TCH

## 2.45.1 Description

Description:  
The option indicates that sale will be reported and settled via TCH (Transport Clearing House).

  
Structure:

![](images/Settlement%20via%20TCH.png)

-   **pricingOptionKey** = TCH

## 2.45.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>TCH</pricingOptionKey> </pricingOptionKey> </pricingOptionGroup>

## 2.46 Sub Structure: pricingOptionGroup - Show Baggage Fares

## 2.46.1 Description

Description:  
This function is used to request fares which include a free baggage allowance of at least 1 piece. This option applies at global transaction level.

OptionDetail allows to select the minimum pieces of baggage allowance. Only value 1 is supported.  

 If nothing is specified, the default value is 1. 

Structure

-   **pricingOptionKey** = SBF (Show Baggage Fares)
-   **optionDetail**:
    -    **attributeType** = the minimum number of required baggage items in allowance (only 1 piece is supported)

  
Exemple: request fares that include at least 1 piece of free baggage in allowance.

## 2.46.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>SBF</pricingOptionKey> </pricingOptionKey> <optionDetail> <criteriaDetails> <attributeType>1</attributeType> </criteriaDetails> </optionDetail> </pricingOptionGroup>

## 2.47 Sub Structure: pricingOptionGroup - Stopover Flight Indicator

## 2.47.1 Description

Description:  
This option is used to specify that there is a Stopover between a segment and the next one of the itinerary.

  
Structure:

![](images/Stopover%20indicator.png)

-   **pricingOptionKey** = STO (Stopover Flight Indicator)
-   **paxSegTstReference**\= reference of the segment(s) for which this option should apply

  
Example: consider segment 4 as being a stopover point.

## 2.47.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>STO</pricingOptionKey> </pricingOptionKey> <paxSegTstReference> <referenceDetails> <type>S</type> <value>4</value> </referenceDetails> </paxSegTstReference> </pricingOptionGroup>

## 2.48 Sub Structure: pricingOptionGroup - Ticket Type

## 2.48.1 Description

Description:  
This option is used to select the type of ticket fare: paper, electronic or both.

  
Structure:

![](images/Ticket%20type.png)

-   **pricingOptionKey** = TKT
-   **optionDetail**/attributeType =
    -   ET for electronic
    -   PT for Paper
    -   EP for both

## 2.48.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>TKT</pricingOptionKey> </pricingOptionKey> <optionDetail> <criteriaDetails> <attributeType>PT</attributeType> </criteriaDetails> </optionDetail> </pricingOptionGroup>

## 2.49 Sub Structure: pricingOptionGroup - Transitional Certificate

## 2.49.1 Description

Description:  
This option is used to trigger the Redemption process using Transitional Certificates.

  
Structure:

![](images/Transitional%20certificate.png)

-   **pricingOptionKey** = TRS (Transitional Certificate)

## 2.49.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>TRS</pricingOptionKey> </pricingOptionKey> </pricingOptionGroup>

## 2.50 Sub Structure: pricingOptionGroup - Unifares

## 2.50.1 Description

Description:  
This option is used to price with Unifares.

  
Structure:

![](images/Unifares.png)

-   **pricingOptionKey** = RU

## 2.50.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>RU</pricingOptionKey> </pricingOptionKey> </pricingOptionGroup>

## 2.51 Sub Structure: pricingOptionGroup - Validating Carrier override

## 2.51.1 Description

Description:  
This option is used to choose the validating carrier at pricing time.

  
Structure:

![](images/Validating%20carrier%20override.png)

-   **pricingOptionKey** = VC
-   **carrierInformation**: contains the validating carrier

  
Example: use "6X" as validating carrier.

## 2.51.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>VC</pricingOptionKey> </pricingOptionKey> <carrierInformation> <companyIdentification> <otherCompany>6X</otherCompany> </companyIdentification> </carrierInformation> </pricingOptionGroup>

## 2.52 Sub Structure: pricingOptionGroup - Withhold Country Tax

## 2.52.1 Description

Description:  
This option is used to withhold taxes per country code.

  
Structure:

![](images/Add%20Country%20Tax%20without%20reason%20code.png)

-   **pricingOptionKey** = WC (Withhold Country)
-   **taxInformation**: tax detail:
    -   taxQualifier: 7 (tax)
    -   isoCountry: country code

  
Example: withhold taxes of country FR.

## 2.52.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>WC</pricingOptionKey> </pricingOptionKey> <taxInformation> <taxQualifier>7</taxQualifier> <taxType> <isoCountry>FR</isoCountry> </taxType> </taxInformation> </pricingOptionGroup>

## 2.53 Sub Structure: pricingOptionGroup - Withhold q surcharges

## 2.53.1 Description

Description:  
This option is used to withhold the q surcharges.

  
Structure:

![](images/Withhold%20Q%20surcharges.png)

-   **pricingOptionKey** = WQ (Withhold Q Surcharge)

## 2.53.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>WQ</pricingOptionKey> </pricingOptionKey> </pricingOptionGroup>

## 2.54 Sub Structure: pricingOptionGroup - Withhold Taxes

## 2.54.1 Description

Description:  
This option is used to withhold one or several taxes.

  
Structure:

![](images/Withhold%20taxes%20without%20reason%20code.png)

-   **pricingOptionKey** = WT (Withhold tax)
-   **taxInformation**: detail of tax to withhold.
    -   taxQualifier: 7
    -   isoCountry: ISO tax code (Mandatory)
    -   taxNature: nature code (Conditional)

Note: if no tax detail is provided (no "taxInformation"), this means all tax are withheld.

If (and only if) the withheld tax is XF airport taxes, it is possible to specify for which airport(s) the tax should be withhold. This can be done 2 ways:

-   **locationInformation**: the airport code for which tax should be withheld can be entered as firstLocationDetails/code
-   **paxSegTstReference**: the segments for which XF tax should be withheld are entered here

Note: it is not possible to specify both a city code (in locationInformation) and a segment (paxSegTstReference) at the same time. User has to choose 1 of the 2 solutions (city or segment selection).

  
Example: withhold tax XF for the departing airport of segment 4.

## 2.54.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>WT</pricingOptionKey> </pricingOptionKey> <taxInformation> <taxQualifier>7</taxQualifier> <taxType> <isoCountry>XF</isoCountry> </taxType> </taxInformation> <paxSegTstReference> <referenceDetails> <type>S</type> <value>4</value> </referenceDetails> </paxSegTstReference> </pricingOptionGroup>

## 2.55 Sub Structure: pricingOptionGroup - Zapp-Off

## 2.55.1 Description

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

## 2.55.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>ZAP</pricingOptionKey> </pricingOptionKey> <penDisInformation> <discountPenaltyQualifier>ZAP</discountPenaltyQualifier> <discountPenaltyDetails> <function>700</function> <amountType>708</amountType> <amount>75</amount> <rate>CH50</rate> </discountPenaltyDetails> </penDisInformation> <paxSegTstReference> <referenceDetails> <type>S</type> <value>1</value> </referenceDetails> <referenceDetails> <type>S</type> <value>2</value> </referenceDetails> </paxSegTstReference> </pricingOptionGroup>

## 3 Receiving A Reply

The reply is fully structured. No full-screen text will be returned (as opposed to cryptic pricing).

The Fare\_PricePNRWithLowestFares is mainly formed of a "fareList" repeated up to 99 times.  
Each repetition of the fareList corresponds to a pricing recommendation.

The current PNR is not modified by this operation.

## 3.1 Sub Structure: bankerRates

## 3.1.1 Description

Banker's rates are used to convert amounts of the TST (converts base fare to equivalent fare).

-   firstRateDetail: 1st bankers' rate which is a percentage (no currency)
-   secondRateDetail: 2nd bankers' rate which is currency+amount.

## 3.1.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<bankerRates> <firstRateDetail> <amount>1.50989</amount> </firstRateDetail> </bankerRates>

* * *

## 3.2 Sub Structure: Binary Structure

## 3.2.1 Description

This structure contains the type of binary information on binaryDescription and the binary on binaryData

## 3.2.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Group> <binaryDescription> <structureType>JSON</structureType> </binaryDescription> <binaryData> <dataLength>192</dataLength> <dataType>B</dataType> <binaryData>eF7zMuFijoyMEmL28QiSYrYws9BicnS2YjM0NTQwtHBiMbA0NPCC8oJYjAwNDKKYzS0svYC6gBqEQFpBuiwhuoxguiyMgbogvCAWQ0NDkC7z8CR2LmZHlxABBhiDEcTw9HMTYMji42AUApohxWZoZGxiatbECBSQ4gIKshlaGpgZWoAEmNAFmJEFAE5FIUM=</binaryData> </binaryData> </Group>

* * *

## 3.3 Sub Structure: corporateInfo

## 3.3.1 Description

In case of Corporate Unifare/negociated fare, this structure returns the corporate code or number that has been used at pricing time.

## 3.3.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<corporateInfo> <corporateFareIdentifiers> <corporateID>000001</corporateID> </corporateFareIdentifiers> </corporateInfo>

* * *

## 3.4 Sub Structure: endFareList

## 3.4.1 Description

This empty structure marks the end of the fareList structure.

## 3.4.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

* * *

## 3.5 Sub Structure: fareComponentDetailsGroup

## 3.5.1 Description

This structure contains all data returned at fare component level or at bound level. Price at bound level is returned if bound input option has been used in the pricing query and if bound break point coincides with fare break point.

-   fareComponentID: number of the fare component or of the bound
-   marketFareComponent: market associated to the fare component (origin and destination of the fare component)
-   monetaryInformation: monetary information for the fare component or for the bound
-   componentClassInfo: fare basis and ticket designator
-   fareQualifiersDetail: one-way (756) or round trip (763) or both (BOR).
-   fareFamilyDetails: fare family name
-   fareFamilyOwner: carrier owner of the fare family
-   couponDetailsGroup: the segments of the PNR that the fare component covers or segments included in the bound

\- couponTaxDetailsGroup: the taxes associated to each coupon of each fare component.

-   taxTriggerInfo: indicator of tax related information (default value is 9)
-   taxDetails: codes identifying the tax (category, country, types)
-   monetaryInfo: monetary information for this tax
-   locationInfo:  type and code of the location for this tax

## 3.5.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<fareComponentDetailsGroup> <fareComponentID> <itemNumberDetails> <number>1</number> <type>FC</type> </itemNumberDetails> </fareComponentID> <marketFareComponent> <boardPointDetails> <trueLocationId>BWI</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>SFO</trueLocationId> </offpointDetails> </marketFareComponent> <monetaryInformation> <monetaryDetails> <typeQualifier>TFC</typeQualifier> <amount>445.58</amount> <currency>USD</currency> </monetaryDetails> </monetaryInformation> <componentClassInfo> <fareBasisDetails> <rateTariffClass>YL</rateTariffClass> </fareBasisDetails> </componentClassInfo> <fareQualifiersDetail> <discountDetails> <fareQualifier>BOR</fareQualifier> </discountDetails> </fareQualifiersDetail> <fareFamilyDetails> <fareFamilyname>ANY</fareFamilyname> </fareFamilyDetails> <fareFamilyOwner> <companyIdentification> <otherCompany>6X</otherCompany> </companyIdentification> </fareFamilyOwner> <couponDetailsGroup> <productId> <referenceDetails> <type>ST</type> <value>1</value> </referenceDetails> </productId> </couponDetailsGroup> <couponDetailsGroup> <productId> <referenceDetails> <type>ST</type> <value>2</value> </referenceDetails> </productId> </couponDetailsGroup> </fareComponentDetailsGroup> <fareComponentDetailsGroup> <fareComponentID> <itemNumberDetails> <number>2</number> <type>FC</type> </itemNumberDetails> </fareComponentID> <marketFareComponent> <boardPointDetails> <trueLocationId>SFO</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>BWI</trueLocationId> </offpointDetails> </marketFareComponent> <monetaryInformation> <monetaryDetails> <typeQualifier>TFC</typeQualifier> <amount>445.58</amount> <currency>USD</currency> </monetaryDetails> </monetaryInformation> <componentClassInfo> <fareBasisDetails> <rateTariffClass>YL</rateTariffClass> </fareBasisDetails> </componentClassInfo> <fareQualifiersDetail> <discountDetails> <fareQualifier>BOR</fareQualifier> </discountDetails> </fareQualifiersDetail> <fareFamilyDetails> <fareFamilyname>ANY</fareFamilyname> </fareFamilyDetails> <fareFamilyOwner> <companyIdentification> <otherCompany>6X</otherCompany> </companyIdentification> </fareFamilyOwner> <couponDetailsGroup> <productId> <referenceDetails> <type>ST</type> <value>3</value> </referenceDetails> </productId> </couponDetailsGroup> <couponDetailsGroup> <productId> <referenceDetails> <type>ST</type> <value>4</value> </referenceDetails> </productId> </couponDetailsGroup> </fareComponentDetailsGroup> <fareComponentDetailsGroup> <fareComponentID> <itemNumberDetails> <number>1</number> <type>BND</type> </itemNumberDetails> </fareComponentID> <monetaryInformation> <monetaryDetails> <typeQualifier>712</typeQualifier> <amount>501.60</amount> <currency>USD</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>TX</typeQualifier> <amount>56.02</amount> <currency>USD</currency> </otherMonetaryDetails> </monetaryInformation> <couponDetailsGroup> <productId> <referenceDetails> <type>ST</type> <value>1</value> </referenceDetails> </productId> </couponDetailsGroup> <couponDetailsGroup> <productId> <referenceDetails> <type>ST</type> <value>2</value> </referenceDetails> </productId> </couponDetailsGroup> </fareComponentDetailsGroup> <fareComponentDetailsGroup> <fareComponentID> <itemNumberDetails> <number>2</number> <type>BND</type> </itemNumberDetails> </fareComponentID> <monetaryInformation> <monetaryDetails> <typeQualifier>712</typeQualifier> <amount>501.60</amount> <currency>USD</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>TX</typeQualifier> <amount>56.02</amount> <currency>USD</currency> </otherMonetaryDetails> </monetaryInformation> <couponDetailsGroup> <productId> <referenceDetails> <type>ST</type> <value>3</value> </referenceDetails> </productId> </couponDetailsGroup> <couponDetailsGroup> <productId> <referenceDetails> <type>ST</type> <value>4</value> </referenceDetails> </productId> </couponDetailsGroup> </fareComponentDetailsGroup>

* * *

## 3.6 Sub Structure: fareDataInformation

## 3.6.1 Description

This structure contains all the fare amount information (base fare, total fare, and so on).

In case the margin manager is applied, additional elements can be returned with the following values:

-   MMT: Margin Manager Total.
-   MMF: Margin Manager Fee.
-   MMM: Margin Manager Mark-up.

## 3.6.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<fareDataInformation> <fareDataMainInformation> <fareDataQualifier>F</fareDataQualifier> </fareDataMainInformation> <fareDataSupInformation> <fareDataQualifier>B</fareDataQualifier> <fareAmount>800000</fareAmount> <fareCurrency>KRW</fareCurrency> </fareDataSupInformation> <fareDataSupInformation> <fareDataQualifier>712</fareDataQualifier> <fareAmount>975200</fareAmount> <fareCurrency>KRW</fareCurrency> </fareDataSupInformation> <fareDataSupInformation> <fareDataQualifier>MKF</fareDataQualifier> <fareAmount>577600</fareAmount> <fareCurrency>KRW</fareCurrency> </fareDataSupInformation> <fareDataSupInformation> <fareDataQualifier>PMF</fareDataQualifier> <fareAmount>0</fareAmount> <fareCurrency>KRW</fareCurrency> </fareDataSupInformation> </fareDataInformation>

* * *

## 3.7 Sub Structure: fareIndicators

## 3.7.1 Description

Contains a flag "NTF" in case of non-ticketable fare.

## 3.7.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<fareIndicators> <fareDetails> <fareCategory>NTF</fareCategory> </fareDetails> </fareIndicators>

* * *

## 3.8 Sub Structure: fareReference

## 3.8.1 Description

The "uniqueReference" contains the number of the pricing solution.

## 3.8.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<fareReference> <referenceType>TST</referenceType> <uniqueReference>1</uniqueReference> </fareReference>

* * *

## 3.9 Sub Structure: feeBreakdown

## 3.9.1 Description

This structure is used to return all the fees associated to the pricing solution. It is repeated once per fee type.

-   feeType contains the type of the fees (OB, OC)
-   feeDetails contains fee description (1 repetition of this structure per fee)
    -   feeInfo contains the fee information (fee subcode and attribute)
    -   feeDescription contains the commercial description of the fee
    -   feeAmounts contains the amount(s) associated to this fee
    -   feeTaxes contains any tax information attached to this fee.

## 3.9.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<feeBreakdown> <feeType> <selectionDetails> <option>OB</option> </selectionDetails> </feeType> <feeDetails> <feeInfo> <dataTypeInformation> <type>T01</type> </dataTypeInformation> </feeInfo> <feeDescription> <freeTextQualification> <textSubjectQualifier>COM</textSubjectQualifier> </freeTextQualification> <freeText>BKG FEES</freeText> </feeDescription> <feeAmounts> <monetaryDetails> <typeQualifier>TIN</typeQualifier> <amount>63.70</amount> <currency>SGD</currency> </monetaryDetails> </feeAmounts> </feeDetails> </feeBreakdown>

* * *

## 3.10 Sub Structure: lastTktDate

## 3.10.1 Description

Contains the last date and time to ticket the fare.

## 3.10.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<lastTktDate> <businessSemantic>LT</businessSemantic> <dateTime> <year>2013</year> <month>11</month> <day>15</day> <hour>23</hour> <minutes>59</minutes> <seconds>0</seconds> </dateTime> </lastTktDate>

* * *

## 3.11 Sub Structure: mileage

## 3.11.1 Description

Contains the total mileage associated to the proposal.

## 3.11.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

* * *

## 3.12 Sub Structure: offerReferences

## 3.12.1 Description

The offerReferences group contains all the information regarding the offer Id.

-   offerId: contains the information regarding the offer Id
-   references\*: contains the information to link the offer Id to a specific passenger (code set P for integrated and PT for standalone), segment (code set S for integrated and ST for standalone), fare component (FC)

\*At the moment the substructure "references" should not be used.

## 3.12.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<offerReferences> <offerId> <uniqueOfferReference>SULP-15665803935048184713-1-1</uniqueOfferReference> </offerId> </offerReferences>

* * *

## 3.13 Sub Structure: originDestination

## 3.13.1 Description

Origin and destination of the fare.

## 3.13.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<originDestination> <cityCode>HEL</cityCode> <cityCode>LON</cityCode> </originDestination>

* * *

## 3.14 Sub Structure: otherPricingInfo

## 3.14.1 Description

This structure is used to return the:

-   Fare Calculation (returned as "attributeDescription" with a "attributeType" set to "FCA").
-   Commission information (returned as "attributeDescription" with a "attributeType" set to "COM").
-   Endorsement information (returned as "attributeDescription" with a "attributeType" set to "END").
-   Mileage breakdown (returned as "attributeDescription" with a "attributeType" set to "MIL").
-   Payment restrictions (returned as "attributeDescription" with a "attributeType" set to "PAY").
-   Tour name (returned as "attributeDescription" with a "attributeType" set to "TOU").

## 3.14.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<otherPricingInfo> <attributeDetails> <attributeType>END</attributeType> <attributeDescription>NONREF/FL/CHG RESTRICTEDCHECK FARE NOTE</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>FCA</attributeType> <attributeDescription>FRA 6X MUC82.00EUR82.00END</attributeDescription> </attributeDetails> </otherPricingInfo>

* * *

## 3.15 Sub Structure: paxSegReference

## 3.15.1 Description

This structure contains the tattoos (identifiers) of the passenger(s) for which this proposal applies.

## 3.15.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<paxSegReference> <refDetails> <refQualifier>PA</refQualifier> <refNumber>1</refNumber> </refDetails> </paxSegReference>

* * *

## 3.16 Sub Structure: pricingInformation

## 3.16.1 Description

This sub structure contains the Pricing information such as pricing rule and sales indicator.

## 3.16.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingInformation> <tstInformation> <tstIndicator>F</tstIndicator> </tstInformation> <fcmi>N</fcmi> </pricingInformation>

* * *

## 3.17 Sub Structure: segmentInformation

## 3.17.1 Description

This structure returns all fare information at segment level:

-   connection in connexInformation
-   booking class where the fare is applicable in classOfService
-   fare basis in fareBasisDetails
-   cabin code in cabinGroup
-   validity (not valid after/before) in validityInformation
-   baggage allowance information in bagAllowanceInformation
-   segment tattoo in segmentReference
-   Booking class and Trigger class (aka Ticketed class) when pricing a Dual Inventory fare

It is repeated once per segment in the proposal.

## 3.17.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<segmentInformation> <connexInformation> <connecDetails> <connexType>O</connexType> </connecDetails> </connexInformation> <segDetails> <segmentDetail> <identification>AIR</identification> <classOfService>S</classOfService> </segmentDetail> <segmentDetail> <identification>DIF</identification> <classOfService>N</classOfService> </segmentDetail> </segDetails> <fareQualifier> <fareBasisDetails> <primaryCode>YRT</primaryCode> <fareBasisCode>SDIT</fareBasisCode> <discTktDesignator>SD</discTktDesignator> </fareBasisDetails> </fareQualifier> <cabinGroup> <cabinSegment> <productDetailsQualifier>ECO</productDetailsQualifier> <bookingClassDetails> <designator>S</designator> <option>Y</option> </bookingClassDetails> </cabinSegment> </cabinGroup> <validityInformation> <businessSemantic>A</businessSemantic> <dateTime> <year>2014</year> <month>4</month> <day>10</day> </dateTime> </validityInformation> <bagAllowanceInformation> <bagAllowanceDetails> <baggageWeight>20</baggageWeight> <baggageType>W</baggageType> <measureUnit>K</measureUnit> </bagAllowanceDetails> <carryOnBaggageDetails> <baggageWeight>8</baggageWeight> <baggageType>W</baggageType> <measureUnit>K</measureUnit> </carryOnBaggageDetails> </bagAllowanceInformation> <segmentReference> <refDetails> <refQualifier>S</refQualifier> <refNumber>16</refNumber> </refDetails> </segmentReference> <sequenceInformation> <sequenceSection> <sequenceNumber>1</sequenceNumber> </sequenceSection> </sequenceInformation> </segmentInformation>

* * *

## 3.18 Sub Structure: taxInformation

## 3.18.1 Description

This structure contains the tax details. It is repeated once per tax.

## 3.18.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>X</taxIdentifier> </taxIdentification> <taxType> <isoCountry>YQ</isoCountry> </taxType> <taxNature>AC</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>109600</fareAmount> <fareCurrency>KRW</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>X</taxIdentifier> </taxIdentification> <taxType> <isoCountry>YQ</isoCountry> </taxType> <taxNature>AD</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>11600</fareAmount> <fareCurrency>KRW</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>X</taxIdentifier> </taxIdentification> <taxType> <isoCountry>BP</isoCountry> </taxType> <taxNature>DP</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>28000</fareAmount> <fareCurrency>KRW</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>X</taxIdentifier> </taxIdentification> <taxType> <isoCountry>TS</isoCountry> </taxType> <taxNature>LA</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>26000</fareAmount> <fareCurrency>KRW</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation>

* * *

## 3.19 Sub Structure: validatingCarrier

## 3.19.1 Description

Contains the validating carrier of the proposal. 

## 3.19.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<validatingCarrier> <carrierInformation> <carrierCode>6X</carrierCode> </carrierInformation> </validatingCarrier>

* * *

## 3.20 Sub Structure: warningInformation

## 3.20.1 Description

This structure is used to return any warning or free-flow text information returned by the pricing engine (one repetition per warning).

## 3.20.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>1A</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText>AIRLINE FEES INCLUDED</errorFreeText> </warningText> </warningInformation> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>1A</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText>PRICED WITH VALIDATING CARRIER 6X - REPRICE IF DIFFERENT VC</errorFreeText> </warningText> </warningInformation>

* * *

## 4 Error Messages

Here are the main error message that can be returned.  
All error messages corresponding to reject of pricing engine (Amadeus Fare Quote) have the number 0.

**Message**

**Error Number**

**Description**

UNABLE TO PROCESS

00011

Internal process error.

INVALID FORMAT

00477

The data specified in the request is not valid, although the message is correctly defined. Examples: Corporate number length is not six digits.

DUPLICATE SEGMENT TATTOO

33395

Same tattoo is given to 2 or more different segments.

NO FARE FOR BOOKING CODE - TRY OTHER PRICING OPTIONS

0

IF the itinerary includes multiple segments AND there are too many rules for system processing OR there is an incorrect booking code.

UNABLE TO FARE - TECHNICAL PROBLEM \*nnnn\*

0

There is a technical problem on pricing engine side.  
The number indicates the nature of the technical problem.

NO CURRENT FARE IN SYSTEM

0

There are no valid fares for the itinerary dates requested, based on effective and/or discontinued dates on the fare item.

ISSUE SEPARATE TICKETS - MULTIPLE CURRENCIES APPLY

0

Returned when the entry includes multiple passenger types AND the fares applicable for each passenger type are filed in different currencies, AND a single currency pricing display (like NON NUC) is valid for the user.  
For example: Travel from Germany to the US with ADT and MIL passengers, when the MIL is in USD and the ADT fare is in DEM.

NO VALID FARE/RULE COMBINATIONS FOR PRICING

0

All rule categories passed except for Combinability and no other fare is applicable.

NO TICKETABLE VALIDATING CARRIER

0

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

## 4.1 Error Reply

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_PricePNRWithLowestFareReply xmlns="http://xml.amadeus.com/TPLPRR\_23\_1\_1A"> <applicationError> <errorOrWarningCodeDetails> <errorDetails> <errorCode>00477</errorCode> <errorCategory>EC</errorCategory> <errorCodeOwner>1A</errorCodeOwner> </errorDetails> </errorOrWarningCodeDetails> <errorWarningDescription> <freeText>INVALID FORMAT</freeText> </errorWarningDescription> </applicationError> </Fare\_PricePNRWithLowestFareReply>

  

* * *

## 5 Operations

## 5.1 Operation: Pricing options

Here is a complete example of pricing, with options below:

-   take into account published fares (RP)
-   take into account Unifares (RU)
-   use PTC "CH" for passenger 2 (PAX)
-   convert fare into USD (FCO)

## 5.1.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_PricePNRWithLowestFare xmlns="http://xml.amadeus.com/TPLPRQ\_23\_1\_1A"> <pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>RP</pricingOptionKey> </pricingOptionKey> </pricingOptionGroup> <pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>RU</pricingOptionKey> </pricingOptionKey> </pricingOptionGroup> <pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>PAX</pricingOptionKey> </pricingOptionKey> <penDisInformation> <discountPenaltyQualifier>701</discountPenaltyQualifier> <discountPenaltyDetails> <rate>CH</rate> </discountPenaltyDetails> </penDisInformation> <paxSegTstReference> <referenceDetails> <type>P</type> <value>2</value> </referenceDetails> </paxSegTstReference> </pricingOptionGroup> <pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>FCO</pricingOptionKey> </pricingOptionKey> <currency> <firstCurrencyDetails> <currencyQualifier>FCO</currencyQualifier> <currencyIsoCode>USD</currencyIsoCode> </firstCurrencyDetails> </currency> </pricingOptionGroup> </Fare\_PricePNRWithLowestFare>

## 5.1.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_PricePNRWithLowestFareReply xmlns="http://xml.amadeus.com/TPLPRR\_23\_1\_1A"> <fareList> <pricingInformation> <tstInformation> <tstIndicator>F</tstIndicator> </tstInformation> <fcmi>N</fcmi> </pricingInformation> <fareReference> <referenceType>TST</referenceType> <uniqueReference>1</uniqueReference> </fareReference> <lastTktDate> <businessSemantic>LT</businessSemantic> <dateTime> <year>2013</year> <month>10</month> <day>13</day> </dateTime> </lastTktDate> <validatingCarrier> <carrierInformation> <carrierCode>6X</carrierCode> </carrierInformation> </validatingCarrier> <paxSegReference> <refDetails> <refQualifier>PA</refQualifier> <refNumber>1</refNumber> </refDetails> </paxSegReference> <fareDataInformation> <fareDataMainInformation> <fareDataQualifier>IT</fareDataQualifier> </fareDataMainInformation> <fareDataSupInformation> <fareDataQualifier>B</fareDataQualifier> <fareAmount>37.00</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataSupInformation> <fareDataSupInformation> <fareDataQualifier>E</fareDataQualifier> <fareAmount>50.00</fareAmount> <fareCurrency>USD</fareCurrency> </fareDataSupInformation> <fareDataSupInformation> <fareDataQualifier>712</fareDataQualifier> <fareAmount>262.29</fareAmount> <fareCurrency>USD</fareCurrency> </fareDataSupInformation> <fareDataSupInformation> <fareDataQualifier>TOF</fareDataQualifier> <fareAmount>40.58</fareAmount> <fareCurrency>USD</fareCurrency> </fareDataSupInformation> <fareDataSupInformation> <fareDataQualifier>TFT</fareDataQualifier> <fareAmount>221.71</fareAmount> <fareCurrency>USD</fareCurrency> </fareDataSupInformation> </fareDataInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>X</taxIdentifier> </taxIdentification> <taxType> <isoCountry>YR</isoCountry> </taxType> <taxNature>VB</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>62.22</fareAmount> <fareCurrency>USD</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>X</taxIdentifier> </taxIdentification> <taxType> <isoCountry>QX</isoCountry> </taxType> <taxNature>AP</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>17.50</fareAmount> <fareCurrency>USD</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>X</taxIdentifier> </taxIdentification> <taxType> <isoCountry>IZ</isoCountry> </taxType> <taxNature>EB</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>1.35</fareAmount> <fareCurrency>USD</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>X</taxIdentifier> </taxIdentification> <taxType> <isoCountry>FR</isoCountry> </taxType> <taxNature>SE</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>5.83</fareAmount> <fareCurrency>USD</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>X</taxIdentifier> </taxIdentification> <taxType> <isoCountry>FR</isoCountry> </taxType> <taxNature>TI</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>17.25</fareAmount> <fareCurrency>USD</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>X</taxIdentifier> </taxIdentification> <taxType> <isoCountry>GB</isoCountry> </taxType> <taxNature>AD</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>21.04</fareAmount> <fareCurrency>USD</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>X</taxIdentifier> </taxIdentification> <taxType> <isoCountry>UB</isoCountry> </taxType> <taxNature>AS</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>46.52</fareAmount> <fareCurrency>USD</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <bankerRates> <firstRateDetail> <amount>1.352631</amount> </firstRateDetail> </bankerRates> <originDestination> <cityCode>PAR</cityCode> <cityCode>PAR</cityCode> </originDestination> <segmentInformation> <connexInformation> <connecDetails> <connexType>O</connexType> </connecDetails> </connexInformation> <segDetails> <segmentDetail> <identification>AIR</identification> <classOfService>Q</classOfService> </segmentDetail> <segmentDetail> <identification>DIF</identification> <classOfService>N</classOfService> </segmentDetail> </segDetails> <fareQualifier> <fareBasisDetails> <primaryCode>QSR</primaryCode> <fareBasisCode>FR</fareBasisCode> <discTktDesignator>ADT</discTktDesignator> </fareBasisDetails> </fareQualifier> <validityInformation> <businessSemantic>A</businessSemantic> <dateTime> <year>2013</year> <month>12</month> <day>1</day> </dateTime> </validityInformation> <validityInformation> <businessSemantic>B</businessSemantic> <dateTime> <year>2013</year> <month>12</month> <day>1</day> </dateTime> </validityInformation> <bagAllowanceInformation> <bagAllowanceDetails> <baggageQuantity>1</baggageQuantity> <baggageType>N</baggageType> </bagAllowanceDetails> </bagAllowanceInformation> <segmentReference> <refDetails> <refQualifier>S</refQualifier> <refNumber>3</refNumber> </refDetails> </segmentReference> <sequenceInformation> <sequenceSection> <sequenceNumber>1</sequenceNumber> </sequenceSection> </sequenceInformation> </segmentInformation> <segmentInformation> <connexInformation> <connecDetails> <connexType>O</connexType> </connecDetails> </connexInformation> <segDetails> <segmentDetail> <identification>AIR</identification> <classOfService>V</classOfService> </segmentDetail> <segmentDetail> <identification>DIF</identification> <classOfService>N</classOfService> </segmentDetail> </segDetails> <fareQualifier> <fareBasisDetails> <primaryCode>VRD</primaryCode> <fareBasisCode>10FR9</fareBasisCode> <discTktDesignator>ADT</discTktDesignator> </fareBasisDetails> </fareQualifier> <validityInformation> <businessSemantic>A</businessSemantic> <dateTime> <year>2013</year> <month>12</month> <day>10</day> </dateTime> </validityInformation> <validityInformation> <businessSemantic>B</businessSemantic> <dateTime> <year>2013</year> <month>12</month> <day>10</day> </dateTime> </validityInformation> <bagAllowanceInformation> <bagAllowanceDetails> <baggageQuantity>0</baggageQuantity> <baggageType>N</baggageType> </bagAllowanceDetails> </bagAllowanceInformation> <segmentReference> <refDetails> <refQualifier>S</refQualifier> <refNumber>4</refNumber> </refDetails> </segmentReference> <sequenceInformation> <sequenceSection> <sequenceNumber>2</sequenceNumber> </sequenceSection> </sequenceInformation> </segmentInformation> <otherPricingInfo> <attributeDetails> <attributeType>TOU</attributeType> <attributeDescription> F TM0000</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>END</attributeType> <attributeDescription>NONREF / NO CHANGE</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>36</attributeType> <attributeDescription>NONREF /NO CHANGE</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>FCA</attributeType> <attributeDescription>PAR 6X LON M/IT 6X PAR M/IT END</attributeDescription> </attributeDetails> </otherPricingInfo> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>PEN</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>1A</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText>NON-REFUNDABLE</errorFreeText> </warningText> </warningInformation> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>LTD</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>1A</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText> - SEE ADV PURCHASE</errorFreeText> </warningText> </warningInformation> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>1A</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText>AIRLINE FEES INCLUDED</errorFreeText> </warningText> </warningInformation> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>1A</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText>CAT35 NEGOTIATED FARES</errorFreeText> </warningText> </warningInformation> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>1A</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText>TICKET STOCK RESTRICTION</errorFreeText> </warningText> </warningInformation> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>1A</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText>BG CXR 6X/6X</errorFreeText> </warningText> </warningInformation> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>1A</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText>PRICED WITH VALIDATING CARRIER 6X - REPRICE IF DIFFERENT VC</errorFreeText> </warningText> </warningInformation> <feeBreakdown> <feeType> <selectionDetails> <option>OB</option> </selectionDetails> </feeType> <feeDetails> <feeInfo> <dataTypeInformation> <type>T01</type> </dataTypeInformation> </feeInfo> <feeDescription> <freeTextQualification> <textSubjectQualifier>COM</textSubjectQualifier> </freeTextQualification> <freeText>TKT FEE</freeText> </feeDescription> <feeAmounts> <monetaryDetails> <typeQualifier>TIN</typeQualifier> <amount>40.58</amount> <currency>USD</currency> </monetaryDetails> </feeAmounts> </feeDetails> </feeBreakdown> <fareComponentDetailsGroup> <fareComponentID> <itemNumberDetails> <number>1</number> </itemNumberDetails> </fareComponentID> <couponDetailsGroup> <productId> <referenceDetails> <type>ST</type> <value>3</value> </referenceDetails> </productId> </couponDetailsGroup> </fareComponentDetailsGroup> <fareComponentDetailsGroup> <fareComponentID> <itemNumberDetails> <number>2</number> </itemNumberDetails> </fareComponentID> <couponDetailsGroup> <productId> <referenceDetails> <type>ST</type> <value>4</value> </referenceDetails> </productId> </couponDetailsGroup> </fareComponentDetailsGroup> <endFareList></endFareList> </fareList> <fareList> <pricingInformation> <tstInformation> <tstIndicator>F</tstIndicator> </tstInformation> <fcmi>N</fcmi> </pricingInformation> <fareReference> <referenceType>TST</referenceType> <uniqueReference>2</uniqueReference> </fareReference> <lastTktDate> <businessSemantic>LT</businessSemantic> <dateTime> <year>2013</year> <month>10</month> <day>13</day> </dateTime> </lastTktDate> <validatingCarrier> <carrierInformation> <carrierCode>6X</carrierCode> </carrierInformation> </validatingCarrier> <paxSegReference> <refDetails> <refQualifier>PA</refQualifier> <refNumber>2</refNumber> </refDetails> </paxSegReference> <fareDataInformation> <fareDataMainInformation> <fareDataQualifier>IT</fareDataQualifier> </fareDataMainInformation> <fareDataSupInformation> <fareDataQualifier>B</fareDataQualifier> <fareAmount>29.00</fareAmount> <fareCurrency>EUR</fareCurrency> </fareDataSupInformation> <fareDataSupInformation> <fareDataQualifier>E</fareDataQualifier> <fareAmount>39.00</fareAmount> <fareCurrency>USD</fareCurrency> </fareDataSupInformation> <fareDataSupInformation> <fareDataQualifier>712</fareDataQualifier> <fareAmount>251.29</fareAmount> <fareCurrency>USD</fareCurrency> </fareDataSupInformation> <fareDataSupInformation> <fareDataQualifier>TOF</fareDataQualifier> <fareAmount>40.58</fareAmount> <fareCurrency>USD</fareCurrency> </fareDataSupInformation> <fareDataSupInformation> <fareDataQualifier>TFT</fareDataQualifier> <fareAmount>210.71</fareAmount> <fareCurrency>USD</fareCurrency> </fareDataSupInformation> </fareDataInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>X</taxIdentifier> </taxIdentification> <taxType> <isoCountry>YR</isoCountry> </taxType> <taxNature>VB</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>62.22</fareAmount> <fareCurrency>USD</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>X</taxIdentifier> </taxIdentification> <taxType> <isoCountry>QX</isoCountry> </taxType> <taxNature>AP</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>17.50</fareAmount> <fareCurrency>USD</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>X</taxIdentifier> </taxIdentification> <taxType> <isoCountry>IZ</isoCountry> </taxType> <taxNature>EB</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>1.35</fareAmount> <fareCurrency>USD</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>X</taxIdentifier> </taxIdentification> <taxType> <isoCountry>FR</isoCountry> </taxType> <taxNature>SE</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>5.83</fareAmount> <fareCurrency>USD</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>X</taxIdentifier> </taxIdentification> <taxType> <isoCountry>FR</isoCountry> </taxType> <taxNature>TI</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>17.25</fareAmount> <fareCurrency>USD</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>X</taxIdentifier> </taxIdentification> <taxType> <isoCountry>GB</isoCountry> </taxType> <taxNature>AD</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>21.04</fareAmount> <fareCurrency>USD</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <taxInformation> <taxDetails> <taxQualifier>7</taxQualifier> <taxIdentification> <taxIdentifier>X</taxIdentifier> </taxIdentification> <taxType> <isoCountry>UB</isoCountry> </taxType> <taxNature>AS</taxNature> </taxDetails> <amountDetails> <fareDataMainInformation> <fareDataQualifier>TAX</fareDataQualifier> <fareAmount>46.52</fareAmount> <fareCurrency>USD</fareCurrency> </fareDataMainInformation> </amountDetails> </taxInformation> <bankerRates> <firstRateDetail> <amount>1.352631</amount> </firstRateDetail> </bankerRates> <originDestination> <cityCode>PAR</cityCode> <cityCode>PAR</cityCode> </originDestination> <segmentInformation> <connexInformation> <connecDetails> <connexType>O</connexType> </connecDetails> </connexInformation> <segDetails> <segmentDetail> <identification>AIR</identification> <classOfService>Q</classOfService> </segmentDetail> <segmentDetail> <identification>DIF</identification> <classOfService>N</classOfService> </segmentDetail> </segDetails> <fareQualifier> <fareBasisDetails> <primaryCode>QSR</primaryCode> <fareBasisCode>FR</fareBasisCode> <ticketDesignator>CH25</ticketDesignator> <discTktDesignator>CH</discTktDesignator> </fareBasisDetails> </fareQualifier> <validityInformation> <businessSemantic>A</businessSemantic> <dateTime> <year>2013</year> <month>12</month> <day>1</day> </dateTime> </validityInformation> <validityInformation> <businessSemantic>B</businessSemantic> <dateTime> <year>2013</year> <month>12</month> <day>1</day> </dateTime> </validityInformation> <bagAllowanceInformation> <bagAllowanceDetails> <baggageQuantity>1</baggageQuantity> <baggageType>N</baggageType> </bagAllowanceDetails> </bagAllowanceInformation> <segmentReference> <refDetails> <refQualifier>S</refQualifier> <refNumber>3</refNumber> </refDetails> </segmentReference> <sequenceInformation> <sequenceSection> <sequenceNumber>1</sequenceNumber> </sequenceSection> </sequenceInformation> </segmentInformation> <segmentInformation> <connexInformation> <connecDetails> <connexType>O</connexType> </connecDetails> </connexInformation> <segDetails> <segmentDetail> <identification>AIR</identification> <classOfService>V</classOfService> </segmentDetail> <segmentDetail> <identification>DIF</identification> <classOfService>N</classOfService> </segmentDetail> </segDetails> <fareQualifier> <fareBasisDetails> <primaryCode>VRD</primaryCode> <fareBasisCode>10FR9</fareBasisCode> <ticketDesignator>CH0</ticketDesignator> <discTktDesignator>CH</discTktDesignator> </fareBasisDetails> </fareQualifier> <validityInformation> <businessSemantic>A</businessSemantic> <dateTime> <year>2013</year> <month>12</month> <day>10</day> </dateTime> </validityInformation> <validityInformation> <businessSemantic>B</businessSemantic> <dateTime> <year>2013</year> <month>12</month> <day>10</day> </dateTime> </validityInformation> <bagAllowanceInformation> <bagAllowanceDetails> <baggageQuantity>0</baggageQuantity> <baggageType>N</baggageType> </bagAllowanceDetails> </bagAllowanceInformation> <segmentReference> <refDetails> <refQualifier>S</refQualifier> <refNumber>4</refNumber> </refDetails> </segmentReference> <sequenceInformation> <sequenceSection> <sequenceNumber>2</sequenceNumber> </sequenceSection> </sequenceInformation> </segmentInformation> <otherPricingInfo> <attributeDetails> <attributeType>TOU</attributeType> <attributeDescription>F TM0000</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>END</attributeType> <attributeDescription>NONREF / NO CHANGE</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>36</attributeType> <attributeDescription>NONREF /NO CHANGE</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>FCA</attributeType> <attributeDescription>PAR 6X LON M/IT 6X PAR M/IT END</attributeDescription> </attributeDetails> </otherPricingInfo> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>PEN</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>1A</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText>NON-REFUNDABLE</errorFreeText> </warningText> </warningInformation> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>LTD</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>1A</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText> - SEE ADV PURCHASE</errorFreeText> </warningText> </warningInformation> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>1A</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText>AIRLINE FEES INCLUDED</errorFreeText> </warningText> </warningInformation> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>1A</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText>CAT35 NEGOTIATED FARES</errorFreeText> </warningText> </warningInformation> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>1A</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText>TICKET STOCK RESTRICTION</errorFreeText> </warningText> </warningInformation> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>1A</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText>BG CXR 6X/6X</errorFreeText> </warningText> </warningInformation> <warningInformation> <warningCode> <applicationErrorDetail> <applicationErrorCode>0</applicationErrorCode> <codeListQualifier>WEC</codeListQualifier> <codeListResponsibleAgency>1A</codeListResponsibleAgency> </applicationErrorDetail> </warningCode> <warningText> <errorFreeText>PRICED WITH VALIDATING CARRIER 6X - REPRICE IF DIFFERENT VC</errorFreeText> </warningText> </warningInformation> <feeBreakdown> <feeType> <selectionDetails> <option>OB</option> </selectionDetails> </feeType> <feeDetails> <feeInfo> <dataTypeInformation> <type>T01</type> </dataTypeInformation> </feeInfo> <feeDescription> <freeTextQualification> <textSubjectQualifier>COM</textSubjectQualifier> </freeTextQualification> <freeText>TKT FEE</freeText> </feeDescription> <feeAmounts> <monetaryDetails> <typeQualifier>TIN</typeQualifier> <amount>40.58</amount> <currency>USD</currency> </monetaryDetails> </feeAmounts> </feeDetails> </feeBreakdown> <fareComponentDetailsGroup> <fareComponentID> <itemNumberDetails> <number>1</number> </itemNumberDetails> </fareComponentID> <couponDetailsGroup> <productId> <referenceDetails> <type>ST</type> <value>3</value> </referenceDetails> </productId> </couponDetailsGroup> </fareComponentDetailsGroup> <fareComponentDetailsGroup> <fareComponentID> <itemNumberDetails> <number>2</number> </itemNumberDetails> </fareComponentID> <couponDetailsGroup> <productId> <referenceDetails> <type>ST</type> <value>4</value> </referenceDetails> </productId> </couponDetailsGroup> </fareComponentDetailsGroup> <endFareList></endFareList> </fareList> </Fare\_PricePNRWithLowestFareReply>

## 5.1.3 Possible Errors

See "Error Messages" section.

* * *