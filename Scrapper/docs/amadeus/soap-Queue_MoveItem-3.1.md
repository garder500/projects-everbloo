---
url: "https://developers.amadeus.com/api-library/soap/functional-doc/113/doc-read/2299?serviceVersion=3.1"
download_url: "https://developers.amadeus.com/PAS-EAS/api/download/comp/4d4ad2cb456c02633f463a055ab70584/2299/HTML_UG_WBS_Queue_MoveItem_QUQMUQ_03.1/UG_WBS_Queue_MoveItem_QUQMUQ_03.1_019.html"
title: "HTML_UG_WBS_Queue_MoveItem_QUQMUQ_03.1_019"
source: "amadeus"
service_id: "113"
service_name: "Queue_MoveItem"
version: "3.1"
document_id: "2299"
doc_version: "3.1"
doc_type: "User guide"
file_format: "HTML"
scraped_at: "2026-07-15T10:41:27.124Z"
---
# Function: Queue\_MoveItem

* * *

## 1 Overview

The message can be used to move and copy PNRs/ Messages between Queues of the same office OR between different offices.

## 1.1 Supported Operations

The service allows to perform the following operations with in the same office and between different offices :

-   Move the PNRs and Messages from one queue to another.Here the PNRs and Messages will be removed from the original queue (_Source_)

-   Copy the PNRs and Messages from one queue to another.Here the PNRs and Messages will remain in the original queue (_Source_) as well.

## 1.2 Limitations

None

## 1.3 Unsupported Operations

None

## 1.4 Prerequisites

None

## 2 Building A Query

The message accepts following request parameters :

-   Placement Option (_Mandatory_)

-   Target Details (_Mandatory_)

-   Placement date

-   Free text information 

-   Record Locator 

-   Number of PNR's

## 2.1 Sub Structure: Placement Option

## 2.1.1 Description

Placement Option parameter can accept any of the following values :

QWT

copy PNR from ticketing planner and keep existing

QWS

copy PNR from planner and keep existing

QBD

copy PNR/MSG to specified queue and remove existing

QBA

copy PNR/msg to specified delay queue and keep existing

QWR

copy PNR from planner and remove existing

QBC

copy PNR/msg to specified delay queue and remove existing

QBB

copy PNR/msg to specified queue and keep existing

QWO

copy PNR from option planner and keep existing

QWD

copy PNR from delay planner and keep existing

## 2.1.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<placementOption> <selectionDetails> <option>QWT</option> </selectionDetails> </placementOption>

## 2.2 Sub Structure: Target Details

## 2.2.1 Description

Target Details contains the following Parameters:

-   Target Office

        _Target Office_ Contains 2 sub parameters : _sourceQualifier1_ and _inHouseIdentification1_

        _sourceQualifier1_ accepts following values :

           _3: Same as Originator details_

           _4:office specified details_

_inHouseIdentification1_ accepts office ID _(_nine digit alphanumeric identification code for travel agencies) to which PNRs/Messages need to be copied OR transffered

-   Queue Information (queue number)

           _used to specify the queue_

-   Sub Queue Information(category details)

_cateogry details can be specified using the sub parameters_

_identificationType and itemNumber_

_**itemNumber:**  Enter the category number._

_**identification type** accepts following inputs :_

C

Category

CN

category number and nickname

N

 nickname

NO

 no category or date range

1

date range 1

2

 date range 2

3

 date range 3

4

date range 4

  

## 2.2.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<targetOffice> <sourceType> <sourceQualifier1>4</sourceQualifier1> </sourceType> <originatorDetails> <inHouseIdentification1>LISTP0101</inHouseIdentification1> </originatorDetails> </targetOffice> <queueNumber> <queueDetails> <number>97</number> </queueDetails> </queueNumber> <categorySelection> <subQueueInfoDetails> <identificationType>C</identificationType> <itemNumber>0</itemNumber> </subQueueInfoDetails> </categorySelection>

## 2.3 Sub Structure: Date and Time

## 2.3.1 Description

**Placement Date and Time** can be specificed using two sub parameters _time mode_ and _datetime_

_time mode accepts following inputs  
_

-   1:date range 1

-   2:date range 2

-   3:date range 3

-   4:date range 4

_datetime can be specified by giving :_

-   _Year Number_

-   Month number in the year ( begins to 1 )

-   Day number in the month ( begins to 1 )

-   _Hours : between 0 and 23  
    _

If both _dateTime_ and _timeMode_ appear in the request, the _dateTime_ element (explicit date and time) takes precedence over the _timeMode_ element (date range).

## 2.3.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<placementDate> <timeMode>1</timeMode> <dateTime> <year>2013</year> <month>04</month> <day>22</day> <hour>10</hour> </dateTime> </placementDate>

## 2.4 Sub Structure: Message Text

## 2.4.1 Description

**Message Text** can be specified using two sub parameters _textSubjectQualifier and _freeText__

__**_freeText_** represents the actual free-text message. A message is limited to 199 alphanumeric  characters.__

The **_textSubjectQualifier_** can be specified using following values :

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

  

## 2.4.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<messageText> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> </freeTextDetails> <freeText>This is an example</freeText> </messageText>

## 2.5 Sub Structure: Number of PNRs

## 2.5.1 Description

The **_numberOfUnit_** element specifies the number of PNRs to move/copy in one action.

## 2.5.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<numberOfPNRs> <quantityDetails> <numberOfUnit>2</numberOfUnit> </quantityDetails> </numberOfPNRs>

## 2.6 Sub Structure: Record Locator

## 2.6.1 Description

The _controlNumber_ element provides the PNR identifier of the PNR to be moved/copied.

## 2.6.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<recordLocator> <reservation> <controlNumber>5SSFSV</controlNumber> </reservation> </recordLocator>

## 3 Receiving A Reply

The response to Move Items Between Queues is described here.The message can contain following response types and processing status codes detailed below:

## 3.1 Sub Structure: Response Codes

## 3.1.1 Description

**Response Type:**

G

generic response

U

Update response

X

Cancel response

B

Boarding pass reprint response

F

3rd host check-in information update response

P

Passenger list function response

I

Check-in response

S

Seat map function response

**Processing status code :  
**

P

OK processed. No data follows

O

OK processed. Further data in further segments follow

## 3.1.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Queue\_MoveItemReply> <goodResponse> <responseType>G</responseType> <statusCode>P</statusCode> </goodResponse> </Queue\_MoveItemReply>

* * *

## 4 Error Messages

**List of Error Codes :**

1

Invalid date

360

Invalid PNR file address

79A

Invalid office identification

79B

Already working another queue

723

Invalid category

727

Invalid amount

79E

Attempting to perform a queue function when not associated with a queue

79F

Queue placement or add new queue item is not allowed for the specified office identification and queue identifier

79C

Not allowed to access queues for specified office identification

79D

Queue identifier has not been assigned for specified office identification

930

Purged PNRs existed on Queue. Removed from Queue

92A

queue category full

932

Finish Or Ignore

931

Restricted PNRs existed on Queue. Left on Queue.

927

no items exist

926

queue category empty

929

No more items

928

queue category not assigned

923

invalid time

922

targetted queue has wrong queue type

925

queue number not specified

924

invalid date range

91D

invalid format

91F

invalid queue number

920

queue/date range empty

921

target not specified

919

no PNR in AAA

91A

inactive queue bank

91B

nickname not found

91C

invalid record locator

915

No action - processing host cannot support function

916

EDIFACT version not supported

917

EDIFACT message size exceeded

918

enter message in remarks

911

Unable to process - system error

912

Incomplete message - data missing in query

913

Item/data not found or data not existing in processing host

914

Invalid format/data - data does not match EDIFACT rules

## 4.1 Error Reply

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Queue\_MoveItemReply> <errorReturn> <errorDefinition> <errorDetails> <errorCode>79D</errorCode> </errorDetails> </errorDefinition> </errorReturn> </Queue\_MoveItemReply>

  

* * *

## 5 Operations

## 5.1 Operation: Copy PNR To two Queues

This operation copies PNRs from Queue 0, Category 0 (Q0c0) to Q3c0 and retain them on Q0c0.

Note that the first _targetDetails_ element defines the source queue and the following _targetDetails_ elements defines the target queues.

## 5.1.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Queue\_MoveItem> <placementOption> <selectionDetails> <option>QBB</option> </selectionDetails> </placementOption> <targetDetails> <targetOffice> <sourceType> <sourceQualifier1>3</sourceQualifier1> </sourceType> </targetOffice> <queueNumber> <queueDetails> <number>0</number> </queueDetails> </queueNumber> <categoryDetails> <subQueueInfoDetails> <identificationType>c</identificationType> <itemNumber>0</itemNumber> </subQueueInfoDetails> </categoryDetails> </targetDetails> <targetDetails> <targetOffice> <sourceType> <sourceQualifier1>3</sourceQualifier1> </sourceType> </targetOffice> <queueNumber> <queueDetails> <number>3</number> </queueDetails> </queueNumber> <categoryDetails> <subQueueInfoDetails> <identificationType>c</identificationType> <itemNumber>0</itemNumber> </subQueueInfoDetails> </categoryDetails> </targetDetails> </Queue\_MoveItem>

## 5.1.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.1.3 Possible Errors

See the "Error messages" section

* * *

## 5.2 Operation: Copy Specified Number Of PNRs

This operation copies two PNRs from Q0c0 to Q3c0 and removes them from the original queue (QBD).

## 5.2.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Queue\_MoveItem> <placementOption> <selectionDetails> <option>QBD</option> </selectionDetails> </placementOption> <targetDetails> <targetOffice> <sourceType> <sourceQualifier1>3</sourceQualifier1> </sourceType> </targetOffice> <queueNumber> <queueDetails> <number>0</number> </queueDetails> </queueNumber> <categoryDetails> <subQueueInfoDetails> <identificationType>c</identificationType> <itemNumber>0</itemNumber> </subQueueInfoDetails> </categoryDetails> </targetDetails> <targetDetails> <targetOffice> <sourceType> <sourceQualifier1>3</sourceQualifier1> </sourceType> </targetOffice> <queueNumber> <queueDetails> <number>3</number> </queueDetails> </queueNumber> <categoryDetails> <subQueueInfoDetails> <identificationType>c</identificationType> <itemNumber>0</itemNumber> </subQueueInfoDetails> </categoryDetails> </targetDetails> <numberOfPNRs> <quantityDetails> <numberOfUnit>2</numberOfUnit> </quantityDetails> </numberOfPNRs> </Queue\_MoveItem>

## 5.2.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.2.3 Possible Errors

See the "Error Messages" section

* * *