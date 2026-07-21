---
url: "https://developers.amadeus.com/api-library/soap/functional-doc/2047/doc-read/20019?serviceVersion=2.0"
download_url: "https://developers.amadeus.com/PAS-EAS/api/download/comp/4d4ad2cb456c02633f463a055ab70584/20019/upload_2970437151783598563.html"
title: "HTML_UG_WBS_Hotel_EnhancedPricing_HOTPRQ_02.0_214"
source: "amadeus"
service_id: "2047"
service_name: "Hotel_EnhancedPricing"
version: "2.0"
document_id: "20019"
doc_version: "2.0"
doc_type: "User guide"
file_format: "HTML"
scraped_at: "2026-07-15T10:28:38.080Z"
---
# Function: Hotel\_EnhancedPricing

* * *

## 1 Overview

This functionality is using the Open Travel Alliance (OTA) XML verbs OTA\_HotelAvailRQ and OTA\_HotelAvailRS version 2011B.  
It gives details for a specific product, which was returned in a previously performed MultiSingle or Single availablity request and is available for:

-   Distribution
-   Leisure (Aggregator)
-   MultiSource

It is triggered by the following paramater settings in the OTA\_HotelAvailRQ element:

-   EchoToken: Pricing
-   RateRangeOnly: False
-   SummaryOnly: False

Mark-up Engine

Amadeus distribution system provides you the ability to mark-up/down hospitality products. In other words, it  
means it gives you the possibility to higher or lower the price in order to add your margin in the price received  
through the XML interface.  
These pricing rules are created through the Amadeus Mark-up tool user interface, and they are applied at chain  
and rate plan level. Please refer to the product documentation for detailed information. Remember that the  
Mark-up functionality must be configured as "active" in your Amadeus Office ID profile prior you can use it by  
setting the attribute HMU (Hotel Mark-Up).  
Note: The usage of this tool has an impact in the response information you will receive. Please refer to section  
"Mark-up Information" for more details.

## 1.1 Supported Operations

Not applicable

## 1.2 Limitations

Enhanced pricing is available in stateful flow or state-less flow. In case of stateful flow, any enhanced pricing performed in a session out of a previous MultiSingleAvailability Mono-property will fail into a context missing error "SCI":

Multiple non identical room shopping is limited to aggregator content.

## 1.3 Unsupported Operations

Not applicable

## 1.4 Prerequisites

The user has previously performed a MultiSingle on the property to price.

## 2 Building A Query

A pricing request must include the following information:

-   Property code,
-   Check In, Check Out
-   Rate Plan code,
-   Room Type code,
-   Number of requested rooms,
-   Booking Code,
-   Number of guests.

For more details, the please see the sub structure description

### POS and Profile

To connect to aggregators, credentials might be required. Both the POS and Profile segments holds the requestor information details such as

-   The Agent Sign (@AgentSine in OTA\_HotelAvailRQ/POS/Source)
-   The Office ID (@ID in OTA\_HotelAvailRQ/POS/Source/RequestorID)
-   The Corporate Name (CompanyName with  ProfileType="3" in OTA\_HotelAvailRQ/AvailRequestSegments/AvailRequestSegment/HotelSearchCriteria/Criterion/Profiles/Profile/CompanyInfo

## 2.1 Sub Structure: HotelSearchCriteria

## 2.1.1 Description

The following settings are needed in the HotelSearchCriteria element:

-   in the Criterion, the ExactMatch is set to true
-   in HotelRef
    -   the ChainCode,
    -   the HotelCode,
    -   the HotelCityCode must be specified
-   in the StayDateRange segment, the start and end date of the stay must be entered
-   in the RatePlanCandidate segment, the important informations are the rateplan code with optionally the rateplan ID and the rateplan Type (category it belongs to)
-   for RoomStayCandidates,  
    -   room type code,
    -   booking code,
    -   number of rooms (Quantity),
    -   number of guest (Count),
    -   guest type (AgeQualifyingCode) to define adult/children occupancy,
    -   RoomID should be always present (value "1" except for multiple non identical rooms pricing).

## 2.1.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<OTA\_HotelAvailRQ xmlns="http://www.opentravel.org/OTA/2003/05" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" EchoToken="Pricing" PrimaryLangID="EN" RateRangeOnly="false" RequestedCurrency="EUR" SummaryOnly="false" Version="4.000" xsi:schemaLocation="http://www.opentravel.org/OTA/2003/05 P:\\HDP\\XMLSchemas\\OTA2011B\\OpenTravel2011B\_XML\\OTA\_HotelAvailRQ.xsd"> <AvailRequestSegments> <AvailRequestSegment> <HotelSearchCriteria> <Criterion ExactMatch="true"> <HotelRef ChainCode="DH" HotelCityCode="SCR" HotelCode="DHSCRMS8" HotelCodeContext="1A"></HotelRef> <StayDateRange End="2012-12-22" Start="2012-12-21"></StayDateRange> <RatePlanCandidates> <RatePlanCandidate RatePlanCode="GOV"> <MealsIncluded MealPlanCodes="3"></MealsIncluded> </RatePlanCandidate> </RatePlanCandidates> <RoomStayCandidates> <RoomStayCandidate BookingCode="alphaA123" Quantity="1" RoomID="1" RoomTypeCode="ROH"> <GuestCounts IsPerRoom="true"> <GuestCount AgeQualifyingCode="10" Count="1"></GuestCount> </GuestCounts> </RoomStayCandidate> </RoomStayCandidates> </Criterion> </HotelSearchCriteria> </AvailRequestSegment> </AvailRequestSegments> </OTA\_HotelAvailRQ>

## 2.2 Sub Structure: OTA\_HotelAvailRQ

## 2.2.1 Description

The following settings are needed in the OTA\_HotelAvailRQ element:

-   EchoToken segment must be set to "Pricing" 
-   the Version must be specified
-   SummaryOnly has to be set to false
-   RateRangeOnly hasto be set to false

## 2.2.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<OTA\_HotelAvailRQ xmlns="http://www.opentravel.org/OTA/2003/05" EchoToken="Pricing" PrimaryLangID="EN" RateRangeOnly="false" RequestedCurrency="EUR" SummaryOnly="false" Version="4.000" xsi:schemaLocation="http://www.opentravel.org/OTA/2003/05 P:\\HDP\\XMLSchemas\\OTA2011B\\OpenTravel2011B\_XML\\OTA\_HotelAvailRQ.xsd"> <AvailRequestSegments> <AvailRequestSegment> <HotelSearchCriteria> <Criterion ExactMatch="true"> <HotelRef ChainCode="WV" HotelCityCode="PAR" HotelCode="WVPAR887" HotelCodeContext="1A"></HotelRef> <StayDateRange End="2012-11-26" Start="2012-11-25"></StayDateRange> <RatePlanCandidates> <RatePlanCandidate RatePlanCode="COR"></RatePlanCandidate> </RatePlanCandidates> <RoomStayCandidates> <RoomStayCandidate BookingCode="C1SCOR" Quantity="1" RoomTypeCode="C1S"> <GuestCounts IsPerRoom="true"> <GuestCount AgeQualifyingCode="10" Count="1"></GuestCount> </GuestCounts> </RoomStayCandidate> </RoomStayCandidates> </Criterion> </HotelSearchCriteria> </AvailRequestSegment> </AvailRequestSegments> </OTA\_HotelAvailRQ>

## 2.3 Sub Structure: Prepay request for GDS

## 2.3.1 Description

A pricing request can be made for GDS chains, requesting for Prepay rate.

With this payment option, the user must pay the entire booking amount in advance, in order to confirm the booking.

To identify this form of payment, the request includes the following PrepaidQualifier defined in any one of the RatePlanCadidates:

OTA\_HotelAvailRQ/AvailRequestSegments/AvailRequestSegment/HotelSearchCriteria/Criterion/ RatePlanCandidates/RatePlanCandidate@PrepaidQualifier : ‘IncludePrepaid’

If the PrepaidQualifier = "ExcludePrepaid" and the provider sends Prepay rates, the system converts it into Deposit and returnt it the requesting client.

PrepaidQualifier = “PrepaidOnly” is not supported: in case this value is received, the system treats it as “ExcludePrepaid”.

## 2.3.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<OTA\_HotelAvailRQ xmlns="http://www.opentravel.org/OTA/2003/05" EchoToken="Pricing" PrimaryLangID="EN" RateRangeOnly="false" RequestedCurrency="EUR" SummaryOnly="false" Version="4.000" xsi:schemaLocation="http://www.opentravel.org/OTA/2003/05 P:\\HDP\\XMLSchemas\\OTA2011B\\OpenTravel2011B\_XML\\OTA\_HotelAvailRQ.xsd"> <AvailRequestSegments> <AvailRequestSegment> <HotelSearchCriteria> <Criterion ExactMatch="true"> <HotelRef ChainCode="RT" HotelCityCode="LAM" HotelCode="RTLAMARM"></HotelRef> <StayDateRange End="2018-06-18" Start="2018-06-15"></StayDateRange> <RatePlanCandidates> <RatePlanCandidate PrepaidQualifier="IncludePrepaid" RatePlanCode="RAC"></RatePlanCandidate> </RatePlanCandidates> <RoomStayCandidates> <RoomStayCandidate BookingCode="A2KRAC" RoomTypeCode="A2K"></RoomStayCandidate> </RoomStayCandidates> </Criterion> </HotelSearchCriteria> </AvailRequestSegment> </AvailRequestSegments> </OTA\_HotelAvailRQ>

## 2.4 Sub Structure: Pricing Multiple Identical Room

## 2.4.1 Description

"Multiple Identical Rooms" allows the user to price multiples rooms with the same occupancy and characteristics (Cancellation policies, room type, meals included, payment methods,....).

To do so, the request:

-   has same OTA\_HotelAvailRQ/AvailRequestSegments/AvailRequestSegment/HotelSearchCriteria/Criterion/RoomStayCandidates/RoomStayCandidate than preliminary MultiSingle to ensure consistency with requested booking code

-   additionally, the attribute OTA\_HotelAvailRQ/AvailRequestSegments/AvailRequestSegment/HotelSearchCriteria/Criterion/RoomStayCandidates/RoomStayCandidate/@RoomID must be set to “1”

-   additionally, the attribute  OTA\_HotelAvailRQ/AvailRequestSegments/AvailRequestSegment/HotelSearchCriteria/Criterion/RoomStayCandidates/RoomStayCandidate/@RoomID should mirror the previous received OTA\_HotelAvailRS/RoomStays/RoomStay/RoomTypes/@RoomTypeCode

Please note GDS and Leisure channel support children occupancy for booking multiple identical rooms.

## 2.4.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<OTA\_HotelAvailRQ xmlns="http://www.opentravel.org/OTA/2003/05" EchoToken="Pricing" PrimaryLangID="EN" RateRangeOnly="false" RequestedCurrency="EUR" SummaryOnly="false" Version="4.000" xsi:schemaLocation="http://www.opentravel.org/OTA/2003/05 P:\\HDP\\XMLSchemas\\OTA2011B\\OpenTravel2011B\_XML\\OTA\_HotelAvailRQ.xsd"> <AvailRequestSegments> <AvailRequestSegment> <HotelSearchCriteria> <Criterion ExactMatch="true"> <HotelRef ChainCode="WV" HotelCityCode="PAR" HotelCode="WVPAR887" HotelCodeContext="1A"></HotelRef> <StayDateRange End="2012-11-26" Start="2012-11-25"></StayDateRange> <RatePlanCandidates> <RatePlanCandidate RatePlanCode="COR"></RatePlanCandidate> </RatePlanCandidates> <RoomStayCandidates> <RoomStayCandidate BookingCode="C1SCOR" Quantity="2" RoomID="1" RoomTypeCode="C1S"> <GuestCounts IsPerRoom="true"> <GuestCount AgeQualifyingCode="10" Count="1"></GuestCount> </GuestCounts> </RoomStayCandidate> </RoomStayCandidates> </Criterion> </HotelSearchCriteria> </AvailRequestSegment> </AvailRequestSegments> </OTA\_HotelAvailRQ>

## 2.5 Sub Structure: Pricing Multiple Non Identical Room

## 2.5.1 Description

“Multiple non identical rooms” allows the user to price multiples rooms within the same property. These rooms can have different occupancies and characteristics (Cancellation policies, room type, meals included, payment methods,....). This use case is only available for content from hotel aggregators which explicitly support it. 

To do so, the request:

-   has same OTA\_HotelAvailRQ/AvailRequestSegments/AvailRequestSegment/HotelSearchCriteria/Criterion/RoomStayCandidates of the previous MultiSingle to ensure consistency with requested booking codes
-   additionally, each attribute OTA\_HotelAvailRQ/AvailRequestSegments/AvailRequestSegment/HotelSearchCriteria/Criterion/RoomStayCandidates/RoomStayCandidate/@RoomID must mirror the previous received OTA\_HotelAvailRS/RoomStays/RoomStay/RoomTypes/@RoomTypeCode

## 2.5.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<OTA\_HotelAvailRQ xmlns="http://www.opentravel.org/OTA/2003/05" EchoToken="Pricing" PrimaryLangID="EN" RateRangeOnly="false" RequestedCurrency="EUR" SummaryOnly="false" Version="4.000" xsi:schemaLocation="http://www.opentravel.org/OTA/2003/05 P:\\HDP\\XMLSchemas\\OTA2011B\\OpenTravel2011B\_XML\\OTA\_HotelAvailRQ.xsd"> <AvailRequestSegments> <AvailRequestSegment> <HotelSearchCriteria> <Criterion ExactMatch="true"> <HotelRef ChainCode="WV" HotelCityCode="PAR" HotelCode="WVPAR887" HotelCodeContext="1A"></HotelRef> <StayDateRange End="2012-11-26" Start="2012-11-25"></StayDateRange> <RatePlanCandidates> <RatePlanCandidate RatePlanCode="COR"></RatePlanCandidate> </RatePlanCandidates> <RoomStayCandidates> <RoomStayCandidate BookingCode="C1SCOR" Quantity="2" RoomID="1" RoomTypeCode="C1S"> <GuestCounts IsPerRoom="true"> <GuestCount AgeQualifyingCode="10" Count="1"></GuestCount> </GuestCounts> </RoomStayCandidate> </RoomStayCandidates> </Criterion> </HotelSearchCriteria> </AvailRequestSegment> <AvailRequestSegment> <HotelSearchCriteria> <Criterion ExactMatch="true"> <RoomStayCandidates> <RoomStayCandidate BookingCode="C2SCOR" Quantity="1" RoomID="2" RoomTypeCode="C2S"> <GuestCounts IsPerRoom="true"> <GuestCount AgeQualifyingCode="10" Count="2"></GuestCount> </GuestCounts> </RoomStayCandidate> </RoomStayCandidates> </Criterion> </HotelSearchCriteria> </AvailRequestSegment> </AvailRequestSegments> </OTA\_HotelAvailRQ>

## 3 Receiving A Reply

The received Pricing reponse is described in following sub-sections:

-   Basic Information
-   Number of rooms and guests
-   Rate information
-   Rate change
-   Total rate per stay per room
-   Commission
-   Total, rate inclusion/extra/all known taxes
-   Cancellation policy
-   Length of stay
-   Advance booking restriction
-   Hold time
-   Guarantee
-   Deposit
-   Prepay Information
-   Checkin/Checkout
-   Services
-   Currency Conversion
-   Marketing Information
-   Terms and Conditions
-   Markup information
-   Room Information
-   Additional Details

## 3.1 Sub Structure: Additional Details

## 3.1.1 Description

Some other information can be added in the pricing response, in a free flow text form.

**OTA\_HotelAvailRS/RoomStays/RoomStay/RatePlans/RatePlan/AdditionalDetails**

6

AdditionalDetails

0..1

  

  

7

AdditionalDetail

1..n

  

  

  

@Type

1

14 = Miscellaneous information

29 = Booking guideline details

OTA Code Type ADT

@Code

1

If Type=29:Code=“StatisticFields “ conveys information of theCorporate specific statistical fields.

These fields are required to be transmitted to the provider as part of booking transaction.

8

DetailDescription

1..n

  

  

  

@Name

1

If type 14: Not used

if Type=29 AND Code = StatisticFields“Name” corresponds to label of statistical fields

  

@CreatorID

1

if Type=29 AND Code=StatisticFields the attribute value of CreatorID corresponds to the index of the statistical field

9

ListItem

0..n

The ListItem value denotes the default value and the possible list of values for the statistical fields.

The ListItem attribute value is used to identify if the value is a default or possible value.

ListItem (Attribute)

0..n

The attribute ListItem =”0” denotes that the value of the ListItem field corresponds to default value of the statistical field.

  
If the ListItem attribute is not present, it indicates that the corresponding ListItem value is a possible value for the statistical field.

  
Only one ListItem attribute can be present for the ListItem field indicating only one default value of the statistical field.

10

Text

0..n

Text description

if Type=29 AND Code=StatisticFieldsthe value of “Text” could be the following:  
“M – Mandatory, indicating that it is mandatory to send the value of the statistical field to the provider“O – Optional, indicating that it is optional to send the value of the statistical field to the provider“Blank/Any other value – indicates that it is optional  
  

Formatted Text Type

  

@Language

0..1

  

  

## 3.1.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AdditionalDetails> <AdditionalDetail Type="14"> <DetailDescription> <Text Formatted="true">This is a detailed description of other type of information</Text> </DetailDescription> </AdditionalDetail> <AdditionalDetail Code="StatisticFields" Type="29"> <DetailDescription CreatorID="1" Name="Project Code"> <ListItem ListItem="0">P12345</ListItem> <Text>M</Text> </DetailDescription> </AdditionalDetail> <AdditionalDetail Code="StatisticFields" Type="29"> <DetailDescription CreatorID="2" Name="Cost Center"> <ListItem ListItem="0">AHP Hotels</ListItem> <ListItem>Air</ListItem> <ListItem>Car</ListItem> <Text>O</Text> </DetailDescription> </AdditionalDetail> </AdditionalDetails>

* * *

## 3.2 Sub Structure: Advance Booking restriction

## 3.2.1 Description

In terms of advance booking information, the informations are located in the xml element OTA\_HotelAvailRS/RoomStays/RoomStay/RoomRates/RoomRate/AdvanceBookingRestrictions.In order to avoid duplicate information, the advance booking information are returned only for the first rate occurrence.

If there are more occurrences of the same rate then the same restriction than described in the identical rate applies. The advance booking restrictions give the information of the number of days in advance the rate is bookable. The different informations that can be received are:

-   @Start: Absolute start period of the advance booking restriction
-   @End: Absolute end period of the advance booking restriction
-   @MinAdvanceBookingOffset: Minimum value of the advance booking restriction
-   @MaxAdvanceBookingOffset: Maximum value of the advance booking restriction

The Advance booking offset is specified in the following form "PnMnDTnH" where:

-   P indicates the period (required)
-   nM indicates the number of months
-   nD indicates the number of days
-   T indicates the start of a time section (required if you are going to specify hours, minutes, or seconds)
-   nH indicates the number of hours

A free flow text could be associated to it, for this, the additional details element needs to be used.

**OTA\_HotelAvailRS/RoomStays/RoomStay/RoomRates/RoomRate/AdvanceBookingRestriction**

AdvanceBookingRestriction

0..1

The restriction will only be specified for the first Rate occurrence.

  

@Start

0..1

Absolute period

Date or DateTimeType

@End

0..1

Absolute period

Date or DateTimeType

@MinAdvanceBookingOffset

0..1

Minimum advance booking

Duration

@MaxAdvanceBookingOffset

0..1

Maximum advance booking

Duration

**OTA\_HotelAvailRS/RoomStays/RoomStay/RatePlans/RatePlan/AdditionalDetails**

6

AdditionalDetails

0..1

  

  

7

AdditionalDetail

1..n

  

  

  

@Type

1

20 = Advance booking restrictions details

OTA Code Type ADT

8

DetailDescription

1

  

  

  

@Name

0..1

if type 20:  
not used

  

9

Text

1

Text description

Formatted Text Type

  

@Language

0..1

  

  

## 3.2.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AdvanceBookingRestriction End="2011-06-20" Start="2011-06-11"></AdvanceBookingRestriction>

* * *

## 3.3 Sub Structure: Basic Information

## 3.3.1 Description

The address of the hotel and related important information is returned:

**OTA\_HotelAvailRS/HotelStays/HotelStay/BasicPropertyInfo**

4

BasicPropertyInfo

1

The basic property info provides the unique identification of the property within the distribution channel.

  

  

@ChainCode

1

Chain code

AlphaNumericLength 2

  

@HotelCode

1

Hotel code

AlphaNumericLength 8

  

@HotelCityCode

0..1

City code

AlphaNumericLength 3

  

 @HotelCodeContext

1

Source of the hotel code, set to “1A”

AlphaNumericLength 2

  

@HotelName

0..1

Hotel Name

StringLength 1-40

  

@ChainName

0..1

Chain Name

StringLength 1-64

  

@AreaID

0..1

Identifier for an area as defined by a hotel reservation system

OTA Code Type LOC

  

@HotelSegmentCategoryCode

0..1

Identifies the segment (e.g., luxury, upscale, extended stay) of the hotel.  Refer to OTA Codelist Segment Category Code (SEG).

OTA Code Type SEG

  

@SupplierIntegrationLevel

1

The level of integration of a property to provide automated transaction information (SA=”0”, CA=”1”, CA+=”2”, DA=”3”)

SA: Standard Access (Pricing information provided by Amadeus)

CA: Complete Access (Pricing information provided by Amadeus)

CA+: Complete Access Plus (Pricing information provided by Chain's CRS)

DA: Direct Access (Pricing information provided by Chain's CRS)

nonNegativeInteger

**OTA\_HotelAvailRS/HotelStays/HotelStay/BasicPropertyInfo/Address**

5

Address

0..1

Public Address of the hotel property

  

  

@FormattedInd

0..1

When true, then it is formatted; when false, then not formatted.

Boolean

6

StreetNmbr

0..1

May contain the street number and optionally the street name.

StreetNumberType

6

AddressLine

0..5

  

StringLength 1-255

6

City Name

0..1

City or town name

StringLength 1-64

6

Postal Code

0..1

Post office code number

AlphaNumericLength 2-10

6

County

0..1

  

StringLength 1-32

6

State Prov

0..1

State or province name

  

  

@State Code

1

  

AlphaLength 2

6

CountryName

0..1

  

  

  

@Code

1

ISO3166 code for a country

AlphaLength 2

## 3.3.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<HotelStay RoomStayRPH="1"> <!-- General information about the Property --> <BasicPropertyInfo ChainCode="DH" ChainName="DOTWHOTELS" HotelCityCode="ZAD" HotelCode="DHZADAAA" HotelCodeContext="1A" HotelName="HOTEL FALKENSTEINER ADRIANA SELECT" SupplierIntegrationLevel="3"> <!-- Adress information --> <Address> <AddressLine>''MAJSTORA RADOVANA 7</AddressLine> <CityName>''ZADAR</CityName> <PostalCode>''23000</PostalCode> <CountryName Code="HR"></CountryName> </Address> <!-- Phone number information --> </BasicPropertyInfo> </HotelStay>

* * *

## 3.4 Sub Structure: Cancellation and Modification Policies

## 3.4.1 Description

Cancellation Penalty

The cancellation policies applicable to a product are returned in the following element:

**OTA\_HotelAvailRS/RoomStays/RoomStay/RatePlans/RatePlan/CancelPenalties/**

This element can convey the following information:

-   @CancelPolicyIndicator: 2 cases to distinguish:  
    -   Value set to "0": this means that there is no cancellation policy which applies
    -   Value set to "1" (or attribute not set): this means that there is at least one cancellation policy which applies.

Several cancellation policies can apply for the same product. Each of them is returned in a repetition of the following element.

-   OTA\_HotelAvailRS/RoomStays/RoomStay/RatePlans/RatePlan/CancelPenalties/CancelPenalty/

Two types of cancellation policies can be distinguished:

-   Free cancellation policy: the reservation can be cancelled without fees before the deadline. After the deadline the rate becomes non-refundable
-   Non-refundable policy: the reservation can be cancelled by paying a fee which can be defined by:
    -   The total amount of the stay
    -   A fixed amount specified in the cancel policy field (which might be lower than the total amount of the stay)

Each cancellation policy is defined by the combination of the following attributes:

-   @PolicyCode: Set to “Cancellation" or “ConvertedCancel”. ConvertedCancel identifies that the cancellation is estimated by Amadeus based on the free flow text description.
-   @NonRefundable: if set to “true” it indicates that the rate is partially or totally non-refundable.
-   .../Deadline/@AbsoluteDeadline: it represents the deadline until no cancellation applies.
-   .../AmountPercent/@NmbrOfNights: Number of nights due as fee in case of cancellation.
-   .../AmountPercent/@Percent: Percentage associated to the cancellation policy linked to the total amount.
-   .../AmountPercent/@Amount: Amount of the cancellation fee
-   .../AmountPercent/@CurrencyCode: Currency associated to the @Amount of the cancellation fee (ISO4217).
-   .../PenaltyDescription/Text: This element contains freeflow description of the policy (amount, nights, deadline...)

Note: the cancellation deadline is sent in local hotel time except if a "Z" added at the end, in which cases it is in GMT ("Z" standing for Zulu).

Modification Penalty

The modification policies applicable to a product are returned in the following element:

**OTA\_HotelAvailRS/RoomStays/RoomStay/RatePlans/RatePlan/ModificationFee/**

This element can convey the following information:

-   @CancelPolicyIndicator: 2 cases to distinguish:  
    -   Value set to "0": this means that there is no modification policy which applies
    -   Value set to "1" (or attribute not set): this means that there is at least one modification policy which applies.

Several modification policies can apply for the same product. Each of them is returned in a repetition of the following element.

-   OTA\_HotelAvailRS/RoomStays/RoomStay/RatePlans/RatePlan/ModificationFee/CancelPenalty/

Two types of modification policies can be distinguished:

-   Free modification policy: the reservation can be modified without fees before the deadline. After the deadline the rate becomes non-refundable
-   Non-refundable policy: the reservation can be modified by paying a fee which can be defined by:
    -   The total amount of the stay
    -   A fixed amount specified in the cancel policy field (which might be lower than the total amount of the stay)

Each modification policy is defined by the combination of the following attributes:

-   @PolicyCode: Set to “Modification"
-   @NonRefundable: if set to “true” it indicates that the rate is partially or totally non-refundable.
-   .../Deadline/@AbsoluteDeadline: it represents the deadline until no penalties apply.
-   .../AmountPercent/@NmbrOfNights: Number of nights due as fee in case of modification.
-   .../AmountPercent/@Percent: Percentage associated to the modification policy linked to the total amount.
-   .../AmountPercent/@Amount: Amount of the modification fee
-   .../AmountPercent/@CurrencyCode: Currency associated to the @Amount of the modification fee (ISO4217).
-   .../PenaltyDescription/Text: This element contains freeflow description of the policy (amount, nights, deadline...)

Note: the cancellation deadline is sent in local hotel time except if a "Z" added at the end, in which cases it is in GMT ("Z" standing for Zulu).

**OTA\_HotelAvailRS/RoomStays/RoomStay/RatePlans/RatePlan/CancelPenalties/**

6

CancelPenalties/

1

List of cancellation policies   

  

@CancelPolicyIndicator

0..1

“0” if no cancellation policy apply. “1” otherwise. 

CancelPolicyIndicator="1"

7

CancelPenalty/

0..99

Cancellation policy

Absent when CancelPolicyIndicator="false"  

  

  

@PolicyCode

1

\-"Cancellation" for data coming from Provider

\-"ConvertedCancel" for data parsed by Amadeus (parsing of Deadline from freeflow text)

StringLength 1-16

8

Deadline/

0..1

  

  

  

@AbsoluteDeadline

1

If absent, penalty applies. If present, penalty applies if cancel is done after the deadline.  

Time or DateTimeType

8

AmountPercent/

0..1

  

  

  

@Amount

0..1

Cancellation Fee - fixed amount

Money

  

@CurrencyCode

0..1

Currency code. Should be ISO 4217 . When @Amount is provided  

AlphaLength 3

  

@NmbrOfNights

0..1

Cancellation Fee - Expressed in Number of Nights  

  

8

PenaltyDescription/

0..1

  

  

9

Text/

1

Freeflow text - Description of penalty

Formatted Text Type

  

@language

0..1

language of the cancelation free flow text

  

## 3.4.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<CancelPenalties CancelPolicyIndicator="1"> <CancelPenalty PolicyCode="ConvertedCancel"> <Deadline AbsoluteDeadline="2017-05-12T18:00:00"></Deadline> </CancelPenalty> <CancelPenalty PolicyCode="Cancellation"> <PenaltyDescription> <Text> MUST BE CANCELLED BY 1800 ON 05/12/17</Text> </PenaltyDescription> </CancelPenalty> </CancelPenalties>

* * *

## 3.5 Sub Structure: Check-In/Check-Out

## 3.5.1 Description

**OTA\_HotelAvailRS/HotelStays/HotelStay/BasicPropertyInfo/Policy**

5

Policy

0..1

  

  

  

@CheckInTime

0..1

Check-in time limit

Time

  

@CheckOutTime

0..1

Check-out time limit

Time

For free flow text:

**OTA\_HotelAvailRS/RoomStays/RoomStay/RatePlans/RatePlan/AdditionalDetails**

6

AdditionalDetails

0..1

Additional rules

  

7

AdditionalDetail

1..n

Additional rules

  

  

@Type

1

Type of the additional detail:  
8 for Check in check out information

OTA Code Type ADT

8

DetailDescription

1

  

  

  

@Name

  

if type 8: “check-in” for check in details “check-out” for check out details

  

9

Text

1

Text description

Formatted Text Type

  

@Language

0..1

  

  

Express check-in / express check-out information

**OTA\_HotelAvailRS/RoomStays/RoomStay/RatePlans/RatePlan/AdditionalDetails**

6

AdditionalDetails

0..1

Additional rules

  

7

AdditionalDetail

1..n

Additional rules

  

  

@Type

1

Type of the additional detail:  
8 for Check in check out information

OTA Code Type ADT

8

DetailDescription

1

  

  

  

@Name

  

if type 8: “express check-in” for express check in details “express check-out” for express check out details

  

9

Text

0..1

Text description

Formatted Text Type

  

@Language

0..1

  

  

## 3.5.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<OTA\_HotelAvailRS> <HotelStays> <HotelStay> <!-- Detailed description of the check-in / check-out with a time for both --> <BasicPropertyInfo AreaID="12" ChainCode="HY" ChainName="HYATT HOTELS" HotelCityCode="MIA" HotelCode="HYMIAVIC" HotelCodeContext="1A" HotelName="HOTEL VICTOR" HotelSegmentCategoryCode="8" SupplierIntegrationLevel="3"> <!-- Check-in and check-out time information --> <Policy CheckInTime="14:20:00" CheckOutTime="12:20:00"></Policy> </BasicPropertyInfo> </HotelStay> </HotelStays> <RoomStays> <RoomStay> <RatePlans> <RatePlan> <!-- Additional details description --> <AdditionalDetails> <AdditionalDetail Type="8"> <!-- Check-in description --> <DetailDescription Name="check-in"> <Text Formatted="true">This is the check-in detailed description</Text> </DetailDescription> </AdditionalDetail> </AdditionalDetails> </RatePlan> </RatePlans> </RoomStay> </RoomStays> </OTA\_HotelAvailRS>

* * *

## 3.6 Sub Structure: Commission

## 3.6.1 Description

In terms of commission, the information is located in the xml element OTA\_HotelAvailRS/RoomStays/RoomStay/RatePlans/RatePlan/Commission

The different information that can be received is:

-   Commission information is not mandatory. It can happen that no commission information is returned. In this case the element commission will not be returned at all.
-   @StatusType:
    -   Value set to “Commissionable”: This means that there is a commission. Detailed information can be provided but it is not mandatory
    -   @Percent: Percentage of the commission. Value is between 0 and 100.
    -   @Amount: Amount of the commission. Amount is always linked to a currency code.
    -   @CurrencyCode: Currency of the amount provided.
    -   Note 1: Amount and percentage are mutually exclusive. Both attributes can’t be sent at the same time in the response.
    -   Value set to “Non-paying”: This means that the commissionable is Not Applicable i.e. there is no commission.
    -   If the status type is not used it means that we are in an unknown state regarding commission. There is a commission but according to the provider response there is no additional details.
-   A comment section to inform about:
    -   @Name: Value possible are “Included” or “Excluded” to inform whether commission are included or excluded of the rate
    -   A text element: This text element corresponds to the description of the element defined by the Type and name if it was needed. There is one line of freeflow text which can be returned.

**OTA\_HotelAvailRS/RoomStays/RoomStay/RatePlans/RatePlan/Commission**

6

Commission

0..1

  

  

  

@Percent

0..1

  

  

  

@StatusType

1

2 possible values:  
If the rate is not applicable then value set as “non-paying”  
If rate is commissionable then value is set to “Commissionable”

  

7

CommissionPayableAmount

0..1

Commission total

  

  

@Amount

1

Amount and percent should be mutually exclusive

Money

  

@CurrencyCode

1

Currency code Should be ISO 4217

AlphaLength 3

7

Comment

0..1

  

  

  

@Name

0..1

Set to “Included” or “Excluded” to give the information if the commission is included or not in the rate

String

8

Text

1..n

Description of the commission.

  

  

@language

0..1 

  

  

## 3.6.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<RatePlan AvailabilityStatus="AvailableForSale" RateIndicator="AvailableForSale" RatePlanCode="RAC"> <Commission StatusType="Commissionable"> <CommissionPayableAmount Amount="10.00" CurrencyCode="USD"></CommissionPayableAmount> </Commission> </RatePlan>

* * *

## 3.7 Sub Structure: Currency

## 3.7.1 Description

Currency conversion information is available in the pricing response

**OTA\_HotelAvailRS/CurrencyConversions**

2

CurrencyConversions

0..1

Used to define rate conversion when multiple currency possible

  

3

CurrencyConversion

1..n

  

  

  

 @RateConversion

1

The conversion factor to apply against the source currency to obtain the requested currency

Decimal

  

 @SourceCurrencyCode

1

  

AlphaLength 3

  

 @RequestedCurrencyCode

1

  

AlphaLength 3

  

 @DecimalPlaces

1

Indicates the number of decimal places for the requested currency

nonNegativeInteger

## 3.7.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<CurrencyConversions> <CurrencyConversion DecimalPlaces="2" RateConversion="0.48954799999999998" RequestedCurrencyCode="USD" SourceCurrencyCode="BRL"></CurrencyConversion> </CurrencyConversions>

* * *

## 3.8 Sub Structure: Deposit

## 3.8.1 Description

**Information about Form of payment at RatePlan level:**Deposit is a type of guarantee and gives detailed information about the booking requirements. If deposit is required the text will be displayed.

**OTA\_HotelAvailRS/RoomStays/RoomStay/RatePlans/RatePlan/Guarantee**

6

Guarantee

0..1

Deposit

  

  

@GuaranteeCode

1

8 for Deposit

StringLength 2 enumeration

  

@GuaranteeType

0..1

For a deposit required: GuaranteeCode=8 and guarantee

StringLength 2 enumeration

There are several forms of accepted deposits and it’s composed of the method of deposit label and the method of deposit such as Payment Card, BankAccount, Miscellaneous charge order, Cash. Up to 4 methods of deposit are acceptable.

**OTA\_HotelAvailRS/RoomStays/RoomStay/RatePlans/RatePlan/Guarantee**

6

Guarantee

0..1

Deposit

  

  

@GuaranteeCode

1

For a deposit required: GuaranteeCode=8 and guarantee

StringLength 2 enumeration

  

@GuaranteeType

0..1

For a deposit required: GuaranteeCode=8 and guarantee

StringLength 2 enumeration

7

GuaranteesAccepted

0..1

List of accepted references for deposit: Payment Card, BankAccount, Miscellaneous charge order

  

9

PaymentCard

0..1

Credit Card

  

  

@CardCode

1

The 2 character code of the credit card such as,

-   CA for MasterCard
-   VI for Visa
-   AX for American Express
-   DC for Diners Club
-   DS for Discover Card
-   JC for Japan Credit Bureau (JCB) 
-   TP for Universal Air Travel Plan (UATP)
-   UP for China UnionPay.

PaymentCardCodeType

9

BankAcct

0..1

Bank account

  

  

@CheckAcceptedInd

1

If true, check is accepted as deposit

Boolean

9

MiscChargeOrder

0..1

If true, MCO is accepted as deposit

  

Table for the method of deposit:

Cash

MiscChargeOrder

BankAccount@CheckAcceptedInd

PaymentCard

There are several credit cards that are accepted for the deposit.

**OTA\_HotelAvailRS/RoomStays/RoomStay/RatePlans/RatePlan/Guarantee**

6

Guarantee

0..1

Deposit

  

7

GuaranteesAccepted

0..1

List of accepted references for deposit: Payment Card, BankAccount, Miscellaneous charge order, Cash

  

8

GuaranteeAccepted

1..n

  

  

9

PaymentCard

0..1

Credit Card

  

  

@CardCode

1

The 2 characters code of the credit card such as

-   CA for MasterCard
-   VI for Visa
-   AX for American Express
-   DC for Diners Club
-   DS for Discover Card
-   JC for Japan Credit Bureau (JCB) 
-   TP for Universal Air Travel Plan (UATP)
-   UP for China UnionPay.

PaymentCardCodeType

Up to 15 line of free text (64 characters each line) can be added for the deposit as well to give more detailed information about various conditions.

**OTA\_HotelAvailRS/RoomStays/RoomStay/RatePlans/RatePlan/Guarantee**

  

  

  

6

Guarantee

0..3

Guarantee

7

GuaranteesAccepted

0..1

  

  

@Name

1

Set to ‘Deposit’

  

@Language

1

  

8

Text

1..15

Description of the deposit

  

@Language

0..1

  

In case of MultiSource content addtional information related to optional and mandatory fields for each credit card are returned:

9

PaymentCard

1

Credit Card

  

  

@CardCode

1

The 2 character code of the credit card such as,

-   CA for MasterCard
-   VI for Visa
-   AX for American Express
-   DC for Diners Club
-   DS for Discover Card
-   JC for Japan Credit Bureau (JCB) 
-   TP for Universal Air Travel Plan (UATP)
-   UP for China UnionPay.

PaymentCardCodeType

  

@SeriesCode

0..1

indicates if CVV code is required

Boolean

10

CardHolderName

0..1

Indicates if one or two fields for the name and if the Nationality is required

String

10

Address

0..1

  

  

11

AdressLine

0..1

Indicates if one/two addresslines are required or if it is optional

String

11

CityName

0..1

Indicates if the CityName is required

String

11

PostalCode

0..1

Indicates if the PostalCode is required

String

11

StateProv

0..1

Indicates if the StateProv is required

String

11

CountryName

0..1

Indicates if the CountryName is required

String

10

Telephone

0..1

  

  

  

@PhoneNumber

0..1

Indicates if the PhoneNumber is required

String

10

Email

0..1

Inidicates if the Email is required

String

**Information about Form of payment at RoomRate level:** The first GuaranteePayment element contains only:

-   @PaymentCode: For Deposit, value set to 8
-   @GuaranteeType: Value set to Deposit
-   AmountPercent:
    -   @Amount : Amount associated to the deposit. This is a flat amount.
    -   @CurrencyCode: Currency associated to the amount

-   Deadline:
    -   @AbsoluteDeadline: Deadline associated to the deposit form of payment.

-   Description: This description is provided only in the first occurrence of GuaranteePayment.
    -   @Name: The name defines whether the information is linked to “deposit”.
    -   @Language: Defines the language of the text to come
    -   Text: Distribution provider can return up to 15 occurrences of the text element. All distribution chains provide freeflow information. When it comes to leisure chains, they are able to provide information whether Direct Debit is Immediate or Delayed. This information is defined in the first Text element and there are 2 possible values:
        -   Direct Debit is Delayed
        -   Direct Debit is Immediate

 If the first GuaranteePayment element is used for the above mentioned information, the GuaranteePayment elements starting from the second are used for the form of payments. Each GuaranteePayment element contains one form of payment. Here are the different informations associated to a deposit form of payment:

-   GuaranteePayment: This element contains one form of payment
    -   @PaymentCode: For Deposit, value set to 8
    -   @GuaranteeType: Value set to Deposit

-   AmountPercent:
    -   @Amount: Amount/Fee associated to the form of payment. This is a flat amount.
    -   @CurrencyCode: Currency associated to the amount

-   Deadline:
    -   @AbsoluteDeadline: Deadline associated to the form of payment.

-   AcceptedPayments: Several types of form of payment are possible for a deposit

-   PaymentCard
    
    -   @CardCode: This attribute represents the credit card associated to the deposit inside the PaymentCard element. Several credit card can be returned thanks to several GuaranteeAccepted such as,
    
    -    
        -   CA for MasterCard
        -   VI for Visa
        -   AX for American Express
        -   DC for Diners Club
        -   DS for Discover Card
        -   JC for Japan Credit Bureau (JCB) 
        -   TP for Universal Air Travel Plan (UATP)
        -   UP for China UnionPay.
-   -   @Remark: This fields contains additional information
        -   TravelAgent Immediate: The credit card has to be the one of the Travel Agent and payment is immediate
        -   TravelAgent Delayed: The credit card has to be the one of the Travel Agent and payment is delayed
        -   Customer Immediate: The credit card has to be the one of the Customer and payment is immediate
        -   Customer Delayed: The credit card has to be the one of the Customer and payment is delayed
        -   CreditLine: The payment is done with a credit line
        -   B2B Wallet : The payment is done with a virtual credit card(B2B wallet)                                                                         
        -   PaymentCard can be empty when the provider returns the information that credit cards are accepted without mentioning the one concerned.
-   BankAcct: When returned, @CheckAcceptedInd also returned and when value is set to true, it means that checks are accepted.
-   DirectBill: Indicates that a direct bill is accepted as deposit.
-   LoyaltyRedemption: Indicates that loyalty redemption is accepted as deposit.
-   MiscChargeOrder: Indicates that miscellaneous charge order is accepted as deposit.
-   Cash: Indicates that cash is accepted as deposit through the @CacheIndicator field.

**OTA\_HotelAvailRS/RoomStays/RoomStay/RoomRates/RoomRate/Rates/Rate/PaymentPolicies**

8

PaymentPolicies

0..1

Collection of Payment Policies. The policies will only be specified for the first Rate occurrence.

  

9

GuaranteePayment

0..n

List of Form of Payment with if needed amount/percent associated to

  

  

@PaymentCode

1

31 for guarantee 8 for Deposit

StringLength 1-8  
Set to 31 for Guarantee  
Set to 8 for Deposit

  

@GuaranteeType

0..1

For a guarantee required: PaymentCode=31 and guarantee type="GuaranteeRequired" For a deposit required: PaymentCode=8 and guarantee type="Deposit"

StringLength 1-32

**OTA\_HotelAvailRS/RoomStays/RoomStay/RoomRates/RoomRate/Rates/Rate/PaymentPolicies**

8

PaymentPolicies

0..1

Collection of Payment Policies. The policies are specified only for the first Rate occurrence.

  

9

GuaranteePayment

0..n

List of Form of Payment with if needed amount/percent associated to.  
The first GuaranteePayment element contains only PaymentCode, GuaranteeType, AmountPercent (Deposit/Guarantee), Deadline, Description.  
For the form of payments a dedicated guarantepayment element is used, if an AmountPercent element is used it will be considered as a fee for that specific form of payment.  

  

  

@PaymentCode

1

31 for guarantee 8 for Deposit

StringLength 1-8  
Set to 31 for Guarantee  
Set to 8 for Deposit

  

@GuaranteeType

0..1

For a guarantee required: PaymentCode=31 and guarantee For a deposit required: PaymentCode=8 and guarantee

StringLength 1-32

10

AmountPercent

0..1

  

  

  

@Amount

1

Guarantee amount: flat amount

Money

  

@CurrencyCode

1

Guarantee currency code

AlphaLength 3

10

Deadline

0..1

  

  

  

@AbsoluteDeadline

1

Guarantee deadline

Time or DateTimeType

10

AcceptedPayments

0..1

  

  

11

AcceptedPayment

1..n

One GuaranteePayment element including one AcceptedPayments element has to be used per form of payment, as the Amount element is considered as fee.

  

12

PaymentCard

0..1

Credit Card

  

  

@CardCode

0..1

The 2 character code of the credit card such as

-   CA for MasterCard
-   VI for Visa
-   AX for American Express
-   DC for Diners Club
-   DS for Discover Card
-   JC for Japan Credit Bureau (JCB) 
-   TP for Universal Air Travel Plan (UATP)
-   UP for China UnionPay.

PaymentCardCodeType

  

@Remark

0..1

A remark associated with this payment card  
For Transhotel:  
• “TravelAgent Immediate” if the payment is done immediately by the TA  
• “TravelAgent Delayed” if the payment is not done immediately by the TA  
• “Customer Immediate” if the payment is done immediately by the customer  
• “Customer Delayed” if the payment is not done immediately by the customer  
• “CreditLine” if the payment is done with a credit line                                

StringLength 1-128

12

BankAcct

0..1

Bank account

  

  

@ChecksAcceptedInd

0..1

If true, check is accepted as guarantee

Boolean

12

DirectBill

0..1

If true, DirectBill is accepted as guarantee or deposit

Direct Bill Type

12

LoyaltyRedemption

0..1

If true, Loyalty Redemption is accepted as guarantee

  

12

MiscChargeOrder

0..1

If true, MCO is accepted as guarantee

  

12

Cash

0..1

If exist, Cash is accepted as guarantee or deposit

  

  

@CashIndicator

1

If exist, Cash is accepted as guarantee or deposit

Boolean

9

GuaranteePayment

0..1

HoldTime

  

  

@HoldTime

1

If no guarantee or deposit is required and no guarantee or deposit is given by the guest, the hold time applies. In case of hold time, the @GuaranteeType is empty.

Time

9

GuaranteePayment

0..2

Guarantee or Deposit

  

  

@PaymentCode

1

31 for guarantee 8 for Deposit

StringLength 1-8  
Set to 31 for Guarantee  
Set to 8 for Deposit

  

@GuaranteeType

0..1

For a guarantee required: PaymentCode=31 and guarantee For a deposit required: PaymentCode=8 and guarantee

StringLength 1-32

10

AmountPercent

1

  

  

  

@Amount

1

Guarantee amount: flat amount

Money

  

@CurrencyCode

1

Guarantee currency code

AlphaLength 3

10

Deadline

0..1

  

  

  

@AbsoluteDeadline

1

Guarantee deadline

Time or DateTimeType

10

Description

0..2

Used only in first occurrence of GuaranteePayment

  

  

@Name

1

Used to qualify the GuaranteePayment’s description.  
Either “guarantee” or “deposit”

  

11

Text

1..n

  

  

  

@Formatted

1

Always set to True

Boolean

## 3.8.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<RoomStay> <!--Form of payment with deposit and 2 card codes accepted--> <RatePlan AvailabilityStatus="AvailableForSale" RateIndicator="AvailableForSale" RatePlanCode="RAC"> <!-- Deposit information with 2 credit cards authorized --> <Guarantee GuaranteeCode="8" GuaranteeType="Deposit"> <GuaranteesAccepted> <GuaranteeAccepted> <PaymentCard CardCode="AX"></PaymentCard> </GuaranteeAccepted> <GuaranteeAccepted> <PaymentCard CardCode="MA"></PaymentCard> </GuaranteeAccepted> </GuaranteesAccepted> </Guarantee> </RatePlan> <!--Form of payment with deposit required and 1 card code with an amount and deadline--> <RoomRate AvailabilityStatus="AvailableForSale" BookingCode="alphaA123" InvBlockCode="alphaA123" NumberOfUnits="1" RatePlanCode="RAC" RoomTypeCode="ROH"> <Rates> <Rate EffectiveDate="2011-07-27" ExpireDate="2011-07-28" NumberOfUnits="100000" RateTimeUnit="Day"> <Base AmountAfterTax="70.00" CurrencyCode="EUR"> <!-- Form of payment with deposit required information --> <PaymentPolicies> <GuaranteePayment GuaranteeType="Deposit" PaymentCode="8"> <!-- Amount associated to the form of payment --> <AmountPercent Amount="50.00" CurrencyCode="EUR"></AmountPercent> <!-- Deadline associated to this form of payment --> <Deadline AbsoluteDeadline="2011-07-27T09:30:00"></Deadline> </GuaranteePayment> <GuaranteePayment GuaranteeType="Deposit" PaymentCode="8"> <AcceptedPayments> <!-- Credit card of the travel agent needed--> <AcceptedPayment> <PaymentCard CardCode="CB"></PaymentCard> </AcceptedPayment> </AcceptedPayments> </GuaranteePayment> </PaymentPolicies> </Rate> </Rates> </RoomRate> </RoomStay>

* * *

## 3.9 Sub Structure: Guarantee

## 3.9.1 Description

This section provides the information whether a gurantee is required to book the property or not. If not, nothing is displayed. If a guarantee is required, the form of accepted guarantees are listed in this section and the amount to guarantee is mentioned.

**OTA\_HotelAvailRS/RoomStays/RoomStay/RatePlans/RatePlan/Guarantee**

6

Guarantee

0..3

Guarantee  

  

  

@GuaranteeCode

1

31 for Guarantee

StringLength 2 enumeration

  

@GuaranteeType

0..1

For a guarantee required: GuaranteeCode=31 and guarantee

StringLength 2 enumeration

Once it’s determined that the guarantee is required, there are several accepted forms of guarantee such as Payment Card, BankAccount, DirectBill, Miscellaneous charge order, etc. which are mentioned with the respective code (ex: using a payment card)

**OTA\_HotelAvailRS/RoomStays/RoomStay/RatePlans/RatePlan/Guarantee**

6

Guarantee

0..3

Guarantee  

  

  

 @GuaranteeCode

1

31 for Guarantee 8 for Deposit At list 1 of the fields: @GuaranteeCode or @HoldTime have to be present in the message

StringLength 2 enumeration

  

@GuaranteeType

0..1

For a guarantee required: GuaranteeCode=31 and guarantee For a deposit required: GuaranteeCode=8 and guarantee

StringLength 2 enumeration

7

GuaranteesAccepted

0..1

List of accepted references for guarantee: Payment Card, BankAccount, DirectBill, Miscellaneous charge order, etc.

  

  

@Name

1

Set to "Guarantee"

  

  

@Language

1

  

  

8

Text

1..15

Description of the deposit.

  

  

@Language

0..1

  

  

8

GuaranteeAccepted

1..n

  

  

  

@BookingSourceAllowedInd

1

When true, the booking source may be used to guarantee the booking.

Boolean

  

@CorporateDiscountNbrAllowedInd

0..1

When true, the corporate discount number may be used to guarantee the booking.

Boolean

9

PaymentCard

1

Credit Card

  

  

@CardCode

1

The 2 characters code of the Credit Card such as

-   CA for MasterCard
-   VI for Visa
-   AX for American Express
-   DC for Diners Club
-   DS for Discover Card
-   JC for Japan Credit Bureau (JCB) 
-   TP for Universal Air Travel Plan (UATP)
-   UP for China UnionPay.

PaymentCardCodeType

@Remark

0..1

If value is "Converted", it means the Credit Card is added by Amadeus based on an internal logic.

"Converted"

9

BankAcct

0..1

Bank account

  

  

@CheckAcceptedInd

1

If true, check is accepted as guarantee

Boolean

9

DirectBill

0..1

If true, DirectBill is accepted as guarantee or deposit

Direct Bill Type

9

LoyaltyRedemption

0..1

If true, Loyalty Redemption is accepted as guarantee

  

9

MiscChargeOrder

0..1

If true, MCO is accepted as guarantee

  

Table for the accepted guarantee type codes:

MiscChargeOrder

Cash

GuaranteeAccepted@BookingSourceAllowedInd

GuaranteeAccepted@CorporateDiscountNbrAllowedInd

LoyaltyRedemption

BankAccount@CheckAcceptedInd

PaymentCard

Considering the accepted form of guarantee being the Credit Card (CC), there are possible values that are accepted for it. In OTA the accepted credit card codes can be identified in:

**OTA\_HotelAvailRS/RoomStays/RoomStay/RatePlans/RatePlan/Guarantee**

6

Guarantee

0..3

Guarantee  

  

7

GuaranteesAccepted

0..1

7List of accepted references for guarantee: Payment Card, BankAccount, DirectBill, Miscellaneous charge order, Cash, etc.

  

8

GuaranteeAccepted

1..n

  

  

9

PaymentCard

0..1

Credit Card

  

  

@CardCode

1

The 2 characters code of the credit card

such as

-   CA for MasterCard
-   VI for Visa
-   AX for American Express
-   DC for Diners Club
-   DS for Discover Card
-   JC for Japan Credit Bureau (JCB) 
-   TP for Universal Air Travel Plan (UATP)
-   UP for China UnionPay.

PaymentCardCodeType

Furthermore, there can be a free flow added to the Guarantee section to describe in detail the conditions. Up to 15 lines of free text is allowed to be added.

**OTA\_HotelAvailRS/RoomStays/RoomStay/RatePlans/RatePlan/Guarantee**

6

Guarantee

0..3

Guarantee  

  

7

GuaranteesAccepted

0..1

  

  

  

@Name

1

Set to ‘Guarantee’

  

  

@Language

1

  

  

8

Text

1..15

Description of the deposit

  

  

@Language

0..1

  

  

In case of Leisure and MultiSource addtional information related to CreditCards can be returned, which inidcates what kind of information is needed for payment:

9

PaymentCard

1

Credit Card

  

  

 @CardCode

1

The 2 characters code of the credit card 

such as

-   CA for MasterCard
-   VI for Visa
-   AX for American Express
-   DC for Diners Club
-   DS for Discover Card
-   JC for Japan Credit Bureau (JCB) 
-   TP for Universal Air Travel Plan (UATP)
-   UP for China UnionPay.

PaymentCardCodeType

  

 @SeriesCode

0..1

indicates if CVV code is required

Boolean

10

CardHolderName

0..1

Indicates if one or two fields for the name and if the Nationality is required

String

10

Address

0..1

  

  

11

AdressLine

0..1

Indicates if one/two addresslines are required or if it is optional

String

11

CityName

0..1

Indicates if the CityName is required

String

11

PostalCode

0..1

Indicates if the PostalCode is required

String

11

StateProv

0..1

Indicates if the StateProv is required

String

11

CountryName

0..1

Indicates if the CountryName is required

String

10

Telephone

0..1

  

  

  

 @PhoneNumber

0..1

Indicates if the PhoneNumber is required

String

10

Email

0..1

Inidicates if the Email is required

String

**Information about Form of payment at RoomRate level:** The first GuaranteePayment element contains only:

-   @PaymentCode: For Guarantee, value set to 31
-   @GuaranteeType: Value set to GuaranteeRequired
-   AmountPercent:
    -   @Amount: Amount associated to the guarantee. This is a flat amount.
    -   @CurrencyCode: Currency associated to the amount

-   Deadline:
    -   @AbsoluteDeadline   : Deadline associated to the guarantee form of payment.

-   Description      : This description is provided only in the first occurrence of GuaranteePayment.
    -   @Name           : The name defines whether the information is linked to “guarantee”.
    -   @Language     : Defines the language of the text to come
    -   Text                 : Distribution provider can return up to 15 occurrences of the text element. All distribution chains provide freeflow information. When it comes to leisure chains, they are able to provide information whether Direct Debit is Immediate or Delayed. This information is defined in the first Text element and there are 2 possible values:
    -   Direct Debit is Delayed
    -   Direct Debit is Immediate

If the first GuaranteePayment element is used for the above mentioned information, the GuaranteePayment elements starting from the second are used for the form of payments. Each GuaranteePayment elment contains one form of payment. Here are the different informations associated to a guarantee form of payment:

-   GuaranteePayment: This element contains one form of payment
    -   @PaymentCode: For Guarantee, value set to 31
    -   @GuaranteeType: Value set to GuaranteeRequired

-   AmountPercent: 
    -   @Amount: Amount/Fee associated to the form of payment. This is a flat amount.
    -   @CurrencyCode: Currency associated to the amount

-   Deadline: 
    -   @AbsoluteDeadline: Deadline associated to the guarantee form of payment.

-   AcceptedPayments: Several type of form of payment are possible for a guarantee  
    
    -   PaymentCard
        
        -   @CardCode: This attribute represents the credit card associated to the guarantee inside the PaymentCard element. Several credit card can be returned thanks to several GuaranteeAccepted such as,
            -   CA for MasterCard
            -   VI for Visa
            -   AX for American Express
            -   DC for Diners Club
            -   DS for Discover Card
            -   JC for Japan Credit Bureau (JCB) 
            -   TP for Universal Air Travel Plan (UATP)
            -   UP for China UnionPay.
        
        -   @Remark: This fields contains additional information
            -   TravelAgent Immediate: The credit card has to be the one of the Travel Agent and payment is immediate
            -   TravelAgent Delayed: The credit card has to be the one of the Travel Agent and payment is delayed
            -   Customer Immediate: The credit card has to be the one of the Customer and payment is immediate
            -   Customer Delayed: The credit card has to be the one of the Customer and payment is delayed
            -   CreditLine: The payment is done with a credit line
            -   B2B Wallet : The payment is done with a virtual credit card(B2B wallet)
            -   PaymentCard can be empty when the provider returns the information that credit cards are accepted without mentioning the one concerned.
            
    
    -   BankAcct: When returned, @CheckAcceptedInd also returned and when value is set to true, it means that checks are accepted.
    
    -   DirectBill: Indicates that a direct bill is accepted as guarantee.
    
    -   LoyaltyRedemption: Indicates that loyalty redemption is accepted as guarantee.
    
    -   MiscChargeOrder: Indicates that miscellaneous charge order is accepted as guarantee.
    
    -   Cash: Indicates that cash is accepted as guarantee through the @CacheIndicator field.

-    Description: This description is provided only in the first occurrence of GuaranteePayment.
    -   @Name: The name defines whether the information is linked to “guarantee”.
    -   @Language: Defines the language of the text to come
    -   Text: Distribution provider can return up to 15 occurrences of the text element. All distribution chains provide freeflow information. When it comes to leisure chains, they are able to provide information whether Direct Debit is Immediate or Delayed. This information is defined in the first Text element and there are 2 possible values:
        -   Direct Debit is Delayed
        -   Direct Debit is Immediate

**OTA\_HotelAvailRS/RoomStays/RoomStay/RoomRates/RoomRate/Rates/Rate/PaymentPolicies**

8

PaymentPolicies

0..1

Collection of Payment Policies. The policies are specified only for the first Rate occurrence.

  

9

GuaranteePayment

0..n

List of Form of Payment with if needed amount/percent associated to

  

  

@PaymentCode

1

31 for Guarantee 8 for Deposit.

StringLength 1-8  
Set to 31 for Guarantee  
Set to 8 for Deposit

  

@GuaranteeType

0..1

For a guarantee required: PaymentCode=31 and guarantee type="GuaranteeRequired" For a deposit required: PaymentCode=8 and guarantee type="Deposit"

StringLength 1-32

**OTA\_HotelAvailRS/RoomStays/RoomStay/RoomRates/RoomRate/Rates/Rate/PaymentPolicies**

8

PaymentPolicies

0..1

Collection of Payment Policies. The policies are specified only for the first Rate occurrence.

  

9

GuaranteePayment

0..n

List of Form of Payment with if needed amount/percent associated to.  
The first GuaranteePayment element contains only PaymentCode, GuaranteeType, AmountPercent (Deposit/Guarantee), Deadline, Description.  
For the form of payments a dedicated guarantepayment element is used, if an AmountPercent element is used it will be considered as a fee for that specific form of payment.  

  

  

@PaymentCode

1

31 for guarantee 8 for Deposit.

StringLength 1-8  
Set to 31 for Guarantee  
Set to 8 for Deposit

  

@GuaranteeType

0..1

For a guarantee required: PaymentCode=31 and guarantee For a deposit required: PaymentCode=8 and guarantee

StringLength 1-32

10

AmountPercent

0..1

  

  

  

@Amount

1

Guarantee amount: flat amount

Money

  

@CurrencyCode

1

Guarantee currency code

AlphaLength 3

10

Deadline

0..1

  

  

  

@AbsoluteDeadline

1

Guarantee deadline

Time or DateTimeType

10

AcceptedPayments

0..1

  

  

11

AcceptedPayment

1..n

One GuaranteePayment element including one AcceptedPayments element has to be used per form of payment, as the Amount element is considered as fee.

  

12

PaymentCard

0..1

Credit Card

  

  

@CardCode

0..1

The 2 characters code of the credit card such as

-   CA for MasterCard
-   VI for Visa
-   AX for American Express
-   DC for Diners Club
-   DS for Discover Card
-   JC for Japan Credit Bureau (JCB) 
-   TP for Universal Air Travel Plan (UATP)
-   UP for China UnionPay.

PaymentCardCodeType

  

@Remark

0..1

A remark associated with this payment card  
For Transhotel:  
• “TravelAgent Immediate” if the payment is done immediately by the TA  
• “TravelAgent Delayed” if the payment is not done immediately by the TA  
• “Customer Immediate” if the payment is done immediately by the customer  
• “Customer Delayed” if the payment is not done immediately by the customer  
• “CreditLine” if the payment is done with a credit line

StringLength 1-128

12

BankAcct

0..1

Bank account

  

  

@ChecksAcceptedInd

0..1

If true, Check is accepted as guarantee

Boolean

12

DirectBill

0..1

If true, DirectBill is accepted as guarantee or deposit

Direct Bill Type

12

LoyaltyRedemption

0..1

If true, Loyalty Redemption is accepted as guarantee

  

12

MiscChargeOrder

0..1

If true, MCO is accepted as guarantee

  

12

Cash

0..1

If exist, Cash is accepted as guarantee or deposit

  

  

 @CashIndicator

1

If exist, Cash is accepted as guarantee or deposit

Boolean

9

GuaranteePayment

0..1

HoldTime

  

  

@HoldTime

1

If no guarantee or deposit is required and no guarantee or deposit is given by the guest, the hold time applies. In case of hold time, the @GuaranteeType is empty.

Time

9

GuaranteePayment

0..2

Guarantee or Deposit

  

  

@PaymentCode

1

31 for guarantee 8 for Deposit

StringLength 1-8  
Set to 31 for Guarantee  
Set to 8 for Deposit

  

 @GuaranteeType

0..1

For a guarantee required: PaymentCode=31 and guarantee For a deposit required: PaymentCode=8 and guarantee

StringLength 1-32

10

AmountPercent

1

  

  

  

@Amount

1

Guarantee amount: flat amount

Money

  

@CurrencyCode

1

Guarantee currency code

AlphaLength 3

10

Deadline

0..1

  

  

  

@AbsoluteDeadline

1

Guarantee deadline

Time or DateTimeType

10

Description

0..2

Used only in first occurrence of GuaranteePayment

  

  

 @Name

1

Used to qualify the GuaranteePayment’s description.  
Either “guarantee”  or “deposit”

  

11

Text

1..n

  

  

  

@Formatted

1

Always set to True

Boolean

## 3.9.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<RoomStay> <!--Form of payment guarantee containing all other type of detailed information--> <RatePlan AvailabilityStatus="AvailableForSale" RateIndicator="AvailableForSale" RatePlanCode="RAC"> <!-- Guarantee required form of payment with all the different possible FOP accepted --> <Guarantee GuaranteeCode="31" GuaranteeType="GuaranteeRequired"> <GuaranteesAccepted> <!-- Credit Card accepted and booking source authorized, as well as corporate discount --> <GuaranteeAccepted BookingSourceAllowedInd="true" CorpDiscountNbrAllowedInd="true"> <PaymentCard CardCode="AX"></PaymentCard> </GuaranteeAccepted> <!-- Check accepted --> <GuaranteeAccepted> <BankAcct ChecksAcceptedInd="true"></BankAcct> </GuaranteeAccepted> <!-- Direct Bill accepted --> <GuaranteeAccepted> <DirectBill></DirectBill> </GuaranteeAccepted> <!-- Loyalty redemption accepted --> <GuaranteeAccepted> <LoyaltyRedemption></LoyaltyRedemption> </GuaranteeAccepted> <!-- Misc charge order accepted--> <GuaranteeAccepted> <MiscChargeOrder></MiscChargeOrder> </GuaranteeAccepted> <!-- Cash accepted --> <GuaranteeAccepted> <Cash CashIndicator="true"></Cash> </GuaranteeAccepted> </GuaranteesAccepted> </Guarantee> </RatePlan> <!--Form of payment with guarantee required and 2 card code accepted with different remarks--> <RoomRate AvailabilityStatus="AvailableForSale" BookingCode="alphaA123" InvBlockCode="alphaA123" NumberOfUnits="1" RatePlanCode="RAC" RoomTypeCode="ROH"> <Rates> <Rate EffectiveDate="2011-07-27" ExpireDate="2011-07-28" NumberOfUnits="100000" RateTimeUnit="Day"> <Base AmountAfterTax="70.00" CurrencyCode="EUR"> <!-- Form of payment with guarantee required information --> <PaymentPolicies> <GuaranteePayment GuaranteeType="GuaranteeRequired" PaymentCode="31"> <AcceptedPayments> <!-- Credit card of the travel agent needed with an immediate payment--> <AcceptedPayment> <PaymentCard CardCode="CB" Remark="TravelAgent Immediate"></PaymentCard> </AcceptedPayment> </AcceptedPayments> </GuaranteePayment> <GuaranteePayment GuaranteeType="GuaranteeRequired" PaymentCode="31"> <AcceptedPayments> <!-- Credit card of the customer needed with a delayed payment--> <AcceptedPayment> <PaymentCard CardCode="AX" Remark="Customer Delayed"></PaymentCard> </AcceptedPayment> </AcceptedPayments> </GuaranteePayment> </PaymentPolicies> </Rate> </Rates> </RoomRate> </RoomStay>

* * *

## 3.10 Sub Structure: Hold Time

## 3.10.1 Description

Hold Time is part of the Booking restrictions, and is considered a part of the required guarantee and gives information about the time until when the room will be saved for the customer to take it. The value is in time format is displayed in 24h format: for example 18:00.

**OTA\_HotelAvailRS/RoomStays/RoomStay/RatePlans/RatePlan/Guarantee**

6

Guarantee

0..3

Guarantee

  

  

@HoldTime

1

If no guarantee or deposit is required and no guarantee or deposit is given by the guest, the hold time applies. In case of hold time, the @GuaranteeType is not set. At list 1 of the fields: @GuaranteeCode or @HoldTime have to be present in the message. The Time is based on 24H format, (1pm is displayed as 13:00:00) and it’s the local time of the hotel.

00:00:00

**OTA\_HotelAvailRS/RoomStays/RoomStay/RoomRates/RoomRate/Rates/Rate/PaymentPolicies**

8

PaymentPolicies

0..1

Collection of Payment Policies. The policies will only be specified for the first Rate occurrence.

  

9

GuaranteePayment

0..1

HoldTime

  

  

@HoldTime

1

If no guarantee or deposit is required and no guarantee or deposit is given by the guest, the hold time applies. In case of hold time, the @GuaranteeType is empty.

Time

## 3.10.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<RatePlan AvailabilityStatus="AvailableForSale" RateIndicator="AvailableForSale" RatePlanCode="RAC"> <!-- Hold time form of payment with a limit set to 18:00 --> <Guarantee HoldTime="08:40:00"></Guarantee> </RatePlan>

* * *

## 3.11 Sub Structure: LOS

## 3.11.1 Description

In terms of Length of Stay, a minimum and/or a maximum and/or a free flow text can be returned in the Pricing response

**OTA\_HotelAvailRS/RoomStays/RoomStay/RoomRates/RoomRate/Rates**

6

Rates

1

Rate change list

  

7

Rate

1..n

  

  

  

@MinLOS

0..1

Minimum length of stay / Only given on the 1st occurrence of the rate change in number of days 

nonNegativeInteger

  

@MaxLOS

0..1

Maximum length of stay / Only given on the 1st occurrence of the rate change in number of days

nonNegativeInteger

**OTA\_HotelAvailRS/RoomStays/RoomStay/RatePlans/RatePlan/AdditionalDetails**

AdditionalDetails

0..1

  

  

AdditionalDetail

1..n

  

  

@Type

1

29 = Booking Guidelines

OTA Code Type ADT

DetailDescription

1

  

  

@Name

0..1

if type 29:  
“minimum stay” for minimum length of stay “maximum stay” for maximum length of stay

  

Text

1

Text description

Formatted Text Type

@Language

0..1

  

  

## 3.11.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<RoomStay> <RatePlans> <RatePlan> <!--...--> <AdditionalDetails> <AdditionalDetail Type="29"> <DetailDescription Name="minimum stay"> <Text Language="en">MINIMUM STAY DESCRIPTION</Text> </DetailDescription> </AdditionalDetail> <AdditionalDetail Type="29"> <DetailDescription Name="maximum stay"> <Text Language="en">MAXIMUM STAY DESCRIPTION</Text> </DetailDescription> </AdditionalDetail> </AdditionalDetails> </RatePlan> </RatePlans> <Rate EffectiveDate="2011-06-01" ExpireDate="2011-06-02" MaxLOS="3" MinLOS="1" RateTimeUnit="Day"> <!--...--> </Rate> </RoomStay>

* * *

## 3.12 Sub Structure: Loyalty Program Information

## 3.12.1 Description

Loyalty Program information is used by Hotel providers to indicate whether loyalty-related benefits apply to a specific rate. This helps travel agents determine if booking the rate, qualifies for perks such as reward points, discounts, or other exclusive benefits that are offered via the loyalty program.

The loyalty program details are located in the following XML path:

OTA\_HotelAvailRS/RoomStays/RoomStay/RoomRates/RoomRate/Rates/Rate/TPA\_Extensions/LoyaltyProgram

-   @Applicable - Possible values are "Y" or "N" with type, AlphaLength1
    -   "Y" – Loyalty benefits are applicable to this rate.
    -   "N" – Loyalty benefits are not applicable to this rate.

This attribute helps agents quickly identify whether a rate includes loyalty advantages.

Note: Loyalty benefits may include reward points, discounts, or additional perks offered by the provider. Detailed information about these benefits can be found in the property's descriptive info service (Section:- Hotel\_DescriptiveInfo - Operation: Loyalty Information retrieve).

## 3.12.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<RoomRates> <RoomRate AvailabilityStatus="AvailableForSale" BookingCode="A00A1CC" NumberOfUnits="1" RatePlanCode="RAC" RoomTypeCode="A00"> <Rates> <Rate EffectiveDate="2025-09-02" ExpireDate="2025-09-03" RateTimeUnit="Day"> <Base AmountAfterTax="208.77" CurrencyCode="EUR" RateOverrideIndicator="1"> <PaymentPolicies> <GuaranteePayment GuaranteeType="Deposit" PaymentCode="8"></GuaranteePayment> <GuaranteePayment GuaranteeType="Deposit" PaymentCode="8"> <AcceptedPayments> <AcceptedPayment> <PaymentCard Remark="B2BWallet"></PaymentCard> </AcceptedPayment> </AcceptedPayments> </GuaranteePayment> <GuaranteePayment GuaranteeType="Deposit" PaymentCode="8"> <AcceptedPayments> <AcceptedPayment> <PaymentCard Remark="Virtual Credit Card"></PaymentCard> </AcceptedPayment> </AcceptedPayments> </GuaranteePayment> <GuaranteePayment GuaranteeType="Deposit" PaymentCode="8"> <AcceptedPayments> <AcceptedPayment> <PaymentCard Remark="BillBack"></PaymentCard> </AcceptedPayment> </AcceptedPayments> </GuaranteePayment> </PaymentPolicies> <TPA\_Extensions> <LoyaltyProgram Applicable="Y"></LoyaltyProgram> </TPA\_Extensions> </Rate> </Rates> <RoomRateDescription Name="Room A00"> <Text Formatted="1">ADVANCE PURCHASE</Text> <Text Formatted="1">FULL PAYMENT IN ADVANCE.</Text> <Text Formatted="1">NON REFUNDABLE. NO CHANGES ALLOWED OR CREDITS</Text> <Text Formatted="1">KING GUEST ROOM</Text> <Text Formatted="1">SPACIOUS BRIGHT AND QUIET CONTEMPORARY ROOM</Text> <Text Formatted="1">COMFORTABLE DESK WIFI SATELITE TV</Text> </RoomRateDescription> <Features> <Feature RoomAmenity="196"></Feature> <Feature RoomAmenity="131"></Feature> <Feature RoomAmenity="198"></Feature> <Feature RoomAmenity="26"></Feature> </Features> <Total AmountAfterTax="208.77" AmountBeforeTax="208.77" CurrencyCode="EUR" RateOverrideIndicator="1"></Total> </RoomRate> </RoomRates>

* * *

## 3.13 Sub Structure: Marketing Information

## 3.13.1 Description

Marketing information is used by hotel providers to do communication and advertising for their products. This way agents can be informed about news like special offers, promotions, etc.

Marketing information is availabile in the following XML element:

OTA\_HotelAvailRS/RoomStays/RoomStay/BasicPropertyInfo/VendorMessages

-   VendorMessage: 1-99 Maketing lines
    -   @InfoType: set to 3 for Marketing Lines
    -   @InfoType: set to 15 for Services
-   SubSection: 1
-   Paragraph: 1-99
    -   @Name: Description of paragraph content in case of multiple paragraphs  
        e.g. LongTextDescription; ShortTextDescription; Image
-   Text: 0 or 1 elements
    -   @Formatted:  textual information
    -   @Language:  language idendification, Code ISO 639-1  AlphaLength 2

## 3.13.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<VendorMessage InfoType="3"> <SubSection> <Paragraph> <Text Formatted="1"> This is the first line of marketing text.</Text> <Text Formatted="1"> This is the second line of marketing text.</Text> <Text Formatted="1"> This is the third line of marketing text.</Text> </Paragraph> </SubSection> </VendorMessage>

* * *

## 3.14 Sub Structure: Markup Information

## 3.14.1 Description

Markup information can be returned in the response. Markup rules apply to all the amounts within a product.  
The attributes described below are either modified or included by this functionality.

**Daily price**  
OTA\_HotelAvailRS/RoomStays/RoomStay/RoomRates/RoomRate/Rates/Rate/Base/

-   @AmountIncludingMarkup: This attribute provides the daily price including the Travel Agency Markup

-   @RateOverrideIndicator: If it is set to "true", the manual Mark-Up is available, otherwise the Markup cannot be modified manually. This flag is closely related with the Amadeus Office ID attribute HMM (Hotel Manual Mark-Up) and the settings done through the Amadeus Mark-Up tool UI.

-   @AmountBeforeTax: This amount is kept unmodified and shows the amount before taxes not including the mark-up.

-   @AmountAfterTax: This amount is kept unmodified and shows the amount after taxes not including the mark-up.

**Total amount**  
OTA\_HotelAvailRS/RoomStays/RoomStay/RoomRates/RoomRate/Rates/Rate/Total/

-   @AmountIncludingMarkup: This attribute provides daily price including Travel Agency Mark-Up. This amount computation details are available in the "Mark-up amount calculation" section here after.

-   @RateOverrideIndicator: If it is set to "true", the manual Mark-Up is available, otherwise the Mark-Up cannot be modified manually. This flag is closely related with the Amadeus Office ID sttribute HMM (Hotel Manual Mark-Up) and the settings done through the Amadeus Mark-Up tool UI.

-   @AmountBeforeTax: This amount is kept unmodified and shows the amount before taxes not including the mark-up.

-   @AmountAfterTax: This amount is kept unmodified and shows the amount after taxes not including the mark-up.

**Markup amount calculation**

If you receive the @AmountIncludingMarkup attribute, the mark-up amount could be calculated as follows:

1.  Mark-up amount = @AmountIncludingMarkup – @AmountAfterTaxes. If AmountAfterTaxes is returned
2.  Mark-up amount = @AmountIncludingMarkup – @AmountBeforeTax. If AmountBeforeTax is returned

**Markup Currency**  
  
The Amounts with Markup are expressed in Provider's currency for any GDS or NON Amadeus Value Hotel Leisure property.  
  
For Amadeus Value Hotel leisure properties amounts are expressed in Travel agent‘s currency. (The Travel Agent currency is a LSS preferrence attached to the office ID of the Travel agent).

## 3.14.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<RoomStay> <RoomRates> <RoomRate AvailabilityStatus="AvailableForSale" BookingCode="C1DRAC" NumberOfUnits="1" RatePlanCode="RAC" RoomTypeCode="C1D"> <Rates> <Rate EffectiveDate="2014-02-07" ExpireDate="2014-02-08" RateTimeUnit="Day"> <Base AmountAfterTax="470.00" AmountIncludingMarkup="480.00" CurrencyCode="EUR" RateOverrideIndicator="1"> </Rate> </Rates> <RoomRateDescription Name="Room C1D"> <Text Formatted="1">Rack rate</Text> <Text Formatted="1">Classic Room with 1 double bed</Text> </RoomRateDescription> <Total AmountAfterTax="470.00" AmountIncludingMarkup="480.00" CurrencyCode="EUR" RateOverrideIndicator="1"></Total> </RoomRate> </RoomRates> <Total AdditionalFeesExcludedIndicator="1" AmountAfterTax="470.00" AmountIncludingMarkup="480.00" CurrencyCode="EUR" RateOverrideIndicator="1"></Total> </RoomStay>

* * *

## 3.15 Sub Structure: Number of rooms and guests

## 3.15.1 Description

The number of rooms and guests can be returned in the reponse. When a request of Pricing is made, the response contains the room(s) with information regarding the guest. Two cases have to be distinguished:

-   A request not including packages: In this case, Guest information is only returned at RoomStay level defining the occupancy total (in fact the occupancy of one room only as one Room.
    -   At least one adult has to be requested when a child has to be added in a room.
    -   First Guest Count is always used to inform about the number of Adult(s) linked to the room:
        -   @AgeQualifyingCode : Set to 10 (Adult).
        -   @Count: Define the number of adult for the room.
    -   In case children are associated to the room requested:
        -   @AgeQualifyingCode : Set to 8 (Child).
        -   @Age: Age of the child.
        -   @Count: Define the number of child in the room.
    -   If several identical rooms are requested, this is the guest information for each of the rooms.

-   A request including packages: In this case the Guest information, in addition to be returned at RoomStay level has to be also returned at RoomRate level. The information set at RoomRate level defines the occupancy linked to the specific room while the information set at RoomStay level will define the global occupancy of the packages (ie the different room requested and returned in the RoomStay)
    -   At least one adult has to be requested when a child has to be added in a room.
    -   First Guest Count is always used to inform about the number of Adult(s) linked to the room:
        -   @AgeQualifyingCode : Set to 10 (Adult).
        -   @Count: Define the number of adult for the room.
    -   In case children are associated to the room requested:
        -   @AgeQualifyingCode : Set to 8 (Child)
        -   @Age: Age of the child.
        -   @Count: Define the number of child in the room.

Note 1: No provider/aggregator handling the package functionality today.

Note 2: Children functionality is supported by both Distribution and Leisure/MultiSource flow.

Number of rooms:

**OTA\_HotelAvailRS/RoomStays/RoomStay/RoomRates/RoomRate**

5

RoomRate

1..n

  

  

 

@NumberOfUnit

0..1

Number of room requested (can be different than 1)

NumericLength 1-2

Number of guests:

**OTA\_HotelAvailRS/RoomStays/RoomStay/GuestCounts**

4

GuestCounts

1

Guest count per room

  

5

GuestCount

0..n

Give guests details. Repetitive based on guest type. 

  

  

@AgeQualifyingCode

1

For adults, guest code is 10. For children, code is 8.

OTA Code Type AQC

  

@Count

1

Occupancy for the adult guests, maximum is 9

NumericLength 1

@age

1

Age of child. Children age is mandatory.

Numeric

## 3.15.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<RoomStay> <!--Number of rooms--> <RoomRates> <RoomRate AvailabilityStatus="AvailableForSale" BookingCode="KNGRACK" NumberOfUnits="2" RatePlanCode="RACK" RoomTypeCode="KNG"> </RoomRate> </RoomRates> <!-- Guest count at RoomStay level: 2 adults and one child (no GuestCount at RoomRate)--> <GuestCounts> <!-- Adult definition first --> <GuestCount AgeQualifyingCode="10" Count="2"></GuestCount> <!-- Child definition with age of the child --> <GuestCount Age="5" AgeQualifyingCode="8" Count="1"></GuestCount> </GuestCounts> </RoomStay>

* * *

## 3.16 Sub Structure: Prepay Information

## 3.16.1 Description

Prepay is a payment option that indicates that a full payment is required at booking time. The GuaranteeType of Prepay, available from the Rate Plan and Payment Policy section, gives detailed information about the booking requirements.

**OTA\_HotelAvailRS/RoomStays/RoomStay/RatePlans/RatePlan/Guarantee**

6

Guarantee

0..1

  

  

  

@GuaranteeType

0..1

For a Prepay required:  GuaranteeType=Prepay

StringLength 1-32

@GuaranteeCode

1

4 for Prepay

StringLength 2

There are several forms of accepted methods of prepay such as, Payment Card, BankAccount, Miscellaneous charge order, Cash. Up to 4 methods of prepayments are acceptable.

**Information about Form of payment at RoomRate level:**

Each GuaranteePayment element contains one form of payment. Here are the different attributes associated to a prepay form of payment:

**OTA\_HotelAvailRS/RoomStays/RoomStay/RoomRates/RoomRate/Rates/Rate/PaymentPolicies**

8

PaymentPolicies

0..1

Collection of Payment Policies. The policies will only be specified for the first Rate occurrence.

  

9

GuaranteePayment

0..n

List of Form of Payment with if needed amount/percent associated to

  

  

@GuaranteeType

0..1

For a Prepay required: GuaranteeType="Prepay"

StringLength 1-32

@GuaranteeType

0..

4 for Prepay

StringLength 1-8  

## 3.16.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<OTA\_HotelAvailRS xmlns="http://www.opentravel.org/OTA/2003/05" EchoToken="Pricing" PrimaryLangID="en"> <Success></Success> <RoomStays> <RoomStay> <RatePlans> <RatePlan AvailabilityStatus="AvailableForSale" RateIndicator="AvailableForSale" RatePlanCode="UK3"> <Guarantee GuaranteeCode="4" GuaranteeType="Prepay">   <GuaranteesAccepted>     <GuaranteeAccepted>          <PaymentCard CardCode="AX"></PaymentCard>      </GuaranteeAccepted>      <GuaranteeAccepted>          <PaymentCard CardCode="EC"></PaymentCard>      </GuaranteeAccepted>      <GuaranteeAccepted>          <PaymentCard CardCode="IK"></PaymentCard>      </GuaranteeAccepted>      <GuaranteeAccepted>          <PaymentCard CardCode="VI"></PaymentCard>      </GuaranteeAccepted>      </GuaranteesAccepted> </Guarantee> <Commission StatusType="Commissionable"></Commission> </RatePlan> </RatePlans> <RoomRates> <RoomRate BookingCode="B2TUK3B" RoomTypeCode="B2T"> <Rates> <Base AmountBeforeTax="156.00" CurrencyCode="EUR"> <Taxes> <Tax Code="17"></Tax> </Taxes> </Base> <PaymentPolicies> <GuaranteePayment GuaranteeType="Prepay" PaymentCode="4"></GuaranteePayment> </PaymentPolicies> </Rates> <RoomRateDescription> </RoomRateDescription> <Total AmountAfterTax="157.65" AmountBeforeTax="156.00" CurrencyCode="EUR"></Total> </RoomRate> </RoomRates> </RoomStay> </RoomStays> </OTA\_HotelAvailRS>

* * *

## 3.17 Sub Structure: Rate change

## 3.17.1 Description

The list of rate changes is optional and not returned by all providers.For each rate change, a start and end dates or a free flow text are returned. The different attributes are the following:

-   @EffectiveDate: Begin date of the rate change when known. Value returned when there is a rate change, otherwise this value is optional.
-   @ExpireDate: End date of the rate change when known. Value returned when there is a rate change, otherwise this value is optional.
-   @RateTimeUnit: Corresponds to the pricing frequency of the rate returned. If not present, the related information should be considered as applicable per day for this rate day range.
-   @NumberOfUnits: This value, when returned, reflects the number of room still left. It can occur that when provider is returning such information, it is not necessarily the value of number of room left, but the value of the number of room requested.
-   @MinLOS: Minimum length of stay if this product wants to be booked. This value is only returned in the first rate change occurrence as it is associated to the product covering the global period of stay.
-   @MaxLOS: Maximum length of stay if this product wants to be booked. This value is only returned in the first rate change occurrence as it is associated to the product covering the global period of stay.
-   @RateSource: Information returned to identify if the rate returned is the best available rate on the specific provider returning this rate.

In the element inside Rates the amount are returned under the mandatory Base element. Here are the detailed information linked to the Base element

-   @AmountBeforeTax: Amount of the rate change period before tax. Note: If the provider is not defining if the amount is before or after tax, the information which is returned to the client by Amadeus is AmountBeforeTax.
-   @AmountAfterTax: Amount of the rate change period after tax are applied
-   @CurrencyCode: Currency of the amount returned.

Rate Changes Room X:

-   The amount is always on a daily basis, and this amount is the same for the period of the rate change described
-   There can be an Amount Before Tax, After Tax or both of them,
-   Those amounts are for the right number of person in the room (if user request for 1 adult and 2 children it’s the price for this occupancy)
-   Those amounts are for one occurrence of Room X (which can be requested n times)
-   The amount don’t take into consideration services

**OTA\_HotelAvailRS/RoomStays/RoomStay/RoomRates/RoomRate/Rates**

6

Rates

1

Rate change list

  

7

Rate

1..n

  

  

  

@EffectiveDate

0..1

Start date of the rate change period

Date

  

@ExpireDate

0..1

End date of the rate change period

Date

  

@RateTimeUnit

0..1

Pricing frequency unit:Year, Month, Week, Day - default value is "Day"  

TimeUnitType

  

@NumberOfUnits

0..1

Used to indicate availability counters

Integer

  

@MinLOS

0..1

Minimum length of stay / Only given on the 1st occurrence of the rate change

nonNegativeInteger

  

@MaxLOS

0..1

Maximum length of stay / Only given on the 1st occurrence of the rate change

nonNegativeInteger

8

RateDescription

0..1

  

  

  

Text

1

Description of the rate

  

  

@Language

0..1

  

  

**OTA\_HotelAvailRS/RoomStays/RoomStay/RoomRates/RoomRate/Rates/Rate/Base**

8

Base

1..2

  

  

  

@AmountBeforeTaxes

0..1

Amount before taxes. At least AmountBeforeTax or AmountAfterTax is compulsory, but both can not be sent at the same time.

Money

  

@AmountAfterTaxes

0..1

Amount after taxes At least AmountBeforeTax or AmountAfterTax is compulsory, but both can not be sent at the same time.

Money

  

@CurrencyCode

1

Currency code. Should be ISO 4217

AlphaLength 3

## 3.17.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Rates> <!-- First rate change containing also the min/max LOS --> <Rate CachedIndicator="true" EffectiveDate="2011-06-27" ExpireDate="2011-06-28" MaxLOS="3" MinLOS="1" NumberOfUnits="1" RateMode="3" RateSource="0" RateTimeUnit="Day" UnitMultiplier="1"> <Base AmountAfterTax="80.00" AmountBeforeTax="71.00" CurrencyCode="EUR"> </Rate> <!-- Second rate change --> <Rate CachedIndicator="true" EffectiveDate="2011-06-28" ExpireDate="2011-06-30" NumberOfUnits="1" RateMode="3" RateSource="0" RateTimeUnit="Day" UnitMultiplier="1"> <Base AmountAfterTax="82.00" AmountBeforeTax="72.00" CurrencyCode="EUR"> </Rate> <!-- Last rate change --> <Rate CachedIndicator="true" EffectiveDate="2011-06-30" ExpireDate="2011-07-01" NumberOfUnits="1" RateMode="3" RateSource="0" RateTimeUnit="Day" UnitMultiplier="1"> <Base AmountAfterTax="84.00" AmountBeforeTax="73.00" CurrencyCode="EUR"> </Rate> </Rates>

* * *

## 3.18 Sub Structure: Rate info

## 3.18.1 Description

The basic rate information returned are the

-   Room Type Code
-   Rate Plan Code
-   Rate Plan Category
-   Rate Plan Description
-   Rate Plan Name
-   Booking Code

A first set of structured Rate Plan information can be found under the OTA XML message in the following element: OTA\_HotelAvailRS/RoomStays/RoomStay/RatePlans. The aim of this element is to list all the different rates that are attached to the room stay. If there is only one product returned, then only one rate plan will be returned. In case of packages where several products are attached to one roomstay, several rate plans could be returned. The different informations that can be received are:

-   @RatePlanCode: Amadeus rate plan code identification.
-   @RateIndicator: There are 2 different possible values:
    
    -   AvailableForSale: The rate plan (or at least one rate plan pertaining to the rate category) is sold at the hotel and accessible to the customer.
    
    -   NoAvailability: The rate plan (or rate category) is not sold at the hotel.
    -   Restricted: The rate plan (or at least one rate plan pertaining to the rate category) is sold at the hotel but the rate plan (or all rate plans pertaining to the rate category and sold at the hotel) is (are) not accessible to the customer.
    -   ChangeDuringStay: The rate plan returned contains one or several rate changes. At Pricing time, if this value is returned then several rate changes are returned in the roomrate element.

-   @RatePlanType: Amadeus rate plan type identification through the OTA category RPT.
-   @RatePlanName: Freeflow text defining the name of the rate plan.
-   @AvailabilityStatus: This indicator provides a status regarding the availability of the rate. There are 2 different possible values:
    
    -   OtherAvailable: The rate plan (or all rate plans pertaining to the rate category) is (are) not currently available at the hotel.
    
    -   AvailableForSale: The rate plan (or at least one rate plan pertaining to the rate category) is currently available at the hotel.
    -   OnRequest: The rate plan (or at least one rate plan pertaining to the rate category) is On-Request at the hotel
-   @PriceViewableInd: When value is set to true it indicates that the rate is confidential.
-   @PrepaidIndicator: Defines if the rate is prepaid or not. When value returned is True the rate is prepaid, when the value returned is False the rate is not prepaid. Process description associated to this field.
    -   This value is returned regardless of the flow made (multisource, distribution, leisure)
    -   If the information is not returned by a provider (which is the case in distribution as all rates are non prepaid) no value will be returned
    -   For DH and TV if the information is not returned the rate will be considered as prepaid (enhancement to come for TV which will be able to return non prepaid rates)
    -   For HV, if the information is not returned no value will be returned

Note 1: PriceViewableInd is an information not returned by Aggregators. In terms of room description, the informations are located in the xml element OTA\_HotelAvailRS/RoomStays/RoomStay/RoomRates/RoomRate/. The different informations that can be received are:

-   @BookingCode: Identifier of the product. There are 2 exceptions for this; it is DH and TV chain for which the field can be more than 7 characters.
-   @RoomTypeCode: Identifier of the room used based on 3 characters.
-   @InvBlockcode: Defines the hold id of the room in question, for Leisure/MultiSource
-   @NumberOfUnit: Number of room requested (associated to the roomrate returned). If the value is 2, it means that at least 2 rooms of this type where requested and the response will reflect the requested value.
-   @RatePlanType: Amadeus rate plan type identification through the OTA category RPT.
-   @RatePlanCode: Amadeus rate plan code identification.
-   @RatePlanCategory: This attribute contains the rate code family grouping various rate plan codes  
    belonging to the same family. "@RatePlanCategory="Converted:XXX:Y"  is returned If the rate code family "XXX" is associated to provider's rate. "Y" is Rate type, which can be:  
    -   P: Public rate
    -    C: Conditional rate
    -   N: Negotiated.

Converted:" is added as indicator showing that the family rate and rate type comes from Amadeus and no from provider.

-   @RatePlanID: Corporate discount number of the product if any.
-   @AvailabilityStatus: This is to identify the status of the product. The system returns only AvailableForSale products or OnRequest products. Closed products can’t be returned individually, it’s only the global property which can be returned as closed (not through this indicator).

**OTA\_HotelAvailRS/RoomStays/RoomStay/RatePlans**

4

RatePlans

1

  

  

5

RatePlan

1

  

  

  

@RatePlanCode

1

Rate plan code

StringLength 3

  

@RateIndicator

0..1

Set to "AvailableForSale" the rate is sold at the hotel (independent from the availability).

Enumeration:

AvailableForSale

  

@RatePlanID

0..1

Corporate discount number

StringLength 1-64

  

@RatePlanName

0..1

Rate plan name

StringLength 1-64

  

@AvailabilityStatus

0..1

Set to "AvailableForSale", the rate is available for sale at the hotel

Set to "OnRequest", the rate is On-Request

Enumeration:

AvailableForSale

OnRequest

  

@PriceViewableInd

0..1

True to indicate that the rate plan is confidential

Boolean

  

@PrepaidIndicator

0..1

When true indicates the rate is prepaid. When False the rate is not prepaid.

Boolean

**OTA\_HotelAvailRS/RoomStays/RoomStay/RatePlans/RatePlan/RatePlanDescription**

6

RatePlanDescription

0..1

  

  

7

Text

1

Description of the rate plan

Formatted Text Type

  

@Formatted

1

Always set to true

Boolean

  

@Language

0..1

language of the free flow text

  

**OTA\_HotelAvailRS/RoomStays/RoomStay/RoomRates/RoomRate**

5

RoomRate

1..n

  

  

 

@BookingCode

0..1

Booking code: internal identifier of the rate plan product pair = ProductCode-RatePlanCode

StringLength 16

 

@RoomTypeCode

1

Product code Default Value = “ROH”

StringLength 3

  

@InvBlockCode

1

Defines the hold id of the room in question

  

  

@RatePlanCode

1

Rate plan code

AlphaNumericLength 3

@RatePlanCategory

0..1

"Converted:XXX:Y"  is returned If the rate code family "XXX" is associated to provider's rate. "Y" is Rate type, which can be: P: Public rate, C: Conditional rate, N: Negotiated.  
Converted:" is added as indicator showing that the family rate and rate type comes from Amadeus and  
no from provider.

AlphaNumericLength 64  

  

@RatePlanID

0..1

Corporate discount number

StringLength 1-64

  

@AvailabilityStatus

1

Set to "AvailableForSale" by default Set to "On-Request" if the rate is On-request

Rate Indicator Type

**OTA\_HotelAvailRS/RoomStays/RoomStay/RoomRates/RoomRate/RoomRateDescription**

6

RoomRateDescription

0..1

Room and rate description

  

  

@Name

0..1

Name of the room

StringLength 1-64

  

@CreatorID

0..1

Room identification. Mandatory when multiple non identical rooms are requested.  
In link with the request made with element RoomID  
  
Also for Distrib in case of MultiSource

  

7

Text

1

Description of the room

Formatted Text Type

## 3.18.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<RatePlan AvailabilityStatus="AvailableForSale" PriceViewableInd="false" QualificationType="1" RateIndicator="AvailableForSale" RatePlanCode="GO1" RatePlanName="Rate governmental 1" RatePlanType="8"> <!-- Rate plan description with freeflow text --> <RatePlanDescription> <Text Formatted="true">This is a rate plan description</Text> </RatePlanDescription> </RatePlan> <RoomRates> <RoomRate AvailabilityStatus="AvailableForSale" BookingCode="IA00001" NumberOfUnits="1" RatePlanCategory="Converted:GOV:C" RatePlanCode="GO1" RoomTypeCode="A1K"> <Rates> <Rate EffectiveDate="2016-07-18" ExpireDate="2016-07-20" MaxLOS="0" MinLOS="1" RateTimeUnit="Day"> <Base AmountAfterTax="123.25" CurrencyCode="USD"> <PaymentPolicies> <GuaranteePayment GuaranteeType="GuaranteeRequired" PaymentCode="31"> <Description Name="guarantee"> <Text>VI AX CA</Text> </Description> </GuaranteePayment> <GuaranteePayment PaymentCode="8"> <Description Name="deposit"> <Text>A DEPOSIT IS NOT REQUIRED</Text> </Description> </GuaranteePayment> </PaymentPolicies> </Rate> </Rates> <RoomRateDescription> <Text>Daily Rate-Excl Vat- Roo nly</Text> <Text>GOVERNMENT RATE / MILTARY </Text> </RoomRateDescription> <Total AmountAfterTax="246.50" AmountBeforeTax="246.00" CurrencyCode="USD"> <Taxes> <Tax Amount="790.22" ChargeUnit="18" Code="36" CurrencyCode="USD" Type="Inclusive"> <TaxDescription> <Text Formatted="1"> ROOM STATE TAX 11.9 PCT ROOM CITY TAX 4.5 PCT</Text> </TaxDescription> </Tax> </Taxes> </Total> </RoomRate> </RoomRates>

* * *

## 3.19 Sub Structure: Room Information

## 3.19.1 Description

Structured room type details for each room within a RoomStay can be found in the element:  
OTA\_HotelAvailRS/RoomStays/RoomStay/RoomTypes/RoomType  
• @IsConverted: Indicates the provider room type is converted to Amadeus standard when true  
• @RoomTypeCode: Room type returned by the provider  
• @RoomType: Room type converted to Amadeus standard

**Conversion of the room type:** 

In order to support our web services customers with an easier way to identify and manage room types, a parsing logic is applied on the room description supplied by the Hotel Providers which converts key words (or a combination of key words) detected in the description to a new standard Room Type Code. The information provided according to this automated conversion is only for informative purposes; therefore, Amadeus shall not be liable for any possible error.

  
Taking into account the fact that all Hotel Providers have their own way to describe a room, Amadeus aims with this development to give webservices customers the tools they need to manage hotel room types. The parsing methodology provides good results when a hotel provider uses a consistent number of key words. In some instances, however, the parsing is not possible when no key word is found; therefore, an asterisk “\*” is shipped in the response.

  
The Amadeus Room Type (1A Standard) is made of 3 alphanumeric characters that represent 3 different codes:  
• Room Category \[A-Z\]  
• Number of Beds \[1-9\]  
• Bed Type \[A-Z\]

  
See below for information on the Room category and Bed types tables:

**Room category**

**New code**

Accessible room

H

Budget room

I

Business room

B

Comfort room

G

Deluxe room

D

Duplex

X

Executive room

E

Concierge/Executive suite

C

Family room

F

Junior suite/Mini suite

S

Penthouse

P

Residential apartment

R

Standard

M

Studio

L

Superior

A

Villa

V

Unknown

\*

**Bed type**

**code**

Double

D

King size

K

Pull-out

P

Queen-size

Q

Single

S

Twin

T

Water bed

W

Bed type can vary

\*

## 3.19.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<RoomTypes> <RoomType IsConverted="1" RoomType="D1K" RoomTypeCode="XXX"></RoomType> </RoomTypes>

* * *

## 3.20 Sub Structure: Rooms with same Booking Code

## 3.20.1 Description

For users requesting multiple identical or non-identical rooms for the following aggregators;  
• Expedia Affiliate Networks (XD)  
• Amadeus Value Hotels (AD)  
the response received will allow the users to select rooms only with the same Booking code. The non-identical  
rooms are defined based on the guest count of the rooms requested. Once the list of rooms available are displayed to the user for selection, when the pricing request is made, the  
response received contains the room(s) with information regarding the guest. These details ensure that the booking is done properly.

## 3.20.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<OTA\_HotelAvailRS xmlns="http://www.opentravel.org/OTA/2003/05" EchoToken="Pricing" PrimaryLangID="en" Version="6.001" xsi:schemaLocation="http://www.opentravel.org/OTA/2003/05 OTA\_HotelAvailRS.xsd"> <Success></Success> <HotelStays> <HotelStay RoomStayRPH="0 1"> <BasicPropertyInfo AreaID="4" ChainCode="XD" ChainName="EXPEDIA" HotelCityCode="PAR" HotelCode="XDPARCHP" HotelCodeContext="1A" HotelName="CITADINES APART'HOTEL SAINT-GERMAIN-DES-" SupplierIntegrationLevel="3"> <VendorMessages> <VendorMessage InfoType="5"> <SubSection> <Paragraph Name="URL"> <Text>https://developer.ean.com/terms/agent/en</Text> </Paragraph> <Paragraph Name="AcceptanceNeeded"> <Text>false</Text> </Paragraph> </SubSection> </VendorMessage> <VendorMessage InfoType="4"> <SubSection> <Paragraph Name="SI"> <Text Formatted="1">120</Text> </Paragraph> </SubSection> </VendorMessage> </VendorMessages> <Address> <CountryName Code="FR"></CountryName> </Address> <RelativePosition> <Transportations> <Transportation TransportationCode="20"></Transportation> </Transportations> </RelativePosition> </BasicPropertyInfo> </HotelStay> </HotelStays> <RoomStays> <RoomStay AvailabilityStatus="AvailableForSale" InfoSource="XD" IsAlternate="0" MarketCode="Flat.MultipleRoom.OnePerRoom" RPH="0" SourceOfBusiness="One Step.PricingOptional.PriceNotGuaranted.InvNotGuaranted"> <RoomTypes> <RoomType IsConverted="1" RoomType="R1Q" RoomTypeCode="ROH"></RoomType> </RoomTypes> <RatePlans> <RatePlan AvailabilityStatus="AvailableForSale" PrepaidIndicator="1" RateIndicator="AvailableForSale" RatePlanCode="PKG" RatePlanName="PublicRate"> <Guarantee GuaranteeCode="8" GuaranteeType="Deposit"></Guarantee> <CancelPenalties CancelPolicyIndicator="1"> <CancelPenalty PolicyCode="Cancellation"> <AmountPercent Amount="271.80" CurrencyCode="EUR"></AmountPercent> </CancelPenalty> </CancelPenalties> <Commission StatusType="Commissionable"> <CommissionPayableAmount Amount="24.66" CurrencyCode="EUR"></CommissionPayableAmount> </Commission> <MealsIncluded MealPlanCodes="14" MealPlanIndicator="1"></MealsIncluded> </RatePlan> </RatePlans> <RoomRates> <RoomRate AvailabilityStatus="AvailableForSale" BookingCode="00000001" InvBlockCode="8201239d-74c5-4507-b939-7be289535780-5180-024\*543.60\*68\*14" NumberOfUnits="1" RatePlanCode="PKG" RoomTypeCode="ROH"> <Rates> <Rate EffectiveDate="2018-10-31" ExpireDate="2018-11-01" NumberOfUnits="1" RateTimeUnit="Day"> <Base AmountBeforeTax="135.90" AmountIncludingMarkup="163.08" CurrencyCode="EUR" RateOverrideIndicator="1"> <TPA\_Extensions> <MarkupDetails Amount="27.18" CurrencyCode="EUR"></MarkupDetails> </TPA\_Extensions> </Base> <PaymentPolicies> <GuaranteePayment GuaranteeType="Deposit" PaymentCode="8"> <AcceptedPayments> <AcceptedPayment> <PaymentCard Remark="CreditLine"></PaymentCard> </AcceptedPayment> </AcceptedPayments> </GuaranteePayment> </PaymentPolicies> </Rate> </Rates> <RoomRateDescription CreatorID="1" Name="Room ROH"> <Text Formatted="1">Apartment, 1 Bedroom</Text> <Text Formatted="1">1 queen and 1 sofa bed</Text> <Text Formatted="1">Non Refundable</Text> <Text Formatted="1">Smart deal: You save 10.0%</Text> <Text Formatted="1">\\xe2\\x9c\\x94 Book now and save</Text> <Text Formatted="1"> Check-in <p> <b>Fees</b> <br> <p>The following fees and deposits are charged by the property at time of service, check-in, or check-out. </p> <ul> <li>Fee for continental breakfast: EUR 16 for adults and EUR 8 for children (approximately)</li> <li>Self parking fee: EUR 35 per day</li> <li>Pet fee: EUR 10 per pet, per night</li> <li>Cleaning/housekeeping/linens fee: EUR 17-35, varies per unit size</li> <li>Crib (infant bed) fee: EUR 30.0 per stay</li> </ul> <p>The above list may not be comprehensive. Fees and deposits may not include tax and are subject to change. </p> </p> <p> <b>Mandatory Fees and Taxes</b> <br> <p>You'll be asked to pay the following charges at the property:</p> <ul> <li>A tax is imposed by the city: EUR 2.53 per person, per night. This tax does not apply to children under 18 years of age. </li> </ul> <p>We have included all charges provided to us by the property. However, charges can vary, for example, based on length of stay or the room you book. </p> </p> </Text> <Text Formatted="1">Free Wireless Internet</Text> </RoomRateDescription> <Total AmountAfterTax="271.80" AmountBeforeTax="271.80" AmountIncludingMarkup="298.98" CurrencyCode="EUR" RateOverrideIndicator="1"> <TPA\_Extensions> <MarkupDetails Amount="27.18" CurrencyCode="EUR"></MarkupDetails> </TPA\_Extensions> </Total> <GuestCounts> <GuestCount AgeQualifyingCode="10" Count="1"></GuestCount> </GuestCounts> </RoomRate> </RoomRates> <TimeSpan End="2018-11-01" Start="2018-10-31"> <StartDateWindow DOW="Wed"></StartDateWindow> <EndDateWindow DOW="Thu"></EndDateWindow> </TimeSpan> <Total AmountAfterTax="271.80" AmountIncludingMarkup="298.98" CurrencyCode="EUR" RateOverrideIndicator="1"> <TPA\_Extensions> <MarkupDetails Amount="27.18" CurrencyCode="EUR"></MarkupDetails> </TPA\_Extensions> </Total> <ServiceRPHs> <ServiceRPH RPH="0"></ServiceRPH> </ServiceRPHs> </RoomStay> <RoomStay AvailabilityStatus="AvailableForSale" InfoSource="XD" IsAlternate="0" MarketCode="Flat.MultipleRoom.OnePerRoom" RPH="1" SourceOfBusiness="One Step.PricingOptional.PriceNotGuaranted.InvNotGuaranted"> <RoomTypes> <RoomType IsConverted="1" RoomType="R1Q" RoomTypeCode="ROH"></RoomType> </RoomTypes> <RatePlans> <RatePlan AvailabilityStatus="AvailableForSale" PrepaidIndicator="1" RateIndicator="AvailableForSale" RatePlanCode="PKG" RatePlanName="PublicRate"> <Guarantee GuaranteeCode="8" GuaranteeType="Deposit"></Guarantee> <CancelPenalties CancelPolicyIndicator="1"> <CancelPenalty PolicyCode="Cancellation"> <AmountPercent Amount="271.80" CurrencyCode="EUR"></AmountPercent> </CancelPenalty> </CancelPenalties> <Commission StatusType="Commissionable"> <CommissionPayableAmount Amount="24.66" CurrencyCode="EUR"></CommissionPayableAmount> </Commission> <MealsIncluded MealPlanCodes="14" MealPlanIndicator="1"></MealsIncluded> </RatePlan> </RatePlans> <RoomRates> <RoomRate AvailabilityStatus="AvailableForSale" BookingCode="00000001" InvBlockCode="8201239d-74c5-4507-b939-7be289535780-5180-024\*543.60\*68\*14" NumberOfUnits="1" RatePlanCode="PKG" RoomTypeCode="ROH"> <Rates> <Rate EffectiveDate="2018-10-31" ExpireDate="2018-11-01" NumberOfUnits="1" RateTimeUnit="Day"> <Base AmountBeforeTax="135.90" AmountIncludingMarkup="163.08" CurrencyCode="EUR" RateOverrideIndicator="1"> <TPA\_Extensions> <MarkupDetails Amount="27.18" CurrencyCode="EUR"></MarkupDetails> </TPA\_Extensions> </Base> <PaymentPolicies> <GuaranteePayment GuaranteeType="Deposit" PaymentCode="8"> <AcceptedPayments> <AcceptedPayment> <PaymentCard Remark="CreditLine"></PaymentCard> </AcceptedPayment> </AcceptedPayments> </GuaranteePayment> </PaymentPolicies> </Rate> </Rates> <RoomRateDescription CreatorID="2" Name="Room ROH"> <Text Formatted="1">Apartment, 1 Bedroom</Text> <Text Formatted="1">1 queen and 1 sofa bed</Text> <Text Formatted="1">Non Refundable</Text> <Text Formatted="1">Smart deal: You save 10.0%</Text> <Text Formatted="1">\\xe2\\x9c\\x94 Book now and save</Text> <Text Formatted="1"> Check-in <p> <b>Fees</b> <br> <p>The following fees and deposits are charged by the property at time of service, check-in, or check-out. </p> <ul> <li>Fee for continental breakfast: EUR 16 for adults and EUR 8 for children (approximately)</li> <li>Self parking fee: EUR 35 per day</li> <li>Pet fee: EUR 10 per pet, per night</li> <li>Cleaning/housekeeping/linens fee: EUR 17-35, varies per unit size</li> <li>Crib (infant bed) fee: EUR 30.0 per stay</li> </ul> <p>The above list may not be comprehensive. Fees and deposits may not include tax and are subject to change. </p> </p> <p> <b>Mandatory Fees and Taxes</b> <br> <p>You'll be asked to pay the following charges at the property:</p> <ul> <li>A tax is imposed by the city: EUR 2.53 per person, per night. This tax does not apply to children under 18 years of age. </li> </ul> <p>We have included all charges provided to us by the property. However, charges can vary, for example, based on length of stay or the room you book. </p> </p> </Text> <Text Formatted="1">Free Wireless Internet</Text> </RoomRateDescription> <Total AmountAfterTax="271.80" AmountBeforeTax="271.80" AmountIncludingMarkup="298.98" CurrencyCode="EUR" RateOverrideIndicator="1"> <TPA\_Extensions> <MarkupDetails Amount="27.18" CurrencyCode="EUR"></MarkupDetails> </TPA\_Extensions> </Total> <GuestCounts> <GuestCount AgeQualifyingCode="10" Count="2"></GuestCount> </GuestCounts> </RoomRate> </RoomRates> <TimeSpan End="2018-11-01" Start="2018-10-31"> <StartDateWindow DOW="Wed"></StartDateWindow> <EndDateWindow DOW="Thu"></EndDateWindow> </TimeSpan> <Total AmountAfterTax="271.80" AmountIncludingMarkup="298.98" CurrencyCode="EUR" RateOverrideIndicator="1"> <TPA\_Extensions> <MarkupDetails Amount="27.18" CurrencyCode="EUR"></MarkupDetails> </TPA\_Extensions> </Total> <ServiceRPHs> <ServiceRPH RPH="1"></ServiceRPH> </ServiceRPHs> </RoomStay> </RoomStays> <Services> <Service ID="-" Inclusive="0" ServiceInventoryCode="9.ADT" ServiceRPH="0" Type="10"> <ServiceDetails> <Comments> <Comment> <Text>Taxes and Fees Payable at Hotel: EUR 12.65</Text> </Comment> </Comments> </ServiceDetails> </Service> <Service ID="-" Inclusive="0" ServiceInventoryCode="9.ADT" ServiceRPH="1" Type="10"> <ServiceDetails> <Comments> <Comment> <Text>Taxes and Fees Payable at Hotel: EUR 12.65</Text> </Comment> </Comments> </ServiceDetails> </Service> </Services> </OTA\_HotelAvailRS>

* * *

## 3.21 Sub Structure: Services

## 3.21.1 Description

The services can also be returned in the pricing response with their prices and their additional details

**OTA\_HotelAvailRS/RoomStays/RoomStay/ServiceRPHs**

4

ServiceRPHs

0..1

  

  

5

ServiceRPH

1..n

  

  

  

@RPH

1

Unique reference to a service

RPH Type

**OTA\_HotelAvailRS/Services**

2

Services

0..1

  

  

**OTA\_HotelAvailRS/Services/Service**

3

Service

1..n

  

  

  

@ServicePricingType

0..1

Per stay,  Per person,   Per use

Pricing Type

  

@ServiceRPH

1

ServiceRPH=RPH use to link the service to a RoomStay

RPH Type

  

@ServiceInventoryCode

1

Service code

StringLength 1-16

  

@Inclusive

1

The service is included or optional

Boolean

  

@Quantity

0..1

Used if the service is included. Example: 3 breakfast included

NumericLength 1

**OTA\_HotelAvailRS/Services/Service/Price**

4

Price

0..n

Rate change period

  

  

@EffectiveDate

1

Begin date of the rate change period

Date

  

@ExpireDate

1

End date of the rate change period

Date

  

@RateTimeUnit

1

Pricing frequency unit:Year, Month, Week, Day

TimeUnitType

  

@UnitMultiplier

1

Pricing frequency value

PositiveInteger

5

Base

1

only send for included product

  

  

@AmountBeforeTax

0..1

Service amount before taxes

Money

  

@AmountAfterTax

0..1

Service amount after taxes

Money

  

@CurrencyCode

1

Service amount currency code

AlphaLength 3

**OTA\_HotelAvailRS/Services/Service/ServiceDetails**

5

GuestCounts

0..1

  

  

6

GuestCount

1

  

  

  

@AgeQualifyingCode

1

For Adult, code is 10. For children, code is 8.

OTA\_CodeType AQC

  

@Count

1

Occupancy for the adult guests, maximum is 9

Numeric1to999

**OTA\_HotelAvailRS/Services/Service/ServiceDetails**

5

TimeSpan

0..1

  

  

  

@Start

1

Stay begin date

DateOrTimeOrDateTimeType

  

@End

1

Stay end date

DateOrTimeOrDateTimeType

**OTA\_HotelAvailRS/Services/Service/ServiceDetails**

5

Comments

1

  

  

6

Comment

1

  

  

  

@Name

1

Service name

StringLength 1-64

7

Text

1

Service description

  

  

@Formatted

1

Textual Information

Boolean

  

@Language

0..1

  

  

5

Total

0..1

  

  

  

@AmountBeforeTax

0..1

Amount before taxes.

Money

  

@AmountAfterTax

0..1

At least AmountBeforeTax or AmountAfterTax is compulsory, but both can not be sent at the same time.

Money

  

@CurrencyCode

1

At least AmountBeforeTax or AmountAfterTax is compulsory, but both can not be sent at the same time.

AlphaLength 3

## 3.21.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<OTA\_HotelAvailRS> <!--...--> <RoomStays> <RoomStay AvailabilityStatus="AvailableForSale" InfoSource="HY" RPH="0" SourceOfBusiness="Two Step"> > <RatePlans> <RatePlan AvailabilityStatus="AvailableForSale" RateIndicator="AvailableForSale" RatePlanCode="\*\*\*"> <!--...--> <MealsIncluded MealPlanCodes="10" MealPlanIndicator="1"></MealsIncluded> </RatePlan> </RatePlans> <RoomRates> <RoomRate AvailabilityStatus="AvailableForSale" BookingCode="DNKRACK" NumberOfUnits="1" RatePlanCode="\*\*\*" RoomTypeCode="ROH"> <!--...--> <ServiceRPHs> <ServiceRPH RPH="0"></ServiceRPH> </ServiceRPHs> </RoomRate> </RoomRates> <!--...--> </RoomStay> </RoomStays> <Services> <Service Inclusive="1" ServiceInventoryCode="162.HAC" ServicePricingType="Per stay" ServiceRPH="0"></Service> </Services> </OTA\_HotelAvailRS>

* * *

## 3.22 Sub Structure: Terms and Conditions Information

## 3.22.1 Description

**Specific for Leisure**:in case of Leisure content the Terms &Conditions information is returned, including the following attributes:

-   Terms &Conditions URL
-   Flag, which indicates if approval for each booking is needed

If the Terms &Conditions URL is not available the below described element (VendorMessage for T&C) is not returned.

Remark: The special characters in the URL are escaped.

**VendorMessages/VendorMessage**

            @Title: value “TC”

            @InfoType: value “Other”

            **SubSection/Paragraph**

                        @Name: value “URL”

                        Text: Contains the URL for “Terms &Conditions”

            **SubSection/Paragraph**

                        @Name: value “AcceptanceNeeded” indicates if the terms and conditions must be       accepted.

                        Text: value “false/True”

## 3.22.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<VendorMessages> <VendorMessage InfoType="5"> <SubSection> <Paragraph Name="URL"> <Text> http://staging.transhotel.com/TOR/jsp/home/accesoDirectoCondGenerales.jsf?idiomaAD=EN\\&empresaAD=1\\&productoAD=1\\&paisAD=FR</Text> </Paragraph> <Paragraph Name="AcceptanceNeeded"> <Text> true</Text> </Paragraph> </SubSection> </VendorMessage> </VendorMessages>

* * *

## 3.23 Sub Structure: Total rate

## 3.23.1 Description

The total rate returned in the pricing is always for one room, even if several rooms have been requested. It can be tax included or not and is located in the OTA XML message in OTA\_HotelAvailRS/RoomStays/RoomStay/RoomRates/RoomRate/Total

**OTA\_HotelAvailRS/RoomStays/RoomStay/RoomRates/RoomRate/Total**

6

Total

0..1

Total amount of the number of rooms of the room rate

  

  

@AmountBeforeTax

0..1

Total amount of the room taxes excluded At least AmountBeforeTax or AmountAfterTax is compulsory, but both can not be sent at the same time.

Money

  

@AmountAfterTax

0..1

Total Amount of the room taxes included. At least AmountBeforeTax or AmountAfterTax is compulsory, but both can not be sent at the same time.

Money

  

@CurrencyCode

1

Amount currency code. Should be ISO 4217

AlphaLength 3

  

@AdditionalFeesExcludedIndicator

0..1

When true, amounts do not contain additional fees or charges

Boolean

In terms of taxes, 3 cases can appear:

-   Tax included: @AmountAfterTax is filled in
-   Tax excluded: @AmountBeforeTax is filled with @AdditionalFeesExcludedIndicator set to true
-   Tax unknown: @AmountBeforeTax value is filled in

In case of Multiple identical room requested, the Total at Rate level can also be present in the response:

**OTA\_HotelAvailRS/RoomStays/RoomStay/RoomRates/RoomRate/Rates/Rate/Total**

8

Total

0..1

Total amount of 1 room. Sent only if several rooms are requested in the room rate

  

  

@AmountBeforeTax

0..1

Total amount of the room taxes excluded At least AmountBeforeTax or AmountAfterTax is compulsory, but both can not be sent at the same time.

Money

  

@AmountAfterTax

0..1

Total Amount of the room taxes included. At least AmountBeforeTax or AmountAfterTax is compulsory, but both can not be sent at the same time.

Money

  

@CurrencyCode

1

Amount currency code. Should be ISO 4217

AlphaLength 3

  

@AdditionalFeesExcludedIndicator

0..1

When true, amounts do not contain additional fees or charges

Boolean

## 3.23.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<RoomRates> <RoomRate EffectiveDate="2011-06-01" ExpireDate="2011-06-02" RateTimeUnit="Day"> <Total AdditionalFeesExcludedIndicator="true" AmountBeforeTax="220.00" CurrencyCode="EUR"> </Total> </RoomRate> </RoomRates>

* * *

## 3.24 Sub Structure: Total Rate incl/extra/known taxes

## 3.24.1 Description

This part is here to detail information on the taxes, inclusions and extras of this rate.It can be structured data or free flow text and can convey the following info for inclusions/Extras:

-   Inclusion/Extra Type: Tax, Service, Fee, Surcharge, Inclusion, Meal, Extra Occupant, Extra bedding, Extra, Miscellaneous
-   Amount or percentage
-   Dates
-   Per person or per room
-   Per night or per stay
-   Included
-   Free flow text

The Taxes can convey the following information:

-   Tax type: Inclusive or Exclusive
-   Tax code (OTA code FTT)
-   Percentage
-   Amount (Percent and amount are mutually exclusive)
-   Start and End date
-   Free flow description
-    Flag to indicate if this tax is part of the Total Pricing caluclation for “Total Pricing participant” chains.

The different tax/inclusions/extras can not be set in the same part of the XML message. The following diagram is explaining how the different categories are dispatched in the message, depending on the Total Pricing participant setting (All known taxes functionality).

**OTA\_HotelAvailRS/RoomStays/RoomStay/Total/Taxes**

\>

5

Taxes

0..1

If pushed

  

6

Tax

1..200

Amount of each tax

  

  

@Type

1

Indicates if the amount is inclusive or exclusive.

AmountDetermination Type

  

@Code

1

Always inclusive

OTA Code Type FTT

  

@Percent

0..1

Identifies the tax

Percentage

  

@Amount

0..1

Percent and amount are mutually exclusive

Money

  

@CurrencyCode

0..1

Flat amount

AlphaLength 3

  

@ChargeUnit

1

This is the unit for which the charge applies (e.g. room, person, seat). Refer to OTA Code List Change Type (CHG).

OTA Code Type CHG

7

TaxDescription

0..4

  

  

  

@Name

0..1

  

StringLength 1-64

  

@Language

0..1

  

  

8

Text

  

  

  

  

@Formatted

0..1

  

Boolean

  

@language

0..1

language of the commission free flow text

  

7

TaxDescription

0..1

  

  

  

@Name

0..1

  

StringLength 1-64

  

@Language

0..1

  

  

8

ListItem

0..1

  

  

  

@ListItem

0..1

Flag to indicate if this tax is part of the Total Pricing caluclation for “Total Pricing participant” chains. Set to “1” for true and “0” for false

Boolean

  

@Formatted

0..1

  

Boolean

**OTA\_HotelAvailRS/RoomStays/RoomStay/RoomRates/RoomRate/Total**

7

Taxes

0..1

 (if info pushed)

  

8

Tax

1..200

Amount of each tax

  

  

@Type

0..1

Indicates if the amount is inclusive or exclusive. Always inclusive

AmountDetermination Type

  

@Code

1

Identifies the tax

OTA Code Type FTT

  

@Percent

0..1

Percent and amount are mutually exclusive

Percentage

  

@Amount

0..1

Flat amount

Money

  

@CurrencyCode

0..1

Currency code (Mandatory when Amount is returned) Should be ISO 4217

AlphaLength 3

  

@ChargeUnit

1

This is the unit for which the charge applies (e.g. room, person, seat). Refer to OTA Code List Change Type (CHG).

OTA Code Type CHG

  

@EffectiveDate

0..1

Used in case the tax calculation method changes through the stay

Date

  

@ExpireDate

0..1

Used in case the tax calculation method changes through the stay.

Date

9

TaxDescription

0..1

  

  

  

@Name

0..1

  

StringLength 1-64

  

@language

0..1

  

  

10

Text

  

Description of tax

  

  

@language

 0..1

  

  

  

@Formatted

0..1

  

Boolean

9

TaxDescription

0..1

  

  

  

@Name

1

  

StringLength 1-64

  

@Language

0..1

  

  

10

ListItem

0..1

  

  

  

@ListItem

0..1

Flag to indicate if this tax is part of the Total Pricing caluclation for “Total Pricing participant” chains. Set to “0” for false or not returned

Boolean

  

@Formatted

0..1

  

Boolean

## 3.24.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Taxes> <Tax Type="Inclusive"> <TaxDescription Name="tax"> <ListItem ListItem="0"></ListItem> </TaxDescription> </Tax> </Taxes>

* * *

## 3.25 Sub Structure: TPA\_Extensions

## 3.25.1 Description

TPA Extensions are custom elements that are used to enhance the response and below you will find the possible custom elements described in detail.

**TPA Extensions**

OTA\_HotelAvailRS/RoomStays/RoomStay/TPA\_Extensions

**Recommended Selling Price**

This contains the recommended selling price (including taxes, commissions, margins, markup, total Fees and discounts) the reseller should sell to the traveller in order to maintain rate parity across all sale channels.

OTA\_HotelAvailRS/RoomStays/RoomStay/TPA\_Extensions/RecommendedSellingPrice

-   @AmountAfterTax: Recommended Selling Amount of the room
-   @CurrencyCode: Amount currency code (ISO 4217)

**Taxes**

To comply with the California low and allows a client application receiving the taxes payable at the hotel with a clear indicator on what will be paid now and what will be paid at hotel, all the taxes payable at the hotel not included in the price are sent by the hotelier in this element as follow:

OTA\_HotelAvailRS/RoomStays/RoomStay/TPA\_Extensions/Taxes

**Tax**

Up to 99 number of taxes not payable at the hotel could be sent by the hotelier in this element:

OTA\_HotelAvailRS/RoomStays/RoomStay/TPA\_Extensions/Taxes/Tax

This element provides information about the not payable taxes at the hotel such as,

-   @Code: contains the Code Identifier of the tax listed in OTA Code Type FTT.
-   @WhenCollected: indicates when the tax is collected. It has two possible values 

1.  On property (all taxes not included in total after taxes)
2.  At time of booking (all taxes included in total after taxes)

-   @Percent: Percentage of tax. Percent and amount are mutually exclusive.
-   @Amount: Amount of Tax - Percent and amount are mutually exclusive
-   @CurrencyCode: Currency code (ISO 4217).
-   @ChargeUnit: This is the unit for which the charge applies (e.g. room, person, seat). Refer to OTA Code ListChange Type (CHG)

**TaxDescription**

Freeflow description for the tax sent by the hotelier in this element as follow:.

OTA\_HotelAvailRS/RoomStays/RoomStay/TPA\_Extensions/Taxes/TaxDescription

This element provides information about the not payable taxes at the hotel such as,

-   @Name: Tax Name
-   /TaxDescription/Text
    -   @Formatted: to indicate if the text is formatted

Note: When the amount of the tax is not expressed in local currency the following disclaimer must be displayed to the user "**Taxes and/or property imposed fees will be collected by the property in local currency. Taxes and/or fees due at the property are based on current exchange rates, which may vary at the time of travel.**"

**TPA Extensions**

OTA\_HotelAvailRS/RoomStays/RoomStay/RoomRates/RoomRate/Rates/Rate/TPA\_Extensions

**Loyalty Program**

This contains the loyalty program applicability information that specifies whether loyalty related benefits from the provider are applicable to the given rate.

OTA\_HotelAvailRS/RoomStays/RoomStay/RoomRates/RoomRate/Rates/Rate/TPA\_Extensions/LoyaltyProgram

• @Applicable : Possible values are Y or N

## 3.25.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<OTA\_HotelAvailRS> <RoomStays> <RoomStay> <TPA\_Extensions> <!-- Recommended Selling Price--> <RecommendedSellingPrice AmountAfterTax="1638.16" CurrencyCode="USD"></RecommendedSellingPrice> <!-- Tax Transparency to convey additional taxes and fees payable at the hotel --> <Taxes> <Tax Amount="5.00" ChargeUnit="20" Code="17" CurrencyCode="EUR" WhenCollected="On property"> <TaxDescription> <Text>Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </Text> </TaxDescription> </Tax> <Tax> <TaxDescription> <Text>Tax/ Fee like Resort fee or any other taxes that are directly payable to the Hotel to city/government are not includes in the rate. </Text> </TaxDescription> </Tax> </Taxes> </TPA\_Extensions> </RoomStay> </RoomStays> </OTA\_HotelAvailRS>

* * *

## 4 Error Messages

The following Error Codes can be returned by our system:

**OTA Code**

**OTA Description**

3

No service on requested date

15

Invalid date

28

No more accommodation available

44

No under/over occupancy allowed

61

Invalid currency code

106

Too many rooms/units

107

Cannot book - too far in advance

108

Accommodation code not recognised

109

Cannot book - arrival too close

113

Mandatory booking details missing

116

Category of room/unit invalid

118

Booking status invalid

119

Too many people in room/unit

131

Room/unit type invalid

132

Room/unit type - no availability

136

Start date is invalid

137

Adult numbers/occupancy mismatch

142

Occupancy rules not fulfilled

161

Search criteria invalid

163

Payment type invalid

187

System currently unavailable

188

Transaction error - please report

191

System busy - please try later

195

Service restriction - security

204

Insufficient extra berths/beds

249

Invalid rate code

263

No rate could be found for the given information

320

Invalid value

321

Required field missing

322

No availability

360

Error entry code

361

Invalid hotel

362

Invalid number of nights

363

Invalid number of rooms

364

Error rate range

366

Error during processing, please retry

367

Invalid format

375

Hotel not active

377

Invalid - max number of nights exceeded

378

Invalid - max number of rooms exceeded

381

Invalid check-in date

382

Invalid check-out date

383

Invalid city code

392

Invalid hotel code

394

Invalid item

395

Invalid message text

400

Invalid property code

404

Invalid start/end date combination

407

Item too long

422

No active accommodation found

424

No hotels found which match this input

427

No rooms available for requested dates

437

Rate unavailable

450

Unable to process 

497

Authorization error

696

Unable to process this request-please call reservations

870

Mark-up engine not available - please retry or apply manual mark-up

Please note that additionally to the OTA error code, a "SCM" error code is returned in case of shopping flow context error in case of stateful flow.

This case happens when:

\- a pricing is performed in a session where no preliminary MultiSingleAvailability mono-property was performed (to initiate the context)

\- the information in carried in pricing request are not inline with the previous MultiSingleAvailability mono-property search (pricing another property, another dates, another occupancy, another quantity, ...)

## 4.1 Error Reply

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<OTA\_HotelAvailRS xmlns="http://www.opentravel.org/OTA/2003/05" EchoToken="Pricing" PrimaryLangID="EN" Version="6.001" xsi:schemaLocation="http://www.opentravel.org/OTA/2003/05 OTA\_HotelAvailRS.xsd"> <Errors> <Error Code="367" Status="1A" Type="1"></Error> </Errors> </OTA\_HotelAvailRS>

  

* * *

## 5 Operations

## 5.1 Operation: Example

This is section contains examples for a Pricing request and response.

## 5.1.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<OTA\_HotelAvailRQ xmlns="http://www.opentravel.org/OTA/2003/05" EchoToken="Pricing" PrimaryLangID="EN" RateRangeOnly="false" RequestedCurrency="EUR" SummaryOnly="false" Version="4.000" xsi:schemaLocation="http://www.opentravel.org/OTA/2003/05 P:\\HDP\\XMLSchemas\\OTA2011B\\OpenTravel2011B\_XML\\OTA\_HotelAvailRQ.xsd"> <AvailRequestSegments> <AvailRequestSegment> <HotelSearchCriteria> <Criterion ExactMatch="true"> <HotelRef ChainCode="WV" HotelCityCode="PAR" HotelCode="WVPAR887" HotelCodeContext="1A"></HotelRef> <StayDateRange End="2012-11-26" Start="2012-11-25"></StayDateRange> <RatePlanCandidates> <RatePlanCandidate RatePlanCode="RAC"></RatePlanCandidate> </RatePlanCandidates> <RoomStayCandidates> <RoomStayCandidate BookingCode="C1SCOR" Quantity="1"> <GuestCounts IsPerRoom="true"> <GuestCount AgeQualifyingCode="10" Count="1"></GuestCount> </GuestCounts> </RoomStayCandidate> </RoomStayCandidates> </Criterion> </HotelSearchCriteria> </AvailRequestSegment> </AvailRequestSegments> </OTA\_HotelAvailRQ>

## 5.1.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<OTA\_HotelAvailRS xmlns="http://www.opentravel.org/OTA/2003/05" EchoToken="Pricing" Version="6.001" xsi:schemaLocation="http://www.opentravel.org/OTA/2003/05 P:\\HDP\\XMLSchemas\\OTA2011B\\OpenTravel2011B\_XML\\OTA\_HotelAvailRS.xsd"> <Success></Success> <HotelStays> <HotelStay RoomStayRPH="0"> <BasicPropertyInfo AreaID="4" ChainCode="WV" ChainName="TRAVELCLICK" HotelCityCode="PAR" HotelCode="WVPAR887" HotelCodeContext="1A" HotelName="HOTEL CAMBON" SupplierIntegrationLevel="3"> <Address> <CountryName Code="FR"> </CountryName> </Address> <RelativePosition> <Transportations> <Transportation TransportationCode="20"></Transportation> </Transportations> </RelativePosition> </BasicPropertyInfo> </HotelStay> </HotelStays> <RoomStays> <RoomStay AvailabilityStatus="AvailableForSale" InfoSource="WV" IsAlternate="0" MarketCode="Flat.None.Unknown" RPH="0" SourceOfBusiness="Two Step.PricingOptional.PriceNotGuaranted.InvNotGuaranted"> <RatePlans> <RatePlan RateIndicator="AvailableForSale" RatePlanCode="COR"> <Guarantee GuaranteeCode="31" GuaranteeType="GuaranteeRequired"></Guarantee> <Guarantee GuaranteeCode="8"></Guarantee> <CancelPenalties> <CancelPenalty PolicyCode="Cancellation"> <PenaltyDescription> <Text> CANCELLATION WITHOUT CHARGE 72 HRS PRIOR TO ARRIVAL LATEST</Text> </PenaltyDescription> <PenaltyDescription> <Text> FRENCH TIME 2PM</Text> </PenaltyDescription> </CancelPenalty> </CancelPenalties> <RatePlanDescription> <Text> BUSINESS PACK BREAKFAST AND WIFI INCL</Text> <Text> BREAKFAST AND WIFI FREE</Text> <Text> BUSINESS CARD REQUIRED AT CHECKIN</Text> </RatePlanDescription> <Commission StatusType="Commissionable"> <Comment> <Text> Agency Commission10.0PCT</Text> </Comment> </Commission> <MealsIncluded MealPlanIndicator="1"></MealsIncluded> </RatePlan> </RatePlans> <RoomRates> <RoomRate BookingCode="C1SCOR" NumberOfUnits="1" RatePlanCode="COR" RoomTypeCode="C1S"> <Rates> <Rate EffectiveDate="2012-11-25" ExpireDate="2012-11-26" MaxLOS="0" MinLOS="0"> <Base AmountBeforeTax="205.00" CurrencyCode="EUR"> <PaymentPolicies> <GuaranteePayment GuaranteeType="GuaranteeRequired" PaymentCode="31"> <Description Name="guarantee"> <Text> GUAR CCS AX DC JC CA EC IK MC VI</Text> </Description> </GuaranteePayment> <GuaranteePayment PaymentCode="8"> <Description Name="deposit"> <Text> BOOKING</Text> <Text> ALL RESERVATIONS REQUIRE CREDIT CARD GUARANTEE DUE AT TIME OF</Text> </Description> </GuaranteePayment> </PaymentPolicies> </Rate> </Rates> <RoomRateDescription Name="Room ROH"> <Text Formatted="1"> SINGLE CLASSIC STD RM 1 DBL BED AC HIGH SPEED</Text> <Text Formatted="1"> INTERNET SATTV AC 12SQM</Text> </RoomRateDescription> <Total AmountBeforeTax="205.00" CurrencyCode="EUR"> <Taxes> <Tax Code="17" Type="Inclusive"></Tax> </Taxes> </Total> </RoomRate> </RoomRates> <GuestCounts> <GuestCount AgeQualifyingCode="10" Count="1"></GuestCount> </GuestCounts> <TimeSpan End="2012-11-26" Start="2012-11-25"> <StartDateWindow DOW="Sun"></StartDateWindow> <EndDateWindow DOW="Mon"></EndDateWindow> </TimeSpan> <Total AmountBeforeTax="205.00" CurrencyCode="EUR"></Total> <ServiceRPHs> <ServiceRPH RPH="0"></ServiceRPH> <ServiceRPH RPH="1"></ServiceRPH> <ServiceRPH RPH="2"></ServiceRPH> <ServiceRPH RPH="3"></ServiceRPH> </ServiceRPHs> </RoomStay> </RoomStays> <Services> <Service ID="-" Inclusive="0" ServiceInventoryCode="196.RMA" ServicePricingType="Per night" ServiceRPH="0" Type="10"> <Price> <Base AmountBeforeTax="0.00" CurrencyCode="EUR"> </Price> <ServiceDetails> <Total AmountBeforeTax="0.00" CurrencyCode="EUR"></Total> </ServiceDetails> </Service> <Service ID="-" Inclusive="0" ServiceInventoryCode="197.RMA" ServicePricingType="Per night" ServiceRPH="1" Type="10"> <Price> <Base AmountBeforeTax="0.00" CurrencyCode="EUR"> </Price> <ServiceDetails> <Total AmountBeforeTax="0.00" CurrencyCode="EUR"></Total> </ServiceDetails> </Service> <Service ID="-" Inclusive="1" ServiceInventoryCode="162.HAC" ServiceRPH="2" Type="10"> <ServiceDetails> <Comments> <Comment> <Text> Confirmable and Complimentary</Text> </Comment> </Comments> </ServiceDetails> </Service> <Service ID="-" Inclusive="1" ServiceRPH="3" Type="10"></Service> </Services> </OTA\_HotelAvailRS>

## 5.1.3 Possible Errors

* * *