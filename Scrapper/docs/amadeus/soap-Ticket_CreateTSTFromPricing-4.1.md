---
url: "https://developers.amadeus.com/api-library/soap/functional-doc/38/doc-read/1774?serviceVersion=4.1"
download_url: "https://developers.amadeus.com/PAS-EAS/api/download/comp/4d4ad2cb456c02633f463a055ab70584/1774/HTML_UG_WBS_Ticket_CreateTSTFromPricing_TAUTCQ_04.1/UG_WBS_Ticket_CreateTSTFromPricing_TAUTCQ_04.1_009.html"
title: "HTML_UG_WBS_Ticket_CreateTSTFromPricing_TAUTCQ_04.1_009"
source: "amadeus"
service_id: "38"
service_name: "Ticket_CreateTSTFromPricing"
version: "4.1"
document_id: "1774"
doc_version: "4.1"
doc_type: "User guide"
file_format: "HTML"
scraped_at: "2026-07-15T10:46:44.033Z"
---
# Function: Ticket\_CreateTSTFromPricing

* * *

## 1 Overview

This function provides Amadeus Customers with an automatic way to create TST.

In the TST, the system automatically stores information obtained from the Fare Server during a previous Pricing transaction.

There are as much as TST created as there are different passenger types and discount codes in the PNR.

Note: A TST (Transitional Stored Ticket) is a record containing all the ticketing information associated to a passenger name record.

## 1.1 Supported Operations

The function CreateTSTFromPricing allows the following operation:

Create TST

## 1.2 Limitations

A maximum of 10 TST can be created for each passenger.

## 1.3 Unsupported Operations

Not applicable.

## 1.4 Prerequisites

A pricing transaction must have been performed before.

At least one name and one segment must exist in the PNR.

## 2 Building A Query

The query contains the references to the different TST that have to be created. These references have been returned by a previous pricing transaction.

## 3 Receiving A Reply

The received reply (except error messages) contains TST number and Passenger association

  
  
Reply Structure  
  

The reply contains the reference of the TST created with its passenger association.

There are as much as TST created as there are different passenger types and discount codes in the PNR.

Data:

TST Reference (IRV): the reference to the created TST (tattoo number and identification number)

Pax Information (REF): the reference of the passengers that are associated to the TST

In this example, the PNR contains 2 infants and 5 adults in the PNR and there are 4 different passenger types. Here is the reply obtained:

## 4 Error Messages

CM00001 \- Unable to process

Process error - normally it shouldn't be related with data from the request.

CM00005 - Check segment number

A segment with the TATTOO number specified in the REF segment is not present in the PNR

CM00258 - Function not supported

Request a functionality not yet implemented

CM00339 - Need Name

The PNR does not contain any names.

CM00357 - Link down

A problem of communication between the different systems occurs.

CM00477 \- Invalid format

Data specified in the request is not valid, although is OK from the message definition

Examples: recommendation number is not digit.

CM01908 - Check passenger number

A segment with the TATTOO number specified in the REF segment is not present in the PNR

CM01959 \- Need PNR.

A request has been made without a retrieved/newly created PNR.

CM01966 - Need itinerary

There is no itinerary in the PNR.

CM02058 \- Previous TST exists / Segment Overlap

The TST can not be created because there is an overlap with the existing TST.

The End User has to delete the existing TST if he wants to price the selected recommendation.

CM02230 - Single selection code only

Different passenger types specified in the same REF segment.

CM03052 - Maximum tsts this passenger

The maximum number of TST (10) is reached for a passenger

## 4.1 Error Reply

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_CreateTSTFromPricingReply xmlns="http://xml.amadeus.com/TAUTCR\_04\_1\_1A"> <tstList> <tstReference> <referenceType>TST</referenceType> <uniqueReference>1</uniqueReference> <iDDescription> <iDSequenceNumber>4192294807</iDSequenceNumber> </iDDescription> </tstReference> <paxInformation> <refDetails> <refQualifier>PA</refQualifier> <refNumber>6</refNumber> </refDetails> </paxInformation> </tstList> <tstList> <tstReference> <referenceType>TST</referenceType> <uniqueReference>2</uniqueReference> <iDDescription> <iDSequenceNumber>4192294802</iDSequenceNumber> </iDDescription> </tstReference> <paxInformation> <refDetails> <refQualifier>PA</refQualifier> <refNumber>7</refNumber> </refDetails> </paxInformation> </tstList> <tstList> <tstReference> <referenceType>TST</referenceType> <uniqueReference>3</uniqueReference> <iDDescription> <iDSequenceNumber>4192294814</iDSequenceNumber> </iDDescription> </tstReference> <paxInformation> <refDetails> <refQualifier>PA</refQualifier> <refNumber>1</refNumber> </refDetails> <refDetails> <refQualifier>PA</refQualifier> <refNumber>3</refNumber> </refDetails> <refDetails> <refQualifier>PA</refQualifier> <refNumber>4</refNumber> </refDetails> </paxInformation> </tstList> <tstList> <tstReference> <referenceType>TST</referenceType> <uniqueReference>4</uniqueReference> <iDDescription> <iDSequenceNumber>4192294895</iDSequenceNumber> </iDDescription> </tstReference> <paxInformation> <refDetails> <refQualifier>PI</refQualifier> <refNumber>1</refNumber> </refDetails> <refDetails> <refQualifier>PI</refQualifier> <refNumber>4</refNumber> </refDetails> </paxInformation> </tstList> </Ticket\_CreateTSTFromPricingReply>

  

* * *

## 5 Operations

## 5.1 Operation: Create TST

In this example, the End-User requires for the creation of the 4 TST previously returned by a pricing transaction.

## 5.1.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_CreateTSTFromPricing xmlns="http://xml.amadeus.com/TAUTCQ\_04\_1\_1A"> <psaList> <itemReference> <referenceType>TST</referenceType> <uniqueReference>1</uniqueReference> </itemReference> </psaList> <psaList> <itemReference> <referenceType>TST</referenceType> <uniqueReference>2</uniqueReference> </itemReference> </psaList> <psaList> <itemReference> <referenceType>TST</referenceType> <uniqueReference>3</uniqueReference> </itemReference> </psaList> <psaList> <itemReference> <referenceType>TST</referenceType> <uniqueReference>4</uniqueReference> </itemReference> </psaList> </Ticket\_CreateTSTFromPricing>

## 5.1.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.1.3 Possible Errors

* * *