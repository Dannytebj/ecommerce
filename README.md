Ideabox is a simple application that allows users to create a pool of ideas and promote collaboration.
## Key Features of this Application
+ Users can Create Account
+ Users can Log in
+ Users can see all items when entering the website
+ Items are displayed properly based on the selected department and category
+ Users can search items through search box
+ Support paging if we have to many items
+ Users can see item details by selecting a specific item
+ Users can add items to their shopping carts
+ Users can register/login using website custom forms, or social login libraries
+ Users can checkout with 3rd party payment gateways: Paypal or Stripe. This requirement is mandatory, you must use the related API for the payment.
+ Users will get confirmations over emails about their orders


## Requirements
+ Node Enviroment 
+ Git 
+ Postman
+ Google Chrome

*N.B:* See package.json for project dependencies

## Local Installation Guide
* Ensure Node is installed
* clone the repo with the following command `git clone`
* Run `npm install` to install all the dependencies needed to run the application
* Setup database, see `.env-example`. 
* *TECHDEBT:* the size of the password field in `customer` table need to be above 60. `Varchar(100)`
* On your local machine Run `npm run start:dev` to start the server and visit `http://localhost:9000`

## Technologies
 * [ECMAScript 6](http://es6-features.org/): This is the newest version of JavsScript with new features such as arrow functions, spread and rest operators and many more.
 * [REACT](https://facebook.github.io/react/): REACT is a JavaScript framework developed by Facebook and it is used for developing web application. REACT is the 'VIEW' in the MVC architecture.
 * [REDUX](https://redux.js.org/): State management
 * [Babel:](https://babeljs.io/)  Babel is used to transpile es6 down to es5.
 * [Webpack:](https://webpack.github.io/docs/what-is-webpack.html)  Webpack is used to bundle modules with dependencies and run mundane tasks.
 * [Axios:](https://www.npmjs.com/package/axios)  Axios is an http client library used in making API calls.

 ## Coding Style
- Airbnb 

## Language
- Javascript
## Contributions
 Contributions are always welcome. If you are interested in enhancing the features in the project, follow these steps below:
 + Fork the project to your repository then clone it to your local machine.
 + Create a new branch and make features that will enhance it.
 + If the you wish to update an existing enhancement submit a pull request against `staging` branch.
 + If you find bugs in the application, create a `New Issue` and let me know about it.
 + If you need clarification on what is not clear, contact me via mail [daniel.atebije@gmail.com](mailto:daniel.atebije@gmail.com)

## Author
    Daniel Atebije

## License & Copyright
MIT © [Daniel Atebije](https://github.com/Dannytebj)

Licensed under the [MIT License](LICENSE).