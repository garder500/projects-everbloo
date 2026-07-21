---
url: "https://developers.amadeus.com/api-library/soap/functional-doc/1293/doc-read/9688?serviceVersion=14.1"
download_url: "https://developers.amadeus.com/PAS-EAS/api/download/comp/4d4ad2cb456c02633f463a055ab70584/9688/HTML_UG_WBS_Ticket_CancelDocument_TRCANQ_14.1/UG_WBS_Ticket_CancelDocument_TRCANQ_14.1_008.html"
title: "HTML_UG_WBS_Ticket_CancelDocument_TRCANQ_14.1_008"
source: "amadeus"
service_id: "1293"
service_name: "Ticket_CancelDocument"
version: "14.1"
document_id: "9688"
doc_version: "14.1"
doc_type: "User guide"
file_format: "HTML"
scraped_at: "2026-07-15T10:45:50.946Z"
---
# Function: Ticket\_CancelDocument

* * *

## 1 Overview

This service is available for both travel agencies and airline offices (ATO/CTO). It cancels documents before the sales report closure, when no monetary transfer has been executed.

This service can be applied either to a sale or a refund document. To be eligible to the cancellation action, the transaction(s) must not be in a confirmed status.

-   For sales, it means that the document status is still "pending" and the sales report has not yet been closed;
-   For refund documents, it means that the refund document has not yet been inserted in a reporting file.

### Use cases

Three cancellation use cases may be performed depending on settings activation:

-   **Void of first issue:** Cancellation performed on a document which has never been reissued.
-   **Void of exchange:** Cancellation performed on a document which has been reissued at least one time.
-   **Void of refund:** Cancellation performed on a refunded document (identified by transaction code RFND.

### Standard cancellation

This functionality is opened for travel agencies and ATO/CTO. Successful standard cancellation request leads to updates of the coupon(s) status on electronic ticket server (ETS) or electronic miscellaneous document server (EMS), sales report transaction code and PNR elements.

When at least one e-ticket is involved in cancellation process and preliminary checks/coupons eligibility rule have been successfully validated, then the system send a standard IATA cancellation message to airline ETS/EMS in order to update coupon status. Otherwise no cancellation request is sent to airline ETS/EMS.  
In case of successful ETS/EMS cancellation reply or successful preliminary checks validation (for sales report only cancellation and cancellation not linked to any e-ticket), then system will update the transaction code of the cancelled document in sales report database.  
When sales report update has been successfully performed then PNR FA line containing reference to the cancelled document is updated to reflect the cancellation transaction. 

### E-Ticket Direct cancellation

This functionality is only opened for travel agencies and applies only to electronic documents. It allows travel agencies to cancel documents issued directly in an airline sales report.

### Sales report cancellation

This functionality may be used when the targeted electronic document server does not support the corresponding cancellation request (void of first issue, void of exchange or cancel of refund). Cancellation transaction is then performed without any coupon(s) update on electronic server and corresponding FA line in the PNR is not updated. Cancellation transaction is reflected only on sales report database.

## 1.1 Supported Operations

The three main functionalities are supported: standard cancellation, E-Ticket Direct cancellation and sales report cancellation.

Standard cancellation updates coupon status in ETS/EMS, transaction code in sales report and PNR elements related to the cancelled document. E-Ticket Direct cancellation is similar to standard cancellation, but allows a travel agencies to target directly an airline sales report. Sales report cancellation updates only the transaction code in sales report.

The document(s) eligible for cancellation transactions may be identified in a request by the document number or by its sales report sequence number.

If agent chooses to cancel by sequence number(s), he has the possibility to cancel up to 20 items by entering a single item sequence number, a range of item sequence numbers, or a combination both. In this case, the maximum number of slots is 4. A slot can be either an individual item or range of items.

## 1.2 Limitations

Documents in a "confirmed" status, where sales report is already closed, are not eligible for cancellation transaction.

E-Ticket Direct cancellation is only available for travel agencies.

Document cancellation by ticket number cannot be done on multiple tickets in the same request.

TRDC entry is not allowed for RFN0 (no reported refund) and EMCO (only for cancel of refund and void of exchange use cases) documents types.

Document types CANN, VSCN and RSCN Inventory transactions are not eligible for cancellation transaction.

## 1.3 Unsupported Operations

Not applicable

## 1.4 Prerequisites

The corresponding cancellation use case (void of first issue, void of exchange or void of refund) is authorized by the validating airline.

The agent has rights to cancel the document provided, i.e. the agent cancelling the document is the same agent who issued the document. Other agents may have rights to cancel the document depending on market preference settings (TRDCATMARKETLEVEL or SALESREPORTATAGENTLEVEL) or EOS agreements.

If sales report cancellation is used, this functionality is activated at the travel agency or ATO/CTO level.

If E-Ticket Direct cancellation is used, ARP - BSP AREA PLAN field of the office profile must be set to "NONE". Otherwise, the targeted sales report will be the one of the travel agent's stock provider given in ARP - BSP AREA PLAN field.

Central Ticketing Server is the ticketing server of the requesting office.

The document is present in the targeted sales database.

For document cancellation by sequence number, agent has displayed the query sales report containing the document(s) to be cancelled.

## 2 Building A Query

A query is composed of a reference (document or sequence number) to the document(s) to be cancelled, stock provider code and office identification. In addition, a query may contain originator details and a void option.

## 2.1 Sub Structure: Specify the document(s) reference by a single sequence number

## 2.1.1 Description

An individual sequence number may be referenced by omitting the second instance of _itemNumberDetails_, as shown in the example. 

Up to four instances of _sequenceNumberRanges_, either range or single item, may be combined to reference up to 20 documents to be cancelled.

The sequence number of a document can be obtained from the sales report by the use of SalesReport\_DisplayQueryReport webservice.

## 2.1.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<sequenceNumberRanges> <itemNumberDetails> <number>1408</number> <type>FRM</type> </itemNumberDetails> </sequenceNumberRanges>

## 2.2 Sub Structure: Specify the document(s) reference by document numbers

## 2.2.1 Description

The _number_ element must corresponds to the 13-digit document number or to the 10-digit number (without 3-digit numeric airline code). In this case, only one document may be referenced per message. The _documentNumberDetails_ composite can be repeated up to 99 to support the cancellation of multiple document numbers.

## 2.2.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_CancelDocument xmlns="http://xml.amadeus.com/TRCANQ\_14\_1\_1A"> <documentNumberDetails> <documentDetails> <number>1721587458965</number> </documentDetails> </documentNumberDetails> <documentNumberDetails> <documentDetails> <number>1721234567890</number> </documentDetails> </documentNumberDetails> </Ticket\_CancelDocument>

## 2.3 Sub Structure: Specify the document(s) reference by sequence number range

## 2.3.1 Description

A range of sequence numbers is defined with _sequenceNumberRanges_ as shown in the example_._ In the first instance of _itemNumberDetails_ with _type_ element value _FRM_, the _number_ element is the sequence number of the first document of the range. The second instance, with _type_ element value _TO_, corresponds to the last document of the range. The sequence number of a document can be obtained from the sales report by the use of SalesReport\_DisplayQueryReport webservice. The sequence number is composed of up to six alphanumeric characters.

## 2.3.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<sequenceNumberRanges> <itemNumberDetails> <number>1408</number> <type>FRM</type> </itemNumberDetails> <itemNumberDetails> <number>1412</number> <type>TO</type> </itemNumberDetails> </sequenceNumberRanges>

## 2.4 Sub Structure: Specify the office identification

## 2.4.1 Description

The office at the origin of the request is identified by its nine-digit alphanumeric identification code. It is specified in _inHouseIdentification2_ element.

## 2.4.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<targetOfficeDetails> <originatorDetails> <inHouseIdentification2>NCE6X0100</inHouseIdentification2> </originatorDetails> </targetOfficeDetails>

## 2.5 Sub Structure: Specify the targeted airline stock provider

## 2.5.1 Description

A targeted airline stock provider is specified by its two-character code in the _stockProviderCode_ element. In the example, sales database of airline XX is targeted.

## 2.5.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<stockProviderDetails> <officeSettingsDetails> <stockProviderCode>XX</stockProviderCode> </officeSettingsDetails> </stockProviderDetails>

## 2.6 Sub Structure: Specify the targeted market stock provider

## 2.6.1 Description

In case a market stock provider is targeted, it is defined by its two-character code in the _marketIataCode_ element. For example, a travel agent belonging to the French market should fill this field as shown in the example below.

When E-Ticket Direct functionality is used, a travel agent defines in his request the targeted airline stock provider code in _stockProviderDetails_ with _stockProviderCode_ element as previously described.

## 2.6.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<stockProviderDetails> <officeSettingsDetails> <marketIataCode>FR</marketIataCode> </officeSettingsDetails> </stockProviderDetails>

## 2.7 Sub Structure: Specify the void option (optional)

## 2.7.1 Description

Some cancellation options can be specified using the voidOption element.

The sales report cancellation functionality is specified by the code SRP in the _indicator_ element in _voidOption,_ as shown in the example. This functionality does not perform updates of ETS/EMS coupon status or PNR elements.

The cancellation targetting TCH (Transport Clearing House, Russian organization) is specified by using the code TKP in _indicator_ element in _voidOption_. (change "SRP" by "TKP" in the example). This functionality can be done by TCH offices and triggers a TCH cancellation, please refer to specifications for more details.

## 2.7.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<voidOption> <statusInformation> <indicator>SRP</indicator> </statusInformation> </voidOption>

## 3 Receiving A Reply

The reply consists either of an error message, or of the successful cancellation of the transaction(s).

## 3.1 Sub Structure: Reply with errors

## 3.1.1 Description

In case of an error happened during ticket cancellation, _statusCode_ in _responseDetails_ is set to N instead of O in _transactionResults_. An _errorGroup_ is present, with an _errorOrWarningCodeDetails_ element specifying the code of the returned error.

The list of error codes can be found in Error section.

## 3.1.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_CancelDocumentReply xmlns="http://xml.amadeus.com/TRCANR\_14\_1\_1A"> <transactionResults> <responseDetails> <responseType>X</responseType> <statusCode>N</statusCode> </responseDetails> <ticketNumbers> <documentDetails> <number>234567898</number> </documentDetails> </ticketNumbers> <errorGroup> <errorOrWarningCodeDetails> <errorDetails> <errorCode>477</errorCode> </errorDetails> </errorOrWarningCodeDetails> <errorWarningDescription> <freeTextDetails> <textSubjectQualifier>4</textSubjectQualifier> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>INVALID FORMAT</freeText> </errorWarningDescription> </errorGroup> </transactionResults> </Ticket\_CancelDocumentReply>

* * *

## 3.2 Sub Structure: Successful reply

## 3.2.1 Description

This example shows a typical reply for a successful request.

The _responseType_ element contain the value _X_ corresponding to a cancel response. The _statusCode_ element _O_ indicates that the transaction was successfully processed. The _ticketNumbers_ (as in the example) or alternatively _sequenceNumberDetails_ elements correspond to the document number or sequence number of the document corresponding to the cancellation transaction.

Up to 99 _transactionResults_ instances, one per document, can be returned in a reply. Each instance of _transactionResults_ and therefore, each document, may have a successful or error status for the cancellation transaction.

## 3.2.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_CancelDocumentReply xmlns="http://xml.amadeus.com/TRCANR\_14\_1\_1A"> <transactionResults> <responseDetails> <responseType>X</responseType> <statusCode>O</statusCode> </responseDetails> <ticketNumbers> <documentDetails> <number>1721587458965</number> </documentDetails> </ticketNumbers> </transactionResults> </Ticket\_CancelDocumentReply>

* * *

## 4 Error Messages

The following table lists the error messages that can occur with this service.

**Error code**

**Message**

477

INVALID FORMAT

777

MUTUALLY AGREED

3517

FUNCTION NOT SUPPORTED FOR THIS AIRLINE

5458

NOT AUTHORISED

6145

OK - DOCUMENT(S) CANCELLED 

6147

REJECTED - DOCUMENT NOT ON DATABASE

6149

REJECTED - INVALID DOCUMENT TYPE FOR

6150

REJECTED - DOCUMENT ALREADY CANCELLED

6243

DOCUMENT CANCELLATION PROHIBITED

6485

SELECT FA OR FH PNR LINE NUMBER

6522

REJECTED - DUPLICATES EXIST - USE DATA SEQUENCE NUMBER

7112  

NO PNR PRESENT IN AAA

7116

NEED FA/FH ELEMENT

9197

PNR IN AAA NOT ASSOCIATED TO ETKT RECORD

9198

PNR MUST BE UNMODIFIED FOR ETKT VOID 

9956

UNABLE TO PROCESS - MAXIMUM 20 TRANSACTIONS PER ENTRY

9964

UNABLE TO PROCESS - NOT MORE THAN 4 COMPONENTS

10006

REJECTED - USE TWX OR TWX/N FROM ET RECORD

23351

DOCUMENT NOT AVAILABLE FOR CANCELLATION REQUEST

23803

MIXED TICKET TYPES NOT ALLOWED

24352

UNABLE TO PROCESS – DOCUMENT RETRIEVAL FAILED

29125

TRDC/SR ENTRY NOT AUTHORIZED

29126

OK – DOCUMENT CANCELLED IN SALES REPORT                  

29127

DOCUMENT NOT AVAILABLE FOR /SR OPTION              

In case of an error, _statusCode_ in _responseDetails_ is set to N instead of O in _transactionResults_ of transaction reply. An _errorGroup_ is then present, with an _errorOrWarningCodeDetails_ element specifying the code of the returned error.

If an error returned by ETS/EMS, the error code is forwarded in the reply. Therefore, in this case any error code defined by IATA may be returned.

## 4.1 Error Reply

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_CancelDocumentReply xmlns="http://xml.amadeus.com/TRCANR\_14\_1\_1A"> <transactionResults> <responseDetails> <responseType>X</responseType> <statusCode>N</statusCode> </responseDetails> <ticketNumbers> <documentDetails> <number>234567898</number> </documentDetails> </ticketNumbers> <errorGroup> <errorOrWarningCodeDetails> <errorDetails> <errorCode>477</errorCode> </errorDetails> </errorOrWarningCodeDetails> <errorWarningDescription> <freeTextDetails> <textSubjectQualifier>4</textSubjectQualifier> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>INVALID FORMAT</freeText> </errorWarningDescription> </errorGroup> </transactionResults> </Ticket\_CancelDocumentReply>

  

* * *

## 5 Operations

## 5.1 Operation: Request cancellation of a transaction by ticket number

The cancellation action has been requested by an authorized agent signed in office NCE6X0100, and the ticket 1721587458965 is eligible for the cancellation.

## 5.1.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_CancelDocument xmlns="http://xml.amadeus.com/TRCANQ\_14\_1\_1A"> <documentNumberDetails> <documentDetails> <number>1721587458965</number> </documentDetails> </documentNumberDetails> <stockProviderDetails> <officeSettingsDetails> <stockProviderCode>6X</stockProviderCode> </officeSettingsDetails> </stockProviderDetails> <targetOfficeDetails> <originatorDetails> <inHouseIdentification2>NCE6X0100</inHouseIdentification2> </originatorDetails> </targetOfficeDetails> </Ticket\_CancelDocument>

## 5.1.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_CancelDocumentReply xmlns="http://xml.amadeus.com/TRCANR\_14\_1\_1A"> <transactionResults> <responseDetails> <responseType>X</responseType> <statusCode>O</statusCode> </responseDetails> <ticketNumbers> <documentDetails> <number>1721587458965</number> </documentDetails> </ticketNumbers> </transactionResults> </Ticket\_CancelDocumentReply>

## 5.1.3 Possible Errors

See "Error Messages" section.

* * *

## 5.2 Operation: Request cancellation of a transaction by ticket number associated to sales report process(TRDC/SR)

The void action has been requested by an authorized agent signed in office NCE6X0100, the ticket 1721587458965 is eligible for the void and option "sales report only" is used.

## 5.2.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_CancelDocument xmlns="http://xml.amadeus.com/TRCANQ\_14\_1\_1A"> <documentNumberDetails> <documentDetails> <number>1721587458965</number> </documentDetails> </documentNumberDetails> <voidOption> <statusInformation> <indicator>SRP</indicator> </statusInformation> </voidOption> <stockProviderDetails> <officeSettingsDetails> <stockProviderCode>6X</stockProviderCode> </officeSettingsDetails> </stockProviderDetails> <targetOfficeDetails> <originatorDetails> <inHouseIdentification2>NCE6X0100</inHouseIdentification2> </originatorDetails> </targetOfficeDetails> </Ticket\_CancelDocument>

## 5.2.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_CancelDocumentReply xmlns="http://xml.amadeus.com/TRCANR\_14\_1\_1A"> <transactionResults> <responseDetails> <responseType>X</responseType> <statusCode>O</statusCode> </responseDetails> <ticketNumbers> <documentDetails> <number>1721587458965</number> </documentDetails> </ticketNumbers> </transactionResults> </Ticket\_CancelDocumentReply>

## 5.2.3 Possible Errors

See "Error Messages" section.

* * *

## 5.3 Operation: Request cancellation of a transaction by ticket number for Travel Agent

The void action has been requested by an authorized agent signed in office FRAL12177, and the ticket 4600052609 is eligible for the void.

## 5.3.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_CancelDocument xmlns="http://xml.amadeus.com/TRCANQ\_14\_1\_1A"> <documentNumberDetails> <documentDetails> <number>4600052609</number> </documentDetails> </documentNumberDetails> <stockProviderDetails> <officeSettingsDetails> <marketIataCode>DE</marketIataCode> </officeSettingsDetails> </stockProviderDetails> <targetOfficeDetails> <originatorDetails> <inHouseIdentification2>FRAL12177</inHouseIdentification2> </originatorDetails> </targetOfficeDetails> </Ticket\_CancelDocument>

## 5.3.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_CancelDocumentReply xmlns="http://xml.amadeus.com/TRCANR\_14\_1\_1A"> <transactionResults> <responseDetails> <responseType>X</responseType> <statusCode>O</statusCode> </responseDetails> <ticketNumbers> <documentDetails> <number>4600052609</number> </documentDetails> </ticketNumbers> </transactionResults> </Ticket\_CancelDocumentReply>

## 5.3.3 Possible Errors

See "Error Messages" section.

* * *

## 5.4 Operation: Request cancellation of a transaction from query report

The void action has been requested by an authorized agent signed in office NCE6X0100, and the ticket which sequence number in query sales report is 1408, is eligible for the void.

## 5.4.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_CancelDocument xmlns="http://xml.amadeus.com/TRCANQ\_14\_1\_1A"> <sequenceNumberRanges> <itemNumberDetails> <number>1408</number> <type>FRM</type> </itemNumberDetails> </sequenceNumberRanges> <stockProviderDetails> <officeSettingsDetails> <stockProviderCode>6X</stockProviderCode> </officeSettingsDetails> </stockProviderDetails> <targetOfficeDetails> <originatorDetails> <inHouseIdentification2>NCE6X0100</inHouseIdentification2> </originatorDetails> </targetOfficeDetails> </Ticket\_CancelDocument>

## 5.4.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_CancelDocumentReply xmlns="http://xml.amadeus.com/TRCANR\_14\_1\_1A"> <transactionResults> <responseDetails> <responseType>X</responseType> <statusCode>O</statusCode> </responseDetails> <sequenceNumberDetails> <itemNumberDetails> <number>1408</number> </itemNumberDetails> </sequenceNumberDetails> <ticketNumbers> <documentDetails> <number>1721587458965</number> </documentDetails> </ticketNumbers> </transactionResults> </Ticket\_CancelDocumentReply>

## 5.4.3 Possible Errors

See Error Messages section.

* * *

## 5.5 Operation: Request cancellation of several tickets, individual items and ranges of items from query report

The void action has been requested by an authorized agent signed in office NCE6X0100, and the tickets which sequence number in query sales report between 1408 and 1415 are eligible for the void. The void has been requested for individual items which sequence numbers are 1408 and 1414; and for ranges of transactions with sequence numbers from 1410 to 1412.

## 5.5.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_CancelDocument xmlns="http://xml.amadeus.com/TRCANQ\_14\_1\_1A"> <sequenceNumberRanges> <itemNumberDetails> <number>1408</number> <type>FRM</type> </itemNumberDetails> </sequenceNumberRanges> <sequenceNumberRanges> <itemNumberDetails> <number>1410</number> <type>FRM</type> </itemNumberDetails> <itemNumberDetails> <number>1412</number> <type>TO</type> </itemNumberDetails> </sequenceNumberRanges> <sequenceNumberRanges> <itemNumberDetails> <number>1414</number> <type>FRM</type> </itemNumberDetails> </sequenceNumberRanges> <stockProviderDetails> <officeSettingsDetails> <stockProviderCode>6X</stockProviderCode> </officeSettingsDetails> </stockProviderDetails> <targetOfficeDetails> <originatorDetails> <inHouseIdentification2>NCE6X0100</inHouseIdentification2> </originatorDetails> </targetOfficeDetails> </Ticket\_CancelDocument>

## 5.5.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_CancelDocumentReply xmlns="http://xml.amadeus.com/TRCANR\_14\_1\_1A"> <transactionResults> <responseDetails> <responseType>X</responseType> <statusCode>O</statusCode> </responseDetails> <sequenceNumberDetails> <itemNumberDetails> <number>1408</number> <type>FRM</type> </itemNumberDetails> </sequenceNumberDetails> <ticketNumbers> <documentDetails> <number>1721587458965</number> </documentDetails> </ticketNumbers> </transactionResults> <transactionResults> <responseDetails> <responseType>X</responseType> <statusCode>O</statusCode> </responseDetails> <sequenceNumberDetails> <itemNumberDetails> <number>1410</number> <type>FRM</type> </itemNumberDetails> </sequenceNumberDetails> <ticketNumbers> <documentDetails> <number>1721587458970</number> </documentDetails> </ticketNumbers> </transactionResults> <transactionResults> <responseDetails> <responseType>X</responseType> <statusCode>O</statusCode> </responseDetails> <sequenceNumberDetails> <itemNumberDetails> <number>1411</number> <type>FRM</type> </itemNumberDetails> </sequenceNumberDetails> <ticketNumbers> <documentDetails> <number>1721587458977</number> </documentDetails> </ticketNumbers> </transactionResults> <transactionResults> <responseDetails> <responseType>X</responseType> <statusCode>O</statusCode> </responseDetails> <sequenceNumberDetails> <itemNumberDetails> <number>1412</number> <type>FRM</type> </itemNumberDetails> </sequenceNumberDetails> <ticketNumbers> <documentDetails> <number>1721587458980</number> </documentDetails> </ticketNumbers> </transactionResults> <transactionResults> <responseDetails> <responseType>X</responseType> <statusCode>O</statusCode> </responseDetails> <sequenceNumberDetails> <itemNumberDetails> <number>1414</number> <type>FRM</type> </itemNumberDetails> </sequenceNumberDetails> <ticketNumbers> <documentDetails> <number>1721587458981</number> </documentDetails> </ticketNumbers> </transactionResults> </Ticket\_CancelDocumentReply>

## 5.5.3 Possible Errors

See Error Messages section.

* * *

## 5.6 Operation: Request E-ticket Direct cancellation

This operation allows the end user to initiate a void transaction using E-ticket direct feature.

In the example:

E-ticket direct cancellation is initiated from TNRMG210C office on XX ailrline stock.

## 5.6.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_CancelDocument xmlns="http://xml.amadeus.com/TRCANQ\_14\_1\_1A"> <documentNumberDetails> <documentDetails> <number>2327176820</number> </documentDetails> </documentNumberDetails> <stockProviderDetails> <officeSettingsDetails> <stockProviderCode>XX</stockProviderCode> </officeSettingsDetails> </stockProviderDetails> <targetOfficeDetails> <originatorDetails> <inHouseIdentification2>TNRMG210C</inHouseIdentification2> </originatorDetails> </targetOfficeDetails> </Ticket\_CancelDocument>

## 5.6.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Ticket\_CancelDocumentReply xmlns="http://xml.amadeus.com/TRCANR\_14\_1\_1A"> <transactionResults> <responseDetails> <responseType>X</responseType> <statusCode>O</statusCode> </responseDetails> <ticketNumbers> <documentDetails> <number>2327176820</number> </documentDetails> </ticketNumbers> </transactionResults> </Ticket\_CancelDocumentReply>

## 5.6.3 Possible Errors

See "Error Messages" section.

* * *