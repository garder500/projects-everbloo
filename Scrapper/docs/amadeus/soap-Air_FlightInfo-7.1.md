---
url: "https://developers.amadeus.com/api-library/soap/functional-doc/1/doc-read/2311?serviceVersion=7.1"
download_url: "https://developers.amadeus.com/PAS-EAS/api/download/comp/4d4ad2cb456c02633f463a055ab70584/2311/HTML_UG_WBS_Air_FlightInfo_FLIREQ_07.1/UG_WBS_Air_FlightInfo_FLIREQ_07.1_018.html"
title: "HTML_UG_WBS_Air_FlightInfo_FLIREQ_07.1_018"
source: "amadeus"
service_id: "1"
service_name: "Air_FlightInfo"
version: "7.1"
document_id: "2311"
doc_version: "7.1"
doc_type: "User guide"
file_format: "HTML"
scraped_at: "2026-07-15T10:12:44.173Z"
---
# Function: Air\_FlightInfo

* * *

## 1 Overview

The Flight Information function provides Amadeus end-users with up-to-date information related to the operation of a particular flight before, during and after departure. Similarly, it provides irregularity and supplementary codes related to a change in the flight operation.

Flight Information data are stored in the Amadeus Flight Data as a result of:

-   SCHEDULE flight UPDATES done via SSIM messages.
-   OPERATIONAL UPDATES done via Movement messages (MVT), Diversion messages (DIV) and FLIX (if applicable).

## 1.1 Supported Operations

The Flight Information function allows for the following operations, this depend on options used in the input query:

-   Display Flight information for flight number on current date.
-   Display Flight information for flight number on specified date.
-   Display Flight information for flight number on specified date on a segment.
-   Display Flight information for flight number on specified date from a board point.

## 1.2 Limitations

The Time Mode **T12** is not supported. The T12 mode allows the user to display the times using 00:00 to 12:00 format with an indicator for morning and afternoon. Only the T24 mode is supported, where the times are displayed from 00:00 to 24:00.

City codes are not supported.

Non IATA airline codes are not supported.

## 1.3 Unsupported Operations

Display Flight information for a flight number on a specified date up to an off point.

## 1.4 Prerequisites

### Security about operational data

The security depends on the type of service provided by Amadeus to the airline.

1.  Amadeus Access Update airlines: operational information can be displayed by **any users**.
2.  Other Airlines with Agreement with Amadeus: operational information can be displayed by **any users**.
3.  Other Airlines without any Agreement with Amadeus: operational information cannot be displayed fromTravel Agents' terminals. It is only displayable from **System Users' terminals**.

### Codeshare scenario:

In case of code-share, Amadeus end-user accesses the operational flight information of the operating flight by targeting the marketing flight if:

-   The marketing Carrier did not send any MVT/DIV messages on its own flight, otherwise Amadeus will display these ones instead of the operating carrier ones.
-   The operating Carriers provide DEI10 (Data Element Identifier, refer to page12 for a complete description of possible DEI) which indicates the marketing leg reference(s).
-   The marketing Carriers correctly provide DEI50 which indicates the operating leg reference.
-   Both involved Airlines support Operational Flight Information (FLIFO)

## 2 Building A Query

**Specify the flight reference (airline code and flight number):**

<companyDetails>

   <marketingCompany>6X</marketingCompany>

</companyDetails>

<flightIdentification>

   <flightNumber>309</flightNumber>

</flightIdentification>

The **marketingCompany** element contains the reference airline for which the user wants the flight information.

The **flightNumber** element contains the flight number for which the user wants the flight information.

The flight reference may also contain an operational suffix. The operational suffix is contained in the **operationalSuffix** element.

**Specify the flight date:**

<flightDate>

   <departureDate>051114</departureDate>

</flightDate>\\

The **departureDate** element contains the departure date of the segment for which the user wants the flight information. The departure date is in local time of the first board point of the segment. If this element is not specified the current date applies.

**Specify the board and off points:**

<boardPointDetails>

   <trueLocationId>NCE</trueLocationId>

</boardPointDetails>

<offPointDetails>

   <trueLocationId>CDG</trueLocationId>

</offPointDetails>

The **trueLocationId** element contains an IATA airport code from/to which the user wants the flight information. If these elements are not specified, the whole flight route is retrieved. If only a board point is specified, all the segments departing from this board point are returned in the reply. If only an off point is specified, an error is returned.

## 3 Receiving A Reply

A response for a flight information request is the following:

<Air\_FlightInfoReply xmlns="http://xml.amadeus.com/FLIRES\_07\_1\_1A">  
    <messageActionDetails\>  
        <messageFunctionDetails>  
            <businessFunction\>1</businessFunction\>  
            <messageFunction\>82</messageFunction\>  
            <responsibleAgency\>3</responsibleAgency\>  
        </messageFunctionDetails>  
    </messageActionDetails\>  
    <flightScheduleDetails\>  
        <dummySegment\>  
        </dummySegment\>  
        <generalFlightInfo\>  
            <flightDate\>  
                <departureDate\>160914</departureDate\>  
            </flightDate\>  
            <boardPointDetails\>  
                <trueLocationId\>NCE</trueLocationId\>  
            </boardPointDetails\>  
            <offPointDetails>  
                <trueLocationId\>CDG</trueLocationId\>  
            </offPointDetails>  
            <companyDetails\>  
                <marketingCompany\>6X</marketingCompany\>  
            </companyDetails\>  
            <productIdDetails>  
                <flightNumber\> 121</flightNumber\>  
            </productIdDetails>  
        </generalFlightInfo\>  
        <additionalProductDetails\>  
            <legDetails\>  
                <numberOfStops\>0</numberOfStops\>  
                <daysOfOperation\>2</daysOfOperation\>  
            </legDetails\>  
            <facilitiesInformation\>  
                <description>0100</description>  
            </facilitiesInformation\>  
        </additionalProductDetails\>  
        <interactiveFreeText\>  
            <freeTextQualification>  
                <textSubjectQualifier\>SIM</textSubjectQualifier\>  
            </freeTextQualification>  
            <freeText\>NCE CDG   -  ET/ ELECTRONIC TKT CANDIDATE</freeText\>  
        </interactiveFreeText\>  
        <boardPointAndOffPointDetails\>  
            <generalFlightInfo\>  
                <flightDate\>  
                    <departureDate\>160914</departureDate\>  
                    <departureTime\>1400</departureTime\>  
                </flightDate\>  
                <boardPointDetails\>  
                    <trueLocationId\>NCE</trueLocationId\>  
                </boardPointDetails\>  
            </generalFlightInfo\>  
            <additionalProductDetails\>  
                <legDetails\>  
                    <equipment>320</equipment>  
                    <duration>0100</duration>  
                </legDetails\>  
            </additionalProductDetails\>  
            <productInfo\>  
                <bookingClassDetails>  
                    <designator>J</designator>  
                </bookingClassDetails>  
                </productInfo\>  
            <equipmentInfo\>  
                <cabinClassDetails\>  
                    <classDesignator\>J</classDesignator\>  
                    <numberOfSeats\>20</numberOfSeats\>  
                </cabinClassDetails\>  
            </equipmentInfo\>  
            <interactiveFreeText\>  
                <freeTextQualification>  
                    <textSubjectQualifier\>4</textSubjectQualifier\>  
                </freeTextQualification>  
                <freeText\>ED 1700 ESTIMATED TIME OF DEPARTURE</freeText\>  
            </interactiveFreeText\>  
        </boardPointAndOffPointDetails\>  
        <boardPointAndOffPointDetails\>  
            <generalFlightInfo\>  
                <flightDate\>  
                    <arrivalDate\>160914</arrivalDate\>  
                    <arrivalTime\>1500</arrivalTime\>  
                </flightDate\>  
                <offPointDetails>  
                    <trueLocationId\>CDG</trueLocationId\>  
                </offPointDetails>  
            </generalFlightInfo\>  
            <interactiveFreeText\>  
                <freeTextQualification>  
                    <textSubjectQualifier\>4</textSubjectQualifier\>  
                </freeTextQualification>  
                <freeText\>EA 1800 ESTIMATED TIME OF ARRIVAL</freeText\>  
            </interactiveFreeText\>  
        </boardPointAndOffPointDetails\>  
    </flightScheduleDetails\>  
</Air\_FlightInfoReply>

The **businessFunction** element is set to 1 which means Air provider.

The **messageFunction** is set to 82  which means Flight Information movement function

The **responsibleAgence** is set to 3 which means IATA.

The **departureDate** element indicates the segment date in Local Time of the first board point of the segment (ddmmyy).

The **trueLocationId** element indicates the board and off points of the requested flight or segment .

The **marketingCompany** element indicates the requested airline code.

The **flightNumber** element indicates the requested flight number.

The **operationalSuffix** element indicates the operational suffix of the flight (if applicable).

The **numberOfStops** element indicates the numbers of stops the flight does. In case of mono-leg flight, this element indicates 0.

The **daysOfOperation** element indicates the days of the week corresponding to the segment date. 1=Monday, 2=Tuesday, 3=Wednesday, 4=Thursday, 5=Friday, 6=Saturday, 7=Sunday

The **complexingFlightIndicator** element is set to 2 in case of change of gauge. Otherwise this element is not filled.

The d**escription**  element indicates the total elapsed time of the segment (in hhmm).

The **freeText** element contains the Data Element Identifier (DEI) received with the flight schedule, the **textSubjectQualifier** element indicates the type of DEI. The qualifier can be:  
\- SIM=IATA SSIM defined information  
\- ZZZ=mutually defined (bilateral or internal information).

The list of possible values for DEI returned in this service is provided below:

**Identifier code**

**Data description**

**Service content  
**

1/(airline code1)/(airline code 2)

Joint operation airline designator

Joint flight (airline code1)/(airline code 2)

2/(airline code)

Code sharing - Commercial duplicate

Commercial duplicate – operated by (airline code)

3/(airline code)

Aircraft owner

Aircraft owner (airline code)

4/(airline code)

Cockpit crew employer

Cockpit crew (airline code)

5/(airline code)

Cabin crew employer

Cabin crew (airline code)

6/(freetext)

Onward flight

Onward flight (freetext)

8/(traffic restriction code)

Traffic restriction note

(Traffic restriction code)/ (traffic restriction description following IATA SSIM)

9/(airline code)

Code sharing – Shared Airline designator or wet lease airline designator

Operated by (airline code)

10/(flight number)

Duplicate leg cross reference – duplicate leg identification

/

11/(alliance code)

Partnership specification

Member of (alliance code)

50/(flight number)

Duplicate leg cross reference – operational leg identification

Operational leg (flight number)

98/(terminal)

Passenger terminal identifier - arrival

Arrives terminal (terminal)

99/(terminal)

Passenger terminal identifier - arrival

Departs terminal (terminal)

101/(booking class)

Passenger Reservation Booking Designator Segment Override

Class/Meal (booking class)

102/(booking class)

Passenger Reservation Booking Modifier Segment Override

Class/Meal (booking class)

111/(meal)

Meal Service Segment Override

Class/Meal (meal code)

113/(freetext)

Aircraft owner specification

Aircraft owner (freetext)

114/(freetext)

Cockpit crew employer specification

Cockpit crew owner (freetext)

115/(freetext)

Cabin crew employer specification

Cabin crew owner (freetext)

125/(airline code1)/(airline code 2)

Joint operation airline designator segment override

Joint flight (airline code1)/(airline code 2)

127/(freetext)

Code sharing and/or wet lease – operating airline disclosure

Operated by (freetext)

201

Subject to government approval

Subject to government approval

210

Plane change at board point without aircraft type change

Plane change at board point without aircraft type change

220/(I/D indicators)

Minimum connecting time international/domestic status override

MCT Flight Tracking (I/D indicators)

299/(freetext)

Passenger Check-in

Check-in (freetext)

501/(freetext)

On-Time Performance indicator

On-Time Perf (freetxt)

502/(freetext)

On-time Perf delay/CNL

On-time Perf delay/CNL (freetext)

503/(service code)

In flight service information

(service code)/ (in flight service description)

504/S

Secured flight

Secured flight

505/ET

Electronic ticketing information

ET /  Electronic ticket candidate

507/(reservation code)

Request all reservation

(description of reservation code)

The **departureTime** element in the **boardPointAndOffPointDetails** group indicates the schedule time of departure in local time of the airport.

The **arrivalTime** element in the **boardPointAndOffPointDetails** group indicates the schedule time of arrival in local time of the airport.

The **equipmen**t element indicates the equipment type used on the leg.

The **duration** element indicates the duration of the leg (in hours and minutes hhmm).

The **terminal** element indicates the departure or arrival terminal of the flight.

The **description** element in the **boardPointAndOffPointDetails** group indicates the ground time at an intermediary stop.

The **designator** element in the **bookingClassDetails** element indicates the list of booking classes available on the leg.

The **specialService** element in the **bookingClassDetails** group indicates the meal code available on each booking class indicated in the **designator** element. The possible meal codes are:

\- H: Hot meal  
\- K: Continental breakfast  
\- F: Food for purchase  
\- G: Food and beverage for purchase  
\- C: Alcoholic beverage – complimentary  
\- D: Dinner  
\- B: Breakfast  
\- S: Snack or brunch  
\- V: Refreshment for purchase  
\- P: Alcoholic beverage for purchase  
\- R: Refreshments – complimentary  
\- N: No meal service  
\- O: Cold meal  
\- L: Lunch  
\-M: Meal (to be used as a generalization)

The **numberOfseats** elements in the **cabinClassDetails** group indicates the numbers of seats available on the leg for the correspondig class specified in the **classDesignator** element. The **cabinClassDetails** group composed of c**lassDesignator** and **numberOfSeats** elements corresponds to the saleable configuration.

The **freeText** element in the **boardPointAndOffPointDetails** group contains the operational data of the leg, the list of possible information conveys in this element is provided below. The **textSubjectQualifier** is set to 4, which means coded and literal text.

**Identifier code**

**Data description**

**Service content**

**MVT**

ED(time)

Estimated time of departure – off block time

ED (local time) Estimated time of departure

NI (time)

Next information time

NI (local time) Next info will be at

AD(time1)/(time2)

Actual time of departure off block

Actual time of departure take-off

AD (local time1) Left the gate

AD (local time2) Took off

EA(time)

Estimated time of arrival – touch down time

EA (local time) Estimated time of arrival

EB(time)

Estimated time of arrival – On block time

EB (local time) Aircraft expected at gate

AA(time1)/(time2)

Actual time of arrival touch down

Actual time of arrival on block

AA (local time1) Aircraft landed

AA (local time2) Arrived

DL(delay reason)/(duration)

Delay reason and associated duration

Delay (delay reason)

DL (duration) Plane is late (in hour minutes)

PX(number of pax)

Passenger on board count per destination

PX Passengers on board (number of pax)

EO(time)

Estimated time of departure – take off time

EO (local time) Estimated take off time

RR(time)

Return to Ramp

RR (local time) Aircraft returned to ramp

FR(time1)/(time2)

Return from airborne – Touch down time

Return from airborne . on block time

FR (local time1) Aircraft forced to return landed at

FR (local time2) Expected on block at

RC(time UTC) (airport)

Aircraft reclearance time

Aircraft reclearance airport

RC (time) aircraft reclearance

SI (text)

Supplementary information

SI Other information (text)

**FLIX**

FLIX FX identifier

FLIX Flight cancelled

Flight Cancelled

FLIX FX comment

FLIX Flight cancelled comment

(comment)

FLIX LX identifier

FLIX Landing cancelled

Landing Cancelled

FLIX LX comment

FLIX Landing cancelled comment

(comment)

FLIX FD identifier

FLIX Flight Disrupted

/

FLIX FD comment

FLIX Flight Disrupted comment

(comment)

FLIX FD ETD

FLIX Flight Disrupted – Estimated time of departure

FLIX FD (local time) Estimated Time of departure

FLIX FD ETA

FLIX Flight Disrupted – Estimated time of arrival

FLIX FD (local time) Estimated time of arrival

**DIV**

EA(time) (airport of diversion)

Estimated time of arrival at diversion airport

EA (local time) Estimated time of arrival

DIV (initial airport) (airport of diversion)

DR(delay reason)

Delay reason

DR (delay reason)

CONT (airport)

Continuing at

CONT (airport) Aircraft continuing at

TERM

Terminates

TERM Aircraft terminates

## 4 Error Messages

The errors listed below can be encountered while using the the Flight Information function.

ERROR MESSAGE

ERROR CODE

Flight Segment not found

437

Invalid Airline Code

817

Flight Not Operational

620

Date is outside the system range  

630

Flight Cancelled

AUE

In case of Flight Cancelled error, the details of the cancelled flight date are returned in the Flight Information reply after the error group.

The **errorCategory** element is also included in the reply, the possible codes returned are the following:

Value

Description

EC

Error code

WEC

Warning code

INF

Informative code

## 4.1 Error Reply

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<message agency="1A" release="1" type="FLIRES" version="07"> <messageActionDetails> <messageFunctionDetails> <businessFunction>1</businessFunction> <messageFunction>82</messageFunction> <responsibleAgency>3</responsibleAgency> </messageFunctionDetails> </messageActionDetails> <responseError> <errorInfo> <errorDetails> <errorCode>620</errorCode> <errorCategory>EC</errorCategory> <errorCodeOwner>1A</errorCodeOwner> </errorDetails> </errorInfo> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>1</textSubjectQualifier> </freeTextQualification> <freeText>FLIGHT NOT OPERATIONAL</freeText> </interactiveFreeText> </responseError> </message> <Air\_FlightInfoReply xmlns="http://xml.amadeus.com/FLIRES\_07\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <businessFunction>1</businessFunction> <messageFunction>82</messageFunction> <responsibleAgency>3</responsibleAgency> </messageFunctionDetails> </messageActionDetails> <responseError> <errorInfo> <errorDetails> <errorCode>AUE</errorCode> <errorCategory>INF</errorCategory> <errorCodeOwner>1A</errorCodeOwner> </errorDetails> </errorInfo> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>1</textSubjectQualifier> </freeTextQualification> <freeText>FLIGHT CANCELLED</freeText> </interactiveFreeText> </responseError> <flightScheduleDetails> <dummySegment></dummySegment> <generalFlightInfo> <flightDate> <departureDate>241014</departureDate> </flightDate> <boardPointDetails> <trueLocationId>NCE</trueLocationId> </boardPointDetails> <offPointDetails> <trueLocationId>CDG</trueLocationId> </offPointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> </companyDetails> <productIdDetails> <flightNumber> 121</flightNumber> </productIdDetails> </generalFlightInfo> <additionalProductDetails> <legDetails> <numberOfStops>0</numberOfStops> <daysOfOperation>5</daysOfOperation> </legDetails> <facilitiesInformation> <description>0200</description> </facilitiesInformation> </additionalProductDetails> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>SIM</textSubjectQualifier> </freeTextQualification> <freeText>NCE CDG - ET/ ELECTRONIC TKT CANDIDATE</freeText> </interactiveFreeText> <boardPointAndOffPointDetails> <generalFlightInfo> <flightDate> <departureDate>241014</departureDate> <departureTime>1200</departureTime> </flightDate> <boardPointDetails> <trueLocationId>NCE</trueLocationId> </boardPointDetails> </generalFlightInfo> <additionalProductDetails> <legDetails> <equipment>320</equipment> <duration>0200</duration> </legDetails> </additionalProductDetails> <productInfo> <bookingClassDetails> <designator>J</designator> </bookingClassDetails> <bookingClassDetails> <designator>D</designator> </bookingClassDetails> <bookingClassDetails> <designator>I</designator> </bookingClassDetails> <bookingClassDetails> <designator>U</designator> </bookingClassDetails> <bookingClassDetails> <designator>Y</designator> </bookingClassDetails> </productInfo> </boardPointAndOffPointDetails> <boardPointAndOffPointDetails> <generalFlightInfo> <flightDate> <arrivalDate>241014</arrivalDate> <arrivalTime>1400</arrivalTime> </flightDate> <offPointDetails> <trueLocationId>CDG</trueLocationId> </offPointDetails> </generalFlightInfo> </boardPointAndOffPointDetails> </flightScheduleDetails> </Air\_FlightInfoReply>

  

* * *

## 5 Operations

## 5.1 Operation: Airline Code And Flight Number

Basic flight information request based on airline code and flight number.

As the date is not specified, the reply contains the flight of the current day.

As the board and off points are not specified, the reply contains the whole flight route.

## 5.1.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_FlightInfo xmlns="http://xml.amadeus.com/FLIREQ\_07\_1\_1A"> <generalFlightInfo> <companyDetails> <marketingCompany>6X</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>121</flightNumber> </flightIdentification> </generalFlightInfo> </Air\_FlightInfo>

## 5.1.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_FlightInfoReply xmlns="http://xml.amadeus.com/FLIRES\_07\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <businessFunction>1</businessFunction> <messageFunction>82</messageFunction> <responsibleAgency>3</responsibleAgency> </messageFunctionDetails> </messageActionDetails> <flightScheduleDetails> <dummySegment></dummySegment> <generalFlightInfo> <flightDate> <departureDate>241014</departureDate> </flightDate> <boardPointDetails> <trueLocationId>NCE</trueLocationId> </boardPointDetails> <offPointDetails> <trueLocationId>CDG</trueLocationId> </offPointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> </companyDetails> <productIdDetails> <flightNumber> 121</flightNumber> </productIdDetails> </generalFlightInfo> <additionalProductDetails> <legDetails> <numberOfStops>0</numberOfStops> <daysOfOperation>5</daysOfOperation> </legDetails> <facilitiesInformation> <description>0100</description> </facilitiesInformation> </additionalProductDetails> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>SIM</textSubjectQualifier> </freeTextQualification> <freeText>NCE CDG - ET/ ELECTRONIC TKT CANDIDATE</freeText> </interactiveFreeText> <boardPointAndOffPointDetails> <generalFlightInfo> <flightDate> <departureDate>241014</departureDate> <departureTime>1400</departureTime> </flightDate> <boardPointDetails> <trueLocationId>NCE</trueLocationId> </boardPointDetails> </generalFlightInfo> <additionalProductDetails> <legDetails> <equipment>320</equipment> <duration>0100</duration> </legDetails> </additionalProductDetails> <productInfo> <bookingClassDetails> <designator>J</designator> </bookingClassDetails> <bookingClassDetails> <designator>D</designator> </bookingClassDetails> <bookingClassDetails> <designator>I</designator> </bookingClassDetails> <bookingClassDetails> <designator>U</designator> </bookingClassDetails> <bookingClassDetails> <designator>Y</designator> </bookingClassDetails> </productInfo> <equipmentInfo> <cabinClassDetails> <classDesignator>J</classDesignator> <numberOfSeats>20</numberOfSeats> </cabinClassDetails> <cabinClassDetails> <classDesignator>Y</classDesignator> <numberOfSeats>144</numberOfSeats> </cabinClassDetails> </equipmentInfo> </boardPointAndOffPointDetails> <boardPointAndOffPointDetails> <generalFlightInfo> <flightDate> <arrivalDate>241014</arrivalDate> <arrivalTime>1500</arrivalTime> </flightDate> <offPointDetails> <trueLocationId>CDG</trueLocationId> </offPointDetails> </generalFlightInfo> </boardPointAndOffPointDetails> </flightScheduleDetails> </Air\_FlightInfoReply>

## 5.1.3 Possible Errors

See "Error Messages" section

* * *

## 5.2 Operation: Change Of Gauge Flight Information In Reply

This example illustrates a request for flight Information for flight 6X 121, in this specific case the Reply includes the Change Of Gauge information.

The **_legDetails/complexingFlightIndicator_** set to 2 is the indicator in the reply that denote a Change Of Gauge flight.

## 5.2.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_FlightInfo xmlns="http://xml.amadeus.com/FLIREQ\_07\_1\_1A"> <generalFlightInfo> <flightDate> <departureDate>121014</departureDate> </flightDate> <boardPointDetails> <trueLocationId>BDL</trueLocationId> </boardPointDetails> <offPointDetails> <trueLocationId>LAX</trueLocationId> </offPointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>121</flightNumber> </flightIdentification> </generalFlightInfo> </Air\_FlightInfo>

## 5.2.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_FlightInfoReply xmlns="http://xml.amadeus.com/FLIRES\_07\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <businessFunction>1</businessFunction> <messageFunction>82</messageFunction> <responsibleAgency>3</responsibleAgency> </messageFunctionDetails> </messageActionDetails> <flightScheduleDetails> <dummySegment> </dummySegment> <generalFlightInfo> <flightDate> <departureDate>121014</departureDate> </flightDate> <boardPointDetails> <trueLocationId>BDL</trueLocationId> </boardPointDetails> <offPointDetails> <trueLocationId>LAX</trueLocationId> </offPointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> </companyDetails> <productIdDetails> <flightNumber>121</flightNumber> </productIdDetails> </generalFlightInfo> <additionalProductDetails> <legDetails> <numberOfStops>1</numberOfStops> <daysOfOperation>3</daysOfOperation> <complexingFlightIndicator>2</complexingFlightIndicator> </legDetails> <facilitiesInformation> <description>0855</description> </facilitiesInformation> </additionalProductDetails> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>SIM</textSubjectQualifier> </freeTextQualification> <freeText>BLD ORD - MEMBER OF STAR ALLIANCE</freeText> </interactiveFreeText> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>SIM</textSubjectQualifier> </freeTextQualification> <freeText>BDL LAX - MEMBER OF STAR ALLIANCE</freeText> </interactiveFreeText> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>SIM</textSubjectQualifier> </freeTextQualification> <freeText>ORD LAX - MEMBER OF STAR ALLIANCE</freeText> </interactiveFreeText> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>SIM</textSubjectQualifier> </freeTextQualification> <freeText>FROM ORD - DEPARTS TERMINAL 1</freeText> </interactiveFreeText> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>SIM</textSubjectQualifier> </freeTextQualification> <freeText>TO ORD - ARRIVES TERMINAL 1</freeText> </interactiveFreeText> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>SIM</textSubjectQualifier> </freeTextQualification> <freeText>TO LAX - ARRIVES TERMINAL 7</freeText> </interactiveFreeText> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>SIM</textSubjectQualifier> </freeTextQualification> <freeText>BDL ORD - 9 / NON-SMOKING</freeText> </interactiveFreeText> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>SIM</textSubjectQualifier> </freeTextQualification> <freeText>BDL ORD - 10 / SHORT FEATURE VIDEO</freeText> </interactiveFreeText> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>SIM</textSubjectQualifier> </freeTextQualification> <freeText>ORD LAX - 1 / MOVIE</freeText> </interactiveFreeText> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>SIM</textSubjectQualifier> </freeTextQualification> <freeText>ORD LAX - 9 / NON-SMOKING</freeText> </interactiveFreeText> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>SIM</textSubjectQualifier> </freeTextQualification> <freeText>BDL ORD - ET / ELECTRONIC TKT CANDIDATE</freeText> </interactiveFreeText> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>SIM</textSubjectQualifier> </freeTextQualification> <freeText>ORD LAX - ET / ELECTRONIC TKT CANDIDATE</freeText> </interactiveFreeText> <boardPointAndOffPointDetails> <generalFlightInfo> <flightDate> <departureDate>121014</departureDate> <departureTime>1136</departureTime> </flightDate> <boardPointDetails> <trueLocationId>BDL</trueLocationId> </boardPointDetails> </generalFlightInfo> <additionalProductDetails> <legDetails> <equipment>320</equipment> <duration>0239</duration> </legDetails> </additionalProductDetails> <productInfo> <bookingClassDetails> <designator>F</designator> <specialService>L</specialService> </bookingClassDetails> <bookingClassDetails> <designator>Y</designator> </bookingClassDetails> <bookingClassDetails> <designator>B</designator> </bookingClassDetails> <bookingClassDetails> <designator>E</designator> </bookingClassDetails> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> <bookingClassDetails> <designator>U</designator> </bookingClassDetails> <bookingClassDetails> <designator>H</designator> </bookingClassDetails> <bookingClassDetails> <designator>Q</designator> </bookingClassDetails> <bookingClassDetails> <designator>V</designator> </bookingClassDetails> <bookingClassDetails> <designator>W</designator> </bookingClassDetails> <bookingClassDetails> <designator>A</designator> <specialService>L</specialService> </bookingClassDetails> <bookingClassDetails> <designator>S</designator> </bookingClassDetails> <bookingClassDetails> <designator>T</designator> </bookingClassDetails> <bookingClassDetails> <designator>K</designator> </bookingClassDetails> <bookingClassDetails> <designator>L</designator> </bookingClassDetails> <bookingClassDetails> <designator>G</designator> </bookingClassDetails> </productInfo> </boardPointAndOffPointDetails> <boardPointAndOffPointDetails> <generalFlightInfo> <flightDate> <departureDate>121014</departureDate> <departureTime>1500</departureTime> <arrivalDate>121015</arrivalDate> <arrivalTime>1315</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>ORD</trueLocationId> </boardPointDetails> <offPointDetails> <trueLocationId>ORD</trueLocationId> </offPointDetails> </generalFlightInfo> <additionalProductDetails> <legDetails> <equipment>752</equipment> <duration>0431</duration> <complexingFlightIndicator>2</complexingFlightIndicator> </legDetails> <facilitiesInformation> <description>0145</description> </facilitiesInformation> </additionalProductDetails> <productInfo> <bookingClassDetails> <designator>F</designator> <specialService>L</specialService> </bookingClassDetails> <bookingClassDetails> <designator>Y</designator> <specialService>G</specialService> </bookingClassDetails> <bookingClassDetails> <designator>B</designator> <specialService>G</specialService> </bookingClassDetails> <bookingClassDetails> <designator>E</designator> <specialService>G</specialService> </bookingClassDetails> <bookingClassDetails> <designator>M</designator> <specialService>G</specialService> </bookingClassDetails> <bookingClassDetails> <designator>U</designator> <specialService>G</specialService> </bookingClassDetails> <bookingClassDetails> <designator>H</designator> <specialService>G</specialService> </bookingClassDetails> <bookingClassDetails> <designator>Q</designator> <specialService>G</specialService> </bookingClassDetails> <bookingClassDetails> <designator>V</designator> <specialService>G</specialService> </bookingClassDetails> <bookingClassDetails> <designator>W</designator> <specialService>G</specialService> </bookingClassDetails> <bookingClassDetails> <designator>A</designator> <specialService>L</specialService> </bookingClassDetails> <bookingClassDetails> <designator>S</designator> <specialService>G</specialService> </bookingClassDetails> <bookingClassDetails> <designator>T</designator> <specialService>G</specialService> </bookingClassDetails> <bookingClassDetails> <designator>K</designator> <specialService>G</specialService> </bookingClassDetails> <bookingClassDetails> <designator>L</designator> <specialService>G</specialService> </bookingClassDetails> <bookingClassDetails> <designator>G</designator> <specialService>G</specialService> </bookingClassDetails> </productInfo> </boardPointAndOffPointDetails> </flightScheduleDetails> </Air\_FlightInfoReply>

## 5.2.3 Possible Errors

See "Error Messages" section.

* * *

## 5.3 Operation: Date Specified

Flight information request with date specified.

## 5.3.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_FlightInfo xmlns="http://xml.amadeus.com/FLIREQ\_07\_1\_1A"> <generalFlightInfo> <flightDate> <departureDate>301214</departureDate> </flightDate> <companyDetails> <marketingCompany>6X</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>17</flightNumber> </flightIdentification> </generalFlightInfo> </Air\_FlightInfo>

## 5.3.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_FlightInfoReply xmlns="http://xml.amadeus.com/FLIRES\_07\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <businessFunction>1</businessFunction> <messageFunction>82</messageFunction> <responsibleAgency>3</responsibleAgency> </messageFunctionDetails> </messageActionDetails> <flightScheduleDetails> <dummySegment></dummySegment> <generalFlightInfo> <flightDate> <departureDate>301214</departureDate> </flightDate> <boardPointDetails> <trueLocationId>LHR</trueLocationId> </boardPointDetails> <offPointDetails> <trueLocationId>MEL</trueLocationId> </offPointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> </companyDetails> <productIdDetails> <flightNumber> 17</flightNumber> </productIdDetails> </generalFlightInfo> <additionalProductDetails> <legDetails> <numberOfStops>1</numberOfStops> <daysOfOperation>2</daysOfOperation> </legDetails> <facilitiesInformation> <description>2115</description> </facilitiesInformation> </additionalProductDetails> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>SIM</textSubjectQualifier> </freeTextQualification> <freeText>LHR SIN - DEPARTS TERMINAL 4</freeText> </interactiveFreeText> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>SIM</textSubjectQualifier> </freeTextQualification> <freeText>SIN MEL - DEPARTS TERMINAL 1</freeText> </interactiveFreeText> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>SIM</textSubjectQualifier> </freeTextQualification> <freeText>LHR SIN - ARRIVES TERMINAL 1</freeText> </interactiveFreeText> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>SIM</textSubjectQualifier> </freeTextQualification> <freeText>ENTIRE FLT- ET/ ELECTRONIC TKT CANDIDATE</freeText> </interactiveFreeText> <boardPointAndOffPointDetails> <generalFlightInfo> <flightDate> <departureDate>301214</departureDate> <departureTime>2335</departureTime> </flightDate> <boardPointDetails> <trueLocationId>LHR</trueLocationId> </boardPointDetails> </generalFlightInfo> <additionalProductDetails> <legDetails> <equipment>744</equipment> <duration>1245</duration> </legDetails> <departureStationInfo> <terminal>4</terminal> </departureStationInfo> <arrivalStationInfo> <terminal>1</terminal> </arrivalStationInfo> </additionalProductDetails> <productInfo> <bookingClassDetails> <designator>F</designator> </bookingClassDetails> <bookingClassDetails> <designator>A</designator> </bookingClassDetails> <bookingClassDetails> <designator>Z</designator> </bookingClassDetails> <bookingClassDetails> <designator>J</designator> </bookingClassDetails> <bookingClassDetails> <designator>D</designator> </bookingClassDetails> <bookingClassDetails> <designator>I</designator> </bookingClassDetails> <bookingClassDetails> <designator>U</designator> </bookingClassDetails> <bookingClassDetails> <designator>W</designator> </bookingClassDetails> <bookingClassDetails> <designator>T</designator> </bookingClassDetails> <bookingClassDetails> <designator>R</designator> </bookingClassDetails> <bookingClassDetails> <designator>Y</designator> </bookingClassDetails> <bookingClassDetails> <designator>B</designator> </bookingClassDetails> <bookingClassDetails> <designator>H</designator> </bookingClassDetails> <bookingClassDetails> <designator>K</designator> </bookingClassDetails> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> <bookingClassDetails> <designator>L</designator> </bookingClassDetails> <bookingClassDetails> <designator>V</designator> </bookingClassDetails> <bookingClassDetails> <designator>N</designator> </bookingClassDetails> <bookingClassDetails> <designator>O</designator> </bookingClassDetails> <bookingClassDetails> <designator>Q</designator> </bookingClassDetails> <bookingClassDetails> <designator>S</designator> </bookingClassDetails> <bookingClassDetails> <designator>G</designator> </bookingClassDetails> <bookingClassDetails> <designator>X</designator> </bookingClassDetails> <bookingClassDetails> <designator>E</designator> </bookingClassDetails> </productInfo> <equipmentInfo> <cabinClassDetails> <classDesignator>F</classDesignator> <numberOfSeats>14</numberOfSeats> </cabinClassDetails> <cabinClassDetails> <classDesignator>J</classDesignator> <numberOfSeats>38</numberOfSeats> </cabinClassDetails> <cabinClassDetails> <classDesignator>W</classDesignator> <numberOfSeats>36</numberOfSeats> </cabinClassDetails> <cabinClassDetails> <classDesignator>M</classDesignator> <numberOfSeats>263</numberOfSeats> </cabinClassDetails> </equipmentInfo> </boardPointAndOffPointDetails> <boardPointAndOffPointDetails> <generalFlightInfo> <flightDate> <departureDate>311214</departureDate> <departureTime>2145</departureTime> <arrivalDate>311214</arrivalDate> <arrivalTime>2020</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>SIN</trueLocationId> </boardPointDetails> <offPointDetails> <trueLocationId>SIN</trueLocationId> </offPointDetails> </generalFlightInfo> <additionalProductDetails> <legDetails> <equipment>744</equipment> <duration>0705</duration> </legDetails> <departureStationInfo> <terminal>1</terminal> </departureStationInfo> <facilitiesInformation> <description>0125</description> </facilitiesInformation> </additionalProductDetails> <productInfo> <bookingClassDetails> <designator>F</designator> </bookingClassDetails> <bookingClassDetails> <designator>A</designator> </bookingClassDetails> <bookingClassDetails> <designator>Z</designator> </bookingClassDetails> <bookingClassDetails> <designator>J</designator> </bookingClassDetails> <bookingClassDetails> <designator>D</designator> </bookingClassDetails> <bookingClassDetails> <designator>I</designator> </bookingClassDetails> <bookingClassDetails> <designator>U</designator> </bookingClassDetails> <bookingClassDetails> <designator>W</designator> </bookingClassDetails> <bookingClassDetails> <designator>T</designator> </bookingClassDetails> <bookingClassDetails> <designator>R</designator> </bookingClassDetails> <bookingClassDetails> <designator>Y</designator> </bookingClassDetails> <bookingClassDetails> <designator>B</designator> </bookingClassDetails> <bookingClassDetails> <designator>H</designator> </bookingClassDetails> <bookingClassDetails> <designator>K</designator> </bookingClassDetails> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> <bookingClassDetails> <designator>L</designator> </bookingClassDetails> <bookingClassDetails> <designator>V</designator> </bookingClassDetails> <bookingClassDetails> <designator>N</designator> </bookingClassDetails> <bookingClassDetails> <designator>O</designator> </bookingClassDetails> <bookingClassDetails> <designator>Q</designator> </bookingClassDetails> <bookingClassDetails> <designator>S</designator> </bookingClassDetails> <bookingClassDetails> <designator>G</designator> </bookingClassDetails> <bookingClassDetails> <designator>X</designator> </bookingClassDetails> <bookingClassDetails> <designator>E</designator> </bookingClassDetails> </productInfo> </boardPointAndOffPointDetails> <boardPointAndOffPointDetails> <generalFlightInfo> <flightDate> <arrivalDate>010115</arrivalDate> <arrivalTime>0750</arrivalTime> </flightDate> <offPointDetails> <trueLocationId>MEL</trueLocationId> </offPointDetails> </generalFlightInfo> </boardPointAndOffPointDetails> </flightScheduleDetails> </Air\_FlightInfoReply>

## 5.3.3 Possible Errors

See "Error Messages" section

* * *

## 5.4 Operation: Flight with operational suffix

Flight Information request on a flight with an operational suffix.

## 5.4.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_FlightInfo xmlns="http://xml.amadeus.com/FLIREQ\_07\_1\_1A"> <generalFlightInfo> <flightDate> <departureDate>291014</departureDate> </flightDate> <companyDetails> <marketingCompany>6X</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>121</flightNumber> <operationalSuffix>A</operationalSuffix> </flightIdentification> </generalFlightInfo> </Air\_FlightInfo>

## 5.4.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_FlightInfoReply xmlns="http://xml.amadeus.com/FLIRES\_07\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <businessFunction>1</businessFunction> <messageFunction>82</messageFunction> <responsibleAgency>3</responsibleAgency> </messageFunctionDetails> </messageActionDetails> <flightScheduleDetails> <dummySegment></dummySegment> <generalFlightInfo> <flightDate> <departureDate>291014</departureDate> </flightDate> <boardPointDetails> <trueLocationId>NCE</trueLocationId> </boardPointDetails> <offPointDetails> <trueLocationId>CDG</trueLocationId> </offPointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> </companyDetails> <productIdDetails> <flightNumber> 121</flightNumber> <operationalSuffix>A</operationalSuffix> </productIdDetails> </generalFlightInfo> <additionalProductDetails> <legDetails> <numberOfStops>0</numberOfStops> <daysOfOperation>3</daysOfOperation> </legDetails> <facilitiesInformation> <description>0100</description> </facilitiesInformation> </additionalProductDetails> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>SIM</textSubjectQualifier> </freeTextQualification> <freeText>NCE CDG - ET/ ELECTRONIC TKT CANDIDATE</freeText> </interactiveFreeText> <boardPointAndOffPointDetails> <generalFlightInfo> <flightDate> <departureDate>291014</departureDate> <departureTime>1400</departureTime> </flightDate> <boardPointDetails> <trueLocationId>NCE</trueLocationId> </boardPointDetails> </generalFlightInfo> <additionalProductDetails> <legDetails> <equipment>320</equipment> <duration>0100</duration> </legDetails> </additionalProductDetails> <productInfo> <bookingClassDetails> <designator>J</designator> </bookingClassDetails> <bookingClassDetails> <designator>D</designator> </bookingClassDetails> <bookingClassDetails> <designator>I</designator> </bookingClassDetails> <bookingClassDetails> <designator>U</designator> </bookingClassDetails> <bookingClassDetails> <designator>Y</designator> </bookingClassDetails> </productInfo> <equipmentInfo> <cabinClassDetails> <classDesignator>J</classDesignator> <numberOfSeats>20</numberOfSeats> </cabinClassDetails> <cabinClassDetails> <classDesignator>Y</classDesignator> <numberOfSeats>144</numberOfSeats> </cabinClassDetails> </equipmentInfo> </boardPointAndOffPointDetails> <boardPointAndOffPointDetails> <generalFlightInfo> <flightDate> <arrivalDate>291014</arrivalDate> <arrivalTime>1500</arrivalTime> </flightDate> <offPointDetails> <trueLocationId>CDG</trueLocationId> </offPointDetails> </generalFlightInfo> </boardPointAndOffPointDetails> </flightScheduleDetails> </Air\_FlightInfoReply>

## 5.4.3 Possible Errors

See "Error Messages" section.

* * *

## 5.5 Operation: Full Request Per Itinerary

Flight information request for itinerary.

The Flight Information reply contains all the legs and segments included in the requested itinerary.

The requested itinerary can be a leg, a segment or the whole route.

## 5.5.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_FlightInfo xmlns="http://xml.amadeus.com/FLIREQ\_07\_1\_1A"> <generalFlightInfo> <flightDate> <departureDate>241014</departureDate> </flightDate> <boardPointDetails> <trueLocationId>LAX</trueLocationId> </boardPointDetails> <offPointDetails> <trueLocationId>HKG</trueLocationId> </offPointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>123</flightNumber> </flightIdentification> </generalFlightInfo> </Air\_FlightInfo>

## 5.5.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_FlightInfoReply xmlns="http://xml.amadeus.com/FLIRES\_07\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <businessFunction>1</businessFunction> <messageFunction>82</messageFunction> <responsibleAgency>3</responsibleAgency> </messageFunctionDetails> </messageActionDetails> <flightScheduleDetails> <dummySegment></dummySegment> <generalFlightInfo> <flightDate> <departureDate>241014</departureDate> </flightDate> <boardPointDetails> <trueLocationId>LAX</trueLocationId> </boardPointDetails> <offPointDetails> <trueLocationId>HKG</trueLocationId> </offPointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> </companyDetails> <productIdDetails> <flightNumber> 123</flightNumber> </productIdDetails> </generalFlightInfo> <additionalProductDetails> <legDetails> <numberOfStops>2</numberOfStops> <daysOfOperation>5</daysOfOperation> </legDetails> <facilitiesInformation> <description>1600</description> </facilitiesInformation> </additionalProductDetails> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>SIM</textSubjectQualifier> </freeTextQualification> <freeText>ENTIRE FLT- ET/ ELECTRONIC TKT CANDIDATE</freeText> </interactiveFreeText> <boardPointAndOffPointDetails> <generalFlightInfo> <flightDate> <departureDate>241014</departureDate> <departureTime>0500</departureTime> </flightDate> <boardPointDetails> <trueLocationId>LAX</trueLocationId> </boardPointDetails> </generalFlightInfo> <additionalProductDetails> <legDetails> <equipment>772</equipment> <duration>0400</duration> </legDetails> </additionalProductDetails> <productInfo> <bookingClassDetails> <designator>F</designator> </bookingClassDetails> <bookingClassDetails> <designator>A</designator> </bookingClassDetails> <bookingClassDetails> <designator>Z</designator> </bookingClassDetails> <bookingClassDetails> <designator>J</designator> </bookingClassDetails> <bookingClassDetails> <designator>D</designator> </bookingClassDetails> <bookingClassDetails> <designator>I</designator> </bookingClassDetails> <bookingClassDetails> <designator>U</designator> </bookingClassDetails> <bookingClassDetails> <designator>Y</designator> </bookingClassDetails> <bookingClassDetails> <designator>B</designator> </bookingClassDetails> <bookingClassDetails> <designator>H</designator> </bookingClassDetails> <bookingClassDetails> <designator>K</designator> </bookingClassDetails> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> <bookingClassDetails> <designator>L</designator> </bookingClassDetails> <bookingClassDetails> <designator>V</designator> </bookingClassDetails> <bookingClassDetails> <designator>N</designator> </bookingClassDetails> <bookingClassDetails> <designator>O</designator> </bookingClassDetails> <bookingClassDetails> <designator>Q</designator> </bookingClassDetails> <bookingClassDetails> <designator>S</designator> </bookingClassDetails> <bookingClassDetails> <designator>G</designator> </bookingClassDetails> <bookingClassDetails> <designator>X</designator> </bookingClassDetails> <bookingClassDetails> <designator>E</designator> </bookingClassDetails> </productInfo> <equipmentInfo> <cabinClassDetails> <classDesignator>F</classDesignator> <numberOfSeats>17</numberOfSeats> </cabinClassDetails> <cabinClassDetails> <classDesignator>J</classDesignator> <numberOfSeats>70</numberOfSeats> </cabinClassDetails> <cabinClassDetails> <classDesignator>M</classDesignator> <numberOfSeats>145</numberOfSeats> </cabinClassDetails> </equipmentInfo> </boardPointAndOffPointDetails> <boardPointAndOffPointDetails> <generalFlightInfo> <flightDate> <departureDate>251014</departureDate> <departureTime>0500</departureTime> <arrivalDate>251014</arrivalDate> <arrivalTime>0400</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>NAN</trueLocationId> </boardPointDetails> <offPointDetails> <trueLocationId>NAN</trueLocationId> </offPointDetails> </generalFlightInfo> <additionalProductDetails> <legDetails> <equipment>772</equipment> <duration>0400</duration> </legDetails> <facilitiesInformation> <description>0100</description> </facilitiesInformation> </additionalProductDetails> <productInfo> <bookingClassDetails> <designator>F</designator> </bookingClassDetails> <bookingClassDetails> <designator>A</designator> </bookingClassDetails> <bookingClassDetails> <designator>Z</designator> </bookingClassDetails> <bookingClassDetails> <designator>J</designator> </bookingClassDetails> <bookingClassDetails> <designator>D</designator> </bookingClassDetails> <bookingClassDetails> <designator>I</designator> </bookingClassDetails> <bookingClassDetails> <designator>U</designator> </bookingClassDetails> <bookingClassDetails> <designator>Y</designator> </bookingClassDetails> <bookingClassDetails> <designator>B</designator> </bookingClassDetails> <bookingClassDetails> <designator>H</designator> </bookingClassDetails> <bookingClassDetails> <designator>K</designator> </bookingClassDetails> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> <bookingClassDetails> <designator>L</designator> </bookingClassDetails> <bookingClassDetails> <designator>V</designator> </bookingClassDetails> <bookingClassDetails> <designator>N</designator> </bookingClassDetails> <bookingClassDetails> <designator>O</designator> </bookingClassDetails> <bookingClassDetails> <designator>Q</designator> </bookingClassDetails> <bookingClassDetails> <designator>S</designator> </bookingClassDetails> <bookingClassDetails> <designator>G</designator> </bookingClassDetails> <bookingClassDetails> <designator>X</designator> </bookingClassDetails> <bookingClassDetails> <designator>E</designator> </bookingClassDetails> </productInfo> </boardPointAndOffPointDetails> <boardPointAndOffPointDetails> <generalFlightInfo> <flightDate> <departureDate>251014</departureDate> <departureTime>0900</departureTime> <arrivalDate>251014</arrivalDate> <arrivalTime>0800</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>SYD</trueLocationId> </boardPointDetails> <offPointDetails> <trueLocationId>SYD</trueLocationId> </offPointDetails> </generalFlightInfo> <additionalProductDetails> <legDetails> <equipment>772</equipment> <duration>0600</duration> </legDetails> <facilitiesInformation> <description>0100</description> </facilitiesInformation> </additionalProductDetails> <productInfo> <bookingClassDetails> <designator>F</designator> </bookingClassDetails> <bookingClassDetails> <designator>A</designator> </bookingClassDetails> <bookingClassDetails> <designator>Z</designator> </bookingClassDetails> <bookingClassDetails> <designator>J</designator> </bookingClassDetails> <bookingClassDetails> <designator>D</designator> </bookingClassDetails> <bookingClassDetails> <designator>I</designator> </bookingClassDetails> <bookingClassDetails> <designator>U</designator> </bookingClassDetails> <bookingClassDetails> <designator>Y</designator> </bookingClassDetails> <bookingClassDetails> <designator>B</designator> </bookingClassDetails> <bookingClassDetails> <designator>H</designator> </bookingClassDetails> <bookingClassDetails> <designator>K</designator> </bookingClassDetails> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> <bookingClassDetails> <designator>L</designator> </bookingClassDetails> <bookingClassDetails> <designator>V</designator> </bookingClassDetails> <bookingClassDetails> <designator>N</designator> </bookingClassDetails> <bookingClassDetails> <designator>O</designator> </bookingClassDetails> <bookingClassDetails> <designator>Q</designator> </bookingClassDetails> <bookingClassDetails> <designator>S</designator> </bookingClassDetails> <bookingClassDetails> <designator>G</designator> </bookingClassDetails> <bookingClassDetails> <designator>X</designator> </bookingClassDetails> <bookingClassDetails> <designator>E</designator> </bookingClassDetails> </productInfo> </boardPointAndOffPointDetails> <boardPointAndOffPointDetails> <generalFlightInfo> <flightDate> <arrivalDate>251014</arrivalDate> <arrivalTime>1200</arrivalTime> </flightDate> <offPointDetails> <trueLocationId>HKG</trueLocationId> </offPointDetails> </generalFlightInfo> </boardPointAndOffPointDetails> </flightScheduleDetails> </Air\_FlightInfoReply>

## 5.5.3 Possible Errors

See "Error Messages" section

* * *

## 5.6 Operation: Request on a Marketing flight

Flight Information request on a marketing flight.

The Marketing flight does not have operational data, they are retrieved from the operating flight.

## 5.6.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_FlightInfo xmlns="http://xml.amadeus.com/FLIREQ\_07\_1\_1A"> <generalFlightInfo> <flightDate> <departureDate>281014</departureDate> </flightDate> <companyDetails> <marketingCompany>7X</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>388</flightNumber> </flightIdentification> </generalFlightInfo> </Air\_FlightInfo>

## 5.6.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_FlightInfoReply xmlns="http://xml.amadeus.com/FLIRES\_07\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <businessFunction>1</businessFunction> <messageFunction>82</messageFunction> <responsibleAgency>3</responsibleAgency> </messageFunctionDetails> </messageActionDetails> <flightScheduleDetails> <dummySegment></dummySegment> <generalFlightInfo> <flightDate> <departureDate>281014</departureDate> </flightDate> <boardPointDetails> <trueLocationId>LHR</trueLocationId> </boardPointDetails> <offPointDetails> <trueLocationId>MEL</trueLocationId> </offPointDetails> <companyDetails> <marketingCompany>7X</marketingCompany> </companyDetails> <productIdDetails> <flightNumber> 388</flightNumber> </productIdDetails> </generalFlightInfo> <additionalProductDetails> <legDetails> <numberOfStops>1</numberOfStops> <daysOfOperation>2</daysOfOperation> </legDetails> <facilitiesInformation> <description>2115</description> </facilitiesInformation> </additionalProductDetails> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>SIM</textSubjectQualifier> </freeTextQualification> <freeText>LHR SIN - COMMERCIAL DUPLICATE - OPERATED BY</freeText> </interactiveFreeText> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>SIM</textSubjectQualifier> </freeTextQualification> <freeText> AMADEUS SIX</freeText> </interactiveFreeText> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>SIM</textSubjectQualifier> </freeTextQualification> <freeText>SIN MEL - COMMERCIAL DUPLICATE - OPERATED BY</freeText> </interactiveFreeText> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>SIM</textSubjectQualifier> </freeTextQualification> <freeText> AMADEUS SIX</freeText> </interactiveFreeText> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>SIM</textSubjectQualifier> </freeTextQualification> <freeText>LHR MEL - OPERATIONAL LEG 6X 0017</freeText> </interactiveFreeText> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>SIM</textSubjectQualifier> </freeTextQualification> <freeText>LHR SIN - OPERATIONAL LEG 6X 0017</freeText> </interactiveFreeText> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>SIM</textSubjectQualifier> </freeTextQualification> <freeText>SIN MEL - OPERATIONAL LEG 6X 0017</freeText> </interactiveFreeText> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>SIM</textSubjectQualifier> </freeTextQualification> <freeText>ENTIRE FLT- ET/ ELECTRONIC TKT CANDIDATE</freeText> </interactiveFreeText> <boardPointAndOffPointDetails> <generalFlightInfo> <flightDate> <departureDate>281014</departureDate> <departureTime>2335</departureTime> </flightDate> <boardPointDetails> <trueLocationId>LHR</trueLocationId> </boardPointDetails> <companyDetails> <marketingCompany>7X</marketingCompany> <operatingCompany>6X</operatingCompany> </companyDetails> </generalFlightInfo> <additionalProductDetails> <legDetails> <equipment>744</equipment> <duration>1245</duration> </legDetails> </additionalProductDetails> <productInfo> <bookingClassDetails> <designator>F</designator> </bookingClassDetails> <bookingClassDetails> <designator>A</designator> </bookingClassDetails> <bookingClassDetails> <designator>Z</designator> </bookingClassDetails> <bookingClassDetails> <designator>P</designator> </bookingClassDetails> <bookingClassDetails> <designator>Y</designator> </bookingClassDetails> <bookingClassDetails> <designator>B</designator> </bookingClassDetails> <bookingClassDetails> <designator>H</designator> </bookingClassDetails> <bookingClassDetails> <designator>K</designator> </bookingClassDetails> <bookingClassDetails> <designator>L</designator> </bookingClassDetails> <bookingClassDetails> <designator>S</designator> </bookingClassDetails> <bookingClassDetails> <designator>V</designator> </bookingClassDetails> <bookingClassDetails> <designator>O</designator> </bookingClassDetails> <bookingClassDetails> <designator>Q</designator> </bookingClassDetails> <bookingClassDetails> <designator>N</designator> </bookingClassDetails> <bookingClassDetails> <designator>G</designator> </bookingClassDetails> <bookingClassDetails> <designator>T</designator> </bookingClassDetails> <bookingClassDetails> <designator>X</designator> </bookingClassDetails> <bookingClassDetails> <designator>E</designator> </bookingClassDetails> </productInfo> <equipmentInfo> <cabinClassDetails> <classDesignator>P</classDesignator> <numberOfSeats>999</numberOfSeats> </cabinClassDetails> <cabinClassDetails> <classDesignator>Y</classDesignator> <numberOfSeats>999</numberOfSeats> </cabinClassDetails> </equipmentInfo> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>4</textSubjectQualifier> </freeTextQualification> <freeText>ED 2350 ESTIMATED TIME OF DEPARTURE</freeText> </interactiveFreeText> </boardPointAndOffPointDetails> <boardPointAndOffPointDetails> <generalFlightInfo> <flightDate> <departureDate>291014</departureDate> <departureTime>2145</departureTime> <arrivalDate>291014</arrivalDate> <arrivalTime>2020</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>SIN</trueLocationId> </boardPointDetails> <offPointDetails> <trueLocationId>SIN</trueLocationId> </offPointDetails> <companyDetails> <marketingCompany>7X</marketingCompany> <operatingCompany>6X</operatingCompany> </companyDetails> </generalFlightInfo> <additionalProductDetails> <legDetails> <equipment>744</equipment> <duration>0705</duration> </legDetails> <facilitiesInformation> <description>0125</description> </facilitiesInformation> </additionalProductDetails> <productInfo> <bookingClassDetails> <designator>F</designator> <specialService>D</specialService> </bookingClassDetails> <bookingClassDetails> <designator>A</designator> <specialService>D</specialService> </bookingClassDetails> <bookingClassDetails> <designator>Z</designator> <specialService>D</specialService> </bookingClassDetails> <bookingClassDetails> <designator>P</designator> <specialService>D</specialService> </bookingClassDetails> <bookingClassDetails> <designator>Y</designator> <specialService>D</specialService> </bookingClassDetails> <bookingClassDetails> <designator>B</designator> <specialService>D</specialService> </bookingClassDetails> <bookingClassDetails> <designator>H</designator> <specialService>D</specialService> </bookingClassDetails> <bookingClassDetails> <designator>K</designator> <specialService>D</specialService> </bookingClassDetails> <bookingClassDetails> <designator>L</designator> <specialService>D</specialService> </bookingClassDetails> <bookingClassDetails> <designator>S</designator> <specialService>D</specialService> </bookingClassDetails> <bookingClassDetails> <designator>V</designator> <specialService>D</specialService> </bookingClassDetails> <bookingClassDetails> <designator>O</designator> <specialService>D</specialService> </bookingClassDetails> <bookingClassDetails> <designator>Q</designator> <specialService>D</specialService> </bookingClassDetails> <bookingClassDetails> <designator>N</designator> <specialService>D</specialService> </bookingClassDetails> <bookingClassDetails> <designator>G</designator> <specialService>D</specialService> </bookingClassDetails> <bookingClassDetails> <designator>T</designator> <specialService>D</specialService> </bookingClassDetails> <bookingClassDetails> <designator>X</designator> <specialService>D</specialService> </bookingClassDetails> <bookingClassDetails> <designator>E</designator> <specialService>D</specialService> </bookingClassDetails> </productInfo> </boardPointAndOffPointDetails> <boardPointAndOffPointDetails> <generalFlightInfo> <flightDate> <arrivalDate>301014</arrivalDate> <arrivalTime>0750</arrivalTime> </flightDate> <offPointDetails> <trueLocationId>MEL</trueLocationId> </offPointDetails> </generalFlightInfo> </boardPointAndOffPointDetails> </flightScheduleDetails> </Air\_FlightInfoReply>

## 5.6.3 Possible Errors

See "Error Messages" section.

* * *

## 5.7 Operation: Request Per Boardpoint

Flight information request per board point.

The Flight Information reply contains all the segments departing from this board point.

## 5.7.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_FlightInfo xmlns="http://xml.amadeus.com/FLIREQ\_07\_1\_1A"> <generalFlightInfo> <flightDate> <departureDate>241014</departureDate> </flightDate> <boardPointDetails> <trueLocationId>DOH</trueLocationId> </boardPointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>123</flightNumber> </flightIdentification> </generalFlightInfo> </Air\_FlightInfo>

## 5.7.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_FlightInfoReply xmlns="http://xml.amadeus.com/FLIRES\_07\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <businessFunction>1</businessFunction> <messageFunction>82</messageFunction> <responsibleAgency>3</responsibleAgency> </messageFunctionDetails> </messageActionDetails> <flightScheduleDetails> <dummySegment></dummySegment> <generalFlightInfo> <flightDate> <departureDate>241014</departureDate> </flightDate> <boardPointDetails> <trueLocationId>DOH</trueLocationId> </boardPointDetails> <offPointDetails> <trueLocationId>LHR</trueLocationId> </offPointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> </companyDetails> <productIdDetails> <flightNumber> 123</flightNumber> </productIdDetails> </generalFlightInfo> <additionalProductDetails> <legDetails> <numberOfStops>1</numberOfStops> <daysOfOperation>5</daysOfOperation> </legDetails> <facilitiesInformation> <description>0500</description> </facilitiesInformation> </additionalProductDetails> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>SIM</textSubjectQualifier> </freeTextQualification> <freeText>ENTIRE FLT- ET/ ELECTRONIC TKT CANDIDATE</freeText> </interactiveFreeText> <boardPointAndOffPointDetails> <generalFlightInfo> <flightDate> <departureDate>241014</departureDate> <departureTime>1500</departureTime> </flightDate> <boardPointDetails> <trueLocationId>DOH</trueLocationId> </boardPointDetails> </generalFlightInfo> <additionalProductDetails> <legDetails> <equipment>772</equipment> <duration>0100</duration> </legDetails> </additionalProductDetails> <productInfo> <bookingClassDetails> <designator>F</designator> </bookingClassDetails> <bookingClassDetails> <designator>A</designator> </bookingClassDetails> <bookingClassDetails> <designator>Z</designator> </bookingClassDetails> <bookingClassDetails> <designator>J</designator> </bookingClassDetails> <bookingClassDetails> <designator>D</designator> </bookingClassDetails> <bookingClassDetails> <designator>I</designator> </bookingClassDetails> <bookingClassDetails> <designator>U</designator> </bookingClassDetails> <bookingClassDetails> <designator>Y</designator> </bookingClassDetails> <bookingClassDetails> <designator>B</designator> </bookingClassDetails> <bookingClassDetails> <designator>H</designator> </bookingClassDetails> <bookingClassDetails> <designator>K</designator> </bookingClassDetails> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> <bookingClassDetails> <designator>L</designator> </bookingClassDetails> <bookingClassDetails> <designator>V</designator> </bookingClassDetails> <bookingClassDetails> <designator>N</designator> </bookingClassDetails> <bookingClassDetails> <designator>O</designator> </bookingClassDetails> <bookingClassDetails> <designator>Q</designator> </bookingClassDetails> <bookingClassDetails> <designator>S</designator> </bookingClassDetails> <bookingClassDetails> <designator>G</designator> </bookingClassDetails> <bookingClassDetails> <designator>X</designator> </bookingClassDetails> <bookingClassDetails> <designator>E</designator> </bookingClassDetails> </productInfo> <equipmentInfo> <cabinClassDetails> <classDesignator>F</classDesignator> <numberOfSeats>17</numberOfSeats> </cabinClassDetails> <cabinClassDetails> <classDesignator>J</classDesignator> <numberOfSeats>70</numberOfSeats> </cabinClassDetails> <cabinClassDetails> <classDesignator>M</classDesignator> <numberOfSeats>145</numberOfSeats> </cabinClassDetails> </equipmentInfo> </boardPointAndOffPointDetails> <boardPointAndOffPointDetails> <generalFlightInfo> <flightDate> <departureDate>241014</departureDate> <departureTime>1700</departureTime> <arrivalDate>241014</arrivalDate> <arrivalTime>1600</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>BAH</trueLocationId> </boardPointDetails> <offPointDetails> <trueLocationId>BAH</trueLocationId> </offPointDetails> </generalFlightInfo> <additionalProductDetails> <legDetails> <equipment>772</equipment> <duration>0300</duration> </legDetails> <facilitiesInformation> <description>0100</description> </facilitiesInformation> </additionalProductDetails> <productInfo> <bookingClassDetails> <designator>F</designator> </bookingClassDetails> <bookingClassDetails> <designator>A</designator> </bookingClassDetails> <bookingClassDetails> <designator>Z</designator> </bookingClassDetails> <bookingClassDetails> <designator>J</designator> </bookingClassDetails> <bookingClassDetails> <designator>D</designator> </bookingClassDetails> <bookingClassDetails> <designator>I</designator> </bookingClassDetails> <bookingClassDetails> <designator>U</designator> </bookingClassDetails> <bookingClassDetails> <designator>Y</designator> </bookingClassDetails> <bookingClassDetails> <designator>B</designator> </bookingClassDetails> <bookingClassDetails> <designator>H</designator> </bookingClassDetails> <bookingClassDetails> <designator>K</designator> </bookingClassDetails> <bookingClassDetails> <designator>M</designator> </bookingClassDetails> <bookingClassDetails> <designator>L</designator> </bookingClassDetails> <bookingClassDetails> <designator>V</designator> </bookingClassDetails> <bookingClassDetails> <designator>N</designator> </bookingClassDetails> <bookingClassDetails> <designator>O</designator> </bookingClassDetails> <bookingClassDetails> <designator>Q</designator> </bookingClassDetails> <bookingClassDetails> <designator>S</designator> </bookingClassDetails> <bookingClassDetails> <designator>G</designator> </bookingClassDetails> <bookingClassDetails> <designator>X</designator> </bookingClassDetails> <bookingClassDetails> <designator>E</designator> </bookingClassDetails> </productInfo> </boardPointAndOffPointDetails> <boardPointAndOffPointDetails> <generalFlightInfo> <flightDate> <arrivalDate>241014</arrivalDate> <arrivalTime>1800</arrivalTime> </flightDate> <offPointDetails> <trueLocationId>LHR</trueLocationId> </offPointDetails> </generalFlightInfo> </boardPointAndOffPointDetails> </flightScheduleDetails> </Air\_FlightInfoReply>

## 5.7.3 Possible Errors

See "Error Messages" section

* * *