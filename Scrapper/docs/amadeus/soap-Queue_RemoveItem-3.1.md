---
url: "https://developers.amadeus.com/api-library/soap/functional-doc/32/doc-read/2443?serviceVersion=3.1"
download_url: "https://developers.amadeus.com/PAS-EAS/api/download/comp/4d4ad2cb456c02633f463a055ab70584/2443/HTML_UG_WBS_Queue_RemoveItem_QUQMDQ_03.1/UG_WBS_Queue_RemoveItem_QUQMDQ_03.1_013.html"
title: "HTML_UG_WBS_Queue_RemoveItem_QUQMDQ_03.1_013"
source: "amadeus"
service_id: "32"
service_name: "Queue_RemoveItem"
version: "3.1"
document_id: "2443"
doc_version: "3.1"
doc_type: "User guide"
file_format: "HTML"
scraped_at: "2026-07-15T10:41:52.470Z"
---
# Function: Queue\_RemoveItem

* * *

## 1 Overview

-   This service allows to remove some or ALL PNRs/Messages from a specified Queue, Category and Date range.
-   It also enables user to remove PNRs/messages from the Date and Time Delay Queues.

## 1.1 Supported Operations

The service allows to perform the following operations with in the same office and in a different office: 

-   Remove one or more PNRs/messages from a queue.
-   Remove all PNRs/messages from a specific category and date range of a queue.
-   Remove all PNRs/messages from a queue by specifying the queue number only.( Deletes from the Default Category 0).
-   Remove PNRs/messages from the delay date queue.
-   Remove PNRs/messages from the delay time queue.

## 1.2 Limitations

none

## 1.3 Unsupported Operations

none

## 1.4 Prerequisites

none

## 2 Building A Query

The message accepts following request parameters:

-   removalOption (_Mandatory_)

-   targetDetails (_Mandatory_)

## 2.1 Sub Structure: removalOption

## 2.1.1 Description

removalOption contains the sub parameter - **_option_** which can accept any of the following values :

QR

remove PNR/ messages from queue

QRD

remove PNR messages from delay date queue

QRP

remove specific PNRs from queue

QRT

remove PNR messages from delay time queue

## 2.1.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<removalOption> <selectionDetails> <option>QR</option> </selectionDetails> </removalOption>

## 2.2 Sub Structure: targetDetails

## 2.2.1 Description

There can be up to t**hree** instances of **targetDetails** in a single query to remove a PNR/message from different queues. 

The removal target details include the following sub parameters:

-   Additional Business Source Information (**_targetOffice_**)
-   Target Queue Information (**queueNumber**)
-   Target Sub Queue Information ( **_categoryDetails_**) 
-   Structured Date Time Information ( **_placementDate_**)
-   Reservation Control Information(**_recordLocator_**)

**targetOffice:**

_Target Office_ Contains 2 sub parameters: **_sourceQualifier1_** and **inHouseIdentification1** _\-_

a) **_sourceQualifier1_** sub parameter can take one of the following values:

3

Remove the PNR/message from within the same office 

4

Remove the PNR/message from a different office

b) **_inHouseIdentification1_** sub parameter provides the office ID, the nine-digit alphanumeric code identifying the travel agency.

In case the removal needs to be done in different office, specifying the inHouseIdentification1 is mandatory.

In case of users own office inHouseIdentification1 is not mandatory to be mentioned.

**Target Queue Information (queueNumber):**

 _The_ **queueNumber** consists of the sub parameter **number which** is _used_ to specify the queue from which the PNRs/messages need to be removed.

 **Target Sub Queue Information ( categoryDetails) :**

 The target category is defined with the following sub parameters:

 a) **_identificationType_** is used to specify the Sub Queue type.

It can take the following values:

C

Category

CN

Category number and nickname

N

Nickname

NO

No category or date range

A

categories with items to be worked

1

Date Range 1

2

Date Range 2

3

Date Range 3

4 

Date Range 4

_b)_ **itemNumber** is used to e_nter the category number._

c) **_itemDescription_** is used to specify the nickname/category name

**Date Time Information (placementDate) :**  

It consists of the sub parameter _timeMode and dateTime_ which can be used to specify the date range for a dual queue.

a) **_timeMode_** can take the following values :

1

date range 1

2

date range 2

3

date range 3

4

date range 4

b) **_dateTime_** sub parameter can be specified using the following values :

Year

four-digit year (mandatory)

Month

two-digit month (mandatory)

Day

two-digit day (mandatory)

Hour

two-digit hour (optional)

If a date and time are specified, the PNR/message is removed from the target queue and category in the date range corresponding to that date. 

**Note**: If a specific date is included in the request, the target category must also be specified.

If both **_dateTime_** and **_timeMode_** appear in the request, the **_dateTime_** sub parameter (explicit date and time) is considered over the **_timeMode_** sub parameter (date range).

**Reservation Control Information (recordLocator):**

The **_recordLocator_** consists of the sub parameter **_controlNumber_** which provides the PNR identifier of the PNR to be removed.

Up to 300 instances of the **_recordLocator_** element can be specified in a **_targetDetails_** sub parameter.

## 2.2.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<targetDetails> <targetOffice> <sourceType> <sourceQualifier1>4</sourceQualifier1> </sourceType> <originatorDetails> <inHouseIdentification1>LISTP0101</inHouseIdentification1> </originatorDetails> </targetOffice> <queueNumber> <queueDetails> <number>97</number> </queueDetails> </queueNumber> <categoryDetails> <subQueueInfoDetails> <identificationType>C</identificationType> <itemNumber>0</itemNumber> </subQueueInfoDetails> </categoryDetails> <placementDate> <timeMode>1</timeMode> <dateTime> <year>2013</year> <month>04</month> <day>22</day> <hour>10</hour> </dateTime> </placementDate> <recordLocator> <reservation> <controlNumber>5SSFSV</controlNumber> </reservation> </recordLocator> </targetDetails>

## 3 Receiving A Reply

The response for successful queue removal is described here.

The **_goodResponse_** parameter is explained below.

## 3.1 Sub Structure: goodResponse

## 3.1.1 Description

**_goodResponse_** contains the following elements : **_responseType_** and **_statusCode_**.

a) _responseType_ element indicates the type of response that is received from the system.

responseType shall have the following values :

G

generic Response

U

Update response

X

Cancel response

B

Boarding pass reprint response

F

3rd host check-in information update response

P

Passenger list function response

I

Check-in Response

S

Seat map function response

**_b) statusCode_** element indicates the content of the response.

It can have the following values:

P

OK processed. No data follows

O

OK Processed. Further data in further segments follow

## 3.1.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Queue\_RemoveItemReply> <goodResponse> <responseType>G</responseType> <statusCode>P</statusCode> </goodResponse> </Queue\_RemoveItemReply>

* * *

## 4 Error Messages

errorReturn parameter is displayed in case of any issue with the query sent to the system. It consists of the following sub elements : **_errorDefinition_** and **_errorText_**.

**_A) errorDefinition_** consists of the following subelements : **_errorCode_**, **_errorCategory_** and **_errorCodeOwner_**.

a) **_errorCode_** can take the following values :

**Error code**

**Error message**

1

Invalid date

360

Invalid PNR file address

723

Invalid category

727

Invalid amount

79A

Invalid office identification

79B

Already working another queue

79C

Not allowed to access queues for specified office identification

79D

Queue identifier has not been assigned for specified office identification

79E

Attempting to perform a queue function when not associated with a queue

79F

Queue placement or add new queue item is not allowed for the specified officeidentification and queue identifier

911

Unable to process - system error

912

Incomplete message - data missing in query

913

Item/data not found or data not existing in processing host

914

Invalid format/data - data does not match EDIFACT rules

915

No action - processing host cannot support function

916

EDIFACT version not supported

917

EDIFACT message size exceeded

918

enter message in remarks

919

no PNR in AAA

91A

inactive queue bank

91B

nickname not found

91C

invalid record locator

91D

invalid format

91F

invalid queue number

920

queue/date range empty

921

target not specified

922

targetted queue has wrong queue type

923

invalid time

924

invalid date range

925

queue number not specified

926

queue category empty

927

no items exist

928

queue category not assigned

929

No more items

92A

queue category full

930

Purged PNRs existed on queue. Removed from Queue

931

Purged PNRs existed on Queue. Removed from Queue

932

Restricted PNRs existed on Queue. Left on Queue

b) **_errorCategory_** element if is included in the error response, the possible codes returned are the following:

**Value**

**Description**

EC

Error codes

WEC

Warning code

WZZ

Mutually defined warning

ZZZ

Mutually defined

c) **_errorCodeOwner_** consists of the responsible owner of the error and can contain the following values if mentioned in the reply :

2

CEC(Commission of the European Communities)

6

IATCI

3

IATA (International Air Transport Association)

5

ISO ( international Organization of Standardization)

ZZZ

Mutually defined

13

ICAO ( international Civil Aviation Organization)

B) **_errorText_** contains the text of the error and is described with the following elements :**_textSubjectQualifier_**, **_source_**, **_encoding_**, **_freeText_**

_a) **textSubjectQualifier**_ cab contain the following values :

SAF

    Safety information

TRA

    Transportation information

STN

    Statutory notice

4

    Coded and literal text

3

    Literal text   

SIM

    IATA SSIM defined information

PRD

    Product information

ZZZ

    Mutually defined (bilateral or internal information)

1   

Coded free text

SPH

   Special handling

CHG   

Change information

  
b) **_source_** gives the details of the source of the error and can have the following values:

M

Manual

F

CRS Floor limit

S

Link

c) **_encoding_** gives the details of the type of encoding and can be amongst the following :

5

UCS-2

4

Code page 850 (IBM PC Multinational)

ZZZ

Mutually agreed

8

UTF-16

7

UTF-8

1

ASCII 7 bit

2

ASCII 8 bit

6

UCS-4

3

Code page 500 (EBCDIC Multinational no. 5)

d) **_freeText_** is free flow text which can be any error description that needs to be mentioned along with the above information.

## 4.1 Error Reply

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Queue\_RemoveItemReply> <errorReturn> <errorDefinition> <errorDetails> <errorCode>79D</errorCode> </errorDetails> </errorDefinition> </errorReturn> </Queue\_RemoveItemReply>

  

* * *

## 5 Operations

## 5.1 Operation: Remove a Specific PNR from a Queue

This operation removes a PNR (with record locator 3FYZUX) from queue 1, category 0, and date range 1 from office NCE1A0955.

## 5.1.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Queue\_RemoveItem xmlns="http://xml.amadeus.com/QUQMDQ\_03\_1\_1A"> <originatorOfRequest> <deliveringSystem> <companyId>00</companyId> </deliveringSystem> <originIdentification> <inHouseIdentification1>MUC1A0701</inHouseIdentification1> </originIdentification> <originator>A0001AASU</originator> </originatorOfRequest> <removalOption> <selectionDetails> <option>QRP</option> </selectionDetails> </removalOption> <targetDetails> <targetOffice> <sourceType> <sourceQualifier1>4</sourceQualifier1> </sourceType> <originatorDetails> <inHouseIdentification1>NCE1A0955</inHouseIdentification1> </originatorDetails> </targetOffice> <queueNumber> <queueDetails> <number>1</number> </queueDetails> </queueNumber> <categoryDetails> <subQueueInfoDetails> <identificationType>c</identificationType> <itemNumber>0</itemNumber> </subQueueInfoDetails> </categoryDetails> <placementDate> <timeMode>1</timeMode> </placementDate> <recordLocator> <reservation> <controlNumber>3FYZUX</controlNumber> </reservation> </recordLocator> </targetDetails> </Queue\_RemoveItem>

## 5.1.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Queue\_RemoveItemReply xmlns="http://xml.amadeus.com/QUQMDR\_03\_1\_1A"> <goodResponse> <responseType>G</responseType> <statusCode>P</statusCode> </goodResponse> </Queue\_RemoveItemReply>

## 5.1.3 Possible Errors

See the "Error messages" section

* * *

## 5.2 Operation: Remove All PNRs from a Category and Date Range

This operation removes all PNRs from queue 1, category 6, and date range 4.

## 5.2.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Queue\_RemoveItem xmlns="http://xml.amadeus.com/QUQMDQ\_03\_1\_1A"> <originatorOfRequest> <deliveringSystem> <companyId>00</companyId> </deliveringSystem> <originIdentification> <inHouseIdentification1>MUC1A0701</inHouseIdentification1> </originIdentification> <originator>A0001AASU</originator> </originatorOfRequest> <removalOption> <selectionDetails> <option>QR</option> </selectionDetails> </removalOption> <targetDetails> <targetOffice> <sourceType> <sourceQualifier1>3</sourceQualifier1> </sourceType> </targetOffice> <queueNumber> <queueDetails> <number>1</number> </queueDetails> </queueNumber> <categoryDetails> <subQueueInfoDetails> <identificationType>C</identificationType> <itemNumber>6</itemNumber> </subQueueInfoDetails> </categoryDetails> <placementDate> <timeMode>4</timeMode> </placementDate> </targetDetails> </Queue\_RemoveItem>

## 5.2.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Queue\_RemoveItemReply xmlns="http://xml.amadeus.com/QUQMDR\_03\_1\_1A"> <goodResponse> <responseType>G</responseType> <statusCode>P</statusCode> </goodResponse> </Queue\_RemoveItemReply>

## 5.2.3 Possible Errors

See the "Error Messages" section

* * *

## 5.3 Operation: Remove PNRs from the Delay Date Queue

This operation removes all PNRs from a specific delay date (12JAN15) queue.

## 5.3.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Queue\_RemoveItem xmlns="http://xml.amadeus.com/QUQMDQ\_03\_1\_1A"> <originatorOfRequest> <deliveringSystem> <companyId>00</companyId> </deliveringSystem> <originIdentification> <inHouseIdentification1>MUC1A0701</inHouseIdentification1> </originIdentification> <originator>A0001AASU</originator> </originatorOfRequest> <removalOption> <selectionDetails> <option>QRD</option> </selectionDetails> </removalOption> <targetDetails> <targetOffice> <sourceType> <sourceQualifier1>3</sourceQualifier1> </sourceType> </targetOffice> <placementDate> <dateTime> <year>2015</year> <month>1</month> <day>12</day> </dateTime> </placementDate> </targetDetails> </Queue\_RemoveItem>

## 5.3.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Queue\_RemoveItemReply xmlns="http://xml.amadeus.com/QUQMDR\_03\_1\_1A"> <goodResponse> <responseType>G</responseType> <statusCode>P</statusCode> </goodResponse> </Queue\_RemoveItemReply>

## 5.3.3 Possible Errors

See the "Error Messages" section

* * *

## 5.4 Operation: Remove PNRs from the Delay Time Queue

This operation removes all PNRs from a specific delay time (2200 HRS) queue.

## 5.4.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Queue\_RemoveItem xmlns="http://xml.amadeus.com/QUQMDQ\_03\_1\_1A"> <originatorOfRequest> <deliveringSystem> <companyId>00</companyId> </deliveringSystem> <originIdentification> <inHouseIdentification1>MUC1A0701</inHouseIdentification1> </originIdentification> <originator>A0001AASU</originator> </originatorOfRequest> <removalOption> <selectionDetails> <option>QRT</option> </selectionDetails> </removalOption> <targetDetails> <targetOffice> <sourceType> <sourceQualifier1>3</sourceQualifier1> </sourceType> </targetOffice> <placementDate> <dateTime> <year>2014</year> <month>12</month> <day>9</day> <hour>22</hour> </dateTime> </placementDate> </targetDetails> </Queue\_RemoveItem>

## 5.4.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Queue\_RemoveItemReply xmlns="http://xml.amadeus.com/QUQMDR\_03\_1\_1A"> <goodResponse> <responseType>G</responseType> <statusCode>P</statusCode> </goodResponse> </Queue\_RemoveItemReply>

## 5.4.3 Possible Errors

See "Error Messages" section.

* * *