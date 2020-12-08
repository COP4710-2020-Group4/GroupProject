dependencies:
command line:
    npm init
    
    
    npm i express mysql2 bcrypt
    npm i -D nodemon
    
    also create in db folder a creds.json file, inside type:
        {
            "user": "",
            "pass": "",
            "db_name": "db_project",
            "host": "localhost",
            "port": "3306"
        }
        and type your mysql user and password.

to run:
    npm run dev
    
  
