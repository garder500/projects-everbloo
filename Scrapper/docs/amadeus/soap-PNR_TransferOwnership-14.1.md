---
url: "https://developers.amadeus.com/api-library/soap/functional-doc/104/doc-read/5422?serviceVersion=14.1"
download_url: "https://developers.amadeus.com/PAS-EAS/api/download/comp/4d4ad2cb456c02633f463a055ab70584/5422/HTML_UG_WBS_PNR_TransferOwnership_POWNUQ_14.1/UG_WBS_PNR_TransferOwnership_POWNUQ_14.1_059.html"
title: "HTML_UG_WBS_PNR_TransferOwnership_POWNUQ_14.1_059"
source: "amadeus"
service_id: "104"
service_name: "PNR_TransferOwnership"
version: "14.1"
document_id: "5422"
doc_version: "14.1"
doc_type: "User guide"
file_format: "HTML"
scraped_at: "2026-07-15T10:38:01.114Z"
---
# Function: PNR\_TransferOwnership

* * *

## 1 Overview

The TransferOwnership function is used to change the responsible office and/or the owner User Security Entity of a given PNR.

The responsible office can be either an Amadeus office ID or a third party identification. Additionally, the queuing Office ID, the ticketing Office ID and the Office ID specified in the option queue element can be modified.

This functionality can be used on a retrieved PNR.

## 1.1 Supported Operations

The following operations are supported:

-   Change of the Office ID responsible of a given PNR
-   Change of the owner User Security Entity (attribute of the Point Of Sale owner)

Optionally, the queueing Office ID, the office present in the TK and OP elements can be changed as well.

## 1.2 Limitations

The queuing office, ticketing office and/or the Office ID in the option queue element cannot be changed without changing the Office owner of the PNR.

## 1.3 Unsupported Operations

None

## 1.4 Prerequisites

The user is entitled to transfer the PNR ownership and/or the User Security Entity

In order to transfer the ownership of a given PNR, a PNR must be present in the agent's context, i.e. already created and committed PNR:

-   If the user works on an existing PNR that has already been end-transacted, the PNR has to be previously retrieved. This can be done via the Retrieve service.

The PNR must remain in the agent’s context between the different transactions.

## 2 Building A Query

The TransferOwnership function is composed of the three (3) following parts ordered in this way:

1.  Record Locator (Mandatory)
2.  Single PNR indicator (optional)
3.  Identification (mandatory)

## 2.1 Sub Structure: Record Locator

## 2.1.1 Description

This part is mandatory. It indicates the Record Locator of the PNR whose the Ownership is transfered.

## 2.1.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<recordLocator> <reservation> <controlNumber>ABC654</controlNumber> </reservation> </recordLocator>

## 2.2 Sub Structure: Single PNR indicator

## 2.2.1 Description

This part is optional. If filled with the value NPR, it indicates that the OwnershipTransfer function only applies to the current PNR, not to the PNRs linked with Associated Cross Reference Record (AXR) to the current PNR. 

Here is the value allowed along with its description:

**Code**

**Description**

NPR

Inhibit propagation through AXR

## 2.2.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<propagatioAction> <actionRequestCode>NPR</actionRequestCode> </propagatioAction>

## 2.3 Sub Structure: Identification

## 2.3.1 Description

This part is mandatory. 

It identifies the Amadeus Office Identification or the Third Party Identification where the agent wants to transfer the ownership of the PNR.

If the agent transfers the ownership of the PNR to an Amadeus Office, the queuing Office ID, the ticketing Office ID and the Office ID specified in the option queue element can optionally be changed with the new Amadeus Office owner as well.

It is composed of the three (3) following sub-parts ordered in this way:

1.  Amadeus Office ID or third party identification (mutually exclusive), 
2.  User Security Entity (cannot be used if the first sub-part is a third party identification),
3.  Specific Changes (optional sub-part - cannot be used if the first sub-part is a third party identification)

The query is valid if at least one of two first sub-part is present.

The sub-part Specific Changes is optional. If filled and depending of its value, the queuing Office ID, the ticketing Office ID and the Office ID specified in the option queue element are changed with the new Amadeus Office owner. Here are the different values allowed along with their descriptions:

**Code**

**Description**

QO

Change the queueing office of the PNR

TO

Change the ticketing office of the PNR

OQ

Change the office in the option queue element of the PNR  

This Specific Changes sub-part can take several values, up to the three different values mentioned above, no matter in which order they are entered.

## 2.3.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<officeIdentification> <officeIdentificator> <originatorDetails> <inHouseIdentification1>NCE6X0980</inHouseIdentification1> <inHouseIdentification2>AgencyLON</inHouseIdentification2> </originatorDetails> </officeIdentificator> <specificChanges> <actionRequestCode>QO</actionRequestCode> </specificChanges> <specificChanges> <actionRequestCode>TO</actionRequestCode> </specificChanges> <specificChanges> <actionRequestCode>OQ</actionRequestCode> </specificChanges> </officeIdentification>

## 3 Receiving A Reply

If the process is successful, the following actions have been performed:

-   The ownership of the PNR is transfered and/or the new owner User Security Entity is set
-   The queuing office, the ticketing office and the option queue office are changed (if the corresponding indicators were set)

The reply is composed of:

-   The record locator
-   The Office Identification which is new Amadeus Office owner and/or the new User Security Entity (the values specified in the query) OR the OA Identification (mutually exclusive).

If the process is not successful, an error is sent in the reply.

## 3.1 Sub Structure: Record Locator

## 3.1.1 Description

This part indicates the Record Locator whose Ownership has been transferred. It will never be empty whenever the Transfer Ownership function is performed, as the record locator is mandatory.

## 3.1.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<recordLocator> <reservation> <controlNumber>3IBWES</controlNumber> </reservation> </recordLocator>

* * *

## 3.2 Sub Structure: Office Identification

## 3.2.1 Description

This part indicates the new Amadeus Office owner of the PNR (mutually exclusive with OA Identification).

## 3.2.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<officeIdentification> <officeIdentificator> <originatorDetails> <inHouseIdentification1>NCE6X0980</inHouseIdentification1> </originatorDetails> </officeIdentificator> </officeIdentification>

* * *

## 3.3 Sub Structure: OA Identification

## 3.3.1 Description

This part indicates the Third party Identification which is the new owner of the PNR (mutually exclusive with Office Identification).

## 3.3.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<oaIdentification> <oaIdentificator> <referenceDetails> <value>HDQRM</value> </referenceDetails> </oaIdentificator> </oaIdentification>

* * *

## 4 Error Messages

In case of error, the reply is composed of four (4) parts ordered in this way:

1.  General Error
2.  Record Locator: it indicates the record locator as mentioned in the query
3.  Office Identification: it indicates the Amadeus Office Identification as mentioned in the query
4.  OA Identification: it indicates the third party Identification as mentioned in the query

Depending of the kind of error, the error can be either in the General Error part or in the Office Identification part.

Here is the list of the error messages that are returned in the General Error part when using this interface.

Message

Code

Description

PNR NOT PRESENT

1383

The agent's context is empty and there is no Record Locator mentioned in the TransferOwnership query

NO MATCH FOR RECORD LOCATOR

1931

The record locator given in the request does not correspond to the record locator in context.

UNABLE TO PROCESS

11

Technical error. Contact help desk

IGNORE AND RE-ENTER

55

Technical error. Contact help desk

INVALID REQUEST

308

Both Amadeus Office ID and third party identification are present in the request

INVALID FORMAT/NOT ENTERED/

1892

The fourth and fifth characters of third party identification are numeric.

INVALID FORMAT/NOT ENTERED/

1892

User Security Entity entered not valid ("/" , "-" , "\*" characters are forbidden)

Here is the list of the error messages that are returned in the Office Identification part when using this interface.

Message

Code

Description

INVALID OFFICE IDENTIFICATION CODE

1533

Invalid Amadeus Office ID

## 4.1 Error Reply

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_TransferOwnershipReply xmlns="http://xml.amadeus.com/POWNUR\_04\_1\_1A"> <generalError> <errorNumber> <errorDetails> <errorCode>1931</errorCode> <errorCategory>ZZZ</errorCategory> <errorCodeOwner>1A</errorCodeOwner> </errorDetails> </errorNumber> <errorFreeText> <freeTextDetails> <textSubjectQualifier>3</textSubjectQualifier> <source>A</source> <encoding>2</encoding> </freeTextDetails> <freeText>NO MATCH FOR RECORD LOCATOR</freeText> </errorFreeText> </generalError> <recordLocator> <reservation> <controlNumber>ABC123</controlNumber> </reservation> </recordLocator> <officeIdentification> <officeIdentificator> <originatorDetails> <inHouseIdentification1>NCE6X0980</inHouseIdentification1> </originatorDetails> </officeIdentificator> </officeIdentification> </PNR\_TransferOwnershipReply>

  

* * *

## 5 Operations

## 5.1 Operation: Change User Security Entity

The example shows the change of the owner User Security Entity only.

## 5.1.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_TransferOwnership xmlns="http://xml.amadeus.com/POWNUQ\_14\_1\_1A"> <recordLocator> <reservation> <controlNumber>ABC987</controlNumber> </reservation> </recordLocator> <officeIdentification> <officeIdentificator> <originatorDetails> <inHouseIdentification2>AgencyLON</inHouseIdentification2> </originatorDetails> </officeIdentificator> </officeIdentification> </PNR\_TransferOwnership>

## 5.1.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_TransferOwnershipReply xmlns="http://xml.amadeus.com/POWNUR\_14\_1\_1A"> <recordLocator> <reservation> <controlNumber>ABC987</controlNumber> </reservation> </recordLocator> <officeIdentification> <officeIdentificator> <originatorDetails> <inHouseIdentification2>AgencyLON</inHouseIdentification2> </originatorDetails> </officeIdentificator> </officeIdentification> </PNR\_TransferOwnershipReply>

## 5.1.3 Possible Errors

See "Error Messages" section.

* * *

## 5.2 Operation: Transfer Ownership + Change User Security Entity

In this example, both the office Ownership and the owner User Security Entity are changed in the same query. Optionally, the Queueing office is changed as well.

## 5.2.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_TransferOwnership xmlns="http://xml.amadeus.com/POWNUQ\_14\_1\_1A"> <recordLocator> <reservation> <controlNumber>ABC987</controlNumber> </reservation> </recordLocator> <officeIdentification> <officeIdentificator> <originatorDetails> <inHouseIdentification1>LON6X0980</inHouseIdentification1> <inHouseIdentification2>AgencyLON</inHouseIdentification2> </originatorDetails> </officeIdentificator> <specificChanges> <actionRequestCode>QO</actionRequestCode> </specificChanges> </officeIdentification> </PNR\_TransferOwnership>

## 5.2.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_TransferOwnershipReply xmlns="http://xml.amadeus.com/POWNUR\_14\_1\_1A"> <recordLocator> <reservation> <controlNumber>ABC987</controlNumber> </reservation> </recordLocator> <officeIdentification> <officeIdentificator> <originatorDetails> <inHouseIdentification1>LON6X0980</inHouseIdentification1> <inHouseIdentification2>AgencyLON</inHouseIdentification2> </originatorDetails> </officeIdentificator> </officeIdentification> </PNR\_TransferOwnershipReply>

## 5.2.3 Possible Errors

See "Error Messages" section.

* * *

## 5.3 Operation: Transfer Ownership To A Third Party Identification

This example shows the transfer of ownership to a third party identification on a retrieved PNR.

## 5.3.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_TransferOwnership xmlns="http://xml.amadeus.com/POWNUQ\_14\_1\_1A"> <recordLocator> <reservation> <controlNumber>ABC654</controlNumber> </reservation> </recordLocator> <oaIdentificator> <referenceDetails> <value>HDQRM</value> </referenceDetails> </oaIdentificator> </PNR\_TransferOwnership>

## 5.3.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_TransferOwnershipReply xmlns="http://xml.amadeus.com/POWNUR\_14\_1\_1A"> <recordLocator> <reservation> <controlNumber>ABC654</controlNumber> </reservation> </recordLocator> <oaIdentification> <oaIdentificator> <referenceDetails> <value>HDQRM</value> </referenceDetails> </oaIdentificator> </oaIdentification> </PNR\_TransferOwnershipReply>

## 5.3.3 Possible Errors

See "Error Messages" section.

* * *

## 5.4 Operation: Transfer Ownership To An Office ID

This example shows the query which transfers ownership of a retrieved PNR, changing also the ticketing office, the queueing office and the office specified in the option queue element, without spreading through the AXR.

## 5.4.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_TransferOwnership xmlns="http://xml.amadeus.com/POWNUQ\_14\_1\_1A"> <recordLocator> <reservation> <controlNumber>ABC654</controlNumber> </reservation> </recordLocator> <propagatioAction> <actionRequestCode>NPR</actionRequestCode> </propagatioAction> <officeIdentification> <officeIdentificator> <originatorDetails> <inHouseIdentification1>NCE6X0980</inHouseIdentification1> </originatorDetails> </officeIdentificator> <specificChanges> <actionRequestCode>TO</actionRequestCode> </specificChanges> <specificChanges> <actionRequestCode>QO</actionRequestCode> </specificChanges> <specificChanges> <actionRequestCode>OQ</actionRequestCode> </specificChanges> </officeIdentification> </PNR\_TransferOwnership>

## 5.4.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_TransferOwnershipReply xmlns="http://xml.amadeus.com/POWNUR\_14\_1\_1A"> <recordLocator> <reservation> <controlNumber>ABC654</controlNumber> </reservation> </recordLocator> <officeIdentification> <officeIdentificator> <originatorDetails> <inHouseIdentification1>NCE6X0980</inHouseIdentification1> </originatorDetails> </officeIdentificator> </officeIdentification> </PNR\_TransferOwnershipReply>

## 5.4.3 Possible Errors

See "Error Messages" section.

* * *