from pprint import pprint
import boto3
import os
import json
import re

# Cognito Variables:
# cognito_client = boto3.client('cognito-identity')
cognito_client = boto3.client('cognito-idp')

# userGroup = cognito_client.get_group(awsparallel17452c78_userpool_17452c78-dev,'us-east-1_MCkseCayO')

# DynamoDB Variables:
dynamodb = boto3.resource('dynamodb')
instructor_table = dynamodb.Table("awsparallel-templates")
instructor_email = "instructor@example.com"
templateName = "template1"

# Global Variables:
strings_remove = ['\"', "\'" , " ", "\n"]
# instructor_template_dict = {}
# student_template_dict = {}
instructor_template_dict = set()
student_template_dict = set()
no_match_strings = []

# Gets Student's Information
def getStudent(event):
    try:
        # studentResponse = cognito_client.get_id("")
        studentResponse = event["userName"]
    
    except Exception as e:
        print("Error has occured getting id from Cognito")
        print(str(e))
    else:
        print("Got the cognito id")
        print("userName: " + studentResponse)
        print()
        return studentResponse

# Get Student's Work
def getStudentWork(event):
    print()
    print("Getting the student's work")
    studentResponse = event["request"]["testingTemplate"]
    print(studentResponse)
    print()
    studentResponse = str(studentResponse)
    # studentResponseLineTemplate = re.split('[({) (})]', studentResponse)
    studentResponseLineTemplate = re.split('({|})', studentResponse)
    # print("studentResponseLineTemplate: ")
    # printList(studentResponseLineTemplate)
    # studentResponseLineTemplate = re.split('{', studentResponse)

    secondStringList = lineSplitter(studentResponseLineTemplate, ",")
    print("secondStringList: ")
    printList(secondStringList)
    # finalStringList = lineSplitter(secondStringList, "}", student_template_dict)
    # finalStringList = re.split('(}) | (})', str(secondStringList))
    # print("finalStringList: ")
    # printList(finalStringList)
    
    return secondStringList

def getStudentWorkOLD(event):
    print()
    print("Getting the student's work")
    studentResponse = event["request"]["testingTemplate"]
    print(studentResponse)
    print()
    studentResponse = str(studentResponse)
    studentResponseLineTemplate = studentResponse.split('{')

    # firstStringList = lineSplitter(studentResponseLineTemplate, "{", student_template_dict)
    # secondStringList = lineSplitter(firstStringList, ",", student_template_dict)
    secondStringList = lineSplitter(studentResponseLineTemplate, ",", student_template_dict)
    print("secondStringList: ")
    printList(secondStringList)
    finalStringList = lineSplitter(secondStringList, "}", student_template_dict)

    return finalStringList
    
# Get Instructor Template from DynamoDB
def getInstructorTemplate():
    try:
        response = instructor_table.get_item(Key={'user_email': instructor_email})
    except Exception as e:
        print("Error has occured")
        print(e.response['Error']['Message'])
        print()
    else:
        print("Instructor Information:")
        instructorTemplateValues = response["Item"][templateName]
        print(instructorTemplateValues)
        # studentResponseLineTemplate = re.split('({|})', studentResponse)
        splitLineTemplate = re.split('({|})', instructorTemplateValues)
        # instructorTemplateValues.splitlines()
        finalInstructorList = lineSplitter(splitLineTemplate, ",")

        # for y in range(len(splitLineTemplate)):
        #     currLine = splitLineTemplate[y]
        #     currLine = currLine.strip()
        #     if (currLine != ""):
        #         splitLineTemplate[y] = currLine
        
        # finalInstructorList = lineSplitter(splitLineTemplate, "{", instructor_template_dict)
        # finalInstructorList = lineSplitter(finalInstructorList, ",", instructor_template_dict)
        # finalInstructorList = lineSplitter(finalInstructorList, "}", instructor_template_dict)
        
        print("Final Instructor Template:")
        printList(finalInstructorList)        
        
        print()
        return finalInstructorList
        # return response["Item"]    

def getInstructorTemplateOLD():
    try:
        response = instructor_table.get_item(Key={'user_email': instructor_email})
    except Exception as e:
        print("Error has occured")
        print(e.response['Error']['Message'])
        print()
    else:
        print("Instructor Information:")
        instructorTemplateValues = response["Item"][templateName]
        print(instructorTemplateValues)
        splitLineTemplate = instructorTemplateValues.splitlines()

        for y in range(len(splitLineTemplate)):
            currLine = splitLineTemplate[y]
            currLine = currLine.strip()
            if (currLine != ""):
                splitLineTemplate[y] = currLine
        
        finalInstructorList = lineSplitter(splitLineTemplate, "{", instructor_template_dict)
        finalInstructorList = lineSplitter(finalInstructorList, ",", instructor_template_dict)
        finalInstructorList = lineSplitter(finalInstructorList, "}", instructor_template_dict)
        
        # print("Final Instructor Template:")
        # printList(finalInstructorList)        
        
        print()
        return finalInstructorList
        # return response["Item"]    

# Splits the Strings in the array using the specified values
def lineSplitter(currLineTemplate, splitString):
    firstStringList = []
    currNum = 0
    for y in range(len(currLineTemplate)):
        currLine = currLineTemplate[y]
        currLine = currLine.strip()
        temp = currLine.split(splitString)
        for z in (temp):
            if (z != ""):
                firstStringList.append(z)
                currNum = currNum + 1
    return firstStringList

def lineSplitterSet(currLineTemplate, splitString):
    firstStringList = []
    currNum = 0
    for y in range(len(currLineTemplate)):
        currLine = currLineTemplate[y]
        currLine = currLine.strip()
        temp = currLine.split(splitString)
        for z in (temp):
            if (z != ""):
                firstStringList.append(z)
                currNum = currNum + 1
    return firstStringList

# Removes the specified characters from each String
def removeChars(currTemplate, removeStrings, template_dict):
    for y in range(len(currTemplate)):
        for x in removeStrings:
            currLine = currTemplate[y]
            currLine = currLine.replace(x, "")
            currTemplate[y] = currLine
            template_dict.add(currLine)

# Prints out the templates
def printList(currTemplate):
    print(type(currTemplate))
    for line in currTemplate:
        print("line: " + str(line))

def compareTemplates3(instructorTemplate, studentTemplate):
    print()
    print("Comparison Function!")
    matches = 0
    notMatches = 0
    
    instructorLength = len(instructorTemplate)
    studentLength = len(studentTemplate)
    
    minLength = min(instructorTemplate, studentTemplate)
  
    for x in range(instructorLength):
        currInstructorLine = instructorTemplate[x]
        if currInstructorLine in studentTemplate:
            matches = matches + 1
        else:
            notMatches = notMatches + 1
    
    if(studentLength > instructorLength):
        notMatches = notMatches + (studentLength - instructorLength)

    matchesList = [matches, notMatches]
    print("Matches: " + str(matches))
    print("No Matches: " + str(notMatches))
    return matchesList

def compareTemplatesOLD(instructorTemplate, studentTemplate):
    print()
    print("Comparison Function!")
    matches = 0
    notMatches = 0
    
    intructorLength = len(instructorTemplate)
    studentLength = len(studentTemplate)
    
    minLength = min(instructorTemplate, studentTemplate)
  
    for x in range(len(instructorTemplate)):
        currInstructorLine = instructorTemplate[x]
        currStudentLine = studentTemplate[x]
        if (currInstructorLine == currStudentLine):
            matches = matches + 1
        else:
            notMatches = notMatches + 1

    matchesList = [matches, notMatches]
    print("Matches: " + str(matches))
    print("No Matches: " + str(notMatches))
    return matchesList

def compareTemplates(instructorTemplate, studentTemplate):
    print()
    print("Comparison Function!")
    matches = 0
    notMatches = 0
    grade = 0
    
    instructorLength = len(instructorTemplate)
    studentLength = len(studentTemplate)
    print("instructorLength: "  + str(instructorLength))
    print("studentLength: "  + str(studentLength))

    minLength = min(instructorLength, studentLength)
    print("minLength: "+ str(minLength))
    for x in range(minLength):
        currInstructorArray = instructorTemplate[x]
        currStudentArray = studentTemplate[x]
        isError = False
        if currInstructorArray not in studentTemplate:
            for j in range(len(currInstructorArray)):
                currInstructorLine = currInstructorArray[j]
                if currInstructorLine not in currStudentArray:
                    isError = True
                    print("currInstructorLine: " + currInstructorLine)
                    no_match_strings.append(currInstructorLine)
                    notMatches = notMatches + 1
                else:
                    matches = matches + 1
        else:
            matches = matches + len(currInstructorArray)
            
        # if (not isError):
        #     matches = matches + 1
        # else:
        #     notMatches = notMatches + 1
    
    if (notMatches != 0):
        removedNums = checkMatchesList(studentTemplate)
        notMatches = notMatches - removedNums
        matches = matches + removedNums
    
    print("NotMatches: " + str(notMatches))
    if(studentLength != instructorLength):
        notMatches = notMatches + abs(studentLength - instructorLength)
    
    print("Matches: " + str(matches))
    print("No Matches: " + str(notMatches))
    
    grade = matches / (matches + notMatches)
    matchesList = [matches, notMatches, grade]
    return matchesList

def checkMatchesList(studentTemplate):
    removedNums = 0
    no_match_stringsLength = len(no_match_strings)
    for currInstructorLine in no_match_strings:
        currStudentLine = 0
        doesContain = True 
        while ((currStudentLine < len(studentTemplate)) and (doesContain)):
            studentLine = studentTemplate[currStudentLine]
            for currObject in currInstructorLine:
                if currObject not in studentLine:
                    doesContain = False
            currStudentLine = currStudentLine + 1         
        if doesContain:
            no_match_strings.remove(currInstructorLine)
            removedNums = removedNums + 1
    return removedNums
    
def addInstructorElems(instructorTemplate):
    print(type(instructorTemplate))
    tempLength = len(instructorTemplate)
    print(tempLength)
    currArrNum = 0
    allInstructorLists = []
    currArray = []
    print("TemplateLength: " + str(tempLength))

    for i in range(tempLength):
        currLine = instructorTemplate[i]
        currLine = currLine.strip()
        currLineLength = len(currLine)
        print("current line: "+ currLine)
        if (currLine != ""):
            instructorTemplate[i] = currLine        
        # print("CurrLine: " + currLine)
        if (currLine[currLineLength - 1]) is "{" and (currLineLength != 1):
            currArray.append(currLine)
            if currArray not in allInstructorLists:
                allInstructorLists.insert(currArrNum, currArray)
            newArray = []
            currArray = newArray
            currArrNum = currArrNum + 1
        elif (currLine[currLineLength - 1]) is "{":
            if currArray not in allInstructorLists:            
                allInstructorLists.insert(currArrNum, currArray)
            newArray = []
            currArray = newArray
            currArrNum = currArrNum + 1            
        elif currLine[0] is "}":
            currArray.append(currLine)
            if currArray not in allInstructorLists:
                allInstructorLists.insert(currArrNum, currArray)
            allInstructorLists[currArrNum] = currArray
            currArrNum = currArrNum - 1
            currArray = allInstructorLists[currArrNum]
        else:
            currArray.append(currLine)
    
    # for j in range(len(allInstructorLists)):
    #     currList = allInstructorLists[j]
    #     print("curr List: "+ str(currList))

    print()
    return allInstructorLists


# Handles all of the orchestration of the other functions    
def lambda_handler(event, context):
    print(event)
    
    # no_match_strings.clear()
    # response = instructor_table.get_item(Key={'user_email': instructor_email})
    # instructorTemplateValues = response["Item"][templateName]
    # # print(type(instructorTemplateValues))
    # # print("instructorTemplateValues: " + instructorTemplateValues)
    # # addInstructorElems(instructorTemplateValues, len(instructorTemplateValues) - 1)
    
    # studentCompareTemplate = getStudentWork(event)
    # instructorTemplate = getInstructorTemplate()
    # print(type(instructorTemplate))

    # # print("instructorTemplateValues: " + instructorTemplate)
    

    
    # removeChars(instructorTemplate, strings_remove, instructor_template_dict)
    # removeChars(studentCompareTemplate, strings_remove, instructor_template_dict)
    
    # finalInstructorTemplate = addInstructorElems(instructorTemplate)
    # finalStudentTemplate = addInstructorElems(studentCompareTemplate)


    # print()
    # print("Instructor Template:")
    # printList(finalInstructorTemplate)
    # print()
    # print("Student Template:")
    # printList(finalStudentTemplate)

    # matchesList = compareTemplates(finalInstructorTemplate, finalStudentTemplate)

    # print("No match list:")
    # printList(no_match_strings)

    # response = getStudent(event)
    return event


if __name__ == '__main__':
    print("Getting object succeeded")
    pprint(response, sort_dicts=False)



# import json

# def handler(event, context):
#   print('received event:')
#   print(event)
  
#   return {
#       'statusCode': 200,
#       'headers': {
#           'Access-Control-Allow-Headers': '*',
#           'Access-Control-Allow-Origin': '*',
#           'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
#       },
#       'body': json.dumps('Hello from your new Amplify Python lambda!')
#   }