# Road Runner Resource Hub Frontend

Welcome to the Road Runner Resource Hub Project. The purpose of this project is to be able to provide MSU Denver students with all the resources they actually need during their time here at MSU Denver. The official MSU Denver website is cluttered, filled with too many links, overwhelming and unsearchable. The RoadRunner Resource Hub allows us to condense down this information into a more readable and digestible format.

## Running Product (to future server admin)

Bellow are listed instructions, resources, and details for accessing, deploying and maintaining the code base for the Road Runner Resource Hub

### Necessary Resources

- Github account (https://github.com/)
- Visual Studio Code (https://code.visualstudio.com/)
- Node Package Manager(https://www.npmjs.com/)
- Server For Deployment(or remote server)

### Steps for Deployment

1. Locate project from the github website (https://github.com/BraedonB98/CS4610-RoadRunnerResourceHub.git)
2. Clone project for local repository
   - open terminal in local directory
   - run "git clone https://github.com/BraedonB98/CS4610-RoadRunnerResourceHubFrontend.git"
   - cd CS46100-RoadRunnerResourceHub
   - cd roadrunner-resource-hub-frontend
3. Build project(creates necessary files in a format for deployment)
   - install dependencies
     - run "npm install"
   - install server npm package
     - run "npm install -g serve"
   - run "npm run build"
     - This will generate a build folder
   - on server run "serve -s build -l <portNumber>
4. For Firebase Deployment(https://firebase.google.com/docs/hosting/quickstart)
   - install firebase CLI(https://firebase.google.com/docs/cli#install_the_firebase_cli)
   - initialize project
     - from the frontend folder run "firebase init hosting" (only for first time deployment)
     - run "firebase deploy" and follow on screen instructions

## Developmental Roadmap
