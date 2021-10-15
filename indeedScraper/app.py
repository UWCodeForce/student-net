import requests
import json

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from bs4 import BeautifulSoup

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

def getJobInfo(soup):

    allJobs = []
    
    a = soup.find_all('a', class_ = ('tapItem', 'fs-unmask'))

    for jobs in a:
        title = jobs.find('span', title = True)
        company = jobs.find('span', class_ = ('companyName')).text
        location = jobs.find('div', class_ = ('companyLocation')).text
        description = jobs.find('div', class_ = ('job-snippet')).text
        salary = jobs.find('span', class_ = ('salary-snippet'))
        date = jobs.find('span', class_ = ('date')).text

        if (salary == None):
            hasSalary = None
        else:
            hasSalary = salary.text
        
        myJson = {
            'Title':title['title'],
            'Company':company,
            'Location':location,
            'Description':description,
            'Salary':hasSalary,
            'Date':date
        }

        allJobs.append(myJson)
        
    return allJobs

app = Flask(__name__)

""" STILL RESEARCHING HOW THIS WORKS

db = SQLAlchemy(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
db = SQLAlchemy(app)

class Job(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False)
    company = db.Column(db.String(80), nullable=True)
    location = db.Column(db.String(80), nullable=True)
    description = db.Column(db.String(240), nullable=True)
    salary = db.Column(db.String(80), nullable=True)
    datePosted = db.Column(db.String(80), nullable=True)

    def __repr__(self):
        return f"{self.title} - {self.company} - {self.location} - {self.description} - {self.salary} - {self.datePosted}" 

"""

@app.route('/')
def index():
    return 'Hello!'

@app.route('/jobs')
def getJobs():
    jobs = []
    for x in range(4):
        c = extract(x + 1)
        jobInfo = getJobInfo(c)
        toJson = json.dumps(jobInfo, indent=4, separators=(", ", ": "))
        jobs.append(toJson)
    return {'jobs': jobs}


