---
url: "https://developers.amadeus.com/api-library/soap/functional-doc/1253/doc-read/101653?serviceVersion=8.2"
download_url: "https://developers.amadeus.com/PAS-EAS/api/download/comp/4d4ad2cb456c02633f463a055ab70584/101653/UG_WBS_Fare_DisplayFareDetails_FARRVQ_08.2_009/UG_WBS_Fare_DisplayFareDetails_FARRVQ_08.2_009.html"
title: "UG_WBS_Fare_DisplayFareDetails_FARRVQ_08.2_009"
source: "amadeus"
service_id: "1253"
service_name: "Fare_DisplayFareDetails"
version: "8.2"
document_id: "101653"
doc_version: "8.2"
doc_type: "User guide"
file_format: "HTML"
scraped_at: "2026-07-15T10:21:47.908Z"
---
# Function: DisplayFareDetails

## Overview

The PSP Service DisplayFareDetails returns details on the fare including currency amounts for specified fare and add-ons.

The PSP Service DisplayFareDetails returns details on the fare including currency amounts for specified fare and add-ons.

It is a subsequent transaction of the FareDisplay PSP service.

## Supported Operations

Not applicable

## Limitations

Not applicable

## Unsupported Operations

Not applicable

## Prerequisites

Not applicable

## Building A Query

## Receiving A Reply

## Reply Structure

## XML Error Reply

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

\-

## Error Messages

**Explanations of output**

informationtransactionType (MSG) : Code function for DisplayFareDetails (FRV).

rejectErrorCode (ERC) : Error code (0).

errorFreeText (IFT) : Error text

## Operation: 1. Display fare details with footnote and vendor LSS

-   **Input**

msgType (MSG) : Code function for DisplayFareDetails (FRV).

itemNumber (ITM) : Fare number 1.

-   **Ouput**

transactionType (MSG) : Code function for DisplayFareDetails (FRV).

qualificationFareDetails (FQU) : route code for the global direction requested (7EH).

itemNb (ITM) : Fare record (FR).

transportServiceItem (TRA) : Industry fares for all carriers (7YY).

fareQualifItem (FQU) : base fare select category (NML), PTC (ADT), fare type code (EU), fare basis (Y), mileage indicator (724), fare structure (S), fare global class (Y), fare XXE class (Y), fare quality code (N), fare family (G), fare category type (1).

originDestOfJourney (ODI) : base fare origin (PAR) and destination city (LON).

monetaryValues (MON) : OneWay base fare (OW), amount (488.00), currency (EUR).

monetFareRuleValues (FRU) : tariff number (2021), vendor (LSS)

monetTravellerRef (REF) : rule number (A003), foot note code (A7), rule tariff number (2021).

## Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_DisplayFareDetails xmlns="http://xml.amadeus.com/FARRVQ\_08\_2\_1A"> <msgType> <messageFunctionDetails> <messageFunction>DFD</messageFunction> </messageFunctionDetails> </msgType> <itemNumber> <itemNumberDetails> <number>1</number> </itemNumberDetails> </itemNumber> </Fare\_DisplayFareDetails>

## Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_DisplayFareDetailsReply xmlns="http://xml.amadeus.com/FARRVR\_08\_2\_1A"> <transactionType> <messageFunctionDetails> <messageFunction>DFD</messageFunction> </messageFunctionDetails> </transactionType> <flightDetails> <nbOfSegments></nbOfSegments> <qualificationFareDetails> <movementType>7EH</movementType> </qualificationFareDetails> <itemGrp> <itemNb> <itemNumberDetails> <type>FR</type> </itemNumberDetails> </itemNb> <transportServiceItem> <companyIdentification> <marketingCompany>7YY</marketingCompany> </companyIdentification> </transportServiceItem> <fareQualifItem> <fareCategories> <fareType>NML</fareType> </fareCategories> <fareDetails> <qualifier>ADT</qualifier> <fareCategory>EU</fareCategory> </fareDetails> <additionalFareDetails> <rateClass>Y</rateClass> </additionalFareDetails> <discountDetails> <fareQualifier>724</fareQualifier> </discountDetails> <discountDetails> <fareQualifier>ST</fareQualifier> <rateCategory>S</rateCategory> </discountDetails> <discountDetails> <fareQualifier>GLC</fareQualifier> <rateCategory>Y</rateCategory> </discountDetails> <discountDetails> <fareQualifier>XC</fareQualifier> <rateCategory>Y</rateCategory> </discountDetails> <discountDetails> <fareQualifier>QC</fareQualifier> <rateCategory>N</rateCategory> </discountDetails> <discountDetails> <fareQualifier>FF</fareQualifier> <rateCategory>G</rateCategory> </discountDetails> <discountDetails> <fareQualifier>TC</fareQualifier> <rateCategory>1</rateCategory> </discountDetails> </fareQualifItem> <originDestinationGrp> <originDestOfJourney> <origin>PAR</origin> <destination>LON</destination> </originDestOfJourney> </originDestinationGrp> <monetaryGrp> <monetaryValues> <monetaryDetails> <typeQualifier>OW</typeQualifier> <amount>488.00</amount> <currency>EUR</currency> </monetaryDetails> </monetaryValues> <monetFareRuleValues> <ruleSectionLocalId>2021</ruleSectionLocalId> <companyDetails> <marketingCompany>LSS</marketingCompany> </companyDetails> </monetFareRuleValues> <monetTravellerRef> <referenceDetails> <type>RU</type> <value>A003</value> </referenceDetails> <referenceDetails> <type>IN</type> <value>A7</value> </referenceDetails> <referenceDetails> <type>RUT</type> <value>2021</value> </referenceDetails> </monetTravellerRef> </monetaryGrp> </itemGrp> </flightDetails> </Fare\_DisplayFareDetailsReply>

## Possible Errors

## Operation: 2. Display fare details with Add-on and vendor ATP

**Explantions of output information**

transactionType (MSG) : Code function for DisplayFareDetails (FRV).

qualificationFareDetails (FQU) : route code for the global direction requested (7AT).

itemNb (ITM) : Fare record (FR).

productDetails (PDI) : booking code (V).

transportServiceItem (TRA) : carrier (AF).

fareQualifItem (FQU) : base fare select category (EXC), PTC (ADT), fare type code (XAB), fare basis (VK4BAP10), mileage indicator (724), fare general class (Y), fare structure (S), fare category type (2).

originDestOfJourney (ODI) : base fare origin (NCE) and destination city (MHT)

routingForJourney (RTG) : add-on origin city (NCE) and gateway (LYS), add-on destination city (ALB) and gateway (MHT)

monetaryValues (MON) : half round trip base fare (HRT), amount (243.50), currency (EUR). Add-on origin (AOO) amount (0.00) and currency (EUR). Add-on destination (AOD) amount (0.00) and currency (USD).

monetFareRuleValues (FRU) : tariff number (0001), vendor (ATP)

monetTravellerRef (REF) : rule number (2776), rule tariff number (0001), add-on origin tariff number (0999), add-on destination tariff number (0999).

## Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_DisplayFareDetails xmlns="http://xml.amadeus.com/FARRVQ\_08\_2\_1A"> <msgType> <messageFunctionDetails> <messageFunction>DFD</messageFunction> </messageFunctionDetails> </msgType> <itemNumber> <itemNumberDetails> <number>29</number> </itemNumberDetails> </itemNumber> </Fare\_DisplayFareDetails>

## Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_DisplayFareDetailsReply xmlns="http://xml.amadeus.com/FARRVR\_08\_2\_1A"> <transactionType> <messageFunctionDetails> <messageFunction>DFD</messageFunction> </messageFunctionDetails> </transactionType> <flightDetails> <nbOfSegments></nbOfSegments> <qualificationFareDetails> <movementType>7AT</movementType> </qualificationFareDetails> <itemGrp> <itemNb> <itemNumberDetails> <type>FR</type> </itemNumberDetails> </itemNb> <productAvailabilityStatus> <bookingClassDetails> <designator>V</designator> </bookingClassDetails> </productAvailabilityStatus> <transportServiceItem> <companyIdentification> <marketingCompany>AF</marketingCompany> </companyIdentification> </transportServiceItem> <fareQualifItem> <fareCategories> <fareType>EXC</fareType> </fareCategories> <fareDetails> <qualifier>ADT</qualifier> <fareCategory>XAB</fareCategory> </fareDetails> <additionalFareDetails> <rateClass>VK4BAP10</rateClass> </additionalFareDetails> <discountDetails> <fareQualifier>724</fareQualifier> </discountDetails> <discountDetails> <fareQualifier>GC</fareQualifier> <rateCategory>Y</rateCategory> </discountDetails> <discountDetails> <fareQualifier>ST</fareQualifier> <rateCategory>S</rateCategory> </discountDetails> <discountDetails> <fareQualifier>TC</fareQualifier> <rateCategory>2</rateCategory> </discountDetails> </fareQualifItem> <originDestinationGrp> <originDestOfJourney> <origin>NCE</origin> <destination>MHT</destination> </originDestOfJourney> <routingForJourney> <routingDetails> <station>LYS</station> <otherStation>NCE</otherStation> <qualifier>AOO</qualifier> </routingDetails> <routingDetails> <station>ALB</station> <otherStation>MHT</otherStation> <qualifier>AOD</qualifier> </routingDetails> </routingForJourney> </originDestinationGrp> <monetaryGrp> <monetaryValues> <monetaryDetails> <typeQualifier>HRT</typeQualifier> <amount>243.50</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>AOO</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>AOD</typeQualifier> <amount>0.00</amount> <currency>USD</currency> </monetaryDetails> </monetaryValues> <monetFareRuleValues> <ruleSectionLocalId>0001</ruleSectionLocalId> <companyDetails> <marketingCompany>ATP</marketingCompany> </companyDetails> </monetFareRuleValues> <monetTravellerRef> <referenceDetails> <type>RU</type> <value>2776</value> </referenceDetails> <referenceDetails> <type>RUT</type> <value>0001</value> </referenceDetails> <referenceDetails> <type>TAO</type> <value>0999</value> </referenceDetails> <referenceDetails> <type>TAD</type> <value>0999</value> </referenceDetails> </monetTravellerRef> </monetaryGrp> </itemGrp> </flightDetails> </Fare\_DisplayFareDetailsReply>

## Possible Errors

## Operation: 3. Display fare details with routing and ATAF fare

**Explanations of output information**

transactionType (MSG) : Code function for DisplayFareDetails (FRV).

qualificationFareDetails (FQU) : route code for the global direction requested (7EH), ATAF fare indicator (727).

itemNb (ITM) : Fare record (FR).

productDetails (PDI) : booking code (F).

transportServiceItem (TRA) : carrier (AH).

fareQualifItem (FQU) : base fare select category (NML), PTC (ADT), fare type code (FU), fare basis (FOO), routing indicator (725), fare general class (F), fare structure (S), fare category type (3).

originDestOfJourney (ODI) : base fare origin (PAR) and destination city (ALG).

monetaryValues (MON) : one way base fare (OW), amount (674.00), currency (EUR).

monetFareRuleValues (FRU) : tariff number (0161), vendor (ATP)monetTravellerRef (REF) : rule number (1000), routing tariff number (0161), rule tariff number (0161).

infoForFareRoute (FRI) : routing number (0003)

## Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_DisplayFareDetails xmlns="http://xml.amadeus.com/FARRVQ\_08\_2\_1A"> <msgType> <messageFunctionDetails> <messageFunction>DFD</messageFunction> </messageFunctionDetails> </msgType> <itemNumber> <itemNumberDetails> <number>1</number> </itemNumberDetails> </itemNumber> </Fare\_DisplayFareDetails>

## Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_DisplayFareDetailsReply xmlns="http://xml.amadeus.com/FARRVR\_08\_2\_1A"> <transactionType> <messageFunctionDetails> <messageFunction>DFD</messageFunction> </messageFunctionDetails> </transactionType> <flightDetails> <nbOfSegments></nbOfSegments> <qualificationFareDetails> <movementType>7EH</movementType> <fareCategories> <fareType>727</fareType> </fareCategories> </qualificationFareDetails> <itemGrp> <itemNb> <itemNumberDetails> <type>FR</type> </itemNumberDetails> </itemNb> <productAvailabilityStatus> <productDetailsQualifier>F</productDetailsQualifier> </productAvailabilityStatus> <transportServiceItem> <companyIdentification> <marketingCompany>AH</marketingCompany> </companyIdentification> </transportServiceItem> <fareQualifItem> <fareCategories> <fareType>NML</fareType> </fareCategories> <fareDetails> <qualifier>ADT</qualifier> <fareCategory>FU</fareCategory> </fareDetails> <additionalFareDetails> <rateClass>FOO</rateClass> </additionalFareDetails> <discountDetails> <fareQualifier>725</fareQualifier> </discountDetails> <discountDetails> <fareQualifier>GC</fareQualifier> <rateCategory>F</rateCategory> </discountDetails> <discountDetails> <fareQualifier>ST</fareQualifier> <rateCategory>S</rateCategory> </discountDetails> <discountDetails> <fareQualifier>TC</fareQualifier> <rateCategory>3</rateCategory> </discountDetails> </fareQualifItem> <originDestinationGrp> <originDestOfJourney> <origin>PAR</origin> <destination>ALG</destination> </originDestOfJourney> </originDestinationGrp> <monetaryGrp> <monetaryValues> <monetaryDetails> <typeQualifier>OW</typeQualifier> <amount>674.00</amount> <currency>EUR</currency> </monetaryDetails> </monetaryValues> <monetFareRuleValues> <ruleSectionLocalId>0161</ruleSectionLocalId> <companyDetails> <marketingCompany>ATP</marketingCompany> </companyDetails> </monetFareRuleValues> <monetTravellerRef> <referenceDetails> <type>RU</type> <value>1000</value> </referenceDetails> <referenceDetails> <type>RT</type> <value>0161</value> </referenceDetails> <referenceDetails> <type>RUT</type> <value>0161</value> </referenceDetails> </monetTravellerRef> </monetaryGrp> <farerouteGrp> <infoForFareRoute> <identificationNumber>0003</identificationNumber> </infoForFareRoute> </farerouteGrp> </itemGrp> </flightDetails> </Fare\_DisplayFareDetailsReply>

## Possible Errors

## Operation: 4. Display fare details with Nego V2

**Explanations of output information**

transactionType (MSG) : Code function for DisplayFareDetails (FRV).

qualificationFareDetails (FQU) : ATAF indicator (727).

itemNb (ITM) : Fare record (FR).

productDetails (PDI) : booking code (N).

transportServiceItem (TRA) : carrier (BA).

fareQualifItem (FQU) : PTC (STU), fare type code (PSD), fare basis (N), routing indicator (725), fare general class (Y), fare structure (S), fare category type (2).

monetaryValues (MON) : unknown amount (UNK).

monetFareRuleValues (FRU) : tariff number (0001), vendor (NG2).

monetTravellerRef (REF) : rule category (J103), routing tariff number (0001).

userIdentification (UID) : Office Id (DUBIE310Q).

## Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_DisplayFareDetails xmlns="http://xml.amadeus.com/FARRVQ\_08\_2\_1A"> <msgType> <messageFunctionDetails> <messageFunction>DFD</messageFunction> </messageFunctionDetails> </msgType> <itemNumber> <itemNumberDetails> <number>1</number> </itemNumberDetails> </itemNumber> </Fare\_DisplayFareDetails>

## Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_DisplayFareDetailsReply xmlns="http://xml.amadeus.com/FARRVR\_08\_2\_1A"> <transactionType> <messageFunctionDetails> <messageFunction>DFD</messageFunction> </messageFunctionDetails> </transactionType> <flightDetails> <nbOfSegments></nbOfSegments> <qualificationFareDetails> <fareCategories> <fareType>727</fareType> </fareCategories> </qualificationFareDetails> <itemGrp> <itemNb> <itemNumberDetails> <type>FR</type> </itemNumberDetails> </itemNb> <productAvailabilityStatus> <bookingClassDetails> <designator>N</designator> </bookingClassDetails> </productAvailabilityStatus> <transportServiceItem> <companyIdentification> <marketingCompany>BA</marketingCompany> </companyIdentification> </transportServiceItem> <fareQualifItem> <fareDetails> <qualifier>STU</qualifier> <fareCategory>PSD</fareCategory> </fareDetails> <additionalFareDetails> <rateClass>N</rateClass> </additionalFareDetails> <discountDetails> <fareQualifier>725</fareQualifier> </discountDetails> <discountDetails> <fareQualifier>GC</fareQualifier> <rateCategory>Y</rateCategory> </discountDetails> <discountDetails> <fareQualifier>ST</fareQualifier> <rateCategory>S</rateCategory> </discountDetails> <discountDetails> <fareQualifier>TC</fareQualifier> <rateCategory>2</rateCategory> </discountDetails> </fareQualifItem> <monetaryGrp> <monetaryValues> <monetaryDetails> <typeQualifier>UNK</typeQualifier> </monetaryDetails> </monetaryValues> <monetFareRuleValues> <ruleSectionLocalId>0001</ruleSectionLocalId> <companyDetails> <marketingCompany>NG2</marketingCompany> </companyDetails> </monetFareRuleValues> <monetTravellerRef> <referenceDetails> <type>RU</type> <value>J103</value> </referenceDetails> <referenceDetails> <type>RT</type> <value>0001</value> </referenceDetails> </monetTravellerRef> <userIdentification> <originIdentification> <inHouseIdentification1>DUBIE310Q</inHouseIdentification1> </originIdentification> </userIdentification> </monetaryGrp> </itemGrp> </flightDetails> </Fare\_DisplayFareDetailsReply>

## Possible Errors