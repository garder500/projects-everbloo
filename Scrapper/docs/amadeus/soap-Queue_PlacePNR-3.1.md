---
url: "https://developers.amadeus.com/api-library/soap/functional-doc/31/doc-read/2759?serviceVersion=3.1"
download_url: "https://developers.amadeus.com/PAS-EAS/api/download/comp/4d4ad2cb456c02633f463a055ab70584/2759/HTML_UG_WBS_Queue_PlacePNR_QUQPCQ_03.1/UG_WBS_Queue_PlacePNR_QUQPCQ_03.1_011.html"
title: "HTML_UG_WBS_Queue_PlacePNR_QUQPCQ_03.1_011"
source: "amadeus"
service_id: "31"
service_name: "Queue_PlacePNR"
version: "3.1"
document_id: "2759"
doc_version: "3.1"
doc_type: "User guide"
file_format: "HTML"
scraped_at: "2026-07-15T10:41:39.576Z"
---
# Function: Queue\_PlacePNR

* * *

## 1 Overview

-   This service allows to place a PNR to a specific Queue, Category and date Range;
-   It allows user to place a PNR in a single or multiple queues;
-   It also enables user to place a PNR to the Time and Delay Queues;

## 1.1 Supported Operations

The service allows to perform the following operations with in the same office or in a different office:

-   Place a PNR on one or more queues;
-   Place a PNR in a specific category and date range;
-   Place a PNR in a queue based on the nicknames;
-   Place a PNR in a date range corresponding to a specific date and/or time;
-   Place a PNR on the delay queue;

The service also checks the following conditions before the queue placement:

-   If the queue or category specified in the input are _not active_ and the **QCH office profile indicator** (Queue Category Check) is **equal** to “Q” or “QO”, then an error message is displayed and the queue placement does not take place;
-   If the queue or category specified in the input are _not active_ and the **QCH office profile indicator** is **not equal** to “Q” or “QO”,  then the queue placement takes place;  
    (Default queue is Queue 0, default category is 0 and default date range is 1)
-   If no category is specified, the PNR is placed in category 0 of the specified queue;
-   If no date range is specified and the queue is a dual queue, then PNRs are placed in default daterange 1

## 1.2 Limitations

Placing a PNR on Delay queue for a dual queue can be done by specifying only the Queue Number and Category number. Date Range cannot be specified

## 1.3 Unsupported Operations

None

## 1.4 Prerequisites

Placement in the Queue of another Office ID is possible only if a security link does exist between the Office ID sender and the Office ID receiver.

## 2 Building A Query

The message accepts following request parameters:

-   **_placementOption_** ( Mandatory)
-   **_targetDetails_** (Mandatory)
-   **_recordLocator_**( Mandatory)

## 2.1 Sub Structure: placementOption

## 2.1.1 Description

**_placementOption_** contains the sub parameter - **_option_** which has to be mentioned and can accept any of the following values:

QEQ

place PNR/Msg onto queue

QED

place PNR onto delay queue

## 2.1.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<placementOption> <selectionDetails> <option>QEQ</option> </selectionDetails> </placementOption>

## 2.2 Sub Structure: targetDetails

## 2.2.1 Description

There can be up to **ten** instances of **targetDetails** in a single query to place a PNR in different queues. 

The placement target details include the following sub parameters:

-   Additional Business Source Information (**_targetOffice_**)
-   Target Queue Information (**queueNumber**)
-   Target Sub Queue Information ( **_categoryDetails_**) 
-   Structured Date Time Information ( **_placementDate_**)

**targetOffice****:**

_Target Office_ Contains 2 sub parameters: **_sourceQualifier1_** and **inHouseIdentification1** _\-_

a) **_sourceQualifier1_** sub parameter can take one of the following values:

3

Same as Originator details

4

office specified details

b) **_inHouseIdentification1_** sub parameter provides the office ID, the nine-digit alphanumeric code identifying the travel agency.

In case the placement needs to be done in different office, specifying the **_inHouseIdentification1_**is mandatory.

In case of users own office **inHouseIdentification1** is not mandatory to be mentioned.

**Target Queue Information (queueNumber):**

 _The_ **queueNumber** consists of the sub parameter **number** which is used to specify the queue in which the PNR needs to be placed.

 **Target Sub Queue Information ( categoryDetails) :**

 The target category is defined with the following sub parameters:

 a) **_identificationType_** is used to specify the Sub Queue type.

It can take the following values:

C

category

CN

category number and nickname

N

nickname

NO

no category or date range

A

categories with items to be worked

E

every category

1

date Range 1

2

date Range 2

3

date Range 3

4 

date Range 4

_b)_ **itemNumber** is used to e_nter the category number._

c) **_itemDescription_** is used to specify the nickname/category name

**Date Time Information (placementDate) :**  

It consists of the sub parameter **_timeMode_** _and **dateTime**_ which can be used to specify the date range for a dual queue.

a) **_timeMode_** can take the following values:

1

date range 1

2

date range 2

3

date range 3

4

date range 4

b) **_dateTime_** sub parameter can be specified using the following values:

**_year_**

four-digit year (mandatory)

**_month_**

two-digit month (mandatory)

**_day_**

two-digit day (mandatory)

**_hour_**

two-digit hour (optional)

If a date and time are specified, the PNR is placed to the target queue and category in the date range corresponding to that date, on the given day. 

**Note**: If a specific date is included in the request, the target category must also be specified.

If both **_dateTime_** and **_timeMode_** appear in the request, the **_dateTime_** sub parameter (explicit date and time) is considered over the **_timeMode_** sub parameter (date range).

## 2.2.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<targetDetails> <targetOffice> <sourceType> <sourceQualifier1>3</sourceQualifier1> </sourceType> <originatorDetails> <inHouseIdentification1>MUC1A0701</inHouseIdentification1> </originatorDetails> </targetOffice> <queueNumber> <queueDetails> <number>15</number> </queueDetails> </queueNumber> <categoryDetails> <subQueueInfoDetails> <identificationType>C</identificationType> <itemNumber>2</itemNumber> </subQueueInfoDetails> </categoryDetails> </targetDetails>

## 2.3 Sub Structure: recordLocator

## 2.3.1 Description

The **_recordLocator_** consists of the sub parameter **_controlNumber_** which provides the PNR identifier of the PNR to be removed.

Only **one** instance of the **_recordLocator_** can be specified in one message.

## 2.3.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<recordLocator> <reservation> <controlNumber>3F38N5</controlNumber> </reservation> </recordLocator>

## 3 Receiving A Reply

The response for successful queue placement is described here.

The **_recordLocator_** element is explained below

## 3.1 Sub Structure: recordLocator

## 3.1.1 Description

The **_controlNumber_** sub element gives a PNR which indicates that the PNR that was placed on queue.

## 3.1.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Queue\_PlacePNRReply> <recordLocator> <reservation> <controlNumber>3F38N5</controlNumber> </reservation> </recordLocator> </Queue\_PlacePNRReply>

* * *

## 4 Error Messages

**_errorReturn_** element is displayed in case of any issue with the query sent to the system. It consists of the following sub elements : **_errorDefinition_** and **_errorText_**.

**_A) errorDefinition_** consists of the following subelements: **_errorCode_**, **_errorCategory_** and**_errorCodeOwner_**.

a) **_errorCode_** can take the following values :

**Error code**

**Error message**

1

Invalid date

79A

Invalid office identification

79B

Already working another queue

79C

Not allowed to access queues for specified office identification

79D

Queue identifier has not been assigned for specified office identification

79E

Attempting to perform a queue function when not associated with a queue

79F

Queue placement or add new queue item is not allowed for the specified officeidentification and queue identifier

91A

inactive queue bank

91B

nickname not found

91C

invalid record locator

91D

invalid format

91E

Inactive queue

91F

invalid queue number

92A

queue category full

360

Invalid PNR file address

723

Invalid category

727

Invalid amount

910

Inactive category

911

Unable to process - system error

912

Incomplete message - data missing in query

913

Item/data not found or data not existing in processing host

914

Invalid format/data - data does not match EDIFACT rules

915

No action - processing host cannot support function

916

EDIFACT version not supported

917

EDIFACT message size exceeded

918

enter message in remarks

919

no PNR in AAA

920

queue/date range empty

921

target not specified

922

targeted queue has wrong queue type

923

invalid time

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

930

Purged PNRs existed on Queue. Removed from Queue

931

Restricted PNRs existed on Queue. Left on Queue.

932

Finish Or Ignore

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

B) **_errorText_** contains the text of the error and is described with the following elements:  **_textSubjectQualifier, source, encoding, freeText_**

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

<Queue\_PlacePNRReply> <errorReturn> <errorDefinition> <errorDetails> <errorCode>79C</errorCode> </errorDetails> </errorDefinition> <errorText> <freeText>RESTRICTED</freeText> </errorText> </errorReturn> </Queue\_PlacePNRReply>

  

* * *

## 5 Operations

## 5.1 Operation: Place a PNR in another office

Place PNR 3KVS5I on Queue 1C5D1 in NCE1A0955 when signed in MUC1A0701.

## 5.1.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Queue\_PlacePNR> <originatorOfRequest> <deliveringSystem> <companyId>00</companyId> </deliveringSystem> <originIdentification> <inHouseIdentification1>MUC1A0701</inHouseIdentification1> </originIdentification> <originator>0001AASU</originator> </originatorOfRequest> <placementOption> <selectionDetails> <option>QEQ</option> </selectionDetails> </placementOption> <targetDetails> <targetOffice> <sourceType> <sourceQualifier1>4</sourceQualifier1> </sourceType> <originatorDetails> <inHouseIdentification1>NCE1A0955</inHouseIdentification1> </originatorDetails> </targetOffice> <queueNumber> <queueDetails> <number>1</number> </queueDetails> </queueNumber> <categoryDetails> <subQueueInfoDetails> <identificationType>C</identificationType> <itemNumber>5</itemNumber> </subQueueInfoDetails> </categoryDetails> <placementDate> <timeMode>1</timeMode> </placementDate> </targetDetails> <recordLocator> <reservation> <controlNumber>3KVS5I</controlNumber> </reservation> </recordLocator> </Queue\_PlacePNR>

## 5.1.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Queue\_PlacePNRReply> <recordLocator> <reservation> <controlNumber>3KVS5I</controlNumber> </reservation> </recordLocator> </Queue\_PlacePNRReply>

## 5.1.3 Possible Errors

See "Error Messages" section.

* * *

## 5.2 Operation: Place a PNR on a dual Queue

Place PNR 3KVS5I on Queue 6C0D3 in MUC1A0701.

## 5.2.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Queue\_PlacePNR> <originatorOfRequest> <deliveringSystem> <companyId>00</companyId> </deliveringSystem> <originIdentification> <inHouseIdentification1>MUC1A0701</inHouseIdentification1> </originIdentification> <originator>0001AASU</originator> </originatorOfRequest> <placementOption> <selectionDetails> <option>QEQ</option> </selectionDetails> </placementOption> <targetDetails> <targetOffice> <sourceType> <sourceQualifier1>3</sourceQualifier1> </sourceType> <originatorDetails> <inHouseIdentification1>MUC1A0701</inHouseIdentification1> </originatorDetails> </targetOffice> <queueNumber> <queueDetails> <number>6</number> </queueDetails> </queueNumber> <categoryDetails> <subQueueInfoDetails> <identificationType>C</identificationType> <itemNumber>0</itemNumber> </subQueueInfoDetails> </categoryDetails> <placementDate> <timeMode>3</timeMode> </placementDate> </targetDetails> <recordLocator> <reservation> <controlNumber>3KVS5I</controlNumber> </reservation> </recordLocator> </Queue\_PlacePNR>

## 5.2.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Queue\_PlacePNRReply> <recordLocator> <reservation> <controlNumber>3KVS5I</controlNumber> </reservation> </recordLocator> </Queue\_PlacePNRReply>

## 5.2.3 Possible Errors

See "Error Messages" section.

* * *

## 5.3 Operation: Place a PNR on delay Queue

Place PNR 3KVS5I on Delay Queue 7C2 on the 22 Feb 2015.

## 5.3.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Queue\_PlacePNR> <originatorOfRequest> <deliveringSystem> <companyId>00</companyId> </deliveringSystem> <originIdentification> <inHouseIdentification1>MUC1A0701</inHouseIdentification1> </originIdentification> <originator>0001AASU</originator> </originatorOfRequest> <placementOption> <selectionDetails> <option>QED</option> </selectionDetails> </placementOption> <targetDetails> <targetOffice> <sourceType> <sourceQualifier1>3</sourceQualifier1> </sourceType> <originatorDetails> <inHouseIdentification1>MUC1A0701</inHouseIdentification1> </originatorDetails> </targetOffice> <queueNumber> <queueDetails> <number>7</number> </queueDetails> </queueNumber> <categoryDetails> <subQueueInfoDetails> <identificationType>C</identificationType> <itemNumber>2</itemNumber> </subQueueInfoDetails> </categoryDetails> <placementDate> <dateTime> <year>2015</year> <month>2</month> <day>22</day> </dateTime> </placementDate> </targetDetails> <recordLocator> <reservation> <controlNumber>3KVS5I</controlNumber> </reservation> </recordLocator> </Queue\_PlacePNR>

## 5.3.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Queue\_PlacePNRReply> <recordLocator> <reservation> <controlNumber>3KVS5I</controlNumber> </reservation> </recordLocator> </Queue\_PlacePNRReply>

## 5.3.3 Possible Errors

See "Error Messages" section.

* * *

## 5.4 Operation: Place a PNR on multiple queues

Place PNR 3KVS5I on Queue 33C0 and 34C1 in MUC1A0701.

## 5.4.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Queue\_PlacePNR> <originatorOfRequest> <deliveringSystem> <companyId>00</companyId> </deliveringSystem> <originIdentification> <inHouseIdentification1>MUC1A0701</inHouseIdentification1> </originIdentification> <originator>0001AASU</originator> </originatorOfRequest> <placementOption> <selectionDetails> <option>QEQ</option> </selectionDetails> </placementOption> <targetDetails> <targetOffice> <sourceType> <sourceQualifier1>3</sourceQualifier1> </sourceType> <originatorDetails> <inHouseIdentification1>MUC1A0701</inHouseIdentification1> </originatorDetails> </targetOffice> <queueNumber> <queueDetails> <number>33</number> </queueDetails> </queueNumber> <categoryDetails> <subQueueInfoDetails> <identificationType>C</identificationType> <itemNumber>0</itemNumber> </subQueueInfoDetails> </categoryDetails> </targetDetails> <targetDetails> <targetOffice> <sourceType> <sourceQualifier1>3</sourceQualifier1> </sourceType> <originatorDetails> <inHouseIdentification1>MUC1A0701</inHouseIdentification1> </originatorDetails> </targetOffice> <queueNumber> <queueDetails> <number>34</number> </queueDetails> </queueNumber> <categoryDetails> <subQueueInfoDetails> <identificationType>C</identificationType> <itemNumber>1</itemNumber> </subQueueInfoDetails> </categoryDetails> </targetDetails> <recordLocator> <reservation> <controlNumber>3KVS5I</controlNumber> </reservation> </recordLocator> </Queue\_PlacePNR>

## 5.4.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Queue\_PlacePNRReply> <recordLocator> <reservation> <controlNumber>3KVS5I</controlNumber> </reservation> </recordLocator> </Queue\_PlacePNRReply>

## 5.4.3 Possible Errors

See "Error Messages" section.

* * *

## 5.5 Operation: Place a PNR On Special Queue

Place PNR 3KVS5I on Queue 13C1 in MUC1A0701.

## 5.5.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Queue\_PlacePNR> <originatorOfRequest> <deliveringSystem> <companyId>00</companyId> </deliveringSystem> <originIdentification> <inHouseIdentification1>MUC1A0701</inHouseIdentification1> </originIdentification> <originator>0001AASU</originator> </originatorOfRequest> <placementOption> <selectionDetails> <option>QEQ</option> </selectionDetails> </placementOption> <targetDetails> <targetOffice> <sourceType> <sourceQualifier1>3</sourceQualifier1> </sourceType> <originatorDetails> <inHouseIdentification1>MUC1A0701</inHouseIdentification1> </originatorDetails> </targetOffice> <queueNumber> <queueDetails> <number>13</number> </queueDetails> </queueNumber> <categoryDetails> <subQueueInfoDetails> <identificationType>C</identificationType> <itemNumber>1</itemNumber> </subQueueInfoDetails> </categoryDetails> </targetDetails> <recordLocator> <reservation> <controlNumber>3KVS5I</controlNumber> </reservation> </recordLocator> </Queue\_PlacePNR>

## 5.5.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Queue\_PlacePNRReply> <recordLocator> <reservation> <controlNumber>3KVS5I</controlNumber> </reservation> </recordLocator> </Queue\_PlacePNRReply>

## 5.5.3 Possible Errors

See "Error Messages" section.

* * *

## 5.6 Operation: Place a PNR using Nickname

Place PNR 3KVS5I on Queue 8C2 whose nickname is TEST5 in MUC1A0701.

## 5.6.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Queue\_PlacePNR> <originatorOfRequest> <deliveringSystem> <companyId>00</companyId> </deliveringSystem> <originIdentification> <inHouseIdentification1>MUC1A0701</inHouseIdentification1> </originIdentification> <originator>0001AASU</originator> </originatorOfRequest> <placementOption> <selectionDetails> <option>QEQ</option> </selectionDetails> </placementOption> <targetDetails> <targetOffice> <sourceType> <sourceQualifier1>4</sourceQualifier1> </sourceType> <originatorDetails> <inHouseIdentification1>NCE1A0955</inHouseIdentification1> </originatorDetails> </targetOffice> <categoryDetails> <subQueueInfoDetails> <identificationType>N</identificationType> <itemDescription>TEST5</itemDescription> </subQueueInfoDetails> </categoryDetails> </targetDetails> <recordLocator> <reservation> <controlNumber>3KVS5I</controlNumber> </reservation> </recordLocator> </Queue\_PlacePNR>

## 5.6.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Queue\_PlacePNRReply> <recordLocator> <reservation> <controlNumber>3KVS5I</controlNumber> </reservation> </recordLocator> </Queue\_PlacePNRReply>

## 5.6.3 Possible Errors

See "Error Messages" section.

* * *