---
url: "https://developers.amadeus.com/api-library/soap/functional-doc/123/doc-read/109953?serviceVersion=14.1"
download_url: "https://developers.amadeus.com/PAS-EAS/api/download/comp/4d4ad2cb456c02633f463a055ab70584/109953/UG_WBS_PNR_RetrieveByRecLoc_PRETRQ_14.1_003/UG_WBS_PNR_RetrieveByRecLoc_PRETRQ_14.1_003.html"
title: "UG_WBS_PNR_RetrieveByRecLoc_PRETRQ_14.1_003"
source: "amadeus"
service_id: "123"
service_name: "PNR_RetrieveByRecLoc"
version: "14.1"
document_id: "109953"
doc_version: "14.1"
doc_type: "User guide"
file_format: "HTML"
scraped_at: "2026-07-15T10:37:28.464Z"
---
# Function: PNR\_RetrieveByRecLoc

* * *

## 1 Overview

The retrieve function is used to retrieve and provide a structured representation of an active passenger name record (PNR).The record locator of the PNR is used to do the retrieve.

## 1.1 Supported Operations

Retrieve by Record Locator

Each PNR created and stored in the Amadeus system has a recordlocator which can be used to retrieve its associated data.

## 1.2 Limitations

There are security check applyied to the retrieve.

System User Airlines and User Airline Help Desks

These users may retrieve the following:

-   Any PNR containing at least one active or inactive segment operated by the airline.
-   Any PNR for which the airline has responsibility, regardless of whose air segments are included.
-   Any PNR that the airline can access by agreement with the responsible office.
-   Any PNR by record locator and surname.
-   Any PNR by the date of any segment in the PNR.

Travel Agencies

All agencies have the ability to retrieve any PNRs for which they are responsible for.

In addition, any bookings made by another office for which they have an end of sale agreement with may be retrieved provided that the office is properly identified within the system security profile of the agency requesting the retrieval.

Service Providers

Any PNR containing an auxiliary segment that includes the provider's two-character identification code can be retrieved.

Wholesalers

A wholesaler representing other service providers can retrieve any PNRs that include active segments belonging to the companies that they represent.

Amadeus Participating Carriers

Any PNR containing an active segment belonging to the airline can be retrieved.

Amadeus Help Desk

All PNRs residing in the Amadeus system can be retrieved.

National Marketing Company Help Desks

All PNRs residing in the Amadeus system, except those belonging to System User Airlines can be retrieved.

Prepaid Ticket Advice Retrievals

The following can only retrieve all PNRs containing prepaid ticket advice information:

-   The selling office.
-   The ticketing office.
-   An Airport ticket office/city ticket office attached to the same airline as the selling or ticketing office.
-   The travel agency or one of its associated offices, which created the prepaid record.

## 1.3 Unsupported Operations

The following operations are not available from within this function:

-   Partial PNR element retrievals.
-   All retrievals without record locators.

## 1.4 Prerequisites

Prior to using the function operations, it is necessary to have stored records in the system.

## 2 Building A Query

It is important to note that the examples in each chapter are only illustrations and are meant to provide the basis for a better understanding on which fields are mandatory for basic operation utilisation. It is not a full explanation of every field that can be utilised for the operation, but rather a guideline to its use. The detailed explanation of every field can be found in the Technical Reference guide.

## 3 Receiving A Reply

The reply to a retrieve by record locator can be either a structured PNR representation or an error message (see the Errors Messages Section).

A successful retrieval of a record will return a structured representation of the PNR.

## 4 Error Messages

Message

Description

31 - Finish or ignore

There is a modified PNR present

284 - Secured PNR

The user has not the rights to retrieve the PNR

1929 - Invalid record locator

The record locator is not Amadeus compliant

1931 - No match for rec loc

The record locator does not correspond to an active PNR

3992 - Locked flight/PNR

There is an emergency lock applying to the PNR

119 - Unable to retrieve PNR

The PNR is corrupted on the database

  

* * *

## 5 Operations

## 5.1 Operation: Retrieve PNR

This example shows the retrieval of PNR with the record locator, 2XKY4N.

## 5.1.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_RetrieveByRecLoc xmlns="http://xml.amadeus.com/PRETRQ\_14\_1\_1A"> <sbrRecLoc> <reservation> <controlNumber>2XKY4N</controlNumber> </reservation> </sbrRecLoc> </PNR\_RetrieveByRecLoc>

## 5.1.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_RetrieveByRecLocReply xmlns="http://xml.amadeus.com/PRETRR\_14\_1\_1A"> <pnrHeader> <reservationInfo> <reservation> <companyId>1A</companyId> <controlNumber>2XKY4N</controlNumber> <date>220709</date> <time>1233</time> </reservation> </reservationInfo> </pnrHeader> <securityInformation> <responsibilityInformation> <typeOfPnrElement>RP</typeOfPnrElement> <agentId>BMPR</agentId> <officeId>MUC1A0701</officeId> </responsibilityInformation> <queueingInformation> <queueingOfficeId>MUC1A0701</queueingOfficeId> </queueingInformation> <cityCode>DAP</cityCode> <secondRpInformation> <creationOfficeId>MUC1A0701</creationOfficeId> <agentSignature>9999BM</agentSignature> <creationDate>140709</creationDate> <creationTime>0305</creationTime> </secondRpInformation> </securityInformation> <freetextData> <freetextDetail> <subjectQualifier>3</subjectQualifier> <type>P12</type> </freetextDetail> <longFreetext>--- RLR ---</longFreetext> </freetextData> <sbrPOSDetails> <sbrUserIdentificationOwn> <originIdentification> <originatorId>23498915</originatorId> <inHouseIdentification1>MUC1A0701</inHouseIdentification1> </originIdentification> </sbrUserIdentificationOwn> <sbrSystemDetails> <deliveringSystem> <companyId>LH</companyId> <locationId>MUC</locationId> </deliveringSystem> </sbrSystemDetails> </sbrPOSDetails> <sbrCreationPosDetails> <sbrUserIdentificationOwn> <originIdentification> <inHouseIdentification1>uid1</inHouseIdentification1> </originIdentification> </sbrUserIdentificationOwn> </sbrCreationPosDetails> <sbrUpdatorPosDetails> <sbrUserIdentificationOwn> <originIdentification> <inHouseIdentification1>uid2</inHouseIdentification1> </originIdentification> </sbrUserIdentificationOwn> </sbrUpdatorPosDetails> <technicalData> <enveloppeNumberData> <sequenceDetails> <number>5</number> </sequenceDetails> </enveloppeNumberData> <lastTransmittedEnvelopeNumber> <currentRecord>4</currentRecord> </lastTransmittedEnvelopeNumber> <purgeDateData> <dateTime> <year>2009</year> <month>12</month> <day>20</day> </dateTime> </purgeDateData> </technicalData> <travellerInfo> <elementManagementPassenger> <reference> <qualifier>PT</qualifier> <number>3</number> </reference> <segmentName>NM</segmentName> <lineNumber>1</lineNumber> </elementManagementPassenger> <passengerData> <travellerInformation> <traveller> <surname>AA</surname> <quantity>1</quantity> </traveller> <passenger> <firstName>A</firstName> </passenger> </travellerInformation> </passengerData> <enhancedPassengerData> <enhancedTravellerInformation> <travellerNameInfo> <quantity>1</quantity> </travellerNameInfo> <otherPaxNamesDetails> <nameType>UN</nameType> <referenceName>Y</referenceName> <displayedName>Y</displayedName> <surname>AA</surname> <givenName>A</givenName> </otherPaxNamesDetails> </enhancedTravellerInformation> </enhancedPassengerData> </travellerInfo> <travellerInfo> <elementManagementPassenger> <reference> <qualifier>PT</qualifier> <number>4</number> </reference> <segmentName>NM</segmentName> <lineNumber>2</lineNumber> </elementManagementPassenger> <passengerData> <travellerInformation> <traveller> <surname>BB</surname> <quantity>1</quantity> </traveller> <passenger> <firstName>B</firstName> </passenger> </travellerInformation> </passengerData> <enhancedPassengerData> <enhancedTravellerInformation> <travellerNameInfo> <quantity>1</quantity> </travellerNameInfo> <otherPaxNamesDetails> <nameType>UN</nameType> <referenceName>Y</referenceName> <displayedName>Y</displayedName> <surname>BB</surname> <givenName>B</givenName> </otherPaxNamesDetails> </enhancedTravellerInformation> </enhancedPassengerData> </travellerInfo> <travellerInfo> <elementManagementPassenger> <reference> <qualifier>PT</qualifier> <number>1</number> </reference> <segmentName>NM</segmentName> <lineNumber>3</lineNumber> </elementManagementPassenger> <passengerData> <travellerInformation> <traveller> <surname>FF</surname> <quantity>1</quantity> </traveller> <passenger> <firstName>F</firstName> </passenger> </travellerInformation> </passengerData> <enhancedPassengerData> <enhancedTravellerInformation> <travellerNameInfo> <quantity>1</quantity> </travellerNameInfo> <otherPaxNamesDetails> <nameType>UN</nameType> <referenceName>Y</referenceName> <displayedName>Y</displayedName> <surname>FF</surname> <givenName>F</givenName> </otherPaxNamesDetails> </enhancedTravellerInformation> </enhancedPassengerData> </travellerInfo> <travellerInfo> <elementManagementPassenger> <reference> <qualifier>PT</qualifier> <number>2</number> </reference> <segmentName>NM</segmentName> <lineNumber>4</lineNumber> </elementManagementPassenger> <passengerData> <travellerInformation> <traveller> <surname>ZZ</surname> <quantity>1</quantity> </traveller> <passenger> <firstName>Z</firstName> </passenger> </travellerInformation> </passengerData> <enhancedPassengerData> <enhancedTravellerInformation> <travellerNameInfo> <quantity>1</quantity> </travellerNameInfo> <otherPaxNamesDetails> <nameType>UN</nameType> <referenceName>Y</referenceName> <displayedName>Y</displayedName> <surname>ZZ</surname> <givenName>Z</givenName> </otherPaxNamesDetails> </enhancedTravellerInformation> </enhancedPassengerData> </travellerInfo> <originDestinationDetails> <originDestination></originDestination> <itineraryInfo> <elementManagementItinerary> <reference> <qualifier>ST</qualifier> <number>1</number> </reference> <segmentName>AIR</segmentName> <lineNumber>5</lineNumber> </elementManagementItinerary> <travelProduct> <product> <depDate>051109</depDate> <depTime>0625</depTime> <arrDate>051109</arrDate> <arrTime>0725</arrTime> </product> <boardpointDetail> <cityCode>FRA</cityCode> </boardpointDetail> <offpointDetail> <cityCode>HAM</cityCode> </offpointDetail> <companyDetail> <identification>LH</identification> </companyDetail> <productDetails> <identification>2</identification> <classOfService>Y</classOfService> </productDetails> <typeDetail> <detail>ET</detail> </typeDetail> </travelProduct> <itineraryMessageAction> <business> <function>1</function> </business> </itineraryMessageAction> <itineraryReservationInfo> <reservation> <companyId>LH</companyId> <controlNumber>5SI5AW</controlNumber> </reservation> </itineraryReservationInfo> <relatedProduct> <quantity>4</quantity> <status>HK</status> </relatedProduct> <flightDetail> <productDetails> <equipment>321</equipment> <numOfStops>0</numOfStops> <weekDay>4</weekDay> </productDetails> <departureInformation> <departTerminal>1</departTerminal> </departureInformation> <timeDetail> <checkinTime>0545</checkinTime> </timeDetail> </flightDetail> <selectionDetails> <selection> <option>P2</option> </selection> </selectionDetails> <markerRailTour></markerRailTour> </itineraryInfo> </originDestinationDetails> <dataElementsMaster> <marker2></marker2> <dataElementsIndiv> <elementManagementData> <segmentName>PL</segmentName> </elementManagementData> <otherDataFreetext> <freetextDetail> <subjectQualifier>3</subjectQualifier> <type>60</type> </freetextDetail> <longFreetext>ERGER</longFreetext> </otherDataFreetext> </dataElementsIndiv> <dataElementsIndiv> <elementManagementData> <reference> <qualifier>OT</qualifier> <number>63</number> </reference> <segmentName>AP</segmentName> <lineNumber>6</lineNumber> </elementManagementData> <otherDataFreetext> <freetextDetail> <subjectQualifier>3</subjectQualifier> <type>5</type> </freetextDetail> <longFreetext>MUC - AMADEUS DEFAULT OFFICE - A</longFreetext> </otherDataFreetext> </dataElementsIndiv> <dataElementsIndiv> <elementManagementData> <reference> <qualifier>OT</qualifier> <number>95</number> </reference> <segmentName>TK</segmentName> <lineNumber>7</lineNumber> </elementManagementData> <ticketElement> <ticket> <indicator>TL</indicator> <date>201209</date> <officeId>MUC1A0701</officeId> </ticket> </ticketElement> </dataElementsIndiv> <dataElementsIndiv> <elementManagementData> <reference> <qualifier>OT</qualifier> <number>56</number> </reference> <segmentName>SSR</segmentName> <lineNumber>8</lineNumber> </elementManagementData> <serviceRequest> <ssr> <type>RQST</type> <status>HK</status> <quantity>3</quantity> <companyId>LH</companyId> <boardpoint>FRA</boardpoint> <offpoint>HAM</offpoint> </ssr> <ssrb> <data>15C</data> <crossRef>3</crossRef> <seatType>N</seatType> </ssrb> <ssrb> <data>33B</data> <crossRef>4</crossRef> <seatType>N</seatType> </ssrb> <ssrb> <data>14D</data> <crossRef>2</crossRef> <seatType>N</seatType> </ssrb> </serviceRequest> <referenceForDataElement> <reference> <qualifier>ST</qualifier> <number>1</number> </reference> <reference> <qualifier>PT</qualifier> <number>3</number> </reference> <reference> <qualifier>PT</qualifier> <number>4</number> </reference> <reference> <qualifier>PT</qualifier> <number>2</number> </reference> </referenceForDataElement> </dataElementsIndiv> </dataElementsMaster> </PNR\_RetrieveByRecLocReply>

## 5.1.3 Possible Errors

See the section, "Error Messages".

* * *