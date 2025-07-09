# Playwright Template Builder From Scratch

This is a repository that builds a template for the Playwright framework from scratch

## Documents

See all documentation in https://playwright.dev/docs/intro

## Getting started

Follow the [official Playwright Getting Started Guide](https://playwright.dev/docs/intro) to get going with your first test and to become familiar with Playwright concepts. 
For the first time, you need to create the ".env" file and add the value to all fields (follow .env.example)
Next, you run:

- `npm install` to download all necessary packages

## Features

- Configure to reuse login state
- Support taking screenshots
- Record video for test case execution
- Support Web automation with support for Chromium
- Dynamic data handling using external JSON files
- Support running a bash file and many environments
- Generate HTML report

## Run tests

- Using a bash file
  `./run-test.sh "tag name"` to run all tests
- Using cmd
  `npm run "tag name"` to run all tests following the tag name
