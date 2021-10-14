const dbMigrations = require('../config/db/migrations');

module.exports = function(pool) {
    (function setupMigrationsTableIfNotExists() { //This function will run automatically as soon as this module is imported
        pool.query("SELECT * FROM information_schema.tables WHERE table_schema = 'studentnet' AND table_name = 'dbmigrations' LIMIT 1", (err, res) => { //See if we've setup the dbmigrations table yet
            if(err) throw err;
            if(res.length == 0) { //if not, create it
                console.log("Creating dbmigrations table...");
                migrateDbStep(0, null); //Step 0 should ALWAYS be the step to setup this table
            } else {
                console.log("Finding possible dbmigrations...");
                let alreadyRunScripts = []; 
                pool.query("SELECT * FROM dbmigrations", (err2, scripts) => {
                    if(err2) throw err2;
                    if(scripts.length > 0) {
                        scripts.forEach(script => alreadyRunScripts.push(script.scriptName)); //We loop through all the scripts listed in the database. We don't want to run those again!
                        migrateDbStep(1, alreadyRunScripts); //Start at step 1, and skip all steps we've already done
                    } else {
                        migrateDbStep(1, null); //We haven't completed any migrations yet, do them all
                    }
                });
            }
        });
    })();
    
    function migrateDbStep(index, alreadyRunScripts) {
        let statement = dbMigrations[index];
        if(alreadyRunScripts && alreadyRunScripts.includes(statement.scriptName)) { //if this script has already been run, try the next one if it exists
            if(index + 1 <= dbMigrations.length - 1) { //bounds check
                migrateDbStep(index++, alreadyRunScripts);
            } else {
                console.log("Done migrations!");
            }
        } else { //Either the alreadyRunScripts array is empty or we haven't run this script yet
            console.log("Performing step " + index + ": [" + statement.sql + "]");
            if(statement.sql) { //Make sure the sql is defined
                pool.query(statement.sql, (err, res) => { //Run the script
                    if(err) throw err;
                    logScript(statement); //Insert record of this script running back into dbmigrations table
                    if(index + 1 <= dbMigrations.length - 1) {
                        migrateDbStep(index++);
                    } else {
                        console.log("Done migrations!");
                    }
                })
            }
        }
        
    }
    
    function logScript(script) {
        let sql = "INSERT INTO dbmigrations (scriptName, scriptDate) VALUES (?, ?)";
        pool.query(sql, [script.scriptName, script.scriptDate], (err, res) => {
            if(err) throw err;
            if(res.affectedRows > 0) {
                console.log("Successfully ran " + script.scriptName);
            }
        })
    }
}