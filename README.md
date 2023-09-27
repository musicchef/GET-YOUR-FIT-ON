# Project #2: GET YOUR FIT ON - Fitness App

## Description


## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Deployment](#deployment)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Assets](#assets)


## Features

User authentication and registration
Exercise logging
Nutrition logging
Calorie counting and calculation
Progress tracking
Packages

The Fitness App uses the following Python packages:

bcrypt: For password hashing
cloudinary: For image uploading and storage
connect-session-sequelize: For user session management
dayjs: For date and time manipulation
dotenv: For managing environment variables
express: For web framework
express-handlebars: For template engine
express-session: For user session management
multer: For file uploading
mysql2: For MySQL database connection
sequelize: For object-relational mapping (ORM)

## Installation

To install the Fitness App, you will need to have the following installed:

Python 3.6+
MySQL 5.7+
Node.js 16+
NPM 6+
Once you have the required dependencies installed, you can clone the Fitness App repository and install the dependencies:

git clone https://github.com/your-username/fitness-app.git
cd fitness-app
pip install -r requirements.txt
npm install
Next, you will need to create a .env file and add your database connection information:

DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USERNAME=root
DATABASE_PASSWORD=password
DATABASE_NAME=fitness_app
Finally, you can start the development server and access the app at http://localhost:3000:

npm start

## Deployment

The Fitness App is deployed on Heroku. To deploy the app to Heroku, you will need to create a Heroku account and install the Heroku CLI. Once you have the Heroku CLI installed, you can deploy the app to Heroku by running the following commands:

git push heroku master
This will deploy the app to Heroku and make it accessible at the URL that Heroku assigns to it.

## Usage

To use the Fitness App, you must first create an account. Once you have created an account, you can log in and start logging your exercise and nutrition.

To log your exercise, go to the "Exercise" page and click the "Add Exercise" button. You can then enter the details of your exercise, such as the type of exercise, the duration, and the number of calories burned.

To log your nutrition, go to the "Nutrition" page and click the "Add Food" button. You can then enter the details of the food you ate, such as the name of the food, the serving size, and the calories.

The Fitness App will automatically calculate your calorie intake and calorie burn for each day. You can view your progress by going to the "Progress" page.

## Contributing

Cloning the repo is welcome. Do not push new code into the repo without creating a pull requests.

## License

N/A

## Support

If you have any questions or problems with the Fitness App, please create an issue on the GitHub repository: https://github.com/topics/fitness-app.

## Additional Information

The Fitness App is still under development, but it is already a usable and powerful tool for tracking your fitness progress. We are constantly adding new features and improvements, so please stay tuned for updates!

## Assets

Deployed live application https://get-your-fit-on-92db4f8ac46c.herokuapp.com/

Git Repository https://github.com/musicchef/fitness-application

![Screenshot of website](<images/Screenshot 2023-08-01 191417.png>)