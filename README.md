# Model API Test Assignment-2

To create a test pipeline for the API described in the assignment,follow these steps to ensure complete coverage of the API endpoints, handle validation errors, gather failure information, visualize test results, and run the pipeline inside Docker. Here’s a detailed plan:

## 1. Prerequisites

a. Docker installed on your machine.

b. Running instance of target application.

## 2. Steps to execute the tests.
a. Docker installed on your machine.
```bash:
git clone <git repo link>
```
b. Build the docker image.
```bash
docker build -t cypress_test .
```
c. Execute the tests.
```bash
docker run --rm -it --network recruiting-qa-challenge_default -v $(pwd)/reports:/app/cypress/generate-reports cypress_test
```

## Usage
Post-last step reports folder will be created in the working directory containing an HTML file.

## Pipeline Structure
a. Test Scripts

1. API Tests: Create Cypress test scripts to cover all endpoints (add, append, delete, inference).
2. Validation Tests: Include tests for missing validation and other edge cases.
3. Error Handling: Ensure that failures provide clear and detailed information.

b. CI/CD Configuration
1. Docker: Use a Docker container to run tests to ensure a consistent environment.

## Advantages
1. Testing Framework: Used Cypress for end-to-end testing.Implicit waiting,real-time feedback,can be used for GUI in a single suite, and many more benefits come with it.
2. Test Runner: As Docker in-place consistency and step will become easier.
3. BDD Cucumber: Even the non-technical stakeholders can better understand functional features and results.Also, helps in early bug detection with clear understanding.

## Disadvantages
1. BDD scenarios can lead to duplication of steps or redundant tests, increasing the maintenance burden.
2. Cypress does not natively support mobile browser testing, which can be a significant limitation for teams needing to test responsive or mobile-first applications.
3. While Docker’s isolation is an advantage, it can also make debugging more challenging. Accessing logs, files, or state inside a container can require additional steps or tools# model-api-test
