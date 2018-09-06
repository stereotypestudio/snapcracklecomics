# Wecome to SnapCrackle Comics!
## A comically easy way to get your own comic site up and running.

**Things you'll need**
- A Google account
- Some neat comics
- About 10 minutes

## Installation and Setup

1. Go to [https://www.firebase.com](Google's Firebase) site and log-in with your Google account in the upper right corner. If you've never been here before, it might ask you some set up questions, like your first project name. It should then send you to the console, where you can choose your new project or create a new one. (If you're on the homepage, just click "Go to Console" in the upper right) If you didn't make an initial project on sign-in, make one now by hitting the big "+" sign. Give it a name and check the accept terms, and hit "Create Project"

2. On the top of this new page, click the circle button with the "</>" icon. This pop up has some code you'll need to copy. These are your personal, private Firebase codes. Copy the lines that look like this from that page:
```
var config = {
    apiKey: "ABCdEfGhIJKlmnoQRsTUvWxYZ",
    authDomain: "your-project-1234.firebaseapp.com",
    databaseURL: "https://your-project-1234.firebaseio.com",
    projectId: "your-project-1234",
    storageBucket: "your-project-1234.appspot.com",
    messagingSenderId: "1234567890"
  };
  ```
  Exit the window.

3. On the left sidebar, choose Authentication. Click the "Set up Sign-In Method" button in the middle. Then, click the Google row in the list of services. Hit the "Enable" swith on the upper right, then near the middle, select your email for the Project Support Email. Click Save.

4. Click the Database link on the left navbar. Click the "Create Database" and then select the "Test Mode" option. Click "Enable"

5. Download SnapCrackle Comics if you haven't already, unzip, open it, and go into the folder labled "src". In here, there's a file called "firebase.js" -- open this in a text editor. Now, replace the same lines of code that you copied from step 2. Save the document.

6. Open your terminal, and change to the directory where the SnapCrackle Folder is by typing `cd path/to/the/directory` (changing everything in "path/to/the/directory to your path, something like Username/Downloads), or simply type `cd ` (note the space afterwards) and then drag your SnapCrackle folder to the terminal window. 

7. Run the following commands -- some may take a while, and if they don't work the first time, try typing `sudo` in front of the command, and it will ask for your admin username and password 
- `npm -v` (If this does not result in a number like 6.0.1 or something similar, please go [https://nodejs.org/en/download/] (download NodeJS), install, and follow then rest of the commands below)
- `npm install -g firebase-cli`
- `npm run-script build`
- `firebase login` and then use your Google login information
- `firebase init` , use the down arrow key to highlight "hosting", hit spacebar, then enter. The next prompt should ask you to choose which Firebase project you want to use. You likely only have the one you made in step 1, but if you have more, arrow to the one you want and hit space, then enter. Then, it will ask you want directory you'd like, type `build` and hit enter. Finally, enter `y` and `n` to answer the next two questions. 
- `firebase deploy`, and after a successful deploy, you'll see your hosting URL -- you can go here and start setting up your admin user for your new site! 

## Admin User and Dashboard

Once your site is deployed, the first time you visit your hosting URL, it will redirect you to your Admin Registration page. Fill out the fields, add a few image files for your site header image and logo, and submit. 

Now you're in the dashboard -- you can log into this again in the future by going to `your-hosting-url/login`. Only your gmail account will work. Here, you can add comics, edit them, and update your header and logo images! 


