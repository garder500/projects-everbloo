---
url: "https://developers.amadeus.com/api-library/soap/functional-doc/120/doc-read/1756?serviceVersion=4.2"
download_url: "https://developers.amadeus.com/PAS-EAS/api/download/comp/4d4ad2cb456c02633f463a055ab70584/1756/HTML_UG_WBS_PNR_Commit_PEOTUQ_04.2/UG_WBS_PNR_Commit_PEOTUQ_04.2_011.html"
title: "HTML_UG_WBS_PNR_Commit_PEOTUQ_04.2_011"
source: "amadeus"
service_id: "120"
service_name: "PNR_Commit"
version: "4.2"
document_id: "1756"
doc_version: "4.2"
doc_type: "User guide"
file_format: "HTML"
scraped_at: "2026-07-15T10:34:22.865Z"
---
# Function: PNR\_Commit

* * *

## 1 Overview

This function commits the modifications made to the PNR and release the PNR.

## 1.1 Supported Operations

Not Applicable

## 1.2 Limitations

Not Applicable

## 1.3 Unsupported Operations

Not Applicable

## 1.4 Prerequisites

Not Applicable

## 2 Building A Query

It is important to note that the examples in each chapter are only illustrations and are meant to provide the basis for a better understanding on which fields are mandatory for basic operation utilisation. It is not a full explanation of every field that can be utilised for the operation, but rather a guideline to its use.

## 3 Receiving A Reply

The example given shows the reply for a successful PNR commit.

## 4 Error Messages

Number

Message

Description

00031

FINISH OR IGNORE

When retrieving a PNR currently modified

00096

NEED RECEIVED FROM

When there is no RF element in the PNR

03536

NEED TELEPHONE

When there is no AP element in the PNR

00082

DUPLICATE SEGMENT

When the PNR contains duplicate segment

01966

NEED ITINERARY

When there is no itinerary in a newly created PNR

03432

UNABLE TO PROCESS/SERVICES EXCEED NAMES

When retrieving a PNR with non-homogeneous conditions

**Note**: This list is not exhaustive

## 4.1 Error Reply

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_CommitReply xmlns="http://xml.amadeus.com/PEOTUR\_04\_2\_1A"> <sbrRecLoc> <reservation> <controlNumber>YPPXLY</controlNumber> </reservation> </sbrRecLoc> </PNR\_CommitReply>

  

* * *

## 5 Operations

## 5.1 Operation: Commit

This example shows the query to commit a PNR.

## 5.1.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_Commit> <dummy></dummy> </PNR\_Commit>

## 5.1.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.1.3 Possible Errors

* * *