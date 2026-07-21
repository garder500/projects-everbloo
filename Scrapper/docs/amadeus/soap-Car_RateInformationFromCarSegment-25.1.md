---
url: "https://developers.amadeus.com/api-library/soap/functional-doc/71/doc-read/141652?serviceVersion=25.1"
download_url: "https://developers.amadeus.com/PAS-EAS/api/download/comp/4d4ad2cb456c02633f463a055ab70584/141652/UG_WBS_Car_RateInformationFromCarSegment_RCFSRQ_25.1_001.html"
title: "HTML_UG_WBS_Car_RateInformationFromCarSegment_RCFSRQ_25.1_001"
source: "amadeus"
service_id: "71"
service_name: "Car_RateInformationFromCarSegment"
version: "25.1"
document_id: "141652"
doc_version: "25.1"
doc_type: "User guide"
file_format: "HTML"
scraped_at: "2026-07-15T10:18:56.610Z"
---
# Function: Car\_RateInformationFromCarSegment

* * *

## 1 Overview

The "**Rate Information From Car Segment**" functionality allows the user to access information linked to a Car Booking stored in an Amadeus PNR.  
  
There are two types of Rate Information from Car segment:

Rules: information associated to a rate (for example: Rate, Tax, Surcharges...).

Policies: information associated to the Car Provider location (for example: Location address, Vehicle type information, Advance payment...).

Terms and conditions :  the provider legal terms of sale which is independent of the rate related terms covered by rate features.

There are two sources of Rate Information from Car segment:  
**  
The Amadeus Cars database:**

When the booking is complete access on a complete access plus company and the rate information have been stored automatically in the PNR at sell time

**  
The Car Provider database:**

  
  
In case the rate information from segment requested at sell time are returning an error or time-out  and nothing can be stored in the pnr,  when a rate information from car segment is performed the request is sent to the car provider in order to try to  retrieve the data .

**Please note that starting from 20.1 version, the user must implement the new structure of the rate details which is introduced in the " Operation: Rate Information with currency conversion" section.**

## 1.1 Supported Operations

Not applicable.

## 1.2 Limitations

Not applicable.

## 1.3 Unsupported Operations

Not applicable.

## 1.4 Prerequisites

The Amadeus PNR has to be retrieved prior to the "**RateInformationFromCarSegment**"request to be sent.

## 2 Building A Query

Each query will follow a given structure- the queries for the function operations are clearly explained with data element examples .It is important to note that the examples in each chapter are only illustrations and are meant to provide the basis for a better understanding on which fields are mandatory for basic operation utilization. It is not a full explanation of every field that can be utilised for the operation, but rather a guideline to its use.

**Mandatory Input Parameters**

To request Rate information from a Car segment, the only mandatory parameter is the segment tattoo number that references the Car booking stored in the PNR.

**Optional Input Parameters**

In order to filter the rate information from a Car segment, the user may request up to 3 optional parameters. See Code Set for as list of otherSelectionDetails/option values .

In order to retrieve the Terms and conditions of the booking , the language parameter needs to be specified.

## 2.1 Sub Structure: Optional: Language

## 2.1.1 Description

This option allows to request  the language  in which parts of the response will be  returned. If the language code is specified:

\- the terms and conditions that apply to the rate will be returned in the requested language (if they exist) otherwise they will be returned in the default language (English) .

## 2.1.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<language> <userPreferences> <languagecode>EN</languagecode> </userPreferences> </language>

## 3 Receiving A Reply

Information is received either from the Car Provider system or from the Amadeus Cars database. For the description of the elements returned in the provider response, please check the Car rate information from Availability user guide (response part ), as the same structures are valid for both messages.  
  

## 3.1 Sub Structure: CO2 Emission Offset

## 3.1.1 Description

Amadeus Car application is able to convey information related to the Carbon Footprint of the trip that is being booked.

Such as : 

-   CO2 Total Emission of the trip (Kilograms or Pounds)
-   Estimated distance of the trip (Kilometers or Miles)

With : 

-   gasCode : 

CO2

Carbon Dioxide

-   unit : 

K

Kilograms

L

Pounds

-   distanceMeasure : 

G

Kilometers

M

Mileage

Per default, Amadeus will convey information in Kilograms and Kilometers.

In the scenario where the booking is made from an Office ID located in USA, Liberia, Myanmar or United Kingdom, we will also convey the converted values (see example bellow)

## 3.1.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<greenhouseGasFootprint> <greenhouseGas> <constituantGas> <gasCode>CO2</gasCode> <value>17</value> <unit>K</unit> </constituantGas> <estimatedDistance> <distance>1000</distance> <distanceMeasure>G</distanceMeasure> </estimatedDistance> </greenhouseGas> </greenhouseGasFootprint> <greenhouseGasFootprint> <greenhouseGas> <constituantGas> <gasCode>CO2</gasCode> <value>37.5</value> <unit>L</unit> </constituantGas> <estimatedDistance> <distance>621</distance> <distanceMeasure>M</distanceMeasure> </estimatedDistance> </greenhouseGas> </greenhouseGasFootprint>

* * *

## 3.2 Sub Structure: Fuel policies

## 3.2.1 Description

This section describes how the fuel policies would be presented inside web services response (RCFARR). The fuel policies are returned only if car rental provider indicated a valid type of fuel policies defined in Amadeus database.

The fuel policies are special types of surcharges, they appear under XML node - taxCovSurchargeGroup, with the type 108 meaning surcharges.

In the description (XML node comment) of this surcharge, the fuel policies are identified with a parent flag FUL for fuel policies. There's a sub flag indicating the specific type of the fuel policy applicable to the current car rate (cf. below table). The thrid part of the description corresponds to the description of this type of fuel policy.

Please find here attached the list of all possible types of fuel policies:

FTF

Full to full  

FTK

Free tank

FTE

Full to empty

QTE

Quater to empty

ETE

Empty to empty

HTH

Half to half

RWR

Pre-purchased with refund

RNR

Pre-purchased with no refund

## 3.2.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>108</type> <amount>0.00</amount> <description>IBR</description> <periodType>004</periodType> <currency>EUR</currency> <comment>FUL - FTF - FULL TO FULL</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup>

* * *

## 3.3 Sub Structure: Optional information: Accepted Form of Payment

## 3.3.1 Description

Car provider may return Accepted Form of Payment for a given rate in a structured format. This information is encoded in _OTA\_VehRateRuleRS/RateRules/PaymentRules/AccetablePayments/AccetablePayment/CreditCardCode_. The following elements can be encoded:

-   **type of payment** (<PaymentTypeCode>)

**Value**

**Description**

1

Cash

3

Voucher

4

Pre-pay

5

Credit card

6

Debit card

7

Check

8

Deposit

9

Business account

19

Travel agency IATA number

23

Frequent traveler number

30

Corporate ID/CD number

32

Other information

34

Corporate

-   **Card Issuer** (<CreditCardCode>)

This Attribute is expected to be populate with the 2 character code of the card issuer name.

**Value**

**Description**

VI

VISA

MC

MASTERCARD

AX

AMERICAN EXPRESS

DC

DINNERS

Notes:

-   There is **NOT attribute** to debit card, in that case will be used CreditCardCode to convey this information for both, credit and debit cars. Using the PaymentTypeCode to define the information if it is credit or debit card

-   As RuleType element is mandatory at _OTA\_VehRateRuleRS/RateRules/PaymentRules_ the provider will always use RuleType 3 from the OTA Code List RUL to convey the Accepted Form of Payment

## 3.3.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<RateRules> <PaymentRules> <PaymentRule RuleType="3"></PaymentRule> <AcceptablePayments PaymentTypeCode="1"> <AcceptablePayment></AcceptablePayment> </AcceptablePayments>> <AcceptablePayments PaymentTypeCode="5"> <AcceptablePayment CreditCardCode="VI"></AcceptablePayment> <AcceptablePayment CreditCardCode="MC"></AcceptablePayment> <AcceptablePayment CreditCardCode="AX"></AcceptablePayment> <AcceptablePayment CreditCardCode="DS"></AcceptablePayment> </AcceptablePayments> </PaymentRules> </RateRules>

* * *

## 3.4 Sub Structure: Optional information: cancellation policies

## 3.4.1 Description

Car provider may return cancellation policies for a given rate in a structured format. This information is encoded in /rateDetails/otherRulesGroup/otherRules/ruleDetails. The following elements can be encoded:

-   **type of policy** (<type\>)

**Value**

**Description**

CAN

Cancellation fee

NSW  

No show fee

-   start of validity period:  
    
    It can be encoded either relatively to pickup date and time or with a fixed date and time. No period is required for no show policy.
    
    -   **type of unit** (<quantityUnit\>)  
        To encode the policy validity period relatively to (before) pickup date. Possible values:  
        
        **Value**  
        
        **Description**  
        
        2  
        
        Number of hours  
        
        3  
        
        Number of days  
        
        4  
        
        Number of weeks  
        
        5  
        
        Number of months  
        
    -   **number of unit** (<quantity\>)  
        To encode the policy validity period relatively to (before) pickup date. Number of hours, days, weeks or months as specified in **type of unit**.  
          
        
    -   **start date** (<effectiveDate\>)  
        To encode the policy validatity start date. Format is YYYYMMDD. Ex: 03APR2022 = 20220403  
          
        
    -   **start time** (<effectiveTime\>)  
        To encode the policy validatity start time. Format is HHMM. Ex: 09:45 PM = 2145  
          
        

-   cancellation fee:
    
    -   **amount** (<amount\>)  
        To encode the fee amount. For ex: 12.50  
          
        
    -   **currency** (<currency\>)  
        To encode the currency of the fee amount. It is the 3-letter code. For ex: euro = EUR, US dollar = USD.  
          
        
    -   **percentage of total car booking amount** (<percentage\>)  
        To encode the fee as a percentage of the total booking amount.  
          
        

-   **payment method** (<paymentType\>)  
    To encode the payment method with which the fee is expected to be paid. Possible values:

**Value**  

**Description**  

1

Cash  

3  

Voucher  

4  

Pre-pay  

5  

Credit card  

6

Debit card

7

Check

8

Deposit

9

Business account

19

Travel agency IATA number

23

Frequent traveler number

30

Corporate ID/CD number

32

Other information  

34

Corporate  

-   **free text description** (<description1\>)

The <ruleDetails\> structure for cancellation policies can be repeated in the following cases:

-   there are different cancellation periods defined: closer to the pickup date, cancellation fee becomes higher
-   the fee is expressed in both amount and percentage
-   there are cancellation fees and a no show fee

In case the currency conversion option is requested, all <ruleDetails\> are duplicated in a 2nd <ruleInfo\> structure with fee expressed in the requested currency and the amounts converted accordingly. The duplicated <ruleDetails\> contain the following flag:

-   **amount qualifier** (<amountQualifier\>)

**Value**

**Description**

36

Converted amount

## 3.4.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<rateDetails> <otherRulesGroup> <otherRules> <ruleDetails> <type>CAN</type> <quantity>3</quantity> <quantityUnit>3</quantityUnit> <currency>EUR</currency> <description1>This is a free text</description1> <percentage>20.00</percentage> <paymentType>1</paymentType> </ruleDetails> <ruleDetails> <type>CAN</type> <quantity>3</quantity> <quantityUnit>3</quantityUnit> <amount>20.00</amount> <currency>EUR</currency> <description1>This is a free text</description1> <paymentType>1</paymentType> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>CAN</type> <quantity>3</quantity> <quantityUnit>3</quantityUnit> <amountQualifier>36</amountQualifier> <currency>USD</currency> <description1>This is a free text</description1> <percentage>20.00</percentage> <paymentType>1</paymentType> </ruleDetails> <ruleDetails> <type>CAN</type> <quantity>3</quantity> <quantityUnit>3</quantityUnit> <amount>23.00</amount> <amountQualifier>36</amountQualifier> <currency>USD</currency> <description1>This is a free text</description1> <paymentType>1</paymentType> </ruleDetails> </otherRules> </otherRulesGroup> </rateDetails>

* * *

## 3.5 Sub Structure: Rule Information

## 3.5.1 Description

In this structure, the WBS customer obtains the rules details applied to the requested rate in the Car\_RateInformationAfterAvailability request.

Each rule has one mandatory element, the ruleDetails, composed by:

-   Type (mandatory):

ADB

Advance Booking Information

ADP

Advance Payment Information

DEP

Deposit Information

GUA

Guarantee Information

OWI

One Way Information

PCK

Pickup Rules

POL

Policy Information

-   Quantity: if applicable (up to 15 digists)

-   Quantity unit:

2

Hours Unit

3

Day Unit

-   Qualifier:
    -   Deposit Information:
        -   BRE - Before Rental
        -   AFT - After Booking
    -   Pickup Information
        -   MAX - Maximum Days Rental
        -   MIN - Minimum Days Rental
    -   One Way Information:
        -   009 - for One Way Allowedthe
        -   005 - for One Way not Allowed
        -   006 - for Restricted One Way Allowed
    -   Guarantee Information:  
        -   907 - Guarantee via credit card
        -   908 - Guarantee via booking source

-   Days of operation: Day of the week (Monday=1, Sunday=7)

-   Currency: Currency identification code

-   paymentType : 

1

Cash

3

Voucher

4

Pre-pay

5

Credit Card

6

Debit Card

7

Check

8

Deposit 

9

Business account

19

Travel agency IATA number

23

Frequen traveler number

30

Corporate ID/CD number

32

Other information

34

Corporate

This <ruleDetails\> element can appear replicated with more information for some rates (as shown in the example below.

Additionally, some explanation text can come associated to the rule in the tag 'ruleText'. This tag is composed by two mandatory fields:

-   Text type (mandatory):

ADB

Advance Booking Information

ADP

Advance Payment Information

DEP

Deposit Information

GUA

Guarantee Information

OWI

One Way Information

PCK

Pickup Rules

POL

Policy Information

-   Free Text (up to 70 characters)

## 3.5.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<otherRulesGroup> <otherRules> <ruleDetails> <type>DEP</type> <quantity>0</quantity> <quantityUnit>3</quantityUnit> <qualifier>BRE</qualifier> <amount>891.32</amount> <currency>EUR</currency> </ruleDetails> <ruleText> <textType>DEP</textType> <freeText>DEPOSIT WILL BE REQUIRED AT PICK UP TIME</freeText> </ruleText> </otherRules> </otherRulesGroup>

* * *

## 3.6 Sub Structure: Vehicle Information

## 3.6.1 Description

In this segment the WBS customer can identify the information related to the vehicle type present in the request.

The information is composed by the folloging elements:

-   Vehicle type owner (its value is always 'ACR')
-   Vehicle rental preferred type (4 characters ACRISS code)
-   Vehicle info: To indicate the vehicle details such as:
    -   Number of doors
    -   Number of seats
    -   Max Number of doors
    -   Max Number of seats
    -   Number of bags
    -   Volume of the boots
    -   CO2 emission
    -   Fuel Economy

-   Qualifier:

MOD

Maximum number Of Doors

MOS

Maximum number of Seats

NOB

Number Of Bags

NOD

Number Of Doors

NOS

Number Of Seats

VOB

Volume of the Boots

CEM

Carbon dioxide emission

FCE

Fuel economy

-   Value: Value number corresponding to the qualifier type. In case Qualifier type is VOB (Volume of the Boots) than Value could be one of the following:

**Code**

**Meaning**

0

No boot

1

One small suitcase

2

Two small suitcase

3

One large and one small suitcase

4

One large and two small suitcase

5

Two large and one small suitcase

6

Two large and two small suitcase

7

Three large and one small suitcase

8

Three large and two small suitcase

9

Three large and three small suitcase

10

More than three large suitcase

19

Depends on the number of passengers

20

Truck or van

-   Unit Measure Qualifier:

DM3

Cubic Decimeter

FT3

Cubic Feet

GPM

grams per mile

GPK

grams per km

MPG

miles per gallon

KPL

km per litre

-   Text subject qualifier:

1

Coded free text

3

Literal text

4

Coded and literal text

CHG

Change information

PRD

Product information

SAF

Safety information

SIM

IATA SSIM defined information

SPH

Special handling

STN

Statutory notice

TRA

Transportation information

ZZZ

Mutually defined (bilateral or internal information)

-   Information type:

MK

Marketing text

OS

Other Services Messages

SI

Supplementary information

-   Company identification:

1A

Amadeus

7CC

Industry Car Rental Companies

-   Language (3 letters ISO code)
-   Source:

F

CRS Floor limit

M

Manual

S

Link

-   Encoding:

1

ASCII 7 bit

2

ASCII 8 bit

3

Code page 500 (EBCDIC Multinational no. 5)

4

Code page 850 (IBM PC Multinational)

5

UCS-2

6

UCS-4

7

UTF-8

8

UTF-16

ZZZ

Mutually agreed

-   Free text: Description or Example of the Car (up to 55 characters)

## 3.6.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<vehicleInfoGroup> <vehicleDetails> <vehicleCharacteristic> <vehicleTypeOwner>ACR</vehicleTypeOwner> <vehicleRentalPrefType>STAR</vehicleRentalPrefType> </vehicleCharacteristic> <vehicleInfo> <qualifier>VOB</qualifier> <value>3</value> </vehicleInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>SI</informationType> <companyId>1A</companyId> <encoding>1</encoding> </freeTextDetails> <carModel>MUSTANG CONV OR SIMILAR</carModel> </vehicleDetails> </vehicleInfoGroup>

* * *

## 4 Error Messages

Here are error messages that can be returned while using the_RateInformationFromCarSegment_ function.

**Error Message**  
  

**Error Code**  
  

**Description**  
  

SEGMENT TATTOO INVALID  
  

7969  
  

The client has requested Retrieve Services for a Car Segment with an invalid Car segment tattoo number.  
  

When an error is sent back for a Complete Access Plus rate, this error can be of any type and is just transmitted by the Car application. It can also be one of the standard Amadeus errors used by the CarProviders.

## 4.1 Error Reply

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Car\_RateInformationFromCarSegmentReply xmlns="http://xml.amadeus.com/RCFSRR\_22\_2\_1A"> <errorWarning> <applicationError> <errorDetails> <errorCode>11369</errorCode> <errorCategory>WEC</errorCategory> </errorDetails> </applicationError> <errorFreeText> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>SI</informationType> <companyId>1A</companyId> <encoding>1</encoding> </freeTextDetails> <freeText>INVALID CAR POLICY TYPE - 42 </freeText> </errorFreeText> </errorWarning> <rateDetails> <companyIdentification> <travelSector>CAR</travelSector> <companyCode>ZE</companyCode> <companyName>HERTZ</companyName> <accessLevel>CA</accessLevel> </companyIdentification> <mktText> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>MK</informationType> <companyId>1A</companyId> <encoding>1</encoding> </freeTextDetails> <freeText>.EST TTL INC CDW-TP-TAX-AP SVC CHG-VLF.PROMOTIONAL RATE HAS</freeText> </mktText> <rateDetailsInfo> <tariffInfo> <rateAmount>45.35</rateAmount> <rateCurrency>EUR</rateCurrency> <rateType>DY</rateType> <rateAmountQualifier>RP</rateAmountQualifier> </tariffInfo> <associatedCharges> <chargeType>032</chargeType> <amount>.18</amount> </associatedCharges> <associatedCharges> <chargeType>034</chargeType> <quantity>250</quantity> </associatedCharges> <associatedCharges> <chargeType>009</chargeType> <amount>45.35</amount> </associatedCharges> <associatedCharges> <chargeType>XHK</chargeType> <amount>.18</amount> </associatedCharges> <associatedCharges> <chargeType>82</chargeType> <quantity>250</quantity> </associatedCharges> <associatedCharges> <chargeType>108</chargeType> <freeText>LOCATION SERVICE CHARGE</freeText> </associatedCharges> <associatedCharges> <chargeType>108</chargeType> <freeText>VEHICLE LICENSING FEE AND ROAD TAX</freeText> </associatedCharges> <associatedCharges> <chargeType>COV</chargeType> <freeText>LDW - LOSS DAMAGE WAIVER</freeText> </associatedCharges> <associatedCharges> <chargeType>COV</chargeType> <freeText>TP - THEFT PROTECTION</freeText> </associatedCharges> <associatedCharges> <chargeType>COV</chargeType> <freeText>PAE - PERSONAL ACCIDENT AND EFFECTS COVER</freeText> </associatedCharges> <associatedCharges> <chargeType>045</chargeType> <freeText>TAX</freeText> </associatedCharges> </rateDetailsInfo> <rateDetailsInfo> <tariffInfo> <rateAmount>226.75</rateAmount> <rateCurrency>EUR</rateCurrency> <rateAmountQualifier>RB</rateAmountQualifier> </tariffInfo> <associatedCharges> <chargeType>NBD</chargeType> <amount>5</amount> </associatedCharges> </rateDetailsInfo> <rateDetailsInfo> <tariffInfo> <rateAmount>357.84</rateAmount> <rateCurrency>EUR</rateCurrency> <rateAmountQualifier>904</rateAmountQualifier> </tariffInfo> </rateDetailsInfo> <dummy></dummy> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>108</type> <amount>24.5</amount> <periodType>004</periodType> <currency>EUR</currency> <comment>LOCATION SERVICE CHARGE</comment> </chargeDetails> <chargeDetails> <type>108</type> <description>ITX</description> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>108</type> <amount>1.89</amount> <periodType>001</periodType> <currency>EUR</currency> <comment>VEHICLE LICENSING FEE AND ROAD TAX</comment> </chargeDetails> <chargeDetails> <type>108</type> <description>ITX</description> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>COV</type> <amount>30.5</amount> <periodType>004</periodType> <currency>EUR</currency> <comment>LDW - LOSS DAMAGE WAIVER</comment> </chargeDetails> <chargeDetails> <type>COV</type> <description>ITX</description> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>COV</type> <amount>8</amount> <periodType>004</periodType> <currency>EUR</currency> <comment>TP - THEFT PROTECTION</comment> </chargeDetails> <chargeDetails> <type>COV</type> <description>ITX</description> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>COV</type> <amount>5.85</amount> <periodType>001</periodType> <currency>EUR</currency> <comment>PAE - PERSONAL ACCIDENT AND EFFECTS COVER</comment> </chargeDetails> <chargeDetails> <type>COV</type> <description>ITX</description> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>CPN</type> <amount>10</amount> <currency>EUR</currency> </chargeDetails> </taxSurchargeCoverageInfo> <additionalInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>SI</informationType> <companyId>1A</companyId> <encoding>1</encoding> </freeTextDetails> <freeText>ONE TRAVEL DISCOUNT OFFER</freeText> </additionalInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>045</type> <amount>19.6</amount> <periodType>012</periodType> <comment>TAX</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <vehicleInfoGroup> <vehicleDetails> <vehicleCharacteristic> <vehicleTypeOwner>ACR</vehicleTypeOwner> <vehicleRentalPrefType>ECMN</vehicleRentalPrefType> </vehicleCharacteristic> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>SI</informationType> <companyId>1A</companyId> <encoding>1</encoding> </freeTextDetails> <carModel>OPEL CORSA OR SIMILAR</carModel> </vehicleDetails> </vehicleInfoGroup> <pickupDropoffLocation> <locationCode> <locationType>176</locationType> <locationDescription> <code>1A</code> <name>CDG</name> </locationDescription> </locationCode> <address> <addressDetails> <format>5</format> <line1>AEROPORT DE ROISSY</line1> </addressDetails> <city>PARIS DE GAULLE AP 957139667</city> <countryCode>FR</countryCode> </address> <openingHours> <businessSemantic>OCH</businessSemantic> <beginDateTime> <hour>4</hour> <minutes>0</minutes> </beginDateTime> <endDateTime> <hour>24</hour> <minutes>0</minutes> </endDateTime> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> <beginDateTime> <hour>4</hour> <minutes>0</minutes> </beginDateTime> <endDateTime> <hour>24</hour> <minutes>0</minutes> </endDateTime> </openingHours> <phone> <phoneOrEmailType>PHO</phoneOrEmailType> <telephoneNumber> <telephoneNumber>0825889755</telephoneNumber> </telephoneNumber> </phone> </pickupDropoffLocation> <rateCodeGroup> <rateCode> <fareCategories> <fareType>CR</fareType> </fareCategories> </rateCode> <additionalInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>SI</informationType> <companyId>1A</companyId> <encoding>1</encoding> </freeTextDetails> <freeText>PROMOTIONAL RATE</freeText> </additionalInfo> </rateCodeGroup> </rateDetails> </Car\_RateInformationFromCarSegmentReply>

  

* * *

## 5 Operations

## 5.1 Operation: Basic Rate Information

Request for basic rate information.

## 5.1.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Car\_RateInformationFromCarSegment xmlns="http://xml.amadeus.com/RCFSRQ\_22\_2\_1A"> <pnrRecLoc> <reservation> <companyId>1A</companyId> <controlNumber>YYLQOG</controlNumber> <controlType>P</controlType> </reservation> </pnrRecLoc> <bookingIdentifier> <referenceType>S</referenceType> <uniqueReference>1</uniqueReference> </bookingIdentifier> </Car\_RateInformationFromCarSegment>

## 5.1.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Car\_RateInformationFromCarSegmentReply xmlns="http://xml.amadeus.com/RCFSRR\_22\_2\_1A"> <rateDetails> <companyIdentification> <travelSector>CAR</travelSector> <companyCode>SX</companyCode> <companyName>SIXT</companyName> <accessLevel>CP</accessLevel> </companyIdentification> <sourceLevel> <selectionDetails> <option>P6</option> </selectionDetails> </sourceLevel> <termsAndConditions> <attributeDetails> <attributeType>PRE</attributeType> <attributeDescription>//termsandConditions\_ZE\_pup.txt</attributeDescription> <language>EN</language> </attributeDetails> </termsAndConditions> <mktText> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>MK</informationType> <companyId>1A</companyId> <encoding>1</encoding> </freeTextDetails> <freeText>provider text</freeText> </mktText> <rateDetailsInfo> <tariffInfo> <rateAmount>38.29</rateAmount> <rateCurrency>USD</rateCurrency> <rateType>DY</rateType> <rateAmountQualifier>RP</rateAmountQualifier> <rateChangeIndicator>QUO</rateChangeIndicator> </tariffInfo> <extraRateTypeInfo> <rateCategory>007</rateCategory> </extraRateTypeInfo> <associatedCharges> <chargeType>032</chargeType> <amount>.22</amount> </associatedCharges> <associatedCharges> <chargeType>034</chargeType> <quantity>250</quantity> </associatedCharges> <associatedCharges> <chargeType>008</chargeType> <amount>31.29</amount> </associatedCharges> <associatedCharges> <chargeType>009</chargeType> <amount>31.29</amount> </associatedCharges> <associatedCharges> <chargeType>XDK</chargeType> <amount>.22</amount> </associatedCharges> <associatedCharges> <chargeType>XHK</chargeType> <amount>.22</amount> </associatedCharges> <associatedCharges> <chargeType>80</chargeType> <quantity>200</quantity> </associatedCharges> <associatedCharges> <chargeType>82</chargeType> <quantity>200</quantity> </associatedCharges> <associatedCharges> <chargeType>COV</chargeType> <freeText>AER - COVERAGE TEXT 1</freeText> </associatedCharges> <associatedCharges> <chargeType>COV</chargeType> <freeText>CCP - COVERAGE TEXT 2</freeText> </associatedCharges> </rateDetailsInfo> <rateDetailsInfo> <tariffInfo> <rateAmount>38.29</rateAmount> <rateCurrency>USD</rateCurrency> <rateAmountQualifier>RB</rateAmountQualifier> </tariffInfo> <associatedCharges> <chargeType>NBD</chargeType> <amount>1</amount> </associatedCharges> <associatedCharges> <chargeType>NBH</chargeType> <amount>0</amount> </associatedCharges> </rateDetailsInfo> <rateDetailsInfo> <tariffInfo> <rateAmount>88.58</rateAmount> <rateCurrency>USD</rateCurrency> <rateAmountQualifier>904</rateAmountQualifier> </tariffInfo> </rateDetailsInfo> <dummy></dummy> <remarks> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>SI</informationType> <companyId>1A</companyId> <encoding>1</encoding> </freeTextDetails> <freeText>MUST RETURN TO REQUESTED CITY</freeText> <freeText>MUST INCLUDE QUALIFYING AWD NUMBER IN /CD- FIELD FEE MAY APPLY</freeText> </remarks> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>USD</currency> </tariffInfo> <chargeDetails> <type>COV</type> <amount>0</amount> <description>IBR</description> <periodType>001</periodType> <currency>USD</currency> <comment>AER - COVERAGE TEXT 1</comment> </chargeDetails> </taxSurchargeCoverageInfo> <additionalInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>SI</informationType> <companyId>1A</companyId> <encoding>1</encoding> </freeTextDetails> <freeText>COVERAGE TEXT 2</freeText> </additionalInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>USD</currency> </tariffInfo> <chargeDetails> <type>108</type> <amount>0</amount> <description>IBR</description> <periodType>004</periodType> <currency>USD</currency> <comment>VEH LIC COST RECVRY</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>USD</currency> </tariffInfo> <chargeDetails> <type>108</type> <amount>0</amount> <description>IBR</description> <periodType>004</periodType> <currency>USD</currency> <comment>AIRPORT FEE</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>USD</currency> </tariffInfo> <chargeDetails> <type>108</type> <amount>0</amount> <description>IBR</description> <periodType>004</periodType> <currency>USD</currency> <comment>TRANSACTION FEE</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <vehicleInfoGroup> <vehicleDetails> <vehicleCharacteristic> <vehicleTypeOwner>ACR</vehicleTypeOwner> <vehicleRentalPrefType>ECMR</vehicleRentalPrefType> </vehicleCharacteristic> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>SI</informationType> <companyId>1A</companyId> <encoding>1</encoding> </freeTextDetails> <carModel>REFER TO POLICY PAGE CPOZIXXX/VEH</carModel> </vehicleDetails> </vehicleInfoGroup> <pickupDropoffLocation> <locationCode> <locationType>176</locationType> <locationDescription> <code>CPY</code> <name>NCE\*</name> </locationDescription> </locationCode> <address> <addressDetails> <format>5</format> <line1>LYON ST EXUPERY AEROPORT</line1> </addressDetails> <city>COLOMBIER SAUGNIEU69125</city> <countryCode>FR</countryCode> </address> <openingHours> <businessSemantic>OCH</businessSemantic> <beginDateTime> <hour>7</hour> <minutes>0</minutes> </beginDateTime> <endDateTime> <hour>24</hour> <minutes>0</minutes> </endDateTime> </openingHours> <phone> <phoneOrEmailType>EML</phoneOrEmailType> <emailAddress>test@test.com</emailAddress> </phone> <phone> <phoneOrEmailType>PHO</phoneOrEmailType> <telephoneNumber> <telephoneNumber>49-1806-252525</telephoneNumber> </telephoneNumber> </phone> <phone> <phoneOrEmailType>FAX</phoneOrEmailType> <telephoneNumber> <telephoneNumber>49-1806-2229302426</telephoneNumber> </telephoneNumber> </phone> </pickupDropoffLocation> <pickupDropoffLocation> <locationCode> <locationType>DOL</locationType> <locationDescription> <code>CPY</code> <name>NCE\*</name> </locationDescription> </locationCode> <openingHours> <businessSemantic>OCH</businessSemantic> <beginDateTime> <hour>7</hour> <minutes>0</minutes> </beginDateTime> <endDateTime> <hour>24</hour> <minutes>0</minutes> </endDateTime> </openingHours> </pickupDropoffLocation> <rateCodeGroup> <rateCode> <fareCategories> <fareType>KAI</fareType> </fareCategories> </rateCode> <additionalInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>SI</informationType> <companyId>1A</companyId> <encoding>1</encoding> </freeTextDetails> <freeText>RENNES ATALANTE</freeText> </additionalInfo> </rateCodeGroup> </rateDetails> </Car\_RateInformationFromCarSegmentReply>

## 5.1.3 Possible Errors

See "Error Messages" section.

* * *

## 5.2 Operation: PNR With Complete Access Car Booking

Before this transaction takes place, a PNR is retrieved.

## 5.2.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Car\_RateInformationFromCarSegment xmlns="http://xml.amadeus.com/RCFSRQ\_22\_2\_1A"> <pnrRecLoc> <reservation> <companyId>1A</companyId> <controlNumber>YYLYCK</controlNumber> <controlType>P</controlType> </reservation> </pnrRecLoc> <bookingIdentifier> <referenceType>S</referenceType> <uniqueReference>1</uniqueReference> </bookingIdentifier> </Car\_RateInformationFromCarSegment>

## 5.2.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Car\_RateInformationFromCarSegmentReply xmlns="http://xml.amadeus.com/RCFSRR\_22\_2\_1A"> <rateDetails> <companyIdentification> <travelSector>CAR</travelSector> <companyCode>SX</companyCode> <companyName>SIXT</companyName> <accessLevel>CP</accessLevel> </companyIdentification> <sourceLevel> <selectionDetails> <option>P6</option> </selectionDetails> </sourceLevel> <termsAndConditions> <attributeDetails> <attributeType>PRE</attributeType> <attributeDescription>//termsandConditions\_ZE\_pup.txt</attributeDescription> <language>EN</language> </attributeDetails> </termsAndConditions> <mktText> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>MK</informationType> <companyId>1A</companyId> <encoding>1</encoding> </freeTextDetails> <freeText>provider text</freeText> </mktText> <rateDetailsInfo> <tariffInfo> <rateAmount>38.29</rateAmount> <rateCurrency>USD</rateCurrency> <rateType>DY</rateType> <rateAmountQualifier>RP</rateAmountQualifier> <rateChangeIndicator>QUO</rateChangeIndicator> </tariffInfo> <extraRateTypeInfo> <rateCategory>007</rateCategory> </extraRateTypeInfo> <associatedCharges> <chargeType>032</chargeType> <amount>.22</amount> </associatedCharges> <associatedCharges> <chargeType>034</chargeType> <quantity>250</quantity> </associatedCharges> <associatedCharges> <chargeType>008</chargeType> <amount>31.29</amount> </associatedCharges> <associatedCharges> <chargeType>009</chargeType> <amount>31.29</amount> </associatedCharges> <associatedCharges> <chargeType>XDK</chargeType> <amount>.22</amount> </associatedCharges> <associatedCharges> <chargeType>XHK</chargeType> <amount>.22</amount> </associatedCharges> <associatedCharges> <chargeType>80</chargeType> <quantity>200</quantity> </associatedCharges> <associatedCharges> <chargeType>82</chargeType> <quantity>200</quantity> </associatedCharges> <associatedCharges> <chargeType>COV</chargeType> <freeText>AER - COVERAGE TEXT 1</freeText> </associatedCharges> <associatedCharges> <chargeType>COV</chargeType> <freeText>CCP - COVERAGE TEXT 2</freeText> </associatedCharges> </rateDetailsInfo> <rateDetailsInfo> <tariffInfo> <rateAmount>38.29</rateAmount> <rateCurrency>USD</rateCurrency> <rateAmountQualifier>RB</rateAmountQualifier> </tariffInfo> <associatedCharges> <chargeType>NBD</chargeType> <amount>1</amount> </associatedCharges> <associatedCharges> <chargeType>NBH</chargeType> <amount>0</amount> </associatedCharges> </rateDetailsInfo> <rateDetailsInfo> <tariffInfo> <rateAmount>88.58</rateAmount> <rateCurrency>USD</rateCurrency> <rateAmountQualifier>904</rateAmountQualifier> </tariffInfo> </rateDetailsInfo> <dummy></dummy> <remarks> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>SI</informationType> <companyId>1A</companyId> <encoding>1</encoding> </freeTextDetails> <freeText>MUST RETURN TO REQUESTED CITY</freeText> <freeText>MUST INCLUDE QUALIFYING AWD NUMBER IN /CD- FIELD FEE MAY APPLY</freeText> </remarks> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>USD</currency> </tariffInfo> <chargeDetails> <type>COV</type> <amount>0</amount> <description>IBR</description> <periodType>001</periodType> <currency>USD</currency> <comment>AER - COVERAGE TEXT 1</comment> </chargeDetails> </taxSurchargeCoverageInfo> <additionalInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>SI</informationType> <companyId>1A</companyId> <encoding>1</encoding> </freeTextDetails> <freeText>COVERAGE TEXT 2</freeText> </additionalInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>USD</currency> </tariffInfo> <chargeDetails> <type>108</type> <amount>0</amount> <description>IBR</description> <periodType>004</periodType> <currency>USD</currency> <comment>VEH LIC COST RECVRY</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>USD</currency> </tariffInfo> <chargeDetails> <type>108</type> <amount>0</amount> <description>IBR</description> <periodType>004</periodType> <currency>USD</currency> <comment>AIRPORT FEE</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>USD</currency> </tariffInfo> <chargeDetails> <type>108</type> <amount>0</amount> <description>IBR</description> <periodType>004</periodType> <currency>USD</currency> <comment>TRANSACTION FEE</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <vehicleInfoGroup> <vehicleDetails> <vehicleCharacteristic> <vehicleTypeOwner>ACR</vehicleTypeOwner> <vehicleRentalPrefType>ECMR</vehicleRentalPrefType> </vehicleCharacteristic> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>SI</informationType> <companyId>1A</companyId> <encoding>1</encoding> </freeTextDetails> <carModel>REFER TO POLICY PAGE CPOZIXXX/VEH</carModel> </vehicleDetails> </vehicleInfoGroup> <pickupDropoffLocation> <locationCode> <locationType>176</locationType> <locationDescription> <code>CPY</code> <name>NCE\*</name> </locationDescription> </locationCode> <address> <addressDetails> <format>5</format> <line1>LYON ST EXUPERY AEROPORT</line1> </addressDetails> <city>COLOMBIER SAUGNIEU69125</city> <countryCode>FR</countryCode> </address> <openingHours> <businessSemantic>OCH</businessSemantic> <beginDateTime> <hour>7</hour> <minutes>0</minutes> </beginDateTime> <endDateTime> <hour>24</hour> <minutes>0</minutes> </endDateTime> </openingHours> <phone> <phoneOrEmailType>EML</phoneOrEmailType> <emailAddress>test@test.com</emailAddress> </phone> <phone> <phoneOrEmailType>PHO</phoneOrEmailType> <telephoneNumber> <telephoneNumber>49-1806-252525</telephoneNumber> </telephoneNumber> </phone> <phone> <phoneOrEmailType>FAX</phoneOrEmailType> <telephoneNumber> <telephoneNumber>49-1806-2229302426</telephoneNumber> </telephoneNumber> </phone> </pickupDropoffLocation> <pickupDropoffLocation> <locationCode> <locationType>DOL</locationType> <locationDescription> <code>CPY</code> <name>NCE\*</name> </locationDescription> </locationCode> <openingHours> <businessSemantic>OCH</businessSemantic> <beginDateTime> <hour>7</hour> <minutes>0</minutes> </beginDateTime> <endDateTime> <hour>24</hour> <minutes>0</minutes> </endDateTime> </openingHours> </pickupDropoffLocation> <rateCodeGroup> <rateCode> <fareCategories> <fareType>KAI</fareType> </fareCategories> </rateCode> <additionalInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>SI</informationType> <companyId>1A</companyId> <encoding>1</encoding> </freeTextDetails> <freeText>RENNES ATALANTE</freeText> </additionalInfo> </rateCodeGroup> </rateDetails> </Car\_RateInformationFromCarSegmentReply>

## 5.2.3 Possible Errors

See "Error Messages" section.

* * *

## 5.3 Operation: Rate information with base rate breakdown details

In this operation we show an example of response for a corporate rate with the base rate breakdown filled by the provider.

For this example, the booking was made for a duration of 6 days with a weekly rate plan and limited mileage.

This example will show how the base rate breakdown information are returned in the rate details part per unit period (1 week and 1 day)

in the rate details segment we can see those repetition :

\*217:150::1

-   217 is th eweekly amount charge type
-   150 is the base amount per week for this rate
-   1 is the number of weeks included in the booking, if the booking would have been made for 12 days, we would have had 2 here

\*218:25::1

-   218 is the daily amount charge type
-   25 is the base amount per day for this rate
-   1 is the number of days included in the booking

\*034:1750::1:002

-   034 is the free kilometer charge type (for miles the type is 033)
-   1750 is the amount of free kilometers per period type
-   1 is the number of period included in the booking
-   002 is for weekly period type

\*034:250::1:001

-   034 is the free kilometer charge type
-   250 is the amount of free kilometer per period type
-   1 is the number of period included in the booking
-   001 is the daily period type

this means that the base rate is composed of

-   1 week for a base amount of 150 EUR which includes 1750 free KM
-   1 day for a base rate of 25 EUR which included 250 free KM

Total base rate is of 175 EUR and 2000 free kilometers.

## 5.3.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Car\_RateInformationFromCarSegment xmlns="http://xml.amadeus.com/RCFSRQ\_22\_2\_1A"> <pnrRecLoc> <reservation> <companyId>1A</companyId> <controlNumber>YYLQOG</controlNumber> <controlType>P</controlType> </reservation> </pnrRecLoc> <bookingIdentifier> <referenceType>S</referenceType> <uniqueReference>1</uniqueReference> </bookingIdentifier> </Car\_RateInformationFromCarSegment>

## 5.3.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Car\_RateInformationFromCarSegmentReply xmlns="http://xml.amadeus.com/RCFSRR\_22\_2\_1A"> <rateDetails> <companyIdentification> <travelSector>CAR</travelSector> <companyCode>SX</companyCode> <companyName>SIXT</companyName> <accessLevel>CP</accessLevel> </companyIdentification> <sourceLevel> <selectionDetails> <option>P6</option> </selectionDetails> </sourceLevel> <termsAndConditions> <attributeDetails> <attributeType>PRE</attributeType> <attributeDescription>//termsandConditions\_ZE\_pup.txt</attributeDescription> <language>EN</language> </attributeDetails> </termsAndConditions> <mktText> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>MK</informationType> <companyId>1A</companyId> <encoding>1</encoding> </freeTextDetails> <freeText>provider text</freeText> </mktText> <rateDetailsInfo> <tariffInfo> <rateAmount>150.00</rateAmount> <rateCurrency>USD</rateCurrency> <rateType>WY</rateType> <amountType>RP</amountType> <rateChangeIndicator>GUA</rateChangeIndicator> </tariffInfo> <chargeDetails> <chargeType>034</chargeType> <amount>2000</amount> <chargePeriodTypeCode>K</chargePeriodTypeCode> </chargeDetails> </rateDetailsInfo> <rateDetailsInfo> <tariffInfo> <rateAmount>175.00</rateAmount> <rateCurrency>USD</rateCurrency> <rateAmountQualifier>RB</rateAmountQualifier> </tariffInfo> <chargeDetails> <chargeType>NBD</chargeType> <amount>6</amount> </chargeDetails> <chargeDetails> <chargeType>217</chargeType> <amount>150</amount> <amountQualifier>3</amountQualifier> <quantity>1</quantity> </chargeDetails> <chargeDetails> <chargeType>218</chargeType> <amount>25</amount> <amountQualifier>3</amountQualifier> <quantity>1</quantity> </chargeDetails> <chargeDetails> <chargeType>034</chargeType> <amount>1750</amount> <amountQualifier>3</amountQualifier> <quantity>1</quantity> <chargePeriodTypeCode>002</chargePeriodTypeCode> </chargeDetails> <chargeDetails> <chargeType>034</chargeType> <amount>250</amount> <amountQualifier>3</amountQualifier> <quantity>3</quantity> <chargePeriodTypeCode>001</chargePeriodTypeCode> </chargeDetails> </rateDetailsInfo> <rateDetailsInfo> <tariffInfo> <rateAmount>88.58</rateAmount> <rateCurrency>USD</rateCurrency> <rateAmountQualifier>904</rateAmountQualifier> </tariffInfo> </rateDetailsInfo> <dummy></dummy> <remarks> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>SI</informationType> <companyId>1A</companyId> <encoding>1</encoding> </freeTextDetails> <freeText>MUST RETURN TO REQUESTED CITY</freeText> <freeText>MUST INCLUDE QUALIFYING AWD NUMBER IN /CD- FIELD FEE MAY APPLY</freeText> </remarks> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>USD</currency> </tariffInfo> <chargeDetails> <type>COV</type> <amount>0</amount> <description>IBR</description> <periodType>001</periodType> <currency>USD</currency> <comment>AER - COVERAGE TEXT 1</comment> </chargeDetails> </taxSurchargeCoverageInfo> <additionalInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>SI</informationType> <companyId>1A</companyId> <encoding>1</encoding> </freeTextDetails> <freeText>COVERAGE TEXT 2</freeText> </additionalInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>USD</currency> </tariffInfo> <chargeDetails> <type>108</type> <amount>0</amount> <description>IBR</description> <periodType>004</periodType> <currency>USD</currency> <comment>VEH LIC COST RECVRY</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>USD</currency> </tariffInfo> <chargeDetails> <type>108</type> <amount>0</amount> <description>IBR</description> <periodType>004</periodType> <currency>USD</currency> <comment>AIRPORT FEE</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>USD</currency> </tariffInfo> <chargeDetails> <type>108</type> <amount>0</amount> <description>IBR</description> <periodType>004</periodType> <currency>USD</currency> <comment>TRANSACTION FEE</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <vehicleInfoGroup> <vehicleDetails> <vehicleCharacteristic> <vehicleTypeOwner>ACR</vehicleTypeOwner> <vehicleRentalPrefType>ECMR</vehicleRentalPrefType> </vehicleCharacteristic> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>SI</informationType> <companyId>1A</companyId> <encoding>1</encoding> </freeTextDetails> <carModel>REFER TO POLICY PAGE CPOZIXXX/VEH</carModel> </vehicleDetails> </vehicleInfoGroup> <pickupDropoffLocation> <locationCode> <locationType>176</locationType> <locationDescription> <code>CPY</code> <name>NCE</name> </locationDescription> </locationCode> <address> <addressDetails> <format>5</format> <line1>LYON ST EXUPERY AEROPORT</line1> </addressDetails> <city>COLOMBIER SAUGNIEU69125</city> <countryCode>FR</countryCode> </address> <openingHours> <businessSemantic>OCH</businessSemantic> <beginDateTime> <hour>7</hour> <minutes>0</minutes> </beginDateTime> <endDateTime> <hour>24</hour> <minutes>0</minutes> </endDateTime> </openingHours> <phone> <phoneOrEmailType>EML</phoneOrEmailType> <emailAddress>test@test.com</emailAddress> </phone> <phone> <phoneOrEmailType>PHO</phoneOrEmailType> <telephoneNumber> <telephoneNumber>49-1806-252525</telephoneNumber> </telephoneNumber> </phone> <phone> <phoneOrEmailType>FAX</phoneOrEmailType> <telephoneNumber> <telephoneNumber>49-1806-2229302426</telephoneNumber> </telephoneNumber> </phone> </pickupDropoffLocation> <pickupDropoffLocation> <locationCode> <locationType>DOL</locationType> <locationDescription> <code>CPY</code> <name>NCE</name> </locationDescription> </locationCode> <openingHours> <businessSemantic>OCH</businessSemantic> <beginDateTime> <hour>7</hour> <minutes>0</minutes> </beginDateTime> <endDateTime> <hour>24</hour> <minutes>0</minutes> </endDateTime> </openingHours> </pickupDropoffLocation> <rateCodeGroup> <rateCode> <fareCategories> <fareType>KAI</fareType> </fareCategories> </rateCode> <additionalInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>SI</informationType> <companyId>1A</companyId> <encoding>1</encoding> </freeTextDetails> <freeText>RENNES ATALANTE</freeText> </additionalInfo> </rateCodeGroup> </rateDetails> </Car\_RateInformationFromCarSegmentReply>

## 5.3.3 Possible Errors

See "Error Messages" section.

* * *

## 5.4 Operation: Rate Information with currency conversion

In the example below, the WBS customers can see how to use the rate currency conversion (for information purposes only).

There are two ways to trigger this functionality, which you can find below :

\-If a currency code specified in Car Rate Information from Segment request (the explicit way),  
is different than the one received in the retrieved content - i.e. a different currency code is returned by the car provider's system for a location in the reply

\-Or if the default currency code of the office id or the point of sale of the WBS customer differs from the currency of the location (the implicit way) sent by the car provider in the reply,

In all the above cases, Amadeus Car Application performs a currency conversion of the retrieved amounts, based on the conversion rates stored in Amadeus.

The corresponding currencies that are returned for different amounts in the Car Rate Information from Segment Reply, are the following :  
\-original currency (received from the car provider system) and the converted currency (conversion done by Amadeus Car Application) for the Estimated total, Rate Plan, Base Rate and Charges,  
\-with an indicator (rateConvertedQualifier) as '4' telling which amounts are converted. 

However, for <taxCovSurchargeGroup\>, Amadeus Car Application will return **only** the converted currency.

**Request Converted Currency**

**Point of Sale/Office Id Currency**

**Car Provider Original Currency**

**Result**

CAD

USD

CAD

Only CAD

USD

Any

CAD

Both CAD and USD  
USD rates will have  
<rateConvertedQualifier>4</rateConvertedQualifier>  
to indicate that it is converted 

\-

USD

USD

Only USD

\-

USD

CAD

Both CAD and USD  
USD rates will have  
<rateConvertedQualifier>4</rateConvertedQualifier>  
to indicate that it is converted

## 5.4.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Car\_RateInformationFromCarSegment xmlns="http://xml.amadeus.com/RCFSRQ\_22\_2\_1A"> <bookingIdentifier> <referenceType>S</referenceType> <uniqueReference>1</uniqueReference> </bookingIdentifier> <currency> <currencyDetails> <currencyQualifier>6</currencyQualifier> <displayCurrency>EUR</displayCurrency> </currencyDetails> </currency> </Car\_RateInformationFromCarSegment>

## 5.4.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Car\_RateInformationFromCarSegmentReply xmlns="http://xml.amadeus.com/RCFSRR\_22\_2\_1A"> <rateDetails> <companyIdentification> <travelSector>CAR</travelSector> <companyCode>ZE</companyCode> <companyName>HERTZ</companyName> <accessLevel>CP</accessLevel> </companyIdentification> <sourceLevel> <selectionDetails> <option>P4</option> </selectionDetails> </sourceLevel> <rateDetailsInfo> <tariffInfo> <rateAmount>160.75</rateAmount> <rateCurrency>EUR</rateCurrency> <rateType>DY</rateType> <rateAmountQualifier>RP</rateAmountQualifier> <rateConvertedQualifier>4</rateConvertedQualifier> <rateChangeIndicator>GUA</rateChangeIndicator> </tariffInfo> <associatedCharges> <chargeType>033</chargeType> <amountQualifier>UNL</amountQualifier> <chargePeriodTypeCode>004</chargePeriodTypeCode> </associatedCharges> <associatedCharges> <chargeType>008</chargeType> <amount>60.49</amount> <currencyCode>EUR</currencyCode> </associatedCharges> <associatedCharges> <chargeType>79</chargeType> <amountQualifier>UNL</amountQualifier> </associatedCharges> <associatedCharges> <chargeType>009</chargeType> <amount>16.02</amount> <currencyCode>EUR</currencyCode> </associatedCharges> <associatedCharges> <chargeType>81</chargeType> <amountQualifier>UNL</amountQualifier> </associatedCharges> <associatedCharges> <chargeType>045</chargeType> <amount>11.75</amount> <currencyCode>EUR</currencyCode> <freeText>TAX-TAX</freeText> </associatedCharges> <associatedCharges> <chargeType>108</chargeType> <amount>57.04</amount> <currencyCode>EUR</currencyCode> <freeText>OWC - ONE WAY CHARGE</freeText> </associatedCharges> <associatedCharges> <chargeType>108</chargeType> <amount>17.67</amount> <currencyCode>EUR</currencyCode> <freeText>SCG - GENERAL SURCHARGE</freeText> </associatedCharges> <associatedCharges> <chargeType>108</chargeType> <amount>1.73</amount> <currencyCode>EUR</currencyCode> <freeText>SCG - GENERAL SURCHARGE</freeText> </associatedCharges> <associatedCharges> <chargeType>108</chargeType> <amount>1.29</amount> <currencyCode>EUR</currencyCode> <freeText>SCG - GENERAL SURCHARGE</freeText> </associatedCharges> <associatedCharges> <chargeType>108</chargeType> <amount>17.29</amount> <currencyCode>EUR</currencyCode> <freeText>DEL - DELIVERY FEE</freeText> </associatedCharges> <associatedCharges> <chargeType>108</chargeType> <amount>21.61</amount> <currencyCode>EUR</currencyCode> <freeText>COL - COLLECTION FEE</freeText> </associatedCharges> </rateDetailsInfo> <rateDetailsInfo> <tariffInfo> <rateAmount>185.99</rateAmount> <rateCurrency>USD</rateCurrency> <rateType>DY</rateType> <rateAmountQualifier>RP</rateAmountQualifier> <rateChangeIndicator>GUA</rateChangeIndicator> </tariffInfo> <associatedCharges> <chargeType>033</chargeType> <amountQualifier>UNL</amountQualifier> <chargePeriodTypeCode>004</chargePeriodTypeCode> </associatedCharges> <associatedCharges> <chargeType>008</chargeType> <amount>69.99</amount> <currencyCode>USD</currencyCode> </associatedCharges> <associatedCharges> <chargeType>79</chargeType> <amountQualifier>UNL</amountQualifier> </associatedCharges> <associatedCharges> <chargeType>009</chargeType> <amount>18.53</amount> <currencyCode>USD</currencyCode> </associatedCharges> <associatedCharges> <chargeType>81</chargeType> <amountQualifier>UNL</amountQualifier> </associatedCharges> <associatedCharges> <chargeType>045</chargeType> <amount>13.59</amount> <currencyCode>USD</currencyCode> <freeText>TAX-TAX</freeText> </associatedCharges> <associatedCharges> <chargeType>108</chargeType> <amount>66.00</amount> <currencyCode>USD</currencyCode> <freeText>OWC - ONE WAY CHARGE</freeText> </associatedCharges> <associatedCharges> <chargeType>108</chargeType> <amount>20.45</amount> <currencyCode>USD</currencyCode> <freeText>SCG - GENERAL SURCHARGE</freeText> </associatedCharges> <associatedCharges> <chargeType>108</chargeType> <amount>2.00</amount> <currencyCode>USD</currencyCode> <freeText>SCG - GENERAL SURCHARGE</freeText> </associatedCharges> <associatedCharges> <chargeType>108</chargeType> <amount>1.49</amount> <currencyCode>USD</currencyCode> <freeText>SCG - GENERAL SURCHARGE</freeText> </associatedCharges> <associatedCharges> <chargeType>108</chargeType> <amount>20.00</amount> <currencyCode>USD</currencyCode> <freeText>DEL - DELIVERY FEE</freeText> </associatedCharges> <associatedCharges> <chargeType>108</chargeType> <amount>25.00</amount> <currencyCode>USD</currencyCode> <freeText>COL - COLLECTION FEE</freeText> </associatedCharges> </rateDetailsInfo> <rateDetailsInfo> <tariffInfo> <rateAmount>176.77</rateAmount> <rateCurrency>EUR</rateCurrency> <rateAmountQualifier>RB</rateAmountQualifier> <rateConvertedQualifier>4</rateConvertedQualifier> </tariffInfo> <associatedCharges> <chargeType>NBD</chargeType> <amount>1</amount> </associatedCharges> </rateDetailsInfo> <rateDetailsInfo> <tariffInfo> <rateAmount>204.52</rateAmount> <rateCurrency>USD</rateCurrency> <rateAmountQualifier>RB</rateAmountQualifier> </tariffInfo> <associatedCharges> <chargeType>NBD</chargeType> <amount>1</amount> </associatedCharges> </rateDetailsInfo> <rateDetailsInfo> <tariffInfo> <rateAmount>209.20</rateAmount> <rateCurrency>EUR</rateCurrency> <rateAmountQualifier>904</rateAmountQualifier> <rateConvertedQualifier>4</rateConvertedQualifier> </tariffInfo> </rateDetailsInfo> <rateDetailsInfo> <tariffInfo> <rateAmount>242.05</rateAmount> <rateCurrency>USD</rateCurrency> <rateAmountQualifier>904</rateAmountQualifier> </tariffInfo> </rateDetailsInfo> <rateDetailsInfo> <tariffInfo> <rateAmount>57.04</rateAmount> <rateCurrency>EUR</rateCurrency> <rateAmountQualifier>DRO</rateAmountQualifier> <rateConvertedQualifier>4</rateConvertedQualifier> </tariffInfo> </rateDetailsInfo> <rateDetailsInfo> <tariffInfo> <rateAmount>66.00</rateAmount> <rateCurrency>USD</rateCurrency> <rateAmountQualifier>DRO</rateAmountQualifier> </tariffInfo> </rateDetailsInfo> <dummy></dummy> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>108</type> <amount>57.04</amount> <description>IES</description> <currency>EUR</currency> <comment>OWC - ONE WAY CHARGE</comment> </chargeDetails> <chargeDetails> <type>108</type> <amount>57.04</amount> <periodType>004</periodType> <currency>EUR</currency> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>108</type> <amount>17.67</amount> <description>IES</description> <currency>EUR</currency> <comment>SCG - GENERAL SURCHARGE</comment> </chargeDetails> <chargeDetails> <type>108</type> <amount>10.00</amount> <periodType>012</periodType> <currency>EUR</currency> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>108</type> <amount>1.73</amount> <description>IES</description> <currency>EUR</currency> <comment>SCG - GENERAL SURCHARGE</comment> </chargeDetails> <chargeDetails> <type>108</type> <amount>0.86</amount> <periodType>001</periodType> <currency>EUR</currency> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>108</type> <amount>1.29</amount> <description>IES</description> <currency>EUR</currency> <comment>SCG - GENERAL SURCHARGE</comment> </chargeDetails> <chargeDetails> <type>108</type> <amount>1.29</amount> <periodType>004</periodType> <currency>EUR</currency> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>108</type> <amount>7.77</amount> <description>OPT</description> <periodType>001</periodType> <currency>EUR</currency> <comment>SCG - GENERAL SURCHARGE</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>108</type> <amount>17.29</amount> <description>IES</description> <currency>EUR</currency> <comment>DEL - DELIVERY FEE</comment> </chargeDetails> <chargeDetails> <type>108</type> <amount>17.29</amount> <periodType>004</periodType> <currency>EUR</currency> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>108</type> <amount>21.61</amount> <description>IBR</description> <periodType>004</periodType> <currency>EUR</currency> <comment>COL - COLLECTION FEE</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>COV</type> <amount>29.38</amount> <description>OPT</description> <periodType>001</periodType> <currency>EUR</currency> <comment>LDW - LOSS DAMAGE WAIVER</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>COV</type> <amount>6.01</amount> <description>OPT</description> <periodType>001</periodType> <currency>EUR</currency> <comment>PAE - PERSONAL ACCIDENT AND EFFECTS COVER</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>COV</type> <amount>16.29</amount> <description>OPT</description> <periodType>001</periodType> <currency>EUR</currency> <comment>SLI - SUPPLEMENTARY LIABILITY INSURANCE</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>045</type> <amount>11.75</amount> <description>IES</description> <currency>EUR</currency> <comment>TAX-TAX</comment> </chargeDetails> <chargeDetails> <type>045</type> <amount>6.00</amount> <periodType>012</periodType> <currency>EUR</currency> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>013</type> <description>OPT</description> <comment>CBS - CHILD BOOSTER SEAT</comment> </chargeDetails> <chargeDetails> <type>013</type> <amount>13.66</amount> <periodType>004</periodType> <currency>EUR</currency> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <vehicleInfoGroup> <vehicleDetails> <vehicleCharacteristic> <vehicleTypeOwner>ACR</vehicleTypeOwner> <vehicleRentalPrefType>CCAR</vehicleRentalPrefType> </vehicleCharacteristic> </vehicleDetails> </vehicleInfoGroup> <pickupDropoffLocation> <locationCode> <locationType>176</locationType> <locationDescription> <code>CPY</code> <name>WVBLF19\\</name> </locationDescription> </locationCode> <address> <addressDetails> <format>5</format> <line1>300 MARKELL DR STE 101</line1> </addressDetails> <city>BLUEFIELD 24701</city> <zipCode>24701</zipCode> <countryCode>US</countryCode> <regionDetails> <code>WV</code> </regionDetails> </address> <openingHours> <businessSemantic>OCH</businessSemantic> <beginDateTime> <hour>09</hour> <minutes>00</minutes> </beginDateTime> <endDateTime> <hour>17</hour> <minutes>00</minutes> </endDateTime> </openingHours> <phone> <phoneOrEmailType>FAX</phoneOrEmailType> <telephoneNumber> <telephoneNumber>\\</telephoneNumber> </telephoneNumber> <emailAddress>13043258647</emailAddress> </phone> <phone> <phoneOrEmailType>PHO</phoneOrEmailType> <telephoneNumber> <telephoneNumber>304-325-3388</telephoneNumber> </telephoneNumber> </phone> </pickupDropoffLocation> <pickupDropoffLocation> <locationCode> <locationType>DOL</locationType> <locationDescription> <code>CPY</code> <name>ILORD10\\</name> </locationDescription> </locationCode> <address> <addressDetails> <format>5</format> <line1>10255 WEST ZEMKE BLVD</line1> </addressDetails> <city>CHICAGO</city> <zipCode>60666</zipCode> <countryCode>US</countryCode> </address> <openingHours> <businessSemantic>OCH</businessSemantic> <beginDateTime> <hour>05</hour> <minutes>00</minutes> </beginDateTime> <endDateTime> <hour>00</hour> <minutes>00</minutes> </endDateTime> </openingHours> <phone> <phoneOrEmailType>FAX</phoneOrEmailType> <telephoneNumber> <telephoneNumber>17736940567</telephoneNumber> </telephoneNumber> </phone> <phone> <phoneOrEmailType>PHO</phoneOrEmailType> <telephoneNumber> <telephoneNumber>773 481-2400</telephoneNumber> </telephoneNumber> </phone> </pickupDropoffLocation> <rateCodeGroup> <rateCode> <fareCategories> <fareType>ICOD2</fareType> </fareCategories> </rateCode> </rateCodeGroup> </rateDetails> </Car\_RateInformationFromCarSegmentReply>

## 5.4.3 Possible Errors

See "Error Messages" section.

* * *

## 5.5 Operation: Rate information with language

In this example we make a rate information from segment request :

   - Record locator : PN6767

   - Currency : EUR   
   - **Requested language : EN**

## 5.5.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Car\_RateInformationFromCarSegment xmlns="http://xml.amadeus.com/RCFSRQ\_22\_2\_1A"> <pnrRecLoc> <reservation> <companyId>1A</companyId> <controlNumber>PN6767</controlNumber> <controlType>P</controlType> </reservation> </pnrRecLoc> <bookingIdentifier> <referenceType>S</referenceType> <uniqueReference>1</uniqueReference> </bookingIdentifier> <language> <userPreferences> <codedLanguage>EN</codedLanguage> </userPreferences> </language> </Car\_RateInformationFromCarSegment>

## 5.5.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Car\_RateInformationFromCarSegmentReply xmlns="http://xml.amadeus.com/RCFSRR\_22\_2\_1A"> <rateDetails> <companyIdentification> <travelSector>CAR</travelSector> <companyCode>SX</companyCode> <companyName>SIXT</companyName> <accessLevel>CP</accessLevel> </companyIdentification> <sourceLevel> <selectionDetails> <option>P6</option> </selectionDetails> </sourceLevel> <termsAndConditions> <attributeDetails> <attributeType>PRE</attributeType> <attributeDescription>//termsandConditions\_ZE\_pup.txt</attributeDescription> <language>EN</language> </attributeDetails> </termsAndConditions> <mktText> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>MK</informationType> <companyId>1A</companyId> <encoding>1</encoding> </freeTextDetails> <freeText>provider text</freeText> </mktText> <rateDetailsInfo> <tariffInfo> <rateAmount>38.29</rateAmount> <rateCurrency>USD</rateCurrency> <rateType>DY</rateType> <rateAmountQualifier>RP</rateAmountQualifier> <rateChangeIndicator>QUO</rateChangeIndicator> </tariffInfo> <extraRateTypeInfo> <rateCategory>007</rateCategory> </extraRateTypeInfo> <associatedCharges> <chargeType>032</chargeType> <amount>.22</amount> </associatedCharges> <associatedCharges> <chargeType>034</chargeType> <quantity>250</quantity> </associatedCharges> <associatedCharges> <chargeType>008</chargeType> <amount>31.29</amount> </associatedCharges> <associatedCharges> <chargeType>009</chargeType> <amount>31.29</amount> </associatedCharges> <associatedCharges> <chargeType>XDK</chargeType> <amount>.22</amount> </associatedCharges> <associatedCharges> <chargeType>XHK</chargeType> <amount>.22</amount> </associatedCharges> <associatedCharges> <chargeType>80</chargeType> <quantity>200</quantity> </associatedCharges> <associatedCharges> <chargeType>82</chargeType> <quantity>200</quantity> </associatedCharges> <associatedCharges> <chargeType>COV</chargeType> <freeText>AER - COVERAGE TEXT 1</freeText> </associatedCharges> <associatedCharges> <chargeType>COV</chargeType> <freeText>CCP - COVERAGE TEXT 2</freeText> </associatedCharges> </rateDetailsInfo> <rateDetailsInfo> <tariffInfo> <rateAmount>38.29</rateAmount> <rateCurrency>USD</rateCurrency> <rateAmountQualifier>RB</rateAmountQualifier> </tariffInfo> <associatedCharges> <chargeType>NBD</chargeType> <amount>1</amount> </associatedCharges> <associatedCharges> <chargeType>NBH</chargeType> <amount>0</amount> </associatedCharges> </rateDetailsInfo> <rateDetailsInfo> <tariffInfo> <rateAmount>88.58</rateAmount> <rateCurrency>USD</rateCurrency> <rateAmountQualifier>904</rateAmountQualifier> </tariffInfo> </rateDetailsInfo> <dummy></dummy> <remarks> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>SI</informationType> <companyId>1A</companyId> <encoding>1</encoding> </freeTextDetails> <freeText>MUST RETURN TO REQUESTED CITY</freeText> <freeText>MUST INCLUDE QUALIFYING AWD NUMBER IN /CD- FIELD FEE MAY APPLY</freeText> </remarks> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>USD</currency> </tariffInfo> <chargeDetails> <type>COV</type> <amount>0</amount> <description>IBR</description> <periodType>001</periodType> <currency>USD</currency> <comment>AER - COVERAGE TEXT 1</comment> </chargeDetails> </taxSurchargeCoverageInfo> <additionalInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>SI</informationType> <companyId>1A</companyId> <encoding>1</encoding> </freeTextDetails> <freeText>COVERAGE TEXT 2</freeText> </additionalInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>USD</currency> </tariffInfo> <chargeDetails> <type>108</type> <amount>0</amount> <description>IBR</description> <periodType>004</periodType> <currency>USD</currency> <comment>VEH LIC COST RECVRY</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>USD</currency> </tariffInfo> <chargeDetails> <type>108</type> <amount>0</amount> <description>IBR</description> <periodType>004</periodType> <currency>USD</currency> <comment>AIRPORT FEE</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>USD</currency> </tariffInfo> <chargeDetails> <type>108</type> <amount>0</amount> <description>IBR</description> <periodType>004</periodType> <currency>USD</currency> <comment>TRANSACTION FEE</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <vehicleInfoGroup> <vehicleDetails> <vehicleCharacteristic> <vehicleTypeOwner>ACR</vehicleTypeOwner> <vehicleRentalPrefType>ECMR</vehicleRentalPrefType> </vehicleCharacteristic> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>SI</informationType> <companyId>1A</companyId> <encoding>1</encoding> </freeTextDetails> <carModel>REFER TO POLICY PAGE CPOZIXXX/VEH</carModel> </vehicleDetails> </vehicleInfoGroup> <pickupDropoffLocation> <locationCode> <locationType>176</locationType> <locationDescription> <code>CPY</code> <name>NCE\*</name> </locationDescription> </locationCode> <address> <addressDetails> <format>5</format> <line1>LYON ST EXUPERY AEROPORT</line1> </addressDetails> <city>COLOMBIER SAUGNIEU69125</city> <countryCode>FR</countryCode> </address> <openingHours> <businessSemantic>OCH</businessSemantic> <beginDateTime> <hour>7</hour> <minutes>0</minutes> </beginDateTime> <endDateTime> <hour>24</hour> <minutes>0</minutes> </endDateTime> </openingHours> <phone> <phoneOrEmailType>EML</phoneOrEmailType> <emailAddress>test@test.com</emailAddress> </phone> <phone> <phoneOrEmailType>PHO</phoneOrEmailType> <telephoneNumber> <telephoneNumber>49-1806-252525</telephoneNumber> </telephoneNumber> </phone> <phone> <phoneOrEmailType>FAX</phoneOrEmailType> <telephoneNumber> <telephoneNumber>49-1806-2229302426</telephoneNumber> </telephoneNumber> </phone> </pickupDropoffLocation> <pickupDropoffLocation> <locationCode> <locationType>DOL</locationType> <locationDescription> <code>CPY</code> <name>NCE\*</name> </locationDescription> </locationCode> <openingHours> <businessSemantic>OCH</businessSemantic> <beginDateTime> <hour>7</hour> <minutes>0</minutes> </beginDateTime> <endDateTime> <hour>24</hour> <minutes>0</minutes> </endDateTime> </openingHours> </pickupDropoffLocation> <rateCodeGroup> <rateCode> <fareCategories> <fareType>KAI</fareType> </fareCategories> </rateCode> <additionalInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>SI</informationType> <companyId>1A</companyId> <encoding>1</encoding> </freeTextDetails> <freeText>RENNES ATALANTE</freeText> </additionalInfo> </rateCodeGroup> </rateDetails> </Car\_RateInformationFromCarSegmentReply>

## 5.5.3 Possible Errors

See "Error Messages" section.

* * *

## 5.6 Operation: Rate Information With Optional Parameters

Request for rate information with optional parameters.

## 5.6.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Car\_RateInformationFromCarSegment xmlns="http://xml.amadeus.com/RCFSRQ\_22\_2\_1A"> <pnrRecLoc> <reservation> <companyId>1A</companyId> <controlNumber>YYLQOG</controlNumber> <controlType>P</controlType> </reservation> </pnrRecLoc> <bookingIdentifier> <referenceType>S</referenceType> <uniqueReference>1</uniqueReference> </bookingIdentifier> <categorySelection> <selectionDetails> <option>DEP</option> </selectionDetails> <otherSelectionDetails> <option>VEH</option> </otherSelectionDetails> <otherSelectionDetails> <option>LOC</option> </otherSelectionDetails> </categorySelection> </Car\_RateInformationFromCarSegment>

## 5.6.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Car\_RateInformationFromCarSegmentReply xmlns="http://xml.amadeus.com/RCFSRR\_22\_2\_1A"> <rateDetails> <companyIdentification> <travelSector>CAR</travelSector> <companyCode>SX</companyCode> <companyName>SIXT</companyName> <accessLevel>CP</accessLevel> </companyIdentification> <sourceLevel> <selectionDetails> <option>P6</option> </selectionDetails> </sourceLevel> <termsAndConditions> <attributeDetails> <attributeType>PRE</attributeType> <attributeDescription>//termsandConditions\_ZE\_pup.txt</attributeDescription> <language>EN</language> </attributeDetails> </termsAndConditions> <mktText> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>MK</informationType> <companyId>1A</companyId> <encoding>1</encoding> </freeTextDetails> <freeText>provider text</freeText> </mktText> <rateDetailsInfo> <tariffInfo> <rateAmount>38.29</rateAmount> <rateCurrency>USD</rateCurrency> <rateType>DY</rateType> <rateAmountQualifier>RP</rateAmountQualifier> <rateChangeIndicator>QUO</rateChangeIndicator> </tariffInfo> <extraRateTypeInfo> <rateCategory>007</rateCategory> </extraRateTypeInfo> <associatedCharges> <chargeType>032</chargeType> <amount>.22</amount> </associatedCharges> <associatedCharges> <chargeType>034</chargeType> <quantity>250</quantity> </associatedCharges> <associatedCharges> <chargeType>008</chargeType> <amount>31.29</amount> </associatedCharges> <associatedCharges> <chargeType>009</chargeType> <amount>31.29</amount> </associatedCharges> <associatedCharges> <chargeType>XDK</chargeType> <amount>.22</amount> </associatedCharges> <associatedCharges> <chargeType>XHK</chargeType> <amount>.22</amount> </associatedCharges> <associatedCharges> <chargeType>80</chargeType> <quantity>200</quantity> </associatedCharges> <associatedCharges> <chargeType>82</chargeType> <quantity>200</quantity> </associatedCharges> <associatedCharges> <chargeType>COV</chargeType> <freeText>AER - COVERAGE TEXT 1</freeText> </associatedCharges> <associatedCharges> <chargeType>COV</chargeType> <freeText>CCP - COVERAGE TEXT 2</freeText> </associatedCharges> </rateDetailsInfo> <rateDetailsInfo> <tariffInfo> <rateAmount>38.29</rateAmount> <rateCurrency>USD</rateCurrency> <rateAmountQualifier>RB</rateAmountQualifier> </tariffInfo> <associatedCharges> <chargeType>NBD</chargeType> <amount>1</amount> </associatedCharges> <associatedCharges> <chargeType>NBH</chargeType> <amount>0</amount> </associatedCharges> </rateDetailsInfo> <rateDetailsInfo> <tariffInfo> <rateAmount>88.58</rateAmount> <rateCurrency>USD</rateCurrency> <rateAmountQualifier>904</rateAmountQualifier> </tariffInfo> </rateDetailsInfo> <dummy></dummy> <remarks> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>SI</informationType> <companyId>1A</companyId> <encoding>1</encoding> </freeTextDetails> <freeText>MUST RETURN TO REQUESTED CITY</freeText> <freeText>MUST INCLUDE QUALIFYING AWD NUMBER IN /CD- FIELD FEE MAY APPLY</freeText> </remarks> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>USD</currency> </tariffInfo> <chargeDetails> <type>COV</type> <amount>0</amount> <description>IBR</description> <periodType>001</periodType> <currency>USD</currency> <comment>AER - COVERAGE TEXT 1</comment> </chargeDetails> </taxSurchargeCoverageInfo> <additionalInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>SI</informationType> <companyId>1A</companyId> <encoding>1</encoding> </freeTextDetails> <freeText>COVERAGE TEXT 2</freeText> </additionalInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>USD</currency> </tariffInfo> <chargeDetails> <type>108</type> <amount>0</amount> <description>IBR</description> <periodType>004</periodType> <currency>USD</currency> <comment>VEH LIC COST RECVRY</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>USD</currency> </tariffInfo> <chargeDetails> <type>108</type> <amount>0</amount> <description>IBR</description> <periodType>004</periodType> <currency>USD</currency> <comment>AIRPORT FEE</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>USD</currency> </tariffInfo> <chargeDetails> <type>108</type> <amount>0</amount> <description>IBR</description> <periodType>004</periodType> <currency>USD</currency> <comment>TRANSACTION FEE</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <vehicleInfoGroup> <vehicleDetails> <vehicleCharacteristic> <vehicleTypeOwner>ACR</vehicleTypeOwner> <vehicleRentalPrefType>ECMR</vehicleRentalPrefType> </vehicleCharacteristic> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>SI</informationType> <companyId>1A</companyId> <encoding>1</encoding> </freeTextDetails> <carModel>REFER TO POLICY PAGE CPOZIXXX/VEH</carModel> </vehicleDetails> </vehicleInfoGroup> <pickupDropoffLocation> <locationCode> <locationType>176</locationType> <locationDescription> <code>CPY</code> <name>NCE\*</name> </locationDescription> </locationCode> <address> <addressDetails> <format>5</format> <line1>LYON ST EXUPERY AEROPORT</line1> </addressDetails> <city>COLOMBIER SAUGNIEU69125</city> <countryCode>FR</countryCode> </address> <openingHours> <businessSemantic>OCH</businessSemantic> <beginDateTime> <hour>7</hour> <minutes>0</minutes> </beginDateTime> <endDateTime> <hour>24</hour> <minutes>0</minutes> </endDateTime> </openingHours> <phone> <phoneOrEmailType>EML</phoneOrEmailType> <emailAddress>test@test.com</emailAddress> </phone> <phone> <phoneOrEmailType>PHO</phoneOrEmailType> <telephoneNumber> <telephoneNumber>49-1806-252525</telephoneNumber> </telephoneNumber> </phone> <phone> <phoneOrEmailType>FAX</phoneOrEmailType> <telephoneNumber> <telephoneNumber>49-1806-2229302426</telephoneNumber> </telephoneNumber> </phone> </pickupDropoffLocation> <pickupDropoffLocation> <locationCode> <locationType>DOL</locationType> <locationDescription> <code>CPY</code> <name>NCE\*</name> </locationDescription> </locationCode> <openingHours> <businessSemantic>OCH</businessSemantic> <beginDateTime> <hour>7</hour> <minutes>0</minutes> </beginDateTime> <endDateTime> <hour>24</hour> <minutes>0</minutes> </endDateTime> </openingHours> </pickupDropoffLocation> <rateCodeGroup> <rateCode> <fareCategories> <fareType>KAI</fareType> </fareCategories> </rateCode> <additionalInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>SI</informationType> <companyId>1A</companyId> <encoding>1</encoding> </freeTextDetails> <freeText>RENNES ATALANTE</freeText> </additionalInfo> </rateCodeGroup> </rateDetails> </Car\_RateInformationFromCarSegmentReply>

## 5.6.3 Possible Errors

See "Error Messages" section.

* * *