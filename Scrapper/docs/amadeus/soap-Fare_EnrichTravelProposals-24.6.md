---
url: "https://developers.amadeus.com/api-library/soap/functional-doc/53309/doc-read/141656?serviceVersion=24.6"
download_url: "https://developers.amadeus.com/PAS-EAS/api/download/comp/4d4ad2cb456c02633f463a055ab70584/141656/UG_WBS_Fare_EnrichTravelProposals_FMPXAQ_24.6_007.html"
title: "HTML_UG_WBS_Fare_EnrichTravelProposals_FMPXAQ_24.6_007"
source: "amadeus"
service_id: "53309"
service_name: "Fare_EnrichTravelProposals"
version: "24.6"
document_id: "141656"
doc_version: "24.6"
doc_type: "User guide"
file_format: "HTML"
scraped_at: "2026-07-15T10:22:22.850Z"
---
# Function: Fare\_EnrichTravelProposals

* * *

## 1 Overview

This function aims to offer the cheapest price for a set of specified flights / travel solutions that have already been provided in input request by the user. This product works only for trips with one (one-way trips) or two bounds (round trips / open jaws- where the destination of the first bound is not same as the origin of the second bound).

The travel solutions provided in the request undergo an availability check to determine if they are still valid and only those which are still available are priced by exploring the Amadeus fare system for the cheapest applicable fare.

This function allows at a maximum of 50 travel solutions that can be requested for pricing in a single request irrespective it being a single-bound or two-bound (round trips / open jaws). 

A basic request for this function comprises of the following mandatory elements:

• Itinerary geographical information (origins/destinations)

• Itinerary date information

• Passenger information (number of passenger seats required and associated passenger type codes for travelling passengers)

• Travel solutions or flights which are required to be priced.

In addition to the mandatory elements there is a possibility to enter more optional parameters to further narrow down the search and exploration of the prices. None of the usual flight selection criteria would apply as the travel solutions are already provided by the requestor in the input message.

It's noteworthy to mention that the travel solutions required to be priced could be either one bound or two bounds; there cannot be a mix entered in the input. Implying if for two-bound flights the number of travel solutions provided in the first bound doesn't match the number of travel solutions provided in the second bound then a reject will be raised - TOO MANY PROPOSED SEGMENTS. 

## 1.1 Supported Operations

### What is an "Operation"?

In this document, an "operation" describes, in general, a possible query scenario. More precisely, this operation corresponds very often to the use of an option. However, in some cases, it describes a scenario that points out to a feature that needs further clarification.

### Search with Only Mandatory Elements

Specifying only the mandatory elements allows for the processing of the function to result in priced recommendations of the available travel solutions with lowest price.

Itinerary Date

A date of travel must be specified for a low fare search query.

Origin / Destination

At least one origin and one destination must be specified for a low fare search query.

Passenger Information

Number of Passenger Seats

The number of seats required for the travelling passengers must be specified for a low fare search. This number may not always be equal to the total number of passengers travelling.  
For example, 3 adults and 1 infant, as an infant does not occupy a seat, this request requires only 3 seats for 4 travelling passengers.

Associated Passenger Type Codes for Travelling Passengers

Each travelling passenger must be associated to a Passenger Type Code (PTC) for a low fare search.

Number of Recommendations

The user may specify (as they are not obliged) the maximum number of recommendations to be returned but this value will be ignored as the travel solutions will be directly provided in the input which should not exceed the maximum number.

Proposed Segment or Travel Solution

The proposed segments or the travel solutions comprise of the following mandatory information:

\- The flight / flights (in case of connection) which are required to be boarded for traveling a single bound.  
\- The flight details which comprise of the following mandatory information:

-   departure airport of the flight
-   arrival airport of the flight
-   flight date at both departure and arrival airports.
-   flight timings at both departure and arrival airports.
-   flight’s marketing carrier
-   flight number
-   aircraft / equipment type

### Search with Optional Elements

Specifying additional optional elements in the search request will narrow the recommendations returned. The more optional elements included in the search request, the more precise the search recommendations will be.

**Flight Options**

-   **Point of commencement**

The user can specify the real point of commencement when the first requested segment is not the real origin.

**Fare Options**

-   **Currency Conversion**

The user has the ability to specify in which currency the fare recommendations must be converted and returned.

-   **Currency of Fare Selection**

The user has the ability to only request recommendations with fare filed in a specified currency.

-   **Selling/Ticketing Cities Override**

The user has the ability to override the Selling and/or Ticketing Cities.

-   **Paper Ticket / Electronic Ticket**

This option offers to the user the capability to process: Paper Ticket only or Electronic Ticket only.

-   **Unifares / Public fares / Corporate fares**

By default the low fare searches are applicable only to public fares. However, the user can specify whether the low fare search applies on Unifares only, on all Public and Unifare fares or Corporate fares.

-   **Expanded Parameters**

The user can specify Expanded Parameters that are used to target only some fares (refundable, without penalty, and so on). Only valid expanded parameter options applicable: NAP, NPE, NR, NRF and RF.

-   **Price only PTC**

The process returns strictly recommendations with the requested passenger type, no defaulting is done.

**Service Fees Options**

-   **Sorting with/without Fees**

This option provides the possibility to sort recommendations in output based on an amount including fees or excluding fees levied by the airline. It is applied for all passengers of the query. This option necessitates a configuration setting applied to the airline.

-   **Exempt all airline ticketing fees**

Airline ticketing fees can all be exempted with this option. Add/Exempt airline ticketing fees by sub-code Airline ticketing fees (OB fees) sub-codes can be specified in order to add or exempt particular fees.

**Ancillary services Option**

The user can request ancillary services.

## 1.2 Limitations

### Number of Travel Solutions

The maximum number of travel solutions in initial release is 50 which is subject to revision.

### Range of Dates

Since the travel solutions are directly provided this option's provisioning is not permitted.

### Multicity

Multicity searches are not possible.

### Requested Segments

It is not possible to request more than two requested segments. Implying only the following itinerary types that can be handled by the product - 

-   One way trips
-   Round trips
-   Open Jaw trips

### Number of Passengers

It is not possible to request more than 9 passengers.

### Slice and Dice processing

The Slice and Dice process is not supported meaning that Slice and Dice availability is not checked for this function. 

## 1.3 Unsupported Operations

**Flight Options** : (Not supported primarily due to the reason that concerned flights creating the journey are directly provided in the input request)

-   **Airline/Alliance (Include/Exclude)**

Possibility to include and/or exclude airlines and/or alliances using a 2-alphanumeric character code.

-   **Flight Category**

Possibility to request Non-Stop, Direct or Connecting flights or a combination of these categories.

-   **Connecting Point**

Possibility to include and/or exclude up to 2 connecting points in the search. A connecting point can be a city or an airport.

-   **Disable biased reference**

Despite this option present it doesn't get treated because it affects the flight search part (this option retrieves flights in neutral mode independently of the office settings) and flight search is not triggered because the travel solutions are already provided in the request.

-   **More overnights**

Possibility to request more overnight solutions if they are part of the cheapest solutions, as we are not searching for any travel solutions at all.

-   **Online**

Despite this option present it doesn't get treated because it affects the flight search part (this option forces the process to return online travel solutions only, even if cheaper recommendations mixing carriers exist) and flight search is not triggered because the travel solutions are already provided in the request.

-   **Interline option**

Despite this option present it doesn't get treated because it affects the flight search part (interline solutions imply recommendations built with flights marketed by different carriers) and flight search is not triggered because the travel solutions are already provided in the request.

-   **Anchored Search**

Possibility to freeze one or more requested segments in input in order to get only recommendations including those travel solutions. Full mode or basic mode is triggered by OID setting.

-   **Progressive legs  
    **

Progressive legs enables the user to request a range of number of connections relative to the minimum connections that exist on Journey Server. Since flights are already provided, no exploration is done for flights at all for this function.

**Date/Time Options:** (Not supported as the flight's schedule will be retrieved while performing the check of availability for the travel solutions provided in the request)

-   **Time of Departure/Arrival**

Per requested segment, the user has the ability to specify one of the following:

\- A time of departure: the earliest time that a recommended flight may "depart from".

\- A time of arrival: the latest time that a recommended flight may "arrive by".

Both options cannot be used at the same time on the same requested segment.

-   **Time Window**

The user has the ability to specify an applicable time window range, in terms of hours, to a specified time by departure or arrival option. Thus, allowing the low fare search to include any flight recommendations that arrive or depart within the specified number of hours on either side of the specified time by departure or arrival.

-   **Time at Destination**

The time at destination is the minimum time between the arrival time and departure time of two consecutive proposed segments. This minimum time is specified in input with the following format HHMM. Any value between 0000 and 2359 is accepted.

-   **Range of Date**

The user has the ability to request that the low fare search to include the day before or the day after the date specified for a trip segment.

**Fare Options:**

-   **My Search - Fare Families**

By default any applicable fare can be returned, using My Search option the user can specify which fares are of interest by using criteria like Fare Basis, Prime booking Code.

-   **Solution Family Distribution**

Travel Board solution family distribution is designed to cover the need to show a list of families of recommendations for a specific itinerary on defined dates. A solution family refers to price results matching predefined criteria as "Cheapest Recommendations" or "Non Stop".

-   **Alternate Price**

This function allows returning for each recommendations belonging to the eligible fare family, the cheapest available alternate recommendation for the exact same journey and cabin.

**Distribution options**

-   **Airline Distribution: ADI**

When this option is requested, the total number of Recommendations are distributed over 2 sets as the following:

**The Airline Diversity Set** contains the cheapest recommendation for each online carrier and the cheapest recommendation for each Mono-Main Carrier.

**The Cheapest Recommendations Set** contains the cheapest recommendations matching the query that are not included in the Airline Diversity recommendations set.

-   **Airline Distribution Container: ADC**

When this option is requested, the total number of recommendations are distributed over 2 sets as the following:

**The Airline Diversity Container:** Up to 25% of the Total Number of Recommendation is allocated to the airline diversity.

**Distribution options**

**The Cheapest Recommendations Set** contains the cheapest recommendations matching the query that are not included in the Airline Diversity Container.

-   **Non-Stop Preferred** 

When this option is requested, recommendations with non-stop flights will be favoured. The user has also the possibility to modify the non-stop distribution weight.

**Output options**

-   **Rank in journey Server**

The user has the ability to request the display of the rank of the Flight Solution. Since there is no call to journey server.

-   **Multi-Ticket option**

The Multi-Ticket option allows returning at the same time:  
\- Recommendations that require one single pricing transaction to be booked.  
\- Recommendations that require individual pricing transactions per proposed segment to be booked (the search is done on the same office id for the whole itinerary).

-   **Value Search**

Depending of the criteria profile, the user has the ability to quote the more convenient solutions.

-   **In-Flight Services**

Depending of input option, the user has the ability to request the display of the in-flight services for each flight.

## 1.4 Prerequisites

Not applicable

## 2 Building A Query

Each query follows a given structure. The queries for the function operations are clearly explained with data element examples in a generic table view.

It is important to note that the examples in each chapter are only illustrations and are meant to provide the basis for a better understanding on which fields are mandatory for basic operation utilisation. In some cases it is not a full explanation of every field that can be utilised for the operation, but rather a guideline to its use.

### Considerations

When building a query it is important to understand the following concepts for the low fare search queries:

### What is a Requested Segment?

A requested segment is an Origin/Destination/Date segment of the travel requested in the query.

Examples:

-   CDG to JFK on 26 June
-   CDG to JFK on 26 June or 27 June
-   LON to BKK on 26 June
-   LON or any airport within 100 km to BKK on any date between 26 June and 27 June
-   LON to NCE/MRS/MCM ("Cote d'Azur") on any date between 26 June and 27 June

### What is an Itinerary?

An itinerary is the combination of all the requested segments in the order the passenger specified them.

### Optional Parameters

The optional parameters may apply at the requested segment and/or itinerary level.

Applicable Option Levels

The following table gives the rule for each option in terms of applicable levels.

Options

Applies to Segment

Applies to Itinerary

Flight Options

Number of recommendations

  

X

Expanded Parameter

  

X

Selling/Ticketing Cities

  

X

Fare Options

Passenger Type

  

X

Unifares

  

X

Currency Conversion

  

X

Paper Ticket/Electronic Ticket

  

X

Ticketability pre-check

  

X

Expanded Parameters

  

X

Withhold All Taxes/Surcharges

  

X

Adding/exempting specific airline ticketing fees

  

X

Exempt all airline ticketing fees

  

X

Sorting with/without Fees

  

X

Price only PTC

  

X

Date Options

Output Options

  

  

Identify YQ/YR tax amounts

X

The input validation of each option is described in the corresponding sections.

Possible Option Level Errors

Option Cannot be Applied at Requested Segment Level. If an option is only valid at the Itinerary level but the user has specified it at the Requested Segment level, the entire entry is rejected with the following message:  
"OPTION CANNOT BE APPLIED AT REQUESTED SEGMENT LEVEL"

Option Cannot be Applied at Itinerary Level  
If an option is only valid at the Requested Segment level but the user has specified it at the Itinerary level, the entire entry is rejected with the following message:  
"OPTION CANNOT BE APPLIED AT ITINERARY LEVEL"

### Query Structures

The query samples provided in this document are in a table format to easily identify the different levels of applicable information required in the function.  
The repetitions of nodes in the samples provided are identified with brackets and numbers **\[n\]**.

Each element of the function is explained with a query sample in the applicable sections of this document. In some cases, the query sample contains only the information applicable to the discussed element. The responsibility lies with the API developer to read the element sections for rules and combinability issues to build the applicable messages desired.

As a guideline for the possibility of a more complex message structure, the sample query structure below is given, identifying a low fare search requesting the following information:

Item #

Requested Information

0 - 1

Low Fare Search for 3 passengers

2 - 3

Requesting a maximum of 200 recommendations returned

4 - 8

Passenger Types of 2 Adults and 1 Child

9 - 10

DL airlines are to be excluded from any recommendations

11 - 16

**1st requested segment**:

-   Departing airport in Nice (NCE)
-   Arriving at any airport in the city of Houston (HOU)
-   Time specified for arrival by 20 Feb 2004 at 5pm

17 - 22

**2nd requested segment**:

-   Departing any airport in city of Houston
-   Arriving at Nice airport NCE
-   Departure Date of 28 Feb 2004
-   Requesting both Non-Stop and Direct Flights for the recommendations

Item #

SearchQuery - Data element

Value

0

/Segment/unitNumberDetail\[1\] /**numberOfUnits**

3

1

/Segment/unitNumberDetail\[1\] /**typeOfUnit**

PX

2

/Segment/unitNumberDetail\[2\] /**numberOfUnits**

200

3

/Segment/unitNumberDetail\[2\] /**typeOfUnit**

RC

4

/paxReference\[1\]/ **ptc**

ADT

5

/paxReference\[1\]/traveller\[1\] /**ref**

1

6

/paxReference\[1\]/traveller\[2\] /**ref**

2

7a

/paxReference\[2\]/ **ptc\[1\]**

CH

7b

/paxReference\[2\]/ **ptc\[2\]**

MIL

8

/paxReference\[2\]/traveller /**ref**

3

9

/travelFlightInfo/companyIdentity\[2\] /**carrierQualifier**

X

10

/travelFlightInfo/companyIdentity\[2\] /**carrierId**

DL

11

/itinerary\[3\]/requestedSegmentRef /**segmentRef**

1

12

/itinerary\[3\]/departureLocalization/departurePoint /**locationId**

NCE

13

/itinerary\[3\]/arrivalLocalization/arrivalPointDetails /**locationId**

HOU

14

/itinerary\[3\]/timeDetails/firstDateTimeDetail /**timeQualifier**

TA

15

/itinerary\[3\]/timeDetails/firstDateTimeDetail /**date**

200204

16

/itinerary\[3\]/timeDetails/firstDateTimeDetail /**time**

1700

17

/itinerary\[4\]/requestedSegmentRef /**segmentRef**

2

18

/itinerary\[4\]/departureLocalization/departurePoint /**locationId**

HOU

19

/itinerary\[4\]/arrivalLocalization/arrivalPointDetails /**locationId**

NCE

20

/itinerary\[4\]/timeDetails/firstDateTimeDetail /**date**

280204

21

/itinerary\[4\]/flightInfo/flightDetail /**flightType**\[1\]

N

22

/itinerary\[4\]/flightInfo/flightDetail /**flightType**\[2\]

D

Referring to the applicable element sections of this document will provide any specific element information required.

## 3 Receiving A Reply

For each query requested, either an applicable error message or a valid response is returned. Applicable error message information is provided under each element section within this document.

In case of a valid response, two cases occur. Either the reply message is truncated if it is too big or not.

In case of truncation, a flag is returned with the maximum size of the message (MSG:230k).

The reply information will vary depending on the query information provided.

### Considerations

When building a query it is important to understand the following concepts for the low fare search queries:

### What is a Fare Family?

A Fare Family is a group of fares sharing the same characteristics. Fare Family details can be defined as a combination of the following elements, for example:

-   Publishing carrier
-   Type of fare (for example, Published, Amadeus Nego, ATP Nego)
-   Inclusion of one or several fare basis
-   Prime booking code

  
A combinability tag and a ranking are also provided.

-   The combinability tag prevents fare families from being combined.
-   The ranking is used to assign a resulting fare family in case where fare families are combined.

### What is a Recommendation?

A recommendation is the combination of a fare and its corresponding journeys that are returned as a possible solution.  
The journeys are divided and categorised under applicable fares making up the number of recommendations requested in the query.

The recommendations can be fictitious as well priced with a 0.00 amount depending on the activations done at the office ID level to communicate certain failure reasons when the recommendation cannot be proposed. 

### What is a Journey?

A journey is a combination of proposed segments covering the requested itinerary.

### What is a Proposed Segment?

A proposed segment is a combination of flights that matches a requested segment. This may result in 3 connecting flights being considered as a single proposed segment.

  
Examples:

Request Segment

Proposed Segment

CDG to JFK on 26 June

AF flight 22 on 26 June

LON to BKK on 26 June

LH flight 4629 LHR to FRA 26 June  
LH flight 744 FRA to BKK 26 June

NCE to SBN on 28 July

AF flight 7701 NCE to CDG 28 July  
AF flight 050 CDG to ORD 28 July  
UA flight 5860 ORD to SBN 28 July

### Electronic Ticketing

The Electronic Ticketing indicator field indicates whether a flight is eligible for electronic ticketing (value 'Y' for Yes) or not (value 'N' for No).

addProductDetail - Data element Value

Value

/**electronicTicketing**

Y

/**electronicTicketing**

Y

Electronic ticketing (e-ticketing) allows sending ticketing information directly to an airline so that passengers can check in at the airport and board flights without requiring printed tickets. When an electronic ticket (e-ticket) is issued via Amadeus, the system sends the flight coupons as a message to the airline. If the airline accepts the e-ticket request, the information is stored in the airline's own system as an e-ticket record and displayed in the reply.

**Notes**:

-   The amount of time that electronic ticket record remains stored in the airline's system varies among airlines.
-   In order for electronic tickets (in other word e-ticketing) to be issued, the office must be authorised to issue e-tickets as defined at the Office Profile level.The flight segments in the itinerary are required to be eligible for 'e-ticketing' and the validating airline must support e-ticketing in Amadeus.
-   Every airline that supports electronic ticketing in Amadeus has its own conditions.

SearchReply - Data element

Example

Description

specificRecDetails / specificRecItem /referenceType

A

Availability context

specificRecDetails/specificRecItem/refNumber

1

Availability context index

specificProductDetails/productReferences / paxFareNum

1

Reference to passenger

specificProductDetails/ fareContextDetails/ requestedSegmentInfo/ segRef

1

Index of Proposed Segment

fareContextDetails/ cnxContextDetails\[1\]/ fareCnxInfo/ contextDetails/ availabilityCnxType

LA

Availability context "local" for first flight of Proposed Segment

fareContextDetails/ cnxContextDetails\[2\]/ fareCnxInfo/ contextDetails/ availabilityCnxType

LA

Availability context "local" for second flight of Proposed Segment

  
  

### Reply Structure

As it is not possible to cover every reply structure possible, only a sample of a possible reply structure is provided as a guideline of the typical reply message expected.  
Each reply contains the following:

-   Fare Families Applicable for the recommendations (in case parameterized fare families have been requested in the input)
-   **Proposed Flight Segments** for each requested segment
-   **Journeys** consisting of combinations of proposed flight segments to complete the requested trip
-   **Applicable Fares** for journeys
-   **Applicable Fare Details**

### Fare Family Information Reply

The following information is returned in the reply pertaining to te fare families discovered:

-   Fare Family Information: Reference, name and associated ancillaries of each fare family

This table presents the XML node familyInformation structure associated to each Fare Family information that is returned in the reply:

SearchReply - Data element

example

Description

/ familyInformation /refNumber

1

Reference of the fare family

/ familyInformation / fareFamilyname

FFAMILY1

Name of the fare family

-   Fare Family Reference of each fare detail:

SearchReply - Data element

example

Description

/ fareDetails / groupOfFares / fareFamiliesRef /referencingDetail/ refQualifier

F

Reference of the fare family

/ fareDetails / groupOfFares / fareFamiliesRef /referencingDetail/ refQualifier/ refNumber

1

Reference to the Fare Family referenced 1 in the family information node.

-   Fare Breakpoint returned

SearchReply - Data element

example

Description

/recommendation\[2\] /paxFareProduct\[4\] /fareDetails\[2\] /groupOfFares/ productInformation/ breakPoint

Y

The fare breakpoint: Y or N

### OB fees

In the reply, information is also provided about the fact that OB fees exist for the validating carrier and the office (OID), the validating carrier used for pricing and the amount of OB fees.

SearchReply - Data element

example

Description

priceTicketing/ priceType\[1\]/

OBV

Validating carrier accepts OB fees

priceTicketing/ priceType\[2\]/

OBA

OID accepts OB fees

recPriceInfo/ monetaryDetail/ amountType

  

  

recPriceInfo/ monetaryDetail/ amount

  

  

paxFareDetail/ codeShareDetails/ transportStageQualifier

V

Type of carrier: validating carrier used for pricing

paxFareDetail/ codeShareDetails/ company

AA

AA is validating carrier

paxFareDetail/ monetaryDetails/ amountType

OB

Type of Amount: OB fees

paxFareDetail/ monetaryDetails/ amount

10

Amount

It should be noted that the number of recommendations returned are dispersed between applicable fares and will be less than or equal to the number recommendations requested in the query. One applicable fare may contain more than one journey, resulting in a set of recommendations based on the same fare.

Below is a typical reply structure that can be expected to the query sample provided in the "Building A Query" section of this document. The sample reply structure contains the following information for 5 recommendations to a query containing 2 requested segments (1st - Nice to Houston, 2nd - Houston to Nice):

Item #

  

Reply Information

1

Applicable Currency of reply in US Dollars

**PROPOSED SEGMENTS APPLICABLE TO 1ST REQUESTED SEGMENT**

2

Applicable "Requested" Segment - 1st Requested segment

3

Applicable "Proposed" Segment - **1st Proposed segment**

4-5

Total elapsed flying time for proposed segment - 13h50

6-30

Flight Details for 1st proposed segment

6-18

1st flt

Nice to Paris

19-30

2nd flt

Paris to Houston

31

Applicable "Proposed" Segment - **2nd Proposed segment**

32-33

Total elapsed flying time for proposed segment - 13h50

34-59

Flight Details for 2nd proposed segment

34-46

1st flt

Nice to Paris

47-59

2nd flt

Paris to Houston

60

Applicable "Proposed" Segment - **3rd Proposed segment**

61

Total elapsed flying time for proposed segment - 13h50

62-87

Flight Details for 2nd proposed segment

62-74

1st flt

Marseille to Paris

75-87

2nd flt

Paris to Houston

**PROPOSED SEGMENTS APPLICABLE TO 2ND REQUESTED SEGMENT**

88

Applicable "Requested" Segment - 2nd Requested segment

89

Applicable "Proposed" Segment - **1st Proposed segment**

90-92

Total elapsed flying time for proposed segment - 12h15

93-118

Flight Details for 1st proposed segment

93-105

1st flt

Houston to London

106-118

2nd flt

London to Nice

119

Applicable "Proposed" Segment - **2nd Proposed segment**

120-121

Total elapsed flying time for proposed segment - 12h20

122-148

Flight Details for 1st proposed segment

122-135

1st flt

Houston to Paris

136-148

2nd flt

Paris to Nice

149

Applicable "Proposed" Segment - **3rd Proposed segment**

150-151

Total elapsed flying time for proposed segment - 12h20

152-178

Flight Details for 1st proposed segment

152-165

1st flt

Houston to Paris

166-178

2nd flt

Paris to Nice

179

Applicable "Proposed" Segment - **4th Proposed segment**

180-181

Total elapsed flying time for proposed segment - 12h25

182-208

Flight Details for 1st proposed segment

182-195

1st flt

Houston to London

196-208

2nd flt

London to Nice

**APPLICABLE RECOMMENDATIONS FOR REQUESTED SEGMENTS**

209-258

1st Set of recommendations for an Applicable fare

210

Total Price for all passengers (including taxes)

211

Total Taxes for all passengers

212-215

Applicable flight combination - completing recommendation #1

216-219

Applicable flight combination - completing recommendation #2

220-258

Applicable Fare Details

220-238

Fare Details for Adult passengers

239-258

Fare Details for Child passenger

259-300

2nd Set of recommendations for an Applicable fare

260

Total Price for all passengers (including taxes)

261

Total Taxes for all passengers

262-265

Applicable flight combination of - completing recommendation #3

266-269

Applicable flight combination of - completing recommendation #4

270-300

Applicable Fare Details

301-330

3rd Set of recommendations for an Applicable fare

302

Total Price for all passengers (including taxes)

303

Total Taxes for all passengers

304-307

Applicable flight combination of - completing recommendation #5

308-330

Applicable Fare Details

**NOTE**: The reply structure contains all proposed segments listed first followed by associated fare information for the proposed segments to complete each recommendation.

Item

SearchReply - Data element

Value

**1**

/conversionRate/conversionRateDetail/ **currency**

USD

**PROPOSED SEGMENTS FOR 1st REQUESTED SEGMENT**

**2**

/flightIndex \[1\] /requestedSegmentRef/ **segRef**

1

**3**

/flightIndex \[1\] /groupOfFlights \[1\] /propFlightGrDetail/flightProposal \[1\] / **ref**

1

**4**

/flightIndex \[1\] /groupOfFlights \[1\] /propFlightGrDetail/flightProposal \[2\] / **ref**

1350

**5**

/flightIndex \[1\] /groupOfFlights \[1\] /propFlightGrDetail/flightProposal \[2\] / **unitQualifier**

EFT

**6**

/flightIndex \[1\] /groupOfFlights \[1\] /propFlightGrDetail/flightProposal \[3\] / **ref**

AF

**7**

/flightIndex \[1\] /groupOfFlights \[1\] /propFlightGrDetail/flightProposal \[3\] / **unitQualifier**

MCX

**8**

/flightIndex \[1\] /groupOfFlights \[1\] /flightDetails \[1\] /flightInformation/productDateTime/ **dateOfDeparture**

200202

**9**

/flightIndex \[1\] /groupOfFlights \[1\] /flightDetails \[1\] /flightInformation/productDateTime/ **timeOfDeparture**

0725

**10**

/flightIndex \[1\] /groupOfFlights \[1\] /flightDetails \[1\] /flightInformation/productDateTime/ **dateOfArrival**

200202

**11**

/flightIndex \[1\] /groupOfFlights \[1\] /flightDetails \[1\] /flightInformation/productDateTime/ **timeOfArrival**

0855

**12**

/flightIndex \[1\] /groupOfFlights \[1\] /flightDetails \[1\] /flightInformation/location \[1\] / **locationId**

NCE

**13**

/flightIndex \[1\] /groupOfFlights \[1\] /flightDetails \[1\] /flightInformation/location \[2\] / **locationId**

CDG

**14**

/flightIndex \[1\] /groupOfFlights \[1\] /flightDetails \[1\] /flightInformation/location \[2\] / **airportCityQualifier**

A

**15**

/flightIndex \[1\] /groupOfFlights \[1\] /flightDetails \[1\] /flightInformation/companyId/ **marketingCarrier**

AF

**16**

/flightIndex \[1\] /groupOfFlights \[1\] /flightDetails \[1\] /flightInformation/companyId/ **operatingCarrier**

AF

**17**

/flightIndex \[1\] /groupOfFlights \[1\] /flightDetails \[1\] /flightInformation/ **flightNumber**

7673

**18**

/flightIndex \[1\] /groupOfFlights \[1\] /flightDetails \[1\] /flightInformation/productDetail/ **equipmentType**

320

**19**

/flightIndex \[1\] /groupOfFlights \[1\] /flightDetails \[1\] /flightInformation/addProductDetail/ **electronicTicketing**

Y

**20**

/flightIndex \[1\] /groupOfFlights \[1\] /flightDetails \[2\] /flightInformation/productDateTime/ **dateOfDeparture**

200202

**21**

/flightIndex \[1\] /groupOfFlights \[1\] /flightDetails \[2\] /flightInformation/productDateTime/ **timeOfDeparture**

1020

**22**

/flightIndex \[1\] /groupOfFlights \[1\] /flightDetails \[2\] /flightInformation/productDateTime/ **dateOfArrival**

200202

**23**

/flightIndex \[1\] /groupOfFlights \[1\] /flightDetails \[2\] /flightInformation/productDateTime/ **timeOfArrival**

1415

**24**

/flightIndex \[1\] /groupOfFlights \[1\] /flightDetails \[2\] /flightInformation/location \[1\] / **locationId**

CDG

**25**

/flightIndex \[1\] /groupOfFlights \[1\] /flightDetails \[2\] /flightInformation/location \[2\] / **locationId**

IAH

**26**

/flightIndex \[1\] /groupOfFlights \[1\] /flightDetails \[2\] /flightInformation/companyId/ **marketingCarrier**

CO

**27**

/flightIndex \[1\] /groupOfFlights \[1\] /flightDetails \[2\] /flightInformation/companyId/ **operatingCarrier**

AF

**28**

/flightIndex \[1\] /groupOfFlights \[1\] /flightDetails \[2\] /flightInformation/ **flightNumber**

83

**29**

/flightIndex \[1\] /groupOfFlights \[1\] /flightDetails \[2\] /flightInformation/productDetail/ **equipmentType**

343

**30**

/flightIndex \[1\] /groupOfFlights \[1\] /flightDetails \[2\] /flightInformation/addProductDetail/ **electronicTicketing**

Y

**31**

/flightIndex \[1\] /groupOfFlights \[2\] /propFlightGrDetail/flightProposal \[1\] / **ref**

2

**32**

/flightIndex \[1\] /groupOfFlights \[2\] /propFlightGrDetail/flightProposal \[2\] / **ref**

1350

**33**

/flightIndex \[1\] /groupOfFlights \[2\] /propFlightGrDetail/flightProposal \[2\] / **unitQualifier**

EFT

**34**

/flightIndex \[1\] /groupOfFlights \[1\] /propFlightGrDetail/flightProposal \[3\] / **ref**

AF

**35**

/flightIndex \[1\] /groupOfFlights \[1\] /propFlightGrDetail/flightProposal \[3\] / **unitQualifier**

MCX

**36**

/flightIndex \[1\] /groupOfFlights \[2\] /flightDetails \[1\] /flightInformation/productDateTime/ **dateOfDeparture**

200202

**37**

/flightIndex \[1\] /groupOfFlights \[2\] /flightDetails \[1\] /flightInformation/productDateTime/ **timeOfDeparture**

0725

**38**

/flightIndex \[1\] /groupOfFlights \[2\] /flightDetails \[1\] /flightInformation/productDateTime/ **dateOfArrival**

200202

**39**

/flightIndex \[1\] /groupOfFlights \[2\] /flightDetails \[1\] /flightInformation/productDateTime/ **timeOfArrival**

0855

**40**

/flightIndex \[1\] /groupOfFlights \[2\] /flightDetails \[1\] /flightInformation/location \[1\] / **locationId**

NCE

**41**

/flightIndex \[1\] /groupOfFlights \[2\] /flightDetails \[1\] /flightInformation/location \[2\] / **locationId**

CDG

**42**

/flightIndex \[1\] /groupOfFlights \[2\] /flightDetails \[1\] /flightInformation/companyId/ **marketingCarrier**

AF

**43**

/flightIndex \[1\] /groupOfFlights \[2\] /flightDetails \[1\] /flightInformation/companyId/ **operatingCarrier**

AF

**44**

/flightIndex \[1\] /groupOfFlights \[2\] /flightDetails \[1\] /flightInformation/ **flightNumber**

7673

**45**

/flightIndex \[1\] /groupOfFlights \[2\] /flightDetails \[1\] /flightInformation/productDetail/ **equipmentType**

320

**46**

/flightIndex \[1\] /groupOfFlights \[2\] /flightDetails \[1\] /flightInformation/addProductDetail/ **electronicTicketing**

Y

**47**

/flightIndex \[1\] /groupOfFlights \[2\] /flightDetails \[2\] /flightInformation/productDateTime/ **dateOfDeparture**

200202

**48**

/flightIndex \[1\] /groupOfFlights \[2\] /flightDetails \[2\] /flightInformation/productDateTime/ **timeOfDeparture**

1020

**49**

/flightIndex \[1\] /groupOfFlights \[2\] /flightDetails \[2\] /flightInformation/productDateTime/ **dateOfArrival**

200202

**50**

/flightIndex \[1\] /groupOfFlights \[2\] /flightDetails \[2\] /flightInformation/productDateTime/ **timeOfArrival**

1415

**51**

/flightIndex \[1\] /groupOfFlights \[2\] /flightDetails \[2\] /flightInformation/location \[1\] / **locationId**

CDG

**52**

/flightIndex \[1\] /groupOfFlights \[2\] /flightDetails \[2\] /flightInformation/location \[2\] / **locationId**

IAH

**53**

/flightIndex \[1\] /groupOfFlights \[2\] /flightDetails \[2\] /flightInformation/companyId/ **marketingCarrier**

AF

**54**

/flightIndex \[1\] /groupOfFlights \[2\] /flightDetails \[2\] /flightInformation/companyId/ **operatingCarrier**

AF

**55**

/flightIndex \[1\] /groupOfFlights \[2\] /flightDetails \[2\] /flightInformation/ **flightNumber**

36

**56**

/flightIndex \[1\] /groupOfFlights \[2\] /flightDetails \[2\] /flightInformation/productDetail/ **equipmentType**

343

**57**

/flightIndex \[1\] /groupOfFlights \[2\] /flightDetails \[2\] /flightInformation/addProductDetail/ **electronicTicketing**

Y

**58**

/flightIndex \[1\] /groupOfFlights \[3\] /propFlightGrDetail/flightProposal \[1\] / **ref**

3

**59**

/flightIndex \[1\] /groupOfFlights \[3\] /propFlightGrDetail/flightProposal \[2\] / **ref**

1350

**60**

/flightIndex \[1\] /groupOfFlights \[3\] /propFlightGrDetail/flightProposal \[2\] / **unitQualifier**

EFT

**61**

/flightIndex \[1\] /groupOfFlights \[1\] /propFlightGrDetail/flightProposal \[3\] / **ref**

AF

**62**

/flightIndex \[1\] /groupOfFlights \[1\] /propFlightGrDetail/flightProposal \[3\] / **unitQualifier**

MCX

**63**

/flightIndex \[1\] /groupOfFlights \[3\] /flightDetails \[1\] /flightInformation/productDateTime/ **dateOfDeparture**

200202

**64**

/flightIndex \[1\] /groupOfFlights \[3\] /flightDetails \[1\] /flightInformation/productDateTime/ **timeOfDeparture**

0725

**65**

/flightIndex \[1\] /groupOfFlights \[3\] /flightDetails \[1\] /flightInformation/productDateTime/ **dateOfArrival**

200202

**66**

/flightIndex \[1\] /groupOfFlights \[3\] /flightDetails \[1\] /flightInformation/productDateTime/ **timeOfArrival**

0855

**67**

/flightIndex \[1\] /groupOfFlights \[3\] /flightDetails \[1\] /flightInformation/location \[1\] / **locationId**

MRS

**68**

/flightIndex \[1\] /groupOfFlights \[3\] /flightDetails \[1\] /flightInformation/location \[2\] / **locationId**

CDG

**69**

/flightIndex \[1\] /groupOfFlights \[3\] /flightDetails \[1\] /flightInformation/location \[2\] / **airportCityQualifier**

A

**70**

/flightIndex \[1\] /groupOfFlights \[3\] /flightDetails \[1\] /flightInformation/companyId/ **marketingCarrier**

AF

**71**

/flightIndex \[1\] /groupOfFlights \[3\] /flightDetails \[1\] /flightInformation/companyId/ **operatingCarrier**

AF

**72**

/flightIndex \[1\] /groupOfFlights \[3\] /flightDetails \[1\] /flightInformation/ **flightNumber**

7673

**73**

/flightIndex \[1\] /groupOfFlights \[3\] /flightDetails \[1\] /flightInformation/productDetail/ **equipmentType**

320

**74**

/flightIndex \[1\] /groupOfFlights \[3\] /flightDetails \[1\] /flightInformation/addProductDetail/ **electronicTicketing**

Y

**75**

/flightIndex \[1\] /groupOfFlights \[3\] /flightDetails \[2\] /flightInformation/productDateTime/ **dateOfDeparture**

200202

**76**

/flightIndex \[1\] /groupOfFlights \[3\] /flightDetails \[2\] /flightInformation/productDateTime/ **timeOfDeparture**

1020

**77**

/flightIndex \[1\] /groupOfFlights \[3\] /flightDetails \[2\] /flightInformation/productDateTime/ **dateOfArrival**

200202

**78**

/flightIndex \[1\] /groupOfFlights \[3\] /flightDetails \[2\] /flightInformation/productDateTime/ **timeOfArrival**

1415

**79**

/flightIndex \[1\] /groupOfFlights \[3\] /flightDetails \[2\] /flightInformation/location \[1\] / **locationId**

CDG

**80**

/flightIndex \[1\] /groupOfFlights \[3\] /flightDetails \[2\] /flightInformation/location \[2\] / **locationId**

IAH

**81**

/flightIndex \[1\] /groupOfFlights \[3\] /flightDetails \[2\] /flightInformation/companyId/ **marketingCarrier**

CO

**82**

/flightIndex \[1\] /groupOfFlights \[3\] /flightDetails \[2\] /flightInformation/companyId/ **operatingCarrier**

AF

**83**

/flightIndex \[1\] /groupOfFlights \[3\] /flightDetails \[2\] /flightInformation/ **flightNumber**

83

**84**

/flightIndex \[1\] /groupOfFlights \[3\] /flightDetails \[2\] /flightInformation/productDetail/ **equipmentType**

343

**85**

/flightIndex \[1\] /groupOfFlights \[3\] /flightDetails \[2\] /flightInformation/addProductDetail/ **electronicTicketing**

Y

**PROPOSED SEGMENTS FOR 2nd REQUESTED SEGMENT**

**86**

/flightIndex \[2\] /requestedSegmentRef/ **segRef**

2

**87**

/flightIndex \[2\] /groupOfFlights \[1\] /propFlightGrDetail/flightProposal \[1\] / **ref**

1

**88**

/flightIndex \[2\] /groupOfFlights \[1\] /propFlightGrDetail/flightProposal \[2\] / **ref**

1215

**89**

/flightIndex \[2\] /groupOfFlights \[1\] /propFlightGrDetail/flightProposal \[2\] / **unitQualifier**

EFT

**90**

/flightIndex \[1\] /groupOfFlights \[1\] /propFlightGrDetail/flightProposal \[3\] / **ref**

BA

**91**

/flightIndex \[1\] /groupOfFlights \[1\] /propFlightGrDetail/flightProposal \[3\] / **unitQualifier**

MCX

**92**

/flightIndex \[2\] /groupOfFlights \[1\] /flightDetails \[1\] /flightInformation/productDateTime/ **dateOfDeparture**

210302

**93**

/flightIndex \[2\] /groupOfFlights \[1\] /flightDetails \[1\] /flightInformation/productDateTime/ **timeOfDeparture**

1625

**94**

/flightIndex \[2\] /groupOfFlights \[1\] /flightDetails \[1\] /flightInformation/productDateTime/ **dateOfArrival**

220302

**95**

/flightIndex \[2\] /groupOfFlights \[1\] /flightDetails \[1\] /flightInformation/productDateTime/ **timeOfArrival**

0710

**96**

/flightIndex \[2\] /groupOfFlights \[1\] /flightDetails \[1\] /flightInformation/productDateTime/ **dateVariation**

1

**97**

/flightIndex \[2\] /groupOfFlights \[1\] /flightDetails \[1\] /flightInformation/location \[1\] / **locationId**

IAH

**98**

/flightIndex \[2\] /groupOfFlights \[1\] /flightDetails \[1\] /flightInformation/location \[2\] / **locationId**

LGW

**99**

/flightIndex \[2\] /groupOfFlights \[1\] /flightDetails \[1\] /flightInformation/companyId/ **marketingCarrier**

BA

**100**

/flightIndex \[2\] /groupOfFlights \[1\] /flightDetails \[1\] /flightInformation/companyId/ **operatingCarrier**

BA

**101**

/flightIndex \[2\] /groupOfFlights \[1\] /flightDetails \[1\] /flightInformation/ **flightNumber**

2024

**102**

/flightIndex \[2\] /groupOfFlights \[1\] /flightDetails \[1\] /flightInformation/productDetail/ **equipmentType**

747

**103**

/flightIndex \[2\] /groupOfFlights \[1\] /flightDetails \[1\] /flightInformation/addProductDetail/ **electronicTicketing**

N

**104**

/flightIndex \[2\] /groupOfFlights \[1\] /flightDetails \[2\] /flightInformation/productDateTime/ **dateOfDeparture**

220302

**105**

/flightIndex \[2\] /groupOfFlights \[1\] /flightDetails \[2\] /flightInformation/productDateTime/ **timeOfDeparture**

0840

**106**

/flightIndex \[2\] /groupOfFlights \[1\] /flightDetails \[2\] /flightInformation/productDateTime/ **dateOfArrival**

220302

**107**

/flightIndex \[2\] /groupOfFlights \[1\] /flightDetails \[2\] /flightInformation/productDateTime/ **timeOfArrival**

1140

**108**

/flightIndex \[2\] /groupOfFlights \[1\] /flightDetails \[2\] /flightInformation/location \[1\] / **locationId**

LGW

**109**

/flightIndex \[2\] /groupOfFlights \[1\] /flightDetails \[2\] /flightInformation/location \[2\] / **locationId**

NCE

**110**

/flightIndex \[2\] /groupOfFlights \[1\] /flightDetails \[2\] /flightInformation/companyId/ **marketingCarrier**

BA

**111**

/flightIndex \[2\] /groupOfFlights \[1\] /flightDetails \[2\] /flightInformation/companyId/ **operatingCarrier**

BA

**112**

/flightIndex \[2\] /groupOfFlights \[1\] /flightDetails \[2\] /flightInformation/ **flightNumber**

2362

**113**

/flightIndex \[2\] /groupOfFlights \[1\] /flightDetails \[2\] /flightInformation/productDetail/ **equipmentType**

737

**114**

/flightIndex \[2\] /groupOfFlights \[1\] /flightDetails \[2\] /flightInformation/addProductDetail/ **electronicTicketing**

N

**115**

/flightIndex \[2\] /groupOfFlights \[2\] /propFlightGrDetail/flightProposal \[1\] / **ref**

2

**116**

/flightIndex \[2\] /groupOfFlights \[2\] /propFlightGrDetail/flightProposal \[2\] / **ref**

1220

**117**

/flightIndex \[2\] /groupOfFlights \[2\] /propFlightGrDetail/flightProposal \[2\] / **unitQualifier**

EFT

**118**

/flightIndex \[1\] /groupOfFlights \[1\] /propFlightGrDetail/flightProposal \[3\] / **ref**

CO

**119**

/flightIndex \[1\] /groupOfFlights \[1\] /propFlightGrDetail/flightProposal \[3\] / **unitQualifier**

MCX

**120**

/flightIndex \[2\] /groupOfFlights \[2\] /flightDetails \[1\] /flightInformation/productDateTime/ **dateOfDeparture**

210302

**121**

/flightIndex \[2\] /groupOfFlights \[2\] /flightDetails \[1\] /flightInformation/productDateTime/ **timeOfDeparture**

1840

**122**

/flightIndex \[2\] /groupOfFlights \[2\] /flightDetails \[1\] /flightInformation/productDateTime/ **dateOfArrival**

220302

**123**

/flightIndex \[2\] /groupOfFlights \[2\] /flightDetails \[1\] /flightInformation/productDateTime/ **timeOfArrival**

1055

**124**

/flightIndex \[2\] /groupOfFlights \[2\] /flightDetails \[1\] /flightInformation/productDateTime/ **dateVariation**

1

**125**

/flightIndex \[2\] /groupOfFlights \[2\] /flightDetails \[1\] /flightInformation/location \[1\] / **locationId**

IAH

**126**

/flightIndex \[2\] /groupOfFlights \[2\] /flightDetails \[1\] /flightInformation/location \[2\] / **locationId**

CDG

**127**

/flightIndex \[2\] /groupOfFlights \[2\] /flightDetails \[1\] /flightInformation/companyId/ **marketingCarrier**

CO

**128**

/flightIndex \[2\] /groupOfFlights \[2\] /flightDetails \[1\] /flightInformation/companyId/ **operatingCarrier**

CO

**129**

/flightIndex \[2\] /groupOfFlights \[2\] /flightDetails \[1\] /flightInformation/ **flightNumber**

10

**130**

/flightIndex \[2\] /groupOfFlights \[2\] /flightDetails \[1\] /flightInformation/productDetail/ **equipmentType**

777

**131**

/flightIndex \[2\] /groupOfFlights \[2\] /flightDetails \[1\] /flightInformation/addProductDetail/ **electronicTicketing**

Y

**132**

/flightIndex \[2\] /groupOfFlights \[2\] /flightDetails \[2\] /flightInformation/productDateTime/ **dateOfDeparture**

220302

**133**

/flightIndex \[2\] /groupOfFlights \[2\] /flightDetails \[2\] /flightInformation/productDateTime/ **timeOfDeparture**

1235

**134**

/flightIndex \[2\] /groupOfFlights \[2\] /flightDetails \[2\] /flightInformation/productDateTime/ **dateOfArrival**

220302

**135**

/flightIndex \[2\] /groupOfFlights \[2\] /flightDetails \[2\] /flightInformation/productDateTime/ **timeOfArrival**

1400

**136**

/flightIndex \[2\] /groupOfFlights \[2\] /flightDetails \[2\] /flightInformation/location \[1\] / **locationId**

CDG

**137**

/flightIndex \[2\] /groupOfFlights \[2\] /flightDetails \[2\] /flightInformation/location \[2\] / **locationId**

NCE

**138**

/flightIndex \[2\] /groupOfFlights \[2\] /flightDetails \[2\] /flightInformation/companyId/ **marketingCarrier**

AF

**139**

/flightIndex \[2\] /groupOfFlights \[2\] /flightDetails \[2\] /flightInformation/companyId/ **operatingCarrier**

AF

**140**

/flightIndex \[2\] /groupOfFlights \[2\] /flightDetails \[2\] /flightInformation/ **flightNumber**

7664

**141**

/flightIndex \[2\] /groupOfFlights \[2\] /flightDetails \[2\] /flightInformation/productDetail/ **equipmentType**

320

**142**

/flightIndex \[2\] /groupOfFlights \[2\] /flightDetails \[2\] /flightInformation/addProductDetail/ **electronicTicketing**

Y

**143**

/flightIndex \[2\] /groupOfFlights \[3\] /propFlightGrDetail/flightProposal \[1\] / **ref**

3

**144**

/flightIndex \[2\] /groupOfFlights \[3\] /propFlightGrDetail/flightProposal \[2\] / **ref**

1220

**145**

/flightIndex \[2\] /groupOfFlights \[3\] /propFlightGrDetail/flightProposal \[2\] / **unitQualifier**

EFT

**146**

/flightIndex \[1\] /groupOfFlights \[1\] /propFlightGrDetail/flightProposal \[3\] / **ref**

CO

**147**

/flightIndex \[1\] /groupOfFlights \[1\] /propFlightGrDetail/flightProposal \[3\] / **unitQualifier**

MCX

**148**

/flightIndex \[2\] /groupOfFlights \[3\] /flightDetails \[1\] /flightInformation/productDateTime/ **dateOfDeparture**

210302

**149**

/flightIndex \[2\] /groupOfFlights \[3\] /flightDetails \[1\] /flightInformation/productDateTime/ **timeOfDeparture**

1840

**150**

/flightIndex \[2\] /groupOfFlights \[3\] /flightDetails \[1\] /flightInformation/productDateTime/ **dateOfArrival**

220302

**151**

/flightIndex \[2\] /groupOfFlights \[3\] /flightDetails \[1\] /flightInformation/productDateTime/ **timeOfArrival**

1055

**152**

/flightIndex \[2\] /groupOfFlights \[3\] /flightDetails \[1\] /flightInformation/productDateTime/ **dateVariation**

1

**153**

/flightIndex \[2\] /groupOfFlights \[3\] /flightDetails \[1\] /flightInformation/location \[1\] / **locationId**

IAH

**154**

/flightIndex \[2\] /groupOfFlights \[3\] /flightDetails \[1\] /flightInformation/location \[2\] / **locationId**

CDG

**155**

/flightIndex \[2\] /groupOfFlights \[3\] /flightDetails \[1\] /flightInformation/companyId/ **marketingCarrier**

AF

**156**

/flightIndex \[2\] /groupOfFlights \[3\] /flightDetails \[1\] /flightInformation/companyId/ **operatingCarrier**

CO

**157**

/flightIndex \[2\] /groupOfFlights \[3\] /flightDetails \[1\] /flightInformation/ **flightNumber**

35

**158**

/flightIndex \[2\] /groupOfFlights \[3\] /flightDetails \[1\] /flightInformation/productDetail/ **equipmentType**

777

**159**

/flightIndex \[2\] /groupOfFlights \[3\] /flightDetails \[1\] /flightInformation/addProductDetail/ **electronicTicketing**

Y

**160**

/flightIndex \[2\] /groupOfFlights \[3\] /flightDetails \[2\] /flightInformation/productDateTime/ **dateOfDeparture**

220302

**161**

/flightIndex \[2\] /groupOfFlights \[3\] /flightDetails \[2\] /flightInformation/productDateTime/ **timeOfDeparture**

1235

**162**

/flightIndex \[2\] /groupOfFlights \[3\] /flightDetails \[2\] /flightInformation/productDateTime/ **dateOfArrival**

220302

**163**

/flightIndex \[2\] /groupOfFlights \[3\] /flightDetails \[2\] /flightInformation/productDateTime/ **timeOfArrival**

1400

**164**

/flightIndex \[2\] /groupOfFlights \[3\] /flightDetails \[2\] /flightInformation/location \[1\] / **locationId**

CDG

**165**

/flightIndex \[2\] /groupOfFlights \[3\] /flightDetails \[2\] /flightInformation/location \[2\] / **locationId**

NCE

**166**

/flightIndex \[2\] /groupOfFlights \[3\] /flightDetails \[2\] /flightInformation/companyId/ **marketingCarrier**

AF

**167**

/flightIndex \[2\] /groupOfFlights \[3\] /flightDetails \[2\] /flightInformation/companyId/ **operatingCarrier**

AF

**168**

/flightIndex \[2\] /groupOfFlights \[3\] /flightDetails \[2\] /flightInformation/ **flightNumber**

7664

**169**

/flightIndex \[2\] /groupOfFlights \[3\] /flightDetails \[2\] /flightInformation/productDetail/ **equipmentType**

320

**170**

/flightIndex \[2\] /groupOfFlights \[3\] /flightDetails \[2\] /flightInformation/addProductDetail/ **electronicTicketing**

Y

**171**

/flightIndex \[2\] /groupOfFlights \[4\] /propFlightGrDetail/flightProposal \[1\] / **ref**

4

**172**

/flightIndex \[2\] /groupOfFlights \[4\] /propFlightGrDetail/flightProposal \[2\] / **ref**

1225

**173**

/flightIndex \[2\] /groupOfFlights \[4\] /propFlightGrDetail/flightProposal \[2\] / **unitQualifier**

EFT

**174**

/flightIndex \[1\] /groupOfFlights \[1\] /propFlightGrDetail/flightProposal \[3\] / **ref**

CO

**175**

/flightIndex \[1\] /groupOfFlights \[1\] /propFlightGrDetail/flightProposal \[3\] / **unitQualifier**

MCX

**176**

/flightIndex \[2\] /groupOfFlights \[4\] /flightDetails \[1\] /flightInformation/productDateTime/ **dateOfDeparture**

210302

**177**

/flightIndex \[2\] /groupOfFlights \[4\] /flightDetails \[1\] /flightInformation/productDateTime/ **timeOfDeparture**

1850

**178**

/flightIndex \[2\] /groupOfFlights \[4\] /flightDetails \[1\] /flightInformation/productDateTime/ **dateOfArrival**

220302

**179**

/flightIndex \[2\] /groupOfFlights \[4\] /flightDetails \[1\] /flightInformation/productDateTime/ **timeOfArrival**

0955

**180**

/flightIndex \[2\] /groupOfFlights \[4\] /flightDetails \[1\] /flightInformation/productDateTime/ **dateVariation**

1

**181**

/flightIndex \[2\] /groupOfFlights \[4\] /flightDetails \[1\] /flightInformation/location \[1\] / **locationId**

IAH

**182**

/flightIndex \[2\] /groupOfFlights \[4\] /flightDetails \[1\] /flightInformation/location \[2\] / **locationId**

LGW

**183**

/flightIndex \[2\] /groupOfFlights \[4\] /flightDetails \[1\] /flightInformation/companyId/ **marketingCarrier**

CO

**184**

/flightIndex \[2\] /groupOfFlights \[4\] /flightDetails \[1\] /flightInformation/companyId/ **operatingCarrier**

CO

**185**

/flightIndex \[2\] /groupOfFlights \[4\] /flightDetails \[1\] /flightInformation/ **flightNumber**

4

**186**

/flightIndex \[2\] /groupOfFlights \[4\] /flightDetails \[1\] /flightInformation/productDetail/ **equipmentType**

777

**187**

/flightIndex \[2\] /groupOfFlights \[4\] /flightDetails \[1\] /flightInformation/addProductDetail/ **electronicTicketing**

Y

**188**

/flightIndex \[2\] /groupOfFlights \[4\] /flightDetails \[2\] /flightInformation/productDateTime/ **dateOfDeparture**

220302

**189**

/flightIndex \[2\] /groupOfFlights \[4\] /flightDetails \[2\] /flightInformation/productDateTime/ **timeOfDeparture**

1115

**190**

/flightIndex \[2\] /groupOfFlights \[4\] /flightDetails \[2\] /flightInformation/productDateTime/ **dateOfArrival**

220302

**191**

/flightIndex \[2\] /groupOfFlights \[4\] /flightDetails \[2\] /flightInformation/productDateTime/ **timeOfArrival**

1415

**192**

/flightIndex \[2\] /groupOfFlights \[4\] /flightDetails \[2\] /flightInformation/location \[1\] / **locationId**

LGW

**193**

/flightIndex \[2\] /groupOfFlights \[4\] /flightDetails \[2\] /flightInformation/location \[2\] / **locationId**

NCE

**194**

/flightIndex \[2\] /groupOfFlights \[4\] /flightDetails \[2\] /flightInformation/companyId/ **marketingCarrier**

BA

**195**

/flightIndex \[2\] /groupOfFlights \[4\] /flightDetails \[2\] /flightInformation/companyId/ **operatingCarrier**

BA

**196**

/flightIndex \[2\] /groupOfFlights \[4\] /flightDetails \[2\] /flightInformation/ **flightNumber**

2368

**197**

/flightIndex \[2\] /groupOfFlights \[4\] /flightDetails \[2\] /flightInformation/productDetail/ **equipmentType**

AR1

**198**

/flightIndex \[2\] /groupOfFlights \[4\] /flightDetails \[2\] /flightInformation/addProductDetail/ **electronicTicketing**

N

**RECOMMENDATIONS**

**1st SET OF RECOMMENDATIONS BASED ON 1 FARE**

**199**

/recommendation \[1\] /itemNumber/itemNumberId/ **number**

1

**APPLICABLE FARE AMOUNT**

**200**

/recommendation \[1\] /recPriceInfo/monetaryDetail \[1\] / **amount**

1800.11

**201**

/recommendation \[1\] /recPriceInfo/monetaryDetail \[2\] / **amount**

150.00

**1st APPLICABLE JOURNEY - RECOMMENDATION # 1**

**202**

/recommendation \[1\] /segmentFlightRef \[1\] /referencingDetail \[1\] / **refQualifier**

S

**203**

/recommendation \[1\] /segmentFlightRef \[1\] /referencingDetail \[1\] / **refNumber**

1

**204**

/recommendation \[1\] /segmentFlightRef \[1\] /referencingDetail \[2\] / **refQualifier**

S

**205**

/recommendation \[1\] /segmentFlightRef \[1\] /referencingDetail \[2\] / **refNumber**

1

**2nd APPLICABLE JOURNEY - RECOMMENDATION # 2**

**206**

/recommendation \[1\] /segmentFlightRef \[2\] /referencingDetail \[1\] / **refQualifier**

S

**207**

/recommendation \[1\] /segmentFlightRef \[2\] /referencingDetail \[1\] / **refNumber**

2

**208**

/recommendation \[1\] /segmentFlightRef \[2\] /referencingDetail \[2\] / **refQualifier**

S

**209**

/recommendation \[1\] /segmentFlightRef \[2\] /referencingDetail \[2\] / **refNumber**

3

**APPLICABLE FARE DETAILS**

**210**

/recommendation \[1\] /paxFareProduct \[3\] /paxFareDetail/ **paxFareNum**

1

**211**

/recommendation \[1\] /paxFareProduct \[3\] /paxFareDetail/ **totalFareAmount**

1100.00

**212**

/recommendation \[1\] /paxFareProduct \[3\] /paxFareDetail/ **totalTaxAmount**

60.00

**213**

/recommendation \[1\] /paxFareProduct \[3\] /paxReference/ **ptc**

ADT

**214**

/recommendation \[1\] /paxFareProduct \[3\] /paxReference/traveller \[1\] / **ref**

1

**215**

/recommendation \[1\] /paxFareProduct \[3\] /paxReference/traveller \[2\] / **ref**

2

**216**

/recommendation \[1\] /paxFareProduct \[3\] /fareDetails \[1\] /segmentRef/ **segRef**

1

**217**

/recommendation \[1\] /paxFareProduct \[3\] /fareDetails \[1\] /groupOfFares/productInformation/cabinProduct/ **rbd**

M

**218**

/recommendation \[1\] /paxFareProduct \[3\] /fareDetails \[1\] /groupOfFares/productInformation/cabinProduct/ **cabin**

M

**218-2**

/recommendation \[1\] /paxFareProduct \[3\] /fareDetails \[1\] /groupOfFares/productInformation/cabinProduct/ **avlStatus** 

4

**219**

/recommendation \[1\] /paxFareProduct \[3\] /fareDetails \[1\] /groupOfFares/productInformation/fareProductDetail/ **fareBasis**

MLXPX

**220**

/recommendation \[1\] /paxFareProduct \[3\] /fareDetails \[1\] /groupOfFares/productInformation/fareProductDetail/ **passengerType**

ADT

**221**

/recommendation \[1\] /paxFareProduct \[3\] /fareDetails \[1\] /groupOfFares/productInformation/fareProductDetail/ **fareType**

RP

**222**

/recommendation \[1\] /paxFareProduct \[3\] /fareDetails \[1\] /groupOfFares/productInformation/ **Breakpoint**

N

**223**

/recommendation \[1\] /paxFareProduct \[3\] /fareDetails \[2\] /segmentRef/ **segRef**

2

**224**

/recommendation \[1\] /paxFareProduct \[3\] /fareDetails \[2\] /productInformation/avlProductDetails/ **rbd**

M

**225**

/recommendation \[1\] /paxFareProduct \[3\] /fareDetails \[1\] /groupOfFares/productInformation/cabinProduct/ **cabin**

M

**226**

/recommendation \[1\] /paxFareProduct \[3\] /fareDetails \[1\] /groupOfFares/productInformation/cabinProduct/ **avlStatus**

4

**227**

/recommendation \[1\] /paxFareProduct \[3\] /fareDetails \[2\] /productInformation/fareProductDetail/ **fareBasis**

MLXPX

**228**

/recommendation \[1\] /paxFareProduct \[3\] /fareDetails \[2\] /productInformation/fareProductDetail/ **passengerType**

ADT

**229**

/recommendation \[1\] /paxFareProduct \[3\] /fareDetails \[2\] /productInformation/fareProductDetail/ **fareType**

RP

**230**

/recommendation \[1\] /paxFareProduct \[3\] /fareDetails \[2\] /groupOfFares/productInformation/ **Breakpoint**

Y

**231**

/recommendation \[1\] /paxFareProduct \[4\] /paxFareDetail/ **paxFareNum**

1

**232**

/recommendation \[1\] /paxFareProduct \[4\] /paxFareDetail/ **totalFareAmount**

700.11

**233**

/recommendation \[1\] /paxFareProduct \[4\] /paxFareDetail/ **totalTaxAmount**

30.00

**234**

/recommendation \[1\] /paxFareProduct \[4\] /paxReference/ **ptc**

CH

**235**

/recommendation \[1\] /paxFareProduct \[4\] /paxReference/traveller/ **ref**

3

**236**

/recommendation \[1\] /paxFareProduct \[4\] /fare/pricingMessage/freeTextQualification/ **messageQualifier**

APM

  

/recommendation \[1\] /paxFareProduct \[4\] /fare/pricingMessage/freeTextQualification/ **messageCode**

5

**237**

/recommendation \[1\]/paxFareProduct \[4\] /fare/pricingMessage/ **description** \[1\]

NOT FARED AT PASSENGER TYPE REQUESTED

**238**

/recommendation \[1\] /paxFareProduct \[4\] /fare/pricingMessage/ description \[2\]

5

**239**

/recommendation \[1\] /paxFareProduct \[4\] /fareDetails \[1\] /segmentRef/ **segRef**

1

**240**

/recommendation \[1\] /paxFareProduct \[4\] /fareDetails \[1\] /productInformation/avlProductDetails/ **rbd**

M

**241**

/recommendation \[1\] /paxFareProduct \[4\] /fareDetails \[1\] /groupOfFares/productInformation/cabinProduct/ **cabin**

M

**242**

/recommendation \[1\] /paxFareProduct \[4\] /fareDetails \[1\] /groupOfFares/productInformation/cabinProduct/ **avlStatus**

4

**243**

/recommendation \[1\] /paxFareProduct \[4\] /fareDetails \[1\] /productInformation/fareProductDetail/ **fareBasis**

Y4WCH

**244**

/recommendation \[1\] /paxFareProduct \[4\] /fareDetails \[1\] /productInformation/fareProductDetail/ **passengerType**

CH

**245**

/recommendation \[1\] /paxFareProduct \[4\] /fareDetails \[1\] /productInformation/fareProductDetail/ **fareType**

RP

**246**

/recommendation \[1\] /paxFareProduct \[4\] /fareDetails \[1\] /groupOfFares/productInformation/ **Breakpoint**

N

**247**

/recommendation \[1\] /paxFareProduct \[4\] /fareDetails \[2\] /segmentRef/ **segRef**

2

**248**

/recommendation \[1\] /paxFareProduct \[4\] /fareDetails \[2\] /productInformation/avlProductDetails/ **rbd**

M

**249**

/recommendation \[1\] /paxFareProduct \[4\] /fareDetails \[2\] /groupOfFares/productInformation/cabinProduct/ **cabin**

M

**250**

/recommendation \[1\] /paxFareProduct \[4\] /fareDetails \[2\] /groupOfFares/productInformation/cabinProduct/ **avlStatus**

4

**251**

/recommendation \[1\] /paxFareProduct \[4\] /fareDetails \[2\] /productInformation/fareProductDetail/ **fareBasis**

Y4W

**252**

/recommendation \[1\] /paxFareProduct \[4\] /fareDetails \[2\] /productInformation/fareProductDetail/ **passengerType**

ADT

**253**

/recommendation \[1\] /paxFareProduct \[4\] /fareDetails \[2\] /productInformation/fareProductDetail/ **fareType**

RP

**254**

/recommendation \[1\] /paxFareProduct \[4\] /fareDetails \[2\] /groupOfFares/productInformation/ **Breakpoint**

Y

**2nd SET OF RECOMMENDATIONS BASED ON 1 FARE**

**249**

/recommendation \[2\] /itemNumber/itemNumberId/ **number**

2

**APPLICABLE FARE AMOUNT**

**250**

/recommendation \[2\] /recPriceInfo/monetaryDetail \[1\] / **amount**

1989.70

**251**

/recommendation \[2\] /recPriceInfo/monetaryDetail \[2\] / **amount**

200.00

**1st APPLICABLE JOURNEY - RECOMMENDATION # 3**

**252**

/recommendation \[2\] /segmentFlightRef \[1\] /referencingDetail \[1\] / **refQualifie**

S

**253**

/recommendation \[2\] /segmentFlightRef \[1\] /referencingDetail \[1\] / **refNumber**

1

**254**

/recommendation \[2\] /segmentFlightRef \[1\] /referencingDetail \[2\] / **refQualifier**

S

**255**

/recommendation \[2\] /segmentFlightRef \[1\] /referencingDetail \[2\] / **refNumber**

3

**2nd APPLICABLE JOURNEY - RECOMMENDATION # 4**

**256**

/recommendation \[2\] /segmentFlightRef \[2\] /referencingDetail \[1\] / **refQualifier**

S

**257**

/recommendation \[2\] /segmentFlightRef \[2\] /referencingDetail \[1\] / **refNumber**

1

**258**

/recommendation \[2\] /segmentFlightRef \[2\] /referencingDetail \[2\] / **refQualifier**

S

**259**

/recommendation \[2\] /segmentFlightRef \[2\] /referencingDetail \[2\] / **refNumber**

4

**APPLICABLE FARE DETAILS**

**260**

/recommendation \[2\] /paxFareProduct \[3\] /paxFareDetail/ **paxFareNum**

1

**261**

/recommendation \[2\] /paxFareProduct \[3\] /paxFareDetail/ **totalFareAmount**

1209.70

**262**

/recommendation \[2\] /paxFareProduct \[3\] /paxFareDetail/ **totalTaxAmount**

70.00

**263**

/recommendation \[2\] /paxFareProduct \[3\] /paxReference/ **ptc**

ADT

**264**

/recommendation \[2\] /paxFareProduct \[3\] /paxReference/traveller \[1\] / **ref**

1

**265**

/recommendation \[2\] /paxFareProduct \[3\] /paxReference/traveller \[2\] / **ref**

2

**266**

/recommendation \[2\] /paxFareProduct \[3\] /fareDetails \[1\] /segmentRef/ **segRef**

1

**267**

/recommendation \[2\] /paxFareProduct \[3\] /fareDetails \[1\] /productInformation/avlProductDetails/ **rbd**

M

**268**

/recommendation \[2\] /paxFareProduct \[3\] /fareDetails \[1\] /productInformation/fareProductDetail/ **fareBasis**

TLXAPT3

**269**

/recommendation \[2\] /paxFareProduct \[3\] /fareDetails \[1\] /productInformation/fareProductDetail/ **passengerType**

ADT

**270**

/recommendation \[2\] /paxFareProduct \[3\] /fareDetails \[1\] /productInformation/fareProductDetail/ **fareType**

RP

**271**

/recommendation \[2\] /paxFareProduct \[3\] /fareDetails \[2\] /segmentRef/ **segRef**

2

**272**

/recommendation \[2\] /paxFareProduct \[3\] /fareDetails \[2\] /productInformation/avlProductDetails/ **rbd**

M

**273**

/recommendation \[2\] /paxFareProduct \[3\] /fareDetails \[2\] /productInformation/fareProductDetail/ **fareBasis**

TLXAPT3

**274**

/recommendation \[2\] /paxFareProduct \[3\] /fareDetails \[2\] /productInformation/fareProductDetail/ **passengerType**

ADT

**275**

/recommendation \[2\] /paxFareProduct \[3\] /fareDetails \[2\] /productInformation/fareProductDetail/ **fareType**

RP

**276**

/recommendation \[2\] /paxFareProduct \[4\] /paxFareDetail/ **paxFareNum**

1

**277**

/recommendation \[2\] /paxFareProduct \[4\] /paxFareDetail/ **totalFareAmount**

780.00

**278**

/recommendation \[2\] /paxFareProduct \[4\] /paxFareDetail/ **totalTaxAmount**

60.00

**279**

/recommendation \[2\] /paxFareProduct \[4\] /paxReference/ **ptc**

CH

**280**

/recommendation \[2\] /paxFareProduct \[4\] /paxReference/traveller/ **ref**

3

**281**

/recommendation \[2\] /paxFareProduct \[4\] /fareDetails \[1\] /segmentRef/ **segRef**

1

**282**

/recommendation \[2\] /paxFareProduct \[4\] /fareDetails \[1\] /productInformation/avlProductDetails/ **rbd**

M

**283**

/recommendation \[2\] /paxFareProduct \[4\] /fareDetails \[1\] /productInformation/fareProductDetail/ **fareBasis**

TLXAPTCH

**284**

/recommendation \[2\] /paxFareProduct \[4\] /fareDetails \[1\] /productInformation/fareProductDetail/ **passengerType**

CH

**285**

/recommendation \[2\] /paxFareProduct \[4\] /fareDetails \[1\] /productInformation/fareProductDetail/ **fareType**

RP

**286**

/recommendation \[2\] /paxFareProduct \[4\] /fareDetails \[2\] /segmentRef/ **segRef**

2

**287**

/recommendation \[2\] /paxFareProduct \[4\] /fareDetails \[2\] /productInformation/avlProductDetails/ **rbd**

M

**288**

/recommendation \[2\] /paxFareProduct \[4\] /fareDetails \[2\] /productInformation/fareProductDetail/ **fareBasis**

TLXAPTCH

**289**

/recommendation \[2\] /paxFareProduct \[4\] /fareDetails \[2\] /productInformation/fareProductDetail/ **passengerType**

CH

**290**

/recommendation \[2\] /paxFareProduct \[4\] /fareDetails \[2\] /productInformation/fareProductDetail/ **fareType**

RP

**3rd SET OF RECOMMENDATIONS BASED ON 1 FARE**

**291**

/recommendation \[3\] /itemNumber/itemNumberId/ **number**

3

**APPLICABLE FARE AMOUNT**

**292**

/recommendation \[3\] /recPriceInfo/monetaryDetail \[1\] / **amount**

2350.50

**293**

/recommendation \[3\] /recPriceInfo/monetaryDetail \[2\] / **amount**

200.00

**1st ASSOCIATED JOURNEY - RECOMMENDATION # 5**

**294**

/recommendation \[3\] /segmentFlightRef \[1\] /referencingDetail \[1\] / **refQualifier**

S

**295**

/recommendation \[3\] /segmentFlightRef \[1\] /referencingDetail \[1\] / **refNumber**

2

**296**

/recommendation \[3\] /segmentFlightRef \[1\] /referencingDetail \[2\] / **refQualifier**

S

**297**

/recommendation \[3\] /segmentFlightRef \[1\] /referencingDetail \[2\] / **refNumber**

1

**APPLICABLE FARE DETAILS**

**298**

/recommendation \[3\] /paxFareProduct \[7\] /paxFareDetail/ **paxFareNum**

1

**299**

/recommendation \[3\] /paxFareProduct \[7\] /paxFareDetail/ **totalFareAmount**

1350.00

**300**

/recommendation \[3\] /paxFareProduct \[7\] /paxFareDetail/ **totalTaxAmount**

70.00

**301**

/recommendation \[3\] /paxFareProduct \[7\] /paxReference/ **ptc**

ADT

**302**

/recommendation \[3\] /paxFareProduct \[7\] /paxReference/traveller \[1\] / **ref**

1

**303**

/recommendation \[3\] /paxFareProduct \[7\] /paxReference/traveller \[2\] / **ref**

2

**304**

/recommendation \[3\] /paxFareProduct \[7\] /fareDetails \[1\] /segmentRef/ **segRef**

1

**305**

/recommendation \[3\] /paxFareProduct \[7\] /fareDetails \[1\] /productInformation/avlProductDetails/ **rbd**

C

**306**

/recommendation \[3\] /paxFareProduct \[7\] /fareDetails \[1\] /productInformation/fareProductDetail/ **fareType**

RP

**307**

/recommendation \[3\] /paxFareProduct \[7\] /fareDetails \[2\] /segmentRef/ **segRef**

2

**308**

/recommendation \[3\] /paxFareProduct \[7\] /fareDetails \[2\] /productInformation/avlProductDetails/ **rbd**

D

**309**

/recommendation \[3\] /paxFareProduct \[7\] /fareDetails \[2\] /productInformation/fareProductDetail/ **fareType**

RP

**310**

/recommendation \[3\] /paxFareProduct \[8\] /paxFareDetail/ **paxFareNum**

1

**311**

/recommendation \[3\] /paxFareProduct \[8\] /paxFareDetail/ **totalFareAmount**

1000.50

**312**

/recommendation \[3\] /paxFareProduct \[8\] /paxFareDetail/ **totalTaxAmount**

60.00

**313**

/recommendation \[3\] /paxFareProduct \[8\] /paxReference/ **ptc**

CH

**314**

/recommendation \[3\] /paxFareProduct \[8\] /paxReference/traveller/ **ref**

3

**315**

/recommendation \[3\] /paxFareProduct \[8\] /fareDetails \[1\] /segmentRef/ **segRef**

1

**316**

/recommendation \[3\] /paxFareProduct \[8\] /fareDetails \[1\] /productInformation/avlProductDetails/ **rbd**

C

**317**

/recommendation \[3\] /paxFareProduct \[8\] /fareDetails \[1\] /productInformation/fareProductDetail/ **fareType**

RP

**318**

/recommendation \[3\] /paxFareProduct \[8\] /fareDetails \[2\] /segmentRef/ **segRef**

2

**319**

/recommendation \[3\] /paxFareProduct \[8\] /fareDetails \[2\] /productInformation/avlProductDetails/ **rbd**

D

**320**

/recommendation \[3\] /paxFareProduct \[8\] /fareDetails \[2\] /productInformation/fareProductDetail/ **fareType**

RP

### Free Baggage Allowance (FBA)

The FBA information describes the free baggage allowed per flight and per passenger type for each recommendation. It includes the policy (weight or pieces) and units (kilos or pounds).

In case of multiple passenger types, the FBA is only calculated for the adult passenger type. For example, if we have an adult, a child and an infant, the FBA returned is the FBA of the adult. In case no adult passenger type is requested, the FBA returned is the FBA of the first passenger type.

The functionality is triggered by a setting at OID level or by input option. 

### Ancillary information (OCs)

associated with section

### Fare Family Information Reply

This option allows the user to have the Airline Fare Family name, description and ancillary services attached within a recommendation. This information is returned by Fare Component or by requested segment. This is triggered by a setting at OID level and by input option FFI with value 3.

**Fare Family Information returned with ancillaries associated**

SearchReply - Data element

example

Description

/ familyInformation / refNumber  

1

Reference of the fare family

/ familyInformation / fareFamilyname

FLEXI

Short Name of the Fare Family referenced with index 1 in the Family Information node.

/ familyInformation / description

FLEXIBILITY PLUS

Fare Family descriptive name for the same fare family being indexed in the Family Information node

/ familyInformation / carrier

TK

Carrier Code of the referenced fare family under Family Information node

/ familyInformation / services / reference

1

Ancillary Service index

/ familyInformation / services / status

INC

Applicability status of the indexed ancillary service - whether its INCluded, Not OFfered, CHArgeable

**Fare Family association with the recommendations**

SearchReply - Data element

example

Description

/ recommendation / fareFamilyRef / referencingDetail / refQualifier  

F

Reference identifier to indicate that we are going to refer a fare family, F stands as an indication to Fare Family. When nothing is specified it is the indicator that the following reference number indicates the fare family reference of the inbound segment  

/ recommendation / fareFamilyRef / referencingDetail / refNumber

1

The index of the fare family defined under the node / familyInformation / refNumber

**Ancillaries (OCs) descriptive definition**

SearchReply - Data element

example

Description

/ serviceFeesGrp / serviceTypeInfo / carrierFeeDetails / type

OC

When this node bears the value OC it indicates the service description for ancillaries (OCs) 

/ serviceFeesGrp / serviceDetailsGrp / serviceOptionInfo / dataTypeInformation / subType

BAG / 09Q / 050 etc

ATPCO Sub Code of the Ancillary being defined 

/ serviceFeesGrp / serviceDetailsGrp / feeDescriptionGrp / itemNumberInfo / itemNumberDetails / number  

1

Index of the ancillary referenced in / familyInformation / services / reference node

/ serviceFeesGrp / serviceDetailsGrp / feeDescriptionGrp / itemNumberInfo / itemNumberDetails / type  

SD

Ancillary service type

/ serviceFeesGrp / serviceDetailsGrp / feeDescriptionGrp / serviceAttributesInfo / attributeDetails / attributeType  

SSR / RFIC / BKM

Ancillary Service Attribute Type. Eg: RFIC (Reason For Issuance Code)

/ serviceFeesGrp / serviceDetailsGrp / feeDescriptionGrp / serviceAttributesInfo / attributeDetails / attributeDescription

RFIC / C / 01

Ancillary Service Attribute Description.

/ serviceFeesGrp / serviceDetailsGrp / feeDescriptionGrp / serviceDescriptionInfo /serviceRequirementsInfo / serviceClassification

C / Z

RFIC (Reason For Issuance Code) from ATPCO Optional Service Industry Sub Codes

/ serviceFeesGrp / serviceDetailsGrp / feeDescriptionGrp / serviceDescriptionInfo / serviceRequirementsInfo / serviceMarketingCarrier

TK

Marketing carrier associated to the Ancillary Service being declared

/ serviceFeesGrp / serviceDetailsGrp / feeDescriptionGrp / serviceDescriptionInfo / serviceRequirementsInfo / serviceGroup

BG / ML / BF

Ancillary Group from ATPCO Optional Service Industry Sub Codes  

/ serviceFeesGrp / serviceDetailsGrp / feeDescriptionGrp / serviceDescriptionInfo / serviceRequirementsInfo / serviceSubGroup

DI / SE / RF / VC

Ancillary Sub-Group from ATPCO Optional Service Industry Sub Codes

/ serviceFeesGrp /serviceDetailsGrp / feeDescriptionGrp / serviceDescriptionInfo / serviceRequirementsInfo / serviceFreeText

BS / CD / 4Y

Ancillary Description from ATPCO Optional Service Industry Sub Codes

/ serviceFeesGrp / serviceDetailsGrp / feeDescriptionGrp / commercialName / freeTextQualification / textSubjectQualifier

2 / 3

Ancillary Free Text Qualifier

/serviceFeesGrp / serviceDetailsGrp /feeDescriptionGrp/commercialName/freeText

1 PIECE X 8 KG CABIN BAGGAGE /  
MEAL SERVICE

Textual description of the ancillary service being defined

## 4 Error Messages

Specific error conditions exist for each mandatory and optional parameter in the query. However, as these errors may be returned in several instances and it is not always apparent to which operational parameter they apply, this section provides the following general errors that may be returned when building a query.

### Local Application Error

If a mandatory element is missing in the query structure, including any elements that are deemed mandatory via an association to another optional parameter, the entire entry is rejected.

### Incompatible Options

The function is not compatible with the following features. The rejects are as follows:

\_     Airline (Include/Exclude) - INC/EXC AIRLINE OPTION IS NOT COMPATIBLE WITH THIS PRODUCT

\_     Flight Category - FLIGHT CATEGORY OPTION IS NOT COMPATIBLE WITH THIS PRODUCT

\_     Connecting points (Include/Exclude) - CONNECTING POINT OPTION IS NOT COMPATIBLE WITH THIS PRODUCT

\_     Time of Departure / Arrival - TIME DEPARTURE OPTION IS NOT COMPATIBLE WITH THIS PRODUCT

\_     Time of Arrival - TIME ARRIVAL OPTION IS NOT COMPATIBLE WITH THIS PRODUCT

\_     Time Window - TIME WINDOW OPTION IS NOT COMPATIBLE WITH THIS PRODUCT

\_     Radius - RADIUS OPTION IS NOT COMPATIBLE WITH THIS PRODUCT

\_     Multi city if the data profile MULTI CITY is not activated for OID/MRP- MULTI CITY OPTION IS NOT COMPATIBLE WITH THIS PRODUCT

\_     Anchored Search - ANCHORED SEARCH IS NOT COMPATIBLE WITH THIS PRODUCT

\_     In flight services - IN FLIGHT SERVICES OPTION IS NOT COMPATIBLE WITH THIS PRODUCT

\_     Meal services - MEAL SERVICES OPTION IS NOT COMPATIBLE WITH THIS PRODUCT

\_     Aircraft owner - AIRCRAFT OWNER OPTION IS NOT COMPATIBLE WITH THIS PRODUCT

\_     PNR Context (Due to integration of Master Pricer Expert (MPE) into MPTB) - MULTI RECO PRICER OPTION NON-COMPATIBLE WITH PNR CONTEXT

### Common Errors

It should be noted here that these messages are returned in the instances when no recommendations can be found.

No Recommendation Found For Requested Itinerary/Options

Whenever the Lowest Fare Search does not find any recommendations matching the requested options, the query is rejected with the following message:  
"NO RECOMMENDATION FOUND FOR REQUESTED ITINERARY/OPTIONS"

No Available Flight Found For The Requested Segment Nn

In the current Lowest Fare Search process, when no flight is available (For example, all the flights matching the requested itinerary are set to 0 or closed), the transaction is rejected with the message:  
"ERC - CODE SET 9321: VALUE 977 - NO AVAILABLE FLIGHT FOUND FOR THE REQUESTED SEGMENT nn"  
(Where: nn represents the first impacted requested segment number).

These messages are returned when there is an error in the Lowest Fare Search input.

Latest Future Date Possible ddmmmyy

A reject message will be produced by the server; indicating that a query is too far into the future when it goes beyond the latest possible date. The corresponding reject message:  
"LATEST FUTURE DATE POSSIBLE ddmmmyy"

Invalid Value (Coded) - Pricingtickinfo

The only valid expanded parameter options applicable to a MP request are NAP, NPE, NR and RF. If an unknown Expanded Parameter is specified in the entry, the entire request is rejected and the following error message is returned:  
"INVALID VALUE (CODED) - PRICINGTICKINFO"

Invalid Value Coded - Pricingtickinfo

If an unknown Unifare option is specified in the entry, the entire request is rejected and the following error message is returned:  
"INVALID VALUE CODED - PRICINGTICKINFO"

Too Many Requested Segments

Up to 2 requested segments 'Lowest Fare search' requests are allowed, excluding surface sectors. If this check fails, the entire entry is rejected with the following message:  
"TOO MANY REQUESTED SEGMENTS"

Invalid Value (Coded) - Conversion Rate

If an unknown Currency is specified in the Lowest Fare search entry, the entire request is rejected and the following error message is returned:  
"INVALID VALUE (CODED) - CONVERSION RATE"

Invalid Value (Coded)

If an unauthorised value is specified in a field flagged as 'coded' at the Lowest Fare Search Input message level, the entire entry is rejected and, if no other specific error message exists, the following generic reject message is returned:  
"INVALID VALUE (CODED) - XXX"  
Where XXX is the smart name (for example, paxReference).

No Information contained in the Cache

In case the Instant Search cache is being updated, sending a query will retrieve the following error message : "DATA DOMAIN UPDATE ON GOING". The service will be available again once the data domain update is finished.

**Note**: When a field is flagged as coded, refer to the corresponding code set to check the list of values authorised.

No.

Message

118

System unable to process

304

System temporarily unavailable

830

No recommendation found with lower or equal price

910

Transaction closed

915

Fare product unavailable for user

916

EDIFACT version not supported

917

EDIFACT message size Exceeded

918

Number of Requested Segments exceeds three

919

SOTI/SITO/SOTO Requests are not handled

920

Past Date/Time not allowed

921

Date/Time must be in chronological order

922

Maximum 2 Requested Segments with same date

923

Specify Times of Arrival/Departure to avoid overlapping

924

Overlapping Date/Time ranges

925

Overlapping Origin//Destination Segment

926

Invalid number of passenger

927

Number of passenger exceeds nine

928

Exceeds maximum fare discount codes

929

Option cannot be applied at Requested Segment level

930

Option cannot be applied at itinerary level

931

No itinerary found for Requested Segment n

932

RG LFS not applicable for this request

934

Invalid radius - maximum allowed 300km

935

Invalid range of date option

936

Invalid time option

937

Invalid time window option

938

Time of Departure/Arrival is mandatory if time window requested

939

Date is mandatory with time window option

940

Invalid airline code

941

Invalid exclude airline option

942

Airline cannot be at the same time included and excluded

943

Invalid - 20 airline codes maximum

944

Invalid flight category

945

Non-stop cannot be requested with connect point option

946

Invalid connecting point

947

Same city/airport code cannot be included and excluded

948

City/airport must be in same country

950

Invalid City

952

Conflicting options used

953

Invalid Unifare option

954

Service Level option must be requested

955

Invalid passenger type code

956

Exceeds maximum fare discount codes

957

Number of non-infant PTC cannot exceed number of seats

958

Number of infants cannot exceed number of seats

960

Invalid Ticketing/Selling city

961

Invalid conversion currency

962

Invalid price to beat value

963

INVALID VALUE (CODED) - originator

964

INVALID VALUE (CODED) - numberOfUnit

965

INVALID VALUE (CODED) - paxReference

966

INVALID VALUE (CODED) - pricingTickInfo

967

INVALID VALUE (CODED) - conversionRate

968

INVALID VALUE (CODED) - corporate

969

INVALID VALUE (CODED) - priceToBeat

970

INVALID VALUE (CODED) - taxInfo

971

INVALID VALUE (CODED) - travelFlightInfo

972

INVALID VALUE (CODED) - requestedSegmentRef

973

INVALID VALUE (CODED) - departureLocalization

974

INVALID VALUE (CODED) - arrivalLocalization

975

INVALID VALUE (CODED) - timeDetails

976

INVALID VALUE (CODED) - flightInfo

977

NO AVAILABLE FLIGHT FOUND FOR REQUESTED SEGMENT NN

978

TOO MANY REQUESTED SEGMENTS

979

INVALID OPTION

980

INVALID TYPE OF ITINERARY

981

NO FARE FOUND FOR REQUESTED ITINERARY

982

SPECIFY AIRLINE

983

TOO MANY AIRLINES

984

SPECIFY A COMMERCIAL FARE FAMILY

985

INVALID COMMERCIAL FARE FAMILY

986

TOO MANY COMMERCIAL FARE FAMILY REQUESTED

987

NO FARE FAMILY FOUND FOR REQUESTED COMMERCIAL FARE FAMILY

988

EXCEEDS MAXIMUM DISCOUNT CODES FOR A PASSENGER

993

INVALID TIME AT DESTINATION

994

INVALID ITINERARY POINT OF ORIGIN OPTION

995

NO FARE FOUND FOR REQUESTED FARE FAMILY

997

Fare Basis and Prime Booking Code Cannot Be Mixed

998

Invalid Type of Fare Requested

999

Invalid Fare Family Combinability Requested

  

Invalid Generic Fare Basis requested

  

INVALID PRIME BOOKING CODE

  

TOO MANY FARE FAMILIES

  

TOO MANY MATCHING ATTRIBUTES SETS REQUESTED

  

TOO MANY ATTRIBUTE OCCURRENCES

  

INVALID FARE FAMILY NAME REQUESTED

  

INVALID CARRIER REQUESTED

836

DATE OVERRIDE OPTION NOT ALLOWED

1101

DATA DOMAIN UPDATE ON GOING

## 4.1 Error Reply

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_EnrichTravelProposalsReply xmlns="http://xml.amadeus.com/FMPXAR\_24\_6\_1A"> <errorMessage> <applicationError> <applicationErrorDetail> <error>920</error> </applicationErrorDetail> </applicationError> <errorMessageText> <freeTextQualification> <textSubjectQualifier>1</textSubjectQualifier> </freeTextQualification> <description>Past date/time not allowed</description> </errorMessageText> </errorMessage> </Fare\_EnrichTravelProposalsReply>

  

* * *

## 5 Operations

## 5.1 Operation: 01.01 - Search With Mandatory Elements

### Number of Recommendations

The user may specify the total number of recommendations to be returned. This will be ignored as we depend on the number of travel solutions provided by the user in the request which should not exceed more than 50.

If a number higher than 50 is requested or the number is not provided , the query will not be rejected, but no more than 50 base recommendations will be returned.

Syntax:  
<numberOfUnit>  
  <unitNumberDetail>  
    **<numberOfUnits>50</numberOfUnits>  
    <typeOfUnit>RC</typeOfUnit>**  
  </unitNumberDetail>  
</numberOfUnit>

Node at which recommendations requested details appear -  
Number of recommendations requested :  /Fare\_EnrichTravelProposals/numberOfUnit/unitNumberDetail\[1\]/**numberOfUnits**  
Unit to specify recommendations           :  /Fare\_EnrichTravelProposals/numberOfUnit/unitNumberDetail\[1\]/**typeOfUnit**

### Passenger Information

Number of Passenger Seats

The number of passenger seats must be between 1 and 9.  
The recommendations returned are applicable to all passengers in the query. All passengers must be travelling together.

Syntax:  
<numberOfUnit>  
  <unitNumberDetail>  
    **<numberOfUnits>2</numberOfUnits>** <!-- Non seated travelers like infant without seat should not be counted -->  
    **<typeOfUnit>PX</typeOfUnit>**  
  </unitNumberDetail>  
</numberOfUnit>

Node at which requested passenger count appear -  
Number of recommendations requested :  /Fare\_EnrichTravelProposals/numberOfUnit/unitNumberDetail\[1\]/**numberOfUnits**  
Unit to specify recommendations           :  /Fare\_EnrichTravelProposals/numberOfUnit/unitNumberDetail\[1\]/**typeOfUnit**

Associated Passenger Type Codes

As the passenger fares vary for different types of passengers, a passenger type code for any low fare search is required. Passenger type codes dictate the low fare search to provide recommendations with any qualifying passenger fare discounts applicable. All passenger type codes specified must be valid type codes stored within the Amadeus system.  
A maximum of 6 passenger type codes may be requested.  
When more than one Passenger Type is requested, the system must search for the cheapest fares with the possibility to return non-homogeneous recommendations: different passengers booked in different classes in order to offer the lowest fare.  
In such a case, it becomes mandatory to split the traveling parties into separate records to accommodate the lowest fare recommendation. This can be accomplished via the Powered PNR interface.  
When a non-homogeneous recommendation is proposed, the following warning message is returned:  
"SPLIT PNR - DIFFERENT BOOKING CODES REQUIRED FOR LOWEST FARE"  
Exception: Infant must travel in the same class as the accompanying "adult" passengers (ADT, YTH, MIL, and so on).

**Note**: When specifying a PTC 'inf' without a seat, they must be associated to a passenger accompanying a seat.

Syntax:

<paxReference>  
  **<ptc>ADT</ptc>**  
  <traveller>  
    **<ref>1</ref>**  
  </traveller>  
  </paxReference>  
  <paxReference>  
  **<ptc>INF</ptc>** <!-- Infant without seat -->  
  <traveller>  
    **<ref>1</ref>**    <!-- Seated passenger reference number to which infant will be associated, in this example the ADT -->  
    **<infantIndicator>1</infantIndicator>** <!-- Infant indicator tag -->  
  </traveller>  
</paxReference>  
<paxReference>  
  **<ptc>CH</ptc>**  
  <traveller>  
    **<ref>2</ref>**  
  </traveller>  
</paxReference>

Node at which PTC association of travelers appear -  
Passenger Type Code of the traveler          :  /Fare\_EnrichTravelProposals/paxReference\[1\]/**ptc**  
Traveler reference number                        :  /Fare\_EnrichTravelProposals/paxReference\[1\]/traveller/**ref**  
Indicator to specify if the traveler is infant  :  /Fare\_EnrichTravelProposals/paxReference\[1\]/traveller/**infantIndicator**

### Itinerary date

A valid date must be specified for each requested segment. It should be noted that the dates are specified are in local time, at each location. No past date is allowed.  
When two requested segments are specified the dates must be in chronological order or a same date else the query will be rejected.

  
Syntax:  
<itinerary>  
  <timeDetails>  
    <firstDateTimeDetail>  
       **<date>150221</date>**  
    </firstDateTimeDetail>  
  </timeDetails>  
</itinerary>

Node at which date appears - /Fare\_EnrichTravelProposals/itinerary\[1\]/timeDetails/firstDateTimeDetail/**date**

### Origin Destination

A maximum of two requested segments is allowed. These requested segments must each include an origin and a destination city/airport code.

One-Way

NCE-LON

Return trip

NCE-LON-NCE

Open jaw

NCE-LON-MAD

Itinerary including surface sector

NCE-LON/MAN-NCE

The origin and destination codes must comply with the standard IATA city/airport codes. If an IATA code is not unique to a specific airport, but identifies at the same time, a city (for example, CHI) and an airport (for example, HOU) the three-letter code represents the city unless it is specifically identified as an airport (A) type. Whenever the request intends to restrict the search only to the airport, this must be specified in the case where the IATA code is not unique to an airport.

Syntax:

<itinerary>  
  <departureLocalization>  
    <departurePoint>  
      **<locationId>IST</locationId>**  
    </departurePoint>  
  </departureLocalization>  
  <arrivalLocalization>  
    <arrivalPointDetails>  
      **<locationId>CPH</locationId>**  
    </arrivalPointDetails>  
  </arrivalLocalization>  
</itinerary>

  
Node at which origin and destination appear -   
Departure point - /Fare\_EnrichTravelProposals/itinerary\[1\]/departureLocalization/departurePoint/locationId  
Arrival point      - /Fare\_EnrichTravelProposals/itinerary\[1\]/arrivalLocalization/arrivalPointDetails/locationId  
The following table illustrates further the possible scenarios of the origin/destination search process:

Code Entered

Specified as City/Airport

Applicable point of departure/arrival searched

CHI

Not Specified

Chicago city, including the following airports:  
\- O'Hare (ORD)  
\- Midway (MDW)

CHI

City Location

Chicago city, including the following airports:  
\- O'Hare (ORD)  
\- Midway (MDW)

CHI

Airport Location

Chicago city, including the following airports:  
\- O'Hare (ORD)  
\- Midway (MDW) (because CHI airport code does not exist)

ORD

Not specified

O'Hare (ORD)

HOU

Not Specified

Houston city, including the following airports:  
\- Houston Hobby (HOU)  
\- G. Bush Intercontinental (IAH)

HOU

City location

Houston city, including the following airports:  
\- Houston Hobby (HOU)  
\- G. Bush Intercontinental (IAH)

HOU

Airport location

Houston Hobby (HOU) airport only

### Proposed segments / Travel Solutions

A valid proposed segment with all mandatory flight related information should be provided. This may comprise of one or several flights depending whether the proposed segment or travel solution was a direct one or with connections. This travel solution will be used to propose recommendations. Maximum of 50 one ways or round trips or two bound trips can be provided, higher number entered will lead to a reject.

Syntax:

<groupOfFlights>  
  <propFlightGrDetail>  
    <flightProposal>  
      <ref>1</ref>  
    </flightProposal>  
    <flightProposal>  
      <ref>0320</ref>  
      <unitQualifier>EFT</unitQualifier>  
    </flightProposal>  
  </propFlightGrDetail>  
  <flightDetails>  
    <flightInformation>  
      <productDateTime>  
        <dateOfDeparture>010222</dateOfDeparture>  
        <timeOfDeparture>1545</timeOfDeparture>  
        <dateOfArrival>010222</dateOfArrival>  
        <timeOfArrival>1705</timeOfArrival>  
      </productDateTime>  
      <location>  
        <locationId>IST</locationId>  
      </location>  
      <location>  
        <locationId>CPH</locationId>  
      </location>  
      <companyId>  
        <marketingCarrier>TK</marketingCarrier>  
      </companyId>  
      <flightOrtrainNumber>1785</flightOrtrainNumber>  
      <productDetail>  
        <equipmentType>A</equipmentType>  
      </productDetail>  
      <attributeDetails>  
        <attributeType>EFT</attributeType>  
        <attributeDescription>0320</attributeDescription>  
      </attributeDetails>  
    </flightInformation>  
    <commercialAgreement>  
      <codeshareDetails>  
        <codeShareType>L</codeShareType>  
        <airlineDesignator>TK</airlineDesignator>  
      </codeshareDetails>  
      <otherCodeshareDetails>  
        <codeShareType>O</codeShareType>  
        <airlineDesignator>TK</airlineDesignator>  
        <flightNumber>0</flightNumber>  
      </otherCodeshareDetails>  
    </commercialAgreement>  
  </flightDetails>  
</groupOfFlights>

  
Node which comprise proposed segments / travel solutions details (mandatory unless cited optional) - 

  
Proposed segment reference ID                                 - /Fare\_EnrichTravelProposals/itinerary\[1\]/groupOfFlights\[1\]/propFlightGrDetail/flightProposal\[1\]/**ref**  
Proposed segment total effective flight time (optional) - /Fare\_EnrichTravelProposals/itinerary\[1\]/groupOfFlights\[1\]/propFlightGrDetail/flightProposal\[2\]/**ref**  
Effective flight time unit of measure (always EFT)        - /Fare\_EnrichTravelProposals /itinerary\[1\]/groupOfFlights\[1\]/propFlightGrDetail/flightProposal\[2\]/**unitQualifier**  
Departure date of the flight                                        - /Fare\_EnrichTravelProposals/itinerary\[1\]/groupOfFlights\[1\]/flightDetails\[1\]/flightInformation/productDateTime/**dateOfDeparture**  
Departure time of the flight                                        - /Fare\_EnrichTravelProposals/itinerary\[1\]/groupOfFlights\[1\]/flightDetails\[1\]/flightInformation/productDateTime/**timeOfDeparture**  
Arrival date of the flight                                             - /Fare\_EnrichTravelProposals/itinerary\[1\]/groupOfFlights\[1\]/flightDetails\[1\]/flightInformation/productDateTime/**dateOfArrival**  
Arrival date of the flight                                             - /Fare\_EnrichTravelProposals/itinerary\[1\]/groupOfFlights\[1\]/flightDetails\[1\]/flightInformation/productDateTime/**timeOfArrival**  
Airport of flight's origin                                              - /Fare\_EnrichTravelProposals/itinerary\[1\]/groupOfFlights\[1\]/flightDetails\[1\]/flightInformation/location\[1\]/**locationId**  
Terminal at flight's origin (optional)                             - /Fare\_EnrichTravelProposals/itinerary\[1\]/groupOfFlights\[1\]/flightDetails\[1\]/flightInformation/location\[1\]/**terminal**  
Airport of flight's destination                                      - /Fare\_EnrichTravelProposals/itinerary\[1\]/groupOfFlights\[1\]/flightDetails\[1\]/flightInformation/location\[2\]/**locationId**  
Terminal at flight's destination (optional)                     - /Fare\_EnrichTravelProposals/itinerary\[1\]/groupOfFlights\[1\]/flightDetails\[1\]/flightInformation/location\[2\]/**terminal**  
Marketing carrier of the flight                                     - /Fare\_EnrichTravelProposals/itinerary\[1\]/groupOfFlights\[1\]/flightDetails\[1\]/flightInformation/companyId/**marketingCarrier**  
Operating carrier of the flight (optional)                      - /Fare\_EnrichTravelProposals/itinerary\[1\]/groupOfFlights\[1\]/flightDetails\[1\]/flightInformation/companyId/**operatingCarrier**  
Flight number                                                           - /Fare\_EnrichTravelProposals/itinerary\[1\]/groupOfFlights\[1\]/flightDetails\[1\]/flightInformation/**flightOrtrainNumber**  
Equipment Type                                                        - /Fare\_EnrichTravelProposals/itinerary\[1\]/groupOfFlights\[1\]/flightDetails\[1\]/flightInformation/productDetail/**equipmentType**  
Effective Flight time (optional)                                   - /Fare\_EnrichTravelProposals/itinerary\[1\]/groupOfFlights\[1\]/flightDetails\[1\]/flightInformation/attributeDetails/**attributeDescription**  
Effective Flight time unit of measure (always EFT)       - /Fare\_EnrichTravelProposals/itinerary\[1\]/groupOfFlights\[1\]/flightDetails\[1\]/flightInformation/attributeDetails/**attributeType**

Commercial agreement related details are also optional

### Request Elements

The example below illustrates a low fare search including the mandatory function elements of itinerary date, origin/destination, and number of passengers with associated types specified with the following information:

**MANDATORY ORIGIN/DESTINATION INFORMATION FOR 1 REQUESTED SEGMENT**

-   Departure city of Cairo
-   Arrival city of Bahrain

**MANDATORY ITINERARY DATE FOR 1 REQUESTED SEGMENT**

-   Trip departure 10 August 2021

**MANDATORY PASSENGER INFORMATION**

-   4 passengers travelling in total - 3 seats required
-   2 Adults, 1 Children, 1 Infant (associated to ADT passenger 1)

**NUMBER OF RECOMMENDATIONS**

-   200 requested recommendations

Requesting

Specified Data

Request by number of seats occupied by passengers

PX

\# of seats for request

3

Request specific maximum number of recommendations to be returned

RC

Maximum number of recommendations to be returned

200

Applicable passenger type code for Adult

ADT

Passenger reference for 1st seat

1

Passenger reference for 2nd seat

2

Applicable passenger type code for Infant

INF

Passenger reference associated to first Adult seat

1

Infant indicator  

1

Applicable passenger type code for Child  

CH

Passenger reference for 3rd seat

3

1st requested segment

1

Departure city of London

CAI

Arrival city of New York

BAH

Trip Date (10 August 2021)

100821  

Carrier code

EK

Indicator to signify - Majority carrier

MCX

Flight detail of **first** flight segment in the proposed segment#1

Flight's departure date at origin

100821

Flight's departure time at origin

1905

Flight's arrival date at destination

110821

Flight's departure time at origin

0040

Date variance

1

Departure airport code

CAI

Departure terminal

2

Arrival airport code

DXB

Arrival terminal

3

Flight's marketing carrier

EK

Flight's operating carrier

EK

Flight number

924

Equipment Type

388

Electronic ticketing candidate

Y

Availability detail qualifier

LCA

Flight detail of **second** flight segment in the proposed segment#1

Flight's departure date at origin

110821

Flight's departure time at origin

0200

Flight's arrival date at destination

110821

Flight's departure time at origin

0215

Departure airport code

DXB

Departure terminal

3

Arrival airport code

BAH

Arrival terminal

1

Flight's marketing carrier

EK

Flight's operating carrier

EK

Flight number

835

Equipment Type

77W

Electronic ticketing candidate

Y

Availability detail qualifier

LCA

\* Pls note that for sake of conciseness only the first proposed segment association has been signified in the table above; a similar association can be carried out for the remaining four proposed segments.

## 5.1.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_EnrichTravelProposals xmlns="http://xml.amadeus.com/FMPXAQ\_24\_6\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>2</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> <unitNumberDetail> <numberOfUnits>50</numberOfUnits> <typeOfUnit>RC</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> <traveller> <ref>2</ref> </traveller> </paxReference> <fareOptions> <pricingTickInfo> <pricingTicketing> <priceType>RU</priceType> <priceType>RP</priceType> <priceType>TAC</priceType> </pricingTicketing> </pricingTickInfo> <feeIdDescription> <feeId> <feeType>FFI</feeType> <feeIdNumber>3</feeIdNumber> </feeId> <feeId> <feeType>UPC</feeType> <feeIdNumber>6</feeIdNumber> </feeId> </feeIdDescription> </fareOptions> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>NCE</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>NYC</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>141024</date> </firstDateTimeDetail> </timeDetails> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>1</ref> </flightProposal> <flightProposal> <ref>2830</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>TK</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>141024</dateOfDeparture> <timeOfDeparture>1920</timeOfDeparture> <dateOfArrival>141024</dateOfArrival> <timeOfArrival>2320</timeOfArrival> </productDateTime> <location> <locationId>NCE</locationId> <terminal>1</terminal> </location> <location> <locationId>IST</locationId> </location> <companyId> <marketingCarrier>TK</marketingCarrier> <operatingCarrier>TK</operatingCarrier> </companyId> <flightOrtrainNumber>1816</flightOrtrainNumber> <productDetail> <equipmentType>321</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> <productDetailQualifier>AVR</productDetailQualifier> </addProductDetail> </flightInformation> </flightDetails> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>151024</dateOfDeparture> <timeOfDeparture>1405</timeOfDeparture> <dateOfArrival>151024</dateOfArrival> <timeOfArrival>1750</timeOfArrival> </productDateTime> <location> <locationId>IST</locationId> </location> <location> <locationId>JFK</locationId> <terminal>1</terminal> </location> <companyId> <marketingCarrier>TK</marketingCarrier> <operatingCarrier>TK</operatingCarrier> </companyId> <flightOrtrainNumber>1</flightOrtrainNumber> <productDetail> <equipmentType>77W</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> <productDetailQualifier>LCA</productDetailQualifier> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> </itinerary> </Fare\_EnrichTravelProposals>

## 5.1.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_EnrichTravelProposalsReply xmlns="http://xml.amadeus.com/FMPXAR\_24\_6\_1A"> <replyStatus> <status> <advisoryTypeInfo>FQX</advisoryTypeInfo> </status> </replyStatus> <conversionRate> <conversionRateDetail> <currency>USD</currency> </conversionRateDetail> </conversionRate> <familyInformation> <refNumber>1</refNumber> <fareFamilyname>PS</fareFamilyname> <description>PROMOTIONAL</description> <carrier>TK</carrier> </familyInformation> <familyInformation> <refNumber>2</refNumber> <fareFamilyname>RS</fareFamilyname> <description>RESTRICTED</description> <carrier>TK</carrier> </familyInformation> <familyInformation> <refNumber>3</refNumber> <fareFamilyname>FX</fareFamilyname> <description>FLEXIBLE</description> <carrier>TK</carrier> </familyInformation> <familyInformation> <refNumber>4</refNumber> <fareFamilyname>BX</fareFamilyname> <description>BUSINESS RESTRICTED</description> <carrier>TK</carrier> </familyInformation> <familyInformation> <refNumber>5</refNumber> <fareFamilyname>BB</fareFamilyname> <description>BUSINESS FLEX</description> <carrier>TK</carrier> </familyInformation> <flightIndex> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>1</ref> </flightProposal> <flightProposal> <ref>2830</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>TK</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>141024</dateOfDeparture> <timeOfDeparture>1920</timeOfDeparture> <dateOfArrival>141024</dateOfArrival> <timeOfArrival>2320</timeOfArrival> </productDateTime> <location> <locationId>NCE</locationId> <terminal>1</terminal> </location> <location> <locationId>IST</locationId> </location> <companyId> <marketingCarrier>TK</marketingCarrier> <operatingCarrier>TK</operatingCarrier> </companyId> <flightOrtrainNumber>1816</flightOrtrainNumber> <productDetail> <equipmentType>321</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> <productDetailQualifier>AVR</productDetailQualifier> </addProductDetail> </flightInformation> </flightDetails> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>151024</dateOfDeparture> <timeOfDeparture>1405</timeOfDeparture> <dateOfArrival>151024</dateOfArrival> <timeOfArrival>1750</timeOfArrival> </productDateTime> <location> <locationId>IST</locationId> </location> <location> <locationId>JFK</locationId> <terminal>1</terminal> </location> <companyId> <marketingCarrier>TK</marketingCarrier> <operatingCarrier>TK</operatingCarrier> </companyId> <flightOrtrainNumber>1</flightOrtrainNumber> <productDetail> <equipmentType>77W</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> <productDetailQualifier>LCA</productDetailQualifier> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> </flightIndex> <recommendation> <itemNumber> <itemNumberId> <number>1</number> </itemNumberId> </itemNumber> <fareFamilyRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> </fareFamilyRef> <recPriceInfo> <monetaryDetail> <amount>953.60</amount> </monetaryDetail> <monetaryDetail> <amount>609.60</amount> </monetaryDetail> <monetaryDetail> <amountType>Q</amountType> <amount>0.00</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>U</refQualifier> <refNumber>2</refNumber> </referencingDetail> <referencingDetail> <refQualifier>U</refQualifier> <refNumber>3</refNumber> </referencingDetail> <referencingDetail> <refQualifier>U</refQualifier> <refNumber>4</refNumber> </referencingDetail> <referencingDetail> <refQualifier>U</refQualifier> <refNumber>5</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>476.80</totalFareAmount> <totalTaxAmount>304.80</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>TK</company> </codeShareDetails> <codeShareDetails> <company>GP</company> </codeShareDetails> <codeShareDetails> <company>HR</company> </codeShareDetails> </paxFareDetail> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> <traveller> <ref>2</ref> </traveller> </paxReference> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>PEN</textSubjectQualifier> <informationType>70</informationType> </freeTextQualification> <description>TICKETS ARE NON-REFUNDABLE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>LTD</textSubjectQualifier> <informationType>41</informationType> </freeTextQualification> <description>LAST TKT DTE</description> <description>14OCT24</description> <description> - DATE OF ORIGIN</description> </pricingMessage> </fare> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>T</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>TN2XPBO</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>N</breakPoint> </productInformation> </groupOfFares> <groupOfFares> <productInformation> <cabinProduct> <rbd>T</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>TN2XPBO</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> </paxFareProduct> </recommendation> <recommendation> <itemNumber> <itemNumberId> <number>2</number> </itemNumberId> </itemNumber> <fareFamilyRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>2</refNumber> </referencingDetail> </fareFamilyRef> <recPriceInfo> <monetaryDetail> <amount>1043.60</amount> </monetaryDetail> <monetaryDetail> <amount>609.60</amount> </monetaryDetail> <monetaryDetail> <amountType>Q</amountType> <amount>0.00</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>521.80</totalFareAmount> <totalTaxAmount>304.80</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>TK</company> </codeShareDetails> <codeShareDetails> <company>GP</company> </codeShareDetails> <codeShareDetails> <company>HR</company> </codeShareDetails> </paxFareDetail> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> <traveller> <ref>2</ref> </traveller> </paxReference> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>PEN</textSubjectQualifier> <informationType>70</informationType> </freeTextQualification> <description>TICKETS ARE NON-REFUNDABLE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>LTD</textSubjectQualifier> <informationType>41</informationType> </freeTextQualification> <description>LAST TKT DTE</description> <description>14OCT24</description> <description> - DATE OF ORIGIN</description> </pricingMessage> </fare> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>Q</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>QN2PXOW</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>N</breakPoint> </productInformation> </groupOfFares> <groupOfFares> <productInformation> <cabinProduct> <rbd>Q</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>QN2PXOW</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> </paxFareProduct> </recommendation> <recommendation> <itemNumber> <itemNumberId> <number>3</number> </itemNumberId> </itemNumber> <fareFamilyRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>3</refNumber> </referencingDetail> </fareFamilyRef> <recPriceInfo> <monetaryDetail> <amount>1713.60</amount> </monetaryDetail> <monetaryDetail> <amount>609.60</amount> </monetaryDetail> <monetaryDetail> <amountType>Q</amountType> <amount>0.00</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>856.80</totalFareAmount> <totalTaxAmount>304.80</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>TK</company> </codeShareDetails> <codeShareDetails> <company>GP</company> </codeShareDetails> <codeShareDetails> <company>HR</company> </codeShareDetails> </paxFareDetail> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> <traveller> <ref>2</ref> </traveller> </paxReference> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>PEN</textSubjectQualifier> <informationType>70</informationType> </freeTextQualification> <description>TICKETS ARE NON-REFUNDABLE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>LTD</textSubjectQualifier> <informationType>41</informationType> </freeTextQualification> <description>LAST TKT DTE</description> <description>14OCT24</description> <description> - DATE OF ORIGIN</description> </pricingMessage> </fare> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>H</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>HN2XOX</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>N</breakPoint> </productInformation> </groupOfFares> <groupOfFares> <productInformation> <cabinProduct> <rbd>H</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>HN2XOX</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> </paxFareProduct> </recommendation> <recommendation> <itemNumber> <itemNumberId> <number>4</number> </itemNumberId> </itemNumber> <fareFamilyRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>4</refNumber> </referencingDetail> </fareFamilyRef> <recPriceInfo> <monetaryDetail> <amount>3856.80</amount> </monetaryDetail> <monetaryDetail> <amount>1026.80</amount> </monetaryDetail> <monetaryDetail> <amountType>Q</amountType> <amount>0.00</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>1928.40</totalFareAmount> <totalTaxAmount>513.40</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>TK</company> </codeShareDetails> <codeShareDetails> <company>GP</company> </codeShareDetails> <codeShareDetails> <company>HR</company> </codeShareDetails> </paxFareDetail> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> <traveller> <ref>2</ref> </traveller> </paxReference> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>PEN</textSubjectQualifier> <informationType>70</informationType> </freeTextQualification> <description>TICKETS ARE NON-REFUNDABLE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>LTD</textSubjectQualifier> <informationType>41</informationType> </freeTextQualification> <description>LAST TKT DTE</description> <description>14OCT24</description> <description> - DATE OF ORIGIN</description> </pricingMessage> </fare> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>J</rbd> <cabin>C</cabin> <avlStatus>2</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>JN2BOX</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>N</breakPoint> </productInformation> </groupOfFares> <groupOfFares> <productInformation> <cabinProduct> <rbd>J</rbd> <cabin>C</cabin> <avlStatus>4</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>JN2BOX</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> </groupOfFares> <majCabin> <bookingClassDetails> <designator>C</designator> </bookingClassDetails> </majCabin> </fareDetails> </paxFareProduct> </recommendation> <recommendation> <itemNumber> <itemNumberId> <number>5</number> </itemNumberId> </itemNumber> <fareFamilyRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>5</refNumber> </referencingDetail> </fareFamilyRef> <recPriceInfo> <monetaryDetail> <amount>5944.80</amount> </monetaryDetail> <monetaryDetail> <amount>1026.80</amount> </monetaryDetail> <monetaryDetail> <amountType>Q</amountType> <amount>0.00</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>2972.40</totalFareAmount> <totalTaxAmount>513.40</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>TK</company> </codeShareDetails> <codeShareDetails> <company>GP</company> </codeShareDetails> <codeShareDetails> <company>HR</company> </codeShareDetails> </paxFareDetail> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> <traveller> <ref>2</ref> </traveller> </paxReference> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>LTD</textSubjectQualifier> <informationType>41</informationType> </freeTextQualification> <description>LAST TKT DTE</description> <description>14OCT24</description> <description> - DATE OF ORIGIN</description> </pricingMessage> </fare> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>D</rbd> <cabin>C</cabin> <avlStatus>4</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>DNOW</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>N</breakPoint> </productInformation> </groupOfFares> <groupOfFares> <productInformation> <cabinProduct> <rbd>D</rbd> <cabin>C</cabin> <avlStatus>4</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>DNOW</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> </groupOfFares> <majCabin> <bookingClassDetails> <designator>C</designator> </bookingClassDetails> </majCabin> </fareDetails> </paxFareProduct> </recommendation> </Fare\_EnrichTravelProposalsReply>

## 5.1.3 Possible Errors

See "Error Messages" section.

* * *

## 5.2 Operation: 02.01 Fare Option - Currency Conversion

The currency conversion option may be combined with any other option.

It is mandatory that the ticketing price type be set to "CUC" to indicate a currency conversion request. It is mandatory for any query including the currency conversion option.

It is mandatory that a currency code be specified for the conversion. All price amounts for recommendations are converted in the requested Currency. There is no default currency for conversion, it must be specified.

The example below illustrates a low fare search including an optional Currency Conversion element specified with the following information.  
Query Requirements:

-   Currency to be returned: EUROS

Requesting

Specified Data

Request by number of seats occupied by passengers

PX

\# of seats for request

1

Request specific maximum number of recommendations to be returned

RC

Maximum # of recommendations requested

200

Adult Passenger type code

ADT

Passenger type code applicable to 1st passenger

1

Currency Override

CUC

Currency requested for recommendations is Euros

EUR

Applicable 1st requested segment

1

Trip departure city of Paris

PAR

Trip arrival city of Miami

MIA

Trip date (20 January 2006)

200106

## 5.2.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_EnrichTravelProposals xmlns="http://xml.amadeus.com/FMPXAQ\_24\_6\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>2</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> <traveller> <ref>2</ref> </traveller> </paxReference> <fareOptions> <pricingTickInfo> <pricingTicketing> <priceType>RU</priceType> <priceType>RP</priceType> <priceType>TAC</priceType> <priceType>CUC</priceType> </pricingTicketing> </pricingTickInfo> <feeIdDescription> <feeId> <feeType>FFI</feeType> <feeIdNumber>3</feeIdNumber> </feeId> <feeId> <feeType>UPC</feeType> <feeIdNumber>9</feeIdNumber> </feeId> </feeIdDescription> <conversionRate> <conversionRateDetail> <currency>USD</currency> </conversionRateDetail> </conversionRate> </fareOptions> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>NCE</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>NYC</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>141024</date> </firstDateTimeDetail> </timeDetails> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>1</ref> </flightProposal> <flightProposal> <ref>2830</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>TK</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>141024</dateOfDeparture> <timeOfDeparture>1920</timeOfDeparture> <dateOfArrival>141024</dateOfArrival> <timeOfArrival>2320</timeOfArrival> </productDateTime> <location> <locationId>NCE</locationId> <terminal>1</terminal> </location> <location> <locationId>IST</locationId> </location> <companyId> <marketingCarrier>TK</marketingCarrier> <operatingCarrier>TK</operatingCarrier> </companyId> <flightOrtrainNumber>1816</flightOrtrainNumber> <productDetail> <equipmentType>321</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> <productDetailQualifier>AVR</productDetailQualifier> </addProductDetail> </flightInformation> </flightDetails> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>151024</dateOfDeparture> <timeOfDeparture>1405</timeOfDeparture> <dateOfArrival>151024</dateOfArrival> <timeOfArrival>1750</timeOfArrival> </productDateTime> <location> <locationId>IST</locationId> </location> <location> <locationId>JFK</locationId> <terminal>1</terminal> </location> <companyId> <marketingCarrier>TK</marketingCarrier> <operatingCarrier>TK</operatingCarrier> </companyId> <flightOrtrainNumber>1</flightOrtrainNumber> <productDetail> <equipmentType>77W</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> <productDetailQualifier>LCA</productDetailQualifier> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> </itinerary> </Fare\_EnrichTravelProposals>

## 5.2.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_EnrichTravelProposalsReply xmlns="http://xml.amadeus.com/FMPXAR\_24\_6\_1A"> <replyStatus> <status> <advisoryTypeInfo>FQX</advisoryTypeInfo> </status> </replyStatus> <conversionRate> <conversionRateDetail> <currency>USD</currency> </conversionRateDetail> </conversionRate> <familyInformation> <refNumber>1</refNumber> <fareFamilyname>PS</fareFamilyname> <description>PROMOTIONAL</description> <carrier>TK</carrier> <services> <reference>1</reference> <status>INC</status> </services> <services> <reference>2</reference> <status>INC</status> </services> <services> <reference>3</reference> <status>INC</status> </services> <services> <reference>4</reference> <status>CHA</status> </services> <services> <reference>5</reference> <status>NOF</status> </services> <services> <reference>6</reference> <status>CHA</status> </services> <services> <reference>7</reference> <status>INC</status> </services> </familyInformation> <familyInformation> <refNumber>2</refNumber> <fareFamilyname>RS</fareFamilyname> <description>RESTRICTED</description> <carrier>TK</carrier> <services> <reference>1</reference> <status>INC</status> </services> <services> <reference>2</reference> <status>INC</status> </services> <services> <reference>3</reference> <status>INC</status> </services> <services> <reference>4</reference> <status>CHA</status> </services> <services> <reference>5</reference> <status>CHA</status> </services> <services> <reference>6</reference> <status>CHA</status> </services> <services> <reference>7</reference> <status>INC</status> </services> </familyInformation> <familyInformation> <refNumber>3</refNumber> <fareFamilyname>FX</fareFamilyname> <description>FLEXIBLE</description> <carrier>TK</carrier> <services> <reference>1</reference> <status>INC</status> </services> <services> <reference>2</reference> <status>INC</status> </services> <services> <reference>3</reference> <status>INC</status> </services> <services> <reference>4</reference> <status>CHA</status> </services> <services> <reference>5</reference> <status>INC</status> </services> <services> <reference>6</reference> <status>INC</status> </services> <services> <reference>7</reference> <status>INC</status> </services> </familyInformation> <flightIndex> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>1</ref> </flightProposal> <flightProposal> <ref>2855</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>TK</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>141024</dateOfDeparture> <timeOfDeparture>1835</timeOfDeparture> <dateOfArrival>141024</dateOfArrival> <timeOfArrival>2240</timeOfArrival> </productDateTime> <location> <locationId>NCE</locationId> <terminal>1</terminal> </location> <location> <locationId>IST</locationId> </location> <companyId> <marketingCarrier>TK</marketingCarrier> <operatingCarrier>TK</operatingCarrier> </companyId> <flightOrtrainNumber>1816</flightOrtrainNumber> <productDetail> <equipmentType>32B</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> <productDetailQualifier>LCA</productDetailQualifier> </addProductDetail> </flightInformation> </flightDetails> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>151024</dateOfDeparture> <timeOfDeparture>1345</timeOfDeparture> <dateOfArrival>151024</dateOfArrival> <timeOfArrival>1730</timeOfArrival> </productDateTime> <location> <locationId>IST</locationId> </location> <location> <locationId>JFK</locationId> <terminal>1</terminal> </location> <companyId> <marketingCarrier>TK</marketingCarrier> <operatingCarrier>TK</operatingCarrier> </companyId> <flightOrtrainNumber>1</flightOrtrainNumber> <productDetail> <equipmentType>77W</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> <productDetailQualifier>LCA</productDetailQualifier> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> </flightIndex> <recommendation> <itemNumber> <itemNumberId> <number>1</number> </itemNumberId> </itemNumber> <fareFamilyRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> </fareFamilyRef> <recPriceInfo> <monetaryDetail> <amount>965.20</amount> </monetaryDetail> <monetaryDetail> <amount>617.20</amount> </monetaryDetail> <monetaryDetail> <amountType>YQ</amountType> <amount>0.00</amount> </monetaryDetail> <monetaryDetail> <amountType>YR</amountType> <amount>442.00</amount> </monetaryDetail> <monetaryDetail> <amountType>Q</amountType> <amount>0.00</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>U</refQualifier> <refNumber>2</refNumber> </referencingDetail> <referencingDetail> <refQualifier>U</refQualifier> <refNumber>3</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>482.60</totalFareAmount> <totalTaxAmount>308.60</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>TK</company> </codeShareDetails> <codeShareDetails> <company>HR</company> </codeShareDetails> <codeShareDetails> <company>GP</company> </codeShareDetails> <monetaryDetails> <amountType>YQ</amountType> <amount>0.00</amount> </monetaryDetails> <monetaryDetails> <amountType>YR</amountType> <amount>221.00</amount> </monetaryDetails> <monetaryDetails> <amountType>Q</amountType> <amount>0.00</amount> </monetaryDetails> </paxFareDetail> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> <traveller> <ref>2</ref> </traveller> </paxReference> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>PEN</textSubjectQualifier> <informationType>70</informationType> </freeTextQualification> <description>TICKETS ARE NON-REFUNDABLE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>LTD</textSubjectQualifier> <informationType>41</informationType> </freeTextQualification> <description>LAST TKT DTE</description> <description>14OCT24</description> <description> - DATE OF ORIGIN</description> </pricingMessage> </fare> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>T</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>TN2XPBO</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>N</breakPoint> </productInformation> </groupOfFares> <groupOfFares> <productInformation> <cabinProduct> <rbd>T</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>TN2XPBO</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> <fareFamiliesRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> </paxFareProduct> </recommendation> <recommendation> <itemNumber> <itemNumberId> <number>2</number> </itemNumberId> </itemNumber> <fareFamilyRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>2</refNumber> </referencingDetail> </fareFamilyRef> <recPriceInfo> <monetaryDetail> <amount>1055.20</amount> </monetaryDetail> <monetaryDetail> <amount>617.20</amount> </monetaryDetail> <monetaryDetail> <amountType>YQ</amountType> <amount>0.00</amount> </monetaryDetail> <monetaryDetail> <amountType>YR</amountType> <amount>442.00</amount> </monetaryDetail> <monetaryDetail> <amountType>Q</amountType> <amount>0.00</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>527.60</totalFareAmount> <totalTaxAmount>308.60</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>TK</company> </codeShareDetails> <codeShareDetails> <company>HR</company> </codeShareDetails> <codeShareDetails> <company>GP</company> </codeShareDetails> <monetaryDetails> <amountType>YQ</amountType> <amount>0.00</amount> </monetaryDetails> <monetaryDetails> <amountType>YR</amountType> <amount>221.00</amount> </monetaryDetails> <monetaryDetails> <amountType>Q</amountType> <amount>0.00</amount> </monetaryDetails> </paxFareDetail> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> <traveller> <ref>2</ref> </traveller> </paxReference> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>PEN</textSubjectQualifier> <informationType>70</informationType> </freeTextQualification> <description>TICKETS ARE NON-REFUNDABLE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>LTD</textSubjectQualifier> <informationType>41</informationType> </freeTextQualification> <description>LAST TKT DTE</description> <description>14OCT24</description> <description> - DATE OF ORIGIN</description> </pricingMessage> </fare> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>Q</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>QN2PXOW</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>N</breakPoint> </productInformation> </groupOfFares> <groupOfFares> <productInformation> <cabinProduct> <rbd>Q</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>QN2PXOW</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> <fareFamiliesRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>2</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> </paxFareProduct> </recommendation> <recommendation> <itemNumber> <itemNumberId> <number>3</number> </itemNumberId> </itemNumber> <fareFamilyRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>3</refNumber> </referencingDetail> </fareFamilyRef> <recPriceInfo> <monetaryDetail> <amount>1733.20</amount> </monetaryDetail> <monetaryDetail> <amount>617.20</amount> </monetaryDetail> <monetaryDetail> <amountType>YQ</amountType> <amount>0.00</amount> </monetaryDetail> <monetaryDetail> <amountType>YR</amountType> <amount>442.00</amount> </monetaryDetail> <monetaryDetail> <amountType>Q</amountType> <amount>0.00</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>866.60</totalFareAmount> <totalTaxAmount>308.60</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>TK</company> </codeShareDetails> <codeShareDetails> <company>HR</company> </codeShareDetails> <codeShareDetails> <company>GP</company> </codeShareDetails> <monetaryDetails> <amountType>YQ</amountType> <amount>0.00</amount> </monetaryDetails> <monetaryDetails> <amountType>YR</amountType> <amount>221.00</amount> </monetaryDetails> <monetaryDetails> <amountType>Q</amountType> <amount>0.00</amount> </monetaryDetails> </paxFareDetail> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> <traveller> <ref>2</ref> </traveller> </paxReference> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>PEN</textSubjectQualifier> <informationType>70</informationType> </freeTextQualification> <description>TICKETS ARE NON-REFUNDABLE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>LTD</textSubjectQualifier> <informationType>41</informationType> </freeTextQualification> <description>LAST TKT DTE</description> <description>14OCT24</description> <description> - DATE OF ORIGIN</description> </pricingMessage> </fare> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>H</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>HN2XOX</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>N</breakPoint> </productInformation> </groupOfFares> <groupOfFares> <productInformation> <cabinProduct> <rbd>H</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>HN2XOX</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> <fareFamiliesRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>3</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> </paxFareProduct> </recommendation> <serviceFeesGrp> <serviceTypeInfo> <carrierFeeDetails> <type>OC</type> </carrierFeeDetails> </serviceTypeInfo> <globalMessageMarker></globalMessageMarker> <serviceDetailsGrp> <serviceOptionInfo> <dataTypeInformation> <subType>09Q</subType> </dataTypeInformation> </serviceOptionInfo> <feeDescriptionGrp> <itemNumberInfo> <itemNumberDetails> <number>1</number> <type>SD</type> </itemNumberDetails> </itemNumberInfo> <serviceAttributesInfo> <attributeDetails> <attributeType>SSR</attributeType> <attributeDescription>RFIC</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>RFIC</attributeType> <attributeDescription>C</attributeDescription> </attributeDetails> </serviceAttributesInfo> <serviceDescriptionInfo> <serviceRequirementsInfo> <serviceClassification>C</serviceClassification> <serviceMarketingCarrier>TK</serviceMarketingCarrier> <serviceGroup>BG</serviceGroup> <serviceSubGroup>CY</serviceSubGroup> <serviceFreeText>4Y</serviceFreeText> </serviceRequirementsInfo> </serviceDescriptionInfo> <commercialName> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>1 PIECE X 8 KG CABIN BAGGAGE</freeText> </commercialName> </feeDescriptionGrp> </serviceDetailsGrp> <serviceDetailsGrp> <serviceOptionInfo> <dataTypeInformation> <subType>BAG</subType> </dataTypeInformation> </serviceOptionInfo> <feeDescriptionGrp> <itemNumberInfo> <itemNumberDetails> <number>2</number> <type>SD</type> </itemNumberDetails> </itemNumberInfo> <serviceAttributesInfo> <attributeDetails> <attributeType>SSR</attributeType> <attributeDescription>RFIC</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>RFIC</attributeType> <attributeDescription>C</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>BKM</attributeType> <attributeDescription>01</attributeDescription> </attributeDetails> </serviceAttributesInfo> <serviceDescriptionInfo> <serviceRequirementsInfo> <serviceClassification>C</serviceClassification> <serviceMarketingCarrier>TK</serviceMarketingCarrier> <serviceGroup>BG</serviceGroup> </serviceRequirementsInfo> </serviceDescriptionInfo> <commercialName> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>BAG INCLUDED</freeText> </commercialName> </feeDescriptionGrp> </serviceDetailsGrp> <serviceDetailsGrp> <serviceOptionInfo> <dataTypeInformation> <subType>0AK</subType> </dataTypeInformation> </serviceOptionInfo> <feeDescriptionGrp> <itemNumberInfo> <itemNumberDetails> <number>3</number> <type>SD</type> </itemNumberDetails> </itemNumberInfo> <serviceDescriptionInfo> <serviceRequirementsInfo> <serviceClassification>F</serviceClassification> <serviceMarketingCarrier>TK</serviceMarketingCarrier> <serviceGroup>ML</serviceGroup> <serviceSubGroup>DI</serviceSubGroup> </serviceRequirementsInfo> </serviceDescriptionInfo> <commercialName> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>MEAL SERVICE</freeText> </commercialName> </feeDescriptionGrp> </serviceDetailsGrp> <serviceDetailsGrp> <serviceOptionInfo> <dataTypeInformation> <subType>050</subType> </dataTypeInformation> </serviceOptionInfo> <feeDescriptionGrp> <itemNumberInfo> <itemNumberDetails> <number>4</number> <type>SD</type> </itemNumberDetails> </itemNumberInfo> <serviceDescriptionInfo> <serviceRequirementsInfo> <serviceClassification>Z</serviceClassification> <serviceMarketingCarrier>TK</serviceMarketingCarrier> <serviceGroup>BF</serviceGroup> <serviceSubGroup>SE</serviceSubGroup> <serviceFreeText>BS</serviceFreeText> </serviceRequirementsInfo> </serviceDescriptionInfo> <commercialName> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>STANDART SEAT SELECTION</freeText> </commercialName> </feeDescriptionGrp> </serviceDetailsGrp> <serviceDetailsGrp> <serviceOptionInfo> <dataTypeInformation> <subType>056</subType> </dataTypeInformation> </serviceOptionInfo> <feeDescriptionGrp> <itemNumberInfo> <itemNumberDetails> <number>5</number> <type>SD</type> </itemNumberDetails> </itemNumberInfo> <serviceDescriptionInfo> <serviceRequirementsInfo> <serviceClassification>Z</serviceClassification> <serviceMarketingCarrier>TK</serviceMarketingCarrier> <serviceGroup>BF</serviceGroup> <serviceSubGroup>RF</serviceSubGroup> </serviceRequirementsInfo> </serviceDescriptionInfo> <commercialName> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>REFUNDABLE TICKET</freeText> </commercialName> </feeDescriptionGrp> </serviceDetailsGrp> <serviceDetailsGrp> <serviceOptionInfo> <dataTypeInformation> <subType>059</subType> </dataTypeInformation> </serviceOptionInfo> <feeDescriptionGrp> <itemNumberInfo> <itemNumberDetails> <number>6</number> <type>SD</type> </itemNumberDetails> </itemNumberInfo> <serviceDescriptionInfo> <serviceRequirementsInfo> <serviceClassification>Z</serviceClassification> <serviceMarketingCarrier>TK</serviceMarketingCarrier> <serviceGroup>BF</serviceGroup> <serviceSubGroup>VC</serviceSubGroup> <serviceFreeText>CD</serviceFreeText> </serviceRequirementsInfo> </serviceDescriptionInfo> <commercialName> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>CHANGEABLE TICKET</freeText> </commercialName> </feeDescriptionGrp> </serviceDetailsGrp> <serviceDetailsGrp> <serviceOptionInfo> <dataTypeInformation> <subType>CNR</subType> </dataTypeInformation> </serviceOptionInfo> <feeDescriptionGrp> <itemNumberInfo> <itemNumberDetails> <number>7</number> <type>SD</type> </itemNumberDetails> </itemNumberInfo> <serviceAttributesInfo> <attributeDetails> <attributeType>SSR</attributeType> <attributeDescription>INMR</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>RFIC</attributeType> <attributeDescription>G</attributeDescription> </attributeDetails> </serviceAttributesInfo> <serviceDescriptionInfo> <serviceRequirementsInfo> <serviceClassification>F</serviceClassification> <serviceMarketingCarrier>TK</serviceMarketingCarrier> <serviceGroup>IE</serviceGroup> <serviceSubGroup>IT</serviceSubGroup> </serviceRequirementsInfo> </serviceDescriptionInfo> <commercialName> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>ONLINE MESSAGE RIGHT</freeText> </commercialName> </feeDescriptionGrp> </serviceDetailsGrp> </serviceFeesGrp> <serviceFeesGrp> <serviceTypeInfo> <carrierFeeDetails> <type>FBA</type> </carrierFeeDetails> </serviceTypeInfo> <serviceCoverageInfoGrp> <itemNumberInfo> <itemNumber> <number>1</number> </itemNumber> </itemNumberInfo> <serviceCovInfoGrp> <paxRefInfo> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </paxRefInfo> <coveragePerFlightsInfo> <numberOfItemsDetails> <referenceQualifier>RS</referenceQualifier> <refNum>1</refNum> </numberOfItemsDetails> <lastItemsDetails> <refOfLeg>1</refOfLeg> </lastItemsDetails> <lastItemsDetails> <refOfLeg>2</refOfLeg> </lastItemsDetails> </coveragePerFlightsInfo> <refInfo> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> </refInfo> </serviceCovInfoGrp> </serviceCoverageInfoGrp> <globalMessageMarker></globalMessageMarker> <freeBagAllowanceGrp> <freeBagAllownceInfo> <baggageDetails> <freeAllowance>2</freeAllowance> <quantityCode>N</quantityCode> </baggageDetails> </freeBagAllownceInfo> <itemNumberInfo> <itemNumberDetails> <number>1</number> </itemNumberDetails> </itemNumberInfo> </freeBagAllowanceGrp> </serviceFeesGrp> </Fare\_EnrichTravelProposalsReply>

## 5.2.3 Possible Errors

See "Error Messages" section.

* * *

## 5.3 Operation: 02.02 Fare Option - Unifare

By default the low fare searches target load of only public fares for pricing the itineraries. In order to target more fare types, the user needs to specify whether the low fare search applies on Unifares only, on all Public and Unifare fares or Corporate fares or a combination of these fare types.

The following Unifares options are supported:

-   Published fares: RP
-   Unifares: RU
-   Corporate Unifares: RW with at least 1 Corporate number and up to 6

These fare type searches may be combined.

The example below illustrates a low fare search including Published Fares, non corporate Unifares and Coporate Fares (Coporate code 012345).

Requesting

Specified Data

Request by number of seats occupied by passengers

PX

\# of seats for request

2

Adult Passenger type code

ADT

Passenger type code applicable to 1st passenger

1

Identify Published fares Price type search

RP

Identify Corporate Unifares type search

RU

Identify the corporate number as Corporate Unifares

RW

Associated corporate number to Corporate Unifares

RW

012345

## 5.3.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_EnrichTravelProposals xmlns="http://xml.amadeus.com/FMPXAQ\_24\_6\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>2</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> <traveller> <ref>2</ref> </traveller> </paxReference> <fareOptions> <pricingTickInfo> <pricingTicketing> <priceType>RU</priceType> <priceType>RP</priceType> <priceType>RW</priceType> <priceType>TAC</priceType> </pricingTicketing> </pricingTickInfo> <corporate> <corporateId> <corporateQualifier>RW</corporateQualifier> <identity>012345</identity> </corporateId> </corporate> <feeIdDescription> <feeId> <feeType>FFI</feeType> <feeIdNumber>3</feeIdNumber> </feeId> <feeId> <feeType>UPC</feeType> <feeIdNumber>9</feeIdNumber> </feeId> </feeIdDescription> </fareOptions> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>NCE</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>NYC</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>141024</date> </firstDateTimeDetail> </timeDetails> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>1</ref> </flightProposal> <flightProposal> <ref>2830</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>TK</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>141024</dateOfDeparture> <timeOfDeparture>1920</timeOfDeparture> <dateOfArrival>141024</dateOfArrival> <timeOfArrival>2320</timeOfArrival> </productDateTime> <location> <locationId>NCE</locationId> <terminal>1</terminal> </location> <location> <locationId>IST</locationId> </location> <companyId> <marketingCarrier>TK</marketingCarrier> <operatingCarrier>TK</operatingCarrier> </companyId> <flightOrtrainNumber>1816</flightOrtrainNumber> <productDetail> <equipmentType>321</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> <productDetailQualifier>AVR</productDetailQualifier> </addProductDetail> </flightInformation> </flightDetails> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>151024</dateOfDeparture> <timeOfDeparture>1405</timeOfDeparture> <dateOfArrival>151024</dateOfArrival> <timeOfArrival>1750</timeOfArrival> </productDateTime> <location> <locationId>IST</locationId> </location> <location> <locationId>JFK</locationId> <terminal>1</terminal> </location> <companyId> <marketingCarrier>TK</marketingCarrier> <operatingCarrier>TK</operatingCarrier> </companyId> <flightOrtrainNumber>1</flightOrtrainNumber> <productDetail> <equipmentType>77W</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> <productDetailQualifier>LCA</productDetailQualifier> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> </itinerary> </Fare\_EnrichTravelProposals>

## 5.3.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_EnrichTravelProposalsReply xmlns="http://xml.amadeus.com/FMPXAR\_24\_6\_1A"> <replyStatus> <status> <advisoryTypeInfo>FQX</advisoryTypeInfo> </status> </replyStatus> <conversionRate> <conversionRateDetail> <currency>USD</currency> </conversionRateDetail> </conversionRate> <familyInformation> <refNumber>1</refNumber> <fareFamilyname>PS</fareFamilyname> <description>PROMOTIONAL</description> <carrier>TK</carrier> <services> <reference>1</reference> <status>INC</status> </services> <services> <reference>2</reference> <status>INC</status> </services> <services> <reference>3</reference> <status>INC</status> </services> <services> <reference>4</reference> <status>CHA</status> </services> <services> <reference>5</reference> <status>NOF</status> </services> <services> <reference>6</reference> <status>CHA</status> </services> <services> <reference>7</reference> <status>INC</status> </services> </familyInformation> <familyInformation> <refNumber>2</refNumber> <fareFamilyname>RS</fareFamilyname> <description>RESTRICTED</description> <carrier>TK</carrier> <services> <reference>1</reference> <status>INC</status> </services> <services> <reference>2</reference> <status>INC</status> </services> <services> <reference>3</reference> <status>INC</status> </services> <services> <reference>4</reference> <status>CHA</status> </services> <services> <reference>5</reference> <status>CHA</status> </services> <services> <reference>6</reference> <status>CHA</status> </services> <services> <reference>7</reference> <status>INC</status> </services> </familyInformation> <familyInformation> <refNumber>3</refNumber> <fareFamilyname>FX</fareFamilyname> <description>FLEXIBLE</description> <carrier>TK</carrier> <services> <reference>1</reference> <status>INC</status> </services> <services> <reference>2</reference> <status>INC</status> </services> <services> <reference>3</reference> <status>INC</status> </services> <services> <reference>4</reference> <status>CHA</status> </services> <services> <reference>5</reference> <status>INC</status> </services> <services> <reference>6</reference> <status>INC</status> </services> <services> <reference>7</reference> <status>INC</status> </services> </familyInformation> <flightIndex> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>1</ref> </flightProposal> <flightProposal> <ref>2855</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>TK</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>141024</dateOfDeparture> <timeOfDeparture>1835</timeOfDeparture> <dateOfArrival>141024</dateOfArrival> <timeOfArrival>2240</timeOfArrival> </productDateTime> <location> <locationId>NCE</locationId> <terminal>1</terminal> </location> <location> <locationId>IST</locationId> </location> <companyId> <marketingCarrier>TK</marketingCarrier> <operatingCarrier>TK</operatingCarrier> </companyId> <flightOrtrainNumber>1816</flightOrtrainNumber> <productDetail> <equipmentType>32B</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> <productDetailQualifier>LCA</productDetailQualifier> </addProductDetail> </flightInformation> </flightDetails> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>151024</dateOfDeparture> <timeOfDeparture>1345</timeOfDeparture> <dateOfArrival>151024</dateOfArrival> <timeOfArrival>1730</timeOfArrival> </productDateTime> <location> <locationId>IST</locationId> </location> <location> <locationId>JFK</locationId> <terminal>1</terminal> </location> <companyId> <marketingCarrier>TK</marketingCarrier> <operatingCarrier>TK</operatingCarrier> </companyId> <flightOrtrainNumber>1</flightOrtrainNumber> <productDetail> <equipmentType>77W</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> <productDetailQualifier>LCA</productDetailQualifier> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> </flightIndex> <recommendation> <itemNumber> <itemNumberId> <number>1</number> </itemNumberId> </itemNumber> <fareFamilyRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> </fareFamilyRef> <recPriceInfo> <monetaryDetail> <amount>965.20</amount> </monetaryDetail> <monetaryDetail> <amount>617.20</amount> </monetaryDetail> <monetaryDetail> <amountType>YQ</amountType> <amount>0.00</amount> </monetaryDetail> <monetaryDetail> <amountType>YR</amountType> <amount>442.00</amount> </monetaryDetail> <monetaryDetail> <amountType>Q</amountType> <amount>0.00</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>U</refQualifier> <refNumber>2</refNumber> </referencingDetail> <referencingDetail> <refQualifier>U</refQualifier> <refNumber>3</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>482.60</totalFareAmount> <totalTaxAmount>308.60</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>TK</company> </codeShareDetails> <codeShareDetails> <company>HR</company> </codeShareDetails> <codeShareDetails> <company>GP</company> </codeShareDetails> <monetaryDetails> <amountType>YQ</amountType> <amount>0.00</amount> </monetaryDetails> <monetaryDetails> <amountType>YR</amountType> <amount>221.00</amount> </monetaryDetails> <monetaryDetails> <amountType>Q</amountType> <amount>0.00</amount> </monetaryDetails> </paxFareDetail> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> <traveller> <ref>2</ref> </traveller> </paxReference> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>PEN</textSubjectQualifier> <informationType>70</informationType> </freeTextQualification> <description>TICKETS ARE NON-REFUNDABLE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>LTD</textSubjectQualifier> <informationType>41</informationType> </freeTextQualification> <description>LAST TKT DTE</description> <description>14OCT24</description> <description> - DATE OF ORIGIN</description> </pricingMessage> </fare> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>T</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>TN2XPBO</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>N</breakPoint> </productInformation> </groupOfFares> <groupOfFares> <productInformation> <cabinProduct> <rbd>T</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>TN2XPBO</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> <fareFamiliesRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> </paxFareProduct> </recommendation> <recommendation> <itemNumber> <itemNumberId> <number>2</number> </itemNumberId> </itemNumber> <fareFamilyRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>2</refNumber> </referencingDetail> </fareFamilyRef> <recPriceInfo> <monetaryDetail> <amount>1055.20</amount> </monetaryDetail> <monetaryDetail> <amount>617.20</amount> </monetaryDetail> <monetaryDetail> <amountType>YQ</amountType> <amount>0.00</amount> </monetaryDetail> <monetaryDetail> <amountType>YR</amountType> <amount>442.00</amount> </monetaryDetail> <monetaryDetail> <amountType>Q</amountType> <amount>0.00</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>527.60</totalFareAmount> <totalTaxAmount>308.60</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>TK</company> </codeShareDetails> <codeShareDetails> <company>HR</company> </codeShareDetails> <codeShareDetails> <company>GP</company> </codeShareDetails> <monetaryDetails> <amountType>YQ</amountType> <amount>0.00</amount> </monetaryDetails> <monetaryDetails> <amountType>YR</amountType> <amount>221.00</amount> </monetaryDetails> <monetaryDetails> <amountType>Q</amountType> <amount>0.00</amount> </monetaryDetails> </paxFareDetail> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> <traveller> <ref>2</ref> </traveller> </paxReference> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>PEN</textSubjectQualifier> <informationType>70</informationType> </freeTextQualification> <description>TICKETS ARE NON-REFUNDABLE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>LTD</textSubjectQualifier> <informationType>41</informationType> </freeTextQualification> <description>LAST TKT DTE</description> <description>14OCT24</description> <description> - DATE OF ORIGIN</description> </pricingMessage> </fare> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>Q</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>QN2PXOW</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>N</breakPoint> </productInformation> </groupOfFares> <groupOfFares> <productInformation> <cabinProduct> <rbd>Q</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>QN2PXOW</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> <fareFamiliesRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>2</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> </paxFareProduct> </recommendation> <recommendation> <itemNumber> <itemNumberId> <number>3</number> </itemNumberId> </itemNumber> <fareFamilyRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>3</refNumber> </referencingDetail> </fareFamilyRef> <recPriceInfo> <monetaryDetail> <amount>1733.20</amount> </monetaryDetail> <monetaryDetail> <amount>617.20</amount> </monetaryDetail> <monetaryDetail> <amountType>YQ</amountType> <amount>0.00</amount> </monetaryDetail> <monetaryDetail> <amountType>YR</amountType> <amount>442.00</amount> </monetaryDetail> <monetaryDetail> <amountType>Q</amountType> <amount>0.00</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>866.60</totalFareAmount> <totalTaxAmount>308.60</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>TK</company> </codeShareDetails> <codeShareDetails> <company>HR</company> </codeShareDetails> <codeShareDetails> <company>GP</company> </codeShareDetails> <monetaryDetails> <amountType>YQ</amountType> <amount>0.00</amount> </monetaryDetails> <monetaryDetails> <amountType>YR</amountType> <amount>221.00</amount> </monetaryDetails> <monetaryDetails> <amountType>Q</amountType> <amount>0.00</amount> </monetaryDetails> </paxFareDetail> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> <traveller> <ref>2</ref> </traveller> </paxReference> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>PEN</textSubjectQualifier> <informationType>70</informationType> </freeTextQualification> <description>TICKETS ARE NON-REFUNDABLE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>LTD</textSubjectQualifier> <informationType>41</informationType> </freeTextQualification> <description>LAST TKT DTE</description> <description>14OCT24</description> <description> - DATE OF ORIGIN</description> </pricingMessage> </fare> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>H</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>HN2XOX</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>N</breakPoint> </productInformation> </groupOfFares> <groupOfFares> <productInformation> <cabinProduct> <rbd>H</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>HN2XOX</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> <fareFamiliesRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>3</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> </paxFareProduct> </recommendation> <serviceFeesGrp> <serviceTypeInfo> <carrierFeeDetails> <type>OC</type> </carrierFeeDetails> </serviceTypeInfo> <globalMessageMarker></globalMessageMarker> <serviceDetailsGrp> <serviceOptionInfo> <dataTypeInformation> <subType>09Q</subType> </dataTypeInformation> </serviceOptionInfo> <feeDescriptionGrp> <itemNumberInfo> <itemNumberDetails> <number>1</number> <type>SD</type> </itemNumberDetails> </itemNumberInfo> <serviceAttributesInfo> <attributeDetails> <attributeType>SSR</attributeType> <attributeDescription>RFIC</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>RFIC</attributeType> <attributeDescription>C</attributeDescription> </attributeDetails> </serviceAttributesInfo> <serviceDescriptionInfo> <serviceRequirementsInfo> <serviceClassification>C</serviceClassification> <serviceMarketingCarrier>TK</serviceMarketingCarrier> <serviceGroup>BG</serviceGroup> <serviceSubGroup>CY</serviceSubGroup> <serviceFreeText>4Y</serviceFreeText> </serviceRequirementsInfo> </serviceDescriptionInfo> <commercialName> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>1 PIECE X 8 KG CABIN BAGGAGE</freeText> </commercialName> </feeDescriptionGrp> </serviceDetailsGrp> <serviceDetailsGrp> <serviceOptionInfo> <dataTypeInformation> <subType>BAG</subType> </dataTypeInformation> </serviceOptionInfo> <feeDescriptionGrp> <itemNumberInfo> <itemNumberDetails> <number>2</number> <type>SD</type> </itemNumberDetails> </itemNumberInfo> <serviceAttributesInfo> <attributeDetails> <attributeType>SSR</attributeType> <attributeDescription>RFIC</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>RFIC</attributeType> <attributeDescription>C</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>BKM</attributeType> <attributeDescription>01</attributeDescription> </attributeDetails> </serviceAttributesInfo> <serviceDescriptionInfo> <serviceRequirementsInfo> <serviceClassification>C</serviceClassification> <serviceMarketingCarrier>TK</serviceMarketingCarrier> <serviceGroup>BG</serviceGroup> </serviceRequirementsInfo> </serviceDescriptionInfo> <commercialName> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>BAG INCLUDED</freeText> </commercialName> </feeDescriptionGrp> </serviceDetailsGrp> <serviceDetailsGrp> <serviceOptionInfo> <dataTypeInformation> <subType>0AK</subType> </dataTypeInformation> </serviceOptionInfo> <feeDescriptionGrp> <itemNumberInfo> <itemNumberDetails> <number>3</number> <type>SD</type> </itemNumberDetails> </itemNumberInfo> <serviceDescriptionInfo> <serviceRequirementsInfo> <serviceClassification>F</serviceClassification> <serviceMarketingCarrier>TK</serviceMarketingCarrier> <serviceGroup>ML</serviceGroup> <serviceSubGroup>DI</serviceSubGroup> </serviceRequirementsInfo> </serviceDescriptionInfo> <commercialName> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>MEAL SERVICE</freeText> </commercialName> </feeDescriptionGrp> </serviceDetailsGrp> <serviceDetailsGrp> <serviceOptionInfo> <dataTypeInformation> <subType>050</subType> </dataTypeInformation> </serviceOptionInfo> <feeDescriptionGrp> <itemNumberInfo> <itemNumberDetails> <number>4</number> <type>SD</type> </itemNumberDetails> </itemNumberInfo> <serviceDescriptionInfo> <serviceRequirementsInfo> <serviceClassification>Z</serviceClassification> <serviceMarketingCarrier>TK</serviceMarketingCarrier> <serviceGroup>BF</serviceGroup> <serviceSubGroup>SE</serviceSubGroup> <serviceFreeText>BS</serviceFreeText> </serviceRequirementsInfo> </serviceDescriptionInfo> <commercialName> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>STANDART SEAT SELECTION</freeText> </commercialName> </feeDescriptionGrp> </serviceDetailsGrp> <serviceDetailsGrp> <serviceOptionInfo> <dataTypeInformation> <subType>056</subType> </dataTypeInformation> </serviceOptionInfo> <feeDescriptionGrp> <itemNumberInfo> <itemNumberDetails> <number>5</number> <type>SD</type> </itemNumberDetails> </itemNumberInfo> <serviceDescriptionInfo> <serviceRequirementsInfo> <serviceClassification>Z</serviceClassification> <serviceMarketingCarrier>TK</serviceMarketingCarrier> <serviceGroup>BF</serviceGroup> <serviceSubGroup>RF</serviceSubGroup> </serviceRequirementsInfo> </serviceDescriptionInfo> <commercialName> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>REFUNDABLE TICKET</freeText> </commercialName> </feeDescriptionGrp> </serviceDetailsGrp> <serviceDetailsGrp> <serviceOptionInfo> <dataTypeInformation> <subType>059</subType> </dataTypeInformation> </serviceOptionInfo> <feeDescriptionGrp> <itemNumberInfo> <itemNumberDetails> <number>6</number> <type>SD</type> </itemNumberDetails> </itemNumberInfo> <serviceDescriptionInfo> <serviceRequirementsInfo> <serviceClassification>Z</serviceClassification> <serviceMarketingCarrier>TK</serviceMarketingCarrier> <serviceGroup>BF</serviceGroup> <serviceSubGroup>VC</serviceSubGroup> <serviceFreeText>CD</serviceFreeText> </serviceRequirementsInfo> </serviceDescriptionInfo> <commercialName> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>CHANGEABLE TICKET</freeText> </commercialName> </feeDescriptionGrp> </serviceDetailsGrp> <serviceDetailsGrp> <serviceOptionInfo> <dataTypeInformation> <subType>CNR</subType> </dataTypeInformation> </serviceOptionInfo> <feeDescriptionGrp> <itemNumberInfo> <itemNumberDetails> <number>7</number> <type>SD</type> </itemNumberDetails> </itemNumberInfo> <serviceAttributesInfo> <attributeDetails> <attributeType>SSR</attributeType> <attributeDescription>INMR</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>RFIC</attributeType> <attributeDescription>G</attributeDescription> </attributeDetails> </serviceAttributesInfo> <serviceDescriptionInfo> <serviceRequirementsInfo> <serviceClassification>F</serviceClassification> <serviceMarketingCarrier>TK</serviceMarketingCarrier> <serviceGroup>IE</serviceGroup> <serviceSubGroup>IT</serviceSubGroup> </serviceRequirementsInfo> </serviceDescriptionInfo> <commercialName> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>ONLINE MESSAGE RIGHT</freeText> </commercialName> </feeDescriptionGrp> </serviceDetailsGrp> </serviceFeesGrp> <serviceFeesGrp> <serviceTypeInfo> <carrierFeeDetails> <type>FBA</type> </carrierFeeDetails> </serviceTypeInfo> <serviceCoverageInfoGrp> <itemNumberInfo> <itemNumber> <number>1</number> </itemNumber> </itemNumberInfo> <serviceCovInfoGrp> <paxRefInfo> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </paxRefInfo> <coveragePerFlightsInfo> <numberOfItemsDetails> <referenceQualifier>RS</referenceQualifier> <refNum>1</refNum> </numberOfItemsDetails> <lastItemsDetails> <refOfLeg>1</refOfLeg> </lastItemsDetails> <lastItemsDetails> <refOfLeg>2</refOfLeg> </lastItemsDetails> </coveragePerFlightsInfo> <refInfo> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> </refInfo> </serviceCovInfoGrp> </serviceCoverageInfoGrp> <globalMessageMarker></globalMessageMarker> <freeBagAllowanceGrp> <freeBagAllownceInfo> <baggageDetails> <freeAllowance>2</freeAllowance> <quantityCode>N</quantityCode> </baggageDetails> </freeBagAllownceInfo> <itemNumberInfo> <itemNumberDetails> <number>1</number> </itemNumberDetails> </itemNumberInfo> </freeBagAllowanceGrp> </serviceFeesGrp> </Fare\_EnrichTravelProposalsReply>

## 5.3.3 Possible Errors

If a wrong value is provided then an error is generated and the functional reject generated with following message - 966 - Bad value (coded) - pricingTickInfo In case the corprate negotiated fare type is requested without providing a single corporate code a functional reject is raised as follows - 900 - Transaction unable to process \\: 951

* * *

## 5.4 Operation: 02.03 Fare Option - Type of Ticket (Electronic/Paper Ticket)

The paper and electronic ticket surcharge concept is driven from fare data filed by the airline.

Three new pricing options are available to allow the user to link the fare priced and the type of Fare required.

Possible values:

-   PT for paper ticket
-   ET for electronic ticket
-   EP for electronic and paper ticket

**Note:** Electronic ticketing (ET) is not yet available in all markets or all carriers, for further details contact your local Amadeus Help Desk for more information, to ensure that the Office Profile has been modified accordingly and the market where the airlines are situated can benefit from Electronic ticketing (ET).

Examples:

Request

Process

If no options are entered

System will propose both Electronic and Paper Ticket travel solutions

Request Electronic Ticket (ET) only

Electronic Ticket sent

Request PaperTicket (PT) only

Paper Ticket sent

The example below illustrates a low fare search for Electronic Ticket solutions only.  
Query Requirements:

Requesting

Specified Data

Request by number of seats occupied by passengers

PX

\# of seats for request

2

Adult Passenger type code

ADT

Passenger type code applicable to 1st & 2nd passengers

ref (1) and ref (2)

Electronic ticket included in the search

ET

## 5.4.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_EnrichTravelProposals xmlns="http://xml.amadeus.com/FMPXAQ\_24\_6\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>2</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> <traveller> <ref>2</ref> </traveller> </paxReference> <fareOptions> <pricingTickInfo> <pricingTicketing> <priceType>RU</priceType> <priceType>RP</priceType> <priceType>TAC</priceType> <priceType>ET</priceType> </pricingTicketing> </pricingTickInfo> <feeIdDescription> <feeId> <feeType>FFI</feeType> <feeIdNumber>3</feeIdNumber> </feeId> <feeId> <feeType>UPC</feeType> <feeIdNumber>9</feeIdNumber> </feeId> </feeIdDescription> </fareOptions> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>NCE</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>NYC</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>141024</date> </firstDateTimeDetail> </timeDetails> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>1</ref> </flightProposal> <flightProposal> <ref>2830</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>TK</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>141024</dateOfDeparture> <timeOfDeparture>1920</timeOfDeparture> <dateOfArrival>141024</dateOfArrival> <timeOfArrival>2320</timeOfArrival> </productDateTime> <location> <locationId>NCE</locationId> <terminal>1</terminal> </location> <location> <locationId>IST</locationId> </location> <companyId> <marketingCarrier>TK</marketingCarrier> <operatingCarrier>TK</operatingCarrier> </companyId> <flightOrtrainNumber>1816</flightOrtrainNumber> <productDetail> <equipmentType>321</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> <productDetailQualifier>AVR</productDetailQualifier> </addProductDetail> </flightInformation> </flightDetails> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>151024</dateOfDeparture> <timeOfDeparture>1405</timeOfDeparture> <dateOfArrival>151024</dateOfArrival> <timeOfArrival>1750</timeOfArrival> </productDateTime> <location> <locationId>IST</locationId> </location> <location> <locationId>JFK</locationId> <terminal>1</terminal> </location> <companyId> <marketingCarrier>TK</marketingCarrier> <operatingCarrier>TK</operatingCarrier> </companyId> <flightOrtrainNumber>1</flightOrtrainNumber> <productDetail> <equipmentType>77W</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> <productDetailQualifier>LCA</productDetailQualifier> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> </itinerary> </Fare\_EnrichTravelProposals>

## 5.4.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_EnrichTravelProposalsReply xmlns="http://xml.amadeus.com/FMPXAR\_24\_6\_1A"> <replyStatus> <status> <advisoryTypeInfo>FQX</advisoryTypeInfo> </status> </replyStatus> <conversionRate> <conversionRateDetail> <currency>USD</currency> </conversionRateDetail> </conversionRate> <familyInformation> <refNumber>1</refNumber> <fareFamilyname>PS</fareFamilyname> <description>PROMOTIONAL</description> <carrier>TK</carrier> <services> <reference>1</reference> <status>INC</status> </services> <services> <reference>2</reference> <status>INC</status> </services> <services> <reference>3</reference> <status>INC</status> </services> <services> <reference>4</reference> <status>CHA</status> </services> <services> <reference>5</reference> <status>NOF</status> </services> <services> <reference>6</reference> <status>CHA</status> </services> <services> <reference>7</reference> <status>INC</status> </services> </familyInformation> <familyInformation> <refNumber>2</refNumber> <fareFamilyname>RS</fareFamilyname> <description>RESTRICTED</description> <carrier>TK</carrier> <services> <reference>1</reference> <status>INC</status> </services> <services> <reference>2</reference> <status>INC</status> </services> <services> <reference>3</reference> <status>INC</status> </services> <services> <reference>4</reference> <status>CHA</status> </services> <services> <reference>5</reference> <status>CHA</status> </services> <services> <reference>6</reference> <status>CHA</status> </services> <services> <reference>7</reference> <status>INC</status> </services> </familyInformation> <familyInformation> <refNumber>3</refNumber> <fareFamilyname>FX</fareFamilyname> <description>FLEXIBLE</description> <carrier>TK</carrier> <services> <reference>1</reference> <status>INC</status> </services> <services> <reference>2</reference> <status>INC</status> </services> <services> <reference>3</reference> <status>INC</status> </services> <services> <reference>4</reference> <status>CHA</status> </services> <services> <reference>5</reference> <status>INC</status> </services> <services> <reference>6</reference> <status>INC</status> </services> <services> <reference>7</reference> <status>INC</status> </services> </familyInformation> <flightIndex> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>1</ref> </flightProposal> <flightProposal> <ref>2855</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>TK</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>141024</dateOfDeparture> <timeOfDeparture>1835</timeOfDeparture> <dateOfArrival>141024</dateOfArrival> <timeOfArrival>2240</timeOfArrival> </productDateTime> <location> <locationId>NCE</locationId> <terminal>1</terminal> </location> <location> <locationId>IST</locationId> </location> <companyId> <marketingCarrier>TK</marketingCarrier> <operatingCarrier>TK</operatingCarrier> </companyId> <flightOrtrainNumber>1816</flightOrtrainNumber> <productDetail> <equipmentType>32B</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> <productDetailQualifier>LCA</productDetailQualifier> </addProductDetail> </flightInformation> </flightDetails> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>151024</dateOfDeparture> <timeOfDeparture>1345</timeOfDeparture> <dateOfArrival>151024</dateOfArrival> <timeOfArrival>1730</timeOfArrival> </productDateTime> <location> <locationId>IST</locationId> </location> <location> <locationId>JFK</locationId> <terminal>1</terminal> </location> <companyId> <marketingCarrier>TK</marketingCarrier> <operatingCarrier>TK</operatingCarrier> </companyId> <flightOrtrainNumber>1</flightOrtrainNumber> <productDetail> <equipmentType>77W</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> <productDetailQualifier>LCA</productDetailQualifier> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> </flightIndex> <recommendation> <itemNumber> <itemNumberId> <number>1</number> </itemNumberId> </itemNumber> <fareFamilyRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> </fareFamilyRef> <recPriceInfo> <monetaryDetail> <amount>965.20</amount> </monetaryDetail> <monetaryDetail> <amount>617.20</amount> </monetaryDetail> <monetaryDetail> <amountType>YQ</amountType> <amount>0.00</amount> </monetaryDetail> <monetaryDetail> <amountType>YR</amountType> <amount>442.00</amount> </monetaryDetail> <monetaryDetail> <amountType>Q</amountType> <amount>0.00</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>U</refQualifier> <refNumber>2</refNumber> </referencingDetail> <referencingDetail> <refQualifier>U</refQualifier> <refNumber>3</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>482.60</totalFareAmount> <totalTaxAmount>308.60</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>TK</company> </codeShareDetails> <codeShareDetails> <company>HR</company> </codeShareDetails> <codeShareDetails> <company>GP</company> </codeShareDetails> <monetaryDetails> <amountType>YQ</amountType> <amount>0.00</amount> </monetaryDetails> <monetaryDetails> <amountType>YR</amountType> <amount>221.00</amount> </monetaryDetails> <monetaryDetails> <amountType>Q</amountType> <amount>0.00</amount> </monetaryDetails> </paxFareDetail> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> <traveller> <ref>2</ref> </traveller> </paxReference> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>PEN</textSubjectQualifier> <informationType>70</informationType> </freeTextQualification> <description>TICKETS ARE NON-REFUNDABLE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>LTD</textSubjectQualifier> <informationType>41</informationType> </freeTextQualification> <description>LAST TKT DTE</description> <description>14OCT24</description> <description> - DATE OF ORIGIN</description> </pricingMessage> </fare> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>T</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>TN2XPBO</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>N</breakPoint> </productInformation> </groupOfFares> <groupOfFares> <productInformation> <cabinProduct> <rbd>T</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>TN2XPBO</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> <fareFamiliesRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> </paxFareProduct> </recommendation> <recommendation> <itemNumber> <itemNumberId> <number>2</number> </itemNumberId> </itemNumber> <fareFamilyRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>2</refNumber> </referencingDetail> </fareFamilyRef> <recPriceInfo> <monetaryDetail> <amount>1055.20</amount> </monetaryDetail> <monetaryDetail> <amount>617.20</amount> </monetaryDetail> <monetaryDetail> <amountType>YQ</amountType> <amount>0.00</amount> </monetaryDetail> <monetaryDetail> <amountType>YR</amountType> <amount>442.00</amount> </monetaryDetail> <monetaryDetail> <amountType>Q</amountType> <amount>0.00</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>527.60</totalFareAmount> <totalTaxAmount>308.60</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>TK</company> </codeShareDetails> <codeShareDetails> <company>HR</company> </codeShareDetails> <codeShareDetails> <company>GP</company> </codeShareDetails> <monetaryDetails> <amountType>YQ</amountType> <amount>0.00</amount> </monetaryDetails> <monetaryDetails> <amountType>YR</amountType> <amount>221.00</amount> </monetaryDetails> <monetaryDetails> <amountType>Q</amountType> <amount>0.00</amount> </monetaryDetails> </paxFareDetail> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> <traveller> <ref>2</ref> </traveller> </paxReference> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>PEN</textSubjectQualifier> <informationType>70</informationType> </freeTextQualification> <description>TICKETS ARE NON-REFUNDABLE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>LTD</textSubjectQualifier> <informationType>41</informationType> </freeTextQualification> <description>LAST TKT DTE</description> <description>14OCT24</description> <description> - DATE OF ORIGIN</description> </pricingMessage> </fare> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>Q</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>QN2PXOW</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>N</breakPoint> </productInformation> </groupOfFares> <groupOfFares> <productInformation> <cabinProduct> <rbd>Q</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>QN2PXOW</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> <fareFamiliesRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>2</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> </paxFareProduct> </recommendation> <recommendation> <itemNumber> <itemNumberId> <number>3</number> </itemNumberId> </itemNumber> <fareFamilyRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>3</refNumber> </referencingDetail> </fareFamilyRef> <recPriceInfo> <monetaryDetail> <amount>1733.20</amount> </monetaryDetail> <monetaryDetail> <amount>617.20</amount> </monetaryDetail> <monetaryDetail> <amountType>YQ</amountType> <amount>0.00</amount> </monetaryDetail> <monetaryDetail> <amountType>YR</amountType> <amount>442.00</amount> </monetaryDetail> <monetaryDetail> <amountType>Q</amountType> <amount>0.00</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>866.60</totalFareAmount> <totalTaxAmount>308.60</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>TK</company> </codeShareDetails> <codeShareDetails> <company>HR</company> </codeShareDetails> <codeShareDetails> <company>GP</company> </codeShareDetails> <monetaryDetails> <amountType>YQ</amountType> <amount>0.00</amount> </monetaryDetails> <monetaryDetails> <amountType>YR</amountType> <amount>221.00</amount> </monetaryDetails> <monetaryDetails> <amountType>Q</amountType> <amount>0.00</amount> </monetaryDetails> </paxFareDetail> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> <traveller> <ref>2</ref> </traveller> </paxReference> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>PEN</textSubjectQualifier> <informationType>70</informationType> </freeTextQualification> <description>TICKETS ARE NON-REFUNDABLE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>LTD</textSubjectQualifier> <informationType>41</informationType> </freeTextQualification> <description>LAST TKT DTE</description> <description>14OCT24</description> <description> - DATE OF ORIGIN</description> </pricingMessage> </fare> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>H</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>HN2XOX</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>N</breakPoint> </productInformation> </groupOfFares> <groupOfFares> <productInformation> <cabinProduct> <rbd>H</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>HN2XOX</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> <fareFamiliesRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>3</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> </paxFareProduct> </recommendation> <serviceFeesGrp> <serviceTypeInfo> <carrierFeeDetails> <type>OC</type> </carrierFeeDetails> </serviceTypeInfo> <globalMessageMarker></globalMessageMarker> <serviceDetailsGrp> <serviceOptionInfo> <dataTypeInformation> <subType>09Q</subType> </dataTypeInformation> </serviceOptionInfo> <feeDescriptionGrp> <itemNumberInfo> <itemNumberDetails> <number>1</number> <type>SD</type> </itemNumberDetails> </itemNumberInfo> <serviceAttributesInfo> <attributeDetails> <attributeType>SSR</attributeType> <attributeDescription>RFIC</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>RFIC</attributeType> <attributeDescription>C</attributeDescription> </attributeDetails> </serviceAttributesInfo> <serviceDescriptionInfo> <serviceRequirementsInfo> <serviceClassification>C</serviceClassification> <serviceMarketingCarrier>TK</serviceMarketingCarrier> <serviceGroup>BG</serviceGroup> <serviceSubGroup>CY</serviceSubGroup> <serviceFreeText>4Y</serviceFreeText> </serviceRequirementsInfo> </serviceDescriptionInfo> <commercialName> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>1 PIECE X 8 KG CABIN BAGGAGE</freeText> </commercialName> </feeDescriptionGrp> </serviceDetailsGrp> <serviceDetailsGrp> <serviceOptionInfo> <dataTypeInformation> <subType>BAG</subType> </dataTypeInformation> </serviceOptionInfo> <feeDescriptionGrp> <itemNumberInfo> <itemNumberDetails> <number>2</number> <type>SD</type> </itemNumberDetails> </itemNumberInfo> <serviceAttributesInfo> <attributeDetails> <attributeType>SSR</attributeType> <attributeDescription>RFIC</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>RFIC</attributeType> <attributeDescription>C</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>BKM</attributeType> <attributeDescription>01</attributeDescription> </attributeDetails> </serviceAttributesInfo> <serviceDescriptionInfo> <serviceRequirementsInfo> <serviceClassification>C</serviceClassification> <serviceMarketingCarrier>TK</serviceMarketingCarrier> <serviceGroup>BG</serviceGroup> </serviceRequirementsInfo> </serviceDescriptionInfo> <commercialName> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>BAG INCLUDED</freeText> </commercialName> </feeDescriptionGrp> </serviceDetailsGrp> <serviceDetailsGrp> <serviceOptionInfo> <dataTypeInformation> <subType>0AK</subType> </dataTypeInformation> </serviceOptionInfo> <feeDescriptionGrp> <itemNumberInfo> <itemNumberDetails> <number>3</number> <type>SD</type> </itemNumberDetails> </itemNumberInfo> <serviceDescriptionInfo> <serviceRequirementsInfo> <serviceClassification>F</serviceClassification> <serviceMarketingCarrier>TK</serviceMarketingCarrier> <serviceGroup>ML</serviceGroup> <serviceSubGroup>DI</serviceSubGroup> </serviceRequirementsInfo> </serviceDescriptionInfo> <commercialName> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>MEAL SERVICE</freeText> </commercialName> </feeDescriptionGrp> </serviceDetailsGrp> <serviceDetailsGrp> <serviceOptionInfo> <dataTypeInformation> <subType>050</subType> </dataTypeInformation> </serviceOptionInfo> <feeDescriptionGrp> <itemNumberInfo> <itemNumberDetails> <number>4</number> <type>SD</type> </itemNumberDetails> </itemNumberInfo> <serviceDescriptionInfo> <serviceRequirementsInfo> <serviceClassification>Z</serviceClassification> <serviceMarketingCarrier>TK</serviceMarketingCarrier> <serviceGroup>BF</serviceGroup> <serviceSubGroup>SE</serviceSubGroup> <serviceFreeText>BS</serviceFreeText> </serviceRequirementsInfo> </serviceDescriptionInfo> <commercialName> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>STANDART SEAT SELECTION</freeText> </commercialName> </feeDescriptionGrp> </serviceDetailsGrp> <serviceDetailsGrp> <serviceOptionInfo> <dataTypeInformation> <subType>056</subType> </dataTypeInformation> </serviceOptionInfo> <feeDescriptionGrp> <itemNumberInfo> <itemNumberDetails> <number>5</number> <type>SD</type> </itemNumberDetails> </itemNumberInfo> <serviceDescriptionInfo> <serviceRequirementsInfo> <serviceClassification>Z</serviceClassification> <serviceMarketingCarrier>TK</serviceMarketingCarrier> <serviceGroup>BF</serviceGroup> <serviceSubGroup>RF</serviceSubGroup> </serviceRequirementsInfo> </serviceDescriptionInfo> <commercialName> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>REFUNDABLE TICKET</freeText> </commercialName> </feeDescriptionGrp> </serviceDetailsGrp> <serviceDetailsGrp> <serviceOptionInfo> <dataTypeInformation> <subType>059</subType> </dataTypeInformation> </serviceOptionInfo> <feeDescriptionGrp> <itemNumberInfo> <itemNumberDetails> <number>6</number> <type>SD</type> </itemNumberDetails> </itemNumberInfo> <serviceDescriptionInfo> <serviceRequirementsInfo> <serviceClassification>Z</serviceClassification> <serviceMarketingCarrier>TK</serviceMarketingCarrier> <serviceGroup>BF</serviceGroup> <serviceSubGroup>VC</serviceSubGroup> <serviceFreeText>CD</serviceFreeText> </serviceRequirementsInfo> </serviceDescriptionInfo> <commercialName> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>CHANGEABLE TICKET</freeText> </commercialName> </feeDescriptionGrp> </serviceDetailsGrp> <serviceDetailsGrp> <serviceOptionInfo> <dataTypeInformation> <subType>CNR</subType> </dataTypeInformation> </serviceOptionInfo> <feeDescriptionGrp> <itemNumberInfo> <itemNumberDetails> <number>7</number> <type>SD</type> </itemNumberDetails> </itemNumberInfo> <serviceAttributesInfo> <attributeDetails> <attributeType>SSR</attributeType> <attributeDescription>INMR</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>RFIC</attributeType> <attributeDescription>G</attributeDescription> </attributeDetails> </serviceAttributesInfo> <serviceDescriptionInfo> <serviceRequirementsInfo> <serviceClassification>F</serviceClassification> <serviceMarketingCarrier>TK</serviceMarketingCarrier> <serviceGroup>IE</serviceGroup> <serviceSubGroup>IT</serviceSubGroup> </serviceRequirementsInfo> </serviceDescriptionInfo> <commercialName> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>ONLINE MESSAGE RIGHT</freeText> </commercialName> </feeDescriptionGrp> </serviceDetailsGrp> </serviceFeesGrp> <serviceFeesGrp> <serviceTypeInfo> <carrierFeeDetails> <type>FBA</type> </carrierFeeDetails> </serviceTypeInfo> <serviceCoverageInfoGrp> <itemNumberInfo> <itemNumber> <number>1</number> </itemNumber> </itemNumberInfo> <serviceCovInfoGrp> <paxRefInfo> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </paxRefInfo> <coveragePerFlightsInfo> <numberOfItemsDetails> <referenceQualifier>RS</referenceQualifier> <refNum>1</refNum> </numberOfItemsDetails> <lastItemsDetails> <refOfLeg>1</refOfLeg> </lastItemsDetails> <lastItemsDetails> <refOfLeg>2</refOfLeg> </lastItemsDetails> </coveragePerFlightsInfo> <refInfo> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> </refInfo> </serviceCovInfoGrp> </serviceCoverageInfoGrp> <globalMessageMarker></globalMessageMarker> <freeBagAllowanceGrp> <freeBagAllownceInfo> <baggageDetails> <freeAllowance>2</freeAllowance> <quantityCode>N</quantityCode> </baggageDetails> </freeBagAllownceInfo> <itemNumberInfo> <itemNumberDetails> <number>1</number> </itemNumberDetails> </itemNumberInfo> </freeBagAllowanceGrp> </serviceFeesGrp> </Fare\_EnrichTravelProposalsReply>

## 5.4.3 Possible Errors

If a wrong value is provided then an error is generated and the functional reject generated with following message - 966 - Bad value (coded) - pricingTickInfo

* * *

## 5.5 Operation: 02.04 Fare Option - Expanded Parameter

The following fare type - Expanded Parameters are supported:

-   Advance purchase (NAP): Search for low fares having no advance purchase.
-   Penalty information for cancellation (NPE): Search for low fares having no penalty.
-   No Restriction (NR): Search for low fares having no restrictions.
-   Refundable fares (RF): Search for low fares that may be refundable.
-   Non-Refundable fares (NRF): Search for low fares that are not refundable.
-   Penalty information for cancellation (NPE): Search for low fares having no penalty.
-   Refundable fares (NRB): Search for low fares that are not rebookable.

**To note -** Not all combinations are possible, read below the combinability matrix indicating which pair of parameters are accepted. When parameters are not compatible, the entire query is rejected with 952 "CONFLICTING OPTIONS USED"

**Incompatibility Matrix** 

RF 

RB 

NPE 

NRB 

NRF 

RF 

**NC** 

**OK** 

**OK** 

**OK** 

**NC** 

RB 

**NC** 

**OK** 

**NC** 

**OK** 

NPE 

**NC** 

**NC** 

**NC** 

NRB 

**NC** 

**OK** 

NRF 

**NC** 

**NC** = Not Compatible 

**OK** \= Compatible 

Blank area is redundant with upper part of matrix: compatibility is symmetrical 

The example below illustrates a low fare search including an optional Expanded Parameter element specified with the following information.

Query Requirements:

-   Only refundable fares should be returned in the recommendations.

Requesting

Specified Data

Request by number of seats occupied by passengers

PX

\# of seats for request

2

Adult Passenger type code

ADT

Passenger type code applicable to 1st & 2nd passengers

ref (1) & ref (2)

Expanded Parameter type for Refundable fares

RF

## 5.5.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_EnrichTravelProposals xmlns="http://xml.amadeus.com/FMPXAQ\_24\_6\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>2</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> <traveller> <ref>2</ref> </traveller> </paxReference> <fareOptions> <pricingTickInfo> <pricingTicketing> <priceType>RU</priceType> <priceType>RP</priceType> <priceType>TAC</priceType> <priceType>RF</priceType> </pricingTicketing> </pricingTickInfo> <feeIdDescription> <feeId> <feeType>FFI</feeType> <feeIdNumber>3</feeIdNumber> </feeId> <feeId> <feeType>UPC</feeType> <feeIdNumber>9</feeIdNumber> </feeId> </feeIdDescription> </fareOptions> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>NCE</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>NYC</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>141024</date> </firstDateTimeDetail> </timeDetails> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>1</ref> </flightProposal> <flightProposal> <ref>2830</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>TK</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>141024</dateOfDeparture> <timeOfDeparture>1920</timeOfDeparture> <dateOfArrival>141024</dateOfArrival> <timeOfArrival>2320</timeOfArrival> </productDateTime> <location> <locationId>NCE</locationId> <terminal>1</terminal> </location> <location> <locationId>IST</locationId> </location> <companyId> <marketingCarrier>TK</marketingCarrier> <operatingCarrier>TK</operatingCarrier> </companyId> <flightOrtrainNumber>1816</flightOrtrainNumber> <productDetail> <equipmentType>321</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> <productDetailQualifier>AVR</productDetailQualifier> </addProductDetail> </flightInformation> </flightDetails> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>151024</dateOfDeparture> <timeOfDeparture>1405</timeOfDeparture> <dateOfArrival>151024</dateOfArrival> <timeOfArrival>1750</timeOfArrival> </productDateTime> <location> <locationId>IST</locationId> </location> <location> <locationId>JFK</locationId> <terminal>1</terminal> </location> <companyId> <marketingCarrier>TK</marketingCarrier> <operatingCarrier>TK</operatingCarrier> </companyId> <flightOrtrainNumber>1</flightOrtrainNumber> <productDetail> <equipmentType>77W</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> <productDetailQualifier>LCA</productDetailQualifier> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> </itinerary> </Fare\_EnrichTravelProposals>

## 5.5.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_EnrichTravelProposalsReply xmlns="http://xml.amadeus.com/FMPXAR\_24\_6\_1A"> <replyStatus> <status> <advisoryTypeInfo>FQX</advisoryTypeInfo> </status> </replyStatus> <conversionRate> <conversionRateDetail> <currency>USD</currency> </conversionRateDetail> </conversionRate> <familyInformation> <refNumber>1</refNumber> <fareFamilyname>PS</fareFamilyname> <description>PROMOTIONAL</description> <carrier>TK</carrier> <services> <reference>1</reference> <status>INC</status> </services> <services> <reference>2</reference> <status>INC</status> </services> <services> <reference>3</reference> <status>INC</status> </services> <services> <reference>4</reference> <status>CHA</status> </services> <services> <reference>5</reference> <status>NOF</status> </services> <services> <reference>6</reference> <status>CHA</status> </services> <services> <reference>7</reference> <status>INC</status> </services> </familyInformation> <familyInformation> <refNumber>2</refNumber> <fareFamilyname>RS</fareFamilyname> <description>RESTRICTED</description> <carrier>TK</carrier> <services> <reference>1</reference> <status>INC</status> </services> <services> <reference>2</reference> <status>INC</status> </services> <services> <reference>3</reference> <status>INC</status> </services> <services> <reference>4</reference> <status>CHA</status> </services> <services> <reference>5</reference> <status>CHA</status> </services> <services> <reference>6</reference> <status>CHA</status> </services> <services> <reference>7</reference> <status>INC</status> </services> </familyInformation> <familyInformation> <refNumber>3</refNumber> <fareFamilyname>FX</fareFamilyname> <description>FLEXIBLE</description> <carrier>TK</carrier> <services> <reference>1</reference> <status>INC</status> </services> <services> <reference>2</reference> <status>INC</status> </services> <services> <reference>3</reference> <status>INC</status> </services> <services> <reference>4</reference> <status>CHA</status> </services> <services> <reference>5</reference> <status>INC</status> </services> <services> <reference>6</reference> <status>INC</status> </services> <services> <reference>7</reference> <status>INC</status> </services> </familyInformation> <flightIndex> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>1</ref> </flightProposal> <flightProposal> <ref>2855</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>TK</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>141024</dateOfDeparture> <timeOfDeparture>1835</timeOfDeparture> <dateOfArrival>141024</dateOfArrival> <timeOfArrival>2240</timeOfArrival> </productDateTime> <location> <locationId>NCE</locationId> <terminal>1</terminal> </location> <location> <locationId>IST</locationId> </location> <companyId> <marketingCarrier>TK</marketingCarrier> <operatingCarrier>TK</operatingCarrier> </companyId> <flightOrtrainNumber>1816</flightOrtrainNumber> <productDetail> <equipmentType>32B</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> <productDetailQualifier>LCA</productDetailQualifier> </addProductDetail> </flightInformation> </flightDetails> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>151024</dateOfDeparture> <timeOfDeparture>1345</timeOfDeparture> <dateOfArrival>151024</dateOfArrival> <timeOfArrival>1730</timeOfArrival> </productDateTime> <location> <locationId>IST</locationId> </location> <location> <locationId>JFK</locationId> <terminal>1</terminal> </location> <companyId> <marketingCarrier>TK</marketingCarrier> <operatingCarrier>TK</operatingCarrier> </companyId> <flightOrtrainNumber>1</flightOrtrainNumber> <productDetail> <equipmentType>77W</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> <productDetailQualifier>LCA</productDetailQualifier> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> </flightIndex> <recommendation> <itemNumber> <itemNumberId> <number>1</number> </itemNumberId> </itemNumber> <fareFamilyRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> </fareFamilyRef> <recPriceInfo> <monetaryDetail> <amount>965.20</amount> </monetaryDetail> <monetaryDetail> <amount>617.20</amount> </monetaryDetail> <monetaryDetail> <amountType>YQ</amountType> <amount>0.00</amount> </monetaryDetail> <monetaryDetail> <amountType>YR</amountType> <amount>442.00</amount> </monetaryDetail> <monetaryDetail> <amountType>Q</amountType> <amount>0.00</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>U</refQualifier> <refNumber>2</refNumber> </referencingDetail> <referencingDetail> <refQualifier>U</refQualifier> <refNumber>3</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>482.60</totalFareAmount> <totalTaxAmount>308.60</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>TK</company> </codeShareDetails> <codeShareDetails> <company>HR</company> </codeShareDetails> <codeShareDetails> <company>GP</company> </codeShareDetails> <monetaryDetails> <amountType>YQ</amountType> <amount>0.00</amount> </monetaryDetails> <monetaryDetails> <amountType>YR</amountType> <amount>221.00</amount> </monetaryDetails> <monetaryDetails> <amountType>Q</amountType> <amount>0.00</amount> </monetaryDetails> </paxFareDetail> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> <traveller> <ref>2</ref> </traveller> </paxReference> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>PEN</textSubjectQualifier> <informationType>70</informationType> </freeTextQualification> <description>TICKETS ARE NON-REFUNDABLE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>LTD</textSubjectQualifier> <informationType>41</informationType> </freeTextQualification> <description>LAST TKT DTE</description> <description>14OCT24</description> <description> - DATE OF ORIGIN</description> </pricingMessage> </fare> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>T</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>TN2XPBO</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>N</breakPoint> </productInformation> </groupOfFares> <groupOfFares> <productInformation> <cabinProduct> <rbd>T</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>TN2XPBO</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> <fareFamiliesRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> </paxFareProduct> </recommendation> <recommendation> <itemNumber> <itemNumberId> <number>2</number> </itemNumberId> </itemNumber> <fareFamilyRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>2</refNumber> </referencingDetail> </fareFamilyRef> <recPriceInfo> <monetaryDetail> <amount>1055.20</amount> </monetaryDetail> <monetaryDetail> <amount>617.20</amount> </monetaryDetail> <monetaryDetail> <amountType>YQ</amountType> <amount>0.00</amount> </monetaryDetail> <monetaryDetail> <amountType>YR</amountType> <amount>442.00</amount> </monetaryDetail> <monetaryDetail> <amountType>Q</amountType> <amount>0.00</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>527.60</totalFareAmount> <totalTaxAmount>308.60</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>TK</company> </codeShareDetails> <codeShareDetails> <company>HR</company> </codeShareDetails> <codeShareDetails> <company>GP</company> </codeShareDetails> <monetaryDetails> <amountType>YQ</amountType> <amount>0.00</amount> </monetaryDetails> <monetaryDetails> <amountType>YR</amountType> <amount>221.00</amount> </monetaryDetails> <monetaryDetails> <amountType>Q</amountType> <amount>0.00</amount> </monetaryDetails> </paxFareDetail> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> <traveller> <ref>2</ref> </traveller> </paxReference> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>PEN</textSubjectQualifier> <informationType>70</informationType> </freeTextQualification> <description>TICKETS ARE NON-REFUNDABLE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>LTD</textSubjectQualifier> <informationType>41</informationType> </freeTextQualification> <description>LAST TKT DTE</description> <description>14OCT24</description> <description> - DATE OF ORIGIN</description> </pricingMessage> </fare> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>Q</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>QN2PXOW</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>N</breakPoint> </productInformation> </groupOfFares> <groupOfFares> <productInformation> <cabinProduct> <rbd>Q</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>QN2PXOW</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> <fareFamiliesRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>2</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> </paxFareProduct> </recommendation> <recommendation> <itemNumber> <itemNumberId> <number>3</number> </itemNumberId> </itemNumber> <fareFamilyRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>3</refNumber> </referencingDetail> </fareFamilyRef> <recPriceInfo> <monetaryDetail> <amount>1733.20</amount> </monetaryDetail> <monetaryDetail> <amount>617.20</amount> </monetaryDetail> <monetaryDetail> <amountType>YQ</amountType> <amount>0.00</amount> </monetaryDetail> <monetaryDetail> <amountType>YR</amountType> <amount>442.00</amount> </monetaryDetail> <monetaryDetail> <amountType>Q</amountType> <amount>0.00</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>866.60</totalFareAmount> <totalTaxAmount>308.60</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>TK</company> </codeShareDetails> <codeShareDetails> <company>HR</company> </codeShareDetails> <codeShareDetails> <company>GP</company> </codeShareDetails> <monetaryDetails> <amountType>YQ</amountType> <amount>0.00</amount> </monetaryDetails> <monetaryDetails> <amountType>YR</amountType> <amount>221.00</amount> </monetaryDetails> <monetaryDetails> <amountType>Q</amountType> <amount>0.00</amount> </monetaryDetails> </paxFareDetail> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> <traveller> <ref>2</ref> </traveller> </paxReference> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>PEN</textSubjectQualifier> <informationType>70</informationType> </freeTextQualification> <description>TICKETS ARE NON-REFUNDABLE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>LTD</textSubjectQualifier> <informationType>41</informationType> </freeTextQualification> <description>LAST TKT DTE</description> <description>14OCT24</description> <description> - DATE OF ORIGIN</description> </pricingMessage> </fare> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>H</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>HN2XOX</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>N</breakPoint> </productInformation> </groupOfFares> <groupOfFares> <productInformation> <cabinProduct> <rbd>H</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>HN2XOX</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> <fareFamiliesRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>3</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> </paxFareProduct> </recommendation> <serviceFeesGrp> <serviceTypeInfo> <carrierFeeDetails> <type>OC</type> </carrierFeeDetails> </serviceTypeInfo> <globalMessageMarker></globalMessageMarker> <serviceDetailsGrp> <serviceOptionInfo> <dataTypeInformation> <subType>09Q</subType> </dataTypeInformation> </serviceOptionInfo> <feeDescriptionGrp> <itemNumberInfo> <itemNumberDetails> <number>1</number> <type>SD</type> </itemNumberDetails> </itemNumberInfo> <serviceAttributesInfo> <attributeDetails> <attributeType>SSR</attributeType> <attributeDescription>RFIC</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>RFIC</attributeType> <attributeDescription>C</attributeDescription> </attributeDetails> </serviceAttributesInfo> <serviceDescriptionInfo> <serviceRequirementsInfo> <serviceClassification>C</serviceClassification> <serviceMarketingCarrier>TK</serviceMarketingCarrier> <serviceGroup>BG</serviceGroup> <serviceSubGroup>CY</serviceSubGroup> <serviceFreeText>4Y</serviceFreeText> </serviceRequirementsInfo> </serviceDescriptionInfo> <commercialName> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>1 PIECE X 8 KG CABIN BAGGAGE</freeText> </commercialName> </feeDescriptionGrp> </serviceDetailsGrp> <serviceDetailsGrp> <serviceOptionInfo> <dataTypeInformation> <subType>BAG</subType> </dataTypeInformation> </serviceOptionInfo> <feeDescriptionGrp> <itemNumberInfo> <itemNumberDetails> <number>2</number> <type>SD</type> </itemNumberDetails> </itemNumberInfo> <serviceAttributesInfo> <attributeDetails> <attributeType>SSR</attributeType> <attributeDescription>RFIC</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>RFIC</attributeType> <attributeDescription>C</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>BKM</attributeType> <attributeDescription>01</attributeDescription> </attributeDetails> </serviceAttributesInfo> <serviceDescriptionInfo> <serviceRequirementsInfo> <serviceClassification>C</serviceClassification> <serviceMarketingCarrier>TK</serviceMarketingCarrier> <serviceGroup>BG</serviceGroup> </serviceRequirementsInfo> </serviceDescriptionInfo> <commercialName> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>BAG INCLUDED</freeText> </commercialName> </feeDescriptionGrp> </serviceDetailsGrp> <serviceDetailsGrp> <serviceOptionInfo> <dataTypeInformation> <subType>0AK</subType> </dataTypeInformation> </serviceOptionInfo> <feeDescriptionGrp> <itemNumberInfo> <itemNumberDetails> <number>3</number> <type>SD</type> </itemNumberDetails> </itemNumberInfo> <serviceDescriptionInfo> <serviceRequirementsInfo> <serviceClassification>F</serviceClassification> <serviceMarketingCarrier>TK</serviceMarketingCarrier> <serviceGroup>ML</serviceGroup> <serviceSubGroup>DI</serviceSubGroup> </serviceRequirementsInfo> </serviceDescriptionInfo> <commercialName> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>MEAL SERVICE</freeText> </commercialName> </feeDescriptionGrp> </serviceDetailsGrp> <serviceDetailsGrp> <serviceOptionInfo> <dataTypeInformation> <subType>050</subType> </dataTypeInformation> </serviceOptionInfo> <feeDescriptionGrp> <itemNumberInfo> <itemNumberDetails> <number>4</number> <type>SD</type> </itemNumberDetails> </itemNumberInfo> <serviceDescriptionInfo> <serviceRequirementsInfo> <serviceClassification>Z</serviceClassification> <serviceMarketingCarrier>TK</serviceMarketingCarrier> <serviceGroup>BF</serviceGroup> <serviceSubGroup>SE</serviceSubGroup> <serviceFreeText>BS</serviceFreeText> </serviceRequirementsInfo> </serviceDescriptionInfo> <commercialName> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>STANDART SEAT SELECTION</freeText> </commercialName> </feeDescriptionGrp> </serviceDetailsGrp> <serviceDetailsGrp> <serviceOptionInfo> <dataTypeInformation> <subType>056</subType> </dataTypeInformation> </serviceOptionInfo> <feeDescriptionGrp> <itemNumberInfo> <itemNumberDetails> <number>5</number> <type>SD</type> </itemNumberDetails> </itemNumberInfo> <serviceDescriptionInfo> <serviceRequirementsInfo> <serviceClassification>Z</serviceClassification> <serviceMarketingCarrier>TK</serviceMarketingCarrier> <serviceGroup>BF</serviceGroup> <serviceSubGroup>RF</serviceSubGroup> </serviceRequirementsInfo> </serviceDescriptionInfo> <commercialName> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>REFUNDABLE TICKET</freeText> </commercialName> </feeDescriptionGrp> </serviceDetailsGrp> <serviceDetailsGrp> <serviceOptionInfo> <dataTypeInformation> <subType>059</subType> </dataTypeInformation> </serviceOptionInfo> <feeDescriptionGrp> <itemNumberInfo> <itemNumberDetails> <number>6</number> <type>SD</type> </itemNumberDetails> </itemNumberInfo> <serviceDescriptionInfo> <serviceRequirementsInfo> <serviceClassification>Z</serviceClassification> <serviceMarketingCarrier>TK</serviceMarketingCarrier> <serviceGroup>BF</serviceGroup> <serviceSubGroup>VC</serviceSubGroup> <serviceFreeText>CD</serviceFreeText> </serviceRequirementsInfo> </serviceDescriptionInfo> <commercialName> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>CHANGEABLE TICKET</freeText> </commercialName> </feeDescriptionGrp> </serviceDetailsGrp> <serviceDetailsGrp> <serviceOptionInfo> <dataTypeInformation> <subType>CNR</subType> </dataTypeInformation> </serviceOptionInfo> <feeDescriptionGrp> <itemNumberInfo> <itemNumberDetails> <number>7</number> <type>SD</type> </itemNumberDetails> </itemNumberInfo> <serviceAttributesInfo> <attributeDetails> <attributeType>SSR</attributeType> <attributeDescription>INMR</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>RFIC</attributeType> <attributeDescription>G</attributeDescription> </attributeDetails> </serviceAttributesInfo> <serviceDescriptionInfo> <serviceRequirementsInfo> <serviceClassification>F</serviceClassification> <serviceMarketingCarrier>TK</serviceMarketingCarrier> <serviceGroup>IE</serviceGroup> <serviceSubGroup>IT</serviceSubGroup> </serviceRequirementsInfo> </serviceDescriptionInfo> <commercialName> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>ONLINE MESSAGE RIGHT</freeText> </commercialName> </feeDescriptionGrp> </serviceDetailsGrp> </serviceFeesGrp> <serviceFeesGrp> <serviceTypeInfo> <carrierFeeDetails> <type>FBA</type> </carrierFeeDetails> </serviceTypeInfo> <serviceCoverageInfoGrp> <itemNumberInfo> <itemNumber> <number>1</number> </itemNumber> </itemNumberInfo> <serviceCovInfoGrp> <paxRefInfo> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </paxRefInfo> <coveragePerFlightsInfo> <numberOfItemsDetails> <referenceQualifier>RS</referenceQualifier> <refNum>1</refNum> </numberOfItemsDetails> <lastItemsDetails> <refOfLeg>1</refOfLeg> </lastItemsDetails> <lastItemsDetails> <refOfLeg>2</refOfLeg> </lastItemsDetails> </coveragePerFlightsInfo> <refInfo> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> </refInfo> </serviceCovInfoGrp> </serviceCoverageInfoGrp> <globalMessageMarker></globalMessageMarker> <freeBagAllowanceGrp> <freeBagAllownceInfo> <baggageDetails> <freeAllowance>2</freeAllowance> <quantityCode>N</quantityCode> </baggageDetails> </freeBagAllownceInfo> <itemNumberInfo> <itemNumberDetails> <number>1</number> </itemNumberDetails> </itemNumberInfo> </freeBagAllowanceGrp> </serviceFeesGrp> </Fare\_EnrichTravelProposalsReply>

## 5.5.3 Possible Errors

When parameters are not compatible, the entire query is rejected with 952 "CONFLICTING OPTIONS USED" as explained in the compatibility table.

* * *

## 5.6 Operation: 02.05 Fare Option - Price only PTC

Normally the fare search process will default to pricing being carried out by using the fares filed for adult PTC in case there is no PTC specific fare discovered; but using this option inhibits this defaulting mechanism, thus generating no fare found reject generated when no PTC discount fare retrieved.

The process returns strictly recommendations with the requested passenger type, no defaulting is done.

Syntax:  
<fareOptions>  
  <pricingTickInfo>  
    <pricingTicketing>  
        **<priceType>PTC</priceType>**  
    </pricingTicketing>  
  </pricingTickInfo>  
</fareOptions>

## 5.6.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_EnrichTravelProposals xmlns="http://xml.amadeus.com/FMPXAQ\_24\_6\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>2</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> <traveller> <ref>2</ref> </traveller> </paxReference> <fareOptions> <pricingTickInfo> <pricingTicketing> <priceType>RU</priceType> <priceType>RP</priceType> <priceType>TAC</priceType> <priceType>PTC</priceType> </pricingTicketing> </pricingTickInfo> <feeIdDescription> <feeId> <feeType>FFI</feeType> <feeIdNumber>3</feeIdNumber> </feeId> <feeId> <feeType>UPC</feeType> <feeIdNumber>9</feeIdNumber> </feeId> </feeIdDescription> </fareOptions> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>NCE</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>NYC</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>141024</date> </firstDateTimeDetail> </timeDetails> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>1</ref> </flightProposal> <flightProposal> <ref>2830</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>TK</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>141024</dateOfDeparture> <timeOfDeparture>1920</timeOfDeparture> <dateOfArrival>141024</dateOfArrival> <timeOfArrival>2320</timeOfArrival> </productDateTime> <location> <locationId>NCE</locationId> <terminal>1</terminal> </location> <location> <locationId>IST</locationId> </location> <companyId> <marketingCarrier>TK</marketingCarrier> <operatingCarrier>TK</operatingCarrier> </companyId> <flightOrtrainNumber>1816</flightOrtrainNumber> <productDetail> <equipmentType>321</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> <productDetailQualifier>AVR</productDetailQualifier> </addProductDetail> </flightInformation> </flightDetails> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>151024</dateOfDeparture> <timeOfDeparture>1405</timeOfDeparture> <dateOfArrival>151024</dateOfArrival> <timeOfArrival>1750</timeOfArrival> </productDateTime> <location> <locationId>IST</locationId> </location> <location> <locationId>JFK</locationId> <terminal>1</terminal> </location> <companyId> <marketingCarrier>TK</marketingCarrier> <operatingCarrier>TK</operatingCarrier> </companyId> <flightOrtrainNumber>1</flightOrtrainNumber> <productDetail> <equipmentType>77W</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> <productDetailQualifier>LCA</productDetailQualifier> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> </itinerary> </Fare\_EnrichTravelProposals>

## 5.6.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_EnrichTravelProposalsReply xmlns="http://xml.amadeus.com/FMPXAR\_24\_6\_1A"> <replyStatus> <status> <advisoryTypeInfo>FQX</advisoryTypeInfo> </status> </replyStatus> <conversionRate> <conversionRateDetail> <currency>USD</currency> </conversionRateDetail> </conversionRate> <familyInformation> <refNumber>1</refNumber> <fareFamilyname>PS</fareFamilyname> <description>PROMOTIONAL</description> <carrier>TK</carrier> <services> <reference>1</reference> <status>INC</status> </services> <services> <reference>2</reference> <status>INC</status> </services> <services> <reference>3</reference> <status>INC</status> </services> <services> <reference>4</reference> <status>CHA</status> </services> <services> <reference>5</reference> <status>NOF</status> </services> <services> <reference>6</reference> <status>CHA</status> </services> <services> <reference>7</reference> <status>INC</status> </services> </familyInformation> <familyInformation> <refNumber>2</refNumber> <fareFamilyname>RS</fareFamilyname> <description>RESTRICTED</description> <carrier>TK</carrier> <services> <reference>1</reference> <status>INC</status> </services> <services> <reference>2</reference> <status>INC</status> </services> <services> <reference>3</reference> <status>INC</status> </services> <services> <reference>4</reference> <status>CHA</status> </services> <services> <reference>5</reference> <status>CHA</status> </services> <services> <reference>6</reference> <status>CHA</status> </services> <services> <reference>7</reference> <status>INC</status> </services> </familyInformation> <familyInformation> <refNumber>3</refNumber> <fareFamilyname>FX</fareFamilyname> <description>FLEXIBLE</description> <carrier>TK</carrier> <services> <reference>1</reference> <status>INC</status> </services> <services> <reference>2</reference> <status>INC</status> </services> <services> <reference>3</reference> <status>INC</status> </services> <services> <reference>4</reference> <status>CHA</status> </services> <services> <reference>5</reference> <status>INC</status> </services> <services> <reference>6</reference> <status>INC</status> </services> <services> <reference>7</reference> <status>INC</status> </services> </familyInformation> <flightIndex> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>1</ref> </flightProposal> <flightProposal> <ref>2855</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>TK</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>141024</dateOfDeparture> <timeOfDeparture>1835</timeOfDeparture> <dateOfArrival>141024</dateOfArrival> <timeOfArrival>2240</timeOfArrival> </productDateTime> <location> <locationId>NCE</locationId> <terminal>1</terminal> </location> <location> <locationId>IST</locationId> </location> <companyId> <marketingCarrier>TK</marketingCarrier> <operatingCarrier>TK</operatingCarrier> </companyId> <flightOrtrainNumber>1816</flightOrtrainNumber> <productDetail> <equipmentType>32B</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> <productDetailQualifier>LCA</productDetailQualifier> </addProductDetail> </flightInformation> </flightDetails> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>151024</dateOfDeparture> <timeOfDeparture>1345</timeOfDeparture> <dateOfArrival>151024</dateOfArrival> <timeOfArrival>1730</timeOfArrival> </productDateTime> <location> <locationId>IST</locationId> </location> <location> <locationId>JFK</locationId> <terminal>1</terminal> </location> <companyId> <marketingCarrier>TK</marketingCarrier> <operatingCarrier>TK</operatingCarrier> </companyId> <flightOrtrainNumber>1</flightOrtrainNumber> <productDetail> <equipmentType>77W</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> <productDetailQualifier>LCA</productDetailQualifier> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> </flightIndex> <recommendation> <itemNumber> <itemNumberId> <number>1</number> </itemNumberId> </itemNumber> <fareFamilyRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> </fareFamilyRef> <recPriceInfo> <monetaryDetail> <amount>965.20</amount> </monetaryDetail> <monetaryDetail> <amount>617.20</amount> </monetaryDetail> <monetaryDetail> <amountType>YQ</amountType> <amount>0.00</amount> </monetaryDetail> <monetaryDetail> <amountType>YR</amountType> <amount>442.00</amount> </monetaryDetail> <monetaryDetail> <amountType>Q</amountType> <amount>0.00</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>U</refQualifier> <refNumber>2</refNumber> </referencingDetail> <referencingDetail> <refQualifier>U</refQualifier> <refNumber>3</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>482.60</totalFareAmount> <totalTaxAmount>308.60</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>TK</company> </codeShareDetails> <codeShareDetails> <company>HR</company> </codeShareDetails> <codeShareDetails> <company>GP</company> </codeShareDetails> <monetaryDetails> <amountType>YQ</amountType> <amount>0.00</amount> </monetaryDetails> <monetaryDetails> <amountType>YR</amountType> <amount>221.00</amount> </monetaryDetails> <monetaryDetails> <amountType>Q</amountType> <amount>0.00</amount> </monetaryDetails> </paxFareDetail> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> <traveller> <ref>2</ref> </traveller> </paxReference> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>PEN</textSubjectQualifier> <informationType>70</informationType> </freeTextQualification> <description>TICKETS ARE NON-REFUNDABLE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>LTD</textSubjectQualifier> <informationType>41</informationType> </freeTextQualification> <description>LAST TKT DTE</description> <description>14OCT24</description> <description> - DATE OF ORIGIN</description> </pricingMessage> </fare> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>T</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>TN2XPBO</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>N</breakPoint> </productInformation> </groupOfFares> <groupOfFares> <productInformation> <cabinProduct> <rbd>T</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>TN2XPBO</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> <fareFamiliesRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> </paxFareProduct> </recommendation> <recommendation> <itemNumber> <itemNumberId> <number>2</number> </itemNumberId> </itemNumber> <fareFamilyRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>2</refNumber> </referencingDetail> </fareFamilyRef> <recPriceInfo> <monetaryDetail> <amount>1055.20</amount> </monetaryDetail> <monetaryDetail> <amount>617.20</amount> </monetaryDetail> <monetaryDetail> <amountType>YQ</amountType> <amount>0.00</amount> </monetaryDetail> <monetaryDetail> <amountType>YR</amountType> <amount>442.00</amount> </monetaryDetail> <monetaryDetail> <amountType>Q</amountType> <amount>0.00</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>527.60</totalFareAmount> <totalTaxAmount>308.60</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>TK</company> </codeShareDetails> <codeShareDetails> <company>HR</company> </codeShareDetails> <codeShareDetails> <company>GP</company> </codeShareDetails> <monetaryDetails> <amountType>YQ</amountType> <amount>0.00</amount> </monetaryDetails> <monetaryDetails> <amountType>YR</amountType> <amount>221.00</amount> </monetaryDetails> <monetaryDetails> <amountType>Q</amountType> <amount>0.00</amount> </monetaryDetails> </paxFareDetail> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> <traveller> <ref>2</ref> </traveller> </paxReference> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>PEN</textSubjectQualifier> <informationType>70</informationType> </freeTextQualification> <description>TICKETS ARE NON-REFUNDABLE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>LTD</textSubjectQualifier> <informationType>41</informationType> </freeTextQualification> <description>LAST TKT DTE</description> <description>14OCT24</description> <description> - DATE OF ORIGIN</description> </pricingMessage> </fare> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>Q</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>QN2PXOW</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>N</breakPoint> </productInformation> </groupOfFares> <groupOfFares> <productInformation> <cabinProduct> <rbd>Q</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>QN2PXOW</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> <fareFamiliesRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>2</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> </paxFareProduct> </recommendation> <recommendation> <itemNumber> <itemNumberId> <number>3</number> </itemNumberId> </itemNumber> <fareFamilyRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>3</refNumber> </referencingDetail> </fareFamilyRef> <recPriceInfo> <monetaryDetail> <amount>1733.20</amount> </monetaryDetail> <monetaryDetail> <amount>617.20</amount> </monetaryDetail> <monetaryDetail> <amountType>YQ</amountType> <amount>0.00</amount> </monetaryDetail> <monetaryDetail> <amountType>YR</amountType> <amount>442.00</amount> </monetaryDetail> <monetaryDetail> <amountType>Q</amountType> <amount>0.00</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>866.60</totalFareAmount> <totalTaxAmount>308.60</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>TK</company> </codeShareDetails> <codeShareDetails> <company>HR</company> </codeShareDetails> <codeShareDetails> <company>GP</company> </codeShareDetails> <monetaryDetails> <amountType>YQ</amountType> <amount>0.00</amount> </monetaryDetails> <monetaryDetails> <amountType>YR</amountType> <amount>221.00</amount> </monetaryDetails> <monetaryDetails> <amountType>Q</amountType> <amount>0.00</amount> </monetaryDetails> </paxFareDetail> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> <traveller> <ref>2</ref> </traveller> </paxReference> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>PEN</textSubjectQualifier> <informationType>70</informationType> </freeTextQualification> <description>TICKETS ARE NON-REFUNDABLE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>LTD</textSubjectQualifier> <informationType>41</informationType> </freeTextQualification> <description>LAST TKT DTE</description> <description>14OCT24</description> <description> - DATE OF ORIGIN</description> </pricingMessage> </fare> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>H</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>HN2XOX</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>N</breakPoint> </productInformation> </groupOfFares> <groupOfFares> <productInformation> <cabinProduct> <rbd>H</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>HN2XOX</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> <fareFamiliesRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>3</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> </paxFareProduct> </recommendation> <serviceFeesGrp> <serviceTypeInfo> <carrierFeeDetails> <type>OC</type> </carrierFeeDetails> </serviceTypeInfo> <globalMessageMarker></globalMessageMarker> <serviceDetailsGrp> <serviceOptionInfo> <dataTypeInformation> <subType>09Q</subType> </dataTypeInformation> </serviceOptionInfo> <feeDescriptionGrp> <itemNumberInfo> <itemNumberDetails> <number>1</number> <type>SD</type> </itemNumberDetails> </itemNumberInfo> <serviceAttributesInfo> <attributeDetails> <attributeType>SSR</attributeType> <attributeDescription>RFIC</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>RFIC</attributeType> <attributeDescription>C</attributeDescription> </attributeDetails> </serviceAttributesInfo> <serviceDescriptionInfo> <serviceRequirementsInfo> <serviceClassification>C</serviceClassification> <serviceMarketingCarrier>TK</serviceMarketingCarrier> <serviceGroup>BG</serviceGroup> <serviceSubGroup>CY</serviceSubGroup> <serviceFreeText>4Y</serviceFreeText> </serviceRequirementsInfo> </serviceDescriptionInfo> <commercialName> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>1 PIECE X 8 KG CABIN BAGGAGE</freeText> </commercialName> </feeDescriptionGrp> </serviceDetailsGrp> <serviceDetailsGrp> <serviceOptionInfo> <dataTypeInformation> <subType>BAG</subType> </dataTypeInformation> </serviceOptionInfo> <feeDescriptionGrp> <itemNumberInfo> <itemNumberDetails> <number>2</number> <type>SD</type> </itemNumberDetails> </itemNumberInfo> <serviceAttributesInfo> <attributeDetails> <attributeType>SSR</attributeType> <attributeDescription>RFIC</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>RFIC</attributeType> <attributeDescription>C</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>BKM</attributeType> <attributeDescription>01</attributeDescription> </attributeDetails> </serviceAttributesInfo> <serviceDescriptionInfo> <serviceRequirementsInfo> <serviceClassification>C</serviceClassification> <serviceMarketingCarrier>TK</serviceMarketingCarrier> <serviceGroup>BG</serviceGroup> </serviceRequirementsInfo> </serviceDescriptionInfo> <commercialName> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>BAG INCLUDED</freeText> </commercialName> </feeDescriptionGrp> </serviceDetailsGrp> <serviceDetailsGrp> <serviceOptionInfo> <dataTypeInformation> <subType>0AK</subType> </dataTypeInformation> </serviceOptionInfo> <feeDescriptionGrp> <itemNumberInfo> <itemNumberDetails> <number>3</number> <type>SD</type> </itemNumberDetails> </itemNumberInfo> <serviceDescriptionInfo> <serviceRequirementsInfo> <serviceClassification>F</serviceClassification> <serviceMarketingCarrier>TK</serviceMarketingCarrier> <serviceGroup>ML</serviceGroup> <serviceSubGroup>DI</serviceSubGroup> </serviceRequirementsInfo> </serviceDescriptionInfo> <commercialName> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>MEAL SERVICE</freeText> </commercialName> </feeDescriptionGrp> </serviceDetailsGrp> <serviceDetailsGrp> <serviceOptionInfo> <dataTypeInformation> <subType>050</subType> </dataTypeInformation> </serviceOptionInfo> <feeDescriptionGrp> <itemNumberInfo> <itemNumberDetails> <number>4</number> <type>SD</type> </itemNumberDetails> </itemNumberInfo> <serviceDescriptionInfo> <serviceRequirementsInfo> <serviceClassification>Z</serviceClassification> <serviceMarketingCarrier>TK</serviceMarketingCarrier> <serviceGroup>BF</serviceGroup> <serviceSubGroup>SE</serviceSubGroup> <serviceFreeText>BS</serviceFreeText> </serviceRequirementsInfo> </serviceDescriptionInfo> <commercialName> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>STANDART SEAT SELECTION</freeText> </commercialName> </feeDescriptionGrp> </serviceDetailsGrp> <serviceDetailsGrp> <serviceOptionInfo> <dataTypeInformation> <subType>056</subType> </dataTypeInformation> </serviceOptionInfo> <feeDescriptionGrp> <itemNumberInfo> <itemNumberDetails> <number>5</number> <type>SD</type> </itemNumberDetails> </itemNumberInfo> <serviceDescriptionInfo> <serviceRequirementsInfo> <serviceClassification>Z</serviceClassification> <serviceMarketingCarrier>TK</serviceMarketingCarrier> <serviceGroup>BF</serviceGroup> <serviceSubGroup>RF</serviceSubGroup> </serviceRequirementsInfo> </serviceDescriptionInfo> <commercialName> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>REFUNDABLE TICKET</freeText> </commercialName> </feeDescriptionGrp> </serviceDetailsGrp> <serviceDetailsGrp> <serviceOptionInfo> <dataTypeInformation> <subType>059</subType> </dataTypeInformation> </serviceOptionInfo> <feeDescriptionGrp> <itemNumberInfo> <itemNumberDetails> <number>6</number> <type>SD</type> </itemNumberDetails> </itemNumberInfo> <serviceDescriptionInfo> <serviceRequirementsInfo> <serviceClassification>Z</serviceClassification> <serviceMarketingCarrier>TK</serviceMarketingCarrier> <serviceGroup>BF</serviceGroup> <serviceSubGroup>VC</serviceSubGroup> <serviceFreeText>CD</serviceFreeText> </serviceRequirementsInfo> </serviceDescriptionInfo> <commercialName> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>CHANGEABLE TICKET</freeText> </commercialName> </feeDescriptionGrp> </serviceDetailsGrp> <serviceDetailsGrp> <serviceOptionInfo> <dataTypeInformation> <subType>CNR</subType> </dataTypeInformation> </serviceOptionInfo> <feeDescriptionGrp> <itemNumberInfo> <itemNumberDetails> <number>7</number> <type>SD</type> </itemNumberDetails> </itemNumberInfo> <serviceAttributesInfo> <attributeDetails> <attributeType>SSR</attributeType> <attributeDescription>INMR</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>RFIC</attributeType> <attributeDescription>G</attributeDescription> </attributeDetails> </serviceAttributesInfo> <serviceDescriptionInfo> <serviceRequirementsInfo> <serviceClassification>F</serviceClassification> <serviceMarketingCarrier>TK</serviceMarketingCarrier> <serviceGroup>IE</serviceGroup> <serviceSubGroup>IT</serviceSubGroup> </serviceRequirementsInfo> </serviceDescriptionInfo> <commercialName> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>ONLINE MESSAGE RIGHT</freeText> </commercialName> </feeDescriptionGrp> </serviceDetailsGrp> </serviceFeesGrp> <serviceFeesGrp> <serviceTypeInfo> <carrierFeeDetails> <type>FBA</type> </carrierFeeDetails> </serviceTypeInfo> <serviceCoverageInfoGrp> <itemNumberInfo> <itemNumber> <number>1</number> </itemNumber> </itemNumberInfo> <serviceCovInfoGrp> <paxRefInfo> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </paxRefInfo> <coveragePerFlightsInfo> <numberOfItemsDetails> <referenceQualifier>RS</referenceQualifier> <refNum>1</refNum> </numberOfItemsDetails> <lastItemsDetails> <refOfLeg>1</refOfLeg> </lastItemsDetails> <lastItemsDetails> <refOfLeg>2</refOfLeg> </lastItemsDetails> </coveragePerFlightsInfo> <refInfo> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> </refInfo> </serviceCovInfoGrp> </serviceCoverageInfoGrp> <globalMessageMarker></globalMessageMarker> <freeBagAllowanceGrp> <freeBagAllownceInfo> <baggageDetails> <freeAllowance>2</freeAllowance> <quantityCode>N</quantityCode> </baggageDetails> </freeBagAllownceInfo> <itemNumberInfo> <itemNumberDetails> <number>1</number> </itemNumberDetails> </itemNumberInfo> </freeBagAllowanceGrp> </serviceFeesGrp> </Fare\_EnrichTravelProposalsReply>

## 5.6.3 Possible Errors

If a wrong value is provided then an error is generated and the functional reject generated with following message - 966 - Bad value (coded) - pricingTickInfo When no fare is found 866 - NO FARE FOUND FOR REQUESTED ITINERARY

* * *

## 5.7 Operation: 03.01 Output Option - Identify YQ/YR tax amounts in Output

The purpose of this option is to separately return the total amount of YQ/YR taxes per recommendation and per passenger type in output. This includes the fuel surcharge and whatever other surcharge/tax there might be.

There is no way to specifically identify the fuel surcharge among the YQ/YR surcharges.

As YQ/YR are mainly filed for Fuel surcharge application purposes and as they must be displayed separately from the other taxes for legal reasons in some countries (for example, US), this option allows to get those amounts in output. This option does not have any effect on other returned amounts.

This option is triggered by a setting at office ID level implying there is no change in the input but the response will vary depending on the setting done for the targeted office ID.

Syntax at recommendation level:

<recommendation>  
     <recPriceInfo\>  
       <monetaryDetail\>  
         **<amountType>YQ</amountType>**    
         **<amount>10.00</amount>**         </monetaryDetail\>  
       <monetaryDetail>  
         **<amountType>YR</amountType>**    
         **<amount>5.00</amount>**         </monetaryDetail>  
     </recPriceInfo>  
</recommendation>

Syntax at passenger fee detail level:

<recommendation>  
   <paxFareProduct>  
     <paxFareDetail>  
       <monetaryDetails>  
         **<amountType>YQ</amountType>**    
         **<amount>10.00</amount>**         </monetaryDetails>  
       <monetaryDetails>  
         **<amountType>YR</amountType>**    
         **<amount>5.00</amount>**         </monetaryDetails>  
     <paxFareDetail>  
   </paxFareProduct>  
</recommendation>

## 5.7.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_EnrichTravelProposals xmlns="http://xml.amadeus.com/FMPXAQ\_24\_6\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>2</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> <traveller> <ref>2</ref> </traveller> </paxReference> <fareOptions> <pricingTickInfo> <pricingTicketing> <priceType>RU</priceType> <priceType>RP</priceType> <priceType>TAC</priceType> </pricingTicketing> </pricingTickInfo> <feeIdDescription> <feeId> <feeType>FFI</feeType> <feeIdNumber>3</feeIdNumber> </feeId> <feeId> <feeType>UPC</feeType> <feeIdNumber>6</feeIdNumber> </feeId> </feeIdDescription> </fareOptions> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>NCE</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>NYC</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>141024</date> </firstDateTimeDetail> </timeDetails> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>1</ref> </flightProposal> <flightProposal> <ref>2830</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>TK</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>141024</dateOfDeparture> <timeOfDeparture>1920</timeOfDeparture> <dateOfArrival>141024</dateOfArrival> <timeOfArrival>2320</timeOfArrival> </productDateTime> <location> <locationId>NCE</locationId> <terminal>1</terminal> </location> <location> <locationId>IST</locationId> </location> <companyId> <marketingCarrier>TK</marketingCarrier> <operatingCarrier>TK</operatingCarrier> </companyId> <flightOrtrainNumber>1816</flightOrtrainNumber> <productDetail> <equipmentType>321</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> <productDetailQualifier>AVR</productDetailQualifier> </addProductDetail> </flightInformation> </flightDetails> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>151024</dateOfDeparture> <timeOfDeparture>1405</timeOfDeparture> <dateOfArrival>151024</dateOfArrival> <timeOfArrival>1750</timeOfArrival> </productDateTime> <location> <locationId>IST</locationId> </location> <location> <locationId>JFK</locationId> <terminal>1</terminal> </location> <companyId> <marketingCarrier>TK</marketingCarrier> <operatingCarrier>TK</operatingCarrier> </companyId> <flightOrtrainNumber>1</flightOrtrainNumber> <productDetail> <equipmentType>77W</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> <productDetailQualifier>LCA</productDetailQualifier> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> </itinerary> </Fare\_EnrichTravelProposals>

## 5.7.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_EnrichTravelProposalsReply xmlns="http://xml.amadeus.com/FMPXAR\_24\_6\_1A"> <replyStatus> <status> <advisoryTypeInfo>FQX</advisoryTypeInfo> </status> </replyStatus> <conversionRate> <conversionRateDetail> <currency>USD</currency> </conversionRateDetail> </conversionRate> <familyInformation> <refNumber>1</refNumber> <fareFamilyname>PS</fareFamilyname> <description>PROMOTIONAL</description> <carrier>TK</carrier> <services> <reference>1</reference> <status>INC</status> </services> <services> <reference>2</reference> <status>INC</status> </services> <services> <reference>3</reference> <status>INC</status> </services> <services> <reference>4</reference> <status>CHA</status> </services> <services> <reference>5</reference> <status>NOF</status> </services> <services> <reference>6</reference> <status>CHA</status> </services> <services> <reference>7</reference> <status>INC</status> </services> </familyInformation> <familyInformation> <refNumber>2</refNumber> <fareFamilyname>RS</fareFamilyname> <description>RESTRICTED</description> <carrier>TK</carrier> <services> <reference>1</reference> <status>INC</status> </services> <services> <reference>2</reference> <status>INC</status> </services> <services> <reference>3</reference> <status>INC</status> </services> <services> <reference>4</reference> <status>CHA</status> </services> <services> <reference>5</reference> <status>CHA</status> </services> <services> <reference>6</reference> <status>CHA</status> </services> <services> <reference>7</reference> <status>INC</status> </services> </familyInformation> <familyInformation> <refNumber>3</refNumber> <fareFamilyname>FX</fareFamilyname> <description>FLEXIBLE</description> <carrier>TK</carrier> <services> <reference>1</reference> <status>INC</status> </services> <services> <reference>2</reference> <status>INC</status> </services> <services> <reference>3</reference> <status>INC</status> </services> <services> <reference>4</reference> <status>CHA</status> </services> <services> <reference>5</reference> <status>INC</status> </services> <services> <reference>6</reference> <status>INC</status> </services> <services> <reference>7</reference> <status>INC</status> </services> </familyInformation> <flightIndex> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>1</ref> </flightProposal> <flightProposal> <ref>2855</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>TK</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>141024</dateOfDeparture> <timeOfDeparture>1835</timeOfDeparture> <dateOfArrival>141024</dateOfArrival> <timeOfArrival>2240</timeOfArrival> </productDateTime> <location> <locationId>NCE</locationId> <terminal>1</terminal> </location> <location> <locationId>IST</locationId> </location> <companyId> <marketingCarrier>TK</marketingCarrier> <operatingCarrier>TK</operatingCarrier> </companyId> <flightOrtrainNumber>1816</flightOrtrainNumber> <productDetail> <equipmentType>32B</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> <productDetailQualifier>LCA</productDetailQualifier> </addProductDetail> </flightInformation> </flightDetails> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>151024</dateOfDeparture> <timeOfDeparture>1345</timeOfDeparture> <dateOfArrival>151024</dateOfArrival> <timeOfArrival>1730</timeOfArrival> </productDateTime> <location> <locationId>IST</locationId> </location> <location> <locationId>JFK</locationId> <terminal>1</terminal> </location> <companyId> <marketingCarrier>TK</marketingCarrier> <operatingCarrier>TK</operatingCarrier> </companyId> <flightOrtrainNumber>1</flightOrtrainNumber> <productDetail> <equipmentType>77W</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> <productDetailQualifier>LCA</productDetailQualifier> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> </flightIndex> <recommendation> <itemNumber> <itemNumberId> <number>1</number> </itemNumberId> </itemNumber> <fareFamilyRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> </fareFamilyRef> <recPriceInfo> <monetaryDetail> <amount>965.20</amount> </monetaryDetail> <monetaryDetail> <amount>617.20</amount> </monetaryDetail> <monetaryDetail> <amountType>YQ</amountType> <amount>0.00</amount> </monetaryDetail> <monetaryDetail> <amountType>YR</amountType> <amount>442.00</amount> </monetaryDetail> <monetaryDetail> <amountType>Q</amountType> <amount>0.00</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>U</refQualifier> <refNumber>2</refNumber> </referencingDetail> <referencingDetail> <refQualifier>U</refQualifier> <refNumber>3</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>482.60</totalFareAmount> <totalTaxAmount>308.60</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>TK</company> </codeShareDetails> <codeShareDetails> <company>HR</company> </codeShareDetails> <codeShareDetails> <company>GP</company> </codeShareDetails> <monetaryDetails> <amountType>YQ</amountType> <amount>0.00</amount> </monetaryDetails> <monetaryDetails> <amountType>YR</amountType> <amount>221.00</amount> </monetaryDetails> <monetaryDetails> <amountType>Q</amountType> <amount>0.00</amount> </monetaryDetails> </paxFareDetail> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> <traveller> <ref>2</ref> </traveller> </paxReference> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>PEN</textSubjectQualifier> <informationType>70</informationType> </freeTextQualification> <description>TICKETS ARE NON-REFUNDABLE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>LTD</textSubjectQualifier> <informationType>41</informationType> </freeTextQualification> <description>LAST TKT DTE</description> <description>14OCT24</description> <description> - DATE OF ORIGIN</description> </pricingMessage> </fare> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>T</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>TN2XPBO</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>N</breakPoint> </productInformation> </groupOfFares> <groupOfFares> <productInformation> <cabinProduct> <rbd>T</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>TN2XPBO</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> <fareFamiliesRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> </paxFareProduct> </recommendation> <recommendation> <itemNumber> <itemNumberId> <number>2</number> </itemNumberId> </itemNumber> <fareFamilyRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>2</refNumber> </referencingDetail> </fareFamilyRef> <recPriceInfo> <monetaryDetail> <amount>1055.20</amount> </monetaryDetail> <monetaryDetail> <amount>617.20</amount> </monetaryDetail> <monetaryDetail> <amountType>YQ</amountType> <amount>0.00</amount> </monetaryDetail> <monetaryDetail> <amountType>YR</amountType> <amount>442.00</amount> </monetaryDetail> <monetaryDetail> <amountType>Q</amountType> <amount>0.00</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>527.60</totalFareAmount> <totalTaxAmount>308.60</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>TK</company> </codeShareDetails> <codeShareDetails> <company>HR</company> </codeShareDetails> <codeShareDetails> <company>GP</company> </codeShareDetails> <monetaryDetails> <amountType>YQ</amountType> <amount>0.00</amount> </monetaryDetails> <monetaryDetails> <amountType>YR</amountType> <amount>221.00</amount> </monetaryDetails> <monetaryDetails> <amountType>Q</amountType> <amount>0.00</amount> </monetaryDetails> </paxFareDetail> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> <traveller> <ref>2</ref> </traveller> </paxReference> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>PEN</textSubjectQualifier> <informationType>70</informationType> </freeTextQualification> <description>TICKETS ARE NON-REFUNDABLE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>LTD</textSubjectQualifier> <informationType>41</informationType> </freeTextQualification> <description>LAST TKT DTE</description> <description>14OCT24</description> <description> - DATE OF ORIGIN</description> </pricingMessage> </fare> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>Q</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>QN2PXOW</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>N</breakPoint> </productInformation> </groupOfFares> <groupOfFares> <productInformation> <cabinProduct> <rbd>Q</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>QN2PXOW</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> <fareFamiliesRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>2</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> </paxFareProduct> </recommendation> <recommendation> <itemNumber> <itemNumberId> <number>3</number> </itemNumberId> </itemNumber> <fareFamilyRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>3</refNumber> </referencingDetail> </fareFamilyRef> <recPriceInfo> <monetaryDetail> <amount>1733.20</amount> </monetaryDetail> <monetaryDetail> <amount>617.20</amount> </monetaryDetail> <monetaryDetail> <amountType>YQ</amountType> <amount>0.00</amount> </monetaryDetail> <monetaryDetail> <amountType>YR</amountType> <amount>442.00</amount> </monetaryDetail> <monetaryDetail> <amountType>Q</amountType> <amount>0.00</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>866.60</totalFareAmount> <totalTaxAmount>308.60</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>TK</company> </codeShareDetails> <codeShareDetails> <company>HR</company> </codeShareDetails> <codeShareDetails> <company>GP</company> </codeShareDetails> <monetaryDetails> <amountType>YQ</amountType> <amount>0.00</amount> </monetaryDetails> <monetaryDetails> <amountType>YR</amountType> <amount>221.00</amount> </monetaryDetails> <monetaryDetails> <amountType>Q</amountType> <amount>0.00</amount> </monetaryDetails> </paxFareDetail> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> <traveller> <ref>2</ref> </traveller> </paxReference> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>PEN</textSubjectQualifier> <informationType>70</informationType> </freeTextQualification> <description>TICKETS ARE NON-REFUNDABLE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>LTD</textSubjectQualifier> <informationType>41</informationType> </freeTextQualification> <description>LAST TKT DTE</description> <description>14OCT24</description> <description> - DATE OF ORIGIN</description> </pricingMessage> </fare> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>H</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>HN2XOX</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>N</breakPoint> </productInformation> </groupOfFares> <groupOfFares> <productInformation> <cabinProduct> <rbd>H</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>HN2XOX</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> <fareFamiliesRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>3</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> </paxFareProduct> </recommendation> <serviceFeesGrp> <serviceTypeInfo> <carrierFeeDetails> <type>OC</type> </carrierFeeDetails> </serviceTypeInfo> <globalMessageMarker></globalMessageMarker> <serviceDetailsGrp> <serviceOptionInfo> <dataTypeInformation> <subType>09Q</subType> </dataTypeInformation> </serviceOptionInfo> <feeDescriptionGrp> <itemNumberInfo> <itemNumberDetails> <number>1</number> <type>SD</type> </itemNumberDetails> </itemNumberInfo> <serviceAttributesInfo> <attributeDetails> <attributeType>SSR</attributeType> <attributeDescription>RFIC</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>RFIC</attributeType> <attributeDescription>C</attributeDescription> </attributeDetails> </serviceAttributesInfo> <serviceDescriptionInfo> <serviceRequirementsInfo> <serviceClassification>C</serviceClassification> <serviceMarketingCarrier>TK</serviceMarketingCarrier> <serviceGroup>BG</serviceGroup> <serviceSubGroup>CY</serviceSubGroup> <serviceFreeText>4Y</serviceFreeText> </serviceRequirementsInfo> </serviceDescriptionInfo> <commercialName> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>1 PIECE X 8 KG CABIN BAGGAGE</freeText> </commercialName> </feeDescriptionGrp> </serviceDetailsGrp> <serviceDetailsGrp> <serviceOptionInfo> <dataTypeInformation> <subType>BAG</subType> </dataTypeInformation> </serviceOptionInfo> <feeDescriptionGrp> <itemNumberInfo> <itemNumberDetails> <number>2</number> <type>SD</type> </itemNumberDetails> </itemNumberInfo> <serviceAttributesInfo> <attributeDetails> <attributeType>SSR</attributeType> <attributeDescription>RFIC</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>RFIC</attributeType> <attributeDescription>C</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>BKM</attributeType> <attributeDescription>01</attributeDescription> </attributeDetails> </serviceAttributesInfo> <serviceDescriptionInfo> <serviceRequirementsInfo> <serviceClassification>C</serviceClassification> <serviceMarketingCarrier>TK</serviceMarketingCarrier> <serviceGroup>BG</serviceGroup> </serviceRequirementsInfo> </serviceDescriptionInfo> <commercialName> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>BAG INCLUDED</freeText> </commercialName> </feeDescriptionGrp> </serviceDetailsGrp> <serviceDetailsGrp> <serviceOptionInfo> <dataTypeInformation> <subType>0AK</subType> </dataTypeInformation> </serviceOptionInfo> <feeDescriptionGrp> <itemNumberInfo> <itemNumberDetails> <number>3</number> <type>SD</type> </itemNumberDetails> </itemNumberInfo> <serviceDescriptionInfo> <serviceRequirementsInfo> <serviceClassification>F</serviceClassification> <serviceMarketingCarrier>TK</serviceMarketingCarrier> <serviceGroup>ML</serviceGroup> <serviceSubGroup>DI</serviceSubGroup> </serviceRequirementsInfo> </serviceDescriptionInfo> <commercialName> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>MEAL SERVICE</freeText> </commercialName> </feeDescriptionGrp> </serviceDetailsGrp> <serviceDetailsGrp> <serviceOptionInfo> <dataTypeInformation> <subType>050</subType> </dataTypeInformation> </serviceOptionInfo> <feeDescriptionGrp> <itemNumberInfo> <itemNumberDetails> <number>4</number> <type>SD</type> </itemNumberDetails> </itemNumberInfo> <serviceDescriptionInfo> <serviceRequirementsInfo> <serviceClassification>Z</serviceClassification> <serviceMarketingCarrier>TK</serviceMarketingCarrier> <serviceGroup>BF</serviceGroup> <serviceSubGroup>SE</serviceSubGroup> <serviceFreeText>BS</serviceFreeText> </serviceRequirementsInfo> </serviceDescriptionInfo> <commercialName> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>STANDART SEAT SELECTION</freeText> </commercialName> </feeDescriptionGrp> </serviceDetailsGrp> <serviceDetailsGrp> <serviceOptionInfo> <dataTypeInformation> <subType>056</subType> </dataTypeInformation> </serviceOptionInfo> <feeDescriptionGrp> <itemNumberInfo> <itemNumberDetails> <number>5</number> <type>SD</type> </itemNumberDetails> </itemNumberInfo> <serviceDescriptionInfo> <serviceRequirementsInfo> <serviceClassification>Z</serviceClassification> <serviceMarketingCarrier>TK</serviceMarketingCarrier> <serviceGroup>BF</serviceGroup> <serviceSubGroup>RF</serviceSubGroup> </serviceRequirementsInfo> </serviceDescriptionInfo> <commercialName> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>REFUNDABLE TICKET</freeText> </commercialName> </feeDescriptionGrp> </serviceDetailsGrp> <serviceDetailsGrp> <serviceOptionInfo> <dataTypeInformation> <subType>059</subType> </dataTypeInformation> </serviceOptionInfo> <feeDescriptionGrp> <itemNumberInfo> <itemNumberDetails> <number>6</number> <type>SD</type> </itemNumberDetails> </itemNumberInfo> <serviceDescriptionInfo> <serviceRequirementsInfo> <serviceClassification>Z</serviceClassification> <serviceMarketingCarrier>TK</serviceMarketingCarrier> <serviceGroup>BF</serviceGroup> <serviceSubGroup>VC</serviceSubGroup> <serviceFreeText>CD</serviceFreeText> </serviceRequirementsInfo> </serviceDescriptionInfo> <commercialName> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>CHANGEABLE TICKET</freeText> </commercialName> </feeDescriptionGrp> </serviceDetailsGrp> <serviceDetailsGrp> <serviceOptionInfo> <dataTypeInformation> <subType>CNR</subType> </dataTypeInformation> </serviceOptionInfo> <feeDescriptionGrp> <itemNumberInfo> <itemNumberDetails> <number>7</number> <type>SD</type> </itemNumberDetails> </itemNumberInfo> <serviceAttributesInfo> <attributeDetails> <attributeType>SSR</attributeType> <attributeDescription>INMR</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>RFIC</attributeType> <attributeDescription>G</attributeDescription> </attributeDetails> </serviceAttributesInfo> <serviceDescriptionInfo> <serviceRequirementsInfo> <serviceClassification>F</serviceClassification> <serviceMarketingCarrier>TK</serviceMarketingCarrier> <serviceGroup>IE</serviceGroup> <serviceSubGroup>IT</serviceSubGroup> </serviceRequirementsInfo> </serviceDescriptionInfo> <commercialName> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>ONLINE MESSAGE RIGHT</freeText> </commercialName> </feeDescriptionGrp> </serviceDetailsGrp> </serviceFeesGrp> <serviceFeesGrp> <serviceTypeInfo> <carrierFeeDetails> <type>FBA</type> </carrierFeeDetails> </serviceTypeInfo> <serviceCoverageInfoGrp> <itemNumberInfo> <itemNumber> <number>1</number> </itemNumber> </itemNumberInfo> <serviceCovInfoGrp> <paxRefInfo> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </paxRefInfo> <coveragePerFlightsInfo> <numberOfItemsDetails> <referenceQualifier>RS</referenceQualifier> <refNum>1</refNum> </numberOfItemsDetails> <lastItemsDetails> <refOfLeg>1</refOfLeg> </lastItemsDetails> <lastItemsDetails> <refOfLeg>2</refOfLeg> </lastItemsDetails> </coveragePerFlightsInfo> <refInfo> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> </refInfo> </serviceCovInfoGrp> </serviceCoverageInfoGrp> <globalMessageMarker></globalMessageMarker> <freeBagAllowanceGrp> <freeBagAllownceInfo> <baggageDetails> <freeAllowance>2</freeAllowance> <quantityCode>N</quantityCode> </baggageDetails> </freeBagAllownceInfo> <itemNumberInfo> <itemNumberDetails> <number>1</number> </itemNumberDetails> </itemNumberInfo> </freeBagAllowanceGrp> </serviceFeesGrp> </Fare\_EnrichTravelProposalsReply>

## 5.7.3 Possible Errors

See "Error Messages" section.

* * *

## 5.8 Operation: 03.02 Output Option - Fare Family information

Depending on Office ID setting and input option (FFI), this operation will target returning :

-   The airline fare family name at fare component level and/or at requested segment level.
-   The airline fare family tier/rank (explicit activation required).
-   The airline fare family description per requested segment consistently with airline filling:
    -   All the services included in the fare family for free
    -   All the services that can be bought at a charge
    -   All the services that are not offered for this fare family but that should be displayed to the customer.

Input option for the fee type FFI should be provided with a value=3.

Fare family information value

3

FF name at fare component level

x

FF tier/rank

x

Resulting FF name at requested segment level

x

Services of the resulting FF

x

Syntax Request :

 <fareOptions>  
     <feeIdDescription>  
       <feeId>  
         **<feeType>FFI</feeType>  
         **<feeIdNumber>3</feeIdNumber>****       </feeId>  
     </feeIdDescription>  
   </fareOptions>

Syntax Response :

The fare family details are persisted in 3 segments (each segment is detailed further with example) -

1.  Fare family information with details whether the service is chargeable etc.
2.  Reference of the applicable fare family at requested segment and fare componenet levels.
3.  Detailed description of each service with OC code (ancillary) and other details. 

For each service, the output should include commercial description (text) filed in by the airline as well as the OC subcode.

In the following example the response for inspection has been mentioned :

**1\. Fare family information** is available in the following segment and the list of services it has alongwith the means to avail it (whether chargeable / included etc) :

<**familyInformation**\>  
     <refNumber>1</refNumber>  
     <fareFamilyname>YH</fareFamilyname> <!-- Fare family name -->  
     <hierarchy>5</hierarchy>      <!-- Fare family tier/rank -->  
     <description>ECONOMY HBO</description> <!-- Commercial Fare family name -->  
     <carrier>EY</carrier> <!-- Carrier -->  
     <services>  
         <reference>1</reference>  
         <status>CHA</status>  
     </services>  
     <services>  
         <reference>2</reference>  
         <status>INC</status>  
     </services>  
     <services>  
         <reference>3</reference>  
         <status>CHA</status>  
     </services>  
     <services>  
         <reference>4</reference>  
         <status>NOF</status>  
     </services>  
     <services>  
         <reference>5</reference>  
         <status>CHA</status>  
     </services>  
     <services>  
         <reference>6</reference>  
         <status>CHA</status>  
     </services>  
     <services>  
         <reference>7</reference>  
         <status>NOF</status>  
     </services>  
</**familyInformation**\>

**Service status**

**Service status description**

CHA

Service available at charge

INC

Service Included

NOF

Service Not offered

**2\. Fare family association in the recommendation offered**:

At **requested segment level**:

-   Fare family YH is applied on fare component DXB-DOH.

<recommendation>  
   <fareFamilyRef>  
     <referencingDetail>  
       <refQualifier>F</refQualifier> <!-- Qualifier to associate are family reference -->  
       <refNumber>1</refNumber> <!-- This is the refNumber under familyInformation of the applicable fare family-->  
     </referencingDetail>  
   </fareFamilyRef>  
</recommendation>  
     

At **fare component level**:

-   Fare family YH is applied on fare component DXB-DOH.

<recommendation>  
   <paxFareProduct>  
     <fareDetails>  
       <groupOfFares>  
         <fareFamiliesRef>  
           <referencingDetail>  
             <refQualifier>F</refQualifier> <!-- Qualifier to associate are family reference -->  
             <refNumber>1</refNumber> <!-- This is refNumber under familyInformation of the applicable fare family-->  
           </referencingDetail>  
         </fareFamiliesRef>  
       </groupOfFares>  
     </fareDetails>  
   </paxFareProduct>  
</recommendation>

**3\. Details of Ancillaries offered with the **Fare family**** (sample XML from response for the first OC service only) :

<serviceFeesGrp>  
     <serviceTypeInfo>  
       <carrierFeeDetails>  
         <type>OC</type>   
       </carrierFeeDetails>  
     </serviceTypeInfo>  
     <serviceDetailsGrp>  
       <serviceOptionInfo>  
         <dataTypeInformation>   
           <subType>**0H6**</subType>  <!-- OC sub code -->  
         </dataTypeInformation>  
       </serviceOptionInfo>  
       <feeDescriptionGrp>  
         <itemNumberInfo>   
           <itemNumberDetails>  
             <number>1</number>  
             <type>SD</type>  
           </itemNumberDetails>  
       </itemNumberInfo>  
       <serviceAttributesInfo>   
           <attributeDetails>  
             <attributeType>SSR</attributeType>  
             <attributeDescription>ASVC</attributeDescription>  
           </attributeDetails>  
           <attributeDetails>  
             <attributeType>RFIC</attributeType>  
             <attributeDescription>C</attributeDescription>  
           </attributeDetails>  
           <attributeDetails>  
             <attributeType>BKM</attributeType>  
             <attributeDescription>01</attributeDescription>  
           </attributeDetails>  
       </serviceAttributesInfo>  
       <serviceDescriptionInfo>   
           <serviceRequirementsInfo>  
             <serviceClassification>C</serviceClassification>  
             <serviceMarketingCarrier>EY</serviceMarketingCarrier>  
             <serviceGroup>**BG**</serviceGroup>  
             <serviceFreeText>X8</serviceFreeText>  
             <serviceFreeText>X0</serviceFreeText>  
           </serviceRequirementsInfo>  
       </serviceDescriptionInfo>  
       <commercialName>   
           <freeTextQualification>  
             <textSubjectQualifier>3</textSubjectQualifier>  
           </freeTextQualification>  
           <freeText>**PREPAID EXCESS BAGGAGE**</freeText> <!-- Commercial Description -->  
       </commercialName>  
     </feeDescriptionGrp>  
</serviceFeesGrp>

**YH fare** **family description details**:

-   Fare Family short description: ECONOMY HBO
-   Services included:
    -   OC Sub code: 0B3
    -   Commercial description: FOOD AND BEVERAGE
-   Services at a charge:
    
    -   OC Sub code: 0H6
    -   Commercial description: PREPAID EXCESS BAGGAGE
    
    -   OC Sub code: 03P
    -   Commercial description: PRIORITY ACCESS
    
    -   OC Sub code: 013
    -   Commercial description: AUH ARRIVAL LOUNGE
    
    -   OC Sub code: 050
    -   Commercial description: STANDARD SEAT SELECTION
-   Services not offered:
    -   OC Sub code 0NN
    -   Commercial description: NO SHOW FEE
    -   OC Sub code: 056
    -   Commercial description: REFUNDABLE TICKET

## 5.8.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_EnrichTravelProposals xmlns="http://xml.amadeus.com/FMPXAQ\_24\_6\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>2</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> <traveller> <ref>2</ref> </traveller> </paxReference> <fareOptions> <pricingTickInfo> <pricingTicketing> <priceType>RU</priceType> <priceType>RP</priceType> <priceType>TAC</priceType> </pricingTicketing> </pricingTickInfo> <feeIdDescription> <feeId> <feeType>FFI</feeType> <feeIdNumber>3</feeIdNumber> </feeId> <feeId> <feeType>UPC</feeType> <feeIdNumber>9</feeIdNumber> </feeId> </feeIdDescription> </fareOptions> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>NCE</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>NYC</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>141024</date> </firstDateTimeDetail> </timeDetails> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>1</ref> </flightProposal> <flightProposal> <ref>2830</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>TK</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>141024</dateOfDeparture> <timeOfDeparture>1920</timeOfDeparture> <dateOfArrival>141024</dateOfArrival> <timeOfArrival>2320</timeOfArrival> </productDateTime> <location> <locationId>NCE</locationId> <terminal>1</terminal> </location> <location> <locationId>IST</locationId> </location> <companyId> <marketingCarrier>TK</marketingCarrier> <operatingCarrier>TK</operatingCarrier> </companyId> <flightOrtrainNumber>1816</flightOrtrainNumber> <productDetail> <equipmentType>321</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> <productDetailQualifier>AVR</productDetailQualifier> </addProductDetail> </flightInformation> </flightDetails> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>151024</dateOfDeparture> <timeOfDeparture>1405</timeOfDeparture> <dateOfArrival>151024</dateOfArrival> <timeOfArrival>1750</timeOfArrival> </productDateTime> <location> <locationId>IST</locationId> </location> <location> <locationId>JFK</locationId> <terminal>1</terminal> </location> <companyId> <marketingCarrier>TK</marketingCarrier> <operatingCarrier>TK</operatingCarrier> </companyId> <flightOrtrainNumber>1</flightOrtrainNumber> <productDetail> <equipmentType>77W</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> <productDetailQualifier>LCA</productDetailQualifier> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> </itinerary> </Fare\_EnrichTravelProposals>

## 5.8.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_EnrichTravelProposalsReply xmlns="http://xml.amadeus.com/FMPXAR\_24\_6\_1A"> <replyStatus> <status> <advisoryTypeInfo>FQX</advisoryTypeInfo> </status> </replyStatus> <conversionRate> <conversionRateDetail> <currency>USD</currency> </conversionRateDetail> </conversionRate> <familyInformation> <refNumber>1</refNumber> <fareFamilyname>PS</fareFamilyname> <description>PROMOTIONAL</description> <carrier>TK</carrier> <services> <reference>1</reference> <status>INC</status> </services> <services> <reference>2</reference> <status>INC</status> </services> <services> <reference>3</reference> <status>INC</status> </services> <services> <reference>4</reference> <status>CHA</status> </services> <services> <reference>5</reference> <status>NOF</status> </services> <services> <reference>6</reference> <status>CHA</status> </services> <services> <reference>7</reference> <status>INC</status> </services> </familyInformation> <familyInformation> <refNumber>2</refNumber> <fareFamilyname>RS</fareFamilyname> <description>RESTRICTED</description> <carrier>TK</carrier> <services> <reference>1</reference> <status>INC</status> </services> <services> <reference>2</reference> <status>INC</status> </services> <services> <reference>3</reference> <status>INC</status> </services> <services> <reference>4</reference> <status>CHA</status> </services> <services> <reference>5</reference> <status>CHA</status> </services> <services> <reference>6</reference> <status>CHA</status> </services> <services> <reference>7</reference> <status>INC</status> </services> </familyInformation> <familyInformation> <refNumber>3</refNumber> <fareFamilyname>FX</fareFamilyname> <description>FLEXIBLE</description> <carrier>TK</carrier> <services> <reference>1</reference> <status>INC</status> </services> <services> <reference>2</reference> <status>INC</status> </services> <services> <reference>3</reference> <status>INC</status> </services> <services> <reference>4</reference> <status>CHA</status> </services> <services> <reference>5</reference> <status>INC</status> </services> <services> <reference>6</reference> <status>INC</status> </services> <services> <reference>7</reference> <status>INC</status> </services> </familyInformation> <flightIndex> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>1</ref> </flightProposal> <flightProposal> <ref>2855</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>TK</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>141024</dateOfDeparture> <timeOfDeparture>1835</timeOfDeparture> <dateOfArrival>141024</dateOfArrival> <timeOfArrival>2240</timeOfArrival> </productDateTime> <location> <locationId>NCE</locationId> <terminal>1</terminal> </location> <location> <locationId>IST</locationId> </location> <companyId> <marketingCarrier>TK</marketingCarrier> <operatingCarrier>TK</operatingCarrier> </companyId> <flightOrtrainNumber>1816</flightOrtrainNumber> <productDetail> <equipmentType>32B</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> <productDetailQualifier>LCA</productDetailQualifier> </addProductDetail> </flightInformation> </flightDetails> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>151024</dateOfDeparture> <timeOfDeparture>1345</timeOfDeparture> <dateOfArrival>151024</dateOfArrival> <timeOfArrival>1730</timeOfArrival> </productDateTime> <location> <locationId>IST</locationId> </location> <location> <locationId>JFK</locationId> <terminal>1</terminal> </location> <companyId> <marketingCarrier>TK</marketingCarrier> <operatingCarrier>TK</operatingCarrier> </companyId> <flightOrtrainNumber>1</flightOrtrainNumber> <productDetail> <equipmentType>77W</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> <productDetailQualifier>LCA</productDetailQualifier> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> </flightIndex> <recommendation> <itemNumber> <itemNumberId> <number>1</number> </itemNumberId> </itemNumber> <fareFamilyRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> </fareFamilyRef> <recPriceInfo> <monetaryDetail> <amount>965.20</amount> </monetaryDetail> <monetaryDetail> <amount>617.20</amount> </monetaryDetail> <monetaryDetail> <amountType>YQ</amountType> <amount>0.00</amount> </monetaryDetail> <monetaryDetail> <amountType>YR</amountType> <amount>442.00</amount> </monetaryDetail> <monetaryDetail> <amountType>Q</amountType> <amount>0.00</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>U</refQualifier> <refNumber>2</refNumber> </referencingDetail> <referencingDetail> <refQualifier>U</refQualifier> <refNumber>3</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>482.60</totalFareAmount> <totalTaxAmount>308.60</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>TK</company> </codeShareDetails> <codeShareDetails> <company>HR</company> </codeShareDetails> <codeShareDetails> <company>GP</company> </codeShareDetails> <monetaryDetails> <amountType>YQ</amountType> <amount>0.00</amount> </monetaryDetails> <monetaryDetails> <amountType>YR</amountType> <amount>221.00</amount> </monetaryDetails> <monetaryDetails> <amountType>Q</amountType> <amount>0.00</amount> </monetaryDetails> </paxFareDetail> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> <traveller> <ref>2</ref> </traveller> </paxReference> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>PEN</textSubjectQualifier> <informationType>70</informationType> </freeTextQualification> <description>TICKETS ARE NON-REFUNDABLE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>LTD</textSubjectQualifier> <informationType>41</informationType> </freeTextQualification> <description>LAST TKT DTE</description> <description>14OCT24</description> <description> - DATE OF ORIGIN</description> </pricingMessage> </fare> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>T</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>TN2XPBO</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>N</breakPoint> </productInformation> </groupOfFares> <groupOfFares> <productInformation> <cabinProduct> <rbd>T</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>TN2XPBO</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> <fareFamiliesRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> </paxFareProduct> </recommendation> <recommendation> <itemNumber> <itemNumberId> <number>2</number> </itemNumberId> </itemNumber> <fareFamilyRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>2</refNumber> </referencingDetail> </fareFamilyRef> <recPriceInfo> <monetaryDetail> <amount>1055.20</amount> </monetaryDetail> <monetaryDetail> <amount>617.20</amount> </monetaryDetail> <monetaryDetail> <amountType>YQ</amountType> <amount>0.00</amount> </monetaryDetail> <monetaryDetail> <amountType>YR</amountType> <amount>442.00</amount> </monetaryDetail> <monetaryDetail> <amountType>Q</amountType> <amount>0.00</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>527.60</totalFareAmount> <totalTaxAmount>308.60</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>TK</company> </codeShareDetails> <codeShareDetails> <company>HR</company> </codeShareDetails> <codeShareDetails> <company>GP</company> </codeShareDetails> <monetaryDetails> <amountType>YQ</amountType> <amount>0.00</amount> </monetaryDetails> <monetaryDetails> <amountType>YR</amountType> <amount>221.00</amount> </monetaryDetails> <monetaryDetails> <amountType>Q</amountType> <amount>0.00</amount> </monetaryDetails> </paxFareDetail> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> <traveller> <ref>2</ref> </traveller> </paxReference> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>PEN</textSubjectQualifier> <informationType>70</informationType> </freeTextQualification> <description>TICKETS ARE NON-REFUNDABLE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>LTD</textSubjectQualifier> <informationType>41</informationType> </freeTextQualification> <description>LAST TKT DTE</description> <description>14OCT24</description> <description> - DATE OF ORIGIN</description> </pricingMessage> </fare> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>Q</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>QN2PXOW</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>N</breakPoint> </productInformation> </groupOfFares> <groupOfFares> <productInformation> <cabinProduct> <rbd>Q</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>QN2PXOW</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> <fareFamiliesRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>2</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> </paxFareProduct> </recommendation> <recommendation> <itemNumber> <itemNumberId> <number>3</number> </itemNumberId> </itemNumber> <fareFamilyRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>3</refNumber> </referencingDetail> </fareFamilyRef> <recPriceInfo> <monetaryDetail> <amount>1733.20</amount> </monetaryDetail> <monetaryDetail> <amount>617.20</amount> </monetaryDetail> <monetaryDetail> <amountType>YQ</amountType> <amount>0.00</amount> </monetaryDetail> <monetaryDetail> <amountType>YR</amountType> <amount>442.00</amount> </monetaryDetail> <monetaryDetail> <amountType>Q</amountType> <amount>0.00</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>866.60</totalFareAmount> <totalTaxAmount>308.60</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>TK</company> </codeShareDetails> <codeShareDetails> <company>HR</company> </codeShareDetails> <codeShareDetails> <company>GP</company> </codeShareDetails> <monetaryDetails> <amountType>YQ</amountType> <amount>0.00</amount> </monetaryDetails> <monetaryDetails> <amountType>YR</amountType> <amount>221.00</amount> </monetaryDetails> <monetaryDetails> <amountType>Q</amountType> <amount>0.00</amount> </monetaryDetails> </paxFareDetail> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> <traveller> <ref>2</ref> </traveller> </paxReference> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>PEN</textSubjectQualifier> <informationType>70</informationType> </freeTextQualification> <description>TICKETS ARE NON-REFUNDABLE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>LTD</textSubjectQualifier> <informationType>41</informationType> </freeTextQualification> <description>LAST TKT DTE</description> <description>14OCT24</description> <description> - DATE OF ORIGIN</description> </pricingMessage> </fare> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>H</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>HN2XOX</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>N</breakPoint> </productInformation> </groupOfFares> <groupOfFares> <productInformation> <cabinProduct> <rbd>H</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>HN2XOX</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> <fareFamiliesRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>3</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> </paxFareProduct> </recommendation> <serviceFeesGrp> <serviceTypeInfo> <carrierFeeDetails> <type>OC</type> </carrierFeeDetails> </serviceTypeInfo> <globalMessageMarker></globalMessageMarker> <serviceDetailsGrp> <serviceOptionInfo> <dataTypeInformation> <subType>09Q</subType> </dataTypeInformation> </serviceOptionInfo> <feeDescriptionGrp> <itemNumberInfo> <itemNumberDetails> <number>1</number> <type>SD</type> </itemNumberDetails> </itemNumberInfo> <serviceAttributesInfo> <attributeDetails> <attributeType>SSR</attributeType> <attributeDescription>RFIC</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>RFIC</attributeType> <attributeDescription>C</attributeDescription> </attributeDetails> </serviceAttributesInfo> <serviceDescriptionInfo> <serviceRequirementsInfo> <serviceClassification>C</serviceClassification> <serviceMarketingCarrier>TK</serviceMarketingCarrier> <serviceGroup>BG</serviceGroup> <serviceSubGroup>CY</serviceSubGroup> <serviceFreeText>4Y</serviceFreeText> </serviceRequirementsInfo> </serviceDescriptionInfo> <commercialName> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>1 PIECE X 8 KG CABIN BAGGAGE</freeText> </commercialName> </feeDescriptionGrp> </serviceDetailsGrp> <serviceDetailsGrp> <serviceOptionInfo> <dataTypeInformation> <subType>BAG</subType> </dataTypeInformation> </serviceOptionInfo> <feeDescriptionGrp> <itemNumberInfo> <itemNumberDetails> <number>2</number> <type>SD</type> </itemNumberDetails> </itemNumberInfo> <serviceAttributesInfo> <attributeDetails> <attributeType>SSR</attributeType> <attributeDescription>RFIC</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>RFIC</attributeType> <attributeDescription>C</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>BKM</attributeType> <attributeDescription>01</attributeDescription> </attributeDetails> </serviceAttributesInfo> <serviceDescriptionInfo> <serviceRequirementsInfo> <serviceClassification>C</serviceClassification> <serviceMarketingCarrier>TK</serviceMarketingCarrier> <serviceGroup>BG</serviceGroup> </serviceRequirementsInfo> </serviceDescriptionInfo> <commercialName> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>BAG INCLUDED</freeText> </commercialName> </feeDescriptionGrp> </serviceDetailsGrp> <serviceDetailsGrp> <serviceOptionInfo> <dataTypeInformation> <subType>0AK</subType> </dataTypeInformation> </serviceOptionInfo> <feeDescriptionGrp> <itemNumberInfo> <itemNumberDetails> <number>3</number> <type>SD</type> </itemNumberDetails> </itemNumberInfo> <serviceDescriptionInfo> <serviceRequirementsInfo> <serviceClassification>F</serviceClassification> <serviceMarketingCarrier>TK</serviceMarketingCarrier> <serviceGroup>ML</serviceGroup> <serviceSubGroup>DI</serviceSubGroup> </serviceRequirementsInfo> </serviceDescriptionInfo> <commercialName> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>MEAL SERVICE</freeText> </commercialName> </feeDescriptionGrp> </serviceDetailsGrp> <serviceDetailsGrp> <serviceOptionInfo> <dataTypeInformation> <subType>050</subType> </dataTypeInformation> </serviceOptionInfo> <feeDescriptionGrp> <itemNumberInfo> <itemNumberDetails> <number>4</number> <type>SD</type> </itemNumberDetails> </itemNumberInfo> <serviceDescriptionInfo> <serviceRequirementsInfo> <serviceClassification>Z</serviceClassification> <serviceMarketingCarrier>TK</serviceMarketingCarrier> <serviceGroup>BF</serviceGroup> <serviceSubGroup>SE</serviceSubGroup> <serviceFreeText>BS</serviceFreeText> </serviceRequirementsInfo> </serviceDescriptionInfo> <commercialName> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>STANDART SEAT SELECTION</freeText> </commercialName> </feeDescriptionGrp> </serviceDetailsGrp> <serviceDetailsGrp> <serviceOptionInfo> <dataTypeInformation> <subType>056</subType> </dataTypeInformation> </serviceOptionInfo> <feeDescriptionGrp> <itemNumberInfo> <itemNumberDetails> <number>5</number> <type>SD</type> </itemNumberDetails> </itemNumberInfo> <serviceDescriptionInfo> <serviceRequirementsInfo> <serviceClassification>Z</serviceClassification> <serviceMarketingCarrier>TK</serviceMarketingCarrier> <serviceGroup>BF</serviceGroup> <serviceSubGroup>RF</serviceSubGroup> </serviceRequirementsInfo> </serviceDescriptionInfo> <commercialName> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>REFUNDABLE TICKET</freeText> </commercialName> </feeDescriptionGrp> </serviceDetailsGrp> <serviceDetailsGrp> <serviceOptionInfo> <dataTypeInformation> <subType>059</subType> </dataTypeInformation> </serviceOptionInfo> <feeDescriptionGrp> <itemNumberInfo> <itemNumberDetails> <number>6</number> <type>SD</type> </itemNumberDetails> </itemNumberInfo> <serviceDescriptionInfo> <serviceRequirementsInfo> <serviceClassification>Z</serviceClassification> <serviceMarketingCarrier>TK</serviceMarketingCarrier> <serviceGroup>BF</serviceGroup> <serviceSubGroup>VC</serviceSubGroup> <serviceFreeText>CD</serviceFreeText> </serviceRequirementsInfo> </serviceDescriptionInfo> <commercialName> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>CHANGEABLE TICKET</freeText> </commercialName> </feeDescriptionGrp> </serviceDetailsGrp> <serviceDetailsGrp> <serviceOptionInfo> <dataTypeInformation> <subType>CNR</subType> </dataTypeInformation> </serviceOptionInfo> <feeDescriptionGrp> <itemNumberInfo> <itemNumberDetails> <number>7</number> <type>SD</type> </itemNumberDetails> </itemNumberInfo> <serviceAttributesInfo> <attributeDetails> <attributeType>SSR</attributeType> <attributeDescription>INMR</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>RFIC</attributeType> <attributeDescription>G</attributeDescription> </attributeDetails> </serviceAttributesInfo> <serviceDescriptionInfo> <serviceRequirementsInfo> <serviceClassification>F</serviceClassification> <serviceMarketingCarrier>TK</serviceMarketingCarrier> <serviceGroup>IE</serviceGroup> <serviceSubGroup>IT</serviceSubGroup> </serviceRequirementsInfo> </serviceDescriptionInfo> <commercialName> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>ONLINE MESSAGE RIGHT</freeText> </commercialName> </feeDescriptionGrp> </serviceDetailsGrp> </serviceFeesGrp> <serviceFeesGrp> <serviceTypeInfo> <carrierFeeDetails> <type>FBA</type> </carrierFeeDetails> </serviceTypeInfo> <serviceCoverageInfoGrp> <itemNumberInfo> <itemNumber> <number>1</number> </itemNumber> </itemNumberInfo> <serviceCovInfoGrp> <paxRefInfo> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </paxRefInfo> <coveragePerFlightsInfo> <numberOfItemsDetails> <referenceQualifier>RS</referenceQualifier> <refNum>1</refNum> </numberOfItemsDetails> <lastItemsDetails> <refOfLeg>1</refOfLeg> </lastItemsDetails> <lastItemsDetails> <refOfLeg>2</refOfLeg> </lastItemsDetails> </coveragePerFlightsInfo> <refInfo> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> </refInfo> </serviceCovInfoGrp> </serviceCoverageInfoGrp> <globalMessageMarker></globalMessageMarker> <freeBagAllowanceGrp> <freeBagAllownceInfo> <baggageDetails> <freeAllowance>2</freeAllowance> <quantityCode>N</quantityCode> </baggageDetails> </freeBagAllownceInfo> <itemNumberInfo> <itemNumberDetails> <number>1</number> </itemNumberDetails> </itemNumberInfo> </freeBagAllowanceGrp> </serviceFeesGrp> </Fare\_EnrichTravelProposalsReply>

## 5.8.3 Possible Errors

See "Error Messages" section.

* * *

## 5.9 Operation: 03.03 Output Option - Cabin Upsell

Each travel solution that is requested is priced with the lowest fare possible. 

For airlines defining fares within Fare Family product, an upsell recommendation is an alternative price proposed for the same travel solution (cheapest or the base). The price of an upsell is always higher than the base and is associated to a different fare family. Upsell proposals are made for only the cheapest fare filed in a single fare family ergo one upsell max per fare family.

The upsells computed may not belong to any fare family instead they would be categorized on basis of the cabin associated. The cheapest recommendation serves as the base for associating all these upsells computed with an identifier tag as indicated in the example below.

The Cabin Upsell option returns up to 9 alternative recommendations.

For determining an eligible upsell the recommendation proposed involves the same marketing carrier, or marketing carriers being part of the same alliance on all the bounds. If not, the Upsell process doesn’t apply.

Syntax request:  
       UPC option :  
        <feeIdDescription>  
            <feeId\>  
                <feeType\>FFI</feeType\>  
                <feeIdNumber\>3</feeIdNumber\>  
            </feeId\>  
            <feeId\>  
                <feeType\>UPC</feeType\>  
                <feeIdNumber\>9</feeIdNumber\>  
            </feeId\>  
        </feeIdDescription>  
  
A list of marketing carriers for which upsell must be processed (optional). By default, if not specified, upsell process applies on all the eligible marketing carriers in output :

  
       <travelFlightInfo\>  
            <companyIdentity>  
                <carrierQualifier\>U</carrierQualifier\>  
                <carrierId\>ZZ</carrierId\>  
            </companyIdentity>  
        </travelFlightInfo\>  
  
Syntax response :  
  
This recommendation is the upsell from the above recommendation. We can see that the travel solution is the same S1 - AV 8561 but the fare family is different F:1 in the base reco and for upsells F:4 / F:5 / F:8 / F:9. The "U" qualifier in RefQualifier field signifies the upsell recommendations:  
  
        <itemNumberId>  
                <number>1</number>  
            </itemNumberId>  
        </itemNumber\>  
        <fareFamilyRef\>  
            <referencingDetail\>  
                <refQualifier\>F</refQualifier\>  
                <refNumber\>1</refNumber\>  
            </referencingDetail\>  
        </fareFamilyRef\>  
        <segmentFlightRef\>  
            <referencingDetail\>  
                <refQualifier\>S</refQualifier\>       <!-- Identifies travel solution of the Base reco -->  
                <refNumber\>1</refNumber\>  
            </referencingDetail\>  
            **<referencingDetail\>  
                <refQualifier\>U</refQualifier\>**  <!-- Upsell reco -->  
                **<refNumber\>4</refNumber\>**    <!-- Points to the upsell reco recommendation/itemNumber/itemNumberId/number = 4 -->  
            **</referencingDetail\>**  
            **<referencingDetail\>**  
                **<refQualifier\>U</refQualifier\>**  <!-- Upsell reco -->  
                **<refNumber\>5</refNumber\>**     <!-- Points to the upsell reco recommendation/itemNumber/itemNumberId/number = 5 -->  
            **</referencingDetail\>**  
            **<referencingDetail\>**  
                **<refQualifier\>U</refQualifier\>**  <!-- Upsell reco -->  
                **<refNumber\>8</refNumber\>**    <!-- Points to the upsell reco recommendation/itemNumber/itemNumberId/number = 8 -->  
            **</referencingDetail\>**  
            **<referencingDetail\>**  
                **<refQualifier\>U</refQualifier\>**  <!-- Upsell reco -->  
                **<refNumber\>9</refNumber\>**    <!-- Points to the upsell reco recommendation/itemNumber/itemNumberId/number = 9 -->  
            **</referencingDetail\>**  
            <referencingDetail\>  
                <refQualifier\>B</refQualifier\>  
                <refNumber\>1</refNumber\>  
            </referencingDetail\>  
        </segmentFlightRef\>

## 5.9.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_EnrichTravelProposals xmlns="http://xml.amadeus.com/FMPXAQ\_24\_6\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>2</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> <traveller> <ref>2</ref> </traveller> </paxReference> <fareOptions> <pricingTickInfo> <pricingTicketing> <priceType>RU</priceType> <priceType>RP</priceType> <priceType>TAC</priceType> </pricingTicketing> </pricingTickInfo> <feeIdDescription> <feeId> <feeType>FFI</feeType> <feeIdNumber>3</feeIdNumber> </feeId> <feeId> <feeType>UPC</feeType> <feeIdNumber>9</feeIdNumber> </feeId> </feeIdDescription> </fareOptions> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>NCE</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>NYC</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>141024</date> </firstDateTimeDetail> </timeDetails> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>1</ref> </flightProposal> <flightProposal> <ref>2830</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>TK</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>141024</dateOfDeparture> <timeOfDeparture>1920</timeOfDeparture> <dateOfArrival>141024</dateOfArrival> <timeOfArrival>2320</timeOfArrival> </productDateTime> <location> <locationId>NCE</locationId> <terminal>1</terminal> </location> <location> <locationId>IST</locationId> </location> <companyId> <marketingCarrier>TK</marketingCarrier> <operatingCarrier>TK</operatingCarrier> </companyId> <flightOrtrainNumber>1816</flightOrtrainNumber> <productDetail> <equipmentType>321</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> <productDetailQualifier>AVR</productDetailQualifier> </addProductDetail> </flightInformation> </flightDetails> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>151024</dateOfDeparture> <timeOfDeparture>1405</timeOfDeparture> <dateOfArrival>151024</dateOfArrival> <timeOfArrival>1750</timeOfArrival> </productDateTime> <location> <locationId>IST</locationId> </location> <location> <locationId>JFK</locationId> <terminal>1</terminal> </location> <companyId> <marketingCarrier>TK</marketingCarrier> <operatingCarrier>TK</operatingCarrier> </companyId> <flightOrtrainNumber>1</flightOrtrainNumber> <productDetail> <equipmentType>77W</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> <productDetailQualifier>LCA</productDetailQualifier> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> </itinerary> </Fare\_EnrichTravelProposals>

## 5.9.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_EnrichTravelProposalsReply xmlns="http://xml.amadeus.com/FMPXAR\_24\_6\_1A"> <replyStatus> <status> <advisoryTypeInfo>FQX</advisoryTypeInfo> </status> </replyStatus> <conversionRate> <conversionRateDetail> <currency>USD</currency> </conversionRateDetail> </conversionRate> <familyInformation> <refNumber>1</refNumber> <fareFamilyname>PS</fareFamilyname> <description>PROMOTIONAL</description> <carrier>TK</carrier> <services> <reference>1</reference> <status>INC</status> </services> <services> <reference>2</reference> <status>INC</status> </services> <services> <reference>3</reference> <status>INC</status> </services> <services> <reference>4</reference> <status>CHA</status> </services> <services> <reference>5</reference> <status>NOF</status> </services> <services> <reference>6</reference> <status>CHA</status> </services> <services> <reference>7</reference> <status>INC</status> </services> </familyInformation> <familyInformation> <refNumber>2</refNumber> <fareFamilyname>RS</fareFamilyname> <description>RESTRICTED</description> <carrier>TK</carrier> <services> <reference>1</reference> <status>INC</status> </services> <services> <reference>2</reference> <status>INC</status> </services> <services> <reference>3</reference> <status>INC</status> </services> <services> <reference>4</reference> <status>CHA</status> </services> <services> <reference>5</reference> <status>CHA</status> </services> <services> <reference>6</reference> <status>CHA</status> </services> <services> <reference>7</reference> <status>INC</status> </services> </familyInformation> <familyInformation> <refNumber>3</refNumber> <fareFamilyname>FX</fareFamilyname> <description>FLEXIBLE</description> <carrier>TK</carrier> <services> <reference>1</reference> <status>INC</status> </services> <services> <reference>2</reference> <status>INC</status> </services> <services> <reference>3</reference> <status>INC</status> </services> <services> <reference>4</reference> <status>CHA</status> </services> <services> <reference>5</reference> <status>INC</status> </services> <services> <reference>6</reference> <status>INC</status> </services> <services> <reference>7</reference> <status>INC</status> </services> </familyInformation> <flightIndex> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>1</ref> </flightProposal> <flightProposal> <ref>2855</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>TK</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>141024</dateOfDeparture> <timeOfDeparture>1835</timeOfDeparture> <dateOfArrival>141024</dateOfArrival> <timeOfArrival>2240</timeOfArrival> </productDateTime> <location> <locationId>NCE</locationId> <terminal>1</terminal> </location> <location> <locationId>IST</locationId> </location> <companyId> <marketingCarrier>TK</marketingCarrier> <operatingCarrier>TK</operatingCarrier> </companyId> <flightOrtrainNumber>1816</flightOrtrainNumber> <productDetail> <equipmentType>32B</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> <productDetailQualifier>LCA</productDetailQualifier> </addProductDetail> </flightInformation> </flightDetails> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>151024</dateOfDeparture> <timeOfDeparture>1345</timeOfDeparture> <dateOfArrival>151024</dateOfArrival> <timeOfArrival>1730</timeOfArrival> </productDateTime> <location> <locationId>IST</locationId> </location> <location> <locationId>JFK</locationId> <terminal>1</terminal> </location> <companyId> <marketingCarrier>TK</marketingCarrier> <operatingCarrier>TK</operatingCarrier> </companyId> <flightOrtrainNumber>1</flightOrtrainNumber> <productDetail> <equipmentType>77W</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> <productDetailQualifier>LCA</productDetailQualifier> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> </flightIndex> <recommendation> <itemNumber> <itemNumberId> <number>1</number> </itemNumberId> </itemNumber> <fareFamilyRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> </fareFamilyRef> <recPriceInfo> <monetaryDetail> <amount>965.20</amount> </monetaryDetail> <monetaryDetail> <amount>617.20</amount> </monetaryDetail> <monetaryDetail> <amountType>YQ</amountType> <amount>0.00</amount> </monetaryDetail> <monetaryDetail> <amountType>YR</amountType> <amount>442.00</amount> </monetaryDetail> <monetaryDetail> <amountType>Q</amountType> <amount>0.00</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>U</refQualifier> <refNumber>2</refNumber> </referencingDetail> <referencingDetail> <refQualifier>U</refQualifier> <refNumber>3</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>482.60</totalFareAmount> <totalTaxAmount>308.60</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>TK</company> </codeShareDetails> <codeShareDetails> <company>HR</company> </codeShareDetails> <codeShareDetails> <company>GP</company> </codeShareDetails> <monetaryDetails> <amountType>YQ</amountType> <amount>0.00</amount> </monetaryDetails> <monetaryDetails> <amountType>YR</amountType> <amount>221.00</amount> </monetaryDetails> <monetaryDetails> <amountType>Q</amountType> <amount>0.00</amount> </monetaryDetails> </paxFareDetail> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> <traveller> <ref>2</ref> </traveller> </paxReference> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>PEN</textSubjectQualifier> <informationType>70</informationType> </freeTextQualification> <description>TICKETS ARE NON-REFUNDABLE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>LTD</textSubjectQualifier> <informationType>41</informationType> </freeTextQualification> <description>LAST TKT DTE</description> <description>14OCT24</description> <description> - DATE OF ORIGIN</description> </pricingMessage> </fare> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>T</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>TN2XPBO</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>N</breakPoint> </productInformation> </groupOfFares> <groupOfFares> <productInformation> <cabinProduct> <rbd>T</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>TN2XPBO</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> <fareFamiliesRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> </paxFareProduct> </recommendation> <recommendation> <itemNumber> <itemNumberId> <number>2</number> </itemNumberId> </itemNumber> <fareFamilyRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>2</refNumber> </referencingDetail> </fareFamilyRef> <recPriceInfo> <monetaryDetail> <amount>1055.20</amount> </monetaryDetail> <monetaryDetail> <amount>617.20</amount> </monetaryDetail> <monetaryDetail> <amountType>YQ</amountType> <amount>0.00</amount> </monetaryDetail> <monetaryDetail> <amountType>YR</amountType> <amount>442.00</amount> </monetaryDetail> <monetaryDetail> <amountType>Q</amountType> <amount>0.00</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>527.60</totalFareAmount> <totalTaxAmount>308.60</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>TK</company> </codeShareDetails> <codeShareDetails> <company>HR</company> </codeShareDetails> <codeShareDetails> <company>GP</company> </codeShareDetails> <monetaryDetails> <amountType>YQ</amountType> <amount>0.00</amount> </monetaryDetails> <monetaryDetails> <amountType>YR</amountType> <amount>221.00</amount> </monetaryDetails> <monetaryDetails> <amountType>Q</amountType> <amount>0.00</amount> </monetaryDetails> </paxFareDetail> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> <traveller> <ref>2</ref> </traveller> </paxReference> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>PEN</textSubjectQualifier> <informationType>70</informationType> </freeTextQualification> <description>TICKETS ARE NON-REFUNDABLE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>LTD</textSubjectQualifier> <informationType>41</informationType> </freeTextQualification> <description>LAST TKT DTE</description> <description>14OCT24</description> <description> - DATE OF ORIGIN</description> </pricingMessage> </fare> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>Q</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>QN2PXOW</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>N</breakPoint> </productInformation> </groupOfFares> <groupOfFares> <productInformation> <cabinProduct> <rbd>Q</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>QN2PXOW</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> <fareFamiliesRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>2</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> </paxFareProduct> </recommendation> <recommendation> <itemNumber> <itemNumberId> <number>3</number> </itemNumberId> </itemNumber> <fareFamilyRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>3</refNumber> </referencingDetail> </fareFamilyRef> <recPriceInfo> <monetaryDetail> <amount>1733.20</amount> </monetaryDetail> <monetaryDetail> <amount>617.20</amount> </monetaryDetail> <monetaryDetail> <amountType>YQ</amountType> <amount>0.00</amount> </monetaryDetail> <monetaryDetail> <amountType>YR</amountType> <amount>442.00</amount> </monetaryDetail> <monetaryDetail> <amountType>Q</amountType> <amount>0.00</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>866.60</totalFareAmount> <totalTaxAmount>308.60</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>TK</company> </codeShareDetails> <codeShareDetails> <company>HR</company> </codeShareDetails> <codeShareDetails> <company>GP</company> </codeShareDetails> <monetaryDetails> <amountType>YQ</amountType> <amount>0.00</amount> </monetaryDetails> <monetaryDetails> <amountType>YR</amountType> <amount>221.00</amount> </monetaryDetails> <monetaryDetails> <amountType>Q</amountType> <amount>0.00</amount> </monetaryDetails> </paxFareDetail> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> <traveller> <ref>2</ref> </traveller> </paxReference> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>PEN</textSubjectQualifier> <informationType>70</informationType> </freeTextQualification> <description>TICKETS ARE NON-REFUNDABLE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>LTD</textSubjectQualifier> <informationType>41</informationType> </freeTextQualification> <description>LAST TKT DTE</description> <description>14OCT24</description> <description> - DATE OF ORIGIN</description> </pricingMessage> </fare> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>H</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>HN2XOX</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>N</breakPoint> </productInformation> </groupOfFares> <groupOfFares> <productInformation> <cabinProduct> <rbd>H</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>HN2XOX</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> <fareFamiliesRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>3</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> </paxFareProduct> </recommendation> <serviceFeesGrp> <serviceTypeInfo> <carrierFeeDetails> <type>OC</type> </carrierFeeDetails> </serviceTypeInfo> <globalMessageMarker></globalMessageMarker> <serviceDetailsGrp> <serviceOptionInfo> <dataTypeInformation> <subType>09Q</subType> </dataTypeInformation> </serviceOptionInfo> <feeDescriptionGrp> <itemNumberInfo> <itemNumberDetails> <number>1</number> <type>SD</type> </itemNumberDetails> </itemNumberInfo> <serviceAttributesInfo> <attributeDetails> <attributeType>SSR</attributeType> <attributeDescription>RFIC</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>RFIC</attributeType> <attributeDescription>C</attributeDescription> </attributeDetails> </serviceAttributesInfo> <serviceDescriptionInfo> <serviceRequirementsInfo> <serviceClassification>C</serviceClassification> <serviceMarketingCarrier>TK</serviceMarketingCarrier> <serviceGroup>BG</serviceGroup> <serviceSubGroup>CY</serviceSubGroup> <serviceFreeText>4Y</serviceFreeText> </serviceRequirementsInfo> </serviceDescriptionInfo> <commercialName> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>1 PIECE X 8 KG CABIN BAGGAGE</freeText> </commercialName> </feeDescriptionGrp> </serviceDetailsGrp> <serviceDetailsGrp> <serviceOptionInfo> <dataTypeInformation> <subType>BAG</subType> </dataTypeInformation> </serviceOptionInfo> <feeDescriptionGrp> <itemNumberInfo> <itemNumberDetails> <number>2</number> <type>SD</type> </itemNumberDetails> </itemNumberInfo> <serviceAttributesInfo> <attributeDetails> <attributeType>SSR</attributeType> <attributeDescription>RFIC</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>RFIC</attributeType> <attributeDescription>C</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>BKM</attributeType> <attributeDescription>01</attributeDescription> </attributeDetails> </serviceAttributesInfo> <serviceDescriptionInfo> <serviceRequirementsInfo> <serviceClassification>C</serviceClassification> <serviceMarketingCarrier>TK</serviceMarketingCarrier> <serviceGroup>BG</serviceGroup> </serviceRequirementsInfo> </serviceDescriptionInfo> <commercialName> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>BAG INCLUDED</freeText> </commercialName> </feeDescriptionGrp> </serviceDetailsGrp> <serviceDetailsGrp> <serviceOptionInfo> <dataTypeInformation> <subType>0AK</subType> </dataTypeInformation> </serviceOptionInfo> <feeDescriptionGrp> <itemNumberInfo> <itemNumberDetails> <number>3</number> <type>SD</type> </itemNumberDetails> </itemNumberInfo> <serviceDescriptionInfo> <serviceRequirementsInfo> <serviceClassification>F</serviceClassification> <serviceMarketingCarrier>TK</serviceMarketingCarrier> <serviceGroup>ML</serviceGroup> <serviceSubGroup>DI</serviceSubGroup> </serviceRequirementsInfo> </serviceDescriptionInfo> <commercialName> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>MEAL SERVICE</freeText> </commercialName> </feeDescriptionGrp> </serviceDetailsGrp> <serviceDetailsGrp> <serviceOptionInfo> <dataTypeInformation> <subType>050</subType> </dataTypeInformation> </serviceOptionInfo> <feeDescriptionGrp> <itemNumberInfo> <itemNumberDetails> <number>4</number> <type>SD</type> </itemNumberDetails> </itemNumberInfo> <serviceDescriptionInfo> <serviceRequirementsInfo> <serviceClassification>Z</serviceClassification> <serviceMarketingCarrier>TK</serviceMarketingCarrier> <serviceGroup>BF</serviceGroup> <serviceSubGroup>SE</serviceSubGroup> <serviceFreeText>BS</serviceFreeText> </serviceRequirementsInfo> </serviceDescriptionInfo> <commercialName> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>STANDART SEAT SELECTION</freeText> </commercialName> </feeDescriptionGrp> </serviceDetailsGrp> <serviceDetailsGrp> <serviceOptionInfo> <dataTypeInformation> <subType>056</subType> </dataTypeInformation> </serviceOptionInfo> <feeDescriptionGrp> <itemNumberInfo> <itemNumberDetails> <number>5</number> <type>SD</type> </itemNumberDetails> </itemNumberInfo> <serviceDescriptionInfo> <serviceRequirementsInfo> <serviceClassification>Z</serviceClassification> <serviceMarketingCarrier>TK</serviceMarketingCarrier> <serviceGroup>BF</serviceGroup> <serviceSubGroup>RF</serviceSubGroup> </serviceRequirementsInfo> </serviceDescriptionInfo> <commercialName> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>REFUNDABLE TICKET</freeText> </commercialName> </feeDescriptionGrp> </serviceDetailsGrp> <serviceDetailsGrp> <serviceOptionInfo> <dataTypeInformation> <subType>059</subType> </dataTypeInformation> </serviceOptionInfo> <feeDescriptionGrp> <itemNumberInfo> <itemNumberDetails> <number>6</number> <type>SD</type> </itemNumberDetails> </itemNumberInfo> <serviceDescriptionInfo> <serviceRequirementsInfo> <serviceClassification>Z</serviceClassification> <serviceMarketingCarrier>TK</serviceMarketingCarrier> <serviceGroup>BF</serviceGroup> <serviceSubGroup>VC</serviceSubGroup> <serviceFreeText>CD</serviceFreeText> </serviceRequirementsInfo> </serviceDescriptionInfo> <commercialName> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>CHANGEABLE TICKET</freeText> </commercialName> </feeDescriptionGrp> </serviceDetailsGrp> <serviceDetailsGrp> <serviceOptionInfo> <dataTypeInformation> <subType>CNR</subType> </dataTypeInformation> </serviceOptionInfo> <feeDescriptionGrp> <itemNumberInfo> <itemNumberDetails> <number>7</number> <type>SD</type> </itemNumberDetails> </itemNumberInfo> <serviceAttributesInfo> <attributeDetails> <attributeType>SSR</attributeType> <attributeDescription>INMR</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>RFIC</attributeType> <attributeDescription>G</attributeDescription> </attributeDetails> </serviceAttributesInfo> <serviceDescriptionInfo> <serviceRequirementsInfo> <serviceClassification>F</serviceClassification> <serviceMarketingCarrier>TK</serviceMarketingCarrier> <serviceGroup>IE</serviceGroup> <serviceSubGroup>IT</serviceSubGroup> </serviceRequirementsInfo> </serviceDescriptionInfo> <commercialName> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>ONLINE MESSAGE RIGHT</freeText> </commercialName> </feeDescriptionGrp> </serviceDetailsGrp> </serviceFeesGrp> <serviceFeesGrp> <serviceTypeInfo> <carrierFeeDetails> <type>FBA</type> </carrierFeeDetails> </serviceTypeInfo> <serviceCoverageInfoGrp> <itemNumberInfo> <itemNumber> <number>1</number> </itemNumber> </itemNumberInfo> <serviceCovInfoGrp> <paxRefInfo> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </paxRefInfo> <coveragePerFlightsInfo> <numberOfItemsDetails> <referenceQualifier>RS</referenceQualifier> <refNum>1</refNum> </numberOfItemsDetails> <lastItemsDetails> <refOfLeg>1</refOfLeg> </lastItemsDetails> <lastItemsDetails> <refOfLeg>2</refOfLeg> </lastItemsDetails> </coveragePerFlightsInfo> <refInfo> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> </refInfo> </serviceCovInfoGrp> </serviceCoverageInfoGrp> <globalMessageMarker></globalMessageMarker> <freeBagAllowanceGrp> <freeBagAllownceInfo> <baggageDetails> <freeAllowance>2</freeAllowance> <quantityCode>N</quantityCode> </baggageDetails> </freeBagAllownceInfo> <itemNumberInfo> <itemNumberDetails> <number>1</number> </itemNumberDetails> </itemNumberInfo> </freeBagAllowanceGrp> </serviceFeesGrp> </Fare\_EnrichTravelProposalsReply>

## 5.9.3 Possible Errors

UPC requested but incorrect settings : "CABIN UPSELL OPTION NOT PERMITTED" UPC requested with other upsells: "CABIN UPSELL OPTION NOT COMPATIBLE WITH OTHER UPSELLS" UPC requested in another flow than FMPXAQ: "CABIN UPSELL OPTION NOT COMPATIBLE WITH THIS TRANSACTION" UPC requested with other cabin option: "CABIN UPSELL OPTION NOT COMPATIBLE WITH OTHER CABIN OPTIONS" UPC requested with bundles : "CABIN UPSELL OPTION NOT COMPATIBLE WITH BUNDLES" UPC requested for complex itineraries : "CABIN UPSELL OPTION NOT APPLICABLE ON COMPLEX ITINERARIES" UPC requested with a multi-ticket option : "CABIN UPSELL OPTION NOT COMPATIBLE WITH MULTI-TICKET¢€

* * *

## 5.10 Operation: 03.04 Output Option - Homogeneous Upsell

The Upsell option returns up to 9 alternative recommendations. These alternative recommendations are priced with a more expensive fare family than the base recommendation.

The Homogeneous Upsell allows you to mostly return all the recommendations having the same fare family at fare component level for a given itinerary. The option is an additional feature of the Itinerary Upsell UPC returning up to 9 upsells. It is triggered by the "UFH" code in the feeType field.

Please note - There may be a possibility to also receive non-homogeneous recommendations despite providing this option for computing homogeneous upsells only.

Syntax request:  
       UFH option :  
        <feeIdDescription>  
            <feeId\>  
                <feeType\>FFI</feeType\>  
                <feeIdNumber\>3</feeIdNumber\>  
            </feeId\>  
            <feeId\>  
                <feeType\>UPC</feeType\>  
                <feeIdNumber\>9</feeIdNumber\>  
            </feeId\>  
            **<feeId\>  
                <feeType\>UFH</feeType\>  
                <feeIdNumber\>1</feeIdNumber\>  
            </feeId\>**  
        </feeIdDescription>

The UFH code must always be followed by the number 1 in the <feeIdNumber\> otherwise an error message is returned. Please see the error message description below.

## 5.10.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_EnrichTravelProposals xmlns="http://xml.amadeus.com/FMPXAQ\_24\_6\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>2</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> <traveller> <ref>2</ref> </traveller> </paxReference> <fareOptions> <pricingTickInfo> <pricingTicketing> <priceType>RU</priceType> <priceType>RP</priceType> <priceType>TAC</priceType> </pricingTicketing> </pricingTickInfo> <feeIdDescription> <feeId> <feeType>FFI</feeType> <feeIdNumber>3</feeIdNumber> </feeId> <feeId> <feeType>UPC</feeType> <feeIdNumber>9</feeIdNumber> </feeId> <feeId> <feeType>UFH</feeType> <feeIdNumber>1</feeIdNumber> </feeId> </feeIdDescription> </fareOptions> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>NCE</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>NYC</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>141024</date> </firstDateTimeDetail> </timeDetails> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>1</ref> </flightProposal> <flightProposal> <ref>2830</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>TK</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>141024</dateOfDeparture> <timeOfDeparture>1920</timeOfDeparture> <dateOfArrival>141024</dateOfArrival> <timeOfArrival>2320</timeOfArrival> </productDateTime> <location> <locationId>NCE</locationId> <terminal>1</terminal> </location> <location> <locationId>IST</locationId> </location> <companyId> <marketingCarrier>TK</marketingCarrier> <operatingCarrier>TK</operatingCarrier> </companyId> <flightOrtrainNumber>1816</flightOrtrainNumber> <productDetail> <equipmentType>321</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> <productDetailQualifier>AVR</productDetailQualifier> </addProductDetail> </flightInformation> </flightDetails> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>151024</dateOfDeparture> <timeOfDeparture>1405</timeOfDeparture> <dateOfArrival>151024</dateOfArrival> <timeOfArrival>1750</timeOfArrival> </productDateTime> <location> <locationId>IST</locationId> </location> <location> <locationId>JFK</locationId> <terminal>1</terminal> </location> <companyId> <marketingCarrier>TK</marketingCarrier> <operatingCarrier>TK</operatingCarrier> </companyId> <flightOrtrainNumber>1</flightOrtrainNumber> <productDetail> <equipmentType>77W</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> <productDetailQualifier>LCA</productDetailQualifier> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> </itinerary> </Fare\_EnrichTravelProposals>

## 5.10.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_EnrichTravelProposalsReply xmlns="http://xml.amadeus.com/FMPXAR\_24\_6\_1A"> <replyStatus> <status> <advisoryTypeInfo>FQX</advisoryTypeInfo> </status> </replyStatus> <conversionRate> <conversionRateDetail> <currency>USD</currency> </conversionRateDetail> </conversionRate> <familyInformation> <refNumber>1</refNumber> <fareFamilyname>PS</fareFamilyname> <description>PROMOTIONAL</description> <carrier>TK</carrier> <services> <reference>1</reference> <status>INC</status> </services> <services> <reference>2</reference> <status>INC</status> </services> <services> <reference>3</reference> <status>INC</status> </services> <services> <reference>4</reference> <status>CHA</status> </services> <services> <reference>5</reference> <status>NOF</status> </services> <services> <reference>6</reference> <status>CHA</status> </services> <services> <reference>7</reference> <status>INC</status> </services> </familyInformation> <familyInformation> <refNumber>2</refNumber> <fareFamilyname>RS</fareFamilyname> <description>RESTRICTED</description> <carrier>TK</carrier> <services> <reference>1</reference> <status>INC</status> </services> <services> <reference>2</reference> <status>INC</status> </services> <services> <reference>3</reference> <status>INC</status> </services> <services> <reference>4</reference> <status>CHA</status> </services> <services> <reference>5</reference> <status>CHA</status> </services> <services> <reference>6</reference> <status>CHA</status> </services> <services> <reference>7</reference> <status>INC</status> </services> </familyInformation> <familyInformation> <refNumber>3</refNumber> <fareFamilyname>FX</fareFamilyname> <description>FLEXIBLE</description> <carrier>TK</carrier> <services> <reference>1</reference> <status>INC</status> </services> <services> <reference>2</reference> <status>INC</status> </services> <services> <reference>3</reference> <status>INC</status> </services> <services> <reference>4</reference> <status>CHA</status> </services> <services> <reference>5</reference> <status>INC</status> </services> <services> <reference>6</reference> <status>INC</status> </services> <services> <reference>7</reference> <status>INC</status> </services> </familyInformation> <flightIndex> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>1</ref> </flightProposal> <flightProposal> <ref>2855</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>TK</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>141024</dateOfDeparture> <timeOfDeparture>1835</timeOfDeparture> <dateOfArrival>141024</dateOfArrival> <timeOfArrival>2240</timeOfArrival> </productDateTime> <location> <locationId>NCE</locationId> <terminal>1</terminal> </location> <location> <locationId>IST</locationId> </location> <companyId> <marketingCarrier>TK</marketingCarrier> <operatingCarrier>TK</operatingCarrier> </companyId> <flightOrtrainNumber>1816</flightOrtrainNumber> <productDetail> <equipmentType>32B</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> <productDetailQualifier>LCA</productDetailQualifier> </addProductDetail> </flightInformation> </flightDetails> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>151024</dateOfDeparture> <timeOfDeparture>1345</timeOfDeparture> <dateOfArrival>151024</dateOfArrival> <timeOfArrival>1730</timeOfArrival> </productDateTime> <location> <locationId>IST</locationId> </location> <location> <locationId>JFK</locationId> <terminal>1</terminal> </location> <companyId> <marketingCarrier>TK</marketingCarrier> <operatingCarrier>TK</operatingCarrier> </companyId> <flightOrtrainNumber>1</flightOrtrainNumber> <productDetail> <equipmentType>77W</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> <productDetailQualifier>LCA</productDetailQualifier> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> </flightIndex> <recommendation> <itemNumber> <itemNumberId> <number>1</number> </itemNumberId> </itemNumber> <fareFamilyRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> </fareFamilyRef> <recPriceInfo> <monetaryDetail> <amount>965.20</amount> </monetaryDetail> <monetaryDetail> <amount>617.20</amount> </monetaryDetail> <monetaryDetail> <amountType>YQ</amountType> <amount>0.00</amount> </monetaryDetail> <monetaryDetail> <amountType>YR</amountType> <amount>442.00</amount> </monetaryDetail> <monetaryDetail> <amountType>Q</amountType> <amount>0.00</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>U</refQualifier> <refNumber>2</refNumber> </referencingDetail> <referencingDetail> <refQualifier>U</refQualifier> <refNumber>3</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>482.60</totalFareAmount> <totalTaxAmount>308.60</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>TK</company> </codeShareDetails> <codeShareDetails> <company>HR</company> </codeShareDetails> <codeShareDetails> <company>GP</company> </codeShareDetails> <monetaryDetails> <amountType>YQ</amountType> <amount>0.00</amount> </monetaryDetails> <monetaryDetails> <amountType>YR</amountType> <amount>221.00</amount> </monetaryDetails> <monetaryDetails> <amountType>Q</amountType> <amount>0.00</amount> </monetaryDetails> </paxFareDetail> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> <traveller> <ref>2</ref> </traveller> </paxReference> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>PEN</textSubjectQualifier> <informationType>70</informationType> </freeTextQualification> <description>TICKETS ARE NON-REFUNDABLE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>LTD</textSubjectQualifier> <informationType>41</informationType> </freeTextQualification> <description>LAST TKT DTE</description> <description>14OCT24</description> <description> - DATE OF ORIGIN</description> </pricingMessage> </fare> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>T</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>TN2XPBO</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>N</breakPoint> </productInformation> </groupOfFares> <groupOfFares> <productInformation> <cabinProduct> <rbd>T</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>TN2XPBO</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> <fareFamiliesRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> </paxFareProduct> </recommendation> <recommendation> <itemNumber> <itemNumberId> <number>2</number> </itemNumberId> </itemNumber> <fareFamilyRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>2</refNumber> </referencingDetail> </fareFamilyRef> <recPriceInfo> <monetaryDetail> <amount>1055.20</amount> </monetaryDetail> <monetaryDetail> <amount>617.20</amount> </monetaryDetail> <monetaryDetail> <amountType>YQ</amountType> <amount>0.00</amount> </monetaryDetail> <monetaryDetail> <amountType>YR</amountType> <amount>442.00</amount> </monetaryDetail> <monetaryDetail> <amountType>Q</amountType> <amount>0.00</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>527.60</totalFareAmount> <totalTaxAmount>308.60</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>TK</company> </codeShareDetails> <codeShareDetails> <company>HR</company> </codeShareDetails> <codeShareDetails> <company>GP</company> </codeShareDetails> <monetaryDetails> <amountType>YQ</amountType> <amount>0.00</amount> </monetaryDetails> <monetaryDetails> <amountType>YR</amountType> <amount>221.00</amount> </monetaryDetails> <monetaryDetails> <amountType>Q</amountType> <amount>0.00</amount> </monetaryDetails> </paxFareDetail> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> <traveller> <ref>2</ref> </traveller> </paxReference> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>PEN</textSubjectQualifier> <informationType>70</informationType> </freeTextQualification> <description>TICKETS ARE NON-REFUNDABLE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>LTD</textSubjectQualifier> <informationType>41</informationType> </freeTextQualification> <description>LAST TKT DTE</description> <description>14OCT24</description> <description> - DATE OF ORIGIN</description> </pricingMessage> </fare> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>Q</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>QN2PXOW</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>N</breakPoint> </productInformation> </groupOfFares> <groupOfFares> <productInformation> <cabinProduct> <rbd>Q</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>QN2PXOW</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> <fareFamiliesRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>2</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> </paxFareProduct> </recommendation> <recommendation> <itemNumber> <itemNumberId> <number>3</number> </itemNumberId> </itemNumber> <fareFamilyRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>3</refNumber> </referencingDetail> </fareFamilyRef> <recPriceInfo> <monetaryDetail> <amount>1733.20</amount> </monetaryDetail> <monetaryDetail> <amount>617.20</amount> </monetaryDetail> <monetaryDetail> <amountType>YQ</amountType> <amount>0.00</amount> </monetaryDetail> <monetaryDetail> <amountType>YR</amountType> <amount>442.00</amount> </monetaryDetail> <monetaryDetail> <amountType>Q</amountType> <amount>0.00</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>866.60</totalFareAmount> <totalTaxAmount>308.60</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>TK</company> </codeShareDetails> <codeShareDetails> <company>HR</company> </codeShareDetails> <codeShareDetails> <company>GP</company> </codeShareDetails> <monetaryDetails> <amountType>YQ</amountType> <amount>0.00</amount> </monetaryDetails> <monetaryDetails> <amountType>YR</amountType> <amount>221.00</amount> </monetaryDetails> <monetaryDetails> <amountType>Q</amountType> <amount>0.00</amount> </monetaryDetails> </paxFareDetail> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> <traveller> <ref>2</ref> </traveller> </paxReference> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>PEN</textSubjectQualifier> <informationType>70</informationType> </freeTextQualification> <description>TICKETS ARE NON-REFUNDABLE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>LTD</textSubjectQualifier> <informationType>41</informationType> </freeTextQualification> <description>LAST TKT DTE</description> <description>14OCT24</description> <description> - DATE OF ORIGIN</description> </pricingMessage> </fare> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>H</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>HN2XOX</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>N</breakPoint> </productInformation> </groupOfFares> <groupOfFares> <productInformation> <cabinProduct> <rbd>H</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>HN2XOX</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> <fareFamiliesRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>3</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> </paxFareProduct> </recommendation> <serviceFeesGrp> <serviceTypeInfo> <carrierFeeDetails> <type>OC</type> </carrierFeeDetails> </serviceTypeInfo> <globalMessageMarker></globalMessageMarker> <serviceDetailsGrp> <serviceOptionInfo> <dataTypeInformation> <subType>09Q</subType> </dataTypeInformation> </serviceOptionInfo> <feeDescriptionGrp> <itemNumberInfo> <itemNumberDetails> <number>1</number> <type>SD</type> </itemNumberDetails> </itemNumberInfo> <serviceAttributesInfo> <attributeDetails> <attributeType>SSR</attributeType> <attributeDescription>RFIC</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>RFIC</attributeType> <attributeDescription>C</attributeDescription> </attributeDetails> </serviceAttributesInfo> <serviceDescriptionInfo> <serviceRequirementsInfo> <serviceClassification>C</serviceClassification> <serviceMarketingCarrier>TK</serviceMarketingCarrier> <serviceGroup>BG</serviceGroup> <serviceSubGroup>CY</serviceSubGroup> <serviceFreeText>4Y</serviceFreeText> </serviceRequirementsInfo> </serviceDescriptionInfo> <commercialName> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>1 PIECE X 8 KG CABIN BAGGAGE</freeText> </commercialName> </feeDescriptionGrp> </serviceDetailsGrp> <serviceDetailsGrp> <serviceOptionInfo> <dataTypeInformation> <subType>BAG</subType> </dataTypeInformation> </serviceOptionInfo> <feeDescriptionGrp> <itemNumberInfo> <itemNumberDetails> <number>2</number> <type>SD</type> </itemNumberDetails> </itemNumberInfo> <serviceAttributesInfo> <attributeDetails> <attributeType>SSR</attributeType> <attributeDescription>RFIC</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>RFIC</attributeType> <attributeDescription>C</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>BKM</attributeType> <attributeDescription>01</attributeDescription> </attributeDetails> </serviceAttributesInfo> <serviceDescriptionInfo> <serviceRequirementsInfo> <serviceClassification>C</serviceClassification> <serviceMarketingCarrier>TK</serviceMarketingCarrier> <serviceGroup>BG</serviceGroup> </serviceRequirementsInfo> </serviceDescriptionInfo> <commercialName> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>BAG INCLUDED</freeText> </commercialName> </feeDescriptionGrp> </serviceDetailsGrp> <serviceDetailsGrp> <serviceOptionInfo> <dataTypeInformation> <subType>0AK</subType> </dataTypeInformation> </serviceOptionInfo> <feeDescriptionGrp> <itemNumberInfo> <itemNumberDetails> <number>3</number> <type>SD</type> </itemNumberDetails> </itemNumberInfo> <serviceDescriptionInfo> <serviceRequirementsInfo> <serviceClassification>F</serviceClassification> <serviceMarketingCarrier>TK</serviceMarketingCarrier> <serviceGroup>ML</serviceGroup> <serviceSubGroup>DI</serviceSubGroup> </serviceRequirementsInfo> </serviceDescriptionInfo> <commercialName> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>MEAL SERVICE</freeText> </commercialName> </feeDescriptionGrp> </serviceDetailsGrp> <serviceDetailsGrp> <serviceOptionInfo> <dataTypeInformation> <subType>050</subType> </dataTypeInformation> </serviceOptionInfo> <feeDescriptionGrp> <itemNumberInfo> <itemNumberDetails> <number>4</number> <type>SD</type> </itemNumberDetails> </itemNumberInfo> <serviceDescriptionInfo> <serviceRequirementsInfo> <serviceClassification>Z</serviceClassification> <serviceMarketingCarrier>TK</serviceMarketingCarrier> <serviceGroup>BF</serviceGroup> <serviceSubGroup>SE</serviceSubGroup> <serviceFreeText>BS</serviceFreeText> </serviceRequirementsInfo> </serviceDescriptionInfo> <commercialName> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>STANDART SEAT SELECTION</freeText> </commercialName> </feeDescriptionGrp> </serviceDetailsGrp> <serviceDetailsGrp> <serviceOptionInfo> <dataTypeInformation> <subType>056</subType> </dataTypeInformation> </serviceOptionInfo> <feeDescriptionGrp> <itemNumberInfo> <itemNumberDetails> <number>5</number> <type>SD</type> </itemNumberDetails> </itemNumberInfo> <serviceDescriptionInfo> <serviceRequirementsInfo> <serviceClassification>Z</serviceClassification> <serviceMarketingCarrier>TK</serviceMarketingCarrier> <serviceGroup>BF</serviceGroup> <serviceSubGroup>RF</serviceSubGroup> </serviceRequirementsInfo> </serviceDescriptionInfo> <commercialName> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>REFUNDABLE TICKET</freeText> </commercialName> </feeDescriptionGrp> </serviceDetailsGrp> <serviceDetailsGrp> <serviceOptionInfo> <dataTypeInformation> <subType>059</subType> </dataTypeInformation> </serviceOptionInfo> <feeDescriptionGrp> <itemNumberInfo> <itemNumberDetails> <number>6</number> <type>SD</type> </itemNumberDetails> </itemNumberInfo> <serviceDescriptionInfo> <serviceRequirementsInfo> <serviceClassification>Z</serviceClassification> <serviceMarketingCarrier>TK</serviceMarketingCarrier> <serviceGroup>BF</serviceGroup> <serviceSubGroup>VC</serviceSubGroup> <serviceFreeText>CD</serviceFreeText> </serviceRequirementsInfo> </serviceDescriptionInfo> <commercialName> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>CHANGEABLE TICKET</freeText> </commercialName> </feeDescriptionGrp> </serviceDetailsGrp> <serviceDetailsGrp> <serviceOptionInfo> <dataTypeInformation> <subType>CNR</subType> </dataTypeInformation> </serviceOptionInfo> <feeDescriptionGrp> <itemNumberInfo> <itemNumberDetails> <number>7</number> <type>SD</type> </itemNumberDetails> </itemNumberInfo> <serviceAttributesInfo> <attributeDetails> <attributeType>SSR</attributeType> <attributeDescription>INMR</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>RFIC</attributeType> <attributeDescription>G</attributeDescription> </attributeDetails> </serviceAttributesInfo> <serviceDescriptionInfo> <serviceRequirementsInfo> <serviceClassification>F</serviceClassification> <serviceMarketingCarrier>TK</serviceMarketingCarrier> <serviceGroup>IE</serviceGroup> <serviceSubGroup>IT</serviceSubGroup> </serviceRequirementsInfo> </serviceDescriptionInfo> <commercialName> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>ONLINE MESSAGE RIGHT</freeText> </commercialName> </feeDescriptionGrp> </serviceDetailsGrp> </serviceFeesGrp> <serviceFeesGrp> <serviceTypeInfo> <carrierFeeDetails> <type>FBA</type> </carrierFeeDetails> </serviceTypeInfo> <serviceCoverageInfoGrp> <itemNumberInfo> <itemNumber> <number>1</number> </itemNumber> </itemNumberInfo> <serviceCovInfoGrp> <paxRefInfo> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </paxRefInfo> <coveragePerFlightsInfo> <numberOfItemsDetails> <referenceQualifier>RS</referenceQualifier> <refNum>1</refNum> </numberOfItemsDetails> <lastItemsDetails> <refOfLeg>1</refOfLeg> </lastItemsDetails> <lastItemsDetails> <refOfLeg>2</refOfLeg> </lastItemsDetails> </coveragePerFlightsInfo> <refInfo> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> </refInfo> </serviceCovInfoGrp> </serviceCoverageInfoGrp> <globalMessageMarker></globalMessageMarker> <freeBagAllowanceGrp> <freeBagAllownceInfo> <baggageDetails> <freeAllowance>2</freeAllowance> <quantityCode>N</quantityCode> </baggageDetails> </freeBagAllownceInfo> <itemNumberInfo> <itemNumberDetails> <number>1</number> </itemNumberDetails> </itemNumberInfo> </freeBagAllowanceGrp> </serviceFeesGrp> </Fare\_EnrichTravelProposalsReply>

## 5.10.3 Possible Errors

See "Error Messages" section.

* * *

## 5.11 Operation: 03.05 Output Option - Sustainability : Display Carbon Footprint

Committed to the sustainability of future travel the option of displaying the Carbon Footprint of the journey will be displayed in the search response. To note that the emissions themselves will be retrieved from a third party provider which computes them; Amadeus will not be held responsible for the carbon emission values received. **Currently only these providers are assimilated - ICAO and Travalyst (TVYS).**

These carbon emissions will be retrieved based on the designated provider for each transportation mode - flight / train / bus. There would be a possibility to override the provider to be considered for each transportation mode to suit the requestor needs better. 

In addition, the computation methodology used for both reference and estimated carbon emissions can be overridden in input. Currently only possible if the provider is Travalyst and the transportation mode is flight. Two methodologies are handled:

\- Tank-to-Wake (TTW): Emissions produced by burning jet fuel during takeoff, flight, and landing of an aircraft.

\- Well-to-Wake (WTW): The sum of Well-to-Tank (WTT), emissions generated during the production, processing, handling, and delivery of jet fuel, and Tank-to-Wake (TTW) emissions.

**Request** \-

Since the provider of Carbon emissions may vary from one transportation mode to the other (when mixed content is activated for an office id) the user has a possibility to override and choose a provider of their preference. The request has to be provided in format specified below in order to override the default carbon emission providers of choice:

**Input option syntax** when single provider is chosen for multiple transportation modes:

     <carbonEmissionBySourceDetails>  
        <providerPerTransportation>  
                <carbonEmissionProviderCd>**ICAO**</carbonEmissionProviderCd>  
                <transportationModeType>**TRN**</transportationModeType>  
                <transportationModeType>**FLT**</transportationModeType>  
        </providerPerTransportation>  
    </carbonEmissionBySourceDetails>

Where ICAO is the provider code chosen by the requestor to retrieve the estimated carbon emissions for flights and trains

**Input option syntax** when each transportation mode has a different provider:

   <carbonEmissionBySourceDetails>  
        <providerPerTransportation>  
                <carbonEmissionProviderCd>**ICAO**</carbonEmissionProviderCd>  
                <transportationModeType>**TRN**</transportationModeType>  
        </providerPerTransportation>  
        <providerPerTransportation>  
                <carbonEmissionProviderCd>**TVYS**</carbonEmissionProviderCd>  
                <transportationModeType>**FLT**</transportationModeType>  
        </providerPerTransportation>  
    </carbonEmissionBySourceDetails>

**Input option syntax** when methodology WTW is speicifed:

   <carbonEmissionBySourceDetails>  
        <providerPerTransportation>  
                <carbonEmissionProviderCd>**TVYS**</carbonEmissionProviderCd>  
                <computationMethod>**WTW**</computationMethod>  
                <transportationModeType>**FLT**</transportationModeType>  
        </providerPerTransportation>  
    </carbonEmissionBySourceDetails>

**Response** \-

The information regarding the carbon emissions received in the response are as follows:

1. Carbon Emission Provider utilized for fetching the estimated carbon details per transportation mode.

**Syntax**:

   <carbonEmissionBySourceDetails>  
        <providerPerTransportation>  
                <carbonEmissionProviderCd>**ICAO**</carbonEmissionProviderCd>  
                <transportationModeType>**TRN**</transportationModeType>  
        </providerPerTransportation>  
        <providerPerTransportation>  
                <carbonEmissionProviderCd>**TVYS**</carbonEmissionProviderCd>  
                <computationMethod>**WTW**</computationMethod>  
                <transportationModeType>**FLT**</transportationModeType>  
        </providerPerTransportation>  
    </carbonEmissionBySourceDetails>

2. Reference Carbon emissions for a bound or proposed segment (Available only by targeting certain providers). 

**Syntax**:

   <referenceCarbonEmission>  
        <carbonEmissionByCabin>  
                <cabin>**M**</cabin>  
                <quantity>**834**</quantity>  
        </carbonEmissionByCabin>  
    </referenceCarbonEmission>

3. Estimated Carbon emissions for a flight or a segment. 

**Syntax**:

    <estimatedCarbonEmission>  
        <carbonEmissionByCabin>  
                <cabin>**M**</cabin>  
                <quantity>**478**</quantity>  
        </carbonEmissionByCabin>  
    </estimatedCarbonEmission>

## 5.11.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_EnrichTravelProposals xmlns="http://xml.amadeus.com/FMPXAQ\_24\_6\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> <unitNumberDetail> <numberOfUnits>250</numberOfUnits> <typeOfUnit>RC</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <carbonEmissionBySourceDetails> <providerPerTransportation> <carbonEmissionProviderCd>ICAO</carbonEmissionProviderCd> <transportationModeType>TRN</transportationModeType> </providerPerTransportation> <providerPerTransportation> <carbonEmissionProviderCd>TVYS</carbonEmissionProviderCd> <computationMethod>WTW</computationMethod> <transportationModeType>FLT</transportationModeType> </providerPerTransportation> </carbonEmissionBySourceDetails> <fareOptions> <pricingTickInfo> <pricingTicketing> <priceType>TAC</priceType> <priceType>RP</priceType> </pricingTicketing> </pricingTickInfo> </fareOptions> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>JFK</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>LHR</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>110225</date> </firstDateTimeDetail> </timeDetails> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>1</ref> </flightProposal> <flightProposal> <ref>0650</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>VS</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>110225</dateOfDeparture> <timeOfDeparture>0820</timeOfDeparture> <dateOfArrival>110225</dateOfArrival> <timeOfArrival>2010</timeOfArrival> </productDateTime> <location> <locationId>JFK</locationId> <terminal>4</terminal> </location> <location> <locationId>LHR</locationId> <terminal>3</terminal> </location> <companyId> <marketingCarrier>VS</marketingCarrier> <operatingCarrier>VS</operatingCarrier> </companyId> <flightOrtrainNumber>26</flightOrtrainNumber> <productDetail> <equipmentType>339</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> <productDetailQualifier>LCA</productDetailQualifier> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> </itinerary> </Fare\_EnrichTravelProposals>

## 5.11.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_EnrichTravelProposalsReply xmlns="http://xml.amadeus.com/FMPXAR\_24\_6\_1A"> <replyStatus> <status> <advisoryTypeInfo>FQX</advisoryTypeInfo> </status> </replyStatus> <carbonEmissionBySourceDetails> <providerPerTransportation> <carbonEmissionProviderCd>ICAO</carbonEmissionProviderCd> <transportationModeType>TRN</transportationModeType> </providerPerTransportation> <providerPerTransportation> <carbonEmissionProviderCd>TVYS</carbonEmissionProviderCd> <computationMethod>WTW</computationMethod> <transportationModeType>FLT</transportationModeType> </providerPerTransportation> </carbonEmissionBySourceDetails> <conversionRate> <conversionRateDetail> <currency>USD</currency> </conversionRateDetail> </conversionRate> <flightIndex> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>1</ref> </flightProposal> <flightProposal> <ref>0650</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>VS</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>110225</dateOfDeparture> <timeOfDeparture>0820</timeOfDeparture> <dateOfArrival>110225</dateOfArrival> <timeOfArrival>2010</timeOfArrival> </productDateTime> <location> <locationId>JFK</locationId> <terminal>4</terminal> </location> <location> <locationId>LHR</locationId> <terminal>3</terminal> </location> <companyId> <marketingCarrier>VS</marketingCarrier> <operatingCarrier>VS</operatingCarrier> </companyId> <flightOrtrainNumber>26</flightOrtrainNumber> <productDetail> <equipmentType>339</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> <productDetailQualifier>LCA</productDetailQualifier> </addProductDetail> </flightInformation> <estimatedCarbonEmission> <carbonEmissionByCabin> <cabin>M</cabin> <quantity>530</quantity> </carbonEmissionByCabin> </estimatedCarbonEmission> </flightDetails> </groupOfFlights> </flightIndex> <recommendation> <itemNumber> <itemNumberId> <number>1</number> </itemNumberId> </itemNumber> <recPriceInfo> <monetaryDetail> <amount>193.30</amount> </monetaryDetail> <monetaryDetail> <amount>192.30</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>193.30</totalFareAmount> <totalTaxAmount>192.30</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>VS</company> </codeShareDetails> <codeShareDetails> <company>DL</company> </codeShareDetails> </paxFareDetail> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>PEN</textSubjectQualifier> <informationType>70</informationType> </freeTextQualification> <description>TICKETS ARE NON-REFUNDABLE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>LTD</textSubjectQualifier> <informationType>40</informationType> </freeTextQualification> <description>LAST TKT DTE</description> <description>19NOV24</description> <description> - SEE ADV PURCHASE</description> </pricingMessage> </fare> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>T</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <cabinProduct> <rbd>O</rbd> <bookingModifier>T</bookingModifier> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>OLX79SB7</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> </paxFareProduct> </recommendation> <serviceFeesGrp> <serviceTypeInfo> <carrierFeeDetails> <type>FBA</type> </carrierFeeDetails> </serviceTypeInfo> <serviceCoverageInfoGrp> <itemNumberInfo> <itemNumber> <number>1</number> </itemNumber> </itemNumberInfo> <serviceCovInfoGrp> <paxRefInfo> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </paxRefInfo> <coveragePerFlightsInfo> <numberOfItemsDetails> <referenceQualifier>RS</referenceQualifier> <refNum>1</refNum> </numberOfItemsDetails> <lastItemsDetails> <refOfLeg>1</refOfLeg> </lastItemsDetails> </coveragePerFlightsInfo> <refInfo> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> </refInfo> </serviceCovInfoGrp> </serviceCoverageInfoGrp> <globalMessageMarker></globalMessageMarker> <freeBagAllowanceGrp> <freeBagAllownceInfo> <baggageDetails> <freeAllowance>0</freeAllowance> <quantityCode>N</quantityCode> </baggageDetails> </freeBagAllownceInfo> <itemNumberInfo> <itemNumberDetails> <number>1</number> </itemNumberDetails> </itemNumberInfo> </freeBagAllowanceGrp> </serviceFeesGrp> </Fare\_EnrichTravelProposalsReply>

## 5.11.3 Possible Errors

See "Error Messages" section.

* * *

## 5.12 Operation: 03.06 Output Option - Return Amenities

This operation gives you the possibility to retrieve Route Happy Rich Content into the response which allows you to get the details of the on-board facilities also called as amenities that can be offered at flight level. This information is available via specific setting on the targeted office ID via data profile. Once activated by data profile applicable amenities will be returned without provisioning of any specific input. Deactivation of amenities retrieval process is possible via an input. Details provided below under the section - How to suppress retrieval of amenities.

The Amenity content is provided in output at a granularity associating this rich content for each Cabin Class of the proposed travel solutions for a given itinerary.

### How to Read the Amenity Details

In the service grammar, the details of the Amenity is given in the <amenities> section of the <amenitiesGroup>. More specifically, the amenities information is given by the repetitions of the <amenityDetails> section contained in <amenities>. Each repetition gives information on **one** specific amenity (e.g. POWER amenity giving the information that USB IS AVAILABLE on board with Fees). 

**Syntax:** 

In the example below, five amenities are returned. This is shown by the repetition of the <amenityDetails> section.

<amenitiesGroup>  
  <amentities>  
    <amenityDetails>  
      <amenityReference>1</amenityReference>  
      <amenityType>L</amenityType>  <!--Amenity=>Layout-->  
      <rowLayout>33</rowLayout>  <!-- Rowlayout 3 - 3 seated row layout -->  
    </amenityDetails>  
    <amenityDetails>  
      <amenityReference>2</amenityReference>  
      <amenityType>F</amenityType>  <!--Amenity=>Food-->  
      <isChargeable>1</isChargeable>  <!-- Amenity is chargeable -->  
    </amenityDetails>  
    <amenityDetails>  
      <amenityReference>3</amenityReference>  
      <amenityType>B</amenityType>  <!--Amenity=>Beverage-->  
      <amenityAttribute>E</amenityAttribute>  <!-- Alchoholic drink -->  
      <isChargeable>1</isChargeable>  <!-- Amenity is chargeable -->  
    </amenityDetails>  
    <amenityDetails>  
      <amenityReference>4</amenityReference>  
      <amenityType>B</amenityType>  <!--Amenity=>Beverage-->  
      <amenityAttribute>F</amenityAttribute>  <!-- Non Alchoholic drink -->  
      <isChargeable>1</isChargeable>  <!-- Amenity is chargeable -->  
    </amenityDetails>  
    <amenityDetails>  
      <amenityReference>5</amenityReference>  
      <amenityType>S</amenityType>  <!--Amenity=>Seat-->  
      <seatSpace\>28</seatSpace\>  <!--Seat Pitch-->  
      <seatSpaceUnit>IN</seatSpaceUnit>  <!--Inches-->  
      <seatFlateness>3</seatFlateness>  <!-- Not Flat -->  
    </amenityDetails>  
  </amentities>  
</amenitiesGroup>

**Important Note:** Each amenity is returned with a given "reference" number (<amenityReference>). This number allows to relate the amenity details to the specific Cabin Class of the flight given in the proposed travel solutions which offers such service. It is important to specify that several flights/Cabin Class may share the same Amenity. If this is the case, the same Amenity reference number is used inside the different Travel Solution structures. More details about the relation between the Amenity and the associated Cabin Class of the flights is described in the following section.

Inside the Amenity group, several fields are used. Each one displays a specific information on the Amenity. The table below provides additional information about the fields usage.

Field

Usage Description

<amenityReference>

ID of the Amenity, used in the <referencingDetail\> group associated to the cabin class.

<amenityType>

Defines the Type of the amenity.  Possible values

Amenity Type

Amenity Type Code

Power

P

Beverage

B

Layout

L

Seat

S

Entertainment

E

Food

F

Wifi

W

<amenityAttribute>

Each type is composed of several Attribute (e.g. POWER type can have both "USB outlet" "Outlet" etc). Possible values

Amenity Attribute

Amenity Attribute Code

Non Alchoholic

F

Alchoholic  

E

Wifi available  

I

Wifi may be available  

H

None 

7

<isChargeable>

This is a boolean. Used to indicate whether the amenity is free of charge (code set 0 used) or chargeable (code set 1 used)

<seatSpace\>

Used when the amenity Type is referencing the the SEAT. Gives the number of inches of a seat pitch (distance from any point on one seat to the same point on the front seat).

<seatSpaceUnit>

Associated to the SeatSpace value, gives the information on the unit used (cm, inches). If nothing displayed, the information is referencing to inches.

<seatflateness>

Provides information on the orientation of the seat.

None

7

Not flat  

3

Full flat  

2

Angle flat

1

<rowLayout>

Provides information on the Cabin layout. This field is an integer where each number gives the number of seat per row (e.g. 242 => 3 columns of 2seats-4seats-2seats).

**Note** : Amenities details (type, attributes etc) are identified by specific letters. For additional details on the list of code sets used inside the amenity segments, please refer to the Technical Detail of the service.

### How to associate an Amenity to a given Cabin Class

Each amenity has a reference number given in the <amenityReference> section of the <amenityDetails>. Each travel solutions is given by all the information contained in the <> section. Inside this section, the cabin class details of each travel segment are given inside the <groupOfFares\> section. Amenity are referenced to the given cabin class inside the <referencingDetails> of the <fareFamiliesRef\> group. More specifically, anytime the letter "I" is returned in the <refQualifier\> field, the number contained in the <refNumber\> is associated to the number given in the <ameinityReference>. If several amenities are to be associated to the given Cabin Class, a repetition of the <referencingDetail\> is used. 

**Example :**

The following example shows the association between the Cabin Class V of the cabin M with the five Amenities 1-5.

...  
<groupOfFares\>  
  <productInformation\> <= Group given the cabin class information  
    <cabinProduct\>  
      <rbd>V</rbd>  
      <cabin>M</cabin>  
      <avlStatus\>9</avlStatus\>  
    </cabinProduct\>

     .....  
  </productInformation\>  
  <fareFamiliesRef\>  
    <referencingDetail\>  
      <refQualifier\>**I**</refQualifier\>  
      <refNumber\>**1**</refNumber\>  
    </referencingDetail\>  
  <referencingDetail\>  
    <refQualifier\>**I**</refQualifier\>  
    <refNumber\>**2**</refNumber\>  
  </referencingDetail\>  
    <referencingDetail\>  
      <refQualifier\>**I**</refQualifier\>  
      <refNumber\>**3**</refNumber\>  
    </referencingDetail\>  
  <referencingDetail\>  
    <refQualifier\>**I**</refQualifier\>  
    <refNumber\>**4**</refNumber\>  
  </referencingDetail\>  
    <referencingDetail\>  
      <refQualifier\>**I**</refQualifier\>  
      <refNumber\>**5**</refNumber\>  
    </referencingDetail\>  
  </fareFamiliesRef\>  
</groupOfFares\>

**Note :** In the XML returned in output, the Amenity group is always displayed after the Cabin Class information containing the reference to the AmenityReference.

### How to suppress retrieval of Amenities

Only a request level deactivation of amenities can be performed via the provisioning of the flag XAN (Deactivate Amenities) sent in the PTK segment. The input structure otherwise remains unchanged. 

EDIFACT Example: 

Deactivation for processing amenities can be achieved by: PTK+XAN’ 

WBS Example:  
<fareOptions\>  
  <pricingTickInfo\>  
    <pricingTicketing\>  
       <priceType\>XAN</priceType\>  
    </pricingTicketing\>  
  </pricingTickInfo\>  
</fareOptions\>

## 5.12.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_EnrichTravelProposals xmlns="http://xml.amadeus.com/FMPXAQ\_24\_6\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>RC</typeOfUnit> </unitNumberDetail> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>IXZ</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>BOM</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>010425</date> </firstDateTimeDetail> </timeDetails> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>1</ref> </flightProposal> <flightProposal> <ref>0820</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>AI</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>010425</dateOfDeparture> <timeOfDeparture>0945</timeOfDeparture> <dateOfArrival>010425</dateOfArrival> <timeOfArrival>1155</timeOfArrival> </productDateTime> <location> <locationId>IXZ</locationId> </location> <location> <locationId>VTZ</locationId> </location> <companyId> <marketingCarrier>AI</marketingCarrier> <operatingCarrier>AI</operatingCarrier> </companyId> <flightOrtrainNumber>486</flightOrtrainNumber> <productDetail> <equipmentType>32N</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> <productDetailQualifier>AIP</productDetailQualifier> </addProductDetail> <attributeDetails> <attributeType>EFT</attributeType> <attributeDescription>0210</attributeDescription> </attributeDetails> </flightInformation> </flightDetails> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>010425</dateOfDeparture> <timeOfDeparture>1555</timeOfDeparture> <dateOfArrival>010425</dateOfArrival> <timeOfArrival>1805</timeOfArrival> </productDateTime> <location> <locationId>VTZ</locationId> </location> <location> <locationId>BOM</locationId> <terminal>2</terminal> </location> <companyId> <marketingCarrier>AI</marketingCarrier> <operatingCarrier>AI</operatingCarrier> </companyId> <flightOrtrainNumber>654</flightOrtrainNumber> <productDetail> <equipmentType>32N</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> <productDetailQualifier>AIP</productDetailQualifier> </addProductDetail> <attributeDetails> <attributeType>EFT</attributeType> <attributeDescription>0210</attributeDescription> </attributeDetails> </flightInformation> </flightDetails> </groupOfFlights> </itinerary> </Fare\_EnrichTravelProposals>

## 5.12.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_EnrichTravelProposalsReply xmlns="http://xml.amadeus.com/FMPXAR\_24\_6\_1A"> <replyStatus> <status> <advisoryTypeInfo>FQX</advisoryTypeInfo> </status> </replyStatus> <conversionRate> <conversionRateDetail> <currency>EUR</currency> </conversionRateDetail> </conversionRate> <flightIndex> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>1</ref> </flightProposal> <flightProposal> <ref>0820</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>AI</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>010425</dateOfDeparture> <timeOfDeparture>0945</timeOfDeparture> <dateOfArrival>010425</dateOfArrival> <timeOfArrival>1155</timeOfArrival> </productDateTime> <location> <locationId>IXZ</locationId> </location> <location> <locationId>VTZ</locationId> </location> <companyId> <marketingCarrier>AI</marketingCarrier> <operatingCarrier>AI</operatingCarrier> </companyId> <flightOrtrainNumber>486</flightOrtrainNumber> <productDetail> <equipmentType>32N</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> <productDetailQualifier>LCA</productDetailQualifier> </addProductDetail> </flightInformation> </flightDetails> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>010425</dateOfDeparture> <timeOfDeparture>1555</timeOfDeparture> <dateOfArrival>010425</dateOfArrival> <timeOfArrival>1805</timeOfArrival> </productDateTime> <location> <locationId>VTZ</locationId> </location> <location> <locationId>BOM</locationId> <terminal>2</terminal> </location> <companyId> <marketingCarrier>AI</marketingCarrier> <operatingCarrier>AI</operatingCarrier> </companyId> <flightOrtrainNumber>654</flightOrtrainNumber> <productDetail> <equipmentType>32N</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> <productDetailQualifier>LCA</productDetailQualifier> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> </flightIndex> <recommendation> <itemNumber> <itemNumberId> <number>1</number> </itemNumberId> </itemNumber> <recPriceInfo> <monetaryDetail> <amount>163.27</amount> </monetaryDetail> <monetaryDetail> <amount>23.27</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>163.27</totalFareAmount> <totalTaxAmount>23.27</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>AI</company> </codeShareDetails> <pricingTicketing> <priceType>OBF</priceType> <priceType>OBA</priceType> <priceType>OBV</priceType> </pricingTicketing> </paxFareDetail> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>PEN</textSubjectQualifier> <informationType>70</informationType> </freeTextQualification> <description>TICKETS ARE NON-REFUNDABLE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>LTD</textSubjectQualifier> <informationType>41</informationType> </freeTextQualification> <description>LAST TKT DTE</description> <description>01APR25</description> <description> - DATE OF ORIGIN</description> </pricingMessage> </fare> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>G</rbd> <cabin>M</cabin> <avlStatus>6</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>GIP</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> <fareFamiliesRef> <referencingDetail> <refQualifier>I</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>I</refQualifier> <refNumber>2</refNumber> </referencingDetail> <referencingDetail> <refQualifier>I</refQualifier> <refNumber>3</refNumber> </referencingDetail> <referencingDetail> <refQualifier>I</refQualifier> <refNumber>4</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> <groupOfFares> <productInformation> <cabinProduct> <rbd>G</rbd> <cabin>M</cabin> <avlStatus>6</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>GIP</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> <fareFamiliesRef> <referencingDetail> <refQualifier>I</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>I</refQualifier> <refNumber>2</refNumber> </referencingDetail> <referencingDetail> <refQualifier>I</refQualifier> <refNumber>3</refNumber> </referencingDetail> <referencingDetail> <refQualifier>I</refQualifier> <refNumber>4</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> </paxFareProduct> </recommendation> <serviceFeesGrp> <serviceTypeInfo> <carrierFeeDetails> <type>FBA</type> </carrierFeeDetails> </serviceTypeInfo> <serviceCoverageInfoGrp> <itemNumberInfo> <itemNumber> <number>1</number> </itemNumber> </itemNumberInfo> <serviceCovInfoGrp> <paxRefInfo> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </paxRefInfo> <coveragePerFlightsInfo> <numberOfItemsDetails> <referenceQualifier>RS</referenceQualifier> <refNum>1</refNum> </numberOfItemsDetails> <lastItemsDetails> <refOfLeg>1</refOfLeg> </lastItemsDetails> <lastItemsDetails> <refOfLeg>2</refOfLeg> </lastItemsDetails> </coveragePerFlightsInfo> <refInfo> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> </refInfo> </serviceCovInfoGrp> </serviceCoverageInfoGrp> <globalMessageMarker></globalMessageMarker> <freeBagAllowanceGrp> <freeBagAllownceInfo> <baggageDetails> <freeAllowance>15</freeAllowance> <quantityCode>W</quantityCode> <unitQualifier>K</unitQualifier> </baggageDetails> </freeBagAllownceInfo> <itemNumberInfo> <itemNumberDetails> <number>1</number> </itemNumberDetails> </itemNumberInfo> </freeBagAllowanceGrp> </serviceFeesGrp> <amenitiesGroup> <amenities> <amenityDetails> <amenityReference>1</amenityReference> <amenityType>L</amenityType> <rowLayout>33</rowLayout> </amenityDetails> <amenityDetails> <amenityReference>2</amenityReference> <amenityType>F</amenityType> <isChargeable>0</isChargeable> </amenityDetails> <amenityDetails> <amenityReference>3</amenityReference> <amenityType>B</amenityType> <amenityAttribute>F</amenityAttribute> <isChargeable>0</isChargeable> </amenityDetails> <amenityDetails> <amenityReference>4</amenityReference> <amenityType>S</amenityType> <seatSpace>28</seatSpace> <seatSpaceUnit>IN</seatSpaceUnit> <seatFlateness>3</seatFlateness> </amenityDetails> </amenities> </amenitiesGroup> </Fare\_EnrichTravelProposalsReply>

## 5.12.3 Possible Errors

See "Error Messages" section.

* * *

## 5.13 Operation: 04.01 Minirules

You can request a summary of the most important elements of rules related to change and refund situations at recommendation level. The functionality is authorized by appropriate settings at OID level and triggered by input option (MNR).

**Input syntax -**

   <fareOptions>  
        <pricingTickInfo>  
            <pricingTicketing>  
                **<priceType>MNR</priceType>**  
            </pricingTicketing>  
        </pricingTickInfo>  
    </fareOptions>

The following information is returned for each recommendation:

-   Conditions for change with revalidation and the maximum applicable revalidation penalty fee per journey
-   Conditions for change with reissue and the minimum and maximum applicable reissue penalty fees per journey
-   Refund conditions and the minimum and maximum applicable refund penalty fees per journey
-   Category 16 matched and contains free-form text

Only before departure related data are returned.

The currency applicable to the penalty amounts is the same currency as the currency applicable to the recommendations.

The currency of the penalty amounts may therefore reflect input options such as currency conversion or selling city override options.

When multiple passengers, penalty amounts are computed for 1 passenger only.

Keyword

Description

Value

ASS

The category is not coded, not validated or negated

None

FFT

Part of rule is free form text from category 16

1 if part of the rule is free form text from category 16

RVJ

Revalidation of ticket before departure

0 if not allowed  
1 if allowed with restrictions

BDJ

Reissue/Refund of ticket before departure

0 if not allowed  
1 if allowed with restrictions

BDC

Revalidation maximum penalty amount for the ticket

Amount (default value: 0)

BDT

Reissue/Refund maximum penalty amount for the ticket

Amount (default value: 0)

BDS

Reissue/Refund minimum penalty amount for the ticket (specific actvation required )

Amount (default value: 0)

BDP

Refund time-based penalty amount for the ticket (specific actvation required)

Amount (default value: 0)

The reply illustrates 3 recommendations with different rules conditions:

Rule condition #1

Rule condition #2

Rule condition #3

Reissue (Category 31)

Revalidation allowed (RVJ)

300.00 euros (BDC)

Change allowed (BDJ)

300.00 euros (BDT)

100.00 euros (BDS)

Revalidation not allowed (RVJ)

Change allowed (BDJ)

120.00 euros (BDT)

30.00 euros (BDS)

Assumption (ASS)

Refund (Category 33)

Refund allowed (BDJ)

300.00 euros (BDT)

300 euros 72h before departure (BDP)

100.00 euros (BDS)

100 euros 24h before departure (BDP)

Refund not allowed (BDJ)

Part of rule is free-form text from category 16 (FFT)

Assumption (ASS)

**Output syntax** \-

<**mnrGrp**\>  
    <mnr>  
        <category>LST</category>  
    </mnr>  
    <mnrDetails>  
        <mnrRef>  
            <itemNumberDetails>  
                <number>1</number>  
            </itemNumberDetails>  
        </mnrRef>  
        <**catGrp**\>  
            <catInfo>  
                <descriptionInfo>  
                    <number>**31**</number>  
                </descriptionInfo>  
            </catInfo>  
            <**monInfo**\>  
                <monetaryDetails>  
                    <typeQualifier>**BDC**</typeQualifier>  
                    <amount>**300.00**</amount>  
                </monetaryDetails>  
                <otherMonetaryDetails>  
                    <typeQualifier>**BDT**</typeQualifier>  
                    <amount>**300.00**</amount>  
                </otherMonetaryDetails>  
            </monInfo>  
            <**statusInfo**\>  
                <statusInformation>  
                    <indicator>**RVJ**</indicator>  
                    <action>**1**</action>  
                </statusInformation>  
                <statusInformation>  
                    <indicator>**BDJ**</indicator>  
                    <action>**1**</action>  
                </statusInformation>  
            </statusInfo>  
        </catGrp>  
        <**catGrp**\>  
            <catInfo>  
                <descriptionInfo>  
                    <number>**33**</number>  
                </descriptionInfo>  
            </catInfo>  
            <**monInfo**\>  
                <MonetaryDetails>  
                    <typeQualifier>**BDT**</typeQualifier>  
                    <amount>**300.00**</amount>  
                </MonetaryDetails>  
            </monInfo>  
            <**statusInfo**\>  
                <statusInformation>  
                    <indicator>**BDJ**</indicator>  
                    <action>**1**</action>  
                </statusInformation>  
            </statusInfo>  
        </catGrp>  
    </mnrDetails>  
</mnrGrp>

**Output syntax** \- when minimum and time-based penalty amounts are returned which requires specific actvation 

<**mnrGrp**\>  
    <mnr>  
        <category>LST</category>  
    </mnr>  
    <mnrDetails>  
        <mnrRef>  
            <itemNumberDetails>  
                <number>1</number>  
            </itemNumberDetails>  
        </mnrRef>  
        <**catGrp**\>  
            <catInfo>  
                <descriptionInfo>  
                    <number>**31**</number>  
                </descriptionInfo>  
            </catInfo>  
            <**monInfo**\>  
                <monetaryDetails>  
                    <typeQualifier>**BDC**</typeQualifier>  
                    <amount>**300.00**</amount>  
                </monetaryDetails>

                _<otherMonetaryDetails>  
                    <typeQualifier>**BDS**</typeQualifier>  
                    <amount>**100.00**</amount>  
                </otherMonetaryDetails>_

                <otherMonetaryDetails>  
                    <typeQualifier>**BDT**</typeQualifier>  
                    <amount>**300.00**</amount>  
                </otherMonetaryDetails>  
            </monInfo>  
            <**statusInfo**\>  
                <statusInformation>  
                    <indicator>**RVJ**</indicator>  
                    <action>**1**</action>  
                </statusInformation>  
                <statusInformation>  
                    <indicator>**BDJ**</indicator>  
                    <action>**1**</action>  
                </statusInformation>  
            </statusInfo>  
        </catGrp>  
        <**catGrp**\>  
            <catInfo>  
                <descriptionInfo>  
                    <number>**33**</number>  
                </descriptionInfo>  
            </catInfo>  
            <**monInfo**\>

                _<MonetaryDetails>  
                    <typeQualifier>**BDS**</typeQualifier>_                    _<amount>**100.00**</amount>  
                </MonetaryDetails>_

                <otherMonetaryDetails>  
                    <typeQualifier>**BDT**</typeQualifier>  
                    <amount>**300.00**</amount>  
                </otherMonetaryDetails>  
            </monInfo>

            _<**mnrTimeBoundPenalties**\>                _<penaltyDetails>_                    _<qualifier>**BDP**</qualifier> #Before flight DeParture  
                    <isApplicable>**1**</isApplicable>     #allowed_  
                    <amount>**300**</amount> #penalty=300 euros                    _<numberOfHours>**72**</numberOfHours>     #until 72 hours__                _</penaltyDetails>                __<penaltyDetails>_                    _<qualifier>**BDP**</qualifier> _#Before flight DeParture_  
                    <isApplicable>**1**</isApplicable>          _#allowed__  
                    <amount>1**00**</amount> _#penalty=100 _euros__                    _<numberOfHours>**24**</numberOfHours>     _#until 24 hours___                _</penaltyDetails>                __<penaltyDetails>_                    _<qualifier>**BDP**</qualifier> ____#Before flight DeParture____  
                    <isApplicable>**0**</isApplicable>     _#not allowed 24h or less___                _</penaltyDetails>__  
            </_mnrTimeBoundPenalties_\>_

            <**statusInfo**\>  
                <statusInformation>  
                    <indicator>**BDJ**</indicator>  
                    <action>**1**</action>  
                </statusInformation>  
            </statusInfo>  
        </catGrp>  
    </mnrDetails>  
</mnrGrp>

The first penalty amount displayed in output is computed in <MonetaryDetails> and the others are in <otherMonetaryDetails>. 

To note that the way of receiving these amounts isn't set in a particular order. 

## 5.13.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_EnrichTravelProposals xmlns="http://xml.amadeus.com/FMPXAQ\_24\_6\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>RC</typeOfUnit> </unitNumberDetail> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fareOptions> <pricingTickInfo> <pricingTicketing> <priceType>MNR</priceType> </pricingTicketing> </pricingTickInfo> </fareOptions> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>IXZ</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>BOM</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>010425</date> </firstDateTimeDetail> </timeDetails> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>1</ref> </flightProposal> <flightProposal> <ref>0820</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>AI</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>010425</dateOfDeparture> <timeOfDeparture>0945</timeOfDeparture> <dateOfArrival>010425</dateOfArrival> <timeOfArrival>1155</timeOfArrival> </productDateTime> <location> <locationId>IXZ</locationId> </location> <location> <locationId>VTZ</locationId> </location> <companyId> <marketingCarrier>AI</marketingCarrier> <operatingCarrier>AI</operatingCarrier> </companyId> <flightOrtrainNumber>486</flightOrtrainNumber> <productDetail> <equipmentType>32N</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> <productDetailQualifier>AIP</productDetailQualifier> </addProductDetail> <attributeDetails> <attributeType>EFT</attributeType> <attributeDescription>0210</attributeDescription> </attributeDetails> </flightInformation> </flightDetails> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>010425</dateOfDeparture> <timeOfDeparture>1555</timeOfDeparture> <dateOfArrival>010425</dateOfArrival> <timeOfArrival>1805</timeOfArrival> </productDateTime> <location> <locationId>VTZ</locationId> </location> <location> <locationId>BOM</locationId> <terminal>2</terminal> </location> <companyId> <marketingCarrier>AI</marketingCarrier> <operatingCarrier>AI</operatingCarrier> </companyId> <flightOrtrainNumber>654</flightOrtrainNumber> <productDetail> <equipmentType>32N</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> <productDetailQualifier>AIP</productDetailQualifier> </addProductDetail> <attributeDetails> <attributeType>EFT</attributeType> <attributeDescription>0210</attributeDescription> </attributeDetails> </flightInformation> </flightDetails> </groupOfFlights> </itinerary> </Fare\_EnrichTravelProposals>

## 5.13.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_EnrichTravelProposalsReply xmlns="http://xml.amadeus.com/FMPXAR\_24\_6\_1A"> <replyStatus> <status> <advisoryTypeInfo>FQX</advisoryTypeInfo> </status> </replyStatus> <conversionRate> <conversionRateDetail> <currency>EUR</currency> </conversionRateDetail> </conversionRate> <flightIndex> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>1</ref> </flightProposal> <flightProposal> <ref>0820</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>AI</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>010425</dateOfDeparture> <timeOfDeparture>0945</timeOfDeparture> <dateOfArrival>010425</dateOfArrival> <timeOfArrival>1155</timeOfArrival> </productDateTime> <location> <locationId>IXZ</locationId> </location> <location> <locationId>VTZ</locationId> </location> <companyId> <marketingCarrier>AI</marketingCarrier> <operatingCarrier>AI</operatingCarrier> </companyId> <flightOrtrainNumber>486</flightOrtrainNumber> <productDetail> <equipmentType>32N</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> <productDetailQualifier>LCA</productDetailQualifier> </addProductDetail> </flightInformation> </flightDetails> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>010425</dateOfDeparture> <timeOfDeparture>1555</timeOfDeparture> <dateOfArrival>010425</dateOfArrival> <timeOfArrival>1805</timeOfArrival> </productDateTime> <location> <locationId>VTZ</locationId> </location> <location> <locationId>BOM</locationId> <terminal>2</terminal> </location> <companyId> <marketingCarrier>AI</marketingCarrier> <operatingCarrier>AI</operatingCarrier> </companyId> <flightOrtrainNumber>654</flightOrtrainNumber> <productDetail> <equipmentType>32N</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> <productDetailQualifier>LCA</productDetailQualifier> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> </flightIndex> <recommendation> <itemNumber> <itemNumberId> <number>1</number> </itemNumberId> </itemNumber> <recPriceInfo> <monetaryDetail> <amount>163.27</amount> </monetaryDetail> <monetaryDetail> <amount>23.27</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>M</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>163.27</totalFareAmount> <totalTaxAmount>23.27</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>AI</company> </codeShareDetails> <pricingTicketing> <priceType>OBF</priceType> <priceType>OBA</priceType> <priceType>OBV</priceType> </pricingTicketing> </paxFareDetail> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>PEN</textSubjectQualifier> <informationType>70</informationType> </freeTextQualification> <description>TICKETS ARE NON-REFUNDABLE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>LTD</textSubjectQualifier> <informationType>41</informationType> </freeTextQualification> <description>LAST TKT DTE</description> <description>01APR25</description> <description> - DATE OF ORIGIN</description> </pricingMessage> </fare> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>G</rbd> <cabin>M</cabin> <avlStatus>6</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>GIP</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> </groupOfFares> <groupOfFares> <productInformation> <cabinProduct> <rbd>G</rbd> <cabin>M</cabin> <avlStatus>6</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>GIP</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> </paxFareProduct> </recommendation> <serviceFeesGrp> <serviceTypeInfo> <carrierFeeDetails> <type>FBA</type> </carrierFeeDetails> </serviceTypeInfo> <serviceCoverageInfoGrp> <itemNumberInfo> <itemNumber> <number>1</number> </itemNumber> </itemNumberInfo> <serviceCovInfoGrp> <paxRefInfo> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </paxRefInfo> <coveragePerFlightsInfo> <numberOfItemsDetails> <referenceQualifier>RS</referenceQualifier> <refNum>1</refNum> </numberOfItemsDetails> <lastItemsDetails> <refOfLeg>1</refOfLeg> </lastItemsDetails> <lastItemsDetails> <refOfLeg>2</refOfLeg> </lastItemsDetails> </coveragePerFlightsInfo> <refInfo> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> </refInfo> </serviceCovInfoGrp> </serviceCoverageInfoGrp> <globalMessageMarker></globalMessageMarker> <freeBagAllowanceGrp> <freeBagAllownceInfo> <baggageDetails> <freeAllowance>15</freeAllowance> <quantityCode>W</quantityCode> <unitQualifier>K</unitQualifier> </baggageDetails> </freeBagAllownceInfo> <itemNumberInfo> <itemNumberDetails> <number>1</number> </itemNumberDetails> </itemNumberInfo> </freeBagAllowanceGrp> </serviceFeesGrp> <mnrGrp> <mnr> <category>LST</category> </mnr> <mnrDetails> <mnrRef> <itemNumberDetails> <number>1</number> </itemNumberDetails> </mnrRef> <catGrp> <catInfo> <descriptionInfo> <number>31</number> </descriptionInfo> </catInfo> <monInfo> <monetaryDetails> <typeQualifier>BDS</typeQualifier> <amount>0.00</amount> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>BDT</typeQualifier> <amount>112.00</amount> </otherMonetaryDetails> </monInfo> <statusInfo> <statusInformation> <indicator>RVJ</indicator> <action>0</action> </statusInformation> <statusInformation> <indicator>BDJ</indicator> <action>1</action> </statusInformation> <statusInformation> <indicator>GUA</indicator> <action>1</action> </statusInformation> </statusInfo> </catGrp> <catGrp> <catInfo> <descriptionInfo> <number>33</number> </descriptionInfo> </catInfo> <monInfo> <monetaryDetails> <typeQualifier>BDS</typeQualifier> <amount>0.00</amount> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>BDT</typeQualifier> <amount>78.00</amount> </otherMonetaryDetails> </monInfo> <mnrTimeBoundPenalties> <penaltyDetails> <qualifier>BDP</qualifier> <isApplicable>1</isApplicable> <amount>0.00</amount> <numberOfDays>289</numberOfDays> <numberOfHours>14</numberOfHours> <numberOfMinutes>44</numberOfMinutes> </penaltyDetails> <penaltyDetails> <qualifier>BDP</qualifier> <isApplicable>1</isApplicable> <amount>56.00</amount> <numberOfDays>3</numberOfDays> </penaltyDetails> <penaltyDetails> <qualifier>BDP</qualifier> <isApplicable>1</isApplicable> <amount>78.00</amount> <numberOfHours>2</numberOfHours> </penaltyDetails> <penaltyDetails> <qualifier>BDP</qualifier> <isApplicable>0</isApplicable> </penaltyDetails> </mnrTimeBoundPenalties> <statusInfo> <statusInformation> <indicator>BDJ</indicator> <action>1</action> </statusInformation> <statusInformation> <indicator>GUA</indicator> <action>1</action> </statusInformation> </statusInfo> </catGrp> </mnrDetails> </mnrGrp> </Fare\_EnrichTravelProposalsReply>

## 5.13.3 Possible Errors

If display change / refund conditions or minirules option is requested in input but not authorized via configuration "Invalid option" error is raised.

* * *