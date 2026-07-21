---
url: "https://developers.amadeus.com/api-library/soap/functional-doc/1908/doc-read/106608?serviceVersion=12.2"
download_url: "https://developers.amadeus.com/PAS-EAS/api/download/comp/4d4ad2cb456c02633f463a055ab70584/106608/UG_WBS_Profile_ReadProfile_PROFILE_READPROFILE_12.2_029/UG_WBS_Profile_ReadProfile_PROFILE_READPROFILE_12.2_029.html"
title: "UG_WBS_Profile_ReadProfile_PROFILE_READPROFILE_12.2_029"
source: "amadeus"
service_id: "1908"
service_name: "Profile_ReadProfile"
version: "12.2"
document_id: "106608"
doc_version: "12.2"
doc_type: "User guide"
file_format: "HTML"
scraped_at: "2026-07-15T10:39:42.101Z"
---
# Function: Profile\_ReadProfile

* * *

## 1 Overview

This service is used to read one or more travel agency profiles from the Amadeus Customer Profile Database known as CSX.

This service may be used for the following types of travel agency profile:

-   **Type 1:** **Traveler profiles.** These contain data concerning one individual.
-   **Type 3:** **Company profiles**. These contain data concerning one corporation/subsidiary/department.
-   **Type 25: Agency profiles.** These contain data related to a travel agency

## 1.1 Supported Operations

This service supports:

-   Reading a single travel agency profile (profile retrieval)
-   Reading multiple travel agency profiles (profile search)

## 1.2 Limitations

None 

## 1.3 Unsupported Operations

None

## 1.4 Prerequisites

None

## 2 Building A Query

Profiles are read using the request AMA\_ProfileReadRQ. There are two types of read request:

-   Reading a single profile by specifying a unique identifier (profile retrieve)
-   Reading multiple profiles by searching with criteria (profile search)

The profile search is not valid for agency profiles since they are unique per office id.

For both types of read request (retrieve and search), it is mandatory to specify the profile type (1 for traveler, 3 for company, 25 for agency).

To read a single profile, the search criteria may be:

-   Amadeus Record Locator (for traveler, company or agency). May be used in addition to an OfficeID to restrict the search.
-   OfficeID + Index (for traveler or company)
-   OfficeID + FrequentFlyerNumber + AirlineCode (for traveler)

To read multiple profiles, the search criteria may be:

For a traveler profile:

-   OfficeID (up to a list of 10 offices) + Surname, and all possible combinations with:
    -   GivenName
    -   CompanyName (Related Company)
    -   CountryName Code (In Address)
    -   PostalCode (In Address)
    -   Phone (Business phone number, Home phone number or Mobile phone number
    -   Profile Status (A for active profiles, I for deactivated profiles)  
-   OfficeID (up to a list of 10 offices) and all possible combinations with:
    -   CompanyName (Related Company)
    -   Profile Status (A for active profiles, I for deactivated profiles)
-   Corporate ID (up to 2) + Surname, and all possible combinations with
    -   GivenName
    -   CompanyName (Related Company)
    -   Profile Status (A for active profiles, I for deactivated profiles)

For a company profile, the search criteria may be:

-   OfficeID (up to a list of 10 offices) + CompanyName, and all possible combinations with:
    -   CountryName Code (In Address)
    -   PostalCode (In Address)
    -   Profile Status (A for active profiles, I for deactivated profiles
-    OfficeID (up to a list of 10 offices) and all possible combinations with:
    -    Profile Status (A for active profiles, I for deactivated profiles)
-    Corporate ID (up to 2) + CompanyName, and all possible combinations with:
    -   Profile Status (A for active profiles, I for deactivated profiles)

Note: the Corporate ID is the 3 central characters of an OfficeID. In the case of NCE1A0001, the Corporate ID is 1A0.

This search criterion may be included in a read request as follows:

                        <UniqueID Type="4" ID\_Context="CSX" ID="1A0"/>

The maximum number of profiles which may be retrieved by a single read request can be set using the MaxResponses field as follows:

<AMA\_ProfileReadRQ xmlns="http://xml.amadeus.com/2008/10/AMA/Profile" Version="12.2" _MaxResponses="%value from 1 to 200"_\>

Wildcards may be used in the following profile fields:

-   Surname (Traveler)
-   GivenName (Traveler)
-   CompanyName (Traveler or Company)

A wildcard is an asterisk (star) character which may replace zero or more characters in a search criteria. At least one alphabetic character is required along with a wildcard. The field is otherwise considered empty.

Wildcards must always be at the end of the fields, for example, "AL\*" means '_values beginning with AL_'.

## 3 Receiving A Reply

The response is returned in an **AMA\_ProfileReadRS** message.

If the profile update was unsuccessful, then the response will contain an element “Errors”. If the profile creation was successful, then the response will contain a “Success” element along with one or more profiles. The complete profile data is returned exactly as it was last entered via a create or update.

When a list of profiles is returned, the following data may be returned for each matching profile:

**Traveler Profiles:**

-   Universal Name (Surname, Firstname, salutation and name title)
-   Native name (Surname, Firstname, salutation and name title)
-   Record locator
-   Office ID
-   Company name
-   Phone elements (all)
-   E-mail elements (all)
-   Address (Street, city, zip code)
-   Birth date
-   Nationality
-   Passport number
-   National ID (all)

**Company Profiles:**

-   Name
-   Record locator
-   Office ID
-   Street, city, zip code 

If the total number of retrievable profiles exceeds the maximum number that may be contained in the response message, then the field MoreIndicator=”1” is set:

<AMA\_ProfileReadRS xmlns="http://xml.amadeus.com/2008/10/AMA/Profile" xmlns:ama="http://xml.amadeus.com/2010/06/Types\_v2" Version="12.2" _MoreIndicator="1"_\>

If there are more profiles to retrieve, then the next batch of profiles should be requested using the field MoreDataEchoToken as follows:

<AMA\_ProfileReadRQ xmlns="http://xml.amadeus.com/2008/10/AMA/Profile" Version="12.2" _MoreDataEchoToken="%Recloc of the last retrieved profile%"_\>

## 4 Error Messages

If an error occurs, the response message includes an **error code** and an **error message**.

Here is a list of errors which may be returned:

  

**Code**

**Message**

**Description**

**Security**

00270

ACCESS RESTRICTED

The requestor is not authorized to read the profiles.

02644

OFFICE ID NOT FOUND

The office ID entered by the user does not exist.

06166

INVALID CORPORATE ID

The corporate ID entered by the user is invalid.

**Occurrences/ format**

00817

INVALID AIRLINE CODE

The airline code of the frequent flyer number is invalid

02762

INVALID DATA/FORMAT

Invalid format or unexpected values for some attributes. (Non-authorized wildcards search, non-authorized search criterion, etc.)

11615

MANDATORY ITEMS MISSING

Some mandatory items are missing in the request.

**Unique identifiers**

09253

FREQUENT FLYER NUMBER NOT FOUND

No frequent flyer profile corresponds to the specified number in CSX database (traveler profile).

09254

INDEX NOT FOUND

The index is not found in CSX profiles.

09255

RECORD LOCATOR NOT FOUND

The record locator of a traveler, group or company profile is not found in CSX database.

10401

AGENCY PROFILE NOT FOUND

No agency profile exists for the office provided.

10406

COMPANY PROFILE NOT FOUND

The record locator does not exist for a corporate profile (corporate and associated frequent flyer profiles), or the corporate number is not found (corporate profiles).

**Home airport code**

10421

INVALID AIRPORT/CITY CODE

Invalid ISO code for the airport default (PAD element)

**Associations between profiles**

10406

NO COMPANY PROFILE FOUND

There is no company profile having the name specified in input (associated traveler and group profiles).

12439

COMPANY PROFILE HOLDS NO ASSOCIATION

The corporate profile has no associated frequent flyer profiles (associated frequent flyer profiles).

**PHONE**

\*

PHONE OR FAX NUMBER NOT FOUND

No Frequent Flyer or Traveller holds the phone/fax contact mentioned in the query.

**Other**

00011

UNABLE TO PROCESS

The request cannot be processed by CSX.

## 4.1 Error Reply

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_ProfileReadRS xmlns="http://xml.amadeus.com/2008/10/AMA/Profile" Version="12.2"> <Errors> <Error Code="9.CFF" ShortText="RECORD LOCATOR NOT FOUND" Type="21"> </Error> </Errors> </AMA\_ProfileReadRS>

  

* * *

## 5 Operations

## 5.1 Operation: Multiple profile retrieval

This example shows an AMA\_ProfileReadRQ message to retrieve all profiles where the surname matches the one specified.

## 5.1.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_ProfileReadRQ xmlns="http://xml.amadeus.com/2008/10/AMA/Profile" Version="12.2"> <UniqueID ID="ABC6F0020" ID\_Context="CSX" Type="9"></UniqueID> <ReadRequests> <ProfileReadRequest ProfileType="1"> <Customer> <PersonName> <Surname>ALLIOD</Surname> </PersonName> </Customer> </ProfileReadRequest> </ReadRequests> </AMA\_ProfileReadRQ>

## 5.1.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_ProfileReadRS xmlns="http://xml.amadeus.com/2008/10/AMA/Profile" Version="12.2"> <Success></Success> <Profiles> <ProfileInfo> <UniqueID ID="NCEA12103" ID\_Context="CSX" Instance="1" Type="21"></UniqueID> <UniqueID ID="NCEA12103" ID\_Context="CSX" Type="9"></UniqueID> <Profile ProfileType="1" Status="A"> <Customer BirthDate="1980-08-15" Gender="Female"> <PersonName> <GivenName>Fiona</GivenName> <Surname>ALLIOD</Surname> </PersonName> <Telephone DefaultInd="0" PhoneLocationType="7" PhoneNumber="+33 1 04-97-15-45-25" PhoneTechType="1"></Telephone> <Address DefaultInd="1" Description="Primary" FormattedInd="1" UseType="1"> <AddressLine>Stringline 1</AddressLine> <AddressLine>Stringline 2</AddressLine> <CityName>Nice</CityName> <PostalCode>06000</PostalCode> <CountryName Code="FR"> </CountryName> </Address> <CitizenCountryName Code="GB"></CitizenCountryName> <CitizenCountryName Code="CA"></CitizenCountryName> <CitizenCountryName Code="US"></CitizenCountryName> <RelatedCompany> <UniqueID ID="1000000355" ID\_Context="CSX" Type="21"></UniqueID> <CompanyName>MY BEST COMPANY</CompanyName> </RelatedCompany> <EmployeeInfo EmployeeTitle="123456789 123456789 123456789"> </EmployeeInfo> <LanguageSpoken Code="FR"></LanguageSpoken> <LanguageSpoken Code="IT"></LanguageSpoken> <LanguageSpoken Code="DE"></LanguageSpoken> <LanguageSpoken Code="EN"></LanguageSpoken> <LanguageSpoken Code="ES"></LanguageSpoken> <LivingCountryName Code="US"></LivingCountryName> </Customer> <UserID ID="NCEA12103" ID\_Context="KeyAccounter" Type="9"></UserID>{.\*} <PrefCollections> <PrefCollection> <AirlinePref> <AirportOriginPref LocationCode="CDG"> </AirportOriginPref> </AirlinePref> </PrefCollection> </PrefCollections> </Profile> </ProfileInfo> <ProfileInfo> <UniqueID ID="NCEA12103" ID\_Context="CSX" Instance="1" Type="21"></UniqueID> <UniqueID ID="NCEA12103" ID\_Context="CSX" Type="9"></UniqueID> <Profile ProfileType="1" Status="A"> <Customer BirthDate="1988-08-28" Gender="Female"> <PersonName> <GivenName>Mia</GivenName> <Surname>Alliod</Surname> </PersonName> <Telephone DefaultInd="0" PhoneLocationType="7" PhoneNumber="+33 1 04-55-85-69-89" PhoneTechType="1"></Telephone> <Address DefaultInd="1" Description="Primary" FormattedInd="1" UseType="1"> <AddressLine>Stringline 1</AddressLine> <AddressLine>Stringline 2</AddressLine> <CityName>Nice</CityName> <PostalCode>06000</PostalCode> <CountryName Code="FR"> </CountryName> </Address> <CitizenCountryName Code="FR"></CitizenCountryName> </Customer> </Profile> </ProfileInfo> </Profiles> </AMA\_ProfileReadRS>

## 5.1.3 Possible Errors

See "Error Messages" section.

* * *

## 5.2 Operation: Profile Retrieval

This example shows an AMA\_ProfileReadRQ message to retrieve a single profile by specifying the Record Locator.

## 5.2.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_ProfileReadRQ xmlns="http://xml.amadeus.com/2008/10/AMA/Profile" Version="12.2"> <UniqueID ID="100005" ID\_Context="CSX" Type="21"></UniqueID> <ReadRequests> <ProfileReadRequest ProfileType="1"></ProfileReadRequest> </ReadRequests> </AMA\_ProfileReadRQ>

## 5.2.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_ProfileReadRS xmlns="http://xml.amadeus.com/2008/10/AMA/Profile" Version="12.2"> <Success></Success> <Profiles> <ProfileInfo> <UniqueID ID="1000050087" ID\_Context="CSX" Instance="2" Type="21"></UniqueID> <UniqueID ID="ABC6F0020" ID\_Context="CSX" Type="9"></UniqueID> <Profile ProfileType="1" Status="A"> <Customer> <PersonName> <GivenName>Sian</GivenName> <Surname>Thomas</Surname> </PersonName> <Telephone DefaultInd="0" PhoneLocationType="7" PhoneNumber="+33 1 04-97-15-45-25" PhoneTechType="1"></Telephone> <Address DefaultInd="1" Description="Primary" FormattedInd="1" UseType="1"> <AddressLine>Stringline 1</AddressLine> <AddressLine>Stringline 2</AddressLine> <CityName>Nice</CityName> <PostalCode>06000</PostalCode> <CountryName Code="FR"></CountryName> </Address> </Customer> <UserID ID="NCEA12103" ID\_Context="KeyAccounter" Type="9"></UserID> <PrefCollections> <PrefCollection> <AirlinePref> <AirportOriginPref LocationCode="CDG"></AirportOriginPref> </AirlinePref> </PrefCollection> </PrefCollections> </Profile> </ProfileInfo> </Profiles> </AMA\_ProfileReadRS>

## 5.2.3 Possible Errors

See "Error Messages" section.

* * *