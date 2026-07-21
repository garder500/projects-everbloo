---
url: "https://developers.amadeus.com/api-library/soap/functional-doc/1247/doc-read/101636?serviceVersion=7.3"
download_url: "https://developers.amadeus.com/PAS-EAS/api/download/comp/4d4ad2cb456c02633f463a055ab70584/101636/UG_WBS_PNR_DisplayTSM_TMCORQ_07.3_107/UG_WBS_PNR_DisplayTSM_TMCORQ_07.3_107.html"
title: "UG_WBS_PNR_DisplayTSM_TMCORQ_07.3_107"
source: "amadeus"
service_id: "1247"
service_name: "PNR_DisplayTSM"
version: "7.3"
document_id: "101636"
doc_version: "7.3"
doc_type: "User guide"
file_format: "HTML"
scraped_at: "2026-07-15T10:35:24.764Z"
---
# Function: DisplayTSM

## Overview

It retrieves all TSM data based on a TSM tattoo number.  
  
The response sends the full data of the TSM. In particular, the Ticketed statusis showing whether the TSM has been issued or not.  
  
Corresponding Edifact messages:  
TMCORQ 1A 07.3  
TMCORR 1A 07.3

## Supported Operations

Display any existing TSM type M, E, F (TASF only) or P in anactive PNR.

## Limitations

The display is for one TSM only.

## Unsupported Operations

TSM type F for US market and BA ATO/CTO can't bedisplayed.

## Prerequisites

Prior to using the function operations, it is necessary tohave an active PNR in the session with at least a passenger name.  
  
The TSM tattoo is required in case of multi TSM in the PNR.

## Building A Query

Following data are mandatory in the query message:

-   passenger name (except for TSM type P)
-   TSM tattoo

The query has the same format for all TSM types.

## Receiving A Reply

There is only one type of reply, which consists in thedisplay of TSM data or an error.

## Reply Structure

Example of display reply of a TSM type M which has beenissued:

## XML Error Reply

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_DisplayTSM xmlns="http\\://xml.amadeus.com/TMCORQ\_07\_3\_1A"> <msg> <messageFunctionDetails> <businessFunction>47</businessFunction> </messageFunctionDetails> </msg> <mcoData> <paxTattoo> <paxDetails> <surname> </surname> </paxDetails> </paxTattoo> <mcoDocData> <tktNumber> <documentDetails> <number>3</number> <dataIndicator>REF</dataIndicator> </documentDetails> </tktNumber> </mcoDocData> </mcoData> </PNR\_DisplayTSM> \-

## Error Messages

Error Code

Error Text

11

UNABLE TO PROCESS

1499

DISPLAY IS RESTRICTED

10747

NO TSM RECORD EXISTS

## Operation: Display a TSM

This query requests the display of the TSM 3. The query isthe same for all TSM types.

## Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<PNR\_DisplayTSM xmlns="http\\://xml.amadeus.com/TMCORQ\_07\_3\_1A"> <msg> <messageFunctionDetails> <businessFunction>47</businessFunction> </messageFunctionDetails> </msg> <mcoData> <paxTattoo> <paxDetails> <surname> </surname> </paxDetails> </paxTattoo> <mcoDocData> <tktNumber> <documentDetails> <number>3</number> <dataIndicator>REF</dataIndicator> </documentDetails> </tktNumber> </mcoDocData> </mcoData> </PNR\_DisplayTSM>

## Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## Possible Errors