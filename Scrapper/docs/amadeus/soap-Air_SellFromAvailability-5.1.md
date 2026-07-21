---
url: "https://developers.amadeus.com/api-library/soap/functional-doc/5/doc-read/98296?serviceVersion=5.1"
download_url: "https://developers.amadeus.com/PAS-EAS/api/download/comp/4d4ad2cb456c02633f463a055ab70584/98296/UG_WBS_Air_SellFromAvailability_ITAREQ_05.1_058/UG_WBS_Air_SellFromAvailability_ITAREQ_05.1_058.html"
title: "UG_WBS_Air_SellFromAvailability_ITAREQ_05.1_058"
source: "amadeus"
service_id: "5"
service_name: "Air_SellFromAvailability"
version: "5.1"
document_id: "98296"
doc_version: "5.1"
doc_type: "User guide"
file_format: "HTML"
scraped_at: "2026-07-15T10:18:13.694Z"
---
# Function: SellFromAvailability

## Overview

The SellFromAvailability function enables users to request the booking of a flight availability previously retrieved using the MultiAvailability function. When using this function the user selects the recommendation(s) to be added to the active PNR. When successful, the selected recommendation(s) is booked and both PNR and inventory are updated.

The SellFromAvailability function enables users to request the booking of a flight availability previously retrieved using the MultiAvailability function.

## Supported Operations

**Sell from Amadeus Availability**  
This function enables to book air segment(s) by refering to a flight availability previously retrieved using MultiAvailability function.

**Dual Sell from Amadeus Availability**  
In this advanced usage it is possible to sell multiple recommended flight availability.

Moreover, the behavior of the function depends on the options used to retrieve the flight availability:

**Sell from Negotiated Space Availability**  
A successful MultiAvailability function with nego option is required prior to this transaction.  
  
**Sell from Direct Access Availability**  
A successful MultiAvailability function with direct access option is required prior to this transaction.  
  
**Sell from Redemption Availability**  
A successful MultiAvailability function with redemption option is required prior to this transaction.

## Limitations

Not applicable

## Unsupported Operations

Not applicable

## Prerequisites

Before selling, the fonction get multi availability has been made and the list of flights returned is stored in an Amadeus context. In other words, an Availability context was requested and successfully stored.

## Building A Query

The query could contain only a reference to the flight availability. But, for flexibility purpose, the itinerary of the selected flight availability is expected.  
  
**Message element**  
Set the /message/messageFunctionDetails/messageFunction element to 60.

Elements

Value

/message/messageFunctionDetails/messageFunction

60

  
**Origin element**  
to give details on the originator of the request.  
  
**Reservation Control Information**  
Record Locator or Agent Identifier, 7 characters max.  
  
**Itnerary details**  
This element contains the passenger's origin and destination (originDestinationDetails) of the journey followed by the detailed information (segmentInformation) on each segment being part of the flight itineray.  
  
The itinerary details element is repeatable in case of dual sell.  
  
**Origin and Destination details**  
This group describes passenger's origin and destination of the journey.

Elements /itineraryDetails/originDestinationDetails

Comment

/origin

Airport/city code of origin

/destination

Airport/city code of destination

  
**Travel product information**  
This group of data enables to specify the class of service on the given availability flight.

Elements of /itineraryDetails/segmentInformation

Comment

/travelProductInformation/flightDate

Date of departure

/travelProductInformation/boardPointDetails

Place/location identification

/travelProductInformation/offpointDetails

Place/location identification

/travelProductInformation/companyDetails

Airline code

/travelProductInformation/flightIdentification

Flight Number and Class of Service

/travelProductInformation/itemNumber

Flight availability reference

  
At travel product information level, the following data are mandatory:  
\- the flight number and the class of service,  
\- the flight availabity line number,  
  
**Related Product Information**  
This group of mandatory data contains the number of seats requested (number in party) and action code.

Elements of /itineraryDetails/segmentInformation

Comment

/relatedproductInformation/Quantity

Number of passengers

/relatedproductInformation/statusCode

ActionCode

  
Then 2 optional group of data can be specified:  
\- the **Reservation Contol Information** to specify a reference to a reservation using Record Locator for passive and informational.  
\- the **Reference Information** to provide specific reference identification for a traveller.

## Receiving A Reply

For each query requested, either an error message or a valid response will be returned. The reply information will vary depending on the query information provided.  
  
**Message element**  
The message element gives details on the message type and business function.  
  
**Error at Message Level**  
If at least one booking is unsuccessful, the errorAtMessageLevel element contains explanations on the not booked segment. (see Error Messages below).  
  
**Itnerary details**  
If the booking is successful, the itineraryDetails element contains additional schedule information for each segment booked: departure/arrival times, equipment code, day of operation, electronic ticketing information, departure and arrival terminals, etc.  
  
If the booking is unsuccessful the itineraryDetails element contains status code for each segment.

## Reply Structure

To be Defined

## XML Error Reply

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

\-

## Error Messages

The common errors messages are:

Number

Message

Description

00001

INVALID EDIFACT FORMAT

Syntax Error

00042

CHECK LINE NUMBER

The given flight availability number does not exist in the list of recommendations

00006

CHECK ACTION CODE

The action code doesn?t exist.

00021

CHECK CLASS OF SERVICE

The given booking class is not available at least.

00025

CHECK NUMBER IN PARTY

The requested number of seats is not between allowed values: 1-9 for individual PNR.

00054

MESSAGE TOO LONG

\-

03325

INVALID ACTION CODE FOR XX

The airline XX is not expecting the given action code.

03171

CHECK AGES

When requesting space for unaccompanied minor is over upper age limit set by the airline.

04725

INVALID PASSENGER ASSOCIATION

The given passenger segment associations are in breach of the active PNR.

01903

CHECK PASSENGER ASSOCIATION

03350

RESTRICTED/NAME ELEMENT PREVIOUSLY CANCELLED

06271

RESTRICTED ENTRY - PNR RETRIEVED IN READ MODE

The active PNR cann?t be modified.

07622

RESTRICTED DURING PNR CLAIM MODE - FINISH OR IGNORE

There is a Claim action in progress. It fortunately forbids concurrent changes on the active PNR.

09548

RESTRICTED - TOUR SEGMENT PRESENT IN PNR

\-

04419

RESTRICTED FOR TR AGENT

According to the settings, TR agent is not allowed to perform this booking.

03394

RESTRICTED ACTION CODE

The requested action code is not authorised in the given context.

04362

SEGMENT SELLS RESTRICTED

Default error for any restrictions raised on the air segment(s).

00020

RESTRICTED

Default error for any other restriction issues.

00011

UNABLE TO PROCESS

An internal error occurred. Please re-try

## Operation: Connection flights

PoweredAir\_MultiAvailability has to be requested prior to PoweredAir\_SellFromAvailability Same reference (itemNumber) for both segments

## Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_SellFromAvailability xmlns="http://xml.amadeus.com/ITAREQ\_05\_1\_IA"> <itineraryDetails> <originDestinationDetails> <origin>NCE</origin> <destination>JFK</destination> </originDestinationDetails> <segmentInformation> <travelProductInformation> <flightDate> <departureDate>150505</departureDate> </flightDate> <boardPointDetails> <trueLocationId>NCE</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>CDG</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>DL</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>83</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> <itemNumber>22</itemNumber> </travelProductInformation> <relatedproductInformation> <quantity>2</quantity> <statusCode>NN</statusCode> </relatedproductInformation> </segmentInformation> <segmentInformation> <travelProductInformation> <flightDate> <departureDate>150505</departureDate> </flightDate> <boardPointDetails> <trueLocationId>CDG</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>JFK</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>DL</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>119</flightNumber> <bookingClass>E</bookingClass> </flightIdentification> <itemNumber>22</itemNumber> </travelProductInformation> <relatedproductInformation> <quantity>2</quantity> <statusCode>NN</statusCode> </relatedproductInformation> </segmentInformation> </itineraryDetails> </Air\_SellFromAvailability>

## Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## Possible Errors

## Operation: Direct Access

PoweredAir\_MultiAvailability has to be requested prior to PoweredAir\_SellFromAvailability with following option: DIRBE

## Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_SellFromAvailability xmlns="http://xml.amadeus.com/ITAREQ\_05\_1\_IA"> <itineraryDetails> <originDestinationDetails> <origin>EXT</origin> <destination>BHD</destination> </originDestinationDetails> <segmentInformation> <travelProductInformation> <flightDate> <departureDate>240605</departureDate> </flightDate> <boardPointDetails> <trueLocationId>EXT</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>BHD</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>BE</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>496</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> <itemNumber>21</itemNumber> </travelProductInformation> <relatedproductInformation> <quantity>2</quantity> <statusCode>NN</statusCode> </relatedproductInformation> </segmentInformation> </itineraryDetails> </Air\_SellFromAvailability>

## Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## Possible Errors

## Operation: Nego Space: Sell from Negociated Space Availability AT

A PoweredAir\_MultiAvailability has to be requested prior to PoweredAir\_SellFromAvailability with following option: TT

## Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_SellFromAvailability xmlns="http://xml.amadeus.com/ITAREQ\_05\_1\_IA"> <itineraryDetails> <originDestinationDetails> <origin>FRA</origin> <destination>NRT</destination> </originDestinationDetails> <segmentInformation> <travelProductInformation> <flightDate> <departureDate>180505</departureDate> </flightDate> <boardPointDetails> <trueLocationId>FRA</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>NRT</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>LH</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>710</flightNumber> <bookingClass>F</bookingClass> </flightIdentification> <itemNumber>1</itemNumber> </travelProductInformation> <relatedproductInformation> <quantity>1</quantity> <statusCode>NN</statusCode> </relatedproductInformation> </segmentInformation> </itineraryDetails> </Air\_SellFromAvailability>

## Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## Possible Errors

## Operation: Redemption

PoweredAir\_MultiAvailability has to be requested prior to PoweredAir\_SellFromAvailability with following option: REDRE

## Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_SellFromAvailability xmlns="http://xml.amadeus.com/ITAREQ\_05\_1\_IA"> <itineraryDetails> <originDestinationDetails> <origin>LHR</origin> <destination>BCN</destination> </originDestinationDetails> <segmentInformation> <travelProductInformation> <flightDate> <departureDate>170805</departureDate> </flightDate> <boardPointDetails> <trueLocationId>LHR</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>BCN</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>IB</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>4183</flightNumber> <bookingClass>X</bookingClass> </flightIdentification> <itemNumber>1</itemNumber> </travelProductInformation> <relatedproductInformation> <quantity>1</quantity> <statusCode>NN</statusCode> </relatedproductInformation> </segmentInformation> </itineraryDetails> </Air\_SellFromAvailability>

## Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## Possible Errors

## Operation: Sell from Multi Availability

A PoweredAir\_MultiAvailability has to be requested prior to PoweredAir\_SellFromAvailability

## Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Air\_SellFromAvailability xmlns="http://xml.amadeus.com/ITAREQ\_05\_1\_IA"> <itineraryDetails> <originDestinationDetails> <origin>NCE</origin> <destination>ORY</destination> </originDestinationDetails> <segmentInformation> <travelProductInformation> <flightDate> <departureDate>150505</departureDate> </flightDate> <boardPointDetails> <trueLocationId>NCE</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>ORY</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>AF</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>6203</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> <itemNumber>1</itemNumber> </travelProductInformation> <relatedproductInformation> <quantity>2</quantity> <statusCode>NN</statusCode> </relatedproductInformation> </segmentInformation> </itineraryDetails> </Air\_SellFromAvailability>

## Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## Possible Errors