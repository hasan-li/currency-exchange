## App Tree
```
src/
├── App.css
├── App.js
├── App.test.js
├── const
│   └── rates.js
├── index.css
├── index.js
├── serviceWorker.js
├── services
│   └── rates.js
└── setupTests.js
``` 
## Running app
```
yarn install
```
In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />

## Tech stack
- The application uses **react-cookie** to keep state if there are problems with connection.
- App uses **axios** in order to make request to https://exchangeratesapi.io/ endpoint.
- Main logic of the application is inside `src/App.js`
- App.js is functional component, using hooks
- For displaying currency valuation changes `recharts` library was used

## Problems
There was problem with fixer.io. Even though it says that Historical Rates Endpoint is part of free plan, the endpoint doesn't always return values:

`http://data.fixer.io/api/2015-03-26?access_key=ac60e515353cc5dfc22ed7f3f8080dc4&base=SEK&symbols=USD,CAD,EUR`

```
{
    "success": false,
    "error": {
        "code": 105,
        "type": "base_currency_access_restricted"
    }
}
```
Switched to https://exchangeratesapi.io/ instead
