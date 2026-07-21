---
url: "https://developers.amadeus.com/api-library/soap/functional-doc/90/doc-read/140708?serviceVersion=24.2"
download_url: "https://developers.amadeus.com/PAS-EAS/api/download/comp/4d4ad2cb456c02633f463a055ab70584/140708/upload_10516201890378472.html"
title: "HTML_UG_WBS_Hotel_Sell_HBKRCQ_24.2_018"
source: "amadeus"
service_id: "90"
service_name: "Hotel_Sell"
version: "24.2"
document_id: "140708"
doc_version: "24.2"
doc_type: "User guide"
file_format: "HTML"
scraped_at: "2026-07-15T10:28:47.620Z"
---
# Function: Hotel\_Sell

* * *

## 1 Overview

### Overview of Hotel\_Sell

The hotel booking flow in web services consists of four steps :

**Message Flow** :

Hotel\_MultiSingleAvailability\[Live Search\] -> Hotel\_EnhancedPricing -> PNR\_AddMultiElements -> **Hotel\_Sell** \-> Hotel\_AddMultiElements  
The last Hotel\_AddMultiElements is an additional step required in only in the case of GDS providers and not for aggregators.

There are two versions of Sell Message :

-   Long Sell :  The Sell Request does not use any data from Avail and Pricing
-   Short Sell : Most of the booking information is referenced from Avail and Pricing that was                                           previously done by the user

For Hotel\_Sell, "**Short Sell**" is used.

## 1.1 Supported Operations

### Types of SELL

Depending upon the provider , the user will have an option to go with either of the three SELL options.

### 1)Individual Sell

The client requests to book a single room in a property. 

### 2)MultiRoom Sell

MultiRoom is categorized into 2 parts : 

i)Identical MultiRoom \[same occupancy\]  
Example :  
Room 1 -> 2 Adults  
Room 2 -> 2 Adults 

ii)Non-Identical MultiRoom \[different occupancy\]  
Example :  
Room 1 -> 1 Adult  
Room 2 -> 2 Adults

One specific scenario occurs for Multiple Rooms in case of Children.

In case of Aggregators, for two or more rooms to be Identical, the Adult & Child count and the order of Children age should be the same.

Example 1 :  
Room 1 -> 2 Adults + 2 Child \[Child 1 = 6 years , Child2 = 5 years\]  
Room 2 -> 2 Adults + 2 Child \[Child 1 = 6 years , Child2 = 5 years\]

For Aggregators, this is a case of Identical Room.

Example 2 :  
Room 1 -> 2 Adults + 2 Child \[Child 1 = 6 years , Child2 = 5 years\]  
Room 2 -> 2 Adults + 2 Child \[Child 1 = 5 years , Child2 = 6 years\]

For Aggregators, this is a case of Non-Identical Room.

Interestingly, for GDS, Example 1 and 2 are considered as Identical MultiRooms. This is because in GDS, the Child Age is not considered as a differentiating parameter but only the adult and child count is considered.

### Independent MultiRoom Sell vs Grouped MultiRoom Sell

There are two types of booking confirmations depending upon the provider.

### a)Independent MultiRoom Sell \[For both GDS and Aggregators\]

Say suppose, the client requests to book more than 1 room in a property.

If the transaction is successful, these rooms will be independently confirmed by the hotel provider and will consist of independent HHL segments in the PNR, with Different Confirmation Numbers.  
For GDS, this is applicable only for Identical MultiRoom. For Aggregators, both Identical and Non-Identical Multiroom is supported.

### b)Grouped MultiRoom Sell \[Only for Hotel Aggregators\]

Say suppose, the client requests to book more than 1 room in a property.

If the transaction is successful, these rooms will be confirmed as one reservation by the hotel provider and the entire booking will be associated to One Confirmation number. The corresponding number of HHL segments will exist in the PNR grouped together with an extra HHL segment that will hold global information (global pricing for all the rooms, global conditions, etc...).

This option is only supported for Aggregator bookings.

### 3) On-Request Booking

On-Request is a type of booking offered by Amadeus for hotel chains hosted in Amadeus hotel CRS and also for select hotel aggregators.  
  
In the case of an On-Request booking, no booking confirmation number is provided by the hotel provider at the time of booking creation.  
  
The final confirmation of the booking is subject to confirmation issued by the hotel provider on a later date and time.  
  
Upon receiving an on-request booking, the hotel provider can choose to perform the following actions:

1\. Accepts the booking in which case the booking is confirmed and a Confirmation number is provided  
2\. Denies the booking in which case the booking is cancelled  
3\. Counter propose the booking with a different price

Note : Its for the hotel providers to decide on what rooms/rates of the property allow on-request bookings.

### Supported Forms of Payment

The forms of payment supported are (Deposit/Guarantee/PrePay). These include Credit Card (Travel Agency Credit Card and Guest Credit Card), Business Account, Wire Payment, Payment Manager, Billback and Credit Line.

### 1) Billback as form of payment

The hotel sell functionality also supports the billback form of payment.

It allows direct payment between the hotel and a corporation or travel agency, via the billback provider.

The billback provider generates the virtual credit card number to be used by the travel agency for booking.

The following mandatory information is sent to the billback provider in the hotel sell request (roomStayData/roomList/guaranteeOrDeposit/groupBillbackData):

• Account Number: Account number between the billback provider and customer(referenceDetails/value).

• Provider Information: Company code of the billback provider (providerInformation/companyCode) andthe identification of travel sector(providerInformation/travelSector).

The travelSector should be specified as HTL.

 The following optional information can be sent:

• Payment instructions: gives the user the ability to specify the payment instructions to be sent to thehotelier (paymentInstructions/freeText).

• Fax no of the provider: gives the user the ability to specify the hotel fax number to be used tosend a Billback fax to the hotelier (supplierInformation/telephoneNumberDetails/telephoneNumber).

The phone or EmailType should be specified as FAX.  
  
A hotel sell request is sent to billback provider, asking for the Virtual Credit Card. The billback provider then returns the following details in response:Virtual credit card numberExpiry date of the credit card.

In order to benefit from billback please check with your account manager or presales engineer.

Commercials and Banking Partners: To benefit from the solution, a contract has to be signed with the travel agency and Amadeus or Conferma. A contract with a banking partner is also required to open a bank account and issue the Virtual Credit Card.

Offline activation of Hotel Billback: As soon as Conferma creates the client account and provides Amadeus with specific credentials (CAI/CBI) to identify the agency, Amadeus is able to activate Billback by updating those CAI/CBI credentials into the agency profile (PVA field).

### 2) B2B Wallet as form of payment

B2B Wallet is a supported form of payment in hotel sell functionality.

This payment method is available for GDS, Amadeus Value Hotels and Booking.com.

To avail this functionality a Travel Agent has to sign a contract with Outpayce,which helps to generate a virtual credit card on behalf of the travel agent.

Billback section of the hotel sell request is reused for B2B functionality.

The following mandatory information is sent for B2B Wallet in hotel sell request (roomStayData/roomList/guaranteeOrDeposit/groupBillbackData):

• Provider Information: Company code should be sent as 1A, as Amadeus Payment Platform contacts the virtualcredit card provider to generate a card on behalf of the Travel Agency/Corporation.The identification of travel sector(providerInformation/travelSector) should be specified as HTL.

The following optional information can be sent:

  
• Payment instructions: gives the user the ability to specify the payment instructions to be sent to the hotelier (paymentInstructions/freeText). Applicable only for GDS. Under the freeText, the source will be M and all the encoding types are supported.   
  
Sample Billback section for B2B Wallet form of payment:

  
<groupBillbackData>

<providerInformation>

<travelSector>HTL</travelSector>

<companyCode>1A</companyCode>

</providerInformation>

<consumerAccount>

<paymentInstructions>

<freeTextDetails>

<textSubjectQualifier>PAY</textSubjectQualifier>

<source>M</source>

<encoding>7</encoding>

</freeTextDetails>

<freeText>INCLUDE BEVERAGES & PARKING</freeText>

</paymentInstructions>

</consumerAccount>

</groupBillbackData>

• Corporation Name: A Virtual Credit Card can be created under the corporation as well if the corporation name is mentioned in the request. It can be specified under the bookingCompany and a flag also has to be set to create the Virtual Credit Card under the specified corporation. Corp name is an equivalent of PayerCode in Outpayce system. This operation is supported only for GDS. 

  
Providing Corporation Name:

<bookingCompany>

<companyQualifier>

<attributeDetails>

<attributeType>CORP</attributeType>

</attributeDetails>

</companyQualifier>

<companyName>

<companyName>ABC Company</companyName>

</companyName>

</bookingCompany>  
  
Flag Set For Virtual Credit Card Generation Under Corporation:

<globalBookingInfo>

<keyValueTree>

<attributeDetails>

<attributeType>PYR</attributeType>

<attributeDescription>Y</attributeDescription>

</attributeDetails>

</keyValueTree>

</globalBookingInfo>

### 3) Travel agent identification as form of payment

The hotel sell also supports payment via Travel agent identification (also called IATA number or booking source).

It allows payment to be made via the IATA number provided as the mandatory element in the input. Below is a sample request message with the form of payment code as "10" for Travel agent identification and the IATA number as "60213754"

<guaranteeOrDeposit>

<paymentInfo>

<paymentDetails>

<formOfPaymentCode>10</formOfPaymentCode>

<paymentType>1</paymentType>

<serviceToPay>3</serviceToPay>

<referenceNumber>60213754</referenceNumber>

</paymentDetails> </paymentInfo>

</guaranteeOrDeposit>

### 4) Credit line as form of payment

The Hotel sell supports Credit line (also called as agency/business account) as an accepted form of payment.

Credit line is a credit facility extended to aggregator properties and Amadeus value content.

The Travel Agent should have a credit line with the provider, and it is to the provider itself that performs all the financial checks before confirming the reservation.

Below is the sample request message for credit line with form of payment code as "9"

<guaranteeOrDeposit>

<paymentInfo>

<paymentDetails>

<formOfPaymentCode>9</formOfPaymentCode>

<paymentType>2</paymentType>

<serviceToPay>3</serviceToPay>

</paymentDetails>

</paymentInfo>

</guaranteeOrDeposit>

###  Other Operations

### 1) GDS & Leisure Supporting Children Occupancy

The hotel sell functionality supports the booking with children as occupancy.  
A Child should be accompanied by an Adult, atleast.  
Child occupancy is supported for both GDS and Aggregator Flow, provided, the provider supports it on their end as well.

 The following information should be mandatory while sending a sell request having child occupancy :

• Child Age

• Child Count

 This information should be part of guest details.

If a child is present in hotel sell, then age of the child should be present.

In case the child age is missing in the hotel sell request, the hotel provider will process the booking request but without child information.

<guestList>  
<occupantList/>  
<age>  
<quantityDetails>  
<qualifier>AGE</qualifier>  
<value>5</value>  
</quantityDetails>  
</age>  
</guestList>

### 2) Loyalty Program and Frequent Traveler Information

In Hotel\_SELL we support 2 different options :  
  

### a) Loyalty Program :

It is meant to convey the loyalty program number to an already registered customer under the loyalty program.

The loyalty program number refers to the Hotel chain rewards program membership ID of the guest. It is passed under the customer info section in the request as shown below

<customerInfo>

<customerReferences>

<referenceQualifier>1</referenceQualifier>

<referenceNumber>121436590</referenceNumber>

</customerReferences>

</customerInfo>

### b) Frequent Traveller Information :

If a customer is registered to a loyalty program with the airline and an agreement or a partnership exists between the Airline and the Hotel Chain.

The frequent traveler number refers to the airline frequent flying program membership number of the guest. This is accepted by some hotels for rewards and offers. 

<frequentTravellerInfo>          

<frequentTravellerDetails>                     

<carrier>AB</carrier>                     

<number>AB534176123</number>                 

</frequentTravellerDetails>               

</frequentTravellerInfo>  
  
Note: In order to use the above mentioned features, the respective options should be allowed at chain configuration level.

### 3) Provide 3DS authentication outcome (tdsinformation)

Payment Services Directive (PSD) is an EU directive administered by the European Commission to regulatepayment services and payment service providers throughout the European Union and European Economic Area (EEA). One of the objective of this directive is to protect the consumers (travelers) from the risk offraudulent actions in online payments. PSD1 was opened up in EU banking and financial services marketsabout 10 years ago. PSD2 is a revised regulation formulated to better align with the current state of marketand technology. It will secure online payments done with credit cards or debit card by adding an extra level ofauthentication known as Strong Customer Authentication (SCA).

Strong Customer Authentication (SCA) ensures that the person using credit/debit card is the owner of the saidcard thereby prevents stolen cards being used for online payments. This is achieved by introducing two-factoridentification during payments and thereby creating additional friction at check-out. 3DS (3-Domain-S) is thepayment protocol which offers secure online payments by multi-factor authentication.

To follow 3DS protocol, the additional information or fields which are the output of authentication process needto be supported. WBS customers are responsible to collect and send the necessary information (IDs) generatedat the time of authentication process.

### 3) Statistical Fields Information

Statistical fields are pieces of information required for billing purposes. This information is sent to the hotel aggregator during the reservation transaction. This allows the hotel aggregator to correctly identify who has made the booking and perform an accurate invoice reconciliation.

These fields are determinded by the agreement between the hotel aggregator and the corporations(agencies)

 <statisticalFields>

<indexNumber>

<referenceDetails><

type>IND</type>

<value>1</value>

</referenceDetails>

</indexNumber>

<fieldDetails>

<criteriaDetails>

<attributeType>Agency Reference</attributeType> <attributeDescription>ADREXO</attributeDescription>

</criteriaDetails>

</fieldDetails>

</statisticalFields>

## 1.2 Limitations

The client has to follow some rules regardless of the booking type:  
1)If the hotel booking is to be created in an existing PNR that has already been committed, then the PNR has to be previously retrieved.  
  
2)In general, for GDS bookings, a successful sell has to be followed by an End of Transaction command in the following 60 minutes after the Sell, otherwise the booking will be auto-ignored by Amadeus.However, the WBS session is only open for a maximum 14 minutes. So, a End of Transaction command has to be triggered within that timeframe.  

Note: this Internal Timeout is not applied for Aggregator bookings, because the reservation is auto-committed at Sell transaction.

## 1.3 Unsupported Operations

1)Long Sell is not supported: A Sell needs to be done with a reference from the pricing response.  
2)Only Some Forms of Payment are supported as (Deposit/Guarantee/PrePay) which are Credit Card (Travel Agency Credit Card and Guest Credit Card), Business Account, Wire Payment, Payment Manager and Credit Line  
3)The ghost hotel booking is not supported: If the confirmation number of the booking is specified in the cryptic entry, the booking is qualified as “ghost booking”. This type of booking is used when the room/rate is not able to be booked through the Amadeus system  
4)The forced standard access booking are not supported : A forced Standard Access booking is performed on a complete access or complete access plus chain  
5)The Standard Access Fallback is not possible for Sell transaction. In case of timeout from the provider, the error "CHECK VOUCHER RECEPTION AND CALL HELPDESK - BOOKING\_FAILURE" will be displayed.  
In case the provider returns a non-critical error, the error will be displayed but without fallback in Standard Access.

## 1.4 Prerequisites

-   A PNR is active in the user context. If the user works on an existing PNR that has already been committed, the PNR has to be previously retrieved.  
      
    
-   An availability and Hotel\_EnhancedPricing request needs to be done.

## 2 Building A Query

Attribute

Inclusion

Description

Example

**systemIdentifier**

C

Conveys the system identifier

\-          _deliveringSystem_:

                companyID

conveys the system identifier

WEBS

**bookingCompany**

C

This is used to convey the company creating the booking

\-          companyQualifier

M

Will indicate the qualifier of the company name

-   _attributeDetails_: **attributeType**

M

Valid values: SSB, SBR, BRA, CORP

\-          companyName

M

This element is used to set the Brand,  Sub-brand or Corporation Name

-   **companyName**

C

To convey the company name or corporation name

groupIndicator

travelAgentRef

**bookingPayerDetails**

C

This group contains the booking payer details

\-          bookerName

M

This segment contains the booker name(s) when he/she is a person that is not occupant

-   travellerNameInfo

C

Name attributes of a passenger

-   _travellerNameInfo_: **quantity**

C

Number of travellers

-   _travellerNameInfo_: **age**

C

Age of traveller

-   otherPaxNamesDetails

M

Passenger Name details

-   _otherPaxNamesDetails**:**_ **surname**

M

Passenger surname

-   _otherPaxNamesDetails**:**_ **givenName**

C

Passenger first name

-   _otherPaxNamesDetails**:**_ **title**

C

Title – example: **MR**

\-          occupantPersonalInformation

C

This segment conveys the gender of the guest and document information related to a traveler.

-   regulatoryGender

C

Gender as mentionned on Identification document

-   documentIdentification

C

To specify the Document References

-   _documentIdentification_: **type**

C

This is to send the document type :  
Valid values:

**NI**,

**OTH**,

**PT**,

**VI**,

**CED**,

**CPF**

-   _documentIdentification_: **number**

M

Send the number of the identification document

**roomStayData**

M

This group is defined for roomstay. One instance per room.

**globalBookingInfo**

C

Contains information that defines the booking on a global way

\-          bookingSource

C

This segment is used to convey the booking source.

-   originatorIdentification

M

Originator Identification Details

-    _originatorIdentification**:**_ **originatorID**

M

Booking Source Number

12345675

  -          textOptions

 C

This segment is used to convey additional information which is entered by the agent and stored on the hotel booking. In the case of a Group Booking, it just conveys the supplementary information (/SI) that is attached to the whole group booking. (max. 120 chars)

-   remarkDetails

 M\*

 Miscellaneous remarks

-   type

 M

 Value 'HSI' for Hotel supplementary information.

HSI

-   freetext

 M\*

 Free text and message sequence numbers of the remarks.

LATE ARR

-   businessFunction

 C

 Value '3' for Hotel Provider (HHL).

3

-   language

 M\*

A2 

language code used for the free text.

EN

-   source

 M\*

 Value 'M' for manual.

M

-   encoding

 M\*

Values :

1

ASCII 7 bit

7

UTF-8

7

\-          globalPriceOverride

C

This segment is used to convey the total price of the reservation

-   tarrifInfo

C

To convey the tariff information

-   _tarrifInfo:_ **amount**

C

This field is used to convey the amount excluding tax.  
This field is mutually mandatory with totalAmount

-   _tarrifInfo:_ **currency**

M

This field is used to convey the currency

-   _tarrifInfo:_ **dailyTotalIndicator** 

M

Rate DLY or TTL indicator  
**DY** for Daily  
**3** for Total

-   _tarrifInfo:_ **status** 

C

Valid values: rate quoted, Guaranteed, rate override

-   _tarrifInfo:_ **rateChangeindicator** 

C

To specify the fact that a rate change occurs during the period of the stay

-   _tarrifInfo:_ **totalAmount** 

C

This field is used to convey the total amount included tax.  
It is mutually mandatory with amount.

-   chargeDetails

C

To convey all the extra charge information

-   _chargeDetails:_ **chargeCode** 

C

Associated charge type  
examples:  
**4** for Extra Adult  
**5** for Rollaway Adult for Crib

-   _chargeDetails:_ **amount** 

C

To convey the amount of the supplementary charge

-   _chargeDetails:_ **description** 

C

Used to describe the associated charge

-   _chargeDetails:_ **currency** 

C

To convey the currency

**statisticalFields**

C

This group conveys the information about corporate specific statistical fields.

\-indexNumber

M

The segment conveys information about the index number of the statistical field. The index number is maintained by the provider with an association to the corporate specific statistical fields.

\-fieldDetails

M

The segment conveys information about the  about the label: value pair of the statistical field. The label: value pairs are sent to the hotel provider as part of booking transaction

**representativeParties**

C

Information on Global Guest list for individual booking and group bookings  
In the case of Groups booking it also contains:  
\- group name

\-          occupantList

M

This segment contains either:  
\-the booking holder tattoo   
\-the group tattoo  
\-All the occupant

-   passengerReference

C

To convey the passenger details

-   _passengerReference**:**_ **type**

M

Type of reference. Examples  
**BHO** for Booking Holder Occupant  
**BHN** for Booking Holder Non Occupant  
**P** for Booking Holder  
**BOP** for Occupant (non holder)

\--> only one BHO or BHN or P who is holder , the other guests are BOP

BHO

-   _passengerReference:_ **value** 

M

Value of the association reference

2

\-          age

C

This segment conveys the age of the person

-   quantityDetails

C

To convey the quantity details

-   _quantityDetails_: **qualifier**

M

Valid value: **AGE**

-   _quantityDetails:_ **value** 

M

Age = number of years (default) or monthes.

\-          guestContactInfo

C

This segment conveys the guest email address

-   _phoneOrEmailType_

M

Valid values:  
**3** for Business Phone  
**EML** for Email Address  
**FAX** for Fax Number

-   telephoneNumberDetails

C

Telephone Number or Fax Number element

-   _telephoneNumberDetails:_ **telephoneNumber** 

M

Number

-   _emailAddress_

C

Email Address

\-          occupantPreferences

C

Contains details on user preferences :  
\_ Language code

-   _occupantPreferences_

C

Details on user preferences

-   _occupantPreferences:_ **occupantLanguage** 

C

This is segment is used to convey the information regarding the preffered Langauage for the traveller.

\-          occupantPersonalInformation

C

This segment conveys the gender of the guest and document information related to a traveler.

-   regulatoryGender

C

Gender as mentionned on Identification document

-   documentIdentification

C

To specify the Document References

-   _documentIdentification_: **type**

C

This is to send the document type :  
Valid values:

**NI**,

**OTH**,

**PT**,

**VI**,

**CED**,

**CPF**

-   _documentIdentification_: **number**

M

Send the number of the identification document

\-          occupantAddress

C

To convey the address of the occupant

-   _countryCode_

C

Country Code

  -          residenceCountry

  C

  To convey the country of residence of the traveller

-   destinationCountryCode

  M

  ISO Country code

\-          travellerNationality

  C

  To convey the Nationality of the traveller

-   nationalityQualifier

  M

  Valid Value:  
  2 for Current Nationality

-   nationalityCode

  C

  ISO Country code

**roomList**

C

Conveys the information of each roomstay

**roomRateDetails**

C

Convey the room /rate details

\-          hotelProductReference

C

Provides an Hotel recommendation number :  
\- **Booking Code**   
\- **Product Index**

-   referenceDetails

M

Use to convey the reference details

-   referenceDetails: **type**

C

Valid Values:  
**HPI** for Hotel Product Index  
**BC** for Booking Code

BC

-   referenceDetails: **value**

C

Reference number

C2TRAC

**customerInfo**

C

Hotel Loyalty Program (Rewards)

\- customerReferences

M

-   customerReferences: **referenceQualifier**

M

"1"

1

-   customerReferences: **referenceNumber**

M

Hotel Loyalty Membership Number (AN1..21)

600070450000

**frequentTravellerInfo**

C

Airline frequent traveller number (airline loyalty program, Miles)

\-          frequentTravellerDetails

M

-   _frequentTravellerDetails:_ **carrier** 

C

Airline Code (AN2)

-   _frequentTravellerDetails:_ **number** 

M

Airline Loyalty Membership Number (AN1..28)

**guaranteeOrDeposit**

C

Used for the guarantee or deposit information

\-          paymentInfo

M

Used to convey the guarantee or deposit or prepay form of payment

-   paymentDetails

M

Use to convey the payment details

-   _paymentDetails:_ **formOfPaymentCode**

M

Convey the guarantee /deposit/PrePay form  
Examples:  
**1** for Credit Card  
**10** for Travel Agent Identification

1

-   _paymentDetails:_ **paymentType**

M

Used to indicate if it is a guarantee or a deposit or a PrePay.  
Valid values:  
**1** for Guarantee  
**2** for Deposit

**4** for PrePay

1

-   _paymentDetails:_ **serviceToPay**

M

Used to identify the type of service to be paid.  
Valid value: **3** for hotel

3

-   _paymentDetails:_ **referenceNumber**

C

Used to convey the guarantee or the deposit or PrePay reference

**<groupCreditCardInfo>**

C

**<creditCardInfo>**

M

**\- <ccInfo>**

C

-   <vendorCode>

M

AN2

-   **CA** for MasterCard
-   **VI** for Visa
-   **AX** for American Express
-   **DC** for Diners Club
-   **DS** for Discover Card
-   **JC** for Japan Credit Bureau (JCB)
-   **TP** for Universal Air Travel Plan (UATP)
-   **UP** for China UnionPay

CA

-   <cardNumber>

M

N1..19

5555555555555555

-   <securityId>

C

N3

-   <expiryDate>

M

N4

MMYY

1219

-   <ccHolderName>

C

AN1..99

**<groupTdsInformation>**

C

Group for adding three domain secure (3DS) authentication fields. 

  <authenticationdata>

C

    <authenticationdatadetails>

      <veres>

C

Card or Issuer participation. 

Used in 3DS version 1.

Format: a1

Occurence: 0..1

Possible Values:

Y: Cardholder enrolled to use 3DS (authentication available)

N: Cardholder notenrolled to use 3DS

U: Unable to authenticate (authentication could not be performed)

E: Error

Y

      <pares>

C

Used in 3DS version 1

Format: a1

Occurence: 0..1

Possible Values:

Y: Authenticationsuccessful

N: Authentication failed

U: Authentication couldnot be performed

A: Attempts processingperformed

E: Error

Y

      <authenticationindicator>

M

ECI (Electronic Commerce Indicator)

Payment System - specific value provided by the ACS or DS toindicate the results of the attempt to authenticate the Cardholder

Used in both 3DS versions

Format: AN..2

Occurence: 1

      <transstatus>

C

Used in 3DS version 2

Format: a1

Occurence: 0..1

Possible Values:

Y: Authenticationsuccessful

N: Authentication failed

U: Unable to authenticate(authentication could notbe performed)

A: Attempt processing performed

E: Error

C: Challenge requested

D: Decoupled challenge requested

R: Authentication rejected, do not authorize

I: Information only

Y

    <tdsversion>

M

3DS version - Informative field which mentions the version of the protocol that was used

Used in both 3DS versions

Format: AN1..35

Occurence: 1

1.0.2

    <tdsblobdata>

C

Conveys various messages/encrypted data used during the 3DS authentication processes

Occurence: 1..9

      <tdsblbidentifier>

M

Identifies the content of the BLB that follows

        <referencedetails>

M

          <value>

M

This is used for sending:

-   CAVV - both 3DS versions
-   XID - 3DS version 1
-   DS\_TRANSACTIONID - 3DS version 2

CAVV: Cardholder Authentication Verification Value

XID: The transaction identifier assigned by the directory server to identify a single transaction. (for 3DS version 1)

DS\_TRANSACTIONID: Universally unique transaction identifier assigned by the directory server to identify a single transaction. (for 3DS version 2)

Format: AN1..60

Occurence: 1

CAVV

      <tdsblbdata>

M

        <datalength>

M

Format: N1..15

20

        <datatype>

C

Format: AN1

B

        <binarydata>

M

Base 64 encoded value of CAVV/XID/DS\_TRANSACTIONID

CAAV - AN1..32

XID - AN1..99999

DS\_TRANSACTIONID - AN1..36

hgyfv67547hjgfy6543y

**<groupBillbackData>**

C

\-          providerInformation

M

Conveys the external payment server information

-   _travelSector_

C

Used to qualify the company code, to identify the industry business it belongs  
Valid value: **HTL** for Hotel

-   _companyCode_

M

Used to convey the company code of a company

-   _companyNumericCode_

C

Used to convey the  numeric merchant ID

\-          deploymentId

C

Conveys the Payment Record to identify payment in a unique manner.

-   _referenceType_

M

Qualifies the type of the reference used  
Values:  
**PRI** for Payment Record Id  
**EXT** for Third Party Record Id  
**APP** Application Correlator Id

-   _uniqueReference_

M

The value of the payment record/correlator Id

\-          agentidentification

C

Convey the identification used by the travel agent to perform the booking

-   _originatorTypeCode_

M

Identify the type of agent.   
Valid Values:  
**T** for Agent ID  
**G** for booker ID

-   _originator_

M

ID of the agent who performs the booking

\-          supplierInformation

C

Convey either the phone or the email address of the supplier

-   _phoneOrEmailType_

M

Valid values:  
**3** for Business Phone  
**EML** for Email Address  
**FAX** for Fax Number

-   telephoneNumberDetails

C

Telephone Number or Fax Number element

-   _telephoneNumberDetails:_ **telephoneNumber**

M

Number

-   _emailAddress_

C

Email Address

\-          paymentInstructions

C

Convey the payment instructions

-   freeTextDetails

M

Type of remarks added

-   _freeTextDetails:_ **textSubjectQualifier**

M

Valid Values:  
**PAY** for Payment Instruction (BillBack)  
**CNA** for Contact Name  
**RAT** for Rate Information  
**CAP** for Cancellation Policy  
**BOP** for Booking Platform

-   _freeTextDetails:_ **source**

M

Source of comments  
Example:  
**M** for Manual

-   _freeTextDetails:_ **encoding**

M

Type of encoding  
**7** for UTF-8

-   freeText

M

Free text remarks.

\-          consumerAccount

M

Convey the consumer account code

-   referenceDetails

C

  

-   _referenceDetails:_ **type**

C

Payment reference  
Valid Value:  
**PRI** for Payment Record ID

-   _referenceDetails:_ **value**

C

Value of the Payment reference

**guestList**

C

List of guests of the room

\-          occupantList

M

Information on the role of the guest

-   passengerReference

C

Used to convey the passenger reference number

-   _passengerReference:_ **type**

M

Type of reference  
Examples:  
**RMO** for Room Main Occupant  
**RMN** for Room Main Non Occupant  
**ROP** for Room Occupant

\--> only one RMO or RMN , the other guests are ROP  

RMO

-   _passengerReference:_ **value**

M

Value of the association reference

2

\-          age

C

Used to convey the age of the person

-   quantityDetails

M

Used to convey the passenger reference number

-   _quantityDetails:_ **qualifier**

M

Value: **AGE**

-   _quantityDetails:_ **value**

M

Age = number of years (default) or monthes.

**Inactivity Time Out:**

The Inactivity Time Out is a timer of 59 minutes by default. The timer is set when the hotel segment is added to the PNR. After this delay, if the PNR is not committed, the booking is automatically ignored (an ignore message is sent to the CRS(Central Reservation System)), and if the user attempts to modify, ignore or commit the PNR, an error is displayed.

**Updates on Hotel\_Sell (in this version)**

3DS authentication information added in the request message.

## 3 Receiving A Reply

1.  Parameters in the response for Leisure Bookings:

This is not a technical description of the grammar. The table below just gives additional functional details of each field.

Attribute

Inclusion

Description

1 Error

C

Internal error code

  1 BookingPayerDetails

  C

  Provide booker info

  1.1 Booker Name

  M

  To specify the booker name

  1.2 Payer reference

  C

  To convey the booker reference

  1.3 Personal Information

  C

  To specify personal identification

2 PNR information

  

  

2.2 PNR Record

  

  

PNR record locator

C

This is the unique reference of the PNR that is being modified. This record locator is present only if an end of transaction has already been applied in the past for this PNR.

3 Customer Information (1..n)

  

Information about customers involved in the booking.

3.1 Passenger information in PNR

M

Passenger information stored in PNR

3.1.1 Passenger tattoos

C

These are the references to the passenger segments of the PNR associated to the booking.

3.1.2 Passenger role

M

The role of the passenger in the reservation can be any of the following:

BHN, BHO, BOP, GRN, P

3.2 Additional Information

O

Additional information about customers or Travel agent involved in the booking.

Travel Agent Email reference

M

Reference of the PNR segment where the Travel Agent email is located.

**Bookinginfo**

reservation

C

companyId  

C

Company will be 1A by default

controlNumber  

C

Control number is an alphanumeric field with maximum length of 16. 

controlType

C

Defines the control number 

X

Cancellation Reference

2

Confirmation Reference

O

On request ID

4 Booking information mirrored from the request

  

These pieces of information are not added values of the process.  However, they are useful to the end-user (for the display of the booking, for example)

**Booking source**

M

Booking source number

**4.1 Hotel property information**

  

  

**Property identifier**

M

Unique identifier of the property

**Check-in / check-out information**

M

Check-in and Check-out information of the property.

**Check-in / check-out description**

M

Additional description on the check-in and check-out information

**4.2 Room-stay information (1..n)**

  

  

**4.2.1 Room information**

  

  

**Check-in date**

M

Date at which the guest(s) begin(s) the stay at the hotel.

**Check-out date**

M

Date at which the guest(s) end(s) the stay at the hotel.

**Room type**

C

This is the dummy room type (ROH).

  **Rate plan code**

  C

  The booked rate code

  **Rate category code**

  C

  rate family code which corresponds to the booked rate code

  **Rate Qualified Indic**

  C

When rate family information is present, qualifies the rate family:

-   First occurence is the rate type: C (Conditional), N (Negotiated) or P (Public)
-   Second occurrence indicates if conversion happened on Amadeus side: Y (Yes) or N (No)

**Room adult occupancy**

M

The max number of adults that will occupy the room

**4.2.1.1 Room occupant/contact information**

**C**

  

**Passenger tattoo**

M

This is the reference to the passenger segment of the PNR associated to the room-stay.

**Child age (1..9)**

O

Convey the age of the child if present

**4.2.2 Rate information**

  

  

**Booking code**

M

It is returned in non-standard format: the dummy value “\*\*\*\*\*\*”

**Rate plan code**

M

This is the dummy value of the Rate Plan (RAC)

**Rate type information**

M

Text information added by the user about the rate booked

**4.2.3 Pricing options**

  

The pricing options requested are returned, validated

**American plan**

\-Currency  
\-Amount  
\-number of person

C

M  
M  
M

3 meals per day per person

Currency for the following amount  
Price per plan: mirror of the input (actual price in RTSVCH)  
Number of persons needing the plan

**American plan modified**

\-Currency  
\-Amount  
\-Number of person

C

  
M  
M  
M

2 meals per day per person

  
Currency for the following amount  
Price per plan: mirror of the input  
Number of persons needing the plan

**American plan Family**

\-Currency  
\-Amount  
\-Number of person

C

  
M  
M  
M

3 meals per day for a family

  
Currency for the following amount  
Price per plan: mirror of the input  
Number of members of the family

**American plan Family modified**

\-Currency  
\-Amount  
\-Number of person

C

  
M  
M  
M

2 meals per day for a family

  
Currency for the following amount  
Price per plan: mirror of the input  
Number of members of the family

**Rollaway bed Adult**

  
\-Currency  
\-Amount  
\-Number of person

C

  
M  
M  
M

Gives the price and the number of rollaway beds for adult requested by the user.

Currency for the following amount  
Price per rollaway bed: mirror of the input  
Number of rollaway beds

**Rollaway bed Child**

  
\-Currency  
\-Amount  
\-Number of person

C

  
M  
M  
M

Gives the price and the number of rollaway beds for child requested by the user.

Currency for the following amount  
Price per rollaway bed: mirror of the input  
Number of rollaway beds

**Crib**

\-Currency  
\-Amount  
\-Number of cribs

C

M  
M  
M

Baby crib(s) in the room

Currency for the following amount  
Price per crib: mirror of the input  
Number cribs

**Extra Person in room**

\-Currency  
\-Amount  
\-Number of person

C

M  
M  
M

Extra person(s)

Currency for the following amount  
Price per extra person: mirror of the input  
Number of extra persons

**4.2.4 payment information**

  

  

**Guarantee**

O

Gives the method and references of guarantee

**Mutually exclusive** with deposit

**Deposit**

M

Gives the method of deposit from the following list:

\-          Credit Card

\-          Credit Line

\-          Bank Transfer

\-          Direct Debit

**Mutually exclusive** with guarantee

**Delayed Payment indicator**

O

Y/N if Y the payment will be delayed.

This is only available if the method of payment is Credit Card or Direct Debit

**4.2.4.1 Credit Card Information**

C

In case the payment is done by Credit Card

**Credit Card Vendor Code**

M

Vendor code of the Credit Card (e.g.: VI, MC, AX …)

**Credit Card Number**

M

Credit Card Number

**Credit Card Expiration Date**

M

Expiration Date of the credit card (e.g.: 1211)

**Owner Type** 

O

Type of Credit Card Owner:

\-          Guest

\-          Travel Agency

Default is Guest.

**4.2.5 Customer information**

  

  

**Corporate discount ID**

C

Corporate discount id specified by the user or added automatically by the system.

**Customer ID**

C

Identifier of the customer specified by the user. Also used to refer to the Hotel Loyalty Program number(Rewards)

**Frequent traveller number**

C

Reference of the hotel/airline loyalty program specified by the user.

**4.3 Other information**

  

  

**Supplementary information**

C

Additional free flow text information transmitted to the provider

5 Booking information - Added Information

  

These pieces of information are the added values of the process.

**Confirmation number**

M

The confirmation number is returned by the CRS.

**Max check-in time**

C

If a hold time applies for the booking, the max hour for the check-in is returned.

**Global taxes**

\-          amount

\-          currency 

C

_Returned only in case of group booking_

The taxes associated to the booking as a whole.

**Global commission**

\-          included / excluded / unknown

\-          amount & currency

\-          percentage

C

_Returned only in case of group booking_

The commission associated to the booking as a whole.

**Global cancellation policies**

\-          amount

\-          currency

C

_Returned only in case of group booking_

The cancellation policies associated to the booking as a whole.

**5.1 Room-stay information**

  

  

**Room-stay PNR segment tattoo**

M

Reference of the room-stay hotel segment in the PNR

**Room-stay index**

C

The unique number in the reservation referencing the room-stay

**Room-stay marketing line**

O

  

**5.1.1 Room-stay Rate information**

  

  

**Rate amount**

M

Amount of the rate booked.

**Rate amount type**

C

The rate amount can be: quoted (if specified by RQ option) or overridden (if specified by AO option)

**Rate currency**

M

Currency of the rate booked.

**Rate plan indicator**

M

Tells if the rate amount is daily or for the total stay.

**Rate change indicator**

M

Boolean. Indicates if the rate is changing during the stay.

**Cancellation rules**

\-          last time to cancel

\-          fee amount

\-          number of nights charged

\-          fee description 

C

All information related to the cancellation policies.

The fee amount and the number of nights charged are mutually exclusive.

Cancellation date and time can be in GMT or Local time (LT)

**Payment condition**

M

\-          guarantee required

\-          deposit required

\-          hold-time

**Authorized forms of payment**

C

Credit Card, travel agency identification, CD number, address, MCO, advance deposit, check…

**Booking restrictions**

C

Description of the booking restrictions, per category

**5.1.1.1 Additional services (0..200)**

**O**

**Additional services requested in a hosted property. Only available for trusted channels.**

Service code

M

  

Service Booking ID

M

Service unique booking identifier

Quantity

M

  

**5.1.1.1.1 Requested period (0..183)**

**O**

**Requested dates for the given service**

Requested Begin date

M

  

Requested End date

M

  

**Authorized forms of payment**

C

Credit Card, travel agency identification, CD number, address, MCO, advance deposit, check…

**Booking restrictions**

C

Description of the booking restrictions, per category

**5.2 Room List Information**

C

  

**5.2.1 Request table Information**

M

  

**5.2.1.1 Room Rate Details**

M

  

**5.2.1.1.1 Guarantee Or Deposit**

C

  

**5.2.1.1.1.2** **Group Billback Data**

**c**

Contains the Bill back mode of payment details

Provider Information

M

This contains information’s like travel Sector (AIR, CAR…etc), Company Code, Company Numeric Code

Deployment ID

C

This contain reference type (PRI, APP ), Unique Reference.

Agent Identification

C

Contains Originator Type Code ( A,B, C..) and Originator Information

Supplier Information

C

Contains Phone/Email, Telephone number details, Telephone Number, Email Address

Payment Instructions

C

Contains Free Text, Test subject qualifier (BOP, CAP, CAN ) , Source( F,M, S), Encoding

Customer Account

M

Contains reference Details, Type (PRI), value.

**4.1.1.1.2 Rate changes (0..365)**

**C**

**Rate changes for the requested service**

Begin date

M

Begin date for the rate change period

End date

M

End date for the rate change period

Amount

M

  

Currency

M

  

Pricing mode

M

Per person, per room, per service

Pricing frequency

M

Per day, per week, per month, per stay

Taxes included indicator

M

Boolean

**5.1.1.1.3 Total amount (0..1)**

**O**

**If computed by AHP CRS**

Currency

M

  

Taxes included indicator

M

Boolean

Amount

M

Total amount for the requested periods

**5.1.2 Warnings**

C

List of warning messages concerning the room-stay

4.2 Descriptive content

  

These pieces of information can be used for the display of the booking to the end-user.

**Hotel property name**

M

The name of the hotel booked.

**Hotel chain name**

M

The name of the chain of the booked hotel.

**Safety compliancy indicator**

M

Boolean. Indicates if the property is safety compliant.

**Marketing lines**

C

This text is displayed to the end-user with the booking.

**2.2 System Identifier**

C

This code is used to display the system from where the booking is done. Eg: AET for AeTM, HTP for Hotel+

**2.3 Booking Company**

C

  

Company Qualifier

M

This code is used to define whether the company name is a Brand or Sub-brand. BRA for Brand and SBR for Sub-Brand.

Company Name

M

This is the text field which is used to display the name of the Brand/Sub-brand

3.1.2 Guest Contact Information

C

The email tag is introduced to send the Guest’s email address so that an email can be sent to get the review.

3.1.2.1 Phone or email type

M

This code is used to specify that information is email. Code: EML

3.1.2.2 Email Address

C

This is the text field which has the email address in it.

3.1.3 Occupant Preferences

C

This is the text field which is used to convey the Guest’s preferred Language.

3.1.4 Occupant Personal Information

C

This is a coded field used to convey the gender of the Guest. F for Female and M for Male.

  3.1.4.1 RegulatoryGender

  C

 Gender as mentioned in personal identification doc

  3.1.4.2 documentIdentification

  C

 To specify document references

  3.1.4.2.1 Type

  C

 Specify doc type; eg - Passport, National ID etc

  3.1.4.2.2 Number

  M

 Identification Document Number eg. Passport Number

3.1.5 Occupant Address

C

This is text field for the information of Guest’s Country.

**3.2 Key Value Tree**

C

This is a coded field for the information if the request is eligible for review. (Code : EFR)

**Updates on Hotel\_SellReply (in this version)**

No change in the response message.

## 4 Error Messages

-   In case of error returned by the provider (OTA or EDIFACT code), an error message is sent back to the client application (Amadeus Code - Canned Message)

### Error Codes - Most usuals:

**ERROR CODES**

**DESCRIPTION**

**PR or 1A**

**COMMENT**

00211

**NUMBER OF SEGMENTS EXCEEDS 99**

1A

00425

**INVALID DATE**

PR or 1A

OTA 15 or 458

00704

**INVALID DATE RANGE**

PR or 1A

OTA 404

01300

**LENGTH OF STAY EXCEEDS MAXIMUM**

PR or 1A

OTA 377 or 409

01302

**NUMBER OF ROOMS GIVEN EXCEEDS LIMIT**

PR or 1A

OTA 106 or 378

01956

**RESTRICTED DURING SPLIT PARTY**

1A

01988

**NEED PASSENGER/SEGMENT ASSOC**

1A

03237

**PROPERTY CODE NOT FOUND IN SYSTEM**

PR or 1A

OTA 392

03514

**TEMPORARILY NOT AVAILABLE**

PR or 1A

OTA 187

04070

**UNABLE TO PROCESS – PLEASE CONTACT HELP DESK**

PR or 1A

OTA 696

08194

**DAY USE NOT ALLOWED**

PR or 1A

OTA 410

12018

**INVALID BOOKING SOURCE NUMBER**

1A

22426

**CREDIT CARD SECURITY CODE REQUIRED /DP-**

1A

25860

**CHECK VOUCHER RECEPTION AND CALL HELPDESK - BOOKING\_FAILURE**

1A

25862

**CREDIT CARD HOLDER NAME REQUIRED**

1A

25863

**CREDIT CARD HOLDER ADDRESS REQUIRED**

1A

25864

**EMAIL ADDRESS MISSING OR INVALID**

1A

25865

**HOLD PERIOD EXPIRED – PLEASE RETRY**

1A

25866

**UNEXPECTED PNR ACTIVITY – PLEASE COMMIT FIRST**

1A

PNR with uncommited segments.

If **AGGR**, we need a PNR clean because we will commit it

01903

**CHECK PASSENGER ASSOCIATION**

1A

-   MultiRoom: same guest in 2 rooms

03659

**CREDIT CARD DEPOSIT REQUIRED**

PR

OTA 350

01207

**INVALID FORM OF GUARANTEE CHECK HP-DISPLAY**

PR

OTA 389

35393

**TOTAL AMOUNT CHANGE DETECTED**

PR

OTA 883. If AGGR and detected by Amadeus

35394

**CURRENCY CHANGE DETECTED**

PR

OTA 884. If AGGR and detected by Amadeus

24081

**CREDIT CARD DENIAL - NO AUTHORIZATION DONE**

1A

OTA 189. This error will thrown -

1\. If 3DS authentication mandatory fields are missing.

2\. If length of XID/CAVV/DS\_TRANSACTIONID is more than expected.

Note: The Error Code list is not exhaustive

### Warnings Codes - Most usuals:

**WARNING**

**DESCRIPTION**

**PR or 1A**

**COMMENT**

01487

ATTENTION - RATE CHANGES DURING STAY

1A

01298

ALTERNATE RATE CONFIRMED

1A

03797

SAME DAY CHECK IN-CHECK OUT APPLIES

1A

33551

BEWARE: PRICE RETURNED BY HOTEL CHAIN LOWER THAN REQUESTED

1A

Markup

33552

BEWARE :PRICE RETURNED BY HOTEL CHAIN HIGHER THAN REQUESTED

1A

Markup

33232

MARK-UP ENGINE NOT AVAILABLE. MARK-UP NOT APPLIED TO RATE

1A

Markup

Note: The Warning Code list is not exhaustive

## 4.1 Error Reply

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Hotel\_SellReply xmlns="http://xml.amadeus.com/HBKRCR\_24\_2\_1A"> <bookingTypeIndicator> <numberOfRooms> <quantity>1</quantity> <statusCode>HK</statusCode> </numberOfRooms> </bookingTypeIndicator> <roomStayData> <markerRoomStayData></markerRoomStayData> <errorInformation> <messageErrorInformation> <errorDetails> <errorCode>00704</errorCode> <errorCategory>EC</errorCategory> <errorCodeOwner>PR</errorCodeOwner> </errorDetails> </messageErrorInformation> <errorDescription> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>HERR</informationType> <language>EN</language> <source>S</source> <encoding>1</encoding> </freeTextDetails> <freeText>INVALID DATE RANGE</freeText> </errorDescription> <markerErrorInformation></markerErrorInformation> </errorInformation> </roomStayData> </Hotel\_SellReply>

  

* * *

## 5 Operations

## 5.1 Operation: B2B Wallet as Form Of Payment

This form of payment allows customers to make payment via B2B Wallet thereby allowing the user to have an option to mention the corporation name and payment instructions. Below is an example of the request and the response message with B2B Wallet as form of payment

## 5.1.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<soapenv:Envelope xmlns:wbs="http://xml.amadeus.com/ws/2009/01/WBS\_Session-2.0.xsd"> <soapenv:Header> <wbs:Session> <wbs:SessionId>00QHJHGTOA</wbs:SessionId> <wbs:SequenceNumber>3</wbs:SequenceNumber> <wbs:SecurityToken>1PDOG0BL92Y6A3B0KXTMD0PC3C</wbs:SecurityToken> </wbs:Session> </soapenv:Header> <soapenv:Body> <hbk:Hotel\_Sell> <systemIdentifier> <deliveringSystem> <companyId>WBS</companyId> </deliveringSystem> </systemIdentifier> <bookingCompany> <companyQualifier> <attributeDetails> <attributeType>CORP</attributeType> </attributeDetails> </companyQualifier> <companyName> <companyName>123VOLKS</companyName> </companyName> </bookingCompany> <travelAgentRef> <status>APE</status> <reference> <type>OT</type> <value>2</value> </reference> </travelAgentRef> <roomStayData> <markerRoomStayData></markerRoomStayData> <globalBookingInfo> <markerGlobalBookingInfo></markerGlobalBookingInfo> <bookingSource> <originIdentification> <originatorId>57591472</originatorId> </originIdentification> </bookingSource> <textOptions> <remarkDetails> <type>HSI</type> <freetext>CHARGE BACK AUTH TO CTM - %%%% PARKING/ MEALS BFAST MAX $ 32.10. DINNER MAX $29</freetext> <language>EN</language> <source>M</source> <encoding>7</encoding> </remarkDetails> </textOptions> <representativeParties> <occupantList> <passengerReference> <type>BHO</type> <value>2</value> </passengerReference> </occupantList> </representativeParties> <keyValueTree> <attributeDetails> <attributeType>PYR</attributeType> <attributeDescription>Y</attributeDescription> </attributeDetails> </keyValueTree> </globalBookingInfo> <roomList> <markerRoomstayQuery></markerRoomstayQuery> <roomRateDetails> <marker></marker> <hotelProductReference> <referenceDetails> <type>BC</type> <value>000000K</value> </referenceDetails> </hotelProductReference> <markerOfExtra></markerOfExtra> </roomRateDetails> <guaranteeOrDeposit> <paymentInfo> <paymentDetails> <formOfPaymentCode>1</formOfPaymentCode> <paymentType>2</paymentType> <serviceToPay>3</serviceToPay> </paymentDetails> </paymentInfo> <groupBillbackData> <providerInformation> <travelSector>HTL</travelSector> <companyCode>1A</companyCode> </providerInformation> <paymentInstructions> <freeTextDetails> <textSubjectQualifier>PAY</textSubjectQualifier> <source>Z</source> <encoding>7</encoding> </freeTextDetails> <freeText>ROOM WITH BREAKFAST</freeText> </paymentInstructions> <consumerAccount></consumerAccount> </groupBillbackData> </guaranteeOrDeposit> <guestList> <occupantList> <passengerReference> <type>RMO</type> <value>2</value> </passengerReference> </occupantList> </guestList> </roomList> </roomStayData> </hbk:Hotel\_Sell> </soapenv:Body> </soapenv:Envelope>

## 5.1.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"> <soapenv:Header> <awss:Session> <awss:SessionId>00QHJHGTOA</awss:SessionId> <awss:SequenceNumber>5</awss:SequenceNumber> <awss:SecurityToken>1PDOG0BL92Y6A3B0KXTMD0PC3C</awss:SecurityToken> </awss:Session> </soapenv:Header> <soapenv:Body> <Hotel\_SellReply xmlns="http://xml.amadeus.com/HBKRCR\_20\_1\_1A"> <bookingTypeIndicator> <numberOfRooms> <quantity>1</quantity> <statusCode>HK</statusCode> </numberOfRooms> </bookingTypeIndicator> <roomStayData> <markerRoomStayData></markerRoomStayData> <pnrInfo> <tattooReference> <referenceDetails> <type>S</type> <value>1</value> </referenceDetails> </tattooReference> </pnrInfo> <globalBookingInfo> <hotelPropertyInfo> <hotelReference> <chainCode>OI</chainCode> <cityCode>MAD</cityCode> <hotelCode>DST</hotelCode> </hotelReference> <hotelName>HOTEL NEW OI PROP 4</hotelName> </hotelPropertyInfo> <forceSellIndicator> <statusDetails> <indicator>FS</indicator> <action>2</action> </statusDetails> </forceSellIndicator> <individualCompanyId> <companyName>AMADEUS LINKHOTEL</companyName> </individualCompanyId> <bookingInfo> <reservation> <companyId>OI</companyId> <controlNumber>90330924</controlNumber> <controlType>2</controlType> </reservation> </bookingInfo> <bookingSource> <originIdentification> <originatorId>57591472</originatorId> </originIdentification> </bookingSource> <globalPriceInformation> <globalPrice> <tariffInfo> <amount>2887.41</amount> <currency>EUR</currency> <dailyTotalIndicator>3</dailyTotalIndicator> <totalAmount>3022.00</totalAmount> </tariffInfo> <chargeDetails> <type>AB</type> <amount>2865.41</amount> <description>amount</description> <currency>EUR</currency> </chargeDetails> <chargeDetails> <type>MU</type> <amount>22.00</amount> <description>amount</description> <currency>EUR</currency> </chargeDetails> <chargeDetails> <type>AB</type> <amount>3000.00</amount> <description>totalAmount</description> <currency>EUR</currency> </chargeDetails> <chargeDetails> <type>MU</type> <amount>22.00</amount> <description>totalAmount</description> <currency>EUR</currency> </chargeDetails> </globalPrice> </globalPriceInformation> <representativeParties> <occupantList> <passengerReference> <type>BHO</type> <value>2</value> </passengerReference> </occupantList> <occupantPreferences> <occupantPreferences> <occupantLanguage>EN</occupantLanguage> </occupantPreferences> </occupantPreferences> </representativeParties> </globalBookingInfo> <roomListInfo> <roomStayIndex> <sequenceDetails> <number>1</number> </sequenceDetails> </roomStayIndex> <markLinesAndRateDesc> <freeTextQualification> <textSubjectQualifier>2</textSubjectQualifier> <informationTypeId>DES</informationTypeId> </freeTextQualification> <freeText>Best Rate Plan</freeText> </markLinesAndRateDesc> <commissionAndMarkup> <commissionInfo> <commissionDetails> <type>UNK</type> <amount>0.00</amount> <currency>AED</currency> </commissionDetails> </commissionInfo> </commissionAndMarkup> <requestableInformation> <requestedDates> <businessSemantic>CHK</businessSemantic> <timeMode>CHK</timeMode> <beginDateTime> <year>2024</year> <month>8</month> <day>31</day> </beginDateTime> <endDateTime> <year>2024</year> <month>9</month> <day>2</day> </endDateTime> </requestedDates> <roomRateDetails> <roomInformation> <roomRateIdentifier> <roomType>A1D</roomType> <ratePlanCode>VHX</ratePlanCode> </roomRateIdentifier> <bookingCode>000000K</bookingCode> <guestCountDetails> <numberOfUnit>1</numberOfUnit> <unitQualifier>A</unitQualifier> </guestCountDetails> </roomInformation> <specialInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>BC</informationType> <source>M</source> <encoding>1</encoding> </freeTextDetails> <freeText>000000K</freeText> </specialInfo> <specialInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>RC</informationType> <source>M</source> <encoding>1</encoding> </freeTextDetails> <freeText>VHX</freeText> </specialInfo> <specialInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>RO</informationType> <source>M</source> <encoding>1</encoding> </freeTextDetails> <freeText>A1D</freeText> </specialInfo> <bookingRequirement> <guaranteeDepositStatusInfo> <statusDetails> <indicator>DP</indicator> <action>UN</action> </statusDetails> </guaranteeDepositStatusInfo> <guaranteeDepositRule> <tariffInfo> <amount>1.00</amount> <currency>EUR</currency> <deadlineDate>20240830</deadlineDate> <deadlineTime>000000</deadlineTime> </tariffInfo> </guaranteeDepositRule> <holdTime> <ruleDetails> <type>15</type> <quantity>13</quantity> <quantityUnit>2</quantityUnit> </ruleDetails> </holdTime> <paymentInformation> <paymentDetails> <formOfPaymentCode>1</formOfPaymentCode> <paymentType>2</paymentType> <serviceToPay>3</serviceToPay> </paymentDetails> </paymentInformation> <paymentInformation> <paymentDetails> <formOfPaymentCode>4</formOfPaymentCode> <paymentType>2</paymentType> <serviceToPay>3</serviceToPay> </paymentDetails> </paymentInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>AU</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>AX</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>CA</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>CB</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>CG</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>CX</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>DC</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>DS</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>GK</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>JC</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>TC</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>TP</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>VI</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>XS</vendorCode> </formOfPayment> </creditCardInformation> <markerOfBookingRequirement></markerOfBookingRequirement> </bookingRequirement> <markerOfExtra></markerOfExtra> <tariffInformation> <tariffInfo> <amount>3022.00</amount> <currency>EUR</currency> <dailyTotalIndicator>3</dailyTotalIndicator> <status>1</status> </tariffInfo> <associatedCharges> <chargeCode>AB</chargeCode> <chargeAmount>3000.00</chargeAmount> <description>amount</description> <chargeCurrency>EUR</chargeCurrency> </associatedCharges> <associatedCharges> <chargeCode>MU</chargeCode> <chargeAmount>22.00</chargeAmount> <description>amount</description> <chargeCurrency>EUR</chargeCurrency> </associatedCharges> </tariffInformation> </roomRateDetails> <guaranteeOrDeposit> <paymentInfo> <paymentDetails> <formOfPaymentCode>1</formOfPaymentCode> <paymentType>2</paymentType> <serviceToPay>3</serviceToPay> </paymentDetails> </paymentInfo> <groupCreditCardInfo> <creditCardInfo> <ccInfo> <vendorCode>CA</vendorCode> <cardNumber>5253228988417671</cardNumber> <expiryDate>0827</expiryDate> <ccHolderName>AMADEUS</ccHolderName> </ccInfo> </creditCardInfo> <concealedCreditCardInfo> <ccInfo> <cardNumber>525322XXXXXX7671</cardNumber> </ccInfo> </concealedCreditCardInfo> <fortknoxIds> <referenceDetails> <type>NOX</type> <value>103805200208020</value> </referenceDetails> </fortknoxIds> <creditCardIndicator> <statusDetails> <indicator>1</indicator> </statusDetails> </creditCardIndicator> </groupCreditCardInfo> <groupBillbackData> <providerInformation> <travelSector>HTL</travelSector> <companyCode>VOXEL</companyCode> </providerInformation> <deploymentId> <referenceType>PRI</referenceType> <uniqueReference>2222KNKJ</uniqueReference> </deploymentId> <paymentInstructions> <freeTextDetails> <textSubjectQualifier>PAY</textSubjectQualifier> <source>M</source> <encoding>1</encoding> </freeTextDetails> <freeText>ROOM WITH BREAKFAST</freeText> </paymentInstructions> <consumerAccount></consumerAccount> </groupBillbackData> </guaranteeOrDeposit> <supplementaryInfo> <remarkDetails> <type>HSI</type> <freetext>CHARGE BACK AUTH TO CTM - %%%% PARKING- MEALS BFAST MAX $ 32.10. DINNER MAX $29</freetext> <businessFunction>3</businessFunction> <language>ENG</language> <source>M</source> <encoding>1</encoding> </remarkDetails> </supplementaryInfo> <guestList> <occupantList> <passengerReference> <type>RMO</type> <value>2</value> </passengerReference> </occupantList> </guestList> </requestableInformation> <taxes> <taxFeeInformation> <includedInAmount>I</includedInAmount> <perPerson>ROO</perPerson> <timeUnit>DY</timeUnit> <category>TAX</category> <code>COU</code> <percentage>4</percentage> </taxFeeInformation> <taxFeeValidity> <businessSemantic>LT</businessSemantic> <beginDateTime> <year>2024</year> <month>8</month> <day>31</day> </beginDateTime> <endDateTime> <year>2024</year> <month>9</month> <day>2</day> </endDateTime> </taxFeeValidity> </taxes> <taxes> <taxFeeInformation> <includedInAmount>I</includedInAmount> <perPerson>ROO</perPerson> <timeUnit>DY</timeUnit> <category>TAX</category> <code>STA</code> <amount>5.00</amount> <currencyCode>EUR</currencyCode> </taxFeeInformation> <taxFeeValidity> <businessSemantic>LT</businessSemantic> <beginDateTime> <year>2024</year> <month>8</month> <day>31</day> </beginDateTime> <endDateTime> <year>2024</year> <month>9</month> <day>2</day> </endDateTime> </taxFeeValidity> </taxes> <taxes> <taxFeeInformation> <includedInAmount>I</includedInAmount> <perPerson>ROO</perPerson> <timeUnit>DY</timeUnit> <category>TAX</category> <code>MIS</code> <percentage>8</percentage> </taxFeeInformation> <taxFeeValidity> <businessSemantic>LT</businessSemantic> <beginDateTime> <year>2024</year> <month>8</month> <day>31</day> </beginDateTime> <endDateTime> <year>2024</year> <month>9</month> <day>2</day> </endDateTime> </taxFeeValidity> </taxes> <rateChanges> <rateChangeAmountInformation> <tariffInfo> <amount>1511.00</amount> <currency>EUR</currency> <dailyTotalIndicator>DY</dailyTotalIndicator> <status>1</status> </tariffInfo> <associatedCharges> <chargeCode>AB</chargeCode> <chargeAmount>1500.00</chargeAmount> <description>amount</description> <chargeCurrency>EUR</chargeCurrency> </associatedCharges> <associatedCharges> <chargeCode>MU</chargeCode> <chargeAmount>11.00</chargeAmount> <description>amount</description> <chargeCurrency>EUR</chargeCurrency> </associatedCharges> </rateChangeAmountInformation> <rateChangePeriodInformation> <businessSemantic>HRC</businessSemantic> <beginDateTime> <year>2024</year> <month>8</month> <day>31</day> </beginDateTime> <endDateTime> <year>2024</year> <month>9</month> <day>2</day> </endDateTime> </rateChangePeriodInformation> </rateChanges> </roomListInfo> </roomStayData> </Hotel\_SellReply> </soapenv:Body> </soapenv:Envelope>

## 5.1.3 Possible Errors

See "Error Messages" section.

* * *

## 5.2 Operation: Booking with 3DS Authentication

Travel agents can create booking with three domain secure (3DS) authentication fields. The 3DS authentication fields must be entered in the group 'groupTdsInformation'. Details of the each field is given in 'Build a Query' section. 

Note: The values of CAVV/XID/DS\_TRANSACTIONID need to be send as base 64 encoded value in Hotel\_Sell.

## 5.2.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Hotel\_Sell xmlns="http://xml.amadeus.com/HBKRCQ\_24\_2\_1A"> <roomStayData> <markerRoomStayData></markerRoomStayData> <globalBookingInfo> <markerGlobalBookingInfo></markerGlobalBookingInfo> <bookingSource> <originIdentification> <originatorId>12345675</originatorId> </originIdentification> </bookingSource> <representativeParties> <occupantList> <passengerReference> <type>BHO</type> <value>2</value> </passengerReference> </occupantList> </representativeParties> </globalBookingInfo> <roomList> <markerRoomstayQuery></markerRoomstayQuery> <roomRateDetails> <marker></marker> <hotelProductReference> <referenceDetails> <type>BC</type> <value>A1S0001</value> </referenceDetails> </hotelProductReference> <markerOfExtra></markerOfExtra> </roomRateDetails> <guaranteeOrDeposit> <paymentInfo> <paymentDetails> <formOfPaymentCode>1</formOfPaymentCode> <paymentType>2</paymentType> <serviceToPay>3</serviceToPay> </paymentDetails> </paymentInfo> <groupCreditCardInfo> <creditCardInfo> <ccInfo> <vendorCode>VI</vendorCode> <cardNumber>4444333322221111</cardNumber> <expiryDate>1225</expiryDate> <surname>NAYAK</surname> <firstName>PALLAVI</firstName> </ccInfo> </creditCardInfo> </groupCreditCardInfo> <groupTdsInformation> <authenticationData> <authenticationDataDetails> <veres>Y</veres> <pares>Y</pares> <authenticationIndicator>05</authenticationIndicator> </authenticationDataDetails> <tdsVersion>1.1.0</tdsVersion> </authenticationData> <tdsBlobData> <tdsBlbIdentifier> <referenceDetails> <value>CAVV</value> </referenceDetails> </tdsBlbIdentifier> <tdsBlbData> <dataLength>32</dataLength> <dataType>B</dataType> <binaryData>VkhwYWRWb3lkekJYUkZaVVkxWk9kbUl4Wkc4VFRZVT0=</binaryData> </tdsBlbData> </tdsBlobData> <tdsBlobData> <tdsBlbIdentifier> <referenceDetails> <value>XID</value> </referenceDetails> </tdsBlbIdentifier> <tdsBlbData> <dataLength>32</dataLength> <dataType>B</dataType> <binaryData>VkhwYWRWb3lkekJYUkZaVVkxWk9kbUl4Wkc4VFRZVT0=</binaryData> </tdsBlbData> </tdsBlobData> </groupTdsInformation> </guaranteeOrDeposit> <guestList> <occupantList> <passengerReference> <type>RMO</type> <value>2</value> </passengerReference> </occupantList> </guestList> </roomList> </roomStayData> </Hotel\_Sell>

## 5.2.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Hotel\_SellReply xmlns="http://xml.amadeus.com/HBKRCR\_24\_2\_1A"> <bookingTypeIndicator> <numberOfRooms> <quantity>1</quantity> <statusCode>HK</statusCode> </numberOfRooms> </bookingTypeIndicator> <roomStayData> <markerRoomStayData></markerRoomStayData> <pnrInfo> <tattooReference> <referenceDetails> <type>S</type> <value>1</value> </referenceDetails> </tattooReference> </pnrInfo> <globalBookingInfo> <hotelPropertyInfo> <hotelReference> <chainCode>RY</chainCode> <cityCode>ZSY</cityCode> <hotelCode>083</hotelCode> </hotelReference> <hotelName>RODEWAY INN NEAR AZ STATE UNIVERSITY</hotelName> </hotelPropertyInfo> <forceSellIndicator> <statusDetails> <indicator>FS</indicator> <action>2</action> </statusDetails> </forceSellIndicator> <individualCompanyId> <companyName>COUNTRY INN SUITES</companyName> </individualCompanyId> <bookingInfo> <reservation> <companyId>RY</companyId> <controlNumber>83059128</controlNumber> <controlType>2</controlType> </reservation> </bookingInfo> <bookingSource> <originIdentification> <originatorId>57591472</originatorId> </originIdentification> </bookingSource> <globalPriceInformation> <globalPrice> <tariffInfo> <amount>89.10</amount> <currency>USD</currency> <dailyTotalIndicator>3</dailyTotalIndicator> <totalAmount>108.81</totalAmount> </tariffInfo> </globalPrice> </globalPriceInformation> <representativeParties> <occupantList> <passengerReference> <type>BHO</type> <value>2</value> </passengerReference> </occupantList> <occupantPreferences> <occupantPreferences> <occupantLanguage>FR</occupantLanguage> </occupantPreferences> </occupantPreferences> </representativeParties> </globalBookingInfo> <roomListInfo> <roomStayIndex> <sequenceDetails> <number>1</number> </sequenceDetails> </roomStayIndex> <commissionAndMarkup> <commissionInfo> <commissionDetails> <type>UNK</type> <rate>10</rate> </commissionDetails> </commissionInfo> </commissionAndMarkup> <cancellationPolicies> <cancellationDateTime> <businessSemantic>CAN</businessSemantic> <timeMode>LT</timeMode> </cancellationDateTime> </cancellationPolicies> <cancellationPolicies> <cancellationDateTime> <businessSemantic>CAN</businessSemantic> <timeMode>LT</timeMode> <dateTime> <year>2019</year> <month>12</month> <day>23</day> <hour>16</hour> <minutes>0</minutes> </dateTime> </cancellationDateTime> <cancellationNights> <quantityDetails> <qualifier>CAN</qualifier> <value>1</value> <unit>N</unit> </quantityDetails> </cancellationNights> </cancellationPolicies> <requestableInformation> <requestedDates> <businessSemantic>CHK</businessSemantic> <timeMode>CHK</timeMode> <beginDateTime> <year>2019</year> <month>12</month> <day>25</day> </beginDateTime> <endDateTime> <year>2019</year> <month>12</month> <day>26</day> </endDateTime> </requestedDates> <roomRateDetails> <roomInformation> <roomRateIdentifier> <roomType>A1D</roomType> <ratePlanCode>GOV</ratePlanCode> <rateCategoryCode>GOV</rateCategoryCode> <rateQualifiedIndic>C</rateQualifiedIndic> <rateQualifiedIndic>A</rateQualifiedIndic> </roomRateIdentifier> <bookingCode>UM89ZI7</bookingCode> <guestCountDetails> <numberOfUnit>1</numberOfUnit> <unitQualifier>A</unitQualifier> </guestCountDetails> </roomInformation> <specialInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>BC</informationType> <source>M</source> <encoding>1</encoding> </freeTextDetails> <freeText>UM89ZI7</freeText> </specialInfo> <specialInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>RC</informationType> <source>M</source> <encoding>1</encoding> </freeTextDetails> <freeText>GOV</freeText> </specialInfo> <specialInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>RO</informationType> <source>M</source> <encoding>1</encoding> </freeTextDetails> <freeText>A1D</freeText> </specialInfo> <bookingRequirement> <guaranteeDepositStatusInfo> <statusDetails> <indicator>PP</indicator> <action>1</action> </statusDetails> </guaranteeDepositStatusInfo> <paymentInformation> <paymentDetails> <formOfPaymentCode>1</formOfPaymentCode> <paymentType>4</paymentType> <serviceToPay>3</serviceToPay> </paymentDetails> </paymentInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>VI</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>BA</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>CB</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>AM</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>DS</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>IK</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>MC</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>EC</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>CA</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>BC</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>JC</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>AX</vendorCode> </formOfPayment> </creditCardInformation> <markerOfBookingRequirement></markerOfBookingRequirement> </bookingRequirement> <markerOfExtra></markerOfExtra> <tariffInformation> <tariffInfo> <amount>108.81</amount> <currency>USD</currency> <dailyTotalIndicator>3</dailyTotalIndicator> <status>1</status> </tariffInfo> </tariffInformation> </roomRateDetails> <guaranteeOrDeposit> <paymentInfo> <paymentDetails> <formOfPaymentCode>1</formOfPaymentCode> <paymentType>4</paymentType> <serviceToPay>3</serviceToPay> </paymentDetails> </paymentInfo> <groupCreditCardInfo> <creditCardInfo> <ccInfo> <vendorCode>VI</vendorCode> <cardNumber>4988438843884305</cardNumber> <expiryDate>1020</expiryDate> </ccInfo> </creditCardInfo> <concealedCreditCardInfo> <ccInfo> <cardNumber>498843XXXXXX4305</cardNumber> </ccInfo> </concealedCreditCardInfo> <fortknoxIds> <referenceDetails> <type>NOX</type> <value>104506825609364</value> </referenceDetails> </fortknoxIds> </groupCreditCardInfo> </guaranteeOrDeposit> <guestList> <occupantList> <passengerReference> <type>ROP</type> <value>2</value> </passengerReference> </occupantList> </guestList> </requestableInformation> <rateChanges> <rateChangeAmountInformation> <tariffInfo> <amount>89.10</amount> <currency>USD</currency> <dailyTotalIndicator>DY</dailyTotalIndicator> </tariffInfo> </rateChangeAmountInformation> <rateChangePeriodInformation> <businessSemantic>HRC</businessSemantic> <beginDateTime> <year>2019</year> <month>12</month> <day>25</day> </beginDateTime> <endDateTime> <year>2019</year> <month>12</month> <day>26</day> </endDateTime> </rateChangePeriodInformation> </rateChanges> </roomListInfo> </roomStayData> </Hotel\_SellReply>

## 5.2.3 Possible Errors

See "Error Messages" section.

* * *

## 5.3 Operation: Credit Line as Form of Payment

Credit Line is supported as an accepted form of payment. Below is an example of the request and the response message with credit line as form of payment

## 5.3.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<soapenv:Envelope> <soapenv:Body> <hbk:Hotel\_Sell> <travelAgentRef> <status>APE</status> <reference> <type>OT</type> <value>2</value> </reference> </travelAgentRef> <roomStayData> <markerRoomStayData></markerRoomStayData> <globalBookingInfo> <markerGlobalBookingInfo></markerGlobalBookingInfo> <bookingSource> <originIdentification> <originatorId>57591472</originatorId> </originIdentification> </bookingSource> <representativeParties> <occupantList> <passengerReference> <type>BHO</type> <value>2</value> </passengerReference> </occupantList> </representativeParties> </globalBookingInfo> <roomList> <markerRoomstayQuery></markerRoomstayQuery> <roomRateDetails> <marker></marker> <hotelProductReference> <referenceDetails> <type>BC</type> <value>KXNR7EFU9X</value> </referenceDetails> </hotelProductReference> <markerOfExtra></markerOfExtra> </roomRateDetails> <guaranteeOrDeposit> <paymentInfo> <paymentDetails> <formOfPaymentCode>9</formOfPaymentCode> <paymentType>2</paymentType> <serviceToPay>3</serviceToPay> </paymentDetails> </paymentInfo> </guaranteeOrDeposit> <guestList> <occupantList> <passengerReference> <type>RMO</type> <value>2</value> </passengerReference> </occupantList> </guestList> </roomList> </roomStayData> </hbk:Hotel\_Sell> </soapenv:Body> </soapenv:Envelope>

## 5.3.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<soapenv:Envelope> <soapenv:Body> <Hotel\_SellReply xmlns="http://xml.amadeus.com/HBKRCR\_24\_2\_1A"> <bookingTypeIndicator> <numberOfRooms> <quantity>1</quantity> <statusCode>HK</statusCode> </numberOfRooms> </bookingTypeIndicator> <roomStayData> <markerRoomStayData></markerRoomStayData> <pnrInfo> <tattooReference> <referenceDetails> <type>S</type> <value>1</value> </referenceDetails> </tattooReference> <reservationControlInfoPNR> <reservation> <companyId>1A</companyId> <controlNumber>MUA52G</controlNumber> <controlType>P</controlType> </reservation> </reservationControlInfoPNR> </pnrInfo> <globalBookingInfo> <hotelPropertyInfo> <hotelReference> <chainCode>AB</chainCode> <cityCode>PAR</cityCode> <hotelCode>ABC</hotelCode> </hotelReference> <hotelName>Sample Hotel</hotelName> </hotelPropertyInfo> <forceSellIndicator> <statusDetails> <indicator>FS</indicator> <action>2</action> </statusDetails> </forceSellIndicator> <individualCompanyId> <companyName>CompanyName</companyName> </individualCompanyId> <bookingInfo> <reservation> <companyId>AB</companyId> <controlNumber>7601323182593</controlNumber> <controlType>2</controlType> </reservation> </bookingInfo> <bookingSource> <originIdentification> <originatorId>57211232</originatorId> </originIdentification> </bookingSource> <globalPriceInformation> <globalPrice> <tariffInfo> <currency>EUR</currency> <dailyTotalIndicator>3</dailyTotalIndicator> <totalAmount>808.88</totalAmount> </tariffInfo> </globalPrice> </globalPriceInformation> <representativeParties> <occupantList> <passengerReference> <type>BHO</type> <value>2</value> </passengerReference> </occupantList> <occupantPreferences> <occupantPreferences> <occupantLanguage>FR</occupantLanguage> </occupantPreferences> </occupantPreferences> </representativeParties> </globalBookingInfo> <roomListInfo> <roomStayIndex> <sequenceDetails> <number>1</number> </sequenceDetails> </roomStayIndex> <checkInOutRules> <checkInOutTimeAndExpressInfo> <expressCheckIn>UN</expressCheckIn> <expressCheckOut>UN</expressCheckOut> <timeMode>LT</timeMode> </checkInOutTimeAndExpressInfo> </checkInOutRules> <commissionAndMarkup> <commissionInfo> <commissionDetails> <type>UNK</type> <amount>62.71</amount> <currency>EUR</currency> </commissionDetails> </commissionInfo> </commissionAndMarkup> <cancellationPolicies> <cancellationDateTime> <businessSemantic>CAN</businessSemantic> <timeMode>LT</timeMode> <dateTime> <year>2022</year> <month>12</month> <day>1</day> <hour>16</hour> <minutes>0</minutes> </dateTime> </cancellationDateTime> <fee> <monetaryDetails> <amount>808.88</amount> <currency>EUR</currency> </monetaryDetails> </fee> </cancellationPolicies> <requestableInformation> <requestedDates> <businessSemantic>CHK</businessSemantic> <timeMode>CHK</timeMode> <beginDateTime> <year>2022</year> <month>12</month> <day>8</day> </beginDateTime> <endDateTime> <year>2022</year> <month>12</month> <day>9</day> </endDateTime> </requestedDates> <roomRateDetails> <roomInformation> <roomRateIdentifier> <roomType>ROH</roomType> <ratePlanCode>LEI</ratePlanCode> </roomRateIdentifier> <bookingCode>\*\*\*\*\*\*</bookingCode> <guestCountDetails> <numberOfUnit>1</numberOfUnit> <unitQualifier>A</unitQualifier> </guestCountDetails> </roomInformation> <specialInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>BC</informationType> <source>M</source> <encoding>1</encoding> </freeTextDetails> <freeText>TUZHUCVGIN</freeText> </specialInfo> <specialInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>RC</informationType> <source>M</source> <encoding>1</encoding> </freeTextDetails> <freeText>LEI</freeText> </specialInfo> <specialInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>RO</informationType> <source>M</source> <encoding>1</encoding> </freeTextDetails> <freeText>ROH</freeText> </specialInfo> <specialInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>HO</informationType> <source>M</source> <encoding>1</encoding> </freeTextDetails> <freeText>TUZHUCVGIN</freeText> </specialInfo> <bookingRequirement> <guaranteeDepositStatusInfo> <statusDetails> <indicator>DP</indicator> <action>1</action> </statusDetails> </guaranteeDepositStatusInfo> <markerOfBookingRequirement></markerOfBookingRequirement> </bookingRequirement> <chargeAndExtras> <taxFeeInformation> <includedInAmount>U</includedInAmount> <perPerson>U</perPerson> <category>XTR</category> </taxFeeInformation> <taxDescriptions> <freeTextQualification> <textSubjectQualifier>2</textSubjectQualifier> <informationTypeId>EXT</informationTypeId> </freeTextQualification> <freeText>Taxes et frais payables a l'hotel: Taxe oblig</freeText> </taxDescriptions> </chargeAndExtras> <markerOfExtra></markerOfExtra> <tariffInformation> <tariffInfo> <amount>808.88</amount> <currency>EUR</currency> <dailyTotalIndicator>3</dailyTotalIndicator> <status>1</status> </tariffInfo> </tariffInformation> </roomRateDetails> <guaranteeOrDeposit> <paymentInfo> <paymentDetails> <formOfPaymentCode>9</formOfPaymentCode> <paymentType>2</paymentType> <serviceToPay>3</serviceToPay> </paymentDetails> </paymentInfo> </guaranteeOrDeposit> <guestList> <occupantList> <passengerReference> <type>RMO</type> <value>2</value> </passengerReference> </occupantList> </guestList> </requestableInformation> <taxes> <taxFeeInformation> <includedInAmount>I</includedInAmount> <perPerson>U</perPerson> <category>FEE</category> <code>SCH</code> <amount>76.15</amount> <currencyCode>EUR</currencyCode> </taxFeeInformation> <taxDescriptions> <freeTextQualification> <textSubjectQualifier>2</textSubjectQualifier> <informationTypeId>TAX</informationTypeId> </freeTextQualification> <freeText>Tax Recovery Charges and Service Fees</freeText> </taxDescriptions> </taxes> <rateChanges> <rateChangeAmountInformation> <tariffInfo> <amount>808.88</amount> <currency>EUR</currency> <dailyTotalIndicator>DY</dailyTotalIndicator> <status>1</status> </tariffInfo> </rateChangeAmountInformation> <rateChangePeriodInformation> <businessSemantic>HRC</businessSemantic> <beginDateTime> <year>2022</year> <month>12</month> <day>8</day> </beginDateTime> <endDateTime> <year>2022</year> <month>12</month> <day>9</day> </endDateTime> </rateChangePeriodInformation> </rateChanges> </roomListInfo> </roomStayData> </Hotel\_SellReply> </soapenv:Body> </soapenv:Envelope>

## 5.3.3 Possible Errors

See "Error Messages" section.

* * *

## 5.4 Operation: MultiRoom - Child Scenario

Room 1 : 1A + 2 Child \[8 yrs , 9 yrs\]  
Room 2 : 1A + 2 Child \[5 yrs , 6 yrs\]

## 5.4.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Hotel\_Sell xmlns="http://xml.amadeus.com/HBKRCQ\_24\_2\_1A"> <roomStayData> <markerRoomStayData></markerRoomStayData> <globalBookingInfo> <markerGlobalBookingInfo></markerGlobalBookingInfo> <bookingSource> <originIdentification> <originatorId>12345675</originatorId> </originIdentification> </bookingSource> <representativeParties> <occupantList> <passengerReference> <type>BHO</type> <value>1</value> </passengerReference> </occupantList> </representativeParties> </globalBookingInfo> <roomList> <markerRoomstayQuery></markerRoomstayQuery> <roomRateDetails> <marker></marker> <hotelProductReference> <referenceDetails> <type>BC</type> <value>C1DRA3</value> </referenceDetails> </hotelProductReference> <markerOfExtra></markerOfExtra> </roomRateDetails> <guaranteeOrDeposit> <paymentInfo> <paymentDetails> <formOfPaymentCode>1</formOfPaymentCode> <paymentType>2</paymentType> <serviceToPay>3</serviceToPay> </paymentDetails> </paymentInfo> <groupCreditCardInfo> <creditCardInfo> <ccInfo> <vendorCode>VI</vendorCode> <cardNumber>4444333322221111</cardNumber> <expiryDate>1225</expiryDate> <surname>last</surname> <firstName>onee</firstName> </ccInfo> </creditCardInfo> </groupCreditCardInfo> <groupTdsInformation> <authenticationdata> <authenticationdatadetails> <authenticationindicator>02</authenticationindicator> <transstatus>Y</transstatus> </authenticationdatadetails> <tdsversion>2.1.0</tdsversion> </authenticationdata> <tdsblobdata> <tdsblbidentifier> <referencedetails> <value>CAVV</value> </referencedetails> </tdsblbidentifier> <tdsblbdata> <datalength>20</datalength> <datatype>B</datatype> <binarydata>TzZuZ2w0WDVTcVNvb1do</binarydata> </tdsblbdata> </tdsblobdata> <tdsblobdata> <tdsblbidentifier> <referencedetails> <value>DS\_TRANSACTIONID</value> </referencedetails> </tdsblbidentifier> <tdsblbdata> <datalength>20</datalength> <datatype>B</datatype> <binarydata>TzwuZ2w0WDVTcVNvb1do</binarydata> </tdsblbdata> </tdsblobdata> </groupTdsInformation> </guaranteeOrDeposit> <guestList> <occupantList> <passengerReference> <type>RMO</type> <value>1</value> </passengerReference> </occupantList> </guestList> <guestList> <occupantList></occupantList> <age> <quantityDetails> <qualifier>AGE</qualifier> <value>8</value> </quantityDetails> </age> </guestList> <guestList> <occupantList></occupantList> <age> <quantityDetails> <qualifier>AGE</qualifier> <value>9</value> </quantityDetails> </age> </guestList> </roomList> </roomStayData> <roomStayData> <markerRoomStayData></markerRoomStayData> <globalBookingInfo> <markerGlobalBookingInfo></markerGlobalBookingInfo> <bookingSource> <originIdentification> <originatorId>12345675</originatorId> </originIdentification> </bookingSource> <representativeParties> <occupantList> <passengerReference> <type>BHO</type> <value>2</value> </passengerReference> </occupantList> </representativeParties> </globalBookingInfo> <roomList> <markerRoomstayQuery></markerRoomstayQuery> <roomRateDetails> <marker></marker> <hotelProductReference> <referenceDetails> <type>BC</type> <value>C1DRA3</value> </referenceDetails> </hotelProductReference> <markerOfExtra></markerOfExtra> </roomRateDetails> <guaranteeOrDeposit> <paymentInfo> <paymentDetails> <formOfPaymentCode>1</formOfPaymentCode> <paymentType>2</paymentType> <serviceToPay>3</serviceToPay> </paymentDetails> </paymentInfo> <groupCreditCardInfo> <creditCardInfo> <ccInfo> <vendorCode>VI</vendorCode> <cardNumber>4444333322221111</cardNumber> <expiryDate>1225</expiryDate> <surname>last</surname> <firstName>onee</firstName> </ccInfo> </creditCardInfo> </groupCreditCardInfo> <groupTdsInformation> <authenticationdata> <authenticationdatadetails> <authenticationindicator>02</authenticationindicator> <transstatus>Y</transstatus> </authenticationdatadetails> <tdsversion>2.1.0</tdsversion> </authenticationdata> <tdsblobdata> <tdsblbidentifier> <referencedetails> <value>CAVV</value> </referencedetails> </tdsblbidentifier> <tdsblbdata> <datalength>20</datalength> <datatype>B</datatype> <binarydata>TzZuZ2w0WDVTcVNvb1do</binarydata> </tdsblbdata> </tdsblobdata> <tdsblobdata> <tdsblbidentifier> <referencedetails> <value>DS\_TRANSACTIONID</value> </referencedetails> </tdsblbidentifier> <tdsblbdata> <datalength>20</datalength> <datatype>B</datatype> <binarydata>TzwuZ2w0WDVTcVNvb1do</binarydata> </tdsblbdata> </tdsblobdata> </groupTdsInformation> </guaranteeOrDeposit> <guestList> <occupantList> <passengerReference> <type>RMO</type> <value>2</value> </passengerReference> </occupantList> </guestList> <guestList> <occupantList></occupantList> <age> <quantityDetails> <qualifier>AGE</qualifier> <value>5</value> </quantityDetails> </age> </guestList> <guestList> <occupantList></occupantList> <age> <quantityDetails> <qualifier>AGE</qualifier> <value>6</value> </quantityDetails> </age> </guestList> </roomList> </roomStayData> </Hotel\_Sell>

## 5.4.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Hotel\_SellReply xmlns="http://xml.amadeus.com/HBKRCR\_24\_2\_1A"> <bookingTypeIndicator> <numberOfRooms> <quantity>2</quantity> <statusCode>HK</statusCode> </numberOfRooms> </bookingTypeIndicator> <roomStayData> <markerRoomStayData></markerRoomStayData> <pnrInfo> <tattooReference> <referenceDetails> <type>S</type> <value>1</value> </referenceDetails> </tattooReference> </pnrInfo> <globalBookingInfo> <hotelPropertyInfo> <hotelReference> <chainCode>RY</chainCode> <cityCode>ZSY</cityCode> <hotelCode>083</hotelCode> </hotelReference> <hotelName>RODEWAY INN NEAR AZ STATE UNIVERSITY</hotelName> </hotelPropertyInfo> <forceSellIndicator> <statusDetails> <indicator>FS</indicator> <action>2</action> </statusDetails> </forceSellIndicator> <individualCompanyId> <companyName>COUNTRY INN SUITES</companyName> </individualCompanyId> <bookingInfo> <reservation> <companyId>RY</companyId> <controlNumber>83059126</controlNumber> <controlType>2</controlType> </reservation> </bookingInfo> <bookingSource> <originIdentification> <originatorId>57591472</originatorId> </originIdentification> </bookingSource> <globalPriceInformation> <globalPrice> <tariffInfo> <amount>89.10</amount> <currency>USD</currency> <dailyTotalIndicator>3</dailyTotalIndicator> <totalAmount>108.81</totalAmount> </tariffInfo> </globalPrice> </globalPriceInformation> <representativeParties> <occupantList> <passengerReference> <type>BHO</type> <value>2</value> </passengerReference> </occupantList> <occupantPreferences> <occupantPreferences> <occupantLanguage>FR</occupantLanguage> </occupantPreferences> </occupantPreferences> </representativeParties> </globalBookingInfo> <roomListInfo> <roomStayIndex> <sequenceDetails> <number>1</number> </sequenceDetails> </roomStayIndex> <commissionAndMarkup> <commissionInfo> <commissionDetails> <type>UNK</type> <rate>10</rate> </commissionDetails> </commissionInfo> </commissionAndMarkup> <cancellationPolicies> <cancellationDateTime> <businessSemantic>CAN</businessSemantic> <timeMode>LT</timeMode> </cancellationDateTime> </cancellationPolicies> <cancellationPolicies> <cancellationDateTime> <businessSemantic>CAN</businessSemantic> <timeMode>LT</timeMode> <dateTime> <year>2019</year> <month>12</month> <day>23</day> <hour>16</hour> <minutes>0</minutes> </dateTime> </cancellationDateTime> <cancellationNights> <quantityDetails> <qualifier>CAN</qualifier> <value>1</value> <unit>N</unit> </quantityDetails> </cancellationNights> </cancellationPolicies> <requestableInformation> <requestedDates> <businessSemantic>CHK</businessSemantic> <timeMode>CHK</timeMode> <beginDateTime> <year>2019</year> <month>12</month> <day>25</day> </beginDateTime> <endDateTime> <year>2019</year> <month>12</month> <day>26</day> </endDateTime> </requestedDates> <roomRateDetails> <roomInformation> <roomRateIdentifier> <roomType>A1D</roomType> <ratePlanCode>GOV</ratePlanCode> <rateCategoryCode>GOV</rateCategoryCode> <rateQualifiedIndic>C</rateQualifiedIndic> <rateQualifiedIndic>A</rateQualifiedIndic> </roomRateIdentifier> <bookingCode>UM89ZI7</bookingCode> <guestCountDetails> <numberOfUnit>1</numberOfUnit> <unitQualifier>A</unitQualifier> </guestCountDetails> </roomInformation> <specialInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>BC</informationType> <source>M</source> <encoding>1</encoding> </freeTextDetails> <freeText>UM89ZI7</freeText> </specialInfo> <specialInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>RC</informationType> <source>M</source> <encoding>1</encoding> </freeTextDetails> <freeText>GOV</freeText> </specialInfo> <specialInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>RO</informationType> <source>M</source> <encoding>1</encoding> </freeTextDetails> <freeText>A1D</freeText> </specialInfo> <bookingRequirement> <guaranteeDepositStatusInfo> <statusDetails> <indicator>PP</indicator> <action>1</action> </statusDetails> </guaranteeDepositStatusInfo> <paymentInformation> <paymentDetails> <formOfPaymentCode>1</formOfPaymentCode> <paymentType>4</paymentType> <serviceToPay>3</serviceToPay> </paymentDetails> </paymentInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>VI</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>BA</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>CB</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>AM</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>DS</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>IK</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>MC</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>EC</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>CA</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>BC</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>JC</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>AX</vendorCode> </formOfPayment> </creditCardInformation> <markerOfBookingRequirement></markerOfBookingRequirement> </bookingRequirement> <markerOfExtra></markerOfExtra> <tariffInformation> <tariffInfo> <amount>108.81</amount> <currency>USD</currency> <dailyTotalIndicator>3</dailyTotalIndicator> <status>1</status> </tariffInfo> </tariffInformation> </roomRateDetails> <guaranteeOrDeposit> <paymentInfo> <paymentDetails> <formOfPaymentCode>1</formOfPaymentCode> <paymentType>4</paymentType> <serviceToPay>3</serviceToPay> </paymentDetails> </paymentInfo> <groupCreditCardInfo> <creditCardInfo> <ccInfo> <vendorCode>VI</vendorCode> <cardNumber>4988438843884305</cardNumber> <expiryDate>1020</expiryDate> </ccInfo> </creditCardInfo> <concealedCreditCardInfo> <ccInfo> <cardNumber>498843XXXXXX4305</cardNumber> </ccInfo> </concealedCreditCardInfo> <fortknoxIds> <referenceDetails> <type>NOX</type> <value>104506825609364</value> </referenceDetails> </fortknoxIds> </groupCreditCardInfo> </guaranteeOrDeposit> <guestList> <occupantList> <passengerReference> <type>ROP</type> <value>1</value> </passengerReference> </occupantList> </guestList> <guestList> <occupantList> <passengerReference> <type>ROP</type> <value>2</value> </passengerReference> </occupantList> </guestList> <guestList> <occupantList></occupantList> <age> <quantityDetails> <qualifier>AGE</qualifier> <value>7</value> </quantityDetails> </age> </guestList> <guestList> <occupantList></occupantList> <age> <quantityDetails> <qualifier>AGE</qualifier> <value>8</value> </quantityDetails> </age> </guestList> </requestableInformation> <rateChanges> <rateChangeAmountInformation> <tariffInfo> <amount>89.10</amount> <currency>USD</currency> <dailyTotalIndicator>DY</dailyTotalIndicator> </tariffInfo> </rateChangeAmountInformation> <rateChangePeriodInformation> <businessSemantic>HRC</businessSemantic> <beginDateTime> <year>2019</year> <month>12</month> <day>25</day> </beginDateTime> <endDateTime> <year>2019</year> <month>12</month> <day>26</day> </endDateTime> </rateChangePeriodInformation> </rateChanges> </roomListInfo> </roomStayData> <roomStayData> <markerRoomStayData></markerRoomStayData> <pnrInfo> <tattooReference> <referenceDetails> <type>S</type> <value>2</value> </referenceDetails> </tattooReference> </pnrInfo> <globalBookingInfo> <hotelPropertyInfo> <hotelReference> <chainCode>RY</chainCode> <cityCode>ZSY</cityCode> <hotelCode>083</hotelCode> </hotelReference> <hotelName>RODEWAY INN NEAR AZ STATE UNIVERSITY</hotelName> </hotelPropertyInfo> <forceSellIndicator> <statusDetails> <indicator>FS</indicator> <action>2</action> </statusDetails> </forceSellIndicator> <individualCompanyId> <companyName>COUNTRY INN SUITES</companyName> </individualCompanyId> <bookingInfo> <reservation> <companyId>RY</companyId> <controlNumber>83059127</controlNumber> <controlType>2</controlType> </reservation> </bookingInfo> <bookingSource> <originIdentification> <originatorId>57591472</originatorId> </originIdentification> </bookingSource> <globalPriceInformation> <globalPrice> <tariffInfo> <amount>89.10</amount> <currency>USD</currency> <dailyTotalIndicator>3</dailyTotalIndicator> <totalAmount>108.81</totalAmount> </tariffInfo> </globalPrice> </globalPriceInformation> <representativeParties> <occupantList> <passengerReference> <type>BHO</type> <value>3</value> </passengerReference> </occupantList> <occupantPreferences> <occupantPreferences> <occupantLanguage>FR</occupantLanguage> </occupantPreferences> </occupantPreferences> </representativeParties> </globalBookingInfo> <roomListInfo> <roomStayIndex> <sequenceDetails> <number>1</number> </sequenceDetails> </roomStayIndex> <commissionAndMarkup> <commissionInfo> <commissionDetails> <type>UNK</type> <rate>10</rate> </commissionDetails> </commissionInfo> </commissionAndMarkup> <cancellationPolicies> <cancellationDateTime> <businessSemantic>CAN</businessSemantic> <timeMode>LT</timeMode> </cancellationDateTime> </cancellationPolicies> <cancellationPolicies> <cancellationDateTime> <businessSemantic>CAN</businessSemantic> <timeMode>LT</timeMode> <dateTime> <year>2019</year> <month>12</month> <day>23</day> <hour>16</hour> <minutes>0</minutes> </dateTime> </cancellationDateTime> <cancellationNights> <quantityDetails> <qualifier>CAN</qualifier> <value>1</value> <unit>N</unit> </quantityDetails> </cancellationNights> </cancellationPolicies> <requestableInformation> <requestedDates> <businessSemantic>CHK</businessSemantic> <timeMode>CHK</timeMode> <beginDateTime> <year>2019</year> <month>12</month> <day>25</day> </beginDateTime> <endDateTime> <year>2019</year> <month>12</month> <day>26</day> </endDateTime> </requestedDates> <roomRateDetails> <roomInformation> <roomRateIdentifier> <roomType>A1D</roomType> <ratePlanCode>GOV</ratePlanCode> <rateCategoryCode>GOV</rateCategoryCode> <rateQualifiedIndic>C</rateQualifiedIndic> <rateQualifiedIndic>A</rateQualifiedIndic> </roomRateIdentifier> <bookingCode>UM89ZI7</bookingCode> <guestCountDetails> <numberOfUnit>1</numberOfUnit> <unitQualifier>A</unitQualifier> </guestCountDetails> </roomInformation> <specialInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>BC</informationType> <source>M</source> <encoding>1</encoding> </freeTextDetails> <freeText>UM89ZI7</freeText> </specialInfo> <specialInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>RC</informationType> <source>M</source> <encoding>1</encoding> </freeTextDetails> <freeText>GOV</freeText> </specialInfo> <specialInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>RO</informationType> <source>M</source> <encoding>1</encoding> </freeTextDetails> <freeText>A1D</freeText> </specialInfo> <bookingRequirement> <guaranteeDepositStatusInfo> <statusDetails> <indicator>PP</indicator> <action>1</action> </statusDetails> </guaranteeDepositStatusInfo> <paymentInformation> <paymentDetails> <formOfPaymentCode>1</formOfPaymentCode> <paymentType>4</paymentType> <serviceToPay>3</serviceToPay> </paymentDetails> </paymentInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>VI</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>BA</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>CB</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>AM</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>DS</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>IK</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>MC</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>EC</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>CA</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>BC</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>JC</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>AX</vendorCode> </formOfPayment> </creditCardInformation> <markerOfBookingRequirement></markerOfBookingRequirement> </bookingRequirement> <markerOfExtra></markerOfExtra> <tariffInformation> <tariffInfo> <amount>108.81</amount> <currency>USD</currency> <dailyTotalIndicator>3</dailyTotalIndicator> <status>1</status> </tariffInfo> </tariffInformation> </roomRateDetails> <guaranteeOrDeposit> <paymentInfo> <paymentDetails> <formOfPaymentCode>1</formOfPaymentCode> <paymentType>4</paymentType> <serviceToPay>3</serviceToPay> </paymentDetails> </paymentInfo> <groupCreditCardInfo> <creditCardInfo> <ccInfo> <vendorCode>VI</vendorCode> <cardNumber>4988438843884305</cardNumber> <expiryDate>1020</expiryDate> </ccInfo> </creditCardInfo> <concealedCreditCardInfo> <ccInfo> <cardNumber>498843XXXXXX4305</cardNumber> </ccInfo> </concealedCreditCardInfo> <fortknoxIds> <referenceDetails> <type>NOX</type> <value>104506825609364</value> </referenceDetails> </fortknoxIds> </groupCreditCardInfo> </guaranteeOrDeposit> <guestList> <occupantList> <passengerReference> <type>ROP</type> <value>3</value> </passengerReference> </occupantList> </guestList> <guestList> <occupantList> <passengerReference> <type>ROP</type> <value>4</value> </passengerReference> </occupantList> </guestList> <guestList> <occupantList></occupantList> <age> <quantityDetails> <qualifier>AGE</qualifier> <value>5</value> </quantityDetails> </age> </guestList> <guestList> <occupantList></occupantList> <age> <quantityDetails> <qualifier>AGE</qualifier> <value>6</value> </quantityDetails> </age> </guestList> </requestableInformation> <rateChanges> <rateChangeAmountInformation> <tariffInfo> <amount>89.10</amount> <currency>USD</currency> <dailyTotalIndicator>DY</dailyTotalIndicator> </tariffInfo> </rateChangeAmountInformation> <rateChangePeriodInformation> <businessSemantic>HRC</businessSemantic> <beginDateTime> <year>2019</year> <month>12</month> <day>25</day> </beginDateTime> <endDateTime> <year>2019</year> <month>12</month> <day>26</day> </endDateTime> </rateChangePeriodInformation> </rateChanges> </roomListInfo> </roomStayData> </Hotel\_SellReply>

## 5.4.3 Possible Errors

See "Error Messages" section.

* * *

## 5.5 Operation: MultiRoom Booking - Identical Rooms

Example :

              Room 1 -> 1 Adult  
              Room 2 -> 1 Adult

## 5.5.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Hotel\_Sell xmlns="http://xml.amadeus.com/HBKRCQ\_24\_2\_1A"> <roomStayData> <markerRoomStayData></markerRoomStayData> <globalBookingInfo> <markerGlobalBookingInfo></markerGlobalBookingInfo> <bookingSource> <originIdentification> <originatorId>12345675</originatorId> </originIdentification> </bookingSource> <representativeParties> <occupantList> <passengerReference> <type>BHO</type> <value>2</value> </passengerReference> </occupantList> </representativeParties> </globalBookingInfo> <roomList> <markerRoomstayQuery></markerRoomstayQuery> <roomRateDetails> <marker></marker> <hotelProductReference> <referenceDetails> <type>BC</type> <value>B1KORL</value> </referenceDetails> </hotelProductReference> <markerOfExtra></markerOfExtra> </roomRateDetails> <guaranteeOrDeposit> <paymentInfo> <paymentDetails> <formOfPaymentCode>1</formOfPaymentCode> <paymentType>1</paymentType> <serviceToPay>3</serviceToPay> </paymentDetails> </paymentInfo> <groupCreditCardInfo> <creditCardInfo> <ccInfo> <vendorCode>VI</vendorCode> <cardNumber>4444333322221111</cardNumber> <expiryDate>1225</expiryDate> </ccInfo> </creditCardInfo> </groupCreditCardInfo> <groupTdsInformation> <authenticationdata> <authenticationdatadetails> <authenticationindicator>02</authenticationindicator> <transstatus>Y</transstatus> </authenticationdatadetails> <tdsversion>2.1.0</tdsversion> </authenticationdata> <tdsblobdata> <tdsblbidentifier> <referencedetails> <value>CAVV</value> </referencedetails> </tdsblbidentifier> <tdsblbdata> <datalength>20</datalength> <datatype>B</datatype> <binarydata>TzZuZ2w0WDVTcVNvb1do</binarydata> </tdsblbdata> </tdsblobdata> <tdsblobdata> <tdsblbidentifier> <referencedetails> <value>DS\_TRANSACTIONID</value> </referencedetails> </tdsblbidentifier> <tdsblbdata> <datalength>20</datalength> <datatype>B</datatype> <binarydata>TzwuZ2w0WDVTcVNvb1do</binarydata> </tdsblbdata> </tdsblobdata> </groupTdsInformation> </guaranteeOrDeposit> <guestList> <occupantList> <passengerReference> <type>RMO</type> <value>2</value> </passengerReference> </occupantList> </guestList> </roomList> </roomStayData> <roomStayData> <markerRoomStayData></markerRoomStayData> <globalBookingInfo> <markerGlobalBookingInfo></markerGlobalBookingInfo> <bookingSource> <originIdentification> <originatorId>12345675</originatorId> </originIdentification> </bookingSource> <representativeParties> <occupantList> <passengerReference> <type>BHO</type> <value>3</value> </passengerReference> </occupantList> </representativeParties> </globalBookingInfo> <roomList> <markerRoomstayQuery></markerRoomstayQuery> <roomRateDetails> <marker></marker> <hotelProductReference> <referenceDetails> <type>BC</type> <value>B1KORL</value> </referenceDetails> </hotelProductReference> <markerOfExtra></markerOfExtra> </roomRateDetails> <guaranteeOrDeposit> <paymentInfo> <paymentDetails> <formOfPaymentCode>1</formOfPaymentCode> <paymentType>1</paymentType> <serviceToPay>3</serviceToPay> </paymentDetails> </paymentInfo> <groupCreditCardInfo> <creditCardInfo> <ccInfo> <vendorCode>VI</vendorCode> <cardNumber>4444333322221111</cardNumber> <expiryDate>1225</expiryDate> </ccInfo> </creditCardInfo> </groupCreditCardInfo> <groupTdsInformation> <authenticationdata> <authenticationdatadetails> <authenticationindicator>02</authenticationindicator> <transstatus>Y</transstatus> </authenticationdatadetails> <tdsversion>2.1.0</tdsversion> </authenticationdata> <tdsblobdata> <tdsblbidentifier> <referencedetails> <value>CAVV</value> </referencedetails> </tdsblbidentifier> <tdsblbdata> <datalength>20</datalength> <datatype>B</datatype> <binarydata>TzZuZ2w0WDVTcVNvb1do</binarydata> </tdsblbdata> </tdsblobdata> <tdsblobdata> <tdsblbidentifier> <referencedetails> <value>DS\_TRANSACTIONID</value> </referencedetails> </tdsblbidentifier> <tdsblbdata> <datalength>20</datalength> <datatype>B</datatype> <binarydata>TzwuZ2w0WDVTcVNvb1do</binarydata> </tdsblbdata> </tdsblobdata> </groupTdsInformation> </guaranteeOrDeposit> <guestList> <occupantList> <passengerReference> <type>RMO</type> <value>3</value> </passengerReference> </occupantList> </guestList> </roomList> </roomStayData> </Hotel\_Sell>

## 5.5.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Hotel\_SellReply xmlns="http://xml.amadeus.com/HBKRCR\_24\_1\_1A"> <bookingTypeIndicator> <numberOfRooms> <quantity>2</quantity> <statusCode>HK</statusCode> </numberOfRooms> </bookingTypeIndicator> <systemIdentifier> <deliveringSystem> <companyId>AET</companyId> </deliveringSystem> </systemIdentifier> <bookingCompany> <companyQualifier> <attributeDetails> <attributeType>BRA</attributeType> </attributeDetails> </companyQualifier> <companyName> <companyName>IBM</companyName> </companyName> </bookingCompany> <bookingCompany> <companyQualifier> <attributeDetails> <attributeType>SBR</attributeType> </attributeDetails> </companyQualifier> <companyName> <companyName>IBM-Europe</companyName> </companyName> </bookingCompany> <bookingCompany> <companyQualifier> <attributeDetails> <attributeType>SSB</attributeType> </attributeDetails> </companyQualifier> <companyName> <companyName>IBM-Europe- Germany</companyName> </companyName> </bookingCompany> <bookingPayerDetails> <bookerName> <travellerNameInfo> <quantity>1</quantity> </travellerNameInfo> <otherPaxNamesDetails> <surname>Test</surname> <givenName>Amadeus</givenName> <title>MR</title> </otherPaxNamesDetails> </bookerName> <occupantPersonalInformation> <regulatoryGender>M</regulatoryGender> <documentIdentification> <type>CPF</type> <number>123456</number> </documentIdentification> </occupantPersonalInformation> </bookingPayerDetails> <roomStayData> <markerRoomStayData></markerRoomStayData> <pnrInfo> <tattooReference> <referenceDetails> <type>S</type> <value>1</value> </referenceDetails> </tattooReference> <reservationControlInfoPNR> <reservation> <companyId>1A</companyId> <controlNumber>Z7QN5D</controlNumber> <controlType>P</controlType> </reservation> </reservationControlInfoPNR> </pnrInfo> <globalBookingInfo> <hotelPropertyInfo> <hotelReference> <chainCode>DH</chainCode> <cityCode>PAR</cityCode> <hotelCode>001</hotelCode> </hotelReference> <hotelName>PROPERTY PAR 001</hotelName> </hotelPropertyInfo> <individualCompanyId> <companyName>DOTWHOTELS</companyName> </individualCompanyId> <bookingInfo> <reservation> <companyId>DH</companyId> <controlNumber>111111111</controlNumber> <controlType>2</controlType> </reservation> </bookingInfo> <bookingSource> <originIdentification> <originatorId>12345675</originatorId> </originIdentification> </bookingSource> <globalPriceInformation> <globalPrice> <tariffInfo> <amount>145</amount> <currency>EUR</currency> <dailyTotalIndicator>3</dailyTotalIndicator> </tariffInfo> <chargeDetails> <type>MU</type> <amount>20</amount> <description>text1</description> <currency>EUR</currency> </chargeDetails> </globalPrice> </globalPriceInformation> <representativeParties> <occupantList> <passengerReference> <type>BHO</type> <value>2</value> </passengerReference> </occupantList> <guestContactInfo> <phoneOrEmailType>EML</phoneOrEmailType> <emailAddress>deepti.gupta@amadeus.com</emailAddress> </guestContactInfo> <occupantPreferences> <occupantPreferences> <occupantLanguage>ENG</occupantLanguage> </occupantPreferences> </occupantPreferences> <occupantPersonalInformation> <regulatoryGender>F</regulatoryGender> <documentIdentification> <type>CPF</type> <number>1234567</number> </documentIdentification> </occupantPersonalInformation> <occupantAddress> <countryCode>FRA</countryCode> </occupantAddress> </representativeParties> <keyValueTree> <attributeDetails> <attributeType>EFR</attributeType> </attributeDetails> </keyValueTree> </globalBookingInfo> <roomListInfo> <roomStayIndex> <sequenceDetails> <number>1</number> </sequenceDetails> </roomStayIndex> <requestableInformation> <requestedDates> <businessSemantic>CHK</businessSemantic> <timeMode>CHK</timeMode> <beginDateTime> <year>2010</year> <month>10</month> <day>25</day> </beginDateTime> <endDateTime> <year>2010</year> <month>10</month> <day>26</day> </endDateTime> </requestedDates> <roomRateDetails> <roomInformation> <roomRateIdentifier> <roomType>ROH</roomType> <ratePlanCode>RAC</ratePlanCode> </roomRateIdentifier> <bookingCode>AAA</bookingCode> <guestCountDetails> <numberOfUnit>2</numberOfUnit> <unitQualifier>A</unitQualifier> </guestCountDetails> </roomInformation> <specialInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>BC</informationType> <source>M</source> <encoding>1</encoding> </freeTextDetails> <freeText>BookingCode</freeText> </specialInfo> <specialInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>RC</informationType> <source>M</source> <encoding>1</encoding> </freeTextDetails> <freeText>RatePlanCode</freeText> </specialInfo> <specialInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>RO</informationType> <source>M</source> <encoding>1</encoding> </freeTextDetails> <freeText>RoomTypeCode</freeText> </specialInfo> <markerOfExtra></markerOfExtra> <tariffInformation> <tariffInfo> <amount>145</amount> <currency>EUR</currency> <dailyTotalIndicator>DY</dailyTotalIndicator> <status>1</status> </tariffInfo> <associatedCharges> <chargeCode>MU</chargeCode> <chargeAmount>20</chargeAmount> <description>text1</description> <chargeCurrency>EUR</chargeCurrency> </associatedCharges> <associatedCharges> <chargeCode>MM</chargeCode> <chargeAmount>20</chargeAmount> <description>text2</description> <chargeCurrency>EUR</chargeCurrency> </associatedCharges> </tariffInformation> </roomRateDetails> <guaranteeOrDeposit> <paymentInfo> <paymentDetails> <formOfPaymentCode>1</formOfPaymentCode> <paymentType>1</paymentType> <serviceToPay>3</serviceToPay> </paymentDetails> </paymentInfo> <groupCreditCardInfo> <creditCardInfo> <ccInfo> <vendorCode>VI</vendorCode> <cardNumber>4444333322221111</cardNumber> <expiryDate>0512</expiryDate> </ccInfo> </creditCardInfo> <concealedCreditCardInfo> <ccInfo> <cardNumber>444433XXXXXX1111</cardNumber> </ccInfo> </concealedCreditCardInfo> <fortknoxIds> <referenceDetails> <type>NOX</type> <value>100000000000139</value> </referenceDetails> </fortknoxIds> </groupCreditCardInfo> </guaranteeOrDeposit> </requestableInformation> </roomListInfo> </roomStayData> <roomStayData> <markerRoomStayData></markerRoomStayData> <pnrInfo> <tattooReference> <referenceDetails> <type>S</type> <value>2</value> </referenceDetails> </tattooReference> <reservationControlInfoPNR> <reservation> <companyId>1A</companyId> <controlNumber>Z7QN5D</controlNumber> <controlType>P</controlType> </reservation> </reservationControlInfoPNR> </pnrInfo> <globalBookingInfo> <hotelPropertyInfo> <hotelReference> <chainCode>DH</chainCode> <cityCode>PAR</cityCode> <hotelCode>001</hotelCode> </hotelReference> <hotelName>PROPERTY PAR 001</hotelName> </hotelPropertyInfo> <individualCompanyId> <companyName>DOTWHOTELS</companyName> </individualCompanyId> <bookingInfo> <reservation> <companyId>DH</companyId> <controlNumber>222222222</controlNumber> <controlType>2</controlType> </reservation> </bookingInfo> <bookingSource> <originIdentification> <originatorId>12345678</originatorId> </originIdentification> </bookingSource> <globalPriceInformation> <globalPrice> <tariffInfo> <amount>145</amount> <currency>EUR</currency> <dailyTotalIndicator>3</dailyTotalIndicator> </tariffInfo> <chargeDetails> <type>MU</type> <amount>20</amount> <description>text1</description> <currency>EUR</currency> </chargeDetails> <chargeDetails> <type>MM</type> <amount>20</amount> <description>text2</description> <currency>EUR</currency> </chargeDetails> </globalPrice> </globalPriceInformation> <representativeParties> <occupantList> <passengerReference> <type>BHO</type> <value>2</value> </passengerReference> </occupantList> <guestContactInfo> <phoneOrEmailType>EML</phoneOrEmailType> <emailAddress>deepti.gupta@amadeus.com</emailAddress> </guestContactInfo> <occupantPreferences> <occupantPreferences> <occupantLanguage>ENG</occupantLanguage> </occupantPreferences> </occupantPreferences> <occupantPersonalInformation> <regulatoryGender>F</regulatoryGender> <documentIdentification> <type>CPF</type> <number>123456</number> </documentIdentification> </occupantPersonalInformation> <occupantAddress> <countryCode>FRA</countryCode> </occupantAddress> </representativeParties> <keyValueTree> <attributeDetails> <attributeType>EFR</attributeType> </attributeDetails> </keyValueTree> </globalBookingInfo> <roomListInfo> <roomStayIndex> <sequenceDetails> <number>1</number> </sequenceDetails> </roomStayIndex> <requestableInformation> <requestedDates> <businessSemantic>CHK</businessSemantic> <timeMode>CHK</timeMode> <beginDateTime> <year>2010</year> <month>10</month> <day>25</day> </beginDateTime> <endDateTime> <year>2010</year> <month>10</month> <day>26</day> </endDateTime> </requestedDates> <roomRateDetails> <roomInformation> <roomRateIdentifier> <roomType>ROH</roomType> <ratePlanCode>RAC</ratePlanCode> </roomRateIdentifier> <bookingCode>AAA</bookingCode> <guestCountDetails> <numberOfUnit>2</numberOfUnit> <unitQualifier>A</unitQualifier> </guestCountDetails> </roomInformation> <specialInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>BC</informationType> <source>M</source> <encoding>1</encoding> </freeTextDetails> <freeText>BookingCode</freeText> </specialInfo> <specialInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>RC</informationType> <source>M</source> <encoding>1</encoding> </freeTextDetails> <freeText>RatePlanCode</freeText> </specialInfo> <specialInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>RO</informationType> <source>M</source> <encoding>1</encoding> </freeTextDetails> <freeText>RoomTypeCode</freeText> </specialInfo> <markerOfExtra></markerOfExtra> <tariffInformation> <tariffInfo> <amount>145</amount> <currency>EUR</currency> <dailyTotalIndicator>DY</dailyTotalIndicator> <status>1</status> </tariffInfo> <associatedCharges> <chargeCode>MU</chargeCode> <chargeAmount>20</chargeAmount> <description>text1</description> <chargeCurrency>EUR</chargeCurrency> </associatedCharges> </tariffInformation> </roomRateDetails> <guaranteeOrDeposit> <paymentInfo> <paymentDetails> <formOfPaymentCode>1</formOfPaymentCode> <paymentType>2</paymentType> <serviceToPay>3</serviceToPay> </paymentDetails> </paymentInfo> <groupBillbackData> <providerInformation> <travelSector>HTL</travelSector> <companyCode>CN</companyCode> </providerInformation> <deploymentId> <referenceType>EXT</referenceType> <uniqueReference>10026464</uniqueReference> </deploymentId> <agentIdentification> <originatorTypeCode>T</originatorTypeCode> <originator>71</originator> </agentIdentification> <agentIdentification> <originatorTypeCode>G</originatorTypeCode> <originator>401679</originator> </agentIdentification> <supplierInformation> <phoneOrEmailType>FAX</phoneOrEmailType> <telephoneNumberDetails> <telephoneNumber>44-20-76318080</telephoneNumber> </telephoneNumberDetails> </supplierInformation> <paymentInstructions> <freeTextDetails> <textSubjectQualifier>PAY</textSubjectQualifier> <source>F</source> <encoding>7</encoding> </freeTextDetails> <freeText>ROOM and BREAKFAST ONLY</freeText> </paymentInstructions> <consumerAccount> <referenceDetails> <type>PRI</type> <value>DEMOACC</value> </referenceDetails> </consumerAccount> </groupBillbackData> </guaranteeOrDeposit> </requestableInformation> </roomListInfo> </roomStayData> </Hotel\_SellReply>

## 5.5.3 Possible Errors

See "Error Messages" section.

* * *

## 5.6 Operation: MultiRoom Booking - Non Identical Rooms

Example :

      Room 1 : 1 Adult  
              Room 2 : 2 Adults

## 5.6.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Hotel\_Sell xmlns="http://xml.amadeus.com/HBKRCQ\_24\_2\_1A"> <roomStayData> <markerRoomStayData></markerRoomStayData> <globalBookingInfo> <markerGlobalBookingInfo></markerGlobalBookingInfo> <bookingSource> <originIdentification> <originatorId>12345675</originatorId> </originIdentification> </bookingSource> <representativeParties> <occupantList> <passengerReference> <type>BHO</type> <value>2</value> </passengerReference> </occupantList> </representativeParties> </globalBookingInfo> <roomList> <markerRoomstayQuery></markerRoomstayQuery> <roomRateDetails> <marker></marker> <hotelProductReference> <referenceDetails> <type>BC</type> <value>B1KORL</value> </referenceDetails> </hotelProductReference> <markerOfExtra></markerOfExtra> </roomRateDetails> <guaranteeOrDeposit> <paymentInfo> <paymentDetails> <formOfPaymentCode>1</formOfPaymentCode> <paymentType>1</paymentType> <serviceToPay>3</serviceToPay> </paymentDetails> </paymentInfo> <groupCreditCardInfo> <creditCardInfo> <ccInfo> <vendorCode>VI</vendorCode> <cardNumber>4444333322221111</cardNumber> <expiryDate>1225</expiryDate> </ccInfo> </creditCardInfo> </groupCreditCardInfo> <groupTdsInformation> <authenticationdata> <authenticationdatadetails> <authenticationindicator>02</authenticationindicator> <transstatus>Y</transstatus> </authenticationdatadetails> <tdsversion>2.1.0</tdsversion> </authenticationdata> <tdsblobdata> <tdsblbidentifier> <referencedetails> <value>CAVV</value> </referencedetails> </tdsblbidentifier> <tdsblbdata> <datalength>20</datalength> <datatype>B</datatype> <binarydata>TzZuZ2w0WDVTcVNvb1do</binarydata> </tdsblbdata> </tdsblobdata> <tdsblobdata> <tdsblbidentifier> <referencedetails> <value>DS\_TRANSACTIONID</value> </referencedetails> </tdsblbidentifier> <tdsblbdata> <datalength>20</datalength> <datatype>B</datatype> <binarydata>TzwuZ2w0WDVTcVNvb1do</binarydata> </tdsblbdata> </tdsblobdata> </groupTdsInformation> </guaranteeOrDeposit> <guestList> <occupantList> <passengerReference> <type>RMO</type> <value>2</value> </passengerReference> </occupantList> </guestList> </roomList> </roomStayData> <roomStayData> <markerRoomStayData></markerRoomStayData> <globalBookingInfo> <markerGlobalBookingInfo></markerGlobalBookingInfo> <bookingSource> <originIdentification> <originatorId>12345675</originatorId> </originIdentification> </bookingSource> <representativeParties> <occupantList> <passengerReference> <type>BHO</type> <value>3</value> </passengerReference> </occupantList> </representativeParties> </globalBookingInfo> <roomList> <markerRoomstayQuery></markerRoomstayQuery> <roomRateDetails> <marker></marker> <hotelProductReference> <referenceDetails> <type>BC</type> <value>B1KORL</value> </referenceDetails> </hotelProductReference> <markerOfExtra></markerOfExtra> </roomRateDetails> <guaranteeOrDeposit> <paymentInfo> <paymentDetails> <formOfPaymentCode>1</formOfPaymentCode> <paymentType>1</paymentType> <serviceToPay>3</serviceToPay> </paymentDetails> </paymentInfo> <groupCreditCardInfo> <creditCardInfo> <ccInfo> <vendorCode>VI</vendorCode> <cardNumber>4444333322221111</cardNumber> <expiryDate>1225</expiryDate> </ccInfo> </creditCardInfo> </groupCreditCardInfo> <groupTdsInformation> <authenticationdata> <authenticationdatadetails> <authenticationindicator>02</authenticationindicator> <transstatus>Y</transstatus> </authenticationdatadetails> <tdsversion>2.1.0</tdsversion> </authenticationdata> <tdsblobdata> <tdsblbidentifier> <referencedetails> <value>CAVV</value> </referencedetails> </tdsblbidentifier> <tdsblbdata> <datalength>20</datalength> <datatype>B</datatype> <binarydata>TzZuZ2w0WDVTcVNvb1do</binarydata> </tdsblbdata> </tdsblobdata> <tdsblobdata> <tdsblbidentifier> <referencedetails> <value>DS\_TRANSACTIONID</value> </referencedetails> </tdsblbidentifier> <tdsblbdata> <datalength>20</datalength> <datatype>B</datatype> <binarydata>TzwuZ2w0WDVTcVNvb1do</binarydata> </tdsblbdata> </tdsblobdata> </groupTdsInformation> </guaranteeOrDeposit> <guestList> <occupantList> <passengerReference> <type>RMO</type> <value>3</value> </passengerReference> </occupantList> </guestList> <guestList> <occupantList> <passengerReference> <type>RMO</type> <value>4</value> </passengerReference> </occupantList> </guestList> </roomList> </roomStayData> </Hotel\_Sell>

## 5.6.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Hotel\_SellReply xmlns="http://xml.amadeus.com/HBKRCR\_24\_2\_1A"> <bookingTypeIndicator> <numberOfRooms> <quantity>2</quantity> <statusCode>HK</statusCode> </numberOfRooms> </bookingTypeIndicator> <roomStayData> <markerRoomStayData></markerRoomStayData> <pnrInfo> <tattooReference> <referenceDetails> <type>S</type> <value>1</value> </referenceDetails> </tattooReference> <reservationControlInfoPNR> <reservation> <companyId>1A</companyId> <controlNumber>26EU7W</controlNumber> <controlType>P</controlType> </reservation> </reservationControlInfoPNR> </pnrInfo> <globalBookingInfo> <hotelPropertyInfo> <hotelReference> <chainCode>DH</chainCode> <cityCode>PAR</cityCode> <hotelCode>BLY</hotelCode> </hotelReference> <hotelName>ABBA MONTPARNASSE</hotelName> </hotelPropertyInfo> <forceSellIndicator> <statusDetails> <indicator>FS</indicator> <action>2</action> </statusDetails> </forceSellIndicator> <individualCompanyId> <companyName>DOTWHOTELS</companyName> </individualCompanyId> <bookingInfo> <reservation> <companyId>DH</companyId> <controlNumber>105978610</controlNumber> <controlType>2</controlType> </reservation> </bookingInfo> <bookingSource> <originIdentification> <originatorId>23221030</originatorId> </originIdentification> </bookingSource> <globalPriceInformation> <globalPrice> <tariffInfo> <currency>EUR</currency> <dailyTotalIndicator>3</dailyTotalIndicator> <totalAmount>440.50</totalAmount> </tariffInfo> </globalPrice> </globalPriceInformation> <representativeParties> <occupantList> <passengerReference> <type>BHO</type> <value>2</value> </passengerReference> </occupantList> <profileInfo> <secondaryRoleList></secondaryRoleList> <profileTypeAndID> <referenceDetails> <type>31</type> <value>1</value> </referenceDetails> </profileTypeAndID> </profileInfo> </representativeParties> </globalBookingInfo> <roomListInfo> <roomStayIndex> <sequenceDetails> <number>1</number> </sequenceDetails> </roomStayIndex> <markLinesAndRateDesc> <freeTextQualification> <textSubjectQualifier>2</textSubjectQualifier> <informationTypeId>ML</informationTypeId> </freeTextQualification> <freeText>179.55 AVERAGE RATE PER NIGHT TA COMM 10PCT</freeText> <freeText>EXCITING AWARDS ARE JUST BOOKINGS AWAY. MODIFY NOW</freeText> <freeText>AND RECEIVE 1795 POINTS. CHECK DRS FOR DETAILS.</freeText> </markLinesAndRateDesc> <checkInOutRules> <checkInOutTimeAndExpressInfo> <expressCheckIn>UN</expressCheckIn> <expressCheckOut>UN</expressCheckOut> <timeMode>LT</timeMode> </checkInOutTimeAndExpressInfo> </checkInOutRules> <commissionAndMarkup> <commissionInfo> <commissionDetails> <type>UNK</type> <rate>10</rate> </commissionDetails> </commissionInfo> </commissionAndMarkup> <requestableInformation> <requestedDates> <businessSemantic>CHK</businessSemantic> <timeMode>CHK</timeMode> <beginDateTime> <year>2014</year> <month>1</month> <day>22</day> </beginDateTime> <endDateTime> <year>2014</year> <month>1</month> <day>23</day> </endDateTime> </requestedDates> <roomRateDetails> <roomInformation> <roomRateIdentifier> <roomType>A1C</roomType> <ratePlanCode>RAC</ratePlanCode> </roomRateIdentifier> <bookingCode>A1CRAC</bookingCode> <guestCountDetails> <numberOfUnit>1</numberOfUnit> <unitQualifier>A</unitQualifier> </guestCountDetails> </roomInformation> <specialInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>BC</informationType> <source>M</source> <encoding>1</encoding> </freeTextDetails> <freeText>A1CRAC</freeText> </specialInfo> <specialInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>RC</informationType> <source>M</source> <encoding>1</encoding> </freeTextDetails> <freeText>RAC</freeText> </specialInfo> <specialInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>RO</informationType> <source>M</source> <encoding>1</encoding> </freeTextDetails> <freeText>A1C</freeText> </specialInfo> <bookingRequirement> <guaranteeDepositStatusInfo> <statusDetails> <indicator>DP</indicator> <action>1</action> </statusDetails> </guaranteeDepositStatusInfo> <guaranteeDepositRule> <tariffInfo> <amount>440.50</amount> <currency>EUR</currency> </tariffInfo> </guaranteeDepositRule> <paymentInformation> <paymentDetails> <formOfPaymentCode>1</formOfPaymentCode> <paymentType>2</paymentType> <serviceToPay>3</serviceToPay> </paymentDetails> </paymentInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>VI</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>CA</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>AX</vendorCode> </formOfPayment> </creditCardInformation> <markerOfBookingRequirement></markerOfBookingRequirement> </bookingRequirement> <markerOfExtra></markerOfExtra> <tariffInformation> <tariffInfo> <amount>440.50</amount> <currency>EUR</currency> <dailyTotalIndicator>3</dailyTotalIndicator> <status>1</status> <rateChangeIndicator>3</rateChangeIndicator> </tariffInfo> </tariffInformation> </roomRateDetails> <guaranteeOrDeposit> <paymentInfo> <paymentDetails> <formOfPaymentCode>1</formOfPaymentCode> <paymentType>2</paymentType> <serviceToPay>3</serviceToPay> </paymentDetails> </paymentInfo> <groupCreditCardInfo> <creditCardInfo> <ccInfo> <vendorCode>VI</vendorCode> <cardNumber>4444333322221111</cardNumber> <expiryDate>0117</expiryDate> </ccInfo> </creditCardInfo> <concealedCreditCardInfo> <ccInfo> <cardNumber>444433XXXXXX1111</cardNumber> </ccInfo> </concealedCreditCardInfo> <fortknoxIds> <referenceDetails> <type>NOX</type> <value>100000000000139</value> </referenceDetails> </fortknoxIds> </groupCreditCardInfo> </guaranteeOrDeposit> <guestList> <occupantList> <passengerReference> <type>ROP</type> <value>2</value> </passengerReference> </occupantList> </guestList> </requestableInformation> <rateChanges> <rateChangeAmountInformation> <tariffInfo> <amount>70.00</amount> <currency>EUR</currency> <dailyTotalIndicator>DY</dailyTotalIndicator> <status>1</status> </tariffInfo> </rateChangeAmountInformation> <rateChangePeriodInformation> <businessSemantic>HRC</businessSemantic> <beginDateTime> <year>2014</year> <month>1</month> <day>22</day> </beginDateTime> <endDateTime> <year>2014</year> <month>1</month> <day>23</day> </endDateTime> </rateChangePeriodInformation> </rateChanges> </roomListInfo> </roomStayData> <roomStayData> <markerRoomStayData></markerRoomStayData> <pnrInfo> <tattooReference> <referenceDetails> <type>S</type> <value>2</value> </referenceDetails> </tattooReference> <reservationControlInfoPNR> <reservation> <companyId>1A</companyId> <controlNumber>26EU7W</controlNumber> <controlType>P</controlType> </reservation> </reservationControlInfoPNR> </pnrInfo> <globalBookingInfo> <hotelPropertyInfo> <hotelReference> <chainCode>DH</chainCode> <cityCode>PAR</cityCode> <hotelCode>BLY</hotelCode> </hotelReference> <hotelName>ABBA MONTPARNASSE</hotelName> </hotelPropertyInfo> <forceSellIndicator> <statusDetails> <indicator>FS</indicator> <action>2</action> </statusDetails> </forceSellIndicator> <individualCompanyId> <companyName>DOTWHOTELS</companyName> </individualCompanyId> <bookingInfo> <reservation> <companyId>DH</companyId> <controlNumber>105978611</controlNumber> <controlType>2</controlType> </reservation> </bookingInfo> <bookingSource> <originIdentification> <originatorId>23221030</originatorId> </originIdentification> </bookingSource> <globalPriceInformation> <globalPrice> <tariffInfo> <currency>EUR</currency> <dailyTotalIndicator>3</dailyTotalIndicator> <totalAmount>450.50</totalAmount> </tariffInfo> </globalPrice> </globalPriceInformation> <representativeParties> <occupantList> <passengerReference> <type>BHO</type> <value>4</value> </passengerReference> </occupantList> <profileInfo> <secondaryRoleList></secondaryRoleList> <profileTypeAndID> <referenceDetails> <type>31</type> <value>1</value> </referenceDetails> </profileTypeAndID> </profileInfo> </representativeParties> </globalBookingInfo> <roomListInfo> <roomStayIndex> <sequenceDetails> <number>1</number> </sequenceDetails> </roomStayIndex> <markLinesAndRateDesc> <freeTextQualification> <textSubjectQualifier>2</textSubjectQualifier> <informationTypeId>ML</informationTypeId> </freeTextQualification> <freeText>179.55 AVERAGE RATE PER NIGHT TA COMM 10PCT</freeText> <freeText>EXCITING AWARDS ARE JUST BOOKINGS AWAY. MODIFY NOW</freeText> <freeText>AND RECEIVE 1795 POINTS. CHECK DRS FOR DETAILS.</freeText> </markLinesAndRateDesc> <checkInOutRules> <checkInOutTimeAndExpressInfo> <expressCheckIn>UN</expressCheckIn> <expressCheckOut>UN</expressCheckOut> <timeMode>LT</timeMode> </checkInOutTimeAndExpressInfo> </checkInOutRules> <commissionAndMarkup> <commissionInfo> <commissionDetails> <type>UNK</type> <rate>10</rate> </commissionDetails> </commissionInfo> </commissionAndMarkup> <requestableInformation> <requestedDates> <businessSemantic>CHK</businessSemantic> <timeMode>CHK</timeMode> <beginDateTime> <year>2014</year> <month>1</month> <day>22</day> </beginDateTime> <endDateTime> <year>2014</year> <month>1</month> <day>23</day> </endDateTime> </requestedDates> <roomRateDetails> <roomInformation> <roomRateIdentifier> <roomType>D1C</roomType> <ratePlanCode>RAC</ratePlanCode> </roomRateIdentifier> <bookingCode>D1CRAC</bookingCode> <guestCountDetails> <numberOfUnit>1</numberOfUnit> <unitQualifier>A</unitQualifier> </guestCountDetails> </roomInformation> <specialInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>BC</informationType> <source>M</source> <encoding>1</encoding> </freeTextDetails> <freeText>D1CRAC</freeText> </specialInfo> <specialInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>RC</informationType> <source>M</source> <encoding>1</encoding> </freeTextDetails> <freeText>RAC</freeText> </specialInfo> <specialInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>RO</informationType> <source>M</source> <encoding>1</encoding> </freeTextDetails> <freeText>D1C</freeText> </specialInfo> <bookingRequirement> <guaranteeDepositStatusInfo> <statusDetails> <indicator>DP</indicator> <action>1</action> </statusDetails> </guaranteeDepositStatusInfo> <guaranteeDepositRule> <tariffInfo> <amount>450.50</amount> <currency>EUR</currency> </tariffInfo> </guaranteeDepositRule> <paymentInformation> <paymentDetails> <formOfPaymentCode>1</formOfPaymentCode> <paymentType>2</paymentType> <serviceToPay>3</serviceToPay> </paymentDetails> </paymentInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>VI</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>CA</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>AX</vendorCode> </formOfPayment> </creditCardInformation> <markerOfBookingRequirement></markerOfBookingRequirement> </bookingRequirement> <markerOfExtra></markerOfExtra> <tariffInformation> <tariffInfo> <amount>450.50</amount> <currency>EUR</currency> <dailyTotalIndicator>3</dailyTotalIndicator> <status>1</status> <rateChangeIndicator>3</rateChangeIndicator> </tariffInfo> </tariffInformation> </roomRateDetails> <guaranteeOrDeposit> <paymentInfo> <paymentDetails> <formOfPaymentCode>1</formOfPaymentCode> <paymentType>2</paymentType> <serviceToPay>3</serviceToPay> </paymentDetails> </paymentInfo> <groupCreditCardInfo> <creditCardInfo> <ccInfo> <vendorCode>VI</vendorCode> <cardNumber>4444333322221111</cardNumber> <expiryDate>0117</expiryDate> </ccInfo> </creditCardInfo> <concealedCreditCardInfo> <ccInfo> <cardNumber>444433XXXXXX1111</cardNumber> </ccInfo> </concealedCreditCardInfo> <fortknoxIds> <referenceDetails> <type>NOX</type> <value>100000000000139</value> </referenceDetails> </fortknoxIds> </groupCreditCardInfo> </guaranteeOrDeposit> <guestList> <occupantList> <passengerReference> <type>ROP</type> <value>4</value> </passengerReference> </occupantList> </guestList> <guestList> <occupantList></occupantList> <age> <quantityDetails> <qualifier>AGE</qualifier> <value>5</value> </quantityDetails> </age> </guestList> </requestableInformation> <rateChanges> <rateChangeAmountInformation> <tariffInfo> <amount>80.00</amount> <currency>EUR</currency> <dailyTotalIndicator>DY</dailyTotalIndicator> <status>1</status> </tariffInfo> </rateChangeAmountInformation> <rateChangePeriodInformation> <businessSemantic>HRC</businessSemantic> <beginDateTime> <year>2014</year> <month>1</month> <day>22</day> </beginDateTime> <endDateTime> <year>2014</year> <month>1</month> <day>23</day> </endDateTime> </rateChangePeriodInformation> </rateChanges> </roomListInfo> </roomStayData> </Hotel\_SellReply>

## 5.6.3 Possible Errors

See "Error Messages" section.

* * *

## 5.7 Operation: On-request Booking

On-Request is a type of booking offered by Amadeus for hotels chains hosted in Amadeus hotel CRS and also for select hotel aggregators.

The hotel providers will decide what all rooms/rates of the property allows on-request bookings.

When an on-request booking is created, no confirmation number will be returned in the sell response. Instead, an On-Request ID is sent in place of the Confirmation number allowing the webservices customer to refer the booked hotel segment. The confirmation number will be added at a later date and time after the hotel provider accepts the booking.

The on-request hotel segment in the PNR will have the following statuses:

1.Once an on-request hotel booking is created, the status will be 'NN'

2.When the PNR is committed, the status changes to 'HN'.

3.When the booking is accepted by the provider, the status will change to 'HK'.

4.When the booking is denied by the provider, the status will be set to 'UC'.

## 5.7.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Hotel\_Sell xmlns="http://xml.amadeus.com/HBKRCQ\_24\_2\_1A"> <originatorOfRequest> <deliveringSystem> <companyId>1A</companyId> <locationId>MUC</locationId> </deliveringSystem> <originIdentification> <originatorId>12345675</originatorId> <inHouseIdentification1>NCE1A0HDP</inHouseIdentification1> </originIdentification> <locationDetails> <trueLocationId>NCE</trueLocationId> </locationDetails> <originatorTypeCode>T</originatorTypeCode> <originDetails> <codedCountry>US</codedCountry> <codedCurrency>EUR</codedCurrency> <codedLanguage>EN</codedLanguage> </originDetails> <originator>A0001AASU</originator> </originatorOfRequest> <roomStayData> <markerRoomStayData></markerRoomStayData> <globalBookingInfo> <markerGlobalBookingInfo></markerGlobalBookingInfo> <bookingSource> <originIdentification> <originatorId>12345675</originatorId> </originIdentification> </bookingSource> <representativeParties> <occupantList> <passengerReference> <type>BHO</type> <value>2</value> </passengerReference> </occupantList> </representativeParties> </globalBookingInfo> <roomList> <markerRoomstayQuery></markerRoomstayQuery> <roomRateDetails> <marker></marker> <hotelProductReference> <referenceDetails> <type>BC</type> <value>001000A</value> </referenceDetails> </hotelProductReference> <markerOfExtra></markerOfExtra> </roomRateDetails> <guestList> <occupantList> <passengerReference> <type>RMO</type> <value>2</value> </passengerReference> </occupantList> </guestList> </roomList> </roomStayData> </Hotel\_Sell>

## 5.7.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Hotel\_SellReply xmlns="http://xml.amadeus.com/HBKRCR\_24\_2\_1A"> <bookingTypeIndicator> <numberOfRooms> <quantity>1</quantity> <statusCode>NN</statusCode> </numberOfRooms> </bookingTypeIndicator> <roomStayData> <markerRoomStayData></markerRoomStayData> <pnrInfo> <tattooReference> <referenceDetails> <type>S</type> <value>1</value> </referenceDetails> </tattooReference> </pnrInfo> <globalBookingInfo> <hotelPropertyInfo> <hotelReference> <chainCode>BQ</chainCode> <cityCode>LIL</cityCode> <hotelCode>300</hotelCode> </hotelReference> <hotelName>TESTS PDEF ORRESA REVERSE ACCESS</hotelName> </hotelPropertyInfo> <forceSellIndicator> <statusDetails> <indicator>FS</indicator> <action>2</action> </statusDetails> </forceSellIndicator> <individualCompanyId> <companyName>BCD TRAVEL HOTELS</companyName> </individualCompanyId> <bookingInfo> <reservation> <companyId>1A</companyId> <controlNumber>1060223754</controlNumber> <controlType>O</controlType> </reservation> </bookingInfo> <bookingSource> <originIdentification> <originatorId>12345675</originatorId> </originIdentification> </bookingSource> <globalPriceInformation> <globalPrice> <tariffInfo> <currency>EUR</currency> <dailyTotalIndicator>3</dailyTotalIndicator> <totalAmount>200.00</totalAmount> </tariffInfo> </globalPrice> </globalPriceInformation> <representativeParties> <occupantList> <passengerReference> <type>BHO</type> <value>2</value> </passengerReference> </occupantList> <occupantPreferences> <occupantPreferences> <occupantLanguage>EN</occupantLanguage> </occupantPreferences> </occupantPreferences> </representativeParties> <keyValueTree> <attributeDetails> <attributeType>OR</attributeType> <attributeDescription>P</attributeDescription> </attributeDetails> </keyValueTree> </globalBookingInfo> <roomListInfo> <roomStayIndex> <sequenceDetails> <number>1</number> </sequenceDetails> </roomStayIndex> <markLinesAndRateDesc> <freeTextQualification> <textSubjectQualifier>2</textSubjectQualifier> <informationTypeId>DES</informationTypeId> </freeTextQualification> <freeText>Rate plan always on-request tax included</freeText> </markLinesAndRateDesc> <commissionAndMarkup> <commissionInfo> <commissionDetails> <type>UNK</type> </commissionDetails> </commissionInfo> </commissionAndMarkup> <requestableInformation> <requestedDates> <businessSemantic>CHK</businessSemantic> <timeMode>CHK</timeMode> <beginDateTime> <year>2017</year> <month>12</month> <day>2</day> </beginDateTime> <endDateTime> <year>2017</year> <month>12</month> <day>3</day> </endDateTime> </requestedDates> <roomRateDetails> <roomInformation> <roomRateIdentifier> <roomType>A</roomType> <ratePlanCode>ORQ</ratePlanCode> </roomRateIdentifier> <bookingCode>001000A</bookingCode> <guestCountDetails> <numberOfUnit>1</numberOfUnit> <unitQualifier>A</unitQualifier> </guestCountDetails> </roomInformation> <specialInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>BC</informationType> <source>M</source> <encoding>1</encoding> </freeTextDetails> <freeText>001000A</freeText> </specialInfo> <specialInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>RC</informationType> <source>M</source> <encoding>1</encoding> </freeTextDetails> <freeText>ORQ</freeText> </specialInfo> <specialInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>RO</informationType> <source>M</source> <encoding>1</encoding> </freeTextDetails> <freeText>A</freeText> </specialInfo> <bookingRequirement> <guaranteeDepositStatusInfo> <statusDetails> <indicator>GUA</indicator> <action>UN</action> </statusDetails> </guaranteeDepositStatusInfo> <holdTime> <ruleDetails> <type>15</type> <quantity>18</quantity> <quantityUnit>2</quantityUnit> </ruleDetails> </holdTime> <markerOfBookingRequirement></markerOfBookingRequirement> </bookingRequirement> <markerOfExtra></markerOfExtra> <tariffInformation> <tariffInfo> <amount>200.00</amount> <currency>EUR</currency> <dailyTotalIndicator>3</dailyTotalIndicator> <status>1</status> </tariffInfo> </tariffInformation> </roomRateDetails> </requestableInformation> <rateChanges> <rateChangeAmountInformation> <tariffInfo> <amount>200.00</amount> <currency>EUR</currency> <dailyTotalIndicator>DY</dailyTotalIndicator> <status>1</status> </tariffInfo> </rateChangeAmountInformation> <rateChangePeriodInformation> <businessSemantic>HRC</businessSemantic> <beginDateTime> <year>2017</year> <month>12</month> <day>2</day> </beginDateTime> <endDateTime> <year>2017</year> <month>12</month> <day>3</day> </endDateTime> </rateChangePeriodInformation> </rateChanges> </roomListInfo> </roomStayData> </Hotel\_SellReply>

## 5.7.3 Possible Errors

See "Error Messages" section.

* * *

## 5.8 Operation: Send Invoice Supplementary Info

The corporations (agencies) need to send invoice supplementaryInfo to the hotel aggregator which contains information required for billing purposes. This helps aggregator to identify who has made the booking, and thus perform an accurate invoice reconciliation.

Note- This is a free text field.

## 5.8.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Hotel\_Sell xmlns="http://xml.amadeus.com/HBKRCQ\_24\_2\_1A"> <travelAgentRef> <status>APE</status> <reference> <type>OT</type> <value>2</value> </reference> </travelAgentRef> <roomStayData> <markerRoomStayData></markerRoomStayData> <globalBookingInfo> <markerGlobalBookingInfo></markerGlobalBookingInfo> <bookingSource> <originIdentification> <originatorId>57591472</originatorId> </originIdentification> </bookingSource> <invoiceSupplementaryInfo> <indexNumber> <referenceDetails> <type>IND</type> <value>1</value> </referenceDetails> </indexNumber> <fieldDetails> <criteriaDetails> <attributeType>Agency Reference</attributeType> <attributeDescription>ADREXO</attributeDescription> </criteriaDetails> </fieldDetails> </invoiceSupplementaryInfo> <representativeParties> <occupantList> <passengerReference> <type>BHO</type> <value>2</value> </passengerReference> </occupantList> </representativeParties> </globalBookingInfo> <roomList> <markerRoomstayQuery></markerRoomstayQuery> <roomRateDetails> <marker></marker> <hotelProductReference> <referenceDetails> <type>BC</type> <value>1ABLGY7MPH</value> </referenceDetails> </hotelProductReference> <markerOfExtra></markerOfExtra> </roomRateDetails> <guaranteeOrDeposit> <paymentInfo> <paymentDetails> <formOfPaymentCode>9</formOfPaymentCode> <paymentType>2</paymentType> <serviceToPay>3</serviceToPay> </paymentDetails> </paymentInfo> </guaranteeOrDeposit> <guestList> <occupantList> <passengerReference> <type>RMO</type> <value>2</value> </passengerReference> </occupantList> </guestList> </roomList> </roomStayData> </Hotel\_Sell>

## 5.8.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Hotel\_SellReply xmlns="http://xml.amadeus.com/HBKRCR\_24\_2\_1A"> <bookingTypeIndicator> <numberOfRooms> <quantity>1</quantity> <statusCode>HK</statusCode> </numberOfRooms> </bookingTypeIndicator> <roomStayData> <markerRoomStayData></markerRoomStayData> <pnrInfo> <tattooReference> <referenceDetails> <type>S</type> <value>1</value> </referenceDetails> </tattooReference> </pnrInfo> <globalBookingInfo> <hotelPropertyInfo> <hotelReference> <chainCode>RY</chainCode> <cityCode>ZSY</cityCode> <hotelCode>083</hotelCode> </hotelReference> <hotelName>RODEWAY INN NEAR AZ STATE UNIVERSITY</hotelName> </hotelPropertyInfo> <forceSellIndicator> <statusDetails> <indicator>FS</indicator> <action>2</action> </statusDetails> </forceSellIndicator> <individualCompanyId> <companyName>COUNTRY INN SUITES</companyName> </individualCompanyId> <bookingInfo> <reservation> <companyId>RY</companyId> <controlNumber>83059128</controlNumber> <controlType>2</controlType> </reservation> </bookingInfo> <bookingSource> <originIdentification> <originatorId>57591472</originatorId> </originIdentification> </bookingSource> <globalPriceInformation> <globalPrice> <tariffInfo> <amount>89.10</amount> <currency>USD</currency> <dailyTotalIndicator>3</dailyTotalIndicator> <totalAmount>108.81</totalAmount> </tariffInfo> </globalPrice> </globalPriceInformation> <representativeParties> <occupantList> <passengerReference> <type>BHO</type> <value>2</value> </passengerReference> </occupantList> <occupantPreferences> <occupantPreferences> <occupantLanguage>FR</occupantLanguage> </occupantPreferences> </occupantPreferences> </representativeParties> </globalBookingInfo> <roomListInfo> <roomStayIndex> <sequenceDetails> <number>1</number> </sequenceDetails> </roomStayIndex> <commissionAndMarkup> <commissionInfo> <commissionDetails> <type>UNK</type> <rate>10</rate> </commissionDetails> </commissionInfo> </commissionAndMarkup> <cancellationPolicies> <cancellationDateTime> <businessSemantic>CAN</businessSemantic> <timeMode>LT</timeMode> </cancellationDateTime> </cancellationPolicies> <cancellationPolicies> <cancellationDateTime> <businessSemantic>CAN</businessSemantic> <timeMode>LT</timeMode> <dateTime> <year>2019</year> <month>12</month> <day>23</day> <hour>16</hour> <minutes>0</minutes> </dateTime> </cancellationDateTime> <cancellationNights> <quantityDetails> <qualifier>CAN</qualifier> <value>1</value> <unit>N</unit> </quantityDetails> </cancellationNights> </cancellationPolicies> <requestableInformation> <requestedDates> <businessSemantic>CHK</businessSemantic> <timeMode>CHK</timeMode> <beginDateTime> <year>2019</year> <month>12</month> <day>25</day> </beginDateTime> <endDateTime> <year>2019</year> <month>12</month> <day>26</day> </endDateTime> </requestedDates> <roomRateDetails> <roomInformation> <roomRateIdentifier> <roomType>A1D</roomType> <ratePlanCode>GOV</ratePlanCode> <rateCategoryCode>GOV</rateCategoryCode> <rateQualifiedIndic>C</rateQualifiedIndic> <rateQualifiedIndic>A</rateQualifiedIndic> </roomRateIdentifier> <bookingCode>UM89ZI7</bookingCode> <guestCountDetails> <numberOfUnit>1</numberOfUnit> <unitQualifier>A</unitQualifier> </guestCountDetails> </roomInformation> <specialInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>BC</informationType> <source>M</source> <encoding>1</encoding> </freeTextDetails> <freeText>UM89ZI7</freeText> </specialInfo> <specialInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>RC</informationType> <source>M</source> <encoding>1</encoding> </freeTextDetails> <freeText>GOV</freeText> </specialInfo> <specialInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>RO</informationType> <source>M</source> <encoding>1</encoding> </freeTextDetails> <freeText>A1D</freeText> </specialInfo> <bookingRequirement> <guaranteeDepositStatusInfo> <statusDetails> <indicator>PP</indicator> <action>1</action> </statusDetails> </guaranteeDepositStatusInfo> <paymentInformation> <paymentDetails> <formOfPaymentCode>1</formOfPaymentCode> <paymentType>4</paymentType> <serviceToPay>3</serviceToPay> </paymentDetails> </paymentInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>VI</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>BA</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>CB</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>AM</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>DS</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>IK</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>MC</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>EC</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>CA</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>BC</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>JC</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>AX</vendorCode> </formOfPayment> </creditCardInformation> <markerOfBookingRequirement></markerOfBookingRequirement> </bookingRequirement> <markerOfExtra></markerOfExtra> <tariffInformation> <tariffInfo> <amount>108.81</amount> <currency>USD</currency> <dailyTotalIndicator>3</dailyTotalIndicator> <status>1</status> </tariffInfo> </tariffInformation> </roomRateDetails> <guaranteeOrDeposit> <paymentInfo> <paymentDetails> <formOfPaymentCode>1</formOfPaymentCode> <paymentType>4</paymentType> <serviceToPay>3</serviceToPay> </paymentDetails> </paymentInfo> <groupCreditCardInfo> <creditCardInfo> <ccInfo> <vendorCode>VI</vendorCode> <cardNumber>4988438843884305</cardNumber> <expiryDate>1020</expiryDate> </ccInfo> </creditCardInfo> <concealedCreditCardInfo> <ccInfo> <cardNumber>498843XXXXXX4305</cardNumber> </ccInfo> </concealedCreditCardInfo> <fortknoxIds> <referenceDetails> <type>NOX</type> <value>104506825609364</value> </referenceDetails> </fortknoxIds> </groupCreditCardInfo> </guaranteeOrDeposit> <guestList> <occupantList> <passengerReference> <type>ROP</type> <value>2</value> </passengerReference> </occupantList> </guestList> </requestableInformation> <rateChanges> <rateChangeAmountInformation> <tariffInfo> <amount>89.10</amount> <currency>USD</currency> <dailyTotalIndicator>DY</dailyTotalIndicator> </tariffInfo> </rateChangeAmountInformation> <rateChangePeriodInformation> <businessSemantic>HRC</businessSemantic> <beginDateTime> <year>2019</year> <month>12</month> <day>25</day> </beginDateTime> <endDateTime> <year>2019</year> <month>12</month> <day>26</day> </endDateTime> </rateChangePeriodInformation> </rateChanges> </roomListInfo> </roomStayData> </Hotel\_SellReply>

## 5.8.3 Possible Errors

See "Error Messages" section.

* * *

## 5.9 Operation: Single Room : 1 Adult

Example 1 :

Room 1  -> 1 Adult

## 5.9.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Hotel\_Sell xmlns="http://xml.amadeus.com/HBKRCQ\_24\_2\_1A"> <travelAgentRef> <status>APE</status> <reference> <type>OT</type> <value>2</value> </reference> </travelAgentRef> <roomStayData> <markerRoomStayData></markerRoomStayData> <globalBookingInfo> <markerGlobalBookingInfo></markerGlobalBookingInfo> <bookingSource> <originIdentification> <originatorId>57591472</originatorId> </originIdentification> </bookingSource> <representativeParties> <occupantList> <passengerReference> <type>BHO</type> <value>2</value> </passengerReference> </occupantList> </representativeParties> </globalBookingInfo> <roomList> <markerRoomstayQuery></markerRoomstayQuery> <roomRateDetails> <marker></marker> <hotelProductReference> <referenceDetails> <type>BC</type> <value>UM89ZI7</value> </referenceDetails> </hotelProductReference> <markerOfExtra></markerOfExtra> </roomRateDetails> <guaranteeOrDeposit> <paymentInfo> <paymentDetails> <formOfPaymentCode>1</formOfPaymentCode> <paymentType>4</paymentType> <serviceToPay>3</serviceToPay> </paymentDetails> </paymentInfo> <groupCreditCardInfo> <creditCardInfo> <ccInfo> <vendorCode>VI</vendorCode> <cardNumber>4988438843884305</cardNumber> <securityId>737</securityId> <expiryDate>1020</expiryDate> <ccHolderName>Test Test</ccHolderName> <surname>Test</surname> <firstName>TrustA</firstName> </ccInfo> </creditCardInfo> <cardHolderAddress> <addressDetails> <format>5</format> <line1>485 Route du Pin Montard</line1> <line2>486 Route du Pin Montard</line2> </addressDetails> <city>Sophia Antipolis Cedex</city> <zipCode>06902</zipCode> <countryCode>FRANCE</countryCode> <regionDetails> <name>PACA</name> </regionDetails> <locationDetails> <name>Alpes Maritimes</name> </locationDetails> </cardHolderAddress> </groupCreditCardInfo> <groupTdsInformation> <authenticationdata> <authenticationdatadetails> <authenticationindicator>02</authenticationindicator> <transstatus>Y</transstatus> </authenticationdatadetails> <tdsversion>2.1.0</tdsversion> </authenticationdata> <tdsblobdata> <tdsblbidentifier> <referencedetails> <value>CAVV</value> </referencedetails> </tdsblbidentifier> <tdsblbdata> <datalength>20</datalength> <datatype>B</datatype> <binarydata>TzZuZ2w0WDVTcVNvb1do</binarydata> </tdsblbdata> </tdsblobdata> <tdsblobdata> <tdsblbidentifier> <referencedetails> <value>DS\_TRANSACTIONID</value> </referencedetails> </tdsblbidentifier> <tdsblbdata> <datalength>20</datalength> <datatype>B</datatype> <binarydata>TzwuZ2w0WDVTcVNvb1do</binarydata> </tdsblbdata> </tdsblobdata> </groupTdsInformation> </guaranteeOrDeposit> <guestList> <occupantList> <passengerReference> <type>RMO</type> <value>2</value> </passengerReference> </occupantList> </guestList> </roomList> </roomStayData> </Hotel\_Sell>

## 5.9.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Hotel\_SellReply xmlns="http://xml.amadeus.com/HBKRCR\_24\_2\_1A"> <bookingTypeIndicator> <numberOfRooms> <quantity>1</quantity> <statusCode>HK</statusCode> </numberOfRooms> </bookingTypeIndicator> <roomStayData> <markerRoomStayData></markerRoomStayData> <pnrInfo> <tattooReference> <referenceDetails> <type>S</type> <value>1</value> </referenceDetails> </tattooReference> </pnrInfo> <globalBookingInfo> <hotelPropertyInfo> <hotelReference> <chainCode>RY</chainCode> <cityCode>ZSY</cityCode> <hotelCode>083</hotelCode> </hotelReference> <hotelName>RODEWAY INN NEAR AZ STATE UNIVERSITY</hotelName> </hotelPropertyInfo> <forceSellIndicator> <statusDetails> <indicator>FS</indicator> <action>2</action> </statusDetails> </forceSellIndicator> <individualCompanyId> <companyName>COUNTRY INN SUITES</companyName> </individualCompanyId> <bookingInfo> <reservation> <companyId>RY</companyId> <controlNumber>83059128</controlNumber> <controlType>2</controlType> </reservation> </bookingInfo> <bookingSource> <originIdentification> <originatorId>57591472</originatorId> </originIdentification> </bookingSource> <globalPriceInformation> <globalPrice> <tariffInfo> <amount>89.10</amount> <currency>USD</currency> <dailyTotalIndicator>3</dailyTotalIndicator> <totalAmount>108.81</totalAmount> </tariffInfo> </globalPrice> </globalPriceInformation> <representativeParties> <occupantList> <passengerReference> <type>BHO</type> <value>2</value> </passengerReference> </occupantList> <occupantPreferences> <occupantPreferences> <occupantLanguage>FR</occupantLanguage> </occupantPreferences> </occupantPreferences> </representativeParties> </globalBookingInfo> <roomListInfo> <roomStayIndex> <sequenceDetails> <number>1</number> </sequenceDetails> </roomStayIndex> <commissionAndMarkup> <commissionInfo> <commissionDetails> <type>UNK</type> <rate>10</rate> </commissionDetails> </commissionInfo> </commissionAndMarkup> <cancellationPolicies> <cancellationDateTime> <businessSemantic>CAN</businessSemantic> <timeMode>LT</timeMode> </cancellationDateTime> </cancellationPolicies> <cancellationPolicies> <cancellationDateTime> <businessSemantic>CAN</businessSemantic> <timeMode>LT</timeMode> <dateTime> <year>2019</year> <month>12</month> <day>23</day> <hour>16</hour> <minutes>0</minutes> </dateTime> </cancellationDateTime> <cancellationNights> <quantityDetails> <qualifier>CAN</qualifier> <value>1</value> <unit>N</unit> </quantityDetails> </cancellationNights> </cancellationPolicies> <requestableInformation> <requestedDates> <businessSemantic>CHK</businessSemantic> <timeMode>CHK</timeMode> <beginDateTime> <year>2019</year> <month>12</month> <day>25</day> </beginDateTime> <endDateTime> <year>2019</year> <month>12</month> <day>26</day> </endDateTime> </requestedDates> <roomRateDetails> <roomInformation> <roomRateIdentifier> <roomType>A1D</roomType> <ratePlanCode>GOV</ratePlanCode> <rateCategoryCode>GOV</rateCategoryCode> <rateQualifiedIndic>C</rateQualifiedIndic> <rateQualifiedIndic>A</rateQualifiedIndic> </roomRateIdentifier> <bookingCode>UM89ZI7</bookingCode> <guestCountDetails> <numberOfUnit>1</numberOfUnit> <unitQualifier>A</unitQualifier> </guestCountDetails> </roomInformation> <specialInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>BC</informationType> <source>M</source> <encoding>1</encoding> </freeTextDetails> <freeText>UM89ZI7</freeText> </specialInfo> <specialInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>RC</informationType> <source>M</source> <encoding>1</encoding> </freeTextDetails> <freeText>GOV</freeText> </specialInfo> <specialInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>RO</informationType> <source>M</source> <encoding>1</encoding> </freeTextDetails> <freeText>A1D</freeText> </specialInfo> <bookingRequirement> <guaranteeDepositStatusInfo> <statusDetails> <indicator>PP</indicator> <action>1</action> </statusDetails> </guaranteeDepositStatusInfo> <paymentInformation> <paymentDetails> <formOfPaymentCode>1</formOfPaymentCode> <paymentType>4</paymentType> <serviceToPay>3</serviceToPay> </paymentDetails> </paymentInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>VI</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>BA</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>CB</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>AM</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>DS</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>IK</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>MC</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>EC</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>CA</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>BC</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>JC</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>AX</vendorCode> </formOfPayment> </creditCardInformation> <markerOfBookingRequirement></markerOfBookingRequirement> </bookingRequirement> <markerOfExtra></markerOfExtra> <tariffInformation> <tariffInfo> <amount>108.81</amount> <currency>USD</currency> <dailyTotalIndicator>3</dailyTotalIndicator> <status>1</status> </tariffInfo> </tariffInformation> </roomRateDetails> <guaranteeOrDeposit> <paymentInfo> <paymentDetails> <formOfPaymentCode>1</formOfPaymentCode> <paymentType>4</paymentType> <serviceToPay>3</serviceToPay> </paymentDetails> </paymentInfo> <groupCreditCardInfo> <creditCardInfo> <ccInfo> <vendorCode>VI</vendorCode> <cardNumber>4988438843884305</cardNumber> <expiryDate>1020</expiryDate> </ccInfo> </creditCardInfo> <concealedCreditCardInfo> <ccInfo> <cardNumber>498843XXXXXX4305</cardNumber> </ccInfo> </concealedCreditCardInfo> <fortknoxIds> <referenceDetails> <type>NOX</type> <value>104506825609364</value> </referenceDetails> </fortknoxIds> </groupCreditCardInfo> </guaranteeOrDeposit> <guestList> <occupantList> <passengerReference> <type>ROP</type> <value>2</value> </passengerReference> </occupantList> </guestList> </requestableInformation> <rateChanges> <rateChangeAmountInformation> <tariffInfo> <amount>89.10</amount> <currency>USD</currency> <dailyTotalIndicator>DY</dailyTotalIndicator> </tariffInfo> </rateChangeAmountInformation> <rateChangePeriodInformation> <businessSemantic>HRC</businessSemantic> <beginDateTime> <year>2019</year> <month>12</month> <day>25</day> </beginDateTime> <endDateTime> <year>2019</year> <month>12</month> <day>26</day> </endDateTime> </rateChangePeriodInformation> </rateChanges> </roomListInfo> </roomStayData> </Hotel\_SellReply>

## 5.9.3 Possible Errors

See "Error Messages" section.

* * *

## 5.10 Operation: Single Room : 2 Adults

Example :

Room 1  -> 2 Adults

## 5.10.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Hotel\_Sell xmlns="http://xml.amadeus.com/HBKRCQ\_24\_2\_1A"> <travelAgentRef> <status>APE</status> <reference> <type>OT</type> <value>2</value> </reference> </travelAgentRef> <roomStayData> <markerRoomStayData></markerRoomStayData> <globalBookingInfo> <markerGlobalBookingInfo></markerGlobalBookingInfo> <bookingSource> <originIdentification> <originatorId>57591472</originatorId> </originIdentification> </bookingSource> <representativeParties> <occupantList> <passengerReference> <type>BHO</type> <value>2</value> </passengerReference> </occupantList> </representativeParties> <representativeParties> <occupantList> <passengerReference> <type>BOP</type> <value>3</value> </passengerReference> </occupantList> </representativeParties> </globalBookingInfo> <roomList> <markerRoomstayQuery></markerRoomstayQuery> <roomRateDetails> <marker></marker> <hotelProductReference> <referenceDetails> <type>BC</type> <value>UM89ZI7</value> </referenceDetails> </hotelProductReference> <markerOfExtra></markerOfExtra> </roomRateDetails> <guaranteeOrDeposit> <paymentInfo> <paymentDetails> <formOfPaymentCode>1</formOfPaymentCode> <paymentType>4</paymentType> <serviceToPay>3</serviceToPay> </paymentDetails> </paymentInfo> <groupCreditCardInfo> <creditCardInfo> <ccInfo> <vendorCode>VI</vendorCode> <cardNumber>4988438843884305</cardNumber> <securityId>737</securityId> <expiryDate>1020</expiryDate> <ccHolderName>Test Test</ccHolderName> <surname>Test</surname> <firstName>TrustA</firstName> </ccInfo> </creditCardInfo> <cardHolderAddress> <addressDetails> <format>5</format> <line1>485 Route du Pin Montard</line1> <line2>486 Route du Pin Montard</line2> </addressDetails> <city>Sophia Antipolis Cedex</city> <zipCode>06902</zipCode> <countryCode>FRANCE</countryCode> <regionDetails> <name>PACA</name> </regionDetails> <locationDetails> <name>Alpes Maritimes</name> </locationDetails> </cardHolderAddress> </groupCreditCardInfo> <groupTdsInformation> <authenticationdata> <authenticationdatadetails> <authenticationindicator>02</authenticationindicator> <transstatus>Y</transstatus> </authenticationdatadetails> <tdsversion>2.1.0</tdsversion> </authenticationdata> <tdsblobdata> <tdsblbidentifier> <referencedetails> <value>CAVV</value> </referencedetails> </tdsblbidentifier> <tdsblbdata> <datalength>20</datalength> <datatype>B</datatype> <binarydata>TzZuZ2w0WDVTcVNvb1do</binarydata> </tdsblbdata> </tdsblobdata> <tdsblobdata> <tdsblbidentifier> <referencedetails> <value>DS\_TRANSACTIONID</value> </referencedetails> </tdsblbidentifier> <tdsblbdata> <datalength>20</datalength> <datatype>B</datatype> <binarydata>TzwuZ2w0WDVTcVNvb1do</binarydata> </tdsblbdata> </tdsblobdata> </groupTdsInformation> </guaranteeOrDeposit> <guestList> <occupantList> <passengerReference> <type>RMO</type> <value>2</value> </passengerReference> </occupantList> </guestList> <guestList> <occupantList> <passengerReference> <type>ROP</type> <value>3</value> </passengerReference> </occupantList> </guestList> </roomList> </roomStayData> </Hotel\_Sell>

## 5.10.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Hotel\_SellReply xmlns="http://xml.amadeus.com/HBKRCR\_24\_1\_1A"> <bookingTypeIndicator> <numberOfRooms> <quantity>1</quantity> <statusCode>HK</statusCode> </numberOfRooms> </bookingTypeIndicator> <roomStayData> <markerRoomStayData></markerRoomStayData> <pnrInfo> <tattooReference> <referenceDetails> <type>S</type> <value>1</value> </referenceDetails> </tattooReference> </pnrInfo> <globalBookingInfo> <hotelPropertyInfo> <hotelReference> <chainCode>RY</chainCode> <cityCode>ZSY</cityCode> <hotelCode>083</hotelCode> </hotelReference> <hotelName>RODEWAY INN NEAR AZ STATE UNIVERSITY</hotelName> </hotelPropertyInfo> <forceSellIndicator> <statusDetails> <indicator>FS</indicator> <action>2</action> </statusDetails> </forceSellIndicator> <individualCompanyId> <companyName>COUNTRY INN SUITES</companyName> </individualCompanyId> <bookingInfo> <reservation> <companyId>RY</companyId> <controlNumber>83059375</controlNumber> <controlType>2</controlType> </reservation> </bookingInfo> <bookingSource> <originIdentification> <originatorId>57591472</originatorId> </originIdentification> </bookingSource> <globalPriceInformation> <globalPrice> <tariffInfo> <amount>89.10</amount> <currency>USD</currency> <dailyTotalIndicator>3</dailyTotalIndicator> <totalAmount>108.81</totalAmount> </tariffInfo> </globalPrice> </globalPriceInformation> <representativeParties> <occupantList> <passengerReference> <type>BHO</type> <value>2</value> </passengerReference> </occupantList> <occupantPreferences> <occupantPreferences> <occupantLanguage>FR</occupantLanguage> </occupantPreferences> </occupantPreferences> </representativeParties> <representativeParties> <occupantList> <passengerReference> <type>BOP</type> <value>3</value> </passengerReference> </occupantList> <occupantPreferences> <occupantPreferences> <occupantLanguage>FR</occupantLanguage> </occupantPreferences> </occupantPreferences> </representativeParties> </globalBookingInfo> <roomListInfo> <roomStayIndex> <sequenceDetails> <number>1</number> </sequenceDetails> </roomStayIndex> <commissionAndMarkup> <commissionInfo> <commissionDetails> <type>UNK</type> <rate>10</rate> </commissionDetails> </commissionInfo> </commissionAndMarkup> <cancellationPolicies> <cancellationDateTime> <businessSemantic>CAN</businessSemantic> <timeMode>LT</timeMode> </cancellationDateTime> </cancellationPolicies> <cancellationPolicies> <cancellationDateTime> <businessSemantic>CAN</businessSemantic> <timeMode>LT</timeMode> <dateTime> <year>2019</year> <month>12</month> <day>24</day> <hour>16</hour> <minutes>0</minutes> </dateTime> </cancellationDateTime> <cancellationNights> <quantityDetails> <qualifier>CAN</qualifier> <value>1</value> <unit>N</unit> </quantityDetails> </cancellationNights> </cancellationPolicies> <requestableInformation> <requestedDates> <businessSemantic>CHK</businessSemantic> <timeMode>CHK</timeMode> <beginDateTime> <year>2019</year> <month>12</month> <day>26</day> </beginDateTime> <endDateTime> <year>2019</year> <month>12</month> <day>27</day> </endDateTime> </requestedDates> <roomRateDetails> <roomInformation> <roomRateIdentifier> <roomType>A1D</roomType> <ratePlanCode>GOV</ratePlanCode> <rateCategoryCode>GOV</rateCategoryCode> <rateQualifiedIndic>C</rateQualifiedIndic> <rateQualifiedIndic>A</rateQualifiedIndic> </roomRateIdentifier> <bookingCode>UM89ZI7</bookingCode> <guestCountDetails> <numberOfUnit>2</numberOfUnit> <unitQualifier>A</unitQualifier> </guestCountDetails> </roomInformation> <specialInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>BC</informationType> <source>M</source> <encoding>1</encoding> </freeTextDetails> <freeText>UM89ZI7</freeText> </specialInfo> <specialInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>RC</informationType> <source>M</source> <encoding>1</encoding> </freeTextDetails> <freeText>GOV</freeText> </specialInfo> <specialInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>RO</informationType> <source>M</source> <encoding>1</encoding> </freeTextDetails> <freeText>A1D</freeText> </specialInfo> <bookingRequirement> <guaranteeDepositStatusInfo> <statusDetails> <indicator>PP</indicator> <action>1</action> </statusDetails> </guaranteeDepositStatusInfo> <paymentInformation> <paymentDetails> <formOfPaymentCode>1</formOfPaymentCode> <paymentType>4</paymentType> <serviceToPay>3</serviceToPay> </paymentDetails> </paymentInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>VI</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>BA</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>CB</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>AM</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>DS</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>IK</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>MC</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>EC</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>CA</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>BC</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>JC</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>AX</vendorCode> </formOfPayment> </creditCardInformation> <markerOfBookingRequirement></markerOfBookingRequirement> </bookingRequirement> <markerOfExtra></markerOfExtra> <tariffInformation> <tariffInfo> <amount>108.81</amount> <currency>USD</currency> <dailyTotalIndicator>3</dailyTotalIndicator> <status>1</status> </tariffInfo> </tariffInformation> </roomRateDetails> <guaranteeOrDeposit> <paymentInfo> <paymentDetails> <formOfPaymentCode>1</formOfPaymentCode> <paymentType>4</paymentType> <serviceToPay>3</serviceToPay> </paymentDetails> </paymentInfo> <groupCreditCardInfo> <creditCardInfo> <ccInfo> <vendorCode>VI</vendorCode> <cardNumber>4988438843884305</cardNumber> <expiryDate>1020</expiryDate> </ccInfo> </creditCardInfo> <concealedCreditCardInfo> <ccInfo> <cardNumber>498843XXXXXX4305</cardNumber> </ccInfo> </concealedCreditCardInfo> <fortknoxIds> <referenceDetails> <type>NOX</type> <value>104506825609364</value> </referenceDetails> </fortknoxIds> </groupCreditCardInfo> </guaranteeOrDeposit> <guestList> <occupantList> <passengerReference> <type>ROP</type> <value>2</value> </passengerReference> </occupantList> </guestList> <guestList> <occupantList> <passengerReference> <type>ROP</type> <value>3</value> </passengerReference> </occupantList> </guestList> </requestableInformation> <rateChanges> <rateChangeAmountInformation> <tariffInfo> <amount>89.10</amount> <currency>USD</currency> <dailyTotalIndicator>DY</dailyTotalIndicator> </tariffInfo> </rateChangeAmountInformation> <rateChangePeriodInformation> <businessSemantic>HRC</businessSemantic> <beginDateTime> <year>2019</year> <month>12</month> <day>26</day> </beginDateTime> <endDateTime> <year>2019</year> <month>12</month> <day>27</day> </endDateTime> </rateChangePeriodInformation> </rateChanges> </roomListInfo> </roomStayData> </Hotel\_SellReply>

## 5.10.3 Possible Errors

See "Error Messages" section.

* * *

## 5.11 Operation: Travel Agent Identification as form of payment

Travel agent identification allows payment to be made via the IATA number provided as the mandatory element in the input

## 5.11.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<soapenv:Envelope> <soapenv:Body> <hbk:Hotel\_Sell TransactionIdentifier="WBS\_e2e"> <travelAgentRef> <status>APE</status> <reference> <type>OT</type> <value>2</value> </reference> </travelAgentRef> <roomStayData> <markerRoomStayData></markerRoomStayData> <globalBookingInfo> <markerGlobalBookingInfo></markerGlobalBookingInfo> <bookingSource> <originIdentification> <originatorId>57311272</originatorId> </originIdentification> </bookingSource> <representativeParties> <occupantList> <passengerReference> <type>BHO</type> <value>2</value> </passengerReference> </occupantList> </representativeParties> </globalBookingInfo> <roomList> <markerRoomstayQuery></markerRoomstayQuery> <roomRateDetails> <marker></marker> <hotelProductReference> <referenceDetails> <type>BC</type> <value>000000B</value> </referenceDetails> </hotelProductReference> <markerOfExtra></markerOfExtra> </roomRateDetails> <guaranteeOrDeposit> <paymentInfo> <paymentDetails> <formOfPaymentCode>10</formOfPaymentCode> <paymentType>1</paymentType> <serviceToPay>3</serviceToPay> <referenceNumber>21230464</referenceNumber> </paymentDetails> </paymentInfo> </guaranteeOrDeposit> <guestList> <occupantList> <passengerReference> <type>RMO</type> <value>2</value> </passengerReference> </occupantList> </guestList> </roomList> </roomStayData> </hbk:Hotel\_Sell> </soapenv:Body> </soapenv:Envelope>

## 5.11.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<soapenv:Envelope> <soapenv:Body> <Hotel\_SellReply xmlns="http://xml.amadeus.com/HBKRCR\_24\_2\_1A"> <bookingTypeIndicator> <numberOfRooms> <quantity>1</quantity> <statusCode>HK</statusCode> </numberOfRooms> </bookingTypeIndicator> <roomStayData> <markerRoomStayData></markerRoomStayData> <pnrInfo> <tattooReference> <referenceDetails> <type>S</type> <value>1</value> </referenceDetails> </tattooReference> </pnrInfo> <globalBookingInfo> <hotelPropertyInfo> <hotelReference> <chainCode>AB</chainCode> <cityCode>NCE</cityCode> <hotelCode>123</hotelCode> </hotelReference> <hotelName>Hotel Name</hotelName> </hotelPropertyInfo> <forceSellIndicator> <statusDetails> <indicator>FS</indicator> <action>2</action> </statusDetails> </forceSellIndicator> <individualCompanyId> <companyName>AB Test</companyName> </individualCompanyId> <bookingInfo> <reservation> <companyId>AB</companyId> <controlNumber>82513134</controlNumber> <controlType>2</controlType> </reservation> </bookingInfo> <bookingSource> <originIdentification> <originatorId>57311272</originatorId> </originIdentification> </bookingSource> <globalPriceInformation> <globalPrice> <tariffInfo> <currency>EUR</currency> <dailyTotalIndicator>3</dailyTotalIndicator> <totalAmount>110.00</totalAmount> </tariffInfo> <chargeDetails> <type>AB</type> <amount>100.00</amount> <description>totalAmount</description> <currency>EUR</currency> </chargeDetails> <chargeDetails> <type>MU</type> <amount>10.00</amount> <description>totalAmount</description> <currency>EUR</currency> </chargeDetails> </globalPrice> </globalPriceInformation> <representativeParties> <occupantList> <passengerReference> <type>BHO</type> <value>2</value> </passengerReference> </occupantList> <occupantPreferences> <occupantPreferences> <occupantLanguage>FR</occupantLanguage> </occupantPreferences> </occupantPreferences> </representativeParties> </globalBookingInfo> <roomListInfo> <roomStayIndex> <sequenceDetails> <number>1</number> </sequenceDetails> </roomStayIndex> <markLinesAndRateDesc> <freeTextQualification> <textSubjectQualifier>2</textSubjectQualifier> <informationTypeId>DES</informationTypeId> </freeTextQualification> <freeText>This is pool view room</freeText> </markLinesAndRateDesc> <requestableInformation> <requestedDates> <businessSemantic>CHK</businessSemantic> <timeMode>CHK</timeMode> <beginDateTime> <year>2022</year> <month>11</month> <day>13</day> </beginDateTime> <endDateTime> <year>2022</year> <month>11</month> <day>14</day> </endDateTime> </requestedDates> <roomRateDetails> <roomInformation> <roomRateIdentifier> <roomType>A\*\*</roomType> <ratePlanCode>RAB</ratePlanCode> </roomRateIdentifier> <bookingCode>000000A</bookingCode> <guestCountDetails> <numberOfUnit>1</numberOfUnit> <unitQualifier>A</unitQualifier> </guestCountDetails> </roomInformation> <specialInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>BC</informationType> <source>M</source> <encoding>1</encoding> </freeTextDetails> <freeText>000000A</freeText> </specialInfo> <specialInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>RC</informationType> <source>M</source> <encoding>1</encoding> </freeTextDetails> <freeText>RAB</freeText> </specialInfo> <specialInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>RO</informationType> <source>M</source> <encoding>1</encoding> </freeTextDetails> <freeText>A\*\*</freeText> </specialInfo> <bookingRequirement> <guaranteeDepositStatusInfo> <statusDetails> <indicator>GUA</indicator> <action>1</action> </statusDetails> </guaranteeDepositStatusInfo> <guaranteeDepositRule> <tariffInfo> <amount>100.00</amount> <currency>EUR</currency> </tariffInfo> </guaranteeDepositRule> <paymentInformation> <paymentDetails> <formOfPaymentCode>1</formOfPaymentCode> <paymentType>1</paymentType> <serviceToPay>3</serviceToPay> </paymentDetails> </paymentInformation> <paymentInformation> <paymentDetails> <formOfPaymentCode>10</formOfPaymentCode> <paymentType>1</paymentType> <serviceToPay>3</serviceToPay> </paymentDetails> </paymentInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>VI</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>VI</vendorCode> </formOfPayment> </creditCardInformation> <markerOfBookingRequirement></markerOfBookingRequirement> </bookingRequirement> <bookingRequirement> <guaranteeDepositStatusInfo> <statusDetails> <indicator>DP</indicator> <action>UN</action> </statusDetails> </guaranteeDepositStatusInfo> <paymentInformation> <paymentDetails> <formOfPaymentCode>1</formOfPaymentCode> <paymentType>2</paymentType> <serviceToPay>3</serviceToPay> </paymentDetails> </paymentInformation> <markerOfBookingRequirement></markerOfBookingRequirement> </bookingRequirement> <markerOfExtra></markerOfExtra> <tariffInformation> <tariffInfo> <amount>110.00</amount> <currency>EUR</currency> <dailyTotalIndicator>3</dailyTotalIndicator> <status>1</status> </tariffInfo> <associatedCharges> <chargeCode>AB</chargeCode> <chargeAmount>100.00</chargeAmount> <description>amount</description> <chargeCurrency>EUR</chargeCurrency> </associatedCharges> <associatedCharges> <chargeCode>MU</chargeCode> <chargeAmount>10.00</chargeAmount> <description>amount</description> <chargeCurrency>EUR</chargeCurrency> </associatedCharges> </tariffInformation> </roomRateDetails> <guaranteeOrDeposit> <paymentInfo> <paymentDetails> <formOfPaymentCode>10</formOfPaymentCode> <paymentType>1</paymentType> <serviceToPay>3</serviceToPay> <referenceNumber>21230464</referenceNumber> </paymentDetails> </paymentInfo> </guaranteeOrDeposit> <guestList> <occupantList> <passengerReference> <type>RMO</type> <value>2</value> </passengerReference> </occupantList> </guestList> </requestableInformation> <rateChanges> <rateChangeAmountInformation> <tariffInfo> <amount>110.00</amount> <currency>EUR</currency> <dailyTotalIndicator>DY</dailyTotalIndicator> <status>1</status> </tariffInfo> <associatedCharges> <chargeCode>AB</chargeCode> <chargeAmount>100.00</chargeAmount> <description>amount</description> <chargeCurrency>EUR</chargeCurrency> </associatedCharges> <associatedCharges> <chargeCode>MU</chargeCode> <chargeAmount>10.00</chargeAmount> <description>amount</description> <chargeCurrency>EUR</chargeCurrency> </associatedCharges> </rateChangeAmountInformation> <rateChangePeriodInformation> <businessSemantic>HRC</businessSemantic> <beginDateTime> <year>2022</year> <month>11</month> <day>13</day> </beginDateTime> <endDateTime> <year>2022</year> <month>11</month> <day>14</day> </endDateTime> </rateChangePeriodInformation> </rateChanges> </roomListInfo> </roomStayData> </Hotel\_SellReply> </soapenv:Body> </soapenv:Envelope>

## 5.11.3 Possible Errors

See "Error Messages" section.

* * *

## 5.12 Operation: Virtual Credit Card as form of Payment

Thi form of payment allows customers to make payment via Virtual credit card. 

Note: The values of formOfPaymentCode need to be send as 43 to denote Virtual credit card.

## 5.12.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<soapenv:Envelope> <soapenv:Header> <wbs:Session> <wbs:SessionId>00RVD4J8Q7</wbs:SessionId> <wbs:SequenceNumber>3</wbs:SequenceNumber> <wbs:SecurityToken>25ZQDOFF2V1EQ3G5QI80PPHF0G</wbs:SecurityToken> </wbs:Session> </soapenv:Header> <soapenv:Body> <hbk:Hotel\_Sell> <travelAgentRef> <status>APE</status> <reference> <type>OT</type> <value>2</value> </reference> </travelAgentRef> <roomStayData> <markerRoomStayData></markerRoomStayData> <globalBookingInfo> <markerGlobalBookingInfo></markerGlobalBookingInfo> <bookingSource> <originIdentification> <originatorId>57591472</originatorId> </originIdentification> </bookingSource> <representativeParties> <occupantList> <passengerReference> <type>BHO</type> <value>2</value> </passengerReference> </occupantList> </representativeParties> </globalBookingInfo> <roomList> <markerRoomstayQuery></markerRoomstayQuery> <roomRateDetails> <marker></marker> <hotelProductReference> <referenceDetails> <type>BC</type> <value>BWKADHV3AP</value> </referenceDetails> </hotelProductReference> <markerOfExtra></markerOfExtra> </roomRateDetails> <guaranteeOrDeposit> <paymentInfo> <paymentDetails> <formOfPaymentCode>43</formOfPaymentCode> <paymentType>2</paymentType> <serviceToPay>3</serviceToPay> </paymentDetails> </paymentInfo> <groupCreditCardInfo> <creditCardInfo> <ccInfo> <vendorCode>VI</vendorCode> <cardNumber>4988438843884305</cardNumber> <securityId>737</securityId> <expiryDate>1023</expiryDate> <ccHolderName>Test Test</ccHolderName> <surname>Test</surname> <firstName>TrustA</firstName> </ccInfo> </creditCardInfo> <cardHolderAddress> <addressDetails> <format>5</format> <line1>485 Route du Pin Montard</line1> <line2>486 Route du Pin Montard</line2> </addressDetails> <city>Sophia Antipolis Cedex</city> <zipCode>06902</zipCode> <countryCode>FR</countryCode> <regionDetails> <name>PACA</name> </regionDetails> <locationDetails> <name>Alpes Maritimes</name> </locationDetails> </cardHolderAddress> </groupCreditCardInfo> </guaranteeOrDeposit> <guestList> <occupantList> <passengerReference> <type>RMO</type> <value>2</value> </passengerReference> </occupantList> </guestList> </roomList> </roomStayData> </hbk:Hotel\_Sell> </soapenv:Body> </soapenv:Envelope>

## 5.12.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<soapenv:Envelope> <soapenv:Header> <awss:Session> <awss:SessionId>00RVD4J8Q7</awss:SessionId> <awss:SequenceNumber>5</awss:SequenceNumber> <awss:SecurityToken>25ZQDOFF2V1EQ3G5QI80PPHF0G</awss:SecurityToken> </awss:Session> </soapenv:Header> <soapenv:Body> <Hotel\_SellReply xmlns="http://xml.amadeus.com/HBKRCR\_24\_2\_1A"> <bookingTypeIndicator> <numberOfRooms> <quantity>1</quantity> <statusCode>HK</statusCode> </numberOfRooms> </bookingTypeIndicator> <roomStayData> <markerRoomStayData></markerRoomStayData> <pnrInfo> <tattooReference> <referenceDetails> <type>S</type> <value>1</value> </referenceDetails> </tattooReference> <reservationControlInfoPNR> <reservation> <companyId>1A</companyId> <controlNumber>S6OIHI</controlNumber> <controlType>P</controlType> </reservation> </reservationControlInfoPNR> </pnrInfo> <globalBookingInfo> <hotelPropertyInfo> <hotelReference> <chainCode>AD</chainCode> <cityCode>PAR</cityCode> <hotelCode>BUS</hotelCode> </hotelReference> <hotelName>VILLA BELLAGIO BUSSY</hotelName> </hotelPropertyInfo> <forceSellIndicator> <statusDetails> <indicator>FS</indicator> <action>2</action> </statusDetails> </forceSellIndicator> <individualCompanyId> <companyName>Amadeus Value Hotels</companyName> </individualCompanyId> <bookingInfo> <reservation> <companyId>AD</companyId> <controlNumber>89714340</controlNumber> <controlType>2</controlType> </reservation> </bookingInfo> <bookingSource> <originIdentification> <originatorId>57591472</originatorId> </originIdentification> </bookingSource> <globalPriceInformation> <globalPrice> <tariffInfo> <currency>GBP</currency> <dailyTotalIndicator>3</dailyTotalIndicator> <totalAmount>262.56</totalAmount> </tariffInfo> <chargeDetails> <type>AB</type> <amount>238.69</amount> <description>totalAmount</description> <currency>GBP</currency> </chargeDetails> <chargeDetails> <type>MU</type> <amount>23.87</amount> <description>totalAmount</description> <currency>GBP</currency> </chargeDetails> </globalPrice> </globalPriceInformation> <representativeParties> <occupantList> <passengerReference> <type>BHO</type> <value>2</value> </passengerReference> </occupantList> <occupantPreferences> <occupantPreferences> <occupantLanguage>FR</occupantLanguage> </occupantPreferences> </occupantPreferences> </representativeParties> <keyValueTree> <attributeDetails> <attributeType>SPC</attributeType> <attributeDescription>OI</attributeDescription> </attributeDetails> </keyValueTree> </globalBookingInfo> <roomListInfo> <roomStayIndex> <sequenceDetails> <number>1</number> </sequenceDetails> </roomStayIndex> <cancellationPolicies> <cancellationDateTime> <businessSemantic>CAN</businessSemantic> <timeMode>LT</timeMode> <dateTime> <year>2023</year> <month>5</month> <day>10</day> <hour>18</hour> <minutes>0</minutes> </dateTime> </cancellationDateTime> <fee> <monetaryDetails> <amount>238.69</amount> <currency>GBP</currency> </monetaryDetails> </fee> </cancellationPolicies> <cancellationPolicies> <cancellationDateTime> <businessSemantic>CAN</businessSemantic> <timeMode>LT</timeMode> <dateTime> <year>2023</year> <month>5</month> <day>11</day> <hour>18</hour> <minutes>0</minutes> </dateTime> </cancellationDateTime> <fee> <monetaryDetails> <amount>238.69</amount> <currency>GBP</currency> </monetaryDetails> </fee> </cancellationPolicies> <cancellationPolicies> <cancellationDateTime> <businessSemantic>CAN</businessSemantic> <timeMode>LT</timeMode> <dateTime> <year>2023</year> <month>5</month> <day>12</day> <hour>18</hour> <minutes>0</minutes> </dateTime> </cancellationDateTime> <fee> <monetaryDetails> <amount>238.69</amount> <currency>GBP</currency> </monetaryDetails> </fee> </cancellationPolicies> <requestableInformation> <requestedDates> <businessSemantic>CHK</businessSemantic> <timeMode>CHK</timeMode> <beginDateTime> <year>2023</year> <month>5</month> <day>13</day> </beginDateTime> <endDateTime> <year>2023</year> <month>5</month> <day>15</day> </endDateTime> </requestedDates> <roomRateDetails> <roomInformation> <roomRateIdentifier> <roomType>ROH</roomType> <ratePlanCode>RAC</ratePlanCode> </roomRateIdentifier> <bookingCode>004000C|4</bookingCode> <guestCountDetails> <numberOfUnit>1</numberOfUnit> <unitQualifier>A</unitQualifier> </guestCountDetails> </roomInformation> <specialInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>BC</informationType> <source>M</source> <encoding>1</encoding> </freeTextDetails> <freeText>004000C|4</freeText> </specialInfo> <specialInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>RC</informationType> <source>M</source> <encoding>1</encoding> </freeTextDetails> <freeText>RAC</freeText> </specialInfo> <specialInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>RO</informationType> <source>M</source> <encoding>1</encoding> </freeTextDetails> <freeText>ROH</freeText> </specialInfo> <bookingRequirement> <guaranteeDepositStatusInfo> <statusDetails> <indicator>DP</indicator> <action>1</action> </statusDetails> </guaranteeDepositStatusInfo> <guaranteeDepositRule> <tariffInfo> <amount>250.00</amount> <currency>EUR</currency> </tariffInfo> </guaranteeDepositRule> <paymentInformation> <paymentDetails> <formOfPaymentCode>43</formOfPaymentCode> <paymentType>2</paymentType> <serviceToPay>3</serviceToPay> </paymentDetails> </paymentInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>AU</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>AX</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>CA</vendorCode> </formOfPayment> </creditCardInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>VI</vendorCode> </formOfPayment> </creditCardInformation> <markerOfBookingRequirement></markerOfBookingRequirement> </bookingRequirement> <chargeAndExtras> <taxFeeInformation> <includedInAmount>I</includedInAmount> <perPerson>ROO</perPerson> <category>XTR</category> </taxFeeInformation> </chargeAndExtras> <markerOfExtra></markerOfExtra> <tariffInformation> <tariffInfo> <amount>262.56</amount> <currency>GBP</currency> <dailyTotalIndicator>3</dailyTotalIndicator> <status>1</status> </tariffInfo> <associatedCharges> <chargeCode>AB</chargeCode> <chargeAmount>238.69</chargeAmount> <description>amount</description> <chargeCurrency>GBP</chargeCurrency> </associatedCharges> <associatedCharges> <chargeCode>MU</chargeCode> <chargeAmount>23.87</chargeAmount> <description>amount</description> <chargeCurrency>GBP</chargeCurrency> </associatedCharges> </tariffInformation> </roomRateDetails> <guaranteeOrDeposit> <paymentInfo> <paymentDetails> <formOfPaymentCode>43</formOfPaymentCode> <paymentType>2</paymentType> <serviceToPay>3</serviceToPay> </paymentDetails> </paymentInfo> <groupCreditCardInfo> <creditCardInfo> <ccInfo> <vendorCode>VI</vendorCode> <cardNumber>4988438843884305</cardNumber> <expiryDate>1023</expiryDate> <ccHolderName>Test Test</ccHolderName> <surname>Test</surname> <firstName>TrustA</firstName> </ccInfo> </creditCardInfo> <concealedCreditCardInfo> <ccInfo> <cardNumber>498843XXXXXX4305</cardNumber> </ccInfo> </concealedCreditCardInfo> <fortknoxIds> <referenceDetails> <type>NOX</type> <value>104506825609364</value> </referenceDetails> </fortknoxIds> <cardHolderAddress> <addressDetails> <line1>485 Route du Pin Montard</line1> <line2>486 Route du Pin Montard</line2> </addressDetails> <city>Sophia Antipolis Cedex</city> <zipCode>06902</zipCode> <country>FR</country> <regionDetails> <state>PACA</state> </regionDetails> <locationDetails> <county>Alpes Maritimes</county> </locationDetails> </cardHolderAddress> </groupCreditCardInfo> </guaranteeOrDeposit> <guestList> <occupantList> <passengerReference> <type>ROP</type> <value>2</value> </passengerReference> </occupantList> </guestList> </requestableInformation> <rateChanges> <rateChangeAmountInformation> <tariffInfo> <amount>131.28</amount> <currency>GBP</currency> <dailyTotalIndicator>DY</dailyTotalIndicator> <status>1</status> </tariffInfo> <associatedCharges> <chargeCode>AB</chargeCode> <chargeAmount>119.35</chargeAmount> <description>amount</description> <chargeCurrency>GBP</chargeCurrency> </associatedCharges> <associatedCharges> <chargeCode>MU</chargeCode> <chargeAmount>11.93</chargeAmount> <description>amount</description> <chargeCurrency>GBP</chargeCurrency> </associatedCharges> </rateChangeAmountInformation> <rateChangePeriodInformation> <businessSemantic>HRC</businessSemantic> <beginDateTime> <year>2023</year> <month>5</month> <day>13</day> </beginDateTime> <endDateTime> <year>2023</year> <month>5</month> <day>15</day> </endDateTime> </rateChangePeriodInformation> </rateChanges> </roomListInfo> </roomStayData> </Hotel\_SellReply> </soapenv:Body> </soapenv:Envelope>

## 5.12.3 Possible Errors

See "Error Messages" section.

* * *