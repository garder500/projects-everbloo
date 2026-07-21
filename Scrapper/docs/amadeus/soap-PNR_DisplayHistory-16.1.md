---
url: "https://developers.amadeus.com/api-library/soap/functional-doc/530/doc-read/5535?serviceVersion=16.1"
download_url: "https://developers.amadeus.com/PAS-EAS/api/download/comp/4d4ad2cb456c02633f463a055ab70584/5535/HTML_UG_WBS_PNR_DisplayHistory_PHIDRQ_16.1/UG_WBS_PNR_DisplayHistory_PHIDRQ_16.1_007.html"
title: "HTML_UG_WBS_PNR_DisplayHistory_PHIDRQ_16.1_007"
source: "amadeus"
service_id: "530"
service_name: "PNR_DisplayHistory"
version: "16.1"
document_id: "5535"
doc_version: "16.1"
doc_type: "User guide"
file_format: "HTML"
scraped_at: "2026-07-15T10:34:58.587Z"
---
# Function: PNR\_DisplayHistory

* * *

## 1 Overview

The PNR\_DisplayHistory function is used to retrieve the history of a PNR.

It is possible to retrieve all the PNR history or a filtered view of it by using filter options in the query.

PNR\_DisplayHistory could contain non-roman (UTF-8) characters in the creation, modification and cancellation of name or remark elements.

PNR history display contains the reservation number in case it is present in the PNR. Extended Travel Records (ETRs) are contained if there for any creation, modification or cancellation.

## 1.1 Supported Operations

PNR history retrieve.

Names containing non-roman (UTF-8) characters are displayed in PNR history only if the character set is supported.

## 1.2 Limitations

The response message is limited to 5000 history lines. If the response is too long for one message it will be necessary to resend the same query with the last envelope received as minimum range, enabling the remainder of the history to be displayed.

## 1.3 Unsupported Operations

None

## 1.4 Prerequisites

The requester needs to have read access to the PNR in order to display the history.

## 2 Building A Query

The PNR\_DisplayHistory function is composed of the following:

-   Record Locator (Mandatory): it contains the PNR Record Locator and optionally the creation date and time of the PNR 
-   Selection Details (Mandatory)
-   Filter Options (Conditional)
-   Reference Number (Optional)

## 2.1 Sub Structure: Record Locator

## 2.1.1 Description

This section is mandatory. It contains:

-   PNR Record Locator (Mandatory). The format is a six character alphanumeric string.
-   PNR Creation Date (Optional). The format is the following: "yyyymmdd"
-   PNR Creation Time (Optional). The format is the following: "hhmm"

## 2.1.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pnrInfo> <reservation> <controlNumber>ABC987</controlNumber> <date>20140815</date> <time>1430</time> </reservation> </pnrInfo>

## 2.2 Sub Structure: Selection Details

## 2.2.1 Description

This section is mandatory. It indicates whether any kind of filtering should be applied.

Two values are possible:

Code

Description

S

Standard history

F

Filtered history

## 2.2.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<redundantElements> <selectionDetails> <option>S</option> </selectionDetails> </redundantElements>

## 2.3 Sub Structure: Filter Options

## 2.3.1 Description

This section is conditional. It is possible to specify up to 20 filter options in order to filter the PNR history lines that will be returned.  
  
There are different types of filter options: they can be used to select (or exclude) certain history lines matching a criterion .

Each filter option consists of 4 entities (Predicate Details, Range Details, Predicate Type and Predicate Free Text) described as follows:

1.  **Predicate Details** (Mandatory if the Filter Option is specified): it indicates the type of the predicate. Up to 10 occurrence of Predicate Details can be defined. It contains:

-    The Option element (mandatory if the Filter Option is specified) with the following possible values:

Code

Description

FIL

Discard history lines matching the criterion

SEL

Keep history lines matching the criterion

FND

Find history lines containing certain freetext

EMS

Display the history by element type

QUE

Display the history with queuing updates

KRF

Display envelopes containing Receive From line only

FED

Display element numbering sent in feeds

TTR

Display all TTR lines

PNR

Display only PNR updates

ETR

Display only ETR updates

FUL

Return the full display history lines

-   The Associated option information (mandatory if the Filter Option is specified): 2 values are possible:

Code

Description

0

Predicate type

1

Match queue update history lines

The code "1" can be used only in combination of the "QUE" value in the Option element.

The code "0" can be used in combination of all values in the Option element.

2. **Range Details** (conditional): This segment is used for the retrieve by envelope range. It retrieves the envelopes strictly greater than the value provided in the MIN field or strictly lower than the value provided in the MAX field.

3\. **Predicate Type** (conditional): this segment is used to specify the elements to include (or exclude) in the history filtering. It contains:

-   Element Name (mandatory if the Predicate Type is specified). In the same predicate type up to 99 values can be defined. The below table contains the allowable values:

Code

Description

AB

Billing address element

AI

Accounting information element

AIR

Air segment

AM

Mailing address element

AP

Phone element

AQ

Address verification element

ATT

Attachment element

ATX

Air Taxi segment

CAR

Manual Car segment

CCR

Car segment

CRU

Cruise segment

ES

Security element

FA

FA fare element

FB

FB fare element

FD

FD fare element

FE

FE fare element

FER

Ferry segment

FG

FG fare element

FH

FH fare element

FI

FI fare element

FIN

Financial Item element

FK

FK fare element

FM

FM fare element

FN

FN fare element

FO

FO fare element

FP

FP fare element

FS

FS fare element

FT

FT fare element

FV

FV fare element

FY

FY fare element

FZ

FZ fare element

GT

Group Name

HHL

Hotel segment

HTL

Manual Hotel segment

MCO

Miscellaneous Charges Order

MIS

Manual Miscellaneous segment

NM

Name element

OP

Option element

OSI

Other Service Information element

RC

RC secured remark element

RI

Invoice remark element

RM

Remark element

RQ

Quality control remark element

RX

RX secured remark element

SK

Keyword element

SSR

Special Service Request element

ST

Seat element

SUR

Surface segment

TK

Ticket element

TRN

Train segment

TTO

Tour Source segment

TUR

Manual Tour segment

-   Reference Qualifier (conditional). Tatto type used to get the history lines associated to a particular element, following values are allowed:

Code

Description

OT

Other element tatoo reference number

PT

Passenger tattoo indicator

ST

Segment tattoo indicator

-   Reference Number (conditional) : identification number to get the history lines corresponding to a particular element

**4\. Predicate Free Text** (conditional): element used to retrieve history by free text (up to 199 alphanumeric characters)

Here are some examples of possible filter options (the corresponding XML structure can be found below):  
  
 1) To select a range of history envelope, by giving the minimum envelope number.

Predicate Details segment:

        Option element: SEL

        Associated Option information: 0  
  
    Range Details segment:

        min envelope number: 5

2) To select history lines concerning one or several element types:

Predicate Details segment:

        Option element: SEL  
        Associated Option information: 0

A group of Predicate Type Segments (remarks):

-   RM
-   RC
-   RQ

3) To filter queuing lines:  
  
    Predicate Details:

-    Option element: FIL
-    Associated option information: 0
-    Option element: QUE
-    Associated option information: 1

4) To select history lines containing some specific text.  
     

Predicate Details segment:

-   Option element: FND
-   Associated Option information: 0
-   Predicate free text:  TEST

## 2.3.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<predicate> <predicateDetails> <selectionDetails> <option>Sel</option> <optionInformation>0</optionInformation> </selectionDetails> </predicateDetails> <predicateEnvRange> <rangeDetails> <min>5</min> <max>15</max> </rangeDetails> </predicateEnvRange> </predicate> <predicate> <predicateDetails> <selectionDetails> <option>Sel</option> <optionInformation>0</optionInformation> </selectionDetails> </predicateDetails> <predicateEnvRange> <rangeDetails> </rangeDetails> </predicateEnvRange> <predicateElementType> <segmentName>RM</segmentName> </predicateElementType> <predicateElementType> <segmentName>RC</segmentName> </predicateElementType> <predicateElementType> <segmentName>RQ</segmentName> </predicateElementType> </predicate> <predicate> <predicateDetails> <selectionDetails> <option>Fil</option> <optionInformation>0</optionInformation> </selectionDetails> <otherSelectionDetails> <option>Que</option> <optionInformation>1</optionInformation> </otherSelectionDetails> </predicateDetails> </predicate> <predicate> <predicateDetails> <selectionDetails> <option>Sel</option> <optionInformation>0</optionInformation> </selectionDetails> </predicateDetails> <predicateFreeText> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <source>A</source> <encoding>2</encoding> </freeTextDetails> <freeText>TEST</freeText> </predicateFreeText> </predicate>

## 2.4 Sub Structure: Reference Number

## 2.4.1 Description

It optionally contains the maximum number of history items to retrieve.

## 2.4.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<scrollingDetails> <lastItemsDetails> <lastItemIdentifier>200</lastItemIdentifier> </lastItemsDetails> </scrollingDetails>

## 3 Receiving A Reply

If the process is successful, the PNR history is returned in a structured way. 

The reply message contains:

-   The PNR record locator and creation date
-   The PNR history items
-   The number of remaining lines to be displayed

If, at the least, a native name is present in a PNR, several names (Native name, Romanized name and Passport name, if applicable) will be present in lines containing the name actions.

In case a reservation number is present in the PNR, it is sent back in the history reply message.

If a reservation process is not successful, an error is sent in the reply message.

## 3.1 Sub Structure: Record Locator

## 3.1.1 Description

This section is mandatory. It contains:

-   PNR Record Locator: the format is a six characters alphanumeric string.
-   PNR Creation Date: the format is four numeric digits for the year, two numeric digits for the month, two numeric digits for the day.

## 3.1.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pnrRloc> <rlocInfo> <recordLocator>3J6YFG</recordLocator> <creationDate>20150106</creationDate> </rlocInfo> </pnrRloc>

* * *

## 3.2 Sub Structure: History item

## 3.2.1 Description

This section is conditional, up to 5000 history items can be returned. If no history item is returned no history line matched the filtering options in input.

Two types of history items are possible:

1.  History Line: it contains the history information.
2.  Security Details: it contains the security information for secured history elements, for example, which office can visualize the secured remark elements (RX).

Each history line consists of:

-   Previouse reference number (optional): it contains the reference to the previous envelope. It may not exist if the element is just created.
-   Current reference number (mandatory): it contains the current envelope number.
-   Update action code (Mandatory): it contains the type of action done on the history. Following values are allowed:

Code

Description

A  

Add

C

Cancel

D

Delete

F

Change responsible office

I

Increase number in party

K

Time change

N

Names transmitted

O

Original add

P

Queue add

Q

Queue update

R

Replace

S

Split and Replication

W

Change Waitlist priority

Z

Commit

-   Information type (optional) : it specifies on which element an update has been done. Following values are allowed:

Code

Description

5

Telephone nature not known

7

Remarks (free text information)

22

Document delivery address

27

Ticketing time limit

28

Other service information

52

Tour Option (entertainment, transfers, insurance, etc.)

AB

Billing address

AQ

Address Verification Element

ATT

Attachment

EAI

ETR AIR

EAM

ETR ACTIVITY MISCELLANEOUS

EAP

ETR APARTMENT

EBK

ETR BIKE

ECO

ETR COACH

ECR

ETR CAR

ECU

ETR CRUISE

EDC

ETR DOCUMENTATION

EEM

ETR EAT&DRINK MISCELLANEOUS

EEQ

ETR LEISURE EQUIPMENT

EEX

ETR EXCURSION

EFE

ETR FERRY

EFP

Extended FP

EGO

ETR GOODIES

EHL

ETR HOTEL

EIS

ETR INSURANCE

ELC

ETR LOCAL SERVICE

ELM

ETR SLEEP MISCELLANEOUS

EMM

ETR MOVE MISCELLANEOUS

EMT

ETR MEETING

EPK

ETR PARKING

ERT

ETR RESTAURANT

ES

Individual Security Elements

ESE

ETR SEAT

ESH

ETR SHOW AND EVENT

ESM

ETR SPORT MISCELLANEOUS

ESO

ETR SPORT ACTIVITY

ESV

ETR SERVICE

ETF

ETR TRANSFER

ETN

ETR RAIL

ETX

ETR TAXI

EUT

ETR URBAN TRANSPORTATION

EVC

ETR VACCINE

EVS

ETR VISA

EVT

ETR VISIT

F

Fare element

FIN

Financial Item

MAR

Marriage

MCO

Michellaneous Change Order

MIS

Element containing status code

NM

Name

OP

Option element

RR

Replication

SFP

SFP

SK

Special keyword element

SP

Split

SR

Special Service Request

SS

Segment

SVC

Manual auxiliary segment

T

Time

TP

Total price

XSB

Excess Baggage Ticket

-   Free Text (mandatory): It contains the text used to detail the action done on the history.

## 3.2.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pnrHistory> <pnrHistoryData> <currentRecord>0</currentRecord> <actionType>O</actionType> <elementType>NM</elementType> <textInformation>SMITH/TED</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <currentRecord>0</currentRecord> <actionType>O</actionType> <elementType>SS</elementType> <textInformation>6X9800 Y 15JAN 4 HELLHR LK1 0730 0800/NN \\\*1A/E\\\*</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <currentRecord>0</currentRecord> <actionType>Z</actionType> <textInformation>G CR-MUC1A0701 00000000 PR 9999BM/DS-09B12CA3 06JAN1521Z</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <currentRecord>1</currentRecord> <actionType>A</actionType> <elementType>7</elementType> <textInformation>RM REMARK</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <currentRecord>2</currentRecord> <actionType>A</actionType> <elementType>SR</elementType> <textInformation>\\\*SSR VGML6XHK1/6X9800 Y 15JAN HELLHR/SMITH/TED</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <currentRecord>2</currentRecord> <actionType>A</actionType> <elementType>OP</elementType> <textInformation>OPW-12JAN\\</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <currentRecord>3</currentRecord> <actionType>A</actionType> <elementType>7</elementType> <textInformation>RX -RX</textInformation> </pnrHistoryData> <associatedSecurity> <securityDetails> <typeOfEntity>O</typeOfEntity> <accessMode>B</accessMode> <inhouseIdentification>MUC1A0701</inhouseIdentification> <dutyCode>GS</dutyCode> </securityDetails> </associatedSecurity> </pnrHistory>

* * *

## 3.3 Sub Structure: Reference number

## 3.3.1 Description

It optionally contains the number of remaining lines to display for the PNR history.

## 3.3.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<actionDetails> <lastItemsDetails> <numberOfItems>50</numberOfItems> </lastItemsDetails> </actionDetails>

* * *

## 4 Error Messages

An error reply is composed of the following parts:

-   PNR record locator (mandatory)
-   The error message (mandatory)
-   The error free text (optional)

Following error codes can be returned:

ERROR MESSAGE

CODE

DESCRIPTION

UNABLE TO RETRIEVE PNR

119

The record locator given in the request has not been found.

RESTRICTED

20

The requestor is not authorised to retrieve the PNR.

UNABLE TO DISPLAY

103

Technical error. Contact help desk

NO ITEMS FOUND

511

PNR history contains no item corresponding to the query.

INTERNAL ERROR

727

Incorrect value entered in segmentName field  

## 4.1 Error Reply

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_DisplayHistoryReply xmlns="http://xml.amadeus.com/PHIDRR\_16\_1\_1A"> <generalErrorGroup> <errorNumber> <errorDetails> <errorCode>20</errorCode> </errorDetails> </errorNumber> <genrealErrorText> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <source>A</source> <encoding>2</encoding> </freeTextDetails> <freeText>RESTRICTED</freeText> </genrealErrorText> </generalErrorGroup> <pnrRloc> <rlocInfo> <recordLocator>ABC987</recordLocator> </rlocInfo> </pnrRloc> </PNR\_DisplayHistoryReply>

  

* * *

## 5 Operations

## 5.1 Operation: Display all the history

This operation corresponds to display the entire PNR history.

## 5.1.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_DisplayHistory xmlns="http://xml.amadeus.com/PHIDRQ\_16\_1\_1A"> <pnrInfo> <reservation> <controlNumber>3J6YFG</controlNumber> <date>20150106</date> <time>1521</time> </reservation> </pnrInfo> <redundantElements> <selectionDetails> <option>S</option> </selectionDetails> </redundantElements> </PNR\_DisplayHistory>

## 5.1.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_DisplayHistoryReply xmlns="http://xml.amadeus.com/PHIDRR\_16\_1\_1A"> <actionDetails> <lastItemsDetails> <numberOfItems>0</numberOfItems> </lastItemsDetails> </actionDetails> <pnrRloc> <rlocInfo> <recordLocator>3J6YFG</recordLocator> <creationDate>20150106</creationDate> </rlocInfo> </pnrRloc> <pnrHistory> <pnrHistoryData> <currentRecord>0</currentRecord> <actionType>O</actionType> <elementType>NM</elementType> <textInformation>SMITH/TED</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <currentRecord>0</currentRecord> <actionType>O</actionType> <elementType>SS</elementType> <textInformation>6X9800 Y 15JAN 4 HELLHR LK1 0730 0800/NN \*1A/E\*</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <currentRecord>0</currentRecord> <actionType>Z</actionType> <textInformation>G CR-MUC1A0701 00000000 PR 9999BM/DS-09B12CA3 06JAN1521Z</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <currentRecord>1</currentRecord> <actionType>A</actionType> <elementType>7</elementType> <textInformation>RM REMARK</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <currentRecord>1</currentRecord> <actionType>Z</actionType> <textInformation>G CR-MUC1A0701 00000000 PR 9999BM/DS-09B12CA3 06JAN1521Z</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <currentRecord>2</currentRecord> <actionType>A</actionType> <elementType>SR</elementType> <textInformation>\*SSR VGML6XHK1/6X9800 Y 15JAN HELLHR/SMITH/TED</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <currentRecord>2</currentRecord> <actionType>A</actionType> <elementType>OP</elementType> <textInformation>OPW-12JAN</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <currentRecord>2</currentRecord> <actionType>A</actionType> <elementType>OP</elementType> <textInformation>OPC-13JAN</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <currentRecord>2</currentRecord> <actionType>Z</actionType> <textInformation>G CR-MUC1A0701 00000000 PR 9999BM/DS-09B12CA3 06JAN1525Z</textInformation> </pnrHistoryData> </pnrHistory> </PNR\_DisplayHistoryReply>

## 5.1.3 Possible Errors

See "Error Messages" section.

* * *

## 5.2 Operation: Display all the history with RF line

The KRF (Keep RF) option is used to display envelopes containing RF line only.

## 5.2.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_DisplayHistory xmlns="http://xml.amadeus.com/PHIDRQ\_16\_1\_1A"> <pnrInfo> <reservation> <controlNumber>3J6YFG</controlNumber> </reservation> </pnrInfo> <redundantElements> <selectionDetails> <option>S</option> </selectionDetails> </redundantElements> <predicate> <predicateDetails> <selectionDetails> <option>SEL</option> <optionInformation>0</optionInformation> </selectionDetails> <otherSelectionDetails> <option>KRF</option> <optionInformation>1</optionInformation> </otherSelectionDetails> </predicateDetails> </predicate> </PNR\_DisplayHistory>

## 5.2.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_DisplayHistoryReply xmlns="http://xml.amadeus.com/PHIDRR\_16\_1\_1A"> <actionDetails> <lastItemsDetails> <numberOfItems>0</numberOfItems> </lastItemsDetails> </actionDetails> <pnrRloc> <rlocInfo> <recordLocator>3J6YFG</recordLocator> <creationDate>20150106</creationDate> </rlocInfo> </pnrRloc> <pnrHistory> <pnrHistoryData> <currentRecord>0</currentRecord> <actionType>O</actionType> <elementType>NM</elementType> <textInformation>SMITH/TED</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <currentRecord>0</currentRecord> <actionType>O</actionType> <elementType>SS</elementType> <textInformation>6X9800 Y 15JAN 4 HELLHR LK1 0730 0800/NN \*1A/E\*</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <currentRecord>0</currentRecord> <actionType>Z</actionType> <textInformation>G CR-MUC1A0701 00000000 PR 9999BM/DS-09B12CA3 06JAN1521Z</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <currentRecord>1</currentRecord> <actionType>A</actionType> <elementType>7</elementType> <textInformation>RM REMARK</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <currentRecord>1</currentRecord> <actionType>Z</actionType> <textInformation>G CR-MUC1A0701 00000000 PR 9999BM/DS-09B12CA3 06JAN1521Z</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <currentRecord>2</currentRecord> <actionType>A</actionType> <elementType>SR</elementType> <textInformation>\*SSR VGML6XHK1/6X9800 Y 15JAN HELLHR/SMITH/TED</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <currentRecord>2</currentRecord> <actionType>A</actionType> <elementType>OP</elementType> <textInformation>OPW-12JAN</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <currentRecord>2</currentRecord> <actionType>A</actionType> <elementType>OP</elementType> <textInformation>OPC-13JAN</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <currentRecord>2</currentRecord> <actionType>Z</actionType> <textInformation>G CR-MUC1A0701 00000000 PR 9999BM/DS-09B12CA3 06JAN1525Z</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <currentRecord>3</currentRecord> <actionType>Z</actionType> <textInformation>G CR-MUC1A0701 00000000 PR 9999BM/DS-09B12CA3 06JAN1536Z</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <currentRecord>4</currentRecord> <actionType>Z</actionType> <textInformation>G CR-MUC1A0701 00000000 PR 9999BM/DS-09B12CA3 06JAN1548Z</textInformation> </pnrHistoryData> </pnrHistory> </PNR\_DisplayHistoryReply>

## 5.2.3 Possible Errors

See "Error Messages" section.

* * *

## 5.3 Operation: Display element numbering sent in Feeds

This operation corresponds to the RH/FEED cryptic entry used to display the element numbering sent in Feeds.

## 5.3.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_DisplayHistory xmlns="http://xml.amadeus.com/PHIDRQ\_16\_1\_1A"> <pnrInfo> <reservation> <controlNumber>YPO23D</controlNumber> </reservation> </pnrInfo> <redundantElements> <selectionDetails> <option>F</option> </selectionDetails> </redundantElements> <predicate> <predicateDetails> <selectionDetails> <option>FED</option> <optionInformation>0</optionInformation> </selectionDetails> </predicateDetails> </predicate> </PNR\_DisplayHistory>

## 5.3.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_DisplayHistoryReply xmlns="http://xml.amadeus.com/PHIDRR\_16\_1\_1A"> <actionDetails> <lastItemsDetails> <numberOfItems>0</numberOfItems> </lastItemsDetails> </actionDetails> <pnrRloc> <rlocInfo> <recordLocator>YPO23D</recordLocator> <creationDate>20150608</creationDate> </rlocInfo> </pnrRloc> <pnrHistory> <pnrHistoryData> <currentRecord>0</currentRecord> <actionType>O</actionType> <elementType>NM</elementType> <textInformation>SMITH/TED</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <currentRecord>0</currentRecord> <actionType>O</actionType> <elementType>SS</elementType> <textInformation>6X9800 Y 15JUL 3 HELLHR LK1 0730 0800/NN \*1A/E\*</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <currentRecord>0</currentRecord> <actionType>O</actionType> <elementType>5</elementType> <textInformation>AP MUC - AMADEUS DEFAULT OFFICE - A</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <currentRecord>0</currentRecord> <actionType>O</actionType> <elementType>27</elementType> <textInformation>TKOK 08JUN/MUC1A0701</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <currentRecord>0</currentRecord> <actionType>Z</actionType> <textInformation>PDF CR-MUC1A0701 00000000 PR 9999BM/DS-09B12C16 08JUN1239Z</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <currentRecord>1</currentRecord> <actionType>A</actionType> <elementType>SR</elementType> <textInformation>\*SSR VGML6XHK1/6X9800 Y 15JUL HELLHR/SMITH/TED</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <currentRecord>1</currentRecord> <actionType>A</actionType> <elementType>OP</elementType> <textInformation>OPW-17JUN</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <currentRecord>1</currentRecord> <actionType>A</actionType> <elementType>OP</elementType> <textInformation>OPC-18JUN</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <currentRecord>1</currentRecord> <actionType>P</actionType> <textInformation>QE/MUC1A0701/1C14</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <currentRecord>1</currentRecord> <actionType>Z</actionType> <textInformation>AIL OPW AUTO WARNING CR-NCE1A0955 12345675 SU 7848RS 17JUN1840Z</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <currentRecord>1</currentRecord> <actionType>Z</actionType> <textInformation>G CR-NCE1A0990 53458263 RC 0001AA/DS-09B12CA3 23JUN0918Z</textInformation> </pnrHistoryData> </pnrHistory> </PNR\_DisplayHistoryReply>

## 5.3.3 Possible Errors

See "Error Messages" section.

* * *

## 5.4 Operation: Display ETRs in the history

By using the filter ETR or TTR, the user can display history lines corresponding to ETRs updates.

## 5.4.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_DisplayHistory xmlns="http://xml.amadeus.com/PHIDRQ\_16\_1\_1A"> <pnrInfo> <reservation> <controlNumber>XYZ987</controlNumber> <date>20150808</date> </reservation> </pnrInfo> <redundantElements> <selectionDetails> <option>S</option> </selectionDetails> </redundantElements> <predicate> <predicateDetails> <selectionDetails> <option>TTR</option> <optionInformation>1</optionInformation> </selectionDetails> </predicateDetails> </predicate> </PNR\_DisplayHistory>

## 5.4.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_DisplayHistoryReply xmlns="http://xml.amadeus.com/PHIDRR\_16\_1\_1A"> <actionDetails> <lastItemsDetails> <numberOfItems>0</numberOfItems> </lastItemsDetails> </actionDetails> <pnrRloc> <rlocInfo> <recordLocator>XYZ987</recordLocator> <creationDate>20150808</creationDate> </rlocInfo> </pnrRloc> <pnrHistory> <pnrHistoryData> <currentRecord>0</currentRecord> <actionType>O</actionType> <elementType>GT</elementType> <textInformation>00TEST</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <currentRecord>0</currentRecord> <actionType>O</actionType> <elementType>NM</elementType> <textInformation>TEST/SOPHIE</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <currentRecord>0</currentRecord> <actionType>O</actionType> <elementType>EAI</elementType> <textInformation>6X 763 S 08AUG 6 VIEVAR NN2 0955 1240/GI \*1A/E\*</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <currentRecord>0</currentRecord> <actionType>O</actionType> <elementType>SSR</elementType> <textInformation>SSR GRPFOS TEST</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <currentRecord>0</currentRecord> <actionType>Z</actionType> <textInformation>BR CR-MUC1A0701 00000000 PR 9999BM/DS-09023310 10JUL1326Z</textInformation> </pnrHistoryData> </pnrHistory> </PNR\_DisplayHistoryReply>

## 5.4.3 Possible Errors

See "Error Messages" section.

* * *

## 5.5 Operation: Display only the air segment without Queue updates

This operation corresponds to display the PNR history only with air segments without queue updates.

## 5.5.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_DisplayHistory xmlns="http://xml.amadeus.com/PHIDRQ\_16\_1\_1A"> <pnrInfo> <reservation> <controlNumber>3J6YFG</controlNumber> <date>20150106</date> <time>1521</time> </reservation> </pnrInfo> <redundantElements> <selectionDetails> <option>S</option> </selectionDetails> </redundantElements> <predicate> <predicateDetails> <selectionDetails> <option>SEL</option> <optionInformation>0</optionInformation> </selectionDetails> </predicateDetails> <predicateElementType> <segmentName>AIR</segmentName> </predicateElementType> </predicate> <predicate> <predicateDetails> <selectionDetails> <option>FIL</option> <optionInformation>1</optionInformation> </selectionDetails> <otherSelectionDetails> <option>QUE</option> <optionInformation>0</optionInformation> </otherSelectionDetails> </predicateDetails> </predicate> </PNR\_DisplayHistory>

## 5.5.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_DisplayHistoryReply xmlns="http://xml.amadeus.com/PHIDRR\_16\_1\_1A"> <actionDetails> <lastItemsDetails> <numberOfItems>0</numberOfItems> </lastItemsDetails> </actionDetails> <pnrRloc> <rlocInfo> <recordLocator>3J6YFG</recordLocator> <creationDate>20150106</creationDate> </rlocInfo> </pnrRloc> <pnrHistory> <pnrHistoryData> <currentRecord>0</currentRecord> <actionType>O</actionType> <elementType>SS</elementType> <textInformation>6X9800 Y 15JAN 4 HELLHR LK1 0730 0800/NN \*1A/E\*</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <currentRecord>0</currentRecord> <actionType>Z</actionType> <textInformation>G CR-MUC1A0701 00000000 PR 9999BM/DS-09B12CA3 06JAN1521Z</textInformation> </pnrHistoryData> </pnrHistory> </PNR\_DisplayHistoryReply>

## 5.5.3 Possible Errors

See "Error Messages" section.

* * *

## 5.6 Operation: Display the history for a range of envelope

This corresponds to display the PNR history beginning at envelope 5.

## 5.6.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_DisplayHistory xmlns="http://xml.amadeus.com/PHIDRQ\_16\_1\_1A"> <pnrInfo> <reservation> <controlNumber>3J6YFG</controlNumber> </reservation> </pnrInfo> <redundantElements> <selectionDetails> <option>S</option> </selectionDetails> </redundantElements> <predicate> <predicateDetails> <selectionDetails> <option>SEL</option> <optionInformation>0</optionInformation> </selectionDetails> </predicateDetails> <predicateEnvRange> <rangeDetails> <min>4</min> </rangeDetails> </predicateEnvRange> </predicate> </PNR\_DisplayHistory>

## 5.6.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_DisplayHistory xmlns="http://xml.amadeus.com/PHIDRQ\_16\_1\_1A"> <actionDetails> <lastItemsDetails> <numberOfItems>0</numberOfItems> </lastItemsDetails> </actionDetails> <pnrRloc> <rlocInfo> <recordLocator>3J6YFG</recordLocator> <creationDate>20150106</creationDate> </rlocInfo> </pnrRloc> <pnrHistory> <pnrHistoryData> <currentRecord>5</currentRecord> <actionType>P</actionType> <textInformation>QE/MUC1A0701/1C14</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <currentRecord>5</currentRecord> <actionType>Z</actionType> <textInformation>AIL OPW AUTO WARNING CR-NCE1A0955 12345675 SU 7848RS 12JAN0629Z</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <previousRecord>2</previousRecord> <currentRecord>7</currentRecord> <actionType>C</actionType> <elementType>SR</elementType> <textInformation>\*SSR VGML6XHK1/6X9800 Y 15JAN HELLHR/SMITH/TED</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <previousRecord>2</previousRecord> <currentRecord>7</currentRecord> <actionType>C</actionType> <elementType>OP</elementType> <textInformation>OPW-12JAN</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <previousRecord>2</previousRecord> <currentRecord>7</currentRecord> <actionType>C</actionType> <elementType>OP</elementType> <textInformation>OPC-13JAN</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <currentRecord>7</currentRecord> <actionType>Z</actionType> <textInformation>AIL OPC AUTO CANCEL CR-NCE1A0955 12345675 SU 7848RS/DS-9CB5A0CF 13JAN0629Z</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <currentRecord>8</currentRecord> <actionType>P</actionType> <textInformation>QE/MUC1A0701/1C16D1</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <currentRecord>8</currentRecord> <actionType>Z</actionType> <textInformation>AIL OPC AUTO CANCEL CR-NCE1A0955 12345675 SU 7848RS 13JAN0629Z</textInformation> </pnrHistoryData> </pnrHistory> </PNR\_DisplayHistory>

## 5.6.3 Possible Errors

See "Error Messages" section.

* * *

## 5.7 Operation: Display the History for the Remark elements

This operation corresponds to display only the PNR history lines concerning the Remark elements (RM, RC, RX, RI), without the queuing actions.

## 5.7.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_DisplayHistory xmlns="http://xml.amadeus.com/PHIDRQ\_16\_1\_1A"> <pnrInfo> <reservation> <controlNumber>3J6YFG</controlNumber> </reservation> </pnrInfo> <redundantElements> <selectionDetails> <option>S</option> </selectionDetails> </redundantElements> <predicate> <predicateDetails> <selectionDetails> <option>SEL</option> <optionInformation>0</optionInformation> </selectionDetails> </predicateDetails> <predicateElementType> <segmentName>RM</segmentName> </predicateElementType> <predicateElementType> <segmentName>RC</segmentName> </predicateElementType> <predicateElementType> <segmentName>RX</segmentName> </predicateElementType> <predicateElementType> <segmentName>RI</segmentName> </predicateElementType> </predicate> <predicate> <predicateDetails> <selectionDetails> <option>FIL</option> <optionInformation>0</optionInformation> </selectionDetails> <otherSelectionDetails> <option>QUE</option> <optionInformation>1</optionInformation> </otherSelectionDetails> </predicateDetails> </predicate> </PNR\_DisplayHistory>

## 5.7.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_DisplayHistory xmlns="http://xml.amadeus.com/PHIDRQ\_16\_1\_1A"> <actionDetails> <lastItemsDetails> <numberOfItems>0</numberOfItems> </lastItemsDetails> </actionDetails> <pnrRloc> <rlocInfo> <recordLocator>3J6YFG</recordLocator> <creationDate>20150106</creationDate> </rlocInfo> </pnrRloc> <pnrHistory> <pnrHistoryData> <currentRecord>1</currentRecord> <actionType>A</actionType> <elementType>7</elementType> <textInformation>RM REMARK</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <currentRecord>1</currentRecord> <actionType>Z</actionType> <textInformation>G CR-MUC1A0701 00000000 PR 9999BM/DS-09B12CA3 06JAN1521Z</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <currentRecord>3</currentRecord> <actionType>A</actionType> <elementType>7</elementType> <textInformation>RX -RX</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <currentRecord>3</currentRecord> <actionType>Z</actionType> <textInformation>G CR-MUC1A0701 00000000 PR 9999BM/DS-09B12CA3 06JAN1536Z</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <currentRecord>9</currentRecord> <actionType>A</actionType> <elementType>7</elementType> <textInformation>RX -TEST</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <currentRecord>9</currentRecord> <actionType>Z</actionType> <textInformation>TMG CR-MUC1A0701 00000000 PR 9999BM/DS-09B12CA3 13JAN1510Z</textInformation> </pnrHistoryData> </pnrHistory> </PNR\_DisplayHistory>

## 5.7.3 Possible Errors

See "Error Messages" section.

* * *

## 5.8 Operation: Display the history of a PNR containing a remark in unicode

This operation corresponds to display the PNR history of a PNR containing remark with UTF8 characters, from an office supporting UTF8 characters.

## 5.8.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_DisplayHistory xmlns="http://xml.amadeus.com/PHIDRQ\_16\_1\_1A"> <pnrInfo> <reservation> <controlNumber>2M8STR</controlNumber> <date>20100909</date> <time>0342</time> </reservation> </pnrInfo> <redundantElements> <selectionDetails> <option>S</option> </selectionDetails> </redundantElements> <predicate> <predicateDetails> <selectionDetails> <option>SEL</option> <optionInformation>0</optionInformation> </selectionDetails> </predicateDetails> <predicateEnvRange> <rangeDetails> <min>2</min> </rangeDetails> </predicateEnvRange> </predicate> </PNR\_DisplayHistory>

## 5.8.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_DisplayHistoryReply xmlns="http://xml.amadeus.com/PHIDRR\_16\_1\_1A"> <actionDetails> <lastItemsDetails> <numberOfItems>0</numberOfItems> </lastItemsDetails> </actionDetails> <pnrRloc> <rlocInfo> <recordLocator>2M8STR</recordLocator> <creationDate>20121023</creationDate> </rlocInfo> </pnrRloc> <pnrHistory> <pnrHistoryData> <currentRecord>0</currentRecord> <actionType>O</actionType> <elementType>NM</elementType> <textInformation>KIM/JIHUN(ADT)</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <currentRecord>0</currentRecord> <actionType>O</actionType> <elementType>SS</elementType> <textInformation>AF2203 N 10NOV 6 TRNCDG LK1 0725 0900/NN \*1A/E\*</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <currentRecord>0</currentRecord> <actionType>Z</actionType> <textInformation>JACK CR-MNLPH27FD 28303590 SU 1007JV/DS-586327BD 23OCT0525Z</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <currentRecord>23</currentRecord> <actionType>A</actionType> <elementType>1</elementType> <textInformation>RM</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <currentRecord>0</currentRecord> <actionType>Z</actionType> <textInformation>JACK CR-MNLPH27FD 28303590 SU 1007JV/DS-586327BD 23OCT0527Z</textInformation> </pnrHistoryData> </pnrHistory> </PNR\_DisplayHistoryReply>

## 5.8.3 Possible Errors

See "Error Messages" section.

* * *

## 5.9 Operation: Display the history of a PNR containing a reservation number

The Display History operation contains the reservation number in this case.

## 5.9.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_DisplayHistory xmlns="http://xml.amadeus.com/PHIDRQ\_16\_1\_1A"> <pnrInfo> <reservation> <controlNumber>X37G8V</controlNumber> <date>20070716</date> <time>1235</time> </reservation> </pnrInfo> <redundantElements> <selectionDetails> <option>S</option> </selectionDetails> </redundantElements> </PNR\_DisplayHistory>

## 5.9.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_DisplayHistoryReply xmlns="http://xml.amadeus.com/PHIDRR\_16\_1\_1A"> <actionDetails> <lastItemsDetails> <numberOfItems>0</numberOfItems> </lastItemsDetails> </actionDetails> <pnrRloc> <rlocInfo> <recordLocator>X37G8V</recordLocator> <creationDate>20070716</creationDate> </rlocInfo> </pnrRloc> <pnrRloc> <rlocInfo> <companyId>KE</companyId> <recordLocator>1234-5678</recordLocator> <controlType>I</controlType> </rlocInfo> </pnrRloc> <pnrHistory> <pnrHistoryData> <currentRecord>0</currentRecord> <actionType>O</actionType> <elementType>NM</elementType> <textInformation>ASTON/MARTIN ASTON/VILLA</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <currentRecord>0</currentRecord> <actionType>O</actionType> <elementType>SS</elementType> <textInformation>IB3401 Y 15DEC 6 ORYMAD LK2 0700 0850/NN \*1A/E\*</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <currentRecord>0</currentRecord> <actionType>O</actionType> <elementType>SR</elementType> <textInformation>SSR VGMLIBNN1/IB3401 Y 15DEC ORYMAD/ASTON/MARTIN</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <currentRecord>0</currentRecord> <actionType>Z</actionType> <textInformation>T CR-MUC1A0701 PR 9999BM 16JUL/1235Z</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <currentRecord>1</currentRecord> <actionType>A</actionType> <elementType>SS</elementType> <textInformation>IB3440 Y 16DEC 7 MADORY LK2 0850 1045/NN \*1A/E\*</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <currentRecord>1</currentRecord> <actionType>A</actionType> <elementType>SR</elementType> <textInformation>SSR OTHSYY TEST/ASTON/VILLA</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <currentRecord>1</currentRecord> <actionType>A</actionType> <elementType>7</elementType> <textInformation>RM TEST</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <currentRecord>1</currentRecord> <actionType>Z</actionType> <textInformation>TEST CR-MUC1A0701 PR 9999BM 16JUL/1320Z</textInformation> </pnrHistoryData> </pnrHistory> </PNR\_DisplayHistoryReply>

## 5.9.3 Possible Errors

See "Error Messages" section.

* * *

## 5.10 Operation: Display the history of PNR containing native names

This corresponds to display the PNR history of a PNR containing native names, from an office supporting UTF8 characters.

## 5.10.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_DisplayHistory xmlns="http://xml.amadeus.com/PHIDRQ\_16\_1\_1A"> <pnrInfo> <reservation> <controlNumber>5XO9ID</controlNumber> <date>20100909</date> <time>0342</time> </reservation> </pnrInfo> <redundantElements> <selectionDetails> <option>S</option> </selectionDetails> </redundantElements> <predicate> <predicateDetails> <selectionDetails> <option>SEL</option> <optionInformation>0</optionInformation> </selectionDetails> </predicateDetails> <predicateEnvRange> <rangeDetails> <min>2</min> </rangeDetails> </predicateEnvRange> </predicate> </PNR\_DisplayHistory>

## 5.10.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_DisplayHistoryReply xmlns="http://xml.amadeus.com/PHIDRR\_16\_1\_1A"> <actionDetails> <lastItemsDetails> <numberOfItems>0</numberOfItems> </lastItemsDetails> </actionDetails> <pnrRloc> <rlocInfo> <recordLocator>5XO9ID</recordLocator> <creationDate>20100909</creationDate> </rlocInfo> </pnrRloc> <pnrHistory> <pnrHistoryData> <currentRecord>0</currentRecord> <actionType>O</actionType> <elementType>NM</elementType> <textInformation>00TEST</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <currentRecord>0</currentRecord> <actionType>O</actionType> <elementType>NM</elementType> <textInformation>김/지훈|KIM/JI HUN</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <currentRecord>0</currentRecord> <actionType>O</actionType> <elementType>SR</elementType> <textInformation>SSR VGML 6X WQQETG</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <currentRecord>0</currentRecord> <actionType>Z</actionType> <textInformation>S CR-PUS6X0980 00000000 PR 9999BM/DS-09B557DF 17NOV1320Z</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <currentRecord>1</currentRecord> <actionType>P</actionType> <textInformation>QE/PUS6X0980 /87C16</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <currentRecord>1</currentRecord> <actionType>Z</actionType> <textInformation>CR-PUS6X0980 00000000 PR 9999BM 17NOV1320Z</textInformation> </pnrHistoryData> </pnrHistory> </PNR\_DisplayHistoryReply>

## 5.10.3 Possible Errors

See "Error Messages" section.

* * *

## 5.11 Operation: Display the history with a freetext filter

This operation corresponds to display the PNR history lines that contain the freetext 'TEST'

## 5.11.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_DisplayHistory xmlns="http://xml.amadeus.com/PHIDRQ\_16\_1\_1A"> <pnrInfo> <reservation> <controlNumber>3J6YFG</controlNumber> </reservation> </pnrInfo> <redundantElements> <selectionDetails> <option>S</option> </selectionDetails> </redundantElements> <predicate> <predicateDetails> <selectionDetails> <option>FND</option> <optionInformation>0</optionInformation> </selectionDetails> </predicateDetails> <predicateFreeText> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <source>A</source> <encoding>2</encoding> </freeTextDetails> <freeText>TEST</freeText> </predicateFreeText> </predicate> </PNR\_DisplayHistory>

## 5.11.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_DisplayHistoryReply xmlns="http://xml.amadeus.com/PHIDRR\_16\_1\_1A"> <actionDetails> <lastItemsDetails> <numberOfItems>0</numberOfItems> </lastItemsDetails> </actionDetails> <pnrRloc> <rlocInfo> <recordLocator>3J6YFG</recordLocator> <creationDate>20150106</creationDate> </rlocInfo> </pnrRloc> <pnrHistory> <pnrHistoryData> <currentRecord>9</currentRecord> <actionType>A</actionType> <elementType>7</elementType> <textInformation>RX -TEST</textInformation> </pnrHistoryData> </pnrHistory> </PNR\_DisplayHistoryReply>

## 5.11.3 Possible Errors

See "Error Messages" section.

* * *

## 5.12 Operation: Display the history with ETRs

This operation corresponds to display the PNR history without the queuing actions.

## 5.12.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_DisplayHistory xmlns="http://xml.amadeus.com/PHIDRQ\_16\_1\_1A"> <pnrInfo> <reservation> <controlNumber>X37G8V</controlNumber> <date>20140716</date> <time>1235</time> </reservation> </pnrInfo> <redundantElements> <selectionDetails> <option>S</option> </selectionDetails> </redundantElements> <predicate> <predicateDetails> <selectionDetails> <option>FIL</option> <optionInformation>0</optionInformation> </selectionDetails> <otherSelectionDetails> <option>QUE</option> <optionInformation>1</optionInformation> </otherSelectionDetails> </predicateDetails> </predicate> </PNR\_DisplayHistory>

## 5.12.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_DisplayHistoryReply xmlns="http://xml.amadeus.com/PHIDRR\_16\_1\_1A"> <actionDetails> <lastItemsDetails> <numberOfItems>0</numberOfItems> </lastItemsDetails> </actionDetails> <pnrRloc> <rlocInfo> <recordLocator>X37G8V</recordLocator> <creationDate>20140716</creationDate> </rlocInfo> </pnrRloc> <pnrHistory> <pnrHistoryData> <currentRecord>0</currentRecord> <actionType>O</actionType> <elementType>NM</elementType> <textInformation>ASTON/MARTIN ASTON/VILLA</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <currentRecord>0</currentRecord> <actionType>O</actionType> <elementType>SS</elementType> <textInformation>IB3401 Y 15DEC 6 ORYMAD LK2 0700 0850/NN \*1A/E\*</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <currentRecord>0</currentRecord> <actionType>O</actionType> <elementType>SR</elementType> <textInformation>SSR VGMLIBNN1/IB3401 Y 15DEC ORYMAD/ASTON/MARTIN</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <currentRecord>0</currentRecord> <actionType>Z</actionType> <textInformation>T CR-MUC1A0701 PR 9999BM 16JUL/1235Z</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <currentRecord>1</currentRecord> <actionType>A</actionType> <elementType>SS</elementType> <textInformation>IB3440 Y 16DEC 7 MADORY LK2 0850 1045/NN \*1A/E\*</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <currentRecord>1</currentRecord> <actionType>A</actionType> <elementType>SR</elementType> <textInformation>SSR OTHSYY TEST/ASTON/VILLA</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <currentRecord>1</currentRecord> <actionType>A</actionType> <elementType>7</elementType> <textInformation>RM TEST</textInformation> </pnrHistoryData> </pnrHistory> <pnrHistory> <pnrHistoryData> <currentRecord>1</currentRecord> <actionType>Z</actionType> <textInformation>TEST CR-MUC1A0701 PR 9999BM 16JUL/1320Z</textInformation> </pnrHistoryData> </pnrHistory> </PNR\_DisplayHistoryReply>

## 5.12.3 Possible Errors

See "Error Messages" section.

* * *