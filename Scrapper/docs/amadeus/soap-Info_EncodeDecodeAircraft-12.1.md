---
url: "https://developers.amadeus.com/api-library/soap/functional-doc/2140/doc-read/105621?serviceVersion=12.1"
download_url: "https://developers.amadeus.com/PAS-EAS/api/download/comp/4d4ad2cb456c02633f463a055ab70584/105621/UG_WBS_Info_EncodeDecodeAircraft_MDNERQ_12.1_011/UG_WBS_Info_EncodeDecodeAircraft_MDNERQ_12.1_011.html"
title: "UG_WBS_Info_EncodeDecodeAircraft_MDNERQ_12.1_011"
source: "amadeus"
service_id: "2140"
service_name: "Info_EncodeDecodeAircraft"
version: "12.1"
document_id: "105621"
doc_version: "12.1"
doc_type: "User guide"
file_format: "HTML"
scraped_at: "2026-07-15T10:29:10.664Z"
---
# Function: Info\_EncodeDecodeAircraft

* * *

## 1 Overview

This function allows the retrieval of an Aircraft code (respectively name) from an Aircraft name (respectively code). In both cases it returns the corresponding Aircraft (name and code) and the other information linked to it.

This function is equivalent to the DNE cryptic entry.

## 1.1 Supported Operations

This function allows for the following operations:

Encode an Aircraft

This function allows the retrieval of the Aircraft code from its name.

Decode an Aircraft

This function allows the retrieval the name of an Aircraft from its code.

## 1.2 Limitations

All encode/decode parameters are case sensitive and the values must be entered in upper cases (capitalized).

## 1.3 Unsupported Operations

Not applicable

## 1.4 Prerequisites

Not applicable

## 2 Building A Query

To Encode an Aircraft, the Aircraft name can support the following algorithms:

-   Exact match.
-   Partial macth.

To Decode an Aircraft, the Aircraft code can support the following algorithms:

-   Exact match.

Parameter

Comments

Type

**Aircraft identification**

Aircraft name

Could be either exact name or only a part of the name.  
Mandatory if Aircraft Code not specified

C

Aircraft code

Three letters Code of the Aircraft  
Mandatory if Aircraft name not specified

C

## 3 Receiving A Reply

There are two types of reply:

-   the result message
-   an error message

The reply contains any Aircraft matching the input aircraft name or aircraft code. The additional information linked to the aircraft is always returned.

## 4 Error Messages

The following errors may be returned when using the **EncodeDecodeAircarft** function.

Code

Error Text

Explanation

Actions

26016

NAME NOT IN TABLE  

This error response is returned if there are no Aircraft name matching the input name (exactly or partialy).  

-   Check the name.

26017

CODE NOT IN TABLE.  

This error response is returned if the input aircraft code is not present in database.

-   Check the code.

26018

CHECK FORMAT

This error response is returned if the input parameter are not valid (special characters...)  

-   Check the input parameters.

  

* * *

## 5 Operations

## 5.1 Operation: Decode Aircarft Code 747

This scenario consists in decode the Aircraft code 747.

## 5.1.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Info\_EncodeDecodeAircraft xmlns="http://xml.amadeus.com/MDNERQ\_12\_1\_1A"> <aircraftInformation> <iataAircraftTypeCode>747</iataAircraftTypeCode> </aircraftInformation> </Info\_EncodeDecodeAircraft>

## 5.1.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Info\_EncodeDecodeAircraftReply xmlns="http://xml.amadeus.com/MDNERR\_12\_1\_1A"> <aircraftInformation> <cabinClassDetails> <numberOfSeats>244</numberOfSeats> <characteristic>Min</characteristic> </cabinClassDetails> <cabinClassDetails> <numberOfSeats>569</numberOfSeats> <characteristic>Max</characteristic> </cabinClassDetails> <iataAircraftTypeCode>747</iataAircraftTypeCode> <configVersionDetails> <defaultConfigurationCode>A</defaultConfigurationCode> <code>747</code> <characteristic>W</characteristic> </configVersionDetails> <configVersionDescription>BOEING 747 ALL SERIES PASSENGER</configVersionDescription> </aircraftInformation> </Info\_EncodeDecodeAircraftReply>

## 5.1.3 Possible Errors

See "Error Messages" section.

* * *

## 5.2 Operation: Encode Aircraft AGUSTA

This scenario consists in encode the Aircraft AGUSTA .

## 5.2.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Info\_EncodeDecodeAircraft xmlns="http://xml.amadeus.com/MDNERQ\_12\_1\_1A"> <aircraftInformation> <configVersionDescription>AGUSTA</configVersionDescription> </aircraftInformation> </Info\_EncodeDecodeAircraft>

## 5.2.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Info\_EncodeDecodeAircraftReply xmlns="http://xml.amadeus.com/MDNERR\_12\_1\_1A"> <aircraftInformation> <cabinClassDetails> <numberOfSeats>5</numberOfSeats> <characteristic>Min</characteristic> </cabinClassDetails> <cabinClassDetails> <numberOfSeats>7</numberOfSeats> <characteristic>Max</characteristic> </cabinClassDetails> <iataAircraftTypeCode>AGH</iataAircraftTypeCode> <configVersionDetails> <defaultConfigurationCode>A</defaultConfigurationCode> <code>AGH</code> <characteristic>N</characteristic> </configVersionDetails> <configVersionDescription>AGUSTA A 109A</configVersionDescription> </aircraftInformation> </Info\_EncodeDecodeAircraftReply>

## 5.2.3 Possible Errors

See "Error Messages" section.

* * *