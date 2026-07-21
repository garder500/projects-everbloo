---
url: "https://developers.amadeus.com/api-library/soap/functional-doc/10/doc-read/98310?serviceVersion=1.2"
download_url: "https://developers.amadeus.com/PAS-EAS/api/download/comp/4d4ad2cb456c02633f463a055ab70584/98310/ug_doc_displayitinerary/ug_doc_displayitinerary.html"
title: "ug_doc_displayitinerary"
source: "amadeus"
service_id: "10"
service_name: "Doc_DisplayItinerary"
version: "1.2"
document_id: "98310"
doc_version: "1.2"
doc_type: "User guide"
file_format: "HTML"
scraped_at: "2026-07-15T10:19:26.547Z"
---
# Function: DisplayItinerary

## Overview

Is used to display travel arrangements from a retrieved or modified PNR.

The function Display Itinerary is used to display travel arrangements from a retrieved or modified PNR, which can include flight information, hotel and car rental information, and any other miscellaneous information. If more than one passenger exists, the system displays a joint itinerary. The Display Itinerary allows data to be displayed in the language\* of your choice.

\*See the Office User's Guide for an explanation of how to display the current settings of an office profile.

## Supported Operations

Not applicable

## Limitations

The common message language is English (EN). Others languages available on the system include:

Language

FR - FRENCH

DA - DANISH

GE - GERMAN

DU - DUTCH

IT - ITALIAN

SW - SWEDISH

PO - PORTUGUESE

SP - SPANISH

NO - NORWEGIAN

  

## Unsupported Operations

Not applicable

## Prerequisites

An existing itinerary, from an existing and or a newly created PNR.

## Building A Query

Depending on the flavor of the API that is used, each query will follow a given structure. The queries for the function operations are clearly explained with data element examples in a generic table view that can be adapted to the specific flavor of the API in use.

It is important to note that the examples in each chapter are only illustrations and are meant to provide the basis for a better understanding on which fields are mandatory for basic operation utilization. It is not a full explanation of every field that can be utilized for the operation, but rather a guideline to its use.

**Note**: It is possible to request a display of the itinerary in a language not present in the language preference of the office profile\*. This language should be present among the languages offered on the Amadeus system.

\*See the Office User's Guide for an explanation of how to display the current settings of an office profile.

## Receiving A Reply

## Reply Structure

This example reply shows the fields and the possible values that could be returned. The query was made requesting English as the language.

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Doc\_DisplayItineraryReply><agencyInfo><agency><name>API-TEST OFF-GEN USE</name><addressLine1>9250 NW 36 ST</addressLine1><addressLine2>AMADEUS CENTER</addressLine2><cityName>MIAMI FL 33178</cityName><countryName>US</countryName></agency><contact><phone>305 499 8746</phone></contact></agencyInfo><agencyInfo><agency><name>API-TEST OFF-GEN USE</name><addressLine1>9250 NW 36 ST</addressLine1><addressLine2>AMADEUS CENTER</addressLine2><cityName>MIAMI FL 33178</cityName><countryName>US</countryName></agency><contact><phone>305 499 8746</phone></contact></agencyInfo><reservationInfo><reservation><companyId>1A</companyId><controlNumber>ZGHJZ5</controlNumber></reservation></reservationInfo><reservationInfo><reservation><companyId>AF</companyId><controlNumber>2ED6UE</controlNumber></reservation></reservationInfo><reservationInfo><reservation><companyId>DL</companyId><controlNumber>5IN05I</controlNumber></reservation></reservationInfo><passengerInfoSection><passengerInformation><traveller><surname>PAGNOL/UGOLIN</surname></traveller></passengerInformation><passengerReference><reference><qualifier>P</qualifier><number>1</number></reference></passengerReference></passengerInfoSection><passengerInfoSection><passengerInformation><traveller><surname>PAGNOL/MANON</surname></traveller></passengerInformation><passengerReference><reference><qualifier>P</qualifier><number>2</number></reference></passengerReference></passengerInfoSection><segmentSection><dummy></dummy><otherSegmentSection><travelInfo><processingIndicator>FLT</processingIndicator><product><startDate>280804</startDate><startTime>1045</startTime><endDate>280804</endDate><endTime>1330</endTime></product><departureInfo><type>AI</type><code>NCE</code><name>COTE D AZUR </name></departureInfo><departureInfo><type>CI</type><name>NICE</name></departureInfo><departureInfo><type>CO</type><code>FR</code></departureInfo><departureInfo><type>TE</type><name>2</name></departureInfo><arrivalInfo><type>AI</type><code>JFK</code><name>JOHN F KENNEDY </name></arrivalInfo><arrivalInfo><type>CI</type><name>NEW YORK</name></arrivalInfo><arrivalInfo><type>ST</type><code>NY</code></arrivalInfo><arrivalInfo><type>CO</type><code>US</code></arrivalInfo><companyIdentification><type>A</type><code>DL</code><name>DELTA AIR LINES</name></companyIdentification><companyIdentification><type>J</type><code>DL</code></companyIdentification><productIdentification><code>83</code><weekDay>SAT</weekDay><firstCharacteristic>J</firstCharacteristic><status>HK</status><itemDescription>N</itemDescription></productIdentification><additionalInfo><secondCharacteristic>763</secondCharacteristic><numberOfStops>0</numberOfStops></additionalInfo><timeDetails><duration> 8:45</duration></timeDetails><mileageInfo><measurementValue>3991</measurementValue></mileageInfo></travelInfo><travelReference><reference><qualifier>S</qualifier><number>3</number></reference></travelReference><mealInfo><meal><code>L</code><facilityDescription>LUNCH</facilityDescription><qualifier>FLT</qualifier></meal></mealInfo><multiLegInfoSection><legInfo><processingIndicator>LEG</processingIndicator><departureInfo><type>AI</type><code>NCE</code><name>COTE D AZUR</name></departureInfo><departureInfo><type>CI</type><name>NICE</name></departureInfo><arrivalInfo><type>AI</type><code>JFK</code><name>JOHN F KENNEDY </name></arrivalInfo><arrivalInfo><type>CI</type><name>NEW YORK</name></arrivalInfo><arrivalInfo><type>ST</type><code>NY</code></arrivalInfo></legInfo></multiLegInfoSection></otherSegmentSection></segmentSection><segmentSection><dummy></dummy><otherSegmentSection><travelInfo><processingIndicator>HTL</processingIndicator><product><startDate>280804</startDate><endDate>060904</endDate></product><departureInfo><type>LO</type><name>NEW YORK</name></departureInfo><departureInfo><type>CI</type><code>10019</code><name>NEW YORK</name></departureInfo><departureInfo><type>ST</type><code>NY</code></departureInfo><departureInfo><type>CO</type><name>UNITED STATES OF AMERICA</name></departureInfo><companyIdentification><type>N</type><name>LE PARKER MERIDIEN</name></companyIdentification><companyIdentification><type>C</type><name>LE MERIDIEN</name></companyIdentification><productIdentification><code>107991724</code><firstCharacteristic>MDNYCMER</firstCharacteristic><status>OK</status></productIdentification><additionalInfo><secondCharacteristic>KING SIZE</secondCharacteristic><thirdCharacteristic>A08LV0</thirdCharacteristic></additionalInfo></travelInfo><travelReference><reference><qualifier>S</qualifier><number>4</number></reference></travelReference><optionInfo><optionDetail><type>CXL</type><freetext>BY 1400 28AUG2004 LOCAL PROPERTY TIME</freetext></optionDetail></optionInfo><optionInfo><optionDetail><type>LA1</type><freetext>118 WEST 57 STREET</freetext></optionDetail></optionInfo><optionInfo><optionDetail><type>DES</type><freetext>RACK RATE ROOM ONLY LARGE TOWER JUNIOR SUITE 1 KING BED</freetext></optionDetail></optionInfo><optionInfo><optionDetail><type>HLD</type><freetext>2PM</freetext></optionDetail></optionInfo><optionInfo><optionDetail><type>LPH</type><freetext>1 212 245 5000</freetext></optionDetail></optionInfo><optionInfo><optionDetail><type>LFX</type><freetext>1 212 307 1776</freetext></optionDetail></optionInfo><optionInfo><optionDetail><type>LTX</type><freetext>NONE</freetext></optionDetail></optionInfo><rateInformations><ratePrice><rateAmount> 500.00</rateAmount></ratePrice><rateInfo><ratePlan>RAC</ratePlan><currency>USD</currency><category>DLY</category></rateInfo><rateIndicator><safety>N</safety></rateIndicator><roomInfo><type>1</type><nbrOfRooms>1</nbrOfRooms><category>S1K</category></roomInfo></rateInformations><travelAssociation><reference><qualifier>P</qualifier><number>2</number></reference></travelAssociation></otherSegmentSection></segmentSection><segmentSection><dummy></dummy><otherSegmentSection><travelInfo><processingIndicator>FLT</processingIndicator><product><startDate>060904</startDate><startTime>1710</startTime><endDate>070904</endDate><endTime>0600</endTime></product><departureInfo><type>AI</type><code>JFK</code><name>JOHN F KENNEDY </name></departureInfo><departureInfo><type>CI</type><name>NEW YORK</name></departureInfo><departureInfo><type>ST</type><code>NY</code></departureInfo><departureInfo><type>CO</type><code>US</code></departureInfo><arrivalInfo><type>AI</type><code>CDG</code><name>CHARLES DE GAULLE </name></arrivalInfo><arrivalInfo><type>CI</type><name>PARIS</name></arrivalInfo><arrivalInfo><type>CO</type><code>FR</code></arrivalInfo><arrivalInfo><type>TE</type><name>2E</name></arrivalInfo><companyIdentification><type>A</type><code>AF</code><name>AIR FRANCE</name></companyIdentification><companyIdentification><type>J</type><code>AF</code></companyIdentification><productIdentification><code>23</code><weekDay>MON</weekDay><firstCharacteristic>P</firstCharacteristic><status>HK</status><itemDescription>N</itemDescription></productIdentification><additionalInfo><secondCharacteristic>772</secondCharacteristic><numberOfStops>0</numberOfStops></additionalInfo><timeDetails><duration> 6:50</duration><checkinTime>1610</checkinTime></timeDetails><mileageInfo><measurementValue>3634</measurementValue></mileageInfo></travelInfo><travelReference><reference><qualifier>S</qualifier><number>5</number></reference></travelReference><mealInfo><meal><code>M</code><facilityDescription>MEAL</facilityDescription><qualifier>FLT</qualifier></meal></mealInfo><mealInfo><meal><code>B</code><facilityDescription>BREAKFAST</facilityDescription><qualifier>FLT</qualifier></meal></mealInfo><multiLegInfoSection><legInfo><processingIndicator>LEG</processingIndicator><departureInfo><type>AI</type><code>JFK</code><name>JOHN F KENNEDY </name></departureInfo><departureInfo><type>CI</type><name>NEW YORK</name></departureInfo><departureInfo><type>ST</type><code>NY</code></departureInfo><arrivalInfo><type>AI</type><code>CDG</code><name>CHARLES DE GAULLE</name></arrivalInfo><arrivalInfo><type>CI</type><name>PARIS</name></arrivalInfo></legInfo></multiLegInfoSection></otherSegmentSection></segmentSection><segmentSection><dummy></dummy><carSegmentSection><carProduct><companyInformation><identification>ZI</identification><name>AVIS</name></companyInformation><location><type>P</type><identification>CDG</identification><dropOffName>AEROPORT ROISSY C</dropOffName><pickupCityName>PARIS</pickupCityName></location><product><startDate>070904</startDate><startTime>0600</startTime><endDate>120904</endDate><endTime>1440</endTime></product><vehicleInformationCode><typeCode>EBMN</typeCode></vehicleInformationCode><vehicleCharacteristic><carType>ECONOMY 2 DOOR MANUAL NO-AIR</carType></vehicleCharacteristic><rateInfoDetails><category>R</category><code>Q</code><identifier>EUR 222.00- .00 UNL WY 31.00- UNL XD 51.</identifier></rateInfoDetails><statusConfirmation><statusCode>RQ</statusCode></statusConfirmation><taxInfo><name>VAT</name><value>19.60</value></taxInfo></carProduct><carTravelReference><reference><qualifier>S</qualifier><number>6</number></reference></carTravelReference><carSurcharge><surchagePolicy><name>AIRPORT SURCHARGE</name><duration>4</duration><currency>EUR</currency><valueAmount>21.50</valueAmount></surchagePolicy></carSurcharge><carSurcharge><surchagePolicy><name>REGISTRATION FEE/ ROAD TAX</name><duration>1</duration><currency>EUR</currency><valueAmount>2.30</valueAmount></surchagePolicy></carSurcharge><carCoverage><policy><amount>14.63</amount><currency>EUR</currency><excess>450.00</excess><name>COLLISION DAMAGE WAIVER</name><type>CDW</type><duration>1</duration></policy></carCoverage><carCoverage><policy><amount>6.25</amount><currency>EUR</currency><name>PERSONAL ACCIDENT INSURANCE</name><type>PAI</type><duration>1</duration></policy></carCoverage><carCoverage><policy><amount>9.30</amount><currency>EUR</currency><name>SUPER PERSONAL ACCIDENT INSURANCE</name><type>SPAI</type><duration>1</duration></policy></carCoverage><carCoverage><policy><amount>4.00</amount><currency>EUR</currency><name>SUPER THEFT PROTECTION</name><type>STP</type><duration>1</duration></policy></carCoverage><carCoverage><policy><amount>5.64</amount><currency>EUR</currency><name>THEFT PROTECTION</name><type>TP</type><duration>1</duration></policy></carCoverage><carAssociation><reference><qualifier>P</qualifier><number>1</number></reference></carAssociation></carSegmentSection></segmentSection><segmentSection><dummy></dummy><otherSegmentSection><travelInfo><processingIndicator>FLT</processingIndicator><product><startDate>120904</startDate><startTime>1540</startTime><endDate>120904</endDate><endTime>1715</endTime></product><departureInfo><type>AI</type><code>CDG</code><name>CHARLES DE GAULLE </name></departureInfo><departureInfo><type>CI</type><name>PARIS</name></departureInfo><departureInfo><type>CO</type><code>FR</code></departureInfo><departureInfo><type>TE</type><name>2F</name></departureInfo><arrivalInfo><type>AI</type><code>NCE</code><name>COTE D AZUR </name></arrivalInfo><arrivalInfo><type>CI</type><name>NICE</name></arrivalInfo><arrivalInfo><type>CO</type><code>FR</code></arrivalInfo><arrivalInfo><type>TE</type><name>2</name></arrivalInfo><companyIdentification><type>A</type><code>AF</code><name>AIR FRANCE</name></companyIdentification><companyIdentification><type>J</type><code>AF</code></companyIdentification><productIdentification><code>7706</code><weekDay>SUN</weekDay><firstCharacteristic>Y</firstCharacteristic><status>HK</status><itemDescription>N</itemDescription></productIdentification><additionalInfo><secondCharacteristic>319</secondCharacteristic><numberOfStops>0</numberOfStops></additionalInfo><timeDetails><duration> 1:35</duration><checkinTime>1510</checkinTime></timeDetails><mileageInfo><measurementValue>432</measurementValue></mileageInfo></travelInfo><travelReference><reference><qualifier>S</qualifier><number>7</number></reference></travelReference><multiLegInfoSection><legInfo><processingIndicator>LEG</processingIndicator><departureInfo><type>AI</type><code>CDG</code><name>CHARLES DE GAULLE</name></departureInfo><departureInfo><type>CI</type><name>PARIS</name></departureInfo><arrivalInfo><type>AI</type><code>NCE</code><name>COTE D AZUR</name></arrivalInfo><arrivalInfo><type>CI</type><name>NICE</name></arrivalInfo></legInfo></multiLegInfoSection></otherSegmentSection></segmentSection></Doc\_DisplayItineraryReply> -

## Error Messages

CODE

ERROR TEXT

00020

RESTRICTED

00339

NEED NAMES

00818

ERROR - REQUIRED FIELD MISSING: (NAME-TG0NAM)(ADDRESS-TG0ADR)(PRINTER

01897

EXCEED MAXIMUM ELEMENTS

01902

ITEM TOO LONG/NOT ENTERED/

01908

CHECK PASSENGER NUMBER

01966

NEED ITINERARY

01969

VERIFY ITINERARY

02038

INVALID LANGUAGE CODE

02126

USE NAME SELECT/JOINT ITINERARY

02264

NO ASSOCIATED PRINTER - CONTACT HELP DESK

02631

INVALID JOINT ITINERARY-CHECK PASSENGER ASSOCIATION

03027

ITINERARY SENT

03493

ITINERARY/INVOICE NOT ALLOWED FOR NON-HOMOGENEOUS PNR

04816

INVALID - PAST DATE SEGMENTS MAY NOT BE SELECTED

06846

RESTRICTED FOR AUXILIARY SEGMENT

06848

RESTRICTED - CHECK AB/AM PASSENGER ASSOCIATION

08027

LOCATION NOT FOUND IN DPR FOR DOCUMENT TYPE

  

## Operation: Language Reference French

Display itinerary, requested in French.

## Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Doc\_DisplayItinerary><language><code>FR</code></language></Doc\_DisplayItinerary>

## Possible Errors

See "Error Messages", section.

## Operation: Language Reference English

Display itinerary, requested in English.

## Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Doc\_DisplayItinerary><language><code>EN</code></language></Doc\_DisplayItinerary>

## Possible Errors

See "Error Messages", section.