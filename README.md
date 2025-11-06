# Blogging Web App Backend

## Table of Content

0.  Useful Links
1.  Overview
2.  Features
3.  Tech Stack
4.  Prerequisites
5.  Start Commands
6.  Folder Structure
7.  Swagger Documentation
8.  Troubleshooting

### Useful Links

### Overview

- This project contains the APIs for Blogging App. Created using Node and Express. Contains Open API spec using Swagger as well.

### Prerequisites

### Swagger Documentation

- A detailed API documentation is available [Here](http://localhost:3003/api-docs)

### Troubleshooting

- During the development I encountered these errors:

  1.  Unique userName problem in mongoose schema

  - Solution :
    1. Stop the server
    2. Open mongo shell and use your database.
    3. In users collection, delete the userName index.
    4. Restart the server
