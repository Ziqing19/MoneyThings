# MoneyThings

## Project Objective

MoneyThings is a Single Page Application for personal finance management.

## Author
Qiqi Chen: chen.qiq(at)northeastern.edu

Ziqing Mao: mao.zi(at)northeastern.edu

## Links

Class link: [CS5610 Web Development](https://johnguerra.co/classes/webDevelopment_spring_2021/)

Demo Link: https://moneythings.herokuapp.com/

Video Demo: https://www.youtube.com/watch?v=

Slides: [Google Slides](https://docs.google.com/presentation/d/1y_3bIUTJU2RH0gSmEjfV3OPCCm_Lu_l-Vt82BG1s3_w/edit?ts=60740999)

## Project Structure

```
MoneyThings
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

## Features

- [ ] Signup/Login/ResetPass
- [ ] Multiple accounts (checking account, credit card, stock(I have no idea about it))
- [ ] Default spending categories
- [ ] Diagrams showing proportions of spending (Pie chart? Use a library?)
- [ ] Set budget (show warning if exceeds)
- [ ] Add an entry
- [ ] Search for specific entries (regex?)
- [ ] Export/Import

## Online demo


```https://moneythings.herokuapp.com/```

## Development
for development start two servers
```
yarn install
cd frontend
yarn install
cd ..
yarn frontend
```
The frontend will run on http://localhost:3000
```
yarn backend
```
The backend will run on http://localhost:3001
Note: do not work on port 3001 as the express only provide api during development.

## Before deployment
```
cd frontend
yarn build (generate build folder)
cd ..
yarn backend
```
Check the webpage on http://localhost:3001 

## Copyright
- This project is under [MIT license](./LICENSE). 
- Sample avatars of the demo are provided by [Iconfinder](https://www.iconfinder.com/iconsets/business-avatar-1) and they are under a free license.