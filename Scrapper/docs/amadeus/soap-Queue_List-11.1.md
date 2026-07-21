---
url: "https://developers.amadeus.com/api-library/soap/functional-doc/52/doc-read/1643?serviceVersion=11.1"
download_url: "https://developers.amadeus.com/PAS-EAS/api/download/comp/4d4ad2cb456c02633f463a055ab70584/1643/HTML_UG_WBS_Queue_List_QDQLRQ_11.1/UG_WBS_Queue_List_QDQLRQ_11.1_011.html"
title: "HTML_UG_WBS_Queue_List_QDQLRQ_11.1_011"
source: "amadeus"
service_id: "52"
service_name: "Queue_List"
version: "11.1"
document_id: "1643"
doc_version: "11.1"
doc_type: "User guide"
file_format: "HTML"
scraped_at: "2026-07-15T10:41:14.518Z"
---
# Function: Queue\_List

* * *

## 1 Overview

This function retrieves a list of PNRs Record Locator placed in a queue and retrieves one among them with no need to display all PNRs one by one. Even more, the function provides PNRs search criteria to display only some PNRs placed in a queue.

## 1.1 Supported Operations

**List with display option**

It is possible to request a list of PNRs placed in a queue and displayed according to the departure date, creation date and/or ticketing date. You can also request a list of a specific number of PNRs placed in a queue (I.E. the 10 first PNRs).

**List with search criteria**

It is possible to request a List of PNRs placed in a queue based on 

(up to 5 of the following options may be used):

\- departure date (list of values or range),

\- creation date (list of values or range)

\- ticketing date (list of values or range)

\- passenger name (list of values, for each value only 15 characters are supported)

\- queue placing agent sine (single value)

\- PNR account number (single value)

\- airline code (list of values)

\- flight number (list of values or range)

\- boarding point (list of values)

\- off point (list of values)

\- status code (list of values)

\- class of service (booking class not cabin code, list of values)

\- point of sale (it can be a party identifier (2 characters are supported), or an office id (on 9 characters)) (list of values)

\- airline tier level (list of values)

\- customer value (list of values or range)

The display can be sorted against the following sort criteria (up to 3 of the following options may be used):

\- ticketing date

\- creation date

\- passenger name

\- airline code

\- flight number

\- board point

\- off point

\- status code

\- class of service (booking class and not status code)

## 1.2 Limitations

This function applies only for PNRs queue.

A maximum of 5 search criteria could be used at same time.

A maximum of 5 elements (range or value) is allowed for each criteria, except for queue placing agent sine and PNR account number, for which only a single element is authorized.

A PNR which has only non-air segments will never be retrieved if any of the search criteria at segment level is used.

 Queue List result will only include PNRs that the agent has the right to retrieve.

Tier Level and Customer Value are considered as independant criteria in the Queue list request (see example below).

Tier Level and Customer Value criteria can only be used to search a list by an agent that has the right to see these elements in the face of the concerned PNR. In other words, if an element is not showed in the face of the PNR it will not be taken into account when searching the list. The PNR will thus be treated as if it did not contain this particular element.

## 1.3 Unsupported Operations

It is not possible to request a list for Message Queue. The start queue function has to be used to display a message Queue.

## 1.4 Prerequisites

Not applicable

## 2 Building A Query

## 3 Receiving A Reply

## 4 Error Messages

Error number

Error message

1

Invalid date

360

Invalid PNR file address

723

Invalid category

727

Invalid amount

79A

Invalid office identification

79B

Already working another queue

79C

Not allowed to access queues for specified office identification

79D

Queue identifier has not been assigned for specified office identification

79E

Attempting to perform a queue function when not associated with a queue

79F

Queue placement or add new queue item is not allowed for the specified office identification and queue identifier

911

Unable to process - system error

912

Incomplete message - data missing in query

913

Item/data not found or data not existing in processing host

914

Invalid format/data - data does not match EDIFACT rules

915

No action - processing host cannot support function

916

EDIFACT version not supported

917

EDIFACT message size exceeded

918

enter message in remarks

919

no PNR in AAA

91A

inactive queue bank

91B

nickname not found

91C

invalid record locator

91D

invalid format

91F

invalid queue number

920

queue/date range empty

921

target not specified

922

targetted queue has wrong queue type

923

invalid time

924

invalid date range

925

queue number not specified

926

queue category empty

927

no items exist

928

queue category not assigned

929

No more items

92A

queue category full

  

* * *

## 5 Operations

## 5.1 Operation: Display Queue By Office And Date

Display a List of the queue 12C0 in the office NCE1A0950 and search with ticketing date between 20 APR and 21 APR and departure date between 3 May and 4 May.

/targetOffice /originatorDetails /inHouseIdentification1

NCE1A0950

/queueNumber /number

12

/categoryDetails /identificationType

C

/categoryDetails /itemNumber

0

/searchCriteria \[1\] /searchOption /selectionDetails /option

TD

/searchCriteria \[1\] /dates /beginDateTime /year

2009

/searchCriteria \[1\] /dates /beginDateTime /month

4

/searchCriteria \[1\] /dates /beginDateTime /day

20

/searchCriteria \[1\] /dates /endDateTime /year

2009

/searchCriteria \[1\] /dates /endDateTime /month

4

/searchCriteria \[1\] /dates /endDateTime /day

21

/searchCriteria \[2\] /searchOption /selectionDetails /option

DD

/searchCriteria \[2\] /dates /beginDateTime /year

2009

/searchCriteria \[2\] /dates /beginDateTime /month

5

/searchCriteria \[2\] /dates /beginDateTime /day

3

/searchCriteria \[2\] /dates /endDateTime /year

2009

/searchCriteria \[2\] /dates /endDateTime /month

5

/searchCriteria \[2\] /dates /endDateTime /day

4

## 5.1.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Queue\_List xmlns="http://xml.amadeus.com/QDQLRQ\_11\_1\_1A"> <targetOffice> <sourceType> <sourceQualifier1>4</sourceQualifier1> </sourceType> <originatorDetails> <inHouseIdentification1>NCE1A0950</inHouseIdentification1> </originatorDetails> </targetOffice> <queueNumber> <queueDetails> <number>12</number> </queueDetails> </queueNumber> <categoryDetails> <subQueueInfoDetails> <identificationType>C</identificationType> <itemNumber>0</itemNumber> </subQueueInfoDetails> </categoryDetails> <searchCriteria> <searchOption> <selectionDetails> <option>TD</option> </selectionDetails> </searchOption> <dates> <beginDateTime> <year>2009</year> <month>4</month> <day>20</day> </beginDateTime> <endDateTime> <year>2009</year> <month>4</month> <day>21</day> </endDateTime> </dates> </searchCriteria> <searchCriteria> <searchOption> <selectionDetails> <option>DD</option> </selectionDetails> </searchOption> <dates> <beginDateTime> <year>2009</year> <month>5</month> <day>3</day> </beginDateTime> <endDateTime> <year>2009</year> <month>5</month> <day>4</day> </endDateTime> </dates> </searchCriteria> </Queue\_List>

## 5.1.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Queue\_ListReply xmlns="http://xml.amadeus.com/QDQLRR\_11\_1\_1A"> <queueView> <agent> <originatorDetails> <inHouseIdentification1>NCE1A0950</inHouseIdentification1> </originatorDetails> </agent> <queueNumber> <queueDetails> <number>12</number> </queueDetails> </queueNumber> <categoryDetails> <subQueueInfoDetails> <identificationType>C</identificationType> <itemNumber>0</itemNumber> </subQueueInfoDetails> </categoryDetails> <pnrCount> <quantityDetails> <numberOfUnit>6</numberOfUnit> </quantityDetails> </pnrCount> <pnrCount> <quantityDetails> <numberOfUnit>3</numberOfUnit> </quantityDetails> </pnrCount> <pnrCount> <quantityDetails> <numberOfUnit>6</numberOfUnit> </quantityDetails> </pnrCount> <item> <paxName> <paxDetails> <surname>DEVISSER</surname> <type>0</type> <quantity>1</quantity> </paxDetails> </paxName> <recLoc> <reservation> <controlNumber>35TTKX</controlNumber> </reservation> </recLoc> <segment> <flightDate> <departureDate>04MAY09</departureDate> </flightDate> <boardPointDetails> <trueLocation>HEL</trueLocation> </boardPointDetails> <offpointDetails> <trueLocation>LHR</trueLocation> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>0797</flightNumber> </flightIdentification> </segment> <agent> <originatorDetails> <inHouseIdentification1>NCE1A0950</inHouseIdentification1> <inHouseIdentification2>AA</inHouseIdentification2> </originatorDetails> </agent> <pnrdates> <timeMode>700</timeMode> <dateTime> <year>2009</year> <month>3</month> <day>9</day> </dateTime> </pnrdates> <pnrdates> <timeMode>701</timeMode> <dateTime> <year>2009</year> <month>4</month> <day>20</day> </dateTime> </pnrdates> <pnrdates> <timeMode>711</timeMode> <dateTime> <year>2009</year> <month>3</month> <day>9</day> <hour>14</hour> <minutes>31</minutes> </dateTime> </pnrdates> </item> <item> <paxName> <paxDetails> <surname>DE AAAA</surname> <type>0</type> <quantity>1</quantity> </paxDetails> </paxName> <recLoc> <reservation> <controlNumber>35TTLL</controlNumber> </reservation> </recLoc> <segment> <flightDate> <departureDate>04MAY09</departureDate> </flightDate> <boardPointDetails> <trueLocation>HEL</trueLocation> </boardPointDetails> <offpointDetails> <trueLocation>LHR</trueLocation> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>0797</flightNumber> </flightIdentification> </segment> <agent> <originatorDetails> <inHouseIdentification1>NCE1A0950</inHouseIdentification1> <inHouseIdentification2>AA</inHouseIdentification2> </originatorDetails> </agent> <pnrdates> <timeMode>700</timeMode> <dateTime> <year>2009</year> <month>3</month> <day>9</day> </dateTime> </pnrdates> <pnrdates> <timeMode>701</timeMode> <dateTime> <year>2009</year> <month>4</month> <day>20</day> </dateTime> </pnrdates> <pnrdates> <timeMode>711</timeMode> <dateTime> <year>2009</year> <month>3</month> <day>9</day> <hour>14</hour> <minutes>32</minutes> </dateTime> </pnrdates> </item> <item> <paxName> <paxDetails> <surname>DEAAAA</surname> <type>0</type> <quantity>1</quantity> </paxDetails> </paxName> <recLoc> <reservation> <controlNumber>35TTLX</controlNumber> </reservation> </recLoc> <segment> <flightDate> <departureDate>03MAY09</departureDate> </flightDate> <boardPointDetails> <trueLocation>HEL</trueLocation> </boardPointDetails> <offpointDetails> <trueLocation>LHR</trueLocation> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>0797</flightNumber> </flightIdentification> </segment> <agent> <originatorDetails> <inHouseIdentification1>NCE1A0950</inHouseIdentification1> <inHouseIdentification2>AA</inHouseIdentification2> </originatorDetails> </agent> <pnrdates> <timeMode>700</timeMode> <dateTime> <year>2009</year> <month>3</month> <day>9</day> </dateTime> </pnrdates> <pnrdates> <timeMode>701</timeMode> <dateTime> <year>2009</year> <month>4</month> <day>21</day> </dateTime> </pnrdates> <pnrdates> <timeMode>711</timeMode> <dateTime> <year>2009</year> <month>3</month> <day>9</day> <hour>14</hour> <minutes>32</minutes> </dateTime> </pnrdates> </item> </queueView> </Queue\_ListReply>

## 5.1.3 Possible Errors

See "Error Messages" section

* * *

## 5.2 Operation: Display Queue By Office And Ticketing Date

Display a List of the queue 12C0 in the office NCE1A0950 and search with ticketing date between 20 APR and 21 APR

## 5.2.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Queue\_List xmlns="http://xml.amadeus.com/QDQLRQ\_11\_1\_1A"> <targetOffice> <sourceType> <sourceQualifier1>4</sourceQualifier1> </sourceType> <originatorDetails> <inHouseIdentification1>NCE1A0950</inHouseIdentification1> </originatorDetails> </targetOffice> <queueNumber> <queueDetails> <number>12</number> </queueDetails> </queueNumber> <categoryDetails> <subQueueInfoDetails> <identificationType>C</identificationType> <itemNumber>0</itemNumber> </subQueueInfoDetails> </categoryDetails> <searchCriteria> <searchOption> <selectionDetails> <option>DD</option> </selectionDetails> </searchOption> <dates> <beginDateTime> <year>2004</year> <month>4</month> <day>20</day> </beginDateTime> <endDateTime> <year>2004</year> <month>4</month> <day>21</day> </endDateTime> </dates> </searchCriteria> <sortCriteria> <dumbo></dumbo> <sortOption> <selectionDetails> <option>TD</option> </selectionDetails> </sortOption> </sortCriteria> </Queue\_List>

## 5.2.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.2.3 Possible Errors

See "Error Messages" section

* * *

## 5.3 Operation: Queue List By Creation Date

Queue List with creation date order display option.

## 5.3.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Queue\_List xmlns="http://xml.amadeus.com/QDQLRQ\_11\_1\_1A"> <queueNumber> <queueDetails> <number>0</number> </queueDetails> </queueNumber> <categoryDetails> <subQueueInfoDetails> <identificationType>C</identificationType> <itemNumber>0</itemNumber> </subQueueInfoDetails> </categoryDetails> <sortCriteria> <dumbo></dumbo> <sortOption> <selectionDetails> <option>CD</option> </selectionDetails> </sortOption> </sortCriteria> </Queue\_List>

## 5.3.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.3.3 Possible Errors

* * *

## 5.4 Operation: Queue List By Departure Date

Queue List with departure date order display option.

## 5.4.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Queue\_List xmlns="http://xml.amadeus.com/QDQLRQ\_11\_1\_1A"> <queueNumber> <queueDetails> <number>0</number> </queueDetails> </queueNumber> <categoryDetails> <subQueueInfoDetails> <identificationType>C</identificationType> <itemNumber>0</itemNumber> </subQueueInfoDetails> </categoryDetails> <sortCriteria> <dumbo></dumbo> <sortOption> <selectionDetails> <option>DD</option> </selectionDetails> </sortOption> </sortCriteria> </Queue\_List>

## 5.4.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.4.3 Possible Errors

See "Error Messages" section

* * *

## 5.5 Operation: Queue List by Name and Tier Level

Queue List by Name and Tier Level.

## 5.5.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Queue\_List xmlns="http://xml.amadeus.com/QDQLRQ\_11\_1\_1A"> <targetOffice> <sourceType> <sourceQualifier1>4</sourceQualifier1> </sourceType> <originatorDetails> <inHouseIdentification1>MUC1A0701</inHouseIdentification1> </originatorDetails> </targetOffice> <queueNumber> <queueDetails> <number>1</number> </queueDetails> </queueNumber> <categoryDetails> <subQueueInfoDetails> <identificationType>C</identificationType> <itemNumber>0</itemNumber> </subQueueInfoDetails> </categoryDetails> <passengerName> <paxDetails> <surname>ANDREW</surname> </paxDetails> </passengerName> <tierLevelAndCustomerValue> <frequentTravellerDetails> <tierLevel>SILV</tierLevel> </frequentTravellerDetails> </tierLevelAndCustomerValue> </Queue\_List>

## 5.5.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.5.3 Possible Errors

See "Error Messages" section.

* * *

## 5.6 Operation: Queue List by Point of Sale

Queue List by Point of Sale.

It can be:

\- 2 characters GDS code for OA PNRs

or

\- 9 char Amadeus Office ID

In the same tag pos (POS edifact segment), only one type of value Party Identifier or Office Id can be transported at the same time.

## 5.6.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Queue\_List xmlns="http://xml.amadeus.com/QDQLRQ\_11\_1\_1A"> <targetOffice> <sourceType> <sourceQualifier1>4</sourceQualifier1> </sourceType> <originatorDetails> <inHouseIdentification1>MUC1A0701</inHouseIdentification1> </originatorDetails> </targetOffice> <queueNumber> <queueDetails> <number>1</number> </queueDetails> </queueNumber> <categoryDetails> <subQueueInfoDetails> <identificationType>C</identificationType> <itemNumber>0</itemNumber> </subQueueInfoDetails> </categoryDetails> <pos> <pointOfSale> <partyIdentifier>1G</partyIdentifier> </pointOfSale> </pos> <pos> <locationDetails> <name>\*\*\*BA0\*\*\*</name> </locationDetails> </pos> </Queue\_List>

## 5.6.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.6.3 Possible Errors

See "Error Messages" section.

* * *

## 5.7 Operation: Queue List By Ticketing Date

Queue List with ticketing date order display option.

## 5.7.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Queue\_List xmlns="http://xml.amadeus.com/QDQLRQ\_11\_1\_1A"> <targetOffice> <sourceType> <sourceQualifier1>4</sourceQualifier1> </sourceType> <originatorDetails> <inHouseIdentification1>NYCP02001</inHouseIdentification1> </originatorDetails> </targetOffice> <queueNumber> <queueDetails> <number>3</number> </queueDetails> </queueNumber> <categoryDetails> <subQueueInfoDetails> <identificationType>C</identificationType> <itemNumber>0</itemNumber> </subQueueInfoDetails> </categoryDetails> <sortCriteria> <dumbo></dumbo> <sortOption> <selectionDetails> <option>TD</option> </selectionDetails> </sortOption> </sortCriteria> </Queue\_List>

## 5.7.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.7.3 Possible Errors

See "Error messages" section

* * *

## 5.8 Operation: Queue List by Tier Level and Customer Value Range

Queue list by Tier Level and Customer Value.

In the example below, the purpose is to list PNRs with:

\- Tier Level SILV or Tier Level GOLD (only up to 5 Tier Level can be transported)

and

\- Customer Value \[200-300\] or 500 or 800 (only up to 5 range of Customer Value or Customer Value can be transported).

In the input, in tierLevelAndCustomerValue tag (FTI edifact tag), only a Tier Level or Customer Value (or Customer Value range) can be specified at the same time. Both data cannot be mixed at the same time in the same tag (FTI segment).

## 5.8.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Queue\_List xmlns="http://xml.amadeus.com/QDQLRQ\_11\_1\_1A"> <targetOffice> <sourceType> <sourceQualifier1>4</sourceQualifier1> </sourceType> <originatorDetails> <inHouseIdentification1>MUC1A0701</inHouseIdentification1> </originatorDetails> </targetOffice> <queueNumber> <queueDetails> <number>1</number> </queueDetails> </queueNumber> <categoryDetails> <subQueueInfoDetails> <identificationType>C</identificationType> <itemNumber>0</itemNumber> </subQueueInfoDetails> </categoryDetails> <tierLevelAndCustomerValue> <frequentTravellerDetails> <tierLevel>SILV</tierLevel> </frequentTravellerDetails> </tierLevelAndCustomerValue> <tierLevelAndCustomerValue> <frequentTravellerDetails> <tierLevel>GOLD</tierLevel> </frequentTravellerDetails> </tierLevelAndCustomerValue> <tierLevelAndCustomerValue> <frequentTravellerDetails> <customerValue>200</customerValue> </frequentTravellerDetails> <frequentTravellerDetails> <customerValue>300</customerValue> </frequentTravellerDetails> </tierLevelAndCustomerValue> <tierLevelAndCustomerValue> <frequentTravellerDetails> <customerValue>500</customerValue> </frequentTravellerDetails> </tierLevelAndCustomerValue> <tierLevelAndCustomerValue> <frequentTravellerDetails> <customerValue>800</customerValue> </frequentTravellerDetails> </tierLevelAndCustomerValue> </Queue\_List>

## 5.8.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.8.3 Possible Errors

See "Error Messages" section.

* * *

## 5.9 Operation: Queue List First Ten PNRs

Queue List of queue 15 for the first PNR to the 10th PNR.

## 5.9.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Queue\_List xmlns="http://xml.amadeus.com/QDQLRQ\_11\_1\_1A"> <queueNumber> <queueDetails> <number>15</number> </queueDetails> </queueNumber> <categoryDetails> <subQueueInfoDetails> <identificationType>C</identificationType> <itemNumber>0</itemNumber> </subQueueInfoDetails> </categoryDetails> <scanRange> <rangeQualifier>701</rangeQualifier> <rangeDetails> <min>0</min> <max>10</max> </rangeDetails> </scanRange> </Queue\_List>

## 5.9.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.9.3 Possible Errors

See "Error Messages" section

* * *