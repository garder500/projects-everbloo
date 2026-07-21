---
url: "https://developers.amadeus.com/api-library/soap/functional-doc/6/doc-read/98302?serviceVersion=5.2"
download_url: "https://developers.amadeus.com/PAS-EAS/api/download/comp/4d4ad2cb456c02633f463a055ab70584/98302/UG_WBS_Air_SellFromRecommendation_ITAREQ_05.2_040/UG_WBS_Air_SellFromRecommendation_ITAREQ_05.2_040.html"
title: "UG_WBS_Air_SellFromRecommendation_ITAREQ_05.2_040"
source: "amadeus"
service_id: "6"
service_name: "Air_SellFromRecommendation"
version: "5.2"
document_id: "98302"
doc_version: "5.2"
doc_type: "User guide"
scraped_at: "2026-07-15T10:07:37.511Z"
---
# Function: SellFromRecommendation

## Overview

This function has been designed to sell a recommendation. An optional selling algorithm can be activated to overcome situations where a simple sell would normally be rejected by the airline.

This function has been designed to sell a recommendation. An optional selling algorithm, described below, can be activated to overcome situations where a simple sell would normally be rejected by the airline.

Each airline is polled at its highest level of access with Amadeus, i.e. Amadeus Access if it is implemented, else Direct Access if it is implemented, else Standard Access.

It is important to note that **itineraryDetails** in this function corresponds to the notion of Proposed Segment in the interface or ODI (Origin and Destination Information Record). This should not be confused with the notion of itinerary that refers to the whole journey.

For example a return flight would consist of two ODIs (Origin and destination information record) one for the outbound part of the journey and the other for the inbound.

### Sell Optimization Algorithm

This optional algorithm is available in 2 flavours, that differ in the handling of the reply when the journey cannot be sold confirmed:

**Flavour M1**

FOR ODI 1 to n  
STEP 1: Sell ODI with bundle long sell

-   If all segments are confirmed then go to the next ODI
-   Else
    -   If at least one segment is waitlisted: cancel all segments and go to Step 2
    -   Else If at least one segment unable to sell: go to STEP 3

STEP 2: Sell all segment of the ODI point to point

-   If all segments are confirmed then go to the next ODI
-   Else If at least one segment is waitlisted or unable to sell: **cancel all segments and Stop the Process**

STEP 3: Sell all segment of the ODI NOT ALREADY SOLD point to point

-   If all segments are confirmed then go to the next ODI
-   Else If at least one segment is waitlisted or unable to sell: **cancel all segments and Stop the Process**

**Flavour M2:**

FOR ODI 1 to n  
STEP 1: Sell ODI with bundle longsell

-   If all segments are confirmed then go to the next ODI
-   Else
    -   If at least one segment is waitlisted: cancel all segments and go to STEP 2
    -   Else If at least one segment unable to sell: go to STEP 3

STEP 2: Sell all segment of the ODI point to point

-   If all segments are confirmed then go to the next ODI
-   Else If at least one segment is waitlisted or unable to sell: **cancel unconfirmed segments and go the next ODI**

  
STEP 3: Sell all segment of the ODI NOT ALREADY SOLD point to point

-   If all segments are confirmed then go to the next ODI
-   Else If at least one segment is waitlisted or unable to sell: **cancel unconfirmed segments and go the next ODI**

## Supported Operations

There is currently only one operation supported by this function.

## Limitations

The details of the recommendation chosen must be provided by the user_._

_A maximum_ _of 9 segments can be requested in one ODI and only NN status code_ _i__s supported in the query._

## Unsupported Operations

Not applicable.

## Prerequisites

Not applicable

## Building A Query

A basic SellFromRecommendation is composed of the following:

**Mandatory Elements**

The /messageActionDetails /messageFunctionDetails /messageFunction must be set to 183. The first occurrence of /messageActionDetails /messageFunctionDetails /additionalMessageFunction must be set to M1 or M2 depending on the optimization algorithm flavour wanted. The /itineraryDetails are composed of:

-   originDestinationDetails: departure and arrival cities
-   /itineraryDetails /message /messageFunctionDetails /messageFunction set to 183 to invoke optimization algorithm.
-   A list of segmentInformation, composed of:
    -   travelProductInformation: marketing company, flight number, board and off airports, departure date, booking class
    -   relatedproductInformation: number of passengers requested, status code NN

**Optional Element**

In the originatorDetails the controlNumber can be given if the request is made on an existing PNR. The record locator can be provided, to allow a better tracking of the transaction.

## Receiving A Reply

For each query requested, either an error message or a valid response will be returned. The reply information will vary depending on the query information provided.

Basically the reply will copy the query structure, with the following extra piece of information:

If the booking is unsuccessful:

-   A single error segment at message level if at least one booking is unsuccessful (see Error Messages below).
-   A status code for each segment booked corresponding to its booking status:

OK

Sold

UNS

Unable to sell

WL

Wait listed

X

Cancelled after a successful sell

RQ

Sell was not even attempted

**Note**: These codes allow the user to check the application of the sell optimization algorithm, if activated. The optimization algorithm is described in the overview.

If the booking is successful

-   Additional schedule information for each segment booked: departure/arrival times, equipment code, day of operation, electronic ticketing information, departure and arrival terminals, etc.
-   A status code OK for each segment.

## Reply Structure

## XML Error Reply

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_SellFromRecommendationReply xmlns="http://xml.amadeus.com/ITARES\_05\_2\_IA"> <message> <messageFunctionDetails> <messageFunction>183</messageFunction> </messageFunctionDetails> </message> <errorAtMessageLevel> <errorSegment> <errorDetails> <errorCode>390</errorCode> <errorCategory>EC</errorCategory> </errorDetails> </errorSegment> </errorAtMessageLevel> <itineraryDetails> <originDestination> <origin>MSP</origin> <destination>MIA</destination> </originDestination> </itineraryDetails> </Air\_SellFromRecommendationReply> \-

## Error Messages

-   **288 - UNABLE TO SATISFY, NEED CONFIRMED FLIGHT STATUS**: The recommendation cannot be booked.
-   **390 - UNABLE TO REFORMAT**: Slice and Dice availability is a method to retrieve all availabilities that may be used in order to optimise the avaibility of an itinerary. When receiving the sell request, if some segments have S&D indicators, Central System will check if the airline is Slice and Dice eligible. This error occured if not.    

## Operation: Successful Sell From Recommendation

This example describes the booking request of a return trip NYC-LAX, requiring the sell using the optimization algorithm on both itineraries (ODIs). The successful reply is shown as follows:

## Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_SellFromRecommendation xmlns="http://xml.amadeus.com/ITAREQ\_05\_2\_IA"> <messageActionDetails> <messageFunctionDetails> <messageFunction>183</messageFunction> <additionalMessageFunction>M1</additionalMessageFunction> </messageFunctionDetails> </messageActionDetails> <itineraryDetails> <originDestinationDetails> <origin>NYC</origin> <destination>LAX</destination> </originDestinationDetails> <message> <messageFunctionDetails> <messageFunction>183</messageFunction> </messageFunctionDetails> </message> <segmentInformation> <travelProductInformation> <flightDate> <departureDate>250505</departureDate> </flightDate> <boardPointDetails> <trueLocationId>LGA</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>DEN</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>UA</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>401</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> </travelProductInformation> <relatedproductInformation> <quantity>2</quantity> <statusCode>NN</statusCode> </relatedproductInformation> </segmentInformation> <segmentInformation> <travelProductInformation> <flightDate> <departureDate>250505</departureDate> </flightDate> <boardPointDetails> <trueLocationId>DEN</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>LAX</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>UA</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>1187</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> </travelProductInformation> <relatedproductInformation> <quantity>2</quantity> <statusCode>NN</statusCode> </relatedproductInformation> </segmentInformation> </itineraryDetails> <itineraryDetails> <originDestinationDetails> <origin>LAX</origin> <destination>NYC</destination> </originDestinationDetails> <message> <messageFunctionDetails> <messageFunction>183</messageFunction> </messageFunctionDetails> </message> <segmentInformation> <travelProductInformation> <flightDate> <departureDate>270505</departureDate> </flightDate> <boardPointDetails> <trueLocationId>LAX</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>DEN</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>UA</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>506</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> </travelProductInformation> <relatedproductInformation> <quantity>2</quantity> <statusCode>NN</statusCode> </relatedproductInformation> </segmentInformation> <segmentInformation> <travelProductInformation> <flightDate> <departureDate>270505</departureDate> </flightDate> <boardPointDetails> <trueLocationId>DEN</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>LGA</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>UA</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>408</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> </travelProductInformation> <relatedproductInformation> <quantity>2</quantity> <statusCode>NN</statusCode> </relatedproductInformation> </segmentInformation> </itineraryDetails> </Air\_SellFromRecommendation>

## Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_SellFromRecommendationReply xmlns="http://xml.amadeus.com/ITARES\_05\_2\_IA"> <message> <messageFunctionDetails> <messageFunction>183</messageFunction> </messageFunctionDetails> </message> <itineraryDetails> <originDestination> <origin>NYC</origin> <destination>LAX</destination> </originDestination> <segmentInformation> <flightDetails> <flightDate> <departureDate>250505</departureDate> <departureTime>600</departureTime> <arrivalTime>810</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>LGA</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>DEN</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>UA</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>401</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> <flightTypeDetails> <flightIndicator>ET</flightIndicator> </flightTypeDetails> </flightDetails> <apdSegment> <legDetails> <equipment>320</equipment> </legDetails> <departureStationInfo> <terminal>M</terminal> </departureStationInfo> </apdSegment> <actionDetails> <quantity>2</quantity> <statusCode>OK</statusCode> </actionDetails> </segmentInformation> <segmentInformation> <flightDetails> <flightDate> <departureDate>250505</departureDate> <departureTime>847</departureTime> <arrivalTime>1005</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>DEN</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>LAX</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>UA</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>1187</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> <flightTypeDetails> <flightIndicator>ET</flightIndicator> </flightTypeDetails> </flightDetails> <apdSegment> <legDetails> <equipment>763</equipment> </legDetails> <departureStationInfo> <terminal>7</terminal> </departureStationInfo> </apdSegment> <actionDetails> <quantity>2</quantity> <statusCode>OK</statusCode> </actionDetails> </segmentInformation> </itineraryDetails> <itineraryDetails> <originDestination> <origin>LAX</origin> <destination>NYC</destination> </originDestination> <segmentInformation> <flightDetails> <flightDate> <departureDate>270505</departureDate> <departureTime>1415</departureTime> <arrivalTime>1730</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>LAX</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>DEN</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>UA</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>506</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> <flightTypeDetails> <flightIndicator>ET</flightIndicator> </flightTypeDetails> </flightDetails> <apdSegment> <legDetails> <equipment>752</equipment> </legDetails> <departureStationInfo> <terminal>7</terminal> </departureStationInfo> </apdSegment> <actionDetails> <quantity>2</quantity> <statusCode>OK</statusCode> </actionDetails> </segmentInformation> <segmentInformation> <flightDetails> <flightDate> <departureDate>270505</departureDate> <departureTime>1800</departureTime> <arrivalTime>2333</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>DEN</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>LGA</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>UA</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>408</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> <flightTypeDetails> <flightIndicator>ET</flightIndicator> </flightTypeDetails> </flightDetails> <apdSegment> <legDetails> <equipment>319</equipment> </legDetails> <departureStationInfo> <terminal>M</terminal> </departureStationInfo> </apdSegment> <actionDetails> <quantity>2</quantity> <statusCode>OK</statusCode> </actionDetails> </segmentInformation> </itineraryDetails> </Air\_SellFromRecommendationReply>

## Possible Errors

See "Error Messages" section.

## Operation: Unsuccessful Sell From Recommendation with M1 algorithm flavour - First case

The reply structure below shows that the return (ODI) part was not successfully booked:  
The first leg was refused both in the bundled sell and in the local sell; as a consequence, the full itinerary had to be cancelled, that is referred in the second leg status 'X' (successfully sold, than cancelled).

## Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_SellFromRecommendation xmlns="http://xml.amadeus.com/ITAREQ\_05\_2\_IA"> <messageActionDetails> <messageFunctionDetails> <messageFunction>183</messageFunction> <additionalMessageFunction>M1</additionalMessageFunction> </messageFunctionDetails> </messageActionDetails> <itineraryDetails> <originDestinationDetails> <origin>NYC</origin> <destination>LAX</destination> </originDestinationDetails> <message> <messageFunctionDetails> <messageFunction>183</messageFunction> </messageFunctionDetails> </message> <segmentInformation> <travelProductInformation> <flightDate> <departureDate>250505</departureDate> </flightDate> <boardPointDetails> <trueLocationId>LGA</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>DEN</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>UA</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>401</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> </travelProductInformation> <relatedproductInformation> <quantity>2</quantity> <statusCode>NN</statusCode> </relatedproductInformation> </segmentInformation> <segmentInformation> <travelProductInformation> <flightDate> <departureDate>250505</departureDate> </flightDate> <boardPointDetails> <trueLocationId>DEN</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>LAX</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>UA</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>1187</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> </travelProductInformation> <relatedproductInformation> <quantity>2</quantity> <statusCode>NN</statusCode> </relatedproductInformation> </segmentInformation> </itineraryDetails> <itineraryDetails> <originDestinationDetails> <origin>LAX</origin> <destination>NYC</destination> </originDestinationDetails> <message> <messageFunctionDetails> <messageFunction>183</messageFunction> </messageFunctionDetails> </message> <segmentInformation> <travelProductInformation> <flightDate> <departureDate>270505</departureDate> </flightDate> <boardPointDetails> <trueLocationId>LAX</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>DEN</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>UA</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>506</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> </travelProductInformation> <relatedproductInformation> <quantity>2</quantity> <statusCode>NN</statusCode> </relatedproductInformation> </segmentInformation> <segmentInformation> <travelProductInformation> <flightDate> <departureDate>270505</departureDate> </flightDate> <boardPointDetails> <trueLocationId>DEN</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>LGA</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>UA</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>408</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> </travelProductInformation> <relatedproductInformation> <quantity>2</quantity> <statusCode>NN</statusCode> </relatedproductInformation> </segmentInformation> </itineraryDetails> </Air\_SellFromRecommendation>

## Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_SellFromRecommendationReply xmlns="http://xml.amadeus.com/ITARES\_05\_2\_IA"> <message> <messageFunctionDetails> <messageFunction>183</messageFunction> </messageFunctionDetails> </message> <errorAtMessageLevel> <errorSegment> <errorDetails> <errorCode>288</errorCode> <errorCategory>EC</errorCategory> </errorDetails> </errorSegment> </errorAtMessageLevel> <itineraryDetails> <originDestination> <origin>NYC</origin> <destination>LAX</destination> </originDestination> <segmentInformation> <flightDetails> <flightDate> <departureDate>250505</departureDate> <departureTime>600</departureTime> <arrivalTime>810</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>LGA</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>DEN</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>UA</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>401</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> <flightTypeDetails> <flightIndicator>ET</flightIndicator> </flightTypeDetails> </flightDetails> <apdSegment> <legDetails> <equipment>320</equipment> </legDetails> <departureStationInfo> <terminal>M</terminal> </departureStationInfo> </apdSegment> <actionDetails> <quantity>2</quantity> <statusCode>OK</statusCode> </actionDetails> </segmentInformation> <segmentInformation> <flightDetails> <flightDate> <departureDate>250505</departureDate> <departureTime>847</departureTime> <arrivalTime>1005</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>DEN</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>LAX</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>UA</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>1187</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> <flightTypeDetails> <flightIndicator>ET</flightIndicator> </flightTypeDetails> </flightDetails> <apdSegment> <legDetails> <equipment>763</equipment> </legDetails> <departureStationInfo> <terminal>7</terminal> </departureStationInfo> </apdSegment> <actionDetails> <quantity>2</quantity> <statusCode>OK</statusCode> </actionDetails> </segmentInformation> </itineraryDetails> <itineraryDetails> <originDestination> <origin>LAX</origin> <destination>NYC</destination> </originDestination> <segmentInformation> <flightDetails> <flightDate> <departureDate>270505</departureDate> <departureTime>1415</departureTime> <arrivalTime>1730</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>LAX</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>DEN</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>UA</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>506</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> <flightTypeDetails> <flightIndicator>ET</flightIndicator> </flightTypeDetails> </flightDetails> <apdSegment> <legDetails> <equipment>752</equipment> </legDetails> <departureStationInfo> <terminal>7</terminal> </departureStationInfo> </apdSegment> <actionDetails> <quantity>2</quantity> <statusCode>UNS</statusCode> </actionDetails> </segmentInformation> <segmentInformation> <flightDetails> <flightDate> <departureDate>270505</departureDate> <departureTime>1800</departureTime> <arrivalTime>2333</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>DEN</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>LAX</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>UA</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>408</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> <flightTypeDetails> <flightIndicator>ET</flightIndicator> </flightTypeDetails> </flightDetails> <apdSegment> <legDetails> <equipment>319</equipment> </legDetails> <departureStationInfo> <terminal>M</terminal> </departureStationInfo> </apdSegment> <actionDetails> <quantity>2</quantity> <statusCode>X</statusCode> </actionDetails> </segmentInformation> </itineraryDetails> </Air\_SellFromRecommendationReply>

## Possible Errors

An ERC 288 is added at message level to warn the user that at least one itinerary (ODI) failed.

## Operation: Unsuccessful Sell From Recommendation with M1 algorithm flavour - Second Case

This example shows that the first leg of the going part was refused both in the bundled sell and in the local sell:  
As a consequence, the full itinerary (ODI) had to be cancelled, this is referred to in the second leg status 'X' (successfully sold, than cancelled). Also, the rest of the message processing is stopped, as can be seen in the status codes RQ of the return itinerary.

## Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_SellFromRecommendation xmlns="http://xml.amadeus.com/ITAREQ\_05\_2\_IA"> <messageActionDetails> <messageFunctionDetails> <messageFunction>183</messageFunction> <additionalMessageFunction>M1</additionalMessageFunction> </messageFunctionDetails> </messageActionDetails> <itineraryDetails> <originDestinationDetails> <origin>NYC</origin> <destination>LAX</destination> </originDestinationDetails> <message> <messageFunctionDetails> <messageFunction>183</messageFunction> </messageFunctionDetails> </message> <segmentInformation> <travelProductInformation> <flightDate> <departureDate>250505</departureDate> </flightDate> <boardPointDetails> <trueLocationId>LGA</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>DEN</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>UA</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>401</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> </travelProductInformation> <relatedproductInformation> <quantity>2</quantity> <statusCode>NN</statusCode> </relatedproductInformation> </segmentInformation> <segmentInformation> <travelProductInformation> <flightDate> <departureDate>250505</departureDate> </flightDate> <boardPointDetails> <trueLocationId>DEN</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>LAX</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>UA</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>1187</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> </travelProductInformation> <relatedproductInformation> <quantity>2</quantity> <statusCode>NN</statusCode> </relatedproductInformation> </segmentInformation> </itineraryDetails> <itineraryDetails> <originDestinationDetails> <origin>LAX</origin> <destination>NYC</destination> </originDestinationDetails> <message> <messageFunctionDetails> <messageFunction>183</messageFunction> </messageFunctionDetails> </message> <segmentInformation> <travelProductInformation> <flightDate> <departureDate>270505</departureDate> </flightDate> <boardPointDetails> <trueLocationId>LAX</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>DEN</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>UA</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>506</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> </travelProductInformation> <relatedproductInformation> <quantity>2</quantity> <statusCode>NN</statusCode> </relatedproductInformation> </segmentInformation> <segmentInformation> <travelProductInformation> <flightDate> <departureDate>270505</departureDate> </flightDate> <boardPointDetails> <trueLocationId>DEN</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>LGA</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>UA</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>408</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> </travelProductInformation> <relatedproductInformation> <quantity>2</quantity> <statusCode>NN</statusCode> </relatedproductInformation> </segmentInformation> </itineraryDetails> </Air\_SellFromRecommendation>

## Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_SellFromRecommendationReply xmlns="http://xml.amadeus.com/ITARES\_05\_2\_IA"> <message> <messageFunctionDetails> <messageFunction>183</messageFunction> </messageFunctionDetails> </message> <errorAtMessageLevel> <errorSegment> <errorDetails> <errorCode>288</errorCode> <errorCategory>EC</errorCategory> </errorDetails> </errorSegment> </errorAtMessageLevel> <itineraryDetails> <originDestination> <origin>NYC</origin> <destination>LAX</destination> </originDestination> <segmentInformation> <flightDetails> <flightDate> <departureDate>250505</departureDate> </flightDate> <boardPointDetails> <trueLocationId>LGA</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>DEN</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>UA</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>401</flightNumber> <bookingClass>X</bookingClass> </flightIdentification> </flightDetails> <actionDetails> <quantity>2</quantity> <statusCode>UNS</statusCode> </actionDetails> </segmentInformation> <segmentInformation> <flightDetails> <flightDate> <departureDate>250505</departureDate> <departureTime>847</departureTime> <arrivalTime>1005</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>DEN</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>LAX</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>UA</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>1187</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> <flightTypeDetails> <flightIndicator>ET</flightIndicator> </flightTypeDetails> </flightDetails> <apdSegment> <legDetails> <equipment>763</equipment> </legDetails> <departureStationInfo> <terminal>7</terminal> </departureStationInfo> </apdSegment> <actionDetails> <quantity>2</quantity> <statusCode>X</statusCode> </actionDetails> </segmentInformation> </itineraryDetails> <itineraryDetails> <originDestination> <origin>LAX</origin> <destination>NYC</destination> </originDestination> <segmentInformation> <flightDetails> <flightDate> <departureDate>270505</departureDate> </flightDate> <boardPointDetails> <trueLocationId>LAX</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>DEN</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>UA</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>506</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> </flightDetails> <actionDetails> <quantity>2</quantity> <statusCode>RQ</statusCode> </actionDetails> </segmentInformation> <segmentInformation> <flightDetails> <flightDate> <departureDate>270505</departureDate> </flightDate> <boardPointDetails> <trueLocationId>DEN</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>LAX</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>UA</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>408</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> </flightDetails> <actionDetails> <quantity>2</quantity> <statusCode>RQ</statusCode> </actionDetails> </segmentInformation> </itineraryDetails> </Air\_SellFromRecommendationReply>

## Possible Errors

An ERC 288 is added at message level to warn the user that at least one itinerary (ODI) failed.

## Operation: Unsuccessful Sell From Recommendation with M2 algorithm flavour - First case

The reply structure below shows that the return (ODI) part was not successfully booked: The first leg was refused both in the bundled sell and in the local sell; the itinerary is returned partially sold.

## Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_SellFromRecommendation xmlns="http://xml.amadeus.com/ITAREQ\_05\_2\_IA"> <messageActionDetails> <messageFunctionDetails> <messageFunction>183</messageFunction> <additionalMessageFunction>M2</additionalMessageFunction> </messageFunctionDetails> </messageActionDetails> <itineraryDetails> <originDestinationDetails> <origin>NYC</origin> <destination>LAX</destination> </originDestinationDetails> <message> <messageFunctionDetails> <messageFunction>183</messageFunction> </messageFunctionDetails> </message> <segmentInformation> <travelProductInformation> <flightDate> <departureDate>250505</departureDate> </flightDate> <boardPointDetails> <trueLocationId>LGA</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>DEN</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>UA</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>401</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> </travelProductInformation> <relatedproductInformation> <quantity>2</quantity> <statusCode>NN</statusCode> </relatedproductInformation> </segmentInformation> <segmentInformation> <travelProductInformation> <flightDate> <departureDate>250505</departureDate> </flightDate> <boardPointDetails> <trueLocationId>DEN</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>LAX</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>UA</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>1187</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> </travelProductInformation> <relatedproductInformation> <quantity>2</quantity> <statusCode>NN</statusCode> </relatedproductInformation> </segmentInformation> </itineraryDetails> <itineraryDetails> <originDestinationDetails> <origin>LAX</origin> <destination>NYC</destination> </originDestinationDetails> <message> <messageFunctionDetails> <messageFunction>183</messageFunction> </messageFunctionDetails> </message> <segmentInformation> <travelProductInformation> <flightDate> <departureDate>270505</departureDate> </flightDate> <boardPointDetails> <trueLocationId>LAX</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>DEN</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>UA</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>506</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> </travelProductInformation> <relatedproductInformation> <quantity>2</quantity> <statusCode>NN</statusCode> </relatedproductInformation> </segmentInformation> <segmentInformation> <travelProductInformation> <flightDate> <departureDate>270505</departureDate> </flightDate> <boardPointDetails> <trueLocationId>DEN</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>LGA</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>UA</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>408</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> </travelProductInformation> <relatedproductInformation> <quantity>2</quantity> <statusCode>NN</statusCode> </relatedproductInformation> </segmentInformation> </itineraryDetails> </Air\_SellFromRecommendation>

## Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_SellFromRecommendationReply xmlns="http://xml.amadeus.com/ITARES\_05\_2\_IA"> <message> <messageFunctionDetails> <messageFunction>183</messageFunction> </messageFunctionDetails> </message> <errorAtMessageLevel> <errorSegment> <errorDetails> <errorCode>288</errorCode> <errorCategory>EC</errorCategory> </errorDetails> </errorSegment> </errorAtMessageLevel> <itineraryDetails> <originDestination> <origin>NYC</origin> <destination>LAX</destination> </originDestination> <segmentInformation> <flightDetails> <flightDate> <departureDate>250505</departureDate> <departureTime>600</departureTime> <arrivalTime>810</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>LGA</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>DEN</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>UA</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>401</flightNumber> <bookingClass>X</bookingClass> </flightIdentification> <flightTypeDetails> <flightIndicator>ET</flightIndicator> </flightTypeDetails> </flightDetails> <apdSegment> <legDetails> <equipment>320</equipment> </legDetails> <departureStationInfo> <terminal>M</terminal> </departureStationInfo> </apdSegment> <actionDetails> <quantity>2</quantity> <statusCode>OK</statusCode> </actionDetails> </segmentInformation> <segmentInformation> <flightDetails> <flightDate> <departureDate>250505</departureDate> <departureTime>847</departureTime> <arrivalTime>1005</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>DEN</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>LAX</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>UA</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>1187</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> <flightTypeDetails> <flightIndicator>ET</flightIndicator> </flightTypeDetails> </flightDetails> <apdSegment> <legDetails> <equipment>763</equipment> </legDetails> <departureStationInfo> <terminal>7</terminal> </departureStationInfo> </apdSegment> <actionDetails> <quantity>2</quantity> <statusCode>OK</statusCode> </actionDetails> </segmentInformation> </itineraryDetails> <itineraryDetails> <originDestination> <origin>LAX</origin> <destination>NYC</destination> </originDestination> <segmentInformation> <flightDetails> <flightDate> <departureDate>270505</departureDate> <departureTime>1415</departureTime> <arrivalTime>1730</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>LAX</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>DEN</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>UA</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>506</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> <flightTypeDetails> <flightIndicator>ET</flightIndicator> </flightTypeDetails> </flightDetails> <apdSegment> <legDetails> <equipment>752</equipment> </legDetails> <departureStationInfo> <terminal>7</terminal> </departureStationInfo> </apdSegment> <actionDetails> <quantity>2</quantity> <statusCode>UNS</statusCode> </actionDetails> </segmentInformation> <segmentInformation> <flightDetails> <flightDate> <departureDate>270505</departureDate> <departureTime>1800</departureTime> <arrivalTime>2333</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>DEN</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>LGA</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>UA</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>408</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> <flightTypeDetails> <flightIndicator>ET</flightIndicator> </flightTypeDetails> </flightDetails> <apdSegment> <legDetails> <equipment>319</equipment> </legDetails> <departureStationInfo> <terminal>M</terminal> </departureStationInfo> </apdSegment> <actionDetails> <quantity>2</quantity> <statusCode>OK</statusCode> </actionDetails> </segmentInformation> </itineraryDetails> </Air\_SellFromRecommendationReply>

## Possible Errors

An ERC 288 is added at message level to warn the user that at least one itinerary (ODI) failed.

## Operation: Unsuccessful Sell From Recommendation with M2 algorithm flavour - Second Case

This example shows that the first leg of the going part was refused both in the bundled sell and in the local sell: The sell of the return part was performed anyhow, successfully.

## Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_SellFromRecommendation xmlns="http://xml.amadeus.com/ITAREQ\_05\_2\_IA"> <messageActionDetails> <messageFunctionDetails> <messageFunction>183</messageFunction> <additionalMessageFunction>M2</additionalMessageFunction> </messageFunctionDetails> </messageActionDetails> <itineraryDetails> <originDestinationDetails> <origin>NYC</origin> <destination>LAX</destination> </originDestinationDetails> <message> <messageFunctionDetails> <messageFunction>183</messageFunction> </messageFunctionDetails> </message> <segmentInformation> <travelProductInformation> <flightDate> <departureDate>250505</departureDate> </flightDate> <boardPointDetails> <trueLocationId>LGA</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>DEN</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>UA</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>401</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> </travelProductInformation> <relatedproductInformation> <quantity>2</quantity> <statusCode>NN</statusCode> </relatedproductInformation> </segmentInformation> <segmentInformation> <travelProductInformation> <flightDate> <departureDate>250505</departureDate> </flightDate> <boardPointDetails> <trueLocationId>DEN</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>LAX</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>UA</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>1187</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> </travelProductInformation> <relatedproductInformation> <quantity>2</quantity> <statusCode>NN</statusCode> </relatedproductInformation> </segmentInformation> </itineraryDetails> <itineraryDetails> <originDestinationDetails> <origin>LAX</origin> <destination>NYC</destination> </originDestinationDetails> <message> <messageFunctionDetails> <messageFunction>183</messageFunction> </messageFunctionDetails> </message> <segmentInformation> <travelProductInformation> <flightDate> <departureDate>270505</departureDate> </flightDate> <boardPointDetails> <trueLocationId>LAX</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>DEN</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>UA</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>506</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> </travelProductInformation> <relatedproductInformation> <quantity>2</quantity> <statusCode>NN</statusCode> </relatedproductInformation> </segmentInformation> <segmentInformation> <travelProductInformation> <flightDate> <departureDate>270505</departureDate> </flightDate> <boardPointDetails> <trueLocationId>DEN</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>LGA</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>UA</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>408</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> </travelProductInformation> <relatedproductInformation> <quantity>2</quantity> <statusCode>NN</statusCode> </relatedproductInformation> </segmentInformation> </itineraryDetails> </Air\_SellFromRecommendation>

## Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_SellFromRecommendationReply xmlns="http://xml.amadeus.com/ITARES\_05\_2\_IA"> <message> <messageFunctionDetails> <messageFunction>183</messageFunction> </messageFunctionDetails> </message> <errorAtMessageLevel> <errorSegment> <errorDetails> <errorCode>288</errorCode> <errorCategory>EC</errorCategory> </errorDetails> </errorSegment> </errorAtMessageLevel> <itineraryDetails> <originDestination> <origin>NYC</origin> <destination>LAX</destination> </originDestination> <segmentInformation> <flightDetails> <flightDate> <departureDate>250505</departureDate> </flightDate> <boardPointDetails> <trueLocationId>LGA</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>DEN</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>UA</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>401</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> </flightDetails> <actionDetails> <quantity>2</quantity> <statusCode>UNS</statusCode> </actionDetails> </segmentInformation> <segmentInformation> <flightDetails> <flightDate> <departureDate>250505</departureDate> <departureTime>847</departureTime> <arrivalTime>1005</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>DEN</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>LAX</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>UA</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>1187</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> <flightTypeDetails> <flightIndicator>ET</flightIndicator> </flightTypeDetails> </flightDetails> <apdSegment> <legDetails> <equipment>763</equipment> </legDetails> <departureStationInfo> <terminal>7</terminal> </departureStationInfo> </apdSegment> <actionDetails> <quantity>2</quantity> <statusCode>OK</statusCode> </actionDetails> </segmentInformation> </itineraryDetails> <itineraryDetails> <originDestination> <origin>LAX</origin> <destination>NYC</destination> </originDestination> <segmentInformation> <flightDetails> <flightDate> <departureDate>270505</departureDate> </flightDate> <boardPointDetails> <trueLocationId>LAX</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>DEN</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>UA</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>506</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> </flightDetails> <actionDetails> <quantity>2</quantity> <statusCode>OK</statusCode> </actionDetails> </segmentInformation> <segmentInformation> <flightDetails> <flightDate> <departureDate>270505</departureDate> </flightDate> <boardPointDetails> <trueLocationId>DEN</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>LGA</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>UA</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>408</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> <flightTypeDetails> <flightIndicator>ET</flightIndicator> </flightTypeDetails> </flightDetails> <actionDetails> <quantity>2</quantity> <statusCode>OK</statusCode> </actionDetails> </segmentInformation> </itineraryDetails> </Air\_SellFromRecommendationReply>

## Possible Errors

An ERC 288 is added at message level to warn the user that at least one itinerary (ODI) failed