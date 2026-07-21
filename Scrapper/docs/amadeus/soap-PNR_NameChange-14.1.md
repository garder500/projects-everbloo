---
url: "https://developers.amadeus.com/api-library/soap/functional-doc/614/doc-read/4145?serviceVersion=14.1"
download_url: "https://developers.amadeus.com/PAS-EAS/api/download/comp/4d4ad2cb456c02633f463a055ab70584/4145/HTML_UG_WBS_PNR_NameChange_NMEREQ_14.1/UG_WBS_PNR_NameChange_NMEREQ_14.1_063.html"
title: "HTML_UG_WBS_PNR_NameChange_NMEREQ_14.1_063"
source: "amadeus"
service_id: "614"
service_name: "PNR_NameChange"
version: "14.1"
document_id: "4145"
doc_version: "14.1"
doc_type: "User guide"
file_format: "HTML"
scraped_at: "2026-07-15T10:35:44.800Z"
---
# Function: PNR\_NameChange

* * *

## 1 Overview

The NameChange service allows to Update, Change or Complete a name.

\- The Name Update function is used to update surname, first name or title of name element for 1 passenger. Passenger types and Identification code (ID or CR)attached to the name element remain unchanged. This function retains all passenger associations.

\- The Name Change function is used to change surname, given name/initial(s), title, passenger type codes and ID / CR in name element of 1 passenger and does not retain passenger associations.

\- The Name Completion function is used in the case multiple name handling is allowed in current conditions. This consists in completing the passenger's name with another entity (Native Name or Universal Name) depending on which was previously entered in the PNR.

The passenger association is the association of a given element to a passenger.

The name element can be changed/updated/completed at creation time of the PNR (Passenger Name Record) or on a retrieved from file PNR.

Note that the Name element can be in Roman (\[A-Z\] range) or Native characters (UTF-8 characters such as Korean, Japanese characters...).

To be able to handle Native names, some specific settings must exist.

Note: only some Native languages will be supported.

## 1.1 Supported Operations

Name change, update, completion on a retrieved PNR.

Name change, update, completion on a newly created PNR.

Name attributes change or update.

The name (last name and first name) can be in Roman or Native characters.

Name element for several passengers can be updated, modified or completed at a time.

## 1.2 Limitations

Only individual passenger names are covered by this function, group names are not.

## 1.3 Unsupported Operations

Not applicable.

## 1.4 Prerequisites

A PNR must be present in the context of the user. If the user works on an existing PNR that has already been end-transacted, the PNR has to be previously retrieved. In that case, the PNR\_NameChange query must contain the record locator in input. This can be done via PNR\_Retrieve. If he works on a new PNR, at least a name element has been added to the PNR.This can be done via PNR\_AddMultiElements.

In order to use Name Completion use case, the office needs to support Multiple Names.

## 2 Building A Query

The NameChange service allows to Update, Change or Complete a name.

Only one of those use cases can be supported in the same query, depending on the codeset used.

## 2.1 Sub Structure: Name update

## 2.1.1 Description

Only the input parameters that contain the traveler information are mandatory (except separated title).

Traveler information is carried in Enhanced Passenger Information sub-structure.

Enhanced Passenger Information can be used to carry:

\- Native name(s) and a separated title,

\- or a Roman name (it includes for example case of name with title separated from the firstname), and possibly separated title from firstname

**Input parameters:**

_Traveler Information related input parameters are:_

Mandatory:

-   Traveler's surname
-   Quantity - always 1 since only one name element can be updated.
-   Action code - The action code is always UPD in Enhanced Passenger Traveler Information.
-   Traveler's given name
-   Traveler reference number - the tattoo number of the passenger that will be updated. It has been transmitted in a previous response message, that is a PNR\_Reply (structured PNR display).

Optional: 

-   Traveler title, separated from first name (it will be set to "0" if the aim is to drop it from the name being updated; if not set in the query, the separated title of the name being updated remain unchanged)

## 2.1.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 2.2 Sub Structure: Name change

## 2.2.1 Description

The NEW name element image including surname, first name, title, passenger type code, ID/CR number (and not only modified data) is passed in the request.

Traveler information is carried in Enhanced Passenger Information sub-structure.

Enhanced Passenger Information can be used to carry:

\- Native name(s) and a separated title,

\- or a Roman name with a separated title.

**Input parameters:**

_Traveler Information related input parameters are:_

Mandatory:

-   Traveler's surname
-   Quantity - always 1 since only one name element can be updated.
-   ActionCode- The    actionCode is CHG in Enhanced Passenger Traveler Information.
-   Traveler s given name
-   Traveler reference number: This field contains the tattoo number of the passenger that will be changed. It has been transmitted in a previous response message (PNR\_Reply).

Optional:

-   Passenger type code
-   Infant indicator
    
    Code
    
    Description
    
    1
    
    Infant with no surname
    
    2
    
    Infant with given name
    
    3
    
    Infant with name and given name
    
-   Infant surname
-   Infant given name
-   ID/CR number
-   Passenger Title separated from firstname (if not filled, the separated title of the name being updated will be dropped)

_Date Of Birth (of the infant) related input parameters are:_

Optional:

-   Year
-   Month
-   Day

## 2.2.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 2.3 Sub Structure: Name completion

## 2.3.1 Description

Only the input parameters that contain the traveler information are mandatory (except separated title).

Traveler information is carried in Enhanced Passenger Information sub-structure.

Enhanced Passenger Information can be used to carry:

\- Native name(s) and a separated title,

\- or a Roman name (it includes for example case of name with title separated from the firstname), and possibly separated title from firstname

**Input parameters:**

_Traveler Information related input parameters are:_

Mandatory:

-   Traveler's surname
-   Quantity - always 1 since only one name element can be updated.
-   Action code - The action code is always CMP in Enhanced Passenger Traveler Information.
-   Traveler's given name
-   Traveler reference number - the tattoo number of the passenger that will be updated. It has been transmitted in a previous response message, that is a PNR\_Reply (structured PNR display).

Optional: 

-   Traveler title, separated from first name (it will be set to "0" if the aim is to drop it from the name being updated; if not set in the query, the separated title of the name being updated remain unchanged)

## 2.3.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 3 Receiving A Reply

If the process is successful:

-   The name element(s) is(are) updated with the new data.
-   The name field is reviewed for reordering and renumbering if applicable (what means rearranged compared to other name elements).
-   Modification of one or several name elements on a retrieved PNR causes the data affected to be moved into the historical section of the PNR (Passenger Name Record History).
-   The modified name element is sent in the reply message. Some warnings can be returned as well in the reply message. New name order and reconfigured associations are not part of the reply (what means rearranged compared to other name elements).They will be returned on a subsequent PNR Retrieve.

If the process is not successful an error is sent in the reply message.

Note that in case of error really directly related to the information provided in the query, only the error group generalError or enhancedPassengerData with the error group passengerError with error group(s) can be returned, depending on the error.

**Reply Structure**

If the name modification process is successful, the reply message contains only the process status of the message (O if OK, X if an error is received), and the updated information for the passenger(s) impacted by the modification.

In case of error, see the 'Error Message' section.

## 3.1 Sub Structure: Name update

## 3.1.1 Description

-   Passenger types and Identification code (ID or CR) attached to the name element remain unchanged.

-   The elements associated to the modified name element are retained.

## 3.1.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

* * *

## 3.2 Sub Structure: Name change

## 3.2.1 Description

-   If the surname and /or first name are part of the modified data:
    
    The elements associated with the modified name element are reduced and/or cancelled from the PNR, except for itinerary, fare, ticket, MCO and some seat elements.
    
-   If the surname and /or first name are not part of the modified data:
    
    The elements associated to the modified name element are retained.
    

## 3.2.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

* * *

## 3.3 Sub Structure: Name completion

## 3.3.1 Description

-   Passenger types and Identification code (ID or CR) attached to the name element remain unchanged.

-   The elements associated to the modified name element are retained.

## 3.3.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

* * *

## 4 Error Messages

Generic Edifact error, this type of error can be returned if there is a problem with the contents of the message.

Message

Code

Description

INVALID EDIFACT FORMAT

3973

Some fields are missing, or does not respect thepredefined size or contain invalid characters.

Generic errors.In these cases the reply contains the record locator, if given in therequest, the error information and the error message.

Message

Code

Description

UNABLE TO PROCESS

11

Technical error. Contact help desk.

IGNORE AND RE-ENTER

55

Technical error. Contact help desk.

INVALID REQUEST

308

The action request code does not contain UPD, CHG or CMP

INVALID NUMBER IN PARTY

1194

The quantity field does not contain 1

  PNR NOT PRESENT

  1383

There is no PNR present in context, or its end of transaction shows some errors/warnings

Errors linked to the name update process.In these cases, the reply contains the record locator, if given in the request,the passenger information, the error information and the error message.

Message

Code

Description

CHECK NAME ELEMENT NUMBER

2577

The passenger reference given in the request does not correspond to any passenger in the PNR. It also applies if the PNR does not contain any name.

INPUT TOO LONG

1891

The name element including first name, title, passenger type, and identification code must not exceed 58 characters

RESTRICTED NAME

9410

NTBA must not be entered as surname

FREQUENT FLYER/NAME MODIFICATION RESTRICTED

3214

The name change/update is restricted when a validated Frequent Flyer number is present in the PNR

INVALID/DUPLICATE NAME EXISTS

1898

A duplicate match has been made between an existing name item and the name item

or

If the name in the Name Completion entry is already present for the passenger with an exact match in spelling and script

NAME CHANGE IS RESTRICTED BY AIRLINE - XX

9411

Depending on the setting of NMP and NMR APT indicators, the name change/update is not allowed.

RESTRICTED/CALL AIRLINE XX/Sn

1893

A surname change/update entry has been performed on a previously modified surname or the modification is for more than three characters by a NON System User airline/ subscriber and a System user flight in the itinerary is at critical level.

PASSENGER ASSOCIATE

1950

Name change has been performed at creation of a PNR and number of names is greater than number of services with no passenger association

UNABLE TO PROCESS/SERVICES EXCEED NAMES

3432

Name change has been performed at creation of a PNR and number of names is less than number of services.

INVALID PASSENGER TYPE

89

-   Invalid passenger type

CHECK DATE OF BIRTH

4759

-   The INF is more than 2 years old or
-   The CHD is more than 12 years old.
-   Incorrect Format of Date of Birth in the INF and CHD PTC

RESTRICTED - FA/ET EXISTS

9029

A name change/update entry has been performed on a PNR where the tickets have been issued by electronic ticketing. The FA/ET element exists in the PNR

RESTRICTED - PAX(S) BOARDED OR CHECKED-BAGS ON xxxxxx-Pn

15870

If the flight is not departed and the passenger on which the name change/update is performed is boarded or has checked-bags, then the name change/update is restricted

NAME CHANGE NOT ALLOWED

4207

A name change transaction has been performed on a PNR containing Non Air segments only and the Non Air providers do not allow the name change.

NAME UPDATE NOT PERMITTED

11040

A name update transaction has been performed on a PNR containing Non Air segments only and the Non Air providers do not allow the name change.

INVALID FORMAT/NOT ENTERED

12290

-   Script in last name and first name not supported in Amadeus
-   Script in last name and first name not supported in Phonetic name
-   Mixed Japanese and Roman scripts in last name and/or first name
-   Japanese script in last name and Roman characters in first name\*
-   Roman characters in last name and Japanese script in first name
-   A Roman name has been entered with a surname length strictly lower than 2
-   The Romanized name length is strictly lower than 2
-   Separated title does not contain Roman characters

NAME MODIFICATION RESTRICTED BY AIRLINE - XX

9412

Depending on the airline business rules, this error is displayed when the user Agent has attempted to make a name modification that is not authorized by the system.

FREQUENT FLYER/NAME MODIFICATION RESTRICTED BY AIRLINE - XX –

3215

Depending on the airline business rules, this error is displayed when the user Agent has attempted to make a name modification on validate frequent flyer that is not authorized by the system.

NAME MODIFICATION RESTRICTED BY AIRLINE - XX - FA/ET EXISTS

9030

Depending on the airline business rules, this error is displayed if name modification is restricted when FA/ET is associated to a passenger.

NAME COMPLETION NOT POSSIBLE

33345

\- Name completion is attempted on a reference name

\- or a name completion in cluster is done on names that were not entered in cluster.

MULTIPLE NAME ENTITIES MANAGEMENT NOT AUTHORIZED

33346

A name completion is attempted but MNM office profile indicator is set to No.

INVALID FOR EXST/CBBG

04581

In case the name completion is done on an EXST/CBBG passenger only, the entry will be rejected with this message.

Warning messages.

Message

Code

Description

WARNING PAX NAME CHANGED. CHECK NAME BEFORE EOT

2360

Displayed in PNR header when the user Agent is allowed to make a name modification.

WARNING: SPLIT RELOCATES SERVICE PROVIDER TO NEW PNR

  7366

A name change/update transaction has been performed on a MIXED PNR, a split has been done and a new PNR is created containing the non air segments on which the name change is not allowed.

NAME UPDATED - UPDATE NAME WITH CRUISE

9666

The name change/update is performed at PNR level and not to the cruise segments. The following informational message will be displayed to inform the user to contact the cruise company for the name update.

WARNING PAX CHECKED-IN. PAX WILL BE OFFLOADED AT EOT ON xxxxxx

  15781

If the flight is not departed and the passenger on which the name change/update is performed is accepted without baggage or is in Standby without baggage, a warning is displayed

## 4.1 Error Reply

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_NameChangeReply xmlns="http://xml.amadeus.com/NMERES\_14\_1\_1A"> <processStatus> <responseType>U</responseType> <statusCode>X</statusCode> </processStatus> <enhancedPassengerGroup> <elementManagementPassenger> <reference> <type>PT</type> <value>1</value> </reference> </elementManagementPassenger> <enhancedPassengerInformation> <enhancedPassengerDetails> <travellerNameInfo> <quantity>1</quantity> <type>ADT</type> <uniqueCustomerIdentifier>1</uniqueCustomerIdentifier> <infantIndicator>3</infantIndicator> </travellerNameInfo> <otherPaxNamesDetails> <nameType>UN</nameType> <referenceName>Y</referenceName> <displayedName>Y</displayedName> <surname>SURNAME</surname> <givenName>GIVENNAME MR</givenName> </otherPaxNamesDetails> </enhancedPassengerDetails> <passengerErrorInEnhancedData> <errorOrWarningCodeDetails> <errorDetails> <errorCode>42</errorCode> <errorCategory>ZZZ</errorCategory> <errorCodeOwner>1A</errorCodeOwner> </errorDetails> </errorOrWarningCodeDetails> <errorWarningDescription> <freeTextDetails> <textSubjectQualifier>ZZZ</textSubjectQualifier> <source>M</source> <encoding>ZZZ</encoding> </freeTextDetails> <freeText>INVALID/DUPLICATE NAME EXISTS</freeText> </errorWarningDescription> </passengerErrorInEnhancedData> </enhancedPassengerInformation> </enhancedPassengerGroup> </PNR\_NameChangeReply>

  

* * *

## 5 Operations

## 5.1 Operation: Name change on retrieved PNR

The example shows the message required to change the name of the passenger specified by the reference number with the following data:

Passenger surname: SURNAME

Passenger given name / title: GIVENNAME MR

Passenger reference number: 1

Passenger type code: ADT

Infant name: SMITH

Infant given name: BABY

Infant date of birth: 15 SEP 2007

**Note**: There must be a retrieved PNR in the AAA. No record locator information needed as the PNR must be already in context.

## 5.1.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_NameChange xmlns="http://xml.amadeus.com/NMEREQ\_14\_1\_1A"> <transactionCode> <actionRequestCode>CHG</actionRequestCode> </transactionCode> <enhancedPassengerGroup> <elementManagementPassenger> <reference> <type>PT</type> <value>1</value> </reference> </elementManagementPassenger> <enhancedPassengerInformation> <enhancedTravellerNameInfo> <travellerNameInfo> <quantity>1</quantity> <type>ADT</type> <uniqueCustomerIdentifier>1</uniqueCustomerIdentifier> <infantIndicator>3</infantIndicator> </travellerNameInfo> <otherPaxNamesDetails> <surname>SURNAME</surname> <givenName>GIVENNAME MR</givenName> </otherPaxNamesDetails> </enhancedTravellerNameInfo> </enhancedPassengerInformation> <enhancedPassengerInformation> <enhancedTravellerNameInfo> <travellerNameInfo> <quantity>1</quantity> <type>INF</type> <uniqueCustomerIdentifier>1</uniqueCustomerIdentifier> </travellerNameInfo> <otherPaxNamesDetails> <surname>SMITH</surname> <givenName>BABY</givenName> </otherPaxNamesDetails> </enhancedTravellerNameInfo> <dateOfBirthInEnhancedPaxData> <dateTime> <year>2007</year> <month>9</month> <day>15</day> </dateTime> </dateOfBirthInEnhancedPaxData> </enhancedPassengerInformation> </enhancedPassengerGroup> </PNR\_NameChange>

## 5.1.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_NameChangeReply xmlns="http://xml.amadeus.com/NMERES\_14\_1\_1A"> <processStatus> <responseType>U</responseType> <statusCode>O</statusCode> </processStatus> <enhancedPassengerGroup> <elementManagementPassenger> <reference> <type>PT</type> <value>1</value> </reference> </elementManagementPassenger> <enhancedPassengerInformation> <enhancedPassengerDetails> <travellerNameInfo> <quantity>1</quantity> <type>ADT</type> <uniqueCustomerIdentifier>1</uniqueCustomerIdentifier> <infantIndicator>3</infantIndicator> </travellerNameInfo> <otherPaxNamesDetails> <nameType>UN</nameType> <referenceName>Y</referenceName> <displayedName>Y</displayedName> <surname>SURNAME</surname> <givenName>GIVENNAME MR</givenName> </otherPaxNamesDetails> </enhancedPassengerDetails> </enhancedPassengerInformation> <enhancedPassengerInformation> <enhancedPassengerDetails> <travellerNameInfo> <quantity>1</quantity> <type>INF</type> <uniqueCustomerIdentifier>1</uniqueCustomerIdentifier> </travellerNameInfo> <otherPaxNamesDetails> <nameType>UN</nameType> <referenceName>Y</referenceName> <displayedName>Y</displayedName> <surname>SMITH</surname> <givenName>BABY</givenName> </otherPaxNamesDetails> </enhancedPassengerDetails> <dateOfBirthInEnhancedPaxData> <dateTime> <year>2007</year> <month>9</month> <day>15</day> </dateTime> </dateOfBirthInEnhancedPaxData> </enhancedPassengerInformation> </enhancedPassengerGroup> </PNR\_NameChangeReply>

## 5.1.3 Possible Errors

See "Error Messages" section.

* * *

## 5.2 Operation: Name change with Native name on retrieved PNR

The example shows the message required to change the name of the passenger specified by the reference number with the following data:

Passenger surname: 김

Passenger given name: 지훈

Passenger reference number: 1

Passenger type code: ADT

Infant name: SMITH

Infant given name: BABY

Infant date of birth: 15 SEP 2011

Note: There must be a retrieved PNR in the context.

## 5.2.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_NameChange xmlns="http://xml.amadeus.com/NMEREQ\_14\_1\_1A"> <transactionCode> <actionRequestCode>CHG</actionRequestCode> </transactionCode> <enhancedPassengerGroup> <elementManagementPassenger> <reference> <type>PT</type> <value>1</value> </reference> </elementManagementPassenger> <enhancedPassengerInformation> <enhancedTravellerNameInfo> <travellerNameInfo> <quantity>1</quantity> <type>ADT</type> <uniqueCustomerIdentifier>1</uniqueCustomerIdentifier> <infantIndicator>3</infantIndicator> </travellerNameInfo> <otherPaxNamesDetails> <surname>&#44608;</surname> <givenName>&#51648;&#54984;</givenName> </otherPaxNamesDetails> </enhancedTravellerNameInfo> </enhancedPassengerInformation> <enhancedPassengerInformation> <enhancedTravellerNameInfo> <travellerNameInfo> <quantity>1</quantity> <type>INF</type> <uniqueCustomerIdentifier>1</uniqueCustomerIdentifier> </travellerNameInfo> <otherPaxNamesDetails> <surname>SMITH</surname> <givenName>BABY</givenName> </otherPaxNamesDetails> </enhancedTravellerNameInfo> <dateOfBirthInEnhancedPaxData> <dateTime> <year>2011</year> <month>9</month> <day>15</day> </dateTime> </dateOfBirthInEnhancedPaxData> </enhancedPassengerInformation> </enhancedPassengerGroup> </PNR\_NameChange>

## 5.2.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_NameChangeReply xmlns="http://xml.amadeus.com/NMERES\_14\_1\_1A"> <processStatus> <responseType>U</responseType> <statusCode>O</statusCode> </processStatus> <enhancedPassengerGroup> <elementManagementPassenger> <reference> <type>PT</type> <value>1</value> </reference> </elementManagementPassenger> <enhancedPassengerInformation> <enhancedPassengerDetails> <travellerNameInfo> <quantity>1</quantity> <type>ADT</type> <uniqueCustomerIdentifier>1</uniqueCustomerIdentifier> <infantIndicator>3</infantIndicator> </travellerNameInfo> <otherPaxNamesDetails> <nameType>NN1</nameType> <referenceName>Y</referenceName> <displayedName>Y</displayedName> <surname>&#44608;</surname> <givenName>&#51648;&#54984;</givenName> </otherPaxNamesDetails> <otherPaxNamesDetails> <referenceName>Y</referenceName> <displayedName>N</displayedName> <romanizationMethod>KAR</romanizationMethod> <surname>KIM</surname> <givenName>JI HUN</givenName> </otherPaxNamesDetails> </enhancedPassengerDetails> </enhancedPassengerInformation> <enhancedPassengerInformation> <enhancedPassengerDetails> <travellerNameInfo> <quantity>1</quantity> <type>INF</type> <uniqueCustomerIdentifier>1</uniqueCustomerIdentifier> </travellerNameInfo> <otherPaxNamesDetails> <nameType>UN</nameType> <referenceName>Y</referenceName> <displayedName>Y</displayedName> <surname>SMITH</surname> <givenName>BABY</givenName> </otherPaxNamesDetails> </enhancedPassengerDetails> <dateOfBirthInEnhancedPaxData> <dateTime> <year>2011</year> <month>9</month> <day>15</day> </dateTime> </dateOfBirthInEnhancedPaxData> </enhancedPassengerInformation> </enhancedPassengerGroup> </PNR\_NameChangeReply>

## 5.2.3 Possible Errors

See "Error Messages" section.

* * *

## 5.3 Operation: Name completion on Infant only with Universal name on retrieved PNR

**Assumption** -The PNR is created with a name element containing following data (Phonetic name already stored in name element):

Adult's name:

-   Passenger surname - ゴトウ
-   Passenger given name - トモヒロ
-   Separated Passenger title - MR
-   Passenger reference number - 3

Infant's name:

-   Passenger surname - ゴトウ
-   Passenger given name - アキヒロ
-   Separated Passenger title - MR
-   Passenger reference number - 3

The example shows the message required to complete the Name Element with the following data (Phonetic Name):

Infant's name:

-   Passenger surname - SURNAME
-   Passenger given name - GIVENNAME
-   Separated Passenger title - MR
-   Passenger reference number - 3

**Note**: There must be a retrieved PNR in the context. No record locator information needed as the PNR must be already in context.

## 5.3.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_NameChange xmlns="http://xml.amadeus.com/NMEREQ\_14\_1\_1A"> <transactionCode> <actionRequestCode>CMP</actionRequestCode> </transactionCode> <enhancedPassengerGroup> <elementManagementPassenger> <reference> <type>PT</type> <value>3</value> </reference> </elementManagementPassenger> <enhancedPassengerInformation> <enhancedTravellerNameInfo> <travellerNameInfo> <quantity>1</quantity> <uniqueCustomerIdentifier>3</uniqueCustomerIdentifier> <infantIndicator>3</infantIndicator> </travellerNameInfo> <otherPaxNamesDetails> <surname>&#12468;&#12488;&#12454;</surname> <givenName>&#12488;&#12514;&#12498;&#12525;</givenName> <title>MR</title> </otherPaxNamesDetails> <otherPaxNamesDetails> <surname>GOTO</surname> <givenName>TOMOHIRO</givenName> <title>MR</title> </otherPaxNamesDetails> </enhancedTravellerNameInfo> </enhancedPassengerInformation> <enhancedPassengerInformation> <enhancedTravellerNameInfo> <travellerNameInfo> <quantity>1</quantity> <type>INF</type> <uniqueCustomerIdentifier>3</uniqueCustomerIdentifier> </travellerNameInfo> <otherPaxNamesDetails> <surname>&#12468;&#12488;&#12454;</surname> <givenName>&#12450;&#12461;&#12498;&#12525;</givenName> <title>MR</title> </otherPaxNamesDetails> <otherPaxNamesDetails> <surname>SURNAME</surname> <givenName>GIVENNAME</givenName> <title>MR</title> </otherPaxNamesDetails> </enhancedTravellerNameInfo> </enhancedPassengerInformation> </enhancedPassengerGroup> </PNR\_NameChange>

## 5.3.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_NameChangeReply xmlns="http://xml.amadeus.com/NMERES\_14\_1\_1A"> <processStatus> <responseType>U</responseType> <statusCode>O</statusCode> </processStatus> <enhancedPassengerGroup> <elementManagementPassenger> <reference> <type>PT</type> <value>3</value> </reference> </elementManagementPassenger> <enhancedPassengerInformation> <enhancedPassengerDetails> <travellerNameInfo> <quantity>1</quantity> <uniqueCustomerIdentifier>3</uniqueCustomerIdentifier> <infantIndicator>3</infantIndicator> </travellerNameInfo> <otherPaxNamesDetails> <nameType>NN1</nameType> <referenceName>Y</referenceName> <displayedName>Y</displayedName> <surname>&#12468;&#12488;&#12454;</surname> <givenName>&#12488;&#12514;&#12498;&#12525;</givenName> <title>MR</title> </otherPaxNamesDetails> <otherPaxNamesDetails> <nameType>RN1</nameType> <referenceName>Y</referenceName> <displayedName>N</displayedName> <romanizationMethod>MCR</romanizationMethod> <surname>GOTO</surname> <givenName>TOMOHIRO</givenName> <title>MR</title> </otherPaxNamesDetails> <otherPaxNamesDetails> <nameType>UN</nameType> <referenceName>N</referenceName> <displayedName>N</displayedName> <surname>GOTO</surname> <givenName>TOMOHIRO</givenName> <title>MR</title> </otherPaxNamesDetails> </enhancedPassengerDetails> </enhancedPassengerInformation> <enhancedPassengerInformation> <enhancedPassengerDetails> <travellerNameInfo> <quantity>1</quantity> <type>INF</type> <uniqueCustomerIdentifier>3</uniqueCustomerIdentifier> </travellerNameInfo> <otherPaxNamesDetails> <nameType>NN1</nameType> <referenceName>Y</referenceName> <displayedName>Y</displayedName> <surname>&#12468;&#12488;&#12454;</surname> <givenName>&#12450;&#12461;&#12498;&#12525;</givenName> <title>MR</title> </otherPaxNamesDetails> <otherPaxNamesDetails> <nameType>RN1</nameType> <referenceName>Y</referenceName> <displayedName>N</displayedName> <romanizationMethod>MCR</romanizationMethod> <surname>SURNAME</surname> <givenName>GIVENNAME</givenName> <title>MR</title> </otherPaxNamesDetails> <otherPaxNamesDetails> <nameType>UN</nameType> <referenceName>N</referenceName> <displayedName>N</displayedName> <surname>SURNAME</surname> <givenName>GIVENNAME</givenName> <title>MR</title> </otherPaxNamesDetails> </enhancedPassengerDetails> </enhancedPassengerInformation> </enhancedPassengerGroup> </PNR\_NameChangeReply>

## 5.3.3 Possible Errors

See "Error Messages" section.

* * *

## 5.4 Operation: Name completion with Native name on retrieved PNR

**Assumption** -The PNR is created with a name element containing following data (Universal name already stored in name element):

-   Passenger surname - SURNAME
-   Passenger given name - GIVENNAME
-   Separated Passenger title - MR
-   Passenger reference number - 3

The example shows the message required to complete the Name Element with the following data (Native Name):

-   Passenger surname - ゴトウ
-   Passenger given name - トモヒロ
-   Separated Passenger title - MR
-   Passenger reference number - 3

**Note**: There must be a retrieved PNR in the context. No record locator information needed as the PNR must be already in context.

## 5.4.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_NameChange xmlns="http://xml.amadeus.com/NMEREQ\_14\_1\_1A"> <transactionCode> <actionRequestCode>CMP</actionRequestCode> </transactionCode> <enhancedPassengerGroup> <elementManagementPassenger> <reference> <type>PT</type> <value>3</value> </reference> </elementManagementPassenger> <enhancedPassengerInformation> <enhancedTravellerNameInfo> <travellerNameInfo> <quantity>1</quantity> <uniqueCustomerIdentifier>3</uniqueCustomerIdentifier> </travellerNameInfo> <otherPaxNamesDetails> <surname>SURNAME</surname> <givenName>GIVENNAME</givenName> <title>MR</title> </otherPaxNamesDetails> <otherPaxNamesDetails> <surname>&#12468;&#12488;&#12454;</surname> <givenName>&#12488;&#12514;&#12498;&#12525;</givenName> <title>MR</title> </otherPaxNamesDetails> </enhancedTravellerNameInfo> </enhancedPassengerInformation> </enhancedPassengerGroup> </PNR\_NameChange>

## 5.4.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_NameChangeReply xmlns="http://xml.amadeus.com/NMERES\_14\_1\_1A"> <processStatus> <responseType>U</responseType> <statusCode>O</statusCode> </processStatus> <enhancedPassengerGroup> <elementManagementPassenger> <reference> <type>PT</type> <value>3</value> </reference> </elementManagementPassenger> <enhancedPassengerInformation> <enhancedPassengerDetails> <travellerNameInfo> <quantity>1</quantity> <uniqueCustomerIdentifier>3</uniqueCustomerIdentifier> </travellerNameInfo> <otherPaxNamesDetails> <nameType>UN</nameType> <referenceName>Y</referenceName> <displayedName>Y</displayedName> <surname>SURNAME</surname> <givenName>GIVENNAME</givenName> <title>MR</title> </otherPaxNamesDetails> <otherPaxNamesDetails> <nameType>NN1</nameType> <referenceName>N</referenceName> <displayedName>N</displayedName> <surname>&#12468;&#12488;&#12454;</surname> <givenName>&#12488;&#12514;&#12498;&#12525;</givenName> <title>MR</title> </otherPaxNamesDetails> <otherPaxNamesDetails> <nameType>RN1</nameType> <referenceName>N</referenceName> <displayedName>N</displayedName> <surname>GOTOU</surname> <givenName>TOMOHIRO</givenName> <title>MR</title> </otherPaxNamesDetails> </enhancedPassengerDetails> </enhancedPassengerInformation> </enhancedPassengerGroup> </PNR\_NameChangeReply>

## 5.4.3 Possible Errors

See "Error Messages" section.

* * *

## 5.5 Operation: Name completion with Universal name on retrieved PNR

**Assumption** -The PNR is created with a name element containing following data (Phonetic name already stored in name element):

-   Passenger surname - ゴトウ
-   Passenger given name - トモヒロ
-   Separated Passenger title - MR
-   Passenger reference number - 3

The example shows the message required to complete the Name Element with the following data (Phonetic Name):

-   Passenger surname - SURNAME
-   Passenger given name - GIVENNAME
-   Separated Passenger title - MR
-   Passenger reference number - 3

**Note**: There must be a retrieved PNR in the context. No record locator information needed as the PNR must be already in context.

## 5.5.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_NameChange xmlns="http://xml.amadeus.com/NMEREQ\_14\_1\_1A"> <transactionCode> <actionRequestCode>CMP</actionRequestCode> </transactionCode> <enhancedPassengerGroup> <elementManagementPassenger> <reference> <type>PT</type> <value>3</value> </reference> </elementManagementPassenger> <enhancedPassengerInformation> <enhancedTravellerNameInfo> <travellerNameInfo> <quantity>1</quantity> <uniqueCustomerIdentifier>3</uniqueCustomerIdentifier> </travellerNameInfo> <otherPaxNamesDetails> <surname>&#12468;&#12488;&#12454;</surname> <givenName>&#12488;&#12514;&#12498;&#12525;</givenName> <title>MR</title> </otherPaxNamesDetails> <otherPaxNamesDetails> <surname>SURNAME</surname> <givenName>GIVENNAME</givenName> <title>MR</title> </otherPaxNamesDetails> </enhancedTravellerNameInfo> </enhancedPassengerInformation> </enhancedPassengerGroup> </PNR\_NameChange>

## 5.5.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_NameChangeReply xmlns="http://xml.amadeus.com/NMERES\_14\_1\_1A"> <processStatus> <responseType>U</responseType> <statusCode>O</statusCode> </processStatus> <enhancedPassengerGroup> <elementManagementPassenger> <reference> <type>PT</type> <value>3</value> </reference> </elementManagementPassenger> <enhancedPassengerInformation> <enhancedPassengerDetails> <travellerNameInfo> <quantity>1</quantity> <uniqueCustomerIdentifier>3</uniqueCustomerIdentifier> </travellerNameInfo> <otherPaxNamesDetails> <nameType>NN1</nameType> <referenceName>Y</referenceName> <displayedName>Y</displayedName> <surname>&#12468;&#12488;&#12454;</surname> <givenName>&#12488;&#12514;&#12498;&#12525;</givenName> <title>MR</title> </otherPaxNamesDetails> <otherPaxNamesDetails> <nameType>RN1</nameType> <referenceName>Y</referenceName> <displayedName>N</displayedName> <surname>GOTOU</surname> <givenName>TOMOHIRO</givenName> <title>MR</title> </otherPaxNamesDetails> <otherPaxNamesDetails> <nameType>UN</nameType> <referenceName>N</referenceName> <displayedName>N</displayedName> <surname>SURNAME</surname> <givenName>GIVENNAME</givenName> <title>MR</title> </otherPaxNamesDetails> </enhancedPassengerDetails> </enhancedPassengerInformation> </enhancedPassengerGroup> </PNR\_NameChangeReply>

## 5.5.3 Possible Errors

See "Error Messages" section.

* * *

## 5.6 Operation: Name update on multiple PAX in retrieved PNR

The example shows the message required to update in on query the name of two passengers previously added in the PNR and specified by the reference number with the following data:  
  
First passenger  
  

-       Passenger surname - SURNAMEONE
-       Passenger given name/title - GIVENNAMEONE
-       Passenger reference number - 1

  
First passenger  
  

-       Passenger surname - SURNAMETWO
-       Passenger given name/title - GIVENNAMETWO
-       Passenger reference number - 2

  
**Note**: There must be a retrieved PNR in the context. No record locator information needed as the PNR must be already in context.

## 5.6.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_NameChange xmlns="http://xml.amadeus.com/NMEREQ\_14\_1\_1A"> <transactionCode> <actionRequestCode>UPD</actionRequestCode> </transactionCode> <enhancedPassengerGroup> <elementManagementPassenger> <reference> <type>PT</type> <value>1&</value> </reference> </elementManagementPassenger> <enhancedPassengerInformation> <enhancedTravellerNameInfo> <travellerNameInfo> <quantity>1</quantity> <uniqueCustomerIdentifier>1</uniqueCustomerIdentifier> </travellerNameInfo> <otherPaxNamesDetails> <surname>SURNAMEONE</surname> <givenName>GIVENNAMEONE</givenName> </otherPaxNamesDetails> </enhancedTravellerNameInfo> </enhancedPassengerInformation> </enhancedPassengerGroup> <enhancedPassengerGroup> <elementManagementPassenger> <reference> <type>PT</type> <value>2&</value> </reference> </elementManagementPassenger> <enhancedPassengerInformation> <enhancedTravellerNameInfo> <travellerNameInfo> <quantity>1</quantity> <uniqueCustomerIdentifier>2</uniqueCustomerIdentifier> </travellerNameInfo> <otherPaxNamesDetails> <surname>SURNAMETWO</surname> <givenName>GIVENNAMETWO</givenName> </otherPaxNamesDetails> </enhancedTravellerNameInfo> </enhancedPassengerInformation> </enhancedPassengerGroup> </PNR\_NameChange>

## 5.6.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_NameChangeReply xmlns="http://xml.amadeus.com/NMERES\_14\_1\_1A"> <processStatus> <responseType>U</responseType> <statusCode>O</statusCode> </processStatus> <enhancedPassengerGroup> <elementManagementPassenger> <reference> <type>PT</type> <value>1&</value> </reference> </elementManagementPassenger> <enhancedPassengerInformation> <enhancedPassengerDetails> <travellerNameInfo> <quantity>1</quantity> <uniqueCustomerIdentifier>1</uniqueCustomerIdentifier> </travellerNameInfo> <otherPaxNamesDetails> <nameType>UN</nameType> <referenceName>Y</referenceName> <displayedName>Y</displayedName> <surname>SURNAMEONE</surname> <givenName>GIVENNAMEONE</givenName> </otherPaxNamesDetails> </enhancedPassengerDetails> </enhancedPassengerInformation> </enhancedPassengerGroup> <enhancedPassengerGroup> <elementManagementPassenger> <reference> <type>PT</type> <value>2&</value> </reference> </elementManagementPassenger> <enhancedPassengerInformation> <enhancedPassengerDetails> <travellerNameInfo> <quantity>1</quantity> <uniqueCustomerIdentifier>2</uniqueCustomerIdentifier> </travellerNameInfo> <otherPaxNamesDetails> <nameType>UN</nameType> <referenceName>Y</referenceName> <displayedName>Y</displayedName> <surname>SURNAMETWO</surname> <givenName>GIVENNAMETWO</givenName> </otherPaxNamesDetails> </enhancedPassengerDetails> </enhancedPassengerInformation> </enhancedPassengerGroup> </PNR\_NameChangeReply>

## 5.6.3 Possible Errors

See "Error Messages" section.

* * *

## 5.7 Operation: Name Update On Newly Created PNR

The example shows the message required to update the name of the passenger specified by the reference number with the following data:

-   Passenger surname - SURNAME
-   Passenger given name/title - GIVENNAME MR
-   Passenger reference number - 3

**Note**: There must be a PNR in creation in the context, containing at least 1 name.

## 5.7.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_NameChange xmlns="http://xml.amadeus.com/NMEREQ\_14\_1\_1A"> <transactionCode> <actionRequestCode>UPD</actionRequestCode> </transactionCode> <enhancedPassengerGroup> <elementManagementPassenger> <reference> <type>PT</type> <value>3&</value> </reference> </elementManagementPassenger> <enhancedPassengerInformation> <enhancedTravellerNameInfo> <travellerNameInfo> <quantity>1</quantity> <uniqueCustomerIdentifier>3</uniqueCustomerIdentifier> </travellerNameInfo> <otherPaxNamesDetails> <surname>SURNAME</surname> <givenName>GIVENNAME MR</givenName> </otherPaxNamesDetails> </enhancedTravellerNameInfo> </enhancedPassengerInformation> </enhancedPassengerGroup> </PNR\_NameChange>

## 5.7.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_NameChangeReply xmlns="http://xml.amadeus.com/NMERES\_14\_1\_1A"> <processStatus> <responseType>U</responseType> <statusCode>O</statusCode> </processStatus> <enhancedPassengerGroup> <elementManagementPassenger> <reference> <type>PT</type> <value>3&</value> </reference> </elementManagementPassenger> <enhancedPassengerInformation> <enhancedPassengerDetails> <travellerNameInfo> <quantity>1</quantity> <uniqueCustomerIdentifier>3</uniqueCustomerIdentifier> </travellerNameInfo> <otherPaxNamesDetails> <nameType>UN</nameType> <referenceName>Y</referenceName> <displayedName>Y</displayedName> <surname>SURNAME</surname> <givenName>GIVENNAME MR</givenName> </otherPaxNamesDetails> </enhancedPassengerDetails> </enhancedPassengerInformation> </enhancedPassengerGroup> </PNR\_NameChangeReply>

## 5.7.3 Possible Errors

See "Error Messages" section.

* * *

## 5.8 Operation: Name Update On Retrieved PNR

The example shows the message required to update the name of the passengerspecified by the reference number with the following data:

-   Passenger surname - SURNAME
-   Passenger given name/title - GIVENNAME MR
-   Passenger reference number - 3

**Note**: There must be a retrieved PNR in the context. No record locator information needed as the PNR must be already in context.

## 5.8.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_NameChange xmlns="http://xml.amadeus.com/NMEREQ\_14\_1\_1A"> <transactionCode> <actionRequestCode>UPD</actionRequestCode> </transactionCode> <enhancedPassengerGroup> <elementManagementPassenger> <reference> <type>PT</type> <value>3&</value> </reference> </elementManagementPassenger> <enhancedPassengerInformation> <enhancedTravellerNameInfo> <travellerNameInfo> <quantity>1</quantity> <uniqueCustomerIdentifier>3</uniqueCustomerIdentifier> </travellerNameInfo> <otherPaxNamesDetails> <surname>SURNAME</surname> <givenName>GIVENNAME MR</givenName> </otherPaxNamesDetails> </enhancedTravellerNameInfo> </enhancedPassengerInformation> </enhancedPassengerGroup> </PNR\_NameChange>

## 5.8.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_NameChangeReply xmlns="http://xml.amadeus.com/NMERES\_14\_1\_1A"> <processStatus> <responseType>U</responseType> <statusCode>O</statusCode> </processStatus> <enhancedPassengerGroup> <elementManagementPassenger> <reference> <type>PT</type> <value>3&</value> </reference> </elementManagementPassenger> <enhancedPassengerInformation> <enhancedPassengerDetails> <travellerNameInfo> <quantity>1</quantity> <uniqueCustomerIdentifier>3</uniqueCustomerIdentifier> </travellerNameInfo> <otherPaxNamesDetails> <nameType>UN</nameType> <referenceName>Y</referenceName> <displayedName>Y</displayedName> <surname>SURNAME</surname> <givenName>GIVENNAME MR</givenName> </otherPaxNamesDetails> </enhancedPassengerDetails> </enhancedPassengerInformation> </enhancedPassengerGroup> </PNR\_NameChangeReply>

## 5.8.3 Possible Errors

See "Error Messages" section.

* * *

## 5.9 Operation: Passenger Title drop on a Retrieved PNR

The example shows the message required to update name and drop the title of the passenger specified by the reference number with the following data:

-   Passenger surname: 김
-   Passenger given name: 지훈
-   Passenger reference number - 3
-   Separated Passenger Title: 0 (need to be filled for Update use case)

Let's suppose the previous title (separated from the firstname) was MRS for the passenger.

**Note**: There must be a retrieved PNR in the context. No record locator information needed as the PNR must be already in context.

## 5.9.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_NameChange xmlns="http://xml.amadeus.com/NMEREQ\_14\_1\_1A"> <transactionCode> <actionRequestCode>IRU</actionRequestCode> </transactionCode> <enhancedPassengerGroup> <elementManagementPassenger> <reference> <type>PT</type> <value>3&</value> </reference> </elementManagementPassenger> <enhancedPassengerInformation> <enhancedTravellerNameInfo> <travellerNameInfo> <quantity>1</quantity> <uniqueCustomerIdentifier>3</uniqueCustomerIdentifier> </travellerNameInfo> <otherPaxNamesDetails> <surname>&#44608;</surname> <givenName>&#51648;&#54984;</givenName> <title>0</title> </otherPaxNamesDetails> </enhancedTravellerNameInfo> </enhancedPassengerInformation> </enhancedPassengerGroup> </PNR\_NameChange>

## 5.9.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_NameChangeReply xmlns="http://xml.amadeus.com/NMERES\_14\_1\_1A"> <processStatus> <responseType>U</responseType> <statusCode>O</statusCode> </processStatus> <enhancedPassengerGroup> <elementManagementPassenger> <reference> <type>PT</type> <value>3</value> </reference> </elementManagementPassenger> <enhancedPassengerInformation> <enhancedPassengerDetails> <travellerNameInfo> <quantity>1</quantity> <uniqueCustomerIdentifier>3</uniqueCustomerIdentifier> </travellerNameInfo> <otherPaxNamesDetails> <nameType>NN1</nameType> <referenceName>Y</referenceName> <displayedName>Y</displayedName> <surname>&#44608;</surname> <givenName>&#51648;&#54984;</givenName> </otherPaxNamesDetails> <otherPaxNamesDetails> <nameType>RN1</nameType> <referenceName>Y</referenceName> <displayedName>N</displayedName> <romanizationMethod>KAR</romanizationMethod> <surname>KIM</surname> <givenName>JI HUN</givenName> </otherPaxNamesDetails> </enhancedPassengerDetails> </enhancedPassengerInformation> </enhancedPassengerGroup> </PNR\_NameChangeReply>

## 5.9.3 Possible Errors

See "Error Messages" section.

* * *

## 5.10 Operation: Passenger Title update on a Retrieved PNR

The example shows the message required to update the title of the passenger specified by the reference number with the following data:

-   Passenger surname - 김
-   Passenger given name - 지훈
-   Separated Passenger title - MRS
-   Passenger reference number - 3

**Note**: There must be a retrieved PNR in the context. No record locator information needed as the PNR must be already in context.

## 5.10.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_NameChange xmlns="http://xml.amadeus.com/NMEREQ\_14\_1\_1A"> <transactionCode> <actionRequestCode>UPD</actionRequestCode> </transactionCode> <enhancedPassengerGroup> <elementManagementPassenger> <reference> <type>PT</type> <value>3&</value> </reference> </elementManagementPassenger> <enhancedPassengerInformation> <enhancedTravellerNameInfo> <travellerNameInfo> <quantity>1</quantity> <uniqueCustomerIdentifier>3</uniqueCustomerIdentifier> </travellerNameInfo> <otherPaxNamesDetails> <surname>&#44608;</surname> <givenName>&#51648;&#54984;</givenName> <title>MRS</title> </otherPaxNamesDetails> </enhancedTravellerNameInfo> </enhancedPassengerInformation> </enhancedPassengerGroup> </PNR\_NameChange>

## 5.10.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_NameChangeReply xmlns="http://xml.amadeus.com/NMERES\_14\_1\_1A"> <processStatus> <responseType>U</responseType> <statusCode>O</statusCode> </processStatus> <enhancedPassengerGroup> <elementManagementPassenger> <reference> <type>PT</type> <value>3&</value> </reference> </elementManagementPassenger> <enhancedPassengerInformation> <enhancedPassengerDetails> <travellerNameInfo> <quantity>1</quantity> <uniqueCustomerIdentifier>3</uniqueCustomerIdentifier> </travellerNameInfo> <otherPaxNamesDetails> <nameType>NN1</nameType> <referenceName>Y</referenceName> <displayedName>Y</displayedName> <surname>&#44608;</surname> <givenName>&#51648;&#54984;</givenName> <title>MRS</title> </otherPaxNamesDetails> <otherPaxNamesDetails> <nameType>RN1</nameType> <referenceName>Y</referenceName> <displayedName>N</displayedName> <romanizationMethod>KAR</romanizationMethod> <surname>KIM</surname> <givenName>JI HUN</givenName> <title>MRS</title> </otherPaxNamesDetails> </enhancedPassengerDetails> </enhancedPassengerInformation> </enhancedPassengerGroup> </PNR\_NameChangeReply>

## 5.10.3 Possible Errors

See "Error Messages" section.

* * *