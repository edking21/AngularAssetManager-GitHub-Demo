# Angular Asset Manager Github Demo

An in-memory web api for Angular demos and tests that emulates CRUD operations over a RESTy API.

Optionally intercepts Angular `Http` and `HttpClient` requests that would otherwise go to the remote server and redirects them to an in-memory data store that you control.

Uses a reactive approach by issuing the Common Pattern with an Async Pipe to populate the main grid of assets.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## MEAN Stack Project

* MEAN stack project is a (MongoDB, Express.js, AngularJS (or Angular), and Node.js) open-source JavaScript software stack for building dynamic web sites and web applications.  

* MEAN Stack Project creates RESTful APIs with Express js Routes in a backend Node server.

* MEAN Stack Project adds assets using MEAN Stack REST APIs with Angular Material

* MEAN Stack Project uses Angular Reactive form to assign asset to the database.

## MongoDB Atlas

* Joins the Student document with the Asset document.  One asset can be owned by many students.

## CORS

* Uses Cross Origin resource sharing (CORS) by setting up a proxy between the UI running on port 4200 and the Mongo Atlas database server running on port 3002.

## Animations

* Shows transition between any two states

* Slides element horizontally

## Async Pipe

* Subscribes to the observable when the component is initialized.
* Runs change detection and modifies the UI as needed.
* Unsubscribes when the component is destroyed.
* Allows change detection feature.  UI is automatically updated with changed data.

## In Memory Data Store

* During early development optionally calls the In Memory Data Store when the MongoDB Atlas NOSQL database using a RESTFUL api is not available.
* Changes between In Memory and REST with a single npm command.

```ts
  // develop the In Memory or RESTfull backend data provider.
  npm run inMemory           // Uses In Memory Data Store
  npm run mondoDb             // Uses proxy to MongoDB Atlas Database to resolve CORS requirement
```

## Routing

* Sets up primary, secondary and child routes.
* Handles optional popup messages and Page Not Found.
* Routes to separate Angular feature modules.  This will allow for lazy loading feature modules.
* Passes small amounts of data with route parameters.
* Prefetchs data before routing to a component using Route Resolvers.
* Displays routes withing routes using child routes
* Animates routing with a full page slider.
* Route guards prevent the user from losing data when clicking away from a page.

## Lazy Loading

* Splits the application into multiple bundles.
* On startup, preload only what is needed.
* Backload some feature modules in the background.
* Asynchronous loads some modules on startup.

## Lazy Loading Authorization

* Loading will not occur for non authorized users.
* Checks criteria before loading an asynchronous route.

## Preloading (Eager Lasy Loading)

* Preload features that we know the user will be loading
* Preload strategies

```ts
  All - all features are preloaded
  None - no features are preloaded
  Custom - select features are preloaded
    Preload more commonly used features
    Lazy load less commonly used features
```

## Use cases

* Error handling used with Async Pipe uses Catch and Replace. User will see mock data when the input data is invalid.
* Change detection will notify when user changes the grid contents.
* Demo apps that need to simulate CRUD data persistence operations without a real server.
You won't have to build and start a test server.
* Simulate operations against data collections that aren't yet implemented on your dev/test server.
You can pass requests thru to the dev/test server for collections that are supported.
* Write unit test apps that read and write data.
Avoid the hassle of intercepting multiple http calls and manufacturing sequences of responses.
The in-memory data store resets for each test so there is no cross-test data pollution.
* End-to-end tests. If you can toggle the app into test mode
using the in-memory web api, you won't disturb the real database.
This can be especially useful for CI (continuous integration) builds.
