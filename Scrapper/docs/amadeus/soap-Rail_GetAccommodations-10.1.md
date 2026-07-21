---
url: "https://developers.amadeus.com/api-library/soap/functional-doc/1310/doc-read/102282?serviceVersion=10.1"
download_url: "https://developers.amadeus.com/PAS-EAS/api/download/comp/4d4ad2cb456c02633f463a055ab70584/102282/UG_WBS_Rail_GetAccommodations_RAIL_GETACCOMMODATIONS_10.1_048/UG_WBS_Rail_GetAccommodations_RAIL_GETACCOMMODATIONS_10.1_048.html"
title: "UG_WBS_Rail_GetAccommodations_RAIL_GETACCOMMODATIONS_10.1_048"
source: "amadeus"
service_id: "1310"
service_name: "Rail_GetAccommodations"
version: "10.1"
document_id: "102282"
doc_version: "10.1"
doc_type: "User guide"
file_format: "HTML"
scraped_at: "2026-07-15T10:42:47.817Z"
---
# Function: Rail\_GetAccommodations

* * *

## 1 Overview

The **GetAccommodations** functionality allows the user to request for the list of possible accommodations (seat, berth or bed) for a specific proposal.

As all qualifiers inside the same <proposal> have the same physicalSpace, a <proposal> is associated to one type of accommodation for all passengers.

## 1.1 Supported Operations

Request for accommodation for one proposal

## 1.2 Limitations

Only one proposal is specified in the query

## 1.3 Unsupported Operations

Request for accommodation for several proposal

## 1.4 Prerequisites

The user has required security rights to call this function.

Valid non open proposal from a previous ScheduleQuote call are present in RDP context.

## 2 Building A Query

The GetAccomodations query allows the user to request the list and description for the possible accommodations associated to one proposal. The only mandatory element in the query is the RPH of this proposal. The proposal has to be a non open proposal.

## 3 Receiving A Reply

Amadeus Rail System will send as main data in the response of a GetAccommodation:

-   The element <**E****rror**\> or the element <**Success**\> with eventually a <**Warning**\> element. The element <Error\> is returned when the get accommodation service has failed.
-   The element <**Accommodation**\> is returned containing the information of an accommodation (_code, type, description…_) and associated to one leg.

## 4 Error Messages

MESSAGE

CODE

DESCRIPTION

CHECK INPUT PARAMETERS

2134

Invalid parameters are supplied

UNABLE TO PROCESS - TIME OUT

21934

a Time out occurs during the “Get Accommodation”

THE NUMBER OF ADULTS AND CHILDREN MUST BE GREATER THAN ZERO

23917

JOURNEY LEG SUPPLIED IN CALL TO ACCOMMODATION INVALID

23800

Appears when the journey leg supplied in call to accommodation invalid.

THERE IS NO BERTH ACCOMMODATION AVAILABLE IN THE SUPPLIED COACH

23919

Occurs in case there is no Berth available in the supplied coach. Try with a coach that has a Berth.

INVALID TRIP PARAMETERS

24113

Appears when the Id used for the trip is not valid (either not existing or of another type)

MISSING TRIP PARAMETERS

24114

if mandatory parameters are missing to call a Trip.

INVALID LEG PARAMETERS

24115

If parameters used to call a Leg are invalid.

MISSING LEG PARAMETERS

24116

If mandatory parameters are missing to call a Leg.

MISSING ACCOMMODATION PARAMETERS

24117

If mandatory parameters are missing to call an accommodation.

INVALID  ACCOMMODATION PARAMETERS

24118

If invalid parameters are used to call an accommodation.

INVALID ACCOMMODATION PREFERENCES

24119

If invalid parameters are used to request preferences for an accommodation.

MISSING ACCOMMODATION PREFERENCES

24120

If mandatory parameters are missing to request preferences an accommodation.

INVALID PASSENGER PARAMETERS

24121

If invalid parameters are used to call a Passenger.

MISSING  PASSENGER  PARAMETERS

24122

If mandatory parameters are missing to call a Passenger.

MISSING  PARAMETERS FOR TRIP SUPPLEMENT

24123

If mandatory parameters are missing to call a supplement at leg level.

MISSING  PARAMETERS FOR TRIP SUPPLEMENT

24124

If invalid parameters are used to call a supplement.

MISSING  PARAMETERS FOR LEG SUPPLEMENT

24125

If mandatory parameters are missing to call a supplement at leg level.

MISSING  PARAMETERS FOR LEG SUPPLEMENT

24126

If invalid parameters are used to call a supplement.

MISSING PROVIDER CODE

24197

In case mandatory parameters are missing to define the Provider Code at provider level

INVALID PROVIDER CODE

24198

In case invalid parameters are missing to define the Provider Code at provider level

MISSING CODE CONTEXT

24199

In case mandatory parameters are missing to define the Code Context at provider level

INVALID  CODE CONTEXT

24200

In case invalid parameters are missing to define the Code Context at provider level

SEAT RESERVATION MANDATORY

24201

In case a Not Open fare is sold without the seat reservation associated.

CHECK REDUCTION ASSOCIATION

24203

In case there is a mismatch at reduction level for “Minor” or “Railcard” reductions between the Schedule and Quotes search and the sell.

CHECK NUMBER OF PASSENGERS IN PNRL

24204

In case there is a difference of number of passengers between the PNR and the UK Rail trip booked

INVALID SEAT ASSOCIATION

24205

In case that multi seats are associated to one passenger for one leg

THERE ARE NO ACCOMODATIONS ON OPEN TRIPS

24278

Open fare is supplied in the “Get Accommodation”.

ALL ACCOMODATIONS INCLUDED IN THE PACKAGE FARE SHOULD BE BOOKED

24289

The fare selected contains Inpackage accommodations and not all Inpackage accommodations have been selected to be reserved.

RETURN FARE CAN NOT BE SOLD FOR SINGLE TRIP

24290

In case the short sell is done with a Return fare (Fare Both) for only one single trip (outbound or inbound trip)

THE SET OF ACCOMODATION MUST BE PRICED BEFORE BEING BOOKED

24552

The set of accommodation has not been priced before booking.

THE SET OF EXTRA HAS NOT BEEN PRICED

24790

The set of extra must be priced before booking.

CANNOT BOOK A SUPPLEMENT INPACKAGE TWICE

24819

InPackage Supplements cannot be booked in superior quantities that the InPackage.

## 4.1 Error Reply

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_RailGetAccommodationsRS Version="5.0"> <Error Code="2134" Type="Functional"> CHECK INPUT PARAMETERS</Error> </AMA\_RailGetAccommodationsRS>

  

* * *

## 5 Operations

## 5.1 Operation: 01 - Request for the Accommodation

For Accommodation search, only the proposal identifier is necessary.

## 5.1.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_RailGetAccommodationsRQ Version="5.0"> <ProposalRPH RPH="506"></ProposalRPH> </AMA\_RailGetAccommodationsRQ>

## 5.1.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<AMA\_RailGetAccommodationsRS Version="5.0"> <Success></Success> <Legs> <Leg RPH="31"> <Accommodations> <Accommodation AccomodationCode="STA" RPH="42" ShortDescription="STA" Type="002"> <Description> Seat first class</Description> <PossiblePrefences> <Smoking> <No> </No> </Smoking> <SeatPreferences> <Positions> <Position Type="003"></Position> <Position Type="002"></Position> </Positions> <Configurations> <Configuration Type="008"></Configuration> <Configuration Type="007"></Configuration> <Configuration Type="006"></Configuration> <Configuration Type="003"></Configuration> </Configurations> </SeatPreferences> </PossiblePrefences> </Accommodation> </Accommodations> </Leg> <Leg RPH="30"> <Accommodations> <Accommodation AccomodationCode="STS" RPH="39" ShortDescription="STS" Type="006"> <Description>Lit compartiment single+douche</Description> <PossiblePrefences> <Smoking> <No> </No> </Smoking> <Environments> <Environment Type="004"></Environment> </Environments> <BerthPreferences> <Levels> <Level Type="004"></Level> <Level Type="003"></Level> <Level Type="002"></Level> </Levels> <Genders> <Gender Type="002"></Gender> <Gender Type="003"></Gender> </Genders> </BerthPreferences> </PossiblePrefences> </Accommodation> </Accommodations> </Leg> </Legs> </AMA\_RailGetAccommodationsRS>

## 5.1.3 Possible Errors

See "Error Messages" section.

* * *