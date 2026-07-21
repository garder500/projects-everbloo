---
url: "https://developers.amadeus.com/api-library/soap/functional-doc/2278/doc-read/5289?serviceVersion=15.1"
download_url: "https://developers.amadeus.com/PAS-EAS/api/download/comp/4d4ad2cb456c02633f463a055ab70584/5289/upload_8558019937536912464.html"
title: "HTML_UG_WBS_Fare_GetFareFamilyDescription_TFQFRQ_15.1_011"
source: "amadeus"
service_id: "2278"
service_name: "Fare_GetFareFamilyDescription"
version: "18.1"
document_id: "5289"
doc_version: "15.1"
doc_type: "User guide"
scraped_at: "2026-07-15T10:12:21.235Z"
---
# Function: Fare\_GetFareFamilyDescription

* * *

## 1 Overview

This service retrieves a structured description of up to 16 fare families, either as a follow-up to a pricing operation or as a standalone action.

## 1.1 Supported Operations

This service can be used in the following ways:

-   As a “follow-up” of a pricing operation (Fare\_PricePNRWithBookingClass or Fare\_PricePNRWithLowerFares or Fare\_PricePNRWithLowestFare).  After a pricing request, the service returns the description of one or more fare families returned by the pricing request.
-   As a “standalone” service, that is, without any previous pricing operation, or without any PNR.  The service returns the description of the requested fare families (fare family name, city pair, carrier and optionally the date).

## 1.2 Limitations

You cannot use this service to follow up any transactions other than PNR pricing transactions, such as the following:

-   PNR-less pricing transactions:  Fare\_InformativeBestPricingWithoutPNR and Fare\_InformativePricingWithoutPNR
-   All fare display services
-   Flex Pricer services

However, note that it is possible to extract fare family details from the response of any of these services and to use the data in input of a “standalone” Fare\_getFareFamilyDescription request.

Note that in "Standalone" mode, only 6 descriptions can be requested.

## 1.3 Unsupported Operations

none

## 1.4 Prerequisites

none

## 2 Building A Query

The Fare\_getFareFamilyDescription service is composed of the following elements:

-   **bookingDateInformation**:  This optional structure returns the fare family description as it was on a given date in the past.  For example, if on July 1 you want to know the fare family description that was applicable when you bought a ticket on March 1, you can enter the date of March 1 in this element.
-   **referenceInformation**:  This structure returns the description of fare families as a response to a PNR pricing query.  It corresponds to the “follow-up” use case where a pricing transaction has occurred. In referenceDetails, if type TST is selected, it cannot be combined with any other types (e.g. REC or FC), not other elements in the query (bookingDateInformation or standaloneDescriptionRequest)
-   **repricingIndicator**: This indicator is used to request the description of fare families present in the response of a PNR repricing query or requested in standalone use case. It corresponds to the “follow-up” use case where a repricing transaction has occurred and/or "standalone" use case or to the or to the Standardization option use case.
-   **documentInfo**: This indicator is used to provide the electronic ticket number in case of repricing standalone use case. It corresponds to the "standalone" repricing use case only and permit to communicate the original ticket number from which the original fare families will be retrieved.
-   **standaloneDescriptionRequest**:  This structure identifies the fare families for which the description is requested.  It corresponds to the “standalone” use case where no previous pricing entry is required, nor any PNR retrieved.

## 2.1 Sub Structure: bookingDateInformation

## 2.1.1 Description

This structure is used to enter the date in a "past date" fare family description request.  It contains the following:

-   year
-   month
-   day

Note that the "hour" and "minutes" elements are not used in the request, even though they are available.

The example below returns the fare family description that was filled on 20APR2013.

## 2.1.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<bookingDateInformation> <dateTime> <year>2013</year> <month>4</month> <day>20</day> </dateTime> </bookingDateInformation>

## 2.2 Sub Structure: documentInfo

## 2.2.1 Description

This indicator is used to request the description of fare families requested for pricing in the original electronic ticket in standalone use case. The element _number_ contains ticket number (1721234567890) and _type_ contains "T".

## 2.2.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<documentInfo> <documentDetails> <number>1720123456789</number> <type>T</type> </documentDetails> </documentInfo>

## 2.3 Sub Structure: referenceInformation

## 2.3.1 Description

This structure is used to request the description of fare families returned on a PNR pricing response.  You can specify a recommendation number (REC) or a fare component number (FC) in the request.  These numbers correspond to the recommendation numbers and fare component numbers present in the pricing response.

For example:  
PNR contains 4 segments  
PNR pricing returns:

-   Recommendation 1 = Fare family "ECO" for the fare component 1 (that corresponds to the first two segments) and "ECOPLUS" for the fare component 2 (that corresponds to the last two segments).
-   Recommendation 2 = Fare family "ECOPLUS" for the fare component 1 (that corresponds to the first two segments) and "ECOMAX" for the fare component 2 (that corresponds to the last two segments).

You want to get the description of:

-   "ECO" as first fare component of recommendation 1
-   "ECOPLUS" as second fare component of recommendation 1
-   "ECOMAX" as second fare component of recommendation 2

For an example, see the XML structure below.

Example of query with TST selection option:

<referenceInformation>

<referenceDetails>

<type>T</type>

<value>1</value>

</referenceDetails>

</referenceInformation>

## 2.3.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<referenceInformation> <referenceDetails> <type>REC</type> <value>1</value> </referenceDetails> <referenceDetails> <type>FC</type> <value>1</value> </referenceDetails> </referenceInformation> <referenceInformation> <referenceDetails> <type>REC</type> <value>1</value> </referenceDetails> <referenceDetails> <type>FC</type> <value>2</value> </referenceDetails> </referenceInformation> <referenceInformation> <referenceDetails> <type>REC</type> <value>2</value> </referenceDetails> <referenceDetails> <type>FC</type> <value>2</value> </referenceDetails> </referenceInformation>

## 2.4 Sub Structure: repricingIndicator

## 2.4.1 Description

This indicator is used to request the description of fare families present in the response of a PNR repricing query or requested in standalone use case. The element attibuteType contains "ATC" in case of re-pricing use case.

## 2.4.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<repricingIndicator> <attributeDetails> <attributeType>ATC</attributeType> </attributeDetails> </repricingIndicator>

## 2.5 Sub Structure: standaloneDescriptionRequest

## 2.5.1 Description

This structure is used to get the description of a given fare family without having done any pricing transaction or ignoring the result of a previous transaction.

It can be used to request the description of up to 6 fare families.

The structure is composed of the following:

-   fareInformation:  fareQualifier must be set to "FF" (fare family) and rateCategory must contain the fare family name.
-   itineraryInformation:  This is expressed as a city pair: origin and destination.
-   carrierInformation:  This specifies the carrier owner of the fare family in "otherCompany".
-   flightDateInformation:  This is the departure date.  Note that this field is not taken into account.  It is present in the message for future use (product evolution).

For example, to get the description for fare families "ECO" and "ECOMAX" published by carrier "6X" on a trip from PAR to LON, see the request below.

## 2.5.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<standaloneDescriptionRequest> <fareInformation> <discountDetails> <fareQualifier>FF</fareQualifier> <rateCategory>ECO</rateCategory> </discountDetails> </fareInformation> <itineraryInformation> <origin>PAR</origin> <destination>LON</destination> </itineraryInformation> <carrierInformation> <companyIdentification> <otherCompany>6X</otherCompany> </companyIdentification> </carrierInformation> </standaloneDescriptionRequest> <standaloneDescriptionRequest> <fareInformation> <discountDetails> <fareQualifier>FF</fareQualifier> <rateCategory>ECOMAX</rateCategory> </discountDetails> </fareInformation> <itineraryInformation> <origin>PAR</origin> <destination>LON</destination> </itineraryInformation> <carrierInformation> <companyIdentification> <otherCompany>6X</otherCompany> </companyIdentification> </carrierInformation> </standaloneDescriptionRequest>

## 3 Receiving A Reply

A response is composed of repetitions of the element "fareFamilyDescriptionGroup", with one instance per fare family description returned.

For each fare family, the response includes:

-   An ID in the referenceInformation ("1" for the first fare family returned, "2" for the next etc.)
-   The fare family name in the fareInformation/discountDetails/rateCategory element
-   P in the previousTicketIndicator related to fare families correspponding to the fare families requested for pricing in the original ticket. This indicator is not mandatory and is empty if fare families are coming only from current re-pricing entry (follow up use case) or standalone use case with an original ticket priced without fare family
-   The Market (city pair) in the fareInformation/itineraryInformation element
-   The carrier owner of the fare in the carrierInformation element
-   A general free-flow description in the freeFlowDescription element identified with **FFD** in **informationType** field
-   An extended free-flow description in the freeFlowDescription element identified with **FFT** in **informationType** field
-   A reference to external content: a Media reference in order to better promote the Fare Family by displaying attractive visual content (optional)

-   (optional)
-   A list of fee codes and description as repetitions of the element **ocFeeInformation**.
-   Each instance of the element includes:
    -   In the feeDescription element:
        -   The OC subcode in dataTypeInformation/type element
        -   An "Applicability" indicator ("included", "at charge" or "Not Offered") in dataInformation/indicator element
    -   In the serviceDetails element:
        -   The service type in ssrCode element
        -   The carrier owner of the service in the airlineCode element
        -   The service group in the serviceType element
        -   The service subgroup in the otherServiceType element
    -   In the feeFreeFlowDescription element: a free flow description of the fee
    -   In the externalReferenceInfo element: a Media reference in order to better promote the service by displaying attractive visual content (optional)
    -   Optionally, if the fee is "at charge", the amount can be returned in the ocFeeAmount element.

## 3.1 Sub Structure: Example

## 3.1.1 Description

## 3.1.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_getFareFamilyDescriptionReply> <fareFamilyDescriptionGroup> <referenceInformation> <itemNumberDetails> <number>1</number> </itemNumberDetails> </referenceInformation> <fareInformation> <discountDetails> <fareQualifier>FF</fareQualifier> <rateCategory>ECO</rateCategory> </discountDetails> </fareInformation> <previousTicketIndicator> <attributeDetails> <attributeType>P</attributeType> <attributeDescription></attributeDescription> </attributeDetails> </previousTicketIndicator> <carrierInformation> <companyIdentification> <otherCompany>AY</otherCompany> </companyIdentification> </carrierInformation> <freeFlowDescription> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <informationType>FFD</informationType> <source>S</source> <encoding>1</encoding> </freeTextDetails> <freeText>THIS IS ECO FARE FAMILY</freeText> </freeFlowDescription> <freeFlowDescription> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <informationType>FFT</informationType> <source>S</source> <encoding>1</encoding> </freeTextDetails> <freeText>MORE INFORMATION ABOUT ECO FARE FAMILY</freeText> </freeFlowDescription> <externalReferenceInfo> <referenceDetails> <type>M</type> <value>14AGDGJU</value> </referenceDetails> </externalReferenceInfo> <ocFeeInformation> <feeDescription> <dataTypeInformation> <type>REF</type> </dataTypeInformation> </feeDescription> <serviceDetails> <specialRequirementsInfo> <ssrCode>T</ssrCode> <airlineCode>6X</airlineCode> <serviceType>BK</serviceType> </specialRequirementsInfo> </serviceDetails> <feeFreeFlowDescription> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>S</source> <encoding>1</encoding> </freeTextDetails> <freeText>NON REFUNDABLE</freeText> </feeFreeFlowDescription> <externalReferenceInfo> <referenceDetails> <type>M</type> <value>60736397</value> </referenceDetails> </externalReferenceInfo> </ocFeeInformation> <ocFeeInformation> <feeDescription> <dataTypeInformation> <type>BAG</type> </dataTypeInformation> <dataInformation> <indicator>CHA</indicator> </dataInformation> </feeDescription> <serviceDetails> <specialRequirementsInfo> <ssrCode>C</ssrCode> <airlineCode>6X</airlineCode> <serviceType>BG</serviceType> </specialRequirementsInfo> </serviceDetails> <feeFreeFlowDescription> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>S</source> <encoding>1</encoding> </freeTextDetails> <freeText>BAG UP TO 20 KGY</freeText> </feeFreeFlowDescription> <ocFeeAmount> <monetaryDetails> <typeQualifier>707</typeQualifier> <amount>10</amount> <currency>EUR</currency> </monetaryDetails> </ocFeeAmount> </ocFeeInformation> </fareFamilyDescriptionGroup> <fareFamilyDescriptionGroup> <referenceInformation> <itemNumberDetails> <number>2</number> </itemNumberDetails> </referenceInformation> <fareInformation> <discountDetails> <fareQualifier>FF</fareQualifier> <rateCategory>ECOFLEX</rateCategory> </discountDetails> </fareInformation> <carrierInformation> <companyIdentification> <otherCompany>AY</otherCompany> </companyIdentification> </carrierInformation> <freeFlowDescription> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>S</source> <encoding>1</encoding> </freeTextDetails> <freeText>THIS IS ECOFLEX FARE FAMILY</freeText> </freeFlowDescription> <ocFeeInformation> <feeDescription> <dataTypeInformation> <type>REF</type> </dataTypeInformation> </feeDescription> <serviceDetails> <specialRequirementsInfo> <ssrCode>T</ssrCode> <airlineCode>6X</airlineCode> <serviceType>BK</serviceType> </specialRequirementsInfo> </serviceDetails> <feeFreeFlowDescription> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>S</source> <encoding>1</encoding> </freeTextDetails> <freeText>REFUNDABLE BEFORE DEPARTURE WITHOUT PENALTY</freeText> </feeFreeFlowDescription> </ocFeeInformation> <ocFeeInformation> <feeDescription> <dataTypeInformation> <type>BAG</type> </dataTypeInformation> <dataInformation> <indicator>CHA</indicator> </dataInformation> </feeDescription> <serviceDetails> <specialRequirementsInfo> <ssrCode>C</ssrCode> <airlineCode>6X</airlineCode> <serviceType>BG</serviceType> </specialRequirementsInfo> </serviceDetails> <feeFreeFlowDescription> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>S</source> <encoding>1</encoding> </freeTextDetails> <freeText>BAG UP TO 20 KG</freeText> </feeFreeFlowDescription> <ocFeeAmount> <monetaryDetails> <typeQualifier>707</typeQualifier> <amount>10</amount> <currency>EUR</currency> </monetaryDetails> </ocFeeAmount> </ocFeeInformation> </fareFamilyDescriptionGroup> </Fare\_getFareFamilyDescriptionReply>

* * *

## 4 Error Messages

If an invalid request is sent, the following error message is returned:

00477 - INVALID FORMAT

If Amadeus is not allowed to retrieve the E-TKT record, system errors:

21601 - ACCESS TO DOCUMENT DENIED

If the e-ticket cannot be retrieved, the system errors:

25701 - TICKET NOT FOUND

The list is not exhaustive: the system also forwards errors and warnings sent by other applications.

40268 - AIRLINE(S) NOT STANDARDIZED: XX, YY

When the Fare Family Standardization option is used, the EZTable TCH\_FF\_STANDARDIZATION\_AUTH is verified to confirm if the airline is configured as standardized. If the airline code is not present in the table, the warning message is returned.

## 4.1 Error Reply

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_GetFareFamilyDescriptionReply xmlns="http://xml.amadeus.com/TFQFRR\_15\_1\_1A"> <errorGroup> <errorOrWarningCodeDetails> <errorDetails> <errorCode>00477</errorCode> <errorCategory>EC</errorCategory> <errorCodeOwner>1A</errorCodeOwner> </errorDetails> </errorOrWarningCodeDetails> <errorWarningDescription> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>S</source> <encoding>1</encoding> </freeTextDetails> <freeText>INVALID FORMAT</freeText> </errorWarningDescription> </errorGroup> </Fare\_GetFareFamilyDescriptionReply>

  

* * *

## 5 Operations

## 5.1 Operation: Fare Family Standardization

In this case this option is used and the airline is standardized, the following fields are replaced by the values in the EZTable: fare family code, fare family, service group and service subgroup.

## 5.1.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<referenceInformation> <referenceDetails> <type>REC</type> <value>1</value> </referenceDetails> <referenceDetails> <type>FC</type> <value>1</value> </referenceDetails> </referenceInformation> <repricingIndicator> <attributeDetails> <attributeType>STD</attributeType> </attributeDetails> </repricingIndicator>

## 5.1.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.1.3 Possible Errors

See "Error Messages" section.

* * *

## 5.2 Operation: Follow-up Request

The following operation is an example of a follow-up request to a pricing transaction.

## 5.2.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_GetFareFamilyDescription xmlns="http://xml.amadeus.com/TFQFRQ\_15\_1\_1A"> <referenceInformation> <referenceDetails> <type>REC</type> <value>1</value> </referenceDetails> <referenceDetails> <type>FC</type> <value>1</value> </referenceDetails> </referenceInformation> <referenceInformation> <referenceDetails> <type>REC</type> <value>1</value> </referenceDetails> <referenceDetails> <type>FC</type> <value>2</value> </referenceDetails> </referenceInformation> </Fare\_GetFareFamilyDescription>

## 5.2.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_GetFareFamilyDescriptionReply xmlns="http://xml.amadeus.com/TFQFRR\_15\_1\_1A"> <fareFamilyDescriptionGroup> <referenceInformation> <itemNumberDetails> <number>1</number> </itemNumberDetails> </referenceInformation> <fareInformation> <discountDetails> <fareQualifier>FF</fareQualifier> <rateCategory>ECO</rateCategory> </discountDetails> </fareInformation> <carrierInformation> <companyIdentification> <otherCompany>AY</otherCompany> </companyIdentification> </carrierInformation> <freeFlowDescription> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <informationType>FFD</informationType> <source>S</source> <encoding>1</encoding> </freeTextDetails> <freeText>THIS IS ECO FARE FAMILY</freeText> </freeFlowDescription> <ocFeeInformation> <feeDescription> <dataTypeInformation> <type>REF</type> </dataTypeInformation> </feeDescription> <serviceDetails> <specialRequirementsInfo> <ssrCode>T</ssrCode> <airlineCode>6X</airlineCode> <serviceType>BK</serviceType> </specialRequirementsInfo> </serviceDetails> <feeFreeFlowDescription> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>S</source> <encoding>1</encoding> </freeTextDetails> <freeText>NON REFUNDABLE</freeText> </feeFreeFlowDescription> </ocFeeInformation> <ocFeeInformation> <feeDescription> <dataTypeInformation> <type>BAG</type> </dataTypeInformation> <dataInformation> <indicator>CHA</indicator> </dataInformation> </feeDescription> <serviceDetails> <specialRequirementsInfo> <ssrCode>C</ssrCode> <airlineCode>6X</airlineCode> <serviceType>BG</serviceType> </specialRequirementsInfo> </serviceDetails> <feeFreeFlowDescription> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>S</source> <encoding>1</encoding> </freeTextDetails> <freeText>BAG UP TO 20 KGY</freeText> </feeFreeFlowDescription> <ocFeeAmount> <monetaryDetails> <typeQualifier>707</typeQualifier> <amount>10</amount> <currency>EUR</currency> </monetaryDetails> </ocFeeAmount> </ocFeeInformation> </fareFamilyDescriptionGroup> <fareFamilyDescriptionGroup> <referenceInformation> <itemNumberDetails> <number>2</number> </itemNumberDetails> </referenceInformation> <fareInformation> <discountDetails> <fareQualifier>FF</fareQualifier> <rateCategory>ECOFLEX</rateCategory> </discountDetails> </fareInformation> <carrierInformation> <companyIdentification> <otherCompany>AY</otherCompany> </companyIdentification> </carrierInformation> <freeFlowDescription> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>S</source> <encoding>1</encoding> </freeTextDetails> <freeText>THIS IS ECOFLEX FARE FAMILY</freeText> </freeFlowDescription> <ocFeeInformation> <feeDescription> <dataTypeInformation> <type>REF</type> </dataTypeInformation> </feeDescription> <serviceDetails> <specialRequirementsInfo> <ssrCode>T</ssrCode> <airlineCode>6X</airlineCode> <serviceType>BK</serviceType> </specialRequirementsInfo> </serviceDetails> <feeFreeFlowDescription> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>S</source> <encoding>1</encoding> </freeTextDetails> <freeText>REFUNDABLE BEFORE DEPARTURE WITHOUT PENALTY</freeText> </feeFreeFlowDescription> </ocFeeInformation> <ocFeeInformation> <feeDescription> <dataTypeInformation> <type>BAG</type> </dataTypeInformation> <dataInformation> <indicator>CHA</indicator> </dataInformation> </feeDescription> <serviceDetails> <specialRequirementsInfo> <ssrCode>C</ssrCode> <airlineCode>6X</airlineCode> <serviceType>BG</serviceType> </specialRequirementsInfo> </serviceDetails> <feeFreeFlowDescription> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>S</source> <encoding>1</encoding> </freeTextDetails> <freeText>BAG UP TO 20 KG</freeText> </feeFreeFlowDescription> <ocFeeAmount> <monetaryDetails> <typeQualifier>707</typeQualifier> <amount>10</amount> <currency>EUR</currency> </monetaryDetails> </ocFeeAmount> </ocFeeInformation> </fareFamilyDescriptionGroup> </Fare\_GetFareFamilyDescriptionReply>

## 5.2.3 Possible Errors

See the "Error Messages" section.

* * *

## 5.3 Operation: Follow-up Request, re-pricing use case

The following operation is an example of a follow-up request to a re-pricing transaction.

Pricing details:

-   Original ticket contains 2 coupons with fare family "PRO" used for pricing.
-   PNR with new itinerary contains 4 segments.
-   PNR re-pricing returns 2 recommendations:
    -   Recommendation 1 = Fare family "ECO" for the fare component 1 (that corresponds to the 2 first segments) and "ECOFLEX" for the fare component 2 (that corresponds to the 2 last segments).
    -   Recommendation 2 = Fare family "ECOPLUS" for the fare component 1 (that corresponds to the 2 first segments) and "ECOMAX" for the fare component 2 (that corresponds to the 2 last segments).

User wants to get description of fare families used in original ticket pricing and both fare families of the recommendation 1.

## 5.3.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_GetFareFamilyDescription xmlns="http://xml.amadeus.com/TFQFRQ\_15\_1\_1A"> <referenceInformation> <referenceDetails> <type>REC</type> <value>1</value> </referenceDetails> <referenceDetails> <type>FC</type> <value>1</value> </referenceDetails> </referenceInformation> <referenceInformation> <referenceDetails> <type>REC</type> <value>1</value> </referenceDetails> <referenceDetails> <type>FC</type> <value>2</value> </referenceDetails> </referenceInformation> <repricingIndicator> <attributeDetails> <attributeType>ATC</attributeType> </attributeDetails> </repricingIndicator> </Fare\_GetFareFamilyDescription>

## 5.3.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_GetFareFamilyDescriptionReply xmlns="http://xml.amadeus.com/TFQFRR\_15\_1\_1A"> <fareFamilyDescriptionGroup> <referenceInformation> <itemNumberDetails> <number>1</number> </itemNumberDetails> </referenceInformation> <fareInformation> <discountDetails> <fareQualifier>FF</fareQualifier> <rateCategory>PRO</rateCategory> </discountDetails> </fareInformation> <previousTicketIndicator> <attributeDetails> <attributeType>P</attributeType> </attributeDetails> </previousTicketIndicator> <carrierInformation> <companyIdentification> <otherCompany>AY</otherCompany> </companyIdentification> </carrierInformation> <freeFlowDescription> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>S</source> <encoding>1</encoding> </freeTextDetails> <freeText>THIS IS PRO FARE FAMILY</freeText> </freeFlowDescription> <ocFeeInformation> <feeDescription> <dataTypeInformation> <type>REF</type> </dataTypeInformation> </feeDescription> <serviceDetails> <specialRequirementsInfo> <ssrCode>T</ssrCode> <airlineCode>6X</airlineCode> <serviceType>BK</serviceType> </specialRequirementsInfo> </serviceDetails> <feeFreeFlowDescription> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>S</source> <encoding>1</encoding> </freeTextDetails> <freeText>NON REFUNDABLE</freeText> </feeFreeFlowDescription> </ocFeeInformation> <ocFeeInformation> <feeDescription> <dataTypeInformation> <type>BAG</type> </dataTypeInformation> <dataInformation> <indicator>CHA</indicator> </dataInformation> </feeDescription> <serviceDetails> <specialRequirementsInfo> <ssrCode>C</ssrCode> <airlineCode>6X</airlineCode> <serviceType>BG</serviceType> </specialRequirementsInfo> </serviceDetails> <feeFreeFlowDescription> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>S</source> <encoding>1</encoding> </freeTextDetails> <freeText>BAG UP TO 20 KGY</freeText> </feeFreeFlowDescription> <ocFeeAmount> <monetaryDetails> <typeQualifier>707</typeQualifier> <amount>10</amount> <currency>EUR</currency> </monetaryDetails> </ocFeeAmount> </ocFeeInformation> </fareFamilyDescriptionGroup> <fareFamilyDescriptionGroup> <referenceInformation> <itemNumberDetails> <number>2</number> </itemNumberDetails> </referenceInformation> <fareInformation> <discountDetails> <fareQualifier>FF</fareQualifier> <rateCategory>ECO</rateCategory> </discountDetails> </fareInformation> <carrierInformation> <companyIdentification> <otherCompany>AY</otherCompany> </companyIdentification> </carrierInformation> <freeFlowDescription> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>S</source> <encoding>1</encoding> </freeTextDetails> <freeText>THIS IS ECO FARE FAMILY</freeText> </freeFlowDescription> <ocFeeInformation> <feeDescription> <dataTypeInformation> <type>REF</type> </dataTypeInformation> </feeDescription> <serviceDetails> <specialRequirementsInfo> <ssrCode>T</ssrCode> <airlineCode>6X</airlineCode> <serviceType>BK</serviceType> </specialRequirementsInfo> </serviceDetails> <feeFreeFlowDescription> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>S</source> <encoding>1</encoding> </freeTextDetails> <freeText>NON REFUNDABLE</freeText> </feeFreeFlowDescription> </ocFeeInformation> <ocFeeInformation> <feeDescription> <dataTypeInformation> <type>BAG</type> </dataTypeInformation> <dataInformation> <indicator>CHA</indicator> </dataInformation> </feeDescription> <serviceDetails> <specialRequirementsInfo> <ssrCode>C</ssrCode> <airlineCode>6X</airlineCode> <serviceType>BG</serviceType> </specialRequirementsInfo> </serviceDetails> <feeFreeFlowDescription> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>S</source> <encoding>1</encoding> </freeTextDetails> <freeText>BAG UP TO 20 KGY</freeText> </feeFreeFlowDescription> <ocFeeAmount> <monetaryDetails> <typeQualifier>707</typeQualifier> <amount>10</amount> <currency>EUR</currency> </monetaryDetails> </ocFeeAmount> </ocFeeInformation> </fareFamilyDescriptionGroup> <fareFamilyDescriptionGroup> <referenceInformation> <itemNumberDetails> <number>3</number> </itemNumberDetails> </referenceInformation> <fareInformation> <discountDetails> <fareQualifier>FF</fareQualifier> <rateCategory>ECOFLEX</rateCategory> </discountDetails> </fareInformation> <carrierInformation> <companyIdentification> <otherCompany>AY</otherCompany> </companyIdentification> </carrierInformation> <freeFlowDescription> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>S</source> <encoding>1</encoding> </freeTextDetails> <freeText>THIS IS ECOFLEX FARE FAMILY</freeText> </freeFlowDescription> <ocFeeInformation> <feeDescription> <dataTypeInformation> <type>REF</type> </dataTypeInformation> </feeDescription> <serviceDetails> <specialRequirementsInfo> <ssrCode>T</ssrCode> <airlineCode>6X</airlineCode> <serviceType>BK</serviceType> </specialRequirementsInfo> </serviceDetails> <feeFreeFlowDescription> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>S</source> <encoding>1</encoding> </freeTextDetails> <freeText>REFUNDABLE BEFORE DEPARTURE WITHOUT PENALTY</freeText> </feeFreeFlowDescription> </ocFeeInformation> <ocFeeInformation> <feeDescription> <dataTypeInformation> <type>BAG</type> </dataTypeInformation> <dataInformation> <indicator>CHA</indicator> </dataInformation> </feeDescription> <serviceDetails> <specialRequirementsInfo> <ssrCode>C</ssrCode> <airlineCode>6X</airlineCode> <serviceType>BG</serviceType> </specialRequirementsInfo> </serviceDetails> <feeFreeFlowDescription> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>S</source> <encoding>1</encoding> </freeTextDetails> <freeText>BAG UP TO 20 KG</freeText> </feeFreeFlowDescription> <ocFeeAmount> <monetaryDetails> <typeQualifier>707</typeQualifier> <amount>10</amount> <currency>EUR</currency> </monetaryDetails> </ocFeeAmount> </ocFeeInformation> </fareFamilyDescriptionGroup> </Fare\_GetFareFamilyDescriptionReply>

## 5.3.3 Possible Errors

See "Error Messages" section.

* * *

## 5.4 Operation: Standalone Request

The following operation is an example of requesting the fare family description based on fare family name, market (city pair) and carrier.  No previous PNR pricing has been done.

The operation does the following:

-   Check fare family description as it was filled on 20APR2013
-   First fare family = ECO for a trip from PAR to LON on a 6X flight
-   Second fare family = ECOFLEX for a trip from LON to PAR on a 6X flight

## 5.4.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_GetFareFamilyDescription xmlns="http://xml.amadeus.com/TFQFRQ\_15\_1\_1A"> <bookingDateInformation> <dateTime> <year>2013</year> <month>4</month> <day>20</day> </dateTime> </bookingDateInformation> <standaloneDescriptionRequest> <fareInformation> <discountDetails> <fareQualifier>FF</fareQualifier> <rateCategory>ECO</rateCategory> </discountDetails> </fareInformation> <itineraryInformation> <origin>PAR</origin> <destination>LON</destination> </itineraryInformation> <carrierInformation> <companyIdentification> <otherCompany>6X</otherCompany> </companyIdentification> </carrierInformation> </standaloneDescriptionRequest> <standaloneDescriptionRequest> <fareInformation> <discountDetails> <fareQualifier>FF</fareQualifier> <rateCategory>ECOFLEX</rateCategory> </discountDetails> </fareInformation> <itineraryInformation> <origin>LON</origin> <destination>PAR</destination> </itineraryInformation> <carrierInformation> <companyIdentification> <otherCompany>6X</otherCompany> </companyIdentification> </carrierInformation> </standaloneDescriptionRequest> </Fare\_GetFareFamilyDescription>

## 5.4.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_GetFareFamilyDescriptionReply xmlns="http://xml.amadeus.com/TFQFRR\_15\_1\_1A"> <fareFamilyDescriptionGroup> <referenceInformation> <itemNumberDetails> <number>1</number> </itemNumberDetails> </referenceInformation> <fareInformation> <discountDetails> <fareQualifier>FF</fareQualifier> <rateCategory>ECO</rateCategory> </discountDetails> </fareInformation> <carrierInformation> <companyIdentification> <otherCompany>AY</otherCompany> </companyIdentification> </carrierInformation> <freeFlowDescription> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <informationType>FFD</informationType> <source>S</source> <encoding>1</encoding> </freeTextDetails> <freeText>THIS IS ECO FARE FAMILY</freeText> </freeFlowDescription> <ocFeeInformation> <feeDescription> <dataTypeInformation> <type>REF</type> </dataTypeInformation> </feeDescription> <serviceDetails> <specialRequirementsInfo> <ssrCode>T</ssrCode> <airlineCode>6X</airlineCode> <serviceType>BK</serviceType> </specialRequirementsInfo> </serviceDetails> <feeFreeFlowDescription> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>S</source> <encoding>1</encoding> </freeTextDetails> <freeText>NON REFUNDABLE</freeText> </feeFreeFlowDescription> </ocFeeInformation> <ocFeeInformation> <feeDescription> <dataTypeInformation> <type>BAG</type> </dataTypeInformation> <dataInformation> <indicator>CHA</indicator> </dataInformation> </feeDescription> <serviceDetails> <specialRequirementsInfo> <ssrCode>C</ssrCode> <airlineCode>6X</airlineCode> <serviceType>BG</serviceType> </specialRequirementsInfo> </serviceDetails> <feeFreeFlowDescription> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>S</source> <encoding>1</encoding> </freeTextDetails> <freeText>BAG UP TO 20 KGY</freeText> </feeFreeFlowDescription> <ocFeeAmount> <monetaryDetails> <typeQualifier>707</typeQualifier> <amount>10</amount> <currency>EUR</currency> </monetaryDetails> </ocFeeAmount> </ocFeeInformation> </fareFamilyDescriptionGroup> <fareFamilyDescriptionGroup> <referenceInformation> <itemNumberDetails> <number>2</number> </itemNumberDetails> </referenceInformation> <fareInformation> <discountDetails> <fareQualifier>FF</fareQualifier> <rateCategory>ECOFLEX</rateCategory> </discountDetails> </fareInformation> <carrierInformation> <companyIdentification> <otherCompany>AY</otherCompany> </companyIdentification> </carrierInformation> <freeFlowDescription> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>S</source> <encoding>1</encoding> </freeTextDetails> <freeText>THIS IS ECOFLEX FARE FAMILY</freeText> </freeFlowDescription> <ocFeeInformation> <feeDescription> <dataTypeInformation> <type>REF</type> </dataTypeInformation> </feeDescription> <serviceDetails> <specialRequirementsInfo> <ssrCode>T</ssrCode> <airlineCode>6X</airlineCode> <serviceType>BK</serviceType> </specialRequirementsInfo> </serviceDetails> <feeFreeFlowDescription> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>S</source> <encoding>1</encoding> </freeTextDetails> <freeText>REFUNDABLE BEFORE DEPARTURE WITHOUT PENALTY</freeText> </feeFreeFlowDescription> </ocFeeInformation> <ocFeeInformation> <feeDescription> <dataTypeInformation> <type>BAG</type> </dataTypeInformation> <dataInformation> <indicator>CHA</indicator> </dataInformation> </feeDescription> <serviceDetails> <specialRequirementsInfo> <ssrCode>C</ssrCode> <airlineCode>6X</airlineCode> <serviceType>BG</serviceType> </specialRequirementsInfo> </serviceDetails> <feeFreeFlowDescription> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>S</source> <encoding>1</encoding> </freeTextDetails> <freeText>BAG UP TO 20 KG</freeText> </feeFreeFlowDescription> <ocFeeAmount> <monetaryDetails> <typeQualifier>707</typeQualifier> <amount>10</amount> <currency>EUR</currency> </monetaryDetails> </ocFeeAmount> </ocFeeInformation> </fareFamilyDescriptionGroup> </Fare\_GetFareFamilyDescriptionReply>

## 5.4.3 Possible Errors

See the "Error Messages" section.

* * *

## 5.5 Operation: Standalone Request, re-pricing use case

The following operation is an example of requesting the fare family description based on fare family name, market (city pair), original ticket number and carrier. No previous PNR re-pricing has been done.  
The operation does the following:  
• Check fare family description used in original ticket pricing (fare family = PRO for a trip from PAR to LON on a 6X flight)  
• First fare family = ECO for a trip from PAR to LON on a 6X flight  
• Second fare family = ECOFLEX for a trip from LON to PAR on a 6X flight

## 5.5.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_GetFareFamilyDescription xmlns="http://xml.amadeus.com/TFQFRQ\_15\_1\_1A"> <bookingDateInformation></bookingDateInformation> <repricingIndicator> <attributeDetails> <attributeType>ATC</attributeType> </attributeDetails> </repricingIndicator> <documentInfo> <documentDetails> <number>1721234567890</number> <type>T</type> </documentDetails> </documentInfo> <standaloneDescriptionRequest> <fareInformation> <discountDetails> <fareQualifier>FF</fareQualifier> <rateCategory>ECO</rateCategory> </discountDetails> </fareInformation> <itineraryInformation> <origin>PAR</origin> <destination>LON</destination> </itineraryInformation> <carrierInformation> <companyIdentification> <otherCompany>6X</otherCompany> </companyIdentification> </carrierInformation> </standaloneDescriptionRequest> <standaloneDescriptionRequest> <fareInformation> <discountDetails> <fareQualifier>FF</fareQualifier> <rateCategory>ECOFLEX</rateCategory> </discountDetails> </fareInformation> <itineraryInformation> <origin>LON</origin> <destination>PAR</destination> </itineraryInformation> <carrierInformation> <companyIdentification> <otherCompany>6X</otherCompany> </companyIdentification> </carrierInformation> </standaloneDescriptionRequest> </Fare\_GetFareFamilyDescription>

## 5.5.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_GetFareFamilyDescriptionReply xmlns="http://xml.amadeus.com/TFQFRR\_15\_1\_1A"> <fareFamilyDescriptionGroup> <referenceInformation> <itemNumberDetails> <number>1</number> </itemNumberDetails> </referenceInformation> <fareInformation> <discountDetails> <fareQualifier>FF</fareQualifier> <rateCategory>PRO</rateCategory> </discountDetails> </fareInformation> <previousTicketIndicator> <attributeDetails> <attributeType>P</attributeType> </attributeDetails> </previousTicketIndicator> <carrierInformation> <companyIdentification> <otherCompany>AY</otherCompany> </companyIdentification> </carrierInformation> <freeFlowDescription> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>S</source> <encoding>1</encoding> </freeTextDetails> <freeText>THIS IS PRO FARE FAMILY</freeText> </freeFlowDescription> <ocFeeInformation> <feeDescription> <dataTypeInformation> <type>REF</type> </dataTypeInformation> </feeDescription> <serviceDetails> <specialRequirementsInfo> <ssrCode>T</ssrCode> <airlineCode>6X</airlineCode> <serviceType>BK</serviceType> </specialRequirementsInfo> </serviceDetails> <feeFreeFlowDescription> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>S</source> <encoding>1</encoding> </freeTextDetails> <freeText>NON REFUNDABLE</freeText> </feeFreeFlowDescription> </ocFeeInformation> <ocFeeInformation> <feeDescription> <dataTypeInformation> <type>BAG</type> </dataTypeInformation> <dataInformation> <indicator>CHA</indicator> </dataInformation> </feeDescription> <serviceDetails> <specialRequirementsInfo> <ssrCode>C</ssrCode> <airlineCode>6X</airlineCode> <serviceType>BG</serviceType> </specialRequirementsInfo> </serviceDetails> <feeFreeFlowDescription> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>S</source> <encoding>1</encoding> </freeTextDetails> <freeText>BAG UP TO 20 KGY</freeText> </feeFreeFlowDescription> <ocFeeAmount> <monetaryDetails> <typeQualifier>707</typeQualifier> <amount>10</amount> <currency>EUR</currency> </monetaryDetails> </ocFeeAmount> </ocFeeInformation> </fareFamilyDescriptionGroup> <fareFamilyDescriptionGroup> <referenceInformation> <itemNumberDetails> <number>2</number> </itemNumberDetails> </referenceInformation> <fareInformation> <discountDetails> <fareQualifier>FF</fareQualifier> <rateCategory>ECO</rateCategory> </discountDetails> </fareInformation> <carrierInformation> <companyIdentification> <otherCompany>AY</otherCompany> </companyIdentification> </carrierInformation> <freeFlowDescription> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>S</source> <encoding>1</encoding> </freeTextDetails> <freeText>THIS IS ECO FARE FAMILY</freeText> </freeFlowDescription> <ocFeeInformation> <feeDescription> <dataTypeInformation> <type>REF</type> </dataTypeInformation> </feeDescription> <serviceDetails> <specialRequirementsInfo> <ssrCode>T</ssrCode> <airlineCode>6X</airlineCode> <serviceType>BK</serviceType> </specialRequirementsInfo> </serviceDetails> <feeFreeFlowDescription> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>S</source> <encoding>1</encoding> </freeTextDetails> <freeText>NON REFUNDABLE</freeText> </feeFreeFlowDescription> </ocFeeInformation> <ocFeeInformation> <feeDescription> <dataTypeInformation> <type>BAG</type> </dataTypeInformation> <dataInformation> <indicator>CHA</indicator> </dataInformation> </feeDescription> <serviceDetails> <specialRequirementsInfo> <ssrCode>C</ssrCode> <airlineCode>6X</airlineCode> <serviceType>BG</serviceType> </specialRequirementsInfo> </serviceDetails> <feeFreeFlowDescription> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>S</source> <encoding>1</encoding> </freeTextDetails> <freeText>BAG UP TO 20 KGY</freeText> </feeFreeFlowDescription> <ocFeeAmount> <monetaryDetails> <typeQualifier>707</typeQualifier> <amount>10</amount> <currency>EUR</currency> </monetaryDetails> </ocFeeAmount> </ocFeeInformation> </fareFamilyDescriptionGroup> <fareFamilyDescriptionGroup> <referenceInformation> <itemNumberDetails> <number>3</number> </itemNumberDetails> </referenceInformation> <fareInformation> <discountDetails> <fareQualifier>FF</fareQualifier> <rateCategory>ECOFLEX</rateCategory> </discountDetails> </fareInformation> <carrierInformation> <companyIdentification> <otherCompany>AY</otherCompany> </companyIdentification> </carrierInformation> <freeFlowDescription> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>S</source> <encoding>1</encoding> </freeTextDetails> <freeText>THIS IS ECOFLEX FARE FAMILY</freeText> </freeFlowDescription> <ocFeeInformation> <feeDescription> <dataTypeInformation> <type>REF</type> </dataTypeInformation> </feeDescription> <serviceDetails> <specialRequirementsInfo> <ssrCode>T</ssrCode> <airlineCode>6X</airlineCode> <serviceType>BK</serviceType> </specialRequirementsInfo> </serviceDetails> <feeFreeFlowDescription> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>S</source> <encoding>1</encoding> </freeTextDetails> <freeText>REFUNDABLE BEFORE DEPARTURE WITHOUT PENALTY</freeText> </feeFreeFlowDescription> </ocFeeInformation> <ocFeeInformation> <feeDescription> <dataTypeInformation> <type>BAG</type> </dataTypeInformation> <dataInformation> <indicator>CHA</indicator> </dataInformation> </feeDescription> <serviceDetails> <specialRequirementsInfo> <ssrCode>C</ssrCode> <airlineCode>6X</airlineCode> <serviceType>BG</serviceType> </specialRequirementsInfo> </serviceDetails> <feeFreeFlowDescription> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>S</source> <encoding>1</encoding> </freeTextDetails> <freeText>BAG UP TO 20 KG</freeText> </feeFreeFlowDescription> <ocFeeAmount> <monetaryDetails> <typeQualifier>707</typeQualifier> <amount>10</amount> <currency>EUR</currency> </monetaryDetails> </ocFeeAmount> </ocFeeInformation> </fareFamilyDescriptionGroup> </Fare\_GetFareFamilyDescriptionReply>

## 5.5.3 Possible Errors

See "Error Messages" section.

* * *