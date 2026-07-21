---
url: "https://developers.amadeus.com/api-library/soap/functional-doc/1292/doc-read/103292?serviceVersion=9.1"
download_url: "https://developers.amadeus.com/PAS-EAS/api/download/comp/4d4ad2cb456c02633f463a055ab70584/103292/UG_WBS_QueueMode_processQueue_QUEREQ_09.1_009/UG_WBS_QueueMode_processQueue_QUEREQ_09.1_009.html"
title: "UG_WBS_QueueMode_processQueue_QUEREQ_09.1_009"
source: "amadeus"
service_id: "1292"
service_name: "QueueMode_ProcessQueue"
version: "9.1"
document_id: "103292"
doc_version: "9.1"
doc_type: "User guide"
file_format: "HTML"
scraped_at: "2026-07-15T10:42:20.557Z"
---
# Function: QueueMode\_processQueue

* * *

## 1 Overview

This function allows accessing the six main operations that are available in the PoweredQueueModeinterface. In order to follow the IATA standard as well as (to the extentpossible) the Amadeus specific guidelines these functions all take advantage of IATA's QUEREQ message.

Contacts: Daniel Hassellof

## 1.1 Supported Operations

Codeset 211 - **Start** \= Open Queue for processing

Codeset 214 - **Place** = Take item off the queue and place on another (Place)

Codeset 215 **\- Delay** = Place item back on current queue in the future

Codeset 216 - **Quit** = Stop processing the queue

Codeset 217 - **Remove** = Remove item from the queue

Codeset 218 - **Ignore** = Ignore the item

Codeset 219 - **Place\_Retain** = Place item on another queue and retain it on current Queue

Codeset 230 - **Full\_Queue\_Info** = Give full queue information 

Codeset 231 - **Light\_Queue\_Info** = Give light queue information

Please note that inaddition to the above action, all operations (except for 216, 230, 231) return the next record locator to allow further processing.

When user tries to place a PNR on queue, If queue or category specified in the input are not active and the QCH office profile indicator (queue category check) is equal to “Q” or “QO”,  then error message is displayed and the queue placement does not take place.

When user tries to place a PNR on queue, If queue or category specified in the input are not active and the QCH office profile indicator (queue category check) is not equal to “Q” nor “QO”, then the default queue placement takes place (default queue is queue 0, default category is category 0).

## 1.2 Limitations

Not applicable

## 1.3 Unsupported Operations

Only the above explicitly mentioned operations are supported.

## 1.4 Prerequisites

The user shoud be familiar with the cryptic operations for working a queue.  
  
When using this verb, the same security rules applies as when working a queue in cryptic mode.  
  
All of the above actions must be preceded by the Start operation.

## 2 Building A Query

**Start**

-   Specify message ID 211.
-   The query shall contain the queue and category number to be worked.
-   Precedes all other operations.
-   Returns a record locator of the first queue item.

**Place**

-   Specify message ID 214.
-   The query shall contain a queue/category number.
-   Places the item in the given queue.
-   May contain a delay with date, time.
-   Returns a record locator with next queue item.

**Delay**

-   Specify message ID 215.
-   The query may optionally contain a record locator and a delay date/time.
-   Puts back the item in the queue being worked.
-   Returns a record locator with next queue item.

**Quit**

-   Specify message ID 216.
-   Last retrieved item is put back on top of queue.
-   Stop processing the queue.

**Remove**

-   Specify message ID 217.
-   The query shall contain a record locator.
-   Removes the item from the queue being worked.
-   Returns a record locator with next queue item.

**Ignore**

-   Specify message ID 218.
-   The query shall contain a record locator.
-   Ignores the item.
-   Returns a record locator with next queue item.

**Place\_Retain**

-   Specify message ID 219.
-   The query shall contain a queue/category number.
-   May contain a delay with date, time. 
-   Places the item in the given queue.
-   Retain the PNR queued in current Queue
-   Returns a record locator with next queue item.

**Full\_Queue\_Info**

-   Specify message ID: 230
-   Queue number
-   Queue name
-   cat number,
-   cat name,
-   date range,
-   remaining number of items on queue
-   and queue cycle complete flag

**Light\_Queue\_Info**

-   Specify message ID: 231
-   Queue number
-   Category number

## 3 Receiving A Reply

The reply to supported operations will be the verb for Queue response = QUERES.

## 4 Error Messages

For the Place, Delay,Remove and Ignore actions, the query may optionally include a record locator of the PNR to target. If it is provided and it is different from the one in AAA an exception is thrown.

The following errors may occur when working a queue:

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

## 5.1 Operation: Delay Queue Item

## 5.1.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<QueueMode\_ProcessQueue xmlns="http://xml.amadeus.com/QUEREQ\_09\_1\_IA"> <messageActionDetails> <messageFunctionDetails> <messageFunction>215</messageFunction> </messageFunctionDetails> </messageActionDetails> <recordLocator> <reservation> <controlNumber>3GV4BG</controlNumber> </reservation> </recordLocator> <queueInfoDetails> <selectionInfoDetails> <selectionDetails> <option>QP</option> </selectionDetails> </selectionInfoDetails> <dateTimeInfo> <dateAndTimeDetails> <date>13APR</date> <time>1400</time> </dateAndTimeDetails> </dateTimeInfo> </queueInfoDetails> </QueueMode\_ProcessQueue>

## 5.1.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.1.3 Possible Errors

* * *

## 5.2 Operation: Ignore Queue Item

## 5.2.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<QueueMode\_ProcessQueue xmlns="http://xml.amadeus.com/QUEREQ\_09\_1\_IA"> <messageActionDetails> <messageFunctionDetails> <messageFunction>218</messageFunction> </messageFunctionDetails> </messageActionDetails> <recordLocator> <reservation> <controlNumber>3GV4BG</controlNumber> </reservation> </recordLocator> <queueInfoDetails> <selectionInfoDetails> <selectionDetails> <option>QP</option> </selectionDetails> </selectionInfoDetails> </queueInfoDetails> </QueueMode\_ProcessQueue>

## 5.2.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.2.3 Possible Errors

See "Error Messages" section.

* * *

## 5.3 Operation: Place Queue Item

## 5.3.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<QueueMode\_ProcessQueue xmlns="http://xml.amadeus.com/QUEREQ\_09\_1\_IA"> <messageActionDetails> <messageFunctionDetails> <messageFunction>214</messageFunction> </messageFunctionDetails> </messageActionDetails> <recordLocator> <reservation> <controlNumber>3GV4BG</controlNumber> </reservation> </recordLocator> <queueInfoDetails> <selectionInfoDetails> <selectionDetails> <option>QP</option> </selectionDetails> </selectionInfoDetails> <queueGroup> <queueInfo> <queueDetails> <number>15</number> </queueDetails> </queueInfo> <subQueueInfo> <subQueueInfoDetails> <identificationType>C</identificationType> <itemNumber>10</itemNumber> </subQueueInfoDetails> </subQueueInfo> <subQueueInfo> <subQueueInfoDetails> <identificationType>4</identificationType> </subQueueInfoDetails> </subQueueInfo> <targetOffice> <internalIdDetails> <inhouseId>MUC1A0701</inhouseId> </internalIdDetails> </targetOffice> </queueGroup> </queueInfoDetails> </QueueMode\_ProcessQueue>

## 5.3.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.3.3 Possible Errors

* * *

## 5.4 Operation: Remove Queue Item

## 5.4.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<QueueMode\_ProcessQueue xmlns="http://xml.amadeus.com/QUEREQ\_09\_1\_IA"> <messageActionDetails> <messageFunctionDetails> <messageFunction>217</messageFunction> </messageFunctionDetails> </messageActionDetails> <recordLocator> <reservation> <controlNumber>3GV4BG</controlNumber> </reservation> </recordLocator> <queueInfoDetails> <selectionInfoDetails> <selectionDetails> <option>QP</option> </selectionDetails> </selectionInfoDetails> </queueInfoDetails> </QueueMode\_ProcessQueue>

## 5.4.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.4.3 Possible Errors

* * *

## 5.5 Operation: Start Queue Mode

## 5.5.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<QueueMode\_ProcessQueue xmlns="http://xml.amadeus.com/QUEREQ\_09\_1\_IA"> <messageActionDetails> <messageFunctionDetails> <messageFunction>211</messageFunction> </messageFunctionDetails> </messageActionDetails> <queueInfoDetails> <selectionInfoDetails> <selectionDetails> <option>QP</option> </selectionDetails> </selectionInfoDetails> <queueGroup> <queueInfo> <queueDetails> <number>30</number> </queueDetails> </queueInfo> <subQueueInfo> <subQueueInfoDetails> <identificationType>C</identificationType> <itemNumber>1</itemNumber> </subQueueInfoDetails> </subQueueInfo> <subQueueInfo> <subQueueInfoDetails> <identificationType>1</identificationType> </subQueueInfoDetails> </subQueueInfo> </queueGroup> </queueInfoDetails> </QueueMode\_ProcessQueue>

## 5.5.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.5.3 Possible Errors

* * *

## 5.6 Operation: Stop Queue Mode

## 5.6.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<QueueMode\_ProcessQueue xmlns="http://xml.amadeus.com/QUEREQ\_09\_1\_IA"> <messageActionDetails> <messageFunctionDetails> <messageFunction>216</messageFunction> </messageFunctionDetails> </messageActionDetails> <recordLocator> <reservation> <controlNumber>3GV4BG</controlNumber> </reservation> </recordLocator> <queueInfoDetails> <selectionInfoDetails> <selectionDetails> <option>QP</option> </selectionDetails> </selectionInfoDetails> </queueInfoDetails> </QueueMode\_ProcessQueue>

## 5.6.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.6.3 Possible Errors

* * *