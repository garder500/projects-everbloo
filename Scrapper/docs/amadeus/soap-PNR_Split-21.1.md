---
url: "https://developers.amadeus.com/api-library/soap/functional-doc/103/doc-read/135549?serviceVersion=21.1"
download_url: "https://developers.amadeus.com/PAS-EAS/api/download/comp/4d4ad2cb456c02633f463a055ab70584/135549/UG_WBS_PNR_Split_PNRSPL_21.1_002.html"
title: "HTML_UG_WBS_PNR_Split_PNRSPL_21.1_002"
source: "amadeus"
service_id: "103"
service_name: "PNR_Split"
version: "21.1"
document_id: "135549"
doc_version: "21.1"
doc_type: "User guide"
file_format: "HTML"
scraped_at: "2026-07-15T10:37:49.136Z"
---
# Function: PNR\_Split

* * *

## 1 Overview

The function PNR\_Split separates passengers from a parent PNR and creates a new child PNR with these passengers and their associated segments and elements.

The parent and child PNRs are then linked through Associated Record Indexing (AXR).

## 1.1 Supported Operations

The following split operations are possible:

### Split - Individual Names

-   This operation splits one or several passengers from the PNR (individual or group). A maximum of 49 names can be split at a time.

### Split Group PNR - Unassigned Names

-   This operation splits a number of unassigned names from the group PNR.

### Split Group PNR - Unassigned and Individual Names combination

-   This operation splits both unassigned and individual names from the group PNR.

### Split Group PNR - Partial Confirmation of Space

-   For a group PNR with partially confirmed segments without passenger associations, this operation allows you to split unassigned and/or individual names and specify the number of confirmed/unconfirmed segments which will be split. You can then specify the number of confirmed seats to split for each segment or the number of confirmed and the number of unconfirmed seats, in which case, the total number of specified seats must match the number of split passengers.

### Split - Special Elements Handling

-   In addition to the above operations, you may choose to keep or move specific elements in the PNR. For example, a certain number of services which are not passenger-associated, or auxiliary segments.

### Retrieve and Split

-   If no PNR has been retrieved, you must add the record locator in the request to retrieve the PNR and perform the split with a single query.

## 1.2 Limitations

The following operations are not allowed on Split PNRs until end of transaction of both child and parent:

-   Additional split party
-   Increase/Decrease number in party
-   Change office of responsibility
-   Non-homogeneous conditions
-   Add passenger
-   Print ticket on child PNR (ticket print of the parent PNR will be permitted)
-   Print invoice on child PNR (invoice print of the parent PNR will be permitted)
-   Display or print of itinerary
-   PTA creation
-   Print car voucher
-   Split of OA controlled PNRs (except by TR agent)
-   Display AXR

## 1.3 Unsupported Operations

The functionality "split range of names" is not supported. Instead, you must specify exactly which passengers will be split.

## 1.4 Prerequisites

None

## 2 Building A Query

A PNR for which the record locator is known may be directly split. In this case, the record locator must be provided in the request (reservation control number).

It is also possible to split a retrieved PNR, in which case no record locator is required.

## 2.1 Sub Structure: Passenger - Individual Names

## 2.1.1 Description

This section of the XML structure is to identify which passengers will be split from the parent record and included in the child PNR.

It is used to identify the passengers that are to be split from a PNR. When dealing with individual names in the PNR, the tattoo (identifier) value corresponding to the passenger must be provided.

## 2.1.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<splitDetails> <passenger> <type>PT</type> <tattoo>1</tattoo> <tattoo>5</tattoo> <tattoo>6</tattoo> </passenger> </splitDetails>

## 2.2 Sub Structure: Passenger - Unassigned Names

## 2.2.1 Description

The same section split details is used to identify unassigned names to split from a Group PNR. In this case, only the quantity of passengers is entered.

## 2.2.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<splitDetails> <passenger> <type>PT</type> <quantity>2</quantity> </passenger> </splitDetails>

## 2.3 Sub Structure: Record Locator

## 2.3.1 Description

In this section of the XML structure, the record locator is provided in the controlNumber tag so that the PNR can be retrieved in the same query as the split.

## 2.3.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<reservationInfo> <reservation> <controlNumber>ABCDEF</controlNumber> </reservation> </reservationInfo>

## 2.4 Sub Structure: Split Details - Other Element

## 2.4.1 Description

This XML structure is used to identify other elements of the PNR to split, including segments or services.

If a quantity of 0 is entered in this element, that indicates it is to remain in the Parent PNR.

In the example below, the segment identified by segment tattoo (ST) 7 will remain in the Parent PNR and the other element identified by the tattoo (OT) 10 will be moved to the child PNR.

## 2.4.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<splitDetails> <otherElement> <type>ST</type> <quantity>0</quantity> <tattoo>7</tattoo> </otherElement> <otherElement> <type>OT</type> <quantity>1</quantity> <tattoo>10</tattoo> </otherElement> </splitDetails>

## 3 Receiving A Reply

Two kinds of replies are possible.

-   If the split is successful, the child PNR is displayed.
-   If the split fails, an error message is issued.

In all the provided examples, the reply corresponds to the child PNR displayed just after the split.

## 3.1 Sub Structure: Successful Split

## 3.1.1 Description

The reply is a display of the child PNR. Special restrictions apply to this child PNR and only an "end file" type of end of transaction is permitted (AddMultiElements with optionCode 14). After the child has been filed, the parent PNR is displayed. Upon the end of transaction of a parent PNR (AddMultiElements with optionCode 10, for example), the child PNR record locator is displayed within the end of transaction reply.

## 3.1.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<message agency="1A" release="1" type="PNRACC" version="21"> <pnrHeader> <reservationInfo> <reservation> <companyId>1A</companyId> <controlNumber>XXXXXX</controlNumber> <date>101012</date> <time>1525</time> </reservation> </reservationInfo> </pnrHeader> <securityInformation> <responsibilityInformation> <typeOfPnrElement>RP</typeOfPnrElement> <agentId>BMPR</agentId> <officeId>MUC6X9999</officeId> </responsibilityInformation> <queueingInformation> <queueingOfficeId>MUC6X9999</queueingOfficeId> </queueingInformation> <cityCode>DAP</cityCode> <secondRpInformation> <creationOfficeId>MUC6X9999</creationOfficeId> <agentSignature>9999BM</agentSignature> <creationDate>101012</creationDate> <creationTime>1525</creationTime> </secondRpInformation> </securityInformation> <freetextData> <freetextDetail> <subjectQualifier>3</subjectQualifier> <type>P12</type> </freetextDetail> <longFreetext>--- RLR ---</longFreetext> </freetextData> <freetextData> <freetextDetail> <subjectQualifier>3</subjectQualifier> <type>P11</type> </freetextDetail> <longFreetext>ASSOCIATE PNR</longFreetext> </freetextData> <sbrPOSDetails> <sbrUserIdentificationOwn> <originIdentification> <inHouseIdentification1>MUC6X9999</inHouseIdentification1> </originIdentification> <originatorTypeCode>A</originatorTypeCode> </sbrUserIdentificationOwn> <sbrSystemDetails> <deliveringSystem> <companyId>1A</companyId> <locationId>MUC</locationId> </deliveringSystem> </sbrSystemDetails> <sbrPreferences> <userPreferences> <codedCountry>DE</codedCountry> </userPreferences> </sbrPreferences> </sbrPOSDetails> <sbrCreationPosDetails> <sbrUserIdentificationOwn> <originIdentification> <inHouseIdentification1>MUC6X9999</inHouseIdentification1> </originIdentification> <originatorTypeCode>A</originatorTypeCode> </sbrUserIdentificationOwn> <sbrSystemDetails> <deliveringSystem> <companyId>1A</companyId> <locationId>MUC</locationId> </deliveringSystem> </sbrSystemDetails> <sbrPreferences> <userPreferences> <codedCountry>DE</codedCountry> </userPreferences> </sbrPreferences> </sbrCreationPosDetails> <sbrUpdatorPosDetails> <sbrUserIdentificationOwn> <originIdentification> <inHouseIdentification1>MUC6X9999</inHouseIdentification1> </originIdentification> <originatorTypeCode>A</originatorTypeCode> </sbrUserIdentificationOwn> <sbrSystemDetails> <deliveringSystem> <companyId>1A</companyId> <locationId>MUC</locationId> </deliveringSystem> </sbrSystemDetails> <sbrPreferences> <userPreferences> <codedCountry>DE</codedCountry> </userPreferences> </sbrPreferences> </sbrUpdatorPosDetails> <technicalData> <enveloppeNumberData> <sequenceDetails> <number>1</number> </sequenceDetails> </enveloppeNumberData> <lastTransmittedEnvelopeNumber> <currentRecord>0</currentRecord> </lastTransmittedEnvelopeNumber> <purgeDateData> <dateTime> <year>2012</year> <month>10</month> <day>10</day> </dateTime> </purgeDateData> <generalPNRInformation> <statusDetails> <isPNRModifDuringTrans>MOD</isPNRModifDuringTrans> </statusDetails> </generalPNRInformation> </technicalData> <travellerInfo> <elementManagementPassenger> <reference> <qualifier>PT</qualifier> <number>2</number> </reference> <segmentName>NM</segmentName> <lineNumber>1</lineNumber> </elementManagementPassenger> <passengerData> <travellerInformation> <traveller> <surname>PASSENGERS</surname> <quantity>1</quantity> </traveller> <passenger> <firstName>TWO</firstName> </passenger> </travellerInformation> </passengerData> <enhancedPassengerData> <enhancedTravellerInformation> <travellerNameInfo> <quantity>1</quantity> </travellerNameInfo> <otherPaxNamesDetails> <nameType>UN</nameType> <referenceName>Y</referenceName> <displayedName>Y</displayedName> <surname>PASSENGERS</surname> <givenName>TWO</givenName> </otherPaxNamesDetails> </enhancedTravellerInformation> </enhancedPassengerData> </travellerInfo> <originDestinationDetails> <originDestination> </originDestination> <itineraryInfo> <elementManagementItinerary> <reference> <qualifier>ST</qualifier> <number>1</number> </reference> <segmentName>AIR</segmentName> <lineNumber>2</lineNumber> </elementManagementItinerary> <travelProduct> <product> <depDate>101012</depDate> <depTime>1925</depTime> <arrDate>101012</arrDate> <arrTime>1935</arrTime> </product> <boardpointDetail> <cityCode>CDG</cityCode> </boardpointDetail> <offpointDetail> <cityCode>LHR</cityCode> </offpointDetail> <companyDetail> <identification>6X</identification> </companyDetail> <productDetails> <identification>3857</identification> <classOfService>J</classOfService> </productDetails> <typeDetail> <detail>ET</detail> </typeDetail> </travelProduct> <itineraryMessageAction> <business> <function>1</function> </business> </itineraryMessageAction> <relatedProduct> <quantity>1</quantity> <status>HK</status> </relatedProduct> <flightDetail> <productDetails> <equipment>332</equipment> <numOfStops>0</numOfStops> <weekDay>3</weekDay> </productDetails> </flightDetail> <selectionDetails> <selection> <option>P2</option> </selection> </selectionDetails> <markerRailTour> </markerRailTour> </itineraryInfo> </originDestinationDetails> <dataElementsMaster> <marker2> </marker2> <dataElementsIndiv> <elementManagementData> <reference> <qualifier>OT</qualifier> <number>10</number> </reference> <segmentName>AP</segmentName> <lineNumber>3</lineNumber> </elementManagementData> <otherDataFreetext> <freetextDetail> <subjectQualifier>3</subjectQualifier> <type>5</type> </freetextDetail> <longFreetext>0123456789</longFreetext> </otherDataFreetext> </dataElementsIndiv> <dataElementsIndiv> <elementManagementData> <reference> <qualifier>OT</qualifier> <number>9</number> </reference> <segmentName>TK</segmentName> <lineNumber>4</lineNumber> </elementManagementData> <ticketElement> <ticket> <indicator>OK</indicator> <date>101012</date> <officeId>MUC6X9999</officeId> </ticket> </ticketElement> </dataElementsIndiv> <dataElementsIndiv> <elementManagementData> <segmentName>SP</segmentName> </elementManagementData> <referencedRecord> <referencedReservationInfo> <reservation> <companyId>1A</companyId> <controlNumber>ABCDEF</controlNumber> <controlType>P</controlType> <date>101012</date> </reservation> </referencedReservationInfo> <securityInformation> <responsibilityInformation> <typeOfPnrElement>SP</typeOfPnrElement> <agentId>AASU</agentId> <officeId>MUC6X9999</officeId> </responsibilityInformation> </securityInformation> </referencedRecord> </dataElementsIndiv> </dataElementsMaster> </message>

* * *

## 4 Error Messages

### Errors at first split request

**Error**

**Description**

ERC 0031 FINISH OR IGNORE

The PNR was modified and must be committed or ignored before attempting to split

ERC 01954 RESTRICTED - FINISH OR IGNORE

The PNR was modified and must be committed or ignored before attempting to split

ERC 01959 NEED PNR

A PNR must be retrieved before attempting to split

ERC 03596 RESTRICTED/ITINERARY DOES NOT EXIST

The PNR does not contain a valid itinerary (mandatory to perform a split)

ERC 02577 CHECK NAME ELEMENT NUMBER

The element numbers specified in split message must correspond to valid name elements

ERC 02578 CHECK NAME ELEMENT NUMBER - ITEMS EXCEEDED

The number of unassigned names requested in the split request is greater than the number of unassigned names in the group

ERC 03008 UNABLE TO SPLIT PARTY OF 1

Only PNRs with 2 or more passengers can be split

ERC 02996 INVALID TRANSACTION - TOO MANY NAMES

Split must be requested on, at most, 49 names at the same time, and with at least 1 less name than the PNR total number in party

ERC 03210 DUPLICATE ELEMENT XX

The split request must not contain duplicate element numbers

### Errors specific to special element handling (mainly auxiliary segments)

**Error**

**Description**

ERC 03211 PASSENGER/SEGMENT ASSOCIATION EXISTS - CHECK ELEMENT XX

On an auxiliary segment with passenger associations, a split cannot be requested with a number of elements as a parameter

ERC 08604 RESTRICTED-OPTION NOT ALLOWED

Too many names requested for the auxiliary segment

ERC 03006 CHECK ITINERARY/INACTIVE SEGMENT

Split with special elements handling cannot be used on a past segment

ERC 01960 CHECK ELEMENT XX - ITEMS EXCEEDED

Too many items were requested compared with auxiliary segment number in party

ERC 02576 CHECK ELEMENT XX AND ADVISE HANDLING

Special element handling on a segment without passenger associations must state how many items to split

### Errors which can occur after split party

**Error**

**Description**

ERC 01957 RESTRICTED - ADDITIONAL SPLIT NOT ALLOWED

Child and parent PNRs must be committed before attempting another split

## 4.1 Error Reply

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<soap:Fault xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> <faultcode>soap:Server</faultcode> <faultstring>1959|Application|NEED PNR</faultstring> <faultactor>SI:Backend</faultactor> </soap:Fault>

  

* * *

## 5 Operations