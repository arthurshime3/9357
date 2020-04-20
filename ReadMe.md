# Food As Medicine Initiative Meal Planning Application
Team 9357 - Miguel de los Reyes, Arthur Shim, Kunal Patel, Akshay Karthik, Greg Varghese

In collaboration with Grady Memorial Hospital in Atlanta, Georgia

## Overview
Welcome to the Installation Guide for the Food As Medicine Initiative Meal Planning Application, which was created by a 
collaboration between Grady Memorial Hospital and Georgia Tech Computer Science 2019-2020 Junior Design Team 9357. This guide will show the software's release information and installation procedure. 

## Release Update - April 20, 2020
Version 1.0.1

### New Features
* New Software Releases
  * User can interact with the intuitive user interface
  * User can register a new account using email address
    * User can log in with their email address
    * User can log out of the system
  * User can input personal physiological data to create personal, unique meal plans
    * User's data is never stored
    * Meals from the Spoonacular API are cached in the database and used to generate meal plans
      * Future use would require further permissions from Spoonacular
  * Improved linear optimization model used to create a curated meal plan based on user inputs
  * Created PDF export documents for meal plans and grocery list
    * Added checkboxes for user after each ingredient in grocery list
    * Exporting PDFs is now implemented and working
  
* Bug Fixes
  * Fixed PDF export for meal ingredient list for the week
    * Updated formatting layout
    * Fixed exporting bugs 
  * Fixed PDF export for weekly meal plans
    * Updated formatting layout
    * Fixed exporting bugs
  * Updated layout and picture placement of weekly meal planning page
  
* Known Bugs and Defects
  * Low Priority Functionality (Reach Goals)
    * User's location and available food sources not implemented
    * Data of user's cultural background not incorporated into meal generator algorithm
    * Application is not configurable for research studies
    * Application does not allow users to save meal plans as templates for future modification

## Install Guide
Follow the instructions below to install and run the Food As Medicine Initiative Meal Planner

### Pre-Requisites
* One of the following Operating Systems on computer: Windows 8 or newer or MacOS 10 or newer
* Stable internet connection through WiFi or Ethernet
Before installation, the following must be on your computer:
* Python 3
* pip
* Node.js
* npm
Database Requirements:
* MongoDB
  * Either a locally installed instance or a hosted instance


### Third Party Software Requirements
* A web browser should be installed.
 * Although the application can run on most web browsers, Google Chrome or Mozilla FireFox are recommended


### Download Instructions
Follow the following steps to have a successful installation. 

If probems occur, contact Customer Support at gregvarghese@gatech.edu

#### Step 1: Download Instructions
* Click the following link:
  *  https://github.com/arthurshime3/9357
 
* Clone the above Github repo by clicking the green "Clone or download" button
 
* Open a new Terminal on computer 
  * MAC: Command + SPACE, type "Terminal", press RETURN
  * WINDOWS: Windows Key + F, type "Terminal", then press ENTER

#### Step 2: Application Build

   1. In terminal input the following in your desired location for saving this application's files:
   ```
   git clone https://github.com/arthurshime3/9357
   ```
   Alternatively, the files can be saved in a preferred location by simply downloading the repository as a .zip file,
   without the need to use git commands.
   
   2. Next, cd into the 9357 directory. A directory is also known as a folder. This can be found by entering `ls` to see your current directory and `cd DIRECTORY-NAME` to enter into that directory. 

   3. The directory is named `9357`. Once located, then enter into that directory by inputting `cd 9357`

   4. Once in the 9357 directory/folder, input the following:
   ```
   cd frontend
   ```
   5. Press ENTER, then enter the following in the next line:
   ```
   npm install

   ```
   6. Once the `npm install` completes its download, enter the following in the next line:
   ```
   npm run dev
   ```
   
   At this point, your default web browser will pop up. The web application will appear when completing steps 7 through 10.

   7. Press ENTER, then open a new terminal window.

   8. Repeat steps 2 and 3

   9. Once in the 9357 directory/folder, input the following:
   ```
   cd backend
   ```
   10. Enter the following to download external dependencies:
   ```
   pip install -r "requirements.txt"
   ```
   11. Then nter the following in the next line:
   ```
   python app.py
   ```
   12.  Web application should be up and running on default web browser

#### Step 3: Application built and Run in Default browser

Once Step 2 is complete and running, you should see something like the image below in your browser. 

You and any user can then interact with the application.

![Screen Shot 2020-04-18 at 7 02 42 PM](https://user-images.githubusercontent.com/46109868/79673414-82129980-81a7-11ea-8479-36583323bf01.png)

#### Database Setup

The application will not be able to generate a proper meal plan without having data for dietary restrictions and for individual meal plan options. To gain access to these, one must use the two utility scripts we have created to parse this information.

To store the dietary restriction data, move to the backend/utils directory. From here, simply run
   ```
   python dietary_restriction_parser.py
   ```
This command will parse the "GT Nutrients" sheet into dietary restriction information, and upload it to the proper database for use in choosing dietary restrictions that apply to the user.

### Troubleshooting

The process for installing and running this application is fairly simple, so we do not anticipate errors to arise. However, here are some common problems that may occur, and easy-to-use solutions.

#### Unable to download repository

If you do not have git installed on your machine, try downloading the repository as a .zip file instead of cloning it. Unzipping it into a directory will allow you to go into the proper subdirectories and run the commands that cause the app to run in your browser.

#### App not appearing in browser

If running the frontend and backend does not open up the app in your browser, open the browser and go to the URL localhost:3000. The app's home page should be brought up upon visiting this URL.

#### Unable to run npm commands

If you are unable to use "npm run dev", ensure that some version of npm is installed on your machine with "npm -v". If no version has been installed, retry installing it (possibly with the "npm install -g" command) and then continue with other npm commands. Otherwise, we expect no difficulties with installing npm properly and advise that you ensure that no typing errors were made in moving to the correct directory and running the commands.
