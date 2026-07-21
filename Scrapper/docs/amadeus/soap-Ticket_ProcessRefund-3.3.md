---
url: "https://developers.amadeus.com/api-library/soap/functional-doc/2426/doc-read/9636?serviceVersion=3.3"
download_url: "https://developers.amadeus.com/PAS-EAS/api/download/comp/4d4ad2cb456c02633f463a055ab70584/9636/upload_5546489615797941047.html"
title: "HTML_UG_WBS_Ticket_ProcessRefund_ _03.3"
source: "amadeus"
service_id: "2426"
service_name: "Ticket_ProcessRefund"
version: "3.3"
document_id: "9636"
doc_version: "3.3"
doc_type: "User guide"
file_format: "HTML"
scraped_at: "2026-07-15T10:48:15.965Z"
---
# Function: Ticket\_ProcessRefund

* * *

## 1 Overview

The function Ticket\_ProcessRefund allows the end user to process a previously retrieved refund record. This refund record must have been previously retrieved using Ticket\_InitRefund.  
  

## 1.1 Supported Operations

Ticket\_ProcessRefund confirms the refund corresponding to the refund conditions previously obtained with Ticket\_InitRefund.

The following operations are supported:

-   Process Refund
-   Process Refund Pending Payment Retry - Light ticketing only
-   Process Refund specifying form of payment - rail only

**For rail**, Ticket\_ProcessRefund by default uses the form of payment stored in the <FormOfPayment> element, assuming that the passengers to be refunded and the segments are associated with this element. You can specify a different form of payment in the query if it is required, or if the <FormOfPayment> element is no longer present in the PNR.

**For Light Ticketing refund**, the presence of the <PendingPaymentRetry> element in the request message triggers the 'pending retry' flow when the refund payment is in pending state.

## 1.2 Limitations

The following limitations apply to rail only:

-   A different form of payment, than the one used at issuance time, may not be possible. This depends on the rail provider's policy.
-   Only cash and credit card forms of payment can be specified in process refund operation.
-   Ticket\_ProcessRefund operation is rejected if Ticket\_InitRefund results in some tickets not being refundable. You must repeat Ticket\_InitRefund for the tickets marked as refundable.

## 1.3 Unsupported Operations

Not applicable

## 1.4 Prerequisites

Refund record previously initiated by Ticket\_InitRefund.

In addition, for rail only, the following prerequisites apply as well:

-   Committed PNR on Amadeus side with confirmed and ticketed rail segments. Note that this is not required for refunds without PNR context (standalone refunds)
-   If not provided in input, the refund form of payment must be associated with the passengers and segments
-   PNR must exist on the Amadeus server, except for standalone refunds
-   The operation Ticket\_InitRefund must have been performed
-   All selected tickets are refundable

For Light ticketing use-cases: 

-   Amadeus PNR must be present in agent context
-   The operation Ticket\_InitRefund has been performed or a refund record in pending payment state already exists.

## 2 Building A Query

AMA\_TicketProcessRefundRQ query uses the following elements:

-   <ActionDetails> which contains the attribute "Indicator", for example "IRN", inhibit refund notice
-   <RefundNoticeDestination> to force refund notice to be sent by <Email> or <Fax>
-   Refund <FormofPayments> applies to rail only
-   Refund <PendingPaymentRetry> applies to Light ticketing use cases only

## 2.1 Sub Structure: ActionDetails

## 2.1.1 Description

This structure, within the attribute "Indicator", allows you to specify some options of the Ticket\_ProcessRefund function (e.g. "IRN" for inhibit refund notice).

## 2.1.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<ActionDetails> <ActionsDetail Indicator="IRN"></ActionsDetail> </ActionDetails>

## 2.2 Sub Structure: AdditionalDataList

## 2.2.1 Description

This structure contains additional data that refer to the current refund transaction. It can be used to encode data of the contract that has to be associated to the Penalty to Collect if that is present in the refund transaction:

<AdditionalData> within <AdditionalDataList> has to be encoded has follows:

-   <att:Data> to be encoded with the following attributes:
    -   "Key" : unique identifier corresponding to the current contract of penalty
    -   "Value" : number of the contract of penalty
    -   "Type" : type of the contract of penalty (currently only EMD type is supported)
-   <att:Qualifier> (within <att:Qualifiers) to be encoded with the following attribute:
    -   "RPH" : reference to the ContractBundle ID to which the contract of penalty is associated to

## 2.2.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AdditionalDataList xmlns:att="http://xml.amadeus.com/2010/06/TicketTypes\_v2"> <AdditionalData> <att:Data Key="1" Type="EMD" Value="1300987654321"></att:Data> <att:Qualifiers> <att:Qualifier RPH="1"></att:Qualifier> </att:Qualifiers> </AdditionalData> </AdditionalDataList>

## 2.3 Sub Structure: FormOfPayment - Rail Only

## 2.3.1 Description

This structure indicates the form of payment to refund. It should contain free flow text.

There are three possible types:

-   DirectBill:  No further information needs to be provided. The travel agency collects the money and is then invoiced by the rail providers.
-   Cash: As above
-   PaymentCard: Provide complete details of payment in the <FreeFliow> element

For credit cards, the complete form of payment description should be provided in FreeFlow element.

<FormOfPayment> can include the following attributes:

-   "Amount": Refund amount
-   "CurrencyCode": ISO currency code
-   "DecimalPlaces": Number of decimal places to apply to the amount.

Note: if "DecimalPlaces" is empty, the amount is as shown in the attribute.

The example below shows an amount of "11050" with decimal places "2". This corresponds to 110.50 .

## 2.3.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<FormOfPayments> <FormOfPayment Amount="11050" CurrencyCode="EUR" DecimalPlaces="2"> <FreeFlow>Cash</FreeFlow> </FormOfPayment> </FormOfPayments>

## 2.4 Sub Structure: PendingPaymentRetry - Light Ticketing Only

## 2.4.1 Description

This structure indicates that a process refund pending payment retry is requested for the Light ticketing provider specified in input.

This <PendingPaymentRetry> is needed in the request when the Light Ticketing refund is in pending state (due to a pending payment). **The presence of this element triggers the 'pending payment retry' flow.**

<PendingPaymentRetry> has to be encoded as follows: 

-   <Provider> to be encoded with following attribute: 
    -   Code: 2 letter provider code (validating carrier)

## 2.4.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PendingPaymentRetry> <Provider Code="4U"></Provider> </PendingPaymentRetry>

## 2.5 Sub Structure: RefundNoticeDestination

## 2.5.1 Description

This structure contains the means by which the refund notice is sent.

## 2.5.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<RefundNoticeDestinations> <RefundNoticeDestination> <Email>user@amadeus.com</Email> </RefundNoticeDestination> </RefundNoticeDestinations>

## 3 Receiving A Reply

AMA\_TicketProcessRefundRS root element contains the following:

-   **<GeneralReply>:** Contains either a <Success> or <Errors> element returning the general outcome of the transaction
-   **<FunctionalData>:** Contains details about each contract bundle. A contract bundle can be in <Errors> or <Success> without impacting the outcome of the whole transaction

A contract bundle refers to the following:

-   A single document within a multi-document refund transaction for  air
-   For rail, a single contract bundle per rail provider

## 3.1 Sub Structure: Commission

## 3.1.1 Description

This structure contains the information relating the commission applied at refund time. The main elements are the following:

-   "Percent": Indicates the commission rate
-   <UniqueID>: Indentifies the recipient of the commission. The main attributes are:
    -   "Type": Indicates the commission type
    -   "ID": Unique identifying value assigned by the system
-   <ComissionPayableAmount> : Indicates the commission's payable amount (Attributes are "Amount", "DecimalPlaces" and "CurrencyCode" and are described in previous sections of this User's Guide)

## 3.1.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Commission Percent="48"> <UniqueID ID="1" Type="XLP"></UniqueID> <ComissionPayableAmount Amount="12300" CurrencyCode="EUR" DecimalPlaces="2"></ComissionPayableAmount> </Commission>

* * *

## 3.2 Sub Structure: Contract

## 3.2.1 Description

This structure contains all information related to the contract, including refund amounts. The main elements are as follows:

-   <Segments>: Contains the tattoos (identifiers) of the refunded segments
-   <Passengers>: Contains a list of <Passenger> element. Each <Passenger> contains:  
    -   <FullName>
    -   <FirstName
    -   <LastName>
    -   <Tattoo>, which corresponds to the passenger identifier when the PNR is in the context
-   <Seats>: Contains a list of <Seat> identified by a "Tattoo" (rail only)
-   <AncillaryServices>: Contains a list of <AncillaryService> identified by a "Tattoo" (rail only)
-   <Taxes>: Contains a list of <Tax> elements - See section 3.4 Tax
-   <Fees>: Contains a list of <Fee> elements - See section 3.5 Fee
-   <Penalties>: Contains a list of <Penalty> elements - See section 3.6 Penalty
-   <Commissions>: Contains a  list of <Commission> elements - See section 3.7 Commission
-   <MonetaryInformations>: Contains a list of refund related amounts. Each <MonetaryInformation> element has the following attributes:
    -   "Amount": Amount without decimals. Can also contain the amount with its decimals in case DecimalPlaces is not encoded (like amounts related to miles for instance)
    -   "CurrencyCode": ISO currency code
    -   "DecimalPlaces": Number of decimals of the amount
    -   "Qualifier": Identifies the <MonetaryInformation> element. Exampels of possible values are B (base fare), RFU (fare used), RFT (refund total)
    -   "AmountDescription": In some cases, no amount is returned, but a string describing the MonetaryInformation (exp: IT for ITBT tickets)
-   <Refundable>: the presence of this element indicates that document is refundable. It has the following attributes:
    -   "Amount": Refund amount
    -   "CurrencyCode": ISO currency code
    -   "DecimalPlaces": Number of decimal places to apply to the amount (if empty the amount is as shown in the attribute)
-   <NonRefundable> : in case document is not refundable

## 3.2.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<att:Contract xmlns:ota="http://www.opentravel.org/OTA/2003/05/OTA2010B" ID="1" IssueDate="2015-10-01" JourneyType="DOM" Status="Refunded"> <att:Segments> <att:Segment Tattoo="2"></att:Segment> </att:Segments> <att:Passengers> <att:Passenger Tattoo="1"> <att:FirstName>JG</att:FirstName> <att:LastName>JG</att:LastName> <att:FullName>JG/JG</att:FullName> </att:Passenger> </att:Passengers> <att:Taxes> <att:Tax Amount="4000" Category="R" CurrencyCode="KRW" DecimalPlaces="0" ISO\_Code="DA"></att:Tax> <att:Tax Amount="4000" Category="PT" CurrencyCode="KRW" DecimalPlaces="0" ISO\_Code="DA"></att:Tax> <att:Tax Amount="4000" Category="701" CurrencyCode="KRW" DecimalPlaces="0"> <ota:TaxDescription Name="XT"></ota:TaxDescription> </att:Tax> </att:Taxes> <att:MonetaryInformations> <att:MonetaryInformation Amount="140100" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="B"></att:MonetaryInformation> <att:MonetaryInformation Amount="0" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="RFU"></att:MonetaryInformation> <att:MonetaryInformation Amount="140100" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="FRF"></att:MonetaryInformation> <att:MonetaryInformation Amount="144100" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="RFT"></att:MonetaryInformation> <att:MonetaryInformation Amount="4000" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="TXT"></att:MonetaryInformation> <att:MonetaryInformation Amount="4000" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="TP"></att:MonetaryInformation> <att:MonetaryInformation Amount="0" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="NRC"></att:MonetaryInformation> <att:MonetaryInformation Amount="1441" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="RFA"></att:MonetaryInformation> <att:MonetaryInformation Amount="142659" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="RUA"></att:MonetaryInformation> </att:MonetaryInformations> <att:DocumentAndCouponInformation> <att:DocumentNumber Number="18085800591454"></att:DocumentNumber> <att:CouponGroup> <att:CouponInformationDetails> <att:CouponNumber>1</att:CouponNumber> <att:CouponStatus>RF</att:CouponStatus> <att:SettlementAuthorization> 180OAHUGZ9DL5</att:SettlementAuthorization> </att:CouponInformationDetails> </att:CouponGroup> </att:DocumentAndCouponInformation> <att:Refundable Amount="144100" CurrencyCode="KRW" DecimalPlaces="0"></att:Refundable> </att:Contract>

* * *

## 3.3 Sub Structure: ContractBundle

## 3.3.1 Description

Each <ContractBundle> element contains:

-   A <Success> element if refund was successfully processed (eventualy a <Warnings> element as well)
-   Or an <Errors> element if process refund was rejected for the document(s) concerned by the ContractBundle
-   <RefundDetails> if refund was successfully initiated

## 3.3.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<ContractBundle ID="2"> <Success></Success> <RefundDetails> <att:Contracts> <att:Contract ID="1" IssueDate="2015-10-01" JourneyType="DOM" Status="Refunded"> <att:Segments> <att:Segment Tattoo="2"></att:Segment> </att:Segments> <att:Passengers> <att:Passenger Tattoo="1"> <att:FirstName>JG</att:FirstName> <att:LastName>JG</att:LastName> <att:FullName>JG/JG</att:FullName> </att:Passenger> </att:Passengers> <att:Taxes> <att:Tax Amount="4000" Category="R" CurrencyCode="KRW" DecimalPlaces="0" ISO\_Code="DA"></att:Tax> <att:Tax Amount="4000" Category="PT" CurrencyCode="KRW" DecimalPlaces="0" ISO\_Code="DA"></att:Tax> <att:Tax Amount="4000" Category="701" CurrencyCode="KRW" DecimalPlaces="0"> <ota:TaxDescription Name="XT"></ota:TaxDescription> </att:Tax> </att:Taxes> <att:MonetaryInformations> <att:MonetaryInformation Amount="140100" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="B"></att:MonetaryInformation> <att:MonetaryInformation Amount="0" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="RFU"></att:MonetaryInformation> <att:MonetaryInformation Amount="140100" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="FRF"></att:MonetaryInformation> <att:MonetaryInformation Amount="144100" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="RFT"></att:MonetaryInformation> <att:MonetaryInformation Amount="4000" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="TXT"></att:MonetaryInformation> <att:MonetaryInformation Amount="4000" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="TP"></att:MonetaryInformation> <att:MonetaryInformation Amount="0" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="NRC"></att:MonetaryInformation> <att:MonetaryInformation Amount="1441" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="RFA"></att:MonetaryInformation> <att:MonetaryInformation Amount="142659" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="RUA"></att:MonetaryInformation> </att:MonetaryInformations> <att:DocumentAndCouponInformation> <att:DocumentNumber Number="18085800591454"></att:DocumentNumber> <att:CouponGroup> <att:CouponInformationDetails> <att:CouponNumber>1</att:CouponNumber> <att:CouponStatus>RF</att:CouponStatus> <att:SettlementAuthorization> 180OAHUGZ9DL5</att:SettlementAuthorization> </att:CouponInformationDetails> </att:CouponGroup> </att:DocumentAndCouponInformation> <att:Refundable Amount="144100" CurrencyCode="KRW" DecimalPlaces="0"></att:Refundable> </att:Contract> </att:Contracts> <att:DateTime> <att:BusinessSemantic Code="TID"></att:BusinessSemantic> <att:StructuredDateTime> <att:Year>2015</att:Year> <att:Month>10</att:Month> <att:Day>01</att:Day> </att:StructuredDateTime> </att:DateTime> <att:FormOfPayments> <att:FormOfPayment Amount="144100" CurrencyCode="KRW" DecimalPlaces="0" ID="1" Type="CA"> <att:FreeFlow>CASH</att:FreeFlow> </att:FormOfPayment> </att:FormOfPayments> <att:GlobalRefundReceipt> 180OAHUGZ9DL5</att:GlobalRefundReceipt> </RefundDetails> </ContractBundle>

* * *

## 3.4 Sub Structure: Fee

## 3.4.1 Description

This structure contains information about a refund related fee (e.g. OB fee, no show fee, miscellaneous fee)

For example, in case of OB fees, this structure is as follows:

-   "Category" attribute has "774" as a value
-   "Code" attribute has "B" as a value
-   "SubCategory" attribute contains the OB fee type
-   "Amount": Amount without decimals. Can also contain the amount with its decimals in case DecimalPlaces is not encoded (like amounts related to miles for instance)
-   "CurrencyCode": ISO currency code
-   "DecimalPlaces": Number of decimals of the amount
-   <Taxes> sub-element contains a list of <Tax> elements. Each of them contains an OB fee related tax, and it is encoded as described in the Tax substructure description.

Regarding other fees, the following information is returned:

-   "Category" attribute contains fee type
-   "Amount", "CurrencyCode" and "DecimalPlaces" are filled as described above

## 3.4.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fee Amount="20000" Category="NS" CurrencyCode="KRW" DecimalPlaces="2"></Fee>

* * *

## 3.5 Sub Structure: Penalty

## 3.5.1 Description

This structure contains the information relating the penalty applied at refund time. The main elements are the following:

-   "PenaltyType": Type of the penalty such as "CP" (Cancellation Penalty), "CPM" (Cancellation Penalty for Miles), etc.
-   "Amount", "CurrencyCode" and "DecimalPlaces": Described in previous sections of this User's Guide. Note: leave "DecimalPlaces" and "CurrencyCode" blank for miles cancellation penalties.
-   "Percent": fee percentage
-   "PercentOrAmount" attribute has two possible values:
    -   "P": indicates the penalty is a percentage
    -   "A": indicates thepenalty is an amount

## 3.5.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Penalty Amount="105" CurrencyCode="EU" DecimalPlaces="2" PenaltyType="CP" Percent="10" PercentOrAmount="P"></Penalty>

* * *

## 3.6 Sub Structure: RefundDetails

## 3.6.1 Description

Refund information is returned in <RefundDetails> element for each contract bundle for which refund was successfully processed. 

<RefundDetails> contains the following elements:

-   <Contracts> contains the list of <Contract> elements

-   <TotalAmounts> element encoded when several contracts are contained in a single contract bundle. It contains the following elements:
    -   <Refundable> contains the attibutes and elements giving the refund total for the <ContractBundle>:
        -   "Amount" attribute
        -   "CurrencyCode" attribute
        -   "DecimalPlaces" attribute
        -   <Farerefund> element contains sum of fare refunds
        -   <Tax> elements
        -   <Penalty> elements for penalties that apply to contract bundle
        -   <Fee> elements for fees that apply to contract bundle

-   <GlobalRefundReceipt> element containing global refund receipt number also known as SAC (Settlement Authorizations Code)
-   <ReasonCode>
-   <RefundRemarks>

## 3.6.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<RefundDetails> <att:Contracts> <att:Contract ID="1" IssueDate="2015-10-01" JourneyType="DOM" Status="Refunded"> <att:Segments> <att:Segment Tattoo="2"></att:Segment> </att:Segments> <att:Passengers> <att:Passenger Tattoo="1"> <att:FirstName>JG</att:FirstName> <att:LastName>JG</att:LastName> <att:FullName>JG/JG</att:FullName> </att:Passenger> </att:Passengers> <att:Taxes> <att:Tax Amount="4000" Category="R" CurrencyCode="KRW" DecimalPlaces="0" ISO\_Code="DA"></att:Tax> <att:Tax Amount="4000" Category="PT" CurrencyCode="KRW" DecimalPlaces="0" ISO\_Code="DA"></att:Tax> <att:Tax Amount="4000" Category="701" CurrencyCode="KRW" DecimalPlaces="0"> <ota:TaxDescription Name="XT"></ota:TaxDescription> </att:Tax> </att:Taxes> <att:MonetaryInformations> <att:MonetaryInformation Amount="140100" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="B"></att:MonetaryInformation> <att:MonetaryInformation Amount="0" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="RFU"></att:MonetaryInformation> <att:MonetaryInformation Amount="140100" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="FRF"></att:MonetaryInformation> <att:MonetaryInformation Amount="144100" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="RFT"></att:MonetaryInformation> <att:MonetaryInformation Amount="4000" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="TXT"></att:MonetaryInformation> <att:MonetaryInformation Amount="4000" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="TP"></att:MonetaryInformation> <att:MonetaryInformation Amount="0" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="NRC"></att:MonetaryInformation> <att:MonetaryInformation Amount="1441" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="RFA"></att:MonetaryInformation> <att:MonetaryInformation Amount="142659" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="RUA"></att:MonetaryInformation> </att:MonetaryInformations> <att:DocumentAndCouponInformation> <att:DocumentNumber Number="18085800591454"></att:DocumentNumber> <att:CouponGroup> <att:CouponInformationDetails> <att:CouponNumber>1</att:CouponNumber> <att:CouponStatus>RF</att:CouponStatus> <att:SettlementAuthorization> 180OAHUGZ9DL5</att:SettlementAuthorization> </att:CouponInformationDetails> </att:CouponGroup> </att:DocumentAndCouponInformation> <att:Refundable Amount="144100" CurrencyCode="KRW" DecimalPlaces="0"></att:Refundable> </att:Contract> </att:Contracts> <att:DateTime> <att:BusinessSemantic Code="TID"></att:BusinessSemantic> <att:StructuredDateTime> <att:Year>2015</att:Year> <att:Month>10</att:Month> <att:Day>01</att:Day> </att:StructuredDateTime> </att:DateTime> <att:FormOfPayments> <att:FormOfPayment Amount="144100" CurrencyCode="KRW" DecimalPlaces="0" ID="1" Type="CA"> <att:FreeFlow>CASH</att:FreeFlow> </att:FormOfPayment> </att:FormOfPayments> <att:GlobalRefundReceipt> 180OAHUGZ9DL5</att:GlobalRefundReceipt> </RefundDetails>

* * *

## 3.7 Sub Structure: RefundDetails in case of asset created for refund

## 3.7.1 Description

If an asset is created at refund time with asset manager product, then the voucher ID and the PIN code (optional) are returned in RefundDetails section at FormOfPayment level.  

-   Voucher ID is returned in the CustomerAccount attribute
-   PIN code is returned in AdditionalData, in a Data element with a Key attribute having as value the 3 letter string PIN

## 3.7.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<RefundDetails> <Contracts> <Contract ID="1" IssueDate="2021-10-19" Status="Refunded"> <Segments> <Segment Tattoo="1"></Segment> </Segments> <Passengers> <Passenger Tattoo="1"> <FirstName>TEST</FirstName> <LastName>TEST</LastName> <FullName>TEST/TEST</FullName> </Passenger> </Passengers> <Taxes> <Tax Amount="466" Category="H" CurrencyCode="EUR" DecimalPlaces="2" ISO\_Code="FR" NatureCode="SE"></Tax> <Tax Amount="820" Category="H" CurrencyCode="EUR" DecimalPlaces="2" ISO\_Code="FR" NatureCode="TI"></Tax> <Tax Amount="113" Category="H" CurrencyCode="EUR" DecimalPlaces="2" ISO\_Code="IZ" NatureCode="EB"></Tax> <Tax Amount="150" Category="H" CurrencyCode="EUR" DecimalPlaces="2" ISO\_Code="O4" NatureCode="VC"></Tax> <Tax Amount="564" Category="H" CurrencyCode="EUR" DecimalPlaces="2" ISO\_Code="QW" NatureCode="LO"></Tax> <Tax Amount="2113" Category="701" CurrencyCode="EUR" DecimalPlaces="2"> <TaxDescription Name="XT"></TaxDescription> </Tax> </Taxes> <MonetaryInformations> <MonetaryInformation Amount="35000" CurrencyCode="EUR" DecimalPlaces="2" Qualifier="B"></MonetaryInformation> <MonetaryInformation Amount="0" CurrencyCode="EUR" DecimalPlaces="2" Qualifier="RFU"></MonetaryInformation> <MonetaryInformation Amount="35000" CurrencyCode="EUR" DecimalPlaces="2" Qualifier="FRF"></MonetaryInformation> <MonetaryInformation Amount="37113" CurrencyCode="EUR" DecimalPlaces="2" Qualifier="RFT"></MonetaryInformation> <MonetaryInformation Amount="2113" CurrencyCode="EUR" DecimalPlaces="2" Qualifier="TXT"></MonetaryInformation> <MonetaryInformation Amount="2113" CurrencyCode="EUR" DecimalPlaces="2" Qualifier="TP"></MonetaryInformation> </MonetaryInformations> <DocumentAndCouponInformation> <DocumentNumber Number="17224001421124"></DocumentNumber> <CouponGroup> <CouponInformationDetails> <CouponNumber>1</CouponNumber> <CouponStatus>RF</CouponStatus> <SettlementAuthorization>172GFYSIEUZ34</SettlementAuthorization> </CouponInformationDetails> </CouponGroup> </DocumentAndCouponInformation> <Refundable Amount="37113" CurrencyCode="EUR" DecimalPlaces="2"></Refundable> </Contract> </Contracts> <DateTime> <BusinessSemantic Code="TID"></BusinessSemantic> <StructuredDateTime> <Year>2021</Year> <Month>10</Month> <Day>19</Day> </StructuredDateTime> </DateTime> <FormOfPayments> <FormOfPayment Amount="37113" ContractId="1" CurrencyCode="EUR" CustomerAccount="4000030019565140" DecimalPlaces="2" ID="1" MembershipStatus="EBC" Type="MS"> <FreeFlow>EBKR6X0</FreeFlow> <AdditionalData> <Data Key="TYP" Value="EBK"></Data> <Data Key="PIN" Value="145896"></Data> </AdditionalData> </FormOfPayment> </FormOfPayments> <GlobalRefundReceipt>172GFYSIEUZ34</GlobalRefundReceipt> </RefundDetails>

* * *

## 3.8 Sub Structure: Tax

## 3.8.1 Description

<Tax> element contains the list of all taxes of the document to refund. It contains the following information:

-   "ISO\_Code" contains tax ISO (International Organization for Standardization) code
-   "NatureCode" contains a tax Nature code, if available
-   "Category" contains tax type (e.g. O for Old, R for refundable)
-   "Amount" amount without decimals. Or the real amount in case "DecimalPlaces" is not encoded
-   "DecimalPlaces" contains the number of digits that shall be considered as decimals in the "Amount"
-   "CurrencyCode" contains the currency code (e.g. EUR for Euro, USD for Dollars)
-   "CountryCode" contains the country code (e.g. KR for Republic of Korea, FR for France)

## 3.8.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Tax Amount="11900" Category="H" CountryCode="KR" CurrencyCode="KRW" DecimalPlaces="2" ISO\_Code="OD"></Tax>

* * *

## 4 Error Messages

The error codes and free text messages that may be returned are listed in the refund specifications delivered to the customer. The most commonly received errors are the following (error code and free text):

**Error code**

**Free text**

**Description**

11004

NEED REFUND RECORD

The user tries to process a refund, but no refund was initiated

11062

NEED FARE USED FOR PARTIAL REFUND

The user tries to process refund for a partially used ticket without entering a fare used

7130

UNABLE TO PROCESS ETKT ERROR CODE

If an error is received for E-ticket server

11215

NEED FORM OF PAYMENT TO REFUND

If no refund form of payment is defined

38668

REFUND CONDITIONS HAVE CHANGED - PLEASE IGNORE REFUND AND RETRY

The refund conditions at process refund time are different from the ones computed at initiate refund time.

45461

CREDIT CARD DECLINED - PLEASE CONTACT AIRLINE

If payment authorization is declined (Light Ticketing use case)

45460

PENDING PAYMENT CONFIRMATION - PLEASE RETRY

If payment authorization is pending (Light Ticketing use case)

37436

REFUND REJECTED - PNR MISMATCH - PLEASE CONTACT THE AIRLINE

When there is a discrepancy between the Amadeus PNR and the LCC booking on provider side (Light ticketing use case)

Each <Error> element is encoded as follows:

-   "Type" attribute contains the value "000"
-   "Code" attribute contains the canned message ID
-   Error text within the <Error> element

A typical error response is shown below.

## 4.1 Error Reply

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_TicketProcessRefundRS xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" Version="3.003" xsi:schemaLocation="http://xml.amadeus.com/TicketGTP\_v3"> <GeneralReply> <Errors> <ama:Errors> <ama:Error Code="11004" Type="000">NEED REFUND RECORD</ama:Error> </ama:Errors> </Errors> </GeneralReply> </AMA\_TicketProcessRefundRS>

  

* * *

## 5 Operations

## 5.1 Operation: Process Light Ticketing Refund

Process Light Ticekting Refund

Prerequisites:

-   PNR is present in agent Context
-   A refund was initiated with Ticket\_InitRefund 

## 5.1.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_TicketProcessRefundRQ Version="3.003" xsi:schemaLocation="http://xml.amadeus.com/2010/06/TicketGTP\_v3 AMA\_TicketProcessRefundRQ.xsd"></AMA\_TicketProcessRefundRQ>

## 5.1.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_TicketProcessRefundRS xmlns:xsd="http://www.w3.org/2001/XMLSchema" Version="3.003"> <GeneralReply> <Success></Success> </GeneralReply> <FunctionalData> <ContractBundle Code="L.4U" ID="1"> <Success></Success> <RefundDetails> <att:Contracts> <att:Contract ID="1" IssueDate="2018-05-14" Status="Refunded" Tattoo="17"> <att:Segments> <att:Segment Tattoo="2"></att:Segment> </att:Segments> <att:Passengers> <att:Passenger Tattoo="1"> <att:FirstName>B</att:FirstName> <att:LastName>HJMHJRG</att:LastName> <att:FullName>HJMHJRG/B</att:FullName> </att:Passenger> </att:Passengers> <att:Taxes> <att:Tax Amount="2448" Category="R" CurrencyCode="EUR" DecimalPlaces="2" ISO\_Code="SA" NatureCode="TF"></att:Tax> <att:Tax Amount="479" Category="R" CurrencyCode="EUR" DecimalPlaces="1" ISO\_Code="SA" NatureCode="TX"></att:Tax> <att:Tax Amount="75" Category="R" CurrencyCode="EUR" DecimalPlaces="1" ISO\_Code="FD"></att:Tax> <att:Tax Amount="7988" Category="701" CurrencyCode="EUR" DecimalPlaces="2"> <ota:TaxDescription Name="XT"></ota:TaxDescription> </att:Tax> </att:Taxes> <att:MonetaryInformations> <att:MonetaryInformation Amount="22761" CurrencyCode="EUR" DecimalPlaces="2" Qualifier="B"></att:MonetaryInformation> <att:MonetaryInformation Amount="0" CurrencyCode="EUR" DecimalPlaces="2" Qualifier="RFU"></att:MonetaryInformation> <att:MonetaryInformation Amount="22761" CurrencyCode="EUR" DecimalPlaces="2" Qualifier="FRF"></att:MonetaryInformation> <att:MonetaryInformation Amount="30749" CurrencyCode="EUR" DecimalPlaces="2" Qualifier="RFT"></att:MonetaryInformation> <att:MonetaryInformation Amount="7988" CurrencyCode="EUR" DecimalPlaces="2" Qualifier="TXT"></att:MonetaryInformation> <att:MonetaryInformation Amount="7988" CurrencyCode="EUR" DecimalPlaces="2" Qualifier="TP"></att:MonetaryInformation> </att:MonetaryInformations> <att:DocumentAndCouponInformation> <att:DocumentNumber Number="05124040330300"></att:DocumentNumber> <att:CouponGroup> <att:CouponInformationDetails> <att:CouponNumber>1</att:CouponNumber> <att:CouponStatus>RF</att:CouponStatus> </att:CouponInformationDetails> </att:CouponGroup> </att:DocumentAndCouponInformation> <att:Refundable Amount="30749" CurrencyCode="EUR" DecimalPlaces="2"></att:Refundable> </att:Contract> </att:Contracts> </RefundDetails> </ContractBundle> </FunctionalData> </AMA\_TicketProcessRefundRS>

## 5.1.3 Possible Errors

See "Error Messages" section.

* * *

## 5.2 Operation: Process Light Ticketing Refund Pending Payment Retry

Process Light Ticketing Refund Pending Payment Retry

Prerequisites: 

-   PNR is present in agent context
-   Refund record is in pending payment state

## 5.2.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_TicketProcessRefundRQ Version="3.003" xsi:schemaLocation="http://xml.amadeus.com/2010/06/TicketGTP\_v3 AMA\_TicketProcessRefundRQ.xsd"> <PendingPaymentRetry> <Provider Code="4U"></Provider> </PendingPaymentRetry> </AMA\_TicketProcessRefundRQ>

## 5.2.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_TicketProcessRefundRS Version="3.003"> <GeneralReply> <Success></Success> </GeneralReply> <FunctionalData> <ContractBundle Code="L.4U" ID="1"> <Success></Success> <RefundDetails> <att:Contracts> <att:Contract ID="1" IssueDate="2018-05-14" Status="Refunded" Tattoo="17"> <att:Segments> <att:Segment Tattoo="2"></att:Segment> </att:Segments> <att:Passengers> <att:Passenger Tattoo="1"> <att:FirstName>B</att:FirstName> <att:LastName>HJMHJRG</att:LastName> <att:FullName>HJMHJRG/B</att:FullName> </att:Passenger> </att:Passengers> <att:Taxes> <att:Tax Amount="2448" Category="R" CurrencyCode="EUR" DecimalPlaces="2" ISO\_Code="SA" NatureCode="TF"></att:Tax> <att:Tax Amount="479" Category="R" CurrencyCode="EUR" DecimalPlaces="1" ISO\_Code="SA" NatureCode="TX"></att:Tax> <att:Tax Amount="75" Category="R" CurrencyCode="EUR" DecimalPlaces="1" ISO\_Code="FD"></att:Tax> <att:Tax Amount="7988" Category="701" CurrencyCode="EUR" DecimalPlaces="2"> <ota:TaxDescription Name="XT"></ota:TaxDescription> </att:Tax> </att:Taxes> <att:MonetaryInformations> <att:MonetaryInformation Amount="22761" CurrencyCode="EUR" DecimalPlaces="2" Qualifier="B"></att:MonetaryInformation> <att:MonetaryInformation Amount="0" CurrencyCode="EUR" DecimalPlaces="2" Qualifier="RFU"></att:MonetaryInformation> <att:MonetaryInformation Amount="22761" CurrencyCode="EUR" DecimalPlaces="2" Qualifier="FRF"></att:MonetaryInformation> <att:MonetaryInformation Amount="30749" CurrencyCode="EUR" DecimalPlaces="2" Qualifier="RFT"></att:MonetaryInformation> <att:MonetaryInformation Amount="7988" CurrencyCode="EUR" DecimalPlaces="2" Qualifier="TXT"></att:MonetaryInformation> <att:MonetaryInformation Amount="7988" CurrencyCode="EUR" DecimalPlaces="2" Qualifier="TP"></att:MonetaryInformation> </att:MonetaryInformations> <att:DocumentAndCouponInformation> <att:DocumentNumber Number="05124040330300"></att:DocumentNumber> <att:CouponGroup> <att:CouponInformationDetails> <att:CouponNumber>1</att:CouponNumber> <att:CouponStatus>RF</att:CouponStatus> </att:CouponInformationDetails> </att:CouponGroup> </att:DocumentAndCouponInformation> <att:Refundable Amount="30749" CurrencyCode="EUR" DecimalPlaces="2"></att:Refundable> </att:Contract> </att:Contracts> </RefundDetails> </ContractBundle> </FunctionalData> </AMA\_TicketProcessRefundRS>

## 5.2.3 Possible Errors

See "Error Messages" section.

* * *

## 5.3 Operation: Process Rail Refund

Process a rail document to refund.

## 5.3.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_TicketProcessRefundRQ Version="3.003" xsi:schemaLocation="http://xml.amadeus.com/2010/06/TicketGTP\_v3 AMA\_TicketProcessRefundRQ.xsd"></AMA\_TicketProcessRefundRQ>

## 5.3.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_TicketProcessRefundRS Version="3.003"> <GeneralReply> <Success></Success> </GeneralReply> <FunctionalData> <ContractBundle Code="R.SWP" ID="1"> <Success></Success> <RefundDetails> <att:Contracts> <att:Contract ID="1" IssueDate="2014-05-23" RCI\_Reference="BC3661AC0001" Status="Refunded" Tattoo="74" Type="006"> <att:Segments> <att:Segment Tattoo="1"></att:Segment> <att:Segment Tattoo="2"></att:Segment> </att:Segments> <att:Passengers> <att:Passenger Tattoo="1"> <att:FirstName>INGER MR</att:FirstName> <att:LastName>BERGENFALK KULL</att:LastName> <att:FullName>BERGENFALK KULL/INGER MR</att:FullName> </att:Passenger> </att:Passengers> <att:Seats> <att:Seat Tattoo="13"></att:Seat> <att:Seat Tattoo="16"></att:Seat> </att:Seats> <att:Taxes> <att:Tax Amount="11524" Category="R" CurrencyCode="SEK" DecimalPlaces="2"></att:Tax> <att:Tax Amount="0" Category="701" CurrencyCode="SEK" DecimalPlaces="0"> <ota:TaxDescription Name="XT"></ota:TaxDescription> </att:Tax> </att:Taxes> <att:Fees> <att:Fee Amount="0" Category="RMF" CurrencyCode="SEK" DecimalPlaces="0"></att:Fee> </att:Fees> <att:Penalties> <att:Penalty Amount="0" CurrencyCode="SEK" DecimalPlaces="0" PenaltyType="CP" PercentOrAmount="A"></att:Penalty> </att:Penalties> <att:MonetaryInformations> <att:MonetaryInformation Amount="124000" CurrencyCode="SEK" DecimalPlaces="2" Qualifier="B"></att:MonetaryInformation> <att:MonetaryInformation Amount="1240" CurrencyCode="SEK" DecimalPlaces="0" Qualifier="RFT"></att:MonetaryInformation> <att:MonetaryInformation Amount="115" CurrencyCode="SEK" DecimalPlaces="0" Qualifier="TXT"></att:MonetaryInformation> <att:MonetaryInformation Amount="0" CurrencyCode="SEK" DecimalPlaces="0" Qualifier="TP"></att:MonetaryInformation> </att:MonetaryInformations> <att:DeliveryMethod DistributionType="004"></att:DeliveryMethod> <att:DocumentAndCouponInformation> <att:DocumentNumber Number="00000000000009"></att:DocumentNumber> <att:CouponGroup> <att:CouponInformationDetails> <att:CouponNumber>1</att:CouponNumber> <att:CouponStatus>RF</att:CouponStatus> </att:CouponInformationDetails> </att:CouponGroup> <att:CouponGroup> <att:CouponInformationDetails> <att:CouponNumber>2</att:CouponNumber> <att:CouponStatus>RF</att:CouponStatus> </att:CouponInformationDetails> </att:CouponGroup> </att:DocumentAndCouponInformation> <att:Refundable Amount="1240" CurrencyCode="SEK" DecimalPlaces="0"></att:Refundable> </att:Contract> </att:Contracts> <att:TotalAmounts> <att:Refundable Amount="1240" CurrencyCode="SEK" DecimalPlaces="0"> <att:Penalty Amount="0" CurrencyCode="SEK" DecimalPlaces="0"></att:Penalty> <att:Fee Amount="0" CurrencyCode="SEK" DecimalPlaces="0"></att:Fee> </att:Refundable> <att:NonRefundable Amount="0" CurrencyCode="SEK" DecimalPlaces="0"></att:NonRefundable> </att:TotalAmounts> <att:DateTime> <att:BusinessSemantic Code="TID"></att:BusinessSemantic> <att:StructuredDateTime> <att:Year>2014</att:Year> <att:Month>04</att:Month> <att:Day>04</att:Day> </att:StructuredDateTime> </att:DateTime> <att:ReasonCode Code="002"></att:ReasonCode> </RefundDetails> </ContractBundle> </FunctionalData> </AMA\_TicketProcessRefundRS>

## 5.3.3 Possible Errors

See "Error Messages" section.

* * *

## 5.4 Operation: Process Refund

Process a document to refund.

## 5.4.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_TicketProcessRefundRQ Version="3.003" xsi:schemaLocation="http://xml.amadeus.com/2010/06/TicketGTP\_v3 AMA\_TicketProcessRefundRQ.xsd"></AMA\_TicketProcessRefundRQ>

## 5.4.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_TicketProcessRefundRS Version="3.003"> <GeneralReply> <Success></Success> </GeneralReply> <FunctionalData> <ContractBundle ID="1"> <Success></Success> <RefundDetails> <att:Contracts> <att:Contract ID="1" IssueDate="2015-10-01" JourneyType="DOM" Status="Refunded"> <att:Segments> <att:Segment Tattoo="2"></att:Segment> </att:Segments> <att:Passengers> <att:Passenger Tattoo="1"> <att:FirstName>JG</att:FirstName> <att:LastName>JG</att:LastName> <att:FullName>JG/JG</att:FullName> </att:Passenger> </att:Passengers> <att:Taxes> <att:Tax Amount="4000" Category="R" CurrencyCode="KRW" DecimalPlaces="0" ISO\_Code="DA"></att:Tax> <att:Tax Amount="4000" Category="PT" CurrencyCode="KRW" DecimalPlaces="0" ISO\_Code="DA"></att:Tax> <att:Tax Amount="4000" Category="701" CurrencyCode="KRW" DecimalPlaces="0"> <ota:TaxDescription Name="XT"></ota:TaxDescription> </att:Tax> </att:Taxes> <att:MonetaryInformations> <att:MonetaryInformation Amount="140100" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="B"></att:MonetaryInformation> <att:MonetaryInformation Amount="0" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="RFU"></att:MonetaryInformation> <att:MonetaryInformation Amount="140100" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="FRF"></att:MonetaryInformation> <att:MonetaryInformation Amount="144100" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="RFT"></att:MonetaryInformation> <att:MonetaryInformation Amount="4000" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="TXT"></att:MonetaryInformation> <att:MonetaryInformation Amount="4000" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="TP"></att:MonetaryInformation> <att:MonetaryInformation Amount="0" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="NRC"></att:MonetaryInformation> <att:MonetaryInformation Amount="1441" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="RFA"></att:MonetaryInformation> <att:MonetaryInformation Amount="142659" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="RUA"></att:MonetaryInformation> </att:MonetaryInformations> <att:DocumentAndCouponInformation> <att:DocumentNumber Number="18085800591454"></att:DocumentNumber> <att:CouponGroup> <att:CouponInformationDetails> <att:CouponNumber>1</att:CouponNumber> <att:CouponStatus>RF</att:CouponStatus> <att:SettlementAuthorization> 180OAHUGZ9DL5</att:SettlementAuthorization> </att:CouponInformationDetails> </att:CouponGroup> </att:DocumentAndCouponInformation> <att:Refundable Amount="144100" CurrencyCode="KRW" DecimalPlaces="0"></att:Refundable> </att:Contract> </att:Contracts> <att:DateTime> <att:BusinessSemantic Code="TID"></att:BusinessSemantic> <att:StructuredDateTime> <att:Year>2015</att:Year> <att:Month>10</att:Month> <att:Day>01</att:Day> </att:StructuredDateTime> </att:DateTime> <att:FormOfPayments> <att:FormOfPayment Amount="144100" CurrencyCode="KRW" DecimalPlaces="0" ID="1" Type="CA"> <att:FreeFlow>CASH</att:FreeFlow> </att:FormOfPayment> </att:FormOfPayments> <att:GlobalRefundReceipt> 180OAHUGZ9DL5</att:GlobalRefundReceipt> </RefundDetails> </ContractBundle> </FunctionalData> </AMA\_TicketProcessRefundRS>

## 5.4.3 Possible Errors

See "Error Messages" section.

* * *

## 5.5 Operation: Process refund and Inhibit Refund Notice

Process refund without printing a refund notice.

## 5.5.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_TicketProcessRefundRQ Version="3.003" xsi:schemaLocation="http://xml.amadeus.com/2010/06/TicketGTP\_v3"> <ActionDetails> <ActionDetail Indicator="IRN"></ActionDetail> </ActionDetails> </AMA\_TicketProcessRefundRQ>

## 5.5.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_TicketProcessRefundRS Version="3.003"> <GeneralReply> <Success></Success> </GeneralReply> <FunctionalData> <ContractBundle ID="1"> <Success></Success> <RefundDetails> <att:Contracts> <att:Contract ID="1" IssueDate="2015-10-01" JourneyType="DOM" Status="Refunded"> <att:Segments> <att:Segment Tattoo="2"></att:Segment> </att:Segments> <att:Passengers> <att:Passenger Tattoo="1"> <att:FirstName>JG</att:FirstName> <att:LastName>JG</att:LastName> <att:FullName>JG/JG</att:FullName> </att:Passenger> </att:Passengers> <att:Taxes> <att:Tax Amount="4000" Category="R" CurrencyCode="KRW" DecimalPlaces="0" ISO\_Code="DA"></att:Tax> <att:Tax Amount="4000" Category="PT" CurrencyCode="KRW" DecimalPlaces="0" ISO\_Code="DA"></att:Tax> <att:Tax Amount="4000" Category="701" CurrencyCode="KRW" DecimalPlaces="0"> <ota:TaxDescription Name="XT"></ota:TaxDescription> </att:Tax> </att:Taxes> <att:MonetaryInformations> <att:MonetaryInformation Amount="140100" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="B"></att:MonetaryInformation> <att:MonetaryInformation Amount="0" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="RFU"></att:MonetaryInformation> <att:MonetaryInformation Amount="140100" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="FRF"></att:MonetaryInformation> <att:MonetaryInformation Amount="144100" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="RFT"></att:MonetaryInformation> <att:MonetaryInformation Amount="4000" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="TXT"></att:MonetaryInformation> <att:MonetaryInformation Amount="4000" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="TP"></att:MonetaryInformation> <att:MonetaryInformation Amount="0" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="NRC"></att:MonetaryInformation> <att:MonetaryInformation Amount="1441" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="RFA"></att:MonetaryInformation> <att:MonetaryInformation Amount="142659" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="RUA"></att:MonetaryInformation> </att:MonetaryInformations> <att:DocumentAndCouponInformation> <att:DocumentNumber Number="18085800591454"></att:DocumentNumber> <att:CouponGroup> <att:CouponInformationDetails> <att:CouponNumber>1</att:CouponNumber> <att:CouponStatus>RF</att:CouponStatus> <att:SettlementAuthorization> 180OAHUGZ9DL5</att:SettlementAuthorization> </att:CouponInformationDetails> </att:CouponGroup> </att:DocumentAndCouponInformation> <att:Refundable Amount="144100" CurrencyCode="KRW" DecimalPlaces="0"></att:Refundable> </att:Contract> </att:Contracts> <att:DateTime> <att:BusinessSemantic Code="TID"></att:BusinessSemantic> <att:StructuredDateTime> <att:Year>2015</att:Year> <att:Month>10</att:Month> <att:Day>01</att:Day> </att:StructuredDateTime> </att:DateTime> <att:FormOfPayments> <att:FormOfPayment Amount="144100" CurrencyCode="KRW" DecimalPlaces="0" ID="1" Type="CA"> <att:FreeFlow>CASH</att:FreeFlow> </att:FormOfPayment> </att:FormOfPayments> <att:GlobalRefundReceipt> 180OAHUGZ9DL5</att:GlobalRefundReceipt> </RefundDetails> </ContractBundle> </FunctionalData> </AMA\_TicketProcessRefundRS>

## 5.5.3 Possible Errors

See "Error Messages" section.

* * *

## 5.6 Operation: Process refund with Cancellation Penalty and Tax Breakdown

Note: This operation is dependant on the fare/tax filing and requires as well adhoc configuration to be made available to the airline (CR 21523638).

  
The aim is, for the refund flow (Init Response and other update/process operations) to contain the taxes related to the cancellation penalty fee.

  
The added elements are:  
  
The cancellation penalty without its taxes (cancellation penalty tax exclusive)  
  
The set of taxes pertaining to the cancellation penalty (while the grammar may allow for more than 20 taxes, the system processing is limited to 20 taxes).

## 5.6.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_TicketProcessRefundRQ Version="3.003" xsi:schemaLocation="http://xml.amadeus.com/2010/06/TicketGTP\_v3 AMA\_TicketProcessRefundRQ.xsd"></AMA\_TicketProcessRefundRQ>

## 5.6.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_TicketProcessRefundRS Version="3.003"> <GeneralReply> <Success></Success> </GeneralReply> <FunctionalData> <ContractBundle ID="1"> <Success></Success> <RefundDetails> <att:Contracts> <att:Contract ID="1" IssueDate="2015-10-01" JourneyType="DOM" Status="Refunded"> <att:Segments> <att:Segment Tattoo="2"></att:Segment> </att:Segments> <att:Passengers> <att:Passenger Tattoo="1"> <att:FirstName>JOHN</att:FirstName> <att:LastName>DOE</att:LastName> <att:FullName>DOE/JOHN</att:FullName> </att:Passenger> </att:Passengers> <att:Taxes> <att:Tax Amount="4000" Category="R" CurrencyCode="KRW" DecimalPlaces="0" ISO\_Code="DA"></att:Tax> <att:Tax Amount="4000" Category="PT" CurrencyCode="KRW" DecimalPlaces="0" ISO\_Code="DA"></att:Tax> <att:Tax Amount="4000" Category="701" CurrencyCode="KRW" DecimalPlaces="0"> <ota:TaxDescription Name="XT"></ota:TaxDescription> </att:Tax> </att:Taxes> <att:Penalties> <att:Penalty Amount="7800" CurrencyCode="KRW" DecimalPlaces="2" PenaltyType="CP" PercentOrAmount="A" TaxInclusive="true"> <ota:Taxes Amount="300" CurrencyCode="CAD" DecimalPlaces="2"> <ota:Tax Amount="200" Code="XG" CurrencyCode="KRW" DecimalPlaces="2"></ota:Tax> <ota:Tax Amount="100" Code="XT" CurrencyCode="KRW" DecimalPlaces="2"></ota:Tax> </ota:Taxes> </att:Penalty> <att:Penalty Amount="7500" CurrencyCode="KRW" DecimalPlaces="2" PenaltyType="CP" PercentOrAmount="A" TaxInclusive="false"></att:Penalty> </att:Penalties> <att:MonetaryInformations> <att:MonetaryInformation Amount="140100" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="B"></att:MonetaryInformation> <att:MonetaryInformation Amount="0" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="RFU"></att:MonetaryInformation> <att:MonetaryInformation Amount="140100" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="FRF"></att:MonetaryInformation> <att:MonetaryInformation Amount="144100" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="RFT"></att:MonetaryInformation> <att:MonetaryInformation Amount="4000" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="TXT"></att:MonetaryInformation> <att:MonetaryInformation Amount="4000" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="TP"></att:MonetaryInformation> <att:MonetaryInformation Amount="0" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="NRC"></att:MonetaryInformation> <att:MonetaryInformation Amount="1441" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="RFA"></att:MonetaryInformation> <att:MonetaryInformation Amount="142659" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="RUA"></att:MonetaryInformation> </att:MonetaryInformations> <att:DocumentAndCouponInformation> <att:DocumentNumber Number="17285800591454"></att:DocumentNumber> <att:CouponGroup> <att:CouponInformationDetails> <att:CouponNumber>1</att:CouponNumber> <att:CouponStatus>RF</att:CouponStatus> <att:SettlementAuthorization> 180OAHUGZ9DL5</att:SettlementAuthorization> </att:CouponInformationDetails> </att:CouponGroup> </att:DocumentAndCouponInformation> <att:Refundable Amount="144100" CurrencyCode="KRW" DecimalPlaces="0"></att:Refundable> </att:Contract> </att:Contracts> <att:DateTime> <att:BusinessSemantic Code="TID"></att:BusinessSemantic> <att:StructuredDateTime> <att:Year>2015</att:Year> <att:Month>10</att:Month> <att:Day>01</att:Day> </att:StructuredDateTime> </att:DateTime> <att:FormOfPayments> <att:FormOfPayment Amount="144100" CurrencyCode="KRW" DecimalPlaces="0" ID="1" Type="CA"> <att:FreeFlow>CASH</att:FreeFlow> </att:FormOfPayment> </att:FormOfPayments> <att:GlobalRefundReceipt> 180OAHUGZ9DL5</att:GlobalRefundReceipt> </RefundDetails> </ContractBundle> </FunctionalData> </AMA\_TicketProcessRefundRS>

## 5.6.3 Possible Errors

See "Error Messages" section.

* * *

## 5.7 Operation: Process Refund with Penalty To Collect

Process a document to refund with an associated contract corresponding to the Penalty to be collected. This data is always needed whenever a Penalty to Collect is present in the refund transaction.

## 5.7.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_TicketProcessRefundRQ Version="3.003" xsi:schemaLocation="http://xml.amadeus.com/2010/06/TicketGTP\_v3 AMA\_TicketProcessRefundRQ.xsd"> <ActionDetails> <ActionDetail Indicator="PEN"></ActionDetail> </ActionDetails> <AdditionalDataList> <AdditionalData> <att:Data Key="1" Type="EMD" Value="1300987654321"></att:Data> <att:Qualifiers> <att:Qualifier RPH="1"></att:Qualifier> </att:Qualifiers> </AdditionalData> </AdditionalDataList> </AMA\_TicketProcessRefundRQ>

## 5.7.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_TicketProcessRefundRS Version="3.003"> <GeneralReply> <Success></Success> </GeneralReply> <FunctionalData> <ContractBundle ID="1"> <Success></Success> <RefundDetails> <att:Contracts> <att:Contract ID="1" IssueDate="2015-10-01" JourneyType="DOM" Status="Refunded"> <att:Segments> <att:Segment Tattoo="2"></att:Segment> </att:Segments> <att:Passengers> <att:Passenger Tattoo="1"> <att:FirstName>JG</att:FirstName> <att:LastName>JG</att:LastName> <att:FullName>JG/JG</att:FullName> </att:Passenger> </att:Passengers> <att:Taxes> <att:Tax Amount="4000" Category="R" CurrencyCode="KRW" DecimalPlaces="0" ISO\_Code="DA"></att:Tax> <att:Tax Amount="4000" Category="PT" CurrencyCode="KRW" DecimalPlaces="0" ISO\_Code="DA"></att:Tax> <att:Tax Amount="4000" Category="701" CurrencyCode="KRW" DecimalPlaces="0"> <ota:TaxDescription Name="XT"></ota:TaxDescription> </att:Tax> </att:Taxes> <att:MonetaryInformations> <att:MonetaryInformation Amount="140100" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="B"></att:MonetaryInformation> <att:MonetaryInformation Amount="0" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="RFU"></att:MonetaryInformation> <att:MonetaryInformation Amount="140100" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="FRF"></att:MonetaryInformation> <att:MonetaryInformation Amount="144100" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="RFT"></att:MonetaryInformation> <att:MonetaryInformation Amount="4000" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="TXT"></att:MonetaryInformation> <att:MonetaryInformation Amount="4000" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="TP"></att:MonetaryInformation> <att:MonetaryInformation Amount="0" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="NRC"></att:MonetaryInformation> <att:MonetaryInformation Amount="1441" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="RFA"></att:MonetaryInformation> <att:MonetaryInformation Amount="142659" CurrencyCode="KRW" DecimalPlaces="0" Qualifier="RUA"></att:MonetaryInformation> </att:MonetaryInformations> <att:DocumentAndCouponInformation> <att:DocumentNumber Number="18085800591454"></att:DocumentNumber> <att:CouponGroup> <att:CouponInformationDetails> <att:CouponNumber>1</att:CouponNumber> <att:CouponStatus>RF</att:CouponStatus> <att:SettlementAuthorization> 180OAHUGZ9DL5</att:SettlementAuthorization> </att:CouponInformationDetails> </att:CouponGroup> </att:DocumentAndCouponInformation> <att:Refundable Amount="144100" CurrencyCode="KRW" DecimalPlaces="0"></att:Refundable> </att:Contract> </att:Contracts> <att:DateTime> <att:BusinessSemantic Code="TID"></att:BusinessSemantic> <att:StructuredDateTime> <att:Year>2015</att:Year> <att:Month>10</att:Month> <att:Day>01</att:Day> </att:StructuredDateTime> </att:DateTime> <att:FormOfPayments> <att:FormOfPayment Amount="144100" CurrencyCode="KRW" DecimalPlaces="0" ID="1" Type="CA"> <att:FreeFlow>CASH</att:FreeFlow> </att:FormOfPayment> </att:FormOfPayments> <att:GlobalRefundReceipt> 180OAHUGZ9DL5</att:GlobalRefundReceipt> <AdditionalDataList> <AdditionalData> <att:Data Key="1" Type="EMD" Value="1300987654321"></att:Data> <att:Qualifiers> <att:Qualifier RPH="1"></att:Qualifier> </att:Qualifiers> </AdditionalData> </AdditionalDataList> </RefundDetails> </ContractBundle> </FunctionalData> </AMA\_TicketProcessRefundRS>

## 5.7.3 Possible Errors

See "Error Messages" section.

* * *