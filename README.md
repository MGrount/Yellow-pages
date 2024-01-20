# Yellow Pages

A simple Yellow Pages application with search functionality.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Assumptions](#assumptions)
- [Key Features](#key-features)
- [Points to Improve](#points-to-improve)
- [Acknowledgments](#acknowledgments)

## Getting Started

To run the project, Docker and Docker Compose are required. Follow the steps below:

### Prerequisites

- [Docker](https://www.docker.com/)
- [Postman](https://www.postman.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/MGrount/Yellow-pages.git
   cd Yellow-pages


2. Run Docker Compose:
    ```bash
    docker-compose up

### Usage

* Access the application by opening the HTML file located in the frontend folder.

* Or use postman to test the single API Http POST (http://localhost:3000/api/parseUserInput) with the following object:
    ```bash
    {
    "userInput": "Inster query HERE",
    "limit": 10,
    "offset": 0
    }

* the "limit" and "offset" are responsible for batching the query, the program set to 10 as a default.

* To run the unit tests use:
    ```bash
    npm test

### Assumptions

During the development of this project, the following assumptions were made:

* Contacts can be searched by name, phone number, and birthday, and any combination of these criteria. However, searches based on address and picture are not supported.
* Limited UI enhancements were made due to time constraints.
* Indexes were added to init-data.sql to optimize queries.
* The strategy design pattern and factory were employed for enhanced modularity.
* A rules class allows easy switching and addition of search rules/filters.
* A single unit test was implemented for parsing to save time.

### Key Features

* Database: PostgreSQL is used for data storage.
* Containerization: Docker is utilized to create a container for the Node.js server and import contacts.json into the database.

### Points to Improve

Areas for improvement include:

* Enhancing the user interface for a better user experience.
* Exploring more efficient SQL solutions, such as sharding and improved indexes, to optimize querying performance.
* Making more queries like with combiation of an address
* Parsing the file without script for modularity
* Loading changed state without restarting the application
* Parsing the file once by checking if it was changed

This project is licensed under the [Rapid7] - see the LICENSE.md file for details.

### Acknowledgments

The project makes use of the following technologies and patterns:

PostgreSQL for database management.
Docker for containerization.
Strategy design pattern and factory for modularity.
Rules class for flexible switching and addition of search rules.
Include any additional acknowledgments or references as needed.