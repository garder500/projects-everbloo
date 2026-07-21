---
url: "https://developers.amadeus.com/api-library/soap/functional-doc/2332/doc-read/8710?serviceVersion=13.1"
download_url: "https://developers.amadeus.com/PAS-EAS/api/download/comp/4d4ad2cb456c02633f463a055ab70584/8710/upload_14727765214233204006.html"
title: "HTML_UG_WBS_Ticket_ATCShopperMasterPricerCalendar_FMTCCQ_13.1_188"
source: "amadeus"
service_id: "2332"
service_name: "Ticket_ATCShopperMasterPricerCalendar"
version: "18.2"
document_id: "8710"
doc_version: "13.1"
doc_type: "User guide"
file_format: "HTML"
scraped_at: "2026-07-15T10:45:10.538Z"
---
# Function: Ticket\_ATCShopperMasterPricerCalendar

* * *

## 1 Overview

The Ticket\_ATCShopperMasterPricerCalendar service provides access to the calendar feature of ATC Shopper.

ATC Shopper is a re-shopping solution, to enable end-users who wish to change their ticketed journey to find new travel recommendations.  
ATC Shopper processes the voluntary change conditions of the ticket to be exchanged in order to provide rebooking solutions. ATC Shopper computes fare and tax balances as well as change fees.

ATC Shopper Calendar provides the cheapest available rebooking solution per date over a range of +/- 3 days around the dates initially selected by the end-user for the new itinerary. This will allow end-users who have flexible dates of travel and who wish to find the best compromise between price and dates to find the right days for travel.

For each date combination, full details about the rebooking solution price as well as the associated cost for change are provided.

You can search for new travel recommendations with ATC Shopper for the below types of tickets and associated bookings:

**Tickets  
**

-   Round Trips, One Ways and Open Jaws  
    Itinerary can contain up to two requested segments consisting of maximum three legs
-   Domestic and international itineraries
-   Interline
-   Partly flown or wholly unused
-   Original or already reissued/revalidated
-   Priced with all type of fares: public, private, nego, ATPCO, SITA,…

**Bookings**

-   Bookings with multiple passengers (up to 9)
-   Online or offline created bookings

With ATC Shopper, customers can proceed with the following changes in their original booking:

-   Travel date and/or time
-   Routing: origin and destination for one or the two bounds

This service is designed to be used by travel agencies and corporations.

## 1.1 Supported Operations

### What is an "Operation"?

In this document, an "operation" is an example of a request.  The request will contain one or more options offered by the service or demonstrate a scenario for a particular use-case.

The following operations are supported with this function:

### Search with Only Mandatory Elements

Searches for specified date ranges and city pairs can be performed using only mandatory elements.

****\-** Itinerary Date**

A date of travel must be specified for an ATC calendar query.

For segments that the end-user wants to keep unchanged, the requested date of the associated requested segment must be the departure date of the first flight of this unchanged segment.

****\-** Origin/Destination**

At least one origin and one destination must be specified for a calendar query.

****\-** Passenger Information**

-   Number of Passenger Seats

The number of seats required for the travelling passengers must be specified for a calendar. This number may not always be equal to the total number of passengers travelling. e.g. 3 Adults and 1 Infant - as an infant does not occupy a seat, this request requires only 3 seats for 4 travelling passengers.

-   Associated Passenger Type Codes for Travelling Passengers

Each travelling passenger must be associated to at least one passenger type code and maximum 3 passenger Type Codes for a calendar.

-   Original Ticket numbers

The user has to specify a ticket number for each passenger to enable the system to evaluate the conditions of re-issue.

****\-** Range of Dates**

The User has to request for an ATC calendar search on a range of dates for each trip segment.

For Round Trip Itinerary, the calendar feature request can be made for a maximum date range extent of 7 days. Alternatively, if trip duration is specified to determine the return date, a maximum date range extent of 15 days can be requested for the departure date and a maximum flexibility of 3 days can be requested for the trip duration.

For One-Way Itinerary, the calendar feature request can be made for a maximum date range extent of 15 days.The "trip duration" option does not apply for this type of request.

****\-** Original Ticket Numbers**

Ticket Numbers have to be specified in the same order as the passengers. The mapping between tickets and passengers will be done by the system by associating first ticket number with the first passenger, second ticket number with the second passenger and so on.

****\-** Original Itinerary information**

For each requested segment of the first issue, the user has to specify:

-   The airport codes constituting this requested segment
-   A status code to let the system know if this requested segment has to be changed or kept as it is. The possible status codes are:
    -   C: Changed
    -   K: Keep flights
    -   KF: Keep flights and fares
    -   A: Add
    -   R: Remove

If the status code of a First Issue Segment is K, only recommendations with the same itinerary and the same flights for this requested segment will be returned.

If the status code of a First Issue Segment is KF, only recommendations with the same itinerary and the same flights and fares for this requested segment will be returned.

For each requested segment, the user has to specify the list of successive airports in the first issue itinerary corresponding to this requested segment.

This enables the system to create a mapping between First Issue Segments and Requested Segments

_Example of Original Itinerary Information in an ATCCalendarSearch:_

Request:

-   Requested Segment 1: NCE - PAR - JFK
-   Requested Segment 2: JFK - PAR - NCE

Original Itinerary:

-   First Issue Segment 1: NCE - CDG - SFO --- Status Code: Changed Segment
-   First Issue Segment 2: SFO - CDG - NCE --- Status Code: Changed Segment

This clearly indicates the system that the NCE - CDG - SFO needs to be changed into a NCE - PAR - JFK, and the SFO - CDG - NCE needs to be changed into a JFK - PAR - NCE

-   Examples:  
    Example 1 of Original Itinerary Information in an ATCMasterPricerTravelBoardSearch from a RT travel, where we ask to change both bounds :  
    Request:  
        Requested Segment 1: NCE - PAR – JFK  
        Requested Segment 2: JFK - PAR – NCE  
        Original Itinerary:  
            First Issue Segment 1: NCE - CDG - SFO     Status Code: Changed Segment  
            First Issue Segment 2: SFO - CDG - NCE     Status Code: Changed Segment  
        This clearly indicates to the system that the NCE - CDG - SFO needs to be changed into a NCE - PAR - JFK, and the SFO - CDG - NCE needs to be changed into a JFK - PAR - NCE.

  
Example 2 of Original Itinerary Information in an ATCMasterPricerTravelBoardSearch from a RT travel, where  we change only outbound, and we keep inbound:  
Request:  
    Requested Segment 1: NCE - JFK  
    Requested Segment 2: SFO – NCE  
    Original Itinerary:  
        First Issue Segment 1: NCE - CDG - SFO     Status Code: Changed Segment  
        First Issue Segment 2: SFO - CDG - NCE     Status Code: Kept Segment  
    This clearly indicates to the system that the NCE - CDG - SFO needs to be changed into a NCE - JFK (using direct or connecting flights), and the SFO - CDG - NCE needs to be kept using the same initial flights.  
  
Example 3 of Original Itinerary Information in an ATCMasterPricerTravelBoardSearch from a RT travel, where  we change only outbound, and we remove inbound:  
Request:  
    Requested Segment 1: NCE - JFK  
    Original Itinerary:  
        First Issue Segment 1: NCE - CDG - SFO     Status Code: Changed Segment  
        First Issue Segment 2: SFO - CDG - NCE     Status Code: Removed Segment  
    This clearly indicates to the system that the NCE - CDG - SFO needs to be changed into a NCE - JFK (using direct or connecting flights), and the SFO - CDG - NCE needs to be removed.  
Example 4 of Original Itinerary Information in an ATCMasterPricerTravelBoardSearch from a OW travel, where  we change only outbound, and we add a new bound: Request:  
    Requested Segment 1: NCE - JFK    Requested Segment 2: JFK  - NCE  
    Original Itinerary:  
        First Issue Segment 1: NCE - CDG - SFO     Status Code: Changed Segment  
        Added Segment 2: do not indicate any city  Status Code: Added  Segment  
    This clearly indicates to the system that the NCE - CDG - SFO needs to be changed into a NCE – JFK (direct or via a connecting point) , and that the SFO - NCE needs to be added.

### Search with Additional Optional Elements

Specifying additional optional elements in the search request will narrow down the recommendations returned. The more optional elements included in the search request, the more precise the search recommendations will be.

**\- Airline**

The user has the ability to include and/or exclude up to 99 Airlines in the Low Fare Search using a 2 alphanumeric character airline code. The list of carriers provided by ATC eligibility check service must be used here to narrow the search to relevant airlines only.

****\-** Flight Category**

The User has the ability to request Non-Stop, Direct or Connecting flights; or also a combination of these categories.

****\-** Connecting Point**

The user has the ability to include and/or exclude up to 2 connecting points for the requested Calendar.

****\-** Unifares**

By default the calendar queries are applicable only to public fares. However, the User can specify whether the calendar applies on Unifares only, on all Public and Unifare fares or corporate fares.

****\-** Cabin Options**

The user has the ability to specify a desired cabin class for the requested itinerary. There are three different flavors of process: Mandatory, Recommended and Major Cabin. These are described in the corresponding operations.

****\-** Passenger Type**

The user has the ability to specify a Passenger Type for each passenger to apply discounts to eligible passengers.

****\-** Currency Conversion**

The user has the ability to specify in which currency the fare recommendations must be converted and returned.

****\-** Selling / Ticketing Cities**

The user has the ability to specify in the request the location of the selling and the ticketing cities.

****\-** Price to beat**

The user can filter the recommendations by choosing only recommendations with a fare amount lower than the specified price to beat.

****\-** Process Paper ticket / Electronic ticket**

This option provides the end user with the capability to process: Paper Ticket Only or Electronic ticket only.

****\-** Price only PTC**

The process returns only recommendations with the requested passenger type. No defaulting is done.

**\- Empty Cells Clarification**

When this option is requested, a fictitious recommendation is returned with the corresponding reason, for segments and/or dates, where no recommendation can be returned.

****\-** Rank in Journey Server**

The End User may request for the rank of the Flight Solution to be returned.

****\-** Withhold All Taxes / Surcharges**

The purpose of the "Withhold all Taxes and/or all Q Surcharges" options is to request recommendations without including any taxes and/or any Q Surcharges in the total recommendation price.

****\-** Trip Duration**

The End User may specify the trip duration between two Requested Segments. The trip duration is the number of days between the departure dates of two consecutive Requested Segments.

****\-** Time of Departure/Arrival**

Per requested segment, the User may specify one or both of the following;

-   A Time of Departure: The earliest time that a recommended flight may "depart from"
-   A Time of Arrival: The latest time that a recommended flight may "arrive by"

****\-** Time Window**

The User has the ability to specify an applicable time window range, in terms of hours, to a specified time by departure or arrival option. This means the low fare search will return any flight recommendations that arrive or depart within the specified number of hours on either side of the specified timeby departure or arrival.

**\- City or Airport Indicator**

This option indicates whether the included or excluded location indicates a city or an airport.

**\- New Ticket Higher**

The end user can specify to narrow search with recommendations of fare amount + surcharge only higher than or equal to original (excluding taxes). priceType = NTH in priceTickInfo>pricingTicketing.

**\- Discard Lower Total**

The end user can use this option to make balance taxes  non-refundable.  priceType = DLT in <priceTickInfo>pricingTicketing.

## 1.2 Limitations

ATC Shopper shares the same limitations as ATC Reissue in terms of re-pricing capabiliity. Major limitations are:

-   A ticket must be provided for all passengers including infants
-   Negotiated fares are supported only if the net and selling amounts in the fare filing are equal (developments are on-going to handle cases where net amount is different from selling)

### Configurations

The maximum number of flights per proposed segment is 3.

The maximum number of requested segments is 2.

The maximum number of passengers (including an infant without seat) in a request is 9.

## 1.3 Unsupported Operations

None.

## 1.4 Prerequisites

### Office profile security:

The end-user must be authorized to perform an Amadeus Ticket Changer transaction. i.e. the office profile is checked in order to authorize the Amadeus Ticket Changer process or redirect the end-user to the current manual process. (ATC field in the office profile must be set to Yes)

### Data availability:

E-Ticket record must be accessed in order to retrieve all the necessary data pertaining to the Original document.

The ATCShopperMasterPricerCalendar function needs the ticket number (on 12 digits i.e. with carrier code) to access the e-ticket record.

## 2 Building A Query

When building a query it is important to understand the following concepts for calendar search queries:

**What is a Requested Segment?**

A "Requested Segment" is an Origin/Destination segment of the travel requested in the query:

Examples:

-   CDG to JFK on the 26jun;
-   CDG to JFK on the 26jun or 27jun;
-   LON to BKK on the 26jun; +/-3 days

 Note that these requested segments (for the new itinerary) could be the same or  be different than the requested segments of the original itinerary.Indeed we may ask to change the geographies of a bound, or add or remove a bound, or ask to use again the same bound geographies as for the original itinerary (when we want to change only the dates or the flights).A particular use case is when we want to handle an original travel A-B-C where we had a  stopover in B:

-   If we ask only 1 bound A-C, it means that ATC Master Pricer may return results with direct flight A to C, or with connecting flights via B as a transfer or stopover, or with connecting flights via an other point D as a transfer or stopover... here it only depends on the Carrier Preferred Display rules defined on the central system regarding the allowed flight constructions for a given city-pair A-C. But we may possibly refine the search using the flight options "flight category", and/or "connection point" in order to force only some specific constructions.
-   Alternatively, if we ask 2 bounds A-B + B-C, it means that ATC Master Pricer will necessarily return only constructions via the point B. It maybe a stopover or transfer depending on the duration spent in B. So we can see here that if we ask for different travel dates for A-B and B-C, it means that we are forcing to have a stopover in B. (while it would not be the case if we request only 1 single bound A-C).

**What is an Itinerary?**

An "Itinerary" is the combination of all the Requested Segments in the order the passenger specified them.

Optional Parameters

The optional parameters may apply at the Requested Segment and/or Itinerary level. The following table gives the rule for each option in terms of applicable levels:

Options

Segment

Itinerary

**Flight Options**

Number of recommendations

  

X

Airline

X

X

Cabin

  

X

Time Window

X

  

Time: Departure/Arrival

X

  

Connecting point

X

  

Flight Category

X

X

Selling/Ticketing Cities

  

X

**Fare Options**

Passenger Type

  

X

Price to Beat

  

X

Unifares

  

X

Currency Conversion

  

X

Process Paper ticket/Electronic Ticket

  

X

Form of payment

  

X

Sorting with/Without Fees

  

X

Price Only PTC

  

X

New Ticket Higher

X

Discard Lower Total

X

**Date Options**

Range of Dates

X

  

Trip Duration

X

**Output Options**

  

  

Empty Cells Clarification

  

X

Rank in Journey Server

  

X

The input validation of each option is described in the corresponding sections.

Option requested at both requested segment level and itinerary Level?

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

Exclude Airlines AA, DL

## 3 Receiving A Reply

For each query requested, either an applicable error message or a valid response will be returned.

When receiving a reply it is important to understand the following concepts for the ATC Shopper calendar answers:

### \- Recommendation

A "Recommendation" is the association of a journey and its corresponding price that is returned as a possible solution.

### \- Journey

A "Journey" is a combination of Proposed Segments covering the requested Itinerary

### \- Proposed Segment

A "Proposed Segment" is a combination of flights that matches a Requested Segment. This may result in 3 connecting flights being considered as a single "Proposed segment".

Examples:

Requested Segment

Proposed Segment

SYD to JFK on 26Jun

AF flight 22 on 26jun

LON to BKK on 26Jun

LH flight4629 LHR to FRA 26Jun  
LH flight744 FRA to BKK 26Jun

NCE to SBN on 28Jul

AF flight7701 NCE to CDG 28Jul  
AF flight 050 CDG to ORD 28Jul  
UA flight5860 ORD to SBN 28Jul

### \- Electronic Ticketing

The Electronic Ticketing indicator field indicates whether a flight is eligible for electronic ticketing (value 'Y' for Yes) or not (value 'N' for NO).

addProductDetail - Data element

Value

/electronicTicketing

Y

/electronicTicketing

N

## 4 Error Messages

This section provides describes the general errors which may be returned.

### Local Application Error

If a mandatory element is missing in the query structure, including any elements that are deemed mandatory via an association to another optional parameter, the entire entry is rejected.

### Common Errors

It should be noted here that these messages are returned in the instances when no recommendations can be found.

******\-**** No Recommendation Found For Requested Itinerary/Options**

Whenever the Low Fare Search process does not find any recommendation matching the requested options, the query is rejected with the following message:  
"NO RECOMMENDATION FOUND FOR REQUESTED ITINERARY/OPTIONS"

******\-**** No Available Flight Found For The Requested Segment**

In the current Low Fare Search process, when no flight is available (for example, all the flights matching the requested itinerary are set to 0 or closed), the transaction is rejected with the message:  
"ERC - CODE SET 9321: VALUE 977 - NO AVAILABLE FLIGHT FOUND FOR THE REQUESTED SEGMENT nn"  
(Where: nn represents the first impacted requested segment number).

These messages are returned when there is an error in the request input:

******\-**** Latest Future Date Possible ddmmmyy**

A reject message will be returned by the server, indicating that a date in the request is too far in the future. The corresponding reject message:  
"LATEST FUTURE DATE POSSIBLE ddmmmyy"

******\-**** Too Many Airline Codes**

If more than 99 airline codes are specified at the 'Include Airline' option level, the entire entry is rejected and the following message is returned:  
"TOO MANY AIRLINE CODES"

******\-**** Invalid Value Coded - Pricingtickinfo**

If an unknown Unifare option is specified in the entry, the entire request is rejected and the following error message is returned:  
"INVALID VALUE CODED - PRICINGTICKINFO".

******\-**** Too Many Requested Segments**

Up to 3 Requested Segments 'Lowest Fare search' requests are allowed, excluding surface sectors. If this check fails, the entire entry is rejected with the following message:  
"TOO MANY REQUESTED SEGMENTS".

******\-**** Invalid Value (Coded) - Conversion Rate**

If an unknown Currency is specified in the Lowest Fare search entry, the entire request is rejected and the following error message is returned:  
"INVALID VALUE (CODED) - CONVERSION RATE".

******\-**** Invalid Value (Coded)**

If an un-authorized value is specified in a field flagged as 'coded' at the Lowest Fare Search Input message level, the entire entry is rejected and, if no other specific error message exists, the following generic reject message is returned:  
"INVALID VALUE (CODED) - XXX"  
where XXX is the Segment smart name (e.g. paxReference).

**Note**: When a field is flagged as coded, refer to the corresponding code set to check the list of values authorized.

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

TOO MANY MATCHING ATTRIBUTES SETS REQUESTED

\-

TOO MANY ATTRIBUTE OCCURENCES

\-

INVALID FARE FAMILY NAME REQUESTED

\-

INVALID CARRIER REQUESTED

836

DATE OVERRIDE OPTION NOT ALLOWED

## 4.1 Error Reply

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_ATCShopperMasterPricerCalendarReply xmlns="http://xml.amadeus.com/FMTCCR\_13\_1\_1A"> <replyStatus> <status> <notification>CXR</notification> </status> </replyStatus> <errorMessage> <applicationError> <applicationErrorDetail> <error>866</error> </applicationErrorDetail> </applicationError> <errorMessageText> <freeTextQualification> <textSubjectQualifier>1</textSubjectQualifier> </freeTextQualification> <description>NO FARE FOUND FOR REQUESTED ITINERARY</description> </errorMessageText> </errorMessage> </Ticket\_ATCShopperMasterPricerCalendarReply>

  

* * *

## 5 Operations

## 5.1 Operation: 0 - Search With Mandatory Elements

### Search with Only Mandatory Elements

Searches for specified date ranges and city pairs can be performed using only mandatory elements.

**Passengers**

A Passenger Type must be associated to each passenger. A Passenger Type consists of 1 to 3 occurrences of a Passenger Type Code (PTC).

**Number of Passenger Seats**

The number of seats required for the traveling passengers must be specified for a calendar. This number may not always be equal to the total number of passengers traveling. e.g., 3 Adults and 1 Infant - as an infant does not occupy a seat, this request requires only 3 seats for 4 traveling passengers.

**Requested Segments**

Up to 2 Requested Segments can be requested. The following mandatory information must be specified for each requested segment:

1)Origin/Destination

At least one origin and one destination must be specified for a calendar query.

\- 1 Departure Location (City or Airport)  
\- 1 Arrival Location (City or Airport)

2)Itinerary Date

A date of travel must be specified for a calendar query.

\- 1 Date. This date corresponds to the departure date of the requested segment

**Ticket Numbers**

A ticket number must be provided in input for each passenger in the query. In a multi-passenger query, all tickets must follow the standard ATC constraints for Multipax besides the constraints for Monopax.

**Original Itinerary Information**

Original Itinerary Information must be provided in the query to orient the ATC Master Pricer Fare Search. Depending on the end-user needs, each Requested Segment can have a different status (for example Change or Keep).

**Range of Dates**

The User must specify a range of dates for each calendar search.

## 5.1.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_ATCShopperMasterPricerCalendar xmlns="http://xml.amadeus.com/FMTCCQ\_13\_1\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>2</numberOfUnits> <typeOfUnit>RC</typeOfUnit> </unitNumberDetail> <unitNumberDetail> <numberOfUnits>2</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <paxReference> <ptc>CH</ptc> <traveller> <ref>2</ref> </traveller> </paxReference> <fareOptions> <pricingTickInfo> <pricingTicketing> <priceType>RP</priceType> <priceType>RU</priceType> </pricingTicketing> </pricingTickInfo> </fareOptions> <travelFlightInfo> <companyIdentity> <carrierQualifier>M</carrierQualifier> <carrierId>BA</carrierId> </companyIdentity> </travelFlightInfo> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>MAD</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>LHR</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>120813</date> </firstDateTimeDetail> </timeDetails> </itinerary> <itinerary> <requestedSegmentRef> <segRef>2</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>LHR</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>MAD</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>121213</date> </firstDateTimeDetail> </timeDetails> </itinerary> <ticketChangeInfo> <ticketNumberDetails> <documentDetails> <number>0572187777498</number> </documentDetails> <documentDetails> <number>0572187777499</number> </documentDetails> </ticketNumberDetails> <ticketRequestedSegments> <actionIdentification> <actionRequestCode>KF</actionRequestCode> </actionIdentification> <connectPointDetails> <connectionDetails> <location>MAD</location> </connectionDetails> <connectionDetails> <location>LHR</location> </connectionDetails> </connectPointDetails> </ticketRequestedSegments> <ticketRequestedSegments> <actionIdentification> <actionRequestCode>C</actionRequestCode> </actionIdentification> <connectPointDetails> <connectionDetails> <location>LHR</location> </connectionDetails> <connectionDetails> <location>MAD</location> </connectionDetails> </connectPointDetails> </ticketRequestedSegments> </ticketChangeInfo> </Ticket\_ATCShopperMasterPricerCalendar>

## 5.1.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_ATCShopperMasterPricerCalendarReply xmlns="http://xml.amadeus.com/FMTCCR\_13\_1\_1A"> <replyStatus> <status> <advisoryTypeInfo>FQX</advisoryTypeInfo> </status> </replyStatus> <conversionRate> <conversionRateDetail> <currency>GBP</currency> </conversionRateDetail> </conversionRate> <flightIndex> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>1</ref> </flightProposal> <flightProposal> <ref>0225</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>BA</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>120913</dateOfDeparture> <timeOfDeparture>1455</timeOfDeparture> <dateOfArrival>120913</dateOfArrival> <timeOfArrival>1620</timeOfArrival> </productDateTime> <location> <locationId>MAD</locationId> <terminal>4</terminal> </location> <location> <locationId>LHR</locationId> <terminal>5</terminal> </location> <companyId> <marketingCarrier>BA</marketingCarrier> <operatingCarrier>IB</operatingCarrier> </companyId> <flightOrtrainNumber>7060</flightOrtrainNumber> <productDetail> <equipmentType>321</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> <productDetailQualifier>AVR</productDetailQualifier> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> </flightIndex> <flightIndex> <requestedSegmentRef> <segRef>2</segRef> </requestedSegmentRef> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>1</ref> </flightProposal> <flightProposal> <ref>0220</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>BA</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>121213</dateOfDeparture> <timeOfDeparture>1355</timeOfDeparture> <dateOfArrival>121213</dateOfArrival> <timeOfArrival>1715</timeOfArrival> </productDateTime> <location> <locationId>LHR</locationId> <terminal>5</terminal> </location> <location> <locationId>MAD</locationId> <terminal>4S</terminal> </location> <companyId> <marketingCarrier>BA</marketingCarrier> <operatingCarrier>BA</operatingCarrier> </companyId> <flightOrtrainNumber>460</flightOrtrainNumber> <productDetail> <equipmentType>767</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> <productDetailQualifier>AVR</productDetailQualifier> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>2</ref> </flightProposal> <flightProposal> <ref>0225</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>BA</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>121213</dateOfDeparture> <timeOfDeparture>0720</timeOfDeparture> <dateOfArrival>121213</dateOfArrival> <timeOfArrival>1045</timeOfArrival> </productDateTime> <location> <locationId>LHR</locationId> <terminal>5</terminal> </location> <location> <locationId>MAD</locationId> <terminal>4S</terminal> </location> <companyId> <marketingCarrier>BA</marketingCarrier> <operatingCarrier>BA</operatingCarrier> </companyId> <flightOrtrainNumber>458</flightOrtrainNumber> <productDetail> <equipmentType>320</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> <productDetailQualifier>AVR</productDetailQualifier> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> </flightIndex> <recommendation> <itemNumber> <itemNumberId> <number>1</number> </itemNumberId> </itemNumber> <recPriceInfo> <monetaryDetail> <amount>546.60</amount> </monetaryDetail> <monetaryDetail> <amount>260.60</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>301.30</totalFareAmount> <totalTaxAmount>130.30</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>BA</company> </codeShareDetails> <pricingTicketing> <priceType>OBV</priceType> </pricingTicketing> </paxFareDetail> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>PEN</textSubjectQualifier> <informationType>70</informationType> </freeTextQualification> <description>TICKETS ARE NON-REFUNDABLE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>LTD</textSubjectQualifier> <informationType>40</informationType> </freeTextQualification> <description>LAST TKT DTE</description> <description>12SEP13</description> <description> - SEE ADV PURCHASE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>SUR</textSubjectQualifier> <informationType>79</informationType> </freeTextQualification> <description>FARE VALID FOR E TICKET ONLY</description> </pricingMessage> </fare> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>M</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>MLNCEURT</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> <fareType>ET</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> <fareDetails> <segmentRef> <segRef>2</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>O</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>OLNCEURT</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> <fareType>ET</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> </paxFareProduct> <paxFareProduct> <paxFareDetail> <paxFareNum>2</paxFareNum> <totalFareAmount>245.30</totalFareAmount> <totalTaxAmount>130.30</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>BA</company> </codeShareDetails> <pricingTicketing> <priceType>OBV</priceType> </pricingTicketing> </paxFareDetail> <paxReference> <ptc>CH</ptc> <traveller> <ref>2</ref> </traveller> </paxReference> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>PEN</textSubjectQualifier> <informationType>70</informationType> </freeTextQualification> <description>TICKETS ARE NON-REFUNDABLE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>LTD</textSubjectQualifier> <informationType>40</informationType> </freeTextQualification> <description>LAST TKT DTE</description> <description>12SEP13</description> <description> - SEE ADV PURCHASE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>SUR</textSubjectQualifier> <informationType>79</informationType> </freeTextQualification> <description>FARE VALID FOR E TICKET ONLY</description> </pricingMessage> </fare> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>M</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>MLNCEURTCH</fareBasis> <passengerType>CH</passengerType> <fareType>RP</fareType> <fareType>ET</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> <fareDetails> <segmentRef> <segRef>2</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>O</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>OLNCEURTCH</fareBasis> <passengerType>CH</passengerType> <fareType>RP</fareType> <fareType>ET</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> </paxFareProduct> </recommendation> <recommendation> <itemNumber> <itemNumberId> <number>2</number> </itemNumberId> </itemNumber> <recPriceInfo> <monetaryDetail> <amount>546.60</amount> </monetaryDetail> <monetaryDetail> <amount>260.60</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>301.30</totalFareAmount> <totalTaxAmount>130.30</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>BA</company> </codeShareDetails> <pricingTicketing> <priceType>OBV</priceType> </pricingTicketing> </paxFareDetail> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>PEN</textSubjectQualifier> <informationType>70</informationType> </freeTextQualification> <description>TICKETS ARE NON-REFUNDABLE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>LTD</textSubjectQualifier> <informationType>40</informationType> </freeTextQualification> <description>LAST TKT DTE</description> <description>12SEP13</description> <description> - SEE ADV PURCHASE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>SUR</textSubjectQualifier> <informationType>79</informationType> </freeTextQualification> <description>FARE VALID FOR E TICKET ONLY</description> </pricingMessage> </fare> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>M</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>MLNCEURT</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> <fareType>ET</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> <fareDetails> <segmentRef> <segRef>2</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>O</rbd> <cabin>M</cabin> <avlStatus>6</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>OLNCEURT</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> <fareType>ET</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> </paxFareProduct> <paxFareProduct> <paxFareDetail> <paxFareNum>2</paxFareNum> <totalFareAmount>245.30</totalFareAmount> <totalTaxAmount>130.30</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>BA</company> </codeShareDetails> <pricingTicketing> <priceType>OBV</priceType> </pricingTicketing> </paxFareDetail> <paxReference> <ptc>CH</ptc> <traveller> <ref>2</ref> </traveller> </paxReference> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>PEN</textSubjectQualifier> <informationType>70</informationType> </freeTextQualification> <description>TICKETS ARE NON-REFUNDABLE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>LTD</textSubjectQualifier> <informationType>40</informationType> </freeTextQualification> <description>LAST TKT DTE</description> <description>12SEP13</description> <description> - SEE ADV PURCHASE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>SUR</textSubjectQualifier> <informationType>79</informationType> </freeTextQualification> <description>FARE VALID FOR E TICKET ONLY</description> </pricingMessage> </fare> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>M</rbd> <cabin>M</cabin> <avlStatus>9</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>MLNCEURTCH</fareBasis> <passengerType>CH</passengerType> <fareType>RP</fareType> <fareType>ET</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> <fareDetails> <segmentRef> <segRef>2</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>O</rbd> <cabin>M</cabin> <avlStatus>6</avlStatus> </cabinProduct> <fareProductDetail> <fareBasis>OLNCEURTCH</fareBasis> <passengerType>CH</passengerType> <fareType>RP</fareType> <fareType>ET</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> </paxFareProduct> </recommendation> </Ticket\_ATCShopperMasterPricerCalendarReply>

## 5.1.3 Possible Errors

If a Past Date is included in a Pricing or Fare Search input – and Commercial Access switch D11 is set to NO/OFF for the office ID making the request, it will be rejected with the following warning message:

-   **DATE OVERRIDE OPTION NOT ALLOWED**  (PSP message nbr **836**)

If a Past Date (currently processed as a pricing date) is included in any Fare Search input, it will be rejected with the following warning message:

-   **PAST DATE PRICING NOT PERMITTED**   (PSP message nbr **1064**)

If the Future Date specified is later than the date of departure on the first flight segment of the itinerary, it will be rejected with the following warning message:

-   **FUTURE DATE TICKETING NOT PERMITTED** (PSP message nbr **1065**)

If a Future Date is included in an ATC Shopper input, it will be rejected with the following warning message:

-   **FUTURE DATE TICKETING NOT PERMITTED**

If a Future Date is included in a FXU/FXZ input (subsequent to FXD), it will be rejected with the following warning message:

-   **INVALID GROUP ID**

(Note that this error message does not apply/is not output if the FXU/FXZ input is subsequent to FXA)

* * *

## 5.2 Operation: Cabin Option - Major Cabin

The example below illustrates a low fare search including an optional Major Cabin element specified with the following information.  
Query Requirements:

-   Requested cabin service: F
-   With the Major Cabin option, the transaction replies with recommendations that are mostly flown in the requested cabin for each requested segment.

Requesting

Specified Data

Request by number of seats occupied by passengers

PX

\# of seats for request

1

Request specific maximum number of recommendations to be returned

RC

Maximum # of recommendations requested

200

Adult Passenger type code

ADT

Passenger type code applicable to 1st passenger

1

Requested Cabin can be defaulted

MC

First cabin service requested at itinerary level

F

1st requested segment

1

Trip Departure city of Paris

SYD

Trip Arrival city of Miami

NCE

Itinerary Date 02 December, 2002

131108

## 5.2.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_ATCShopperMasterPricerCalendar xmlns="http://xml.amadeus.com/FMTCCQ\_13\_1\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>200</numberOfUnits> <typeOfUnit>RC</typeOfUnit> </unitNumberDetail> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fareOptions> <pricingTickInfo> <pricingTicketing> <priceType>RU</priceType> <priceType>RP</priceType> </pricingTicketing> </pricingTickInfo> </fareOptions> <travelFlightInfo> <cabinId> <cabinQualifier>MC</cabinQualifier> <cabin>F</cabin> </cabinId> </travelFlightInfo> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>SYD</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>NCE</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>131108</date> </firstDateTimeDetail> </timeDetails> </itinerary> <itinerary> <requestedSegmentRef> <segRef>2</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>NCE</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>SYD</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>181108</date> </firstDateTimeDetail> </timeDetails> </itinerary> <ticketChangeInfo> <ticketNumberDetails> <documentDetails> <number>0572187777498</number> </documentDetails> </ticketNumberDetails> <ticketRequestedSegments> <actionIdentification> <actionRequestCode>C</actionRequestCode> </actionIdentification> <connectPointDetails> <connectionDetails> <location>SYD</location> </connectionDetails> <connectionDetails> <location>NCE</location> </connectionDetails> </connectPointDetails> </ticketRequestedSegments> <ticketRequestedSegments> <actionIdentification> <actionRequestCode>C</actionRequestCode> </actionIdentification> <connectPointDetails> <connectionDetails> <location>NCE</location> </connectionDetails> <connectionDetails> <location>SYD</location> </connectionDetails> </connectPointDetails> </ticketRequestedSegments> </ticketChangeInfo> </Ticket\_ATCShopperMasterPricerCalendar>

## 5.2.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.2.3 Possible Errors

Invalid Cabin Code

If the cabin code does not exist, the following error message is returned:  
"INVALID CABIN CODE".

Option Cannot be Applied at Requested Segment Level

If the cabin code is not requested at the itinerary level, the following error message is returned:  
"OPTION CANNOT BE APPLIED AT REQUESTED SEGMENT LEVEL".

* * *

## 5.3 Operation: Cabin Option - Mandatory Cabin

This cabin class applies to the entire requested itinerary. It is only possible to default to other classes of service in the case where it has been requested to do so and at least one flight of the proposed segment contains the cabin class specified.

Cabin class may not be specified at individual segment levels. The following cabins may be specified:

-   First/Supersonic
-   Business
-   Economic

For a marketing carrier, the cabin corresponding to each booking code is determined by the booking code and the first letter based on the Cabin definition stored in Amadeus System (e.g. C, CN)

When a Cabin is specified, the lowest fares are proposed using the Classes that are identified as matching the requested Cabin. Non-Stops, Directs, Connecting and Change of Gauges for which the cabin is not defined or not available are not selected.

The cabin option applies to the entire trip and must be specified at the itinerary level of the request. Requested cabin options at the segment level will result in an error.

Whenever the User specifies it, and whenever the requested cabin does not exist on some flights - either not defined or closed - the other cabins may be considered by the system. This process is only applied when in at least one of the flights of a Proposed segment on the requested cabin exists. Whenever a Proposed segment may not be booked in the requested cabin on any flight, this Proposed segment is eliminated, even if the end user allowed defaulting to other cabins.

Examples:

Request

Process

Cabin Class F for return itinerary:  
  
PARIS/NEW YORK/CHICAGO

If cabin class (F) is not available on any flight between Paris/NewYork/Chicago,the system proposed segment will not be returned in the recommendations.  
  
If Cabin Class (F) is only available on the system proposed segment only fromParis/NewYork, default cabin classes will be processed for NewYork/Chicago segments.  
  
If Cabin Class (F) is only available on the system proposed segment only fromNewYork/Chicago, default cabin classes will be processed for Paris/NewYork.

The example below illustrates a low fare search including an optional Cabin elementspecified with the following information.  
Query Requirements:

-   Requested cabin service: F
-   No cabin defaulting, requested cabin must be on entire trip recommendation

Requesting

Specified Data

Request by number of seats occupied by passengers

PX

\# of seats for request

1

Request specific maximum number of recommendations to be returned

RC

Maximum # of recommendations requested

200

Adult Passenger type code

ADT

Passenger type code applicable to 1st passenger

1

First cabin service requested at itinerary level

F

1st requested segment

1

Trip Departure city of Paris

PAR

Trip Arrival city of Miami

MIA

Itinerary Date 02 December,2002

120202

## 5.3.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_ATCShopperMasterPricerCalendar xmlns="http://xml.amadeus.com/FMTCCQ\_13\_1\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> <unitNumberDetail> <numberOfUnits>200</numberOfUnits> <typeOfUnit>RC</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <travelFlightInfo> <cabinId> <cabin>F</cabin> </cabinId> </travelFlightInfo> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>PAR</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>MIA</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>120206</date> </firstDateTimeDetail> </timeDetails> </itinerary> <ticketChangeInfo> <ticketNumberDetails> <documentDetails> <number>0572187777498</number> </documentDetails> </ticketNumberDetails> <ticketRequestedSegments> <actionIdentification> <actionRequestCode>C</actionRequestCode> </actionIdentification> <connectPointDetails> <connectionDetails> <location>PAR</location> </connectionDetails> <connectionDetails> <location>MIA</location> </connectionDetails> </connectPointDetails> </ticketRequestedSegments> </ticketChangeInfo> </Ticket\_ATCShopperMasterPricerCalendar>

## 5.3.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.3.3 Possible Errors

Invalid Cabin Code

If the cabin code does not exist, the following error message is returned:  
"INVALID CABIN CODE".

Option Cannot be Applied at Requested Segment Level

If the cabin code is not requested at the itinerary level, the following error message is returned:  
"OPTION CANNOT BE APPLIED AT REQUESTED SEGMENT LEVEL".

* * *

## 5.4 Operation: Cabin Option - Recommended Cabin

The example below illustrates a low fare search including an optional Cabin element specified with the following information.  
Query Requirements:

-   Requested cabin service: F
-   Cabin defaulting, when applicable, for flights that do not have the requested cabin service available. Note, however, that at least one of flight on each requested segment must propose the requested cabin in order to be eligible.

Requesting

Specified Data

Request by number of seats occupied by passengers

PX

\# of seats for request

1

Request specific maximum number of recommendations to be returned

RC

Maximum # of recommendations requested

200

Adult Passenger type code

ADT

Passenger type code applicable to 1st passenger

1

Requested Cabin can be defaulted

RC

First cabin service requested at itinerary level

F

1st requested segment

1

Trip Departure city of Paris

PAR

Trip Arrival city of Miami

MIA

Itinerary Date 02 December, 2002

120202

## 5.4.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_ATCShopperMasterPricerCalendar xmlns="http://xml.amadeus.com/FMTCCQ\_13\_1\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> <unitNumberDetail> <numberOfUnits>200</numberOfUnits> <typeOfUnit>RC</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <travelFlightInfo> <cabinId> <cabinQualifier>RC</cabinQualifier> <cabin>F</cabin> </cabinId> </travelFlightInfo> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>PAR</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>MIA</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>120206</date> </firstDateTimeDetail> </timeDetails> </itinerary> <ticketChangeInfo> <ticketNumberDetails> <documentDetails> <number>0572187777498</number> </documentDetails> </ticketNumberDetails> <ticketRequestedSegments> <actionIdentification> <actionRequestCode>C</actionRequestCode> </actionIdentification> <connectPointDetails> <connectionDetails> <location>PAR</location> </connectionDetails> <connectionDetails> <location>MIA</location> </connectionDetails> </connectPointDetails> </ticketRequestedSegments> </ticketChangeInfo> </Ticket\_ATCShopperMasterPricerCalendar>

## 5.4.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.4.3 Possible Errors

Invalid Cabin Code

If the cabin code does not exist, the following error message is returned:  
"INVALID CABIN CODE".

Option Cannot be Applied at Requested Segment Level

If the cabin code is not requested at the itinerary level, the following error message is returned:  
"OPTION CANNOT BE APPLIED AT REQUESTED SEGMENT LEVEL".

* * *

## 5.5 Operation: Date Option - Range of Dates (Standard)

When a Range of plus and/or minus one Day is specified on a Requested Segment, search of flights applies on a Range of Dates of up to three days - the current day plus and/or minus 1 day. Search is only allowed on a Range of up to three days:

-   Either requested date plus 2 days maximum
-   Or requested date minus 2 days maximum
-   Or requested date plus and minus 1 day maximum

In the search, no preference is given to any of the dates. The only preference factor will be the price and the carrier variety. A good distribution and variety of recommendations is expected on the different days of the range.

The example below illustrates a low fare search including the optional Range of Dates element specified with the following information.  
Query Requirements:

-   Search the Departure date plus 1 day
-   Search the Arrival date minus 1 day

Requesting

Specified Data

Request by number of seats occupied by passengers

PX

\# of seats for request

1

Request specific maximum number of recommendations to be returned

RC

Maximum number of recommendations to be returned

200

Adult Passenger type code

ADT

Passenger type code applicable to 1st passenger

1

Applicable 1st Segment

1

Departure City Marseille

MRS

Arrival City Houston

HOU

Departure date 02Feb2002

200202

Identify date range search as Plus range

P

Number of days in range

1

Applicable 2nd segment

2

Force departure city same as arrival city in 1st segment reference

1

Identify city of Houston for departure city

HOU

Identify arrival city of Marseille

MRS

Arrival date 22Mar2002

220302

Identify date range search as Minus

M

Number of days in range

1

## 5.5.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_ATCShopperMasterPricerCalendar xmlns="http://xml.amadeus.com/FMTCCQ\_13\_1\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> <unitNumberDetail> <numberOfUnits>200</numberOfUnits> <typeOfUnit>RC</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <travelFlightInfo> <companyIdentity> <carrierQualifier>M</carrierQualifier> <carrierId>BA</carrierId> </companyIdentity> </travelFlightInfo> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>MRS</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>HOU</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>200204</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>P</rangeQualifier> <dayInterval>1</dayInterval> </rangeOfDate> </timeDetails> </itinerary> <itinerary> <requestedSegmentRef> <segRef>2</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>HOU</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>MRS</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>220304</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>M</rangeQualifier> <dayInterval>1</dayInterval> </rangeOfDate> </timeDetails> </itinerary> <ticketChangeInfo> <ticketNumberDetails> <documentDetails> <number>0572187777498</number> </documentDetails> </ticketNumberDetails> <ticketRequestedSegments> <actionIdentification> <actionRequestCode>C</actionRequestCode> </actionIdentification> <connectPointDetails> <connectionDetails> <location>MRS</location> </connectionDetails> <connectionDetails> <location>HOU</location> </connectionDetails> </connectPointDetails> </ticketRequestedSegments> <ticketRequestedSegments> <actionIdentification> <actionRequestCode>C</actionRequestCode> </actionIdentification> <connectPointDetails> <connectionDetails> <location>HOU</location> </connectionDetails> <connectionDetails> <location>MRS</location> </connectionDetails> </connectPointDetails> </ticketRequestedSegments> </ticketChangeInfo> </Ticket\_ATCShopperMasterPricerCalendar>

## 5.5.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.5.3 Possible Errors

Invalid Range of Dates Option

Search is only allowed on a Range of two days: i.e. the requested Date plus or minus one day. If a plus or minus more than one day option is specified or if a plus and minus one day option is specified, the entire entry is rejected with the following error message:  
"INVALID RANGE OF DATES OPTION".

* * *

## 5.6 Operation: Date Option - Trip Duration

The example below illustrates a calendar including the optional Trip duration Query Requirements:

-   Outbound departure Date 20SEP03 plus or minus 1 day
-   Inbound departure Date 27SEP03
-   Trip duration 7days

When trip duration is specified between two requested segments, only recommendations with combination of proposed segments (for these 2 Requested segments) respecting the trip duration are provided. A combination of proposed segments respects the trip duration when: The number of days between the departure date of the proposed segment covering the second requested segment and the departure date of the proposed segment covering the first requested segment are equal to the number of days specified in the trip duration option.

Example:

Itinerary

MEL-SYD-MEL

Outbound departure Date

20th Sept 04 plus or minus 1 days

Inbound departure Date

27th Sept 04

Trip Duration

7 days

For each of the 3 outbound dates, there is one valid inbound departure date: 19SEP04-26SEP04, 20SEP04-27SEP04, 21SEP04-28SEP04 are proposed.

Requesting Details

Specified Data

Request by number of seats occupied by passengers

PX

\# of seats for request

1

Adult Passenger type code

ADT

Passenger type code applicable to 1st passenger

1

Mandatory carrier requested at itinerary level

M

Mandatory carrier

QF

Applicable 1st segment

1

Departure city Melbourne

MEL

Arrival city Sydney

SYD

Trip Date (20th September, 2004)

200904

Identify date range search as Combined range (+ and -)

C

Number of days of flexibility

1

Trip Duration 7 days

7

Applicable on 2nd segment

2

Departure city Sydney

SYD

Arrival city of Melbourne

MEL

Trip date (27th September, 2004)

270904

## 5.6.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_ATCShopperMasterPricerCalendar xmlns="http://xml.amadeus.com/FMTCCQ\_13\_1\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>10</numberOfUnits> <typeOfUnit>RC</typeOfUnit> </unitNumberDetail> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <travelFlightInfo> <companyIdentity> <carrierQualifier>M</carrierQualifier> <carrierId>QF</carrierId> </companyIdentity> </travelFlightInfo> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>MEL</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>SYD</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>200904</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>1</dayInterval> </rangeOfDate> <tripDetails> <tripDuration>7</tripDuration> </tripDetails> </timeDetails> </itinerary> <itinerary> <requestedSegmentRef> <segRef>2</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>SYD</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>MEL</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>270904</date> </firstDateTimeDetail> </timeDetails> </itinerary> <ticketChangeInfo> <ticketNumberDetails> <documentDetails> <number>0572187777498</number> </documentDetails> </ticketNumberDetails> <ticketRequestedSegments> <actionIdentification> <actionRequestCode>C</actionRequestCode> </actionIdentification> <connectPointDetails> <connectionDetails> <location>MEL</location> </connectionDetails> <connectionDetails> <location>SYD</location> </connectionDetails> </connectPointDetails> </ticketRequestedSegments> <ticketRequestedSegments> <actionIdentification> <actionRequestCode>C</actionRequestCode> </actionIdentification> <connectPointDetails> <connectionDetails> <location>SYD</location> </connectionDetails> <connectionDetails> <location>MEL</location> </connectionDetails> </connectPointDetails> </ticketRequestedSegments> </ticketChangeInfo> </Ticket\_ATCShopperMasterPricerCalendar>

## 5.6.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.6.3 Possible Errors

Invalid Trip Duration option

If the trip duration exceeds 365 days, the entire entry is rejected with the following message:

INVALID TRIP DURATION OPTION

If the number of days between the date of the second requested segment and the date of the first requested segment does not equal to the number of days of the trip duration, the entire entry is rejected with the following message:

INVALID TRIP DURATION OPTION

* * *

## 5.7 Operation: Discount - Price only PTC

The process returns strictly recommendations with the requested passenger type, no defaulting is done.

## 5.7.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_ATCShopperMasterPricerCalendar xmlns="http://xml.amadeus.com/FMTCCQ\_13\_1\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>2</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <paxReference> <ptc>CH</ptc> <traveller> <ref>2</ref> </traveller> </paxReference> <fareOptions> <pricingTickInfo> <pricingTicketing> <priceType>PTC</priceType> </pricingTicketing> </pricingTickInfo> <feeIdDescription> <feeId> <feeType>NPS</feeType> <feeIdNumber>0</feeIdNumber> </feeId> </feeIdDescription> </fareOptions> <travelFlightInfo> <companyIdentity> <carrierQualifier>M</carrierQualifier> <carrierId>BA</carrierId> </companyIdentity> </travelFlightInfo> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>PAR</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>MIA</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>120202</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>3</dayInterval> </rangeOfDate> </timeDetails> </itinerary> <ticketChangeInfo> <ticketNumberDetails> <documentDetails> <number>0572187777498</number> </documentDetails> <documentDetails> <number>0572187777499</number> </documentDetails> </ticketNumberDetails> <ticketRequestedSegments> <actionIdentification> <actionRequestCode>KF</actionRequestCode> </actionIdentification> <connectPointDetails> <connectionDetails> <location>PAR</location> </connectionDetails> <connectionDetails> <location>MIA</location> </connectionDetails> </connectPointDetails> </ticketRequestedSegments> </ticketChangeInfo> </Ticket\_ATCShopperMasterPricerCalendar>

## 5.7.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.7.3 Possible Errors

See "Error Messages" section.

* * *

## 5.8 Operation: Fare Family Level Option

The Fare Family Level option (FFL) gives the ability to filter recommendations according to the Fare Family of the original ticket.The Fare Family Information option (FFI) is also necessary in input.

  
The FFL option has 3 possible values:

-   FFL:1 Only recommendations with the same Fare Family as the original ticket are returned.

-   FFL:2 For each Journey (group of proposed flights), the system returns one recommendation with a specific Fare Family: either the same Fare Family as the original ticket if found, or a higher Fare Family if found, or a lower Fare Family. If several journeys are returned, it is possible to get recommendations with different fare families in a reply. 

-   FFL:3 For each Journey (group of proposed flights), the system returns one recommendation with a specific Fare Family: either the same Fare Family as the original ticket if found, or a higher Fare Family if found. If several journeys are returned, it is possible to get recommendations with different fare families in a reply, but no recommendation with lower Fare Family can be returned.

## 5.8.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_ATCShopperMasterPricerCalendar xmlns="http://xml.amadeus.com/FMTCCQ\_13\_1\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>10</numberOfUnits> <typeOfUnit>RC</typeOfUnit> </unitNumberDetail> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fareOptions> <pricingTickInfo> <pricingTicketing> <priceType>RP</priceType> <priceType>RU</priceType> </pricingTicketing> </pricingTickInfo> <feeIdDescription> <feeId> <feeType>FFL</feeType> <feeIdNumber>1</feeIdNumber> </feeId> </feeIdDescription> </fareOptions> <travelFlightInfo></travelFlightInfo> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>NCE</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>LON</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>150219</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>1</dayInterval> </rangeOfDate> </timeDetails> </itinerary> <itinerary> <requestedSegmentRef> <segRef>2</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>LON</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>NCE</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>080319</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>1</dayInterval> </rangeOfDate> </timeDetails> </itinerary> <ticketChangeInfo> <ticketNumberDetails> <documentDetails> <number>1722400088988</number> </documentDetails> </ticketNumberDetails> <ticketRequestedSegments> <actionIdentification> <actionRequestCode>C</actionRequestCode> </actionIdentification> <connectPointDetails> <connectionDetails> <location>NCE</location> </connectionDetails> <connectionDetails> <location>LON</location> </connectionDetails> </connectPointDetails> </ticketRequestedSegments> <ticketRequestedSegments> <actionIdentification> <actionRequestCode>C</actionRequestCode> </actionIdentification> <connectPointDetails> <connectionDetails> <location>LON</location> </connectionDetails> <connectionDetails> <location>NCE</location> </connectionDetails> </connectPointDetails> </ticketRequestedSegments> </ticketChangeInfo> </Ticket\_ATCShopperMasterPricerCalendar>

## 5.8.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_ATCShopperMasterPricerCalendarReply xmlns="http://xml.amadeus.com/FMTCCR\_13\_1\_1A"> <replyStatus> <status> <advisoryTypeInfo>FQX</advisoryTypeInfo> </status> </replyStatus> <conversionRate> <conversionRateDetail> <currency>EUR</currency> </conversionRateDetail> <conversionRateDetail> <currency>EUR</currency> </conversionRateDetail> </conversionRate> <amountInfoForAllPax> <itineraryAmounts> <monetaryDetail> <amountType>ITO</amountType> <amount>207.33</amount> </monetaryDetail> <monetaryDetail> <amountType>ITA</amountType> <amount>61.33</amount> </monetaryDetail> <monetaryDetail> <amountType>NTA</amountType> <amount>0.00</amount> </monetaryDetail> </itineraryAmounts> </amountInfoForAllPax> <amountInfoPerPax> <paxRef> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </paxRef> <itineraryAmounts> <monetaryDetail> <amountType>ITO</amountType> <amount>207.33</amount> </monetaryDetail> <monetaryDetail> <amountType>ITA</amountType> <amount>61.33</amount> </monetaryDetail> </itineraryAmounts> </amountInfoPerPax> <flightIndex> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>1</ref> </flightProposal> <flightProposal> <ref>0110</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>6X</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>140219</dateOfDeparture> <timeOfDeparture>1100</timeOfDeparture> <dateOfArrival>140219</dateOfArrival> <timeOfArrival>1110</timeOfArrival> </productDateTime> <location> <locationId>NCE</locationId> </location> <location> <locationId>LHR</locationId> </location> <companyId> <marketingCarrier>6X</marketingCarrier> <operatingCarrier>6X</operatingCarrier> </companyId> <flightOrtrainNumber>8992</flightOrtrainNumber> <productDetail> <equipmentType>32S</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>2</ref> </flightProposal> <flightProposal> <ref>0110</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>6X</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>150219</dateOfDeparture> <timeOfDeparture>1100</timeOfDeparture> <dateOfArrival>150219</dateOfArrival> <timeOfArrival>1110</timeOfArrival> </productDateTime> <location> <locationId>NCE</locationId> </location> <location> <locationId>LHR</locationId> </location> <companyId> <marketingCarrier>6X</marketingCarrier> <operatingCarrier>6X</operatingCarrier> </companyId> <flightOrtrainNumber>8992</flightOrtrainNumber> <productDetail> <equipmentType>32S</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>3</ref> </flightProposal> <flightProposal> <ref>0110</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>6X</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>160219</dateOfDeparture> <timeOfDeparture>1100</timeOfDeparture> <dateOfArrival>160219</dateOfArrival> <timeOfArrival>1110</timeOfArrival> </productDateTime> <location> <locationId>NCE</locationId> </location> <location> <locationId>LHR</locationId> </location> <companyId> <marketingCarrier>6X</marketingCarrier> <operatingCarrier>6X</operatingCarrier> </companyId> <flightOrtrainNumber>8992</flightOrtrainNumber> <productDetail> <equipmentType>32S</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> </flightIndex> <flightIndex> <requestedSegmentRef> <segRef>2</segRef> </requestedSegmentRef> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>1</ref> </flightProposal> <flightProposal> <ref>0020</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>6X</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>070319</dateOfDeparture> <timeOfDeparture>1700</timeOfDeparture> <dateOfArrival>070319</dateOfArrival> <timeOfArrival>1820</timeOfArrival> </productDateTime> <location> <locationId>LHR</locationId> </location> <location> <locationId>NCE</locationId> </location> <companyId> <marketingCarrier>6X</marketingCarrier> <operatingCarrier>6X</operatingCarrier> </companyId> <flightOrtrainNumber>516</flightOrtrainNumber> <productDetail> <equipmentType>ERJ</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>2</ref> </flightProposal> <flightProposal> <ref>0020</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>6X</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>080319</dateOfDeparture> <timeOfDeparture>1700</timeOfDeparture> <dateOfArrival>080319</dateOfArrival> <timeOfArrival>1820</timeOfArrival> </productDateTime> <location> <locationId>LHR</locationId> </location> <location> <locationId>NCE</locationId> </location> <companyId> <marketingCarrier>6X</marketingCarrier> <operatingCarrier>6X</operatingCarrier> </companyId> <flightOrtrainNumber>516</flightOrtrainNumber> <productDetail> <equipmentType>ERJ</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>3</ref> </flightProposal> <flightProposal> <ref>0020</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>6X</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>090319</dateOfDeparture> <timeOfDeparture>1700</timeOfDeparture> <dateOfArrival>090319</dateOfArrival> <timeOfArrival>1820</timeOfArrival> </productDateTime> <location> <locationId>LHR</locationId> </location> <location> <locationId>NCE</locationId> </location> <companyId> <marketingCarrier>6X</marketingCarrier> <operatingCarrier>6X</operatingCarrier> </companyId> <flightOrtrainNumber>516</flightOrtrainNumber> <productDetail> <equipmentType>ERJ</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> </flightIndex> <recommendation> <itemNumber> <itemNumberId> <number>1</number> </itemNumberId> </itemNumber> <recPriceInfo> <monetaryDetail> <amount>206.45</amount> </monetaryDetail> <monetaryDetail> <amount>60.45</amount> </monetaryDetail> <monetaryDetail> <amountType>D</amountType> <amount>99.12</amount> </monetaryDetail> <monetaryDetail> <amountType>B</amountType> <amount>-0.88</amount> </monetaryDetail> <monetaryDetail> <amountType>P</amountType> <amount>100.00</amount> </monetaryDetail> <monetaryDetail> <amountType>A</amountType> <amount>99.12</amount> </monetaryDetail> <monetaryDetail> <amountType>C</amountType> <amount>0.00</amount> </monetaryDetail> <monetaryDetail> <amountType>M</amountType> <amount>306.45</amount> </monetaryDetail> <monetaryDetail> <amountType>N</amountType> <amount>60.45</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>3</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>3</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>3</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>3</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>3</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>3</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>206.45</totalFareAmount> <totalTaxAmount>60.45</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>6X</company> </codeShareDetails> <monetaryDetails> <amountType>D</amountType> <amount>99.12</amount> </monetaryDetails> <monetaryDetails> <amountType>B</amountType> <amount>-0.88</amount> </monetaryDetails> <monetaryDetails> <amountType>P</amountType> <amount>100.00</amount> </monetaryDetails> <monetaryDetails> <amountType>A</amountType> <amount>99.12</amount> </monetaryDetails> <monetaryDetails> <amountType>C</amountType> <amount>0.00</amount> </monetaryDetails> </paxFareDetail> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>Y</rbd> <cabin>M</cabin> </cabinProduct> <fareProductDetail> <fareBasis>Y6XCASE1</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> <fareDetails> <segmentRef> <segRef>2</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>Y</rbd> <cabin>M</cabin> </cabinProduct> <fareProductDetail> <fareBasis>Y6XCASE1</fareBasis> <passengerType>ADT</passengerType> <fareType>RP</fareType> </fareProductDetail> <breakPoint>Y</breakPoint> </productInformation> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> </paxFareProduct> </recommendation> </Ticket\_ATCShopperMasterPricerCalendarReply>

## 5.8.3 Possible Errors

See "Error Messages" section.

* * *

## 5.9 Operation: Fare Option - Currency Conversion

The currency conversion option may be combined with any other option.

It is mandatory that the ticketing price type be set to "CUC" to indicate a currency conversion request. It is mandatory for any query including the currency conversion option.

It is mandatory that a currency code be specified for the conversion. All price amounts for recommendations are converted in the requested Currency. There is no default currency for conversion, it must be specified.

The example below illustrates a low fare search including an optional Currency Conversion element specified with the following information.  
Query Requirements:

-   Currency to be returned: EUROS

## 5.9.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_ATCShopperMasterPricerCalendar xmlns="http://xml.amadeus.com/FMTCCQ\_13\_1\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fareOptions> <pricingTickInfo> <pricingTicketing> <priceType>CUC</priceType> </pricingTicketing> </pricingTickInfo> <conversionRate> <conversionRateDetail> <currency>USD</currency> </conversionRateDetail> </conversionRate> </fareOptions> <travelFlightInfo> <companyIdentity> <carrierQualifier>M</carrierQualifier> <carrierId>AA</carrierId> </companyIdentity> </travelFlightInfo> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>PAR</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>MIA</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>201210</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>3</dayInterval> </rangeOfDate> </timeDetails> </itinerary> <ticketChangeInfo> <ticketNumberDetails> <documentDetails> <number>0572187777498</number> </documentDetails> </ticketNumberDetails> <ticketRequestedSegments> <actionIdentification> <actionRequestCode>C</actionRequestCode> </actionIdentification> <connectPointDetails> <connectionDetails> <location>PAR</location> </connectionDetails> <connectionDetails> <location>MIA</location> </connectionDetails> </connectPointDetails> </ticketRequestedSegments> </ticketChangeInfo> </Ticket\_ATCShopperMasterPricerCalendar>

## 5.9.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.9.3 Possible Errors

See "Error Messages" section.

* * *

## 5.10 Operation: Fare Option - Discard Lower Total

Discard Lower Total is a parameter defined at input time in the search query. DLT is a fare option, relying on a set of criteria and attributes used to make negative balance taxes Non-Refundable, so if the taxes at reissue are cheaper than the issue taxes, the difference of the taxes will not be refunded - negative tax balance amount will not be included into Residual value tag <amountType> C neither considered in  <amountType> D of <recommendation> part.

Discard Lower Total can be combined with any other option. It is the responsibility of the user to ensure that combination of Discard Lower Total and other query options do not affect the functional coherence of the request.To allow consistency between ATC Master Pricer and ATC Reissue, DLT option was made available in ATC Reissue - RepricePNRWithBookingClass and Ticket\_ReissuePricingWithoutPNR as well. 

## 5.10.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_ATCShopperMasterPricerCalendar xmlns="http://xml.amadeus.com/FMTCCQ\_13\_1\_1A"> <originatorDetails> <deliveringSystem> <companyId>00</companyId> </deliveringSystem> <originIdentification> <originatorId>12345675</originatorId> <inHouseIdentification1>NCE6X0980</inHouseIdentification1> </originIdentification> <locationDetails> <trueLocationId>NCE</trueLocationId> </locationDetails> <cascadingSystem> <companyId>DCD003008002</companyId> </cascadingSystem> <originDetails> <codedCountry>FR</codedCountry> <codedCurrency>EUR</codedCurrency> <codedLanguage>EN</codedLanguage> </originDetails> <originator>ATCMP106</originator> </originatorDetails> <numberOfUnit> <unitNumberDetail> <numberOfUnits>10</numberOfUnits> <typeOfUnit>RC</typeOfUnit> </unitNumberDetail> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fareOptions> <pricingTickInfo> <pricingTicketing> <priceType>RP</priceType> <priceType>RU</priceType> <priceType>RW</priceType> <priceType>DLT</priceType> </pricingTicketing> </pricingTickInfo> <corporate> <corporateId> <corporateQualifier>RW</corporateQualifier> <identity>000001</identity> </corporateId> </corporate> <feeIdDescription> <feeId> <feeType>FFI</feeType> <feeIdNumber>1</feeIdNumber> </feeId> <feeId> <feeType>FFL</feeType> <feeIdNumber>1</feeIdNumber> </feeId> </feeIdDescription> </fareOptions> <travelFlightInfo></travelFlightInfo> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>CDG</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>LHR</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>011224</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>1</dayInterval> </rangeOfDate> </timeDetails> </itinerary> <ticketChangeInfo> <ticketNumberDetails> <documentDetails> <number>1722400171797</number> </documentDetails> </ticketNumberDetails> <ticketRequestedSegments> <actionIdentification> <actionRequestCode>C</actionRequestCode> </actionIdentification> <connectPointDetails> <connectionDetails> <location>FRA</location> </connectionDetails> <connectionDetails> <location>LHR</location> </connectionDetails> </connectPointDetails> </ticketRequestedSegments> </ticketChangeInfo> </Ticket\_ATCShopperMasterPricerCalendar>

## 5.10.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<message agency="1A" release="1" type="FMTCCR" version="13"> <replyStatus> <status> <advisoryTypeInfo>FQX</advisoryTypeInfo> </status> </replyStatus> <conversionRate> <conversionRateDetail> <currency>EUR</currency> </conversionRateDetail> <conversionRateDetail> <currency>EUR</currency> </conversionRateDetail> </conversionRate> <amountInfoForAllPax> <itineraryAmounts> <monetaryDetail> <amountType>ITO</amountType> <amount>233.65</amount> </monetaryDetail> <monetaryDetail> <amountType>ITA</amountType> <amount>63.65</amount> </monetaryDetail> <monetaryDetail> <amountType>NTA</amountType> <amount>0</amount> </monetaryDetail> </itineraryAmounts> </amountInfoForAllPax> <amountInfoPerPax> <paxRef> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </paxRef> <itineraryAmounts> <monetaryDetail> <amountType>ITO</amountType> <amount>233.65</amount> </monetaryDetail> <monetaryDetail> <amountType>ITA</amountType> <amount>63.65</amount> </monetaryDetail> </itineraryAmounts> </amountInfoPerPax> <flightIndex> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>1</ref> </flightProposal> <flightProposal> <ref>0400</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>6X</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>301124</dateOfDeparture> <timeOfDeparture>0800</timeOfDeparture> <dateOfArrival>301124</dateOfArrival> <timeOfArrival>0900</timeOfArrival> </productDateTime> <location> <locationId>ORY</locationId> </location> <location> <locationId>NCE</locationId> </location> <companyId> <marketingCarrier>6X</marketingCarrier> <operatingCarrier>6X</operatingCarrier> </companyId> <flightOrtrainNumber>2063</flightOrtrainNumber> <productDetail> <equipmentType>320</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>301124</dateOfDeparture> <timeOfDeparture>1000</timeOfDeparture> <dateOfArrival>301124</dateOfArrival> <timeOfArrival>1100</timeOfArrival> </productDateTime> <location> <locationId>NCE</locationId> </location> <location> <locationId>LHR</locationId> </location> <companyId> <marketingCarrier>6X</marketingCarrier> <operatingCarrier>6X</operatingCarrier> </companyId> <flightOrtrainNumber>1141</flightOrtrainNumber> <productDetail> <equipmentType>744</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>2</ref> </flightProposal> <flightProposal> <ref>0400</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>6X</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>011224</dateOfDeparture> <timeOfDeparture>0800</timeOfDeparture> <dateOfArrival>011224</dateOfArrival> <timeOfArrival>0900</timeOfArrival> </productDateTime> <location> <locationId>ORY</locationId> </location> <location> <locationId>NCE</locationId> </location> <companyId> <marketingCarrier>6X</marketingCarrier> <operatingCarrier>6X</operatingCarrier> </companyId> <flightOrtrainNumber>2063</flightOrtrainNumber> <productDetail> <equipmentType>320</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>011224</dateOfDeparture> <timeOfDeparture>1000</timeOfDeparture> <dateOfArrival>011224</dateOfArrival> <timeOfArrival>1100</timeOfArrival> </productDateTime> <location> <locationId>NCE</locationId> </location> <location> <locationId>LHR</locationId> </location> <companyId> <marketingCarrier>6X</marketingCarrier> <operatingCarrier>6X</operatingCarrier> </companyId> <flightOrtrainNumber>1141</flightOrtrainNumber> <productDetail> <equipmentType>744</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>3</ref> </flightProposal> <flightProposal> <ref>0400</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>6X</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>021224</dateOfDeparture> <timeOfDeparture>0800</timeOfDeparture> <dateOfArrival>021224</dateOfArrival> <timeOfArrival>0900</timeOfArrival> </productDateTime> <location> <locationId>ORY</locationId> </location> <location> <locationId>NCE</locationId> </location> <companyId> <marketingCarrier>6X</marketingCarrier> <operatingCarrier>6X</operatingCarrier> </companyId> <flightOrtrainNumber>2063</flightOrtrainNumber> <productDetail> <equipmentType>320</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>021224</dateOfDeparture> <timeOfDeparture>1000</timeOfDeparture> <dateOfArrival>021224</dateOfArrival> <timeOfArrival>1100</timeOfArrival> </productDateTime> <location> <locationId>NCE</locationId> </location> <location> <locationId>LHR</locationId> </location> <companyId> <marketingCarrier>6X</marketingCarrier> <operatingCarrier>6X</operatingCarrier> </companyId> <flightOrtrainNumber>1141</flightOrtrainNumber> <productDetail> <equipmentType>744</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> </flightIndex> <recommendation> <itemNumber> <itemNumberId> <number>1</number> </itemNumberId> </itemNumber> <recPriceInfo> <monetaryDetail> <amount>69.5</amount> </monetaryDetail> <monetaryDetail> <amount>46.5</amount> </monetaryDetail> <monetaryDetail> <amountType>D</amountType> <amount>-164.15</amount> </monetaryDetail> <monetaryDetail> <amountType>B</amountType> <amount>-17.15</amount> </monetaryDetail> <monetaryDetail> <amountType>P</amountType> <amount>0</amount> </monetaryDetail> <monetaryDetail> <amountType>A</amountType> <amount>0</amount> </monetaryDetail> <monetaryDetail> <amountType>C</amountType> <amount>164.15</amount> </monetaryDetail> <monetaryDetail> <amountType>M</amountType> <amount>69.5</amount> </monetaryDetail> <monetaryDetail> <amountType>N</amountType> <amount>46.5</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>2</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>3</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>69.5</totalFareAmount> <totalTaxAmount>46.5</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>6X</company> </codeShareDetails> <monetaryDetails> <amountType>D</amountType> <amount>-164.15</amount> </monetaryDetails> <monetaryDetails> <amountType>B</amountType> <amount>-17.15</amount> </monetaryDetails> <monetaryDetails> <amountType>P</amountType> <amount>0</amount> </monetaryDetails> <monetaryDetails> <amountType>A</amountType> <amount>0</amount> </monetaryDetails> <monetaryDetails> <amountType>C</amountType> <amount>164.15</amount> </monetaryDetails> </paxFareDetail> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>APM</textSubjectQualifier> <informationType>F PRIVATE RATES USED F CORPORATE NAME</informationType> </freeTextQualification> </pricingMessage> </fare> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>S</rbd> <cabin>M</cabin> </cabinProduct> <fareProductDetail> <fareBasis>SEOESPL</fareBasis> <passengerType>ADT</passengerType> <fareType>RX</fareType> </fareProductDetail> <corporateId>000001</corporateId> <breakPoint>N</breakPoint> </productInformation> </groupOfFares> <groupOfFares> <productInformation> <cabinProduct> <rbd>S</rbd> <cabin>M</cabin> </cabinProduct> <fareProductDetail> <fareBasis>SEOESPL</fareBasis> <passengerType>ADT</passengerType> <fareType>RX</fareType> </fareProductDetail> <corporateId>000001</corporateId> <breakPoint>Y</breakPoint> </productInformation> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> </paxFareProduct> </recommendation> <serviceFeesGrp> <serviceTypeInfo> <carrierFeeDetails> <type>FBA</type> </carrierFeeDetails> </serviceTypeInfo> <serviceCoverageInfoGrp> <itemNumberInfo> <itemNumber> <number>1</number> </itemNumber> </itemNumberInfo> <serviceCovInfoGrp> <paxRefInfo> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </paxRefInfo> <coveragePerFlightsInfo> <numberOfItemsDetails> <referenceQualifier>RS</referenceQualifier> <refNum>1</refNum> </numberOfItemsDetails> <lastItemsDetails> <refOfLeg>1</refOfLeg> </lastItemsDetails> <lastItemsDetails> <refOfLeg>2</refOfLeg> </lastItemsDetails> </coveragePerFlightsInfo> <refInfo> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> </refInfo> </serviceCovInfoGrp> </serviceCoverageInfoGrp> <globalMessageMarker> </globalMessageMarker> <freeBagAllowanceGrp> <freeBagAllownceInfo> <baggageDetails> <freeAllowance>3</freeAllowance> <quantityCode>N</quantityCode> </baggageDetails> </freeBagAllownceInfo> <itemNumberInfo> <itemNumberDetails> <number>1</number> </itemNumberDetails> </itemNumberInfo> </freeBagAllowanceGrp> </serviceFeesGrp> </message>

## 5.10.3 Possible Errors

See "Error Messages" section.

* * *

## 5.11 Operation: Fare Option - Expanded Parameter

The fare type - expanded parameter option is currently NOT available in ATC Master Pricer.

## 5.11.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.11.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.11.3 Possible Errors

See "Error Messages" section.

* * *

## 5.12 Operation: Fare Option - My Search - Fare Families

A Parameterized Fare Family is a set of specific parameters defined at input time in the search query. These parameterized fare families are set as options, relying on a set of criteria and attributes used to match recommendations to fare families. The parameterized fare family can be combined with any other option. It is the responsibility of the user to ensure that combination of fare families parameters and other query options does not affect the functional coherence of the request.

## 5.12.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_ATCShopperMasterPricerCalendar xmlns="http://xml.amadeus.com/FMTCCQ\_13\_1\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>10</numberOfUnits> <typeOfUnit>RC</typeOfUnit> </unitNumberDetail> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fareFamilies> <familyInformation> <fareFamilyname>FFAMILYAFY</fareFamilyname> <hierarchy>50</hierarchy> </familyInformation> <familyCriteria> <carrierId>AF</carrierId> <fareProductDetail> <fareBasis>Y-</fareBasis> </fareProductDetail> </familyCriteria> </fareFamilies> <fareFamilies> <familyInformation> <fareFamilyname>FFAMILYAFW</fareFamilyname> <hierarchy>50</hierarchy> </familyInformation> <familyCriteria> <carrierId>AF</carrierId> <fareProductDetail> <fareBasis>W-</fareBasis> </fareProductDetail> </familyCriteria> </fareFamilies> <fareOptions> <pricingTickInfo> <pricingTicketing> <priceType>RP</priceType> </pricingTicketing> </pricingTickInfo> </fareOptions> <travelFlightInfo> <companyIdentity> <carrierQualifier>M</carrierQualifier> <carrierId>AF</carrierId> </companyIdentity> </travelFlightInfo> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>PAR</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>NYC</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>121217</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>3</dayInterval> </rangeOfDate> </timeDetails> </itinerary> <ticketChangeInfo> <ticketNumberDetails> <documentDetails> <number>0578602249353</number> </documentDetails> </ticketNumberDetails> <ticketRequestedSegments> <actionIdentification> <actionRequestCode>C</actionRequestCode> </actionIdentification> <connectPointDetails> <connectionDetails> <location>NCE</location> </connectionDetails> <connectionDetails> <location>CDG</location> </connectionDetails> <connectionDetails> <location>JFK</location> </connectionDetails> </connectPointDetails> </ticketRequestedSegments> </ticketChangeInfo> </Ticket\_ATCShopperMasterPricerCalendar>

## 5.12.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.12.3 Possible Errors

See "Error Messages" section.

* * *

## 5.13 Operation: Fare Option - New Ticket Higher

New Ticket higher is a parameter defined at input time in the search query. NTH is a fare option, relying on a set of criteria and attributes used to match recommendations for which the combination of fare + surcharge (excluding taxes) is higher than or equal to the original. New Ticket Higher can be combined with any other option. It is the responsibility of the user to ensure that combination of New Ticket Higher and other query options do not affect the functional coherence of the request.

Example :

Original itinerary is  NYC-LON round-trip. 

Total amount of ticket= $750.00.

-   Fare component 1= 1/2 RT $800.00 for NYC-LON
-   Fare component 2  = 1/2 RT $700.00 for LON-NYC.

Passenger would like to change date of NYC-LON.

With NTH input option, new ticket must be $750.00 or higher.

Following fares are available for NYC-LON and LON-NYC:

Sector

Fare

½ RT Fare amount

NYC-LON

BAP

$350.00

NYC-LON

BAPNR

$350.00

NYC-LON

KAPNR

$300.00

LON-NYC

KHAP

$300.00

LON-NYC

BHAPNR

$350.00

LON-NYC

YHAPNR

$450.00

From the available fares, following recommendations can be returned:

-   BAP($350.00) and YHAPNR ($450.00) = $800.00
-   BAPNR ($350.00) and YHAPNR ($450.00)=$800.00
-   KAPNR($300.00) and YHAPNR ($450.00)=$750.00

The rest of combination of recommendations will be ignored as they are lower than $750.00.

## 5.13.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_ATCShopperMasterPricerCalendar xmlns="http://xml.amadeus.com/FMTCCQ\_13\_1\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>10</numberOfUnits> <typeOfUnit>RC</typeOfUnit> </unitNumberDetail> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fareOptions> <pricingTickInfo> <pricingTicketing> <priceType>RP</priceType> <priceType>RU</priceType> <priceType>RW</priceType> <priceType>NTH</priceType> </pricingTicketing> </pricingTickInfo> <corporate> <corporateId> <corporateQualifier>RW</corporateQualifier> <identity>000001</identity> </corporateId> </corporate> <feeIdDescription> <feeId> <feeType>FFI</feeType> <feeIdNumber>1</feeIdNumber> </feeId> <feeId> <feeType>FFL</feeType> <feeIdNumber>1</feeIdNumber> </feeId> </feeIdDescription> </fareOptions> <travelFlightInfo></travelFlightInfo> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>NCE</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>PAR</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>100719</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>1</dayInterval> </rangeOfDate> </timeDetails> </itinerary> <itinerary> <requestedSegmentRef> <segRef>2</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>PAR</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>NYC</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>100719</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>1</dayInterval> </rangeOfDate> </timeDetails> </itinerary> <ticketChangeInfo> <ticketNumberDetails> <documentDetails> <number>1722400201806</number> </documentDetails> </ticketNumberDetails> <ticketRequestedSegments> <actionIdentification> <actionRequestCode>C</actionRequestCode> </actionIdentification> <connectPointDetails> <connectionDetails> <location>NCE</location> </connectionDetails> <connectionDetails> <location>CDG</location> </connectionDetails> </connectPointDetails> </ticketRequestedSegments> <ticketRequestedSegments> <actionIdentification> <actionRequestCode>C</actionRequestCode> </actionIdentification> <connectPointDetails> <connectionDetails> <location>CDG</location> </connectionDetails> <connectionDetails> <location>NYC</location> </connectionDetails> </connectPointDetails> </ticketRequestedSegments> </ticketChangeInfo> </Ticket\_ATCShopperMasterPricerCalendar>

## 5.13.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_ATCShopperMasterPricerCalendarReply xmlns="http://xml.amadeus.com/FMTCCR\_13\_1\_1A"> <replyStatus> <status> <advisoryTypeInfo>FQX</advisoryTypeInfo> </status> </replyStatus> <conversionRate> <conversionRateDetail> <currency>EUR</currency> </conversionRateDetail> <conversionRateDetail> <currency>EUR</currency> </conversionRateDetail> </conversionRate> <familyInformation> <refNumber>1</refNumber> <fareFamilyname>ECOCDETE</fareFamilyname> <carrier>6X</carrier> </familyInformation> <familyInformation> <refNumber>2</refNumber> <fareFamilyname>FFATC1</fareFamilyname> <carrier>6X</carrier> </familyInformation> <amountInfoForAllPax> <itineraryAmounts> <monetaryDetail> <amountType>ITO</amountType> <amount>1356.55</amount> </monetaryDetail> <monetaryDetail> <amountType>ITA</amountType> <amount>302.55</amount> </monetaryDetail> <monetaryDetail> <amountType>NTA</amountType> <amount>0.00</amount> </monetaryDetail> </itineraryAmounts> </amountInfoForAllPax> <amountInfoPerPax> <paxRef> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </paxRef> <itineraryAmounts> <monetaryDetail> <amountType>ITO</amountType> <amount>1356.55</amount> </monetaryDetail> <monetaryDetail> <amountType>ITA</amountType> <amount>302.55</amount> </monetaryDetail> </itineraryAmounts> </amountInfoPerPax> <flightIndex> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>1</ref> </flightProposal> <flightProposal> <ref>0043</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>6X</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>100719</dateOfDeparture> <timeOfDeparture>1017</timeOfDeparture> <dateOfArrival>100719</dateOfArrival> <timeOfArrival>1100</timeOfArrival> </productDateTime> <location> <locationId>NCE</locationId> </location> <location> <locationId>CDG</locationId> </location> <companyId> <marketingCarrier>6X</marketingCarrier> <operatingCarrier>6X</operatingCarrier> </companyId> <flightOrtrainNumber>920</flightOrtrainNumber> <productDetail> <equipmentType>346</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> </flightIndex> <flightIndex> <requestedSegmentRef> <segRef>2</segRef> </requestedSegmentRef> <groupOfFlights> <propFlightGrDetail> <flightProposal> <ref>1</ref> </flightProposal> <flightProposal> <ref>0815</ref> <unitQualifier>EFT</unitQualifier> </flightProposal> <flightProposal> <ref>6X</ref> <unitQualifier>MCX</unitQualifier> </flightProposal> </propFlightGrDetail> <flightDetails> <flightInformation> <productDateTime> <dateOfDeparture>100719</dateOfDeparture> <timeOfDeparture>1530</timeOfDeparture> <dateOfArrival>100719</dateOfArrival> <timeOfArrival>1745</timeOfArrival> </productDateTime> <location> <locationId>CDG</locationId> </location> <location> <locationId>JFK</locationId> </location> <companyId> <marketingCarrier>6X</marketingCarrier> <operatingCarrier>6X</operatingCarrier> </companyId> <flightOrtrainNumber>1300</flightOrtrainNumber> <productDetail> <equipmentType>343</equipmentType> </productDetail> <addProductDetail> <electronicTicketing>Y</electronicTicketing> </addProductDetail> </flightInformation> </flightDetails> </groupOfFlights> </flightIndex> <recommendation> <itemNumber> <itemNumberId> <number>1</number> </itemNumberId> </itemNumber> <recPriceInfo> <monetaryDetail> <amount>1356.55</amount> </monetaryDetail> <monetaryDetail> <amount>302.55</amount> </monetaryDetail> <monetaryDetail> <amountType>D</amountType> <amount>0.00</amount> </monetaryDetail> <monetaryDetail> <amountType>B</amountType> <amount>0.00</amount> </monetaryDetail> <monetaryDetail> <amountType>P</amountType> <amount>0.00</amount> </monetaryDetail> <monetaryDetail> <amountType>A</amountType> <amount>0.00</amount> </monetaryDetail> <monetaryDetail> <amountType>C</amountType> <amount>0.00</amount> </monetaryDetail> <monetaryDetail> <amountType>M</amountType> <amount>1356.55</amount> </monetaryDetail> <monetaryDetail> <amountType>N</amountType> <amount>302.55</amount> </monetaryDetail> </recPriceInfo> <segmentFlightRef> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>S</refQualifier> <refNumber>1</refNumber> </referencingDetail> <referencingDetail> <refQualifier>B</refQualifier> <refNumber>1</refNumber> </referencingDetail> </segmentFlightRef> <paxFareProduct> <paxFareDetail> <paxFareNum>1</paxFareNum> <totalFareAmount>1356.55</totalFareAmount> <totalTaxAmount>302.55</totalTaxAmount> <codeShareDetails> <transportStageQualifier>V</transportStageQualifier> <company>6X</company> </codeShareDetails> <monetaryDetails> <amountType>D</amountType> <amount>0.00</amount> </monetaryDetails> <monetaryDetails> <amountType>B</amountType> <amount>0.00</amount> </monetaryDetails> <monetaryDetails> <amountType>P</amountType> <amount>0.00</amount> </monetaryDetails> <monetaryDetails> <amountType>A</amountType> <amount>0.00</amount> </monetaryDetails> <monetaryDetails> <amountType>C</amountType> <amount>0.00</amount> </monetaryDetails> <pricingTicketing> <priceType>R</priceType> </pricingTicketing> </paxFareDetail> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>PEN</textSubjectQualifier> <informationType>70</informationType> </freeTextQualification> <description>TICKETS ARE NON-REFUNDABLE</description> </pricingMessage> </fare> <fare> <pricingMessage> <freeTextQualification> <textSubjectQualifier>APM</textSubjectQualifier> <informationType>F</informationType> </freeTextQualification> <description>PRIVATE RATES USED F CORPORATE NAME AMADEUS</description> </pricingMessage> </fare> <fareDetails> <segmentRef> <segRef>1</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>M</rbd> <cabin>M</cabin> </cabinProduct> <fareProductDetail> <fareBasis>MIFE</fareBasis> <passengerType>ADT</passengerType> <fareType>RX</fareType> </fareProductDetail> <corporateId>000001</corporateId> <breakPoint>Y</breakPoint> </productInformation> <fareFamiliesRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> <majCabin> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> </majCabin> </fareDetails> <fareDetails> <segmentRef> <segRef>2</segRef> </segmentRef> <groupOfFares> <productInformation> <cabinProduct> <rbd>J</rbd> <cabin>C</cabin> </cabinProduct> <fareProductDetail> <fareBasis>JIFE</fareBasis> <passengerType>ADT</passengerType> <fareType>RX</fareType> </fareProductDetail> <corporateId>000001</corporateId> <breakPoint>Y</breakPoint> </productInformation> <fareFamiliesRef> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>2</refNumber> </referencingDetail> </fareFamiliesRef> </groupOfFares> <majCabin> <bookingClassDetails> <designator>C</designator> </bookingClassDetails> </majCabin> </fareDetails> </paxFareProduct> </recommendation> <serviceFeesGrp> <serviceTypeInfo> <carrierFeeDetails> <type>FBA</type> </carrierFeeDetails> </serviceTypeInfo> <serviceCoverageInfoGrp> <itemNumberInfo> <itemNumber> <number>1</number> </itemNumber> </itemNumberInfo> <serviceCovInfoGrp> <paxRefInfo> <travellerDetails> <referenceNumber>1</referenceNumber> </travellerDetails> </paxRefInfo> <coveragePerFlightsInfo> <numberOfItemsDetails> <referenceQualifier>RS</referenceQualifier> <refNum>1</refNum> </numberOfItemsDetails> <lastItemsDetails> <refOfLeg>1</refOfLeg> </lastItemsDetails> </coveragePerFlightsInfo> <coveragePerFlightsInfo> <numberOfItemsDetails> <referenceQualifier>RS</referenceQualifier> <refNum>2</refNum> </numberOfItemsDetails> <lastItemsDetails> <refOfLeg>1</refOfLeg> </lastItemsDetails> </coveragePerFlightsInfo> <refInfo> <referencingDetail> <refQualifier>F</refQualifier> <refNumber>1</refNumber> </referencingDetail> </refInfo> </serviceCovInfoGrp> </serviceCoverageInfoGrp> <globalMessageMarker></globalMessageMarker> <freeBagAllowanceGrp> <freeBagAllownceInfo> <baggageDetails> <freeAllowance>3</freeAllowance> <quantityCode>N</quantityCode> </baggageDetails> </freeBagAllownceInfo> <itemNumberInfo> <itemNumberDetails> <number>1</number> </itemNumberDetails> </itemNumberInfo> </freeBagAllowanceGrp> </serviceFeesGrp> </Ticket\_ATCShopperMasterPricerCalendarReply>

## 5.13.3 Possible Errors

See "Error Messages" section.

* * *

## 5.14 Operation: Fare Option - Price To Beat

This option may be combined with any other option.  
The Price to Beat amount can be composed of up to 9 digits, and the value must be higher than zero. No decimal placement is allowed in the input.

The currency of the Price to Beat is the requested Currency of Conversion if specified; otherwise, it is the default selling currency that is determined as per usual pricing rules.

If no Price to Beat is specified, all prices will be considered valid as a qualifying recommendation.

The example below illustrates a low fare search including the optional Price to Beat element specified with the following information:  
Query Requirements:

-   Price to Beat is 3500 Euros

## 5.14.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_ATCShopperMasterPricerCalendar xmlns="http://xml.amadeus.com/FMTCCQ\_13\_1\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <priceToBeat> <moneyInfo> <amount>3500</amount> </moneyInfo> </priceToBeat> <travelFlightInfo> <companyIdentity> <carrierQualifier>M</carrierQualifier> <carrierId>AA</carrierId> </companyIdentity> </travelFlightInfo> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>PAR</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>MIA</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>201201</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>3</dayInterval> </rangeOfDate> </timeDetails> </itinerary> <ticketChangeInfo> <ticketNumberDetails> <documentDetails> <number>0572187777498</number> </documentDetails> </ticketNumberDetails> <ticketRequestedSegments> <actionIdentification> <actionRequestCode>C</actionRequestCode> </actionIdentification> <connectPointDetails> <connectionDetails> <location>PAR</location> </connectionDetails> <connectionDetails> <location>MIA</location> </connectionDetails> </connectPointDetails> </ticketRequestedSegments> </ticketChangeInfo> </Ticket\_ATCShopperMasterPricerCalendar>

## 5.14.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.14.3 Possible Errors

See "Error Messages" section.

* * *

## 5.15 Operation: Fare Option - Selling Ticketing Cities Override

The requested Selling and/or a Ticketing Cities are used to determine applicable fares and currency for the recommendations. The selling and ticketing cities are applied from the requestor's system office ID city settings. If the selling or ticketing city override option is used, the cities specified will be utilized instead of the requestor Office-id City.

The city code specified must be a valid city code stored in the Amadeus System. Airport codes may not be utilized, unless the airport and city code are the same.

Examples:

Valid city code for Paris

PAR

Invalid city code to use for Paris

CDG

A maximum of one selling and one ticketing city may be specified applicable to the entire request. These options may be combined together and/or with any other option.

## 5.15.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_ATCShopperMasterPricerCalendar xmlns="http://xml.amadeus.com/FMTCCQ\_13\_1\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fareOptions> <pricingTickInfo> <sellingPoint> <locationId>PAR</locationId> </sellingPoint> <ticketingPoint> <locationId>PAR</locationId> </ticketingPoint> </pricingTickInfo> </fareOptions> <travelFlightInfo> <companyIdentity> <carrierQualifier>M</carrierQualifier> <carrierId>AA</carrierId> </companyIdentity> </travelFlightInfo> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>MRS</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>MIA</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>200106</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>3</dayInterval> </rangeOfDate> </timeDetails> </itinerary> <ticketChangeInfo> <ticketNumberDetails> <documentDetails> <number>0572187777498</number> </documentDetails> </ticketNumberDetails> <ticketRequestedSegments> <actionIdentification> <actionRequestCode>C</actionRequestCode> </actionIdentification> <connectPointDetails> <connectionDetails> <location>MRS</location> </connectionDetails> <connectionDetails> <location>MIA</location> </connectionDetails> </connectPointDetails> </ticketRequestedSegments> </ticketChangeInfo> </Ticket\_ATCShopperMasterPricerCalendar>

## 5.15.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.15.3 Possible Errors

See "Error Messages" section.

* * *

## 5.16 Operation: Fare Option - Type of Ticket (Electronic/Paper Ticket)

The paper and electronic ticket surcharge concept is driven from fare data filed by the airline.

Three new pricing options are available to allow the End User to link the fare priced and the type of Fare required.

'/PT' FOR PAPER TICKET  
'/ET' FOR ELETRONIC TICKET  
'/EP' FOR ELECTRONIC AND PAPER TICKET

**Note:** that Electronic Ticketing (ET) is not yet available in all markets orall carriers, for further details contact your local Amadeus Help Deskfor more information, to ensure that the Office Profile has beenmodified accordingly and the market where the airlines are situated canbenefit from Electronic Ticketing (ET).

Examples:

Request

Process

If no options are entered

System will propose both Electronic and Paper Ticket travel solutions

Request Electronic Ticket (ET)only

Electronic Ticket sent

Request PaperTicket (PT)only

Paper Ticket sent

The example below illustrates a low fare search for Electronic Ticket solutions only.  
Query Requirements:

-   Search to include Published Fares, non corporate Unifares and Coporate Fares (Coporate code 12345)

Requesting

Specified Data

Request by number of seats occupied by passengers

PX

\# of seats for request

1

Request specific maximum number of recommendations to be returned

RC

Maximum number of recommendations to be returned

200

Adult Passenger type code

ADT

Passenger type code applicable to 1st passenger

1

Identify Published fares Price type search

ET

Identify Corporate Unifares type search

RU

Identify the corporate number as Corporate Unifares

RZ

Associated corporate number to Corporate Unifares

012345

Applicable 1st segment

1

Departure city of Paris

PAR

Arrival city of Miami

MIA

Trip Date 20Dec,2001

201201

## 5.16.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_ATCShopperMasterPricerCalendar xmlns="http://xml.amadeus.com/FMTCCQ\_13\_1\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> <unitNumberDetail> <numberOfUnits>200</numberOfUnits> <typeOfUnit>RC</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fareOptions> <pricingTickInfo> <pricingTicketing> <priceType>ET</priceType> <priceType>RW</priceType> </pricingTicketing> </pricingTickInfo> <corporate> <corporateId> <corporateQualifier>RW</corporateQualifier> <identity>012345</identity> </corporateId> </corporate> </fareOptions> <travelFlightInfo> <companyIdentity> <carrierQualifier>M</carrierQualifier> <carrierId>BA</carrierId> </companyIdentity> </travelFlightInfo> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>PAR</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>MIA</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>201205</date> </firstDateTimeDetail> </timeDetails> </itinerary> <ticketChangeInfo> <ticketNumberDetails> <documentDetails> <number>0572187777498</number> </documentDetails> </ticketNumberDetails> <ticketRequestedSegments> <actionIdentification> <actionRequestCode>C</actionRequestCode> </actionIdentification> <connectPointDetails> <connectionDetails> <location>PAR</location> </connectionDetails> <connectionDetails> <location>MIA</location> </connectionDetails> </connectPointDetails> </ticketRequestedSegments> </ticketChangeInfo> </Ticket\_ATCShopperMasterPricerCalendar>

## 5.16.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.16.3 Possible Errors

See "Error Messages" section.

* * *

## 5.17 Operation: Fare Option - Unifare

If the specific types of fares are not requested, only the public fares will be searched.

This option may be combined with any other option.  
The following Unifares options are supported:

-   Published fares: RP
-   Unifares: RU
-   Corporate Unifares: RW with a mandatory Corporate number xxxxxx
-   Amadeus Nego: RN
-   Amadeus Corporate: RC with a mandatory Corporate number xxxxxx

Thesefare type searches may be combined, with the exception of Unifares (RU)or Corporate Unifares (RW) with an Amadeus Nego (RN) or Amadeus NegoCorporate (RC) in the same entry.

An associated corporate number must be specified for Corporate Unifares or Amadeus Nego Corporate requests.

**Note**: The search is restricted to one corporateid (Corporate identity) Value.

The example below illustrates a low fare search including the optional Unifares element with the following information.  
Query Requirements:

-   Search to include Published Fares, non corporate Unifares and Coporate Fares (Coporate code 12345)

## 5.17.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_ATCShopperMasterPricerCalendar xmlns="http://xml.amadeus.com/FMTCCQ\_13\_1\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fareOptions> <pricingTickInfo> <pricingTicketing> <priceType>RP</priceType> <priceType>RU</priceType> <priceType>RW</priceType> </pricingTicketing> </pricingTickInfo> <corporate> <corporateId> <corporateQualifier>RW</corporateQualifier> <identity>012345</identity> </corporateId> </corporate> </fareOptions> <travelFlightInfo> <companyIdentity> <carrierQualifier>M</carrierQualifier> <carrierId>BA</carrierId> </companyIdentity> </travelFlightInfo> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>PAR</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>MIA</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>201205</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>3</dayInterval> </rangeOfDate> </timeDetails> </itinerary> <ticketChangeInfo> <ticketNumberDetails> <documentDetails> <number>0572187777498</number> </documentDetails> </ticketNumberDetails> <ticketRequestedSegments> <actionIdentification> <actionRequestCode>C</actionRequestCode> </actionIdentification> <connectPointDetails> <connectionDetails> <location>PAR</location> </connectionDetails> <connectionDetails> <location>MIA</location> </connectionDetails> </connectPointDetails> </ticketRequestedSegments> </ticketChangeInfo> </Ticket\_ATCShopperMasterPricerCalendar>

## 5.17.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.17.3 Possible Errors

See "Error Messages" section.

* * *

## 5.18 Operation: Fee Option - Form of Payment

The form of payment option may be combined with any other option. A maximum of 3 forms of payment may be keyed in.

It is optional that the traveler indicates some forms of payment.

Possible values are AGT, CC, CA, CK, GR, MS, NR, PT, SGR, UN.

If one form of payment is specified, the amount is optional

If two forms of payment are specified, one amount is mandatory and one amount is optional.

If three forms of payment are specified, two amounts must be specified.

When the form of payment is specified as CC, a 6 digit bin number is required.

## 5.18.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_ATCShopperMasterPricerCalendar xmlns="http://xml.amadeus.com/FMTCCQ\_13\_1\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fareOptions> <pricingTickInfo> <pricingTicketing> <priceType>RU</priceType> <priceType>RP</priceType> </pricingTicketing> </pricingTickInfo> <formOfPayment> <formOfPaymentDetails> <type>CC</type> <chargedAmount>100</chargedAmount> <creditCardNumber>123456</creditCardNumber> </formOfPaymentDetails> <formOfPaymentDetails> <type>CC</type> <chargedAmount>200</chargedAmount> <creditCardNumber>234566</creditCardNumber> </formOfPaymentDetails> </formOfPayment> </fareOptions> <travelFlightInfo> <companyIdentity> <carrierQualifier>M</carrierQualifier> <carrierId>AF</carrierId> </companyIdentity> </travelFlightInfo> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>PAR</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>NCE</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>211207</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>3</dayInterval> </rangeOfDate> </timeDetails> </itinerary> <ticketChangeInfo> <ticketNumberDetails> <documentDetails> <number>0572187777498</number> </documentDetails> </ticketNumberDetails> <ticketRequestedSegments> <actionIdentification> <actionRequestCode>C</actionRequestCode> </actionIdentification> <connectPointDetails> <connectionDetails> <location>PAR</location> </connectionDetails> <connectionDetails> <location>MIA</location> </connectionDetails> </connectPointDetails> </ticketRequestedSegments> </ticketChangeInfo> </Ticket\_ATCShopperMasterPricerCalendar>

## 5.18.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.18.3 Possible Errors

See "Error Messages" section.

* * *

## 5.19 Operation: Flight Option - Airline (Include/Exclude)

The Include and Exclude options may be combined with any other option. Both the Include and Exclude options may be utilised in the same request. The Preferred option can be combined with any other option but the Preferred Connecting Point. And it cannot be specified at the same level (itinerary, same requested segment) as the Include/Exclude Airline options.

If a YY carrier code is used in the "Include" option at the same time as a specific Airline, then, this specific Airline can be proposed as Non-Stop or Direct flights and in connections with any other Airline.

If the "Exclude" option is utliised, the search process may propose any carrier except those carriers specified in the exclude parameter.

If "Include" option is combined with the "Exclude" option, the "Include" option must contain a YY carrier code for the processing of the Exclude option.

If not specified otherwise, no occurrence of an Exclude carrier as Non Stop, Direct and/or in any part of a connection is selected. In case of Joint Operation, both airline codes have to be checked. Marketing carrier and operating carrier will have to be checked.

Preferred Airline codes can be used to ensure that proposed segments considered by the system when building recommendations will include online solutions on those airlines. This option does not ensure that recommendations returned by Master Pricer will include such Proposed Segments as the objective is still to propose the lowest available recommendations.

Examples:

Request

Process

Include: AF, BA

AF and BA as non-stop/direct flights and for connections AF and BA online and interline.

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
-   AF is mandatory within the trip and my be combined with any other airline(YY) at the itinerary level (for each requested segment).
-   Exclusion of AA as for the proposed segments between Paris and Miami. BA preferred n proposed segments from Miami to NYC

## 5.19.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_ATCShopperMasterPricerCalendar xmlns="http://xml.amadeus.com/FMTCCQ\_13\_1\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> <unitNumberDetail> <numberOfUnits>200</numberOfUnits> <typeOfUnit>RC</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <travelFlightInfo> <companyIdentity> <carrierQualifier>M</carrierQualifier> <carrierId>AF</carrierId> <carrierId>YY</carrierId> </companyIdentity> </travelFlightInfo> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>PAR</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>MIA</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>201203</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>1</dayInterval> </rangeOfDate> </timeDetails> <flightInfo> <companyIdentity> <carrierQualifier>X</carrierQualifier> <carrierId>AA</carrierId> </companyIdentity> </flightInfo> </itinerary> <itinerary> <requestedSegmentRef> <segRef>2</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>MIA</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>NYC</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>251203</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>1</dayInterval> </rangeOfDate> </timeDetails> <flightInfo> <companyIdentity> <carrierQualifier>F</carrierQualifier> <carrierId>BA</carrierId> </companyIdentity> </flightInfo> </itinerary> <ticketChangeInfo> <ticketNumberDetails> <documentDetails> <number>0572187777498</number> </documentDetails> </ticketNumberDetails> <ticketRequestedSegments> <actionIdentification> <actionRequestCode>C</actionRequestCode> </actionIdentification> <connectPointDetails> <connectionDetails> <location>PAR</location> </connectionDetails> <connectionDetails> <location>MIA</location> </connectionDetails> </connectPointDetails> </ticketRequestedSegments> <ticketRequestedSegments> <actionIdentification> <actionRequestCode>C</actionRequestCode> </actionIdentification> <connectPointDetails> <connectionDetails> <location>MIA</location> </connectionDetails> <connectionDetails> <location>NYC</location> </connectionDetails> </connectPointDetails> </ticketRequestedSegments> </ticketChangeInfo> </Ticket\_ATCShopperMasterPricerCalendar>

## 5.19.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.19.3 Possible Errors

See "Error Messages" section.

* * *

## 5.20 Operation: Flight Option - City or Airport Indicator

This option indicates whether the included or excluded location indicates a city or an airport.

This option can also be requested at requested segment level. In this example, Las Angeles city is included in the search.

## 5.20.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_ATCShopperMasterPricerCalendar xmlns="http://xml.amadeus.com/FMTCCQ\_13\_1\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> <unitNumberDetail> <numberOfUnits>200</numberOfUnits> <typeOfUnit>RC</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <travelFlightInfo> <inclusionDetail> <inclusionIdentifier>M</inclusionIdentifier> <locationId>LAX</locationId> <airportCityQualifier>C</airportCityQualifier> </inclusionDetail> </travelFlightInfo> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>PAR</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>MIA</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>201203</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>1</dayInterval> </rangeOfDate> </timeDetails> </itinerary> <itinerary> <requestedSegmentRef> <segRef>2</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>MIA</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>NYC</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>251203</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>1</dayInterval> </rangeOfDate> </timeDetails> </itinerary> <ticketChangeInfo> <ticketNumberDetails> <documentDetails> <number>0572187777498</number> </documentDetails> </ticketNumberDetails> <ticketRequestedSegments> <actionIdentification> <actionRequestCode>C</actionRequestCode> </actionIdentification> <connectPointDetails> <connectionDetails> <location>PAR</location> </connectionDetails> <connectionDetails> <location>MIA</location> </connectionDetails> </connectPointDetails> </ticketRequestedSegments> <ticketRequestedSegments> <actionIdentification> <actionRequestCode>C</actionRequestCode> </actionIdentification> <connectPointDetails> <connectionDetails> <location>MIA</location> </connectionDetails> <connectionDetails> <location>NYC</location> </connectionDetails> </connectPointDetails> </ticketRequestedSegments> </ticketChangeInfo> </Ticket\_ATCShopperMasterPricerCalendar>

## 5.20.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.20.3 Possible Errors

See "Error Messages" section.

* * *

## 5.21 Operation: Flight Option - Connection Point (Include/Exclude)

Connection points must be segment specific. They may be combined with any other option, excluding the Non-Stop Flight Category - in which, an error message is not returned, but the connection point specified is ignored. Connecting Points to Include may be combined with the Connection Points to exclude, providing the same connection points are not used for both categories.

One additional specific combination restriction for preferred connection option: Preferred connecting point option can be combined with any other option except the "Non-Stop" Flight Category option and the preferred Airline option.

The connection points are 3 character IATA City or Airport codes. When an Include Connecting Point option is specified, all itineraries returned must at least go via this Connecting Point. When two Include Connecting Points are requested, proposed itineraries must at least go via both these Connecting Points in the order specified in the entry. The Change of Gauge and direct flights whose stops are in the requested point are not selected there.

Direct flights, Change of Gauge (COG) and Connections that have at least one stop at one of the exclude connect points are excluded. When two Excluded Connecting Points are specified, any itinerary going through one of those Connecting Points is excluded.

If an Exclude Connecting Point is specified at the same time as a Non-Stop Flight Category option, the system returns Non-Stop flights recommendations and ignores the Connecting Point requested.

If an airport code is specified as an Excluded connecting point, the alternate airports associated to the same city are candidates to the selection.

If a city code is specified as an Excluded connecting point, all Airports associated to that City are excluded.

When a preferred Connecting Point option is specified, the system will use it to build "Preferred" Proposed Segments. Those "Preferred" Proposed Segments will go via at least one of the Preferred Connecting Points requested. These preferred proposed segments will be considered by the system when building the recommendations (TheChange of Gauge and direct flights whose stops are in the requested point are not selected here.)

Preferred Connecting Point can be used to ensure that proposed segments considered by the system when building recommendations will include online solutions on those connecting point. This option does not ensure that recommendations returned by Master Pricer will include such Proposed Segments as the objective is still to propose the lowest available recommendations.

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

Exclude Connecting Point: LON, ROM

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

## 5.21.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_ATCShopperMasterPricerCalendar xmlns="http://xml.amadeus.com/FMTCCQ\_13\_1\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <travelFlightInfo> <companyIdentity> <carrierQualifier>M</carrierQualifier> <carrierId>BA</carrierId> </companyIdentity> </travelFlightInfo> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>PAR</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>MIA</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>241108</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>3</dayInterval> </rangeOfDate> </timeDetails> <flightInfo> <inclusionDetail> <inclusionIdentifier>M</inclusionIdentifier> <locationId>LGW</locationId> </inclusionDetail> <inclusionDetail> <inclusionIdentifier>M</inclusionIdentifier> <locationId>MAD</locationId> </inclusionDetail> </flightInfo> </itinerary> <ticketChangeInfo> <ticketNumberDetails> <documentDetails> <number>0572187777498</number> </documentDetails> </ticketNumberDetails> <ticketRequestedSegments> <actionIdentification> <actionRequestCode>C</actionRequestCode> </actionIdentification> <connectPointDetails> <connectionDetails> <location>PAR</location> </connectionDetails> <connectionDetails> <location>MIA</location> </connectionDetails> </connectPointDetails> </ticketRequestedSegments> </ticketChangeInfo> </Ticket\_ATCShopperMasterPricerCalendar>

## 5.21.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.21.3 Possible Errors

See "Error Messages" section.

* * *

## 5.22 Operation: Flight Option - Flight Category

The following Flight Categories are supported:

-   Non-Stop: N
-   Direct: D
-   Connecting: C

The rules defined in Availability apply regarding the definition of the Change of Gauge (COG) flights:

-   US market: the COG is considered as a Direct flight
-   EU market: the COG is included in the Connecting flights.

This information is usually obtained from the User Office Profile settings. However, due to current information limitations, the change of gauge will be always considered as a connecting flight within this function.

Warning: High-speed trains are considered as non-stop, but when returned their stops are provided like technical stops.

A maximum of 3 flight categories per requested segment may be specified and maybe combined with any other option, excluding an include connection point with a Non-Stop flight category.

The example below illustrates a low fare search including an optional FlightCategory element specified with the following information. Query Requirements:

-   Trip from Paris to New York
-   Non-Stop and Direct flight categories requested for entire trip
-   Direct Flight category for 2nd segment connection Miami to New York

## 5.22.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_ATCShopperMasterPricerCalendar xmlns="http://xml.amadeus.com/FMTCCQ\_13\_1\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <travelFlightInfo> <flightDetail> <flightType>N</flightType> <flightType>D</flightType> </flightDetail> </travelFlightInfo> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>PAR</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>MIA</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>201201</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>3</dayInterval> </rangeOfDate> </timeDetails> </itinerary> <itinerary> <requestedSegmentRef> <segRef>2</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>MIA</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>NYC</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>250102</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>3</dayInterval> </rangeOfDate> </timeDetails> <flightInfo> <flightDetail> <flightType>D</flightType> </flightDetail> </flightInfo> </itinerary> <ticketChangeInfo> <ticketNumberDetails> <documentDetails> <number>0572187777498</number> </documentDetails> </ticketNumberDetails> <ticketRequestedSegments> <actionIdentification> <actionRequestCode>C</actionRequestCode> </actionIdentification> <connectPointDetails> <connectionDetails> <location>PAR</location> </connectionDetails> <connectionDetails> <location>MIA</location> </connectionDetails> </connectPointDetails> </ticketRequestedSegments> <ticketRequestedSegments> <actionIdentification> <actionRequestCode>C</actionRequestCode> </actionIdentification> <connectPointDetails> <connectionDetails> <location>MIA</location> </connectionDetails> <connectionDetails> <location>NYC</location> </connectionDetails> </connectPointDetails> </ticketRequestedSegments> </ticketChangeInfo> </Ticket\_ATCShopperMasterPricerCalendar>

## 5.22.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.22.3 Possible Errors

See "Error Messages" section.

* * *

## 5.23 Operation: Flight Option - Time of Departure/Arrival

The Time option can be:

A Time of Departure: TD

Since a range of dates is requested, the TD applies on the first day of the range. The search for flights applies for the period between the TD on the first day of the range and 23h59 on the last day of the range.

A Time of Arrival: TA

Since a range of dates is requested, search for flights that arrive on the last day of the date range before the requested time, or any time the previous day(s).

Examples:

Request

Process

Date: 10SEP01 Time of Arrival: 10:00PM => Arrives by 10:00PM on the 10SEP01

Select flights that arrive between 00:00AM and 10:00PM on the 10SEP01.

Date: 15OCT01 Time of Departure: 10:00PM => Depart from 10:00PM on the 15OCT01

Select flights that arrive between 10:00PM and 11:59PM on the 15OCT01.

Range of dates: 23AUG01 and 24AUG01 Time of Departure: 06:00PM => Depart from 06:00PM on the 23AUG01

Select flights that depart between 6:00PM and 11:59PM on the 23AUG01 or on the 24AUG01, at any time.

Range of dates: 23AUG01 and 24AUG01 Time of Arrival: 06:00PM => Arrive by 06:00PM on the 24AUG01

Select flights that arrive between on 23AUG01 at any time or on 24AUG before 06:00PM.

The example below illustrates a Calendar request including the Times by Arrival and Departure elements specified with the following information. Query Requirements:

-   Departure from origin by 6pm on 23AUG07

Requesting Details

Specified Data

Request by number of seats occupied by passengers

PX

\# of seats for request

1

Adult Passenger type code

ADT

Passenger type code applicable to 1st passenger

1

Applicable 1st segment

1

Departure city of Paris

PAR

Arrival city of Miami

MIA

Identify search for departure by element

TD

Specify date for departure by 23Aug2007

250807

Specify search time for departure by 6pm

1200

Identify date range search as Combined range (+ and -)

C

Number of days of flexibility

3

## 5.23.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_ATCShopperMasterPricerCalendar xmlns="http://xml.amadeus.com/FMTCCQ\_13\_1\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>200</numberOfUnits> <typeOfUnit>RC</typeOfUnit> </unitNumberDetail> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fareFamilies> <familyInformation> <commercialFamilyDetails> <commercialFamily>-ALL-</commercialFamily> </commercialFamilyDetails> </familyInformation> </fareFamilies> <fareOptions> <pricingTickInfo> <pricingTicketing> <priceType>RU</priceType> <priceType>RP</priceType> </pricingTicketing> </pricingTickInfo> </fareOptions> <travelFlightInfo> <companyIdentity> <carrierQualifier>M</carrierQualifier> <carrierId>BA</carrierId> </companyIdentity> </travelFlightInfo> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>PAR</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>MIA</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <timeQualifier>TD</timeQualifier> <date>250807</date> <time>1200</time> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>3</dayInterval> </rangeOfDate> </timeDetails> </itinerary> <ticketChangeInfo> <ticketNumberDetails> <documentDetails> <number>0572187777498</number> </documentDetails> </ticketNumberDetails> <ticketRequestedSegments> <actionIdentification> <actionRequestCode>C</actionRequestCode> </actionIdentification> <connectPointDetails> <connectionDetails> <location>PAR</location> </connectionDetails> <connectionDetails> <location>MIA</location> </connectionDetails> </connectPointDetails> </ticketRequestedSegments> </ticketChangeInfo> </Ticket\_ATCShopperMasterPricerCalendar>

## 5.23.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.23.3 Possible Errors

Invalid Time Option

The error message "INVALID TIME OPTION" is returned in the following instances:

-   If an hour is specified without any indication about whether it means a Time of Departure or a Time of Arrival
-   If no time is specified after the Time of Departure or the Time of Arrival indicator

* * *

## 5.24 Operation: Flight Option - Time Window

This option must be used in conjunction with the Time of Departure or the Time of Arrival option. It allows the End-User to specify a range of acceptable hours.

Valid time range values range between 1 and 12.

The Time Window applies either on the Time of Departure or the Time of Arrival to restrict the search on the flights in the range of hours around (+ and -) the requested date and time.

When requested on a unique departure/arrival date, the time window may overlap to the previous/next day to fulfill the request.

The time window is interpreted on each day of the date range. Consequently, the time window may not extend the requested date range.

**Note:** The Time of Departure/Arrival option with a specified date is mandatory when using this option.

Request

Process

Date: 20AUG01 Time of Arrival: 10:00PM Time Window: 4 hours => Arrive around 10:00 PM on the 20AUG01

Select flights that arrive between 20AUG01 6:00PM and 21AUG01 02:00AM

Range of dates: 20SEP01 and 21SEP01 Time of Departure: 10:00AM Time Window: 5 hours => Depart around 10:00AM on the 20SEP01 or on the 21SEP01

Select flights that depart between 05:00 AM and 03:00 PM on each requested day, i.e. on 20SEP01 and on 21SEP01.

Range of dates: 23AUG01 and 24AUG01 Time of Arrival: 10:00PM Time Window: 4 hours => Arrive around 10:00PM on the 23AUG01 or on the 24AUG01

Select flights that arrive on 23AUG01 or on 24AUG01: between 6:00PM 23AUG01 and 02:00 AM on the 24AUG01  
or  
between 6:00PM and 11:59PM on the 24AUG01 NB: Flights between 00:00 AM and 02:00AM on the 23AUG01 are not considered.

Range of dates: 23AUG01 and 24AUG01 Time of Departure: 02:00AM Time Window: 4 hours => Depart around 02:00AM on the 23AUG01 or on the 24AUG01

Range of dates: 23AUG01 and 24AUG01 Time of Departure: 02:00AM Time Window: 4 hours => Depart around 02:00AM on the 23AUG01 or on the 24AUG01

The example below illustrates a Calendar request including the Times by Arrival and Departure elements specified with an optional time Window element with the following information.

Query Requirements:

-   Arrival on 23AUG07 at 10pm with time window of 4 hours.

Requesting Details

Specified Data

Request by number of seats occupied by passengers

PX

\# of seats for request

1

Adult Passenger type code

ADT

Passenger type code applicable to 1st passenger

1

Applicable 1st segment

1

Departure city of Paris

PAR

Arrival city of Miami

MIA

Identify time by arrival elementvTA

  

Specify arrival date by 23AUG07

230807

Identify date range search as Combined range (+ and -)

C

Number of days of flexibility

3

Specify arrival time by 10pm

2200

Specify applicable time window 4hours either side of 10pm

4

## 5.24.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_ATCShopperMasterPricerCalendar xmlns="http://xml.amadeus.com/FMTCCQ\_13\_1\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>200</numberOfUnits> <typeOfUnit>RC</typeOfUnit> </unitNumberDetail> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fareFamilies> <familyInformation> <commercialFamilyDetails> <commercialFamily>-ALL-</commercialFamily> </commercialFamilyDetails> </familyInformation> </fareFamilies> <fareOptions> <pricingTickInfo> <pricingTicketing> <priceType>RU</priceType> <priceType>RP</priceType> </pricingTicketing> </pricingTickInfo> </fareOptions> <travelFlightInfo> <companyIdentity> <carrierQualifier>M</carrierQualifier> <carrierId>BA</carrierId> </companyIdentity> </travelFlightInfo> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>PAR</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>MIA</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <timeQualifier>TA</timeQualifier> <date>230807</date> <time>2200</time> <timeWindow>4</timeWindow> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>3</dayInterval> </rangeOfDate> </timeDetails> </itinerary> <ticketChangeInfo> <ticketNumberDetails> <documentDetails> <number>0572187777498</number> </documentDetails> </ticketNumberDetails> <ticketRequestedSegments> <actionIdentification> <actionRequestCode>C</actionRequestCode> </actionIdentification> <connectPointDetails> <connectionDetails> <location>PAR</location> </connectionDetails> <connectionDetails> <location>MIA</location> </connectionDetails> </connectPointDetails> </ticketRequestedSegments> </ticketChangeInfo> </Ticket\_ATCShopperMasterPricerCalendar>

## 5.24.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.24.3 Possible Errors

Invalid Time Window Option

The time window value varies from 1 to 12 hours. If this check fails, the entire entry is rejected with the following message:

"INVALID TIME WINDOW OPTION"

Time of Departure/Arrival is Mandatory if Time Window Requested

If no Time of Departure/Arrival is specified, the entire request is rejected with the following error message:

"TIME OF DEPARTURE/ARRIVAL IS MANDATORY IF TIME WINDOW REQUESTED"

Date is Mandatory

If no date is specified, the entire request is rejected with the following error message:

"DATE IS MANDATORY"

* * *

## 5.25 Operation: Output Option - Rank in Journey Server

The End User has the ability to request the display of the rank of the Flight Solution within the list of Flight Solutions returned by Journey Server (numbering starts to 1) per requested segment.

For Calendar product, the rank is given per requested segment and per date.

## 5.25.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_ATCShopperMasterPricerCalendar xmlns="http://xml.amadeus.com/FMTCCQ\_13\_1\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>200</numberOfUnits> <typeOfUnit>RC</typeOfUnit> </unitNumberDetail> <unitNumberDetail> <numberOfUnits>2</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <paxReference> <ptc>CH</ptc> <traveller> <ref>2</ref> </traveller> </paxReference> <fareOptions> <pricingTickInfo> <pricingTicketing> <priceType>RJS</priceType> </pricingTicketing> </pricingTickInfo> <feeIdDescription> <feeId> <feeType>NPS</feeType> <feeIdNumber>0</feeIdNumber> </feeId> </feeIdDescription> </fareOptions> <travelFlightInfo> <companyIdentity> <carrierQualifier>M</carrierQualifier> <carrierId>BA</carrierId> </companyIdentity> </travelFlightInfo> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>PAR</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>MIA</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>120202</date> </firstDateTimeDetail> </timeDetails> </itinerary> <ticketChangeInfo> <ticketNumberDetails> <documentDetails> <number>0572187777498</number> </documentDetails> </ticketNumberDetails> <ticketRequestedSegments> <actionIdentification> <actionRequestCode>C</actionRequestCode> </actionIdentification> <connectPointDetails> <connectionDetails> <location>PAR</location> </connectionDetails> <connectionDetails> <location>MIA</location> </connectionDetails> </connectPointDetails> </ticketRequestedSegments> </ticketChangeInfo> </Ticket\_ATCShopperMasterPricerCalendar>

## 5.25.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.25.3 Possible Errors

See "Error Messages" section.

* * *

## 5.26 Operation: Output Options - Empty Cells Clarification in Calendar

When searching cheapest solution on a given itinerary on fixed or flexible dates, the search can have locally no solution for the following reasons:

-   no Proposed Segments has been found for a Requested Segment on a date
-   no available flight has been found for a Requested Segment on a date
-   no fare has been found for a date combination (for calendar products)
-   no journey has been found for a date combination (for calendar products)
-   cross over in a date combination

When the Empty Cells Clarification option is activated, and those cases are met during the search, the corresponding information is returned in the output message.

For dates out of the range of the request, for example when a trip duration is specified, no precision is given in the output message as it is the case for the default behaviour when this option is not activated.

## 5.26.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_ATCShopperMasterPricerCalendar xmlns="http://xml.amadeus.com/FMTCCQ\_13\_1\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>200</numberOfUnits> <typeOfUnit>RC</typeOfUnit> </unitNumberDetail> <unitNumberDetail> <numberOfUnits>2</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <paxReference> <ptc>CH</ptc> <traveller> <ref>2</ref> </traveller> </paxReference> <fareOptions> <pricingTickInfo> <pricingTicketing> <priceType>RU</priceType> <priceType>RP</priceType> <priceType>ECC</priceType> </pricingTicketing> </pricingTickInfo> <feeIdDescription> <feeId> <feeType>NPS</feeType> <feeIdNumber>0</feeIdNumber> </feeId> </feeIdDescription> </fareOptions> <travelFlightInfo> <companyIdentity> <carrierQualifier>M</carrierQualifier> <carrierId>BA</carrierId> </companyIdentity> </travelFlightInfo> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>PAR</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>MIA</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>120202</date> </firstDateTimeDetail> </timeDetails> </itinerary> <ticketChangeInfo> <ticketNumberDetails> <documentDetails> <number>0572187777498</number> </documentDetails> </ticketNumberDetails> <ticketRequestedSegments> <actionIdentification> <actionRequestCode>C</actionRequestCode> </actionIdentification> <connectPointDetails> <connectionDetails> <location>PAR</location> </connectionDetails> <connectionDetails> <location>MIA</location> </connectionDetails> </connectPointDetails> </ticketRequestedSegments> </ticketChangeInfo> </Ticket\_ATCShopperMasterPricerCalendar>

## 5.26.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.26.3 Possible Errors

See "Error Messages" section.

* * *

## 5.27 Operation: Tax Option - Withhold All Taxes and/or All Q Surcharges

The purpose of this option is to request recommendations without including any taxes and/or any Q Surcharges in the total recommendation price.

The recommendation calculation, sort and distribution are made without considering the excluded amount.

The total price of the recommendations is shown without including any Taxes and/or any Q Surcharges. The total price of the recommendations provided in the first occurrence of the EDIFACT segment "MON" and the total price per passenger type in the "totalFareAmount" field of the EDIFACT segment PFD do not include any taxes and/or any Q surcharges.

The excluded amount (total amount of taxes and/or total amount of Q surcharge) is provided in the second occurrence of the EDIFACT segment "MON" and in the "totalTaxAmount" field of the EDIFACT segment PFD.

Only one of the three options: Withhold all Taxes, Withhold all Q surcharges or Withhold all Taxes and all Q surcharges can be specified at the same time:

TXD+WT'

Withhold all Taxes.

TXD+WQ'

Withhold all Q surcharge.

TXD+WW'

Withhold all Taxes and all Q surcharges

Default processing: if this option is not requested, all Taxes and all Q Surcharges are included in the total price of the recommendations.

The example below illustrates a Calendar including the Withhold all Taxes option to request recommendations without including any taxes. Request example includes the following information:

Requesting Details

Specified Data

Request by number of seats occupied by passengers

PX

\# of seats for request

1

Passenger type code

ADT

Include Unifares fares in the search

RU

Include Published fares in the search

RP

include the Withhold all Taxes

WT

Applicable on 1st segment

1

Departure city of Paris

PAR

Arrival city of Helsinki

HEL

Trip Date (December 10th, 2007)

200907

Identify date range search as Combined range (+ and -)

C

Number of days of flexibility

3

## 5.27.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_ATCShopperMasterPricerCalendar xmlns="http://xml.amadeus.com/FMTCCQ\_13\_1\_1A"> <numberOfUnit> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>RC</typeOfUnit> </unitNumberDetail> <unitNumberDetail> <numberOfUnits>1</numberOfUnits> <typeOfUnit>PX</typeOfUnit> </unitNumberDetail> </numberOfUnit> <paxReference> <ptc>ADT</ptc> <traveller> <ref>1</ref> </traveller> </paxReference> <fareOptions> <pricingTickInfo> <pricingTicketing> <priceType>RU</priceType> <priceType>RP</priceType> </pricingTicketing> </pricingTickInfo> </fareOptions> <taxInfo> <withholdTaxSurcharge>WT</withholdTaxSurcharge> </taxInfo> <travelFlightInfo> <companyIdentity> <carrierQualifier>M</carrierQualifier> <carrierId>AA</carrierId> </companyIdentity> </travelFlightInfo> <itinerary> <requestedSegmentRef> <segRef>1</segRef> </requestedSegmentRef> <departureLocalization> <departurePoint> <locationId>PAR</locationId> </departurePoint> </departureLocalization> <arrivalLocalization> <arrivalPointDetails> <locationId>NYC</locationId> </arrivalPointDetails> </arrivalLocalization> <timeDetails> <firstDateTimeDetail> <date>200907</date> </firstDateTimeDetail> <rangeOfDate> <rangeQualifier>C</rangeQualifier> <dayInterval>3</dayInterval> </rangeOfDate> </timeDetails> </itinerary> </Ticket\_ATCShopperMasterPricerCalendar>

## 5.27.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.27.3 Possible Errors

See "Error Messages" section.

* * *