---
url: "https://developers.amadeus.com/api-library/soap/functional-doc/2/doc-read/7311?serviceVersion=16.1"
download_url: "https://developers.amadeus.com/PAS-EAS/api/download/comp/4d4ad2cb456c02633f463a055ab70584/7311/upload_9031102157841307832.html"
title: "HTML_UG_WBS_Air_MultiAvailability_SATRQT_16.1_019"
source: "amadeus"
service_id: "2"
service_name: "Air_MultiAvailability"
version: "19.1"
document_id: "7311"
doc_version: "16.1"
doc_type: "User guide"
file_format: "HTML"
scraped_at: "2026-07-15T10:17:42.432Z"
---
# Function: Air\_MultiAvailability

* * *

## 1 Overview

The Air\_MultiAvailability service is used by Amadeus customers (offline and online travel agencies, airline offices and corporations) to retrieve air and non-air availability, schedules, and timetable information.

## 1.1 Supported Operations

### Availability

The Amadeus Global Distribution System (GDS) stores flight availability for any airline holding a sales agreement with Amadeus. Flight availability details are returned for any flight with at least one seat available for sale or waitlist, based on availability request criteria specified.

  
An availability display starts with flights departing up to one hour before the time you specify. If you do not specify a time, the display starts with flights departing up to one hour before the current time (for the current date) or flights departing from 0000 (midnight) for a future date.

  
Flights up to 361 days in the future and up to 3 days in the past can be displayed. Flights in the past are returned without availability status codes.

### Schedules

The Amadeus Global Distribution System stores flight schedule information for anybody who submits the information, participating and non-participating airlines alike. You can see up to a maximum of 26 classes of services.

For airlines that have a sales agreement with Amadeus, the response includes all scheduled flights with availability status codes by class of service including classes of service that have no availability. you can sell or waitlist space from the schedule returned. For airlines that do not have a sales agreement with Amadeus, the response includes only non-stop and direct flights scheduled with class codes. There is no indication of class availability and therefore it is not possible to sell or waitlist space from the schedule returned.

  
As for an availability request, a schedule display starts with flights departing up to one hour before the time you specify. If you do not specify a time, the display starts with flights departing up to one hour before the current time (for the current date) or flights departing from 0000 (midnight) for a future date.  
A schedule response is very similar to an availability response. However, the following differences should be noted:

-   All scheduled classes of service are returned whether there is space available or not
-   The schedule list includes airlines who hold sales agreements as well as those who do not
-   It is not always possible to sell space from a schedule display

### Timetables

The Amadeus Global Distribution System stores flight timetable information for any airline who submits the information, participating and non-participating airlines alike. Timetable information specifies the following operation details specific to flight:

-   Frequency of flight operation
-   Effective and discontinue dates for each flight component
-   Terminal information
-   Aircraft type

Note: Classes of service are not returned in a timetable response and selling from a timetable is not possible.

### Options

Many options can be used to further customise your requests:

-   Specify class(es)\*
-   Specify cabin(s)\*
-   Specify connection point(s)
-   Specify unaccompanied minors (UM)\*
-   Specify day of the week
-   Multi-airport city, all airports or a specific airport
-   Seven-day search\*
-   Dual city pair\*
-   Carrier preferred display availability/schedule/timetable
-   Specify frequent flyer/corporate frequent flyer\*
-   Direct access carrier availability\*
-   Negotiated space svailability\*
-   Specific flight schedules\*
-   Forward scan\*
-   Pendulum scan\*
-   Specify corporation information\*
-   Specify point of commencement (POC)\*
-   Specify zone

Include or exclude specific airlines or alliances

You include or exclude up to 6 specific airlines or alliances and request flights operated by these airlines only, thus excluding codeshare flights.

Specify class(es)(\*)

You can shorten the display by requesting from one to three classes of service only. The class code is one of the 26 letters. It indicates that the class must be available for at least one leg in case of connections. 

Specify cabin(s)(\*)

If this option is entered then the flight validation process keeps only the flights which have at least one class of the requested cabin available.

Specify Connection points

You can either include or/and exclude up to 3 sets of connect points. A set of connect points defines a routing that can be composed of up to 5 preferred or excluded connection points.

Specify unaccompanied Minors(\*)

This option can be used to display flights that have UM quota available. The UM availability avoids the agent having to book and get a reject at sell time as the airline is automatically polled to get valid posting level for UM.

Specify day of the week

If a date is not specified when requesting an availability display the system assumes the current date as the default date at the point of departure. The date can be specified using a 2-letter code, such as MO, TU, WE, TH, FR, SA and SU.

Multi-airport city, all airports or a specific airport

If you specify the code for a city that is served by more than one airport, the availability display shows flights for all of those airports. To restrict availability to a single airport, use the airport code in your request entry rather than the city code.

Seven-day search

This is especially useful to search for the first flight available for sale within a seven-day period from the date you specify in your entry.  Especially useful for low density routes or when used with a class option to get the first date when this class is available.

Dual city pair

Availability/Schedules/Timetable display for two city-pairs at the same time. For example, return trips or open jaw like New York to Los Angeles and San Francisco to New York. Scrolling is allowed on any part of the dual display (first part, second part or both).

Carrier preferred display availability/schedule/timetable

You can request an availability display that is controlled by a target airline. This can be done for any airline that has a carrier preferred display agreement with Amadeus. By default a City Ticketing Office (CTO) or an Airport Ticketing Office (ATO) uses carrier preferred display. Carrier preferred availability shows flights that the airline has chosen to display for the route you specify in your entry. This type of availability is useful when the customer wants to travel only on that airline, or on other airlines or flights selected by the target carrier.  
A carrier-preferred display includes flights operated by the specified airline only, even if other airlines offer earlier or more direct flights. If the specified airline does not offer flights on the specified route, the display may show flights operated by the specified airline's affiliated airlines. The display can also include routings that, due to long elapse flying times or excessive mileage, would normally be excluded from a basic Amadeus availability display.  
You can also request an availability display for an alliance.

Specifiy frequent flyer/Corporate frequent flyer(\*)

Frequent flyer/corporate frequent flyer information can be part of the airline's availability biasing stategy. The card number and airline code information is filled by the booking interface and - if applicable - checked, enriched with the card details and forwarded to airline inventory during the flight validation process.

Direct access carrier availability

Direct access provides you with direct access to the reservation systems of major airlines. By accessing the airline's reservation system directly, you can see the last seat available on a flight, without the airline rejecting the booking after end transaction. Flights can be sold even if they are on request, or show a waitlist status on other types of Amadeus display. You can see up to a maximum of 26 classes of service in a direct access display.  
All Amadeus users can directly access the inventory systems of the airlines that have a direct access agreement with Amadeus.

Negotiated space availability(\*)

Negotiated space availability allows an owner of negotiated blocks to display information on his blocks present on all flights matching with his availability request. The following elements are displayed: Flight information, block status, Owner, Tour name, Tour reference, class, and exact posting of the class.

Specific flight availability(\*)

Contrary to standard availability which returns postings from 0 to 9, Specific flight availability return exact 3 digits postings for the specific flight number returned in input. This option is available only to specific system users with extended security agreements and no short sell is allowed.

Forward scan(\*)

It is similar to a seven-day search but can be extended to up to 31 days. This option is available only to specific system users with extended security agreements.

Pendulum scan(\*)

You can request the system to search from +3/-3 days around the requested date, to find the first day where flights are available for city pair and options specified.

Specify corporation information(\*)

You can provide corporation information  in the input of the availability request. This information may be sent by specific TMCs (Travel Management Company) to allow them to tailor their availability display per corporations.

Specify point of commencement (POC)  

You can provide POC information in the input of the availability request. This information may be sent to indicate the point of commencement and the date of commencement of the journey which can then be used for the availability calculation.

Specify Zone  

Use this option to request and availability or schedule request different from the default display for your market. Possible values are EU to force to Europe display or US to force to US DOT display. See Order of flights section below for more details.

Other options

-   Specify type of service: Non stop, direct, connections
-   Specify multimodal: Air only, rail only, non air
-   Specify online connection: connections on the same airline
-   Specify time window
-   Specify time format: 12 or 24 hour format
-   Specify number of seats: Oonly classes with enough space are returned\*
-   Specify redemption/group/staff/enriched staff\*
-   Specify travel preference management (TPM) display\*

\* not available for Timetable

### Order of flights

-   **Flight types**

There are three different types of flights:

-   Non-stop flight:  A flight with no intermediate stops, and the same flight number and aircraft.
-   Direct flight: A flight with intermediate stop(s), and the same flight number and aircraft.
-   Change-of-gauge: A connecting flight with intermediate  stop(s) and the same flight number, but with a change of aircraft type.

-   **Neutral display sorting  
    **

The Neutral display sorting depends on your market regulations.

  
\- Neutral EU display (World except North and Latin America)

1.  Non stop flights, by departure time (earliest to latest)
2.  Direct flights by elapsed flying time (EFT)
3.  Change of gauge, 2 and 3 segment connections by EFT
4.  Four segment connections by EFT
5.  Five segment connections by EFT

  
Note: For markets within the European Union and all associated territories, the neutral display must contain at least one rail segment on the first screen, if one exists. This solution is displayed at the end of the first screen, but otherwise does not affect the ordering rules above.

\- Neutral DOT display (North and Latin America)

1.  Non stop flights by departure time
2.  Change of equipment and Direct flights by elapsed flying time (EFT)
3.  Two segments online connections by EFT
4.  Two segments interline connections by EFT
5.  Three segments connections by EFT
6.  Four segments connections by EFT
7.  Five segments connections by EFT

Note: The Department of Transportation (DOT) display is applied automatically to all offices within the countries where DOT regulations apply. For offices outside the DOT-regulated countries, there is an optional office profile setting which can be used to apply the DOT display ordering.                                 

This neutral display can be biased using the carrier preferred display option.

The <typeOfRequest> can be set to AN, SN, TN in this case.

-   **Sorting by departure time**

Same logic as above applies. However flights in each category are sorted by departure time.

The <typeOfRequest> can be set to AD, SD, TD in this case.

-   **Sorting by arrival time**

Same logic as above applies. However, flights in each category are sorted by arrival time.

The <typeOfRequest> can be set to AA, SA, TA in this case.

-   **Sorting by elapsed travel time**

Same logic as above applies. However flights in each category are sorted by  Elapsed Travel time + (absolute value of the travel solution departure time minus the time requested if present).

The <typeOfRequest> can be set to AE, SE, TE in this case.

### Multi Modal Journey Planning

The multimodal journey planner proposes mixed air and rail travel solutions. A multimodal journey planner response is similar to a timetable response. However, the following differences should be noted:

-   Rail location codes format is used for rail segments
-   Classes of service are not returned

Several options exist specifically for multimodal journey planning:

-   Specify rail station context: each providers uses its own context for location codes
-   Specify train type (high-speed, regional, intercity, interregio)
-   Specify minimum or maximum connecting time
-   Specify layover time extension (percentage)
-   Specify maximum itinerary elapse time
-   Specify maximum number of air to rail or rail to air changes
-   Specify maximum number of services changes

## 1.2 Limitations

The Air\_MultiAvailability service returns up to 12 travel solutions per request (except for multimodal journey planning).

## 1.3 Unsupported Operations

None

## 1.4 Prerequisites

For the seven-day search and forward scan option the extended ownership security (EOS) must exist for the office as this controls the way that agents and offices can retrieve data created by other offices or corporations.

The 'specific flight' option requires an extended ownership security agreement between the office and the airline.

## 2 Building A Query

This is a high level explanation of the request content. For details on the exact syntax, see the Technical Reference document.

**Input**

**M/C**

**Comments**

Message action details

M

Identifies the type of request (availability, schedule, timetable request, Scrolling forward, backward or top)

Originator of request details

C

Specification of the originator details like Company code, office id, City code, Country code, currency, sign in.

Corporation  information

C

Corporation id.

POC

C

Journey Point of Commencement.

Frequent traveller /Corporate Frequent  traveller details

C

Traveller name and Frequent flyer and /or Corporate Frequent traveller card.

Request section (up to 2 requested segments)

Availability request details

M

Date, origin and destination of the availability request. 

Points Type details

C

Type of the board/off point (for example: Rail)

Board and Off details

C

List of Origin and destination airport codes in case of Multi-city request  (1…12).

Class option

C

Booking Class(es) requested for this availability request.

Connection option

C

Connecting point(s) via which the passenger(s) wishes to travel.

Number of seats option

C

Number of seats requested.

Airline or flight option

C

Airline(s) and flight number(s) to include or exclude.

Cabin option

C

Cabin class on which the passenger wishes to travel.

Other options

M

Defines the type of availability request (Flight specific, Group, Redemption, staff, Enriched Staff, Nego), sorting options (Neutral, by arrival time, elapsed time etc.), Biased or not, Direct access or not.

## 2.1 Sub Structure: Operation code

## 2.1.1 Description

The <messageActionDetail> element contains the child element <actionCode>, defining what is the operation to be triggered. See 5 Operations for details.

## 2.1.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<messageActionDetails> <functionDetails> <actionCode>44</actionCode> <businessFunction>1</businessFunction> </functionDetails> </messageActionDetails>

## 2.2 Sub Structure: Request section

## 2.2.1 Description

This section contains the details about the request to be processed such as board and off points, dates, times etc. For details on the exact syntax, see the Technical Reference document.

## 2.2.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<requestSection> <availabilityProductInfo> <availabilityDetails> <departureDate>151015</departureDate> </availabilityDetails> <departureLocationInfo> <cityAirport>SYD</cityAirport> </departureLocationInfo> <arrivalLocationInfo> <cityAirport>LON</cityAirport> </arrivalLocationInfo> </availabilityProductInfo> <availabilityOptions> <productTypeDetails> <typeOfRequest>TN</typeOfRequest> </productTypeDetails> </availabilityOptions> </requestSection>

## 3 Receiving A Reply

This is a high level explanation of the response content. For details on the exact syntax, see the Technical Reference document.

**Output**

**M/C**

**Comments**

Message action details

C

Identifies the type of response: availability, schedule or timetable.

Error or warning info

C

Warnings and errors found at process level.

Origin and destination details

C

Origin and destination for which Travel solutions have been requested.

City pair free flow text

C

Header lines of the availability output.

City pair error or warning

C

Warnings and errors found at city pair level (code and free text).

Flight details

C

List of travel solutions (Max 12 travel solutions).

Basic flight info

C

Flight information such as:

-   Departure date and time
-   Arrival date and time
-   Departure airport code
-   Arrival airport code
-   Marketing Airline code
-   Flight number
-   Operating airline code
-   Flight type

Points type details

C

Type of board/off point for multimodal solutions, such as rail.

Provider details

C

Provider details for multimodal solutions, such as rail provider name.

Availability information on classes

C

Availability posting for each class (0..26 for each flight item).

List of special service requests (SSR) at leg level

C

List of flight leg special service requests from inventory.

Information at leg cabin level

C

It includes cabin availability, capacity, and different counters stored on Inventory side.

Additional product details

C

It includes aircraft type, number of stops, Departure and arrival terminals, facilities indicators (meal, in-flight services etc.) and also the distribution method adopted for the flight (e.g. : O for Pyton, F for TravelFusion, etc.).

ACV information

C

Aircraft configuration version (ACV) code. Sent if authorised by the airline.

Saleable configuration information

C

Saleable configuration code. Sent if authorised by the airline.

Traffic restrictions

C

Traffic restrictions applied on a segment. For example P for 'Pending government approval'.

Cabin/class services

C

Free text service, code, applicable class or cabin. Sent if authorised by the airline. See sub-structure description below.

Flight error or warning

C

Warnings and Errors found at flight level.

## 3.1 Sub Structure: Cabin/class services

## 3.1.1 Description

This section is only used for Altea Inventory airlines which have subscribed to free format flight fact rules and for authorised office IDs.

<cabinClassServiceList> includes :

-   The type of service displayed: <serviceType>, FF for free format flight facts
-   Service level: optional, K if the service is applicable to specific cabin(s), C if the service is applicable to specific class(es)
-   Service: fact code for free format flight fact
-   Description: free format flight fact as filed in the FFT rule
-   Designator: optional. Cabin(s) or Ccass(es) to which the service applies

## 3.1.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<cabinClassServiceList> <servicetype>FF</servicetype> <cabinClassInfo> <level>K</level> <service>F01</service> <description>SUITE</description> <designator>F</designator> <level>K</level> <service>F02</service> <description> SHELL SEAT</description> <designator>W</designator> <designator>Y</designator> <level>C</level> <service>F03</service> <description> EARN 1000 EXTRA MILES</description> <designator>G</designator> </cabinClassInfo> </cabinClassServiceList>

* * *

## 3.2 Sub Structure: Reply

## 3.2.1 Description

The reply contains the travel solutions found for the request and options included.

## 3.2.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_MultiAvailabilityReply xmlns="http://xml.amadeus.com/SATRSP\_16\_1\_1A"> <messageActionDetails> <functionDetails> <businessFunction>1</businessFunction> <actionCode>45</actionCode> </functionDetails> <responseType>3</responseType> </messageActionDetails> <singleCityPairInfo> <locationDetails> <origin>LON</origin> <destination>SYD</destination> </locationDetails> <cityPairFreeFlowText> <freeTextQualification> <codedIndicator>4</codedIndicator> <typeOfInfo>50</typeOfInfo> </freeTextQualification> <freeText></freeText> <freeText></freeText> <freeText> AMADEUS AVAILABILITY - AN </freeText> <freeText></freeText> <freeText> 111 TU 15OCT 0000</freeText> </cityPairFreeFlowText> <cityPairFreeFlowText> <freeTextQualification> <codedIndicator>4</codedIndicator> <typeOfInfo>OFD</typeOfInfo> </freeTextQualification> <freeText>SYD SYDNEY.AUNS</freeText> </cityPairFreeFlowText> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>151013</departureDate> <departureTime>2130</departureTime> <arrivalDate>171013</arrivalDate> <arrivalTime>0610</arrivalTime> </flightDetails> <departureLocation> <cityAirport>LHR</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>SYD</cityAirport> </arrivalLocation> <marketingCompany> <identifier>QF</identifier> </marketingCompany> <flightIdentification> <number>2</number> </flightIdentification> <productTypeDetail> <productIndicators>D</productIndicators> <productIndicators>ET</productIndicators> </productTypeDetail> <lineItemNumber>1</lineItemNumber> </basicFlightInfo> <infoOnClasses> <productClassDetail> <serviceClass>F</serviceClass> <availabilityStatus>4</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>A</serviceClass> <availabilityStatus>3</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>J</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>C</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>D</serviceClass> <availabilityStatus>1</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>I</serviceClass> <availabilityStatus>L</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>W</serviceClass> <availabilityStatus>1</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>R</serviceClass> <availabilityStatus>L</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>T</serviceClass> <availabilityStatus>L</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Y</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>B</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>H</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>K</serviceClass> <availabilityStatus>1</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>M</serviceClass> <availabilityStatus>L</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>L</serviceClass> <availabilityStatus>L</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>G</serviceClass> <availabilityStatus>L</availabilityStatus> </productClassDetail> </infoOnClasses> <additionalFlightInfo> <flightDetails> <typeOfAircraft>388</typeOfAircraft> <numberOfStops>1</numberOfStops> <legDuration>2240</legDuration> </flightDetails> <departureStation> <terminal>3</terminal> </departureStation> <arrivalStation> <terminal>1</terminal> </arrivalStation> <productFacilities> <type>1A</type> </productFacilities> <productFacilities> <type>LSA</type> </productFacilities> <productFacilities> <type>M</type> </productFacilities> </additionalFlightInfo> </flightInfo> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>151013</departureDate> <departureTime>2115</departureTime> <arrivalDate>171013</arrivalDate> <arrivalTime>0610</arrivalTime> </flightDetails> <departureLocation> <cityAirport>LHR</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>SYD</cityAirport> </arrivalLocation> <marketingCompany> <identifier>BA</identifier> </marketingCompany> <flightIdentification> <number>15</number> </flightIdentification> <productTypeDetail> <productIndicators>D</productIndicators> <productIndicators>ET</productIndicators> </productTypeDetail> <lineItemNumber>2</lineItemNumber> </basicFlightInfo> <infoOnClasses> <productClassDetail> <serviceClass>F</serviceClass> <availabilityStatus>6</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>A</serviceClass> <availabilityStatus>4</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>J</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>C</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>D</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>R</serviceClass> <availabilityStatus>5</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>I</serviceClass> <availabilityStatus>1</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>W</serviceClass> <availabilityStatus>5</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Y</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>B</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>H</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>K</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>M</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>L</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>G</serviceClass> <availabilityStatus>L</availabilityStatus> </productClassDetail> </infoOnClasses> <additionalFlightInfo> <flightDetails> <typeOfAircraft>777</typeOfAircraft> <numberOfStops>1</numberOfStops> <legDuration>2255</legDuration> </flightDetails> <departureStation> <terminal>5</terminal> </departureStation> <arrivalStation> <terminal>1</terminal> </arrivalStation> <productFacilities> <type>1A</type> </productFacilities> <productFacilities> <type>LSA</type> </productFacilities> <productFacilities> <type>M</type> </productFacilities> </additionalFlightInfo> </flightInfo> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>151013</departureDate> <departureTime>2230</departureTime> <arrivalDate>171013</arrivalDate> <arrivalTime>0735</arrivalTime> </flightDetails> <departureLocation> <cityAirport>LHR</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>SYD</cityAirport> </arrivalLocation> <marketingCompany> <identifier>VS</identifier> </marketingCompany> <flightIdentification> <number>200</number> </flightIdentification> <productTypeDetail> <productIndicators>D</productIndicators> <productIndicators>ET</productIndicators> </productTypeDetail> <lineItemNumber>3</lineItemNumber> </basicFlightInfo> <infoOnClasses> <productClassDetail> <serviceClass>J</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>C</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>D</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>I</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Z</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>W</serviceClass> <availabilityStatus>R</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>S</serviceClass> <availabilityStatus>0</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>H</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Y</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>B</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>R</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>L</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>U</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>M</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>E</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Q</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>X</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>N</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>O</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <additionalFlightInfo> <flightDetails> <typeOfAircraft>346</typeOfAircraft> <numberOfStops>1</numberOfStops> <legDuration>2305</legDuration> </flightDetails> <departureStation> <terminal>3</terminal> </departureStation> <arrivalStation> <terminal>1</terminal> </arrivalStation> <productFacilities> <type>AS</type> </productFacilities> <productFacilities> <type>DA</type> </productFacilities> <productFacilities> <type>M</type> </productFacilities> </additionalFlightInfo> </flightInfo> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>151013</departureDate> <departureTime>2215</departureTime> <arrivalDate>161013</arrivalDate> <arrivalTime>0805</arrivalTime> </flightDetails> <departureLocation> <cityAirport>LHR</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>DXB</cityAirport> </arrivalLocation> <marketingCompany> <identifier>EK</identifier> </marketingCompany> <flightIdentification> <number>6</number> </flightIdentification> <productTypeDetail> <productIndicators>S</productIndicators> <productIndicators>ET</productIndicators> </productTypeDetail> <lineItemNumber>4</lineItemNumber> </basicFlightInfo> <infoOnClasses> <productClassDetail> <serviceClass>F</serviceClass> <availabilityStatus>4</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>A</serviceClass> <availabilityStatus>4</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>J</serviceClass> <availabilityStatus>7</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>C</serviceClass> <availabilityStatus>3</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Y</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>E</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>R</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>W</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>M</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>B</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>U</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>K</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Q</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>L</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>T</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>V</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>X</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <additionalFlightInfo> <flightDetails> <typeOfAircraft>388</typeOfAircraft> <numberOfStops>0</numberOfStops> </flightDetails> <departureStation> <terminal>3</terminal> </departureStation> <arrivalStation> <terminal>3</terminal> </arrivalStation> <productFacilities> <type>1A</type> </productFacilities> <productFacilities> <type>DA</type> </productFacilities> <productFacilities> <type>LSA</type> </productFacilities> <productFacilities> <type>M</type> </productFacilities> </additionalFlightInfo> </flightInfo> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>161013</departureDate> <departureTime>0920</departureTime> <arrivalDate>171013</arrivalDate> <arrivalTime>0610</arrivalTime> </flightDetails> <departureLocation> <cityAirport>DXB</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>SYD</cityAirport> </arrivalLocation> <marketingCompany> <identifier>EK</identifier> </marketingCompany> <operatingCompany> <identifier>QF</identifier> </operatingCompany> <flightIdentification> <number>5002</number> </flightIdentification> <productTypeDetail> <productIndicators>E</productIndicators> <productIndicators>701</productIndicators> <productIndicators>ET</productIndicators> </productTypeDetail> </basicFlightInfo> <infoOnClasses> <productClassDetail> <serviceClass>F</serviceClass> <availabilityStatus>4</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>A</serviceClass> <availabilityStatus>4</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>J</serviceClass> <availabilityStatus>7</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>C</serviceClass> <availabilityStatus>0</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>I</serviceClass> <availabilityStatus>0</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>O</serviceClass> <availabilityStatus>0</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Y</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>E</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>R</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>W</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>M</serviceClass> <availabilityStatus>0</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>B</serviceClass> <availabilityStatus>0</availabilityStatus> </productClassDetail> </infoOnClasses> <additionalFlightInfo> <flightDetails> <typeOfAircraft>388</typeOfAircraft> <numberOfStops>0</numberOfStops> <legDuration>2155</legDuration> </flightDetails> <departureStation> <terminal>3</terminal> </departureStation> <arrivalStation> <terminal>1</terminal> </arrivalStation> <productFacilities> <type>1A</type> </productFacilities> <productFacilities> <type>DA</type> </productFacilities> <productFacilities> <type>O</type> </productFacilities> <productFacilities> <type>LSA</type> </productFacilities> </additionalFlightInfo> </flightInfo> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>151013</departureDate> <departureTime>2215</departureTime> <arrivalDate>161013</arrivalDate> <arrivalTime>0805</arrivalTime> </flightDetails> <departureLocation> <cityAirport>LHR</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>DXB</cityAirport> </arrivalLocation> <marketingCompany> <identifier>QF</identifier> </marketingCompany> <operatingCompany> <identifier>EK</identifier> </operatingCompany> <flightIdentification> <number>8006</number> </flightIdentification> <productTypeDetail> <productIndicators>S</productIndicators> <productIndicators>701</productIndicators> <productIndicators>ET</productIndicators> </productTypeDetail> <lineItemNumber>5</lineItemNumber> </basicFlightInfo> <infoOnClasses> <productClassDetail> <serviceClass>F</serviceClass> <availabilityStatus>2</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>A</serviceClass> <availabilityStatus>2</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>J</serviceClass> <availabilityStatus>7</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>C</serviceClass> <availabilityStatus>7</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>D</serviceClass> <availabilityStatus>7</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>I</serviceClass> <availabilityStatus>7</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Y</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>B</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>H</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>K</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>M</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>L</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>V</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>S</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>N</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Q</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>O</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <additionalFlightInfo> <flightDetails> <typeOfAircraft>388</typeOfAircraft> <numberOfStops>0</numberOfStops> </flightDetails> <departureStation> <terminal>3</terminal> </departureStation> <arrivalStation> <terminal>3</terminal> </arrivalStation> <productFacilities> <type>1A</type> </productFacilities> <productFacilities> <type>LSA</type> </productFacilities> <productFacilities> <type>M</type> </productFacilities> </additionalFlightInfo> </flightInfo> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>161013</departureDate> <departureTime>0920</departureTime> <arrivalDate>171013</arrivalDate> <arrivalTime>0610</arrivalTime> </flightDetails> <departureLocation> <cityAirport>DXB</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>SYD</cityAirport> </arrivalLocation> <marketingCompany> <identifier>QF</identifier> </marketingCompany> <flightIdentification> <number>2</number> </flightIdentification> <productTypeDetail> <productIndicators>E</productIndicators> <productIndicators>ET</productIndicators> </productTypeDetail> </basicFlightInfo> <infoOnClasses> <productClassDetail> <serviceClass>F</serviceClass> <availabilityStatus>6</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>A</serviceClass> <availabilityStatus>4</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>J</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>C</serviceClass> <availabilityStatus>L</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>D</serviceClass> <availabilityStatus>L</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>I</serviceClass> <availabilityStatus>L</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>W</serviceClass> <availabilityStatus>L</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>R</serviceClass> <availabilityStatus>L</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>T</serviceClass> <availabilityStatus>L</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Y</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>B</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>H</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>K</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>M</serviceClass> <availabilityStatus>L</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>L</serviceClass> <availabilityStatus>L</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>G</serviceClass> <availabilityStatus>L</availabilityStatus> </productClassDetail> </infoOnClasses> <additionalFlightInfo> <flightDetails> <typeOfAircraft>388</typeOfAircraft> <numberOfStops>0</numberOfStops> <legDuration>2155</legDuration> </flightDetails> <departureStation> <terminal>3</terminal> </departureStation> <arrivalStation> <terminal>1</terminal> </arrivalStation> <productFacilities> <type>1A</type> </productFacilities> <productFacilities> <type>LSA</type> </productFacilities> <productFacilities> <type>M</type> </productFacilities> </additionalFlightInfo> </flightInfo> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>151013</departureDate> <departureTime>1425</departureTime> <arrivalDate>161013</arrivalDate> <arrivalTime>0025</arrivalTime> </flightDetails> <departureLocation> <cityAirport>LGW</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>DXB</cityAirport> </arrivalLocation> <marketingCompany> <identifier>EK</identifier> </marketingCompany> <flightIdentification> <number>16</number> </flightIdentification> <productTypeDetail> <productIndicators>S</productIndicators> <productIndicators>ET</productIndicators> </productTypeDetail> <lineItemNumber>6</lineItemNumber> </basicFlightInfo> <infoOnClasses> <productClassDetail> <serviceClass>F</serviceClass> <availabilityStatus>4</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>A</serviceClass> <availabilityStatus>4</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>J</serviceClass> <availabilityStatus>7</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>C</serviceClass> <availabilityStatus>7</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>I</serviceClass> <availabilityStatus>7</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Y</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>E</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <additionalFlightInfo> <flightDetails> <typeOfAircraft>77W</typeOfAircraft> <numberOfStops>0</numberOfStops> </flightDetails> <departureStation> <terminal>N</terminal> </departureStation> <arrivalStation> <terminal>3</terminal> </arrivalStation> <productFacilities> <type>1A</type> </productFacilities> <productFacilities> <type>DA</type> </productFacilities> <productFacilities> <type>LSA</type> </productFacilities> <productFacilities> <type>M</type> </productFacilities> </additionalFlightInfo> </flightInfo> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>161013</departureDate> <departureTime>0150</departureTime> <arrivalDate>161013</arrivalDate> <arrivalTime>2230</arrivalTime> </flightDetails> <departureLocation> <cityAirport>DXB</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>SYD</cityAirport> </arrivalLocation> <marketingCompany> <identifier>EK</identifier> </marketingCompany> <flightIdentification> <number>414</number> </flightIdentification> <productTypeDetail> <productIndicators>E</productIndicators> <productIndicators>ET</productIndicators> </productTypeDetail> </basicFlightInfo> <infoOnClasses> <productClassDetail> <serviceClass>F</serviceClass> <availabilityStatus>4</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>A</serviceClass> <availabilityStatus>4</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>J</serviceClass> <availabilityStatus>7</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>C</serviceClass> <availabilityStatus>7</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>I</serviceClass> <availabilityStatus>7</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Y</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>E</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <additionalFlightInfo> <flightDetails> <typeOfAircraft>388</typeOfAircraft> <numberOfStops>0</numberOfStops> <legDuration>2205</legDuration> </flightDetails> <departureStation> <terminal>3</terminal> </departureStation> <arrivalStation> <terminal>1</terminal> </arrivalStation> <productFacilities> <type>1A</type> </productFacilities> <productFacilities> <type>DA</type> </productFacilities> <productFacilities> <type>LSA</type> </productFacilities> <productFacilities> <type>M</type> </productFacilities> </additionalFlightInfo> </flightInfo> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>151013</departureDate> <departureTime>1425</departureTime> <arrivalDate>161013</arrivalDate> <arrivalTime>0025</arrivalTime> </flightDetails> <departureLocation> <cityAirport>LGW</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>DXB</cityAirport> </arrivalLocation> <marketingCompany> <identifier>QF</identifier> </marketingCompany> <operatingCompany> <identifier>EK</identifier> </operatingCompany> <flightIdentification> <number>8016</number> </flightIdentification> <productTypeDetail> <productIndicators>S</productIndicators> <productIndicators>701</productIndicators> <productIndicators>ET</productIndicators> </productTypeDetail> <lineItemNumber>7</lineItemNumber> </basicFlightInfo> <infoOnClasses> <productClassDetail> <serviceClass>F</serviceClass> <availabilityStatus>2</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>A</serviceClass> <availabilityStatus>2</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>J</serviceClass> <availabilityStatus>7</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>C</serviceClass> <availabilityStatus>7</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>D</serviceClass> <availabilityStatus>7</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>I</serviceClass> <availabilityStatus>7</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Y</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>B</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>H</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>K</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>M</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>L</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>V</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>S</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>N</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Q</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>O</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <additionalFlightInfo> <flightDetails> <typeOfAircraft>77W</typeOfAircraft> <numberOfStops>0</numberOfStops> </flightDetails> <departureStation> <terminal>N</terminal> </departureStation> <arrivalStation> <terminal>3</terminal> </arrivalStation> <productFacilities> <type>1A</type> </productFacilities> <productFacilities> <type>LSA</type> </productFacilities> <productFacilities> <type>M</type> </productFacilities> </additionalFlightInfo> </flightInfo> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>161013</departureDate> <departureTime>0150</departureTime> <arrivalDate>161013</arrivalDate> <arrivalTime>2230</arrivalTime> </flightDetails> <departureLocation> <cityAirport>DXB</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>SYD</cityAirport> </arrivalLocation> <marketingCompany> <identifier>QF</identifier> </marketingCompany> <operatingCompany> <identifier>EK</identifier> </operatingCompany> <flightIdentification> <number>8414</number> </flightIdentification> <productTypeDetail> <productIndicators>E</productIndicators> <productIndicators>701</productIndicators> <productIndicators>ET</productIndicators> </productTypeDetail> </basicFlightInfo> <infoOnClasses> <productClassDetail> <serviceClass>F</serviceClass> <availabilityStatus>2</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>A</serviceClass> <availabilityStatus>2</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>J</serviceClass> <availabilityStatus>7</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>C</serviceClass> <availabilityStatus>7</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>D</serviceClass> <availabilityStatus>7</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Y</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>B</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>H</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>K</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>M</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <additionalFlightInfo> <flightDetails> <typeOfAircraft>388</typeOfAircraft> <numberOfStops>0</numberOfStops> <legDuration>2205</legDuration> </flightDetails> <departureStation> <terminal>3</terminal> </departureStation> <arrivalStation> <terminal>1</terminal> </arrivalStation> <productFacilities> <type>1A</type> </productFacilities> <productFacilities> <type>LSA</type> </productFacilities> <productFacilities> <type>M</type> </productFacilities> </additionalFlightInfo> </flightInfo> </singleCityPairInfo> </Air\_MultiAvailabilityReply>

* * *

## 4 Error Messages

There are many possible error codes which are usually self explanatory.  
The main ones are:

**Error code**

**Error Message**

**Explanation**

A7V

NO MORE FLIGHTS

Received when there are no more flights to display.

BJV

ENTRY NOT AUTHORIZED

Verify input and correct.

A0B

UNABLE TO PROCESS

Report problem to Amadeus.

BFP

AIRLINE DOES NOT SUPPORT REQUEST

Airline is not allowed to use (a) specific option(s) in request.

A08

CHECK DATE

If the format of date is incorrect or if the date is beyond the system date range.

A0K

RESTRICTED

If the EOS agreement has not been set ON.

CCX  

NOT SUPPORTED

If UIC codes are used in input, and the operation code is not the multi modal journey planning service.

FFM

INVALID CONNECTING CITY

Returned when the Stopover Connection Point specified inthe query is not retrieved or does not have the right format

A7E

CHECK CONNECTION TIME

Raised when the Stopover Duration is not specified, is set to 0 or is greater than 3 digits

B1U

REFERENCE POINT NOT FOUND

Raised when the Stopover Connection Point and Stopover Duration are not specified

FXC

DIRECT CANNOT BEREQUESTED WITH CONNECTIONPOINT OPTION

Returned if stopover option isrequested with the direct option

H71

NON-STOP CANNOT BEREQUESTED WITH CONNECTIONPOINT OPTION

Returned if stopover option is requested with the non-stop option

## 4.1 Error Reply

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_MultiAvailabilityReply xmlns="http://xml.amadeus.com/SATRSP\_16\_1\_1A"> <errorOrWarningSection> <errorOrWarningInfo> <error> <code>A08</code> <type>001</type> <listResponsible>AMD</listResponsible> </error> </errorOrWarningInfo> <textInformation> <freeTextQualification> <codedIndicator>3</codedIndicator> </freeTextQualification> <freeText>CHECK DATE</freeText> </textInformation> </errorOrWarningSection> </Air\_MultiAvailabilityReply>

  

* * *

## 5 Operations

## 5.1 Operation: Availability request - basic

It is important to note that the examples in the pperations chapter are only illustrations and are meant to provide the basis for a better understanding on which fields are mandatory for basic operation utilisation. It is not a full explanation of every field that can be utilised for the operation.

Reply structure section may also be empty if there is nothing specific compared with a basic response.

Example: Basic neutral availability request from London (LON) to Sydney (SYD).

<actionCode\> to be used is "44" .

<typeOfRequest\> can be set to AN, AA, AD, AE .

## 5.1.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_MultiAvailability xmlns="http://xml.amadeus.com/SATRQT\_16\_1\_1A"> <messageActionDetails> <functionDetails> <businessFunction>1</businessFunction> <actionCode>44</actionCode> </functionDetails> </messageActionDetails> <requestSection> <availabilityProductInfo> <availabilityDetails> <departureDate>151016</departureDate> </availabilityDetails> <departureLocationInfo> <cityAirport>LON</cityAirport> </departureLocationInfo> <arrivalLocationInfo> <cityAirport>SYD</cityAirport> </arrivalLocationInfo> </availabilityProductInfo> <availabilityOptions> <typeOfRequest>AN</typeOfRequest> </availabilityOptions> </requestSection> </Air\_MultiAvailability>

## 5.1.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_MultiAvailabilityReply xmlns="http://xml.amadeus.com/SATRSP\_16\_1\_1A"> <messageActionDetails> <functionDetails> <businessFunction>1</businessFunction> <actionCode>45</actionCode> </functionDetails> <responseType>3</responseType> </messageActionDetails> <singleCityPairInfo> <locationDetails> <origin>LON</origin> <destination>SYD</destination> </locationDetails> <cityPairFreeFlowText> <freeTextQualification> <codedIndicator>4</codedIndicator> <typeOfInfo>50</typeOfInfo> </freeTextQualification> <freeText></freeText> <freeText></freeText> <freeText> AMADEUS AVAILABILITY - AN </freeText> <freeText></freeText> <freeText> 111 TU 15OCT 0000</freeText> </cityPairFreeFlowText> <cityPairFreeFlowText> <freeTextQualification> <codedIndicator>4</codedIndicator> <typeOfInfo>OFD</typeOfInfo> </freeTextQualification> <freeText>SYD SYDNEY.AUNS</freeText> </cityPairFreeFlowText> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>151013</departureDate> <departureTime>2130</departureTime> <arrivalDate>171013</arrivalDate> <arrivalTime>0610</arrivalTime> </flightDetails> <departureLocation> <cityAirport>LHR</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>SYD</cityAirport> </arrivalLocation> <marketingCompany> <identifier>QF</identifier> </marketingCompany> <flightIdentification> <number>2</number> </flightIdentification> <productTypeDetail> <productIndicators>D</productIndicators> <productIndicators>ET</productIndicators> </productTypeDetail> <lineItemNumber>1</lineItemNumber> </basicFlightInfo> <infoOnClasses> <productClassDetail> <serviceClass>F</serviceClass> <availabilityStatus>4</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>A</serviceClass> <availabilityStatus>3</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>J</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>C</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>D</serviceClass> <availabilityStatus>1</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>I</serviceClass> <availabilityStatus>L</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>W</serviceClass> <availabilityStatus>1</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>R</serviceClass> <availabilityStatus>L</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>T</serviceClass> <availabilityStatus>L</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Y</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>B</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>H</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>K</serviceClass> <availabilityStatus>1</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>M</serviceClass> <availabilityStatus>L</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>L</serviceClass> <availabilityStatus>L</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>G</serviceClass> <availabilityStatus>L</availabilityStatus> </productClassDetail> </infoOnClasses> <additionalFlightInfo> <flightDetails> <typeOfAircraft>388</typeOfAircraft> <numberOfStops>1</numberOfStops> <legDuration>2240</legDuration> </flightDetails> <departureStation> <terminal>3</terminal> </departureStation> <arrivalStation> <terminal>1</terminal> </arrivalStation> <productFacilities> <type>1A</type> </productFacilities> <productFacilities> <type>LSA</type> </productFacilities> <productFacilities> <type>M</type> </productFacilities> </additionalFlightInfo> </flightInfo> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>151013</departureDate> <departureTime>2115</departureTime> <arrivalDate>171013</arrivalDate> <arrivalTime>0610</arrivalTime> </flightDetails> <departureLocation> <cityAirport>LHR</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>SYD</cityAirport> </arrivalLocation> <marketingCompany> <identifier>BA</identifier> </marketingCompany> <flightIdentification> <number>15</number> </flightIdentification> <productTypeDetail> <productIndicators>D</productIndicators> <productIndicators>ET</productIndicators> </productTypeDetail> <lineItemNumber>2</lineItemNumber> </basicFlightInfo> <infoOnClasses> <productClassDetail> <serviceClass>F</serviceClass> <availabilityStatus>6</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>A</serviceClass> <availabilityStatus>4</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>J</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>C</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>D</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>R</serviceClass> <availabilityStatus>5</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>I</serviceClass> <availabilityStatus>1</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>W</serviceClass> <availabilityStatus>5</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Y</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>B</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>H</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>K</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>M</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>L</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>G</serviceClass> <availabilityStatus>L</availabilityStatus> </productClassDetail> </infoOnClasses> <additionalFlightInfo> <flightDetails> <typeOfAircraft>777</typeOfAircraft> <numberOfStops>1</numberOfStops> <legDuration>2255</legDuration> </flightDetails> <departureStation> <terminal>5</terminal> </departureStation> <arrivalStation> <terminal>1</terminal> </arrivalStation> <productFacilities> <type>1A</type> </productFacilities> <productFacilities> <type>LSA</type> </productFacilities> <productFacilities> <type>M</type> </productFacilities> </additionalFlightInfo> </flightInfo> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>151013</departureDate> <departureTime>2230</departureTime> <arrivalDate>171013</arrivalDate> <arrivalTime>0735</arrivalTime> </flightDetails> <departureLocation> <cityAirport>LHR</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>SYD</cityAirport> </arrivalLocation> <marketingCompany> <identifier>VS</identifier> </marketingCompany> <flightIdentification> <number>200</number> </flightIdentification> <productTypeDetail> <productIndicators>D</productIndicators> <productIndicators>ET</productIndicators> </productTypeDetail> <lineItemNumber>3</lineItemNumber> </basicFlightInfo> <infoOnClasses> <productClassDetail> <serviceClass>J</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>C</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>D</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>I</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Z</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>W</serviceClass> <availabilityStatus>R</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>S</serviceClass> <availabilityStatus>0</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>H</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Y</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>B</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>R</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>L</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>U</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>M</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>E</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Q</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>X</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>N</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>O</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <additionalFlightInfo> <flightDetails> <typeOfAircraft>346</typeOfAircraft> <numberOfStops>1</numberOfStops> <legDuration>2305</legDuration> </flightDetails> <departureStation> <terminal>3</terminal> </departureStation> <arrivalStation> <terminal>1</terminal> </arrivalStation> <productFacilities> <type>AS</type> </productFacilities> <productFacilities> <type>DA</type> </productFacilities> <productFacilities> <type>M</type> </productFacilities> </additionalFlightInfo> </flightInfo> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>151013</departureDate> <departureTime>2215</departureTime> <arrivalDate>161013</arrivalDate> <arrivalTime>0805</arrivalTime> </flightDetails> <departureLocation> <cityAirport>LHR</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>DXB</cityAirport> </arrivalLocation> <marketingCompany> <identifier>EK</identifier> </marketingCompany> <flightIdentification> <number>6</number> </flightIdentification> <productTypeDetail> <productIndicators>S</productIndicators> <productIndicators>ET</productIndicators> </productTypeDetail> <lineItemNumber>4</lineItemNumber> </basicFlightInfo> <infoOnClasses> <productClassDetail> <serviceClass>F</serviceClass> <availabilityStatus>4</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>A</serviceClass> <availabilityStatus>4</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>J</serviceClass> <availabilityStatus>7</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>C</serviceClass> <availabilityStatus>3</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Y</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>E</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>R</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>W</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>M</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>B</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>U</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>K</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Q</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>L</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>T</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>V</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>X</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <additionalFlightInfo> <flightDetails> <typeOfAircraft>388</typeOfAircraft> <numberOfStops>0</numberOfStops> </flightDetails> <departureStation> <terminal>3</terminal> </departureStation> <arrivalStation> <terminal>3</terminal> </arrivalStation> <productFacilities> <type>1A</type> </productFacilities> <productFacilities> <type>DA</type> </productFacilities> <productFacilities> <type>LSA</type> </productFacilities> <productFacilities> <type>M</type> </productFacilities> </additionalFlightInfo> </flightInfo> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>161013</departureDate> <departureTime>0920</departureTime> <arrivalDate>171013</arrivalDate> <arrivalTime>0610</arrivalTime> </flightDetails> <departureLocation> <cityAirport>DXB</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>SYD</cityAirport> </arrivalLocation> <marketingCompany> <identifier>EK</identifier> </marketingCompany> <operatingCompany> <identifier>QF</identifier> </operatingCompany> <flightIdentification> <number>5002</number> </flightIdentification> <productTypeDetail> <productIndicators>E</productIndicators> <productIndicators>701</productIndicators> <productIndicators>ET</productIndicators> </productTypeDetail> </basicFlightInfo> <infoOnClasses> <productClassDetail> <serviceClass>F</serviceClass> <availabilityStatus>4</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>A</serviceClass> <availabilityStatus>4</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>J</serviceClass> <availabilityStatus>7</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>C</serviceClass> <availabilityStatus>0</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>I</serviceClass> <availabilityStatus>0</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>O</serviceClass> <availabilityStatus>0</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Y</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>E</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>R</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>W</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>M</serviceClass> <availabilityStatus>0</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>B</serviceClass> <availabilityStatus>0</availabilityStatus> </productClassDetail> </infoOnClasses> <additionalFlightInfo> <flightDetails> <typeOfAircraft>388</typeOfAircraft> <numberOfStops>0</numberOfStops> <legDuration>2155</legDuration> </flightDetails> <departureStation> <terminal>3</terminal> </departureStation> <arrivalStation> <terminal>1</terminal> </arrivalStation> <productFacilities> <type>1A</type> </productFacilities> <productFacilities> <type>DA</type> </productFacilities> <productFacilities> <type>LSA</type> </productFacilities> </additionalFlightInfo> </flightInfo> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>151013</departureDate> <departureTime>2215</departureTime> <arrivalDate>161013</arrivalDate> <arrivalTime>0805</arrivalTime> </flightDetails> <departureLocation> <cityAirport>LHR</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>DXB</cityAirport> </arrivalLocation> <marketingCompany> <identifier>QF</identifier> </marketingCompany> <operatingCompany> <identifier>EK</identifier> </operatingCompany> <flightIdentification> <number>8006</number> </flightIdentification> <productTypeDetail> <productIndicators>S</productIndicators> <productIndicators>701</productIndicators> <productIndicators>ET</productIndicators> </productTypeDetail> <lineItemNumber>5</lineItemNumber> </basicFlightInfo> <infoOnClasses> <productClassDetail> <serviceClass>F</serviceClass> <availabilityStatus>2</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>A</serviceClass> <availabilityStatus>2</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>J</serviceClass> <availabilityStatus>7</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>C</serviceClass> <availabilityStatus>7</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>D</serviceClass> <availabilityStatus>7</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>I</serviceClass> <availabilityStatus>7</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Y</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>B</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>H</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>K</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>M</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>L</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>V</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>S</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>N</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Q</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>O</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <additionalFlightInfo> <flightDetails> <typeOfAircraft>388</typeOfAircraft> <numberOfStops>0</numberOfStops> </flightDetails> <departureStation> <terminal>3</terminal> </departureStation> <arrivalStation> <terminal>3</terminal> </arrivalStation> <productFacilities> <type>1A</type> </productFacilities> <productFacilities> <type>LSA</type> </productFacilities> <productFacilities> <type>M</type> </productFacilities> </additionalFlightInfo> </flightInfo> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>161013</departureDate> <departureTime>0920</departureTime> <arrivalDate>171013</arrivalDate> <arrivalTime>0610</arrivalTime> </flightDetails> <departureLocation> <cityAirport>DXB</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>SYD</cityAirport> </arrivalLocation> <marketingCompany> <identifier>QF</identifier> </marketingCompany> <flightIdentification> <number>2</number> </flightIdentification> <productTypeDetail> <productIndicators>E</productIndicators> <productIndicators>ET</productIndicators> </productTypeDetail> </basicFlightInfo> <infoOnClasses> <productClassDetail> <serviceClass>F</serviceClass> <availabilityStatus>6</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>A</serviceClass> <availabilityStatus>4</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>J</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>C</serviceClass> <availabilityStatus>L</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>D</serviceClass> <availabilityStatus>L</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>I</serviceClass> <availabilityStatus>L</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>W</serviceClass> <availabilityStatus>L</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>R</serviceClass> <availabilityStatus>L</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>T</serviceClass> <availabilityStatus>L</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Y</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>B</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>H</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>K</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>M</serviceClass> <availabilityStatus>L</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>L</serviceClass> <availabilityStatus>L</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>G</serviceClass> <availabilityStatus>L</availabilityStatus> </productClassDetail> </infoOnClasses> <additionalFlightInfo> <flightDetails> <typeOfAircraft>388</typeOfAircraft> <numberOfStops>0</numberOfStops> <legDuration>2155</legDuration> </flightDetails> <departureStation> <terminal>3</terminal> </departureStation> <arrivalStation> <terminal>1</terminal> </arrivalStation> <productFacilities> <type>1A</type> </productFacilities> <productFacilities> <type>LSA</type> </productFacilities> <productFacilities> <type>M</type> </productFacilities> </additionalFlightInfo> </flightInfo> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>151013</departureDate> <departureTime>1425</departureTime> <arrivalDate>161013</arrivalDate> <arrivalTime>0025</arrivalTime> </flightDetails> <departureLocation> <cityAirport>LGW</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>DXB</cityAirport> </arrivalLocation> <marketingCompany> <identifier>EK</identifier> </marketingCompany> <flightIdentification> <number>16</number> </flightIdentification> <productTypeDetail> <productIndicators>S</productIndicators> <productIndicators>ET</productIndicators> </productTypeDetail> <lineItemNumber>6</lineItemNumber> </basicFlightInfo> <infoOnClasses> <productClassDetail> <serviceClass>F</serviceClass> <availabilityStatus>4</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>A</serviceClass> <availabilityStatus>4</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>J</serviceClass> <availabilityStatus>7</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>C</serviceClass> <availabilityStatus>7</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>I</serviceClass> <availabilityStatus>7</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Y</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>E</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <additionalFlightInfo> <flightDetails> <typeOfAircraft>77W</typeOfAircraft> <numberOfStops>0</numberOfStops> </flightDetails> <departureStation> <terminal>N</terminal> </departureStation> <arrivalStation> <terminal>3</terminal> </arrivalStation> <productFacilities> <type>1A</type> </productFacilities> <productFacilities> <type>DA</type> </productFacilities> <productFacilities> <type>LSA</type> </productFacilities> <productFacilities> <type>M</type> </productFacilities> </additionalFlightInfo> </flightInfo> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>161013</departureDate> <departureTime>0150</departureTime> <arrivalDate>161013</arrivalDate> <arrivalTime>2230</arrivalTime> </flightDetails> <departureLocation> <cityAirport>DXB</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>SYD</cityAirport> </arrivalLocation> <marketingCompany> <identifier>EK</identifier> </marketingCompany> <flightIdentification> <number>414</number> </flightIdentification> <productTypeDetail> <productIndicators>E</productIndicators> <productIndicators>ET</productIndicators> </productTypeDetail> </basicFlightInfo> <infoOnClasses> <productClassDetail> <serviceClass>F</serviceClass> <availabilityStatus>4</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>A</serviceClass> <availabilityStatus>4</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>J</serviceClass> <availabilityStatus>7</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>C</serviceClass> <availabilityStatus>7</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>I</serviceClass> <availabilityStatus>7</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Y</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>E</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <additionalFlightInfo> <flightDetails> <typeOfAircraft>388</typeOfAircraft> <numberOfStops>0</numberOfStops> <legDuration>2205</legDuration> </flightDetails> <departureStation> <terminal>3</terminal> </departureStation> <arrivalStation> <terminal>1</terminal> </arrivalStation> <productFacilities> <type>1A</type> </productFacilities> <productFacilities> <type>DA</type> </productFacilities> <productFacilities> <type>LSA</type> </productFacilities> <productFacilities> <type>M</type> </productFacilities> </additionalFlightInfo> </flightInfo> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>151013</departureDate> <departureTime>1425</departureTime> <arrivalDate>161013</arrivalDate> <arrivalTime>0025</arrivalTime> </flightDetails> <departureLocation> <cityAirport>LGW</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>DXB</cityAirport> </arrivalLocation> <marketingCompany> <identifier>QF</identifier> </marketingCompany> <operatingCompany> <identifier>EK</identifier> </operatingCompany> <flightIdentification> <number>8016</number> </flightIdentification> <productTypeDetail> <productIndicators>S</productIndicators> <productIndicators>701</productIndicators> <productIndicators>ET</productIndicators> </productTypeDetail> <lineItemNumber>7</lineItemNumber> </basicFlightInfo> <infoOnClasses> <productClassDetail> <serviceClass>F</serviceClass> <availabilityStatus>2</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>A</serviceClass> <availabilityStatus>2</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>J</serviceClass> <availabilityStatus>7</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>C</serviceClass> <availabilityStatus>7</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>D</serviceClass> <availabilityStatus>7</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>I</serviceClass> <availabilityStatus>7</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Y</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>B</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>H</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>K</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>M</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>L</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>V</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>S</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>N</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Q</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>O</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <additionalFlightInfo> <flightDetails> <typeOfAircraft>77W</typeOfAircraft> <numberOfStops>0</numberOfStops> </flightDetails> <departureStation> <terminal>N</terminal> </departureStation> <arrivalStation> <terminal>3</terminal> </arrivalStation> <productFacilities> <type>1A</type> </productFacilities> <productFacilities> <type>LSA</type> </productFacilities> <productFacilities> <type>M</type> </productFacilities> </additionalFlightInfo> </flightInfo> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>161013</departureDate> <departureTime>0150</departureTime> <arrivalDate>161013</arrivalDate> <arrivalTime>2230</arrivalTime> </flightDetails> <departureLocation> <cityAirport>DXB</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>SYD</cityAirport> </arrivalLocation> <marketingCompany> <identifier>QF</identifier> </marketingCompany> <operatingCompany> <identifier>EK</identifier> </operatingCompany> <flightIdentification> <number>8414</number> </flightIdentification> <productTypeDetail> <productIndicators>E</productIndicators> <productIndicators>701</productIndicators> <productIndicators>ET</productIndicators> </productTypeDetail> </basicFlightInfo> <infoOnClasses> <productClassDetail> <serviceClass>F</serviceClass> <availabilityStatus>2</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>A</serviceClass> <availabilityStatus>2</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>J</serviceClass> <availabilityStatus>7</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>C</serviceClass> <availabilityStatus>7</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>D</serviceClass> <availabilityStatus>7</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Y</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>B</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>H</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>K</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>M</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <additionalFlightInfo> <flightDetails> <typeOfAircraft>388</typeOfAircraft> <numberOfStops>0</numberOfStops> <legDuration>2205</legDuration> </flightDetails> <departureStation> <terminal>3</terminal> </departureStation> <arrivalStation> <terminal>1</terminal> </arrivalStation> <productFacilities> <type>1A</type> </productFacilities> <productFacilities> <type>LSA</type> </productFacilities> <productFacilities> <type>M</type> </productFacilities> </additionalFlightInfo> </flightInfo> </singleCityPairInfo> </Air\_MultiAvailabilityReply>

## 5.1.3 Possible Errors

See "Error Messages" section

* * *

## 5.2 Operation: Class of service option

You can request availability for specific class(es) only. Use <serviceClass> for this purpose.

Example: Neutral availability request for 15 October between Nice (NCE) and New York (NYC) for classes Y and K.

## 5.2.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_MultiAvailability xmlns="http://xml.amadeus.com/SATRQT\_16\_1\_1A"> <messageActionDetails> <functionDetails> <actionCode>44</actionCode> </functionDetails> </messageActionDetails> <requestSection> <availabilityProductInfo> <availabilityDetails> <departureDate>151016</departureDate> </availabilityDetails> <departureLocationInfo> <cityAirport>NCE</cityAirport> </departureLocationInfo> <arrivalLocationInfo> <cityAirport>NYC</cityAirport> </arrivalLocationInfo> </availabilityProductInfo> <optionClass> <productClassDetails> <serviceClass>Y</serviceClass> </productClassDetails> <productClassDetails> <serviceClass>K</serviceClass> </productClassDetails> </optionClass> <availabilityOptions> <typeOfRequest>AN</typeOfRequest> </availabilityOptions> </requestSection> </Air\_MultiAvailability>

## 5.2.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.2.3 Possible Errors

See "Error Messages" section

* * *

## 5.3 Operation: Connection point option

You can request availability between a given board and off point via connecting point(s) specified. The request may contain up to 5 preferred connection points. Use <connectionOption> for this purpose.

Example: Availability request for 15 April between Nice (NCE) and Bangkok (BKK) via Zurich (ZRH).

## 5.3.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_MultiAvailability xmlns="http://xml.amadeus.com/SATRQT\_16\_1\_1A"> <messageActionDetails> <functionDetails> <actionCode>44</actionCode> </functionDetails> </messageActionDetails> <requestSection> <availabilityProductInfo> <availabilityDetails> <departureDate>151016</departureDate> </availabilityDetails> <departureLocationInfo> <cityAirport>NCE</cityAirport> </departureLocationInfo> <arrivalLocationInfo> <cityAirport>BKK</cityAirport> </arrivalLocationInfo> </availabilityProductInfo> <qualifiedConnectionOption> <connectionOption> <firstConnection> <location>ZRH</location> </firstConnection> </connectionOption> </qualifiedConnectionOption> <availabilityOptions> <typeOfRequest>AN</typeOfRequest> </availabilityOptions> </requestSection> </Air\_MultiAvailability>

## 5.3.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.3.3 Possible Errors

See "Error Messages" section

* * *

## 5.4 Operation: Corporate frequent flyer option

You can add the corporate frequent flyer details to the availability request for the Airline to fine tune its flight availability. Use <frequentTraveller> for this purpose.

Example: Basic neutral availability request from London (LON) to Sydney (SYD) including LH corporate traveller card number for Sarah Jones.

## 5.4.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_MultiAvailability xmlns="http://xml.amadeus.com/SATRQT\_16\_1\_1A"> <messageActionDetails> <functionDetails> <businessFunction>1</businessFunction> <actionCode>44</actionCode> </functionDetails> </messageActionDetails> <frequentTraveller> <travellerDetails> <paxDetails> <surname>JONES</surname> </paxDetails> <otherPaxDetails> <givenName>SARAH</givenName> </otherPaxDetails> </travellerDetails> <travelleridentification> <frequentTravellerDetails> <carrier>LH</carrier> <number>C200107371628</number> <referenceType>2</referenceType> </frequentTravellerDetails> </travelleridentification> </frequentTraveller> <requestSection> <availabilityProductInfo> <availabilityDetails> <departureDate>151014</departureDate> </availabilityDetails> <departureLocationInfo> <cityAirport>LON</cityAirport> </departureLocationInfo> <arrivalLocationInfo> <cityAirport>SYD</cityAirport> </arrivalLocationInfo> </availabilityProductInfo> <availabilityOptions> <typeOfRequest>AN</typeOfRequest> </availabilityOptions> </requestSection> </Air\_MultiAvailability>

## 5.4.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.4.3 Possible Errors

See "Error Messages" section.

* * *

## 5.5 Operation: Corporate information option

You can add the travel marketing company corporate number of the passenger to bias the availability with the dedicated Amadeus Air Preference (AAP) rule and Inventory Mask rule if any. Use <consumerReferenceInformation> for this purpose.

Example: Availability request between Frankfurt (FRA) and Denpasar (DPS) on 06SEP with American Express corporation number 48906348860.

## 5.5.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_MultiAvailability xmlns="http://xml.amadeus.com/SATRQT\_16\_1\_1A"> <messageActionDetails> <functionDetails> <actionCode>44</actionCode> </functionDetails> </messageActionDetails> <consumerReferenceInformation> <customerReferences> <referenceQualifier>701</referenceQualifier> <referenceNumber>48906348860</referenceNumber> </customerReferences> </consumerReferenceInformation> <requestSection> <availabilityProductInfo> <availabilityDetails> <departureDate>060916</departureDate> </availabilityDetails> <departureLocationInfo> <cityAirport>FRA</cityAirport> </departureLocationInfo> <arrivalLocationInfo> <cityAirport>DPS</cityAirport> </arrivalLocationInfo> </availabilityProductInfo> <availabilityOptions> <typeOfRequest>AN</typeOfRequest> </availabilityOptions> </requestSection> </Air\_MultiAvailability>

## 5.5.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.5.3 Possible Errors

See "Error Messages" section.

* * *

## 5.6 Operation: Direct access availability

You can request a direct access availability to get solutions and availability coming directly from the airlines inventory.

Example: Direct access availability request on Emirates (EK) for 19 October between Mauritius Island (MRU) and Zurich (ZRH).

## 5.6.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_MultiAvailability xmlns="http://xml.amadeus.com/SATRQT\_16\_1\_1A"> <messageActionDetails> <functionDetails> <actionCode>44</actionCode> </functionDetails> </messageActionDetails> <requestSection> <availabilityProductInfo> <availabilityDetails> <departureDate>191016</departureDate> </availabilityDetails> <departureLocationInfo> <cityAirport>MRU</cityAirport> </departureLocationInfo> <arrivalLocationInfo> <cityAirport>ZRH</cityAirport> </arrivalLocationInfo> </availabilityProductInfo> <availabilityOptions> <typeOfRequest>AD</typeOfRequest> <optionInfo> <option>DIR</option> <optionInformation>EK</optionInformation> </optionInfo> </availabilityOptions> </requestSection> </Air\_MultiAvailability>

## 5.6.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_MultiAvailabilityReply xmlns="http://xml.amadeus.com/SATRSP\_16\_1\_1A"> <messageActionDetails> <functionDetails> <businessFunction>1</businessFunction> <actionCode>45</actionCode> </functionDetails> <responseType>3</responseType> </messageActionDetails> <singleCityPairInfo> <locationDetails></locationDetails> <cityPairFreeFlowText> <freeTextQualification> <codedIndicator>4</codedIndicator> <typeOfInfo>50</typeOfInfo> </freeTextQualification> <freeText></freeText> <freeText></freeText> <freeText> EK - EMIRATES </freeText> <freeText></freeText> <freeText> 114 SA 19OCT 0000</freeText> </cityPairFreeFlowText> <cityPairFreeFlowText> <freeTextQualification> <codedIndicator>3</codedIndicator> </freeTextQualification> <freeText>SA 19OCT</freeText> <freeText> FREE CHAUFFEUR DRIVE FOR EK F/J PAX-SEE EK PAGES IN YR GDS</freeText> </cityPairFreeFlowText> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>191013</departureDate> <departureTime>2215</departureTime> <arrivalDate>201013</arrivalDate> <arrivalTime>0445</arrivalTime> </flightDetails> <departureLocation> <cityAirport>MRU</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>DXB</cityAirport> </arrivalLocation> <marketingCompany> <identifier>EK</identifier> </marketingCompany> <flightIdentification> <number>3704</number> </flightIdentification> <productTypeDetail> <productIndicators>S</productIndicators> </productTypeDetail> <lineItemNumber>21</lineItemNumber> </basicFlightInfo> <infoOnClasses> <productClassDetail> <serviceClass>F</serviceClass> <availabilityStatus>4</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>A</serviceClass> <availabilityStatus>4</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>J</serviceClass> <availabilityStatus>7</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>C</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>I</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>O</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Y</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>E</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>R</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>W</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>M</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>B</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>U</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>K</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>H</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Q</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>L</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>T</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>V</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>G</serviceClass> <availabilityStatus>0</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>X</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <additionalFlightInfo> <flightDetails> <typeOfAircraft>773</typeOfAircraft> <numberOfStops>0</numberOfStops> </flightDetails> <productFacilities> <type>LK</type> </productFacilities> <productFacilities> <type>DA</type> </productFacilities> </additionalFlightInfo> </flightInfo> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>201013</departureDate> <departureTime>0840</departureTime> <arrivalDate>201013</arrivalDate> <arrivalTime>1320</arrivalTime> </flightDetails> <departureLocation> <cityAirport>DXB</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>ZRH</cityAirport> </arrivalLocation> <marketingCompany> <identifier>EK</identifier> </marketingCompany> <flightIdentification> <number>87</number> </flightIdentification> <productTypeDetail> <productIndicators>E</productIndicators> </productTypeDetail> </basicFlightInfo> <infoOnClasses> <productClassDetail> <serviceClass>F</serviceClass> <availabilityStatus>4</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>A</serviceClass> <availabilityStatus>4</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>J</serviceClass> <availabilityStatus>7</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>C</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>I</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>O</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Y</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>E</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>R</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>W</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>M</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>B</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>U</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>K</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>H</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Q</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>L</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>T</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>V</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>G</serviceClass> <availabilityStatus>0</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>X</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <additionalFlightInfo> <flightDetails> <typeOfAircraft>77W</typeOfAircraft> <numberOfStops>0</numberOfStops> <legDuration>1705</legDuration> </flightDetails> <productFacilities> <type>LK</type> </productFacilities> <productFacilities> <type>DA</type> </productFacilities> </additionalFlightInfo> </flightInfo> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>191013</departureDate> <departureTime>1820</departureTime> <arrivalDate>201013</arrivalDate> <arrivalTime>0055</arrivalTime> </flightDetails> <departureLocation> <cityAirport>MRU</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>DXB</cityAirport> </arrivalLocation> <marketingCompany> <identifier>EK</identifier> </marketingCompany> <flightIdentification> <number>3702</number> </flightIdentification> <productTypeDetail> <productIndicators>S</productIndicators> </productTypeDetail> <lineItemNumber>22</lineItemNumber> </basicFlightInfo> <infoOnClasses> <productClassDetail> <serviceClass>F</serviceClass> <availabilityStatus>4</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>A</serviceClass> <availabilityStatus>4</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>J</serviceClass> <availabilityStatus>7</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>C</serviceClass> <availabilityStatus>5</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>I</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>O</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Y</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>E</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>R</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>W</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>M</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>B</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>U</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>K</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>H</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Q</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>L</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>T</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>V</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>G</serviceClass> <availabilityStatus>0</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>X</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <additionalFlightInfo> <flightDetails> <typeOfAircraft>773</typeOfAircraft> <numberOfStops>0</numberOfStops> </flightDetails> <productFacilities> <type>LK</type> </productFacilities> <productFacilities> <type>DA</type> </productFacilities> </additionalFlightInfo> </flightInfo> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>201013</departureDate> <departureTime>0840</departureTime> <arrivalDate>201013</arrivalDate> <arrivalTime>1320</arrivalTime> </flightDetails> <departureLocation> <cityAirport>DXB</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>ZRH</cityAirport> </arrivalLocation> <marketingCompany> <identifier>EK</identifier> </marketingCompany> <flightIdentification> <number>87</number> </flightIdentification> <productTypeDetail> <productIndicators>E</productIndicators> </productTypeDetail> </basicFlightInfo> <infoOnClasses> <productClassDetail> <serviceClass>F</serviceClass> <availabilityStatus>4</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>A</serviceClass> <availabilityStatus>4</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>J</serviceClass> <availabilityStatus>7</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>C</serviceClass> <availabilityStatus>5</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>I</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>O</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Y</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>E</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>R</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>W</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>M</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>B</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>U</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>K</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>H</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Q</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>L</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>T</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>V</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>G</serviceClass> <availabilityStatus>0</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>X</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <additionalFlightInfo> <flightDetails> <typeOfAircraft>77W</typeOfAircraft> <numberOfStops>0</numberOfStops> <legDuration>2100</legDuration> </flightDetails> <productFacilities> <type>LK</type> </productFacilities> <productFacilities> <type>DA</type> </productFacilities> </additionalFlightInfo> </flightInfo> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>191013</departureDate> <departureTime>2215</departureTime> <arrivalDate>201013</arrivalDate> <arrivalTime>0445</arrivalTime> </flightDetails> <departureLocation> <cityAirport>MRU</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>DXB</cityAirport> </arrivalLocation> <marketingCompany> <identifier>EK</identifier> </marketingCompany> <flightIdentification> <number>3704</number> </flightIdentification> <productTypeDetail> <productIndicators>S</productIndicators> </productTypeDetail> <lineItemNumber>23</lineItemNumber> </basicFlightInfo> <infoOnClasses> <productClassDetail> <serviceClass>F</serviceClass> <availabilityStatus>4</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>A</serviceClass> <availabilityStatus>4</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>J</serviceClass> <availabilityStatus>7</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>C</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>I</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>O</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Y</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>E</serviceClass> <availabilityStatus>2</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>R</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>W</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>M</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>B</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>U</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>K</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>H</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Q</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>L</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>T</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>V</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>G</serviceClass> <availabilityStatus>0</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>X</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <additionalFlightInfo> <flightDetails> <typeOfAircraft>773</typeOfAircraft> <numberOfStops>0</numberOfStops> </flightDetails> <productFacilities> <type>LK</type> </productFacilities> <productFacilities> <type>DA</type> </productFacilities> </additionalFlightInfo> </flightInfo> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>201013</departureDate> <departureTime>1605</departureTime> <arrivalDate>201013</arrivalDate> <arrivalTime>2045</arrivalTime> </flightDetails> <departureLocation> <cityAirport>DXB</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>ZRH</cityAirport> </arrivalLocation> <marketingCompany> <identifier>EK</identifier> </marketingCompany> <flightIdentification> <number>85</number> </flightIdentification> <productTypeDetail> <productIndicators>E</productIndicators> </productTypeDetail> </basicFlightInfo> <infoOnClasses> <productClassDetail> <serviceClass>F</serviceClass> <availabilityStatus>4</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>A</serviceClass> <availabilityStatus>4</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>J</serviceClass> <availabilityStatus>7</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>C</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>I</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>O</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Y</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>E</serviceClass> <availabilityStatus>2</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>R</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>W</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>M</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>B</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>U</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>K</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>H</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Q</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>L</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>T</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>V</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>G</serviceClass> <availabilityStatus>0</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>X</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <additionalFlightInfo> <flightDetails> <typeOfAircraft>77W</typeOfAircraft> <numberOfStops>0</numberOfStops> <legDuration>2430</legDuration> </flightDetails> <productFacilities> <type>LK</type> </productFacilities> <productFacilities> <type>DA</type> </productFacilities> </additionalFlightInfo> </flightInfo> </singleCityPairInfo> </Air\_MultiAvailabilityReply>

## 5.6.3 Possible Errors

See "Error Messages" section.

* * *

## 5.7 Operation: Display estimated timings

Pre-conditions:

The airline is eligible to display estimated timings.

There is an Extended Ownership Security agreement between the airline and the office of the requestor.

Post-conditions:  

Estimated time of departure (ETD) and estimated time of arrival (ETA) are returned at segment level - if available - in the availability response sent by the Availability Server.

Description:

ETD and ETA are appended at segment level until Flight departed flag is received.

<dateInfo> contains the estimated timings.

<qualifier> can be:

-   ETD for estimated time of departure
-   ETA for estimated time of arrival

## 5.7.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_MultiAvailability xmlns="http://xml.amadeus.com/SATRQT\_16\_1\_1A"> <messageActionDetails> <functionDetails> <businessFunction>1</businessFunction> <actionCode>44</actionCode> </functionDetails> </messageActionDetails> <requestSection> <availabilityProductInfo> <availabilityDetails> <departureDate>100916</departureDate> <departureTime>0800</departureTime> </availabilityDetails> <departureLocationInfo> <cityAirport>ATL</cityAirport> </departureLocationInfo> <arrivalLocationInfo> <cityAirport>PIT</cityAirport> </arrivalLocationInfo> </availabilityProductInfo> <optionClass> <productClassDetails> <serviceClass>Y</serviceClass> </productClassDetails> </optionClass> <airlineOrFlightOption> <flightIdentification> <airlineCode>WN</airlineCode> </flightIdentification> </airlineOrFlightOption> <availabilityOptions> <typeOfRequest>AN</typeOfRequest> </availabilityOptions> </requestSection> </Air\_MultiAvailability>

## 5.7.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_MultiAvailabilityReply xmlns="http://xml.amadeus.com/SATRSP\_16\_1\_1A"> <messageActionDetails> <functionDetails> <businessFunction>1</businessFunction> <actionCode>45</actionCode> </functionDetails> <responseType>3</responseType> </messageActionDetails> <singleCityPairInfo> <locationDetails> <origin>ATL</origin> <destination>PIT</destination> </locationDetails> <cityPairFreeFlowText> <freeTextQualification> <codedIndicator>4</codedIndicator> <typeOfInfo>50</typeOfInfo> </freeTextQualification> <freeText>\*\* AMADEUS AVAILABILITY - AN \*\* 2 SA 10SEP 0800</freeText> </cityPairFreeFlowText> <cityPairFreeFlowText> <freeTextQualification> <codedIndicator>4</codedIndicator> <typeOfInfo>OFD</typeOfInfo> </freeTextQualification> <freeText>PIT PITTSBURGH.USPA</freeText> </cityPairFreeFlowText> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>100916</departureDate> <departureTime>0800</departureTime> <arrivalDate>100916</arrivalDate> <arrivalTime>1100</arrivalTime> </flightDetails> <departureLocation> <cityAirport>ATL</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>PIT</cityAirport> </arrivalLocation> <marketingCompany> <identifier>WN</identifier> </marketingCompany> <flightIdentification> <number>9132</number> </flightIdentification> <productTypeDetail> <productIndicators>D</productIndicators> <productIndicators>ET</productIndicators> <productIndicators>SFL</productIndicators> </productTypeDetail> <lineItemNumber>1</lineItemNumber> </basicFlightInfo> <dateInfo> <dateAndTimeDetails> <qualifier>ETD</qualifier> <date>100916</date> <time>0810</time> </dateAndTimeDetails> <dateAndTimeDetails> <qualifier>ETA</qualifier> <date>100916</date> <time>1115</time> </dateAndTimeDetails> </dateInfo> <infoOnClasses> <productClassDetail> <serviceClass>Y</serviceClass> <availabilityStatus>8</availabilityStatus> </productClassDetail> </infoOnClasses> <additionalFlightInfo> <flightDetails> <typeOfAircraft>73W</typeOfAircraft> <numberOfStops>0</numberOfStops> <legDuration>0300</legDuration> </flightDetails> <productFacilities> <type>1A</type> </productFacilities> <productFacilities> <type>LSA</type> </productFacilities> </additionalFlightInfo> <flightErrorWarningSection> <flightErrorWarningInfo> <error> <code>D8R</code> <type>001</type> <listResponsible>AMD</listResponsible> </error> </flightErrorWarningInfo> <flightErrorWarningText> <freeTextQualification> <codedIndicator>4</codedIndicator> <typeOfInfo>1</typeOfInfo> </freeTextQualification> <freeText>FLIFO EXISTS FOR THIS FLIGHT</freeText> </flightErrorWarningText> </flightErrorWarningSection> </flightInfo> </singleCityPairInfo> </Air\_MultiAvailabilityReply>

## 5.7.3 Possible Errors

See "Error Messages" section.

* * *

## 5.8 Operation: Enriched staff

You can request an availability with enriched staff option for airline offices dealing with airline staff bookings. Use option <type> "RED" and <arguments> "EST" for this purpose.

Example: Availability request from Nice (NCE) to Dallas (DFW) on 23 February with the enriched staff option.

It will return additional information related to staff availability: Inventory cabin, cabin capacity, availability and standby staff counters.

## 5.8.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_MultiAvailability xmlns="http://xml.amadeus.com/SATRQT\_16\_1\_1A"> <messageActionDetails> <functionDetails> <actionCode>44</actionCode> </functionDetails> </messageActionDetails> <requestSection> <availabilityProductInfo> <availabilityDetails> <departureDate>230216</departureDate> </availabilityDetails> <departureLocationInfo> <cityAirport>NCE</cityAirport> </departureLocationInfo> <arrivalLocationInfo> <cityAirport>DFW</cityAirport> </arrivalLocationInfo> </availabilityProductInfo> <availabilityOptions> <typeOfRequest>AN</typeOfRequest> <optionInfo> <option>RED</option> <optionInformation>EST</optionInformation> </optionInfo> </availabilityOptions> </requestSection> </Air\_MultiAvailability>

## 5.8.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_MultiAvailabilityReply xmlns="http://xml.amadeus.com/SATRSP\_16\_1\_1A"> <messageActionDetails> <functionDetails> <businessFunction>1</businessFunction> <actionCode>45</actionCode> </functionDetails> <responseType>3</responseType> </messageActionDetails> <singleCityPairInfo> <locationDetails> <origin>NCE</origin> <destination>DFW</destination> </locationDetails> <cityPairFreeFlowText> <freeTextQualification> <codedIndicator>4</codedIndicator> <typeOfInfo>50</typeOfInfo> </freeTextQualification> <freeText></freeText> <freeText></freeText> <freeText> SOUTH WEST - AN </freeText> <freeText></freeText> <freeText> 77 FR 20SEP 0000</freeText> </cityPairFreeFlowText> <cityPairFreeFlowText> <freeTextQualification> <codedIndicator>4</codedIndicator> <typeOfInfo>OFD</typeOfInfo> </freeTextQualification> <freeText>DFW DALLAS.USTX</freeText> </cityPairFreeFlowText> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>230214</departureDate> <departureTime>1150</departureTime> <arrivalDate>230214</arrivalDate> <arrivalTime>1300</arrivalTime> </flightDetails> <departureLocation> <cityAirport>NCE</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>LHR</cityAirport> </arrivalLocation> <marketingCompany> <identifier>WN</identifier> </marketingCompany> <flightIdentification> <number>343</number> </flightIdentification> <productTypeDetail> <productIndicators>S</productIndicators> <productIndicators>ET</productIndicators> </productTypeDetail> <lineItemNumber>1</lineItemNumber> </basicFlightInfo> <infoOnClasses> <productClassDetail> <serviceClass>J</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>C</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>R</serviceClass> <availabilityStatus>8</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>I</serviceClass> <availabilityStatus>4</availabilityStatus> </productClassDetail> </infoOnClasses> <additionalFlightInfo> <flightDetails> <typeOfAircraft>320</typeOfAircraft> <numberOfStops>0</numberOfStops> </flightDetails> <departureStation> <terminal>13</terminal> </departureStation> <arrivalStation> <terminal>5</terminal> </arrivalStation> <productFacilities> <type>1A</type> </productFacilities> <productFacilities> <type>LSA</type> </productFacilities> <productFacilities> <type>M</type> </productFacilities> </additionalFlightInfo> <ssrQuotaDetails> <quotaInfo> <quotaCounterName>BENE</quotaCounterName> <counter>5</counter> </quotaInfo> </ssrQuotaDetails> <legCabinInfo> <cabinIdentification> <cabinCode>C</cabinCode> </cabinIdentification> <legCabinCapacity> <cabinClassDetails> <classDesignator>C</classDesignator> <numberOfSeats>30</numberOfSeats> <characteristic>E</characteristic> </cabinClassDetails> </legCabinCapacity> <legCabinAvlCounters> <ups>10</ups> <bookingsCounter>20</bookingsCounter> <netAvailability>30</netAvailability> <grossAvailability>40</grossAvailability> <staffStandbyCounter>50</staffStandbyCounter> </legCabinAvlCounters> </legCabinInfo> </flightInfo> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>230214</departureDate> <departureTime>1500</departureTime> <arrivalDate>230214</arrivalDate> <arrivalTime>1915</arrivalTime> </flightDetails> <departureLocation> <cityAirport>LHR</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>DFW</cityAirport> </arrivalLocation> <marketingCompany> <identifier>WN</identifier> </marketingCompany> <flightIdentification> <number>1520</number> </flightIdentification> <productTypeDetail> <productIndicators>E</productIndicators> <productIndicators>ET</productIndicators> <productIndicators>SFL</productIndicators> </productTypeDetail> </basicFlightInfo> <infoOnClasses> <productClassDetail> <serviceClass>F</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>A</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <additionalFlightInfo> <flightDetails> <typeOfAircraft>777</typeOfAircraft> <numberOfStops>0</numberOfStops> <legDuration>1425</legDuration> </flightDetails> <departureStation> <terminal>3</terminal> </departureStation> <arrivalStation> <terminal>D</terminal> </arrivalStation> <productFacilities> <type>1A</type> </productFacilities> <productFacilities> <type>LSA</type> </productFacilities> <productFacilities> <type>M</type> </productFacilities> </additionalFlightInfo> <ssrQuotaDetails> <quotaInfo> <quotaCounterName>BENE</quotaCounterName> <counter>10</counter> </quotaInfo> </ssrQuotaDetails> <legCabinInfo> <cabinIdentification> <cabinCode>C</cabinCode> </cabinIdentification> <legCabinCapacity> <cabinClassDetails> <classDesignator>C</classDesignator> <numberOfSeats>50</numberOfSeats> <characteristic>E</characteristic> </cabinClassDetails> </legCabinCapacity> <legCabinAvlCounters> <ups>5</ups> <bookingsCounter>10</bookingsCounter> <netAvailability>15</netAvailability> <grossAvailability>20</grossAvailability> <staffStandbyCounter>25</staffStandbyCounter> </legCabinAvlCounters> </legCabinInfo> <flightErrorWarningSection> <flightErrorWarningInfo> <error> <code>ZZZ</code> <type>001</type> <listResponsible>AMD</listResponsible> </error> </flightErrorWarningInfo> </flightErrorWarningSection> </flightInfo> </singleCityPairInfo> </Air\_MultiAvailabilityReply>

## 5.8.3 Possible Errors

See "Error Messages" section.

* * *

## 5.9 Operation: Exclude carrier

You can exclude up to 6 airlines. Use <airlineOrFlightOption> for this purpose.

Example: Availability request between Nice (NCE) and New York (NYC) with an excluded carrier, Cathay Pacific (CX).

All flights with a CX flight number will be discarded.

## 5.9.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_MultiAvailability xmlns="http://xml.amadeus.com/SATRQT\_16\_1\_1A"> <messageActionDetails> <functionDetails> <actionCode>44</actionCode> </functionDetails> </messageActionDetails> <requestSection> <availabilityProductInfo> <availabilityDetails> <departureDate>151016</departureDate> </availabilityDetails> <departureLocationInfo> <cityAirport>NCE</cityAirport> </departureLocationInfo> <arrivalLocationInfo> <cityAirport>NYC</cityAirport> </arrivalLocationInfo> </availabilityProductInfo> <airlineOrFlightOption> <flightIdentification> <airlineCode>CX</airlineCode> </flightIdentification> <excludeAirlineIndicator>701</excludeAirlineIndicator> </airlineOrFlightOption> <availabilityOptions> <typeOfRequest>AN</typeOfRequest> </availabilityOptions> </requestSection> </Air\_MultiAvailability>

## 5.9.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.9.3 Possible Errors

See "Error Messages" section.

* * *

## 5.10 Operation: Flight facts

Authorised offices may receive service related information regarding a given flight for airlines that have the functionality. These services may be linked to a given cabin or class. 

By default, the operation returns the Inventory cabin code (e.g. physical cabin). To obtain the reservation cabin code, you must use the following:

-   <OptionInfo>

-   <type> "FCT"
-   <Arguments> "RES"

Example: Availability request between Paris CDG and New York JFK with Japan Airlines as the included marketing carrier, requesting the reservation cabin to be returned for flight facts.

For JL66, Flight facts are returned advising there is a suite for reservation cabin code F and a flat seat for reservation cabin C.

The following conditions apply:

-   Japan Airlines has subscribed to free format flight facts
-   The office is authorised to see free format flight facts
-   A fact rule exists for this flight: SUITE in first cabin and FLAT SEAT in business cabin

## 5.10.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_MultiAvailability xmlns="http://xml.amadeus.com/SATRQT\_16\_1\_1A"> <messageActionDetails> <functionDetails> <actionCode>44</actionCode> </functionDetails> </messageActionDetails> <requestSection> <availabilityProductInfo> <availabilityDetails> <departureDate>010116</departureDate> </availabilityDetails> <departureLocationInfo> <cityAirport>CDG</cityAirport> </departureLocationInfo> <arrivalLocationInfo> <cityAirport>NRT</cityAirport> </arrivalLocationInfo> </availabilityProductInfo> <optionClass> <productClassDetails> <serviceClass>Y</serviceClass> </productClassDetails> </optionClass> <airlineOrFlightOption> <flightIdentification> <airlineCode>JL</airlineCode> </flightIdentification> </airlineOrFlightOption> <availabilityOptions> <typeOfRequest>AN</typeOfRequest> </availabilityOptions> </requestSection> </Air\_MultiAvailability>

## 5.10.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_MultiAvailabilityReply xmlns="http://xml.amadeus.com/SATRSP\_16\_1\_1A"> <messageActionDetails> <functionDetails> <businessFunction>1</businessFunction> <actionCode>45</actionCode> </functionDetails> <responseType>3</responseType> </messageActionDetails> <singleCityPairInfo> <locationDetails> <origin>PAR</origin> <destination>NRT</destination> </locationDetails> <cityPairFreeFlowText> <freeTextQualification> <codedIndicator>4</codedIndicator> <typeOfInfo>50</typeOfInfo> </freeTextQualification> <freeText>AMADEUS AVAILABILITY - AN36 TH 01JAN 0000</freeText> </cityPairFreeFlowText> <cityPairFreeFlowText> <freeTextQualification> <codedIndicator>4</codedIndicator> <typeOfInfo>OFD</typeOfInfo> </freeTextQualification> <freeText>NRT NARITA INTL.JP</freeText> </cityPairFreeFlowText> <cityPairFreeFlowText> <freeTextQualification> <codedIndicator>4</codedIndicator> <typeOfInfo>51</typeOfInfo> </freeTextQualification> <freeText>NO LATER FLTS -PAR NRT- ENTER A CONNECT POINT /X... FOR MORE</freeText> <freeText>CK ALT DEST HND LMJ OKO</freeText> </cityPairFreeFlowText> <cityPairErrorOrWarning> <cityPairErrorOrWarningInfo> <error> <code>A7V</code> <type>001</type> <listResponsible>AMD</listResponsible> </error> </cityPairErrorOrWarningInfo> <cityPairErrorOrWarningText> <freeTextQualification> <codedIndicator>3</codedIndicator> </freeTextQualification> <freeText>NO MORE FLIGHTS</freeText> </cityPairErrorOrWarningText> </cityPairErrorOrWarning> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>010115</departureDate> <departureTime>2220</departureTime> <arrivalDate>020115</arrivalDate> <arrivalTime>1655</arrivalTime> </flightDetails> <departureLocation> <cityAirport>CDG</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>NRT</cityAirport> </arrivalLocation> <marketingCompany> <identifier>JL</identifier> </marketingCompany> <flightIdentification> <number>416</number> </flightIdentification> <productTypeDetail> <productIndicators>D</productIndicators> <productIndicators>ET</productIndicators> </productTypeDetail> <lineItemNumber>1</lineItemNumber> </basicFlightInfo> <infoOnClasses> <productClassDetail> <serviceClass>Y</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <additionalFlightInfo> <flightDetails> <typeOfAircraft>787</typeOfAircraft> <numberOfStops>0</numberOfStops> <legDuration>1035</legDuration> </flightDetails> <departureStation> <terminal>2E</terminal> </departureStation> <arrivalStation> <terminal>2</terminal> </arrivalStation> <productFacilities> <type>1A</type> </productFacilities> <productFacilities> <type>LSA</type> </productFacilities> </additionalFlightInfo> <cabinClassServiceList> <serviceType>FF</serviceType> <cabinClassInfo> <level>K</level> <service>F01</service> <description>SUITE</description> <designator>F</designator> </cabinClassInfo> <cabinClassInfo> <level>K</level> <service>F02</service> <description>FLAT SEAT</description> <designator>C</designator> </cabinClassInfo> </cabinClassServiceList> </flightInfo> </singleCityPairInfo> </Air\_MultiAvailabilityReply>

## 5.10.3 Possible Errors

See "Error Messages" section.

* * *

## 5.11 Operation: Forward scan

You can request the system to search for up to 31 days in the future to find the first day where flights are available for city pair and options specified.

Use <type> "SEV" and number of days to search in <arguments>.

The response mentions the date when the first occurrence is found:

\*\*FIRST FLIGHT AVAILABLE ON 10MAR\*\*

This entry is valid only for Carrier Preferred Display and ATO/CTOs.

Example: Availability request between Nice (NCE) and New York (NYC) on 05 December with Delta Airlines (DL) on Y class with a forward scan option up to 31 days.

## 5.11.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_MultiAvailability xmlns="http://xml.amadeus.com/SATRQT\_16\_1\_1A"> <messageActionDetails> <functionDetails> <businessFunction>1</businessFunction> <actionCode>44</actionCode> </functionDetails> </messageActionDetails> <requestSection> <availabilityProductInfo> <availabilityDetails> <departureDate>280215</departureDate> </availabilityDetails> <departureLocationInfo> <cityAirport>LON</cityAirport> </departureLocationInfo> <arrivalLocationInfo> <cityAirport>MIA</cityAirport> </arrivalLocationInfo> </availabilityProductInfo> <optionClass> <productClassDetails> <serviceClass>S</serviceClass> </productClassDetails> </optionClass> <airlineOrFlightOption> <flightIdentification> <airlineCode>BA</airlineCode> <number>209</number> </flightIdentification> </airlineOrFlightOption> <availabilityOptions> <typeOfRequest>AD</typeOfRequest> <optionInfo> <option>SEV</option> <optionInformation>31</optionInformation> </optionInfo> </availabilityOptions> </requestSection> </Air\_MultiAvailability>

## 5.11.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_MultiAvailabilityReply xmlns="http://xml.amadeus.com/SATRSP\_16\_1\_1A"> <messageActionDetails> <functionDetails> <businessFunction>1</businessFunction> <actionCode>45</actionCode> </functionDetails> <responseType>3</responseType> </messageActionDetails> <singleCityPairInfo> <locationDetails> <origin>LON</origin> <destination>MIA</destination> </locationDetails> <cityPairFreeFlowText> <freeTextQualification> <codedIndicator>4</codedIndicator> <typeOfInfo>50</typeOfInfo> </freeTextQualification> <freeText></freeText> <freeText></freeText> <freeText> BRITISH AIRWAYS - AN </freeText> <freeText></freeText> <freeText> 13 TU 10MAR 0000</freeText> </cityPairFreeFlowText> <cityPairFreeFlowText> <freeTextQualification> <codedIndicator>4</codedIndicator> <typeOfInfo>OFD</typeOfInfo> </freeTextQualification> <freeText>MIA MIAMI.USFL</freeText> </cityPairFreeFlowText> <cityPairFreeFlowText> <freeTextQualification> <codedIndicator>3</codedIndicator> </freeTextQualification> <freeText></freeText> <freeText></freeText> <freeText>FIRST FLIGHT AVAILABLE 10MAR</freeText> <freeText></freeText> <freeText> LON MIA</freeText> </cityPairFreeFlowText> <cityPairFreeFlowText> <freeTextQualification> <codedIndicator>4</codedIndicator> <typeOfInfo>51</typeOfInfo> </freeTextQualification> <freeText>NO MORE LATER FLTS 10MAR LON MIA</freeText> </cityPairFreeFlowText> <cityPairErrorOrWarning> <cityPairErrorOrWarningInfo> <error> <code>A7V</code> <type>001</type> <listResponsible>AMD</listResponsible> </error> </cityPairErrorOrWarningInfo> <cityPairErrorOrWarningText> <freeTextQualification> <codedIndicator>3</codedIndicator> </freeTextQualification> <freeText>NO MORE FLIGHTS</freeText> </cityPairErrorOrWarningText> </cityPairErrorOrWarning> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>100315</departureDate> <departureTime>1335</departureTime> <arrivalDate>100315</arrivalDate> <arrivalTime>1920</arrivalTime> </flightDetails> <departureLocation> <cityAirport>LHR</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>MIA</cityAirport> </arrivalLocation> <marketingCompany> <identifier>BA</identifier> </marketingCompany> <flightIdentification> <number>209</number> </flightIdentification> <productTypeDetail> <productIndicators>D</productIndicators> <productIndicators>ET</productIndicators> <productIndicators>SFL</productIndicators> </productTypeDetail> <lineItemNumber>1</lineItemNumber> </basicFlightInfo> <infoOnClasses> <productClassDetail> <serviceClass>S</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <additionalFlightInfo> <flightDetails> <typeOfAircraft>744</typeOfAircraft> <numberOfStops>0</numberOfStops> <legDuration>0945</legDuration> </flightDetails> <departureStation> <terminal>5</terminal> </departureStation> <productFacilities> <type>1A</type> </productFacilities> <productFacilities> <type>LSA</type> </productFacilities> <productFacilities> <type>M</type> </productFacilities> </additionalFlightInfo> </flightInfo> </singleCityPairInfo> </Air\_MultiAvailabilityReply>

## 5.11.3 Possible Errors

See "Error Messages" section

* * *

## 5.12 Operation: Frequent flyer

You can add the flyer details to the availability request for the Airline to finetune its flight availability. Use <frequentTraveller> for this purpose.

Example: Neutral Availability Request from London (LON) to Sydney (SYD) including Lufthansa frequent traveller card from passenger Sarah Jones.

This enables the airline to finetune its flight availability for this frequent traveller.

## 5.12.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_MultiAvailability xmlns="http://xml.amadeus.com/SATRQT\_16\_1\_1A"> <messageActionDetails> <functionDetails> <businessFunction>1</businessFunction> <actionCode>44</actionCode> </functionDetails> </messageActionDetails> <frequentTraveller> <travellerDetails> <paxDetails> <surname>JONES</surname> </paxDetails> <otherPaxDetails> <givenName>SARAH</givenName> </otherPaxDetails> </travellerDetails> <travelleridentification> <frequentTravellerDetails> <carrier>LH</carrier> <number>6200107371629</number> </frequentTravellerDetails> </travelleridentification> </frequentTraveller> <requestSection> <availabilityProductInfo> <availabilityDetails> <departureDate>151016</departureDate> </availabilityDetails> <departureLocationInfo> <cityAirport>LON</cityAirport> </departureLocationInfo> <arrivalLocationInfo> <cityAirport>SYD</cityAirport> </arrivalLocationInfo> </availabilityProductInfo> <availabilityOptions> <typeOfRequest>AN</typeOfRequest> </availabilityOptions> </requestSection> </Air\_MultiAvailability>

## 5.12.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.12.3 Possible Errors

See "Error Messages" section.

* * *

## 5.13 Operation: Include marketing carrier

You can include up to 6 marketing airlines. Use <airlineOrFlightOption> for this purpose.

Example: Availability request including marketing carrier AF and DL only.

Only AF and DL flight numbers are returned.

## 5.13.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_MultiAvailability xmlns="http://xml.amadeus.com/SATRQT\_16\_1\_1A"> <messageActionDetails> <functionDetails> <actionCode>44</actionCode> </functionDetails> </messageActionDetails> <requestSection> <availabilityProductInfo> <availabilityDetails> <departureDate>151016</departureDate> </availabilityDetails> <departureLocationInfo> <cityAirport>NCE</cityAirport> </departureLocationInfo> <arrivalLocationInfo> <cityAirport>NYC</cityAirport> </arrivalLocationInfo> </availabilityProductInfo> <airlineOrFlightOption> <flightIdentification> <airlineCode>AF</airlineCode> </flightIdentification> <flightIdentification> <airlineCode>DL</airlineCode> </flightIdentification> </airlineOrFlightOption> <availabilityOptions> <typeOfRequest>AN</typeOfRequest> </availabilityOptions> </requestSection> </Air\_MultiAvailability>

## 5.13.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.13.3 Possible Errors

See "Error Messages" section

* * *

## 5.14 Operation: Include operational carrier

You can filter on flights of a given airline, excluding codeshare flights. Use <excludeAirlineIndicator> value "705" for this purpose.

Example: Availability request between Nice (NCE) and New York (NYC) with operational carrier Lufthansa (LH).

LH flight numbers operated by LH only are returned (e.g. LH flight numbers operated by another airline are removed).

## 5.14.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_MultiAvailability xmlns="http://xml.amadeus.com/SATRQT\_16\_1\_1A"> <messageActionDetails> <functionDetails> <actionCode>44</actionCode> </functionDetails> </messageActionDetails> <requestSection> <availabilityProductInfo> <availabilityDetails> <departureDate>151016</departureDate> </availabilityDetails> <departureLocationInfo> <cityAirport>NCE</cityAirport> </departureLocationInfo> <arrivalLocationInfo> <cityAirport>NYC</cityAirport> </arrivalLocationInfo> </availabilityProductInfo> <airlineOrFlightOption> <flightIdentification> <airlineCode>LH</airlineCode> </flightIdentification> <excludeAirlineIndicator>705</excludeAirlineIndicator> </airlineOrFlightOption> <availabilityOptions> <typeOfRequest>AN</typeOfRequest> </availabilityOptions> </requestSection> </Air\_MultiAvailability>

## 5.14.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.14.3 Possible Errors

See "Error Messages" section.

* * *

## 5.15 Operation: Mixed options

You can obvisouly mix several options.

Example: Availability request for 5 passengers on 15 October from 19:00 between Nice (NCE) and New York (NYC), using connecting point Paris (PAR), airline AF and cabin business sorted by arrival time.

## 5.15.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_MultiAvailability xmlns="http://xml.amadeus.com/SATRQT\_16\_1\_1A"> <messageActionDetails> <functionDetails> <businessFunction>1</businessFunction> <actionCode>48</actionCode> </functionDetails> </messageActionDetails> <requestSection> <availabilityProductInfo> <availabilityDetails> <departureDate>151016</departureDate> <departureTime>1900</departureTime> </availabilityDetails> <departureLocationInfo> <cityAirport>NCE</cityAirport> </departureLocationInfo> <arrivalLocationInfo> <cityAirport>NYC</cityAirport> </arrivalLocationInfo> </availabilityProductInfo> <qualifiedConnectionOption> <connectionOption> <firstConnection> <location>PAR</location> </firstConnection> </connectionOption> </qualifiedConnectionOption> <numberOfSeatsInfo> <numberOfPassengers>5</numberOfPassengers> </numberOfSeatsInfo> <airlineOrFlightOption> <flightIdentification> <airlineCode>AF</airlineCode> </flightIdentification> </airlineOrFlightOption> <cabinOption> <cabinDesignation> <cabinClassOfServiceList>2</cabinClassOfServiceList> </cabinDesignation> </cabinOption> <availabilityOptions> <typeOfRequest>AA</typeOfRequest> </availabilityOptions> </requestSection> </Air\_MultiAvailability>

## 5.15.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.15.3 Possible Errors

See "Error Messages" section

* * *

## 5.16 Operation: Negotiated space dedicated availability

You can display the negotiated space availability on a given origin and destination. You may filter on a given airline, flight and/or tour name.

The following elements are displayed: Flight information, block status, owner, tour name, tour reference, class and exact posting of the class.

Example: Negotiated space availability request for flight AF6002/30OCT from Paris (ORY) to Marseille (MRS) using Tour name MONTOURTESTAIRF.

You need to use TypeOfRequest = \[AST\]T for negotiated space dedicated availability.

## 5.16.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_MultiAvailability xmlns="http://xml.amadeus.com/SATRQT\_16\_1\_1A"> <messageActionDetails> <functionDetails> <actionCode>44</actionCode> </functionDetails> </messageActionDetails> <requestSection> <availabilityProductInfo> <availabilityDetails> <departureDate>301016</departureDate> </availabilityDetails> <departureLocationInfo> <cityAirport>ORY</cityAirport> </departureLocationInfo> <arrivalLocationInfo> <cityAirport>MRS</cityAirport> </arrivalLocationInfo> </availabilityProductInfo> <airlineOrFlightOption> <flightIdentification> <airlineCode>AF</airlineCode> <number>6002</number> </flightIdentification> </airlineOrFlightOption> <negoSpaceDetails> <tourName>MONTOURTESTAIRF</tourName> </negoSpaceDetails> <availabilityOptions> <typeOfRequest>AT</typeOfRequest> </availabilityOptions> </requestSection> </Air\_MultiAvailability>

## 5.16.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_MultiAvailabilityReply xmlns="http://xml.amadeus.com/SATRSP\_16\_1\_1A"> <messageActionDetails> <functionDetails> <businessFunction>1</businessFunction> <actionCode>45</actionCode> </functionDetails> <responseType>3</responseType> </messageActionDetails> <singleCityPairInfo> <locationDetails> <origin>ORY</origin> <destination>MRS</destination> </locationDetails> <cityPairFreeFlowText> <freeTextQualification> <codedIndicator>4</codedIndicator> <typeOfInfo>50</typeOfInfo> </freeTextQualification> <freeText></freeText> <freeText></freeText> <freeText> AMADEUS NEGOTIATED SPACE AVAILABILITY - AT </freeText> <freeText></freeText> <freeText>090MO30OCT</freeText> </cityPairFreeFlowText> <cityPairFreeFlowText> <freeTextQualification> <codedIndicator>4</codedIndicator> <typeOfInfo>51</typeOfInfo> </freeTextQualification> <freeText></freeText> <freeText></freeText> <freeText> NO MORE NEGOTIATED SPACE FLIGHTS </freeText> </cityPairFreeFlowText> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>301006</departureDate> <departureTime>0635</departureTime> <arrivalDate>301006</arrivalDate> <arrivalTime>0750</arrivalTime> </flightDetails> <departureLocation> <cityAirport>ORY</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>MRS</cityAirport> </arrivalLocation> <marketingCompany> <identifier>AF</identifier> </marketingCompany> <flightIdentification> <number>6002</number> </flightIdentification> <productTypeDetail> <productIndicators>D</productIndicators> </productTypeDetail> <lineItemNumber>1</lineItemNumber> </basicFlightInfo> <infoOnClasses> <productClassDetail> <serviceClass>Y</serviceClass> <availabilityStatus>4</availabilityStatus> </productClassDetail> </infoOnClasses> <additionalFlightInfo> <flightDetails> <typeOfAircraft>319</typeOfAircraft> <numberOfStops>0</numberOfStops> <legDuration>0115</legDuration> </flightDetails> </additionalFlightInfo> <negoSpaceDetails> <ownerDetails> <code>NYCP02001</code> </ownerDetails> <tourName>MONTOURTESTAIRF</tourName> <negoStatus>ACTIVE</negoStatus> </negoSpaceDetails> </flightInfo> </singleCityPairInfo> </Air\_MultiAvailabilityReply>

## 5.16.3 Possible Errors

See "Error Messages" section.

* * *

## 5.17 Operation: Negotiated space in neutral availability

Whenever you have Negotiated Space on a given airline and flight number, a neutral availability displays the negotiated space posting for the class on which it applies and standard postings  for the other classes.

Example: Neutral availability request from Frankfurt (FRA) to Bremen (BRE) with LH342 for Class Y.

Prerequisite: Negotiated space block space exists for this flight on Y class.

## 5.17.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_MultiAvailability xmlns="http://xml.amadeus.com/SATRQT\_16\_1\_1A"> <messageActionDetails> <functionDetails> <actionCode>44</actionCode> </functionDetails> </messageActionDetails> <requestSection> <availabilityProductInfo> <availabilityDetails> <departureDate>201116</departureDate> </availabilityDetails> <departureLocationInfo> <cityAirport>FRA</cityAirport> </departureLocationInfo> <arrivalLocationInfo> <cityAirport>BRE</cityAirport> </arrivalLocationInfo> </availabilityProductInfo> <optionClass> <productClassDetails> <serviceClass>Y</serviceClass> </productClassDetails> </optionClass> <airlineOrFlightOption> <flightIdentification> <airlineCode>LH</airlineCode> <number>342</number> </flightIdentification> </airlineOrFlightOption> <availabilityOptions> <typeOfRequest>AN</typeOfRequest> </availabilityOptions> </requestSection> </Air\_MultiAvailability>

## 5.17.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_MultiAvailabilityReply xmlns="http://xml.amadeus.com/SATRSP\_16\_1\_1A"> <messageActionDetails> <functionDetails> <businessFunction>1</businessFunction> <actionCode>45</actionCode> </functionDetails> <responseType>3</responseType> </messageActionDetails> <singleCityPairInfo> <locationDetails> <origin>FRA</origin> <destination>BRE</destination> </locationDetails> <cityPairFreeFlowText> <freeTextQualification> <codedIndicator>4</codedIndicator> <typeOfInfo>50</typeOfInfo> </freeTextQualification> <freeText></freeText> <freeText></freeText> <freeText>AMADEUS AVAILABILITY - AN </freeText> <freeText></freeText> <freeText> 112 MO 20NOV 0000</freeText> </cityPairFreeFlowText> <cityPairFreeFlowText> <freeTextQualification> <codedIndicator>4</codedIndicator> <typeOfInfo>OFD</typeOfInfo> </freeTextQualification> <freeText>BRE BREMEN.DE</freeText> </cityPairFreeFlowText> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>201106</departureDate> <departureTime>0905</departureTime> <arrivalDate>201106</arrivalDate> <arrivalTime>1000</arrivalTime> </flightDetails> <departureLocation> <cityAirport>FRA</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>BRE</cityAirport> </arrivalLocation> <marketingCompany> <identifier>LH</identifier> </marketingCompany> <flightIdentification> <number>342</number> </flightIdentification> <productTypeDetail> <productIndicators>D</productIndicators> <productIndicators>ET</productIndicators> </productTypeDetail> <lineItemNumber>1</lineItemNumber> </basicFlightInfo> <infoOnClasses> <productClassDetail> <serviceClass>Y</serviceClass> <availabilityStatus>5</availabilityStatus> <modifier>L</modifier> </productClassDetail> </infoOnClasses> <additionalFlightInfo> <flightDetails> <typeOfAircraft>733</typeOfAircraft> <numberOfStops>0</numberOfStops> <legDuration>0055</legDuration> </flightDetails> <departureStation> <terminal>1</terminal> </departureStation> <productFacilities> <type>1A</type> </productFacilities> <productFacilities> <type>LSA</type> </productFacilities> <productFacilities> <type>M</type> </productFacilities> </additionalFlightInfo> </flightInfo> </singleCityPairInfo> </Air\_MultiAvailabilityReply>

## 5.17.3 Possible Errors

See "Error Messages" section.

* * *

## 5.18 Operation: Point of commencement

You can indicate the point of commencement and the date of commencement of the journey which can then be used for the airlines to finetune their availability calculation.

Example: Availability request done between Sydney (SYD) and Paris (CDG) on the 18 October advising travel actually originates from Paris (CDG) on 06 October.

## 5.18.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_MultiAvailability xmlns="http://xml.amadeus.com/SATRQT\_16\_1\_1A"> <messageActionDetails> <functionDetails> <actionCode>44</actionCode> </functionDetails> </messageActionDetails> <pointOfCommencement> <location>CDG</location> <date>061016</date> </pointOfCommencement> <requestSection> <availabilityProductInfo> <availabilityDetails> <departureDate>181013</departureDate> </availabilityDetails> <departureLocationInfo> <cityAirport>SYD</cityAirport> </departureLocationInfo> <arrivalLocationInfo> <cityAirport>CDG</cityAirport> </arrivalLocationInfo> </availabilityProductInfo> <availabilityOptions> <typeOfRequest>AN</typeOfRequest> </availabilityOptions> </requestSection> </Air\_MultiAvailability>

## 5.18.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.18.3 Possible Errors

See "Error Messages" section.

* * *

## 5.19 Operation: Request scrolling (MD) on previous entry

You can scroll down to get next available solutions for your query.

Example: Move down on an availability request between London (LON) and Miami (MIA) on 15 January.

<actionCode> to be used is "55".

## 5.19.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_MultiAvailability xmlns="http://xml.amadeus.com/SATRQT\_16\_1\_1A"> <messageActionDetails> <functionDetails> <actionCode>55</actionCode> </functionDetails> </messageActionDetails> </Air\_MultiAvailability>

## 5.19.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.19.3 Possible Errors

See "Error Messages" section.

* * *

## 5.20 Operation: Schedule request - basic

You can display all flight schedules published to Amadeus which are available for sale or not.

Example: Schedule request between London (LON) and Sydney (SYD) on 15 October.

<actionCode> to be used is "48".

<typeOfRequest> can be set to SN, SA, SD, SE .

## 5.20.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_MultiAvailability xmlns="http://xml.amadeus.com/SATRQT\_16\_1\_1A"> <messageActionDetails> <functionDetails> <businessFunction>1</businessFunction> <actionCode>48</actionCode> </functionDetails> </messageActionDetails> <requestSection> <availabilityProductInfo> <availabilityDetails> <departureDate>151016</departureDate> </availabilityDetails> <departureLocationInfo> <cityAirport>LON</cityAirport> </departureLocationInfo> <arrivalLocationInfo> <cityAirport>SYD</cityAirport> </arrivalLocationInfo> </availabilityProductInfo> <availabilityOptions> <typeOfRequest>SN</typeOfRequest> </availabilityOptions> </requestSection> </Air\_MultiAvailability>

## 5.20.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_MultiAvailabilityReply xmlns="http://xml.amadeus.com/SATRSP\_16\_1\_1A"> <messageActionDetails> <functionDetails> <businessFunction>1</businessFunction> <actionCode>49</actionCode> </functionDetails> <responseType>3</responseType> </messageActionDetails> <singleCityPairInfo> <locationDetails> <origin>LON</origin> <destination>SYD</destination> </locationDetails> <cityPairFreeFlowText> <freeTextQualification> <codedIndicator>4</codedIndicator> <typeOfInfo>50</typeOfInfo> </freeTextQualification> <freeText></freeText> <freeText></freeText> <freeText> AMADEUS SCHEDULES - SN </freeText> <freeText></freeText> <freeText> 111 TU 15OCT 0000</freeText> </cityPairFreeFlowText> <cityPairFreeFlowText> <freeTextQualification> <codedIndicator>4</codedIndicator> <typeOfInfo>OFD</typeOfInfo> </freeTextQualification> <freeText>SYD SYDNEY.AUNS</freeText> </cityPairFreeFlowText> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>151013</departureDate> <departureTime>2130</departureTime> <arrivalDate>171013</arrivalDate> <arrivalTime>0610</arrivalTime> </flightDetails> <departureLocation> <cityAirport>LHR</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>SYD</cityAirport> </arrivalLocation> <marketingCompany> <identifier>QF</identifier> </marketingCompany> <flightIdentification> <number>2</number> </flightIdentification> <productTypeDetail> <productIndicators>D</productIndicators> <productIndicators>ET</productIndicators> </productTypeDetail> <lineItemNumber>1</lineItemNumber> </basicFlightInfo> <infoOnClasses> <productClassDetail> <serviceClass>F</serviceClass> <availabilityStatus>4</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>A</serviceClass> <availabilityStatus>3</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>J</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>C</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>D</serviceClass> <availabilityStatus>1</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>I</serviceClass> <availabilityStatus>L</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>W</serviceClass> <availabilityStatus>1</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>R</serviceClass> <availabilityStatus>L</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>T</serviceClass> <availabilityStatus>L</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Y</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>B</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>H</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>K</serviceClass> <availabilityStatus>1</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>M</serviceClass> <availabilityStatus>L</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>L</serviceClass> <availabilityStatus>L</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>V</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>S</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>N</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Q</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>O</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>G</serviceClass> <availabilityStatus>L</availabilityStatus> </productClassDetail> </infoOnClasses> <additionalFlightInfo> <flightDetails> <typeOfAircraft>388</typeOfAircraft> <numberOfStops>1</numberOfStops> <legDuration>2240</legDuration> </flightDetails> <departureStation> <terminal>3</terminal> </departureStation> <arrivalStation> <terminal>1</terminal> </arrivalStation> <productFacilities> <type>1A</type> </productFacilities> <productFacilities> <type>LSA</type> </productFacilities> <productFacilities> <type>M</type> </productFacilities> </additionalFlightInfo> </flightInfo> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>151013</departureDate> <departureTime>2115</departureTime> <arrivalDate>171013</arrivalDate> <arrivalTime>0610</arrivalTime> </flightDetails> <departureLocation> <cityAirport>LHR</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>SYD</cityAirport> </arrivalLocation> <marketingCompany> <identifier>BA</identifier> </marketingCompany> <flightIdentification> <number>15</number> </flightIdentification> <productTypeDetail> <productIndicators>D</productIndicators> <productIndicators>ET</productIndicators> </productTypeDetail> <lineItemNumber>2</lineItemNumber> </basicFlightInfo> <infoOnClasses> <productClassDetail> <serviceClass>F</serviceClass> <availabilityStatus>6</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>A</serviceClass> <availabilityStatus>4</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>J</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>C</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>D</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>R</serviceClass> <availabilityStatus>5</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>I</serviceClass> <availabilityStatus>1</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>W</serviceClass> <availabilityStatus>5</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>E</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>T</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Y</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>B</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>H</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>K</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>M</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>L</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>V</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>S</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>N</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Q</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>O</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>G</serviceClass> <availabilityStatus>L</availabilityStatus> </productClassDetail> </infoOnClasses> <additionalFlightInfo> <flightDetails> <typeOfAircraft>777</typeOfAircraft> <numberOfStops>1</numberOfStops> <legDuration>2255</legDuration> </flightDetails> <departureStation> <terminal>5</terminal> </departureStation> <arrivalStation> <terminal>1</terminal> </arrivalStation> <productFacilities> <type>1A</type> </productFacilities> <productFacilities> <type>LSA</type> </productFacilities> <productFacilities> <type>M</type> </productFacilities> </additionalFlightInfo> </flightInfo> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>151013</departureDate> <departureTime>2230</departureTime> <arrivalDate>171013</arrivalDate> <arrivalTime>0735</arrivalTime> </flightDetails> <departureLocation> <cityAirport>LHR</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>SYD</cityAirport> </arrivalLocation> <marketingCompany> <identifier>VS</identifier> </marketingCompany> <flightIdentification> <number>200</number> </flightIdentification> <productTypeDetail> <productIndicators>D</productIndicators> <productIndicators>ET</productIndicators> </productTypeDetail> <lineItemNumber>3</lineItemNumber> </basicFlightInfo> <infoOnClasses> <productClassDetail> <serviceClass>J</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>C</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>D</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>I</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Z</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>W</serviceClass> <availabilityStatus>R</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>S</serviceClass> <availabilityStatus>0</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>H</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>K</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Y</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>B</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>R</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>L</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>U</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>M</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>E</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Q</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>X</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>N</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>O</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <additionalFlightInfo> <flightDetails> <typeOfAircraft>346</typeOfAircraft> <numberOfStops>1</numberOfStops> <legDuration>2305</legDuration> </flightDetails> <departureStation> <terminal>3</terminal> </departureStation> <arrivalStation> <terminal>1</terminal> </arrivalStation> <productFacilities> <type>AS</type> </productFacilities> <productFacilities> <type>DA</type> </productFacilities> <productFacilities> <type>M</type> </productFacilities> </additionalFlightInfo> </flightInfo> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>151013</departureDate> <departureTime>2215</departureTime> <arrivalDate>161013</arrivalDate> <arrivalTime>0805</arrivalTime> </flightDetails> <departureLocation> <cityAirport>LHR</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>DXB</cityAirport> </arrivalLocation> <marketingCompany> <identifier>QF</identifier> </marketingCompany> <operatingCompany> <identifier>EK</identifier> </operatingCompany> <flightIdentification> <number>8006</number> </flightIdentification> <productTypeDetail> <productIndicators>S</productIndicators> <productIndicators>701</productIndicators> <productIndicators>ET</productIndicators> </productTypeDetail> <lineItemNumber>4</lineItemNumber> </basicFlightInfo> <infoOnClasses> <productClassDetail> <serviceClass>F</serviceClass> <availabilityStatus>2</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>A</serviceClass> <availabilityStatus>2</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>J</serviceClass> <availabilityStatus>7</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>C</serviceClass> <availabilityStatus>7</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>D</serviceClass> <availabilityStatus>7</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>I</serviceClass> <availabilityStatus>7</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Y</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>B</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>H</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>K</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>M</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>L</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>V</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>S</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>N</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Q</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>O</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <additionalFlightInfo> <flightDetails> <typeOfAircraft>388</typeOfAircraft> <numberOfStops>0</numberOfStops> </flightDetails> <departureStation> <terminal>3</terminal> </departureStation> <arrivalStation> <terminal>3</terminal> </arrivalStation> <productFacilities> <type>1A</type> </productFacilities> <productFacilities> <type>LSA</type> </productFacilities> <productFacilities> <type>M</type> </productFacilities> </additionalFlightInfo> </flightInfo> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>161013</departureDate> <departureTime>0920</departureTime> <arrivalDate>171013</arrivalDate> <arrivalTime>0610</arrivalTime> </flightDetails> <departureLocation> <cityAirport>DXB</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>SYD</cityAirport> </arrivalLocation> <marketingCompany> <identifier>QF</identifier> </marketingCompany> <flightIdentification> <number>2</number> </flightIdentification> <productTypeDetail> <productIndicators>E</productIndicators> <productIndicators>ET</productIndicators> </productTypeDetail> </basicFlightInfo> <infoOnClasses> <productClassDetail> <serviceClass>F</serviceClass> <availabilityStatus>6</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>A</serviceClass> <availabilityStatus>4</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>J</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>C</serviceClass> <availabilityStatus>L</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>D</serviceClass> <availabilityStatus>L</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>I</serviceClass> <availabilityStatus>L</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>W</serviceClass> <availabilityStatus>L</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>R</serviceClass> <availabilityStatus>L</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>T</serviceClass> <availabilityStatus>L</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Y</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>B</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>H</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>K</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>M</serviceClass> <availabilityStatus>L</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>L</serviceClass> <availabilityStatus>L</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>V</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>S</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>N</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Q</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>O</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>G</serviceClass> <availabilityStatus>L</availabilityStatus> </productClassDetail> </infoOnClasses> <additionalFlightInfo> <flightDetails> <typeOfAircraft>388</typeOfAircraft> <numberOfStops>0</numberOfStops> <legDuration>2155</legDuration> </flightDetails> <departureStation> <terminal>3</terminal> </departureStation> <arrivalStation> <terminal>1</terminal> </arrivalStation> <productFacilities> <type>1A</type> </productFacilities> <productFacilities> <type>LSA</type> </productFacilities> <productFacilities> <type>M</type> </productFacilities> </additionalFlightInfo> </flightInfo> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>151013</departureDate> <departureTime>2215</departureTime> <arrivalDate>161013</arrivalDate> <arrivalTime>0805</arrivalTime> </flightDetails> <departureLocation> <cityAirport>LHR</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>DXB</cityAirport> </arrivalLocation> <marketingCompany> <identifier>EK</identifier> </marketingCompany> <flightIdentification> <number>6</number> </flightIdentification> <productTypeDetail> <productIndicators>S</productIndicators> <productIndicators>ET</productIndicators> </productTypeDetail> <lineItemNumber>5</lineItemNumber> </basicFlightInfo> <infoOnClasses> <productClassDetail> <serviceClass>F</serviceClass> <availabilityStatus>4</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>A</serviceClass> <availabilityStatus>4</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>J</serviceClass> <availabilityStatus>7</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>C</serviceClass> <availabilityStatus>3</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>I</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>O</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Y</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>E</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>R</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>W</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>M</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>B</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>U</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>K</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>H</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Q</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>L</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>T</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>V</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>X</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <additionalFlightInfo> <flightDetails> <typeOfAircraft>388</typeOfAircraft> <numberOfStops>0</numberOfStops> </flightDetails> <departureStation> <terminal>3</terminal> </departureStation> <arrivalStation> <terminal>3</terminal> </arrivalStation> <productFacilities> <type>1A</type> </productFacilities> <productFacilities> <type>DA</type> </productFacilities> <productFacilities> <type>LSA</type> </productFacilities> <productFacilities> <type>M</type> </productFacilities> </additionalFlightInfo> </flightInfo> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>161013</departureDate> <departureTime>0920</departureTime> <arrivalDate>171013</arrivalDate> <arrivalTime>0610</arrivalTime> </flightDetails> <departureLocation> <cityAirport>DXB</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>SYD</cityAirport> </arrivalLocation> <marketingCompany> <identifier>EK</identifier> </marketingCompany> <operatingCompany> <identifier>QF</identifier> </operatingCompany> <flightIdentification> <number>5002</number> </flightIdentification> <productTypeDetail> <productIndicators>E</productIndicators> <productIndicators>701</productIndicators> <productIndicators>ET</productIndicators> </productTypeDetail> </basicFlightInfo> <infoOnClasses> <productClassDetail> <serviceClass>F</serviceClass> <availabilityStatus>4</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>A</serviceClass> <availabilityStatus>4</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>J</serviceClass> <availabilityStatus>7</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>C</serviceClass> <availabilityStatus>0</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>I</serviceClass> <availabilityStatus>0</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>O</serviceClass> <availabilityStatus>0</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Y</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>E</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>R</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>W</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>M</serviceClass> <availabilityStatus>0</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>B</serviceClass> <availabilityStatus>0</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>U</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>K</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>H</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Q</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>L</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>T</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>V</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>X</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <additionalFlightInfo> <flightDetails> <typeOfAircraft>388</typeOfAircraft> <numberOfStops>0</numberOfStops> <legDuration>2155</legDuration> </flightDetails> <departureStation> <terminal>3</terminal> </departureStation> <arrivalStation> <terminal>1</terminal> </arrivalStation> <productFacilities> <type>1A</type> </productFacilities> <productFacilities> <type>DA</type> </productFacilities> <productFacilities> <type>LSA</type> </productFacilities> </additionalFlightInfo> </flightInfo> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>151013</departureDate> <departureTime>1425</departureTime> <arrivalDate>161013</arrivalDate> <arrivalTime>0025</arrivalTime> </flightDetails> <departureLocation> <cityAirport>LGW</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>DXB</cityAirport> </arrivalLocation> <marketingCompany> <identifier>QF</identifier> </marketingCompany> <operatingCompany> <identifier>EK</identifier> </operatingCompany> <flightIdentification> <number>8016</number> </flightIdentification> <productTypeDetail> <productIndicators>S</productIndicators> <productIndicators>701</productIndicators> <productIndicators>ET</productIndicators> </productTypeDetail> <lineItemNumber>6</lineItemNumber> </basicFlightInfo> <infoOnClasses> <productClassDetail> <serviceClass>F</serviceClass> <availabilityStatus>2</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>A</serviceClass> <availabilityStatus>2</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>J</serviceClass> <availabilityStatus>7</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>C</serviceClass> <availabilityStatus>7</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>D</serviceClass> <availabilityStatus>7</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>I</serviceClass> <availabilityStatus>7</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Y</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>B</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>H</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>K</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>M</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>L</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>V</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>S</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>N</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Q</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>O</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <additionalFlightInfo> <flightDetails> <typeOfAircraft>77W</typeOfAircraft> <numberOfStops>0</numberOfStops> </flightDetails> <departureStation> <terminal>N</terminal> </departureStation> <arrivalStation> <terminal>3</terminal> </arrivalStation> <productFacilities> <type>1A</type> </productFacilities> <productFacilities> <type>LSA</type> </productFacilities> <productFacilities> <type>M</type> </productFacilities> </additionalFlightInfo> </flightInfo> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>161013</departureDate> <departureTime>0150</departureTime> <arrivalDate>161013</arrivalDate> <arrivalTime>2230</arrivalTime> </flightDetails> <departureLocation> <cityAirport>DXB</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>SYD</cityAirport> </arrivalLocation> <marketingCompany> <identifier>QF</identifier> </marketingCompany> <operatingCompany> <identifier>EK</identifier> </operatingCompany> <flightIdentification> <number>8414</number> </flightIdentification> <productTypeDetail> <productIndicators>E</productIndicators> <productIndicators>701</productIndicators> <productIndicators>ET</productIndicators> </productTypeDetail> </basicFlightInfo> <infoOnClasses> <productClassDetail> <serviceClass>F</serviceClass> <availabilityStatus>2</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>A</serviceClass> <availabilityStatus>2</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>J</serviceClass> <availabilityStatus>7</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>C</serviceClass> <availabilityStatus>7</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>D</serviceClass> <availabilityStatus>7</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>I</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Y</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>B</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>H</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>K</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>M</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>L</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>V</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>S</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>N</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Q</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>O</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <additionalFlightInfo> <flightDetails> <typeOfAircraft>388</typeOfAircraft> <numberOfStops>0</numberOfStops> <legDuration>2205</legDuration> </flightDetails> <departureStation> <terminal>3</terminal> </departureStation> <arrivalStation> <terminal>1</terminal> </arrivalStation> <productFacilities> <type>1A</type> </productFacilities> <productFacilities> <type>LSA</type> </productFacilities> <productFacilities> <type>M</type> </productFacilities> </additionalFlightInfo> </flightInfo> </singleCityPairInfo> </Air\_MultiAvailabilityReply>

## 5.20.3 Possible Errors

See "Error Messages" section

* * *

## 5.21 Operation: Schedule request - mixed options

Similarly to the Availability request, you can mix several options.

Example: Neutral schedule request on 15 October between Nice (NCE) and New York (NYC) for Class Y and K, connecting in Paris (PAR) with airline Air France (AF) or Delta Airlines (DL).

## 5.21.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_MultiAvailability xmlns="http://xml.amadeus.com/SATRQT\_16\_1\_1A"> <messageActionDetails> <functionDetails> <actionCode>48</actionCode> </functionDetails> </messageActionDetails> <requestSection> <availabilityProductInfo> <availabilityDetails> <departureDate>151016</departureDate> </availabilityDetails> <departureLocationInfo> <cityAirport>NCE</cityAirport> </departureLocationInfo> <arrivalLocationInfo> <cityAirport>NYC</cityAirport> </arrivalLocationInfo> </availabilityProductInfo> <optionClass> <productClassDetails> <serviceClass>Y</serviceClass> </productClassDetails> <productClassDetails> <serviceClass>K</serviceClass> </productClassDetails> </optionClass> <qualifiedConnectionOption> <connectionOption> <firstConnection> <location>PAR</location> </firstConnection> </connectionOption> </qualifiedConnectionOption> <airlineOrFlightOption> <flightIdentification> <airlineCode>AF</airlineCode> </flightIdentification> <flightIdentification> <airlineCode>DL</airlineCode> </flightIdentification> </airlineOrFlightOption> <availabilityOptions> <typeOfRequest>SN</typeOfRequest> </availabilityOptions> </requestSection> </Air\_MultiAvailability>

## 5.21.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_MultiAvailabilityReply xmlns="http://xml.amadeus.com/SATRSP\_16\_1\_1A"> <messageActionDetails> <functionDetails> <businessFunction>1</businessFunction> <actionCode>49</actionCode> </functionDetails> <responseType>3</responseType> </messageActionDetails> <singleCityPairInfo> <locationDetails> <origin>NCE</origin> <destination>NYC</destination> </locationDetails> <cityPairFreeFlowText> <freeTextQualification> <codedIndicator>4</codedIndicator> <typeOfInfo>50</typeOfInfo> </freeTextQualification> <freeText></freeText> <freeText></freeText> <freeText> AMADEUS SCHEDULES - SN </freeText> <freeText></freeText> <freeText> 232 SA 15OCT 0000</freeText> </cityPairFreeFlowText> <cityPairFreeFlowText> <freeTextQualification> <codedIndicator>4</codedIndicator> <typeOfInfo>OFD</typeOfInfo> </freeTextQualification> <freeText>NYC NEW YORK.USNY</freeText> </cityPairFreeFlowText> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>151015</departureDate> <departureTime>1605</departureTime> <arrivalDate>151016</arrivalDate> <arrivalTime>1740</arrivalTime> </flightDetails> <departureLocation> <cityAirport>NCE</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>CDG</cityAirport> </arrivalLocation> <marketingCompany> <identifier>AF</identifier> </marketingCompany> <flightIdentification> <number>7715</number> </flightIdentification> <productTypeDetail> <productIndicators>S</productIndicators> <productIndicators>ET</productIndicators> </productTypeDetail> <lineItemNumber>1</lineItemNumber> </basicFlightInfo> <infoOnClasses> <productClassDetail> <serviceClass>Y</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>K</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <additionalFlightInfo> <flightDetails> <typeOfAircraft>319</typeOfAircraft> <numberOfStops>0</numberOfStops> </flightDetails> <departureStation> <terminal>2</terminal> </departureStation> <arrivalStation> <terminal>2F</terminal> </arrivalStation> <productFacilities> <type>1A</type> </productFacilities> <productFacilities> <type>LSA</type> </productFacilities> </additionalFlightInfo> </flightInfo> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>151015</departureDate> <departureTime>1910</departureTime> <arrivalDate>151016</arrivalDate> <arrivalTime>2120</arrivalTime> </flightDetails> <departureLocation> <cityAirport>CDG</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>JFK</cityAirport> </arrivalLocation> <marketingCompany> <identifier>DL</identifier> </marketingCompany> <operatingCompany> <identifier>AF</identifier> </operatingCompany> <flightIdentification> <number>1021</number> </flightIdentification> <productTypeDetail> <productIndicators>E</productIndicators> <productIndicators>701</productIndicators> <productIndicators>ET</productIndicators> <productIndicators>SFL</productIndicators> </productTypeDetail> </basicFlightInfo> <infoOnClasses> <productClassDetail> <serviceClass>Y</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>K</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <additionalFlightInfo> <flightDetails> <typeOfAircraft>77W</typeOfAircraft> <numberOfStops>0</numberOfStops> <legDuration>1115</legDuration> </flightDetails> <departureStation> <terminal>2E</terminal> </departureStation> <arrivalStation> <terminal>1</terminal> </arrivalStation> <productFacilities> <type>1A</type> </productFacilities> <productFacilities> <type>DA</type> </productFacilities> <productFacilities> <type>LSA</type> </productFacilities> </additionalFlightInfo> </flightInfo> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>151015</departureDate> <departureTime>1605</departureTime> <arrivalDate>151016</arrivalDate> <arrivalTime>1740</arrivalTime> </flightDetails> <departureLocation> <cityAirport>NCE</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>CDG</cityAirport> </arrivalLocation> <marketingCompany> <identifier>AF</identifier> </marketingCompany> <flightIdentification> <number>7715</number> </flightIdentification> <productTypeDetail> <productIndicators>S</productIndicators> <productIndicators>ET</productIndicators> </productTypeDetail> <lineItemNumber>2</lineItemNumber> </basicFlightInfo> <infoOnClasses> <productClassDetail> <serviceClass>Y</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>K</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <additionalFlightInfo> <flightDetails> <typeOfAircraft>319</typeOfAircraft> <numberOfStops>0</numberOfStops> </flightDetails> <departureStation> <terminal>2</terminal> </departureStation> <arrivalStation> <terminal>2F</terminal> </arrivalStation> <productFacilities> <type>1A</type> </productFacilities> <productFacilities> <type>LSA</type> </productFacilities> </additionalFlightInfo> </flightInfo> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>151015</departureDate> <departureTime>1910</departureTime> <arrivalDate>151016</arrivalDate> <arrivalTime>2120</arrivalTime> </flightDetails> <departureLocation> <cityAirport>CDG</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>JFK</cityAirport> </arrivalLocation> <marketingCompany> <identifier>AF</identifier> </marketingCompany> <flightIdentification> <number>8</number> </flightIdentification> <productTypeDetail> <productIndicators>E</productIndicators> <productIndicators>ET</productIndicators> <productIndicators>SFL</productIndicators> </productTypeDetail> </basicFlightInfo> <infoOnClasses> <productClassDetail> <serviceClass>Y</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>K</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <additionalFlightInfo> <flightDetails> <typeOfAircraft>77W</typeOfAircraft> <numberOfStops>0</numberOfStops> <legDuration>1115</legDuration> </flightDetails> <departureStation> <terminal>2E</terminal> </departureStation> <arrivalStation> <terminal>1</terminal> </arrivalStation> <productFacilities> <type>1A</type> </productFacilities> <productFacilities> <type>LSA</type> </productFacilities> <productFacilities> <type>M</type> </productFacilities> </additionalFlightInfo> </flightInfo> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>151015</departureDate> <departureTime>1035</departureTime> <arrivalDate>151016</arrivalDate> <arrivalTime>1210</arrivalTime> </flightDetails> <departureLocation> <cityAirport>NCE</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>CDG</cityAirport> </arrivalLocation> <marketingCompany> <identifier>DL</identifier> </marketingCompany> <operatingCompany> <identifier>AF</identifier> </operatingCompany> <flightIdentification> <number>8396</number> </flightIdentification> <productTypeDetail> <productIndicators>S</productIndicators> <productIndicators>701</productIndicators> <productIndicators>ET</productIndicators> </productTypeDetail> <lineItemNumber>3</lineItemNumber> </basicFlightInfo> <infoOnClasses> <productClassDetail> <serviceClass>Y</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>K</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <additionalFlightInfo> <flightDetails> <typeOfAircraft>320</typeOfAircraft> <numberOfStops>0</numberOfStops> </flightDetails> <departureStation> <terminal>2</terminal> </departureStation> <arrivalStation> <terminal>2F</terminal> </arrivalStation> <productFacilities> <type>1A</type> </productFacilities> <productFacilities> <type>DA</type> </productFacilities> <productFacilities> <type>LSA</type> </productFacilities> </additionalFlightInfo> <trafficRestrictionList> <trafficRestriction> <code>G</code> </trafficRestriction> </trafficRestrictionList> </flightInfo> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>151015</departureDate> <departureTime>1330</departureTime> <arrivalDate>151016</arrivalDate> <arrivalTime>1611</arrivalTime> </flightDetails> <departureLocation> <cityAirport>CDG</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>EWR</cityAirport> </arrivalLocation> <marketingCompany> <identifier>DL</identifier> </marketingCompany> <flightIdentification> <number>271</number> </flightIdentification> <productTypeDetail> <productIndicators>E</productIndicators> <productIndicators>ET</productIndicators> <productIndicators>SFL</productIndicators> </productTypeDetail> </basicFlightInfo> <infoOnClasses> <productClassDetail> <serviceClass>Y</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>K</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <additionalFlightInfo> <flightDetails> <typeOfAircraft>76W</typeOfAircraft> <numberOfStops>0</numberOfStops> <legDuration>1136</legDuration> </flightDetails> <departureStation> <terminal>2E</terminal> </departureStation> <arrivalStation> <terminal>B</terminal> </arrivalStation> <productFacilities> <type>1A</type> </productFacilities> <productFacilities> <type>DA</type> </productFacilities> <productFacilities> <type>LSA</type> </productFacilities> <productFacilities> <type>M</type> </productFacilities> </additionalFlightInfo> </flightInfo> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>151015</departureDate> <departureTime>1035</departureTime> <arrivalDate>151016</arrivalDate> <arrivalTime>1210</arrivalTime> </flightDetails> <departureLocation> <cityAirport>NCE</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>CDG</cityAirport> </arrivalLocation> <marketingCompany> <identifier>AF</identifier> </marketingCompany> <flightIdentification> <number>7701</number> </flightIdentification> <productTypeDetail> <productIndicators>S</productIndicators> <productIndicators>ET</productIndicators> </productTypeDetail> <lineItemNumber>4</lineItemNumber> </basicFlightInfo> <infoOnClasses> <productClassDetail> <serviceClass>Y</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>K</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <additionalFlightInfo> <flightDetails> <typeOfAircraft>320</typeOfAircraft> <numberOfStops>0</numberOfStops> </flightDetails> <departureStation> <terminal>2</terminal> </departureStation> <arrivalStation> <terminal>2F</terminal> </arrivalStation> <productFacilities> <type>1A</type> </productFacilities> <productFacilities> <type>LSA</type> </productFacilities> </additionalFlightInfo> </flightInfo> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>151015</departureDate> <departureTime>1330</departureTime> <arrivalDate>151016</arrivalDate> <arrivalTime>1611</arrivalTime> </flightDetails> <departureLocation> <cityAirport>CDG</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>EWR</cityAirport> </arrivalLocation> <marketingCompany> <identifier>AF</identifier> </marketingCompany> <operatingCompany> <identifier>DL</identifier> </operatingCompany> <flightIdentification> <number>3634</number> </flightIdentification> <productTypeDetail> <productIndicators>E</productIndicators> <productIndicators>701</productIndicators> <productIndicators>ET</productIndicators> <productIndicators>SFL</productIndicators> </productTypeDetail> </basicFlightInfo> <infoOnClasses> <productClassDetail> <serviceClass>Y</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>K</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <additionalFlightInfo> <flightDetails> <typeOfAircraft>76W</typeOfAircraft> <numberOfStops>0</numberOfStops> <legDuration>1136</legDuration> </flightDetails> <departureStation> <terminal>2E</terminal> </departureStation> <arrivalStation> <terminal>B</terminal> </arrivalStation> <productFacilities> <type>1A</type> </productFacilities> <productFacilities> <type>LSA</type> </productFacilities> <productFacilities> <type>M</type> </productFacilities> </additionalFlightInfo> </flightInfo> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>151015</departureDate> <departureTime>1035</departureTime> <arrivalDate>151016</arrivalDate> <arrivalTime>1210</arrivalTime> </flightDetails> <departureLocation> <cityAirport>NCE</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>CDG</cityAirport> </arrivalLocation> <marketingCompany> <identifier>DL</identifier> </marketingCompany> <operatingCompany> <identifier>AF</identifier> </operatingCompany> <flightIdentification> <number>8396</number> </flightIdentification> <productTypeDetail> <productIndicators>S</productIndicators> <productIndicators>701</productIndicators> <productIndicators>ET</productIndicators> </productTypeDetail> <lineItemNumber>5</lineItemNumber> </basicFlightInfo> <infoOnClasses> <productClassDetail> <serviceClass>Y</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>K</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <additionalFlightInfo> <flightDetails> <typeOfAircraft>320</typeOfAircraft> <numberOfStops>0</numberOfStops> </flightDetails> <departureStation> <terminal>2</terminal> </departureStation> <arrivalStation> <terminal>2F</terminal> </arrivalStation> <productFacilities> <type>1A</type> </productFacilities> <productFacilities> <type>DA</type> </productFacilities> <productFacilities> <type>LSA</type> </productFacilities> </additionalFlightInfo> <trafficRestrictionList> <trafficRestriction> <code>G</code> </trafficRestriction> </trafficRestrictionList> </flightInfo> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>151015</departureDate> <departureTime>1400</departureTime> <arrivalDate>151016</arrivalDate> <arrivalTime>1615</arrivalTime> </flightDetails> <departureLocation> <cityAirport>CDG</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>JFK</cityAirport> </arrivalLocation> <marketingCompany> <identifier>DL</identifier> </marketingCompany> <operatingCompany> <identifier>AF</identifier> </operatingCompany> <flightIdentification> <number>1020</number> </flightIdentification> <productTypeDetail> <productIndicators>E</productIndicators> <productIndicators>701</productIndicators> <productIndicators>ET</productIndicators> <productIndicators>SFL</productIndicators> </productTypeDetail> </basicFlightInfo> <infoOnClasses> <productClassDetail> <serviceClass>Y</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>K</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <additionalFlightInfo> <flightDetails> <typeOfAircraft>388</typeOfAircraft> <numberOfStops>0</numberOfStops> <legDuration>1140</legDuration> </flightDetails> <departureStation> <terminal>2E</terminal> </departureStation> <arrivalStation> <terminal>1</terminal> </arrivalStation> <productFacilities> <type>1A</type> </productFacilities> <productFacilities> <type>DA</type> </productFacilities> <productFacilities> <type>LSA</type> </productFacilities> <productFacilities> <type>M</type> </productFacilities> </additionalFlightInfo> </flightInfo> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>151015</departureDate> <departureTime>1035</departureTime> <arrivalDate>151016</arrivalDate> <arrivalTime>1210</arrivalTime> </flightDetails> <departureLocation> <cityAirport>NCE</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>CDG</cityAirport> </arrivalLocation> <marketingCompany> <identifier>AF</identifier> </marketingCompany> <flightIdentification> <number>7701</number> </flightIdentification> <productTypeDetail> <productIndicators>S</productIndicators> <productIndicators>ET</productIndicators> </productTypeDetail> <lineItemNumber>6</lineItemNumber> </basicFlightInfo> <infoOnClasses> <productClassDetail> <serviceClass>Y</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>K</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <additionalFlightInfo> <flightDetails> <typeOfAircraft>320</typeOfAircraft> <numberOfStops>0</numberOfStops> </flightDetails> <departureStation> <terminal>2</terminal> </departureStation> <arrivalStation> <terminal>2F</terminal> </arrivalStation> <productFacilities> <type>1A</type> </productFacilities> <productFacilities> <type>LSA</type> </productFacilities> </additionalFlightInfo> </flightInfo> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>151015</departureDate> <departureTime>1400</departureTime> <arrivalDate>151016</arrivalDate> <arrivalTime>1615</arrivalTime> </flightDetails> <departureLocation> <cityAirport>CDG</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>JFK</cityAirport> </arrivalLocation> <marketingCompany> <identifier>AF</identifier> </marketingCompany> <flightIdentification> <number>6</number> </flightIdentification> <productTypeDetail> <productIndicators>E</productIndicators> <productIndicators>ET</productIndicators> <productIndicators>SFL</productIndicators> </productTypeDetail> </basicFlightInfo> <infoOnClasses> <productClassDetail> <serviceClass>Y</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>K</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <additionalFlightInfo> <flightDetails> <typeOfAircraft>388</typeOfAircraft> <numberOfStops>0</numberOfStops> <legDuration>1140</legDuration> </flightDetails> <departureStation> <terminal>2E</terminal> </departureStation> <arrivalStation> <terminal>1</terminal> </arrivalStation> <productFacilities> <type>1A</type> </productFacilities> <productFacilities> <type>LSA</type> </productFacilities> <productFacilities> <type>M</type> </productFacilities> </additionalFlightInfo> </flightInfo> </singleCityPairInfo> </Air\_MultiAvailabilityReply>

## 5.21.3 Possible Errors

See "Error Messages" section

* * *

## 5.22 Operation: Seven-day search

You can search for available flights in a 7 days period starting from the departure date entered in input.

Example: Seven-day availability request from London (LON) to Saint Lucia (SLU) on 27 June. The response shows the first available solution is on 02JUL.

The option **type** "SEV" needs to be used.

## 5.22.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_MultiAvailability xmlns="http://xml.amadeus.com/SATRQT\_16\_1\_1A"> <messageActionDetails> <functionDetails> <businessFunction>1</businessFunction> <actionCode>44</actionCode> </functionDetails> </messageActionDetails> <requestSection> <availabilityProductInfo> <availabilityDetails> <departureDate>270616</departureDate> </availabilityDetails> <departureLocationInfo> <cityAirport>LON</cityAirport> </departureLocationInfo> <arrivalLocationInfo> <cityAirport>SLU</cityAirport> </arrivalLocationInfo> </availabilityProductInfo> <optionClass> <productClassDetails> <serviceClass>L</serviceClass> </productClassDetails> </optionClass> <airlineOrFlightOption> <flightIdentification> <airlineCode>BA</airlineCode> </flightIdentification> </airlineOrFlightOption> <availabilityOptions> <typeOfRequest>AD</typeOfRequest> <optionInfo> <option>SEV</option> </optionInfo> </availabilityOptions> </requestSection> </Air\_MultiAvailability>

## 5.22.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_MultiAvailabilityReply xmlns="http://xml.amadeus.com/SATRSP\_16\_1\_1A"> <messageActionDetails> <functionDetails> <businessFunction>1</businessFunction> <actionCode>45</actionCode> </functionDetails> <responseType>3</responseType> </messageActionDetails> <singleCityPairInfo> <locationDetails> <origin>LON</origin> <destination>SLU</destination> </locationDetails> <cityPairFreeFlowText> <freeTextQualification> <codedIndicator>4</codedIndicator> <typeOfInfo>50</typeOfInfo> </freeTextQualification> <freeText></freeText> <freeText></freeText> <freeText> AMADEUS AVAILABILITY - AN </freeText> <freeText></freeText> <freeText> 6 TU 02JUL 0000</freeText> </cityPairFreeFlowText> <cityPairFreeFlowText> <freeTextQualification> <codedIndicator>4</codedIndicator> <typeOfInfo>OFD</typeOfInfo> </freeTextQualification> <freeText>SLU ST LUCIA.LC</freeText> </cityPairFreeFlowText> <cityPairFreeFlowText> <freeTextQualification> <codedIndicator>3</codedIndicator> </freeTextQualification> <freeText></freeText> <freeText></freeText> <freeText>FIRST FLIGHT AVAILABLE 02JUL</freeText> <freeText></freeText> <freeText> LON SLU</freeText> </cityPairFreeFlowText> <cityPairFreeFlowText> <freeTextQualification> <codedIndicator>4</codedIndicator> <typeOfInfo>51</typeOfInfo> </freeTextQualification> <freeText>NO LATER FLTS -LON SLU- ENTER A CONNECT POINT /X... FOR MORE</freeText> </cityPairFreeFlowText> <cityPairErrorOrWarning> <cityPairErrorOrWarningInfo> <error> <code>A7V</code> <type>001</type> <listResponsible>AMD</listResponsible> </error> </cityPairErrorOrWarningInfo> <cityPairErrorOrWarningText> <freeTextQualification> <codedIndicator>3</codedIndicator> </freeTextQualification> <freeText>NO MORE FLIGHTS</freeText> </cityPairErrorOrWarningText> </cityPairErrorOrWarning> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>020713</departureDate> <departureTime>1010</departureTime> <arrivalDate>020716</arrivalDate> <arrivalTime>1345</arrivalTime> </flightDetails> <departureLocation> <cityAirport>LGW</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>UVF</cityAirport> </arrivalLocation> <marketingCompany> <identifier>BA</identifier> </marketingCompany> <flightIdentification> <number>2159</number> </flightIdentification> <productTypeDetail> <productIndicators>D</productIndicators> <productIndicators>ET</productIndicators> </productTypeDetail> <lineItemNumber>1</lineItemNumber> </basicFlightInfo> <infoOnClasses> <productClassDetail> <serviceClass>L</serviceClass> <availabilityStatus>6</availabilityStatus> </productClassDetail> </infoOnClasses> <additionalFlightInfo> <flightDetails> <typeOfAircraft>777</typeOfAircraft> <numberOfStops>0</numberOfStops> <legDuration>0835</legDuration> </flightDetails> <departureStation> <terminal>N</terminal> </departureStation> <productFacilities> <type>1A</type> </productFacilities> <productFacilities> <type>LSA</type> </productFacilities> <productFacilities> <type>M</type> </productFacilities> </additionalFlightInfo> </flightInfo> </singleCityPairInfo> </Air\_MultiAvailabilityReply>

## 5.22.3 Possible Errors

See "Error Messages" section

* * *

## 5.23 Operation: Specific flight

This entry is used to get the exact availability 3 digits posting level per class for a specific flight.

Example: Flight specific entry for flight BA 015 from London to Sydney on 15 October.

Availability option SF needs to be used.

Note: This option is restricted to specific users with extended security agreements only.

## 5.23.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_MultiAvailability xmlns="http://xml.amadeus.com/SATRQT\_16\_1\_1A"> <messageActionDetails> <functionDetails> <actionCode>48</actionCode> </functionDetails> </messageActionDetails> <requestSection> <availabilityProductInfo> <availabilityDetails> <departureDate>151016</departureDate> </availabilityDetails> <departureLocationInfo> <cityAirport>LHR</cityAirport> </departureLocationInfo> <arrivalLocationInfo> <cityAirport>SYD</cityAirport> </arrivalLocationInfo> </availabilityProductInfo> <airlineOrFlightOption> <flightIdentification> <airlineCode>BA</airlineCode> <number>015</number> </flightIdentification> </airlineOrFlightOption> <availabilityOptions> <typeOfRequest>SF</typeOfRequest> </availabilityOptions> </requestSection> </Air\_MultiAvailability>

## 5.23.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_MultiAvailabilityReply xmlns="http://xml.amadeus.com/SATRSP\_16\_1\_1A"> <messageActionDetails> <functionDetails> <businessFunction>1</businessFunction> <actionCode>49</actionCode> </functionDetails> <responseType>3</responseType> </messageActionDetails> <singleCityPairInfo> <locationDetails> <origin>LHR</origin> <destination>SYD</destination> </locationDetails> <cityPairFreeFlowText> <freeTextQualification> <codedIndicator>4</codedIndicator> <typeOfInfo>50</typeOfInfo> </freeTextQualification> <freeText></freeText> <freeText></freeText> <freeText> BRITISH AIRWAYS - SF </freeText> <freeText></freeText> <freeText> 111 SA 15OCT 2115</freeText> </cityPairFreeFlowText> <cityPairFreeFlowText> <freeTextQualification> <codedIndicator>4</codedIndicator> <typeOfInfo>OFD</typeOfInfo> </freeTextQualification> <freeText>SYD SYDNEY.AUNS</freeText> </cityPairFreeFlowText> <cityPairFreeFlowText> <freeTextQualification> <codedIndicator>4</codedIndicator> <typeOfInfo>51</typeOfInfo> </freeTextQualification> <freeText>END OF DISPLAY</freeText> </cityPairFreeFlowText> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>151013</departureDate> <departureTime>2115</departureTime> <arrivalDate>171016</arrivalDate> <arrivalTime>0610</arrivalTime> </flightDetails> <departureLocation> <cityAirport>LHR</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>SYD</cityAirport> </arrivalLocation> <marketingCompany> <identifier>BA</identifier> </marketingCompany> <flightIdentification> <number>15</number> </flightIdentification> <productTypeDetail> <productIndicators>D</productIndicators> <productIndicators>ET</productIndicators> </productTypeDetail> <lineItemNumber>1</lineItemNumber> </basicFlightInfo> <infoOnClasses> <productClassDetail> <serviceClass>F</serviceClass> <availabilityStatus>006</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>A</serviceClass> <availabilityStatus>004</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Z</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>J</serviceClass> <availabilityStatus>039</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>C</serviceClass> <availabilityStatus>018</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>D</serviceClass> <availabilityStatus>009</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>R</serviceClass> <availabilityStatus>005</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>I</serviceClass> <availabilityStatus>001</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>U</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>W</serviceClass> <availabilityStatus>005</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>E</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>T</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>P</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Y</serviceClass> <availabilityStatus>093</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>B</serviceClass> <availabilityStatus>057</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>H</serviceClass> <availabilityStatus>031</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>K</serviceClass> <availabilityStatus>024</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>M</serviceClass> <availabilityStatus>011</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>L</serviceClass> <availabilityStatus>035</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>V</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>S</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>N</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Q</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>O</serviceClass> <availabilityStatus>C</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>G</serviceClass> <availabilityStatus>L</availabilityStatus> </productClassDetail> </infoOnClasses> <additionalFlightInfo> <flightDetails> <typeOfAircraft>777</typeOfAircraft> <numberOfStops>1</numberOfStops> <legDuration>2255</legDuration> </flightDetails> <departureStation> <terminal>5</terminal> </departureStation> <arrivalStation> <terminal>1</terminal> </arrivalStation> <productFacilities> <type>1A</type> </productFacilities> <productFacilities> <type>LSA</type> </productFacilities> <productFacilities> <type>M</type> </productFacilities> </additionalFlightInfo> </flightInfo> </singleCityPairInfo> </Air\_MultiAvailabilityReply>

## 5.23.3 Possible Errors

See "Error Messages" section

* * *

## 5.24 Operation: Stopover

The Stopover Option allows to request air displays including one specific Stopover, with its duration in term of days, in between parts of an OnD solution. Use <option> "SOI", the stopover connection point in <optionInformation> and the number of days of the stopover in <optionInformation>.

Example: Availability request for the 24th of May from Paris (PAR) to Istanbul (IST) with a stopover in Frankfurt (FRA) of 6 days.

## 5.24.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_MultiAvailability xmlns="http://xml.amadeus.com/SATRQT\_16\_1\_1A"> <messageActionDetails> <functionDetails> <actionCode>44</actionCode> </functionDetails> </messageActionDetails> <requestSection> <availabilityProductInfo> <availabilityDetails> <departureDate>240525</departureDate> </availabilityDetails> <departureLocationInfo> <cityAirport>PAR</cityAirport> </departureLocationInfo> <arrivalLocationInfo> <cityAirport>IST</cityAirport> </arrivalLocationInfo> </availabilityProductInfo> <availabilityOptions> <typeOfRequest>TN</typeOfRequest> <optionInfo> <option>SOI</option> <optionInformation>FRA</optionInformation> <optionInformation>6</optionInformation> </optionInfo> </availabilityOptions> </requestSection> </Air\_MultiAvailability>

## 5.24.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_MultiAvailabilityReply xmlns="http://xml.amadeus.com/SATRSP\_16\_1\_1A"> <messageActionDetails> <functionDetails> <businessFunction>1</businessFunction> <actionCode>45</actionCode> </functionDetails> <responseType>3</responseType> </messageActionDetails> <singleCityPairInfo> <locationDetails> <origin>PAR</origin> <destination>IST</destination> </locationDetails> <cityPairFreeFlowText> <freeTextQualification> <codedIndicator>4</codedIndicator> <typeOfInfo>50</typeOfInfo> </freeTextQualification> <freeText>\\</freeText> <freeText>\\</freeText> <freeText> AMADEUS AVAILABILITY - AN \\</freeText> <freeText>\\</freeText> <freeText> 43 SA 24MAY 0000</freeText> </cityPairFreeFlowText> <cityPairFreeFlowText> <freeTextQualification> <codedIndicator>4</codedIndicator> <typeOfInfo>OFD</typeOfInfo> </freeTextQualification> <freeText>IST ISTANBUL.TR</freeText> </cityPairFreeFlowText> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>240525</departureDate> <departureTime>0800</departureTime> <arrivalDate>240525</arrivalDate> <arrivalTime>0900</arrivalTime> </flightDetails> <departureLocation> <cityAirport>CDG</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>FRA</cityAirport> </arrivalLocation> <marketingCompany> <identifier>7S</identifier> </marketingCompany> <flightIdentification> <number>1617</number> </flightIdentification> <productTypeDetail> <productIndicators>S</productIndicators> <productIndicators>ET</productIndicators> </productTypeDetail> <lineItemNumber>1</lineItemNumber> </basicFlightInfo> <infoOnClasses> <productClassDetail> <serviceClass>C</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>D</serviceClass> <availabilityStatus>L</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Y</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>B</serviceClass> <availabilityStatus>L</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>K</serviceClass> <availabilityStatus>L</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>H</serviceClass> <availabilityStatus>L</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>G</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <additionalFlightInfo> <flightDetails> <typeOfAircraft>321</typeOfAircraft> <numberOfStops>0</numberOfStops> </flightDetails> <productFacilities> <type>1A</type> </productFacilities> <productFacilities> <type>LSA</type> </productFacilities> </additionalFlightInfo> </flightInfo> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>300525</departureDate> <departureTime>1720</departureTime> <arrivalDate>300525</arrivalDate> <arrivalTime>2120</arrivalTime> </flightDetails> <departureLocation> <cityAirport>FRA</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>IST</cityAirport> </arrivalLocation> <marketingCompany> <identifier>LH</identifier> </marketingCompany> <flightIdentification> <number>1304</number> </flightIdentification> <productTypeDetail> <productIndicators>E</productIndicators> <productIndicators>ET</productIndicators> </productTypeDetail> </basicFlightInfo> <infoOnClasses> <productClassDetail> <serviceClass>J</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>C</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>D</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>I</serviceClass> <availabilityStatus>L</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Y</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>B</serviceClass> <availabilityStatus>L</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>M</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>U</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>H</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>X</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Q</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>V</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <additionalFlightInfo> <flightDetails> <typeOfAircraft>321</typeOfAircraft> <numberOfStops>0</numberOfStops> <legDuration>9959</legDuration> </flightDetails> <departureStation> <terminal>1</terminal> </departureStation> <productFacilities> <type>1A</type> </productFacilities> <productFacilities> <type>LSA</type> </productFacilities> <productFacilities> <type>M</type> </productFacilities> </additionalFlightInfo> </flightInfo> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>240525</departureDate> <departureTime>0800</departureTime> <arrivalDate>240525</arrivalDate> <arrivalTime>0900</arrivalTime> </flightDetails> <departureLocation> <cityAirport>CDG</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>FRA</cityAirport> </arrivalLocation> <marketingCompany> <identifier>7S</identifier> </marketingCompany> <flightIdentification> <number>1617</number> </flightIdentification> <productTypeDetail> <productIndicators>S</productIndicators> <productIndicators>ET</productIndicators> </productTypeDetail> <lineItemNumber>2</lineItemNumber> </basicFlightInfo> <infoOnClasses> <productClassDetail> <serviceClass>C</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>D</serviceClass> <availabilityStatus>L</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Y</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>B</serviceClass> <availabilityStatus>L</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>K</serviceClass> <availabilityStatus>L</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>H</serviceClass> <availabilityStatus>L</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>G</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <additionalFlightInfo> <flightDetails> <typeOfAircraft>321</typeOfAircraft> <numberOfStops>0</numberOfStops> </flightDetails> <productFacilities> <type>1A</type> </productFacilities> <productFacilities> <type>LSA</type> </productFacilities> </additionalFlightInfo> </flightInfo> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>300525</departureDate> <departureTime>1300</departureTime> <arrivalDate>300525</arrivalDate> <arrivalTime>1700</arrivalTime> </flightDetails> <departureLocation> <cityAirport>FRA</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>IST</cityAirport> </arrivalLocation> <marketingCompany> <identifier>LH</identifier> </marketingCompany> <flightIdentification> <number>1300</number> </flightIdentification> <productTypeDetail> <productIndicators>E</productIndicators> <productIndicators>ET</productIndicators> </productTypeDetail> </basicFlightInfo> <infoOnClasses> <productClassDetail> <serviceClass>J</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>C</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>D</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>I</serviceClass> <availabilityStatus>L</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Y</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>B</serviceClass> <availabilityStatus>L</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>M</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>U</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>H</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>X</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Q</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>V</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <additionalFlightInfo> <flightDetails> <typeOfAircraft>321</typeOfAircraft> <numberOfStops>0</numberOfStops> <legDuration>9959</legDuration> </flightDetails> <departureStation> <terminal>1</terminal> </departureStation> <productFacilities> <type>1A</type> </productFacilities> <productFacilities> <type>LSA</type> </productFacilities> <productFacilities> <type>M</type> </productFacilities> </additionalFlightInfo> </flightInfo> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>240525</departureDate> <departureTime>0800</departureTime> <arrivalDate>240525</arrivalDate> <arrivalTime>0900</arrivalTime> </flightDetails> <departureLocation> <cityAirport>CDG</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>FRA</cityAirport> </arrivalLocation> <marketingCompany> <identifier>7S</identifier> </marketingCompany> <flightIdentification> <number>1617</number> </flightIdentification> <productTypeDetail> <productIndicators>S</productIndicators> <productIndicators>ET</productIndicators> </productTypeDetail> <lineItemNumber>3</lineItemNumber> </basicFlightInfo> <infoOnClasses> <productClassDetail> <serviceClass>C</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>D</serviceClass> <availabilityStatus>L</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Y</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>B</serviceClass> <availabilityStatus>L</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>K</serviceClass> <availabilityStatus>L</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>H</serviceClass> <availabilityStatus>L</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>G</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <additionalFlightInfo> <flightDetails> <typeOfAircraft>321</typeOfAircraft> <numberOfStops>0</numberOfStops> </flightDetails> <productFacilities> <type>1A</type> </productFacilities> <productFacilities> <type>LSA</type> </productFacilities> </additionalFlightInfo> </flightInfo> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>300525</departureDate> <departureTime>1350</departureTime> <arrivalDate>300525</arrivalDate> <arrivalTime>1750</arrivalTime> </flightDetails> <departureLocation> <cityAirport>FRA</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>SAW</cityAirport> </arrivalLocation> <marketingCompany> <identifier>VF</identifier> </marketingCompany> <flightIdentification> <number>34</number> </flightIdentification> <productTypeDetail> <productIndicators>E</productIndicators> <productIndicators>ET</productIndicators> </productTypeDetail> </basicFlightInfo> <infoOnClasses> <productClassDetail> <serviceClass>Y</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>B</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>M</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>A</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>H</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>S</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>O</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>E</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Q</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>T</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>L</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>V</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>P</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>W</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>U</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>X</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>G</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>D</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>J</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>F</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>C</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>I</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>K</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>R</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Z</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <additionalFlightInfo> <flightDetails> <typeOfAircraft>73H</typeOfAircraft> <numberOfStops>0</numberOfStops> <legDuration>9959</legDuration> </flightDetails> <departureStation> <terminal>1</terminal> </departureStation> <productFacilities> <type>1A</type> </productFacilities> <productFacilities> <type>LSA</type> </productFacilities> </additionalFlightInfo> </flightInfo> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>240525</departureDate> <departureTime>1000</departureTime> <arrivalDate>240525</arrivalDate> <arrivalTime>1100</arrivalTime> </flightDetails> <departureLocation> <cityAirport>CDG</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>FRA</cityAirport> </arrivalLocation> <marketingCompany> <identifier>7X</identifier> </marketingCompany> <flightIdentification> <number>315</number> </flightIdentification> <productTypeDetail> <productIndicators>S</productIndicators> <productIndicators>ET</productIndicators> </productTypeDetail> <lineItemNumber>4</lineItemNumber> </basicFlightInfo> <infoOnClasses> <productClassDetail> <serviceClass>J</serviceClass> <availabilityStatus>8</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>D</serviceClass> <availabilityStatus>8</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>I</serviceClass> <availabilityStatus>8</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>U</serviceClass> <availabilityStatus>8</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Y</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>B</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>H</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>K</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>M</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>L</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>S</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>V</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>O</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Q</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>N</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>G</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>T</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>X</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>E</serviceClass> <availabilityStatus></availabilityStatus> </productClassDetail> </infoOnClasses> <additionalFlightInfo> <flightDetails> <typeOfAircraft>733</typeOfAircraft> <numberOfStops>0</numberOfStops> </flightDetails> <productFacilities> <type>1A</type> </productFacilities> <productFacilities> <type>LSA</type> </productFacilities> <productFacilities> <type>M</type> </productFacilities> </additionalFlightInfo> </flightInfo> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>300525</departureDate> <departureTime>1300</departureTime> <arrivalDate>300525</arrivalDate> <arrivalTime>1700</arrivalTime> </flightDetails> <departureLocation> <cityAirport>FRA</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>IST</cityAirport> </arrivalLocation> <marketingCompany> <identifier>LH</identifier> </marketingCompany> <flightIdentification> <number>1300</number> </flightIdentification> <productTypeDetail> <productIndicators>E</productIndicators> <productIndicators>ET</productIndicators> </productTypeDetail> </basicFlightInfo> <infoOnClasses> <productClassDetail> <serviceClass>J</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>C</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>D</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>I</serviceClass> <availabilityStatus>L</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Y</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>B</serviceClass> <availabilityStatus>L</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>M</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>U</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>H</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>X</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Q</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>V</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <additionalFlightInfo> <flightDetails> <typeOfAircraft>321</typeOfAircraft> <numberOfStops>0</numberOfStops> <legDuration>9959</legDuration> </flightDetails> <departureStation> <terminal>1</terminal> </departureStation> <productFacilities> <type>1A</type> </productFacilities> <productFacilities> <type>LSA</type> </productFacilities> <productFacilities> <type>M</type> </productFacilities> </additionalFlightInfo> </flightInfo> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>240525</departureDate> <departureTime>1000</departureTime> <arrivalDate>240525</arrivalDate> <arrivalTime>1100</arrivalTime> </flightDetails> <departureLocation> <cityAirport>CDG</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>FRA</cityAirport> </arrivalLocation> <marketingCompany> <identifier>7X</identifier> </marketingCompany> <flightIdentification> <number>315</number> </flightIdentification> <productTypeDetail> <productIndicators>S</productIndicators> <productIndicators>ET</productIndicators> </productTypeDetail> <lineItemNumber>5</lineItemNumber> </basicFlightInfo> <infoOnClasses> <productClassDetail> <serviceClass>J</serviceClass> <availabilityStatus>8</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>D</serviceClass> <availabilityStatus>8</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>I</serviceClass> <availabilityStatus>8</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>U</serviceClass> <availabilityStatus>8</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Y</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>B</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>H</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>K</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>M</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>L</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>S</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>V</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>O</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Q</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>N</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>G</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>T</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>X</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>E</serviceClass> <availabilityStatus></availabilityStatus> </productClassDetail> </infoOnClasses> <additionalFlightInfo> <flightDetails> <typeOfAircraft>733</typeOfAircraft> <numberOfStops>0</numberOfStops> </flightDetails> <productFacilities> <type>1A</type> </productFacilities> <productFacilities> <type>LSA</type> </productFacilities> <productFacilities> <type>M</type> </productFacilities> </additionalFlightInfo> </flightInfo> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>300525</departureDate> <departureTime>1720</departureTime> <arrivalDate>300525</arrivalDate> <arrivalTime>2120</arrivalTime> </flightDetails> <departureLocation> <cityAirport>FRA</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>IST</cityAirport> </arrivalLocation> <marketingCompany> <identifier>LH</identifier> </marketingCompany> <flightIdentification> <number>1304</number> </flightIdentification> <productTypeDetail> <productIndicators>E</productIndicators> <productIndicators>ET</productIndicators> </productTypeDetail> </basicFlightInfo> <infoOnClasses> <productClassDetail> <serviceClass>J</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>C</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>D</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>I</serviceClass> <availabilityStatus>L</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Y</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>B</serviceClass> <availabilityStatus>L</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>M</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>U</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>H</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>X</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>Q</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <infoOnClasses> <productClassDetail> <serviceClass>V</serviceClass> <availabilityStatus>9</availabilityStatus> </productClassDetail> </infoOnClasses> <additionalFlightInfo> <flightDetails> <typeOfAircraft>321</typeOfAircraft> <numberOfStops>0</numberOfStops> <legDuration>9959</legDuration> </flightDetails> <departureStation> <terminal>1</terminal> </departureStation> <productFacilities> <type>1A</type> </productFacilities> <productFacilities> <type>LSA</type> </productFacilities> <productFacilities> <type>M</type> </productFacilities> </additionalFlightInfo> </flightInfo> </singleCityPairInfo> </Air\_MultiAvailabilityReply>

## 5.24.3 Possible Errors

See "Error Messages" section.

* * *

## 5.25 Operation: Timetable - basic

Timetable displays flights available from a 7 days range starting from the date given in input and the week(s) of the day they operate. Contrary to availability and schedule displays, it does not return availability postings.

Example: Basic neutral timetable request between London (LON) and New York (NYC) for 03 January.

<actionCode> to be used is "51".

<typeOfRequest> can be set to TN, TA, TD, TE .

## 5.25.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_MultiAvailability xmlns="http://xml.amadeus.com/SATRQT\_16\_1\_1A"> <messageActionDetails> <functionDetails> <actionCode>51</actionCode> </functionDetails> </messageActionDetails> <requestSection> <availabilityProductInfo> <availabilityDetails> <departureDate>301021</departureDate> </availabilityDetails> <departureLocationInfo> <cityAirport>LON</cityAirport> </departureLocationInfo> <arrivalLocationInfo> <cityAirport>NYC</cityAirport> </arrivalLocationInfo> </availabilityProductInfo> <availabilityOptions> <typeOfRequest>TN</typeOfRequest> </availabilityOptions> </requestSection> </Air\_MultiAvailability>

## 5.25.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_MultiAvailabilityReply xmlns="http://xml.amadeus.com/SATRSP\_16\_1\_1A"> <messageActionDetails> <functionDetails> <businessFunction>1</businessFunction> <actionCode>52</actionCode> </functionDetails> <responseType>3</responseType> </messageActionDetails> <singleCityPairInfo> <locationDetails> <origin>LON</origin> <destination>NYC</destination> </locationDetails> <cityPairFreeFlowText> <freeTextQualification> <codedIndicator>4</codedIndicator> <typeOfInfo>50</typeOfInfo> </freeTextQualification> <freeText></freeText> <freeText></freeText> <freeText> AMADEUS TIMETABLE - TN </freeText> <freeText></freeText> <freeText> LON NYC 03JAN14 10JAN14</freeText> </cityPairFreeFlowText> <cityPairFreeFlowText> <freeTextQualification> <codedIndicator>4</codedIndicator> <typeOfInfo>OFD</typeOfInfo> </freeTextQualification> <freeText>NYC NEW YORK.USNY</freeText> </cityPairFreeFlowText> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>030114</departureDate> <departureTime>0830</departureTime> <arrivalDate>030114</arrivalDate> <arrivalTime>1100</arrivalTime> </flightDetails> <departureLocation> <cityAirport>LHR</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>JFK</cityAirport> </arrivalLocation> <marketingCompany> <identifier>IB</identifier> </marketingCompany> <operatingCompany> <identifier>BA</identifier> </operatingCompany> <flightIdentification> <number>4613</number> </flightIdentification> <productTypeDetail> <productIndicators>D</productIndicators> <productIndicators>701</productIndicators> </productTypeDetail> <lineItemNumber>1</lineItemNumber> </basicFlightInfo> <additionalFlightInfo> <flightDetails> <typeOfAircraft>744</typeOfAircraft> <numberOfStops>0</numberOfStops> <legDuration>0730</legDuration> <dayOfOperation>2345</dayOfOperation> <effectivePeriod>020413</effectivePeriod> </flightDetails> <departureStation> <terminal>5</terminal> </departureStation> <arrivalStation> <terminal>7</terminal> </arrivalStation> <productFacilities> <type>1A</type> </productFacilities> </additionalFlightInfo> </flightInfo> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>030114</departureDate> <departureTime>0830</departureTime> <arrivalDate>030114</arrivalDate> <arrivalTime>1110</arrivalTime> </flightDetails> <departureLocation> <cityAirport>LHR</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>JFK</cityAirport> </arrivalLocation> <marketingCompany> <identifier>BA</identifier> </marketingCompany> <flightIdentification> <number>117</number> </flightIdentification> <productTypeDetail> <productIndicators>D</productIndicators> </productTypeDetail> <lineItemNumber>2</lineItemNumber> </basicFlightInfo> <additionalFlightInfo> <flightDetails> <typeOfAircraft>744</typeOfAircraft> <numberOfStops>0</numberOfStops> <legDuration>0740</legDuration> <dayOfOperation>1234567</dayOfOperation> <effectivePeriod>031113190114</effectivePeriod> </flightDetails> <departureStation> <terminal>5</terminal> </departureStation> <arrivalStation> <terminal>7</terminal> </arrivalStation> <productFacilities> <type>1A</type> </productFacilities> </additionalFlightInfo> </flightInfo> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>030114</departureDate> <departureTime>0830</departureTime> <arrivalDate>030114</arrivalDate> <arrivalTime>1110</arrivalTime> </flightDetails> <departureLocation> <cityAirport>LHR</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>JFK</cityAirport> </arrivalLocation> <marketingCompany> <identifier>AA</identifier> </marketingCompany> <operatingCompany> <identifier>BA</identifier> </operatingCompany> <flightIdentification> <number>6138</number> </flightIdentification> <productTypeDetail> <productIndicators>D</productIndicators> <productIndicators>701</productIndicators> </productTypeDetail> <lineItemNumber>3</lineItemNumber> </basicFlightInfo> <additionalFlightInfo> <flightDetails> <typeOfAircraft>744</typeOfAircraft> <numberOfStops>0</numberOfStops> <legDuration>0740</legDuration> <dayOfOperation>1234567</dayOfOperation> <effectivePeriod>031113080314</effectivePeriod> </flightDetails> <departureStation> <terminal>5</terminal> </departureStation> <arrivalStation> <terminal>7</terminal> </arrivalStation> <productFacilities> <type>AS</type> </productFacilities> <productFacilities> <type>DA</type> </productFacilities> </additionalFlightInfo> </flightInfo> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>030114</departureDate> <departureTime>0840</departureTime> <arrivalDate>030114</arrivalDate> <arrivalTime>1210</arrivalTime> </flightDetails> <departureLocation> <cityAirport>LHR</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>EWR</cityAirport> </arrivalLocation> <marketingCompany> <identifier>LH</identifier> </marketingCompany> <operatingCompany> <identifier>UA</identifier> </operatingCompany> <flightIdentification> <number>7625</number> </flightIdentification> <productTypeDetail> <productIndicators>D</productIndicators> <productIndicators>701</productIndicators> </productTypeDetail> <lineItemNumber>4</lineItemNumber> </basicFlightInfo> <additionalFlightInfo> <flightDetails> <typeOfAircraft>752</typeOfAircraft> <numberOfStops>0</numberOfStops> <legDuration>0830</legDuration> <dayOfOperation>1234567</dayOfOperation> <effectivePeriod>020114220214</effectivePeriod> </flightDetails> <departureStation> <terminal>4</terminal> </departureStation> <arrivalStation> <terminal>B</terminal> </arrivalStation> <productFacilities> <type>1A</type> </productFacilities> </additionalFlightInfo> </flightInfo> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>030114</departureDate> <departureTime>0840</departureTime> <arrivalDate>030114</arrivalDate> <arrivalTime>1210</arrivalTime> </flightDetails> <departureLocation> <cityAirport>LHR</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>EWR</cityAirport> </arrivalLocation> <marketingCompany> <identifier>UA</identifier> </marketingCompany> <flightIdentification> <number>45</number> </flightIdentification> <productTypeDetail> <productIndicators>D</productIndicators> </productTypeDetail> <lineItemNumber>5</lineItemNumber> </basicFlightInfo> <additionalFlightInfo> <flightDetails> <typeOfAircraft>752</typeOfAircraft> <numberOfStops>0</numberOfStops> <legDuration>0830</legDuration> <dayOfOperation>1234567</dayOfOperation> <effectivePeriod>020114220214</effectivePeriod> </flightDetails> <departureStation> <terminal>4</terminal> </departureStation> <arrivalStation> <terminal>B</terminal> </arrivalStation> <productFacilities> <type>1A</type> </productFacilities> <productFacilities> <type>DA</type> </productFacilities> </additionalFlightInfo> </flightInfo> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>030114</departureDate> <departureTime>0920</departureTime> <arrivalDate>030114</arrivalDate> <arrivalTime>1220</arrivalTime> </flightDetails> <departureLocation> <cityAirport>LHR</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>JFK</cityAirport> </arrivalLocation> <marketingCompany> <identifier>VS</identifier> </marketingCompany> <flightIdentification> <number>3</number> </flightIdentification> <productTypeDetail> <productIndicators>D</productIndicators> </productTypeDetail> <lineItemNumber>6</lineItemNumber> </basicFlightInfo> <additionalFlightInfo> <flightDetails> <typeOfAircraft>346</typeOfAircraft> <numberOfStops>0</numberOfStops> <legDuration>0800</legDuration> <dayOfOperation>1234567</dayOfOperation> <effectivePeriod>031113080314</effectivePeriod> </flightDetails> <departureStation> <terminal>3</terminal> </departureStation> <arrivalStation> <terminal>4</terminal> </arrivalStation> <productFacilities> <type>AS</type> </productFacilities> <productFacilities> <type>DA</type> </productFacilities> </additionalFlightInfo> </flightInfo> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>030114</departureDate> <departureTime>0920</departureTime> <arrivalDate>030114</arrivalDate> <arrivalTime>1220</arrivalTime> </flightDetails> <departureLocation> <cityAirport>LHR</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>JFK</cityAirport> </arrivalLocation> <marketingCompany> <identifier>CY</identifier> </marketingCompany> <operatingCompany> <identifier>VS</identifier> </operatingCompany> <flightIdentification> <number>1803</number> </flightIdentification> <productTypeDetail> <productIndicators>D</productIndicators> <productIndicators>701</productIndicators> </productTypeDetail> <lineItemNumber>7</lineItemNumber> </basicFlightInfo> <additionalFlightInfo> <flightDetails> <typeOfAircraft>346</typeOfAircraft> <numberOfStops>0</numberOfStops> <legDuration>0800</legDuration> <dayOfOperation>1234567</dayOfOperation> <effectivePeriod>031113080314</effectivePeriod> </flightDetails> <departureStation> <terminal>3</terminal> </departureStation> <arrivalStation> <terminal>4</terminal> </arrivalStation> <productFacilities> <type>1A</type> </productFacilities> <productFacilities> <type>DA</type> </productFacilities> </additionalFlightInfo> <trafficRestrictionList> <trafficRestriction> <code>X</code> </trafficRestriction> </trafficRestrictionList> </flightInfo> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>030114</departureDate> <departureTime>0940</departureTime> <arrivalDate>030114</arrivalDate> <arrivalTime>1305</arrivalTime> </flightDetails> <departureLocation> <cityAirport>LHR</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>JFK</cityAirport> </arrivalLocation> <marketingCompany> <identifier>KL</identifier> </marketingCompany> <operatingCompany> <identifier>DL</identifier> </operatingCompany> <flightIdentification> <number>6104</number> </flightIdentification> <productTypeDetail> <productIndicators>D</productIndicators> <productIndicators>701</productIndicators> </productTypeDetail> <lineItemNumber>8</lineItemNumber> </basicFlightInfo> <additionalFlightInfo> <flightDetails> <typeOfAircraft>76W</typeOfAircraft> <numberOfStops>0</numberOfStops> <legDuration>0825</legDuration> <dayOfOperation>1234567</dayOfOperation> <effectivePeriod>030114100114</effectivePeriod> </flightDetails> <departureStation> <terminal>4</terminal> </departureStation> <arrivalStation> <terminal>4</terminal> </arrivalStation> <productFacilities> <type>1A</type> </productFacilities> </additionalFlightInfo> </flightInfo> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>030114</departureDate> <departureTime>0940</departureTime> <arrivalDate>030114</arrivalDate> <arrivalTime>1305</arrivalTime> </flightDetails> <departureLocation> <cityAirport>LHR</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>JFK</cityAirport> </arrivalLocation> <marketingCompany> <identifier>DL</identifier> </marketingCompany> <flightIdentification> <number>4</number> </flightIdentification> <productTypeDetail> <productIndicators>D</productIndicators> </productTypeDetail> <lineItemNumber>9</lineItemNumber> </basicFlightInfo> <additionalFlightInfo> <flightDetails> <typeOfAircraft>76W</typeOfAircraft> <numberOfStops>0</numberOfStops> <legDuration>0825</legDuration> <dayOfOperation>1234567</dayOfOperation> <effectivePeriod>030114100114</effectivePeriod> </flightDetails> <departureStation> <terminal>4</terminal> </departureStation> <arrivalStation> <terminal>4</terminal> </arrivalStation> <productFacilities> <type>1A</type> </productFacilities> <productFacilities> <type>DA</type> </productFacilities> </additionalFlightInfo> </flightInfo> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>030114</departureDate> <departureTime>0955</departureTime> <arrivalDate>030114</arrivalDate> <arrivalTime>1235</arrivalTime> </flightDetails> <departureLocation> <cityAirport>LHR</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>JFK</cityAirport> </arrivalLocation> <marketingCompany> <identifier>IB</identifier> </marketingCompany> <operatingCompany> <identifier>BA</identifier> </operatingCompany> <flightIdentification> <number>4615</number> </flightIdentification> <productTypeDetail> <productIndicators>D</productIndicators> <productIndicators>701</productIndicators> </productTypeDetail> <lineItemNumber>10</lineItemNumber> </basicFlightInfo> <additionalFlightInfo> <flightDetails> <typeOfAircraft>744</typeOfAircraft> <numberOfStops>0</numberOfStops> <legDuration>0740</legDuration> <dayOfOperation>2345</dayOfOperation> <effectivePeriod>010114100114</effectivePeriod> </flightDetails> <departureStation> <terminal>5</terminal> </departureStation> <arrivalStation> <terminal>7</terminal> </arrivalStation> <productFacilities> <type>1A</type> </productFacilities> </additionalFlightInfo> </flightInfo> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>030114</departureDate> <departureTime>1000</departureTime> <arrivalDate>030114</arrivalDate> <arrivalTime>1245</arrivalTime> </flightDetails> <departureLocation> <cityAirport>LHR</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>JFK</cityAirport> </arrivalLocation> <marketingCompany> <identifier>BA</identifier> </marketingCompany> <flightIdentification> <number>175</number> </flightIdentification> <productTypeDetail> <productIndicators>D</productIndicators> </productTypeDetail> <lineItemNumber>11</lineItemNumber> </basicFlightInfo> <additionalFlightInfo> <flightDetails> <typeOfAircraft>744</typeOfAircraft> <numberOfStops>0</numberOfStops> <legDuration>0745</legDuration> <dayOfOperation>1234567</dayOfOperation> <effectivePeriod>010114130114</effectivePeriod> </flightDetails> <departureStation> <terminal>5</terminal> </departureStation> <arrivalStation> <terminal>7</terminal> </arrivalStation> <productFacilities> <type>1A</type> </productFacilities> </additionalFlightInfo> </flightInfo> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>030114</departureDate> <departureTime>1000</departureTime> <arrivalDate>030114</arrivalDate> <arrivalTime>1245</arrivalTime> </flightDetails> <departureLocation> <cityAirport>LHR</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>JFK</cityAirport> </arrivalLocation> <marketingCompany> <identifier>AA</identifier> </marketingCompany> <operatingCompany> <identifier>BA</identifier> </operatingCompany> <flightIdentification> <number>6140</number> </flightIdentification> <productTypeDetail> <productIndicators>D</productIndicators> <productIndicators>701</productIndicators> </productTypeDetail> <lineItemNumber>12</lineItemNumber> </basicFlightInfo> <additionalFlightInfo> <flightDetails> <typeOfAircraft>744</typeOfAircraft> <numberOfStops>0</numberOfStops> <legDuration>0745</legDuration> <dayOfOperation>1234567</dayOfOperation> <effectivePeriod>020114080314</effectivePeriod> </flightDetails> <departureStation> <terminal>5</terminal> </departureStation> <arrivalStation> <terminal>7</terminal> </arrivalStation> <productFacilities> <type>AS</type> </productFacilities> <productFacilities> <type>DA</type> </productFacilities> </additionalFlightInfo> </flightInfo> </singleCityPairInfo> </Air\_MultiAvailabilityReply>

## 5.25.3 Possible Errors

See "Error Messages" section

* * *

## 5.26 Operation: TimeTable - Multi Modal Journey Planning

The multimodal journey planner offers mixed air and rail travel solutions.

In the query, there is the possibility to use rail location codes on 7 digits.

In the reply, the travel solutions can mix air and rail segments. For rail segments, the main differences are in the format of the station codes, provider codes, product/equipment codes and platform/track ID. Moreover real time data can be returned for rail segments.

Action code to be used is 80 (timetable multi-modal request).

This is a high-level overview of supported input options:

**Input Name**

  

**Description**

Locations

M

Origin and destination.

IATA type

O

If location is an IATA code, precise if it is a city or airport code.

Location context

O

If location is a rail location, a context is precised.

Departure date, time

O

  

Departure time window

O

  

Max number of expected solutions per OND

O

  

Sorting type

O

By departure time, by arrival time, by travel time.

Transport type

O

Air or rail.

Train type

O

  

Exclude via point

O

  

Include via point

O

  

Context of via point

C

If location is a rail location, a context is precised.

Via’s IATA type

O

  

Minimum layover time at via

O

Minimum connecting time in minutes at specified via.

ignored if < MCT

Maximum layover time at via

O

Maximum connecting time in minutes at specified via.

ignored if < MCT

Incremental layover time at via

O

% to extend the time required for connections by a specified percentage.

A value of 200 doubles the change time as initially calculated by the system (MCT).

Include marketing Air carrier

O

  

Exclude marketing Air carrier

O

  

Maximum ETT of the travel solutions

O

In minutes.

Maximum number of transport type changes

O

Maximum number of transport type changes (max switch from air to rail or from rail to air).

Maximum number of service changes

O

Whatever the transport type.

Return intermediate stops

O

Enables to return the intermediate stops. For Rail, intermediate stops include border points.

This is a high-level overview of possible output details:

**Output Name**

  

**Description**

Transport type

M

Air or rail

Departure date, time

M

  

Arrival date, time

M

  

Locations

M

Origin and destination, IATA or rail format.

Carrier codes for Air

M

  

Rail product

C

If rail solution is returned, a rail product code should be returned as well.

Service number

M

  

ETT/Travel time

O

ETT of the service.

Services on board

O

If rail solution is returned, services on board should be returned if available.

Equipment type

O

  

Departure/Arrival Platform/Terminal

O

  

Intermediate stops

O

  

Border points

O

If rail solution is returned:

Indicator to highlight if a stop is a border point.

Realtime departure date, time, track

O

If rail solution is returned.

Realtime departure track

O

If rail solution is returned.

Realtime arrival date, time, track

O

If rail solution is returned.

Realtime arrival track

O

If rail solution is returned.

## 5.26.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_MultiAvailability xmlns="http://xml.amadeus.com/SATRQT\_16\_1\_1A"> <messageActionDetails> <functionDetails> <actionCode>80</actionCode> </functionDetails> </messageActionDetails> <requestSection> <availabilityProductInfo> <availabilityDetails> <departureDate>301115</departureDate> </availabilityDetails> <departureLocationInfo> <cityAirport>8400058</cityAirport> </departureLocationInfo> <arrivalLocationInfo> <cityAirport>ROM</cityAirport> </arrivalLocationInfo> </availabilityProductInfo> <pointTypeDetails> <attributeDetails> <attributeType>BOA</attributeType> <attributeDescription>RAI</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>TRT</attributeType> <attributeDescription>MIX</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>TRA</attributeType> <attributeDescription>ICY</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>TRA</attributeType> <attributeDescription>REG</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>BPR</attributeType> <attributeDescription>BENE</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>STO</attributeType> <attributeDescription>Y</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>ILT</attributeType> <attributeDescription>200</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>MIN</attributeType> <attributeDescription>10</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>MAX</attributeType> <attributeDescription>300</attributeDescription> </attributeDetails> </pointTypeDetails> <qualifiedConnectionOption> <connectionOption> <firstConnection> <location>8800004</location> </firstConnection> <secondConnection> <location>NCE</location> <time>0130</time> <indicatorList>700</indicatorList> <indicatorList>701</indicatorList> </secondConnection> </connectionOption> <connexionContext> <locationType>XXX</locationType> <locationDescription> <code>BENE</code> </locationDescription> </connexionContext> </qualifiedConnectionOption> <availabilityOptions> <typeOfRequest>TN</typeOfRequest> </availabilityOptions> </requestSection> </Air\_MultiAvailability>

## 5.26.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_MultiAvailabilityReply xmlns="http://xml.amadeus.com/SATRSP\_16\_1\_1A"> <messageActionDetails> <functionDetails> <businessFunction>1</businessFunction> <actionCode>80</actionCode> </functionDetails> <responseType>3</responseType> </messageActionDetails> <singleCityPairInfo> <locationDetails> <origin>8400058</origin> <destination>ROM</destination> </locationDetails> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>171115</departureDate> <departureTime>0650</departureTime> <arrivalDate>171115</arrivalDate> <arrivalTime>0740</arrivalTime> </flightDetails> <departureLocation> <cityAirport>8400058</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>8800043</cityAirport> </arrivalLocation> <marketingCompany> <identifier>XX</identifier> </marketingCompany> <flightIdentification> <number>172321</number> </flightIdentification> <productTypeDetail> <productIndicators>S</productIndicators> </productTypeDetail> <lineItemNumber>1</lineItemNumber> </basicFlightInfo> <providerDetails> <travelSector>RAI</travelSector> <companyName>Bene</companyName> </providerDetails> <additionalFlightInfo> <flightDetails> <typeOfAircraft>ICE</typeOfAircraft> </flightDetails> <productFacilities> <type>1A</type> </productFacilities> </additionalFlightInfo> <realTimeDateTimes> <dateTime> <year>2015</year> <month>11</month> <day>30</day> <hour>16</hour> <minutes>10</minutes> </dateTime> </realTimeDateTimes> <stops> <connectionDetails> <location>8800004</location> </connectionDetails> </stops> <servicesOnboard> <freeTextDetails> <textSubjectQualifier>1</textSubjectQualifier> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>AIR CONDITIONNING</freeText> </servicesOnboard> </flightInfo> <flightInfo> <basicFlightInfo> <flightDetails> <departureDate>171115</departureDate> <departureTime>0930</departureTime> <arrivalDate>171115</arrivalDate> <arrivalTime>1135</arrivalTime> </flightDetails> <departureLocation> <cityAirport>BRU</cityAirport> </departureLocation> <arrivalLocation> <cityAirport>FCO</cityAirport> </arrivalLocation> <marketingCompany> <identifier>SN</identifier> </marketingCompany> <flightIdentification> <number>3177</number> </flightIdentification> <productTypeDetail> <productIndicators>E</productIndicators> </productTypeDetail> </basicFlightInfo> <providerDetails> <travelSector>AIR</travelSector> <companyName>1A</companyName> </providerDetails> <additionalFlightInfo> <flightDetails> <typeOfAircraft>320</typeOfAircraft> <numberOfStops>0</numberOfStops> <legDuration></legDuration> </flightDetails> <productFacilities> <type>1A</type> </productFacilities> </additionalFlightInfo> </flightInfo> </singleCityPairInfo> </Air\_MultiAvailabilityReply>

## 5.26.3 Possible Errors

See "Error Messages" section.

* * *