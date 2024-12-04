# Project Title

Investment Tracker

# Introduction

We designed a platform for Customer’s wealth management and investments in stocks as well as educate the customers regarding ESG  (Environmental Social and Governance) regarding stocks. Customers can use the app to get a view of all the current stocks and values. Apart from this, they can also build multiple portfolios with different agendas consisting of multiple  stocks. Depending on their emphasis, customers can create portfolios such as “community investing,” “ethical investing,” “green investing,” “impact investing,” “mission-related investing,” “responsible investing,” “socially responsible investing,” and “values-based investing,” among others by viewing those stocks along with ESG ratings on our watchlist. The app can be further extended to manage personal wealth.
Portfolio watcher is an application where users can view the up-to-date live prices of every stock. Users will also be able to see his/her transaction history.

# Requirements

Java 17.0.8
Maven 3.9.4
MySQL 8.1.0
IntelliJ IDE

# Testing

The Investment Tracker Application uses Maven for unit testing. To run the tests, simply right-click on the test directory in the project explorer and select "Run All Tests”.

# Build and Run

To build the Investment Tracker App, follow these steps:

Clone the repository to your local machine

Open IntelliJ and select "Import Project"

Select the directory where the repository was cloned and click "OK"

Select "Import project from external model" and choose "Maven"

Click "Next" and then "Finish"

The project should now be imported into IntelliJ and you can build the code by clicking "Build" > "Build Project"

To run the Investment Tracker Application , right-click on the Application class in the project explorer and select “Run"

# Configuration

The Investment Tracker Application Backend requires a configuration file to specify the connection details for the MySQL database. This file should be named application.properties and should be placed in the src/main/resources directory. The file should contain the following properties:


server.port=8000
#db configuration
spring.datasource.url=jdbc:mysql://localhost:3306/${DB_DUMMY}
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
jwt.secret=yourSecretKey
jwt.expirationMs=3600000

Add environment variable specifications for your system for the variables: DB_DUMMY, DB_USERNAME, DB_PASSWORD.


# Disclaimer

This readme file provides general information about the Investment Tracker Application and is not intended as a substitute for professional technical advice.
