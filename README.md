# MoneyThings

## Project Structure

```
root
├─bin                             // express entry
├─frontend                        // react project root
│  ├─build                        // react app bundle
│  ├─public                       // static files
│  │  ├─favicon
│  │  └─images
│  │      ├─avatar
│  │      └─avatar_thumbnail
│  └─src                          // react src
│      ├─auth                     // auth related components
│      ├─images
│      ├─shared
│      ├─stylesheets
│      └─tabs                     // different functional tabs
│          ├─account
│          ├─alltime
│          ├─budget
│          ├─dateRangeSelection
│          ├─overview
│          └─trends
├─routes                          // express routers
└─src                             // backend src
```

## Hierarchy (Routes)

1. Login Page
2. Main Page
    1. Overview
    2. All time
        1. Group by date
        2. Group by category
    3. Trends
        1. Daily usage (histogram)
        2. Category proportion (pie chart)
    4. Budget
        1. Set budget
        2. Display budget/spending
    5. Edit Profile

## Features

- [ ] Signup/Login/ResetPass
- [ ] Multiple accounts (checking account, credit card, stock(I have no idea about it))
- [ ] Default spending categories
- [ ] Diagrams showing proportions of spending (Pie chart? Use a library?)
- [ ] Set budget (show warning if exceeds)
- [ ] Add an entry
- [ ] Search for specific entries (regex?)
- [ ] Export/Import

## Development
```
yarn install
cd frontend
yarn install
cd ..
yarn backend
yarn frontend
```
Start working on http://localhost:3000

## Before deployment
```
cd frontend
yarn build (generate build folder)
cd ..
yarn backend
```
Check the webpage on http://localhost:3001 

## Alternative
for development start two servers
```
yarn install
yarn nodemon
```
The backend will run on http://localhost:3001
```
cd frontend
yarn install
yarn start
```
The frontend will run on http://localhost:3001

note: changes on the frontend will not be updated for production environment, unless re-build the frontend
