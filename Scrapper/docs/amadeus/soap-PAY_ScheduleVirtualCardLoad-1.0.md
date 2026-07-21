---
url: "https://developers.amadeus.com/api-library/soap/functional-doc/2710/doc-read/6416?serviceVersion=1.0"
download_url: "https://developers.amadeus.com/PAS-EAS/api/download/comp/4d4ad2cb456c02633f463a055ab70584/6416/HTML_UG_WBS_PAY_ScheduleVirtualCardLoad___01.0/UG_WBS_PAY_ScheduleVirtualCardLoad___01.0_014.html"
title: "HTML_UG_WBS_PAY_ScheduleVirtualCardLoad_ _01.0_014"
source: "amadeus"
service_id: "2710"
service_name: "PAY_ScheduleVirtualCardLoad"
version: "3.0"
document_id: "6416"
doc_version: "1.0"
doc_type: "User guide"
file_format: "HTML"
scraped_at: "2026-07-15T10:32:44.290Z"
---
# Function: PAY\_ScheduleVirtualCardLoad

* * *

## 1 Overview

The ScheduleVirtualCardLoad feature is part of the services provided by Amadeus Payment Virtual Card interface. It enables an agent to request and schedule funds transfer to an existing Virtual Card.

## 1.1 Supported Operations

-   Request immediate funds transfer
-   Schedule funds transfer

## 1.2 Limitations

Funds tansfer creation feature can only be used if a Virtual Card has been previously generated, and it is only available for the card provider that offers this service.

## 1.3 Unsupported Operations

Not applicable

## 1.4 Prerequisites

You must be a user of Amadeus Payment Virtual Cards and have all the configurations required in the AmadeusPayment system.

This service requires you to have at least one of following LSS permissions:

-   GENERATE\_VCN
-   ADMIN\_GENERATE\_VCN

You can only request a funds transfer to a virtual card that has been created in your sign-in office.

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

The query AMA\_PAY\_ScheduleVirtualCardLoadRQ is composed of 3 groups

Path

Status

Repetition

Explanation

Value

<Target>

Mandatory

1

References of the Virtual Card where the funds have to be transferred

<FundsTransfer>

Madatory

1

Parameters to be used to set the scheduled load.

<Reason>

Optional

1

Supplementary information to provide details about the funds transfer

  

## 2.1 Sub Structure: Target

## 2.1.1 Description

**Path**

**Status**

**Repetition**

**Explanation**

**Value**

<Target>

<References>

Mandatory

1

References of the Virtual Card where the funds have to be transferred

<Target>

<References>

<Reference>

Mandatory

1..2

Reference of the Virtual Card to update

String 1..128

<Target>

<References>

<Reference @type>

Mandatory

1

Type of reference. Values are Amadeus, External and Product.

AN1..25

## 2.1.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 2.2 Sub Structure: FundsTransfer

## 2.2.1 Description

**Path**

**Status**

**Repetition**

**Explanation**

**Value**

<FundsTransfer>

Mandatory

1

Parameters to be used to set the scheduled load.

< FundsTransfer @Action>

Optional

1

Funding method. Add or reduceamount. By default, if not provided, value is set to Add.

AN1..19

< FundsTransfer >

<Value @Amount>

Mandatory

1

Amount to be transferred to the card

Integer

< FundsTransfer >

<Value @DecimalPlace>

Mandatory

1

Indicate the number of decimal for the provided amount

Integer

< FundsTransfer >

<Value @Currency>

Mandatory

1

Currency of the amount. Uppercase ISO 4217.

A3

< FundsTransfer >

<Scheduling @Date>

Optional

1

Date when the funds are loaded on the VCN. If not provided, funds are loaded on the same day.

Date or DateTime Type

## 2.2.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 2.3 Sub Structure: Reason

## 2.3.1 Description

Path

Status

Repetition

Explanation

Value

<Reason>

Optional

1

Free text giving additional information for the funds transfer creation

String 1..256

<Reason

@language>

Optional

1

Define the language of the reason provided

xs:language

## 2.3.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 3 Receiving A Reply

AMA\_PAY\_ScheduleVirtualCardLoadRS contains Success and failure groups

## 3.1 Sub Structure: Success

## 3.1.1 Description

**Path**

**Status**

**Repetition**

**Explanation**

**Value**

<Target>

<References>

Mandatory

1

References of the Virtual Card provided in query where the funds have to be transferred

<Target>

<References>

<Reference>

Mandatory

1..2

Reference of the Virtual Card to update

String 1..128

< Target>

<References>

<Reference @type>

Mandatory

1

Type of reference. Values are Amadeus, External and Product.

AN1..25

<FundsTransfer>

Mandatory

1

Parameters that have been used to set the scheduled load.

<FundsTransfer @Action>

Optional

1

Funding method. Add or reduce amount. By default, if not provided, value is set to Add.

AN1..19

<FundsTransfer @Status>

Mandatory

1

Status of the scheduling: Scheduled, Passed or Cancelled

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

The office where thetransaction has been performed

AN1..30

<FundsTransfer @CreationDate>

Optional

1

The date when the transaction has been requested

Date or DateTime Type

< FundsTransfer >

<Value @Amount>

Mandatory

1

Amount to be transferred to the card

Integer

<FundsTransfer>

<Value @DecimalPlace>

Mandatory

1

Indicate the number of decimal for the provided amount

Integer

<FundsTransfer>

<Value @Currency>

Mandatory

1

Currency of the amount. Uppercase ISO 4217.

A3

<FundsTransfer>

<Scheduling @Date>

Optional

1

Date when the funds are loaded on the VCN. If not provided in query, funds are loaded on the same day.

Date or DateTime Type

## 3.1.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

* * *

## 3.2 Sub Structure: Failure

## 3.2.1 Description

**Path**

**Status**

**Repetition**

**Explanation**

**Value**

<Failure> <Warnings>

Optional

1..9

Used to convey warnings regarding the creation

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

Used to convey errors regarding the creation

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

## 3.2.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

* * *

## 4 Error Messages

  

* * *

## 5 Operations

## 5.1 Operation: Immediate funds transfer

## 5.1.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_PAY\_ScheduleVirtualCardLoadRQ xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" Version="1.0" xsi:schemaLocation="http://xml.amadeus.com/2010/06/PAY\_VirtualCard\_v1 AMA\_PAY\_ScheduleVirtualCardLoadRQ.xsd"> <Target> <References> <Reference type="External">0RABi7yRASZCmw9Ok-nOIpZ8W</Reference> <Reference type="Amadeus">1234567890</Reference> </References> </Target> <FundsTransfer Action="Add"> <Value Amount="10000" Currency="EUR" DecimalPlace="2"></Value> </FundsTransfer> </AMA\_PAY\_ScheduleVirtualCardLoadRQ>

## 5.1.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_PAY\_ScheduleVirtualCardLoadRS Version="1.0" xsi:schemaLocation="http://xml.amadeus.com/2010/06/PAY\_VirtualCard\_v1 AMA\_PAY\_ScheduleVirtualCardLoadRS.xsd"> <Success> <Target> <References> <Reference type="External">0RABi7yRASZCmw9Ok-nOIpZ8W</Reference> <Reference type="Amadeus">1234567890</Reference> </References> </Target> <FundsTransfer Action="Add" OfficeID="NCE1A0955" Reference="1" Status="Scheduled" UserID="JDOE"> <Value Amount="10000" Currency="EUR" DecimalPlace="2"></Value> </FundsTransfer> </Success> </AMA\_PAY\_ScheduleVirtualCardLoadRS>

## 5.1.3 Possible Errors

See "Error Messages" section.

* * *

## 5.2 Operation: Schedule a funds transfer

## 5.2.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_PAY\_ScheduleVirtualCardLoadRQ Version="1.0" xsi:schemaLocation="http://xml.amadeus.com/2010/06/PAY\_VirtualCard\_v1 AMA\_PAY\_ScheduleVirtualCardLoadRQ.xsd"> <Target> <References> <Reference type="External">0RABi7yRASZCmw9Ok-nOIpZ8W</Reference> <Reference type="Amadeus">1234567890</Reference> </References> </Target> <FundsTransfer Action="Add"> <Value Amount="10000" Currency="EUR" DecimalPlace="2"></Value> <Scheduling Date="2017-08-13"></Scheduling> </FundsTransfer> <Reason language="en">First night on 13AUG2017</Reason> </AMA\_PAY\_ScheduleVirtualCardLoadRQ>

## 5.2.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_PAY\_ScheduleVirtualCardLoadRS Version="1.0" xsi:schemaLocation="http://xml.amadeus.com/2010/06/PAY\_VirtualCard\_v1 AMA\_PAY\_ScheduleVirtualCardLoadRS.xsd"> <Success> <Target> <References> <Reference type="External">0RABi7yRASZCmw9Ok-nOIpZ8W</Reference> <Reference type="Amadeus">1234567890</Reference> </References> </Target> <FundsTransfer Action="Add" OfficeID="NCE1A0955" Reference="1" Status="Scheduled" UserID="JDOE"> <Value Amount="10000" Currency="EUR" DecimalPlace="2"></Value> <Scheduling Date="2017-08-13"></Scheduling> </FundsTransfer> </Success> </AMA\_PAY\_ScheduleVirtualCardLoadRS>

## 5.2.3 Possible Errors

See "Error Messages" section.

* * *