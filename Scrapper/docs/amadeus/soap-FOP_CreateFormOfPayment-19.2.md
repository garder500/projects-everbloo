---
url: "https://developers.amadeus.com/api-library/soap/functional-doc/1379/doc-read/133609?serviceVersion=19.2"
download_url: "https://developers.amadeus.com/PAS-EAS/api/download/comp/4d4ad2cb456c02633f463a055ab70584/133609/upload_15686259313400826766.html"
title: "HTML_UG_WBS_FOP_CreateFormOfPayment_TFOPCQ_19.2_158"
source: "amadeus"
service_id: "1379"
service_name: "FOP_CreateFormOfPayment"
version: "19.2"
document_id: "133609"
doc_version: "19.2"
doc_type: "User guide"
scraped_at: "2026-07-15T10:16:02.046Z"
---
# Function: FOP\_CreateFormOfPayment

* * *

## 1 Overview

This web service allows you to perform the following creation operations:

-   FP creation (can be associated with segments, chargeable SSR / SVC / MCO, passengers)
-   Multiple forms of payment per FP line
-   Authorisation process performed before FP creation

## 1.1 Supported Operations

-   FOP creation only
-   FOP creation with authorisation

## 1.2 Limitations

-   Specific airline requirements are not supported by the generic process of the createFormOfPayment web service
-   Specific market requirements are not supported by the generic process of the createFormOfPayment web service
-   Limitations on FP generic creation:
    -   If there isn't any element association (Passenger and/or MCO, EMD..) is specified, the creation of the FP is associated to the whole PNR elements. The generic FP is authorised in creation mode only.
    -   OB Fees calculation is only supported in Authorisation + Creation mode.
-   Limitations on FP association:
    -   The current version of the web service is limited to the creation of FOP associated to TSM of MCO/chargeable SSR, SVC and/or TST (linked to segments) and/or insurance elements.
    -   No hotel element associations are available for this version.
    -   When a generic FP element is already present in the PNR, an append FOP with specific association (PAX, SEG, TST, TSM) to the generic FP will result in a generic FP line with combined FOP.
-   Limitations on FOP table selection:
    -   This version can only be used by ATO/CTO agents. So PNRs containing TLA-Segments and consolidators are out of scope.
    -   FOP combinability is not checked as FOP combination table is not yet available.

## 1.3 Unsupported Operations

-   The functionality triggered by the FOP table definition, @EDI switch, is not supported with FOP\_CreateFormoOfPayment query.

## 1.4 Prerequisites

For the FOP creation with authorisation, the PNR context plus a specific association to any element in the PNR is mandatory.

## 2 Building A Query

CreateFormOfPayment web service has two potential uses:

-   Creation with authorisation: Segment transactionContext with code= " DEF " should be present at the top of the CreateFormOfPayment message.
-   Creation without authorisation: Segment transactionContext with code= " FP " should be present at the top of the CreateFormOfPayment message, or no transactionContext at all (default).

## 2.1 Sub Structure: Define OB fees

## 2.1.1 Description

OB fees are airline fees, that can include some fees related to the method of payment used.

FOP\_CreateFormOfPayment web service offers the possibility to calculate and update OB fees according to FOPs used. This is possible only when using FOP\_CreateFormOfPayment in creation plus authorisation mode.

Some additional refinement options are offered for the calculation of OB fees:

-   Exclude all OB fees for one or several FOPs
-   Exclude or include only a specific sub-type of OB fees for one or several FOPs

  
The following table describes the query message structure regarding OB fees:

**Group name**

**Group status**

**Element**

**Element status**

**Format**

**Description**

transactionContext/transactionDetails

C

issueIndicator

C

an1

To calculate and include OB fees inpaymentsolution proposal : O

fopGroup/pricingTicketingDetails/productDateTimeDetails

C

departureDate

C

an..35

To override the pricing date

fopGroup/pricingTicketingDetails/locationDetails

C

city

C

an..25

To override the pricing point

fopGroup/feeTypeInfo/selectionDetails

C

option

M

an..3

To indicate the fee : OB

optionInformation

C

an..35

To indicate that the fee has to be exempted : EX

fopGroup/feeDetailsInfoGroup/feeInfo/dataTypeInformation

M

type

M

an..3

Fee code : FC1, T01, ...

fopGroup/feeDetailsInfoGroup/feeInfo/selectionDetails

M

option

M

an..3

Inclusion (FIN), Exclusion (FEX)

## 2.1.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 2.2 Sub Structure: FOP creation (only)

## 2.2.1 Description

### General process

### FOP Table Selection

-   Standard Processing

The FOP table determination process takes into account different information. If those are not present, it tries to check in another way. Here is the flow followed on our side: 

-   -   Product specific (STD, rail, TLA)
    -   Carrier specific (AF, OS, LH)
    -   Vendor Code + Country Code
    -   Vendor Code
    -   Corporate Code + Country Code
    -   Corporate Code
    -   System provider + Country Code
    -   System provider

-   FOP table selection for travel assistance/Insurance

The Travel Assistance Insurance product uses the FOP maps defined for Travel Assistance. The FOP maps are defined with the prefix of MI. They can be created using the same criterion used for the AIR provider FOP maps, e.g. by vendor code, country code and per insurance provider accepted form of payments.

### Retrieve FOP identification

This process is used to identify the FOP specified in the FOP table previously selected. The system determines which FOP definition shall be used to validate the FOP entered in the query using the following procedure:

**Field name**

**Field value**

__fopGroup/mopDescription/mopDetails/_fopPNRDetails/fopDetails/fopCode_

FOP code value

___fopGroup/__mopDescription/paymentModule/mopInformation/creditCardData/creditCardDetails/rawTrackData_

ASCII data

-   **check _fopCode_:**

If a FOP code is specified in segment _fopPNRDetails_, the system parses the FOP table in order to retrieve the corresponding FOP code.

-   **check _swipe Credit card FOP_:**

If no _fopCode_ is specified, the system checks if _rawTrackData_ is the only field specified in segment _creditCardDetails._

-   **check MEP reference:**

A FOP can be created from a MEP element. The MEP can be referenced by two different ways:

\- _MEP reference_

The tattoo of the MEP is provided in a fopMasterElementReference segment in the mopDescription part. The FOP is created from the information present in the MEP element.

**Field name**

**Field value**

__fopGroup/mopDescription/_fopMasterElementReference/referenceDetails/type_

"MEP"

___fopGroup/mopDescription/___fopMasterElementReference/referenceDetails/value__

MEP tattoo

\- _MEP freeflow_

The MEP line number is provided with the reserved "MEP" FOP code. The FOP is created from the information present in the MEP element.

**Field name**

**Field value**

___fopGroup/mopDescription/mopDetails/__oldFopFreeflow/freeTextDetails/textSubjectQualifier_

"ZZZ"

___fopGroup/mopDescription/mopDetails/__oldFopFreeflow/freeTextDetails/source_

"M"

___fopGroup/mopDescription/mopDetails/__oldFopFreeflow/freeTextDetails/_

"ZZZ"

___fopGroup/mopDescription/mopDetails/__oldFopFreeflow/freeText_

"MEP"+MEP line in the PNR (example: "MEP7")

### FOP Structured data and FOP syntax mapping

Once the FOP described in FOP\_CreateFormOfPayment is retrieved, FOP backend has to retrieve its syntax.

At entry time, the FOP is searched for in the FOP table of the Office Identification Profile. The corresponding FOP syntax map is retrieved to validate the syntax - format - of the FOP entry.

An FP line can contain up to 3 different FOPs.

For each FOP of each FP line (except old Fop since it is free text), FOP backend checks the entered data and if they correspond with the FOP table definition.

### Check FOP Combination table

In case of a multiple FOP entry, a check of the FOP combinability is made through the FOP combination tables.

### Check FP length

The minimum/maximum field lengths for printing is determined by the National Systems. The maximum input field length in either a PNR, TST or TSM is 88 characters including spaces and delimiters but excluding any passenger and/or segment and/or line association.

### FOP Sequence and old FOP

-   FP Creation from scratch

The system checks if the FOP(s) specified in input do not exceed **3 new FOPs** and **3 old FOP**s.

Segment _fopSequenceNumber_ is used to convey FOP position in the FP line.

The old FOPs must always be placed at the beginning of the FP entry, and the new FOPs at the end. Mixing old and new FOPs is not allowed.

The field _number_ must be set to 1 if there is only 1 FOP in the FP line. An old Form Of Payment is identified by the value "  "O" (capital letter "O") in field _fopStatus_ (_fopGroup/mopDescription/mopDetails/fopPNRDetails/fopDetails_) whereas a new FOP is identified by the value "N".

**Field name**

**Field value**

__fopGroup/mopDescription/_fopSequenceNumber/sequenceDetails/number_

FOP position in the FP line

___fopGroup/mopDescription/mopDetails/fopPNRDetails/fopDetails/__fopStatus_

FOP status value

____fopGroup/___mopDescription_

FOP related information

The sequence numbers are assigned following this rule:

**Number Of FOP(s)**

**repetition of group _mopDescription_**

**field _number_**

1 FOP

1

1

2 FOPs

2

1 & 2

3 FOPs

3

1 & 2 & 3

1 FOP & 1 Old FOP

2

1 & 1

2 FOPs & 1 Old FOP

3

1 & 1 & 2

3 FOPs & 2 Old FOP

4

1 & 2 & 1 & 2 & 3

Note: _mopDescription_ group is triggered by _fopSequenceNumber_, so for each new sequence, _mopDescription_ is repeated.

An old Form Of Payment is considered as freeflow text by the FOP backend. So no check on old FOP is done. An old form of payment is never validated since the ticket on which it appears could have been produced on a system other than AMADEUS and the format could well be unrecognisble within the formats defined in the relevant Central Ticketing tables.

-   Append FOP

The _createFormOfPayment_ web service allows you to insert an appended FOP to an existing FP.

The field _fopReference_ is used to convey the FP identifier to which you want to add an appended FOP (_qualifier_ = FPT and _number_ = identifier of the FP element). In that case, the corresponding sequence number needs to be specified in the field _number_ of segment _fopSequenceNumber_ as for a creation from scratch.

**Field name**

**Field value**

_fopGroup/fopReference/reference_

FP identifier

_fopGroup/mopDescription/fopSequenceNumber/sequenceDetails/number_

Sequence number

_fopGroup/mopDescription_

FOP related information

In case of multi-FP, FOP backend supports the same appended FOP for all FP elements specified. It means that the appended FOP to be created needs to be the same for each FP line.

Please note that createFormOfPayment query conveys one FP per group called _fopGroup_. In case of multiple FP association, _fopGroup_ should be repeated.

If createFormPayment web service is used to create an appended FOP, the following checks are performed:

-   If an amount is associated to FOP(s) already created in PNR, then the general process is applied.
-   If no amount is associated to FOP(s) already created in PNR, FOP backend checks FOP hidden data in order to find an authorised amount. If an authorised amount is found, FOP backend considers that the amount of the FOP already created is equal to the authorised amount, then the general process is applied.
-   If no amount neither in PNR nor in hidden records is associated to a FOP already created, FOP backend considers that no amount has been specified. Then the general process is applied.

Any agent using this table is obliged to enter a FOP amount with each FOP specified when more than one FOP is entered in the FP line of the PNR (if a single FOP  is entered in the PNR the amount is optional).

### Check Amount presence

A specific amount can be specified for each FOP. Amount in createFormOfPayment web service shall be specified in following segments:

**Field name**

**Field value**

_fopGroup/mopDescription/paymentModule/paymentData/monetaryInformation_

Amount, currency and total fare amount per FOP.

The guideline of this element is to convey all the monetary information related to the payment: amount, currency, sub-amounts...

**Data Element**

**Value**

**comment**

typeQualifier

712

Total Fare amount per FOP (fixed value = 712)

amount

100

Amount to be linked to the corresponding FOP

currency

EUR

Currency to be used

Please note that _currency_ field is not mandatory. If no currency is specified, FOP backend retrieves the currency at creation time. In the case where the pricing record has a currency different from the office profile default one, the currency used for the FOP creation is the office one.

Also, if a currency is informed in the FOP\_CreateFormOfPayment, the only check performed, in creation mode only, is to know if the currency exists or not. The currency present in the FOP\_CreateFormOfPayment can be different from the office profile default one. However, consistency checks between the FOP\_CreateFormOfPayment's one and Office's one are performed at issuance time.

### Generic FP element

The generic FOP functionality is available in Creation mode only.

-   Single FOP

Generic FP are identified when no associations are specified in _CreateFormOfPayment_ web service (neither in _pnrElementAssociation_ nor in _passengerAssociation_).  
This allows you to create a FOP  for several elements.

A Pricing record cannot be associated to 2 different FP elements.

A new FP element cannot be associated to a pricing record already associated to an FP.

-   Multi FOP
    

FOP createFormOfPayment web service allows the creation of multiple FPs in a single PNR. In order to create more than on FP element, _fopGroup_ has to be repeated in the query for each FP element to be created.  

### Specific FP element

An FP element can be associated to several PNR element, e.g. PAX1,PAX2, SEG1, SEG3

Only the following type association can be used in the CreateFormOfPayment web service:

\- PAX with passenger identifier  
\- INF with infant identifier  
\- SEG with segment identifier  
\- TST with TST identifier  
\- TSM with TSM identifier  
\- INS with Insurance element identifier  
\- FPT with Form of Payment identifier

-   Passenger Association
    

Passenger(s) are defined thanks to their identifier(s) to whom the FP should be applied. This is allowed through the field _value_ in segment _passengerAssociation_:

**Field name**

**Field value**

__passengerR_eference/type_

Passenger type: PAX, INF

__passengerR_eference/__value_

Passenger identifier

A single FP line can be attached to several passengers (infant INF and / or adults PAX). However, the addition of a FP line for several passengers is an "all or nothing" process. In other words, if the association of the FP element fails for one passenger, al the other passengers will not be associated to it either.  

In case of passenger association, a pricing record split can occurs (Please refer to "TST split" section for more information).

To select a specific type of passenger, the _type_ should be filled with a _value_ equal to INF or PAX. And, the following checks takes place:

\- If the identifier value filled in field _value_ is equal to an infant identifier, then FP creation is allowed for this specific infant and FOP backend checks that an adult is linked to this infant passenger, then FP creation is allowed for a specific adult.  
\- If the identifier value filled in field _value_ is equal to an adult identifier, then FOP backend checks that an infant is linked to this adult passenger, then FP creation is is allowed for this specific adult and also for the specific infant.

-   Segment Association
    

Segment association is available through _pnrElementAssociation_. Data element type should have the value SEG in order to identify such association.  
The value field is the identifier of selected AIR segment.

**Field name**

**Field value**

_referenceDetails/type_

Reference: SEG

_referenceDetails/__value_

Segment identifier

-   TST Association
    

TST(s) associations are available via _pnrElementAssociation_. Data element _type_ should have the value TST in order to identify such association. The _value_ field identifies the TST number.

**Field name**

**Field value**

_referenceDetails/type_

Reference: TST

_referenceDetails/__value_

TST identifier

A single FP line can be attached to several TSTs. However, the addition of a FP line for several elements is an "all or nothing" process.

-   TSM Association
    

TSM associations are available though _pnrElementAssociation_. Data element _type_ should have the value TSM in order to identify such association. The _value_ field identifies the TSM number.

**Field name**

**Field value**

_referenceDetails/type_

Reference: TSM

_referenceDetails/__value_

TSM identifier

A single FP line can be attached to several TSMs. However, the addition of a FP line for several elements is an "all or nothing" process. 

-   Insurance Association
    

The only way to enter a FP linked to an INS element is to explicitly provide association in input.

A createFormOfPayment request for Insurance with a generic FP (without any FP association) is not allowed. None FP is created in the PNR.

The FOP creation for Insurance is dependent of the IFP criterion in the office profile.

Insurance association is available through _pnrElementAssociation_. Data element _type_ should have the value INS in order to identify such association.  
The _value_ field identifies the identifier of selected AIR segment.

**Field name**

**Field value**

_referenceDetails/type_

Reference:INS

_referenceDetails/__value_

Insurance identifier

### TST split

A TST record may contain multiple passengers provided that the itinerary and specific Fare Elements are the same. Each passenger may have from one to ten TSTs containing different air/ground transportation segments. A TST may also contain more than one passenger.  
The system creates a multi-passenger TST under the following conditions:

-   The passengers are of the same type and therefore have the same airfare.

**AND**

-   PNR Fare Elements are the same for all passengers (with the exception of the FD, FZ, FA and FI that have no impact on the number of TSTs to be stored by the Central System).

If any of these specific fare elements are changed for one of the passengers, a new TST(s) is created for the changed passenger(s), and the original TST is updated to reflect the remaining passenger names. The PNR is automatically updated with the appropriate passenger/segment association.

**TST split in case of only passenger associations is specified in input:**  
Once FOP\_CreateFormOfPayment is received the following checks are performed by FOP backend:

-   If, for at least one passenger sub-type specified in input
    -   If this targeted passenger is not already covered by a dedicated FP element (with exactly same passenger associations)
    -   And if this passenger is partially covered by one or several Air pricing elements (case of several passenger sub-types gathered in a given pricing record)

Then, a TST split is required.

**TST Split in case of passenger and segment associations specified in input:**

  
The previous checks described are also done but by only selecting Air pricing which contain the segment specified in input. No TST split is performed if only segment associations are specified in CreateFormOfPayment query.  
  
Please note that segment associations are dominant over passenger associations. This means that in case a FP is already present in PNR with an explicit segment association (and eventually several passengers), then if a CreateFormOfPayment query is sent with only passenger association(s), FOP backend considers that the Pricing elements are already covered by a Form of payment.

In case of TST split failure, Process stops and FOP backend forwards the error description provided in TTSTSR (Ticketing TST SPlit Response) in fpElementError group of CreateFormOfPaymentReply.

### Additional processes

-   Negotiated fare
    

If the end user requests an authorisation on a negotiated fare, the system checks if the payment is allowed by the FOP definition.

No information is needed as input of the CreateFormOfPayment web service as the fare is flagged as negotiated in the pricing record (TST) on which the FP element is associated.

-   Duplicate
    

The "Duplicate FP" feature allows the copy of an already existing FOP, and associate it to an element (pricing record, passenger). This element shouldn't have any FOP associated.

The process has some limitations in terms of functionality:

      - Only working for FP identifier FPT. The FP line cannot be used as reference.  
      - Not accepting FP duplication for already automatically approved Credit cards.

-   Freeflow - Structured
    

At FP entry time, FOP backend is able to identify the position of a standalone freeflow text for a given FOP syntax. This indexation is sorted according to the position of the freeflow text in the relevant syntax.  
This feature is not recommended but is supported.

Freeflow text is conveyed via the _dataAndSwitchMap_ segment.  
  

**Field name**

**Field value**

_fopGroup/mopDescription/mopDetails/pnrSupplementaryData/dataAndSwitchMap/criteriaSetType_

Type of information: structured data

_fopGroup/mopDescription/mopDetails/pnrSupplementaryData/dataAndSwitchMap/criteriaDetails/attributeType_

This field is used to identify the freeflow Text to be used. Key "FF1" has to be used if first freeflow text is concerned.

_fopGroup/mopDescription/mopDetails/pnrSupplementaryData/dataAndSwitchMap/criteriaDetails/attributeDescription_

This field is used to convey the value of the selected freeflow

Checks performed once CreateFormOfPayment web service is received on FOP backend:

Once the FOP code specified in FOP\_CreateFormOfPayment is retrieved, FOP backend retrieves its syntax according to FOP table definition. The corresponding FOP syntax map is retrieved for the syntax - format - validation.  
FOP backend associates each freeflow as specified in FOP\_CreateFormOfPayment Query to the relevant freeflow position in the FOP syntax.

Please note that mandatory constant parts in FOP syntax fields should not be specified in FOP CreateFormOfPayment Query. They is automatically populated by FOP backend at time of FP insertion in PNR.

**Limitation:**

Number of freeflows text to be specified via FOP\_CreateFormOfPayment interface is currently limited to 2. If more than 2 freeflows are specified in FOP\_CreateFormOfPayment for the targeted FOP code, an error message is returned at FOP level and the process stops.  
If you need to create a FOP which contains more than 2 freeflow text, you need to use the unstructured freeflow.

-   Freeflow - Unstructured
    

This method is used to create a Form Of Payment in an unstructured way. This is used when FOP backend has no process on fields contained in a given FOP and more than 2 freeflows are present in FOP syntax. Please note that it is not recommended to use this method in case you have structured FOP because you will be strongly dependent on FOP Table syntax.

When using the CreateFormOfPayment web service with unstructured freeflow, the amount associated to the FOP has to be part of the freeflow.

**Field name**

**Field value**

_fopGroup/mopDescription/mopDetails/oldFopFreeflow/textSubjectQualifier_

value = 'ZZZ'

_fopGroup/mopDescription/mopDetails/oldFopFreeflow/source_

value = 'M'

_fopGroup/mopDescription/mopDetails/oldFopFreeflow/encoding_

value = 'ZZZ'

_fopGroup/mopDescription/mopDetails/oldFopFreeflow/freeText_

This field is used to convey the value of the FOP freeflow

-   Asynchronous
    

The asynchronous FOP allows to delay the whole payment by securing the booking. The customer can also choose the way he will pay the purchase with.

The FOP is created with the approval status 'N' in the PNR, waiting for the real payment.

Amadeus Payment Server (APS) is later called by the bank once the customer has paid and the status of the payment is changed from "pending" to "approved". Ticket issuance is then initiated by APS.

A createFormOfpayment request with an asynchronous FOP requires the following specific information as input:

**Field name**

**Field value**

_mopDescription/mopDetails/fopPNRDetails/fopCode_

FOP code value

_mopDescription/paymentModule/mopInformation/formOfPayment/type_

'AS' value for Asynchronous type

_mopDescription/paymentModule/mopInformation/asyncDataGroup/asunchronousPaymentDetails/formOfPayment/type_

Various type value (OL, AS, BL...) depending on the provider code

_mopDescription/paymentModule/mopInformation/asyncDataGroup/asunchronousPaymentDetails/providerCode_

Provider code

-   Payment with installments
    

At FP entry time, FOP backend is able to identify the position of a standalone freeflow text for a given FOP syntax. This indexation is sorted according to the position of the freeflow text in the relevant syntax.

When payment purchase with installments is requested, the following information should be specified by the in the query:

\- Number of installments  
\- First installment amount  
\- Following installment amounts  
\- Interests

If the createFormOfPayment web service is used to only create the FOP, no check is done on the input installment values.

If an authorisation is requested, the installment information is fowarded to APS at time to perform some checks.

APS is only in charge of reconciling amounts provided by FOP backend through context and the one linked to installment.

After FOP creation, the installment information is stored in the associated FOP hidden data.

Installment data have to be provided in the two following groups:

_\- mopDescription/paymentModule/paymentdata/monetaryInformation_

**Field name**

**Field value**

_typeQualifier_

'ISF' for First Installment Amount

'ISN' for Next Installment Amount

'ISI' for Installment Interest Amount

_amount_

Amount value

_currency_

Currency code

_\- mopDescription/paymentModule/paymentdata/extendedPaymentInformation/extendedPaymentdetails_

**Field name**

**Field value**

_instalmentsNumber_

Number of installments

_instalmentsFrequency_

Installment frequency value

_instalmentsStartDate_

Installment start date

_instalmentsDatrDateFormat_

Installment date format.

e.g. '101' for YYMMDD format

''105' for YYDDD format

'106' for MMDD format

...

-   Credit Card attributes
    

The credit card details are stored in the PNR. The attributes of the credit card are stored in the Credit Card Attribute record, attached to the PNR FP element.

  
An attribute record is attached to an unique FP element in the PNR.

When a credit card attribute record is created the indicator '\*AR' is appended to the FOP in cryptic mode like FPCCVI4541099100010016/0915\*AR.

The attributes of the credit card can be specified in the createFormOfPayment web service at different locations according to the data.

At _fopGroup/mopDescription/paymentModule/mopInformation/creditCardData_ location, the following CC attributes can be specified

**Field name**

**Field value**

_ccInfo/startDate_

Date when the credit card has been issued

_ccInfo/CCHolderName_

Credit card holder name

_ccInfo/issueNumber_

Issue number

The payer's date of birth and identity information are specified in the request at _fopGroup/mopDescription/paymentModule/paymentData/FraudScreeningData_ as follows

**Field name**

**Field value**

_payerDateOfBirth/year_

year

_payerDateOfBirth/month_

month

_payerDateOfBirth/day_

day

_formOfIdDetails/referencedetails/type_

type of identity number

_formOfIdDetails/referencedetails/value_

identity number

At _fopGroup/mopDescription/paymentModule/paymentSupplementaryData_ location, the agent can specify any specific airline CC attributes under a key/value format.

**Field name**

**Field value**

_attributeFunction_

function

e.g. QF

_attributeDetails/attributeType_

type of key

e.g. ONOD, GWTD

_attributeDetails/attributeDescription_

key value

## 2.2.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 2.3 Sub Structure: FOP creation with authorisation

## 2.3.1 Description

You can specify in the CreateFormOfPayment Web service if the payment should be performed at the same time of the FP line creation.

Payment authorisation can be performed for the following FOPs:

-   Credit card without approval code
-   IRU FOP without approval status
-   Account FOP
-   ...

Before the FP insertion in PNR, an authorisation query is sent by APS (Amadeus Payment Server) to the PSP or to the bank.

If authorisation process is launched, the FP lines are created in the PNR/TSM according to the FOP table definition. The FOP contains both input and specific authorisation data.

The approval code or approval status is automatically appended in the associated FOP and authorisation data are stored in the FOP hidden data record attached to the FP line for reporting purpose.

The processes, as described in the chapter "FOP creation only", remain valid even if some extra processes or options are available at authorisation time.

The automatic approval code is reserved when authorisation process is performed by APS.

According to the FOP some user information are mandatory or optional. The following ones are mandatory:

-   **For credit card**

The credit card number, the vendor code and the expiry date should be specified at location _fopGroup/mopDescription/paymentModule/mopInformation/creditCardData/ccInfo._

-   **For account FOP**

The account number, the vendor code and the membership values should be specified in the _fopGroup/mopDescription/paymentModule/mopInformation/invoiceDataGroup/invoiceInformationgroup._

The presence of the validating carrier is always required as input data.

### Frequent Flyer FOP

You may require that any redemption or upgrade request is interactively authorised with the loyalty system of the airline owning the frequent flyer card.

If authorisation is rejected by the loyalty system, the process stops. This authorisation is triggered according to the IRU FOP settings.

The FOP code should be specified at _mopDescription/mopDetails/fopPNRDetais_ location

**Field name**

**Field value**

_fopCode_

FOP code value(ex:FFR)

Mandatory information is required at _mopDescription/paymentModule/mopInformation_ location

**Field name**

**Field value**

_fopInformation__/formOfPayment/type_

'IRU' value

_invoiceDataGroup__/invoiceInformation/formOfPayment/type_

'IRU'value

_invoiceDataGroup_ _/invoiceInformation/formOfPayment/merchantCode_

Merchant code

_invoiceInformation__/formOfPayment/customerAccount_

FF number

_invoiceInformation__/formOfPayment/membershipStatus_

'IRU'value

_Routing/routingDetails/otherStation_

Provide code

### Miles & Cash FOP

The FOP Miles & Cash is a specific Frequent Flyer FOP, it is created when the customer has chosen to pay partially in miles and partially in currency/cash.

In addition of all the fields of the Frequent Flyer FOP the following information should be provided in _mopDescription/paymentModule/paymentData/sliderConversion_ location:

**Field name**

**Field value**

_sliderMode/indicator_

SLD for slider

_sliderPosition/numberOfUnits_

Number (of possible points on the slider OR Rank of the slider)

_sliderPosition/unitQualifier_

CPL for possible positions number, RNK for rank number

The following information is optional in _mopDescription/paymentModule/mopInformation_ location:

**Field name**

**Field value**

_sliderMode/type_

'CBF' value to convert base fare first

### Account FOP

Actually the CreateFormOfPayment web service supports payment with account. Several types of account can be handled.

The ELV form of payment allows direct debit (ELV) payments.

Actually the CreateFormOfPayment supports ELV FOP in structured like an account.

To specify an account FOP in the createForOfpayment query, fill in it as follows.

The FOP code has to be specified

**Field name**

**Field value**

_mopDescription__/mopDetails/fopDetails/fopCode_

FOP code value

And mandatory data have to be specified in the mopDescription/paymentModule/mopInformationlocation

**Field name**

**Field value**

_fopInformation__/type_

'ACC' value

_invoice/DataGrou_p/_invoiceDataGroup/type_

'ACC'value

_invoice/DataGroup/invoiceDataGroup/merchantCode_

Merchant id

_/invoiceDataGroup/customerAccount_

Account number

_/invoiceDataGroup/membershipStatus_

ex: 'ELV' value

_invoice/DataGroupRouting/routingDetails/otherStation_

Provider code

No check is done against the input data on APS side. We assume that it has been done by the web interface.

### Descriptive billing information (DBI) - TP card

The TP credit cards require to send the DBI within the integrated FOP creation and authorisation request. Since DBI masks are not fixed, Key/Value option is used to specify the DBI data.

APS checks the entered DBI and match it with required DBI. Several possible responses are:  
  
\- DBI are accepted, authorisation is done and approval code is returned in response. The approval code is added to FP element as well as the /ADB indicator.  
\- Some DBI are missing. The missing DBI are returned in createFormOfPayment reply.  
\- DBI, in input, have wrong format. Keys of wrong DBI and their formats are returned in reply.

If DBI is required in the createFormOfPayment web service (presence of DBI keyword in the _attributeFunction_ field ) and @10 is present in the FOP table, DBI mask is returned by FOP in the reply. Otherwise, FOP does not return the mask in response API.

At the reception of request, FOP checks if it's a TP card. In this case authorisation request is always forced even if some DBI data are missing.

DBI data have to be provided as follows in the _fopGroup/mopDescription/paymentModule/paymentSupplementaryData_ location

**Field name**

**Field value**

_attributeFunction_

'DBI' keyword

_attributeDetails__/attributeType_

Value of the key to identify the DBI data

ex: KS, RZ, AE

_attributeDetails__/attributeDescription_

key value

### Standard authorisation checks

At authorisation time, some checks are performed in addition to the ones performed at FOP creation to ensure that the request is valid against the context and the office profile setting.

-   Standard authorisation checks at reissuance

-   Check amount to be authorised

You are allowed to specify for each FOP a specific amount. Amount in createFormOfPayment web service shall be specified in following location

_fopGroup__/mopDescription/paymentModule/paymentData/monetaryInformation._

-   Decimal number

If the decimal number is specified as input, its value should match the office profile setting.

Otherwise the decimal number is retrieved from the office profile settings.

-   Currency code

If no currency is specified in the request field in the request, the system retrieves it from the officeprofile setting.

If provided the process verifies that the currency code exists in the locations office profile (default currency in field DFC and/or alternative currency in field AAC).

-   Amount

A check consistency of the FP line is performed regarding the tickets to issue. The form of paymentamounts should be equal to TST grand total.

If no amount is specified several cases can occur:

Authorisation for a single FOP

The value of the form of payment is calculated from the grand total amount in the TST (Transitional Stored Ticket) or the total amount collected of the TSM (Transitional Stored MD).

Authorisation for several FOPs

Only one FOP can have no specified amount otherwise an error is issued.

The value of the FOP, not stated and not regulated by the 'NIL' amount indicator in the FOP definition, is calculated as the difference between the grand total amount in the TST or the total amount collected of the TSM and the sum of the second and/or third FOP(s), if any.

-   Pricing record

The pricing record is mandatory for an authorisation request.

Based on its issue indicator, an authorisation request with/without the presence of an old FOP could be refused at time of authorisation.

If the pricing record's issue indicator is flagged as first issued (value I,F or U) no old FOP can be specified in input.

The system also checks if a ticket has already been issued for the selected pricing record(s). This check is based on a FA line presence in the PNR.

-   Checks authorisation swith processes

Depending on the parameters, also called switches, defined in the FOP table created to merchant or to market some specific processes may have to be performed at time of authorisation.

In case of failure, corresponding error message is returned up to customer application. The list can't be exhaustive as it is really dependent on the FOP definition parameters.

### Authorisation checks at reissuance time

At reissue time the pricing record's issue indicator is checked to validate the input FOP against the context.

Old FOP is considered as free flow text by the FOP application. So no check is performed on it. No validation is done as the ticket on which they appear could have been produced on a system other than Amadeus.

**Field name**

**Field value**

_mopDetails__/fopPNRDetails/fopDetails/SequenceNumber/number_

Value zero to identify an old FOP

_mopDetails__/oldFopFreeflow_

Old form of payment value

If the pricing record's issue indicator is flagged as reissued (value R,Y,W) an old FOP is expected in the query.

The system checks if a ticket has already been issued for the selected pricing record(s). This check is based on a FA line presence in the PNR.

In case of exchange with additional collection new FOP has to be input in addition to the old one.

### Authorisation checks at FOP append time

It is possible to insert an appended FOP to an existing authorised FOP. In such case, only the none approved FOP is authorised.

Please refer to the associated chapter to have more details on the FOP append process.

### Processes on demand

-   Split payment

This feature is used to perform a free assignment of money to two different credit cards without the constraint of being associated to one pricing record (passenger, segment, TST, TSM).

In this case the FOPs are not associated to any element in the PNR (TST, TSM, MCO, passenger) but to a particular amount of money set by the user.

The following information is specified in the _MopDescription/paymentModule/paymentData/monetaryInformatio_n group

**Field name**

**Field value**

_typeQualifier_

'LAS' value

_amount_

Amount value

_currency_

Currency code

The total amount of both credit cards in the FOPs must be equal to the total amount of pricing records.

Once FOP backend receives the CreateFormOfpayment request with the **indicator 'LAS'** (Limited Amount Split) indicator standard FOP checks are applied (format, syntax, currency check and amount consistency).

Then a splitting algorithm distributes the money from both credit cards to perform payment of all the pricing records in the PNR.

The following explains how the different amounts associated to each FOP are distributed among the pricing records in the PNR using the Limited Amount Split Algorithm.

Let's take two credit cards (noted as CC1 and CC2) with two fixed amounts associated (noted CC1\_AMNT and CC2\_AMNT respectively).  
Besides two different pricing records (PR1 and PR2) are used: each of which has a fixed amount(PR1\_AMNT and PR2\_AMNT).

For the example we assign different values to the amounts:

-   CC1\_AMNT = 1000.00BRL
-   CC2\_AMNT = 500.00BRL
-   PR1\_AMNT = 1200.00BRL
-   PR2\_AMNT = 300.00BRL

The splitting algorithm uses the real values

-   For PR1 (1200BRL): CC1AMNT(1000BRL) + CC2\_1 (200BRL)
-   For PR2 (300BRL): CC2\_2 (300BRL)

As a result two FP lines are created, one for each pricing record:

-   FP line 1: CC1/1000BRL + CC2/200BRL
-   FP line 2: CC2/300BRL

Once the splitting algorithm has been applied an authorisation query is sent to APS with the SFF indicator. This indicator activates the feature "Stop at first failure" which determines the way the authorisation process is performed.  
APS sends the request to the PSP with the all the credit card details.

  
There are three possible situations at this point:

-   The PSP grants the authorisation of both credit cards for the amounts specified.  
    The authorisation response contains one approval code for both transactions.  
    FP line is created with authorisation information for both FOPs.

-   The PSP accepts the first card and rejects the second one.  
    APS sends back an authorisation response message with a 'KOMORE' as value in the  _paymentStatus/paymentStatusInformation/statusCode_ field for the second credit card.  
    The error is detailed in the paymentStatus/paymentStatusError group.  
    No FP element is added in the PNR.

-   The PSP rejects the first credit card and no authorisation process is performed for the second credit card as the "Stop at first failure" feature is activated.  
    Consequently the special 'KOSFF' status code is included in the authorisation response at location  
    p_aymentStatus/paymentStatusInformation/statusCode_ to specify "Stop at first failure".  
    The error is detailed in the _paymentStatus/paymentStatusError_ group.  
    No FP element is created in the PNR.

-   Fraud screening

The fraud screening process concerns only credit card payments.

This following description only applies for a createFormOfpayment request with authorisation.

FOP backend has to collect information related to risk management, which had been specified in the creation request, and the ones that could be extracted from PNR context.

If data are provided as input in the createFormOfpayment web service, they override data availablein the PNR context.

Some mandatory data are requested either in the PNR context or in the request:

-   Passenger name
-   Flight information
-   Pricing record
-   Status information data ( indicator, action fields) in the request web service
-   Standard credit card information ( CC type, number, expiry date)

It is also nice to have some additional information

-   Company name ( input data or AB element in the PNR)
-   CC holder name ( input data or AB element in the PNR)
-   CC holder address ( input data or AB element in PNR)
-   CC holder address ZIP (input data or AB element in PNR)
-   Telephone information ( input data or APH,APM element in the PNR)
-   Email ( input data or APE element in the PNR)
-   SR FQTV ( from PNR context)
-   ..

The Authentication verification code may be provided at location _fopGroup/mopDescription/paymentModule/paymentData/fraudScreeningData_ as follows

**Field name**

**Field value**

_fraudScreening__/statusInformation/indicator_

'FRA' value (Fraud Screening)

_fraudScreening__/statusInformation/action_

'Y' or 'N' value

_merchantURL__/communication/internetAddress_

Internet address

_merchantURL__/communication/AdressQualifier_

'AH' for World wide Web

_ipAdress__/deviceIdentification/address_

IP address

_ipAdress__/deviceIdentification/qualifier_

'IP'

_payerPhoneOrEmail__/phoneOrEmailType_

'P'

_payerPhoneOrEmail__/telephoneNumberDetails/telephoneNumber_

Telephone number

_payerPhoneOrEmail__/telephoneNumberDetails/emailAddress_

Email address

_shopperSession__/workStationid_

Work station id

_shopperSession__/deliveringSystem/companyId_

Provider code

_payerName__/ccHolderNameDetails/surname_

CC holder surname

_payerName__/otherNameDetails/givenName_

CC holder given name

_payerDateOfBirth__/dateTime/year_

Year value

_payerDateOfBirth__/dateTime/month_

Month value

_payerDateOfBirth__/dateTime/day_

Day value

_billingAddress__/addressDetails/format_

'5' for unstructured message

_billingAddress__/addressDetails/line1_

Address line 1

_billingAddress__/addressDetails/line2_

Address line 2

_billingAddress__/addressDetails/line3_

Address line 3

_billingAddress__/addressDetails/line4_

Address line 4

_billingAddress__/addressDetails/line5_

Address line 5

_billingAddress__/addressDetails/line6_

State/Province code following ISO 3166

_billingAddress__/addressDetails/city_

City code

_billingAddress__/addressDetails/zipCode_

Zip code

_billingAddress__/addressDetails/countrycode_

Country code

_formOfIdDetails__/referenDetails/type_

CC holder identifier type:

'DLN' driver license

'FFN' Frequent Flyer number

'SSN' social security number

'PP' passeport number

'ID' locally defined number

'NI' national identity card number

'CP' CPF Brazilian security

_formOfIdDetails__/referenDetails/value_

CC holder document number

_travelShopper__/statusInformation/action_

0 : the shopper is not a traveler

1 : the shopper is a traveler

_travelShopper__/statusInformation/description_

Free text description, if needed

_shopperDetails__/shopperID/originatorTypeCode_

Type of customer: 'D' for direct consumer

_shopperDetails__/shopperID/originator_

Customer ID, account number

_shopperDetails__/shopperLogged/statusInformation/action_

0 : the shopper has not succeeded in logging

1 : the shopper has succeeded in logging

_shopperDetails__/shopperLogged/statusInformation/description_

Free text for additional login status information

_securityCode__/securityType/screeningInstructions_

3-char field, eg 'DFP' for a Finger Print Device

_securityCode__/securityKey/dataLength_

Length of the security key

_securityCode__/securityKey/dataType_

'B' as type here is binary

_securityCode__/securityKey/binaryData_

Security key data

In case of fraud screening response 'KO', no authorisation is performed to the bank and an error"Credit card denied" is sent.

In all the other cases, an authorisation may be requested depending on the airline's fraud screening setting.

In case of Fraud screening process, the FP line is not updated if the authorisation is rejected because of bad fraud screening score or bank authorisation.

If the process is successful, standard authorisation data are given back in the reply.

Fraud screening result is kept in the payment record by APS for further use but it is accessed only via Payment manager.

Extra payment-related info can be provided at location _fopGroup/mopDescription/paymentModule/paymentData/paymentDataMap_as follows

_criteriaSetType_

'EXT' extended payment   
'PAY' payment type   
'PRO' promo code   
'SAL' sale information

_criteriaDetails__/attributeType_

Sale Indicator   
Extended Payment   
Payment Type

_criteriaDetails__/attributeDescription_

For sale Indicator:

-   "I" for online and Internet sales.
-   "A" for Call center and IVR sales.
-   "P" for Kiosk sales.
-   "S" for Swipe.
-   "E" for Offline Travel agencysales.
-   "T" for Telephone.

For Extended Payment:

-   "Y" YES
-   "N" NO

For Payment Type:

-   "CREDIT"
-   "DEBIT"

-   3DS payment

A 3D-Secure transaction is a secured online payment made for VISA or MasterCard cards.

If a transaction is flagged as 3D-Secure, there is a liability shift from the merchant to the cardholder's bank (issuing bank) in case of dispute.

The goal is to provide the issuer with an ability to authenticate cardholders during online purchase thus reducing the likelihood of fraudulent usage of payment cards.

In case of 3D-Secure process the following points have to be satisfied:

\- Only one unique credit card per query

The user has to process as many queries as cards if he wants to perform 3D-Secure authorisations for several cards.

However, it is possible to perform authorisation for several FOPs (for the same card) in one call of the function, but the amount for which the authentication was done previously has to be the same than the total amount of all FOPs in authorisation request.

The none credit card FOPs are not allowed in a createFormOfPayment query with 3DS process.

\- No generic FOP

In case of 3DS query, the FOP has to be associated to every pricing records.

This chapter describes how 3DS information are forwarded to Amadeus Payment Manager via the FOP\_CreateFormOfPayment web service.

The information, requested by APS, depends on the context.

Different ways to provide input data depending on the user and on the context. The mandatory fields are specified as (M)

-   **Verification of the authentication done before the createFormOfPayment process**

_PARES decoded_

-   Directory server (M)
-   Transaction id (M)
-   Pares status (M)
-   Veres status (M)
-   Authentication indicator (M)
-   Authentication and verification code
-   URL for authentication

_PARES encoded_

-   Directory server (M)
-   Transaction id (M)
-   PARES value (M)

-   **Verification of the authentication done during the createFormOfPayment process**

Only the following data are requested

-   Directory server (M)
-   Transaction id (M)

Below the complete list of 3DS input fields:

-   **Directory server used for enrollment**

The Directory server, used to check credit card enrolment, has to be specified in the _creditCardCompany_ field of the _fopGroup/mopDescription/paymentModule/mopDetailedData/creditCardDetailedData/tdsInformation/authenticationData/authenticationDataDetails_ group_._

Right now Amadeus only supports the Visa and MasterCard directory servers. User has to provide the DS used in the query like below:

**Field name**

**Field value**

_creditCardCompany_

VIDS : Visa directory

CADS : MasterCard directory server

AXDS : American Express

DCDS :  Diners directory

JCDS : JCB directory

-   **Authentication indicator (ECI)**

This data indicates the status of the enrolment and authentication phases. It is provided in the _fopGroup/mopDescription/paymentModule/mopDetailedData/creditCardDetailedData/tdsInformation/authenticationData/authenticationDataDetails_ group_._

**Field name**

**Field value**

_authenticationIndicator_

Authentication value depending on the type of card: Visa or MasterCard

-   **3DS 1.0 transaction id (XID)**

Any 3DS 1.0 transaction is identified by a unique transaction id.

The user has to provide the following data in the _fopGroup/mopDescription/paymentModule/mopDetailedData/creditCardDetailedData/tdsInformation_ group.

**Field name**

**Field value**

_tdsBlobData__/_tdsBlbIdentifier/referenceDetails

'XID' value to specify transaction identifier

tdsBlobData/dataLength

Data length

tdsBlobData/dataType

Type of data ( 'B' for binary value)

tdsBlobData/binarydata

XID value

-   **3DS 2.0 transaction id (3DS\_SERVER\_TRANSACTIONID)**

The 3DS\_SERVER\_TRANSACTIONID represents the 3DS 2.0 partner transaction identifier.

It is provided in the _fopGroup/mopDescription/paymentModule/mopDetailedData/creditCardDetailedData/tdsInformation_ group.

**Field name**

**Field value**

_tdsBlobData__/_tdsBlbIdentifier/referenceDetails

'3DS\_SERVER\_TRANSACTIONID' 

tdsBlobData/dataLength

Data length

tdsBlobData/dataType

Type of data ( 'B' for binary value)

tdsBlobData/binarydata

3DS\_SERVER\_TRANSACTIONID value

-   **Directory Server transaction id (DS\_TRANSACTIONID)**

The DS\_TRANSACTIONID is the transaction identifier related to the Directory Server.

It is provided in the _fopGroup/mopDescription/paymentModule/mopDetailedData/creditCardDetailedData/tdsInformation_ group.

**Field name**

**Field value**

_tdsBlobData__/_tdsBlbIdentifier/referenceDetails

'DS\_TRANSACTIONID'

tdsBlobData/dataLength

Data length

tdsBlobData/dataType

Type of data ( 'B' for binary value)

tdsBlobData/binarydata

DS\_TRANSACTIONID value

-   **Enrolment status (VERES status)**

The VERES status indicates the result of enrolment verification (PAN authentication available or not). Depending on the value of this indicator, the merchant can choose not to proceed with the authorisation for this card. The possible values are:

-   Y - authentication available
-   N - cardholder not participating
-   U - unable to participate
-   N - error message received from Directory Server

  
If an authorisation is required after enrolment verification, the VERes status has to be sent into the authorisation query in the location _fopGroup/mopDescription/paymentModule/mopDetailedData/creditCardDetailedData/tdsInformation/authenticationData/authenticationDataDetails._

**Field name**

**Field value**

_veres_

VERES status

-   **PARES status**

  
The PARES status specifies the status of the card holder authentication. Its location is in the group _fopGroup/mopDescription/paymentModule/mopDetailedData/creditCardDetailedData/tdsInformation/authenticationData/authenticationDataDetails._

Various values can be provided

-   Y - Cardholder authenticated successfully
-   N - Cardholder failed authentication, transaction rejected
-   U - Unable for authentication, the ACS has a technical failure
-   A - Attempted authentication. That means that the cardholder has used an alternative authentication way (PIN forgotten, re-enrolled throughthe process)

**Field name**

**Field value**

_pares_

PARES status

-   **ACS URL**

  
If an URL has to be provided in the createFormOfPayment web service the following information are mandatory at location _fopGroup/mopDescription/paymentModule/mopDetailedData/creditCardDetailedData/tdsInformation/authenticationData/acsURL/communication_

  
**Field name**

**Field value**

_internetAddress_

ACS URL value

_addressQualifier_

'AH' for World Wide Web

-   **Authentication response (PARES/CHALLENGE\_DATA)**

  
The Authentication functionality in 3D-secure is used to validate the response of the end-user authentication.  
It is the merchant's responsibility to perform the authentication transaction with the ACS (access control server). Once the authentication transaction is performed, the merchant has the possibility to decode and validate the authentication response (PARES/CHALLENGE\_DATA).  
  
The authentication response has to be specified at location _fopGroup/mopDescription/paymentModule/mopDetailedData/creditCardDetailedData/tdsInformation/tdsBlobData_ by following the above example

**Field name**

**Field value**

_tdsBlbIdentifier__/referenceDetails_

'PARES' value for 3DS 1.0 or 'CHALLENGE\_DATA' value for 3DS 2.0

_tstBlbData/dataLength_

Data length

_tstBlbData/dataType_

Type of data ('B' for binary value)

_tstBlbData/binaryData_

PARES or CHALLENGE\_DATA

-   **3DS authentication verification code**

The Authentication verification code may be provided at location _fopGroup/mopDescription/paymentModule/mopDetailedData/creditCardDetailedData/tdsInformation/tdsBlobData_ as follows

**Field name**

**Field value**

_tdsBlbIdentifier__/referenceDetails_

CAVV : Visa, Diners, JCB

AEVV : American Express  

AAV : Mastercard

_tstBlbData/dataLength_

Data length

_tstBlbData/dataType_

Type of data ('B ' for binary value)

_tstBlbData/binaryData_

CAVV or AAV value

### Best effort

You can specify in the query whether or not the FP line has to be created even if payment failed.

It is then up to the client application to perform cleaning if the payment has been tried by Amadeus Payment System and failed.

The _bestEffort_ tag is used to specify if FP line has to be created even if one of the FOP authorisation fails. Field _action_ is used to confirm the requirement.

**Field name**

**Field value**

_bestEffort_

'CFP'value

_fieldAction_

'KK'value

If case of payment failure we have the following cases:

-   **All the FOPs failed at authorisation time**

-   The FP line is created without any payment information. Applicable error(s), returned by the PSP/bank, is conveyed up to he customer.
-   The FP line is created with all the input FOPs but only payment data for all successful authorised Fop(s) are associated to the FP line.

-   **At least one out of whole FOP is authorised**

If errors occur a hierarchy of errors is adopted to identify which FOP is deficient and the response message details the type of error of the defective FOP(s).

Please note that Best effort process, as described above, is only available on authorisation failure ie when the payment is rejected by the PSP/bank.

If the FOP is rejected by FOP package due to syntax error or by APS before sending the authorisation request, the FOP is rejected and the FP line is not created at all.

-   ### CardOnFile identifier
    

At _fopGroup/mopDescription/paymentModule/paymentData/paymentDataMap_ location, the agent can specify the CardOnFileIndicator under Type/Description format. The _criteriaDetails/attributeDescription_ field can assume two values as follows:

-   F means that the message is the first in the communication
-   S means that the message is the last in the communication 

**Field name**

**Field value**

_criteriaSetType_

COF

_criteriaDetails/attributeType_

cardOnFileIndicator

_criteriaDetails__/attributeDescription_

F/S

  

## 2.3.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 3 Receiving A Reply

## 3.1 Sub Structure: 3DS payment

## 3.1.1 Description

In case of 3DS process, the following data are returned in the reply

-   Standard credit card authorisation information
-   3DS data as specified in the query
-   New specific 3DS data conveyed up to the user by APS

Most of these data are stored in the FOP hidden data attached to the FP line for reporting and tracking purpose.

Below the description of some main 3DS data returned by APS at _paymentModule/creditCardDetailedData_ location in addition to the one specified in the query.

Not all of them are returning at the same time as it depends on the link used at authorisation time.

  
More specific 3DS information may be also returned according to the bank. As it is very specific to an acquirer, the list can be specified in an exhaustive way in that user guide.

**Field name**

**Field value**

_tdsInformation/tdsBlobData/tdsBlbIdentifier/referenceDetails/value_

'XID' - 3DS 1.0 transaction identifier

'3DS\_SERVER\_TRANSACTIONID' - 3DS 2.0 partner identifier

'DS\_TRANSACTIONID' - 3DS 2.0 Directory Server transaction identifier

'PAREQ' - 3DS 1.0 Payer Authentication Request

'CREQ' - 3DS 2.0 Payer Authentication Request  

'CAVV' 'AAV' 'AEVV'

_tdsInformation/tdsBlobData/__tdsBlbData/dataLength_

Data length

_tdsInformation/tdsBlobData/__tdsBlbData/type  
_

Type of data ( 'B' for binary value)

_tdsInformation/tdsBlobData/__tdsBlbData/binarydata_

value

_tdsInformation/transStatus_

transaction status indicating Challenge or Frictionless flow

_tdsInformation/tdsVersion_

3DS protocol version 

_authorisationSupplementaryData/msgRef/authorCharacteristicIndicator_

authorisation characteristic indicator

_authorisationSupplementaryData/msgRef/authorResponseCode_

authorisation response code

_authorisationSupplementaryData/msgRef/validationCode_

validation code

_authorisationSupplementaryData/msgRef/transacIdentifier_

Visa transaction identifier

_authorisationSupplementaryData/msgRef/banknetRefNumber_

banknet reference number

_authorisationSupplementaryData/msgRef/banknetDate_

banknet reference date

_authorisationSupplementaryData/msgRef/terminalType_

card activated terminal indicator

_cardSupplementaryData/criteriaSet_

'AUT' stands for Authorisation process  
'ATN' stands for Authentication process

_cardSupplementaryData/criteriaDetails/attributeType_

Type of authorisation data

_cardSupplementaryData/criteriaDetails/attributeDescription_

Value of the data

Follow the list of the possible combinations within the _cardSupplementaryData_ group

-   **Cryptogram computation method** (criteriaSetType = ATN & criteriaDetails/attributeType = 27 )

The CRYPCOMP (Computation Method of ECI cryptogram) is provided in the PARes (CAVV algorithm), it represents the computation method used by the issuer to compute the Electronic Commerce Indicator.  
  

-   **Result of the secured payment VADS** (criteriaSetType = ATN & criteriaDetails/attributeType = E)

  
The VADRES (VADS Result of secured payment architecture) is a parameter which is built by Amadeus, it is composed of the nomenclature (AN1) concatenated to the PaRes status (Y/A/U/N/" ") and the inscription verification (AN4).  
For Credit Mutuel, the nomenclature parameter is set to 0 because, in France, architecture VADS "CB" is used. The nomenclature is set to 1 or 2, for international flows.  
The PARes status value can be set to Y/A/U/N or to blank (" ") when enrollment has not been done (no PARes status). Inscription Verification: Bitmap of the events linked to the inscription of the cardholder (VERes result).  
  

-   **Modified securisation mode (**criteriaSetType = AUT & criteriaDetails/attributeType = 28)

  
The SECMODE parameter (Secured mode of modified transaction) can be provided by Credit Mutuel in the authorisation reply. The SECMODE has two possible values:

-   09 in case of Web non-3DSecure transaction (no Enrolment Verification performed)
-   20 in case of Web 3DSecure transactions  
      
    

-   **Electronic commerce transaction type** (criteriaSetType = ATN & criteriaDetails/attributeType**\= 29 )**

The SECTYPE parameter (Secured type of electronic transaction) is computed by Amadeus.  
  

-   **Context** (criteriaSetType = AUT & criteriaDetails/attributeType =25)

The TECHENV parameter (Technical and allowed environment) is computed by Amadeus. When the transaction is a Web transaction, the value of this parameter is set to 24 otherwise the value of this parameter is set to 20 (all no-Web transactions).

## 3.1.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

* * *

## 3.2 Sub Structure: Add creation only

## 3.2.1 Description

In FOP creation mode only, the createFormOfPayment web service returns a few information relative to the FOP created:

-   The FOP line as it will be displayed in the PNR (without passenger indicator)
-   The element(s) linked to this FOP newly created (TST, PAX, TSM, SEG identifiers)
-   Structured FOP data

**Field name**

**Field value**

_fopDescription/fopReference/reference/number_ 

FP identifier

_fopDescription/passengerAssociation/passengerReference/type_

Passenger type

_fopDescription/passengerAssociation/passengerReference/value_

Passenger identifier

_fopDescription/pnrElementAssociation/referenceDetails/type_

Element type

_fopDescription/pnrElementAssociation/referenceDetails/value_

Element identifier

_fopDescription/mopDescription/fopSequenceNumber/sequenceDetails/number_

Sequence number

_fopDescription/mopDescription/mopDetails/fopPNRDetails/fopDetails/fopCode_

Fop code

_fopDescription/mopDescription/mopDetails/fopPNRDetails/fopDetails/fopStatus_

New or Old Fop

_fopDescription/mopDescription/mopDetails/fopPNRDetails/fopDetails/fopReportingCode_

Reporting Code

## 3.2.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

* * *

## 3.3 Sub Structure: Fraud screening

## 3.3.1 Description

In case of Fraud screening process, the FP line is not updated if the authorisation is rejected because of denied fraud screening response or bank authorisation.

In case of challenge the FP line is added in the PNR with authorisation data.

If the authorisation is performed, payment information or error is given back in the reply as standard authorisation.

-   Authorisation error detailed in _mopDescription/paymentModule/paymentStatus_ group
-   Payment information provided at location _mopDescription/paymentModule/mopDetailedData/creditCardDetailedData_

In all cases, the fraud screening data, specified in input, is copied in the reply at _mopDescription/paymentModule/paymentdata/fraudScreeningData_ location and the fraud screening status is updated as below

**Field name**

**Field value**

_statusInformation/indicator_

'FRS' for Fraud screening

_statusInformation/action_

'OK', 'KO','RW' (review), 'ER' (error) values according to the context

According to the context the fraud screening result may be specified at _paymentModule/paymentStatus/fraudScreeningResult_ location

**Field name**

**Field value**

_measurementQualifier_

'FRA' for Fraud screening

_measurementDetails/unit_

'P' for points value

_measurementDetails/value_

Fraud screening result value

## 3.3.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

* * *

## 3.4 Sub Structure: Split amount

## 3.4.1 Description

In case of Limited Amount Split option specified in the createFormOfPayment web service, APS sends the authorisation request to the PSP/bank with the all the credit card details.

  
There are three possible situations at this point:

-   **The PSP grants the authorisation of both credit cards for the amounts specified.**

The authorisation response contains one approval code for both transactions.

FP line is created with authorisation information for both FOPs.

-   **The PSP accepts the first card and rejects the second one.**

No FP element is added in the PNR.

The message "PAYMENT FAILED - PLEASE CONTACT AIRLINE" is returned at general level at _transmissionErrorGroup_ location.

The message "ERROR AT FOP CREATION" is returned at FP level at _fpElementError_ location.

APS sends back an authorisation response message with a 'KOMORE' as value in the _paymentStatus/paymentStatusInformation/statusCode_ field for the second credit card.

The authorisation error is detailed in the _paymentStatusError_ group.

-   **The PSP rejects the first credit card and no authorisation process is performed for the second credit card as the "Stop at first failure" feature is activated.**

No FP element is added in the PNR.

The message "PAYMENT FAILED - PLEASE CONTACT AIRLINE" is returned at general level at _transmissionErrorGroup_ location.

The message "ERROR AT FOP CREATION" is returned at FP level at _fpElementError_ location.

APS sends back an authorisation response message with a 'KOMORE' as value in the _paymentStatus/paymentStatusInformation/statusCode_ field for the first credit card.

Consequently the special 'KOSFF' value is specified in the _paymentStatus/paymentStatusInformation/statusCode_ field of the second FOP to specify "Stop at first failure".

In both cases the authorisation error is detailed in the _paymentStatusError_ group.

## 3.4.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

* * *

## 3.5 Sub Structure: Successful authorisation

## 3.5.1 Description

The createFormOfPayment response message matches the query and corresponds to a read of the FOP entered in the query, that is to say excluding the already existing information in PNR.

In a general way the response is composed of:

-   Dedicated FOP information provided in the query
-   Payment information provided by APS

When the authorisation request is accepted by the bank/PSP, some additional information is returned to the user such as:

-   The **status of the authorisation** at location _paymentModule/mopDescription/mopDetails/paymentModule/paymentStatus_

**Field name**

**Field value**

_PaymentStatusInformation/responseType_

'V'

_PaymentStatusInformation/statusCode_

'OKMORE'

'KOMORE'

-   The **authorisation amount with its currency** at location _paymentModule/mopDescription/paymentModule/paymentData/monetaryInformation/otherMonetaryInformation_

**Field name**

**Field value**

_typeQualifier_

'AUT' keyword for authorised amount

_amount_

Authorised amount

_currency_

Currency code

-   The **authorisation data** in the _paymentModule/mopDetailedData/CreditCardDetailedData_ group as below.

**Field name**

**Field value**

**Displayable from PNR**

_authorisationSupplementaryData/msgRef/retrievalReferenceNumber_

This field is used to identify and track all messages related to a given cardholder transaction (author, retry, reversal...).

This field is composed of two parts:

\- the date when the message was formatted (YDDD Julian format). Same value as the transmission date and time of the original request (Field 7 ISO 8583)

\- numeric transaction identification number on eight digits. The value in field 37 can be based on the contents of fields 7 and 11 in the original request

Position 1-4: YDDD equivalent to field 7 date

Position 5-6: the hours from time in field 7

Position 7-12:value from field 11

Y

_authorisationSupplementaryData/msgRef/authorCharacteristicIndicator_

Authorisation characteristics indicator (ACI).

Possible values: 'A', 'C', 'E', 'F', 'K', 'M', 'S', 'U', 'V', 'W', 'R', 'I', 'P', 'N', 'T'

Y

_authorisationSupplementaryData/msgRef/authorResponseCode_

Authorisation response code (field 39), eg. 00 when author is performed

Y

_authorisationSupplementaryData/msgRef/cardLevelResult_

Card Level Result - product identification value (field 62.23)

?

_authorisationSupplementaryData/msgRef/terminalType_

Additional POS information - terminal type:  
\- 'CAT' for Cardholder-activated terminal indicator  
\- 'UAT' for Unattended Acceptance Terminal

N

_authorisationSupplementaryData/respIdentification/transactionIdentifier_

Transaction identifier value.

Visa-generated identifier that is unique for each original transaction. The TID is a key element that links original authorisation request to subsequent messages such as reversals.

Y

_authorisationSupplementaryData/respIdentification/transacIdentifier_

Transaction identifier (field 62.2) is a key element that links original author request to subsequent messages (such as reversals)

Y

_authorisationSupplementaryData/respIdentification/validationCode_

Validation code value (ex: GT4O)

Y

_authorisationSupplementaryData/respIdentification/banknetRefNumber_

Banknet reference number (field 62.17, pos 8-13)

Y

_authorisationSupplementaryData/respIdentification/banknetDate_

Banknet date in MMDD format (field 62.17, pos 1-4)

Y

  

_authorisationInformation/transactionDetails/code_

Authorisation message type

110: authorisation (ISO 8583)

220: settlement (ISO 8583)

Y

_authorisationInformation/transactionDetails/type_

Credit card link used to perform the authorisation

AP: Airplus

AX: Amex

BB: Barclays

CM: Credit Mutuel

DC: Diners Club

EL: Eureline

NB: Nedbank

VI: Visa

SI: Sita

...

Y

_authorisationInformation/transactionDetails/issueIndicator_

Bulk process indicator

Possible values: N (No bulk), K (bulk), S (superbulk)

N

_authorisationInformation/transactionDetails/transmissionControlNumber_

This is a number assigned to the message initiator that uniquely identifies a cardholder transaction and all system transactions that it comprises.

That trace number remains unchanged for all messages throughout the life of the transaction (authorisation request, authorisation response and in any advices of authorisations.

The name can be different according to the link used (STAN number (iso 8583), message number (APACS70)...)

N

_approvalDetails/approvalCodeData/approvalCode_

Approval code value

Y

_approvalDetails/approvalCodeData/sourceOfApproval_

'A' for automatic approval code

?

-   The **company name**

The company name is specified in the _FopGroup/mopDescription/paymentModule/paymentData location_

**Field name**

**Field value**

_companyCode_

Provider name ( ex: 'AF','BA'....)

-   The **date and time** of the authorisation

The date and time of the authorisation request is given back to the user at _FopGroup/mopDescription/paymentModule/mopDetailedData/creditCardDetaileddata_

**Field name**

**Field value**

**Displayable from PNR**

_businessSemantic_

Transaction date/time qualifier 'T'

Y

_timeMode_

Indicate if the time is expressed in UTC or in local mode:

'ZT', 'L' valuej

N

_dateTime/year_

Year number format YYYY

Y

_dateTime/month_

Month number in the year. Begins from 1

Y

_dateTime/day_

Day number in the month. Begins from 1

Y

_dateTime/hour_

Hour between 0 and 23

Y

_dateTime/minutes_

Minutes between 0 and 59

Y

_dateTime/secondes_

Secondes between 0 and 59

N

-   **Warning messages**

In case of warning messages to return to the user, the following data are also given back in the _MopDetailedData/CreditCardDetailedData/transactionStatus_ response group

**Field name**

**Field value**

errorOrWarningCodeDetails/errorDetails/errorCode

'Y' for AVS approved

'A' for CVV approved

errorOrWarningCodeDetails/errorDetails/errorCategory

'AVS' value for address verification return code

'CVV' for CVV return code

errorWarningDescription/freeTextDetails/textSubjectQualifier

'3' for literal text

errorWarningDescription/freeTextDetails/source

'M' by default

errorWarningDescription/freeTextDetails/encoding

'1' by default

errorwarningDescription/freeText

Warning or error free text

## 3.5.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

* * *

## 3.6 Sub Structure: Unsuccessful authorisation

## 3.6.1 Description

In case of authorisation failure for at least one FOP no FP element is created and exact source of error is conveyed to the customer application.

APS is in charge of providing authorisation data for successful FOP(s) and the reason of the failure for the other(s). A hierarchy in the errors is defined at three different levels to better identify the error of the failed FOP(s).

-   General level in the _transmissionError_ location

**Field name**

**Field value**

_errorOrWarningCodeDetails/errorDetails/errorCode_

Message code

_errorOrWarningCodeDetails/errorDetails/errorCategory_

'EC' for error code

_errorOrWarningDescription/freeTextDetails/textSubjectQualifier_

'CAN' for canned message explanation

'3' for literal text...

_errorOrWarningDescription/freeTextDetails/source_

'M' for manual

_errorOrWarningDescription/freeTextDetails/encoding_

'1' -freetextASCII 7 bit

_errorOrWarningDescription/freeText_

Error message description

-   FP level via the _fopDescription/fpElementError_ data

Any failure detected at FP level is identified at that location to notify the customer

**Field name**

**Field value**

_errorOrWarningCodeDetails/errorDetails/errorCode_

Message code

_errorOrWarningCodeDetails/errorDetails/errorCategory_

'EC' for error code

_errorOrWarningDescription/freeTextDetails/textSubjectQualifier_

'CAN' for canned message explanation

'3' for literal text...

_errorOrWarningDescription/freeTextDetails/source_

'M' for manual

_errorOrWarningDescription/freeTextDetails/encoding_

'1' - freetextASCII 7 bit

_errorOrWarningDescription/freeText_

Error message description

-   Deficient FOP level

Data are returned in the _mopElementError_ group in case of FOP error or in the _paymentModule/paymentStatus/paymentStatusError_ group in case of authorisation failure.

The list of errors may not be listed as it could be corresponding error messages at FOP check time or error messages as returned in the authorisation response by the bank/PSP.

Refer the error chapter to have a none exhaustive list

**Field name**

**Field value**

_errorOrWarningCodeDetails/errordetails/errorCode_

Message code

_errorOrWarningCodeDetails/errorDetails/errorCategory_

'EC' for error code

_errorOrWarningDescription/freeTextDetails/textSubjectQualifier_

'CAN' for canned message explanation

'3' for literal text...

_errorOrWarningDescription/freeTextDetails/source_

'M' for manual

_errorOrWarningDescription/freeTextDetails/encoding_

'1' - freetextASCII 7 bit

_errorOrWarningDescription/freeText_

Error message description

## 3.6.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

* * *

## 4 Error Messages

The errors are indicated at different levels in the response message to convey the exact source of the error to the customer.

-   **General level**
    
    At the top-level of the message there is an overall status that categorises the error.
    
    If the transaction failed the following messages may be returned in the _transmissionError_ group.
    
    **Amadeus error code**
    
    **Error message**
    
    Error description
    
    22427
    
    PAYMENT FAILED - PLEASE CONTACT AIRLINE
    
    A failure has been detected on APS side
    
    25779
    
    ERROR(S) DETECTED AT CREATION TIME
    
    3973
    
    INVALID EDIFACT FORMAT
    
    Wrong format of the query
    
-   **FP line level**
    
    Further down in the message, an error is returned to identify the FP line where the error is.
    
    If the transaction failed the following messages may be returned in the fopDescription/fpElementError group
    
    **Amadeus error code**
    
    **Error message**
    
    Error description
    
    1949
    
    PASSENGER AND/OR SEGMENT DATA NOT VALID
    
    At least one passenger/segment  association requested doesn't belong to PNR
    
      2102
    
     NEED TST
    
    No ticket is found linked to the FOP.  
    It can be the case for a FOP created before the selection of flight and/or services.
    
    2135
    
    INVALID FARE DATA
    
    \- TST/TSM selected not valid  
    \- The pricing amount is equal to 0.00 and the FOP is different from CASH is specified.  
    \- Invalid Fare data
    
    2312
    
    INVALID SEQUENCE NUMBER
    
    \- Invalid logical sequence for FOP  position in the FP line.  
    \- More than 3 new FOPs and one old FOP have been specified in input
    
    3323
    
    NEED TST FOR SPECIFIED SEGMENTS
    
    Segment must be priced.
    
    3671
    
    FARE ELEMENT ALREADY EXISTS FOR PASSENGER/SEGMENT
    
    Element (PAX, SEG, TST,TSM) already  associated to an FP element
    
    3811
    
    INVALID AMOUNT
    
    No amount specified for the append  FOP
    
    3836
    
    FP MAXIMUM LENGTH EXCEEDED
    
    Input data exceed the maximum length  
    
    4691
    
    INVALID FORM OF PAYMENT SELECTION
    
    Invalid FP identifier is specified in  segment fopReference
    
    4800
    
    DISCREPANCY BETWEEN FP  
    SPLIT AMOUNT(S) AND TICKET  
    TOTAL FARE
    
    The sum of the amounts of both credit cards are not equal to the amount of pricing record(s)
    
    10852
    
    OLD FOP MISSING
    
    The pricing record is in reissue mode and no OLD FOP has been specified as input
    
    11441
    
    ACTION NOT ALLOWED. CHECK YOUR OFFICE PROFILE
    
    Check IFP value for insurance association.
    
      21586
    
    FPO NOT ALLOWED FOR FIRST  ISSUE
    
    An old FOP is specified although the  pricing record is not in reissue mode
    
    24085
    
    TST PRICING CONTEXT MODIFIED: PLEASE REPRICE
    
    If the pricing context has changed the process and repricing is required
    
    25799
    
    ERROR AT FOP CREATION: SOME FOPS ARE DEFECTIVE
    
    A failure has been detected by the FOP  application regarding FOP checks
    
    33303
    
    OB FEES PRICING CALCULATION PROBLEM
    
    An error occurred on pricing application
    
    33305
    
    TECHNICAL ERROR-UNABLE TO UPDATE PRICING RECORD
    
    A problem occurred when trying to update the pricing records with OB Fees amount
    
-   **FOP level**
    
    If applicable, for each of the FOP there is a detailed error message describing precisely the rejection.
    
    The error is returned at different places according to the origin of the error
    
    -   **Payment errors**
        
        The errors, returned at authorisation time, are stored in the fopDescription/mopDescription/paymentModule/paymentStatus/paymentStatusError group.
        
        They identify the response of the bank or PSP. The following list can't be exhaustif as it depends on the link used at authoriation time and on the merchant.
        
        Amadeus error code
        
        Error message
        
        Error description
        
        267
        
          CHECK CURRENCY CODE
        
        \- The input currency code is not  allowed by the office profile setting.  
        \- The specified currency code does not agree with that of the TST grand total for air tickets or of the TSM for MD's or does not exist in the  locations office profile (default  currency in field DFC and/or alternative currency in field AAC)
        
        313
        
        INVALID ACCOUNT NUMBER
        
        432
        
        INVALID CURRENCY CODE
        
        806
        
        NOT AUTHORISED
        
        1149
        
        CREDIT CARD EXPIRED
        
        1621
        
        CONFLICTING CURRENCY
        
        The tickets total amounts are in different currencies
        
        2215
        
        DISCREPANCY BETWEEN  
        FP AMOUNT(S) AND TICKET  
        TOTAL(S)
        
        \- The form of payment amounts exceed TST grand total  
        \- The form of payment amounts are LESS than total and there is no  unstated amount
        
        2219
        
        DO NOT HONOR
        
        2668
        
        PARAMETER COMBINATION INVALID/RESTRICTED
        
        2894
        
        ERROR MESSAGE NOT FOUND
        
        3025
        
        ALL PASSENGERS/SEGMENTS ALREADY TICKETED
        
        A ticket has already been issued for the selected pricing record(s): a FA  element already exists
        
        3654
        
        INVALID NUMBER OF DECIMAL POSITIONS
        
        3673
        
        LINK DOWN - RETRY
        
        3941
        
        TKT CREDIT CARD LINK DOWN - PLEASE CALL TO AUTHORISE
        
        3953
        
        TKT CREDIT CARD ERROR : CALL TO AUTHORISE
        
        3955
        
        TKT CREDIT CARD ERROR : INVALID ACCOUNT NUMBER
        
        4070
        
        UNABLE TO PROCESS - CONTACT HELP DESK
        
        4153
        
        CREDIT CARD DENIAL 1 - CALL TO AUTHORISE
        
        4154
        
        CREDIT CARD DENIAL 1.01 - CALL TO AUTHORISE
        
        4155
        
        CREDIT CARD DENIAL 1.02 - CALL TO AUTHORISE - SPECIAL CASE
        
        4156
        
        CREDIT CARD DENIAL 1.03 - CALL TO AUTHORISE - INVALID MERCH ID
        
        4157
        
        CREDIT CARD DENIAL 1.15 - CALL TO AUTHORISE- INVALID BIN
        
        4158
        
        CREDIT CARD DENIAL 1.91 - CALL TO AUTHORISE - ISSUER INOPERATIVE
        
        4159
        
        CREDIT CARD DENIAL 4 - PICKUP CARD
        
        4160
        
        CC SECURITY ID DOES NOT MATCH
        
        4161
        
        CREDIT CARD DENIAL 4.07 - PICKUP CARD - SPECIAL CASE
        
        4162
        
        CREDIT CARD DENIAL 4.41 - PICKUP CARD - CARD LOST
        
        4163
        
        CREDIT CARD DENIAL 4.43 - PICKUP CARD - CARD STOLEN
        
        4164
        
        CREDIT CARD DENIAL 5 - DO NOT HONOUR CARD
        
        4165
        
        CREDIT CARD DENIAL 5.05 - DO NOT HONOUR CARD
        
        4166
        
        CREDIT CARD DENIAL 5.12 - INVALID TRANSACTION
        
        4167
        
        CREDIT CARD DENIAL 5.51 - INSUFFICIENT FUNDS
        
        4168
        
        CREDIT CARD ERROR 04 - INVALID EXPIRATION DATE
        
        4177
        
        CREDIT CARD NOT ACCEPTED BY TICKETING AIRLINE
        
        4366
        
        CREDIT CARD ERROR 06 - INVALID FORMAT
        
        4367
        
        CREDIT CARD ERROR 0600 - UNDETERMINED EDIT ERROR
        
        4368
        
        CREDIT CARD ERROR 0619 - RE-ENTER TRANSACTION
        
        4369
        
        CREDIT CARD ERROR 0654 - EXPIRED CARD
        
        4371
        
        CREDIT CARD ERROR 0680 - INVALID DATE
        
        4373
        
        CREDIT CARD ERROR 0683 - UNABLE TO VERIFY PIN
        
        4374
        
        CREDIT CARD ERROR 0693 - CANNOT LEGALLY PROCESS
        
        4375
        
        CREDIT CARD ERROR 0696 - EDIT ERROR
        
        4377
        
        CREDIT CARD ERROR 0702 - INVALID ACCOUNT NUMBER
        
        4379
        
        CREDIT CARD DENIAL 5.52 - NO CHECKING ACCOUNT
        
        4380
        
        CREDIT CARD DENIAL 5.53 - NO SAVING ACCOUNT
        
        4382
        
        CREDIT CARD DENIAL 5.57 - TRANS NOT PERMITTED TO CARDHOLDER
        
        4384
        
        CREDIT CARD DENIAL 5.62 - RESTRICTED CARD
        
        4387
        
        CREDIT CARD DENIAL 8 - CALL TO AUTHORISE
        
        4388
        
        CREDIT CARD DENIAL 9 - CALL TO AUTHORISE
        
        4390
        
        CREDIT CARD ERROR 0114 - NO SUCH ACCOUNT
        
        4391
        
        CREDIT CARD ERROR 02 - INVALID ACCOUNT NUMBER
        
        4392
        
        CREDIT CARD ERROR 03 - INVALID AMOUNT
        
        4393
        
        CREDIT CARD ERROR 0313 - INVALID AMOUNT
        
        4395
        
        CREDIT CARD ERROR 0725 - INVALID POS CONDITION CODE
        
          4800
        
          FP NOT ALLOWED FOR NEGOTIATED FARE
        
        FOP definition doesn't allow  negotiated fare payment
        
        4905
        
        CREDIT CARD DENIAL 3 - CARDHOLDER HAS NEW NUMBER
        
        5197
        
        INVALID AIRLINE DESIGNATOR/VENDOR SUPPLIER
        
        5424
        
        UNABLE TO PROCESS LINK NOT FOUND
        
        6842
        
        INVALID SECURITY CODE(S)
        
        8692
        
        INVALID MERCHANT TYPE
        
        8699
        
        INVALID MERCHANT ID
        
        12953
        
        CCAVS TRANSACTION OK - PARTIAL MATCH ON POSTAL CODE
        
        15712
        
        CREDIT CARD DENIAL - 58 - TRANSACTION NOT ALLOWED AT TERMINAL
        
        15754
        
        INVALID EXPIRATION DATE
        
        21529
        
        INVALID NUMBER OF DECIMALS
        
        The form of payment amount is input with a number of decimals which doesn't match with the one defined in the locations office profile(default currency in field DFC and/or alternative currency in field AAC
        
        22377
        
        CREDIT CARD ERROR-PLEASE TRY AGAIN LATER
        
        22381
        
        REENTER FP-SAME CREDIT CARD WITH DIFFERENT SECURITY ID
        
        22462
        
        CREDIT CARD DENIAL - CALL TO AUTHORISE
        
        22462
        
        CREDIT CARD DENIAL - CALL TO AUTHORISE
        
        23019
        
        INVALID CREDIT CARD INPUT CHECK AND TRY AGAIN
        
        23020
        
        CREDIT CARD DENIAL
        
        23021
        
        CREDIT CARD DENIAL - PICKUP CARD
        
        23207
        
        CREDIT CARD CALL HELP DESK
        
        24081
        
        ECREDIT CARD DENIAL - NO AUTHORIZATION DONE
        
        24938
        
        INCONSISTENT RESPONSE RECEIVED FROM THE BANK
        
          27749
        
        DISCREPANCY WITH      INSTALLMENT AMOUNTS
        
        \- The amount calculated with the  installment is not equal to the amount of the pricing  
        \- The first installment amount is not  greater than the next instalment amount
        
        27750
        
        DISCREPANCY WITH  INSTALLMENT CURRENCY CODE
        
        The currency code  associated to the instalment data is different from the currency of the pricing record
        
        29321
        
        PAYMENT ERROR
        
        32946
        
         EMV PAYMENT NOT  ACCEPTED BY MERCHANT
        
        02694
        
         MANDATORY FIELDS MISSING OR INVALID
        
        38089
        
        EMV CREATION FAILURE: TIMEOUT RECEIVED FROM DEVICE
        
        38100
        
        EMV CREATION ERROR: DEVICE IS NOT IDLE
        
    -   **Fop errors**
        
        In case of FOP backend failures the errors are returned in the fopDescription/mopDescription/mopElementError goup.
        
        The following errors are the most common ones. Other error messages can be generated depending on the parameters of the FOP table definition created for the merchant or for the market.
        
        Amadeus error code
        
        Error message
        
        Error description
        
        477
        
        INVALID FORMAT
        
        Discrepancy on FOP syntax is found
        
        2098
        
        RESTRICTED FORM OF PAYMENT
        
        FOP not authorised to pay element
        
        2213
        
        INVALID FORM OF PAYMENT
        
        \- FOP format entry fails  
        \- FOP code not found in FOP table  
        \- Raw track data not specifiedand/or other fields are specified in segment creditCardDetails  
        \-  Incorrect freeflow format  
        
        4800
        
        FP NOT ALLOWED FOR NEGOTIATED FARE
        
        FOP definition doesn't allow negotiated fare payment
        
        3504
        
        COMBINATION NOT ALLOWED
        
        FOPs combination restricted via FOP  combination tables
        
        3815
        
        INVALID FORM OF PAYMENT FOR ZERO AMOUNT
        
        When no amount is specified in all FOPs
        
        3906
        
        DESCRIPTIVE BILLING DATA NOT ACCEPTED
        
        Wrong format in DBI data
        
        7349
        
        NEW FOP REQUIRED FOR ADDITIONAL COLLECTION
        
        Need to add a new FOP in order to pay remaining amount
        
        11576
        
        NO CREDIT CARD ELIGIBLE FOR VALIDATION
        
        Authorisation request sent to APS for a  none credit card Form Of Payment
        
        12267
        
        DBI REQUESTED-VALIDATE CARD(S) PRIOR TO TICKET
        
        Some DBI data are missing  
        
        12416
        
          MESSAGE FORMAT PROBLEM - UNABLE TO PROCESS
        
        More than 2 freeflows are specified in  FOP\_CreateFormOfPayment for the  targeted FOP code
        

  

* * *

## 5 Operations

## 5.1 Operation: 3DS 2.0 External Authentication (Travel Agency only)

This use case is for Travel Agencies only, adopting external 3DS solution. The result of the enrolment and authentication is sent in FOP\_CreateFormOfPayment request to authorize the payment.

In this Operation, the authorization is performed at payment creation time.

**Introduction:**

The Three-Domain Secure allows authentication of the cardholder at the time of the purchase and consequently reduces the risk of fraud and helps towards the elimination of costs related to fraudulent transactions.

3-D Secure 2.0 is processed in three steps, as illustrated below.

**Step 1:** Enrolment 

Consists in verifying that the cardholder is 3DS 2.0 enrolled and the authentication is available, through call to the issuing bank.

**Step 2:** Authentication 

Starts a dialogue with the cardholder’s issuing bank to find out if the user’s online password matches the password logged by the cardholder with his/her bank. The Merchant’s website browses to the ACS (access control server) website (Issuer) and the cardholder submits his/her password provided by issuing bank.

**Step 3:** Validation (authorization)

In order to process a 3D-Secure authorization, the enrolment and authentication must have been performed. The authorization request is sent to the bank with the result of the enrolment and authentication, as well the 3DS 2.0 data.

 FOP\_CreateFormOfPayment interface is involved in **Step 3**.

**Query:**

Below the list of 3DS input fields in the FOP\_CreateFormOfPayment message request.

Legend:

-   Y = Yes (required field)
-   N = Not (not required)
-   O = Optional (not required but highly recommended)

Group: _fopGroup/mopDescription/paymentModule/mopDetailedData/creditCardDetailedData/tdsInformation/authenticationData_

**Field name**

**Field value**

**Example**

**Required**

_authenticationDataDetails_ 

_authenticationDataDetails__/creditCardCompany_

Directory server company code

VIDS : Visa directory server

CADS : MasterCard directory server

AXDS : American Express directory server

DCDS :  Diners directory server

JCDS : JCB directory server

Y

_authenticationDataDetails__/authenticationIndicator_

ECI/UCAF value

UCAF (Mastercard)

00 : Authentication failed

01 : Authentication attempted

02 : Authentication successful

ECI (Visa, American Express, JCB, Diners)

05 : Authentication successful

06 : Authentication attempted

07 :  Authentication failed

Y

_authenticationDataDetails__/transStatus_

Transaction status

**Note: 3DS 2.0 specific**

Y : authentication successful

N : authentication failed

U : unable to authenticate

A : attempt processing performed

Y

_tdsVersion_

3DS protocol version

**Note: 3DS 2.0 specific**

2.0.1

Y

Group: _fopGroup/mopDescription/paymentModule/mopDetailedData/creditCardDetailedData/tdsInformation/tdsBlobData_

**Field name**

**Field value**

**Example**

**Required**

_tdsBlbIdentifier__/referenceDetails/value_

Message block name

**Note: 3DS 2.0 specific**

CAVV : Visa, Diners, JCB

AEVV : American Express  

AAV : Mastercard

DS\_TRANSACTIONID

Y

_tdsBlbData__/dataLength_

Data length

28

Y

_tdsBlbData__/dataType_

Type of data (binary)

B

N

_tdsBlbData__/binarydata_

Block content

a2wvZnlTTVJ1eVZIaFl2WWt1T1dyREV6T0RBPQ==

Y

DS\_TRANSACTIONID message block is specific to 3DS 2.0. CAVV represents the Cardholder Authentication Verification Value and its name changes according to the Directory Server.

DS\_TRANSACTIONID and  CAVV/AEVV/AAV are both required.

_Example:_

<tdsBlobData\>

          <tdsBlbIdentifier\>

                     <referenceDetails\>

                        <value>DS\_TRANSACTIONID</value>

                         </referenceDetails\>

                  </tdsBlbIdentifier\>

                   <tdsBlbData\>

                           <dataLength\>19</dataLength\>

                            <dataType\>B</dataType\>

                          <binaryData\>dGhpc2lzYmFzZTY0RW5jb2RlZA==</binaryData\>

                       </tdsBlbData\>

      </tdsBlobData\>

Group: _fopGroup/mopDescription/paymentModule/mopDetailedData/creditCardDetailedData/cardSupplementaryData_

**Field name**

**Field value**

**Example**

**Required**

_criteriaSetType_

Flag type

3DS

Y

_criteriaDetails/attributeType_

External 3DS authentication indicator

EXTERNAL\_AUTHENTICATION

Y

_criteriaDetails/attributeDescription_

Description

Y

Y

The attribute (flag) “EXTERNAL\_AUTHENTICATION” is mandatory, in order to distinguish the internal Amadeus authentication and the one performed by an external 3DS provider.

_Example:_

<cardSupplementaryData\>

     <criteriaSetType\>3DS</criteriaSetType\>

     <criteriaDetails\>

        <attributeType\>EXTERNAL\_AUTHENTICATION</attributeType\>

        <attributeDescription\>Y</attributeDescription\>

     </criteriaDetails\>

</cardSupplementaryData

Note that in this Operation, the authorization is performed at payment creation time. The value of the _transactionContext_ specifies when the form of payment has to be authorized.

-   If the code in _transactionDetails_ is “DEF”, the authorization occurs at payment creation time.
-   If the code in _transactionDetails_ is “FP” or the whole segment _transactionContext_ is missing, the authorization occurs at document issuing time.

_Example:_

  <FOP\_CreateFormOfPayment xmlns="http://xml.amadeus.com/TFOPCQ\_XX\_X\_1A">

       <transactionContext\>

             <transactionDetails\>

                   <code>FP</code>

             </transactionDetails\>

    </transactionContext\>

**Reply:**

The same 3DS data in input are returned in the message response FOP\_CreateFormOfPaymentReply.

Group: _fopDescription/fopReference/reference_

In case the form of payment has been created, the _fopReference_ contains its numeric identifier.

_Example:_

<fopReference\>

      <reference>

        <qualifier>FPT</qualifier>

        <number>15</number>

      </reference>

    </fopReference\>

Group: _paymentModule/mopDetailedData/creditCardDetailedData/approvalDetails/approvalCodeData/approvalCode_ 

In case the Credit Card has been successfully authorized, the FOP\_CreateFormOfPaymentReply contains the _approvalCode_ of the authorization.

_Example:_

<approvalDetails\>

        <approvalCodeData>

                <approvalCode\>123456789</approvalCode\>

                <sourceOfApproval\>A</sourceOfApproval\>

         </approvalCodeData>

</approvalDetails\>

## 5.1.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<FOP\_CreateFormOfPayment xmlns="http://xml.amadeus.com/TFOPCQ\_19\_2\_1A"> <transactionContext> <transactionDetails> <code>DEF</code> </transactionDetails> </transactionContext> <fopGroup> <fopReference></fopReference> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>1</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>CC</fopCode> </fopDetails> </fopPNRDetails> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <paymentData> <merchantInformation> <companyCode>6X</companyCode> </merchantInformation> </paymentData> <mopInformation> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardData> <creditCardDetails> <ccInfo> <vendorCode>VI</vendorCode> <cardNumber>4622679999990501</cardNumber> <expiryDate>1020</expiryDate> </ccInfo> </creditCardDetails> </creditCardData> </mopInformation> <dummy></dummy> <mopDetailedData> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardDetailedData> <authorisationSupplementaryData></authorisationSupplementaryData> <tdsInformation> <authenticationData> <authenticationDataDetails> <creditCardCompany>VIDS</creditCardCompany> <authenticationIndicator>05</authenticationIndicator> <transStatus>Y</transStatus> </authenticationDataDetails> <tdsVersion>2.2.0</tdsVersion> </authenticationData> <tdsBlobData> <tdsBlbIdentifier> <referenceDetails> <value>CAVV</value> </referenceDetails> </tdsBlbIdentifier> <tdsBlbData> <dataLength>28</dataLength> <dataType>B</dataType> <binaryData>QUFBQkJYbGprUUFBQUFBRUFXT1JBQUFBQUFBPQ==</binaryData> </tdsBlbData> </tdsBlobData> <tdsBlobData> <tdsBlbIdentifier> <referenceDetails> <value>DS\_TRANSACTIONID</value> </referenceDetails> </tdsBlbIdentifier> <tdsBlbData> <dataLength>28</dataLength> <dataType>B</dataType> <binaryData>Q2pENDJ0Tll0WlZ6VFcwSEVvdDVIRGt4TXpFPQ==</binaryData> </tdsBlbData> </tdsBlobData> </tdsInformation> <cardSupplementaryData> <criteriaSetType>3DS</criteriaSetType> <criteriaDetails> <attributeType>EXTERNAL\_AUTHENTICATION</attributeType> <attributeDescription>Y</attributeDescription> </criteriaDetails> </cardSupplementaryData> </creditCardDetailedData> </mopDetailedData> </paymentModule> </mopDescription> </fopGroup> </FOP\_CreateFormOfPayment>

## 5.1.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<FOP\_CreateFormOfPaymentReply xmlns="http://xml.amadeus.com/TFOPCR\_19\_2\_1A"> <fopDescription> <fopReference> <reference> <qualifier>FPT</qualifier> <number>12</number> </reference> </fopReference> <passengerAssociation> <passengerReference> <type>PAX</type> <value>1</value> </passengerReference> </passengerAssociation> <pnrElementAssociation> <referenceDetails> <type>SEG</type> <value>2</value> </referenceDetails> </pnrElementAssociation> <pnrElementAssociation> <referenceDetails> <type>TST</type> <value>1</value> </referenceDetails> </pnrElementAssociation> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>1</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>CCVI</fopCode> <fopStatus>N</fopStatus> <fopEdiCode>CCVI</fopEdiCode> <fopReportingCode>CC</fopReportingCode> <fopElecTicketingCode>CC</fopElecTicketingCode> </fopDetails> </fopPNRDetails> <oldFopFreeflow> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>CCVI/XXXXXXXXXXXX0501D1020/A022229</freeText> </oldFopFreeflow> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>S</criteriaSetType> <criteriaDetails> <attributeType>13</attributeType> <attributeDescription>1</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>D</criteriaSetType> <criteriaDetails> <attributeType>EXT</attributeType> <attributeDescription>297411190820150214</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>IPN</attributeType> <attributeDescription>5531969172</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>LNK</attributeType> <attributeDescription>AD</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>AMT</attributeType> <attributeDescription>276.54</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>1</attributeType> <attributeDescription>022229</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CCNUM</attributeType> <attributeDescription>XXXXXXXXXXXX0501</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CUR</attributeType> <attributeDescription>EUR</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CCDTE1</attributeType> <attributeDescription>1020</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>FOPCODE</attributeType> <attributeDescription>CCVI</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>151</attributeType> <attributeDescription>297411190820150214</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>VENDORCODE</attributeType> <attributeDescription>VI</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <paymentData> <merchantInformation> <companyCode>6X</companyCode> </merchantInformation> <monetaryInformation> <monetaryDetails> <typeQualifier>AIR</typeQualifier> <amount>276.54</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>AUT</typeQualifier> <amount>276.54</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>I</typeQualifier> <amount>276.54</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>IPC</typeQualifier> <amount>276.54</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>IT</typeQualifier> <amount>276.54</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>ITC</typeQualifier> <amount>276.54</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>T</typeQualifier> <amount>276.54</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TPC</typeQualifier> <amount>276.54</amount> <currency>EUR</currency> </otherMonetaryDetails> </monetaryInformation> <paymentId> <referenceType>PRI</referenceType> <uniqueReference>5531969172</uniqueReference> </paymentId> <fraudScreeningData> <fraudScreening> <statusInformation> <indicator>FRA</indicator> <action>N</action> </statusInformation> </fraudScreening> <payerPhoneOrEmail> <phoneOrEmailType>P</phoneOrEmailType> <telephoneNumberDetails> <telephoneNumber>NCE 3654 - SITE FRANCE INTERNET</telephoneNumber> </telephoneNumberDetails> </payerPhoneOrEmail> </fraudScreeningData> </paymentData> <mopInformation> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardData> <creditCardDetails> <ccInfo> <vendorCode>VI</vendorCode> <cardNumber>XXXXXXXXXXXX0501</cardNumber> <expiryDate>1020</expiryDate> <cardCountryOfIssuance>PH</cardCountryOfIssuance> <issuingBankLongName>UNION BANK OF THE PHILIPPINES</issuingBankLongName> </ccInfo> </creditCardDetails> </creditCardData> </mopInformation> <dummy></dummy> <mopDetailedData> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardDetailedData> <authorisationSupplementaryData></authorisationSupplementaryData> <approvalDetails> <approvalCodeData> <approvalCode>022229</approvalCode> <sourceOfApproval>A</sourceOfApproval> </approvalCodeData> </approvalDetails> <localDateTime> <businessSemantic>L</businessSemantic> <dateTime> <year>2019</year> <month>8</month> <day>20</day> <hour>17</hour> <minutes>2</minutes> <seconds>14</seconds> </dateTime> </localDateTime> <localDateTime> <businessSemantic>T</businessSemantic> <timeMode>L</timeMode> <dateTime> <year>2019</year> <month>8</month> <day>20</day> <hour>15</hour> <minutes>2</minutes> <seconds>13</seconds> </dateTime> </localDateTime> <authorisationInformation> <transactionDetails> <type>AD</type> <issueIndicator>N</issueIndicator> <transmissionControlNumber>297411190820150214</transmissionControlNumber> </transactionDetails> </authorisationInformation> <tdsInformation> <authenticationData> <authenticationDataDetails> <creditCardCompany>VIDS</creditCardCompany> <authenticationIndicator>05</authenticationIndicator> <transStatus>Y</transStatus> </authenticationDataDetails> <tdsVersion>2.2.0</tdsVersion> </authenticationData> <tdsBlobData> <tdsBlbIdentifier> <referenceDetails> <value>CAVV</value> </referenceDetails> </tdsBlbIdentifier> <tdsBlbData> <dataLength>28</dataLength> <dataType>B</dataType> <binaryData>QUFBQkJYbGprUUFBQUFBRUFXT1JBQUFBQUFBPQ==</binaryData> </tdsBlbData> </tdsBlobData> <tdsBlobData> <tdsBlbIdentifier> <referenceDetails> <value>DS\_TRANSACTIONID</value> </referenceDetails> </tdsBlbIdentifier> <tdsBlbData> <dataLength>28</dataLength> <dataType>B</dataType> <binaryData>Q2pENDJ0Tll0WlZ6VFcwSEVvdDVIRGt4TXpFPQ==</binaryData> </tdsBlbData> </tdsBlobData> </tdsInformation> <cardSupplementaryData> <criteriaSetType>3DS</criteriaSetType> <criteriaDetails> <attributeType>EXTERNAL\_AUTHENTICATION</attributeType> <attributeDescription>Y</attributeDescription> </criteriaDetails> </cardSupplementaryData> </creditCardDetailedData> </mopDetailedData> </paymentModule> </mopDescription> </fopDescription> </FOP\_CreateFormOfPaymentReply>

## 5.1.3 Possible Errors

See "Error Messages" section.

* * *

## 5.2 Operation: 3DS 2.x Challenge Authentication

**Introduction**

The Tree-Domain Secure allows authentication of cardholder at the time of purchase and consequently reduces the risk of fraud and helps towards the elimination of costs related to fraudulent transactions.  

3-D Secure 2.x is processed in either 2 or 3 steps.

**Step 1 (required):** Enrolment

Consists in verifying whether the cardholder is 3DS 2.0 enrolled and the authentication is required, through call to the issuing bank.

After enrolment confirmation, depending on the issuing bank decision based on the provided inputs, either:

1.  There is a direct authorization of the payment, since there is a trust on the cardholder (frictionless authentication).
2.  There is an additional needed authentication of the customer with his/her issuing bank (challenged authentication).

**Step 2 (conditional):** Authentication (only in challenge)

Starts a dialogue with the cardholder’s issuing bank to find out if the user’s online password matches the password logged by the cardholder with his/her bank. The Merchant’s website browses to the ACS (access control server) website (Issuer) and the cardholder submits his/her password provided by issuing bank.

**Step 3 (required):** Validation

At this step, the result of the enrolment and authentication is sent in the message request, in order to proceed with the payment authorization.

FOP\_CreateFormOfPayment interface is involved in **Step 3**.

**Query:**

Below the list of 3DS input fields in the FOP\_CreateFormOfPayment message request, in case of challenged authentication.

Group: _fopGroup/mopDescription/paymentModule/mopDetailedData/creditCardDetailedData/tdsInformation/authenticationData/authenticationDataDetails_ 

**Field name**

**Field value**

**Example**

_creditCardCompany_ 

Directory server used for the enrolment

VIDS : Visa directory

CADS : MasterCard directory server

AXDS : American Express

DCDS :  Diners directory

JCDS : JCB directory

Group:                                _fopGroup/mopDescription/paymentModule/mopDetailedData/creditCardDetailedData/tdsInformation/ tdsBlobData_

**Field name**

**Field value**

**Example**

_tdsBlbIdentifier/referenceDetails/value_

Message block (blob) name

CHALLENGE\_DATA

_tdsBlbData/dataLength_

Data length

28

_tdsBlbData/dataType_

Type of data (binary)

B

_tdsBlbData/binarydata_

Block content

akttd0N5Q2ljWUJwQ0IxMDg5RlJDREFBQUFBPQ==

The CHALLENGE\_DATA message block is mandatory for the validation and it is specific for 3DS 2.0 Legacy flow.

**Example 1:**

<tdsBlobData\>

          <tdsBlbIdentifier\>

               <referenceDetails\>

                          <value>CHALLENGE\_DATA</value>

                 </referenceDetails\>

             </tdsBlbIdentifier\>

              <tdsBlbData\>

                     <dataLength\>19</dataLength\>

                      <dataType\>B</dataType\>

                      <binaryData\>dGhpc2lzYmFzZTY0RW5jb2RlZA==</binaryData\>

               </tdsBlbData\>

  </tdsBlobData\>

Where: 

-   CHALLENGE\_DATA is the name of the block, containing information regarding the user authentication
-   binaryData contains the message itself

The PRI (Payment Record Identifier), identifying the payment transaction is required and must be provided at: _fopGroup/mopDescription/paymentModule/paymentData/paymentId._

**Reply:**

Below the list of 3DS data returned in the FOP\_CreateFormOfPayment message.

Group: mopDescription/paymentModule/mopDetailedData/creditCardDetailedData/tdsInformation                        

**Field name**

**Field value**

**Example**

authenticationData

authenticationDataDetails/creditCardCompany

Directory Server company code

VIDS : Visa directory

CADS : MasterCard directory server

AXDS : American Express

DCDS :  Diners directory

JCDS : JCB directory

authenticationDataDetails/authenticationIndicator

Liability shift indicator (ECI, UCAF)

UCAF (Mastercard)

00 : Authentication failed

01 : Authentication attempted

02 : Authentication successful

ECI (Visa, American Express, JCB, Diners)

05 : Authentication successful

06 : Authentication attempted

07 :  Authentication failed

authenticationDataDetails/caavAlgorithm

Indicate the algorithm used to generate the CAVV

1

authenticationDataDetails/transStatus

Transaction status

**Note: 3DS 2.0 specific**

Y : authentication successful

N : authentication failed

U : unable to authenticate

A : attempt processing performed

tdsVersion

3DS protocol version

**Note: 3DS 2.0 specific**

2.0.1

tdsBlobData

**Note: 3DS 2.0 specific (all group)**

tdsBlbIdentifier

Name of the message block

CAVV : Visa, Diners, JCB

AEVV : American Express  

AAV : Mastercard

DS\_TRANSACTIONID

3DS\_SERVER\_TRANSACTIONID

tdsBlbData/dataLength 

Number of characters into the binaryData field

28

tdsBlbData/dataType 

Type of data

B

tdsBlbData/binaryData 

Content of the message block

akttd0N5Q2ljWUJwQ0IxMDg5RlJDREFBQUFBPQ==

The DS\_TRANSACTIONID and 3DS\_SERVER\_TRANSACTIONID message blocks are specific for 3DS 2.0. CAVV/AVV and DS\_TRANSACTIONID are mandatory, while 3DS\_SERVER\_TRANSACTIONID is optional.

CAVV/AVV represents the Cardholder Authentication Verification Value and its name changes according to the Directory Server.

_Example:_

<tdsBlobData\>

          <tdsBlbIdentifier\>

               <referenceDetails\>

                          <value>DS\_TRANSACTIONID</value>

                 </referenceDetails\>

             </tdsBlbIdentifier\>

              <tdsBlbData\>

                     <dataLength\>19</dataLength\>

                      <dataType\>B</dataType\>

                      <binaryData\>dGhpc2lzYmFzZTY0RW5jb2RlZA==</binaryData\>

               </tdsBlbData\>

  </tdsBlobData\>

Where: 

-   DS\_TRANSACTIONID is the name of the block
-   binaryData contains the message itself

## 5.2.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<FOP\_CreateFormOfPayment xmlns="http://xml.amadeus.com/TFOPCQ\_19\_2\_1A"> <transactionContext> <transactionDetails> <code>DEF</code> <issueIndicator>O</issueIndicator> </transactionDetails> </transactionContext> <fopGroup> <fopReference></fopReference> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>1</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>CCVI</fopCode> <fopStatus>N</fopStatus> </fopDetails> </fopPNRDetails> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <paymentData> <merchantInformation> <companyCode>7X</companyCode> </merchantInformation> <monetaryInformation> <monetaryDetails> <typeQualifier>712</typeQualifier> <amount>100</amount> <currency>BRL</currency> </monetaryDetails> </monetaryInformation> <paymentId> <referenceType>PRI</referenceType> <uniqueReference>127056721</uniqueReference> </paymentId> <fraudScreeningData> <fraudScreening> <statusInformation> <indicator>FRA</indicator> <action>Y</action> </statusInformation> </fraudScreening> </fraudScreeningData> </paymentData> <mopInformation> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardData> <creditCardDetails> <ccInfo> <vendorCode>VI</vendorCode> <cardNumber>4400009999990004</cardNumber> <securityId>999</securityId> <expiryDate>0838</expiryDate> </ccInfo> </creditCardDetails> </creditCardData> </mopInformation> <dummy></dummy> <mopDetailedData> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardDetailedData> <authorisationSupplementaryData></authorisationSupplementaryData> <tdsInformation> <authenticationData> <authenticationDataDetails> <creditCardCompany>VIDS</creditCardCompany> </authenticationDataDetails> </authenticationData> <tdsBlobData> <tdsBlbIdentifier> <referenceDetails> <value>CHALLENGE\_DATA</value> </referenceDetails> </tdsBlbIdentifier> <tdsBlbData> <dataLength>8</dataLength> <dataType>B</dataType> <binaryData>Q2hhbERhdGE=</binaryData> </tdsBlbData> </tdsBlobData> </tdsInformation> </creditCardDetailedData> </mopDetailedData> </paymentModule> </mopDescription> </fopGroup> </FOP\_CreateFormOfPayment>

## 5.2.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<FOP\_CreateFormOfPaymentReply xmlns="http://xml.amadeus.com/TFOPCR\_19\_2\_1A"> <fopDescription> <fopReference> <reference> <qualifier>FPT</qualifier> <number>37</number> </reference> </fopReference> <passengerAssociation> <passengerReference> <type>PAX</type> <value>2</value> </passengerReference> </passengerAssociation> <passengerAssociation> <passengerReference> <type>PAX</type> <value>3</value> </passengerReference> </passengerAssociation> <pnrElementAssociation> <referenceDetails> <type>SEG</type> <value>1</value> </referenceDetails> </pnrElementAssociation> <pnrElementAssociation> <referenceDetails> <type>SEG</type> <value>3</value> </referenceDetails> </pnrElementAssociation> <pnrElementAssociation> <referenceDetails> <type>TST</type> <value>2</value> </referenceDetails> </pnrElementAssociation> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>1</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>CCCA</fopCode> <fopStatus>N</fopStatus> <fopEdiCode>CCCA</fopEdiCode> <fopReportingCode>CC</fopReportingCode> <fopElecTicketingCode>CC</fopElecTicketingCode> </fopDetails> </fopPNRDetails> <oldFopFreeflow> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>CCAX/XXXXXXXXXXX1001D1222CVA/A261402</freeText> </oldFopFreeflow> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>S</criteriaSetType> <criteriaDetails> <attributeType>13</attributeType> <attributeDescription>1</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>D</criteriaSetType> <criteriaDetails> <attributeType>CVR</attributeType> <attributeDescription>Y</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>IPN</attributeType> <attributeDescription>165541020057</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>LNK</attributeType> <attributeDescription>AX</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>POS</attributeType> <attributeDescription>1005S0S00130</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>AMT</attributeType> <attributeDescription>162.21</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>1</attributeType> <attributeDescription>261402</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CCNUM</attributeType> <attributeDescription>374909999991003</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CUR</attributeType> <attributeDescription>EUR</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>\_cvvKey</attributeType> <attributeDescription>CV</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>\_cvvValue</attributeType> <attributeDescription>A</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CCDTE1</attributeType> <attributeDescription>1222</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>FOPCODE</attributeType> <attributeDescription>CCAX</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>VENDORCODE</attributeType> <attributeDescription>AX</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <paymentData> <merchantInformation> <companyCode>AF</companyCode> </merchantInformation> <monetaryInformation> <monetaryDetails> <typeQualifier>AIR</typeQualifier> <amount>324.42</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>AUT</typeQualifier> <amount>162.21</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>I</typeQualifier> <amount>324.42</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>IPC</typeQualifier> <amount>324.42</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>IT</typeQualifier> <amount>324.42</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>ITC</typeQualifier> <amount>324.42</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>T</typeQualifier> <amount>162.21</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TPC</typeQualifier> <amount>162.21</amount> <currency>EUR</currency> </otherMonetaryDetails> </monetaryInformation> <paymentId> <referenceType>PRI</referenceType> <uniqueReference>165541020057</uniqueReference> </paymentId> <fraudScreeningData> <fraudScreening> <statusInformation> <indicator>FRA</indicator> <action>N</action> </statusInformation> </fraudScreening> <payerPhoneOrEmail> <phoneOrEmailType>P</phoneOrEmailType> <emailAddress>39625350775-M</emailAddress> </payerPhoneOrEmail> </fraudScreeningData> </paymentData> <mopInformation> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardData> <creditCardDetails> <ccInfo> <vendorCode>CA</vendorCode> <cardNumber>XXXXXXXXXXX1001</cardNumber> <expiryDate>1121</expiryDate> <ccHolderName>Name Surname</ccHolderName> </ccInfo> </creditCardDetails> </creditCardData> </mopInformation> <dummy></dummy> <mopDetailedData> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardDetailedData> <authorisationSupplementaryData> <msgRef> <retrievalReferenceNumber>903813699897</retrievalReferenceNumber> <authorResponseCode>00</authorResponseCode> </msgRef> <respIdentification> <transacIdentifier>002283153265475</transacIdentifier> </respIdentification> </authorisationSupplementaryData> <approvalDetails> <approvalCodeData> <approvalCode>261402</approvalCode> <sourceOfApproval>A</sourceOfApproval> </approvalCodeData> </approvalDetails> <localDateTime> <businessSemantic>L</businessSemantic> <dateTime> <year>2019</year> <month>2</month> <day>7</day> <hour>14</hour> <minutes>36</minutes> <seconds>49</seconds> </dateTime> </localDateTime> <localDateTime> <businessSemantic>T</businessSemantic> <timeMode>L</timeMode> <dateTime> <year>2019</year> <month>2</month> <day>7</day> <hour>13</hour> <minutes>36</minutes> <seconds>49</seconds> </dateTime> </localDateTime> <authorisationInformation> <transactionDetails> <code>1110</code> <type>AX</type> <issueIndicator>N</issueIndicator> <transmissionControlNumber>699897</transmissionControlNumber> </transactionDetails> </authorisationInformation> <tdsInformation> <authenticationData> <authenticationDataDetails> <creditCardCompany>VIDS</creditCardCompany> <authenticationIndicator>05</authenticationIndicator> <caavAlgorithm>4</caavAlgorithm> <transStatus>Y</transStatus> </authenticationDataDetails> <tdsVersion>2.0.2</tdsVersion> </authenticationData> <tdsBlobData> <tdsBlbIdentifier> <referenceDetails> <value>CAVV</value> </referenceDetails> </tdsBlbIdentifier> <tdsBlbData> <dataLength>28</dataLength> <dataType>B</dataType> <binaryData>QUFBQkE0bGtjZ0lCa0RpVk5XUnlFQ1dsaFZnPQ==</binaryData> </tdsBlbData> </tdsBlobData> <tdsBlobData> <tdsBlbIdentifier> <referenceDetails> <value>DS\_TRANSACTIONID</value> </referenceDetails> </tdsBlbIdentifier> <tdsBlbData> <dataLength>28</dataLength> <dataType>B</dataType> <binaryData>clIyR0l5cmVWMC9mbVRLTWZxQU1EQXpOaHpVPQ==</binaryData> </tdsBlbData> </tdsBlobData> </tdsInformation> <cardSupplementaryData> <criteriaSetType>AUT</criteriaSetType> <criteriaDetails> <attributeType>POS</attributeType> <attributeDescription>1005S0S00130</attributeDescription> </criteriaDetails> </cardSupplementaryData> </creditCardDetailedData> </mopDetailedData> </paymentModule> </mopDescription> </fopDescription> </FOP\_CreateFormOfPaymentReply>

## 5.2.3 Possible Errors

See "Error Messages" section.

* * *

## 5.3 Operation: 3DS 2.x Dynamic Orchestrated Challenge

**Introduction**

The Tree-Domain Secure allows authentication of the cardholder at the time of the purchase and consequently reduces the risk of fraud and helps towards the elimination of costs related to fraudulent transactions.  

3-D Secure 2.x is processed in either 1 or 3 steps.

**Step 1 (required):** Enrolment

Consists in verifying whether the cardholder is 3DS 2.0 enrolled and the authentication is required, through call to the issuing bank.

After enrolment confirmation, depending on the issuing bank decision based on the provided inputs, either:

1.  There is a direct authorization of the payment, since there is a trust on the cardholder (frictionless authentication).
2.  There is an additional needed authentication of the customer with his/her issuing bank (challenged authentication).

FOP\_CreateFormOfPayment interface is involved in **Step 1.**

**Step 2 (conditional):** Authentication (only in challenge)

Starts a dialogue with the cardholder’s issuing bank to find out if the user’s online password matches the password logged by the cardholder with his/her bank. The Merchant’s website browses to the ACS (access control server) website (Issuer) and the cardholder submits his/her password provided by issuing bank.

**Step 3 (conditional):** Validation (only in challenge)

In case more information are requested to allow the payment transaction, the end-user needs to be authenticated through URL redirection. After that, the validation is performed.

At this step, the challenge data are sent in the message request in order to check the result of the authentication and proceed with the payment authorization.

FOP\_ValidateFOP interface is involved in **Step 3**.

**Query:**

In case of 3DS Dynamic Orchestrated Payment, it is possible to call APS providing the **SUPPORT3DE** flag in: _fopGroup/mopDescription/paymentModule/paymentData/paymentDataMap_

<criteriaSetType\>**ORC**</criteriaSetType\>

<criteriaDetails\>

    <attributeType\>**SUPPORT3DE**</attributeType\>

</criteriaDetails\>

If the flag is present in the message request, it means that the calling front end is able to supports 3DS Enrolment, but it does not ensure that APS will perform 3DS Enrolment. The decision to perform it or not is taken by APS according to the configuration defined.

Here is the required data related to 3-D Secure 2.0 transaction to raise chances to get frictionless authentication:

Group: fopGroup/mopDescription/paymentModule/paymentData/distributionChannelInformation

**Field name**

**Field value**

**Example**

/distributionChannel/ distrubutionChannelField

Type of channel used: e-commerce, MOTO (mail/telephone)

**Note: 3DS 2.0 specific**

 M

Group: fopGroup/mopDescription/paymentModule/paymentData/fraudScreeningData

**Field name**

**Field value**

**Example**

fraudScreening/indicator

Indicator for fraud screening

FRA

fraudScreening/action

Value to indicate if the risk management must be performed at authorization time

Y

ipAdress

deviceIdentification/address

IP address

**Note: 3DS 2.0 specific**

192.160.3.2

deviceIdentification/qualifier

Code qualifying the address

**Note: 3DS 2.0 specific**

IP

merchantURL

communication/internetAddress

URL

myaddress.com

communication/adressQualifier 

Type of the address

AH (for World Wide Web)

payerPhoneOrEmail

phoneOrEmailType 

Phone or e-mail contact type

**Note: 3DS 2.0 specific**

E : e-mail

P : phone

M : mobile phone

telephoneNumberDetails/telephoneNumber

Telephone number of the payer used for fraud screening

**Note: 3DS 2.0 specific**

076453388

emailAddress

E-mail address of the payer used for fraud screening

**Note: 3DS 2.0 specific**

myadress@adress.com

browserInformation

deviceCategory 

Category of the device

**Note: 3DS 2.0 specific**

0 : PC

1 : mobile

userAgentHeader

Agent header sent by customer's web browser

**Note: 3DS 2.0 specific**

Mozilla/5.0

acceptHeader

Accept header sent by customer's web browser

**Note: 3DS 2.0 specific**

Group: fopGroup/mopDescription/pamentModule/mopInformation:

**Field name**

**Field value**

**Example**

fopInformation

formOfPayment/type

Form of Payment type

CC

dummy

Empty segment that must be present

creditCardData

creditCardDetails

ccInfo/vendorCode 

Vendor code of the credit card

VI : Visa

CA : Mastercard

AX : American Express

ccInfo/cardNum

Number of the payer's card

111111111111

ccInfo/expiryDate 

Expiry date of the card

1119

ccInfo/ ccHolderName 

Name displayed on the payer's card

**Note: 3DS 2.0 specific**

Name Surname

cardHolderAdress

**Note: 3DS 2.0 specific (all group)**

adressDetails/format

Address format

5

adressDetails/line1

Street address

Avenue Dr. Martin 

adressDetails/line2

Street address

James Albert 23

adressDetails/line6

Street address, mandatory for US and Canada

California

city

City name

Paris

zipCode 

Postal code

067895

countryCode 

Country code

FR

dummy

Empty segment that must be present

Group: mopDescription/paymentModule/mopDetailedData

**Field name**

**Field value**

**Example**

fopInformation

formOfPayment/type

Form of payment type

CC

dummy

Empty segment that must be present

creditCardDetailedData

authorizationSupplementaryData

Empty segment that must be present

Group: mopDescription/paymentModule/mopDetailedData/creditCardDetailedData/tdsInformation                         This is the group conveying the 3DS information: enrolment and authentication.

**Field name**

**Field value**

**Example**

authenticationData

authenticationDataDetails/creditCardCompany

Directory Server company code

VIDS : Visa directory

CADS : MasterCard directory server

AXDS : American Express

DCDS :  Diners directory

JCDS : JCB directory

tdsBlobData

**Note: 3DS 2.0 specific (all group)**

tdsBlbIdentifier

Name of the message block

sessionID

tdsBlbData/dataLength 

Number of characters into the binaryData field

28

tdsBlbData/dataType 

Type of data

B

tdsBlbData/binaryData 

Content of the message block

akttd0N5Q2ljWUJwQ0IxMDg5RlJDREFBQUFBPQ==

The message block sessionID is specific to 3DS 2.0 and it is mandatory.

_Example:_

<tdsBlobData\>

          <tdsBlbIdentifier\>

               <referenceDetails\>

                          <value>sessionID</value>

                 </referenceDetails\>

             </tdsBlbIdentifier\>

              <tdsBlbData\>

                     <dataLength\>19</dataLength\>

                      <dataType\>B</dataType\>

                      <binaryData\>dGhpc2lzYmFzZTY0RW5jb2RlZA==</binaryData\>

               </tdsBlbData\>

  </tdsBlobData\>

**Reply:**

Below the list of 3DS data returned in the FOP\_CreateFormOfPayment message, in case of a challenged authentication:

Group: mopDescription/paymentModule/mopDetailedData/creditCardDetailedData/tdsInformation                        

**Field name**

**Field value**

**Example**

authenticationData

authenticationDataDetails/creditCardCompany

Directory Server company code

VIDS : Visa directory

CADS : MasterCard directory server

AXDS : American Express

DCDS :  Diners directory

JCDS : JCB directory

authenticationDataDetails/transStatus

Transaction status

**Note: 3DS 2.0 specific**

C : challenge requested

tdsVersion

3DS protocol version

**Note: 3DS 2.0 specific**

2.0.1

acsURL

communication/internetAddress

Redirection URL for end-user authentication

**NOTE: for 3DS 1.0, 2.0 Challenge and Fallback to 1.0**

https://

communication/addressQualifier

Type of the address

AH (for World Wide Web)

tdsBlobData

**Note: 3DS 2.0 specific (all group)**

tdsBlbIdentifier

Name of the message block

CREQ

DS\_TRANSACTIONID

3DS\_SERVER\_TRANSACTIONID

tdsBlbData/dataLength 

Number of characters into the binaryData field

28

tdsBlbData/dataType 

Type of data

B

tdsBlbData/binaryData 

Content of the message block

akttd0N5Q2ljWUJwQ0IxMDg5RlJDREFBQUFBPQ==

The DS\_TRANSACTIONID, 3DS\_SERVER\_TRANSACTIONID and CREQ message blocks are specific for 3DS 2.0. CREQ and DS\_TRANSACTIONID are mandatory, while 3DS\_SERVER\_TRANSACTIONID is optional.

_Example:_

<tdsBlobData\>

          <tdsBlbIdentifier\>

               <referenceDetails\>

                          <value>CREQ</value>

                 </referenceDetails\>

             </tdsBlbIdentifier\>

              <tdsBlbData\>

                     <dataLength\>19</dataLength\>

                      <dataType\>B</dataType\>

                      <binaryData\>dGhpc2lzYmFzZTY0RW5jb2RlZA==</binaryData\>

               </tdsBlbData\>

  </tdsBlobData\>

Where: 

-   CREQ is the name of the block
-   binaryData contains the message itself

## 5.3.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<FOP\_CreateFormOfPayment xmlns="http://xml.amadeus.com/TFOPCQ\_19\_2\_1A"> <transactionContext> <transactionDetails> <code>DEF</code> <issueIndicator>O</issueIndicator> </transactionDetails> </transactionContext> <fopGroup> <fopReference> </fopReference> <passengerAssociation> <passengerReference> <type>PAX</type> <value>1</value> </passengerReference> </passengerAssociation> <pnrElementAssociation> <referenceDetails> <type>SEG</type> <value>1</value> </referenceDetails> </pnrElementAssociation> <feeTypeInfo> <selectionDetails> <option>OB</option> <optionInformation>EX</optionInformation> </selectionDetails> </feeTypeInfo> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>1</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>CCVI</fopCode> <fopStatus>N</fopStatus> </fopDetails> </fopPNRDetails> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <paymentData> <merchantInformation> <companyCode>6X</companyCode> </merchantInformation> <distributionChannelInformation> <distributionChannel> <distributionChannelField>M</distributionChannelField> </distributionChannel> </distributionChannelInformation> <fraudScreeningData> <fraudScreening> <statusInformation> <indicator>FRA</indicator> <action>Y</action> </statusInformation> </fraudScreening> <ipAdress> <deviceIdentification> <address>192.168.1.1</address> <qualifier>IP</qualifier> </deviceIdentification> </ipAdress> <merchantURL> <communication> <internetAddress>myadrress.com</internetAddress> <adressQualifier>AH</adressQualifier> </communication> </merchantURL> <payerPhoneOrEmail> <phoneOrEmailType>E</phoneOrEmailType> <emailAddress>myadress@adress.com</emailAddress> </payerPhoneOrEmail> <payerPhoneOrEmail> <phoneOrEmailType>M</phoneOrEmailType> <telephoneNumberDetails> <telephoneNumber>0600000000</telephoneNumber> </telephoneNumberDetails> </payerPhoneOrEmail> <browserInformation> <deviceCategory>0</deviceCategory> <userAgentHeader>thisisagentheader</userAgentHeader> <acceptHeader>thisisheaderaccept</acceptHeader> </browserInformation> </fraudScreeningData> <paymentDataMap> <criteriaSetType>ORC</criteriaSetType> <criteriaDetails> <attributeType>SUPPORT3DE</attributeType> </criteriaDetails> </paymentDataMap> </paymentData> <mopInformation> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy> </dummy> <creditCardData> <creditCardDetails> <ccInfo> <vendorCode>VI</vendorCode> <cardNumber>111111111111</cardNumber> <expiryDate>1221</expiryDate> <ccHolderName>MyName MySurname</ccHolderName> </ccInfo> </creditCardDetails> <cardHolderAddress> <addressDetails> <format>5</format> <line1>I live here</line1> <line2>and this place</line2> <line6>For CA or US</line6> </addressDetails> <city>MyCity</city> <zipCode>MyZIP</zipCode> <countryCode>FR</countryCode> </cardHolderAddress> </creditCardData> </mopInformation> <dummy> </dummy> <mopDetailedData> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy> </dummy> <creditCardDetailedData> <authorisationSupplementaryData> </authorisationSupplementaryData> <tdsInformation> <authenticationData> <authenticationDataDetails> <creditCardCompany>VIDS</creditCardCompany> </authenticationDataDetails> </authenticationData> <tdsBlobData> <tdsBlbIdentifier> <referenceDetails> <value>sessionID</value> </referenceDetails> </tdsBlbIdentifier> <tdsBlbData> <dataLength>17</dataLength> <dataType>B</dataType> <binaryData>thisismysessionID</binaryData> </tdsBlbData> </tdsBlobData> </tdsInformation> </creditCardDetailedData> </mopDetailedData> </paymentModule> </mopDescription> </fopGroup> </FOP\_CreateFormOfPayment>

## 5.3.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<FOP\_CreateFormOfPaymentReply xmlns="http://xml.amadeus.com/TFOPCR\_19\_2\_1A"> <fopDescription> <fopReference> <reference> <qualifier>FPT</qualifier> <number>1</number> </reference> </fopReference> <passengerAssociation> <passengerReference> <type>PAX</type> <value>1</value> </passengerReference> </passengerAssociation> <pnrElementAssociation> <referenceDetails> <type>SEG</type> <value>1</value> </referenceDetails> </pnrElementAssociation> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>1</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>CCVI</fopCode> <fopStatus>N</fopStatus> <fopEdiCode>CC</fopEdiCode> <fopReportingCode>CC</fopReportingCode> </fopDetails> </fopPNRDetails> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <paymentData> <merchantInformation> <companyCode>6X</companyCode> </merchantInformation> <monetaryInformation> <monetaryDetails> <typeQualifier>712</typeQualifier> <amount>100.00</amount> <currency>EUR</currency> </monetaryDetails> </monetaryInformation> <paymentId> <referenceType>PRI</referenceType> <uniqueReference>123456789</uniqueReference> </paymentId> <paymentDataMap> <criteriaSetType>EXT</criteriaSetType> <criteriaDetails> <attributeType>SUPPORT3DE</attributeType> </criteriaDetails> </paymentDataMap> </paymentData> <paymentStatus> <paymentStatusInformation> <responseType>V</responseType> <statusCode>OKMORE</statusCode> </paymentStatusInformation> </paymentStatus> <mopInformation> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy> </dummy> <creditCardData> <creditCardDetails> <ccInfo> <vendorCode>VI</vendorCode> <cardNumber>111111111111</cardNumber> <expiryDate>0623</expiryDate> </ccInfo> </creditCardDetails> </creditCardData> </mopInformation> <dummy> </dummy> <mopDetailedData> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy> </dummy> <creditCardDetailedData> <authorisationSupplementaryData> </authorisationSupplementaryData> <localDateTime> <businessSemantic>L</businessSemantic> <dateTime> <year>2019</year> <month>1</month> <day>1</day> <hour>18</hour> <minutes>48</minutes> <seconds>29</seconds> </dateTime> </localDateTime> <authorisationInformation> <transactionDetails> <type>XX</type> <issueIndicator>N</issueIndicator> </transactionDetails> </authorisationInformation> <tdsInformation> <authenticationData> <authenticationDataDetails> <creditCardCompany>VIDS</creditCardCompany> <transStatus>C</transStatus> </authenticationDataDetails> <tdsVersion>2.2.0</tdsVersion> </authenticationData> <acsURL> <communication> <internetAddress>ThisIsMyWebsite.com</internetAddress> <adressQualifier>AH</adressQualifier> </communication> </acsURL> <tdsBlobData> <tdsBlbIdentifier> <referenceDetails> <value>3DS\_SERVER\_TRANSACTIONID</value> </referenceDetails> </tdsBlbIdentifier> <tdsBlbData> <dataLength>19</dataLength> <dataType>B</dataType> <binaryData>thisisbase64Encoded</binaryData> </tdsBlbData> </tdsBlobData> <tdsBlobData> <tdsBlbIdentifier> <referenceDetails> <value>DS\_TRANSACTIONID</value> </referenceDetails> </tdsBlbIdentifier> <tdsBlbData> <dataLength>19</dataLength> <dataType>B</dataType> <binaryData>thisisbase64Encoded</binaryData> </tdsBlbData> </tdsBlobData> <tdsBlobData> <tdsBlbIdentifier> <referenceDetails> <value>CREQ</value> </referenceDetails> </tdsBlbIdentifier> <tdsBlbData> <dataLength>19</dataLength> <dataType>B</dataType> <binaryData>thisisbase64Encoded</binaryData> </tdsBlbData> </tdsBlobData> </tdsInformation> </creditCardDetailedData> </mopDetailedData> </paymentModule> </mopDescription> </fopDescription> </FOP\_CreateFormOfPaymentReply>

## 5.3.3 Possible Errors

See "Error Messages" section.

* * *

## 5.4 Operation: 3DS 2.x Dynamic Orchestrated Challenge - Cardinal Direct API

**Introduction**

The Tree-Domain Secure allows authentication of the cardholder at the time of the purchase and consequently reduces the risk of fraud and helps towards the elimination of costs related to fraudulent transactions.  

3-D Secure 2.x is processed in following 3 steps:

**1\. Initialization**

The 3DS initialization section is responsible for authenticating the Front End. There are 2 different implementations with Cybersource:

1.  Cardinal Direct API: With this implementation frontend authentication will be done in a hidden iFrame by using Device Data Collection URL, Reference Id and JSON Web Token that are generated by Cybersource through a dedicatd call. Device data is collected as a result.
2.  Cardinal Cruise Hybrid API: With this implementation Amadeus Payment Server component will check the appropriate configuration and return the JSON Web token if applicable. This JSON Web token will then be sent to Cardinal using the Songbird JavaScript to handle the frontend process. Device data is collected as a result.

**2\. Authentication**

The 3DS Authentication section describes 3DS credit card authentication check with Cybersource, supporting the EMVCO standard 3DS2.

With the Cardinal Direct API, device data can be sent in the authentication request in case of any issue in the frontend device data collection. Furthermore, a new field containing a return URL is required in the authentication call, which will be called by cardinal in the challenge scenario once the challenge is resolved by the user on the frontend. 

The result of this authentication check is one the following:

-   Frictionless authentication of the credit card, with liability shift for the merchant. In this case no additional step is needed, and credit card authorization can be requested.
-   Challenge needed to get authentication. In this case a challenge window is displayed to the card holder (typically in a pop in window/iframe) requesting additional information
    -   With Cardinal Direct API, 3DS\_SERVER\_AUTHENTICATION\_DATA (for JWT access token) and stepUp URL in COM segment with AH qualifier return in response.  stepUp Url is being used to handle user interaction to resolve the challenge. In this version, the AH qualifier is utilised for the stepUp URL. In version 20, both the AH and STP (stepUp URL) are provided.

**3\. Validation (Only for Challenge case)**

This use case describes 3DS credit card challenge validation with Cybersource, supporting the EMVCO standard 3DS2. It covers the validation of the challenge data.

 The result of this challenge validation is one of the following:

-   The credit card is authenticated, with liability shift for the merchant.
-   The credit card cannot be authenticated. Depending on the reason for authentication failure, credit card authorization may or may not be possible.

**Authorization**

At this step, the result of the initilization and authentication is sent in the message request, in order to proceed with the payment authorization.

FOP\_CreateFormOfPayment interface is involved in this step.

**Query:**

In case of 3DS Dynamic Orchestrated Payment, it is possible to call APS providing the **SUPPORT3DE** flag in: _fopGroup/mopDescription/paymentModule/paymentData/paymentDataMap_

<criteriaSetType\>**ORC**</criteriaSetType\>

<criteriaDetails\>

    <attributeType\>**SUPPORT3DE**</attributeType\>

</criteriaDetails\>

If the flag is present in the message request, it means that the calling front end is able to supports 3DS Enrolment, but it does not ensure that APS will perform 3DS Enrolment. The decision to perform it or not is taken by APS according to the configuration defined.

Here is the required data related to 3-D Secure 2.0 transaction to raise chances to get frictionless authentication:

Group: fopGroup/mopDescription/paymentModule/paymentData/distributionChannelInformation

**Field name**

**Field value**

**Example**

/distributionChannel/ distrubutionChannelField

Type of channel used: e-commerce, MOTO (mail/telephone)

**Note: 3DS 2.0 specific**

 M

Group: fopGroup/mopDescription/paymentModule/paymentData/fraudScreeningData

**Field name**

**Field value**

**Example**

fraudScreening/indicator

Indicator for fraud screening

FRA

fraudScreening/action

Value to indicate if the risk management must be performed at authorization time

Y

ipAdress

deviceIdentification/address

IP address

**Note: 3DS 2.0 specific**

192.160.3.2

deviceIdentification/qualifier

Code qualifying the address

**Note: 3DS 2.0 specific**

IP

merchantURL

communication/internetAddress

URL

myaddress.com

communication/adressQualifier 

Type of the address

AH (for World Wide Web)

payerPhoneOrEmail

phoneOrEmailType 

Phone or e-mail contact type

**Note: 3DS 2.0 specific**

E : e-mail

P : phone

M : mobile phone

telephoneNumberDetails/telephoneNumber

Telephone number of the payer used for fraud screening

**Note: 3DS 2.0 specific**

076453388

emailAddress

E-mail address of the payer used for fraud screening

**Note: 3DS 2.0 specific**

myadress@adress.com

browserInformation

deviceCategory 

Category of the device

**Note: 3DS 2.0 specific**

0 : PC

1 : mobile

userAgentHeader

Agent header sent by customer's web browser

**Note: 3DS 2.0 specific**

Mozilla/5.0

acceptHeader

Accept header sent by customer's web browser

**Note: 3DS 2.0 specific**

ieftLanguageTag

Indicates the browser language as defined in IETFBCP47.

**Note: Cardinal Direct API specific**

Example: en-US

screenDimensions

-   screenHeight :Total height of the cardholder's screen in pixels.
    

-   screenWidth : Total width of the cardholder's screen in pixels.
    

**Note: Cardinal Direct API specific**

screenHeight example: 864

screenWidth example: 1536

colorDepth

Indicates the bit depth of the color palette for displaying images, in bits per pixel.

**Note: Cardinal Direct API specific**

Example: 24

localDateTime

Cardholder browser local time

**Note: Cardinal Direct API specific**

Example: 2024:12:27:8:40:24

isJavaScriptEnabled

Indicates the ability of the cardholder browser to execute JavaScript.

This value is available from the fingerprint details of the cardholder's browser.

Possible values:

-   true: Cardholder's browser can execute JavaScript.
    
-   false: Cardholder's browser cannot execute JavaScript.
    

**Note: Cardinal Direct API specific**

isJavaEnabled

Indicates the ability of the cardholder browser to execute Java.

The value is returned from the navigator.javaEnabled property.

Possible values:

-   true: cardholder's browser can execute Java.
    
-   false: cardholder's browser cannot execute Java
    

**Note: Cardinal Direct API specific**

Group: fopGroup/mopDescription/pamentModule/mopInformation:

**Field name**

**Field value**

**Example**

fopInformation

formOfPayment/type

Form of Payment type

CC

dummy

Empty segment that must be present

creditCardData

creditCardDetails

ccInfo/vendorCode 

Vendor code of the credit card

VI : Visa

CA : Mastercard

AX : American Express

ccInfo/cardNum

Number of the payer's card

111111111111

ccInfo/expiryDate 

Expiry date of the card

1119

ccInfo/ ccHolderName 

Name displayed on the payer's card

**Note: 3DS 2.0 specific**

Name Surname

cardHolderAdress

**Note: 3DS 2.0 specific (all group)**

adressDetails/format

Address format

5

adressDetails/line1

Street address

Avenue Dr. Martin 

adressDetails/line2

Street address

James Albert 23

adressDetails/line6

Street address, mandatory for US and Canada

California

city

City name

Paris

zipCode 

Postal code

067895

countryCode 

Country code

FR

dummy

Empty segment that must be present

Group: mopDescription/paymentModule/mopDetailedData

**Field name**

**Field value**

**Example**

fopInformation

formOfPayment/type

Form of payment type

CC

dummy

Empty segment that must be present

creditCardDetailedData

authorizationSupplementaryData

Empty segment that must be present

Group: mopDescription/paymentModule/mopDetailedData/creditCardDetailedData/tdsInformation: This is the group conveying the 3DS information: initilization and authentication.

**Field name**

**Field value**

**Example**

authenticationData

authenticationDataDetails/creditCardCompany

Directory Server company code

VIDS : Visa directory

CADS : MasterCard directory server

AXDS : American Express

DCDS :  Diners directory

JCDS : JCB directory

tdsBlobData

**Note: 3DS 2.0 specific (all group)**

tdsBlbIdentifier

Name of the message block

sessionID

returnUrl **(Cardinal Direct API specific)**

tdsBlbData/dataLength 

Number of characters into the binaryData field

28

tdsBlbData/dataType 

Type of data

B

tdsBlbData/binaryData 

Content of the message block

akttd0N5Q2ljWUJwQ0IxMDg5RlJDREFBQUFBPQ==

The message block sessionID is specific to 3DS 2.0 and it is mandatory.

_Example:_

<tdsBlobData\>

          <tdsBlbIdentifier\>

               <referenceDetails\>

                          <value>sessionID</value>

                 </referenceDetails\>

             </tdsBlbIdentifier\>

              <tdsBlbData\>

                     <dataLength\>19</dataLength\>

                      <dataType\>B</dataType\>

                      <binaryData\>dGhpc2lzYmFzZTY0RW5jb2RlZA==</binaryData\>

               </tdsBlbData\>

  </tdsBlobData\>

**Reply:**

Below the list of 3DS data returned in the FOP\_CreateFormOfPayment message, in case of a challenged authentication:

Group: mopDescription/paymentModule/mopDetailedData/creditCardDetailedData/tdsInformation                        

**Field name**

**Field value**

**Example**

authenticationData

authenticationDataDetails/creditCardCompany

Directory Server company code

VIDS : Visa directory

CADS : MasterCard directory server

AXDS : American Express

DCDS :  Diners directory

JCDS : JCB directory

authenticationDataDetails/transStatus

Transaction status

**Note: 3DS 2.0 specific**

C : challenge requested

tdsVersion

3DS protocol version

**Note: 3DS 2.0 specific**

2.0.1

acsURL

communication/internetAddress

Redirection URL for end-user authentication

**NOTE: for 3DS 1.0, 2.0 Challenge and Fallback to 1.0**

https://

communication/addressQualifier

Type of the address

AH (for World Wide Web)

tdsBlobData

**Note: 3DS 2.0 specific (all group)**

tdsBlbIdentifier

Name of the message block

CREQ

DS\_TRANSACTIONID

3DS\_SERVER\_TRANSACTIONID

3DS\_SERVER\_AUTHENTICATION\_DATA

tdsBlbData/dataLength 

Number of characters into the binaryData field

28

tdsBlbData/dataType 

Type of data

B

tdsBlbData/binaryData 

Content of the message block

akttd0N5Q2ljWUJwQ0IxMDg5RlJDREFBQUFBPQ==

The DS\_TRANSACTIONID, 3DS\_SERVER\_TRANSACTIONID and CREQ message blocks are specific for 3DS 2.0. CREQ and DS\_TRANSACTIONID are mandatory, while 3DS\_SERVER\_TRANSACTIONID is optional.

-   With Cybersource Cradinal Direct API; in addtion to CREQ, 3DS\_SERVER\_AUTHENTICATION\_DATA the same field, AH, will be used for the stepUp URL and will be populated acoording to the Cardinal Direct API.

_Example:_

<tdsBlobData\>

          <tdsBlbIdentifier\>

               <referenceDetails\>

                          <value>CREQ</value>

                 </referenceDetails\>

             </tdsBlbIdentifier\>

              <tdsBlbData\>

                     <dataLength\>19</dataLength\>

                      <dataType\>B</dataType\>

                      <binaryData\>dGhpc2lzYmFzZTY0RW5jb2RlZA==</binaryData\>

               </tdsBlbData\>

  </tdsBlobData\>

Where: 

-   CREQ is the name of the block
-   binaryData contains the message itself

## 5.4.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<FOP\_CreateFormOfPayment xmlns="http://xml.amadeus.com/TFOPCQ\_19\_2\_1A"> <transactionContext> <transactionDetails> <code>DEF</code> <issueIndicator>O</issueIndicator> </transactionDetails> </transactionContext> <fopGroup> <fopReference></fopReference> <passengerAssociation> <passengerReference> <type>PAX</type> <value>2</value> </passengerReference> </passengerAssociation> <pnrElementAssociation> <referenceDetails> <type>SEG</type> <value>6</value> </referenceDetails> </pnrElementAssociation> <pnrElementAssociation> <referenceDetails> <type>SEG</type> <value>8</value> </referenceDetails> </pnrElementAssociation> <pnrElementAssociation> <referenceDetails> <type>SEG</type> <value>5</value> </referenceDetails> </pnrElementAssociation> <pnrElementAssociation> <referenceDetails> <type>SEG</type> <value>7</value> </referenceDetails> </pnrElementAssociation> <feeTypeInfo> <selectionDetails> <option>OB</option> </selectionDetails> </feeTypeInfo> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>1</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>CCVI</fopCode> <fopStatus>N</fopStatus> </fopDetails> </fopPNRDetails> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <paymentData> <merchantInformation> <companyCode>EY</companyCode> </merchantInformation> <monetaryInformation> <monetaryDetails> <typeQualifier>712</typeQualifier> <amount>112.30</amount> <currency>SGD</currency> </monetaryDetails> </monetaryInformation> <distributionChannelInformation> <distributionChannel> <distributionChannelField>S</distributionChannelField> </distributionChannel> </distributionChannelInformation> <fraudScreeningData> <fraudScreening> <statusInformation> <indicator>FRA</indicator> <action>Y</action> </statusInformation> </fraudScreening> <merchantURL> <communication> <internetAddress>foo.bar.com</internetAddress> <adressQualifier>AH</adressQualifier> </communication> </merchantURL> <payerPhoneOrEmail> <phoneOrEmailType>E</phoneOrEmailType> <emailAddress>Mirac.CRESPOG@GMAIL.COM</emailAddress> </payerPhoneOrEmail> <payerPhoneOrEmail> <phoneOrEmailType>P</phoneOrEmailType> <telephoneNumberDetails> <telephoneNumber>89520092</telephoneNumber> </telephoneNumberDetails> </payerPhoneOrEmail> <browserInformation> <deviceCategory>0</deviceCategory> <userAgentHeader>Mozilla/5.0 (Windows NT 10.0; Win64; x64)</userAgentHeader> <acceptHeader>text/html</acceptHeader> <ietfLanguageTag>fr-FR</ietfLanguageTag> <screenDimensions> <unit>PX</unit> <width>1920</width> <height>1080</height> </screenDimensions> <colorDepth> <unit>BPP</unit> <value>24</value> </colorDepth> <localDateTime> <year>2023</year> <month>12</month> <day>27</day> <hour>8</hour> <minutes>40</minutes> <seconds>24</seconds> <milliseconds>300</milliseconds> </localDateTime> <isJavaScriptEnabled>Y</isJavaScriptEnabled> <isJavaEnabled>Y</isJavaEnabled> </browserInformation> <payerName> <ccHolderNameDetails> <surname>Mirac Crespo</surname> </ccHolderNameDetails> </payerName> </fraudScreeningData> <paymentDataMap> <criteriaSetType>RMC</criteriaSetType> <criteriaDetails> <attributeType>CARDINALSETUPDONE</attributeType> </criteriaDetails> </paymentDataMap> <paymentDataMap> <criteriaSetType>ORC</criteriaSetType> <criteriaDetails> <attributeType>SUPPORT3DE</attributeType> </criteriaDetails> </paymentDataMap> </paymentData> <mopInformation> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardData> <creditCardDetails> <ccInfo> <vendorCode>VI</vendorCode> <cardNumber>1232239999999123</cardNumber> <securityId>999</securityId> <expiryDate>0123</expiryDate> <ccHolderName>Mirac Crespo</ccHolderName> </ccInfo> </creditCardDetails> </creditCardData> </mopInformation> <dummy></dummy> <mopDetailedData> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardDetailedData> <authorisationSupplementaryData></authorisationSupplementaryData> <tdsInformation> <authenticationData> <authenticationDataDetails> <creditCardCompany>VIDS</creditCardCompany> </authenticationDataDetails> </authenticationData> <tdsBlobData> <tdsBlbIdentifier> <referenceDetails> <value>returnURL</value> </referenceDetails> </tdsBlbIdentifier> <tdsBlbData> <dataLength>17</dataLength> <dataType>B</dataType> <binaryData>dGhpc2lzbXlyZXR1cm5VUkw=</binaryData> </tdsBlbData> </tdsBlobData> <tdsBlobData> <tdsBlbIdentifier> <referenceDetails> <value>sessionID</value> </referenceDetails> </tdsBlbIdentifier> <tdsBlbData> <dataLength>38</dataLength> <dataType>B</dataType> <binaryData>MF81ZGQ1MzcxYy0yZWVmLTQwNWItODUxZC02MDJkZTQ1ZjlkYTc=</binaryData> </tdsBlbData> </tdsBlobData> </tdsInformation> </creditCardDetailedData> </mopDetailedData> </paymentModule> </mopDescription> </fopGroup> </FOP\_CreateFormOfPayment>

## 5.4.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.4.3 Possible Errors

See "Error Messages" section.

* * *

## 5.5 Operation: 3DS 2.x Dynamic Orchestrated Frictionless

**Introduction**

The Tree-Domain Secure allows authentication of the cardholder at the time of the purchase and consequently reduces the risk of fraud and helps towards the elimination of costs related to fraudulent transactions.  

3-D Secure 2.x is processed in either 1 or 3 steps.

**Step 1 (required):** Enrolment

Consists in verifying whether the cardholder is 3DS 2.0 enrolled and the authentication is required, through call to the issuing bank.

After enrolment confirmation, depending on the issuing bank decision based on the provided inputs, either:

1.  There is a direct authorization of the payment, since there is a trust on the cardholder (frictionless authentication).
2.  There is an additional needed authentication of the customer with his/her issuing bank (challenged authentication).

FOP\_CreateFormOfPayment interface is involved in **Step 1.**

**Step 2 (conditional):** Authentication (only in challenge)

Starts a dialogue with the cardholder’s issuing bank to find out if the user’s online password matches the password logged by the cardholder with his/her bank. The Merchant’s website browses to the ACS (access control server) website (Issuer) and the cardholder submits his/her password provided by issuing bank.

**Step 3 (conditional):** Validation (only in challenge)

In case more information are requested to allow the payment transaction, the end-user needs to be authenticated through URL redirection. After that, the payment validation is performed.

At this step, the challenge data are sent in the message request in order to check the result of the authentication and proceed with the payment authorization.

FOP\_ValidateFOP interface is involved in **Step 3**.

**Query:**

In case of 3DS Dynamic Orchestrated Payment, it is possible to call APS providing the **SUPPORT3DE** flag in: _fopGroup/mopDescription/paymentModule/paymentData/paymentDataMap_

<criteriaSetType\>**ORC**</criteriaSetType\>

<criteriaDetails\>

    <attributeType\>**SUPPORT3DE**</attributeType\>

</criteriaDetails\>

If the flag is present in the message request, it means that the calling front end is able to supports 3DS Enrolment, but it does not ensure that APS will perform 3DS Enrolment. The decision to perform it or not is taken by APS according to the configuration defined.

Here is the required data related to 3-D Secure 2.0 transaction to raise chances to get frictionless authentication:

Group: fopGroup/mopDescription/paymentModule/paymentData/distributionChannelInformation

**Field name**

**Field value**

**Example**

/distributionChannel/ distrubutionChannelField

Type of channel used: e-commerce, MOTO (mail/telephone)

**Note: 3DS 2.0 specific**

 M

Group: fopGroup/mopDescription/paymentModule/paymentData/fraudScreeningData

**Field name**

**Field value**

**Example**

fraudScreening/indicator

Indicator for fraud screening

FRA

fraudScreening/action

Value to indicate if the risk management must be performed at authorization time

Y

ipAdress

deviceIdentification/address

IP address

**Note: 3DS 2.0 specific**

192.160.3.2

deviceIdentification/qualifier

Code qualifying the address

**Note: 3DS 2.0 specific**

IP

merchantURL

communication/internetAddress

URL

myaddress.com

communication/adressQualifier 

Type of the address

AH (for World Wide Web)

payerPhoneOrEmail

phoneOrEmailType 

Phone or e-mail contact type

**Note: 3DS 2.0 specific**

E : e-mail

P : phone

M : mobile phone

telephoneNumberDetails/telephoneNumber

Telephone number of the payer used for fraud screening

**Note: 3DS 2.0 specific**

076453388

emailAddress

E-mail address of the payer used for fraud screening

**Note: 3DS 2.0 specific**

myadress@adress.com

browserInformation

deviceCategory 

Category of the device

**Note: 3DS 2.0 specific**

0 : PC

1 : mobile

userAgentHeader

Agent header sent by customer's web browser

**Note: 3DS 2.0 specific**

Mozilla/5.0

acceptHeader

Accept header sent by customer's web browser

**Note: 3DS 2.0 specific**

Group: fopGroup/mopDescription/pamentModule/mopInformation:

**Field name**

**Field value**

**Example**

fopInformation

formOfPayment/type

Form of Payment type

CC

dummy

Empty segment that must be present

creditCardData

creditCardDetails

ccInfo/vendorCode 

Vendor code of the credit card

VI : Visa

CA : Mastercard

AX : American Express

ccInfo/cardNum

Number of the payer's card

111111111111

ccInfo/expiryDate 

Expiry date of the card

1119

ccInfo/ ccHolderName 

Name displayed on the payer's card

**Note: 3DS 2.0 specific**

Name Surname

cardHolderAdress

**Note: 3DS 2.0 specific (all group)**

adressDetails/format

Address format

5

adressDetails/line1

Street address

Avenue Dr. Martin 

adressDetails/line2

Street address

James Albert 23

adressDetails/line6

Street address, mandatory for US and Canada

California

city

City name

Paris

zipCode 

Postal code

067895

countryCode 

Country code

FR

dummy

Empty segment that must be present

Group: mopDescription/paymentModule/mopDetailedData

**Field name**

**Field value**

**Example**

fopInformation

formOfPayment/type

Form of payment type

CC

dummy

Empty segment that must be present

creditCardDetailedData

authorizationSupplementaryData

Empty segment that must be present

Group: mopDescription/paymentModule/mopDetailedData/creditCardDetailedData/tdsInformation                         This is the group conveying the 3DS information: enrolment and authentication.

**Field name**

**Field value**

**Example**

authenticationData

authenticationDataDetails/creditCardCompany

Directory Server company code

VIDS : Visa directory

CADS : MasterCard directory server

AXDS : American Express

DCDS :  Diners directory

JCDS : JCB directory

tdsBlobData

**Note: 3DS 2.0 specific (all group)**

tdsBlbIdentifier

Name of the message block

sessionID

tdsBlbData/dataLength 

Number of characters into the binaryData field

28

tdsBlbData/dataType 

Type of data

B

tdsBlbData/binaryData 

Content of the message block

akttd0N5Q2ljWUJwQ0IxMDg5RlJDREFBQUFBPQ==

The message block sessionID is specific to 3DS 2.0 and it is mandatory.

_Example:_

<tdsBlobData\>

          <tdsBlbIdentifier\>

               <referenceDetails\>

                          <value>sessionID</value>

                 </referenceDetails\>

             </tdsBlbIdentifier\>

              <tdsBlbData\>

                     <dataLength\>19</dataLength\>

                      <dataType\>B</dataType\>

                      <binaryData\>dGhpc2lzYmFzZTY0RW5jb2RlZA==</binaryData\>

               </tdsBlbData\>

  </tdsBlobData\>

**Reply:**

Below the list of 3DS data returned in the FOP\_CreateFormOfPayment message, in case of a frictionless authentication (successful):

Group: mopDescription/paymentModule/mopDetailedData/creditCardDetailedData/tdsInformation                        

**Field name**

**Field value**

**Example**

authenticationData

authenticationDataDetails/creditCardCompany

Directory Server company code

VIDS : Visa directory

CADS : MasterCard directory server

AXDS : American Express

DCDS :  Diners directory

JCDS : JCB directory

authenticationDataDetails/authenticationIndicator

Liability shift indicator (ECI, UCAF)

05 

02

authenticationDataDetails/caavAlgorithm

Indicate the algorithm used to generate the CAVV

1

authenticationDataDetails/transStatus

Transaction status

**Note: 3DS 2.0 specific**

Y : authentication successful

tdsVersion

3DS protocol version

**Note: 3DS 2.0 specific**

2.0.1

tdsBlobData

**Note: 3DS 2.0 specific (all group)**

tdsBlbIdentifier

Name of the message block

CAVV : Visa, Diners, JCB

AEVV : American Express  

AAV : Mastercard

DS\_TRANSACTIONID

3DS\_SERVER\_TRANSACTIONID

tdsBlbData/dataLength 

Number of characters into the binaryData field

28

tdsBlbData/dataType 

Type of data

B

tdsBlbData/binaryData 

Content of the message block

akttd0N5Q2ljWUJwQ0IxMDg5RlJDREFBQUFBPQ==

The DS\_TRANSACTIONID and 3DS\_SERVER\_TRANSACTIONID message blocks are specific for 3DS 2.0. CAVV/AEVV/AVV and DS\_TRANSACTIONID are mandatory, while 3DS\_SERVER\_TRANSACTIONID is optional.

CAVV/AEVV/AVV represents the Cardholder Authentication Verification Value and its name changes according to the Directory Server.

_Example:_

<tdsBlobData\>

          <tdsBlbIdentifier\>

               <referenceDetails\>

                          <value>DS\_TRANSACTIONID</value>

                 </referenceDetails\>

             </tdsBlbIdentifier\>

              <tdsBlbData\>

                     <dataLength\>19</dataLength\>

                      <dataType\>B</dataType\>

                      <binaryData\>dGhpc2lzYmFzZTY0RW5jb2RlZA==</binaryData\>

               </tdsBlbData\>

  </tdsBlobData\>

Where: 

-   DS\_TRANSACTIONID is the name of the block
-   binaryData contains the message itself

## 5.5.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<FOP\_CreateFormOfPayment xmlns="http://xml.amadeus.com/TFOPCQ\_19\_2\_1A"> <transactionContext> <transactionDetails> <code>DEF</code> <issueIndicator>O</issueIndicator> </transactionDetails> </transactionContext> <fopGroup> <fopReference> </fopReference> <passengerAssociation> <passengerReference> <type>PAX</type> <value>1</value> </passengerReference> </passengerAssociation> <pnrElementAssociation> <referenceDetails> <type>SEG</type> <value>1</value> </referenceDetails> </pnrElementAssociation> <feeTypeInfo> <selectionDetails> <option>OB</option> <optionInformation>EX</optionInformation> </selectionDetails> </feeTypeInfo> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>1</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>CCVI</fopCode> <fopStatus>N</fopStatus> </fopDetails> </fopPNRDetails> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <paymentData> <merchantInformation> <companyCode>6X</companyCode> </merchantInformation> <distributionChannelInformation> <distributionChannel> <distributionChannelField>M</distributionChannelField> </distributionChannel> </distributionChannelInformation> <fraudScreeningData> <fraudScreening> <statusInformation> <indicator>FRA</indicator> <action>Y</action> </statusInformation> </fraudScreening> <ipAdress> <deviceIdentification> <address>192.168.1.1</address> <qualifier>IP</qualifier> </deviceIdentification> </ipAdress> <merchantURL> <communication> <internetAddress>myadrress.com</internetAddress> <adressQualifier>AH</adressQualifier> </communication> </merchantURL> <payerPhoneOrEmail> <phoneOrEmailType>E</phoneOrEmailType> <emailAddress>myadress@adress.com</emailAddress> </payerPhoneOrEmail> <payerPhoneOrEmail> <phoneOrEmailType>M</phoneOrEmailType> <telephoneNumberDetails> <telephoneNumber>0600000000</telephoneNumber> </telephoneNumberDetails> </payerPhoneOrEmail> <browserInformation> <deviceCategory>0</deviceCategory> <userAgentHeader>thisisagentheader</userAgentHeader> <acceptHeader>thisisheaderaccept</acceptHeader> </browserInformation> </fraudScreeningData> <paymentDataMap> <criteriaSetType>ORC</criteriaSetType> <criteriaDetails> <attributeType>SUPPORT3DE</attributeType> </criteriaDetails> </paymentDataMap> </paymentData> <mopInformation> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy> </dummy> <creditCardData> <creditCardDetails> <ccInfo> <vendorCode>VI</vendorCode> <cardNumber>111111111111</cardNumber> <expiryDate>1221</expiryDate> <ccHolderName>MyName MySurname</ccHolderName> </ccInfo> </creditCardDetails> <cardHolderAddress> <addressDetails> <format>5</format> <line1>I live here</line1> <line2>and this place</line2> <line6>For CA or US</line6> </addressDetails> <city>MyCity</city> <zipCode>MyZIP</zipCode> <countryCode>FR</countryCode> </cardHolderAddress> </creditCardData> </mopInformation> <dummy> </dummy> <mopDetailedData> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy> </dummy> <creditCardDetailedData> <authorisationSupplementaryData> </authorisationSupplementaryData> <tdsInformation> <authenticationData> <authenticationDataDetails> <creditCardCompany>VIDS</creditCardCompany> </authenticationDataDetails> </authenticationData> <tdsBlobData> <tdsBlbIdentifier> <referenceDetails> <value>sessionID</value> </referenceDetails> </tdsBlbIdentifier> <tdsBlbData> <dataLength>17</dataLength> <dataType>B</dataType> <binaryData>thisismysessionID</binaryData> </tdsBlbData> </tdsBlobData> </tdsInformation> </creditCardDetailedData> </mopDetailedData> </paymentModule> </mopDescription> </fopGroup> </FOP\_CreateFormOfPayment>

## 5.5.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<FOP\_CreateFormOfPaymentReply xmlns="http://xml.amadeus.com/TFOPCR\_19\_2\_1A"> <fopDescription> <fopReference> <reference> <qualifier>FPT</qualifier> <number>1</number> </reference> </fopReference> <passengerAssociation> <passengerReference> <type>PAX</type> <value>1</value> </passengerReference> </passengerAssociation> <pnrElementAssociation> <referenceDetails> <type>SEG</type> <value>1</value> </referenceDetails> </pnrElementAssociation> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>1</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>CCVI</fopCode> <fopStatus>N</fopStatus> <fopEdiCode>CC</fopEdiCode> <fopReportingCode>CC</fopReportingCode> </fopDetails> </fopPNRDetails> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <paymentData> <merchantInformation> <companyCode>6X</companyCode> </merchantInformation> <monetaryInformation> <monetaryDetails> <typeQualifier>712</typeQualifier> <amount>100.00</amount> <currency>EUR</currency> </monetaryDetails> </monetaryInformation> <paymentId> <referenceType>PRI</referenceType> <uniqueReference>123456789</uniqueReference> </paymentId> <paymentDataMap> <criteriaSetType>EXT</criteriaSetType> <criteriaDetails> <attributeType>SUPPORT3DE</attributeType> </criteriaDetails> </paymentDataMap> </paymentData> <paymentStatus> <paymentStatusInformation> <responseType>V</responseType> <statusCode>OKMORE</statusCode> </paymentStatusInformation> </paymentStatus> <mopInformation> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy> </dummy> <creditCardData> <creditCardDetails> <ccInfo> <vendorCode>VI</vendorCode> <cardNumber>111111111111</cardNumber> <expiryDate>1221</expiryDate> </ccInfo> </creditCardDetails> </creditCardData> </mopInformation> <dummy> </dummy> <mopDetailedData> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy> </dummy> <creditCardDetailedData> <authorisationSupplementaryData> </authorisationSupplementaryData> <approvalDetails> <approvalCodeData> <approvalCode>123456</approvalCode> </approvalCodeData> </approvalDetails> <localDateTime> <businessSemantic>L</businessSemantic> <dateTime> <year>2019</year> <month>1</month> <day>1</day> <hour>18</hour> <minutes>48</minutes> <seconds>29</seconds> </dateTime> </localDateTime> <authorisationInformation> <transactionDetails> <type>XX</type> <issueIndicator>N</issueIndicator> </transactionDetails> </authorisationInformation> <tdsInformation> <authenticationData> <authenticationDataDetails> <creditCardCompany>VIDS</creditCardCompany> <authenticationIndicator>05</authenticationIndicator> <caavAlgorithm>1</caavAlgorithm> <transStatus>Y</transStatus> </authenticationDataDetails> <tdsVersion>2.2.0</tdsVersion> </authenticationData> <tdsBlobData> <tdsBlbIdentifier> <referenceDetails> <value>CAVV</value> </referenceDetails> </tdsBlbIdentifier> <tdsBlbData> <dataLength>19</dataLength> <dataType>B</dataType> <binaryData>thisisbase64Encoded</binaryData> </tdsBlbData> </tdsBlobData> <tdsBlobData> <tdsBlbIdentifier> <referenceDetails> <value>3DS\_SERVER\_\_TRANSACTIONID</value> </referenceDetails> </tdsBlbIdentifier> <tdsBlbData> <dataLength>19</dataLength> <dataType>B</dataType> <binaryData>thisisbase64Encoded</binaryData> </tdsBlbData> </tdsBlobData> <tdsBlobData> <tdsBlbIdentifier> <referenceDetails> <value>DS\_TRANSACTIONID</value> </referenceDetails> </tdsBlbIdentifier> <tdsBlbData> <dataLength>19</dataLength> <dataType>B</dataType> <binaryData>thisisbase64Encoded</binaryData> </tdsBlbData> </tdsBlobData> </tdsInformation> </creditCardDetailedData> </mopDetailedData> </paymentModule> </mopDescription> </fopDescription> </FOP\_CreateFormOfPaymentReply>

## 5.5.3 Possible Errors

See "Error Messages" section.

* * *

## 5.6 Operation: 3DS 2.x Dynamic Orchestrated Frictionless - Cardinal Direct API

**Introduction**

The Tree-Domain Secure allows authentication of cardholder at the time of purchase and consequently reduces the risk of fraud and helps towards the elimination of costs related to fraudulent transactions.  

3-D Secure 2.x is processed in following 3 steps:

**1\. Initialization**

The 3DS initialization section is responsible for authenticating the Front End. There are 2 different implementations with Cybersource:

1.  Cardinal Direct API: With this implementation frontend authentication will be done in a hidden iFrame by using Device Data Collection URL, Reference Id and JSON Web Token that are generated by Cybersource through a dedicatd call. Device data is collected as a result.
2.  Cardinal Cruise Hybrid API: With this implementation Amadeus Payment Server component will check the appropriate configuration and return the JSON Web token if applicable. This JSON Web token will then be sent to Cardinal using the Songbird JavaScript to handle the frontend process. Device data is collected as a result.

**2\. Authentication**

The 3DS Authentication section describes 3DS credit card authentication check with Cybersource, supporting the EMVCO standard 3DS2.

With the Cardinal Direct API, device data can be sent in the authentication request in case of any issue in the frontend device data collection. Furthermore, a new field containing a return URL is required in the authentication call, which will be called by cardinal in the challenge scenario once the challenge is resolved by the user on the frontend.

The result of this authentication check is one the following:

-   Frictionless authentication of the credit card, with liability shift for the merchant. In this case no additional step is needed, and credit card authorization can be requested.
-   Challenge needed to get authentication. In this case a challenge window is displayed to the card holder (typically in a pop in window/iframe) requesting additional information
    -   With Cardinal Direct API, 3DS\_SERVER\_AUTHENTICATION\_DATA (for JWT access token) and stepUp URL in COM segment with AH qualifier return in response.  stepUp Url is being used to handle user interaction to resolve the challenge. In this version, the AH qualifier is utilised for the stepUp URL. In version 20, both the AH and STP (stepUp URL) are provided.

**3\. Validation (Only for Challenge case)**

This use case describes 3DS credit card challenge validation with Cybersource, supporting the EMVCO standard 3DS2. It covers the validation of the challenge data.

 The result of this challenge validation is one of the following:

-   The credit card is authenticated, with liability shift for the merchant.
-   The credit card cannot be authenticated. Depending on the reason for authentication failure, credit card authorization may or may not be possible.

**Authorization**

At this step, the result of the enrolment and authentication is sent in the message request, in order to proceed with the payment authorization.

FOP\_CreateFormOfPayment interface is involved in this step.

**Query:**

In case of 3DS Dynamic Orchestrated Payment, it is possible to call APS providing the **SUPPORT3DE** flag in: _fopGroup/mopDescription/paymentModule/paymentData/paymentDataMap_

<criteriaSetType>**ORC**</criteriaSetType>

<criteriaDetails>

    <attributeType>**SUPPORT3DE**</attributeType>

</criteriaDetails>

If the flag is present in the message request, it means that the calling front end is able to supports 3DS Enrolment, but it does not ensure that APS will perform 3DS Enrolment. The decision to perform it or not is taken by APS according to the configuration defined.

Here is the required data related to 3-D Secure 2.0 transaction to raise chances to get frictionless authentication:

Group: fopGroup/mopDescription/paymentModule/paymentData/distributionChannelInformation

**Field name**

**Field value**

**Example**

/distributionChannel/ distrubutionChannelField

Type of channel used: e-commerce, MOTO (mail/telephone)

**Note: 3DS 2.0 specific**

 M

Group: fopGroup/mopDescription/paymentModule/paymentData/fraudScreeningData

**Field name**

**Field value**

**Example**

fraudScreening/indicator

Indicator for fraud screening

FRA

fraudScreening/action

Value to indicate if the risk management must be performed at authorization time

Y

ipAdress

deviceIdentification/address

IP address

**Note: 3DS 2.0 specific**

192.160.3.2

deviceIdentification/qualifier

Code qualifying the address

**Note: 3DS 2.0 specific**

IP

merchantURL

communication/internetAddress

URL

myaddress.com

communication/adressQualifier 

Type of the address

AH (for World Wide Web)

payerPhoneOrEmail

phoneOrEmailType 

Phone or e-mail contact type

**Note: 3DS 2.0 specific**

E : e-mail

P : phone

M : mobile phone

telephoneNumberDetails/telephoneNumber

Telephone number of the payer used for fraud screening

**Note: 3DS 2.0 specific**

076453388

emailAddress

E-mail address of the payer used for fraud screening

**Note: 3DS 2.0 specific**

myadress@adress.com

browserInformation

deviceCategory 

Category of the device

**Note: 3DS 2.0 specific**

0 : PC

1 : mobile

userAgentHeader

Agent header sent by customer's web browser

**Note: 3DS 2.0 specific**

Mozilla/5.0

acceptHeader

Accept header sent by customer's web browser

**Note: 3DS 2.0 specific**

ieftLanguageTag

Indicates the browser language as defined in IETFBCP47.

**Note: Cardinal Direct API specific**

Example: en-US

screenDimensions

-   screenHeight :Total height of the cardholder's screen in pixels.
    

-   screenWidth : Total width of the cardholder's screen in pixels.
    

**Note: Cardinal Direct API specific**

screenHeight example: 864

screenWidth example: 1536

colorDepth

Indicates the bit depth of the color palette for displaying images, in bits per pixel.

**Note: Cardinal Direct API specific**

Example: 24

localDateTime

Cardholder browser local time

**Note: Cardinal Direct API specific**

Example: 2024:12:27:8:40:24

isJavaScriptEnabled

Indicates the ability of the cardholder browser to execute JavaScript.

This value is available from the fingerprint details of the cardholder's browser.

Possible values:

-   true: Cardholder's browser can execute JavaScript.
    
-   false: Cardholder's browser cannot execute JavaScript.
    

**Note: Cardinal Direct API specific**

isJavaEnabled

Indicates the ability of the cardholder browser to execute Java.

The value is returned from the navigator.javaEnabled property.

Possible values:

-   true: cardholder's browser can execute Java.
    
-   false: cardholder's browser cannot execute Java
    

**Note: Cardinal Direct API specific**

Group: fopGroup/mopDescription/pamentModule/mopInformation:

**Field name**

**Field value**

**Example**

fopInformation

formOfPayment/type

Form of Payment type

CC

dummy

Empty segment that must be present

creditCardData

creditCardDetails

ccInfo/vendorCode 

Vendor code of the credit card

VI : Visa

CA : Mastercard

AX : American Express

ccInfo/cardNum

Number of the payer's card

111111111111

ccInfo/expiryDate 

Expiry date of the card

1119

ccInfo/ ccHolderName 

Name displayed on the payer's card

**Note: 3DS 2.0 specific**

Name Surname

cardHolderAdress

**Note: 3DS 2.0 specific (all group)**

adressDetails/format

Address format

5

adressDetails/line1

Street address

Avenue Dr. Martin 

adressDetails/line2

Street address

James Albert 23

adressDetails/line6

Street address, mandatory for US and Canada

California

city

City name

Paris

zipCode 

Postal code

067895

countryCode 

Country code

FR

dummy

Empty segment that must be present

Group: mopDescription/paymentModule/mopDetailedData

**Field name**

**Field value**

**Example**

fopInformation

formOfPayment/type

Form of payment type

CC

dummy

Empty segment that must be present

creditCardDetailedData

authorizationSupplementaryData

Empty segment that must be present

Group: mopDescription/paymentModule/mopDetailedData/creditCardDetailedData/tdsInformation                         This is the group conveying the 3DS information: enrolment and authentication.

**Field name**

**Field value**

**Example**

authenticationData

authenticationDataDetails/creditCardCompany

Directory Server company code

VIDS : Visa directory

CADS : MasterCard directory server

AXDS : American Express

DCDS :  Diners directory

JCDS : JCB directory

tdsBlobData

**Note: 3DS 2.0 specific (all group)**

tdsBlbIdentifier

Name of the message block

sessionID

returnUrl **(Cardinal Direct API specific)**

tdsBlbData/dataLength 

Number of characters into the binaryData field

28

tdsBlbData/dataType 

Type of data

B

tdsBlbData/binaryData 

Content of the message block

akttd0N5Q2ljWUJwQ0IxMDg5RlJDREFBQUFBPQ==

The message block sessionID is specific to 3DS 2.0 and it is mandatory.

_Example:_

<tdsBlobData>

          <tdsBlbIdentifier>

               <referenceDetails>

                          <value>sessionID</value>

                 </referenceDetails>

             </tdsBlbIdentifier>

              <tdsBlbData>

                     <dataLength>19</dataLength>

                      <dataType>B</dataType>

                      <binaryData>dGhpc2lzYmFzZTY0RW5jb2RlZA==</binaryData>

               </tdsBlbData>

  </tdsBlobData>

**Reply:**

Below the list of 3DS data returned in the FOP\_CreateFormOfPayment message, in case of a frictionless authentication (successful):

Group: mopDescription/paymentModule/mopDetailedData/creditCardDetailedData/tdsInformation                        

**Field name**

**Field value**

**Example**

authenticationData

authenticationDataDetails/creditCardCompany

Directory Server company code

VIDS : Visa directory

CADS : MasterCard directory server

AXDS : American Express

DCDS :  Diners directory

JCDS : JCB directory

authenticationDataDetails/authenticationIndicator

Liability shift indicator (ECI, UCAF)

05 

02

authenticationDataDetails/caavAlgorithm

Indicate the algorithm used to generate the CAVV

1

authenticationDataDetails/transStatus

Transaction status

**Note: 3DS 2.0 specific**

Y : authentication successful

tdsVersion

3DS protocol version

**Note: 3DS 2.0 specific**

2.0.1

tdsBlobData

**Note: 3DS 2.0 specific (all group)**

tdsBlbIdentifier

Name of the message block

CAVV : Visa, Diners, JCB

AEVV : American Express  

AAV : Mastercard

DS\_TRANSACTIONID

3DS\_SERVER\_TRANSACTIONID

tdsBlbData/dataLength 

Number of characters into the binaryData field

28

tdsBlbData/dataType 

Type of data

B

tdsBlbData/binaryData 

Content of the message block

akttd0N5Q2ljWUJwQ0IxMDg5RlJDREFBQUFBPQ==

The DS\_TRANSACTIONID and 3DS\_SERVER\_TRANSACTIONID message blocks are specific for 3DS 2.0. CAVV/AEVV/AVV and DS\_TRANSACTIONID are mandatory, while 3DS\_SERVER\_TRANSACTIONID is optional.

CAVV/AEVV/AVV represents the Cardholder Authentication Verification Value and its name changes according to the Directory Server.

_Example:_

<tdsBlobData>

          <tdsBlbIdentifier>

               <referenceDetails>

                          <value>DS\_TRANSACTIONID</value>

                 </referenceDetails>

             </tdsBlbIdentifier>

              <tdsBlbData>

                     <dataLength>19</dataLength>

                      <dataType>B</dataType>

                      <binaryData>dGhpc2lzYmFzZTY0RW5jb2RlZA==</binaryData>

               </tdsBlbData>

  </tdsBlobData>

Where: 

-   DS\_TRANSACTIONID is the name of the block
-   binaryData contains the message itself

## 5.6.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<FOP\_CreateFormOfPayment xmlns="http://xml.amadeus.com/TFOPCQ\_19\_2\_1A"> <transactionContext> <transactionDetails> <code>DEF</code> <issueIndicator>O</issueIndicator> </transactionDetails> </transactionContext> <fopGroup> <fopReference></fopReference> <passengerAssociation> <passengerReference> <type>PAX</type> <value>2</value> </passengerReference> </passengerAssociation> <pnrElementAssociation> <referenceDetails> <type>SEG</type> <value>1</value> </referenceDetails> </pnrElementAssociation> <feeTypeInfo> <selectionDetails> <option>OB</option> </selectionDetails> </feeTypeInfo> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>1</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>CC</fopCode> <fopStatus>N</fopStatus> </fopDetails> </fopPNRDetails> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <paymentData> <merchantInformation> <companyCode>JL</companyCode> </merchantInformation> <monetaryInformation> <monetaryDetails> <typeQualifier>712</typeQualifier> <amount>38250</amount> <currency>JPY</currency> </monetaryDetails> </monetaryInformation> <distributionChannelInformation> <distributionChannel> <distributionChannelField>S</distributionChannelField> </distributionChannel> </distributionChannelInformation> <fraudScreeningData> <fraudScreening> <statusInformation> <indicator>FRA</indicator> <action>Y</action> </statusInformation> </fraudScreening> <ipAdress> <deviceIdentification> <address>153.156.7.52</address> <qualifier>IP</qualifier> </deviceIdentification> </ipAdress> <merchantURL> <communication> <internetAddress>booking.jal.co.jp</internetAddress> <adressQualifier>AH</adressQualifier> </communication> </merchantURL> <payerPhoneOrEmail> <phoneOrEmailType>E</phoneOrEmailType> <emailAddress>miracoaki@yahoo.co.jp</emailAddress> </payerPhoneOrEmail> <payerPhoneOrEmail> <phoneOrEmailType>P</phoneOrEmailType> <telephoneNumberDetails> <telephoneNumber>123456789</telephoneNumber> </telephoneNumberDetails> </payerPhoneOrEmail> <browserInformation> <deviceCategory>0</deviceCategory> <userAgentHeader>Mozilla/5.0 (Windows NT 10.0; Win64; x64)</userAgentHeader> <acceptHeader>text/html</acceptHeader> <ietfLanguageTag>fr-FR</ietfLanguageTag> <screenDimensions> <unit>PX</unit> <width>1920</width> <height>1080</height> </screenDimensions> <colorDepth> <unit>BPP</unit> <value>24</value> </colorDepth> <localDateTime> <year>2023</year> <month>12</month> <day>27</day> <hour>8</hour> <minutes>40</minutes> <seconds>24</seconds> <milliseconds>300</milliseconds> </localDateTime> <isJavaScriptEnabled>Y</isJavaScriptEnabled> <isJavaEnabled>Y</isJavaEnabled> </browserInformation> <payerName> <ccHolderNameDetails> <surname>Mirac AOKI</surname> </ccHolderNameDetails> </payerName> <securityCode> <securityType> <screeningInstructions>DFP</screeningInstructions> </securityType> <securityKey> <dataLength>20</dataLength> <dataType>B</dataType> <binaryData>RzNiemdueDJDSmMxVDBDMGpFNDE=</binaryData> </securityKey> </securityCode> </fraudScreeningData> <paymentDataMap> <criteriaSetType>RMC</criteriaSetType> <criteriaDetails> <attributeType>CARDINALSETUPDONE</attributeType> </criteriaDetails> </paymentDataMap> <paymentDataMap> <criteriaSetType>ORC</criteriaSetType> <criteriaDetails> <attributeType>SUPPORT3DE</attributeType> </criteriaDetails> </paymentDataMap> </paymentData> <mopInformation> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardData> <creditCardDetails> <ccInfo> <cardNumber>1232589999991123</cardNumber> <securityId>999</securityId> <expiryDate>0530</expiryDate> <ccHolderName>Mirac AOKI</ccHolderName> </ccInfo> </creditCardDetails> </creditCardData> </mopInformation> <dummy></dummy> <mopDetailedData> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardDetailedData> <authorisationSupplementaryData></authorisationSupplementaryData> <tdsInformation> <authenticationData> <authenticationDataDetails> <creditCardCompany>XXDS</creditCardCompany> </authenticationDataDetails> </authenticationData> <tdsBlobData> <tdsBlbIdentifier> <referenceDetails> <value>returnURL</value> </referenceDetails> </tdsBlbIdentifier> <tdsBlbData> <dataLength>17</dataLength> <dataType>B</dataType> <binaryData>dGhpc2lzbXlyZXR1cm5VUkw=</binaryData> </tdsBlbData> </tdsBlobData> <tdsBlobData> <tdsBlbIdentifier> <referenceDetails> <value>sessionID</value> </referenceDetails> </tdsBlbIdentifier> <tdsBlbData> <dataLength>38</dataLength> <dataType>B</dataType> <binaryData>MF82YTYxMjZmOC01MzFmLTQxODgtOTA4MS00NjQ3OTAyZmU4ZTQ=</binaryData> </tdsBlbData> </tdsBlobData> </tdsInformation> </creditCardDetailedData> </mopDetailedData> </paymentModule> </mopDescription> </fopGroup> </FOP\_CreateFormOfPayment>

## 5.6.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.6.3 Possible Errors

See "Error Messages" section.

* * *

## 5.7 Operation: 3DS 2.x Frictionless Authentication

**Introduction**

The Tree-Domain Secure allows authentication of cardholder at the time of purchase and consequently reduces the risk of fraud and helps towards the elimination of costs related to fraudulent transactions.  

3-D Secure 2.x is processed in either 2 or 3 steps.

**Step 1 (required):** Enrolment

Consists in verifying whether the cardholder is 3DS 2.0 enrolled and the authentication is required, through call to the issuing bank.

After enrolment confirmation, depending on the issuing bank decision based on the provided inputs, either:

1.  There is a direct authorization of the payment, since there is a trust on the cardholder (frictionless authentication).
2.  There is an additional needed authentication of the customer with his/her issuing bank (challenged authentication).

**Step 2 (conditional):** Authentication (only in challenge)

Starts a dialogue with the cardholder’s issuing bank to find out if the user’s online password matches the password logged by the cardholder with his/her bank. The Merchant’s website browses to the ACS (access control server) website (Issuer) and the cardholder submits his/her password provided by issuing bank.

**Step 3 (required):** Payment validation

At this step, the result of the enrolment and authentication is sent in the message request, in order to proceed with the payment authorization.

FOP\_CreateFormOfPayment interface is involved in **Step 3**.

**Query:**

The PRI (Payment Record Identifier) is required and must be provided at: _fopGroup/mopDescription/paymentModule/paymentData/paymentId._

**Reply:**

Below the list of 3DS data returned in the FOP\_CreateFormOfPayment message.

Group: mopDescription/paymentModule/mopDetailedData/creditCardDetailedData/tdsInformation                        

**Field name**

**Field value**

**Example**

authenticationData

authenticationDataDetails/creditCardCompany

Directory Server company code

VIDS : Visa directory

CADS : MasterCard directory server

AXDS : American Express

DCDS :  Diners directory

JCDS : JCB directory

authenticationDataDetails/authenticationIndicator

Liability shift indicator (ECI, UCAF)

UCAF (Mastercard)

00 : Authentication failed

01 : Authentication attempted

02 : Authentication successful

ECI (Visa, American Express, JCB, Diners)

05 : Authentication successful

06 : Authentication attempted

07 :  Authentication failed

authenticationDataDetails/caavAlgorithm

Indicate the algorithm used to generate the CAVV

1

authenticationDataDetails/transStatus

Transaction status

**Note: 3DS 2.0 specific**

Y : authentication successful

N : authentication failed

U : unable to authenticate

A : attempt processing performed

tdsVersion

3DS protocol version

**Note: 3DS 2.0 specific**

2.0.1

tdsBlobData

**Note: 3DS 2.0 specific (all group)**

tdsBlbIdentifier

Name of the message block

CAVV : Visa, Diners, JCB

AEVV : American Express  

AAV : Mastercard

DS\_TRANSACTIONID

3DS\_SERVER\_TRANSACTIONID

tdsBlbData/dataLength 

Number of characters into the binaryData field

28

tdsBlbData/dataType 

Type of data

B

tdsBlbData/binaryData 

Content of the message block

akttd0N5Q2ljWUJwQ0IxMDg5RlJDREFBQUFBPQ==

The DS\_TRANSACTIONID and 3DS\_SERVER\_TRANSACTIONID message blocks are specific for 3DS 2.0. CAVV/AVV and DS\_TRANSACTIONID are mandatory, while 3DS\_SERVER\_TRANSACTIONID is optional.

CAVV/AVV represents the Cardholder Authentication Verification Value and its name changes according to the Directory Server.

_Example:_

<tdsBlobData\>

          <tdsBlbIdentifier\>

               <referenceDetails\>

                          <value>DS\_TRANSACTIONID</value>

                 </referenceDetails\>

             </tdsBlbIdentifier\>

              <tdsBlbData\>

                     <dataLength\>19</dataLength\>

                      <dataType\>B</dataType\>

                      <binaryData\>dGhpc2lzYmFzZTY0RW5jb2RlZA==</binaryData\>

               </tdsBlbData\>

  </tdsBlobData\>

Where: 

-   DS\_TRANSACTIONID is the name of the block
-   binaryData contains the message itself

## 5.7.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<FOP\_CreateFormOfPayment xmlns="http://xml.amadeus.com/TFOPCQ\_19\_2\_1A"> <transactionContext> <transactionDetails> <code>DEF</code> <issueIndicator>O</issueIndicator> </transactionDetails> </transactionContext> <fopGroup> <fopReference> </fopReference> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>1</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>CCVI</fopCode> <fopStatus>N</fopStatus> </fopDetails> </fopPNRDetails> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <paymentData> <merchantInformation> <companyCode>7X</companyCode> </merchantInformation> <monetaryInformation> <monetaryDetails> <typeQualifier>712</typeQualifier> <amount>100</amount> <currency>BRL</currency> </monetaryDetails> </monetaryInformation> <paymentId> <referenceType>PRI</referenceType> <uniqueReference>127021721</uniqueReference> </paymentId> <fraudScreeningData> <fraudScreening> <statusInformation> <indicator>FRA</indicator> <action>Y</action> </statusInformation> </fraudScreening> </fraudScreeningData> </paymentData> <mopInformation> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy> </dummy> <creditCardData> <creditCardDetails> <ccInfo> <vendorCode>VI</vendorCode> <cardNumber>4400009999990004</cardNumber> <securityId>999</securityId> <expiryDate>0838</expiryDate> </ccInfo> </creditCardDetails> </creditCardData> </mopInformation> <dummy> </dummy> <mopDetailedData> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy> </dummy> </mopDetailedData> </paymentModule> </mopDescription> </fopGroup> </FOP\_CreateFormOfPayment>

## 5.7.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<FOP\_CreateFormOfPaymentReply xmlns="http://xml.amadeus.com/TFOPCR\_19\_2\_1A"> <fopDescription> <fopReference> <reference> <qualifier>FPT</qualifier> <number>37</number> </reference> </fopReference> <passengerAssociation> <passengerReference> <type>PAX</type> <value>2</value> </passengerReference> </passengerAssociation> <passengerAssociation> <passengerReference> <type>PAX</type> <value>3</value> </passengerReference> </passengerAssociation> <pnrElementAssociation> <referenceDetails> <type>SEG</type> <value>1</value> </referenceDetails> </pnrElementAssociation> <pnrElementAssociation> <referenceDetails> <type>SEG</type> <value>3</value> </referenceDetails> </pnrElementAssociation> <pnrElementAssociation> <referenceDetails> <type>TST</type> <value>2</value> </referenceDetails> </pnrElementAssociation> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>1</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>CCCA</fopCode> <fopStatus>N</fopStatus> <fopEdiCode>CCCA</fopEdiCode> <fopReportingCode>CC</fopReportingCode> <fopElecTicketingCode>CC</fopElecTicketingCode> </fopDetails> </fopPNRDetails> <oldFopFreeflow> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>CCAX/XXXXXXXXXXX1001D1222CVA/A261402</freeText> </oldFopFreeflow> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>S</criteriaSetType> <criteriaDetails> <attributeType>13</attributeType> <attributeDescription>1</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>D</criteriaSetType> <criteriaDetails> <attributeType>CVR</attributeType> <attributeDescription>Y</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>IPN</attributeType> <attributeDescription>165541020057</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>LNK</attributeType> <attributeDescription>AX</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>POS</attributeType> <attributeDescription>1005S0S00130</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>AMT</attributeType> <attributeDescription>162.21</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>1</attributeType> <attributeDescription>261402</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CCNUM</attributeType> <attributeDescription>374909999991003</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CUR</attributeType> <attributeDescription>EUR</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>\_cvvKey</attributeType> <attributeDescription>CV</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>\_cvvValue</attributeType> <attributeDescription>A</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CCDTE1</attributeType> <attributeDescription>1222</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>FOPCODE</attributeType> <attributeDescription>CCAX</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>VENDORCODE</attributeType> <attributeDescription>AX</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <paymentData> <merchantInformation> <companyCode>AF</companyCode> </merchantInformation> <monetaryInformation> <monetaryDetails> <typeQualifier>AIR</typeQualifier> <amount>324.42</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>AUT</typeQualifier> <amount>162.21</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>I</typeQualifier> <amount>324.42</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>IPC</typeQualifier> <amount>324.42</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>IT</typeQualifier> <amount>324.42</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>ITC</typeQualifier> <amount>324.42</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>T</typeQualifier> <amount>162.21</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TPC</typeQualifier> <amount>162.21</amount> <currency>EUR</currency> </otherMonetaryDetails> </monetaryInformation> <paymentId> <referenceType>PRI</referenceType> <uniqueReference>165541020057</uniqueReference> </paymentId> <fraudScreeningData> <fraudScreening> <statusInformation> <indicator>FRA</indicator> <action>N</action> </statusInformation> </fraudScreening> <payerPhoneOrEmail> <phoneOrEmailType>P</phoneOrEmailType> <emailAddress>39625350775-M</emailAddress> </payerPhoneOrEmail> </fraudScreeningData> </paymentData> <mopInformation> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardData> <creditCardDetails> <ccInfo> <vendorCode>CA</vendorCode> <cardNumber>XXXXXXXXXXX1001</cardNumber> <expiryDate>1121</expiryDate> <ccHolderName>Name Surname</ccHolderName> </ccInfo> </creditCardDetails> </creditCardData> </mopInformation> <dummy></dummy> <mopDetailedData> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardDetailedData> <authorisationSupplementaryData> <msgRef> <retrievalReferenceNumber>903813699897</retrievalReferenceNumber> <authorResponseCode>00</authorResponseCode> </msgRef> <respIdentification> <transacIdentifier>002283153265475</transacIdentifier> </respIdentification> </authorisationSupplementaryData> <approvalDetails> <approvalCodeData> <approvalCode>261402</approvalCode> <sourceOfApproval>A</sourceOfApproval> </approvalCodeData> </approvalDetails> <localDateTime> <businessSemantic>L</businessSemantic> <dateTime> <year>2019</year> <month>2</month> <day>7</day> <hour>14</hour> <minutes>36</minutes> <seconds>49</seconds> </dateTime> </localDateTime> <localDateTime> <businessSemantic>T</businessSemantic> <timeMode>L</timeMode> <dateTime> <year>2019</year> <month>2</month> <day>7</day> <hour>13</hour> <minutes>36</minutes> <seconds>49</seconds> </dateTime> </localDateTime> <authorisationInformation> <transactionDetails> <code>1110</code> <type>AX</type> <issueIndicator>N</issueIndicator> <transmissionControlNumber>699897</transmissionControlNumber> </transactionDetails> </authorisationInformation> <tdsInformation> <authenticationData> <authenticationDataDetails> <creditCardCompany>VIDS</creditCardCompany> <authenticationIndicator>05</authenticationIndicator> <caavAlgorithm>4</caavAlgorithm> <transStatus>Y</transStatus> </authenticationDataDetails> <tdsVersion>2.0.2</tdsVersion> </authenticationData> <tdsBlobData> <tdsBlbIdentifier> <referenceDetails> <value>CAVV</value> </referenceDetails> </tdsBlbIdentifier> <tdsBlbData> <dataLength>28</dataLength> <dataType>B</dataType> <binaryData>QUFBQkE0bGtjZ0lCa0RpVk5XUnlFQ1dsaFZnPQ==</binaryData> </tdsBlbData> </tdsBlobData> <tdsBlobData> <tdsBlbIdentifier> <referenceDetails> <value>DS\_TRANSACTIONID</value> </referenceDetails> </tdsBlbIdentifier> <tdsBlbData> <dataLength>28</dataLength> <dataType>B</dataType> <binaryData>clIyR0l5cmVWMC9mbVRLTWZxQU1EQXpOaHpVPQ==</binaryData> </tdsBlbData> </tdsBlobData> </tdsInformation> <cardSupplementaryData> <criteriaSetType>AUT</criteriaSetType> <criteriaDetails> <attributeType>POS</attributeType> <attributeDescription>1005S0S00130</attributeDescription> </criteriaDetails> </cardSupplementaryData> </creditCardDetailedData> </mopDetailedData> </paymentModule> </mopDescription> </fopDescription> </FOP\_CreateFormOfPaymentReply>

## 5.7.3 Possible Errors

See "Error Messages" section.

* * *

## 5.8 Operation: Best effort

Best effort process triggered.

## 5.8.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<FOP\_CreateFormOfPayment xmlns="http://xml.amadeus.com/TFOPCQ\_19\_2\_1A"> <transactionContext> <transactionDetails> <code>DEF</code> </transactionDetails> </transactionContext> <bestEffort> <statusInformation> <indicator>CFP</indicator> <action>KK</action> </statusInformation> </bestEffort> <fopGroup> <fopReference></fopReference> <pnrElementAssociation> <referenceDetails> <type>TST</type> <value>1</value> </referenceDetails> </pnrElementAssociation> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>1</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>CCVI</fopCode> </fopDetails> </fopPNRDetails> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <paymentData> <merchantInformation> <companyCode>AY</companyCode> </merchantInformation> </paymentData> <mopInformation> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardData> <creditCardDetails> <ccInfo> <vendorCode>VI</vendorCode> <cardNumber>4541099100010016</cardNumber> <expiryDate>0915</expiryDate> </ccInfo> </creditCardDetails> </creditCardData> </mopInformation> <dummy></dummy> </paymentModule> </mopDescription> </fopGroup> </FOP\_CreateFormOfPayment>

## 5.8.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<FOP\_CreateFormOfPaymentReply xmlns="http://xml.amadeus.com/TFOPCR\_19\_2\_1A"> <fopDescription> <fopReference> <reference> <qualifier>FPT</qualifier> <number>21</number> </reference> </fopReference> <passengerAssociation> <passengerReference> <type>PAX</type> <value>1</value> </passengerReference> </passengerAssociation> <pnrElementAssociation> <referenceDetails> <type>TST</type> <value>1</value> </referenceDetails> </pnrElementAssociation> <pnrElementAssociation> <referenceDetails> <type>SEG</type> <value>1</value> </referenceDetails> </pnrElementAssociation> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>1</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>CCVI</fopCode> <fopStatus>N</fopStatus> <fopReportingCode>CC</fopReportingCode> <fopElecTicketingCode>CC</fopElecTicketingCode> </fopDetails> </fopPNRDetails> <oldFopFreeflow> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>CCVIXXXXXXXXXXXX0016/0915/AAPS1OK</freeText> </oldFopFreeflow> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>S</criteriaSetType> <criteriaDetails> <attributeType>13</attributeType> <attributeDescription>1</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>APM</attributeType> <attributeDescription>1</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>D</criteriaSetType> <criteriaDetails> <attributeType>AVS</attributeType> <attributeDescription>Y</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>IPN</attributeType> <attributeDescription>251086105</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>AMT</attributeType> <attributeDescription>100.00</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>1</attributeType> <attributeDescription>APS1OK</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CCNUM</attributeType> <attributeDescription>XXXXXXXXXXXX0016</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CUR</attributeType> <attributeDescription>EUR</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CCDTE1</attributeType> <attributeDescription>0915</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>FOPCODE</attributeType> <attributeDescription>CCVI</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>VENDORCODE</attributeType> <attributeDescription>VI</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <paymentData> <merchantInformation> <companyCode>AY</companyCode> </merchantInformation> <monetaryInformation> <monetaryDetails> <typeQualifier>AIR</typeQualifier> <amount>100.00</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>AUT</typeQualifier> <amount>100.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>I</typeQualifier> <amount>100.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>IPC</typeQualifier> <amount>100.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>IT</typeQualifier> <amount>100.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>ITC</typeQualifier> <amount>100.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>T</typeQualifier> <amount>100.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TPC</typeQualifier> <amount>100.00</amount> <currency>EUR</currency> </otherMonetaryDetails> </monetaryInformation> <paymentId> <referenceType>PRI</referenceType> <uniqueReference>251086105</uniqueReference> </paymentId> <fraudScreeningData> <fraudScreening> <statusInformation> <indicator>FRA</indicator> <action>N</action> </statusInformation> </fraudScreening> <payerPhoneOrEmail> <phoneOrEmailType>P</phoneOrEmailType> <telephoneNumberDetails> <telephoneNumber>3977-PAY</telephoneNumber> </telephoneNumberDetails> </payerPhoneOrEmail> </fraudScreeningData> </paymentData> <mopInformation> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardData> <creditCardDetails> <ccInfo> <vendorCode>VI</vendorCode> <cardNumber>XXXXXXXXXXXX0016</cardNumber> <expiryDate>0915</expiryDate> </ccInfo> </creditCardDetails> </creditCardData> </mopInformation> <dummy></dummy> <mopDetailedData> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardDetailedData> <authorisationSupplementaryData> <msgRef> <retrievalReferenceNumber>305716481636</retrievalReferenceNumber> <authorResponseCode>00</authorResponseCode> </msgRef> </authorisationSupplementaryData> <approvalDetails> <approvalCodeData> <approvalCode>APS1OK</approvalCode> <sourceOfApproval>A</sourceOfApproval> </approvalCodeData> </approvalDetails> <localDateTime> <businessSemantic>T</businessSemantic> <timeMode>L</timeMode> <dateTime> <year>2012</year> <month>10</month> <day>16</day> <hour>16</hour> <minutes>26</minutes> <seconds>20</seconds> </dateTime> </localDateTime> <authorisationInformation> <transactionDetails> <code>0110</code> <type>VI</type> <issueIndicator>N</issueIndicator> <transmissionControlNumber>481636</transmissionControlNumber> </transactionDetails> </authorisationInformation> <transactionStatus> <errorOrWarningCodeDetails> <errorDetails> <errorCode>Y</errorCode> <errorCategory>AVS</errorCategory> </errorDetails> </errorOrWarningCodeDetails> <errorWarningDescription> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <source>M</source> <encoding>1</encoding> </freeTextDetails> <freeText>CCAVS TRANSACTION OK - EXACT MATCH</freeText> </errorWarningDescription> </transactionStatus> </creditCardDetailedData> </mopDetailedData> </paymentModule> </mopDescription> </fopDescription> </FOP\_CreateFormOfPaymentReply>

## 5.8.3 Possible Errors

See "Error Messages" section.

* * *

## 5.9 Operation: Card On File Indicator (First)

**Introduction:**

Merchant shall have the ability to store the credit card details for future transactions.

When the payment is performed with this stored card on merchant website or frontend, the request is sent with a flag.

Below the steps to report Card On File Transactions to the Schemes/PSPs:

-   Merchant/Front End sends the indicator to APP via FOP\_CreateFormOfPayment.
-   Transaction Identifier is received from FOP to APP.
-   APP reports the agreed information to Schemes/PSPs.

This Operation has the indicator, which will be sent in case of first transaction.

CardOnFileIndicator: "F" for first use (card being saved on merchant side).

**Query:**

Group: _fopGroup/mopDescription/paymentModule/paymentData/paymentDataMap_

**Field name**

**Example**

_criteriaSetType_

COF

_criteriaDetails_

_criteriaDetails/attributeType_

cardOnFileIndicator

_criteriaDetails/attributeDescription_

F : first use

S : subsequent use

**Example:**

<paymentDataMap\>

            <criteriaSetType\>COF</criteriaSetType\>

            <criteriaDetails\>

              <attributeType\>cardOnFileIndicator</attributeType\>

              <attributeDescription\>F</attributeDescription\>

            </criteriaDetails\>

</paymentDataMap\>

## 5.9.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<FOP\_CreateFormOfPayment xmlns="http://xml.amadeus.com/TFOPCQ\_19\_2\_1A"> <transactionContext> <transactionDetails> <code>DEF</code> </transactionDetails> </transactionContext> <fopGroup> <fopReference></fopReference> <passengerAssociation> <passengerReference> <type>PAX</type> <value>2</value> </passengerReference> </passengerAssociation> <pnrElementAssociation> <referenceDetails> <type>SEG</type> <value>1</value> </referenceDetails> </pnrElementAssociation> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>1</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopStatus>N</fopStatus> </fopDetails> </fopPNRDetails> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <paymentData> <merchantInformation> <companyCode>WN</companyCode> </merchantInformation> <monetaryInformation> <monetaryDetails> <typeQualifier>712</typeQualifier> <amount>601.98</amount> <currency>USD</currency> </monetaryDetails> </monetaryInformation> <fraudScreeningData> <fraudScreening> <statusInformation> <indicator>FRA</indicator> <action>Y</action> </statusInformation> </fraudScreening> </fraudScreeningData> <paymentDataMap> <criteriaSetType>COF</criteriaSetType> <criteriaDetails> <attributeType>cardOnFileIndicator</attributeType> <attributeDescription>F</attributeDescription> </criteriaDetails> </paymentDataMap> </paymentData> <mopInformation> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> </mopInformation> <dummy></dummy> </paymentModule> </mopDescription> </fopGroup> </FOP\_CreateFormOfPayment>

## 5.9.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<FOP\_CreateFormOfPaymentReply xmlns="http://xml.amadeus.com/TFOPCR\_19\_2\_1A"> <fopDescription> <fopReference> <reference> <qualifier>FPT</qualifier> <number>22</number> </reference> </fopReference> <passengerAssociation> <passengerReference> <type>PAX</type> <value>2</value> </passengerReference> </passengerAssociation> <pnrElementAssociation> <referenceDetails> <type>SEG</type> <value>1</value> </referenceDetails> </pnrElementAssociation> <pnrElementAssociation> <referenceDetails> <type>TST</type> <value>1</value> </referenceDetails> </pnrElementAssociation> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>1</number> </sequenceDetails> </fopSequenceNumber> <fopMasterElementReference> <referenceDetails> <type>PAI</type> <value>21</value> </referenceDetails> <referenceDetails> <type>MEP</type> <value>19</value> </referenceDetails> </fopMasterElementReference> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>CCVI</fopCode> <fopStatus>N</fopStatus> <fopEdiCode>CCVI</fopEdiCode> <fopReportingCode>CC</fopReportingCode> <fopElecTicketingCode>CC</fopElecTicketingCode> </fopDetails> </fopPNRDetails> <oldFopFreeflow> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>CCVIXXXXXXXXXXXX0013/0920CV/USD601.98/AAPS1OK/HFlavio Paoli</freeText> </oldFopFreeflow> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>S</criteriaSetType> <criteriaDetails> <attributeType>13</attributeType> <attributeDescription>1</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>D</criteriaSetType> <criteriaDetails> <attributeType>IPN</attributeType> <attributeDescription>1056644526</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>LNK</attributeType> <attributeDescription>VI</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>PID</attributeType> <attributeDescription>ZX</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>VAS</attributeType> <attributeDescription>5</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>AMT</attributeType> <attributeDescription>601.98</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>1</attributeType> <attributeDescription>APS1OK</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CCNUM</attributeType> <attributeDescription>XXXXXXXXXXXX0013</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CUR</attributeType> <attributeDescription>USD</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>\_cvvKey</attributeType> <attributeDescription>CV</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CCDTE1</attributeType> <attributeDescription>0920</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>FOPCODE</attributeType> <attributeDescription>CCVI</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>27</attributeType> <attributeDescription>Flavio Paoli</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>VENDORCODE</attributeType> <attributeDescription>VI</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>cardOnFileIndicator</attributeType> <attributeDescription>F</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <paymentData> <merchantInformation> <companyCode>WN</companyCode> </merchantInformation> <monetaryInformation> <monetaryDetails> <typeQualifier>S</typeQualifier> <amount>601.98</amount> <currency>USD</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>AUT</typeQualifier> <amount>601.98</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>I</typeQualifier> <amount>601.98</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>IPC</typeQualifier> <amount>601.98</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>IT</typeQualifier> <amount>601.98</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>ITC</typeQualifier> <amount>601.98</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>T</typeQualifier> <amount>601.98</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TPC</typeQualifier> <amount>601.98</amount> <currency>USD</currency> </otherMonetaryDetails> </monetaryInformation> <paymentId> <referenceType>PRI</referenceType> <uniqueReference>1056644526</uniqueReference> </paymentId> <fraudScreeningData> <fraudScreening> <statusInformation> <indicator>FRA</indicator> <action>Y</action> </statusInformation> </fraudScreening> <payerPhoneOrEmail> <phoneOrEmailType>P</phoneOrEmailType> <telephoneNumberDetails> <telephoneNumber>DAL - WN DCS PROJECT FAMILIARISA</telephoneNumber> </telephoneNumberDetails> </payerPhoneOrEmail> <payerPhoneOrEmail> <phoneOrEmailType>E</phoneOrEmailType> <emailAddress>RPTREG AWN</emailAddress> </payerPhoneOrEmail> </fraudScreeningData> </paymentData> <mopInformation> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardData> <creditCardDetails> <ccInfo> <vendorCode>VI</vendorCode> <cardNumber>XXXXXXXXXXXX0013</cardNumber> <expiryDate>0920</expiryDate> <ccHolderName>Flavio Paoli</ccHolderName> </ccInfo> </creditCardDetails> </creditCardData> </mopInformation> <dummy></dummy> <mopDetailedData> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardDetailedData> <authorisationSupplementaryData> <msgRef> <retrievalReferenceNumber>914309720364</retrievalReferenceNumber> <authorCharacteristicIndicator>P</authorCharacteristicIndicator> <authorResponseCode>00</authorResponseCode> <cardLevelResult>ZX</cardLevelResult> </msgRef> <respIdentification> <transacIdentifier>123456789012345</transacIdentifier> <validationCode>L8TT</validationCode> </respIdentification> </authorisationSupplementaryData> <approvalDetails> <approvalCodeData> <approvalCode>APS1OK</approvalCode> <sourceOfApproval>A</sourceOfApproval> </approvalCodeData> </approvalDetails> <localDateTime> <businessSemantic>L</businessSemantic> <dateTime> <year>2019</year> <month>5</month> <day>23</day> <hour>4</hour> <minutes>59</minutes> <seconds>41</seconds> </dateTime> </localDateTime> <localDateTime> <businessSemantic>T</businessSemantic> <timeMode>L</timeMode> <dateTime> <year>2019</year> <month>5</month> <day>23</day> <hour>9</hour> <minutes>59</minutes> <seconds>41</seconds> </dateTime> </localDateTime> <authorisationInformation> <transactionDetails> <code>0110</code> <type>VI</type> <issueIndicator>S</issueIndicator> <transmissionControlNumber>720364</transmissionControlNumber> </transactionDetails> </authorisationInformation> </creditCardDetailedData> </mopDetailedData> </paymentModule> </mopDescription> </fopDescription> <fopDescription> <fopReference> <reference> <qualifier>FPT</qualifier> <number>24</number> </reference> </fopReference> <passengerAssociation> <passengerReference> <type>INF</type> <value>3</value> </passengerReference> </passengerAssociation> <passengerAssociation> <passengerReference> <type>IPT</type> <value>2</value> </passengerReference> </passengerAssociation> <pnrElementAssociation> <referenceDetails> <type>SEG</type> <value>1</value> </referenceDetails> </pnrElementAssociation> <pnrElementAssociation> <referenceDetails> <type>TST</type> <value>2</value> </referenceDetails> </pnrElementAssociation> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>1</number> </sequenceDetails> </fopSequenceNumber> <fopMasterElementReference> <referenceDetails> <type>PAI</type> <value>23</value> </referenceDetails> <referenceDetails> <type>MEP</type> <value>19</value> </referenceDetails> </fopMasterElementReference> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>CCVI</fopCode> <fopStatus>N</fopStatus> <fopEdiCode>CCVI</fopEdiCode> <fopReportingCode>CC</fopReportingCode> <fopElecTicketingCode>CC</fopElecTicketingCode> </fopDetails> </fopPNRDetails> <oldFopFreeflow> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>CCVIXXXXXXXXXXXX0013/0920CV/USD0.00/AAPS1OK/HFlavio Paoli</freeText> </oldFopFreeflow> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>S</criteriaSetType> <criteriaDetails> <attributeType>13</attributeType> <attributeDescription>1</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>D</criteriaSetType> <criteriaDetails> <attributeType>IPN</attributeType> <attributeDescription>1056644526</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>LNK</attributeType> <attributeDescription>VI</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>PID</attributeType> <attributeDescription>ZX</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>VAS</attributeType> <attributeDescription>5</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>AMT</attributeType> <attributeDescription>0.00</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>1</attributeType> <attributeDescription>APS1OK</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CCNUM</attributeType> <attributeDescription>XXXXXXXXXXXX0013</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CUR</attributeType> <attributeDescription>USD</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>\_cvvKey</attributeType> <attributeDescription>CV</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CCDTE1</attributeType> <attributeDescription>0920</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>FOPCODE</attributeType> <attributeDescription>CCVI</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>27</attributeType> <attributeDescription>Flavio Paoli</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>VENDORCODE</attributeType> <attributeDescription>VI</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>cardOnFileIndicator</attributeType> <attributeDescription>F</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <paymentData> <merchantInformation> <companyCode>WN</companyCode> </merchantInformation> <monetaryInformation> <monetaryDetails> <typeQualifier>S</typeQualifier> <amount>601.98</amount> <currency>USD</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>AUT</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>I</typeQualifier> <amount>601.98</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>IPC</typeQualifier> <amount>601.98</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>IT</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>ITC</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>T</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TPC</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> </monetaryInformation> <paymentId> <referenceType>PRI</referenceType> <uniqueReference>1056644526</uniqueReference> </paymentId> <fraudScreeningData> <fraudScreening> <statusInformation> <indicator>FRA</indicator> <action>Y</action> </statusInformation> </fraudScreening> <payerPhoneOrEmail> <phoneOrEmailType>P</phoneOrEmailType> <telephoneNumberDetails> <telephoneNumber>DAL - WN DCS PROJECT FAMILIARISA</telephoneNumber> </telephoneNumberDetails> </payerPhoneOrEmail> <payerPhoneOrEmail> <phoneOrEmailType>E</phoneOrEmailType> <emailAddress>RPTREG AWN</emailAddress> </payerPhoneOrEmail> </fraudScreeningData> </paymentData> <mopInformation> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardData> <creditCardDetails> <ccInfo> <vendorCode>VI</vendorCode> <cardNumber>XXXXXXXXXXXX0013</cardNumber> <expiryDate>0920</expiryDate> <ccHolderName>Flavio Paoli</ccHolderName> </ccInfo> </creditCardDetails> </creditCardData> </mopInformation> <dummy></dummy> <mopDetailedData> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardDetailedData> <authorisationSupplementaryData> <msgRef> <retrievalReferenceNumber>914309720364</retrievalReferenceNumber> <authorCharacteristicIndicator>P</authorCharacteristicIndicator> <authorResponseCode>00</authorResponseCode> <cardLevelResult>ZX</cardLevelResult> </msgRef> <respIdentification> <transacIdentifier>123456789012345</transacIdentifier> <validationCode>L8TT</validationCode> </respIdentification> </authorisationSupplementaryData> <approvalDetails> <approvalCodeData> <approvalCode>APS1OK</approvalCode> <sourceOfApproval>A</sourceOfApproval> </approvalCodeData> </approvalDetails> <localDateTime> <businessSemantic>L</businessSemantic> <dateTime> <year>2019</year> <month>5</month> <day>23</day> <hour>4</hour> <minutes>59</minutes> <seconds>41</seconds> </dateTime> </localDateTime> <localDateTime> <businessSemantic>T</businessSemantic> <timeMode>L</timeMode> <dateTime> <year>2019</year> <month>5</month> <day>23</day> <hour>9</hour> <minutes>59</minutes> <seconds>41</seconds> </dateTime> </localDateTime> <authorisationInformation> <transactionDetails> <code>0110</code> <type>VI</type> <issueIndicator>S</issueIndicator> <transmissionControlNumber>720364</transmissionControlNumber> </transactionDetails> </authorisationInformation> </creditCardDetailedData> </mopDetailedData> </paymentModule> </mopDescription> </fopDescription> </FOP\_CreateFormOfPaymentReply>

## 5.9.3 Possible Errors

See "Error Messages" section.

* * *

## 5.10 Operation: Card On File Indicator (Subsequent)

**Introduction:**

Merchant shall have the ability to store the card details for future transactions. They will be able to differentiate the first and subsequent transactions.

When the payment is performed with this stored card on merchant website or frontend, the request is sent with a flag.

Below the steps to report Card On File Transactions to the Schemes/PSPs:

-   Merchant/Front End sends the indicator to APP via FOP\_CreateFormOfPayment
-   Transaction Identifier is received from FOP to APP
-   APP reports the agreed information to Schemes/PSPs.

This Operation has the indicator, which will be sent in case of subsequent transactions.

CardOnFileIndicator: "S" for subsequent transactions (transactions using a stored card).

**Query:**

Group: _fopGroup/mopDescription/paymentModule/paymentData/paymentDataMap_

**Field name**

**Example**

_criteriaSetType_

COF

_criteriaDetails_

_criteriaDetails/attributeType_

cardOnFileIndicator

_criteriaDetails/attributeDescription_

F : first use

S : subsequent use

**Example:**

<paymentDataMap\>

            <criteriaSetType\>COF</criteriaSetType\>

            <criteriaDetails\>

              <attributeType\>cardOnFileIndicator</attributeType\>

              <attributeDescription\>S</attributeDescription\>

            </criteriaDetails\>

</paymentDataMap\>

## 5.10.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<FOP\_CreateFormOfPayment xmlns="http://xml.amadeus.com/TFOPCQ\_19\_2\_1A"> <transactionContext> <transactionDetails> <code>DEF</code> </transactionDetails> </transactionContext> <fopGroup> <fopReference></fopReference> <passengerAssociation> <passengerReference> <type>PAX</type> <value>2</value> </passengerReference> </passengerAssociation> <pnrElementAssociation> <referenceDetails> <type>SEG</type> <value>1</value> </referenceDetails> </pnrElementAssociation> <pnrElementAssociation> <referenceDetails> <type>SEG</type> <value>2</value> </referenceDetails> </pnrElementAssociation> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>0</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>CC</fopCode> <fopStatus>O</fopStatus> </fopDetails> </fopPNRDetails> <oldFopFreeflow> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>CC</freeText> </oldFopFreeflow> </mopDetails> </mopDescription> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>1</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>CCVI</fopCode> <fopStatus>N</fopStatus> </fopDetails> </fopPNRDetails> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <paymentData> <merchantInformation> <companyCode>WN</companyCode> </merchantInformation> <paymentDataMap> <criteriaSetType>COF</criteriaSetType> <criteriaDetails> <attributeType>cardOnFileIndicator</attributeType> <attributeDescription>S</attributeDescription> </criteriaDetails> </paymentDataMap> </paymentData> <mopInformation> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardData> <creditCardDetails> <ccInfo> <vendorCode>VI</vendorCode> <cardNumber>4541099999990013</cardNumber> <securityId>999</securityId> <expiryDate>0920</expiryDate> <ccHolderName>Flavio Paoli</ccHolderName> </ccInfo> </creditCardDetails> </creditCardData> </mopInformation> <dummy></dummy> </paymentModule> </mopDescription> </fopGroup> <fopGroup> <fopReference></fopReference> <passengerAssociation> <passengerReference> <type>INF</type> <value>2</value> </passengerReference> </passengerAssociation> <pnrElementAssociation> <referenceDetails> <type>SEG</type> <value>1</value> </referenceDetails> </pnrElementAssociation> <pnrElementAssociation> <referenceDetails> <type>SEG</type> <value>2</value> </referenceDetails> </pnrElementAssociation> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>0</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>CC</fopCode> <fopStatus>O</fopStatus> </fopDetails> </fopPNRDetails> <oldFopFreeflow> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>CC</freeText> </oldFopFreeflow> </mopDetails> </mopDescription> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>1</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>CCVI</fopCode> <fopStatus>N</fopStatus> </fopDetails> </fopPNRDetails> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <paymentData> <merchantInformation> <companyCode>WN</companyCode> </merchantInformation> <paymentDataMap> <criteriaSetType>COF</criteriaSetType> <criteriaDetails> <attributeType>cardOnFileIndicator</attributeType> <attributeDescription>S</attributeDescription> </criteriaDetails> </paymentDataMap> </paymentData> <mopInformation> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardData> <creditCardDetails> <ccInfo> <vendorCode>VI</vendorCode> <cardNumber>4541099999990013</cardNumber> <securityId>999</securityId> <expiryDate>0920</expiryDate> <ccHolderName>Flavio Paoli</ccHolderName> </ccInfo> </creditCardDetails> </creditCardData> </mopInformation> <dummy></dummy> </paymentModule> </mopDescription> </fopGroup> </FOP\_CreateFormOfPayment>

## 5.10.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<FOP\_CreateFormOfPaymentReply xmlns="http://xml.amadeus.com/TFOPCR\_19\_2\_1A"> <fopDescription> <fopReference> <reference> <qualifier>FPT</qualifier> <number>49</number> </reference> </fopReference> <passengerAssociation> <passengerReference> <type>PAX</type> <value>2</value> </passengerReference> </passengerAssociation> <pnrElementAssociation> <referenceDetails> <type>SEG</type> <value>1</value> </referenceDetails> </pnrElementAssociation> <pnrElementAssociation> <referenceDetails> <type>SEG</type> <value>2</value> </referenceDetails> </pnrElementAssociation> <pnrElementAssociation> <referenceDetails> <type>TST</type> <value>5</value> </referenceDetails> </pnrElementAssociation> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>0</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopStatus>O</fopStatus> </fopDetails> </fopPNRDetails> <oldFopFreeflow> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>CC</freeText> </oldFopFreeflow> </mopDetails> </mopDescription> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>1</number> </sequenceDetails> </fopSequenceNumber> <fopMasterElementReference> <referenceDetails> <type>PAI</type> <value>48</value> </referenceDetails> <referenceDetails> <type>MEP</type> <value>47</value> </referenceDetails> </fopMasterElementReference> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>CCVI</fopCode> <fopStatus>N</fopStatus> <fopEdiCode>CCVI</fopEdiCode> <fopReportingCode>CC</fopReportingCode> <fopElecTicketingCode>CC</fopElecTicketingCode> </fopDetails> </fopPNRDetails> <oldFopFreeflow> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>CCVIXXXXXXXXXXXX0013/0920CV/AAPS1OK/HFlavio Paoli</freeText> </oldFopFreeflow> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>S</criteriaSetType> <criteriaDetails> <attributeType>13</attributeType> <attributeDescription>1</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>D</criteriaSetType> <criteriaDetails> <attributeType>IPN</attributeType> <attributeDescription>1056645526</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>LNK</attributeType> <attributeDescription>VI</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>PID</attributeType> <attributeDescription>ZX</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>VAS</attributeType> <attributeDescription>5</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>AMT</attributeType> <attributeDescription>598.62</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>1</attributeType> <attributeDescription>APS1OK</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CCNUM</attributeType> <attributeDescription>XXXXXXXXXXXX0013</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CUR</attributeType> <attributeDescription>USD</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>\_cvvKey</attributeType> <attributeDescription>CV</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CCDTE1</attributeType> <attributeDescription>0920</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>FOPCODE</attributeType> <attributeDescription>CCVI</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>27</attributeType> <attributeDescription>Flavio Paoli</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>VENDORCODE</attributeType> <attributeDescription>VI</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>cardOnFileIndicator</attributeType> <attributeDescription>S</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <paymentData> <merchantInformation> <companyCode>WN</companyCode> </merchantInformation> <monetaryInformation> <monetaryDetails> <typeQualifier>S</typeQualifier> <amount>1799.22</amount> <currency>USD</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>AUT</typeQualifier> <amount>598.62</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>I</typeQualifier> <amount>1799.22</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>IPC</typeQualifier> <amount>1799.22</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>IT</typeQualifier> <amount>598.62</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>ITC</typeQualifier> <amount>598.62</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>T</typeQualifier> <amount>598.62</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TPC</typeQualifier> <amount>598.62</amount> <currency>USD</currency> </otherMonetaryDetails> </monetaryInformation> <paymentId> <referenceType>PRI</referenceType> <uniqueReference>1056645526</uniqueReference> </paymentId> <fraudScreeningData> <fraudScreening> <statusInformation> <indicator>FRA</indicator> <action>N</action> </statusInformation> </fraudScreening> <payerPhoneOrEmail> <phoneOrEmailType>P</phoneOrEmailType> <telephoneNumberDetails> <telephoneNumber>DAL - WN DCS PROJECT FAMILIARISA</telephoneNumber> </telephoneNumberDetails> </payerPhoneOrEmail> <payerPhoneOrEmail> <phoneOrEmailType>E</phoneOrEmailType> <emailAddress>RPTREG AWN</emailAddress> </payerPhoneOrEmail> </fraudScreeningData> </paymentData> <mopInformation> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardData> <creditCardDetails> <ccInfo> <vendorCode>VI</vendorCode> <cardNumber>XXXXXXXXXXXX0013</cardNumber> <expiryDate>0920</expiryDate> <ccHolderName>Flavio Paoli</ccHolderName> </ccInfo> </creditCardDetails> </creditCardData> </mopInformation> <dummy></dummy> <mopDetailedData> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardDetailedData> <authorisationSupplementaryData> <msgRef> <retrievalReferenceNumber>914309720365</retrievalReferenceNumber> <authorCharacteristicIndicator>P</authorCharacteristicIndicator> <authorResponseCode>00</authorResponseCode> <cardLevelResult>ZX</cardLevelResult> </msgRef> <respIdentification> <transacIdentifier>123456789012345</transacIdentifier> <validationCode>L8TT</validationCode> </respIdentification> </authorisationSupplementaryData> <approvalDetails> <approvalCodeData> <approvalCode>APS1OK</approvalCode> <sourceOfApproval>A</sourceOfApproval> </approvalCodeData> </approvalDetails> <localDateTime> <businessSemantic>L</businessSemantic> <dateTime> <year>2019</year> <month>5</month> <day>23</day> <hour>4</hour> <minutes>59</minutes> <seconds>56</seconds> </dateTime> </localDateTime> <localDateTime> <businessSemantic>T</businessSemantic> <timeMode>L</timeMode> <dateTime> <year>2019</year> <month>5</month> <day>23</day> <hour>9</hour> <minutes>59</minutes> <seconds>56</seconds> </dateTime> </localDateTime> <authorisationInformation> <transactionDetails> <code>0110</code> <type>VI</type> <issueIndicator>S</issueIndicator> <transmissionControlNumber>720365</transmissionControlNumber> </transactionDetails> </authorisationInformation> </creditCardDetailedData> </mopDetailedData> </paymentModule> </mopDescription> </fopDescription> <fopDescription> <fopReference> <reference> <qualifier>FPT</qualifier> <number>51</number> </reference> </fopReference> <passengerAssociation> <passengerReference> <type>INF</type> <value>3</value> </passengerReference> </passengerAssociation> <passengerAssociation> <passengerReference> <type>IPT</type> <value>2</value> </passengerReference> </passengerAssociation> <pnrElementAssociation> <referenceDetails> <type>SEG</type> <value>1</value> </referenceDetails> </pnrElementAssociation> <pnrElementAssociation> <referenceDetails> <type>SEG</type> <value>2</value> </referenceDetails> </pnrElementAssociation> <pnrElementAssociation> <referenceDetails> <type>TST</type> <value>6</value> </referenceDetails> </pnrElementAssociation> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>0</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopStatus>O</fopStatus> </fopDetails> </fopPNRDetails> <oldFopFreeflow> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>CC</freeText> </oldFopFreeflow> </mopDetails> </mopDescription> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>1</number> </sequenceDetails> </fopSequenceNumber> <fopMasterElementReference> <referenceDetails> <type>PAI</type> <value>50</value> </referenceDetails> <referenceDetails> <type>MEP</type> <value>47</value> </referenceDetails> </fopMasterElementReference> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>CCVI</fopCode> <fopStatus>N</fopStatus> <fopEdiCode>CCVI</fopEdiCode> <fopReportingCode>CC</fopReportingCode> <fopElecTicketingCode>CC</fopElecTicketingCode> </fopDetails> </fopPNRDetails> <oldFopFreeflow> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>CCVIXXXXXXXXXXXX0013/0920CV/AAPS1OK/HFlavio Paoli</freeText> </oldFopFreeflow> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>S</criteriaSetType> <criteriaDetails> <attributeType>13</attributeType> <attributeDescription>1</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>D</criteriaSetType> <criteriaDetails> <attributeType>IPN</attributeType> <attributeDescription>1056645526</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>LNK</attributeType> <attributeDescription>VI</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>PID</attributeType> <attributeDescription>ZX</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>VAS</attributeType> <attributeDescription>5</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>AMT</attributeType> <attributeDescription>1200.60</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>1</attributeType> <attributeDescription>APS1OK</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CCNUM</attributeType> <attributeDescription>XXXXXXXXXXXX0013</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CUR</attributeType> <attributeDescription>USD</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>\_cvvKey</attributeType> <attributeDescription>CV</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CCDTE1</attributeType> <attributeDescription>0920</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>FOPCODE</attributeType> <attributeDescription>CCVI</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>27</attributeType> <attributeDescription>Flavio Paoli</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>VENDORCODE</attributeType> <attributeDescription>VI</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>cardOnFileIndicator</attributeType> <attributeDescription>S</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <paymentData> <merchantInformation> <companyCode>WN</companyCode> </merchantInformation> <monetaryInformation> <monetaryDetails> <typeQualifier>S</typeQualifier> <amount>1799.22</amount> <currency>USD</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>AUT</typeQualifier> <amount>1200.60</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>I</typeQualifier> <amount>1799.22</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>IPC</typeQualifier> <amount>1799.22</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>IT</typeQualifier> <amount>1200.60</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>ITC</typeQualifier> <amount>1200.60</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>T</typeQualifier> <amount>1200.60</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TPC</typeQualifier> <amount>1200.60</amount> <currency>USD</currency> </otherMonetaryDetails> </monetaryInformation> <paymentId> <referenceType>PRI</referenceType> <uniqueReference>1056645526</uniqueReference> </paymentId> <fraudScreeningData> <fraudScreening> <statusInformation> <indicator>FRA</indicator> <action>N</action> </statusInformation> </fraudScreening> <payerPhoneOrEmail> <phoneOrEmailType>P</phoneOrEmailType> <telephoneNumberDetails> <telephoneNumber>DAL - WN DCS PROJECT FAMILIARISA</telephoneNumber> </telephoneNumberDetails> </payerPhoneOrEmail> <payerPhoneOrEmail> <phoneOrEmailType>E</phoneOrEmailType> <emailAddress>RPTREG AWN</emailAddress> </payerPhoneOrEmail> </fraudScreeningData> </paymentData> <mopInformation> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardData> <creditCardDetails> <ccInfo> <vendorCode>VI</vendorCode> <cardNumber>XXXXXXXXXXXX0013</cardNumber> <expiryDate>0920</expiryDate> <ccHolderName>Flavio Paoli</ccHolderName> </ccInfo> </creditCardDetails> </creditCardData> </mopInformation> <dummy></dummy> <mopDetailedData> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardDetailedData> <authorisationSupplementaryData> <msgRef> <retrievalReferenceNumber>914309720365</retrievalReferenceNumber> <authorCharacteristicIndicator>P</authorCharacteristicIndicator> <authorResponseCode>00</authorResponseCode> <cardLevelResult>ZX</cardLevelResult> </msgRef> <respIdentification> <transacIdentifier>123456789012345</transacIdentifier> <validationCode>L8TT</validationCode> </respIdentification> </authorisationSupplementaryData> <approvalDetails> <approvalCodeData> <approvalCode>APS1OK</approvalCode> <sourceOfApproval>A</sourceOfApproval> </approvalCodeData> </approvalDetails> <localDateTime> <businessSemantic>L</businessSemantic> <dateTime> <year>2019</year> <month>5</month> <day>23</day> <hour>4</hour> <minutes>59</minutes> <seconds>56</seconds> </dateTime> </localDateTime> <localDateTime> <businessSemantic>T</businessSemantic> <timeMode>L</timeMode> <dateTime> <year>2019</year> <month>5</month> <day>23</day> <hour>9</hour> <minutes>59</minutes> <seconds>56</seconds> </dateTime> </localDateTime> <authorisationInformation> <transactionDetails> <code>0110</code> <type>VI</type> <issueIndicator>S</issueIndicator> <transmissionControlNumber>720365</transmissionControlNumber> </transactionDetails> </authorisationInformation> </creditCardDetailedData> </mopDetailedData> </paymentModule> </mopDescription> </fopDescription> </FOP\_CreateFormOfPaymentReply>

## 5.10.3 Possible Errors

See "Error Messages" section.

* * *

## 5.11 Operation: Credit card attributes

Credit card attribute information can be provided in input at different locations according to the data.

Find hereafter an example

## 5.11.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<FOP\_CreateFormOfPayment xmlns="http://xml.amadeus.com/TFOPCQ\_19\_2\_1A"> <fopGroup> <fopReference></fopReference> <pnrElementAssociation> <referenceDetails> <type>TST</type> <value>1</value> </referenceDetails> </pnrElementAssociation> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>1</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>CVI</fopCode> </fopDetails> </fopPNRDetails> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <paymentData> <merchantInformation> <companyCode>JJ</companyCode> </merchantInformation> <fraudScreeningData> <fraudScreening> <statusInformation> <indicator>FRA</indicator> <action>Y</action> </statusInformation> </fraudScreening> <payerDateOfBirth> <dateTime> <year>1986</year> <month>1</month> <day>23</day> </dateTime> </payerDateOfBirth> <formOfIdDetails> <referenceDetails> <type>PP</type> <value>123456789</value> </referenceDetails> </formOfIdDetails> </fraudScreeningData> </paymentData> <paymentSupplementaryData> <attributeFunction>QF</attributeFunction> <attributeDetails> <attributeType>GWTD</attributeType> <attributeDescription>ABCDEFGH</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>ONOD</attributeType> <attributeDescription>IJKLMNOPQ</attributeDescription> </attributeDetails> </paymentSupplementaryData> <mopInformation> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardData> <creditCardDetails> <ccInfo> <vendorCode>VI</vendorCode> <cardNumber>4541099100010016</cardNumber> <securityId>123</securityId> <expiryDate>0913</expiryDate> <startDate>0207</startDate> <ccHolderName>MR MARTIN</ccHolderName> <issueNumber>13</issueNumber> </ccInfo> </creditCardDetails> </creditCardData> </mopInformation> <dummy></dummy> <mopDetailedData> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardDetailedData> <authorisationSupplementaryData></authorisationSupplementaryData> <approvalDetails> <approvalCodeData> <approvalCode>123456</approvalCode> <sourceOfApproval>M</sourceOfApproval> </approvalCodeData> </approvalDetails> </creditCardDetailedData> </mopDetailedData> </paymentModule> </mopDescription> </fopGroup> </FOP\_CreateFormOfPayment>

## 5.11.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.11.3 Possible Errors

* * *

## 5.12 Operation: DBI - TP card

According to the context and for TP cards, the agent may be requested to input DBI data (Descriptive Billing Information) within the authorization request.

## 5.12.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<FOP\_CreateFormOfPayment xmlns="http://xml.amadeus.com/TFOPCQ\_19\_2\_1A"> <transactionContext> <transactionDetails> <code>DEF</code> </transactionDetails> </transactionContext> <fopGroup> <fopReference></fopReference> <pnrElementAssociation> <referenceDetails> <type>TST</type> <value>1</value> </referenceDetails> </pnrElementAssociation> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>1</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>VI</fopCode> </fopDetails> </fopPNRDetails> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <paymentSupplementaryData> <attributeFunction>DBI</attributeFunction> <attributeDetails> <attributeType> KS</attributeType> <attributeDescription>12345</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>RZ</attributeType> <attributeDescription>NCE</attributeDescription> </attributeDetails> <attributeDetails> <attributeType> AE</attributeType> <attributeDescription>4</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>AU</attributeType> <attributeDescription>526</attributeDescription> </attributeDetails> <attributeDetails> <attributeType>PK</attributeType> <attributeDescription>1234</attributeDescription> </attributeDetails> </paymentSupplementaryData> <mopInformation> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardData> <creditCardDetails> <ccInfo> <vendorCode>TP</vendorCode> <cardNumber>4541099999990013</cardNumber> <expiryDate>0916</expiryDate> </ccInfo> </creditCardDetails> </creditCardData> </mopInformation> <dummy></dummy> </paymentModule> </mopDescription> </fopGroup> </FOP\_CreateFormOfPayment>

## 5.12.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.12.3 Possible Errors

* * *

## 5.13 Operation: DCC offer

The TFOPCQ will retry the PRI and the DCC currency chosen in order to perform an authorization request to the PSP with the correct currency coshen by the customer.

## 5.13.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<FOP\_CreateFormOfPayment xmlns="http://xml.amadeus.com/TFOPCQ\_19\_2\_1A"> <transactionContext> <transactionDetails> <code>FP</code> </transactionDetails> </transactionContext> <fopGroup> <fopReference></fopReference> <pnrElementAssociation> <referenceDetails> <type>TST</type> <value>1</value> </referenceDetails> </pnrElementAssociation> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>1</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>VI</fopCode> </fopDetails> </fopPNRDetails> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <paymentData> <merchantInformation> <companyCode>AY</companyCode> </merchantInformation> <monetaryInformation> <monetaryDetails> <typeQualifier>712</typeQualifier> <amount>100</amount> <currency>EUR</currency> </monetaryDetails> </monetaryInformation> <paymentId> <referenceType>DCC</referenceType> <uniqueReference>EUR</uniqueReference> </paymentId> <paymentId> <referenceType>PRI</referenceType> <uniqueReference>123456</uniqueReference> </paymentId> </paymentData> <dummy></dummy> </paymentModule> </mopDescription> </fopGroup> </FOP\_CreateFormOfPayment>

## 5.13.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<FOP\_CreateFormOfPaymentReply xmlns="http://xml.amadeus.com/TFOPCR\_19\_2\_1A"> <fopDescription> <fopReference> <reference> <qualifier>FPT</qualifier> <number>28</number> </reference> </fopReference> <passengerAssociation> <passengerReference> <type>PAX</type> <value>1</value> </passengerReference> </passengerAssociation> <pnrElementAssociation> <referenceDetails> <type>TST</type> <value>1</value> </referenceDetails> </pnrElementAssociation> <pnrElementAssociation> <referenceDetails> <type>SEG</type> <value>1</value> </referenceDetails> </pnrElementAssociation> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>1</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>TEST</fopCode> <fopStatus>N</fopStatus> </fopDetails> </fopPNRDetails> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>PAY</attributeType> </attributeDetails> </groupUsage> <paymentData> <merchantInformation> <companyCode>AY</companyCode> </merchantInformation> <monetaryInformation> <monetaryDetails> <typeQualifier>AIR</typeQualifier> <amount>100</amount> <currency>EUR</currency> </monetaryDetails> </monetaryInformation> </paymentData> <dummy></dummy> </paymentModule> </mopDescription> </fopDescription> </FOP\_CreateFormOfPaymentReply>

## 5.13.3 Possible Errors

See "Error Messages" section.

* * *

## 5.14 Operation: EMV payment creation

Query to trigger a payment with a chip & pin device for FP EMV. After the creation, the FP is set to pending (FP EMV/P).

The TID element must contain the identifier of the device to be used.

  

## 5.14.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<FOP\_CreateFormOfPayment xmlns="http://xml.amadeus.com/TFOPCQ\_19\_2\_1A"> <transactionContext> <transactionDetails> <code>DEF</code> </transactionDetails> </transactionContext> <fopGroup> <fopReference></fopReference> <passengerAssociation> <passengerReference> <type>PAX</type> <value>1</value> </passengerReference> </passengerAssociation> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>1</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>EMV</fopCode> <fopStatus>N</fopStatus> </fopDetails> </fopPNRDetails> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>PAY</attributeType> </attributeDetails> </groupUsage> <paymentData> <merchantInformation> <companyCode>LH</companyCode> </merchantInformation> <paymentId> <referenceType>TID</referenceType> <uniqueReference>6X04A9BA</uniqueReference> </paymentId> </paymentData> <dummy></dummy> </paymentModule> </mopDescription> </fopGroup> </FOP\_CreateFormOfPayment>

## 5.14.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<FOP\_CreateFormOfPaymentReply xmlns="http://xml.amadeus.com/TFOPCR\_19\_2\_1A"> <fopDescription> <fopReference> <reference> <qualifier>FPT</qualifier> <number>11</number> </reference> </fopReference> <passengerAssociation> <passengerReference> <type>PAX</type> <value>1</value> </passengerReference> </passengerAssociation> <pnrElementAssociation> <referenceDetails> <type>SEG</type> <value>1</value> </referenceDetails> </pnrElementAssociation> <pnrElementAssociation> <referenceDetails> <type>TST</type> <value>1</value> </referenceDetails> </pnrElementAssociation> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>1</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>EMV</fopCode> <fopStatus>N</fopStatus> </fopDetails> </fopPNRDetails> <oldFopFreeflow> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>EMV/P</freeText> </oldFopFreeflow> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>S</criteriaSetType> <criteriaDetails> <attributeType>13</attributeType> <attributeDescription>1</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>190</attributeType> <attributeDescription>1</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>33</attributeType> <attributeDescription>1</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>24</attributeType> <attributeDescription>1</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>APM</attributeType> <attributeDescription>1</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>D</criteriaSetType> <criteriaDetails> <attributeType>IPN</attributeType> <attributeDescription>2549478220</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>TID</attributeType> <attributeDescription>6X04A9BA</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>AMT</attributeType> <attributeDescription>522.58</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>120</attributeType> <attributeDescription>P</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CUR</attributeType> <attributeDescription>EUR</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>FOPCODE</attributeType> <attributeDescription>EMV</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <paymentData> <merchantInformation> <companyCode>LH</companyCode> </merchantInformation> <monetaryInformation> <monetaryDetails> <typeQualifier>AIR</typeQualifier> <amount>522.58</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>AUT</typeQualifier> <amount>522.58</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>IT</typeQualifier> <amount>522.58</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>ITC</typeQualifier> <amount>522.58</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>T</typeQualifier> <amount>522.58</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TPC</typeQualifier> <amount>522.58</amount> <currency>EUR</currency> </otherMonetaryDetails> </monetaryInformation> <paymentId> <referenceType>PRI</referenceType> <uniqueReference>2549478220</uniqueReference> </paymentId> <fraudScreeningData> <fraudScreening> <statusInformation> <indicator>FRA</indicator> <action>N</action> </statusInformation> </fraudScreening> <payerPhoneOrEmail> <phoneOrEmailType>P</phoneOrEmailType> <telephoneNumberDetails> <telephoneNumber>FRA 069-6962310 - DEUTSCHE LUFTH</telephoneNumber> </telephoneNumberDetails> </payerPhoneOrEmail> </fraudScreeningData> </paymentData> <mopInformation> <fopInformation> <formOfPayment> <type>EMV</type> </formOfPayment> </fopInformation> <dummy></dummy> </mopInformation> <dummy></dummy> <mopDetailedData> <fopInformation> <formOfPayment> <type>EMV</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardDetailedData> <authorisationSupplementaryData></authorisationSupplementaryData> </creditCardDetailedData> </mopDetailedData> </paymentModule> </mopDescription> </fopDescription> </FOP\_CreateFormOfPaymentReply>

## 5.14.3 Possible Errors

See "Error Messages" section.

* * *

## 5.15 Operation: FOP account (ELV)

Query with ELV account data.

## 5.15.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<FOP\_CreateFormOfPayment xmlns="http://xml.amadeus.com/TFOPCQ\_19\_2\_1A"> <transactionContext> <transactionDetails> <code>FP</code> </transactionDetails> </transactionContext> <fopGroup> <fopReference></fopReference> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>1</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>ELV</fopCode> </fopDetails> </fopPNRDetails> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>D</criteriaSetType> <criteriaDetails> <attributeType>27</attributeType> <attributeDescription>JOHN SMITH</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <paymentData> <merchantInformation> <companyCode>AB</companyCode> </merchantInformation> <transactionDateTime> <dateTime> <year>2015</year> <month>11</month> <day>29</day> </dateTime> </transactionDateTime> </paymentData> <mopInformation> <fopInformation> <formOfPayment> <type>ACC</type> </formOfPayment> </fopInformation> <dummy></dummy> <invoiceDataGroup> <invoiceInformation> <formOfPayment> <type>ACC</type> <customerAccount>12345678</customerAccount> <membershipStatus>ELV</membershipStatus> </formOfPayment> </invoiceInformation> <routing> <routingDetails> <otherStation>AB</otherStation> </routingDetails> </routing> </invoiceDataGroup> </mopInformation> <dummy></dummy> </paymentModule> </mopDescription> </fopGroup> </FOP\_CreateFormOfPayment>

## 5.15.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<FOP\_CreateFormOfPaymentReply xmlns="http://xml.amadeus.com/TFOPCR\_19\_2\_1A"> <fopDescription> <fopReference> <reference> <qualifier>FPT</qualifier> <number>23</number> </reference> </fopReference> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>1</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>ELV</fopCode> <fopBillingCode>CA</fopBillingCode> <fopStatus>N</fopStatus> <fopEdiCode>EL</fopEdiCode> <fopReportingCode>MS</fopReportingCode> <fopElecTicketingCode>MS</fopElecTicketingCode> </fopDetails> </fopPNRDetails> <oldFopFreeflow> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>ELV/12345678/JOHN SMITH</freeText> </oldFopFreeflow> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>S</criteriaSetType> <criteriaDetails> <attributeType>13</attributeType> <attributeDescription>1</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>24</attributeType> <attributeDescription>1</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>APM</attributeType> <attributeDescription>1</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>D</criteriaSetType> <criteriaDetails> <attributeType>110</attributeType> <attributeDescription>12345678</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CUR</attributeType> <attributeDescription>EUR</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>DTE5</attributeType> <attributeDescription>29112015</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>FOPCODE</attributeType> <attributeDescription>ELV</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>27</attributeType> <attributeDescription>JOHN SMITH</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>119</attributeType> <attributeDescription>AB</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <paymentData> <merchantInformation> <companyCode>AB</companyCode> </merchantInformation> <transactionDateTime> <dateTime> <year>2015</year> <month>11</month> <day>29</day> <hour>0</hour> <minutes>0</minutes> <seconds>0</seconds> </dateTime> </transactionDateTime> </paymentData> <dummy></dummy> </paymentModule> </mopDescription> </fopDescription> </FOP\_CreateFormOfPaymentReply>

## 5.15.3 Possible Errors

See "Error Messages" section.

* * *

## 5.16 Operation: FOP creation with structured freeflow

Query with the structured freeflow, in 2 different fields.

## 5.16.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<FOP\_CreateFormOfPayment xmlns="http://xml.amadeus.com/TFOPCQ\_19\_2\_1A"> <transactionContext> <transactionDetails> <code>FP</code> </transactionDetails> </transactionContext> <fopGroup> <fopReference></fopReference> <pnrElementAssociation> <referenceDetails> <type>TST</type> <value>1</value> </referenceDetails> </pnrElementAssociation> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>1</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>VI</fopCode> </fopDetails> </fopPNRDetails> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>D</criteriaSetType> <criteriaDetails> <attributeType>FF1</attributeType> <attributeDescription>1234</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>FF2</attributeType> <attributeDescription>ABCD-\*12</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <paymentData> <merchantInformation> <companyCode>AY</companyCode> </merchantInformation> <monetaryInformation> <monetaryDetails> <typeQualifier>712</typeQualifier> <amount>100</amount> <currency>EUR</currency> </monetaryDetails> </monetaryInformation> </paymentData> <dummy></dummy> </paymentModule> </mopDescription> </fopGroup> </FOP\_CreateFormOfPayment>

## 5.16.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<FOP\_CreateFormOfPaymentReply xmlns="http://xml.amadeus.com/TFOPCR\_19\_2\_1A"> <fopDescription> <fopReference> <reference> <qualifier>FPT</qualifier> <number>28</number> </reference> </fopReference> <passengerAssociation> <passengerReference> <type>PAX</type> <value>1</value> </passengerReference> </passengerAssociation> <pnrElementAssociation> <referenceDetails> <type>TST</type> <value>1</value> </referenceDetails> </pnrElementAssociation> <pnrElementAssociation> <referenceDetails> <type>SEG</type> <value>1</value> </referenceDetails> </pnrElementAssociation> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>1</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>TEST</fopCode> <fopStatus>N</fopStatus> </fopDetails> </fopPNRDetails> <oldFopFreeflow> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>TEST/EUR100/1234/ABCD-\*12â€™</freeText> </oldFopFreeflow> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>D</criteriaSetType> <criteriaDetails> <attributeType>FOPCODE</attributeType> <attributeDescription>TEST</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>AMT</attributeType> <attributeDescription>100</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CUR</attributeType> <attributeDescription>EUR</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>FF1</attributeType> <attributeDescription>1234</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>FF2</attributeType> <attributeDescription>ABCD-\*12</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <paymentData> <merchantInformation> <companyCode>AY</companyCode> </merchantInformation> <monetaryInformation> <monetaryDetails> <typeQualifier>AIR</typeQualifier> <amount>100</amount> <currency>EUR</currency> </monetaryDetails> </monetaryInformation> </paymentData> <dummy></dummy> </paymentModule> </mopDescription> </fopDescription> </FOP\_CreateFormOfPaymentReply>

## 5.16.3 Possible Errors

See "Error Messages" section.

* * *

## 5.17 Operation: FOP creation with unstructured free flow

Query with unstructured freeflow.

## 5.17.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<FOP\_CreateFormOfPayment xmlns="http://xml.amadeus.com/TFOPCQ\_19\_2\_1A"> <transactionContext> <transactionDetails> <code>FP</code> </transactionDetails> </transactionContext> <fopGroup> <fopReference></fopReference> <pnrElementAssociation> <referenceDetails> <type>TST</type> <value>1</value> </referenceDetails> </pnrElementAssociation> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>1</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>CCVI</fopCode> </fopDetails> </fopPNRDetails> <oldFopFreeflow> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>CCVI4541099100010016/0919</freeText> </oldFopFreeflow> </mopDetails> </mopDescription> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>2</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>CCVI</fopCode> </fopDetails> </fopPNRDetails> <oldFopFreeflow> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>CCVI4541099100010024/0919/EUR20</freeText> </oldFopFreeflow> </mopDetails> </mopDescription> </fopGroup> </FOP\_CreateFormOfPayment>

## 5.17.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<FOP\_CreateFormOfPaymentReply xmlns="http://xml.amadeus.com/TFOPCR\_19\_2\_1A"> <fopDescription> <fopReference> <reference> <qualifier>FPT</qualifier> <number>20</number> </reference> </fopReference> <passengerAssociation> <passengerReference> <type>PAX</type> <value>1</value> </passengerReference> </passengerAssociation> <pnrElementAssociation> <referenceDetails> <type>TST</type> <value>1</value> </referenceDetails> </pnrElementAssociation> <pnrElementAssociation> <referenceDetails> <type>SEG</type> <value>1</value> </referenceDetails> </pnrElementAssociation> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>1</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>CCVI</fopCode> <fopStatus>N</fopStatus> <fopEdiCode>CCVI</fopEdiCode> <fopReportingCode>CC</fopReportingCode> <fopElecTicketingCode>CC</fopElecTicketingCode> </fopDetails> </fopPNRDetails> <oldFopFreeflow> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>CCVIXXXXXXXXXXXX0016/0919</freeText> </oldFopFreeflow> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>S</criteriaSetType> <criteriaDetails> <attributeType>13</attributeType> <attributeDescription>1</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>D</criteriaSetType> <criteriaDetails> <attributeType>CCNUM</attributeType> <attributeDescription>XXXXXXXXXXXX0016</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CUR</attributeType> <attributeDescription>EUR</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CCDTE1</attributeType> <attributeDescription>0919</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>FOPCODE</attributeType> <attributeDescription>CCVI</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>VENDORCODE</attributeType> <attributeDescription>VI</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <mopInformation> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardData> <creditCardDetails> <ccInfo> <vendorCode>VI</vendorCode> <cardNumber>XXXXXXXXXXXX0016</cardNumber> <expiryDate>0919</expiryDate> </ccInfo> </creditCardDetails> </creditCardData> </mopInformation> <dummy></dummy> <mopDetailedData> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardDetailedData> <authorisationSupplementaryData></authorisationSupplementaryData> </creditCardDetailedData> </mopDetailedData> </paymentModule> </mopDescription> </fopDescription> </FOP\_CreateFormOfPaymentReply>

## 5.17.3 Possible Errors

See "Error Messages" section.

* * *

## 5.18 Operation: FOP with installments

Query containing Installments data.

## 5.18.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<FOP\_CreateFormOfPayment xmlns="http://xml.amadeus.com/TFOPCQ\_19\_2\_1A"> <fopGroup> <fopReference></fopReference> <pnrElementAssociation> <referenceDetails> <type>TST</type> <value>1</value> </referenceDetails> </pnrElementAssociation> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>1</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>CCVI</fopCode> </fopDetails> </fopPNRDetails> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <paymentData> <merchantInformation> <companyCode>QF</companyCode> </merchantInformation> <monetaryInformation> <monetaryDetails> <typeQualifier>ISF</typeQualifier> <amount>100</amount> <currency>AUD</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>ISN</typeQualifier> <amount>200</amount> <currency>AUD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>ISI</typeQualifier> <amount>300</amount> <currency>AUD</currency> </otherMonetaryDetails> </monetaryInformation> <extendedPaymentInfo> <extendedPaymentDetails> <instalmentsNumber>2</instalmentsNumber> <instalmentsFrequency>MTH</instalmentsFrequency> <instalmentsStartDate>130223</instalmentsStartDate> <instalmentsDatrDateFormat>101</instalmentsDatrDateFormat> </extendedPaymentDetails> </extendedPaymentInfo> </paymentData> <mopInformation> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardData> <creditCardDetails> <ccInfo> <vendorCode>VI</vendorCode> <cardNumber>4541099100010016</cardNumber> <expiryDate>0913</expiryDate> </ccInfo> </creditCardDetails> </creditCardData> </mopInformation> <dummy></dummy> </paymentModule> </mopDescription> </fopGroup> </FOP\_CreateFormOfPayment>

## 5.18.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<FOP\_CreateFormOfPaymentReply xmlns="http://xml.amadeus.com/TFOPCR\_19\_2\_1A"> <fopDescription> <fopReference> <reference> <qualifier>FPT</qualifier> <number>34</number> </reference> </fopReference> <passengerAssociation> <passengerReference> <type>PAX</type> <value>1</value> </passengerReference> </passengerAssociation> <pnrElementAssociation> <referenceDetails> <type>TST</type> <value>1</value> </referenceDetails> </pnrElementAssociation> <pnrElementAssociation> <referenceDetails> <type>SEG</type> <value>1</value> </referenceDetails> </pnrElementAssociation> <pnrElementAssociation> <referenceDetails> <type>SEG</type> <value>3</value> </referenceDetails> </pnrElementAssociation> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>1</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>CCVI</fopCode> <fopStatus>N</fopStatus> <fopEdiCode>CCVI</fopEdiCode> <fopReportingCode>CA</fopReportingCode> <fopElecTicketingCode>CC</fopElecTicketingCode> </fopDetails> </fopPNRDetails> <oldFopFreeflow> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>CCVI4541099100010016T/0913</freeText> </oldFopFreeflow> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>S</criteriaSetType> <criteriaDetails> <attributeType>13</attributeType> <attributeDescription>1</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>63</attributeType> <attributeDescription>1</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>D</criteriaSetType> <criteriaDetails> <attributeType>FI</attributeType> <attributeDescription>100AUD</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>II</attributeType> <attributeDescription>300AUD</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>LI</attributeType> <attributeDescription>200AUD</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>NI</attributeType> <attributeDescription>2</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CCNUM</attributeType> <attributeDescription>4541099100010016</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CUR</attributeType> <attributeDescription>AUD</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CCDTE1</attributeType> <attributeDescription>0913</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>FOPCODE</attributeType> <attributeDescription>CCVI</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>37</attributeType> <attributeDescription>T</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>VENDORCODE</attributeType> <attributeDescription>VI</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <paymentData> <merchantInformation> <companyCode>QF</companyCode> </merchantInformation> <monetaryInformation> <monetaryDetails> <typeQualifier>ISF</typeQualifier> <amount>100</amount> <currency>AUD</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>ISI</typeQualifier> <amount>300</amount> <currency>AUD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>ISN</typeQualifier> <amount>200</amount> <currency>AUD</currency> </otherMonetaryDetails> </monetaryInformation> <extendedPaymentInfo> <extendedPaymentDetails> <instalmentsNumber>2</instalmentsNumber> </extendedPaymentDetails> </extendedPaymentInfo> </paymentData> <mopInformation> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardData> <creditCardDetails> <ccInfo> <vendorCode>VI</vendorCode> <cardNumber>4541099100010016</cardNumber> <expiryDate>0913</expiryDate> </ccInfo> </creditCardDetails> </creditCardData> </mopInformation> <dummy></dummy> <mopDetailedData> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardDetailedData> <authorisationSupplementaryData></authorisationSupplementaryData> </creditCardDetailedData> </mopDetailedData> </paymentModule> </mopDescription> </fopDescription> </FOP\_CreateFormOfPaymentReply>

## 5.18.3 Possible Errors

See "Error Messages" section.

* * *

## 5.19 Operation: Fraud screening

Query with fraud screening data.

## 5.19.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<FOP\_CreateFormOfPayment xmlns="http://xml.amadeus.com/TFOPCQ\_19\_2\_1A"> <fopGroup> <fopReference></fopReference> <passengerAssociation> <passengerReference> <type>PAX</type> <value>1</value> </passengerReference> </passengerAssociation> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>1</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>VI</fopCode> </fopDetails> </fopPNRDetails> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <paymentData> <merchantInformation> <companyCode>AY</companyCode> </merchantInformation> <extendedPaymentInfo> <extendedPaymentDetails> <instalmentsNumber>1</instalmentsNumber> </extendedPaymentDetails> </extendedPaymentInfo> <fraudScreeningData> <fraudScreening> <statusInformation> <indicator>FRA</indicator> <action>Y</action> </statusInformation> </fraudScreening> <ipAdress> <deviceIdentification> <address>111.222.333.444</address> <qualifier>IP</qualifier> </deviceIdentification> </ipAdress> <payerName> <ccHolderNameDetails> <surname>DUPONT</surname> </ccHolderNameDetails> <otherNameDetails> <givenName>CLEMENT</givenName> </otherNameDetails> </payerName> <payerDateOfBirth> <dateTime> <year>1980</year> <month>10</month> <day>30</day> </dateTime> </payerDateOfBirth> <formOfIdDetails> <referenceDetails> <type>CP</type> <value>25208731592</value> </referenceDetails> </formOfIdDetails> </fraudScreeningData> </paymentData> <mopInformation> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardData> <creditCardDetails> <ccInfo> <vendorCode>VI</vendorCode> <cardNumber>4541099100010016</cardNumber> <expiryDate>0915</expiryDate> <ccHolderName>CLEMENT DUPONT</ccHolderName> </ccInfo> </creditCardDetails> </creditCardData> </mopInformation> <dummy></dummy> </paymentModule> </mopDescription> </fopGroup> </FOP\_CreateFormOfPayment>

## 5.19.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<FOP\_CreateFormOfPaymentReply xmlns="http://xml.amadeus.com/TFOPCR\_19\_2\_1A"> <fopDescription> <fopReference> <reference> <qualifier>FPT</qualifier> <number>24</number> </reference> </fopReference> <passengerAssociation> <passengerReference> <type>PAX</type> <value>1</value> </passengerReference> </passengerAssociation> <pnrElementAssociation> <referenceDetails> <type>TST</type> <value>1</value> </referenceDetails> </pnrElementAssociation> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>1</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>VI</fopCode> <fopStatus>N</fopStatus> <fopEdiCode>CCVI</fopEdiCode> <fopReportingCode>CC</fopReportingCode> <fopElecTicketingCode>CC</fopElecTicketingCode> </fopDetails> </fopPNRDetails> <oldFopFreeflow> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>VIXXXXXXXXXXXX0016/0915</freeText> </oldFopFreeflow> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>S</criteriaSetType> <criteriaDetails> <attributeType>13</attributeType> <attributeDescription>1</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>D</criteriaSetType> <criteriaDetails> <attributeType>NI</attributeType> <attributeDescription>1</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CCNUM</attributeType> <attributeDescription>XXXXXXXXXXXX0016</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>67</attributeType> <attributeDescription>CLEMENT DUPONT</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CUR</attributeType> <attributeDescription>EUR</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CCDTE1</attributeType> <attributeDescription>0915</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>FOPCODE</attributeType> <attributeDescription>VI</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>27</attributeType> <attributeDescription>CLEMENT DUPONT</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>VENDORCODE</attributeType> <attributeDescription>VI</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <paymentData> <merchantInformation> <companyCode>AY</companyCode> </merchantInformation> <extendedPaymentInfo> <extendedPaymentDetails> <instalmentsNumber>1</instalmentsNumber> </extendedPaymentDetails> </extendedPaymentInfo> <fraudScreeningData> <fraudScreening> <statusInformation> <indicator>FRA</indicator> <action>Y</action> </statusInformation> </fraudScreening> <ipAdress> <deviceIdentification> <address>111.222.333.444</address> <qualifier>IP</qualifier> </deviceIdentification> </ipAdress> <payerName> <ccHolderNameDetails> <surname>DUPONT</surname> </ccHolderNameDetails> <otherNameDetails> <givenName>CLEMENT</givenName> </otherNameDetails> </payerName> <payerDateOfBirth> <dateTime> <year>1980</year> <month>10</month> <day>30</day> </dateTime> </payerDateOfBirth> <formOfIdDetails> <referenceDetails> <type>CP</type> <value>25208731592</value> </referenceDetails> </formOfIdDetails> </fraudScreeningData> </paymentData> <mopInformation> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardData> <creditCardDetails> <ccInfo> <vendorCode>VI</vendorCode> <cardNumber>XXXXXXXXXXXX0016</cardNumber> <expiryDate>0915</expiryDate> </ccInfo> </creditCardDetails> </creditCardData> </mopInformation> <dummy></dummy> <mopDetailedData> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardDetailedData> <authorisationSupplementaryData></authorisationSupplementaryData> </creditCardDetailedData> </mopDetailedData> </paymentModule> </mopDescription> </fopDescription> </FOP\_CreateFormOfPaymentReply>

## 5.19.3 Possible Errors

See "Error Messages" section.

* * *

## 5.20 Operation: Frequent Flyer FOP

Query with IRU information.

## 5.20.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<FOP\_CreateFormOfPayment xmlns="http://xml.amadeus.com/TFOPCQ\_19\_2\_1A"> <transactionContext> <transactionDetails> <code>DEF</code> </transactionDetails> </transactionContext> <fopGroup> <fopReference></fopReference> <pnrElementAssociation> <referenceDetails> <type>TST</type> <value>1</value> </referenceDetails> </pnrElementAssociation> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>1</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>FFR</fopCode> </fopDetails> </fopPNRDetails> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <paymentData> <merchantInformation> <companyCode>SQ</companyCode> </merchantInformation> </paymentData> <mopInformation> <fopInformation> <formOfPayment> <type>IRU</type> </formOfPayment> </fopInformation> <dummy></dummy> <invoiceDataGroup> <invoiceInformation> <formOfPayment> <type>IRU</type> <merchantCode>SQ</merchantCode> <customerAccount>8360018718</customerAccount> <membershipStatus>IRU</membershipStatus> </formOfPayment> </invoiceInformation> <routing> <routingDetails> <otherStation>SQ</otherStation> </routingDetails> </routing> </invoiceDataGroup> </mopInformation> <dummy></dummy> </paymentModule> </mopDescription> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>2</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>CA</fopCode> </fopDetails> </fopPNRDetails> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <paymentData> <merchantInformation> <companyCode>SQ</companyCode> </merchantInformation> <monetaryInformation> <monetaryDetails> <typeQualifier>712</typeQualifier> <amount>370.90</amount> <currency>SGD</currency> </monetaryDetails> </monetaryInformation> </paymentData> <mopInformation> <fopInformation> <formOfPayment> <type>CASH</type> </formOfPayment> </fopInformation> <dummy></dummy> </mopInformation> <dummy></dummy> </paymentModule> </mopDescription> </fopGroup> </FOP\_CreateFormOfPayment>

## 5.20.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.20.3 Possible Errors

* * *

## 5.21 Operation: Generic FP - Single FOP

Query to create a generic FP.

## 5.21.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<FOP\_CreateFormOfPayment xmlns="http://xml.amadeus.com/TFOPCQ\_19\_2\_1A"> <transactionContext> <transactionDetails> <code>FP</code> </transactionDetails> </transactionContext> <fopGroup> <fopReference></fopReference> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>1</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>CASH</fopCode> </fopDetails> </fopPNRDetails> </mopDetails> </mopDescription> </fopGroup> </FOP\_CreateFormOfPayment>

## 5.21.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<FOP\_CreateFormOfPaymentReply xmlns="http://xml.amadeus.com/TFOPCR\_19\_2\_1A"> <fopDescription> <fopReference> <reference> <qualifier>FPT</qualifier> <number>20</number> </reference> </fopReference> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>1</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>CASH</fopCode> <fopStatus>N</fopStatus> <fopEdiCode>CA</fopEdiCode> <fopElecTicketingCode>CA</fopElecTicketingCode> </fopDetails> </fopPNRDetails> <oldFopFreeflow> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>CASH</freeText> </oldFopFreeflow> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>S</criteriaSetType> <criteriaDetails> <attributeType>13</attributeType> <attributeDescription>1</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>D</criteriaSetType> <criteriaDetails> <attributeType>CUR</attributeType> <attributeDescription>EUR</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>FOPCODE</attributeType> <attributeDescription>CASH</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <dummy></dummy> </paymentModule> </mopDescription> </fopDescription> </FOP\_CreateFormOfPaymentReply>

## 5.21.3 Possible Errors

See "Error Messages" section.

* * *

## 5.22 Operation: INV FOP

Query for FP inv.

## 5.22.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<FOP\_CreateFormOfPayment xmlns="http://xml.amadeus.com/TFOPCQ\_19\_2\_1A"> <transactionContext> <transactionDetails> <code>DEF</code> </transactionDetails> </transactionContext> <fopGroup> <fopReference></fopReference> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>1</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>INV</fopCode> </fopDetails> </fopPNRDetails> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <paymentData> <merchantInformation> <companyCode>AB</companyCode> </merchantInformation> <transactionDateTime> <dateTime> <year>2011</year> <month>11</month> <day>29</day> </dateTime> </transactionDateTime> </paymentData> <mopInformation> <fopInformation> <formOfPayment> <type>INV</type> </formOfPayment> </fopInformation> <dummy></dummy> <invoiceDataGroup> <invoiceInformation> <formOfPayment> <type>INV</type> <customerAccount>InvoiceNumber</customerAccount> <membershipStatus>1</membershipStatus> </formOfPayment> </invoiceInformation> <routing> <routingDetails> <otherStation>AB</otherStation> </routingDetails> </routing> </invoiceDataGroup> </mopInformation> <dummy></dummy> </paymentModule> </mopDescription> </fopGroup> </FOP\_CreateFormOfPayment>

## 5.22.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.22.3 Possible Errors

* * *

## 5.23 Operation: Manual approval code

The use may want to input a FOP with manual approval code.

Following example shows how to input a FOP with manual approval code 12346.

## 5.23.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<FOP\_CreateFormOfPayment xmlns="http://xml.amadeus.com/TFOPCQ\_19\_2\_1A"> <transactionContext> <transactionDetails> <code>FP</code> </transactionDetails> </transactionContext> <fopGroup> <fopReference></fopReference> <passengerAssociation> <passengerReference> <type>PAX</type> <value>1</value> </passengerReference> </passengerAssociation> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>1</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>VI</fopCode> </fopDetails> </fopPNRDetails> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <mopInformation> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardData> <creditCardDetails> <ccInfo> <vendorCode>VI</vendorCode> <cardNumber>4541099100010016</cardNumber> <expiryDate>0913</expiryDate> </ccInfo> </creditCardDetails> </creditCardData> </mopInformation> <dummy></dummy> <mopDetailedData> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardDetailedData> <authorisationSupplementaryData></authorisationSupplementaryData> <approvalDetails> <approvalCodeData> <approvalCode>12346</approvalCode> <sourceOfApproval>M</sourceOfApproval> </approvalCodeData> </approvalDetails> </creditCardDetailedData> </mopDetailedData> </paymentModule> </mopDescription> </fopGroup> </FOP\_CreateFormOfPayment>

## 5.23.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<FOP\_CreateFormOfPaymentReply xmlns="http://xml.amadeus.com/TFOPCR\_19\_2\_1A"> <fopDescription> <fopReference> <reference> <qualifier>FPT</qualifier> <number>1</number> </reference> </fopReference> <passengerAssociation> <passengerReference> <type>PAX</type> <value>1</value> </passengerReference> </passengerAssociation> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>1</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>VI</fopCode> <fopStatus>N</fopStatus> <fopEdiCode>CCVI</fopEdiCode> <fopReportingCode>CC</fopReportingCode> <fopElecTicketingCode>CC</fopElecTicketingCode> </fopDetails> </fopPNRDetails> <oldFopFreeflow> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>VIXXXXXXXXXXXX0016/0913/N123456</freeText> </oldFopFreeflow> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>S</criteriaSetType> <criteriaDetails> <attributeType>13</attributeType> <attributeDescription>1</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>D</criteriaSetType> <criteriaDetails> <attributeType>2</attributeType> <attributeDescription>123456</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CCNUM</attributeType> <attributeDescription>XXXXXXXXXXXX0016</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CUR</attributeType> <attributeDescription>EUR</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CCDTE1</attributeType> <attributeDescription>0913</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>FOPCODE</attributeType> <attributeDescription>VI</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>VENDORCODE</attributeType> <attributeDescription>VI</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <mopInformation> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardData> <creditCardDetails> <ccInfo> <vendorCode>VI</vendorCode> <cardNumber>XXXXXXXXXXXX0016</cardNumber> <expiryDate>0913</expiryDate> </ccInfo> </creditCardDetails> </creditCardData> </mopInformation> <dummy></dummy> <mopDetailedData> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardDetailedData> <authorisationSupplementaryData></authorisationSupplementaryData> <approvalDetails> <approvalCodeData> <approvalCode>123456</approvalCode> <sourceOfApproval>M</sourceOfApproval> </approvalCodeData> </approvalDetails> </creditCardDetailedData> </mopDetailedData> </paymentModule> </mopDescription> </fopDescription> </FOP\_CreateFormOfPaymentReply>

## 5.23.3 Possible Errors

See "Error Messages" section.

* * *

## 5.24 Operation: Miles &Cash FOP

Creation of a FOP Miles & Cash with slider rank and amounts in miles and in cash provided in entry.

## 5.24.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<FOP\_CreateFormOfPayment xmlns="http://xml.amadeus.com/TFOPCQ\_19\_2\_1A"> <transactionContext> <transactionDetails> <code>FP</code> </transactionDetails> </transactionContext> <fopGroup> <fopReference></fopReference> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>1</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>FFS</fopCode> </fopDetails> </fopPNRDetails> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <paymentData> <merchantInformation> <companyCode>SQ</companyCode> </merchantInformation> <monetaryInformation> <monetaryDetails> <typeQualifier>712</typeQualifier> <amount>300.00</amount> <currency>SGB</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>MIL</typeQualifier> <amount>3000</amount> </otherMonetaryDetails> </monetaryInformation> <sliderConversion> <sliderMode> <indicator>SLD</indicator> </sliderMode> <sliderPosition> <numberOfUnit>6</numberOfUnit> <unitQualifier>RNK</unitQualifier> </sliderPosition> <sliderPosition> <numberOfUnit>50</numberOfUnit> <unitQualifier>CPL</unitQualifier> </sliderPosition> </sliderConversion> </paymentData> <mopInformation> <fopInformation> <formOfPayment> <type>IRU</type> </formOfPayment> </fopInformation> <dummy></dummy> <invoiceDataGroup> <invoiceInformation> <formOfPayment> <type>IRU</type> <merchantCode>SQ</merchantCode> <customerAccount>8360018718</customerAccount> <membershipStatus>IRU</membershipStatus> </formOfPayment> </invoiceInformation> <routing> <routingDetails> <otherStation>SQ</otherStation> </routingDetails> </routing> </invoiceDataGroup> </mopInformation> <dummy></dummy> </paymentModule> </mopDescription> </fopGroup> </FOP\_CreateFormOfPayment>

## 5.24.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<FOP\_CreateFormOfPaymentReply xmlns="http://xml.amadeus.com/TFOPCR\_19\_2\_1A"> <fopDescription> <fopReference> <reference> <qualifier>FPT</qualifier> <number>1</number> </reference> </fopReference> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>1</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>FFS</fopCode> <fopBillingCode>CC</fopBillingCode> <fopStatus>N</fopStatus> <fopEdiCode>FR</fopEdiCode> <fopReportingCode>MS</fopReportingCode> <fopElecTicketingCode>MS</fopElecTicketingCode> </fopDetails> </fopPNRDetails> <oldFopFreeflow> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>FFSSQ8360018718-M1000\*N</freeText> </oldFopFreeflow> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>S</criteriaSetType> <criteriaDetails> <attributeType>13</attributeType> <attributeDescription>1</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>168</attributeType> <attributeDescription>1</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>180</attributeType> <attributeDescription>1</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>185</attributeType> <attributeDescription>1</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>NIL</attributeType> <attributeDescription>1</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>124</attributeType> <attributeDescription>1</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>24</attributeType> <attributeDescription>1</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>APMR</attributeType> <attributeDescription>1</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>APM</attributeType> <attributeDescription>1</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>APMV</attributeType> <attributeDescription>1</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>D</criteriaSetType> <criteriaDetails> <attributeType>110</attributeType> <attributeDescription>8360018718</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>125</attributeType> <attributeDescription>1000</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>120</attributeType> <attributeDescription>N</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>AWDCUR</attributeType> <attributeDescription>MIL</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CUR</attributeType> <attributeDescription>SGD</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>FOPCODE</attributeType> <attributeDescription>FFS</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>119</attributeType> <attributeDescription>SQ</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <paymentData> <merchantInformation> <companyCode>SQ</companyCode> </merchantInformation> <monetaryInformation> <monetaryDetails> <typeQualifier>712</typeQualifier> <amount>300.00</amount> <currency>SGD</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>MIL</typeQualifier> <amount>3000</amount> </otherMonetaryDetails> </monetaryInformation> <sliderConversion> <sliderMode> <indicator>SLD</indicator> </sliderMode> <sliderPosition> <numberOfUnit>6</numberOfUnit> <unitQualifier>RNK</unitQualifier> </sliderPosition> <sliderPosition> <numberOfUnit>50</numberOfUnit> <unitQualifier>CPL</unitQualifier> </sliderPosition> </sliderConversion> </paymentData> <mopInformation> <fopInformation> <formOfPayment> <type>IRU</type> </formOfPayment> </fopInformation> <dummy></dummy> <invoiceDataGroup> <invoiceInformation> <formOfPayment> <type>IRU</type> <merchantCode>SQ</merchantCode> <customerAccount>8360018718</customerAccount> <membershipStatus>IRU</membershipStatus> </formOfPayment> </invoiceInformation> <routing> <routingDetails> <otherStation>SQIRU</otherStation> </routingDetails> </routing> </invoiceDataGroup> </mopInformation> <dummy></dummy> </paymentModule> </mopDescription> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>2</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>CA</fopCode> <fopStatus>N</fopStatus> <fopEdiCode>CA</fopEdiCode> <fopReportingCode>CA</fopReportingCode> <fopElecTicketingCode>CA</fopElecTicketingCode> </fopDetails> </fopPNRDetails> <oldFopFreeflow> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>CA/SGD370.90</freeText> </oldFopFreeflow> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>S</criteriaSetType> <criteriaDetails> <attributeType>13</attributeType> <attributeDescription>1</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>D</criteriaSetType> <criteriaDetails> <attributeType>AMT</attributeType> <attributeDescription>370.90</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CUR</attributeType> <attributeDescription>SGD</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>FOPCODE</attributeType> <attributeDescription>CA</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <paymentData> <merchantInformation> <companyCode>SQ</companyCode> </merchantInformation> <monetaryInformation> <monetaryDetails> <typeQualifier>712</typeQualifier> <amount>370.90</amount> <currency>SGD</currency> </monetaryDetails> </monetaryInformation> </paymentData> <dummy></dummy> </paymentModule> </mopDescription> </fopDescription> </FOP\_CreateFormOfPaymentReply>

## 5.24.3 Possible Errors

See "Error Messages" section.

* * *

## 5.25 Operation: Multiple FOPs

It is possible to specify up to three FOPs per FP element

## 5.25.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<FOP\_CreateFormOfPayment xmlns="http://xml.amadeus.com/TFOPCQ\_19\_2\_1A"> <transactionContext> <transactionDetails> <code>FP</code> </transactionDetails> </transactionContext> <fopGroup> <fopReference></fopReference> <pnrElementAssociation> <referenceDetails> <type>TST</type> <value>1</value> </referenceDetails> </pnrElementAssociation> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>1</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>CASH</fopCode> </fopDetails> </fopPNRDetails> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <mopInformation> <fopInformation> <formOfPayment> <type>CA</type> </formOfPayment> </fopInformation> <dummy></dummy> </mopInformation> <dummy></dummy> </paymentModule> </mopDescription> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>2</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>CCVI</fopCode> </fopDetails> </fopPNRDetails> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <paymentData> <merchantInformation> <companyCode>AF</companyCode> </merchantInformation> <monetaryInformation> <monetaryDetails> <typeQualifier>712</typeQualifier> <amount>40</amount> <currency>EUR</currency> </monetaryDetails> </monetaryInformation> </paymentData> <mopInformation> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardData> <creditCardDetails> <ccInfo> <vendorCode>VI</vendorCode> <cardNumber>4541099100010016</cardNumber> <securityId>123</securityId> <expiryDate>1019</expiryDate> </ccInfo> </creditCardDetails> </creditCardData> </mopInformation> <dummy></dummy> </paymentModule> </mopDescription> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>3</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>CCVI</fopCode> </fopDetails> </fopPNRDetails> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <paymentData> <merchantInformation> <companyCode>AF</companyCode> </merchantInformation> <monetaryInformation> <monetaryDetails> <typeQualifier>712</typeQualifier> <amount>20</amount> <currency>EUR</currency> </monetaryDetails> </monetaryInformation> </paymentData> <mopInformation> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardData> <creditCardDetails> <ccInfo> <vendorCode>VI</vendorCode> <cardNumber>4541099100010024</cardNumber> <securityId>123</securityId> <expiryDate>1019</expiryDate> </ccInfo> </creditCardDetails> </creditCardData> </mopInformation> <dummy></dummy> </paymentModule> </mopDescription> </fopGroup> </FOP\_CreateFormOfPayment>

## 5.25.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<FOP\_CreateFormOfPaymentReply xmlns="http://xml.amadeus.com/TFOPCR\_19\_2\_1A"> <fopDescription> <fopReference> <reference> <qualifier>FPT</qualifier> <number>54</number> </reference> </fopReference> <passengerAssociation> <passengerReference> <type>PAX</type> <value>1</value> </passengerReference> </passengerAssociation> <passengerAssociation> <passengerReference> <type>PAX</type> <value>2</value> </passengerReference> </passengerAssociation> <pnrElementAssociation> <referenceDetails> <type>TST</type> <value>1</value> </referenceDetails> </pnrElementAssociation> <pnrElementAssociation> <referenceDetails> <type>SEG</type> <value>1</value> </referenceDetails> </pnrElementAssociation> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>1</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>CASH</fopCode> <fopStatus>N</fopStatus> <fopEdiCode>CA</fopEdiCode> <fopElecTicketingCode>CA</fopElecTicketingCode> </fopDetails> </fopPNRDetails> <oldFopFreeflow> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>CASH</freeText> </oldFopFreeflow> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>S</criteriaSetType> <criteriaDetails> <attributeType>13</attributeType> <attributeDescription>1</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>D</criteriaSetType> <criteriaDetails> <attributeType>AMT</attributeType> <attributeDescription>20.00</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CUR</attributeType> <attributeDescription>EUR</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>FOPCODE</attributeType> <attributeDescription>CASH</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <dummy></dummy> </paymentModule> </mopDescription> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>2</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>VI</fopCode> <fopStatus>N</fopStatus> <fopEdiCode>CCVI</fopEdiCode> <fopReportingCode>CC</fopReportingCode> <fopElecTicketingCode>CC</fopElecTicketingCode> </fopDetails> </fopPNRDetails> <oldFopFreeflow> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>VIXXXXXXXXXXXX0016/1019/EUR40.00/AAPS1OK</freeText> </oldFopFreeflow> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>S</criteriaSetType> <criteriaDetails> <attributeType>13</attributeType> <attributeDescription>1</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>D</criteriaSetType> <criteriaDetails> <attributeType>IPN</attributeType> <attributeDescription>239727105</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>AMT</attributeType> <attributeDescription>40.00</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>1</attributeType> <attributeDescription>APS1OK</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CCNUM</attributeType> <attributeDescription>XXXXXXXXXXXX0016</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CUR</attributeType> <attributeDescription>EUR</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CCDTE1</attributeType> <attributeDescription>1019</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>FOPCODE</attributeType> <attributeDescription>VI</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>VENDORCODE</attributeType> <attributeDescription>VI</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <paymentData> <merchantInformation> <companyCode>AY</companyCode> </merchantInformation> <monetaryInformation> <monetaryDetails> <typeQualifier>AIR</typeQualifier> <amount>80.00</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>AUT</typeQualifier> <amount>40.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>I</typeQualifier> <amount>80.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>IPC</typeQualifier> <amount>80.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>IT</typeQualifier> <amount>160.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>ITC</typeQualifier> <amount>160.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>T</typeQualifier> <amount>80.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TPC</typeQualifier> <amount>80.00</amount> <currency>EUR</currency> </otherMonetaryDetails> </monetaryInformation> <paymentId> <referenceType>PRI</referenceType> <uniqueReference>239727105</uniqueReference> </paymentId> <fraudScreeningData> <fraudScreening> <statusInformation> <indicator>FRA</indicator> <action>N</action> </statusInformation> </fraudScreening> <payerPhoneOrEmail> <phoneOrEmailType>P</phoneOrEmailType> <telephoneNumberDetails> <telephoneNumber>3977-PAY</telephoneNumber> </telephoneNumberDetails> </payerPhoneOrEmail> </fraudScreeningData> </paymentData> <mopInformation> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardData> <creditCardDetails> <ccInfo> <vendorCode>VI</vendorCode> <cardNumber>XXXXXXXXXXXX0016</cardNumber> <expiryDate>1019</expiryDate> </ccInfo> </creditCardDetails> </creditCardData> </mopInformation> <dummy></dummy> <mopDetailedData> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardDetailedData> <authorisationSupplementaryData> <msgRef> <retrievalReferenceNumber>301715429458</retrievalReferenceNumber> <authorResponseCode>00</authorResponseCode> </msgRef> </authorisationSupplementaryData> <approvalDetails> <approvalCodeData> <approvalCode>APS1OK</approvalCode> <sourceOfApproval>A</sourceOfApproval> </approvalCodeData> </approvalDetails> <localDateTime> <businessSemantic>T</businessSemantic> <timeMode>L</timeMode> <dateTime> <year>2012</year> <month>9</month> <day>27</day> <hour>15</hour> <minutes>48</minutes> <seconds>4</seconds> </dateTime> </localDateTime> <authorisationInformation> <transactionDetails> <code>0110</code> <type>VI</type> <issueIndicator>N</issueIndicator> <transmissionControlNumber>429458</transmissionControlNumber> </transactionDetails> </authorisationInformation> </creditCardDetailedData> </mopDetailedData> </paymentModule> </mopDescription> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>3</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>VI</fopCode> <fopStatus>N</fopStatus> <fopEdiCode>CCVI</fopEdiCode> <fopReportingCode>CC</fopReportingCode> <fopElecTicketingCode>CC</fopElecTicketingCode> </fopDetails> </fopPNRDetails> <oldFopFreeflow> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>VIXXXXXXXXXXXX0024/1019/EUR20.00/AAPS1OK</freeText> </oldFopFreeflow> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>S</criteriaSetType> <criteriaDetails> <attributeType>13</attributeType> <attributeDescription>1</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>D</criteriaSetType> <criteriaDetails> <attributeType>IPN</attributeType> <attributeDescription>239728105</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>AMT</attributeType> <attributeDescription>20.00</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>1</attributeType> <attributeDescription>APS1OK</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CCNUM</attributeType> <attributeDescription>XXXXXXXXXXXX0024</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CUR</attributeType> <attributeDescription>EUR</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CCDTE1</attributeType> <attributeDescription>1019</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>FOPCODE</attributeType> <attributeDescription>VI</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>VENDORCODE</attributeType> <attributeDescription>VI</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <paymentData> <merchantInformation> <companyCode>AY</companyCode> </merchantInformation> <monetaryInformation> <monetaryDetails> <typeQualifier>S</typeQualifier> <amount>160.00</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>AUT</typeQualifier> <amount>20.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>I</typeQualifier> <amount>160.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>IPC</typeQualifier> <amount>160.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>IT</typeQualifier> <amount>160.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>ITC</typeQualifier> <amount>160.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>T</typeQualifier> <amount>80.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TPC</typeQualifier> <amount>80.00</amount> <currency>EUR</currency> </otherMonetaryDetails> </monetaryInformation> <paymentId> <referenceType>PRI</referenceType> <uniqueReference>239728105</uniqueReference> </paymentId> <fraudScreeningData> <fraudScreening> <statusInformation> <indicator>FRA</indicator> <action>N</action> </statusInformation> </fraudScreening> <payerPhoneOrEmail> <phoneOrEmailType>P</phoneOrEmailType> <telephoneNumberDetails> <telephoneNumber>3977-PAY</telephoneNumber> </telephoneNumberDetails> </payerPhoneOrEmail> </fraudScreeningData> </paymentData> <mopInformation> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardData> <creditCardDetails> <ccInfo> <vendorCode>VI</vendorCode> <cardNumber>XXXXXXXXXXXX0024</cardNumber> <expiryDate>1019</expiryDate> </ccInfo> </creditCardDetails> </creditCardData> </mopInformation> <dummy></dummy> <mopDetailedData> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardDetailedData> <authorisationSupplementaryData> <msgRef> <retrievalReferenceNumber>301715429459</retrievalReferenceNumber> <authorResponseCode>00</authorResponseCode> </msgRef> </authorisationSupplementaryData> <approvalDetails> <approvalCodeData> <approvalCode>APS1OK</approvalCode> <sourceOfApproval>A</sourceOfApproval> </approvalCodeData> </approvalDetails> <localDateTime> <businessSemantic>T</businessSemantic> <timeMode>L</timeMode> <dateTime> <year>2012</year> <month>9</month> <day>27</day> <hour>15</hour> <minutes>48</minutes> <seconds>4</seconds> </dateTime> </localDateTime> <authorisationInformation> <transactionDetails> <code>0110</code> <type>VI</type> <issueIndicator>S</issueIndicator> <transmissionControlNumber>429459</transmissionControlNumber> </transactionDetails> </authorisationInformation> </creditCardDetailedData> </mopDetailedData> </paymentModule> </mopDescription> </fopDescription> </FOP\_CreateFormOfPaymentReply>

## 5.25.3 Possible Errors

See "Error Messages" section.

* * *

## 5.26 Operation: Multiple TST -TSM

Query to create an FP element on several TSM.

## 5.26.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<FOP\_CreateFormOfPayment xmlns="http://xml.amadeus.com/TFOPCQ\_19\_2\_1A"> <transactionContext> <transactionDetails> <code>DEF</code> </transactionDetails> </transactionContext> <fopGroup> <fopReference></fopReference> <passengerAssociation> <passengerReference> <type>PAX</type> <value>1</value> </passengerReference> </passengerAssociation> <pnrElementAssociation> <referenceDetails> <type>TSM</type> <value>1</value> </referenceDetails> </pnrElementAssociation> <pnrElementAssociation> <referenceDetails> <type>TSM</type> <value>2</value> </referenceDetails> </pnrElementAssociation> <pnrElementAssociation> <referenceDetails> <type>SEG</type> <value>1</value> </referenceDetails> </pnrElementAssociation> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>1</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>CASH</fopCode> </fopDetails> </fopPNRDetails> </mopDetails> </mopDescription> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>2</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>VI</fopCode> </fopDetails> </fopPNRDetails> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <paymentData> <merchantInformation> <companyCode>AY</companyCode> </merchantInformation> <monetaryInformation> <monetaryDetails> <typeQualifier>712</typeQualifier> <amount>40</amount> <currency>EUR</currency> </monetaryDetails> </monetaryInformation> </paymentData> <mopInformation> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardData> <creditCardDetails> <ccInfo> <vendorCode>VI</vendorCode> <cardNumber>4541099100010016</cardNumber> <expiryDate>0919</expiryDate> </ccInfo> </creditCardDetails> </creditCardData> </mopInformation> <dummy></dummy> </paymentModule> </mopDescription> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>3</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>VI</fopCode> </fopDetails> </fopPNRDetails> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <paymentData> <merchantInformation> <companyCode>AY</companyCode> </merchantInformation> <monetaryInformation> <monetaryDetails> <typeQualifier>712</typeQualifier> <amount>20</amount> <currency>EUR</currency> </monetaryDetails> </monetaryInformation> </paymentData> <mopInformation> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardData> <creditCardDetails> <ccInfo> <vendorCode>VI</vendorCode> <cardNumber>4541099100010024</cardNumber> <expiryDate>0919</expiryDate> </ccInfo> </creditCardDetails> </creditCardData> </mopInformation> <dummy></dummy> </paymentModule> </mopDescription> </fopGroup> </FOP\_CreateFormOfPayment>

## 5.26.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<FOP\_CreateFormOfPaymentReply xmlns="http://xml.amadeus.com/TFOPCR\_19\_2\_1A"> <fopDescription> <fopReference> <reference> <qualifier>FPT</qualifier> <number>20</number> </reference> </fopReference> <pnrElementAssociation> <referenceDetails> <type>MCO</type> <value>20</value> </referenceDetails> </pnrElementAssociation> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>1</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>CASH</fopCode> <fopStatus>N</fopStatus> <fopEdiCode>CA</fopEdiCode> <fopElecTicketingCode>CA</fopElecTicketingCode> </fopDetails> </fopPNRDetails> <oldFopFreeflow> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>CASH</freeText> </oldFopFreeflow> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>S</criteriaSetType> <criteriaDetails> <attributeType>13</attributeType> <attributeDescription>1</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>D</criteriaSetType> <criteriaDetails> <attributeType>AMT</attributeType> <attributeDescription>20.00</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CUR</attributeType> <attributeDescription>EUR</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>FOPCODE</attributeType> <attributeDescription>CASH</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <dummy></dummy> </paymentModule> </mopDescription> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>2</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>VI</fopCode> <fopStatus>N</fopStatus> <fopEdiCode>CCVI</fopEdiCode> <fopReportingCode>CC</fopReportingCode> <fopElecTicketingCode>CC</fopElecTicketingCode> </fopDetails> </fopPNRDetails> <oldFopFreeflow> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>VIXXXXXXXXXXXX0016/0919/EUR40.00/AAPS1OK</freeText> </oldFopFreeflow> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>S</criteriaSetType> <criteriaDetails> <attributeType>13</attributeType> <attributeDescription>1</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>D</criteriaSetType> <criteriaDetails> <attributeType>AVS</attributeType> <attributeDescription>Y</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>IPN</attributeType> <attributeDescription>242568105</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>AMT</attributeType> <attributeDescription>40.00</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>1</attributeType> <attributeDescription>APS1OK</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CCNUM</attributeType> <attributeDescription>XXXXXXXXXXXX0016</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CUR</attributeType> <attributeDescription>EUR</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CCDTE1</attributeType> <attributeDescription>0919</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>FOPCODE</attributeType> <attributeDescription>VI</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>VENDORCODE</attributeType> <attributeDescription>VI</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <paymentData> <merchantInformation> <companyCode>AY</companyCode> </merchantInformation> <monetaryInformation> <monetaryDetails> <typeQualifier>S</typeQualifier> <amount>120.00</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>AUT</typeQualifier> <amount>40.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>I</typeQualifier> <amount>120.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>IPC</typeQualifier> <amount>120.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>IT</typeQualifier> <amount>80.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>ITC</typeQualifier> <amount>80.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>T</typeQualifier> <amount>80.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TPC</typeQualifier> <amount>80.00</amount> <currency>EUR</currency> </otherMonetaryDetails> </monetaryInformation> <paymentId> <referenceType>PRI</referenceType> <uniqueReference>242568105</uniqueReference> </paymentId> <fraudScreeningData> <fraudScreening> <statusInformation> <indicator>FRA</indicator> <action>N</action> </statusInformation> </fraudScreening> <payerPhoneOrEmail> <phoneOrEmailType>P</phoneOrEmailType> <telephoneNumberDetails> <telephoneNumber>3977-PAY</telephoneNumber> </telephoneNumberDetails> </payerPhoneOrEmail> </fraudScreeningData> </paymentData> <mopInformation> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardData> <creditCardDetails> <ccInfo> <vendorCode>VI</vendorCode> <cardNumber>XXXXXXXXXXXX0016</cardNumber> <expiryDate>0919</expiryDate> </ccInfo> </creditCardDetails> </creditCardData> </mopInformation> <dummy></dummy> <mopDetailedData> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardDetailedData> <authorisationSupplementaryData> <msgRef> <retrievalReferenceNumber>303017445334</retrievalReferenceNumber> <authorResponseCode>00</authorResponseCode> </msgRef> </authorisationSupplementaryData> <approvalDetails> <approvalCodeData> <approvalCode>APS1OK</approvalCode> <sourceOfApproval>A</sourceOfApproval> </approvalCodeData> </approvalDetails> <localDateTime> <businessSemantic>T</businessSemantic> <timeMode>L</timeMode> <dateTime> <year>2012</year> <month>10</month> <day>10</day> <hour>17</hour> <minutes>13</minutes> <seconds>26</seconds> </dateTime> </localDateTime> <authorisationInformation> <transactionDetails> <code>0110</code> <type>VI</type> <issueIndicator>S</issueIndicator> <transmissionControlNumber>445334</transmissionControlNumber> </transactionDetails> </authorisationInformation> </creditCardDetailedData> </mopDetailedData> </paymentModule> </mopDescription> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>3</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>VI</fopCode> <fopStatus>N</fopStatus> <fopEdiCode>CCVI</fopEdiCode> <fopReportingCode>CC</fopReportingCode> <fopElecTicketingCode>CC</fopElecTicketingCode> </fopDetails> </fopPNRDetails> <oldFopFreeflow> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>VIXXXXXXXXXXXX0024/0919/EUR20.00/AAPS1OK</freeText> </oldFopFreeflow> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>S</criteriaSetType> <criteriaDetails> <attributeType>13</attributeType> <attributeDescription>1</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>D</criteriaSetType> <criteriaDetails> <attributeType>AVS</attributeType> <attributeDescription>Y</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>IPN</attributeType> <attributeDescription>242569105</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>AMT</attributeType> <attributeDescription>20.00</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>1</attributeType> <attributeDescription>APS1OK</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CCNUM</attributeType> <attributeDescription>XXXXXXXXXXXX0024</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CUR</attributeType> <attributeDescription>EUR</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CCDTE1</attributeType> <attributeDescription>0919</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>FOPCODE</attributeType> <attributeDescription>VI</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>VENDORCODE</attributeType> <attributeDescription>VI</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <paymentData> <merchantInformation> <companyCode>AY</companyCode> </merchantInformation> <monetaryInformation> <monetaryDetails> <typeQualifier>S</typeQualifier> <amount>60.00</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>AUT</typeQualifier> <amount>20.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>I</typeQualifier> <amount>60.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>IPC</typeQualifier> <amount>60.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>IT</typeQualifier> <amount>80.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>ITC</typeQualifier> <amount>80.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>T</typeQualifier> <amount>80.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TPC</typeQualifier> <amount>80.00</amount> <currency>EUR</currency> </otherMonetaryDetails> </monetaryInformation> <paymentId> <referenceType>PRI</referenceType> <uniqueReference>242569105</uniqueReference> </paymentId> <fraudScreeningData> <fraudScreening> <statusInformation> <indicator>FRA</indicator> <action>N</action> </statusInformation> </fraudScreening> <payerPhoneOrEmail> <phoneOrEmailType>P</phoneOrEmailType> <telephoneNumberDetails> <telephoneNumber>3977-PAY</telephoneNumber> </telephoneNumberDetails> </payerPhoneOrEmail> </fraudScreeningData> </paymentData> <mopInformation> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardData> <creditCardDetails> <ccInfo> <vendorCode>VI</vendorCode> <cardNumber>XXXXXXXXXXXX0024</cardNumber> <expiryDate>0919</expiryDate> </ccInfo> </creditCardDetails> </creditCardData> </mopInformation> <dummy></dummy> <mopDetailedData> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardDetailedData> <authorisationSupplementaryData> <msgRef> <retrievalReferenceNumber>303017445335</retrievalReferenceNumber> <authorResponseCode>00</authorResponseCode> </msgRef> </authorisationSupplementaryData> <approvalDetails> <approvalCodeData> <approvalCode>APS1OK</approvalCode> <sourceOfApproval>A</sourceOfApproval> </approvalCodeData> </approvalDetails> <localDateTime> <businessSemantic>T</businessSemantic> <timeMode>L</timeMode> <dateTime> <year>2012</year> <month>10</month> <day>10</day> <hour>17</hour> <minutes>13</minutes> <seconds>26</seconds> </dateTime> </localDateTime> <authorisationInformation> <transactionDetails> <code>0110</code> <type>VI</type> <issueIndicator>S</issueIndicator> <transmissionControlNumber>445335</transmissionControlNumber> </transactionDetails> </authorisationInformation> </creditCardDetailedData> </mopDetailedData> </paymentModule> </mopDescription> </fopDescription> <fopDescription> <fopReference> <reference> <qualifier>FPT</qualifier> <number>30</number> </reference> </fopReference> <pnrElementAssociation> <referenceDetails> <type>MCO</type> <value>30</value> </referenceDetails> </pnrElementAssociation> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>1</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>CASH</fopCode> <fopStatus>N</fopStatus> <fopEdiCode>CA</fopEdiCode> <fopElecTicketingCode>CA</fopElecTicketingCode> </fopDetails> </fopPNRDetails> <oldFopFreeflow> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>CASH</freeText> </oldFopFreeflow> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>S</criteriaSetType> <criteriaDetails> <attributeType>13</attributeType> <attributeDescription>1</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>D</criteriaSetType> <criteriaDetails> <attributeType>AMT</attributeType> <attributeDescription>20.00</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CUR</attributeType> <attributeDescription>EUR</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>FOPCODE</attributeType> <attributeDescription>CASH</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <dummy></dummy> </paymentModule> </mopDescription> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>2</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>VI</fopCode> <fopStatus>N</fopStatus> <fopEdiCode>CCVI</fopEdiCode> <fopReportingCode>CC</fopReportingCode> <fopElecTicketingCode>CC</fopElecTicketingCode> </fopDetails> </fopPNRDetails> <oldFopFreeflow> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>VIXXXXXXXXXXXX0016/0919/EUR40.00/AAPS1OK</freeText> </oldFopFreeflow> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>S</criteriaSetType> <criteriaDetails> <attributeType>13</attributeType> <attributeDescription>1</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>D</criteriaSetType> <criteriaDetails> <attributeType>AVS</attributeType> <attributeDescription>Y</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>IPN</attributeType> <attributeDescription>242568105</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>AMT</attributeType> <attributeDescription>40.00</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>1</attributeType> <attributeDescription>APS1OK</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CCNUM</attributeType> <attributeDescription>XXXXXXXXXXXX0016</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CUR</attributeType> <attributeDescription>EUR</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CCDTE1</attributeType> <attributeDescription>0919</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>FOPCODE</attributeType> <attributeDescription>VI</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>VENDORCODE</attributeType> <attributeDescription>VI</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <paymentData> <merchantInformation> <companyCode>AY</companyCode> </merchantInformation> <monetaryInformation> <monetaryDetails> <typeQualifier>S</typeQualifier> <amount>120.00</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>AUT</typeQualifier> <amount>40.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>I</typeQualifier> <amount>120.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>IPC</typeQualifier> <amount>120.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>IT</typeQualifier> <amount>80.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>ITC</typeQualifier> <amount>80.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>T</typeQualifier> <amount>80.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TPC</typeQualifier> <amount>80.00</amount> <currency>EUR</currency> </otherMonetaryDetails> </monetaryInformation> <paymentId> <referenceType>PRI</referenceType> <uniqueReference>242568105</uniqueReference> </paymentId> <fraudScreeningData> <fraudScreening> <statusInformation> <indicator>FRA</indicator> <action>N</action> </statusInformation> </fraudScreening> <payerPhoneOrEmail> <phoneOrEmailType>P</phoneOrEmailType> <telephoneNumberDetails> <telephoneNumber>3977-PAY</telephoneNumber> </telephoneNumberDetails> </payerPhoneOrEmail> </fraudScreeningData> </paymentData> <mopInformation> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardData> <creditCardDetails> <ccInfo> <vendorCode>VI</vendorCode> <cardNumber>XXXXXXXXXXXX0016</cardNumber> <expiryDate>0919</expiryDate> </ccInfo> </creditCardDetails> </creditCardData> </mopInformation> <dummy></dummy> <mopDetailedData> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardDetailedData> <authorisationSupplementaryData> <msgRef> <retrievalReferenceNumber>303017445334</retrievalReferenceNumber> <authorResponseCode>00</authorResponseCode> </msgRef> </authorisationSupplementaryData> <approvalDetails> <approvalCodeData> <approvalCode>APS1OK</approvalCode> <sourceOfApproval>A</sourceOfApproval> </approvalCodeData> </approvalDetails> <localDateTime> <businessSemantic>T</businessSemantic> <timeMode>L</timeMode> <dateTime> <year>2012</year> <month>10</month> <day>10</day> <hour>17</hour> <minutes>13</minutes> <seconds>26</seconds> </dateTime> </localDateTime> <authorisationInformation> <transactionDetails> <code>0110</code> <type>VI</type> <issueIndicator>S</issueIndicator> <transmissionControlNumber>445334</transmissionControlNumber> </transactionDetails> </authorisationInformation> </creditCardDetailedData> </mopDetailedData> </paymentModule> </mopDescription> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>3</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>VI</fopCode> <fopStatus>N</fopStatus> <fopEdiCode>CCVI</fopEdiCode> <fopReportingCode>CC</fopReportingCode> <fopElecTicketingCode>CC</fopElecTicketingCode> </fopDetails> </fopPNRDetails> <oldFopFreeflow> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>VIXXXXXXXXXXXX0024/0919/EUR20.00/AAPS1OK</freeText> </oldFopFreeflow> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>S</criteriaSetType> <criteriaDetails> <attributeType>13</attributeType> <attributeDescription>1</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>D</criteriaSetType> <criteriaDetails> <attributeType>AVS</attributeType> <attributeDescription>Y</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>IPN</attributeType> <attributeDescription>242569105</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>AMT</attributeType> <attributeDescription>20.00</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>1</attributeType> <attributeDescription>APS1OK</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CCNUM</attributeType> <attributeDescription>XXXXXXXXXXXX0024</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CUR</attributeType> <attributeDescription>EUR</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CCDTE1</attributeType> <attributeDescription>0919</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>FOPCODE</attributeType> <attributeDescription>VI</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>VENDORCODE</attributeType> <attributeDescription>VI</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <paymentData> <merchantInformation> <companyCode>AY</companyCode> </merchantInformation> <monetaryInformation> <monetaryDetails> <typeQualifier>S</typeQualifier> <amount>60.00</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>AUT</typeQualifier> <amount>20.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>I</typeQualifier> <amount>60.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>IPC</typeQualifier> <amount>60.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>IT</typeQualifier> <amount>80.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>ITC</typeQualifier> <amount>80.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>T</typeQualifier> <amount>80.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TPC</typeQualifier> <amount>80.00</amount> <currency>EUR</currency> </otherMonetaryDetails> </monetaryInformation> <paymentId> <referenceType>PRI</referenceType> <uniqueReference>242569105</uniqueReference> </paymentId> <fraudScreeningData> <fraudScreening> <statusInformation> <indicator>FRA</indicator> <action>N</action> </statusInformation> </fraudScreening> <payerPhoneOrEmail> <phoneOrEmailType>P</phoneOrEmailType> <telephoneNumberDetails> <telephoneNumber>3977-PAY</telephoneNumber> </telephoneNumberDetails> </payerPhoneOrEmail> </fraudScreeningData> </paymentData> <mopInformation> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardData> <creditCardDetails> <ccInfo> <vendorCode>VI</vendorCode> <cardNumber>XXXXXXXXXXXX0024</cardNumber> <expiryDate>0919</expiryDate> </ccInfo> </creditCardDetails> </creditCardData> </mopInformation> <dummy></dummy> <mopDetailedData> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardDetailedData> <authorisationSupplementaryData> <msgRef> <retrievalReferenceNumber>303017445335</retrievalReferenceNumber> <authorResponseCode>00</authorResponseCode> </msgRef> </authorisationSupplementaryData> <approvalDetails> <approvalCodeData> <approvalCode>APS1OK</approvalCode> <sourceOfApproval>A</sourceOfApproval> </approvalCodeData> </approvalDetails> <localDateTime> <businessSemantic>T</businessSemantic> <timeMode>L</timeMode> <dateTime> <year>2012</year> <month>10</month> <day>10</day> <hour>17</hour> <minutes>13</minutes> <seconds>26</seconds> </dateTime> </localDateTime> <authorisationInformation> <transactionDetails> <code>0110</code> <type>VI</type> <issueIndicator>S</issueIndicator> <transmissionControlNumber>445335</transmissionControlNumber> </transactionDetails> </authorisationInformation> </creditCardDetailedData> </mopDetailedData> </paymentModule> </mopDescription> </fopDescription> <fopDescription> <fopReference> <reference> <qualifier>FPT</qualifier> <number>51</number> </reference> </fopReference> <passengerAssociation> <passengerReference> <type>PAX</type> <value>1</value> </passengerReference> </passengerAssociation> <pnrElementAssociation> <referenceDetails> <type>SEG</type> <value>1</value> </referenceDetails> </pnrElementAssociation> <pnrElementAssociation> <referenceDetails> <type>TST</type> <value>1</value> </referenceDetails> </pnrElementAssociation> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>1</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>CASH</fopCode> <fopStatus>N</fopStatus> <fopEdiCode>CA</fopEdiCode> <fopElecTicketingCode>CA</fopElecTicketingCode> </fopDetails> </fopPNRDetails> <oldFopFreeflow> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>CASH</freeText> </oldFopFreeflow> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>S</criteriaSetType> <criteriaDetails> <attributeType>13</attributeType> <attributeDescription>1</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>D</criteriaSetType> <criteriaDetails> <attributeType>AMT</attributeType> <attributeDescription>-10.00</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CUR</attributeType> <attributeDescription>EUR</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>FOPCODE</attributeType> <attributeDescription>CASH</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <dummy></dummy> </paymentModule> </mopDescription> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>2</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>VI</fopCode> <fopStatus>N</fopStatus> <fopEdiCode>CCVI</fopEdiCode> <fopReportingCode>CC</fopReportingCode> <fopElecTicketingCode>CC</fopElecTicketingCode> </fopDetails> </fopPNRDetails> <oldFopFreeflow> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>VIXXXXXXXXXXXX0016/0919/EUR40.00/AAPS1OK</freeText> </oldFopFreeflow> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>S</criteriaSetType> <criteriaDetails> <attributeType>13</attributeType> <attributeDescription>1</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>D</criteriaSetType> <criteriaDetails> <attributeType>AVS</attributeType> <attributeDescription>Y</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>IPN</attributeType> <attributeDescription>242568105</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>AMT</attributeType> <attributeDescription>40.00</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>1</attributeType> <attributeDescription>APS1OK</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CCNUM</attributeType> <attributeDescription>XXXXXXXXXXXX0016</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CUR</attributeType> <attributeDescription>EUR</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CCDTE1</attributeType> <attributeDescription>0919</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>FOPCODE</attributeType> <attributeDescription>VI</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>VENDORCODE</attributeType> <attributeDescription>VI</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <paymentData> <merchantInformation> <companyCode>AY</companyCode> </merchantInformation> <monetaryInformation> <monetaryDetails> <typeQualifier>S</typeQualifier> <amount>120.00</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>AUT</typeQualifier> <amount>40.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>I</typeQualifier> <amount>120.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>IPC</typeQualifier> <amount>120.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>IT</typeQualifier> <amount>50.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>ITC</typeQualifier> <amount>50.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>T</typeQualifier> <amount>50.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TPC</typeQualifier> <amount>50.00</amount> <currency>EUR</currency> </otherMonetaryDetails> </monetaryInformation> <paymentId> <referenceType>PRI</referenceType> <uniqueReference>242568105</uniqueReference> </paymentId> <fraudScreeningData> <fraudScreening> <statusInformation> <indicator>FRA</indicator> <action>N</action> </statusInformation> </fraudScreening> <payerPhoneOrEmail> <phoneOrEmailType>P</phoneOrEmailType> <telephoneNumberDetails> <telephoneNumber>3977-PAY</telephoneNumber> </telephoneNumberDetails> </payerPhoneOrEmail> </fraudScreeningData> </paymentData> <mopInformation> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardData> <creditCardDetails> <ccInfo> <vendorCode>VI</vendorCode> <cardNumber>XXXXXXXXXXXX0016</cardNumber> <expiryDate>0919</expiryDate> </ccInfo> </creditCardDetails> </creditCardData> </mopInformation> <dummy></dummy> <mopDetailedData> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardDetailedData> <authorisationSupplementaryData> <msgRef> <retrievalReferenceNumber>303017445334</retrievalReferenceNumber> <authorResponseCode>00</authorResponseCode> </msgRef> </authorisationSupplementaryData> <approvalDetails> <approvalCodeData> <approvalCode>APS1OK</approvalCode> <sourceOfApproval>A</sourceOfApproval> </approvalCodeData> </approvalDetails> <localDateTime> <businessSemantic>T</businessSemantic> <timeMode>L</timeMode> <dateTime> <year>2012</year> <month>10</month> <day>10</day> <hour>17</hour> <minutes>13</minutes> <seconds>26</seconds> </dateTime> </localDateTime> <authorisationInformation> <transactionDetails> <code>0110</code> <type>VI</type> <issueIndicator>S</issueIndicator> <transmissionControlNumber>445334</transmissionControlNumber> </transactionDetails> </authorisationInformation> </creditCardDetailedData> </mopDetailedData> </paymentModule> </mopDescription> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>3</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>VI</fopCode> <fopStatus>N</fopStatus> <fopEdiCode>CCVI</fopEdiCode> <fopReportingCode>CC</fopReportingCode> <fopElecTicketingCode>CC</fopElecTicketingCode> </fopDetails> </fopPNRDetails> <oldFopFreeflow> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>VIXXXXXXXXXXXX0024/0919/EUR20.00/AAPS1OK</freeText> </oldFopFreeflow> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>S</criteriaSetType> <criteriaDetails> <attributeType>13</attributeType> <attributeDescription>1</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>D</criteriaSetType> <criteriaDetails> <attributeType>AVS</attributeType> <attributeDescription>Y</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>IPN</attributeType> <attributeDescription>242569105</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>AMT</attributeType> <attributeDescription>20.00</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>1</attributeType> <attributeDescription>APS1OK</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CCNUM</attributeType> <attributeDescription>XXXXXXXXXXXX0024</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CUR</attributeType> <attributeDescription>EUR</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CCDTE1</attributeType> <attributeDescription>0919</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>FOPCODE</attributeType> <attributeDescription>VI</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>VENDORCODE</attributeType> <attributeDescription>VI</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <paymentData> <merchantInformation> <companyCode>AY</companyCode> </merchantInformation> <monetaryInformation> <monetaryDetails> <typeQualifier>S</typeQualifier> <amount>60.00</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>AUT</typeQualifier> <amount>20.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>I</typeQualifier> <amount>60.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>IPC</typeQualifier> <amount>60.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>IT</typeQualifier> <amount>50.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>ITC</typeQualifier> <amount>50.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>T</typeQualifier> <amount>50.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TPC</typeQualifier> <amount>50.00</amount> <currency>EUR</currency> </otherMonetaryDetails> </monetaryInformation> <paymentId> <referenceType>PRI</referenceType> <uniqueReference>242569105</uniqueReference> </paymentId> <fraudScreeningData> <fraudScreening> <statusInformation> <indicator>FRA</indicator> <action>N</action> </statusInformation> </fraudScreening> <payerPhoneOrEmail> <phoneOrEmailType>P</phoneOrEmailType> <telephoneNumberDetails> <telephoneNumber>3977-PAY</telephoneNumber> </telephoneNumberDetails> </payerPhoneOrEmail> </fraudScreeningData> </paymentData> <mopInformation> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardData> <creditCardDetails> <ccInfo> <vendorCode>VI</vendorCode> <cardNumber>XXXXXXXXXXXX0024</cardNumber> <expiryDate>0919</expiryDate> </ccInfo> </creditCardDetails> </creditCardData> </mopInformation> <dummy></dummy> <mopDetailedData> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardDetailedData> <authorisationSupplementaryData> <msgRef> <retrievalReferenceNumber>303017445335</retrievalReferenceNumber> <authorResponseCode>00</authorResponseCode> </msgRef> </authorisationSupplementaryData> <approvalDetails> <approvalCodeData> <approvalCode>APS1OK</approvalCode> <sourceOfApproval>A</sourceOfApproval> </approvalCodeData> </approvalDetails> <localDateTime> <businessSemantic>T</businessSemantic> <timeMode>L</timeMode> <dateTime> <year>2012</year> <month>10</month> <day>10</day> <hour>17</hour> <minutes>13</minutes> <seconds>26</seconds> </dateTime> </localDateTime> <authorisationInformation> <transactionDetails> <code>0110</code> <type>VI</type> <issueIndicator>S</issueIndicator> <transmissionControlNumber>445335</transmissionControlNumber> </transactionDetails> </authorisationInformation> </creditCardDetailedData> </mopDetailedData> </paymentModule> </mopDescription> </fopDescription> </FOP\_CreateFormOfPaymentReply>

## 5.26.3 Possible Errors

See "Error Messages" section.

* * *

## 5.27 Operation: Negotiated fare

Herafter is an example to add the following FP line:

FP PAX NR+CASH/EUR15

## 5.27.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<FOP\_CreateFormOfPayment xmlns="http://xml.amadeus.com/TFOPCQ\_19\_2\_1A"> <transactionContext> <transactionDetails> <code>DEF</code> </transactionDetails> </transactionContext> <fopGroup> <fopReference></fopReference> <pnrElementAssociation> <referenceDetails> <type>TST</type> <value>1</value> </referenceDetails> </pnrElementAssociation> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>1</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>NR</fopCode> </fopDetails> </fopPNRDetails> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <dummy></dummy> </paymentModule> </mopDescription> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>2</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>CASH</fopCode> </fopDetails> </fopPNRDetails> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <paymentData> <merchantInformation> <companyCode>AB</companyCode> </merchantInformation> <monetaryInformation> <monetaryDetails> <typeQualifier>712</typeQualifier> <amount>15</amount> <currency>EUR</currency> </monetaryDetails> </monetaryInformation> </paymentData> <dummy></dummy> </paymentModule> </mopDescription> </fopGroup> </FOP\_CreateFormOfPayment>

## 5.27.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<FOP\_CreateFormOfPaymentReply xmlns="http://xml.amadeus.com/TFOPCR\_19\_2\_1A"> <fopDescription> <fopReference> <reference> <qualifier>FPT</qualifier> <number>24</number> </reference> </fopReference> <passengerAssociation> <passengerReference> <type>PAX</type> <value>1</value> </passengerReference> </passengerAssociation> <pnrElementAssociation> <referenceDetails> <type>TST</type> <value>1</value> </referenceDetails> </pnrElementAssociation> <pnrElementAssociation> <referenceDetails> <type>SEG</type> <value>1</value> </referenceDetails> </pnrElementAssociation> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>1</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>NR</fopCode> <fopStatus>N</fopStatus> <fopReportingCode>NR</fopReportingCode> <fopElecTicketingCode>MS</fopElecTicketingCode> </fopDetails> </fopPNRDetails> <oldFopFreeflow> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>NR</freeText> </oldFopFreeflow> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>S</criteriaSetType> <criteriaDetails> <attributeType>11</attributeType> <attributeDescription>1</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>12</attributeType> <attributeDescription>1</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>38</attributeType> <attributeDescription>1</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>D</criteriaSetType> <criteriaDetails> <attributeType>CUR</attributeType> <attributeDescription>EUR</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>FOPCODE</attributeType> <attributeDescription>NR</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <dummy></dummy> </paymentModule> </mopDescription> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>2</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>CASH</fopCode> <fopStatus>N</fopStatus> <fopEdiCode>CA</fopEdiCode> <fopElecTicketingCode>CA</fopElecTicketingCode> </fopDetails> </fopPNRDetails> <oldFopFreeflow> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>CASH/EUR15</freeText> </oldFopFreeflow> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>S</criteriaSetType> <criteriaDetails> <attributeType>13</attributeType> <attributeDescription>1</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>D</criteriaSetType> <criteriaDetails> <attributeType>AMT</attributeType> <attributeDescription>15</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CUR</attributeType> <attributeDescription>EUR</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>FOPCODE</attributeType> <attributeDescription>CASH</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <paymentData> <merchantInformation> <companyCode>AB</companyCode> </merchantInformation> </paymentData> <dummy></dummy> </paymentModule> </mopDescription> </fopDescription> </FOP\_CreateFormOfPaymentReply>

## 5.27.3 Possible Errors

See "Error Messages" section.

* * *

## 5.28 Operation: OB Fees computation

Query to trigger OB fee calculation with Pricing options.

## 5.28.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<FOP\_CreateFormOfPayment xmlns="http://xml.amadeus.com/TFOPCQ\_19\_2\_1A"> <transactionContext> <transactionDetails> <code>DEF</code> <issueIndicator>O</issueIndicator> </transactionDetails> </transactionContext> <fopGroup> <fopReference></fopReference> <pricingTicketingDetails> <productDateTimeDetails> <departureDate>120414</departureDate> </productDateTimeDetails> <locationDetails> <city>NCE</city> </locationDetails> </pricingTicketingDetails> <feeTypeInfo> <selectionDetails> <option>OB</option> <optionInformation>EX</optionInformation> </selectionDetails> </feeTypeInfo> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>1</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>CCVI</fopCode> </fopDetails> </fopPNRDetails> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <paymentData> <merchantInformation> <companyCode>AY</companyCode> </merchantInformation> </paymentData> <mopInformation> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardData> <creditCardDetails> <ccInfo> <vendorCode>VI</vendorCode> <cardNumber>4541099100010016</cardNumber> <expiryDate>0915</expiryDate> </ccInfo> </creditCardDetails> </creditCardData> </mopInformation> <dummy></dummy> </paymentModule> </mopDescription> </fopGroup> </FOP\_CreateFormOfPayment>

## 5.28.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<FOP\_CreateFormOfPaymentReply xmlns="http://xml.amadeus.com/TFOPCR\_19\_2\_1A"> <fopDescription> <fopReference> <reference> <qualifier>FPT</qualifier> <number>13</number> </reference> </fopReference> <passengerAssociation> <passengerReference> <type>PAX</type> <value>1</value> </passengerReference> </passengerAssociation> <pnrElementAssociation> <referenceDetails> <type>SEG</type> <value>1</value> </referenceDetails> </pnrElementAssociation> <pnrElementAssociation> <referenceDetails> <type>TST</type> <value>1</value> </referenceDetails> </pnrElementAssociation> <additionalMonetaryData> <attributeDetails> <attributeType>OBF</attributeType> </attributeDetails> </additionalMonetaryData> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>1</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>VI</fopCode> <fopStatus>N</fopStatus> <fopEdiCode>CCVI</fopEdiCode> <fopReportingCode>CC</fopReportingCode> <fopElecTicketingCode>CC</fopElecTicketingCode> </fopDetails> </fopPNRDetails> <oldFopFreeflow> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>VIXXXXXXXXXXXX0016/0915/AAPS1OK</freeText> </oldFopFreeflow> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>S</criteriaSetType> <criteriaDetails> <attributeType>13</attributeType> <attributeDescription>1</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>D</criteriaSetType> <criteriaDetails> <attributeType>AVS</attributeType> <attributeDescription>Y</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>IPN</attributeType> <attributeDescription>370592105</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>LNK</attributeType> <attributeDescription>VI</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>VAS</attributeType> <attributeDescription>5</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>AMT</attributeType> <attributeDescription>20.00</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>1</attributeType> <attributeDescription>APS1OK</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CCNUM</attributeType> <attributeDescription>XXXXXXXXXXXX0016</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CUR</attributeType> <attributeDescription>EUR</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CCDTE1</attributeType> <attributeDescription>0915</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>FOPCODE</attributeType> <attributeDescription>VI</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>VENDORCODE</attributeType> <attributeDescription>VI</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <paymentData> <merchantInformation> <companyCode>AY</companyCode> </merchantInformation> <monetaryInformation> <monetaryDetails> <typeQualifier>AIR</typeQualifier> <amount>25.00</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>OB</typeQualifier> <amount>5.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>AUT</typeQualifier> <amount>25.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>I</typeQualifier> <amount>25.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>IPC</typeQualifier> <amount>20.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>IT</typeQualifier> <amount>20.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>ITC</typeQualifier> <amount>20.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>T</typeQualifier> <amount>20.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TPC</typeQualifier> <amount>20.00</amount> <currency>EUR</currency> </otherMonetaryDetails> </monetaryInformation> <paymentId> <referenceType>PRI</referenceType> <uniqueReference>370592105</uniqueReference> </paymentId> <fraudScreeningData> <fraudScreening> <statusInformation> <indicator>FRA</indicator> <action>N</action> </statusInformation> </fraudScreening> <payerPhoneOrEmail> <phoneOrEmailType>P</phoneOrEmailType> <telephoneNumberDetails> <telephoneNumber>3977-PAY</telephoneNumber> </telephoneNumberDetails> </payerPhoneOrEmail> </fraudScreeningData> </paymentData> <mopInformation> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardData> <creditCardDetails> <ccInfo> <vendorCode>VI</vendorCode> <cardNumber>XXXXXXXXXXXX0016</cardNumber> <expiryDate>0915</expiryDate> </ccInfo> </creditCardDetails> </creditCardData> </mopInformation> <dummy></dummy> <mopDetailedData> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardDetailedData> <authorisationSupplementaryData> <msgRef> <retrievalReferenceNumber>334716124610</retrievalReferenceNumber> <authorResponseCode>00</authorResponseCode> </msgRef> </authorisationSupplementaryData> <approvalDetails> <approvalCodeData> <approvalCode>APS1OK</approvalCode> <sourceOfApproval>A</sourceOfApproval> </approvalCodeData> </approvalDetails> <localDateTime> <businessSemantic>L</businessSemantic> <dateTime> <year>2013</year> <month>12</month> <day>13</day> <hour>18</hour> <minutes>36</minutes> <seconds>36</seconds> </dateTime> </localDateTime> <localDateTime> <businessSemantic>T</businessSemantic> <timeMode>L</timeMode> <dateTime> <year>2013</year> <month>9</month> <day>27</day> <hour>16</hour> <minutes>36</minutes> <seconds>36</seconds> </dateTime> </localDateTime> <authorisationInformation> <transactionDetails> <code>0110</code> <type>VI</type> <issueIndicator>N</issueIndicator> <transmissionControlNumber>124610</transmissionControlNumber> </transactionDetails> </authorisationInformation> <transactionStatus> <errorOrWarningCodeDetails> <errorDetails> <errorCode>Y</errorCode> <errorCategory>AVS</errorCategory> </errorDetails> </errorOrWarningCodeDetails> <errorWarningDescription> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <source>M</source> <encoding>1</encoding> </freeTextDetails> <freeText>CCAVS TRANSACTION OK - EXACT MATCH</freeText> </errorWarningDescription> </transactionStatus> </creditCardDetailedData> </mopDetailedData> </paymentModule> </mopDescription> </fopDescription> </FOP\_CreateFormOfPaymentReply>

## 5.28.3 Possible Errors

See "Error Messages" section.

* * *

## 5.29 Operation: Old and new FOP

Query to create an OLD and NEW fop.

## 5.29.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<FOP\_CreateFormOfPayment xmlns="http://xml.amadeus.com/TFOPCQ\_19\_2\_1A"> <transactionContext> <transactionDetails> <code>FP</code> </transactionDetails> </transactionContext> <fopGroup> <fopReference></fopReference> <pnrElementAssociation> <referenceDetails> <type>TST</type> <value>1</value> </referenceDetails> </pnrElementAssociation> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>1</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopStatus>O</fopStatus> </fopDetails> </fopPNRDetails> <oldFopFreeflow> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>M</source> <encoding>1</encoding> </freeTextDetails> <freeText>CA</freeText> </oldFopFreeflow> </mopDetails> </mopDescription> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>2</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopStatus>O</fopStatus> </fopDetails> </fopPNRDetails> <oldFopFreeflow> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>M</source> <encoding>1</encoding> </freeTextDetails> <freeText>CK</freeText> </oldFopFreeflow> </mopDetails> </mopDescription> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>1</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>CC</fopCode> </fopDetails> </fopPNRDetails> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <paymentData> <merchantInformation> <companyCode>AY</companyCode> </merchantInformation> </paymentData> <mopInformation> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardData> <creditCardDetails> <ccInfo> <vendorCode>VI</vendorCode> <cardNumber>4541099100010016</cardNumber> <expiryDate>0919</expiryDate> </ccInfo> </creditCardDetails> </creditCardData> </mopInformation> <dummy></dummy> </paymentModule> </mopDescription> </fopGroup> </FOP\_CreateFormOfPayment>

## 5.29.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<FOP\_CreateFormOfPaymentReply xmlns="http://xml.amadeus.com/TFOPCR\_19\_2\_1A"> <fopDescription> <fopReference> <reference> <qualifier>FPT</qualifier> <number>23</number> </reference> </fopReference> <passengerAssociation> <passengerReference> <type>PAX</type> <value>1</value> </passengerReference> </passengerAssociation> <pnrElementAssociation> <referenceDetails> <type>TST</type> <value>1</value> </referenceDetails> </pnrElementAssociation> <pnrElementAssociation> <referenceDetails> <type>SEG</type> <value>1</value> </referenceDetails> </pnrElementAssociation> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>0</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopStatus>O</fopStatus> </fopDetails> </fopPNRDetails> <oldFopFreeflow> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>CA\\+CK</freeText> </oldFopFreeflow> </mopDetails> </mopDescription> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>1</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>CCVI</fopCode> <fopStatus>N</fopStatus> <fopEdiCode>CCVI</fopEdiCode> <fopReportingCode>CC</fopReportingCode> <fopElecTicketingCode>CC</fopElecTicketingCode> </fopDetails> </fopPNRDetails> <oldFopFreeflow> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>CCVIXXXXXXXXXXXX0016/0919</freeText> </oldFopFreeflow> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>S</criteriaSetType> <criteriaDetails> <attributeType>13</attributeType> <attributeDescription>1</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>D</criteriaSetType> <criteriaDetails> <attributeType>CCNUM</attributeType> <attributeDescription>XXXXXXXXXXXX0016</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CUR</attributeType> <attributeDescription>SGD</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CCDTE1</attributeType> <attributeDescription>0919</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>FOPCODE</attributeType> <attributeDescription>CCVI</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>VENDORCODE</attributeType> <attributeDescription>VI</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <paymentData> <merchantInformation> <companyCode>AY</companyCode> </merchantInformation> </paymentData> <mopInformation> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardData> <creditCardDetails> <ccInfo> <vendorCode>VI</vendorCode> <cardNumber>XXXXXXXXXXXX0016</cardNumber> <expiryDate>0919</expiryDate> </ccInfo> </creditCardDetails> </creditCardData> </mopInformation> <dummy></dummy> <mopDetailedData> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardDetailedData> <authorisationSupplementaryData></authorisationSupplementaryData> </creditCardDetailedData> </mopDetailedData> </paymentModule> </mopDescription> </fopDescription> </FOP\_CreateFormOfPaymentReply>

## 5.29.3 Possible Errors

See "Error Messages" section.

* * *

## 5.30 Operation: Old FOP

Query to create an old fop.

## 5.30.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<FOP\_CreateFormOfPayment xmlns="http://xml.amadeus.com/TFOPCQ\_19\_2\_1A"> <transactionContext> <transactionDetails> <code>FP</code> </transactionDetails> </transactionContext> <fopGroup> <fopReference></fopReference> <passengerAssociation> <passengerReference> <type>PAX</type> <value>1</value> </passengerReference> </passengerAssociation> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>0</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopStatus>O</fopStatus> </fopDetails> </fopPNRDetails> <oldFopFreeflow> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>M</source> <encoding>1</encoding> </freeTextDetails> <freeText>CASH</freeText> </oldFopFreeflow> </mopDetails> </mopDescription> </fopGroup> </FOP\_CreateFormOfPayment>

## 5.30.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<FOP\_CreateFormOfPaymentReply xmlns="http://xml.amadeus.com/TFOPCR\_19\_2\_1A"> <fopDescription> <fopReference> <reference> <qualifier>FPT</qualifier> <number>23</number> </reference> </fopReference> <passengerAssociation> <passengerReference> <type>PAX</type> <value>1</value> </passengerReference> </passengerAssociation> <pnrElementAssociation> <referenceDetails> <type>TST</type> <value>1</value> </referenceDetails> </pnrElementAssociation> <pnrElementAssociation> <referenceDetails> <type>SEG</type> <value>1</value> </referenceDetails> </pnrElementAssociation> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>0</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopStatus>O</fopStatus> </fopDetails> </fopPNRDetails> <oldFopFreeflow> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>CASH</freeText> </oldFopFreeflow> </mopDetails> </mopDescription> </fopDescription> </FOP\_CreateFormOfPaymentReply>

## 5.30.3 Possible Errors

See "Error Messages" section.

* * *

## 5.31 Operation: Split payment

Query to trigger split payment process.

## 5.31.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<FOP\_CreateFormOfPayment xmlns="http://xml.amadeus.com/TFOPCQ\_19\_2\_1A"> <transactionContext> <transactionDetails> <code>DEF</code> </transactionDetails> </transactionContext> <fopGroup> <fopReference></fopReference> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>1</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>CCVI</fopCode> </fopDetails> </fopPNRDetails> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <paymentData> <merchantInformation> <companyCode>QF</companyCode> </merchantInformation> <monetaryInformation> <monetaryDetails> <typeQualifier>LAS</typeQualifier> <amount>1000</amount> <currency>AUD</currency> </monetaryDetails> </monetaryInformation> </paymentData> <mopInformation> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardData> <creditCardDetails> <ccInfo> <vendorCode>VI</vendorCode> <cardNumber>4541099100010024</cardNumber> <expiryDate>1215</expiryDate> </ccInfo> </creditCardDetails> </creditCardData> </mopInformation> <dummy></dummy> </paymentModule> </mopDescription> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>2</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>CCCA</fopCode> </fopDetails> </fopPNRDetails> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <paymentData> <merchantInformation> <companyCode>QF</companyCode> </merchantInformation> <monetaryInformation> <monetaryDetails> <typeQualifier>LAS</typeQualifier> <amount>500</amount> <currency>AUD</currency> </monetaryDetails> </monetaryInformation> </paymentData> <mopInformation> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardData> <creditCardDetails> <ccInfo> <vendorCode>CA</vendorCode> <cardNumber>500000000009</cardNumber> <expiryDate>1215</expiryDate> </ccInfo> </creditCardDetails> </creditCardData> </mopInformation> <dummy></dummy> </paymentModule> </mopDescription> </fopGroup> </FOP\_CreateFormOfPayment>

## 5.31.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<FOP\_CreateFormOfPaymentReply xmlns="http://xml.amadeus.com/TFOPCR\_19\_2\_1A"> <fopDescription> <fopReference> <reference> <qualifier>FPT</qualifier> <number>27</number> </reference> </fopReference> <passengerAssociation> <passengerReference> <type>PAX</type> <value>1</value> </passengerReference> </passengerAssociation> <pnrElementAssociation> <referenceDetails> <type>SEG</type> <value>1</value> </referenceDetails> </pnrElementAssociation> <pnrElementAssociation> <referenceDetails> <type>TST</type> <value>1</value> </referenceDetails> </pnrElementAssociation> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>1</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>CCVI</fopCode> <fopStatus>N</fopStatus> <fopEdiCode>CCVI</fopEdiCode> <fopReportingCode>CA</fopReportingCode> <fopElecTicketingCode>CC</fopElecTicketingCode> </fopDetails> </fopPNRDetails> <oldFopFreeflow> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>CCVI4541099100010024/1215/FAPS1OK</freeText> </oldFopFreeflow> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>S</criteriaSetType> <criteriaDetails> <attributeType>13</attributeType> <attributeDescription>1</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>63</attributeType> <attributeDescription>1</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>D</criteriaSetType> <criteriaDetails> <attributeType>AVS</attributeType> <attributeDescription>Y</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>IPN</attributeType> <attributeDescription>251083081</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>AMT</attributeType> <attributeDescription>1000.00</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CCNUM</attributeType> <attributeDescription>4541099100010024</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CUR</attributeType> <attributeDescription>AUD</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CCDTE1</attributeType> <attributeDescription>1215</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>FOPCODE</attributeType> <attributeDescription>CCVI</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>88</attributeType> <attributeDescription>APS1OK</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>VENDORCODE</attributeType> <attributeDescription>VI</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <paymentData> <merchantInformation> <companyCode>QF</companyCode> </merchantInformation> <monetaryInformation> <monetaryDetails> <typeQualifier>AIR</typeQualifier> <amount>1000.00</amount> <currency>AUD</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>AUT</typeQualifier> <amount>1000.00</amount> <currency>AUD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>I</typeQualifier> <amount>1000.00</amount> <currency>AUD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>IPC</typeQualifier> <amount>1000.00</amount> <currency>AUD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>IT</typeQualifier> <amount>1200.00</amount> <currency>AUD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>ITC</typeQualifier> <amount>1200.00</amount> <currency>AUD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>T</typeQualifier> <amount>1200.00</amount> <currency>AUD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TPC</typeQualifier> <amount>1200.00</amount> <currency>AUD</currency> </otherMonetaryDetails> </monetaryInformation> <paymentId> <referenceType>PRI</referenceType> <uniqueReference>251083081</uniqueReference> </paymentId> <fraudScreeningData> <fraudScreening> <statusInformation> <indicator>FRA</indicator> <action>N</action> </statusInformation> </fraudScreening> <payerPhoneOrEmail> <phoneOrEmailType>P</phoneOrEmailType> <telephoneNumberDetails> <telephoneNumber>00</telephoneNumber> </telephoneNumberDetails> </payerPhoneOrEmail> </fraudScreeningData> </paymentData> <mopInformation> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardData> <creditCardDetails> <ccInfo> <vendorCode>VI</vendorCode> <cardNumber>4541099100010024</cardNumber> <expiryDate>1215</expiryDate> </ccInfo> </creditCardDetails> </creditCardData> </mopInformation> <dummy></dummy> <mopDetailedData> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardDetailedData> <authorisationSupplementaryData> <msgRef> <retrievalReferenceNumber>305716481611</retrievalReferenceNumber> <authorResponseCode>00</authorResponseCode> </msgRef> </authorisationSupplementaryData> <approvalDetails> <approvalCodeData> <approvalCode>APS1OK</approvalCode> <sourceOfApproval>F</sourceOfApproval> </approvalCodeData> </approvalDetails> <localDateTime> <businessSemantic>T</businessSemantic> <timeMode>L</timeMode> <dateTime> <year>2012</year> <month>10</month> <day>16</day> <hour>16</hour> <minutes>10</minutes> <seconds>52</seconds> </dateTime> </localDateTime> <authorisationInformation> <transactionDetails> <code>0110</code> <type>VI</type> <issueIndicator>N</issueIndicator> <transmissionControlNumber>481611</transmissionControlNumber> </transactionDetails> </authorisationInformation> <transactionStatus> <errorOrWarningCodeDetails> <errorDetails> <errorCode>Y</errorCode> <errorCategory>AVS</errorCategory> </errorDetails> </errorOrWarningCodeDetails> <errorWarningDescription> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <source>M</source> <encoding>1</encoding> </freeTextDetails> <freeText>CCAVS TRANSACTION OK - EXACT MATCH</freeText> </errorWarningDescription> </transactionStatus> </creditCardDetailedData> </mopDetailedData> </paymentModule> </mopDescription> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>2</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>CCCA</fopCode> <fopStatus>N</fopStatus> <fopEdiCode>CCCA</fopEdiCode> <fopReportingCode>CA</fopReportingCode> <fopElecTicketingCode>CC</fopElecTicketingCode> </fopDetails> </fopPNRDetails> <oldFopFreeflow> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>CCCA500000000009/1215/AUD200.00/AAPS1OK</freeText> </oldFopFreeflow> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>S</criteriaSetType> <criteriaDetails> <attributeType>13</attributeType> <attributeDescription>1</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>63</attributeType> <attributeDescription>1</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>D</criteriaSetType> <criteriaDetails> <attributeType>IPN</attributeType> <attributeDescription>251084081</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>AMT</attributeType> <attributeDescription>200.00</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>1</attributeType> <attributeDescription>APS1OK</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CCNUM</attributeType> <attributeDescription>500000000009</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CUR</attributeType> <attributeDescription>AUD</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CCDTE1</attributeType> <attributeDescription>1215</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>FOPCODE</attributeType> <attributeDescription>CCCA</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>VENDORCODE</attributeType> <attributeDescription>CA</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <paymentData> <merchantInformation> <companyCode>QF</companyCode> </merchantInformation> <monetaryInformation> <monetaryDetails> <typeQualifier>S</typeQualifier> <amount>500.00</amount> <currency>AUD</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>AUT</typeQualifier> <amount>200.00</amount> <currency>AUD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>I</typeQualifier> <amount>500.00</amount> <currency>AUD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>IPC</typeQualifier> <amount>500.00</amount> <currency>AUD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>IT</typeQualifier> <amount>1200.00</amount> <currency>AUD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>ITC</typeQualifier> <amount>1200.00</amount> <currency>AUD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>T</typeQualifier> <amount>1200.00</amount> <currency>AUD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TPC</typeQualifier> <amount>1200.00</amount> <currency>AUD</currency> </otherMonetaryDetails> </monetaryInformation> <paymentId> <referenceType>PRI</referenceType> <uniqueReference>251084081</uniqueReference> </paymentId> <fraudScreeningData> <fraudScreening> <statusInformation> <indicator>FRA</indicator> <action>N</action> </statusInformation> </fraudScreening> <payerPhoneOrEmail> <phoneOrEmailType>P</phoneOrEmailType> <telephoneNumberDetails> <telephoneNumber>00</telephoneNumber> </telephoneNumberDetails> </payerPhoneOrEmail> </fraudScreeningData> </paymentData> <mopInformation> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardData> <creditCardDetails> <ccInfo> <vendorCode>CA</vendorCode> <cardNumber>500000000009</cardNumber> <expiryDate>1215</expiryDate> </ccInfo> </creditCardDetails> </creditCardData> </mopInformation> <dummy></dummy> <mopDetailedData> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardDetailedData> <authorisationSupplementaryData> <msgRef> <retrievalReferenceNumber>305716481612</retrievalReferenceNumber> <authorResponseCode>00</authorResponseCode> <terminalType>0</terminalType> </msgRef> </authorisationSupplementaryData> <approvalDetails> <approvalCodeData> <approvalCode>APS1OK</approvalCode> <sourceOfApproval>A</sourceOfApproval> </approvalCodeData> </approvalDetails> <localDateTime> <businessSemantic>T</businessSemantic> <timeMode>L</timeMode> <dateTime> <year>2012</year> <month>10</month> <day>16</day> <hour>16</hour> <minutes>10</minutes> <seconds>52</seconds> </dateTime> </localDateTime> <authorisationInformation> <transactionDetails> <code>0110</code> <type>VI</type> <issueIndicator>S</issueIndicator> <transmissionControlNumber>481612</transmissionControlNumber> </transactionDetails> </authorisationInformation> </creditCardDetailedData> </mopDetailedData> </paymentModule> </mopDescription> </fopDescription> <fopDescription> <fopReference> <reference> <qualifier>FPT</qualifier> <number>30</number> </reference> </fopReference> <passengerAssociation> <passengerReference> <type>PAX</type> <value>3</value> </passengerReference> </passengerAssociation> <pnrElementAssociation> <referenceDetails> <type>SEG</type> <value>1</value> </referenceDetails> </pnrElementAssociation> <pnrElementAssociation> <referenceDetails> <type>TST</type> <value>2</value> </referenceDetails> </pnrElementAssociation> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>1</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>CCCA</fopCode> <fopStatus>N</fopStatus> <fopEdiCode>CCCA</fopEdiCode> <fopReportingCode>CA</fopReportingCode> <fopElecTicketingCode>CC</fopElecTicketingCode> </fopDetails> </fopPNRDetails> <oldFopFreeflow> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>CCCA500000000009/1215/AAPS1OK</freeText> </oldFopFreeflow> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>S</criteriaSetType> <criteriaDetails> <attributeType>13</attributeType> <attributeDescription>1</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>63</attributeType> <attributeDescription>1</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>D</criteriaSetType> <criteriaDetails> <attributeType>IPN</attributeType> <attributeDescription>251084081</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>AMT</attributeType> <attributeDescription>300.00</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>1</attributeType> <attributeDescription>APS1OK</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CCNUM</attributeType> <attributeDescription>500000000009</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CUR</attributeType> <attributeDescription>AUD</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CCDTE1</attributeType> <attributeDescription>1215</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>FOPCODE</attributeType> <attributeDescription>CCCA</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>VENDORCODE</attributeType> <attributeDescription>CA</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <paymentData> <merchantInformation> <companyCode>QF</companyCode> </merchantInformation> <monetaryInformation> <monetaryDetails> <typeQualifier>S</typeQualifier> <amount>500.00</amount> <currency>AUD</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>AUT</typeQualifier> <amount>300.00</amount> <currency>AUD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>I</typeQualifier> <amount>500.00</amount> <currency>AUD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>IPC</typeQualifier> <amount>500.00</amount> <currency>AUD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>IT</typeQualifier> <amount>300.00</amount> <currency>AUD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>ITC</typeQualifier> <amount>300.00</amount> <currency>AUD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>T</typeQualifier> <amount>300.00</amount> <currency>AUD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TPC</typeQualifier> <amount>300.00</amount> <currency>AUD</currency> </otherMonetaryDetails> </monetaryInformation> <paymentId> <referenceType>PRI</referenceType> <uniqueReference>251084081</uniqueReference> </paymentId> <fraudScreeningData> <fraudScreening> <statusInformation> <indicator>FRA</indicator> <action>N</action> </statusInformation> </fraudScreening> <payerPhoneOrEmail> <phoneOrEmailType>P</phoneOrEmailType> <telephoneNumberDetails> <telephoneNumber>00</telephoneNumber> </telephoneNumberDetails> </payerPhoneOrEmail> </fraudScreeningData> </paymentData> <mopInformation> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardData> <creditCardDetails> <ccInfo> <vendorCode>CA</vendorCode> <cardNumber>500000000009</cardNumber> <expiryDate>1215</expiryDate> </ccInfo> </creditCardDetails> </creditCardData> </mopInformation> <dummy></dummy> <mopDetailedData> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardDetailedData> <authorisationSupplementaryData> <msgRef> <retrievalReferenceNumber>305716481612</retrievalReferenceNumber> <authorResponseCode>00</authorResponseCode> <terminalType>0</terminalType> </msgRef> </authorisationSupplementaryData> <approvalDetails> <approvalCodeData> <approvalCode>APS1OK</approvalCode> <sourceOfApproval>A</sourceOfApproval> </approvalCodeData> </approvalDetails> <localDateTime> <businessSemantic>T</businessSemantic> <timeMode>L</timeMode> <dateTime> <year>2012</year> <month>10</month> <day>16</day> <hour>16</hour> <minutes>10</minutes> <seconds>52</seconds> </dateTime> </localDateTime> <authorisationInformation> <transactionDetails> <code>0110</code> <type>VI</type> <issueIndicator>S</issueIndicator> <transmissionControlNumber>481612</transmissionControlNumber> </transactionDetails> </authorisationInformation> </creditCardDetailedData> </mopDetailedData> </paymentModule> </mopDescription> </fopDescription> </FOP\_CreateFormOfPaymentReply>

## 5.31.3 Possible Errors

See "Error Messages" section.

* * *

## 5.32 Operation: Standard authorization in error

Error in a standard author flow.

## 5.32.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<FOP\_CreateFormOfPayment xmlns="http://xml.amadeus.com/TFOPCQ\_19\_2\_1A"> <transactionContext> <transactionDetails> <code>DEF</code> </transactionDetails> </transactionContext> <fopGroup> <fopReference></fopReference> <pnrElementAssociation> <referenceDetails> <type>TST</type> <value>1</value> </referenceDetails> </pnrElementAssociation> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>1</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>VI</fopCode> </fopDetails> </fopPNRDetails> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <paymentData> <merchantInformation> <companyCode>AY</companyCode> </merchantInformation> </paymentData> <mopInformation> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardData> <creditCardDetails> <ccInfo> <vendorCode>DC</vendorCode> <cardNumber>3601160000000009</cardNumber> <expiryDate>0915</expiryDate> </ccInfo> </creditCardDetails> </creditCardData> </mopInformation> <dummy></dummy> </paymentModule> </mopDescription> </fopGroup> </FOP\_CreateFormOfPayment>

## 5.32.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<FOP\_CreateFormOfPaymentReply xmlns="http://xml.amadeus.com/TFOPCR\_19\_2\_1A"> <transmissionError> <errorOrWarningCodeDetails> <errorDetails> <errorCode>22427</errorCode> </errorDetails> </errorOrWarningCodeDetails> <errorWarningDescription> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <source>M</source> <encoding>1</encoding> </freeTextDetails> <freeText>PAYMENT FAILED - PLEASE CONTACT AIRLINE</freeText> </errorWarningDescription> </transmissionError> <fopDescription> <fopReference></fopReference> <passengerAssociation> <passengerReference> <type>PAX</type> <value>1</value> </passengerReference> </passengerAssociation> <pnrElementAssociation> <referenceDetails> <type>TST</type> <value>1</value> </referenceDetails> </pnrElementAssociation> <pnrElementAssociation> <referenceDetails> <type>SEG</type> <value>1</value> </referenceDetails> </pnrElementAssociation> <fpElementError> <errorOrWarningCodeDetails> <errorDetails> <errorCode>25799</errorCode> </errorDetails> </errorOrWarningCodeDetails> <errorWarningDescription> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <source>M</source> <encoding>1</encoding> </freeTextDetails> <freeText>ERROR AT FOP CREATION</freeText> </errorWarningDescription> </fpElementError> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>1</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>VI</fopCode> <fopStatus>N</fopStatus> <fopEdiCode>CCVI</fopEdiCode> <fopReportingCode>CC</fopReportingCode> <fopElecTicketingCode>CC</fopElecTicketingCode> </fopDetails> </fopPNRDetails> <oldFopFreeflow> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>VIXXXXXXXXXXXX0009/0915</freeText> </oldFopFreeflow> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>S</criteriaSetType> <criteriaDetails> <attributeType>13</attributeType> <attributeDescription>1</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>D</criteriaSetType> <criteriaDetails> <attributeType>IPN</attributeType> <attributeDescription>249746105</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>AMT</attributeType> <attributeDescription>20.00</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CCNUM</attributeType> <attributeDescription>XXXXXXXXXXXX0009</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CUR</attributeType> <attributeDescription>EUR</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CCDTE1</attributeType> <attributeDescription>0915</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>FOPCODE</attributeType> <attributeDescription>VI</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>VENDORCODE</attributeType> <attributeDescription>DC</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <paymentData> <merchantInformation> <companyCode>AY</companyCode> </merchantInformation> <monetaryInformation> <monetaryDetails> <typeQualifier>AIR</typeQualifier> <amount>20.00</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>AUT</typeQualifier> <amount>20.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>I</typeQualifier> <amount>20.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>IPC</typeQualifier> <amount>20.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>IT</typeQualifier> <amount>20.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>ITC</typeQualifier> <amount>20.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>T</typeQualifier> <amount>20.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TPC</typeQualifier> <amount>20.00</amount> <currency>EUR</currency> </otherMonetaryDetails> </monetaryInformation> <paymentId> <referenceType>PRI</referenceType> <uniqueReference>249746105</uniqueReference> </paymentId> <fraudScreeningData> <fraudScreening> <statusInformation> <indicator>FRA</indicator> <action>N</action> </statusInformation> </fraudScreening> <payerPhoneOrEmail> <phoneOrEmailType>P</phoneOrEmailType> <telephoneNumberDetails> <telephoneNumber>3977-PAY</telephoneNumber> </telephoneNumberDetails> </payerPhoneOrEmail> </fraudScreeningData> </paymentData> <paymentStatus> <paymentStatusInformation> <responseType>V</responseType> <statusCode>KOMORE</statusCode> </paymentStatusInformation> <paymentStatusError> <errorOrWarningCodeDetails> <errorDetails> <errorCode>313</errorCode> </errorDetails> </errorOrWarningCodeDetails> <errorWarningDescription> <freeTextDetails> <textSubjectQualifier>CAN</textSubjectQualifier> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>INVALID ACCOUNT NUMBER</freeText> </errorWarningDescription> </paymentStatusError> </paymentStatus> <mopInformation> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardData> <creditCardDetails> <ccInfo> <vendorCode>DC</vendorCode> <cardNumber>XXXXXXXXXXXX0009</cardNumber> <expiryDate>0915</expiryDate> </ccInfo> </creditCardDetails> </creditCardData> </mopInformation> <dummy></dummy> <mopDetailedData> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardDetailedData> <authorisationSupplementaryData></authorisationSupplementaryData> <localDateTime> <businessSemantic>T</businessSemantic> <timeMode>L</timeMode> <dateTime> <year>2012</year> <month>10</month> <day>12</day> <hour>13</hour> <minutes>0</minutes> <seconds>51</seconds> </dateTime> </localDateTime> <authorisationInformation> <transactionDetails> <type>ZZ</type> <issueIndicator>N</issueIndicator> </transactionDetails> </authorisationInformation> </creditCardDetailedData> </mopDetailedData> </paymentModule> </mopDescription> </fopDescription> </FOP\_CreateFormOfPaymentReply>

## 5.32.3 Possible Errors

See "Error Messages" section.

* * *

## 5.33 Operation: Successful standard credit card Creation and authorisation

Herafter an example of credit card FOP creation + authorisation and of payment data returned to the user.

## 5.33.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<FOP\_CreateFormOfPayment xmlns="http://xml.amadeus.com/TFOPCQ\_19\_2\_1A"> <transactionContext> <transactionDetails> <code>DEF</code> </transactionDetails> </transactionContext> <fopGroup> <fopReference></fopReference> <pnrElementAssociation> <referenceDetails> <type>TST</type> <value>1</value> </referenceDetails> </pnrElementAssociation> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>1</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>VI</fopCode> </fopDetails> </fopPNRDetails> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <mopInformation> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardData> <creditCardDetails> <ccInfo> <vendorCode>VI</vendorCode> <cardNumber>4541099100010016</cardNumber> <securityId>123</securityId> <expiryDate>0915</expiryDate> </ccInfo> </creditCardDetails> </creditCardData> </mopInformation> <dummy></dummy> </paymentModule> </mopDescription> </fopGroup> </FOP\_CreateFormOfPayment>

## 5.33.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<FOP\_CreateFormOfPaymentReply xmlns="http://xml.amadeus.com/TFOPCR\_19\_2\_1A"> <fopDescription> <fopReference> <reference> <qualifier>FPT</qualifier> <number>21</number> </reference> </fopReference> <passengerAssociation> <passengerReference> <type>PAX</type> <value>1</value> </passengerReference> </passengerAssociation> <pnrElementAssociation> <referenceDetails> <type>TST</type> <value>1</value> </referenceDetails> </pnrElementAssociation> <pnrElementAssociation> <referenceDetails> <type>SEG</type> <value>1</value> </referenceDetails> </pnrElementAssociation> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>1</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>VI</fopCode> <fopStatus>N</fopStatus> <fopEdiCode>CCVI</fopEdiCode> <fopReportingCode>CC</fopReportingCode> <fopElecTicketingCode>CC</fopElecTicketingCode> </fopDetails> </fopPNRDetails> <oldFopFreeflow> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>VIXXXXXXXXXXXX0016/0915/AAPS1OK</freeText> </oldFopFreeflow> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>S</criteriaSetType> <criteriaDetails> <attributeType>13</attributeType> <attributeDescription>1</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>D</criteriaSetType> <criteriaDetails> <attributeType>AVS</attributeType> <attributeDescription>Y</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>IPN</attributeType> <attributeDescription>263236105</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>LNK</attributeType> <attributeDescription>VI</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>AMT</attributeType> <attributeDescription>50.00</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>1</attributeType> <attributeDescription>APS1OK</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CCNUM</attributeType> <attributeDescription>XXXXXXXXXXXX0016</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CUR</attributeType> <attributeDescription>EUR</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CCDTE1</attributeType> <attributeDescription>0919</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>FOPCODE</attributeType> <attributeDescription>VI</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>VENDORCODE</attributeType> <attributeDescription>VI</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <paymentData> <merchantInformation> <companyCode>AY</companyCode> </merchantInformation> <monetaryInformation> <monetaryDetails> <typeQualifier>AIR</typeQualifier> <amount>50.00</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>AUT</typeQualifier> <amount>50.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>I</typeQualifier> <amount>50.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>IPC</typeQualifier> <amount>50.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>IT</typeQualifier> <amount>50.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>ITC</typeQualifier> <amount>50.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>T</typeQualifier> <amount>50.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TPC</typeQualifier> <amount>50.00</amount> <currency>EUR</currency> </otherMonetaryDetails> </monetaryInformation> <paymentId> <referenceType>PRI</referenceType> <uniqueReference>263236105</uniqueReference> </paymentId> <fraudScreeningData> <fraudScreening> <statusInformation> <indicator>FRA</indicator> <action>N</action> </statusInformation> </fraudScreening> <payerPhoneOrEmail> <phoneOrEmailType>P</phoneOrEmailType> <telephoneNumberDetails> <telephoneNumber>3977-PAY</telephoneNumber> </telephoneNumberDetails> </payerPhoneOrEmail> </fraudScreeningData> </paymentData> <mopInformation> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardData> <creditCardDetails> <ccInfo> <vendorCode>VI</vendorCode> <cardNumber>XXXXXXXXXXXX0016</cardNumber> <expiryDate>0915</expiryDate> </ccInfo> </creditCardDetails> </creditCardData> </mopInformation> <dummy></dummy> <mopDetailedData> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardDetailedData> <authorisationSupplementaryData> <msgRef> <retrievalReferenceNumber>309316534016</retrievalReferenceNumber> <authorResponseCode>00</authorResponseCode> </msgRef> </authorisationSupplementaryData> <approvalDetails> <approvalCodeData> <approvalCode>APS1OK</approvalCode> <sourceOfApproval>A</sourceOfApproval> </approvalCodeData> </approvalDetails> <localDateTime> <businessSemantic>T</businessSemantic> <timeMode>L</timeMode> <dateTime> <year>2013</year> <month>2</month> <day>27</day> <hour>16</hour> <minutes>6</minutes> <seconds>40</seconds> </dateTime> </localDateTime> <authorisationInformation> <transactionDetails> <code>0110</code> <type>VI</type> <issueIndicator>N</issueIndicator> <transmissionControlNumber>534016</transmissionControlNumber> </transactionDetails> </authorisationInformation> <transactionStatus> <errorOrWarningCodeDetails> <errorDetails> <errorCode>Y</errorCode> <errorCategory>AVS</errorCategory> </errorDetails> </errorOrWarningCodeDetails> <errorWarningDescription> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <source>M</source> <encoding>1</encoding> </freeTextDetails> <freeText>CCAVS TRANSACTION OK - EXACT MATCH</freeText> </errorWarningDescription> </transactionStatus> </creditCardDetailedData> </mopDetailedData> </paymentModule> </mopDescription> </fopDescription> </FOP\_CreateFormOfPaymentReply>

## 5.33.3 Possible Errors

See "Error Messages" section.

* * *

## 5.34 Operation: VCN Creation

Query for creating the Virtual Credit Card into PNR

## 5.34.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<FOP\_CreateFormOfPayment xmlns="http://xml.amadeus.com/TFOPCQ\_19\_2\_1A"> <fopGroup> <fopReference></fopReference> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>1</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>VCN</fopCode> </fopDetails> </fopPNRDetails> <oldFopFreeflow> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>VCN/DEB</freeText> </oldFopFreeflow> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <dummy></dummy> </paymentModule> </mopDescription> </fopGroup> </FOP\_CreateFormOfPayment>

## 5.34.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<FOP\_CreateFormOfPaymentReply xmlns="http://xml.amadeus.com/TFOPCR\_19\_2\_1A"> <fopDescription> <fopReference> <reference> <qualifier>FPT</qualifier> <number>21</number> </reference> </fopReference> <mopDescription> <fopSequenceNumber> <sequenceDetails> <number>1</number> </sequenceDetails> </fopSequenceNumber> <mopDetails> <fopPNRDetails> <fopDetails> <fopCode>CCTP</fopCode> <fopStatus>N</fopStatus> <fopEdiCode>CCTP</fopEdiCode> <fopReportingCode>CC</fopReportingCode> <fopElecTicketingCode>CC</fopElecTicketingCode> </fopDetails> </fopPNRDetails> <oldFopFreeflow> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>CCTPXXXXXXXXXXX3634/0324</freeText> </oldFopFreeflow> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>S</criteriaSetType> <criteriaDetails> <attributeType>13</attributeType> <attributeDescription>1</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>172</attributeType> <attributeDescription>1</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>33</attributeType> <attributeDescription>1</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> <pnrSupplementaryData> <dataAndSwitchMap> <criteriaSetType>D</criteriaSetType> <criteriaDetails> <attributeType>BIN</attributeType> <attributeDescription>122090</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>EXT</attributeType> <attributeDescription>222CXFP2</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CCNUM</attributeType> <attributeDescription>XXXXXXXXXXX3634</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CUR</attributeType> <attributeDescription>EUR</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>CCDTE1</attributeType> <attributeDescription>0324</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>FOPCODE</attributeType> <attributeDescription>CCTP</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>\_freeFlow10</attributeType> <attributeDescription>999988881</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>\_freeFlow15</attributeType> <attributeDescription>AU-999988881</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>\_freeFlow3</attributeType> <attributeDescription>UATP</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>\_freeFlow7</attributeType> <attributeDescription>20210509</attributeDescription> </criteriaDetails> <criteriaDetails> <attributeType>VENDORCODE</attributeType> <attributeDescription>TP</attributeDescription> </criteriaDetails> </dataAndSwitchMap> </pnrSupplementaryData> </mopDetails> <paymentModule> <groupUsage> <attributeDetails> <attributeType>FP</attributeType> </attributeDetails> </groupUsage> <mopInformation> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardData> <creditCardDetails> <ccInfo> <vendorCode>TP</vendorCode> <cardNumber>XXXXXXXXXXX3634</cardNumber> <expiryDate>0324</expiryDate> <ccHolderName>Vaticum SA</ccHolderName> </ccInfo> </creditCardDetails> </creditCardData> </mopInformation> <dummy></dummy> <mopDetailedData> <fopInformation> <formOfPayment> <type>CC</type> </formOfPayment> </fopInformation> <dummy></dummy> <creditCardDetailedData> <authorisationSupplementaryData></authorisationSupplementaryData> </creditCardDetailedData> </mopDetailedData> </paymentModule> </mopDescription> </fopDescription> </FOP\_CreateFormOfPaymentReply>

## 5.34.3 Possible Errors

See "Error Messages" section.

* * *