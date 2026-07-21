---
url: "https://developers.amadeus.com/api-library/soap/functional-doc/1101/doc-read/140706?serviceVersion=24.1"
download_url: "https://developers.amadeus.com/PAS-EAS/api/download/comp/4d4ad2cb456c02633f463a055ab70584/140706/upload_10444475863619108668.html"
title: "HTML_UG_WBS_Hotel_CompleteReservationDetails_HCRDRQ_24.1_004"
source: "amadeus"
service_id: "1101"
service_name: "Hotel_CompleteReservationDetails"
version: "24.1"
document_id: "140706"
doc_version: "24.1"
doc_type: "User guide"
file_format: "HTML"
scraped_at: "2026-07-15T10:28:07.123Z"
---
# Function: Hotel\_CompleteReservationDetails

* * *

## 1 Overview

The Hotel\_CompleteReservationsDetails function gives the travel agent the complete details of the hotel reservation at the time of the booking or at the time of the last modification of the booking. It includes the sales condition such as rate information, taxes, inclusions and extras, cancellation policies, booking requirements and room description specific to the booking.

The Hotel\_CompleteReservationsDetails function can be retrieved by the user after the creation or the modification transaction.

The Hotel\_CompleteReservationsDetails reply can have On-hold Payment information (indicator as well as payment deadline for a booking). On retrieving the reservation details which was completed by on-hold payment, the payment deadline date/time is retrieved. The payment deadline contains the date and the time upto which the payment for the on-hold booking can be done, for the booking not to lapse.The format of the deadline date is YYMMDD and the format for time is Time24 HHMM.

If there is any leading zero for the YYMMDD format, the leading zero is considered as part the year. Example: 050721. In case there are more than six numeric characters, the deadline date is considered invalid.

Additionally, a new value DFP is added in the tag booking type indicator to indicate that the booking transaction was done by deferred payment.

## 1.1 Supported Operations

The process retrieves the complete details of a hotel segment.

At the time of a hotel sell or of a hotel booking modification, the hotel complete reservation details are built and stored. A travel agent can then retrieve the booking before or after it is committed.

To retrieve the hotel complete reservation details, the PNR (Passenger Name Record) must be retrieved and the segment concerned by the retrieve is a necessary input.

## 1.2 Limitations

-   Only complete reservation details of a hotel booking can be retrieved
-   The PNR for which the reservation details is to be viewed has to be retrieved first
-   The hotel segment has to be specified in input

## 1.3 Unsupported Operations

Retrieve the complete reservations details of a non-hotel segment

## 1.4 Prerequisites

Office profile security: The end user must be authorized to retrieve the PNR.

## 2 Building A Query

2.1 Input:

When requesting complete reservation details , the following value is mandatory:

-   The <value> in the <referenceDetails\> which indicates the reference number of the PNR. The segments are ordered in a PNR, so that the reference number is available in the face of the PNR.

2.2 Query Sub Structure: retrievalKeyGroup

The query contains details of the originator request system and the retrieval key information. The following table describes with examples the retrieval info that the XML client query has to contain, as well as their signification and processing:

<retrievalKeyGroup> is mandatory, as it link the record locator to the PNR identifier, the tattoo.

Business requirement

Length

Status

Description

1\. <retrievalKey>

M

This contains the PNR record locator details, if available.  

1.1 <reservation>

C

Specifies a reference to a reservation. This functionality is used to display the hotel reservation details for a PNR which is not retrieved.

1.1.1. <companyId>

Alphanumeric, 3

C

Contains the code for the company that owns the booking, for example "1A", the code for Amadeus.

1.1.2 <controlNumber>

Alphanumeric, 16

M

Contains the reservation number (record locator of a PNR, confirmation number etc)

1.1.3. <controlType>

Alphanumeric, 1

M

Indicates the type of reservation control number. Values can be:

-   P : PNR record Locator
-   2 : Confirmation number

2\. <tattooID>

M

Contains the tattoo information used for retrieiving the reservation details for the PNR. The values are present in PNR face.

2.1. <referenceDetails>

M

contains the type and the reference value of the booking requested in the message

2.1.1. <type>

Alphanumeric, 3

M

Type of the value : 'S' for PNR segment reference number

2.1.2. <value>

Alphanumeric, 5

M

Contains the PNR tattoo corresponding to the booking.

**Updates on Hotel\_CompleteReservationDetails (in this version)**

No updates in the query 

## 3 Receiving A Reply

If no error message is generated for the request message, the response message contains the complete reservation details returned either by the provider/CRS/switch or the database.

The Reply structure has the following information about the reservation:

\- Rate Information

\- All known taxes and Total Rate

\- Rate Inclusions and Extras

\- Cancellation Policies

\- Booking Requirements

\- Room and Rate Description

\- Carbon Emissions

\- Other Information

Business requirement

Length

Status

Description

retrievalKeyGroup  

1

M

The group regroups the rloc and the tattoo.  

tattooNumber  

1

M

The segment conveys the element tattoo :

\- Segment tattoo for an Hotel booking

\- Offer tattoo for an Hotel Offer

retrievalKey

1

M

This segment is used to convey the record locator of the PNR if available.

hotelSalesRequirementsSection

1

C

The section contains the entire details of the reservation for the request.

**Updates on Hotel\_CompleteReservationDetailsReply (in this version)**

In roomRateIdentifier section, new data elements have been added to convey the rate family information:

-   rateCategoryCode: rate family code which corresponds to the booked rate code
-   rateQualifiedIndic: When rate family information is present, qualifies the rate family
    -   First occurence is the rate type: C (Conditional), N (Negotiated) or P (Public)
    -   Second occurrence indicates if conversion happened on Amadeus side: Y (Yes) or N (No)

## 3.1 Sub Structure: Prepay for GDS

## 3.1.1 Description

When a Prepay rate is requested for GDS property, the result returned is validated for the Prepay booking option returned in the PMT (PaymentType) and STX (statusDetails) segments of HCRDRR.

The message verb will display Indicator as "PP" in the payment type for GDS.

## 3.1.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Hotel\_CompleteReservationDetailsReply xmlns="http://xml.amadeus.com/HCRDRR\_24\_1"> ... <type>S</type> <value>1</value> <hotelSalesRequirementsSection> ... <bookingRequirementsSection> <guaranteeDepositStatusInfo> <statusDetails> <indicator>PP</indicator> <action>1</action> </statusDetails> </guaranteeDepositStatusInfo> <paymentInformation> <paymentDetails> <formOfPaymentCode>1</formOfPaymentCode> <paymentType>5</paymentType> <serviceToPay>3</serviceToPay> </paymentDetails> </paymentInformation> <creditCardInformation> <formOfPayment> <type>CC</type> <vendorCode>VI</vendorCode> </formOfPayment> </creditCardInformation> </bookingRequirementsSection> ... </hotelSalesRequirementsSection> </Hotel\_CompleteReservationDetailsReply>

* * *

## 4 Error Messages

Note:  The following error message list is not exhaustive.

Error Code

Error Message

Description

01383

PNR NOT PRESENT

No PNR is retrieved

32862

DISPLAY WITHOUT CONTEXT

The PNR for which the complete reservation details are requested is not in context

09293

PLEASE SPECIFY SEGMENT NUMBER

The hotel complete reservation details are requested without segment number.

23303

FUNCTIONALITY ONLY AVAILABLE FOR SEAMLESS BOOKINGS

The user tries to retrieve the hotel complete reservation details of a non complete access or a non complete access plus booking

23302

FUNCTIONALITY NOT AVAILABLE

The user tries to retrieve the hotel complete reservation details of a complete access or a complete access plus booking and it cannot retrieve the details because of an internal exception or error.

## 4.1 Error Reply

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Hotel\_CompleteReservationDetailsReply xmlns="http://xml.amadeus.com/HCRDRR\_24\_1\_1A"> <errorInformation> <messageErrorInformation> <errorDetails> <errorCode>32862</errorCode> <errorCategory>EC</errorCategory> </errorDetails> </messageErrorInformation> <errorDescription> <freeTextDetails> <textSubjectQualifier>1</textSubjectQualifier> <informationType>728</informationType> <language>EN</language> <source>M</source> <encoding>2</encoding> </freeTextDetails> <freeText>DISPLAY WITHOUT CONTEXT</freeText> </errorDescription> </errorInformation> <retrievalKeyGroup> <tattooNumber> <reference> <qualifier>ST</qualifier> <number>0</number> </reference> </tattooNumber> </retrievalKeyGroup> </Hotel\_CompleteReservationDetailsReply>

  

* * *

## 5 Operations

## 5.1 Operation: Example of basic query and reply

The example shows a query for a segment that has a tattoo ID of "3" on the office ID MUC1A0701.

Note:The examples in each chapter are illustrations only and are meant to provide the basis for a better understanding on which fields are mandatory for basic operation utilization. It is not a full explanation of every field that can be utilized for the operation, but rather a guideline to its use.

In the response we can see rate code CTP has been mapped to rate family XXX, which is a Public rate and conversion happened on Amadeus side  

## 5.1.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Hotel\_CompleteReservationDetails xmlns="http://xml.amadeus.com/HCRDRQ\_24\_1\_1A"> <retrievalKeyGroup> <retrievalKey> <reservation> <companyId>1A</companyId> <controlNumber>Z3GGAK</controlNumber> <controlType>P</controlType> </reservation> </retrievalKey> <tattooID> <referenceDetails> <type>S</type> <value>3</value> </referenceDetails> </tattooID> </retrievalKeyGroup> </Hotel\_CompleteReservationDetails>

## 5.1.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Hotel\_CompleteReservationDetailsReply xmlns="http://xml.amadeus.com/HCRDRR\_24\_1\_1A"> <retrievalKeyGroup> <tattooNumber> <status>3</status> <reference> <qualifier>ST</qualifier> <number>3</number> </reference> </tattooNumber> <retrievalKey> <reservation> <companyId>1A</companyId> <controlNumber>Z3GGAK</controlNumber> <controlType>P</controlType> </reservation> </retrievalKey> </retrievalKeyGroup> <carbonEmissionsGroup> <greenHouseGas> <constituantGas> <gasCode>CO2</gasCode> <value>100</value> <unit>K</unit> </constituantGas> <emissionProviderCode> <emissionsProviderCode>GRNV</emissionsProviderCode> </emissionProviderCode> </greenHouseGas> </carbonEmissionsGroup> <hotelSalesRequirementsSection> <hotelPropertyInfo> <hotelReference> <chainCode>RD</chainCode> <cityCode>DAC</cityCode> <hotelCode>865</hotelCode> </hotelReference> </hotelPropertyInfo> <bookingPeriod> <businessSemantic>CHK</businessSemantic> <beginDateTime> <year>2015</year> <month>8</month> <day>17</day> </beginDateTime> <endDateTime> <year>2015</year> <month>8</month> <day>18</day> </endDateTime> </bookingPeriod> <hotelChainInformation> <travelSector>HTL</travelSector> <companyCodeContext>1A</companyCodeContext> <companyCode>XX</companyCode> <companyName>Xx</companyName> <accessLevel>CP</accessLevel> </hotelChainInformation> <countryStateInformation> <countryCode>BD</countryCode> </countryStateInformation> <occupancyLevel> <quantityDetails> <numberOfUnit>1</numberOfUnit> <unitQualifier>10</unitQualifier> </quantityDetails> <quantityDetails> <numberOfUnit>1</numberOfUnit> <unitQualifier>8</unitQualifier> </quantityDetails> </occupancyLevel> <marketingText> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>HPMK</informationType> <source>S</source> <encoding>1</encoding> </freeTextDetails> <freeText>EARN TRAVEL AGENT REWARDS.</freeText> </marketingText> <hotelSalesRequCategorySection> <pricingCategory> <itemDescriptionType>TTX</itemDescriptionType> <itemDescription> <description>All known taxes & estimated total rate.</description> <language>ENG</language> </itemDescription> </pricingCategory> <totalAmountInformation> <monetaryDetails> <typeQualifier>712</typeQualifier> <amount>267.55</amount> <currency>USD</currency> </monetaryDetails> </totalAmountInformation> <taxSection> <taxFeeInformation> <includedInAmount>E</includedInAmount> <perPerson>ROO</perPerson> <timeUnit>4</timeUnit> <category>TAX</category> <code>TAX</code> <amount>56.05</amount> <currencyCode>USD</currencyCode> <longName>TAX</longName> <longNameDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>HCHA</informationType> <language>EN</language> <source>S</source> <encoding>1</encoding> </longNameDetails> </taxFeeInformation> <taxFeeValidity> <businessSemantic>EFF</businessSemantic> <beginDateTime> <year>2015</year> <month>8</month> <day>17</day> </beginDateTime> <endDateTime> <year>2015</year> <month>8</month> <day>18</day> </endDateTime> </taxFeeValidity> </taxSection> </hotelSalesRequCategorySection> <hotelSalesRequCategorySection> <pricingCategory> <itemDescriptionType>OTH</itemDescriptionType> <itemDescription> <description>Other Information</description> <language>ENG</language> </itemDescription> </pricingCategory> <infoMsgAndCancelPolicies> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>HOTH</informationType> <source>S</source> <encoding>1</encoding> </freeTextDetails> <freeText>YOU COULD EARN 2115 POINTS WITH THIS</freeText> <freeText>RESERVATION.</freeText> </infoMsgAndCancelPolicies> <otherInfoSection> <checkInOutTimeAndExpressInfo> <expressCheckIn>UN</expressCheckIn> <expressCheckOut>UN</expressCheckOut> <timeMode>LT</timeMode> <checkInTimeLimitation> <hour>14</hour> <minutes>0</minutes> </checkInTimeLimitation> <checkOutTimeLimitation> <hour>12</hour> <minutes>0</minutes> </checkOutTimeLimitation> </checkInOutTimeAndExpressInfo> </otherInfoSection> </hotelSalesRequCategorySection> <hotelSalesRequCategorySection> <pricingCategory> <itemDescriptionType>DES</itemDescriptionType> <itemDescription> <description>Room and Rate Description</description> <language>ENG</language> </itemDescription> </pricingCategory> <roomRateInfoSection> <roomInformation> <roomRateIdentifier> <roomType>ROH</roomType> <ratePlanCode>CTP</ratePlanCode> <rateCategoryCode>YYY</rateCategoryCode> <rateQualifiedIndic>P</rateQualifiedIndic> <rateQualifiedIndic>Y</rateQualifiedIndic> </roomRateIdentifier> <bookingCode>Y00I100</bookingCode> </roomInformation> <roomRateDescription> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>HRMD</informationType> <source>S</source> <encoding>1</encoding> </freeTextDetails> <freeText>CATERPILLAR</freeText> <freeText>Free High Speed Internet</freeText> </roomRateDescription> </roomRateInfoSection> </hotelSalesRequCategorySection> <hotelSalesRequCategorySection> <pricingCategory> <itemDescriptionType>BOO</itemDescriptionType> <itemDescription> <description>Booking Requirements</description> <language>ENG</language> </itemDescription> </pricingCategory> <bookingRequirementsSection> <guaranteeDepositStatusInfo> <statusDetails> <indicator>DFP</indicator> <action>1</action> </statusDetails> </guaranteeDepositStatusInfo> <specialDate> <dateAndTimeDetails> <qualifier>756</qualifier> <date>150811</date> <time>1800</time> </dateAndTimeDetails> </specialDate> </bookingRequirementsSection> </hotelSalesRequCategorySection> <hotelSalesRequCategorySection> <pricingCategory> <itemDescriptionType>CXL</itemDescriptionType> <itemDescription> <description>Cancellation Policies</description> <language>ENG</language> </itemDescription> </pricingCategory> <cancellationPoliciesSection> <cancellationDateTime> <businessSemantic>CAN</businessSemantic> <timeMode>LT</timeMode> <dateTime> <year>2015</year> <month>8</month> <day>16</day> <hour>0</hour> <minutes>0</minutes> </dateTime> </cancellationDateTime> <cancellationFee> <monetaryDetails> <typeQualifier>CAN</typeQualifier> <amount>267.55</amount> <currency>USD</currency> </monetaryDetails> </cancellationFee> </cancellationPoliciesSection> </hotelSalesRequCategorySection> <hotelSalesRequCategorySection> <pricingCategory> <itemDescriptionType>RAT</itemDescriptionType> <itemDescription> <description>Rate Information</description> <language>ENG</language> </itemDescription> </pricingCategory> <rateInformationSection> <ratePlanInformation> <ratePlanCode>CTP</ratePlanCode> <ratePlanId>CATERPILLAR</ratePlanId> <ratePlanIdDetails> <textSubjectQualifier>3</textSubjectQualifier> <informationType>HRAT</informationType> <source>S</source> <encoding>1</encoding> </ratePlanIdDetails> </ratePlanInformation> <rateAmountInformation> <tariffInfo> <amount>211.50</amount> <currency>USD</currency> <ratePlanIndicator>DY</ratePlanIndicator> <totalAmount>211.50</totalAmount> </tariffInfo> </rateAmountInformation> <rateChangeSection> <rateChangeAmountInformation> <monetaryDetails> <typeQualifier>HRC</typeQualifier> <amount>211.50</amount> <currency>USD</currency> </monetaryDetails> </rateChangeAmountInformation> <rateChangePeriodInformation> <businessSemantic>HRC</businessSemantic> <beginDateTime> <year>2015</year> <month>8</month> <day>17</day> </beginDateTime> <endDateTime> <year>2015</year> <month>8</month> <day>18</day> </endDateTime> </rateChangePeriodInformation> </rateChangeSection> </rateInformationSection> </hotelSalesRequCategorySection> <hotelSalesRequCategorySection> <pricingCategory> <itemDescriptionType>INC</itemDescriptionType> <itemDescription> <description>Rate Inclusions / Extras</description> <language>ENG</language> </itemDescription> </pricingCategory> <taxSection> <taxFeeInformation> <includedInAmount>E</includedInAmount> <perPerson>ROO</perPerson> <timeUnit>4</timeUnit> <category>TAX</category> <code>TAX</code> <amount>56.05</amount> <currencyCode>USD</currencyCode> </taxFeeInformation> <taxFeeValidity> <businessSemantic>EFF</businessSemantic> <beginDateTime> <year>2015</year> <month>8</month> <day>17</day> </beginDateTime> <endDateTime> <year>2015</year> <month>8</month> <day>18</day> </endDateTime> </taxFeeValidity> </taxSection> </hotelSalesRequCategorySection> </hotelSalesRequirementsSection> </Hotel\_CompleteReservationDetailsReply>

## 5.1.3 Possible Errors

See "Error Messages" section.

* * *