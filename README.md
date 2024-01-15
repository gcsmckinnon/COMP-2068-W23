# COMP-2068-W23
In-class Project

## Client-side Scripting Versus Server-side Scripting
Client-side scripting and server-side scripting are two distinct approaches in web development:

**Client-side Scripting:** In client-side scripting, code is executed on the user's device (usually in a web browser). Common languages for client-side scripting include JavaScript, HTML, and CSS. It allows for dynamic interactions and user interface enhancements directly in the browser without requiring server communication for every action. However, it has limitations in terms of accessing server resources and databases directly due to security concerns.

**Server-side Scripting:** Server-side scripting involves running code on the web server to generate dynamic content or process requests from clients. Popular server-side scripting languages include Python, Ruby, PHP, and Node.js. Server-side scripts can access databases, perform complex computations, and manage user sessions, making them essential for server operations.

## NodeJS and ExpressJS
Node.js is powerful because it allows JavaScript to be used for server-side scripting. It's built on the V8 JavaScript engine, which is known for its speed and efficiency. This means developers can use the same language (JavaScript) on both the client and server sides, resulting in a more streamlined development process and sharing of code and expertise between front-end and back-end developers.

Node.js, when combined with Express.js, becomes an excellent choice for building a RESTful API using the Model-View-Controller (MVC) architecture:

**Node.js:** Provides a non-blocking, event-driven architecture, making it highly scalable and efficient for handling a large number of concurrent connections. It's well-suited for building APIs that need to handle real-time communication or heavy I/O operations.

**Express.js:** A minimal and flexible Node.js web application framework that simplifies routing, middleware handling, and API development. It encourages the use of RESTful routing patterns, making it a natural choice for building RESTful APIs. Express.js also supports the separation of concerns through middleware, making it easy to implement the MVC architecture.

Together, Node.js and Express.js offer a powerful and efficient platform for building RESTful APIs with a clean and organized MVC structure, making them a popular choice among developers.

## ReSTful API
A RESTful API, or Representational State Transfer Application Programming Interface, is a web service design approach that leverages the semantic meaning of HTTP verbs (GET, POST, PUT, DELETE) and HTTP status codes to interact with resources. It emphasizes using the right HTTP verb for each action and responding with appropriate HTTP status codes to convey the outcome of the request.

For example, when you want to retrieve data from a resource, you use the HTTP GET method, which aligns with the semantic meaning of "getting" information. When you create a new resource, you use POST to "post" data to the server. If a resource is updated, PUT is used to "put" the updated data in place, and DELETE is used to "delete" a resource.

HTTP status codes, such as 200 for success, 201 for resource creation, 204 for no content, and various error codes like 404 for not found or 500 for internal server error, provide clear and standardized communication about the outcome of each API request. This semantic approach simplifies API development, enhances understanding, and ensures consistency in how clients and servers interact over the web.

## Test Driven Development
Test-Driven Development (TDD) is a crucial practice in Node.js development that offers a systematic and efficient approach to building robust and reliable applications. In TDD, developers write tests for specific functionalities before implementing the corresponding code. This process ensures that the desired behavior is well-defined and can be tested for correctness. In the context of Node.js, where asynchronous and event-driven programming is prevalent, TDD provides a safety net to catch unexpected errors early in the development cycle. By writing tests first, developers can validate their assumptions, reduce debugging time, and enhance code quality, leading to more maintainable and scalable Node.js applications.

Moreover, TDD promotes a modular and decoupled code structure, which aligns well with Node.js's design philosophy. Node.js applications often involve multiple modules and dependencies, making it essential to have well-isolated and independently testable components. TDD encourages developers to create functions and modules that are self-contained and easily testable, resulting in code that is easier to maintain and extend. Additionally, the continuous feedback loop of writing tests, implementing code, and refactoring ensures that the application remains stable and adaptable as it evolves. Overall, Test-Driven Development is a vital practice in Node.js development, offering benefits such as improved code quality, faster development cycles, and greater confidence in the reliability of applications.

## Our Application
Our Node.js application is built to create a simple web API using the Express.js framework. The architecture is structured to follow best practices and maintainability.

**index.js:** This file is the entry point of our application. It starts an Express server that listens on a specified port.

**app.js:** This is where the core of our application resides. It initializes Express, sets up the view engine (EJS), serves static assets, handles JSON and URL-encoded requests, and registers the routes as middleware. It also includes an error handler.

**routes/PageRoutes.js:** This file defines our basic root routes, such as the home page and insult page we've created. If/when we add an about, or contact, page, they will also live within this routes file. Route files will be separated based on their purpose.

**controllers/PagesController.js:** This file contains the controller actions that handle the logic for our root routes. For example, the "home" action renders an HTML page, and the "insult" action fetches an insult from an external API and renders it in an HTML page. It also handles errors by setting appropriate HTTP status codes and passing errors to the error handler. As we build our application we will have many controller files, each one dedicated to a resource or concern.

**tests/routes/PageRoutes.test.js:** This is a test suite for testing the routes defined in PageRoutes.js. It uses Supertest to simulate HTTP requests to our Express application and checks if the responses match the expected status codes.

**tests/controllers/PagesController.test.js:** This test suite focuses on testing the controller actions in PagesController.js. It uses Jest to mock external API requests and tests both successful scenarios and error handling.

This architecture follows a clean separation of concerns, with routes, controllers, and tests organized for maintainability and scalability. It ensures that our application serves HTML pages and insults efficiently while handling errors gracefully.

**package.json:** The package.json file serves as the configuration and metadata file for a Node.js project. In this specific example, it defines a project named "in-class-project" with version "1.0.0" and a description highlighting its purpose as a demonstration of multi-tiered application development. The file specifies the entry point as "index.js" and indicates that the project uses ES Modules ("type": "module"). It includes scripts for running tests and starting the development server, along with repository information, author details, and licensing information. Additionally, the file lists project dependencies such as Express, EJS, and dotenv for runtime use, and devDependencies like ESLint, Jest, Nodemon, and Supertest for development and testing purposes. This package.json file provides essential metadata and configurations for managing and running the project.