---
url: "https://developers.amadeus.com/api-library/soap/functional-doc/3/doc-read/134985?serviceVersion=20.1"
download_url: "https://developers.amadeus.com/PAS-EAS/api/download/comp/4d4ad2cb456c02633f463a055ab70584/134985/UG_WBS_Air_RebookAirSegment_ARBKUQ_20.1_009.html"
title: "HTML_UG_WBS_Air_RebookAirSegment_ARBKUQ_20.1_009"
source: "amadeus"
service_id: "3"
service_name: "Air_RebookAirSegment"
version: "20.1"
document_id: "134985"
doc_version: "20.1"
doc_type: "User guide"
scraped_at: "2026-07-15T10:06:46.018Z"
---
# Function: Air\_RebookAirSegment

* * *

## 1 Overview

This function enables to rebook existing segments in a PNR. It is possible to make changes to both new and retrieved PNRs but not to group PNRs with more than 9 seats. It is not possible to rebook open segments, information segments, non-participating carrier segments or passive segments.

### Rebook Types

**Full Marriage Rebook**

Full marriage rebook is a rebook of the entire marriage to a new class or a new date. The correspondent cryptic entry is:

-   SBY : to rebook to class Y
-   SB12MAR: to rebook to the March, 12th. In this case, the cancelled segment is ALWAYS followed by the segment to be sold.

**Multiple Rebook**

Multiple rebook is when 1 or several segments are rebooked to 1 or several OTHER flights. In this case, all the cancelled segments must be sent together followed by the segments that have to be sold.

**Targeting Specific Segment Rebook**

Sometimes, there is an ambiguity in specifying a segment in the PNR. This can arise when there are two identical segments. If you want to perform a rebook in this case, the first occurance of the segment is the one automatically selected. If a specific segment needs to be selected, the tattoo number of the segment to target must be explicited.

**Classes Rebook following a PricePNRWithLowerFares**

To have the best chances a rebook following a PricePNRWithLowerFares function is successful, users are requested to enter an additional input with the standard rebook parameters: the reference number of the recommendation selected. This number corresponds to the field **uniqueReference** in the **pricingInformation** part of the recommendation chosen for the rebook. This parameter must not be used outside of this scenario.

  

  

**Force Rebook  
**

Entering specific FB or FG action codes allows to request a Force Rebook on Individual or Group PNRs. Usual Force Rebook security checks are then applied in the process. Response to a Force Rebook request is the new segment in confirmed status.

## 1.1 Supported Operations

This function can be used to change:

-   A class of service in one or several segments
-   A date in one or several segments
-   A flight number in one or several segments
-   A combination of class, date, and flight number

## 1.2 Limitations

If segments to be rebooked are married, the airline must have SBF indicator set to Y in the APT table, in order for the rebook of a married segment to be accepted.

## 1.3 Unsupported Operations

None.

## 1.4 Prerequisites

The segments to be rebooked and the PNR must exist.

## 2 Building A Query

The user creates the rebook query by indicating previous flight information, with status code OX for cancellation, and the new flight information, with status code NN for a new book. Status codes FB or FG can be used in the new booking to perform a Force Rebook.

## 2.1 Sub Structure: New Flight Details

## 2.1.1 Description

The new flight information should contain at least:

-   Departure date
-   Board point
-   Flight carrier and number
-   Booking class
-   Number in party
-   Status code NN for the basic rebook request

## 2.1.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<itineraryInfo> <flightDetails> <flightDate> <departureDate>150315</departureDate> </flightDate> <boardPointDetails> <trueLocationId>FRA</trueLocationId> </boardPointDetails> <companyDetails> <marketingCompany>LH</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>744</flightNumber> <bookingClass>C</bookingClass> </flightIdentification> </flightDetails> <relatedFlightInfo> <quantity>1</quantity> <statusCode>NN</statusCode> </relatedFlightInfo> </itineraryInfo>

## 2.2 Sub Structure: Origin and Destination

## 2.2.1 Description

Origin and Destination of the flight are Mandatory information in the query.

## 2.2.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<originDestination> <origin>FRA</origin> <destination>BKK</destination> </originDestination>

## 2.3 Sub Structure: Previous Flight Details

## 2.3.1 Description

The previous flight information should contain at least:

-   Departure date
-   Board point
-   Flight carrier and number
-   Booking class
-   Number in party
-   Status code OX to request cancellation of previous flight

## 2.3.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<itineraryInfo> <flightDetails> <flightDate> <departureDate>090315</departureDate> </flightDate> <boardPointDetails> <trueLocationId>FRA</trueLocationId> </boardPointDetails> <companyDetails> <marketingCompany>LH</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>744</flightNumber> <bookingClass>F</bookingClass> </flightIdentification> </flightDetails> <relatedFlightInfo> <quantity>1</quantity> <statusCode>OX</statusCode> </relatedFlightInfo> </itineraryInfo>

## 2.4 Sub Structure: rebookOption

## 2.4.1 Description

Find below all the rebook options which can be used:

-   FXZ: Option used in case of segment rebook in a Best Pricer flow.
-   P99: Option used in case of segment rebook in a Frequent Flyer Redemption fow.
-   RWD: Option used in case of segment rebook in a Reward flow.

**optionInformation** field on the XML example bellow is useful only if you use **FXZ** option in order to provide the number of the selected recommendation, otherwise this field have to stay at 1.

## 2.4.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<rebookOption> <selectionDetails> <option>FXZ</option> <optionInformation>2</optionInformation> </selectionDetails> </rebookOption>

## 3 Receiving A Reply

The reply message contains the segments, with related details, marked with the new status codes or an Error message.

### Possible status codes

The status codes that can be found in the reply message are the following:

-   HK - Confirmed
-   HL - Waitlisted
-   HX - Cancelled
-   NN - Sell Segment
-   SS - Link down
-   UC - Sell refused
-   UN - Sell refused
-   UX - Cancel denied
-   XX - Cancel accepted

## 3.1 Sub Structure: New Segment Confirmed

## 3.1.1 Description

Previous flight gets confirmed (status code HK).

## 3.1.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<itineraryInfo> <flightDetails> <flightDate> <departureDate>150315</departureDate> <departureTime>2200</departureTime> <arrivalTime>1410</arrivalTime> <dateVariation>1</dateVariation> </flightDate> <boardPointDetails> <trueLocationId>FRA</trueLocationId> </boardPointDetails> <companyDetails> <marketingCompany>LH</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>744</flightNumber> <bookingClass>C</bookingClass> </flightIdentification> </flightDetails> <relatedFlightInfo> <quantity>1</quantity> <statusCode>HK</statusCode> </relatedFlightInfo> </itineraryInfo>

* * *

## 3.2 Sub Structure: Origin and Destination

## 3.2.1 Description

Reply message contains the Origin and Destination of the itinerary.

## 3.2.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<originDestination> <origin>FRA</origin> <destination>BKK</destination> </originDestination>

* * *

## 3.3 Sub Structure: Previous Segment Cancelled

## 3.3.1 Description

Previous flight gets cancelled (status code HX).

## 3.3.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<itineraryInfo> <flightDetails> <flightDate> <departureDate>150315</departureDate> <departureTime>2200</departureTime> <arrivalTime>1410</arrivalTime> <dateVariation>1</dateVariation> </flightDate> <boardPointDetails> <trueLocationId>FRA</trueLocationId> </boardPointDetails> <companyDetails> <marketingCompany>LH</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>744</flightNumber> <bookingClass>F</bookingClass> </flightIdentification> </flightDetails> <relatedFlightInfo> <quantity>1</quantity> <statusCode>HX</statusCode> </relatedFlightInfo> </itineraryInfo>

* * *

## 4 Error Messages

The error codes displayed in the EDIFACT message are IATA error codes with 3 digits max. If an internal canned error message is used with no equivalent to an IATA error code, EDIFACT message would have ZZZ instead of the error code.

Here below the list of Errors at Message level:

**CODE**

**ERROR MESSAGE**

**DESCRIPTION**

120

INVALID ACTION CODE

In case the action code cannot be used in a Rebook.

3675

ACTION CODE NOT COMBINABLE

In case the used action code is not combinable with previously used action codes.

3572

UNABLE TO CHANGE PAST SEGMENT

In case the date of the segment is in the past.

3394

NOT ALLOWED ON MARKETING FLIGHT

In case a Force Rebook is performed and rejected by codeshare agreement.

3325

INVALID ACTION CODE FOR XX

In case the action code is not defined for the airline XX.

3345

NUMBER OF SEGMENTS GIVEN EXCEED LIMIT

In case there are more than 47 segments.

28908

FUNCTIONALITY NOT DEFINED - CHECK BUSINESS RULE

In case Force Rebook is checked via ABR rules (Force Booking Control) and no rules are defined.

2662

CHECK ITINERARY/PASSENGER DATA

In case of non-homogeneous PNR and unaccompaigned minor (UMNR) PNR.

24304

NOT ALLOWED - REBOOK OF INACTIVE SEGMENT(S)

In case the segments are inactive.

23032

RESTRICTED - PAX(S) ACCEPTED OR BOARDED

In case the passenger is already accepted and/or boarded.

21801

RESTRICTED - PLEASE CONTACT AIRLINE HELPDESK

If segment is air marshal.

190

INVALID PROCESSING INDICATOR

In case the processing indicator is different from P.

145

NUMBER OF PASSENGERS EXCEEDS NINE

In case a Rebook is performed on segments with more than 9 passengers.

7970

NOT VALID FOR GROUP PNR

In case a Rebook is performed on Group PNR.

7440

SPLIT PNR - DIFFERENT BOOKING CODES REQUIRED FOR PASSENGERS

In case the new number in party is different from the old one.

7474

UNAUTHORIZED AGENT RIGHTS

In case of rejection due to Functional Access Control.

772

UNAUTHORISED FOR THIS AIRLINE

In case airline has APT indicator 5 (Sponsored Airline) set to Y.

4492

NOT AVAILABLE DUE TO TRAFFIC RESTRICTION

In case of traffic restrictions on the flight.

50

NO ITINERARY

In case there is no itinerary in the PNR.

570

SPECIFIED SEG NOT FLIGHT SEG

In case the segment is not a flight.

4916

UNABLE TO REPLICATE - PASSIVE SEGMENT

In case the segment is passive.

388

NOT ALLOWED : MARRIED SEGMENTS  

In case the segments are married.

4053

SEGMENT STATUS HAS BEEN CHANGED - END TRANSACTION FIRST  

In case the segment status was changed and no end-transaction was performed before the rebook.

4086

TIMES HAVE BEEN CHANGED - END TRANSACTION FIRST  

In case the segments time was changed and no end-transaction was performed before the rebook.

4148

UNABLE TO REPLICATE - OPEN SEGMENT  

In case the segment is open.

4149

UNABLE TO REPLICATE - INFORMATIONAL SEGMENT  

In case the segment is informational.

431

SEGMENT DOES NOT EXIST

In case the segment does not exist.

Here below the list of Errors at Segment level:

**CODE**

**ERROR MESSAGE**

**DESCRIPTION**

102

CHECK DATE

In case the specific date is in the past.

240

FLIGHT BOARDING

In case the flight is boarding.

23345

RESTRICTED-TICKETLESS ACCESS CARRIER-NO PNR CHANGE SUPPORTED

In case the carrier is ticketless and PNR change is not supported.

1716

FLIGHT/DATE/SEGMENT/CLASS UNAVAILABLE

In case there is no availability of the flight/date/segment/class.

21820

RESTRICTED - TICKETLESS ACCESS CARRIER - PLS REFER TO HETLA

In case of ticketless carrier in non-ticketless PNR or mix ticketless/non-ticketless.

130

INVALID ORIGIN AND DESTINATION PAIR

In case the flight does not operated on the specific Origin and Destination pair.

114

FLIGHT NOT FOUND

In case the flight does not exist.

119

SHUTTLE FLIGHT DOES NOT ALLOW RESERVATION

In case of shuttle flight.

15870

RESTRICTED - PAX(S) BOARDED OR CHECKED-BAGS

In case the pax is boarded and/or checked the bags.

411

FLIGHT DOES NOT OPERATE ON DATE REQUESTED

In case the flight does not operate on the specific date.

418

FLIGHT DEPARTED

In case the flight is departed.

421

REBOOK REJECTED: SEGMENT NOT AVAILABLE

In case the segment is not available.

## 4.1 Error Reply

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_RebookAirSegmentReply xmlns="http://xml.amadeus.com/ARBKUR\_20\_1\_1A"> <messageErrorInfo> <errorCoded> <errorDetails> <errorCode>ZZZ</errorCode> <errorCategory>EC</errorCategory> <errorCodeOwner>AMD</errorCodeOwner> </errorDetails> </errorCoded> <errorDescription> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <source>F</source> <encoding>2</encoding> </freeTextDetails> <freeText>UNABLE TO REPLICATE - INFORMATIONAL SEGMENT</freeText> </errorDescription> </messageErrorInfo> </Air\_RebookAirSegmentReply>

  

* * *

## 5 Operations

## 5.1 Operation: Class Rebook

This example is for the rebook of the second segment from F Class to C Class.  
PNR:

RP/MUC1A0701/MUC1A0701 BM/PR 5JAN04/1329Z YPPUGA

1.  API/TEST
2.  LH 744 F 08MAR 1 FRABKK HL1 2130 1 2200 1410+1 \*1A/E\*
3.  LX 182 J 09MAR 2 BKKSIN HK1 2 1530 1845 \*1A/E\*
4.  AP MUC - AMADEUS DEFAULT OFFICE - A
5.  TK OK05JAN/MUC1A0701

## 5.1.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_RebookAirSegment xmlns="http://xml.amadeus.com/ARBKUQ\_20\_1\_1A"> <originDestinationDetails> <originDestination> <origin>FRA</origin> <destination>BKK</destination> </originDestination> <itineraryInfo> <flightDetails> <flightDate> <departureDate>080304</departureDate> <departureTime>2200</departureTime> <arrivalDate>090304</arrivalDate> <arrivalTime>1410</arrivalTime> <dateVariation>1</dateVariation> </flightDate> <boardPointDetails> <trueLocationId>FRA</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>BKK</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>LH</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>744</flightNumber> <bookingClass>F</bookingClass> </flightIdentification> </flightDetails> <relatedFlightInfo> <quantity>1</quantity> <statusCode>OX</statusCode> </relatedFlightInfo> </itineraryInfo> <itineraryInfo> <flightDetails> <flightDate> <departureDate>080304</departureDate> <departureTime>2200</departureTime> <arrivalTime>1410</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>FRA</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>BKK</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>LH</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>744</flightNumber> <bookingClass>C</bookingClass> </flightIdentification> </flightDetails> <relatedFlightInfo> <quantity>1</quantity> <statusCode>NN</statusCode> </relatedFlightInfo> </itineraryInfo> </originDestinationDetails> </Air\_RebookAirSegment>

## 5.1.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_RebookAirSegmentReply xmlns="http://xml.amadeus.com/ARBKUR\_20\_1\_1A"> <originDestinationDetails> <originDestination> <origin>FRA</origin> <destination>BKK</destination> </originDestination> <itineraryInfo> <flightDetails> <flightDate> <departureDate>080304</departureDate> <departureTime>2200</departureTime> <arrivalTime>1410</arrivalTime> <dateVariation>1</dateVariation> </flightDate> <boardPointDetails> <trueLocationId>FRA</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>BKK</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>LH</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>744</flightNumber> <bookingClass>F</bookingClass> </flightIdentification> </flightDetails> <relatedFlightInfo> <quantity>1</quantity> <statusCode>HX</statusCode> </relatedFlightInfo> </itineraryInfo> <itineraryInfo> <flightDetails> <flightDate> <departureDate>080304</departureDate> <departureTime>2200</departureTime> <arrivalTime>1410</arrivalTime> <dateVariation>1</dateVariation> </flightDate> <boardPointDetails> <trueLocationId>FRA</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>BKK</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>LH</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>744</flightNumber> <bookingClass>C</bookingClass> </flightIdentification> </flightDetails> <relatedFlightInfo> <quantity>1</quantity> <statusCode>HK</statusCode> </relatedFlightInfo> </itineraryInfo> </originDestinationDetails> </Air\_RebookAirSegmentReply>

## 5.1.3 Possible Errors

See "Error Messages" section.

* * *

## 5.2 Operation: Class Rebook after pricing PNR with lower fare

This example is the same as the previous one, but in the case where rebook is performed following a PricePNRWithLowerFares request, and the reference of the recommendation selected by the user (number 2) is transmitted in the rebook in rebookOption field.

PNR:

RP/MUC1A0701/MUC1A0701 BM/PR 5JAN04/1329Z YPPUGA

1.  API/TEST
2.  LH 744 F 08MAR 1 FRABKK HL1 2130 1 2200 1410+1 \*1A/E\*
3.  LX 182 J 09MAR 2 BKKSIN HK1 2 1530 1845 \*1A/E\*
4.  AP MUC - AMADEUS DEFAULT OFFICE - A
5.  TK OK05JAN/MUC1A0701

## 5.2.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_RebookAirSegment xmlns="http://xml.amadeus.com/ARBKUQ\_20\_1\_1A"> <rebookOption> <selectionDetails> <option>FXZ</option> <optionInformation>2</optionInformation> </selectionDetails> </rebookOption> <originDestinationDetails> <originDestination> <origin>FRA</origin> <destination>BKK</destination> </originDestination> <itineraryInfo> <flightDetails> <flightDate> <departureDate>080304</departureDate> <departureTime>2200</departureTime> <arrivalDate>090304</arrivalDate> <arrivalTime>1410</arrivalTime> <dateVariation>1</dateVariation> </flightDate> <boardPointDetails> <trueLocationId>FRA</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>BKK</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>LH</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>744</flightNumber> <bookingClass>F</bookingClass> </flightIdentification> </flightDetails> <relatedFlightInfo> <quantity>01</quantity> <statusCode>OX</statusCode> </relatedFlightInfo> </itineraryInfo> <itineraryInfo> <flightDetails> <flightDate> <departureDate>080304</departureDate> <departureTime>2200</departureTime> <arrivalTime>1410</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>FRA</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>BKK</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>LH</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>744</flightNumber> <bookingClass>C</bookingClass> </flightIdentification> </flightDetails> <relatedFlightInfo> <quantity>01</quantity> <statusCode>NN</statusCode> </relatedFlightInfo> </itineraryInfo> </originDestinationDetails> </Air\_RebookAirSegment>

## 5.2.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_RebookAirSegmentReply xmlns="http://xml.amadeus.com/ARBKUR\_20\_1\_1A"> <originDestinationDetails> <originDestination> <origin>FRA</origin> <destination>BKK</destination> </originDestination> <itineraryInfo> <flightDetails> <flightDate> <departureDate>080304</departureDate> <departureTime>2200</departureTime> <arrivalTime>1410</arrivalTime> <dateVariation>1</dateVariation> </flightDate> <boardPointDetails> <trueLocationId>FRA</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>BKK</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>LH</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>744</flightNumber> <bookingClass>F</bookingClass> </flightIdentification> </flightDetails> <relatedFlightInfo> <quantity>1</quantity> <statusCode>HX</statusCode> </relatedFlightInfo> </itineraryInfo> <itineraryInfo> <flightDetails> <flightDate> <departureDate>080304</departureDate> <departureTime>2200</departureTime> <arrivalTime>1410</arrivalTime> <dateVariation>1</dateVariation> </flightDate> <boardPointDetails> <trueLocationId>FRA</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>BKK</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>LH</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>744</flightNumber> <bookingClass>C</bookingClass> </flightIdentification> </flightDetails> <relatedFlightInfo> <quantity>1</quantity> <statusCode>HK</statusCode> </relatedFlightInfo> </itineraryInfo> </originDestinationDetails> </Air\_RebookAirSegmentReply>

## 5.2.3 Possible Errors

See "Error Messages" section.

* * *

## 5.3 Operation: Force Rebook

This example is for the Force Rebook of the second segment from F Class to C Class.  
PNR:

RP/MUC1A0701/MUC1A0701 BM/PR 5JAN04/1329Z YPPUGA

1.  API/TEST
2.  LH 744 F 08MAR 1 FRABKK HL1 2130 1 2200 1410+1 \*1A/E\*
3.  LX 182 J 09MAR 2 BKKSIN HK1 2 1530 1845 \*1A/E\*
4.  AP MUC - AMADEUS DEFAULT OFFICE - A
5.  TK OK05JAN/MUC1A0701

## 5.3.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_RebookAirSegment xmlns="http://xml.amadeus.com/ARBKUQ\_20\_1\_1A"> <originDestinationDetails> <originDestination> <origin>FRA</origin> <destination>BKK</destination> </originDestination> <itineraryInfo> <flightDetails> <flightDate> <departureDate>080304</departureDate> <departureTime>2200</departureTime> <arrivalDate>090304</arrivalDate> <arrivalTime>1410</arrivalTime> <dateVariation>1</dateVariation> </flightDate> <boardPointDetails> <trueLocationId>FRA</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>BKK</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>LH</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>744</flightNumber> <bookingClass>F</bookingClass> </flightIdentification> </flightDetails> <relatedFlightInfo> <quantity>01</quantity> <statusCode>OX</statusCode> </relatedFlightInfo> </itineraryInfo> <itineraryInfo> <flightDetails> <flightDate> <departureDate>080304</departureDate> <departureTime>2200</departureTime> <arrivalTime>1410</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>FRA</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>BKK</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>LH</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>744</flightNumber> <bookingClass>C</bookingClass> </flightIdentification> </flightDetails> <relatedFlightInfo> <quantity>01</quantity> <statusCode>FB</statusCode> </relatedFlightInfo> </itineraryInfo> </originDestinationDetails> </Air\_RebookAirSegment>

## 5.3.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_RebookAirSegmentReply xmlns="http://xml.amadeus.com/ARBKUR\_20\_1\_1A"> <originDestinationDetails> <originDestination> <origin>FRA</origin> <destination>BKK</destination> </originDestination> <itineraryInfo> <flightDetails> <flightDate> <departureDate>080304</departureDate> <departureTime>2200</departureTime> <arrivalTime>1410</arrivalTime> <dateVariation>1</dateVariation> </flightDate> <boardPointDetails> <trueLocationId>FRA</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>BKK</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>LH</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>744</flightNumber> <bookingClass>F</bookingClass> </flightIdentification> </flightDetails> <relatedFlightInfo> <quantity>1</quantity> <statusCode>HX</statusCode> </relatedFlightInfo> </itineraryInfo> <itineraryInfo> <flightDetails> <flightDate> <departureDate>080304</departureDate> <departureTime>2200</departureTime> <arrivalTime>1410</arrivalTime> <dateVariation>1</dateVariation> </flightDate> <boardPointDetails> <trueLocationId>FRA</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>BKK</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>LH</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>744</flightNumber> <bookingClass>C</bookingClass> </flightIdentification> </flightDetails> <relatedFlightInfo> <quantity>1</quantity> <statusCode>HK</statusCode> </relatedFlightInfo> </itineraryInfo> </originDestinationDetails> </Air\_RebookAirSegmentReply>

## 5.3.3 Possible Errors

See "Error Messages" section.

* * *

## 5.4 Operation: Rebook Flight Number

Rebook flight LH 778 to flight LH 9762.  
PNR:

RP/MUC1A0701/MUC1A0701 BM/PR 5JAN04/1336Z YPPUGN

1.  API/TEST
2.  LH 778 F 08MAR 1 FRASIN HK1 2140 1 2210 1650+1 \*1A/E\*
3.  AP MUC - AMADEUS DEFAULT OFFICE - A
4.  TK OK05JAN/MUC1A0701

## 5.4.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_RebookAirSegment xmlns="http://xml.amadeus.com/ARBKUQ\_20\_1\_1A"> <originDestinationDetails> <originDestination> <origin>FRA</origin> <destination>SIN</destination> </originDestination> <itineraryInfo> <flightDetails> <flightDate> <departureDate>080304</departureDate> <departureTime>2210</departureTime> <arrivalDate>090304</arrivalDate> <arrivalTime>1650</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>FRA</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>SIN</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>LH</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>778</flightNumber> <bookingClass>F</bookingClass> </flightIdentification> </flightDetails> <relatedFlightInfo> <quantity>01</quantity> <statusCode>OX</statusCode> </relatedFlightInfo> </itineraryInfo> <itineraryInfo> <flightDetails> <flightDate> <departureDate>080304</departureDate> <departureTime>1200</departureTime> <arrivalDate>090304</arrivalDate> <arrivalTime>0655</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>FRA</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>SIN</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>LH</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>9762</flightNumber> <bookingClass>F</bookingClass> </flightIdentification> </flightDetails> <relatedFlightInfo> <quantity>01</quantity> <statusCode>NN</statusCode> </relatedFlightInfo> </itineraryInfo> </originDestinationDetails> </Air\_RebookAirSegment>

## 5.4.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_RebookAirSegmentReply xmlns="http://xml.amadeus.com/ARBKUR\_20\_1\_1A"> <originDestinationDetails> <originDestination> <origin>FRA</origin> <destination>SIN</destination> </originDestination> <itineraryInfo> <flightDetails> <flightDate> <departureDate>080304</departureDate> <departureTime>2210</departureTime> <arrivalTime>1650</arrivalTime> <dateVariation>1</dateVariation> </flightDate> <boardPointDetails> <trueLocationId>FRA</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>SIN</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>LH</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>778</flightNumber> <bookingClass>F</bookingClass> </flightIdentification> </flightDetails> <relatedFlightInfo> <quantity>1</quantity> <statusCode>HX</statusCode> </relatedFlightInfo> </itineraryInfo> <itineraryInfo> <flightDetails> <flightDate> <departureDate>080304</departureDate> <departureTime>1200</departureTime> <arrivalTime>0655</arrivalTime> <dateVariation>1</dateVariation> </flightDate> <boardPointDetails> <trueLocationId>FRA</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>SIN</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>LH</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>9762</flightNumber> <bookingClass>F</bookingClass> </flightIdentification> </flightDetails> <relatedFlightInfo> <quantity>1</quantity> <statusCode>HK</statusCode> </relatedFlightInfo> </itineraryInfo> </originDestinationDetails> </Air\_RebookAirSegmentReply>

## 5.4.3 Possible Errors

See "Error Messages" section.

* * *

## 5.5 Operation: Rebook Segment Date

Rebook the second segment from 8/03 to 9/03.  
PNR:

RP/MUC1A0701/MUC1A0701 BM/PR 5JAN04/1336Z YPPUGN

1.  API/TEST
2.  LH 778 F 08MAR 1 FRASIN HK1 2140 1 2210 1650+1 \*1A/E\*
3.  AP MUC - AMADEUS DEFAULT OFFICE - A
4.  TK OK05JAN/MUC1A0701

## 5.5.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_RebookAirSegment xmlns="http://xml.amadeus.com/ARBKUQ\_20\_1\_1A"> <originDestinationDetails> <originDestination> <origin>FRA</origin> <destination>SIN</destination> </originDestination> <itineraryInfo> <flightDetails> <flightDate> <departureDate>080304</departureDate> <departureTime>2210</departureTime> <arrivalDate>090304</arrivalDate> <arrivalTime>1650</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>FRA</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>SIN</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>LH</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>778</flightNumber> <bookingClass>F</bookingClass> </flightIdentification> </flightDetails> <relatedFlightInfo> <quantity>01</quantity> <statusCode>OX</statusCode> </relatedFlightInfo> </itineraryInfo> <itineraryInfo> <flightDetails> <flightDate> <departureDate>090304</departureDate> <departureTime>2210</departureTime> <arrivalDate>100304</arrivalDate> <arrivalTime>1650</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>FRA</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>SIN</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>LH</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>778</flightNumber> <bookingClass>F</bookingClass> </flightIdentification> </flightDetails> <relatedFlightInfo> <quantity>01</quantity> <statusCode>NN</statusCode> </relatedFlightInfo> </itineraryInfo> </originDestinationDetails> </Air\_RebookAirSegment>

## 5.5.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_RebookAirSegmentReply xmlns="http://xml.amadeus.com/ARBKUR\_20\_1\_1A"> <originDestinationDetails> <originDestination> <origin>FRA</origin> <destination>BKK</destination> </originDestination> <itineraryInfo> <flightDetails> <flightDate> <departureDate>080304</departureDate> <departureTime>2200</departureTime> <arrivalTime>1410</arrivalTime> <dateVariation>1</dateVariation> </flightDate> <boardPointDetails> <trueLocationId>FRA</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>BKK</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>LH</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>744</flightNumber> <bookingClass>F</bookingClass> </flightIdentification> </flightDetails> <relatedFlightInfo> <quantity>1</quantity> <statusCode>HX</statusCode> </relatedFlightInfo> </itineraryInfo> <itineraryInfo> <flightDetails> <flightDate> <departureDate>090304</departureDate> <departureTime>2200</departureTime> <arrivalTime>1410</arrivalTime> <dateVariation>1</dateVariation> </flightDate> <boardPointDetails> <trueLocationId>FRA</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>BKK</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>LH</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>744</flightNumber> <bookingClass>F</bookingClass> </flightIdentification> </flightDetails> <relatedFlightInfo> <quantity>1</quantity> <statusCode>HK</statusCode> </relatedFlightInfo> </itineraryInfo> </originDestinationDetails> </Air\_RebookAirSegmentReply>

## 5.5.3 Possible Errors

See "Error Messages" section.

* * *

## 5.6 Operation: Rebook Two Segment Classes

This example shows the rebook of:

-   LH 744 from class F to class C
-   LX 182 from class J to class C

PNR:

RP/MUC1A0701/MUC1A0701 BM/PR 5JAN04/1331Z YPPUGE

1.  API/TEST
2.  LH 744 F 08MAR 1 FRABKK HL1 2130 1 2200 1410+1 \*1A/E\*
3.  LX 182 J 09MAR 2 BKKSIN HK1 2 1530 1845 \*1A/E\*
4.  AP MUC - AMADEUS DEFAULT OFFICE - A
5.  TK OK05JAN/MUC1A0701

## 5.6.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_RebookAirSegment xmlns="http://xml.amadeus.com/ARBKUQ\_20\_1\_1A"> <originDestinationDetails> <originDestination> <origin>FRA</origin> <destination>BKK</destination> </originDestination> <itineraryInfo> <flightDetails> <flightDate> <departureDate>080304</departureDate> <departureTime>2200</departureTime> <arrivalDate>090304</arrivalDate> <arrivalTime>1410</arrivalTime> <dateVariation>1</dateVariation> </flightDate> <boardPointDetails> <trueLocationId>FRA</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>BKK</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>LH</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>744</flightNumber> <bookingClass>F</bookingClass> </flightIdentification> </flightDetails> <relatedFlightInfo> <quantity>01</quantity> <statusCode>OX</statusCode> </relatedFlightInfo> </itineraryInfo> <itineraryInfo> <flightDetails> <flightDate> <departureDate>080304</departureDate> <departureTime>2200</departureTime> <arrivalDate>090304</arrivalDate> <arrivalTime>1410</arrivalTime> <dateVariation>1</dateVariation> </flightDate> <boardPointDetails> <trueLocationId>FRA</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>BKK</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>LH</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>744</flightNumber> <bookingClass>C</bookingClass> </flightIdentification> </flightDetails> <relatedFlightInfo> <quantity>01</quantity> <statusCode>NN</statusCode> </relatedFlightInfo> </itineraryInfo> </originDestinationDetails> <originDestinationDetails> <originDestination> <origin>BKK</origin> <destination>SIN</destination> </originDestination> <itineraryInfo> <flightDetails> <flightDate> <departureDate>090304</departureDate> <departureTime>1530</departureTime> <arrivalDate>090304</arrivalDate> <arrivalTime>1845</arrivalTime> <dateVariation>0</dateVariation> </flightDate> <boardPointDetails> <trueLocationId>BKK</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>SIN</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>LX</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>182</flightNumber> <bookingClass>J</bookingClass> </flightIdentification> </flightDetails> <relatedFlightInfo> <quantity>01</quantity> <statusCode>OX</statusCode> </relatedFlightInfo> </itineraryInfo> <itineraryInfo> <flightDetails> <flightDate> <departureDate>090304</departureDate> <departureTime>1530</departureTime> <arrivalDate>090304</arrivalDate> <arrivalTime>1845</arrivalTime> <dateVariation>0</dateVariation> </flightDate> <boardPointDetails> <trueLocationId>BKK</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>SIN</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>LX</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>182</flightNumber> <bookingClass>C</bookingClass> </flightIdentification> </flightDetails> <relatedFlightInfo> <quantity>01</quantity> <statusCode>NN</statusCode> </relatedFlightInfo> </itineraryInfo> </originDestinationDetails> </Air\_RebookAirSegment>

## 5.6.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_RebookAirSegmentReply xmlns="http://xml.amadeus.com/ARBKUR\_20\_1\_1A"> <originDestinationDetails> <originDestination> <origin>FRA</origin> <destination>BKK</destination> </originDestination> <itineraryInfo> <flightDetails> <flightDate> <departureDate>080304</departureDate> <departureTime>2200</departureTime> <arrivalTime>1410</arrivalTime> <dateVariation>1</dateVariation> </flightDate> <boardPointDetails> <trueLocationId>FRA</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>BKK</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>LH</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>744</flightNumber> <bookingClass>F</bookingClass> </flightIdentification> </flightDetails> <relatedFlightInfo> <quantity>1</quantity> <statusCode>HX</statusCode> </relatedFlightInfo> </itineraryInfo> <itineraryInfo> <flightDetails> <flightDate> <departureDate>080304</departureDate> <departureTime>2200</departureTime> <arrivalTime>1410</arrivalTime> <dateVariation>1</dateVariation> </flightDate> <boardPointDetails> <trueLocationId>FRA</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>BKK</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>LH</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>744</flightNumber> <bookingClass>C</bookingClass> </flightIdentification> </flightDetails> <relatedFlightInfo> <quantity>1</quantity> <statusCode>HK</statusCode> </relatedFlightInfo> </itineraryInfo> </originDestinationDetails> <originDestinationDetails> <originDestination> <origin>BKK</origin> <destination>SIN</destination> </originDestination> <itineraryInfo> <flightDetails> <flightDate> <departureDate>090304</departureDate> <departureTime>1530</departureTime> <arrivalDate>090304</arrivalDate> <arrivalTime>1845</arrivalTime> <dateVariation>0</dateVariation> </flightDate> <boardPointDetails> <trueLocationId>BKK</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>SIN</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>LX</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>182</flightNumber> <bookingClass>J</bookingClass> </flightIdentification> </flightDetails> <relatedFlightInfo> <quantity>01</quantity> <statusCode>HX</statusCode> </relatedFlightInfo> </itineraryInfo> <itineraryInfo> <flightDetails> <flightDate> <departureDate>090304</departureDate> <departureTime>1530</departureTime> <arrivalDate>090304</arrivalDate> <arrivalTime>1845</arrivalTime> <dateVariation>0</dateVariation> </flightDate> <boardPointDetails> <trueLocationId>BKK</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>SIN</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>LX</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>182</flightNumber> <bookingClass>C</bookingClass> </flightIdentification> </flightDetails> <relatedFlightInfo> <quantity>01</quantity> <statusCode>HK</statusCode> </relatedFlightInfo> </itineraryInfo> </originDestinationDetails> </Air\_RebookAirSegmentReply>

## 5.6.3 Possible Errors

See "Error Messages" section.

* * *