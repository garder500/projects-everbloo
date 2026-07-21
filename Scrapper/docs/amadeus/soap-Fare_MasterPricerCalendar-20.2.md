---
url: "https://developers.amadeus.com/api-library/soap/functional-doc/12/doc-read/140424?serviceVersion=20.2"
download_url: "https://developers.amadeus.com/PAS-EAS/api/download/comp/4d4ad2cb456c02633f463a055ab70584/140424/UG_WBS_Fare_MasterPricerCalendar_FMPCAQ_20.2_007.html"
title: "HTML_UG_WBS_Fare_MasterPricerCalendar_FMPCAQ_20.2_007"
source: "amadeus"
service_id: "12"
service_name: "Fare_MasterPricerCalendar"
version: "20.2"
document_id: "140424"
doc_version: "20.2"
doc_type: "User guide"
scraped_at: "2026-07-15T10:13:37.852Z"
---
# Function: Fare\_MasterPricerCalendar

* * *

## 1 Overview

## 1.1 Supported Operations

### What is an "Operation"?

In this document, an "operation" describes, in general, a possible query scenario. More precisely, this operation corresponds very often to the use of an option. However, in some cases, it describes a scenario that points out to a feature that needs further clarification.

### Search with Only Mandatory Elements

The mandatory elements to specify in a calendar query are:

Origin/Destination

At least one origin and one destination must be specified.

Passenger Information  
  
The number of seats and the Passenger Type Codes for Travelling Passengers are required.

Range of Dates

A range of dates has to be specified.

### Search with Optional Elements

Specifying additional optional elements in the search request will narrow the recommendations returned. The more optional elements included in the search request, the more precise the search recommendations will be.

Flight Options

-   Airline (Include/Exclude)

The user has the ability to include and/or exclude up to 99 Airlines in the Low Fare Search using a 2-alphanumeric character airline code.

-   Flight Category

The user has the ability to request Non-Stop, Direct or Connecting flights or a combination of these categories.

-   Connecting Point

The user has the ability to include and/or exclude up to 2 connecting points for the requested Low Fare Search.

-   Disable biased reference

When this option is requested, the flight search request is performed in neutral mode independently of office ID settings.

-   More overnights

The user has the ability to request more overnight solutions if they are part of the cheapest solutions.

-   No Slice and Dice

The user has the ability to disable Slice and Dice process with an option in the query.

-   Exclude Low Cost Carriers

The user has the possibility via this option to exclude TLA Recommendations.

-   Online

This option forces the process to return online travel solutions only, even if cheaper recommendations mixing carriers exist.

-   Progressive legs

Progressive legs enables the user to request a range of number of connections relative to the minimum connections that exist on Journey Server.

Fare Options

-   Currency Conversion

The user has the ability to specify in which currency the fare recommendations must be converted and returned.

-   Currency of Fare Selection

The user has the ability to only request recommendations with fare filed in a specified currency.

-   Selling/Ticketing Cities Override

The user has the ability to override the Selling and/or Ticketing Cities.

-   Price to Beat

The user has the ability to specify a "Price to Beat", a total amount (including taxes) for all passengers which determines the most expensive recommendation that can be returned by the system.

-   Split / No Split PNR

The user is able to request that non-homogeneous recommendations are to be returned or not, and require to book passengers on several PNRs.

-   Paper Ticket / Electronic Ticket

This option offers to the user the capability to process Paper Ticket only or Electronic Ticket only.

-   Unifares

By default, the low fare searches are applicable only to public fares. However, the user can specify whether the low fare search applies on Unifares only, on all Public and Unifare or Corporate fares.

-   Expanded Parameters

The user can specify Expanded Parameters that are used to target only some fares (refundable, without penalty, and so on). Only valid expanded parameter options applicable: NAP, NPE, NR and RF.

-   My Search - Fare Families

By default, any applicable fare can be returned, using My Search option the user can specify which fares he is interested in by using criteria like Fare Basis, Prime booking Code.

-   Cabin Options

The user has the ability to specify a desired cabin class for the requested itinerary. There are three different flavours of process: Mandatory, Recommended and Major Cabin that are described in the corresponding operations.

-   Price only PTC

The process returns strictly recommendations with the requested passenger type, no defaulting is done.

Service Fees Options

-   Pricing Scheme reference

The user has the ability to specify a Pricing Scheme Reference for the calculation of a service fee by passenger of a recommendation.

-   Form of Payment

The user has the ability to specify up to 3 forms of payment.

-   Sorting with/without Fees

This option provides the possibility to sort recommendations based on an amount including fees or excluding fees. It is applied for all passengers of the query.

-   Exempt all airline ticketing fees

Airline ticketing fees can all be exempted with this option.

-   Add/Exempt airline ticketing fees by sub-code

Airline ticketing fees (OB fees) sub-codes can be specified in order to add or exempt particular fees.

## 1.2 Limitations

None

## 1.3 Unsupported Operations

None

## 1.4 Prerequisites

None

## 2 Building A Query

Each query follows a given structure. The queries for the function operations are clearly explained with data element examples in a generic table view.

It is important to note that the examples in each chapter are only illustrations and are meant to provide the basis for a better understanding on which fields are mandatory for basic operation utilisation. In some cases, it is not a full explanation of every field that can be utilised for the operation, but rather a guideline to its use.

When building a query it is important to understand the following concepts for calendar search queries:

### What is a Parameterized Fare Family?

A Parameterized Fare Family is a set of specific parameters directly specified through the request. Up to 6 Parameterized Fare Families can be defined in the query. The parameterized Fare Family can be combined with any other option as long as the request remains functionally coherent.

### What is a Requested Segment?

A "Requested Segment" is an Origin/Destination segment of the travel requested in the query.

Examples:

-   CDG to JFK on 26 June
-   CDG to JFK on 26 June or 27 June
-   LON to BKK on 26 June +/-3 days

### What is an Itinerary?

An "Itinerary" is the combination of all the Requested Segments in the order the passenger specified them.

### Optional Parameters

The optional parameters may apply at the Requested Segment and/or Itinerary level. The following table gives the rule for each option in terms of applicable levels:

Options

Segment

Itinerary

Flight Options

Number of recommendations

  

X

Airline

X

X

Cabin

  

X

Time Window

X

  

Time: Departure Arrival

X

  

Connecting point

X

  

Expanded Parameter

  

X

Flight Category

X

X

Selling/Ticketing Cities

  

X

No Slice and Dice

  

X

Disabled Biased Reference

  

X

Online

X

X

Progressive legs

X

X

Fare Options

Passenger Type

  

X

Price to Beat

  

X

Unifares

  

X

Parameterized Fare Family

  

X

Split/No Split PNR

  

X

Currency Conversion

  

X

Paper Ticket/Electronic Ticket

  

X

Ticketability pre-check

  

X

Expanded Parameters

  

X

Withhold all taxes/surcharges

  

X

Service Fees: Pricing Scheme reference

X

Service Fees in Fare Shopping product

X

X

Multi-Tickets

  

X

Form of payment

  

X

Adding/exempting specific airline ticketing fees

  

X

Exempt all airline ticketing fees

  

X

Exclude Ticketless Access Carriers

  

X

Sorting with/without Fees

  

X

Fare Family Distribution

  

X

Price Only PTC

  

X

Date Options

Range of Dates

X

  

Output Options

  

  

Empty Cells Clarification

  

X

Rank in Journey Server

  

X

Light Output

  

X

The input validation of each option is described in the corresponding sections.

Option requested at both requested segment level and itinerary level

If an option applies at both Requested Segment and Itinerary levels and if the request is not rejected, as specified in the description of the corresponding option paragraph, then the option specified at the Requested Segment level takes precedence over the Itinerary option.

Examples:

Request

Process

1st Requested Segment

2nd Requested Segment

Itinerary

1st Requested Segment

2nd Requested Segment

Include Airlines: AA, CO

  

Include Airlines: AA, DL

Include Airlines: AA, CO

Include Airlines: AA, DL

Include Airlines: FL, CO, YY

  

Exclude Airlines: AA, DL

Include Airlines: FL, CO eventually combined with any airline but AA, DL.

Exclude Airlines: AA, DL

## 3 Receiving A Reply

For each query requested, either an applicable error message or a valid response is returned. Applicable error message information is provided under each element section within this document. The reply information varies depending on the query information provided.

When receiving a reply it is important to understand the following concepts for the Master Pricer calendar answers:

Fare Family

Fare Families defined in the input request by the Parameterized Fare Family option can only be characterised by:

-   Publishing carrier
-   Type of fare (for example Published, DDF, Amadeus Nego, ATP Nego)
-   Fare basis
-   Prime booking code

A combinability tag and a ranking are also provided.

-   The combinability tag prevents fare families from being combined.
-   The ranking is used to the resulting fare family in case where fare families are combined.

### What is a Recommendation?

A "Recommendation" is the association of a journey and its corresponding price that is returned as a possible solution.

### What is a Journey?

A "Journey" is a combination of Proposed Segments covering the requested Itinerary.

### What is a Proposed Segment?

A "Proposed Segment" is a combination of flights that matches a Requested Segment. This may result in 3 connecting flights being considered as a single "Proposed segment".

Examples:

Requested Segment

Proposed Segment

SYD to JFK on 26 June

AF flight 22 on 26 June

LON to BKK on 26 June

LH flight 4629 LHR to FRA 26 June  
LH flight 744 FRA to BKK 26 June

NCE to SBN on 28 July

AF flight 7701 NCE to CDG 28 July  
AF flight 050 CDG to ORD 28 July  
UA flight 5860 ORD to SBN 28 July

### Electronic Ticketing

The Electronic Ticketing indicator indicates whether a flight is eligible for electronic ticketing (value 'Y' for Yes) or not (value 'N' for No).

addProductDetail - Data element

Value

/electronicTicketing

Y

/electronicTicketing

N

### Slice & Dice

The Slice and Dice process aim is to consider all availabilities that may be used in order to optimise the price of an itinerary, and to apply the same class combination restrictions as the one applied by the carriers.

When Slice and Dice process is applied, the availability context is returned in the response. This context will have to be used to book the solution returned by the engine.

Let's consider an example of a 3-segment eligible connection, between the 4 cities A, B, C and D, where the 3 flights are AB, BC, and CD.

Without Slice and Dice process, only O&D availability AD is checked. With the Slice and Dice process, local availabilities AB, BC, CD and Sub O&D availabilities AC and BD (respectively named Sub O&D 1 and Sub O&D 2) will also have to be checked.

This means that in case an O&D context (default processing, no extra information about availability context), all flights of the connection have to be sold at the same time. In case of Sub O&D, the two corresponding flights must be sold together and in case of local context, the corresponding flight has to be sold alone.

In the segmentFlightRef of the response message structure, an additional refQualifier with the value A (for Recommendation Availability context) is added with its refNumber:

SearchReply - Data element

Example

Description

segmentFlightRef / referencingDetail / refQualifier

S

Reference of Proposed Segment

segmentFlightRef / referencingDetail / refNumber

3

Index of Proposed Segment

segmentFlightRef / referencingDetail / refQualifier

A

Reference to availability

segmentFlightRef / referencingDetail / refNumber

1

Index to availability context

\-

\-

\-

Recommendation 1 references Proposed segment 3 and availability context 1, and recommendation 2 references Proposed Segment 4 and availability context 2.

The corresponding description for each reference of a recommendation availability context is given in the group specificRecDetails. This group contains the following sub-groups:

-   the specificRecItem with the referenceType A and the refNumber,
-   the specificProductDetails which contains the productReferences with the paxFareNum,
-   the fareContextDetails which contains the requestedSegmentInfo with the segRef,
-   the cnxContextDetails which contains the fareCnxInfo with the contextDetails and the availabilityCnxType.

Note: Possible values for the availabilityCnxType are:

-   LA for Local Availability
-   S1 for Sub O&D 1
-   S2 for Sub O&D 2
-   default is the O&D context

Output example:

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

Availability context local for first flight of Proposed Segment

fareContextDetails/ cnxContextDetails\[2\]/ fareCnxInfo/ contextDetails/ availabilityCnxType

LA

Availability context local for second flight of Proposed Segment

### Free Baggage Allowance (FBA)

The FBA information describes the free baggage allowed per flight and per passenger type for each recommendation. It includes the policy (weight or pieces) and units (kilos or pounds).

In case of multiple passenger types, the FBA is only calculated for the adult passenger type. For example, if we have an adult, a child and an infant, the FBA returned is the FBA of the adult. In case no adult passenger type is requested, the FBA returned is the FBA of the first passenger type.

The functionality is triggered by a setting at OID level or by input option.

### Airline Fare Family information

This option allows the user to have the Airline Fare Family name and description  attached within a recommendation. This information is returned by Fare Component or by requested segment. This is triggered by a setting at OID level and by input option.

## 4 Error Messages

### Possible Option Level Errors

Option cannot be applied at Requested Segment Level

If an option is only valid at the Itinerary level but the user has specified it at the Requested Segment level, the entire entry is rejected with the following message:

"OPTION CANNOT BE APPLIED AT REQUESTED SEGMENT LEVEL"

Option cannot be applied at Itinerary Level

If an option is only valid at the Requested Segment level but the user has specified it at the Itinerary level, the entire entry is rejected with the following message:

"OPTION CANNOT BE APPLIED AT ITINERARY LEVEL"

### General Query Errors

Specific error conditions exist for each mandatory and optional parameter in the query. However, as these errors may be returned in several instances and it is not always apparent to which operational parameter they apply, this section provides the following general errors that may be returned when building a query.

### Local Application Error

If a mandatory element is missing in the query structure, including any elements that are deemed mandatory via an association to another optional parameter, the entire entry is rejected locally by the API application.

### Common Errors

It should be noted here that these messages are returned in the instances when no recommendations can be found.

No Recommendation Found For Requested Itinerary/Options

Whenever the search does not find any recommendation matching the requested options, the query is rejected with the following message:

"NO RECOMMENDATION FOUND FOR REQUESTED ITINERARY/OPTIONS"

Available Flight Found For Requested Segment NN

In the current search process, when no flight is available (For example, all the flights matching the requested itinerary are set to 0 or closed), the transaction is rejected with the message:

"NO AVAILABLE FLIGHT FOUND FOR THE REQUESTED SEGMENT nn"

Where nn represents the first impacted requested segment number

The following messages are returned when there is an error in the search input.

Latest Future Date Possible ddmmmyy

A reject message is produced by the server indicating that a query is too far into the future when it goes beyond the latest possible date. The corresponding reject message is:

"LATEST FUTURE DATE POSSIBLE ddmmmyy"

Too Many Airline Codes

If more than 99 airline codes are specified at the "Include Airline" option level, the entire entry is rejected and the following message is returned:

"TOO MANY AIRLINE CODES"

Too Many Requested Segments

Up to 2 Requested Segments are allowed. If this check fails, the entire entry is rejected with the following message:

"TOO MANY REQUESTED SEGMENTS"

Invalid Value (Coded) - Conversion Rate

If an unknown Currency is specified in the search entry, the entire request is rejected and the following error message is returned:

"INVALID VALUE (CODED) - CONVERSION RATE"

Invalid Value (Coded)

If an unauthorised value is specified in a field flagged as "coded" at the search input message level, the entire entry is rejected and, if no other specific error message exists, the following generic reject message is returned:

"INVALID VALUE (CODED) - XXX"

where XXX is the Segment smart name (for example, paxReference)

**Note:** When a field is flagged as coded, refer to the corresponding code set to check the list of values authorised:

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

Overlapping Origin/Destination Segment

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

944

Invalid flight category

945

Non-stop cannot be requested with connect point option

946

Invalid connecting point

947

Same city/airport code cannot be included and excluded

950

Invalid City

952

Conflicting options used

953

Invalid Unifare option

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

988

EXCEEDS MAXIMUM DISCOUNT CODES FOR A PASSENGER

989

SPECIFIC RANGE OF DATES IN CALENDAR

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

998

INVALID TYPE OF FARE REQUESTED

999

INVALID FARE FAMILY COMBINABILITY REQUESTED

997

INVALID GENERIC FARE BASIS REQUESTED

\-

INVALID PRIME BOOKING CODE

\-

TOO MANY FARE FAMILIES

\-

TOO MANY MATCHING ATTRIBUTE SETS REQUESTED

\-

TOO MANY ATTRIBUTE OCCURRENCES

\-

INVALID FARE FAMILY NAME REQUESTED

\-

INVALID CARRIER REQUESTED

836

DATE OVERRIDE OPTION NOT ALLOWED

## 4.1 Error Reply

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_MasterPricerCalendarReply xmlns="http://xml.amadeus.com/FMPCAR\_20\_2\_1A"> <errorMessage> <applicationError> <applicationErrorDetail> <error>931</error> </applicationErrorDetail> </applicationError> <errorMessageText> <freeTextQualification> <textSubjectQualifier>1</textSubjectQualifier> </freeTextQualification> <description>NO ITINERARY FOUND FOR REQUESTED SEGMENT 1</description> </errorMessageText> </errorMessage> </Fare\_MasterPricerCalendarReply>

  

* * *

## 5 Operations

## 5.1 Operation: 01 - Search With Mandatory Elements

### Search with Only Mandatory Elements

Specifying only the mandatory elements allows for the search possibilities of a specified range of dates, city pair and commercial fare family or parameterized fare family.

Itinerary Date

A date of travel must be specified for a calendar query.

Origin/Destination

At least one origin and one destination must be specified for a calendar query.

Passenger Information

Number of Passenger Seats

The number of seats required for the travelling passengers must be specified for a calendar. This number may not always be equal to the total number of passengers travelling. For example, 3 Adults and 1 Infant - as an infant does not occupy a seat, this request requires only 3 seats for 4 travelling passengers.

Associated Passenger Type Codes for Travelling Passengers

Each travelling passenger must be associated to a passenger type code for a calendar.

Range of Dates

The user has to request for a calendar search on a range of dates for each trip segment.

## 5.1.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_MasterPricerCalendar xmlns="http://xml.amadeus.com/FMPCAQ\_20\_2\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>NCE</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>LHR</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>030410</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>3</dayInterval> </rangeOfDate> </timeDetails> </itinerary> </Fare\_MasterPricerCalendar>

## 5.1.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.1.3 Possible Errors

See "Error Messages" section.

* * *

## 5.2 Operation: 02.01 Flight Option - Airline (Include/Exclude)

The Include and Exclude options may be combined with any other option. Both the Include and Exclude options may be utilised in the same request. The Preferred option can be combined with any other option but the Preferred Connecting Point. And it cannot be specified at the same level (itinerary, same requested segment) as the Include/Exclude Airline options.

If a YY carrier code is used in the "Include" option at the same time as a specific Airline, then, this specific Airline can be proposed as Non-Stop or Direct flights and in connections with any other Airline.

If the "Exclude" option is utilised, the search process may propose any carrier except those carriers specified in the exclude parameter.

If "Include" option is combined with the "Exclude" option, the "Include" option must contain a YY carrier code for the processing of the Exclude option.

If not specified otherwise, no occurrence of an Exclude carrier as Non Stop, Direct and/or in any part of a connection is selected. In case of Joint Operation, both airline codes have to be checked. Marketing carrier and operating carrier will have to be checked.

Preferred Airline codes can be used to ensure that proposed segments considered by the system when building recommendations will include online solutions on those airlines. This option does not ensure that recommendations returned by Master Pricer will include such Proposed Segments as the objective is still to propose the lowest available recommendations.

Examples:

Request

Process

Include: AF, BA

AF and BA as Non-Stop/Direct flights and for connections AF and BA online and interline.

Include: TW, YY

TW mandatory: can be combined with any other airline.

Include: TW, YY  
Exclude: AA

TW mandatory: can be combined with any other airline except AA.

Include: TW, CO, YY  
Exclude: AA

TW or CO mandatory: can be combined with any other airline except AA.

Exclude: DL

Any carrier may be proposed, except DL airlines.

If the same airline code appears twice within the same option the request is not rejected, rather the second occurrence of the airline code is automatically ignored.

The example below illustrates a low fare search including an optional Airline element specified with the following information.  
Query Requirements:

-   Total trip itinerary from Paris to NYC.
-   AF is mandatory within the trip and may be combined with any other airline (YY) at the itinerary level (for each requested segment).
-   Exclusion of AA between Paris and Miami.
-   BA preferred between Miami to NYC.

## 5.2.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_MasterPricerCalendar xmlns="http://xml.amadeus.com/FMPCAQ\_20\_2\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <travelFlightInfo> <companyIdentity> <carrierQualifier>M</carrierQualifier> <carrierId>AF</carrierId> <carrierId>YY</carrierId> </companyIdentity> </travelFlightInfo> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>PAR</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>MIA</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>201203</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>3</dayInterval> </rangeOfDate> </timeDetails> <flightInfo> <companyIdentity> <carrierQualifier>X</carrierQualifier> <carrierId>AA</carrierId> </companyIdentity> </flightInfo> </itinerary> <itinerary> <requestedSegmentRef> <segRef>2</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>MIA</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>NYC</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>251203</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>3</dayInterval> </rangeOfDate> </timeDetails> <flightInfo> <companyIdentity> <carrierQualifier>F</carrierQualifier> <carrierId>BA</carrierId> </companyIdentity> </flightInfo> </itinerary> </Fare\_MasterPricerCalendar>

## 5.2.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.2.3 Possible Errors

See "Error Messages" section.

* * *

## 5.3 Operation: 02.02 Flight Option - Flight Category

The following Flight Categories are supported:

-   Non-Stop: N
-   Direct: D
-   Connecting: C

The rules defined in Availability apply, regarding the definition of the Change of Gauge (COG) flights:

-   US market: the COG is considered as a Direct flight,
-   EU market: the COG is included in the Connecting flights.

This information is usually obtained from the user Office Profile settings. However, due to current information limitations, the change of gauge will be always considered as a connecting flight within this function.

Warning: High-speed trains are considered as non stop, but when returned, their stops are provided like technical stops.

A maximum of 3 flight categories per requested segment may be specified and maybe combined with any other option, excluding an include connection point with a Non-Stop flight category.

The example below illustrates a low fare search including an optional FlightCategory element specified with the following information. Query Requirements:

-   Trip from Paris to New York
-   Non-Stop and Direct flight categories requested for entire trip
-   Direct Flight category for 2nd segment connection Miami to New York

## 5.3.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_MasterPricerCalendar xmlns="http://xml.amadeus.com/FMPCAQ\_20\_2\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <travelFlightInfo> <flightDetail> <flightType>N</flightType> <flightType>D</flightType> </flightDetail> </travelFlightInfo> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>PAR</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>MIA</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>201201</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>3</dayInterval> </rangeOfDate> </timeDetails> </itinerary> <itinerary> <requestedSegmentRef> <segRef>2</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>MIA</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>NYC</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>250102</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>3</dayInterval> </rangeOfDate> </timeDetails> <flightInfo> <flightDetail> <flightType>D</flightType> </flightDetail> </flightInfo> </itinerary> </Fare\_MasterPricerCalendar>

## 5.3.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.3.3 Possible Errors

See "Error Messages" section.

* * *

## 5.4 Operation: 02.03 Flight Option - Number of Connections

A number of connections can be requested for Connecting flights category, in such case, the flights considered in the process are restricted to connecting flights with exactly the specified number of connections.

The example below illustrates a low fare search including an optional FlightCategory element specified with the following information. Query Requirements:

-   Trip from Paris to New York
-   Non-Stop and Direct flight categories requested for entire trip
-   Connecting flight category for 1st segment with 2 connections points Paris to Miami

## 5.4.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_MasterPricerCalendar xmlns="http://xml.amadeus.com/FMPCAQ\_20\_2\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <travelFlightInfo> <flightDetail> <flightType>N</flightType> <flightType>D</flightType> </flightDetail> </travelFlightInfo> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>PAR</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>MIA</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>201210</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>3</dayInterval> </rangeOfDate> </timeDetails> <flightInfo> <unitNumberDetail> <numberOfUnits>2</numberOfUnits> <typeOfUnit>C</typeOfUnit> </unitNumberDetail> </flightInfo> </itinerary> <itinerary> <requestedSegmentRef> <segRef>2</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>MIA</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>NYC</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>251210</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>3</dayInterval> </rangeOfDate> </timeDetails> </itinerary> </Fare\_MasterPricerCalendar>

## 5.4.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.4.3 Possible Errors

See "Error Messages" section.

* * *

## 5.5 Operation: 02.04 Flight Option - Connection Point

Connection points are segment specific. They may be combined with any other option, excluding the Non-Stop Flight Category - in which, an error message is not returned, but the connection point specified is ignored. Connecting Points to include may be combined with the Connection Points to exclude, providing the same connection points are not used for both categories.

One additional specific combination restriction for preferred connection option: Preferred connecting point option can be combined with any other option except the "Non-Stop" Flight Category option and the preferred Airline option.

The connection points are 3-character IATA City or Airport codes. When an Include Connecting Point option is specified, all itineraries returned must at least go via this Connecting Point. When two Include Connecting Points are requested, proposed itineraries must at least go via both these Connecting Points in the order specified in the entry. The Change of Gauge and direct flights whose stops are in the requested point are not selected there.

Direct flights, Change of Gauge (COG) and Connections that have at least one stop at one of the exclude connect points are excluded. When two Excluded Connecting Points are specified, any itinerary going through one of those Connecting Points is excluded.

If an Exclude Connecting Point is specified at the same time as a Non-Stop Flight Category option, the system returns Non-Stop flights recommendations and ignores the Connecting Point requested.

If an airport code is specified as an Excluded connecting point, the alternate airports associated to the same city are candidates to the selection.

If a city code is specified as an Excluded connecting point, all Airports associated to that City are excluded.

When a preferred Connecting Point option is specified, the system will use it to build "Preferred" Proposed Segments. Those "Preferred" Proposed Segments will go via at least one of the Preferred Connecting Points requested. These preferred proposed segments will be considered by the system when building the recommendations. The change of Gauge and direct flights whose stops are in the requested point are not selected here.

Preferred Connecting Point can be used to ensure that proposed segments considered by the system when building recommendations will include online solutions on those connecting points. This option does not ensure that recommendations returned by Master Pricer will include such Proposed Segments as the objective is still to propose the lowest available recommendations.

Examples:

Parameter

Information

Include Connecting Point: MAD

Itineraries via, at least, MAD

Include Connecting Points: PAR, JFK

Itineraries via, at least, PAR and JFK in that order

Exclude Connecting Point: FRA

Exclude any Direct, COG and Connections via FRA

Include Connecting Point: NYC  
Exclude Connecting Point: JFK

Itineraries via, at least, any Airport of NYC except JFK

Exclude Connecting Points: LON, ROM

Exclude any Direct, COG, Connections via FRA or ROM

Include Connecting Point: LON  
Exclude Connecting Point: SIN

Itineraries via, at least, LON and Exclude Direct, Connections and COG that go through SIN

Include Connecting Point: JFK  
Exclude Connecting Point: NYC

Entry rejected with the appropriate message

Include Connecting Point: FRA  
Type of Flight: Non-Stop

Entry rejected with the appropriate message

Exclude Connecting Point: FRA  
Type of Flight: Non-Stop

All Non-Stop from DUS to BER. In that case the Exclude connecting point is meaningless

The example below illustrates a low fare search including an optional Connection Point element specified with the following information.  
Query Requirements:

-   Entire Itinerary: Paris - Miami Return
-   Exclusion of LGW airport for first requested segment
-   Inclusion of NYC and LON cities for second requested segment
-   Preferred connecting point specifies JFK airport for second requested segment

## 5.5.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_MasterPricerCalendar xmlns="http://xml.amadeus.com/FMPCAQ\_20\_2\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>PAR</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>MIA</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>241108</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>3</dayInterval> </rangeOfDate> </timeDetails> <flightInfo> <inclusionDetail> <inclusionIdentifier>M</inclusionIdentifier> <locationId>LGW</locationId> </inclusionDetail> <inclusionDetail> <inclusionIdentifier>M</inclusionIdentifier> <locationId>MAD</locationId> </inclusionDetail> </flightInfo> </itinerary> </Fare\_MasterPricerCalendar>

## 5.5.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.5.3 Possible Errors

See "Error Messages" section.

* * *

## 5.6 Operation: 02.07 Flight option - No Slice and Dice

Slice and Dice process is applied by default. The user has the ability to disable Slice and Dice process with an option in the query.

When this option is requested, Slice and Dice is disabled in the availability request. As no extra availability is returned, no recommendation with Slice and Dice context will be returned.

## 5.6.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_MasterPricerCalendar xmlns="http://xml.amadeus.com/FMPCAQ\_20\_2\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fareOptions> <pricingTickInfo> <pricingTicketing> <priceType>RP</priceType> <priceType>RW</priceType> <priceType>NSD</priceType> </pricingTicketing> </pricingTickInfo> </fareOptions> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>NCE</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>LHR</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>030410</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>3</dayInterval> </rangeOfDate> </timeDetails> </itinerary> </Fare\_MasterPricerCalendar>

## 5.6.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.6.3 Possible Errors

See "Error Messages" section.

* * *

## 5.7 Operation: 02.08 Flight Option - Disable Biased Reference

The flight search is performed according to office settings by default. The user has the ability to disable biased preference display setting with an option in the query.

When this option is requested, the flight search request is performed in neutral mode independently of the office settings.

## 5.7.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_MasterPricerCalendar xmlns="http://xml.amadeus.com/FMPCAQ\_20\_2\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fareOptions> <pricingTickInfo> <pricingTicketing> <priceType>RP</priceType> <priceType>RW</priceType> <priceType>NPF</priceType> </pricingTicketing> </pricingTickInfo> </fareOptions> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>NCE</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>LHR</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>030410</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>3</dayInterval> </rangeOfDate> </timeDetails> </itinerary> </Fare\_MasterPricerCalendar>

## 5.7.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.7.3 Possible Errors

See "Error Messages" section.

* * *

## 5.8 Operation: 02.09 Flight Option - Exclude Ticketless Access Carriers

The user has the possibility to have included in a traditional Master Pricer response, Ticketless Access carriers recommendations or mixed of Ticketless Access Carriers and Full Service Carriers recommendations. The user has the possibility via this option to exclude TLA Recommendations from the response.

## 5.8.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_MasterPricerCalendar xmlns="http://xml.amadeus.com/FMPCAQ\_20\_2\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fareOptions> <pricingTickInfo> <pricingTicketing> <priceType>XLC</priceType> </pricingTicketing> </pricingTickInfo> </fareOptions> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>NCE</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>LHR</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>030410</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>3</dayInterval> </rangeOfDate> </timeDetails> </itinerary> </Fare\_MasterPricerCalendar>

## 5.8.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.8.3 Possible Errors

See "Error Messages" section.

* * *

## 5.9 Operation: 02.11 Flight Option - Online Option at Itinerary Level

This option forces the process to return online travel solutions for all requested segments, even if cheaper recommendations mixing carriers exist.

## 5.9.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_MasterPricerCalendar xmlns="http://xml.amadeus.com/FMPCAQ\_20\_2\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>2</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> <traveller> <ref>2</ref> </traveller> </paxReference> <travelFlightInfo> <flightDetail> <flightType>OL</flightType> </flightDetail> </travelFlightInfo> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>AJA</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>LON</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>151010</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>3</dayInterval> </rangeOfDate> </timeDetails> </itinerary> <itinerary> <requestedSegmentRef> <segRef>2</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>LON</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>AJA</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>201010</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>3</dayInterval> </rangeOfDate> </timeDetails> </itinerary> </Fare\_MasterPricerCalendar>

## 5.9.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.9.3 Possible Errors

See "Error Messages" section.

* * *

## 5.10 Operation: 02.12 Flight Option - Online Option at Requested Segment Level

When this option is only requested on one Requested Segment, there is no constraint on the other Requested Segments, meaning that interline solution may be returned for Requested Segments on which online option is not requested.

## 5.10.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_MasterPricerCalendar xmlns="http://xml.amadeus.com/FMPCAQ\_20\_2\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>2</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> <traveller> <ref>2</ref> </traveller> </paxReference> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>AJA</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>LON</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>151010</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>3</dayInterval> </rangeOfDate> </timeDetails> </itinerary> <itinerary> <requestedSegmentRef> <segRef>2</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>LON</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>AJA</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>201010</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>3</dayInterval> </rangeOfDate> </timeDetails> <flightInfo> <flightDetail> <flightType>OL</flightType> </flightDetail> </flightInfo> </itinerary> </Fare\_MasterPricerCalendar>

## 5.10.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.10.3 Possible Errors

See "Error Messages" section.

* * *

## 5.11 Operation: 02.13 Flight option - Maximum EFT

The user has the ability to define a Maximum Elapsed Flying Time to be returned. The Maximum EFT is a percentage (100) of the shortest EFT returned by the journey server.

This option can also be requested at requested segment level.

In the example below, the Maximum EFT is requested at itinerary level.

## 5.11.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_MasterPricerCalendar xmlns="http://xml.amadeus.com/FMPCAQ\_20\_2\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <travelFlightInfo> <unitNumberDetail> <numberOfUnits>120</numberOfUnits> <typeOfUnit>P</typeOfUnit> </unitNumberDetail> </travelFlightInfo> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>PAR</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>MIA</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>201212</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>3</dayInterval> </rangeOfDate> </timeDetails> </itinerary> </Fare\_MasterPricerCalendar>

## 5.11.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.11.3 Possible Errors

See "Error Messages" section.

* * *

## 5.12 Operation: 02.14 Flight option - Maximum layover per connection

The user is able to request a maximum layover per connection (in hours and in minutes).

Each connection of each requested segment has a layover limited to X hours and Y minutes.

This option can also be requested at requested segment level.

In the example below, the option is requested at itinerary level.

## 5.12.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_MasterPricerCalendar xmlns="http://xml.amadeus.com/FMPCAQ\_20\_2\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <travelFlightInfo> <unitNumberDetail> <numberOfUnits>5</numberOfUnits> <typeOfUnit>MLH</typeOfUnit> </unitNumberDetail> <unitNumberDetail> <numberOfUnits>30</numberOfUnits> <typeOfUnit>MLM</typeOfUnit> </unitNumberDetail> </travelFlightInfo> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>PAR</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>MIA</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>201212</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>3</dayInterval> </rangeOfDate> </timeDetails> </itinerary> </Fare\_MasterPricerCalendar>

## 5.12.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.12.3 Possible Errors

See "Error Messages" section.

* * *

## 5.13 Operation: 02.15 Flight option - Total Maximum layover

The user is able to request a total maximum layover (sum of the requested segment layovers) not to go beyond at itinerary level in hours (MSH) and in minutes (MSM). It will then be applied for each requested segment.

This option can also be requested at requested segment level, and then, it would be applied only for the specified requested segment.

In the example below, the option is applied at itinerary level.

## 5.13.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_MasterPricerCalendar xmlns="http://xml.amadeus.com/FMPCAQ\_20\_2\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <travelFlightInfo> <unitNumberDetail> <numberOfUnits>5</numberOfUnits> <typeOfUnit>MSH</typeOfUnit> </unitNumberDetail> <unitNumberDetail> <numberOfUnits>30</numberOfUnits> <typeOfUnit>MSM</typeOfUnit> </unitNumberDetail> </travelFlightInfo> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>PAR</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>MIA</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>201212</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>3</dayInterval> </rangeOfDate> </timeDetails> </itinerary> </Fare\_MasterPricerCalendar>

## 5.13.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.13.3 Possible Errors

See "Error Messages" section.

* * *

## 5.14 Operation: 02.16 Flight option - No airport change at requested segment level

This option aims to restrict offering recommendations involving connections with an airport change in the multi-airport cities indicated in the query.

## 5.14.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_MasterPricerCalendar xmlns="http://xml.amadeus.com/FMPCAQ\_20\_2\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>PAR</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>MIA</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>201212</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>3</dayInterval> </rangeOfDate> </timeDetails> <flightInfo> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>NAC</typeOfUnit> </unitNumberDetail> </flightInfo> </itinerary> </Fare\_MasterPricerCalendar>

## 5.14.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.14.3 Possible Errors

See "Error Messages" section.

* * *

## 5.15 Operation: 02.17 Flight option - No airport change at itinerary level

This option aims to restrict offering recommendations involving connections with an airport change in the multi-airport cities indicated in the query.

## 5.15.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_MasterPricerCalendar xmlns="http://xml.amadeus.com/FMPCAQ\_20\_2\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <travelFlightInfo> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>NAC</typeOfUnit> </unitNumberDetail> </travelFlightInfo> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>PAR</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>MIA</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>201212</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>3</dayInterval> </rangeOfDate> </timeDetails> </itinerary> </Fare\_MasterPricerCalendar>

## 5.15.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.15.3 Possible Errors

See "Error Messages" section.

* * *

## 5.16 Operation: 02.18 Flight option - Search with CLID

Search with CLID in order to biase the availability.

## 5.16.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_MasterPricerCalendar xmlns="http://xml.amadeus.com/FMPCAQ\_20\_2\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fareOptions> <pricingTickInfo> <pricingTicketing> <priceType>RP</priceType> <priceType>RU</priceType> </pricingTicketing> </pricingTickInfo> <frequentTravellerInfo> <frequentTravellerDetails> <carrier>KK</carrier> <number>C100107371656</number> <type>2</type> </frequentTravellerDetails> </frequentTravellerInfo> </fareOptions> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>LHR</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>CDG</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>090514</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>1</dayInterval> </rangeOfDate> </timeDetails> </itinerary> <itinerary> <requestedSegmentRef> <segRef>2</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>CDG</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>LHR</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>200514</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>1</dayInterval> </rangeOfDate> </timeDetails> </itinerary> </Fare\_MasterPricerCalendar>

## 5.16.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_MasterPricerCalendarReply xmlns="http://xml.amadeus.com/FMPCAR\_20\_2\_1A"> <replyStatus> <status> <advisoryTypeInfo>FQX</advisoryTypeInfo> </status> </replyStatus> <conversionRate> <conversionRateDetail> <currency>USD</currency> </conversionRateDetail> </conversionRate> <flightIndex> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>1</ref> </flightProposal> <flightProposal> <ref>0110</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>AF</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>081114</dateOfDeparture> <timeOfDeparture>1600</timeOfDeparture> <dateOfArrival>081114</dateOfArrival> <timeOfArrival>1810</timeOfArrival> </productDateTime> <location> <locationId>LHR</locationId> <terminal>4</terminal> </location> <location> <locationId>CDG</locationId> <terminal>2E</terminal> </location> <companyId> <marketingCarrier>AF</marketingCarrier> <operatingCarrier>AF</operatingCarrier> </companyId> <flightOrtrainNumber>1781</flightOrtrainNumber> <productDetail> <equipmentType>320</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>2</ref> </flightProposal> <flightProposal> <ref>0110</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>AF</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>091114</dateOfDeparture> <timeOfDeparture>1600</timeOfDeparture> <dateOfArrival>091114</dateOfArrival> <timeOfArrival>1810</timeOfArrival> </productDateTime> <location> <locationId>LHR</locationId> <terminal>4</terminal> </location> <location> <locationId>CDG</locationId> <terminal>2E</terminal> </location> <companyId> <marketingCarrier>AF</marketingCarrier> <operatingCarrier>AF</operatingCarrier> </companyId> <flightOrtrainNumber>1781</flightOrtrainNumber> <productDetail> <equipmentType>321</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>3</ref> </flightProposal> <flightProposal> <ref>0110</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>AF</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>101114</dateOfDeparture> <timeOfDeparture>1600</timeOfDeparture> <dateOfArrival>101114</dateOfArrival> <timeOfArrival>1810</timeOfArrival> </productDateTime> <location> <locationId>LHR</locationId> <terminal>4</terminal> </location> <location> <locationId>CDG</locationId> <terminal>2E</terminal> </location> <companyId> <marketingCarrier>AF</marketingCarrier> <operatingCarrier>AF</operatingCarrier> </companyId> <flightOrtrainNumber>1781</flightOrtrainNumber> <productDetail> <equipmentType>321</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> </flightIndex> <flightIndex> <requestedSegmentRef> <segRef>2</segRef> </requestedSegmentRef> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>1</ref> </flightProposal> <flightProposal> <ref>0115</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>AF</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>191114</dateOfDeparture> <timeOfDeparture>1600</timeOfDeparture> <dateOfArrival>191114</dateOfArrival> <timeOfArrival>1615</timeOfArrival> </productDateTime> <location> <locationId>CDG</locationId> <terminal>2E</terminal> </location> <location> <locationId>LHR</locationId> <terminal>4</terminal> </location> <companyId> <marketingCarrier>AF</marketingCarrier> <operatingCarrier>AF</operatingCarrier> </companyId> <flightOrtrainNumber>1280</flightOrtrainNumber> <productDetail> <equipmentType>321</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>2</ref> </flightProposal> <flightProposal> <ref>0115</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>AF</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>201114</dateOfDeparture> <timeOfDeparture>1600</timeOfDeparture> <dateOfArrival>201114</dateOfArrival> <timeOfArrival>1615</timeOfArrival> </productDateTime> <location> <locationId>CDG</locationId> <terminal>2E</terminal> </location> <location> <locationId>LHR</locationId> <terminal>4</terminal> </location> <companyId> <marketingCarrier>AF</marketingCarrier> <operatingCarrier>AF</operatingCarrier> </companyId> <flightOrtrainNumber>1280</flightOrtrainNumber> <productDetail> <equipmentType>321</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>3</ref> </flightProposal> <flightProposal> <ref>0115</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>AF</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>211114</dateOfDeparture> <timeOfDeparture>1600</timeOfDeparture> <dateOfArrival>211114</dateOfArrival> <timeOfArrival>1615</timeOfArrival> </productDateTime> <location> <locationId>CDG</locationId> <terminal>2E</terminal> </location> <location> <locationId>LHR</locationId> <terminal>4</terminal> </location> <companyId> <marketingCarrier>AF</marketingCarrier> <operatingCarrier>AF</operatingCarrier> </companyId> <flightOrtrainNumber>1280</flightOrtrainNumber> <productDetail> <equipmentType>321</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> </flightIndex> <recommendation> <itemNumber> <itemNumberId> <number>1</number> </itemNumberId> </itemNumber> <recPriceInfo> <monetaryDetail> <amount>146.52</amount> </monetaryDetail> <monetaryDetail> <amount>139.52</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>3</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>3</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>3</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>3</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>3</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>3</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>146.52</totalFareAmount> <totalTaxAmount>139.52</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>AF</company> </codeShareDetails> <pricingTicketing> <priceType>OBV</priceType> </pricingTicketing> </paxFareDetail> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>PEN</textSubjectQualifier> <informationType>70</informationType> </freeTextQualification> <description>TICKETS ARE NON-REFUNDABLE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>LTD</textSubjectQualifier> <informationType>40</informationType> </freeTextQualification> <description>LAST TKT DTE</description> <description>06MAR14</description> <description> - SEE ADV PURCHASE</description> </pricingMessage> </fare> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>V</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>VRD20GB9</fareBasis> <passengerType>ADT</passengerType> <fareType>RA</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> </groupOfFares> </fareDetails> <fareDetails> <segmentRef> <segRef>2</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>V</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>VRD20GB9</fareBasis> <passengerType>ADT</passengerType> <fareType>RA</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> </groupOfFares> </fareDetails> </paxFareProduct> </recommendation> </Fare\_MasterPricerCalendarReply>

## 5.16.3 Possible Errors

See "Error Messages" section.

* * *

## 5.17 Operation: 02.19 Flight option - DK Number

Travel Management companies / travel agencies (both online and offline) may handle accounts for many different corporations / customers, and may wish to apply certain business rules when making travel arrangements for these customers.

These ‘business rules’ can be taken into consideration and validated by Amadeus when returning Fare Shopping results - provided that the specific customer / rule to apply (if any) has been identified in the input message received from the agency. This identification is made via the ‘DK’ number / customer identification number received. 

## 5.17.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_MasterPricerCalendar xmlns="http://xml.amadeus.com/FMPCAQ\_20\_2\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <customerRef> <customerReferences> <referenceQualifier>701</referenceQualifier> <referenceNumber>AA1234567890123456789Z</referenceNumber> </customerReferences> </customerRef> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>PAR</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>MIA</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>201201</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>3</dayInterval> </rangeOfDate> </timeDetails> </itinerary> </Fare\_MasterPricerCalendar>

## 5.17.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.17.3 Possible Errors

See "Error Messages" section.

* * *

## 5.18 Operation: 02.20 Flight option - Progressive legs

Progressive legs enables the user to request a range of number of connections relative to the minimum connections that exist on Journey Server. This range of number of connections is the progressive legs range.

Progressive legs is triggered by input options:

-   Minimum number of progressive connections (MIC),
-   Maximum number of progressive connections (MAC).

The minimum and maximum number are numeric values from 0 to n.

The range of progressive legs can be specified at itinerary level or at requested segment level. If specified both at itinerary and requested segment level, the values at requested segment level override the values at itinerary level.

The example below illustrates a calendar search with progressive legs range specified at itinerary level.

**Requesting Details**

**Specified Data**

Request by number of seats occupied by passengers

PX

Number of seats for request

1

Adult passenger type code

ADT

Passenger type code applicable to 1st passenger

1

Public fares requested

RP

Progressive legs range with a minimum of 0 connection and a maximum of 1 connection

0

MIC

1

MAC

1st requested segment

1

Departure city of Denver

DEN

Arrival city of Los Angeles

LAX

Trip Date (11 December 2015)

111215

Identify date range search as combined range (+ and -)

C

Number of flexibility days

3

2 nd requested segment

2

Departure city of Los Angeles

LAX

Arrival city of Denver

DEN

Trip Date (18 December 2015)

181215

Identify date range search as combined range (+ and -)

C

Number of flexibility days

3

## 5.18.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_MasterPricerCalendar xmlns="http://xml.amadeus.com/FMPCAQ\_20\_2\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fareOptions> <pricingTickInfo> <pricingTicketing> <priceType>RP</priceType> </pricingTicketing> </pricingTickInfo> </fareOptions> <travelFlightInfo> <unitNumberDetail> <numberOfUnits>0</numberOfUnits> <typeOfUnit>MIC</typeOfUnit> </unitNumberDetail> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>MAC</typeOfUnit> </unitNumberDetail> </travelFlightInfo> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>DEN</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>LAX</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>111215</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>3</dayInterval> </rangeOfDate> </timeDetails> </itinerary> <itinerary> <requestedSegmentRef> <segRef>2</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>LAX</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>DEN</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>181215</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>3</dayInterval> </rangeOfDate> </timeDetails> </itinerary> </Fare\_MasterPricerCalendar>

## 5.18.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.18.3 Possible Errors

See "Error Messages" section.

* * *

## 5.19 Operation: 04.01 Fare Option - Currency Conversion

The currency conversion option may be combined with any other option.

It is mandatory that the ticketing price type be set to "CUC" to indicate a currency conversion request. It is mandatory for any query including the currency conversion option.

It is mandatory that a currency code be specified for the conversion. All price amounts for recommendations are converted in the requested Currency. There is no default currency for conversion, it must be specified.

The example below illustrates a low fare search including an optional Currency Conversion element specified with the following information.  
Query Requirements:

-   Currency to be returned: USD

## 5.19.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_MasterPricerCalendar xmlns="http://xml.amadeus.com/FMPCAQ\_20\_2\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fareOptions> <pricingTickInfo> <pricingTicketing> <priceType>CUC</priceType> </pricingTicketing> </pricingTickInfo> <conversionRate> <conversionRateDetail> <currency>USD</currency> </conversionRateDetail> </conversionRate> </fareOptions> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>PAR</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>MIA</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>201210</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>3</dayInterval> </rangeOfDate> </timeDetails> </itinerary> </Fare\_MasterPricerCalendar>

## 5.19.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.19.3 Possible Errors

See "Error Messages" section.

* * *

## 5.20 Operation: 04.02 Fare Option - Selling Ticketing Cities Override

The requested Selling and/or Ticketing Cities are used to determine applicable fares and currency for the recommendations. The selling and ticketing cities are applied from the requestor's system office ID city settings. If the selling or ticketing cities override option is used, the cities specified are utilised instead of the requestor Office-id City.

The city code specified must be a valid city code stored in the Amadeus system. Airport codes may not be utilised, unless the airport and city code are the same.

Examples:

Valid city code for Paris

PAR

Invalid city code to use for Paris

CDG

A maximum of one selling and one ticketing city may be specified applicable to the entire request. These options may be combined together and/or with any other option.

## 5.20.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_MasterPricerCalendar xmlns="http://xml.amadeus.com/FMPCAQ\_20\_2\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fareOptions> <pricingTickInfo> <sellingPoint> <locationId>PAR</locationId> </sellingPoint> <ticketingPoint> <locationId>PAR</locationId> </ticketingPoint> </pricingTickInfo> </fareOptions> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>MRS</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>MIA</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>200106</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>3</dayInterval> </rangeOfDate> </timeDetails> </itinerary> </Fare\_MasterPricerCalendar>

## 5.20.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.20.3 Possible Errors

See "Error Messages" section.

* * *

## 5.21 Operation: 04.03 Fare Option - Price To Beat

This option may be combined with any other option.  
The Price to Beat amount can be composed of up to nine digits, and the value must be higher than zero. No decimal placement is allowed in the input.

The currency of the Price to Beat is the requested Currency of Conversion if specified; otherwise, it is the default selling currency that is determined as per usual pricing rules.

If no Price to Beat is specified, all prices will be considered valid as a qualifying recommendation.

The example below illustrates a low fare search including the optional Price to Beat element specified with the following information:  
Query Requirements:

-   Price to Beat is 3500 Euros

## 5.21.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_MasterPricerCalendar xmlns="http://xml.amadeus.com/FMPCAQ\_20\_2\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <priceToBeat> <moneyInfo> <amount>3500</amount> </moneyInfo> </priceToBeat> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>PAR</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>MIA</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>201201</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>3</dayInterval> </rangeOfDate> </timeDetails> </itinerary> </Fare\_MasterPricerCalendar>

## 5.21.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.21.3 Possible Errors

See "Error Messages" section.

* * *

## 5.22 Operation: 04.04 Fare Option - Split / No Split PNR

When a user requests fares for several passengers, there may be different Passenger Type Codes (for example, 1 ZZ and 1 CH). If the No-Split PNR option is deactivated, the system returns the cheapest recommendations even if different booking codes have to be applied to these passengers (non-homogenous solutions). This implies to create multiple PNR to finalise the booking.

The default process is the "No Split PNR mode": Fare Search returns recommendations where the same booking code is applied to all passengers (homogenous solutions).

The example below illustrates a low fare search including the deactivation of the No-Split PNR option.

## 5.22.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_MasterPricerCalendar xmlns="http://xml.amadeus.com/FMPCAQ\_20\_2\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>2</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <paxReference> <ptc>CH</ptc> <traveller> <ref>2</ref> </traveller> </paxReference> <fareOptions> <pricingTickInfo> <pricingTicketing> <priceType>RP</priceType> </pricingTicketing> </pricingTickInfo> <feeIdDescription> <feeId> <feeType>NPS</feeType> <feeIdNumber>0</feeIdNumber> </feeId> </feeIdDescription> </fareOptions> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>PAR</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>MIA</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>120202</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>3</dayInterval> </rangeOfDate> </timeDetails> </itinerary> </Fare\_MasterPricerCalendar>

## 5.22.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.22.3 Possible Errors

See "Error Messages" section.

* * *

## 5.23 Operation: 04.06 Fare Option - Unifare

If the specific types of fares are not requested, only the public fares are searched.

This option may be combined with any other option.  
The following Unifares options are supported:

-   Published fares: RP
-   Unifares: RU
-   Corporate Unifares: RW with a mandatory Corporate number xxxxxx
-   Amadeus Nego: RN
-   Amadeus Corporate: RC with a mandatory Corporate number xxxxxx

These fare type searches may be combined, with the exception of Unifares (RU) or Corporate Unifares (RW) with an Amadeus Nego (RN) or Amadeus Nego Corporate (RC) in the same entry.

An associated corporate number must be specified for Corporate Unifares or Amadeus Nego Corporate requests.

**Note**: The search is restricted to one corporate id (Corporate identity) Value.

The example below illustrates a low fare search including the optional Unifares element with the following information:  
Query Requirements:

-   Search to include Published Fares, non Corporate Unifares and Corporate Fares (Corporate code 12345)

## 5.23.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_MasterPricerCalendar xmlns="http://xml.amadeus.com/FMPCAQ\_20\_2\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fareOptions> <pricingTickInfo> <pricingTicketing> <priceType>RP</priceType> <priceType>RU</priceType> <priceType>RW</priceType> </pricingTicketing> </pricingTickInfo> <corporate> <corporateId> <corporateQualifier>RW</corporateQualifier> <identity>012345</identity> </corporateId> </corporate> </fareOptions> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>PAR</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>MIA</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>201205</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>3</dayInterval> </rangeOfDate> </timeDetails> </itinerary> </Fare\_MasterPricerCalendar>

## 5.23.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.23.3 Possible Errors

See "Error Messages" section.

* * *

## 5.24 Operation: 04.07 Fare Option - Expanded Parameter

The fare type - expanded parameter option - may be combined with any other option. With the exception that the No Restriction parameter (NR) may not be combined with any other expanded parameter.  
The following fare type - Expanded Parameters are supported:

-   Advance purchase (NAP): Search for low fares having no advance purchase.

-   Penalty information for cancellation (NPE): Search for low fares having no penalty.

-   No Restriction (NR): Search for low fares having no restrictions.

-   Refundable fares (RF): Search for low fares that may be refundable.

A maximum of 3 expanded parameters may be requested.

The example below illustrates a low fare search including an optional Expanded Parameter element specified with the following information:  
Query Requirements:

-   Only refundable fares should be returned in the recommendations

## 5.24.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_MasterPricerCalendar xmlns="http://xml.amadeus.com/FMPCAQ\_20\_2\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fareOptions> <pricingTickInfo> <pricingTicketing> <priceType>RF</priceType> </pricingTicketing> </pricingTickInfo> </fareOptions> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>PAR</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>MIA</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>200106</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>3</dayInterval> </rangeOfDate> </timeDetails> </itinerary> </Fare\_MasterPricerCalendar>

## 5.24.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.24.3 Possible Errors

See "Error Messages" section.

* * *

## 5.25 Operation: 04.08 Fare Option - Price only PTC

This option allow the process to return only recommendations with the requested passenger type, no defaulting is done.

## 5.25.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_MasterPricerCalendar xmlns="http://xml.amadeus.com/FMPCAQ\_20\_2\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>2</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <paxReference> <ptc>CH</ptc> <traveller> <ref>2</ref> </traveller> </paxReference> <fareOptions> <pricingTickInfo> <pricingTicketing> <priceType>PTC</priceType> </pricingTicketing> </pricingTickInfo> <feeIdDescription> <feeId> <feeType>NPS</feeType> <feeIdNumber>0</feeIdNumber> </feeId> </feeIdDescription> </fareOptions> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>PAR</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>MIA</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>120202</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>3</dayInterval> </rangeOfDate> </timeDetails> </itinerary> </Fare\_MasterPricerCalendar>

## 5.25.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.25.3 Possible Errors

See "Error Messages" section.

* * *

## 5.26 Operation: 04.09 Fare Option - Fare Family Distribution

The user has the ability to request that lowest available recommendations are returned per date combination and per fare family combination.

The system returns the cheapest available recommendation for each combination of outbound and inbound dates and per resulting Fare Families deduced from the Commercial Fare Family(s) requested.

## 5.26.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_MasterPricerCalendar xmlns="http://xml.amadeus.com/FMPCAQ\_20\_2\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fareOptions> <pricingTickInfo> <pricingTicketing> <priceType>RU</priceType> <priceType>RP</priceType> <priceType>FFD</priceType> </pricingTicketing> </pricingTickInfo> </fareOptions> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>NCE</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>LHR</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>030410</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>3</dayInterval> </rangeOfDate> </timeDetails> </itinerary> </Fare\_MasterPricerCalendar>

## 5.26.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.26.3 Possible Errors

See "Error Messages" section.

* * *

## 5.27 Operation: 04.10 Fare Option - My Search - Parameterized Fare Families

A **Parameterized Fare Family** is a set of specific parameters defined at input time in the search query. Up to 6 Parameterized Fare Families can be defined in input. These parameterized fare families are used as options, relying on a set of criteria and attributes used to match recommendations to Fare Families.

The parameterized Fare Family can be combined with any other option. It is the responsibility of the user to ensure that combination of Fare Families parameters and other query options does not affect the functional coherence of the request.

**Structure of parameterized Fare Family:**

The search option offers the possibility to the user to include up to 6 Fare families in the query.

Each fare family is defined by up to 10 sets of attributes linked logically by OR.

Within each set, attributes are logically linked by AND.

Within each attribute, values are logically linked by OR.

Each set is composed of the following attributes:

Attributes

Format

Mandatory(M)/ Optional(O)

Occurrences

Fare Family Short name (Mandatory)

1-10 Alphanumeric

M

1

Ranking

1-4 digits

M

1

Combinability

-   Default: combinable or
-   NOC (Not combinable)

O

1

Publishing Carrier

2 Alphanumeric

O

0-10

Type of Fare

-   RP: published fares
-   RV: private fares
-   RN:1A negotiated fares
-   RA: Category 35 fares
-   RD: DDF fares
-   RU: Unifares

O

0-5

Prime Booking Code

2 alpha

O

0-10

Fare Basis

1-9 characters (Possible values: 0 to 9, A to Z, -)

O

0-10

Corporate Information

CORP / NONCORP or CORPORATE CODE

CORPORATE NAME

O

O

0-6

0-6

(Sum of CORP CODE + CORPNAME)

Cabin

-   M (Economy Standard)
-   W (Economy Premium)
-   Y (Economy)
-   C (Business)
-   F (First)

O

0-5

Expanded Parameter - Advance Purchase

-   AP (With Advance Purchase)
-   NAP (No Advance Purchase)

O

0-2

Expanded Parameter - Refundability

-   RF (Refundable)
-   NRE (non-Refundable)

O

0-2

Expanded Parameter - Penalty

-   PE (With Penalty)
-   NPE (Without Penalty)

O

0-2

Expanded Parameter - Restriction

-   R (With Restriction)
-   NR (No Restriction)

O

0-2

When publishing carrier criteria is used, the include airline option should also be requested in the query to target the expected flights.

As a result, there are up to 10 sets of criteria for each Parameterized Fare Family and this set of criteria may not be coded negatively.

The example below illustrates a request including 6 parameterized fare families defined by many attributes sets, each attribute has many occurrences:

-   Itinerary: Round-Trip : NCE- AMS
-   Date: 01OCT09 - 08OCT09
-   1 ADT
-   6 Fare Families

1st Parameterized fare family:

-   name: FFAMILY1
-   ranking 10
-   not combinable (NCO)
-   Attributes Set 1:
    -   publishing carrier AF
    -   fare basis NAP30
    -   Public fare or ATP Nego fare

2nd Parameterized fare family:

-   name: FFAMILY2
-   ranking 50
-   Attributes Set 1:
    -   publishing carrier AF or KL
    -   fare basis NCD or NRT or NRF or LCO or LCD

3rd Parameterized fare family:

-   FFAMILY3
-   ranking 80
-   Attributes Set 1:
    -   publishing carrier AF
    -   Corporate Fares
    -   Cabin Y
-   Attributes Set 2:
    -   Publishing carrier AF
    -   Non-CorporateFares
    -   Cabin Y or C
    -   Expanded Parameter NAP (Fares with no advance purchase)
    -   Expanded Parameter NPE (Fares with no penalty)
-   Attributes Set 3:
    -   Publishing carrier KL
    -   Cabin M\*W\*C

4th Parameterized fare family:

-   FFAMILY4
-   ranking 60
-   Attributes Set 1:
    -   Publishing carrier AF
    -   Fare basis NCD
-   Attributes Set 2:
    -   Publishing carrier AF,KL
    -   Fare basis NRT
-   Attributes Set 3:
    -   Publishing carrier KL
    -   any fare basis including JUNIOR

5th Parameterized fare family:

-   name: FFAMILY5
-   ranking 100
-   Attributes Set 1:
    -   Booking code L, M, N, O, P, Q, R, S, T or U.

6th Parameterized fare family:

-   OTHERS
-   Ranking 0

## 5.27.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_MasterPricerCalendar xmlns="http://xml.amadeus.com/FMPCAQ\_20\_2\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fareFamilies> <familyInformation> <fareFamilyname>FFAMILY1</fareFamilyname> <hierarchy>10</hierarchy> </familyInformation> <familyCriteria> <carrierId>AF</carrierId> <fareFamilyInfo> <fareFamilyQual>NCO</fareFamilyQual> </fareFamilyInfo> <fareProductDetail> <fareBasis>NAP30</fareBasis> </fareProductDetail> <fareProductDetail> <fareType>RP</fareType> </fareProductDetail> <fareProductDetail> <fareType>RA</fareType> </fareProductDetail> </familyCriteria> </fareFamilies> <fareFamilies> <familyInformation> <fareFamilyname>FFAMILY2</fareFamilyname> <hierarchy>50</hierarchy> </familyInformation> <familyCriteria> <carrierId>AF</carrierId> <carrierId>KL</carrierId> <fareProductDetail> <fareBasis>NCD</fareBasis> </fareProductDetail> <fareProductDetail> <fareBasis>NRT</fareBasis> </fareProductDetail> <fareProductDetail> <fareBasis>NRF</fareBasis> </fareProductDetail> <fareProductDetail> <fareBasis>LCO</fareBasis> </fareProductDetail> <fareProductDetail> <fareBasis>LCD</fareBasis> </fareProductDetail> </familyCriteria> </fareFamilies> <fareFamilies> <familyInformation> <fareFamilyname>FFAMILY3</fareFamilyname> <hierarchy>80</hierarchy> </familyInformation> <familyCriteria> <carrierId>AF</carrierId> <corporateInfo> <corporateNumberIdentifier>CORP</corporateNumberIdentifier> </corporateInfo> <cabinProduct> <cabinDesignator>Y</cabinDesignator> </cabinProduct> </familyCriteria> <otherPossibleCriteria> <logicalLink> <booleanExpression> <codeOperator>OR</codeOperator> </booleanExpression> </logicalLink> <familyCriteria> <carrierId>AF</carrierId> <corporateInfo> <corporateNumberIdentifier>NONCORP</corporateNumberIdentifier> </corporateInfo> <cabinProduct> <cabinDesignator>Y</cabinDesignator> </cabinProduct> <cabinProduct> <cabinDesignator>C</cabinDesignator> </cabinProduct> <otherCriteria> <name>EXP</name> <value>NAP</value> </otherCriteria> <otherCriteria> <name>EXP</name> <value>NPE</value> </otherCriteria> </familyCriteria> </otherPossibleCriteria> <otherPossibleCriteria> <logicalLink> <booleanExpression> <codeOperator>OR</codeOperator> </booleanExpression> </logicalLink> <familyCriteria> <carrierId>KL</carrierId> <cabinProduct> <cabinDesignator>M</cabinDesignator> </cabinProduct> <cabinProduct> <cabinDesignator>W</cabinDesignator> </cabinProduct> <cabinProduct> <cabinDesignator>C</cabinDesignator> </cabinProduct> </familyCriteria> </otherPossibleCriteria> </fareFamilies> <fareFamilies> <familyInformation> <fareFamilyname>FFAMILY4</fareFamilyname> <hierarchy>60</hierarchy> </familyInformation> <familyCriteria> <carrierId>AF</carrierId> <fareProductDetail> <fareBasis>NCD</fareBasis> </fareProductDetail> </familyCriteria> <otherPossibleCriteria> <logicalLink> <booleanExpression> <codeOperator>OR</codeOperator> </booleanExpression> </logicalLink> <familyCriteria> <carrierId>AF</carrierId> <carrierId>KL</carrierId> <fareProductDetail> <fareBasis>NRT</fareBasis> </fareProductDetail> </familyCriteria> </otherPossibleCriteria> <otherPossibleCriteria> <logicalLink> <booleanExpression> <codeOperator>OR</codeOperator> </booleanExpression> </logicalLink> <familyCriteria> <carrierId>KL</carrierId> <fareProductDetail> <fareBasis>-JUNIOR</fareBasis> </fareProductDetail> </familyCriteria> </otherPossibleCriteria> </fareFamilies> <fareFamilies> <familyInformation> <fareFamilyname>FFAMILY5</fareFamilyname> <hierarchy>100</hierarchy> </familyInformation> <familyCriteria> <rdb>L</rdb> <rdb>M</rdb> <rdb>N</rdb> <rdb>O</rdb> <rdb>P</rdb> <rdb>Q</rdb> <rdb>R</rdb> <rdb>S</rdb> <rdb>T</rdb> <rdb>U</rdb> </familyCriteria> </fareFamilies> <fareFamilies> <familyInformation> <fareFamilyname>OTHERS</fareFamilyname> <hierarchy>0</hierarchy> </familyInformation> </fareFamilies> <fareOptions> <pricingTickInfo> <pricingTicketing> <priceType>RU</priceType> <priceType>RP</priceType> <priceType>RW</priceType> </pricingTicketing> </pricingTickInfo> <corporate> <corporateId> <corporateQualifier>RW</corporateQualifier> <identity>000001</identity> </corporateId> </corporate> </fareOptions> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>NCE</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>AMS</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>011009</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>3</dayInterval> </rangeOfDate> </timeDetails> </itinerary> <itinerary> <requestedSegmentRef> <segRef>2</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>AMS</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>NCE</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>081009</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>3</dayInterval> </rangeOfDate> </timeDetails> </itinerary> </Fare\_MasterPricerCalendar>

## 5.27.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.27.3 Possible Errors

See "Error Messages" section.

* * *

## 5.28 Operation: 04.11 Fare Option - My Search - Distribution Ratio of Recommendations per Fare Family

The user may specify the Distribution Ratio to be used to compute the targeted number of recommendations for each fare family processed in the request. This option is to be used in the case the default even distribution of recommendations over Fare Families is not expected.

The association of Distribution Ratio to each Fare Family considered by the distribution process is made by considering the list of Distribution Ratio in input order and the list of Fare Families from the most restrictive to the less restrictive (ranking decreasing order). First Distribution Ratio being associated to the most restrictive Fare Family, second Ratio to second Fare Family and so on.

In case a Distribution Ratio of 0 is associated to a Fare Family, it means that no recommendation belonging to that Fare Family will be returned even if it is the cheapest one for that date.

The Calendar distribution of solutions is made over requested dates and not over Fare Families, so non-null Distribution Ratio has no impact on calendar processing.

## 5.28.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_MasterPricerCalendar xmlns="http://xml.amadeus.com/FMPCAQ\_20\_2\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fareFamilies> <familyInformation> <fareFamilyname>PFF1</fareFamilyname> <hierarchy>10</hierarchy> </familyInformation> <familyCriteria> <fareProductDetail> <fareBasis>K-</fareBasis> </fareProductDetail> <cabinProduct> <cabinDesignator>Y</cabinDesignator> </cabinProduct> </familyCriteria> </fareFamilies> <fareFamilies> <familyInformation> <fareFamilyname>PFF2</fareFamilyname> <hierarchy>5</hierarchy> </familyInformation> <familyCriteria> <fareProductDetail> <fareBasis>S-</fareBasis> </fareProductDetail> <cabinProduct> <cabinDesignator>Y</cabinDesignator> </cabinProduct> </familyCriteria> </fareFamilies> <fareFamilies> <familyInformation> <fareFamilyname>PFF3</fareFamilyname> <hierarchy>20</hierarchy> </familyInformation> <familyCriteria> <cabinProduct> <cabinDesignator>C</cabinDesignator> </cabinProduct> </familyCriteria> </fareFamilies> <travelFlightInfo> <companyIdentity> <carrierQualifier>R</carrierQualifier> <carrierId>30</carrierId> <carrierId>50</carrierId> <carrierId>20</carrierId> </companyIdentity> </travelFlightInfo> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>PAR</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>LON</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>150410</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>3</dayInterval> </rangeOfDate> </timeDetails> </itinerary> </Fare\_MasterPricerCalendar>

## 5.28.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.28.3 Possible Errors

See "Error Messages" section.

* * *

## 5.29 Operation: 04.12 Fare Option - My Search - Resulting Fare Families at requested segment level

For each recommendation, a resulting Fare Family is determined for each Requested Segment and for any combination of Fare Family for outbound and Fare Family for inbound. This option has no impact on the recommendations returned, the only impact is that more information per recommendation is returned.

## 5.29.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_MasterPricerCalendar xmlns="http://xml.amadeus.com/FMPCAQ\_20\_2\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fareFamilies> <familyInformation> <fareFamilyname>PFF1</fareFamilyname> <hierarchy>100</hierarchy> </familyInformation> <familyCriteria> <carrierId>AF</carrierId> <cabinProduct> <cabinDesignator>Y</cabinDesignator> </cabinProduct> </familyCriteria> </fareFamilies> <fareFamilies> <familyInformation> <fareFamilyname>PFF2</fareFamilyname> <hierarchy>50</hierarchy> </familyInformation> <familyCriteria> <carrierId>BA</carrierId> <cabinProduct> <cabinDesignator>Y</cabinDesignator> </cabinProduct> </familyCriteria> </fareFamilies> <fareOptions> <pricingTickInfo> <pricingTicketing> <priceType>FFS</priceType> </pricingTicketing> </pricingTickInfo> </fareOptions> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>PAR</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>LON</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>150310</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>3</dayInterval> </rangeOfDate> </timeDetails> </itinerary> <itinerary> <requestedSegmentRef> <segRef>2</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>LON</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>PAR</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>170310</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>3</dayInterval> </rangeOfDate> </timeDetails> </itinerary> </Fare\_MasterPricerCalendar>

## 5.29.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_MasterPricerCalendarReply xmlns="http://xml.amadeus.com/FMPCAR\_20\_2\_1A"> <conversionRate> <conversionRateDetail> <currency>EUR</currency> </conversionRateDetail> </conversionRate> <familyInformation> <refNumber>1</refNumber> <fareFamilyname>PFF1</fareFamilyname> <hierarchy>100</hierarchy> </familyInformation> <familyInformation> <refNumber>2</refNumber> <fareFamilyname>PFF2</fareFamilyname> <hierarchy>50</hierarchy> </familyInformation> <flightIndex> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>1</ref> </flightProposal> <flightProposal> <ref>0115</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>AF</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>120310</dateOfDeparture> <timeOfDeparture>1610</timeOfDeparture> <dateOfArrival>120310</dateOfArrival> <timeOfArrival>1625</timeOfArrival> </productDateTime> <location> <locationId>CDG</locationId> <terminal>2E</terminal> </location> <location> <locationId>LHR</locationId> <terminal>4</terminal> </location> <companyId> <marketingCarrier>AF</marketingCarrier> <operatingCarrier>AF</operatingCarrier> </companyId> <flightOrtrainNumber>1680</flightOrtrainNumber> <productDetail> <equipmentType>321</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>2</ref> </flightProposal> <flightProposal> <ref>0115</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>AF</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>130310</dateOfDeparture> <timeOfDeparture>1610</timeOfDeparture> <dateOfArrival>130310</dateOfArrival> <timeOfArrival>1625</timeOfArrival> </productDateTime> <location> <locationId>CDG</locationId> <terminal>2E</terminal> </location> <location> <locationId>LHR</locationId> <terminal>4</terminal> </location> <companyId> <marketingCarrier>AF</marketingCarrier> <operatingCarrier>AF</operatingCarrier> </companyId> <flightOrtrainNumber>1680</flightOrtrainNumber> <productDetail> <equipmentType>319</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>3</ref> </flightProposal> <flightProposal> <ref>0115</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>AF</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>140310</dateOfDeparture> <timeOfDeparture>1610</timeOfDeparture> <dateOfArrival>140310</dateOfArrival> <timeOfArrival>1625</timeOfArrival> </productDateTime> <location> <locationId>CDG</locationId> <terminal>2E</terminal> </location> <location> <locationId>LHR</locationId> <terminal>4</terminal> </location> <companyId> <marketingCarrier>AF</marketingCarrier> <operatingCarrier>AF</operatingCarrier> </companyId> <flightOrtrainNumber>1680</flightOrtrainNumber> <productDetail> <equipmentType>320</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>4</ref> </flightProposal> <flightProposal> <ref>0115</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>AF</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>150310</dateOfDeparture> <timeOfDeparture>1610</timeOfDeparture> <dateOfArrival>150310</dateOfArrival> <timeOfArrival>1625</timeOfArrival> </productDateTime> <location> <locationId>CDG</locationId> <terminal>2E</terminal> </location> <location> <locationId>LHR</locationId> <terminal>4</terminal> </location> <companyId> <marketingCarrier>AF</marketingCarrier> <operatingCarrier>AF</operatingCarrier> </companyId> <flightOrtrainNumber>1680</flightOrtrainNumber> <productDetail> <equipmentType>321</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>5</ref> </flightProposal> <flightProposal> <ref>0115</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>AF</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>160310</dateOfDeparture> <timeOfDeparture>1610</timeOfDeparture> <dateOfArrival>160310</dateOfArrival> <timeOfArrival>1625</timeOfArrival> </productDateTime> <location> <locationId>CDG</locationId> <terminal>2E</terminal> </location> <location> <locationId>LHR</locationId> <terminal>4</terminal> </location> <companyId> <marketingCarrier>AF</marketingCarrier> <operatingCarrier>AF</operatingCarrier> </companyId> <flightOrtrainNumber>1680</flightOrtrainNumber> <productDetail> <equipmentType>321</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>6</ref> </flightProposal> <flightProposal> <ref>0115</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>AF</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>170310</dateOfDeparture> <timeOfDeparture>1610</timeOfDeparture> <dateOfArrival>170310</dateOfArrival> <timeOfArrival>1625</timeOfArrival> </productDateTime> <location> <locationId>CDG</locationId> <terminal>2E</terminal> </location> <location> <locationId>LHR</locationId> <terminal>4</terminal> </location> <companyId> <marketingCarrier>AF</marketingCarrier> <operatingCarrier>AF</operatingCarrier> </companyId> <flightOrtrainNumber>1680</flightOrtrainNumber> <productDetail> <equipmentType>321</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>7</ref> </flightProposal> <flightProposal> <ref>0105</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>BA</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>130310</dateOfDeparture> <timeOfDeparture>2150</timeOfDeparture> <dateOfArrival>130310</dateOfArrival> <timeOfArrival>2155</timeOfArrival> </productDateTime> <location> <locationId>CDG</locationId> <terminal>2A</terminal> </location> <location> <locationId>LHR</locationId> <terminal>5</terminal> </location> <companyId> <marketingCarrier>BA</marketingCarrier> <operatingCarrier>BA</operatingCarrier> </companyId> <flightOrtrainNumber>329</flightOrtrainNumber> <productDetail> <equipmentType>319</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>8</ref> </flightProposal> <flightProposal> <ref>0110</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>BA</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>140310</dateOfDeparture> <timeOfDeparture>2020</timeOfDeparture> <dateOfArrival>140310</dateOfArrival> <timeOfArrival>2030</timeOfArrival> </productDateTime> <location> <locationId>CDG</locationId> <terminal>2A</terminal> </location> <location> <locationId>LHR</locationId> <terminal>5</terminal> </location> <companyId> <marketingCarrier>BA</marketingCarrier> <operatingCarrier>BA</operatingCarrier> </companyId> <flightOrtrainNumber>327</flightOrtrainNumber> <productDetail> <equipmentType>320</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>9</ref> </flightProposal> <flightProposal> <ref>0110</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>BA</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>150310</dateOfDeparture> <timeOfDeparture>1450</timeOfDeparture> <dateOfArrival>150310</dateOfArrival> <timeOfArrival>1500</timeOfArrival> </productDateTime> <location> <locationId>CDG</locationId> <terminal>2A</terminal> </location> <location> <locationId>LHR</locationId> <terminal>5</terminal> </location> <companyId> <marketingCarrier>BA</marketingCarrier> <operatingCarrier>BA</operatingCarrier> </companyId> <flightOrtrainNumber>315</flightOrtrainNumber> <productDetail> <equipmentType>321</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>10</ref> </flightProposal> <flightProposal> <ref>0110</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>BA</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>160310</dateOfDeparture> <timeOfDeparture>1450</timeOfDeparture> <dateOfArrival>160310</dateOfArrival> <timeOfArrival>1500</timeOfArrival> </productDateTime> <location> <locationId>CDG</locationId> <terminal>2B</terminal> </location> <location> <locationId>LHR</locationId> <terminal>5</terminal> </location> <companyId> <marketingCarrier>BA</marketingCarrier> <operatingCarrier>BA</operatingCarrier> </companyId> <flightOrtrainNumber>315</flightOrtrainNumber> <productDetail> <equipmentType>320</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>11</ref> </flightProposal> <flightProposal> <ref>0110</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>BA</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>170310</dateOfDeparture> <timeOfDeparture>1450</timeOfDeparture> <dateOfArrival>170310</dateOfArrival> <timeOfArrival>1500</timeOfArrival> </productDateTime> <location> <locationId>CDG</locationId> <terminal>2A</terminal> </location> <location> <locationId>LHR</locationId> <terminal>5</terminal> </location> <companyId> <marketingCarrier>BA</marketingCarrier> <operatingCarrier>BA</operatingCarrier> </companyId> <flightOrtrainNumber>315</flightOrtrainNumber> <productDetail> <equipmentType>320</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>12</ref> </flightProposal> <flightProposal> <ref>0110</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>BA</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>180310</dateOfDeparture> <timeOfDeparture>1445</timeOfDeparture> <dateOfArrival>180310</dateOfArrival> <timeOfArrival>1455</timeOfArrival> </productDateTime> <location> <locationId>CDG</locationId> <terminal>2A</terminal> </location> <location> <locationId>LHR</locationId> <terminal>5</terminal> </location> <companyId> <marketingCarrier>BA</marketingCarrier> <operatingCarrier>BA</operatingCarrier> </companyId> <flightOrtrainNumber>315</flightOrtrainNumber> <productDetail> <equipmentType>320</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>13</ref> </flightProposal> <flightProposal> <ref>0110</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>BA</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>120310</dateOfDeparture> <timeOfDeparture>1450</timeOfDeparture> <dateOfArrival>120310</dateOfArrival> <timeOfArrival>1500</timeOfArrival> </productDateTime> <location> <locationId>CDG</locationId> <terminal>2B</terminal> </location> <location> <locationId>LHR</locationId> <terminal>5</terminal> </location> <companyId> <marketingCarrier>BA</marketingCarrier> <operatingCarrier>BA</operatingCarrier> </companyId> <flightOrtrainNumber>315</flightOrtrainNumber> <productDetail> <equipmentType>320</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>14</ref> </flightProposal> <flightProposal> <ref>0120</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>BA</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>140310</dateOfDeparture> <timeOfDeparture>1040</timeOfDeparture> <dateOfArrival>140310</dateOfArrival> <timeOfArrival>1100</timeOfArrival> </productDateTime> <location> <locationId>CDG</locationId> <terminal>2A</terminal> </location> <location> <locationId>LHR</locationId> <terminal>5</terminal> </location> <companyId> <marketingCarrier>BA</marketingCarrier> <operatingCarrier>BA</operatingCarrier> </companyId> <flightOrtrainNumber>307</flightOrtrainNumber> <productDetail> <equipmentType>320</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> </flightIndex> <flightIndex> <requestedSegmentRef> <segRef>2</segRef> </requestedSegmentRef> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>1</ref> </flightProposal> <flightProposal> <ref>0110</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>AF</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>140310</dateOfDeparture> <timeOfDeparture>1250</timeOfDeparture> <dateOfArrival>140310</dateOfArrival> <timeOfArrival>1500</timeOfArrival> </productDateTime> <location> <locationId>LHR</locationId> <terminal>4</terminal> </location> <location> <locationId>CDG</locationId> <terminal>2E</terminal> </location> <companyId> <marketingCarrier>AF</marketingCarrier> <operatingCarrier>AF</operatingCarrier> </companyId> <flightOrtrainNumber>1281</flightOrtrainNumber> <productDetail> <equipmentType>321</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>2</ref> </flightProposal> <flightProposal> <ref>0110</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>AF</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>150310</dateOfDeparture> <timeOfDeparture>1250</timeOfDeparture> <dateOfArrival>150310</dateOfArrival> <timeOfArrival>1500</timeOfArrival> </productDateTime> <location> <locationId>LHR</locationId> <terminal>4</terminal> </location> <location> <locationId>CDG</locationId> <terminal>2E</terminal> </location> <companyId> <marketingCarrier>AF</marketingCarrier> <operatingCarrier>AF</operatingCarrier> </companyId> <flightOrtrainNumber>1281</flightOrtrainNumber> <productDetail> <equipmentType>321</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>3</ref> </flightProposal> <flightProposal> <ref>0110</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>AF</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>160310</dateOfDeparture> <timeOfDeparture>1250</timeOfDeparture> <dateOfArrival>160310</dateOfArrival> <timeOfArrival>1500</timeOfArrival> </productDateTime> <location> <locationId>LHR</locationId> <terminal>4</terminal> </location> <location> <locationId>CDG</locationId> <terminal>2E</terminal> </location> <companyId> <marketingCarrier>AF</marketingCarrier> <operatingCarrier>AF</operatingCarrier> </companyId> <flightOrtrainNumber>1281</flightOrtrainNumber> <productDetail> <equipmentType>321</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>4</ref> </flightProposal> <flightProposal> <ref>0110</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>AF</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>170310</dateOfDeparture> <timeOfDeparture>1250</timeOfDeparture> <dateOfArrival>170310</dateOfArrival> <timeOfArrival>1500</timeOfArrival> </productDateTime> <location> <locationId>LHR</locationId> <terminal>4</terminal> </location> <location> <locationId>CDG</locationId> <terminal>2E</terminal> </location> <companyId> <marketingCarrier>AF</marketingCarrier> <operatingCarrier>AF</operatingCarrier> </companyId> <flightOrtrainNumber>1281</flightOrtrainNumber> <productDetail> <equipmentType>321</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>5</ref> </flightProposal> <flightProposal> <ref>0110</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>AF</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>180310</dateOfDeparture> <timeOfDeparture>1250</timeOfDeparture> <dateOfArrival>180310</dateOfArrival> <timeOfArrival>1500</timeOfArrival> </productDateTime> <location> <locationId>LHR</locationId> <terminal>4</terminal> </location> <location> <locationId>CDG</locationId> <terminal>2E</terminal> </location> <companyId> <marketingCarrier>AF</marketingCarrier> <operatingCarrier>AF</operatingCarrier> </companyId> <flightOrtrainNumber>1281</flightOrtrainNumber> <productDetail> <equipmentType>321</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>6</ref> </flightProposal> <flightProposal> <ref>0110</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>AF</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>200310</dateOfDeparture> <timeOfDeparture>1800</timeOfDeparture> <dateOfArrival>200310</dateOfArrival> <timeOfArrival>2010</timeOfArrival> </productDateTime> <location> <locationId>LHR</locationId> <terminal>4</terminal> </location> <location> <locationId>CDG</locationId> <terminal>2E</terminal> </location> <companyId> <marketingCarrier>AF</marketingCarrier> <operatingCarrier>AF</operatingCarrier> </companyId> <flightOrtrainNumber>1681</flightOrtrainNumber> <productDetail> <equipmentType>319</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>7</ref> </flightProposal> <flightProposal> <ref>0120</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>BA</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>190310</dateOfDeparture> <timeOfDeparture>0720</timeOfDeparture> <dateOfArrival>190310</dateOfArrival> <timeOfArrival>0940</timeOfArrival> </productDateTime> <location> <locationId>LHR</locationId> <terminal>5</terminal> </location> <location> <locationId>CDG</locationId> <terminal>2A</terminal> </location> <companyId> <marketingCarrier>BA</marketingCarrier> <operatingCarrier>BA</operatingCarrier> </companyId> <flightOrtrainNumber>304</flightOrtrainNumber> <productDetail> <equipmentType>320</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>8</ref> </flightProposal> <flightProposal> <ref>0115</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>BA</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>150310</dateOfDeparture> <timeOfDeparture>1515</timeOfDeparture> <dateOfArrival>150310</dateOfArrival> <timeOfArrival>1730</timeOfArrival> </productDateTime> <location> <locationId>LHR</locationId> <terminal>5</terminal> </location> <location> <locationId>CDG</locationId> <terminal>2A</terminal> </location> <companyId> <marketingCarrier>BA</marketingCarrier> <operatingCarrier>BA</operatingCarrier> </companyId> <flightOrtrainNumber>316</flightOrtrainNumber> <productDetail> <equipmentType>320</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>9</ref> </flightProposal> <flightProposal> <ref>0115</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>BA</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>160310</dateOfDeparture> <timeOfDeparture>1300</timeOfDeparture> <dateOfArrival>160310</dateOfArrival> <timeOfArrival>1515</timeOfArrival> </productDateTime> <location> <locationId>LHR</locationId> <terminal>5</terminal> </location> <location> <locationId>CDG</locationId> <terminal>2A</terminal> </location> <companyId> <marketingCarrier>BA</marketingCarrier> <operatingCarrier>BA</operatingCarrier> </companyId> <flightOrtrainNumber>314</flightOrtrainNumber> <productDetail> <equipmentType>321</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>10</ref> </flightProposal> <flightProposal> <ref>0115</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>BA</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>150310</dateOfDeparture> <timeOfDeparture>1835</timeOfDeparture> <dateOfArrival>150310</dateOfArrival> <timeOfArrival>2050</timeOfArrival> </productDateTime> <location> <locationId>LHR</locationId> <terminal>5</terminal> </location> <location> <locationId>CDG</locationId> <terminal>2A</terminal> </location> <companyId> <marketingCarrier>BA</marketingCarrier> <operatingCarrier>BA</operatingCarrier> </companyId> <flightOrtrainNumber>324</flightOrtrainNumber> <productDetail> <equipmentType>319</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>11</ref> </flightProposal> <flightProposal> <ref>0115</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>BA</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>170310</dateOfDeparture> <timeOfDeparture>1515</timeOfDeparture> <dateOfArrival>170310</dateOfArrival> <timeOfArrival>1730</timeOfArrival> </productDateTime> <location> <locationId>LHR</locationId> <terminal>5</terminal> </location> <location> <locationId>CDG</locationId> <terminal>2A</terminal> </location> <companyId> <marketingCarrier>BA</marketingCarrier> <operatingCarrier>BA</operatingCarrier> </companyId> <flightOrtrainNumber>316</flightOrtrainNumber> <productDetail> <equipmentType>319</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>12</ref> </flightProposal> <flightProposal> <ref>0115</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>BA</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>160310</dateOfDeparture> <timeOfDeparture>1835</timeOfDeparture> <dateOfArrival>160310</dateOfArrival> <timeOfArrival>2050</timeOfArrival> </productDateTime> <location> <locationId>LHR</locationId> <terminal>5</terminal> </location> <location> <locationId>CDG</locationId> <terminal>2A</terminal> </location> <companyId> <marketingCarrier>BA</marketingCarrier> <operatingCarrier>BA</operatingCarrier> </companyId> <flightOrtrainNumber>324</flightOrtrainNumber> <productDetail> <equipmentType>320</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>13</ref> </flightProposal> <flightProposal> <ref>0115</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>BA</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>180310</dateOfDeparture> <timeOfDeparture>1255</timeOfDeparture> <dateOfArrival>180310</dateOfArrival> <timeOfArrival>1510</timeOfArrival> </productDateTime> <location> <locationId>LHR</locationId> <terminal>5</terminal> </location> <location> <locationId>CDG</locationId> <terminal>2A</terminal> </location> <companyId> <marketingCarrier>BA</marketingCarrier> <operatingCarrier>BA</operatingCarrier> </companyId> <flightOrtrainNumber>314</flightOrtrainNumber> <productDetail> <equipmentType>321</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>14</ref> </flightProposal> <flightProposal> <ref>0115</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>BA</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>170310</dateOfDeparture> <timeOfDeparture>1835</timeOfDeparture> <dateOfArrival>170310</dateOfArrival> <timeOfArrival>2050</timeOfArrival> </productDateTime> <location> <locationId>LHR</locationId> <terminal>5</terminal> </location> <location> <locationId>CDG</locationId> <terminal>2A</terminal> </location> <companyId> <marketingCarrier>BA</marketingCarrier> <operatingCarrier>BA</operatingCarrier> </companyId> <flightOrtrainNumber>324</flightOrtrainNumber> <productDetail> <equipmentType>319</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>15</ref> </flightProposal> <flightProposal> <ref>0115</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>BA</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>180310</dateOfDeparture> <timeOfDeparture>1835</timeOfDeparture> <dateOfArrival>180310</dateOfArrival> <timeOfArrival>2050</timeOfArrival> </productDateTime> <location> <locationId>LHR</locationId> <terminal>5</terminal> </location> <location> <locationId>CDG</locationId> <terminal>2A</terminal> </location> <companyId> <marketingCarrier>BA</marketingCarrier> <operatingCarrier>BA</operatingCarrier> </companyId> <flightOrtrainNumber>324</flightOrtrainNumber> <productDetail> <equipmentType>319</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>16</ref> </flightProposal> <flightProposal> <ref>0115</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>BA</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>200310</dateOfDeparture> <timeOfDeparture>1835</timeOfDeparture> <dateOfArrival>200310</dateOfArrival> <timeOfArrival>2050</timeOfArrival> </productDateTime> <location> <locationId>LHR</locationId> <terminal>5</terminal> </location> <location> <locationId>CDG</locationId> <terminal>2A</terminal> </location> <companyId> <marketingCarrier>BA</marketingCarrier> <operatingCarrier>BA</operatingCarrier> </companyId> <flightOrtrainNumber>324</flightOrtrainNumber> <productDetail> <equipmentType>319</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>17</ref> </flightProposal> <flightProposal> <ref>0115</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>BA</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>140310</dateOfDeparture> <timeOfDeparture>1515</timeOfDeparture> <dateOfArrival>140310</dateOfArrival> <timeOfArrival>1730</timeOfArrival> </productDateTime> <location> <locationId>LHR</locationId> <terminal>5</terminal> </location> <location> <locationId>CDG</locationId> <terminal>2A</terminal> </location> <companyId> <marketingCarrier>BA</marketingCarrier> <operatingCarrier>BA</operatingCarrier> </companyId> <flightOrtrainNumber>316</flightOrtrainNumber> <productDetail> <equipmentType>319</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> </flightIndex> <recommendation> <itemNumber> <itemNumberId> <number>1</number> </itemNumberId> </itemNumber> <fareFamilyRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refNumber>1</refNumber> </referencingDetail> </fareFamilyRef> <recPriceInfo> <monetaryDetail> <amount>156.04</amount> </monetaryDetail> <monetaryDetail> <amount>123.04</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>3</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>4</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>5</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>6</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>3</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>4</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>5</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>6</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>3</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>4</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>3</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>5</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>3</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>6</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>4</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>5</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>4</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>6</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>5</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>6</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>6</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>6</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>156.04</totalFareAmount> <totalTaxAmount>123.04</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>AF</company> </codeShareDetails> <pricingTicketing> <priceType>OBV</priceType> </pricingTicketing> </paxFareDetail> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>PEN</textSubjectQualifier> <informationType>70</informationType> </freeTextQualification> <description>TICKETS ARE NON-REFUNDABLE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>LTD</textSubjectQualifier> <informationType>45</informationType> </freeTextQualification> <description>LAST TKT DTE</description> <description>17DEC09</description> </pricingMessage> </fare> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>N</rbd> <cabin>M</cabin> </cabinProduct> <fareProductDetail> <fareBasis>NSTAYFR</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> <fareFamiliesRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> </fareDetails> <fareDetails> <segmentRef> <segRef>2</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>N</rbd> <cabin>M</cabin> </cabinProduct> <fareProductDetail> <fareBasis>NSTAYFR</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> <fareFamiliesRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> </fareDetails> </paxFareProduct> </recommendation> <recommendation> <itemNumber> <itemNumberId> <number>2</number> </itemNumberId> </itemNumber> <fareFamilyRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>2</refNumber> </referencingDetail> <referencingDetail> <refNumber>2</refNumber> </referencingDetail> </fareFamilyRef> <recPriceInfo> <monetaryDetail> <amount>162.61</amount> </monetaryDetail> <monetaryDetail> <amount>106.61</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>7</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>7</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>8</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>8</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>8</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>9</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>9</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>10</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>9</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>9</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>9</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>11</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>10</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>12</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>10</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>11</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>10</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>13</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>11</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>14</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>11</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>13</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>12</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>15</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>12</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>16</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>13</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>7</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>8</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>7</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>9</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>7</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>10</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>7</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>11</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>7</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>12</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>7</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>162.61</totalFareAmount> <totalTaxAmount>106.61</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>BA</company> </codeShareDetails> </paxFareDetail> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>PEN</textSubjectQualifier> <informationType>70</informationType> </freeTextQualification> <description>TICKETS ARE NON-REFUNDABLE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>LTD</textSubjectQualifier> <informationType>45</informationType> </freeTextQualification> <description>LAST TKT DTE</description> <description>13DEC09</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>SUR</textSubjectQualifier> <informationType>79</informationType> </freeTextQualification> <description>FARE VALID FOR E TICKET ONLY</description> </pricingMessage> </fare> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>O</rbd> <cabin>M</cabin> </cabinProduct> <fareProductDetail> <fareBasis>ONCEUR</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> <fareType>ET</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> <fareFamiliesRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>2</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> </fareDetails> <fareDetails> <segmentRef> <segRef>2</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>O</rbd> <cabin>M</cabin> </cabinProduct> <fareProductDetail> <fareBasis>ONCEUR</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> <fareType>ET</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> <fareFamiliesRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>2</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> </fareDetails> </paxFareProduct> </recommendation> <recommendation> <itemNumber> <itemNumberId> <number>3</number> </itemNumberId> </itemNumber> <fareFamilyRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>2</refNumber> </referencingDetail> <referencingDetail> <refNumber>2</refNumber> </referencingDetail> </fareFamilyRef> <recPriceInfo> <monetaryDetail> <amount>176.61</amount> </monetaryDetail> <monetaryDetail> <amount>106.61</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>14</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>17</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>176.61</totalFareAmount> <totalTaxAmount>106.61</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>BA</company> </codeShareDetails> </paxFareDetail> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>PEN</textSubjectQualifier> <informationType>70</informationType> </freeTextQualification> <description>TICKETS ARE NON-REFUNDABLE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>LTD</textSubjectQualifier> <informationType>45</informationType> </freeTextQualification> <description>LAST TKT DTE</description> <description>13DEC09</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>SUR</textSubjectQualifier> <informationType>79</informationType> </freeTextQualification> <description>FARE VALID FOR E TICKET ONLY</description> </pricingMessage> </fare> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>Q</rbd> <cabin>M</cabin> </cabinProduct> <fareProductDetail> <fareBasis>QNCEUR</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> <fareType>ET</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> <fareFamiliesRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>2</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> </fareDetails> <fareDetails> <segmentRef> <segRef>2</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>O</rbd> <cabin>M</cabin> </cabinProduct> <fareProductDetail> <fareBasis>ONCEUR</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> <fareType>ET</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> <fareFamiliesRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>2</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> </fareDetails> </paxFareProduct> </recommendation> </Fare\_MasterPricerCalendarReply>

## 5.29.3 Possible Errors

\- If the Parameterized Fare Family option is not requested, the whole entry is rejected with the message:

"PARAMETERIZED FARE FAMILY OPTION MISSING"

\- If the number of requested segments is superior or equal to three, the whole entry is rejected with the message:

"TOO MANY REQUESTED SEGMENTS"

* * *

## 5.30 Operation: 04.13 Fare Option - My Search - Fare Family Distribution ratio at requested segment level

The user has the ability to request lowest available recommendations to be returned per date combination and per fare family combination.

The system returns the cheapest available recommendation for each combination of outbound and inbound dates and per resulting Fare Families deduced from the Commercial Fare Family(s) requested.

In case a Distribution Ratio of 0 is associated to a Fare Family, it means that no recommendation belonging to that Fare Family will be returned even if it is the cheapest one for that date.  
  
The Calendar distribution of solutions is made over requested dates and not over Fare Families, so non-null Distribution Ratio has no impact on calendar processing.

## 5.30.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_MasterPricerCalendar xmlns="http://xml.amadeus.com/FMPCAQ\_20\_2\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fareOptions> <pricingTickInfo> <pricingTicketing> <priceType>RU</priceType> <priceType>RP</priceType> <priceType>FFD</priceType> </pricingTicketing> </pricingTickInfo> </fareOptions> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>NCE</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>LHR</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>030410</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>3</dayInterval> </rangeOfDate> </timeDetails> </itinerary> <combinationFareFamilies> <itemFFCNumber> <itemNumberId> <number>1</number> </itemNumberId> </itemFFCNumber> <nbOfUnits> <unitNumberDetail> <numberOfUnits>15</numberOfUnits> <typeOfUnit>WT</typeOfUnit> </unitNumberDetail> </nbOfUnits> <referenceInfo> <referencingDetail> <refQualifier>RS</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>FF</refQualifier> <refNumber>3</refNumber> </referencingDetail> </referenceInfo> <referenceInfo> <referencingDetail> <refQualifier>RS</refQualifier> <refNumber>2</refNumber> </referencingDetail> <referencingDetail> <refQualifier>FF</refQualifier> <refNumber>1</refNumber> </referencingDetail> </referenceInfo> </combinationFareFamilies> <combinationFareFamilies> <itemFFCNumber> <itemNumberId> <number>2</number> </itemNumberId> </itemFFCNumber> <nbOfUnits> <unitNumberDetail> <numberOfUnits>10</numberOfUnits> <typeOfUnit>WT</typeOfUnit> </unitNumberDetail> </nbOfUnits> <referenceInfo> <referencingDetail> <refQualifier>RS</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>FF</refQualifier> <refNumber>3</refNumber> </referencingDetail> </referenceInfo> <referenceInfo> <referencingDetail> <refQualifier>RS</refQualifier> <refNumber>3</refNumber> </referencingDetail> <referencingDetail> <refQualifier>FF</refQualifier> <refNumber>3</refNumber> </referencingDetail> </referenceInfo> </combinationFareFamilies> <combinationFareFamilies> <itemFFCNumber> <itemNumberId> <number>3</number> </itemNumberId> </itemFFCNumber> <nbOfUnits> <unitNumberDetail> <numberOfUnits>50</numberOfUnits> <typeOfUnit>WT</typeOfUnit> </unitNumberDetail> </nbOfUnits> <referenceInfo> <referencingDetail> <refQualifier>RS</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>FF</refQualifier> <refNumber>2</refNumber> </referencingDetail> </referenceInfo> <referenceInfo> <referencingDetail> <refQualifier>RS</refQualifier> <refNumber>2</refNumber> </referencingDetail> <referencingDetail> <refQualifier>FF</refQualifier> <refNumber>1</refNumber> </referencingDetail> </referenceInfo> </combinationFareFamilies> <combinationFareFamilies> <itemFFCNumber> <itemNumberId> <number>4</number> </itemNumberId> </itemFFCNumber> <nbOfUnits> <unitNumberDetail> <numberOfUnits>25</numberOfUnits> <typeOfUnit>WT</typeOfUnit> </unitNumberDetail> </nbOfUnits> <referenceInfo> <referencingDetail> <refQualifier>RS</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>FF</refQualifier> <refNumber>1</refNumber> </referencingDetail> </referenceInfo> <referenceInfo> <referencingDetail> <refQualifier>RS</refQualifier> <refNumber>2</refNumber> </referencingDetail> <referencingDetail> <refQualifier>FF</refQualifier> <refNumber>1</refNumber> </referencingDetail> </referenceInfo> </combinationFareFamilies> </Fare\_MasterPricerCalendar>

## 5.30.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.30.3 Possible Errors

See "Error Messages" section.

* * *

## 5.31 Operation: 04.14 Fare Option - Currency for Fare Selection option

This option allows the user to request recommendations with fares filed in the specified currency. Recommendations with fares filed in any other currency will not be returned.

This option can be combined with any other option except Multi-Ticket.

## 5.31.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_MasterPricerCalendar xmlns="http://xml.amadeus.com/FMPCAQ\_20\_2\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fareOptions> <pricingTickInfo></pricingTickInfo> <conversionRate> <conversionRateDetail> <conversionType>CFS</conversionType> <currency>SEK</currency> </conversionRateDetail> </conversionRate> </fareOptions> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>PAR</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>MIA</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>201210</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>3</dayInterval> </rangeOfDate> </timeDetails> </itinerary> </Fare\_MasterPricerCalendar>

## 5.31.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.31.3 Possible Errors

If an unknown currency is specified, then the entire request is rejected and the following error message is returned:  
  
"VERIFY CURRENCY OPTION"

* * *

## 5.32 Operation: 04.15 Fare Option - Currency for Fare Selection with Currency Conversion option

The Currency of Fare Selection option can be combined with the Currency Conversion (currency of sale) option.  
The example below illustrates a low fare search with EUR as currency of sale (CUC) and GBP as Currency of Fare Selection (CFS).  
The currency of sale (CUC) has to be set in pricingTickInfo and the currency code has to be set in first position of conversionRate without any conversionType.  
The currency code of Fare Selection has to be set in second position of conversionRate with CFS in conversionType.

## 5.32.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_MasterPricerCalendar xmlns="http://xml.amadeus.com/FMPCAQ\_20\_2\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fareOptions> <pricingTickInfo> <pricingTicketing> <priceType>CUC</priceType> </pricingTicketing> </pricingTickInfo> <conversionRate> <conversionRateDetail> <currency>EUR</currency> </conversionRateDetail> <conversionRateDetail> <conversionType>CFS</conversionType> <currency>GPB</currency> </conversionRateDetail> </conversionRate> </fareOptions> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>PAR</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>MIA</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>201210</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>3</dayInterval> </rangeOfDate> </timeDetails> </itinerary> </Fare\_MasterPricerCalendar>

## 5.32.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.32.3 Possible Errors

If the PTK segment contains CUC (Currency Conversion indicator) but the CVR segment only contains the qualifier CFS, followed by a currency, the entire request is rejected and the following error message is returned:  
  
Currency required  
  
  
If the PTK segment is present but does not contain CUC and if the CVR segment contains a first currency, then the qualifier CFS, followed by a second currency, then, the entire request is rejected and the following error message is returned:  
  
Bad value (coded) - conversionRate/fareSelc  
  
  
If the PTK segment is present but does not contain CUC and if the CVR segment contains 2 currencies but without the qualifier CFS, then, the entire request is rejected and the following error message is returned:  
  
Bad value (coded) - conversionRate/fareSelc  
  
  
If the PTK segment contains CUC and if the CVR segment contains 2 currencies but without the qualifier CFS, then the entire request is rejected and the following error message is returned:  
  
Bad value (coded) - conversionRate/fareSelc

* * *

## 5.33 Operation: 04.16 Fare Option - Down-sell

The Down-sell option allows to provide, not the cheapest recommendations per date, but the recommendation matching the user preference on Fare Family per date in a calendar.

## 5.33.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_MasterPricerCalendar xmlns="http://xml.amadeus.com/FMPCAQ\_20\_2\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <globalOptions> <selectionDetails> <option>DWN</option> <optionInformation>2000</optionInformation> </selectionDetails> </globalOptions> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>NCE</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>LHR</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>030410</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>3</dayInterval> </rangeOfDate> </timeDetails> </itinerary> </Fare\_MasterPricerCalendar>

## 5.33.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.33.3 Possible Errors

See "Error Messages" section.

* * *

## 5.34 Operation: 04.17 Fare Option - Ticketing date

In order to avoid quoting a fare to a passenger that they are then unable to ticket at a later date, the user has the ability to specify the intended ticketing date in the input.  
This option ensures that the user will only receive recommendations that, if priced on the same day as the query is received, are valid for ticketing on the future ticketing date specified in the input.

## 5.34.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_MasterPricerCalendar xmlns="http://xml.amadeus.com/FMPCAQ\_20\_2\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fareOptions> <pricingTickInfo> <ticketingDate> <date>100311</date> </ticketingDate> </pricingTickInfo> </fareOptions> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>PAR</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>NCE</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>211207</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>3</dayInterval> </rangeOfDate> </timeDetails> </itinerary> <feeOption> <feeTypeInfo> <carrierFeeDetails> <type>OB</type> <optionInformation>EX</optionInformation> </carrierFeeDetails> </feeTypeInfo> </feeOption> </Fare\_MasterPricerCalendar>

## 5.34.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.34.3 Possible Errors

If a past date is specified, the query is rejected with the following warning message:  
"PAST DATE PRICING NOT PERMITTED"  
If the future date specified is later than the date of departure on the first flight segment of the itinerary, the query is rejected with the following warning message:  
"FUTURE DATE TICKETING NOT PERMITTED"

* * *

## 5.35 Operation: 04.18 Fare Option - Search by FBA

The search by FBA input option allows  to get in output only recommendations that have a free baggage allowance in piece or weight concept.

Only recommendations with free baggage allowance (>0) are returned.

Activation :

        <feeIdDescription>

            <feeId\>

                <feeType\>SBF</feeType\>

                <feeIdNumber\>1</feeIdNumber\>

            </feeId\>

        </feeIdDescription>

There is no change in the output structure.

## 5.35.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_MasterPricerCalendar xmlns="http://xml.amadeus.com/FMPCAQ\_20\_2\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fareOptions> <pricingTickInfo> <pricingTicketing> <priceType>BAG</priceType> </pricingTicketing> </pricingTickInfo> <feeIdDescription> <feeId> <feeType>SBF</feeType> <feeIdNumber>1</feeIdNumber> </feeId> </feeIdDescription> </fareOptions> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>ORY</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>MAD</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>150614</date> </firstDateTimeDetail> </timeDetails> </itinerary> <itinerary> <requestedSegmentRef> <segRef>2</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>MAD</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>IBZ</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>180614</date> </firstDateTimeDetail> </timeDetails> </itinerary> </Fare\_MasterPricerCalendar>

## 5.35.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.35.3 Possible Errors

See "Error Messages" section.

* * *

## 5.36 Operation: 04.19 Baggage

1.     Baggage

With the baggage option, the information on the two cheapest baggage\* is returned per recommendation (if the data is filled). Those baggage could be free (from free baggage allowance filling and returned in FBA fields) or at charge (from AAS filling and returned in AAS fields).

AAS baggage are processed from ATPCO source, from service classification P/C/F as in the catalogue/pricing process (only if the Airline has signed an agreement with Amadeus for Ancillary Services distribution).

-   **Service classification P**: Prepaid baggage that can be purchased prior to passenger airport check-in
-   **Service classification C**: Baggage charges that apply at airport check-in
-   **Service classification F:** Other type of baggage

If the airline do not file baggage in piece concept, the number of KG allowed will be returned plus the price for one additional KG.

**Recommendation 1**

**Recommendation 2**

**Recommendation 3**

**Recommendation 4**

Airline in piece concept

Airline in piece concept

Airline in piece concept

Airline in weight concept

FBA = 0

FBA = 1

FBA = 2

FBA >= 0

AAS bag occurrence 1 & 2 returned**\***

AAS bag occurrence 1 returned

No AAS bag returned

Pricer per KG returned

FBA & AAS type P/C processed in Master Pricer are **compliant with IATA resolution 302 & USDOT** that regulate the calculation of baggage (quantity and fees).

\* Important: only 1 occurrence of AAS baggage will be displayed until the activation of occurrence process in catalogue in order to ensure the consistency between shopping & catalogue.

**Passenger Type Code process:** The AAS is only calculated for the adult passenger type (if any).

For example, if we have an adult, a child and an infant, the AAS returned is the one applicable to the adult.

In case no adult passenger type is requested, the AAS returned is the one of the first passenger type of the query.

Free Baggage information will be automatically processed when baggage option is requested (even if FBA is not activated). C.f. Free Baggage Allowance.

Each recommendation could be cut into several BTU (portion of travel on which one given carrier defines the unique applicable Baggage allowance and charges policy). In that case, FBA and AAS information will be returned per BTU. The price of the baggage for the entire itinerary can be calculated by adding the price of the baggage on each BTU.

Example of baggage information returned on a recommendation:

**BTU 1**

**BTU 2**

**BTU 3**

FBA = 0

FBA = 1

FBA = 1

AAS bag occurrence 1 is 10 euros & occurrence 2 is 12 euros

AAS bag occurrence 1 is 5 euros

AAS bag occurrence 1 is 7 euros

The price for the first baggage on the entire itinerary is 10 euros (one baggage already included on BTU 2 & 3).

The price for a second baggage is:   12 + 5 + 7 = 24 euros.

After the flight booking and pricing, it is recommended to send an AAS catalogue/pricing query to retrieve and book/price Ancillary Services. This catalogue query should be limited to the portions of the itinerary where the at-charge baggage is necessary.

Example of itinerary Paris-London-Mexico:

**Paris - London**

**London – Mexico**

Airline in piece concept

Airline in piece concept

FBA = 0

FBA = 1

AAS bag occurrence 1 & 2 returned

AAS bag occurrence 1 returned

If the end user wants to travel with one baggage, an AAS baggage has to be bought on Paris-London part only (as a baggage is already included on the fare for London-Mexico).

1.1.1.   Baggage activation

This option is triggered by a setting at OID level and by the input option BAG in Master Picer query:

XML:

<fareOptions\>

        <pricingTickInfo\>

            <pricingTicketing\>

                <priceType\>**BAG**</priceType\>

            </pricingTicketing\>

        </pricingTickInfo\>

    </fareOptions\>

1.1.2.   Baggage information returned in the output

For each AAS baggage, the following information is returned (if filled):

Price / RFIC / RFISC / SSR code / Booking Method / Service classification (P, C or F) / Commercial Name / Carrier / Group / Subgroup / Description 1 & 2

\-        **RFIC/RFISC:** Reason For Issuance Code/ Reason For Issuance Sub Code

\-        **SSR code:** Special Service Request

The service classification P correspond to prepaid baggage, which mean that the returned AAS price is only available until a certain time before the check-in. An AAS will be returned in type P only if the conditions are still applicable. In service classification C, the baggage price will be the same at check-in time.

XML:

-   Recommendation

            <referencingDetail\>

                <refQualifier\>**OC**</refQualifier\>

                <refNumber\>**1**</refNumber\>      **<- AAS reference attached to the recommendation**

            </referencingDetail\>         

-   AAS Reference

<serviceFeeRefGrp>

            <refInfo>

                <referencingDetail\>

                    <refQualifier\>**OC**</refQualifier\>            **<- AAS reference attached to the recommendation**

                    <refNumber\>**1**</refNumber\>

                </referencingDetail\>

                <referencingDetail\>

                    <refQualifier\>**OCM**</refQualifier\>        **<- AAS amount reference**

                    <refNumber\>**1**</refNumber\>

                </referencingDetail\>

                <referencingDetail\>

                    <refQualifier\>**OCC**</refQualifier\>         **<- AAS coverage Reference**

                    <refNumber\>**2**</refNumber\>

                </referencingDetail\>

            </refInfo>

        </serviceFeeRefGrp>

-   Coverage

<serviceCoverageInfoGrp>

            <itemNumberInfo>

                <itemNumber\>

                    <number>**2**</number>              **<- AAS coverage reference**

                </itemNumber\>

            </itemNumberInfo>

            <serviceCovInfoGrp>

                <paxRefInfo>

                    <travellerDetails\>

                        <referenceNumber\>**1**</referenceNumber\>   **<- Passenger reference**

                    </travellerDetails\>

                </paxRefInfo>

                <coveragePerFlightsInfo>

                    <numberOfItemsDetails>

                        <referenceQualifier\>RS</referenceQualifier\>

                        <refNum>**1**</refNum>          **<- Requested segment number**

                    </numberOfItemsDetails>

                    <lastItemsDetails\>

                        <refOfLeg>**1**</refOfLeg>      **<- Leg applicability: 1,2,3**

                    </lastItemsDetails\>

                    <lastItemsDetails\>

                        <refOfLeg>**2**</refOfLeg>

                    </lastItemsDetails\>

                    <lastItemsDetails\>

                        <refOfLeg>**3**</refOfLeg>

                    </lastItemsDetails\>

                </coveragePerFlightsInfo>

                <refInfo>

                    <referencingDetail\>

                        <refQualifier\>**F**</refQualifier\>           **<- AAS baggage reference**

                        <refNumber\>**1**</refNumber\>

                    </referencingDetail\>

                </refInfo>

            </serviceCovInfoGrp>

        </serviceCoverageInfoGrp>

-   Price

<serviceMatchedInfoGroup>

                    <paxRefInfo>

                        <travellerDetails\>

                            <referenceNumber\>**1**</referenceNumber\>              **<- AAS amount reference**

                        </travellerDetails\>

                    </paxRefInfo>

                    <pricingInfo\>

                        <fareDetails\>

                            <passengerTypeQualifier>**ADT**</passengerTypeQualifier>   **<- PTC processed**

                        </fareDetails\>

                    </pricingInfo\>

                    <amountInfo>

                        <monetaryDetail\>

                            <amountType\>**PU1**</amountType\>             **<- AAS Occurrence 1**

                            <amount>**10.00**</amount>             **<- AAS price**

                        </monetaryDetail\>

                    </amountInfo>

                    <amountInfo>

                        <monetaryDetail\>

                            <amountType\>**PU2**</amountType\>             **<- AAS Occurrence 2**

                            <amount>**12.00**</amount>             **<- AAS price**

                        </monetaryDetail\>

                    </amountInfo>

                </serviceMatchedInfoGroup>

-   Description

<feeDescriptionGrp>

                <itemNumberInfo>

                    <itemNumberDetails>

                        <number>**1**</number>          **<- AAS baggage reference**

                        <type>SD</type>

                    </itemNumberDetails>

                </itemNumberInfo>

                <serviceAttributesInfo>

                    <attributeDetails\>

                        <attributeType\>**RFIC**</attributeType\>             **<- RFIC**

                        <attributeDescription\>**C**</attributeDescription\>

                    </attributeDetails\>

                    <attributeDetails\>

                        <attributeType\>**BKM**</attributeType\>            **<- Booking method**

                        <attributeDescription\>**04**</attributeDescription\>

                    </attributeDetails\>

                </serviceAttributesInfo>

                <serviceDescriptionInfo>

                    <serviceRequirementsInfo>

                        <serviceClassification>**P**</serviceClassification>         **<- Service classification**

                        <serviceNumberOfInstances>1</serviceNumberOfInstances>

                        <serviceMarketingCarrier>**BE**</serviceMarketingCarrier>        **<- Service carrier**

                        <serviceGroup>**BG**</serviceGroup>  **<- Service group**

                        <serviceFreeText>**B3**</serviceFreeText>        **<- Service description**

                    </serviceRequirementsInfo>

                </serviceDescriptionInfo>

                <commercialName>

                    <freeTextQualification>

                        <textSubjectQualifier\>3</textSubjectQualifier\>

                    </freeTextQualification>

                    <freeText\>**PREPAID MERCHO**</freeText\>         **<- Commercial Name**

                </commercialName>

## 5.36.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_MasterPricerCalendar xmlns="http://xml.amadeus.com/FMPCAQ\_20\_2\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>2</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>RC</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> <traveller> <ref>2</ref> </traveller> </paxReference> <fareOptions> <pricingTickInfo> <pricingTicketing> <priceType>BAG</priceType> </pricingTicketing> </pricingTickInfo> </fareOptions> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>NCE</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>PAR</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>251114</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>3</dayInterval> </rangeOfDate> </timeDetails> </itinerary> <itinerary> <requestedSegmentRef> <segRef>2</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>PAR</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>NCE</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>031214</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>3</dayInterval> </rangeOfDate> </timeDetails> </itinerary> </Fare\_MasterPricerCalendar>

## 5.36.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.36.3 Possible Errors

See "Error Messages" section.

* * *

## 5.37 Operation: 06.2 Fee Option - Form of Payment

The form of payment option may be combined with any other option. A maximum of 3 forms of payment may be keyed in.

It is optional that the traveller indicates some forms of payment.

Possible values are AGT, CC, CA, CK, GR, MS, NR, PT, SGR, UN.

If one form of payment is specified, the amount is optional.

If two forms of payment are specified, one amount is mandatory and one amount is optional.

If three forms of payment are specified, two amounts must be specified.

When the form of payment is specified as CC, a 6-digit bin number is required.

## 5.37.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_MasterPricerCalendar xmlns="http://xml.amadeus.com/FMPCAQ\_20\_2\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fareOptions> <pricingTickInfo> <pricingTicketing> <priceType>RU</priceType> <priceType>RP</priceType> </pricingTicketing> </pricingTickInfo> <formOfPayment> <formOfPaymentDetails> <type>CC</type> <chargedAmount>100</chargedAmount> <creditCardNumber>123456</creditCardNumber> </formOfPaymentDetails> <formOfPaymentDetails> <type>CC</type> <chargedAmount>200</chargedAmount> <creditCardNumber>234566</creditCardNumber> </formOfPaymentDetails> </formOfPayment> </fareOptions> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>PAR</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>NCE</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>211207</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>3</dayInterval> </rangeOfDate> </timeDetails> </itinerary> </Fare\_MasterPricerCalendar>

## 5.37.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.37.3 Possible Errors

See "Error Messages" section.

* * *

## 5.38 Operation: 06.3 Fee Option - Sorting with/without Fees

This option allows to sort recommendations considering or not fees applying to fares in the ranking. Possible values for OB fees are SORT: NOFEE or SORT: FEE.

## 5.38.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_MasterPricerCalendar xmlns="http://xml.amadeus.com/FMPCAQ\_20\_2\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fareOptions> <pricingTickInfo> <pricingTicketing> <priceType>RU</priceType> <priceType>RP</priceType> </pricingTicketing> </pricingTickInfo> <feeIdDescription> <feeId> <feeType>SORT</feeType> <feeIdNumber>NOFEE</feeIdNumber> </feeId> </feeIdDescription> </fareOptions> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>PAR</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>NCE</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>211207</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>3</dayInterval> </rangeOfDate> </timeDetails> </itinerary> <feeOption> <feeTypeInfo> <carrierFeeDetails> <type>OB</type> </carrierFeeDetails> </feeTypeInfo> <feeDetails> <feeInfo> <dataTypeInformation> <subType>T02</subType> <option>EX</option> </dataTypeInformation> </feeInfo> </feeDetails> <feeDetails> <feeInfo> <dataTypeInformation> <subType>FC4</subType> <option>IN</option> </dataTypeInformation> </feeInfo> <associatedAmounts> <monetaryDetails> <typeQualifier>C</typeQualifier> <amount>20.00</amount> </monetaryDetails> </associatedAmounts> </feeDetails> </feeOption> </Fare\_MasterPricerCalendar>

## 5.38.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.38.3 Possible Errors

See "Error Messages" section.

* * *

## 5.39 Operation: 06.4 Fee Option - Exempt all airline ticketing fees

This option allows to exempt all Airline ticketing fees.

## 5.39.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_MasterPricerCalendar xmlns="http://xml.amadeus.com/FMPCAQ\_20\_2\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fareOptions> <pricingTickInfo> <pricingTicketing> <priceType>RU</priceType> <priceType>RP</priceType> </pricingTicketing> </pricingTickInfo> </fareOptions> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>PAR</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>NCE</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>211207</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>3</dayInterval> </rangeOfDate> </timeDetails> </itinerary> <feeOption> <feeTypeInfo> <carrierFeeDetails> <type>OB</type> <optionInformation>EX</optionInformation> </carrierFeeDetails> </feeTypeInfo> </feeOption> </Fare\_MasterPricerCalendar>

## 5.39.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.39.3 Possible Errors

See "Error Messages" section.

* * *

## 5.40 Operation: 06.5 Fee Option - Add/Exempt airline ticketing fees by sub-code

Airline ticketing fees (OB fees) sub-codes can be specified in order to add or exempt particular fees.

The airline ticketing fees concept is driven from data filed by the airline.

A maximum of 6 sub-codes can be added or exempted. For each added FOP sub-code (neither exempted subcode nor ticketing sub-code), an amount can be optionally specified.

If 1 FOP sub-code is added, an amount is optional.

If 2 FOP sub-codes are added, the 2 amounts are optional.

If 3 FOP sub-codes are added, 0 or 2 amounts can be specified but neither 1 no 3.

Note: that airline ticketing fees are not yet available in all markets or all carriers, for further details contact your local Amadeus Help Desk.

## 5.40.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_MasterPricerCalendar xmlns="http://xml.amadeus.com/FMPCAQ\_20\_2\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>PAR</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>NCE</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>211207</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>3</dayInterval> </rangeOfDate> </timeDetails> </itinerary> <feeOption> <feeTypeInfo> <carrierFeeDetails> <type>OB</type> </carrierFeeDetails> </feeTypeInfo> <feeDetails> <feeInfo> <dataTypeInformation> <subType>T02</subType> <option>EX</option> </dataTypeInformation> </feeInfo> </feeDetails> <feeDetails> <feeInfo> <dataTypeInformation> <subType>FC4</subType> <option>IN</option> </dataTypeInformation> </feeInfo> <associatedAmounts> <monetaryDetails> <typeQualifier>C</typeQualifier> <amount>20.00</amount> </monetaryDetails> </associatedAmounts> </feeDetails> </feeOption> </Fare\_MasterPricerCalendar>

## 5.40.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.40.3 Possible Errors

See "Error Messages" section.

* * *

## 5.41 Operation: 06.6 Fee Option - Estimated FOP fees

When no form of payment is yet known, the user has the possibility to request an estimation of the form of payment fees that may apply.

Any combination of at least 1 up to 6 kinds of fees can be requested in the input:

\- Minimum fee amount for credit card (FCN) and/or

\- Maximum fee amount for credit card (FCX) and/or

\- Minimum fee amount for debit card (FDN) and/or

\- Maximum fee amount for debit card (FDX) and/or

\- Minimum fee amount for any type of card (FON) and/or

\- Maximum fee amount for any type of card (FOX)

In case of redundancy, the system does not return the fees for any type of card in the output even if it was requested. For example, if we request minimum any card, minimum debit card, maximum debit card, maximum credit card and maximum any card in input, we will have minimum any card, minimum debit card, maximum debit card, maximum credit card in output.

In the example below we request the minimum fee amount for any type of card (FON) and the maximum fee amount for any type of card (FOX). In the reply the minimum and the maximum fee amount for any type of card (respectively FON and FOX) are returned.

## 5.41.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_MasterPricerCalendar xmlns="http://xml.amadeus.com/FMPCAQ\_20\_2\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>2</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>RC</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> <traveller> <ref>2</ref> </traveller> </paxReference> <fareOptions> <pricingTickInfo> <pricingTicketing> <priceType>RU</priceType> <priceType>RP</priceType> <priceType>FON</priceType> <priceType>FOX</priceType> </pricingTicketing> </pricingTickInfo> </fareOptions> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>NCE</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>PAR</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>251114</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>3</dayInterval> </rangeOfDate> </timeDetails> </itinerary> <itinerary> <requestedSegmentRef> <segRef>2</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>PAR</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>NCE</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>031214</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>3</dayInterval> </rangeOfDate> </timeDetails> </itinerary> </Fare\_MasterPricerCalendar>

## 5.41.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_MasterPricerCalendarReply xmlns="http://xml.amadeus.com/FMPCAR\_20\_2\_1A"> <replyStatus> <status> <advisoryTypeInfo>FQX</advisoryTypeInfo> </status> </replyStatus> <conversionRate> <conversionRateDetail> <currency>EUR</currency> </conversionRateDetail> </conversionRate> <flightIndex> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>1</ref> </flightProposal> <flightProposal> <ref>0125</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>AF</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>221114</dateOfDeparture> <timeOfDeparture>0630</timeOfDeparture> <dateOfArrival>221114</dateOfArrival> <timeOfArrival>0755</timeOfArrival> </productDateTime> <location> <locationId>NCE</locationId> <terminal>2</terminal> </location> <location> <locationId>ORY</locationId> <terminal>W</terminal> </location> <companyId> <marketingCarrier>AF</marketingCarrier> <operatingCarrier>AF</operatingCarrier> </companyId> <flightOrtrainNumber>6201</flightOrtrainNumber> <productDetail> <equipmentType>320</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>2</ref> </flightProposal> <flightProposal> <ref>0125</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>AF</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>231114</dateOfDeparture> <timeOfDeparture>0630</timeOfDeparture> <dateOfArrival>231114</dateOfArrival> <timeOfArrival>0755</timeOfArrival> </productDateTime> <location> <locationId>NCE</locationId> <terminal>2</terminal> </location> <location> <locationId>ORY</locationId> <terminal>W</terminal> </location> <companyId> <marketingCarrier>AF</marketingCarrier> <operatingCarrier>AF</operatingCarrier> </companyId> <flightOrtrainNumber>6201</flightOrtrainNumber> <productDetail> <equipmentType>320</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>3</ref> </flightProposal> <flightProposal> <ref>0125</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>AF</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>241114</dateOfDeparture> <timeOfDeparture>0940</timeOfDeparture> <dateOfArrival>241114</dateOfArrival> <timeOfArrival>1105</timeOfArrival> </productDateTime> <location> <locationId>NCE</locationId> <terminal>2</terminal> </location> <location> <locationId>ORY</locationId> <terminal>W</terminal> </location> <companyId> <marketingCarrier>AF</marketingCarrier> <operatingCarrier>AF</operatingCarrier> </companyId> <flightOrtrainNumber>6215</flightOrtrainNumber> <productDetail> <equipmentType>320</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>4</ref> </flightProposal> <flightProposal> <ref>0125</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>AF</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>251114</dateOfDeparture> <timeOfDeparture>0940</timeOfDeparture> <dateOfArrival>251114</dateOfArrival> <timeOfArrival>1105</timeOfArrival> </productDateTime> <location> <locationId>NCE</locationId> <terminal>2</terminal> </location> <location> <locationId>ORY</locationId> <terminal>W</terminal> </location> <companyId> <marketingCarrier>AF</marketingCarrier> <operatingCarrier>AF</operatingCarrier> </companyId> <flightOrtrainNumber>6215</flightOrtrainNumber> <productDetail> <equipmentType>320</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>5</ref> </flightProposal> <flightProposal> <ref>0125</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>AF</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>281114</dateOfDeparture> <timeOfDeparture>0630</timeOfDeparture> <dateOfArrival>281114</dateOfArrival> <timeOfArrival>0755</timeOfArrival> </productDateTime> <location> <locationId>NCE</locationId> <terminal>2</terminal> </location> <location> <locationId>ORY</locationId> <terminal>W</terminal> </location> <companyId> <marketingCarrier>AF</marketingCarrier> <operatingCarrier>AF</operatingCarrier> </companyId> <flightOrtrainNumber>6201</flightOrtrainNumber> <productDetail> <equipmentType>320</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>6</ref> </flightProposal> <flightProposal> <ref>0135</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>AF</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>261114</dateOfDeparture> <timeOfDeparture>1035</timeOfDeparture> <dateOfArrival>261114</dateOfArrival> <timeOfArrival>1210</timeOfArrival> </productDateTime> <location> <locationId>NCE</locationId> <terminal>2</terminal> </location> <location> <locationId>CDG</locationId> <terminal>2F</terminal> </location> <companyId> <marketingCarrier>AF</marketingCarrier> <operatingCarrier>AF</operatingCarrier> </companyId> <flightOrtrainNumber>7701</flightOrtrainNumber> <productDetail> <equipmentType>320</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>7</ref> </flightProposal> <flightProposal> <ref>0135</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>AF</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>271114</dateOfDeparture> <timeOfDeparture>1035</timeOfDeparture> <dateOfArrival>271114</dateOfArrival> <timeOfArrival>1210</timeOfArrival> </productDateTime> <location> <locationId>NCE</locationId> <terminal>2</terminal> </location> <location> <locationId>CDG</locationId> <terminal>2F</terminal> </location> <companyId> <marketingCarrier>AF</marketingCarrier> <operatingCarrier>AF</operatingCarrier> </companyId> <flightOrtrainNumber>7701</flightOrtrainNumber> <productDetail> <equipmentType>320</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> </flightIndex> <flightIndex> <requestedSegmentRef> <segRef>2</segRef> </requestedSegmentRef> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>1</ref> </flightProposal> <flightProposal> <ref>0120</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>AF</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>011214</dateOfDeparture> <timeOfDeparture>1005</timeOfDeparture> <dateOfArrival>011214</dateOfArrival> <timeOfArrival>1125</timeOfArrival> </productDateTime> <location> <locationId>ORY</locationId> <terminal>W</terminal> </location> <location> <locationId>NCE</locationId> <terminal>2</terminal> </location> <companyId> <marketingCarrier>AF</marketingCarrier> <operatingCarrier>AF</operatingCarrier> </companyId> <flightOrtrainNumber>6244</flightOrtrainNumber> <productDetail> <equipmentType>321</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>2</ref> </flightProposal> <flightProposal> <ref>0120</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>AF</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>021214</dateOfDeparture> <timeOfDeparture>1005</timeOfDeparture> <dateOfArrival>021214</dateOfArrival> <timeOfArrival>1125</timeOfArrival> </productDateTime> <location> <locationId>ORY</locationId> <terminal>W</terminal> </location> <location> <locationId>NCE</locationId> <terminal>2</terminal> </location> <companyId> <marketingCarrier>AF</marketingCarrier> <operatingCarrier>AF</operatingCarrier> </companyId> <flightOrtrainNumber>6244</flightOrtrainNumber> <productDetail> <equipmentType>321</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>3</ref> </flightProposal> <flightProposal> <ref>0120</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>AF</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>031214</dateOfDeparture> <timeOfDeparture>1005</timeOfDeparture> <dateOfArrival>031214</dateOfArrival> <timeOfArrival>1125</timeOfArrival> </productDateTime> <location> <locationId>ORY</locationId> <terminal>W</terminal> </location> <location> <locationId>NCE</locationId> <terminal>2</terminal> </location> <companyId> <marketingCarrier>AF</marketingCarrier> <operatingCarrier>AF</operatingCarrier> </companyId> <flightOrtrainNumber>6244</flightOrtrainNumber> <productDetail> <equipmentType>321</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>4</ref> </flightProposal> <flightProposal> <ref>0120</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>AF</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>041214</dateOfDeparture> <timeOfDeparture>1005</timeOfDeparture> <dateOfArrival>041214</dateOfArrival> <timeOfArrival>1125</timeOfArrival> </productDateTime> <location> <locationId>ORY</locationId> <terminal>W</terminal> </location> <location> <locationId>NCE</locationId> <terminal>2</terminal> </location> <companyId> <marketingCarrier>AF</marketingCarrier> <operatingCarrier>AF</operatingCarrier> </companyId> <flightOrtrainNumber>6244</flightOrtrainNumber> <productDetail> <equipmentType>321</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>5</ref> </flightProposal> <flightProposal> <ref>0120</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>AF</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>061214</dateOfDeparture> <timeOfDeparture>0640</timeOfDeparture> <dateOfArrival>061214</dateOfArrival> <timeOfArrival>0800</timeOfArrival> </productDateTime> <location> <locationId>ORY</locationId> <terminal>W</terminal> </location> <location> <locationId>NCE</locationId> <terminal>2</terminal> </location> <companyId> <marketingCarrier>AF</marketingCarrier> <operatingCarrier>AF</operatingCarrier> </companyId> <flightOrtrainNumber>6240</flightOrtrainNumber> <productDetail> <equipmentType>321</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>6</ref> </flightProposal> <flightProposal> <ref>0120</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>AF</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>301114</dateOfDeparture> <timeOfDeparture>0800</timeOfDeparture> <dateOfArrival>301114</dateOfArrival> <timeOfArrival>0920</timeOfArrival> </productDateTime> <location> <locationId>ORY</locationId> <terminal>W</terminal> </location> <location> <locationId>NCE</locationId> <terminal>2</terminal> </location> <companyId> <marketingCarrier>AF</marketingCarrier> <operatingCarrier>AF</operatingCarrier> </companyId> <flightOrtrainNumber>6202</flightOrtrainNumber> <productDetail> <equipmentType>319</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>7</ref> </flightProposal> <flightProposal> <ref>0120</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>AF</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>051214</dateOfDeparture> <timeOfDeparture>0935</timeOfDeparture> <dateOfArrival>051214</dateOfArrival> <timeOfArrival>1055</timeOfArrival> </productDateTime> <location> <locationId>ORY</locationId> <terminal>W</terminal> </location> <location> <locationId>NCE</locationId> <terminal>2</terminal> </location> <companyId> <marketingCarrier>AF</marketingCarrier> <operatingCarrier>AF</operatingCarrier> </companyId> <flightOrtrainNumber>6204</flightOrtrainNumber> <productDetail> <equipmentType>319</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> </flightIndex> <recommendation> <itemNumber> <itemNumberId> <number>1</number> </itemNumberId> </itemNumber> <recPriceInfo> <monetaryDetail> <amount>21309.38</amount> </monetaryDetail> <monetaryDetail> <amount>110.50</amount> </monetaryDetail> <monetaryDetail> <amountType>OB</amountType> <amount>21032.88</amount> </monetaryDetail> <monetaryDetail> <amountType>XOB</amountType> <amount>276.50</amount> </monetaryDetail> <monetaryDetail> <amountType>FON</amountType> <amount>0.30</amount> </monetaryDetail> <monetaryDetail> <amountType>FOX</amountType> <amount>19675.76</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>3</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>4</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>5</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>3</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>4</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>5</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>3</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>3</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>3</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>3</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>3</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>4</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>3</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>5</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>4</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>4</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>4</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>3</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>4</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>4</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>4</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>5</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>5</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>5</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>5</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>3</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>5</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>4</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>5</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>5</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>6</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>6</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>6</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>3</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>6</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>4</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>6</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>5</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>7</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>7</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>7</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>3</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>7</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>4</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>7</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>5</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>10654.69</totalFareAmount> <totalTaxAmount>55.25</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>7X</company> </codeShareDetails> <monetaryDetails> <amountType>OB</amountType> <amount>10516.44</amount> </monetaryDetails> <monetaryDetails> <amountType>XOB</amountType> <amount>138.25</amount> </monetaryDetails> <pricingTicketing> <priceType>OBI</priceType> <priceType>OBF</priceType> <priceType>OBA</priceType> <priceType>OBV</priceType> </pricingTicketing> </paxFareDetail> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> <traveller> <ref>2</ref> </traveller> </paxReference> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>PEN</textSubjectQualifier> <informationType>70</informationType> </freeTextQualification> <description>TICKETS ARE NON-REFUNDABLE</description> </pricingMessage> </fare> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>R</rbd> <cabin>M</cabin> </cabinProduct> <fareProductDetail> <fareBasis>RSAPFR</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> </groupOfFares> </fareDetails> <fareDetails> <segmentRef> <segRef>2</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>R</rbd> <cabin>M</cabin> </cabinProduct> <fareProductDetail> <fareBasis>RSAPFR</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> </groupOfFares> </fareDetails> </paxFareProduct> </recommendation> <recommendation> <itemNumber> <itemNumberId> <number>2</number> </itemNumberId> </itemNumber> <recPriceInfo> <monetaryDetail> <amount>21331.38</amount> </monetaryDetail> <monetaryDetail> <amount>110.50</amount> </monetaryDetail> <monetaryDetail> <amountType>OB</amountType> <amount>21032.88</amount> </monetaryDetail> <monetaryDetail> <amountType>XOB</amountType> <amount>298.50</amount> </monetaryDetail> <monetaryDetail> <amountType>FON</amountType> <amount>0.30</amount> </monetaryDetail> <monetaryDetail> <amountType>FOX</amountType> <amount>19696.00</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>6</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>7</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>6</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>7</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>3</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>6</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>3</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>7</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>4</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>6</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>4</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>7</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>5</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>6</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>5</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>7</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>6</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>6</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>6</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>7</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>7</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>6</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>7</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>7</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>10665.69</totalFareAmount> <totalTaxAmount>55.25</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>7X</company> </codeShareDetails> <monetaryDetails> <amountType>OB</amountType> <amount>10516.44</amount> </monetaryDetails> <monetaryDetails> <amountType>XOB</amountType> <amount>149.25</amount> </monetaryDetails> <pricingTicketing> <priceType>OBI</priceType> <priceType>OBF</priceType> <priceType>OBA</priceType> <priceType>OBV</priceType> </pricingTicketing> </paxFareDetail> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> <traveller> <ref>2</ref> </traveller> </paxReference> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>PEN</textSubjectQualifier> <informationType>70</informationType> </freeTextQualification> <description>TICKETS ARE NON-REFUNDABLE</description> </pricingMessage> </fare> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>R</rbd> <cabin>M</cabin> </cabinProduct> <fareProductDetail> <fareBasis>RSAPFR</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> </groupOfFares> </fareDetails> <fareDetails> <segmentRef> <segRef>2</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>N</rbd> <cabin>M</cabin> </cabinProduct> <fareProductDetail> <fareBasis>NSRFR</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> </groupOfFares> </fareDetails> </paxFareProduct> </recommendation> </Fare\_MasterPricerCalendarReply>

## 5.41.3 Possible Errors

See "Error Messages" section.

* * *

## 5.42 Operation: 07.0 Output Option - Prohibited Country

The prohibited country warning indicator indicates if the flight has been flagged as a warning flight (WRN) by Prohibited country processing. Its value is 'C' in case the flight is a warning flight.

## 5.42.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_MasterPricerCalendar xmlns="http://xml.amadeus.com/FMPCAQ\_20\_2\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>OSL</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>CYO</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>230511</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>3</dayInterval> </rangeOfDate> </timeDetails> </itinerary> </Fare\_MasterPricerCalendar>

## 5.42.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_MasterPricerCalendarReply xmlns="http://xml.amadeus.com/FMPCAR\_20\_2\_1A"> <conversionRate> <conversionRateDetail> <currency>EUR</currency> </conversionRateDetail> </conversionRate> <flightIndex> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>1</ref> </flightProposal> <flightProposal> <ref>2110</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>LH</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>220511</dateOfDeparture> <timeOfDeparture>0625</timeOfDeparture> <dateOfArrival>220511</dateOfArrival> <timeOfArrival>0835</timeOfArrival> </productDateTime> <location> <locationId>OSL</locationId> </location> <location> <locationId>FRA</locationId> <terminal>1</terminal> </location> <companyId> <marketingCarrier>LH</marketingCarrier> <operatingCarrier>LH</operatingCarrier> </companyId> <flightOrtrainNumber>865</flightOrtrainNumber> <productDetail> <equipmentType>319</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>220511</dateOfDeparture> <timeOfDeparture>1030</timeOfDeparture> <dateOfArrival>220511</dateOfArrival> <timeOfArrival>1210</timeOfArrival> </productDateTime> <location> <locationId>FRA</locationId> <terminal>1</terminal> </location> <location> <locationId>YUL</locationId> </location> <companyId> <marketingCarrier>LH</marketingCarrier> <operatingCarrier>AC</operatingCarrier> </companyId> <flightOrtrainNumber>5480</flightOrtrainNumber> <productDetail> <equipmentType>77W</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>220511</dateOfDeparture> <timeOfDeparture>1735</timeOfDeparture> <dateOfArrival>220511</dateOfArrival> <timeOfArrival>2135</timeOfArrival> </productDateTime> <location> <locationId>YUL</locationId> </location> <location> <locationId>CYO</locationId> </location> <companyId> <marketingCarrier>CU</marketingCarrier> <operatingCarrier>CU</operatingCarrier> </companyId> <flightOrtrainNumber>173</flightOrtrainNumber> <productDetail> <equipmentType>320</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> <flightCharacteristic>C</flightCharacteristic> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>2</ref> </flightProposal> <flightProposal> <ref>3225</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>LH</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>210511</dateOfDeparture> <timeOfDeparture>1910</timeOfDeparture> <dateOfArrival>210511</dateOfArrival> <timeOfArrival>2110</timeOfArrival> </productDateTime> <location> <locationId>OSL</locationId> </location> <location> <locationId>FRA</locationId> <terminal>1</terminal> </location> <companyId> <marketingCarrier>LH</marketingCarrier> <operatingCarrier>LH</operatingCarrier> </companyId> <flightOrtrainNumber>863</flightOrtrainNumber> <productDetail> <equipmentType>319</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>220511</dateOfDeparture> <timeOfDeparture>1030</timeOfDeparture> <dateOfArrival>220511</dateOfArrival> <timeOfArrival>1210</timeOfArrival> </productDateTime> <location> <locationId>FRA</locationId> <terminal>1</terminal> </location> <location> <locationId>YUL</locationId> </location> <companyId> <marketingCarrier>LH</marketingCarrier> <operatingCarrier>AC</operatingCarrier> </companyId> <flightOrtrainNumber>5480</flightOrtrainNumber> <productDetail> <equipmentType>77W</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>220511</dateOfDeparture> <timeOfDeparture>1735</timeOfDeparture> <dateOfArrival>220511</dateOfArrival> <timeOfArrival>2135</timeOfArrival> </productDateTime> <location> <locationId>YUL</locationId> </location> <location> <locationId>CYO</locationId> </location> <companyId> <marketingCarrier>CU</marketingCarrier> <operatingCarrier>CU</operatingCarrier> </companyId> <flightOrtrainNumber>173</flightOrtrainNumber> <productDetail> <equipmentType>320</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> <flightCharacteristic>C</flightCharacteristic> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> </flightIndex> <recommendation> <itemNumber> <itemNumberId> <number>1</number> </itemNumberId> </itemNumber> <recPriceInfo> <monetaryDetail> <amount>3284.35</amount> </monetaryDetail> <monetaryDetail> <amount>219.35</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>3284.35</totalFareAmount> <totalTaxAmount>219.35</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>HR</company> </codeShareDetails> </paxFareDetail> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>PEN</textSubjectQualifier> <informationType>70</informationType> </freeTextQualification> <description>TICKETS ARE NON-REFUNDABLE</description> </pricingMessage> </fare> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>Y</rbd> <cabin>M</cabin> </cabinProduct> <fareProductDetail> <fareBasis>Y77OW</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>N</breakPoint> </productInformation> </groupOfFares> <groupOfFares> <productInformation> <cabinProduct> <rbd>Y</rbd> <cabin>M</cabin> </cabinProduct> <fareProductDetail> <fareBasis>Y77OW</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> </groupOfFares> <groupOfFares> <productInformation> <cabinProduct> <rbd>X</rbd> <cabin>M</cabin> </cabinProduct> <fareProductDetail> <fareBasis>XE90D</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> </groupOfFares> </fareDetails> </paxFareProduct> </recommendation> </Fare\_MasterPricerCalendarReply>

## 5.42.3 Possible Errors

See "Error Messages" section.

* * *

## 5.43 Operation: 07.1 Output Option - Display Min/Max Stay

The user has the possibility to display the Minimum and the Maximum Stay at fare component level with the MST option in the query.

## 5.43.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_MasterPricerCalendar xmlns="http://xml.amadeus.com/FMPCAQ\_20\_2\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fareOptions> <pricingTickInfo> <pricingTicketing> <priceType>MST</priceType> </pricingTicketing> </pricingTickInfo> </fareOptions> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>NCE</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>LHR</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>030414</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>3</dayInterval> </rangeOfDate> </timeDetails> </itinerary> </Fare\_MasterPricerCalendar>

## 5.43.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_MasterPricerCalendarReply xmlns="http://xml.amadeus.com/FMPCAR\_20\_2\_1A"> <replyStatus> <status> <advisoryTypeInfo>FQX</advisoryTypeInfo> </status> </replyStatus> <conversionRate> <conversionRateDetail> <currency>INR</currency> </conversionRateDetail> </conversionRate> <flightIndex> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>1</ref> </flightProposal> <flightProposal> <ref>0200</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>BA</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>310314</dateOfDeparture> <timeOfDeparture>1525</timeOfDeparture> <dateOfArrival>310314</dateOfArrival> <timeOfArrival>1625</timeOfArrival> </productDateTime> <location> <locationId>NCE</locationId> <terminal>1</terminal> </location> <location> <locationId>LHR</locationId> <terminal>5</terminal> </location> <companyId> <marketingCarrier>BA</marketingCarrier> <operatingCarrier>BA</operatingCarrier> </companyId> <flightOrtrainNumber>345</flightOrtrainNumber> <productDetail> <equipmentType>319</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>2</ref> </flightProposal> <flightProposal> <ref>0200</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>BA</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>010414</dateOfDeparture> <timeOfDeparture>1525</timeOfDeparture> <dateOfArrival>010414</dateOfArrival> <timeOfArrival>1625</timeOfArrival> </productDateTime> <location> <locationId>NCE</locationId> <terminal>1</terminal> </location> <location> <locationId>LHR</locationId> <terminal>5</terminal> </location> <companyId> <marketingCarrier>BA</marketingCarrier> <operatingCarrier>BA</operatingCarrier> </companyId> <flightOrtrainNumber>345</flightOrtrainNumber> <productDetail> <equipmentType>319</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>3</ref> </flightProposal> <flightProposal> <ref>0200</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>BA</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>020414</dateOfDeparture> <timeOfDeparture>1525</timeOfDeparture> <dateOfArrival>020414</dateOfArrival> <timeOfArrival>1625</timeOfArrival> </productDateTime> <location> <locationId>NCE</locationId> <terminal>1</terminal> </location> <location> <locationId>LHR</locationId> <terminal>5</terminal> </location> <companyId> <marketingCarrier>BA</marketingCarrier> <operatingCarrier>BA</operatingCarrier> </companyId> <flightOrtrainNumber>345</flightOrtrainNumber> <productDetail> <equipmentType>319</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>4</ref> </flightProposal> <flightProposal> <ref>0200</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>BA</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>030414</dateOfDeparture> <timeOfDeparture>1840</timeOfDeparture> <dateOfArrival>030414</dateOfArrival> <timeOfArrival>1940</timeOfArrival> </productDateTime> <location> <locationId>NCE</locationId> <terminal>1</terminal> </location> <location> <locationId>LHR</locationId> <terminal>5</terminal> </location> <companyId> <marketingCarrier>BA</marketingCarrier> <operatingCarrier>BA</operatingCarrier> </companyId> <flightOrtrainNumber>355</flightOrtrainNumber> <productDetail> <equipmentType>320</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>5</ref> </flightProposal> <flightProposal> <ref>0200</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>BA</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>040414</dateOfDeparture> <timeOfDeparture>1840</timeOfDeparture> <dateOfArrival>040414</dateOfArrival> <timeOfArrival>1940</timeOfArrival> </productDateTime> <location> <locationId>NCE</locationId> <terminal>1</terminal> </location> <location> <locationId>LHR</locationId> <terminal>5</terminal> </location> <companyId> <marketingCarrier>BA</marketingCarrier> <operatingCarrier>BA</operatingCarrier> </companyId> <flightOrtrainNumber>355</flightOrtrainNumber> <productDetail> <equipmentType>320</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>6</ref> </flightProposal> <flightProposal> <ref>0200</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>BA</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>050414</dateOfDeparture> <timeOfDeparture>1840</timeOfDeparture> <dateOfArrival>050414</dateOfArrival> <timeOfArrival>1940</timeOfArrival> </productDateTime> <location> <locationId>NCE</locationId> <terminal>1</terminal> </location> <location> <locationId>LHR</locationId> <terminal>5</terminal> </location> <companyId> <marketingCarrier>BA</marketingCarrier> <operatingCarrier>BA</operatingCarrier> </companyId> <flightOrtrainNumber>355</flightOrtrainNumber> <productDetail> <equipmentType>320</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>7</ref> </flightProposal> <flightProposal> <ref>0200</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>BA</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>060414</dateOfDeparture> <timeOfDeparture>1935</timeOfDeparture> <dateOfArrival>060414</dateOfArrival> <timeOfArrival>2035</timeOfArrival> </productDateTime> <location> <locationId>NCE</locationId> <terminal>1</terminal> </location> <location> <locationId>LHR</locationId> <terminal>5</terminal> </location> <companyId> <marketingCarrier>BA</marketingCarrier> <operatingCarrier>BA</operatingCarrier> </companyId> <flightOrtrainNumber>349</flightOrtrainNumber> <productDetail> <equipmentType>319</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> </flightIndex> <recommendation> <itemNumber> <itemNumberId> <number>1</number> </itemNumberId> </itemNumber> <recPriceInfo> <monetaryDetail> <amount>6201</amount> </monetaryDetail> <monetaryDetail> <amount>4576</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>6201</totalFareAmount> <totalTaxAmount>4576</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>BA</company> </codeShareDetails> <pricingTicketing> <priceType>OBV</priceType> </pricingTicketing> </paxFareDetail> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>PEN</textSubjectQualifier> <informationType>70</informationType> </freeTextQualification> <description>TICKETS ARE NON-REFUNDABLE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>LTD</textSubjectQualifier> <informationType>40</informationType> </freeTextQualification> <description>LAST TKT DTE</description> <description>17FEB14</description> <description> - SEE ADV PURCHASE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>SUR</textSubjectQualifier> <informationType>79</informationType> </freeTextQualification> <description>FARE VALID FOR E TICKET ONLY</description> </pricingMessage> </fare> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>O</rbd> <cabin>M</cabin> </cabinProduct> <fareProductDetail> <fareBasis>OLV1HO</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> <fareType>ET</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> <fareFamiliesRef> <referencingDetail> <refQualifier>M</refQualifier> <refNumber>1</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> </paxFareProduct> </recommendation> <recommendation> <itemNumber> <itemNumberId> <number>2</number> </itemNumberId> </itemNumber> <recPriceInfo> <monetaryDetail> <amount>6237</amount> </monetaryDetail> <monetaryDetail> <amount>4612</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>3</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>4</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>5</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>6</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>6237</totalFareAmount> <totalTaxAmount>4612</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>BA</company> </codeShareDetails> <pricingTicketing> <priceType>OBV</priceType> </pricingTicketing> </paxFareDetail> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>PEN</textSubjectQualifier> <informationType>70</informationType> </freeTextQualification> <description>TICKETS ARE NON-REFUNDABLE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>LTD</textSubjectQualifier> <informationType>40</informationType> </freeTextQualification> <description>LAST TKT DTE</description> <description>17FEB14</description> <description> - SEE ADV PURCHASE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>SUR</textSubjectQualifier> <informationType>79</informationType> </freeTextQualification> <description>FARE VALID FOR E TICKET ONLY</description> </pricingMessage> </fare> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>O</rbd> <cabin>M</cabin> </cabinProduct> <fareProductDetail> <fareBasis>OLV1HO</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> <fareType>ET</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> <fareFamiliesRef> <referencingDetail> <refQualifier>M</refQualifier> <refNumber>3</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> </paxFareProduct> </recommendation> <recommendation> <itemNumber> <itemNumberId> <number>3</number> </itemNumberId> </itemNumber> <recPriceInfo> <monetaryDetail> <amount>7862</amount> </monetaryDetail> <monetaryDetail> <amount>4612</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>7</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>7862</totalFareAmount> <totalTaxAmount>4612</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>BA</company> </codeShareDetails> <pricingTicketing> <priceType>OBV</priceType> </pricingTicketing> </paxFareDetail> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>PEN</textSubjectQualifier> <informationType>70</informationType> </freeTextQualification> <description>TICKETS ARE NON-REFUNDABLE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>LTD</textSubjectQualifier> <informationType>40</informationType> </freeTextQualification> <description>LAST TKT DTE</description> <description>17FEB14</description> <description> - SEE ADV PURCHASE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>SUR</textSubjectQualifier> <informationType>79</informationType> </freeTextQualification> <description>FARE VALID FOR E TICKET ONLY</description> </pricingMessage> </fare> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>Q</rbd> <cabin>M</cabin> </cabinProduct> <fareProductDetail> <fareBasis>QLV1HO</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> <fareType>ET</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> <fareFamiliesRef> <referencingDetail> <refQualifier>M</refQualifier> <refNumber>3</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> </paxFareProduct> </recommendation> <mnrGrp> <mnr> <category>LST</category> </mnr> <mnrDetails> <mnrRef> <itemNumberDetails> <number>1</number> </itemNumberDetails> </mnrRef> <dateInfo> <dateAndTimeDetails> <qualifier>MSC</qualifier> <date>300414</date> <time>0000</time> </dateAndTimeDetails> <dateAndTimeDetails> <qualifier>MSP</qualifier> <date>310514</date> <time>0000</time> </dateAndTimeDetails> </dateInfo> </mnrDetails> <mnrDetails> <mnrRef> <itemNumberDetails> <number>2</number> </itemNumberDetails> </mnrRef> <dateInfo> <dateAndTimeDetails> <qualifier>MSC</qualifier> <date>300414</date> <time>0000</time> </dateAndTimeDetails> <dateAndTimeDetails> <qualifier>MSP</qualifier> <date>310614</date> <time>0000</time> </dateAndTimeDetails> </dateInfo> </mnrDetails> <mnrDetails> <mnrRef> <itemNumberDetails> <number>3</number> </itemNumberDetails> </mnrRef> <dateInfo> <dateAndTimeDetails> <qualifier>MSC</qualifier> <date>300414</date> <time>0000</time> </dateAndTimeDetails> <dateAndTimeDetails> <qualifier>MSP</qualifier> <date>310714</date> <time>0000</time> </dateAndTimeDetails> </dateInfo> </mnrDetails> </mnrGrp> </Fare\_MasterPricerCalendarReply>

## 5.43.3 Possible Errors

See "Error Messages" section.

* * *

## 5.44 Operation: 07.2 Output Option - Negotiated Space Availability Indicator

In case the Negotiated Space availability complies with the query, a flag is set in the Output field of the Availability Context.

**Syntax input**: No change, negotiated space availabiliy has to be activated per OID and product, Master Pricer Calendar in this case.

**Syntax output**:  
     <recommendation>  
       <paxFareProduct\>  
         <fareDetails\>  
           <groupOfFares\>  
             <productInformation\>  
               <cabinProduct\>  
                 <rbd>A</rbd>  
                 <cabin>M</cabin>  
               </cabinProduct\>  
               <fareProductDetail\>  
                 <fareBasis\>AHCPPRT</fareBasis\>  
                 <passengerType\>ADT</passengerType\>  
                 <fareType\>RB</fareType\>  
               </fareProductDetail\>  
               <corporateId\>001234</corporateId\>  
               <breakPoint\>Y</breakPoint\>  
               **<contextDetails\>  
                 <availabilityCnxType\>N</availabilityCnxType\> <!-- Availability context N for Negotiated space -->  
               </contextDetails\>**  
             </productInformation\>  
           </groupOfFares\>  
         </fareDetails\>  
      </paxFareProduct\>  
    </recommendation>

## 5.44.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_MasterPricerCalendar xmlns="http://xml.amadeus.com/FMPCAQ\_20\_2\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>250</numberOfUnits> <typeOfUnit>RC</typeOfUnit> </unitNumberDetail> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fareOptions> <pricingTickInfo> <pricingTicketing> <priceType>RW</priceType> <priceType>PTC</priceType> <priceType>ET</priceType> <priceType>TAC</priceType> </pricingTicketing> </pricingTickInfo> <corporate> <corporateId> <corporateQualifier>RW</corporateQualifier> <identity>001234</identity> </corporateId> </corporate> <ticketingPriceScheme> <referenceNumber>0</referenceNumber> <name>MM</name> </ticketingPriceScheme> <feeIdDescription> <feeId> <feeType>FBA</feeType> <feeIdNumber>1</feeIdNumber> </feeId> <feeId> <feeType>FFI</feeType> <feeIdNumber>2</feeIdNumber> </feeId> </feeIdDescription> </fareOptions> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>PAR</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>PTP</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>120223</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>3</dayInterval> </rangeOfDate> </timeDetails> </itinerary> <itinerary> <requestedSegmentRef> <segRef>2</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>PTP</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>PAR</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>100323</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>3</dayInterval> </rangeOfDate> </timeDetails> </itinerary> </Fare\_MasterPricerCalendar>

## 5.44.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_MasterPricerCalendarReply xmlns="http://xml.amadeus.com/FMPCAR\_20\_2\_1A"> <replyStatus> <status> <advisoryTypeInfo>FQX</advisoryTypeInfo> </status> <status> <advisoryTypeInfo>USR</advisoryTypeInfo> <notification>AVT</notification> </status> </replyStatus> <conversionRate> <conversionRateDetail> <currency>EUR</currency> </conversionRateDetail> </conversionRate> <familyInformation> <refNumber>1</refNumber> <fareFamilyname>CLASSIC</fareFamilyname> <carrier>SS</carrier> </familyInformation> <feeDetails> <feeReference> <feeRefNumber>1</feeRefNumber> </feeReference> <feeInformation> <feeIdentification>A</feeIdentification> <feeInformation> <feeType>T</feeType> <feeAmountType>F</feeAmountType> <feeAmount>0.00</feeAmount> <feeCurrency>EUR</feeCurrency> </feeInformation> </feeInformation> <feeParameters> <feeParameter> <feeParameterType>ERR</feeParameterType> <feeParameterDescription>2015</feeParameterDescription> </feeParameter> </feeParameters> </feeDetails> <flightIndex> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>1</ref> </flightProposal> <flightProposal> <ref>0855</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>SS</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>130223</dateOfDeparture> <timeOfDeparture>1525</timeOfDeparture> <dateOfArrival>130223</dateOfArrival> <timeOfArrival>1920</timeOfArrival> </productDateTime> <location> <locationId>ORY</locationId> <terminal>4</terminal> </location> <location> <locationId>PTP</locationId> </location> <companyId> <marketingCarrier>SS</marketingCarrier> <operatingCarrier>SS</operatingCarrier> </companyId> <flightOrtrainNumber>942</flightOrtrainNumber> <productDetail> <equipmentType>330</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> <attributeDetails> <attributeType>EFT</attributeType> <attributeDescription>0855</attributeDescription> </attributeDetails> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>2</ref> </flightProposal> <flightProposal> <ref>0855</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>SS</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>140223</dateOfDeparture> <timeOfDeparture>1120</timeOfDeparture> <dateOfArrival>140223</dateOfArrival> <timeOfArrival>1515</timeOfArrival> </productDateTime> <location> <locationId>ORY</locationId> <terminal>4</terminal> </location> <location> <locationId>PTP</locationId> </location> <companyId> <marketingCarrier>SS</marketingCarrier> <operatingCarrier>SS</operatingCarrier> </companyId> <flightOrtrainNumber>926</flightOrtrainNumber> <productDetail> <equipmentType>339</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> <attributeDetails> <attributeType>EFT</attributeType> <attributeDescription>0855</attributeDescription> </attributeDetails> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>3</ref> </flightProposal> <flightProposal> <ref>0855</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>SS</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>150223</dateOfDeparture> <timeOfDeparture>1120</timeOfDeparture> <dateOfArrival>150223</dateOfArrival> <timeOfArrival>1515</timeOfArrival> </productDateTime> <location> <locationId>ORY</locationId> <terminal>4</terminal> </location> <location> <locationId>PTP</locationId> </location> <companyId> <marketingCarrier>SS</marketingCarrier> <operatingCarrier>SS</operatingCarrier> </companyId> <flightOrtrainNumber>926</flightOrtrainNumber> <productDetail> <equipmentType>339</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> <attributeDetails> <attributeType>EFT</attributeType> <attributeDescription>0855</attributeDescription> </attributeDetails> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>4</ref> </flightProposal> <flightProposal> <ref>0855</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>SS</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>090223</dateOfDeparture> <timeOfDeparture>1120</timeOfDeparture> <dateOfArrival>090223</dateOfArrival> <timeOfArrival>1515</timeOfArrival> </productDateTime> <location> <locationId>ORY</locationId> <terminal>4</terminal> </location> <location> <locationId>PTP</locationId> </location> <companyId> <marketingCarrier>SS</marketingCarrier> <operatingCarrier>SS</operatingCarrier> </companyId> <flightOrtrainNumber>926</flightOrtrainNumber> <productDetail> <equipmentType>339</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> <attributeDetails> <attributeType>EFT</attributeType> <attributeDescription>0855</attributeDescription> </attributeDetails> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>5</ref> </flightProposal> <flightProposal> <ref>0855</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>SS</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>120223</dateOfDeparture> <timeOfDeparture>1120</timeOfDeparture> <dateOfArrival>120223</dateOfArrival> <timeOfArrival>1515</timeOfArrival> </productDateTime> <location> <locationId>ORY</locationId> <terminal>4</terminal> </location> <location> <locationId>PTP</locationId> </location> <companyId> <marketingCarrier>SS</marketingCarrier> <operatingCarrier>SS</operatingCarrier> </companyId> <flightOrtrainNumber>926</flightOrtrainNumber> <productDetail> <equipmentType>339</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> <attributeDetails> <attributeType>EFT</attributeType> <attributeDescription>0855</attributeDescription> </attributeDetails> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>6</ref> </flightProposal> <flightProposal> <ref>0855</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>SS</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>100223</dateOfDeparture> <timeOfDeparture>1120</timeOfDeparture> <dateOfArrival>100223</dateOfArrival> <timeOfArrival>1515</timeOfArrival> </productDateTime> <location> <locationId>ORY</locationId> <terminal>4</terminal> </location> <location> <locationId>PTP</locationId> </location> <companyId> <marketingCarrier>SS</marketingCarrier> <operatingCarrier>SS</operatingCarrier> </companyId> <flightOrtrainNumber>926</flightOrtrainNumber> <productDetail> <equipmentType>339</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> <attributeDetails> <attributeType>EFT</attributeType> <attributeDescription>0855</attributeDescription> </attributeDetails> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>7</ref> </flightProposal> <flightProposal> <ref>1030</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>SS</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>110223</dateOfDeparture> <timeOfDeparture>1445</timeOfDeparture> <dateOfArrival>110223</dateOfArrival> <timeOfArrival>1845</timeOfArrival> </productDateTime> <location> <locationId>ORY</locationId> <terminal>4</terminal> </location> <location> <locationId>FDF</locationId> </location> <companyId> <marketingCarrier>SS</marketingCarrier> <operatingCarrier>SS</operatingCarrier> </companyId> <flightOrtrainNumber>948</flightOrtrainNumber> <productDetail> <equipmentType>330</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> <attributeDetails> <attributeType>EFT</attributeType> <attributeDescription>0900</attributeDescription> </attributeDetails> </flightInformation> </flightDetails> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>110223</dateOfDeparture> <timeOfDeparture>1930</timeOfDeparture> <dateOfArrival>110223</dateOfArrival> <timeOfArrival>2015</timeOfArrival> </productDateTime> <location> <locationId>FDF</locationId> </location> <location> <locationId>PTP</locationId> </location> <companyId> <marketingCarrier>SS</marketingCarrier> <operatingCarrier>3S</operatingCarrier> </companyId> <flightOrtrainNumber>4124</flightOrtrainNumber> <productDetail> <equipmentType>ATR</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> <attributeDetails> <attributeType>EFT</attributeType> <attributeDescription>0045</attributeDescription> </attributeDetails> </flightInformation> </flightDetails> </groupOfFlights> </flightIndex> <flightIndex> <requestedSegmentRef> <segRef>2</segRef> </requestedSegmentRef> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>1</ref> </flightProposal> <flightProposal> <ref>0825</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>SS</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>070323</dateOfDeparture> <timeOfDeparture>1850</timeOfDeparture> <dateOfArrival>080323</dateOfArrival> <timeOfArrival>0815</timeOfArrival> <dateVariation>1</dateVariation> </productDateTime> <location> <locationId>PTP</locationId> </location> <location> <locationId>ORY</locationId> <terminal>4</terminal> </location> <companyId> <marketingCarrier>SS</marketingCarrier> <operatingCarrier>SS</operatingCarrier> </companyId> <flightOrtrainNumber>927</flightOrtrainNumber> <productDetail> <equipmentType>339</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> <attributeDetails> <attributeType>EFT</attributeType> <attributeDescription>0825</attributeDescription> </attributeDetails> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>2</ref> </flightProposal> <flightProposal> <ref>0825</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>SS</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>080323</dateOfDeparture> <timeOfDeparture>1850</timeOfDeparture> <dateOfArrival>090323</dateOfArrival> <timeOfArrival>0815</timeOfArrival> <dateVariation>1</dateVariation> </productDateTime> <location> <locationId>PTP</locationId> </location> <location> <locationId>ORY</locationId> <terminal>4</terminal> </location> <companyId> <marketingCarrier>SS</marketingCarrier> <operatingCarrier>SS</operatingCarrier> </companyId> <flightOrtrainNumber>927</flightOrtrainNumber> <productDetail> <equipmentType>339</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> <attributeDetails> <attributeType>EFT</attributeType> <attributeDescription>0825</attributeDescription> </attributeDetails> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>3</ref> </flightProposal> <flightProposal> <ref>0825</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>SS</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>090323</dateOfDeparture> <timeOfDeparture>1850</timeOfDeparture> <dateOfArrival>100323</dateOfArrival> <timeOfArrival>0815</timeOfArrival> <dateVariation>1</dateVariation> </productDateTime> <location> <locationId>PTP</locationId> </location> <location> <locationId>ORY</locationId> <terminal>4</terminal> </location> <companyId> <marketingCarrier>SS</marketingCarrier> <operatingCarrier>SS</operatingCarrier> </companyId> <flightOrtrainNumber>927</flightOrtrainNumber> <productDetail> <equipmentType>339</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> <attributeDetails> <attributeType>EFT</attributeType> <attributeDescription>0825</attributeDescription> </attributeDetails> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>4</ref> </flightProposal> <flightProposal> <ref>0825</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>SS</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>130323</dateOfDeparture> <timeOfDeparture>1850</timeOfDeparture> <dateOfArrival>140323</dateOfArrival> <timeOfArrival>0815</timeOfArrival> <dateVariation>1</dateVariation> </productDateTime> <location> <locationId>PTP</locationId> </location> <location> <locationId>ORY</locationId> <terminal>4</terminal> </location> <companyId> <marketingCarrier>SS</marketingCarrier> <operatingCarrier>SS</operatingCarrier> </companyId> <flightOrtrainNumber>927</flightOrtrainNumber> <productDetail> <equipmentType>339</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> <attributeDetails> <attributeType>EFT</attributeType> <attributeDescription>0825</attributeDescription> </attributeDetails> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>5</ref> </flightProposal> <flightProposal> <ref>0825</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>SS</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>110323</dateOfDeparture> <timeOfDeparture>1850</timeOfDeparture> <dateOfArrival>120323</dateOfArrival> <timeOfArrival>0815</timeOfArrival> <dateVariation>1</dateVariation> </productDateTime> <location> <locationId>PTP</locationId> </location> <location> <locationId>ORY</locationId> <terminal>4</terminal> </location> <companyId> <marketingCarrier>SS</marketingCarrier> <operatingCarrier>SS</operatingCarrier> </companyId> <flightOrtrainNumber>927</flightOrtrainNumber> <productDetail> <equipmentType>339</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> <attributeDetails> <attributeType>EFT</attributeType> <attributeDescription>0825</attributeDescription> </attributeDetails> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>6</ref> </flightProposal> <flightProposal> <ref>0825</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>SS</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>120323</dateOfDeparture> <timeOfDeparture>1850</timeOfDeparture> <dateOfArrival>130323</dateOfArrival> <timeOfArrival>0815</timeOfArrival> <dateVariation>1</dateVariation> </productDateTime> <location> <locationId>PTP</locationId> </location> <location> <locationId>ORY</locationId> <terminal>4</terminal> </location> <companyId> <marketingCarrier>SS</marketingCarrier> <operatingCarrier>SS</operatingCarrier> </companyId> <flightOrtrainNumber>927</flightOrtrainNumber> <productDetail> <equipmentType>339</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> <attributeDetails> <attributeType>EFT</attributeType> <attributeDescription>0825</attributeDescription> </attributeDetails> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>7</ref> </flightProposal> <flightProposal> <ref>0825</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>SS</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>100323</dateOfDeparture> <timeOfDeparture>1850</timeOfDeparture> <dateOfArrival>110323</dateOfArrival> <timeOfArrival>0815</timeOfArrival> <dateVariation>1</dateVariation> </productDateTime> <location> <locationId>PTP</locationId> </location> <location> <locationId>ORY</locationId> <terminal>4</terminal> </location> <companyId> <marketingCarrier>SS</marketingCarrier> <operatingCarrier>SS</operatingCarrier> </companyId> <flightOrtrainNumber>927</flightOrtrainNumber> <productDetail> <equipmentType>339</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> <attributeDetails> <attributeType>EFT</attributeType> <attributeDescription>0825</attributeDescription> </attributeDetails> </flightInformation> </flightDetails> </groupOfFlights> </flightIndex> <recommendation> <itemNumber> <itemNumberId> <number>1</number> </itemNumberId> </itemNumber> <fareFamilyRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refNumber>1</refNumber> </referencingDetail> </fareFamilyRef> <recPriceInfo> <monetaryDetail> <amount>679.24</amount> </monetaryDetail> <monetaryDetail> <amount>326.24</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>3</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>4</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>3</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>4</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>3</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>3</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>3</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>3</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>3</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>4</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>679.24</totalFareAmount> <totalTaxAmount>326.24</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>SS</company> </codeShareDetails> <codeShareDetails> <company>GP</company> </codeShareDetails> <codeShareDetails> <company>HR</company> </codeShareDetails> <pricingTicketing> <priceType>OBV</priceType> </pricingTicketing> </paxFareDetail> <feeRef> <referencingDetail> <refQualifier>R</refQualifier> <refNumber>1</refNumber> </referencingDetail> </feeRef> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>PEN</textSubjectQualifier> <informationType>70</informationType> </freeTextQualification> <description>TICKETS ARE NON-REFUNDABLE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>LTD</textSubjectQualifier> <informationType>40</informationType> </freeTextQualification> <description>LAST TKT DTE 05NOV22 - SEE ADV PURCHASE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>APM</textSubjectQualifier> </freeTextQualification> <description>CORPORATE NAME NATHALIE</description> </pricingMessage> </fare> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>A</rbd> <cabin>M</cabin> </cabinProduct> <fareProductDetail> <fareBasis>AHCPPRT</fareBasis> <passengerType>ADT</passengerType> <fareType>RB</fareType> </fareProductDetail> <corporateId>061990</corporateId> <breakPoint>Y</breakPoint> </productInformation> <fareFamiliesRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> <fareDetails> <segmentRef> <segRef>2</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>A</rbd> <cabin>M</cabin> </cabinProduct> <fareProductDetail> <fareBasis>ALCPPRT</fareBasis> <passengerType>ADT</passengerType> <fareType>RB</fareType> </fareProductDetail> <corporateId>061990</corporateId> <breakPoint>Y</breakPoint> </productInformation> <ticketInfos> <additionalFareDetails> <ticketDesignator>ETHD</ticketDesignator> </additionalFareDetails> </ticketInfos> <fareFamiliesRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> </paxFareProduct> </recommendation> <recommendation> <itemNumber> <itemNumberId> <number>2</number> </itemNumberId> </itemNumber> <fareFamilyRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refNumber>1</refNumber> </referencingDetail> </fareFamilyRef> <recPriceInfo> <monetaryDetail> <amount>699.24</amount> </monetaryDetail> <monetaryDetail> <amount>326.24</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>5</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>6</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>5</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>6</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>3</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>5</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>3</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>6</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>699.24</totalFareAmount> <totalTaxAmount>326.24</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>SS</company> </codeShareDetails> <codeShareDetails> <company>GP</company> </codeShareDetails> <codeShareDetails> <company>HR</company> </codeShareDetails> <pricingTicketing> <priceType>OBV</priceType> </pricingTicketing> </paxFareDetail> <feeRef> <referencingDetail> <refQualifier>R</refQualifier> <refNumber>1</refNumber> </referencingDetail> </feeRef> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>PEN</textSubjectQualifier> <informationType>70</informationType> </freeTextQualification> <description>TICKETS ARE NON-REFUNDABLE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>LTD</textSubjectQualifier> <informationType>40</informationType> </freeTextQualification> <description>LAST TKT DTE 05NOV22 - SEE ADV PURCHASE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>APM</textSubjectQualifier> </freeTextQualification> <description>CORPORATE NAME NATHALIE</description> </pricingMessage> </fare> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>A</rbd> <cabin>M</cabin> </cabinProduct> <fareProductDetail> <fareBasis>AHCPPRT</fareBasis> <passengerType>ADT</passengerType> <fareType>RB</fareType> </fareProductDetail> <corporateId>061990</corporateId> <breakPoint>Y</breakPoint> <contextDetails> <availabilityCnxType>N</availabilityCnxType> </contextDetails> </productInformation> <fareFamiliesRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> <fareDetails> <segmentRef> <segRef>2</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>A</rbd> <cabin>M</cabin> </cabinProduct> <fareProductDetail> <fareBasis>ALCPPRT</fareBasis> <passengerType>ADT</passengerType> <fareType>RB</fareType> </fareProductDetail> <corporateId>061990</corporateId> <breakPoint>Y</breakPoint> <contextDetails> <availabilityCnxType>N</availabilityCnxType> </contextDetails> </productInformation> <ticketInfos> <additionalFareDetails> <ticketDesignator>ETHD</ticketDesignator> </additionalFareDetails> </ticketInfos> <fareFamiliesRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> </paxFareProduct> </recommendation> <recommendation> <itemNumber> <itemNumberId> <number>3</number> </itemNumberId> </itemNumber> <fareFamilyRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refNumber>1</refNumber> </referencingDetail> </fareFamilyRef> <recPriceInfo> <monetaryDetail> <amount>774.24</amount> </monetaryDetail> <monetaryDetail> <amount>326.24</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>4</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>4</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>4</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>3</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>4</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>4</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>774.24</totalFareAmount> <totalTaxAmount>326.24</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>SS</company> </codeShareDetails> <pricingTicketing> <priceType>OBV</priceType> </pricingTicketing> </paxFareDetail> <feeRef> <referencingDetail> <refQualifier>R</refQualifier> <refNumber>1</refNumber> </referencingDetail> </feeRef> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>PEN</textSubjectQualifier> <informationType>70</informationType> </freeTextQualification> <description>TICKETS ARE NON-REFUNDABLE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>LTD</textSubjectQualifier> <informationType>40</informationType> </freeTextQualification> <description>LAST TKT DTE 10JAN23 - SEE ADV PURCHASE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>APM</textSubjectQualifier> </freeTextQualification> <description>CORPORATE NAME NATHALIE</description> </pricingMessage> </fare> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>Q</rbd> <cabin>M</cabin> </cabinProduct> <fareProductDetail> <fareBasis>QLQSRRT</fareBasis> <passengerType>ADT</passengerType> <fareType>RB</fareType> </fareProductDetail> <corporateId>061990</corporateId> <breakPoint>Y</breakPoint> </productInformation> <ticketInfos> <additionalFareDetails> <ticketDesignator>ETHD</ticketDesignator> </additionalFareDetails> </ticketInfos> <fareFamiliesRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> <fareDetails> <segmentRef> <segRef>2</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>A</rbd> <cabin>M</cabin> </cabinProduct> <fareProductDetail> <fareBasis>ALCPPRT</fareBasis> <passengerType>ADT</passengerType> <fareType>RB</fareType> </fareProductDetail> <corporateId>061990</corporateId> <breakPoint>Y</breakPoint> </productInformation> <ticketInfos> <additionalFareDetails> <ticketDesignator>ETHD</ticketDesignator> </additionalFareDetails> </ticketInfos> <fareFamiliesRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> </paxFareProduct> </recommendation> <recommendation> <itemNumber> <itemNumberId> <number>4</number> </itemNumberId> </itemNumber> <fareFamilyRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refNumber>1</refNumber> </referencingDetail> </fareFamilyRef> <recPriceInfo> <monetaryDetail> <amount>794.24</amount> </monetaryDetail> <monetaryDetail> <amount>326.24</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>4</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>5</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>4</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>6</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>794.24</totalFareAmount> <totalTaxAmount>326.24</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>SS</company> </codeShareDetails> <pricingTicketing> <priceType>OBV</priceType> </pricingTicketing> </paxFareDetail> <feeRef> <referencingDetail> <refQualifier>R</refQualifier> <refNumber>1</refNumber> </referencingDetail> </feeRef> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>PEN</textSubjectQualifier> <informationType>70</informationType> </freeTextQualification> <description>TICKETS ARE NON-REFUNDABLE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>LTD</textSubjectQualifier> <informationType>40</informationType> </freeTextQualification> <description>LAST TKT DTE 10JAN23 - SEE ADV PURCHASE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>APM</textSubjectQualifier> </freeTextQualification> <description>CORPORATE NAME NATHALIE</description> </pricingMessage> </fare> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>Q</rbd> <cabin>M</cabin> </cabinProduct> <fareProductDetail> <fareBasis>QLQSRRT</fareBasis> <passengerType>ADT</passengerType> <fareType>RB</fareType> </fareProductDetail> <corporateId>061990</corporateId> <breakPoint>Y</breakPoint> </productInformation> <ticketInfos> <additionalFareDetails> <ticketDesignator>ETHD</ticketDesignator> </additionalFareDetails> </ticketInfos> <fareFamiliesRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> <fareDetails> <segmentRef> <segRef>2</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>A</rbd> <cabin>M</cabin> </cabinProduct> <fareProductDetail> <fareBasis>ALCPPRT</fareBasis> <passengerType>ADT</passengerType> <fareType>RB</fareType> </fareProductDetail> <corporateId>061990</corporateId> <breakPoint>Y</breakPoint> </productInformation> <ticketInfos> <additionalFareDetails> <ticketDesignator>ETHD</ticketDesignator> </additionalFareDetails> </ticketInfos> <fareFamiliesRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> </paxFareProduct> </recommendation> <recommendation> <itemNumber> <itemNumberId> <number>5</number> </itemNumberId> </itemNumber> <fareFamilyRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refNumber>1</refNumber> </referencingDetail> </fareFamilyRef> <recPriceInfo> <monetaryDetail> <amount>794.24</amount> </monetaryDetail> <monetaryDetail> <amount>326.24</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>7</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>7</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>3</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>7</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>794.24</totalFareAmount> <totalTaxAmount>326.24</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>SS</company> </codeShareDetails> <pricingTicketing> <priceType>OBV</priceType> </pricingTicketing> </paxFareDetail> <feeRef> <referencingDetail> <refQualifier>R</refQualifier> <refNumber>1</refNumber> </referencingDetail> </feeRef> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>PEN</textSubjectQualifier> <informationType>70</informationType> </freeTextQualification> <description>TICKETS ARE NON-REFUNDABLE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>LTD</textSubjectQualifier> <informationType>40</informationType> </freeTextQualification> <description>LAST TKT DTE 05NOV22 - SEE ADV PURCHASE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>APM</textSubjectQualifier> </freeTextQualification> <description>CORPORATE NAME NATHALIE</description> </pricingMessage> </fare> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>A</rbd> <cabin>M</cabin> </cabinProduct> <fareProductDetail> <fareBasis>AHCPPRT</fareBasis> <passengerType>ADT</passengerType> <fareType>RB</fareType> </fareProductDetail> <corporateId>061990</corporateId> <breakPoint>Y</breakPoint> </productInformation> <fareFamiliesRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> <fareDetails> <segmentRef> <segRef>2</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>S</rbd> <cabin>M</cabin> </cabinProduct> <fareProductDetail> <fareBasis>SLQSRRT</fareBasis> <passengerType>ADT</passengerType> <fareType>RB</fareType> </fareProductDetail> <corporateId>061990</corporateId> <breakPoint>Y</breakPoint> </productInformation> <ticketInfos> <additionalFareDetails> <ticketDesignator>ETHD</ticketDesignator> </additionalFareDetails> </ticketInfos> <fareFamiliesRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> </paxFareProduct> </recommendation> <recommendation> <itemNumber> <itemNumberId> <number>6</number> </itemNumberId> </itemNumber> <fareFamilyRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refNumber>1</refNumber> </referencingDetail> </fareFamilyRef> <recPriceInfo> <monetaryDetail> <amount>808.24</amount> </monetaryDetail> <monetaryDetail> <amount>326.24</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>5</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>5</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>5</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>3</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>5</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>4</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>808.24</totalFareAmount> <totalTaxAmount>326.24</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>SS</company> </codeShareDetails> <pricingTicketing> <priceType>OBV</priceType> </pricingTicketing> </paxFareDetail> <feeRef> <referencingDetail> <refQualifier>R</refQualifier> <refNumber>1</refNumber> </referencingDetail> </feeRef> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>PEN</textSubjectQualifier> <informationType>70</informationType> </freeTextQualification> <description>TICKETS ARE NON-REFUNDABLE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>LTD</textSubjectQualifier> <informationType>40</informationType> </freeTextQualification> <description>LAST TKT DTE 13JAN23 - SEE ADV PURCHASE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>APM</textSubjectQualifier> </freeTextQualification> <description>CORPORATE NAME NATHALIE</description> </pricingMessage> </fare> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>S</rbd> <cabin>M</cabin> </cabinProduct> <fareProductDetail> <fareBasis>SHQCPRT</fareBasis> <passengerType>ADT</passengerType> <fareType>RB</fareType> </fareProductDetail> <corporateId>061990</corporateId> <breakPoint>Y</breakPoint> </productInformation> <ticketInfos> <additionalFareDetails> <ticketDesignator>ETHD</ticketDesignator> </additionalFareDetails> </ticketInfos> <fareFamiliesRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> <fareDetails> <segmentRef> <segRef>2</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>A</rbd> <cabin>M</cabin> </cabinProduct> <fareProductDetail> <fareBasis>ALCPPRT</fareBasis> <passengerType>ADT</passengerType> <fareType>RB</fareType> </fareProductDetail> <corporateId>061990</corporateId> <breakPoint>Y</breakPoint> </productInformation> <ticketInfos> <additionalFareDetails> <ticketDesignator>ETHD</ticketDesignator> </additionalFareDetails> </ticketInfos> <fareFamiliesRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> </paxFareProduct> </recommendation> <recommendation> <itemNumber> <itemNumberId> <number>7</number> </itemNumberId> </itemNumber> <fareFamilyRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refNumber>1</refNumber> </referencingDetail> </fareFamilyRef> <recPriceInfo> <monetaryDetail> <amount>819.24</amount> </monetaryDetail> <monetaryDetail> <amount>326.24</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>6</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>6</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>6</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>3</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>6</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>4</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>819.24</totalFareAmount> <totalTaxAmount>326.24</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>SS</company> </codeShareDetails> <pricingTicketing> <priceType>OBV</priceType> </pricingTicketing> </paxFareDetail> <feeRef> <referencingDetail> <refQualifier>R</refQualifier> <refNumber>1</refNumber> </referencingDetail> </feeRef> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>PEN</textSubjectQualifier> <informationType>70</informationType> </freeTextQualification> <description>TICKETS ARE NON-REFUNDABLE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>LTD</textSubjectQualifier> <informationType>40</informationType> </freeTextQualification> <description>LAST TKT DTE 11JAN23 - SEE ADV PURCHASE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>APM</textSubjectQualifier> </freeTextQualification> <description>CORPORATE NAME NATHALIE</description> </pricingMessage> </fare> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>L</rbd> <cabin>M</cabin> </cabinProduct> <fareProductDetail> <fareBasis>LLQSRRT</fareBasis> <passengerType>ADT</passengerType> <fareType>RB</fareType> </fareProductDetail> <corporateId>061990</corporateId> <breakPoint>Y</breakPoint> </productInformation> <ticketInfos> <additionalFareDetails> <ticketDesignator>ETHD</ticketDesignator> </additionalFareDetails> </ticketInfos> <fareFamiliesRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> <fareDetails> <segmentRef> <segRef>2</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>A</rbd> <cabin>M</cabin> </cabinProduct> <fareProductDetail> <fareBasis>ALCPPRT</fareBasis> <passengerType>ADT</passengerType> <fareType>RB</fareType> </fareProductDetail> <corporateId>061990</corporateId> <breakPoint>Y</breakPoint> </productInformation> <ticketInfos> <additionalFareDetails> <ticketDesignator>ETHD</ticketDesignator> </additionalFareDetails> </ticketInfos> <fareFamiliesRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> </paxFareProduct> </recommendation> <recommendation> <itemNumber> <itemNumberId> <number>8</number> </itemNumberId> </itemNumber> <fareFamilyRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refNumber>1</refNumber> </referencingDetail> </fareFamilyRef> <recPriceInfo> <monetaryDetail> <amount>828.24</amount> </monetaryDetail> <monetaryDetail> <amount>326.24</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>5</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>5</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>5</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>6</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>828.24</totalFareAmount> <totalTaxAmount>326.24</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>SS</company> </codeShareDetails> <pricingTicketing> <priceType>OBV</priceType> </pricingTicketing> </paxFareDetail> <feeRef> <referencingDetail> <refQualifier>R</refQualifier> <refNumber>1</refNumber> </referencingDetail> </feeRef> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>PEN</textSubjectQualifier> <informationType>70</informationType> </freeTextQualification> <description>TICKETS ARE NON-REFUNDABLE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>LTD</textSubjectQualifier> <informationType>40</informationType> </freeTextQualification> <description>LAST TKT DTE 13JAN23 - SEE ADV PURCHASE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>APM</textSubjectQualifier> </freeTextQualification> <description>CORPORATE NAME NATHALIE</description> </pricingMessage> </fare> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>S</rbd> <cabin>M</cabin> </cabinProduct> <fareProductDetail> <fareBasis>SHQCPRT</fareBasis> <passengerType>ADT</passengerType> <fareType>RB</fareType> </fareProductDetail> <corporateId>061990</corporateId> <breakPoint>Y</breakPoint> </productInformation> <ticketInfos> <additionalFareDetails> <ticketDesignator>ETHD</ticketDesignator> </additionalFareDetails> </ticketInfos> <fareFamiliesRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> <fareDetails> <segmentRef> <segRef>2</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>A</rbd> <cabin>M</cabin> </cabinProduct> <fareProductDetail> <fareBasis>ALCPPRT</fareBasis> <passengerType>ADT</passengerType> <fareType>RB</fareType> </fareProductDetail> <corporateId>061990</corporateId> <breakPoint>Y</breakPoint> </productInformation> <ticketInfos> <additionalFareDetails> <ticketDesignator>ETHD</ticketDesignator> </additionalFareDetails> </ticketInfos> <fareFamiliesRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> </paxFareProduct> </recommendation> <recommendation> <itemNumber> <itemNumberId> <number>9</number> </itemNumberId> </itemNumber> <fareFamilyRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refNumber>1</refNumber> </referencingDetail> </fareFamilyRef> <recPriceInfo> <monetaryDetail> <amount>839.24</amount> </monetaryDetail> <monetaryDetail> <amount>326.24</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>6</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>5</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>6</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>6</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>839.24</totalFareAmount> <totalTaxAmount>326.24</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>SS</company> </codeShareDetails> <pricingTicketing> <priceType>OBV</priceType> </pricingTicketing> </paxFareDetail> <feeRef> <referencingDetail> <refQualifier>R</refQualifier> <refNumber>1</refNumber> </referencingDetail> </feeRef> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>PEN</textSubjectQualifier> <informationType>70</informationType> </freeTextQualification> <description>TICKETS ARE NON-REFUNDABLE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>LTD</textSubjectQualifier> <informationType>40</informationType> </freeTextQualification> <description>LAST TKT DTE 11JAN23 - SEE ADV PURCHASE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>APM</textSubjectQualifier> </freeTextQualification> <description>CORPORATE NAME NATHALIE</description> </pricingMessage> </fare> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>L</rbd> <cabin>M</cabin> </cabinProduct> <fareProductDetail> <fareBasis>LLQSRRT</fareBasis> <passengerType>ADT</passengerType> <fareType>RB</fareType> </fareProductDetail> <corporateId>061990</corporateId> <breakPoint>Y</breakPoint> </productInformation> <ticketInfos> <additionalFareDetails> <ticketDesignator>ETHD</ticketDesignator> </additionalFareDetails> </ticketInfos> <fareFamiliesRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> <fareDetails> <segmentRef> <segRef>2</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>A</rbd> <cabin>M</cabin> </cabinProduct> <fareProductDetail> <fareBasis>ALCPPRT</fareBasis> <passengerType>ADT</passengerType> <fareType>RB</fareType> </fareProductDetail> <corporateId>061990</corporateId> <breakPoint>Y</breakPoint> </productInformation> <ticketInfos> <additionalFareDetails> <ticketDesignator>ETHD</ticketDesignator> </additionalFareDetails> </ticketInfos> <fareFamiliesRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> </paxFareProduct> </recommendation> <recommendation> <itemNumber> <itemNumberId> <number>10</number> </itemNumberId> </itemNumber> <fareFamilyRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refNumber>1</refNumber> </referencingDetail> </fareFamilyRef> <recPriceInfo> <monetaryDetail> <amount>889.24</amount> </monetaryDetail> <monetaryDetail> <amount>326.24</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>4</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>7</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>889.24</totalFareAmount> <totalTaxAmount>326.24</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>SS</company> </codeShareDetails> <pricingTicketing> <priceType>OBV</priceType> </pricingTicketing> </paxFareDetail> <feeRef> <referencingDetail> <refQualifier>R</refQualifier> <refNumber>1</refNumber> </referencingDetail> </feeRef> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>PEN</textSubjectQualifier> <informationType>76</informationType> </freeTextQualification> <description>SUBJ TO CANCELLATION/CHANGE PENALTY</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>LTD</textSubjectQualifier> <informationType>40</informationType> </freeTextQualification> <description>LAST TKT DTE 10JAN23 - SEE ADV PURCHASE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>APM</textSubjectQualifier> </freeTextQualification> <description>CORPORATE NAME NATHALIE</description> </pricingMessage> </fare> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>Q</rbd> <cabin>M</cabin> </cabinProduct> <fareProductDetail> <fareBasis>QLQSRRT</fareBasis> <passengerType>ADT</passengerType> <fareType>RB</fareType> </fareProductDetail> <corporateId>061990</corporateId> <breakPoint>Y</breakPoint> </productInformation> <ticketInfos> <additionalFareDetails> <ticketDesignator>ETHD</ticketDesignator> </additionalFareDetails> </ticketInfos> <fareFamiliesRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> <fareDetails> <segmentRef> <segRef>2</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>S</rbd> <cabin>M</cabin> </cabinProduct> <fareProductDetail> <fareBasis>SLQSRRT</fareBasis> <passengerType>ADT</passengerType> <fareType>RB</fareType> </fareProductDetail> <corporateId>061990</corporateId> <breakPoint>Y</breakPoint> </productInformation> <ticketInfos> <additionalFareDetails> <ticketDesignator>ETHD</ticketDesignator> </additionalFareDetails> </ticketInfos> <fareFamiliesRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> </paxFareProduct> </recommendation> <recommendation> <itemNumber> <itemNumberId> <number>11</number> </itemNumberId> </itemNumber> <fareFamilyRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refNumber>1</refNumber> </referencingDetail> </fareFamilyRef> <recPriceInfo> <monetaryDetail> <amount>899.24</amount> </monetaryDetail> <monetaryDetail> <amount>362.24</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>7</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>2</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>7</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>2</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>7</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>3</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>2</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>7</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>4</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>2</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>899.24</totalFareAmount> <totalTaxAmount>362.24</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>SS</company> </codeShareDetails> <pricingTicketing> <priceType>OBV</priceType> </pricingTicketing> </paxFareDetail> <feeRef> <referencingDetail> <refQualifier>R</refQualifier> <refNumber>1</refNumber> </referencingDetail> </feeRef> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>PEN</textSubjectQualifier> <informationType>70</informationType> </freeTextQualification> <description>TICKETS ARE NON-REFUNDABLE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>LTD</textSubjectQualifier> <informationType>40</informationType> </freeTextQualification> <description>LAST TKT DTE 12JAN23 - SEE ADV PURCHASE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>APM</textSubjectQualifier> </freeTextQualification> <description>CORPORATE NAME NATHALIE</description> </pricingMessage> </fare> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>F</rbd> <cabin>M</cabin> </cabinProduct> <fareProductDetail> <fareBasis>FHQCPRT</fareBasis> <passengerType>ADT</passengerType> <fareType>RB</fareType> </fareProductDetail> <corporateId>061990</corporateId> <breakPoint>N</breakPoint> </productInformation> <ticketInfos> <additionalFareDetails> <ticketDesignator>ETHD</ticketDesignator> </additionalFareDetails> </ticketInfos> </groupOfFares> <groupOfFares> <productInformation> <cabinProduct> <rbd>F</rbd> <cabin>M</cabin> </cabinProduct> <fareProductDetail> <fareBasis>FHQCPRT</fareBasis> <passengerType>ADT</passengerType> <fareType>RB</fareType> </fareProductDetail> <corporateId>061990</corporateId> <breakPoint>Y</breakPoint> </productInformation> <ticketInfos> <additionalFareDetails> <ticketDesignator>ETHD</ticketDesignator> </additionalFareDetails> </ticketInfos> <fareFamiliesRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> <fareDetails> <segmentRef> <segRef>2</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>A</rbd> <cabin>M</cabin> </cabinProduct> <fareProductDetail> <fareBasis>ALCPPRT</fareBasis> <passengerType>ADT</passengerType> <fareType>RB</fareType> </fareProductDetail> <corporateId>061990</corporateId> <breakPoint>Y</breakPoint> </productInformation> <ticketInfos> <additionalFareDetails> <ticketDesignator>ETHD</ticketDesignator> </additionalFareDetails> </ticketInfos> <fareFamiliesRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> </paxFareProduct> </recommendation> <recommendation> <itemNumber> <itemNumberId> <number>12</number> </itemNumberId> </itemNumber> <fareFamilyRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refNumber>1</refNumber> </referencingDetail> </fareFamilyRef> <recPriceInfo> <monetaryDetail> <amount>919.24</amount> </monetaryDetail> <monetaryDetail> <amount>362.24</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>7</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>5</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>2</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>7</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>6</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>2</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>919.24</totalFareAmount> <totalTaxAmount>362.24</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>SS</company> </codeShareDetails> <pricingTicketing> <priceType>OBV</priceType> </pricingTicketing> </paxFareDetail> <feeRef> <referencingDetail> <refQualifier>R</refQualifier> <refNumber>1</refNumber> </referencingDetail> </feeRef> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>PEN</textSubjectQualifier> <informationType>70</informationType> </freeTextQualification> <description>TICKETS ARE NON-REFUNDABLE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>LTD</textSubjectQualifier> <informationType>40</informationType> </freeTextQualification> <description>LAST TKT DTE 12JAN23 - SEE ADV PURCHASE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>APM</textSubjectQualifier> </freeTextQualification> <description>CORPORATE NAME NATHALIE</description> </pricingMessage> </fare> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>F</rbd> <cabin>M</cabin> </cabinProduct> <fareProductDetail> <fareBasis>FHQCPRT</fareBasis> <passengerType>ADT</passengerType> <fareType>RB</fareType> </fareProductDetail> <corporateId>061990</corporateId> <breakPoint>N</breakPoint> </productInformation> <ticketInfos> <additionalFareDetails> <ticketDesignator>ETHD</ticketDesignator> </additionalFareDetails> </ticketInfos> </groupOfFares> <groupOfFares> <productInformation> <cabinProduct> <rbd>F</rbd> <cabin>M</cabin> </cabinProduct> <fareProductDetail> <fareBasis>FHQCPRT</fareBasis> <passengerType>ADT</passengerType> <fareType>RB</fareType> </fareProductDetail> <corporateId>061990</corporateId> <breakPoint>Y</breakPoint> </productInformation> <ticketInfos> <additionalFareDetails> <ticketDesignator>ETHD</ticketDesignator> </additionalFareDetails> </ticketInfos> <fareFamiliesRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> <fareDetails> <segmentRef> <segRef>2</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>A</rbd> <cabin>M</cabin> </cabinProduct> <fareProductDetail> <fareBasis>ALCPPRT</fareBasis> <passengerType>ADT</passengerType> <fareType>RB</fareType> </fareProductDetail> <corporateId>061990</corporateId> <breakPoint>Y</breakPoint> </productInformation> <ticketInfos> <additionalFareDetails> <ticketDesignator>ETHD</ticketDesignator> </additionalFareDetails> </ticketInfos> <fareFamiliesRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> </paxFareProduct> </recommendation> <recommendation> <itemNumber> <itemNumberId> <number>13</number> </itemNumberId> </itemNumber> <fareFamilyRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refNumber>1</refNumber> </referencingDetail> </fareFamilyRef> <recPriceInfo> <monetaryDetail> <amount>923.24</amount> </monetaryDetail> <monetaryDetail> <amount>326.24</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>5</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>7</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>923.24</totalFareAmount> <totalTaxAmount>326.24</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>SS</company> </codeShareDetails> <pricingTicketing> <priceType>OBV</priceType> </pricingTicketing> </paxFareDetail> <feeRef> <referencingDetail> <refQualifier>R</refQualifier> <refNumber>1</refNumber> </referencingDetail> </feeRef> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>PEN</textSubjectQualifier> <informationType>76</informationType> </freeTextQualification> <description>SUBJ TO CANCELLATION/CHANGE PENALTY</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>LTD</textSubjectQualifier> <informationType>40</informationType> </freeTextQualification> <description>LAST TKT DTE 13JAN23 - SEE ADV PURCHASE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>APM</textSubjectQualifier> </freeTextQualification> <description>CORPORATE NAME NATHALIE</description> </pricingMessage> </fare> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>S</rbd> <cabin>M</cabin> </cabinProduct> <fareProductDetail> <fareBasis>SHQCPRT</fareBasis> <passengerType>ADT</passengerType> <fareType>RB</fareType> </fareProductDetail> <corporateId>061990</corporateId> <breakPoint>Y</breakPoint> </productInformation> <ticketInfos> <additionalFareDetails> <ticketDesignator>ETHD</ticketDesignator> </additionalFareDetails> </ticketInfos> <fareFamiliesRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> <fareDetails> <segmentRef> <segRef>2</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>S</rbd> <cabin>M</cabin> </cabinProduct> <fareProductDetail> <fareBasis>SLQSRRT</fareBasis> <passengerType>ADT</passengerType> <fareType>RB</fareType> </fareProductDetail> <corporateId>061990</corporateId> <breakPoint>Y</breakPoint> </productInformation> <ticketInfos> <additionalFareDetails> <ticketDesignator>ETHD</ticketDesignator> </additionalFareDetails> </ticketInfos> <fareFamiliesRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> </paxFareProduct> </recommendation> <recommendation> <itemNumber> <itemNumberId> <number>14</number> </itemNumberId> </itemNumber> <fareFamilyRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refNumber>1</refNumber> </referencingDetail> </fareFamilyRef> <recPriceInfo> <monetaryDetail> <amount>934.24</amount> </monetaryDetail> <monetaryDetail> <amount>326.24</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>6</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>7</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>934.24</totalFareAmount> <totalTaxAmount>326.24</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>SS</company> </codeShareDetails> <pricingTicketing> <priceType>OBV</priceType> </pricingTicketing> </paxFareDetail> <feeRef> <referencingDetail> <refQualifier>R</refQualifier> <refNumber>1</refNumber> </referencingDetail> </feeRef> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>PEN</textSubjectQualifier> <informationType>76</informationType> </freeTextQualification> <description>SUBJ TO CANCELLATION/CHANGE PENALTY</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>LTD</textSubjectQualifier> <informationType>40</informationType> </freeTextQualification> <description>LAST TKT DTE 11JAN23 - SEE ADV PURCHASE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>APM</textSubjectQualifier> </freeTextQualification> <description>CORPORATE NAME NATHALIE</description> </pricingMessage> </fare> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>L</rbd> <cabin>M</cabin> </cabinProduct> <fareProductDetail> <fareBasis>LLQSRRT</fareBasis> <passengerType>ADT</passengerType> <fareType>RB</fareType> </fareProductDetail> <corporateId>061990</corporateId> <breakPoint>Y</breakPoint> </productInformation> <ticketInfos> <additionalFareDetails> <ticketDesignator>ETHD</ticketDesignator> </additionalFareDetails> </ticketInfos> <fareFamiliesRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> <fareDetails> <segmentRef> <segRef>2</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>S</rbd> <cabin>M</cabin> </cabinProduct> <fareProductDetail> <fareBasis>SLQSRRT</fareBasis> <passengerType>ADT</passengerType> <fareType>RB</fareType> </fareProductDetail> <corporateId>061990</corporateId> <breakPoint>Y</breakPoint> </productInformation> <ticketInfos> <additionalFareDetails> <ticketDesignator>ETHD</ticketDesignator> </additionalFareDetails> </ticketInfos> <fareFamiliesRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> </paxFareProduct> </recommendation> <recommendation> <itemNumber> <itemNumberId> <number>15</number> </itemNumberId> </itemNumber> <fareFamilyRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refNumber>1</refNumber> </referencingDetail> </fareFamilyRef> <recPriceInfo> <monetaryDetail> <amount>1014.24</amount> </monetaryDetail> <monetaryDetail> <amount>362.24</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>7</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>7</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>2</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>1014.24</totalFareAmount> <totalTaxAmount>362.24</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>SS</company> </codeShareDetails> <pricingTicketing> <priceType>OBV</priceType> </pricingTicketing> </paxFareDetail> <feeRef> <referencingDetail> <refQualifier>R</refQualifier> <refNumber>1</refNumber> </referencingDetail> </feeRef> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>PEN</textSubjectQualifier> <informationType>76</informationType> </freeTextQualification> <description>SUBJ TO CANCELLATION/CHANGE PENALTY</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>LTD</textSubjectQualifier> <informationType>40</informationType> </freeTextQualification> <description>LAST TKT DTE 12JAN23 - SEE ADV PURCHASE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>APM</textSubjectQualifier> </freeTextQualification> <description>CORPORATE NAME NATHALIE</description> </pricingMessage> </fare> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>F</rbd> <cabin>M</cabin> </cabinProduct> <fareProductDetail> <fareBasis>FHQCPRT</fareBasis> <passengerType>ADT</passengerType> <fareType>RB</fareType> </fareProductDetail> <corporateId>061990</corporateId> <breakPoint>N</breakPoint> </productInformation> <ticketInfos> <additionalFareDetails> <ticketDesignator>ETHD</ticketDesignator> </additionalFareDetails> </ticketInfos> </groupOfFares> <groupOfFares> <productInformation> <cabinProduct> <rbd>F</rbd> <cabin>M</cabin> </cabinProduct> <fareProductDetail> <fareBasis>FHQCPRT</fareBasis> <passengerType>ADT</passengerType> <fareType>RB</fareType> </fareProductDetail> <corporateId>061990</corporateId> <breakPoint>Y</breakPoint> </productInformation> <ticketInfos> <additionalFareDetails> <ticketDesignator>ETHD</ticketDesignator> </additionalFareDetails> </ticketInfos> <fareFamiliesRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> <fareDetails> <segmentRef> <segRef>2</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>S</rbd> <cabin>M</cabin> </cabinProduct> <fareProductDetail> <fareBasis>SLQSRRT</fareBasis> <passengerType>ADT</passengerType> <fareType>RB</fareType> </fareProductDetail> <corporateId>061990</corporateId> <breakPoint>Y</breakPoint> </productInformation> <ticketInfos> <additionalFareDetails> <ticketDesignator>ETHD</ticketDesignator> </additionalFareDetails> </ticketInfos> <fareFamiliesRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> </paxFareProduct> </recommendation> <serviceFeesGrp> <serviceTypeInfo> <carrierFeeDetails> <type>FBA</type> </carrierFeeDetails> </serviceTypeInfo> <serviceCoverageInfoGrp> <itemNumberInfo> <itemNumber> <number>1</number> </itemNumber> </itemNumberInfo> <serviceCovInfoGrp> <paxRefInfo> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </paxRefInfo> <coveragePerFlightsInfo> <numberOfItemsDetails> <referenceQualifier>RS</referenceQualifier> <refNum>1</refNum> </numberOfItemsDetails> <lastItemsDetails> <refOfLeg>1</refOfLeg> </lastItemsDetails> </coveragePerFlightsInfo> <coveragePerFlightsInfo> <numberOfItemsDetails> <referenceQualifier>RS</referenceQualifier> <refNum>2</refNum> </numberOfItemsDetails> <lastItemsDetails> <refOfLeg>1</refOfLeg> </lastItemsDetails> </coveragePerFlightsInfo> <refInfo> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> </refInfo> </serviceCovInfoGrp> </serviceCoverageInfoGrp> <serviceCoverageInfoGrp> <itemNumberInfo> <itemNumber> <number>2</number> </itemNumber> </itemNumberInfo> <serviceCovInfoGrp> <paxRefInfo> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </paxRefInfo> <coveragePerFlightsInfo> <numberOfItemsDetails> <referenceQualifier>RS</referenceQualifier> <refNum>1</refNum> </numberOfItemsDetails> <lastItemsDetails> <refOfLeg>1</refOfLeg> </lastItemsDetails> <lastItemsDetails> <refOfLeg>2</refOfLeg> </lastItemsDetails> </coveragePerFlightsInfo> <refInfo> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>2</refNumber> </referencingDetail> </refInfo> </serviceCovInfoGrp> <serviceCovInfoGrp> <paxRefInfo> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </paxRefInfo> <coveragePerFlightsInfo> <numberOfItemsDetails> <referenceQualifier>RS</referenceQualifier> <refNum>2</refNum> </numberOfItemsDetails> <lastItemsDetails> <refOfLeg>1</refOfLeg> </lastItemsDetails> </coveragePerFlightsInfo> <refInfo> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> </refInfo> </serviceCovInfoGrp> </serviceCoverageInfoGrp> <globalMessageMarker></globalMessageMarker> <freeBagAllowanceGrp> <freeBagAllownceInfo> <baggageDetails> <freeAllowance>2</freeAllowance> <quantityCode>N</quantityCode> </baggageDetails> </freeBagAllownceInfo> <itemNumberInfo> <itemNumberDetails> <number>1</number> </itemNumberDetails> </itemNumberInfo> </freeBagAllowanceGrp> <freeBagAllowanceGrp> <freeBagAllownceInfo> <baggageDetails> <freeAllowance>1</freeAllowance> <quantityCode>N</quantityCode> </baggageDetails> </freeBagAllownceInfo> <itemNumberInfo> <itemNumberDetails> <number>2</number> </itemNumberDetails> </itemNumberInfo> </freeBagAllowanceGrp> </serviceFeesGrp> </Fare\_MasterPricerCalendarReply>

## 5.44.3 Possible Errors

See "Error Messages" section.

* * *

## 5.45 Operation: 09.1 Distribution option - Maximum number of recommendation

In Master Pricer Extended Calendar, the user can specify the maximum number of recommendations to be returned.

This option is not activated by default. It requires activation on Amadeus' side.

## 5.45.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_MasterPricerCalendar xmlns="http://xml.amadeus.com/FMPCAQ\_20\_2\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>500</numberOfUnits> <typeOfUnit>RC</typeOfUnit> </unitNumberDetail> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>PAR</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>MIA</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>201208</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>3</dayInterval> </rangeOfDate> </timeDetails> </itinerary> </Fare\_MasterPricerCalendar>

## 5.45.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.45.3 Possible Errors

See "Error Messages" section.

* * *

## 5.46 Operation: 09.2 Distribution option - Extended Calendar - More Recommendations per date combination

The user has the ability to request the number of recommendations to be returned per date combination in calendar output.

By default, calendar requests return the cheapest recommendation per combination of outbound and inbound dates. With the More Recommendations per date Combination (MRC) distribution, user can request to get the 10 cheapest available recommendations per date combination.

This option is not activated by default, it requires activation on Amadeus' side.

## 5.46.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_MasterPricerCalendar xmlns="http://xml.amadeus.com/FMPCAQ\_20\_2\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>10</numberOfUnits> <typeOfUnit>MRC</typeOfUnit> </unitNumberDetail> <unitNumberDetail> <numberOfUnits>500</numberOfUnits> <typeOfUnit>RC</typeOfUnit> </unitNumberDetail> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>PAR</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>MIA</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>201208</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>3</dayInterval> </rangeOfDate> </timeDetails> </itinerary> </Fare\_MasterPricerCalendar>

## 5.46.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.46.3 Possible Errors

See "Error Messages" section.

* * *

## 5.47 Operation: A.1 Output Option - Free Baggage Allowance

This option of Master Pricer provides the information about the free baggage allowed for each recommendation.

This option is triggered by a setting at OID level or by input option (FBA) with 2 values:

-   1: allows to return FBA
-   0: no FBA is returned

The input option overrides the OID setting.

In the example below, the Free Baggage Allowance is requested by input option.

In the reply, we have recommendations with different baggage allowances:

-   Requested segment 1: BCN-MAD
-   Requested segment 2: MAD-VLC

The Free Baggage Allowance is returned with the following information:

Free baggage allowed

Applicability

Recommendation 1, 2, 3 with same FBA for the whole itinerary

BCN-MAD 23 Kg

MAD-SVQ-VLC 23 Kg

23 kg on Requested segment 1 – Leg 1

23 kg on Requested segment 2 –

Leg 1 and 2

Recommendation 4, 5, 6, 7, 8, 9 with different FBA

BCN-MAD 1PC

MAD- VLC 2 PC

1P on Requested segment 1 – Leg 1

2P on Requested segment 2 – Leg 1

Baggage allowance is detailed at 3 levels:

-   Free Baggage Allowance information (number of pieces or number of kilos)
-   Baggage allowance coverage (Passenger type reference, flight coverage, baggage allowance reference)
-   Baggage allowance coverage reference at recommendation level

Free Baggage Allowance is detailed in freeBagAllowanceGrp:

FBA #1  

23 Kilos

FBA #2

1 Piece

FBA #3

2 Pieces

Baggage coverage is detailed in serviceCoverageInfoGrp:

Passenger type reference

Flight coverage

Reference to FBA

Baggage coverage #1

1

Requested segment 1 – Leg 1  
Requested segment 2 – Leg 1 and 2

FBA #1

Baggage coverage #2

1

Requested segment 1 – Leg 1  
Requested segment 2 – Leg 1

FBA #2  
FBA #3

Recommendation details:

Reference to Baggage coverage

Recommendations 1, 2, 3  

Baggage coverage #1

Recommendations 4, 5, 6, 7, 8, 9

Baggage coverage #2

\- The recommendation selection is not impacted  by this option (recommendations with Free Baggage included are not favoured).

\- The following Master Pricer Travel Board will return recommendations with and without Free Baggage indifferently from the allowance of the Calendar recommendation.

## 5.47.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_MasterPricerCalendar xmlns="http://xml.amadeus.com/FMPCAQ\_20\_2\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fareOptions> <pricingTickInfo></pricingTickInfo> <feeIdDescription> <feeId> <feeType>FBA</feeType> <feeIdNumber>1</feeIdNumber> </feeId> </feeIdDescription> </fareOptions> <travelFlightInfo> <companyIdentity> <carrierQualifier>M</carrierQualifier> <carrierId>6X</carrierId> </companyIdentity> </travelFlightInfo> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>BCN</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>MAD</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>101114</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>1</dayInterval> </rangeOfDate> </timeDetails> </itinerary> <itinerary> <requestedSegmentRef> <segRef>2</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>MAD</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>VLC</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>171114</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>1</dayInterval> </rangeOfDate> </timeDetails> </itinerary> </Fare\_MasterPricerCalendar>

## 5.47.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_MasterPricerCalendarReply xmlns="http://xml.amadeus.com/FMPCAR\_20\_2\_1A"> <replyStatus> <status> <advisoryTypeInfo>FQX</advisoryTypeInfo> </status> </replyStatus> <conversionRate> <conversionRateDetail> <currency>EUR</currency> </conversionRateDetail> </conversionRate> <flightIndex> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>1</ref> </flightProposal> <flightProposal> <ref>0120</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>6X</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>091114</dateOfDeparture> <timeOfDeparture>1610</timeOfDeparture> <dateOfArrival>091114</dateOfArrival> <timeOfArrival>1730</timeOfArrival> </productDateTime> <location> <locationId>BCN</locationId> <terminal>1</terminal> </location> <location> <locationId>MAD</locationId> <terminal>4</terminal> </location> <companyId> <marketingCarrier>6X</marketingCarrier> <operatingCarrier>6X</operatingCarrier> </companyId> <flightOrtrainNumber>2705</flightOrtrainNumber> <productDetail> <equipmentType>320</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>2</ref> </flightProposal> <flightProposal> <ref>0120</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>6X</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>101114</dateOfDeparture> <timeOfDeparture>1130</timeOfDeparture> <dateOfArrival>101114</dateOfArrival> <timeOfArrival>1250</timeOfArrival> </productDateTime> <location> <locationId>BCN</locationId> <terminal>1</terminal> </location> <location> <locationId>MAD</locationId> <terminal>4</terminal> </location> <companyId> <marketingCarrier>6X</marketingCarrier> <operatingCarrier>6X</operatingCarrier> </companyId> <flightOrtrainNumber>2737</flightOrtrainNumber> <productDetail> <equipmentType>321</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>3</ref> </flightProposal> <flightProposal> <ref>0120</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>6X</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>111114</dateOfDeparture> <timeOfDeparture>0650</timeOfDeparture> <dateOfArrival>111114</dateOfArrival> <timeOfArrival>0810</timeOfArrival> </productDateTime> <location> <locationId>BCN</locationId> <terminal>1</terminal> </location> <location> <locationId>MAD</locationId> <terminal>4</terminal> </location> <companyId> <marketingCarrier>6X</marketingCarrier> <operatingCarrier>6X</operatingCarrier> </companyId> <flightOrtrainNumber>2739</flightOrtrainNumber> <productDetail> <equipmentType>320</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> </flightIndex> <flightIndex> <requestedSegmentRef> <segRef>2</segRef> </requestedSegmentRef> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>1</ref> </flightProposal> <flightProposal> <ref>1050</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>6X</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>181114</dateOfDeparture> <timeOfDeparture>2200</timeOfDeparture> <dateOfArrival>181114</dateOfArrival> <timeOfArrival>2305</timeOfArrival> </productDateTime> <location> <locationId>MAD</locationId> <terminal>4</terminal> </location> <location> <locationId>SVQ</locationId> </location> <companyId> <marketingCarrier>6X</marketingCarrier> <operatingCarrier>7X</operatingCarrier> </companyId> <flightOrtrainNumber>3948</flightOrtrainNumber> <productDetail> <equipmentType>32S</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>191114</dateOfDeparture> <timeOfDeparture>0745</timeOfDeparture> <dateOfArrival>191114</dateOfArrival> <timeOfArrival>0850</timeOfArrival> </productDateTime> <location> <locationId>SVQ</locationId> </location> <location> <locationId>VLC</locationId> </location> <companyId> <marketingCarrier>6X</marketingCarrier> <operatingCarrier>6X</operatingCarrier> </companyId> <flightOrtrainNumber>8841</flightOrtrainNumber> <productDetail> <equipmentType>CR9</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>2</ref> </flightProposal> <flightProposal> <ref>0055</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>6X</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>161114</dateOfDeparture> <timeOfDeparture>2015</timeOfDeparture> <dateOfArrival>161114</dateOfArrival> <timeOfArrival>2110</timeOfArrival> </productDateTime> <location> <locationId>MAD</locationId> <terminal>4</terminal> </location> <location> <locationId>VLC</locationId> </location> <companyId> <marketingCarrier>6X</marketingCarrier> <operatingCarrier>6X</operatingCarrier> </companyId> <flightOrtrainNumber>8996</flightOrtrainNumber> <productDetail> <equipmentType>CRK</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>3</ref> </flightProposal> <flightProposal> <ref>0055</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>6X</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>171114</dateOfDeparture> <timeOfDeparture>2245</timeOfDeparture> <dateOfArrival>171114</dateOfArrival> <timeOfArrival>2340</timeOfArrival> </productDateTime> <location> <locationId>MAD</locationId> <terminal>4</terminal> </location> <location> <locationId>VLC</locationId> </location> <companyId> <marketingCarrier>6X</marketingCarrier> <operatingCarrier>6X</operatingCarrier> </companyId> <flightOrtrainNumber>8982</flightOrtrainNumber> <productDetail> <equipmentType>CRK</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> </flightIndex> <recommendation> <itemNumber> <itemNumberId> <number>1</number> </itemNumberId> </itemNumber> <recPriceInfo> <monetaryDetail> <amount>206.04</amount> </monetaryDetail> <monetaryDetail> <amount>53.04</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>3</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>206.04</totalFareAmount> <totalTaxAmount>53.04</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>6X</company> </codeShareDetails> <pricingTicketing> <priceType>OBV</priceType> </pricingTicketing> </paxFareDetail> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>PEN</textSubjectQualifier> <informationType>70</informationType> </freeTextQualification> <description>TICKETS ARE NON-REFUNDABLE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>LTD</textSubjectQualifier> <informationType>45</informationType> </freeTextQualification> <description>LAST TKT DTE</description> <description>15OCT14</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>SUR</textSubjectQualifier> <informationType>79</informationType> </freeTextQualification> <description>FARE VALID FOR E TICKET ONLY</description> </pricingMessage> </fare> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>N</rbd> <cabin>M</cabin> </cabinProduct> <fareProductDetail> <fareBasis>NDSK</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> <fareType>ET</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> <fareDetails> <segmentRef> <segRef>2</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>O</rbd> <cabin>M</cabin> </cabinProduct> <fareProductDetail> <fareBasis>ODS1OW</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> <fareType>ET</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> </groupOfFares> <groupOfFares> <productInformation> <cabinProduct> <rbd>P</rbd> <cabin>M</cabin> </cabinProduct> <fareProductDetail> <fareBasis>PD21AP</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> <fareType>ET</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> </paxFareProduct> </recommendation> <recommendation> <itemNumber> <itemNumberId> <number>2</number> </itemNumberId> </itemNumber> <recPriceInfo> <monetaryDetail> <amount>207.51</amount> </monetaryDetail> <monetaryDetail> <amount>44.51</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>2</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>3</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>2</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>2</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>3</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>2</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>3</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>2</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>3</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>3</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>2</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>207.51</totalFareAmount> <totalTaxAmount>44.51</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>6X</company> </codeShareDetails> <pricingTicketing> <priceType>OBV</priceType> </pricingTicketing> </paxFareDetail> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>PEN</textSubjectQualifier> <informationType>70</informationType> </freeTextQualification> <description>TICKETS ARE NON-REFUNDABLE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>LTD</textSubjectQualifier> <informationType>45</informationType> </freeTextQualification> <description>LAST TKT DTE</description> <description>15OCT14</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>SUR</textSubjectQualifier> <informationType>79</informationType> </freeTextQualification> <description>FARE VALID FOR E TICKET ONLY</description> </pricingMessage> </fare> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>N</rbd> <cabin>M</cabin> </cabinProduct> <fareProductDetail> <fareBasis>NDSK</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> <fareType>ET</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> <fareDetails> <segmentRef> <segRef>2</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>N</rbd> <cabin>M</cabin> </cabinProduct> <fareProductDetail> <fareBasis>ND2OWY</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> <fareType>ET</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> </paxFareProduct> </recommendation> <serviceFeesGrp> <serviceTypeInfo> <carrierFeeDetails> <type>FBA</type> </carrierFeeDetails> </serviceTypeInfo> <serviceCoverageInfoGrp> <itemNumberInfo> <itemNumber> <number>1</number> </itemNumber> </itemNumberInfo> <serviceCovInfoGrp> <paxRefInfo> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </paxRefInfo> <coveragePerFlightsInfo> <numberOfItemsDetails> <referenceQualifier>RS</referenceQualifier> <refNum>1</refNum> </numberOfItemsDetails> <lastItemsDetails> <refOfLeg>1</refOfLeg> </lastItemsDetails> </coveragePerFlightsInfo> <coveragePerFlightsInfo> <numberOfItemsDetails> <referenceQualifier>RS</referenceQualifier> <refNum>2</refNum> </numberOfItemsDetails> <lastItemsDetails> <refOfLeg>1</refOfLeg> </lastItemsDetails> <lastItemsDetails> <refOfLeg>2</refOfLeg> </lastItemsDetails> </coveragePerFlightsInfo> <refInfo> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> </refInfo> </serviceCovInfoGrp> </serviceCoverageInfoGrp> <serviceCoverageInfoGrp> <itemNumberInfo> <itemNumber> <number>2</number> </itemNumber> </itemNumberInfo> <serviceCovInfoGrp> <paxRefInfo> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </paxRefInfo> <coveragePerFlightsInfo> <numberOfItemsDetails> <referenceQualifier>RS</referenceQualifier> <refNum>1</refNum> </numberOfItemsDetails> <lastItemsDetails> <refOfLeg>1</refOfLeg> </lastItemsDetails> </coveragePerFlightsInfo> <refInfo> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>2</refNumber> </referencingDetail> </refInfo> </serviceCovInfoGrp> <serviceCovInfoGrp> <paxRefInfo> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </paxRefInfo> <coveragePerFlightsInfo> <numberOfItemsDetails> <referenceQualifier>RS</referenceQualifier> <refNum>2</refNum> </numberOfItemsDetails> <lastItemsDetails> <refOfLeg>1</refOfLeg> </lastItemsDetails> </coveragePerFlightsInfo> <refInfo> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>3</refNumber> </referencingDetail> </refInfo> </serviceCovInfoGrp> </serviceCoverageInfoGrp> <globalMessageMarker></globalMessageMarker> <freeBagAllowanceGrp> <freeBagAllownceInfo> <baggageDetails> <freeAllowance>23</freeAllowance> <quantityCode>W</quantityCode> <unitQualifier>K</unitQualifier> </baggageDetails> </freeBagAllownceInfo> <itemNumberInfo> <itemNumberDetails> <number>1</number> </itemNumberDetails> </itemNumberInfo> </freeBagAllowanceGrp> <freeBagAllowanceGrp> <freeBagAllownceInfo> <baggageDetails> <freeAllowance>1</freeAllowance> <quantityCode>N</quantityCode> </baggageDetails> </freeBagAllownceInfo> <itemNumberInfo> <itemNumberDetails> <number>2</number> </itemNumberDetails> </itemNumberInfo> </freeBagAllowanceGrp> <freeBagAllowanceGrp> <freeBagAllownceInfo> <baggageDetails> <freeAllowance>2</freeAllowance> <quantityCode>N</quantityCode> </baggageDetails> </freeBagAllownceInfo> <itemNumberInfo> <itemNumberDetails> <number>3</number> </itemNumberDetails> </itemNumberInfo> </freeBagAllowanceGrp> </serviceFeesGrp> </Fare\_MasterPricerCalendarReply>

## 5.47.3 Possible Errors

See "Error Messages" section.

* * *

## 5.48 Operation: A.2 Output Option - Fare families name and description

The user has the ability to request fare family information in output. This is triggered by settings at Office ID level and by an input option (FFI) with 3 values 1, 2 or 3.

-   When option 1 is requested, only Fare Family name at Fare component level are returned.
-   When option 2 is requested, Fare Family name at Fare component level and resulting Fare Family name at requested segment level are returned.
-   When option 3 is requested, Fare Family name at Fare component level and resulting Fare Family name at requested segment level with the list of services are returned.

If a fare component matches one or several fare families, the most restrictive fare family is returned.  
If the fare component doesn’t match any fare family, no fare family is returned for this fare component.

The resulting fare family is returned only if the requested segment is fully covered by fares with the same controlling carrier and that match at least one fare family. In case several fare families involved in the requested segment, the most restrictive one (highest ranking / lowest tier) is returned except in case several FF have the same ranking. In that case, the resulting fare family is the one of the longest fare component (number of miles). 

By default, Master Pricer will return 7 services attached to the resulting fare family, and will give priority on: Bag - Seat - Meal - Travel Services. Number of services can vary from 1 to 20 , this is triggered by settings at Office ID level.

In this example, the user requests Fare Family name at Fare component level and resulting Fare Family name and description at requested segment level.

The reply illustrates 1 recommendation with 2 requested segments and 3 fare components. First requested segment is fully covered by 1 fare family. Second requested segment is covered by 2 fare families.

  
Fare family name at fare component level (fareFamiliesRef)

Requested segment

Fare component

Fare Family reference

Fare Family name

Fare Family carrier

NCE-NYC

NCE-NYC

1

FFAM1

6X

NYC-LON-NCE

NYC-LON

2

FFAM2

6X

LON-NCE

3

FFAM3

6X

Resulting Fare family name at requested segment level (fareFamilyRef)

Requested segment

Fare Family reference

Fare Family name

Fare Family carrier

NCE-NYC

1

FFAM1

6X

NYC-LON-NCE

2

FFAM2

6X

Fare family description (familyInformation) and list of services (serviceFeesGrp)

Fare Family reference

1

2

Fare family Name

FFAM1

FFAM2

Fare family carrier

6X

6X

Short description

FARE FAMILY 1

FARE FAMILY 2

List of services

Service reference

Sub code

Group

Classification

Commercial name

1

0AT

ML - Meal/Beverage

F - Flight related

SNACK

Included

Included

Service reference

Sub code

Group

Classification

Commercial name

2

SS1

SA - Seat

F - Flight related

SEAT SELECTION

Included

At charge

Service reference

Sub code

Group

Classification

Commercial name

3

0C3

BG - Baggage

F - Flight related

UPTO50LB 23KG BAGGAGE

Included

Not offered

Service reference

Sub code

Group

Classification

Commercial name

4

NRF

TS - Travel Services

F - Flight related

NOT REFUNDABLE

Included

## 5.48.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_MasterPricerCalendar xmlns="http://xml.amadeus.com/FMPCAQ\_20\_2\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fareOptions> <pricingTickInfo> <pricingTicketing> <priceType>RP</priceType> <priceType>RU</priceType> </pricingTicketing> </pricingTickInfo> <feeIdDescription> <feeId> <feeType>FFI</feeType> <feeIdNumber>3</feeIdNumber> </feeId> </feeIdDescription> </fareOptions> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>NCE</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>NYC</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>100814</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>1</dayInterval> </rangeOfDate> </timeDetails> </itinerary> <itinerary> <requestedSegmentRef> <segRef>2</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>NYC</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>NCE</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>150814</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>1</dayInterval> </rangeOfDate> </timeDetails> </itinerary> </Fare\_MasterPricerCalendar>

## 5.48.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_MasterPricerCalendarReply xmlns="http://xml.amadeus.com/FMPCAR\_20\_2\_1A"> <replyStatus> <status> <advisoryTypeInfo>FQX</advisoryTypeInfo> </status> </replyStatus> <conversionRate> <conversionRateDetail> <currency>EUR</currency> </conversionRateDetail> </conversionRate> <familyInformation> <refNumber>1</refNumber> <fareFamilyname>FFAM1</fareFamilyname> <description>FARE FAMILY 1</description> <carrier>6X</carrier> <services> <reference>1</reference> <status>INC</status> </services> <services> <reference>2</reference> <status>INC</status> </services> <services> <reference>3</reference> <status>INC</status> </services> <services> <reference>4</reference> <status>INC</status> </services> </familyInformation> <familyInformation> <refNumber>2</refNumber> <fareFamilyname>FFAM2</fareFamilyname> <description>FARE FAMILY 2</description> <carrier>6X</carrier> <services> <reference>1</reference> <status>INC</status> </services> <services> <reference>2</reference> <status>CHA</status> </services> <services> <reference>3</reference> <status>NOF</status> </services> </familyInformation> <familyInformation> <refNumber>3</refNumber> <fareFamilyname>FFAM3</fareFamilyname> <carrier>6X</carrier> </familyInformation> <flightIndex> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>1</ref> </flightProposal> <flightProposal> <ref>0905</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>6X</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>090814</dateOfDeparture> <timeOfDeparture>1325</timeOfDeparture> <dateOfArrival>090814</dateOfArrival> <timeOfArrival>1630</timeOfArrival> </productDateTime> <location> <locationId>NCE</locationId> <terminal>2</terminal> </location> <location> <locationId>JFK</locationId> <terminal>4</terminal> </location> <companyId> <marketingCarrier>6X</marketingCarrier> <operatingCarrier>6X</operatingCarrier> </companyId> <flightOrtrainNumber>206</flightOrtrainNumber> <productDetail> <equipmentType>764</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>2</ref> </flightProposal> <flightProposal> <ref>0905</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>6X</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>100814</dateOfDeparture> <timeOfDeparture>1325</timeOfDeparture> <dateOfArrival>100814</dateOfArrival> <timeOfArrival>1630</timeOfArrival> </productDateTime> <location> <locationId>NCE</locationId> <terminal>2</terminal> </location> <location> <locationId>JFK</locationId> <terminal>4</terminal> </location> <companyId> <marketingCarrier>6X</marketingCarrier> <operatingCarrier>6X</operatingCarrier> </companyId> <flightOrtrainNumber>206</flightOrtrainNumber> <productDetail> <equipmentType>764</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>3</ref> </flightProposal> <flightProposal> <ref>0905</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>6X</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>110814</dateOfDeparture> <timeOfDeparture>1325</timeOfDeparture> <dateOfArrival>110814</dateOfArrival> <timeOfArrival>1630</timeOfArrival> </productDateTime> <location> <locationId>NCE</locationId> <terminal>2</terminal> </location> <location> <locationId>JFK</locationId> <terminal>4</terminal> </location> <companyId> <marketingCarrier>6X</marketingCarrier> <operatingCarrier>6X</operatingCarrier> </companyId> <flightOrtrainNumber>206</flightOrtrainNumber> <productDetail> <equipmentType>764</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> </flightIndex> <flightIndex> <requestedSegmentRef> <segRef>2</segRef> </requestedSegmentRef> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>1</ref> </flightProposal> <flightProposal> <ref>1004</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>6X</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>140814</dateOfDeparture> <timeOfDeparture>1901</timeOfDeparture> <dateOfArrival>150814</dateOfArrival> <timeOfArrival>0835</timeOfArrival> <dateVariation>1</dateVariation> </productDateTime> <location> <locationId>JFK</locationId> <terminal>4</terminal> </location> <location> <locationId>CDG</locationId> <terminal>2E</terminal> </location> <companyId> <marketingCarrier>6X</marketingCarrier> <operatingCarrier>6X</operatingCarrier> </companyId> <flightOrtrainNumber>400</flightOrtrainNumber> <productDetail> <equipmentType>332</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>150814</dateOfDeparture> <timeOfDeparture>0935</timeOfDeparture> <dateOfArrival>150814</dateOfArrival> <timeOfArrival>1105</timeOfArrival> </productDateTime> <location> <locationId>CDG</locationId> <terminal>2F</terminal> </location> <location> <locationId>NCE</locationId> <terminal>2</terminal> </location> <companyId> <marketingCarrier>6X</marketingCarrier> <operatingCarrier>7X</operatingCarrier> </companyId> <flightOrtrainNumber>8398</flightOrtrainNumber> <productDetail> <equipmentType>320</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>2</ref> </flightProposal> <flightProposal> <ref>1004</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>6X</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>150814</dateOfDeparture> <timeOfDeparture>1901</timeOfDeparture> <dateOfArrival>160814</dateOfArrival> <timeOfArrival>0835</timeOfArrival> <dateVariation>1</dateVariation> </productDateTime> <location> <locationId>JFK</locationId> <terminal>4</terminal> </location> <location> <locationId>CDG</locationId> <terminal>2E</terminal> </location> <companyId> <marketingCarrier>6X</marketingCarrier> <operatingCarrier>6X</operatingCarrier> </companyId> <flightOrtrainNumber>400</flightOrtrainNumber> <productDetail> <equipmentType>332</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>160814</dateOfDeparture> <timeOfDeparture>0935</timeOfDeparture> <dateOfArrival>160814</dateOfArrival> <timeOfArrival>1105</timeOfArrival> </productDateTime> <location> <locationId>CDG</locationId> <terminal>2F</terminal> </location> <location> <locationId>NCE</locationId> <terminal>2</terminal> </location> <companyId> <marketingCarrier>6X</marketingCarrier> <operatingCarrier>7X</operatingCarrier> </companyId> <flightOrtrainNumber>8398</flightOrtrainNumber> <productDetail> <equipmentType>320</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>3</ref> </flightProposal> <flightProposal> <ref>1004</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>6X</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>160814</dateOfDeparture> <timeOfDeparture>1901</timeOfDeparture> <dateOfArrival>170814</dateOfArrival> <timeOfArrival>0835</timeOfArrival> <dateVariation>1</dateVariation> </productDateTime> <location> <locationId>JFK</locationId> <terminal>4</terminal> </location> <location> <locationId>CDG</locationId> <terminal>2E</terminal> </location> <companyId> <marketingCarrier>6X</marketingCarrier> <operatingCarrier>6X</operatingCarrier> </companyId> <flightOrtrainNumber>400</flightOrtrainNumber> <productDetail> <equipmentType>332</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>170814</dateOfDeparture> <timeOfDeparture>0935</timeOfDeparture> <dateOfArrival>170814</dateOfArrival> <timeOfArrival>1105</timeOfArrival> </productDateTime> <location> <locationId>CDG</locationId> <terminal>2F</terminal> </location> <location> <locationId>NCE</locationId> <terminal>2</terminal> </location> <companyId> <marketingCarrier>6X</marketingCarrier> <operatingCarrier>7X</operatingCarrier> </companyId> <flightOrtrainNumber>8398</flightOrtrainNumber> <productDetail> <equipmentType>319</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> </flightIndex> <recommendation> <itemNumber> <itemNumberId> <number>1</number> </itemNumberId> </itemNumber> <fareFamilyRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refNumber>2</refNumber> </referencingDetail> </fareFamilyRef> <recPriceInfo> <monetaryDetail> <amount>1236.44</amount> </monetaryDetail> <monetaryDetail> <amount>392.44</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>3</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>3</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>3</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>3</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>3</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>3</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>1236.44</totalFareAmount> <totalTaxAmount>392.44</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>6X</company> </codeShareDetails> <codeShareDetails> <company>7X</company> </codeShareDetails> <pricingTicketing> <priceType>OBV</priceType> </pricingTicketing> </paxFareDetail> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>PEN</textSubjectQualifier> <informationType>70</informationType> </freeTextQualification> <description>TICKETS ARE NON-REFUNDABLE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>LTD</textSubjectQualifier> <informationType>40</informationType> </freeTextQualification> <description>LAST TKT DTE</description> <description>26JUL14</description> <description> - SEE ADV PURCHASE</description> </pricingMessage> </fare> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>L</rbd> <cabin>M</cabin> </cabinProduct> <fareProductDetail> <fareBasis>FB1</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> <fareFamiliesRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> <fareDetails> <segmentRef> <segRef>2</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>T</rbd> <cabin>M</cabin> </cabinProduct> <fareProductDetail> <fareBasis>FB2</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> <fareFamiliesRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>2</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> <groupOfFares> <productInformation> <cabinProduct> <rbd>T</rbd> <cabin>M</cabin> </cabinProduct> <fareProductDetail> <fareBasis>FB3</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> <fareFamiliesRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>3</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> </paxFareProduct> </recommendation> <serviceFeesGrp> <serviceTypeInfo> <carrierFeeDetails> <type>OC</type> </carrierFeeDetails> </serviceTypeInfo> <globalMessageMarker></globalMessageMarker> <serviceDetailsGrp> <serviceOptionInfo> <dataTypeInformation> <subType>0AT</subType> </dataTypeInformation> </serviceOptionInfo> <feeDescriptionGrp> <itemNumberInfo> <itemNumberDetails> <number>1</number> <type>SD</type> </itemNumberDetails> </itemNumberInfo> <serviceDescriptionInfo> <serviceRequirementsInfo> <serviceClassification>F</serviceClassification> <serviceGroup>ML</serviceGroup> </serviceRequirementsInfo> </serviceDescriptionInfo> <commercialName> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>SNACK</freeText> </commercialName> </feeDescriptionGrp> </serviceDetailsGrp> <serviceDetailsGrp> <serviceOptionInfo> <dataTypeInformation> <subType>SS1</subType> </dataTypeInformation> </serviceOptionInfo> <feeDescriptionGrp> <itemNumberInfo> <itemNumberDetails> <number>2</number> <type>SD</type> </itemNumberDetails> </itemNumberInfo> <serviceDescriptionInfo> <serviceRequirementsInfo> <serviceClassification>F</serviceClassification> <serviceGroup>SA</serviceGroup> </serviceRequirementsInfo> </serviceDescriptionInfo> <commercialName> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>SEAT SELECTION</freeText> </commercialName> </feeDescriptionGrp> </serviceDetailsGrp> <serviceDetailsGrp> <serviceOptionInfo> <dataTypeInformation> <subType>0C3</subType> </dataTypeInformation> </serviceOptionInfo> <feeDescriptionGrp> <itemNumberInfo> <itemNumberDetails> <number>3</number> <type>SD</type> </itemNumberDetails> </itemNumberInfo> <serviceDescriptionInfo> <serviceRequirementsInfo> <serviceClassification>F</serviceClassification> <serviceGroup>BG</serviceGroup> </serviceRequirementsInfo> </serviceDescriptionInfo> <commercialName> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>UPTO50LB 23KG BAGGAGE</freeText> </commercialName> </feeDescriptionGrp> </serviceDetailsGrp> <serviceDetailsGrp> <serviceOptionInfo> <dataTypeInformation> <subType>NRF</subType> </dataTypeInformation> </serviceOptionInfo> <feeDescriptionGrp> <itemNumberInfo> <itemNumberDetails> <number>4</number> <type>SD</type> </itemNumberDetails> </itemNumberInfo> <serviceDescriptionInfo> <serviceRequirementsInfo> <serviceClassification>F</serviceClassification> <serviceGroup>TS</serviceGroup> </serviceRequirementsInfo> </serviceDescriptionInfo> <commercialName> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>NOT REFUNDABLE</freeText> </commercialName> </feeDescriptionGrp> </serviceDetailsGrp> </serviceFeesGrp> </Fare\_MasterPricerCalendarReply>

## 5.48.3 Possible Errors

If Fare Family information is requested in input but Fare Family information is not activated for the product / user, the entire input is rejected with the following message:  
"FARE FAMILY INFORMATION NOT PERMITTED"  
If the resulting fare family description is requested with Ancillary Services, a reject message is returned:  
"FARE FAMILY DESCRIPTION NOT COMPATIBLE WITH ANCILLARY SERVICES OPTION"  
If the Fare Family information option is requested with Agent Fare Family, a reject message is returned:  
"FARE FAMILY INFORMATION NOT COMPATIBLE WITH AGENT FARE FAMILY OPTION"  

* * *

## 5.49 Operation: A.3 Output Option - Return Airline Alliance

The user has the ability to have the Airline Alliance code at flight level in the reply.

The functionality is triggered by a setting at OID level.

In the example, 2 Alliances are returned:

\- LAN: oneworld (\*O)

\- Lufthansa: StarAlliance (\*A)

## 5.49.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_MasterPricerCalendar xmlns="http://xml.amadeus.com/FMPCAQ\_20\_2\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fareOptions> <pricingTickInfo> <pricingTicketing> <priceType>RP</priceType> <priceType>RU</priceType> </pricingTicketing> </pricingTickInfo> </fareOptions> <travelFlightInfo> <companyIdentity> <carrierQualifier>M</carrierQualifier> <carrierId>LH</carrierId> <carrierId>LA</carrierId> </companyIdentity> </travelFlightInfo> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>SCL</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>FRA</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>271114</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>1</dayInterval> </rangeOfDate> </timeDetails> </itinerary> </Fare\_MasterPricerCalendar>

## 5.49.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_MasterPricerCalendarReply xmlns="http://xml.amadeus.com/FMPCAR\_20\_2\_1A"> <replyStatus> <status> <advisoryTypeInfo>FQX</advisoryTypeInfo> </status> </replyStatus> <conversionRate> <conversionRateDetail> <currency>EUR</currency> </conversionRateDetail> </conversionRate> <flightIndex> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>1</ref> </flightProposal> <flightProposal> <ref>2335</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>LH</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>261114</dateOfDeparture> <timeOfDeparture>0645</timeOfDeparture> <dateOfArrival>261114</dateOfArrival> <timeOfArrival>1150</timeOfArrival> </productDateTime> <location> <locationId>SCL</locationId> </location> <location> <locationId>GRU</locationId> <terminal>1</terminal> </location> <companyId> <marketingCarrier>LA</marketingCarrier> <operatingCarrier>JJ</operatingCarrier> <alliance>\*O</alliance> </companyId> <flightOrtrainNumber>6017</flightOrtrainNumber> <productDetail> <equipmentType>320</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>261114</dateOfDeparture> <timeOfDeparture>1945</timeOfDeparture> <dateOfArrival>271114</dateOfArrival> <timeOfArrival>1020</timeOfArrival> <dateVariation>1</dateVariation> </productDateTime> <location> <locationId>GRU</locationId> <terminal>3</terminal> </location> <location> <locationId>FRA</locationId> <terminal>1</terminal> </location> <companyId> <marketingCarrier>LH</marketingCarrier> <operatingCarrier>LH</operatingCarrier> <alliance>\*A</alliance> </companyId> <flightOrtrainNumber>507</flightOrtrainNumber> <productDetail> <equipmentType>74H</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>2</ref> </flightProposal> <flightProposal> <ref>2335</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>LH</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>271114</dateOfDeparture> <timeOfDeparture>0645</timeOfDeparture> <dateOfArrival>271114</dateOfArrival> <timeOfArrival>1150</timeOfArrival> </productDateTime> <location> <locationId>SCL</locationId> </location> <location> <locationId>GRU</locationId> <terminal>1</terminal> </location> <companyId> <marketingCarrier>LA</marketingCarrier> <operatingCarrier>JJ</operatingCarrier> <alliance>\*O</alliance> </companyId> <flightOrtrainNumber>6017</flightOrtrainNumber> <productDetail> <equipmentType>320</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>271114</dateOfDeparture> <timeOfDeparture>1945</timeOfDeparture> <dateOfArrival>281114</dateOfArrival> <timeOfArrival>1020</timeOfArrival> <dateVariation>1</dateVariation> </productDateTime> <location> <locationId>GRU</locationId> <terminal>3</terminal> </location> <location> <locationId>FRA</locationId> <terminal>1</terminal> </location> <companyId> <marketingCarrier>LH</marketingCarrier> <operatingCarrier>LH</operatingCarrier> <alliance>\*A</alliance> </companyId> <flightOrtrainNumber>507</flightOrtrainNumber> <productDetail> <equipmentType>74H</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>3</ref> </flightProposal> <flightProposal> <ref>2335</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>LH</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>281114</dateOfDeparture> <timeOfDeparture>0645</timeOfDeparture> <dateOfArrival>281114</dateOfArrival> <timeOfArrival>1150</timeOfArrival> </productDateTime> <location> <locationId>SCL</locationId> </location> <location> <locationId>GRU</locationId> <terminal>1</terminal> </location> <companyId> <marketingCarrier>LA</marketingCarrier> <operatingCarrier>JJ</operatingCarrier> <alliance>\*O</alliance> </companyId> <flightOrtrainNumber>6017</flightOrtrainNumber> <productDetail> <equipmentType>320</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>281114</dateOfDeparture> <timeOfDeparture>1945</timeOfDeparture> <dateOfArrival>291114</dateOfArrival> <timeOfArrival>1020</timeOfArrival> <dateVariation>1</dateVariation> </productDateTime> <location> <locationId>GRU</locationId> <terminal>3</terminal> </location> <location> <locationId>FRA</locationId> <terminal>1</terminal> </location> <companyId> <marketingCarrier>LH</marketingCarrier> <operatingCarrier>LH</operatingCarrier> <alliance>\*A</alliance> </companyId> <flightOrtrainNumber>507</flightOrtrainNumber> <productDetail> <equipmentType>74H</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> </flightIndex> <recommendation> <itemNumber> <itemNumberId> <number>1</number> </itemNumberId> </itemNumber> <recPriceInfo> <monetaryDetail> <amount>1316.72</amount> </monetaryDetail> <monetaryDetail> <amount>223.72</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>3</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>1316.72</totalFareAmount> <totalTaxAmount>223.72</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>LH</company> </codeShareDetails> <codeShareDetails> <company>LA</company> </codeShareDetails> <pricingTicketing> <priceType>OBF</priceType> <priceType>OBA</priceType> <priceType>OBV</priceType> </pricingTicketing> </paxFareDetail> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>PEN</textSubjectQualifier> <informationType>73</informationType> </freeTextQualification> <description>PENALTY APPLIES</description> </pricingMessage> <monetaryInformation> <monetaryDetail> <amountType>MT</amountType> <amount>182.00</amount> <currency>EUR</currency> </monetaryDetail> </monetaryInformation> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>LTD</textSubjectQualifier> <informationType>40</informationType> </freeTextQualification> <description>LAST TKT DTE</description> <description>20OCT14</description> <description> - SEE ADV PURCHASE</description> </pricingMessage> </fare> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>S</rbd> <cabin>M</cabin> </cabinProduct> <fareProductDetail> <fareBasis>HLRCOWCL</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>N</breakPoint> </productInformation> </groupOfFares> <groupOfFares> <productInformation> <cabinProduct> <rbd>H</rbd> <cabin>M</cabin> </cabinProduct> <fareProductDetail> <fareBasis>HLRCOWCL</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> </paxFareProduct> </recommendation> </Fare\_MasterPricerCalendarReply>

## 5.49.3 Possible Errors

See "Error Messages" section.

* * *

## 5.50 Operation: Low Cost Carriers

The user has the possibility to have included in the reply, Low-Cost Content Carriers recommendations or mixed of Low-Cost Content Carriers and Full Service Carriers recommendations. The examples below illustrate 3 different types of recommendations. The first recommendation is a Ticketless Access Carrier recommendation (priceType L), the second one is an Amadeus Air eXtension recommendation (priceType Q or O) and the third one is a Full Service Carrier recommendation. 

  
**Amadeus Air eXtension** 

This content source abbreviated as AirX will require to use REST/JSON Price & Book services after the Master Pricer Calendar step.It is identified with the new product code "**Q**” introduced in the Shopping response under the PriceType Tag.The Shopping response can include Full Service Carriers (EDIFACT), Ticketless Access Carrier (TLA) and/or Amadeus Air eXtension recommendations.This content is not activated by default on Amadeus side.

Please contact your AM for activation.

**Examples**

• Input Syntax

    No Specific change in the Input request, it will be same as usual MP flow.

• Output Syntax (Ticketless Access Carrier: Pricetype **L**) 

<recommendation>  
        <itemNumber>  
            <itemNumberId>  
                <number>3</number>  
            </itemNumberId>  
            <priceTicketing>  
                <priceType>L</priceType>  
            </priceTicketing>  
        </itemNumber>  
        <recPriceInfo>  
            <monetaryDetail>  
                <amountType>R</amountType>  
                <amount>97.49</amount>  
            </monetaryDetail>  
        </recPriceInfo>      

• Output Syntax (Amadeus Air eXtension: Pricetype: **Q**)

  
<recommendation>  
        <itemNumber>  
            <itemNumberId>  
                <number>2</number>  
            </itemNumberId>  
            <priceTicketing>  
                <priceType>Q</priceType>  
            </priceTicketing>  
        </itemNumber>  
        <recPriceInfo>  
            <monetaryDetail>  
                <amountType>R</amountType>  
                <amount>89.99</amount>  
            </monetaryDetail>  
        </recPriceInfo>  
  

• Output Syntax (Full Service Carriers)

  
  <recommendation>  
        <itemNumber>  
            <itemNumberId>  
                <number>6</number>  
            </itemNumberId>  
        </itemNumber>  
        <recPriceInfo>  
            <monetaryDetail>  
                <amount>224.11</amount>  
            </monetaryDetail>  
            <monetaryDetail>  
                <amount>31.11</amount>  
            </monetaryDetail>  
        </recPriceInfo>

## 5.50.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_MasterPricerCalendar xmlns="http://xml.amadeus.com/FMPCAQ\_20\_2\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>250</numberOfUnits> <typeOfUnit>RC</typeOfUnit> </unitNumberDetail> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fareOptions> <pricingTickInfo> <pricingTicketing> <priceType>RP</priceType> <priceType>RU</priceType> <priceType>CUC</priceType> <priceType>TAC</priceType> </pricingTicketing> </pricingTickInfo> <feeIdDescription> </feeIdDescription> <conversionRate> <conversionRateDetail> <currency>EUR</currency> </conversionRateDetail> </conversionRate> </fareOptions> <travelFlightInfo> </travelFlightInfo> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>BCN</locationId> <airportCityQualifier>C</airportCityQualifier> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>DUS</locationId> <airportCityQualifier>C</airportCityQualifier> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>151023</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>3</dayInterval> </rangeOfDate> </timeDetails> <flightInfo> <companyIdentity> <carrierQualifier>M</carrierQualifier> <carrierId>EW</carrierId> <carrierId>YY</carrierId> </companyIdentity> </flightInfo> </itinerary> </Fare\_MasterPricerCalendar>

## 5.50.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<message agency="1A" release="2" type="FMPCAR" version="20"> <replyStatus> <status> <advisoryTypeInfo>FQX</advisoryTypeInfo> </status> </replyStatus> <conversionRate> <conversionRateDetail> <currency>EUR</currency> </conversionRateDetail> <conversionRateDetail> <currency>EUR</currency> <convertedAmountLink>1</convertedAmountLink> </conversionRateDetail> </conversionRate> <flightIndex> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>1</ref> </flightProposal> <flightProposal> <ref>0225</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>EW</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>171023</dateOfDeparture> <timeOfDeparture>0930</timeOfDeparture> <dateOfArrival>171023</dateOfArrival> <timeOfArrival>1155</timeOfArrival> </productDateTime> <location> <locationId>BCN</locationId> <terminal>2</terminal> </location> <location> <locationId>DUS</locationId> </location> <companyId> <marketingCarrier>EW</marketingCarrier> <operatingCarrier>EW</operatingCarrier> </companyId> <flightOrtrainNumber>9445</flightOrtrainNumber> <productDetail> <equipmentType>321</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>N</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>2</ref> </flightProposal> <flightProposal> <ref>0830</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>EW</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>161023</dateOfDeparture> <timeOfDeparture>0925</timeOfDeparture> <dateOfArrival>161023</dateOfArrival> <timeOfArrival>1210</timeOfArrival> </productDateTime> <location> <locationId>BCN</locationId> <terminal>2</terminal> </location> <location> <locationId>HAM</locationId> <terminal>1</terminal> </location> <companyId> <marketingCarrier>EW</marketingCarrier> <operatingCarrier>EW</operatingCarrier> </companyId> <flightOrtrainNumber>7521</flightOrtrainNumber> <productDetail> <equipmentType>321</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>N</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>161023</dateOfDeparture> <timeOfDeparture>1655</timeOfDeparture> <dateOfArrival>161023</dateOfArrival> <timeOfArrival>1755</timeOfArrival> </productDateTime> <location> <locationId>HAM</locationId> <terminal>1</terminal> </location> <location> <locationId>DUS</locationId> </location> <companyId> <marketingCarrier>EW</marketingCarrier> <operatingCarrier>EW</operatingCarrier> </companyId> <flightOrtrainNumber>9037</flightOrtrainNumber> <productDetail> <equipmentType>319</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>N</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>3</ref> </flightProposal> <flightProposal> <ref>0225</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>EW</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>181023</dateOfDeparture> <timeOfDeparture>1410</timeOfDeparture> <dateOfArrival>181023</dateOfArrival> <timeOfArrival>1635</timeOfArrival> </productDateTime> <location> <locationId>BCN</locationId> <terminal>2</terminal> </location> <location> <locationId>DUS</locationId> </location> <companyId> <marketingCarrier>EW</marketingCarrier> <operatingCarrier>EW</operatingCarrier> </companyId> <flightOrtrainNumber>9445</flightOrtrainNumber> <productDetail> <equipmentType>320</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>N</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>4</ref> </flightProposal> <flightProposal> <ref>0225</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>EW</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>121023</dateOfDeparture> <timeOfDeparture>1945</timeOfDeparture> <dateOfArrival>121023</dateOfArrival> <timeOfArrival>2210</timeOfArrival> </productDateTime> <location> <locationId>BCN</locationId> <terminal>2</terminal> </location> <location> <locationId>DUS</locationId> </location> <companyId> <marketingCarrier>EW</marketingCarrier> <operatingCarrier>EW</operatingCarrier> </companyId> <flightOrtrainNumber>9443</flightOrtrainNumber> <productDetail> <equipmentType>32A</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>N</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>5</ref> </flightProposal> <flightProposal> <ref>0225</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>EW</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>151023</dateOfDeparture> <timeOfDeparture>1945</timeOfDeparture> <dateOfArrival>151023</dateOfArrival> <timeOfArrival>2210</timeOfArrival> </productDateTime> <location> <locationId>BCN</locationId> <terminal>2</terminal> </location> <location> <locationId>DUS</locationId> </location> <companyId> <marketingCarrier>EW</marketingCarrier> <operatingCarrier>EW</operatingCarrier> </companyId> <flightOrtrainNumber>9443</flightOrtrainNumber> <productDetail> <equipmentType>321</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>N</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>6</ref> </flightProposal> <flightProposal> <ref>0225</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>EW</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>141023</dateOfDeparture> <timeOfDeparture>0930</timeOfDeparture> <dateOfArrival>141023</dateOfArrival> <timeOfArrival>1155</timeOfArrival> </productDateTime> <location> <locationId>BCN</locationId> <terminal>2</terminal> </location> <location> <locationId>DUS</locationId> </location> <companyId> <marketingCarrier>EW</marketingCarrier> <operatingCarrier>EW</operatingCarrier> </companyId> <flightOrtrainNumber>9441</flightOrtrainNumber> <productDetail> <equipmentType>321</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>N</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>7</ref> </flightProposal> <flightProposal> <ref>1500</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>EW</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>131023</dateOfDeparture> <timeOfDeparture>1915</timeOfDeparture> <dateOfArrival>131023</dateOfArrival> <timeOfArrival>2140</timeOfArrival> </productDateTime> <location> <locationId>BCN</locationId> <terminal>2</terminal> </location> <location> <locationId>PRG</locationId> <terminal>2</terminal> </location> <companyId> <marketingCarrier>EW</marketingCarrier> <operatingCarrier>E6</operatingCarrier> </companyId> <flightOrtrainNumber>4215</flightOrtrainNumber> <productDetail> <equipmentType>319</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>141023</dateOfDeparture> <timeOfDeparture>0855</timeOfDeparture> <dateOfArrival>141023</dateOfArrival> <timeOfArrival>1015</timeOfArrival> </productDateTime> <location> <locationId>PRG</locationId> <terminal>2</terminal> </location> <location> <locationId>DUS</locationId> </location> <companyId> <marketingCarrier>EW</marketingCarrier> <operatingCarrier>4X</operatingCarrier> </companyId> <flightOrtrainNumber>9773</flightOrtrainNumber> <productDetail> <equipmentType>320</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> </flightIndex> <recommendation> <itemNumber> <itemNumberId> <number>1</number> </itemNumberId> <priceTicketing> <priceType>L</priceType> </priceTicketing> </itemNumber> <recPriceInfo> <monetaryDetail> <amountType>R</amountType> <amount>77.49</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>C</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>77.49</totalFareAmount> <totalTaxAmount>0</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>EW</company> </codeShareDetails> </paxFareDetail> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>X</rbd> <cabin>M</cabin> </cabinProduct> <fareProductDetail> <fareBasis>X</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> </paxFareProduct> </recommendation> <recommendation> <itemNumber> <itemNumberId> <number>2</number> </itemNumberId> <priceTicketing> <priceType>Q</priceType> </priceTicketing> </itemNumber> <recPriceInfo> <monetaryDetail> <amountType>R</amountType> <amount>89.99</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>C</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>89.99</totalFareAmount> <totalTaxAmount>0</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>EW</company> </codeShareDetails> </paxFareDetail> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>Y</rbd> <cabin>M</cabin> </cabinProduct> <fareProductDetail> <fareBasis>Y</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> </groupOfFares> <groupOfFares> <productInformation> <cabinProduct> <rbd>Y</rbd> <cabin>M</cabin> </cabinProduct> <fareProductDetail> <fareBasis>Y</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> </paxFareProduct> </recommendation> <recommendation> <itemNumber> <itemNumberId> <number>3</number> </itemNumberId> <priceTicketing> <priceType>L</priceType> </priceTicketing> </itemNumber> <recPriceInfo> <monetaryDetail> <amountType>R</amountType> <amount>97.49</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>C</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>3</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>97.49</totalFareAmount> <totalTaxAmount>0</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>EW</company> </codeShareDetails> </paxFareDetail> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>L</rbd> <cabin>M</cabin> </cabinProduct> <fareProductDetail> <fareBasis>L</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> </paxFareProduct> </recommendation> <recommendation> <itemNumber> <itemNumberId> <number>4</number> </itemNumberId> <priceTicketing> <priceType>L</priceType> </priceTicketing> </itemNumber> <recPriceInfo> <monetaryDetail> <amountType>R</amountType> <amount>157.49</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>C</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>4</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>5</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>157.49</totalFareAmount> <totalTaxAmount>0</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>EW</company> </codeShareDetails> </paxFareDetail> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>W</rbd> <cabin>M</cabin> </cabinProduct> <fareProductDetail> <fareBasis>W</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> </paxFareProduct> </recommendation> <recommendation> <itemNumber> <itemNumberId> <number>5</number> </itemNumberId> <priceTicketing> <priceType>L</priceType> </priceTicketing> </itemNumber> <recPriceInfo> <monetaryDetail> <amountType>R</amountType> <amount>177.49</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>C</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>6</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>177.49</totalFareAmount> <totalTaxAmount>0</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>EW</company> </codeShareDetails> </paxFareDetail> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>Q</rbd> <cabin>M</cabin> </cabinProduct> <fareProductDetail> <fareBasis>Q</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> </paxFareProduct> </recommendation> <recommendation> <itemNumber> <itemNumberId> <number>6</number> </itemNumberId> </itemNumber> <recPriceInfo> <monetaryDetail> <amount>224.11</amount> </monetaryDetail> <monetaryDetail> <amount>31.11</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>7</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>224.11</totalFareAmount> <totalTaxAmount>31.11</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>LH</company> </codeShareDetails> <pricingTicketing> <priceType>OBV</priceType> </pricingTicketing> </paxFareDetail> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>PEN</textSubjectQualifier> <informationType>70</informationType> </freeTextQualification> </pricingMessage> </fare> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>W</rbd> <cabin>M</cabin> </cabinProduct> <fareProductDetail> <fareBasis>WNCWGOES</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>N</breakPoint> </productInformation> </groupOfFares> <groupOfFares> <productInformation> <cabinProduct> <rbd>W</rbd> <cabin>M</cabin> </cabinProduct> <fareProductDetail> <fareBasis>WNCWGOES</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> </paxFareProduct> </recommendation> </message>

## 5.50.3 Possible Errors

See "Error Messages" section.

* * *