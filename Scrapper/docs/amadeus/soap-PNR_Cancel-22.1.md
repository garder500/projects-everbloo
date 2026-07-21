---
url: "https://developers.amadeus.com/api-library/soap/functional-doc/28/doc-read/136600?serviceVersion=22.1"
download_url: "https://developers.amadeus.com/PAS-EAS/api/download/comp/4d4ad2cb456c02633f463a055ab70584/136600/UG_WBS_PNR_Cancel_PNRXCL_22.1_006.html"
title: "HTML_UG_WBS_PNR_Cancel_PNRXCL_22.1_006"
source: "amadeus"
service_id: "28"
service_name: "PNR_Cancel"
version: "22.1"
document_id: "136600"
doc_version: "22.1"
doc_type: "User guide"
file_format: "HTML"
scraped_at: "2026-07-15T10:34:02.734Z"
---
# Function: PNR\_Cancel

* * *

## 1 Overview

The Cancel service is used to cancel selected elements from a PNR. A PNR contains all the elements (details) pertaining to a passenger's trip and reservation. It must contain the following five elements:

-   Name element: A passenger name
-   Itinerary element: A booking for a flight or another service
-   Contact element: Telephone number or contact information for the traveller
-   Ticketing element: An indication of the arrangements for issuing a ticket for the booking
-   Received from element: The 'Received From' element is a mandatory element following a cancelled (modified) element, it is used to identify the name of the person, or entity that has made the booking or has modified the PNR.
-   Individual security element: Grants additional access rights to the PNR

Each PNR that is created is assigned a six-character code called a Record Locator, which is the unique identifier for the PNR and can be used to retrieve the PNR. For more information regarding other methods and the rules for retrieving a PNR, please refer to the Retrieve service.

Each element in the PNR is uniquely identified by both reference qualifier (PT, OT, ST or OOT) and reference number. Below is a description of these reference qualifiers.

PNR Qualifier Overview

**PT**

Example elements for PT (Passenger Tattoo) qualifier:

-   Name element
-   Group element

**ST**

Example elements for ST (Segment Tattoo) qualifier:

-   Air Segment
-   Hotel element
-   Car element
-   Miscellaneous element

**OT**

Example elements for OT (Other element Tattoo) qualifier (non name, non segment):

-   Remark element
-   Contact element (AP)
-   Special Service Request element
-   Other Service Request element
-   Extended Contents: Extended Contents are merchandise items that travel Agents can sell on top of traditional bookings. It is an internal and structured representation of content booked outside Amadeus. There are many types of extended contents: Air, Ferry, Cruise, Rail, Taxi, Restaurant, and so on.

**OOT**

An offer is an item proposition, in other words, a set availability and quotation, made to the customer before booking, with no guarantee of price and availability. From the customer point of view, it can be considered as a snapshot of the travel agency proposal at a given moment. There are several types of offers:

-   Air
-   Hotel
-   Manual

With the Cancel service, single and multiple elements are cancelled and moved to the PNR history. It is also used to cancel all active itinerary elements, except certain rail segments and all non-mandatory PNR elements. Itinerary flight segments that are marked as flown, or auxiliary segments that are marked as past, cannot be cancelled from a PNR. Cancellation of the elements in the PNR can be done in two ways:

Multiple cancel query message structure

Under a single cancel query message structure, cancellation is not allowed for a combination of elements concerning different types of reference qualifiers. For example, cancellation of name elements and itinerary is not allowed. Whereas, cancellation is allowed for a combination of elements of the same types of reference qualifiers. For example, cancellation of multiple OT elements in a single cancel query message is allowed.

Exception: For extended contents, there is only one reference qualifier "OT" which can refer to many product types (such as Air, Ferry, Cruise, Rail, Coach, Bus, Hotel, Visit, Insurance, Vaccine, Restaurant, and so on). Cancel cannot be performed on elements from different family types. For instance, an air segment from extended content and a remark from the PNR cannot be cancelled in a single querry message, even if they both have the same reference qualifiers OT.

Repetition factor  

The cancelElements/entry type below are used to cancel elements. Only one type can be entered in a single Cancel request. For multiple cancel type, several calls must be done:

**D**

D type, Cancel Duplicate segments (TTY message not sent to the airline)

**E**

XE Cancel element type

**G**

G Name integration

**I**

XI Cancel itinerary type

**P**

Priority line type

**S**

ESX Cancel ES element

## 1.1 Supported Operations

Following is a list of examples showing some of the supported operations:

### Single Data Element

-   This operation cancels a data element from a PNR and adds it to the PNR history.

### Multiple Data Elements

-   This operation cancels multiple data elements from the active PNR and adds them to the PNR history.

### Cancel Elements in a previously retrieved PNR

-   This operation cancels data elements from a retrieved PNR and adds them to the PNR history.

### Cancel Elements in a non previously retrieved PNR

-   This operation retrieves the PNR, cancels data elements and adds them to the PNR history.

### Cancel Elements and End Transaction

-   This operation cancels multiple data elements from an active PNR and then ends the transaction.

### Cancel Elements and End Transaction (Automatic add of Received From)

-   This operation cancels multiple data elements from an active PNR and then files and closes the PNR with the end transaction action automatically adding a received from element.          

### Cancel the entire Itinerary and other Elements

-   This operation removes the entire itinerary from an active PNR (except for Rail segments) and adds it to the PNR history.  Associated SSR and OSI elements are also moved to the PNR history.

### Cancel Itinerary and End Transaction

-   This operation removes an itinerary and other data elements from an active PNR, followed by an End of Transaction action that files and closes the PNR.

### Name Integration

-   A group name element in a PNR specifies the collective name and the number of members (a group of people) travelling together. The Name Integration operation reduces the space that has already been booked for a group by cancelling named group members from the group element.

### Optional PNR actions

-   These features are special cases incorporated directly into the Cancel service to identify specific actions to be processed on a PNR.

## 1.2 Limitations

### Group name

The group name element and unnamed group members cannot be cancelled.

### Itinerary elements

Itinerary flight segments that are marked as flown or auxiliary segments that are marked as past cannot be cancelled from a PNR.

Important: any elements associated with the cancelled itinerary will also be cancelled simultaneously following this action.

After segment cancellation, segments and associated elements are not effectively removed from the PNR until the end transaction.

### Name element

The Name element can be cancelled with no reservation as long as the PNR has not been saved. Once a PNR has been saved it cannot exist without at least one Name element, and if an attempt is made to cancel the last remaining Name element an error will be received.

**Important**: any elements associated to the cancelled name will also be cancelled simultaneously following this action.

### Individual Security Element

ES elements can only be cancelled by receiver type (G, I or P) and not individualy.

## 1.3 Unsupported Operations

Unsupported operations

-   End transaction and queue place
-   Cancel MCO sub-elements
-   Cancel segment but do not transmit to airline

## 1.4 Prerequisites

Prior to using the Cancel service, it is necessary to have a PNR that has just been created or a PNR that has just been retrieved. For more information about the Retrieve service, please refer to the Retrieve user guide.

## 2 Building A Query

### Applicable Code Sets

The following code sets may be used when building a query with this function:

PNR Action Codes

0      

No special processing

10

End Transaction

11

End Transaction with retrieve

20

Ignore

Types of Cancel Entries

D

Cancel Duplicate segments

E

Cancel Element

G

Name integration

I

Cancel Itinerary

P

Cancel Priority line

S

Cancel ES element

Reference qualifier

OT

Other element (non name, non segment) reference number. Extended elements reference number  

PT

Passenger Client-request-message-defined reference number

ST

Segment Tattoo reference number

OOT

Offer Tattoo reference number

D

Dominant segment in a marriage

N

Non-dominant segment in a marriage

ESG

ES element with receiver type G

ESI

ES element with receiver type I

ESP

ES element with receiver type P

## 2.1 Sub Structure: Cancel a Name element

## 2.1.1 Description

Below is an example of a query structure to cancel a Name element in the same PNR as before (5PO9P4). PT is the reference qualifier and 1 is the reference number for this Name element;in the PNR:

## 2.1.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<message agency="1A" release="1" type="PNRXCL" version="22"> <originatorOfRequest> <deliverySystem> <companyId>00</companyId> </deliverySystem> <originator> <agencyId>MUC6X0701</agencyId> </originator> <typeCode>E</typeCode> <originatorDetails> <country>EN</country> <currency>EUR</currency> <language>DE</language> </originatorDetails> <authorityCode>A1234AASU</authorityCode> </originatorOfRequest> <pnrActions> <optionCode>0</optionCode> </pnrActions> <cancelElements> <entryType>E</entryType> <element> <identifier>PT</identifier> <number>1</number> </element> </cancelElements> </message>

## 2.2 Sub Structure: Cancel an AP element

## 2.2.1 Description

Below is an example of a query structure to cancel an AP element (Contact element) in PNR 5PO9P4. The cancel entry type is "E", standing for the Cancel Element operation. OT is the reference qualifier and 8 is the reference number for this element in the PNR:

## 2.2.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<message agency="1A" release="1" type="PNRXCL" version="22"> <pnrActions> <optionCode>0</optionCode> </pnrActions> <cancelElements> <entryType>E</entryType> <element> <identifier>OT</identifier> <number>8</number> </element> </cancelElements> </message>

## 3 Receiving A Reply

After each Cancel request, the corresponding PNR Reply structure is returned. The response is a structured PNR representation with the acknowledgement of a successful commit if applicable, or an error message.

## 3.1 Sub Structure: Error message

## 3.1.1 Description

The following is a possible reply structure to cancel a Name element in a PNR. For this case, the PNR contains only one Name element. An error message "NEED NAME" is received in the reply message upon the cancel transaction since every PNR must contain at least one Name element. 

## 3.1.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<message agency="1A" release="1" type="GENRES" version="98"> <messageActionDetails> <messageFunctionDetails> <messageFunction>M</messageFunction> </messageFunctionDetails> </messageActionDetails> <information> <applicationErrorInformation> <applicationErrorDetail> <applicationError>1436</applicationError> <codeListQualifier>EC</codeListQualifier> <codeListResponsibleAgency>1A</codeListResponsibleAgency> </applicationErrorDetail> </applicationErrorInformation> <interactiveFreeText> <freeTextQualifier> <textSubjectQualifier>C</textSubjectQualifier> <informationType>50</informationType> <language>EN</language> </freeTextQualifier> <freeTextInfo>NEED NAME</freeTextInfo> </interactiveFreeText> </information> </message>

* * *

## 3.2 Sub Structure: Successful cancel

## 3.2.1 Description

Below is a reply structure to an attempt to cancel an AP element (Contact element) in PNR 5Q7D6M. The PNR is displayed and the AP element has been successfully deleted.

## 3.2.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<message agency="1A" release="1" type="PNRACC" version="22"> <pnrHeader> <reservationInfo> <reservation> <companyId>1A</companyId> <controlNumber>5PO9P4</controlNumber> <date>240912</date> <time>1605</time> </reservation> </reservationInfo> </pnrHeader> <securityInformation> <responsibilityInformation> <typeOfPnrElement>RP</typeOfPnrElement> <agentId>BMPR</agentId> <officeId>MUC6X0701</officeId> <iataCode>12345675</iataCode> </responsibilityInformation> <queueingInformation> <queueingOfficeId>MUC6X0701</queueingOfficeId> </queueingInformation> <cityCode>DAP</cityCode> <secondRpInformation> <creationOfficeId>MUC6X0701</creationOfficeId> <agentSignature>9999BM</agentSignature> <creationDate>240912</creationDate> <creatorIataCode>12345675</creatorIataCode> <creationTime>1605</creationTime> </secondRpInformation> </securityInformation> <freetextData> <freetextDetail> <subjectQualifier>3</subjectQualifier> <type>P12</type> </freetextDetail> <longFreetext>--- RLR ---</longFreetext> </freetextData> <pnrHeaderTag> <statusInformation> <indicator>RLR</indicator> </statusInformation> </pnrHeaderTag> <sbrPOSDetails> <sbrUserIdentificationOwn> <originIdentification> <originatorId>12345675</originatorId> <inHouseIdentification1>MUC6X0701</inHouseIdentification1> </originIdentification> <originatorTypeCode>A</originatorTypeCode> </sbrUserIdentificationOwn> <sbrSystemDetails> <deliveringSystem> <companyId>1A</companyId> <locationId>MUC</locationId> </deliveringSystem> </sbrSystemDetails> <sbrPreferences> <userPreferences> <codedCountry>DE</codedCountry> </userPreferences> </sbrPreferences> </sbrPOSDetails> <sbrCreationPosDetails> <sbrUserIdentificationOwn> <originIdentification> <originatorId>12345675</originatorId> <inHouseIdentification1>MUC6X0701</inHouseIdentification1> </originIdentification> <originatorTypeCode>A</originatorTypeCode> </sbrUserIdentificationOwn> <sbrSystemDetails> <deliveringSystem> <companyId>1A</companyId> <locationId>MUC</locationId> </deliveringSystem> </sbrSystemDetails> <sbrPreferences> <userPreferences> <codedCountry>DE</codedCountry> </userPreferences> </sbrPreferences> </sbrCreationPosDetails> <sbrUpdatorPosDetails> <sbrUserIdentificationOwn> <originIdentification> <originatorId>12345675</originatorId> <inHouseIdentification1>MUC6X0701</inHouseIdentification1> </originIdentification> <originatorTypeCode>A</originatorTypeCode> </sbrUserIdentificationOwn> <sbrSystemDetails> <deliveringSystem> <companyId>1A</companyId> <locationId>MUC</locationId> </deliveringSystem> </sbrSystemDetails> <sbrPreferences> <userPreferences> <codedCountry>DE</codedCountry> </userPreferences> </sbrPreferences> </sbrUpdatorPosDetails> <technicalData> <enveloppeNumberData> <sequenceDetails> <number>1</number> </sequenceDetails> </enveloppeNumberData> <lastTransmittedEnvelopeNumber> <currentRecord>0</currentRecord> </lastTransmittedEnvelopeNumber> <purgeDateData> <dateTime> <year>2013</year> <month>2</month> <day>25</day> </dateTime> </purgeDateData> <generalPNRInformation> <statusDetails> <isPNRModifDuringTrans>MOD</isPNRModifDuringTrans> </statusDetails> </generalPNRInformation> </technicalData> <travellerInfo> <elementManagementPassenger> <reference> <qualifier>PT</qualifier> <number>1</number> </reference> <segmentName>NM</segmentName> <lineNumber>1</lineNumber> </elementManagementPassenger> <passengerData> <travellerInformation> <traveller> <surname>JONES</surname> <quantity>1</quantity> </traveller> <passenger> <firstName>PETER</firstName> </passenger> </travellerInformation> </passengerData> <enhancedPassengerData> <enhancedTravellerInformation> <travellerNameInfo> <quantity>1</quantity> </travellerNameInfo> <otherPaxNamesDetails> <nameType>UN</nameType> <referenceName>Y</referenceName> <displayedName>Y</displayedName> <surname>JONES</surname> <givenName>PETER</givenName> </otherPaxNamesDetails> </enhancedTravellerInformation> </enhancedPassengerData> </travellerInfo> <originDestinationDetails> <originDestination> </originDestination> <itineraryInfo> <elementManagementItinerary> <reference> <qualifier>ST</qualifier> <number>1</number> </reference> <segmentName>AIR</segmentName> <lineNumber>2</lineNumber> </elementManagementItinerary> <travelProduct> <product> <depDate>250213</depDate> <depTime>0630</depTime> <arrDate>250213</arrDate> <arrTime>0800</arrTime> </product> <boardpointDetail> <cityCode>NCE</cityCode> </boardpointDetail> <offpointDetail> <cityCode>CDG</cityCode> </offpointDetail> <companyDetail> <identification>6X</identification> </companyDetail> <productDetails> <identification>563</identification> <classOfService>Y</classOfService> </productDetails> <typeDetail> <detail>ET</detail> </typeDetail> </travelProduct> <itineraryMessageAction> <business> <function>1</function> </business> </itineraryMessageAction> <relatedProduct> <quantity>1</quantity> <status>HK</status> </relatedProduct> <flightDetail> <productDetails> <equipment>ERJ</equipment> <numOfStops>0</numOfStops> <weekDay>1</weekDay> </productDetails> </flightDetail> <selectionDetails> <selection> <option>P2</option> </selection> </selectionDetails> <markerRailTour> </markerRailTour> </itineraryInfo> </originDestinationDetails> <dataElementsMaster> <marker2> </marker2> <dataElementsIndiv> <elementManagementData> <reference> <qualifier>OT</qualifier> <number>11</number> </reference> <segmentName>TK</segmentName> <lineNumber>3</lineNumber> </elementManagementData> <ticketElement> <ticket> <indicator>OK</indicator> <date>240912</date> <officeId>MUC6X0701</officeId> </ticket> </ticketElement> </dataElementsIndiv> <dataElementsIndiv> <elementManagementData> <reference> <qualifier>OT</qualifier> <number>12</number> </reference> <segmentName>RM</segmentName> <lineNumber>4</lineNumber> </elementManagementData> <miscellaneousRemarks> <remarks> <type>RM</type> <freetext>PAX IS A VIP</freetext> </remarks> </miscellaneousRemarks> <extendedRemark> <structuredRemark> <type>RM</type> <freetext>PAX IS A VIP</freetext> </structuredRemark> </extendedRemark> </dataElementsIndiv> </dataElementsMaster> </message>

* * *

## 4 Error Messages

The following errors can be returned while trying to use the Cancel function.

### No Match for Record Locator

This error message is received when the control number (PNR record locator) entered cannot be found, therefore, ensure that the PNR being referenced is valid. Refer to the function Retrieve for further methods of retrieving a PNR.

1931 - NO MATCH FOR RECORD LOCATOR

### Finish or Ignore

This error message is received when retrieving a PNR if you already have a modified PNR in the context. The modified PNR must be End Transacted or Ignored before retrieving another one.

31 - FINISH OR IGNORE

### No PNR in context

This error message is received when a retrieve was not asked and there is no PNR in the context. The PNR must be retrieved prior to the cancel.

49 - NO TRANSACTION PRESENT

### Invalid PNR Action

This error message is received when when the optionCode entered for the PNR Action is not supported. If no special processing is required, the code 0 must be used.

572 - INVALID OPTION

### Invalid format

This error message is received if the identifier for the action is missing and the data element to be cancelled is present. The solution is to return to the query and add the missing information.

12290 - INVALID FORMAT/NOT ENTERED/>

### Time-out for inactivity

This error message is received if the PNR was opened in the context, and not modified for more than 3 hours prior to the Cancel query. The PNR must be ignored and retrieved again.

2451 - PNR NOT MODIFIED DURING 3 HOURS - IGNORE

### Cancel restricted

This error message is received when there is an attempt to cancel an element that cannot be cancelled.

3134 - CANCEL RESTRICTED -

### Check segment status

This error message is received when there is an attempt to cancel a flown or past dated itinerary element.

3006 - CHECK ITINERARY/INACTIVE SEGMENT

### Range problem

This error is received when elements to cancel are selected in the wrong order.

1933 - CHECK RANGE ORDER

### Delete restricted

This error is received when there is an attempt to delete a segment, or range of segments that belong to an airline that prohibits segment deletion.

3135 - DELETE RESTRICTED

### Check element number

This error is received when there is an attempt to cancel a non-existing element number.

1895 - CHECK ELEMENT NUMBER

### Duplicate element

This error is received when there is an attempt to delete the same element with one message. The same element number has been entered more than once in the cancellation entry.

1939 - DUPLICATE ELEMENT - X             (where x is the element number)

### Element does not exist

This error is received when there is an attempt to cancel a non-existing element.

1938 - ELEMENT DOES NOT EXIST

### Element conflict

This error is received when there is an attempt to delete different element types in the same message.

1935 - ELEMENT CONFLICT

### ETKT status problem while trying to delete an FA element

This error is received when there is an attempt to cancel the itinerary for which an FA/ET element exists.

9123 - FA ELEMENT DELETED - VERIFY ETKT STATUS FOR -

### Warning related to TST

This error is received when there is an attempt to cancel the last remaining air segment for which an FA/ET element exists.  
2888 - WARNING: SEGMENT DELETED - TST WILL BE DELETED IF ET/ER

### Itinerary deleted

All itinerary has been deleted.

3512 - ITINERARY DELETED

### Need name

An attempt has been made to delete the Name element, whereas, it is not authorised in some cases.

1436 - NEED NAME

### Restricted

An attempt has been made to cancel a name associated with an FA/ET element.

9029 - RESTRICTED - FA/ET EXISTS

After a name has been cancelled, a RF (Receive From) must be done before doing another update.

3350 - RESTRICTED/NAME ELEMENT PREVIOUSLY CANCELLED

When the XI is performed on a child PNR after the Split transaction and before EOT. This error response is issued.       

1956 - RESTRICTED DURING SPLIT PARTY 

In a PNR in which an Increase Number in Party (INP) entry has been performed, if XI is entered before EOT the system issues the following error response:

6196 - RESTRICTED DURING INCREASE NUMBER IN PARTY

XI can only be performed on a retrieved PNR. When attempted on a newly created PNR this error message is displayed.

4818 - RESTRICTED / USE XE

### TRN error

An attempt has been made to cancel an itinerary containing a SNCF Rail segment.

6527 - TRN 2C CANNOT BE MODIFIED - RESARAIL PNR MUST BE UPDATED

### Wrong name element number

2577 - CHECK NAME ELEMENT NUMBER

### Invalid Format

477 - INVALID FORMAT

### Verify with cruise

The Name element has been cancelled, but the cancellation has not been applied to the cruise segment CRU in the PNR.

9665 - NAME ELEMENT DELETED - VERIFY WITH CRUISE - XXX  

(where XXX is the cruise company code)   

### ESX - Cancel ES element

An attempt to create, display, update or delete an Individual Security element is made by an agent who doesn't work in the Office of Responsibility:

6134 – RESTRICTED - YOUR OFFICE IS NOT RESPONSIBLE FOR THAT PNR

No individual Security Element exists on an attempt to delete such an element from the PNR:

9487 - NO INDIVIDUAL SECURITY ELEMENT EXISTS

No Individual Security Element can be found holding the requested receiver type(s):

9384 - NO MATCHING INDIVIDUAL SECURITY ELEMENT EXISTS

EXAMPLE: Below is an example of an error message (Soap Fault) returned upon a cancel query using the wrong reference number.

## 4.1 Error Reply

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<soap:Fault xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> <faultcode>soap:Server</faultcode> <faultstring>1895|Application|CHECK ELEMENT NUMBER</faultstring> <faultactor>SI:Backend</faultactor> </soap:Fault>

  

* * *

## 5 Operations

## 5.1 Operation: Base PNR used as example

In this section, the sample PNR scenarios consist of the following elements:

-   Record locator (5PPGFR)
-   2 passenger names
-   2 flights
-   1 phone
-   1 ticket
-   1 remark
-   1 special service request

Below are the query and reply structures to cancel a Name element from the above PNR. Unlike the previous example, there is no error received after this transaction because the PNR still contains a Name element. Instead, the PNR is displayed and one of the initial Name elements, as well as the special service requests associated with this passenger have been cancelled.

Note: The cancellation of an element removes all associations for that element.

The following is an extract of the items that are removed from the returned reply, indicating the cancelled passenger name. It is important to note that a PNR must have at least one Name element.

Reply - Data element

Value

/travellerInfo\[1\]/ elementManagementPassenger/ reference/ qualifier

PT

/travellerInfo\[1\]/ elementManagementPassenger/ reference/ number

1

/travellerInfo\[1\]/ elementManagementPassenger/ segmentName

NM

/travellerInfo\[1\]/ elementManagementPassenger/ lineNumber

1

/travellerInfo\[1\]/ travellerInformation/ traveller/ surname

JONES

/travellerInfo\[1\]/ travellerInformation/ traveller/ quantity

1

/travellerInfo\[1\]/ travellerInformation/ passenger/ firstName

AMANDA

## 5.1.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_Cancel xmlns="http://xml.amadeus.com/PNRXCL\_22\_1\_1A"> <pnrActions> <optionCode>0</optionCode> </pnrActions> <cancelElements> <entryType>E</entryType> <element> <identifier>PT</identifier> <number>2</number> </element> </cancelElements> </PNR\_Cancel>

## 5.1.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_Reply xmlns="http://xml.amadeus.com/PNRACC\_22\_1\_1A"> <pnrHeader> <reservationInfo> <reservation> <companyId>1A</companyId> <controlNumber>5PPGFR</controlNumber> <date>240912</date> <time>1631</time> </reservation> </reservationInfo> </pnrHeader> <securityInformation> <responsibilityInformation> <typeOfPnrElement>RP</typeOfPnrElement> <agentId>BMPR</agentId> <officeId>MUC1A0701</officeId> <iataCode>12345675</iataCode> </responsibilityInformation> <queueingInformation> <queueingOfficeId>MUC6X0701</queueingOfficeId> </queueingInformation> <cityCode>DAP</cityCode> <secondRpInformation> <creationOfficeId>MUC6XA070</creationOfficeId> <agentSignature>9999BM</agentSignature> <creationDate>240912</creationDate> <creatorIataCode>12345675</creatorIataCode> <creationTime>1629</creationTime> </secondRpInformation> </securityInformation> <freetextData> <freetextDetail> <subjectQualifier>3</subjectQualifier> <type>P12</type> </freetextDetail> <longFreetext>--- RLR ---</longFreetext> </freetextData> <pnrHeaderTag> <statusInformation> <indicator>RLR</indicator> </statusInformation> </pnrHeaderTag> <sbrPOSDetails> <sbrUserIdentificationOwn> <originIdentification> <originatorId>12345675</originatorId> <inHouseIdentification1>MUC6X0701</inHouseIdentification1> </originIdentification> <originatorTypeCode>A</originatorTypeCode> </sbrUserIdentificationOwn> <sbrSystemDetails> <deliveringSystem> <companyId>1A</companyId> <locationId>MUC</locationId> </deliveringSystem> </sbrSystemDetails> <sbrPreferences> <userPreferences> <codedCountry>DE</codedCountry> </userPreferences> </sbrPreferences> </sbrPOSDetails> <sbrCreationPosDetails> <sbrUserIdentificationOwn> <originIdentification> <originatorId>12345675</originatorId> <inHouseIdentification1>MUC6X0701</inHouseIdentification1> </originIdentification> <originatorTypeCode>A</originatorTypeCode> </sbrUserIdentificationOwn> <sbrSystemDetails> <deliveringSystem> <companyId>1A</companyId> <locationId>MUC</locationId> </deliveringSystem> </sbrSystemDetails> <sbrPreferences> <userPreferences> <codedCountry>DE</codedCountry> </userPreferences> </sbrPreferences> </sbrCreationPosDetails> <sbrUpdatorPosDetails> <sbrUserIdentificationOwn> <originIdentification> <originatorId>12345675</originatorId> <inHouseIdentification1>MUC6X0701</inHouseIdentification1> </originIdentification> <originatorTypeCode>A</originatorTypeCode> </sbrUserIdentificationOwn> <sbrSystemDetails> <deliveringSystem> <companyId>1A</companyId> <locationId>MUC</locationId> </deliveringSystem> </sbrSystemDetails> <sbrPreferences> <userPreferences> <codedCountry>DE</codedCountry> </userPreferences> </sbrPreferences> </sbrUpdatorPosDetails> <technicalData> <enveloppeNumberData> <sequenceDetails> <number>4</number> </sequenceDetails> </enveloppeNumberData> <lastTransmittedEnvelopeNumber> <currentRecord>3</currentRecord> </lastTransmittedEnvelopeNumber> <purgeDateData> <dateTime> <year>2013</year> <month>3</month> <day>7</day> </dateTime> </purgeDateData> </technicalData> <travellerInfo> <elementManagementPassenger> <reference> <qualifier>PT</qualifier> <number>1</number> </reference> <segmentName>NM</segmentName> <lineNumber>1</lineNumber> </elementManagementPassenger> <passengerData> <travellerInformation> <traveller> <surname>JONES</surname> <quantity>1</quantity> </traveller> <passenger> <firstName>PETER</firstName> </passenger> </travellerInformation> </passengerData> <enhancedPassengerData> <enhancedTravellerInformation> <travellerNameInfo> <quantity>1</quantity> </travellerNameInfo> <otherPaxNamesDetails> <nameType>UN</nameType> <referenceName>Y</referenceName> <displayedName>Y</displayedName> <surname>JONES</surname> <givenName>PETER</givenName> </otherPaxNamesDetails> </enhancedTravellerInformation> </enhancedPassengerData> </travellerInfo> <travellerInfo> <elementManagementPassenger> <reference> <qualifier>PT</qualifier> <number>2</number> </reference> <segmentName>NM</segmentName> <lineNumber>2</lineNumber> </elementManagementPassenger> <passengerData> <travellerInformation> <traveller> <surname>JONES</surname> <quantity>1</quantity> </traveller> <passenger> <firstName>AMANDA</firstName> </passenger> </travellerInformation> </passengerData> <enhancedPassengerData> <enhancedTravellerInformation> <travellerNameInfo> <quantity>1</quantity> </travellerNameInfo> <otherPaxNamesDetails> <nameType>UN</nameType> <referenceName>Y</referenceName> <displayedName>Y</displayedName> <surname>JONES</surname> <givenName>AMANDA</givenName> </otherPaxNamesDetails> </enhancedTravellerInformation> </enhancedPassengerData> </travellerInfo> <originDestinationDetails> <originDestination></originDestination> <itineraryInfo> <elementManagementItinerary> <reference> <qualifier>ST</qualifier> <number>1</number> </reference> <segmentName>AIR</segmentName> <lineNumber>3</lineNumber> </elementManagementItinerary> <travelProduct> <product> <depDate>250213</depDate> <depTime>0630</depTime> <arrDate>250213</arrDate> <arrTime>0800</arrTime> </product> <boardpointDetail> <cityCode>NCE</cityCode> </boardpointDetail> <offpointDetail> <cityCode>CDG</cityCode> </offpointDetail> <companyDetail> <identification>6X</identification> </companyDetail> <productDetails> <identification>563</identification> <classOfService>Y</classOfService> </productDetails> <typeDetail> <detail>ET</detail> </typeDetail> </travelProduct> <itineraryMessageAction> <business> <function>1</function> </business> </itineraryMessageAction> <relatedProduct> <quantity>2</quantity> <status>HK</status> </relatedProduct> <flightDetail> <productDetails> <equipment>ERJ</equipment> <numOfStops>0</numOfStops> <weekDay>1</weekDay> </productDetails> </flightDetail> <selectionDetails> <selection> <option>P2</option> </selection> </selectionDetails> <markerRailTour></markerRailTour> </itineraryInfo> <itineraryInfo> <elementManagementItinerary> <reference> <qualifier>ST</qualifier> <number>3</number> </reference> <segmentName>AIR</segmentName> <lineNumber>4</lineNumber> </elementManagementItinerary> <travelProduct> <product> <depDate>070313</depDate> <depTime>0800</depTime> <arrDate>070313</arrDate> <arrTime>0920</arrTime> </product> <boardpointDetail> <cityCode>ORY</cityCode> </boardpointDetail> <offpointDetail> <cityCode>NCE</cityCode> </offpointDetail> <companyDetail> <identification>7S</identification> </companyDetail> <productDetails> <identification>4003</identification> <classOfService>Y</classOfService> </productDetails> <typeDetail> <detail>ET</detail> </typeDetail> </travelProduct> <itineraryMessageAction> <business> <function>1</function> </business> </itineraryMessageAction> <itineraryReservationInfo> <reservation> <companyId>7S</companyId> <controlNumber>5PPGFR</controlNumber> </reservation> </itineraryReservationInfo> <relatedProduct> <quantity>2</quantity> <status>HK</status> </relatedProduct> <flightDetail> <productDetails> <equipment>320</equipment> <numOfStops>0</numOfStops> <weekDay>4</weekDay> </productDetails> <departureInformation> <departTerminal>W</departTerminal> </departureInformation> <arrivalStationInfo> <terminal>2</terminal> </arrivalStationInfo> </flightDetail> <selectionDetails> <selection> <option>P2</option> </selection> </selectionDetails> <markerRailTour></markerRailTour> </itineraryInfo> </originDestinationDetails> <dataElementsMaster> <marker2></marker2> <dataElementsIndiv> <elementManagementData> <reference> <qualifier>OT</qualifier> <number>14</number> </reference> <segmentName>AP</segmentName> <lineNumber>5</lineNumber> </elementManagementData> <otherDataFreetext> <freetextDetail> <subjectQualifier>3</subjectQualifier> <type>5</type> </freetextDetail> <longFreetext>123456789</longFreetext> </otherDataFreetext> </dataElementsIndiv> <dataElementsIndiv> <elementManagementData> <reference> <qualifier>OT</qualifier> <number>13</number> </reference> <segmentName>TK</segmentName> <lineNumber>6</lineNumber> </elementManagementData> <ticketElement> <ticket> <indicator>OK</indicator> <date>240912</date> <officeId>MUC6X0701</officeId> </ticket> </ticketElement> </dataElementsIndiv> <dataElementsIndiv> <elementManagementData> <reference> <qualifier>OT</qualifier> <number>59</number> </reference> <segmentName>SSR</segmentName> <lineNumber>7</lineNumber> </elementManagementData> <serviceRequest> <ssr> <type>VGML</type> <status>NO</status> <quantity>2</quantity> <companyId>7S</companyId> <freeText>NOT SUPPORTED</freeText> </ssr> </serviceRequest> <elementsIndicators> <statusDetails> <indicator>CGB</indicator> </statusDetails> </elementsIndicators> <referenceForDataElement> <reference> <qualifier>ST</qualifier> <number>3</number> </reference> </referenceForDataElement> </dataElementsIndiv> <dataElementsIndiv> <elementManagementData> <reference> <qualifier>OT</qualifier> <number>15</number> </reference> <segmentName>RM</segmentName> <lineNumber>8</lineNumber> </elementManagementData> <miscellaneousRemarks> <remarks> <type>RM</type> <freetext>PAX P.JONES IS A VIP</freetext> </remarks> </miscellaneousRemarks> <extendedRemark> <structuredRemark> <type>RM</type> <freetext>PAX P.JONES IS A VIP</freetext> </structuredRemark> </extendedRemark> </dataElementsIndiv> </dataElementsMaster> </PNR\_Reply>

## 5.1.3 Possible Errors

See "Error Messages" section.

* * *

## 5.2 Operation: Cancel Element with reference number 14

This query is a request to Cancel the Contact element having the reference number 14 from the sample PNR.

The control number is the PNR Record locator number, whereas the action code 0 (zero) corresponds to a Cancel action only. The value 'E' declares the type of cancel entry, hence, to cancel an element. The 'OT' qualifier signifies the type of element(other) and the last item indicates the reference number of the element to be cancelled.

As a result, only the remaining items are listed in the reply.

Listed are the items that have been removed from the original PNR.

Reply - Data element

Value

/dataElementsMaster/dataElementsIndiv\[1\]/ elementManagementData/reference/ **qualifier**

OT

/dataElementsMaster/dataElementsIndiv\[1\]/ elementManagementData/reference/ **number**

14

/dataElementsMaster/dataElementsIndiv\[1\]/ elementManagementData/ **segmentName**

AP

/dataElementsMaster/dataElementsIndiv\[1\]/ elementManagementData/ **lineNumber**

4

/dataElementsMaster/dataElementsIndiv\[1\]/ otherDataFreetext/freetextDetail/ **subjectQualifier**

3

/dataElementsMaster/dataElementsIndiv\[1\]/ otherDataFreetext/freetextDetail/ **type**

5

/dataElementsMaster/dataElementsIndiv\[1\]/ otherDataFreetext/ **longFreetext**

123456789

## 5.2.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_Cancel xmlns="http://xml.amadeus.com/PNRXCL\_22\_1\_1A"> <pnrActions> <optionCode>0</optionCode> </pnrActions> <cancelElements> <entryType>E</entryType> <element> <identifier>OT</identifier> <number>14</number> </element> </cancelElements> </PNR\_Cancel>

## 5.2.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_Reply xmlns="http://xml.amadeus.com/PNRACC\_22\_1\_1A"> <pnrHeader> <reservationInfo> <reservation> <companyId>1A</companyId> <controlNumber>5PPGFR</controlNumber> <date>240912</date> <time>1631</time> </reservation> </reservationInfo> </pnrHeader> <securityInformation> <responsibilityInformation> <typeOfPnrElement>RP</typeOfPnrElement> <agentId>BMPR</agentId> <officeId>MUC6X0701</officeId> <iataCode>12345675</iataCode> </responsibilityInformation> <queueingInformation> <queueingOfficeId>MUC6X0701</queueingOfficeId> </queueingInformation> <cityCode>DAP</cityCode> <secondRpInformation> <creationOfficeId>MUC6X0701</creationOfficeId> <agentSignature>9999BM</agentSignature> <creationDate>240912</creationDate> <creatorIataCode>12345675</creatorIataCode> <creationTime>1629</creationTime> </secondRpInformation> </securityInformation> <freetextData> <freetextDetail> <subjectQualifier>3</subjectQualifier> <type>P12</type> </freetextDetail> <longFreetext>--- RLR ---</longFreetext> </freetextData> <pnrHeaderTag> <statusInformation> <indicator>RLR</indicator> </statusInformation> </pnrHeaderTag> <sbrPOSDetails> <sbrUserIdentificationOwn> <originIdentification> <originatorId>12345675</originatorId> <inHouseIdentification1>MUC6X0701</inHouseIdentification1> </originIdentification> <originatorTypeCode>A</originatorTypeCode> </sbrUserIdentificationOwn> <sbrSystemDetails> <deliveringSystem> <companyId>1A</companyId> <locationId>MUC</locationId> </deliveringSystem> </sbrSystemDetails> <sbrPreferences> <userPreferences> <codedCountry>DE</codedCountry> </userPreferences> </sbrPreferences> </sbrPOSDetails> <sbrCreationPosDetails> <sbrUserIdentificationOwn> <originIdentification> <originatorId>12345675</originatorId> <inHouseIdentification1>MUC6X0701</inHouseIdentification1> </originIdentification> <originatorTypeCode>A</originatorTypeCode> </sbrUserIdentificationOwn> <sbrSystemDetails> <deliveringSystem> <companyId>1A</companyId> <locationId>MUC</locationId> </deliveringSystem> </sbrSystemDetails> <sbrPreferences> <userPreferences> <codedCountry>DE</codedCountry> </userPreferences> </sbrPreferences> </sbrCreationPosDetails> <sbrUpdatorPosDetails> <sbrUserIdentificationOwn> <originIdentification> <originatorId>12345675</originatorId> <inHouseIdentification1>MUC6X0701</inHouseIdentification1> </originIdentification> <originatorTypeCode>A</originatorTypeCode> </sbrUserIdentificationOwn> <sbrSystemDetails> <deliveringSystem> <companyId>1A</companyId> <locationId>MUC</locationId> </deliveringSystem> </sbrSystemDetails> <sbrPreferences> <userPreferences> <codedCountry>DE</codedCountry> </userPreferences> </sbrPreferences> </sbrUpdatorPosDetails> <technicalData> <enveloppeNumberData> <sequenceDetails> <number>4</number> </sequenceDetails> </enveloppeNumberData> <lastTransmittedEnvelopeNumber> <currentRecord>3</currentRecord> </lastTransmittedEnvelopeNumber> <purgeDateData> <dateTime> <year>2013</year> <month>3</month> <day>7</day> </dateTime> </purgeDateData> <generalPNRInformation> <statusDetails> <isPNRModifDuringTrans>MOD</isPNRModifDuringTrans> </statusDetails> </generalPNRInformation> </technicalData> <travellerInfo> <elementManagementPassenger> <reference> <qualifier>PT</qualifier> <number>1</number> </reference> <segmentName>NM</segmentName> <lineNumber>1</lineNumber> </elementManagementPassenger> <passengerData> <travellerInformation> <traveller> <surname>JONES</surname> <quantity>1</quantity> </traveller> <passenger> <firstName>PETER</firstName> </passenger> </travellerInformation> </passengerData> <enhancedPassengerData> <enhancedTravellerInformation> <travellerNameInfo> <quantity>1</quantity> </travellerNameInfo> <otherPaxNamesDetails> <nameType>UN</nameType> <referenceName>Y</referenceName> <displayedName>Y</displayedName> <surname>JONES</surname> <givenName>PETER</givenName> </otherPaxNamesDetails> </enhancedTravellerInformation> </enhancedPassengerData> </travellerInfo> <travellerInfo> <elementManagementPassenger> <reference> <qualifier>PT</qualifier> <number>2</number> </reference> <segmentName>NM</segmentName> <lineNumber>2</lineNumber> </elementManagementPassenger> <passengerData> <travellerInformation> <traveller> <surname>JONES</surname> <quantity>1</quantity> </traveller> <passenger> <firstName>AMANDA</firstName> </passenger> </travellerInformation> </passengerData> <enhancedPassengerData> <enhancedTravellerInformation> <travellerNameInfo> <quantity>1</quantity> </travellerNameInfo> <otherPaxNamesDetails> <nameType>UN</nameType> <referenceName>Y</referenceName> <displayedName>Y</displayedName> <surname>JONES</surname> <givenName>AMANDA</givenName> </otherPaxNamesDetails> </enhancedTravellerInformation> </enhancedPassengerData> </travellerInfo> <originDestinationDetails> <originDestination></originDestination> <itineraryInfo> <elementManagementItinerary> <reference> <qualifier>ST</qualifier> <number>1</number> </reference> <segmentName>AIR</segmentName> <lineNumber>3</lineNumber> </elementManagementItinerary> <travelProduct> <product> <depDate>250213</depDate> <depTime>0630</depTime> <arrDate>250213</arrDate> <arrTime>0800</arrTime> </product> <boardpointDetail> <cityCode>NCE</cityCode> </boardpointDetail> <offpointDetail> <cityCode>CDG</cityCode> </offpointDetail> <companyDetail> <identification>6X</identification> </companyDetail> <productDetails> <identification>563</identification> <classOfService>Y</classOfService> </productDetails> <typeDetail> <detail>ET</detail> </typeDetail> </travelProduct> <itineraryMessageAction> <business> <function>1</function> </business> </itineraryMessageAction> <relatedProduct> <quantity>2</quantity> <status>HK</status> </relatedProduct> <flightDetail> <productDetails> <equipment>ERJ</equipment> <numOfStops>0</numOfStops> <weekDay>1</weekDay> </productDetails> </flightDetail> <selectionDetails> <selection> <option>P2</option> </selection> </selectionDetails> <markerRailTour></markerRailTour> </itineraryInfo> <itineraryInfo> <elementManagementItinerary> <reference> <qualifier>ST</qualifier> <number>3</number> </reference> <segmentName>AIR</segmentName> <lineNumber>4</lineNumber> </elementManagementItinerary> <travelProduct> <product> <depDate>070313</depDate> <depTime>0800</depTime> <arrDate>070313</arrDate> <arrTime>0920</arrTime> </product> <boardpointDetail> <cityCode>ORY</cityCode> </boardpointDetail> <offpointDetail> <cityCode>NCE</cityCode> </offpointDetail> <companyDetail> <identification>7S</identification> </companyDetail> <productDetails> <identification>4003</identification> <classOfService>Y</classOfService> </productDetails> <typeDetail> <detail>ET</detail> </typeDetail> </travelProduct> <itineraryMessageAction> <business> <function>1</function> </business> </itineraryMessageAction> <itineraryReservationInfo> <reservation> <companyId>7S</companyId> <controlNumber>5PPGFR</controlNumber> </reservation> </itineraryReservationInfo> <relatedProduct> <quantity>2</quantity> <status>HK</status> </relatedProduct> <flightDetail> <productDetails> <equipment>320</equipment> <numOfStops>0</numOfStops> <weekDay>4</weekDay> </productDetails> <departureInformation> <departTerminal>W</departTerminal> </departureInformation> <arrivalStationInfo> <terminal>2</terminal> </arrivalStationInfo> </flightDetail> <selectionDetails> <selection> <option>P2</option> </selection> </selectionDetails> <markerRailTour></markerRailTour> </itineraryInfo> </originDestinationDetails> <dataElementsMaster> <marker2></marker2> <dataElementsIndiv> <elementManagementData> <reference> <qualifier>OT</qualifier> <number>13</number> </reference> <segmentName>TK</segmentName> <lineNumber>5</lineNumber> </elementManagementData> <ticketElement> <ticket> <indicator>OK</indicator> <date>240912</date> <officeId>MUC6X0701</officeId> </ticket> </ticketElement> </dataElementsIndiv> <dataElementsIndiv> <elementManagementData> <reference> <qualifier>OT</qualifier> <number>59</number> </reference> <segmentName>SSR</segmentName> <lineNumber>6</lineNumber> </elementManagementData> <serviceRequest> <ssr> <type>VGML</type> <status>NO</status> <quantity>2</quantity> <companyId>7S</companyId> <freeText>NOT SUPPORTED</freeText> </ssr> </serviceRequest> <elementsIndicators> <statusDetails> <indicator>CGB</indicator> </statusDetails> </elementsIndicators> <referenceForDataElement> <reference> <qualifier>ST</qualifier> <number>3</number> </reference> </referenceForDataElement> </dataElementsIndiv> <dataElementsIndiv> <elementManagementData> <reference> <qualifier>OT</qualifier> <number>15</number> </reference> <segmentName>RM</segmentName> <lineNumber>7</lineNumber> </elementManagementData> <miscellaneousRemarks> <remarks> <type>RM</type> <freetext>PAX P.JONES IS A VIP</freetext> </remarks> </miscellaneousRemarks> <extendedRemark> <structuredRemark> <type>RM</type> <freetext>PAX P.JONES IS A VIP</freetext> </structuredRemark> </extendedRemark> </dataElementsIndiv> </dataElementsMaster> </PNR\_Reply>

## 5.2.3 Possible Errors

See "Error Messages" section.

* * *

## 5.3 Operation: Cancel Elements in PNR

This query is a request to cancel two elements (the special service request for a vegetarian meal and the remark) in the sample PNR given previously. This time, the PNR is not already in context and it is retrieved in the Cancel request.

The reply returned is the same as the example Cancel Element; the only difference is that the query uses a Record Locator to retrieve the PNR.

## 5.3.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_Cancel xmlns="http://xml.amadeus.com/PNRXCL\_22\_1\_1A"> <reservationInfo> <reservation> <controlNumber>5PPGFR</controlNumber> </reservation> </reservationInfo> <pnrActions> <optionCode>0</optionCode> </pnrActions> <cancelElements> <entryType>E</entryType> <element> <identifier>OT</identifier> <number>15</number> </element> <element> <identifier>OT</identifier> <number>59</number> </element> </cancelElements> </PNR\_Cancel>

## 5.3.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_Reply xmlns="http://xml.amadeus.com/PNRACC\_22\_1\_1A"> <pnrHeader> <reservationInfo> <reservation> <companyId>1A</companyId> <controlNumber>5PPGFR</controlNumber> <date>240912</date> <time>1631</time> </reservation> </reservationInfo> </pnrHeader> <securityInformation> <responsibilityInformation> <typeOfPnrElement>RP</typeOfPnrElement> <agentId>BMPR</agentId> <officeId>MUC1A0701</officeId> <iataCode>12345675</iataCode> </responsibilityInformation> <queueingInformation> <queueingOfficeId>MUC1A0701</queueingOfficeId> </queueingInformation> <cityCode>DAP</cityCode> <secondRpInformation> <creationOfficeId>MUC1A0701</creationOfficeId> <agentSignature>9999BM</agentSignature> <creationDate>240912</creationDate> <creatorIataCode>12345675</creatorIataCode> <creationTime>1629</creationTime> </secondRpInformation> </securityInformation> <freetextData> <freetextDetail> <subjectQualifier>3</subjectQualifier> <type>P12</type> </freetextDetail> <longFreetext>--- RLR ---</longFreetext> </freetextData> <pnrHeaderTag> <statusInformation> <indicator>RLR</indicator> </statusInformation> </pnrHeaderTag> <sbrPOSDetails> <sbrUserIdentificationOwn> <originIdentification> <originatorId>12345675</originatorId> <inHouseIdentification1>MUC1A0701</inHouseIdentification1> </originIdentification> <originatorTypeCode>A</originatorTypeCode> </sbrUserIdentificationOwn> <sbrSystemDetails> <deliveringSystem> <companyId>1A</companyId> <locationId>MUC</locationId> </deliveringSystem> </sbrSystemDetails> <sbrPreferences> <userPreferences> <codedCountry>DE</codedCountry> </userPreferences> </sbrPreferences> </sbrPOSDetails> <sbrCreationPosDetails> <sbrUserIdentificationOwn> <originIdentification> <originatorId>12345675</originatorId> <inHouseIdentification1>MUC1A0701</inHouseIdentification1> </originIdentification> <originatorTypeCode>A</originatorTypeCode> </sbrUserIdentificationOwn> <sbrSystemDetails> <deliveringSystem> <companyId>1A</companyId> <locationId>MUC</locationId> </deliveringSystem> </sbrSystemDetails> <sbrPreferences> <userPreferences> <codedCountry>DE</codedCountry> </userPreferences> </sbrPreferences> </sbrCreationPosDetails> <sbrUpdatorPosDetails> <sbrUserIdentificationOwn> <originIdentification> <originatorId>12345675</originatorId> <inHouseIdentification1>MUC1A0701</inHouseIdentification1> </originIdentification> <originatorTypeCode>A</originatorTypeCode> </sbrUserIdentificationOwn> <sbrSystemDetails> <deliveringSystem> <companyId>1A</companyId> <locationId>MUC</locationId> </deliveringSystem> </sbrSystemDetails> <sbrPreferences> <userPreferences> <codedCountry>DE</codedCountry> </userPreferences> </sbrPreferences> </sbrUpdatorPosDetails> <technicalData> <enveloppeNumberData> <sequenceDetails> <number>4</number> </sequenceDetails> </enveloppeNumberData> <lastTransmittedEnvelopeNumber> <currentRecord>3</currentRecord> </lastTransmittedEnvelopeNumber> <purgeDateData> <dateTime> <year>2013</year> <month>3</month> <day>7</day> </dateTime> </purgeDateData> </technicalData> <travellerInfo> <elementManagementPassenger> <reference> <qualifier>PT</qualifier> <number>1</number> </reference> <segmentName>NM</segmentName> <lineNumber>1</lineNumber> </elementManagementPassenger> <passengerData> <travellerInformation> <traveller> <surname>JONES</surname> <quantity>1</quantity> </traveller> <passenger> <firstName>PETER</firstName> </passenger> </travellerInformation> </passengerData> <enhancedPassengerData> <enhancedTravellerInformation> <travellerNameInfo> <quantity>1</quantity> </travellerNameInfo> <otherPaxNamesDetails> <nameType>UN</nameType> <referenceName>Y</referenceName> <displayedName>Y</displayedName> <surname>JONES</surname> <givenName>PETER</givenName> </otherPaxNamesDetails> </enhancedTravellerInformation> </enhancedPassengerData> </travellerInfo> <travellerInfo> <elementManagementPassenger> <reference> <qualifier>PT</qualifier> <number>2</number> </reference> <segmentName>NM</segmentName> <lineNumber>2</lineNumber> </elementManagementPassenger> <passengerData> <travellerInformation> <traveller> <surname>JONES</surname> <quantity>1</quantity> </traveller> <passenger> <firstName>AMANDA</firstName> </passenger> </travellerInformation> </passengerData> <enhancedPassengerData> <enhancedTravellerInformation> <travellerNameInfo> <quantity>1</quantity> </travellerNameInfo> <otherPaxNamesDetails> <nameType>UN</nameType> <referenceName>Y</referenceName> <displayedName>Y</displayedName> <surname>JONES</surname> <givenName>AMANDA</givenName> </otherPaxNamesDetails> </enhancedTravellerInformation> </enhancedPassengerData> </travellerInfo> <originDestinationDetails> <originDestination></originDestination> <itineraryInfo> <elementManagementItinerary> <reference> <qualifier>ST</qualifier> <number>1</number> </reference> <segmentName>AIR</segmentName> <lineNumber>3</lineNumber> </elementManagementItinerary> <travelProduct> <product> <depDate>250213</depDate> <depTime>0630</depTime> <arrDate>250213</arrDate> <arrTime>0800</arrTime> </product> <boardpointDetail> <cityCode>NCE</cityCode> </boardpointDetail> <offpointDetail> <cityCode>CDG</cityCode> </offpointDetail> <companyDetail> <identification>6X</identification> </companyDetail> <productDetails> <identification>563</identification> <classOfService>Y</classOfService> </productDetails> <typeDetail> <detail>ET</detail> </typeDetail> </travelProduct> <itineraryMessageAction> <business> <function>1</function> </business> </itineraryMessageAction> <relatedProduct> <quantity>2</quantity> <status>HK</status> </relatedProduct> <flightDetail> <productDetails> <equipment>ERJ</equipment> <numOfStops>0</numOfStops> <weekDay>1</weekDay> </productDetails> </flightDetail> <selectionDetails> <selection> <option>P2</option> </selection> </selectionDetails> <markerRailTour></markerRailTour> </itineraryInfo> <itineraryInfo> <elementManagementItinerary> <reference> <qualifier>ST</qualifier> <number>3</number> </reference> <segmentName>AIR</segmentName> <lineNumber>4</lineNumber> </elementManagementItinerary> <travelProduct> <product> <depDate>070313</depDate> <depTime>0800</depTime> <arrDate>070313</arrDate> <arrTime>0920</arrTime> </product> <boardpointDetail> <cityCode>ORY</cityCode> </boardpointDetail> <offpointDetail> <cityCode>NCE</cityCode> </offpointDetail> <companyDetail> <identification>7S</identification> </companyDetail> <productDetails> <identification>4003</identification> <classOfService>Y</classOfService> </productDetails> <typeDetail> <detail>ET</detail> </typeDetail> </travelProduct> <itineraryMessageAction> <business> <function>1</function> </business> </itineraryMessageAction> <itineraryReservationInfo> <reservation> <companyId>7S</companyId> <controlNumber>5PPGFR</controlNumber> </reservation> </itineraryReservationInfo> <relatedProduct> <quantity>2</quantity> <status>HK</status> </relatedProduct> <flightDetail> <productDetails> <equipment>320</equipment> <numOfStops>0</numOfStops> <weekDay>4</weekDay> </productDetails> <departureInformation> <departTerminal>W</departTerminal> </departureInformation> <arrivalStationInfo> <terminal>2</terminal> </arrivalStationInfo> </flightDetail> <selectionDetails> <selection> <option>P2</option> </selection> </selectionDetails> <markerRailTour></markerRailTour> </itineraryInfo> </originDestinationDetails> <dataElementsMaster> <marker2></marker2> <dataElementsIndiv> <elementManagementData> <reference> <qualifier>OT</qualifier> <number>14</number> </reference> <segmentName>AP</segmentName> <lineNumber>5</lineNumber> </elementManagementData> <otherDataFreetext> <freetextDetail> <subjectQualifier>3</subjectQualifier> <type>5</type> </freetextDetail> <longFreetext>123456789</longFreetext> </otherDataFreetext> </dataElementsIndiv> <dataElementsIndiv> <elementManagementData> <reference> <qualifier>OT</qualifier> <number>13</number> </reference> <segmentName>TK</segmentName> <lineNumber>6</lineNumber> </elementManagementData> <ticketElement> <ticket> <indicator>OK</indicator> <date>240912</date> <officeId>MUC1A0701</officeId> </ticket> </ticketElement> </dataElementsIndiv> <dataElementsIndiv> <elementManagementData> <reference> <qualifier>OT</qualifier> <number>59</number> </reference> <segmentName>SSR</segmentName> <lineNumber>7</lineNumber> </elementManagementData> <serviceRequest> <ssr> <type>VGML</type> <status>NO</status> <quantity>2</quantity> <companyId>7S</companyId> <freeText>NOT SUPPORTED</freeText> </ssr> </serviceRequest> <elementsIndicators> <statusDetails> <indicator>CGB</indicator> </statusDetails> </elementsIndicators> <referenceForDataElement> <reference> <qualifier>ST</qualifier> <number>3</number> </reference> </referenceForDataElement> </dataElementsIndiv> <dataElementsIndiv> <elementManagementData> <reference> <qualifier>OT</qualifier> <number>15</number> </reference> <segmentName>RM</segmentName> <lineNumber>8</lineNumber> </elementManagementData> <miscellaneousRemarks> <remarks> <type>RM</type> <freetext>PAX P.JONES IS A VIP</freetext> </remarks> </miscellaneousRemarks> <extendedRemark> <structuredRemark> <type>RM</type> <freetext>PAX P.JONES IS A VIP</freetext> </structuredRemark> </extendedRemark> </dataElementsIndiv> </dataElementsMaster> </PNR\_Reply>

## 5.3.3 Possible Errors

1935 - ELEMENT CONFLICT

This error is received when there is an attempt to delete different element types in the same message.

* * *

## 5.4 Operation: Cancel Elements, End Transaction

This query is a request to cancel two elements (a special service request for a vegetarian meal and a remark) in the example PNR given previously. The difference compared to the previous example is that the PNR action code value is set to 10, which indicates that, regardless of the operation on the PNR, an End of Transaction command will be automatically performed by the application. After this cancel query, the PNR now contains the following elements:

-   2 passenger names
-   2 flights
-   1 phone
-   1 ticket

## 5.4.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_Cancel xmlns="http://xml.amadeus.com/PNRXCL\_22\_1\_1A"> <reservationInfo> <reservation> <controlNumber>5PPGFR</controlNumber> </reservation> </reservationInfo> <pnrActions> <optionCode>10</optionCode> </pnrActions> <cancelElements> <entryType>E</entryType> <element> <identifier>OT</identifier> <number>15</number> </element> <element> <identifier>OT</identifier> <number>59</number> </element> </cancelElements> </PNR\_Cancel>

## 5.4.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_Reply xmlns="http://xml.amadeus.com/PNRACC\_22\_1\_1A"> <pnrHeader> <reservationInfo> <reservation> <companyId>1A</companyId> <controlNumber>5PPGFR</controlNumber> <date>240912</date> <time>1648</time> </reservation> </reservationInfo> </pnrHeader> <securityInformation> <responsibilityInformation> <typeOfPnrElement>RP</typeOfPnrElement> <agentId>BMPR</agentId> <officeId>MUC6X0701</officeId> <iataCode>12345675</iataCode> </responsibilityInformation> <queueingInformation> <queueingOfficeId>MUC6X0701</queueingOfficeId> </queueingInformation> <cityCode>DAP</cityCode> <secondRpInformation> <creationOfficeId>MUC1A0701</creationOfficeId> <agentSignature>9999BM</agentSignature> <creationDate>240912</creationDate> <creatorIataCode>12345675</creatorIataCode> <creationTime>1629</creationTime> </secondRpInformation> </securityInformation> <freetextData> <freetextDetail> <subjectQualifier>3</subjectQualifier> <type>P12</type> </freetextDetail> <longFreetext>--- RLR ---</longFreetext> </freetextData> <pnrHeaderTag> <statusInformation> <indicator>RLR</indicator> </statusInformation> </pnrHeaderTag> <sbrPOSDetails> <sbrUserIdentificationOwn> <originIdentification> <originatorId>12345675</originatorId> <inHouseIdentification1>MUC6X0701</inHouseIdentification1> </originIdentification> <originatorTypeCode>A</originatorTypeCode> </sbrUserIdentificationOwn> <sbrSystemDetails> <deliveringSystem> <companyId>1A</companyId> <locationId>MUC</locationId> </deliveringSystem> </sbrSystemDetails> <sbrPreferences> <userPreferences> <codedCountry>DE</codedCountry> </userPreferences> </sbrPreferences> </sbrPOSDetails> <sbrCreationPosDetails> <sbrUserIdentificationOwn> <originIdentification> <originatorId>12345675</originatorId> <inHouseIdentification1>MUC6X0701</inHouseIdentification1> </originIdentification> <originatorTypeCode>A</originatorTypeCode> </sbrUserIdentificationOwn> <sbrSystemDetails> <deliveringSystem> <companyId>1A</companyId> <locationId>MUC</locationId> </deliveringSystem> </sbrSystemDetails> <sbrPreferences> <userPreferences> <codedCountry>DE</codedCountry> </userPreferences> </sbrPreferences> </sbrCreationPosDetails> <sbrUpdatorPosDetails> <sbrUserIdentificationOwn> <originIdentification> <originatorId>12345675</originatorId> <inHouseIdentification1>MUC6X0701</inHouseIdentification1> </originIdentification> <originatorTypeCode>A</originatorTypeCode> </sbrUserIdentificationOwn> <sbrSystemDetails> <deliveringSystem> <companyId>1A</companyId> <locationId>MUC</locationId> </deliveringSystem> </sbrSystemDetails> <sbrPreferences> <userPreferences> <codedCountry>DE</codedCountry> </userPreferences> </sbrPreferences> </sbrUpdatorPosDetails> <technicalData> <enveloppeNumberData> <sequenceDetails> <number>5</number> </sequenceDetails> </enveloppeNumberData> <lastTransmittedEnvelopeNumber> <currentRecord>4</currentRecord> </lastTransmittedEnvelopeNumber> <purgeDateData> <dateTime> <year>2013</year> <month>3</month> <day>7</day> </dateTime> </purgeDateData> </technicalData> <travellerInfo> <elementManagementPassenger> <reference> <qualifier>PT</qualifier> <number>1</number> </reference> <segmentName>NM</segmentName> <lineNumber>1</lineNumber> </elementManagementPassenger> <passengerData> <travellerInformation> <traveller> <surname>JONES</surname> <quantity>1</quantity> </traveller> <passenger> <firstName>PETER</firstName> </passenger> </travellerInformation> </passengerData> <enhancedPassengerData> <enhancedTravellerInformation> <travellerNameInfo> <quantity>1</quantity> </travellerNameInfo> <otherPaxNamesDetails> <nameType>UN</nameType> <referenceName>Y</referenceName> <displayedName>Y</displayedName> <surname>JONES</surname> <givenName>PETER</givenName> </otherPaxNamesDetails> </enhancedTravellerInformation> </enhancedPassengerData> </travellerInfo> <travellerInfo> <elementManagementPassenger> <reference> <qualifier>PT</qualifier> <number>2</number> </reference> <segmentName>NM</segmentName> <lineNumber>2</lineNumber> </elementManagementPassenger> <passengerData> <travellerInformation> <traveller> <surname>JONES</surname> <quantity>1</quantity> </traveller> <passenger> <firstName>AMANDA</firstName> </passenger> </travellerInformation> </passengerData> <enhancedPassengerData> <enhancedTravellerInformation> <travellerNameInfo> <quantity>1</quantity> </travellerNameInfo> <otherPaxNamesDetails> <nameType>UN</nameType> <referenceName>Y</referenceName> <displayedName>Y</displayedName> <surname>JONES</surname> <givenName>AMANDA</givenName> </otherPaxNamesDetails> </enhancedTravellerInformation> </enhancedPassengerData> </travellerInfo> <originDestinationDetails> <originDestination></originDestination> <itineraryInfo> <elementManagementItinerary> <reference> <qualifier>ST</qualifier> <number>1</number> </reference> <segmentName>AIR</segmentName> <lineNumber>3</lineNumber> </elementManagementItinerary> <travelProduct> <product> <depDate>250213</depDate> <depTime>0630</depTime> <arrDate>250213</arrDate> <arrTime>0800</arrTime> </product> <boardpointDetail> <cityCode>NCE</cityCode> </boardpointDetail> <offpointDetail> <cityCode>CDG</cityCode> </offpointDetail> <companyDetail> <identification>6X</identification> </companyDetail> <productDetails> <identification>563</identification> <classOfService>Y</classOfService> </productDetails> <typeDetail> <detail>ET</detail> </typeDetail> </travelProduct> <itineraryMessageAction> <business> <function>1</function> </business> </itineraryMessageAction> <relatedProduct> <quantity>2</quantity> <status>HK</status> </relatedProduct> <flightDetail> <productDetails> <equipment>ERJ</equipment> <numOfStops>0</numOfStops> <weekDay>1</weekDay> </productDetails> </flightDetail> <selectionDetails> <selection> <option>P2</option> </selection> </selectionDetails> <markerRailTour></markerRailTour> </itineraryInfo> <itineraryInfo> <elementManagementItinerary> <reference> <qualifier>ST</qualifier> <number>3</number> </reference> <segmentName>AIR</segmentName> <lineNumber>4</lineNumber> </elementManagementItinerary> <travelProduct> <product> <depDate>070313</depDate> <depTime>0800</depTime> <arrDate>070313</arrDate> <arrTime>0920</arrTime> </product> <boardpointDetail> <cityCode>ORY</cityCode> </boardpointDetail> <offpointDetail> <cityCode>NCE</cityCode> </offpointDetail> <companyDetail> <identification>7S</identification> </companyDetail> <productDetails> <identification>4003</identification> <classOfService>Y</classOfService> </productDetails> <typeDetail> <detail>ET</detail> </typeDetail> </travelProduct> <itineraryMessageAction> <business> <function>1</function> </business> </itineraryMessageAction> <itineraryReservationInfo> <reservation> <companyId>7S</companyId> <controlNumber>5PPGFR</controlNumber> </reservation> </itineraryReservationInfo> <relatedProduct> <quantity>2</quantity> <status>HK</status> </relatedProduct> <flightDetail> <productDetails> <equipment>320</equipment> <numOfStops>0</numOfStops> <weekDay>4</weekDay> </productDetails> <departureInformation> <departTerminal>W</departTerminal> </departureInformation> <arrivalStationInfo> <terminal>2</terminal> </arrivalStationInfo> </flightDetail> <selectionDetails> <selection> <option>P2</option> </selection> </selectionDetails> <markerRailTour></markerRailTour> </itineraryInfo> </originDestinationDetails> <dataElementsMaster> <marker2></marker2> <dataElementsIndiv> <elementManagementData> <reference> <qualifier>OT</qualifier> <number>14</number> </reference> <segmentName>AP</segmentName> <lineNumber>5</lineNumber> </elementManagementData> <otherDataFreetext> <freetextDetail> <subjectQualifier>3</subjectQualifier> <type>5</type> </freetextDetail> <longFreetext>123456789</longFreetext> </otherDataFreetext> </dataElementsIndiv> <dataElementsIndiv> <elementManagementData> <reference> <qualifier>OT</qualifier> <number>13</number> </reference> <segmentName>TK</segmentName> <lineNumber>6</lineNumber> </elementManagementData> <ticketElement> <ticket> <indicator>OK</indicator> <date>240912</date> <officeId>MUC6X0701</officeId> </ticket> </ticketElement> </dataElementsIndiv> </dataElementsMaster> </PNR\_Reply>

## 5.4.3 Possible Errors

See "Error Messages" section.

* * *

## 5.5 Operation: Cancel Entire Itinerary

To summarise, an itinerary is a list of a passenger's travel arrangements. It can include flight, hotel, and car rental information, and any other miscellaneous information.

The query below is a request to cancel the entire itinerary from the PNR 5PPGFR. The value used to cancel an itinerary is the letter 'I'. The PNR option code is set to 0, which means that no special processing is performed apart from the cancel query. Unless an end of transaction is performed, the changes are not going to be saved in the PNR history.

## 5.5.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_Cancel xmlns="http://xml.amadeus.com/PNRXCL\_22\_1\_1A"> <pnrActions> <optionCode>0</optionCode> </pnrActions> <cancelElements> <entryType>I</entryType> </cancelElements> </PNR\_Cancel>

## 5.5.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_Reply xmlns="http://xml.amadeus.com/PNRACC\_22\_1\_1A"> <pnrHeader> <reservationInfo> <reservation> <companyId>1A</companyId> <controlNumber>5PPGFR</controlNumber> <date>240912</date> <time>1648</time> </reservation> </reservationInfo> </pnrHeader> <securityInformation> <responsibilityInformation> <typeOfPnrElement>RP</typeOfPnrElement> <agentId>BMPR</agentId> <officeId>MUC6X0701</officeId> <iataCode>12345675</iataCode> </responsibilityInformation> <queueingInformation> <queueingOfficeId>MUC6X0701</queueingOfficeId> </queueingInformation> <cityCode>DAP</cityCode> <secondRpInformation> <creationOfficeId>MUC6X0701</creationOfficeId> <agentSignature>9999BM</agentSignature> <creationDate>240912</creationDate> <creatorIataCode>12345675</creatorIataCode> <creationTime>1629</creationTime> </secondRpInformation> </securityInformation> <freetextData> <freetextDetail> <subjectQualifier>3</subjectQualifier> <type>P12</type> </freetextDetail> <longFreetext>--- RLR ---</longFreetext> </freetextData> <pnrHeaderTag> <statusInformation> <indicator>RLR</indicator> </statusInformation> </pnrHeaderTag> <sbrPOSDetails> <sbrUserIdentificationOwn> <originIdentification> <originatorId>12345675</originatorId> <inHouseIdentification1>MUC6X0701</inHouseIdentification1> </originIdentification> <originatorTypeCode>A</originatorTypeCode> </sbrUserIdentificationOwn> <sbrSystemDetails> <deliveringSystem> <companyId>1A</companyId> <locationId>MUC</locationId> </deliveringSystem> </sbrSystemDetails> <sbrPreferences> <userPreferences> <codedCountry>DE</codedCountry> </userPreferences> </sbrPreferences> </sbrPOSDetails> <sbrCreationPosDetails> <sbrUserIdentificationOwn> <originIdentification> <originatorId>12345675</originatorId> <inHouseIdentification1>MUC6X0701</inHouseIdentification1> </originIdentification> <originatorTypeCode>A</originatorTypeCode> </sbrUserIdentificationOwn> <sbrSystemDetails> <deliveringSystem> <companyId>1A</companyId> <locationId>MUC</locationId> </deliveringSystem> </sbrSystemDetails> <sbrPreferences> <userPreferences> <codedCountry>DE</codedCountry> </userPreferences> </sbrPreferences> </sbrCreationPosDetails> <sbrUpdatorPosDetails> <sbrUserIdentificationOwn> <originIdentification> <originatorId>12345675</originatorId> <inHouseIdentification1>MUC6X0701</inHouseIdentification1> </originIdentification> <originatorTypeCode>A</originatorTypeCode> </sbrUserIdentificationOwn> <sbrSystemDetails> <deliveringSystem> <companyId>1A</companyId> <locationId>MUC</locationId> </deliveringSystem> </sbrSystemDetails> <sbrPreferences> <userPreferences> <codedCountry>DE</codedCountry> </userPreferences> </sbrPreferences> </sbrUpdatorPosDetails> <technicalData> <enveloppeNumberData> <sequenceDetails> <number>5</number> </sequenceDetails> </enveloppeNumberData> <lastTransmittedEnvelopeNumber> <currentRecord>4</currentRecord> </lastTransmittedEnvelopeNumber> <purgeDateData> <dateTime> <year>2013</year> <month>3</month> <day>7</day> </dateTime> </purgeDateData> <generalPNRInformation> <statusDetails> <isPNRModifDuringTrans>MOD</isPNRModifDuringTrans> </statusDetails> </generalPNRInformation> </technicalData> <travellerInfo> <elementManagementPassenger> <reference> <qualifier>PT</qualifier> <number>1</number> </reference> <segmentName>NM</segmentName> <lineNumber>1</lineNumber> </elementManagementPassenger> <passengerData> <travellerInformation> <traveller> <surname>JONES</surname> <quantity>1</quantity> </traveller> <passenger> <firstName>PETER</firstName> </passenger> </travellerInformation> </passengerData> <enhancedPassengerData> <enhancedTravellerInformation> <travellerNameInfo> <quantity>1</quantity> </travellerNameInfo> <otherPaxNamesDetails> <nameType>UN</nameType> <referenceName>Y</referenceName> <displayedName>Y</displayedName> <surname>JONES</surname> <givenName>PETER</givenName> </otherPaxNamesDetails> </enhancedTravellerInformation> </enhancedPassengerData> </travellerInfo> <travellerInfo> <elementManagementPassenger> <reference> <qualifier>PT</qualifier> <number>2</number> </reference> <segmentName>NM</segmentName> <lineNumber>2</lineNumber> </elementManagementPassenger> <passengerData> <travellerInformation> <traveller> <surname>JONES</surname> <quantity>1</quantity> </traveller> <passenger> <firstName>AMANDA</firstName> </passenger> </travellerInformation> </passengerData> <enhancedPassengerData> <enhancedTravellerInformation> <travellerNameInfo> <quantity>1</quantity> </travellerNameInfo> <otherPaxNamesDetails> <nameType>UN</nameType> <referenceName>Y</referenceName> <displayedName>Y</displayedName> <surname>JONES</surname> <givenName>AMANDA</givenName> </otherPaxNamesDetails> </enhancedTravellerInformation> </enhancedPassengerData> </travellerInfo> <dataElementsMaster> <marker2></marker2> <dataElementsIndiv> <elementManagementData> <reference> <qualifier>OT</qualifier> <number>14</number> </reference> <segmentName>AP</segmentName> <lineNumber>3</lineNumber> </elementManagementData> <otherDataFreetext> <freetextDetail> <subjectQualifier>3</subjectQualifier> <type>5</type> </freetextDetail> <longFreetext>123456789</longFreetext> </otherDataFreetext> </dataElementsIndiv> <dataElementsIndiv> <elementManagementData> <reference> <qualifier>OT</qualifier> <number>66</number> </reference> <segmentName>TK</segmentName> <lineNumber>4</lineNumber> </elementManagementData> <ticketElement> <ticket> <indicator>OK</indicator> <date>240912</date> <officeId>MUC6X0701</officeId> </ticket> </ticketElement> </dataElementsIndiv> </dataElementsMaster> </PNR\_Reply>

## 5.5.3 Possible Errors

See "Error Messages" section.

* * *

## 5.6 Operation: Cancel ES element

An Individual Security Element (ES element) can be deleted at any time during the creation of the PNR, by the Creator Office, or during the modification of the PNR, by the Office of Responsibility. 

ES element cancel can be done specifying receiver type G, I, and P.

Context: In this example, a PNR 5PPGFR contains an ES element with receiver type: G, P, and I.

Query: The Cancel query is sent for cancelling ES element

Reply: In the Reply, ES elements is deleted.

## 5.6.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_Cancel xmlns="http://xml.amadeus.com/PNRXCL\_22\_1\_1A"> <reservationInfo> <reservation> <controlNumber>5PPGFR</controlNumber> </reservation> </reservationInfo> <pnrActions> <optionCode>0</optionCode> </pnrActions> <cancelElements> <entryType>S</entryType> </cancelElements> </PNR\_Cancel>

## 5.6.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_Reply xmlns="http://xml.amadeus.com/PNRACC\_22\_1\_1A"> <pnrHeader> <reservationInfo> <reservation> <companyId>1A</companyId> <controlNumber>6GX8FU</controlNumber> <date>240614</date> <time>1732</time> </reservation> </reservationInfo> </pnrHeader> <securityInformation> <responsibilityInformation> <typeOfPnrElement>RP</typeOfPnrElement> <agentId>AASU</agentId> <officeId>MUC1A0701</officeId> </responsibilityInformation> <queueingInformation> <queueingOfficeId>MUC1A0701</queueingOfficeId> </queueingInformation> <cityCode>DAP</cityCode> <secondRpInformation> <creationOfficeId>MUC1A0701</creationOfficeId> <agentSignature>0001AA</agentSignature> <creationDate>240614</creationDate> <creationTime>1649</creationTime> </secondRpInformation> </securityInformation> <freetextData> <freetextDetail> <subjectQualifier>3</subjectQualifier> <type>P12</type> </freetextDetail> <longFreetext>--- RLR ---</longFreetext> </freetextData> <pnrHeaderTag> <statusInformation> <indicator>RLR</indicator> </statusInformation> </pnrHeaderTag> <sbrPOSDetails> <sbrUserIdentificationOwn> <originIdentification> <inHouseIdentification1>MUC1A0701</inHouseIdentification1> </originIdentification> <originatorTypeCode>A</originatorTypeCode> </sbrUserIdentificationOwn> <sbrSystemDetails> <deliveringSystem> <companyId>1A</companyId> <locationId>MUC</locationId> </deliveringSystem> </sbrSystemDetails> <sbrPreferences> <userPreferences> <codedCountry>DE</codedCountry> </userPreferences> </sbrPreferences> </sbrPOSDetails> <sbrCreationPosDetails> <sbrUserIdentificationOwn> <originIdentification> <inHouseIdentification1>MUC1A0701</inHouseIdentification1> </originIdentification> <originatorTypeCode>E</originatorTypeCode> </sbrUserIdentificationOwn> <sbrSystemDetails> <deliveringSystem> <companyId>1A</companyId> <locationId>MUC</locationId> </deliveringSystem> </sbrSystemDetails> <sbrPreferences> <userPreferences> <codedCountry>DE</codedCountry> </userPreferences> </sbrPreferences> </sbrCreationPosDetails> <sbrUpdatorPosDetails> <sbrUserIdentificationOwn> <originIdentification> <originatorId>53458263</originatorId> <inHouseIdentification1>NCE1A0990</inHouseIdentification1> </originIdentification> <originatorTypeCode>A</originatorTypeCode> </sbrUserIdentificationOwn> <sbrSystemDetails> <deliveringSystem> <companyId>1A</companyId> <locationId>NCE</locationId> </deliveringSystem> </sbrSystemDetails> <sbrPreferences> <userPreferences> <codedCountry>FR</codedCountry> </userPreferences> </sbrPreferences> </sbrUpdatorPosDetails> <technicalData> <enveloppeNumberData> <sequenceDetails> <number>6</number> </sequenceDetails> </enveloppeNumberData> <lastTransmittedEnvelopeNumber> <currentRecord>5</currentRecord> </lastTransmittedEnvelopeNumber> <purgeDateData> <dateTime> <year>2014</year> <month>12</month> <day>4</day> </dateTime> </purgeDateData> </technicalData> <travellerInfo> <elementManagementPassenger> <reference> <qualifier>PT</qualifier> <number>2</number> </reference> <segmentName>NM</segmentName> <lineNumber>1</lineNumber> </elementManagementPassenger> <passengerData> <travellerInformation> <traveller> <surname>SMITH</surname> <quantity>1</quantity> </traveller> <passenger> <firstName>ROBERT MR</firstName> </passenger> </travellerInformation> </passengerData> <enhancedPassengerData> <enhancedTravellerInformation> <travellerNameInfo> <quantity>1</quantity> </travellerNameInfo> <otherPaxNamesDetails> <nameType>UN</nameType> <referenceName>Y</referenceName> <displayedName>Y</displayedName> <surname>SMITH</surname> <givenName>ROBERT MR</givenName> </otherPaxNamesDetails> </enhancedTravellerInformation> </enhancedPassengerData> </travellerInfo> <originDestinationDetails> <originDestination></originDestination> <itineraryInfo> <elementManagementItinerary> <reference> <qualifier>ST</qualifier> <number>1</number> </reference> <segmentName>AIR</segmentName> <lineNumber>2</lineNumber> </elementManagementItinerary> <travelProduct> <product> <depDate>041214</depDate> <depTime>1100</depTime> <arrDate>041214</arrDate> <arrTime>1350</arrTime> </product> <boardpointDetail> <cityCode>LHR</cityCode> </boardpointDetail> <offpointDetail> <cityCode>JFK</cityCode> </offpointDetail> <companyDetail> <identification>6X</identification> </companyDetail> <productDetails> <identification>175</identification> <classOfService>Y</classOfService> </productDetails> <typeDetail> <detail>ET</detail> </typeDetail> </travelProduct> <itineraryMessageAction> <business> <function>1</function> </business> </itineraryMessageAction> <relatedProduct> <quantity>1</quantity> <status>HK</status> </relatedProduct> <flightDetail> <productDetails> <equipment>744</equipment> <numOfStops>0</numOfStops> <weekDay>4</weekDay> </productDetails> <departureInformation> <departTerminal>4</departTerminal> </departureInformation> <arrivalStationInfo> <terminal>7</terminal> </arrivalStationInfo> </flightDetail> <selectionDetails> <selection> <option>P2</option> </selection> </selectionDetails> <markerRailTour></markerRailTour> </itineraryInfo> </originDestinationDetails> <dataElementsMaster> <marker2></marker2> <dataElementsIndiv> <elementManagementData> <reference> <qualifier>OT</qualifier> <number>8</number> </reference> <segmentName>AP</segmentName> <lineNumber>3</lineNumber> </elementManagementData> <otherDataFreetext> <freetextDetail> <subjectQualifier>3</subjectQualifier> <type>5</type> </freetextDetail> <longFreetext>12345678</longFreetext> </otherDataFreetext> </dataElementsIndiv> <dataElementsIndiv> <elementManagementData> <reference> <qualifier>OT</qualifier> <number>9</number> </reference> <segmentName>TK</segmentName> <lineNumber>4</lineNumber> </elementManagementData> <ticketElement> <ticket> <indicator>OK</indicator> <date>240614</date> <officeId>MUC1A0701</officeId> </ticket> </ticketElement> </dataElementsIndiv> </dataElementsMaster> </PNR\_Reply>

## 5.6.3 Possible Errors

06134 ERR RESTRICTED - YOUR OFFICE IS NOT RESPONSIBLE FOR THAT PNR

See "Error Messages" section for details.

* * *

## 5.7 Operation: Cancel ES elements by receiver type

An Individual Security Element (ES element) can be deleted at any time during the creation of the PNR, by the Creator Office, or during the modification of the PNR, by the Office of Responsibility. 

ES element cancel can be done specifying receiver type G, I, and/or P.

Context: In this example, a PNR 5PPGFR contains an ES element with receiver type: G, P, and I.

Query: The Cancel query is sent for cancelling a ES element receiver type: P

Reply: In the Reply, ES elements receiver remaining in PNR is the type G and I.

## 5.7.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_Cancel xmlns="http://xml.amadeus.com/PNRXCL\_22\_1\_1A"> <reservationInfo> <reservation> <controlNumber>5PPGFR</controlNumber> </reservation> </reservationInfo> <pnrActions> <optionCode>0</optionCode> </pnrActions> <cancelElements> <entryType>S</entryType> <element> <identifier>ESP</identifier> </element> </cancelElements> </PNR\_Cancel>

## 5.7.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_Reply xmlns="http://xml.amadeus.com/PNRACC\_22\_1\_1A"> <pnrHeader> <reservationInfo> <reservation> <companyId>1A</companyId> <controlNumber>6GX8FU</controlNumber> <date>240614</date> <time>1708</time> </reservation> </reservationInfo> </pnrHeader> <securityInformation> <responsibilityInformation> <typeOfPnrElement>RP</typeOfPnrElement> <agentId>AASU</agentId> <officeId>MUC1A0701</officeId> </responsibilityInformation> <queueingInformation> <queueingOfficeId>MUC1A0701</queueingOfficeId> </queueingInformation> <cityCode>DAP</cityCode> <secondRpInformation> <creationOfficeId>MUC1A0701</creationOfficeId> <agentSignature>0001AA</agentSignature> <creationDate>240614</creationDate> <creationTime>1649</creationTime> </secondRpInformation> </securityInformation> <freetextData> <freetextDetail> <subjectQualifier>3</subjectQualifier> <type>P12</type> </freetextDetail> <longFreetext>--- RLR ---</longFreetext> </freetextData> <pnrHeaderTag> <statusInformation> <indicator>RLR</indicator> </statusInformation> </pnrHeaderTag> <sbrPOSDetails> <sbrUserIdentificationOwn> <originIdentification> <inHouseIdentification1>MUC1A0701</inHouseIdentification1> </originIdentification> <originatorTypeCode>A</originatorTypeCode> </sbrUserIdentificationOwn> <sbrSystemDetails> <deliveringSystem> <companyId>1A</companyId> <locationId>MUC</locationId> </deliveringSystem> </sbrSystemDetails> <sbrPreferences> <userPreferences> <codedCountry>DE</codedCountry> </userPreferences> </sbrPreferences> </sbrPOSDetails> <sbrCreationPosDetails> <sbrUserIdentificationOwn> <originIdentification> <inHouseIdentification1>MUC1A0701</inHouseIdentification1> </originIdentification> <originatorTypeCode>E</originatorTypeCode> </sbrUserIdentificationOwn> <sbrSystemDetails> <deliveringSystem> <companyId>1A</companyId> <locationId>MUC</locationId> </deliveringSystem> </sbrSystemDetails> <sbrPreferences> <userPreferences> <codedCountry>DE</codedCountry> </userPreferences> </sbrPreferences> </sbrCreationPosDetails> <sbrUpdatorPosDetails> <sbrUserIdentificationOwn> <originIdentification> <originatorId>53458263</originatorId> <inHouseIdentification1>NCE1A0990</inHouseIdentification1> </originIdentification> <originatorTypeCode>A</originatorTypeCode> </sbrUserIdentificationOwn> <sbrSystemDetails> <deliveringSystem> <companyId>1A</companyId> <locationId>NCE</locationId> </deliveringSystem> </sbrSystemDetails> <sbrPreferences> <userPreferences> <codedCountry>FR</codedCountry> </userPreferences> </sbrPreferences> </sbrUpdatorPosDetails> <technicalData> <enveloppeNumberData> <sequenceDetails> <number>3</number> </sequenceDetails> </enveloppeNumberData> <lastTransmittedEnvelopeNumber> <currentRecord>2</currentRecord> </lastTransmittedEnvelopeNumber> <purgeDateData> <dateTime> <year>2014</year> <month>12</month> <day>4</day> </dateTime> </purgeDateData> </technicalData> <travellerInfo> <elementManagementPassenger> <reference> <qualifier>PT</qualifier> <number>2</number> </reference> <segmentName>NM</segmentName> <lineNumber>1</lineNumber> </elementManagementPassenger> <passengerData> <travellerInformation> <traveller> <surname>SMITH</surname> <quantity>1</quantity> </traveller> <passenger> <firstName>ROBERT MR</firstName> </passenger> </travellerInformation> </passengerData> <enhancedPassengerData> <enhancedTravellerInformation> <travellerNameInfo> <quantity>1</quantity> </travellerNameInfo> <otherPaxNamesDetails> <nameType>UN</nameType> <referenceName>Y</referenceName> <displayedName>Y</displayedName> <surname>SMITH</surname> <givenName>ROBERT MR</givenName> </otherPaxNamesDetails> </enhancedTravellerInformation> </enhancedPassengerData> </travellerInfo> <originDestinationDetails> <originDestination></originDestination> <itineraryInfo> <elementManagementItinerary> <reference> <qualifier>ST</qualifier> <number>1</number> </reference> <segmentName>AIR</segmentName> <lineNumber>2</lineNumber> </elementManagementItinerary> <travelProduct> <product> <depDate>041214</depDate> <depTime>1100</depTime> <arrDate>041214</arrDate> <arrTime>1350</arrTime> </product> <boardpointDetail> <cityCode>LHR</cityCode> </boardpointDetail> <offpointDetail> <cityCode>JFK</cityCode> </offpointDetail> <companyDetail> <identification>6X</identification> </companyDetail> <productDetails> <identification>175</identification> <classOfService>Y</classOfService> </productDetails> <typeDetail> <detail>ET</detail> </typeDetail> </travelProduct> <itineraryMessageAction> <business> <function>1</function> </business> </itineraryMessageAction> <relatedProduct> <quantity>1</quantity> <status>HK</status> </relatedProduct> <flightDetail> <productDetails> <equipment>744</equipment> <numOfStops>0</numOfStops> <weekDay>4</weekDay> </productDetails> <departureInformation> <departTerminal>4</departTerminal> </departureInformation> <arrivalStationInfo> <terminal>7</terminal> </arrivalStationInfo> </flightDetail> <selectionDetails> <selection> <option>P2</option> </selection> </selectionDetails> <markerRailTour></markerRailTour> </itineraryInfo> </originDestinationDetails> <dataElementsMaster> <marker2></marker2> <dataElementsIndiv> <elementManagementData> <reference> <qualifier>OT</qualifier> <number>8</number> </reference> <segmentName>AP</segmentName> <lineNumber>3</lineNumber> </elementManagementData> <otherDataFreetext> <freetextDetail> <subjectQualifier>3</subjectQualifier> <type>5</type> </freetextDetail> <longFreetext>12345678</longFreetext> </otherDataFreetext> </dataElementsIndiv> <dataElementsIndiv> <elementManagementData> <reference> <qualifier>OT</qualifier> <number>9</number> </reference> <segmentName>TK</segmentName> <lineNumber>4</lineNumber> </elementManagementData> <ticketElement> <ticket> <indicator>OK</indicator> <date>240614</date> <officeId>MUC1A0701</officeId> </ticket> </ticketElement> </dataElementsIndiv> <dataElementsIndiv> <elementManagementData> <reference> <qualifier>OT</qualifier> <number>0</number> </reference> <segmentName>ES</segmentName> </elementManagementData> <pnrSecurity> <security> <identification>SELKE054Y</identification> <accessMode>R</accessMode> </security> <securityInfo> <creationDate>240614</creationDate> <agentCode>AASU</agentCode> <officeId>MUC1A0701</officeId> </securityInfo> <indicator>G</indicator> </pnrSecurity> </dataElementsIndiv> <dataElementsIndiv> <elementManagementData> <reference> <qualifier>OT</qualifier> <number>0</number> </reference> <segmentName>ES</segmentName> </elementManagementData> <pnrSecurity> <security> <identification>91496716</identification> <accessMode>B</accessMode> </security> <securityInfo> <creationDate>240614</creationDate> <agentCode>AASU</agentCode> <officeId>NCE1A0990</officeId> </securityInfo> <indicator>I</indicator> </pnrSecurity> </dataElementsIndiv> </dataElementsMaster> </PNR\_Reply>

## 5.7.3 Possible Errors

06134 ERR RESTRICTED - YOUR OFFICE IS NOT RESPONSIBLE FOR THAT PNR

See "Error Messages" section for details.

* * *

## 5.8 Operation: Cancel Extended Content

The query below is a request to cancel an extended content from a PNR in creation. The value used to cancel an extended element is E for element. The reference qualifier is OT as for all extended contents. The extended content BIKE in this PNR has referencenumber 6.

Extended contents cannot be displayed through a PNR\_reply message. For more information about how to retrieve and re-display extended contents, refer to the user guide of PNR\_Redisplay and PNR\_RetrieveAndDisplay.

## 5.8.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_Cancel xmlns="http://xml.amadeus.com/PNRXCL\_22\_1\_1A"> <pnrActions> <optionCode>0</optionCode> </pnrActions> <cancelElements> <entryType>E</entryType> <element> <identifier>OT</identifier> <number>6</number> </element> </cancelElements> </PNR\_Cancel>

## 5.8.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_Reply xmlns="http://xml.amadeus.com/PNRACC\_22\_1\_1A"> <pnrHeader> <reservationInfo> <reservation> <companyId>1A</companyId> </reservation> </reservationInfo> </pnrHeader> <securityInformation> <responsibilityInformation> <typeOfPnrElement>RP</typeOfPnrElement> <officeId>MUC6X0701</officeId> <iataCode>12345675</iataCode> </responsibilityInformation> <queueingInformation> <queueingOfficeId>MUC6X0701</queueingOfficeId> </queueingInformation> </securityInformation> <sbrPOSDetails> <sbrUserIdentificationOwn> <originIdentification> <inHouseIdentification1> </inHouseIdentification1> </originIdentification> </sbrUserIdentificationOwn> <sbrSystemDetails> <deliveringSystem> <companyId> </companyId> </deliveringSystem> </sbrSystemDetails> <sbrPreferences> <userPreferences> <codedCountry> </codedCountry> </userPreferences> </sbrPreferences> </sbrPOSDetails> <sbrCreationPosDetails> <sbrUserIdentificationOwn> <originIdentification> <inHouseIdentification1> </inHouseIdentification1> </originIdentification> </sbrUserIdentificationOwn> <sbrSystemDetails> <deliveringSystem> <companyId> </companyId> </deliveringSystem> </sbrSystemDetails> <sbrPreferences> <userPreferences> <codedCountry> </codedCountry> </userPreferences> </sbrPreferences> </sbrCreationPosDetails> <sbrUpdatorPosDetails> <sbrUserIdentificationOwn> <originIdentification> <inHouseIdentification1>MUC6X0701</inHouseIdentification1> </originIdentification> <originatorTypeCode>A</originatorTypeCode> </sbrUserIdentificationOwn> <sbrSystemDetails> <deliveringSystem> <companyId>1A</companyId> <locationId>MUC</locationId> </deliveringSystem> </sbrSystemDetails> <sbrPreferences> <userPreferences> <codedCountry>DE</codedCountry> </userPreferences> </sbrPreferences> </sbrUpdatorPosDetails> </PNR\_Reply>

## 5.8.3 Possible Errors

See "Error Messages" section.

* * *

## 5.9 Operation: Cancel Itinerary, End Transaction

This query is a request to cancel an itinerary and to End the Transaction. To summarise, the End Transaction entry is the last mandatory entry for creating a new PNR or modifying a retrieved PNR.

The PNR optionCode value 10 means that, following the deletion of the itinerary, the End of Transaction command will be performed by the application.

This is the reply given after removal of the itinerary closely followed by the operation to end the transaction.

Reply - Data element

Value

/pnrHeader/ reservationInfo/ reservation/ **companyId**

1A

/pnrHeader/ reservationInfo/ reservation/ **controlNumber**

5PPGFR

/securityInformation/ responsibilityInformation/ **typeOfPnrElement**

RP

## 5.9.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_Cancel xmlns="http://xml.amadeus.com/PNRXCL\_22\_1\_1A"> <pnrActions> <optionCode>10</optionCode> </pnrActions> <cancelElements> <entryType>I</entryType> </cancelElements> </PNR\_Cancel>

## 5.9.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_Reply xmlns="http://xml.amadeus.com/PNRACC\_22\_1\_1A"> <pnrHeader> <reservationInfo> <reservation> <companyId>1A</companyId> <controlNumber>5PPGFR</controlNumber> </reservation> </reservationInfo> </pnrHeader> <securityInformation> <responsibilityInformation> <typeOfPnrElement>RP</typeOfPnrElement> </responsibilityInformation> </securityInformation> <sbrPOSDetails> <sbrUserIdentificationOwn> <originIdentification> <inHouseIdentification1> </inHouseIdentification1> </originIdentification> </sbrUserIdentificationOwn> </sbrPOSDetails> <sbrCreationPosDetails> <sbrUserIdentificationOwn> <originIdentification> <inHouseIdentification1> </inHouseIdentification1> </originIdentification> </sbrUserIdentificationOwn> </sbrCreationPosDetails> <sbrUpdatorPosDetails> <sbrUserIdentificationOwn> <originIdentification> <inHouseIdentification1> </inHouseIdentification1> </originIdentification> </sbrUserIdentificationOwn> </sbrUpdatorPosDetails> <originDestinationDetails> <originDestination></originDestination> </originDestinationDetails> <dataElementsMaster> <marker2></marker2> </dataElementsMaster> </PNR\_Reply>

## 5.9.3 Possible Errors

See "Error Messages" section.

* * *

## 5.10 Operation: Cancel Multiple ES element receiver types

An Individual Security Element (ES element) can be deleted at any time during the creation of the PNR, by the Creator Office, or during the modification of the PNR, by the Office of Responsibility. 

ES element cancel can be done specifying receiver type G, I, and/or P.

Context: In this example, a PNR 5PPGFR contains an ES element with receiver type: G, P, and I.

Query: The Cancel query is sent for cancelling multiple ES element receiver type: P and I 

Reply: In the reply, ES elements receiver remaining in PNR is the type G.

## 5.10.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_Cancel xmlns="http://xml.amadeus.com/PNRXCL\_22\_1\_1A"> <reservationInfo> <reservation> <controlNumber>5PPGFR</controlNumber> </reservation> </reservationInfo> <pnrActions> <optionCode>0</optionCode> </pnrActions> <cancelElements> <entryType>S</entryType> <element> <identifier>ESP</identifier> </element> <element> <identifier>ESI</identifier> </element> </cancelElements> </PNR\_Cancel>

## 5.10.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_Reply xmlns="http://xml.amadeus.com/PNRACC\_22\_1\_1A"> <pnrHeader> <reservationInfo> <reservation> <companyId>1A</companyId> <controlNumber>6GX8FU</controlNumber> <date>240614</date> <time>1720</time> </reservation> </reservationInfo> </pnrHeader> <securityInformation> <responsibilityInformation> <typeOfPnrElement>RP</typeOfPnrElement> <agentId>AASU</agentId> <officeId>MUC1A0701</officeId> </responsibilityInformation> <queueingInformation> <queueingOfficeId>MUC1A0701</queueingOfficeId> </queueingInformation> <cityCode>DAP</cityCode> <secondRpInformation> <creationOfficeId>MUC1A0701</creationOfficeId> <agentSignature>0001AA</agentSignature> <creationDate>240614</creationDate> <creationTime>1649</creationTime> </secondRpInformation> </securityInformation> <freetextData> <freetextDetail> <subjectQualifier>3</subjectQualifier> <type>P12</type> </freetextDetail> <longFreetext>--- RLR ---</longFreetext> </freetextData> <pnrHeaderTag> <statusInformation> <indicator>RLR</indicator> </statusInformation> </pnrHeaderTag> <sbrPOSDetails> <sbrUserIdentificationOwn> <originIdentification> <inHouseIdentification1>MUC1A0701</inHouseIdentification1> </originIdentification> <originatorTypeCode>A</originatorTypeCode> </sbrUserIdentificationOwn> <sbrSystemDetails> <deliveringSystem> <companyId>1A</companyId> <locationId>MUC</locationId> </deliveringSystem> </sbrSystemDetails> <sbrPreferences> <userPreferences> <codedCountry>DE</codedCountry> </userPreferences> </sbrPreferences> </sbrPOSDetails> <sbrCreationPosDetails> <sbrUserIdentificationOwn> <originIdentification> <inHouseIdentification1>MUC1A0701</inHouseIdentification1> </originIdentification> <originatorTypeCode>E</originatorTypeCode> </sbrUserIdentificationOwn> <sbrSystemDetails> <deliveringSystem> <companyId>1A</companyId> <locationId>MUC</locationId> </deliveringSystem> </sbrSystemDetails> <sbrPreferences> <userPreferences> <codedCountry>DE</codedCountry> </userPreferences> </sbrPreferences> </sbrCreationPosDetails> <sbrUpdatorPosDetails> <sbrUserIdentificationOwn> <originIdentification> <originatorId>53458263</originatorId> <inHouseIdentification1>NCE1A0990</inHouseIdentification1> </originIdentification> <originatorTypeCode>A</originatorTypeCode> </sbrUserIdentificationOwn> <sbrSystemDetails> <deliveringSystem> <companyId>1A</companyId> <locationId>NCE</locationId> </deliveringSystem> </sbrSystemDetails> <sbrPreferences> <userPreferences> <codedCountry>FR</codedCountry> </userPreferences> </sbrPreferences> </sbrUpdatorPosDetails> <technicalData> <enveloppeNumberData> <sequenceDetails> <number>4</number> </sequenceDetails> </enveloppeNumberData> <lastTransmittedEnvelopeNumber> <currentRecord>3</currentRecord> </lastTransmittedEnvelopeNumber> <purgeDateData> <dateTime> <year>2014</year> <month>12</month> <day>4</day> </dateTime> </purgeDateData> </technicalData> <travellerInfo> <elementManagementPassenger> <reference> <qualifier>PT</qualifier> <number>2</number> </reference> <segmentName>NM</segmentName> <lineNumber>1</lineNumber> </elementManagementPassenger> <passengerData> <travellerInformation> <traveller> <surname>SMITH</surname> <quantity>1</quantity> </traveller> <passenger> <firstName>ROBERT MR</firstName> </passenger> </travellerInformation> </passengerData> <enhancedPassengerData> <enhancedTravellerInformation> <travellerNameInfo> <quantity>1</quantity> </travellerNameInfo> <otherPaxNamesDetails> <nameType>UN</nameType> <referenceName>Y</referenceName> <displayedName>Y</displayedName> <surname>SMITH</surname> <givenName>ROBERT MR</givenName> </otherPaxNamesDetails> </enhancedTravellerInformation> </enhancedPassengerData> </travellerInfo> <originDestinationDetails> <originDestination></originDestination> <itineraryInfo> <elementManagementItinerary> <reference> <qualifier>ST</qualifier> <number>1</number> </reference> <segmentName>AIR</segmentName> <lineNumber>2</lineNumber> </elementManagementItinerary> <travelProduct> <product> <depDate>041214</depDate> <depTime>1100</depTime> <arrDate>041214</arrDate> <arrTime>1350</arrTime> </product> <boardpointDetail> <cityCode>LHR</cityCode> </boardpointDetail> <offpointDetail> <cityCode>JFK</cityCode> </offpointDetail> <companyDetail> <identification>6X</identification> </companyDetail> <productDetails> <identification>175</identification> <classOfService>Y</classOfService> </productDetails> <typeDetail> <detail>ET</detail> </typeDetail> </travelProduct> <itineraryMessageAction> <business> <function>1</function> </business> </itineraryMessageAction> <relatedProduct> <quantity>1</quantity> <status>HK</status> </relatedProduct> <flightDetail> <productDetails> <equipment>744</equipment> <numOfStops>0</numOfStops> <weekDay>4</weekDay> </productDetails> <departureInformation> <departTerminal>4</departTerminal> </departureInformation> <arrivalStationInfo> <terminal>7</terminal> </arrivalStationInfo> </flightDetail> <selectionDetails> <selection> <option>P2</option> </selection> </selectionDetails> <markerRailTour></markerRailTour> </itineraryInfo> </originDestinationDetails> <dataElementsMaster> <marker2></marker2> <dataElementsIndiv> <elementManagementData> <reference> <qualifier>OT</qualifier> <number>8</number> </reference> <segmentName>AP</segmentName> <lineNumber>3</lineNumber> </elementManagementData> <otherDataFreetext> <freetextDetail> <subjectQualifier>3</subjectQualifier> <type>5</type> </freetextDetail> <longFreetext>12345678</longFreetext> </otherDataFreetext> </dataElementsIndiv> <dataElementsIndiv> <elementManagementData> <reference> <qualifier>OT</qualifier> <number>9</number> </reference> <segmentName>TK</segmentName> <lineNumber>4</lineNumber> </elementManagementData> <ticketElement> <ticket> <indicator>OK</indicator> <date>240614</date> <officeId>MUC1A0701</officeId> </ticket> </ticketElement> </dataElementsIndiv> <dataElementsIndiv> <elementManagementData> <reference> <qualifier>OT</qualifier> <number>0</number> </reference> <segmentName>ES</segmentName> </elementManagementData> <pnrSecurity> <security> <identification>SELKE054Y</identification> <accessMode>R</accessMode> </security> <securityInfo> <creationDate>240614</creationDate> <agentCode>AASU</agentCode> <officeId>MUC1A0701</officeId> </securityInfo> <indicator>G</indicator> </pnrSecurity> </dataElementsIndiv> </dataElementsMaster> </PNR\_Reply>

## 5.10.3 Possible Errors

06134 ERR RESTRICTED - YOUR OFFICE IS NOT RESPONSIBLE FOR THAT PNR

See "Error Messages" section for details.

* * *

## 5.11 Operation: Cancel Offer

The query below is a request to cancel an offer (an air segment offer) from the PNR 5P5FLB. The value used to cancel an offer is E for element. The reference qualifier is OOT as for all offers. The reference number of this offer is equal to 1 in this example.

We can see in the PNR\_Reply message the TAG ''OFR'' in the PNR header which indicates that the PNR contains or used to contain one or many offers. However, offers cannot be displayed through PNR\_Reply message. For more information about how to retrieve and re-display offers, refer to the user guide of PNR\_Redisplay and PNR\_RetrieveAndDisplay.

## 5.11.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_Cancel xmlns="http://xml.amadeus.com/PNRXCL\_22\_1\_1A"> <pnrActions> <optionCode>0</optionCode> </pnrActions> <cancelElements> <entryType>E</entryType> <element> <identifier>OOT</identifier> <number>1</number> </element> </cancelElements> </PNR\_Cancel>

## 5.11.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_Reply xmlns="http://xml.amadeus.com/PNRACC\_22\_1\_1A"> <pnrHeader> <reservationInfo> <reservation> <companyId>1A</companyId> <controlNumber>5P5FLB</controlNumber> <date>260912</date> <time>0957</time> </reservation> </reservationInfo> </pnrHeader> <securityInformation> <responsibilityInformation> <typeOfPnrElement>RP</typeOfPnrElement> <agentId>AAGS</agentId> <officeId>MUC6X0701</officeId> <iataCode>03210955</iataCode> </responsibilityInformation> <queueingInformation> <queueingOfficeId>AAER9210C</queueingOfficeId> </queueingInformation> <cityCode>DAP</cityCode> <secondRpInformation> <creationOfficeId>MUC6X0701</creationOfficeId> <agentSignature>1234AA</agentSignature> <creationDate>260912</creationDate> <creatorIataCode>03210955</creatorIataCode> <creationTime>0957</creationTime> </secondRpInformation> </securityInformation> <freetextData> <freetextDetail> <subjectQualifier>3</subjectQualifier> <type>P12</type> </freetextDetail> <longFreetext>--- OFR ---</longFreetext> </freetextData> <pnrHeaderTag> <statusInformation> <indicator>OFR</indicator> </statusInformation> </pnrHeaderTag> <sbrPOSDetails> <sbrUserIdentificationOwn> <originIdentification> <originatorId>03210955</originatorId> <inHouseIdentification1>MUC6X0701</inHouseIdentification1> </originIdentification> <originatorTypeCode>N</originatorTypeCode> </sbrUserIdentificationOwn> <sbrSystemDetails> <deliveringSystem> <companyId>1A</companyId> <locationId>AAE</locationId> </deliveringSystem> </sbrSystemDetails> <sbrPreferences> <userPreferences> <codedCountry>DZ</codedCountry> </userPreferences> </sbrPreferences> </sbrPOSDetails> <sbrCreationPosDetails> <sbrUserIdentificationOwn> <originIdentification> <originatorId>03210955</originatorId> <inHouseIdentification1>MUC6X0701</inHouseIdentification1> </originIdentification> <originatorTypeCode>N</originatorTypeCode> </sbrUserIdentificationOwn> <sbrSystemDetails> <deliveringSystem> <companyId>1A</companyId> <locationId>AAE</locationId> </deliveringSystem> </sbrSystemDetails> <sbrPreferences> <userPreferences> <codedCountry>DZ</codedCountry> </userPreferences> </sbrPreferences> </sbrCreationPosDetails> <sbrUpdatorPosDetails> <sbrUserIdentificationOwn> <originIdentification> <originatorId>03210955</originatorId> <inHouseIdentification1>MUC6X0701</inHouseIdentification1> </originIdentification> <originatorTypeCode>N</originatorTypeCode> </sbrUserIdentificationOwn> <sbrSystemDetails> <deliveringSystem> <companyId>1A</companyId> <locationId>AAE</locationId> </deliveringSystem> </sbrSystemDetails> <sbrPreferences> <userPreferences> <codedCountry>DZ</codedCountry> </userPreferences> </sbrPreferences> </sbrUpdatorPosDetails> <technicalData> <enveloppeNumberData> <sequenceDetails> <number>1</number> </sequenceDetails> </enveloppeNumberData> <lastTransmittedEnvelopeNumber> <currentRecord>0</currentRecord> </lastTransmittedEnvelopeNumber> <purgeDateData> <dateTime> <year>2012</year> <month>10</month> <day>22</day> </dateTime> </purgeDateData> <generalPNRInformation> <statusDetails> <isPNRModifDuringTrans>MOD</isPNRModifDuringTrans> </statusDetails> </generalPNRInformation> </technicalData> <travellerInfo> <elementManagementPassenger> <reference> <qualifier>PT</qualifier> <number>1</number> </reference> <segmentName>NM</segmentName> <lineNumber>1</lineNumber> </elementManagementPassenger> <passengerData> <travellerInformation> <traveller> <surname>JONES</surname> <quantity>1</quantity> </traveller> <passenger> <firstName>PETER</firstName> </passenger> </travellerInformation> </passengerData> <enhancedPassengerData> <enhancedTravellerInformation> <travellerNameInfo> <quantity>1</quantity> </travellerNameInfo> <otherPaxNamesDetails> <nameType>UN</nameType> <referenceName>Y</referenceName> <displayedName>Y</displayedName> <surname>JONES</surname> <givenName>PETER</givenName> </otherPaxNamesDetails> </enhancedTravellerInformation> </enhancedPassengerData> </travellerInfo> </PNR\_Reply>

## 5.11.3 Possible Errors

See "Error Messages" section.

* * *

## 5.12 Operation: Name Integration for Group PNR

The group name element can be a maximum of 53 characters in length. It can only be entered and modified during PNR creation.The maximum group size is 99 passengers.

Two name counters appear in the group name: Element to show the number of unnamed and named group members:

-   Unassigned names counter shows how many group members have not yet been named. This decreases as individual name elements are entered.
-   Individual name counter shows how many group members have been named using name element entries.

The combination of named and unnamed counters is equal to the totalnumber in the group.

**Note**: once you have entered the group name, you cannot change the number of passengers in the group name element.

In this section, the sample group PNR scenario consists of the following elements:

-   Record locator (5PP4C2)
-   A group of 11 passengers including three assigned names: Christiano ROBALDO, Ozil MESUL and Karim BENZEME
-   1 flight
-   1 phone
-   1 ticket
-   1 special service request: Group Fare

This query is a request to cancel a Group Name element for one of the group members whose reference qualifier PT as for passenger and reference number 3 (Christiano ROBALDO).

## 5.12.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_Cancel xmlns="http://xml.amadeus.com/PNRXCL\_22\_1\_1A"> <pnrActions> <optionCode>0</optionCode> </pnrActions> <cancelElements> <entryType>G</entryType> <element> <identifier>PT</identifier> <number>3</number> </element> </cancelElements> </PNR\_Cancel>

## 5.12.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_Reply xmlns="http://xml.amadeus.com/PNRACC\_22\_1\_1A"> <pnrHeader> <reservationInfo> <reservation> <companyId>1A</companyId> <controlNumber>5PP4C2</controlNumber> <date>240912</date> <time>1720</time> </reservation> </reservationInfo> </pnrHeader> <securityInformation> <responsibilityInformation> <typeOfPnrElement>RP</typeOfPnrElement> <agentId>BMPR</agentId> <officeId>MUC6X0701</officeId> <iataCode>12345675</iataCode> </responsibilityInformation> <queueingInformation> <queueingOfficeId>MUC6X0701</queueingOfficeId> </queueingInformation> <cityCode>DAP</cityCode> <secondRpInformation> <creationOfficeId>MUC6X0701</creationOfficeId> <agentSignature>9999BM</agentSignature> <creationDate>240912</creationDate> <creatorIataCode>12345675</creatorIataCode> <creationTime>1720</creationTime> </secondRpInformation> </securityInformation> <freetextData> <freetextDetail> <subjectQualifier>3</subjectQualifier> <type>P12</type> </freetextDetail> <longFreetext>--- RLR ---</longFreetext> </freetextData> <pnrHeaderTag> <statusInformation> <indicator>RLR</indicator> </statusInformation> </pnrHeaderTag> <sbrPOSDetails> <sbrUserIdentificationOwn> <originIdentification> <originatorId>12345675</originatorId> <inHouseIdentification1>MUC6X0701</inHouseIdentification1> </originIdentification> <originatorTypeCode>A</originatorTypeCode> </sbrUserIdentificationOwn> <sbrSystemDetails> <deliveringSystem> <companyId>1A</companyId> <locationId>MUC</locationId> </deliveringSystem> </sbrSystemDetails> <sbrPreferences> <userPreferences> <codedCountry>DE</codedCountry> </userPreferences> </sbrPreferences> </sbrPOSDetails> <sbrCreationPosDetails> <sbrUserIdentificationOwn> <originIdentification> <originatorId>12345675</originatorId> <inHouseIdentification1>MUC6X0701</inHouseIdentification1> </originIdentification> <originatorTypeCode>A</originatorTypeCode> </sbrUserIdentificationOwn> <sbrSystemDetails> <deliveringSystem> <companyId>1A</companyId> <locationId>MUC</locationId> </deliveringSystem> </sbrSystemDetails> <sbrPreferences> <userPreferences> <codedCountry>DE</codedCountry> </userPreferences> </sbrPreferences> </sbrCreationPosDetails> <sbrUpdatorPosDetails> <sbrUserIdentificationOwn> <originIdentification> <originatorId>12345675</originatorId> <inHouseIdentification1>MUC6X0701</inHouseIdentification1> </originIdentification> <originatorTypeCode>A</originatorTypeCode> </sbrUserIdentificationOwn> <sbrSystemDetails> <deliveringSystem> <companyId>1A</companyId> <locationId>MUC</locationId> </deliveringSystem> </sbrSystemDetails> <sbrPreferences> <userPreferences> <codedCountry>DE</codedCountry> </userPreferences> </sbrPreferences> </sbrUpdatorPosDetails> <technicalData> <enveloppeNumberData> <sequenceDetails> <number>1</number> </sequenceDetails> </enveloppeNumberData> <lastTransmittedEnvelopeNumber> <currentRecord>0</currentRecord> </lastTransmittedEnvelopeNumber> <purgeDateData> <dateTime> <year>2013</year> <month>2</month> <day>25</day> </dateTime> </purgeDateData> <generalPNRInformation> <statusDetails> <isPNRModifDuringTrans>MOD</isPNRModifDuringTrans> </statusDetails> </generalPNRInformation> </technicalData> <travellerInfo> <elementManagementPassenger> <segmentName>NG</segmentName> <lineNumber>0</lineNumber> </elementManagementPassenger> <passengerData> <travellerInformation> <traveller> <surname>FOOTBALLTEAM</surname> <qualifier>G</qualifier> <quantity>11</quantity> </traveller> </travellerInformation> <groupCounters> <quantityDetails> <numberOfUnit>11</numberOfUnit> <unitQualifier>BKD</unitQualifier> </quantityDetails> <quantityDetails> <numberOfUnit>0</numberOfUnit> <unitQualifier>CNL</unitQualifier> </quantityDetails> <quantityDetails> <numberOfUnit>0</numberOfUnit> <unitQualifier>SPL</unitQualifier> </quantityDetails> </groupCounters> </passengerData> </travellerInfo> <travellerInfo> <elementManagementPassenger> <reference> <qualifier>PT</qualifier> <number>4</number> </reference> <segmentName>NM</segmentName> <lineNumber>1</lineNumber> </elementManagementPassenger> <passengerData> <travellerInformation> <traveller> <surname>BENZEMA</surname> <quantity>1</quantity> </traveller> <passenger> <firstName>KARIM</firstName> </passenger> </travellerInformation> </passengerData> <enhancedPassengerData> <enhancedTravellerInformation> <travellerNameInfo> <quantity>1</quantity> </travellerNameInfo> <otherPaxNamesDetails> <nameType>UN</nameType> <referenceName>Y</referenceName> <displayedName>Y</displayedName> <surname>BENZEME</surname> <givenName>KARIM</givenName> </otherPaxNamesDetails> </enhancedTravellerInformation> </enhancedPassengerData> </travellerInfo> <travellerInfo> <elementManagementPassenger> <reference> <qualifier>PT</qualifier> <number>2</number> </reference> <segmentName>NM</segmentName> <lineNumber>2</lineNumber> </elementManagementPassenger> <passengerData> <travellerInformation> <traveller> <surname>MESUT</surname> <quantity>1</quantity> </traveller> <passenger> <firstName>OZIL</firstName> </passenger> </travellerInformation> </passengerData> <enhancedPassengerData> <enhancedTravellerInformation> <travellerNameInfo> <quantity>1</quantity> </travellerNameInfo> <otherPaxNamesDetails> <nameType>UN</nameType> <referenceName>Y</referenceName> <displayedName>Y</displayedName> <surname>MESUL</surname> <givenName>OZIL</givenName> </otherPaxNamesDetails> </enhancedTravellerInformation> </enhancedPassengerData> </travellerInfo> <originDestinationDetails> <originDestination></originDestination> <itineraryInfo> <elementManagementItinerary> <reference> <qualifier>ST</qualifier> <number>1</number> </reference> <segmentName>AIR</segmentName> <lineNumber>3</lineNumber> </elementManagementItinerary> <travelProduct> <product> <depDate>250213</depDate> <depTime>0855</depTime> <arrDate>250213</arrDate> <arrTime>1100</arrTime> </product> <boardpointDetail> <cityCode>MAD</cityCode> </boardpointDetail> <offpointDetail> <cityCode>ORY</cityCode> </offpointDetail> <companyDetail> <identification>IB</identification> </companyDetail> <productDetails> <identification>3436</identification> <classOfService>Y</classOfService> </productDetails> <typeDetail> <detail>ET</detail> </typeDetail> </travelProduct> <itineraryMessageAction> <business> <function>1</function> </business> </itineraryMessageAction> <itineraryReservationInfo> <reservation> <companyId>IB</companyId> <controlNumber>HJWNM</controlNumber> </reservation> </itineraryReservationInfo> <relatedProduct> <quantity>11</quantity> <status>HN</status> </relatedProduct> <flightDetail> <productDetails> <equipment>321</equipment> <numOfStops>0</numOfStops> <weekDay>1</weekDay> </productDetails> <departureInformation> <departTerminal>4</departTerminal> </departureInformation> <arrivalStationInfo> <terminal>W</terminal> </arrivalStationInfo> </flightDetail> <selectionDetails> <selection> <option>P2</option> </selection> </selectionDetails> <markerRailTour></markerRailTour> </itineraryInfo> </originDestinationDetails> <dataElementsMaster> <marker2></marker2> <dataElementsIndiv> <elementManagementData> <reference> <qualifier>OT</qualifier> <number>3</number> </reference> <segmentName>AP</segmentName> <lineNumber>4</lineNumber> </elementManagementData> <otherDataFreetext> <freetextDetail> <subjectQualifier>3</subjectQualifier> <type>5</type> </freetextDetail> <longFreetext>123456789</longFreetext> </otherDataFreetext> </dataElementsIndiv> <dataElementsIndiv> <elementManagementData> <reference> <qualifier>OT</qualifier> <number>4</number> </reference> <segmentName>TK</segmentName> <lineNumber>5</lineNumber> </elementManagementData> <ticketElement> <ticket> <indicator>OK</indicator> <date>240912</date> <officeId>MUC6XA070</officeId> </ticket> </ticketElement> </dataElementsIndiv> <dataElementsIndiv> <elementManagementData> <reference> <qualifier>OT</qualifier> <number>12</number> </reference> <segmentName>SSR</segmentName> <lineNumber>6</lineNumber> </elementManagementData> <serviceRequest> <ssr> <type>GRPF</type> <status> </status> <companyId>IB</companyId> <freeText>GV10</freeText> </ssr> </serviceRequest> </dataElementsIndiv> <dataElementsIndiv> <elementManagementData> <reference> <qualifier>OT</qualifier> <number>5</number> </reference> <segmentName>RM</segmentName> <lineNumber>7</lineNumber> </elementManagementData> <miscellaneousRemarks> <remarks> <type>RM</type> <freetext>THIS IS THE REAL MADRID TEAM</freetext> </remarks> </miscellaneousRemarks> <extendedRemark> <structuredRemark> <type>RM</type> <freetext>THIS IS THE REAL MADRID TEAM</freetext> </structuredRemark> </extendedRemark> </dataElementsIndiv> </dataElementsMaster> </PNR\_Reply>

## 5.12.3 Possible Errors

See "Error Messages" section.

* * *