---
url: "https://developers.amadeus.com/api-library/soap/functional-doc/2033/doc-read/9867?serviceVersion=17.1"
download_url: "https://developers.amadeus.com/PAS-EAS/api/download/comp/4d4ad2cb456c02633f463a055ab70584/9867/upload_14420507554145362920.html"
title: "HTML_UG_WBS_Service_IntegratedCatalogue_TPICGQ_17.1_005"
source: "amadeus"
service_id: "2033"
service_name: "Service_IntegratedCatalogue"
version: "17.1"
document_id: "9867"
doc_version: "17.1"
doc_type: "User guide"
file_format: "HTML"
scraped_at: "2026-07-15T10:44:17.603Z"
---
# Function: Service\_IntegratedCatalogue

* * *

## 1 Overview

This version of catalogue also returns:

-   **Integrated mode**: requested from the PNR, the system retrieves the context information from the PNR.
-   **Standalone mode**: the caller gives the context in input.

This user guide is about the integrated catalogue request.

This service requests a catalogue of airline ancillary services in integrated mode; that is, the context is retrieved from the data in an existing PNR (security, flight, passenger, and fare information). 

Additional information can also be included using the pricing options.

## 1.1 Supported Operations

The following pricing options can be specified in a request:

-   Account Code
-   Award Pricing
-   Bound Input
-   Corporate Number
-   Currency of Sale Override
-   Exclude Baggage Information
-   Filter By Group
-   Filter By Service Classification
-   Filter By Sub Group
-   Force Fee Break Point
-   Force No Fee Break Point
-   Force No Journey Turnaround Point
-   Force PTC
-   Force Slice And Dice
-   Frequent Flyer
-   Include Only Baggage Information
-   No Operation
-   Override Point of Sale
-   Override Pricing Date
-   Override PTC
-   Passenger Selection
-   Segment Selection
-   Show Only Issuable Recommendation
-   Show Service Commercial Description
-   Show Service Pricing Description
-   Ticket Designator Tier Level
-   Tour Code

## 1.2 Limitations

Where a large number of service recommendations is returned, the response is truncated and a warning message is issued.

## 1.3 Unsupported Operations

None

## 1.4 Prerequisites

A PNR must exist with at least one passenger and an itinerary.

Airline services must be filed in ATPCO, according to the implementation guidelines.

## 2 Building A Query

 The Service\_IntegratedCatalogue request is composed of the following element :

-   **<pricingOption>:** See sub structure
    

## 2.1 Sub Structure: pricingOption

## 2.1.1 Description

This element is composed of a **<pricingOptionKey>** element that defines the pricing option. The subsequent sub elements provide the required information.  The elements in **<pricingOption\>** are as follows:

-   **<pricingOptionKey>** :  Mandatory. Key defining the option used. It gives the attribute that determines the nature of the pricing request. All available pricing option keys are defined in sub structures.
-   **<optionDetail\>**:  Free text details for the pricing option. This element provides further details for the key chosen in **<pricingOptionKey>**.
-   **<carrierInformation\>**:  Carrier code information. This element provides an airline code.
-   **<currency>** 
    -   **<currencyQualifier\>**: Value is "FCO" for Fare Currency Override
    -   **<currencyIsoCode\>**: Standard currency code

-   **<penDisInformation\>**:  Penalty information. Note: This is not applicable for ancillaries
-   **<frequentFlyerInformation>**:  Frequent flyer information.
    -   **<carrier>**: The standard airline code
    -   **<number>**: The frequent flyer number
    -   **<tierLevel\>**: Descriptor for the membership level
    -   **<priorityCode\>**: Hierarchical level of the frequent flyer
-   **<locationInformation\>**:  Location information.
    -   **<locationType\>**: Specifies the location context with the following value: POS - Point of sale
    -   **<code>**: Provides a location code
-   **<ticketInformation>**: Ticket number information.
-   **<paxSegTstReference>:**  A reference to associate the option with a passenger or segment
    -   **<referenceDetails\>**
        -   **<type>**: It takes one of the following options:
            -   "E": Element
            -   "P": Passenger/traveller reference number
            -   "S": Segment/service reference number
        -   **<value>**: Provides the required identification number
-   **<dateInformation>**: This element provides any relevant date information
    -   **<businessSemantic\>** : Element to convey the context of the date/time expressed with the following value : DAT - Past date pricing
    -   **<****dateTime\>**: Defines a date:
        -   "2015": The year is expressed in four digits
        -   "6": The month is expressed numerically (January = 1)
        -   "10": The day is expressed numerically

-   **<formOfPaymentInformation>**: This element provides Form Of Payment (FOP) information. The **<formOfPayment\>** element provides the following details:
    -   **<type>**: Means of payment, expressed as one of the following values:
        -   "AGT": On behalf of/in exchange for a document previously issued by a sales agent
        -   "CA": Cash
        -   "CC": Credit card
        -   "CK": Check
        -   "GR": Government transportation request
        -   "MS": Miscellaneous
        -   "NR": Non-refundable (refund restricted)
        -   "PT": Prepaid ticket advice (PTA)
        -   "SGR": Single government transportation request
        -   "UN": United Nations transportation request
    -   **<amount>**: Monetary amount
    -   **<creditCardNumber\>**: Credit card number

## 2.1.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<body> <optionDetail> <criteriaDetails> <attributeType>MIL</attributeType> </criteriaDetails> </optionDetail> <carrierInformation> <companyIdentification> <otherCompany>6X</otherCompany> </companyIdentification> </carrierInformation> <currency> <firstCurrencyDetails> <currencyQualifier>FCO</currencyQualifier> <currencyIsoCode>GBP</currencyIsoCode> </firstCurrencyDetails> </currency> <dateInformation> <businessSemantic>DAT</businessSemantic> <dateTime> <year>2015</year> <month>6</month> <day>10</day> </dateTime> </dateInformation> <frequentFlyerInformation> <frequentTravellerDetails> <carrier>6X</carrier> <number>1234567891011</number> <tierLevel>SILVER</tierLevel> <priorityCode>1</priorityCode> </frequentTravellerDetails> </frequentFlyerInformation> <formOfPaymentInformation> <formOfPayment> <type>CC</type> <amount>200</amount> <creditCardNumber>xxxxxxxxxxxx</creditCardNumber> </formOfPayment> </formOfPaymentInformation> <locationInformation> <locationType>POS</locationType> <firstLocationDetails> <code>PAR</code> </firstLocationDetails> <secondLocationDetails> <code>BLN</code> </secondLocationDetails> </locationInformation> <paxSegTstReference> <referenceDetails> <type>P</type> <value>1234567</value> </referenceDetails> </paxSegTstReference> </body>

## 2.2 Sub Structure: pricingOption - Account code

## 2.2.1 Description

Account code is identifying a contract for a given airline and is handled by the airlines. It allows to be eligible to a specific fare.

The account code can be generic for the PNR or specified at passenger level.

**<pricingOptionKey>**: ACC

## 2.2.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOption> <pricingOptionKey> <pricingOptionKey>ACC</pricingOptionKey> </pricingOptionKey> <optionDetail> <criteriaDetails> <attributeType>HP</attributeType> </criteriaDetails> </optionDetail> <paxSegTstReference> <referenceDetails> <type>P</type> <value>1</value> </referenceDetails> </paxSegTstReference> </pricingOption>

## 2.3 Sub Structure: pricingOption - Award

## 2.3.1 Description

This option is set to request a catalogue in an award currency.

**<pricingOptionKey>**: AWD

**<optionDetail\>**: Optional. Specifies the award program to be targetted.

-   It can be one of the following values:
    -   "MIL": Miles
    -   "PTS": Points
    -   "EVO": E-Voucher
-   In case the award program is not specified, default program is targetted (default program can changed from a pricing engine to another)

## 2.3.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOption> <pricingOptionKey> <pricingOptionKey>AWD</pricingOptionKey> </pricingOptionKey> <optionDetail> <criteriaDetails> <attributeType>MIL</attributeType> </criteriaDetails> </optionDetail> </pricingOption>

## 2.4 Sub Structure: pricingOption - Baggage Ready

## 2.4.1 Description

This option allows to price and return baggage chargeable services of type C for touchpoints who request this explicitly.

**<pricingOptionKey>**: BGR

## 2.4.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOption> <pricingOptionKey> <pricingOptionKey>BGR</pricingOptionKey> </pricingOptionKey> </pricingOption>

## 2.5 Sub Structure: pricingOption - Bound

## 2.5.1 Description

The Bound option allows the user to dispatch the flights into a list of bounds. This bound composition will be taken into account by the pricing engine for the price calculation.

**<pricingOptionKey>**: BND

## 2.5.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOption> <pricingOptionKey> <pricingOptionKey>BND</pricingOptionKey> </pricingOptionKey> <optionDetail> <criteriaDetails> <attributeType>1</attributeType> </criteriaDetails> </optionDetail> <paxSegTstReference> <referenceDetails> <type>S</type> <value>1</value> </referenceDetails> </paxSegTstReference> </pricingOption>

## 2.6 Sub Structure: pricingOption - Corporation number

## 2.6.1 Description

This option takes in input a corporate code defined on 6 numerical characteres. 

This corporate code can be either generic or specified at passenger level - maximum is 6 per passenger.

**<pricingOptionKey>**: CRP

## 2.6.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOption> <pricingOptionKey> <pricingOptionKey>CRP</pricingOptionKey> </pricingOptionKey> <optionDetail> <criteriaDetails> <attributeType>123456</attributeType> </criteriaDetails> </optionDetail> <paxSegTstReference> <referenceDetails> <type>P</type> <value>1</value> </referenceDetails> </paxSegTstReference> </pricingOption>

## 2.7 Sub Structure: pricingOption - Exclude

## 2.7.1 Description

This option can be used for example to remove all of the services filled as baggage allowance from the catalogue using : 

-   **<optionDetail\>**
    -    **<criteriaDetails\>**
        -    **<attributeType\>**: MBI

**<pricingOptionKey>**: EXC

## 2.7.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOption> <pricingOptionKey> <pricingOptionKey>EXC</pricingOptionKey> </pricingOptionKey> <optionDetail> <criteriaDetails> <attributeType>MBI</attributeType> </criteriaDetails> </optionDetail> </pricingOption>

## 2.8 Sub Structure: pricingOption - Fare Currency Override

## 2.8.1 Description

The user may wish to override the default currency of the point of sale, the results of the catalogue display will be returned in the override currency.

**<pricingOptionKey>**: FCO

## 2.8.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOption> <pricingOptionKey> <pricingOptionKey>FCO</pricingOptionKey> </pricingOptionKey> <currency> <firstCurrencyDetails> <currencyQualifier>FCO</currencyQualifier> <currencyIsoCode>USD</currencyIsoCode> </firstCurrencyDetails> </currency> </pricingOption>

## 2.9 Sub Structure: pricingOption - Force Fee Breakpoint

## 2.9.1 Description

**<pricingOptionKey>**: FFB

## 2.9.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOption> <pricingOptionKey> <pricingOptionKey>FFB</pricingOptionKey> </pricingOptionKey> <paxSegTstReference> <referenceDetails> <type>S</type> <value>1</value> </referenceDetails> </paxSegTstReference> </pricingOption>

## 2.10 Sub Structure: pricingOption - Force PTC

## 2.10.1 Description

This option is used with Override PTC pricing option. This avoids a default behaviour in the process if no fare is found for the requested PTC.

**<pricingOptionKey>**: PTC

## 2.10.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOption> <pricingOptionKey> <pricingOptionKey>PTC</pricingOptionKey> </pricingOptionKey> </pricingOption>

## 2.11 Sub Structure: pricingOption - Force slice and dice

## 2.11.1 Description

Slice & dice allows airlines to define sub-O&D availabilities. Through FSD option, if product is activated for the requested airlines, sub-O&D availability context will be considered. 

**<pricingOptionKey>**: FSD

## 2.11.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOption> <pricingOptionKey> <pricingOptionKey>FSD</pricingOptionKey> </pricingOptionKey> </pricingOption>

## 2.12 Sub Structure: pricingOption - Frequent Flyer

## 2.12.1 Description

**<pricingOptionKey>**: FTI

## 2.12.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOption> <pricingOptionKey> <pricingOptionKey>FTI</pricingOptionKey> </pricingOptionKey> <frequentFlyerInformation> <frequentTravellerDetails> <carrier>6X</carrier> <number>123445678</number> <tierLevel>GOLD</tierLevel> <priorityCode>1</priorityCode> </frequentTravellerDetails> </frequentFlyerInformation> <paxSegTstReference> <referenceDetails> <type>P</type> <value>1</value> </referenceDetails> </paxSegTstReference> </pricingOption>

## 2.13 Sub Structure: pricingOption - Include only

## 2.13.1 Description

Include only baggage information or baggage full information.

**<pricingOptionKey>**: INC

## 2.13.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOption> <pricingOptionKey> <pricingOptionKey>INC</pricingOptionKey> </pricingOptionKey> <optionDetail> <criteriaDetails> <attributeType>BGI</attributeType> </criteriaDetails> </optionDetail> </pricingOption>

## 2.14 Sub Structure: pricingOption - No Fee Break point

## 2.14.1 Description

**<pricingOptionKey>**: FNB

## 2.14.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOption> <pricingOptionKey> <pricingOptionKey>FNB</pricingOptionKey> </pricingOptionKey> <paxSegTstReference> <referenceDetails> <type>S</type> <value>1</value> </referenceDetails> </paxSegTstReference> </pricingOption>

## 2.15 Sub Structure: pricingOption - No journey turnaround point

## 2.15.1 Description

The option prevents the system from breaking the fare at one single designated city in the itinerary.

**<pricingOptionKey>**: NJT

## 2.15.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOption> <pricingOptionKey> <pricingOptionKey>NJT</pricingOptionKey> </pricingOptionKey> </pricingOption>

## 2.16 Sub Structure: pricingOption - No option

## 2.16.1 Description

**<pricingOptionKey>**: NOP

## 2.16.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOption> <pricingOptionKey> <pricingOptionKey>NOP</pricingOptionKey> </pricingOptionKey> </pricingOption>

## 2.17 Sub Structure: pricingOption - Override point of sale

## 2.17.1 Description

**<pricingOptionKey>**: POS

## 2.17.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOption> <pricingOptionKey> <pricingOptionKey>POS</pricingOptionKey> </pricingOptionKey> <locationInformation> <locationType>POS</locationType> <firstLocationDetails> <code>LON</code> </firstLocationDetails> </locationInformation> </pricingOption>

## 2.18 Sub Structure: pricingOption - Override PTC

## 2.18.1 Description

This option overrides the PTC stored in the PNR. If no fare is found for the requested PTC, Pricing Engine tries to default to a generic one. 

**<pricingOptionKey>**: PAX

## 2.18.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOption> <pricingOptionKey> <pricingOptionKey>PAX</pricingOptionKey> </pricingOptionKey> <optionDetail> <criteriaDetails> <attributeType>CHD</attributeType> </criteriaDetails> </optionDetail> </pricingOption>

## 2.19 Sub Structure: pricingOption - Pricing Date Override

## 2.19.1 Description

The Pricing Date Override option displays a catalogue by using the fares for the available services on a date different than the date of the catalogue request. The currency conversion is taken from the current date.

**<pricingOptionKey>**: DAT

## 2.19.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOption> <pricingOptionKey> <pricingOptionKey>DAT</pricingOptionKey> </pricingOptionKey> <dateInformation> <businessSemantic>DAT</businessSemantic> <dateTime> <year>2017</year> <month>08</month> <day>05</day> </dateTime> </dateInformation> </pricingOption>

## 2.20 Sub Structure: pricingOption - Selection

## 2.20.1 Description

A catalogue can be requested for one or several passengers/segments. In integrated mode, it is possible to request the catalogue only for given passenger(s)/segment(s) from the PNR.

Maximum number of passengers is 99.

**<pricingOptionKey>**:SEL  

## 2.20.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOption> <pricingOptionKey> <pricingOptionKey>SEL</pricingOptionKey> </pricingOptionKey> <paxSegTstReference> <referenceDetails> <type>P</type> <value>1</value> </referenceDetails> </paxSegTstReference> </pricingOption>

## 2.21 Sub Structure: pricingOption - Service classification filter

## 2.21.1 Description

The agent can filter catalogue output by service type, choosing one among the following type codes:

-   "F": Flight related services
-   "M": Merchandise
-   "A": Baggage allowance and detailed baggage allowance
-   "B": Carry-on allowance and detailed carry-on allowance
-   "C": Excess charges
-   "P": Pre-paid charges

**<pricingOptionKey>**: SCF

## 2.21.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOption> <pricingOptionKey> <pricingOptionKey>SCF</pricingOptionKey> </pricingOptionKey> <optionDetail> <criteriaDetails> <attributeType>F</attributeType> </criteriaDetails> </optionDetail> </pricingOption>

## 2.22 Sub Structure: pricingOption - Service group filtering

## 2.22.1 Description

The agent can choose to request a catalogue of services that are belonging to a specific group.

You can enter only one **<criteriaDetails\>** group.

**<pricingOptionKey>**: GRP

## 2.22.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOption> <pricingOptionKey> <pricingOptionKey>GRP</pricingOptionKey> </pricingOptionKey> <optionDetail> <criteriaDetails> <attributeType>ML</attributeType> </criteriaDetails> </optionDetail> </pricingOption>

## 2.23 Sub Structure: pricingOption - Service sub-group filtering

## 2.23.1 Description

The agent can choose to request a catalogue of services that are belonging to a specific sub-group.

You can enter only one **<criteriaDetails\>** group.

**<pricingOptionKey>**: SUB

## 2.23.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOption> <pricingOptionKey> <pricingOptionKey>SUB</pricingOptionKey> </pricingOptionKey> <optionDetail> <criteriaDetails> <attributeType>SP</attributeType> </criteriaDetails> </optionDetail> </pricingOption>

## 2.24 Sub Structure: pricingOption - Show commercial description

## 2.24.1 Description

This option returns the full commercial description of the service as filled by the airline.

**<pricingOptionKey>**: SCD

## 2.24.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOption> <pricingOptionKey> <pricingOptionKey>SCD</pricingOptionKey> </pricingOptionKey> </pricingOption>

## 2.25 Sub Structure: pricingOption - Show only issuable recommendation

## 2.25.1 Description

This option allows displaying only the services that can be issued later in the flow. 

**<pricingOptionKey>**: OIS

## 2.25.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOption> <pricingOptionKey> <pricingOptionKey>OIS</pricingOptionKey> </pricingOptionKey> </pricingOption>

## 2.26 Sub Structure: pricingOption - Show pricing description

## 2.26.1 Description

With the option SPD, the service pricing description is fully displayed. For instance, for excess baggage, it indicates the price per kilogram.

**<pricingOptionKey>**: SPD

## 2.26.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOption> <pricingOptionKey> <pricingOptionKey>SPD</pricingOptionKey> </pricingOptionKey> </pricingOption>

## 2.27 Sub Structure: pricingOption - Standard baggage filtering

## 2.27.1 Description

This option is used to request only either the first, or first and second standard baggage.

**<pricingOptionKey>**: STD

## 2.27.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOption> <pricingOptionKey> <pricingOptionKey>STD</pricingOptionKey> </pricingOptionKey> <optionDetail> <criteriaDetails> <attributeType>BAG</attributeType> <attributeDescription>FIRST</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>BAG</attributeType> <attributeDescription>SECOND</attributeDescription> </criteriaDetails> </optionDetail> </pricingOption>

## 2.28 Sub Structure: pricingOption - Ticket designator

## 2.28.1 Description

This option allows the agent to specify a ticket designator used for the pricing of the available services in the catalogue display.

Maximum of 6 ticket designators (up to 10 alphanumeric characters each) can be requested per passenger.

**<pricingOptionKey>**: TKD

## 2.28.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOption> <pricingOptionKey> <pricingOptionKey>TKD</pricingOptionKey> </pricingOptionKey> <optionDetail> <criteriaDetails> <attributeType>A2B2</attributeType> </criteriaDetails> </optionDetail> </pricingOption>

## 2.29 Sub Structure: pricingOption - Tier level

## 2.29.1 Description

This option allows to specific the tier level in order to return the ancillary services defined for this frequent flyer status only. 

**<pricingOptionKey>**: LVL

## 2.29.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOption> <pricingOptionKey> <pricingOptionKey>LVL</pricingOptionKey> </pricingOptionKey> <frequentFlyerInformation> <frequentTravellerDetails> <carrier>6X</carrier> <tierLevel>GOLD</tierLevel> </frequentTravellerDetails> </frequentFlyerInformation> </pricingOption>

## 3 Receiving A Reply

A successful response can contain the following elements:

-   **<pricingIndicator>**:  Contains the list of codes identifying the pricing logic used to elaborate the catalogue content.
-   **<pricingDate>**:  Contains date and time at which catalogue was priced.
-   **<passengerGroup>**:  Contains the list of passengers for which catalogue was requested, enriched with discount codes and frequent flyer information, when applicable.
-   **<flightInfo>**:  Contains the list of flights for which catalogue was requested, enriched with operational and codeshare information, when applicable.
-   **<portions>**:  Contains the list of itinerary portions to which service prices can be associated.
-   **<ssrInformation>**:  Contains the list of formats for the SSR present in the pricing output (in allFaresInfoGroup).  The structure of this group comes from the RES interface, the getSSRCatalogue.
-   **<serviceGroup>**:  Contains all pricing data, summarises passenger and flight association and provides detailed information on the characteristics of the priced services.

Each element is described below.

## 3.1 Sub Structure: Catalogue Biasing

## 3.1.1 Description

The goal of this feature is to optimize the display of the ancillary catalogue: filter the relevant services, sort and highlight the most valued services.

This is all based on rules filed through AAM. So, this is an automatic process not dependent on an option to be set in input. Please liaise with your implementation POC to put in place this feature.

When a rule is matched and define an order in which the service must appear or give a special status so that the service is highlighted, then a highlight indicator and a weight is returned and is identified in output

## 3.1.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<serviceAttributes> <criteriaSetType>MER</criteriaSetType> <criteriaDetails> <attributeType>HGT</attributeType> <attributeDescription>Y</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>WGT</attributeType> <attributeDescription>1</attributeDescription> </criteriaDetails> </serviceAttributes>

* * *

## 3.2 Sub Structure: flightInfo

## 3.2.1 Description

This group contains all flight data available from the context. The reply contains as many repetitions of this group as the number of flights of the journey for which catalogue was requested.

### flightDetails

This segment contains:

-   flight date and time (**flightDate**)
-   departure and arrival city or airport codes (**boardPointDetails** and **offPointDetails**)
-   airline codes of marketing and operating carriers (**companyDetails**)
-   flight number and booking class (**flightIdentification**)
-   stopover or connection or point of turnaround indicator (**flightTypeDetails**)
-   unique flight identifier (**itemNumber**)

<flightDetails\>  
<flightDate\>  
<departureDate\>210713</departureDate\>  
<departureTime\>1000</departureTime\>  
<arrivalDate\>210713</arrivalDate\>  
<arrivalTime\>1100</arrivalTime\>  
</flightDate\>  
<boardPointDetails\>  
<trueLocationId\>NCE</trueLocationId\>  
</boardPointDetails\>  
<offpointDetails>  
<trueLocationId\>CDG</trueLocationId\>  
</offpointDetails>  
<companyDetails\>  
<marketingCompany\>6X</marketingCompany\>  
</companyDetails\>  
<flightIdentification\>  
<flightNumber\>7824</flightNumber\>  
<bookingClass\>Y</bookingClass\>  
</flightIdentification\>  
<flightTypeDetails>  
<flightIndicator\>V</flightIndicator\>  
</flightTypeDetails>  
<itemNumber\>1</itemNumber\>  
</flightDetails\>

### travelItineraryInfo

This segment contains additional flight information:

-   **cabinDesignator**: one letter cabin code designator
-   **flightIndicator**: international or domestic flight indicator

<travelItineraryInfo>  
<cabinDesignator\>Y</cabinDesignator\>  
<productTypeDetails\>  
<flightIndicator\>DOM</flightIndicator\>  
</productTypeDetails\>  
</travelItineraryInfo>

### additionalFlightInfo

Code designating the equipment operating the flight is stored in '_equipment'_ field.

<additionalFlightInfo\>  
<legDetails\>  
<equipment>123</equipment>  
</legDetails\>  
</additionalFlightInfo\>

### codeshareInfo

This segment contains detailed codeshare agreement information.

-   **transportStageQualifier**: code describing the role of the partner airline
-   **airlineDesignator**: carrier code of codeshare partner
-   **flightNumber**: flight number for partner carrier
-   **operationalSuffix**: suffix code for partner airline

<codeshareInfo>  
<codeshareDetails\>  
<transportStageQualifier\>D</transportStageQualifier\>  
<airlineDesignator\>DL</airlineDesignator\>  
<flightNumber\>7855</flightNumber\>  
</codeshareDetails\>  
</codeshareInfo>

## 3.2.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<flightInfo> <flightDetails> <flightDate> <departureDate>210713</departureDate> <departureTime>1000</departureTime> <arrivalDate>210713</arrivalDate> <arrivalTime>1100</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>NCE</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>CDG</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>7824</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> <flightTypeDetails> <flightIndicator>V</flightIndicator> </flightTypeDetails> <itemNumber>1</itemNumber> </flightDetails> <travelItineraryInfo> <cabinDesignator>Y</cabinDesignator> <productTypeDetails> <flightIndicator>DOM</flightIndicator> </productTypeDetails> </travelItineraryInfo> <additionalFlightInfo> <legDetails> <equipment>123</equipment> </legDetails> </additionalFlightInfo> <codeshareInfo> <codeshareDetails> <transportStageQualifier>D</transportStageQualifier> <airlineDesignator>DL</airlineDesignator> <flightNumber>7855</flightNumber> </codeshareDetails> </codeshareInfo> </flightInfo>

* * *

## 3.3 Sub Structure: Pack of services

## 3.3.1 Description

Pack of services (ancillary bundles) is a feature which enables to package two or more ancillary offerings at a single, discounted price.

This is purely filing activity (in ATPCO, AAM, SSR definition). For webservice, there is not a specific input option to use to trigger the process.

In AAS Catalogue WBS, there is a recommendation for the Pack, with same information as any other Ancillary services, except that there is also references to the sub-services included in the Pack. These sub-services are detailed in other recommendations of the Catalogue output.

**serviceAssociation**

The way to identify the pack recommendation is to find the unique Reference equals to PACK. Action category is also important since it gives an Id number to the pack (needed when there are multiple pack returned). Each service has a codeset SRV and a prime Id associated.

**serviceGroup**

-   Sub-service returned as a recommendation (serviceId/itemNumberDetails/number)
-   ServiceAssociation  
    -   Service in the pack (uniqueReference and actionCategory)
    -   Pack reference (referenceQualifier and primeId)

## 3.3.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Service\_IntegratedCatalogueReply> <serviceGroup> <serviceId> <itemNumberDetails> <number>93</number> <type>ITI</type> </itemNumberDetails> </serviceId> <passengerAndFlightAssociation> <rangeQualifier>S</rangeQualifier> <rangeDetails> <min>1</min> <max>2</max> </rangeDetails> </passengerAndFlightAssociation> <passengerAndFlightAssociation> <rangeQualifier>P</rangeQualifier> <rangeDetails> <min>2</min> <max>3</max> </rangeDetails> </passengerAndFlightAssociation> <serviceAssociation> <uniqueReference>PACK</uniqueReference> <actionCategory>1</actionCategory> <idSection> <referenceQualifier>SRV</referenceQualifier> <primeId>1</primeId> </idSection> <idSection> <referenceQualifier>SRV</referenceQualifier> <primeId>2</primeId> </idSection> <idSection> <referenceQualifier>SRV</referenceQualifier> <primeId>3</primeId> </idSection> </serviceAssociation> <serviceCodes> <specialCondition>E</specialCondition> <otherSpecialCondition>PAC</otherSpecialCondition> </serviceCodes> <serviceAttributes> <criteriaDetails> <attributeType>CNM</attributeType> <attributeDescription>PACK RAPIDO</attributeDescription> </criteriaDetails> </serviceAttributes> <serviceAttributes> <criteriaDetails> <attributeType>EMD</attributeType> <attributeDescription>2</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>BKM</attributeType> <attributeDescription>01</attributeDescription> </criteriaDetails> </serviceAttributes> </serviceGroup> </Service\_IntegratedCatalogueReply>

* * *

## 3.4 Sub Structure: passengerGroup

## 3.4.1 Description

This group contains all passenger data available from the context. The reply contains as many repetitions of this group as the number of passengers for which catalogue was requested.

### paxReference

The unique passenger identifier is defined here.

-   **type**: this field indicates the Passenger Type Code (booking PTC).

-   **value**: unique numeric passenger identifier.

<paxReference>  
<passengerReference>  
<type>ADT</type>  
<value>1</value>  
</passengerReference>  
</paxReference>

### discountCodes

In case discount codes have been applied to the passenger, their codes are listed in this element.

Following fields are used in case discount has a date limitation:

-   **startDate**: date before which discount code is not valid.
-   **endDate**: date after which discount code is not valid.

Discount code is stored in _'discountName'_ field.

<discountCodes>  
<discountGroup>  
<startDate>010112</startDate>  
<endDate>311213</endDate>  
</discountGroup>  
<discountName>MIL</discountName>  
</discountCodes>

### frequentTravellerGroup

This group conveys frequent traveller data. For each passenger, the reply contains as many repetitions of this group as the number of frequent flier identifiers in the context.

Data are organized as follows:

-   **frequentTravellerCompany**: airline code of the carrier providing the frequent flier program
-   **frequentTravellerNumber**: frequent traveler identification code
-   **tierLevel**: membership level
-   **priorityCode**: hierarchical ID number
-   **customerValue**: passenger priority value
-   **type**: item number type

In addition, frequent flier miles and/or points balance can be conveyed in _'balance'_ segment:

-   **typeQualifier**: contains the total indicator
-   **amount**: balance amount
-   **currency**: balance measure unit (miles, points, and so on)
-   **location**: location identification

<frequentTravellerGroup>  
<frequentTravellerInfo>  
<frequentTravellerDetails>  
<carrier>6X</carrier>  
<number>12345678</number>  
<tierLevel>3</tierLevel>  
<priorityCode>702</priorityCode>  
</frequentTravellerDetails>  
</frequentTravellerInfo>  
<balance>  
<monetaryDetails>  
<typeQualifier>T</typeQualifier>  
<amount>20000</amount>  
<currency>MIL</currency>  
</monetaryDetails>  
</balance>  
</frequentTravellerGroup>

## 3.4.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<passengerGroup> <paxReference> <passengerReference> <type>ADT</type> <value>1</value> </passengerReference> </paxReference> <discountCodes> <discountGroup> <startDate>010112 </startDate> <endDate>311213 </endDate> </discountGroup> <discountName>MIL</discountName> </discountCodes> <frequentTravellerGroup> <frequentTravellerInfo> <frequentTravellerDetails> <carrier>6X</carrier> <number>12345678</number> <tierLevel>3</tierLevel> <priorityCode>702</priorityCode> </frequentTravellerDetails> </frequentTravellerInfo> <balance> <monetaryDetails> <typeQualifier>T</typeQualifier> <amount>20000</amount> <currency>MIL</currency> </monetaryDetails> </balance> </frequentTravellerGroup> </passengerGroup>

* * *

## 3.5 Sub Structure: portions

## 3.5.1 Description

List of services and prices may vary according to several factors like option used in input, service type or itinerary. Service prices can be associated to flight segments or to a group of segments. In some cases, such groups of segments define sub-itineraries (for example bound, baggage travel unit) that are defined in this group.

### travelPortions

This segment contains travel portions definitions:

-   **type**: code indicating the type of portion (bound, baggage travel unit, and so on)
-   **value**: unique identifier of the portion type.

### flightAssociation

Range of flights belonging to the portion listed in this field.

-   **dataType**: indicating if a range or a single element is listed.
-   **min**: unique flight identifier of first segment belonging to the range.
-   **max**: unique flight identifier of last segment belonging to the range. Not used in case a single flight belongs to the portion.

## 3.5.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<portions> <travelPortions> <referenceDetails> <type>BTU</type> <value>1</value> </referenceDetails> </travelPortions> <flightAssociation> <rangeQualifier>S</rangeQualifier> <rangeDetails> <min>1</min> <max>2</max> </rangeDetails> </flightAssociation> </portions>

* * *

## 3.6 Sub Structure: Price adjustment

## 3.6.1 Description

The price adjustment process works automatically provided that biasing rules filed in AAM (Amadeus Anytime Merchandizing). There is no impact in input.

When a biasing rule filed by the airline is matched, the price of the service is adjusted accordingly, and the ancillary engine returned the original value before biasing under the monetary section in the qualifier type TNB (Original Amount before biasing) in the Fare Component Service Attributes. Discount identifier, reason for discount, owner of the discount are also returned.

In case promocode is applied, promocode name is sent in the qualifier type PCM in additional on the mentioned attributes (see operation promocode for details).

In case both promocode and discount apply, only promocode RID, DID, PCM and DST are returned. Discount data (DID, RID) are ignored.

## 3.6.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<fareComponentServiceAttributes> <attributeDetails> <attributeType>DID</attributeType> <attributeDescription>LO-1257923</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>RID</attributeType> <attributeDescription>REASONFORDISCOUNT</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>DSO</attributeType> <attributeDescription>6X</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>DST</attributeType> <attributeDescription>D</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>PCM</attributeType> <attributeDescription>PROMOCODE</attributeDescription> </attributeDetails> </fareComponentServiceAttributes>

* * *

## 3.7 Sub Structure: pricingDate

## 3.7.1 Description

This segment contains the pricing date and time where catalogue recommendations were calculated.

## 3.7.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingDate> <dateAndTimeDetails> <date>151012</date> <time>1137</time> </dateAndTimeDetails> </pricingDate>

* * *

## 3.8 Sub Structure: pricingIndicator

## 3.8.1 Description

This segment contains global indicators summarising the conditions that apply to pricing.

Most used pricing indicators:

-   IAT: RESO302 itinerary
-   UDT: USDoT itinerary
-   CTA: CADoT itinerary  
    
-   NFP: no fare information provided
-   PBS: pricing requested by sector
-   PSV: pricing by sector is valid
-   SCI: pricing done by sector and service components priced are independent
-   PDI: pricing description included
-   CDI: commercial description included
-   PDE: pricing description excluded

## 3.8.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingIndicator> <priceTicketDetails> <indicators>IAT</indicators> </priceTicketDetails> </pricingIndicator>

* * *

## 3.9 Sub Structure: Rich Media

## 3.9.1 Description

The picture number is received in the attribute MED in the Fare Component Service Attributes. In standalone process, it comes from ATPCO filing. The information can also come from the AAM AAS Rich Media biasing on priced Ancillary Services.

For each service considered for pricing, the process checks if a rich media rule has been matched on rules filed in AAM based on different criteria like Service Carrier, Ancillary Service identifiers, Seat characteristics, Passenger information, Flights, etc.

In case a match is found, then the picture number received override the picture number (Media reference or Media Id) which may have been returned by the standard process (ATPCO filing)

There is no option to set in input to trigger the process.

There is impact in output due to the usage of this feature since the goal is to override the media reference

## 3.9.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<fareComponentServiceAttributes> <attributeDetails> <attributeType>MED</attributeType> <attributeDescription>68686348</attributeDescription> </attributeDetails> </fareComponentServiceAttributes>

* * *

## 3.10 Sub Structure: serviceGroup

## 3.10.1 Description

This element contains all pricing data, a summary of passenger and flight association, and it provides detailed information on the characteristics of the priced services.

### serviceId

A unique service identifier is returned in this field with a code describing the service category:

-   **number**: unique service numeric identifier
-   **type**: 2- or 3-letters code indicating the category to which the service belongs.

The _type_ field can take one of the following values:

-   SR: Service Request
-   PR: passenger Recommendation
-   FBA: Free Baggage Allowance
-   PFA: Prepaid Frequent Flyer Allowance
-   EFA: Excess Frequent Flyer Allowance
-   MBI: Mandatory Baggage Information
-   DB: Detailed baggage
-   CBF: Checked Baggage Fee
-   COA: Carry-on Allowance
-   COD: Carry-on Details
-   COC: Carry-on Charges
-   ECB: Excess Checked Baggage
-   ECO: Excess Carry-on
-   EMB: Baggage items subject to Embargo
-   ITI: Computed by factorising bound recommendations
-   PB: Prepaid Baggage

<serviceId>  
<itemNumberDetails>  
<number>1</number>  
<type>SR</type>  
</itemNumberDetails>  
</serviceId>

### passengerAndFlightAssociation

This field contains the unique identifiers for passengers and flights or itinerary portions to which the service is associated. Code indicating passenger, BTU, segment or range association is stored in '_rangeQualifier'_ field. Range of elements associated to the service is listed in _'rangeDetails'_ field:

-   **dataType**: indicating if a passenger, a BTU, or segments are listed;
-   **min**: unique identifier of first element belonging to the range;
-   **max**: unique identifier of last element belonging to the range. Not used in case a single element is listed.

Please note that Embargo recommendations can be associated either to segments, either to a given BTU, depending on the determined coverage of Embargo (it can apply either to a checked portion, either to the entire BTU).

<passengerAndFlightAssociation>  
<rangeQualifier\>S</rangeQualifier\>  
<rangeDetails\>  
<min>1</min>  
</rangeDetails\>  
</passengerAndFlightAssociation>  
<passengerAndFlightAssociation>  
<rangeQualifier\>P</rangeQualifier\>  
<rangeDetails\>  
<min>1</min>  
</rangeDetails\>  
</passengerAndFlightAssociation>

<passengerAndFlightAssociation>  
      <rangeQualifier>S</rangeQualifier>  
      <rangeDetails>  
        <min>1</min>  
        <max>2</max>  
      </rangeDetails>  
    </passengerAndFlightAssociation>  
    <passengerAndFlightAssociation>  
      <rangeQualifier>P</rangeQualifier>  
      <rangeDetails>  
        <min>1</min>  
        <max>2</max>  
      </rangeDetails>  
    </passengerAndFlightAssociation>

<passengerAndFlightAssociation>  
      <rangeQualifier>BTU</rangeQualifier>  
      <rangeDetails>  
        <min>1</min>  
      </rangeDetails>  
    </passengerAndFlightAssociation>  
    <passengerAndFlightAssociation>  
      <rangeQualifier>P</rangeQualifier>  
      <rangeDetails>  
        <min>1</min>  
        <max>2</max>  
      </rangeDetails>  
    </passengerAndFlightAssociation>

### uniquePassengerId

This field contains the unique identifiers for passengers in case UCI or DID have been used in the query. Code indicating the identifier type is stored in '_type'_ field, UCI or DID code is stored in _'value'_ field.

<uniquePassengerId>

<referenceDetails\>

<type>DID</type>

<value>12345678987654</value>

</referenceDetails\>

</uniquePassengerId>

### serviceAssociation

In case of a pack of services, this field is used to carry internal references of services that are part of the same pack.

### serviceCodes

This field contains Reason For Issuance Code (RFIC) and Reason For Issuance SubCode (RFISC) identifying the service.

-   **specialCondition**: Reason For Issuance Code (RFIC)
-   **otherSpecialCondition**: Reason For Issuance SubCode (RFISC)

<serviceCodes>  
<specialCondition\>C</specialCondition\>  
<otherSpecialCondition\>0AA</otherSpecialCondition\>  
</serviceCodes>

### serviceDetailsGroup

This group contains detailed information on the returned service. The service group contains as many serviceDetailsGroup repetition as the number of booking formats needed to correctly book the service on the selected flights.

_'serviceDetails'_ segment contains:

-   **ssrCode**: code to be used to book the service
-   **actionCode**: service classification (flight related, merchandise, prepaid baggage, excess baggage)
-   **numberInParty**: number of priced units. When not indicated, the price is intended for one service unit.
-   **airlineCode**: carrier code for which booking code and format are valid.
-   **serviceType**: ATPCO group
-   **otherServiceType**: ATPCO subgroup
-   **serviceFreeText**: additional SSR description

If service is a seat, additional details are conveyed in this field.

-   **seatNumber**: seat number
-   **measureUnitQualifier**: used, if relevant, to complete seat number information
-   **crossRef**: traveller reference number (for future use)
-   **seatCharacteristics**: up to five seat characteristics can be associated to the seat.

<serviceDetails\>  
<specialRequirementsInfo\>  
<ssrCode\>XBAG</ssrCode\>  
<actionCode\>F</actionCode\>  
<serviceType\>6X</serviceType\>  
<otherServiceType>BG</otherServiceType>  
</specialRequirementsInfo\>  
</serviceDetails\>

Range of segments to which the booking format applies is indicated here.

This group also contains the sub-group fsfkwDatagroup where specific FSF keywords are returned by RFISC. In case the value is a single value, attributeDescription element is used and in case it is a range value, fsfkwRanges is used. These values are used to build the booking format for a given service by completing the format conveyed inside ssrInformation.

      <fsfkwDataGroup>

        <fsfkwValues>

          <criteriaDetails>

            <attributeType>TYPE</attributeType>

            <attributeDescription>SKI</attributeDescription>

          </criteriaDetails>

        </fsfkwValues>

      </fsfkwDataGroup>

      <fsfkwDataGroup>

        <fsfkwValues>

          <criteriaDetails>

            <attributeType>WVAL</attributeType>

          </criteriaDetails>

        </fsfkwValues>

        <fsfkwRanges>

          <rangeDetails>

            <min>20</min>

            <max>45</max>

          </rangeDetails>

        </fsfkwRanges>

      </fsfkwDataGroup>

### serviceAttributes

Additional sets of attributes are associated to each service to convey commercial name and EMD characteristics.

-   **criteriaSetType**: code identifying the attribute category
-   **attributeType**: code identifying the attribute type
-   **attributeDescription**: content of the attribute

<serviceAttributes>  
<criteriaDetails\>  
<attributeType\>CNM</attributeType\>  
<attributeDescription\>Commercial name</attributeDescription\>  
</criteriaDetails\>  
</serviceAttributes>  
<serviceAttributes>  
<criteriaDetails\>  
<attributeType\>EMD</attributeType\>  
<attributeDescription\>2</attributeDescription\>  
</criteriaDetails\>  
<criteriaDetails\>  
<attributeType\>BKM</attributeType\>  
<attributeDescription\>01</attributeDescription\>  
</criteriaDetails\>  
<criteriaDetails\>  
<attributeType\>SFN</attributeType\>  
<attributeDescription\>1</attributeDescription\>  
</criteriaDetails\>  
<criteriaDetails\>  
<attributeType\>EMD</attributeType\>  
<attributeDescription\>Y</attributeDescription\>  
</criteriaDetails\>  
<criteriaDetails\>  
<attributeType\>ROR</attributeType\>  
<attributeDescription\>Y</attributeDescription\>  
</criteriaDetails\>  
<criteriaDetails\>  
<attributeType\>INT</attributeType\>  
<attributeDescription\>N</attributeDescription\>  
</criteriaDetails\>  
<criteriaDetails\>  
<attributeType\>ARA</attributeType\>  
<attributeDescription\>Y</attributeDescription\>  
</criteriaDetails\>  
<criteriaDetails\>  
<attributeType\>BRA</attributeType\>  
<attributeDescription\>Y</attributeDescription\>  
</criteriaDetails\>  
<criteriaDetails\>  
<attributeType\>ISS</attributeType\>  
<attributeDescription\>D</attributeDescription\>  
</criteriaDetails\>  
</serviceAttributes>

The list of the possible attributes as well as their possible values is as follows:

-   the commercial name of the service (CNM)

-   SSIM code (SSIM)
-   booking method (BKM)   
    -    01 for SSR
    -    02 for SVC
    -    03 if the service is available for display and/or pricing and that the carrier must be contacted for the applicable booking details
    -    04 if there is no booking required
    -    05 in case of bundled service.
-   picture number (PICTNB)
-   EMD type (EMD)   
    -   01 for a standalone EMD,
    -   02 for for an EMD associated to a flight coupon of a ticket,
    -   03 if the EMD is referenced to a ticket number but not associated to a flight coupon of a ticket,
    -   04 for a record other than EMD,
    -   05 for an electronic ticket
-   display category (DISPCAT)
-   service reference format number (SFN): references which of the booking formats detailed at the beginning of the response to apply for the particular service
-   specific subcode (SSC) - In the case of baggages, the service subcode in the <subcode> element is a generic one, 0AA, the SSC provides the specific subcode of the service.

EMD characteristics corresponding to the service can be:

**ARA for Availability request aggregation**

Possible values are:

-   Y if at least one of the service components of a recommendation needs a check of availability at pricing time
-   N if none of the service components needs a check of availability.

**BRA for Booking request aggregation**

Possible values are:

-   Y when booking is required for at least one service component in the recommendation
-   N when booking is not required for all the service components of the recommendation.

**COM for Commission aggregation**

Possible values are:

-   Y when at least one of the service components of the recommendation is commissionable
-   N when all the service components are not commissionable.

**EMD for EMD issuance aggregation**

Possible values are:

-   Y when an EMD has to be issued for at least one of the service components of a recommendation
-   N when none of the service components require an EMD issuance.

**FOR for Form of Refund aggregation**

Possible values are:

-   Y if all the service components of a recommendation are refundable and have the same form of refund (original form of payment or electronic voucher)
-   N if all the service components of a recommendation are refundable but don't have the same form of refund
-   Blank in any other case.

**INT for Interline aggregation**

Possible values are:

-   Y if all the service components of a recommendation are interlinable
-   N if at least one of the service components is not interlinable.

**ISS for Issuable recommendation**

**NIS for Not issuable recommendation**

**POP for Public/Private aggregation**

Possible values are:

-   P if the data in the S7 record of at least one of the service components of a recommendation is private
-   Blank otherwise.

**ROR for Reissue/Refund aggregation**

Possible values are:

-   N if at least one of the service components of a recommendation is not refundable
-   R if all the service components are refundable and at least one of them can have the EMD value reapplied towards a future purchase
-   Y if all the service components are refundable.

**SIA for Advance purchase Same issuance date aggregation**

Possible values are:

-   X if at least one of the service components of a recommendation must be purchased at the same time as the passenger's ticket is issued
-   Blank otherwise.

**SRN for Service Request Number** (corresponds to the service request number given in the query)

**SRV for Service Reference Identifier**

**MIF for manual input for formatted text**

If additional freetext is required to book the service, the codeset MIF is returned with the value Y, if not, value N is returned. For some services, an additionnal freetext is required but could be added by defaut by the system at booking time. In this case, the codeset MIF is returned with the value D.

**ITC for Interline check**

In case there is no interline agreement for the service, the value returned is N. Otherwise, ITC takes Y value.

###  dateGroup 

This group is used to carry date and time information in case of Time to Think service recommendation.

### mediaContentGroup

This group is used to carry media information, such as url address that links to the image of the service.

### serviceDescritpionInfo

This field contains the service commercial description, in a free text format.

<serviceDecriptionInfo>  
      <freeTextQualification>  
        <textSubjectQualifier\>COM</textSubjectQualifier\>  
      </freeTextQualification>  
      <freeText\>Service commercial description</freeText\>  
    </serviceDecriptionInfo>

### quotaGroup

Information about available service quota is stored in this group. There can be up to 16 repetitions of this group in case the service is associated to multiple flights. Quota is defined at flight level.

-   **availability**: number of available service units, values can be:
    -   0: if quota is reached
    -   1..9: if the service is submitted to quota and the Point of Sale is authorised

-   **quotaReachedReplyStatus**: status of the quotas, values can be:

-    
    -   M: if the available quota is a minimum value
    -   N: if the available quota is a nested value
    -   Q: if the service is submitted to quota and the Point of Sale is not authorised to display it
    -   V: if the service is not submitted to availability checks
    -   OK: if thes service is not submitted to quota
    -   PCN: booking results in a pending code
    -   N/A: if quota is not applicable to a service

<serviceQuota>  
<quotaInfo>  
<availability>9</availability>  
</quotaInfo>  
</serviceQuota>

For upgrade services information about the requested upgrade booking class are stored here.

-   **productDetailsQualifier**: UPG code stored here in case of upgrade services
-   **designator**: upgrade booking class designator
-   **availabilityStatus**: the availability of the upgrade booking class, value can be a number or the status of the class (L for waitlist, C for closed and so on)
-   **specialService**: code describing special service associated to the booking class, if available.
-   **option**: upgrade cabin designator.

<bookingClassUpgrade>  
<productDetailsQualifier>UPG</productDetailsQualifier>  
<bookingClassDetails>  
<designator>N</designator>  
<availabilityStatus\>C</availabilityStatus\>

<option>W</option>  
</bookingClassDetails>  
</bookingClassUpgrade>

The description of the upgrade cabin is passed in the **cabinClassFact** field.

Segment association is defined in the following fields:

-   **type**: code indicating the segment (value is S)
-   **value**: unique segment identifier.

<segmentReference>  
<referenceDetails\>  
<type>S</type>  
<value>1</value>  
</referenceDetails\>  
</segmentReference>

### svcLocation

In case of non flight-related service or merchandise, the geographical association is at city or airport level. The city or airport code is stored in this field.

-   **locationType**: code describing location function
-   **code**: location name code
-   **qualifier**, **agency** and **name**: additional data describing location.

<svcLocation>  
<locationDescription\>NCE</locationDescription\>  
</svcLocation>

### baggageDescriptionGroup

Baggage service can have a more complex description than other services. In case information on baggage policy, weight, occurrence, size are returned, they are stored in this group.

General baggage data is stored in _'baggageData'_ field, such as the policy concept (piece or weight) in case of free baggage allowance or prepaid/excess

-   **freeAllowance**: number of pieces or weight included in the free baggage allowance
-   **measurement**: number of priced units
-   **quantityCode**: code describing the baggage concept (piece, weight)
-   **unitQualifier**: measure unit identifier
-   **processIndicator**: additional information on the baggage policy

<baggageDetails\>  
<measurement>1</measurement>  
<quantityCode\>PC</quantityCode\>  
<unitQualifier\>P</unitQualifier\>  
</baggageDetails\>

<baggageDetails\>  
<measurement>30</measurement>  
<quantityCode\>W</quantityCode\>  
<unitQualifier\>K</unitQualifier\>  
</baggageDetails\>

If service price is defined for a range of weight, size or baggage occurrence, range limits are reported in _'rangeGroup'_ field:

-   **rangeQualifier**: indicator of the range type
-   **dataType**: unit of measure (no **dataType** for baggage occurrence)
-   **min**: minimum range value
-   **max**: maximum range value
-   **segmentReference**: reference of segments where the defined range applies  
    

Baggage occurrence allows the airlines to have differentiated prices for the same bag, depending on how many times a customer buys it (one price for the first bag, a different price for the second bag, etc...).

For baggage occurrence (**rangeQualifier= O**), if the maximum value is set to 99, it means that the airline didn't filed any maximum occurrence range.

<range>  
<rangeQualifier\>WGHT</rangeQualifier\>  
<rangeDetails\>  
<dataType\>K</dataType\>  
<min>0</min>  
<max>30</max>  
</rangeDetails\>  
</range>  
<range>  
<rangeQualifier>O</rangeQualifier>       --> qualifier for baggage occurrence  
<rangeDetails>  
<min>1</min>        --> minimum value of baggage occurrence  
<max>99</max>     --> maximum value of baggage occurrence  
</rangeDetails\>  
</range>  
<range>  
<rangeQualifier\>SI</rangeQualifier\>  
<rangeDetails\>  
<dataType\>LCM</dataType\>  
<min>0</min>  
<max>150</max>  
</rangeDetails\>  
</range>

Additional baggage attributes, if present, can be stored in baggageAttributes field.

### pricingGroup

Service prices are stored in this group. There are multiple repetitions  of 'pricingGroup' if the service has multiple prices, for example in case of multiple currencies.

Pricing carrier code is stored in _'codeshareCarrierInfo'_ field.

Total price information are stored in 'monetaryDetails' segment:

-   **typeQualifier**: monetary amount type qualifier
-   **amount**: monetary amount
-   **currency**: currency code
-   **location**: location identification

Information on the passenger to whom total price refers is stored in 'passengerReference' field:

-   **type**: code indicating type of information being provided (P for passenger)
-   **value**: numerical or alphanumerical value indicating unique reference 

'passengerReference' field can also contain indicator explaining if the service recommendation refers to first standard baggage item, or to second standard baggage item, calculated based on the standardization process. It can also contain an indicator to designate the standardized cabin baggage.

      <passengerReference>  
        <referenceDetails>  
          <type>P</type>  
          <value>1</value>  
        </referenceDetails>  
        <referenceDetails>  
          <type>BAG</type>  
          <value>STD1</value>  
        </referenceDetails>  
      </passengerReference>

      <passengerReference>  
        <referenceDetails>  
          <type>P</type>  
          <value>1</value>  
        </referenceDetails>  
        <referenceDetails>  
          <type>BAG</type>  
          <value>STD2</value>  
        </referenceDetails>  
      </passengerReference>

    <passengerReference>  
        <referenceDetails>  
          <type>P</type>  
          <value>1</value>  
        </referenceDetails>  
        <referenceDetails>  
          <type>BAG</type>  
          <value>CAB1</value>  
        </referenceDetails>  
      </passengerReference>

Information on the conversion rate are listed in 'additionalConversionDetails' field:

-   **conversionType**: code indicating the type of conversion that has been applied
-   **currency**: converted amount currency
-   **rateType**: code indicating the type of rate that has been applied to the conversion
-   **pricingAmount**: original amount, before conversion
-   **convertedValueAmount**: amount after conversion
-   **dutyTaxFeeType**: duty or tax fee type name code
-   **measurementValue**: duty or tax amount
-   **measurementSignificance**: additional description for duty or tax

Information on how the price has been filed in ATPCO is passed in the 'feeApplication' field:

-   **subType**: FEE Service fee specified
-   **status**: value 3 if the price applies per each checked portion and value 4 if the price applies per whole travel

In case tax details are returned or multiple coupons have been priced, coupon details are returned in this group. The message contains as many repetitions as the number of coupons for each service price. 

Unique coupon numeric identifier is stored in _'coupon'_ field:

-   **referenceType**: code identifying the reference type
-   **uniqueReference**: coupon identifier

_'monetaryInfo'_ field contains monetary information, _'fareAttribute'_ field contains fare attributes (for example: upgrade campaign fare), _'segmentCouponReference'_ contains flight association.

In case the margin manager is applied, additional data are returned under 'monetaryInfo':

-   MMT stands for **M**argin **M**anager **T**otal.
-   MMF stands for **M**argin **M**anager **F**ee.
-   MMM stands for **M**argin **M**anager **M**ark-up.

<monetaryInfo>  
<monetaryDetails>  
<typeQualifier>T</typeQualifier>  
<amount>66.66</amount>  
<currency>EUR</currency>  
</monetaryDetails>  
<otherMonetaryDetails>  
<typeQualifier>B</typeQualifier>  
<amount>47.62</amount>  
<currency>EUR</currency>  
</otherMonetaryDetails>  
<otherMonetaryDetails>  
<typeQualifier>MMT</typeQualifier>  
<amount>75.66</amount>  
<currency>EUR</currency>  
</otherMonetaryDetails>  
<otherMonetaryDetails>  
<typeQualifier>MMF</typeQualifier>  
<amount>5.00</amount>  
<currency>EUR</currency>  
</otherMonetaryDetails>  
<otherMonetaryDetails>  
<typeQualifier>MMM</typeQualifier>  
<amount>4.00</amount>  
<currency>EUR</currency>  
</otherMonetaryDetails>  
</monetaryInfo>

  

Detailed tax information is stored in '_taxInfo'_ group. Computed tax list information is conveyed in _'computedTaxListInfo'_ segment:

-   **taxCategory**: code describing the tax category returned
-   **rate**: tax rate
-   **countryCode**: code of the country applying the tax
-   **currencyCode**: tax currency
-   **type**: tax fee type

Tax discount and penalties, if applicable, are stored in '_discountPenaltyDetails'_ field:

-   **discountPenaltyQualifier**: code describing the discount or penalty category returned
-   **function**: monetary function
-   **amountType**: monetary amount type qualifier
-   **amount**: monetary amount
-   **rate**: rate or tariff class
-   **currency**: discount or penalty currency

Additional tax monetary details are stored in '_computedTaxSubDetails'_ segment.

<pricingGroup\>  
<codeshareCarrierInfo>  
<codeshareDetails\>  
<transportStageQualifier\>1</transportStageQualifier\>  
<airlineDesignator\>6X</airlineDesignator\>  
</codeshareDetails\>  
</codeshareCarrierInfo>  
<monetaryInfo\>  
<monetaryDetails>  
<typeQualifier\>T</typeQualifier\>  
<amount>66.66</amount>  
<currency>EUR</currency>  
</monetaryDetails>  
<otherMonetaryDetails\>  
<typeQualifier\>B</typeQualifier\>  
<amount>47.62</amount>  
<currency>EUR</currency>  
</otherMonetaryDetails\>  
</monetaryInfo\>  
<additionalConversionDetails>  
<conversionRateDetails\>  
<currency>EUR</currency>  
</conversionRateDetails\>  
</additionalConversionDetails>  
<couponInfoGroup\>  
<coupon>  
<referenceType\>1</referenceType\>  
</coupon>  
<monetaryInfo\>  
<monetaryDetails>  
<typeQualifier\>T</typeQualifier\>  
<amount>66.66</amount>  
<currency>EUR</currency>  
</monetaryDetails>  
<otherMonetaryDetails\>  
<typeQualifier\>B</typeQualifier\>  
<amount>47.62</amount>  
<currency>EUR</currency>  
</otherMonetaryDetails\>  
</monetaryInfo\>  
<segmentCouponReference>  
<referenceDetails\>  
<type>S</type>  
<value>1</value>  
</referenceDetails\>  
</segmentCouponReference>  
<taxInfo\>  
<computedTaxListInfo>  
<taxDetails\>  
<rate>19.04</rate>  
<countryCode\>IZ</countryCode\>  
<currencyCode\>EUR</currencyCode\>  
<type>EB</type>  
<type>VAT</type>  
</taxDetails\>  
</computedTaxListInfo>  
<computedDiscountAndPenaltyInfo>  
<discountPenaltyQualifier\>700</discountPenaltyQualifier\>  
<discountPenaltyDetails\>  
<amountType\>713</amountType\>  
<amount>50</amount>  
<currency>USD</currency>  
</discountPenaltyDetails\>  
</computedDiscountAndPenaltyInfo>  
</taxInfo\>  
</couponInfoGroup\>  
</pricingGroup\>

### errorGroup

an error of error or warning is retuned for one service or price only, error or warning code and information are stored in this group. Please refer to '_Error'_ section for details on the structure.

## 3.10.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<serviceGroup> <serviceId> <itemNumberDetails> <number>1</number> <type>SR</type> </itemNumberDetails> </serviceId> <passengerAndFlightAssociation> <rangeQualifier>S</rangeQualifier> <rangeDetails> <min>1</min> </rangeDetails> </passengerAndFlightAssociation> <passengerAndFlightAssociation> <rangeQualifier>P</rangeQualifier> <rangeDetails> <min>1</min> </rangeDetails> </passengerAndFlightAssociation> <serviceCodes> <specialCondition>C</specialCondition> <otherSpecialCondition>0AA</otherSpecialCondition> </serviceCodes> <serviceDetails> <specialRequirementsInfo> <ssrCode>XBAG</ssrCode> <actionCode>F</actionCode> <serviceType>6X</serviceType> <otherServiceType>BG</otherServiceType> </specialRequirementsInfo> </serviceDetails> <serviceAttributes> <criteriaDetails> <attributeType>CNM</attributeType> <attributeDescription>Commercial name</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>EMD</attributeType> <attributeDescription>2</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>BKM</attributeType> <attributeDescription>01</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>SFN</attributeType> <attributeDescription>1</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>EMD</attributeType> <attributeDescription>Y</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>ROR</attributeType> <attributeDescription>Y</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>INT</attributeType> <attributeDescription>N</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>ARA</attributeType> <attributeDescription>Y</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>BRA</attributeType> <attributeDescription>Y</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>ISS</attributeType> <attributeDescription>D</attributeDescription> </criteriaDetails> </serviceAttributes> <serviceDecriptionInfo> <freeTextQualification> <textSubjectQualifier>COM</textSubjectQualifier> </freeTextQualification> <freeText>Service commercial description</freeText> </serviceDecriptionInfo> <ageAggregation> <quantityDetails> <numberOfUnit>2</numberOfUnit> <unitQualifier>MIN</unitQualifier> </quantityDetails> <quantityDetails> <numberOfUnit>12</numberOfUnit> <unitQualifier>MAX</unitQualifier> </quantityDetails> </ageAggregation> <quotaGroup> <serviceQuota> <quotaInfo> <availability>9</availability> </quotaInfo> </serviceQuota> <bookingClassUpgrade> <productDetailsQualifier>UPG</productDetailsQualifier> <bookingClassDetails> <designator>N</designator> <availabilityStatus>C</availabilityStatus> </bookingClassDetails> </bookingClassUpgrade> <segmentReference> <referenceDetails> <type>S</type> <value>1</value> </referenceDetails> </segmentReference> </quotaGroup> <svcLocation> <locationType>C</locationType> <locationDescription> <code>NCE</code> </locationDescription> </svcLocation> <baggageDescriptionGroup> <baggageData> <baggageDetails> <measurement>1</measurement> <quantityCode>PC</quantityCode> <unitQualifier>P</unitQualifier> </baggageDetails> <otherBaggageDetails> <measurement>30</measurement> <quantityCode>W</quantityCode> <unitQualifier>K</unitQualifier> </otherBaggageDetails> <extraBaggageDetails> <measurement>1</measurement> <quantityCode>OCC</quantityCode> </extraBaggageDetails> </baggageData> <range> <rangeQualifier>W</rangeQualifier> <rangeDetails> <dataType>K</dataType> <min>0</min> <max>30</max> </rangeDetails> </range> <range> <rangeQualifier>OCC</rangeQualifier> <rangeDetails> <dataType>PC</dataType> <min>1</min> <max>3</max> </rangeDetails> </range> <range> <rangeQualifier>SI</rangeQualifier> <rangeDetails> <dataType>LCM</dataType> <min>0</min> <max>150</max> </rangeDetails> </range> </baggageDescriptionGroup> <pricingGroup> <codeshareCarrierInfo> <codeshareDetails> <transportStageQualifier>1</transportStageQualifier> <airlineDesignator>6X</airlineDesignator> </codeshareDetails> </codeshareCarrierInfo> <monetaryInfo> <monetaryDetails> <typeQualifier>T</typeQualifier> <amount>66.66</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>B</typeQualifier> <amount>47.62</amount> <currency>EUR</currency> </otherMonetaryDetails> </monetaryInfo> <additionalConversionDetails> <conversionRateDetails> <currency>EUR</currency> </conversionRateDetails> </additionalConversionDetails> <couponInfoGroup> <coupon> <referenceType>1</referenceType> </coupon> <monetaryInfo> <monetaryDetails> <typeQualifier>T</typeQualifier> <amount>66.66</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>B</typeQualifier> <amount>47.62</amount> <currency>EUR</currency> </otherMonetaryDetails> </monetaryInfo> <segmentCouponReference> <referenceDetails> <type>S</type> <value>1</value> </referenceDetails> </segmentCouponReference> <taxInfo> <computedTaxListInfo> <taxDetails> <rate>19.04</rate> <countryCode>IZ</countryCode> <currencyCode>EUR</currencyCode> <type>EB</type> <type>VAT</type> </taxDetails> </computedTaxListInfo> <computedDiscountAndPenaltyInfo> <discountPenaltyQualifier>700</discountPenaltyQualifier> <discountPenaltyDetails> <amountType>713</amountType> <amount>50</amount> <currency>USD</currency> </discountPenaltyDetails> </computedDiscountAndPenaltyInfo> </taxInfo> </couponInfoGroup> </pricingGroup> </serviceGroup>

* * *

## 3.11 Sub Structure: ssrInformation

## 3.11.1 Description

This element specifies the format of the services returned in the allFaresInfoGroup element.

-   **<serviceRequest>**:  Contains the SSR code and the airline for which a format was requested.

<serviceRequest\>  
         <specialRequirementsInfo\>  
               <ssrCode\>XBAG</ssrCode\>  
               <airlineCode\>6X</airlineCode\>  
         </specialRequirementsInfo\>  
</serviceRequest\>

-   **<errorFunctional>**:  Returns any functional error returned by the SSR table for a specific SSR.
-   **<ssrInformationDetails>**:  Contains further references for the SSR and the formatted free-text tree structure for the SSR.
    -   **<settingDetails>**: specifies if a free flow freetext is Mandatory, Optional or Forbidden. The field ‘indicator’ is filled with FFD and the ‘action’ can be filled with either MA, OP or FO.

<settingsDetails>  
       <statusInformation>  
             <indicator>FFD</indicator>  
            <action>FO</action>  
       </statusInformation>  
 </settingsDetails>

-    
    -   **<ssrFormattedFreetext>**: Specifies the structured booking format of the service.

The ssrFormattedFreeText is present to describe the general structure of the SSR with the keyword, and then repeated for each keyword.

### SSR general structure

The field ‘function’ is filled with the value 5 to describe the fact that the structure of the formatted free text is a tree structure.  
The field ‘componentId’ contains the value FMT for general description of the formatted free text.  
The field ‘status’ contains either the value M or the value O. It describe if the element is Mandatory or Optional.  
The field ‘position’ contains the level on which the keyword is. As the keywords are usually designed in a recursive manner (meaning that one keyword can be composed of several other keywords), the hierarchy of these keywords is indicated. For the FMT description, this is the root level 0, and for each next level, the value is increased by one. There can be several elements at the same level of the structure.  
The ‘description’ contains the structure of the element. The ‘identification’ is filled with FFT to describe the structure for the whole formatted freetext. The ‘mainDesc’ contains the detailed format of the element and the ‘otherDesc’ provides a description of the field.

<ssrFormattedFreetext>  
         <function>5</function>  
         <componentId>  
            <identifier>FMT</identifier>         <--- Formatted free text  
        </componentId>  
       <status>M</status>                        <--- Mandatory  
       <position>  
          <level>0</level>                          <--- Level 0 of the keywords  
      </position>  
      <description>  
          <identification>FFT</identification>  
          <mainDesc>TTLS%WGHT%%WUNI%%PIEC%PC%FTXT%</mainDesc>        <--- description of the freetext, the format of each keyword (WGHT, WUNI, and so on) is then described in a new ssrFormattedFreetext group  
      </description>  
</ssrFormattedFreetext>

  

### Keyword Structure

The field ‘function’ is filled with the value 5 to describe the fact that the structure of the formatted free text is a tree structure.  
The field ‘componentId’ contains the keyword which was present in the general description and which will be described in the group.. For the list of the possible keywords, refer to the specification for SSR Table.

For each keyword, a specific ssrFormattedFreeText group is used.  
The field ‘status’ contains either the value M or the value O. It describe whether the element is Mandatory or Optional.  
The field ‘position’ contains the level on which the keyword is. For the keyword description, the level is at least 1 and for each next level, the value is increased by one. There can be several element at the same level of the structure.  
The ‘description’ contains the structure of the element. The ‘identification’ is filled with KW (KeyWord). The ‘mainDesc’ contains the detailed format of the element (number of characters and type of characters) and the ‘otherDesc’ provides with a description of the field or the possible values that the field can take.

            <ssrFormattedFreetext>  
                <function>5</function>  
                <componentId>  
                    <identifier>FTXT</identifier>    <--- keyword described in the group  
                </componentId>  
                <status>O</status>                    <--- Optionnal  
                <position>  
                    <level>1</level>                    <--- Level 1 of the keyword   
                </position>  
                <description>  
                    <identification>KW</identification>       <--- KeyWord  
                    <mainDesc>\[SA-Z0-9\]{1,70}</mainDesc>     <--- 1 to 70 alphanumericals  
                    <otherDesc>Freetext</otherDesc>                     <--- meaning of the keyword  
                </description>  
            </ssrFormattedFreetext>

## 3.11.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<ssrInformation> <serviceRequest> <specialRequirementsInfo> <ssrCode>XBAG</ssrCode> <airlineCode>6X</airlineCode> </specialRequirementsInfo> </serviceRequest> <ssrInformationDetails> <settingsDetails> <statusInformation> <indicator>FFD</indicator> <action>FO</action> </statusInformation> </settingsDetails> <ssrFormattedFreetext> <function>5</function> <componentId> <identifier>FMT</identifier> </componentId> <status>M</status> <position> <level>0</level> </position> <description> <identification>FFT</identification> <mainDesc>TTLS\\%WGHT\\%\\%WUNI\\%\\%PIEC\\%PC\\%FTXT\\%</mainDesc> </description> </ssrFormattedFreetext> <ssrFormattedFreetext> <function>5</function> <componentId> <identifier>FTXT</identifier> </componentId> <status>O</status> <position> <level>1</level> </position> <description> <identification>KW</identification> <mainDesc>\[SA-Z0-9\]{1,50}</mainDesc> <otherDesc>Freetext</otherDesc> </description> </ssrFormattedFreetext> <ssrFormattedFreetext> <function>5</function> <componentId> <identifier>PIEC</identifier> </componentId> <status>M</status> <position> <level>1</level> </position> <description> <identification>KW</identification> <mainDesc>\[0-9\]{1,2}</mainDesc> <otherDesc>Number of pieces</otherDesc> </description> </ssrFormattedFreetext> <ssrFormattedFreetext> <function>5</function> <componentId> <identifier>WGHT</identifier> </componentId> <status>M</status> <position> <level>1</level> </position> <description> <identification>KW</identification> <mainDesc>\[0-9\]{1,4}</mainDesc> <otherDesc>Weight value</otherDesc> </description> </ssrFormattedFreetext> <ssrFormattedFreetext> <function>5</function> <componentId> <identifier>WUNI</identifier> </componentId> <status>M</status> <position> <level>1</level> </position> <description> <identification>KW</identification> <mainDesc>KGS:Weight unit</mainDesc> </description> </ssrFormattedFreetext> </ssrInformationDetails> </ssrInformation>

* * *

## 4 Error Messages

The error codes and free text messages that may be returned are listed in the Technical Reference.  The most commonly received errors are the following:

**Error code**

**Error message**

**Description**

04845

INVALID PASSENGER SELECTION

The input request contains services referring to invalid passenger internal references.

00005

CHECK SEGMENT NUMBER

The input request contains services referring to invalid segment internal references.

24963

ITINERARY PRICING REQUIRED BEFORE SERVICE PRICING

The itinerary associated to the selected services (implicitly or explicitly) must be priced before requesting the service pricing. Otherwise, the system rejects the request with this error.

24437

AIRPORT/CITY CODE NOT IN SYSTEM

The airport/city code specified in the point of sale override option is invalid.

07811

INVALID CARRIER CODE

The optional validating carrier is invalid according to the Amadeus Carriers table.

24176

UNMATCHED TICKET

In case the itinerary has already been issued, discrepancy between itinerary data stored in the e-Ticket and itinerary data

-   either stored in the PNR (integrated mode)
-   or itinerary data provided in the request message (standalone mode)

25687

UNABLE TO PROCESS SERVICE PRICING - NO ETKT FOUND

If the number provided in the request fails to retrieve the eTicket.

Other error messages are the following:

**Error Code**

**Error Message**

**Description**

ACCESS DENIED

Activation per office ID reject.

AIRPORT/CITY CODE NOT IN SYSTEM

The POS override option is used with an invalid city code.

06392

CHECK COMBINATION: INVALID REPETITIVE OPTION

Same option used more that one time.

CHECK FORMAT

No fare data is provided.

CHECK GROUP/SUB-GROUP/ATTRIBUTES

The group/sub-group filtering options are used with invalid group/sub-group code.

00005

CHECK SEGMENT NUMBER

Invalid segement reference passed in option value.

03504

COMBINATION NOT ALLOWED

Some non-combinable options used.

DUPLICATE PASSENGER SELECTION

Same passenger selected more than one time.

25755

FARE SERVER TEMPORARY DOWN/PLEASE RETRY IN 2MIN

Fare server temporary down.

07811

INVALID CARRIER CODE

Invalid carrier code is passed in option value.

INVALID DATE FORMAT

Pricing date override option is used with an invalid date value.

04845

INVALID PASSENGER SELECTION

Passenger selection option are used with an invalid passenger reference.

INVALID PASSENGER TYPE CODE

The PTC override options is used with an invalid PTC code.

24361

INVALID SEGMENT SELECTION

Segment selection option is used with an invalid segement reference.

24963

ITINERARY PRICING REQUIRED BEFORE SERVICE PRICING

No TKT/TST found in the PNR and the No Fare Information mode is not activated.

01966

NEED ITINERARY

No air flight in the PNR.

24614

NO DATA IN SERVICE TABLE FOR SERVICES

Filling missing in the Service Preference Table.

25762

NO INFANT TRAVELLING WITH PASSENGER IN INPUT

Pricing with /INF option and no infant present.

NO VALID PRICING SOLUTION FOUND

No fares match the requested criteria.

01383

PNR NOT PRESENT

Integrated request without PNR.

RJT CHRONOLOGICAL ORDER

Iinerary is not provided in the chronological order of departure GMT date and time.

31754

WARNING: MORE RESULTS EXIST. REFINE REQUEST WITH CATALOGUE OPTION

The catalogue response is too long.

A typical error response is shown below.

## 4.1 Error Reply

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Service\_IntegratedCatalogueReply xmlns="http://xml.amadeus.com/TPICGR\_17\_1\_1A"> <errorGroup> <errorOrWarningCodeDetails> <errorDetails> <errorCode>432</errorCode> <errorCategory>EC</errorCategory> <errorCodeOwner>PRY</errorCodeOwner> </errorDetails> </errorOrWarningCodeDetails> <errorWarningDescription> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <source>M</source> <encoding>1</encoding> </freeTextDetails> <freeText>INVALID CURRENCY CODE</freeText> </errorWarningDescription> </errorGroup> </Service\_IntegratedCatalogueReply>

  

* * *

## 5 Operations

## 5.1 Operation: Account Code

This operation assigns an account code to a passenger.

In the event of entering the account code option without any passenger association, the account code value will be applied for all passengers of the PNR.

## 5.1.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Service\_IntegratedCatalogue xmlns="http://xml.amadeus.com/TPICGQ\_17\_1\_1A"> <pricingOption> <pricingOptionKey> <pricingOptionKey>ACC</pricingOptionKey> </pricingOptionKey> <optionDetail> <criteriaDetails> <attributeType>AAA123456</attributeType> </criteriaDetails> </optionDetail> <paxSegTstReference> <referenceDetails> <type>P</type> <value>1</value> </referenceDetails> </paxSegTstReference> </pricingOption> </Service\_IntegratedCatalogue>

## 5.1.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.1.3 Possible Errors

See "Error Messages" section.

* * *

## 5.2 Operation: Award Pricing Option

This operation shows a catalogue request with the award pricing option.

pricingOptionKey = AWD (AWarD)

optionDetail: Specifies the award program to be targeted. (optional)

-   It can be one of the following values:
    -   MIL: Miles
    -   PTS: Points
    -   EVO: E-Voucher
-   In case the award program is not specified, default program is targeted (default program can changed from one pricing engine to another)

## 5.2.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Service\_IntegratedCatalogue xmlns="http://xml.amadeus.com/TPICGQ\_17\_1\_1A"> <pricingOption> <pricingOptionKey> <pricingOptionKey>AWD</pricingOptionKey> </pricingOptionKey> <optionDetail> <criteriaDetails> <attributeType>MIL</attributeType> </criteriaDetails> </optionDetail> </pricingOption> </Service\_IntegratedCatalogue>

## 5.2.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.2.3 Possible Errors

See "Error Messages" section.

* * *

## 5.3 Operation: Catalogue Request with no Option

This operation shows a catalogue request without no option (NOP).

## 5.3.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Service\_IntegratedCatalogue xmlns="http://xml.amadeus.com/TPICGQ\_17\_1\_1A"> <pricingOption> <pricingOptionKey> <pricingOptionKey>NOP</pricingOptionKey> </pricingOptionKey> </pricingOption> </Service\_IntegratedCatalogue>

## 5.3.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.3.3 Possible Errors

See "Error Messages" section.

* * *

## 5.4 Operation: Catalogue response for Baggage type C with occurrence

This operation returns all catalogue recommendations for baggage Service Type "C" with occurrence.

Baggage Travel Unit 1 is composed of 1 segment NCE - MAD (7X)

Baggage Travel Unit 2 is composed of 2 segment MAD - NCE - CDG (7X)

## 5.4.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.4.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Service\_IntegratedCatalogueReply xmlns="http://xml.amadeus.com/TPICGR\_17\_1\_1A"> <pricingIndicator> <priceTicketDetails> <indicators>IAT</indicators> </priceTicketDetails> </pricingIndicator> <pricingDate> <dateAndTimeDetails> <date>250620</date> <time>0855</time> </dateAndTimeDetails> </pricingDate> <passengerGroup> <paxReference> <passengerReference> <type>ADT</type> <value>1</value> </passengerReference> </paxReference> </passengerGroup> <flightInfo> <flightDetails> <flightDate> <departureDate>190720</departureDate> <departureTime>1200</departureTime> <arrivalDate>190720</arrivalDate> <arrivalTime>1700</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>NCE</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>MAD</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>7X</marketingCompany> <operatingCompany>7X</operatingCompany> </companyDetails> <flightIdentification> <flightNumber>1133</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> <flightTypeDetails> <flightIndicator>V</flightIndicator> </flightTypeDetails> <itemNumber>1</itemNumber> </flightDetails> <travelItineraryInfo> <cabinDesignator>Y</cabinDesignator> </travelItineraryInfo> <additionalFlightInfo> <legDetails> <equipment>744</equipment> </legDetails> </additionalFlightInfo> </flightInfo> <flightInfo> <flightDetails> <flightDate> <departureDate>250720</departureDate> <departureTime>2200</departureTime> <arrivalDate>250720</arrivalDate> <arrivalTime>2330</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>MAD</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>NCE</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>7X</marketingCompany> <operatingCompany>7X</operatingCompany> </companyDetails> <flightIdentification> <flightNumber>9103</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> <flightTypeDetails> <flightIndicator>V</flightIndicator> </flightTypeDetails> <itemNumber>2</itemNumber> </flightDetails> <travelItineraryInfo> <cabinDesignator>Y</cabinDesignator> </travelItineraryInfo> <additionalFlightInfo> <legDetails> <equipment>73H</equipment> </legDetails> </additionalFlightInfo> </flightInfo> <flightInfo> <flightDetails> <flightDate> <departureDate>260720</departureDate> <departureTime>0800</departureTime> <arrivalDate>260720</arrivalDate> <arrivalTime>0920</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>NCE</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>CDG</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>7X</marketingCompany> <operatingCompany>7X</operatingCompany> </companyDetails> <flightIdentification> <flightNumber>1781</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> <flightTypeDetails> <flightIndicator>V</flightIndicator> </flightTypeDetails> <itemNumber>3</itemNumber> </flightDetails> <travelItineraryInfo> <cabinDesignator>Y</cabinDesignator> </travelItineraryInfo> <additionalFlightInfo> <legDetails> <equipment>744</equipment> </legDetails> </additionalFlightInfo> </flightInfo> <portions> <travelPortions> <referenceDetails> <type>BTU</type> <value>1</value> </referenceDetails> </travelPortions> <flightAssociation> <rangeQualifier>S</rangeQualifier> <rangeDetails> <min>1</min> </rangeDetails> </flightAssociation> </portions> <portions> <travelPortions> <referenceDetails> <type>BTU</type> <value>2</value> </referenceDetails> </travelPortions> <flightAssociation> <rangeQualifier>S</rangeQualifier> <rangeDetails> <min>2</min> <max>3</max> </rangeDetails> </flightAssociation> </portions> <ssrInformation> <serviceRequest> <specialRequirementsInfo> <ssrCode>XBGG</ssrCode> <airlineCode>7X</airlineCode> </specialRequirementsInfo> </serviceRequest> <ssrInformationDetails> <settingsDetails> <statusInformation> <indicator>FFD</indicator> <action>OP</action> </statusInformation> </settingsDetails> <ssrFormattedFreetext> <function>5</function> <componentId> <identifier>FMT</identifier> </componentId> <status>O</status> <position> <level>0</level> </position> <description> <identification>FFT</identification> <mainDesc>TTL\\\\s?\\%WVAL\\%KG\\\\s?\\%PVAL\\%PC\\%FTXT\\%</mainDesc> </description> </ssrFormattedFreetext> <ssrFormattedFreetext> <function>5</function> <componentId> <identifier>WVAL</identifier> </componentId> <status>M</status> <position> <level>1</level> </position> <description> <identification>KW</identification> <mainDesc>\[0-9\]\\{1,3\\}</mainDesc> <otherDesc>Number of Kilograms</otherDesc> </description> </ssrFormattedFreetext> <ssrFormattedFreetext> <function>5</function> <componentId> <identifier>PVAL</identifier> </componentId> <status>O</status> <position> <level>1</level> </position> <description> <identification>KW</identification> <mainDesc>\[0-9\]\\{1,2\\}</mainDesc> <otherDesc>Number of Pieces</otherDesc> </description> </ssrFormattedFreetext> <ssrFormattedFreetext> <function>5</function> <componentId> <identifier>FTXT</identifier> </componentId> <status>O</status> <position> <level>1</level> </position> <description> <identification>KW</identification> <mainDesc>\[-\\\\s/0-9A-Z\]\\{1,70\\}</mainDesc> <otherDesc>Freetext</otherDesc> </description> </ssrFormattedFreetext> </ssrInformationDetails> </ssrInformation> <serviceGroup> <serviceId> <itemNumberDetails> <number>1</number> <type>ECB</type> </itemNumberDetails> </serviceId> <passengerAndFlightAssociation> <rangeQualifier>BTU</rangeQualifier> <rangeDetails> <min>1</min> </rangeDetails> </passengerAndFlightAssociation> <passengerAndFlightAssociation> <rangeQualifier>P</rangeQualifier> <rangeDetails> <min>1</min> </rangeDetails> </passengerAndFlightAssociation> <serviceCodes> <specialCondition>C</specialCondition> <otherSpecialCondition>0CY</otherSpecialCondition> </serviceCodes> <serviceAttributes> <criteriaDetails> <attributeType>CNM</attributeType> <attributeDescription> UPTO9KG BAGGAGE</attributeDescription> </criteriaDetails> </serviceAttributes> <serviceAttributes> <criteriaDetails> <attributeType>EMD</attributeType> <attributeDescription>4</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>BKM</attributeType> <attributeDescription>01</attributeDescription> </criteriaDetails> </serviceAttributes> <serviceAttributes> <criteriaDetails> <attributeType>ARA</attributeType> <attributeDescription>N</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>BRA</attributeType> <attributeDescription>Y</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>COM</attributeType> <attributeDescription>N</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>EMD</attributeType> <attributeDescription>Y</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>I</attributeType> </criteriaDetails> <criteriaDetails> <attributeType>INT</attributeType> <attributeDescription>Y</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>ISS</attributeType> </criteriaDetails> <criteriaDetails> <attributeType>ROR</attributeType> <attributeDescription>N</attributeDescription> </criteriaDetails> </serviceAttributes> <serviceDetailsGroup> <serviceDetails> <specialRequirementsInfo> <ssrCode>XBGG</ssrCode> <actionCode>C</actionCode> <numberInParty>1</numberInParty> <airlineCode>7X</airlineCode> <serviceType>BG</serviceType> <serviceFreeText>09</serviceFreeText> </specialRequirementsInfo> </serviceDetails> </serviceDetailsGroup> <ssrIndicatorList> <serviceAttributes> <attributeDetails> <attributeType>ACF</attributeType> <attributeDescription>Y</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>ACO</attributeType> <attributeDescription>M</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>AMA</attributeType> <attributeDescription>N</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>ARA</attributeType> <attributeDescription>K</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>ARO</attributeType> <attributeDescription>N</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>AUG</attributeType> <attributeDescription>N</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>AUS</attributeType> <attributeDescription>P</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>CHA</attributeType> <attributeDescription>Y</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>DAC</attributeType> <attributeDescription>NN</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>DEF</attributeType> <attributeDescription>N</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>DMC</attributeType> <attributeDescription>N</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>DPA</attributeType> <attributeDescription>N</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>DSA</attributeType> <attributeDescription>N</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>DSC</attributeType> <attributeDescription>EXCESS BAGGAGE REQUEST</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>EOI</attributeType> <attributeDescription>INP</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>FFD</attributeType> <attributeDescription>O</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>FTD</attributeType> <attributeDescription>O</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>MIP</attributeType> <attributeDescription>Y</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>NIP</attributeType> <attributeDescription>A</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>OAR</attributeType> <attributeDescription>N</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>PAS</attributeType> <attributeDescription>U</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>PRM</attributeType> <attributeDescription>B</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>RBR</attributeType> <attributeDescription>K</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>SAS</attributeType> <attributeDescription>M</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>SGT</attributeType> <attributeDescription>Y</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>SVC</attributeType> <attributeDescription>NORM</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>TDN</attributeType> <attributeDescription>Y</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>TIN</attributeType> <attributeDescription>Y</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>UNQ</attributeType> <attributeDescription>N</attributeDescription> </attributeDetails> </serviceAttributes> </ssrIndicatorList> <quotaGroup> <serviceQuota> <quotaInfo> <quotaReachedReplyStatus>OK</quotaReachedReplyStatus> </quotaInfo> </serviceQuota> <segmentReference> <referenceDetails> <type>S</type> <value>1</value> </referenceDetails> </segmentReference> </quotaGroup> <baggageDescriptionGroup> <baggageData> <baggageDetails> <measurement>1</measurement> <quantityCode>OCC</quantityCode> </baggageDetails> </baggageData> <range> <rangeQualifier>O</rangeQualifier> <rangeDetails> <min>1</min> <max>99</max> </rangeDetails> </range> <baggageAttributes> <criteriaDetails> <attributeType>TAX</attributeType> <attributeDescription>X</attributeDescription> </criteriaDetails> </baggageAttributes> </baggageDescriptionGroup> <pricingGroup> <codeshareCarrierInfo> <codeshareDetails> <airlineDesignator>7X</airlineDesignator> </codeshareDetails> </codeshareCarrierInfo> <computedTaxSubDetails> <monetaryDetails> <typeQualifier>T</typeQualifier> <amount>10.00</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>B</typeQualifier> <amount>10.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TX</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </otherMonetaryDetails> </computedTaxSubDetails> <passengerReference> <referenceDetails> <type>P</type> <value>1</value> </referenceDetails> <referenceDetails> <type>BAG</type> <value>PPR</value> </referenceDetails> </passengerReference> <feeApplication> <dataTypeInformation> <subType>FEE</subType> <status>3</status> </dataTypeInformation> </feeApplication> <couponInfoGroup> <coupon> <uniqueReference>1</uniqueReference> </coupon> <monetaryInfo> <monetaryDetails> <typeQualifier>ME</typeQualifier> <amount>10.00</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>MA</typeQualifier> <amount>10.00</amount> <currency>EUR</currency> </otherMonetaryDetails> </monetaryInfo> <segmentCouponReference> <referenceDetails> <type>S</type> <value>1</value> </referenceDetails> </segmentCouponReference> </couponInfoGroup> </pricingGroup> </serviceGroup> <serviceGroup> <serviceId> <itemNumberDetails> <number>2</number> <type>ECB</type> </itemNumberDetails> </serviceId> <passengerAndFlightAssociation> <rangeQualifier>BTU</rangeQualifier> <rangeDetails> <min>2</min> </rangeDetails> </passengerAndFlightAssociation> <passengerAndFlightAssociation> <rangeQualifier>P</rangeQualifier> <rangeDetails> <min>1</min> </rangeDetails> </passengerAndFlightAssociation> <serviceCodes> <specialCondition>C</specialCondition> <otherSpecialCondition>0CY</otherSpecialCondition> </serviceCodes> <serviceAttributes> <criteriaDetails> <attributeType>CNM</attributeType> <attributeDescription> UPTO9KG BAGGAGE</attributeDescription> </criteriaDetails> </serviceAttributes> <serviceAttributes> <criteriaDetails> <attributeType>EMD</attributeType> <attributeDescription>4</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>BKM</attributeType> <attributeDescription>01</attributeDescription> </criteriaDetails> </serviceAttributes> <serviceAttributes> <criteriaDetails> <attributeType>ARA</attributeType> <attributeDescription>N</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>BRA</attributeType> <attributeDescription>Y</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>COM</attributeType> <attributeDescription>N</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>EMD</attributeType> <attributeDescription>Y</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>I</attributeType> </criteriaDetails> <criteriaDetails> <attributeType>INT</attributeType> <attributeDescription>Y</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>ISS</attributeType> </criteriaDetails> <criteriaDetails> <attributeType>ROR</attributeType> <attributeDescription>N</attributeDescription> </criteriaDetails> </serviceAttributes> <serviceDetailsGroup> <serviceDetails> <specialRequirementsInfo> <ssrCode>XBGG</ssrCode> <actionCode>C</actionCode> <numberInParty>1</numberInParty> <airlineCode>7X</airlineCode> <serviceType>BG</serviceType> <serviceFreeText>09</serviceFreeText> </specialRequirementsInfo> </serviceDetails> </serviceDetailsGroup> <ssrIndicatorList> <serviceAttributes> <attributeDetails> <attributeType>ACF</attributeType> <attributeDescription>Y</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>ACO</attributeType> <attributeDescription>M</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>AMA</attributeType> <attributeDescription>N</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>ARA</attributeType> <attributeDescription>K</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>ARO</attributeType> <attributeDescription>N</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>AUG</attributeType> <attributeDescription>N</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>AUS</attributeType> <attributeDescription>P</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>CHA</attributeType> <attributeDescription>Y</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>DAC</attributeType> <attributeDescription>NN</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>DEF</attributeType> <attributeDescription>N</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>DMC</attributeType> <attributeDescription>N</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>DPA</attributeType> <attributeDescription>N</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>DSA</attributeType> <attributeDescription>N</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>DSC</attributeType> <attributeDescription>EXCESS BAGGAGE REQUEST</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>EOI</attributeType> <attributeDescription>INP</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>FFD</attributeType> <attributeDescription>O</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>FTD</attributeType> <attributeDescription>O</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>MIP</attributeType> <attributeDescription>Y</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>NIP</attributeType> <attributeDescription>A</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>OAR</attributeType> <attributeDescription>N</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>PAS</attributeType> <attributeDescription>U</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>PRM</attributeType> <attributeDescription>B</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>RBR</attributeType> <attributeDescription>K</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>SAS</attributeType> <attributeDescription>M</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>SGT</attributeType> <attributeDescription>Y</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>SVC</attributeType> <attributeDescription>NORM</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>TDN</attributeType> <attributeDescription>Y</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>TIN</attributeType> <attributeDescription>Y</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>UNQ</attributeType> <attributeDescription>N</attributeDescription> </attributeDetails> </serviceAttributes> </ssrIndicatorList> <quotaGroup> <serviceQuota> <quotaInfo> <quotaReachedReplyStatus>OK</quotaReachedReplyStatus> </quotaInfo> </serviceQuota> <segmentReference> <referenceDetails> <type>S</type> <value>2</value> </referenceDetails> </segmentReference> </quotaGroup> <quotaGroup> <serviceQuota> <quotaInfo> <quotaReachedReplyStatus>OK</quotaReachedReplyStatus> </quotaInfo> </serviceQuota> <segmentReference> <referenceDetails> <type>S</type> <value>3</value> </referenceDetails> </segmentReference> </quotaGroup> <baggageDescriptionGroup> <baggageData> <baggageDetails> <measurement>1</measurement> <quantityCode>OCC</quantityCode> </baggageDetails> </baggageData> <range> <rangeQualifier>O</rangeQualifier> <rangeDetails> <min>1</min> <max>1</max> </rangeDetails> </range> <baggageAttributes> <criteriaDetails> <attributeType>TAX</attributeType> <attributeDescription>X</attributeDescription> </criteriaDetails> </baggageAttributes> </baggageDescriptionGroup> <pricingGroup> <codeshareCarrierInfo> <codeshareDetails> <airlineDesignator>7X</airlineDesignator> </codeshareDetails> </codeshareCarrierInfo> <computedTaxSubDetails> <monetaryDetails> <typeQualifier>T</typeQualifier> <amount>14.00</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>B</typeQualifier> <amount>14.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TX</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </otherMonetaryDetails> </computedTaxSubDetails> <passengerReference> <referenceDetails> <type>P</type> <value>1</value> </referenceDetails> <referenceDetails> <type>BAG</type> <value>PPR</value> </referenceDetails> </passengerReference> <feeApplication> <dataTypeInformation> <subType>FEE</subType> <status>3</status> </dataTypeInformation> </feeApplication> <couponInfoGroup> <coupon> <uniqueReference>1</uniqueReference> </coupon> <monetaryInfo> <monetaryDetails> <typeQualifier>ME</typeQualifier> <amount>14.00</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>MA</typeQualifier> <amount>14.00</amount> <currency>EUR</currency> </otherMonetaryDetails> </monetaryInfo> <segmentCouponReference> <referenceDetails> <type>S</type> <value>2</value> </referenceDetails> <referenceDetails> <type>S</type> <value>3</value> </referenceDetails> </segmentCouponReference> </couponInfoGroup> </pricingGroup> </serviceGroup> <serviceGroup> <serviceId> <itemNumberDetails> <number>3</number> <type>ECB</type> </itemNumberDetails> </serviceId> <passengerAndFlightAssociation> <rangeQualifier>BTU</rangeQualifier> <rangeDetails> <min>2</min> </rangeDetails> </passengerAndFlightAssociation> <passengerAndFlightAssociation> <rangeQualifier>P</rangeQualifier> <rangeDetails> <min>1</min> </rangeDetails> </passengerAndFlightAssociation> <serviceCodes> <specialCondition>C</specialCondition> <otherSpecialCondition>0CY</otherSpecialCondition> </serviceCodes> <serviceAttributes> <criteriaDetails> <attributeType>CNM</attributeType> <attributeDescription> UPTO9KG BAGGAGE</attributeDescription> </criteriaDetails> </serviceAttributes> <serviceAttributes> <criteriaDetails> <attributeType>EMD</attributeType> <attributeDescription>4</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>BKM</attributeType> <attributeDescription>01</attributeDescription> </criteriaDetails> </serviceAttributes> <serviceAttributes> <criteriaDetails> <attributeType>ARA</attributeType> <attributeDescription>N</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>BRA</attributeType> <attributeDescription>Y</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>COM</attributeType> <attributeDescription>N</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>EMD</attributeType> <attributeDescription>Y</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>I</attributeType> </criteriaDetails> <criteriaDetails> <attributeType>INT</attributeType> <attributeDescription>Y</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>ISS</attributeType> </criteriaDetails> <criteriaDetails> <attributeType>ROR</attributeType> <attributeDescription>N</attributeDescription> </criteriaDetails> </serviceAttributes> <serviceDetailsGroup> <serviceDetails> <specialRequirementsInfo> <ssrCode>XBGG</ssrCode> <actionCode>C</actionCode> <numberInParty>1</numberInParty> <airlineCode>7X</airlineCode> <serviceType>BG</serviceType> <serviceFreeText>09</serviceFreeText> </specialRequirementsInfo> </serviceDetails> </serviceDetailsGroup> <ssrIndicatorList> <serviceAttributes> <attributeDetails> <attributeType>ACF</attributeType> <attributeDescription>Y</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>ACO</attributeType> <attributeDescription>M</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>AMA</attributeType> <attributeDescription>N</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>ARA</attributeType> <attributeDescription>K</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>ARO</attributeType> <attributeDescription>N</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>AUG</attributeType> <attributeDescription>N</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>AUS</attributeType> <attributeDescription>P</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>CHA</attributeType> <attributeDescription>Y</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>DAC</attributeType> <attributeDescription>NN</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>DEF</attributeType> <attributeDescription>N</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>DMC</attributeType> <attributeDescription>N</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>DPA</attributeType> <attributeDescription>N</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>DSA</attributeType> <attributeDescription>N</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>DSC</attributeType> <attributeDescription>EXCESS BAGGAGE REQUEST</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>EOI</attributeType> <attributeDescription>INP</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>FFD</attributeType> <attributeDescription>O</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>FTD</attributeType> <attributeDescription>O</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>MIP</attributeType> <attributeDescription>Y</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>NIP</attributeType> <attributeDescription>A</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>OAR</attributeType> <attributeDescription>N</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>PAS</attributeType> <attributeDescription>U</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>PRM</attributeType> <attributeDescription>B</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>RBR</attributeType> <attributeDescription>K</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>SAS</attributeType> <attributeDescription>M</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>SGT</attributeType> <attributeDescription>Y</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>SVC</attributeType> <attributeDescription>NORM</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>TDN</attributeType> <attributeDescription>Y</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>TIN</attributeType> <attributeDescription>Y</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>UNQ</attributeType> <attributeDescription>N</attributeDescription> </attributeDetails> </serviceAttributes> </ssrIndicatorList> <quotaGroup> <serviceQuota> <quotaInfo> <quotaReachedReplyStatus>OK</quotaReachedReplyStatus> </quotaInfo> </serviceQuota> <segmentReference> <referenceDetails> <type>S</type> <value>2</value> </referenceDetails> </segmentReference> </quotaGroup> <quotaGroup> <serviceQuota> <quotaInfo> <quotaReachedReplyStatus>OK</quotaReachedReplyStatus> </quotaInfo> </serviceQuota> <segmentReference> <referenceDetails> <type>S</type> <value>3</value> </referenceDetails> </segmentReference> </quotaGroup> <baggageDescriptionGroup> <baggageData> <baggageDetails> <measurement>1</measurement> <quantityCode>OCC</quantityCode> </baggageDetails> </baggageData> <range> <rangeQualifier>O</rangeQualifier> <rangeDetails> <min>2</min> <max>3</max> </rangeDetails> </range> <baggageAttributes> <criteriaDetails> <attributeType>TAX</attributeType> <attributeDescription>X</attributeDescription> </criteriaDetails> </baggageAttributes> </baggageDescriptionGroup> <pricingGroup> <codeshareCarrierInfo> <codeshareDetails> <airlineDesignator>7X</airlineDesignator> </codeshareDetails> </codeshareCarrierInfo> <computedTaxSubDetails> <monetaryDetails> <typeQualifier>T</typeQualifier> <amount>13.00</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>B</typeQualifier> <amount>13.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TX</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </otherMonetaryDetails> </computedTaxSubDetails> <passengerReference> <referenceDetails> <type>P</type> <value>1</value> </referenceDetails> <referenceDetails> <type>BAG</type> <value>PPR</value> </referenceDetails> </passengerReference> <feeApplication> <dataTypeInformation> <subType>FEE</subType> <status>3</status> </dataTypeInformation> </feeApplication> <couponInfoGroup> <coupon> <uniqueReference>1</uniqueReference> </coupon> <monetaryInfo> <monetaryDetails> <typeQualifier>ME</typeQualifier> <amount>13.00</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>MA</typeQualifier> <amount>13.00</amount> <currency>EUR</currency> </otherMonetaryDetails> </monetaryInfo> <segmentCouponReference> <referenceDetails> <type>S</type> <value>2</value> </referenceDetails> <referenceDetails> <type>S</type> <value>3</value> </referenceDetails> </segmentCouponReference> </couponInfoGroup> </pricingGroup> </serviceGroup> <serviceGroup> <serviceId> <itemNumberDetails> <number>4</number> <type>ECB</type> </itemNumberDetails> </serviceId> <passengerAndFlightAssociation> <rangeQualifier>BTU</rangeQualifier> <rangeDetails> <min>2</min> </rangeDetails> </passengerAndFlightAssociation> <passengerAndFlightAssociation> <rangeQualifier>P</rangeQualifier> <rangeDetails> <min>1</min> </rangeDetails> </passengerAndFlightAssociation> <serviceCodes> <specialCondition>C</specialCondition> <otherSpecialCondition>0CY</otherSpecialCondition> </serviceCodes> <serviceAttributes> <criteriaDetails> <attributeType>CNM</attributeType> <attributeDescription> UPTO9KG BAGGAGE</attributeDescription> </criteriaDetails> </serviceAttributes> <serviceAttributes> <criteriaDetails> <attributeType>EMD</attributeType> <attributeDescription>4</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>BKM</attributeType> <attributeDescription>01</attributeDescription> </criteriaDetails> </serviceAttributes> <serviceAttributes> <criteriaDetails> <attributeType>ARA</attributeType> <attributeDescription>N</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>BRA</attributeType> <attributeDescription>Y</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>COM</attributeType> <attributeDescription>N</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>EMD</attributeType> <attributeDescription>Y</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>I</attributeType> </criteriaDetails> <criteriaDetails> <attributeType>INT</attributeType> <attributeDescription>Y</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>ISS</attributeType> </criteriaDetails> <criteriaDetails> <attributeType>ROR</attributeType> <attributeDescription>N</attributeDescription> </criteriaDetails> </serviceAttributes> <serviceDetailsGroup> <serviceDetails> <specialRequirementsInfo> <ssrCode>XBGG</ssrCode> <actionCode>C</actionCode> <numberInParty>1</numberInParty> <airlineCode>7X</airlineCode> <serviceType>BG</serviceType> <serviceFreeText>09</serviceFreeText> </specialRequirementsInfo> </serviceDetails> </serviceDetailsGroup> <ssrIndicatorList> <serviceAttributes> <attributeDetails> <attributeType>ACF</attributeType> <attributeDescription>Y</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>ACO</attributeType> <attributeDescription>M</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>AMA</attributeType> <attributeDescription>N</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>ARA</attributeType> <attributeDescription>K</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>ARO</attributeType> <attributeDescription>N</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>AUG</attributeType> <attributeDescription>N</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>AUS</attributeType> <attributeDescription>P</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>CHA</attributeType> <attributeDescription>Y</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>DAC</attributeType> <attributeDescription>NN</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>DEF</attributeType> <attributeDescription>N</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>DMC</attributeType> <attributeDescription>N</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>DPA</attributeType> <attributeDescription>N</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>DSA</attributeType> <attributeDescription>N</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>DSC</attributeType> <attributeDescription>EXCESS BAGGAGE REQUEST</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>EOI</attributeType> <attributeDescription>INP</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>FFD</attributeType> <attributeDescription>O</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>FTD</attributeType> <attributeDescription>O</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>MIP</attributeType> <attributeDescription>Y</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>NIP</attributeType> <attributeDescription>A</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>OAR</attributeType> <attributeDescription>N</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>PAS</attributeType> <attributeDescription>U</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>PRM</attributeType> <attributeDescription>B</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>RBR</attributeType> <attributeDescription>K</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>SAS</attributeType> <attributeDescription>M</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>SGT</attributeType> <attributeDescription>Y</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>SVC</attributeType> <attributeDescription>NORM</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>TDN</attributeType> <attributeDescription>Y</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>TIN</attributeType> <attributeDescription>Y</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>UNQ</attributeType> <attributeDescription>N</attributeDescription> </attributeDetails> </serviceAttributes> </ssrIndicatorList> <quotaGroup> <serviceQuota> <quotaInfo> <quotaReachedReplyStatus>OK</quotaReachedReplyStatus> </quotaInfo> </serviceQuota> <segmentReference> <referenceDetails> <type>S</type> <value>2</value> </referenceDetails> </segmentReference> </quotaGroup> <quotaGroup> <serviceQuota> <quotaInfo> <quotaReachedReplyStatus>OK</quotaReachedReplyStatus> </quotaInfo> </serviceQuota> <segmentReference> <referenceDetails> <type>S</type> <value>3</value> </referenceDetails> </segmentReference> </quotaGroup> <baggageDescriptionGroup> <baggageData> <baggageDetails> <measurement>1</measurement> <quantityCode>OCC</quantityCode> </baggageDetails> </baggageData> <range> <rangeQualifier>O</rangeQualifier> <rangeDetails> <min>4</min> <max>4</max> </rangeDetails> </range> <baggageAttributes> <criteriaDetails> <attributeType>TAX</attributeType> <attributeDescription>X</attributeDescription> </criteriaDetails> </baggageAttributes> </baggageDescriptionGroup> <pricingGroup> <codeshareCarrierInfo> <codeshareDetails> <airlineDesignator>7X</airlineDesignator> </codeshareDetails> </codeshareCarrierInfo> <computedTaxSubDetails> <monetaryDetails> <typeQualifier>T</typeQualifier> <amount>14.00</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>B</typeQualifier> <amount>14.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TX</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </otherMonetaryDetails> </computedTaxSubDetails> <passengerReference> <referenceDetails> <type>P</type> <value>1</value> </referenceDetails> <referenceDetails> <type>BAG</type> <value>PPR</value> </referenceDetails> </passengerReference> <feeApplication> <dataTypeInformation> <subType>FEE</subType> <status>3</status> </dataTypeInformation> </feeApplication> <couponInfoGroup> <coupon> <uniqueReference>1</uniqueReference> </coupon> <monetaryInfo> <monetaryDetails> <typeQualifier>ME</typeQualifier> <amount>14.00</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>MA</typeQualifier> <amount>14.00</amount> <currency>EUR</currency> </otherMonetaryDetails> </monetaryInfo> <segmentCouponReference> <referenceDetails> <type>S</type> <value>2</value> </referenceDetails> <referenceDetails> <type>S</type> <value>3</value> </referenceDetails> </segmentCouponReference> </couponInfoGroup> </pricingGroup> </serviceGroup> <serviceGroup> <serviceId> <itemNumberDetails> <number>5</number> <type>ECB</type> </itemNumberDetails> </serviceId> <passengerAndFlightAssociation> <rangeQualifier>BTU</rangeQualifier> <rangeDetails> <min>2</min> </rangeDetails> </passengerAndFlightAssociation> <passengerAndFlightAssociation> <rangeQualifier>P</rangeQualifier> <rangeDetails> <min>1</min> </rangeDetails> </passengerAndFlightAssociation> <serviceCodes> <specialCondition>C</specialCondition> <otherSpecialCondition>0CY</otherSpecialCondition> </serviceCodes> <serviceAttributes> <criteriaDetails> <attributeType>CNM</attributeType> <attributeDescription> UPTO9KG BAGGAGE</attributeDescription> </criteriaDetails> </serviceAttributes> <serviceAttributes> <criteriaDetails> <attributeType>EMD</attributeType> <attributeDescription>4</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>BKM</attributeType> <attributeDescription>01</attributeDescription> </criteriaDetails> </serviceAttributes> <serviceAttributes> <criteriaDetails> <attributeType>ARA</attributeType> <attributeDescription>N</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>BRA</attributeType> <attributeDescription>Y</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>COM</attributeType> <attributeDescription>N</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>EMD</attributeType> <attributeDescription>Y</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>I</attributeType> </criteriaDetails> <criteriaDetails> <attributeType>INT</attributeType> <attributeDescription>Y</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>ISS</attributeType> </criteriaDetails> <criteriaDetails> <attributeType>ROR</attributeType> <attributeDescription>N</attributeDescription> </criteriaDetails> </serviceAttributes> <serviceDetailsGroup> <serviceDetails> <specialRequirementsInfo> <ssrCode>XBGG</ssrCode> <actionCode>C</actionCode> <numberInParty>1</numberInParty> <airlineCode>7X</airlineCode> <serviceType>BG</serviceType> <serviceFreeText>09</serviceFreeText> </specialRequirementsInfo> </serviceDetails> </serviceDetailsGroup> <ssrIndicatorList> <serviceAttributes> <attributeDetails> <attributeType>ACF</attributeType> <attributeDescription>Y</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>ACO</attributeType> <attributeDescription>M</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>AMA</attributeType> <attributeDescription>N</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>ARA</attributeType> <attributeDescription>K</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>ARO</attributeType> <attributeDescription>N</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>AUG</attributeType> <attributeDescription>N</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>AUS</attributeType> <attributeDescription>P</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>CHA</attributeType> <attributeDescription>Y</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>DAC</attributeType> <attributeDescription>NN</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>DEF</attributeType> <attributeDescription>N</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>DMC</attributeType> <attributeDescription>N</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>DPA</attributeType> <attributeDescription>N</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>DSA</attributeType> <attributeDescription>N</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>DSC</attributeType> <attributeDescription>EXCESS BAGGAGE REQUEST</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>EOI</attributeType> <attributeDescription>INP</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>FFD</attributeType> <attributeDescription>O</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>FTD</attributeType> <attributeDescription>O</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>MIP</attributeType> <attributeDescription>Y</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>NIP</attributeType> <attributeDescription>A</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>OAR</attributeType> <attributeDescription>N</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>PAS</attributeType> <attributeDescription>U</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>PRM</attributeType> <attributeDescription>B</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>RBR</attributeType> <attributeDescription>K</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>SAS</attributeType> <attributeDescription>M</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>SGT</attributeType> <attributeDescription>Y</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>SVC</attributeType> <attributeDescription>NORM</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>TDN</attributeType> <attributeDescription>Y</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>TIN</attributeType> <attributeDescription>Y</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>UNQ</attributeType> <attributeDescription>N</attributeDescription> </attributeDetails> </serviceAttributes> </ssrIndicatorList> <quotaGroup> <serviceQuota> <quotaInfo> <quotaReachedReplyStatus>OK</quotaReachedReplyStatus> </quotaInfo> </serviceQuota> <segmentReference> <referenceDetails> <type>S</type> <value>2</value> </referenceDetails> </segmentReference> </quotaGroup> <quotaGroup> <serviceQuota> <quotaInfo> <quotaReachedReplyStatus>OK</quotaReachedReplyStatus> </quotaInfo> </serviceQuota> <segmentReference> <referenceDetails> <type>S</type> <value>3</value> </referenceDetails> </segmentReference> </quotaGroup> <baggageDescriptionGroup> <baggageData> <baggageDetails> <measurement>1</measurement> <quantityCode>OCC</quantityCode> </baggageDetails> </baggageData> <range> <rangeQualifier>O</rangeQualifier> <rangeDetails> <min>5</min> <max>99</max> </rangeDetails> </range> <baggageAttributes> <criteriaDetails> <attributeType>TAX</attributeType> <attributeDescription>X</attributeDescription> </criteriaDetails> </baggageAttributes> </baggageDescriptionGroup> <pricingGroup> <codeshareCarrierInfo> <codeshareDetails> <airlineDesignator>7X</airlineDesignator> </codeshareDetails> </codeshareCarrierInfo> <computedTaxSubDetails> <monetaryDetails> <typeQualifier>T</typeQualifier> <amount>15.00</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>B</typeQualifier> <amount>15.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TX</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </otherMonetaryDetails> </computedTaxSubDetails> <passengerReference> <referenceDetails> <type>P</type> <value>1</value> </referenceDetails> <referenceDetails> <type>BAG</type> <value>PPR</value> </referenceDetails> </passengerReference> <feeApplication> <dataTypeInformation> <subType>FEE</subType> <status>3</status> </dataTypeInformation> </feeApplication> <couponInfoGroup> <coupon> <uniqueReference>1</uniqueReference> </coupon> <monetaryInfo> <monetaryDetails> <typeQualifier>ME</typeQualifier> <amount>15.00</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>MA</typeQualifier> <amount>15.00</amount> <currency>EUR</currency> </otherMonetaryDetails> </monetaryInfo> <segmentCouponReference> <referenceDetails> <type>S</type> <value>2</value> </referenceDetails> <referenceDetails> <type>S</type> <value>3</value> </referenceDetails> </segmentCouponReference> </couponInfoGroup> </pricingGroup> </serviceGroup> </Service\_IntegratedCatalogueReply>

## 5.4.3 Possible Errors

See "Error Messages" section.

* * *

## 5.5 Operation: Currency of Sale Override

This operation overrides the currency of sale.

## 5.5.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Service\_IntegratedCatalogue xmlns="http://xml.amadeus.com/TPICGQ\_17\_1\_1A"> <pricingOption> <pricingOptionKey> <pricingOptionKey>FCO</pricingOptionKey> </pricingOptionKey> <currency> <firstCurrencyDetails> <currencyQualifier>FCO</currencyQualifier> <currencyIsoCode>USD</currencyIsoCode> </firstCurrencyDetails> </currency> </pricingOption> </Service\_IntegratedCatalogue>

## 5.5.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.5.3 Possible Errors

See "Error Messages" section.

* * *

## 5.6 Operation: Include Only Baggage information

This operation includes Only Baggage Information (BGI).

## 5.6.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Service\_IntegratedCatalogue xmlns="http://xml.amadeus.com/TPICGQ\_17\_1\_1A"> <pricingOption> <pricingOptionKey> <pricingOptionKey>INC</pricingOptionKey> </pricingOptionKey> <optionDetail> <criteriaDetails> <attributeType>BGI</attributeType> </criteriaDetails> </optionDetail> </pricingOption> </Service\_IntegratedCatalogue>

## 5.6.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.6.3 Possible Errors

See "Error Messages" section.

* * *

## 5.7 Operation: Point of Sale Override

This operation overrides the Point of Sale (POS) to set it to Nice.

## 5.7.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Service\_IntegratedCatalogue xmlns="http://xml.amadeus.com/TPICGQ\_17\_1\_1A"> <pricingOption> <pricingOptionKey> <pricingOptionKey>POS</pricingOptionKey> </pricingOptionKey> <locationInformation> <locationType>POS</locationType> <firstLocationDetails> <code>NCE</code> </firstLocationDetails> </locationInformation> </pricingOption> </Service\_IntegratedCatalogue>

## 5.7.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.7.3 Possible Errors

See "Error Messages" section.

* * *

## 5.8 Operation: Pricing Date Override

This operation overrides the pricing date (DAT).

## 5.8.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Service\_IntegratedCatalogue xmlns="http://xml.amadeus.com/TPICGQ\_17\_1\_1A"> <pricingOption> <pricingOptionKey> <pricingOptionKey>DAT</pricingOptionKey> </pricingOptionKey> <dateInformation> <businessSemantic>DAT</businessSemantic> <dateTime> <year>2011</year> <month>3</month> <day>27</day> </dateTime> </dateInformation> </pricingOption> </Service\_IntegratedCatalogue>

## 5.8.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.8.3 Possible Errors

See "Error Messages" section.

* * *

## 5.9 Operation: Promo Code MPC

This option enables the usage of promotional codes.  
  
The codes are stored on AAM (Amadeus Anytime Merchandizing) side and enable the application of discounts at pricing time.

For the output, once the promocode is applied, the following information is returned:

-   DID: Discount Identifier
-   RID: Reason discount Identifier (optional)
-   DSO: Discount owner
-   DST: Discount type (P = promocode)
-   PCM: Promocode name
-   TNB: Total with no biasing
-   MNB: Equivalent matched amount with no biasing

## 5.9.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOption> <pricingOptionKey> <pricingOptionKey>MPC</pricingOptionKey> </pricingOptionKey> <optionDetail> <criteriaDetails> <attributeType>LPC</attributeType> <attributeDescription>123456</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CXR</attributeType> <attributeDescription>6X</attributeDescription> </criteriaDetails> </optionDetail> </pricingOption>

## 5.9.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Service\_IntegratedCatalogueReply> <pricingIndicator> <priceTicketDetails> <indicators>CTA</indicators> </priceTicketDetails> </pricingIndicator> <pricingDate> <dateAndTimeDetails> <date>150921</date> <time>1105</time> </dateAndTimeDetails> </pricingDate> <passengerGroup> <paxReference> <passengerReference> <type>ADT</type> <value>1</value> </passengerReference> </paxReference> </passengerGroup> <flightInfo> <flightDetails> <flightDate> <departureDate>301121</departureDate> <departureTime>1935</departureTime> <arrivalDate>301121</arrivalDate> <arrivalTime>2322</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>WAW</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>KRK</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>LO</marketingCompany> <operatingCompany>LO</operatingCompany> </companyDetails> <flightIdentification> <flightNumber>3905</flightNumber> <bookingClass>L</bookingClass> </flightIdentification> <flightTypeDetails> <flightIndicator>V</flightIndicator> </flightTypeDetails> <itemNumber>1</itemNumber> </flightDetails> <travelItineraryInfo> <cabinDesignator>Y</cabinDesignator> </travelItineraryInfo> <additionalFlightInfo> <legDetails> <equipment>CR9</equipment> </legDetails> </additionalFlightInfo> </flightInfo> <portions> <travelPortions> <referenceDetails> <type>BTU</type> <value>1</value> </referenceDetails> </travelPortions> <flightAssociation> <rangeQualifier>S</rangeQualifier> <rangeDetails> <min>1</min> </rangeDetails> </flightAssociation> </portions> <serviceGroup> <serviceId> <itemNumberDetails> <number>1</number> <type>ITI</type> </itemNumberDetails> </serviceId> <passengerAndFlightAssociation> <rangeQualifier>S</rangeQualifier> <rangeDetails> <min>1</min> </rangeDetails> </passengerAndFlightAssociation> <passengerAndFlightAssociation> <rangeQualifier>P</rangeQualifier> <rangeDetails> <min>1</min> </rangeDetails> </passengerAndFlightAssociation> <serviceCodes> <specialCondition>A</specialCondition> <otherSpecialCondition>0B5</otherSpecialCondition> </serviceCodes> <serviceAttributes> <criteriaDetails> <attributeType>CNM</attributeType> <attributeDescription>PREFERRED AISLE</attributeDescription> </criteriaDetails> </serviceAttributes> <serviceAttributes> <criteriaDetails> <attributeType>EMD</attributeType> <attributeDescription>2</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>BKM</attributeType> <attributeDescription>01</attributeDescription> </criteriaDetails> </serviceAttributes> <serviceAttributes> <criteriaDetails> <attributeType>ARA</attributeType> <attributeDescription>N</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>BRA</attributeType> <attributeDescription>Y</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>COM</attributeType> <attributeDescription>N</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>D</attributeType> </criteriaDetails> <criteriaDetails> <attributeType>DID</attributeType> <attributeDescription>LO-1498294</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>DSO</attributeType> <attributeDescription>LO</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>DST</attributeType> <attributeDescription>P</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>EMD</attributeType> <attributeDescription>Y</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>INT</attributeType> <attributeDescription>N</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>ISC</attributeType> <attributeDescription></attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>ISS</attributeType> </criteriaDetails> <criteriaDetails> <attributeType>PCM</attributeType> <attributeDescription>PROMOCODE</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>POP</attributeType> <attributeDescription>P</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>ROR</attributeType> <attributeDescription>R</attributeDescription> </criteriaDetails> </serviceAttributes> <serviceDetailsGroup> <serviceDetails> <specialRequirementsInfo> <ssrCode>RQST</ssrCode> <actionCode>F</actionCode> <numberInParty>1</numberInParty> <airlineCode>LO</airlineCode> <serviceType>SA</serviceType> </specialRequirementsInfo> <seatDetails> <seatCharacteristics>A</seatCharacteristics> <seatCharacteristics>CH</seatCharacteristics> <seatCharacteristics>O</seatCharacteristics> </seatDetails> </serviceDetails> </serviceDetailsGroup> <pricingGroup> <codeshareCarrierInfo> <codeshareDetails> <airlineDesignator>LO</airlineDesignator> </codeshareDetails> </codeshareCarrierInfo> <computedTaxSubDetails> <monetaryDetails> <typeQualifier>T</typeQualifier> <amount>90</amount> <currency>PLN</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>B</typeQualifier> <amount>83</amount> <currency>PLN</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TX</typeQualifier> <amount>7</amount> <currency>PLN</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TNB</typeQualifier> <amount>100</amount> <currency>PLN</currency> </otherMonetaryDetails> </computedTaxSubDetails> <computedSubTaxListInfo> <taxDetails> <rate>8.00</rate> <countryCode>PL</countryCode> <currencyCode>PLN</currencyCode> <type>XX</type> </taxDetails> </computedSubTaxListInfo> <passengerReference> <referenceDetails> <type>P</type> <value>1</value> </referenceDetails> </passengerReference> <feeApplication> <dataTypeInformation> <subType>FEE</subType> <status>4</status> </dataTypeInformation> </feeApplication> <couponInfoGroup> <coupon> <uniqueReference>1</uniqueReference> </coupon> <monetaryInfo> <monetaryDetails> <typeQualifier>ME</typeQualifier> <amount>90</amount> <currency>PLN</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>MNB</typeQualifier> <amount>100</amount> <currency>PLN</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>MA</typeQualifier> <amount>83</amount> <currency>PLN</currency> </otherMonetaryDetails> </monetaryInfo> <fareAttribute> <criteriaDetails> <attributeType>DID</attributeType> <attributeDescription>LO-1498294</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>PCM</attributeType> <attributeDescription>PROMOCODE</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>DSO</attributeType> <attributeDescription>LO</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>DST</attributeType> <attributeDescription>P</attributeDescription> </criteriaDetails> </fareAttribute> <segmentCouponReference> <referenceDetails> <type>S</type> <value>1</value> </referenceDetails> </segmentCouponReference> </couponInfoGroup> </pricingGroup> </serviceGroup> </Service\_IntegratedCatalogueReply>

## 5.9.3 Possible Errors

See "Error Messages" section.

* * *

## 5.10 Operation: PTC Override

This operation overrides the passenger type code (PTC) to Student.

## 5.10.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Service\_IntegratedCatalogue xmlns="http://xml.amadeus.com/TPICGQ\_17\_1\_1A"> <pricingOption> <pricingOptionKey> <pricingOptionKey>PAX</pricingOptionKey> </pricingOptionKey> <optionDetail> <criteriaDetails> <attributeType>STU</attributeType> </criteriaDetails> </optionDetail> </pricingOption> </Service\_IntegratedCatalogue>

## 5.10.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.10.3 Possible Errors

See "Error Messages" section.

* * *

## 5.11 Operation: Show Commercial Description

This operation returns the commercial description of the service.

## 5.11.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Service\_IntegratedCatalogue xmlns="http://xml.amadeus.com/TPICGQ\_17\_1\_1A"> <pricingOption> <pricingOptionKey> <pricingOptionKey>SCD</pricingOptionKey> </pricingOptionKey> </pricingOption> </Service\_IntegratedCatalogue>

## 5.11.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.11.3 Possible Errors

See "Error Messages" section.

* * *

## 5.12 Operation: Upgrade Catalogue in Miles for a Selection of Segments

This operation upgrades the catalogue in miles for a selection of segments.

## 5.12.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Service\_IntegratedCatalogue xmlns="http://xml.amadeus.com/TPICGQ\_17\_1\_1A"> <pricingOption> <pricingOptionKey> <pricingOptionKey>AWD</pricingOptionKey> </pricingOptionKey> <optionDetail> <criteriaDetails> <attributeType>MIL</attributeType> </criteriaDetails> </optionDetail> </pricingOption> <pricingOption> <pricingOptionKey> <pricingOptionKey>GRP</pricingOptionKey> </pricingOptionKey> <optionDetail> <criteriaDetails> <attributeType>UP</attributeType> </criteriaDetails> </optionDetail> </pricingOption> <pricingOption> <pricingOptionKey> <pricingOptionKey>SEL</pricingOptionKey> </pricingOptionKey> <paxSegTstReference> <referenceDetails> <type>S</type> <value>1</value> </referenceDetails> <referenceDetails> <type>S</type> <value>2</value> </referenceDetails> <referenceDetails> <type>S</type> <value>3</value> </referenceDetails> <referenceDetails> <type>S</type> <value>4</value> </referenceDetails> </paxSegTstReference> </pricingOption> </Service\_IntegratedCatalogue>

## 5.12.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Service\_IntegratedCatalogueReply xmlns="http://xml.amadeus.com/TPICGR\_17\_1\_1A"> <passengerGroup> <paxReference> <passengerReference> <type>ADT</type> <value>1</value> </passengerReference> </paxReference> <frequentTravellerGroup> <frequentTravellerInfo> <frequentTravellerDetails> <carrier>6X</carrier> <number>123456789</number> <tierLevel>GOLD</tierLevel> <priorityCode>1</priorityCode> </frequentTravellerDetails> </frequentTravellerInfo> <balance> <monetaryDetails> <typeQualifier>BAL</typeQualifier> <amount>20000</amount> <currency>MIL</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>BAL</typeQualifier> <amount>10000</amount> <currency>EVO</currency> </otherMonetaryDetails> </balance> </frequentTravellerGroup> </passengerGroup> <flightInfo> <flightDetails> <flightDate> <departureDate>101014</departureDate> <departureTime>1010</departureTime> <arrivalDate>121214</arrivalDate> <arrivalTime>1212</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>CDG</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>FRA</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>7X</marketingCompany> <operatingCompany>7X</operatingCompany> </companyDetails> <flightIdentification> <flightNumber>0111</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> <flightTypeDetails> <flightIndicator>V</flightIndicator> </flightTypeDetails> <itemNumber>1</itemNumber> </flightDetails> <travelItineraryInfo> <cabinDesignator>A</cabinDesignator> </travelItineraryInfo> <additionalFlightInfo> <legDetails> <equipment>777</equipment> </legDetails> </additionalFlightInfo> </flightInfo> <flightInfo> <flightDetails> <flightDate> <departureDate>101014</departureDate> <departureTime>1010</departureTime> <arrivalDate>121214</arrivalDate> <arrivalTime>1212</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>CDG</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>FRA</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> <operatingCompany>6X</operatingCompany> </companyDetails> <flightIdentification> <flightNumber>0222</flightNumber> <bookingClass>Q</bookingClass> </flightIdentification> <flightTypeDetails> <flightIndicator>V</flightIndicator> </flightTypeDetails> <itemNumber>2</itemNumber> </flightDetails> <travelItineraryInfo> <cabinDesignator>A</cabinDesignator> </travelItineraryInfo> <additionalFlightInfo> <legDetails> <equipment>777</equipment> </legDetails> </additionalFlightInfo> </flightInfo> <flightInfo> <flightDetails> <flightDate> <departureDate>101014</departureDate> <departureTime>1010</departureTime> <arrivalDate>121214</arrivalDate> <arrivalTime>1212</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>CDG</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>FRA</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> <operatingCompany>6X</operatingCompany> </companyDetails> <flightIdentification> <flightNumber>0333</flightNumber> <bookingClass>C</bookingClass> </flightIdentification> <flightTypeDetails> <flightIndicator>V</flightIndicator> </flightTypeDetails> <itemNumber>3</itemNumber> </flightDetails> <travelItineraryInfo> <cabinDesignator>A</cabinDesignator> </travelItineraryInfo> <additionalFlightInfo> <legDetails> <equipment>777</equipment> </legDetails> </additionalFlightInfo> </flightInfo> <flightInfo> <flightDetails> <flightDate> <departureDate>101014</departureDate> <departureTime>1010</departureTime> <arrivalDate>121214</arrivalDate> <arrivalTime>1212</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>CDG</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>FRA</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> <operatingCompany>6X</operatingCompany> </companyDetails> <flightIdentification> <flightNumber>0444</flightNumber> <bookingClass>C</bookingClass> </flightIdentification> <flightTypeDetails> <flightIndicator>V</flightIndicator> </flightTypeDetails> <itemNumber>4</itemNumber> </flightDetails> <travelItineraryInfo> <cabinDesignator>A</cabinDesignator> </travelItineraryInfo> <additionalFlightInfo> <legDetails> <equipment>777</equipment> </legDetails> </additionalFlightInfo> </flightInfo> <serviceGroup> <serviceId> <itemNumberDetails> <number>1</number> <type>UP</type> </itemNumberDetails> </serviceId> <passengerAndFlightAssociation> <rangeQualifier>S</rangeQualifier> <rangeDetails> <min>1</min> </rangeDetails> </passengerAndFlightAssociation> <passengerAndFlightAssociation> <rangeQualifier>P</rangeQualifier> <rangeDetails> <min>1</min> </rangeDetails> </passengerAndFlightAssociation> <serviceCodes> <specialCondition>A</specialCondition> </serviceCodes> <serviceDetailsGroup> <serviceDetails> <specialRequirementsInfo> <ssrCode>FQTU</ssrCode> <actionCode>F</actionCode> <serviceType>7X</serviceType> <otherServiceType>UP</otherServiceType> </specialRequirementsInfo> </serviceDetails> <fsfkwDataGroup> <fsfkwValues> <criteriaDetails> <attributeType>CNM</attributeType> <attributeDescription>COMMERCIAL NAME FROM THE SPT</attributeDescription> </criteriaDetails> </fsfkwValues> </fsfkwDataGroup> <fsfkwDataGroup> <fsfkwValues> <criteriaDetails> <attributeType>EMD</attributeType> <attributeDescription>Y</attributeDescription> </criteriaDetails> </fsfkwValues> </fsfkwDataGroup> </serviceDetailsGroup> <quotaGroup> <serviceQuota> <quotaInfo> <availability>5</availability> </quotaInfo> </serviceQuota> <bookingClassUpgrade> <productDetailsQualifier>UPG</productDetailsQualifier> <bookingClassDetails> <designator>I</designator> </bookingClassDetails> </bookingClassUpgrade> </quotaGroup> <pricingGroup> <codeshareCarrierInfo> <codeshareDetails> <airlineDesignator>7X</airlineDesignator> </codeshareDetails> </codeshareCarrierInfo> <computedTaxSubDetails> <monetaryDetails> <typeQualifier>FFA</typeQualifier> <amount>20</amount> <currency>MIL</currency> </monetaryDetails> </computedTaxSubDetails> </pricingGroup> <pricingGroup> <codeshareCarrierInfo> <codeshareDetails> <airlineDesignator>7X</airlineDesignator> </codeshareDetails> </codeshareCarrierInfo> <computedTaxSubDetails> <monetaryDetails> <typeQualifier>FFA</typeQualifier> <amount>4</amount> <currency>EVO</currency> </monetaryDetails> </computedTaxSubDetails> </pricingGroup> </serviceGroup> <serviceGroup> <serviceId> <itemNumberDetails> <number>2</number> <type>UP</type> </itemNumberDetails> </serviceId> <passengerAndFlightAssociation> <rangeQualifier>S</rangeQualifier> <rangeDetails> <min>2</min> </rangeDetails> </passengerAndFlightAssociation> <passengerAndFlightAssociation> <rangeQualifier>P</rangeQualifier> <rangeDetails> <min>1</min> </rangeDetails> </passengerAndFlightAssociation> <serviceCodes> <specialCondition>A</specialCondition> <otherSpecialCondition>0BJ</otherSpecialCondition> </serviceCodes> <errorGroup> <errorOrWarningCodeDetails> <errorDetails> <errorCode>12345</errorCode> <errorCategory>EC</errorCategory> <errorCodeOwner>PRY</errorCodeOwner> </errorDetails> </errorOrWarningCodeDetails> <errorWarningDescription> <freeTextDetails> <textSubjectQualifier>1</textSubjectQualifier> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>RBD NOT ELIGIBLE FOR UPGRADE</freeText> </errorWarningDescription> </errorGroup> </serviceGroup> <serviceGroup> <serviceId> <itemNumberDetails> <number>3</number> <type>UP</type> </itemNumberDetails> </serviceId> <passengerAndFlightAssociation> <rangeQualifier>S</rangeQualifier> <rangeDetails> <min>3</min> </rangeDetails> </passengerAndFlightAssociation> <passengerAndFlightAssociation> <rangeQualifier>P</rangeQualifier> <rangeDetails> <min>1</min> </rangeDetails> </passengerAndFlightAssociation> <serviceCodes> <specialCondition>A</specialCondition> <otherSpecialCondition>0BJ</otherSpecialCondition> </serviceCodes> <quotaGroup> <serviceQuota> <quotaInfo> <quotaReachedReplyStatus>C</quotaReachedReplyStatus> </quotaInfo> </serviceQuota> <bookingClassUpgrade> <productDetailsQualifier>UPG</productDetailsQualifier> <bookingClassDetails> <designator>N</designator> <availabilityStatus>C</availabilityStatus> </bookingClassDetails> </bookingClassUpgrade> </quotaGroup> <errorGroup> <errorOrWarningCodeDetails> <errorDetails> <errorCode>12346</errorCode> <errorCategory>EC</errorCategory> <errorCodeOwner>PRY</errorCodeOwner> </errorDetails> </errorOrWarningCodeDetails> <errorWarningDescription> <freeTextDetails> <textSubjectQualifier>4</textSubjectQualifier> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>NO AVAILABILITY FOR THE UPGRADE</freeText> </errorWarningDescription> </errorGroup> </serviceGroup> <serviceGroup> <serviceId> <itemNumberDetails> <number>4</number> <type>UP</type> </itemNumberDetails> </serviceId> <passengerAndFlightAssociation> <rangeQualifier>S</rangeQualifier> <rangeDetails> <min>3</min> <max>4</max> </rangeDetails> </passengerAndFlightAssociation> <passengerAndFlightAssociation> <rangeQualifier>P</rangeQualifier> <rangeDetails> <min>1</min> </rangeDetails> </passengerAndFlightAssociation> <serviceCodes> <otherSpecialCondition>OBJ</otherSpecialCondition> </serviceCodes> <serviceDetailsGroup> <serviceDetails> <specialRequirementsInfo> <ssrCode>FQTU</ssrCode> <actionCode>F</actionCode> <serviceType>6X</serviceType> <otherServiceType>UP</otherServiceType> </specialRequirementsInfo> </serviceDetails> <fsfkwDataGroup> <fsfkwValues> <criteriaDetails> <attributeType>CNM</attributeType> <attributeDescription>COMMERCIAL NAME FROM THE SPT</attributeDescription> </criteriaDetails> </fsfkwValues> </fsfkwDataGroup> <fsfkwDataGroup> <fsfkwValues> <criteriaDetails> <attributeType>EMD</attributeType> <attributeDescription>Y</attributeDescription> </criteriaDetails> </fsfkwValues> </fsfkwDataGroup> </serviceDetailsGroup> <quotaGroup> <serviceQuota> <quotaInfo> <availability>9</availability> </quotaInfo> </serviceQuota> <bookingClassUpgrade> <productDetailsQualifier>UPG</productDetailsQualifier> <bookingClassDetails> <designator>I</designator> </bookingClassDetails> </bookingClassUpgrade> <segmentReference> <referenceDetails> <type>S</type> <value>3</value> </referenceDetails> </segmentReference> </quotaGroup> <quotaGroup> <serviceQuota> <quotaInfo> <availability>2</availability> </quotaInfo> </serviceQuota> <bookingClassUpgrade> <productDetailsQualifier>UPG</productDetailsQualifier> <bookingClassDetails> <designator>I</designator> </bookingClassDetails> </bookingClassUpgrade> <segmentReference> <referenceDetails> <type>S</type> <value>4</value> </referenceDetails> </segmentReference> </quotaGroup> <pricingGroup> <codeshareCarrierInfo> <codeshareDetails> <airlineDesignator>6X</airlineDesignator> </codeshareDetails> </codeshareCarrierInfo> <computedTaxSubDetails> <monetaryDetails> <typeQualifier>FFA</typeQualifier> <amount>25</amount> <currency>MIL</currency> </monetaryDetails> </computedTaxSubDetails> <couponInfoGroup> <coupon> <uniqueReference>1</uniqueReference> </coupon> <monetaryInfo> <monetaryDetails> <typeQualifier>FFA</typeQualifier> <amount>15</amount> <currency>MIL</currency> </monetaryDetails> </monetaryInfo> <segmentCouponReference> <referenceDetails> <type>S</type> <value>3</value> </referenceDetails> </segmentCouponReference> </couponInfoGroup> <couponInfoGroup> <coupon> <uniqueReference>2</uniqueReference> </coupon> <monetaryInfo> <monetaryDetails> <typeQualifier>FFA</typeQualifier> <amount>10</amount> <currency>MIL</currency> </monetaryDetails> </monetaryInfo> <segmentCouponReference> <referenceDetails> <type>S</type> <value>4</value> </referenceDetails> </segmentCouponReference> </couponInfoGroup> </pricingGroup> <pricingGroup> <codeshareCarrierInfo> <codeshareDetails> <airlineDesignator>6X</airlineDesignator> </codeshareDetails> </codeshareCarrierInfo> <computedTaxSubDetails> <monetaryDetails> <typeQualifier>FFA</typeQualifier> <amount>5</amount> <currency>EVO</currency> </monetaryDetails> </computedTaxSubDetails> <couponInfoGroup> <coupon> <uniqueReference>1</uniqueReference> </coupon> <monetaryInfo> <monetaryDetails> <typeQualifier>FFA</typeQualifier> <amount>3</amount> <currency>EVO</currency> </monetaryDetails> </monetaryInfo> <segmentCouponReference> <referenceDetails> <type>S</type> <value>3</value> </referenceDetails> </segmentCouponReference> </couponInfoGroup> <couponInfoGroup> <coupon> <uniqueReference>2</uniqueReference> </coupon> <monetaryInfo> <monetaryDetails> <typeQualifier>FFA</typeQualifier> <amount>2</amount> <currency>EVO</currency> </monetaryDetails> </monetaryInfo> <segmentCouponReference> <referenceDetails> <type>S</type> <value>4</value> </referenceDetails> </segmentCouponReference> </couponInfoGroup> </pricingGroup> </serviceGroup> </Service\_IntegratedCatalogueReply>

## 5.12.3 Possible Errors

See the "Error Messages" section.

* * *