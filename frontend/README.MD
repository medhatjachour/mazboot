# MAZBOOT FRONTEND
3D e-commerce platform that combines human body models and product models for an immersive shopping experience.
# Technologies Used
1. React.js: Mention that you’re using React as the primary frontend library. Explain why you chose React (e.g., component-based architecture, virtual DOM, etc.).
2. Material-UI and PrimeReact: These are your UI component libraries. Highlight any specific components you’re using from each library. For example:
    . Material-UI: Buttons, Cards, Dialogs, etc.
    . PrimeReact: DataTables, Dropdowns, etc.
3. Formik and Yup:
    . Formik: Explain that Formik simplifies form handling by managing form state, validation, and submission.
    . Yup: Mention that Yup is used for form validation. Provide examples of validation rules you’ve set up (e.g., required fields, email format, etc.).
4. Redux Toolkit:
    . Briefly explain Redux Toolkit’s role in managing global state. Mention slices, actions, and reducers.
    . If you’ve created custom slices, mention them here.
5. Axios:
    . Describe how Axios is used for making HTTP requests (GET, POST, PUT, DELETE) to your backend API.
    . Include an example of how you’re handling API responses (e.g., using async/await).
6. React Router DOM:
    . Explain how you’re handling routing within your application. Mention any protected routes or dynamic route parameters.
7. Three.js:
    . Introduce Three.js as the library for rendering 3D objects.
    . If you’ve customized any shaders or implemented specific features, share those details.
## Features
1. Search Functionality:
    . Implement a search bar where users can search for specific products by name, category, or keywords.
    . Use debouncing or throttling to optimize search performance and prevent excessive API requests.
2. Sorting and Filtering:
    . Allow users to sort products based on criteria such as price (ascending/descending), popularity, or release date.
    . Provide filter options (e.g., by category, color, size) to narrow down product listings.
3. Responsive Design:
    . Ensure your application looks great and functions well on various devices (desktop, tablet, mobile).
    . Use responsive CSS frameworks ( Material-UI) to handle different screen sizes.
4. Smooth Navigation:
    .  Leverage React Router for seamless navigation between different pages (e.g., homepage, product details, cart).
    . Consider lazy loading routes to improve initial page load time.
5. Performance Optimization:
    . Optimize component rendering by using React’s memoization techniques (e.g., React.memo, useMemo, useCallback).
    . Implement code splitting to load only necessary components when needed.
    .Use efficient data fetching strategies (e.g., caching, pagination) to minimize API calls.
6. 3D visualization
    . use three js to view the product item as a 3d model with

![alt text](https://github.com/medhatjachour/mazboot/blob/main/sample/f1.png?raw=true)
![alt text](https://github.com/medhatjachour/mazboot/blob/main/sample/f2.png?raw=true)

## Getting Started
1. Installation
    . Make sure you have Node.js (LTS version) installed.
    . Clone this repository to your local machine.
    . Navigate to the root directory and run yarn install or npm install to install dependencies.
2. Running the Dashboard
    . Execute yarn start or npm start to launch the development server.
    . Open your browser and visit http://localhost:3000 to see the dashboard in action.

### What's included
Within the download you'll find the following directories and files:

```
soft-ui-dashboard-react
    ├── public
    │   ├── data
    │   ├── img
    │   ├── models
    │   ├── index.html
    │   ├── manifest.json
    │   └── robots.txt
    ├── src
    │   ├── assets
    │   │   ├── fonts
    │   │   └── new folder
    │   ├── CheckOUT
    │   │   ├── AddressForm
    │   │   ├── CheckOUT
    │   │   ├── PaymentForm
    │   │   ├── Review
    │   ├── components
    │   │   ├── NavBar
    │   │   ├── CardS
    │   │   ├── Features
    │   │   ├── Footer
    │   │   ├── IntroHome
    │   │   ├── MainSellers
    │   │   ├── Model
    │   │   ├── ModelHome
    │   │   └── ModelLoader
    │   ├── Forms
    │   │   ├── formsUI
    │   │   │   ├── Button
    │   │   │   ├── Checkbox
    │   │   │   ├── DateTimePicker
    │   │   │   ├── Rating
    │   │   │   ├── Select
    │   │   │   ├── Select
    │   │   │   ├── TextField
    │   │   ├── Login
    │   │   └── Sign Up
    │   ├── pages
    │   │   ├── Account
    │   │   ├── Cart
    │   │   ├── Category
    │   │   ├── product
    │   │   ├── Home
    │   ├── services
    │   │   ├── CountryServices
    │   │   ├── MyProvider
    │   │   ├── state
    │   ├── App.js
    │   ├── index.js
    │   └── routes.js
    ├── .eslintrc.json
    ├── .prettierrc.json
    ├── CHANGELOG.md
    ├── jsconfig.json
    ├── package.json
    └── README.md
```
## Contributing

Contributions are welcome! If you’d like to contribute to this project, just contact me

## License
This project is licensed under the MIT License. See the LICENSE file for details.
[MIT](https://choosealicense.com/licenses/mit/)