---
url: "https://developers.amadeus.com/api-library/soap/functional-doc/2681/doc-read/142318?serviceVersion=3.2"
download_url: "https://developers.amadeus.com/PAS-EAS/api/download/comp/4d4ad2cb456c02633f463a055ab70584/142318/upload_3156737899537275712.html"
title: "HTML_UG_WBS_PAY_GetVirtualCardDetails_ _03.2_011"
source: "amadeus"
service_id: "2681"
service_name: "PAY_GetVirtualCardDetails"
version: "3.2"
document_id: "142318"
doc_version: "3.2"
doc_type: "User guide"
file_format: "HTML"
scraped_at: "2026-07-15T10:31:50.521Z"
---
# Function: PAY\_GetVirtualCardDetails

* * *

## 1 Overview

PAY\_GetVirtualCardDetail is composed of:

-   Query: PAY\_GetVirtualCardDetailsRQ
-   Reply: PAY\_GetVirtualCardDetailsRS

This guide explains how to use the functions.

## 1.1 Supported Operations

The service allows an Customer to retrieve the following information:

-   Virtual Card details
-   Transaction history
-   List of Authorization 
-   List of Settlement
-   List of Refund 
-   Notification details and status
-   Reporting Info
-   Reservartion details
-   Payer details

## 1.2 Limitations

A Customer can only retrieves details of the card that has been created in the same sign-in office

Agent can see the full card number if he/she has the approriate permission. Otherwise, the card number is concealed.

Due to limitation of the provider interface, the service can retrieve at most 100 transaction items and 50 notification items linked to a virtual card at the same time.

## 1.3 Unsupported Operations

To retrieve details of a card not being created in Customer's sign-in office.

## 1.4 Prerequisites

This web service requires local ACO approval for customers usage. The ACO as per defined process of implementation is responsible to contact the NBU Payment Team Point Of Contact to notify the interest of the customer and ensure that all contractual actions and set up are done before letting the customer start testings.

Your must be a user of Amadeus payment virtual cards and has the configurations required in the Amadeus payment system.

This service requires you to have at least one of following LSS permissions:

-   GENERATE\_VCN
-   ADMIN\_GENERATE\_VCN
-   VCN\_DETAIL\_FULL\_VIEW

You can access to the details of all the cards created in your sign-in office. However, you can see the full card number only if the card has been created by yourself or you have the LSS permission VCN\_DETAIL\_FULL\_VIEW. In addition, VCN\_DETAIL\_FULL\_VIEW allows user to view all the card numbers created in his own organization. In any other case, the card number is concealed.

## 2 Building A Query

The structure of the xml message is defined as follows:

-   Path: XML path for the element
-   Status: Mandatory or Optional
-   Repetition: the number of repetitions allowed for this element
-   Explanation: Explanation of the meaning of the element
-   Value: type of value for the element (only for attribute and simple types)
    -   AN = Alphanumeric characters
    -   A = Alphabetical characters
    -   N = Numerical characters
    -   String = \[0-9\]\[A-Za-z\]\[\_- \]

The query AMA\_PAY\_GetVirtualCardDetailRQ contains the card reference and information filter. It is composed of 3 groups:

Path

Status

Repetition

Explanation

Value

<References>

Mandatory

1

Used to enter Amadeus virtual card reference

<DisplayFilter>

Optional

1

Used to select the types of information to retrieve

  

<Payer>

Optional

1

Used to enter Payer information associated to Virtual card

  

## 2.1 Sub Structure: DisplayFilter

## 2.1.1 Description

Used to choose different views in the reply.

-   Default display

If this group is not present, system will return the minumum level of card information required to be able to use the card.

-   FULL display

In addition to the card information, the full display will also return the card transactions history and the notification statuses if any.

-   AUTH display

  In addition to the card information, the AUTH display will also return the list of authorizations on the card.

-   SETTLEMENT display

  In addition to the card information, the SETTLEMENT display will also return the list of settlement on the card.

-   REFUND display

  In addition to the card information, the REFUND display will also return the list of refund on the card.

The element is composed as follow:

Path

Status

Repetition

Explanation

Value

<DisplayFilter>

Optional

1

Type of view. \[Full\] or \[Light\] or \[AUTH\] or \[SETTLEMENT\] or \[REFUND\]

AN1..20

## 2.1.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<DisplayFilter>Full</DisplayFilter>

## 2.2 Sub Structure: Payer

## 2.2.1 Description

This group is used to provide payer  information create virtual credit card

Path

Status

Repetition

Explanation

Value

<Payer @PayerCode>

Mandatory

1

Organization code used to identify the organization requesting the card details. Additional restrictions may apply

xs:string

## 2.2.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Payer PayerCode="BMW1125"> </Payer>

## 2.3 Sub Structure: References

## 2.3.1 Description

This group is used to provide the reference of the virtual card to retrieve. Card details can be retreive using the Amadeus and/or the External reference. Only the Amadeus one is mandatory. If the Amadeus reference and external reference are both present, the system will do a check to verify if two references are matching. If they don't, the query will be rejected.

Path

Status

Repetition

Explanation

Value

<References>

<Reference>

Mandatory

1..2

Reference of the virtual card to retrieve

String1..128

<References

<Reference

@Type>

Mandatory  

1

Type of reference: Amadeus or External

Amadeus and/or External

## 2.3.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<References> <Reference Type="External">externalReference</Reference> <Reference Type="Amadeus">22223AAA</Reference> </References>

## 3 Receiving A Reply

If the request is successful, the success group is present in the response.

Else, if an error occurred, the failure group is present in the response.

Path

Status

Repetition

Explanation

Value

<VirtualCard>

Optional

1

This group is returned when the system has succesfully retrieved a virtual card that matches the provided reference

<Transactions>

Optional

1

Transactions made on the card

<Notifications>

Optional

1

The notifications sent to the service provider for a reservation. It contains payment and booking information

<ReportingInfo>

Optional

1

Supplementatry information related to the card

<Reservation>

Optional

1

Reservation related details

<Payer>

Optional

1

The payer related information

<Warnings>

Optional

1

This element is present in case only partial results are returned in the reply or no virtual card is found for a given reference.

## 3.1 Sub Structure: Details

## 3.1.1 Description

-   VirtualCard

Path

Status

Repetition

Explanation

Value

<VirtualCard>

Optional

1..100

Different parameters associated to a virtual card number

<VirtualCard

@LastUpdatedTime>

Optional

1

The timestamp of the lastest action applied to card.

YY-MM-DD hh:mm:ss

<VirtualCard

@CreationTime>

Mandatory

1

Date and time of the card creation

YY-MM-DD hh:mm:ss

<VirtualCard

@CreationOffice>

Mandatory

1

Creation office of the card

AN1..30

<VirtualCard

@CreationUser>

Mandatory

1

Creation user of the card

AN1..30

<VirtualCard

@CardStatus>

Mandatory

1

Current status of the card. ACTIVE, INACTIVE, DELETED

AN1..10

<VirtualCard>

<fop:Card>

Mandatory

1

<VirtualCard>

<fop:Card

@HolderName>

Optional

1

HolderName associated to the card

String1..99

<VirtualCard>

<fop:Card

@SubType>

Optional

1

Type of card: CREDIT, DEBIT or PREPAID

String1..30

<VirtualCard>

<fop:Card>

<fop:AddressVerificationSystemValue

@CityName>

Optional

1

Name of city

String1..99

<VirtualCard>

<fop:Card>

<fop:AddressVerificationSystemValue

@PostalCode>

Optional

1

Post Office Code number

String1..30

<VirtualCard>

<fop:Card>

<fop:AddressVerificationSystemValue

@Country>

Optional

1

Full country name

AN 1..99

<VirtualCard>

<fop:Card>

<fop:AddressVerificationSystemValue>

<fop:Line>

Optional

0..5

Street and numberon first line.Building, Floor etc...on following lines.Each line equals arepetition.

String1..199

<VirtualCard>

<fop:Card>

<fop:PrimaryAccountNumber>

Optional

1

Masked card number

AN0..30

<VirtualCard>

<fop:Card>

<fop:CVV>

Optional

1

CVV associated to the virtual card

AN0..10

<VirtualCard>

<fop:Card>

<fop:Vendor@Code>

Optional

1

Vendor code of the virtual card

AN2

<VirtualCard>

<References>

<Reference>

Mandatory

1..10

Value of the card reference

String1..128

<VirtualCard>

<References>

<Reference

@Type>

Mandatory

1

Type of reference: Amadeus or External

AN1..99

<VirtualCard>

<Provider>

Optional

1

The name of Virtual Card provider

AN1..70

<VirtualCard>

<Values>

Optional

1

Used to define the amounts

<VirtualCard>

<Values>

<Value>

Mandatory

1..4

<VirtualCard>

<Values>

<Value

@Type>

Mandatory

1

The type of amount. Could be RequestedOncard, Requested, AvailableBalance or CurrentBalance

AN1..99

<VirtualCard>

<Values>

<Value

@Amount>

Mandatory

1

The value of amount as an integer

Integer

<VirtualCard>

<Values>

<Value

@DecimalPlaces>

Mandatory

1

Indicate the number of decimals

Non negative Integer

<VirtualCard 

@Periodicity_\>_

  Optional

  1

  Lettercase Enum.Determine how the amount on the card is renewed.

  String 1..20

<VirtualCard>

<Values>

<Value

@CurrencyCode>

Mandatory

1

Uppercase ISO 4217 Currency of the amount

A3

 _<VirtualCard>_

_<Account>_

Optional

1

Repetition of the <Account> used at generation time

<VirtualCard>

<Limitations>

<AllowedTransactions

@Maximum>

Optional

1

Cumulative times of transaction that can be done on the virtual card.

Integer

<VirtualCard>

<Limitations>

<AllowedTransactions

_<_MaxUnitaryAuthAmount

@Type_\>_

  Optional

  1

<VirtualCard>

<Limitations>

<AllowedTransactions

_<_MaxUnitaryAuthAmount

@Amount_\>_

 Optional

  1

  The maximum amount that can be authorised for the card

 Integer

<VirtualCard>

<Limitations>

<AllowedTransactions

_<_MaxUnitaryAuthAmount

@DecimalPlaces_\>_

 Optional

  1

  Number of decimals in the amount starting from the right.

 Integer

<VirtualCard>

<Limitations>

<AllowedTransactions

_<_MaxUnitaryAuthAmount

@CurrencyCode_\>_

 Optional

  1

  ISO 4217 currency code associated to the amount.

 A 3

<VirtualCard>

<Limitations>

<CurrencyList>

<CurrencyCode>

Optional

1..9

Uppercase ISO 4217 Currency to which the virtual card is able to pay

A3

<VirtualCard>

<Limitations>

<ValidityPeriod>

Optional

1

Validity period of the Virtual Card

<VirtualCard>

<Limitations>

<ValidityPeriod

@StartDate>

Optional

1

YYYY-MM-DD

<VirtualCard>

<Limitations>

<ValidityPeriod

@EndDate>

Mandatory

1

YYYY-MM-DD

<VirtualCard>

<Limitations_\>_

_<_AllowedPOSLocation_\>_

  Optional

  1..256

  A list of allowed POS locations where the card usage would be permitted.

  AN 2..6

<VirtualCard>

<Limitations>

<AllowedPOSLocation

@Type>

 Optional

  1..256

  Type of locations that are supported

 CountryCode

-   Transactions

Path

Status

Repetition

Explanation

Value

<Transactions>

Optional

1

Transactions made on the card

<Transactions>

<Transaction>

Optional

1..100

<Transactions>

<Transaction

@Reference>

Optional

1

A unique identifier associated to each transaction

String1..128

<Transactions>

<Transaction

@Type>

Mandatory

1

Type of transaction

-   CREATE\_CARD
-   DELETE\_CARD
-   FREEZE\_CARD
-   THAW\_CARD
-   FUND\_TRANSFER
-   SETTLEMENT
-   REFUND
-   REVERSAL
-   AUTHORISATION

String1..99

<Transactions>

<Transaction

@Timestamp>

Optional

1

The date of the transaction

YYYY-MM-DD

<Transactions>

<Transaction>

<Values>

Optional

1

Used to define the amounts linked to the transaction

<Transactions>

<Transaction>

<Values>

<Value>

Mandatory

1..6

<Transactions>

<Transaction>

<Values>

<Value

@Type>

Mandatory

1

Type of amount, could be credited, debited or resulting balance or forex or nonForex for example

AN1..99

<Transactions>

<Transaction>

<Values>

<Value

@Amount>

Mandatory

1

The value of amount as an integer

Integer

<Transactions>

<Transaction>

<Values>

<Value

@DecimalPlaces>

Mandatory

1

Indicate the number of decimals

Non negative Integer

<Transactions>

<Transaction>

<Values>

<Value

@CurrencyCode>

Mandatory

1

Uppercase ISO 4217 currency of the amount

A3

<Transactions>

<Transaction>

<Details>

Optional

1

Additional details of the transaction

<Transactions>

<Transaction>

<TransactionInfo>

<Detail>

Optional

0..99

String1..256

<Transactions>

<FundsTransfer>

Optional

1

Information about the scheduled load

<Transactions>

<FundsTransfer

@Action>

Optional

1

Funding method. Add or reduce amount. By default, if not provided, value is set to Add.

AN1..19

<Transactions>

<FundsTransfer

@Status>

Mandatory

1

Status of the scheduling: SCHEDULED, COMPLETED or CANCELLED

String 1..128

<Transactions>

<FundsTransfer

@Reference>

Mandatory

1

Unique Amadeus reference for the schedule load.

String 1..128

<Transactions>

<FundsTransfer

@UserID>

Optional

1

The ID of the user who performed the transaction

AN1..30

<Transactions>

<FundsTransfer

@OfficeID>

Optional

1

The office where the transaction has been performed

AN1..30

<Transactions>

<FundsTransfer>

<Value @Amount>

Mandatory

1

Amount to be transferred to the card

Integer

<Transactions>

<FundsTransfer>

<Value @DecimalPlaces>

Mandatory

1

Indicate the number of decimal for the provided amount

Integer

<Transactions>

<FundsTransfer>

<Value @CurrencyCode>

Mandatory

1

Currency of the amount. Uppercase ISO 4217.

A3

<Transactions>

<FundsTransfer>

<Scheduling@Date>

Optional

1

Date when the funds are loaded on the VCN. If not provided, funds are loaded on the same day.

Date or DateTime Type

-   Notifications

Path

Status

Repetition

Explanation

Value

<Notifications>

Optional

1

The notifications sent to the service provider for a reservation. It contains payment and booking information

<Notifications>

<Notification>

Mandatory

1..50

<Notifications>

<Notification

@Type>

Optional

1

The purpose of notification, could be for a hotel new booking, hotel booking modification or hotel booking cancellation for example

String1..99

<Notifications>

<Notification

@SubType>

Optional

1

The subtype of notification, could be only email

String1..30

<Notifications>

<Notification

@Timestamp>

Optional

1

Timestamp when notification has been sent

YY-MM-DD hh:mm:ss

<Notifications>

<Notification

@References>

Optional

1

The unique reference of notification transaction

String1..99

<Notifications>

<Notification

@SequenceNbr>

Optional

1

The number of notification. E.g. there will be several emails sent in different days for a hotel booking

Integer

<Notifications>

<Notification

@Status>

Optional

1

The status of notification, could be delivered, sent, failed, etc.

AN1..20

-   ReportingInfo

Path

Status

Repetition

Explanation

Value

<ReportingInfo>

Optional

1

Supplementatry information related to the card

<ReportingInfo>

<AdditionalInfo>

Mandatory

1..99

Corresponds to the value of the field associated to the code.

AN1..256

<ReportingInfo> <AdditionalInfo @Code>

Mandatory

1

Corresponds to the code of the field (e.g AU for DBI)

String length 0..64

<ReportingInfo> <AdditionalInfo @Code>

Mandatory

1

String length 0..64

-   Reservation

Path

Status

Repetition

Explanation

Value

<Reservation _@ID>_

Optional

1

Identifier of the trip (either PNR or TTR reference)

AN 6..10

<Reservation _@ExternalID>_

Optional

1

Identifier of the trip in an external system.

AN 1..16

<Reservation _@CreationDate>_

Optional

1

Creation date of the reservation.

YYYY-MM-DD

<Reservation _@BillingRequired>_

Optional

1

Indicates whether bill is required. Allowed values: true or false.

Default Value: true

boolean

<Reservation> <_Travelers>_

Optional

1

Group representing the travelers associated to the reservation.

<Reservation> <_Travelers>  
<Traveler>_

Optional

1..9

Element representing a passenger.

 <Reservation> <_Travelers>  
<Traveler> <pnr:Name>_

Optional

  1..5 

Element used to provide name information. This is included in the pnr namespace.

<Reservation> <_Travelers>  
<Traveler>  
<pnr:Name @Title>_

Optional

1

Free text used to provide the title of the passenger (i.e. 'DR', 'MR', 'MS', etc).

AN 70

<Reservation> <_Travelers>  
<Traveler>  
<pnr:Name @FirstName>_

Optional

1

FirstName of the passenger.

AN 70

<Reservation> <_Travelers>  
<Traveler>  
<pnr:Name @LastName>_

Optional

1

LastName of the passenger.

AN 70

<Reservation> <_Accommodation>_

Optional

1

Group used in order to define Hotel type product. This is included in the etr namespace.

<Reservation> <_Accommodation @description>_

Optional

1

Free text.

String 1..199

<Reservation> <_Accommodation @name>_

Optional

1

Hotel name.

String 1..99

<Reservation> <_Accommodation @NIP>_

Optional

1

Number of rooms.

N 1..99

<Reservation> <_Accommodation @roomRateDescription>_

Optional

1

String 1..256

<Reservation> <_Accommodation @cancelPolicies>_

Optional

1

String 1..256

<Reservation> <_Accommodation @type>_

Mandatory

1

'HOTEL'

<Reservation> <_Accommodation> <etr:serviceProvider @name>_

Optional

1

Name of the hotel or hotel chain.

AN 1..70

<Reservation> <_Accommodation> <etr:serviceProvider @code>_

Optional

1

Code of the hotel or hotel chain.

AN 1..35

<Reservation> <_Accommodation> <etr:start @dateTime>_

Optional

1

Check in Date.

YYYY-MM-DD

<Reservation> <_Accommodation> <etr:start><address @line>_

Optional

1

String 1..70

<Reservation> <_Accommodation> <etr:start><address @complement>_

Optional

1

String 1..70

<Reservation> <_Accommodation> <etr:start> <address @zip>_

Optional

1

String 1..20

<Reservation> <_Accommodation> <etr:start> <address @countryCode>_

Optional

1

Two letter ISO country code.

AN 2

<Reservation> <_Accommodation> <etr:start> <address @cityName>_

Optional

1

Full name.

String 1..35

<Reservation> <_Accommodation> <etr:start> <address @stateCode>_

Optional

1

AN 1..2

<Reservation> <_Accommodation> <etr:start> <contact @phone>_

Optional

1

Phone number of the Hotel

String 1..20

<Reservation> <_Accommodation> <etr:start> <contact @fax>_

Optional

1

Fax number of the Hotel, format is limited to the following:

-   **0044**_1614453941_ (two zeros followed by the international dial code)
-   **44**_1614453941_ (the international dial code with no zeros)
-   **+44**_1614453941_ (a + symbol followed by the international dial code)

String 1..99

<Reservation> <_Accommodation> <etr:start> <contact @email>_

Optional

1

Email of the Hotel

String 1..99

<Reservation> <_Accommodation> <etr:end @dateTime>_

Optional

1

Check out Date.

YYYY-MM-DD

<Reservation> <_Accommodation> <etr:customers> <etr:adults>_

Optional

1

Number of adults.

N 1..2

<Reservation> <_Accommodation> <etr:customers> <etr:children>_

Optional

1..9

Number of children.

N 1..2

<Reservation> <_Accommodation> <etr:customers> <etr:children @age>_

Optional

1

Age of the children.

N 1..2

<Reservation> <_Accommodation> <identifier>_

Optional

1

Commercial product name.

String 1..60

-   Payer

Path

Status

Repetition

Explanation

Value

<Payer @PayerCode>

Optional

1

Organization code used to identify the organization requesting the creation of the card. Additional restrictions may apply  
Note: This field value is assigned by Outpayce

xs:string

<Payer @EntityReference>

Optional

1

Reference of the payer to which billing is done

Note: This field value is assigned by the Travel Agent

All the field mentioned below provided together. If any of these fields are omitted, none of them should be included in the request.

EntityReference, NationalTaxRegistrationNumber, LegalName, BillingAddress. AddressLine, BillingAddress.PostalCode, BillingAddress.CityName

xs:string

<Payer @NationalTaxRegistrationNumber>

Optional

1

National tax registration number of the payer organization

xs:string

<Payer @LegalName>

Optional

1

Legal Name of the payer organization

xs:string

<Payer @BillingManagerName>

Optional

1

Name of the Billing Manager of the payer organization

xs:string

<Payer @BillingDepartmentEmail>

Optional

1

Email id of the Billing department of the payer organization

xs:string

<Payer><CountryCode>

Optional

1

Element to represent 2 letter Country code of the payer organization

<Payer><BillingAddress><AddressLine>

Optional

1

Address line with street, number, building name  
  
Note: String with max size 255 character

<Payer><BillingAddress><PostalCode>

Optional

1

Post Office Code number

Note: String with max size 16 character

<Payer><BillingAddress><CityName>

Optional

1

City Name

Note: String with max size 64 character

## 3.1.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

* * *

## 3.2 Sub Structure: Warning

## 3.2.1 Description

Warnings can be returned. Element is composed as follow:

Path

Status

Repetition

Explanaion

Value

<Success>

<Warnings>

Mandatory

1

Group to cover warning regarding the searching results

<Success>

<Warnings>

<ama\_ct:Warnings>

Optional

1

<Success>

<Warnings>

<ama\_ct:Warnings>

<ama\_ct:Warning>

Mandatory

1..99

Description of the warning

  

<Success>

<Warnings>

<ama\_ct:Warnings>

<ama\_ct:Warning

@Type>

Mandatory

1

Type of warning

<Success>

<Warnings>

<ama\_ct:Warnings><ama\_ct:Warning

@Code>

Mandatory

1

Warning code

## 3.2.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

* * *

## 4 Error Messages

Code

Text

00014

SIGN IN

02322

CONFIGURATION ERROR

10633

OPERATION DENIED: PERMISSION MISSING

36548

THIS CARD IS NOT CREATED IN YOUR SIGN IN OFFICE

34734

VIRTUAL CARD NOT FOUND

00727  

ERR INVALID ENTRY

00727

ERR INTERNAL ERROR

00357

ERR LINK DOWN

## 4.1 Error Reply

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_PAY\_GetVirtualCardDetailsRS xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" Version="3.2" xsi:schemaLocation="http://xml.amadeus.com/2010/06/PAY\_VirtualCard\_v3 AMA\_PAY\_GetVirtualCardDetailsRS.xsd"> <Failure> <Errors> <Error Code="34734" ShortText="VIRTUAL CARD NOT FOUND" Type="ERR"></Error> </Errors> </Failure> </AMA\_PAY\_GetVirtualCardDetailsRS>

  

* * *

## 5 Operations

## 5.1 Operation: Get Auth

Retrieve the list of Authorizations performed on the card.

## 5.1.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_PAY\_GetVirtualCardDetailsRQ Version="3.2" xsi:schemaLocation="http://xml.amadeus.com/2010/06/PAY\_VirtualCard\_v3 AMA\_PAY\_GetVirtualCardDetailsRQ.xsd"> <References> <Reference Type="External">0RABi7yRASZCmw9Ok-n12343</Reference> <Reference Type="Amadeus">VCN12345</Reference> </References> <DisplayFilter>AUTH</DisplayFilter> </AMA\_PAY\_GetVirtualCardDetailsRQ>

## 5.1.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_PAY\_GetVirtualCardDetailsRS xmlns:ttr="http://xml.amadeus.com/2010/06/TTR\_Types\_v3" Version="3.2"> <Success> <VirtualCard CardStatus="DELETED" CreationOffice="CUNMX28AE" CreationTime="2021-05-09T22:51:29" CreationUser="9999WS" LastUpdatedTime="2021-06-12T06:52:11"> <pay:Card HolderName="PricXXXXXXXXXeus" SubType="PREPAID"> <fop:AddressVerificationSystemValue CityName="Madrid" Country="SPAIN" PostalCode="28027"> <fop:Line>Salvador de Madariaga 1</fop:Line> </fop:AddressVerificationSystemValue> <fop:PrimaryAccountNumber>52532XXXXXX0854</fop:PrimaryAccountNumber> <fop:CVV>123</fop:CVV> <fop:Validity EndDate="1121"></fop:Validity> <fop:Vendor Code="CA"></fop:Vendor> </pay:Card> <pay:References> <pay:Reference Type="Amadeus">VCN12345</pay:Reference> <pay:Reference Type="External">0RABi7yRASZCmw9Ok-n12343</pay:Reference> <pay:Reference Type="FundingAccount">ampriXXXXXXXXXXN</pay:Reference> </pay:References> <pay:Provider>IXARIS</pay:Provider> <pay:Values> <pay:Value Amount="20125" CurrencyCode="MXN" DecimalPlaces="2" Type="Requested"></pay:Value> <pay:Value Amount="0" CurrencyCode="MXN" DecimalPlaces="2" Type="AvailableBalance"></pay:Value> <pay:Value Amount="10000" CurrencyCode="MXN" DecimalPlaces="2" Type="Reservation"></pay:Value> <pay:Value Amount="525087275" CurrencyCode="MXN" DecimalPlaces="2" Type="FundingAccountAvailableBalance"></pay:Value> </pay:Values> <pay:Limitations> <pay:AllowedTransactions Maximum="1"></pay:AllowedTransactions> <pay:ValidityPeriod EndDate="2021-06-08" StartDate="2021-05-09"></pay:ValidityPeriod> <pay:CardActivation Mode="InvoiceReception"></pay:CardActivation> </pay:Limitations> </VirtualCard> <Transactions> <Transaction Reference="0UwKkBVRvRhpX38pAcGo7SVYk" Timestamp="2021-05-09T22:51:30" Type="CREATE\_CARD"> <Values> <Value Amount="20125" CurrencyCode="MXN" DecimalPlaces="2" Type="FundsCredited"></Value> <Value Amount="20125" CurrencyCode="MXN" DecimalPlaces="2" Type="ResultingBalance"></Value> <Value Amount="0" CurrencyCode="MXN" DecimalPlaces="9" Type="TransactionFee"></Value> </Values> </Transaction> <Transaction Reference="0UwLlAasmQv0KR7a0h2QokNbz" Timestamp="2021-05-10T00:04:23" Type="FREEZE\_CARD"> <Values> <Value Amount="0" CurrencyCode="MXN" DecimalPlaces="2" Type="FundsCredited"></Value> <Value Amount="20125" CurrencyCode="MXN" DecimalPlaces="2" Type="ResultingBalance"></Value> </Values> </Transaction> <Transaction Reference="0UwJXepQ0dqfAB\_NYf2R24WcX" Timestamp="2021-05-10T22:04:18" Type="DELETE\_CARD"> <Values> <Value Amount="0" CurrencyCode="MXN" DecimalPlaces="2" Type="FundsCredited"></Value> <Value Amount="0" CurrencyCode="MXN" DecimalPlaces="2" Type="ResultingBalance"></Value> </Values> </Transaction> <Transaction Reference="0UwLlAasmQv0KR7a0h2QokN1bz" Timestamp="2021-05-10T01:03:56" Type="AUTHORISATION"> <Values> <Value Amount="20125" CurrencyCode="MXN" DecimalPlaces="2" Type="ResultingBalance"></Value> <Value Amount="0" CurrencyCode="MXN" DecimalPlaces="2" Type="ForexFee"></Value> <Value Amount="20125" CurrencyCode="MXN" DecimalPlaces="2" Type="FundsDebited"></Value> </Values> <Details> <Detail Type="ForexRate">0.8240</Detail> <Detail Type="MerchantName">AMIXXXXXXXXOUP</Detail> <Detail Type="Status">OK</Detail> <Detail Type="ApprovalCode">198988</Detail> <Detail Type="ResponseCode">00</Detail> <Detail Type="ResponseMessage">All good</Detail> </Details> </Transaction> <Transaction Reference="0UwIIiafwXB6S18L-gGXg7f2O" Timestamp="2021-05-22T14:05:00" Type="AUTHORISATION"> <Values> <Value Amount="20125" CurrencyCode="MXN" DecimalPlaces="2" Type="FundsDebited"></Value> </Values> <Details> <Detail Type="MerchantName">AMIXXXXXXUP</Detail> <Detail Type="Status">KO</Detail> <Detail Type="ApprovalCode">136071</Detail> <Detail Type="ResponseCode">05</Detail> <Detail Type="ResponseMessage">Do not honor</Detail> </Details> </Transaction> </Transactions> <ReportingInfo> <pay:AdditionalInfo Code="SIGN-OFFICE" CodeContext="PNR">9999WS-CUNMX28AE</pay:AdditionalInfo> <pay:AdditionalInfo Code="RESID" CodeContext="PNR">390475-AUT</pay:AdditionalInfo> <pay:AdditionalInfo Code="Ref1" CodeContext="CardInfo">390475-AUTOMATICISSUANCE-090521175128</pay:AdditionalInfo> <pay:AdditionalInfo Code="Ref2" CodeContext="CardInfo">390475-AUTOMATICISSUANCE-</pay:AdditionalInfo> <pay:AdditionalInfo Code="Ref3" CodeContext="CardInfo">Hotel</pay:AdditionalInfo> <pay:AdditionalInfo Code="Ref4" CodeContext="CardInfo">17038001-1:PA-33742</pay:AdditionalInfo> </ReportingInfo> <Reservation BillingRequired="true" CreationDate="2023-07-05" ExternalID="V5PYX8" ID="V5PYX7"> <pay:Travelers> <pay:Traveler> <pnr:Name FirstName="Stjepan" LastName="Jelaska" Title="MR"></pnr:Name> <ttr:contact> <ttr:email>test@ifao.com</ttr:email> </ttr:contact> </pay:Traveler> <pay:Traveler> <pnr:Name FirstName="Stjepan1" LastName="Jelaska1" Title="MR"></pnr:Name> <ttr:contact> <ttr:email>tes1t@ifao.com</ttr:email> </ttr:contact> </pay:Traveler> </pay:Travelers> <pay:Accommodation type="HOTEL"> <etr:start dateTime="2023-07-20"> <etr:address cityCode="MI" cityName="MADRID" complement="NOVOTEL" countryCode="ES" countryName="SPAIN" line="HOTEL" stateCode="AI" zip="69010"></etr:address> <etr:contact email="michiel.baken@moxyhotels.com" fax="+1-907-555-1234" phone="+4969667789330"></etr:contact> </etr:start> <etr:end dateTime="2023-07-27"></etr:end> <etr:customers> <etr:adults>2</etr:adults> <etr:children age="2">3</etr:children> <etr:children age="5">1</etr:children> </etr:customers> <pay:identifier>ADBLR039</pay:identifier> </pay:Accommodation> </Reservation> <pay:Payer BillingDepartmentEmail="abc@gmail.com" BillingManagerName="John" EntityReference="V5PYX7" LegalName="John Enterprises" NationalTaxRegistrationNumber="CYT1212" PayerCode="VOLKS"> <pay:CountryCode>US</pay:CountryCode> <pay:BillingAddress> <pay:AddressLine>Main Street, Suite 5B</pay:AddressLine> <pay:CityName>New York</pay:CityName> <pay:PostalCode>10001</pay:PostalCode> </pay:BillingAddress> </pay:Payer> </Success> </AMA\_PAY\_GetVirtualCardDetailsRS>

## 5.1.3 Possible Errors

See "Error Messages" section.

* * *

## 5.2 Operation: Get default

Retrieve the card details

## 5.2.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_PAY\_GetVirtualCardDetailsRQ Version="3.2" xsi:schemaLocation="http://xml.amadeus.com/2010/06/PAY\_VirtualCard\_v3 AMA\_PAY\_GetVirtualCardDetailsRQ.xsd"> <References> <Reference Type="External">0RABi7yRASZCmw9Ok-n12343</Reference> <Reference Type="Amadeus">VCN12345</Reference> </References> </AMA\_PAY\_GetVirtualCardDetailsRQ>

## 5.2.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_PAY\_GetVirtualCardDetailsRS Version="3.2" xsi:schemaLocation="http://xml.amadeus.com/2010/06/PAY\_VirtualCard\_v3 AMA\_PAY\_GetVirtualCardDetailsRS.xsd"> <Success> <VirtualCard CardStatus="Active" CreationTime="2015-12-17T09:30:47Z" LastUpdatedTime="2015-12-17T09:30:47Z"> <fop:Card HolderName="Amadeus IT Group SA" SubType="Prepaid"> <fop:PrimaryAccountNumber>5220939999991103</fop:PrimaryAccountNumber> <fop:CVV>123</fop:CVV> </fop:Card> <References> <Reference Type="External">0RABi7yRASZCmw9Ok-n12343</Reference> <Reference Type="Amadeus">VCN12345</Reference> </References> <Provider>IXARIS</Provider> <Values> <Value Amount="13500" CurrencyCode="EUR" DecimalPlaces="2" Type="Requested"></Value> <Value Amount="10000" CurrencyCode="EUR" DecimalPlaces="2" Type="Reservation"></Value> </Values> <Limitations> <ValidityPeriod EndDate="2016-03-17" StartDate="2015-12-17"></ValidityPeriod> <CardActivation Mode="InvoiceReception"></CardActivation> </Limitations> </VirtualCard> </Success> </AMA\_PAY\_GetVirtualCardDetailsRS>

## 5.2.3 Possible Errors

See "Error Messages" section.

* * *

## 5.3 Operation: Get full

Retrieve the card details with all the transactions and notifications history

Find below the authorisation response code and their significations.

Code

Description

00

All good

01

Refer to card issuer

03

Invalid merchant

05

Do not honor

06

Unspecified error

10

Partial approval

13

Invalid amount

14

Invalid card number(no such number)

17

Customer cancellation

32

Completed partially

33

Expired card

41

Lost card(capture)

51

Insufficient funds

54

Expired card

55

Incorrect PIN

57

Transaction not permitted to cardholder

61

Exceeds withdrawal amount limit

62

Restricted card

63

Security violation

65

Exceeds withdrawal frequency limit

68

Response received too late

70

Cardholder to contact issuer

75

Allowable number of PIN tries exceeded

## 5.3.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_PAY\_GetVirtualCardDetailsRQ Version="3.2" xsi:schemaLocation="http://xml.amadeus.com/2010/06/PAY\_VirtualCard\_v3 AMA\_PAY\_GetVirtualCardDetailsRQ.xsd"> <References> <Reference Type="External">0RABi7yRASZCmw9Ok-n12343</Reference> <Reference Type="Amadeus">VCN12345</Reference> </References> <DisplayFilter>FULL</DisplayFilter> </AMA\_PAY\_GetVirtualCardDetailsRQ>

## 5.3.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_PAY\_GetVirtualCardDetailsRS Version="3.2"> <Success> <VirtualCard CardStatus="DELETED" CreationOffice="CUNMX28AE" CreationTime="2021-05-09T22:51:29" CreationUser="9999WS" LastUpdatedTime="2021-06-12T06:52:11"> <pay:Card HolderName="PricXXXXXXXXXeus" SubType="PREPAID"> <fop:AddressVerificationSystemValue CityName="Madrid" Country="SPAIN" PostalCode="28027"> <fop:Line>Salvador de Madariaga 1</fop:Line> </fop:AddressVerificationSystemValue> <fop:PrimaryAccountNumber>52532XXXXXX0854</fop:PrimaryAccountNumber> <fop:CVV>123</fop:CVV> <fop:Validity EndDate="1121"></fop:Validity> <fop:Vendor Code="CA"></fop:Vendor> </pay:Card> <pay:References> <pay:Reference Type="Amadeus">VCN12345</pay:Reference> <pay:Reference Type="External">0RABi7yRASZCmw9Ok-n12343</pay:Reference> <pay:Reference Type="FundingAccount">ampriXXXXXXXXXXN</pay:Reference> </pay:References> <pay:Provider>IXARIS</pay:Provider> <pay:Values> <pay:Value Amount="20125" CurrencyCode="MXN" DecimalPlaces="2" Type="Requested"></pay:Value> <pay:Value Amount="0" CurrencyCode="MXN" DecimalPlaces="2" Type="AvailableBalance"></pay:Value> <pay:Value Amount="10000" CurrencyCode="MXN" DecimalPlaces="2" Type="Reservation"></pay:Value> <pay:Value Amount="525087275" CurrencyCode="MXN" DecimalPlaces="2" Type="FundingAccountAvailableBalance"></pay:Value> </pay:Values> <pay:Limitations> <pay:AllowedTransactions Maximum="1"></pay:AllowedTransactions> <pay:ValidityPeriod EndDate="2021-06-08" StartDate="2021-05-09"></pay:ValidityPeriod> <pay:CardActivation Mode="InvoiceReception"></pay:CardActivation> </pay:Limitations> </VirtualCard> <Transactions> <Transaction Reference="0UwKkBVRvRhpX38pAcGo7SVYk" Timestamp="2021-05-09T22:51:30" Type="CREATE\_CARD"> <Values> <Value Amount="20125" CurrencyCode="MXN" DecimalPlaces="2" Type="FundsCredited"></Value> <Value Amount="20125" CurrencyCode="MXN" DecimalPlaces="2" Type="ResultingBalance"></Value> <Value Amount="0" CurrencyCode="MXN" DecimalPlaces="9" Type="TransactionFee"></Value> </Values> </Transaction> <Transaction Reference="0UwLlAasmQv0KR7a0h2QokNbz" Timestamp="2021-05-10T00:04:23" Type="FREEZE\_CARD"> <Values> <Value Amount="0" CurrencyCode="MXN" DecimalPlaces="2" Type="FundsCredited"></Value> <Value Amount="20125" CurrencyCode="MXN" DecimalPlaces="2" Type="ResultingBalance"></Value> </Values> </Transaction> <Transaction Reference="0UwJXepQ0dqfAB\_NYf2R24WcX" Timestamp="2021-05-10T22:04:18" Type="DELETE\_CARD"> <Values> <Value Amount="0" CurrencyCode="MXN" DecimalPlaces="2" Type="FundsCredited"></Value> <Value Amount="0" CurrencyCode="MXN" DecimalPlaces="2" Type="ResultingBalance"></Value> </Values> </Transaction> <Transaction Reference="0UwLlAasmQv0KR7a0h2QokN1bz" Timestamp="2021-05-10T01:03:56" Type="AUTHORISATION"> <Values> <Value Amount="20125" CurrencyCode="MXN" DecimalPlaces="2" Type="ResultingBalance"></Value> <Value Amount="0" CurrencyCode="MXN" DecimalPlaces="2" Type="ForexFee"></Value> <Value Amount="20125" CurrencyCode="MXN" DecimalPlaces="2" Type="FundsDebited"></Value> </Values> <Details> <Detail Type="ForexRate">0.8240</Detail> <Detail Type="MerchantName">AMIXXXXXXXXOUP</Detail> <Detail Type="Status">OK</Detail> <Detail Type="ApprovalCode">198988</Detail> <Detail Type="ResponseCode">00</Detail> <Detail Type="ResponseMessage">All good</Detail> </Details> </Transaction> <Transaction Reference="0UwK9Iwrbb9acZ-Vf1P6dsKL6" Timestamp="2021-05-10T00:00:00" Type="SETTLEMENT"> <Values> <Value Amount="0" CurrencyCode="MXN" DecimalPlaces="2" Type="ResultingBalance"></Value> <Value Amount="0" CurrencyCode="MXN" DecimalPlaces="2" Type="ForexFee"></Value> <Value Amount="20125" CurrencyCode="MXN" DecimalPlaces="2" Type="FundsDebited"></Value> </Values> <Details> <Detail Type="ForexRate">0.8240</Detail> <Detail Type="MerchantName">AMIXXXXXXUP</Detail> <Detail Type="Status">OK</Detail> <Detail Type="ApprovalCode">198988</Detail> </Details> </Transaction> <Transaction Reference="0UwIIiafwXB6S18L-gGXg7f2O" Timestamp="2021-05-22T14:05:00" Type="AUTHORISATION"> <Values> <Value Amount="20125" CurrencyCode="MXN" DecimalPlaces="2" Type="FundsDebited"></Value> </Values> <Details> <Detail Type="MerchantName">AMIXXXXXXUP</Detail> <Detail Type="Status">KO</Detail> <Detail Type="ApprovalCode">136071</Detail> <Detail Type="ResponseCode">05</Detail> <Detail Type="ResponseMessage">Do not honor</Detail> </Details> </Transaction> </Transactions> <ReportingInfo> <pay:AdditionalInfo Code="SIGN-OFFICE" CodeContext="PNR">9999WS-CUNMX28AE</pay:AdditionalInfo> <pay:AdditionalInfo Code="RESID" CodeContext="PNR">390475-AUT</pay:AdditionalInfo> <pay:AdditionalInfo Code="Ref1" CodeContext="CardInfo">390475-AUTOMATICISSUANCE-090521175128</pay:AdditionalInfo> <pay:AdditionalInfo Code="Ref2" CodeContext="CardInfo">390475-AUTOMATICISSUANCE-</pay:AdditionalInfo> <pay:AdditionalInfo Code="Ref3" CodeContext="CardInfo">Hotel</pay:AdditionalInfo> <pay:AdditionalInfo Code="Ref4" CodeContext="CardInfo">17038001-1:PA-33742</pay:AdditionalInfo> </ReportingInfo> <Reservation BillingRequired="true" CreationDate="2023-07-05" ExternalID="V5PYX8" ID="V5PYX7"> <pay:Travelers> <pay:Traveler> <pnr:Name FirstName="Stjepan" LastName="Jelaska" Title="MR"></pnr:Name> <ttr:contact> <ttr:email>test@ifao.com</ttr:email> </ttr:contact> </pay:Traveler> <pay:Traveler> <pnr:Name FirstName="Stjepan1" LastName="Jelaska1" Title="MR"></pnr:Name> <ttr:contact> <ttr:email>tes1t@ifao.com</ttr:email> </ttr:contact> </pay:Traveler> </pay:Travelers> <pay:Accommodation type="HOTEL"> <etr:start dateTime="2023-07-20"> <etr:address cityCode="MI" cityName="MADRID" complement="NOVOTEL" countryCode="ES" countryName="SPAIN" line="HOTEL" stateCode="AI" zip="69010"></etr:address> <etr:contact email="michiel.baken@moxyhotels.com" fax="+1-907-555-1234" phone="+4969667789330"></etr:contact> </etr:start> <etr:end dateTime="2023-07-27"></etr:end> <etr:customers> <etr:adults>2</etr:adults> <etr:children age="2">3</etr:children> <etr:children age="5">1</etr:children> </etr:customers> <pay:identifier>ADBLR039</pay:identifier> </pay:Accommodation> </Reservation> <pay:Payer BillingDepartmentEmail="abc@gmail.com" BillingManagerName="John" EntityReference="V5PYX7" LegalName="John Enterprises" NationalTaxRegistrationNumber="CYT1212" PayerCode="VOLKS"> <pay:CountryCode>US</pay:CountryCode> <pay:BillingAddress> <pay:AddressLine>Main Street, Suite 5B</pay:AddressLine> <pay:CityName>New York</pay:CityName> <pay:PostalCode>10001</pay:PostalCode> </pay:BillingAddress> </pay:Payer> </Success> </AMA\_PAY\_GetVirtualCardDetailsRS>

## 5.3.3 Possible Errors

See "Error Messages" section.

* * *

## 5.4 Operation: Get Refund

Retrieve the list of Refund transactions on the card.

## 5.4.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_PAY\_GetVirtualCardDetailsRQ Version="3.2" xsi:schemaLocation="http://xml.amadeus.com/2010/06/PAY\_VirtualCard\_v3 AMA\_PAY\_GetVirtualCardDetailsRQ.xsd"> <References> <Reference Type="External">0RABi7yRASZCmw9Ok-n12343</Reference> <Reference Type="Amadeus">VCN12345</Reference> </References> <DisplayFilter>REFUND</DisplayFilter> </AMA\_PAY\_GetVirtualCardDetailsRQ>

## 5.4.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_PAY\_GetVirtualCardDetailsRS Version="3.2"> <Success> <VirtualCard CardStatus="DELETED" CreationOffice="CUNMX28AE" CreationTime="2021-05-09T22:51:29" CreationUser="9999WS" LastUpdatedTime="2021-06-12T06:52:11"> <pay:Card HolderName="PricXXXXXXXXXeus" SubType="PREPAID"> <fop:AddressVerificationSystemValue CityName="Madrid" Country="SPAIN" PostalCode="28027"> <fop:Line>Salvador de Madariaga 1</fop:Line> </fop:AddressVerificationSystemValue> <fop:PrimaryAccountNumber>52532XXXXXX0854</fop:PrimaryAccountNumber> <fop:CVV>123</fop:CVV> <fop:Validity EndDate="1121"></fop:Validity> <fop:Vendor Code="CA"></fop:Vendor> </pay:Card> <pay:References> <pay:Reference Type="Amadeus">VCN12345</pay:Reference> <pay:Reference Type="External">0RABi7yRASZCmw9Ok-n12343</pay:Reference> <pay:Reference Type="FundingAccount">ampriXXXXXXXXXXN</pay:Reference> </pay:References> <pay:Provider>IXARIS</pay:Provider> <pay:Values> <pay:Value Amount="20125" CurrencyCode="MXN" DecimalPlaces="2" Type="Requested"></pay:Value> <pay:Value Amount="0" CurrencyCode="MXN" DecimalPlaces="2" Type="AvailableBalance"></pay:Value> <pay:Value Amount="10000" CurrencyCode="MXN" DecimalPlaces="2" Type="Reservation"></pay:Value> <pay:Value Amount="525087275" CurrencyCode="MXN" DecimalPlaces="2" Type="FundingAccountAvailableBalance"></pay:Value> </pay:Values> <pay:Limitations> <pay:AllowedTransactions Maximum="1"></pay:AllowedTransactions> <pay:ValidityPeriod EndDate="2021-06-08" StartDate="2021-05-09"></pay:ValidityPeriod> <pay:CardActivation Mode="InvoiceReception"></pay:CardActivation> </pay:Limitations> </VirtualCard> <Transactions> <Transaction Reference="0UwKkBVRvRhpX38pAcGo7SVYk" Timestamp="2021-05-09T22:51:30" Type="CREATE\_CARD"> <Values> <Value Amount="20125" CurrencyCode="MXN" DecimalPlaces="2" Type="FundsCredited"></Value> <Value Amount="20125" CurrencyCode="MXN" DecimalPlaces="2" Type="ResultingBalance"></Value> <Value Amount="0" CurrencyCode="MXN" DecimalPlaces="9" Type="TransactionFee"></Value> </Values> </Transaction> <Transaction Reference="0UwLlAasmQv0KR7a0h2QokNbz" Timestamp="2021-05-10T00:04:23" Type="FREEZE\_CARD"> <Values> <Value Amount="0" CurrencyCode="MXN" DecimalPlaces="2" Type="FundsCredited"></Value> <Value Amount="20125" CurrencyCode="MXN" DecimalPlaces="2" Type="ResultingBalance"></Value> </Values> </Transaction> <Transaction Reference="0UwJXepQ0dqfAB\_NYf2R24WcX" Timestamp="2021-05-10T22:04:18" Type="DELETE\_CARD"> <Values> <Value Amount="0" CurrencyCode="MXN" DecimalPlaces="2" Type="FundsCredited"></Value> <Value Amount="0" CurrencyCode="MXN" DecimalPlaces="2" Type="ResultingBalance"></Value> </Values> </Transaction> <Transaction Reference="0UwK9Iwrbb9acZ-Vf1P6dsKL6" Timestamp="2021-05-10T00:00:00" Type="REFUND"> <Values> <Value Amount="0" CurrencyCode="MXN" DecimalPlaces="2" Type="ResultingBalance"></Value> <Value Amount="0" CurrencyCode="MXN" DecimalPlaces="2" Type="ForexFee"></Value> <Value Amount="20125" CurrencyCode="MXN" DecimalPlaces="2" Type="FundsDebited"></Value> </Values> <Details> <Detail Type="ForexRate">0.8240</Detail> <Detail Type="MerchantName">AMIXXXXXXUP</Detail> <Detail Type="Status">OK</Detail> <Detail Type="ApprovalCode">198988</Detail> </Details> </Transaction> </Transactions> <ReportingInfo> <pay:AdditionalInfo Code="SIGN-OFFICE" CodeContext="PNR">9999WS-CUNMX28AE</pay:AdditionalInfo> <pay:AdditionalInfo Code="RESID" CodeContext="PNR">390475-AUT</pay:AdditionalInfo> <pay:AdditionalInfo Code="Ref1" CodeContext="CardInfo">390475-AUTOMATICISSUANCE-090521175128</pay:AdditionalInfo> <pay:AdditionalInfo Code="Ref2" CodeContext="CardInfo">390475-AUTOMATICISSUANCE-</pay:AdditionalInfo> <pay:AdditionalInfo Code="Ref3" CodeContext="CardInfo">Hotel</pay:AdditionalInfo> <pay:AdditionalInfo Code="Ref4" CodeContext="CardInfo">17038001-1:PA-33742</pay:AdditionalInfo> </ReportingInfo> <Reservation BillingRequired="true" CreationDate="2023-07-05" ExternalID="V5PYX8" ID="V5PYX7"> <pay:Travelers> <pay:Traveler> <pnr:Name FirstName="Stjepan" LastName="Jelaska" Title="MR"></pnr:Name> <ttr:contact> <ttr:email>test@ifao.com</ttr:email> </ttr:contact> </pay:Traveler> <pay:Traveler> <pnr:Name FirstName="Stjepan1" LastName="Jelaska1" Title="MR"></pnr:Name> <ttr:contact> <ttr:email>tes1t@ifao.com</ttr:email> </ttr:contact> </pay:Traveler> </pay:Travelers> <pay:Accommodation type="HOTEL"> <etr:start dateTime="2023-07-20"> <etr:address cityCode="MI" cityName="MADRID" complement="NOVOTEL" countryCode="ES" countryName="SPAIN" line="HOTEL" stateCode="AI" zip="69010"></etr:address> <etr:contact email="michiel.baken@moxyhotels.com" fax="+1-907-555-1234" phone="+4969667789330"></etr:contact> </etr:start> <etr:end dateTime="2023-07-27"></etr:end> <etr:customers> <etr:adults>2</etr:adults> <etr:children age="2">3</etr:children> <etr:children age="5">1</etr:children> </etr:customers> <pay:identifier>ADBLR039</pay:identifier> </pay:Accommodation> </Reservation> <pay:Payer BillingDepartmentEmail="abc@gmail.com" BillingManagerName="John" EntityReference="V5PYX7" LegalName="John Enterprises" NationalTaxRegistrationNumber="CYT1212" PayerCode="VOLKS"> <pay:CountryCode>US</pay:CountryCode> <pay:BillingAddress> <pay:AddressLine>Main Street, Suite 5B</pay:AddressLine> <pay:CityName>New York</pay:CityName> <pay:PostalCode>10001</pay:PostalCode> </pay:BillingAddress> </pay:Payer> </Success> </AMA\_PAY\_GetVirtualCardDetailsRS>

## 5.4.3 Possible Errors

See "Error Messages" section.

* * *

## 5.5 Operation: Get Settlement

Retrieve the list of settlement transactions on the card.

## 5.5.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_PAY\_GetVirtualCardDetailsRQ Version="3.2" xsi:schemaLocation="http://xml.amadeus.com/2010/06/PAY\_VirtualCard\_v3 AMA\_PAY\_GetVirtualCardDetailsRQ.xsd"> <References> <Reference Type="External">0RABi7yRASZCmw9Ok-n12343</Reference> <Reference Type="Amadeus">VCN12345</Reference> </References> <DisplayFilter>SETTLEMENT</DisplayFilter> </AMA\_PAY\_GetVirtualCardDetailsRQ>

## 5.5.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_PAY\_GetVirtualCardDetailsRS Version="3.2"> <Success> <VirtualCard CardStatus="DELETED" CreationOffice="CUNMX28AE" CreationTime="2021-05-09T22:51:29" CreationUser="9999WS" LastUpdatedTime="2021-06-12T06:52:11"> <pay:Card HolderName="PricXXXXXXXXXeus" SubType="PREPAID"> <fop:AddressVerificationSystemValue CityName="Madrid" Country="SPAIN" PostalCode="28027"> <fop:Line>Salvador de Madariaga 1</fop:Line> </fop:AddressVerificationSystemValue> <fop:PrimaryAccountNumber>52532XXXXXX0854</fop:PrimaryAccountNumber> <fop:CVV>123</fop:CVV> <fop:Validity EndDate="1121"></fop:Validity> <fop:Vendor Code="CA"></fop:Vendor> </pay:Card> <pay:References> <pay:Reference Type="Amadeus">VCN12345</pay:Reference> <pay:Reference Type="External">0RABi7yRASZCmw9Ok-n12343</pay:Reference> <pay:Reference Type="FundingAccount">ampriXXXXXXXXXXN</pay:Reference> </pay:References> <pay:Provider>IXARIS</pay:Provider> <pay:Values> <pay:Value Amount="20125" CurrencyCode="MXN" DecimalPlaces="2" Type="Requested"></pay:Value> <pay:Value Amount="0" CurrencyCode="MXN" DecimalPlaces="2" Type="AvailableBalance"></pay:Value> <pay:Value Amount="10000" CurrencyCode="MXN" DecimalPlaces="2" Type="Reservation"></pay:Value> <pay:Value Amount="525087275" CurrencyCode="MXN" DecimalPlaces="2" Type="FundingAccountAvailableBalance"></pay:Value> </pay:Values> <pay:Limitations> <pay:AllowedTransactions Maximum="1"></pay:AllowedTransactions> <pay:ValidityPeriod EndDate="2021-06-08" StartDate="2021-05-09"></pay:ValidityPeriod> <pay:CardActivation Mode="InvoiceReception"></pay:CardActivation> </pay:Limitations> </VirtualCard> <Transactions> <Transaction Reference="0UwKkBVRvRhpX38pAcGo7SVYk" Timestamp="2021-05-09T22:51:30" Type="CREATE\_CARD"> <Values> <Value Amount="20125" CurrencyCode="MXN" DecimalPlaces="2" Type="FundsCredited"></Value> <Value Amount="20125" CurrencyCode="MXN" DecimalPlaces="2" Type="ResultingBalance"></Value> <Value Amount="0" CurrencyCode="MXN" DecimalPlaces="9" Type="TransactionFee"></Value> </Values> </Transaction> <Transaction Reference="0UwLlAasmQv0KR7a0h2QokNbz" Timestamp="2021-05-10T00:04:23" Type="FREEZE\_CARD"> <Values> <Value Amount="0" CurrencyCode="MXN" DecimalPlaces="2" Type="FundsCredited"></Value> <Value Amount="20125" CurrencyCode="MXN" DecimalPlaces="2" Type="ResultingBalance"></Value> </Values> </Transaction> <Transaction Reference="0UwJXepQ0dqfAB\_NYf2R24WcX" Timestamp="2021-05-10T22:04:18" Type="DELETE\_CARD"> <Values> <Value Amount="0" CurrencyCode="MXN" DecimalPlaces="2" Type="FundsCredited"></Value> <Value Amount="0" CurrencyCode="MXN" DecimalPlaces="2" Type="ResultingBalance"></Value> </Values> </Transaction> <Transaction Reference="0UwK9Iwrbb9acZ-Vf1P6dsKL6" Timestamp="2021-05-10T00:00:00" Type="SETTLEMENT"> <Values> <Value Amount="0" CurrencyCode="MXN" DecimalPlaces="2" Type="ResultingBalance"></Value> <Value Amount="0" CurrencyCode="MXN" DecimalPlaces="2" Type="ForexFee"></Value> <Value Amount="20125" CurrencyCode="MXN" DecimalPlaces="2" Type="FundsDebited"></Value> </Values> <Details> <Detail Type="ForexRate">0.8240</Detail> <Detail Type="MerchantName">AMIXXXXXXUP</Detail> <Detail Type="Status">OK</Detail> <Detail Type="ApprovalCode">198988</Detail> </Details> </Transaction> </Transactions> <ReportingInfo> <pay:AdditionalInfo Code="SIGN-OFFICE" CodeContext="PNR">9999WS-CUNMX28AE</pay:AdditionalInfo> <pay:AdditionalInfo Code="RESID" CodeContext="PNR">390475-AUT</pay:AdditionalInfo> <pay:AdditionalInfo Code="Ref1" CodeContext="CardInfo">390475-AUTOMATICISSUANCE-090521175128</pay:AdditionalInfo> <pay:AdditionalInfo Code="Ref2" CodeContext="CardInfo">390475-AUTOMATICISSUANCE-</pay:AdditionalInfo> <pay:AdditionalInfo Code="Ref3" CodeContext="CardInfo">Hotel</pay:AdditionalInfo> <pay:AdditionalInfo Code="Ref4" CodeContext="CardInfo">17038001-1:PA-33742</pay:AdditionalInfo> </ReportingInfo> <Reservation BillingRequired="true" CreationDate="2023-07-05" ExternalID="V5PYX8" ID="V5PYX7"> <pay:Travelers> <pay:Traveler> <pnr:Name FirstName="Stjepan" LastName="Jelaska" Title="MR"></pnr:Name> <ttr:contact> <ttr:email>test@ifao.com</ttr:email> </ttr:contact> </pay:Traveler> <pay:Traveler> <pnr:Name FirstName="Stjepan1" LastName="Jelaska1" Title="MR"></pnr:Name> <ttr:contact> <ttr:email>tes1t@ifao.com</ttr:email> </ttr:contact> </pay:Traveler> </pay:Travelers> <pay:Accommodation type="HOTEL"> <etr:start dateTime="2023-07-20"> <etr:address cityCode="MI" cityName="MADRID" complement="NOVOTEL" countryCode="ES" countryName="SPAIN" line="HOTEL" stateCode="AI" zip="69010"></etr:address> <etr:contact email="michiel.baken@moxyhotels.com" fax="+1-907-555-1234" phone="+4969667789330"></etr:contact> </etr:start> <etr:end dateTime="2023-07-27"></etr:end> <etr:customers> <etr:adults>2</etr:adults> <etr:children age="2">3</etr:children> <etr:children age="5">1</etr:children> </etr:customers> <pay:identifier>ADBLR039</pay:identifier> </pay:Accommodation> </Reservation> <pay:Payer BillingDepartmentEmail="abc@gmail.com" BillingManagerName="John" EntityReference="V5PYX7" LegalName="John Enterprises" NationalTaxRegistrationNumber="CYT1212" PayerCode="VOLKS"> <pay:CountryCode>US</pay:CountryCode> <pay:BillingAddress> <pay:AddressLine>Main Street, Suite 5B</pay:AddressLine> <pay:CityName>New York</pay:CityName> <pay:PostalCode>10001</pay:PostalCode> </pay:BillingAddress> </pay:Payer> </Success> </AMA\_PAY\_GetVirtualCardDetailsRS>

## 5.5.3 Possible Errors

See "Error Messages" section.

* * *