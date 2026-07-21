---
url: "https://developers.amadeus.com/api-library/soap/functional-doc/533/doc-read/8477?serviceVersion=8.1"
download_url: "https://developers.amadeus.com/PAS-EAS/api/download/comp/4d4ad2cb456c02633f463a055ab70584/8477/HTML_UG_WBS_Fare_ConvertCurrency_FCUQCQ_08.1/UG_WBS_Fare_ConvertCurrency_FCUQCQ_08.1_011.html"
title: "HTML_UG_WBS_Fare_ConvertCurrency_FCUQCQ_08.1_011"
source: "amadeus"
service_id: "533"
service_name: "Fare_ConvertCurrency"
version: "8.1"
document_id: "8477"
doc_version: "8.1"
doc_type: "User guide"
scraped_at: "2026-07-15T10:10:19.966Z"
---
# Function: Fare\_ConvertCurrency

* * *

## 1 Overview

The ConvertCurrency PSP-Service is used to convert currencies under different conditions, based on the options input by the user:

-   Conversion from one currency (Origin currency) to another (Destination currency) by using a storedBanker's Selling Rate (BSR), Banker's Buying Rate (BBR) or IATA Clearing House Rate (ICH).
-   **Note**: Banker's Buying Rate (BBR) is no longer supported but since structure was designed to support it, may still be referenced in response e.g. with advice ‘BBR NOT AVAILABLE’
-   Conversion from one currency (Origin currency) to another (Destination currency) by using a conversion rate set in input by the user
-   Conversion between a currency and NUC at a stored IATA Rate of Exchange (ROE).

The ConvertCurrency PSP-Service is also used to display all stored conversion rates: BSR, BBR and ICHrates between two currencies.

## 1.1 Supported Operations

-   In the input, at least one of the two currencies (Origin or Destination currency) has to be specified. In that case, the other is determined from the location information .A currency can be specified with:
    
    -   A Currency ISO code. (3 letters)
    -   A Country ISO code. (2 letters)
    -   An Airport ISO code. (3 letters)
    -   A City ISO code. (3 letters)
    -   A Country Name. (Free form text)
-   An optional amount to convert can be specified in input. (By default amount is 1).
-   An optional conversion option can be specified to use a stored rate of conversion. The user can requesta conversion :
    
    -   Via the BSR (Banker s Selling Rate)
    -   Via the BBR (Banker s Buying Rate)
    -   Via the ICH (IATA Clearing House)
    -   Via all rates (ex: Via BSR, BBR and ICH rates)
-   A currency can be converted To or From NUC. In that case, conversion is done via a stored ROE (IATARate Of Exchange).
-   An optional date can be specified for a historic display. Date has to be as DDMMMYY.
-   An optional conversion rate can be set in input by the user. In that case, no stored rate of conversionand no date can be used.

If a conversion at the BSR is requested, and this rate is not available in the database, then one of two default processes will be applied.

1.  System will default to make the conversion with an intermediate step via either USD or EUR, dependent on the referenced currency. Conversion is from origin currency into USD(or EUR) at the BSR, then from USD(or EUR) at the BSR into destination currency. Typically, this default process is applied for conversion from/to ‘soft’ currencies, (currencies of countries where local currency is not used for publication of international fares and USD or EUR is used for that purpose instead). Soft currencies sometimes only have BSR published with USD and/or EUR.
    1.  In this case the response will include indication that conversion has been via the third currency, e.g. BSR CONVERSION OF BRL TO TRY VIA EUR or BSR CONVERSION OF BRL TO PHP VIA USD
    2.  If no conversion via USD or EUR is possible due to missing BSRs, system will default to make the conversion via ICH (IATA Clearing House rate).
        1.  In this case the response will include a message indicating that conversion has been via the ICH, identifying the rate created via cross calculation and used instead of BSR

For conversions of currency amounts (other than single unit default amount) via BSR and/or ICH, the response message will by default include the destination currency amounts ‘rounded as fares’, ‘rounded as other charges’ and ‘amount truncated’ (i.e. no rounding rule applied).

If default amount (1 unit) is used then the response message will only identify the result of the conversion into destination currency with up to six decimal places and without application of rounding.

For conversions from NUC to currency, result will include resulting currency amounts ‘rounded as fares’ and ‘amount truncated’ (i.e. rounding rule for other charges is not referenced since only fares can be expressed in NUC).

For conversions from currency to NUC, result will include only the truncated NUC amount, (NUC has no rounding rule and is instead displayed with truncation after second decimal place). is never rounded and resulting currency amounts ‘rounded as fares’ and ‘amount truncated’ (i.e. rounding rule for other charges is not referenced since only fares can be expressed in NUC).

Whether or not amount is specified, (message is used for conversion or to display exchange rate), and whether or not NUC is used in the request, the response will always identify the rate(s) used and the informative de-coding of the currency codes.

## 1.2 Limitations

The limitations are:

-   Future Date application: If a future date is specified in the input, a reject message indicating: FUTURE DATE NOT PROCESSED will be displayed.
-   Past Date application for Historical BSR, BBR, ICH and ROE: Historical rates used for currency conversion will be stored for 12 months. If the specified date is more than 12 months past, a reject message indicating PAST DATE MUST BE WITHIN A RANGE OF ONE YEAR will be displayed.

-   Banker's Buying Rate (BBR) is no longer supported within the database due no longer used within the industry, but since structure was designed to support it, may still be referenced in response e.g. with advice ‘BBR NOT AVAILABLE’

-   If requested ROE or ICH rate not available: In case a conversion to/from NUC or a conversion at the ICH rate is requested, and the rate is not available in the data base, no conversion is processed and a reject message REQUESTED RATE NOT AVAILABLE will be displayed.
-   If the Amount is too long or has too decimals:
    -   If specified amount has more than 12 digits,
    -   or if it is a decimal amount with more than 11 digits,
    -   or if it is a decimal amount with more decimals than the number of commercial decimal of the currency,
        
        No conversion is processed and a reject message VERIFY AMOUNT will be displayed.
        
-   If the optional rate of conversion set in input by the user is too long :
    -   If specified user rate has more than 12 digits,
    -   or if it is a decimal rate with more than 11 digits,
        
        No conversion is processed and a reject message VERIFY AMOUNT will be displayed.
        

## 1.3 Unsupported Operations

None

## 1.4 Prerequisites

Office profile security:

Not applicable

Data availability:

Not applicable

## 2 Building A Query

The queries for the ConvertCurrency function are explained with data element examples in the following chapters.

It is important to note that the examples, in each chapter, are illustrations only and are meant to provide the basis for a better understanding on which fields are mandatory for basic operation utilization. It is not a full explanation of every field that can be used for the operation, but rather a guideline to its use.

-   Message Function =  codeset 726 =  Currency Conversion (Mandatory)
-   Direction of conversion (mandatory) used to identify origin and destination currency. Permitted codesets:
    -   706 = Convert From
    -   707 = Convert To
-   Origin and Destination Currencies (mandatory). At least one of the two currencies (Origin or Destination currency) has to be specificied. In that case, the other is determined from the location information. Currencies may be identified by either currency code or location:
    -   Currency ISO code
        -   Industry standard three alpha currency code
    -   Location
        -   Airport – codeset ‘A’ with three alpha airport code
        -   City – codeset ‘25’ with three alpha city code 
        -   Country – codeset 26 with free form text country name
-   Amount of Origin Currency (optional) – if unspecified, system assumes one unit. This is normally used to request display of exchange rates which is supported by the conversion of one unit of origin currency into destination currency.  If decimal places are included in the amount they must respect standard limitations on number of commercial decimals supported by the currency
-   Conversion rate (optional) – if amount of origin currency is specified, then assumption is ‘BSR’ and if amount is unspecified, assumption is ‘ALL’. Permitted codesets:
    -   ROE – IATA ROE – not normally required when an amount is specified since if either origin or destination currency is NUC, the conversion may only be via ROE
    -   BSR – Bankers selling rate
    -   ALL – All the rates, (both BSR and ICH). It is rarely necessary to use this value since it is applied as default if conversion rate is not specified and neither origin nor destination currency is NUC
    -   700 – IATA Clearing House rate (ICH)
    -   USR – User Specified Rate (agent override with specified value). When a manual conversion rate is set in input by the user, stored rate of conversion is bypassed and no date option can be used, (since historic data is inapplicable when rate is specified in input)

Date (optional) – DDMMYY format. If unspecified, system default is to current system date. Must be equal to or earlier than system date. Future date not permitted

## 3 Receiving A Reply

Successful reply

If no reject message is generated, the following information is provided:

Once for the Transaction:

-   The Message Function details
-   Per Currency (Origin / Destination / Intermediate, if any)
    
    -   Currency ISO code
    -   Currency name (free form text)
-   Per Rounding type (rounding of fare / rounding of other charges):
    
    -   Rounding Type
    -   Destination currency ISO code
    -   Rounding Unit
    -   Rounding method (rounding Up / Down / To the nearest / Truncated)
-   Per currency process (convert From / convert To / convert Via, if any):
    
    -   The currency ISO code
-   Per conversion rate used in the transaction:
    
    -   Start validity date of the Rate
    -   End validity date of the Rate (if any)
    -   Rate name
    -   Rate
    -   The 2 currency ISO codes between which the rate applies
-   Per Amount type (amount Rounded As Fare / Rounded As Charges / Truncated):
    
    -   Amount Type
    -   Amount
    -   Destination currency ISO code

Fare Quote rejects:

If a Fare Quote reject message is generated, then only this reject message is sent back globally.

  
  
Reply Structure  
  

Conversion of 100 euro into the currency of United States

 XML Example - Response

<Fare\_ConvertCurrencyReply>

    <message>

        <messageFunctionDetails>

            <messageFunction>726</messageFunction>

        </messageFunctionDetails>

    </message>

    <freeTextInfo>

        <freeTextQualification>

            <textSubjectQualifier>3</textSubjectQualifier>

        </freeTextQualification>

        <freeText>EUR - EURO</freeText>

    </freeTextInfo>

    <freeTextInfo>

        <freeTextQualification>

            <textSubjectQualifier>3</textSubjectQualifier>

        </freeTextQualification>

        <freeText>USD - US DOLLAR</freeText>

    </freeTextInfo>

    <conversionRoundingInfo>

        <conversionRateDetails>

            <conversionType>700</conversionType>

            <currency>USD</currency>

            <roundingUnit>1</roundingUnit>

            <roundingMethod>700</roundingMethod>

        </conversionRateDetails>

    </conversionRoundingInfo>

    <conversionRoundingInfo>

        <conversionRateDetails>

            <conversionType>CHG</conversionType>

            <currency>USD</currency>

            <roundingUnit>.01</roundingUnit>

            <roundingMethod>702</roundingMethod>

        </conversionRateDetails>

    </conversionRoundingInfo>

    <involvedCurrency>

        <conversionDirection>

            <selectionDetails>

                <option>706</option>

            </selectionDetails>

        </conversionDirection>

        <currencyDetails>

            <conversionRateDetails>

                <currency>EUR</currency>

            </conversionRateDetails>

        </currencyDetails>

    </involvedCurrency>

    <involvedCurrency>

        <conversionDirection>

            <selectionDetails>

                <option>707</option>

            </selectionDetails>

        </conversionDirection>

        <currencyDetails>

            <conversionRateDetails>

                <currency>USD</currency>

            </conversionRateDetails>

        </currencyDetails>

    </involvedCurrency>

    <conversionDetails>

        <dateInfo>

            <dateAndTimeDetails>

                <qualifier>B</qualifier>

                <date>200807</date>

            </dateAndTimeDetails>

        </dateInfo>

        <conversionRate>

            <conversionRateDetails>

                <originCurrency>EUR</originCurrency>

                <rateType>BSR</rateType>

                <rate>1.27193</rate>

            </conversionRateDetails>

            <otherConvRateDetails>

                <destinationCurrency>USD</destinationCurrency>

            </otherConvRateDetails>

        </conversionRate>

        <convertedAmount>

            <monetaryInfo>

                <monetaryDetails>

                    <typeQualifier>RAF</typeQualifier>

                    <amount>128.00</amount>

                    <currency>USD</currency>

                </monetaryDetails>

            </monetaryInfo>

        </convertedAmount>

        <convertedAmount>

            <monetaryInfo>

                <monetaryDetails>

                    <typeQualifier>RAC</typeQualifier>

                    <amount>127.19</amount>

                    <currency>USD</currency>

                </monetaryDetails>

            </monetaryInfo>

        </convertedAmount>

        <convertedAmount>

            <monetaryInfo>

                <monetaryDetails>

                    <typeQualifier>TRU</typeQualifier>

                    <amount>127.19</amount>

                    <currency>USD</currency>

                </monetaryDetails>

            </monetaryInfo>

        </convertedAmount>

    </conversionDetails>

</Fare\_ConvertCurrencyReply>

### XML elements decoded

Message Function = 726 = Currency Conversion

Text Subject Qualifier = 3 = number of currency amounts in response

Free text decode of origin currency = EUR – EURO = Currency ISO code and name

Free text decode of destination currency = USD - US DOLLAR = Currency ISO code and name

Conversion type = 700 = Fares

Currency = USD

Rounding Unit = 1 = indicates rounding to whole unit

Rounding method = 700 = ‘Up’

Conversion rate/conversion type = CHG = Charges

Currency = USD

Rounding Unit = .01 = indicates rounding to two decimal places

Rounding method = 702 = to closest whole number

Involved currency/Direction option = 706 = ‘Convert From’

Currency = EUR = currency code (origin currency)

Involved currency/Direction option = 707 = ‘Convert To’

Currency = USD = currency code (destination currency)

Date and time qualifier = B = Not Valid Before - First Travel Date (displayed in cryptic as ‘effective’ date)

Date and time date = 200807 = i.e. 20AUG07 in DDMMYY format

Origin currency = EUR

Rate type = BSR

Rate = 1.27193

Destination Currency = USD

Converted amount type qualifier = RAF = Rounded As Fare

Amount = 128.00

Converted amount type qualifier = RAC = Rounded As Charges

Amount = 127.19

Converted amount type qualifier = TRU = Truncated

Amount = 127.19

Currency = USD

## 3.1 Sub Structure:

## 3.1.1 Description

## 3.1.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

* * *

## 4 Error Messages

Wrong input syntax

The following rejects occurs when data specified in the request is not valid, although it is compatible with the message definition

Usual reject examples:

ERROR MESSAGE

DESCRIPTION

VERIFY CURRENCY

-   If ISO currency code (3 letters) does not exist.
-   If Free form text country name (more than 3 letters) does not exist.

VERIFY COUNTRY CODE

-   If ISO country code (2 letters) does not exist .

VERIFY CITY

-   If ISO city code (3 letters) does not exist.

INVALID FORMAT

-   If ISO currency code has less than 3 letters.
-   If ISO country code has more than 3 letters.
-   If ISO city code has more than 3 letters.
-   If date specified in input has not a DDMMMYY format.
-   If origin currency is not specified via an ISO currency code, and:
    -   If amount to convert is more than 12 digits.
    -   If amount to convert is a decimal amount with more than 11 digits.
    -   If amount is a decimal amount with more decimals than the number of commercial decimal of the currency.

FUTURE DATE NOT PROCESSED

-   If date specified in input is a future date ...

PAST DATE MUST BE WITHIN A RANGE OF ONE YEAR

-   If date specified in input is more than 12 month past.

INVALID DATE

-   If the 2 digits Day is not a valid Day (ex: 34JAN07).
-   If the 3 letters month is not a valid (ex: 14SET07).

VERIFY AMOUNT

-   If the optional conversion rate set in input has more than 12 digits.
-   If the optional conversion rate set in input is a decimal rate with more than 11 digits.
-   If Origin currency is specified via an ISO currency code, and:
    -   If amount to convert is more than 12 digits.
    -   If amount to convert is a decimal amount with more than 11 digits.
    -   If amount is a decimal amount with more decimals than the number of commercial decimal of the currency.

  

* * *

## 5 Operations

## 5.1 Operation: Conversion from the currency of Orly airport to NUC (Neutral Unit of Construction)

Conversion of an amount of 52 from the currency of Orly airport to NUC (Neutral Unit of Construction) at the date of 27May07.

Conversion of an amount of 52 from the currency of Orly airport to NUC (Neutral Unit of Construction) at the date of 27May07.

Equivalent to cryptic request FQC52\*ORY/NUC

### Query Structure

Message Function = 726 = Currency Conversion

Conversion Direction option = 706 = ‘Convert From’

Monetary details, type qualifier = B = Initial amount or Base fare to convert

Amount = 120

Location type = 25 = City  (A = Airport???)

Location details = ORY = city three alpha code

Conversion direction option = 707 = ‘Convert To’

Currency info, Conversion rate details = NUC – destination currency code

## 5.1.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_ConvertCurrency xmlns="http://xml.amadeus.com/FCUQCQ\_08\_1\_1A"> <message> <messageFunctionDetails> <messageFunction>726</messageFunction> </messageFunctionDetails> </message> <conversionDetails> <conversionDirection> <selectionDetails> <option>706</option> </selectionDetails> </conversionDirection> <amountInfo> <monetaryDetails> <typeQualifier>B</typeQualifier> <amount>120</amount> </monetaryDetails> </amountInfo> <locationInfo> <locationType>25</locationType> <locationDescription> <code>ORY</code> </locationDescription> </locationInfo> </conversionDetails> <conversionDetails> <conversionDirection> <selectionDetails> <option>707</option> </selectionDetails> </conversionDirection> <currencyInfo> <conversionRateDetails> <currency>NUC</currency> </conversionRateDetails> </currencyInfo> </conversionDetails> </Fare\_ConvertCurrency>

## 5.1.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.1.3 Possible Errors

See "Error Messages" section.

* * *

## 5.2 Operation: Conversion from the currency of Rio de Janeiro to CHF

Conversion of an amount of 1300 from the currency of Rio de Janeiro (city ISO code: RIO) to CHF, at a userrate of 66.55.

Conversion of an amount of 1300 from the currency of Rio de Janeiro (city ISO code: RIO) to CHF, at a user specified rate of 66.55 CHF to one unit of origin currency.

Equivalent to cryptic entry FQC1300\*RIO/CHF66.55

### Query Structure

Message Function = 726 = Currency Conversion

Conversion rate details, conversion rate type = USR = User specified rate (agent override rate)

Rate specified by user = 66.55

Conversion Direction option = 706 = ‘Convert From’

Monetary details, type qualifier = B = Initial amount or Base fare to convert

Amount = 100

Conversion direction option = 707 = ‘Convert To’

Location type = 25 = City

Location details = RIO = city three alpha code

Conversion direction option = 707 = ‘Convert To’

Currency info, Conversion rate details = CHF – destination currency code

## 5.2.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_ConvertCurrency xmlns="http://xml.amadeus.com/FCUQCQ\_08\_1\_1A"> <message> <messageFunctionDetails> <messageFunction>726</messageFunction> </messageFunctionDetails> </message> <conversionRate> <conversionRateDetails> <rateType>USR</rateType> <rate>66.55</rate> </conversionRateDetails> </conversionRate> <conversionDetails> <conversionDirection> <selectionDetails> <option>706</option> </selectionDetails> </conversionDirection> <amountInfo> <monetaryDetails> <typeQualifier>B</typeQualifier> <amount>100</amount> </monetaryDetails> </amountInfo> <locationInfo> <locationType>25</locationType> <locationDescription> <code>RIO</code> </locationDescription> </locationInfo> </conversionDetails> <conversionDetails> <conversionDirection> <selectionDetails> <option>707</option> </selectionDetails> </conversionDirection> <currencyInfo> <conversionRateDetails> <currency>CHF</currency> </conversionRateDetails> </currencyInfo> </conversionDetails> </Fare\_ConvertCurrency>

## 5.2.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.2.3 Possible Errors

See "Error Messages" section.

* * *

## 5.3 Operation: Conversion of Euro in Pound Sterling

Conversion of 520.30 EUR (Euro) in GBP (Pound Sterling)

Conversion of 520.30 EUR (Euro) in GBP (Pound Sterling).  Since an amount is specified for conversion but rate for conversion is not, system will default to conversion at BSR.

Equivalent to cryptic request FQC520.30EUR/GBP

### Query Structure

Message Function = 726 = Currency Conversion

Conversion Direction option = 706 = ‘Convert From’

Conversion rate details – Currency = EUR

Monetary details, type qualifier = B = Initial amount or Base fare to convert

Amount = 520.30

Conversion direction option = 707 = ‘Convert To’

Currency info, conversion rate details = currency code = GBP

## 5.3.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_ConvertCurrency xmlns="http://xml.amadeus.com/FCUQCQ\_08\_1\_1A"> <message> <messageFunctionDetails> <messageFunction>726</messageFunction> </messageFunctionDetails> </message> <conversionDetails> <conversionDirection> <selectionDetails> <option>706</option> </selectionDetails> </conversionDirection> <currencyInfo> <conversionRateDetails> <currency>EUR</currency> </conversionRateDetails> </currencyInfo> <amountInfo> <monetaryDetails> <typeQualifier>B</typeQualifier> <amount>520.30</amount> </monetaryDetails> </amountInfo> </conversionDetails> <conversionDetails> <conversionDirection> <selectionDetails> <option>707</option> </selectionDetails> </conversionDirection> <currencyInfo> <conversionRateDetails> <currency>GBP</currency> </conversionRateDetails> </currencyInfo> </conversionDetails> </Fare\_ConvertCurrency>

## 5.3.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.3.3 Possible Errors

See "Error Messages" section.

* * *

## 5.4 Operation: Conversion of Euro in UNITED STATES currency, via all rates

Conversion of 520.30 EUR in UNITED STATES currency, via all rates

Conversion of 520.30 EUR in UNITED STATES currency, via all rates (both BSR and ICH).

Equivalent to cryptic request FQC520.30EUR/USD/A

### Query Structure

Message Function = 726 = Currency Conversion

Conversion rate details, conversion rate type = ALL = All the rates (ICH, BBR, BSR)

Conversion Direction option = 706 = ‘Convert From’

Currency info, Conversion rate details = EUR – currency code

Monetary details, type qualifier = B = Initial amount or Base fare to convert

Amount = 520.30

Conversion direction option = 707 = ‘Convert To’

Location type = 26 = Country

Location details = UNITED STATES = country name in free form text

## 5.4.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_ConvertCurrency xmlns="http://xml.amadeus.com/FCUQCQ\_08\_1\_1A"> <message> <messageFunctionDetails> <messageFunction>726</messageFunction> </messageFunctionDetails> </message> <conversionRate> <conversionRateDetails> <rateType>ALL</rateType> </conversionRateDetails> </conversionRate> <conversionDetails> <conversionDirection> <selectionDetails> <option>706</option> </selectionDetails> </conversionDirection> <currencyInfo> <conversionRateDetails> <currency>EUR</currency> </conversionRateDetails> </currencyInfo> <amountInfo> <monetaryDetails> <typeQualifier>B</typeQualifier> <amount>520.30</amount> </monetaryDetails> </amountInfo> </conversionDetails> <conversionDetails> <conversionDirection> <selectionDetails> <option>707</option> </selectionDetails> </conversionDirection> <locationInfo> <locationType>26</locationType> <firstLocationDetails> <name>UNITED STATES</name> </firstLocationDetails> </locationInfo> </conversionDetails> </Fare\_ConvertCurrency>

## 5.4.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.4.3 Possible Errors

See "Error Messages" section.

* * *

## 5.5 Operation: Convert Great Britain Pounds into Norwegian Krones

Convert Great Britain Pounds into Norwegian Krones at the rate of February, 15th, 2007.

Convert Great Britain Pounds into Norwegian Krone at the rate of February, 15th, 2007. Since no amount is specified in request, this illustrates conversion being used for the purpose of displaying past date conversion rates. Equivalent to cryptic entry FQCGBP/NOK/15FEB07

### Query Structure

Message Function = 726 = Currency Conversion

Conversion Direction option = 706 = ‘Convert From’

Monetary details, type qualifier = B = Initial amount or Base fare to convert

Conversion date = 150207 = DDMMYY format

Conversion Direction option = 706 = ‘Convert From’

Currency info, Conversion rate details = GBP = origin currency code

Conversion direction option = 707 = ‘Convert To’

Currency info, Conversion rate details = NOK = destination currency code

## 5.5.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_ConvertCurrency xmlns="http://xml.amadeus.com/FCUQCQ\_08\_1\_1A"> <message> <messageFunctionDetails> <messageFunction>726</messageFunction> </messageFunctionDetails> </message> <conversionDate> <dateAndTimeDetails> <qualifier>B</qualifier> <date>150207</date> </dateAndTimeDetails> </conversionDate> <conversionDetails> <conversionDirection> <selectionDetails> <option>706</option> </selectionDetails> </conversionDirection> <currencyInfo> <conversionRateDetails> <currency>GBP</currency> </conversionRateDetails> </currencyInfo> </conversionDetails> <conversionDetails> <conversionDirection> <selectionDetails> <option>707</option> </selectionDetails> </conversionDirection> <currencyInfo> <conversionRateDetails> <currency>NOK</currency> </conversionRateDetails> </currencyInfo> </conversionDetails> </Fare\_ConvertCurrency>

## 5.5.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.5.3 Possible Errors

See "Error Messages" section.

* * *

## 5.6 Operation: Simple conversion between South Africa currency and TRY(Turkish Lira).

As there is no amount to convert specified in the query, and no past date, system will only display all rates currently applicable at system date to convert one unit of the first currency into the second currency . No specific rate is requested or specified for this request with no specification of amount, so  this is an example of use of conversion to determine exchange rates, (default is to both BSR and ICH).  Equivalent to cryptic request FQCSOUTH AFRICA/TRY

### Query Structure

Message Function = 726 = Currency Conversion

Conversion Direction option = 706 = ‘Convert From’

Location type = 26 = Country

Location details = SOUTH AFRICA = country name in free form text

Conversion direction option = 707 = ‘Convert To’

Currency info, currency code = TRY

## 5.6.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_ConvertCurrency xmlns="http://xml.amadeus.com/FCUQCQ\_08\_1\_1A"> <message> <messageFunctionDetails> <messageFunction>726</messageFunction> </messageFunctionDetails> </message> <conversionDetails> <conversionDirection> <selectionDetails> <option>706</option> </selectionDetails> </conversionDirection> <locationInfo> <locationType>26</locationType> <firstLocationDetails> <name>SOUTH AFRICA</name> </firstLocationDetails> </locationInfo> </conversionDetails> <conversionDetails> <conversionDirection> <selectionDetails> <option>707</option> </selectionDetails> </conversionDirection> <currencyInfo> <conversionRateDetails> <currency>TRY</currency> </conversionRateDetails> </currencyInfo> </conversionDetails> </Fare\_ConvertCurrency>

## 5.6.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 5.6.3 Possible Errors

See "Error Messages" section.

* * *