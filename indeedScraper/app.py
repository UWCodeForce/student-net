import requests
import json
import mysql.connector

from bs4 import BeautifulSoup

## Extract HTML documentation into soup variable
def extract(page):
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.71 Safari/537.36'}
    if (page == 1 or 0):
        URL = 'https://ca.indeed.com/jobs?q=Computer%20Science&l=Winnipeg%2C%20MB'
    else:
        page = page * 10
        URL = 'https://ca.indeed.com/jobs?q=Computer%20Science&l=Winnipeg%2C%20MB&start={}'.format(page)

    # creating a request of the URL
    r = requests.get(URL, headers)
    soup = BeautifulSoup(r.content, 'html.parser')
    return soup

## Retrieve job information from soup and store in a list
def getJobInfo(soup):

    allJobs = []
    ## id = 0
    
    a = soup.find_all('a', class_ = ('tapItem', 'fs-unmask'))

    for jobs in a:
        title = jobs.find('span', title = True)
        company = jobs.find('span', class_ = ('companyName')).text.strip()
        location = jobs.find('div', class_ = ('companyLocation')).text.strip()
        description = jobs.find('div', class_ = ('job-snippet')).text.strip()
        salary = jobs.find('span', class_ = ('salary-snippet'))
        date = jobs.find('span', class_ = ('date')).text.strip()

        if (salary == None):
            hasSalary = None
        else:
            hasSalary = salary.text
      ## id = id + 1
        myData = (
            title['title'].strip(),
            company,
            location,
            description,
            hasSalary,
            date
            )

        allJobs.append(myData)
        
    return allJobs

## Retrieve and extract data
def insertData():
    mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="root",
    database="studentnet"
    )

    mycursor = mydb.cursor()

    sql = "TRUNCATE TABLE indeedjobs"
    mycursor.execute(sql)

    mydb.commit()

    print("Old data cleared...")

    for x in range(2):
        c = extract(x + 1)
        jobInfo = getJobInfo(c)

        sql = "INSERT INTO indeedjobs (title, company, location, jobDescription, salary, dateString) VALUES (%s, %s, %s, %s, %s, %s)"
        mycursor.executemany(sql, jobInfo)

        mydb.commit()

        print(mycursor.rowcount, "jobs was inserted.")

insertData()




