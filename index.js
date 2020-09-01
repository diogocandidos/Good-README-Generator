// Declaring variables
const inquirer = require("inquirer");
const fs = require('fs');
const util = require('util');

const writeFileAsync= util.promisify(fs.writeFile);

// Running function with user information
function userInfo () {
    return inquirer.prompt([
    {
        type: "input",
        name: "title",
        message: "What is the name of your project title?"
    },
    {
        type: "input",
        name: "author",
        message: "What is your full name?"
    },
    {
        type: "input",
        name: "username",
        message: "What is your github user name?"
    },
    {
        type: "input",
        name: "email",
        message: "What is your contact email?"
    },
    {
        type: "input",
        name: "description",
        message: "Provide more information about the project"
    },
    {
        type: "input",
        name: "installation",
        message: "Describe which steps are required to install the project"
    },
    {
        type: "input",
        name: "usage",
        message: "Provide the project usage"
    },
    {
        type: "input",
        name: "licence",
        message: "Provide the licence name"
    },
    {
        type: "input",
        name: "contributor",
        message: "Enter git hub user names of the contributors"
    },
    {
        type: "input",
        name: "test",
        message: "Please provide tests examples how to run the project"
    },
]);
}

// function to generate markdown for README
function generateMarkdown(data) {
    return `
  ## ${data.title}
  ## ${data.description}
  
  
  ## Table of contents
/n* [Description](#Description)
/n* [Installation](#Installation)
/n* [Usage](#Usage)
/n* [Licence](#Licence)
/n* [Contributors](#Contributors)
/n* [Test](#Test)
/n* [GitHub Info](#GitHub) 

  ## Installation
  ${data.installation}
  
  ## Usage
  ${data.usage}
  
  ## Licence
  ${data.licence}
  
  ## Contributors
  ${data.contributor}
  
  ## Test
  ${data.test}
  
  ## GitHub
  [User name] ${data.author}
  [GitHub Profile](https://github.com/${data.username})
  [User email] ${data.email}.
  `;
  }

// Running Async function 

async function init() {
    try {
      const data = await userInfo();
      const readMeFile = generateMarkdown(data);

      await writeFileAsync("README.md",readMeFile);
      console.log("File Created!")
    }
    catch(error) {
      console.log(error);
    }
  }

init();

