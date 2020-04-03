# Angular grid-demo-github

An in-memory web api for Angular demos and tests that emulates CRUD operations over a RESTy API.

It intercepts Angular `Http` and `HttpClient` requests that would otherwise go to the remote server and redirects them to an in-memory data store that you control.

Uses a reactive approach by issuing the Common Pattern with an Async Pipe to populate the main grid of assets.

## Async Pipe

* Subscribes to the observable when the component is initialized.

* Runs change detection and modifies the UI as needed.

* Unsubscribes when the component is destroyed.

* Allows change detection feature.  UI is automatically updated with changed data.

## In Memory Data Store

* Optionally calls the in Memory DB when the RESTfull API is not available.

* Change between In Memory and REST with a single npm command.
```ts
  // develop the In Memory or REST backend data provider.
  npm run local           // Uses REST and SQL Server for backend data
  npm run mem             // Uses In Memory Database
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

