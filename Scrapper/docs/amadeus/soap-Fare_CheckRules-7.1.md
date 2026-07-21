---
url: "https://developers.amadeus.com/api-library/soap/functional-doc/573/doc-read/99669?serviceVersion=7.1"
download_url: "https://developers.amadeus.com/PAS-EAS/api/download/comp/4d4ad2cb456c02633f463a055ab70584/99669/ug_fare_checkrules/ug_fare_checkrules.html"
title: "ug_fare_checkrules"
source: "amadeus"
service_id: "573"
service_name: "Fare_CheckRules"
version: "7.1"
document_id: "99669"
doc_version: "7.1"
doc_type: "User guide"
file_format: "HTML"
scraped_at: "2026-07-15T10:21:00.380Z"
---
# Function: CheckRules

## Overview

The verb CheckRules is used to display fare notes after Fare Display or after Pricing transactions. (This PSP service provides the same information as the cryptic FQN transaction.)

CheckRules is a follow-up transaction that can be used after a pricing or a fare display transaction.

Based on the query it can:

-   Display one or more rules of a given fare
-   Display list of rule categories relevant to a fare
-   Display a list of all available rules of a given fare
-   Display following a pricing transaction an Intermediate Display / Fare Component selection prompt
-   Display following a pricing transaction one or more rules of several fares

## Supported Operations

The product number on its own or the product number together with the fare component number (only follow-up after pricing) are to specify in the query.

The following inputs are possible:

-   A product number and a fare component number after a pricing transaction: to display rule text relevant to a fare of a specified fare component of a specified product.
-   A fare number after a fare display: To display the rule text relevant to the specfied fare of specified number.
-   Specific category(ies) name(s) or indexes: list of the categories to be displayed
-   List indicator: Display list of rule categories relevant to a fare offer

## Limitations

Not applicable

## Unsupported Operations

Possibility to display info-notes

## Prerequisites

Office profile security:

This transaction can only be used as a subsequent after a pricing or a fare display

Data availability:

Not applicable

## Building A Query

## Receiving A Reply

Successful reply:

If no reject message is generated, the reply can have one of the following forms:

-   a list of the available categories for a requested fare
-   a list of the fare component composing a recommendation (subsequent after a pricing)
-   the text corresponding to one or more rules.

Fare Quote rejects:

If a Fare Quote reject message is generated, then only this reject message is sent back globally.

## Reply Structure

There is an example of each type of reply in the operations.

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

No XML example -

## Error Messages

Wrong input syntax

The following rejects occurs when data specified in the request is not valid, although it is compatible with the message definition

Usual reject examples:

ERROR MESSAGE

DESCRIPTION

CHECK SEQUENCE NUMBER

selected fare component does not exist (ex: 50 fare components are returned after FQD and we ask information about the 51st

VERIFY OPTION

information about a rule that does not exist are requested (In this case, the list of available rules is displayed after the error message)

A message will have to be defined in case of inconsistent qualifiers in the ITM field

If many items are set in the ITM field, one (and one only) has to be a farecomponent (FC qualifier).

## Operation: Display categories AP and TF after an FQD request (Query)

Display categories AP and TF after an FQD request

## Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_CheckRules> <msgType> <messageFunctionDetails> <messageFunction>712</messageFunction> </messageFunctionDetails> </msgType> <itemNumber> <itemNumberDetails> <number>1</number> </itemNumberDetails> </itemNumber> <fareRule> <tarifFareRule> <ruleSectionId>AP</ruleSectionId> <ruleSectionId>TF</ruleSectionId> </tarifFareRule> </fareRule> </Fare\_CheckRules>

## Possible Errors

See "Error Messages" section.

## Operation: Display categories AP and TF after an FQD request (Reply)

Text corresponding to one or more rules

This is the reply of the previous operation

## Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_CheckRulesReply> <transactionType> <messageFunctionDetails> <messageFunction>712</messageFunction> </messageFunctionDetails> </transactionType> <tariffInfo> <fareRuleInfo> <ruleSectionLocalId>1</ruleSectionLocalId> <ruleCategoryCode>(5)</ruleCategoryCode> </fareRuleInfo> <fareRuleText> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> <informationType>CAT</informationType> </freeTextQualification> <freeText>AP.ADVANCE RES/TKT</freeText> </fareRuleText> <fareRuleText> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText> </freeText> </fareRuleText> <fareRuleText> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText> NOTE -</freeText> </fareRuleText> <fareRuleText> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText> WHEN RESERVATIONS ARE MADE AT LEAST 5 DAYS</freeText> </fareRuleText> <fareRuleText> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText> BEFORE DEPARTURE TICKETING MUST BE COMPLETED</freeText> </fareRuleText> <fareRuleText> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText> AT LEAST 4 DAYS BEFORE DEPARTURE.</freeText> </fareRuleText> <fareRuleText> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText> ---</freeText> </fareRuleText> <fareRuleText> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText> WHEN RESERVATIONS ARE MADE WITHIN 4 DAYS BEFORE</freeText> </fareRuleText> <fareRuleText> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText> DEPARTURE TICKETING MUST BE COMPLETED WITHIN 1 DAY</freeText> </fareRuleText> <fareRuleText> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText> AFTER RESERVATION ARE MADE.</freeText> </fareRuleText> <fareRuleText> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText> </freeText> </fareRuleText> </tariffInfo> <tariffInfo> <fareRuleInfo> <ruleSectionLocalId>2</ruleSectionLocalId> <ruleCategoryCode>(9)</ruleCategoryCode> </fareRuleInfo> <fareRuleText> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> <informationType>CAT</informationType> </freeTextQualification> <freeText>TF.TRANSFERS/RTGS</freeText> </fareRuleText> <fareRuleText> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText> </freeText> </fareRuleText> <fareRuleText> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText> UNLIMITED TRANSFERS PERMITTED ON THE PRICING UNIT</freeText> </fareRuleText> <fareRuleText> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText> FARE BREAK SURFACE SECTORS NOT PERMITTED AND EMBEDDED</freeText> </fareRuleText> <fareRuleText> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText> SURFACE SECTORS PERMITTED ON THE FARE COMPONENT.</freeText> </fareRuleText> </tariffInfo> <flightDetails> <qualificationFareDetails> <fareDetails> <qualifier>ADT</qualifier> <fareCategory>BU</fareCategory> </fareDetails> <additionalFareDetails> <fareClass>COW1</fareClass> </additionalFareDetails> </qualificationFareDetails> <flightErrorCode> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> <informationType>PTC</informationType> </freeTextQualification> <freeText>ADULT</freeText> </flightErrorCode> <flightErrorCode> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> <informationType>FTC</informationType> </freeTextQualification> <freeText>BUSINESS UNRESTRICTED</freeText> </flightErrorCode> <productInfo> <productDetails> <bookingClassDetails> <designator>C</designator> </bookingClassDetails> </productDetails> </productInfo> <travellerGrp> <travellerIdentRef> <referenceDetails> <type>RU</type> <value>6226</value> </referenceDetails> </travellerIdentRef> <fareRulesDetails> <tariffClassId>21</tariffClassId> <ruleSectionId>1</ruleSectionId> <ruleSectionId>2</ruleSectionId> </fareRulesDetails> </travellerGrp> </flightDetails> </Fare\_CheckRulesReply>

## Possible Errors

See "Error Messages" section.

## Operation: Request the list of available categories of the first fare(Query)

Request the list of available categories of the first fare

## Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_CheckRules> <msgType> <messageFunctionDetails> <messageFunction>712</messageFunction> </messageFunctionDetails> </msgType> <itemNumber> <itemNumberDetails> <number>1</number> </itemNumberDetails> </itemNumber> <flightQualification> <discountDetails> <fareQualifier>764</fareQualifier> </discountDetails> </flightQualification> </Fare\_CheckRules>

## Possible Errors

See "Error Messages" section.

## Operation: Request the list of available categories of the first fare(Reply)

List of available categories

This is the reply of the previous operation

## Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_CheckRulesReply> <transactionType> <messageFunctionDetails> <messageFunction>712</messageFunction> </messageFunctionDetails> </transactionType> <flightDetails> <qualificationFareDetails> <fareDetails> <qualifier>ADT</qualifier> <fareCategory>BU</fareCategory> </fareDetails> <additionalFareDetails> <fareClass>COW1</fareClass> </additionalFareDetails> </qualificationFareDetails> <flightErrorCode> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> <informationType>PTC</informationType> </freeTextQualification> <freeText>ADULT</freeText> </flightErrorCode> <flightErrorCode> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> <informationType>FTC</informationType> </freeTextQualification> <freeText>BUSINESS UNRESTRICTED</freeText> </flightErrorCode> <productInfo> <productDetails> <bookingClassDetails> <designator>C</designator> </bookingClassDetails> </productDetails> </productInfo> <travellerGrp> <travellerIdentRef> <referenceDetails> <type>RU</type> <value>6226</value> </referenceDetails> </travellerIdentRef> <fareRulesDetails> <tariffClassId>21</tariffClassId> <ruleSectionId>(50)</ruleSectionId> <ruleSectionId>(5)</ruleSectionId> <ruleSectionId>(19)</ruleSectionId> <ruleSectionId>(20)</ruleSectionId> <ruleSectionId>(21)</ruleSectionId> <ruleSectionId>(8)</ruleSectionId> <ruleSectionId>(9)</ruleSectionId> <ruleSectionId>(12)</ruleSectionId> <ruleSectionId>(16)</ruleSectionId> <ruleSectionId>(10)</ruleSectionId> <ruleSectionId>(17)</ruleSectionId> <ruleSectionId>(23)</ruleSectionId> <ruleSectionId>(31)</ruleSectionId> </fareRulesDetails> </travellerGrp> </flightDetails> </Fare\_CheckRulesReply>

## Possible Errors

See "Error Messages" section.

## Operation: Request a list of fare components(Query)

Request the list of fare components that compose the first recommendation returned by FQP

## Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_CheckRules> <msgType> <messageFunctionDetails> <messageFunction>712</messageFunction> </messageFunctionDetails> </msgType> <itemNumber> <itemNumberDetails> <number>1</number> </itemNumberDetails> </itemNumber> </Fare\_CheckRules>

## Possible Errors

See "Error Messages" section.

## Operation: Request a list of fare components(Reply)

List of fare components composing a recommendation

This is the reply of the previous operation

## Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_CheckRulesReply> <transactionType> <messageFunctionDetails> <messageFunction>712</messageFunction> </messageFunctionDetails> </transactionType> <flightDetails> <qualificationFareDetails> <fareCategories> <fareType>700</fareType> </fareCategories> <additionalFareDetails> <rateClass>C</rateClass> </additionalFareDetails> </qualificationFareDetails> <transportService> <companyIdentification> <marketingCompany>YY</marketingCompany> </companyIdentification> </transportService> <fareDetailInfo> <nbOfUnits> <quantityDetails> <numberOfUnit>1</numberOfUnit> <unitQualifier>ND</unitQualifier> </quantityDetails> </nbOfUnits> <fareDeatilInfo> <fareTypeGrouping> <pricingGroup>ADT</pricingGroup> </fareTypeGrouping> </fareDeatilInfo> </fareDetailInfo> <odiGrp> <originDestination> <origin>PAR</origin> <destination>LON</destination> </originDestination> </odiGrp> <travellerGrp> <travellerIdentRef> <referenceDetails> <type>FC</type> <value>1</value> </referenceDetails> <referenceDetails> <type>PU</type> <value>1</value> </referenceDetails> </travellerIdentRef> </travellerGrp> <itemGrp> <itemNb> <itemNumberDetails> <number>1</number> </itemNumberDetails> </itemNb> <unitGrp> <nbOfUnits> <quantityDetails> <numberOfUnit>1</numberOfUnit> <unitQualifier>PR</unitQualifier> </quantityDetails> </nbOfUnits> <unitFareDetails> <fareTypeGrouping> <pricingGroup>ADT</pricingGroup> </fareTypeGrouping> </unitFareDetails> </unitGrp> </itemGrp> </flightDetails> <flightDetails> <qualificationFareDetails> <fareCategories> <fareType>700</fareType> </fareCategories> <additionalFareDetails> <rateClass>C</rateClass> </additionalFareDetails> </qualificationFareDetails> <transportService> <companyIdentification> <marketingCompany>YY</marketingCompany> </companyIdentification> </transportService> <fareDetailInfo> <nbOfUnits> <quantityDetails> <numberOfUnit>1</numberOfUnit> <unitQualifier>ND</unitQualifier> </quantityDetails> </nbOfUnits> <fareDeatilInfo> <fareTypeGrouping> <pricingGroup>ADT</pricingGroup> </fareTypeGrouping> </fareDeatilInfo> </fareDetailInfo> <odiGrp> <originDestination> <origin>LON</origin> <destination>PAR</destination> </originDestination> </odiGrp> <travellerGrp> <travellerIdentRef> <referenceDetails> <type>FC</type> <value>2</value> </referenceDetails> <referenceDetails> <type>PU</type> <value>1</value> </referenceDetails> </travellerIdentRef> </travellerGrp> <itemGrp> <itemNb> <itemNumberDetails> <number>1</number> </itemNumberDetails> </itemNb> <unitGrp> <nbOfUnits> <quantityDetails> <numberOfUnit>1</numberOfUnit> <unitQualifier>PR</unitQualifier> </quantityDetails> </nbOfUnits> <unitFareDetails> <fareTypeGrouping> <pricingGroup>ADT</pricingGroup> </fareTypeGrouping> </unitFareDetails> </unitGrp> </itemGrp> </flightDetails> </Fare\_CheckRulesReply>

## Possible Errors

See "Error Messages" section.

## Operation: Display rule text of a specified category relevant to fare offer

Display rule text of a specified category relevant to fare offer

## Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_CheckRules> <msgType> <messageFunctionDetails> <messageFunction>712</messageFunction> </messageFunctionDetails> </msgType> <itemNumber> <itemNumberDetails> <number>2</number> </itemNumberDetails> </itemNumber> <fareRule> <tarifFareRule> <ruleSectionId>10</ruleSectionId> </tarifFareRule> </fareRule> </Fare\_CheckRules>

## Possible Errors

See "Error Messages" section.

## Operation: Examples after a pricing request

Display list of rule categories relevant to fare component 2 of fare offer 2

In this example, 2 elements of ITM are filled:

-   In the first one, there is no qualifier. In this case, the default value applies and this element is a reference to the mother transaction (in this case: 1st recommendation)
-   Here we have a qualifier (FC = Fare Component), meaning that the displayed information will be about the second fare component.

## Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_CheckRules> <msgType> <messageFunctionDetails> <messageFunction>722</messageFunction> </messageFunctionDetails> </msgType> <itemNumber> <itemNumberDetails> <number>2</number> </itemNumberDetails> <itemNumberDetails> <number>2</number> <type>FC</type> </itemNumberDetails> </itemNumber> <flightQualification> <discountDetails> <fareQualifier>764</fareQualifier> </discountDetails> </flightQualification> </Fare\_CheckRules>

## Possible Errors

See "Error Messages" section.

## Operation: Information on the 3rd recommendation

We want to have information on the 3rd recommendation after a pricing request:

## Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_CheckRules> <msgType> <messageFunctionDetails> <messageFunction>722</messageFunction> </messageFunctionDetails> </msgType> <itemNumber> <itemNumberDetails> <number>3</number> </itemNumberDetails> </itemNumber> </Fare\_CheckRules>

## Possible Errors

See "Error Messages" section.