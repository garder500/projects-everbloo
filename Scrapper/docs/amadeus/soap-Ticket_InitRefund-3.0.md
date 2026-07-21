---
url: "https://developers.amadeus.com/api-library/soap/functional-doc/2424/doc-read/3017?serviceVersion=3.0"
download_url: "https://developers.amadeus.com/PAS-EAS/api/download/comp/4d4ad2cb456c02633f463a055ab70584/3017/upload_4569234466471833144.html"
title: "HTML_UG_WBS_Ticket_InitRefund_03.0_020"
source: "amadeus"
service_id: "2424"
service_name: "Ticket_InitRefund"
version: "3.3"
document_id: "3017"
doc_version: "3.0"
doc_type: "User guide"
file_format: "HTML"
scraped_at: "2026-07-15T10:47:51.774Z"
---
# Function: Ticket\_InitRefund

* * *

## 1 Overview

Ticket\_InitRefund initiates refunds on several documents via a single query/response.

## 1.1 Supported Operations

**For air use-cases,** the data in the refund panel can be obtained, depending on the type and availability of documents, in one of the following ways:

-   Filled in from the Amadeus sales reporting database
-   Filled in from the e-ticket (or EMD) server data
-   Left blank, for the agent to fill in the refund data manually

Once retrieved, the agent can update, process or ignore the initiated refund transaction.

It is also possible to include the following refund options in an InitRefund request:

-   Tax refund
-   Cover refund
-   Zero refund
-   Hold for future use refund
-   Involuntary refund
-   ATC Refund

**For rail use-cases,** global refund or refund per bound is possible. Refund conditions are searched for all the corresponding rail segments in the PNR provided they are still in a 'ticketed' status, i.e. that they have not been voided, exchanged or already refunded.

This Initrefund request can be applied with the following operations:

-   InitRefund for all PNR
-   InitRefund for a bound
-   InitRefund for a single trip journey
-   InitRefund for a round trip journey
-   InitRefund for a mono passenger PNR
-   InitRefund for a multiple passengers PNR
-   InitRefund specifying a refund reason
-   InitRefund specifying a refund remark
-   InitRefund specifying a form of identification
-   InitRefund specifying a service provider

## 1.2 Limitations

-   EMDs (Electronic Miscellaneous Document) and E-tickets may not be mixed in the same transaction
-   Maximum of 32 documents are allowed per query
-   Redemption and Loyalty tickets are out of scope for multi-documents use-cases

## 1.3 Unsupported Operations

**For air use-cases only:**

-   Mixing E-tickets and EMDs within the same query is not supported

**For rail use-cases only:**

Unsupported operations include:

-   Partial refund per passenger is not possible  
    
-   InitRefund for part of a bound
-   InitRefund for part of the passengers
-   InitRefund for part of a ticket

## 1.4 Prerequisites

**For rail use-cases only:**

Here are conditions needed to initiate a refund (except Refund without 1A PNR):

-   Committed PNR on Amadeus side with confirmed and ticketed Rail segments
-   PNR in context on Amadeus side

## 2 Building A Query

The query needs to specify either:

-   "Number" attribute of each <Contract> element:
    -   **For air contracts:** (3 digits validating carrier code, followed by the 10 digits primary ticket form, ex:1801234567890). No dash, or check digits are expected
    -   **For rail contracts:** a number from 1 to 13 digits is supported. No dash, or check digits are expected

For PNR context only, one of the following:  

-   "Tattoo" attribute of each <Contract> element. It corresponds to PNR identifier of FA (line of the PNRcontaining the ticket number) elements
-   <AllContracts> element. Presence of this element indicates a refund should be initiated on each document ticketed in the PNR. It applies in PNR context only
-   "Tattoo" attributes of each <Passenger> in the PNR for which a refund should be initiated

**Moreover for rail contracts:** if no PNR context is present, the following elements must be present:

-   <StockProvider> element with both its attributes:
    -   "StockTypeCode", 1 or 2 letter code corresponding to the stock type, e.g. "R" for Rail
    -   "StockProviderCode", 3 letter code defining the stock provider
-   <AdditionalDataList> list which contains <AdditionalData> elements. <AdditionalData> element has to contain:
    -   <Data> element (just one element is allowed in fact multi-PNR is not supported) with its attributes:
        -   "Key": the name of the data, e.g. RLOC
        -   "Value": the value which refers to the key, tipically the external record locator

**For air use-cases,** Refund options should be specified within <ActionDetails> element:

-   EMD indicator EMD refunds.
-   ATC indicator for ATC refund:
    -   In ATC Refund, <CurrencyOverride> element can be encoded to have refund a initiated in another currency (compared to a default currency)
-   ATI indicator for Involuntary ATC refund
-   COV indicator for cover refund
-   I indicator for involuntary refund
-   RTF indicator for hold for future use option
-   NRP indicator for not reported refund
-   NRF to bypass non refundable indicators

**For rail use-cases,** the following element can be encoded:

-   **<PassengersDocument>** contains a list of <PassengerDocument> elements

  This element allows the user to indicate a form of identification information:

-   "DocType" attribute for the type of identification

-   "DocID" for the ID number

This element allows you to specify a <ReasonCode> for the refund conditions request ("Code" attribute):

-   **<ReasonCode>**

This element allows you to specify a freeflow remark to indicate additional information related to the refund:

-   **<RefundRemark>**

## 3 Receiving A Reply

AMA\_TicketInitRefundRS root element contains the following information:

-   **<GeneralReply>:** Contains either a <Success> or <Errors> element regarding the general outcome of the transaction.
-   **<FunctionalData>:** Contains details about each contract bundle. A contract bundle can be in error or success without impacting the outcome of the whole transaction.

In this document, a contract bundle refers to refund sub-context:

-   It corresponds to a single document within a multi-document refund transaction for air use-cases. 
-   In rail use-cases, a single contract bundle is constructed per rail provider.

At initiate refund, several contract bundles are created, and each of them will evolve independently from the others.

## 3.1 Sub Structure: Commission

## 3.1.1 Description

This structure contains details of an agent's commission at refund time. It is encoded as follows:

-   "Percent" attribute contains the commission rate
-   "Type" attribute of <UniqueID> element contains the type of commission
-   <ComissionPayableAmount> contains the payable amount of commission (attributes "Amount", "DecimalPlaces" and "CurrencyCode")

## 3.1.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Commission Percent="48"> <UniqueID ID="1" Type="XLP"></UniqueID> <ComissionPayableAmount Amount="12300" CurrencyCode="EUR" DecimalPlaces="2"></ComissionPayableAmount> </Commission>

* * *

## 3.2 Sub Structure: Contract

## 3.2.1 Description

This structure contains all information related to the contract (document to refund), including refund amounts. The main elements are the following:

-   <Segments> contains identifiers of refunded segments (rail use-case)
-   <Passengers>, for each passenger, full name is encoded within <FullName> element. Breakdown between first name and last name is also provided when available: <FirstName> and <LastName> elements. Also, in PNR context, identifier of the passenger is encoded.
-   <Seats> contains identifiers of associated seats (rail use-cases only)
-   <AncillaryServices> contains identifiers of ancillary services (rail use-cases only)
-   <Taxes> contains a list of <Tax> elements
-   <Fees> contains a list of <Fee> elements
-   <Penalties> contains a  list of <Penalty> elements
-   <Commissions> contains a  list of <Commission> elements
-   <MonetaryInformations> contains a list of refund related amounts. Each <MonetaryInformations> element has the following attributes:
    -   "Amount": amount without decimals. It can also contain the amount with its decimals in case DecimalPlaces is not encoded (like amounts related to miles for instance).
    -   "CurrencyCode"
    -   "DecimalPlaces": number of decimals of the amount
    -   "Qualifier": it identifies the <MonetaryInformation> element. Possible values are:
        -   B - Base Fare
        -   NR - Net Remit
        -   RFU - Fare Used
        -   FRF - Fare Refund
        -   RFT - Refund Total
        -   TXT - Tax total amount
        -   TP - Tax paid
        -   RFA - Total Refundable
        -   PFP - Published Fare Paid
        -   PFU - Published Fare Used
        -   PFR - Published Fare Refund
        -   NFP - Net Fare Paid
        -   NFR - Net Fare Refund
        -   SFP - Selling Fare Paid
        -   SFU - Selling Fare Used
        -   SFR - Selling Fare Refund
        -   SFT - Selling Refund Total
        -   MFP - Miles Fare Paid
        -   MFU - Miles Fare Used
        -   MFR - Miles Fare Refund
        -   MFT - Miles Fare Total
    -   "AmountDescription": in some cases, no amount is returned, but just a string describing the monetary information
-   <DocumentAndCouponInformation>element contains:
    -   Document's number within the attribute "Number" of the <DocumentNumber> element
    -   For each coupon, a <CouponGroup> element containing coupon related details (coupon number, coupon status, settlement authorisation)
-   <RefundRoute> contains the list of all stops (Stations) of refunded itinerary
-   <Refundable>, the presence of this element indicates that document is refundable. It has the following attributes:
    -   "Amount": refund total amount without decimals (12300 for a refund total of 123.00)
    -   "CurrencyCode": refund currency
    -   "DecimalPlaces": number of decimals (real amount is amount/10^decimal places)
-   <NonRefundable> in case document is not refundable

## 3.2.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<att:Contract xmlns:ota="http://www.opentravel.org/OTA/2003/05/OTA2010B" ID="1" IssueDate="2015-09-04"> <att:Passengers> <att:Passenger> <att:FirstName>CCC</att:FirstName> <att:LastName>TST</att:LastName> <att:FullName>TST/CCC</att:FullName> </att:Passenger> </att:Passengers> <att:Taxes> <att:Tax Amount="900" Category="H" CurrencyCode="EUR" DecimalPlaces="2" ISO\_Code="YQ"></att:Tax> <att:Tax Amount="750" Category="H" CurrencyCode="EUR" DecimalPlaces="2" ISO\_Code="OY"></att:Tax> <att:Tax Amount="824" Category="H" CurrencyCode="EUR" DecimalPlaces="2" ISO\_Code="DE"></att:Tax> <att:Tax Amount="2642" Category="H" CurrencyCode="EUR" DecimalPlaces="2" ISO\_Code="RA"></att:Tax> <att:Tax Amount="5116" Category="701" CurrencyCode="EUR" DecimalPlaces="2"> <ota:TaxDescription Name="XT"></ota:TaxDescription> </att:Tax> </att:Taxes> <att:MonetaryInformations> <att:MonetaryInformation Amount="4400" CurrencyCode="EUR" DecimalPlaces="2" Qualifier="B"></att:MonetaryInformation> <att:MonetaryInformation Amount="0" CurrencyCode="EUR" DecimalPlaces="2" Qualifier="RFU"></att:MonetaryInformation> <att:MonetaryInformation Amount="4400" CurrencyCode="EUR" DecimalPlaces="2" Qualifier="FRF"></att:MonetaryInformation> <att:MonetaryInformation Amount="9516" CurrencyCode="EUR" DecimalPlaces="2" Qualifier="RFT"></att:MonetaryInformation> <att:MonetaryInformation Amount="5116" CurrencyCode="EUR" DecimalPlaces="2" Qualifier="TXT"></att:MonetaryInformation> <att:MonetaryInformation Amount="5116" CurrencyCode="EUR" DecimalPlaces="2" Qualifier="TP"></att:MonetaryInformation> <att:MonetaryInformation Amount="0" CurrencyCode="EUR" DecimalPlaces="2" Qualifier="OBP"></att:MonetaryInformation> </att:MonetaryInformations> <att:PricingDetails> <att:PriceTicketDetails> <att:Indicator>I</att:Indicator> </att:PriceTicketDetails> </att:PricingDetails> <att:DocumentAndCouponInformation> <att:DocumentNumber Number="22024537053800"></att:DocumentNumber> <att:CouponGroup> <att:CouponInformationDetails> <att:CouponNumber>1</att:CouponNumber> <att:CouponStatus>RF</att:CouponStatus> </att:CouponInformationDetails> </att:CouponGroup> </att:DocumentAndCouponInformation> <att:RefundedRoute> <att:Station>FRA</att:Station> <att:Station>LHR</att:Station> </att:RefundedRoute> <att:Refundable Amount="9516" CurrencyCode="EUR" DecimalPlaces="2"></att:Refundable> </att:Contract>

* * *

## 3.3 Sub Structure: ContractBundle

## 3.3.1 Description

Each <ContractBundle> element contains:

-   A <Success> element if refund was successfully initiated (eventually a <Warnings> element as well)
-   Or an <Errors> element if Initiate refund was rejected for the document(s) concerned by the ContractBundle
-   <RefundDetails> if refund was successfully initiated
-   <ListDisplay> element if document has been refunded (air use-cases only)

## 3.3.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<ContractBundle ID="1"> <Success></Success> <RefundDetails> <att:RuleID> <att:ReferenceDetails> <att:Type>RID</att:Type> <att:Value>36</att:Value> </att:ReferenceDetails> </att:RuleID> <att:Contracts> <att:Contract ID="1" IssueDate="2015-09-04"> <att:Passengers> <att:Passenger> <att:FirstName>CCC</att:FirstName> <att:LastName>TST</att:LastName> <att:FullName>TST/CCC</att:FullName> </att:Passenger> </att:Passengers> <att:Taxes> <att:Tax Amount="900" Category="H" CurrencyCode="EUR" DecimalPlaces="2" ISO\_Code="YQ"></att:Tax> <att:Tax Amount="750" Category="H" CurrencyCode="EUR" DecimalPlaces="2" ISO\_Code="OY"></att:Tax> <att:Tax Amount="824" Category="H" CurrencyCode="EUR" DecimalPlaces="2" ISO\_Code="DE"></att:Tax> <att:Tax Amount="2642" Category="H" CurrencyCode="EUR" DecimalPlaces="2" ISO\_Code="RA"></att:Tax> <att:Tax Amount="5116" Category="701" CurrencyCode="EUR" DecimalPlaces="2"> <ota:TaxDescription Name="XT"></ota:TaxDescription> </att:Tax> </att:Taxes> <att:MonetaryInformations> <att:MonetaryInformation Amount="4400" CurrencyCode="EUR" DecimalPlaces="2" Qualifier="B"></att:MonetaryInformation> <att:MonetaryInformation Amount="0" CurrencyCode="EUR" DecimalPlaces="2" Qualifier="RFU"></att:MonetaryInformation> <att:MonetaryInformation Amount="4400" CurrencyCode="EUR" DecimalPlaces="2" Qualifier="FRF"></att:MonetaryInformation> <att:MonetaryInformation Amount="9516" CurrencyCode="EUR" DecimalPlaces="2" Qualifier="RFT"></att:MonetaryInformation> <att:MonetaryInformation Amount="5116" CurrencyCode="EUR" DecimalPlaces="2" Qualifier="TXT"></att:MonetaryInformation> <att:MonetaryInformation Amount="5116" CurrencyCode="EUR" DecimalPlaces="2" Qualifier="TP"></att:MonetaryInformation> <att:MonetaryInformation Amount="0" CurrencyCode="EUR" DecimalPlaces="2" Qualifier="OBP"></att:MonetaryInformation> </att:MonetaryInformations> <att:PricingDetails> <att:PriceTicketDetails> <att:Indicator>I</att:Indicator> </att:PriceTicketDetails> </att:PricingDetails> <att:DocumentAndCouponInformation> <att:DocumentNumber Number="22024537053800"></att:DocumentNumber> <att:CouponGroup> <att:CouponInformationDetails> <att:CouponNumber>1</att:CouponNumber> <att:CouponStatus>RF</att:CouponStatus> </att:CouponInformationDetails> </att:CouponGroup> </att:DocumentAndCouponInformation> <att:RefundedRoute> <att:Station>FRA</att:Station> <att:Station>LHR</att:Station> </att:RefundedRoute> <att:Refundable Amount="9516" CurrencyCode="EUR" DecimalPlaces="2"></att:Refundable> </att:Contract> </att:Contracts> <att:DateTime> <att:BusinessSemantic Code="DR"></att:BusinessSemantic> <att:StructuredDateTime> <att:Year>2015</att:Year> <att:Month>09</att:Month> <att:Day>04</att:Day> </att:StructuredDateTime> </att:DateTime> <att:DateTime> <att:BusinessSemantic Code="710"></att:BusinessSemantic> <att:StructuredDateTime> <att:Year>2015</att:Year> <att:Month>09</att:Month> <att:Day>04</att:Day> </att:StructuredDateTime> </att:DateTime> <att:FormOfPayments> <att:FormOfPayment Amount="9516" CurrencyCode="EUR" DecimalPlaces="2" ID="1" Type="CA"> <att:FreeFlow>CASH</att:FreeFlow> </att:FormOfPayment> </att:FormOfPayments> <att:ReportingOffice> <att:AgentCode>00010194</att:AgentCode> <att:OfficeID>NCELH0TKT</att:OfficeID> <att:Originator>0001AASU</att:Originator> </att:ReportingOffice> <att:TransactionCode>TKTT</att:TransactionCode> <att:ReferenceDetails> <att:ReferenceDetail> <att:Type>TKT</att:Type> <att:Value>Y</att:Value> </att:ReferenceDetail> <att:ReferenceDetail> <att:Type>DIS</att:Type> <att:Value>F</att:Value> </att:ReferenceDetail> </att:ReferenceDetails> </RefundDetails> </ContractBundle>

* * *

## 3.4 Sub Structure: Fee

## 3.4.1 Description

This structure contains information about a refund related fee (e.g. OB fee, no show fee, miscellaneous fee)

For example, in case of OB fees, this structure is encoded as follows:

-   "Category" attribute has "774" as a value
-   "Code" attribute has "B" as a value
-   "SubCategory" attribute contains the OB fee type
-   "Amount", "CurrencyCode" and "DecimalPlaces" are encoded as described in previous sections of this user guide
-   <Taxes> sub-element contains a list of <Tax> elements. Each of them contains an OB fee related tax, and it is encoded as described in the Tax substructure description.

Regarding other fees, the following information is returned:

-   "Category" attribute contains fee type
-   "Amount", "CurrencyCode" and "DecimalPlaces" are encoded as described in previous sections of this user guide

## 3.4.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fee Amount="20000" Category="NS" CurrencyCode="KRW" DecimalPlaces="2"></Fee>

* * *

## 3.5 Sub Structure: ListDisplay

## 3.5.1 Description

**For Air use-cases,** if refund is initiated on an already refunded document, the corresponding contract bundle in the response will include a <ListDisplay> element. This element will contain a list of ducuments found in CDB (Coupon Database) that have the same "Number". 

Ticket Number is encoded within the "Number" attribute of <Ticket> element.

Documents element includes the list of all documents found in CDB with the same "Number". Following information is returned for each document:

-   <SequenceNumber> of the document in CDB
-   <ReportingOffice>:
    -   <AgentCode> contains reporting offices's IATA number
    -   <OfficeID> contains Amadeus Office ID
    -   <Originator> contains the Agent's sign concatenated with the duty code
-   Reporting transaction code  within <TransactionCode\> element.
-   Document status within <DocumentStatus> element. It contains the status of the document. The status can be one of the following : 
    -   "CNF" for CONFIRMED 
    -   "PND" for PENDING 
    -   "CAN" for CANCELLED 
    -   "RFD" for REFUNDED 
    -   "UNK" for UNKNOWN
-   Passenger's full name within <FullName> sub-element of <Passenger>.

## 3.5.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_TicketInitRefundRS Version="3.000"> <GeneralReply> <Success></Success> </GeneralReply> <FunctionalData> <ContractBundle ID="1"> <Success></Success> <ListDisplay> <Ticket Number="18021000011289" Type="T"></Ticket> <Documents> <Document> <SequenceNumber> <Data Key="1"></Data> </SequenceNumber> <ReportingOffice> <AgentCode>00000000</AgentCode> <OfficeID>LAXKE08AA</OfficeID> <Originator>0001AASU</Originator> </ReportingOffice> <TransactionCode>TKTT</TransactionCode> <DocumentStatus>CNF</DocumentStatus> <Passenger Tattoo="1"> <FirstName>ISSUE</FirstName> <LastName>TEST</LastName> <FullName>TEST/ISSUE</FullName> </Passenger> </Document> <Document> <SequenceNumber> <Data Key="2"></Data> </SequenceNumber> <ReportingOffice> <AgentCode>05995872</AgentCode> <OfficeID>LAXKE08AA</OfficeID> <Originator>0001AASU</Originator> </ReportingOffice> <TransactionCode>RFND</TransactionCode> <DocumentStatus>UNK</DocumentStatus> <Passenger Tattoo="1"> <FirstName>ISSUE</FirstName> <LastName>TEST</LastName> <FullName>TEST/ISSUE</FullName> </Passenger> </Document> </Documents> </ListDisplay> </ContractBundle> </FunctionalData> </AMA\_TicketInitRefundRS>

* * *

## 3.6 Sub Structure: Penalty

## 3.6.1 Description

This substructure contains information about a penalty applied at refund time. It is encoded as follows:

-   "PenaltyType" attribute contains the type of the penalty (e.g. "CP" for cancellation penalty, "CPM" for miles cancellation penalty)
-   "Amount", "CurrencyCode" and "DecimalPlaces" are encoded as described in previous sections of this user guide. Regarding miles cancellation penalties, "DecimalPlaces" and "CurrencyCode" are not encoded
-   "PercentOrAmount" attribute has two possible values:
    -   "P" if Penalty is entered as a percentage
    -   "A" if penalty is entred directly as an amount

## 3.6.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Penalty Amount="1123.45" PenaltyType="MCP" Percent="48" PercentOrAmount="P"></Penalty>

* * *

## 3.7 Sub Structure: RefundDetails

## 3.7.1 Description

Refund information is returned in <RefundDetails> element for each contract bundle for a which refund is successfully initiated. 

For each contract bundle, main information included is the followings (if not specified, description of the element applies for both air and rail use-cases):

-   <Contracts> contains the list of <Contract> elements. A <Contract> element itself can contain the following optional elements
    -   <Segments> element contains the <Segment> element list
    -   <Passengers> element contains the <Passenger> element list

-   <TotalAmounts> element is encoded when several contracts are contained in a single contract bundle. It contains the following:
    -   <Refundable> element, contains:
        -   "Amount", "CurrencyCode" and "DecimalPlaces" attributes contain refund total for the contract bundle (sum of refund totals of all contracts)
        -   <Farerefund> element contains the sum of fare refunds
        -   <Tax> elements
        -   <Penalty> elements for penalties that apply to the contract bundle
        -   <Fee> elements for fees that apply to the contract bundle

A breakdown of the above amounts is encoded within <Contract> elements when they are available.

-    
    -   <NonRefundable> contains the sum of non-refundable amounts
-   <FormOfPayments> (air use-case)
-   <PassengersDocument> elements (rail use-case)
-   <ReasonCode> element (air use-case)
-   <ReportingOffice> element
-   Billing address within the <StructuredAddress> element
-   <LoyaltyAccount> element when Loyalty form of payment is used. <Number> and <Carrier> sub-elements are filled (air use-case)
-   <StructuredAddress>  element (air use-case), it used to convey the billing address. It is encoded as follows:
    -   <AddressLine> elements contain address details
    -   <CityName> element contains the city
    -   <PostalCode> element contains postal code
    -   <StateProv> element contains the state
    -   <CountryName> element contains the country
    -   <ContactName> element contains contact name associated with the address
    -   <PostOfficeBox> element contains the box number
    -   <CompanyName> element contains company name associated with the address

## 3.7.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<RefundDetails> <att:RuleID> <att:ReferenceDetails> <att:Type>RID</att:Type> <att:Value>36</att:Value> </att:ReferenceDetails> </att:RuleID> <att:Contracts> <att:Contract ID="1" IssueDate="2015-09-04"> <att:Passengers> <att:Passenger> <att:FirstName>CCC</att:FirstName> <att:LastName>TST</att:LastName> <att:FullName>TST/CCC</att:FullName> </att:Passenger> </att:Passengers> <att:Taxes> <att:Tax Amount="900" Category="H" CurrencyCode="EUR" DecimalPlaces="2" ISO\_Code="YQ"></att:Tax> <att:Tax Amount="750" Category="H" CurrencyCode="EUR" DecimalPlaces="2" ISO\_Code="OY"></att:Tax> <att:Tax Amount="824" Category="H" CurrencyCode="EUR" DecimalPlaces="2" ISO\_Code="DE"></att:Tax> <att:Tax Amount="2642" Category="H" CurrencyCode="EUR" DecimalPlaces="2" ISO\_Code="RA"></att:Tax> <att:Tax Amount="5116" Category="701" CurrencyCode="EUR" DecimalPlaces="2"> <ota:TaxDescription Name="XT"></ota:TaxDescription> </att:Tax> </att:Taxes> <att:MonetaryInformations> <att:MonetaryInformation Amount="4400" CurrencyCode="EUR" DecimalPlaces="2" Qualifier="B"></att:MonetaryInformation> <att:MonetaryInformation Amount="0" CurrencyCode="EUR" DecimalPlaces="2" Qualifier="RFU"></att:MonetaryInformation> <att:MonetaryInformation Amount="4400" CurrencyCode="EUR" DecimalPlaces="2" Qualifier="FRF"></att:MonetaryInformation> <att:MonetaryInformation Amount="9516" CurrencyCode="EUR" DecimalPlaces="2" Qualifier="RFT"></att:MonetaryInformation> <att:MonetaryInformation Amount="5116" CurrencyCode="EUR" DecimalPlaces="2" Qualifier="TXT"></att:MonetaryInformation> <att:MonetaryInformation Amount="5116" CurrencyCode="EUR" DecimalPlaces="2" Qualifier="TP"></att:MonetaryInformation> <att:MonetaryInformation Amount="0" CurrencyCode="EUR" DecimalPlaces="2" Qualifier="OBP"></att:MonetaryInformation> </att:MonetaryInformations> <att:PricingDetails> <att:PriceTicketDetails> <att:Indicator>I</att:Indicator> </att:PriceTicketDetails> </att:PricingDetails> <att:DocumentAndCouponInformation> <att:DocumentNumber Number="22024537053800"></att:DocumentNumber> <att:CouponGroup> <att:CouponInformationDetails> <att:CouponNumber>1</att:CouponNumber> <att:CouponStatus>RF</att:CouponStatus> </att:CouponInformationDetails> </att:CouponGroup> </att:DocumentAndCouponInformation> <att:RefundedRoute> <att:Station>FRA</att:Station> <att:Station>LHR</att:Station> </att:RefundedRoute> <att:Refundable Amount="9516" CurrencyCode="EUR" DecimalPlaces="2"></att:Refundable> </att:Contract> </att:Contracts> <att:DateTime> <att:BusinessSemantic Code="DR"></att:BusinessSemantic> <att:StructuredDateTime> <att:Year>2015</att:Year> <att:Month>09</att:Month> <att:Day>04</att:Day> </att:StructuredDateTime> </att:DateTime> <att:DateTime> <att:BusinessSemantic Code="710"></att:BusinessSemantic> <att:StructuredDateTime> <att:Year>2015</att:Year> <att:Month>09</att:Month> <att:Day>04</att:Day> </att:StructuredDateTime> </att:DateTime> <att:FormOfPayments> <att:FormOfPayment Amount="9516" CurrencyCode="EUR" DecimalPlaces="2" ID="1" Type="CA"> <att:FreeFlow>CASH</att:FreeFlow> </att:FormOfPayment> </att:FormOfPayments> <att:ReportingOffice> <att:AgentCode>00010194</att:AgentCode> <att:OfficeID>NCELH0TKT</att:OfficeID> <att:Originator>0001AASU</att:Originator> </att:ReportingOffice> <att:TransactionCode>TKTT</att:TransactionCode> <att:ReferenceDetails> <att:ReferenceDetail> <att:Type>TKT</att:Type> <att:Value>Y</att:Value> </att:ReferenceDetail> <att:ReferenceDetail> <att:Type>DIS</att:Type> <att:Value>F</att:Value> </att:ReferenceDetail> </att:ReferenceDetails> </RefundDetails>

* * *

## 3.8 Sub Structure: Tax

## 3.8.1 Description

<Tax> element contains the list of all taxes of the document to refund. It contains the following information:

-   "ISO\_Code" attribute contains tax ISO (International Organization for Standardization) code
-   "NatureCode" attribute contains a tax Nature code, if available
-   "Category" attribute contains tax type (e.g. O for Old, R for refundable)
-   "Amount" attribute amount without decimals. Or the real amount in case "DecimalPlaces" is not encoded
-   "DecimalPlaces" attribute contains the number of digits that shall be considered as decimals in the "Amount"
-   "CurrencyCode" attribute contains the currency code (e.g. EUR for Euro, USD for Dollars)
-   "CountryCode" attribute contains the country code (e.g. KR for Republic of Korea, FR for France)

## 3.8.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Tax Amount="11900" Category="H" CountryCode="KR" CurrencyCode="KRW" DecimalPlaces="2" ISO\_Code="OD"></Tax>

* * *

## 4 Error Messages

The error codes and free text messages that may be returned are listed in the refund specifications delivered to the customer.  The most commonly received errors are the following (error code and free text):

**Error code**

**Free text**

**Description**

10997

REFUND RECORD PENDING - ACTION OR IGNORE

You initiate a new refund whilst another refund is ongoing

2132

ALREADY REFUNDED

You initiate a refund on an already refunded document

21803

REFUND REJECTED - DOCUMENT NOT CONFIRMED SALE USE TRDC TO CANCEL

When refund is initiated on a pending document

11054

NEED DOCUMENT COUPONS TO REFUND

When none of documents’ coupons are eligible for a refund

7130

UNABLE TO PROCESS ETKT ERROR CODE

When an error is received for E-ticket server

Each <Error> element is encoded as follows:

-   "Type" attribute contains the same value "000"
-   "Code" attribute contains the canned message ID
-   Error text is encoded within the <Error> element

A typical error response is shown below.

## 4.1 Error Reply

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_TicketInitRefundRS xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" Version="3.000" xsi:schemaLocation="http://xml.amadeus.com/TicketGTP\_v1"> <Errors> <ama:Errors> <ama:Error Code="11054" Type="000">NEED DOCUMENT COUPONS TO REFUND</ama:Error> </ama:Errors> </Errors> </AMA\_TicketInitRefundRS>

  

* * *

## 5 Operations

## 5.1 Operation: Display an ongoing refund

Display refund information for an ongoing refund.

## 5.1.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_TicketInitRefundRQ Version="3.000" xsi:schemaLocation="http://xml.amadeus.com/2010/06/TicketGTP\_v3 AMA\_TicketInitRefundRQ.xsd"></AMA\_TicketInitRefundRQ>

## 5.1.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_TicketInitRefundRS xmlns:xsd="http://www.w3.org/2001/XMLSchema" Version="2.000"> <GeneralReply> <Success></Success> </GeneralReply> <FunctionalData> <ContractBundle ID="1"> <Success></Success> <RefundDetails> <att:RuleID> <att:ReferenceDetails> <att:Type>RID</att:Type> <att:Value>36</att:Value> </att:ReferenceDetails> </att:RuleID> <att:Contracts> <att:Contract ID="1" IssueDate="2015-09-04"> <att:Passengers> <att:Passenger> <att:FirstName>CCC</att:FirstName> <att:LastName>TST</att:LastName> <att:FullName>TST/CCC</att:FullName> </att:Passenger> </att:Passengers> <att:Taxes> <att:Tax Amount="900" Category="H" CurrencyCode="EUR" DecimalPlaces="2" ISO\_Code="YQ"></att:Tax> <att:Tax Amount="750" Category="H" CurrencyCode="EUR" DecimalPlaces="2" ISO\_Code="OY"></att:Tax> <att:Tax Amount="824" Category="H" CurrencyCode="EUR" DecimalPlaces="2" ISO\_Code="DE"></att:Tax> <att:Tax Amount="2642" Category="H" CurrencyCode="EUR" DecimalPlaces="2" ISO\_Code="RA"></att:Tax> <att:Tax Amount="5116" Category="701" CurrencyCode="EUR" DecimalPlaces="2"> <ota:TaxDescription Name="XT"></ota:TaxDescription> </att:Tax> </att:Taxes> <att:MonetaryInformations> <att:MonetaryInformation Amount="4400" CurrencyCode="EUR" DecimalPlaces="2" Qualifier="B"></att:MonetaryInformation> <att:MonetaryInformation Amount="0" CurrencyCode="EUR" DecimalPlaces="2" Qualifier="RFU"></att:MonetaryInformation> <att:MonetaryInformation Amount="4400" CurrencyCode="EUR" DecimalPlaces="2" Qualifier="FRF"></att:MonetaryInformation> <att:MonetaryInformation Amount="9516" CurrencyCode="EUR" DecimalPlaces="2" Qualifier="RFT"></att:MonetaryInformation> <att:MonetaryInformation Amount="5116" CurrencyCode="EUR" DecimalPlaces="2" Qualifier="TXT"></att:MonetaryInformation> <att:MonetaryInformation Amount="5116" CurrencyCode="EUR" DecimalPlaces="2" Qualifier="TP"></att:MonetaryInformation> <att:MonetaryInformation Amount="0" CurrencyCode="EUR" DecimalPlaces="2" Qualifier="OBP"></att:MonetaryInformation> </att:MonetaryInformations> <att:PricingDetails> <att:PriceTicketDetails> <att:Indicator>I</att:Indicator> </att:PriceTicketDetails> </att:PricingDetails> <att:DocumentAndCouponInformation> <att:DocumentNumber Number="22024537053800"></att:DocumentNumber> <att:CouponGroup> <att:CouponInformationDetails> <att:CouponNumber>1</att:CouponNumber> <att:CouponStatus>RF</att:CouponStatus> </att:CouponInformationDetails> </att:CouponGroup> </att:DocumentAndCouponInformation> <att:RefundedRoute> <att:Station>FRA</att:Station> <att:Station>LHR</att:Station> </att:RefundedRoute> <att:Refundable Amount="9516" CurrencyCode="EUR" DecimalPlaces="2"></att:Refundable> </att:Contract> </att:Contracts> <att:DateTime> <att:BusinessSemantic Code="DR"></att:BusinessSemantic> <att:StructuredDateTime> <att:Year>2015</att:Year> <att:Month>09</att:Month> <att:Day>04</att:Day> </att:StructuredDateTime> </att:DateTime> <att:DateTime> <att:BusinessSemantic Code="710"></att:BusinessSemantic> <att:StructuredDateTime> <att:Year>2015</att:Year> <att:Month>09</att:Month> <att:Day>04</att:Day> </att:StructuredDateTime> </att:DateTime> <att:FormOfPayments> <att:FormOfPayment Amount="9516" CurrencyCode="EUR" DecimalPlaces="2" ID="1" Type="CA"> <att:FreeFlow>CASH</att:FreeFlow> </att:FormOfPayment> </att:FormOfPayments> <att:ReportingOffice> <att:AgentCode>00010194</att:AgentCode> <att:OfficeID>NCELH0TKT</att:OfficeID> <att:Originator>0001AASU</att:Originator> </att:ReportingOffice> <att:TransactionCode>TKTT</att:TransactionCode> <att:ReferenceDetails> <att:ReferenceDetail> <att:Type>TKT</att:Type> <att:Value>Y</att:Value> </att:ReferenceDetail> <att:ReferenceDetail> <att:Type>DIS</att:Type> <att:Value>F</att:Value> </att:ReferenceDetail> </att:ReferenceDetails> </RefundDetails> </ContractBundle> </FunctionalData> </AMA\_TicketInitRefundRS>

## 5.1.3 Possible Errors

See "Error Messages" section.

* * *

## 5.2 Operation: Initiate an ATC Refund

Initiate an ATC (Amadeus Ticket Changer) refund on 2 tickets.

## 5.2.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_TicketInitRefundRQ Version="3.000" xsi:schemaLocation="http://xml.amadeus.com/2010/06/TicketGTP\_v3"> <Contracts> <Contract Number="1802387831496"></Contract> <Contract Number="1808580059145"></Contract> </Contracts> <ActionDetails> <ActionDetail Indicator="ATC"></ActionDetail> </ActionDetails> </AMA\_TicketInitRefundRQ>

## 5.2.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_TicketInitRefundRS Version="3.000"> <GeneralReply> <Success></Success> </GeneralReply> <FunctionalData> <ContractBundle ID="1"> <Success></Success> <RefundDetails> <att:RuleID> <att:ReferenceDetails> <att:Type>RID</att:Type> <att:Value>36</att:Value> </att:ReferenceDetails> </att:RuleID> <att:Contracts> <att:Contract ID="1" IssueDate="2015-10-01" JourneyType="INT"> <att:Segments> <att:Segment Tattoo="2"></att:Segment> </att:Segments> <att:Passengers> <att:Passenger Tattoo="1"> <att:FirstName>JG</att:FirstName> <att:LastName>JG</att:LastName> <att:FullName>JG/JG</att:FullName> </att:Passenger> </att:Passengers> <att:Taxes> <att:Tax Amount="28000" Category="R" CurrencyCode="KRW" DecimalPlaces="0" ISO\_Code="BP"></att:Tax> <att:Tax Amount="3300" Category="R" CurrencyCode="KRW" DecimalPlaces="0" ISO\_Code="YR"></att:Tax> <att:Tax Amount="28000" Category="PT" CurrencyCode="KRW" DecimalPlaces="0" ISO\_Code="BP"></att:Tax> <att:Tax Amount="3300" Category="PT" CurrencyCode="KRW" DecimalPlaces="0" ISO\_Code="YR"></att:Tax> <att:Tax Amount="31300" Category="701" CurrencyCode="KRW" DecimalPlaces="0"> <ota:TaxDescription Name="XT"></ota:TaxDescription> </att:Tax> </att:Taxes> <att:MonetaryInformations> <att:MonetaryInformation Amount="350100" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="B"></att:MonetaryInformation> <att:MonetaryInformation Amount="0" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="RFU"></att:MonetaryInformation> <att:MonetaryInformation Amount="350100" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="FRF"></att:MonetaryInformation> <att:MonetaryInformation Amount="381400" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="RFT"></att:MonetaryInformation> <att:MonetaryInformation Amount="31300" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="TXT"></att:MonetaryInformation> <att:MonetaryInformation Amount="31300" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="TP"></att:MonetaryInformation> <att:MonetaryInformation Amount="0" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="NRC"></att:MonetaryInformation> <att:MonetaryInformation Amount="3814" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="RFA"></att:MonetaryInformation> <att:MonetaryInformation Amount="377586" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="RUA"></att:MonetaryInformation> </att:MonetaryInformations> <att:PricingDetails> <att:PriceTicketDetails> <att:Indicator>I</att:Indicator> </att:PriceTicketDetails> </att:PricingDetails> <att:DocumentAndCouponInformation> <att:DocumentNumber Number="18023878314963"></att:DocumentNumber> <att:CouponGroup> <att:CouponInformationDetails> <att:CouponNumber>1</att:CouponNumber> <att:CouponStatus>RF</att:CouponStatus> </att:CouponInformationDetails> </att:CouponGroup> </att:DocumentAndCouponInformation> <att:RefundedRoute> <att:Station>GMP</att:Station> <att:Station>HND</att:Station> </att:RefundedRoute> <att:Refundable Amount="381400" CurrencyCode="KRW" DecimalPlaces="0"></att:Refundable> </att:Contract> </att:Contracts> <att:DateTime> <att:BusinessSemantic Code="DR"></att:BusinessSemantic> <att:StructuredDateTime> <att:Year>2015</att:Year> <att:Month>10</att:Month> <att:Day>01</att:Day> </att:StructuredDateTime> </att:DateTime> <att:DateTime> <att:BusinessSemantic Code="710"></att:BusinessSemantic> <att:StructuredDateTime> <att:Year>2015</att:Year> <att:Month>10</att:Month> <att:Day>01</att:Day> </att:StructuredDateTime> </att:DateTime> <att:FormOfPayments> <att:FormOfPayment Amount="381400" CurrencyCode="KRW" DecimalPlaces="0" ID="1" Type="CA"> <att:FreeFlow>CASH</att:FreeFlow> </att:FormOfPayment> </att:FormOfPayments> <att:ReportingOffice> <att:AgentCode>12345675</att:AgentCode> <att:OfficeID>SELKE0980</att:OfficeID> <att:Originator>0001AASU</att:Originator> </att:ReportingOffice> <att:TransactionCode>TKTT</att:TransactionCode> <att:ReferenceDetails> <att:ReferenceDetail> <att:Type>TKT</att:Type> <att:Value>Y</att:Value> </att:ReferenceDetail> <att:ReferenceDetail> <att:Type>DIS</att:Type> <att:Value>C</att:Value> </att:ReferenceDetail> </att:ReferenceDetails> </RefundDetails> </ContractBundle> <ContractBundle ID="2"> <Success></Success> <RefundDetails> <att:RuleID> <att:ReferenceDetails> <att:Type>RID</att:Type> <att:Value>36</att:Value> </att:ReferenceDetails> </att:RuleID> <att:Contracts> <att:Contract ID="1" IssueDate="2015-10-01" JourneyType="DOM"> <att:Segments> <att:Segment Tattoo="2"></att:Segment> </att:Segments> <att:Passengers> <att:Passenger Tattoo="1"> <att:FirstName>JG</att:FirstName> <att:LastName>JG</att:LastName> <att:FullName>JG/JG</att:FullName> </att:Passenger> </att:Passengers> <att:Taxes> <att:Tax Amount="4000" Category="R" CurrencyCode="KRW" DecimalPlaces="0" ISO\_Code="DA"></att:Tax> <att:Tax Amount="4000" Category="PT" CurrencyCode="KRW" DecimalPlaces="0" ISO\_Code="DA"></att:Tax> <att:Tax Amount="4000" Category="701" CurrencyCode="KRW" DecimalPlaces="0"> <ota:TaxDescription Name="XT"></ota:TaxDescription> </att:Tax> </att:Taxes> <att:MonetaryInformations> <att:MonetaryInformation Amount="140100" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="B"></att:MonetaryInformation> <att:MonetaryInformation Amount="0" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="RFU"></att:MonetaryInformation> <att:MonetaryInformation Amount="140100" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="FRF"></att:MonetaryInformation> <att:MonetaryInformation Amount="144100" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="RFT"></att:MonetaryInformation> <att:MonetaryInformation Amount="4000" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="TXT"></att:MonetaryInformation> <att:MonetaryInformation Amount="4000" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="TP"></att:MonetaryInformation> <att:MonetaryInformation Amount="0" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="NRC"></att:MonetaryInformation> <att:MonetaryInformation Amount="1441" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="RFA"></att:MonetaryInformation> <att:MonetaryInformation Amount="142659" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="RUA"></att:MonetaryInformation> </att:MonetaryInformations> <att:PricingDetails> <att:PriceTicketDetails> <att:Indicator>D</att:Indicator> </att:PriceTicketDetails> </att:PricingDetails> <att:DocumentAndCouponInformation> <att:DocumentNumber Number="18085800591454"></att:DocumentNumber> <att:CouponGroup> <att:CouponInformationDetails> <att:CouponNumber>1</att:CouponNumber> <att:CouponStatus>RF</att:CouponStatus> </att:CouponInformationDetails> </att:CouponGroup> </att:DocumentAndCouponInformation> <att:RefundedRoute> <att:Station>GMP</att:Station> <att:Station>PUS</att:Station> </att:RefundedRoute> <att:Refundable Amount="144100" CurrencyCode="KRW" DecimalPlaces="0"></att:Refundable> </att:Contract> </att:Contracts> <att:DateTime> <att:BusinessSemantic Code="DR"></att:BusinessSemantic> <att:StructuredDateTime> <att:Year>2015</att:Year> <att:Month>10</att:Month> <att:Day>01</att:Day> </att:StructuredDateTime> </att:DateTime> <att:DateTime> <att:BusinessSemantic Code="710"></att:BusinessSemantic> <att:StructuredDateTime> <att:Year>2015</att:Year> <att:Month>10</att:Month> <att:Day>01</att:Day> </att:StructuredDateTime> </att:DateTime> <att:FormOfPayments> <att:FormOfPayment Amount="144100" CurrencyCode="KRW" DecimalPlaces="0" ID="1" Type="CA"> <att:FreeFlow>CASH</att:FreeFlow> </att:FormOfPayment> </att:FormOfPayments> <att:ReportingOffice> <att:AgentCode>12345675</att:AgentCode> <att:OfficeID>SELKE0980</att:OfficeID> <att:Originator>0001AASU</att:Originator> </att:ReportingOffice> <att:TransactionCode>TKTT</att:TransactionCode> <att:ReferenceDetails> <att:ReferenceDetail> <att:Type>TKT</att:Type> <att:Value>Y</att:Value> </att:ReferenceDetail> <att:ReferenceDetail> <att:Type>DIS</att:Type> <att:Value>C</att:Value> </att:ReferenceDetail> </att:ReferenceDetails> </RefundDetails> </ContractBundle> </FunctionalData> </AMA\_TicketInitRefundRS>

## 5.2.3 Possible Errors

See "Error Messages" section.

* * *

## 5.3 Operation: Initiate Automated Refund

Initiate an automated refund

## 5.3.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_TicketInitRefundRQ Version="3.000" xsi:schemaLocation="http://xml.amadeus.com/2010/06/TicketGTP\_v3 AMA\_TicketInitRefundRQ.xsd"> <Contracts> <Contract Number="1808500089803"></Contract> </Contracts> </AMA\_TicketInitRefundRQ>

## 5.3.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_TicketInitRefundRS Version="3.000"> <GeneralReply> <Success></Success> </GeneralReply> <FunctionalData> <ContractBundle ID="1"> <Success></Success> <RefundDetails> <att:RuleID> <att:ReferenceDetails> <att:Type>RID</att:Type> <att:Value>36</att:Value> </att:ReferenceDetails> </att:RuleID> <att:Contracts> <att:Contract ID="1" IssueDate="2013-09-23" JourneyType="DOM"> <att:Passengers> <att:Passenger Tattoo="1"> <att:FirstName>TEST</att:FirstName> <att:LastName>MULTIREF</att:LastName> <att:FullName>MULTIREF/TEST </att:FullName> </att:Passenger> </att:Passengers> <att:Taxes> <att:Tax Amount="4000" Category="H" CurrencyCode="KRW" DecimalPlaces="0" ISO\_Code="EB"></att:Tax> <att:Tax Amount="4000" Category="701" CurrencyCode="KRW" DecimalPlaces="0"> <ota:TaxDescription Name="XT"></ota:TaxDescription> </att:Tax> </att:Taxes> <att:MonetaryInformations> <att:MonetaryInformation Amount="0" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="RFU"></att:MonetaryInformation> <att:MonetaryInformation Amount="140100" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="FRF"></att:MonetaryInformation> <att:MonetaryInformation Amount="144100" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="RFT"></att:MonetaryInformation> <att:MonetaryInformation Amount="4000" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="TXT"></att:MonetaryInformation> <att:MonetaryInformation Amount="4000" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="TP"></att:MonetaryInformation> </att:MonetaryInformations> <att:PricingDetails> <att:PriceTicketDetails> <att:Indicator>D</att:Indicator> </att:PriceTicketDetails> </att:PricingDetails> <att:DocumentAndCouponInformation> <att:DocumentNumber Number="18085000898034"></att:DocumentNumber> <att:CouponGroup> <att:CouponInformationDetails> <att:CouponNumber>1</att:CouponNumber> <att:CouponStatus>RF</att:CouponStatus> </att:CouponInformationDetails> </att:CouponGroup> </att:DocumentAndCouponInformation> <att:RefundedRoute> <att:Station>GMP</att:Station> <att:Station>PUS</att:Station> </att:RefundedRoute> <att:Refundable Amount="144100" CurrencyCode="KRW" DecimalPlaces="0"></att:Refundable> </att:Contract> </att:Contracts> <att:DateTime> <att:BusinessSemantic Code="DR"></att:BusinessSemantic> <att:StructuredDateTime> <att:Year>2003</att:Year> <att:Month>11</att:Month> <att:Day>25</att:Day> </att:StructuredDateTime> </att:DateTime> <att:DateTime> <att:BusinessSemantic Code="710"></att:BusinessSemantic> <att:StructuredDateTime> <att:Year>2013</att:Year> <att:Month>09</att:Month> <att:Day>23</att:Day> </att:StructuredDateTime> </att:DateTime> <att:FormOfPayments> <att:FormOfPayment ID="1" Type="CC"> <att:FreeFlow>CCVI4111111111111111/1215\*E00</att:FreeFlow> </att:FormOfPayment> </att:FormOfPayments> <att:ReportingOffice> <att:AgentCode>11111111</att:AgentCode> <att:OfficeID>SELKE054Z</att:OfficeID> <att:Originator>0001AASU</att:Originator> </att:ReportingOffice> <att:TransactionCode>TKTT</att:TransactionCode> <att:ReferenceDetails> <att:ReferenceDetail> <att:Type>TKT</att:Type> <att:Value>Y</att:Value> </att:ReferenceDetail> <att:ReferenceDetail> <att:Type>DIS</att:Type> <att:Value>F</att:Value> </att:ReferenceDetail> </att:ReferenceDetails> </RefundDetails> </ContractBundle> </FunctionalData> </AMA\_TicketInitRefundRS>

## 5.3.3 Possible Errors

See "Error Messages" section.

* * *

## 5.4 Operation: Initiate cover Refund

Initiate cover refund

## 5.4.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_TicketInitRefundRQ Version="3.000" xsi:schemaLocation="http://xml.amadeus.com/2010/06/TicketGTP\_v3"> <Contracts> <Contract Number="2202453950835"></Contract> </Contracts> <ActionDetails> <ActionDetail Indicator="COV"></ActionDetail> </ActionDetails> </AMA\_TicketInitRefundRQ>

## 5.4.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_TicketInitRefundRS Version="3.000"> <GeneralReply> <Success></Success> </GeneralReply> <FunctionalData> <ContractBundle ID="1"> <Success></Success> <RefundDetails> <att:RuleID> <att:ReferenceDetails> <att:Type>RID</att:Type> <att:Value>16420</att:Value> </att:ReferenceDetails> </att:RuleID> <att:Contracts> <att:Contract ID="1" IssueDate="2015-10-01"> <att:Segments> <att:Segment Tattoo="1"></att:Segment> <att:Segment Tattoo="2"></att:Segment> <att:Segment Tattoo="3"></att:Segment> </att:Segments> <att:Passengers> <att:Passenger Tattoo="2"> <att:FirstName>TWO MRS</att:FirstName> <att:LastName>PIERRE</att:LastName> <att:FullName>PIERRE/TWO MRS</att:FullName> </att:Passenger> </att:Passengers> <att:Taxes> <att:Tax Amount="12000" Category="H" CurrencyCode="EUR" DecimalPlaces="2" ISO\_Code="YQ" NatureCode="AD"></att:Tax> <att:Tax Amount="1500" Category="H" CurrencyCode="EUR" DecimalPlaces="2" ISO\_Code="OY" NatureCode="CB"></att:Tax> <att:Tax Amount="1648" Category="H" CurrencyCode="EUR" DecimalPlaces="2" ISO\_Code="DE" NatureCode="SE"></att:Tax> <att:Tax Amount="5284" Category="H" CurrencyCode="EUR" DecimalPlaces="2" ISO\_Code="RA" NatureCode="EB"></att:Tax> <att:Tax Amount="1769" Category="H" CurrencyCode="EUR" DecimalPlaces="2" ISO\_Code="GB" NatureCode="AD"></att:Tax> <att:Tax Amount="4378" Category="H" CurrencyCode="EUR" DecimalPlaces="2" ISO\_Code="UB" NatureCode="AS"></att:Tax> <att:Tax Amount="26579" Category="701" CurrencyCode="EUR" DecimalPlaces="2"> <ota:TaxDescription Name="XT"></ota:TaxDescription> </att:Tax> </att:Taxes> <att:Fees> <att:Fee Amount="3000" Category="774" Code="B" CurrencyCode="EUR" DecimalPlaces="2" SubCategory="T01"></att:Fee> </att:Fees> <att:MonetaryInformations> <att:MonetaryInformation Amount="207600" CurrencyCode="EUR" DecimalPlaces="2" Qualifier="B"></att:MonetaryInformation> <att:MonetaryInformation Amount="0" CurrencyCode="EUR" DecimalPlaces="2" Qualifier="RFU"></att:MonetaryInformation> <att:MonetaryInformation Amount="207600" CurrencyCode="EUR" DecimalPlaces="2" Qualifier="FRF"></att:MonetaryInformation> <att:MonetaryInformation Amount="237179" CurrencyCode="EUR" DecimalPlaces="2" Qualifier="RFT"></att:MonetaryInformation> <att:MonetaryInformation Amount="26579" CurrencyCode="EUR" DecimalPlaces="2" Qualifier="TXT"></att:MonetaryInformation> <att:MonetaryInformation Amount="26579" CurrencyCode="EUR" DecimalPlaces="2" Qualifier="TP"></att:MonetaryInformation> <att:MonetaryInformation Amount="3000" CurrencyCode="EUR" DecimalPlaces="2" Qualifier="OBP"></att:MonetaryInformation> </att:MonetaryInformations> <att:PricingDetails> <att:PriceTicketDetails> <att:Indicator>I</att:Indicator> </att:PriceTicketDetails> </att:PricingDetails> <att:DocumentAndCouponInformation> <att:DocumentNumber Number="22024539508350"></att:DocumentNumber> <att:CouponGroup> <att:CouponInformationDetails> <att:CouponNumber>1</att:CouponNumber> <att:CouponStatus>RF</att:CouponStatus> </att:CouponInformationDetails> </att:CouponGroup> <att:CouponGroup> <att:CouponInformationDetails> <att:CouponNumber>2</att:CouponNumber> <att:CouponStatus>RF</att:CouponStatus> </att:CouponInformationDetails> </att:CouponGroup> <att:CouponGroup> <att:CouponInformationDetails> <att:CouponNumber>3</att:CouponNumber> <att:CouponStatus>RF</att:CouponStatus> </att:CouponInformationDetails> </att:CouponGroup> </att:DocumentAndCouponInformation> <att:RefundedRoute> <att:Station>FRA</att:Station> <att:Station>LHR</att:Station> <att:Station>FRA</att:Station> <att:Station>CDG</att:Station> </att:RefundedRoute> <att:Refundable Amount="237179" CurrencyCode="EUR" DecimalPlaces="2"></att:Refundable> </att:Contract> </att:Contracts> <att:DateTime> <att:BusinessSemantic Code="DR"></att:BusinessSemantic> <att:StructuredDateTime> <att:Year>2015</att:Year> <att:Month>10</att:Month> <att:Day>01</att:Day> </att:StructuredDateTime> </att:DateTime> <att:DateTime> <att:BusinessSemantic Code="710"></att:BusinessSemantic> <att:StructuredDateTime> <att:Year>2015</att:Year> <att:Month>10</att:Month> <att:Day>01</att:Day> </att:StructuredDateTime> </att:DateTime> <att:FormOfPayments> <att:FormOfPayment Amount="237179" CurrencyCode="EUR" DecimalPlaces="2" ID="1" Type="CA"> <att:FreeFlow>CASH</att:FreeFlow> </att:FormOfPayment> </att:FormOfPayments> <att:ReportingOffice> <att:AgentCode>00010194</att:AgentCode> <att:OfficeID>NCELH0TKT</att:OfficeID> <att:Originator>0001AASU</att:Originator> </att:ReportingOffice> <att:TransactionCode>TKTT</att:TransactionCode> <att:ReferenceDetails> <att:ReferenceDetail> <att:Type>TKT</att:Type> <att:Value>Y</att:Value> </att:ReferenceDetail> <att:ReferenceDetail> <att:Type>DIS</att:Type> <att:Value>F</att:Value> </att:ReferenceDetail> </att:ReferenceDetails> </RefundDetails> </ContractBundle> </FunctionalData> </AMA\_TicketInitRefundRS>

## 5.4.3 Possible Errors

See "Error Messages" section.

* * *

## 5.5 Operation: Initiate Rail Refund

Initiate rail refund (with 1A PNR in context)

## 5.5.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_TicketInitRefundRQ Version="3.000" xsi:schemaLocation="http://xml.amadeus.com/2010/06/TicketGTP\_v3 AMA\_TicketInitRefundRQ.xsd"> <AllContracts></AllContracts> </AMA\_TicketInitRefundRQ>

## 5.5.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_TicketInitRefundRS Version="3.000"> <GeneralReply> <Success></Success> </GeneralReply> <FunctionalData> <ContractBundle Code="R.SWP" ID="1"> <Success></Success> <RefundDetails> <att:Contracts> <att:Contract ID="1" IssueDate="2014-05-23" RCI\_Reference="BC3661AC0001" Tattoo="68" Type="006"> <att:Segments> <att:Segment Tattoo="1"></att:Segment> <att:Segment Tattoo="2"></att:Segment> </att:Segments> <att:Passengers> <att:Passenger Tattoo="1"> <att:FirstName>MARIO MR</att:FirstName> <att:LastName>ROSSI</att:LastName> <att:FullName>ROSSI MARIO MR</att:FullName> </att:Passenger> </att:Passengers> <att:Seats> <att:Seat Tattoo="13"></att:Seat> <att:Seat Tattoo="16"></att:Seat> </att:Seats> <att:Taxes> <att:Tax Amount="11525" Category="R" CurrencyCode="SEK" DecimalPlaces="2"></att:Tax> <att:Tax Amount="0" Category="701" CurrencyCode="SEK" DecimalPlaces="0"> <ota:TaxDescription Name="XT"></ota:TaxDescription> </att:Tax> </att:Taxes> <att:Fees> <att:Fee Amount="0" Category="RMF" CurrencyCode="SEK" DecimalPlaces="0"></att:Fee> </att:Fees> <att:Penalties> <att:Penalty Amount="0" CurrencyCode="SEK" DecimalPlaces="0" PenaltyType="CP" PercentOrAmount="A"></att:Penalty> </att:Penalties> <att:MonetaryInformations> <att:MonetaryInformation Amount="124000" CurrencyCode="SEK" DecimalPlaces="2" Qualifier="B"></att:MonetaryInformation> <att:MonetaryInformation Amount="1240" CurrencyCode="SEK" DecimalPlaces="0" Qualifier="RFT"></att:MonetaryInformation> <att:MonetaryInformation Amount="115" CurrencyCode="SEK" DecimalPlaces="0" Qualifier="TXT"></att:MonetaryInformation> <att:MonetaryInformation Amount="0" CurrencyCode="SEK" DecimalPlaces="0" Qualifier="TP"></att:MonetaryInformation> </att:MonetaryInformations> <att:DeliveryMethod DistributionType="004"></att:DeliveryMethod> <att:DocumentAndCouponInformation> <att:DocumentNumber Number="00000000000009"></att:DocumentNumber> <att:CouponGroup> <att:CouponInformationDetails> <att:CouponNumber>1</att:CouponNumber> <att:CouponStatus>RF</att:CouponStatus> </att:CouponInformationDetails> </att:CouponGroup> <att:CouponGroup> <att:CouponInformationDetails> <att:CouponNumber>2</att:CouponNumber> <att:CouponStatus>RF</att:CouponStatus> </att:CouponInformationDetails> </att:CouponGroup> </att:DocumentAndCouponInformation> <att:Refundable Amount="1240" CurrencyCode="SEK" DecimalPlaces="0"></att:Refundable> </att:Contract> </att:Contracts> <att:TotalAmounts> <att:Refundable Amount="1240" CurrencyCode="SEK" DecimalPlaces="0"> <att:Penalty Amount="0" CurrencyCode="SEK" DecimalPlaces="0"></att:Penalty> <att:Fee Amount="0" CurrencyCode="SEK" DecimalPlaces="0"></att:Fee> </att:Refundable> <att:NonRefundable Amount="0" CurrencyCode="SEK" DecimalPlaces="0"></att:NonRefundable> </att:TotalAmounts> <att:DateTime> <att:BusinessSemantic Code="DR"></att:BusinessSemantic> <att:StructuredDateTime> <att:Year>2014</att:Year> <att:Month>04</att:Month> <att:Day>04</att:Day> </att:StructuredDateTime> </att:DateTime> <att:ReasonCode Code="002"></att:ReasonCode> <att:ReportingOffice> <att:AgentCode>80211585</att:AgentCode> <att:OfficeID>STOS12101</att:OfficeID> <att:Originator>0001AASU</att:Originator> </att:ReportingOffice> <att:ReferenceDetails> <att:ReferenceDetail> <att:Type>TKT</att:Type> <att:Value>N</att:Value> </att:ReferenceDetail> </att:ReferenceDetails> </RefundDetails> </ContractBundle> </FunctionalData> </AMA\_TicketInitRefundRS>

## 5.5.3 Possible Errors

See "Error Messages" section.

* * *

## 5.6 Operation: Initiate Rail Refund without 1A PNR

Refund rail contracts without being in 1A PNR context. In this case the <AdditionalDataList> element structure must be filled.

## 5.6.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_TicketInitRefundRQ Version="3.000" xsi:schemaLocation="http://xml.amadeus.com/2010/06/TicketGTP\_v3 AMA\_TicketInitRefundRQ.xsd"> <Contracts> <Contract Number="461768425"></Contract> </Contracts> <StockProvider StockProviderCode="FRR" StockTypeCode="R"></StockProvider> <AdditionalDataList> <AdditionalData> <att:Data Key="RLOC" Value="TKHAFP"></att:Data> </AdditionalData> </AdditionalDataList> </AMA\_TicketInitRefundRQ>

## 5.6.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_TicketInitRefundRS Version="3.000"> <GeneralReply> <Success></Success> </GeneralReply> <FunctionalData> <ContractBundle Code="R.FRR" ID="1"> <Success></Success> <RefundDetails> <att:Contracts> <att:Contract ID="1" Tattoo="1"> <att:Passengers> <att:Passenger> <att:FirstName>DummyFirst</att:FirstName> <att:LastName>DummyLast</att:LastName> <att:FullName>DummyLast/DummyFirst</att:FullName> </att:Passenger> </att:Passengers> <att:Taxes> <att:Tax Amount="0" Category="701" CurrencyCode="EUR" DecimalPlaces="2"> <ota:TaxDescription Name="XT"></ota:TaxDescription> </att:Tax> </att:Taxes> <att:Fees> <att:Fee Amount="0" Category="RMF" CurrencyCode="EUR" DecimalPlaces="2"></att:Fee> </att:Fees> <att:Penalties> <att:Penalty Amount="0" CurrencyCode="EUR" DecimalPlaces="2" PenaltyType="CP" PercentOrAmount="A"></att:Penalty> </att:Penalties> <att:MonetaryInformations> <att:MonetaryInformation Amount="12800" CurrencyCode="EUR" DecimalPlaces="2" Qualifier="FRF"></att:MonetaryInformation> <att:MonetaryInformation Amount="12800" CurrencyCode="EUR" DecimalPlaces="2" Qualifier="RFT"></att:MonetaryInformation> <att:MonetaryInformation Amount="0" CurrencyCode="EUR" DecimalPlaces="2" Qualifier="TXT"></att:MonetaryInformation> <att:MonetaryInformation Amount="0" CurrencyCode="EUR" DecimalPlaces="2" Qualifier="TP"></att:MonetaryInformation> </att:MonetaryInformations> <att:DocumentAndCouponInformation> <att:DocumentNumber Number="00004617684259"></att:DocumentNumber> </att:DocumentAndCouponInformation> <att:Refundable Amount="12800" CurrencyCode="EUR" DecimalPlaces="2"></att:Refundable> </att:Contract> </att:Contracts> <att:TotalAmounts> <att:Refundable Amount="12800" CurrencyCode="EUR" DecimalPlaces="2"> <att:Penalty Amount="0" CurrencyCode="EUR" DecimalPlaces="2"></att:Penalty> <att:Fee Amount="0" CurrencyCode="EUR" DecimalPlaces="2"></att:Fee> </att:Refundable> <att:NonRefundable Amount="0" CurrencyCode="EUR" DecimalPlaces="2"></att:NonRefundable> </att:TotalAmounts> <att:DateTime> <att:BusinessSemantic Code="DR"></att:BusinessSemantic> <att:StructuredDateTime> <att:Year>2015</att:Year> <att:Month>09</att:Month> <att:Day>30</att:Day> </att:StructuredDateTime> </att:DateTime> <att:ReasonCode Code="002"></att:ReasonCode> <att:ReportingOffice> <att:AgentCode>00068445</att:AgentCode> <att:OfficeID>PAR1A098I</att:OfficeID> <att:Originator>0001AASU</att:Originator> </att:ReportingOffice> <att:ReferenceDetails> <att:ReferenceDetail> <att:Type>TKT</att:Type> <att:Value>N</att:Value> </att:ReferenceDetail> </att:ReferenceDetails> </RefundDetails> </ContractBundle> </FunctionalData> </AMA\_TicketInitRefundRS>

## 5.6.3 Possible Errors

See "Error Messages" section.

* * *