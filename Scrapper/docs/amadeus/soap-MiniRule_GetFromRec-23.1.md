---
url: "https://developers.amadeus.com/api-library/soap/functional-doc/2753/doc-read/140440?serviceVersion=23.1"
download_url: "https://developers.amadeus.com/PAS-EAS/api/download/comp/4d4ad2cb456c02633f463a055ab70584/140440/UG_WBS_MiniRule_GetFromRec_TMRXRQ_23.1_016.html"
title: "HTML_UG_WBS_MiniRule_GetFromRec_TMRXRQ_23.1_016"
source: "amadeus"
service_id: "2753"
service_name: "MiniRule_GetFromRec"
version: "23.1"
document_id: "140440"
doc_version: "23.1"
doc_type: "User guide"
file_format: "HTML"
scraped_at: "2026-07-15T10:30:38.951Z"
---
# Function: MiniRule\_GetFromRec

* * *

## 1 Overview

Amadeus Mini Rules provide to the user a summary of the most important fare conditions in a structured format.

They are stored in TST, PQR, upsell and pricing context.

## 1.1 Supported Operations

MiniRules\_GetFromRecord function provides possibility to retrieve those mini-rules

-   from an e-ticket
-   from a PNR (with possible  passengers and segments selection )
-   from a list of TST returned by pricing/re-pricing
-   from all TSTs returned by pricing/re-pricing
-   from a list of PQRs
-   from all PQR
-   from all PQR associated to a list of air Offer
-   from all PQR associated to all air Offer
-   from a list of fare recommendation returned by pricing/re-pricing
-   from all fare recommendations returned by pricing/re-pricing
-   from a list of upsell returned by upsell transaction
-   from all upsell returned by upsell transaction

### Passenger selection option

In the case of a retrieve from a PNR, it's possible to choose which passenger have to be included in the mini rules service

-   For a given passenger id
-   By passenger Type

### Segment selection option

In the case of a retrieve from a PNR, it is possible to choose which segment have to be included in the mini rules service.

Excepted for married segments (connecting flights).

### Language selection option

If the user provides a specific language, the system will try to get the verbose definition of the MiniRules (MNR) code, if the localization in this langague is available. Otherwise the default language is used to provide the verbose information.

## 1.2 Limitations

In order to retrieve Mini Rules from an e-ticket, the system tries to find the corresponding Passenger Name Record (PNR) first. Thus, if the PNR is already purged (a few days after the last flight), the Mini Rules will not be found. For instance, in case of a ticket transfer from a PNR to another followed by a revalidation, the pricing options cannot be found if the first PNR is purged.

## 1.3 Unsupported Operations

Not applicable

## 1.4 Prerequisites

The office profile needs specific settings :

-   Access to Mini Rules product: the field ‘MNR’ of the office profile has to be set to ‘YES’.
-   Access to Mini Rules for offer: the field ‘MNO’ of the office profile has to be set to ‘YES’.
-   Access to Offer products, in order to access Mini Rules for a PQR : the field 'OFR' of the office profile has to be set to 'YES'

The MiniRules are already calculated and stored in the appropriate structure (TST, PQR,...)

## 2 Building A Query

The MiniRules request is divided in two parts :

-   groupRecords : the list of entities with some selection options
-   miniRulesQueryOption : additionnal options like translation

## 2.1 Sub Structure: filteringSelection

## 2.1.1 Description

This option is available only for PNR referenceType.

It's a sub structure of groupEntities and it proposes to select only a part of a PNR by passenger tattoo or segment tattoo. 

  
It has two elements : 

-   type : 
    -   S = segment
    -   P = passenger
    -   PA = Adult passenger
    -   PI = Infant passenger

-   value : 
    -   segment tattoo 
    -   passenger tattoo

## 2.1.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<filteringSelection> <type>S</type> <value>2</value> </filteringSelection>

## 2.2 Sub Structure: groupRecords

## 2.2.1 Description

The groupEntities will allow to define the targeted Mini rules and, in some cases, to refine them with some optional selection of passengers and segments.

## 2.2.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<groupRecords> <recordID> <referenceType>PNR</referenceType> <uniqueReference>12345</uniqueReference> </recordID> <filteringOption> <type>S</type> <value>2</value> </filteringOption> <filteringOption> <type>S</type> <value>3</value> </filteringOption> <filteringOption> <type>P</type> <value>1</value> </filteringOption> </groupRecords>

## 2.3 Sub Structure: recordID

## 2.3.1 Description

This mandatory sub structure of groupEntities allows to define the set of elements from whom we will retrieve the mini rules.

The query supports a list of entities id at the condition that they all have the same reference type or supports the "ALL" keyword as uniqueReference, to allow to easily target all the entities id of a reference type of the context.

  
It has two elements : 

-   referenceType: contains one of the following codeset:
    -   "TST": to target a TST
    -   "PQR": to target a PQR
    -   "OF": to target an Offer
    -   "TKT": to target a TKT
    -   "PNR" : to target a PNR
    -   "FRN": to target a fare recommendation
    -   "FUN": to target a fare Upsell recommendation

-   uniqueReference: contains TST tatoo, ticket number, PNR recloc, fare recommendation, PQR Offer Id, fare upsell recommendation or the keyword 'ALL'

## 2.3.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<recordID> <referenceType>TST</referenceType> <uniqueReference>1</uniqueReference> </recordID>

## 2.4 Sub Structure: TranslationOption

## 2.4.1 Description

This language structure allows to specify the localisation language of verbose part of the reply.

It has two elements :

• language code qualifier : 1 ( language normally used)  
• language details

-   language code name : a two letters code (for example EN)

## 2.4.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<language> <languageQualifier>1 </languageQualifier> <languageDetails> <languageCode>EN</languageCode> </languageDetails> </language>

## 3 Receiving A Reply

The reply contains Mini Rules by fare components for the requested entities.

It's composed as followed:

-   responseDetails: Output status (Processed or Error)
-   errorWarningGroup: error details if any
-   mnrByEntities : TST/PQR Id / fareRecommendation : Fare recommendation number / Ticket Number
    -   entityId : same structure as query
    -   errorWarningGroup : error or warning at entity level ( same structure as upper level)
    -   offerRef :Offer Id if applicable
    -   paxRef : Ids of passengers associated to the TST/PQR
    -   fareComponentInfo: Details of fare components
    -   mnrRulesInfoGrp  : Fare properties by category and fare component (There will be 
        -   mnrCatInfo: category info  : (category number and processing indicator)
        -   mnrFCInfoGrp: Ids of fare components that share the same property
        -   mnrDateInfoGrp : date information
        -   mnrMonInfoGrp : monetary information
        -   mnrRestriAppInfoGrp : restriction applicability information

The sub structure mnrRulesInfoGrp will be instanciated for the next categories :

-   Cat 5 : Advance Reservation/Ticketing
-   Cat 6 - Minimum Stay
-   Cat 7 - Maximum Stay
-   Cat 16/31 - Changes/Reissue
-   Cat 16/33 - Refund

## 3.1 Sub Structure: errorWarningGroup

## 3.1.1 Description

If an error or warning occurred during processing this group contains the error or warning details.

It is composed of two sub segments :

-   ErrorOrWarningCodeDetails 
    -   Error code
    -   Error category: 'EC' for Errors and 'WEC' for Warnings
-   ErrorWarningDescription
    -   Text Subject Qualifier: contains codeset 3 for 'Literal Text'
    -   Language: contains language code
    -   Source coded: contains codeset S for 'Link'
    -   Encoding: contains codeset 1 for 'ASCII 7 bit'
    -   Error free text

For list of error messages,See "Error Messages" section

## 3.1.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<errorWarningGroup> <errorOrWarningCodeDetails> <errorDetails> <errorCode>20</errorCode> <errorCategory>EC</errorCategory> </errorDetails> </errorOrWarningCodeDetails> <errorWarningDescription> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <language>EN</language> <source>S</source> <encoding>1</encoding> </freeTextDetails> <freeText>RESTRICTED</freeText> </errorWarningDescription> </errorWarningGroup>

* * *

## 3.2 Sub Structure: fareComponentInfo

## 3.2.1 Description

This part contains fare components details:

-   rateClass : contains fare basis code
-   fareComponentRef : contains fare component Id
-   originAndDestination : Origin and destination for the fare component
-   segmentRefernce : Tatoos of segments corresponding to the fare component

## 3.2.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<fareComponentInfo> <fareQualifierDetails> <additionalFareDetails> <rateClass>MDO5</rateClass> </additionalFareDetails> </fareQualifierDetails> <fareComponentRef> <referenceDetails> <type>FC</type> <value>1</value> </referenceDetails> </fareComponentRef> <originAndDestination> <origin>NCE</origin> <destination>LHR</destination> </originAndDestination> <segmentRefernce> <reference> <type>ST</type> <value>1</value> </reference> </segmentRefernce> </fareComponentInfo>

* * *

## 3.3 Sub Structure: mnrByPricingRecord

## 3.3.1 Description

This sub structure details the mini rules informations.

It contains the next segments and sub structure (sub structure are detailed apart) : 

-   pricingRecordID: TST/PQR Id / fareRecommendation : Fare recommendation number / Ticket Number
-   errorWarningGroup : error or warning messages (same structure as errorWanrningGroup at upper level)
-   offerRef: Offer Id if applicable (PQR case)
-   paxRef: Ids of passengers associated to the TST/PQR
-   paxTypeLoc : Localization of pax type
-   fareComponentInfo: Details of fare components
-   mnrRulesInfoGrp : Fare properties by category and fare component

## 3.3.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<mnrByPricingRecord> <pricingRecordId> <referenceType>TKT</referenceType> <uniqueReference>572387659043</uniqueReference> </pricingRecordId> <fareComponentInfo> <fareQualifierDetails> <additionalFareDetails></additionalFareDetails> <rateClass>Y3FFWDE</rateClass> </fareQualifierDetails> <fareComponentRef> <referenceDetails> <type>PU</type> <value>NPU</value> </referenceDetails> <referenceDetails> <type>FC</type> <value>1</value> </referenceDetails> </fareComponentRef> <originAndDestination> <origin>FRA</origin> <destination>PAR</destination> </originAndDestination> <segmentRefernce> <reference> <type>CPN</type> <value>1</value> </reference> </segmentRefernce> </fareComponentInfo> <mnrRulesInfoGrp> </mnrRulesInfoGrp> </mnrByPricingRecord>

* * *

## 3.4 Sub Structure: mnrByPricingRecord- with localization

## 3.4.1 Description

Same as mnrByPricing Record with in addition translation of:

\- language

\- pax type

\- origine and destination city name

\- listSituation

## 3.4.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<message agency="1A" release="1" type="TMRXRR" version="18"> <responseDetails> <statusCode>O</statusCode> </responseDetails> <language> <languageQualifier>5</languageQualifier> <languageDetails> <languageCode>EN</languageCode> </languageDetails> </language> <mnrByPricingRecord> <pricingRecordId> <referenceType>TST</referenceType> <uniqueReference>1</uniqueReference> </pricingRecordId> <paxRef> <passengerReference> <type>PA</type> <value>1</value> </passengerReference> </paxRef> <paxTypeLoc> <paxCode> <statusInformation> <indicator>PA</indicator> </statusInformation> </paxCode> <paxTypeDescription> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <language>EN</language> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>Adult</freeText> </paxTypeDescription> </paxTypeLoc> <fareComponentInfo> <fareQualifierDetails> <additionalFareDetails> <rateClass>Y3FFWDE</rateClass> </additionalFareDetails> </fareQualifierDetails> <fareComponentRef> <referenceDetails> <type>PU</type> <value>NPU</value> </referenceDetails> <referenceDetails> <type>FC</type> <value>1</value> </referenceDetails> </fareComponentRef> <originAndDestination> <origin>FRA</origin> <destination>PAR</destination> </originAndDestination> <originDestinLoc> <originDestinCode> <statusInformation> <indicator>FRA</indicator> </statusInformation> </originDestinCode> <originDestinDescription> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <language>EN</language> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>Frankfurt</freeText> </originDestinDescription> </originDestinLoc> <originDestinLoc> <originDestinCode> <statusInformation> <indicator>PAR</indicator> </statusInformation> </originDestinCode> <originDestinDescription> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <language>EN</language> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>Paris</freeText> </originDestinDescription> </originDestinLoc> <segmentRefernce> <reference> <type>ST</type> <value>1</value> </reference> </segmentRefernce> </fareComponentInfo> <listSituation> <listSituationDum> </listSituationDum> <situationCode> <statusInformation> <description>BEFORE\_DEPARTURE</description> </statusInformation> </situationCode> <situationDescription> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <language>EN</language> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>Before departure</freeText> </situationDescription> </listSituation> <listSituation> <listSituationDum> </listSituationDum> <situationCode> <statusInformation> <description>AFTER\_DEPARTURE</description> </statusInformation> </situationCode> <situationDescription> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <language>EN</language> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>After departure</freeText> </situationDescription> </listSituation> </mnrByPricingRecord> </message>

* * *

## 3.5 Sub Structure: mnrRulesInfoGrp: Cat 16/31 Changes/Reissue

## 3.5.1 Description

For Cat 31, mnrRulesInfoGrp part may contain the following information:

mnrCatInfo: contains the category number and the processing indicator

-   number : category number '31'
-   processIndicator: if codeset 'ASS' is returned then the category assumption applies = Not allowed

mnrFCInfoGrp: contains Ids of fare components that share the same property for the category

mnrDateInfoGrp: contains date information

-   qualifier: may contain the following values

  - **BDV**: Ticket validity date Before departure

  - **RVA**: Revalidation before departure is allowed

  - **BDA**: Reissue before departure is allowed

  - **BNV**: Ticket validity date Before departure no show

  - **ADV**: Ticket validity date after departure

  - **ANV**: Ticket validity date after departure no show

  - **ADR**: Revalidation after departure is allowed

  - **ADA**: Reissue after departure allowed

date: contains the date

-   time: contains time

if a field is not returned, the default value applies: 'No limit for validaty date'

mnrMonInfoGrp: contains monetary information

-   typeQualifier: may contain the following values

   - **GUA:**  Amount Guaranteed flag for cat 31/33

 - **WAI**: Penalties can be waived for passenger and family death/illness

      - This codeset is dismissed and the process always sends an hardcoded value 0

 - **BDM**: Reissue minimum Penalty amount with sale currency

 - **BDX**: Reissue maximum penalty amount with sale currency

 - **BDF**: Reissue minimum Penalty amount with filing currency

 - **BGD**: Reissue maximum penalty amount with filing currency

 - **BDT**: Reissue maximum penalty amount for the ticket

 - **BDI**: Revalidation minimum Penalty amount with sale currency

 - **BDU**: Revalidation maximum penalty amount with sale currency

 - **BDH**: Revalidation minimum Penalty amount with filing currency

 - **BDL**: Revalidation maximum penalty amount with filing currency

 - **BDC**: Revalidation maximum penalty amount for the ticket

 - **BNW**: Penalties can be waived for passenger and family death/illness

     - This codeset is dismissed and the process always sends an hardcoded value 0

 - **BNR**: Revalidation before departure when no show is allowed

 - **BNA**: Reissue before departure when no show is allowed

 - **BNM**: Reissue minimum Penalty amount with sale currency

 - **BNX**: Reissue maximum penalty amount with sale currency

 - **BNF**: Reissue minimum penalty amount with filing currency

 - **BNG**: Reissue maximum penalty amount with filing currency

 - **BNT**: Reissue maximum penalty amount for the ticket

 - **BNI**: Reissue minimum penalty amount for the ticket

 - **BNU**: Revalidation maximum penalty amount with sale currency

 - **BNH**: Revalidation maximum penalty amount with sale currency

 - **BNL**: Revalidation maximum penalty amount with filing currency

 - **BNC**: Revalidation maximum penalty amount for the ticket

 - **ADW**: Penalties can be waived for passenger and family death/illness

       -  This codeset is dismissed and the process always sends an hardcoded value 0

 - **ADM**: Reissue minimum Penalty amount with sale currency

 - **ADX**: Maximum penality amount After departure

 - **ADF**: Reissue minimum Penalty amount with filing currency

 - **ADT**: Reissue maximum penalty amount for the ticket

 - **ADG**: Reissue maximum penalty amount with filing currency

 - **ADI**: Revalidation minimum Penalty amount with sale currency

 - **ADU**: Revalidation  Maximum penalty amount with sale currency

 - **ADH**: Revalidation Minimum Penalty amount with filing currency

 - **ADL**: Revalidation Maximum penalty amount with filing currency

 - **ADC**: Revalidation Maximum penalty amount for the ticket

 - **ANW**: Penalties can be waived for passenger and family death/illness

      - This codeset is dismissed and the process always sends an hardcoded value 0

 - **ANR**: Revalidation after departure when no show is allowed

 - **ANA**: Reissue after departure when no show allowed

 - **ANM**: Reissue minimum Penalty amount with sale currency

 - **ANX**: Reissue maximum penalty amount with filing currency

 - **ANF**: Reissue minimum Penalty amount with filing currency

 - **ANG**: Reissue minimum Penalty amount with filing currency

 - **ANT**: Reissue maximum penalty amount for the ticket

 - **ANI**: Revalidation minimum Penalty amount with sale currency

 - **ANU**: Revalidation maximum penalty amount with sale currency

 - **ANH**: Revalidation minimum Penalty amount with filing currency

 - **ANL**: Revalidation maximum penalty amount for the ticket

-   amount: contains the amount
-   currency: contains the currency

if a field is not returned, the default value applies: '0'

mnrRestriAppInfoGrp: contains restrictions applicability information

-   indicator: contains the restriction type
-   action: contains restriction value

Table below shows the different cases:

0 : Not guaranteed 1 : Guaranteed

**Field name**

**Situation**

**Type**

**Value**

**Description**

**Default value**

**Default value mapped in the output**

**FFT**

All

Flag

0: No free form text from Cat16  
1: Part of the rule is free form text from Cat16

Part of rule is free form text from Cat16

No free form text

Yes

**GUA**

All

Flag

0: Not guaranteed 

1: Guaranteed

mount Guaranteed flag for cat 31/33

0

Yes

**WAI**

Before departure

Flag

Value hardcoded to 0

Penalties can be waived for passenger and family death/illness

The value is dimissed

No waiver

 This codeset is dismissed and the process always sends an hardcoded value 0  

**RVA**

Flag

0: Reval not allowed  
1:  Reval Allowed with restrictions

Revalidation before departure is allowed

Not Allowed

Yes

**BDA**

Flag

0: Not allowed  
1: Allowed with restrictions

Reissue before departure(RiBD) allowed

Not Allowed

Yes

**BDM**

Amount

\-

(RiBD)  Reissue minimum Penalty amount with sale currency

0

Yes

**BDX**

Amount

\-

(RiBD) Reissue maximum penalty amount with sale currency

0

Yes

**BDF**

Amount

\-

(RiBD)  Reissue minimum Penalty amount with filing currency

0

Yes

**BDG**

Amount

\-

(RiBD) Reissue maximum penalty amount with filing currency

0

Yes

**BDT**

Amount

\-

(RiBD) Reissue maximum penalty amount for the ticket

0

Yes

**BDI**

Amount

\-

(ReBD)  Revalidation minimum Penalty amount with sale currency

0

Yes

**BDU**

Amount

\-

(ReBD) Revalidation maximum penalty amount with sale currency

0

Yes

**BDH**

Amount

\-

(ReBD)  Revalidation minimum Penalty amount with filing currency

0

Yes

**BDL**

Amount

\-

(ReBD) Revalidation maximum penalty amount with filing currency

0

Yes

**BDC**

Amount

\-

(ReBD) Revalidation maximum penalty amount for the ticket

0

Yes

**BDV**

Date

\-

(RiBD) Ticket validity date

No limit for validity date

No

**BNW**

Before departure no show

Flag

Value hardcoded to 0

Penalties can be waived for passenger and family death/illness

The value is dimissed

No waiver

This codeset is dismissed and the process always sends an hardcoded value 0  

**BNR**

Flag

0: Reval not allowed  
1:  Reval Allowed with restrictions

Revalidation before departure when no show(ReBDNS) is allowed

Not Allowed

Yes

**BNA**

Flag

0: Not allowed  
1: Allowed with restrictions

Reissue before departure when no show(RiBDNS) allowed

Not Allowed

Yes

**BNM**

Amount

\-

(RiBDNS) Reissue minimum Penalty amount with sale currency

0

Yes

**BNX**

Amount

\-

(RiBDNS) Reissue maximum penalty amount with sale currency

0

Yes

**BNF**

Amount

\-

(RiBDNS) Reissue minimum Penalty amount with filing currency

0

Yes

**BNG**

Amount

\-

(RiBDNS) Reissue maximum penalty amount with filing currency

0

Yes

**BNT**

Amount

\-

(RiBDNS) Reissue maximum penalty amount for the ticket

0

Yes

**BNI**

Amount

\-

(ReBDNS) Revalidation minimum Penalty amount with sale currency

0

Yes

**BNU**

Amount

\-

(ReBDNS) Revalidation maximum penalty amount with sale currency

0

Yes

**BNH**

Amount

\-

(ReBDNS) Revalidation maximum penalty amount with sale currency

0

Yes

**BNL**

Amount

\-

(ReBDNS) Revalidation maximum penalty amount with filing currency

0

Yes

**BNC**

Amount

\-

(ReBDNS) Revalidation maximum penalty amount for the ticket

0

Yes

**BNV**

Date

\-

(RiBDNS) Ticket validity date

0

No

**ADW**

After departure

Flag

Value hardcoded to 0  

Penalties can be waived for passenger and family death/illness

The value is dimissed

No waiver

This codeset is dismissed and the process always sends an hardcoded value 0

**ADR**

Flag

\-

Revalidation after departure  is allowed

Not Allowed

Yes

**ADA**

Flag

\-

Reissue after departure (RiAD) allowed

Not Allowed

Yes

**ADM**

Amount

\-

(RiAD) Reissue minimum Penalty amount with sale currency

0

Yes

**ADX**

Amount

\-

(RiAD) Reissue maximum penalty amount with filing currency

0

Yes

**ADF**

Amount

\-

(RiAD) Reissue minimum Penalty amount with filing currency

0

Yes

**ADG**

Amount

\-

(RiAD) Reissue maximum penalty amount with filing currency

0

Yes

**ADT**

Amount

\-

(RiAD) Reissue maximum penalty amount for the ticket

0

Yes

**ADI**

Amount

\-

(ReAD) Revalidation minimum Penalty amount with sale currency

0

Yes

**ADU**

Amount

\-

(ReAD) Revalidation  Maximum penalty amount with sale currency

0

Yes

**ADH**

Amount

\-

(ReAD) Revalidation Minimum Penalty amount with filing currency

0

Yes

**ADL**

Amount

\-

(ReAD) Revalidation Maximum penalty amount with filing currency

0

Yes

**ADC**

Amount

\-

(ReAD) Revalidation Maximum penalty amount for the ticket

0

Yes

**ADV**

Date

\-

(RiAD) Ticket validity date

0

Yes

**ANW**

After departure no show

Flag

Value hardcoded to 0

Penalties can be waived for passenger and family death/illness

The value is dimissed

No waiver

This codeset is dismissed and the process always sends an hardcoded value 0

**ANR**

Flag

0: Reval not allowed  
1:  Reval Allowed with restrictions

Revalidation after departure when no show is allowed

Not Allowed

Yes

**ANA**

Flag

0: Not allowed  
1: Allowed with restrictions

Reissue after departure when no show(RiADNS) allowed

Not Allowed

Yes

**ANM**

Amount

\-

(RiADNS) Reissue minimum Penalty amount with sale currency

0

Yes

**ANX**

Amount

\-

(RiADNS) Reissue maximum penalty amount with sale currency

0

Yes

**ANF**

Amount

\-

(RiADNS) Reissue minimum Penalty amount with filing currency

0

Yes

**ANG**

Amount

\-

(RiADNS) Reissue maximum penalty amount with filing currency

0

Yes

**ANT**

Amount

\-

(RiBDNS) Reissue maximum penalty amount for the ticket

0

Yes

**ANI**

Amount

\-

(ReADNS) Revalidation minimum Penalty amount with sale currency

0

Yes

**ANU**

Amount

\-

(ReADNS) Revalidation maximum penalty amount with sale currency

0

Yes

**ANH**

Amount

\-

(ReADNS) Revalidation minimum Penalty amount with filing currency

0

Yes

**ANL**

Amount

\-

(ReADNS) Revalidation maximum penalty amount with filing currency

0

Yes

**ANC**

Amount

\-

(ReBDNS) Revalidation maximum penalty amount for the ticket

0

Yes

**ANV**

Date

\-

(RiADNS) Ticket validity date

No limit for validity date

No

**Note:** Mini Rules does not know a priori the Reissue conditions, so this is the reason why a penaltybracket (minimum/maximum penalty per fare component and maximum penalty per ticket) is proposed.

An amount is always returned in both minimum and maximum penalty fields.  If it is a fixed amount, then the same amount will be returned in both fields.

If the reissue/revalidation is not allowed, then the minimum and the maximum penalty is returned with an amount set to 0.

**Note:** The penalty amounts take into account the penalties for reissue and revalidation.

**Note:** Waivers fare property only indicates if a penalty may be waived, however, the type of waiver is not returned.

This codeset is dismissed and the process always send an hardcoded value 0

## 3.5.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<mnrRulesInfoGrp> <mnrCatInfo> <descriptionInfo> <number>31</number> </descriptionInfo> </mnrCatInfo> <mnrFCInfoGrp> <refInfo> <referenceDetails> <type>FC</type> <value>1</value> </referenceDetails> </refInfo> </mnrFCInfoGrp> <mnrDateInfoGrp> <dateInfo> <dateAndTimeDetails> <qualifier>BDV</qualifier> <date>11APR12</date> <time>0</time> </dateAndTimeDetails> </dateInfo> </mnrDateInfoGrp> <mnrMonInfoGrp> <monetaryInfo> <monetaryDetails> <typeQualifier>BDM</typeQualifier> <amount>35.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BDX</typeQualifier> <amount>35.00</amount> <currency>EUR</currency> </monetaryDetails> </monetaryInfo> </mnrMonInfoGrp> <mnrRestriAppInfoGrp> <mnrRestriAppInfo> <statusInformation> <indicator>BDA</indicator> <action>1</action> </statusInformation> </mnrRestriAppInfo> </mnrRestriAppInfoGrp> </mnrRulesInfoGrp>

* * *

## 3.6 Sub Structure: mnrRulesInfoGrp: Cat 16/31- with localization

## 3.6.1 Description

**mnrCatInfo**: contains the category number and the processing indicator

• number : category number 

• processIndicator: if codeset 'ASS' is returned then the category assumption applies. Assumption for category 5 is that open segments including open returns are permitted.

• name : category description

• freeText : category description localized

• language 

• encoding  

  
**mnrCatLoc**: contains the category information

• catOrder : Order of display

• catAssumption : Assumption information localized

• language 

• encoding  

  
**mnrFCInfoGrp**: contains Ids of fare components that share the same property for the category

  
**mnrDateInfoGrp**: contains date information

• qualifier: may contain the following values

\- ERD: Earliest reservation date before departure

\- LRD: Last reservation date before departure

\- ETD: Earliest ticketing date before departure

\- LTD: Last ticketing date before departure

\- LTR: Last ticketing date after reservation

• date: contains the date

• time: contains time

• **mnrDateLoc**: contains the date information localized

\- freeText: description localized

\- textType : reference to situation code

\- infoType : reference to typeQualifier

\- language : 

\- encoding : 

**mnrMonInfoGrp**: contains monetary information

• typeQualifier: may contain the following values

• amount: contains the amount

• currency: contains the currency

**mnrMonLoc**: contains the monetary information localized

\- freeText: description localized

\- textType : reference to situation code

\- infoType : reference to typeQualifier

\- language : 

\- encoding : 

**mnrRestriAppInfoGrp**: contains restrictions applicability information

• indicator: contains the restriction type

  
• action: contains restriction value

• **mnrRestriAppLoc**: contains the restriction information localized

\- freeText: description localized

\- textType : reference to situation code

\- infoType : reference to typeQualifier

\- language : 

\- encoding : 

## 3.6.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<message agency="1A" release="1" type="TMRXRR" version="18"> <mnrRulesInfoGrp> <mnrCatInfo> <descriptionInfo> <number>31</number> <name>VOLUNTARY\_CHANGES</name> <language>EN</language> <encoding>7</encoding> <freeText>Change conditions</freeText> </descriptionInfo> <processIndicator>ASS</processIndicator> </mnrCatInfo> <mnrCatLoc> <catOrder> <itemNumberDetails> <number>0</number> </itemNumberDetails> </catOrder> <catAssumption> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <language>EN</language> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>Maximun Stay</freeText> </catAssumption> </mnrCatLoc> <mnrFCInfoGrp> <refInfo> <referenceDetails> <type>FC</type> <value>1</value> </referenceDetails> </refInfo> </mnrFCInfoGrp> <mnrDateInfoGrp> <dateInfo> <dateAndTimeDetails> <qualifier>BDV</qualifier> <date>23MAR18</date> <time>0</time> </dateAndTimeDetails> <dateAndTimeDetails> <qualifier>BNV</qualifier> <date>23MAR18</date> <time>0</time> </dateAndTimeDetails> <dateAndTimeDetails> <qualifier>ETD</qualifier> <date>20FEB2017</date> </dateAndTimeDetails> </dateInfo> <mnrDateLoc> <ruleText> <textType>BEFORE\_DEPARTURE</textType> <infoType>BDV</infoType> <freeText>Earliest ticketing date before departure 20 February 2017</freeText> <language>EN</language> <encoding>7</encoding> </ruleText> </mnrDateLoc> <mnrDateLoc> <ruleText> <textType>BEFORE\_DEPARTURE</textType> <infoType>BNV</infoType> <freeText>Earliest ticketing date before departure 20 February 2017</freeText> <language>EN</language> <encoding>7</encoding> </ruleText> </mnrDateLoc> <mnrDateLoc> <ruleText> <textType>BEFORE\_DEPARTURE</textType> <infoType>ETD</infoType> <freeText>Earliest ticketing date before departure 20 February 2017</freeText> <language>EN</language> <encoding>7</encoding> </ruleText> </mnrDateLoc> </mnrDateInfoGrp> <mnrMonInfoGrp> <monetaryInfo> <monetaryDetails> <typeQualifier>BDM</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BDX</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BDF</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BDG</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BDT</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BDI</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BDU</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BDH</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BDL</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BDC</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BNM</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BNX</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BNF</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BNG</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BNT</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BNI</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BNU</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BNH</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BNL</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BNC</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> </monetaryInfo> <mnrMonLoc> <ruleText> <textType>BEFORE\_DEPARTURE</textType> <infoType>BDM</infoType> <freeText>BDM will cost 0.00 EUR</freeText> <language>EN</language> <encoding>7</encoding> </ruleText> </mnrMonLoc> <mnrMonLoc> <ruleText> <textType>BEFORE\_DEPARTURE</textType> <infoType>BDM</infoType> <freeText>BDM will cost 0,00 EUR</freeText> <language>EN</language> <encoding>7</encoding> </ruleText> </mnrMonLoc> </mnrMonInfoGrp> <mnrRestriAppInfoGrp> <mnrRestriAppInfo> <statusInformation> <indicator>FFT</indicator> <action>0</action> </statusInformation> <statusInformation> <indicator>WAI</indicator> <action>0</action> </statusInformation> <statusInformation> <indicator>RVA</indicator> <action>0</action> </statusInformation> <statusInformation> <indicator>BDA</indicator> <action>1</action> </statusInformation> <statusInformation> <indicator>BNW</indicator> <action>0</action> </statusInformation> <statusInformation> <indicator>BNR</indicator> <action>0</action> </statusInformation> <statusInformation> <indicator>BNA</indicator> <action>1</action> </statusInformation> <statusInformation> <indicator>ADW</indicator> <action>0</action> </statusInformation> <statusInformation> <indicator>ADR</indicator> <action>0</action> </statusInformation> <statusInformation> <indicator>ADA</indicator> <action>0</action> </statusInformation> <statusInformation> <indicator>ANW</indicator> <action>0</action> </statusInformation> <statusInformation> <indicator>ANR</indicator> <action>0</action> </statusInformation> <statusInformation> <indicator>ANA</indicator> <action>0</action> </statusInformation> <statusInformation> <indicator>GUA</indicator> <action>1</action> </statusInformation> </mnrRestriAppInfo> <mnrRestriAppLoc> <ruleText> <textType>BEFORE\_DEPARTURE</textType> <infoType>FFT</infoType> <freeText>FFT is 0</freeText> <language>EN</language> <encoding>7</encoding> </ruleText> </mnrRestriAppLoc> </mnrRestriAppInfoGrp> </mnrRulesInfoGrp> <mnrRulesInfoGrp> <mnrCatInfo> <descriptionInfo> <number>33</number> <name>VOLUNTARY\_CHANGES</name> <language>EN</language> <encoding>7</encoding> <freeText>Change conditions</freeText> </descriptionInfo> <processIndicator>ASS</processIndicator> </mnrCatInfo> <mnrCatLoc> <catOrder> <itemNumberDetails> <number>0</number> </itemNumberDetails> </catOrder> <catAssumption> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <language>EN</language> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>Maximun Stay</freeText> </catAssumption> </mnrCatLoc> <mnrFCInfoGrp> <refInfo> <referenceDetails> <type>FC</type> <value>1</value> </referenceDetails> </refInfo> </mnrFCInfoGrp> <mnrMonInfoGrp> <monetaryInfo> <monetaryDetails> <typeQualifier>BDM</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BDX</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BDF</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BDG</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BDT</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BNM</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BNX</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BNF</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BNG</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BNT</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>ADM</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>ADX</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>ADF</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>ADG</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>ADT</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>ANM</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>ANX</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>ANF</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>ANG</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>ANT</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> </monetaryInfo> </mnrMonInfoGrp> <mnrRestriAppInfoGrp> <mnrRestriAppInfo> <statusInformation> <indicator>FFT</indicator> <action>1</action> </statusInformation> <statusInformation> <indicator>BDA</indicator> <action>1</action> </statusInformation> <statusInformation> <indicator>BNA</indicator> <action>1</action> </statusInformation> <statusInformation> <indicator>ADA</indicator> <action>1</action> </statusInformation> <statusInformation> <indicator>ANA</indicator> <action>1</action> </statusInformation> <statusInformation> <indicator>GUA</indicator> <action>0</action> </statusInformation> </mnrRestriAppInfo> </mnrRestriAppInfoGrp> </mnrRulesInfoGrp> </message>

* * *

## 3.7 Sub Structure: mnrRulesInfoGrp: Cat 16/33 Refund

## 3.7.1 Description

For Cat 33, mnrRulesInfoGrp part may contain the following information:

mnrCatInfo: contains the category number and the processing indicator

-   number : category number '33'
-   processIndicator: if codeset 'ASS' is returned then the category assumption applies. Assumption for category 33 is "Refundable without penalties".

mnrFCInfoGrp: contains Ids of fare components that share the same property for the category

mnrDateInfoGrp: contains date information

-   qualifier: may contain the following values

            - **BDV:** Ticket validity date Before departure

            - **BNV:** Ticket validity date Before departure no show

            - **ADV:** Ticket validity date after departure

            - **ANV:** Ticket validity date after departure no show

-   date: contains the date
-   time: contains time

if a field is not returned, the default value applies: 'No limit for validaty date'

mnrMonInfoGrp: contains monetary and penalty information

monetaryInfo: contains monetary information  

-    
    -   typeQualifier: may contain the following values

 - **GUA:** Amount Guaranteed flag for cat 31/33

 - **BDA**: Refund before departure allowed

 - **BDM**: Minimum Penalty amount with sale currency

 - **BDX**: Maximum penality amount before departure

 - **BDF**: Minimum Penalty amount with filing currency

 - **BDG**: Maximum penalty amount with filing currency

 - **BDT**: Maximum penality amount for the ticket

 - **BNA**: Refund before departure allowed

 - **BNM**: Minimum Penalty amount with sale currency

 - **BNX**: Maximum penalty amount with sale currency

 - **BNF**: Minimum Penalty amount with filing currency

 - **BNG**: Maximum penalty amount with filing currency

 - **BNT**: Maximum penality amount for the ticket before departure no show

 - **ADA**: Refund after departure allowed

 - **ADM**: Minimum Penalty amount with sale currency

 - **ADX**: Maximum penalty amount with sale currency         

 - **ADF**: Minimum Penalty amount with filing currency

 - **ADG**: Maximum penalty amount with filing currency

 - **ADT**: Maximum penalty amount for the ticket

 - **ANA**: Refund after departure(RfBD) allowed

 - **ANM**: Minimum Penalty amount with sale currency after departure 

 - **ANX**: Maximum penalty amount with sale currency After departure

 - **ANF**: Minimum Penalty amount with filing currency

 - **ANG**: Maximum penalty amount with filing currency

 - **ANT**: Maximum penalty amount for the ticket

-    
    -   amount: contains the amount
    -   currency: contains the currency

if a field is not returned, the default value applies: '0

penaltyInfo: contains penalty details and their validity duration

-   qualifier: may contain the following values

 - **BDP:** Penalty details before departure

 - **BNP**: Penalty details before departure (no show)

 - **ADP**: Penalty details after departure

 - **ANP**: Penalty details after departure (no show)

-   applicabilityIndicator: 
    -   0 = non-refundable
    -   1 = refundable
-   amount: Penalty amount
-   currency: Penalty currency
-   numberOfMonths: Duration of the restriction in months
-   numberOfDays: Duration of the restriction in days
-   numberOfHours: Duration of the restriction in hours
-   numberOfMinutes: Duration of the restriction in minutes

mnrRestriAppInfoGrp: contains restrictions applicability information

-   indicator: contains the restriction type
-   action: contains restriction value

Table below shows the different cases.

**Field name**

**Situation**

**Type**

**Value**

**Description**

**Default value**

**Default value mapped in the output**

**FFT**

All

Flag

0: No free form text from Cat16  
1: Part of the rule is free form text from Cat16

Part of rule is free form text

No free form text

Yes

**GUA**

All

Flag

0: Guaranteed

1: Not guaranteed

GUA : Amount Guaranteed flag for cat 31/33

0

Yes

**BDA**

Before departure

Flag

0: Not allowed  
1: Allowed with restrictions

Refund before departure(RfBD) allowed

Not Allowed

Yes

**BDM**

Amount

\-

(RfBD) Minimum Penalty amount with sale currency

0

Yes

**BDX**

Amount

\-

(RfBD) Maximum penalty amount with sale currency

0

Yes

**BDF**

Amount

\-

(RfBD) Minimum Penalty amount with filing currency

0

Yes

**BDG**

Amount

\-

(RfBD) Maximum penalty amount with filing currency

0

Yes

**BDT**

Amount

\-

(RfBD) Maximum penalty amount with filing currency

0

Yes

**BDV**

Date

\-

(RfBD) Ticket validity date

No limit for validity date

No

**BDP**

Penalty Details

\-

Penalty details before departure

NA

No

**BNA**

Before departure no show

Flag

0: Not allowed  
1: Allowed with restrictions

Refund before departure(RfBD) allowed

Not Allowed

Yes

**BNM**

Amount

\-

(RfBD) Minimum Penalty amount with sale currency

0

Yes

**BNX**

Amount

\-

(RfBD) Maximum penalty amount with sale currency

0

Yes

**BNF**

Amount

\-

(RfBD) Minimum Penalty amount with filing currency

0

Yes

**BNG**

Amount

\-

(RfBD) Maximum penalty amount with filing currency

0

Yes

**BNT**

Amount

\-

(RfBD) Maximum penalty amount for the ticket

0

Yes

**BNV**

Date

\-

(RfBD) Ticket validity date

No limit for validity date

No

**BNP**

Penalty Details  

\-

Penalty details before departure no show

NA

No

**ADA**

After departure

Flag

0: Not allowed  
1: Allowed with restrictions

Refund after departure(RfBD) allowed

Not Allowed

Yes

**ADM**

Amount

\-

(RfBD) Minimum Penalty amount with sale currency

0

Yes

**ADX**

Amount

\-

(RfBD) Maximum penalty amount with sale currency

0

Yes

**ADF**

Amount

\-

(RfBD) Minimum Penalty amount with filing currency

0

Yes

**ADG**

Amount

\-

(RfBD) Maximum penalty amount with filing currency

0

Yes

**ADT**

Amount

\-

(RfBD) Maximum penalty amount for the ticket

0

Yes

**ADV**

Date

\-

(RfBD) Ticket validity date

No limit for validity date

No

**ADP**

Penalty Details

\-

Penalty details after departure

NA

No

**ANA**

After departure no show

Flag

\-

Refund after departure(RfBD) allowed

Not Allowed

Yes

**ANM**

Amount

\-

(RfBD) Minimum Penalty amount with sale currency

0

Yes

**ANX**

Amount

\-

(RfBD) Minimum Penalty amount with sale currency

0

Yes

**ANF**

Amount

\-

(RfBD) Minimum Penalty amount with filing currency

0

Yes

**ANG**

Amount

\-

(RfBD) Maximum penalty amount with filing currency

0

Yes

**ANT**

Amount

\-

(RfBD) Maximum penalty amount for the ticket

0

Yes

**ANV**

Date

\-

(RfBD) Ticket validity date

No limit for validity date

No

**ANP**

Penalty Details

\-

Penalty details after departure no show

NA

No

**Note:** Mini Rules does not know a priori the Refund conditions, so this is the reason why a penalty bracket (minimum/maximum penalty per fare component and maximum penalty per ticket) is proposed.

An amount is always returned in both minimum and maximum penalty fields.  If it is a fixed amount, then the same amount will be returned in both fields.

If the refund is not allowed, then the minimum and the maximum penalty is returned with an amountset to 0.

## 3.7.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<mnrRulesInfoGrp> <mnrCatInfo> <descriptionInfo> <number>33</number> </descriptionInfo> </mnrCatInfo> <mnrFCInfoGrp> <refInfo> <referenceDetails> <type>FC</type> <value>1</value> </referenceDetails> </refInfo> </mnrFCInfoGrp> <mnrDateInfoGrp> <dateInfo> <dateAndTimeDetails> <qualifier>BDV</qualifier> <date>11APR12</date> <time>0</time> </dateAndTimeDetails> </dateInfo> </mnrDateInfoGrp> <mnrMonInfoGrp> <monetaryInfo> <monetaryDetails> <typeQualifier>BDM</typeQualifier> <amount>35.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BDX</typeQualifier> <amount>35.00</amount> <currency>EUR</currency> </monetaryDetails> </monetaryInfo> <penaltyInfo> <penaltyDetails> <qualifier>BDP</qualifier> <applicabilityIndicator>1</applicabilityIndicator> <amount>25.00</amount> <currency>EUR</currency> <numberOfMonths></numberOfMonths> <numberOfDays>72</numberOfDays> <numberOfHours></numberOfHours> <numberOfMinutes></numberOfMinutes> </penaltyDetails> <penaltyDetails> <qualifier>BDP</qualifier> <applicabilityIndicator>1</applicabilityIndicator> <amount>45.00</amount> <currency>EUR</currency> <numberOfMonths></numberOfMonths> <numberOfDays>24</numberOfDays> <numberOfHours></numberOfHours> <numberOfMinutes></numberOfMinutes> </penaltyDetails> </penaltyInfo> </mnrMonInfoGrp> <mnrRestriAppInfoGrp> <mnrRestriAppInfo> <statusInformation> <indicator>BDA</indicator> <action>1</action> </statusInformation> </mnrRestriAppInfo> </mnrRestriAppInfoGrp> </mnrRulesInfoGrp>

* * *

## 3.8 Sub Structure: mnrRulesInfoGrp: Cat 5 Advance Reservation/Ticketing

## 3.8.1 Description

For Cat 5, mnrRulesInfoGrp part may contain the following information:

mnrCatInfo: contains the category number and the processing indicator

-   number : category number '5'
-   processIndicator: if codeset 'ASS' is returned then the category assumption applies. Assumption for category 5 is that open segments including open returns are permitted.

mnrFCInfoGrp: contains Ids of fare components that share the same property for the category

mnrDateInfoGrp: contains date information

-   qualifier: may contain the following values

  - **ERD**: Earliest reservation date before departure (date block)

  - **LRD**: Latest reservation date before departure (date block) 

  - **ETD**: Earliest ticketing date before departure (date block)

  - **LTD**: Latest ticketing date before departure (date block)

  - **LTR**: Latest ticketing date after reservation (date block)

date: contains the date

-   time: contains time

if a field is not returned, the default value "No restriction" applies for it.

## 3.8.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<mnrRulesInfoGrp> <mnrCatInfo> <descriptionInfo> <number>5</number> </descriptionInfo> <processIndicator>ASS</processIndicator> </mnrCatInfo> <mnrFCInfoGrp> <refInfo> <referenceDetails> <type>FC</type> <value>1</value> </referenceDetails> </refInfo> </mnrFCInfoGrp> </mnrRulesInfoGrp>

* * *

## 3.9 Sub Structure: mnrRulesInfoGrp: Cat 6 Minimum Stay

## 3.9.1 Description

For Cat 6, mnrRulesInfoGrp part may contain the following information:

mnrCatInfo: contains the category number and the processing indicator

-   number : category number '6'
-   processIndicator: if codeset 'ASS' is returned then the category assumption applies. Assumption for category 6 is "no minimum stay requirement"

mnrFCInfoGrp:

-   refInfo: contains Id of fare components
-   locationInfo: contains the location info for the minimum stay

           -locationType: contains codeset '25', it means that the location is a city code

           -locationDescription: contains the city code

mnrDateInfoGrp: contains date information

-   qualifier:  contains code set 'MIS'

\- **MIS**: Minimum stay datedate: contains the date

-   date: contains the date
-   time: contains the time

if field is not returned, the default value "No restriction" applies.

Table below shows the different cases:

**Field name**

**Type**

 ****Value****

**Description**

**Default value**

**Default value mapped in the output**

MIS

Date

Minimum stay date

Minimum stay date

No

No

## 3.9.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<mnrRulesInfoGrp> <mnrCatInfo> <descriptionInfo> <number>6</number> </descriptionInfo> <processIndicator>ASS</processIndicator> </mnrCatInfo> <mnrFCInfoGrp> <refInfo> <referenceDetails> <type>FC</type> <value>1</value> </referenceDetails> </refInfo> </mnrFCInfoGrp> </mnrRulesInfoGrp>

* * *

## 3.10 Sub Structure: mnrRulesInfoGrp: Cat 7 Maximum Stay

## 3.10.1 Description

For Cat 7, mnrRulesInfoGrp part may contain the following information:

mnrCatInfo: contains the category number and the processing indicator

-   number : category number '7'
-   processIndicator: if codeset 'ASS' is returned then the category assumption applies. Assumption for category 7 is "no maximum stay requirement"

mnrFCInfoGrp:

-   refInfo: contains Id of fare components
-   locationInfo: contains the location info for the maximum stay

           -locationType: contains codeset '25', it means that the location is a city code

           -locationDescription: contains the city code

mnrDateInfoGrp: contains date information

-   qualifier:  may contain the following values

         - **MSP**: Travel must be completed before date

         - **MSC**: Travel must commence before date

-   date: contains the date
-   time: contains the time

if a field is not returned, the default value applies: 'No Restriction'.

Table below shows the different cases:

**Field name**

**Type**

**Value**

**Description**

**Default value**

**Default value mapped in the output**

**MSP**

Date

\-

Travel must be completed before date

No restriction

No

**MSC**

Date

\-

Travel must commence before date

No restriction

No

## 3.10.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<mnrRulesInfoGrp> <mnrCatInfo> <descriptionInfo> <number>7</number> </descriptionInfo> <processIndicator>ASS</processIndicator> </mnrCatInfo> <mnrFCInfoGrp> <refInfo> <referenceDetails> <type>FC</type> <value>1</value> </referenceDetails> </refInfo> </mnrFCInfoGrp> </mnrRulesInfoGrp>

* * *

## 3.11 Sub Structure: offerRef

## 3.11.1 Description

This sub-part contains the Offer Id if applicable:

-   type : contains codeset "OF"
-   value : contains Offer Id

## 3.11.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<offerRef> <reference> <type>OF</type> <value>1</value> </reference> </offerRef>

* * *

## 3.12 Sub Structure: paxRef

## 3.12.1 Description

This part contains references of associated passengers:

-   Type: contains  'P' for Passenger , 'PA' for adult passenger or 'PI' for Infant passenger
-   Value: Passenger/Infant Tatoo

## 3.12.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<paxRef> <passengerReference> <type>PA</type> <value>1</value> </passengerReference> </paxRef>

* * *

## 3.13 Sub Structure: pricingRecordID

## 3.13.1 Description

This mandatory sub structure of groupEntities allows to define the set of elements from whom we will retrieve the mini rules.

It has two elements : 

• referenceType: contains one of the following codeset:

\- "TST": to target a TST

\- "PQR": to target a PQR

\- "OF": to target an Offer

\- "TKT": to target a TKT

\- "PNR" : to target a PNR

\- "FRN": to target a fare recommendation

\- "FUN": to target a fare Upsell recomendation

• uniqueReference: contains TST tatoo, ticket number, PNR recloc, fare recommendation, PQR Offer Id, fare upsell recomendation, keyword 'ALL'

## 3.13.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<pricingRecordID> <referenceType>TST</referenceType> <uniqueReference>1</uniqueReference> </pricingRecordID>

* * *

## 3.14 Sub Structure: responseDetails

## 3.14.1 Description

This mandatory part contains the output status code, it will have one of the next codeset  :

• O : transaction processed successfully

• N : Error occurred

## 3.14.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<responseDetails> <statusCode>O</statusCode> </responseDetails>

* * *

## 4 Error Messages

Note that the errors could be returned at different level:

-   global level: in case the error is raised by security check or format check functionalities. Note that the statusCode in responseDetails element then returned with "N" status, meaning that an error occurred.
-   document level: in case the error is specific to a document.Note that the statusCode in responseDetails element could be either returned:
    -   with "O" status (successful) - if at least the mini-rules are returned for one document (in this case, the partial warning is returned).
    -   with "N" status (error) - if all documents are returning an error. 

**Level**

**Message**

**Code**

**Reference type**

**Description**

Global

RESTRICTED

_(CM# 20)_

**ALL**

Displayed when user does not have the correct rights to display the mini-rules.

Global

INVALID FORMAT

_(CM# 477)_

**ALL**

Returned when input format is incorrect.

Global

OPTIONS NOT COMBINABLE

_(CM# 5490)_

**ALL**

Returned when a mix of reference type is received in input.

Global

INVALID PASSENGER SELECTION

_(CM# 4845)_

**ALL**

Returned when passenger tattoo received in input does not exist in the PNR.

Global

INVALID SEGMENT SELECTION

_(CM# 24361)_

**ALL**

Returned when segment tattoo received in input does not exist in the PNR.

Document

INVALID TST NUMBER

_(CM# 24361)_

**TST**

Returned when TST tattoo received in input does not exist.

Document

INVALID PQR NUMBER

_(CM# 29143)_

**PQR**

Returned when PQR tattoo received in input does not exist.

Document

CHECK OFFER NUMBER

_(CM# 27628)_

**OF**

Returned when offer number received in input does not exist.

Document

INVALID AIR OFFER

_(CM# 27629)_

**OF**

Returned when offer exists, but is not an Air offer.

Document

INVALID CONTEXT - PNRRELOC MISMATCH

_(CM# 32660)_

**PNR**

The PNR record locator in input must correspond to the PNR record locator of the PNR context.

Document

NO FARE RULES FOUND

_(CM# 27149)_

**ALL**

Returned when one of the following situations happen:

-   Pricing or upsell context does not exist.
-   No mini-rule information found in the storage checked (TST, PQR, pricing context, upsell context)

Document

INVALID RECOMMENDATION NUMBER

_(CM# 9396)_

**FRN or FUN**

Returned when one of the following situations happen:

-   Fare recommendation tattoo does not correspond to a fare recommendation stored in the pricing context (reference type = FRN)
-   Fare upsell tattoo does not correspond to a fare upsell stored in the upsell context (reference type = FUN)

  
  

## 4.1 Error Reply

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<MiniRule\_GetFromRecReply xmlns="http://xml.amadeus.com/TMRXRR\_23\_1\_1A"> <responseDetails> <statusCode>N</statusCode> </responseDetails> <errorWarningGroup> <errorOrWarningCodeDetails> <errorDetails> <errorCode>32660</errorCode> <errorCategory>EC</errorCategory> </errorDetails> </errorOrWarningCodeDetails> <errorWarningDescription> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <language>EN</language> <source>S</source> <encoding>1</encoding> </freeTextDetails> <freeText>INVALID CONTEXT - PNRRELOC MISMATCH</freeText> </errorWarningDescription> </errorWarningGroup> </MiniRule\_GetFromRecReply>

  

* * *

## 5 Operations

## 5.1 Operation: Specific TST

Get Mini Rules for a list of TSTs

## 5.1.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<MiniRule\_GetFromRec xmlns="http://xml.amadeus.com/TMRXRQ\_23\_1\_1A"> <language> <languageQualifier>EN</languageQualifier> </language> <groupRecords> <recordID> <referenceType>TST</referenceType> <uniqueReference>1</uniqueReference> </recordID> </groupRecords> <groupRecords> <recordID> <referenceType>TST</referenceType> <uniqueReference>2</uniqueReference> </recordID> </groupRecords> </MiniRule\_GetFromRec>

## 5.1.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<MiniRule\_GetFromRecReply xmlns="http://xml.amadeus.com/TMRXRR\_23\_1\_1A"> <responseDetails> <statusCode>O</statusCode> </responseDetails> <language> <languageQualifier>5</languageQualifier> <languageDetails> <languageCode>EN</languageCode> </languageDetails> </language> <mnrByPricingRecord> <pricingRecordId> <referenceType>TST</referenceType> <uniqueReference>1</uniqueReference> </pricingRecordId> <paxRef> <passengerReference> <type>PA</type> <value>1</value> </passengerReference> </paxRef> <paxTypeLoc> <paxCode> <statusInformation> <indicator>PA</indicator> </statusInformation> </paxCode> <paxTypeDescription> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <language>EN</language> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>Adult</freeText> </paxTypeDescription> </paxTypeLoc> <fareComponentInfo> <fareQualifierDetails> <additionalFareDetails> <rateClass>Y3FFWDE</rateClass> </additionalFareDetails> </fareQualifierDetails> <fareComponentRef> <referenceDetails> <type>PU</type> <value>NPU</value> </referenceDetails> <referenceDetails> <type>FC</type> <value>1</value> </referenceDetails> </fareComponentRef> <originAndDestination> <origin>FRA</origin> <destination>PAR</destination> </originAndDestination> <originDestinLoc> <originDestinCode> <statusInformation> <indicator>FRA</indicator> </statusInformation> </originDestinCode> <originDestinDescription> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <language>EN</language> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>Frankfurt</freeText> </originDestinDescription> </originDestinLoc> <originDestinLoc> <originDestinCode> <statusInformation> <indicator>PAR</indicator> </statusInformation> </originDestinCode> <originDestinDescription> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <language>EN</language> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>Paris</freeText> </originDestinDescription> </originDestinLoc> <segmentRefernce> <reference> <type>ST</type> <value>1</value> </reference> </segmentRefernce> </fareComponentInfo> <listSituation> <listSituationDum> </listSituationDum> <situationCode> <statusInformation> <description>BEFORE\_DEPARTURE</description> </statusInformation> </situationCode> <situationDescription> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <language>EN</language> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>Before departure</freeText> </situationDescription> </listSituation> <listSituation> <listSituationDum> </listSituationDum> <situationCode> <statusInformation> <description>AFTER\_DEPARTURE</description> </statusInformation> </situationCode> <situationDescription> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <language>EN</language> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>After departure</freeText> </situationDescription> </listSituation> <mnrRulesInfoGrp> <mnrCatInfo> <descriptionInfo> <number>5</number> <name>VOLUNTARY\_CHANGES</name> <language>EN</language> <encoding>7</encoding> <freeText>Change conditions</freeText> </descriptionInfo> <processIndicator>ASS</processIndicator> </mnrCatInfo> <mnrCatLoc> <catOrder> <itemNumberDetails> <number>0</number> </itemNumberDetails> </catOrder> <catAssumption> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <language>EN</language> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>Maximun Stay</freeText> </catAssumption> </mnrCatLoc> <mnrFCInfoGrp> <refInfo> <referenceDetails> <type>FC</type> <value>1</value> </referenceDetails> </refInfo> </mnrFCInfoGrp> </mnrRulesInfoGrp> <mnrRulesInfoGrp> <mnrCatInfo> <descriptionInfo> <number>6</number> <name>VOLUNTARY\_CHANGES</name> <language>EN</language> <encoding>7</encoding> <freeText>Change conditions</freeText> </descriptionInfo> <processIndicator>ASS</processIndicator> </mnrCatInfo> <mnrCatLoc> <catOrder> <itemNumberDetails> <number>0</number> </itemNumberDetails> </catOrder> <catAssumption> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <language>EN</language> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>Maximun Stay</freeText> </catAssumption> </mnrCatLoc> <mnrFCInfoGrp> <refInfo> <referenceDetails> <type>FC</type> <value>1</value> </referenceDetails> </refInfo> </mnrFCInfoGrp> </mnrRulesInfoGrp> <mnrRulesInfoGrp> <mnrCatInfo> <descriptionInfo> <number>7</number> <name>VOLUNTARY\_CHANGES</name> <language>EN</language> <encoding>7</encoding> <freeText>Change conditions</freeText> </descriptionInfo> <processIndicator>ASS</processIndicator> </mnrCatInfo> <mnrCatLoc> <catOrder> <itemNumberDetails> <number>0</number> </itemNumberDetails> </catOrder> <catAssumption> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <language>EN</language> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>Maximun Stay</freeText> </catAssumption> </mnrCatLoc> <mnrFCInfoGrp> <refInfo> <referenceDetails> <type>FC</type> <value>1</value> </referenceDetails> </refInfo> <locationInfo> <locationType>25</locationType> <locationDescription> <code>ORY</code> </locationDescription> </locationInfo> </mnrFCInfoGrp> </mnrRulesInfoGrp> <mnrRulesInfoGrp> <mnrCatInfo> <descriptionInfo> <number>31</number> <name>VOLUNTARY\_CHANGES</name> <language>EN</language> <encoding>7</encoding> <freeText>Change conditions</freeText> </descriptionInfo> <processIndicator>ASS</processIndicator> </mnrCatInfo> <mnrCatLoc> <catOrder> <itemNumberDetails> <number>0</number> </itemNumberDetails> </catOrder> <catAssumption> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <language>EN</language> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>Maximun Stay</freeText> </catAssumption> </mnrCatLoc> <mnrFCInfoGrp> <refInfo> <referenceDetails> <type>FC</type> <value>1</value> </referenceDetails> </refInfo> </mnrFCInfoGrp> <mnrDateInfoGrp> <dateInfo> <dateAndTimeDetails> <qualifier>BDV</qualifier> <date>23MAR18</date> <time>0000</time> </dateAndTimeDetails> <dateAndTimeDetails> <qualifier>BNV</qualifier> <date>23MAR18</date> <time>0000</time> </dateAndTimeDetails> <dateAndTimeDetails> <qualifier>ETD</qualifier> <date>20FEB2017</date> </dateAndTimeDetails> </dateInfo> <mnrDateLoc> <ruleText> <textType>BEFORE\_DEPARTURE</textType> <infoType>BDV</infoType> <freeText>Earliest ticketing date before departure 20 February 2017</freeText> <language>EN</language> <encoding>7</encoding> </ruleText> </mnrDateLoc> <mnrDateLoc> <ruleText> <textType>BEFORE\_DEPARTURE</textType> <infoType>BNV</infoType> <freeText>Earliest ticketing date before departure 20 February 2017</freeText> <language>EN</language> <encoding>7</encoding> </ruleText> </mnrDateLoc> <mnrDateLoc> <ruleText> <textType>BEFORE\_DEPARTURE</textType> <infoType>ETD</infoType> <freeText>Earliest ticketing date before departure 20 February 2017</freeText> <language>EN</language> <encoding>7</encoding> </ruleText> </mnrDateLoc> </mnrDateInfoGrp> <mnrMonInfoGrp> <monetaryInfo> <monetaryDetails> <typeQualifier>BDM</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BDX</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BDF</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BDG</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BDT</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BDI</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BDU</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BDH</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BDL</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BDC</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BNM</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BNX</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BNF</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BNG</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BNT</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BNI</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BNU</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BNH</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BNL</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BNC</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> </monetaryInfo> <mnrMonLoc> <ruleText> <textType>BEFORE\_DEPARTURE</textType> <infoType>BDM</infoType> <freeText>BDM will cost 0.00 EUR</freeText> <language>EN</language> <encoding>7</encoding> </ruleText> </mnrMonLoc> <mnrMonLoc> <ruleText> <textType>BEFORE\_DEPARTURE</textType> <infoType>BDM</infoType> <freeText>BDM will cost 0,00 EUR</freeText> <language>EN</language> <encoding>7</encoding> </ruleText> </mnrMonLoc> </mnrMonInfoGrp> <mnrRestriAppInfoGrp> <mnrRestriAppInfo> <statusInformation> <indicator>FFT</indicator> <action>0</action> </statusInformation> <statusInformation> <indicator>WAI</indicator> <action>0</action> </statusInformation> <statusInformation> <indicator>RVA</indicator> <action>0</action> </statusInformation> <statusInformation> <indicator>BDA</indicator> <action>1</action> </statusInformation> <statusInformation> <indicator>BNW</indicator> <action>0</action> </statusInformation> <statusInformation> <indicator>BNR</indicator> <action>0</action> </statusInformation> <statusInformation> <indicator>BNA</indicator> <action>1</action> </statusInformation> <statusInformation> <indicator>ADW</indicator> <action>0</action> </statusInformation> <statusInformation> <indicator>ADR</indicator> <action>0</action> </statusInformation> <statusInformation> <indicator>ADA</indicator> <action>0</action> </statusInformation> <statusInformation> <indicator>ANW</indicator> <action>0</action> </statusInformation> <statusInformation> <indicator>ANR</indicator> <action>0</action> </statusInformation> <statusInformation> <indicator>ANA</indicator> <action>0</action> </statusInformation> <statusInformation> <indicator>GUA</indicator> <action>1</action> </statusInformation> </mnrRestriAppInfo> <mnrRestriAppLoc> <ruleText> <textType>BEFORE\_DEPARTURE</textType> <infoType>FFT</infoType> <freeText>FFT is 0</freeText> <language>EN</language> <encoding>7</encoding> </ruleText> </mnrRestriAppLoc> </mnrRestriAppInfoGrp> </mnrRulesInfoGrp> <mnrRulesInfoGrp> <mnrCatInfo> <descriptionInfo> <number>33</number> <name>VOLUNTARY\_CHANGES</name> <language>EN</language> <encoding>7</encoding> <freeText>Change conditions</freeText> </descriptionInfo> <processIndicator>ASS</processIndicator> </mnrCatInfo> <mnrCatLoc> <catOrder> <itemNumberDetails> <number>0</number> </itemNumberDetails> </catOrder> <catAssumption> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <language>EN</language> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>Maximun Stay</freeText> </catAssumption> </mnrCatLoc> <mnrFCInfoGrp> <refInfo> <referenceDetails> <type>FC</type> <value>1</value> </referenceDetails> </refInfo> </mnrFCInfoGrp> <mnrMonInfoGrp> <monetaryInfo> <monetaryDetails> <typeQualifier>BDM</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BDX</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BDF</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BDG</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BDT</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BNM</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BNX</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BNF</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BNG</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BNT</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>ADM</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>ADX</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>ADF</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>ADG</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>ADT</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>ANM</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>ANX</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>ANF</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>ANG</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>ANT</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> </monetaryInfo> </mnrMonInfoGrp> <mnrRestriAppInfoGrp> <mnrRestriAppInfo> <statusInformation> <indicator>FFT</indicator> <action>1</action> </statusInformation> <statusInformation> <indicator>BDA</indicator> <action>1</action> </statusInformation> <statusInformation> <indicator>BNA</indicator> <action>1</action> </statusInformation> <statusInformation> <indicator>ADA</indicator> <action>1</action> </statusInformation> <statusInformation> <indicator>ANA</indicator> <action>1</action> </statusInformation> <statusInformation> <indicator>GUA</indicator> <action>0</action> </statusInformation> </mnrRestriAppInfo> </mnrRestriAppInfoGrp> </mnrRulesInfoGrp> </mnrByPricingRecord> <mnrByPricingRecord> <pricingRecordId> <referenceType>TST</referenceType> <uniqueReference>2</uniqueReference> </pricingRecordId> <paxRef> <passengerReference> <type>PA</type> <value>2</value> </passengerReference> </paxRef> <fareComponentInfo> <fareQualifierDetails> <additionalFareDetails> <rateClass>Y3WKWDE</rateClass> </additionalFareDetails> </fareQualifierDetails> <fareComponentRef> <referenceDetails> <type>PU</type> <value>NPU</value> </referenceDetails> <referenceDetails> <type>FC</type> <value>1</value> </referenceDetails> </fareComponentRef> <originAndDestination> <origin>FRA</origin> <destination>PAR</destination> </originAndDestination> <segmentRefernce> <reference> <type>ST</type> <value>1</value> </reference> </segmentRefernce> </fareComponentInfo> <mnrRulesInfoGrp> <mnrCatInfo> <descriptionInfo> <number>5</number> <name>PIO</name> <language>EN</language> <encoding>7</encoding> </descriptionInfo> <processIndicator>ASS</processIndicator> </mnrCatInfo> <mnrFCInfoGrp> <refInfo> <referenceDetails> <type>FC</type> <value>1</value> </referenceDetails> </refInfo> </mnrFCInfoGrp> </mnrRulesInfoGrp> <mnrRulesInfoGrp> <mnrCatInfo> <descriptionInfo> <number>6</number> </descriptionInfo> <processIndicator>ASS</processIndicator> </mnrCatInfo> <mnrFCInfoGrp> <refInfo> <referenceDetails> <type>FC</type> <value>1</value> </referenceDetails> </refInfo> </mnrFCInfoGrp> </mnrRulesInfoGrp> <mnrRulesInfoGrp> <mnrCatInfo> <descriptionInfo> <number>7</number> </descriptionInfo> <processIndicator>ASS</processIndicator> </mnrCatInfo> <mnrFCInfoGrp> <refInfo> <referenceDetails> <type>FC</type> <value>1</value> </referenceDetails> </refInfo> </mnrFCInfoGrp> </mnrRulesInfoGrp> <mnrRulesInfoGrp> <mnrCatInfo> <descriptionInfo> <number>31</number> </descriptionInfo> </mnrCatInfo> <mnrFCInfoGrp> <refInfo> <referenceDetails> <type>FC</type> <value>1</value> </referenceDetails> </refInfo> </mnrFCInfoGrp> <mnrDateInfoGrp> <dateInfo> <dateAndTimeDetails> <qualifier>BDV</qualifier> <date>23MAR18</date> <time>0000</time> </dateAndTimeDetails> </dateInfo> </mnrDateInfoGrp> <mnrMonInfoGrp> <monetaryInfo> <monetaryDetails> <typeQualifier>BDM</typeQualifier> <amount>70.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BDX</typeQualifier> <amount>70.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BDF</typeQualifier> <amount>70.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BDG</typeQualifier> <amount>70.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BDT</typeQualifier> <amount>70.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BDI</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BDU</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BDH</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BDL</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BDC</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BNM</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BNX</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BNF</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BNG</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BNT</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BNI</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BNU</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BNH</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BNL</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BNC</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> </monetaryInfo> </mnrMonInfoGrp> <mnrMonInfoGrp> <monetaryInfo> <monetaryDetails> <typeQualifier>ADM</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>ADX</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>ADF</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>ADG</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>ADT</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>ADI</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>ADU</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>ADH</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>ADL</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>ADC</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>ANM</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>ANX</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>ANF</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>ANG</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>ANT</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>ANI</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>ANU</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>ANH</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>ANL</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>ANC</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> </monetaryInfo> </mnrMonInfoGrp> <mnrRestriAppInfoGrp> <mnrRestriAppInfo> <statusInformation> <indicator>FFT</indicator> <action>0</action> </statusInformation> <statusInformation> <indicator>WAI</indicator> <action>0</action> </statusInformation> <statusInformation> <indicator>RVA</indicator> <action>0</action> </statusInformation> <statusInformation> <indicator>BDA</indicator> <action>1</action> </statusInformation> <statusInformation> <indicator>BNW</indicator> <action>0</action> </statusInformation> <statusInformation> <indicator>BNR</indicator> <action>0</action> </statusInformation> <statusInformation> <indicator>BNA</indicator> <action>0</action> </statusInformation> <statusInformation> <indicator>ADW</indicator> <action>0</action> </statusInformation> <statusInformation> <indicator>ADR</indicator> <action>0</action> </statusInformation> <statusInformation> <indicator>ADA</indicator> <action>0</action> </statusInformation> <statusInformation> <indicator>ANW</indicator> <action>0</action> </statusInformation> <statusInformation> <indicator>ANR</indicator> <action>0</action> </statusInformation> <statusInformation> <indicator>ANA</indicator> <action>0</action> </statusInformation> <statusInformation> <indicator>GUA</indicator> <action>1</action> </statusInformation> </mnrRestriAppInfo> </mnrRestriAppInfoGrp> </mnrRulesInfoGrp> <mnrRulesInfoGrp> <mnrCatInfo> <descriptionInfo> <number>33</number> </descriptionInfo> </mnrCatInfo> <mnrFCInfoGrp> <refInfo> <referenceDetails> <type>FC</type> <value>1</value> </referenceDetails> </refInfo> </mnrFCInfoGrp> <mnrMonInfoGrp> <monetaryInfo> <monetaryDetails> <typeQualifier>BDM</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BDX</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BDF</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BDG</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BDT</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BNM</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BNX</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BNF</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BNG</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BNT</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>ADM</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>ADX</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>ADF</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>ADG</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>ADT</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>ANM</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>ANX</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>ANF</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>ANG</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>ANT</typeQualifier> <amount>0.00</amount> <currency>EUR</currency> </monetaryDetails> </monetaryInfo> </mnrMonInfoGrp> <mnrRestriAppInfoGrp> <mnrRestriAppInfo> <statusInformation> <indicator>FFT</indicator> <action>1</action> </statusInformation> <statusInformation> <indicator>BDA</indicator> <action>0</action> </statusInformation> <statusInformation> <indicator>BNA</indicator> <action>0</action> </statusInformation> <statusInformation> <indicator>ADA</indicator> <action>0</action> </statusInformation> <statusInformation> <indicator>ANA</indicator> <action>0</action> </statusInformation> <statusInformation> <indicator>GUA</indicator> <action>0</action> </statusInformation> </mnrRestriAppInfo> </mnrRestriAppInfoGrp> </mnrRulesInfoGrp> </mnrByPricingRecord> </MiniRule\_GetFromRecReply>

## 5.1.3 Possible Errors

See "Error Messages" section.

* * *