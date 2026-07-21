---
url: "https://developers.amadeus.com/api-library/soap/functional-doc/2709/doc-read/7922?serviceVersion=2.0"
download_url: "https://developers.amadeus.com/PAS-EAS/api/download/comp/4d4ad2cb456c02633f463a055ab70584/7922/HTML_UG_WBS_PAY_CancelVirtualCardLoad___02.0/UG_WBS_PAY_CancelVirtualCardLoad___02.0_011.html"
title: "HTML_UG_WBS_PAY_CancelVirtualCardLoad_ _02.0_011"
source: "amadeus"
service_id: "2709"
service_name: "PAY_CancelVirtualCardLoad"
version: "3.0"
document_id: "7922"
doc_version: "2.0"
doc_type: "User guide"
file_format: "HTML"
scraped_at: "2026-07-15T10:31:04.846Z"
---
# Function: PAY\_CancelVirtualCardLoad

* * *

## 1 Overview

The PAY\_CancelVirtualCardLoad service is composed of:

-   Query: PAY\_CancelVirtualCardLoadRQ
-   Response: PAY\_CancelVirtualCardLoadRS

This guide explains how to use the service.

## 1.1 Supported Operations

-   Cancel a scheduled funds transfer

## 1.2 Limitations

Funds transfer load cancellation can only be used if a Virtual Card has been previously generated with one or more scheduled loads. Cancellation can only be done if the scheduled load has not been processed or cancelled yet. It is only available for the card providers that offer this service.

## 1.3 Unsupported Operations

Not applicable

## 1.4 Prerequisites

You must be a user of Amadeus Payment Virtual Cards and have all the configurations required in the Amadeus Payment system.

This service requires you to have at least one of following LSS permissions:

-   GENERATE\_VCN
-   ADMIN\_GENERATE\_VCN

You can only cancel a scheduled funds transfer to a virtual card that has been created in your sign-in office.

## 2 Building A Query

The structure of the xml message is defined as follows:

-   Path: XML path for the element
-   Status: Mandatory or Optional
-   Repetion: the number of repetitions allowed for this element
-   Explanation: Explanation of the meaning of the element
-   Value: type of value for the element (only for attribute and simple types)
    -   AN = Alphanumeric characters
    -   A = Alphabetical characters
    -   N = Numerical characters
    -   String = \[0-9\]\[A-Za-z\]\[\_- \]

The query AMA\_PAY\_CancelVirtualCardLoadRQ is composed of 1 group

Path

Status

Repetition

Explanation

Value

<FundsTransfer>

Mandatory

1

Parameter to be used to cancel the scheduled load.

## 2.1 Sub Structure: FundsTransfer

## 2.1.1 Description

**Path**

**Status**

**Repetition**

**Explanation**

**Value**

<FundsTransfer @Reference>

Mandatory

1

Unique Amadeus reference for the schedule funds transfer to cancel

String 1..128

<FundsTransfer>

<Reason>

Optional

1

Free text giving additional information for the funds transfer deletion

String 1..256

<FundsTransfer>

<Reason

@Language>

Optional

1

Define the language of the reason provided

xs:language

## 2.1.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 3 Receiving A Reply

## 3.1 Sub Structure: Failure

## 3.1.1 Description

**Path**

**Status**

**Repetition**

**Explanation**

**Value**

<Failure> <Warnings>

Optional

1..9

Used to convey warnings regarding the cancellation

Warning message

<Failure> <Warnings> <ama:Warnings>

Mandatory

1

Amadeus generic group to convey Warning message

<Failure> <Warnings> <ama:Warnings> <ama:Warning>

Mandatory

1..99

Description of the warning.

Warning message

<Failure> <Warnings> <ama:Warnings> <ama:Warning @Type>

Mandatory

1

Type of warning

<Failure> <Warnings> <ama:Warning> <ama:Warning @Code>

Mandatory

1

Warning code

<Failure> <Errors>

Optional

1

Used to convey errors regarding the cancellation

Error message

<Failure> <Errors> <ama:Errors>

Mandatory

1

Amadeus generic group to convey Error message

<Failure> <Errors> <ama:Errors> <ama:Error>

Mandatory

1..99

Description of the Error.

Error message

<Failure> <Errors> <ama:Errors> <ama:Error @Type>

Mandatory

1

Type of Error

<Failure> <Errors> <ama:Errors> <ama:Error @Code>

Mandatory

1

Error code

## 3.1.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

* * *

## 3.2 Sub Structure: Success

## 3.2.1 Description

**Path**

**Status**

**Repetition**

**Explanation**

**Value**

<FundsTransfer>

Mandatory

1

Information about the scheduled load that has been cancelled.

<FundsTransfer @Action>

Optional

1

Funding method. Add or reduce amount. By default, if not provided, value is set to Add.

AN1..19

<FundsTransfer @Status>

Mandatory

1

Status of the scheduling: Scheduled, Completed or Cancelled

String 1..128

<FundsTransfer @Reference>

Mandatory

1

Unique Amadeus reference for the schedule load.

String 1..128

<FundsTransfer @UserID>

Optional

1

The ID of the user who performed the transaction

AN1..30

<FundsTransfer @OfficeID>

Optional

1

The office where the transaction has been performed

AN1..30

<FundsTransfer @CreationDate>

Optional

1

The date when the transaction has been requested

Date or DateTime Type

< FundsTransfer >

<Value @Type>

Optional

1

Gives the type of value of the amount. It can be set to Requested or Loaded.

String 1..99

< FundsTransfer >

<Value @Amount>

Mandatory

1

Amount to be loaded on the card

Integer

<FundsTransfer>

<Value @DecimalPlaces>

Mandatory

1

Indicate the number of decimals for the provided amount

Integer

<FundsTransfer>

<Value @CurrencyCode>

Mandatory

1

Currency of the amount. Uppercase ISO 4217.

A3

<FundsTransfer>

<Scheduling @Date>

Optional

1

Date when the funds are loaded on the VCN. If not provided, funds are loaded the day of the request.

Date or DateTime Type

## 3.2.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

* * *

## 4 Error Messages

**Code**

**Text**

29745

OPERATION NOT SUPPORTED FOR THIS PROVIDER

34734

VIRTUAL CARD NOT FOUND

02322

CONFIGURATION ERROR

37287

INVALID SCHEDULED LOAD REFERENCE

00727

INVALID ENTRY

## 4.1 Error Reply

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_PAY\_CancelVirtualCardLoadRS xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" Version="2.0" xsi:schemaLocation="http://xml.amadeus.com/2010/06/PAY\_VirtualCard\_v2 AMA\_PAY\_CancelVirtualCardLoadRS.xsd"> <Failure> <Errors> <ama:Errors> <ama:Error Code="37287" Language="EN" ShortText="INVALID SCHEDULED LOAD REFERENCE" Type="ERR"></ama:Error> </ama:Errors> </Errors> </Failure> </AMA\_PAY\_CancelVirtualCardLoadRS>

  

* * *

## 5 Operations

## 5.1 Operation: Cancel a scheduled load

## 5.1.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_PAY\_CancelVirtualCardLoadRQ Version="2.0" xsi:schemaLocation="http://xml.amadeus.com/2010/06/PAY\_VirtualCard\_v2 AMA\_PAY\_CancelVirtualCardLoadRQ.xsd"> <FundsTransfer Reference="222222AA1"> <Reason>Booking cancelled.</Reason> </FundsTransfer> </AMA\_PAY\_CancelVirtualCardLoadRQ>

## 5.1.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_PAY\_CancelVirtualCardLoadRS Version="2.0" xsi:schemaLocation="http://xml.amadeus.com/2010/06/PAY\_VirtualCard\_v2 AMA\_PAY\_CancelVirtualCardLoadRS.xsd"> <Success> <FundsTransfer OfficeID="NCE1A0955" Reference="222222AA1" Status="Cancelled" UserID="JDOE"> <Value Amount="10000" Currency="EUR" DecimalPlaces="2"></Value> <Scheduling Date="2017-08-13"></Scheduling> </FundsTransfer> </Success> </AMA\_PAY\_CancelVirtualCardLoadRS>

## 5.1.3 Possible Errors

See "Error Messages" section.

* * *