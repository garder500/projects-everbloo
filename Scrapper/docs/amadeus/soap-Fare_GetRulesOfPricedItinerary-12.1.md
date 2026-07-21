---
url: "https://developers.amadeus.com/api-library/soap/functional-doc/2191/doc-read/106211?serviceVersion=12.1"
download_url: "https://developers.amadeus.com/PAS-EAS/api/download/comp/4d4ad2cb456c02633f463a055ab70584/106211/UG_WBS_Fare_GetRulesOfPricedItinerary_TFRUDQ_12.1_025/UG_WBS_Fare_GetRulesOfPricedItinerary_TFRUDQ_12.1_025.html"
title: "UG_WBS_Fare_GetRulesOfPricedItinerary_TFRUDQ_12.1_025"
source: "amadeus"
service_id: "2191"
service_name: "Fare_GetRulesOfPricedItinerary"
version: "12.1"
document_id: "106211"
doc_version: "12.1"
doc_type: "User guide"
file_format: "HTML"
scraped_at: "2026-07-15T10:23:43.454Z"
---
# Function: Fare\_GetRulesOfPricedItinerary

* * *

## 1 Overview

## 1.1 Supported Operations

Default = for all Passengers and Fare recommendations

Option = 

-   per Passenger Type

or

-   per Passenger Type and per Fare component

## 1.2 Limitations

If **MDE** for Maximum Data Exceeded is returned, the user will have to request Fare Rules per fare component.

## 1.3 Unsupported Operations

Not applicable

## 1.4 Prerequisites

**Itinerary pricing** has been performed successfully.

## 2 Building A Query

**1-Message type (Mandatory):**

-   **<messageActionDetails>/<messageFunctionDetails>/<messageFunction>** to specify the type of message
    -   Alone possible value is **FRL** = Return rules text

**2-Security information (Mandatory):**

-   **<originatorInfoGroup>/<originatorOfRequestDetails>** for Point of Sale details

**3- Product information (Optional):**

-    **<passengerInfoGroup>/<segmentRepetitionControl>/<segmentControlDetails>/<productReference>** for the passenger type reference.

-   **<passengerInfoGroup>/<itemInfo>/<itemNumberDetails> /****<number>** for the fare component number

-   **<passengerInfoGroup>/<itemInfo>/<itemNumberDetails> /<type>**  for the fare component qualifier.
    -   Alone possible value is **FC** \= Fare component.

**4- Language Details (Mandatory)**

-   **<optionInfoGroup>/<optionInfo>/<selectionDetails>/<option>** for the Language qualifier
    -   Alone possible value is **LNG** = Language

-   **<optionInfoGroup>/<optionInfo>/<selectionDetails>/<option>/<optionInformation>** for the Language code

## 2.1 Sub Structure:

## 2.1.1 Description

## 2.1.2 Xml Structure

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

## 3 Receiving A Reply

**1- Status details (Conditional)**

-   **<technicalStatusInfo>/<statusDetails\>/<indicator>** for the status of the reply
    -   alone possible value is **MDE** = Maximum data exceeded

Applicable only if the size of the reply is too big.

In this case the user will perform several requests per Fare component instead of an alone one for several Fare components.

**2-Message type (Mandatory):**

-   **<messageActionDetails\>/<messageFunctionDetails>/<messageFunction\>** to specify the type of message
    -   Alone possible value is **FRL** = Return rules text

**3- Error details (Conditional)**

-   **<errorInfoGroup>/<rejectErrorCode\>/<errorDetails>/<errorCode\>** for the canned message number

-   **<errorInfoGroup>/<rejectErrorCode\>/<errorDetails>/<errorCategory\>** for the error type

the possible values are :  

-    
    -    
        -   **EC** for Error  Code or
        -   **WEC** for Warning code

-   **<errorInfoGroup>/<rejectErrorCode\>/<errorDetails>/<errorCodeOwner\>** for the owner of the error code.
-   **<errorInfoGroup>/<errorFreeText\>/<freeTextQualification>/<textSubjectQualifier\>**
-   **<errorInfoGroup>/<errorFreeText\>/<freeTextQualification>/<informationType\>**
-   **<errorInfoGroup>/<errorFreeText\>/<freeText\>** for text associated to the error code.

**4- Rule Text part (Optional)**

**Rule index**

-   **<mnrDescriptionInfoGrp>/<mnrPricedInfo>/<segmentControlDetails\>/<productReference>** for the passenger type reference (Mandatory)

**Rules text**

-   **<mnrDescriptionInfoGrp>/<mnrRulesInfoGrp>/<mnrCatInfo>/<descriptionInfo>/<number>**
    -   an alone value **0** for all categories (Mandatory)

-   **<mnrDescriptionInfoGrp>/<mnrRulesInfoGrp>/<mnrFCInfoGrp>/<refInfo>/<referenceDetails\>/<type>**
    -   alone possible value is **FC** = Fare component reference (Mandatory)

-   **<mnrDescriptionInfoGrp>/<mnrRulesInfoGrp>/<mnrFCInfoGrp>/<refInfo>/<referenceDetails\>/<value>** for the fare component number (Mandatory)

-     **<mnrDescriptionInfoGrp>/<mnrRulesInfoGrp>/<itemText>/<itemNb\>/<ruleSectionId\>** for the Rule section number

-   **<mnrDescriptionInfoGrp>/<mnrRulesInfoGrp>/<itemText>/<itemName>/<messageText>** for the Rule section name

       Several occurences of format and content can be associated to a same rule section.

-   **<mnrDescriptionInfoGrp>/<mnrRulesInfoGrp>/<itemText>/<itemContent>/<textProperties>/<attributeDetails\>/<attributeType\>** for the format of the rule text
    -   B: Bold
    -   C: Colour
    -   D: Default

-   **<mnrDescriptionInfoGrp>/<mnrRulesInfoGrp>/<itemText>/<itemContent>/<textProperties>/<attributeDetails>/<attributeDescription>**

                  No value when qualifier is **Bold**

                  Corresponding values when qualifier is **Colour** 

-    
    -   0: Black
    -   1: Red
    -   2: Blue
    -   3: Yellow
    -   4: Pink
    -   5: Orange
    -   6: Grey
    -   7: Green
    -   8: Violet
    -   9: Brown

-     **<mnrDescriptionInfoGrp>/<mnrRulesInfoGrp>/<itemText>/<itemContent>/<textPortion>** **/<messageText>** for the content of the rule text.

**5- Product information (Mandatory)**

-    **<allFaresInfoGroup>/<markerAllFares>**
-    **<allFaresInfoGroup>/<fareProductInfoGroup>/<generalAndIdInfo>/<segmentControlDetails\>/<productReference>** for the passenger type reference

**6-Fare component information (Mandatory)**

-    **<allFaresInfoGroup>/<fareProductInfoGroup>/<passengerTypeInfoGroup>/<fareInfo\>**
-    **<allFaresInfoGroup>/<fareProductInfoGroup>/<passengerTypeInfoGroup>/<fareComponentsInfoGroup>/<constructionContextInfo\>/<fareComponentDetails\>/<count>** for the number of Fare Components

-    **<allFaresInfoGroup>/<fareProductInfoGroup>/<passengerTypeInfoGroup>/<fareComponentsInfoGroup>/<pricingUnitInfoGroup>/<pricingUnitIdentInfo>/<quantityDetails\>/<Unit qualifier>** for the Service Pricing Unit
    -   **NPU** for No Pricing Unit information. All the fare components are listed in one shot.

-    **<allFaresInfoGroup>/<fareProductInfoGroup>/<passengerTypeInfoGroup>/<fareComponentsInfoGroup>/<pricingUnitInfoGroup>/<fareComponentInfo>/<componentIdentInfo>/<itemNumberDetails>/<number>** for the Fare component number

-    **<allFaresInfoGroup>/<fareProductInfoGroup>/<passengerTypeInfoGroup>/<fareComponentsInfoGroup>/<pricingUnitInfoGroup>/<fareComponentInfo>/<subItineraryInfo>/<includedSegmentsInfo>/<numberOfItemsDetails>/<referenceQualifier\>**
    
    -   Alone possible value is **RS** for Range of segment

-    **<allFaresInfoGroup>/<fareProductInfoGroup>/<passengerTypeInfoGroup>/<fareComponentsInfoGroup>/<pricingUnitInfoGroup>/<fareComponentInfo>/<subItineraryInfo>/<includedSegmentsInfo>/<lastItemsDetails\>/<firstItemIdentifier>** for the first included segment in range

-    **<allFaresInfoGroup>/<fareProductInfoGroup>/<passengerTypeInfoGroup>/<fareComponentsInfoGroup>/<pricingUnitInfoGroup>/<fareComponentInfo>/<subItineraryInfo>/<includedSegmentsInfo>/<lastItemsDetails\>/<lastItemIdentifier\>** for the last included segment in range.

-     ****<allFaresInfoGroup>/<fareProductInfoGroup>/<passengerTypeInfoGroup>/<fareComponentsInfoGroup>/<pricingUnitInfoGroup>/<fareComponentInfo>/**<fareQualifierDetails>/<fareDetails\>/<fareCategory\>** for the Fare type code

-    ****<allFaresInfoGroup>/<fareProductInfoGroup>/<passengerTypeInfoGroup>/<fareComponentsInfoGroup>/<pricingUnitInfoGroup>/<fareComponentInfo>/**<fareQualifierDetails>/<additionalFareDetails\>/<secondRateClass\>** for the Fare Class

-    ****<allFaresInfoGroup>/<fareProductInfoGroup>/<passengerTypeInfoGroup>/<fareComponentsInfoGroup>/<pricingUnitInfoGroup>/<fareComponentInfo>/**<quantitiesInfo>/<quantityDetails\>/<qualifier>**  
    -    
        -   TAR: Advance Purchase Ticketing completion after reservation 
        -   TBD: Advance Purchase Ticketing completion before departure
        -   MXS: Maximum stay 
        -   MNS: Minimum stay

-    ****<allFaresInfoGroup>/<fareProductInfoGroup>/<passengerTypeInfoGroup>/<fareComponentsInfoGroup>/<pricingUnitInfoGroup>/<fareComponentInfo>/**<quantitiesInfo>/<quantityDetails\>/<value>**
-    ****<allFaresInfoGroup>/<fareProductInfoGroup>/<passengerTypeInfoGroup>/<fareComponentsInfoGroup>/<pricingUnitInfoGroup>/<fareComponentInfo>/**<quantitiesInfo>/<quantityDetails\>/<unit>**

-    ****<allFaresInfoGroup>/<fareProductInfoGroup>/<passengerTypeInfoGroup>/<fareComponentsInfoGroup>/<pricingUnitInfoGroup>/<fareComponentInfo>/**<quantitiesInfo>/<otherquantityDetails>/<qualifier>**  
    -   TAR: Advance Purchase Ticketing completion after reservation 
    -   TBD: Advance Purchase Ticketing completion before departure
    -   MXS: Maximum stay 
    -   MNS: Minimum stay

-    ****<allFaresInfoGroup>/<fareProductInfoGroup>/<passengerTypeInfoGroup>/<fareComponentsInfoGroup>/<pricingUnitInfoGroup>/<fareComponentInfo>/**<quantitiesInfo>/<otherquantityDetails>/<value>**
-    ****<allFaresInfoGroup>/<fareProductInfoGroup>/<passengerTypeInfoGroup>/<fareComponentsInfoGroup>/<pricingUnitInfoGroup>/<fareComponentInfo>/**<quantitiesInfo>/<otherquantityDetails>/<unit>**

-     ******<allFaresInfoGroup>/<fareProductInfoGroup>/<passengerTypeInfoGroup>/<fareComponentsInfoGroup>/<pricingUnitInfoGroup>/<fareComponentInfo>/****<fareComponentMatchedSeqInfo>/<referenceDetails\>/<type>**
    -   RU:for Rule number

-    ******<allFaresInfoGroup>/<fareProductInfoGroup>/<passengerTypeInfoGroup>/<fareComponentsInfoGroup>/<pricingUnitInfoGroup>/<fareComponentInfo>/****<fareComponentMatchedSeqInfo>/<referenceDetails\>/<value>**

-    **<allFaresInfoGroup>/<fareProductInfoGroup>/<passengerTypeInfoGroup>/<fareComponentsInfoGroup>/<productInfo\>/<bookingClassDetails>/<designator>** for Booking Class.

## 3.1 Sub Structure:

## 3.1.1 Description

## 3.1.2 Xml Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

* * *

## 4 Error Messages

-   If TPAX and/or Fare components are invalid, then the following reject is received:
    -   21853 - **CHECK SEQUENCE NUMBER**

-   If system cannot find rule text in requested language, then
    -   32219 **\- CHECK FARE COMPONENT NUMBER**

-   If subsequent transaction was done too late after the pricing transaction and the pricing context is lsot, then:
    -   32217 - **ENTRY REQUIRES PREVIOUS PRICING REQUEST** 

-   If unexpected format is sent then:
    -     00001 - **CHECK FORMAT**

-   If system cannot find rule text in requested language, then
    -   32218 **\- NO RULE TEXT FOUND IN SELECTED LANGUAGE**

## 4.1 Error Reply

* * *

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_GetRulesOfPricedItineraryReply xmlns="http://xml.amadeus.com/TFRUDR\_12\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>FRL</messageFunction> </messageFunctionDetails> </messageActionDetails> <errorInfoGroup> <rejectErrorCode> <errorDetails> <errorCode>0</errorCode> </errorDetails> </rejectErrorCode> <errorFreeText> <freeText>CHECK SEQUENCE NUMBER</freeText> </errorFreeText> </errorInfoGroup> </Fare\_GetRulesOfPricedItineraryReply>

  

* * *

## 5 Operations

## 5.1 Operation: Default Get Rule

**Passenger details**:

-   1 TPAX ADT 

**Itinerary details**: 

-   19JUN 0810 1110 LHR NCE BD L 
-   09JUL 1300 1405 NCE LHR BD L 

**Fare component details:** 

-   FC 1 correspond to LHR-NCE 
-   FC 2 correspond to NCE-LHR

Get Rule with default value (All passengers and Fare recommnadations)

## 5.1.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_GetRulesOfPricedItinerary xmlns="http://xml.amadeus.com/TFRUDQ\_12\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>FRL</messageFunction> </messageFunctionDetails> </messageActionDetails> <optionInfoGroup> <optionInfo> <selectionDetails> <option>LNG</option> <optionInformation>KO</optionInformation> </selectionDetails> </optionInfo> </optionInfoGroup> </Fare\_GetRulesOfPricedItinerary>

## 5.1.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_GetRulesOfPricedItineraryReply xmlns="http://xml.amadeus.com/TFRUDR\_12\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>FRL</messageFunction> </messageFunctionDetails> </messageActionDetails> <mnrDescriptionInfoGrp> <mnrPricedInfo> <segmentControlDetails> <productReference>1</productReference> </segmentControlDetails> </mnrPricedInfo> <mnrRulesInfoGrp> <mnrCatInfo> <descriptionInfo> <number>0</number> </descriptionInfo> </mnrCatInfo> <mnrFCInfoGrp> <refInfo> <referenceDetails> <type>FC</type> <value>1</value> </referenceDetails> </refInfo> </mnrFCInfoGrp> <itemText> <itemNb> <ruleSectionId>1</ruleSectionId> </itemNb> <itemName> <messageText>Fare Type</messageText> </itemName> <itemContent> <textProperties> <attributeDetails> <attributeType>B</attributeType> </attributeDetails> <attributeDetails> <attributeType>C</attributeType> <attributeDescription>1</attributeDescription> </attributeDetails> </textProperties> <textPortion> <messageText>Regular Excursion</messageText> </textPortion> </itemContent> </itemText> <itemText> <itemNb> <ruleSectionId>2</ruleSectionId> </itemNb> <itemName> <messageText>Advance Purchase</messageText> </itemName> <itemContent> <textProperties> <attributeDetails> <attributeType>C</attributeType> <attributeDescription>0</attributeDescription> </attributeDetails> </textProperties> <textPortion> <messageText>Reservation are required at least</messageText> </textPortion> </itemContent> <itemContent> <textProperties> <attributeDetails> <attributeType>B</attributeType> </attributeDetails> <attributeDetails> <attributeType>C</attributeType> <attributeDescription>7</attributeDescription> </attributeDetails> </textProperties> <textPortion> <messageText> one month</messageText> </textPortion> </itemContent> <itemContent> <textProperties> <attributeDetails> <attributeType>C</attributeType> <attributeDescription>0</attributeDescription> </attributeDetails> </textProperties> <textPortion> <messageText> in advance</messageText> </textPortion> </itemContent> </itemText> <itemText> <itemNb> <ruleSectionId>3</ruleSectionId> </itemNb> <itemName> <messageText>Change Departure date</messageText> </itemName> <itemContent> <textProperties> <attributeDetails> <attributeType>B</attributeType> </attributeDetails> <attributeDetails> <attributeType>C</attributeType> <attributeDescription>2</attributeDescription> </attributeDetails> </textProperties> <textPortion> <messageText>Changes are not allowed</messageText> </textPortion> </itemContent> </itemText> </mnrRulesInfoGrp> <mnrRulesInfoGrp> <mnrCatInfo> <descriptionInfo> <number>0</number> </descriptionInfo> </mnrCatInfo> <mnrFCInfoGrp> <refInfo> <referenceDetails> <type>FC</type> <value>2</value> </referenceDetails> </refInfo> </mnrFCInfoGrp> <itemText> <itemNb> <ruleSectionId>1</ruleSectionId> </itemNb> <itemName> <messageText>Fare Type</messageText> </itemName> <itemContent> <textProperties> <attributeDetails> <attributeType>B</attributeType> </attributeDetails> <attributeDetails> <attributeType>C</attributeType> <attributeDescription>1</attributeDescription> </attributeDetails> </textProperties> <textPortion> <messageText>Regular Excursion</messageText> </textPortion> </itemContent> </itemText> <itemText> <itemNb> <ruleSectionId>2</ruleSectionId> </itemNb> <itemName> <messageText>Advance Purchase</messageText> </itemName> <itemContent> <textProperties> <attributeDetails> <attributeType>C</attributeType> <attributeDescription>0</attributeDescription> </attributeDetails> </textProperties> <textPortion> <messageText>Reservation are required at least</messageText> </textPortion> </itemContent> <itemContent> <textProperties> <attributeDetails> <attributeType>B</attributeType> </attributeDetails> <attributeDetails> <attributeType>C</attributeType> <attributeDescription>7</attributeDescription> </attributeDetails> </textProperties> <textPortion> <messageText> one month</messageText> </textPortion> </itemContent> <itemContent> <textProperties> <attributeDetails> <attributeType>C</attributeType> <attributeDescription>0</attributeDescription> </attributeDetails> </textProperties> <textPortion> <messageText> in advance</messageText> </textPortion> </itemContent> </itemText> <itemText> <itemNb> <ruleSectionId>3</ruleSectionId> </itemNb> <itemName> <messageText>Change Departure date</messageText> </itemName> <itemContent> <textProperties> <attributeDetails> <attributeType>B</attributeType> </attributeDetails> <attributeDetails> <attributeType>C</attributeType> <attributeDescription>2</attributeDescription> </attributeDetails> </textProperties> <textPortion> <messageText>Changes are not allowed</messageText> </textPortion> </itemContent> </itemText> </mnrRulesInfoGrp> </mnrDescriptionInfoGrp> <allFaresInfoGroup> <markerAllFares></markerAllFares> <fareProductInfoGroup> <generalAndIdInfo> <segmentControlDetails> <productReference>1</productReference> </segmentControlDetails> </generalAndIdInfo> <passengerTypeInfoGroup> <fareInfo></fareInfo> <fareComponentsInfoGroup> <constructionContextInfo> <fareComponentDetails> <count>2</count> </fareComponentDetails> </constructionContextInfo> <pricingUnitInfoGroup> <pricingUnitIdentInfo> <quantityDetails> <unitQualifier>NPU</unitQualifier> </quantityDetails> </pricingUnitIdentInfo> <fareComponentInfo> <componentIdentInfo> <itemNumberDetails> <number>1</number> </itemNumberDetails> </componentIdentInfo> <subItineraryInfo> <includedSegmentsInfo> <numberOfItemsDetails> <referenceQualifier>RS</referenceQualifier> </numberOfItemsDetails> <lastItemsDetails> <firstItemIdentifier>1</firstItemIdentifier> <lastItemIdentifier>1</lastItemIdentifier> </lastItemsDetails> </includedSegmentsInfo> </subItineraryInfo> <fareQualifierDetails> <fareDetails> <fareCategory>XEX</fareCategory> </fareDetails> <additionalFareDetails> <secondRateClass>LNNGB9</secondRateClass> </additionalFareDetails> </fareQualifierDetails> <quantitiesInfo> <quantityDetails> <qualifier>TAR</qualifier> <value>2</value> <unit>M</unit> </quantityDetails> <otherquantityDetails> <qualifier>TBD</qualifier> <value>1</value> <unit>HR</unit> </otherquantityDetails> <otherquantityDetails> <qualifier>MNS</qualifier> <value>4</value> <unit>D</unit> </otherquantityDetails> <otherquantityDetails> <qualifier>MXS</qualifier> <value>20</value> <unit>D</unit> </otherquantityDetails> </quantitiesInfo> <fareComponentMatchedSeqInfo> <referenceDetails> <type>RU</type> <value>5432</value> </referenceDetails> </fareComponentMatchedSeqInfo> <productInfo> <bookingClassDetails> <designator>L</designator> </bookingClassDetails> </productInfo> <pricingTicketingDetails></pricingTicketingDetails> </fareComponentInfo> <fareComponentInfo> <componentIdentInfo> <itemNumberDetails> <number>2</number> </itemNumberDetails> </componentIdentInfo> <subItineraryInfo> <includedSegmentsInfo> <numberOfItemsDetails> <referenceQualifier>RS</referenceQualifier> </numberOfItemsDetails> <lastItemsDetails> <firstItemIdentifier>2</firstItemIdentifier> <lastItemIdentifier>2</lastItemIdentifier> </lastItemsDetails> </includedSegmentsInfo> </subItineraryInfo> <fareQualifierDetails> <fareDetails> <fareCategory>XEX</fareCategory> </fareDetails> <additionalFareDetails> <secondRateClass>LNNGB9</secondRateClass> </additionalFareDetails> </fareQualifierDetails> <quantitiesInfo> <quantityDetails> <qualifier>TAR</qualifier> <value>2</value> <unit>M</unit> </quantityDetails> <otherquantityDetails> <qualifier>TBD</qualifier> <value>1</value> <unit>HR</unit> </otherquantityDetails> <otherquantityDetails> <qualifier>MNS</qualifier> <value>4</value> <unit>D</unit> </otherquantityDetails> <otherquantityDetails> <qualifier>MXS</qualifier> <value>20</value> <unit>D</unit> </otherquantityDetails> </quantitiesInfo> <fareComponentMatchedSeqInfo> <referenceDetails> <type>RU</type> <value>5432</value> </referenceDetails> </fareComponentMatchedSeqInfo> <productInfo> <bookingClassDetails> <designator>L</designator> </bookingClassDetails> </productInfo> <pricingTicketingDetails></pricingTicketingDetails> </fareComponentInfo> </pricingUnitInfoGroup> </fareComponentsInfoGroup> </passengerTypeInfoGroup> </fareProductInfoGroup> </allFaresInfoGroup> </Fare\_GetRulesOfPricedItineraryReply>

## 5.1.3 Possible Errors

See "Error Messages" section.

* * *

## 5.2 Operation: Get Rule per Passenger Type

**Passenger details:** 

-   TPAX 1: ADT 
-   TPAX 2: CH 

**Itinerary details:** 

-   19JUN 0810-1110 LHR-NCE BD L 
-   09JUL 1350-1530 NCE-BRU SN S 
-   09JUL 1640-1700 BRU-LHR SN S 

**Fare component details:** 

-   FC 1: LHR-NCE 
-   FC 2: NCE-BRU-LHR

Get rule for Passenger Type 2 (with same rules for FC1 and FC 2)

## 5.2.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_GetRulesOfPricedItinerary xmlns="http://xml.amadeus.com/TFRUDQ\_12\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>FRL</messageFunction> </messageFunctionDetails> </messageActionDetails> <passengerInfoGroup> <segmentRepetitionControl> <segmentControlDetails> <productReference>2</productReference> </segmentControlDetails> </segmentRepetitionControl> </passengerInfoGroup> <optionInfoGroup> <optionInfo> <selectionDetails> <option>LNG</option> <optionInformation>EN</optionInformation> </selectionDetails> </optionInfo> </optionInfoGroup> </Fare\_GetRulesOfPricedItinerary>

## 5.2.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_GetRulesOfPricedItineraryReply xmlns="http://xml.amadeus.com/TFRUDR\_12\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>FRL</messageFunction> </messageFunctionDetails> </messageActionDetails> <mnrDescriptionInfoGrp> <mnrPricedInfo> <segmentControlDetails> <productReference>2</productReference> </segmentControlDetails> </mnrPricedInfo> <mnrRulesInfoGrp> <mnrCatInfo> <descriptionInfo> <number>0</number> </descriptionInfo> </mnrCatInfo> <mnrFCInfoGrp> <refInfo> <referenceDetails> <type>FC</type> <value>1</value> </referenceDetails> <referenceDetails> <type>FC</type> <value>2</value> </referenceDetails> </refInfo> </mnrFCInfoGrp> <itemText> <itemNb> <ruleSectionId>1</ruleSectionId> </itemNb> <itemName> <messageText>Fare Type</messageText> </itemName> <itemContent> <textProperties> <attributeDetails> <attributeType>B</attributeType> </attributeDetails> <attributeDetails> <attributeType>C</attributeType> <attributeDescription>1</attributeDescription> </attributeDetails> </textProperties> <textPortion> <messageText>Regular Excursion</messageText> </textPortion> </itemContent> </itemText> <itemText> <itemNb> <ruleSectionId>2</ruleSectionId> </itemNb> <itemName> <messageText>Advance Purchase</messageText> </itemName> <itemContent> <textProperties> <attributeDetails> <attributeType>C</attributeType> <attributeDescription>0</attributeDescription> </attributeDetails> </textProperties> <textPortion> <messageText>Reservation are required at least</messageText> </textPortion> </itemContent> <itemContent> <textProperties> <attributeDetails> <attributeType>B</attributeType> </attributeDetails> <attributeDetails> <attributeType>C</attributeType> <attributeDescription>7</attributeDescription> </attributeDetails> </textProperties> <textPortion> <messageText> one month</messageText> </textPortion> </itemContent> <itemContent> <textProperties> <attributeDetails> <attributeType>C</attributeType> <attributeDescription>0</attributeDescription> </attributeDetails> </textProperties> <textPortion> <messageText> in advance</messageText> </textPortion> </itemContent> </itemText> <itemText> <itemNb> <ruleSectionId>3</ruleSectionId> </itemNb> <itemName> <messageText>Change Departure date</messageText> </itemName> <itemContent> <textProperties> <attributeDetails> <attributeType>B</attributeType> </attributeDetails> <attributeDetails> <attributeType>C</attributeType> <attributeDescription>2</attributeDescription> </attributeDetails> </textProperties> <textPortion> <messageText>Changes are not allowed</messageText> </textPortion> </itemContent> </itemText> </mnrRulesInfoGrp> </mnrDescriptionInfoGrp> <allFaresInfoGroup> <markerAllFares></markerAllFares> <fareProductInfoGroup> <generalAndIdInfo> <segmentControlDetails> <productReference>2</productReference> </segmentControlDetails> </generalAndIdInfo> <passengerTypeInfoGroup> <fareInfo></fareInfo> <fareComponentsInfoGroup> <constructionContextInfo> <fareComponentDetails> <count>2</count> </fareComponentDetails> </constructionContextInfo> <pricingUnitInfoGroup> <pricingUnitIdentInfo> <quantityDetails> <unitQualifier>NPU</unitQualifier> </quantityDetails> </pricingUnitIdentInfo> <fareComponentInfo> <componentIdentInfo> <itemNumberDetails> <number>1</number> </itemNumberDetails> </componentIdentInfo> <subItineraryInfo> <includedSegmentsInfo> <numberOfItemsDetails> <referenceQualifier>RS</referenceQualifier> </numberOfItemsDetails> <lastItemsDetails> <firstItemIdentifier>1</firstItemIdentifier> <lastItemIdentifier>1</lastItemIdentifier> </lastItemsDetails> </includedSegmentsInfo> </subItineraryInfo> <fareQualifierDetails> <fareDetails> <fareCategory>XEX</fareCategory> </fareDetails> <additionalFareDetails> <secondRateClass>LNNGB9</secondRateClass> </additionalFareDetails> </fareQualifierDetails> <quantitiesInfo> <quantityDetails> <qualifier>TAR</qualifier> <value>2</value> <unit>M</unit> </quantityDetails> <otherquantityDetails> <qualifier>TBD</qualifier> <value>1</value> <unit>HR</unit> </otherquantityDetails> <otherquantityDetails> <qualifier>MNS</qualifier> <value>4</value> <unit>D</unit> </otherquantityDetails> <otherquantityDetails> <qualifier>MXS</qualifier> <value>20</value> <unit>D</unit> </otherquantityDetails> </quantitiesInfo> <fareComponentMatchedSeqInfo> <referenceDetails> <type>RU</type> <value>5432</value> </referenceDetails> </fareComponentMatchedSeqInfo> <productInfo> <bookingClassDetails> <designator>L</designator> </bookingClassDetails> </productInfo> <pricingTicketingDetails></pricingTicketingDetails> </fareComponentInfo> <fareComponentInfo> <componentIdentInfo> <itemNumberDetails> <number>2</number> </itemNumberDetails> </componentIdentInfo> <subItineraryInfo> <includedSegmentsInfo> <numberOfItemsDetails> <referenceQualifier>RS</referenceQualifier> </numberOfItemsDetails> <lastItemsDetails> <firstItemIdentifier>2</firstItemIdentifier> <lastItemIdentifier>2</lastItemIdentifier> </lastItemsDetails> </includedSegmentsInfo> </subItineraryInfo> <fareQualifierDetails> <fareDetails> <fareCategory>XEX</fareCategory> </fareDetails> <additionalFareDetails> <secondRateClass>LNNGB9</secondRateClass> </additionalFareDetails> </fareQualifierDetails> <quantitiesInfo> <quantityDetails> <qualifier>TAR</qualifier> <value>2</value> <unit>M</unit> </quantityDetails> <otherquantityDetails> <qualifier>TBD</qualifier> <value>1</value> <unit>HR</unit> </otherquantityDetails> <otherquantityDetails> <qualifier>MNS</qualifier> <value>4</value> <unit>D</unit> </otherquantityDetails> <otherquantityDetails> <qualifier>MXS</qualifier> <value>20</value> <unit>D</unit> </otherquantityDetails> </quantitiesInfo> <fareComponentMatchedSeqInfo> <referenceDetails> <type>RU</type> <value>5432</value> </referenceDetails> </fareComponentMatchedSeqInfo> <productInfo> <bookingClassDetails> <designator>L</designator> </bookingClassDetails> </productInfo> <pricingTicketingDetails></pricingTicketingDetails> </fareComponentInfo> </pricingUnitInfoGroup> </fareComponentsInfoGroup> </passengerTypeInfoGroup> </fareProductInfoGroup> </allFaresInfoGroup> </Fare\_GetRulesOfPricedItineraryReply>

## 5.2.3 Possible Errors

See "Error Messages" section.

* * *

## 5.3 Operation: Get Rule per Passenger Type and Fare Component

**Passenger details:** 

-   TPAX 1: ADT 
-   TPAX 2: CH 

**Itinerary details:** 

-   19JUN 0810-1110 LHR-NCE BD L 
-   09JUL 1350-1530 NCE-BRU SN S 
-   09JUL 1640-1700 BRU-LHR SN S 

**Fare component details:** 

-   FC 1: LHR-NCE 
-   FC 2: NCE-BRU-LHR

Get rule for Passenger Type 2 and Fare Component 2.

## 5.3.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_GetRulesOfPricedItinerary xmlns="http://xml.amadeus.com/TFRUDQ\_12\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>FRL</messageFunction> </messageFunctionDetails> </messageActionDetails> <passengerInfoGroup> <segmentRepetitionControl> <segmentControlDetails> <productReference>2</productReference> </segmentControlDetails> </segmentRepetitionControl> <itemInfo> <itemNumberDetails> <number>2</number> <type>FC</type> </itemNumberDetails> </itemInfo> </passengerInfoGroup> <optionInfoGroup> <optionInfo> <selectionDetails> <option>LNG</option> <optionInformation>EN</optionInformation> </selectionDetails> </optionInfo> </optionInfoGroup> </Fare\_GetRulesOfPricedItinerary>

## 5.3.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_GetRulesOfPricedItineraryReply xmlns="http://xml.amadeus.com/TFRUDR\_12\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>FRL</messageFunction> </messageFunctionDetails> </messageActionDetails> <mnrDescriptionInfoGrp> <mnrPricedInfo> <segmentControlDetails> <productReference>2</productReference> </segmentControlDetails> </mnrPricedInfo> <mnrRulesInfoGrp> <mnrCatInfo> <descriptionInfo> <number>0</number> </descriptionInfo> </mnrCatInfo> <mnrFCInfoGrp> <refInfo> <referenceDetails> <type>FC</type> <value>2</value> </referenceDetails> </refInfo> </mnrFCInfoGrp> <itemText> <itemNb> <ruleSectionId>1</ruleSectionId> </itemNb> <itemName> <messageText>Fare Type</messageText> </itemName> <itemContent> <textProperties> <attributeDetails> <attributeType>B</attributeType> </attributeDetails> <attributeDetails> <attributeType>C</attributeType> <attributeDescription>1</attributeDescription> </attributeDetails> </textProperties> <textPortion> <messageText>Regular Excursion</messageText> </textPortion> </itemContent> </itemText> <itemText> <itemNb> <ruleSectionId>2</ruleSectionId> </itemNb> <itemName> <messageText>Advance Purchase</messageText> </itemName> <itemContent> <textProperties> <attributeDetails> <attributeType>C</attributeType> <attributeDescription>0</attributeDescription> </attributeDetails> </textProperties> <textPortion> <messageText>Reservation are required at least</messageText> </textPortion> </itemContent> <itemContent> <textProperties> <attributeDetails> <attributeType>B</attributeType> </attributeDetails> <attributeDetails> <attributeType>C</attributeType> <attributeDescription>7</attributeDescription> </attributeDetails> </textProperties> <textPortion> <messageText> one month</messageText> </textPortion> </itemContent> <itemContent> <textProperties> <attributeDetails> <attributeType>C</attributeType> <attributeDescription>0</attributeDescription> </attributeDetails> </textProperties> <textPortion> <messageText> in advance</messageText> </textPortion> </itemContent> </itemText> <itemText> <itemNb> <ruleSectionId>3</ruleSectionId> </itemNb> <itemName> <messageText>Change Departure date</messageText> </itemName> <itemContent> <textProperties> <attributeDetails> <attributeType>B</attributeType> </attributeDetails> <attributeDetails> <attributeType>C</attributeType> <attributeDescription>2</attributeDescription> </attributeDetails> </textProperties> <textPortion> <messageText>Changes are not allowed</messageText> </textPortion> </itemContent> </itemText> </mnrRulesInfoGrp> </mnrDescriptionInfoGrp> <allFaresInfoGroup> <markerAllFares></markerAllFares> <fareProductInfoGroup> <generalAndIdInfo> <segmentControlDetails> <productReference>2</productReference> </segmentControlDetails> </generalAndIdInfo> <passengerTypeInfoGroup> <fareInfo></fareInfo> <fareComponentsInfoGroup> <constructionContextInfo> <fareComponentDetails> <count>1</count> </fareComponentDetails> </constructionContextInfo> <pricingUnitInfoGroup> <pricingUnitIdentInfo> <quantityDetails> <unitQualifier>NPU</unitQualifier> </quantityDetails> </pricingUnitIdentInfo> <fareComponentInfo> <componentIdentInfo> <itemNumberDetails> <number>2</number> </itemNumberDetails> </componentIdentInfo> <subItineraryInfo> <includedSegmentsInfo> <numberOfItemsDetails> <referenceQualifier>RS</referenceQualifier> </numberOfItemsDetails> <lastItemsDetails> <firstItemIdentifier>2</firstItemIdentifier> <lastItemIdentifier>2</lastItemIdentifier> </lastItemsDetails> </includedSegmentsInfo> </subItineraryInfo> <fareQualifierDetails> <fareDetails> <fareCategory>XEX</fareCategory> </fareDetails> <additionalFareDetails> <secondRateClass>LNNGB9</secondRateClass> </additionalFareDetails> </fareQualifierDetails> <quantitiesInfo> <quantityDetails> <qualifier>TAR</qualifier> <value>2</value> <unit>M</unit> </quantityDetails> <otherquantityDetails> <qualifier>TBD</qualifier> <value>1</value> <unit>HR</unit> </otherquantityDetails> <otherquantityDetails> <qualifier>MNS</qualifier> <value>4</value> <unit>D</unit> </otherquantityDetails> <otherquantityDetails> <qualifier>MXS</qualifier> <value>20</value> <unit>D</unit> </otherquantityDetails> </quantitiesInfo> <fareComponentMatchedSeqInfo> <referenceDetails> <type>RU</type> <value>5432</value> </referenceDetails> </fareComponentMatchedSeqInfo> <productInfo> <bookingClassDetails> <designator>L</designator> </bookingClassDetails> </productInfo> <pricingTicketingDetails></pricingTicketingDetails> </fareComponentInfo> </pricingUnitInfoGroup> </fareComponentsInfoGroup> </passengerTypeInfoGroup> </fareProductInfoGroup> </allFaresInfoGroup> </Fare\_GetRulesOfPricedItineraryReply>

## 5.3.3 Possible Errors

See "Error Messages" section.

* * *

## 5.4 Operation: Get Rule with Maximum Data Exceeded

**Passenger details:** 

-   TPAX 1: ADT 
-   TPAX 2: CH 

**Itinerary details:** 

-   19JUN 0810-1110 LHR-NCE BD L 
-   09JUL 1350-1530 NCE-BRU SN S 
-   09JUL 1640-1700 BRU-LHR SN S 

**Fare component details:** 

-   FC 1: LHR-NCE 
-   FC 2: NCE-BRU-LHR

Get Rule with default values (All passenger types and fare recommendations)

## 5.4.1 Query Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_GetRulesOfPricedItinerary xmlns="http://xml.amadeus.com/TFRUDQ\_12\_1\_1A"> <messageActionDetails> <messageFunctionDetails> <messageFunction>FRL</messageFunction> </messageFunctionDetails> </messageActionDetails> <optionInfoGroup> <optionInfo> <selectionDetails> <option>LNG</option> <optionInformation>KO</optionInformation> </selectionDetails> </optionInfo> </optionInfoGroup> </Fare\_GetRulesOfPricedItinerary>

## 5.4.2 Reply Structure

![](/resources/externalFiles/images/userguideeditor/icon_collapse.gif)XML Example

<Fare\_GetRulesOfPricedItineraryReply xmlns="http://xml.amadeus.com/TFRUDR\_12\_1\_1A"> <technicalStatusInfo> <statusDetails> <indicator>MDE</indicator> </statusDetails> </technicalStatusInfo> <messageActionDetails> <messageFunctionDetails> <messageFunction>FRL</messageFunction> </messageFunctionDetails> </messageActionDetails> <allFaresInfoGroup> <markerAllFares></markerAllFares> <fareProductInfoGroup> <generalAndIdInfo> <segmentControlDetails> <productReference>1</productReference> </segmentControlDetails> </generalAndIdInfo> <passengerTypeInfoGroup> <fareInfo></fareInfo> <fareComponentsInfoGroup> <constructionContextInfo> <fareComponentDetails> <count>2</count> </fareComponentDetails> </constructionContextInfo> <pricingUnitInfoGroup> <pricingUnitIdentInfo> <quantityDetails> <unitQualifier>NPU</unitQualifier> </quantityDetails> </pricingUnitIdentInfo> <fareComponentInfo> <componentIdentInfo> <itemNumberDetails> <number>1</number> </itemNumberDetails> </componentIdentInfo> <subItineraryInfo> <includedSegmentsInfo> <numberOfItemsDetails> <referenceQualifier>RS</referenceQualifier> </numberOfItemsDetails> <lastItemsDetails> <firstItemIdentifier>1</firstItemIdentifier> <lastItemIdentifier>1</lastItemIdentifier> </lastItemsDetails> </includedSegmentsInfo> </subItineraryInfo> <pricingTicketingDetails></pricingTicketingDetails> </fareComponentInfo> <fareComponentInfo> <componentIdentInfo> <itemNumberDetails> <number>2</number> </itemNumberDetails> </componentIdentInfo> <subItineraryInfo> <includedSegmentsInfo> <numberOfItemsDetails> <referenceQualifier>RS</referenceQualifier> </numberOfItemsDetails> <lastItemsDetails> <firstItemIdentifier>2</firstItemIdentifier> <lastItemIdentifier>3</lastItemIdentifier> </lastItemsDetails> </includedSegmentsInfo> </subItineraryInfo> <pricingTicketingDetails></pricingTicketingDetails> </fareComponentInfo> </pricingUnitInfoGroup> </fareComponentsInfoGroup> </passengerTypeInfoGroup> </fareProductInfoGroup> <fareProductInfoGroup> <generalAndIdInfo> <segmentControlDetails> <productReference>2</productReference> </segmentControlDetails> </generalAndIdInfo> <passengerTypeInfoGroup> <fareInfo></fareInfo> <fareComponentsInfoGroup> <constructionContextInfo> <fareComponentDetails> <count>2</count> </fareComponentDetails> </constructionContextInfo> <pricingUnitInfoGroup> <pricingUnitIdentInfo> <quantityDetails> <unitQualifier>NPU</unitQualifier> </quantityDetails> </pricingUnitIdentInfo> <fareComponentInfo> <componentIdentInfo> <itemNumberDetails> <number>1</number> </itemNumberDetails> </componentIdentInfo> <subItineraryInfo> <includedSegmentsInfo> <numberOfItemsDetails> <referenceQualifier>RS</referenceQualifier> </numberOfItemsDetails> <lastItemsDetails> <firstItemIdentifier>1</firstItemIdentifier> <lastItemIdentifier>1</lastItemIdentifier> </lastItemsDetails> </includedSegmentsInfo> </subItineraryInfo> <pricingTicketingDetails></pricingTicketingDetails> </fareComponentInfo> <fareComponentInfo> <componentIdentInfo> <itemNumberDetails> <number>2</number> </itemNumberDetails> </componentIdentInfo> <subItineraryInfo> <includedSegmentsInfo> <numberOfItemsDetails> <referenceQualifier>RS</referenceQualifier> </numberOfItemsDetails> <lastItemsDetails> <firstItemIdentifier>2</firstItemIdentifier> <lastItemIdentifier>3</lastItemIdentifier> </lastItemsDetails> </includedSegmentsInfo> </subItineraryInfo> <pricingTicketingDetails></pricingTicketingDetails> </fareComponentInfo> </pricingUnitInfoGroup> </fareComponentsInfoGroup> </passengerTypeInfoGroup> </fareProductInfoGroup> </allFaresInfoGroup> </Fare\_GetRulesOfPricedItineraryReply>

## 5.4.3 Possible Errors

See "Error Messages" section.

* * *