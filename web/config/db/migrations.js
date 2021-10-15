const migrations = [
    { 
        scriptName: "setup migrations table", //THIS MUST REMAIN FIRST
        scriptDate: "2021-10-14",
        sql: "CREATE TABLE dbmigrations(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, scriptName VARCHAR(32), scriptDate DATE);"
    },
    {
        scriptName: "create-indeed-table",
        scriptDate: "2021-10-14",
        sql: "CREATE TABLE indeedjobs( id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, title VARCHAR(32) NOT NULL, company VARCHAR(32) NOT NULL, location VARCHAR(64), jobDescription TEXT, salary VARCHAR(64), dateString VARCHAR(32));"
    }
]

module.exports = migrations;