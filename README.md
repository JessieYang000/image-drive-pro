# image-drive-pro
A full stack application for uploading and saving images on cloud

Instructions on how to run the application locally
1. Set up database:
   - Download MySQL Workbench

   - Add a MySQL connection and note the username and password

   - Run `mysql -u root -p` in a terminal to start the server, `root` is the user name of the MySQL connection, input the password noted in the previous step

   - Create a database with `CREATE DATABASE your_database_name;`

   - Create a connection between the backend server and the database: in file /image-drive-pro/backend/server.js, modify the following code using your database info:

   `const db = mysql.createPool({
    host: 'localhost',
    user: 'the user name of your database',
    password: 'the password of your database',
    database: 'the database you create',
    });`

2. Start the backend server
    - Navigate to the /image-drive-pro/backend/server.js file, run `nodemon server.js`
    - Install required libraries and run the command again
3. Start the frontend
    - Navigate to the /image-drive-pro/frontend/App.js, run `npm start`
    - Install required libraries and run the command again

4. Now you are supposed to be able to navigate the sign-in/sign-up/images page, and be able to do corresponding operation