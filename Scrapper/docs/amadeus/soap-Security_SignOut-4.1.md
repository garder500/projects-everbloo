---
url: "https://developers.amadeus.com/api-library/soap/functional-doc/48/doc-read/98459?serviceVersion=4.1"
download_url: "https://developers.amadeus.com/PAS-EAS/api/download/comp/4d4ad2cb456c02633f463a055ab70584/98459/UG_WBS_Security_SignOut_VLSSOQ_04.1_027/UG_WBS_Security_SignOut_VLSSOQ_04.1_027.html"
title: "UG_WBS_Security_SignOut_VLSSOQ_04.1_027"
source: "amadeus"
service_id: "48"
service_name: "Security_SignOut"
version: "4.1"
document_id: "98459"
doc_version: "4.1"
doc_type: "User guide"
file_format: "HTML"
scraped_at: "2026-07-15T10:43:52.654Z"
---
# Function: Security\_newSignOut

* * *

## 1 Overview

The currently logged user wants to invalidate all his current conversations.

It allows a user to be unlogged from the system. In other words, Amadeus sign-out the session related to the sesion ID found in the request :

-   ### old format :
    

       <SessionID> **<identification>**|<sequence></SessionID>

            For example:

                                   **00NM30HLDH**|1

                                   **0009F4DLE0**|2

-   ### new format :
    

<xs:complexType name="SessionType">

  
<xs:sequence minOccurs=“1" maxOccurs="1">

  
 **<xs:element name="SessionId" type="xsd:string" minOccurs="1" maxOccurs="1"/>**

  
 <xs:element name="SequenceNumber" type="xsd:integer" minOccurs="1" maxOccurs="1"/>

 <xs:element name="SecurityToken" type="xsd:string" minOccurs=“1" maxOccurs="1"/>  
</xs:sequence></xs:complexType>

## 1.1 Supported Operations

The customer's system requests to close the session established with Amadeus system.

## 1.2 Limitations

Not applicable

## 1.3 Unsupported Operations

Not applicable

## 1.4 Prerequisites

The customer's system has requested to close the session with Amadeus common platform.

## 2 Building A Query

The sign-out message allows sign-out the current session.

## 2.1 Sub Structure: Empty

## 2.1.1 Description

This message does not contains any segment. In other words, only the message is sufficient to sign-out the client session. As information , the action "sign-out" means that LSS overrides the security part of the DCX by <STATE = "I"> (Inactivated).

## 2.1.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Security\_SignOut xmlns="http://xml.amadeus.com/VLSSOQ\_04\_1\_1A"> </Security\_SignOut>

## 3 Receiving A Reply

  
  
  

## 3.1 Sub Structure: Process Status

## 3.1.1 Description

This segment is only used if process is OK. In that case P is specified within this segment.

## 3.1.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<processStatus> <statusCode>P</statusCode> </processStatus>

* * *

## 4 Error Messages

**Please note that these error messages are not in the techref because these error codes were added after the message definition.**

Standard communication errors. :

-   16006 The User Id is Invalid
-   16011 - The Office ID is invalid
-   16029 - The Duty Code is invalid
-   16174 - Invalid Sign
-   16000 - You have not signed-in yet. Please sign-in first.

## 4.1 Error Reply

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Security\_SignOutReply xmlns="http://xml.amadeus.com/VLSSOR\_04\_1\_1A"> <errorSection> <applicationError> <errorDetails> <errorCode>1</errorCode> </errorDetails> </applicationError> <interactiveFreeText> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> <language>EN</language> </freeTextQualification> <freeText>ERROR</freeText> </interactiveFreeText> </errorSection> </Security\_SignOutReply>

  

* * *

## 5 Operations

## 5.1 Operation: Sign Out

The user sends a VLSSOQ request to sign-out the current session.

## 5.1.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Security\_SignOut xmlns="http://xml.amadeus.com/VLSSOQ\_04\_1\_1A"> </Security\_SignOut>

## 5.1.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Security\_SignOutReply xmlns="http://xml.amadeus.com/VLSSOR\_04\_1\_1A"> <processStatus> <statusCode>P</statusCode> </processStatus> </Security\_SignOutReply>

## 5.1.3 Possible Errors

See "Error Messages" section.

* * *