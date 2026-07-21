---
url: "https://developers.amadeus.com/api-library/soap/functional-doc/1889/doc-read/5516?serviceVersion=16.1"
download_url: "https://developers.amadeus.com/PAS-EAS/api/download/comp/4d4ad2cb456c02633f463a055ab70584/5516/upload_4491286855041032988.html"
title: "HTML_UG_WBS_DocRefund_CalculateRefund_TARFRQ_16.1_055"
source: "amadeus"
service_id: "1889"
service_name: "DocRefund_CalculateRefund"
version: "16.1"
document_id: "5516"
doc_version: "16.1"
doc_type: "User guide"
scraped_at: "2026-07-15T10:08:59.146Z"
---
# Function: DocRefund\_CalculateRefund

* * *

## 1 Overview

CalculateRefund can be used two ways :

-   Providing ticket data of the tickets to be refunded. For such requests the system does not perform any ticket display but is based on the data provided (itinerary, fare basis, coupon status, etc.)
-   Providing ticket numbers of the tickets to be refunded. For such requests the system performs aticket display to retrieve ticket data.

## 1.1 Supported Operations

The supported operations are as follows:  
Back-pricing options:

-   Corporate code
-   Pricing ticketing city override

Refund options:

-   Currency override
-   Miles and cash
-   Involuntary refund

## 1.2 Limitations

Please refer to ATC Refund functional specifications for more details.

Only 1 passenger per query is supported.

## 1.3 Unsupported Operations

Not applicable

## 1.4 Prerequisites

Not applicable

## 2 Building A Query

The function can be used in two modes:

-   With the ticket data in input
-   With the ticket number in in input. The system then retrieves the ticket data

## 2.1 Sub Structure: Passenger information

## 2.1.1 Description

You specify passenger information in <passengerInfoGroup>. Note that this group is mandatory for requests with ticket data, but conditional with ticket number only.

This group comprises 3 elements:

-   **<segmentRepetitionControl\>:** Comprises:       
    -   <quantity>: The ID of the group of passengers
    -   <numberOfUnits>:  The number of passengers
-   **<travellersID\>**: Passenger identifier (measurementValue)
-   **<discountPtc\>**: Passenger Type Code (PTC), (valueQualifier) 

Note: You can specify PTC even if only the ticket number without passenger data is provided.

The example below shows the XML structure for two adults, one child and one infant.

The group <discountPTC> shows a <valueQualifier> of "ADT", which sighnifies adult:

## 2.1.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<message> <passengersGroup> <segmentRepetitionControl> <segmentControlDetails> <quantity>1</quantity> <numberOfUnits>1</numberOfUnits> </segmentControlDetails> </segmentRepetitionControl> <travellersID> <travellerDetails> <measurementValue>1</measurementValue> <surname>MCLEOD</surname> <firstName>ONE</firstName> </travellerDetails> </travellersID> <discountPtc> <valueQualifier>ADT</valueQualifier> </discountPtc> </passengersGroup> </message>

## 2.2 Sub Structure: Pricing option - Corporate

## 2.2.1 Description

This option is used to specify the corporation number of the company the passenger belongs to. You can also add the corporate name.

The following diagram shows the structure:  
![](images/POPT-CRP.png)

-   **<pricingOptionKey**\>: CRP (Corporation Number)
-   **<optionDetail\>**: The Corporation Number

  
The example below shows the use of the corporation number "48906348860"

## 2.2.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>CRP</pricingOptionKey> </pricingOptionKey> <optionDetail> <criteriaDetails> <attributeType>48906348860</attributeType> </criteriaDetails> </optionDetail> </pricingOptionGroup>

## 2.3 Sub Structure: Pricing option - Currency override

## 2.3.1 Description

Use this option to override with a specific currency at refund time the amounts calculated by the pricing engine.

The following diagram shows the structure:  
![](images/POPT-FCO.png)

-   **<pricingOptionKey**\>: FCO (Fare Currency Override)
-   **<currency>** (Mandatory)
    -   <currencyQualifier\>: "FCO"
    -   <currencyIsoCode\>: the 3 letter code of the requested currency

## 2.3.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>FCO</pricingOptionKey> </pricingOptionKey> <currency> <firstCurrencyDetails> <currencyQualifier>FCO</currencyQualifier> <currencyIsoCode>USD</currencyIsoCode> </firstCurrencyDetails> </currency> </pricingOptionGroup>

## 2.4 Sub Structure: Pricing option - Involuntary refund

## 2.4.1 Description

This option is used to perform an involuntary refund. This means passing over the fare rules and refund all possible amounts except for non refundable taxes.

-   **<pricingOptionKey**\>: I

The example below shows the use of the involuntary refund option.

## 2.4.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>I</pricingOptionKey> </pricingOptionKey> </pricingOptionGroup>

## 2.5 Sub Structure: Pricing option - Miles and cash

## 2.5.1 Description

This option is used for miles and cash pricing.

-   **<pricingOptionKey**\>: MC (Miles and cash)

## 2.5.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>MC</pricingOptionKey> </pricingOptionKey> </pricingOptionGroup>

## 2.6 Sub Structure: Pricing option - Point of ticketing

## 2.6.1 Description

Use this option to choose the point of ticketing.

The following diagram shows the structure:  
![](images/POPT-POS.png)

-   **pricingOptionKey** = POT (Point Of Ticketing)
-   **locationInformation** :
    -   locationType = "POT"
    -   code = the city code

The example below shows the use of city "LON" as point of sale:

## 2.6.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>POT</pricingOptionKey> </pricingOptionKey> <locationInformation> <locationType>POT</locationType> <firstLocationDetails> <code>LON</code> </firstLocationDetails> </locationInformation> </pricingOptionGroup>

## 2.7 Sub Structure: Pricing options

## 2.7.1 Description

Pricing options can be specified in the <pricingOptionGroup>. This group is shared between re-pricing and first pricing services both in itinerary and services pricing.

<pricingOptionGroup> comprises several elements, commonly:

-   A name
-   First option name plus any attributes
-   Second option name plus any attributes
-   Third option name plus any attributes, etc.

You must repeat <pricingOptionGroup> for each applicable pricing option.

The following diagram shows the structure:

![](images/POPTgroup.png)

-   **<pricingOptionKey>**: Mandatory. The smart name of the option.
-   **<optionDetail>**: In case the option value takes free text information
-   **<carrierInformation>**: In case the option value takes a carrier code
-   **<penDisInformation>**: In case the option value takes penalty information
-   **<dateInformation>**: In case the option value takes a date
-   **<frequentFlyerInformation>**: In case the option deals with a frequent flyer
-   **<formOfPaymentInformation>**: In case the option deals with a form of payment
-   **<locationInformatio>n**: In case the option value takes location data
-   **<couponInformation>**: In case a coupon reference is required
-   **<paxSegTstReference>**: To associate the option with a passenger a segment or an exchange (in case of repricing)

The same option may not be repeated with the same association.  
  
If a repetition of the pricing option group has an invalid attribute (for example: a mandatory element or attribute, or a non applicable attribute that is present), the query is rejected with the error message "INVALID ATTRIBUTE FOR OPTION {xxx}", where {xxx} is the <pricingOptionKey> of the option for which there is an invalid attribute.

Some option cannot be combined. In case a pricing request contains 2 invalid pricing options, the query is rejected with error message "CANNOT COMBINE OPTIONS {xxx} and {yyy}", where {xxx} and {yyy} are the <pricingOptionKey> of the non-combinable options.

Note that the passenger/segment association is based on the passenger and segment identifier that is defined:

-   <passengersGroup>/<travellersID>/<travellerDetails>/<measurementValue> for the passenger identifier
-   <refundInformationGroup>/<transactionIdentifier> for the ticket

For example: For corporate code, the attribute is the corporarte, and the attribute the corporate code

-   Name = CRP
-   Attribute: corporate code

## 2.7.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>CRP</pricingOptionKey> </pricingOptionKey> <optionDetail> <criteriaDetails> <attributeType>48906348860</attributeType> </criteriaDetails> </optionDetail> </pricingOptionGroup>

## 2.8 Sub Structure: Ticket information

## 2.8.1 Description

<refundInformation> group contains ticket information, and must be defined for each passenger:

-   <transactionIdentifier> allows the identification of the group <refundInformationGroup>.
-   <ticketInfoPerPaxGroup> must be defined per ticket to be refunded.

According to the type of request, different data have to be filled:

1.  Ticket Numbers Only:

<ticketInfoPerPaxGroup> includes:

-   <passengerReference>: is mandatory
-   <ticketNumberGroup>: is mandatory and used to specify ticket information. You can have one group per conjunctive ticket, and up to for groups are allowed as a ticket can contain up to 4 booklets or sub-conjunctive tickets. It includes:
    -   <ticketNumberInfo>: To indicate the ticket number and the type of document  in <type>. (Note: At present the only acceptable value is "T".)

There are differences in the criteria for electronic and paper tickets. These are:

-   Electronic tickets: Only the primary ticket is specified
-   Paper tickets: The following conditions apply:
    -   All conjunctive ticket numbers must be specified
    -   Coupon selection is mandatory
    -   Selected coupons must be consecutive
    -   Selected coupons must include all the remaining open coupons (i.e. if a ticket contains 4 coupons, the coupon selection can be : 1234, 234, 34 or 4).

1.  Providing ticket data:

For these requests, as much information as possible should be provided to ensure the refund calculation is successful.

<ticketInfoPerPaxGroup> includes:

-   <passengerReference>: Mandatory.
-   <ticketAgencyId>: Mandatory. Ticket originator information.
-   <additionalTicketAgencyInfo>: Mandatory. Ticket originator information.
-   <monetaryInfo>: Mandatory. Monetary information.
-   <taxInfo>: Mandatory. Ticket tax details.
-   <interactiveFreeText>: Conditional. Ticket endorsement.
-   <formOfPayment>: Conditional. Ticket form of payment.
-   <tourCodeInfo>: Conditional. Ticket tour code.
-   <ptcInfo>: Conditional. PTC the ticket has been priced with.

<ticketNumberGroup> contains the ticket numbers and coupon data. It is mandatory and contains the following elements:

-   <ticketNumberInfo>: Ticket number
-   <issueIdentifier>: The issue Identifier
-   <ticketingDetails>: Mandatory. Specifies details about the ticket. Contains the following elements
    -   <departureDate>
    -   <departureTime>
    -   <city> and <country>: Place of issuance
    -   <identifier>: Validating carrier

Note: One <ticketNumberGroup> corresponds to one conjunctive ticket. Up to 4 <ticketNumberGroup> groups can be specified for up to 4 booklets of each conjunctive ticket.

For each conjunctive:

-   <ticketNumberInfo>: Mandatory. Ticket number.
-   <issueIdentifier>: The issue identifier should be specified in the 
-   <ticketingDetails>: The date and place of issuance and validating carrier should be specified at least for one ticket in the element
-   <couponInfoGroup>: To specify the coupon data. You can have up to four <couponInfoGroup> for up to four coupons per conjunctive .<couponInfoGroup> contains coupon data :
    -   <couponInfo>: Coupon information
        -   <cpnNumber>: Coupon number 
        -   <cpnStatus>: Coupon status 
        -   <cpnExchangeMedia>: Electronic/paper information
    -   <segmentInfo>: Segment details like flight number, departure date &time...
    -   <couponPricingSubsequent>: Fare basis
    -   <couponDateTimeInfo>: Not valid after or before (NVA/NVB) dates

-   <firstPricingInformationKey>: The pricing context key (or BLB  key) 

<feeTypeInfo> defines the type of fees applicable. It must contain one <feeSubGroup> group, which contains the following elements:

-   <feeSubType>: Fee subtype
-   <feeMonetaryInfo>: Fee amount
-   <feeFormOfPayment>: Form of payment
-   <feeTaxes>: Fee taxes

## 2.8.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 2.9 Sub Structure: Type of request

## 2.9.1 Description

<messageAction\> specifies the type of request, and can accept the following values:

-   "135": User provides the ticket data  
      
    
-   "136": User provides the ticket number

## 2.9.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 3 Receiving A Reply

The CalculateRefund transaction is informative. Neither the ticket, nor any PNR is updated.

The reply contains all the information concerning the refund calculations:

-   Category used for the calculation (data source)
-   Tickets and coupons to be set to refund
-   Monetary information : fare paid, fare used, faire refund,...
-   Cancellation fee and commission
-   Tax details : taxes paid, taxes used, refundable taxes
-   OB fee details if applicable
-   Form of payment information
-   Itinerary and ticket information
-   Additional information

## 3.1 Sub Structure: The errorGroup group

## 3.1.1 Description

The <errorGroup> is filled when the system encounters an error during the processing of the transaction. It can be due to invalid query, an invalid data in the ticket or a calculation error. The <errorGroup> group contains:

-   <errorOrWarningCodeDetails>: An error code
    -   <errorCategory> with WEC for wanting and EC for errors
    -    <errorWarningDescription>: Functional error description if applicable

## 3.1.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

* * *

## 3.2 Sub Structure: The refundInfoPerPaxGroup group

## 3.2.1 Description

<refundInfoPerPaxGroup> must be completed per passenger and comprises the following:

-   <travellerDetails>: passenger reference and name
-   <ticketsRefunded>: contains information about tickes and coupons to be refunded  
    -   <primaryTicketNumber\>: Ticket numbers
    -   <conjunctiveTicketNumber>: Booklets from primary ticket
    -   <interactiveFreeText\>: Ticketing level information 
    -   <refundCurrenciesInvolved>: 
        -   <conversionType>:  705‚ means "Origin of travel"‚ ICOO 
        -   <conversionType>: 707‚ means "Equivalent conversion currency"‚ RCOS
    -   <ticketingDetails>
    -   <segmentInfoGroup>: coupon and segment information (one group per coupon)
        -   <segmentInfo>: segment information  
            
        -   <couponInformationDetails\>: coupon number and status
        -   <fareQualifierDetails>: fare basis
        -   <travelItineraryInfo>: NVA&NVB

-   <refundCalculationInfoGroup>: Calculation informatio. It contains:
    -   <ptcInfo>The PTC/discount used for the calculation
    -   <refundCategory>/<indicators>: The data source(CAT 33, CAT 16) and type of fare used
    -   <fareMonetaryInfo>: Fare Monetary information
    -   <additionalMonetaryInfo>: Additional Monetary information (taxes totals, fee totals, etc.)

Note: Please refer to the section transmitted amounts below for the description of the amounts returned.

-    
    -   <cancelCommissionFee>: Cancellation and commission fee. 
        -   <thediscountPenaltyQualifier\>: 
            -   700: For the cancellation fee
            -   702: For the commission fee 
        -   The <amountType> (A for amount, P for percentage) permits identifying the type of the date
    -   <interactiveFreeTex>: Calculation free flow information
    -   <formOfPayment\>: Form of Payment information. The indicator permits to identifying if the form of payment is the one of the ticket (indicator = 1 for old). The indicator 2 for new orm of payment is the one allowed for the refund. Amounts can be associated with the forms of payment. 
    -   <taxesInfoGroup>: Tax details. Contains the tax details in:
        -   <ticketTaxDetails>:
            -   <taxCategory\>: 
                -   701 = tax paid, 
                -   705 = refundable taxes, 
                -   NR = non refundable taxes, 
        -   <pfcDetails>: Provides additional details on PFC (XF and ZP taxes breakdown - per tax type and per airport). A maximum of 5 taxes can be returned, and for each tax, a maximum of 20 amounts can be processed.
    -   <tourInfo>: Tour code
    -   <feeBreakDownGroup>: Contains the details on the fee refund
        -   <feeTypeInfo>: The option permits to determine the fee type for a set of fees 
            -   <optionInformation>: Determines the status of the fee, including additional collection, to be paid, to be refunded etc.
        -   <feeDetailsInfoGroup>: Fee details is provided per fee in groups

## 3.2.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

* * *

## 3.3 Sub Structure: Transmitted amounts

## 3.3.1 Description

List of amounts returned in the monetary amounts:

-   ICOO: Issuance currency of origin
-   ICOS: Issuance currency of selling
-   RCOO: Reissuance currency of origin
-   RCOS: Reissuance currency of selling

**Element**

**Amount**

**Currency**

**Codeset**

<fareMonetaryInfo>

Original Fare Amount Paid

ICOO

IBA

<fareMonetaryInfo>

Equivalent Fare Amount Paid

RCOS

IEQ

<fareMonetaryInfo>

Fare Used

ICOO

B

<fareMonetaryInfo>

Equivalent Fare Used

RCOS

E

<fareMonetaryInfo>

Fare Refund

ICOO

BR

<fareMonetaryInfo>

Equivalent Fare Refund

RCOS

ER

<fareMonetaryInfo>

Non Refundable Fare

RCOS

NEQ

<fareMonetaryInfo>

Fare Refund Total (fare paid - fare used + penalty)

RCOS

TR

  <fareMonetaryInfo>

  Miscellaneous Fee (administrative service fee for refund through direct offline channels)

  RCOS

  MFA

<additionalMonetaryInfo>

OB Fee Total Amount

RCOS

OA

<additionalMonetaryInfo>

total OB Fee Paid

RCOS

OBP

<additionalMonetaryInfo>

Total OB Fee Non Refundable

RCOS

ONR

<additionalMonetaryInfo>

Total New OB Fee to be paid

RCOS

OBN

<additionalMonetaryInfo>

Total OB Fee Refundable

RCOS

OBR

<additionalMonetaryInfo>

Refund Commission Amount

RCOS

RCA

<additionalMonetaryInfo>

Refund Commission Percentage

RCOS

RCP

<additionalMonetaryInfo>

Refund commission equivalent amount

RCOS

RCE

<additionalMonetaryInfo>

Total New Taxes to be paid

RCOS

TNT

<additionalMonetaryInfo>

Total Refundable Taxes

RCOS

TRT

<additionalMonetaryInfo>

Total Non Refundable Taxes

RCOS

NTA

<additionalMonetaryInfo>

Total Paid Taxes

RCOS

TOT

<additionalMonetaryInfo>

Net Refund Amount

RCOS

NRD

<additionalMonetaryInfo>

Net Refund equivalent amount

RCOS

NRE

<additionalMonetaryInfo>

Grand Total To be Refunded (fare balance + taxbalance - penalty)

RCOS

RES

Reissue/Repriced  (New/Used) Published fare amount

RCOS

IPU

Balance of Published fare amount

RCOS

RPU

Issue (Old/Paid) Discount amount

RCOS

IDA

Reissue/Repriced  (New/Used) Discount amount

RCOS

RDA

Balance of Discount amount

RCOS

BDA

Total Refund in Net level amount

RCOS

TRN

Total Refund in Published level amount

RCOS

TRP

No show Fee amount 

RCOS

NSF

Total Penalty amount 

RCOS

TPA

Refund amount  in miles

MRT

Fare paid  in miles

MFP

Fare used  in miles

MFU

Fare refunded in miles

MFR

Refundable amount of residual value

RCOS

REF

Reusable amount of residual value

RCOS

REU

Non-refundable FOP amount

RCOS

NRF

Non-refundable capped amount

RCOS

NRC

Fare paid in points

IBP

Fare used in points

RBP

Fare refunded in points

BBP

Paid amount of cash converted

ICC

Used amount of cash converted

RCC

Refunded amount of cash converted

BCC

Paid remaining amount in cash

RCOS

IRA

Used remaining amount in cash

RCOS

RRA

Refund remaining amount in cash

RCOS

BRA

Paid remaining cash without taxes

RCOS

IRC

Used remaining cash without taxes

RCOS

RRC

Refund remaining cash without taxes

RCOS

BRC

Paid total taxes in cash

RCOS

ITT

Used total taxes in cash

RCOS

RTT

Refunded total taxes in cash

RCOS

BTT

Total refund in points

REP

Penalty in miles

MIL

Refundable part of remaining

RFR

Reusable part of remaining

RUR

## 3.3.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

* * *

## 4 Error Messages

**Number**

**Error message**

**Description**

 32241 

ACCESS DENIED  

The ATC Refund use has not been authorised for the refund office.  

  

REFUND PROVISIONS NOT FOUND/CHECK PRICING OPTIONS  

Explanation below (after the table) due to error messages due to calculation failing.

25679

INVALID COUPON STATUS FOR ATC TRANSACTION

The ticket to be refunded contains at least an invalid coupon status.

25846 

INVALID TICKET DATA

The ticket contains one item of invalid data.

  

TICKET DISPLAY REJECTED BY E-TKT SERVER

The e-Ticket display has been rejected by the airline e-ticket server.

 00011 

 UNABLE TO PROCESS 

Technical error.

 00146 

 CHECK - CALL SUPERVISOR 

Technical error.

 02162 

 LINK DOWN - RETRY IN 2 MINUTES 

23803

MIXED TICKET TYPES NOT ALLOWED

The request contains both electronic and paper tickets.

21607

DOCUMENT NUMBER NOT PRIMARY

In case of conjunctive e-Ticket refund, the primary ticket must be selected.

23244

MULTIPLE REFERENCE TO A TICKET/SEGMENT

A ticket or a passenger is referred twice in the same request.

21706

FARE CALCULATION NOT VALID FOR ATC TRANSACTION  

The parser fails decoding the fare calculation.

25677

ATC REFUND NOT AUTHORIZED

To perform an ATC refund transaction, the ATF office Profile Indicator has to be set to 1.

25715

FARE SERVER TEMPORARY DOWN – PLEASE RETRY IN 2MIN

Fare quote returns an error message.

00477

INVALID FORMAT  

The format is not valid.

25680

OPTION NOT COMBINABLE WITH ATC REFUND

32960

EXCHANGED E-TICKET NOT FOUND

If the exchanged e-Ticket display fails, refund processing stops.  

32961

ATC REFUND AFTER MULTIPLE INVOL. EXCHANGES NOT SUPPORTED

If the exchanged E-ticket has also been involuntarily exchanged (use of Amadeus Ticket Changer Involuntary, ATU, product) refund process stops and following error message is displayed to the End User.

32992

REJECTED–SEVERAL REISSUES HAVE BEEN PERFORMED ON EXCHANGED ETKT

All coupon of exchanged e-Ticket with status “E” have been exchanged against same ATU ticket.

32993

REFUND NOT POSSIBLE AFTER INVOLUNTARY EXCH. OF MULTIPLE TICKET

If the exchanged involuntary e-Ticket is coming from multi ticket, (ex: TKT A + TKT B --ATU--> TKT C) refund process stops.

**Error messages due to calculation failing:**

-   Change of PTC between issue and refund is forbidden
-   Issue fare was unifare, please request at least unifare
-   Issue fare was public, please request at least public fares
-   Please request same corporate contract as for issue
-   Original fare calculation manually modified - refund forbidden
-   Change of POS.POT between issue and refund is forbidden

## 4.1 Error Reply

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<DocRefund\_CalculateRefundReply xmlns="http://xml.amadeus.com/TARFRR\_16\_1\_1A"> <errorGroup> <errorOrWarningCodeDetails> <errorDetails> <errorCode>146 </errorCode> <errorCategory>EC</errorCategory> <errorCodeOwner>ZZZ</errorCodeOwner> </errorDetails> </errorOrWarningCodeDetails> <errorWarningDescription> <freeTextDetails> <textSubjectQualifier>1</textSubjectQualifier> <source>M</source> <encoding>1</encoding> </freeTextDetails> <freeText>CHECK - CALL SUPERVISOR</freeText> </errorWarningDescription> </errorGroup> </DocRefund\_CalculateRefundReply>

  

* * *

## 5 Operations

## 5.1 Operation: Corporate fare

The corporate fare option is used for the back-pricing.

Type of contract is defined in the <pricingOptionsGroup>/<corporateFare>/<fareQualifier> group. Following codesets are available:

C

Amadeus corporate negotiated fares

N

Amadeus nego fares

NP

Amadeus nego fares and Public fares

P

Public fares

U

Corporate unifares

UP

Non corporate Unifares and Public fares

UU

Non corporate and corporate unifares

The contract code is specified in the <identifyNumber> group.

## 5.1.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<DocRefund\_CalculateRefund xmlns="http://xml.amadeus.com/TARFRQ\_16\_1\_1A"> <messageAction> <messageFunctionDetails> <messageFunction>136</messageFunction> </messageFunctionDetails> </messageAction> <refundInformationGroup> <transactionIdentifier> <itemNumberDetails> <number>1</number> </itemNumberDetails> </transactionIdentifier> <ticketInfoPerPaxGroup> <passengerReference> <segmentControlDetails> <quantity>1</quantity> </segmentControlDetails> </passengerReference> <ticketNumberGroup> <ticketNumberInfo> <documentDetails> <number>9993216549870</number> <type>T</type> </documentDetails> </ticketNumberInfo> </ticketNumberGroup> </ticketInfoPerPaxGroup> </refundInformationGroup> <pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>CRP</pricingOptionKey> </pricingOptionKey> <optionDetail> <criteriaDetails> <attributeType>48906348860</attributeType> </criteriaDetails> </optionDetail> </pricingOptionGroup> </DocRefund\_CalculateRefund>

## 5.1.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<DocRefund\_CalculateRefundReply xmlns="http://xml.amadeus.com/TARFRR\_16\_1\_1A"> <refundInfoPerPaxGroup> <travellerDetails> <passengerDetails> <referenceNumber>1</referenceNumber> <surname>PASSENGER</surname> <firstName>ONE</firstName> </passengerDetails> </travellerDetails> <ticketsRefunded> <primaryTicketNumber> <documentDetails> <number>9993216549870</number> <type>T</type> </documentDetails> </primaryTicketNumber> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> <informationType>7</informationType> </freeTextQualification> <freeText>REFUND PROCESSED BY ATC REFUND</freeText> </interactiveFreeText> <refundCurrenciesInvolved> <conversionRateDetails> <conversionType>705</conversionType> <currency>GBP</currency> </conversionRateDetails> <otherConvRateDetails> <conversionType>707</conversionType> <currency>GBP</currency> </otherConvRateDetails> </refundCurrenciesInvolved> <segmentInfoGroup> <segmentInfo> <flightDate> <departureDate>160809</departureDate> <departureTime>1200</departureTime> <arrivalDate>160809</arrivalDate> <arrivalTime>1320</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>LHR</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>CDG</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> <operatingCompany>6X</operatingCompany> </companyDetails> <flightIdentification> <flightNumber>1001</flightNumber> <bookingClass>J</bookingClass> </flightIdentification> </segmentInfo> <couponInformationDetails> <couponDetails> <cpnNumber>1</cpnNumber> <cpnStatus>I</cpnStatus> </couponDetails> </couponInformationDetails> <fareQualifierDetails> <additionalFareDetails> <rateClass>JFLEX</rateClass> </additionalFareDetails> </fareQualifierDetails> </segmentInfoGroup> <segmentInfoGroup> <segmentInfo> <flightDate> <departureDate>160809</departureDate> <departureTime>1900</departureTime> <arrivalDate>160809</arrivalDate> <arrivalTime>2020</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>CDG</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>LHR</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> <operatingCompany>6X</operatingCompany> </companyDetails> <flightIdentification> <flightNumber>1002</flightNumber> <bookingClass>J</bookingClass> </flightIdentification> </segmentInfo> <couponInformationDetails> <couponDetails> <cpnNumber>1</cpnNumber> <cpnStatus>I</cpnStatus> </couponDetails> </couponInformationDetails> <fareQualifierDetails> <additionalFareDetails> <rateClass>JFLEX</rateClass> </additionalFareDetails> </fareQualifierDetails> </segmentInfoGroup> </ticketsRefunded> <refundCalculationInfoGroup> <ptcInfo> <valueQualifier>A</valueQualifier> </ptcInfo> <refundCategory> <priceTicketDetails> <indicators>C33</indicators> </priceTicketDetails> </refundCategory> <fareMonetaryInfo> <monetaryDetails> <typeQualifier>I6X</typeQualifier> <amount>500.00</amount> <currency>GBP</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>IEQ</typeQualifier> <amount>500.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>B</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>E</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BR</typeQualifier> <amount>490.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>ER</typeQualifier> <amount>490.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>NEQ</typeQualifier> <amount>10.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TR</typeQualifier> <amount>440.00</amount> <currency>GBP</currency> </otherMonetaryDetails> </fareMonetaryInfo> <additionalMonetaryInformation> <monetaryDetails> <typeQualifier>OA</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>OBP</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>ONR</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>OBN</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>OBR</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>RCP</typeQualifier> <amount>5.20</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TNT</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TRT</typeQualifier> <amount>15.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>NTA</typeQualifier> <amount>85.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TOT</typeQualifier> <amount>100.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>RES</typeQualifier> <amount>455.00</amount> <currency>GBP</currency> </otherMonetaryDetails> </additionalMonetaryInformation> <cancelCommissionFee> <discountPenaltyQualifier>700</discountPenaltyQualifier> <discountPenaltyDetails> <amountType>A</amountType> <amount>50</amount> <currency>GBP</currency> </discountPenaltyDetails> </cancelCommissionFee> <cancelCommissionFee> <discountPenaltyQualifier>702</discountPenaltyQualifier> <discountPenaltyDetails> <amountType>P</amountType> <rate>1.2</rate> <currency>GBP</currency> </discountPenaltyDetails> </cancelCommissionFee> <formOfPayment> <formOfPaymentDetails> <type>CA</type> <indicator>2</indicator> <creditCardNumber>121234345656</creditCardNumber> <expiryDate>1210</expiryDate> </formOfPaymentDetails> <otherFormOfPayment> <type>CA</type> <indicator>3</indicator> </otherFormOfPayment> </formOfPayment> <taxesInfoGroup> <ticketTaxDetails> <taxCategory>701</taxCategory> <taxDetails> <rate>12.00</rate> <currencyCode>GBP</currencyCode> <type>VZ</type> </taxDetails> </ticketTaxDetails> </taxesInfoGroup> </refundCalculationInfoGroup> </refundInfoPerPaxGroup> </DocRefund\_CalculateRefundReply>

## 5.1.3 Possible Errors

* * *

## 5.2 Operation: Currency Override

This option allows you to override the refund currency. By default the refund currency is the one of the office.

## 5.2.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<DocRefund\_CalculateRefund xmlns="http://xml.amadeus.com/TARFRQ\_16\_1\_1A"> <messageAction> <messageFunctionDetails> <messageFunction>136</messageFunction> </messageFunctionDetails> </messageAction> <refundInformationGroup> <transactionIdentifier> <itemNumberDetails> <number>1</number> </itemNumberDetails> </transactionIdentifier> <ticketInfoPerPaxGroup> <passengerReference> <segmentControlDetails> <quantity>1</quantity> </segmentControlDetails> </passengerReference> <ticketNumberGroup> <ticketNumberInfo> <documentDetails> <number>9993216549870</number> <type>T</type> </documentDetails> </ticketNumberInfo> </ticketNumberGroup> </ticketInfoPerPaxGroup> </refundInformationGroup> <pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>FCO</pricingOptionKey> </pricingOptionKey> <currency> <firstCurrencyDetails> <currencyQualifier>FCO</currencyQualifier> <currencyIsoCode>USD</currencyIsoCode> </firstCurrencyDetails> </currency> </pricingOptionGroup> </DocRefund\_CalculateRefund>

## 5.2.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<DocRefund\_CalculateRefundReply xmlns="http://xml.amadeus.com/TARFRR\_16\_1\_1A"> <refundInfoPerPaxGroup> <travellerDetails> <passengerDetails> <referenceNumber>1</referenceNumber> <surname>PASSENGER</surname> <firstName>ONE</firstName> </passengerDetails> </travellerDetails> <ticketsRefunded> <primaryTicketNumber> <documentDetails> <number>9993216549870</number> <type>T</type> </documentDetails> </primaryTicketNumber> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> <informationType>7</informationType> </freeTextQualification> <freeText>REFUND PROCESSED BY ATC REFUND</freeText> </interactiveFreeText> <refundCurrenciesInvolved> <conversionRateDetails> <conversionType>705</conversionType> <currency>GBP</currency> </conversionRateDetails> <otherConvRateDetails> <conversionType>707</conversionType> <currency>USD</currency> </otherConvRateDetails> </refundCurrenciesInvolved> <segmentInfoGroup> <segmentInfo> <flightDate> <departureDate>160809</departureDate> <departureTime>1200</departureTime> <arrivalDate>160809</arrivalDate> <arrivalTime>1320</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>LHR</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>CDG</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> <operatingCompany>6X</operatingCompany> </companyDetails> <flightIdentification> <flightNumber>1001</flightNumber> <bookingClass>J</bookingClass> </flightIdentification> </segmentInfo> <couponInformationDetails> <couponDetails> <cpnNumber>1</cpnNumber> <cpnStatus>I</cpnStatus> </couponDetails> </couponInformationDetails> <fareQualifierDetails> <additionalFareDetails> <rateClass>JFLEX</rateClass> </additionalFareDetails> </fareQualifierDetails> </segmentInfoGroup> <segmentInfoGroup> <segmentInfo> <flightDate> <departureDate>160809</departureDate> <departureTime>1900</departureTime> <arrivalDate>160809</arrivalDate> <arrivalTime>2020</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>CDG</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>LHR</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> <operatingCompany>6X</operatingCompany> </companyDetails> <flightIdentification> <flightNumber>1002</flightNumber> <bookingClass>J</bookingClass> </flightIdentification> </segmentInfo> <couponInformationDetails> <couponDetails> <cpnNumber>2</cpnNumber> <cpnStatus>I</cpnStatus> </couponDetails> </couponInformationDetails> <fareQualifierDetails> <additionalFareDetails> <rateClass>JFLEX</rateClass> </additionalFareDetails> </fareQualifierDetails> </segmentInfoGroup> </ticketsRefunded> <refundCalculationInfoGroup> <ptcInfo> <valueQualifier>A</valueQualifier> </ptcInfo> <refundCategory> <priceTicketDetails> <indicators>C33</indicators> </priceTicketDetails> </refundCategory> <fareMonetaryInfo> <monetaryDetails> <typeQualifier>I6X</typeQualifier> <amount>500.00</amount> <currency>GBP</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>IEQ</typeQualifier> <amount>5000</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>B</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>E</typeQualifier> <amount>0</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BR</typeQualifier> <amount>490.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>ER</typeQualifier> <amount>4900</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>NEQ</typeQualifier> <amount>100</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TR</typeQualifier> <amount>4400</amount> <currency>USD</currency> </otherMonetaryDetails> </fareMonetaryInfo> <additionalMonetaryInformation> <monetaryDetails> <typeQualifier>OA</typeQualifier> <amount>0</amount> <currency>USD</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>OBP</typeQualifier> <amount>0</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>ONR</typeQualifier> <amount>0</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>OBN</typeQualifier> <amount>0</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>OBR</typeQualifier> <amount>0</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TNT</typeQualifier> <amount>0</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TRT</typeQualifier> <amount>150</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>NTA</typeQualifier> <amount>850</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TOT</typeQualifier> <amount>1000</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>RES</typeQualifier> <amount>4550</amount> <currency>USD</currency> </otherMonetaryDetails> </additionalMonetaryInformation> <cancelCommissionFee> <discountPenaltyQualifier>700</discountPenaltyQualifier> <discountPenaltyDetails> <amountType>A</amountType> <amount>50</amount> <currency>USD</currency> </discountPenaltyDetails> </cancelCommissionFee> <formOfPayment> <formOfPaymentDetails> <type>CA</type> <indicator>2</indicator> <creditCardNumber>121234345656</creditCardNumber> <expiryDate>1210</expiryDate> </formOfPaymentDetails> </formOfPayment> <taxesInfoGroup> <ticketTaxDetails> <taxCategory>701</taxCategory> <taxDetails> <rate>120</rate> <currencyCode>USD</currencyCode> <type>VZ</type> </taxDetails> <taxDetails> <rate>880</rate> <currencyCode>USD</currencyCode> <type>OU</type> </taxDetails> </ticketTaxDetails> </taxesInfoGroup> <taxesInfoGroup> <ticketTaxDetails> <taxCategory>NR</taxCategory> <taxDetails> <rate>850</rate> <currencyCode>USD</currencyCode> <type>OU</type> </taxDetails> </ticketTaxDetails> </taxesInfoGroup> </refundCalculationInfoGroup> </refundInfoPerPaxGroup> </DocRefund\_CalculateRefundReply>

## 5.2.3 Possible Errors

* * *

## 5.3 Operation: Involuntary Refund

This option allows you to initiate an involuntary refund by ticket number.

## 5.3.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<DocRefund\_CalculateRefund xmlns="http://xml.amadeus.com/TARFRQ\_16\_1\_1A"> <messageAction> <messageFunctionDetails> <messageFunction>136</messageFunction> </messageFunctionDetails> </messageAction> <refundInformationGroup> <transactionIdentifier> <itemNumberDetails> <number>1</number> </itemNumberDetails> </transactionIdentifier> <ticketInfoPerPaxGroup> <passengerReference> <segmentControlDetails> <quantity>1</quantity> </segmentControlDetails> </passengerReference> <ticketNumberGroup> <ticketNumberInfo> <documentDetails> <number>9993216549870</number> <type>T</type> </documentDetails> </ticketNumberInfo> </ticketNumberGroup> </ticketInfoPerPaxGroup> </refundInformationGroup> <pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>I</pricingOptionKey> </pricingOptionKey> </pricingOptionGroup> </DocRefund\_CalculateRefund>

## 5.3.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.3.3 Possible Errors

See "Error Messages" section.

* * *

## 5.4 Operation: Miles and cash

You can request the amount of mile in a remption ticket refund.

## 5.4.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<DocRefund\_CalculateRefund xmlns="http://xml.amadeus.com/TARFRQ\_16\_1\_1A"> <messageAction> <messageFunctionDetails> <messageFunction>136</messageFunction> </messageFunctionDetails> </messageAction> <refundInformationGroup> <transactionIdentifier> <itemNumberDetails> <number>1</number> </itemNumberDetails> </transactionIdentifier> <ticketInfoPerPaxGroup> <passengerReference> <segmentControlDetails> <quantity>1</quantity> </segmentControlDetails> </passengerReference> <ticketNumberGroup> <ticketNumberInfo> <documentDetails> <number>9993216549870</number> <type>T</type> </documentDetails> </ticketNumberInfo> </ticketNumberGroup> </ticketInfoPerPaxGroup> </refundInformationGroup> <pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>MC</pricingOptionKey> </pricingOptionKey> </pricingOptionGroup> </DocRefund\_CalculateRefund>

## 5.4.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<DocRefund\_CalculateRefundReply xmlns="http://xml.amadeus.com/TARFRR\_16\_1\_1A"> <refundInfoPerPaxGroup> <travellerDetails> <passengerDetails> <referenceNumber>1</referenceNumber> <measurementValue>1</measurementValue> <surname>CHXVLOY</surname> <firstName>PIGMAROUA</firstName> </passengerDetails> </travellerDetails> <ticketsRefunded> <primaryTicketNumber> <documentDetails> <number>9993216549870</number> <type>T</type> </documentDetails> </primaryTicketNumber> <refundCurrenciesInvolved> <conversionRateDetails> <conversionType>707</conversionType> <currency>USD</currency> </conversionRateDetails> <otherConvRateDetails> <conversionType>705</conversionType> <currency>USD</currency> </otherConvRateDetails> </refundCurrenciesInvolved> <ticketingDetails> <priceTicketDetails> <indicators>I</indicators> </priceTicketDetails> <otherLocationDetails> <country>US</country> </otherLocationDetails> </ticketingDetails> <segmentInfoGroup> <segmentInfo> <flightDate> <departureDate>071115</departureDate> <departureTime>0900</departureTime> <arrivalDate>071115</arrivalDate> <arrivalTime>1250</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>BWI</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>CUN</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>WN</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>1607</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> </segmentInfo> <couponInformationDetails> <couponDetails> <cpnNumber>1</cpnNumber> <cpnStatus>I</cpnStatus> </couponDetails> </couponInformationDetails> </segmentInfoGroup> </ticketsRefunded> <refundCalculationInfoGroup> <ptcInfo> <valueQualifier>A</valueQualifier> </ptcInfo> <refundCategory> <priceTicketDetails> <indicators>SI</indicators> <indicators>IAT</indicators> <indicators>C33</indicators> </priceTicketDetails> </refundCategory> <fareMonetaryInfo> <monetaryDetails> <typeQualifier>IBA</typeQualifier> <amount>409.00</amount> <currency>USD</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>RCC</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>RBP</typeQualifier> <amount>0</amount> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>RRC</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>RTT</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>RRA</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>REP</typeQualifier> <amount>40900</amount> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>REQ</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>RTA</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>RTO</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>RGT</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TNT</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>RBA</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>NRA</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>NRC</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>REF</typeQualifier> <amount>49.57</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>REU</typeQualifier> <amount>409.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>RFR</typeQualifier> <amount>49.57</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>RUR</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>ICC</typeQualifier> <amount>409.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>IBP</typeQualifier> <amount>40900</amount> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>IRC</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>ITT</typeQualifier> <amount>49.57</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>IRA</typeQualifier> <amount>49.57</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>IEQ</typeQualifier> <amount>409.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>ITO</typeQualifier> <amount>458.57</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>ITA</typeQualifier> <amount>49.57</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>NTA</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BCC</typeQualifier> <amount>409.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BBP</typeQualifier> <amount>40900</amount> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BRC</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BTT</typeQualifier> <amount>49.57</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BRA</typeQualifier> <amount>49.57</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>ER</typeQualifier> <amount>409.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BTA</typeQualifier> <amount>-49.57</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BTO</typeQualifier> <amount>-458.57</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BGT</typeQualifier> <amount>-458.57</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BR</typeQualifier> <amount>409.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TOT</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TR</typeQualifier> <amount>409.00</amount> <currency>USD</currency> </otherMonetaryDetails> </fareMonetaryInfo> <additionalMonetaryInformation> <monetaryDetails> <typeQualifier>TRT</typeQualifier> <amount>49.57</amount> <currency>USD</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>RES</typeQualifier> <amount>458.57</amount> <currency>USD</currency> </otherMonetaryDetails> </additionalMonetaryInformation> <cancelCommissionFee> <discountPenaltyQualifier>700</discountPenaltyQualifier> <discountPenaltyDetails> <amountType>A</amountType> <amount>0.00</amount> <currency>USD</currency> </discountPenaltyDetails> </cancelCommissionFee> <taxesInfoGroup> <ticketTaxDetails> <taxCategory>705</taxCategory> <taxDetails> <rate>5.60</rate> <countryCode>SE</countryCode> <currencyCode>USD</currencyCode> <type>AY</type> <type>Q</type> </taxDetails> <taxDetails> <rate>21.77</rate> <countryCode>TO</countryCode> <currencyCode>USD</currencyCode> <type>UK</type> <type>Q</type> </taxDetails> <taxDetails> <rate>17.70</rate> <countryCode>AP</countryCode> <currencyCode>USD</currencyCode> <type>US</type> <type>Q</type> </taxDetails> <taxDetails> <rate>4.50</rate> <currencyCode>USD</currencyCode> <type>XF</type> <type>Q</type> </taxDetails> </ticketTaxDetails> <pfcDetails> <monetaryDetails> <typeQualifier>XF</typeQualifier> <amount>4.50</amount> <location>BWI</location> </monetaryDetails> </pfcDetails> </taxesInfoGroup> </refundCalculationInfoGroup> </refundInfoPerPaxGroup> </DocRefund\_CalculateRefundReply>

## 5.4.3 Possible Errors

See "Error Messages" section.

* * *

## 5.5 Operation: No Show with ticket data

This operation shows how to refund a ticket which contains a no show segment. No Show information at coupon level should be provided in the query.

Refund with ticket data only is eligible to this operation.

-   Coupon set as noshow should be set as follows:
    -   _<ticketInfoPerPaxGroup>/<ticketNumberGroup>/<couponInfoGroup>/<_ticktingDetails>_/<priceTicketDetails>/<indicators>:_ _**NSY**_
-   Coupon NOT set as noshow should be set as follow:
    -   __<ticketInfoPerPaxGroup>/<ticketNumberGroup>/<couponInfoGroup>/<_ticktingDetails>_/<priceTicketDetails>/<_indicators>:_ _**NSN**_

Usage under Itimized condition, please check with implementation team

## 5.5.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<DocRefund\_CalculateRefund xmlns="http://xml.amadeus.com/TARFRQ\_16\_1\_1A"> <messageAction> <messageFunctionDetails> <messageFunction>135</messageFunction> </messageFunctionDetails> </messageAction> <passengerInfoGroup> <segmentRepetitionControl> <segmentControlDetails> <quantity>1</quantity> <numberOfUnits>1</numberOfUnits> </segmentControlDetails> </segmentRepetitionControl> <travellersID> <travellerDetails> <measurementValue>1</measurementValue> <surname>ATCREFUND</surname> <firstName>SINGLE PAX</firstName> </travellerDetails> </travellersID> <discountPtc> <valueQualifier>A</valueQualifier> </discountPtc> </passengerInfoGroup> <refundInformationGroup> <transactionIdentifier> <itemNumberDetails> <number>1</number> </itemNumberDetails> </transactionIdentifier> <ticketInfoPerPaxGroup> <passengerReference> <segmentControlDetails> <quantity>1</quantity> </segmentControlDetails> </passengerReference> <ticketingAgencyId> <originIdentification> <originatorId>32393395</originatorId> <inHouseIdentification1>SIN6X0100</inHouseIdentification1> </originIdentification> <originatorTypeCode>A</originatorTypeCode> <originator>A0001AA</originator> </ticketingAgencyId> <additionalTicketingAgencyInfo> <locationDetails> <trueLocationId>SIN</trueLocationId> </locationDetails> <countryCode>SG</countryCode> <systemCode>6X</systemCode> </additionalTicketingAgencyInfo> <ptcInfo> <valueQualifier>A</valueQualifier> </ptcInfo> <monetaryInfo> <monetaryDetails> <typeQualifier>B</typeQualifier> <amount>1900.00</amount> <currency>SGD</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>T</typeQualifier> <amount>2221.70</amount> <currency>SGD</currency> </otherMonetaryDetails> </monetaryInfo> <taxInfo> <taxCategory>700</taxCategory> <taxDetails> <rate>267.60</rate> <countryCode>AC</countryCode> <currencyCode>SGD</currencyCode> <type>YQ</type> </taxDetails> <taxDetails> <rate>12.80</rate> <countryCode>AD</countryCode> <currencyCode>SGD</currencyCode> <type>YQ</type> </taxDetails> <taxDetails> <rate>13.90</rate> <countryCode>AD</countryCode> <currencyCode>SGD</currencyCode> <type>SG</type> </taxDetails> <taxDetails> <rate>6.10</rate> <countryCode>AE</countryCode> <currencyCode>SGD</currencyCode> <type>OP</type> </taxDetails> <taxDetails> <rate>8.00</rate> <countryCode>SE</countryCode> <currencyCode>SGD</currencyCode> <type>OO</type> </taxDetails> <taxDetails> <rate>13.30</rate> <countryCode>AE</countryCode> <currencyCode>SGD</currencyCode> <type>TW</type> </taxDetails> </taxInfo> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>4</textSubjectQualifier> <informationType>15</informationType> <status>0</status> </freeTextQualification> <freeText>SIN 6X TPE730.676X SIN730.67NUC1461.34END ROE1.300160</freeText> </interactiveFreeText> <formOfPayment> <formOfPaymentDetails> <type>CA</type> <indicator>3</indicator> <amount>2284.80</amount> </formOfPaymentDetails> </formOfPayment> <ticketNumberGroup> <ticketNumberInfo> <documentDetails> <number>1722404444741</number> <type>T</type> </documentDetails> </ticketNumberInfo> <issueIdentifier> <dataTypeInformation> <type>F</type> </dataTypeInformation> </issueIdentifier> <ticketingDetails> <productDateTimeDetails> <departureDate>081111</departureDate> </productDateTimeDetails> <companyNumberDetails> <identifier>6X</identifier> </companyNumberDetails> <locationDetails> <city>SIN</city> </locationDetails> </ticketingDetails> <couponInfoGroup> <couponInfo> <couponDetails> <cpnNumber>1</cpnNumber> <cpnStatus>I</cpnStatus> <cpnExchangeMedia>E</cpnExchangeMedia> </couponDetails> </couponInfo> <segmentInfo> <flightDate> <departureDate>200112</departureDate> <departureTime>830</departureTime> <arrivalDate>200112</arrivalDate> <arrivalTime>1305</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>SIN</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>TPE</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>0876</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> <flightTypeDetails> <flightIndicator>J</flightIndicator> </flightTypeDetails> <itemNumber>1</itemNumber> </segmentInfo> <couponPricingSubsequent> <fareBasisDetails> <rateTariffClass>YEE8</rateTariffClass> </fareBasisDetails> </couponPricingSubsequent> <ticketingDetails> <priceTicketDetails> <indicators>NSY</indicators> </priceTicketDetails> </ticketingDetails> </couponInfoGroup> <couponInfoGroup> <couponInfo> <couponDetails> <cpnNumber>2</cpnNumber> <cpnStatus>I</cpnStatus> <cpnExchangeMedia>E</cpnExchangeMedia> </couponDetails> </couponInfo> <segmentInfo> <flightDate> <departureDate>200212</departureDate> <departureTime>1410</departureTime> <arrivalDate>200212</arrivalDate> <arrivalTime>1850</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>TPE</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>SIN</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>0877</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> <flightTypeDetails> <flightIndicator>J</flightIndicator> </flightTypeDetails> <itemNumber>2</itemNumber> </segmentInfo> <couponPricingSubsequent> <fareBasisDetails> <rateTariffClass>YEE8</rateTariffClass> </fareBasisDetails> </couponPricingSubsequent> <ticketingDetails> <priceTicketDetails> <indicators>NSN</indicators> </priceTicketDetails> </ticketingDetails> </couponInfoGroup> </ticketNumberGroup> </ticketInfoPerPaxGroup> </refundInformationGroup> </DocRefund\_CalculateRefund>

## 5.5.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.5.3 Possible Errors

See "Error Messages" section.

* * *

## 5.6 Operation: No Show with ticket number

This operation describes the reply of a refund performed on a ticket which contains one NoShow segment. No Show Penalty is provided in the reply.

-   No Show Penalty is displayed in:
    -   _ticketsRefunded>/<refundCalculationInfoGroup>/<cancelCommissionFee>/<Discount PenaltyQualifier>:  **NSF**_

## 5.6.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<DocRefund\_CalculateRefund xmlns="http://xml.amadeus.com/TARFRQ\_16\_1\_1A"> <messageAction> <messageFunctionDetails> <messageFunction>136</messageFunction> </messageFunctionDetails> </messageAction> <refundInformationGroup> <transactionIdentifier> <itemNumberDetails> <number>1</number> </itemNumberDetails> </transactionIdentifier> <ticketInfoPerPaxGroup> <passengerReference> <segmentControlDetails> <quantity>1</quantity> </segmentControlDetails> </passengerReference> <ticketNumberGroup> <ticketNumberInfo> <documentDetails> <number>9993216549870</number> <type>T</type> </documentDetails> </ticketNumberInfo> </ticketNumberGroup> </ticketInfoPerPaxGroup> </refundInformationGroup> </DocRefund\_CalculateRefund>

## 5.6.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<DocRefund\_CalculateRefundReply xmlns="http://xml.amadeus.com/TARFRR\_16\_1\_1A"> <refundInfoPerPaxGroup> <travellerDetails> <passengerDetails> <referenceNumber>1</referenceNumber> <surname>PASSENGER</surname> <firstName>ONE</firstName> </passengerDetails> </travellerDetails> <ticketsRefunded> <primaryTicketNumber> <documentDetails> <number>9993216549870</number> <type>T</type> </documentDetails> </primaryTicketNumber> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> <informationType>7</informationType> </freeTextQualification> <freeText>REFUND PROCESSED BY ATC REFUND</freeText> </interactiveFreeText> <refundCurrenciesInvolved> <conversionRateDetails> <conversionType>705</conversionType> <currency>GBP</currency> </conversionRateDetails> <otherConvRateDetails> <conversionType>707</conversionType> <currency>GBP</currency> </otherConvRateDetails> </refundCurrenciesInvolved> <segmentInfoGroup> <segmentInfo> <flightDate> <departureDate>160809</departureDate> <departureTime>1200</departureTime> <arrivalDate>160809</arrivalDate> <arrivalTime>1320</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>LHR</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>CDG</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> <operatingCompany>6X</operatingCompany> </companyDetails> <flightIdentification> <flightNumber>1001</flightNumber> <bookingClass>J</bookingClass> </flightIdentification> </segmentInfo> <couponInformationDetails> <couponDetails> <cpnNumber>1</cpnNumber> <cpnStatus>I</cpnStatus> </couponDetails> </couponInformationDetails> <fareQualifierDetails> <additionalFareDetails> <rateClass>JFLEX</rateClass> </additionalFareDetails> </fareQualifierDetails> </segmentInfoGroup> <segmentInfoGroup> <segmentInfo> <flightDate> <departureDate>160809</departureDate> <departureTime>1900</departureTime> <arrivalDate>160809</arrivalDate> <arrivalTime>2020</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>CDG</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>LHR</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> <operatingCompany>6X</operatingCompany> </companyDetails> <flightIdentification> <flightNumber>1002</flightNumber> <bookingClass>J</bookingClass> </flightIdentification> </segmentInfo> <couponInformationDetails> <couponDetails> <cpnNumber>2</cpnNumber> <cpnStatus>I</cpnStatus> </couponDetails> </couponInformationDetails> <fareQualifierDetails> <additionalFareDetails> <rateClass>JFLEX</rateClass> </additionalFareDetails> </fareQualifierDetails> </segmentInfoGroup> </ticketsRefunded> <refundCalculationInfoGroup> <ptcInfo> <valueQualifier>A</valueQualifier> </ptcInfo> <refundCategory> <priceTicketDetails> <indicators>C33</indicators> </priceTicketDetails> </refundCategory> <fareMonetaryInfo> <monetaryDetails> <typeQualifier>IBA</typeQualifier> <amount>500.00</amount> <currency>GBP</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>IEQ</typeQualifier> <amount>500.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>B</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>E</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BR</typeQualifier> <amount>490.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>ER</typeQualifier> <amount>490.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>NEQ</typeQualifier> <amount>10.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TR</typeQualifier> <amount>40.00</amount> <currency>GBP</currency> </otherMonetaryDetails> </fareMonetaryInfo> <additionalMonetaryInformation> <monetaryDetails> <typeQualifier>OA</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>OBP</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>ONR</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>OBN</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>OBR</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>RCP</typeQualifier> <amount>5.20</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TNT</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TRT</typeQualifier> <amount>15.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>NTA</typeQualifier> <amount>85.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TOT</typeQualifier> <amount>100.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>RES</typeQualifier> <amount>455.00</amount> <currency>GBP</currency> </otherMonetaryDetails> </additionalMonetaryInformation> <cancelCommissionFee> <discountPenaltyQualifier>NSF</discountPenaltyQualifier> <discountPenaltyDetails> <amountType>A</amountType> <amount>50</amount> <currency>GBP</currency> </discountPenaltyDetails> </cancelCommissionFee> <cancelCommissionFee> <discountPenaltyQualifier>702</discountPenaltyQualifier> <discountPenaltyDetails> <amountType>P</amountType> <rate>1.2</rate> <currency>GBP</currency> </discountPenaltyDetails> </cancelCommissionFee> <formOfPayment> <formOfPaymentDetails> <type>CA</type> <indicator>2</indicator> <creditCardNumber>121234345656</creditCardNumber> <expiryDate>1210</expiryDate> </formOfPaymentDetails> <otherFormOfPayment> <type>CA</type> <indicator>3</indicator> </otherFormOfPayment> </formOfPayment> <taxesInfoGroup> <ticketTaxDetails> <taxCategory>701</taxCategory> <taxDetails> <rate>12.00</rate> <currencyCode>GBP</currencyCode> <type>VZ</type> </taxDetails> </ticketTaxDetails> </taxesInfoGroup> </refundCalculationInfoGroup> </refundInfoPerPaxGroup> </DocRefund\_CalculateRefundReply>

## 5.6.3 Possible Errors

See "Error Messages" section.

* * *

## 5.7 Operation: Paper Ticket

Coupon selection is mandatory for paper ticket request with ticket number. One <couponInfo> element has to be filled per coupon to be refunded, with the coupon number.

For requests with ticket data the coupon selection is done from the coupon status provided.

In the example below, the ticket number only is provided. The coupon selection indicates the coupon 1 and 2 have to be refunded.

## 5.7.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<DocRefund\_CalculateRefund xmlns="http://xml.amadeus.com/TARFRQ\_16\_1\_1A"> <messageAction> <messageFunctionDetails> <messageFunction>136</messageFunction> </messageFunctionDetails> </messageAction> <refundInformationGroup> <transactionIdentifier> <itemNumberDetails> <number>1</number> </itemNumberDetails> </transactionIdentifier> <ticketInfoPerPaxGroup> <passengerReference> <segmentControlDetails> <quantity>1</quantity> </segmentControlDetails> </passengerReference> <ticketNumberGroup> <ticketNumberInfo> <documentDetails> <number>9993216549870</number> <type>T</type> </documentDetails> </ticketNumberInfo> <couponInfoGroup> <couponInfo> <couponDetails> <cpnNumber>1</cpnNumber> </couponDetails> </couponInfo> </couponInfoGroup> <couponInfoGroup> <couponInfo> <couponDetails> <cpnNumber>2</cpnNumber> </couponDetails> </couponInfo> </couponInfoGroup> </ticketNumberGroup> </ticketInfoPerPaxGroup> </refundInformationGroup> </DocRefund\_CalculateRefund>

## 5.7.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<DocRefund\_CalculateRefundReply xmlns="http://xml.amadeus.com/TARFRR\_16\_1\_1A"> <refundInfoPerPaxGroup> <travellerDetails> <passengerDetails> <referenceNumber>1</referenceNumber> <surname>PASSENGER</surname> <firstName>ONE</firstName> </passengerDetails> </travellerDetails> <ticketsRefunded> <primaryTicketNumber> <documentDetails> <number>9993216549870</number> <type>T</type> </documentDetails> </primaryTicketNumber> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> <informationType>7</informationType> </freeTextQualification> <freeText>REFUND PROCESSED BY ATC REFUND</freeText> </interactiveFreeText> <refundCurrenciesInvolved> <conversionRateDetails> <conversionType>705</conversionType> <currency>GBP</currency> </conversionRateDetails> <otherConvRateDetails> <conversionType>707</conversionType> <currency>GBP</currency> </otherConvRateDetails> </refundCurrenciesInvolved> <segmentInfoGroup> <segmentInfo> <flightDate> <departureDate>160809</departureDate> <departureTime>1200</departureTime> <arrivalDate>160809</arrivalDate> <arrivalTime>1320</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>LHR</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>CDG</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>BA</marketingCompany> <operatingCompany>BA</operatingCompany> </companyDetails> <flightIdentification> <flightNumber>1001</flightNumber> <bookingClass>J</bookingClass> </flightIdentification> </segmentInfo> <couponInformationDetails> <couponDetails> <cpnNumber>1</cpnNumber> <cpnStatus>I</cpnStatus> </couponDetails> </couponInformationDetails> <fareQualifierDetails> <additionalFareDetails> <rateClass>JFLEX</rateClass> </additionalFareDetails> </fareQualifierDetails> </segmentInfoGroup> <segmentInfoGroup> <segmentInfo> <flightDate> <departureDate>160809</departureDate> <departureTime>1900</departureTime> <arrivalDate>160809</arrivalDate> <arrivalTime>2020</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>CDG</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>LHR</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>BA</marketingCompany> <operatingCompany>BA</operatingCompany> </companyDetails> <flightIdentification> <flightNumber>1002</flightNumber> <bookingClass>J</bookingClass> </flightIdentification> </segmentInfo> <couponInformationDetails> <couponDetails> <cpnNumber>2</cpnNumber> <cpnStatus>I</cpnStatus> </couponDetails> </couponInformationDetails> <fareQualifierDetails> <additionalFareDetails> <rateClass>JFLEX</rateClass> </additionalFareDetails> </fareQualifierDetails> </segmentInfoGroup> </ticketsRefunded> <refundCalculationInfoGroup> <ptcInfo> <valueQualifier>A</valueQualifier> </ptcInfo> <refundCategory> <priceTicketDetails> <indicators>C33</indicators> </priceTicketDetails> </refundCategory> <fareMonetaryInfo> <monetaryDetails> <typeQualifier>IBA</typeQualifier> <amount>500.00</amount> <currency>GBP</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>IEQ</typeQualifier> <amount>500.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>B</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>E</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BR</typeQualifier> <amount>490.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>ER</typeQualifier> <amount>490.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>NEQ</typeQualifier> <amount>10.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TR</typeQualifier> <amount>440.00</amount> <currency>GBP</currency> </otherMonetaryDetails> </fareMonetaryInfo> <additionalMonetaryInformation> <monetaryDetails> <typeQualifier>OA</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>OBP</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>ONR</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>OBN</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>OBR</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>RCP</typeQualifier> <amount>5.20</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TNT</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TRT</typeQualifier> <amount>15.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>NTA</typeQualifier> <amount>85.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TOT</typeQualifier> <amount>100.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>RES</typeQualifier> <amount>455.00</amount> <currency>GBP</currency> </otherMonetaryDetails> </additionalMonetaryInformation> <cancelCommissionFee> <discountPenaltyQualifier>700</discountPenaltyQualifier> <discountPenaltyDetails> <amountType>A</amountType> <amount>50</amount> <currency>GBP</currency> </discountPenaltyDetails> </cancelCommissionFee> <cancelCommissionFee> <discountPenaltyQualifier>702</discountPenaltyQualifier> <discountPenaltyDetails> <amountType>P</amountType> <rate>1.2</rate> <currency>GBP</currency> </discountPenaltyDetails> </cancelCommissionFee> <formOfPayment> <formOfPaymentDetails> <type>CA</type> <indicator>2</indicator> <creditCardNumber>121234345656</creditCardNumber> <expiryDate>1210</expiryDate> </formOfPaymentDetails> <otherFormOfPayment> <type>CA</type> <indicator>3</indicator> </otherFormOfPayment> </formOfPayment> <taxesInfoGroup> <ticketTaxDetails> <taxCategory>701</taxCategory> <taxDetails> <rate>12.00</rate> <currencyCode>GBP</currencyCode> <type>VZ</type> </taxDetails> </ticketTaxDetails> </taxesInfoGroup> </refundCalculationInfoGroup> </refundInfoPerPaxGroup> </DocRefund\_CalculateRefundReply>

## 5.7.3 Possible Errors

* * *

## 5.8 Operation: Pricing Ticketing city

This option is used for back-pricing override.

## 5.8.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<DocRefund\_CalculateRefund xmlns="http://xml.amadeus.com/TARFRQ\_16\_1\_1A"> <messageAction> <messageFunctionDetails> <messageFunction>136</messageFunction> </messageFunctionDetails> </messageAction> <refundInformationGroup> <transactionIdentifier> <itemNumberDetails> <number>1</number> </itemNumberDetails> </transactionIdentifier> <ticketInfoPerPaxGroup> <passengerReference> <segmentControlDetails> <quantity>1</quantity> </segmentControlDetails> </passengerReference> <ticketNumberGroup> <ticketNumberInfo> <documentDetails> <number>9993216549870</number> <type>T</type> </documentDetails> </ticketNumberInfo> </ticketNumberGroup> </ticketInfoPerPaxGroup> </refundInformationGroup> <pricingOptionGroup> <pricingOptionKey> <pricingOptionKey>POT</pricingOptionKey> </pricingOptionKey> <locationInformation> <locationType>POT</locationType> <firstLocationDetails> <code>BKK</code> </firstLocationDetails> </locationInformation> </pricingOptionGroup> </DocRefund\_CalculateRefund>

## 5.8.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.8.3 Possible Errors

* * *

## 5.9 Operation: Providing ticket data

The request is done with a <messageFunction> 135. Ticket data is provided in the request, the product will not perform any ticket display.

## 5.9.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<DocRefund\_CalculateRefund xmlns="http://xml.amadeus.com/TARFRQ\_16\_1\_1A"> <messageAction> <messageFunctionDetails> <messageFunction>135</messageFunction> </messageFunctionDetails> </messageAction> <passengerInfoGroup> <segmentRepetitionControl> <segmentControlDetails> <quantity>1</quantity> <numberOfUnits>1</numberOfUnits> </segmentControlDetails> </segmentRepetitionControl> <travellersID> <travellerDetails> <measurementValue>1</measurementValue> <surname>PASSENGER</surname> <firstName>ONE</firstName> </travellerDetails> </travellersID> <discountPtc> <valueQualifier>A</valueQualifier> </discountPtc> </passengerInfoGroup> <refundInformationGroup> <transactionIdentifier> <itemNumberDetails> <number>1</number> </itemNumberDetails> </transactionIdentifier> <ticketInfoPerPaxGroup> <passengerReference> <segmentControlDetails> <quantity>1</quantity> </segmentControlDetails> </passengerReference> <ticketingAgencyId> <originIdentification> <originatorId>12345678</originatorId> <inHouseIdentification1>LON6X0980</inHouseIdentification1> </originIdentification> <originatorTypeCode>A</originatorTypeCode> </ticketingAgencyId> <additionalTicketingAgencyInfo> <locationDetails> <trueLocationId>LON</trueLocationId> </locationDetails> <countryCode>UK</countryCode> <systemCode>6X</systemCode> </additionalTicketingAgencyInfo> <monetaryInfo> <monetaryDetails> <typeQualifier>B</typeQualifier> <amount>500</amount> <currency>GBP</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>M</typeQualifier> <amount>600</amount> <currency>GBP</currency> </otherMonetaryDetails> </monetaryInfo> <taxInfo> <taxCategory>700</taxCategory> <taxDetails> <rate>10.00</rate> <currencyCode>GBP</currencyCode> <type>VZ</type> </taxDetails> <taxDetails> <rate>90.00</rate> <currencyCode>GBP</currencyCode> <type>AB</type> </taxDetails> </taxInfo> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>4</textSubjectQualifier> <informationType>5</informationType> </freeTextQualification> <freeText>96915999</freeText> </interactiveFreeText> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>4</textSubjectQualifier> <informationType>39</informationType> </freeTextQualification> <freeText>LONDON UK</freeText> <freeText>BRITISH AIRWAYS</freeText> </interactiveFreeText> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>4</textSubjectQualifier> <informationType>15</informationType> <status>N</status> </freeTextQualification> <freeText>SYD 6X(EH)LON M/IT 6X(EH)SYD M/IT END</freeText> </interactiveFreeText> <formOfPayment> <formOfPaymentDetails> <type>CC</type> <indicator>3</indicator> <amount>600</amount> <creditCardNumber>121234345656</creditCardNumber> <expiryDate>1210</expiryDate> <approvalCode>1616</approvalCode> </formOfPaymentDetails> </formOfPayment> <ticketNumberGroup> <ticketNumberInfo> <documentDetails> <number>9993216549870</number> <type>T</type> </documentDetails> </ticketNumberInfo> <issueIdentifier> <dataTypeInformation> <type>F</type> </dataTypeInformation> </issueIdentifier> <ticketingDetails> <productDateTimeDetails> <departureDate>120609</departureDate> </productDateTimeDetails> <companyNumberDetails> <identifier>6X</identifier> </companyNumberDetails> <locationDetails> <city>LON</city> </locationDetails> </ticketingDetails> <couponInfoGroup> <couponInfo> <couponDetails> <cpnNumber>1</cpnNumber> <cpnStatus>I</cpnStatus> <cpnExchangeMedia>E</cpnExchangeMedia> </couponDetails> </couponInfo> <segmentInfo> <flightDate> <departureDate>160809</departureDate> <departureTime>1200</departureTime> <arrivalDate>160809</arrivalDate> <arrivalTime>1320</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>LHR</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>CDG</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> <operatingCompany>6X</operatingCompany> </companyDetails> <flightIdentification> <flightNumber>1001</flightNumber> <bookingClass>J</bookingClass> </flightIdentification> </segmentInfo> <couponPricingSubsequent> <fareBasisDetails> <rateTariffClass>JFLEX</rateTariffClass> <rateTariffIndicator>INT</rateTariffIndicator> </fareBasisDetails> </couponPricingSubsequent> <couponDateTimeInfo> <dateAndTimeDetails> <qualifier>A</qualifier> <date>160809</date> </dateAndTimeDetails> <dateAndTimeDetails> <qualifier>B</qualifier> <date>160809</date> </dateAndTimeDetails> </couponDateTimeInfo> </couponInfoGroup> <couponInfoGroup> <couponInfo> <couponDetails> <cpnNumber>2</cpnNumber> <cpnStatus>I</cpnStatus> <cpnExchangeMedia>E</cpnExchangeMedia> </couponDetails> </couponInfo> <segmentInfo> <flightDate> <departureDate>160809</departureDate> <departureTime>1900</departureTime> <arrivalDate>160809</arrivalDate> <arrivalTime>2020</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>CDG</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>LHR</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> <operatingCompany>6X</operatingCompany> </companyDetails> <flightIdentification> <flightNumber>1002</flightNumber> <bookingClass>J</bookingClass> </flightIdentification> </segmentInfo> <couponPricingSubsequent> <fareBasisDetails> <rateTariffClass>JFLEX</rateTariffClass> <rateTariffIndicator>INT</rateTariffIndicator> </fareBasisDetails> </couponPricingSubsequent> <couponDateTimeInfo> <dateAndTimeDetails> <qualifier>A</qualifier> <date>160809</date> </dateAndTimeDetails> <dateAndTimeDetails> <qualifier>B</qualifier> <date>160809</date> </dateAndTimeDetails> </couponDateTimeInfo> </couponInfoGroup> </ticketNumberGroup> </ticketInfoPerPaxGroup> </refundInformationGroup> </DocRefund\_CalculateRefund>

## 5.9.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<DocRefund\_CalculateRefundReply xmlns="http://xml.amadeus.com/TARFRR\_16\_1\_1A"> <refundInfoPerPaxGroup> <travellerDetails> <passengerDetails> <referenceNumber>1</referenceNumber> <surname>PASSENGER</surname> <firstName>ONE</firstName> </passengerDetails> </travellerDetails> <ticketsRefunded> <primaryTicketNumber> <documentDetails> <number>9993216549870</number> <type>T</type> </documentDetails> </primaryTicketNumber> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> <informationType>7</informationType> </freeTextQualification> <freeText>REFUND PROCESSED BY ATC REFUND</freeText> </interactiveFreeText> <refundCurrenciesInvolved> <conversionRateDetails> <conversionType>705</conversionType> <currency>GBP</currency> </conversionRateDetails> <otherConvRateDetails> <conversionType>707</conversionType> <currency>GBP</currency> </otherConvRateDetails> </refundCurrenciesInvolved> <segmentInfoGroup> <segmentInfo> <flightDate> <departureDate>160809</departureDate> <departureTime>1200</departureTime> <arrivalDate>160809</arrivalDate> <arrivalTime>1320</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>LHR</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>CDG</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> <operatingCompany>6X</operatingCompany> </companyDetails> <flightIdentification> <flightNumber>1001</flightNumber> <bookingClass>J</bookingClass> </flightIdentification> </segmentInfo> <couponInformationDetails> <couponDetails> <cpnNumber>1</cpnNumber> <cpnStatus>I</cpnStatus> </couponDetails> <otherCouponDetails></otherCouponDetails> <otherCouponDetails> <cpnNumber>I</cpnNumber> </otherCouponDetails> </couponInformationDetails> <fareQualifierDetails> <additionalFareDetails> <rateClass>JFLEX</rateClass> </additionalFareDetails> </fareQualifierDetails> </segmentInfoGroup> <segmentInfoGroup> <segmentInfo> <flightDate> <departureDate>160809</departureDate> <departureTime>1900</departureTime> <arrivalDate>160809</arrivalDate> <arrivalTime>2020</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>CDG</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>LHR</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> <operatingCompany>6X</operatingCompany> </companyDetails> <flightIdentification> <flightNumber>1002</flightNumber> <bookingClass>J</bookingClass> </flightIdentification> </segmentInfo> <couponInformationDetails> <couponDetails> <cpnNumber>2</cpnNumber> <cpnStatus>I</cpnStatus> </couponDetails> <otherCouponDetails></otherCouponDetails> <otherCouponDetails> <cpnNumber>I</cpnNumber> </otherCouponDetails> </couponInformationDetails> <fareQualifierDetails> <additionalFareDetails> <rateClass>JFLEX</rateClass> </additionalFareDetails> </fareQualifierDetails> </segmentInfoGroup> </ticketsRefunded> <refundCalculationInfoGroup> <ptcInfo> <valueQualifier>A</valueQualifier> </ptcInfo> <refundCategory> <priceTicketDetails> <indicators>C33</indicators> </priceTicketDetails> </refundCategory> <fareMonetaryInfo> <monetaryDetails> <typeQualifier>I6X</typeQualifier> <amount>500.00</amount> <currency>GBP</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>IEQ</typeQualifier> <amount>500.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>B</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>E</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BR</typeQualifier> <amount>490.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>ER</typeQualifier> <amount>490.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>NEQ</typeQualifier> <amount>10.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TR</typeQualifier> <amount>440.00</amount> <currency>GBP</currency> </otherMonetaryDetails> </fareMonetaryInfo> <additionalMonetaryInformation> <monetaryDetails> <typeQualifier>OA</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>OBP</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>ONR</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>OBN</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>OBR</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>RCP</typeQualifier> <amount>5.20</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TNT</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TRT</typeQualifier> <amount>15.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>NTA</typeQualifier> <amount>85.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TOT</typeQualifier> <amount>100.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>RES</typeQualifier> <amount>455.00</amount> <currency>GBP</currency> </otherMonetaryDetails> </additionalMonetaryInformation> <cancelCommissionFee> <discountPenaltyQualifier>700</discountPenaltyQualifier> <discountPenaltyDetails> <amountType>A</amountType> <amount>50</amount> <currency>GBP</currency> </discountPenaltyDetails> </cancelCommissionFee> <cancelCommissionFee> <discountPenaltyQualifier>702</discountPenaltyQualifier> <discountPenaltyDetails> <amountType>P</amountType> <rate>1.2</rate> <currency>GBP</currency> </discountPenaltyDetails> </cancelCommissionFee> <formOfPayment> <formOfPaymentDetails> <type>CA</type> <indicator>2</indicator> <creditCardNumber>121234345656</creditCardNumber> <expiryDate>1210</expiryDate> </formOfPaymentDetails> <otherFormOfPayment> <type>CA</type> <indicator>3</indicator> </otherFormOfPayment> </formOfPayment> <taxesInfoGroup> <ticketTaxDetails> <taxCategory>701</taxCategory> <taxDetails> <rate>12.00</rate> <currencyCode>GBP</currencyCode> <type>VZ</type> </taxDetails> </ticketTaxDetails> </taxesInfoGroup> </refundCalculationInfoGroup> </refundInfoPerPaxGroup> </DocRefund\_CalculateRefundReply>

## 5.9.3 Possible Errors

* * *

## 5.10 Operation: Providing ticket number

The request is done with a <messageFunction> 136. Only ticket numbers are provided and the product has to perform a ticket display to retrieve the ticket data.

## 5.10.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<DocRefund\_CalculateRefund xmlns="http://xml.amadeus.com/TARFRQ\_16\_1\_1A"> <messageAction> <messageFunctionDetails> <messageFunction>136</messageFunction> </messageFunctionDetails> </messageAction> <refundInformationGroup> <transactionIdentifier> <itemNumberDetails> <number>1</number> </itemNumberDetails> </transactionIdentifier> <ticketInfoPerPaxGroup> <passengerReference> <segmentControlDetails> <quantity>1</quantity> </segmentControlDetails> </passengerReference> <ticketNumberGroup> <ticketNumberInfo> <documentDetails> <number>9993216549870</number> <type>T</type> </documentDetails> </ticketNumberInfo> </ticketNumberGroup> </ticketInfoPerPaxGroup> </refundInformationGroup> </DocRefund\_CalculateRefund>

## 5.10.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<DocRefund\_CalculateRefundReply xmlns="http://xml.amadeus.com/TARFRR\_16\_1\_1A"> <refundInfoPerPaxGroup> <travellerDetails> <passengerDetails> <referenceNumber>1</referenceNumber> <surname>PASSENGER</surname> <firstName>ONE</firstName> </passengerDetails> </travellerDetails> <ticketsRefunded> <primaryTicketNumber> <documentDetails> <number>9993216549870</number> <type>T</type> </documentDetails> </primaryTicketNumber> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> <informationType>7</informationType> </freeTextQualification> <freeText>REFUND PROCESSED BY ATC REFUND</freeText> </interactiveFreeText> <refundCurrenciesInvolved> <conversionRateDetails> <conversionType>705</conversionType> <currency>GBP</currency> </conversionRateDetails> <otherConvRateDetails> <conversionType>707</conversionType> <currency>GBP</currency> </otherConvRateDetails> </refundCurrenciesInvolved> <segmentInfoGroup> <segmentInfo> <flightDate> <departureDate>160809</departureDate> <departureTime>1200</departureTime> <arrivalDate>160809</arrivalDate> <arrivalTime>1320</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>LHR</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>CDG</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> <operatingCompany>6X</operatingCompany> </companyDetails> <flightIdentification> <flightNumber>1001</flightNumber> <bookingClass>J</bookingClass> </flightIdentification> </segmentInfo> <couponInformationDetails> <couponDetails> <cpnNumber>1</cpnNumber> <cpnStatus>I</cpnStatus> </couponDetails> </couponInformationDetails> <fareQualifierDetails> <additionalFareDetails> <rateClass>JFLEX</rateClass> </additionalFareDetails> </fareQualifierDetails> </segmentInfoGroup> <segmentInfoGroup> <segmentInfo> <flightDate> <departureDate>160809</departureDate> <departureTime>1900</departureTime> <arrivalDate>160809</arrivalDate> <arrivalTime>2020</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>CDG</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>LHR</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> <operatingCompany>6X</operatingCompany> </companyDetails> <flightIdentification> <flightNumber>1002</flightNumber> <bookingClass>J</bookingClass> </flightIdentification> </segmentInfo> <couponInformationDetails> <couponDetails> <cpnNumber>1</cpnNumber> <cpnStatus>I</cpnStatus> </couponDetails> </couponInformationDetails> <fareQualifierDetails> <additionalFareDetails> <rateClass>JFLEX</rateClass> </additionalFareDetails> </fareQualifierDetails> </segmentInfoGroup> </ticketsRefunded> <refundCalculationInfoGroup> <ptcInfo> <valueQualifier>A</valueQualifier> </ptcInfo> <refundCategory> <priceTicketDetails> <indicators>C33</indicators> </priceTicketDetails> </refundCategory> <fareMonetaryInfo> <monetaryDetails> <typeQualifier>I6X</typeQualifier> <amount>500.00</amount> <currency>GBP</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>IEQ</typeQualifier> <amount>500.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>B</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>E</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BR</typeQualifier> <amount>490.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>ER</typeQualifier> <amount>490.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>NEQ</typeQualifier> <amount>10.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TR</typeQualifier> <amount>440.00</amount> <currency>GBP</currency> </otherMonetaryDetails> </fareMonetaryInfo> <additionalMonetaryInformation> <monetaryDetails> <typeQualifier>OA</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>OBP</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>ONR</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>OBN</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>OBR</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>RCP</typeQualifier> <amount>5.20</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TNT</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TRT</typeQualifier> <amount>15.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>NTA</typeQualifier> <amount>85.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TOT</typeQualifier> <amount>100.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>RES</typeQualifier> <amount>455.00</amount> <currency>GBP</currency> </otherMonetaryDetails> </additionalMonetaryInformation> <cancelCommissionFee> <discountPenaltyQualifier>700</discountPenaltyQualifier> <discountPenaltyDetails> <amountType>A</amountType> <amount>50</amount> <currency>GBP</currency> </discountPenaltyDetails> </cancelCommissionFee> <cancelCommissionFee> <discountPenaltyQualifier>702</discountPenaltyQualifier> <discountPenaltyDetails> <amountType>P</amountType> <rate>1.2</rate> <currency>GBP</currency> </discountPenaltyDetails> </cancelCommissionFee> <formOfPayment> <formOfPaymentDetails> <type>CA</type> <indicator>2</indicator> <creditCardNumber>121234345656</creditCardNumber> <expiryDate>1210</expiryDate> </formOfPaymentDetails> <otherFormOfPayment> <type>CA</type> <indicator>3</indicator> </otherFormOfPayment> </formOfPayment> <taxesInfoGroup> <ticketTaxDetails> <taxCategory>701</taxCategory> <taxDetails> <rate>12.00</rate> <currencyCode>GBP</currencyCode> <type>VZ</type> </taxDetails> </ticketTaxDetails> </taxesInfoGroup> </refundCalculationInfoGroup> </refundInfoPerPaxGroup> </DocRefund\_CalculateRefundReply>

## 5.10.3 Possible Errors

* * *

## 5.11 Operation: Redemption or Upgraded ticket

This operation describes the ATC refund reply, when refund is initiated on a Redemption or Upgraded ticket. In this case, miles information are provided.

-   Fare paid in miles is displayed in:
    -   _<refundInfoPerPaxGroup>/<ticketsRefunded>/<refundCalculationInfoGroup>/<fareMonetaryInfo>/<monetaryDetails>/<typeQualifier>: **MFP**_
-   Fare used in miles is displayed in:
    -   __<refundInfoPerPaxGroup>/<ticketsRefunded>/<refundCalculationInfoGroup>/<fareMonetaryInfo>/<monetaryDetails>/<typeQualifier>:_ **MFU**_
-   Fare refund in miles is displayed in:
    -   __<refundInfoPerPaxGroup>/<ticketsRefunded>/<refundCalculationInfoGroup>/<fareMonetaryInfo>/<monetaryDetails>/<typeQualifier>:_ **MFR**_
-   Refund total in miles is displayed in:
    -   __<refundInfoPerPaxGroup>/<ticketsRefunded>/<refundCalculationInfoGroup>/<fareMonetaryInfo>/<monetaryDetails>/<typeQualifier>:_ **MRT**_
-   Cancellation penalty in miles is displayed in:
    -   _<refundInfoPerPaxGroup>/<_ticketsRefunded>_/<refundCalculationInfoGroup>/<cancelCommissionFee>/<DiscountPenaltyQualifier>: **MCP**_
-   Usage under itimized condition, please check with implementation team

## 5.11.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<DocRefund\_CalculateRefund xmlns="http://xml.amadeus.com/TARFRQ\_16\_1\_1A"> <messageAction> <messageFunctionDetails> <messageFunction>136</messageFunction> </messageFunctionDetails> </messageAction> <refundInformationGroup> <transactionIdentifier> <itemNumberDetails> <number>1</number> </itemNumberDetails> </transactionIdentifier> <ticketInfoPerPaxGroup> <passengerReference> <segmentControlDetails> <quantity>1</quantity> </segmentControlDetails> </passengerReference> <ticketNumberGroup> <ticketNumberInfo> <documentDetails> <number>9993216549870</number> <type>T</type> </documentDetails> </ticketNumberInfo> </ticketNumberGroup> </ticketInfoPerPaxGroup> </refundInformationGroup> </DocRefund\_CalculateRefund>

## 5.11.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<DocRefund\_CalculateRefundReply xmlns="http://xml.amadeus.com/TARFRR\_16\_1\_1A"> <refundInfoPerPaxGroup> <travellerDetails> <passengerDetails> <referenceNumber>1</referenceNumber> <surname>PASSENGER</surname> <firstName>ONE</firstName> </passengerDetails> </travellerDetails> <ticketsRefunded> <primaryTicketNumber> <documentDetails> <number>9993216549870</number> <type>T</type> </documentDetails> </primaryTicketNumber> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> <informationType>7</informationType> </freeTextQualification> <freeText>REFUND PROCESSED BY ATC REFUND</freeText> </interactiveFreeText> <refundCurrenciesInvolved> <conversionRateDetails> <conversionType>705</conversionType> <currency>GBP</currency> </conversionRateDetails> <otherConvRateDetails> <conversionType>707</conversionType> <currency>GBP</currency> </otherConvRateDetails> </refundCurrenciesInvolved> <segmentInfoGroup> <segmentInfo> <flightDate> <departureDate>160809</departureDate> <departureTime>1200</departureTime> <arrivalDate>160809</arrivalDate> <arrivalTime>1320</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>LHR</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>CDG</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> <operatingCompany>6X</operatingCompany> </companyDetails> <flightIdentification> <flightNumber>1001</flightNumber> <bookingClass>J</bookingClass> </flightIdentification> </segmentInfo> <couponInformationDetails> <couponDetails> <cpnNumber>1</cpnNumber> <cpnStatus>I</cpnStatus> </couponDetails> </couponInformationDetails> <fareQualifierDetails> <additionalFareDetails> <rateClass>JFLEX</rateClass> </additionalFareDetails> </fareQualifierDetails> </segmentInfoGroup> <segmentInfoGroup> <segmentInfo> <flightDate> <departureDate>160809</departureDate> <departureTime>1900</departureTime> <arrivalDate>160809</arrivalDate> <arrivalTime>2020</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>CDG</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>LHR</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> <operatingCompany>6X</operatingCompany> </companyDetails> <flightIdentification> <flightNumber>1002</flightNumber> <bookingClass>J</bookingClass> </flightIdentification> </segmentInfo> <couponInformationDetails> <couponDetails> <cpnNumber>2</cpnNumber> <cpnStatus>I</cpnStatus> </couponDetails> </couponInformationDetails> <fareQualifierDetails> <additionalFareDetails> <rateClass>JFLEX</rateClass> </additionalFareDetails> </fareQualifierDetails> </segmentInfoGroup> </ticketsRefunded> <refundCalculationInfoGroup> <ptcInfo> <valueQualifier>A</valueQualifier> </ptcInfo> <refundCategory> <priceTicketDetails> <indicators>C33</indicators> </priceTicketDetails> </refundCategory> <fareMonetaryInfo> <monetaryDetails> <typeQualifier>IBA</typeQualifier> <amount>500.00</amount> <currency>GBP</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>IEQ</typeQualifier> <amount>500.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>B</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>E</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BR</typeQualifier> <amount>490.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>ER</typeQualifier> <amount>490.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>NEQ</typeQualifier> <amount>10.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TR</typeQualifier> <amount>40.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>MFP</typeQualifier> <amount>30000</amount> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>MFU</typeQualifier> <amount>0</amount> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>MFR</typeQualifier> <amount>30000</amount> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>MRT</typeQualifier> <amount>20000</amount> </otherMonetaryDetails> </fareMonetaryInfo> <additionalMonetaryInformation> <monetaryDetails> <typeQualifier>OA</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>OBP</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>ONR</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>OBN</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>OBR</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>RCP</typeQualifier> <amount>5.20</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TNT</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TRT</typeQualifier> <amount>15.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>NTA</typeQualifier> <amount>85.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TOT</typeQualifier> <amount>100.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>RES</typeQualifier> <amount>455.00</amount> <currency>GBP</currency> </otherMonetaryDetails> </additionalMonetaryInformation> <cancelCommissionFee> <discountPenaltyQualifier>700</discountPenaltyQualifier> <discountPenaltyDetails> <amountType>A</amountType> <amount>50</amount> <currency>GBP</currency> </discountPenaltyDetails> </cancelCommissionFee> <cancelCommissionFee> <discountPenaltyQualifier>MCP</discountPenaltyQualifier> <discountPenaltyDetails> <amountType>A</amountType> <amount>10000</amount> </discountPenaltyDetails> </cancelCommissionFee> <cancelCommissionFee> <discountPenaltyQualifier>702</discountPenaltyQualifier> <discountPenaltyDetails> <amountType>P</amountType> <rate>1.2</rate> <currency>GBP</currency> </discountPenaltyDetails> </cancelCommissionFee> <formOfPayment> <formOfPaymentDetails> <type>CA</type> <indicator>2</indicator> <creditCardNumber>121234345656</creditCardNumber> <expiryDate>1210</expiryDate> </formOfPaymentDetails> <otherFormOfPayment> <type>CA</type> <indicator>3</indicator> </otherFormOfPayment> </formOfPayment> <taxesInfoGroup> <ticketTaxDetails> <taxCategory>701</taxCategory> <taxDetails> <rate>12.002</rate> <countryCode>GBP</countryCode> <currencyCode>VZ</currencyCode> </taxDetails> </ticketTaxDetails> </taxesInfoGroup> </refundCalculationInfoGroup> </refundInfoPerPaxGroup> </DocRefund\_CalculateRefundReply>

## 5.11.3 Possible Errors

See "Error Messages" section.

* * *

## 5.12 Operation: Waive Penalty

WP(Waive Penalty) option allows waiving penalty in ATC voluntary refund transaction and it is received in STX segment of TARFRQ. Penalty amount is ignored and zero penalty is returned, therefore resulting in the penalty amount being waived. Penalty is waived on the entire ticket and takes precedence over Dynamic Waiver filing.

## 5.12.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<DocRefund\_CalculateRefund xmlns="http://xml.amadeus.com/TARFRQ\_16\_1\_1A"> <messageAction> <messageFunctionDetails> <messageFunction>136</messageFunction> </messageFunctionDetails> </messageAction> <originatorRequestDetails> <deliveringSystem> <companyId>00</companyId> <locationId>MUC</locationId> </deliveringSystem> <originIdentification> <originatorId>12345675</originatorId> <inHouseIdentification1>NCE6X0980</inHouseIdentification1> <inHouseIdentification2>184655</inHouseIdentification2> </originIdentification> <locationDetails> <trueLocationId>NCE</trueLocationId> <trueLocation>NCE</trueLocation> </locationDetails> <cascadingSystem> <companyId>6X</companyId> </cascadingSystem> <originatorTypeCode>A</originatorTypeCode> <originDetails> <codedCountry>FR</codedCountry> <codedCurrency>EUR</codedCurrency> <codedLanguage>EN</codedLanguage> </originDetails> <originator>A9999WSSU</originator> <partyIdentification>1A</partyIdentification> </originatorRequestDetails> <passengerInfoGroup> <segmentRepetitionControl> <segmentControlDetails> <quantity>1</quantity> <numberOfUnits>1</numberOfUnits> </segmentControlDetails> </segmentRepetitionControl> <travellersID> <travellerDetails> <measurementValue>1</measurementValue> </travellerDetails> </travellersID> <discountPtc> <valueQualifier>C</valueQualifier> </discountPtc> </passengerInfoGroup> <refundInformationGroup> <transactionIdentifier> <itemNumberDetails> <number>1</number> </itemNumberDetails> </transactionIdentifier> <ticketInfoPerPaxGroup> <passengerReference> <segmentControlDetails> <quantity>1</quantity> </segmentControlDetails> </passengerReference> <actionDetails> <statusDetails> <indicator>WP</indicator> </statusDetails> </actionDetails> <ticketNumberGroup> <ticketNumberInfo> <documentDetails> <number>1722402140214</number> <type>T</type> </documentDetails> </ticketNumberInfo> </ticketNumberGroup> </ticketInfoPerPaxGroup> </refundInformationGroup> </DocRefund\_CalculateRefund>

## 5.12.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<DocRefund\_CalculateRefundReply xmlns="http://xml.amadeus.com/TARFRR\_16\_1\_1A"> <refundInfoPerPaxGroup> <travellerDetails> <passengerDetails> <referenceNumber>1</referenceNumber> <measurementValue>1</measurementValue> <surname>ASBA</surname> <firstName>ASDKAS</firstName> </passengerDetails> </travellerDetails> <ticketsRefunded> <primaryTicketNumber> <documentDetails> <number>1722402140214</number> <type>T</type> </documentDetails> </primaryTicketNumber> <refundCurrenciesInvolved> <conversionRateDetails> <conversionType>707</conversionType> <currency>EUR</currency> </conversionRateDetails> <otherConvRateDetails> <rateType>BSR</rateType> <convertedValueAmount>1.19485752</convertedValueAmount> </otherConvRateDetails> <otherConvRateDetails> <conversionType>705</conversionType> <currency>GBP</currency> </otherConvRateDetails> </refundCurrenciesInvolved> <ticketingDetails> <priceTicketDetails> <indicators>I</indicators> </priceTicketDetails> <otherLocationDetails> <country>FR</country> </otherLocationDetails> </ticketingDetails> <segmentInfoGroup> <segmentInfo> <flightDate> <departureDate>200225</departureDate> <departureTime>0800</departureTime> <arrivalDate>200225</arrivalDate> <arrivalTime>1100</arrivalTime> </flightDate> <boardPointDetails> <trueLocationId>LHR</trueLocationId> </boardPointDetails> <offpointDetails> <trueLocationId>CDG</trueLocationId> </offpointDetails> <companyDetails> <marketingCompany>6X</marketingCompany> </companyDetails> <flightIdentification> <flightNumber>3913</flightNumber> <bookingClass>Y</bookingClass> </flightIdentification> </segmentInfo> <couponInformationDetails> <couponDetails> <cpnNumber>1</cpnNumber> <cpnStatus>R</cpnStatus> </couponDetails> </couponInformationDetails> </segmentInfoGroup> </ticketsRefunded> <refundCalculationInfoGroup> <ptcInfo> <valueQualifier>A</valueQualifier> </ptcInfo> <refundCategory> <priceTicketDetails> <indicators>SI</indicators> <indicators>IAT</indicators> <indicators>C33</indicators> </priceTicketDetails> </refundCategory> <fareMonetaryInfo> <monetaryDetails> <typeQualifier>IBA</typeQualifier> <amount>149.00</amount> <currency>GBP</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>REQ</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>RTA</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>RTO</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>RGT</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TNT</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>RBA</typeQualifier> <amount>0.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>NRA</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>NRC</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>IEQ</typeQualifier> <amount>178.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>ITO</typeQualifier> <amount>289.21</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>ITA</typeQualifier> <amount>111.21</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>NTA</typeQualifier> <amount>17.80</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>ER</typeQualifier> <amount>178.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BTA</typeQualifier> <amount>-93.41</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BTO</typeQualifier> <amount>-271.41</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BGT</typeQualifier> <amount>-271.41</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>BR</typeQualifier> <amount>149.00</amount> <currency>GBP</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TOT</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </otherMonetaryDetails> <otherMonetaryDetails> <typeQualifier>TR</typeQualifier> <amount>178.00</amount> <currency>EUR</currency> </otherMonetaryDetails> </fareMonetaryInfo> <additionalMonetaryInformation> <monetaryDetails> <typeQualifier>TRT</typeQualifier> <amount>93.41</amount> <currency>EUR</currency> </monetaryDetails> <otherMonetaryDetails> <typeQualifier>RES</typeQualifier> <amount>271.41</amount> <currency>EUR</currency> </otherMonetaryDetails> </additionalMonetaryInformation> <cancelCommissionFee> <discountPenaltyQualifier>700</discountPenaltyQualifier> <discountPenaltyDetails> <amountType>A</amountType> <amount>0.00</amount> <currency>EUR</currency> </discountPenaltyDetails> </cancelCommissionFee> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>4</textSubjectQualifier> <informationType>10</informationType> </freeTextQualification> <freeText>ATCFEEWAIVED</freeText> </interactiveFreeText> <formOfPayment> <formOfPaymentDetails> <type>CA</type> </formOfPaymentDetails> </formOfPayment> <taxesInfoGroup> <ticketTaxDetails> <taxCategory>705</taxCategory> <taxDetails> <rate>15.54</rate> <countryCode>AD</countryCode> <currencyCode>EUR</currencyCode> <type>GB</type> <type>Q</type> </taxDetails> <taxDetails> <rate>27.87</rate> <countryCode>AS</countryCode> <currencyCode>EUR</currencyCode> <type>UB</type> <type>Q</type> </taxDetails> <taxDetails> <rate>50.00</rate> <countryCode>AC</countryCode> <currencyCode>EUR</currencyCode> <type>YQ</type> <type>Q</type> </taxDetails> </ticketTaxDetails> </taxesInfoGroup> <taxesInfoGroup> <ticketTaxDetails> <taxCategory>NR</taxCategory> <taxDetails> <rate>17.80</rate> <countryCode>DC</countryCode> <currencyCode>EUR</currencyCode> <type>DU</type> <type>O</type> </taxDetails> </ticketTaxDetails> </taxesInfoGroup> </refundCalculationInfoGroup> </refundInfoPerPaxGroup> </DocRefund\_CalculateRefundReply>

## 5.12.3 Possible Errors

When WP is used in input but there is no penalty from Category 33. Following reject message is returned to request agent to proceed standard refund: NO PENALTY FILED IN CATEGORY 33 - PLEASE PROCEED WITH STANDARD REFUND.

* * *