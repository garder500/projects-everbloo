---
url: "https://developers.amadeus.com/api-library/soap/functional-doc/82/doc-read/98628?serviceVersion=5.1"
download_url: "https://developers.amadeus.com/PAS-EAS/api/download/comp/4d4ad2cb456c02633f463a055ab70584/98628/ug_fare_tlagetfarerules/ug_fare_tlagetfarerules.html"
title: "ug_fare_tlagetfarerules"
source: "amadeus"
service_id: "82"
service_name: "Fare_TLAGetFareRules"
version: "5.1"
document_id: "98628"
doc_version: "5.1"
doc_type: "User guide"
scraped_at: "2026-07-15T10:15:54.218Z"
---
# Function: GetFareRules

## Overview

This function in charge of retrieving the eligibility conditions associated to a TLA fares returned by a previous availability.

This function is in charge of retrieving eligibility conditions of a Fare (Fare Rules) returned by a previous Ticketless Access Availability function.

As a display, it returns the eligibility conditions associated with the provided fares.

## Supported Operations

Not applicable.

## Limitations

This function is part of the TLA reservation flow. Indeed, it is up to the user to check eligibility conditions of the fare before using it.

## Unsupported Operations

Not applicable.

## Prerequisites

A successful TLA availability request must have been performed previously.

## Building A Query

### Mandatory Parameters

Fare Basis

Fare Basis from which rules are requested

Airline Code

Airline Code associated to the fare basis from which rules are requested.

### Conditional Parameters

Language Code

If several language code are supported, this info might be taken into account for fare rules display. Otherwise, EN is used as default

## Receiving A Reply

As a successful response, free flow text is provided, which contains Fare Rules eligibility conditions.

## Reply Structure

Please refer to the provided reply example for structure.

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<APIv2XMLReply><TLAccess\_GetFareRulesReply><messageFunctionInfo><messageFunctionDetails><messageFunction>712</messageFunction></messageFunctionDetails></messageFunctionInfo><fareRulesDetails><freeTextQualification><textSubjectQualifier>3</textSubjectQualifier></freeTextQualification><freeText> TAX INCREASES AND REDUCTIONS</freeText></fareRulesDetails><fareRulesDetails><freeTextQualification><textSubjectQualifier>3</textSubjectQualifier></freeTextQualification><freeText> Sterling cannot accept responsibility for increases in ticket prices</freeText><freeText>as a consequence of increased taxes. In the event of a tax increase yo</freeText><freeText>u will be charged an extra amount, corresponding to the increase. In t</freeText><freeText>he event of a tax reduction after the purchase of your ticket, Sterlin</freeText><freeText>g will not refund the amount corresponding to the decrease.</freeText></fareRulesDetails><fareRulesDetails><freeTextQualification><textSubjectQualifier>3</textSubjectQualifier></freeTextQualification><freeText> CHANGES</freeText></fareRulesDetails><fareRulesDetails><freeTextQualification><textSubjectQualifier>3</textSubjectQualifier></freeTextQualification><freeText> Change of date, time or name\\ Possible against a fee of DKK (Denmark)</freeText><freeText>\\ 299 / NOK (Norway)\\ 332 / SEK (Sweden)\\ 374 / EUR\\ (outside Scandina</freeText><freeText>via) 40 per one-way per passenger.</freeText></fareRulesDetails><fareRulesDetails><freeTextQualification><textSubjectQualifier>3</textSubjectQualifier></freeTextQualification><freeText> If you change your form of payment, from one creditcard to another, a</freeText><freeText> fee of DKK (Denmark) 149/SEK (Sweden) 179/NOK (Norway) 159/EUR (outsi</freeText><freeText>de Scandinavia) 19 will be charged.</freeText></fareRulesDetails><fareRulesDetails><freeTextQualification><textSubjectQualifier>3</textSubjectQualifier></freeTextQualification><freeText> Changes may take place via Sterling\\s Call Centre no later than two h</freeText><freeText>ours before the planned departure. Please note that changes made via t</freeText><freeText>he Internet can take place no later than 24 hours before the planned d</freeText><freeText>eparture.</freeText></fareRulesDetails><fareRulesDetails><freeTextQualification><textSubjectQualifier>3</textSubjectQualifier></freeTextQualification><freeText> Changes can be made free of charge until 2 hours after purchase.</freeText></fareRulesDetails><fareRulesDetails><freeTextQualification><textSubjectQualifier>3</textSubjectQualifier></freeTextQualification><freeText> If you change your ticket to a more expensive fare, the difference be</freeText><freeText>tween the two fares will be added to the above fee.</freeText></fareRulesDetails><fareRulesDetails><freeTextQualification><textSubjectQualifier>3</textSubjectQualifier></freeTextQualification><freeText> The ticket cannot be changed to a cheaper ticket.</freeText></fareRulesDetails><fareRulesDetails><freeTextQualification><textSubjectQualifier>3</textSubjectQualifier></freeTextQualification><freeText> If you wish to change to an earlier departure date, the change must b</freeText><freeText>e made at least 2 hours prior to such departure.</freeText></fareRulesDetails><fareRulesDetails><freeTextQualification><textSubjectQualifier>3</textSubjectQualifier></freeTextQualification><freeText> GENERAL INFORMATION</freeText></fareRulesDetails><fareRulesDetails><freeTextQualification><textSubjectQualifier>3</textSubjectQualifier></freeTextQualification><freeText> Please note that there may be several price categories for a given ty</freeText><freeText>pe of ticket.</freeText></fareRulesDetails><fareRulesDetails><freeTextQualification><textSubjectQualifier>3</textSubjectQualifier></freeTextQualification><freeText> The original departure country of your reservation, determines the cu</freeText><freeText>rrency which will be added to the customer account.</freeText></fareRulesDetails><fareRulesDetails><freeTextQualification><textSubjectQualifier>3</textSubjectQualifier></freeTextQualification><freeText> Due to currency fluctuations fees for changes and cancellations are s</freeText><freeText>ubject to change without notice</freeText></fareRulesDetails><fareRulesDetails><freeTextQualification><textSubjectQualifier>3</textSubjectQualifier></freeTextQualification><freeText> CANCELLATION</freeText></fareRulesDetails><fareRulesDetails><freeTextQualification><textSubjectQualifier>3</textSubjectQualifier></freeTextQualification><freeText> Cancellation of ticket\\ Possible against a fee of DKK (Denmark)\\ 299</freeText><freeText>/ NOK (Norway)\\ 332 / SEK (Sweden)\\ 374 / EUR\\ (outside Scandinavia) 4</freeText><freeText>0 per one-way per passenger. The remaining amount will be refunded to</freeText><freeText>a customer credit account, which can be used to purchase Sterling tick</freeText><freeText>ets in the future. The amount will be stored in the account for 12 mon</freeText><freeText>ths, hereafter the amount will be annulled.</freeText></fareRulesDetails><fareRulesDetails><freeTextQualification><textSubjectQualifier>3</textSubjectQualifier></freeTextQualification><freeText> Cancellation may take place via Sterling\\s Call Centre no later than</freeText><freeText>two hours before the planned departure. Please note that cancellation</freeText><freeText>made via the Internet can take place no later than 24 hours before the</freeText><freeText> planned departure.</freeText></fareRulesDetails><fareRulesDetails><freeTextQualification><textSubjectQualifier>3</textSubjectQualifier></freeTextQualification><freeText> CHILD DISCO</freeText></fareRulesDetails></TLAccess\_GetFareRulesReply></APIv2XMLReply> -

## Error Messages

ERROR CODE

ERROR MESSAGE

REJECT REASON

00042

CHECK LINE NUMBER

Occurs when the number of line is missing or is wrong

00043

NEED AVAILABILITY DISPLAY

Occurs when no availability before fare rules request

21849

TICKETLESS ACCESS CARRIER FARE RULES MISSING

Occurs when no fare rules are attached to the Fare

00001

CHECK FORMAT

Occurs when input parameters are incorrect

02162

LINK DOWN - RETRY IN 2 MINUTES

Occurs when there is technical problem

00011

UNABLE TO PROCESS

Occurs if no response from Ticketless Access Carrier

## Operation: Retrieve Fare Rules corresponding to Fare Basis OB belonging to Sterling (NB)

Retrieve eligibility conditions associated to Fare Basis OB belonging to airline Sterling (airline code : NB)

## Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<APIv2XMLQuery><TLAccess\_GetFareRules><messageFunctionInfo><messageFunctionDetails><messageFunction>712</messageFunction></messageFunctionDetails></messageFunctionInfo><fareBasisInfo><fareBasisDetails><tariffClassId>OB</tariffClassId><companyDetails><marketingCompany>NB</marketingCompany></companyDetails></fareBasisDetails></fareBasisInfo></TLAccess\_GetFareRules></APIv2XMLQuery>

## Possible Errors

See "Error Messages" section.