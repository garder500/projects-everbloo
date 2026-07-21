---
url: "https://developers.amadeus.com/api-library/soap/functional-doc/52651/doc-read/134524?serviceVersion=1.0"
download_url: "https://developers.amadeus.com/PAS-EAS/api/download/comp/4d4ad2cb456c02633f463a055ab70584/134524/upload_600880100483120229.html"
title: "HTML_UG_WBS_Ticket_RebookAndRepricePNR_ _01.0_022"
source: "amadeus"
service_id: "52651"
service_name: "Ticket_RebookAndRepricePNR"
version: "1.0"
document_id: "134524"
doc_version: "1.0"
doc_type: "User guide"
file_format: "HTML"
scraped_at: "2026-07-15T10:48:28.021Z"
---
# Function: Ticket\_RebookAndRepricePNR

* * *

## 1 Overview

The service is meant to be used on ticketed PNRs only. It can cancel any PNR element by passing the identifier of the element to cancel in the service's input. It also allows the creation of the following elements:

-   Air segments
-   Frequent flyer elements (SSR FQTV and SSR FQTR)
-   Contact elements (APx)
-   Special Service Requests
-   Seats
-   Other Services Information
-   Special Keywords
-   Remarks
-   Time Limits
-   Received From
-   Fare Discounts

The service allows the automated repricing and creation of reissue Transitional Stored Ticket (TST) for Air itineraries using the ATC repricing product. The service supports rebooking of both revenue and redemption itineraries.  

   
The service can end transact the PNR once all requests have been processed, or leave the transaction open.

  
Ticket\_RebookAndRepricePNR can also be used to confirm segments in "TK" status that have been inserted offline after a disruption. If these segments are declared as to be confirmed to the service, then Ticket\_RebookAndRepricePNR will change their status to "HK".

Finally, the service also allows to specify the repricing behavior, as long as pricing options are provided in input.

## 1.1 Supported Operations

The following operations are supported by this function:

-   Full exchange of air itinerary
-   Partial exchange of air itinerary
-   Repricing of air itinerary for unused ticket
-   Confirmation of segments in TK status
-   Full exchange of air itinerary and SSRs reassociation
-   Full exchange of air itinerary and seats reassociation
-   Full exchange of air itinerary and addition of new RM
-   Repricing with override of pricing options  
    
-   Cancellation of multiple elements
-   Exchange of itinerary with Frequent Flyer
-   Exchange of itinerary with SK element

## 1.2 Limitations

The following operations are out of scope for this function:

-   Modification of passengers in PNR
-   Repricing of group PNRs
-   Repricing of services
-   Repricing of itinerary combined with first pricing of new services
-   Split PNR (which include partial upgrade)
-   Exchange of itinerary with No-Show fee
-   Any operation implying PNR Upgrade

## 1.3 Unsupported Operations

Not applicable

## 1.4 Prerequisites

Not applicable

## 2 Building A Query

The message is composed of the following groups:

Reservation: contains the optional ReceivedFrom (RF) message and the BookingIdentifier of the PNR to work on, if any.

Commit: optionally ignores the warnings at EoT and returns the envelope number of the PNR in case an EoT has been performed.

Rebooking: contains the different elements to cancel/rebook in the transaction: 

-   Cancellation: the identifiers of the elements to be cancelled
-   Confirmation: the identifiers of the elements for which the status should be changed to HK
-   Replication: used to perform carry-overs of SSRs/SKs elements from an original segment to a new segment
-   Bounds: containing the information of the flights to rebook
-   FrequentFlyers: containing the information of the FQTV and FQTR to re-create
    -   Frequent Flyer Card Information: airline code, number, owner
    -   Mileage Request Information: operating airlines, associations
    -   Redemption Request Information: AIA options, associations 
-   Contacts: containing the information of the contacts to add in the PNR
    -   Category of contact: Physical, use and purpose types
    -   Description: contact value, notification options (third party, airline code, language)
    -   Permissions: officeIDs access permissions
    -   Associations: associated travellers
-   SpecialServiceRequests (SSR)
-   Seats
-   OtherServicesInformation (OSI)
-   SpecialKewords (SK)
-   Remarks (RM)
-   TimeLimits (TK)
-   FareDiscounts (FD)

Repricing: contains the repricing information for the flight segments (air itinerary repricing).

## 3 Receiving A Reply

The reply of the service contains either a Success or a Failure group.

Success is returned in case the message has been processed, with or without functional errors.

-   Warnings: contains the errors raised during the processing of the message
-   Reservation: contains the BookingIdentifier information
-   Commit: contains the EnvelopeNumber and ReceivedFrom information
-   Rebooking: contains all the information related to the cancelled/rebooked elements:
    -   CancelledElements: the identifiers of the PNR elements that have been cancelled
    -   FrequentFlyers: information related to the frequent flyer card (FQTV and FQTR)
    -   Bounds: information about the rebooked segments
    -   Contacts: information about the rebooked contacts and notification elements
    -   SpecialServiceRequests: information about the SSR elements (SSR INFT) that are associated with the new segments
    -   Seats
    -   OtherServicesInformation
    -   SpecialKeywords
    -   Remarks
    -   TimeLimits
    -   FareDiscounts
-   Repricing: contains the repricing information related to the new air itinerary  
    -   ItineraryRepricing that contains:
        -   consolidated prices and reissue TSTs information
        -   residual/penalty and TSMs information
        -   the amount of total refundable taxes (TotalRefundableTaxes), for compliance with the French mandate on this subject
    -   In case of revalidation, deleted TST information are returned with PricingRecordRefIDs attribute set to 0.

Failure is returned if the message does not process because of a technical error.

-   Warnings
-   Errors

## 4 Error Messages

This section describes error, warning or information messages which can be returned by the cancel, rebooking or repricing processes.

Error messages are returned with Type = E

Warning messages are returned with Type = W

Information messages are returned with Type = I

The different functional errors that can be raised during Ticket\_RebookAndRepricePNR execution are the following.

**General errors:**

The following errors are generic ones, when something unexpected occurs.

**Description**

**Type**

**Canned message number**

**Canned message text**

Error during PNR retrieve

E

119

UNABLE TO RETRIEVE PNR

Used for internal processing errors or exceptions having no functional reason  

E

414

INTERNAL PROCESSING ERROR

Error during PNR EOT

E

8111

ERROR AT END OF TRANSACTION TIME

Generic invalid input data error (XML valid but incoherent data)

E

32700

INVALID INPUT DATA

**Commit information:**

The following information message is provided in output in case a commit has been performed.

**Description**

**Type**

**Canned message number**

**Canned message text**

Commit processed successfully by the service  

I

34666  

EOT HAS BEEN PROCESSED DURING THIS TRANSACTION  
  

**Cancellation errors:**

There is no specific error in case of issue during the cancellation of an element. The generic internal processing error will be returned.

**Description**

**Type**

**Canned message number**

**Canned message text**

Used for internal processing errors or exceptions having no functional reason

E

414  

INTERNAL PROCESSING ERROR  
  

**Confirmation errors:**

The following errors are related to the confirmation of a disrupted air segment.

**Description**

**Type**

**Canned message number**

**Canned message text**

Failure during the status change of an air segment  

E

34655  

CONFIRM SEGMENT STATUS FAILURE  
  

**Passenger related errors:**

The following errors are related to the passenger group.

**Description**

**Type**

**Canned message number**

**Canned message text**

Generic name creation failure

E

3509

UNABLE TO CREATE NAME/CHECK INPUT

The date of birth is not valid

E

4759

CHECK DATE OF BIRTH

Name format is not valid, or not in a recognised charset

E

23389

INVALID NAME FORMAT

Error raised if the total name length for the passenger (eventually including infant) is too long

E

11814

INVALID NAME LENGTH

**Frequent Flyer related errors:**

The following errors are related to the frequent flyer group.

**Description**

**Type**

**Canned message number**

**Canned message text**

The frequent flyer number seems well formatted but could not be found  

E

8900  

FQTV NUMBER NOT ACCEPTED  

Raised in case of other errors during the insertion of FQTV (not valid, not belonging to the user)  

E

9253  

FREQUENT FLYER NUMBER NOT FOUND  

Raised in case of error during the insertion of an FQTR

E

34650  

FQTR CREATION FAILED  

**Segment related errors:**

The following errors are related to the segment group.

**Description**

**Type**

**Canned message number**

**Canned message text**

Segment sell returned a status considered as disabled in the configuration  

E

11677  

INVALID SEGMENT STATUS - SEGMENT  

Link down during the segment sell process  

E

34651  

SEGMENT SELL FAILURE  

**Contact related errors:**

The following errors are related to the Contact group.

**Description**

**Type**

**Canned message number**

**Canned message text**

Error during the Contact creation  

E

2137  

INVALID PASSENGER CONTACT  

**SSR related errors:**

The following errors are related to the SSR group.

**Description**

**Type**

**Canned message number**

**Canned message text**

Error during the SSR creation  

E

25825  

SSR COULD NOT BE PROCESSED CORRECTLY  

**Seat related errors:**

The following errors are related to the Seat group.

**Description**

**Type**

**Canned message number**

**Canned message text**

Error during the Seat creation  

E

2114  

SEATS NOT RESERVED  

**OSI related errors:**

The following errors are related to the OSI group.

**Description**

**Type**

**Canned message number**

**Canned message text**

Error during the OSI creation  

E

34652  

UNABLE TO ADD OSI  

**SK related errors:**

The following errors are related to the SK group.

**Description**

**Type**

**Canned message number**

**Canned message text**

Error during the SK creation  

E

34653  

UNABLE TO ADD SK  

**RM related errors:**

The following errors are related to the RM group.

**Description**

**Type**

**Canned message number**

**Canned message text**

Error during the RM  creation  

E

1806  

/UNABLE TO ADD REMARKS  

**FD related errors:**

The following errors are related to the FD group.

**Description**

**Type**

**Canned message number**

**Canned message text**

Error during the FD creation  

E

25848  

UNABLE TO PROCESS FD ELEMENTS  

**Time Limit related errors:**

The following errors are related to the Time limit element.

**Description**

**Type**

**Canned message number**

**Canned message text**

Generic TK creation error  

E

29919  

FAILED TO INTEGRATE TICKET TIME LIMIT IN THE PNR  

**Air repricing related errors:**

The error raised during the air pricing are the same as the ones raised by ATC repricing.

## 4.1 Error Reply

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_TicketRebookAndRepricePNRRS xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" Version="1.000" xsi:schemaLocation="http://xml.amadeus.com/2010/06/Ticket\_RebookAndRepricePNR\_v1 AMA\_Retailing\_ReBookAndPriceReRS.xsd"> <Success> <Warnings> <Retailing:Warning Code="414" ShortText="INTERNAL PROCESSING ERROR" Type="E">INTERNAL PROCESSING ERROR</Retailing:Warning> </Warnings> <Reservation BookingIdentifier="RECLOC"></Reservation> <Commit EnvelopeNumber="0" ReceivedFrom="Amadeus Test WBS"></Commit> </Success> </AMA\_TicketRebookAndRepricePNRRS>

  

* * *

## 5 Operations

## 5.1 Operation: Cancellation of multiple elements

Ticket\_RebookAndRepricePNR allows the cancellation of multiple PNR elements in a single request.

## 5.1.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_TicketRebookAndRepricePNRRQ Actions="" Version="1.000" xsi:schemaLocation="http://xml.amadeus.com/2010/06/Ticket\_RebookAndRepricePNR\_v1 AMA\_TicketRebookAndRepricePNRRQ.xsd"> <Reservation BookingIdentifier="RECLOC"></Reservation> <Commit IgnoreWarningsOption="true" ReceivedFrom="Amadeus Test WBS"></Commit> <Rebooking> <Cancellation> <Retailing:Ref TattooType="ST" TattooValue="1"></Retailing:Ref> <Retailing:Ref TattooType="OT" TattooValue="27"></Retailing:Ref> <Retailing:Ref TattooType="OT" TattooValue="48"></Retailing:Ref> </Cancellation> <Bounds> <Bound ActionCode="NN" NIP="1"> <Segment RequestID="SEG1" bkgClass="S" isOpenSegment="false"> <Retailing:serviceProvider code="JL"></Retailing:serviceProvider> <Retailing:identifier>7025</Retailing:identifier> <Retailing:start dateTime="2015-09-18T05:00:00"> <Retailing:locationCode>ITM</Retailing:locationCode> </Retailing:start> <Retailing:end dateTime="2015-09-18T07:00:00"> <Retailing:locationCode>KIX</Retailing:locationCode> </Retailing:end> </Segment> </Bound> </Bounds> <SpecialServiceRequests> <SpecialServiceRequest RequestID="SSR1" code="VGML"> <Retailing:Associations> <Retailing:Ref TattooType="PT" TattooValue="1"></Retailing:Ref> </Retailing:Associations> </SpecialServiceRequest> </SpecialServiceRequests> </Rebooking> <Repricing> <ItineraryPricingOptions> <ItineraryPricingOption> <pri:TicketingInfo Number="1315297294448"></pri:TicketingInfo> <pri:Booking Operation="SEL"></pri:Booking> <far\_int:AssociatedPNRElement Tattoo="1" Type="PT"></far\_int:AssociatedPNRElement> </ItineraryPricingOption> </ItineraryPricingOptions> </Repricing> </AMA\_TicketRebookAndRepricePNRRQ>

## 5.1.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_TicketRebookAndRepricePNRRS Version="1.000" xsi:schemaLocation="http://xml.amadeus.com/2010/06/Ticket\_RebookAndRepricePNR\_v1 AMA\_TicketRebookAndRepricePNRRS.xsd"> <Success> <Reservation BookingIdentifier="RECLOC"></Reservation> <Commit EnvelopeNumber="5" ReceivedFrom="Amadeus Test WBS"></Commit> <Rebooking> <CancelledElements> <Retailing:Ref TattooType="ST" TattooValue="1"></Retailing:Ref> <Retailing:Ref TattooType="OT" TattooValue="27"></Retailing:Ref> <Retailing:Ref TattooType="OT" TattooValue="48"></Retailing:Ref> </CancelledElements> <Bounds> <Bound NIP="1"> <Segment LineNumber="2" RequestID="SEG1" TattooType="ST" TattooValue="1" bkgClass="S" isOpenSegment="false" segmentStatus="HK"> <Retailing:serviceProvider code="JL"></Retailing:serviceProvider> <Retailing:identifier>7025</Retailing:identifier> <Retailing:start dateTime="2015-08-18T05:00:00"> <Retailing:locationCode>ITM</Retailing:locationCode> </Retailing:start> <Retailing:end dateTime="2015-08-18T07:00:00"> <Retailing:locationCode>KIX</Retailing:locationCode> </Retailing:end> </Segment> </Bound> </Bounds> <SpecialServiceRequests> <SpecialServiceRequest LineNumber="5" NIP="1" RequestID="SSR1" TattooType="OT" TattooValue="5" code="VGML" serviceProviderCode="JL" status="HK"> <Retailing:Associations> <Retailing:Ref LineNumber="1" RequestID="PAX1" TattooType="PT" TattooValue="1"></Retailing:Ref> <Retailing:Ref LineNumber="2" RequestID="SEG1" TattooType="ST" TattooValue="1"></Retailing:Ref> </Retailing:Associations> </SpecialServiceRequest> </SpecialServiceRequests> </Rebooking> <Repricing> <ItineraryRepricing> <PricingDetails> <Totals> <far\_int:Price Amount="0" CurrencyCode="EUR" DecimalPlaces="2" Type="SumResidualValue"></far\_int:Price> <far\_int:Price Amount="5500" CurrencyCode="EUR" DecimalPlaces="2" Type="SumPenalty"></far\_int:Price> </Totals> <PricingRecords> <PricingRecord> <far\_int:Price Amount="95000" CurrencyCode="EUR" DecimalPlaces="2" Type="OldBase"></far\_int:Price> <far\_int:Price Amount="110000" CurrencyCode="EUR" DecimalPlaces="2" Type="NewBase"></far\_int:Price> <far\_int:Price Amount="15000" CurrencyCode="EUR" DecimalPlaces="2" Type="BalanceBase"></far\_int:Price> <far\_int:Price Amount="11000" CurrencyCode="EUR" DecimalPlaces="2" Type="OldTax"></far\_int:Price> <far\_int:Price Amount="11000" CurrencyCode="EUR" DecimalPlaces="2" Type="NewTax"></far\_int:Price> <far\_int:Price Amount="0" CurrencyCode="EUR" DecimalPlaces="2" Type="BalanceTax"></far\_int:Price> <far\_int:Price Amount="15000" CurrencyCode="EUR" DecimalPlaces="2" Type="TicketDifference"></far\_int:Price> <far\_int:Price Amount="5500" CurrencyCode="EUR" DecimalPlaces="2" Type="Penalty"></far\_int:Price> <far\_int:Price Amount="20500" CurrencyCode="EUR" DecimalPlaces="2" Type="GrandTotal"></far\_int:Price> <far\_int:PricingInfo PricingRecordRefIDs="1" PricingType="TQR"> <far\_int:AssociatedPNRElement Tattoo="1" Type="PT"></far\_int:AssociatedPNRElement> <far\_int:AssociatedPNRElement Tattoo="1" Type="ST"></far\_int:AssociatedPNRElement> <far\_int:AssociatedPNRElement Tattoo="2" Type="ST"></far\_int:AssociatedPNRElement> </far\_int:PricingInfo> </PricingRecord> <PricingRecord> <far\_int:Price Amount="15000" CurrencyCode="EUR" DecimalPlaces="2" Type="Total"></far\_int:Price> <far\_int:Price Amount="15000" CurrencyCode="EUR" DecimalPlaces="2" Type="GrandTotal"></far\_int:Price> <far\_int:Price Amount="110000" CurrencyCode="EUR" DecimalPlaces="2" Type="Base"></far\_int:Price> <far\_int:Tax Amount="10000" CurrencyCode="EUR" DecimalPlaces="2" IsoCode="FR" NatureCode="A1"></far\_int:Tax> <far\_int:Tax Amount="1000" CurrencyCode="EUR" DecimalPlaces="2" IsoCode="FR" NatureCode="ZZ"></far\_int:Tax> <far\_int:PricingInfo PricingRecordRefIDs="1" PricingType="TST"> <far\_int:AssociatedPNRElement Tattoo="1" Type="PT"></far\_int:AssociatedPNRElement> <far\_int:AssociatedPNRElement Tattoo="1" Type="ST"></far\_int:AssociatedPNRElement> <far\_int:AssociatedPNRElement Tattoo="2" Type="ST"></far\_int:AssociatedPNRElement> </far\_int:PricingInfo> </PricingRecord> <PricingRecord> <far\_int:Price Amount="5500" CurrencyCode="EUR" DecimalPlaces="2" Type="Total"></far\_int:Price> <far\_int:Price Amount="5500" CurrencyCode="EUR" DecimalPlaces="2" Type="Base"></far\_int:Price> <far\_int:PricingInfo PricingRecordRefIDs="2" PricingType="TSM" RFIC="D" RFISC="995"> <far\_int:AssociatedPNRElement Tattoo="1" Type="PT"></far\_int:AssociatedPNRElement> <far\_int:AssociatedPNRElement Tattoo="1" Type="ST"></far\_int:AssociatedPNRElement> <far\_int:AssociatedPNRElement Tattoo="2" Type="ST"></far\_int:AssociatedPNRElement> </far\_int:PricingInfo> </PricingRecord> </PricingRecords> </PricingDetails> </ItineraryRepricing> </Repricing> </Success> </AMA\_TicketRebookAndRepricePNRRS>

## 5.1.3 Possible Errors

See "Error Messages" section.

* * *

## 5.2 Operation: Confirmation of segments in TK status

In case of disruption, Ticket\_RebookAndRepricePNR allows to cancel the segments in UN status and to confirm the segments in TK status (which will eventually become HK status).

## 5.2.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_TicketRebookAndRepricePNRRQ Actions="" Version="1.000" xsi:schemaLocation="http://xml.amadeus.com/2010/06/Ticket\_RebookAndRepricePNR\_v1 AMA\_TicketRebookAndRepricePNRRQ.xsd"> <Reservation BookingIdentifier="RECLOC"></Reservation> <Commit IgnoreWarningsOption="true" ReceivedFrom="Amadeus Test WBS"></Commit> <Rebooking> <Cancellation> <Retailing:Ref TattooType="ST" TattooValue="1"></Retailing:Ref> </Cancellation> <Confirmation> <Retailing:Ref TattooType="ST" TattooValue="3"></Retailing:Ref> </Confirmation> </Rebooking> <Repricing> <ItineraryPricingOptions> <ItineraryPricingOption> <pri:TicketingInfo Number="1315297294449"></pri:TicketingInfo> <pri:Booking Operation="SEL"></pri:Booking> <far\_int:AssociatedPNRElement Tattoo="1" Type="PT"></far\_int:AssociatedPNRElement> </ItineraryPricingOption> </ItineraryPricingOptions> </Repricing> </AMA\_TicketRebookAndRepricePNRRQ>

## 5.2.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_TicketRebookAndRepricePNRRS Version="1.000" xsi:schemaLocation="http://xml.amadeus.com/2010/06/Ticket\_RebookAndRepricePNR\_v1 AMA\_TicketRebookAndRepricePNRRS.xsd"> <Success> <Reservation BookingIdentifier="RECLOC"></Reservation> <Commit EnvelopeNumber="5" ReceivedFrom="Amadeus Test WBS"></Commit> <Rebooking> <CancelledElements> <Retailing:Ref TattooType="ST" TattooValue="1"></Retailing:Ref> </CancelledElements> </Rebooking> <Repricing> <ItineraryRepricing> <PricingDetails> <Totals> <far\_int:Price Amount="0" CurrencyCode="EUR" DecimalPlaces="2" Type="SumResidualValue"></far\_int:Price> <far\_int:Price Amount="6000" CurrencyCode="EUR" DecimalPlaces="2" Type="SumPenalty"></far\_int:Price> </Totals> <PricingRecords> <PricingRecord> <far\_int:Price Amount="95000" CurrencyCode="EUR" DecimalPlaces="2" Type="OldBase"></far\_int:Price> <far\_int:Price Amount="98000" CurrencyCode="EUR" DecimalPlaces="2" Type="NewBase"></far\_int:Price> <far\_int:Price Amount="3000" CurrencyCode="EUR" DecimalPlaces="2" Type="BalanceBase"></far\_int:Price> <far\_int:Price Amount="11000" CurrencyCode="EUR" DecimalPlaces="2" Type="OldTax"></far\_int:Price> <far\_int:Price Amount="11000" CurrencyCode="EUR" DecimalPlaces="2" Type="NewTax"></far\_int:Price> <far\_int:Price Amount="0" CurrencyCode="EUR" DecimalPlaces="2" Type="BalanceTax"></far\_int:Price> <far\_int:Price Amount="3000" CurrencyCode="EUR" DecimalPlaces="2" Type="TicketDifference"></far\_int:Price> <far\_int:Price Amount="6000" CurrencyCode="EUR" DecimalPlaces="2" Type="Penalty"></far\_int:Price> <far\_int:Price Amount="9000" CurrencyCode="EUR" DecimalPlaces="2" Type="GrandTotal"></far\_int:Price> <far\_int:PricingInfo PricingRecordRefIDs="1" PricingType="TQR"> <far\_int:AssociatedPNRElement Tattoo="1" Type="PT"></far\_int:AssociatedPNRElement> <far\_int:AssociatedPNRElement Tattoo="1" Type="ST"></far\_int:AssociatedPNRElement> <far\_int:AssociatedPNRElement Tattoo="2" Type="ST"></far\_int:AssociatedPNRElement> </far\_int:PricingInfo> </PricingRecord> <PricingRecord> <far\_int:Price Amount="3000" CurrencyCode="EUR" DecimalPlaces="2" Type="Total"></far\_int:Price> <far\_int:Price Amount="3000" CurrencyCode="EUR" DecimalPlaces="2" Type="GrandTotal"></far\_int:Price> <far\_int:Price Amount="98000" CurrencyCode="EUR" DecimalPlaces="2" Type="Base"></far\_int:Price> <far\_int:Tax Amount="10000" CurrencyCode="EUR" DecimalPlaces="2" IsoCode="FR" NatureCode="A1"></far\_int:Tax> <far\_int:Tax Amount="1000" CurrencyCode="EUR" DecimalPlaces="2" IsoCode="FR" NatureCode="ZZ"></far\_int:Tax> <far\_int:PricingInfo PricingRecordRefIDs="1" PricingType="TST"> <far\_int:AssociatedPNRElement Tattoo="1" Type="PT"></far\_int:AssociatedPNRElement> <far\_int:AssociatedPNRElement Tattoo="1" Type="ST"></far\_int:AssociatedPNRElement> <far\_int:AssociatedPNRElement Tattoo="2" Type="ST"></far\_int:AssociatedPNRElement> </far\_int:PricingInfo> </PricingRecord> <PricingRecord> <far\_int:Price Amount="6000" CurrencyCode="EUR" DecimalPlaces="2" Type="Total"></far\_int:Price> <far\_int:Price Amount="6000" CurrencyCode="EUR" DecimalPlaces="2" Type="Base"></far\_int:Price> <far\_int:PricingInfo PricingRecordRefIDs="2" PricingType="TSM" RFIC="D" RFISC="995"> <far\_int:AssociatedPNRElement Tattoo="1" Type="PT"></far\_int:AssociatedPNRElement> <far\_int:AssociatedPNRElement Tattoo="1" Type="ST"></far\_int:AssociatedPNRElement> <far\_int:AssociatedPNRElement Tattoo="2" Type="ST"></far\_int:AssociatedPNRElement> </far\_int:PricingInfo> </PricingRecord> </PricingRecords> </PricingDetails> </ItineraryRepricing> </Repricing> </Success> </AMA\_TicketRebookAndRepricePNRRS>

## 5.2.3 Possible Errors

See "Error Messages" section.

* * *

## 5.3 Operation: Exchange of air itinerary

Ticket\_RebookAndRepricePNR allows to exchange the segments in a PNR and reprice the entire itinerary against the old ticket.

When all segments are specified it is a full exchange.

When some segments are specified it is a partial exchange.

RebookAndRepricePNR allows to exchange even if the old ticket has no-show coupons. In that case, a no-show fee is returned in the output of Ticket\_RebookAndRepricePNR.

## 5.3.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_TicketRebookAndRepricePNRRQ Actions="COMMIT" Version="1.000" xsi:schemaLocation="http://xml.amadeus.com/2010/06/Ticket\_RebookAndRepricePNR\_v1 AMA\_TicketRebookAndRepricePNRRQ.xsd"> <Reservation BookingIdentifier="J6GGJZ"></Reservation> <Commit></Commit> <Rebooking> <Cancellation> <rtl:Ref TattooType="ST" TattooValue="1"></rtl:Ref> <rtl:Ref TattooType="ST" TattooValue="2"></rtl:Ref> </Cancellation> <Bounds> <Bound ActionCode="NN" NIP="1"> <Segment RequestID="SEG1" bkgClass="Y" isOpenSegment="false"> <rtl:serviceProvider code="JL"></rtl:serviceProvider> <rtl:identifier>300</rtl:identifier> <rtl:start dateTime="2018-01-17T00:00:00"> <rtl:locationCode>FUK</rtl:locationCode> </rtl:start> <rtl:end dateTime="2018-01-17T00:00:00"> <rtl:locationCode>HND</rtl:locationCode> </rtl:end> </Segment> </Bound> <Bound ActionCode="NN" NIP="1"> <Segment RequestID="SEG2" bkgClass="Y" isOpenSegment="false"> <rtl:serviceProvider code="JL"></rtl:serviceProvider> <rtl:identifier>303</rtl:identifier> <rtl:start dateTime="2018-01-10T00:00:00"> <rtl:locationCode>HND</rtl:locationCode> </rtl:start> <rtl:end dateTime="2018-01-10T00:00:00"> <rtl:locationCode>FUK</rtl:locationCode> </rtl:end> </Segment> </Bound> </Bounds> </Rebooking> <Repricing> <ItineraryPricingOptions> <ItineraryPricingOption> <pri:NegotiatedFare Type="RU"></pri:NegotiatedFare> </ItineraryPricingOption> </ItineraryPricingOptions> </Repricing> </AMA\_TicketRebookAndRepricePNRRQ>

## 5.3.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_TicketRebookAndRepricePNRRS Version="1.000" xsi:schemaLocation="http://xml.amadeus.com/2010/06/Ticket\_RebookAndRepricePNR\_v1 AMA\_TicketRebookAndRepricePNRRS.xsd"> <Success> <Warnings> <ns2:Warning Code="34666" Language="EN" ShortText="EOT HAS BEEN PROCESSED DURING THIS TRANSACTION" Type="I">EOT HAS BEEN PROCESSED DURING THIS TRANSACTION</ns2:Warning> </Warnings> <Reservation BookingIdentifier="J6GGJZ"></Reservation> <Commit EnvelopeNumber="2" ReceivedFrom="DEFAULT RF"></Commit> <Rebooking> <CancelledElements> <ns2:Ref TattooType="ST" TattooValue="1"></ns2:Ref> <ns2:Ref TattooType="ST" TattooValue="2"></ns2:Ref> </CancelledElements> <Bounds> <Bound NIP="1"> <Segment LineNumber="3" RequestID="SEG1" TattooType="ST" TattooValue="3" bkgClass="Y" isOpenSegment="false" segmentStatus="HK"> <ns2:serviceProvider code="JL" name="Japan Airlines"></ns2:serviceProvider> <ns2:identifier>300</ns2:identifier> <ns2:start dateTime="2018-01-17T07:00:00"> <ns2:locationCode>FUK</ns2:locationCode> </ns2:start> <ns2:end dateTime="2018-01-17T08:30:00"> <ns2:locationCode>HND</ns2:locationCode> </ns2:end> </Segment> </Bound> <Bound NIP="1"> <Segment LineNumber="2" RequestID="SEG2" TattooType="ST" TattooValue="4" bkgClass="Y" isOpenSegment="false" segmentStatus="HK"> <ns2:serviceProvider code="JL" name="Japan Airlines"></ns2:serviceProvider> <ns2:identifier>303</ns2:identifier> <ns2:start dateTime="2018-01-10T06:15:00"> <ns2:locationCode>HND</ns2:locationCode> </ns2:start> <ns2:end dateTime="2018-01-10T08:15:00"> <ns2:locationCode>FUK</ns2:locationCode> </ns2:end> </Segment> </Bound> </Bounds> <SpecialKeywords> <SpecialKeyword LineNumber="7" NIP="1" TattooType="OT" TattooValue="16" Text="AUTOMATIC AGE RESTRICTION" code="NOEX" serviceProviderCode="JL" status="HK"> <ns2:Associations> <ns2:Ref LineNumber="1" TattooType="PT" TattooValue="1"></ns2:Ref> </ns2:Associations> </SpecialKeyword> </SpecialKeywords> </Rebooking> <Repricing> <ItineraryRepricing> <PricingDetails> <PricingRecords> <PricingRecord> <ns6:PaxName FirstName="Yoshido" LastName="Takaido"></ns6:PaxName> <ns6:Price Amount="76600" CurrencyCode="JPY" DecimalPlaces="0" Type="OldBase"></ns6:Price> <ns6:Price Amount="74600" CurrencyCode="JPY" DecimalPlaces="0" Type="NewBase"></ns6:Price> <ns6:Price Amount="2000" CurrencyCode="JPY" DecimalPlaces="0" Type="ResidualValue"></ns6:Price> <ns6:Price Amount="580" CurrencyCode="JPY" DecimalPlaces="0" Type="NewTax"></ns6:Price> <ns6:Price Amount="580" CurrencyCode="JPY" DecimalPlaces="0" Type="OldTax"></ns6:Price> <ns6:Price Amount="77180" CurrencyCode="JPY" DecimalPlaces="0" Type="OldTotalFare"></ns6:Price> <ns6:Price Amount="0" CurrencyCode="JPY" DecimalPlaces="0" Type="BalanceTax"></ns6:Price> <ns6:Price Amount="-2000" CurrencyCode="JPY" DecimalPlaces="0" Type="BalanceBase"></ns6:Price> <ns6:Price Amount="-2000" CurrencyCode="JPY" DecimalPlaces="0" Type="GrandTotal"></ns6:Price> <ns6:Price Amount="-2000" CurrencyCode="JPY" DecimalPlaces="0" Type="TicketDifference"></ns6:Price> <ns6:Price Amount="0" CurrencyCode="JPY" DecimalPlaces="0" Type="Penalty"></ns6:Price> <ns6:Price Amount="75180" CurrencyCode="JPY" DecimalPlaces="0" Type="NewTotalFare"></ns6:Price> <ns6:Price Amount="0" CurrencyCode="JPY" DecimalPlaces="0" Type="TotalAdditionalCollection"></ns6:Price> <ns6:PricingInfo PricingType="TQR"> <ns6:AssociatedPNRElement Tattoo="1" Type="PT"></ns6:AssociatedPNRElement> <ns6:AssociatedPNRElement Tattoo="4" Type="ST"></ns6:AssociatedPNRElement> <ns6:AssociatedPNRElement Tattoo="3" Type="ST"></ns6:AssociatedPNRElement> </ns6:PricingInfo> </PricingRecord> <PricingRecord> <ns6:PaxName FirstName="Yoshido" LastName="Takaido"></ns6:PaxName> <ns6:Price Amount="74600" CurrencyCode="JPY" DecimalPlaces="0" Type="NewBase"></ns6:Price> <ns6:Price Amount="0" CurrencyCode="JPY" DecimalPlaces="0" Type="GrandTotal"></ns6:Price> <ns6:Price Amount="0" CurrencyCode="JPY" DecimalPlaces="0" Type="Total"></ns6:Price> <ns6:Tax Amount="290" CurrencyCode="JPY" DecimalPlaces="0" Indicator="PD" IsExempted="false" IsoCode="HJ" NatureCode="DE"></ns6:Tax> <ns6:Tax Amount="290" CurrencyCode="JPY" DecimalPlaces="0" Indicator="PD" IsExempted="false" IsoCode="HJ" NatureCode="LO"></ns6:Tax> <ns6:PricingInfo FareCalc="TYO JL FUK37300YLARTZO JL TYO37300YLARTZO JPY74600END" PricingRecordRefIDs="2" PricingType="TST"> <ns6:AssociatedPNRElement Tattoo="1" Type="PT"></ns6:AssociatedPNRElement> <ns6:AssociatedPNRElement Tattoo="4" Type="ST"></ns6:AssociatedPNRElement> <ns6:AssociatedPNRElement Tattoo="3" Type="ST"></ns6:AssociatedPNRElement> </ns6:PricingInfo> <ns6:FareComponent Destination="FUK" Number="1" Origin="TYO" Type="FC"> <ns6:AssociatedPNRElement Tattoo="4" Type="ST"></ns6:AssociatedPNRElement> <ns6:FareBasis FareBasisCode="YLARTZO" FareQualifier="RT"></ns6:FareBasis> <ns6:FareFamily Name="RT" Owner="JL"></ns6:FareFamily> </ns6:FareComponent> <ns6:FareComponent Destination="TYO" Number="2" Origin="FUK" Type="FC"> <ns6:AssociatedPNRElement Tattoo="3" Type="ST"></ns6:AssociatedPNRElement> <ns6:FareBasis FareBasisCode="YLARTZO" FareQualifier="RT"></ns6:FareBasis> <ns6:FareFamily Name="RT" Owner="JL"></ns6:FareFamily> </ns6:FareComponent> <ns6:Coupon SegmentTattoo="4"> <ns6:FareBasis FareBasisCode="YLARTZO"></ns6:FareBasis> <ns6:FreeBagAllowance Type="W" Unit="K"></ns6:FreeBagAllowance> <ns6:DateValidity Type="NVA">2018-11-30</ns6:DateValidity> </ns6:Coupon> <ns6:Coupon SegmentTattoo="3"> <ns6:FareBasis FareBasisCode="YLARTZO"></ns6:FareBasis> <ns6:FreeBagAllowance Type="W" Unit="K"></ns6:FreeBagAllowance> <ns6:DateValidity Type="NVA">2018-11-30</ns6:DateValidity> </ns6:Coupon> </PricingRecord> <PricingRecord> <ns6:PaxName FirstName="Yoshido" LastName="Takaido"></ns6:PaxName> <ns6:Price Amount="2000" CurrencyCode="JPY" DecimalPlaces="0" Type="Fare"></ns6:Price> <ns6:Price Amount="0" CurrencyCode="JPY" DecimalPlaces="0" Type="Total"></ns6:Price> <ns6:Price Amount="2000" CurrencyCode="JPY" DecimalPlaces="0" Type="ExchangeValue"></ns6:Price> <ns6:PricingInfo PricingRecordRefIDs="18" PricingType="TSM" RFIC="D" RFISC="996"> <ns6:AssociatedPNRElement Tattoo="1" Type="PT"></ns6:AssociatedPNRElement> <ns6:AssociatedPNRElement Tattoo="4" Type="ST"></ns6:AssociatedPNRElement> <ns6:AssociatedPNRElement Tattoo="3" Type="ST"></ns6:AssociatedPNRElement> </ns6:PricingInfo> </PricingRecord> </PricingRecords> </PricingDetails> </ItineraryRepricing> </Repricing> </Success> </AMA\_TicketRebookAndRepricePNRRS>

## 5.3.3 Possible Errors

See "Error Messages" section.

* * *

## 5.4 Operation: Exchange of air itinerary, SSRs and seats reassociation, and addition of a new RM

Ticket\_RebookAndRepricePNR allows to exchange the segments in a PNR and to reprice the entire itinerary against the old ticket.

At the same time it allows to:

-   create new seats and associate them to the new segments, replacing the old seats related to the old segments;
-   create new SSRs and associate them to the new segments, replacing the old SSRs related to the old segments;
-   add new remarks in the PNR.

## 5.4.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_TicketRebookAndRepricePNRRQ Actions="" Version="1.000" xsi:schemaLocation="http://xml.amadeus.com/2010/06/Ticket\_RebookAndRepricePNR\_v1 AMA\_TicketRebookAndRepricePNRRQ.xsd"> <Reservation BookingIdentifier="RECLOC"></Reservation> <Commit IgnoreWarningsOption="true" ReceivedFrom="Amadeus Test WBS"></Commit> <Rebooking> <Cancellation> <Retailing:Ref TattooType="ST" TattooValue="1"></Retailing:Ref> </Cancellation> <Bounds> <Bound ActionCode="NN" NIP="1"> <Segment RequestID="SEG1" bkgClass="S" isOpenSegment="false"> <Retailing:serviceProvider code="JL"></Retailing:serviceProvider> <Retailing:identifier>7025</Retailing:identifier> <Retailing:start dateTime="2015-09-18T05:00:00"> <Retailing:locationCode>ITM</Retailing:locationCode> </Retailing:start> <Retailing:end dateTime="2015-09-18T07:00:00"> <Retailing:locationCode>KIX</Retailing:locationCode> </Retailing:end> </Segment> </Bound> </Bounds> <SpecialServiceRequests> <SpecialServiceRequest RequestID="SSR1" code="VGML"> <Retailing:Associations> <Retailing:Ref TattooType="PT" TattooValue="1"></Retailing:Ref> </Retailing:Associations> </SpecialServiceRequest> </SpecialServiceRequests> <Seats> <Seat RequestID="SEAT1"> <Retailing:seatNbr>16A</Retailing:seatNbr> <Retailing:Associations> <Retailing:Ref TattooType="PT" TattooValue="1"></Retailing:Ref> <Retailing:Ref RequestID="SEG1"></Retailing:Ref> </Retailing:Associations> </Seat> </Seats> <Remarks> <Remark Category="A" Content="REBOOKING DONE ONLINE" RequestID="RM1" Type="RM"> <Retailing:Security> <Retailing:OfficeID AccessExtension="false" AccessMode="R">PARJL\*\*\*\*</Retailing:OfficeID> </Retailing:Security> </Remark> </Remarks> </Rebooking> <Repricing> <ItineraryPricingOptions> <ItineraryPricingOption> <pri:TicketingInfo Number="1315297294448"></pri:TicketingInfo> <pri:Booking Operation="SEL"></pri:Booking> <far\_int:AssociatedPNRElement Tattoo="1" Type="PT"></far\_int:AssociatedPNRElement> </ItineraryPricingOption> </ItineraryPricingOptions> </Repricing> </AMA\_TicketRebookAndRepricePNRRQ>

## 5.4.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_TicketRebookAndRepricePNRRS Version="1.000" xsi:schemaLocation="http://xml.amadeus.com/2010/06/Ticket\_RebookAndRepricePNR\_v1 AMA\_TicketRebookAndRepricePNRRS.xsd"> <Success> <Reservation BookingIdentifier="RECLOC"></Reservation> <Commit EnvelopeNumber="5" ReceivedFrom="Amadeus Test WBS"></Commit> <Rebooking> <CancelledElements> <Retailing:Ref TattooType="ST" TattooValue="1"></Retailing:Ref> </CancelledElements> <Bounds> <Bound NIP="1"> <Segment LineNumber="2" RequestID="SEG1" TattooType="ST" TattooValue="1" bkgClass="S" isOpenSegment="false" segmentStatus="HK"> <Retailing:serviceProvider code="JL"></Retailing:serviceProvider> <Retailing:identifier>7025</Retailing:identifier> <Retailing:start dateTime="2015-08-18T05:00:00"> <Retailing:locationCode>ITM</Retailing:locationCode> </Retailing:start> <Retailing:end dateTime="2015-08-18T07:00:00"> <Retailing:locationCode>KIX</Retailing:locationCode> </Retailing:end> </Segment> </Bound> </Bounds> <SpecialServiceRequests> <SpecialServiceRequest LineNumber="5" NIP="1" RequestID="SSR1" TattooType="OT" TattooValue="5" code="VGML" serviceProviderCode="JL" status="HK"> <Retailing:Associations> <Retailing:Ref LineNumber="1" RequestID="PAX1" TattooType="PT" TattooValue="1"></Retailing:Ref> <Retailing:Ref LineNumber="2" RequestID="SEG1" TattooType="ST" TattooValue="1"></Retailing:Ref> </Retailing:Associations> </SpecialServiceRequest> </SpecialServiceRequests> <Seats> <Seat LineNumber="5" NIP="1" RequestID="SEAT1" TattooType="OT" TattooValue="5" status="HK"> <Retailing:seatNbr>16A</Retailing:seatNbr> <Retailing:start> <Retailing:locationCode>ITM</Retailing:locationCode> </Retailing:start> <Retailing:end> <Retailing:locationCode>KIX</Retailing:locationCode> </Retailing:end> <Retailing:serviceProvider code="JL"></Retailing:serviceProvider> <Retailing:Characteristics Smoking="false"></Retailing:Characteristics> <Retailing:Associations> <Retailing:Ref LineNumber="1" RequestID="PAX1" TattooType="PT" TattooValue="1"></Retailing:Ref> <Retailing:Ref LineNumber="2" RequestID="SEG1" TattooType="ST" TattooValue="1"></Retailing:Ref> </Retailing:Associations> </Seat> </Seats> <Remarks> <Remark Category="A" Content="REBOOKING DONE ONLINE" LineNumber="5" RequestID="RM1" TattooType="OT" TattooValue="5" Type="RM"> <Retailing:Security> <Retailing:OfficeID AccessExtension="false" AccessMode="B">TYOJL0101</Retailing:OfficeID> <Retailing:OfficeID AccessExtension="false" AccessMode="R">PARJL\*\*\*\*</Retailing:OfficeID> </Retailing:Security> </Remark> </Remarks> </Rebooking> <Repricing> <ItineraryRepricing> <PricingDetails> <Totals> <far\_int:Price Amount="0" CurrencyCode="EUR" DecimalPlaces="2" Type="SumResidualValue"></far\_int:Price> <far\_int:Price Amount="5500" CurrencyCode="EUR" DecimalPlaces="2" Type="SumPenalty"></far\_int:Price> </Totals> <PricingRecords> <PricingRecord> <far\_int:Price Amount="95000" CurrencyCode="EUR" DecimalPlaces="2" Type="OldBase"></far\_int:Price> <far\_int:Price Amount="110000" CurrencyCode="EUR" DecimalPlaces="2" Type="NewBase"></far\_int:Price> <far\_int:Price Amount="15000" CurrencyCode="EUR" DecimalPlaces="2" Type="BalanceBase"></far\_int:Price> <far\_int:Price Amount="11000" CurrencyCode="EUR" DecimalPlaces="2" Type="OldTax"></far\_int:Price> <far\_int:Price Amount="11000" CurrencyCode="EUR" DecimalPlaces="2" Type="NewTax"></far\_int:Price> <far\_int:Price Amount="0" CurrencyCode="EUR" DecimalPlaces="2" Type="BalanceTax"></far\_int:Price> <far\_int:Price Amount="15000" CurrencyCode="EUR" DecimalPlaces="2" Type="TicketDifference"></far\_int:Price> <far\_int:Price Amount="5500" CurrencyCode="EUR" DecimalPlaces="2" Type="Penalty"></far\_int:Price> <far\_int:Price Amount="20500" CurrencyCode="EUR" DecimalPlaces="2" Type="GrandTotal"></far\_int:Price> <far\_int:PricingInfo PricingRecordRefIDs="1" PricingType="TQR"> <far\_int:AssociatedPNRElement Tattoo="1" Type="PT"></far\_int:AssociatedPNRElement> <far\_int:AssociatedPNRElement Tattoo="1" Type="ST"></far\_int:AssociatedPNRElement> <far\_int:AssociatedPNRElement Tattoo="2" Type="ST"></far\_int:AssociatedPNRElement> </far\_int:PricingInfo> </PricingRecord> <PricingRecord> <far\_int:Price Amount="15000" CurrencyCode="EUR" DecimalPlaces="2" Type="Total"></far\_int:Price> <far\_int:Price Amount="15000" CurrencyCode="EUR" DecimalPlaces="2" Type="GrandTotal"></far\_int:Price> <far\_int:Price Amount="110000" CurrencyCode="EUR" DecimalPlaces="2" Type="Base"></far\_int:Price> <far\_int:Tax Amount="10000" CurrencyCode="EUR" DecimalPlaces="2" IsoCode="FR" NatureCode="A1"></far\_int:Tax> <far\_int:Tax Amount="1000" CurrencyCode="EUR" DecimalPlaces="2" IsoCode="FR" NatureCode="ZZ"></far\_int:Tax> <far\_int:PricingInfo PricingRecordRefIDs="1" PricingType="TST"> <far\_int:AssociatedPNRElement Tattoo="1" Type="PT"></far\_int:AssociatedPNRElement> <far\_int:AssociatedPNRElement Tattoo="1" Type="ST"></far\_int:AssociatedPNRElement> <far\_int:AssociatedPNRElement Tattoo="2" Type="ST"></far\_int:AssociatedPNRElement> </far\_int:PricingInfo> </PricingRecord> <PricingRecord> <far\_int:Price Amount="5500" CurrencyCode="EUR" DecimalPlaces="2" Type="Total"></far\_int:Price> <far\_int:Price Amount="5500" CurrencyCode="EUR" DecimalPlaces="2" Type="Base"></far\_int:Price> <far\_int:PricingInfo PricingRecordRefIDs="2" PricingType="TSM" RFIC="D" RFISC="995"> <far\_int:AssociatedPNRElement Tattoo="1" Type="PT"></far\_int:AssociatedPNRElement> <far\_int:AssociatedPNRElement Tattoo="1" Type="ST"></far\_int:AssociatedPNRElement> <far\_int:AssociatedPNRElement Tattoo="2" Type="ST"></far\_int:AssociatedPNRElement> </far\_int:PricingInfo> </PricingRecord> </PricingRecords> </PricingDetails> </ItineraryRepricing> </Repricing> </Success> </AMA\_TicketRebookAndRepricePNRRS>

## 5.4.3 Possible Errors

See "Error Messages" section.

* * *

## 5.5 Operation: Exchange of itinerary with Best Pricing repricing

Ticket\_RebookAndRepricePNR allows to exchange the segments in a PNR and reprice the entire itinerary against the old ticket, while also providing in input a pricing option to request Best Pricing. This allows to find the cheapest fare available in a given cabin.

## 5.5.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_TicketRebookAndRepricePNRRQ xmlns:rtl="http://xml.amadeus.com/2010/06/Retailing\_Types\_v2" Actions="COMMIT" Version="1.000"> <Reservation BookingIdentifier="TYSLDT"></Reservation> <Commit></Commit> <Rebooking> <Cancellation> <rtl:Ref TattooType="ST" TattooValue="1"></rtl:Ref> </Cancellation> <Bounds> <Bound NIP="1"> <Segment RequestID="SEG2" bkgClass="Y"> <rtl:serviceProvider code="AF"></rtl:serviceProvider> <rtl:identifier>6204</rtl:identifier> <rtl:start dateTime="2020-09-19T00:00:00"> <rtl:locationCode>ORY</rtl:locationCode> </rtl:start> <rtl:end dateTime="2020-09-19T00:00:00"> <rtl:locationCode>NCE</rtl:locationCode> </rtl:end> </Segment> </Bound> </Bounds> </Rebooking> <Repricing> <ItineraryPricingOptions> <ItineraryPricingOption> <pri:Booking Operation="SEL"></pri:Booking> <pri:TicketingInfo Number="0573322488077"></pri:TicketingInfo> <far\_int:AssociatedPNRElement Tattoo="1" Type="PT"></far\_int:AssociatedPNRElement> </ItineraryPricingOption> <ItineraryPricingOption> <pri:OtherOptions Code="BST"></pri:OtherOptions> </ItineraryPricingOption> </ItineraryPricingOptions> </Repricing> </AMA\_TicketRebookAndRepricePNRRQ>

## 5.5.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_TicketRebookAndRepricePNRRS xmlns:ns9="http://xml.amadeus.com/2010/06/Retailing\_RebookAndReprice\_v2" Version="1.000"> <Success> <Warnings> <ns2:Warning Code="34666" Language="EN" ShortText="EOT HAS BEEN PROCESSED DURING THIS TRANSACTION" Type="I">EOT HAS BEEN PROCESSED DURING THIS TRANSACTION</ns2:Warning> </Warnings> <Reservation BookingIdentifier="TYSLDT"></Reservation> <Commit EnvelopeNumber="4" ReceivedFrom="DEFAULT RF"></Commit> <Rebooking> <CancelledElements> <ns2:Ref TattooType="ST" TattooValue="1"></ns2:Ref> </CancelledElements> <Bounds> <Bound NIP="1"> <Segment LineNumber="2" TattooType="ST" TattooValue="3" bkgClass="R" isOpenSegment="false" segmentStatus="HK"> <ns2:serviceProvider code="AF" name="Air France"></ns2:serviceProvider> <ns2:identifier>6204</ns2:identifier> <ns2:start dateTime="2020-09-19T08:20:00"> <ns2:locationCode>ORY</ns2:locationCode> </ns2:start> <ns2:end dateTime="2020-09-19T09:45:00"> <ns2:locationCode>NCE</ns2:locationCode> </ns2:end> </Segment> </Bound> <Bound NIP="1"> <Segment LineNumber="2" TattooType="ST" TattooValue="3" bkgClass="R" isOpenSegment="false" segmentStatus="HK"> <ns2:serviceProvider code="AF" name="Air France"></ns2:serviceProvider> <ns2:identifier>6204</ns2:identifier> <ns2:start dateTime="2020-09-19T08:20:00"> <ns2:locationCode>ORY</ns2:locationCode> </ns2:start> <ns2:end dateTime="2020-09-19T09:45:00"> <ns2:locationCode>NCE</ns2:locationCode> </ns2:end> </Segment> </Bound> </Bounds> </Rebooking> <Repricing> <ItineraryRepricing> <PricingDetails> <PricingRecords> <PricingRecord> <ns6:PaxName FirstName="Kukoukuumr" LastName="Reinihon"></ns6:PaxName> <ns6:Price Amount="12600" CurrencyCode="EUR" DecimalPlaces="2" Type="NewBase"></ns6:Price> <ns6:Price Amount="70600" CurrencyCode="EUR" DecimalPlaces="2" Type="OldBase"></ns6:Price> <ns6:Price Amount="58131" CurrencyCode="EUR" DecimalPlaces="2" Type="ResidualValue"></ns6:Price> <ns6:Price Amount="15891" CurrencyCode="EUR" DecimalPlaces="2" Type="NewTotalFare"></ns6:Price> <ns6:Price Amount="3291" CurrencyCode="EUR" DecimalPlaces="2" Type="NewTax"></ns6:Price> <ns6:Price Amount="0" CurrencyCode="EUR" DecimalPlaces="2" Type="TotalAdditionalCollection"></ns6:Price> <ns6:Price Amount="3422" CurrencyCode="EUR" DecimalPlaces="2" Type="OldTax"></ns6:Price> <ns6:Price Amount="-58000" CurrencyCode="EUR" DecimalPlaces="2" Type="BalanceBase"></ns6:Price> <ns6:Price Amount="-58131" CurrencyCode="EUR" DecimalPlaces="2" Type="GrandTotal"></ns6:Price> <ns6:Price Amount="-131" CurrencyCode="EUR" DecimalPlaces="2" Type="BalanceTax"></ns6:Price> <ns6:Price Amount="-58131" CurrencyCode="EUR" DecimalPlaces="2" Type="TicketDifference"></ns6:Price> <ns6:Price Amount="0" CurrencyCode="EUR" DecimalPlaces="2" Type="Penalty"></ns6:Price> <ns6:Price Amount="74022" CurrencyCode="EUR" DecimalPlaces="2" Type="OldTotalFare"></ns6:Price> <ns6:PricingInfo PricingType="TQR"> <ns6:AssociatedPNRElement Tattoo="1" Type="PT"></ns6:AssociatedPNRElement> <ns6:AssociatedPNRElement Tattoo="2" Type="ST"></ns6:AssociatedPNRElement> </ns6:PricingInfo> </PricingRecord> <PricingRecord> <ns6:PaxName FirstName="Kukoukuumr" LastName="Reinihon"></ns6:PaxName> <ns6:Price Amount="12600" CurrencyCode="EUR" DecimalPlaces="2" Type="NewBase"></ns6:Price> <ns6:Price Amount="3291" CurrencyCode="EUR" DecimalPlaces="2" Type="TotalRefundableTaxes"></ns6:Price> <ns6:Price Amount="0" CurrencyCode="EUR" DecimalPlaces="2" Type="GrandTotal"></ns6:Price> <ns6:Price Amount="0" CurrencyCode="EUR" DecimalPlaces="2" Type="Total"></ns6:Price> <ns6:Tax Amount="463" CurrencyCode="EUR" DecimalPlaces="2" Indicator="PD" IsoCode="FR" NatureCode="SE"></ns6:Tax> <ns6:Tax Amount="1170" CurrencyCode="EUR" DecimalPlaces="2" Indicator="PD" IsoCode="FR" NatureCode="TI"></ns6:Tax> <ns6:Tax Amount="113" CurrencyCode="EUR" DecimalPlaces="2" Indicator="PD" IsoCode="IZ" NatureCode="EB"></ns6:Tax> <ns6:Tax Amount="150" CurrencyCode="EUR" DecimalPlaces="2" Indicator="PD" IsoCode="O4" NatureCode="VC"></ns6:Tax> <ns6:Tax Amount="1095" CurrencyCode="EUR" DecimalPlaces="2" Indicator="PD" IsoCode="QW" NatureCode="LO"></ns6:Tax> <ns6:Tax Amount="300" CurrencyCode="EUR" DecimalPlaces="2" Indicator="PD" IsoCode="UI" NatureCode="VZ"></ns6:Tax> <ns6:Tax Amount="119" CurrencyCode="EUR" DecimalPlaces="2" Indicator="RFD" IsoCode="QW" NatureCode="LO"></ns6:Tax> <ns6:Tax Amount="12" CurrencyCode="EUR" DecimalPlaces="2" Indicator="RFD" IsoCode="UI" NatureCode="VZ"></ns6:Tax> <ns6:PricingInfo FareCalc="PAR AF NCE126.00EUR126.00END" PricingType="TST"> <ns6:AssociatedPNRElement Tattoo="1" Type="PT"></ns6:AssociatedPNRElement> <ns6:AssociatedPNRElement Tattoo="2" Type="ST"></ns6:AssociatedPNRElement> </ns6:PricingInfo> <ns6:FareComponent Destination="NCE" Number="1" Origin="PAR" Type="FC"> <ns6:AssociatedPNRElement Tattoo="2" Type="ST"></ns6:AssociatedPNRElement> <ns6:FareBasis FareBasisCode="RS58BEHX"></ns6:FareBasis> <ns6:FareFamily Name="FLEX" Owner="AF"></ns6:FareFamily> </ns6:FareComponent> <ns6:Coupon SegmentTattoo="2"> <ns6:FareBasis FareBasisCode="RS58BEHX"></ns6:FareBasis> <ns6:FreeBagAllowance Measure="1" Type="N"></ns6:FreeBagAllowance> <ns6:DateValidity Type="NVA">2021-09-19</ns6:DateValidity> </ns6:Coupon> </PricingRecord> <PricingRecord> <ns6:PaxName FirstName="Kukoukuumr" LastName="Reinihon"></ns6:PaxName> <ns6:Price Amount="58131" CurrencyCode="EUR" DecimalPlaces="2" Type="Fare"></ns6:Price> <ns6:Price Amount="0" CurrencyCode="EUR" DecimalPlaces="2" Type="Total"></ns6:Price> <ns6:Price Amount="58131" CurrencyCode="EUR" DecimalPlaces="2" Type="ExchangeValue"></ns6:Price> <ns6:PricingInfo PricingRecordRefIDs="19" PricingType="TSM" RFIC="D" RFISC="996"> <ns6:AssociatedPNRElement Tattoo="1" Type="PT"></ns6:AssociatedPNRElement> <ns6:AssociatedPNRElement Tattoo="3" Type="ST"></ns6:AssociatedPNRElement> </ns6:PricingInfo> </PricingRecord> </PricingRecords> </PricingDetails> </ItineraryRepricing> </Repricing> </Success> </AMA\_TicketRebookAndRepricePNRRS>

## 5.5.3 Possible Errors

See "Error Messages" section.

* * *

## 5.6 Operation: Exchange of itinerary with Fare Currency override without specifying ticket numbers

Ticket\_RebookAndRepricePNR allows to exchange the segments in a PNR and reprice the entire itinerary against the old ticket, while also providing in input a pricing option to override the fare currency.

The ticket numbers, if not provided in input, are fetched by the service itself.

## 5.6.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_TicketRebookAndRepricePNRRQ Actions="COMMIT" Version="1.000"> <Reservation BookingIdentifier="TXZGFW"></Reservation> <Commit></Commit> <Rebooking> <Cancellation> <rtl:Ref TattooType="ST" TattooValue="1"></rtl:Ref> </Cancellation> <Bounds> <Bound NIP="3"> <Segment RequestID="SEG2" bkgClass="Y"> <rtl:serviceProvider code="AF"></rtl:serviceProvider> <rtl:identifier>6204</rtl:identifier> <rtl:start dateTime="2020-09-19T00:00:00"> <rtl:locationCode>ORY</rtl:locationCode> </rtl:start> <rtl:end dateTime="2020-09-19T00:00:00"> <rtl:locationCode>NCE</rtl:locationCode> </rtl:end> </Segment> </Bound> </Bounds> </Rebooking> <Repricing> <ItineraryPricingOptions> <ItineraryPricingOption> <pri:FareDetermination CurrencyCode="USD" Operation="FCO"></pri:FareDetermination> </ItineraryPricingOption> </ItineraryPricingOptions> </Repricing> </AMA\_TicketRebookAndRepricePNRRQ>

## 5.6.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_TicketRebookAndRepricePNRRS Version="1.000"> <Success> <Warnings> <ns2:Warning Code="34666" Language="EN" ShortText="EOT HAS BEEN PROCESSED DURING THIS TRANSACTION" Type="I">EOT HAS BEEN PROCESSED DURING THIS TRANSACTION</ns2:Warning> </Warnings> <Reservation BookingIdentifier="TXZGFW"></Reservation> <Commit EnvelopeNumber="4" ReceivedFrom="DEFAULT RF"></Commit> <Rebooking> <CancelledElements> <ns2:Ref TattooType="ST" TattooValue="1"></ns2:Ref> </CancelledElements> <Bounds> <Bound NIP="3"> <Segment LineNumber="4" RequestID="SEG2" TattooType="ST" TattooValue="2" bkgClass="Y" isOpenSegment="false" segmentStatus="HK"> <ns2:serviceProvider code="AF" name="Air France"></ns2:serviceProvider> <ns2:identifier>6204</ns2:identifier> <ns2:start dateTime="2020-09-19T08:20:00"> <ns2:locationCode>ORY</ns2:locationCode> </ns2:start> <ns2:end dateTime="2020-09-19T09:45:00"> <ns2:locationCode>NCE</ns2:locationCode> </ns2:end> </Segment> </Bound> </Bounds> </Rebooking> <Repricing> <ItineraryRepricing> <PricingDetails> <PricingRecords> <PricingRecord> <ns6:PaxName FirstName="Kukoukuumr" LastName="Reinihon"></ns6:PaxName> <ns6:Price Amount="38700" CurrencyCode="EUR" DecimalPlaces="2" Type="NewBase"></ns6:Price> <ns6:Price Amount="70600" CurrencyCode="EUR" DecimalPlaces="2" Type="OldBase"></ns6:Price> <ns6:Price Amount="34642" CurrencyCode="USD" DecimalPlaces="2" Type="ResidualValue"></ns6:Price> <ns6:Price Amount="45356" CurrencyCode="USD" DecimalPlaces="2" Type="NewTotalFare"></ns6:Price> <ns6:Price Amount="3556" CurrencyCode="USD" DecimalPlaces="2" Type="NewTax"></ns6:Price> <ns6:Price Amount="0" CurrencyCode="USD" DecimalPlaces="2" Type="TotalAdditionalCollection"></ns6:Price> <ns6:Price Amount="3698" CurrencyCode="USD" DecimalPlaces="2" Type="OldTax"></ns6:Price> <ns6:Price Amount="-34500" CurrencyCode="USD" DecimalPlaces="2" Type="BalanceBase"></ns6:Price> <ns6:Price Amount="-34642" CurrencyCode="USD" DecimalPlaces="2" Type="GrandTotal"></ns6:Price> <ns6:Price Amount="-142" CurrencyCode="USD" DecimalPlaces="2" Type="BalanceTax"></ns6:Price> <ns6:Price Amount="-34642" CurrencyCode="USD" DecimalPlaces="2" Type="TicketDifference"></ns6:Price> <ns6:Price Amount="0" CurrencyCode="USD" DecimalPlaces="2" Type="Penalty"></ns6:Price> <ns6:Price Amount="32031" CurrencyCode="EUR" DecimalPlaces="2" Type="ResidualValue"></ns6:Price> <ns6:Price Amount="3291" CurrencyCode="EUR" DecimalPlaces="2" Type="NewTax"></ns6:Price> <ns6:Price Amount="-131" CurrencyCode="EUR" DecimalPlaces="2" Type="BalanceTax"></ns6:Price> <ns6:Price Amount="-31900" CurrencyCode="EUR" DecimalPlaces="2" Type="BalanceBase"></ns6:Price> <ns6:Price Amount="-32031" CurrencyCode="EUR" DecimalPlaces="2" Type="GrandTotal"></ns6:Price> <ns6:Price Amount="-32031" CurrencyCode="EUR" DecimalPlaces="2" Type="TicketDifference"></ns6:Price> <ns6:Price Amount="3422" CurrencyCode="EUR" DecimalPlaces="2" Type="OldTax"></ns6:Price> <ns6:Price Amount="74022" CurrencyCode="EUR" DecimalPlaces="2" Type="OldTotalFare"></ns6:Price> <ns6:Price Amount="0" CurrencyCode="EUR" DecimalPlaces="2" Type="Penalty"></ns6:Price> <ns6:PricingInfo PricingType="TQR"> <ns6:AssociatedPNRElement Tattoo="1" Type="PT"></ns6:AssociatedPNRElement> <ns6:AssociatedPNRElement Tattoo="2" Type="ST"></ns6:AssociatedPNRElement> </ns6:PricingInfo> </PricingRecord> <PricingRecord> <ns6:PaxName FirstName="Kukoukuumr" LastName="Reinihon"></ns6:PaxName> <ns6:Price Amount="38700" CurrencyCode="EUR" DecimalPlaces="2" Type="NewBase"></ns6:Price> <ns6:Price Amount="3291" CurrencyCode="EUR" DecimalPlaces="2" Type="TotalRefundableTaxes"></ns6:Price> <ns6:Price Amount="0" CurrencyCode="USD" DecimalPlaces="2" Type="GrandTotal"></ns6:Price> <ns6:Price Amount="0" CurrencyCode="USD" DecimalPlaces="2" Type="Total"></ns6:Price> <ns6:Tax Amount="463" CurrencyCode="EUR" DecimalPlaces="2" Indicator="PD" IsoCode="FR" NatureCode="SE"></ns6:Tax> <ns6:Tax Amount="1170" CurrencyCode="EUR" DecimalPlaces="2" Indicator="PD" IsoCode="FR" NatureCode="TI"></ns6:Tax> <ns6:Tax Amount="113" CurrencyCode="EUR" DecimalPlaces="2" Indicator="PD" IsoCode="IZ" NatureCode="EB"></ns6:Tax> <ns6:Tax Amount="150" CurrencyCode="EUR" DecimalPlaces="2" Indicator="PD" IsoCode="O4" NatureCode="VC"></ns6:Tax> <ns6:Tax Amount="1095" CurrencyCode="EUR" DecimalPlaces="2" Indicator="PD" IsoCode="QW" NatureCode="LO"></ns6:Tax> <ns6:Tax Amount="300" CurrencyCode="EUR" DecimalPlaces="2" Indicator="PD" IsoCode="UI" NatureCode="VZ"></ns6:Tax> <ns6:Tax Amount="119" CurrencyCode="EUR" DecimalPlaces="2" Indicator="RFD" IsoCode="QW" NatureCode="LO"></ns6:Tax> <ns6:Tax Amount="12" CurrencyCode="EUR" DecimalPlaces="2" Indicator="RFD" IsoCode="UI" NatureCode="VZ"></ns6:Tax> <ns6:PricingInfo FareCalc="PAR AF NCE387.00EUR387.00END" PricingRecordRefIDs="2" PricingType="TST"> <ns6:AssociatedPNRElement Tattoo="1" Type="PT"></ns6:AssociatedPNRElement> <ns6:AssociatedPNRElement Tattoo="2" Type="ST"></ns6:AssociatedPNRElement> </ns6:PricingInfo> <ns6:FareComponent Destination="NCE" Number="1" Origin="PAR" Type="FC"> <ns6:AssociatedPNRElement Tattoo="2" Type="ST"></ns6:AssociatedPNRElement> <ns6:FareBasis FareBasisCode="YS50BEHX"></ns6:FareBasis> <ns6:FareFamily Name="FLEX" Owner="AF"></ns6:FareFamily> </ns6:FareComponent> <ns6:Coupon SegmentTattoo="2"> <ns6:FareBasis FareBasisCode="YS50BEHX"></ns6:FareBasis> <ns6:FreeBagAllowance Measure="1" Type="N"></ns6:FreeBagAllowance> <ns6:DateValidity Type="NVA">2021-09-19</ns6:DateValidity> </ns6:Coupon> </PricingRecord> <PricingRecord> <ns6:PaxName FirstName="Titoms" LastName="Reinihon"></ns6:PaxName> <ns6:Price Amount="38700" CurrencyCode="EUR" DecimalPlaces="2" Type="NewBase"></ns6:Price> <ns6:Price Amount="70600" CurrencyCode="EUR" DecimalPlaces="2" Type="OldBase"></ns6:Price> <ns6:Price Amount="34642" CurrencyCode="USD" DecimalPlaces="2" Type="ResidualValue"></ns6:Price> <ns6:Price Amount="45356" CurrencyCode="USD" DecimalPlaces="2" Type="NewTotalFare"></ns6:Price> <ns6:Price Amount="3556" CurrencyCode="USD" DecimalPlaces="2" Type="NewTax"></ns6:Price> <ns6:Price Amount="0" CurrencyCode="USD" DecimalPlaces="2" Type="TotalAdditionalCollection"></ns6:Price> <ns6:Price Amount="3698" CurrencyCode="USD" DecimalPlaces="2" Type="OldTax"></ns6:Price> <ns6:Price Amount="-34500" CurrencyCode="USD" DecimalPlaces="2" Type="BalanceBase"></ns6:Price> <ns6:Price Amount="-34642" CurrencyCode="USD" DecimalPlaces="2" Type="GrandTotal"></ns6:Price> <ns6:Price Amount="-142" CurrencyCode="USD" DecimalPlaces="2" Type="BalanceTax"></ns6:Price> <ns6:Price Amount="-34642" CurrencyCode="USD" DecimalPlaces="2" Type="TicketDifference"></ns6:Price> <ns6:Price Amount="0" CurrencyCode="USD" DecimalPlaces="2" Type="Penalty"></ns6:Price> <ns6:Price Amount="32031" CurrencyCode="EUR" DecimalPlaces="2" Type="ResidualValue"></ns6:Price> <ns6:Price Amount="3291" CurrencyCode="EUR" DecimalPlaces="2" Type="NewTax"></ns6:Price> <ns6:Price Amount="-131" CurrencyCode="EUR" DecimalPlaces="2" Type="BalanceTax"></ns6:Price> <ns6:Price Amount="-31900" CurrencyCode="EUR" DecimalPlaces="2" Type="BalanceBase"></ns6:Price> <ns6:Price Amount="-32031" CurrencyCode="EUR" DecimalPlaces="2" Type="GrandTotal"></ns6:Price> <ns6:Price Amount="-32031" CurrencyCode="EUR" DecimalPlaces="2" Type="TicketDifference"></ns6:Price> <ns6:Price Amount="3422" CurrencyCode="EUR" DecimalPlaces="2" Type="OldTax"></ns6:Price> <ns6:Price Amount="74022" CurrencyCode="EUR" DecimalPlaces="2" Type="OldTotalFare"></ns6:Price> <ns6:Price Amount="0" CurrencyCode="EUR" DecimalPlaces="2" Type="Penalty"></ns6:Price> <ns6:PricingInfo PricingType="TQR"> <ns6:AssociatedPNRElement Tattoo="3" Type="PT"></ns6:AssociatedPNRElement> <ns6:AssociatedPNRElement Tattoo="2" Type="ST"></ns6:AssociatedPNRElement> </ns6:PricingInfo> </PricingRecord> <PricingRecord> <ns6:PaxName FirstName="Titoms" LastName="Reinihon"></ns6:PaxName> <ns6:Price Amount="38700" CurrencyCode="EUR" DecimalPlaces="2" Type="NewBase"></ns6:Price> <ns6:Price Amount="3291" CurrencyCode="EUR" DecimalPlaces="2" Type="TotalRefundableTaxes"></ns6:Price> <ns6:Price Amount="0" CurrencyCode="USD" DecimalPlaces="2" Type="GrandTotal"></ns6:Price> <ns6:Price Amount="0" CurrencyCode="USD" DecimalPlaces="2" Type="Total"></ns6:Price> <ns6:Tax Amount="463" CurrencyCode="EUR" DecimalPlaces="2" Indicator="PD" IsoCode="FR" NatureCode="SE"></ns6:Tax> <ns6:Tax Amount="1170" CurrencyCode="EUR" DecimalPlaces="2" Indicator="PD" IsoCode="FR" NatureCode="TI"></ns6:Tax> <ns6:Tax Amount="113" CurrencyCode="EUR" DecimalPlaces="2" Indicator="PD" IsoCode="IZ" NatureCode="EB"></ns6:Tax> <ns6:Tax Amount="150" CurrencyCode="EUR" DecimalPlaces="2" Indicator="PD" IsoCode="O4" NatureCode="VC"></ns6:Tax> <ns6:Tax Amount="1095" CurrencyCode="EUR" DecimalPlaces="2" Indicator="PD" IsoCode="QW" NatureCode="LO"></ns6:Tax> <ns6:Tax Amount="300" CurrencyCode="EUR" DecimalPlaces="2" Indicator="PD" IsoCode="UI" NatureCode="VZ"></ns6:Tax> <ns6:Tax Amount="119" CurrencyCode="EUR" DecimalPlaces="2" Indicator="RFD" IsoCode="QW" NatureCode="LO"></ns6:Tax> <ns6:Tax Amount="12" CurrencyCode="EUR" DecimalPlaces="2" Indicator="RFD" IsoCode="UI" NatureCode="VZ"></ns6:Tax> <ns6:PricingInfo FareCalc="PAR AF NCE387.00EUR387.00END" PricingRecordRefIDs="3" PricingType="TST"> <ns6:AssociatedPNRElement Tattoo="3" Type="PT"></ns6:AssociatedPNRElement> <ns6:AssociatedPNRElement Tattoo="2" Type="ST"></ns6:AssociatedPNRElement> </ns6:PricingInfo> <ns6:FareComponent Destination="NCE" Number="1" Origin="PAR" Type="FC"> <ns6:AssociatedPNRElement Tattoo="2" Type="ST"></ns6:AssociatedPNRElement> <ns6:FareBasis FareBasisCode="YS50BEHX"></ns6:FareBasis> <ns6:FareFamily Name="FLEX" Owner="AF"></ns6:FareFamily> </ns6:FareComponent> <ns6:Coupon SegmentTattoo="2"> <ns6:FareBasis FareBasisCode="YS50BEHX"></ns6:FareBasis> <ns6:FreeBagAllowance Measure="1" Type="N"></ns6:FreeBagAllowance> <ns6:DateValidity Type="NVA">2021-09-19</ns6:DateValidity> </ns6:Coupon> </PricingRecord> <PricingRecord> <ns6:PaxName FirstName="Yatashimrs" LastName="Reinihon"></ns6:PaxName> <ns6:Price Amount="38700" CurrencyCode="EUR" DecimalPlaces="2" Type="NewBase"></ns6:Price> <ns6:Price Amount="70600" CurrencyCode="EUR" DecimalPlaces="2" Type="OldBase"></ns6:Price> <ns6:Price Amount="34642" CurrencyCode="USD" DecimalPlaces="2" Type="ResidualValue"></ns6:Price> <ns6:Price Amount="45356" CurrencyCode="USD" DecimalPlaces="2" Type="NewTotalFare"></ns6:Price> <ns6:Price Amount="3556" CurrencyCode="USD" DecimalPlaces="2" Type="NewTax"></ns6:Price> <ns6:Price Amount="0" CurrencyCode="USD" DecimalPlaces="2" Type="TotalAdditionalCollection"></ns6:Price> <ns6:Price Amount="3698" CurrencyCode="USD" DecimalPlaces="2" Type="OldTax"></ns6:Price> <ns6:Price Amount="-34500" CurrencyCode="USD" DecimalPlaces="2" Type="BalanceBase"></ns6:Price> <ns6:Price Amount="-34642" CurrencyCode="USD" DecimalPlaces="2" Type="GrandTotal"></ns6:Price> <ns6:Price Amount="-142" CurrencyCode="USD" DecimalPlaces="2" Type="BalanceTax"></ns6:Price> <ns6:Price Amount="-34642" CurrencyCode="USD" DecimalPlaces="2" Type="TicketDifference"></ns6:Price> <ns6:Price Amount="0" CurrencyCode="USD" DecimalPlaces="2" Type="Penalty"></ns6:Price> <ns6:Price Amount="32031" CurrencyCode="EUR" DecimalPlaces="2" Type="ResidualValue"></ns6:Price> <ns6:Price Amount="3291" CurrencyCode="EUR" DecimalPlaces="2" Type="NewTax"></ns6:Price> <ns6:Price Amount="-131" CurrencyCode="EUR" DecimalPlaces="2" Type="BalanceTax"></ns6:Price> <ns6:Price Amount="-31900" CurrencyCode="EUR" DecimalPlaces="2" Type="BalanceBase"></ns6:Price> <ns6:Price Amount="-32031" CurrencyCode="EUR" DecimalPlaces="2" Type="GrandTotal"></ns6:Price> <ns6:Price Amount="-32031" CurrencyCode="EUR" DecimalPlaces="2" Type="TicketDifference"></ns6:Price> <ns6:Price Amount="3422" CurrencyCode="EUR" DecimalPlaces="2" Type="OldTax"></ns6:Price> <ns6:Price Amount="74022" CurrencyCode="EUR" DecimalPlaces="2" Type="OldTotalFare"></ns6:Price> <ns6:Price Amount="0" CurrencyCode="EUR" DecimalPlaces="2" Type="Penalty"></ns6:Price> <ns6:PricingInfo PricingType="TQR"> <ns6:AssociatedPNRElement Tattoo="2" Type="PT"></ns6:AssociatedPNRElement> <ns6:AssociatedPNRElement Tattoo="2" Type="ST"></ns6:AssociatedPNRElement> </ns6:PricingInfo> </PricingRecord> <PricingRecord> <ns6:PaxName FirstName="Yatashimrs" LastName="Reinihon"></ns6:PaxName> <ns6:Price Amount="38700" CurrencyCode="EUR" DecimalPlaces="2" Type="NewBase"></ns6:Price> <ns6:Price Amount="3291" CurrencyCode="EUR" DecimalPlaces="2" Type="TotalRefundableTaxes"></ns6:Price> <ns6:Price Amount="0" CurrencyCode="USD" DecimalPlaces="2" Type="GrandTotal"></ns6:Price> <ns6:Price Amount="0" CurrencyCode="USD" DecimalPlaces="2" Type="Total"></ns6:Price> <ns6:Tax Amount="463" CurrencyCode="EUR" DecimalPlaces="2" Indicator="PD" IsoCode="FR" NatureCode="SE"></ns6:Tax> <ns6:Tax Amount="1170" CurrencyCode="EUR" DecimalPlaces="2" Indicator="PD" IsoCode="FR" NatureCode="TI"></ns6:Tax> <ns6:Tax Amount="113" CurrencyCode="EUR" DecimalPlaces="2" Indicator="PD" IsoCode="IZ" NatureCode="EB"></ns6:Tax> <ns6:Tax Amount="150" CurrencyCode="EUR" DecimalPlaces="2" Indicator="PD" IsoCode="O4" NatureCode="VC"></ns6:Tax> <ns6:Tax Amount="1095" CurrencyCode="EUR" DecimalPlaces="2" Indicator="PD" IsoCode="QW" NatureCode="LO"></ns6:Tax> <ns6:Tax Amount="300" CurrencyCode="EUR" DecimalPlaces="2" Indicator="PD" IsoCode="UI" NatureCode="VZ"></ns6:Tax> <ns6:Tax Amount="119" CurrencyCode="EUR" DecimalPlaces="2" Indicator="RFD" IsoCode="QW" NatureCode="LO"></ns6:Tax> <ns6:Tax Amount="12" CurrencyCode="EUR" DecimalPlaces="2" Indicator="RFD" IsoCode="UI" NatureCode="VZ"></ns6:Tax> <ns6:PricingInfo FareCalc="PAR AF NCE387.00EUR387.00END" PricingRecordRefIDs="4" PricingType="TST"> <ns6:AssociatedPNRElement Tattoo="2" Type="PT"></ns6:AssociatedPNRElement> <ns6:AssociatedPNRElement Tattoo="2" Type="ST"></ns6:AssociatedPNRElement> </ns6:PricingInfo> <ns6:FareComponent Destination="NCE" Number="1" Origin="PAR" Type="FC"> <ns6:AssociatedPNRElement Tattoo="2" Type="ST"></ns6:AssociatedPNRElement> <ns6:FareBasis FareBasisCode="YS50BEHX"></ns6:FareBasis> <ns6:FareFamily Name="FLEX" Owner="AF"></ns6:FareFamily> </ns6:FareComponent> <ns6:Coupon SegmentTattoo="2"> <ns6:FareBasis FareBasisCode="YS50BEHX"></ns6:FareBasis> <ns6:FreeBagAllowance Measure="1" Type="N"></ns6:FreeBagAllowance> <ns6:DateValidity Type="NVA">2021-09-19</ns6:DateValidity> </ns6:Coupon> </PricingRecord> <PricingRecord> <ns6:PaxName FirstName="Kukoukuumr" LastName="Reinihon"></ns6:PaxName> <ns6:Price Amount="32031" CurrencyCode="EUR" DecimalPlaces="2" Type="Fare"></ns6:Price> <ns6:Price Amount="0" CurrencyCode="USD" DecimalPlaces="2" Type="Total"></ns6:Price> <ns6:Price Amount="34642" CurrencyCode="USD" DecimalPlaces="2" Type="Equivalent"></ns6:Price> <ns6:Price Amount="32031" CurrencyCode="EUR" DecimalPlaces="2" Type="ExchangeValue"></ns6:Price> <ns6:PricingInfo PricingRecordRefIDs="26" PricingType="TSM" RFIC="D" RFISC="996"> <ns6:AssociatedPNRElement Tattoo="1" Type="PT"></ns6:AssociatedPNRElement> <ns6:AssociatedPNRElement Tattoo="2" Type="ST"></ns6:AssociatedPNRElement> </ns6:PricingInfo> </PricingRecord> <PricingRecord> <ns6:PaxName FirstName="Titoms" LastName="Reinihon"></ns6:PaxName> <ns6:Price Amount="32031" CurrencyCode="EUR" DecimalPlaces="2" Type="Fare"></ns6:Price> <ns6:Price Amount="0" CurrencyCode="USD" DecimalPlaces="2" Type="Total"></ns6:Price> <ns6:Price Amount="34642" CurrencyCode="USD" DecimalPlaces="2" Type="Equivalent"></ns6:Price> <ns6:Price Amount="32031" CurrencyCode="EUR" DecimalPlaces="2" Type="ExchangeValue"></ns6:Price> <ns6:PricingInfo PricingRecordRefIDs="29" PricingType="TSM" RFIC="D" RFISC="996"> <ns6:AssociatedPNRElement Tattoo="3" Type="PT"></ns6:AssociatedPNRElement> <ns6:AssociatedPNRElement Tattoo="2" Type="ST"></ns6:AssociatedPNRElement> </ns6:PricingInfo> </PricingRecord> <PricingRecord> <ns6:PaxName FirstName="Yatashimrs" LastName="Reinihon"></ns6:PaxName> <ns6:Price Amount="32031" CurrencyCode="EUR" DecimalPlaces="2" Type="Fare"></ns6:Price> <ns6:Price Amount="0" CurrencyCode="USD" DecimalPlaces="2" Type="Total"></ns6:Price> <ns6:Price Amount="34642" CurrencyCode="USD" DecimalPlaces="2" Type="Equivalent"></ns6:Price> <ns6:Price Amount="32031" CurrencyCode="EUR" DecimalPlaces="2" Type="ExchangeValue"></ns6:Price> <ns6:PricingInfo PricingRecordRefIDs="32" PricingType="TSM" RFIC="D" RFISC="996"> <ns6:AssociatedPNRElement Tattoo="2" Type="PT"></ns6:AssociatedPNRElement> <ns6:AssociatedPNRElement Tattoo="2" Type="ST"></ns6:AssociatedPNRElement> </ns6:PricingInfo> </PricingRecord> </PricingRecords> </PricingDetails> </ItineraryRepricing> </Repricing> </Success> </AMA\_TicketRebookAndRepricePNRRS>

## 5.6.3 Possible Errors

See "Error Messages" section.

* * *

## 5.7 Operation: Exchange of itinerary with Fare Discount

Ticket\_RebookAndRepricePNR allows to exchange the segments in a PNR and reprice the entire itinerary against the old ticket, while also providing in input, through the Rebooking node, a Fare Discount to apply when rebooking the PNR.

The Fare Discount can be passenger and segment associated.

## 5.7.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_TicketRebookAndRepricePNRRQ Actions="COMMIT" Version="1.000"> <Reservation BookingIdentifier="TRWIZA"></Reservation> <Commit></Commit> <Rebooking> <Cancellation> <rtl:Ref TattooType="ST" TattooValue="1"></rtl:Ref> </Cancellation> <Bounds> <Bound NIP="1"> <Segment RequestID="SEG2" bkgClass="Y"> <rtl:serviceProvider code="JL"></rtl:serviceProvider> <rtl:identifier>1416</rtl:identifier> <rtl:start dateTime="2020-09-17T00:00:00"> <rtl:locationCode>HND</rtl:locationCode> </rtl:start> <rtl:end dateTime="2020-09-17T00:00:00"> <rtl:locationCode>ITM</rtl:locationCode> </rtl:end> </Segment> </Bound> </Bounds> <FareDiscounts> <FareDiscount> <far:Discount Code="AEB"></far:Discount> <Associations> <rtl:Ref TattooType="PT" TattooValue="1"></rtl:Ref> <rtl:Ref RequestID="SEG2"></rtl:Ref> </Associations> </FareDiscount> </FareDiscounts> </Rebooking> <Repricing> <ItineraryPricingOptions> <ItineraryPricingOption> <pri:NegotiatedFare Type="RU"> </pri:NegotiatedFare> </ItineraryPricingOption> </ItineraryPricingOptions> </Repricing> </AMA\_TicketRebookAndRepricePNRRQ>

## 5.7.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_TicketRebookAndRepricePNRRS Version="1.000"> <Success> <Warnings> <ns2:Warning Code="34666" Language="EN" ShortText="EOT HAS BEEN PROCESSED DURING THIS TRANSACTION" Type="I">EOT HAS BEEN PROCESSED DURING THIS TRANSACTION</ns2:Warning> </Warnings> <Reservation BookingIdentifier="TRWIZA"></Reservation> <Commit EnvelopeNumber="3" ReceivedFrom="DEFAULT RF"></Commit> <Rebooking> <CancelledElements> <ns2:Ref TattooType="ST" TattooValue="1"></ns2:Ref> </CancelledElements> <Bounds> <Bound NIP="1"> <Segment LineNumber="2" RequestID="SEG2" TattooType="ST" TattooValue="2" bkgClass="Y" isOpenSegment="false" segmentStatus="HK"> <ns2:serviceProvider code="JL" name="Japan Airlines"></ns2:serviceProvider> <ns2:identifier>1416</ns2:identifier> <ns2:start dateTime="2020-09-17T04:30:00"> <ns2:locationCode>HND</ns2:locationCode> </ns2:start> <ns2:end dateTime="2020-09-17T05:30:00"> <ns2:locationCode>ITM</ns2:locationCode> </ns2:end> </Segment> </Bound> </Bounds> <SpecialKeywords> <SpecialKeyword LineNumber="5" NIP="1" TattooType="OT" TattooValue="18" Text="AUTOMATIC AGE RESTRICTION" code="NOEX" serviceProviderCode="JL" status="HK"> <ns2:Associations> <ns2:Ref LineNumber="1" TattooType="PT" TattooValue="1"></ns2:Ref> </ns2:Associations> </SpecialKeyword> </SpecialKeywords> <FareDiscounts> <FareDiscount TattooType="OT" TattooValue="19"> <ns4:Discount Code="AEB"></ns4:Discount> <Associations> <ns2:Ref TattooType="ST" TattooValue="2"></ns2:Ref> <ns2:Ref TattooType="PT" TattooValue="1"></ns2:Ref> </Associations> </FareDiscount> </FareDiscounts> </Rebooking> <Repricing> <ItineraryRepricing> <PricingDetails> <PricingRecords> <PricingRecord> <ns6:PaxName FirstName="Yoshida" LastName="Takaido"></ns6:PaxName> <ns6:Price Amount="25700" CurrencyCode="JPY" DecimalPlaces="0" Type="NewBase"></ns6:Price> <ns6:Price Amount="25700" CurrencyCode="JPY" DecimalPlaces="0" Type="OldBase"></ns6:Price> <ns6:Price Amount="0" CurrencyCode="JPY" DecimalPlaces="0" Type="ResidualValue"></ns6:Price> <ns6:Price Amount="26250" CurrencyCode="JPY" DecimalPlaces="0" Type="NewTotalFare"></ns6:Price> <ns6:Price Amount="550" CurrencyCode="JPY" DecimalPlaces="0" Type="NewTax"></ns6:Price> <ns6:Price Amount="0" CurrencyCode="JPY" DecimalPlaces="0" Type="TotalAdditionalCollection"></ns6:Price> <ns6:Price Amount="550" CurrencyCode="JPY" DecimalPlaces="0" Type="OldTax"></ns6:Price> <ns6:Price Amount="0" CurrencyCode="JPY" DecimalPlaces="0" Type="BalanceBase"></ns6:Price> <ns6:Price Amount="0" CurrencyCode="JPY" DecimalPlaces="0" Type="GrandTotal"></ns6:Price> <ns6:Price Amount="0" CurrencyCode="JPY" DecimalPlaces="0" Type="BalanceTax"></ns6:Price> <ns6:Price Amount="0" CurrencyCode="JPY" DecimalPlaces="0" Type="TicketDifference"></ns6:Price> <ns6:Price Amount="0" CurrencyCode="JPY" DecimalPlaces="0" Type="Penalty"></ns6:Price> <ns6:Price Amount="26250" CurrencyCode="JPY" DecimalPlaces="0" Type="OldTotalFare"></ns6:Price> <ns6:PricingInfo PricingType="TQR"> <ns6:AssociatedPNRElement Tattoo="1" Type="PT"></ns6:AssociatedPNRElement> <ns6:AssociatedPNRElement Tattoo="2" Type="ST"></ns6:AssociatedPNRElement> </ns6:PricingInfo> </PricingRecord> <PricingRecord> <ns6:PaxName FirstName="Yoshida" LastName="Takaido"></ns6:PaxName> <ns6:Price Amount="25700" CurrencyCode="JPY" DecimalPlaces="0" Type="NewBase"></ns6:Price> <ns6:Price Amount="0" CurrencyCode="JPY" DecimalPlaces="0" Type="GrandTotal"></ns6:Price> <ns6:Price Amount="0" CurrencyCode="JPY" DecimalPlaces="0" Type="Total"></ns6:Price> <ns6:Tax Amount="290" CurrencyCode="JPY" DecimalPlaces="0" Indicator="PD" IsoCode="HJ" NatureCode="DE"></ns6:Tax> <ns6:Tax Amount="260" CurrencyCode="JPY" DecimalPlaces="0" Indicator="PD" IsoCode="HJ" NatureCode="LO"></ns6:Tax> <ns6:PricingInfo FareCalc="TYO JL OSA25700YLAOWZO JPY25700END" PricingRecordRefIDs="2" PricingType="TST"> <ns6:AssociatedPNRElement Tattoo="1" Type="PT"></ns6:AssociatedPNRElement> <ns6:AssociatedPNRElement Tattoo="2" Type="ST"></ns6:AssociatedPNRElement> </ns6:PricingInfo> <ns6:FareComponent Destination="OSA" Number="1" Origin="TYO" Type="FC"> <ns6:AssociatedPNRElement Tattoo="2" Type="ST"></ns6:AssociatedPNRElement> <ns6:FareBasis FareBasisCode="YLAOWZO"></ns6:FareBasis> <ns6:FareFamily Name="OW" Owner="JL"></ns6:FareFamily> </ns6:FareComponent> <ns6:Coupon SegmentTattoo="2"> <ns6:FareBasis FareBasisCode="YLAOWZO"></ns6:FareBasis> <ns6:FreeBagAllowance Type="W" Unit="K"></ns6:FreeBagAllowance> <ns6:DateValidity Type="NVA">2021-05-14</ns6:DateValidity> </ns6:Coupon> </PricingRecord> </PricingRecords> </PricingDetails> </ItineraryRepricing> </Repricing> </Success> </AMA\_TicketRebookAndRepricePNRRS>

## 5.7.3 Possible Errors

See "Error Messages" section.

* * *

## 5.8 Operation: Exchange of itinerary with Fare Family override

Ticket\_RebookAndRepricePNR allows to exchange the segments in a PNR and reprice the entire itinerary against the old ticket, while also providing in input a pricing option to request Fare Family override. Optionally, it is possible to specify the segments on which this Fare Family is expected.

## 5.8.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_TicketRebookAndRepricePNRRQ Actions="COMMIT" Version="1.000"> <Reservation BookingIdentifier="TYU5X4"></Reservation> <Commit></Commit> <Rebooking> <Cancellation> <rtl:Ref TattooType="ST" TattooValue="1"></rtl:Ref> </Cancellation> <Bounds> <Bound NIP="3"> <Segment RequestID="SEG2" bkgClass="Y"> <rtl:serviceProvider code="AF"></rtl:serviceProvider> <rtl:identifier>6204</rtl:identifier> <rtl:start dateTime="2020-09-19T00:00:00"> <rtl:locationCode>ORY</rtl:locationCode> </rtl:start> <rtl:end dateTime="2020-09-19T00:00:00"> <rtl:locationCode>NCE</rtl:locationCode> </rtl:end> </Segment> </Bound> </Bounds> </Rebooking> <Repricing> <ItineraryPricingOptions> <ItineraryPricingOption> <pri:TicketingInfo> <pri:FareFamily Name="ECOFLEX" Owner="FF"></pri:FareFamily> </pri:TicketingInfo> <far\_int:AssociatedPNRElement Tattoo="1" Type="PT"></far\_int:AssociatedPNRElement> </ItineraryPricingOption> </ItineraryPricingOptions> </Repricing> </AMA\_TicketRebookAndRepricePNRRQ>

## 5.8.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_TicketRebookAndRepricePNRRS Version="1.000"> <Success> <Warnings> <ns2:Warning Code="34666" Language="EN" ShortText="EOT HAS BEEN PROCESSED DURING THIS TRANSACTION" Type="I">EOT HAS BEEN PROCESSED DURING THIS TRANSACTION</ns2:Warning> </Warnings> <Reservation BookingIdentifier="TYU5X4"></Reservation> <Commit EnvelopeNumber="4" ReceivedFrom="DEFAULT RF"></Commit> <Rebooking> <CancelledElements> <ns2:Ref TattooType="ST" TattooValue="1"></ns2:Ref> </CancelledElements> <Bounds> <Bound NIP="3"> <Segment LineNumber="4" RequestID="SEG2" TattooType="ST" TattooValue="2" bkgClass="Y" isOpenSegment="false" segmentStatus="HK"> <ns2:serviceProvider code="AF" name="Air France"></ns2:serviceProvider> <ns2:identifier>6204</ns2:identifier> <ns2:start dateTime="2020-09-19T08:20:00"> <ns2:locationCode>ORY</ns2:locationCode> </ns2:start> <ns2:end dateTime="2020-09-19T09:45:00"> <ns2:locationCode>NCE</ns2:locationCode> </ns2:end> </Segment> </Bound> </Bounds> </Rebooking> <Repricing> <ItineraryRepricing> <PricingDetails> <PricingRecords> <PricingRecord> <ns6:PaxName FirstName="Kukoukuumr" LastName="Reinihon"></ns6:PaxName> <ns6:Price Amount="38700" CurrencyCode="EUR" DecimalPlaces="2" Type="NewBase"></ns6:Price> <ns6:Price Amount="70600" CurrencyCode="EUR" DecimalPlaces="2" Type="OldBase"></ns6:Price> <ns6:Price Amount="32031" CurrencyCode="EUR" DecimalPlaces="2" Type="ResidualValue"></ns6:Price> <ns6:Price Amount="41991" CurrencyCode="EUR" DecimalPlaces="2" Type="NewTotalFare"></ns6:Price> <ns6:Price Amount="3291" CurrencyCode="EUR" DecimalPlaces="2" Type="NewTax"></ns6:Price> <ns6:Price Amount="0" CurrencyCode="EUR" DecimalPlaces="2" Type="TotalAdditionalCollection"></ns6:Price> <ns6:Price Amount="3422" CurrencyCode="EUR" DecimalPlaces="2" Type="OldTax"></ns6:Price> <ns6:Price Amount="-31900" CurrencyCode="EUR" DecimalPlaces="2" Type="BalanceBase"></ns6:Price> <ns6:Price Amount="-32031" CurrencyCode="EUR" DecimalPlaces="2" Type="GrandTotal"></ns6:Price> <ns6:Price Amount="-131" CurrencyCode="EUR" DecimalPlaces="2" Type="BalanceTax"></ns6:Price> <ns6:Price Amount="-32031" CurrencyCode="EUR" DecimalPlaces="2" Type="TicketDifference"></ns6:Price> <ns6:Price Amount="0" CurrencyCode="EUR" DecimalPlaces="2" Type="Penalty"></ns6:Price> <ns6:Price Amount="74022" CurrencyCode="EUR" DecimalPlaces="2" Type="OldTotalFare"></ns6:Price> <ns6:PricingInfo PricingType="TQR"> <ns6:AssociatedPNRElement Tattoo="1" Type="PT"></ns6:AssociatedPNRElement> <ns6:AssociatedPNRElement Tattoo="2" Type="ST"></ns6:AssociatedPNRElement> </ns6:PricingInfo> </PricingRecord> <PricingRecord> <ns6:PaxName FirstName="Kukoukuumr" LastName="Reinihon"></ns6:PaxName> <ns6:Price Amount="38700" CurrencyCode="EUR" DecimalPlaces="2" Type="NewBase"></ns6:Price> <ns6:Price Amount="3291" CurrencyCode="EUR" DecimalPlaces="2" Type="TotalRefundableTaxes"></ns6:Price> <ns6:Price Amount="0" CurrencyCode="EUR" DecimalPlaces="2" Type="GrandTotal"></ns6:Price> <ns6:Price Amount="0" CurrencyCode="EUR" DecimalPlaces="2" Type="Total"></ns6:Price> <ns6:Tax Amount="463" CurrencyCode="EUR" DecimalPlaces="2" Indicator="PD" IsoCode="FR" NatureCode="SE"></ns6:Tax> <ns6:Tax Amount="1170" CurrencyCode="EUR" DecimalPlaces="2" Indicator="PD" IsoCode="FR" NatureCode="TI"></ns6:Tax> <ns6:Tax Amount="113" CurrencyCode="EUR" DecimalPlaces="2" Indicator="PD" IsoCode="IZ" NatureCode="EB"></ns6:Tax> <ns6:Tax Amount="150" CurrencyCode="EUR" DecimalPlaces="2" Indicator="PD" IsoCode="O4" NatureCode="VC"></ns6:Tax> <ns6:Tax Amount="1095" CurrencyCode="EUR" DecimalPlaces="2" Indicator="PD" IsoCode="QW" NatureCode="LO"></ns6:Tax> <ns6:Tax Amount="300" CurrencyCode="EUR" DecimalPlaces="2" Indicator="PD" IsoCode="UI" NatureCode="VZ"></ns6:Tax> <ns6:Tax Amount="119" CurrencyCode="EUR" DecimalPlaces="2" Indicator="RFD" IsoCode="QW" NatureCode="LO"></ns6:Tax> <ns6:Tax Amount="12" CurrencyCode="EUR" DecimalPlaces="2" Indicator="RFD" IsoCode="UI" NatureCode="VZ"></ns6:Tax> <ns6:PricingInfo FareCalc="PAR AF NCE387.00EUR387.00END" PricingRecordRefIDs="2" PricingType="TST"> <ns6:AssociatedPNRElement Tattoo="1" Type="PT"></ns6:AssociatedPNRElement> <ns6:AssociatedPNRElement Tattoo="2" Type="ST"></ns6:AssociatedPNRElement> </ns6:PricingInfo> <ns6:FareComponent Destination="NCE" Number="1" Origin="PAR" Type="FC"> <ns6:AssociatedPNRElement Tattoo="2" Type="ST"></ns6:AssociatedPNRElement> <ns6:FareBasis FareBasisCode="YS50BEHX"></ns6:FareBasis> <ns6:FareFamily Name="FLEX" Owner="AF"></ns6:FareFamily> </ns6:FareComponent> <ns6:Coupon SegmentTattoo="2"> <ns6:FareBasis FareBasisCode="YS50BEHX"></ns6:FareBasis> <ns6:FreeBagAllowance Measure="1" Type="N"></ns6:FreeBagAllowance> <ns6:DateValidity Type="NVA">2021-09-19</ns6:DateValidity> </ns6:Coupon> </PricingRecord> <PricingRecord> <ns6:PaxName FirstName="Titoms" LastName="Reinihon"></ns6:PaxName> <ns6:Price Amount="38700" CurrencyCode="EUR" DecimalPlaces="2" Type="NewBase"></ns6:Price> <ns6:Price Amount="70600" CurrencyCode="EUR" DecimalPlaces="2" Type="OldBase"></ns6:Price> <ns6:Price Amount="32031" CurrencyCode="EUR" DecimalPlaces="2" Type="ResidualValue"></ns6:Price> <ns6:Price Amount="41991" CurrencyCode="EUR" DecimalPlaces="2" Type="NewTotalFare"></ns6:Price> <ns6:Price Amount="3291" CurrencyCode="EUR" DecimalPlaces="2" Type="NewTax"></ns6:Price> <ns6:Price Amount="0" CurrencyCode="EUR" DecimalPlaces="2" Type="TotalAdditionalCollection"></ns6:Price> <ns6:Price Amount="3422" CurrencyCode="EUR" DecimalPlaces="2" Type="OldTax"></ns6:Price> <ns6:Price Amount="-31900" CurrencyCode="EUR" DecimalPlaces="2" Type="BalanceBase"></ns6:Price> <ns6:Price Amount="-32031" CurrencyCode="EUR" DecimalPlaces="2" Type="GrandTotal"></ns6:Price> <ns6:Price Amount="-131" CurrencyCode="EUR" DecimalPlaces="2" Type="BalanceTax"></ns6:Price> <ns6:Price Amount="-32031" CurrencyCode="EUR" DecimalPlaces="2" Type="TicketDifference"></ns6:Price> <ns6:Price Amount="0" CurrencyCode="EUR" DecimalPlaces="2" Type="Penalty"></ns6:Price> <ns6:Price Amount="74022" CurrencyCode="EUR" DecimalPlaces="2" Type="OldTotalFare"></ns6:Price> <ns6:PricingInfo PricingType="TQR"> <ns6:AssociatedPNRElement Tattoo="3" Type="PT"></ns6:AssociatedPNRElement> <ns6:AssociatedPNRElement Tattoo="2" Type="ST"></ns6:AssociatedPNRElement> </ns6:PricingInfo> </PricingRecord> <PricingRecord> <ns6:PaxName FirstName="Titoms" LastName="Reinihon"></ns6:PaxName> <ns6:Price Amount="38700" CurrencyCode="EUR" DecimalPlaces="2" Type="NewBase"></ns6:Price> <ns6:Price Amount="3291" CurrencyCode="EUR" DecimalPlaces="2" Type="TotalRefundableTaxes"></ns6:Price> <ns6:Price Amount="0" CurrencyCode="EUR" DecimalPlaces="2" Type="GrandTotal"></ns6:Price> <ns6:Price Amount="0" CurrencyCode="EUR" DecimalPlaces="2" Type="Total"></ns6:Price> <ns6:Tax Amount="463" CurrencyCode="EUR" DecimalPlaces="2" Indicator="PD" IsoCode="FR" NatureCode="SE"></ns6:Tax> <ns6:Tax Amount="1170" CurrencyCode="EUR" DecimalPlaces="2" Indicator="PD" IsoCode="FR" NatureCode="TI"></ns6:Tax> <ns6:Tax Amount="113" CurrencyCode="EUR" DecimalPlaces="2" Indicator="PD" IsoCode="IZ" NatureCode="EB"></ns6:Tax> <ns6:Tax Amount="150" CurrencyCode="EUR" DecimalPlaces="2" Indicator="PD" IsoCode="O4" NatureCode="VC"></ns6:Tax> <ns6:Tax Amount="1095" CurrencyCode="EUR" DecimalPlaces="2" Indicator="PD" IsoCode="QW" NatureCode="LO"></ns6:Tax> <ns6:Tax Amount="300" CurrencyCode="EUR" DecimalPlaces="2" Indicator="PD" IsoCode="UI" NatureCode="VZ"></ns6:Tax> <ns6:Tax Amount="119" CurrencyCode="EUR" DecimalPlaces="2" Indicator="RFD" IsoCode="QW" NatureCode="LO"></ns6:Tax> <ns6:Tax Amount="12" CurrencyCode="EUR" DecimalPlaces="2" Indicator="RFD" IsoCode="UI" NatureCode="VZ"></ns6:Tax> <ns6:PricingInfo FareCalc="PAR AF NCE387.00EUR387.00END" PricingRecordRefIDs="3" PricingType="TST"> <ns6:AssociatedPNRElement Tattoo="3" Type="PT"></ns6:AssociatedPNRElement> <ns6:AssociatedPNRElement Tattoo="2" Type="ST"></ns6:AssociatedPNRElement> </ns6:PricingInfo> <ns6:FareComponent Destination="NCE" Number="1" Origin="PAR" Type="FC"> <ns6:AssociatedPNRElement Tattoo="2" Type="ST"></ns6:AssociatedPNRElement> <ns6:FareBasis FareBasisCode="YS50BEHX"></ns6:FareBasis> <ns6:FareFamily Name="FLEX" Owner="AF"></ns6:FareFamily> </ns6:FareComponent> <ns6:Coupon SegmentTattoo="2"> <ns6:FareBasis FareBasisCode="YS50BEHX"></ns6:FareBasis> <ns6:FreeBagAllowance Measure="1" Type="N"></ns6:FreeBagAllowance> <ns6:DateValidity Type="NVA">2021-09-19</ns6:DateValidity> </ns6:Coupon> </PricingRecord> <PricingRecord> <ns6:PaxName FirstName="Yatashimrs" LastName="Reinihon"></ns6:PaxName> <ns6:Price Amount="38700" CurrencyCode="EUR" DecimalPlaces="2" Type="NewBase"></ns6:Price> <ns6:Price Amount="70600" CurrencyCode="EUR" DecimalPlaces="2" Type="OldBase"></ns6:Price> <ns6:Price Amount="32031" CurrencyCode="EUR" DecimalPlaces="2" Type="ResidualValue"></ns6:Price> <ns6:Price Amount="41991" CurrencyCode="EUR" DecimalPlaces="2" Type="NewTotalFare"></ns6:Price> <ns6:Price Amount="3291" CurrencyCode="EUR" DecimalPlaces="2" Type="NewTax"></ns6:Price> <ns6:Price Amount="0" CurrencyCode="EUR" DecimalPlaces="2" Type="TotalAdditionalCollection"></ns6:Price> <ns6:Price Amount="3422" CurrencyCode="EUR" DecimalPlaces="2" Type="OldTax"></ns6:Price> <ns6:Price Amount="-31900" CurrencyCode="EUR" DecimalPlaces="2" Type="BalanceBase"></ns6:Price> <ns6:Price Amount="-32031" CurrencyCode="EUR" DecimalPlaces="2" Type="GrandTotal"></ns6:Price> <ns6:Price Amount="-131" CurrencyCode="EUR" DecimalPlaces="2" Type="BalanceTax"></ns6:Price> <ns6:Price Amount="-32031" CurrencyCode="EUR" DecimalPlaces="2" Type="TicketDifference"></ns6:Price> <ns6:Price Amount="0" CurrencyCode="EUR" DecimalPlaces="2" Type="Penalty"></ns6:Price> <ns6:Price Amount="74022" CurrencyCode="EUR" DecimalPlaces="2" Type="OldTotalFare"></ns6:Price> <ns6:PricingInfo PricingType="TQR"> <ns6:AssociatedPNRElement Tattoo="2" Type="PT"></ns6:AssociatedPNRElement> <ns6:AssociatedPNRElement Tattoo="2" Type="ST"></ns6:AssociatedPNRElement> </ns6:PricingInfo> </PricingRecord> <PricingRecord> <ns6:PaxName FirstName="Yatashimrs" LastName="Reinihon"></ns6:PaxName> <ns6:Price Amount="38700" CurrencyCode="EUR" DecimalPlaces="2" Type="NewBase"></ns6:Price> <ns6:Price Amount="3291" CurrencyCode="EUR" DecimalPlaces="2" Type="TotalRefundableTaxes"></ns6:Price> <ns6:Price Amount="0" CurrencyCode="EUR" DecimalPlaces="2" Type="GrandTotal"></ns6:Price> <ns6:Price Amount="0" CurrencyCode="EUR" DecimalPlaces="2" Type="Total"></ns6:Price> <ns6:Tax Amount="463" CurrencyCode="EUR" DecimalPlaces="2" Indicator="PD" IsoCode="FR" NatureCode="SE"></ns6:Tax> <ns6:Tax Amount="1170" CurrencyCode="EUR" DecimalPlaces="2" Indicator="PD" IsoCode="FR" NatureCode="TI"></ns6:Tax> <ns6:Tax Amount="113" CurrencyCode="EUR" DecimalPlaces="2" Indicator="PD" IsoCode="IZ" NatureCode="EB"></ns6:Tax> <ns6:Tax Amount="150" CurrencyCode="EUR" DecimalPlaces="2" Indicator="PD" IsoCode="O4" NatureCode="VC"></ns6:Tax> <ns6:Tax Amount="1095" CurrencyCode="EUR" DecimalPlaces="2" Indicator="PD" IsoCode="QW" NatureCode="LO"></ns6:Tax> <ns6:Tax Amount="300" CurrencyCode="EUR" DecimalPlaces="2" Indicator="PD" IsoCode="UI" NatureCode="VZ"></ns6:Tax> <ns6:Tax Amount="119" CurrencyCode="EUR" DecimalPlaces="2" Indicator="RFD" IsoCode="QW" NatureCode="LO"></ns6:Tax> <ns6:Tax Amount="12" CurrencyCode="EUR" DecimalPlaces="2" Indicator="RFD" IsoCode="UI" NatureCode="VZ"></ns6:Tax> <ns6:PricingInfo FareCalc="PAR AF NCE387.00EUR387.00END" PricingRecordRefIDs="4" PricingType="TST"> <ns6:AssociatedPNRElement Tattoo="2" Type="PT"></ns6:AssociatedPNRElement> <ns6:AssociatedPNRElement Tattoo="2" Type="ST"></ns6:AssociatedPNRElement> </ns6:PricingInfo> <ns6:FareComponent Destination="NCE" Number="1" Origin="PAR" Type="FC"> <ns6:AssociatedPNRElement Tattoo="2" Type="ST"></ns6:AssociatedPNRElement> <ns6:FareBasis FareBasisCode="YS50BEHX"></ns6:FareBasis> <ns6:FareFamily Name="FLEX" Owner="AF"></ns6:FareFamily> </ns6:FareComponent> <ns6:Coupon SegmentTattoo="2"> <ns6:FareBasis FareBasisCode="YS50BEHX"></ns6:FareBasis> <ns6:FreeBagAllowance Measure="1" Type="N"></ns6:FreeBagAllowance> <ns6:DateValidity Type="NVA">2021-09-19</ns6:DateValidity> </ns6:Coupon> </PricingRecord> <PricingRecord> <ns6:PaxName FirstName="Kukoukuumr" LastName="Reinihon"></ns6:PaxName> <ns6:Price Amount="32031" CurrencyCode="EUR" DecimalPlaces="2" Type="Fare"></ns6:Price> <ns6:Price Amount="0" CurrencyCode="EUR" DecimalPlaces="2" Type="Total"></ns6:Price> <ns6:Price Amount="32031" CurrencyCode="EUR" DecimalPlaces="2" Type="ExchangeValue"></ns6:Price> <ns6:PricingInfo PricingRecordRefIDs="26" PricingType="TSM" RFIC="D" RFISC="996"> <ns6:AssociatedPNRElement Tattoo="1" Type="PT"></ns6:AssociatedPNRElement> <ns6:AssociatedPNRElement Tattoo="2" Type="ST"></ns6:AssociatedPNRElement> </ns6:PricingInfo> </PricingRecord> <PricingRecord> <ns6:PaxName FirstName="Titoms" LastName="Reinihon"></ns6:PaxName> <ns6:Price Amount="32031" CurrencyCode="EUR" DecimalPlaces="2" Type="Fare"></ns6:Price> <ns6:Price Amount="0" CurrencyCode="EUR" DecimalPlaces="2" Type="Total"></ns6:Price> <ns6:Price Amount="32031" CurrencyCode="EUR" DecimalPlaces="2" Type="ExchangeValue"></ns6:Price> <ns6:PricingInfo PricingRecordRefIDs="29" PricingType="TSM" RFIC="D" RFISC="996"> <ns6:AssociatedPNRElement Tattoo="3" Type="PT"></ns6:AssociatedPNRElement> <ns6:AssociatedPNRElement Tattoo="2" Type="ST"></ns6:AssociatedPNRElement> </ns6:PricingInfo> </PricingRecord> <PricingRecord> <ns6:PaxName FirstName="Yatashimrs" LastName="Reinihon"></ns6:PaxName> <ns6:Price Amount="32031" CurrencyCode="EUR" DecimalPlaces="2" Type="Fare"></ns6:Price> <ns6:Price Amount="0" CurrencyCode="EUR" DecimalPlaces="2" Type="Total"></ns6:Price> <ns6:Price Amount="32031" CurrencyCode="EUR" DecimalPlaces="2" Type="ExchangeValue"></ns6:Price> <ns6:PricingInfo PricingRecordRefIDs="32" PricingType="TSM" RFIC="D" RFISC="996"> <ns6:AssociatedPNRElement Tattoo="2" Type="PT"></ns6:AssociatedPNRElement> <ns6:AssociatedPNRElement Tattoo="2" Type="ST"></ns6:AssociatedPNRElement> </ns6:PricingInfo> </PricingRecord> </PricingRecords> </PricingDetails> </ItineraryRepricing> </Repricing> </Success> </AMA\_TicketRebookAndRepricePNRRS>

## 5.8.3 Possible Errors

See "Error Messages" section.

* * *

## 5.9 Operation: Exchange of itinerary with Frequent Flyer and SK element

Ticket\_RebookAndRepricePNR allows to exchange the segments in a PNR, reprice the entire itinerary against the old ticket, and, at the same time, reassociate the frequent flyer and the SK elements. Shareholder coupons are automatically reassociated from the old ticket.

## 5.9.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_TicketRebookAndRepricePNRRQ Actions="COMMIT" Version="1.000" xsi:schemaLocation="http://xml.amadeus.com/2010/06/Ticket\_RebookAndRepricePNR\_v1 AMA\_TicketRebookAndRepricePNRRQ.xsd"> <Reservation BookingIdentifier="RECLOC"></Reservation> <Rebooking> <Cancellation> <Retailing:Ref TattooType="ST" TattooValue="1"></Retailing:Ref> <Retailing:Ref TattooType="ST" TattooValue="2"></Retailing:Ref> <Retailing:Ref TattooType="ST" TattooValue="3"></Retailing:Ref> <Retailing:Ref TattooType="OT" TattooValue="6"></Retailing:Ref> <Retailing:Ref TattooType="OT" TattooValue="7"></Retailing:Ref> <Retailing:Ref TattooType="OT" TattooValue="8"></Retailing:Ref> </Cancellation> <Bounds> <Bound ActionCode="NN" NIP="3"> <Segment RequestID="SEG1" bkgClass="J" isOpenSegment="false"> <Retailing:serviceProvider code="JC"></Retailing:serviceProvider> <Retailing:identifier>2332</Retailing:identifier> <Retailing:start dateTime="2015-02-20T09:00:00"> <Retailing:locationCode>TJH</Retailing:locationCode> </Retailing:start> <Retailing:end dateTime="2015-02-20T10:00:00"> <Retailing:locationCode>ITM</Retailing:locationCode> </Retailing:end> </Segment> <Segment RequestID="SEG2" bkgClass="J" isOpenSegment="false"> <Retailing:serviceProvider code="JL"></Retailing:serviceProvider> <Retailing:identifier>2083</Retailing:identifier> <Retailing:start dateTime="2015-02-20T11:00:00"> <Retailing:locationCode>ITM</Retailing:locationCode> </Retailing:start> <Retailing:end dateTime="2015-02-20T12:00:00"> <Retailing:locationCode>OKA</Retailing:locationCode> </Retailing:end> </Segment> </Bound> <Bound ActionCode="NN" NIP="3"> <Segment RequestID="SEG3" bkgClass="J" isOpenSegment="false"> <Retailing:serviceProvider code="JL"></Retailing:serviceProvider> <Retailing:identifier>2084</Retailing:identifier> <Retailing:start dateTime="2015-09-26T20:00:00"> <Retailing:locationCode>OKA</Retailing:locationCode> </Retailing:start> <Retailing:end dateTime="2015-09-26T22:00:00"> <Retailing:locationCode>ITM</Retailing:locationCode> </Retailing:end> </Segment> </Bound> </Bounds> <FrequentFlyers> <FrequentFlyer> <FrequentFlyerCard CardNumber="204301890" CompanyCode="JL"> <Retailing:Owner FirstName="NIKKO" LastName="TAROU" Title="MR"></Retailing:Owner> </FrequentFlyerCard> <MileageRequests> <MileageRequest RequestID="MIL1"> <Retailing:Associations> <Retailing:Ref RequestID="PAX1"></Retailing:Ref> </Retailing:Associations> </MileageRequest> </MileageRequests> </FrequentFlyer> </FrequentFlyers> <SpecialServiceRequests> <SpecialServiceRequest RequestID="SSR1" code="BLND"> <Retailing:Associations> <Retailing:Ref TattooType="PT" TattooValue="1"></Retailing:Ref> <Retailing:Ref RequestID="SEG1"></Retailing:Ref> <Retailing:Ref RequestID="SEG2"></Retailing:Ref> <Retailing:Ref RequestID="SEG3"></Retailing:Ref> </Retailing:Associations> </SpecialServiceRequest> </SpecialServiceRequests> </Rebooking> <Repricing> <ItineraryPricingOptions> <ItineraryPricingOption> <pri:TicketingInfo Number="1315297294448"></pri:TicketingInfo> <pri:Booking Operation="SEL"></pri:Booking> <far\_int:AssociatedPNRElement Tattoo="1" Type="PT"></far\_int:AssociatedPNRElement> </ItineraryPricingOption> <ItineraryPricingOption> <pri:TicketingInfo Number="1315297294449"></pri:TicketingInfo> <pri:Booking Operation="SEL"></pri:Booking> <far\_int:AssociatedPNRElement Tattoo="2" Type="PT"></far\_int:AssociatedPNRElement> </ItineraryPricingOption> <ItineraryPricingOption> <pri:TicketingInfo Number="1315297294450"></pri:TicketingInfo> <pri:Booking Operation="SEL"></pri:Booking> <far\_int:AssociatedPNRElement Tattoo="3" Type="PT"></far\_int:AssociatedPNRElement> </ItineraryPricingOption> <ItineraryPricingOption> <pri:NegotiatedFare Type="RU"></pri:NegotiatedFare> </ItineraryPricingOption> </ItineraryPricingOptions> </Repricing> </AMA\_TicketRebookAndRepricePNRRQ>

## 5.9.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_TicketRebookAndRepricePNRRS Version="1.000" xsi:schemaLocation="http://xml.amadeus.com/2010/06/Ticket\_RebookAndRepricePNR\_v1 AMA\_TicketRebookAndRepricePNRRS.xsd"> <Success> <Warnings> <Retailing:Warning Code="34666" ShortText="EOT HAS BEEN PROCESSED DURING THIS TRANSACTION" Type="I"> EOT HAS BEEN PROCESSED DURING THIS TRANSACTION </Retailing:Warning> </Warnings> <Reservation BookingIdentifier="RECLOC"></Reservation> <Rebooking> <CancelledElements> <Retailing:Ref TattooType="ST" TattooValue="1"></Retailing:Ref> <Retailing:Ref TattooType="ST" TattooValue="2"></Retailing:Ref> <Retailing:Ref TattooType="ST" TattooValue="3"></Retailing:Ref> <Retailing:Ref TattooType="OT" TattooValue="6"></Retailing:Ref> <Retailing:Ref TattooType="OT" TattooValue="7"></Retailing:Ref> <Retailing:Ref TattooType="OT" TattooValue="8"></Retailing:Ref> </CancelledElements> <FrequentFlyers> <FrequentFlyer> <FrequentFlyerCard CardNumber="204301890" CompanyCode="JC"> <Retailing:Owner FirstName="NIKKO" LastName="TAROU" Title="MR"></Retailing:Owner> <Retailing:MembershipInformation> <Retailing:LevelInformation PriorityCode="2" TierDescription="Gold member" TierId="AIRLINE" TierLevel="GLD"></Retailing:LevelInformation> <Retailing:LevelInformation TierDescription="Emerald member" TierId="ALLIANCE" TierLevel="EMD"></Retailing:LevelInformation> </Retailing:MembershipInformation> </FrequentFlyerCard> <MileageRequests> <MileageRequest LineNumber="8" OperatingCompanies="JL" Status="HK" TattooType="OT" TattooValue="21" Validated="true"> <Retailing:Associations> <Retailing:Ref LineNumber="1" RequestID="PAX1" TattooType="PT" TattooValue="1"></Retailing:Ref> </Retailing:Associations> </MileageRequest> </MileageRequests> </FrequentFlyer> <FrequentFlyer> <FrequentFlyerCard CardNumber="204301890" CompanyCode="JL"> <Retailing:Owner FirstName="NIKKO" LastName="TAROU" Title="MR"></Retailing:Owner> <Retailing:MembershipInformation> <Retailing:LevelInformation PriorityCode="2" TierDescription="Gold member" TierId="AIRLINE" TierLevel="GLD"></Retailing:LevelInformation> <Retailing:LevelInformation TierDescription="Emerald member" TierId="ALLIANCE" TierLevel="EMD"></Retailing:LevelInformation> </Retailing:MembershipInformation> </FrequentFlyerCard> <MileageRequests> <MileageRequest LineNumber="9" OperatingCompanies="JL" Status="HK" TattooType="OT" TattooValue="22" Validated="true"> <Retailing:Associations> <Retailing:Ref LineNumber="1" RequestID="PAX1" TattooType="PT" TattooValue="1"></Retailing:Ref> </Retailing:Associations> </MileageRequest> </MileageRequests> </FrequentFlyer> </FrequentFlyers> <Bounds> <Bound NIP="3"> <Segment LineNumber="5" RequestID="SEG1" TattooType="ST" TattooValue="4" bkgClass="J" isOpenSegment="false" segmentStatus="HK"> <Retailing:serviceProvider code="JC"></Retailing:serviceProvider> <Retailing:identifier>2332</Retailing:identifier> <Retailing:start dateTime="2015-02-20T09:00:00"> <Retailing:locationCode>TJH</Retailing:locationCode> </Retailing:start> <Retailing:end dateTime="2015-02-20T10:00:00"> <Retailing:locationCode>ITM</Retailing:locationCode> </Retailing:end> </Segment> <Segment LineNumber="6" RequestID="SEG2" TattooType="ST" TattooValue="5" bkgClass="J" isOpenSegment="false" segmentStatus="HK"> <Retailing:serviceProvider code="JL"></Retailing:serviceProvider> <Retailing:identifier>2083</Retailing:identifier> <Retailing:start dateTime="2015-02-20T11:00:00"> <Retailing:locationCode>ITM</Retailing:locationCode> </Retailing:start> <Retailing:end dateTime="2015-02-20T12:00:00"> <Retailing:locationCode>OKA</Retailing:locationCode> </Retailing:end> </Segment> </Bound> <Bound NIP="3"> <Segment LineNumber="7" RequestID="SEG3" TattooType="ST" TattooValue="6" bkgClass="J" isOpenSegment="false" segmentStatus="HK"> <Retailing:serviceProvider code="JL"></Retailing:serviceProvider> <Retailing:identifier>2084</Retailing:identifier> <Retailing:start dateTime="2015-09-26T20:00:00"> <Retailing:locationCode>OKA</Retailing:locationCode> </Retailing:start> <Retailing:end dateTime="2015-09-26T22:00:00"> <Retailing:locationCode>ITM</Retailing:locationCode> </Retailing:end> </Segment> </Bound> </Bounds> <SpecialServiceRequests> <SpecialServiceRequest LineNumber="10" NIP="1" RequestID="SSR1" TattooType="OT" TattooValue="23" code="BLND" serviceProviderCode="JL" status="HK"> <Retailing:Associations> <Retailing:Ref LineNumber="1" RequestID="PAX1" TattooType="PT" TattooValue="1"></Retailing:Ref> <Retailing:Ref LineNumber="5" RequestID="SEG1" TattooType="ST" TattooValue="4"></Retailing:Ref> <Retailing:Ref LineNumber="6" RequestID="SEG2" TattooType="ST" TattooValue="5"></Retailing:Ref> <Retailing:Ref LineNumber="7" RequestID="SEG3" TattooType="ST" TattooValue="6"></Retailing:Ref> </Retailing:Associations> </SpecialServiceRequest> </SpecialServiceRequests> </Rebooking> <Repricing> <ItineraryRepricing> <PricingDetails> <Totals> <far\_int:Price Amount="0" CurrencyCode="EUR" DecimalPlaces="2" Type="SumResidualValue"></far\_int:Price> <far\_int:Price Amount="0" CurrencyCode="EUR" DecimalPlaces="2" Type="SumPenalty"></far\_int:Price> </Totals> <PricingRecords> <PricingRecord> <far\_int:Price Amount="50000" CurrencyCode="EUR" DecimalPlaces="2" Type="OldBase"></far\_int:Price> <far\_int:Price Amount="53000" CurrencyCode="EUR" DecimalPlaces="2" Type="NewBase"></far\_int:Price> <far\_int:Price Amount="3000" CurrencyCode="EUR" DecimalPlaces="2" Type="BalanceBase"></far\_int:Price> <far\_int:Price Amount="580" CurrencyCode="EUR" DecimalPlaces="2" Type="OldTax"></far\_int:Price> <far\_int:Price Amount="580" CurrencyCode="EUR" DecimalPlaces="2" Type="NewTax"></far\_int:Price> <far\_int:Price Amount="0" CurrencyCode="EUR" DecimalPlaces="2" Type="BalanceTax"></far\_int:Price> <far\_int:Price Amount="3000" CurrencyCode="EUR" DecimalPlaces="2" Type="TicketDifference"></far\_int:Price> <far\_int:Price Amount="0" CurrencyCode="EUR" DecimalPlaces="2" Type="Penalty"></far\_int:Price> <far\_int:Price Amount="3000" CurrencyCode="EUR" DecimalPlaces="2" Type="GrandTotal"></far\_int:Price> <far\_int:PricingInfo PricingRecordRefIDs="1" PricingType="TQR"> <far\_int:AssociatedPNRElement Tattoo="1" Type="PT"></far\_int:AssociatedPNRElement> <far\_int:AssociatedPNRElement Tattoo="1" Type="ST"></far\_int:AssociatedPNRElement> <far\_int:AssociatedPNRElement Tattoo="2" Type="ST"></far\_int:AssociatedPNRElement> <far\_int:AssociatedPNRElement Tattoo="3" Type="ST"></far\_int:AssociatedPNRElement> </far\_int:PricingInfo> </PricingRecord> <PricingRecord> <far\_int:Price Amount="3000" CurrencyCode="EUR" DecimalPlaces="2" Type="Total"></far\_int:Price> <far\_int:Price Amount="3000" CurrencyCode="EUR" DecimalPlaces="2" Type="GrandTotal"></far\_int:Price> <far\_int:Price Amount="53000" CurrencyCode="EUR" DecimalPlaces="2" Type="Base"></far\_int:Price> <far\_int:Tax Amount="290" CurrencyCode="EUR" DecimalPlaces="2" IsoCode="JP" NatureCode="HJ"></far\_int:Tax> <far\_int:Tax Amount="290" CurrencyCode="EUR" DecimalPlaces="2" IsoCode="JP" NatureCode="HJ"></far\_int:Tax> <far\_int:PricingInfo PricingRecordRefIDs="1" PricingType="TST"> <far\_int:AssociatedPNRElement Tattoo="1" Type="PT"></far\_int:AssociatedPNRElement> <far\_int:AssociatedPNRElement Tattoo="1" Type="ST"></far\_int:AssociatedPNRElement> <far\_int:AssociatedPNRElement Tattoo="2" Type="ST"></far\_int:AssociatedPNRElement> <far\_int:AssociatedPNRElement Tattoo="3" Type="ST"></far\_int:AssociatedPNRElement> </far\_int:PricingInfo> </PricingRecord> <PricingRecord> <far\_int:Price Amount="50000" CurrencyCode="EUR" DecimalPlaces="2" Type="OldBase"></far\_int:Price> <far\_int:Price Amount="53000" CurrencyCode="EUR" DecimalPlaces="2" Type="NewBase"></far\_int:Price> <far\_int:Price Amount="3000" CurrencyCode="EUR" DecimalPlaces="2" Type="BalanceBase"></far\_int:Price> <far\_int:Price Amount="580" CurrencyCode="EUR" DecimalPlaces="2" Type="OldTax"></far\_int:Price> <far\_int:Price Amount="580" CurrencyCode="EUR" DecimalPlaces="2" Type="NewTax"></far\_int:Price> <far\_int:Price Amount="0" CurrencyCode="EUR" DecimalPlaces="2" Type="BalanceTax"></far\_int:Price> <far\_int:Price Amount="3000" CurrencyCode="EUR" DecimalPlaces="2" Type="TicketDifference"></far\_int:Price> <far\_int:Price Amount="0" CurrencyCode="EUR" DecimalPlaces="2" Type="Penalty"></far\_int:Price> <far\_int:Price Amount="3000" CurrencyCode="EUR" DecimalPlaces="2" Type="GrandTotal"></far\_int:Price> <far\_int:PricingInfo PricingRecordRefIDs="2" PricingType="TQR"> <far\_int:AssociatedPNRElement Tattoo="2" Type="PT"></far\_int:AssociatedPNRElement> <far\_int:AssociatedPNRElement Tattoo="1" Type="ST"></far\_int:AssociatedPNRElement> <far\_int:AssociatedPNRElement Tattoo="2" Type="ST"></far\_int:AssociatedPNRElement> <far\_int:AssociatedPNRElement Tattoo="3" Type="ST"></far\_int:AssociatedPNRElement> </far\_int:PricingInfo> </PricingRecord> <PricingRecord> <far\_int:Price Amount="3000" CurrencyCode="EUR" DecimalPlaces="2" Type="Total"></far\_int:Price> <far\_int:Price Amount="3000" CurrencyCode="EUR" DecimalPlaces="2" Type="GrandTotal"></far\_int:Price> <far\_int:Price Amount="53000" CurrencyCode="EUR" DecimalPlaces="2" Type="Base"></far\_int:Price> <far\_int:Tax Amount="290" CurrencyCode="EUR" DecimalPlaces="2" IsoCode="JP" NatureCode="HJ"></far\_int:Tax> <far\_int:Tax Amount="290" CurrencyCode="EUR" DecimalPlaces="2" IsoCode="JP" NatureCode="HJ"></far\_int:Tax> <far\_int:PricingInfo PricingRecordRefIDs="2" PricingType="TST"> <far\_int:AssociatedPNRElement Tattoo="2" Type="PT"></far\_int:AssociatedPNRElement> <far\_int:AssociatedPNRElement Tattoo="1" Type="ST"></far\_int:AssociatedPNRElement> <far\_int:AssociatedPNRElement Tattoo="2" Type="ST"></far\_int:AssociatedPNRElement> <far\_int:AssociatedPNRElement Tattoo="3" Type="ST"></far\_int:AssociatedPNRElement> </far\_int:PricingInfo> </PricingRecord> <PricingRecord> <far\_int:Price Amount="44000" CurrencyCode="EUR" DecimalPlaces="2" Type="OldBase"></far\_int:Price> <far\_int:Price Amount="47000" CurrencyCode="EUR" DecimalPlaces="2" Type="NewBase"></far\_int:Price> <far\_int:Price Amount="3000" CurrencyCode="EUR" DecimalPlaces="2" Type="BalanceBase"></far\_int:Price> <far\_int:Price Amount="200" CurrencyCode="EUR" DecimalPlaces="2" Type="OldTax"></far\_int:Price> <far\_int:Price Amount="200" CurrencyCode="EUR" DecimalPlaces="2" Type="NewTax"></far\_int:Price> <far\_int:Price Amount="0" CurrencyCode="EUR" DecimalPlaces="2" Type="BalanceTax"></far\_int:Price> <far\_int:Price Amount="3000" CurrencyCode="EUR" DecimalPlaces="2" Type="TicketDifference"></far\_int:Price> <far\_int:Price Amount="0" CurrencyCode="EUR" DecimalPlaces="2" Type="Penalty"></far\_int:Price> <far\_int:Price Amount="3000" CurrencyCode="EUR" DecimalPlaces="2" Type="GrandTotal"></far\_int:Price> <far\_int:PricingInfo PricingRecordRefIDs="3" PricingType="TQR"> <far\_int:AssociatedPNRElement Tattoo="3" Type="PT"></far\_int:AssociatedPNRElement> <far\_int:AssociatedPNRElement Tattoo="1" Type="ST"></far\_int:AssociatedPNRElement> <far\_int:AssociatedPNRElement Tattoo="2" Type="ST"></far\_int:AssociatedPNRElement> <far\_int:AssociatedPNRElement Tattoo="3" Type="ST"></far\_int:AssociatedPNRElement> </far\_int:PricingInfo> </PricingRecord> <PricingRecord> <far\_int:Price Amount="3000" CurrencyCode="EUR" DecimalPlaces="2" Type="Total"></far\_int:Price> <far\_int:Price Amount="3000" CurrencyCode="EUR" DecimalPlaces="2" Type="GrandTotal"></far\_int:Price> <far\_int:Price Amount="47000" CurrencyCode="EUR" DecimalPlaces="2" Type="Base"></far\_int:Price> <far\_int:Tax Amount="100" CurrencyCode="EUR" DecimalPlaces="2" IsoCode="JP" NatureCode="HJ"></far\_int:Tax> <far\_int:Tax Amount="100" CurrencyCode="EUR" DecimalPlaces="2" IsoCode="JP" NatureCode="HJ"></far\_int:Tax> <far\_int:PricingInfo PricingRecordRefIDs="3" PricingType="TST"> <far\_int:AssociatedPNRElement Tattoo="3" Type="PT"></far\_int:AssociatedPNRElement> <far\_int:AssociatedPNRElement Tattoo="1" Type="ST"></far\_int:AssociatedPNRElement> <far\_int:AssociatedPNRElement Tattoo="2" Type="ST"></far\_int:AssociatedPNRElement> <far\_int:AssociatedPNRElement Tattoo="3" Type="ST"></far\_int:AssociatedPNRElement> </far\_int:PricingInfo> </PricingRecord> <PricingRecord> <far\_int:Price Amount="0" CurrencyCode="EUR" DecimalPlaces="2" Type="Total"></far\_int:Price> <far\_int:Price Amount="0" CurrencyCode="EUR" DecimalPlaces="2" Type="GrandTotal"></far\_int:Price> <far\_int:Price Amount="0" CurrencyCode="EUR" DecimalPlaces="2" Type="Base"></far\_int:Price> <far\_int:Tax Amount="0" CurrencyCode="EUR" DecimalPlaces="2" IsoCode="JP" NatureCode="HJ"></far\_int:Tax> <far\_int:Tax Amount="0" CurrencyCode="EUR" DecimalPlaces="2" IsoCode="JP" NatureCode="HJ"></far\_int:Tax> <far\_int:PricingInfo PricingRecordRefIDs="4" PricingType="TST"> <far\_int:AssociatedPNRElement Tattoo="1" Type="PI"></far\_int:AssociatedPNRElement> <far\_int:AssociatedPNRElement Tattoo="1" Type="ST"></far\_int:AssociatedPNRElement> <far\_int:AssociatedPNRElement Tattoo="2" Type="ST"></far\_int:AssociatedPNRElement> <far\_int:AssociatedPNRElement Tattoo="3" Type="ST"></far\_int:AssociatedPNRElement> </far\_int:PricingInfo> </PricingRecord> </PricingRecords> </PricingDetails> </ItineraryRepricing> </Repricing> </Success> </AMA\_TicketRebookAndRepricePNRRS>

## 5.9.3 Possible Errors

See "Error Messages" section.

* * *

## 5.10 Operation: Exchange of itinerary with repricing using PTC Discount

Ticket\_RebookAndRepricePNR allows to exchange the segments in a PNR and reprice the entire itinerary against the old ticket, while also providing in input a pricing option to request PTC Discount. This pricing option must be traveller associated.

## 5.10.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_TicketRebookAndRepricePNRRQ Actions="COMMIT" Version="1.000"> <Reservation BookingIdentifier="TYSLF9"></Reservation> <Commit></Commit> <Rebooking> <Cancellation> <rtl:Ref TattooType="ST" TattooValue="1"></rtl:Ref> </Cancellation> <Bounds> <Bound NIP="3"> <Segment RequestID="SEG2" bkgClass="Y"> <rtl:serviceProvider code="AF"></rtl:serviceProvider> <rtl:identifier>6204</rtl:identifier> <rtl:start dateTime="2020-09-19T00:00:00"> <rtl:locationCode>ORY</rtl:locationCode> </rtl:start> <rtl:end dateTime="2020-09-19T00:00:00"> <rtl:locationCode>NCE</rtl:locationCode> </rtl:end> </Segment> </Bound> </Bounds> </Rebooking> <Repricing> <ItineraryPricingOptions> <ItineraryPricingOption> <pri:Discount> <pri:code Operation="PAX">YTH</pri:code> </pri:Discount> <far\_int:AssociatedPNRElement Tattoo="1" Type="PT"></far\_int:AssociatedPNRElement> </ItineraryPricingOption> <ItineraryPricingOption> <pri:Discount> <pri:code Operation="PAX">MIL</pri:code> </pri:Discount> <far\_int:AssociatedPNRElement Tattoo="2" Type="PT"></far\_int:AssociatedPNRElement> </ItineraryPricingOption> <ItineraryPricingOption> <pri:Discount> <pri:code Operation="PAX">AD20</pri:code> </pri:Discount> <far\_int:AssociatedPNRElement Tattoo="3" Type="PT"></far\_int:AssociatedPNRElement> </ItineraryPricingOption> </ItineraryPricingOptions> </Repricing> </AMA\_TicketRebookAndRepricePNRRQ>

## 5.10.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_TicketRebookAndRepricePNRRS Version="1.000"> <Success> <Warnings> <ns2:Warning Code="34666" Language="EN" ShortText="EOT HAS BEEN PROCESSED DURING THIS TRANSACTION" Type="I">EOT HAS BEEN PROCESSED DURING THIS TRANSACTION</ns2:Warning> </Warnings> <Reservation BookingIdentifier="TYSLF9"></Reservation> <Commit EnvelopeNumber="4" ReceivedFrom="DEFAULT RF"></Commit> <Rebooking> <CancelledElements> <ns2:Ref TattooType="ST" TattooValue="1"></ns2:Ref> </CancelledElements> <Bounds> <Bound NIP="3"> <Segment LineNumber="4" RequestID="SEG2" TattooType="ST" TattooValue="2" bkgClass="Y" isOpenSegment="false" segmentStatus="HK"> <ns2:serviceProvider code="AF" name="Air France"></ns2:serviceProvider> <ns2:identifier>6204</ns2:identifier> <ns2:start dateTime="2020-09-19T08:20:00"> <ns2:locationCode>ORY</ns2:locationCode> </ns2:start> <ns2:end dateTime="2020-09-19T09:45:00"> <ns2:locationCode>NCE</ns2:locationCode> </ns2:end> </Segment> </Bound> </Bounds> </Rebooking> <Repricing> <ItineraryRepricing> <PricingDetails> <PricingRecords> <PricingRecord> <ns6:PaxName FirstName="Kukoukuumr" LastName="Reinihon"></ns6:PaxName> <ns6:Price Amount="38700" CurrencyCode="EUR" DecimalPlaces="2" Type="NewBase"></ns6:Price> <ns6:Price Amount="70600" CurrencyCode="EUR" DecimalPlaces="2" Type="OldBase"></ns6:Price> <ns6:Price Amount="32031" CurrencyCode="EUR" DecimalPlaces="2" Type="ResidualValue"></ns6:Price> <ns6:Price Amount="41991" CurrencyCode="EUR" DecimalPlaces="2" Type="NewTotalFare"></ns6:Price> <ns6:Price Amount="3291" CurrencyCode="EUR" DecimalPlaces="2" Type="NewTax"></ns6:Price> <ns6:Price Amount="0" CurrencyCode="EUR" DecimalPlaces="2" Type="TotalAdditionalCollection"></ns6:Price> <ns6:Price Amount="3422" CurrencyCode="EUR" DecimalPlaces="2" Type="OldTax"></ns6:Price> <ns6:Price Amount="-31900" CurrencyCode="EUR" DecimalPlaces="2" Type="BalanceBase"></ns6:Price> <ns6:Price Amount="-32031" CurrencyCode="EUR" DecimalPlaces="2" Type="GrandTotal"></ns6:Price> <ns6:Price Amount="-131" CurrencyCode="EUR" DecimalPlaces="2" Type="BalanceTax"></ns6:Price> <ns6:Price Amount="-32031" CurrencyCode="EUR" DecimalPlaces="2" Type="TicketDifference"></ns6:Price> <ns6:Price Amount="0" CurrencyCode="EUR" DecimalPlaces="2" Type="Penalty"></ns6:Price> <ns6:Price Amount="74022" CurrencyCode="EUR" DecimalPlaces="2" Type="OldTotalFare"></ns6:Price> <ns6:PricingInfo PricingType="TQR"> <ns6:AssociatedPNRElement Tattoo="1" Type="PT"></ns6:AssociatedPNRElement> <ns6:AssociatedPNRElement Tattoo="2" Type="ST"></ns6:AssociatedPNRElement> </ns6:PricingInfo> </PricingRecord> <PricingRecord> <ns6:PaxName FirstName="Kukoukuumr" LastName="Reinihon"></ns6:PaxName> <ns6:Price Amount="38700" CurrencyCode="EUR" DecimalPlaces="2" Type="NewBase"></ns6:Price> <ns6:Price Amount="0" CurrencyCode="EUR" DecimalPlaces="2" Type="GrandTotal"></ns6:Price> <ns6:Price Amount="0" CurrencyCode="EUR" DecimalPlaces="2" Type="Total"></ns6:Price> <ns6:Tax Amount="463" CurrencyCode="EUR" DecimalPlaces="2" Indicator="PD" IsoCode="FR" NatureCode="SE"></ns6:Tax> <ns6:Tax Amount="1170" CurrencyCode="EUR" DecimalPlaces="2" Indicator="PD" IsoCode="FR" NatureCode="TI"></ns6:Tax> <ns6:Tax Amount="113" CurrencyCode="EUR" DecimalPlaces="2" Indicator="PD" IsoCode="IZ" NatureCode="EB"></ns6:Tax> <ns6:Tax Amount="150" CurrencyCode="EUR" DecimalPlaces="2" Indicator="PD" IsoCode="O4" NatureCode="VC"></ns6:Tax> <ns6:Tax Amount="1095" CurrencyCode="EUR" DecimalPlaces="2" Indicator="PD" IsoCode="QW" NatureCode="LO"></ns6:Tax> <ns6:Tax Amount="300" CurrencyCode="EUR" DecimalPlaces="2" Indicator="PD" IsoCode="UI" NatureCode="VZ"></ns6:Tax> <ns6:Tax Amount="119" CurrencyCode="EUR" DecimalPlaces="2" Indicator="RFD" IsoCode="QW" NatureCode="LO"></ns6:Tax> <ns6:Tax Amount="12" CurrencyCode="EUR" DecimalPlaces="2" Indicator="RFD" IsoCode="UI" NatureCode="VZ"></ns6:Tax> <ns6:PricingInfo FareCalc="PAR AF NCE387.00EUR387.00END" PricingRecordRefIDs="2" PricingType="TST"> <ns6:AssociatedPNRElement Tattoo="1" Type="PT"></ns6:AssociatedPNRElement> <ns6:AssociatedPNRElement Tattoo="2" Type="ST"></ns6:AssociatedPNRElement> </ns6:PricingInfo> <ns6:FareComponent Destination="NCE" Number="1" Origin="PAR" Type="FC"> <ns6:AssociatedPNRElement Tattoo="2" Type="ST"></ns6:AssociatedPNRElement> <ns6:FareBasis FareBasisCode="YS50BEHX"></ns6:FareBasis> <ns6:FareFamily Name="FLEX" Owner="AF"></ns6:FareFamily> </ns6:FareComponent> <ns6:Coupon SegmentTattoo="2"> <ns6:FareBasis FareBasisCode="YS50BEHX"></ns6:FareBasis> <ns6:FreeBagAllowance Measure="1" Type="N"></ns6:FreeBagAllowance> <ns6:DateValidity Type="NVA">2021-09-19</ns6:DateValidity> </ns6:Coupon> </PricingRecord> <PricingRecord> <ns6:PaxName FirstName="Titoms" LastName="Reinihon"></ns6:PaxName> <ns6:Price Amount="38700" CurrencyCode="EUR" DecimalPlaces="2" Type="NewBase"></ns6:Price> <ns6:Price Amount="70600" CurrencyCode="EUR" DecimalPlaces="2" Type="OldBase"></ns6:Price> <ns6:Price Amount="32031" CurrencyCode="EUR" DecimalPlaces="2" Type="ResidualValue"></ns6:Price> <ns6:Price Amount="41991" CurrencyCode="EUR" DecimalPlaces="2" Type="NewTotalFare"></ns6:Price> <ns6:Price Amount="3291" CurrencyCode="EUR" DecimalPlaces="2" Type="NewTax"></ns6:Price> <ns6:Price Amount="0" CurrencyCode="EUR" DecimalPlaces="2" Type="TotalAdditionalCollection"></ns6:Price> <ns6:Price Amount="3422" CurrencyCode="EUR" DecimalPlaces="2" Type="OldTax"></ns6:Price> <ns6:Price Amount="-31900" CurrencyCode="EUR" DecimalPlaces="2" Type="BalanceBase"></ns6:Price> <ns6:Price Amount="-32031" CurrencyCode="EUR" DecimalPlaces="2" Type="GrandTotal"></ns6:Price> <ns6:Price Amount="-131" CurrencyCode="EUR" DecimalPlaces="2" Type="BalanceTax"></ns6:Price> <ns6:Price Amount="-32031" CurrencyCode="EUR" DecimalPlaces="2" Type="TicketDifference"></ns6:Price> <ns6:Price Amount="0" CurrencyCode="EUR" DecimalPlaces="2" Type="Penalty"></ns6:Price> <ns6:Price Amount="74022" CurrencyCode="EUR" DecimalPlaces="2" Type="OldTotalFare"></ns6:Price> <ns6:PricingInfo PricingType="TQR"> <ns6:AssociatedPNRElement Tattoo="3" Type="PT"></ns6:AssociatedPNRElement> <ns6:AssociatedPNRElement Tattoo="2" Type="ST"></ns6:AssociatedPNRElement> </ns6:PricingInfo> </PricingRecord> <PricingRecord> <ns6:PaxName FirstName="Titoms" LastName="Reinihon"></ns6:PaxName> <ns6:Price Amount="38700" CurrencyCode="EUR" DecimalPlaces="2" Type="NewBase"></ns6:Price> <ns6:Price Amount="0" CurrencyCode="EUR" DecimalPlaces="2" Type="GrandTotal"></ns6:Price> <ns6:Price Amount="0" CurrencyCode="EUR" DecimalPlaces="2" Type="Total"></ns6:Price> <ns6:Tax Amount="463" CurrencyCode="EUR" DecimalPlaces="2" Indicator="PD" IsoCode="FR" NatureCode="SE"></ns6:Tax> <ns6:Tax Amount="1170" CurrencyCode="EUR" DecimalPlaces="2" Indicator="PD" IsoCode="FR" NatureCode="TI"></ns6:Tax> <ns6:Tax Amount="113" CurrencyCode="EUR" DecimalPlaces="2" Indicator="PD" IsoCode="IZ" NatureCode="EB"></ns6:Tax> <ns6:Tax Amount="150" CurrencyCode="EUR" DecimalPlaces="2" Indicator="PD" IsoCode="O4" NatureCode="VC"></ns6:Tax> <ns6:Tax Amount="1095" CurrencyCode="EUR" DecimalPlaces="2" Indicator="PD" IsoCode="QW" NatureCode="LO"></ns6:Tax> <ns6:Tax Amount="300" CurrencyCode="EUR" DecimalPlaces="2" Indicator="PD" IsoCode="UI" NatureCode="VZ"></ns6:Tax> <ns6:Tax Amount="119" CurrencyCode="EUR" DecimalPlaces="2" Indicator="RFD" IsoCode="QW" NatureCode="LO"></ns6:Tax> <ns6:Tax Amount="12" CurrencyCode="EUR" DecimalPlaces="2" Indicator="RFD" IsoCode="UI" NatureCode="VZ"></ns6:Tax> <ns6:PricingInfo FareCalc="PAR AF NCE387.00EUR387.00END" PricingRecordRefIDs="3" PricingType="TST"> <ns6:AssociatedPNRElement Tattoo="3" Type="PT"></ns6:AssociatedPNRElement> <ns6:AssociatedPNRElement Tattoo="2" Type="ST"></ns6:AssociatedPNRElement> </ns6:PricingInfo> <ns6:FareComponent Destination="NCE" Number="1" Origin="PAR" Type="FC"> <ns6:AssociatedPNRElement Tattoo="2" Type="ST"></ns6:AssociatedPNRElement> <ns6:FareBasis FareBasisCode="YS50BEHX"></ns6:FareBasis> <ns6:FareFamily Name="FLEX" Owner="AF"></ns6:FareFamily> </ns6:FareComponent> <ns6:Coupon SegmentTattoo="2"> <ns6:FareBasis FareBasisCode="YS50BEHX"></ns6:FareBasis> <ns6:FreeBagAllowance Measure="1" Type="N"></ns6:FreeBagAllowance> <ns6:DateValidity Type="NVA">2021-09-19</ns6:DateValidity> </ns6:Coupon> </PricingRecord> <PricingRecord> <ns6:PaxName FirstName="Yatashimrs" LastName="Reinihon"></ns6:PaxName> <ns6:Price Amount="38700" CurrencyCode="EUR" DecimalPlaces="2" Type="NewBase"></ns6:Price> <ns6:Price Amount="70600" CurrencyCode="EUR" DecimalPlaces="2" Type="OldBase"></ns6:Price> <ns6:Price Amount="32031" CurrencyCode="EUR" DecimalPlaces="2" Type="ResidualValue"></ns6:Price> <ns6:Price Amount="41991" CurrencyCode="EUR" DecimalPlaces="2" Type="NewTotalFare"></ns6:Price> <ns6:Price Amount="3291" CurrencyCode="EUR" DecimalPlaces="2" Type="NewTax"></ns6:Price> <ns6:Price Amount="0" CurrencyCode="EUR" DecimalPlaces="2" Type="TotalAdditionalCollection"></ns6:Price> <ns6:Price Amount="3422" CurrencyCode="EUR" DecimalPlaces="2" Type="OldTax"></ns6:Price> <ns6:Price Amount="-31900" CurrencyCode="EUR" DecimalPlaces="2" Type="BalanceBase"></ns6:Price> <ns6:Price Amount="-32031" CurrencyCode="EUR" DecimalPlaces="2" Type="GrandTotal"></ns6:Price> <ns6:Price Amount="-131" CurrencyCode="EUR" DecimalPlaces="2" Type="BalanceTax"></ns6:Price> <ns6:Price Amount="-32031" CurrencyCode="EUR" DecimalPlaces="2" Type="TicketDifference"></ns6:Price> <ns6:Price Amount="0" CurrencyCode="EUR" DecimalPlaces="2" Type="Penalty"></ns6:Price> <ns6:Price Amount="74022" CurrencyCode="EUR" DecimalPlaces="2" Type="OldTotalFare"></ns6:Price> <ns6:PricingInfo PricingType="TQR"> <ns6:AssociatedPNRElement Tattoo="2" Type="PT"></ns6:AssociatedPNRElement> <ns6:AssociatedPNRElement Tattoo="2" Type="ST"></ns6:AssociatedPNRElement> </ns6:PricingInfo> </PricingRecord> <PricingRecord> <ns6:PaxName FirstName="Yatashimrs" LastName="Reinihon"></ns6:PaxName> <ns6:Price Amount="38700" CurrencyCode="EUR" DecimalPlaces="2" Type="NewBase"></ns6:Price> <ns6:Price Amount="0" CurrencyCode="EUR" DecimalPlaces="2" Type="GrandTotal"></ns6:Price> <ns6:Price Amount="0" CurrencyCode="EUR" DecimalPlaces="2" Type="Total"></ns6:Price> <ns6:Tax Amount="463" CurrencyCode="EUR" DecimalPlaces="2" Indicator="PD" IsoCode="FR" NatureCode="SE"></ns6:Tax> <ns6:Tax Amount="1170" CurrencyCode="EUR" DecimalPlaces="2" Indicator="PD" IsoCode="FR" NatureCode="TI"></ns6:Tax> <ns6:Tax Amount="113" CurrencyCode="EUR" DecimalPlaces="2" Indicator="PD" IsoCode="IZ" NatureCode="EB"></ns6:Tax> <ns6:Tax Amount="150" CurrencyCode="EUR" DecimalPlaces="2" Indicator="PD" IsoCode="O4" NatureCode="VC"></ns6:Tax> <ns6:Tax Amount="1095" CurrencyCode="EUR" DecimalPlaces="2" Indicator="PD" IsoCode="QW" NatureCode="LO"></ns6:Tax> <ns6:Tax Amount="300" CurrencyCode="EUR" DecimalPlaces="2" Indicator="PD" IsoCode="UI" NatureCode="VZ"></ns6:Tax> <ns6:Tax Amount="119" CurrencyCode="EUR" DecimalPlaces="2" Indicator="RFD" IsoCode="QW" NatureCode="LO"></ns6:Tax> <ns6:Tax Amount="12" CurrencyCode="EUR" DecimalPlaces="2" Indicator="RFD" IsoCode="UI" NatureCode="VZ"></ns6:Tax> <ns6:PricingInfo FareCalc="PAR AF NCE387.00EUR387.00END" PricingRecordRefIDs="4" PricingType="TST"> <ns6:AssociatedPNRElement Tattoo="2" Type="PT"></ns6:AssociatedPNRElement> <ns6:AssociatedPNRElement Tattoo="2" Type="ST"></ns6:AssociatedPNRElement> </ns6:PricingInfo> <ns6:FareComponent Destination="NCE" Number="1" Origin="PAR" Type="FC"> <ns6:AssociatedPNRElement Tattoo="2" Type="ST"></ns6:AssociatedPNRElement> <ns6:FareBasis FareBasisCode="YS50BEHX"></ns6:FareBasis> <ns6:FareFamily Name="FLEX" Owner="AF"></ns6:FareFamily> </ns6:FareComponent> <ns6:Coupon SegmentTattoo="2"> <ns6:FareBasis FareBasisCode="YS50BEHX"></ns6:FareBasis> <ns6:FreeBagAllowance Measure="1" Type="N"></ns6:FreeBagAllowance> <ns6:DateValidity Type="NVA">2021-09-19</ns6:DateValidity> </ns6:Coupon> </PricingRecord> <PricingRecord> <ns6:PaxName FirstName="Kukoukuumr" LastName="Reinihon"></ns6:PaxName> <ns6:Price Amount="32031" CurrencyCode="EUR" DecimalPlaces="2" Type="Fare"></ns6:Price> <ns6:Price Amount="0" CurrencyCode="EUR" DecimalPlaces="2" Type="Total"></ns6:Price> <ns6:Price Amount="32031" CurrencyCode="EUR" DecimalPlaces="2" Type="ExchangeValue"></ns6:Price> <ns6:PricingInfo PricingRecordRefIDs="26" PricingType="TSM" RFIC="D" RFISC="996"> <ns6:AssociatedPNRElement Tattoo="1" Type="PT"></ns6:AssociatedPNRElement> <ns6:AssociatedPNRElement Tattoo="2" Type="ST"></ns6:AssociatedPNRElement> </ns6:PricingInfo> </PricingRecord> <PricingRecord> <ns6:PaxName FirstName="Titoms" LastName="Reinihon"></ns6:PaxName> <ns6:Price Amount="32031" CurrencyCode="EUR" DecimalPlaces="2" Type="Fare"></ns6:Price> <ns6:Price Amount="0" CurrencyCode="EUR" DecimalPlaces="2" Type="Total"></ns6:Price> <ns6:Price Amount="32031" CurrencyCode="EUR" DecimalPlaces="2" Type="ExchangeValue"></ns6:Price> <ns6:PricingInfo PricingRecordRefIDs="29" PricingType="TSM" RFIC="D" RFISC="996"> <ns6:AssociatedPNRElement Tattoo="3" Type="PT"></ns6:AssociatedPNRElement> <ns6:AssociatedPNRElement Tattoo="2" Type="ST"></ns6:AssociatedPNRElement> </ns6:PricingInfo> </PricingRecord> <PricingRecord> <ns6:PaxName FirstName="Yatashimrs" LastName="Reinihon"></ns6:PaxName> <ns6:Price Amount="32031" CurrencyCode="EUR" DecimalPlaces="2" Type="Fare"></ns6:Price> <ns6:Price Amount="0" CurrencyCode="EUR" DecimalPlaces="2" Type="Total"></ns6:Price> <ns6:Price Amount="32031" CurrencyCode="EUR" DecimalPlaces="2" Type="ExchangeValue"></ns6:Price> <ns6:PricingInfo PricingRecordRefIDs="32" PricingType="TSM" RFIC="D" RFISC="996"> <ns6:AssociatedPNRElement Tattoo="2" Type="PT"></ns6:AssociatedPNRElement> <ns6:AssociatedPNRElement Tattoo="2" Type="ST"></ns6:AssociatedPNRElement> </ns6:PricingInfo> </PricingRecord> </PricingRecords> </PricingDetails> </ItineraryRepricing> </Repricing> </Success> </AMA\_TicketRebookAndRepricePNRRS>

## 5.10.3 Possible Errors

See "Error Messages" section.

* * *

## 5.11 Operation: Repricing of air itinerary for unused ticket

Ticket\_RebookAndRepricePNR allows to perform only repricing operation in case a PNR has been created with new segments and a ticket manually attached with an FHE element.

## 5.11.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_TicketRebookAndRepricePNRRQ Actions="" Version="1.000" xsi:schemaLocation="http://xml.amadeus.com/2010/06/Ticket\_RebookAndRepricePNR\_v 1 AMA\_TicketRebookAndRepricePNRRQ.xsd"> <Reservation BookingIdentifier="RECLOC"></Reservation> <Commit IgnoreWarningsOption="true" ReceivedFrom="Amadeus Test WBS"></Commit> <Repricing> <ItineraryPricingOptions> <ItineraryPricingOption> <pri:TicketingInfo Number="1315297294451"></pri:TicketingInfo> <pri:Booking Operation="SEL"></pri:Booking> <far\_int:AssociatedPNRElement Tattoo="1" Type="PT"></far\_int:AssociatedPNRElement> </ItineraryPricingOption> </ItineraryPricingOptions> </Repricing> </AMA\_TicketRebookAndRepricePNRRQ>

## 5.11.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_TicketRebookAndRepricePNRRS Version="1.000" xsi:schemaLocation="http://xml.amadeus.com/2010/06/Ticket\_RebookAndRepricePNR\_v1 AMA\_TicketRebookAndRepricePNRRS.xsd"> <Success> <Reservation BookingIdentifier="RECLOC"></Reservation> <Commit EnvelopeNumber="3" ReceivedFrom="Amadeus Test WBS"></Commit> <Repricing> <ItineraryRepricing> <PricingDetails> <Totals> <far\_int:Price Amount="0" CurrencyCode="EUR" DecimalPlaces="2" Type="SumResidualValue"></far\_int:Price> <far\_int:Price Amount="5500" CurrencyCode="EUR" DecimalPlaces="2" Type="SumPenalty"></far\_int:Price> </Totals> <PricingRecords> <PricingRecord> <far\_int:Price Amount="95000" CurrencyCode="EUR" DecimalPlaces="2" Type="OldBase"></far\_int:Price> <far\_int:Price Amount="110000" CurrencyCode="EUR" DecimalPlaces="2" Type="NewBase"></far\_int:Price> <far\_int:Price Amount="15000" CurrencyCode="EUR" DecimalPlaces="2" Type="BalanceBase"></far\_int:Price> <far\_int:Price Amount="11000" CurrencyCode="EUR" DecimalPlaces="2" Type="OldTax"></far\_int:Price> <far\_int:Price Amount="11000" CurrencyCode="EUR" DecimalPlaces="2" Type="NewTax"></far\_int:Price> <far\_int:Price Amount="0" CurrencyCode="EUR" DecimalPlaces="2" Type="BalanceTax"></far\_int:Price> <far\_int:Price Amount="15000" CurrencyCode="EUR" DecimalPlaces="2" Type="TicketDifference"></far\_int:Price> <far\_int:Price Amount="5500" CurrencyCode="EUR" DecimalPlaces="2" Type="Penalty"></far\_int:Price> <far\_int:Price Amount="20500" CurrencyCode="EUR" DecimalPlaces="2" Type="GrandTotal"></far\_int:Price> <far\_int:PricingInfo PricingRecordRefIDs="1" PricingType="TQR"> <far\_int:AssociatedPNRElement Tattoo="1" Type="PT"></far\_int:AssociatedPNRElement> <far\_int:AssociatedPNRElement Tattoo="1" Type="ST"></far\_int:AssociatedPNRElement> <far\_int:AssociatedPNRElement Tattoo="2" Type="ST"></far\_int:AssociatedPNRElement> </far\_int:PricingInfo> </PricingRecord> <PricingRecord> <far\_int:Price Amount="15000" CurrencyCode="EUR" DecimalPlaces="2" Type="Total"></far\_int:Price> <far\_int:Price Amount="15000" CurrencyCode="EUR" DecimalPlaces="2" Type="GrandTotal"></far\_int:Price> <far\_int:Price Amount="110000" CurrencyCode="EUR" DecimalPlaces="2" Type="Base"></far\_int:Price> <far\_int:Tax Amount="10000" CurrencyCode="EUR" DecimalPlaces="2" IsoCode="FR" NatureCode="A1"></far\_int:Tax> <far\_int:Tax Amount="1000" CurrencyCode="EUR" DecimalPlaces="2" IsoCode="FR" NatureCode="ZZ"></far\_int:Tax> <far\_int:PricingInfo PricingRecordRefIDs="1" PricingType="TST"> <far\_int:AssociatedPNRElement Tattoo="1" Type="PT"></far\_int:AssociatedPNRElement> <far\_int:AssociatedPNRElement Tattoo="1" Type="ST"></far\_int:AssociatedPNRElement> <far\_int:AssociatedPNRElement Tattoo="2" Type="ST"></far\_int:AssociatedPNRElement> </far\_int:PricingInfo> </PricingRecord> <PricingRecord> <far\_int:Price Amount="5500" CurrencyCode="EUR" DecimalPlaces="2" Type="Total"></far\_int:Price> <far\_int:Price Amount="5500" CurrencyCode="EUR" DecimalPlaces="2" Type="Base"></far\_int:Price> <far\_int:PricingInfo PricingRecordRefIDs="2" PricingType="TSM" RFIC="D" RFISC="995"> <far\_int:AssociatedPNRElement Tattoo="1" Type="PT"></far\_int:AssociatedPNRElement> <far\_int:AssociatedPNRElement Tattoo="1" Type="ST"></far\_int:AssociatedPNRElement> <far\_int:AssociatedPNRElement Tattoo="2" Type="ST"></far\_int:AssociatedPNRElement> </far\_int:PricingInfo> </PricingRecord> </PricingRecords> </PricingDetails> </ItineraryRepricing> </Repricing> </Success> </AMA\_TicketRebookAndRepricePNRRS>

## 5.11.3 Possible Errors

See "Error Messages" section.

* * *