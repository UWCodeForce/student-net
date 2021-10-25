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
    },
    {
        scriptName: "create-roles-table",
        scriptDate: "2021-10-15",
        sql: "CREATE TABLE roles(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, roleName VARCHAR(32) NOT NULL);",
    },
    {
        scriptName: "create-users-table",
        scriptDate: "2021-10-15",
        sql: "CREATE TABLE users(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, email VARCHAR(64) NOT NULL, password CHAR(60) NOT NULL, createTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, role INT, active BIT, FOREIGN KEY (role) REFERENCES roles(id) ON DELETE RESTRICT);"
    },
    {
        scriptName: "create-profile-table",
        scriptDate: "2021-10-15",
        sql: "CREATE TABLE profile(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, firstName VARCHAR(32) NOT NULL, lastName VARCHAR(32) NOT NULL, major VARCHAR(32), userId INT, FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE);"
    },
    {
        scriptName: "add-effdate-indeedjobs",
        scriptDate: "2021-10-15",
        sql: "ALTER TABLE indeedjobs ADD COLUMN effectiveDate DATETIME DEFAULT CURRENT_TIMESTAMP, ADD COLUMN expirationDate DATETIME DEFAULT '2999-12-31';"
    },
    {
        scriptName: "create-sessions-table",
        scriptDate: "2021-10-18",
        sql: "CREATE TABLE sessions(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, session_id VARCHAR(128) NOT NULL, session_expiry INT NOT NULL, session_data MEDIUMTEXT)"
    }
]

module.exports = migrations;