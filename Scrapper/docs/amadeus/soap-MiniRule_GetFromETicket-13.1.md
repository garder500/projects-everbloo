---
url: "https://developers.amadeus.com/api-library/soap/functional-doc/2236/doc-read/107010?serviceVersion=13.1"
download_url: "https://developers.amadeus.com/PAS-EAS/api/download/comp/4d4ad2cb456c02633f463a055ab70584/107010/upload_508997647393840519.html"
title: "HTML_UG_WBS_MiniRule_GetFromETicket_TMRERQ_13.1_028"
source: "amadeus"
service_id: "2236"
service_name: "MiniRule_GetFromETicket"
version: "13.1"
document_id: "107010"
doc_version: "13.1"
doc_type: "User guide"
file_format: "HTML"
scraped_at: "2026-07-15T10:30:09.721Z"
---
# Function: MiniRule\_GetFromETicket

* * *

## 1 Overview

Amadeus Mini Rules provides to the user a summary of the most important fare conditions in a structured format.

MiniRule\_GetFromETicket function provides the possibility to retrieve those Mini Rules directly from an e-ticket.

## 1.1 Supported Operations

There is one supported operation: only one e-ticket number can be sent by the user. The system returns the Mini Rules that are related to the e-ticket.

style='mso-ansi-language:EN'>MiniRule\_GetFromETicket function provides the possibility to retrieve those Mini Rules directly from an e-ticket.

## 1.2 Limitations

In order to retrieve Mini Rules from an e-ticket, the system tries to find the corresponding Passenger Name Record (PNR) first. Thus, if the PNR is already purged (a few days after the last flight), the Mini Rules will not be found.  For instance, in case of a ticket transfer from a PNR to another followed by a revalidation, the pricing options cannot be found if the first PNR is purged.

## 1.3 Unsupported Operations

Not applicable

## 1.4 Prerequisites

Access to Mini Rules product: the field ‘MNR’ of the office profile has to be set to ‘YES’.

## 2 Building A Query

### Description

This verb is a standalone message. Thus, there is no need to be in a PNR context in order to send the query. The user has to enter the e-ticket number in the right format: 13 digits without any separation.

For example, the following query is sent to retrieve Mini Rules from the e-ticket 123 4567891011.

### XML Structure

_<ticketNumber>_

                _<documentDetails>_

                                _<number>12345678990123</number>_

                _</documentDetails>_

_</ticketNumber>_

There is only one XML section in this message.  It is used to send the e-ticket number for which the Mini Rules are requested. 

## 3 Receiving A Reply

The reply contains Mini Rules. They are divided into categories and are assigned at fare components level.

In the response, the reponseDetail segment says whether the process is done or not.  If the process fails, the system will return the appropriate error message. Otherwise the system returns the record ID (the ticket number), the details of the fare components and the fare properties by category and fare component. For every fare component, the system list the categories assumed for that fare component.

### Reply Substructure: Status Code

Description

The status code section identifies whether the message was processed successfully.

### XML Structure

_<responseDetails\>_

                _<statusCode\>O</statusCode\>_

_<responseDetails\>_

### Reply Substructure: Error

_Description_

This section will provide an error that may be returned in the case of a processing issue.  Please refer to _error messages_ section to find the full list of possible errors.

XML Structure

_<errorWarningGroup>_

                _<errorOrWarningCodeDetails\>_

                                _<errorDetails>_

                                                _<errorCode\>20</errorCode\>_

                                                _<errorCategory\>EC</errorCategory\>_

                                                _<errorCodeOwner\>ZZZ</errorCodeOwner\>_

                                _</errorDetails>_

                _<errorOrWarningCodeDetails\>_

                _<errorWarningDescription>_

                                _<freeTextDetails>_

                                                _<textSubjectQualifier\>3</textSubjectQualifier\>_

                                                _<language></language>_

                                                _<source>S</source>_

                                                _<encoding>1</encoding>_

                                _</freeTextDetails>_

                                _<freeText\>RESTRICTED</freeText\>_

                _</errorOrWarningCodeDetails\>_

_</errorWarningGroup>_

### Reply Substructure: Ticket Number Details

_Description_

This section is subsection of _Mini Rules by pricing record group_ and contains the ticket number sent in the query.

XML Structure

<pricingRecordId>

<referenceType\>TKT</referenceType\>

<uniqueReference\>1052450409510</uniqueReference\>

</pricingRecordId>

### Reply Substructure:  fare component information group

_Description_

This section is also a subsection of _Mini Rules by pricing record group._ The user can find there the fare basis code in the fare qualifier details section. In addition, List of fare components and their corresponding segments are sent in this section.

XML Structure

_<fareComponentInfo>_

_<fareQualifierDetails>_

_<additionalFareDetails\>_

_<rateClass\>YIF</rateClass\>_

_</additionalFareDetails\>_

_</fareQualifierDetails>_

_<fareComponentRef>_

_<referenceDetails\>_

_<type>PU</type>_

_<value>NPU</value>_

_</referenceDetails\>_

_<referenceDetails\>_

_<type>FC</type>_

_<value>1</value>_

_</referenceDetails\>_

_</fareComponentRef>_

_<originAndDestination\>_

_<origin>BRU</origin>_

_<destination>LON</destination>_

_</originAndDestination\>_

_<segmentRefernce>_

_<reference>_

_<type>CPN</type>_

_<value>1</value>_

_</reference>_

_</segmentRefernce>_

_</fareComponentInfo>_

### Reply Substructure: Mini Rules group

_Description_

This section is also a subsection of _Mini Rules by pricing record group_ in which the Mini Rules are returned as well as the number of the fare component that they are related to. The Mini Rules dates’ information, the monetary information and Mini Rules restriction are returned in this section whether they are applicable. In the following example, it is stated that the category 5 of the Mini Rules are assumed for the fare component number 1. The Mini Rules dates’ information, the monetary information and Mini Rules restriction are not returned because there are not applicable.

XML Structure

_<mnrRulesInfoGrp>_

_<mnrCatInfo>_

_<descriptionInfo>_

_<number>**5**</number>_

_</descriptionInfo>_

_<processIndicator\>**ASS**</processIndicator\>_

_</mnrCatInfo>_

_<mnrFCInfoGrp>_

_<refInfo>_

_<referenceDetails\>_

_<type>**FC**</type>_

_<value>**1**</value>_

_</referenceDetails\>_

_</refInfo>_

_</mnrFCInfoGrp>_

_</mnrRulesInfoGrp>_

## 3.1 Sub Structure: errorWarningGroup

## 3.1.1 Description

If an error or warning occurred during processing this group contains the error or warning details.

It is composed of two sub segments :

-   ErrorOrWarningCodeDetails 
    -   Error code
    -   Error category: 'EC' for Errors and 'WEC' for Warnings
-   ErrorWarningDescription
    -   Text Subject Qualifier: contains codeset 3 for 'Literal Text'
    -   Language: contains language code
    -   Source coded: contains codeset S for 'Link'
    -   Encoding: contains codeset 1 for 'ASCII 7 bit'
    -   Error free text

For list of error messages,See "Error Messages" section

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

This sub structure details the mini rules informations.

It contains the next segments and sub structure (sub structure are detailed apart) : 

-   pricingRecordID: TST/PQR Id / fareRecommendation : Fare recommendationnumber / Ticket Number
-   errorWarningGroup : error or warning messages (same structure as errorWanrningGroup at upper level)
-   offerRef: Offer Id if applicable (PQR case)
-   paxRef: Ids of passengers associated to the TST/PQR
-   paxTypeLoc : Localization of pax type
-   fareComponentInfo: Details of fare components
-   mnrRulesInfoGrp : Fare properties by category and fare component

## 3.3.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<mnrByPricingRecord> <pricingRecordId> <referenceType>TKT</referenceType> <uniqueReference>572387659043</uniqueReference> </pricingRecordId> <fareComponentInfo> <fareQualifierDetails> <additionalFareDetails></additionalFareDetails> <rateClass>Y3FFWDE</rateClass> </fareQualifierDetails> <fareComponentRef> <referenceDetails> <type>PU</type> <value>NPU</value> </referenceDetails> <referenceDetails> <type>FC</type> <value>1</value> </referenceDetails> </fareComponentRef> <originAndDestination> <origin>FRA</origin> <destination>PAR</destination> </originAndDestination> <segmentRefernce> <reference> <type>CPN</type> <value>1</value> </reference> </segmentRefernce> </fareComponentInfo> <mnrRulesInfoGrp> </mnrRulesInfoGrp> </mnrByPricingRecord>

* * *

## 3.4 Sub Structure: mnrRulesInfoGrp: Cat 16/31 Changes/Reissue

## 3.4.1 Description

For Cat 31, mnrRulesInfoGrp part may contain the following information:

mnrCatInfo: contains the category number and the processing indicator

-   number : category number '31'
-   processIndicator: if codeset 'ASS' is returned then the category assumption applies = Not allowed

mnrFCInfoGrp: contains Ids of fare components that share the same property for the category

mnrDateInfoGrp: contains date information

-   qualifier: may contain the following values

  - **BDV**: Ticket validity date Before departure

  - **RVA**: Revalidation before departure is allowed

  - **BDA**: Reissue before departure is allowed

  - **BNV**: Ticket validity date Before departure no show

  - **ADV**: Ticket validity date after departure

  - **ANV**: Ticket validity date after departure no show

  - **ADR**: Revalidation after departure is allowed

  - **ADA**: Reissue after departure allowed

date: contains the date

-   time: contains time

if a field is not returned, the default value applies: 'No limit for validaty date'

mnrMonInfoGrp: contains monetary information

-   typeQualifier: may contain the following values

   - **GUA:**  Amount Guaranteed flag for cat 31/33

 - **WAI**: Penalties can be waived for passenger and family death/illness

      - This codeset is dismissed and the process always sends an hardcoded value 0

 - **BDM**: Reissue minimum Penalty amount with sale currency

 - **BDX**: Reissue maximum penalty amount with sale currency

 - **BDF**: Reissue minimum Penalty amount with filing currency

 - **BGD**: Reissue maximum penalty amount with filing currency

 - **BDT**: Reissue maximum penalty amount for the ticket

 - **BDI**: Revalidation minimum Penalty amount with sale currency

 - **BDU**: Revalidation maximum penalty amount with sale currency

 - **BDH**: Revalidation minimum Penalty amount with filing currency

 - **BDL**: Revalidation maximum penalty amount with filing currency

 - **BDC**: Revalidation maximum penalty amount for the ticket

 - **BNW**: Penalties can be waived for passenger and family death/illness

     - This codeset is dismissed and the process always sends an hardcoded value 0

 - **BNR**: Revalidation before departure when no show is allowed

 - **BNA**: Reissue before departure when no show is allowed

 - **BNM**: Reissue minimum Penalty amount with sale currency

 - **BNX**: Reissue maximum penalty amount with sale currency

 - **BNF**: Reissue minimum penalty amount with filing currency

 - **BNG**: Reissue maximum penalty amount with filing currency

 - **BNT**: Reissue maximum penalty amount for the ticket

 - **BNI**: Reissue minimum penalty amount for the ticket

 - **BNU**: Revalidation maximum penalty amount with sale currency

 - **BNH**: Revalidation maximum penalty amount with sale currency

 - **BNL**: Revalidation maximum penalty amount with filing currency

 - **BNC**: Revalidation maximum penalty amount for the ticket

 - **ADW**: Penalties can be waived for passenger and family death/illness

       -  This codeset is dismissed and the process always sends an hardcoded value 0

 - **ADM**: Reissue minimum Penalty amount with sale currency

 - **ADX**: Maximum penality amount After departure

 - **ADF**: Reissue minimum Penalty amount with filing currency

 - **ADT**: Reissue maximum penalty amount for the ticket

 - **ADG**: Reissue maximum penalty amount with filing currency

 - **ADI**: Revalidation minimum Penalty amount with sale currency

 - **ADU**: Revalidation  Maximum penalty amount with sale currency

 - **ADH**: Revalidation Minimum Penalty amount with filing currency

 - **ADL**: Revalidation Maximum penalty amount with filing currency

 - **ADC**: Revalidation Maximum penalty amount for the ticket

 - **ANW**: Penalties can be waived for passenger and family death/illness

      - This codeset is dismissed and the process always sends an hardcoded value 0

 - **ANR**: Revalidation after departure when no show is allowed

 - **ANA**: Reissue after departure when no show allowed

 - **ANM**: Reissue minimum Penalty amount with sale currency

 - **ANX**: Reissue maximum penalty amount with filing currency

 - **ANF**: Reissue minimum Penalty amount with filing currency

 - **ANG**: Reissue minimum Penalty amount with filing currency

 - **ANT**: Reissue maximum penalty amount for the ticket

 - **ANI**: Revalidation minimum Penalty amount with sale currency

 - **ANU**: Revalidation maximum penalty amount with sale currency

 - **ANH**: Revalidation minimum Penalty amount with filing currency

 - **ANL**: Revalidation maximum penalty amount for the ticket

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

**Default value mapped in the output**

**FFT**

All

Flag

0: No free form text from Cat16  
1: Part of the rule is free form text from Cat16

Part of rule is free form text from Cat16

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

Penalties can be waived for passenger and family death/illness

The value is dimissed

No waiver

 This codeset is dismissed and the process always sends an hardcoded value 0  

**RVA**

Flag

0: Reval not allowed  
1:  Reval Allowed with restrictions

Revalidation before departure is allowed

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

(RiBD)  Reissue minimum Penalty amount with sale currency

0

Yes

**BDX**

Amount

\-

(RiBD) Reissue maximum penalty amount with sale currency

0

Yes

**BDF**

Amount

\-

(RiBD)  Reissue minimum Penalty amount with filing currency

0

Yes

**BDG**

Amount

\-

(RiBD) Reissue maximum penalty amount with filing currency

0

Yes

**BDT**

Amount

\-

(RiBD) Reissue maximum penalty amount for the ticket

0

Yes

**BDI**

Amount

\-

(ReBD)  Revalidation minimum Penalty amount with sale currency

0

Yes

**BDU**

Amount

\-

(ReBD) Revalidation maximum penalty amount with sale currency

0

Yes

**BDH**

Amount

\-

(ReBD)  Revalidation minimum Penalty amount with filing currency

0

Yes

**BDL**

Amount

\-

(ReBD) Revalidation maximum penalty amount with filing currency

0

Yes

**BDC**

Amount

\-

(ReBD) Revalidation maximum penalty amount for the ticket

0

Yes

**BDV**

Date

\-

(RiBD) Ticket validity date

No limit for validity date

No

**BNW**

Before departure no show

Flag

Value hardcoded to 0

Penalties can be waived for passenger and family death/illness

The value is dimissed

No waiver

This codeset is dismissed and the process always sends an hardcoded value 0  

**BNR**

Flag

0: Reval not allowed  
1:  Reval Allowed with restrictions

Revalidation before departure when no show(ReBDNS) is allowed

Not Allowed

Yes

**BNA**

Flag

0: Not allowed  
1: Allowed with restrictions

Reissue before departure when no show(RiBDNS) allowed

Not Allowed

Yes

**BNM**

Amount

\-

(RiBDNS) Reissue minimum Penalty amount with sale currency

0

Yes

**BNX**

Amount

\-

(RiBDNS) Reissue maximum penalty amount with sale currency

0

Yes

**BNF**

Amount

\-

(RiBDNS) Reissue minimum Penalty amount with filing currency

0

Yes

**BNG**

Amount

\-

(RiBDNS) Reissue maximum penalty amount with filing currency

0

Yes

**BNT**

Amount

\-

(RiBDNS) Reissue maximum penalty amount for the ticket

0

Yes

**BNI**

Amount

\-

(ReBDNS) Revalidation minimum Penalty amount with sale currency

0

Yes

**BNU**

Amount

\-

(ReBDNS) Revalidation maximum penalty amount with sale currency

0

Yes

**BNH**

Amount

\-

(ReBDNS) Revalidation maximum penalty amount with sale currency

0

Yes

**BNL**

Amount

\-

(ReBDNS) Revalidation maximum penalty amount with filing currency

0

Yes

**BNC**

Amount

\-

(ReBDNS) Revalidation maximum penalty amount for the ticket

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

Penalties can be waived for passenger and family death/illness

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

Reissue after departure (RiAD) allowed

Not Allowed

Yes

**ADM**

Amount

\-

(RiAD) Reissue minimum Penalty amount with sale currency

0

Yes

**ADX**

Amount

\-

(RiAD) Reissue maximum penalty amount with filing currency

0

Yes

**ADF**

Amount

\-

(RiAD) Reissue minimum Penalty amount with filing currency

0

Yes

**ADG**

Amount

\-

(RiAD) Reissue maximum penalty amount with filing currency

0

Yes

**ADT**

Amount

\-

(RiAD) Reissue maximum penalty amount for the ticket

0

Yes

**ADI**

Amount

\-

(ReAD) Revalidation minimum Penalty amount with sale currency

0

Yes

**ADU**

Amount

\-

(ReAD) Revalidation  Maximum penalty amount with sale currency

0

Yes

**ADH**

Amount

\-

(ReAD) Revalidation Minimum Penalty amount with filing currency

0

Yes

**ADL**

Amount

\-

(ReAD) Revalidation Maximum penalty amount with filing currency

0

Yes

**ADC**

Amount

\-

(ReAD) Revalidation Maximum penalty amount for the ticket

0

Yes

**ADV**

Date

\-

(RiAD) Ticket validity date

0

Yes

**ANW**

After departure no show

Flag

Value hardcoded to 0

Penalties can be waived for passenger and family death/illness

The value is dimissed

No waiver

This codeset is dismissed and the process always sends an hardcoded value 0

**ANR**

Flag

0: Reval not allowed  
1:  Reval Allowed with restrictions

Revalidation after departure when no show is allowed

Not Allowed

Yes

**ANA**

Flag

0: Not allowed  
1: Allowed with restrictions

Reissue after departure when no show(RiADNS) allowed

Not Allowed

Yes

**ANM**

Amount

\-

(RiADNS) Reissue minimum Penalty amount with sale currency

0

Yes

**ANX**

Amount

\-

(RiADNS) Reissue maximum penalty amount with sale currency

0

Yes

**ANF**

Amount

\-

(RiADNS) Reissue minimum Penalty amount with filing currency

0

Yes

**ANG**

Amount

\-

(RiADNS) Reissue maximum penalty amount with filing currency

0

Yes

**ANT**

Amount

\-

(RiBDNS) Reissue maximum penalty amount for the ticket

0

Yes

**ANI**

Amount

\-

(ReADNS) Revalidation minimum Penalty amount with sale currency

0

Yes

**ANU**

Amount

\-

(ReADNS) Revalidation maximum penalty amount with sale currency

0

Yes

**ANH**

Amount

\-

(ReADNS) Revalidation minimum Penalty amount with filing currency

0

Yes

**ANL**

Amount

\-

(ReADNS) Revalidation maximum penalty amount with filing currency

0

Yes

**ANC**

Amount

\-

(ReBDNS) Revalidation maximum penalty amount for the ticket

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

## 3.4.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<mnrRulesInfoGrp> <mnrCatInfo> <descriptionInfo> <number>31</number> </descriptionInfo> </mnrCatInfo> <mnrFCInfoGrp> <refInfo> <referenceDetails> <type>FC</type> <value>1</value> </referenceDetails> </refInfo> </mnrFCInfoGrp> <mnrDateInfoGrp> <dateInfo> <dateAndTimeDetails> <qualifier>BDV</qualifier> <date>11APR12</date> <time>0</time> </dateAndTimeDetails> </dateInfo> </mnrDateInfoGrp> <mnrMonInfoGrp> <monetaryInfo> <monetaryDetails> <typeQualifier>BDM</typeQualifier> <amount>35.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BDX</typeQualifier> <amount>35.00</amount> <currency>EUR</currency> </monetaryDetails> </monetaryInfo> </mnrMonInfoGrp> <mnrRestriAppInfoGrp> <mnrRestriAppInfo> <statusInformation> <indicator>BDA</indicator> <action>1</action> </statusInformation> </mnrRestriAppInfo> </mnrRestriAppInfoGrp> </mnrRulesInfoGrp>

* * *

## 3.5 Sub Structure: mnrRulesInfoGrp: Cat 16/33 Refund

## 3.5.1 Description

For Cat 33, mnrRulesInfoGrp part may contain the following information: mnrCatInfo: contains the category number and the processing indicator number : category number '33' processIndicator: if codeset 'ASS' is returned then the category assumption applies. Assumption for category 33 is "Refundable without penalties". mnrFCInfoGrp: contains Ids of fare components that share the same property for the category mnrDateInfoGrp: contains date information qualifier: may contain the following values - BDV: Ticket validity date Before departure - BNV: Ticket validity date Before departure no show - ADV: Ticket validity date after departure - ANV: Ticket validity date after departure no show date: contains the date time: contains time if a field is not returned, the default value applies: 'No limit for validaty date' mnrMonInfoGrp: contains monetary information typeQualifier: may contain the following values - BDV: Ticket validity date Before departure - BNV: Ticket validity date Before departure no show - ADV: Ticket validity date after departure - ANV: Ticket validity date after departure no show date: contains the date time: contains time if a field is not returned, the default value applies: 'No limit for validaty date' mnrMonInfoGrp: contains monetary information typeQualifier: may contain the following values - GUA: Amount Guaranteed flag for cat 31/33 - BDA: Refund before departure allowed - BDM: Minimum Penalty amount with sale currency - BDX: Maximum penality amount before departure - BDF: Minimum Penalty amount with filing currency - BDG: Maximum penalty amount with filing currency - BDT: Maximum penality amount for the ticket - BNA: Refund before departure allowed - BNM: Minimum Penalty amount with sale currency - BNX: Maximum penalty amount with sale currency - BNF: Minimum Penalty amount with filing currency - BNG: Maximum penalty amount with filing currency - BNT: Maximum penality amount for the ticket before departure no show - ADA: Refund after departure allowed - ADM: Minimum Penalty amount with sale currency - ADX: Maximum penalty amount with sale currency - ADF: Minimum Penalty amount with filing currency - ADG: Maximum penalty amount with filing currency - ADT: Maximum penalty amount for the ticket - ANA: Refund after departure(RfBD) allowed - ANM: Minimum Penalty amount with sale currency after departure - ANX: Maximum penalty amount with sale currency After departure - ANF: Minimum Penalty amount with filing currency - ANG: Maximum penalty amount with filing currency - ANT: Maximum penalty amount for the ticket amount: contains the amount currency: contains the currency if a field is not returned, the default value applies: '0' mnrRestriAppInfoGrp: contains restrictions applicability information indicator: contains the restriction type action: contains restriction value Table below shows the different cases. Field name Situation Type Value Description Default value Default value mapped in the output FFT All Flag 0: No free form text from Cat16 1: Part of the rule is free form text from Cat16 Part of rule is free form text No free form text Yes GUA All Flag 0: Guaranteed 1: Not guaranteed GUA : Amount Guaranteed flag for cat 31/33 0 Yes BDA Before departure Flag 0: Not allowed 1: Allowed with restrictions Refund before departure(RfBD) allowed Not Allowed Yes BDM Amount - (RfBD) Minimum Penalty amount with sale currency 0 Yes BDX Amount - (RfBD) Maximum penalty amount with sale currency 0 Yes BDF Amount - (RfBD) Minimum Penalty amount with filing currency 0 Yes BDG Amount - (RfBD) Maximum penalty amount with filing currency 0 Yes BDT Amount - (RfBD) Maximum penalty amount with filing currency 0 Yes BDV Date - (RfBD) Ticket validity date No limit for validity date No BNA Before departure no show Flag 0: Not allowed 1: Allowed with restrictions Refund before departure(RfBD) allowed Not Allowed Yes BNM Amount - (RfBD) Minimum Penalty amount with sale currency 0 Yes BNX Amount - (RfBD) Maximum penalty amount with sale currency 0 Yes BNF Amount - (RfBD) Minimum Penalty amount with filing currency 0 Yes BNG Amount - (RfBD) Maximum penalty amount with filing currency 0 Yes BNT Amount - (RfBD) Maximum penalty amount for the ticket 0 Yes BNV Date - (RfBD) Ticket validity date No limit for validity date No ADA After departure Flag 0: Not allowed 1: Allowed with restrictions Refund after departure(RfBD) allowed Not Allowed Yes ADM Amount - (RfBD) Minimum Penalty amount with sale currency 0 Yes ADX Amount - (RfBD) Maximum penalty amount with sale currency 0 Yes ADF Amount - (RfBD) Minimum Penalty amount with filing currency 0 Yes ADG Amount - (RfBD) Maximum penalty amount with filing currency 0 Yes ADT Amount - (RfBD) Maximum penalty amount for the ticket 0 Yes ADV Date - (RfBD) Ticket validity date No limit for validity date No ANA After departure no show Flag - Refund after departure(RfBD) allowed Not Allowed Yes ANM Amount - (RfBD) Minimum Penalty amount with sale currency 0 Yes ANX Amount - (RfBD) Minimum Penalty amount with sale currency 0 Yes ANF Amount - (RfBD) Minimum Penalty amount with filing currency 0 Yes ANG Amount - (RfBD) Maximum penalty amount with filing currency 0 Yes ANT Amount - (RfBD) Maximum penalty amount for the ticket 0 Yes ANV Date - (RfBD) Ticket validity date No limit for validity date No Note: Mini Rules does not know a priori the Refund conditions, so this is the reason why a penalty bracket (minimum/maximum penalty per fare component and maximum penalty per ticket) is proposed. An amount is always returned in both minimum and maximum penalty fields. If it is a fixed amount, then the same amount will be returned in both fields. If the refund is not allowed, then the minimum and the maximum penalty is returned with an amountset to 0.

## 3.5.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<mnrRulesInfoGrp> <mnrCatInfo> <descriptionInfo> <number>33</number> </descriptionInfo> </mnrCatInfo> <mnrFCInfoGrp> <refInfo> <referenceDetails> <type>FC</type> <value>1</value> </referenceDetails> </refInfo> </mnrFCInfoGrp> <mnrDateInfoGrp> <dateInfo> <dateAndTimeDetails> <qualifier>BDV</qualifier> <date>11APR12</date> <time>0</time> </dateAndTimeDetails> </dateInfo> </mnrDateInfoGrp> <mnrMonInfoGrp> <monetaryInfo> <monetaryDetails> <typeQualifier>BDM</typeQualifier> <amount>35.00</amount> <currency>EUR</currency> </monetaryDetails> <monetaryDetails> <typeQualifier>BDX</typeQualifier> <amount>35.00</amount> <currency>EUR</currency> </monetaryDetails> </monetaryInfo> </mnrMonInfoGrp> <mnrRestriAppInfoGrp> <mnrRestriAppInfo> <statusInformation> <indicator>BDA</indicator> <action>1</action> </statusInformation> </mnrRestriAppInfo> </mnrRestriAppInfoGrp> </mnrRulesInfoGrp>

* * *

## 3.6 Sub Structure: mnrRulesInfoGrp: Cat 5 Advance Reservation/Ticketing

## 3.6.1 Description

For Cat 5, mnrRulesInfoGrp part may contain the following information:

mnrCatInfo: contains the category number and the processing indicator

-   number : category number '5'
-   processIndicator: if codeset 'ASS' is returned then the category assumption applies. Assumption for category 5 is that open segments including open returns are permitted.

mnrFCInfoGrp: contains Ids of fare components that share the same property for the category

mnrDateInfoGrp: contains date information

-   qualifier: may contain the following values

  - **ERD**: Earliest reservation date before departure (date block)

  - **LRD**: Latest reservation date before departure (date block) 

  - **ETD**: Earliest ticketing date before departure (date block)

  - **LTD**: Latest ticketing date before departure (date block)

  - **LTR**: Latest ticketing date after reservation (date block)

date: contains the date

-   time: contains time

if a field is not returned, the default value "No restriction" applies for it.

## 3.6.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<mnrRulesInfoGrp> <mnrCatInfo> <descriptionInfo> <number>5</number> </descriptionInfo> <processIndicator>ASS</processIndicator> </mnrCatInfo> <mnrFCInfoGrp> <refInfo> <referenceDetails> <type>FC</type> <value>1</value> </referenceDetails> </refInfo> </mnrFCInfoGrp> </mnrRulesInfoGrp>

* * *

## 3.7 Sub Structure: mnrRulesInfoGrp: Cat 6 Minimum Stay

## 3.7.1 Description

For Cat 6, mnrRulesInfoGrp part may contain the following information:

mnrCatInfo: contains the category number and the processing indicator

-   number : category number '6'
-   processIndicator: if codeset 'ASS' is returned then the category assumption applies. Assumption for category 6 is "no minimum stay requirement"

mnrFCInfoGrp:

-   refInfo: contains Id of fare components
-   locationInfo: contains the location info for the minimum stay

           -locationType: contains codeset '25', it means that the location is a city code

           -locationDescription: contains the city code

mnrDateInfoGrp: contains date information

-   qualifier:  contains code set 'MIS'

\- **MIS**: Minimum stay datedate: contains the date

-   date: contains the date
-   time: contains the time

if field is not returned, the default value "No restriction" applies.

Table below shows the different cases:

**Field name**

**Type**

 ****Value****

**Description**

**Default value**

**Default value mapped in the output**

MIS

Date

Minimum stay date

Minimum stay date

No

No

## 3.7.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<mnrRulesInfoGrp> <mnrCatInfo> <descriptionInfo> <number>6</number> </descriptionInfo> <processIndicator>ASS</processIndicator> </mnrCatInfo> <mnrFCInfoGrp> <refInfo> <referenceDetails> <type>FC</type> <value>1</value> </referenceDetails> </refInfo> </mnrFCInfoGrp> </mnrRulesInfoGrp>

* * *

## 4 Error Messages

**Error code**

**Error messages**

**Explanation**

20

RESTRICTED

The user tries to retrieve Mini Rules from an office in which the MNR field of the office profile is set to ‘NO’

2075

INVALID FORMAT

The e-ticket number in the query is not entered in the right format

1908

TICKET NUMBER NOT FOUND

The system cannot find the e-ticket for which the Mini Rules are requested

8311

NO FARE RULES FOUND

No Mini Rules is appended to the e-ticket

## 4.1 Error Reply

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<MiniRule\_GetFromETicketReply xmlns="http://xml.amadeus.com/TMRERR\_13\_1\_1A"> <responseDetails> <statusCode>N</statusCode> </responseDetails> <errorWarningGroup> <errorOrWarningCodeDetails> <errorDetails> <errorCode>29149</errorCode> <errorCategory>EC</errorCategory> </errorDetails> </errorOrWarningCodeDetails> <errorWarningDescription> <freeTextDetails> <textSubjectQualifier>831</textSubjectQualifier> <language>EN</language> <source>S</source> <encoding>1</encoding> </freeTextDetails> <freeText>NO FARE RULES FOUND</freeText> </errorWarningDescription> </errorWarningGroup> </MiniRule\_GetFromETicketReply>

  

* * *

## 5 Operations

## 5.1 Operation: Display Mini Rules from an e-ticket

User wants to display Mini Rules corresponding to the e-ticket number 1234567891987.

## 5.1.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<MiniRule\_GetFromETicket xmlns="http://xml.amadeus.com/TMRERQ\_13\_1\_1A"> <ticketNumber> <documentDetails> <number>1234567891987</number> </documentDetails> </ticketNumber> </MiniRule\_GetFromETicket>

## 5.1.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<MiniRule\_GetFromETicketReply xmlns="http://xml.amadeus.com/TMRERR\_13\_1\_1A"> <responseDetails> <statusCode>O</statusCode> </responseDetails> <mnrByPricingRecord> <pricingRecordId> <referenceType>1</referenceType> </pricingRecordId> <fareComponentInfo> <fareQualifierDetails> <additionalFareDetails> <rateClass>CIF</rateClass> </additionalFareDetails> </fareQualifierDetails> <fareComponentRef> <referenceDetails> <type>PU</type> <value>NPU</value> </referenceDetails> <referenceDetails> <type>FC</type> <value>1</value> </referenceDetails> </fareComponentRef> <originAndDestination> <origin>BRU</origin> <destination>LON</destination> </originAndDestination> <segmentRefernce> <reference> <type>CPN</type> <value>1</value> </reference> </segmentRefernce> </fareComponentInfo> <mnrRulesInfoGrp> <mnrCatInfo> <descriptionInfo> <number>5</number> </descriptionInfo> <processIndicator>ASS</processIndicator> </mnrCatInfo> <mnrFCInfoGrp> <refInfo> <referenceDetails> <type>FC</type> <value>1</value> </referenceDetails> </refInfo> </mnrFCInfoGrp> </mnrRulesInfoGrp> <mnrRulesInfoGrp> <mnrCatInfo> <descriptionInfo> <number>6</number> </descriptionInfo> <processIndicator>ASS</processIndicator> </mnrCatInfo> <mnrFCInfoGrp> <refInfo> <referenceDetails> <type>FC</type> <value>1</value> </referenceDetails> </refInfo> </mnrFCInfoGrp> </mnrRulesInfoGrp> <mnrRulesInfoGrp> <mnrCatInfo> <descriptionInfo> <number>7</number> </descriptionInfo> <processIndicator>ASS</processIndicator> </mnrCatInfo> <mnrFCInfoGrp> <refInfo> <referenceDetails> <type>FC</type> <value>1</value> </referenceDetails> </refInfo> </mnrFCInfoGrp> </mnrRulesInfoGrp> <mnrRulesInfoGrp> <mnrCatInfo> <descriptionInfo> <number>31</number> </descriptionInfo> <processIndicator>ASS</processIndicator> </mnrCatInfo> <mnrFCInfoGrp> <refInfo> <referenceDetails> <type>FC</type> <value>1</value> </referenceDetails> </refInfo> </mnrFCInfoGrp> </mnrRulesInfoGrp> <mnrRulesInfoGrp> <mnrCatInfo> <descriptionInfo> <number>33</number> </descriptionInfo> <processIndicator>ASS</processIndicator> </mnrCatInfo> <mnrFCInfoGrp> <refInfo> <referenceDetails> <type>FC</type> <value>1</value> </referenceDetails> </refInfo> </mnrFCInfoGrp> </mnrRulesInfoGrp> </mnrByPricingRecord> </MiniRule\_GetFromETicketReply>

## 5.1.3 Possible Errors

See "Error Messages" section.

* * *

## 5.2 Operation: Error Message

In the following example, the user wants to retrieve the Mini Rules applied for the ticket number 1234567891987. However, this number is sent in a wrong format (there is a minus between the 3rd and the 4th digits).

The error message “INVALID FORMAT” is returned by the system.

## 5.2.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<MiniRule\_GetFromETicket xmlns="http://xml.amadeus.com/TMRERQ\_13\_1\_1A"> <ticketNumber> <documentDetails> <number>123-4567891987</number> </documentDetails> </ticketNumber> </MiniRule\_GetFromETicket>

## 5.2.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<MiniRule\_GetFromETicketReply xmlns="http://xml.amadeus.com/TMRERR\_13\_1\_1A"> <responseDetails> <statusCode>X</statusCode> </responseDetails> <errorWarningGroup> <errorOrWarningCodeDetails> <errorDetails> <errorCode>2075</errorCode> <errorCategory>EC</errorCategory> </errorDetails> </errorOrWarningCodeDetails> <errorWarningDescription> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <language>EN</language> <source>S</source> <encoding>1</encoding> </freeTextDetails> <freeText>INVALID FORMAT</freeText> </errorWarningDescription> </errorWarningGroup> </MiniRule\_GetFromETicketReply>

## 5.2.3 Possible Errors

See "Error Messages" section.

* * *