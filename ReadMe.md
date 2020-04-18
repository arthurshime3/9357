# Food As Medicine Initiative Meal Planning Application
Team 9357 - Miguel de los Reyes, Arthur Shim, Kunal Patel, Akshay Karthik, Greg Varghese

In collaboration with Grady Memorial Hospital in Atlanta, Georgia

## Overview
Welcome to the Installation Guide for the Food As Medicine Initiative Meal Planning Application, which was created by a 
collaboration between Grady Memorial Hospital and Georgia Tech Computer Science Spring 2020 Senior Design Team 9357. This guide will show the software's release information and installation procedures. 

## Release Update - April 20, 2020
Version 1.0.1

### New Features
* New Software Releases
  * User can interact with the intuitive User Interface
  * User can register a new account using email address
    * User can log in with their email address
    * User can log out of the system
  * User can input person physiological data to create person, unique meal plans
    * User's data is stored in a secure database 
    * Database created with MongoDB
    * Spoonacular APIs are able to provide the system with meal data
  * Perfected an algorithms to create a curated meal plan based on user inputs
  * Created PDF export documents for meal plans and grocery list
    * Added checkboxes for user after each ingredient in grocery list
    * Exporting PDFs are now implemented and working
  
* Bug Fixes
  * Fixed PDF exports for meal ingredient list for the week
    * Updated formatting layouts of PDF documents
    * Fixed exporting issues 
  * Fixed PDF export for weekly meal plans
    * Updated layout 
    * Fixed exporting issues
  * Updated layout and picture placement of weekly meal planning page
  
* Known Bugs and Defects
  * Low Prioritity Functionality (Reach Goals)
    * User's location and available food sources not implemented
    * Data of user's cultural background not incorporatied into meal generator algorithm
    * Application is not configurable for research studies

## Install Guide
Follow the instructions below to install and run the Food As Medicine Initiative Meal Planner Web Application

### Pre-Requisites
Before installation, the following must be on your computer:
* One of the following Operating Systems on computer:
 * Windows 9 or newer
 * MacOS 10 or newer
* Stable internet connection through WiFi or Ethernet

### Third Party Software Requirements
* A web browser should be installed. 
 * Although the application can run on most web browsers, Google Chrome or Mozilla FireFox are highly recommended

### Download Instructions
Follow the following steps to have a successful installation. 

If probems occur, contact Customer Support at gregvarghese@gatech.edu

#### Step 1: Download Instructions
* Click the following link:
  *  https://github.com/arthurshime3/9357
 
* Clone the following Github repo
  * Click the green button on the top right called "Clone or download"
  * Copy the following link by either clicking the clipboard icon or highlighting with cursor and copying (MAC: cmd + C) (WINDOWS: ctrl + C)
 
  * Alternative: copy and paste quoted link --> "https://github.com/arthurshime3/9357"
 
* Open a new Terminal on computer 
  * MAC: Command + SPACE, type "Terminal", press RETURN
  * WINDOWS: Windows Key + F, type "Terminal", then press ENTER

#### Step 2: Application Build

   1. In terminal input the following:
   ```
   git clone https://github.com/arthurshime3/9357
   ```
   2. Now we need to cd into the 9357 terminal. This can be found by entering `ls` to see your current directory and `cd FILE-NAME` to enter into that folder/directory. 

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
     At this point, you default web browser will pop up. The web application will appear when completing steps 7 through 10.

   7. Press ENTER, then open a new terminal window.

   8. Repeat steps 2 and 3

   9. Once in the 9357 directory/folder, input the following:
   ```
   cd backend
   ```
   10. Repeat steps 5 and 6

   11. Web application should be up and running on their default web browser for user to interact with 

#### Step 3: Application built and Run in Default brower

Once Step 2 is completing and running the following should appear in your default browser like the image below. 

You and any user can then interact with the application. 

![Screen Shot 2020-04-18 at 7 02 42 PM](https://user-images.githubusercontent.com/46109868/79673414-82129980-81a7-11ea-8479-36583323bf01.png)

  
