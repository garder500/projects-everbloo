---
url: "https://developers.amadeus.com/api-library/soap/functional-doc/974/doc-read/100677?serviceVersion=8.1"
download_url: "https://developers.amadeus.com/PAS-EAS/api/download/comp/4d4ad2cb456c02633f463a055ab70584/100677/UG_WBS_Fare_DisplayCurrencyIATARates_FCUQAQ_08.1_009/UG_WBS_Fare_DisplayCurrencyIATARates_FCUQAQ_08.1_009.html"
title: "UG_WBS_Fare_DisplayCurrencyIATARates_FCUQAQ_08.1_009"
source: "amadeus"
service_id: "974"
service_name: "Fare_DisplayCurrencyIATARates"
version: "8.1"
document_id: "100677"
doc_version: "8.1"
doc_type: "User guide"
scraped_at: "2026-07-15T10:10:46.216Z"
---
# Function: DisplayCurrencyIATARates

## Overview

The PSP ServiceDisplayCurrencyIATARates works as a Stand-alone transaction. It is used to return the IATA Rate of exchange of any currency, at a specific date.

The PSP ServiceDisplayCurrencyIATARates works as a Stand-alonetransaction. It is used to return the IATA Rate of exchange of anycurrency, at a specific date.

The PSP DisplayCurrencyIATARates transaction (FQA) returns:

-   TheIATA Rate Of exchange (IROE) of any currency. It means the rate of conversionbetween the NUC (Neutral Unit of Construction) and a specific currency.

The PSP DisplayCurrencyIATARatestransaction is based on the options input by the user:

-   Thecurrency for which the IROE should be returned
-   Or,the country using this currency
-   Or,a city (or airport) of the country using this currency
-   Aspecific date for which the IROE should be effective.

## Supported Operations

Acurrency must be provided in input. The 4 possibilities to specify it are thefollowing:

-   ACurrency ISO code. (3 letters)
-   ACountry ISO code. (2 letters)
-   ACity (or Airport) ISO code. (3 letters)
-   ACountry Name. (Free form text)

???? Only one optional input:

-   Aspecific date (DDMMYY format)  
    

## Limitations

-   Ifthe currency specified in input is a Soft currency, then 2 possibilities forthe output:
    -   if it is a Currencyof country for which domestic and international fares are published in EUR, thenthe only IROE returned is the one used for EUR.
    -   if it is a Currencyof country for which domestic and international fares are published in USD,then the only IROE returned is the one used for USD.
-   Datelimitations:
    -   If a future date is specified in theinput, a reject message indicating: "FUTURE DATE NOT PROCESSED" will be returned.
    -   Historical rates used for currencyconversion will be stored for 12 months. If the specified date is more than 12months past, a reject message indicating "PASTDATE MUST BE WITHIN A RANGE OF ONE YEAR" will be returned.

## Unsupported Operations

Not applicable

## Prerequisites

Not applicable

## Building A Query

The queries for the DisplayCurrencyIATARatesfunction are explained with examples in the following chapters.  
It is important to note that the examples,in each chapter, are illustrations only and are meant to provide the basis fora better understanding on which fields are mandatory for basic operationutilization. It is not a full explanation of every field that can be utilizedfor the operation, but rather a guideline to its use.

Notethat, for each input, a note (M) is added to indicate if it is mandatory. Incase no note is added, the input is optional.

-   Currency (currency code /country code /city (or Airport)code /country name)
-   Date for historic stored rate. A check is made to ensurethat this is a past date. If this check fails, the request is rejected.

## Receiving A Reply

If no reject message is generated,the following information is provided:  
Once for the Transaction:

-   The Message Function details
-   Per Currency (NUC / Currencyspecified in input):
    -   CurrencyISO code
    -   Currencyname (free form text)
-   The Rounding details:
    -   RoundingType (always "Rounding of Fares" for the IROE transaction)
    -   Destinationcurrency ISO code
    -   RoundingUnit
    -   Roundingmethod ("rounding Up" / "Down" / "To the nearest" / -- nothing --)
-   The conversion process details:
    -   Theconversion mode (To / From)
    -   Thecurrency ISO code
-   The IROE details:
    -   Startvalidity date of the Rate
    -   Endvalidity date of the Rate (if any)
    -   Ratename (always "ROE" for the IROE transaction)
    -   Rate
    -   The2 currency ISO codes between which the rate applies

## Reply Structure

## XML Error Reply

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

\-

## Error Messages

The following rejects occurs when data specified in the request is not valid,although it is compatible with the message definition  
  
Usual reject examples:

ERROR MESSAGE

DESCRIPTION

VERIFY CURRENCY

If ISO currency code (3 letters) does not exist.  
If Free form text country name (more than 3 letters) does not exist.  
If ISO currency code has less than 3 letters.

VERIFY COUNTRY CODE

If ISO country code (2 letters) does not exist.

VERIFY CITY

If ISO city code (3 letters) does not exist.

CHECK FORMAT

If ISO currency code has more than 3 letters.  
If ISO country code has more than 3 letters.  
If ISO city code has more than 3 letters.  
If date specified in input has not a DDMMYY format.

FUTURE DATE NOT PROCESSED

If date specified in input is a future date...

PASTDATE MUST BE WITHIN A RANGE OF ONE YEAR

If date specified in input is more than 12 monthpast.

INVALID DATE FORMAT

If the 2 digits Day is not a valid Day (ex: 340107).  
If the 2 digits Month is not a valid Month (ex: 141307).

## Operation: 1 - Country code specified / Hard currency

Display ofthe IATA Rate of Exchange (IROE) of a currency (type Hard Currency) requestedvia a Country code. (Hard Currency = Currency ofcountry for which the international fares are published in local currency)

## Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_DisplayCurrencyIATARates xmlns="http://xml.amadeus.com/FCUQAQ\_08\_1\_1A"> <message> <messageFunctionDetails> <messageFunction>ROE</messageFunction> </messageFunctionDetails> </message> <conversionDetails> <conversionDirection> <selectionDetails> <option>706</option> </selectionDetails> </conversionDirection> <locationInfo> <locationType>26</locationType> <firstLocationDetails> <code>GB</code> </firstLocationDetails> </locationInfo> </conversionDetails> </Fare\_DisplayCurrencyIATARates>

## Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_DisplayCurrencyIATARatesReply xmlns="http://xml.amadeus.com/FCUQAR\_08\_1\_1A"> <message> <messageFunctionDetails> <messageFunction>ROE</messageFunction> </messageFunctionDetails> </message> <freeTextInfo> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>NUC - NEUTRAL UNIT OF CONSTRUCTION</freeText> </freeTextInfo> <freeTextInfo> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>GBP - POUND STERLING</freeText> </freeTextInfo> <conversionRoundingInfo> <conversionRateDetails> <conversionType>700</conversionType> <currency>GBP</currency> <roundingUnit>1.00</roundingUnit> <roundingMethod>702</roundingMethod> </conversionRateDetails> </conversionRoundingInfo> <involvedCurrency> <conversionDirection> <selectionDetails> <option>706</option> </selectionDetails> </conversionDirection> <currencyDetails> <conversionRateDetails> <currency>NUC</currency> </conversionRateDetails> </currencyDetails> </involvedCurrency> <involvedCurrency> <conversionDirection> <selectionDetails> <option>707</option> </selectionDetails> </conversionDirection> <currencyDetails> <conversionRateDetails> <currency>GBP</currency> </conversionRateDetails> </currencyDetails> </involvedCurrency> <conversionDetails> <dateInfo> <dateAndTimeDetails> <qualifier>B</qualifier> <date>010108</date> </dateAndTimeDetails> </dateInfo> <conversionRate> <conversionRateDetails> <originCurrency>NUC</originCurrency> <rateType>ROE</rateType> <rate>0.490187</rate> </conversionRateDetails> <otherConvRateDetails> <destinationCurrency>GBP</destinationCurrency> </otherConvRateDetails> </conversionRate> </conversionDetails> </Fare\_DisplayCurrencyIATARatesReply>

## Possible Errors

See "Error Messages" section.

## Operation: 2 - Country name Date specified / Hard Currency

Return the IROEof a currency (type Hard Currency) requested via a Country name. An optional Dateis specified.  
(Hard Currency = Currency of country for which theinternational fares are published in local currency)

## Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_DisplayCurrencyIATARates xmlns="http://xml.amadeus.com/FCUQAQ\_08\_1\_1A"> <message> <messageFunctionDetails> <messageFunction>ROE</messageFunction> </messageFunctionDetails> </message> <conversionDetails> <conversionDirection> <selectionDetails> <option>706</option> </selectionDetails> </conversionDirection> <locationInfo> <locationType>26</locationType> <firstLocationDetails> <name>MOROCCO</name> </firstLocationDetails> </locationInfo> </conversionDetails> </Fare\_DisplayCurrencyIATARates>

## Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_DisplayCurrencyIATARatesReply xmlns="http://xml.amadeus.com/FCUQAR\_08\_1\_1A"> <message> <messageFunctionDetails> <messageFunction>ROE</messageFunction> </messageFunctionDetails> </message> <freeTextInfo> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>NUC - NEUTRAL UNIT OF CONSTRUCTION</freeText> </freeTextInfo> <freeTextInfo> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>MAD - MOROCCAN DIRHAM</freeText> </freeTextInfo> <conversionRoundingInfo> <conversionRateDetails> <conversionType>700</conversionType> <currency>MAD</currency> <roundingUnit>5.00</roundingUnit> <roundingMethod>700</roundingMethod> </conversionRateDetails> </conversionRoundingInfo> <involvedCurrency> <conversionDirection> <selectionDetails> <option>706</option> </selectionDetails> </conversionDirection> <currencyDetails> <conversionRateDetails> <currency>NUC</currency> </conversionRateDetails> </currencyDetails> </involvedCurrency> <involvedCurrency> <conversionDirection> <selectionDetails> <option>707</option> </selectionDetails> </conversionDirection> <currencyDetails> <conversionRateDetails> <currency>MAD</currency> </conversionRateDetails> </currencyDetails> </involvedCurrency> <conversionDetails> <dateInfo> <dateAndTimeDetails> <qualifier>B</qualifier> <date>011207</date> </dateAndTimeDetails> </dateInfo> <conversionRate> <conversionRateDetails> <originCurrency>NUC</originCurrency> <rateType>ROE</rateType> <rate>8.20466</rate> </conversionRateDetails> <otherConvRateDetails> <destinationCurrency>MAD</destinationCurrency> </otherConvRateDetails> </conversionRate> </conversionDetails> </Fare\_DisplayCurrencyIATARatesReply>

## Possible Errors

See "Error Messages" section.

## Operation: 3 - Currency Code specified / Soft Currency

Return theIROE of a currency (type Soft Currency via EURO) requested via a its currencycode.  
(Soft Currency = Currency of country for which domestic andinternational fares are published in EUR or USD, depending the currency type)

## Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_DisplayCurrencyIATARates xmlns="http://xml.amadeus.com/FCUQAQ\_08\_1\_1A"> <message> <messageFunctionDetails> <messageFunction>ROE</messageFunction> </messageFunctionDetails> </message> <conversionDetails> <conversionDirection> <selectionDetails> <option>706</option> </selectionDetails> </conversionDirection> <currencyInfo> <conversionRateDetails> <currency>TRY</currency> </conversionRateDetails> </currencyInfo> </conversionDetails> </Fare\_DisplayCurrencyIATARates>

## Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_DisplayCurrencyIATARatesReply xmlns="http://xml.amadeus.com/FCUQAR\_08\_1\_1A"> <message> <messageFunctionDetails> <messageFunction>ROE</messageFunction> </messageFunctionDetails> </message> <freeTextInfo> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>NUC - NEUTRAL UNIT OF CONSTRUCTION</freeText> </freeTextInfo> <freeTextInfo> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>TRY - TURKISH LIRA</freeText> </freeTextInfo> <conversionRoundingInfo> <conversionRateDetails> <conversionType>700</conversionType> <currency>EUR</currency> <roundingUnit>1.00</roundingUnit> <roundingMethod>700</roundingMethod> </conversionRateDetails> </conversionRoundingInfo> <involvedCurrency> <conversionDirection> <selectionDetails> <option>706</option> </selectionDetails> </conversionDirection> <currencyDetails> <conversionRateDetails> <currency>NUC</currency> </conversionRateDetails> </currencyDetails> </involvedCurrency> <involvedCurrency> <conversionDirection> <selectionDetails> <option>707</option> </selectionDetails> </conversionDirection> <currencyDetails> <conversionRateDetails> <currency>BRL</currency> </conversionRateDetails> </currencyDetails> </involvedCurrency> <conversionDetails> <dateInfo> <dateAndTimeDetails> <qualifier>B</qualifier> <date>010108</date> </dateAndTimeDetails> </dateInfo> <conversionRate> <conversionRateDetails> <originCurrency>NUC</originCurrency> <rateType>ROE</rateType> <rate>0.681549</rate> </conversionRateDetails> <otherConvRateDetails> <destinationCurrency>EUR</destinationCurrency> </otherConvRateDetails> </conversionRate> </conversionDetails> </Fare\_DisplayCurrencyIATARatesReply>

## Possible Errors

## Operation: 4 - City Code Specified / Soft Currency

Return theIROE of a currency (type Soft Currency via USD) requested via a City code.  
(Soft Currency = Currency of country for which domestic andinternational fares are published in EUR or USD, depending the currency type)

## Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_DisplayCurrencyIATARates xmlns="http://xml.amadeus.com/FCUQAQ\_08\_1\_1A"> <message> <messageFunctionDetails> <messageFunction>ROE</messageFunction> </messageFunctionDetails> </message> <conversionDetails> <conversionDirection> <selectionDetails> <option>706</option> </selectionDetails> </conversionDirection> <locationInfo> <locationType>25</locationType> <locationDescription> <code>RIO</code> </locationDescription> </locationInfo> </conversionDetails> </Fare\_DisplayCurrencyIATARates>

## Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_DisplayCurrencyIATARatesReply xmlns="http://xml.amadeus.com/FCUQAR\_08\_1\_1A"> <message> <messageFunctionDetails> <messageFunction>ROE</messageFunction> </messageFunctionDetails> </message> <freeTextInfo> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>NUC - NEUTRAL UNIT OF CONSTRUCTION</freeText> </freeTextInfo> <freeTextInfo> <freeTextQualification> <textSubjectQualifier>3</textSubjectQualifier> </freeTextQualification> <freeText>BRL - BRAZILIAN REAL</freeText> </freeTextInfo> <conversionRoundingInfo> <conversionRateDetails> <conversionType>700</conversionType> <currency>USD</currency> <roundingUnit>1.00</roundingUnit> <roundingMethod>702</roundingMethod> </conversionRateDetails> </conversionRoundingInfo> <involvedCurrency> <conversionDirection> <selectionDetails> <option>706</option> </selectionDetails> </conversionDirection> <currencyDetails> <conversionRateDetails> <currency>NUC</currency> </conversionRateDetails> </currencyDetails> </involvedCurrency> <involvedCurrency> <conversionDirection> <selectionDetails> <option>707</option> </selectionDetails> </conversionDirection> <currencyDetails> <conversionRateDetails> <currency>BRL</currency> </conversionRateDetails> </currencyDetails> </involvedCurrency> <conversionDetails> <dateInfo> <dateAndTimeDetails> <qualifier>B</qualifier> <date>010108</date> </dateAndTimeDetails> </dateInfo> <conversionRate> <conversionRateDetails> <originCurrency>NUC</originCurrency> <rateType>ROE</rateType> <rate>1.00</rate> </conversionRateDetails> <otherConvRateDetails> <destinationCurrency>USD</destinationCurrency> </otherConvRateDetails> </conversionRate> </conversionDetails> </Fare\_DisplayCurrencyIATARatesReply>

## Possible Errors