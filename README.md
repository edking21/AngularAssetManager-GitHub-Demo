# Angular grid-demo-github

An in-memory web api for Angular demos and tests that emulates CRUD operations over a RESTy API.

It intercepts Angular `Http` and `HttpClient` requests that would otherwise go to the remote server and redirects them to an in-memory data store that you control.

Uses a reactive approach by issuing the Common Pattern with an Async Pipe to populate the main grid of assets.

## MEAN

* MEAN is a (MongoDB, Express.js, AngularJS (or Angular), and Node.js) open-source JavaScript software stack for building dynamic web sites and web applications.  

* MEAN is used to allow CRUD access to test data in a MongoDB database.

## CORS

* Cross Origin resource sharing (CORS) is resolved by setting up a proxy between the UI running on port 4200 and the database server running on port 3001.

## Animations

* Shows transition between any two states

* Slides element horizontally

## Async Pipe

* Subscribes to the observable when the component is initialized.
* Runs change detection and modifies the UI as needed.
* Unsubscribes when the component is destroyed.
* Allows change detection feature.  UI is automatically updated with changed data.

## In Memory Data Store

* During early development optionally calls the In Memory Data Store when the MongoDB Atlas RESTfull API is not available.
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

* Split the application into multiple bundles.
* On startup, preload only what is needed.
* Backload some feature modules in the background.
* Asynchronous load some modules on startup.

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

