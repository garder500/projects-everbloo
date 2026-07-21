---
url: "https://developers.amadeus.com/api-library/soap/functional-doc/70/doc-read/141481?serviceVersion=24.6"
download_url: "https://developers.amadeus.com/PAS-EAS/api/download/comp/4d4ad2cb456c02633f463a055ab70584/141481/UG_WBS_Car_RateInformationFromAvailability_RCFARQ_24.6_002.html"
title: "HTML_UG_WBS_Car_RateInformationFromAvailability_RCFARQ_24.6_002"
source: "amadeus"
service_id: "70"
service_name: "Car_RateInformationFromAvailability"
version: "24.6"
document_id: "141481"
doc_version: "24.6"
doc_type: "User guide"
file_format: "HTML"
scraped_at: "2026-07-15T10:18:50.953Z"
---
# Function: Car\_RateInformationFromAvailability

* * *

## 1 Overview

The "Rate Information From Availability" functionality allows the user to access information linked to a Car rate,previously retrieved from a Multi or Single availability response.  
  
There are several types  of Rate Information from Availability:

-   Rules:information associated to a rate (for example: Rate, Tax, Surcharges  etc )
-   Policies:information associated to the Car Provider location (for example: Location address, Vehicle type information, Advance payment etc ).
-   Terms and conditions:  the provider legal terms of sale which is independent of the rate related terms covered by the rules.
-   Optional extras: additional purchasable products related to the car rental (for instance: car rental insurances offered by third companies).

**Please note that starting from 20.3 version, the user must implement the new structure of the rate details which is introduced in the " Operation: Rate information with customer information" section.**

## 1.1 Supported Operations

Several operations are possible with this message. These operations are described in detail in the Operations section in this document:

-    Rate information for Corporate rate
-    Rate information for Leisure rates
-    Rate Information for one way rate
-    Rate information with customer information
-    Rate Information with Section filter
-    Rate Information with specified language and terms and conditions returned
-    Rate Information with pre-payable amount
-    Rate Information with total commissionable amount
-    Rate information with rate breakdown 

## 1.2 Limitations

Not applicable.

## 1.3 Unsupported Operations

Not applicable.

## 1.4 Prerequisites

The WBS customer has to be signed-In into Amadeus. For this purpose, all the credentials should have been obtained from Amadeus Webservices team and then, webservice Security\_Authenticate, part of "Security" package (see associated documentation), should be used and successfully achieved, in order to open a Webservices session.

A Car\_Availability should be performed and the Car\_AvailabilityReply kept in the context of WBS customer. In this reply, at least one rate should be successfully returned.

## 2 Building A Query

Following a Car\_Availability response, a WBS customer can use this verb to request additional car rate information.

Please note than the rates obtained in the Car\_Availability response are guaranteed for 5 minutes. After that period of time, those rates are not guaranteed anymore.

In order to build the query, the WBS customer can use the parameters listed below. The use of some of these parameters (marked with '\*') are mandatory in every single query.

Note than, although some parameters are not mandatory in the query structure, if the WBS customer wants to have the same price and rate characteristics obtained in the availability response, he must use the same information the provider is replying in the availability to fill the appropiate parameters in the **Car\_RateInformationFromAvailability** query (for example, the CD number). Not keeping this information may result in another rate returned by the provider in the **Car\_RateInformationFromAvailability** reply:

-   Rate access level (value P6) (\*)
-   Pickup date and time (\*)
-   Pickup location code (\*)
-   Dropoff location code (\*)
-   Dropoff date and time (\*)
-   Car company code (\*)
-   Vehicle type (\*)
-   Rate code(\*)
-   Rate plan (\*)
-   Rate identifier (\*)
-   Booking source
-   Loyalty numbers:
    -   Corporate discount number (CD)
    -   CustomerID number (ID)
    -   PromotionalCode (PC)
    -   Inclusive Tour (IT)

-   Rate category (Rate Category 11 is reserved for fully inclusive rates)
-   Category selection detail
-   Currency conversion
-   Language
-   Country of residence of the driver
-   Driver information

These sections are explained in detail in the next chapters.

  
When using the  Car\_RateInformationFromAvailability for fully inclusive rates (leisure), the rate category 11 must be used.

-   All amounts are displayed by default in the currency of the booking source location (Agent Sine in and Office Profile). But additionally, the WBS customer can request for a currency conversion, in that case the conversion is done by Amadeus (for information purpose only) but a virtual effective reservation will always be done in the currency defined by the car provider.

## 2.1 Sub Structure: Booking source

## 2.1.1 Description

This parameter is optional, and it can be used by the WBS customer to indicate the booking source . The booking source is a way to access customer rates. All car providers identify an agency with the booking source. Booking source is the IATA number if the agency is affiliated to IATA. By default the Booking source is automatically extracted from the office profile, however for non IATA affiliated customer, each car provider gives a "pseudo" IATA code to identify them, in this case this information needs to be entered in the message in the Additional Business Source Information. This information could be entered at generic level for all providers or specifically for each provider requested.

This value must have 8 digits.

## 2.1.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<bookingSource> <originatorDetails> <originatorId>12345675</originatorId> </originatorDetails> </bookingSource>

## 2.2 Sub Structure: Category selection

## 2.2.1 Description

A 'Category selection' parameter is available for WBS customers to request information of only certain categories amongst the following list. If no concrete category is requested, all the categories listed below (when existing) will be returned. If the WBS customer especifies any of these category types (up to three categories), only the selected ones will be returned:

**Keywords**

**Name**

**Description**

RAT

Rate Information

The rate information including the estimated rate section and the plan rate / extra day / extra hour rates if applicable.

TAX

Tax Information

Information as to whether TAX is already included in the rate or what the rate of tax will be.

SUR

Surcharge Information

Information regarding any surcharges that are applicable to the rate.

COV

Coverage Information

Information on what possible coverage is available for the rental if made (e.g. PER DAY or PER WEEK).

CPN

Coupon Information

Information related to the promotional Code if applicable.

013

Special Equipment Information

Information regarding any special equipment.

DCI

Delivery and Collection information

Information regarding delivery and collection.

VEH

Vehicle Types

Description of the car that will be provided (e.g. GEO METRO or similar).

ADP

Advance Payment Information

Information on the type of advance payment required and a date limit for payment reception by the vendor.

ADV

Advance Booking Information

Advance booking requirements in days or hours as applicable.

GUA

Guarantee Information

Information on guarantee requirements that exist.

DEP

Deposit Information

Specific deposit information on the rate, if applicable.

RCD

Rate Code Information

Description of the rate code of the displayed rate.

LOC

Location Information

Address and hours of operation for the displayed location.

PUP

Pickup Information

Specific pickup information, if applicable to the rate.

POL

Policy/No Show Fee Information

Specific policy or no show fee information for either the location or the car type or the rate, if applicable.

ONW

One Way Information

One-way rental, or inter-city information applicable to the displayed rate.

RMK

Remarks

Textual remarks.

## 2.2.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<categorySelection> <selectionDetails> <option>COV</option> </selectionDetails> <otherSelectionDetails> <option>SUR</option> </otherSelectionDetails> </categorySelection>

## 2.3 Sub Structure: Company code

## 2.3.1 Description

Used to determine the car company. This parameter has four different elements, some mandatory (marked with '\*') and other optional:

-   Indutry sector (\*) : Always with value 'CAR'
-   Company code (\*): Two character with the company reference code
-   Company name

## 2.3.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<companyDetails> <travelSector>CAR</travelSector> <companyCode>ZE</companyCode> <companyName>HERTZ</companyName> </companyDetails>

## 2.4 Sub Structure: Country of residence

## 2.4.1 Description

This parameter is optional, and it can be used by the WBS customer to indicate the country - and, in case the latter is United States of America or Canada, the state - of residence of the driver. If this information is provided, the available optional coverages are returned in the Car\_RateInformationFromAvailability reply.

Both country and state must be specified as their 2-letters code representation. The qualifier for state code is 84.

## 2.4.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<addressInfo> <countryCode>US</countryCode> <regionDetails> <code>AK</code> <qualifier>84</qualifier> </regionDetails> </addressInfo>

## 2.5 Sub Structure: Currency conversion

## 2.5.1 Description

All amounts are displayed by default in the currency of the booking source location (Agent Sine in and Office Profile). But additionally, the WBS customer can request for a currency conversion, in that case the conversion is done by Amadeus (for information purpose only) but a virtual effective reservation will always be done in the currency defined by the car provider. In the reply, the WBS customer will recieve the converted and the original currency/amount for the Estimated total/Rate Plan and Charges

To perform this conversion, two parameters must be specified:

-   Usage qualifier:
    -   1 (Charge payment currency)
    -   2 (Reference currency)
    -   3 (Target currency)
    -   4 (Transport document currency)
    -   5 (Calculation base currency)
    -   6 (Information Currency)
    -   7 (Currency of the account)

-   Currency ISO code: 3 characters

Below the WBS customer can find an example of XML subset to request the currency conversion.

## 2.5.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<currency> <currencyDetails> <currencyQualifier>2</currencyQualifier> <currencyIsoCode>EUR</currencyIsoCode> </currencyDetails> </currency>

## 2.6 Sub Structure: Dates and times

## 2.6.1 Description

Both pick up and drop off times are mandatory. The dates parameter can be used to specify different time periods, depending on the information associated to the rate that the WBS customer wishes to obtain. TO indicate this, the WBS customer can choose between the differen options:

-   BED    (Begining and Ending Date)
-   OCH    (Opening and Closing hours)
-   PDA    (Pickup and Drop-off Date and Time)
-   PKT    (Early and Late Pickup time)
-   RTT    (Early and Late Return time)

The dates must follow this format:

-   Year number (4 digits)
-   Month number (up to two digits, beggining with the value '1')
-   Day number (up to two digits, beggining with the value '1')

The times must follow this format:

-   Hour (values between 0 and 23)
-   Minutes (values between 0 and 59)

## 2.6.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pickupDropoffTimes> <businessSemantic>PDA</businessSemantic> <beginDateTime> <year>2012</year> <month>8</month> <day>2</day> <hour>9</hour> <minutes>0</minutes> </beginDateTime> <endDateTime> <year>2012</year> <month>8</month> <day>14</day> <hour>14</hour> <minutes>0</minutes> </endDateTime> </pickupDropoffTimes>

## 2.7 Sub Structure: Driver information

## 2.7.1 Description

This option allows the WS customer to include the driver age in the Rate information request. As a result, car providers will return appropriate rate information based on this criteria.

-   The age value has to be the age of the driver on the day of the pick-up date of the car rental. Please think of indicating this specificity when building the user interface.
-   This field only accepts the actual age (numeric and within the range 14 to 99, both inclusive). Example: 25

If a provider does not support this functionality, the driver age information will not be sent to the provider. 

The field to be used is the driverInfo/extraPassengerInfo/age.

The node driverInfo/birthdate should **NOT** be used and it will have no effect if customer used this field.

## 2.7.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<driverInfo> <extraPassengerInfo> <age>25</age> </extraPassengerInfo> </driverInfo>

## 2.8 Sub Structure: Language

## 2.8.1 Description

This option allows to request  the language  in which parts of the response will be  returned. If the language code is specified:

\- the terms and conditions that apply to the rate will be returned in the requested language (if they exist) otherwise they will be returned in the default language (English)

## 2.8.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<language> <userPreferences> <languagecode>EN</languagecode> </userPreferences> </language>

## 2.9 Sub Structure: Location data

## 2.9.1 Description

For the pick up and the drop off location (if needed to be especified in the query), you can select between:

-   Amadeus Location code or IATA code (1A)
-   Company Location Reference (CPY)

Note than for CPY codes, you must the character '\*' must be always present at the end of the code.

To indicate that the type of location, the WBS customer has to indicate it using the following codes:

-   176 (pick up location)
-   DOL (drop off location)

The pick up location is always mandatory, but if the drop off location is the same than the pick up one, it can be ommited in the request.

## 2.9.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pickupDropoffLocs> <locationType>176</locationType> <locationDescription> <code>1A</code> <name>NCE</name> </locationDescription> </pickupDropoffLocs>

## 2.10 Sub Structure: Loyalty numbers

## 2.10.1 Description

The WBS customer has the option to introduce different loyalty numbers when building the query. To do so, he must indicate the type of loyalty number (from the list below) together with its value:

-   1 for ID (customer number)
-   CD for CD (customer discount number)
-   PC for PC (promotional code)
-   11 for IT (Inclusive Tour)

The first loyalty number must be inside the tag 'customerReferences', the following ones must use the tag 'otherCustomerRef' as in the example below.

## 2.10.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<customerInfo> <customerReferences> <referenceQualifier>CD</referenceQualifier> <referenceNumber>123456</referenceNumber> </customerReferences> <otherCustomerRef> <referenceQualifier>PC</referenceQualifier> <referenceNumber>123456</referenceNumber> </otherCustomerRef> </customerInfo>

## 2.11 Sub Structure: Rate code

## 2.11.1 Description

Used to set the rate code obtained in the availability response.

## 2.11.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<rateCodeInfo> <fareCategories> <fareType>WST3FR</fareType> </fareCategories> </rateCodeInfo>

## 2.12 Sub Structure: Rate information (type, plan indicator, category)

## 2.12.1 Description

This element is used to set the values related to the rate obtained in the Car\_Availability response. It is mainly composed by three parameters:

-   Rate type: A unique rate product identifier (up to 128 alphanumeric characters). Its use is mandatory when returned by Amadeus.
-   Rate plan indicator: To specify a rate plan. Its use is mandatory. The value must be taken from the previous Car\_AvailabilityReply. The codeset in the Car\_RateInformationFromAvailability query differs from the codeset used in the Car\_Availavility response, so below is listed the codes and their correspondence in a table:

Rate plan  

Car\_Availability  

Car\_RateInformationFromAvailability  

Daily  

003  

DY  

Week-end  

005  

WD  

Weekly  

006  

WY  

Monthly

004  

MY  

-   Rate category: Its use in conditional. To be used in case it was used in the Car\_Availabiliy request. It can be one of the following list.
    -   002 - Inclusive
    -   006 - Convention
    -   007 - Corporate
    -   009 - Government
    -   011 - Package (to be used with leisure rates)
    -   019 - Association
    -   020 - Business
    -   021 - Consortium
    -   022 - Credential
    -   023 - Industry
    -   024 - Standard
    -   G     - General

## 2.12.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<rateInfo> <tariffInfo> <rateType>T6IU6S0Q01</rateType> <ratePlanIndicator>DY</ratePlanIndicator> </tariffInfo> <rateInformation> <category>024</category> </rateInformation> </rateInfo>

## 2.13 Sub Structure: Rate source access level

## 2.13.1 Description

When using the **Car\_RateInformationFromAvailability** for a Complete Access Plus provider, the option P6 must be used.

## 2.13.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<rateSource> <selectionDetails> <option>P6</option> </selectionDetails> </rateSource>

## 2.14 Sub Structure: Vehicle type

## 2.14.1 Description

The information related with the vehicle type must be present in every query. The parameters, all mandatory, are the following:

-   Type option qualifier: used to qualify the vehicle type selection option. Values:
    -   VT (vehicle type)
    -   VTA (vehicle type - ALL)
-   Type owner: owner of the type code. Its value is always 'ACR'
-   PreferredRentalType: code of the vehicle type (4 characters)

## 2.14.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<vehicleInformation> <vehTypeOptionQualifier>VT</vehTypeOptionQualifier> <vehicleRentalNeedType> <vehicleTypeOwner>ACR</vehicleTypeOwner> <vehicleRentalPrefType>CDMR</vehicleRentalPrefType> </vehicleRentalNeedType> </vehicleInformation>

## 3 Receiving A Reply

  
When receiving a Car\_RateInformationFromAvailability reply, the WBS customer can obtain an error message. If such message is received, it will be at the beginning of the reply. This error message is composed by an error code number (mandatory), and optionally by an error type code:

-   EC (Error Code)
-   WEC (Warning code)
-   WZZ (Mutually defined warning)
-   ZZZ (Mutually defined)

The rest of significant information coming in the response is described in the following subchapters.

## 3.1 Sub Structure: Attributes related to optional extra

## 3.1.1 Description

Additional information (attributes) related to a specific product (optional extra) may be returned, especially for insurance products. This information might be composed of policy wordings (in case of insurances), terms and conditions for the corresponding product, marketing text associated to the product, logo of the company providing it, etc. Specifically for third-party insurance products, an Offer Identifier might be returned, which uniquely identifies the returned quotation and allows the insurance purchase.

The information can be provided as free text, a URL or an ID.

## 3.1.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<productAttributes> <attributeFunction>PID</attributeFunction> <attributeDetails> <attributeType>TEXT</attributeType> <attributeDescription>Policy wording</attributeDescription> <language>EN</language> </attributeDetails> </productAttributes>

* * *

## 3.2 Sub Structure: CO2 Emission Offset

## 3.2.1 Description

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

## 3.2.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<greenhouseGasFootprint> <greenhouseGas> <constituantGas> <gasCode>CO2</gasCode> <value>17</value> <unit>K</unit> </constituantGas> <estimatedDistance> <distance>1000</distance> <distanceMeasure>G</distanceMeasure> </estimatedDistance> </greenhouseGas> </greenhouseGasFootprint> <greenhouseGasFootprint> <greenhouseGas> <constituantGas> <gasCode>CO2</gasCode> <value>37.5</value> <unit>L</unit> </constituantGas> <estimatedDistance> <distance>621</distance> <distanceMeasure>M</distanceMeasure> </estimatedDistance> </greenhouseGas> </greenhouseGasFootprint>

* * *

## 3.3 Sub Structure: Company code

## 3.3.1 Description

The structure of this element is the same as the descibed in the subchapter present in the 'Building a query' chapter.

## 3.3.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

* * *

## 3.4 Sub Structure: Dates and times

## 3.4.1 Description

The structure and codesets of this element is the same as the one described in the subchapter present in the 'Building a query' chapter.

In the response, this element can be found:

-   Associated to a rule
-   Associated to a location (to determine the opening and closing hours)

Below there is an example of the opening and closing hours of a location.

## 3.4.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<openingHours> <businessSemantic>OCH</businessSemantic> <beginDateTime> <hour>6</hour> <minutes>30</minutes> </beginDateTime> <endDateTime> <hour>24</hour> <minutes>0</minutes> </endDateTime> </openingHours>

* * *

## 3.5 Sub Structure: Free text information

## 3.5.1 Description

Used to return any additional information of:

-   The error message
-   Marketing test
-   Remarks corresponding to the rule information
-   The tax, surchage or coverage section
-   Additional vehicle information
-   Rate code information

The free text information has three mandatory elements:

text subject qualifier:

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

-   Free text (up to 70 characters)

Additionally, some other parameters may come  inside this information:

-   Information type:

MK

Marketing text

OS

Other Services Messages

SI

Supplementary information

-   CompanyID:

1A  

Amadeus  

7CC  

Industry Car Rental Companies  

7HH  

Industry Hotel Chains  

-   Language: ISO 3characters language code

-   Source:

F  

CRS Floor Limit  

M  

Manual  

S

Link

Below there is an example of additional information of the rate code.

## 3.5.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<rateCodeGroup> <rateCode> <fareCategories> <fareType>JIL3GL</fareType> </fareCategories> </rateCode> <additionalInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>SI</informationType> <companyId>1A</companyId> <encoding>1</encoding> </freeTextDetails> <freeText>STD UNLIMITED</freeText> </additionalInfo> </rateCodeGroup>

* * *

## 3.6 Sub Structure: Fuel policies

## 3.6.1 Description

This section describes how the fuel policies would be presented inside web services response (RCFARR). The fuel policies are returned only if car rental provider indicated a valid type of fuel policies defined in Amadeus database.

The fuel policies are special types of surcharges, they appear under XML node - taxCovSurchargeGroup, with the type 108 meaning surcharges.

In the description (XML node comment) of this surcharge, the fuel policies are identified with a parent flag FUL for fuel policies. There's a sub flag indicating the specific type of the fuel policy applicable to the current car rate (cf. below table). The thrid part of the description corresponds to the description of this type of fuel policy.

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

## 3.6.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>108</type> <amount>0.00</amount> <description>IBR</description> <periodType>004</periodType> <currency>EUR</currency> <comment>FUL - FTF - FULL TO FULL</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup>

* * *

## 3.7 Sub Structure: Location address

## 3.7.1 Description

The element in the response where where the information related to the address details is composed by the next mandatory values:

-   format code:

1

Street name followed by number

2

Number, road type, road name in this sequence

3

Road type, road name, number in this sequence

4

Post office box

5

Unstructured address

6

Street name followed by number, building, suite

7

Rural route number

8

Post office drawer number

9

Building name followed by suite

-   line1: address line 1 (up to 70 characters)

And the next optional values:

-   line2: address line 2 (up to 70 characters)
-   city name: up to 35 characters
-   zip code: up to 17 characters
-   regionDetails: state or province code (up to 9 characters)

## 3.7.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<address> <addressDetails> <format>5</format> <line1>TERMINALS 1 AND 4</line1> </addressDetails> <city>MADRID 28042</city> <countryCode>ES</countryCode> </address>

* * *

## 3.8 Sub Structure: Location data

## 3.8.1 Description

The structure of this element is the same as the descibed in the subchapter present in the 'Building a query' chapter.

## 3.8.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

* * *

## 3.9 Sub Structure: Location phone

## 3.9.1 Description

For the location offices, the phone number is returned in this element. The data structure is the following:

-   phoneOrEmailType: with values PHO (phone number) or FAX (fax number) or EML (email address)
-   telephoneNumber: up to 25 characters

## 3.9.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<phone> <phoneOrEmailType>EML</phoneOrEmailType> <emailAddress>test@test.com</emailAddress> </phone> <phone> <phoneOrEmailType>PHO</phoneOrEmailType> <telephoneNumber> <telephoneNumber>49-1806-252525</telephoneNumber> </telephoneNumber> </phone> <phone> <phoneOrEmailType>FAX</phoneOrEmailType> <telephoneNumber> <telephoneNumber>49-1806-2229302426</telephoneNumber> </telephoneNumber> </phone>

* * *

## 3.10 Sub Structure: Optional information: Accepted Form of Payment

## 3.10.1 Description

Car provider may return Accepted Form of Payment for a given rate in a structured format. This information is encoded in _OTA\_VehRateRuleRS/RateRules/PaymentRules/AcceptablePayments/AcceptablePayment/CreditCardCode_. The following elements can be encoded:

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

This Attribute is expected to be populate with the 2 character code (<Value>) of the card issuer name.

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

-   There is **NOT attribute** to debit card, in that case will be used CreditCardCode to convey this information for both, credit and debit cars. Using the PaymentTypeCode to define the information if it is credit or debit card
-   As RuleType element is mandatory at _OTA\_VehRateRuleRS/RateRules/PaymentRules_ the provider will always use RuleType 3 from the OTA Code List RUL to convey the Accepted Form of Payment

## 3.10.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<RateRules> <PaymentRules> <PaymentRule RuleType="3"></PaymentRule> <AcceptablePayments PaymentTypeCode="1"> <AcceptablePayment></AcceptablePayment> </AcceptablePayments>> <AcceptablePayments PaymentTypeCode="5"> <AcceptablePayment CreditCardCode="VI"></AcceptablePayment> <AcceptablePayment CreditCardCode="MC"></AcceptablePayment> <AcceptablePayment CreditCardCode="AX"></AcceptablePayment> <AcceptablePayment CreditCardCode="DS"></AcceptablePayment> </AcceptablePayments> </PaymentRules> </RateRules>

* * *

## 3.11 Sub Structure: Optional information: cancellation policies

## 3.11.1 Description

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

## 3.11.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<rateDetails> <otherRulesGroup> <otherRules> <ruleDetails> <type>CAN</type> <quantity>3</quantity> <quantityUnit>3</quantityUnit> <currency>EUR</currency> <description1>This is a free text</description1> <percentage>20.00</percentage> <paymentType>1</paymentType> </ruleDetails> <ruleDetails> <type>CAN</type> <quantity>3</quantity> <quantityUnit>3</quantityUnit> <amount>20.00</amount> <currency>EUR</currency> <description1>This is a free text</description1> <paymentType>1</paymentType> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>CAN</type> <quantity>3</quantity> <quantityUnit>3</quantityUnit> <amountQualifier>36</amountQualifier> <currency>USD</currency> <description1>This is a free text</description1> <percentage>20.00</percentage> <paymentType>1</paymentType> </ruleDetails> <ruleDetails> <type>CAN</type> <quantity>3</quantity> <quantityUnit>3</quantityUnit> <amount>23.00</amount> <amountQualifier>36</amountQualifier> <currency>USD</currency> <description1>This is a free text</description1> <paymentType>1</paymentType> </ruleDetails> </otherRules> </otherRulesGroup> </rateDetails>

* * *

## 3.12 Sub Structure: Optional information: Form of guarantee required

## 3.12.1 Description

If car provider specifies that a form of guarantee will be required to perform the car booking, this information will be found in otherRulesGroup.

<otherRulesGroup\>

  <otherRules\>

    <ruleDetails\>

      <type>FGR</type>

    </ruleDetails\>

  </otherRules\>

</otherRulesGroup\>

If car provider also specifies the type of form of guarantee supported, the qualifier node will be returned, and otherRulesGroup might be repeated for all the types that will be supported (cf. example in XML structure section).

Here following is the mapping specific to form of guarantee:

**Value**

**Description**

907

Credit card is a valid form of guarantee for current rate

908

Booking source is a valid form of guarantee for current rate

909

Flight number is a valid form of guarantee for current rate

To filter out those rates or to display only those rates, please refer to following section in "Building a query" of car availability message: _Optional information: Guarantee and Advanced Payment Filter_

## 3.12.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<otherRulesGroup> <otherRules> <ruleDetails> <type>FGR</type> <qualifier>907 or 908 or 909</qualifier> </ruleDetails> </otherRules> </otherRulesGroup>

* * *

## 3.13 Sub Structure: Rate code

## 3.13.1 Description

The structure of this element is the same as the descibed in the subchapter present in the 'Building a query' chapter.

## 3.13.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

* * *

## 3.14 Sub Structure: Rate details (estimated total and base, plan, negotiatied rates)

## 3.14.1 Description

-   Pre-payable amount: on  customer request , the pre payable amount can be returned . However, specific settings are needed beforehand for the WBS customer office or WSAP.The prepayable amount will be returned under the same format as estimated total and base rate , yet with the indicator :

PPA

Pre payable amount  

The amount is calculated by Amadeus system , based on car provider response and specific rules defined at provider and market level. This amount could be then used in the sell request as voucher value  and via the voucher issue command the car provider would be notified that the end user has payed to the WBS customer and  he will not have to pay at the counter when picking up the car (or will have to pay a  remaining amount). The pre-payable amount will always be return in the original currency that the car provider is returning- no currency conversion will be applied by Amadeus.

These segments are used to show the details for up to 4 rate types:

-   Estimated Total (estimated total price of the booking)
-   Base Rate (the base rate excludes taxes, surcharges for special equipment, insurance coverage and any additional charges that may apply)
-   Plan Rate (Default rate returned by the car providers when the customer does not have any particular deal with them, present if the rate is not negotiated)
-   Negotiated Rate (Usually they are discounted public rates, the Web Service customer has a special agreement with the car provider)

The structure of this segment is the following:

-   Rate Amount

-   Rate Currency code (3 characters)

-   Rate Type:

2

Base/bundled

3

Total

4

Package

5

Inclusive

6

Subtotal

DY

Daily

MY

Monthly

WD

Weekend

WY

Weekly

-   Rate Amount Qualifier:

904

Estimated total amount information

NE

Negotiated Rate

RB

Base Rate

RP

Plan Rate

TCA

Total Commissionable Amount

-   Rate Converted Qualifier:  
      
    
    4
    
    currency converted
    
-   Rate change indicator:

GUA

Guarantee

QUO

Quoted

-   Rate Category:

002

Inclusive

006

Convention

007

Corporate

009

Government

011

Package

019

Association

020

Business

021

Consortium

022

Credential

023

Industry

024

Standard

G

General

Appart of them, it is possible to obtain associated extra charge details for the rate, in that case the following elements can be present in the response:

-   Charge Type:

ID

Description

Additional Info

108

Surcharge

  

113

Prepayment

  

31

Per mile

Cost per extra mile

32

Per kilometre

Cost per extra Km.  

33

Free miles

Unlimited miles

34

Free kilometres

Unlimited Km.

45

Tax

  

79

Extra day free miles

Unlimited miles in extra day

8

Extra day

Cost per extra day  

80

Extra day free kilometres

Unlimited Km. in extra day

81

Extra hour free miles

Unlimited miles in extra day

82

Extra hour fee kilometres

Unlimited Km. in extra hour  

9

Extra hour

Cost per extra hour  

COV

Coverage

  

NBD

Number of days

  

NBH

Number of hours

  

XDK

Extra day mileage charge (km)

Cost per extra Km. in extra day  

XDM

Extra day mileage charge (miles)

Cost per extra miles in extra day

XHK

Extra hour mileage charge (km)

Cost per extra Km. in extra hour

XHM

Extra hour mileage charge (miles)

Cost per extra miles in extra hour

TCA

Total Commissionable Amount

216

Month amount

base rate breakdown per month

217

Week amount

base rate breakdown per week

218

Day amount

base rate breakdown per day

219

Hour amount

base rate breakdown per hour

-   Amount
-   Amount Qualifier:

UNL  

unlimited quantity (Mileage)

INC  

included in estimated total  
(Surcharge, Tax, Coverage)

-   Quantity: Quantity (if applicable)
-   Charge Period Type Code:

1

Per day

2

Per week

3

Per month

4

Per rental

5

Per hour

K

Kilometer

M

Miles

-   Free text: Charge name (up to 55 characters)

## 3.14.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<rateDetailsInfo> <tariffInfo> <rateAmount>133.99</rateAmount> <rateCurrency>EUR</rateCurrency> <rateType>DY</rateType> <rateAmountQualifier>RP</rateAmountQualifier> <rateChangeIndicator>GUA</rateChangeIndicator> </tariffInfo> <associatedCharges> <chargeType>034</chargeType> <amountQualifier>UNL</amountQualifier> </associatedCharges> <associatedCharges> <chargeType>108</chargeType> <amount>265.00</amount> <freeText>ONE WAY CHARGE</freeText> </associatedCharges> <associatedCharges> <chargeType>108</chargeType> <amount>7.80</amount> <freeText>VEHICLE LICENSING FEE AND ROAD TAX</freeText> </associatedCharges> <associatedCharges> <chargeType>108</chargeType> <amount>33.50</amount> <freeText>LOCATION SERVICE CHARGE</freeText> </associatedCharges> <associatedCharges> <chargeType>COV</chargeType> <amount>23.82</amount> <freeText>TP - THEFT PROTECTION</freeText> </associatedCharges> <associatedCharges> <chargeType>COV</chargeType> <amount>55.17</amount> <freeText>CDW - COLLISION DAMAGE WAIVER</freeText> </associatedCharges> <associatedCharges> <chargeType>045</chargeType> <amount>154.31</amount> <freeText>TAX</freeText> </associatedCharges> </rateDetailsInfo>

* * *

## 3.15 Sub Structure: Rate source access level

## 3.15.1 Description

The structure of this element is the same as the descibed in the subchapter present in the Building a query chapter.

## 3.15.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

* * *

## 3.16 Sub Structure: Rule information

## 3.16.1 Description

In this structure, the WBS customer obtains the rules details applied to the requested rate in the Car\_RateInformationAfterAvailability request.

Each rule has one mandatory element, the ruleDetails, composed by:

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

-   Currency: Currency identification code

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

This <ruleDetails\> element can appear replicated with more information for some rates (as shown in the example below.

Additionally, some explanation text can come associated to the rule in the tag 'ruleText'. This tag is composed by two mandatory fields:

-   Text type (mandatory):

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

## 3.16.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>01</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> <ruleDetails> <type>GUA</type> <qualifier>907</qualifier> </ruleDetails> </otherRules> <otherRules> <ruleDetails> <type>DEP</type> <quantity>0</quantity> <quantityUnit>3</quantityUnit> <qualifier>BRE</qualifier> <amount>891.32</amount> <currency>EUR</currency> </ruleDetails> <ruleText> <textType>DEP</textType> <freeText>DEPOSIT WILL BE REQUIRED AT PICK UP TIME</freeText> </ruleText> </otherRules> </otherRulesGroup>

* * *

## 3.17 Sub Structure: Tax Surcharge Coverage Information

## 3.17.1 Description

<taxSurchargeCoverageInfo\> is used to return explicit information about Tax, Coverage, Coupon, Surcharge, Specific equipment, Delivery and Collection or, only if the country of residence of the driver was specified in the query (please refer to section "Country of residence" of "Building a reply" chapter), Insurance products offered by a third company (optional extras).

It is composed by the Currency code (3 characters) and the following information:

-   Type:

108

Surcharge

13

Special equipment

45

Tax

COL

Collection

COV

Coverage

CPN

Coupon

DEL

Delivery

INS

Insurance (optional extra)

-   Amount (policy or coupon amount)
-   Description:

IES

included in Estimated Total

IBR

included in Base Rate

OPT

Optional

MAN

Mandatory

NBR

Not Included in Base Rate

ITX

Policy amount Includes Tax

NTX

Policy amount Not Includes Tax

-   Period type:

001

Per day

002

Per week

003

Per month

004

Per rental

012

Tax percentage

013

No value available

AMP

And Month Period

AYP

And Year Period

BMP

Between Month Period

BP

Between Period

BYP

Between Year Period

EXS

Excess

FDP

From Day Period

FKD

From Kilometer Distance

FMD

From Miles Distance

FMP

From Month Period

FP

From Period

FWP

From Week Period

LBY

Liability

MAX

Maximum value

MND

Maximum Number of Days

PK

Per Kilometer

PM

Per Miles

PMD

Per Modification

PMV

Per Movment

PWE

Per Week End

TDP

To Day Period

TKD

To Kilometer Distance

TMD

To Miles Distance

TMP

To Month Period

TP

To Period

TWP

To Week Period

-   Currency code (3 characters)
-   Free text: Policy name (up to 70 characters)

### Lists of codes (coverage and surcharge policies and special equipment)

Please find below the list of coverage, surcharge, tax and special equipment codes that can be returned and associated to the rate.

Remark: the coverage codes listed here are referred to the coverages offered by the Car Rental Company (type: COV). For insurance products offered by third companies (type: INS), the code is unique and will be returned together with the name of the product and, if available, also the policy wording and the terms and conditions for such insurance.

**1\. Coverage codes**

Coverage code

Coverage text

AER

ACCIDENT EXCESS REDUCTION

ALI 

ADDITIONAL LIABILITY INSURANCE

CCP

COMPLETE COVER PACKAGE

CDW

COLLISION DAMAGE WAIVER

CDWP

COLLISION DAMAGE WAIVER PLUS

COV

General coverage 

EP

EXTENDED PROTECTION

LDW

LOSS DAMAGE WAIVER

NWR

NON WAIVABLE RESPONSIBILITY

PAE

PERSONAL ACCIDENT AND EFFECTS COVER

PAI

PERSONAL ACCIDENT INSURANCE

PEC

PERSONAL EFFECTS COVERAGE

PEP

PERSONAL EFFECTS PROTECTION

SAS

Safe and Sure

SCDW

SUPER COLLISION DAMAGE WAIVER

SLC

SUPPLEMENTAL LIABILITY COVERAGE

SPAI

SUPER PERSONAL ACCIDENT INSURANCE

STP

SUPER THEFT PROTECTION

THW

THEFT PROTECTION WAIVER

TP

THEFT PROTECTION

YNG

YOUNG DRIVERS INSURANCE

2LI

SECONDARY LIABILITY INSURANCE

4WD

Unsealed Road Cover 1

ACPI

Accident Protection Insurance

AERP

Accident Excess Reduction Plus

ALL

ALL COVERGES INCLUDED IN RATES

ALW

Accident Liability Waiver

ALWD

Unsealed Road Cover 2

API

ADDITIONAL PROTECTION INSURANC

ATI

ACCESSORY THEFT INSURANCE

BAGA

BAGGAGE COVERAGE

CDI

COLLISION DAMAGE INSURANCE

CDW1

COLLISION DAMAGE WAIVER 1-29

CDW2

COLLISION DAMAGE WAIVER 30 PLUS

CDWC

COLLISION DAMAGE WAIVER COMBO

CDWCP

COLLISION DAMAGE WAIVER COMBO PLUS

CDWRL

COLLISION DAMAGE WAIVER REDUCED LIABILIT

CINS

COMPULSORY INSURANCE

CLDW

COLLISION DAMAGE WAIVER/LDW COMBO

CPP

Carefree Personal Protection

CPY

CANCELLATION PENALTIES

CSC

CASCO

CT

Coverage on Tires

CTP

Executive Cover (CDW + Theft Protection)

DCF

DELIVERY AND COLLECTION FEES

DDW

DEDUCTIBLE DAMAGE WAIVER

DER

DAMAGE EXCESS REDUCTION

DLW

DAMAGE LIABILITY WAIVER

DME

DAMAGE WAIVER EXTENDED

DP

DEDUCTIBLE PROTECTION

DW

DAMAGE WAIVER

DWP

DAMAGE WAIVER PLUS

EC

Extra Cover

ED

EXCLUTION DEDUCTIBLE

ELW

Extended Liability Waiver

ESP

EMERGENCY SICKNESS PROTECTION

FCV

FULL COVERAGE

FFP

FULL PROTECTION PACKAGE

FLT

FLEET LICENSE AND TAX RECOVERY FEE

FTP

Full Theft Protection

GTW

GLASS TIRE WAIVER

IDW

INSURANCE DEDUCTIBLE WAIVER

IDWP

INS. DEDUCTIBLE WAIVER PLUS

IDWRL

INS. DEDUCTIBLE WVR. RED LIAB.

INS

INSURANCE

INSP

driving licence insurance

INX

Insurance Excess

LC

LIABILITY COVER

LDC

LIABILITY DEDUCTIBLE COVERAGE

LDI

LOSS DAMAGE INSURANCE

LDW1

LOSS DAMAGE WAIVER 1

LDW2

LOSS DAMAGE WAIVER 2

LDW25

LOSS DAMAGE WAIVER UNDER 25 YEARS AGE

LDW3

LOSS DAMAGE WAIVER 3

LDWD

LDW DEDUCTIBLE WAIVER

LDWEL

Super Top Cover LDW

LDWP

LOSS DAMAGE WAIVER PLUS

LDWRL

LOSS DAMAGE WAIVER REDUCED LIABILITY

LIR

LIABILITY INSURANCE REDUCTION

LIS

LIABILITY INSURANCE SUPPLEMENT

LLI

LEGAL LIABILITY INSURANCE

MC

Mastercover

MCP

MasterCover Plus

MER

MAXIMUM ACCIDENT EXCESS REDUCTION

MEX

MEXICAN INSURANCE

MLI

Motor Liability Insurance

MPP

MAXIMUM PROTECTION PACKAGE

MVR

MOTOR VEHICLE RENTAL LEASE FEE

MXC

Max Cover

OSI

OVERSEAS INSURANCE

PAC

PERSONAL ACCIDENT COVERAGE

PAITC

TOP COVER PAI

PCV

PARTIAL COVERAGE

PDW

PARTIAL DAMAGE WAIVER

PLI

Primary Liability Insurance

POM

peace of mind

PP

PROTECTION PACKAGE

PPI

Personal Property Insurance

PPL

PERSONAL PROTECTION PLAN

PPP

PERSONAL PASSENGER PROTECTION

PPT

PART PRIVILEGE TAX

PTI

PERSONAL TRAVEL INSURANCE

RLP

RENTAL LIABILITY PROTECTION

RR

Risk Reduction Cover

RSP

ROADSIDE SERVICE PLAN

SC

Supercover

SCDW1

SUPER COLLISION DAMAGE WAIVER 1 to 3days

SCDW4

SUPER COLLISION DAMAGE WAIVER 4 to 6days

SCDW7

SUPER COLLISION DAMAGE WAIVER 7 to 13d.

SCDWP

SUPER COLLISION DAMAGE WAIVER PLUS

SCDWW

SUPER COLLISION DAMAGE WAIVER 14 days

SPAEC

SUPER PERSONAL ACCIDENT AND EFFECTS COVE

SCE

SUPER COVER EMEA

SCV

SPECIAL COVERAGE

SERPP

SERENITY PLUS PACK

SKO

SUPERKASKO

SL1

SLI AND UMP LOW COVERAGE

SL2

SLI AND UMP HIGH COVERAGE

SLDW

Super theft and damage waiver

SLDW1

Super Loss Damage Waiver 1-7 days.

SLDW2

Super Loss Damage Waiver 8 days plus

SLI

SUPPLEMENTARY LIABILITY INSURANCE

SNO

SNO OPTION

SPLDW

SUPER PLUS LOSS DAMAGE WAIVER

SPOM

super peace of mind

SPOW

SUPER PEACE OF MIND WEEKEND

SPP

SAFETY PACKAGE PREMIUM

SRR

Risk Reduction Cover Plus

STK

SUPERKASKO AND SUPER THEFT

SUP

Super Cover Policy

SWC

SNOW COVER

TCDW

TOTAL COLLISION DAMAGE WAIVER

TCV

Top Cover CDW

TI

THEFT INSURANCE

TLW

THEFT LIABILITY WAIVER

TP1

THEFT PROTECTION 1-29

TP2

THEFT PROTECTION +30

TPC

THIRD PARTY COVERAGE

TPI

THIRD PARTY INSURANCE

TPI

THIRD PARTY INSURANCE

TPIIC

THIRD PARTY INSURANCE FO CC INSURANCE

TPL

THIRD PARTY LIABILITY

TPP

THIRD PARTY PLUS

TT

TT ISLE OF MAN SEASONAL SURCHARGE

TTP

total protection plus

TW

TIRE AND WINDSHIELD

UMC

UNINSURED MOTORIST COVERAGE

UMW

UNLIMITED MILAGE WAIVER

VCP

VALUE COVER PLUS

WAI

WAIVER

WSI

WINDSCREEN INSURANCE

WTW

VALUE COVER

WVD

Waiver Deductible

WWI

windscreen and tyres insurance

YLDW

YOUNG LOSS DAMAGE WAIVER

YNG25

YOUNG DRIVERS INSURANCE < 25

ZDC

ZERO DEDUCTIBLE COVERAGE

**2\. Surcharge codes**

ACS

AIR CONDITIONING SURCHARGE RECOVERY

ASR

AIRPORT SURCHARGE

Cof

Contract Fee

EQP

SPECIAL EQUIPMENT

OWC

ONE WAY CHARGE

RFT

REGISTRATION FEE/ ROAD TAX

SCG

General surcharge

VLF

VEHICLE LICENSE FEE

WSC

WINTER SERVICE CHARGE

DEL

DELVERY FEE

COL

COLLECTION FEE

CLF

CANCELLATION FEE

MOD

MODIFICATION FEE

ASU

AGE SURCHARGE

RGF

REGISTRATION FEE

AAF

AIRPORT ACCESS FEE

AAT

Additional Adjusted Tax

ACC

Airport Security Surcharge

ACE

Air Conditioning Excise Tax

ACF

AIRPORT CONTRACT FEE

ACT

Additional Contract Tax

AD

ADDITIONAL DAY

ADD

ADDITIONAL DISTANCE

ADF

Administration fee

ADS

ADDITIONAL DRIVER SURCHARGE

AEC

AUSTIN EVENTS CENTER PROJECT

AFC

Airport/FBO Concession Fee Recovery

AFF

Airport Facility Fee

AFO

AIRPORT FACILITY AND OPERATION FEE

AGE

AGE DIFFERENTIAL

AH

ADDITIONAL HOUR

AHA

AHATA FEE

AHC

AFTER HOURS CHARGE

AHD

AFTER HOURS DROP-OFF FEE

AHP

After Hour Pickup Charge

AIR

Airport Fee

APF

AIRPORT CONCESSION FEE RECOVERY

ARF

AMENDED RETURN FEE

ARS

ARCTIC SURCHARGE

ART

ARENA TAX

AS1

AIRPORT SURCHARGE 1 DAY

AS2

AIRPORT SURCHARGE 2 DAYS AND MORE

ASC

AIRPORT SERVICE CHARGE

ASF

Airport Security Fee

ATF

AIRPORT TRANSPORT FEE

ATX

AIRPORT TAX

AVF

AD VALOREM RECOVERY FEE

AW

ADDITIONAL WEEK

BC1

BORDING CROSSING FEE from 1 to 10days

BC2

BORDER CROSSING FEE from 11 to 29days

BC3

BORDER CROSSING FEE 30DAYS AND MORE

BCF

BORDER CROSSING FEE

BCR

BUSING COST RECOVERY

BRS

BRONX RESIDENT SURCHARGE

BUS

BUS FEE

CA

TOURISM COMMISSION ASSESSMENT

CCF

Convention Center Financing Surcharge

CCL

Congestion Charge London

CCR

CUSTOMER FAC CHG & VEH LIC COST RECOVERY

CCS

Congestion Charge Stockholm

CFA

CONSOLIDATED FACILITY FEE

CFC

CUSTOMER FACILITY CHARGE

CFE

CONCESSION FEE

CFF

CONTRACT FACILITY FEE

CFR

CONCESSION FEE & VEH LIC COST RECOVERY

CIC

CONSUMER FINANCE CHARGE

CIE

CIRCULATION FEE

CLM

claim handling

CLS

CACTUS LEAGUE SURCHARGE

CO2

CO2 TAX

COR

Corsica Surcharge

COT

COUNTY TAX

CPF

CONVENTION PARKING FEE

CRF

CONCESSION RECOVERY FEE

CRP

COLORADO ROAD SAFETY PROGRAM FEE

CRS

CAR RENTAL SURCHARGE

CRT

CAR RENTAL TAX

CSA

CONSERVATION SURCHARGE

CSC

Credit card service charge

CSF

CITY SUPPLEMENT FEE

CSH

Cleaning Surcharge

CSR

COUNTY SURCHARGE

CSU

CITY SURCHARGE

CTX

CITY TAX

CVT

CONVENTION AND VISITORS TAX

D12

Drivers fee in Excess of 12 hours

DCF

DELIVERY AND COLLECTION FEES

DFC

driver facility charge

DLF

DRIVERS LICENSE FEE

DOW

DOMESTIC ONE WAY SURCHARGE

DPF

DRIVING PERMIT FEE

DRT

DAILY RENTAL TAX

DSC

DISCOUNT

DSF

DOMESTIC SECURITY FEE

EAR

EARLY RETURN FEE CANADA

ECO

ECO SURCHARGE

ENS

ENERGY SURCHARGE

ERF

ENERGY RECOVERY FEE

ESU

ENVIRONMENTAL SURCHARGE

EXP

EXPO TAX

EXT

EXCISE TAX

FAF

Facility Fee

FBO

FBO FEE PASS THROUGH

FCF

FUEL CONSERVATION FEE

FCT

FUEL CONSERVATION TAX

FEE

FEE

FER

FBO CONCESSION FEE RECOVERY

FFS

Frequent Flyer Surcharge

FFT

FREQUENT FLYER TAX RECOVERY SURCHARGE

FIN

fine handling

FMT

FAIR MARKET VALUE TAX

FUE

FACILITY USE FEE

FUF

FLEET & CAR RENTAL FACILITY UPGRADE FEE

GAF

GOVERNMENT RATE SUPPLEMENT

GIT

Government Island Tax

GMU

GMU ADMINISTRATION FEE

GOV

GOVERNMENT STAMP TAX

GRF

GROSS RECEIPT FEE

GRS

GARAGE RECOUP SURCHARGE

GRT

GROSS RECEIPTS TAX

GRV

GRV ADMINISTRATION FEE

GSF

GOVERNMENT SERVICES FEE

GST

GOODS AND SERVICE TAX

GSU

GOVERNMENT RENTAL SURCHARGE

GVS

Governmental Vehicle Surcharge

GVT

Government Tax

HCF

HOTEL CONCESSION FEE RECOVERY

HIS

High season surcharge

HOF

HOSPITALITY FEE

HST

HARMONIZED SALES TAX

HTX

HIGHWAY TAX

HUF

HIGHWAY USAGE FEE

IDP

INTERNATIONAL DRIVER PREMIUM

IET

ISLAND ENHANCEMENT TAX

IRD

INFANT/CHILD RESTRAINT DEVICE SURCHARGE

KLF

KANSAS CITY LICENSE FEE

LAF

LICENCE AND FEE

LCF

LOCATION CUSTOMER FEE

LDF

Lost Documents Fee

LDP

LOCAL DRIVERS PERMIT

LEF

LEISURE FEE

LER

LICENSING EXCISE TAX RECOVERY

LET

LESSOR TAX

LIF

License Fee

LKC

Lost key charge

LOT

Local Tax

LPF

License Plate Fee

LRF

LICENSE RECOUPMENT FEE

LRP

LICENCING REGISTRATION PROPERTY TAX

LSC

LOCATION SERVICE CHARGE

LSR

LOUISIANA STATE TAX RECOVERY SURCHARGE

MBF

MBIA CONTRACT FEE

MCR

Mandatory Civil Responsibility Fee

MCT

METRO COMM TRANSPORTATION DISTRICT TAX

MDF

MIDFIELD FEE

MFF

Maintenance Facility Fee

MGS

MEET AND GREET SURCHARGE

MIG

MITIGATION FEE

MLA

MEET LATE ARRIVAL FEE

MLS

Mileage Surcharge

MTX

MUNICIPAL/LOCAL TAX

MVR

MOTOR VEHICLE RENTAL LEASE FEE

MVT

MOTOR VEHICLE TAX

NGF

NV GOVERNMENT SERVICES FEE

NSF

NO SHOW FEE

NSK

NON SMOKING FLEET SURCHARGE

NSL

NATIONAL SECURITY LEVEL

OCT

OMAHA OCCUPATION TAX

OHF

OUT OF HOURS FEE

OMR

Operation and maintenance recovery

OPT

OPTL

ORS

BROOKLYN RESIDENT SURCHARGE

OUT

out of town fee

OVP

overdue penalty

PAS

PENNSYLVANIA STATE SURCHARGE

PCF

PIER CONCESSION FEE

PCP

Luxury Car Additional PST

PCR

PHILADELPHIA CAR RENTAL TAX

PFC

PASSENGER FACILITY CHARGE

PLC

PREMIUM LOCATION CHARGE

PLF

PRIVILEGE FEE

PLS

PREMIUM LOCATION SURCHARGE

PMR

MISSING ACCIDENT REPORT DELIVERY

POT

Project Tax

PPF

Personal Property Fee

PPP

Personal Protection  Plan

PPT

PERSONAL PROPERTY TAX

PRF

PARKING FINE RECOVERY FEE

PRL

PREMIUM LOCATION FEE

PSR

parking surcharge

PSS

PEAK SEASON SURCHARGE

PST

PROVINCIAL SALES TAX

PTL

Property Tax,Title/License Reimbursement

PUC

PUBLIC LIABILITY CHARGE

QRS

QUEENS RESIDENT SURCHARGE

QSF

QUEBEC SNOW TIRE RECOVERY FEE

RAF

rental auto facility charge

RCA

RENTAL CAR FACILITY CHARGE

RCF

RECOUP FEE

RDF

ROAD FEE

RET

Rental Tax

RFE

ROAD ASSISTANCE FEE

RFS

REFUELING SURCHARGE

RFV

RENTAL CAR FACILITY CHARGE AND VLCR

RIF

Reimbursement Fee

RLF

REMOTE LOCATION FEE

ROF

RENTAL CONTRACT FEE

ROT

RETAILERS OCC TAX

RRF

REGISTRATION RECOVERY FEE

RSA

ROAD-SIDE ASSISTANCE

RSG

RECOVERY SURCHARGE

RSR

RENTAL SURCHARGE

RSU

ROAD SURCHARGE

RTA

RTA FEE

RTF

RENTAL TRANSACTION FEE

RTR

ROAD TAX RECOVERY

RWS

Railway surcharge

SAF

Sport Authority Tax

SCF

SECURITY FEE

SCH

SERVICE CHARGE

SEA

SEAPORT FEE

SFE

SERVICE FEE

SLT

SALES TAX

SPT

Sumptuary Tax

SSC

SECURITY SURCHARGE

SSF

COMMISSION FEE RECOVERY

SST

Social Service Tax

SSU

STATE SURCHARGE

STD

STAMP DUTY

STF

SNOW TIRE FEE

SYR

GOVT and CORP rentals only

TAC

TRANSPORTATION FACILITIES CHARGE

TAF

TRANSIT AUTHORITY FEE

TBF

Tire and Battery Fee

TCH

TOURISM CHARGE

TFF

Transportation and Facilities Fee

TIF

Title Fee

TMF

TIRE MANAGEMENT FEE

TOL

TOLL ROAD CHARGE

TPF

Transportation Fee

TPI

third party insurance

TRC

TAX REIMBURSEMENT CHARGE

TRE

Transaction Fee

TRF

TRANSACTION RECOVERY FEE

TRP

Title,Regist.,Pers.Property,License Fee

TRS

TAX RECOVERY SURCHARGE

TRT

Transaction Tax

TSC

TAX AND SERVICE CHARGE

TTS

TRANSPORTATION TAX SURCHARGE

UDT

U-DRIVE-IT TAX

UFF

CUSTOMER FACILITIES FEE

ULC

Underage Liability Charge

VCR

VEHICLE LICENSING COST RECOVERY

VEA

VLF ECO AND AC FEE

VEF

VEHICLE EXCISE FEE

VER

VEHICLE ENVIRONMENTAL RECOVERY FEE

VET

Venue Tax

VEV

VEHICLE LICENSING & EXCISE TAX RECORERY

VFE

VEHICLE PROTECTION FEE

VHT

Vehicle Tax

VIR

VEHICLE LICENSING FEE RECOVERY

VLA

Vehicle Licensing and Air Tax Recovery

VLE

VEHICLE LICENSE COST RECOVERY FEE

VLR

VEH LIC COST RECOVERY & EXCISE TX REIMBU

VMF

VEHICLE MAINTENANCE FEE

VPF

Vehicle Pass Through Fee

VRL

VEHICLE RENTAL LEVY

VRR

VEHICLE REGISTRATION REIMBURSEMENT  SUR

VTR

VEHICLE EXCISE TAX RECOVERY

VVF

vehicle vallet fee

WAF

WISCONSIN REGIONAL TRANSIT AUTHORITY FEE

WDF

Waste Disposal Fee

WFE

WINTERIZATION FEE

WIF

WINTER TIRE FEE

WRF

WASHRACK FEE

WSX

wsx test creation

WTF

Winter Fee

YDS

YOUNG DRIVER SURCHARGE

Tax codes

Tax code

Tax text

TAX

TAX

TAX

Federal Tax

TAX

State tax

TAX

VAT

3\. Special equipment 

Equipment Code 

Equipment text

BBS

Baby stroller/Push chair

BYC

Bicycle rack

CBB

Cargo barrier rack

CBF

Cargo barrier front

CBS

Booster seat for child under 135cm or up to 12 years

CSB

Child seat determined by weight/age of child: 1-3 years / 9-18 Kg

CSI

Child seat determined by weight/age of child: 0-12 month/0-13Kg

CST

Child seat determined by weight/age of child: 4-7 years/15 – 30 Kg

DVD

Portable DVD player

FLH

Flag holder

HCL

Hand Controls on left

HCR

Hand controls on right

HEL

Motorcycle helmet

JAC

Security devices

JRC

Jerrycan

LRC

Luggage roof case

LTR

Luggage trailer

LUG

Luggage rack

MMS

Multi mdeia centre

NAV

Navigation system

NVS

Navigation system

PHN

Mobile phone

RPS

Road / congestion payment scheme

SBE

Seat belt extendors

SBR

Snow board racks

SKB

Ski box

SKR

Ski rack

SKV

Ski equipped vehicle

SNO

Snow chain

SNP

Snow packs

SNT

Snow tyres

SPN

Spinner knob

CSR

Satellite / digital radio

SRK

Surf rack

STC

Scooter top case

STR

Snow /Winter tyres

TEL

Car Telephone

TRH

Trailer Hitch

TOL

Toll payment tag / pass

TYR

Spare tyre

WAR

Wheelchair access ramp

WHC

Wheelchair

WIF

Wi-Fi access

## 3.17.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>108</type> <amount>265.00</amount> <description>IES</description> <periodType>004</periodType> <currency>EUR</currency> <comment>ONE WAY CHARGE</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup>

* * *

## 3.18 Sub Structure: Terms and Conditions

## 3.18.1 Description

The terms and conditions of the rate will be returned, in case they are available. The terms and conditions that the car providers have loaded in Amadeus are the provider legal terms of sale, which is independent of the rate-related terms covered by rate features.

These are dependent on the point of sale (the office from where the request is done), the pick-up location, the type of rate and the language. By default, if there are no available terms and conditions in the requested language, the ones in English will be returned. The terms and conditions are returned at location level (not at each rate level).

The terms and conditions are returned with the following information:

\- rate type: corporate or leisure

\- URL - linked to the file that contains the Terms and conditions text. The file content is not formatted - it will just contain basic html tags to identify the paragraphs and titles. At UI level, the content can be formatted and displayed according to the needs of the customer.

\- Language: the language of the terms and conditions contained in the text file

Terms and conditions  are managed and maintained by the Car provider only - Amadeus is returning the data on their behalf - yet no processing is performed on the text. The car providers are responsible of the content and data accuracy of the terms and conditions.

The terms and conditions might change between the time of the booking and the time of the pick-up of the car.

If both corporate and leisure rates exist for the location and different Terms and conditions apply, links could be returned for each of them, if the car provider has loaded this data in Amadeus. 

If no terms and conditions exist, no terms and conditions information will be returned in the response.

This operation allows to make an availability with a specific language. In the response, the WBS customer gets the terms and conditions document in the specified language, if available.

## 3.18.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<termsAndConditions> <attributeDetails> <attributeType>LEI</attributeType> <attributeDescription>https://T&Cs.HTML</attributeDescription> <language>EN</language> </attributeDetails> </termsAndConditions>

* * *

## 3.19 Sub Structure: Vehicle information

## 3.19.1 Description

In this segment the WBS customer can identify the information related to the vehicle type present in the request.

The information is composed by the folloging elements:

-   Vehicle type owner (its value is always 'ACR')
-   Vehicle rental preferred type (4 characters ACRISS code)
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

Maximum number Of Doors

MOS

Maximum number of Seats

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

-   Value: Value number corresponding to the qualifier type. In case Qualifier type is VOB (Volume of the Boots) than Value could be one of the following:

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

-   Text subject qualifier:

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

## 3.19.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<vehicleInfoGroup> <vehicleDetails> <vehicleCharacteristic> <vehicleTypeOwner>ACR</vehicleTypeOwner> <vehicleRentalPrefType>ECAR</vehicleRentalPrefType> </vehicleCharacteristic> <vehicleInfo> <qualifier>VOB</qualifier> <value>3</value> </vehicleInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>SI</informationType> <companyId>1A</companyId> <encoding>1</encoding> </freeTextDetails> <carModel>KIA RIO 4 DOOR SEDAN/SIMILAR</carModel> </vehicleDetails> </vehicleInfoGroup>

* * *

## 4 Error Messages

Here are examples of errors that can be returned while usingthe _RateInformationFromAvailability_ function.

**Error Message**  
  

**Error Code**  
  

**Description**  
  

Invalid rate identifier  
  

04543  
  

This error message will be returned if the rate identifier entered is invalid.  
  

Invalid vehicle type  
  

00530  
  

This error will be returned if the vehicle type entered is invalid.  
  

Invalid location  
  

02711  
  

This error will be returned if the location code entered is invalid.  
  

Invalid date  
  

06737  
  

This error will be returned if the date entered is invalid.  
  

Invalid company code  
  

00697  
  

This error will be returned if the car company code entered is invalid.  
  

Invalid rate category  
  

10471  
  

This error will be returned if the rate category entered is invalid.  
  

Invalid rate code  
  

00533  
  

This error will be returned if the rate code entered is invalid.  
  

PC Option not allowed  
  

15963  
  

The client has requested a Car rate information with a Promotional Code on a car company that does not support it.  
  

COMPLETE ACCESS RATE FEATURES UNAVAILABLE  
  

9678  
  

The Car\_RateInformationFromAvailability request have timed out  
  

UNEXPECTED RESPONSE FROM CAR COMPANY (WRONG EDIFACT REPLY)  
  

12380  
  

The Edifact reply from the car provider contains structural errors  
  

Free text returned by the car provider  
  

99  
  

Depends on the free text returned  
  

REQUESTED RATE NOT AVAILABLE  
  

231  
  

The requested rate is not available  
  

WARNING - THE RATE REQUESTED IS NOT LEISURE  
  

22392  
  

The request is rate info leisure but the car provider replies with a non-leisure rate  
  

UNEXPECTED RESPONSE FROM CAR COMPANY (LEISURE REPLY)  
  

22393  
  

The request was not leisure but the reply from the cars provider is leisure  
  

INVALID CAR POLICY TYPE

11369

Warning is raised when a policy code (surcharge, coverage, tax) that does not exist on Amadeus is returned by the car provider . The explicit code will be indicated in the message.

INVALID SPECIAL EQUIPMENT CODE

00534

Warning is raised when a special equipment code that does not exist on Amadeus is returned by the car provider . The explicit code will be indicated in the message.

INVALID AGE

10711

This error message will be returned if the driver age entered is invalid (The valid age range is 14 to 99).

## 4.1 Error Reply

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Car\_RateInformationFromAvailabilityReply xmlns="http://xml.amadeus.com/RCFARR\_22\_2\_1A"> <errorWarning> <applicationError> <errorDetails> <errorCode>99</errorCode> <errorCategory>EC</errorCategory> </errorDetails> </applicationError> <errorFreeText> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>SI</informationType> <companyId>1A</companyId> <encoding>1</encoding> </freeTextDetails> <freeText>QUOTE NOT FOUND CONTACT HELP DESK AT 800-800-5774</freeText> </errorFreeText> </errorWarning> </Car\_RateInformationFromAvailabilityReply>

  

* * *

## 5 Operations

## 5.1 Operation: Rate information for Corporate rate

In this operation we show an example of Car\_RateInformationAfterAvailability request and response for a corporate rate (the information used to set the request parameters has been taken from a previous availability response). For this example, we will use:

  
• The same location for pick up and drop off  
• Booking Source (BS) 12345675  
• Rate plan DY (Daily - In the Car\_Availability resonse this value was 003, see the correspondance table placed in Building a Query (Rate information) subchapter)  
• Rate category 024 (Standard)

For this example we are using also the Rate Code 'S3I' (obtained from a previous Car\_Availability response).

Note also that we are not using the Rate Type since it is not mandatory for Avis (ZI).  
We are requesting also to convert the rates to USD currency.

## 5.1.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Car\_RateInformationFromAvailability xmlns="http://xml.amadeus.com/RCFARQ\_22\_2\_1A"> <companyDetails> <travelSector>CAR</travelSector> <companyCode>ZI</companyCode> <accessLevel>CP</accessLevel> </companyDetails> <bookingSource> <originatorDetails> <originatorId>12345675</originatorId> </originatorDetails> </bookingSource> <rateSource> <selectionDetails> <option>P6</option> </selectionDetails> </rateSource> <pickupDropoffLocs> <locationType>176</locationType> <locationDescription> <code>1A</code> <name>NCE</name> </locationDescription> </pickupDropoffLocs> <pickupDropoffTimes> <businessSemantic>PDA</businessSemantic> <beginDateTime> <year>2020</year> <month>8</month> <day>14</day> <hour>9</hour> <minutes>0</minutes> </beginDateTime> <endDateTime> <year>2020</year> <month>8</month> <day>15</day> <hour>9</hour> <minutes>0</minutes> </endDateTime> </pickupDropoffTimes> <rateInfo> <tariffInfo> <ratePlanIndicator>DY</ratePlanIndicator> </tariffInfo> <rateInformation> <category>024</category> </rateInformation> </rateInfo> <rateCodeInfo> <fareCategories> <fareType>S3I</fareType> </fareCategories> </rateCodeInfo> <vehicleInformation> <vehTypeOptionQualifier>VT</vehTypeOptionQualifier> <vehicleRentalNeedType> <vehicleTypeOwner>ACR</vehicleTypeOwner> <vehicleRentalPrefType>CDMR</vehicleRentalPrefType> </vehicleRentalNeedType> </vehicleInformation> </Car\_RateInformationFromAvailability>

## 5.1.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Car\_RateInformationFromAvailabilityReply xmlns="http://xml.amadeus.com/RCFARR\_22\_2\_1A"> <rateDetails> <companyIdentification> <travelSector>CAR</travelSector> <companyCode>ZI</companyCode> <companyName>AVIS</companyName> <accessLevel>CP</accessLevel> </companyIdentification> <sourceLevel> <selectionDetails> <option>P6</option> </selectionDetails> </sourceLevel> <mktText> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>MK</informationType> <companyId>1A</companyId> <encoding>1</encoding> </freeTextDetails> <freeText>AVIS THANKS YOU FOR YOUR BUSINESS</freeText> <freeText> AND FOR USING AMADEUS RATE FEATURES</freeText> </mktText> <rateDetail> <tariffInfo> <amount>90.57</amount> <currency>EUR</currency> <ratePlanIndicator>DY</ratePlanIndicator> <amountType>RP</amountType> <rateChangeIndicator>GUA</rateChangeIndicator> </tariffInfo> <rateInformation> <category>2</category> </rateInformation> <chargeDetails> <type>034</type> <description>UNL</description> </chargeDetails> <chargeDetails> <type>008</type> <amount>90.57</amount> </chargeDetails> <chargeDetails> <type>009</type> <amount>130.27</amount> </chargeDetails> <chargeDetails> <type>80</type> <description>UNL</description> </chargeDetails> <chargeDetails> <type>82</type> <description>UNL</description> </chargeDetails> <chargeDetails> <type>108</type> <amount>42.87</amount> <comment>LOCATION SURCHARGE</comment> </chargeDetails> <chargeDetails> <type>108</type> <amount>2.63</amount> <comment>REGISTRATION FEE / ROAD TAX</comment> </chargeDetails> <chargeDetails> <type>108</type> <amount>8.92</amount> <comment>TAX ON MANDATORY ITEMS</comment> </chargeDetails> <chargeDetails> <type>COV</type> <comment>CDW - COLLISION DAMAGE WAIVER</comment> </chargeDetails> <chargeDetails> <type>COV</type> <comment>PAI - PERSONAL ACCIDENT INSURANCE</comment> </chargeDetails> <chargeDetails> <type>COV</type> <comment>TP - THEFT PROTECTION</comment> </chargeDetails> <chargeDetails> <type>045</type> <comment>STATE TAX</comment> </chargeDetails> </rateDetail> <rateDetail> <tariffInfo> <amount>90.57</amount> <currency>EUR</currency> <amountType>RB</amountType> </tariffInfo> <chargeDetails> <type>NBD</type> <amount>1</amount> </chargeDetails> </rateDetail> <rateDetail> <tariffInfo> <amount>144.98</amount> <currency>EUR</currency> <amountType>904</amountType> </tariffInfo> </rateDetail> <dummy></dummy> <remarks> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>SI</informationType> <companyId>1A</companyId> <encoding>1</encoding> </freeTextDetails> <freeText>NO RETURN RESTRICTION</freeText> <freeText>THE MINIMUM RENTAL PERIOD IS 001 DAYS</freeText> <freeText> 29.26 DAMAGE ADMIN FEE MAY APPLY</freeText> </remarks> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>108</type> <amount>42.87</amount> <description>IES</description> <periodType>004</periodType> <currency>EUR</currency> <comment>LOCATION SURCHARGE</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>108</type> <amount>2.63</amount> <description>IES</description> <periodType>001</periodType> <currency>EUR</currency> <comment>REGISTRATION FEE / ROAD TAX</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>108</type> <amount>19.6</amount> <description>IES</description> <periodType>012</periodType> <comment>TAX ON MANDATORY ITEMS</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>108</type> <amount>11.78</amount> <description>OPT</description> <periodType>001</periodType> <currency>EUR</currency> <comment>SPECIAL EQUIPMENT</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>COV</type> <amount>0</amount> <description>IBR</description> <periodType>001</periodType> <currency>EUR</currency> <comment>CDW - COLLISION DAMAGE WAIVER</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>COV</type> <amount>0</amount> <description>IBR</description> <periodType>001</periodType> <currency>EUR</currency> <comment>PAI - PERSONAL ACCIDENT INSURANCE</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>COV</type> <amount>0</amount> <description>IBR</description> <periodType>001</periodType> <currency>EUR</currency> <comment>TP - THEFT PROTECTION</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>COV</type> <amount>13.93</amount> <description>OPT</description> <periodType>001</periodType> <currency>EUR</currency> <comment>SLI - SUPPLEMENTARY LIABILITY INSURANCE</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>045</type> <amount>19.6</amount> <description>IBR</description> <periodType>012</periodType> <comment>STATE TAX</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <vehicleInfoGroup> <vehicleDetails> <vehicleCharacteristic> <vehicleTypeOwner>ACR</vehicleTypeOwner> <vehicleRentalPrefType>CDMR</vehicleRentalPrefType> </vehicleCharacteristic> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>SI</informationType> <companyId>1A</companyId> <encoding>1</encoding> </freeTextDetails> <carModel>REFER TO POLICY PAGE CPOZIXXX/VEH</carModel> </vehicleDetails> </vehicleInfoGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>01</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>02</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>03</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>04</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>05</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>06</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>07</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>GUA</type> <quantity>365</quantity> <quantityUnit>3</quantityUnit> </ruleDetails> <ruleText> <textType>GUA</textType> <freeText>GUARANTEED FOR 365 DAYS</freeText> </ruleText> </otherRules> <dateTimeInfo> <businessSemantic>BED</businessSemantic> <beginDateTime> <year>2020</year> <month>7</month> <day>26</day> </beginDateTime> <endDateTime> <year>2020</year> <month>7</month> <day>26</day> </endDateTime> </dateTimeInfo> </otherRulesGroup> <pickupDropoffLocation> <locationCode> <locationType>176</locationType> <locationDescription> <code>CPY</code> <name>NCET01</name> </locationDescription> </locationCode> <address> <addressDetails> <format>5</format> <line1>NICE AEROPORT 06</line1> </addressDetails> <city>NICE CEDEX 306281</city> <countryCode>FR</countryCode> </address> <openingHours> <businessSemantic>OCH</businessSemantic> <beginDateTime> <hour>6</hour> <minutes>30</minutes> </beginDateTime> <endDateTime> <hour>24</hour> <minutes>0</minutes> </endDateTime> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <phone> <phoneOrEmailType>PHO</phoneOrEmailType> <telephoneNumber> <telephoneNumber>0820 61 16 32</telephoneNumber> </telephoneNumber> </phone> <phone> <phoneOrEmailType>FAX</phoneOrEmailType> <telephoneNumber> <telephoneNumber>04 93 21 49 58</telephoneNumber> </telephoneNumber> </phone> </pickupDropoffLocation> <rateCodeGroup> <rateCode> <fareCategories> <fareType>S3I</fareType> </fareCategories> </rateCode> <additionalInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>SI</informationType> <companyId>1A</companyId> <encoding>1</encoding> </freeTextDetails> <freeText>STD ILL 14-20D</freeText> </additionalInfo> </rateCodeGroup> </rateDetails> </Car\_RateInformationFromAvailabilityReply>

## 5.1.3 Possible Errors

See "Error Messages" section.

* * *

## 5.2 Operation: Rate information for Leisure rates

In this operation we show an example of Car\_RateInformationAfterAvailability request and response for a leisure rate (the information used to set the request parameters has been taken from a previous availability response). For this example, we will use:

  
• The same location for pick up and drop off  
• Rate plan DY (Daily - In the Car\_Availability resonse this value was 003, see the correspondance table  
placed in Building a Query (Rate information) subchapter)  
• Rate category 011 (Package - Rate Category 11 is reserved for cars easy shopper if the provider is leisure)

For this example we are using also the Rate Code 'ILL3FR' (obtained from a previous Car\_Availability response). Note also that we are using the Rate Type ('F4M5YBQQ01'), also obtained form the Car\_availability reply, since it is mandatory for Hertz (ZE).

In the response obtained it is possible to see than the mandatory COV, SUR and TAX charges have a price associated (not like in the corporate rate reply). It is also possible to see one information message indicating to contact the provider (in this case Hertz) for further cancellation fees.

## 5.2.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Car\_RateInformationFromAvailability xmlns="http://xml.amadeus.com/RCFARQ\_22\_2\_1A"> <companyDetails> <travelSector>CAR</travelSector> <companyCode>ZE</companyCode> <companyName>HERTZ</companyName> <accessLevel>CP</accessLevel> </companyDetails> <rateSource> <selectionDetails> <option>P6</option> </selectionDetails> </rateSource> <pickupDropoffLocs> <locationType>176</locationType> <locationDescription> <code>1A</code> <name>NCE</name> </locationDescription> </pickupDropoffLocs> <pickupDropoffTimes> <businessSemantic>PDA</businessSemantic> <beginDateTime> <year>2020</year> <month>8</month> <day>12</day> <hour>9</hour> <minutes>0</minutes> </beginDateTime> <endDateTime> <year>2020</year> <month>8</month> <day>14</day> <hour>9</hour> <minutes>0</minutes> </endDateTime> </pickupDropoffTimes> <rateInfo> <tariffInfo> <rateType>F4M5YBQQ01</rateType> <ratePlanIndicator>DY</ratePlanIndicator> </tariffInfo> <rateInformation> <category>011</category> </rateInformation> </rateInfo> <rateCodeInfo> <fareCategories> <fareType>ILL3FR</fareType> </fareCategories> </rateCodeInfo> <vehicleInformation> <vehTypeOptionQualifier>VT</vehTypeOptionQualifier> <vehicleRentalNeedType> <vehicleTypeOwner>ACR</vehicleTypeOwner> <vehicleRentalPrefType>MBMI</vehicleRentalPrefType> </vehicleRentalNeedType> </vehicleInformation> </Car\_RateInformationFromAvailability>

## 5.2.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Car\_RateInformationFromAvailabilityReply xmlns="http://xml.amadeus.com/RCFARR\_22\_2\_1A"> <rateDetails> <companyIdentification> <travelSector>CAR</travelSector> <companyCode>ZE</companyCode> <companyName>HERTZ</companyName> <accessLevel>CP</accessLevel> </companyIdentification> <sourceLevel> <selectionDetails> <option>P6</option> </selectionDetails> </sourceLevel> <mktText> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>MK</informationType> <companyId>1A</companyId> <encoding>1</encoding> </freeTextDetails> <freeText>MUST INCLUDE CREDIT CARD AT TIME OF SELL</freeText> </mktText> <rateDetailsInfo> <tariffInfo> <rateAmount>114.96</rateAmount> <rateCurrency>EUR</rateCurrency> <rateType>WD</rateType> <rateAmountQualifier>RP</rateAmountQualifier> <rateChangeIndicator>GUA</rateChangeIndicator> </tariffInfo> <extraRateTypeInfo> <rateCategory>LEI</rateCategory> </extraRateTypeInfo> <associatedCharges> <chargeType>032</chargeType> <amount>0.34</amount> </associatedCharges> <associatedCharges> <chargeType>034</chargeType> <quantity>750</quantity> </associatedCharges> <associatedCharges> <chargeType>108</chargeType> <freeText>VEH LIC COST RECVRY</freeText> </associatedCharges> <associatedCharges> <chargeType>108</chargeType> <freeText>AIRPORT FEE</freeText> </associatedCharges> <associatedCharges> <chargeType>COV</chargeType> <freeText>TP - THEFT PROTECTION</freeText> </associatedCharges> <associatedCharges> <chargeType>COV</chargeType> <freeText>CDW - COLLISION DAMAGE WAIVER</freeText> </associatedCharges> <associatedCharges> <chargeType>045</chargeType> <amount>18.84</amount> <freeText>TAX</freeText> </associatedCharges> <associatedCharges> <chargeType>113</chargeType> <freeText>PREPAYMENT REQUIRES CREDIT CARD OR DIRECT DEBIT ACCOUNT</freeText> </associatedCharges> </rateDetailsInfo> <rateDetailsInfo> <tariffInfo> <rateAmount>96.12</rateAmount> <rateCurrency>EUR</rateCurrency> <rateAmountQualifier>RB</rateAmountQualifier> </tariffInfo> <associatedCharges> <chargeType>NBD</chargeType> <amount>3</amount> </associatedCharges> </rateDetailsInfo> <rateDetailsInfo> <tariffInfo> <rateAmount>114.96</rateAmount> <rateCurrency>EUR</rateCurrency> <rateAmountQualifier>904</rateAmountQualifier> </tariffInfo> </rateDetailsInfo> <dummy></dummy> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>108</type> <description>IES</description> <comment>VEH LIC COST RECVRY</comment> </chargeDetails> <chargeDetails> <type>108</type> <amount>0.00</amount> <periodType>004</periodType> <currency>EUR</currency> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>108</type> <description>IES</description> <comment>AIRPORT FEE</comment> </chargeDetails> <chargeDetails> <type>108</type> <amount>0.00</amount> <periodType>004</periodType> <currency>EUR</currency> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>108</type> <description>MAN</description> <comment>FEE MAY APPLY IN CASE OF CANCELLATION</comment> </chargeDetails> </taxSurchargeCoverageInfo> <additionalInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>SI</informationType> <companyId>1A</companyId> <encoding>1</encoding> </freeTextDetails> <freeText>CALL HERTZ FOR FURTHER CANCELLATION FEE INFORMATION</freeText> </additionalInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>COV</type> <description>IES</description> <comment>TP - THEFT PROTECTION</comment> </chargeDetails> <chargeDetails> <type>COV</type> <amount>0.00</amount> <periodType>004</periodType> <currency>EUR</currency> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>COV</type> <description>IES</description> <comment>CDW - COLLISION DAMAGE WAIVER</comment> </chargeDetails> <chargeDetails> <type>COV</type> <amount>0.00</amount> <periodType>004</periodType> <currency>EUR</currency> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>COV</type> <description>OPT</description> <comment>PAE - PERSONAL ACCIDENT AND EFFECTS COVER</comment> </chargeDetails> <chargeDetails> <type>COV</type> <amount>7.53</amount> <periodType>001</periodType> <currency>EUR</currency> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>COV</type> <description>OPT</description> <comment>SUP - SUPER COVER</comment> </chargeDetails> <chargeDetails> <type>COV</type> <amount>13.80</amount> <periodType>001</periodType> <currency>EUR</currency> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>045</type> <amount>19.60</amount> <description>IES</description> <periodType>012</periodType> <comment>TAX</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <vehicleInfoGroup> <vehicleDetails> <vehicleCharacteristic> <vehicleTypeOwner>ACR</vehicleTypeOwner> <vehicleRentalPrefType>MBMI</vehicleRentalPrefType> </vehicleCharacteristic> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>SI</informationType> <companyId>1A</companyId> <encoding>1</encoding> </freeTextDetails> <carModel>DESCRIPTION NOT AVAILABLE</carModel> </vehicleDetails> </vehicleInfoGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>01</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>02</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>03</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>04</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>05</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> <dateTimeInfo> <businessSemantic>PKT</businessSemantic> <beginDateTime> <hour>12</hour> <minutes>0</minutes> </beginDateTime> <endDateTime> <hour>24</hour> <minutes>0</minutes> </endDateTime> </dateTimeInfo> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>06</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>07</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>OWI</type> <qualifier>005</qualifier> </ruleDetails> </otherRules> <dateTimeInfo> <businessSemantic>PKT</businessSemantic> <beginDateTime> <hour>6</hour> <minutes>30</minutes> </beginDateTime> <endDateTime> <hour>20</hour> <minutes>0</minutes> </endDateTime> </dateTimeInfo> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>ADP</type> </ruleDetails> <ruleText> <textType>ADP</textType> <freeText>MUST INCLUDE GUARANTEE FIELD</freeText> </ruleText> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>ADB</type> <quantity>2</quantity> <quantityUnit>002</quantityUnit> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>GUA</type> <quantity>365</quantity> <quantityUnit>3</quantityUnit> </ruleDetails> <ruleText> <textType>GUA</textType> <freeText>RATE GUARANTEED 365 DAYS FROM BOOKING</freeText> </ruleText> </otherRules> <dateTimeInfo> <businessSemantic>BED</businessSemantic> <beginDateTime> <year>2020</year> <month>7</month> <day>26</day> </beginDateTime> <endDateTime> <year>2020</year> <month>7</month> <day>26</day> </endDateTime> </dateTimeInfo> </otherRulesGroup> <pickupDropoffLocation> <locationCode> <locationType>176</locationType> <locationDescription> <code>1A</code> <name>NCE</name> </locationDescription> </locationCode> <address> <addressDetails> <format>5</format> <line1>AEROPORT DE NICE COTE DAZUR</line1> </addressDetails> <city>NICE (R) 06821</city> <countryCode>FR</countryCode> </address> <openingHours> <businessSemantic>OCH</businessSemantic> <beginDateTime> <hour>6</hour> <minutes>30</minutes> </beginDateTime> <endDateTime> <hour>24</hour> <minutes>0</minutes> </endDateTime> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <phone> <phoneOrEmailType>PHO</phoneOrEmailType> <telephoneNumber> <telephoneNumber>0825342343</telephoneNumber> </telephoneNumber> </phone> </pickupDropoffLocation> <rateCodeGroup> <rateCode> <fareCategories> <fareType>ILL3FR</fareType> </fareCategories> </rateCode> <additionalInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>SI</informationType> <companyId>1A</companyId> <encoding>1</encoding> </freeTextDetails> <freeText>PROMO 3 WE WEB</freeText> </additionalInfo> </rateCodeGroup> </rateDetails> </Car\_RateInformationFromAvailabilityReply>

## 5.2.3 Possible Errors

See "Error Messages" section.

* * *

## 5.3 Operation: Rate Information for one way rate

This operation shows an example of the case when the WBS customer requests the rate information from availability of a one way rate with drop off charges associated to it.

In the reply it's possible to see the information of these drop off charges, like in the 'ONE WAY CHARGE' inside one of the 'chargeDetails' tag, or in the 'ruleDetails' tag of type OWI (one way only).

## 5.3.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Car\_RateInformationFromAvailability xmlns="http://xml.amadeus.com/RCFARQ\_22\_2\_1A"> <companyDetails> <travelSector>CAR</travelSector> <companyCode>ZE</companyCode> <companyName>HERTZ</companyName> <accessLevel>CP</accessLevel> </companyDetails> <rateSource> <selectionDetails> <option>P6</option> </selectionDetails> </rateSource> <pickupDropoffLocs> <locationType>176</locationType> <locationDescription> <code>1A</code> <name>NCE</name> </locationDescription> </pickupDropoffLocs> <pickupDropoffLocs> <locationType>DOL</locationType> <locationDescription> <code>1A</code> <name>MAD</name> </locationDescription> </pickupDropoffLocs> <pickupDropoffTimes> <businessSemantic>PDA</businessSemantic> <beginDateTime> <year>2020</year> <month>8</month> <day>12</day> <hour>9</hour> <minutes>0</minutes> </beginDateTime> <endDateTime> <year>2020</year> <month>8</month> <day>13</day> <hour>9</hour> <minutes>0</minutes> </endDateTime> </pickupDropoffTimes> <rateInfo> <tariffInfo> <rateType>TWSFGN9Q01</rateType> <ratePlanIndicator>DY</ratePlanIndicator> </tariffInfo> <rateInformation> <category>024</category> </rateInformation> </rateInfo> <rateCodeInfo> <fareCategories> <fareType>JIL3GL</fareType> </fareCategories> </rateCodeInfo> <vehicleInformation> <vehTypeOptionQualifier>VT</vehTypeOptionQualifier> <vehicleRentalNeedType> <vehicleTypeOwner>ACR</vehicleTypeOwner> <vehicleRentalPrefType>MBMI</vehicleRentalPrefType> </vehicleRentalNeedType> </vehicleInformation> </Car\_RateInformationFromAvailability>

## 5.3.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Car\_RateInformationFromAvailabilityReply xmlns="http://xml.amadeus.com/RCFARR\_22\_2\_1A"> <rateDetails> <companyIdentification> <travelSector>CAR</travelSector> <companyCode>ZE</companyCode> <companyName>HERTZ</companyName> <accessLevel>CP</accessLevel> </companyIdentification> <sourceLevel> <selectionDetails> <option>P6</option> </selectionDetails> </sourceLevel> <rateDetailsInfo> <tariffInfo> <rateAmount>133.99</rateAmount> <rateCurrency>EUR</rateCurrency> <rateType>DY</rateType> <rateAmountQualifier>RP</rateAmountQualifier> <rateChangeIndicator>GUA</rateChangeIndicator> </tariffInfo> <associatedCharges> <chargeType>034</chargeType> <amountQualifier>UNL</amountQualifier> </associatedCharges> <associatedCharges> <chargeType>108</chargeType> <amount>265.00</amount> <freeText>ONE WAY CHARGE</freeText> </associatedCharges> <associatedCharges> <chargeType>108</chargeType> <amount>7.80</amount> <freeText>VEHICLE LICENSING FEE AND ROAD TAX</freeText> </associatedCharges> <associatedCharges> <chargeType>108</chargeType> <amount>33.50</amount> <freeText>LOCATION SERVICE CHARGE</freeText> </associatedCharges> <associatedCharges> <chargeType>COV</chargeType> <amount>23.82</amount> <freeText>TP - THEFT PROTECTION</freeText> </associatedCharges> <associatedCharges> <chargeType>COV</chargeType> <amount>55.17</amount> <freeText>CDW - COLLISION DAMAGE WAIVER</freeText> </associatedCharges> <associatedCharges> <chargeType>045</chargeType> <amount>154.31</amount> <freeText>TAX</freeText> </associatedCharges> </rateDetailsInfo> <rateDetailsInfo> <tariffInfo> <rateAmount>401.97</rateAmount> <rateCurrency>EUR</rateCurrency> <rateAmountQualifier>RB</rateAmountQualifier> </tariffInfo> <associatedCharges> <chargeType>NBD</chargeType> <amount>3</amount> </associatedCharges> </rateDetailsInfo> <rateDetailsInfo> <tariffInfo> <rateAmount>941.57</rateAmount> <rateCurrency>EUR</rateCurrency> <rateAmountQualifier>904</rateAmountQualifier> </tariffInfo> </rateDetailsInfo> <dummy></dummy> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>108</type> <amount>265.00</amount> <description>IES</description> <periodType>004</periodType> <currency>EUR</currency> <comment>ONE WAY CHARGE</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>108</type> <amount>2.60</amount> <description>IES</description> <periodType>001</periodType> <currency>EUR</currency> <comment>VEHICLE LICENSING FEE AND ROAD TAX</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>108</type> <amount>33.50</amount> <description>IES</description> <periodType>004</periodType> <currency>EUR</currency> <comment>LOCATION SERVICE CHARGE</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>COV</type> <amount>23.82</amount> <description>IES</description> <periodType>004</periodType> <currency>EUR</currency> <comment>TP - THEFT PROTECTION</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>COV</type> <amount>55.17</amount> <description>IES</description> <periodType>004</periodType> <currency>EUR</currency> <comment>CDW - COLLISION DAMAGE WAIVER</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>COV</type> <amount>7.53</amount> <description>OPT</description> <periodType>001</periodType> <currency>EUR</currency> <comment>PAE - PERSONAL ACCIDENT AND EFFECTS COVER</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>COV</type> <amount>13.80</amount> <description>OPT</description> <periodType>001</periodType> <currency>EUR</currency> <comment>SUP - SUPER COVER</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>045</type> <amount>19.60</amount> <description>IES</description> <periodType>012</periodType> <comment>TAX</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <vehicleInfoGroup> <vehicleDetails> <vehicleCharacteristic> <vehicleTypeOwner>ACR</vehicleTypeOwner> <vehicleRentalPrefType>MBMI</vehicleRentalPrefType> </vehicleCharacteristic> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>SI</informationType> <companyId>1A</companyId> <encoding>1</encoding> </freeTextDetails> <carModel>DESCRIPTION NOT AVAILABLE</carModel> </vehicleDetails> </vehicleInfoGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>01</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>02</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>03</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>04</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>05</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>06</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantity>3</quantity> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>07</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>OWI</type> <qualifier>006</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>GUA</type> <quantity>365</quantity> <quantityUnit>3</quantityUnit> </ruleDetails> <ruleText> <textType>GUA</textType> <freeText>RATE GUARANTEED 365 DAYS FROM BOOKING</freeText> </ruleText> </otherRules> <dateTimeInfo> <businessSemantic>BED</businessSemantic> <beginDateTime> <year>2020</year> <month>7</month> <day>25</day> </beginDateTime> <endDateTime> <year>2020</year> <month>7</month> <day>25</day> </endDateTime> </dateTimeInfo> </otherRulesGroup> <pickupDropoffLocation> <locationCode> <locationType>176</locationType> <locationDescription> <code>1A</code> <name>NCE</name> </locationDescription> </locationCode> <address> <addressDetails> <format>5</format> <line1>AEROPORT DE NICE COTE D?AZUR</line1> </addressDetails> <city>NICE (R) 06821</city> <countryCode>FR</countryCode> </address> <openingHours> <businessSemantic>OCH</businessSemantic> <beginDateTime> <hour>6</hour> <minutes>30</minutes> </beginDateTime> <endDateTime> <hour>24</hour> <minutes>0</minutes> </endDateTime> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <phone> <phoneOrEmailType>PHO</phoneOrEmailType> <telephoneNumber> <telephoneNumber>0825342343</telephoneNumber> </telephoneNumber> </phone> </pickupDropoffLocation> <pickupDropoffLocation> <locationCode> <locationType>DOL</locationType> <locationDescription> <code>1A</code> <name>MAD</name> </locationDescription> </locationCode> <address> <addressDetails> <format>5</format> <line1>TERMINALS 1 AND 4</line1> </addressDetails> <city>MADRID 28042</city> <countryCode>ES</countryCode> </address> <openingHours> <businessSemantic>OCH</businessSemantic> <beginDateTime> <hour>0</hour> <minutes>0</minutes> </beginDateTime> <endDateTime> <hour>2</hour> <minutes>30</minutes> </endDateTime> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> <beginDateTime> <hour>7</hour> <minutes>0</minutes> </beginDateTime> <endDateTime> <hour>24</hour> <minutes>0</minutes> </endDateTime> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <phone> <phoneOrEmailType>PHO</phoneOrEmailType> <telephoneNumber> <telephoneNumber>913338331</telephoneNumber> </telephoneNumber> </phone> </pickupDropoffLocation> <rateCodeGroup> <rateCode> <fareCategories> <fareType>JIL3GL</fareType> </fareCategories> </rateCode> <additionalInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>SI</informationType> <companyId>1A</companyId> <encoding>1</encoding> </freeTextDetails> <freeText>STD UNLIMITED</freeText> </additionalInfo> </rateCodeGroup> </rateDetails> </Car\_RateInformationFromAvailabilityReply>

## 5.3.3 Possible Errors

See "Error Messages" section.

* * *

## 5.4 Operation: Rate information with base rate breakdown information

-   In this operation we show an example of response for Car\_RateInformationAfterAvailability for a corporate rate with base rate breakdown information returned by the provider.

For this example we will use :

-   The same location for pick-up and drop-off
-   a rental period of 6 days with a WY rate plan.
-   limited mileage

This example will show how the base rate breakdown information are returned in the rate details part by unit period (1 week and 1 day).

In the rate details segment for the base rate we can see those repetition:

\*217:150::1 

-   217 is the weekly amount charge type
-   150 is the base rate amount per week
-   1 is the number of weeks used in the base rate calculation

\*218:25::1

-   218 is the daily amount charge type
-   25 is the base rate amount per day
-   1 is the number of days used in the base rate calculation 

\*034:1750::1:002

-   034 is the free kilometer charge type
-   1750 is the amount of free kilometer per period type
-   1 is the number of this period type used in the base rate
-   002 is the weekly period type

\*034:250::1:001

-   034 is the free kilometer charge type
-   250 is the amount of free kilometer per period type
-   1 is the number of this period type used in the base rate
-   001 is the daily period type

This means that the base rate is composed of

-   1 week for an amount of 150 EUR which gives 1750 free km
-   1 day for an amount of 25 EUR which gives 250 free km

So the base rate is of 175 EUR and provides 2000 free kilometers.

## 5.4.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Car\_RateInformationFromAvailability xmlns="http://xml.amadeus.com/RCFARQ\_22\_2\_1A"> <companyDetails> <travelSector>CAR</travelSector> <companyCode>SX</companyCode> </companyDetails> <rateSource> <selectionDetails> <option>P6</option> </selectionDetails> </rateSource> <pickupDropoffLocs> <locationType>176</locationType> <locationDescription> <code>1A</code> <name>NCET01</name> </locationDescription> </pickupDropoffLocs> <pickupDropoffLocs> <locationType>DOL</locationType> <locationDescription> <code>1A</code> <name>NCET01</name> </locationDescription> </pickupDropoffLocs> <pickupDropoffTimes> <businessSemantic>PDA</businessSemantic> <beginDateTime> <year>2020</year> <month>6</month> <day>10</day> <hour>9</hour> <minutes>0</minutes> </beginDateTime> <endDateTime> <year>2020</year> <month>6</month> <day>16</day> <hour>9</hour> <minutes>0</minutes> </endDateTime> </pickupDropoffTimes> <rateInfo> <tariffInfo> <rateType>1</rateType> <ratePlanIndicator>WY</ratePlanIndicator> </tariffInfo> </rateInfo> <rateCodeInfo> <fareCategories> <fareType>IR09</fareType> </fareCategories> </rateCodeInfo> <vehicleInformation> <vehTypeOptionQualifier>VT</vehTypeOptionQualifier> <vehicleRentalNeedType> <vehicleTypeOwner>ACR</vehicleTypeOwner> <vehicleRentalPrefType>ECMR</vehicleRentalPrefType> </vehicleRentalNeedType> </vehicleInformation> </Car\_RateInformationFromAvailability>

## 5.4.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Car\_RateInformationFromAvailabilityReply xmlns="http://xml.amadeus.com/RCFARR\_22\_2\_1A"> <rateDetails> <companyIdentification> <travelSector>CAR</travelSector> <companyCode>SX</companyCode> <companyName>SIXT</companyName> <accessLevel>CP</accessLevel> </companyIdentification> <sourceLevel> <selectionDetails> <option>P6</option> </selectionDetails> </sourceLevel> <mktText> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>MK</informationType> <companyId>1A</companyId> <encoding>1</encoding> </freeTextDetails> <freeText> AMADEUS RATE FEATURES</freeText> </mktText> <rateDetailsInfo> <tariffInfo> <rateAmount>150</rateAmount> <rateCurrency>EUR</rateCurrency> <rateType>WY</rateType> <rateAmountQualifier>RP</rateAmountQualifier> <rateChangeIndicator>GUA</rateChangeIndicator> </tariffInfo> <associatedCharges> <chargeType>034</chargeType> <amount>2000</amount> <chargePeriodTypeCode>K</chargePeriodTypeCode> </associatedCharges> </rateDetailsInfo> <rateDetailsInfo> <tariffInfo> <rateAmount>175</rateAmount> <rateCurrency>EUR</rateCurrency> <rateAmountQualifier>RB</rateAmountQualifier> </tariffInfo> <associatedCharges> <chargeType>NBD</chargeType> <amount>6</amount> </associatedCharges> <associatedCharges> <chargeType>217</chargeType> <amount>150</amount> <quantity>1</quantity> </associatedCharges> <associatedCharges> <chargeType>218</chargeType> <amount>25</amount> <quantity>1</quantity> </associatedCharges> <associatedCharges> <chargeType>034</chargeType> <amount>1750</amount> <quantity>1</quantity> <chargePeriodTypeCode>002</chargePeriodTypeCode> </associatedCharges> <associatedCharges> <chargeType>034</chargeType> <amount>250</amount> <quantity>1</quantity> <chargePeriodTypeCode>001</chargePeriodTypeCode> </associatedCharges> </rateDetailsInfo> <dummy></dummy> <remarks> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>SI</informationType> <companyId>1A</companyId> <encoding>1</encoding> </freeTextDetails> <freeText>MUST RETURN TO REQUESTED CITY</freeText> <freeText>MUST INCLUDE QUALIFYING AWD NUMBER IN /CD- FIELD</freeText> <freeText>THE MINIMUM RENTAL PERIOD IS 001 DAYS</freeText> <freeText> 29.26 DAMAGE ADMIN FEE MAY APPLY</freeText> </remarks> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>COV</type> <amount>.84</amount> <description>OPT</description> <periodType>001</periodType> <currency>EUR</currency> <comment>YNG - YOUNG DRIVERS INSURANCE</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <vehicleInfoGroup> <vehicleDetails> <vehicleCharacteristic> <vehicleTypeOwner>ACR</vehicleTypeOwner> <vehicleRentalPrefType>ECMR</vehicleRentalPrefType> </vehicleCharacteristic> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>SI</informationType> <companyId>1A</companyId> <encoding>1</encoding> </freeTextDetails> <carModel>REFER TO POLICY PAGE CPOZIXXX/VEH</carModel> </vehicleDetails> </vehicleInfoGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>01</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>02</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>03</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>04</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>05</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>06</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>07</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <pickupDropoffLocation> <locationCode> <locationType>176</locationType> <locationDescription> <code>1A</code> <name>GNBC88</name> </locationDescription> </locationCode> <address> <addressDetails> <format>5</format> <line1>LYON ST EXUPERY AEROPORT</line1> </addressDetails> <city>COLOMBIER SAUGNIEU69125</city> <countryCode>FR</countryCode> </address> <openingHours> <businessSemantic>OCH</businessSemantic> <beginDateTime> <hour>7</hour> <minutes>0</minutes> </beginDateTime> <endDateTime> <hour>23</hour> <minutes>59</minutes> </endDateTime> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <phone> <phoneOrEmailType>PHO</phoneOrEmailType> <telephoneNumber> <telephoneNumber>0820 61 16 60</telephoneNumber> </telephoneNumber> </phone> <phone> <phoneOrEmailType>FAX</phoneOrEmailType> <telephoneNumber> <telephoneNumber>04 72 22 71 82</telephoneNumber> </telephoneNumber> </phone> </pickupDropoffLocation> <pickupDropoffLocation> <locationCode> <locationType>DOL</locationType> <locationDescription> <code>1A</code> <name>BIQT51</name> </locationDescription> </locationCode> <address> <addressDetails> <format>5</format> <line1>LYON ST EXUPERY AEROPORT</line1> </addressDetails> <city>COLOMBIER SAUGNIEU69125</city> <countryCode>FR</countryCode> </address> <openingHours> <businessSemantic>OCH</businessSemantic> <beginDateTime> <hour>7</hour> <minutes>0</minutes> </beginDateTime> <endDateTime> <hour>23</hour> <minutes>59</minutes> </endDateTime> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> </pickupDropoffLocation> <rateCodeGroup> <rateCode> <fareCategories> <fareType>KAI</fareType> </fareCategories> </rateCode> <additionalInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>SI</informationType> <companyId>1A</companyId> <encoding>1</encoding> </freeTextDetails> <freeText>RENNES ATALANTE</freeText> </additionalInfo> </rateCodeGroup> </rateDetails> </Car\_RateInformationFromAvailabilityReply>

## 5.4.3 Possible Errors

See "Error Messages" section.

* * *

## 5.5 Operation: Rate Information with currency conversion

In the example below, the WBS customers can see how to use the rate currency conversion (for information purposes only).

There are two ways to trigger this functionality, which you can find below :

\-If a currency code specified in Car Rate Information from Availability request (the explicit way),  
is different than the one received in the retrieved content - i.e. a different currency code is returned by the car provider's system for a location in the reply

\-Or if the default currency code of the office id or the point of sale of the WBS customer differs from the currency of the location (the implicit way) sent by the car provider in the reply,

In all the above cases, Amadeus Car Application performs a currency conversion of the retrieved amounts, based on the conversion rates stored in Amadeus.

The corresponding currencies that are returned for different amounts in the Car Rate Information from Avail Reply, are the following :  
\-original currency (received from the car provider system) and the converted currency (conversion done by Amadeus Car Application) for the Estimated total, Rate Plan, Base Rate and Charges,  
\-with an indicator (rateConvertedQualifier) as '4' telling which amounts are converted. 

As per design and requirements, no currency conversion is applied in the case of PPA - Pre-Payable amount and TCA - Total Commissionable Amount for Rate Information, we will only display the original currency for PPA and TCA after the Estimated total.

However, for <taxCovSurchargeGroup\>, Amadeus Car Application will return only the converted currency.

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

## 5.5.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Car\_RateInformationFromAvailability xmlns="http://xml.amadeus.com/RCFARQ\_22\_2\_1A"> <companyDetails> <travelSector>CAR</travelSector> <companyCode>ZE</companyCode> </companyDetails> <rateSource> <selectionDetails> <option>P6</option> </selectionDetails> </rateSource> <pickupDropoffLocs> <locationType>176</locationType> <locationDescription> <code>1A</code> <name>BLFT19</name> </locationDescription> </pickupDropoffLocs> <pickupDropoffLocs> <locationType>DOL</locationType> <locationDescription> <code>1A</code> <name>CHIT10</name> </locationDescription> </pickupDropoffLocs> <pickupDropoffTimes> <businessSemantic>PDA</businessSemantic> <beginDateTime> <year>2021</year> <month>11</month> <day>11</day> <hour>10</hour> <minutes>0</minutes> </beginDateTime> <endDateTime> <year>2021</year> <month>11</month> <day>20</day> <hour>11</hour> <minutes>0</minutes> </endDateTime> </pickupDropoffTimes> <rateInfo> <tariffInfo> <rateType>O4TZ5HWQ01</rateType> <ratePlanIndicator>WY</ratePlanIndicator> </tariffInfo> <rateInformation> <category>24</category> </rateInformation> </rateInfo> <rateCodeInfo> <fareCategories> <fareType>ICOD2</fareType> </fareCategories> </rateCodeInfo> <vehicleInformation> <vehTypeOptionQualifier>VT</vehTypeOptionQualifier> <vehicleRentalNeedType> <vehicleTypeOwner>ACR</vehicleTypeOwner> <vehicleRentalPrefType>CCAR</vehicleRentalPrefType> </vehicleRentalNeedType> </vehicleInformation> <currency> <currencyDetails> <currencyQualifier>6</currencyQualifier> <currencyIsoCode>EUR</currencyIsoCode> </currencyDetails> </currency> </Car\_RateInformationFromAvailability>

## 5.5.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Car\_RateInformationFromAvailabilityReply xmlns="http://xml.amadeus.com/RCFARR\_22\_2\_1A"> <rateDetails> <companyIdentification> <travelSector>CAR</travelSector> <companyCode>ZE</companyCode> <companyName>HERTZ</companyName> <accessLevel>CP</accessLevel> </companyIdentification> <sourceLevel> <selectionDetails> <option>P6</option> </selectionDetails> </sourceLevel> <rateDetailsInfo> <tariffInfo> <rateAmount>160.75</rateAmount> <rateCurrency>EUR</rateCurrency> <rateType>DY</rateType> <rateAmountQualifier>RP</rateAmountQualifier> <rateConvertedQualifier>4</rateConvertedQualifier> <rateChangeIndicator>GUA</rateChangeIndicator> </tariffInfo> <associatedCharges> <chargeType>033</chargeType> <amountQualifier>UNL</amountQualifier> <chargePeriodTypeCode>004</chargePeriodTypeCode> </associatedCharges> <associatedCharges> <chargeType>008</chargeType> <amount>60.49</amount> <currencyCode>EUR</currencyCode> </associatedCharges> <associatedCharges> <chargeType>009</chargeType> <amount>16.02</amount> <currencyCode>EUR</currencyCode> </associatedCharges> <associatedCharges> <chargeType>80</chargeType> <amountQualifier>UNL</amountQualifier> </associatedCharges> <associatedCharges> <chargeType>82</chargeType> <amountQualifier>UNL</amountQualifier> </associatedCharges> <associatedCharges> <chargeType>108</chargeType> <amount>57.04</amount> <currencyCode>EUR</currencyCode> <freeText>OWC - ONE WAY CHARGE</freeText> </associatedCharges> <associatedCharges> <chargeType>108</chargeType> <amount>17.67</amount> <currencyCode>EUR</currencyCode> <freeText>SCG - AIRPORT CONCESSION RECOVERY\\</freeText> </associatedCharges> <associatedCharges> <chargeType>108</chargeType> <amount>1.73</amount> <currencyCode>EUR</currencyCode> <freeText>SCG - STATE RENTAL TAX\\</freeText> </associatedCharges> <associatedCharges> <chargeType>108</chargeType> <amount>1.29</amount> <currencyCode>EUR</currencyCode> <freeText>ENS - ENERGY SURCHARGE\\</freeText> </associatedCharges> <associatedCharges> <chargeType>045</chargeType> <amount>11.75</amount> <currencyCode>EUR</currencyCode> <freeText>TAX - TAX</freeText> </associatedCharges> <associatedCharges> <chargeType>COL</chargeType> <amount>21.61</amount> <currencyCode>EUR</currencyCode> <freeText>COLLECTION</freeText> </associatedCharges> <associatedCharges> <chargeType>DEL</chargeType> <amount>17.29</amount> <currencyCode>EUR</currencyCode> <freeText>DELIVERY</freeText> </associatedCharges> </rateDetailsInfo> <rateDetailsInfo> <tariffInfo> <rateAmount>185.99</rateAmount> <rateCurrency>USD</rateCurrency> <rateType>DY</rateType> <rateAmountQualifier>RP</rateAmountQualifier> <rateChangeIndicator>GUA</rateChangeIndicator> </tariffInfo> <associatedCharges> <chargeType>033</chargeType> <amountQualifier>UNL</amountQualifier> <chargePeriodTypeCode>004</chargePeriodTypeCode> </associatedCharges> <associatedCharges> <chargeType>008</chargeType> <amount>69.99</amount> <currencyCode>USD</currencyCode> </associatedCharges> <associatedCharges> <chargeType>009</chargeType> <amount>18.53</amount> <currencyCode>USD</currencyCode> </associatedCharges> <associatedCharges> <chargeType>80</chargeType> <amountQualifier>UNL</amountQualifier> </associatedCharges> <associatedCharges> <chargeType>82</chargeType> <amountQualifier>UNL</amountQualifier> </associatedCharges> <associatedCharges> <chargeType>108</chargeType> <amount>66.00</amount> <currencyCode>USD</currencyCode> <freeText>OWC - ONE WAY CHARGE</freeText> </associatedCharges> <associatedCharges> <chargeType>108</chargeType> <amount>20.45</amount> <currencyCode>USD</currencyCode> <freeText>SCG - AIRPORT CONCESSION RECOVERY\\</freeText> </associatedCharges> <associatedCharges> <chargeType>108</chargeType> <amount>2.00</amount> <currencyCode>USD</currencyCode> <freeText>SCG - STATE RENTAL TAX\\</freeText> </associatedCharges> <associatedCharges> <chargeType>108</chargeType> <amount>1.49</amount> <currencyCode>USD</currencyCode> <freeText>ENS - ENERGY SURCHARGE\\</freeText> </associatedCharges> <associatedCharges> <chargeType>045</chargeType> <amount>13.59</amount> <currencyCode>USD</currencyCode> <freeText>TAX - TAX</freeText> </associatedCharges> <associatedCharges> <chargeType>COL</chargeType> <amount>25.00</amount> <currencyCode>USD</currencyCode> <freeText>COLLECTION</freeText> </associatedCharges> <associatedCharges> <chargeType>DEL</chargeType> <amount>20.00</amount> <currencyCode>USD</currencyCode> <freeText>DELIVERY</freeText> </associatedCharges> </rateDetailsInfo> <rateDetailsInfo> <tariffInfo> <rateAmount>176.77</rateAmount> <rateCurrency>EUR</rateCurrency> <rateAmountQualifier>RB</rateAmountQualifier> <rateConvertedQualifier>4</rateConvertedQualifier> </tariffInfo> <associatedCharges> <chargeType>NBD</chargeType> <amount>1</amount> </associatedCharges> <associatedCharges> <chargeType>NBH</chargeType> <amount>1</amount> </associatedCharges> </rateDetailsInfo> <rateDetailsInfo> <tariffInfo> <rateAmount>204.52</rateAmount> <rateCurrency>USD</rateCurrency> <rateAmountQualifier>RB</rateAmountQualifier> </tariffInfo> <associatedCharges> <chargeType>NBD</chargeType> <amount>1</amount> </associatedCharges> <associatedCharges> <chargeType>NBH</chargeType> <amount>1</amount> </associatedCharges> </rateDetailsInfo> <rateDetailsInfo> <tariffInfo> <rateAmount>209.20</rateAmount> <rateCurrency>EUR</rateCurrency> <rateAmountQualifier>904</rateAmountQualifier> <rateConvertedQualifier>4</rateConvertedQualifier> </tariffInfo> </rateDetailsInfo> <rateDetailsInfo> <tariffInfo> <rateAmount>242.05</rateAmount> <rateCurrency>USD</rateCurrency> <rateAmountQualifier>904</rateAmountQualifier> </tariffInfo> </rateDetailsInfo> <rateDetailsInfo> <tariffInfo> <rateAmount>176.05</rateAmount> <rateCurrency>USD</rateCurrency> <rateAmountQualifier>PPA</rateAmountQualifier> </tariffInfo> </rateDetailsInfo> <dummy></dummy> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>108</type> <amount>57.04</amount> <description>IES</description> <currency>EUR</currency> <comment>OWC - ONE WAY CHARGE</comment> </chargeDetails> <chargeDetails> <type>108</type> <amount>57.04</amount> <periodType>004</periodType> <currency>EUR</currency> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>108</type> <amount>17.67</amount> <description>IES</description> <currency>EUR</currency> <comment>SCG - AIRPORT CONCESSION RECOVERY\\</comment> </chargeDetails> <chargeDetails> <type>108</type> <amount>10.00</amount> <periodType>012</periodType> <currency>EUR</currency> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>108</type> <amount>1.73</amount> <description>IES</description> <currency>EUR</currency> <comment>SCG - STATE RENTAL TAX\\</comment> </chargeDetails> <chargeDetails> <type>108</type> <amount>0.86</amount> <periodType>001</periodType> <currency>EUR</currency> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>108</type> <amount>1.29</amount> <description>IES</description> <currency>EUR</currency> <comment>ENS - ENERGY SURCHARGE\\</comment> </chargeDetails> <chargeDetails> <type>108</type> <amount>1.29</amount> <periodType>004</periodType> <currency>EUR</currency> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>108</type> <amount>7.77</amount> <description>OPT</description> <periodType>001</periodType> <currency>EUR</currency> <comment>\\x09RSA - PREMIUM EMERGENCY ROADSIDE ASSISTANCE</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>COV</type> <amount>29.38</amount> <description>OPT</description> <periodType>001</periodType> <currency>EUR</currency> <comment>LDW - LOSS DAMAGE WAIVER</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>COV</type> <amount>6.01</amount> <description>OPT</description> <periodType>001</periodType> <currency>EUR</currency> <comment>PAE - PERSONAL ACCIDENT AND EFFECTS COVER</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>COV</type> <amount>16.29</amount> <description>OPT</description> <periodType>001</periodType> <currency>EUR</currency> <comment>SLI - SUPPLEMENTARY LIABILITY INSURANCE</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>013</type> <description>OPT</description> <comment>CBS - CHILD BOOSTER SEAT</comment> </chargeDetails> <chargeDetails> <type>013</type> <amount>13.66</amount> <periodType>004</periodType> <currency>EUR</currency> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>COL</type> <amount>21.61</amount> <description>IBR</description> <currency>EUR</currency> <comment>COLLECTION</comment> </chargeDetails> <chargeDetails> <type>COL</type> <amount>21.61</amount> <periodType>004</periodType> <currency>EUR</currency> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>DEL</type> <amount>17.29</amount> <description>IES</description> <currency>EUR</currency> <comment>DELIVERY</comment> </chargeDetails> <chargeDetails> <type>DEL</type> <amount>17.29</amount> <periodType>004</periodType> <currency>EUR</currency> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>045</type> <amount>11.75</amount> <description>IES</description> <currency>EUR</currency> <comment>TAX - TAX</comment> </chargeDetails> <chargeDetails> <type>045</type> <amount>6.00</amount> <periodType>012</periodType> <currency>EUR</currency> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <vehicleInfoGroup> <vehicleDetails> <vehicleCharacteristic> <vehicleTypeOwner>ACR</vehicleTypeOwner> <vehicleRentalPrefType>CCAR</vehicleRentalPrefType> </vehicleCharacteristic> </vehicleDetails> </vehicleInfoGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>01</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>02</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>03</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>04</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>05</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>06</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>07</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <pickupDropoffLocation> <locationCode> <locationType>176</locationType> <locationDescription> <code>1A</code> <name>BLFT19</name> </locationDescription> </locationCode> <address> <addressDetails> <format>5</format> <line1>300 MARKELL DR STE 101</line1> </addressDetails> <city>BLUEFIELD 24701</city> <countryCode>US</countryCode> <regionDetails> <code>WV</code> </regionDetails> </address> <openingHours> <businessSemantic>OCH</businessSemantic> <beginDateTime> <hour>9</hour> <minutes>0</minutes> </beginDateTime> <endDateTime> <hour>17</hour> <minutes>0</minutes> </endDateTime> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> </pickupDropoffLocation> <pickupDropoffLocation> <locationCode> <locationType>DOL</locationType> <locationDescription> <code>1A</code> <name>CHIT10</name> </locationDescription> </locationCode> <address> <addressDetails> <format>5</format> <line1>10255 WEST ZEMKE BLVD</line1> </addressDetails> <city>BLUEFIELD 24701</city> <countryCode>US</countryCode> <regionDetails> <code>WV</code> </regionDetails> </address> <openingHours> <businessSemantic>OCH</businessSemantic> <beginDateTime> <hour>5</hour> <minutes>0</minutes> </beginDateTime> <endDateTime> <hour>23</hour> <minutes>59</minutes> </endDateTime> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> </pickupDropoffLocation> <rateCodeGroup> <rateCode> <fareCategories> <fareType>ICOD2</fareType> </fareCategories> </rateCode> </rateCodeGroup> </rateDetails> </Car\_RateInformationFromAvailabilityReply>

## 5.5.3 Possible Errors

See "Error Messages" section.

* * *

## 5.6 Operation: Rate information with customer information

In this example, the WBS cutomer can see how to request rate information after availability using customer information details (discount number, promotional code, itinerary or user identifier).

For this scenario we will use the discount code (CD) F569102, using the tag 'customerInfo' with the format showed below.

## 5.6.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Car\_RateInformationFromAvailability xmlns="http://xml.amadeus.com/RCFARQ\_22\_2\_1A"> <companyDetails> <travelSector>CAR</travelSector> <companyCode>ZE</companyCode> </companyDetails> <rateSource> <selectionDetails> <option>P6</option> </selectionDetails> </rateSource> <pickupDropoffLocs> <locationType>176</locationType> <locationDescription> <code>1A</code> <name>BLFT19</name> </locationDescription> </pickupDropoffLocs> <pickupDropoffLocs> <locationType>DOL</locationType> <locationDescription> <code>1A</code> <name>CHIT10</name> </locationDescription> </pickupDropoffLocs> <pickupDropoffTimes> <businessSemantic>PDA</businessSemantic> <beginDateTime> <year>2021</year> <month>11</month> <day>11</day> <hour>10</hour> <minutes>0</minutes> </beginDateTime> <endDateTime> <year>2021</year> <month>11</month> <day>20</day> <hour>11</hour> <minutes>0</minutes> </endDateTime> </pickupDropoffTimes> <rateInfo> <tariffInfo> <rateType>O4TZ5HWQ01</rateType> <ratePlanIndicator>WY</ratePlanIndicator> </tariffInfo> <rateInformation> <category>24</category> </rateInformation> </rateInfo> <rateCodeInfo> <fareCategories> <fareType>ICOD2</fareType> </fareCategories> </rateCodeInfo> <vehicleInformation> <vehTypeOptionQualifier>VT</vehTypeOptionQualifier> <vehicleRentalNeedType> <vehicleTypeOwner>ACR</vehicleTypeOwner> <vehicleRentalPrefType>CCAR</vehicleRentalPrefType> </vehicleRentalNeedType> </vehicleInformation> <customerInfo> <customerReferences> <referenceQualifier>CD</referenceQualifier> <referenceNumber>F569102</referenceNumber> </customerReferences> </customerInfo> </Car\_RateInformationFromAvailability>

## 5.6.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Car\_RateInformationFromAvailabilityReply xmlns="http://xml.amadeus.com/RCFARR\_22\_2\_1A"> <rateDetails> <companyIdentification> <travelSector>CAR</travelSector> <companyCode>ZE</companyCode> <companyName>HERTZ</companyName> <accessLevel>CP</accessLevel> </companyIdentification> <sourceLevel> <selectionDetails> <option>P6</option> </selectionDetails> </sourceLevel> <rateDetailsInfo> <tariffInfo> <rateAmount>160.75</rateAmount> <rateCurrency>EUR</rateCurrency> <rateType>DY</rateType> <rateAmountQualifier>RP</rateAmountQualifier> <rateChangeIndicator>GUA</rateChangeIndicator> </tariffInfo> <associatedCharges> <chargeType>033</chargeType> <amountQualifier>UNL</amountQualifier> <chargePeriodTypeCode>004</chargePeriodTypeCode> </associatedCharges> <associatedCharges> <chargeType>008</chargeType> <amount>60.49</amount> <currencyCode>EUR</currencyCode> </associatedCharges> <associatedCharges> <chargeType>009</chargeType> <amount>16.02</amount> <currencyCode>EUR</currencyCode> </associatedCharges> <associatedCharges> <chargeType>80</chargeType> <amountQualifier>UNL</amountQualifier> </associatedCharges> <associatedCharges> <chargeType>82</chargeType> <amountQualifier>UNL</amountQualifier> </associatedCharges> <associatedCharges> <chargeType>108</chargeType> <amount>57.04</amount> <currencyCode>EUR</currencyCode> <freeText>OWC - ONE WAY CHARGE</freeText> </associatedCharges> <associatedCharges> <chargeType>108</chargeType> <amount>17.67</amount> <currencyCode>EUR</currencyCode> <freeText>SCG - AIRPORT CONCESSION RECOVERY\\</freeText> </associatedCharges> <associatedCharges> <chargeType>108</chargeType> <amount>1.73</amount> <currencyCode>EUR</currencyCode> <freeText>SCG - STATE RENTAL TAX\\</freeText> </associatedCharges> <associatedCharges> <chargeType>108</chargeType> <amount>1.29</amount> <currencyCode>EUR</currencyCode> <freeText>ENS - ENERGY SURCHARGE\\</freeText> </associatedCharges> <associatedCharges> <chargeType>045</chargeType> <amount>11.75</amount> <currencyCode>EUR</currencyCode> <freeText>TAX - TAX</freeText> </associatedCharges> <associatedCharges> <chargeType>COL</chargeType> <amount>21.61</amount> <currencyCode>EUR</currencyCode> <freeText>COLLECTION</freeText> </associatedCharges> <associatedCharges> <chargeType>DEL</chargeType> <amount>17.29</amount> <currencyCode>EUR</currencyCode> <freeText>DELIVERY</freeText> </associatedCharges> </rateDetailsInfo> <rateDetailsInfo> <tariffInfo> <rateAmount>176.77</rateAmount> <rateCurrency>EUR</rateCurrency> <rateAmountQualifier>RB</rateAmountQualifier> </tariffInfo> <associatedCharges> <chargeType>NBD</chargeType> <amount>1</amount> </associatedCharges> <associatedCharges> <chargeType>NBH</chargeType> <amount>1</amount> </associatedCharges> </rateDetailsInfo> <rateDetailsInfo> <tariffInfo> <rateAmount>209.20</rateAmount> <rateCurrency>EUR</rateCurrency> <rateAmountQualifier>904</rateAmountQualifier> </tariffInfo> </rateDetailsInfo> <rateDetailsInfo> <tariffInfo> <rateAmount>176.05</rateAmount> <rateCurrency>EUR</rateCurrency> <rateAmountQualifier>PPA</rateAmountQualifier> </tariffInfo> </rateDetailsInfo> <dummy></dummy> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>108</type> <amount>57.04</amount> <description>IES</description> <currency>EUR</currency> <comment>OWC - ONE WAY CHARGE</comment> </chargeDetails> <chargeDetails> <type>108</type> <amount>57.04</amount> <periodType>004</periodType> <currency>EUR</currency> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>108</type> <amount>17.67</amount> <description>IES</description> <currency>EUR</currency> <comment>SCG - AIRPORT CONCESSION RECOVERY\\</comment> </chargeDetails> <chargeDetails> <type>108</type> <amount>10.00</amount> <periodType>012</periodType> <currency>EUR</currency> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>108</type> <amount>1.73</amount> <description>IES</description> <currency>EUR</currency> <comment>SCG - STATE RENTAL TAX\\</comment> </chargeDetails> <chargeDetails> <type>108</type> <amount>0.86</amount> <periodType>001</periodType> <currency>EUR</currency> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>108</type> <amount>1.29</amount> <description>IES</description> <currency>EUR</currency> <comment>ENS - ENERGY SURCHARGE\\</comment> </chargeDetails> <chargeDetails> <type>108</type> <amount>1.29</amount> <periodType>004</periodType> <currency>EUR</currency> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>108</type> <amount>7.77</amount> <description>OPT</description> <periodType>001</periodType> <currency>EUR</currency> <comment>\\x09RSA - PREMIUM EMERGENCY ROADSIDE ASSISTANCE</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>COV</type> <amount>29.38</amount> <description>OPT</description> <periodType>001</periodType> <currency>EUR</currency> <comment>LDW - LOSS DAMAGE WAIVER</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>COV</type> <amount>6.01</amount> <description>OPT</description> <periodType>001</periodType> <currency>EUR</currency> <comment>PAE - PERSONAL ACCIDENT AND EFFECTS COVER</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>COV</type> <amount>16.29</amount> <description>OPT</description> <periodType>001</periodType> <currency>EUR</currency> <comment>SLI - SUPPLEMENTARY LIABILITY INSURANCE</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>013</type> <description>OPT</description> <comment>CBS - CHILD BOOSTER SEAT</comment> </chargeDetails> <chargeDetails> <type>013</type> <amount>13.66</amount> <periodType>004</periodType> <currency>EUR</currency> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>COL</type> <amount>21.61</amount> <description>IBR</description> <currency>EUR</currency> <comment>COLLECTION</comment> </chargeDetails> <chargeDetails> <type>COL</type> <amount>21.61</amount> <periodType>004</periodType> <currency>EUR</currency> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>DEL</type> <amount>17.29</amount> <description>IES</description> <currency>EUR</currency> <comment>DELIVERY</comment> </chargeDetails> <chargeDetails> <type>DEL</type> <amount>17.29</amount> <periodType>004</periodType> <currency>EUR</currency> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>045</type> <amount>11.75</amount> <description>IES</description> <currency>EUR</currency> <comment>TAX - TAX</comment> </chargeDetails> <chargeDetails> <type>045</type> <amount>6.00</amount> <periodType>012</periodType> <currency>EUR</currency> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <vehicleInfoGroup> <vehicleDetails> <vehicleCharacteristic> <vehicleTypeOwner>ACR</vehicleTypeOwner> <vehicleRentalPrefType>CCAR</vehicleRentalPrefType> </vehicleCharacteristic> </vehicleDetails> </vehicleInfoGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>01</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>02</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>03</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>04</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>05</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>06</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>07</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <pickupDropoffLocation> <locationCode> <locationType>176</locationType> <locationDescription> <code>1A</code> <name>BLFT19</name> </locationDescription> </locationCode> <address> <addressDetails> <format>5</format> <line1>300 MARKELL DR STE 101</line1> </addressDetails> <city>BLUEFIELD 24701</city> <countryCode>US</countryCode> <regionDetails> <code>WV</code> </regionDetails> </address> <openingHours> <businessSemantic>OCH</businessSemantic> <beginDateTime> <hour>9</hour> <minutes>0</minutes> </beginDateTime> <endDateTime> <hour>17</hour> <minutes>0</minutes> </endDateTime> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> </pickupDropoffLocation> <pickupDropoffLocation> <locationCode> <locationType>DOL</locationType> <locationDescription> <code>1A</code> <name>CHIT10</name> </locationDescription> </locationCode> <address> <addressDetails> <format>5</format> <line1>10255 WEST ZEMKE BLVD</line1> </addressDetails> <city>BLUEFIELD 24701</city> <countryCode>US</countryCode> <regionDetails> <code>WV</code> </regionDetails> </address> <openingHours> <businessSemantic>OCH</businessSemantic> <beginDateTime> <hour>5</hour> <minutes>0</minutes> </beginDateTime> <endDateTime> <hour>23</hour> <minutes>59</minutes> </endDateTime> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> </pickupDropoffLocation> <rateCodeGroup> <rateCode> <fareCategories> <fareType>ICOD2</fareType> </fareCategories> </rateCode> </rateCodeGroup> </rateDetails> </Car\_RateInformationFromAvailabilityReply>

## 5.6.3 Possible Errors

See "Error Messages" section.

* * *

## 5.7 Operation: Rate information with driver information

If the Driver's Age is sent to Car Providers they will return appropriate rate information based on this value. For example, in case of a young driver, the rate will be more expensive.

It is also important to note that the processing will be done on provider's side. As a result, the concept of young/senior driver might differ from provider to another.

## 5.7.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Car\_RateInformationFromAvailability xmlns="http://xml.amadeus.com/RCFARQ\_22\_2\_1A"> <companyDetails> <travelSector>CAR</travelSector> <companyCode>ZI</companyCode> <accessLevel>CP</accessLevel> </companyDetails> <rateSource> <selectionDetails> <option>P6</option> </selectionDetails> </rateSource> <pickupDropoffLocs> <locationType>176</locationType> <locationDescription> <code>1A</code> <name>NCE</name> </locationDescription> </pickupDropoffLocs> <pickupDropoffTimes> <businessSemantic>PDA</businessSemantic> <beginDateTime> <year>2020</year> <month>8</month> <day>14</day> <hour>9</hour> <minutes>0</minutes> </beginDateTime> <endDateTime> <year>2020</year> <month>8</month> <day>15</day> <hour>9</hour> <minutes>0</minutes> </endDateTime> </pickupDropoffTimes> <rateInfo> <tariffInfo> <ratePlanIndicator>DY</ratePlanIndicator> </tariffInfo> <rateInformation> <category>024</category> </rateInformation> </rateInfo> <rateCodeInfo> <fareCategories> <fareType>S3I</fareType> </fareCategories> </rateCodeInfo> <vehicleInformation> <vehTypeOptionQualifier>VT</vehTypeOptionQualifier> <vehicleRentalNeedType> <vehicleTypeOwner>ACR</vehicleTypeOwner> <vehicleRentalPrefType>CDMR</vehicleRentalPrefType> </vehicleRentalNeedType> </vehicleInformation> <driverInfo> <extraPassengerInfo> <age>35</age> </extraPassengerInfo> </driverInfo> </Car\_RateInformationFromAvailability>

## 5.7.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Car\_RateInformationFromAvailabilityReply xmlns="http://xml.amadeus.com/RCFARR\_22\_2\_1A"> <rateDetails> <companyIdentification> <travelSector>CAR</travelSector> <companyCode>ZI</companyCode> <companyName>AVIS</companyName> <accessLevel>CP</accessLevel> </companyIdentification> <sourceLevel> <selectionDetails> <option>P6</option> </selectionDetails> </sourceLevel> <mktText> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>MK</informationType> <companyId>1A</companyId> <encoding>1</encoding> </freeTextDetails> <freeText>AVIS THANKS YOU FOR YOUR BUSINESS</freeText> <freeText> AND FOR USING AMADEUS RATE FEATURES</freeText> </mktText> <rateDetailsInfo> <tariffInfo> <rateAmount>90.57</rateAmount> <rateCurrency>EUR</rateCurrency> <rateType>DY</rateType> <rateAmountQualifier>RP</rateAmountQualifier> <rateChangeIndicator>GUA</rateChangeIndicator> </tariffInfo> <extraRateTypeInfo> <rateCategory>2</rateCategory> </extraRateTypeInfo> <associatedCharges> <chargeType>034</chargeType> <amountQualifier>UNL</amountQualifier> </associatedCharges> <associatedCharges> <chargeType>008</chargeType> <amount>90.57</amount> </associatedCharges> <associatedCharges> <chargeType>009</chargeType> <amount>130.27</amount> </associatedCharges> <associatedCharges> <chargeType>80</chargeType> <amountQualifier>UNL</amountQualifier> </associatedCharges> <associatedCharges> <chargeType>82</chargeType> <amountQualifier>UNL</amountQualifier> </associatedCharges> <associatedCharges> <chargeType>108</chargeType> <amount>42.87</amount> <freeText>LOCATION SURCHARGE</freeText> </associatedCharges> <associatedCharges> <chargeType>108</chargeType> <amount>2.63</amount> <freeText>REGISTRATION FEE / ROAD TAX</freeText> </associatedCharges> <associatedCharges> <chargeType>108</chargeType> <amount>8.92</amount> <freeText>TAX ON MANDATORY ITEMS</freeText> </associatedCharges> <associatedCharges> <chargeType>COV</chargeType> <freeText>CDW - COLLISION DAMAGE WAIVER</freeText> </associatedCharges> <associatedCharges> <chargeType>COV</chargeType> <freeText>PAI - PERSONAL ACCIDENT INSURANCE</freeText> </associatedCharges> <associatedCharges> <chargeType>COV</chargeType> <freeText>TP - THEFT PROTECTION</freeText> </associatedCharges> <associatedCharges> <chargeType>045</chargeType> <freeText>STATE TAX</freeText> </associatedCharges> </rateDetailsInfo> <rateDetailsInfo> <tariffInfo> <rateAmount>90.57</rateAmount> <rateCurrency>EUR</rateCurrency> <rateAmountQualifier>RB</rateAmountQualifier> </tariffInfo> <associatedCharges> <chargeType>NBD</chargeType> <amount>1</amount> </associatedCharges> </rateDetailsInfo> <rateDetailsInfo> <tariffInfo> <rateAmount>144.98</rateAmount> <rateCurrency>EUR</rateCurrency> <rateAmountQualifier>904</rateAmountQualifier> </tariffInfo> </rateDetailsInfo> <dummy></dummy> <remarks> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>SI</informationType> <companyId>1A</companyId> <encoding>1</encoding> </freeTextDetails> <freeText>NO RETURN RESTRICTION</freeText> <freeText>THE MINIMUM RENTAL PERIOD IS 001 DAYS</freeText> <freeText> 29.26 DAMAGE ADMIN FEE MAY APPLY</freeText> </remarks> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>108</type> <amount>42.87</amount> <description>IES</description> <periodType>004</periodType> <currency>EUR</currency> <comment>LOCATION SURCHARGE</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>108</type> <amount>2.63</amount> <description>IES</description> <periodType>001</periodType> <currency>EUR</currency> <comment>REGISTRATION FEE / ROAD TAX</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>108</type> <amount>19.6</amount> <description>IES</description> <periodType>012</periodType> <comment>TAX ON MANDATORY ITEMS</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>108</type> <amount>11.78</amount> <description>OPT</description> <periodType>001</periodType> <currency>EUR</currency> <comment>SPECIAL EQUIPMENT</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>COV</type> <amount>0</amount> <description>IBR</description> <periodType>001</periodType> <currency>EUR</currency> <comment>CDW - COLLISION DAMAGE WAIVER</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>COV</type> <amount>0</amount> <description>IBR</description> <periodType>001</periodType> <currency>EUR</currency> <comment>PAI - PERSONAL ACCIDENT INSURANCE</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>COV</type> <amount>0</amount> <description>IBR</description> <periodType>001</periodType> <currency>EUR</currency> <comment>TP - THEFT PROTECTION</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>COV</type> <amount>13.93</amount> <description>OPT</description> <periodType>001</periodType> <currency>EUR</currency> <comment>SLI - SUPPLEMENTARY LIABILITY INSURANCE</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>045</type> <amount>19.6</amount> <description>IBR</description> <periodType>012</periodType> <comment>STATE TAX</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <vehicleInfoGroup> <vehicleDetails> <vehicleCharacteristic> <vehicleTypeOwner>ACR</vehicleTypeOwner> <vehicleRentalPrefType>CDMR</vehicleRentalPrefType> </vehicleCharacteristic> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>SI</informationType> <companyId>1A</companyId> <encoding>1</encoding> </freeTextDetails> <carModel>REFER TO POLICY PAGE CPOZIXXX/VEH</carModel> </vehicleDetails> </vehicleInfoGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>01</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>02</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>03</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>04</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>05</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>06</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>07</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>GUA</type> <quantity>365</quantity> <quantityUnit>3</quantityUnit> </ruleDetails> <ruleText> <textType>GUA</textType> <freeText>GUARANTEED FOR 365 DAYS</freeText> </ruleText> </otherRules> <dateTimeInfo> <businessSemantic>BED</businessSemantic> <beginDateTime> <year>2020</year> <month>7</month> <day>26</day> </beginDateTime> <endDateTime> <year>2020</year> <month>7</month> <day>26</day> </endDateTime> </dateTimeInfo> </otherRulesGroup> <pickupDropoffLocation> <locationCode> <locationType>176</locationType> <locationDescription> <code>CPY</code> <name>NCET01</name> </locationDescription> </locationCode> <address> <addressDetails> <format>5</format> <line1>NICE AEROPORT 06</line1> </addressDetails> <city>NICE CEDEX 306281</city> <countryCode>FR</countryCode> </address> <openingHours> <businessSemantic>OCH</businessSemantic> <beginDateTime> <hour>6</hour> <minutes>30</minutes> </beginDateTime> <endDateTime> <hour>24</hour> <minutes>0</minutes> </endDateTime> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <phone> <phoneOrEmailType>PHO</phoneOrEmailType> <telephoneNumber> <telephoneNumber>0820 61 16 32</telephoneNumber> </telephoneNumber> </phone> <phone> <phoneOrEmailType>FAX</phoneOrEmailType> <telephoneNumber> <telephoneNumber>04 93 21 49 58</telephoneNumber> </telephoneNumber> </phone> </pickupDropoffLocation> <rateCodeGroup> <rateCode> <fareCategories> <fareType>S3I</fareType> </fareCategories> </rateCode> <additionalInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>SI</informationType> <companyId>1A</companyId> <encoding>1</encoding> </freeTextDetails> <freeText>STD ILL 14-20D</freeText> </additionalInfo> </rateCodeGroup> </rateDetails> </Car\_RateInformationFromAvailabilityReply>

## 5.7.3 Possible Errors

See "Error Messages" section.

* * *

## 5.8 Operation: Rate information with language and terms and conditions returned

This operation allows to  retrieve rate infromation from availability with a specific language. In the response, the WBS customer gets the terms and conditions document in the specified language.

In this example we make a rate information from availability request with the following options:  
   - Car Provider: Hertz  
   - Location: New york  NYCT02

   - rate code: AUA1F

  - vehicle type:  ECAR

    **- Requested language : FR**

## 5.8.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Car\_RateInformationFromAvailability xmlns="http://xml.amadeus.com/RCFARQ\_22\_2\_1A"> <companyDetails> <travelSector>CAR</travelSector> <companyCode>ZE</companyCode> <companyName>HERTZ</companyName> <accessLevel>CP</accessLevel> </companyDetails> <language> <userPreferences> <codedLanguage>EN</codedLanguage> </userPreferences> </language> <language> <userPreferences> <codedLanguage>FR</codedLanguage> </userPreferences> </language> <rateSource> <selectionDetails> <option>P6</option> </selectionDetails> </rateSource> <pickupDropoffLocs> <locationType>176</locationType> <locationDescription> <code>1A</code> <name>NYCT02</name> </locationDescription> </pickupDropoffLocs> <pickupDropoffLocs> <locationType>DOL</locationType> <locationDescription> <code>1A</code> <name>NYCT02</name> </locationDescription> </pickupDropoffLocs> <pickupDropoffTimes> <businessSemantic>PDA</businessSemantic> <beginDateTime> <year>2020</year> <month>4</month> <day>24</day> <hour>10</hour> <minutes>0</minutes> </beginDateTime> <endDateTime> <year>2020</year> <month>4</month> <day>25</day> <hour>11</hour> <minutes>0</minutes> </endDateTime> </pickupDropoffTimes> <rateInfo> <tariffInfo> <rateType>H6TR37RQ01</rateType> <ratePlanIndicator>906</ratePlanIndicator> </tariffInfo> <rateInformation> <category>024</category> </rateInformation> </rateInfo> <rateCodeInfo> <fareCategories> <fareType>AUA1F</fareType> </fareCategories> </rateCodeInfo> <vehicleInformation> <vehTypeOptionQualifier>VT</vehTypeOptionQualifier> <vehicleRentalNeedType> <vehicleTypeOwner>ACR</vehicleTypeOwner> <vehicleRentalPrefType>ECAR</vehicleRentalPrefType> </vehicleRentalNeedType> </vehicleInformation> </Car\_RateInformationFromAvailability>

## 5.8.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Car\_RateInformationFromAvailabilityReply xmlns="http://xml.amadeus.com/RCFARR\_22\_2\_1A"> <rateDetails> <companyIdentification> <travelSector>CAR</travelSector> <companyCode>ZE</companyCode> <companyName>HERTZ</companyName> <accessLevel>CP</accessLevel> </companyIdentification> <sourceLevel> <selectionDetails> <option>P6</option> </selectionDetails> </sourceLevel> <termsAndConditions> <attributeDetails> <attributeType>COR</attributeType> <attributeDescription>http=Terms\_conditions\_ZE\_EMEA&file=1.txt:A</attributeDescription> <language>FR</language> </attributeDetails> </termsAndConditions> <rateDetailsInfo> <tariffInfo> <rateAmount>99.68</rateAmount> <rateCurrency>EUR</rateCurrency> <rateType>DY</rateType> <rateAmountQualifier>RP</rateAmountQualifier> <rateChangeIndicator>GUA</rateChangeIndicator> </tariffInfo> <associatedCharges> <chargeType>034</chargeType> <amountQualifier>UNL</amountQualifier> </associatedCharges> <associatedCharges> <chargeType>108</chargeType> <amount>0.00</amount> <freeText>ONE WAY CHARGE</freeText> </associatedCharges> <associatedCharges> <chargeType>108</chargeType> <amount>7.80</amount> <freeText>GENERAL SURCHARGE</freeText> </associatedCharges> <associatedCharges> <chargeType>COV</chargeType> <amount>33.50</amount> <freeText>ALI - ADDITIONAL LIABILITY INSURANCE</freeText> </associatedCharges> <associatedCharges> <chargeType>COV</chargeType> <freeText>TP - THEFT PROTECTION</freeText> </associatedCharges> <associatedCharges> <chargeType>COV</chargeType> <freeText>CDW - COLLISION DAMAGE WAIVER</freeText> </associatedCharges> <associatedCharges> <chargeType>045</chargeType> <amount>66.71</amount> <freeText>TAX - TAX</freeText> </associatedCharges> </rateDetailsInfo> <rateDetailsInfo> <tariffInfo> <rateAmount>299.04</rateAmount> <rateCurrency>EUR</rateCurrency> <rateAmountQualifier>RB</rateAmountQualifier> </tariffInfo> <associatedCharges> <chargeType>NBD</chargeType> <amount>3</amount> </associatedCharges> </rateDetailsInfo> <rateDetailsInfo> <tariffInfo> <rateAmount>407.05</rateAmount> <rateCurrency>EUR</rateCurrency> <rateAmountQualifier>904</rateAmountQualifier> </tariffInfo> </rateDetailsInfo> <dummy></dummy> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>108</type> <amount>0.00</amount> <description>IES</description> <periodType>004</periodType> <currency>EUR</currency> <comment>OWC - ONE WAY CHARGE</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>108</type> <amount>2.60</amount> <description>IES</description> <periodType>001</periodType> <currency>EUR</currency> <comment>SCG - GENERAL SURCHARGE</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>COV</type> <amount>33.50</amount> <description>IES</description> <periodType>004</periodType> <currency>EUR</currency> <comment>ALI - ADDITIONAL LIABILITY INSURANCE</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>COV</type> <amount>0.00</amount> <description>IBR</description> <periodType>004</periodType> <currency>EUR</currency> <comment>TP - THEFT PROTECTION</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>COV</type> <amount>10.00</amount> <description>IBR</description> <currency>EUR</currency> <comment>CDW - COLLISION DAMAGE WAIVER</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>COV</type> <amount>8.28</amount> <description>OPT</description> <periodType>001</periodType> <currency>EUR</currency> <comment>PAE - PERSONAL ACCIDENT AND EFFECTS COVER</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>COV</type> <amount>15.05</amount> <description>OPT</description> <periodType>001</periodType> <currency>EUR</currency> <comment>COV - SUP - SUPER COVER</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>045</type> <amount>19.60</amount> <description>IES</description> <periodType>012</periodType> <comment>TAX - TAX</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <vehicleInfoGroup> <vehicleDetails> <vehicleCharacteristic> <vehicleTypeOwner>ACR</vehicleTypeOwner> <vehicleRentalPrefType>ECAR</vehicleRentalPrefType> </vehicleCharacteristic> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>SI</informationType> <companyId>1A</companyId> <encoding>1</encoding> </freeTextDetails> <carModel>B - OPEL CORSA OR SIMILAR</carModel> </vehicleDetails> </vehicleInfoGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>01</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>02</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>03</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>04</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>05</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>06</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantity>3</quantity> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>07</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>OWI</type> <qualifier>006</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>GUA</type> <quantity>365</quantity> <quantityUnit>3</quantityUnit> </ruleDetails> <ruleText> <textType>GUA</textType> <freeText>RATE GUARANTEED 365 DAYS FROM BOOKING</freeText> </ruleText> </otherRules> <dateTimeInfo> <businessSemantic>BED</businessSemantic> <beginDateTime> <year>2020</year> <month>2</month> <day>7</day> </beginDateTime> <endDateTime> <year>2020</year> <month>11</month> <day>23</day> </endDateTime> </dateTimeInfo> </otherRulesGroup> <pickupDropoffLocation> <locationCode> <locationType>176</locationType> <locationDescription> <code>1A</code> <name>NYCT02</name> </locationDescription> </locationCode> <address> <addressDetails> <format>5</format> <line1>DE ST GEOIR</line1> </addressDetails> <city>NEW YORK 64600</city> <countryCode>USA</countryCode> </address> <openingHours> <businessSemantic>OCH</businessSemantic> <beginDateTime> <hour>8</hour> <minutes>30</minutes> </beginDateTime> <endDateTime> <hour>12</hour> <minutes>0</minutes> </endDateTime> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> <beginDateTime> <hour>14</hour> <minutes>0</minutes> </beginDateTime> <endDateTime> <hour>17</hour> <minutes>0</minutes> </endDateTime> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <phone> <phoneOrEmailType>EML</phoneOrEmailType> <emailAddress>test@test.com</emailAddress> </phone> <phone> <phoneOrEmailType>PHO</phoneOrEmailType> <emailAddress>49-1806-252525</emailAddress> </phone> <phone> <phoneOrEmailType>FAX</phoneOrEmailType> <telephoneNumber> <telephoneNumber>49-1806-2229302426</telephoneNumber> </telephoneNumber> </phone> </pickupDropoffLocation> <pickupDropoffLocation> <locationCode> <locationType>DOL</locationType> <locationDescription> <code>1A</code> <name>NYCT02</name> </locationDescription> </locationCode> <address> <addressDetails> <format>5</format> <line1>DE ST GEOIR</line1> </addressDetails> <city>NEW YORK 64600</city> <countryCode>USA</countryCode> </address> <openingHours> <businessSemantic>OCH</businessSemantic> <beginDateTime> <hour>7</hour> <minutes>30</minutes> </beginDateTime> <endDateTime> <hour>20</hour> <minutes>0</minutes> </endDateTime> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <phone> <phoneOrEmailType>PHO</phoneOrEmailType> <telephoneNumber> <telephoneNumber>0825387878</telephoneNumber> </telephoneNumber> </phone> </pickupDropoffLocation> <rateCodeGroup> <rateCode> <fareCategories> <fareType>AUA1F</fareType> </fareCategories> </rateCode> <additionalInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>SI</informationType> <companyId>1A</companyId> <encoding>1</encoding> </freeTextDetails> <freeText>JOUR INCL RIHLIT</freeText> </additionalInfo> </rateCodeGroup> </rateDetails> </Car\_RateInformationFromAvailabilityReply>

## 5.8.3 Possible Errors

See "Error Messages" section.

* * *

## 5.9 Operation: Rate information with pre-payable amount

This operation allows to  retrieve rate infromation from availability with the pre-payable amount . In the response the WBS customer gets the amount and the currency - that can be prepaid by prepaid by the end customer to the WBS customer.

In this example we make a rate information from availability request with the following options:  
   - Car Provider: Avis  
   - Location: Paris CDGT01 / Nice NCET01

   - rate code: V2I

  - vehicle type:  CDMR

Customer office - NCE1A0955 is defined in the Amadeus database with a specific rule. In this specific case for ZI the rule : Prepayable amount = estimated total  is applied.the amount returned by the car provider is Euros , therefore the pre payable amoutn is returned in Euros.

## 5.9.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<message agency="1A" release="2" type="RCFARQ" version="22"> <companyDetails> <travelSector>CAR</travelSector> <companyCode>ZI</companyCode> <companyName>AVIS</companyName> <accessLevel>CP</accessLevel> </companyDetails> <language> <userPreferences> <codedLanguage>FR</codedLanguage> </userPreferences> </language> <rateSource> <selectionDetails> <option>P6</option> </selectionDetails> </rateSource> <pickupDropoffLocs> <locationType>176</locationType> <locationDescription> <code>1A</code> <name>CDGT01</name> </locationDescription> </pickupDropoffLocs> <pickupDropoffLocs> <locationType>DOL</locationType> <locationDescription> <code>1A</code> <name>NCET01</name> </locationDescription> </pickupDropoffLocs> <pickupDropoffTimes> <businessSemantic>PDA</businessSemantic> <beginDateTime> <year>2020</year> <month>9</month> <day>30</day> <hour>10</hour> <minutes>0</minutes> </beginDateTime> <endDateTime> <year>2020</year> <month>10</month> <day>1</day> <hour>10</hour> <minutes>0</minutes> </endDateTime> </pickupDropoffTimes> <rateInfo> <tariffInfo> <ratePlanIndicator>DY</ratePlanIndicator> </tariffInfo> <rateInformation> <category>24</category> </rateInformation> </rateInfo> <rateCodeInfo> <fareCategories> <fareType>V2I</fareType> </fareCategories> </rateCodeInfo> <vehicleInformation> <vehTypeOptionQualifier>VT</vehTypeOptionQualifier> <vehicleRentalNeedType> <vehicleTypeOwner>ACR</vehicleTypeOwner> <vehicleRentalPrefType>CDMR</vehicleRentalPrefType> </vehicleRentalNeedType> </vehicleInformation> </message>

## 5.9.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<message agency="1A" release="2" type="RCFARR" version="22"> <rateDetails> <companyIdentification> <travelSector>CAR</travelSector> <companyCode>ZI</companyCode> <companyName>AVIS</companyName> <accessLevel>CP</accessLevel> </companyIdentification> <sourceLevel> <selectionDetails> <option>P6</option> </selectionDetails> </sourceLevel> <mktText> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>MK</informationType> <companyId>1A</companyId> <encoding>1</encoding> </freeTextDetails> <freeText>AVIS THANKS YOU FOR YOUR BUSINESS</freeText> <freeText> AND FOR USING AMADEUS RATE FEATURES</freeText> </mktText> <rateDetailsInfo> <tariffInfo> <rateAmount>101.46</rateAmount> <rateCurrency>EUR</rateCurrency> <rateType>DY</rateType> <rateAmountQualifier>RP</rateAmountQualifier> <rateChangeIndicator>GUA</rateChangeIndicator> </tariffInfo> <extraRateTypeInfo> <rateCategory>2</rateCategory> </extraRateTypeInfo> <chargeDetails> <chargeType>032</chargeType> <amount>.36</amount> </chargeDetails> <chargeDetails> <chargeType>034</chargeType> <quantity>250</quantity> </chargeDetails> <chargeDetails> <chargeType>008</chargeType> <amount>101.46</amount> </chargeDetails> <chargeDetails> <chargeType>XDK</chargeType> <amount>.36</amount> </chargeDetails> <chargeDetails> <chargeType>009</chargeType> <amount>101.46</amount> </chargeDetails> <chargeDetails> <chargeType>XHK</chargeType> <amount>.36</amount> </chargeDetails> <chargeDetails> <chargeType>80</chargeType> <quantity>250</quantity> </chargeDetails> <chargeDetails> <chargeType>82</chargeType> <quantity>250</quantity> </chargeDetails> <chargeDetails> <chargeType>108</chargeType> <amount>34.58</amount> <freeText>LSC - LOCATION SURCHARGE</freeText> </chargeDetails> <chargeDetails> <chargeType>108</chargeType> <amount>2.92</amount> <freeText>RFT - REGISTRATION FEE/ ROAD TAX</freeText> </chargeDetails> <chargeDetails> <chargeType>108</chargeType> <freeText>SLT - SALES TAX</freeText> </chargeDetails> <chargeDetails> <chargeType>108</chargeType> <amount>65.83</amount> <freeText>OWC - ONE WAY CHARGE</freeText> </chargeDetails> <chargeDetails> <chargeType>108</chargeType> <amount>20.67</amount> <freeText>SCG - TAX ON MANDATORY ITEMS</freeText> </chargeDetails> <chargeDetails> <chargeType>COV</chargeType> <freeText>CDW - COLLISION DAMAGE WAIVER</freeText> </chargeDetails> <chargeDetails> <chargeType>COV</chargeType> <freeText>PAI - PERSONAL ACCIDENT INSURANCE</freeText> </chargeDetails> <chargeDetails> <chargeType>COV</chargeType> <freeText>TP - THEFT PROTECTION</freeText> </chargeDetails> </rateDetailsInfo> <rateDetailsInfo> <tariffInfo> <rateAmount>101.46</rateAmount> <rateCurrency>EUR</rateCurrency> <rateAmountQualifier>RB</rateAmountQualifier> </tariffInfo> <chargeDetails> <chargeType>NBD</chargeType> <amount>1</amount> </chargeDetails> </rateDetailsInfo> <rateDetailsInfo> <tariffInfo> <rateAmount>225.46</rateAmount> <rateCurrency>EUR</rateCurrency> <rateAmountQualifier>904</rateAmountQualifier> </tariffInfo> </rateDetailsInfo> <rateDetailsInfo> <tariffInfo> <rateAmount>225.46</rateAmount> <rateCurrency>EUR</rateCurrency> <rateAmountQualifier>PPA</rateAmountQualifier> </tariffInfo> </rateDetailsInfo> <dummy> </dummy> <remarks> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>SI</informationType> <companyId>1A</companyId> <encoding>1</encoding> </freeTextDetails> <freeText>MUST RETURN TO REQUESTED CITY</freeText> <freeText>THE MINIMUM RENTAL PERIOD IS 001 DAYS</freeText> <freeText> 33.33 DAMAGE ADMIN FEE MAY APPLY</freeText> </remarks> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>108</type> <amount>34.58</amount> <description>IES</description> <periodType>004</periodType> <currency>EUR</currency> <comment>LSC - LOCATION SURCHARGE</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>108</type> <amount>2.92</amount> <description>IES</description> <periodType>001</periodType> <currency>EUR</currency> <comment>RFT - REGISTRATION FEE/ ROAD TAX</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>108</type> <amount>20</amount> <description>IBR</description> <periodType>012</periodType> <comment>SLT - SALES TAX</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>108</type> <amount>65.83</amount> <description>IES</description> <periodType>004</periodType> <currency>EUR</currency> <comment>OWC - ONE WAY CHARGE</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>108</type> <amount>20</amount> <description>IES</description> <periodType>012</periodType> <comment>SCG - TAX ON MANDATORY ITEMS</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>COV</type> <amount>0</amount> <description>IBR</description> <periodType>001</periodType> <currency>EUR</currency> <comment>CDW - COLLISION DAMAGE WAIVER</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>COV</type> <amount>0</amount> <description>IBR</description> <periodType>001</periodType> <currency>EUR</currency> <comment>PAI - PERSONAL ACCIDENT INSURANCE</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>COV</type> <amount>0</amount> <description>IBR</description> <periodType>001</periodType> <currency>EUR</currency> <comment>TP - THEFT PROTECTION</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>COV</type> <amount>.84</amount> <description>OPT</description> <periodType>001</periodType> <currency>EUR</currency> <comment>SLI - SUPPLEMENTARY LIABILITY INSURANCE</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>013</type> <description>OPT</description> <comment>CSB - CHILD SEAT FOR BABY</comment> </chargeDetails> <chargeDetails> <type>013</type> <amount>12</amount> <periodType>004</periodType> <currency>EUR</currency> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>013</type> <description>OPT</description> <comment>CBS - CHILD BOOSTER SEAT</comment> </chargeDetails> <chargeDetails> <type>013</type> <amount>6</amount> <periodType>004</periodType> <currency>EUR</currency> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>013</type> <description>OPT</description> <comment>NAV - NAVIGATION SYSTEM</comment> </chargeDetails> <chargeDetails> <type>013</type> <amount>16</amount> <periodType>004</periodType> <currency>EUR</currency> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>013</type> <description>OPT</description> <comment>STR - WINTER TYRES</comment> </chargeDetails> <chargeDetails> <type>013</type> <amount>24</amount> <periodType>004</periodType> <currency>EUR</currency> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>013</type> <description>OPT</description> <comment>WIF - WIFI ACCESS</comment> </chargeDetails> <chargeDetails> <type>013</type> <amount>12</amount> <periodType>004</periodType> <currency>EUR</currency> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <vehicleInfoGroup> <vehicleDetails> <vehicleCharacteristic> <vehicleTypeOwner>ACR</vehicleTypeOwner> <vehicleRentalPrefType>CDMR</vehicleRentalPrefType> </vehicleCharacteristic> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>SI</informationType> <companyId>1A</companyId> <encoding>1</encoding> </freeTextDetails> <carModel>REFER TO POLICY PAGE CPOZIXXX/VEH</carModel> </vehicleDetails> </vehicleInfoGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>01</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>02</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>03</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>04</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>05</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>06</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>07</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>GUA</type> <quantity>365</quantity> <quantityUnit>3</quantityUnit> </ruleDetails> <ruleText> <textType>GUA</textType> <freeText>GUARANTEED FOR 365 DAYS</freeText> </ruleText> </otherRules> <dateTimeInfo> <businessSemantic>BED</businessSemantic> <beginDateTime> <year>2020</year> <month>7</month> <day>30</day> </beginDateTime> <endDateTime> <year>2020</year> <month>9</month> <day>11</day> </endDateTime> </dateTimeInfo> </otherRulesGroup> <pickupDropoffLocation> <locationCode> <locationType>176</locationType> <locationDescription> <code>1A</code> <name>CDGT01</name> </locationDescription> </locationCode> <address> <addressDetails> <format>5</format> <line1>ROISSY AEROPORT TERMINAL ABCD</line1> </addressDetails> <city>ROISSY EN FRANCE95711</city> <countryCode>FR</countryCode> </address> <openingHours> <businessSemantic>OCH</businessSemantic> <beginDateTime> <hour>6</hour> <minutes>0</minutes> </beginDateTime> <endDateTime> <hour>24</hour> <minutes>0</minutes> </endDateTime> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <phone> <phoneOrEmailType>PHO</phoneOrEmailType> <telephoneNumber> <telephoneNumber>0820 61 16 20</telephoneNumber> </telephoneNumber> </phone> <phone> <phoneOrEmailType>FAX</phoneOrEmailType> <telephoneNumber> <telephoneNumber>01 48 62 31 61</telephoneNumber> </telephoneNumber> </phone> </pickupDropoffLocation> <pickupDropoffLocation> <locationCode> <locationType>DOL</locationType> <locationDescription> <code>1A</code> <name>NCET01</name> </locationDescription> </locationCode> <address> <addressDetails> <format>5</format> <line1>NICE AEROPORT 06</line1> </addressDetails> <city>NICE CEDEX 306281</city> <countryCode>FR</countryCode> </address> <openingHours> <businessSemantic>OCH</businessSemantic> <beginDateTime> <hour>6</hour> <minutes>30</minutes> </beginDateTime> <endDateTime> <hour>24</hour> <minutes>0</minutes> </endDateTime> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <phone> <phoneOrEmailType>PHO</phoneOrEmailType> <telephoneNumber> <telephoneNumber>0820 61 16 32</telephoneNumber> </telephoneNumber> </phone> <phone> <phoneOrEmailType>FAX</phoneOrEmailType> <telephoneNumber> <telephoneNumber>04 93 21 49 58</telephoneNumber> </telephoneNumber> </phone> </pickupDropoffLocation> <rateCodeGroup> <rateCode> <fareCategories> <fareType>V2I</fareType> </fareCategories> </rateCode> <additionalInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>SI</informationType> <companyId>1A</companyId> <encoding>1</encoding> </freeTextDetails> <freeText>F DAIL NP L0 NS</freeText> </additionalInfo> </rateCodeGroup> </rateDetails> </message>

## 5.9.3 Possible Errors

See "Error Messages" section.

* * *

## 5.10 Operation: Rate Information with Section filter

This operation shows the way to filter by sections the information that can be obtained with the Car\_RateInformationFromAvailability. This filtering is done when using the 'categorySelection' tag.

In this example, a filter with three differente categories (maximum number allowed), COV, SUR and TAX, is requested.

## 5.10.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Car\_RateInformationFromAvailability xmlns="http://xml.amadeus.com/RCFARQ\_22\_2\_1A"> <companyDetails> <travelSector>CAR</travelSector> <companyCode>ZE</companyCode> <companyName>HERTZ</companyName> <accessLevel>CP</accessLevel> </companyDetails> <rateSource> <selectionDetails> <option>P6</option> </selectionDetails> </rateSource> <pickupDropoffLocs> <locationType>176</locationType> <locationDescription> <code>1A</code> <name>NCE</name> </locationDescription> </pickupDropoffLocs> <pickupDropoffLocs> <locationType>DOL</locationType> <locationDescription> <code>1A</code> <name>NCE</name> </locationDescription> </pickupDropoffLocs> <pickupDropoffTimes> <businessSemantic>PDA</businessSemantic> <beginDateTime> <year>2020</year> <month>8</month> <day>12</day> <hour>9</hour> <minutes>0</minutes> </beginDateTime> <endDateTime> <year>2020</year> <month>8</month> <day>13</day> <hour>9</hour> <minutes>0</minutes> </endDateTime> </pickupDropoffTimes> <rateInfo> <tariffInfo> <rateType>T6IU6S0Q01</rateType> <ratePlanIndicator>DY</ratePlanIndicator> </tariffInfo> <rateInformation> <category>024</category> </rateInformation> </rateInfo> <rateCodeInfo> <fareCategories> <fareType>WST3FR</fareType> </fareCategories> </rateCodeInfo> <vehicleInformation> <vehTypeOptionQualifier>VT</vehTypeOptionQualifier> <vehicleRentalNeedType> <vehicleTypeOwner>ACR</vehicleTypeOwner> <vehicleRentalPrefType>MBMI</vehicleRentalPrefType> </vehicleRentalNeedType> </vehicleInformation> <categorySelection> <selectionDetails> <option>COV</option> </selectionDetails> <otherSelectionDetails> <option>SUR</option> </otherSelectionDetails> <otherSelectionDetails> <option>TAX</option> </otherSelectionDetails> </categorySelection> </Car\_RateInformationFromAvailability>

## 5.10.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Car\_RateInformationFromAvailabilityReply xmlns="http://xml.amadeus.com/RCFARR\_22\_2\_1A"> <rateDetails> <companyIdentification> <travelSector>CAR</travelSector> <companyCode>ZE</companyCode> <companyName>HERTZ</companyName> <accessLevel>CP</accessLevel> </companyIdentification> <sourceLevel> <selectionDetails> <option>P6</option> </selectionDetails> </sourceLevel> <rateDetailsInfo> <tariffInfo> <rateAmount>35.12</rateAmount> <rateCurrency>EUR</rateCurrency> <rateType>WD</rateType> <rateAmountQualifier>RP</rateAmountQualifier> <rateChangeIndicator>GUA</rateChangeIndicator> </tariffInfo> <associatedCharges> <chargeType>032</chargeType> <amount>0.34</amount> </associatedCharges> <associatedCharges> <chargeType>034</chargeType> <quantity>250</quantity> </associatedCharges> <associatedCharges> <chargeType>008</chargeType> <amount>39.29</amount> </associatedCharges> <associatedCharges> <chargeType>XDK</chargeType> <amount>0.34</amount> </associatedCharges> <associatedCharges> <chargeType>80</chargeType> <quantity>250</quantity> </associatedCharges> <associatedCharges> <chargeType>108</chargeType> <amount>7.80</amount> <freeText>VEHICLE LCENSING FEE AND ROAD TAX</freeText> </associatedCharges> <associatedCharges> <chargeType>108</chargeType> <amount>33.50</amount> <freeText>LOCATION SERVICE CHARGE</freeText> </associatedCharges> <associatedCharges> <chargeType>COV</chargeType> <amount>2.52</amount> <freeText>TP - THEFT PROTECTION</freeText> </associatedCharges> <associatedCharges> <chargeType>COV</chargeType> <amount>10.02</amount> <freeText>CDW - COLLISION DAMAGE WAIVER</freeText> </associatedCharges> <associatedCharges> <chargeType>045</chargeType> <amount>31.20</amount> <freeText>TAX</freeText> </associatedCharges> </rateDetailsInfo> <rateDetailsInfo> <tariffInfo> <rateAmount>105.36</rateAmount> <rateCurrency>EUR</rateCurrency> <rateAmountQualifier>RB</rateAmountQualifier> </tariffInfo> <associatedCharges> <chargeType>NBD</chargeType> <amount>3</amount> </associatedCharges> </rateDetailsInfo> <rateDetailsInfo> <tariffInfo> <rateAmount>190.40</rateAmount> <rateCurrency>EUR</rateCurrency> <rateAmountQualifier>904</rateAmountQualifier> </tariffInfo> </rateDetailsInfo> <dummy></dummy> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>108</type> <amount>2.60</amount> <description>IES</description> <periodType>001</periodType> <currency>EUR</currency> <comment>VEHICLE LICENSING FEE AND ROAD TAX</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>108</type> <amount>33.50</amount> <description>IES</description> <periodType>004</periodType> <currency>EUR</currency> <comment>LOCATION SERVICE CHARGE</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>COV</type> <amount>2.52</amount> <description>IES</description> <periodType>004</periodType> <currency>EUR</currency> <comment>TP - THEFT PROTECTION</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>COV</type> <amount>10.02</amount> <description>IES</description> <periodType>004</periodType> <currency>EUR</currency> <comment>CDW - COLLISION DAMAGE WAIVER</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>COV</type> <amount>7.53</amount> <description>OPT</description> <periodType>001</periodType> <currency>EUR</currency> <comment>PAE - PERSONAL ACCIDENT AND EFFECTS COVER</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>COV</type> <amount>13.80</amount> <description>OPT</description> <periodType>001</periodType> <currency>EUR</currency> <comment>SUP - SUPER COVER</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>045</type> <amount>19.60</amount> <description>IES</description> <periodType>012</periodType> <comment>TAX</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <rateCodeGroup> <rateCode> <fareCategories> <fareType>WST3FR</fareType> </fareCategories> </rateCode> </rateCodeGroup> </rateDetails> </Car\_RateInformationFromAvailabilityReply>

## 5.10.3 Possible Errors

See "Error Messages" section.

* * *

## 5.11 Operation: Rate Information with special equipment

In this operation we show an example of Car\_RateInformationAfterAvailability request and response for a corporate rate (the information used to set the request parameters has been taken from a previous availability response) with special equipment associated. In this case, a child seat for baby (code CSB). The reader of this document can refer to the Interface Control Document to see all the available codes realted to the special equipment.

## 5.11.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Car\_RateInformationFromAvailability xmlns="http://xml.amadeus.com/RCFARQ\_22\_2\_1A"> <companyDetails> <travelSector>CAR</travelSector> <companyCode>ZE</companyCode> <companyName>HERTZ</companyName> <accessLevel>CP</accessLevel> </companyDetails> <rateSource> <selectionDetails> <option>P6</option> </selectionDetails> </rateSource> <pickupDropoffLocs> <locationType>176</locationType> <locationDescription> <code>1A</code> <name>LHR</name> </locationDescription> </pickupDropoffLocs> <pickupDropoffTimes> <businessSemantic>PDA</businessSemantic> <beginDateTime> <year>2020</year> <month>8</month> <day>12</day> <hour>9</hour> <minutes>0</minutes> </beginDateTime> <endDateTime> <year>2020</year> <month>8</month> <day>13</day> <hour>9</hour> <minutes>0</minutes> </endDateTime> </pickupDropoffTimes> <rateInfo> <tariffInfo> <rateType>3KYNOFAQ01</rateType> <ratePlanIndicator>WY</ratePlanIndicator> </tariffInfo> <rateInformation> <category>024</category> </rateInformation> </rateInfo> <rateCodeInfo> <fareCategories> <fareType>BAD1FR</fareType> </fareCategories> </rateCodeInfo> <vehicleInformation> <vehTypeOptionQualifier>VT</vehTypeOptionQualifier> <vehicleRentalNeedType> <vehicleTypeOwner>ACR</vehicleTypeOwner> <vehicleRentalPrefType>MCMN</vehicleRentalPrefType> </vehicleRentalNeedType> </vehicleInformation> </Car\_RateInformationFromAvailability>

## 5.11.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Car\_RateInformationFromAvailabilityReply xmlns="http://xml.amadeus.com/RCFARR\_22\_2\_1A"> <rateDetails> <companyIdentification> <travelSector>CAR</travelSector> <companyCode>ZE</companyCode> <companyName>HERTZ</companyName> <accessLevel>CP</accessLevel> </companyIdentification> <sourceLevel> <selectionDetails> <option>P6</option> </selectionDetails> </sourceLevel> <rateDetailsInfo> <tariffInfo> <rateAmount>24.54</rateAmount> <rateCurrency>EUR</rateCurrency> <rateType>DY</rateType> <rateAmountQualifier>RP</rateAmountQualifier> <rateChangeIndicator>GUA</rateChangeIndicator> </tariffInfo> <extraRateTypeInfo> <rateCategory>24</rateCategory> </extraRateTypeInfo> <associatedCharges> <chargeType>034</chargeType> <amountQualifier>UNL</amountQualifier> </associatedCharges> <associatedCharges> <chargeType>013</chargeType> <amount>26.00</amount> <freeText>CHILD SEAT FOR BABY</freeText> </associatedCharges> </rateDetailsInfo> <rateDetailsInfo> <tariffInfo> <rateAmount>24.54</rateAmount> <rateCurrency>EUR</rateCurrency> <rateAmountQualifier>RB</rateAmountQualifier> </tariffInfo> <associatedCharges> <chargeType>NBD</chargeType> <amount>1</amount> </associatedCharges> </rateDetailsInfo> <rateDetailsInfo> <tariffInfo> <rateAmount>56.56</rateAmount> <rateCurrency>EUR</rateCurrency> <rateAmountQualifier>904</rateAmountQualifier> </tariffInfo> </rateDetailsInfo> <dummy></dummy> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>013</type> <description>IES</description> <comment>CSB - CHILD SEAT FOR BABY</comment> </chargeDetails> <chargeDetails> <type>013</type> <amount>7.00</amount> <periodType>001</periodType> <currency>EUR</currency> </chargeDetails> <chargeDetails> <type>013</type> <amount>35.00</amount> <description>M</description> <currency>EUR</currency> </chargeDetails> </taxSurchargeCoverageInfo> <additionalInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>SI</informationType> <companyId>1A</companyId> <encoding>1</encoding> </freeTextDetails> <freeText>BABY SEAT ARE MANDATORY FOR BABY FROM 9 MONTHS TO 4 YEARS</freeText> </additionalInfo> </taxCovSurchargeGroup> <vehicleInfoGroup> <vehicleDetails> <vehicleCharacteristic> <vehicleTypeOwner>ACR</vehicleTypeOwner> <vehicleRentalPrefType>MCMN</vehicleRentalPrefType> </vehicleCharacteristic> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>SI</informationType> <companyId>1A</companyId> <encoding>1</encoding> </freeTextDetails> <carModel>FORD KA OR SIMILAR</carModel> </vehicleDetails> </vehicleInfoGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>01</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>02</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>03</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>04</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>05</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>06</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantity>1</quantity> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>07</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>OWI</type> <qualifier>005</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>ADB</type> <quantity>1</quantity> <quantityUnit>002</quantityUnit> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>GUA</type> <quantity>365</quantity> <quantityUnit>3</quantityUnit> </ruleDetails> <ruleText> <textType>GUA</textType> <freeText>RATE GUARANTEED 365 DAYS FROM BOOKING</freeText> </ruleText> </otherRules> <dateTimeInfo> <businessSemantic>BED</businessSemantic> <beginDateTime> <year>2020</year> <month>6</month> <day>1</day> </beginDateTime> <endDateTime> <year>2020</year> <month>3</month> <day>15</day> </endDateTime> </dateTimeInfo> </otherRulesGroup> <pickupDropoffLocation> <locationCode> <locationType>176</locationType> <locationDescription> <code>1A</code> <name>LHR</name> </locationDescription> </locationCode> <address> <addressDetails> <format>5</format> <line1>NORTHERN PERIMETER RD .WEST.</line1> </addressDetails> <city>LONDON HEATHROW AP TW62QD000</city> <countryCode>GB</countryCode> </address> <openingHours> <businessSemantic>OCH</businessSemantic> <beginDateTime> <hour>0</hour> <minutes>1</minutes> </beginDateTime> <endDateTime> <hour>24</hour> <minutes>0</minutes> </endDateTime> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <phone> <phoneOrEmailType>PHO</phoneOrEmailType> <telephoneNumber> <telephoneNumber>08708460006</telephoneNumber> </telephoneNumber> </phone> </pickupDropoffLocation> <rateCodeGroup> <rateCode> <fareCategories> <fareType>BAD1FR</fareType> </fareCategories> </rateCode> <additionalInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>SI</informationType> <companyId>1A</companyId> <encoding>1</encoding> </freeTextDetails> <freeText>DAILY INCLUSIVE</freeText> </additionalInfo> </rateCodeGroup> </rateDetails> </Car\_RateInformationFromAvailabilityReply>

## 5.11.3 Possible Errors

See "Error Messages" section.

* * *

## 5.12 Operation: Rate information with third party insurance products (optional extras) returned

The WBS customer specifies the country of residence of the driver (addressInfo). As a result, available third party insurance products are returned as well.

In the reply shown here, an insurance product provided by a third company (type: INS) is returned, together with a Policy Wording given as text and Terms and Conditions provided as a URL. The total premium all taxes included is returned as well (12.45), expressed in the specified currency (EUR).

## 5.12.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Car\_RateInformationFromAvailability xmlns="http://xml.amadeus.com/RCFARQ\_22\_2\_1A"> <originatorOfRequest> <deliveringSystem> <companyId>00</companyId> </deliveringSystem> <originIdentification> <originatorId>0</originatorId> <inHouseIdentification1>BOGLZ3100</inHouseIdentification1> </originIdentification> <locationDetails> <trueLocationId>BOG</trueLocationId> </locationDetails> <cascadingSystem> <companyId>DCD007013000</companyId> </cascadingSystem> <originatorTypeCode>E</originatorTypeCode> <originDetails> <codedCountry>CO</codedCountry> <codedCurrency>COP</codedCurrency> <codedLanguage>EN</codedLanguage> </originDetails> <originator>A9999WSSU</originator> </originatorOfRequest> <companyDetails> <travelSector>CAR</travelSector> <companyCode>ZT</companyCode> <accessLevel>CP</accessLevel> </companyDetails> <bookingSource> <originatorDetails> <originatorId>00227207</originatorId> </originatorDetails> </bookingSource> <rateSource> <selectionDetails> <option>P10</option> </selectionDetails> </rateSource> <pickupDropoffLocs> <locationType>176</locationType> <locationDescription> <code>1A</code> <name>MIAT01</name> </locationDescription> </pickupDropoffLocs> <pickupDropoffTimes> <businessSemantic>PDA</businessSemantic> <beginDateTime> <year>2019</year> <month>12</month> <day>30</day> <hour>21</hour> <minutes>0</minutes> </beginDateTime> <endDateTime> <year>2020</year> <month>1</month> <day>8</day> <hour>20</hour> <minutes>0</minutes> </endDateTime> </pickupDropoffTimes> <rateInfo> <tariffInfo> <rateType>449000412</rateType> <ratePlanIndicator>WY</ratePlanIndicator> </tariffInfo> <rateInformation> <category>024</category> </rateInformation> </rateInfo> <rateCodeInfo> <fareCategories> <fareType>L8LTD</fareType> </fareCategories> </rateCodeInfo> <vehicleInformation> <vehTypeOptionQualifier>VT</vehTypeOptionQualifier> <vehicleRentalNeedType> <vehicleTypeOwner>ACR</vehicleTypeOwner> <vehicleRentalPrefType>CFAR</vehicleRentalPrefType> </vehicleRentalNeedType> </vehicleInformation> <addressInfo> <countryCode>US</countryCode> <regionDetails> <code>AK</code> <qualifier>84</qualifier> </regionDetails> </addressInfo> </Car\_RateInformationFromAvailability>

## 5.12.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Car\_RateInformationFromAvailabilityReply xmlns="http://xml.amadeus.com/RCFARR\_22\_2\_1A"> <rateDetails> <companyIdentification> <travelSector>CAR</travelSector> <companyCode>ZT</companyCode> <companyName>THRIFTY</companyName> <accessLevel>CP</accessLevel> </companyIdentification> <sourceLevel> <selectionDetails> <option>P6</option> </selectionDetails> </sourceLevel> <mktText> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>MK</informationType> <companyId>1A</companyId> <encoding>1</encoding> </freeTextDetails> <freeText>WE APPRECIATE YOUR BUSINESS</freeText> <freeText>THANK YOU FOR CHOOSING US</freeText> </mktText> <rateDetailsInfo> <tariffInfo> <rateAmount>440</rateAmount> <rateCurrency>EUR</rateCurrency> <rateType>WY</rateType> <rateAmountQualifier>RP</rateAmountQualifier> <rateChangeIndicator>GUA</rateChangeIndicator> </tariffInfo> <associatedCharges> <chargeType>034</chargeType> <amountQualifier>UNL</amountQualifier> <chargePeriodTypeCode>004</chargePeriodTypeCode> </associatedCharges> <associatedCharges> <chargeType>008</chargeType> <amount>55</amount> </associatedCharges> <associatedCharges> <chargeType>009</chargeType> <amount>27.5</amount> </associatedCharges> <associatedCharges> <chargeType>80</chargeType> <amountQualifier>UNL</amountQualifier> </associatedCharges> <associatedCharges> <chargeType>82</chargeType> <amountQualifier>UNL</amountQualifier> </associatedCharges> <associatedCharges> <chargeType>108</chargeType> <amount>0</amount> <freeText>SCG - APT CONC RECOV FEE</freeText> </associatedCharges> </rateDetailsInfo> <rateDetailsInfo> <tariffInfo> <rateAmount>550</rateAmount> <rateCurrency>EUR</rateCurrency> <rateAmountQualifier>RB</rateAmountQualifier> </tariffInfo> <associatedCharges> <chargeType>NBD</chargeType> <amount>9</amount> </associatedCharges> <associatedCharges> <chargeType>217</chargeType> <amount>440</amount> <quantity>1</quantity> </associatedCharges> <associatedCharges> <chargeType>218</chargeType> <amount>55</amount> <quantity>2</quantity> </associatedCharges> </rateDetailsInfo> <rateDetailsInfo> <tariffInfo> <rateAmount>550</rateAmount> <rateCurrency>EUR</rateCurrency> <rateAmountQualifier>904</rateAmountQualifier> </tariffInfo> </rateDetailsInfo> <dummy> </dummy> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>108</type> <description>IES</description> <periodType>001</periodType> <comment>SCG - APT CONC RECOV FEE</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>INS</type> <amount>12.45</amount> <description>OPT</description> <periodType>004</periodType> <currency>EUR</currency> <comment>USP3 - OPT INSURANCE</comment> </chargeDetails> </taxSurchargeCoverageInfo> <productAttributes> <attributeFunction>PID</attributeFunction> <attributeDetails> <attributeType>TEXT</attributeType> <attributeDescription>Policy wording</attributeDescription> <language>EN</language> </attributeDetails> </productAttributes> <productAttributes> <attributeFunction>TAC</attributeFunction> <attributeDetails> <attributeType>URL</attributeType> <attributeDescription>https//fakeURL.test</attributeDescription> <language>EN</language> </attributeDetails> </productAttributes> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>COV</type> <description>IES</description> <periodType>001</periodType> <comment>LDW - LOSS DAMAGE WAIVER</comment> </chargeDetails> </taxSurchargeCoverageInfo> <additionalInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>SI</informationType> <companyId>1A</companyId> <encoding>1</encoding> </freeTextDetails> <freeText>LOSS DAMAGE WAIVER</freeText> </additionalInfo> </taxCovSurchargeGroup> <vehicleInfoGroup> <vehicleDetails> <vehicleCharacteristic> <vehicleTypeOwner>ACR</vehicleTypeOwner> <vehicleRentalPrefType>CFAR</vehicleRentalPrefType> </vehicleCharacteristic> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>SI</informationType> <companyId>1A</companyId> <encoding>1</encoding> </freeTextDetails> <carModel>NISSAN ROGUE</carModel> </vehicleDetails> </vehicleInfoGroup> <pickupDropoffLocation> <locationCode> <locationType>176</locationType> <locationDescription> <code>1A</code> <name>MIAT01</name> </locationDescription> </locationCode> <address> <addressDetails> <format>5</format> <line1>3900 NORTHWEST 25TH STREET</line1> </addressDetails> <city>MIAMI</city> <zipCode>33142</zipCode> <countryCode>US</countryCode> <regionDetails> <code>FL</code> </regionDetails> </address> <openingHours> <businessSemantic>OCH</businessSemantic> <beginDateTime> <hour>0</hour> <minutes>0</minutes> </beginDateTime> <endDateTime> <hour>23</hour> <minutes>59</minutes> </endDateTime> </openingHours> <phone> <phoneOrEmailType>PHO</phoneOrEmailType> <telephoneNumber> <telephoneNumber>(123) 111-9999</telephoneNumber> </telephoneNumber> </phone> <phone> <phoneOrEmailType>FAX</phoneOrEmailType> <telephoneNumber> <telephoneNumber>(321) 999-1111</telephoneNumber> </telephoneNumber> </phone> </pickupDropoffLocation> <pickupDropoffLocation> <locationCode> <locationType>DOL</locationType> <locationDescription> <code>1A</code> <name>MIA</name> </locationDescription> </locationCode> <address> <addressDetails> <format>5</format> <line1>3900 NORTHWEST 25TH STREET</line1> </addressDetails> <city>MIAMI</city> <zipCode>33142</zipCode> <countryCode>US</countryCode> <regionDetails> <code>FL</code> </regionDetails> </address> <openingHours> <businessSemantic>OCH</businessSemantic> <beginDateTime> <hour>0</hour> <minutes>0</minutes> </beginDateTime> <endDateTime> <hour>23</hour> <minutes>59</minutes> </endDateTime> </openingHours> <phone> <phoneOrEmailType>PHO</phoneOrEmailType> <telephoneNumber> <telephoneNumber>(123) 111-9999</telephoneNumber> </telephoneNumber> </phone> <phone> <phoneOrEmailType>FAX</phoneOrEmailType> <telephoneNumber> <telephoneNumber>(321) 999-1111</telephoneNumber> </telephoneNumber> </phone> </pickupDropoffLocation> <rateCodeGroup> <rateCode> <fareCategories> <fareType>L8LTD</fareType> </fareCategories> </rateCode> </rateCodeGroup> </rateDetails> </Car\_RateInformationFromAvailabilityReply>

## 5.12.3 Possible Errors

See "Error Messages" section.

* * *

## 5.13 Operation: Rate information with total commissionable amount

This operation allows to retrieve rate information from availability with the total commission amount. In the response, the WBS customer gets the amount and the currency of the total commission.

Amadeus sends the Total Commissionable Amount (type = ‘TCA’) inside **chargeDetails** section within the **rateDetail of prepayable amount**. In case the prepayable amount is not returned, then a new rateDetail section is generated containing the currency used by the provider and the amountType set to ‘TCA’. This new rateDetail is used to add the chargeDetails carrying the ‘TCA’. 

In this example we make a rate information from availability request with the following options:

-   Car Provider: Hertz
-   Location: Nice NCET50 / London LONT50
-   Fare type: J3A1FR
-   Vehicle type: MCMR

Customer office - NCE1A0955 is defined in the Amadeus database with a specific rule. In this specific case for Hertz (ZE) the rule: '**Total Commissionable Amount = Estimated Total - Tax**' is applied. The amount returned by the car provider is in Euros, therefore the Total Commissionable Amount is returned in Euros.

In case the provider replied with an incorrect amount or the rule is incorrect in the Amadeus database, then the car application return total commissionable amount with value '0' with the following description 'COMMISSION AMOUNT NOT COMPUTABLE'.

## 5.13.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Car\_RateInformationFromAvailability xmlns="http://xml.amadeus.com/RCFARQ\_22\_2\_1A"> <companyDetails> <travelSector>CAR</travelSector> <companyCode>ZE</companyCode> <accessLevel>CP</accessLevel> </companyDetails> <language> <userPreferences> <codedLanguage>FR</codedLanguage> </userPreferences> </language> <rateSource> <selectionDetails> <option>P6</option> </selectionDetails> </rateSource> <pickupDropoffLocs> <locationType>176</locationType> <locationDescription> <code>1A</code> <name>NCET50</name> </locationDescription> </pickupDropoffLocs> <pickupDropoffLocs> <locationType>DOL</locationType> <locationDescription> <code>1A</code> <name>LONT50</name> </locationDescription> </pickupDropoffLocs> <pickupDropoffTimes> <businessSemantic>PDA</businessSemantic> <beginDateTime> <year>2020</year> <month>12</month> <day>08</day> <hour>10</hour> <minutes>00</minutes> </beginDateTime> <endDateTime> <year>2020</year> <month>12</month> <day>09</day> <hour>10</hour> <minutes>00</minutes> </endDateTime> </pickupDropoffTimes> <rateInfo> <tariffInfo> <rateType>WDDUV56Q01</rateType> <ratePlanIndicator>DY</ratePlanIndicator> </tariffInfo> <rateInformation> <category>24</category> </rateInformation> </rateInfo> <rateCodeInfo> <fareCategories> <fareType>J3A1FR</fareType> </fareCategories> </rateCodeInfo> <vehicleInformation> <vehTypeOptionQualifier>VT</vehTypeOptionQualifier> <vehicleRentalNeedType> <vehicleTypeOwner>ACR</vehicleTypeOwner> <vehicleRentalPrefType>MCMR</vehicleRentalPrefType> </vehicleRentalNeedType> </vehicleInformation> </Car\_RateInformationFromAvailability>

## 5.13.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Car\_RateInformationFromAvailabilityReply xmlns="http://xml.amadeus.com/RCFARR\_22\_2\_1A"> <rateDetails> <companyIdentification> <travelSector>CAR</travelSector> <companyCode>ZE</companyCode> <companyName>HERTZ</companyName> <accessLevel>CP</accessLevel> </companyIdentification> <sourceLevel> <selectionDetails> <option>P6</option> </selectionDetails> </sourceLevel> <rateDetailsInfo> <tariffInfo> <rateAmount>93.50</rateAmount> <rateCurrency>EUR</rateCurrency> <rateType>DY</rateType> <rateAmountQualifier>RP</rateAmountQualifier> <rateChangeIndicator>GUA</rateChangeIndicator> </tariffInfo> <associatedCharges> <chargeType>034</chargeType> <amountQualifier>UNL</amountQualifier> </associatedCharges> <associatedCharges> <chargeType>108</chargeType> <amount>1300.00</amount> <freeText>OWC - ONE WAY CHARGE</freeText> </associatedCharges> <associatedCharges> <chargeType>108</chargeType> <amount>9.00</amount> <freeText>VIR - VEHICLE LICENSING FEE AND ROAD TAX</freeText> </associatedCharges> <associatedCharges> <chargeType>108</chargeType> <amount>39.80</amount> <freeText>LSC - LOCATION SERVICE CHARGE</freeText> </associatedCharges> <associatedCharges> <chargeType>COV</chargeType> <amount>23.82</amount> <freeText>TP - THEFT PROTECTION</freeText> </associatedCharges> <associatedCharges> <chargeType>COV</chargeType> <amount>49.98</amount> <freeText>CDW - COLLISION DAMAGE WAIVER</freeText> </associatedCharges> <associatedCharges> <chargeType>045</chargeType> <amount>340.62</amount> <freeText>TAX - TAX</freeText> </associatedCharges> </rateDetailsInfo> <rateDetailsInfo> <tariffInfo> <rateAmount>280.50</rateAmount> <rateCurrency>EUR</rateCurrency> <rateAmountQualifier>RB</rateAmountQualifier> </tariffInfo> <associatedCharges> <chargeType>NBD</chargeType> <amount>3</amount> </associatedCharges> </rateDetailsInfo> <rateDetailsInfo> <tariffInfo> <rateAmount>2043.72</rateAmount> <rateCurrency>EUR</rateCurrency> <rateAmountQualifier>904</rateAmountQualifier> </tariffInfo> </rateDetailsInfo> <rateDetailsInfo> <tariffInfo> <rateAmount>2043.72</rateAmount> <rateCurrency>EUR</rateCurrency> <rateAmountQualifier>PPA</rateAmountQualifier> </tariffInfo> <associatedCharges> <chargeType>TCA</chargeType> <amount>2023.72</amount> <amountQualifier>COMMISSIONABLE AMOUNT</amountQualifier> </associatedCharges> </rateDetailsInfo> <dummy></dummy> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>108</type> <amount>1300.00</amount> <description>IES</description> <periodType>004</periodType> <currency>EUR</currency> <comment>OWC - ONE WAY CHARGE</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>108</type> <amount>3.00</amount> <description>IES</description> <periodType>001</periodType> <currency>EUR</currency> <comment>VIR - VEHICLE LICENSING FEE AND ROAD TAX</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>108</type> <amount>39.80</amount> <description>IES</description> <periodType>004</periodType> <currency>EUR</currency> <comment>LSC - LOCATION SERVICE CHARGE</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>108</type> <amount>4.16</amount> <description>OPT</description> <periodType>001</periodType> <currency>EUR</currency> <comment>\\tRSA - PREMIUM EMERGENCY ROADSIDE ASSISTANCE</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>COV</type> <amount>23.82</amount> <description>IES</description> <periodType>004</periodType> <currency>EUR</currency> <comment>TP - THEFT PROTECTION</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>COV</type> <amount>49.98</amount> <description>IES</description> <periodType>004</periodType> <currency>EUR</currency> <comment>CDW - COLLISION DAMAGE WAIVER</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>COV</type> <amount>8.32</amount> <description>OPT</description> <periodType>001</periodType> <currency>EUR</currency> <comment>PAE - PERSONAL ACCIDENT AND EFFECTS COVER</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>COV</type> <amount>16.66</amount> <description>OPT</description> <periodType>001</periodType> <currency>EUR</currency> <comment>SUP - SUP - SUPER COVER </comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>013</type> <description>OPT</description> <comment>CBS - CHILD BOOSTER SEAT</comment> </chargeDetails> <chargeDetails> <type>013</type> <amount>13.20</amount> <periodType>004</periodType> <currency>EUR</currency> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>013</type> <description>OPT</description> <comment>CST - CHILD SEAT FOR TODDLER</comment> </chargeDetails> <chargeDetails> <type>013</type> <amount>46.20</amount> <periodType>004</periodType> <currency>EUR</currency> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>013</type> <description>OPT</description> <comment>CSI - CHILD SEAT FOR INFANT</comment> </chargeDetails> <chargeDetails> <type>013</type> <amount>46.20</amount> <periodType>004</periodType> <currency>EUR</currency> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>013</type> <description>OPT</description> <comment>NVS - NAVIGATIONAL SYSTEM</comment> </chargeDetails> <chargeDetails> <type>013</type> <amount>62.96</amount> <periodType>004</periodType> <currency>EUR</currency> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <taxCovSurchargeGroup> <taxSurchargeCoverageInfo> <tariffInfo> <currency>EUR</currency> </tariffInfo> <chargeDetails> <type>045</type> <amount>20.00</amount> <description>IES</description> <comment>TAX - TAX</comment> </chargeDetails> </taxSurchargeCoverageInfo> </taxCovSurchargeGroup> <vehicleInfoGroup> <vehicleDetails> <vehicleCharacteristic> <vehicleTypeOwner>ACR</vehicleTypeOwner> <vehicleRentalPrefType>MCMR</vehicleRentalPrefType> </vehicleCharacteristic> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>SI</informationType> <companyId>1A</companyId> <encoding>1</encoding> </freeTextDetails> <carModel>A FIAT 500 OR SIMILAR</carModel> </vehicleDetails> </vehicleInfoGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>01</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>02</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>03</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>04</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>05</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>06</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>PCK</type> <quantity>3</quantity> <quantityUnit>3</quantityUnit> <qualifier>MIN</qualifier> <daysOfOperation>07</daysOfOperation> </ruleDetails> <ruleDetails> <type>PCK</type> <quantityUnit>3</quantityUnit> <qualifier>MAX</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>OWI</type> <qualifier>006</qualifier> </ruleDetails> </otherRules> </otherRulesGroup> <otherRulesGroup> <otherRules> <ruleDetails> <type>GUA</type> <quantity>365</quantity> <quantityUnit>3</quantityUnit> </ruleDetails> <ruleText> <textType>GUA</textType> <freeText>RATE GUARANTEED 365 DAYS FROM BOOKING</freeText> </ruleText> </otherRules> <dateTimeInfo> <businessSemantic>BED</businessSemantic> <beginDateTime> <year>2020</year> <month>11</month> <day>30</day> </beginDateTime> <endDateTime> <year>2021</year> <month>10</month> <day>19</day> </endDateTime> </dateTimeInfo> </otherRulesGroup> <pickupDropoffLocation> <locationCode> <locationType>176</locationType> <locationDescription> <code>1A</code> <name>NCET50</name> </locationDescription> </locationCode> <address> <addressDetails> <format>5</format> <line1>AEROPORT DE NICE COTE DAZUR</line1> </addressDetails> <city>NICE (R) 06821</city> <countryCode>FR</countryCode> </address> <openingHours> <businessSemantic>OCH</businessSemantic> <beginDateTime> <hour>6</hour> <minutes>30</minutes> </beginDateTime> <endDateTime> <hour>23</hour> <minutes>59</minutes> </endDateTime> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <phone> <phoneOrEmailType>PHO</phoneOrEmailType> <telephoneNumber> <telephoneNumber>0483321970</telephoneNumber> </telephoneNumber> </phone> </pickupDropoffLocation> <pickupDropoffLocation> <locationCode> <locationType>DOL</locationType> <locationDescription> <code>1A</code> <name>LONT50</name> </locationDescription> </locationCode> <address> <addressDetails> <format>5</format> <line1>NORTHERN PERIMETER RD (WEST)</line1> </addressDetails> <city>LONDON HEATHROW AP TW62QD</city> <countryCode>GB</countryCode> </address> <openingHours> <businessSemantic>OCH</businessSemantic> <beginDateTime> <hour>0</hour> <minutes>1</minutes> </beginDateTime> <endDateTime> <hour>23</hour> <minutes>59</minutes> </endDateTime> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <openingHours> <businessSemantic>OCH</businessSemantic> </openingHours> <phone> <phoneOrEmailType>PHO</phoneOrEmailType> <telephoneNumber> <telephoneNumber>08433093009</telephoneNumber> </telephoneNumber> </phone> </pickupDropoffLocation> <rateCodeGroup> <rateCode> <fareCategories> <fareType>JIL3GL</fareType> </fareCategories> </rateCode> <additionalInfo> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>SI</informationType> <companyId>1A</companyId> <encoding>1</encoding> </freeTextDetails> <freeText>STD UNLIMITED</freeText> </additionalInfo> </rateCodeGroup> </rateDetails> </Car\_RateInformationFromAvailabilityReply>

## 5.13.3 Possible Errors

See "Error Messages" section.

* * *