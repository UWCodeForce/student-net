import requests
import json

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
        myJson = {
            ##'Id':id,
            'Title':title['title'].strip(),
            'Company':company,
            'Location':location,
            'Description':description,
            'Salary':hasSalary,
            'Date':date
        }

        allJobs.append(myJson)
        
    return allJobs

## Retrieve and extract data
def getJobs():
    for x in range(1):
        c = extract(x + 1)
        jobInfo = getJobInfo(c)
    return jobInfo

## Writes data into json file
def writeJson(data, filename="./web/resources/indeedJobs.json"):
    with open (filename, "w") as f:
        f.write(json.dumps(data, indent=4))

## In order to update the jobs, we have to clear the old list
def clearJson(filename="./web/resources/indeedJobs.json"):
    with open("./web/resources/indeedJobs.json", "r") as json_file:
        data = json.load(json_file)
        n = 0
        if (data == []):
            pass
        else:
            for i in range(len(data)):
                i = 0
                if (data[i]["Id"] == (n + 1)):
                    data.pop(i)
                    n = n + 1
        writeJson(data)
        json_file.close()
        
clearJson() ## To clear objects so we can update

with open("./web/resources/indeedJobs.json", "r") as json_file: ## Read in data and append to list
    data = json.load(json_file)
    y = getJobs()
    for job in y:
        data.append(job)
    json_file.close()

writeJson(data) ## Dump list into json file


