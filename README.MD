## THANK YOU FOR GIVING A VERY INTERESTING CHALLENGES QUIZ

- Dear reviewer, I would like to inform you that I have tried my best to complete the quiz.
- The quiz very interesting to me.
  • For SECTION 1 - Test Case Design, it is very interesting and I have to applied multiple types of testing techniques to complete it with highest quality and test coverage.
  • For SECTION 2 - Test Automation, I have apply the best test framework with a very effective assertion library for API testing to create a test suite quick and effective as expected
- Please take a look at the explanation in line of each section below for more detail

## SECTION 1 - Test Case Design

- Based on the requirement, we have multiple input combinations to have the final decision for applying appropriate promotions so I have applied a black-box test design technique called "decision table".
- Beside that, we have conditions include a period time so, I applied the "equivalence partitioning testing technique" to make sure the test coverage as much as possible and we can reduce the number of test cases to save testing effort.

- Please take a look at aCommerce_TestCase.xlsx file in path: resource\aCommerce_TestCase.xlsx on current project for more detail. The aCommerce_TestCase filde includes:

  • "TestDesign" and "TC-Detail-PRO1121" sheet contains the test design and test case detail for challange "1. Create a test case"
  • "Implementation estimation" sheet contains result for challange "2.Estimation resource and time to testing."

## SECTION 2 - Test Automation

#### 2.1 Automation Test RESTful API

# About the tools and framework:

- Pre-requisites
  • Node.js - https://nodejs.org/en/download/
  • Command line tools (like Terminal for Mac or Command for Windows).
  • Test framework - Mocha BDD - https://mochajs.org/
  • HTTP Request Library: superTest - https://www.npmjs.com/package/supertest
  • Assertion Library: Chai JS Assertions - https://www.chaijs.com/
  • Programing language - Javascript.

- Setup Mocha BDD steps:
  • Clone the latest source code from gitHub into the local machine.
  • Install all dependencies on package.json by node with command: npm install
  • Once all packages are installed successfully, open the package.json file and follow the commands on scripts category to run the appropriate test script. (e.g. npm run test)

- Some Notes for set up steps:
  • Please install Nodejs latest version

# About this project, The ideas is to follow the The tripel A(Arrange, Act, Assert) pattern.

- Each test case contains 3 main points:
  • Arrange - create test data
  • Action - Call API
  • Assert - Validate the return result
- Test implementation idea:
  • All IDs are initialized at "before hook" and all test case in current test suite just use data via defined variables. In case need to change test data, the script owener can change them directly in "before hook"
  • The Tokens are stored in .env file, it makes test script more secure. The script owener can change tokens directly in ".env" file

# About Create Test Script loop to find "SKU0005"

- Please take a look at solution on test\sameple-data.js file.
- To trigger the script please follow command: node test\sameple-data.js

  Have a great day!!!!!
